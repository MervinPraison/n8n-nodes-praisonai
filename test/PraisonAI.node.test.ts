import { PraisonAI } from '../nodes/PraisonAI/PraisonAI.node';
import { PraisonAIApi } from '../credentials/PraisonAIApi.credentials';

describe('PraisonAI Node', () => {
	let node: PraisonAI;

	beforeEach(() => {
		node = new PraisonAI();
	});

	describe('Node Description', () => {
		it('should have correct display name', () => {
			expect(node.description.displayName).toBe('PraisonAI');
		});

		it('should have correct name', () => {
			expect(node.description.name).toBe('praisonAI');
		});

		it('should have version 1', () => {
			expect(node.description.version).toBe(1);
		});

		it('should have correct icon', () => {
			expect(node.description.icon).toBe('file:praisonai.svg');
		});

		it('should require praisonAIApi credentials', () => {
			expect(node.description.credentials).toEqual([
				{
					name: 'praisonAIApi',
					required: true,
				},
			]);
		});
	});

	describe('Operations', () => {
		it('should have runAgent operation', () => {
			const operationProp = node.description.properties.find(
				(p) => p.name === 'operation'
			);
			expect(operationProp).toBeDefined();
			expect(operationProp?.type).toBe('options');
			
			const options = operationProp?.options as Array<{ value: string }>;
			const runAgent = options?.find((o) => o.value === 'runAgent');
			expect(runAgent).toBeDefined();
		});

		it('should have runWorkflow operation', () => {
			const operationProp = node.description.properties.find(
				(p) => p.name === 'operation'
			);
			const options = operationProp?.options as Array<{ value: string }>;
			const runWorkflow = options?.find((o) => o.value === 'runWorkflow');
			expect(runWorkflow).toBeDefined();
		});

		it('should have listAgents operation', () => {
			const operationProp = node.description.properties.find(
				(p) => p.name === 'operation'
			);
			const options = operationProp?.options as Array<{ value: string }>;
			const listAgents = options?.find((o) => o.value === 'listAgents');
			expect(listAgents).toBeDefined();
		});
	});

	describe('Properties', () => {
		it('should have agent property', () => {
			const agentProp = node.description.properties.find(
				(p) => p.name === 'agent'
			);
			expect(agentProp).toBeDefined();
			expect(agentProp?.type).toBe('options');
		});

		it('should have query property', () => {
			const queryProp = node.description.properties.find(
				(p) => p.name === 'query'
			);
			expect(queryProp).toBeDefined();
			expect(queryProp?.type).toBe('string');
		});

		it('should have options collection', () => {
			const optionsProp = node.description.properties.find(
				(p) => p.name === 'options'
			);
			expect(optionsProp).toBeDefined();
			expect(optionsProp?.type).toBe('collection');
		});
	});

	describe('Load Options Methods', () => {
		it('should have getAgents method', () => {
			expect(node.methods.loadOptions.getAgents).toBeDefined();
			expect(typeof node.methods.loadOptions.getAgents).toBe('function');
		});
	});
});

describe('PraisonAI Credentials', () => {
	let credentials: PraisonAIApi;

	beforeEach(() => {
		credentials = new PraisonAIApi();
	});

	describe('Credential Definition', () => {
		it('should have correct name', () => {
			expect(credentials.name).toBe('praisonAIApi');
		});

		it('should have correct display name', () => {
			expect(credentials.displayName).toBe('PraisonAI API');
		});

		it('should have apiUrl property', () => {
			const apiUrlProp = credentials.properties.find(
				(p) => p.name === 'apiUrl'
			);
			expect(apiUrlProp).toBeDefined();
			expect(apiUrlProp?.type).toBe('string');
			expect(apiUrlProp?.default).toBe('http://localhost:8005');
		});

		it('should have openaiApiKey property', () => {
			const apiKeyProp = credentials.properties.find(
				(p) => p.name === 'openaiApiKey'
			);
			expect(apiKeyProp).toBeDefined();
			expect(apiKeyProp?.type).toBe('string');
			expect(apiKeyProp?.typeOptions?.password).toBe(true);
		});
	});

	describe('Authentication', () => {
		it('should use generic authentication', () => {
			expect(credentials.authenticate.type).toBe('generic');
		});

		it('should set X-OpenAI-API-Key header', () => {
			expect(credentials.authenticate.properties.headers).toHaveProperty(
				'X-OpenAI-API-Key'
			);
		});
	});

	describe('Credential Test', () => {
		it('should test against /agents/list endpoint', () => {
			expect(credentials.test.request.url).toBe('/agents/list');
			expect(credentials.test.request.method).toBe('GET');
		});
	});
});
