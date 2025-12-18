import {
	IExecuteFunctions,
	ILoadOptionsFunctions,
	INodeExecutionData,
	INodePropertyOptions,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';

export class PraisonAI implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'PraisonAI',
		name: 'praisonAI',
		icon: 'file:praisonai.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"]}}',
		description: 'Run AI agents with PraisonAI',
		defaults: {
			name: 'PraisonAI',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'praisonAIApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Run Agent',
						value: 'runAgent',
						description: 'Run a specific agent with a query',
						action: 'Run a specific agent',
					},
					{
						name: 'Run Workflow',
						value: 'runWorkflow',
						description: 'Run the entire workflow with all agents',
						action: 'Run the entire workflow',
					},
					{
						name: 'List Agents',
						value: 'listAgents',
						description: 'List all available agents',
						action: 'List all available agents',
					},
				],
				default: 'runAgent',
			},
			{
				displayName: 'Agent',
				name: 'agent',
				type: 'options',
				typeOptions: {
					loadOptionsMethod: 'getAgents',
				},
				default: '',
				required: true,
				displayOptions: {
					show: {
						operation: ['runAgent'],
					},
				},
				description: 'The agent to run',
			},
			{
				displayName: 'Query',
				name: 'query',
				type: 'string',
				typeOptions: {
					rows: 4,
				},
				default: '',
				required: true,
				displayOptions: {
					show: {
						operation: ['runAgent', 'runWorkflow'],
					},
				},
				description: 'The query to send to the agent',
			},
			{
				displayName: 'Options',
				name: 'options',
				type: 'collection',
				placeholder: 'Add Option',
				default: {},
				options: [
					{
						displayName: 'Timeout',
						name: 'timeout',
						type: 'number',
						default: 300000,
						description: 'Request timeout in milliseconds',
					},
				],
			},
		],
	};

	methods = {
		loadOptions: {
			async getAgents(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const credentials = await this.getCredentials('praisonAIApi');
				const apiUrl = credentials.apiUrl as string;

				try {
					const response = await this.helpers.httpRequest({
						method: 'GET',
						url: `${apiUrl}/agents/list`,
					});

					if (response.agents && Array.isArray(response.agents)) {
						return response.agents.map((agent: { name: string; id: string }) => ({
							name: agent.name,
							value: agent.id,
						}));
					}

					return [];
				} catch (error) {
					return [
						{
							name: 'Error loading agents - is PraisonAI server running?',
							value: '',
						},
					];
				}
			},
		},
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];
		const credentials = await this.getCredentials('praisonAIApi');
		const apiUrl = credentials.apiUrl as string;
		const operation = this.getNodeParameter('operation', 0) as string;

		for (let i = 0; i < items.length; i++) {
			try {
				const options = this.getNodeParameter('options', i, {}) as {
					timeout?: number;
				};
				const timeout = options.timeout || 300000;

				if (operation === 'runAgent') {
					const agent = this.getNodeParameter('agent', i) as string;
					const query = this.getNodeParameter('query', i) as string;

					const response = await this.helpers.httpRequest({
						method: 'POST',
						url: `${apiUrl}/agents/${agent}`,
						body: { query },
						timeout,
					});

					returnData.push({
						json: response,
						pairedItem: { item: i },
					});
				} else if (operation === 'runWorkflow') {
					const query = this.getNodeParameter('query', i) as string;

					const response = await this.helpers.httpRequest({
						method: 'POST',
						url: `${apiUrl}/agents`,
						body: { query },
						timeout,
					});

					returnData.push({
						json: response,
						pairedItem: { item: i },
					});
				} else if (operation === 'listAgents') {
					const response = await this.helpers.httpRequest({
						method: 'GET',
						url: `${apiUrl}/agents/list`,
						timeout,
					});

					returnData.push({
						json: response,
						pairedItem: { item: i },
					});
				}
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({
						json: {
							error: (error as Error).message,
						},
						pairedItem: { item: i },
					});
					continue;
				}
				throw error;
			}
		}

		return [returnData];
	}
}
