import Head from 'next/head';

import Footer from '@components/footer';
import Hero from '@components/hero';
import ListBroadcasts from '@components/list-broadcasts';
import { useQuery } from '@tanstack/react-query';
import { getAllBroadcasts } from '@util/api';
import { QueryKeys } from '@util/constants';

import type { NextPage } from 'next';

const Home: NextPage = () => {
	const { data: blogPosts, isLoading } = useQuery({ queryKey: [QueryKeys.LIST_BROADCASTS], queryFn: getAllBroadcasts });
	return (
		<>
			{/* <Script src='https://www.googletagmanager.com/gtag/js?id=G-QY7CTL9XWQ' />
			<Script id='google-analytics'>
				{`
          			window.dataLayer = window.dataLayer || [];
		  			function gtag(){dataLayer.push(arguments);}
		  			gtag('js', new Date());

		  			gtag('config', 'G-QY7CTL9XWQ');
        		`}
			</Script> */}
			<Head>
				<title>Meta Mondays</title>
			</Head>
			<div className='index-bg w-full'>
				<div className='relative z-10 flex h-full items-center justify-center'>
					<Hero />
				</div>
			</div>
			<div className='min-h-[25vh] bg-black pl-0 text-white sm:pl-0 md:pl-0 xl:pl-80'>
				{isLoading && <div className=' mx-auto animate-spin border-t-4 border-white border-solid h-16 w-16 rounded-full'></div>}
				{blogPosts && blogPosts?.length > 0 && <ListBroadcasts data={blogPosts} />}
			</div>
			<div className='bg-black'>
				<Footer includeForm={false} />
			</div>
		</>
	);
};

export default Home;
