export abstract class HttpMethod {
	static readonly GET: string = 'GET';
	static readonly POST: string = 'POST';
	static readonly PUT: string = 'PUT';
	static readonly PATCH: string = 'PATCH';
	static readonly DELETE: string = 'DELETE';
}

export abstract class Environment {
	static readonly LOCAL: string = 'LOCAL';
	static readonly PREVIEW: string = 'PREVIEW';
	static readonly PRODUCTION: string = 'PRODUCTION';
}

export abstract class QueryKeys {
	static readonly SINGLE_BROADCAST: string = 'SINGLE_BROADCAST';
	static readonly LIST_BROADCASTS: string = 'BROADCASTS';
}
