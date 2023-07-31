import { Environment } from '@util/constants';

export function getBaseUrl(): string {
	if (process.env.ENVIRONMENT === Environment.LOCAL) {
		return 'http://localhost:3000';
	}

	if (process.env.ENVIRONMENT === Environment.PREVIEW) {
		return `https://${process.env.NEXT_PUBLIC_VERCEL_URL || process.env.NEXT_PUBLIC_VERCEL_URL}`;
	}

	if (process.env.ENVIRONMENT === Environment.PRODUCTION) {
		return 'https://m1sfit.me';
	}
}
