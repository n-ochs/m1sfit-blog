import Head from 'next/head';

import Hero from '@components/hero';
import ListBroadcasts from '@components/list-broadcasts';

import type { NextPage } from 'next';

const Home: NextPage = () => {
	return (
		<>
			<Head>
				<title>Meta Mondays</title>
			</Head>
			<div className='index-bg h-screen w-full'>
				<div className='relative z-10 flex h-full items-center justify-center'>
					<Hero />
				</div>
			</div>
			<div>
				<ListBroadcasts />
			</div>
		</>
	);
};

export default Home;
