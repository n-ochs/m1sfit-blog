export function getBaseUrl(): string {
	if (process.env.ENVIRONMENT === 'LOCAL') {
		return 'http://localhost:3000';
	}

	if (process.env.ENVIRONMENT === 'PREVIEW') {
		return `https://${process.env.NEXT_PUBLIC_VERCEL_URL || process.env.NEXT_PUBLIC_VERCEL_URL}`;
	}

	if (process.env.ENVIRONMENT === 'PRODUCTION') {
		return 'https://m1sfit.me';
	}
}
