import '@styles/globals.css';

import { Toaster } from 'react-hot-toast';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Analytics } from '@vercel/analytics/react';

import type { AppProps } from 'next/app';

const App: (props: AppProps) => JSX.Element = ({ Component, pageProps }) => {
	const queryClient: QueryClient = new QueryClient();

	return (
		<QueryClientProvider client={queryClient}>
			<Component {...pageProps} />
			<Toaster />
			<Analytics />
		</QueryClientProvider>
	);
};

export default App;
