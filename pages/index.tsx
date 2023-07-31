import axios, { AxiosResponse } from 'axios';
import Head from 'next/head';

import Footer from '@components/footer';
import Hero from '@components/hero';
import ListBroadcasts from '@components/list-broadcasts';
import { getBaseUrl } from '@util/fns';
import { TrimmedBroadcastRespData } from '@util/types';

import type { NextPage } from 'next';
export const getServerSideProps: () => Promise<{
	props:
		| {
				data: TrimmedBroadcastRespData[];
		  }
		| {};
}> = async () => {
	try {
		const res: AxiosResponse<TrimmedBroadcastRespData[], any> = await axios.get(`${getBaseUrl()}/api/get-all-broadcasts`);
		const data: TrimmedBroadcastRespData[] = res?.data;

		return { props: { data } };
	} catch (error) {
		return { props: {} };
	}
};

type IndexProps = { data: TrimmedBroadcastRespData[] };

const Home: NextPage<IndexProps> = ({ data }) => {
	return (
		<>
			<Head>
				<title>Meta Mondays</title>
			</Head>
			<div className='index-bg w-full'>
				<div className='relative z-10 flex h-full items-center justify-center'>
					<Hero />
				</div>
			</div>
			<div className='min-h-[25vh] bg-black pl-0 text-white sm:pl-0 md:pl-0 xl:pl-80'>{data?.length > 0 && <ListBroadcasts data={data} />}</div>
			<div className='bg-black'>
				<Footer includeForm={false} />
			</div>
		</>
	);
};

export default Home;
