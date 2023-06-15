import Head from 'next/head';

import Hero from '@components/index/hero';

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
		</>
	);
};

export default Home;
