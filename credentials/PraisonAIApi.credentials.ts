import {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class PraisonAIApi implements ICredentialType {
	name = 'praisonAIApi';
	displayName = 'PraisonAI API';
	documentationUrl = 'https://docs.praison.ai';
	properties: INodeProperties[] = [
		{
			displayName: 'API URL',
			name: 'apiUrl',
			type: 'string',
			default: 'http://localhost:8005',
			placeholder: 'http://localhost:8005',
			description: 'The URL of your PraisonAI API server. Start with: praisonai serve agents.yaml',
		},
		{
			displayName: 'OpenAI API Key',
			name: 'openaiApiKey',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			description: 'Your OpenAI API key for agent execution (optional if set on server)',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				'X-OpenAI-API-Key': '={{$credentials.openaiApiKey}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{$credentials.apiUrl}}',
			url: '/agents/list',
			method: 'GET',
		},
	};
}
