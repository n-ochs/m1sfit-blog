import Head from 'next/head';
import React from 'react';

import { SingleBroadcastResponseData } from '@util/types/get-single-broadcast.type';

import type { NextPageContext } from 'next';

export const getServerSideProps: (context: NextPageContext) => Promise<{
	props:
		| {
				singleBroadcast: SingleBroadcastResponseData;
		  }
		| {};
}> = async (context: NextPageContext) => {
	const broadcastId: string = context.query?.broadcastId as string;

	try {
		const res: Response = await fetch(`${process.env.DOMAIN}/api/get-single-broadcast?broadcastId=${broadcastId}`);
		const singleBroadcast: SingleBroadcastResponseData = (await res.json()) as SingleBroadcastResponseData;

		return { props: { singleBroadcast } };
	} catch (error) {
		return { props: {} };
	}
};

type BlogContentProps = { singleBroadcast: SingleBroadcastResponseData };

const BlogContent: React.FC<BlogContentProps> = ({ singleBroadcast }) => {
	const createMarkup: (blogContent: string) => { __html: string } = (blogContent: string) => {
		return { __html: blogContent };
	};

	return (
		<>
			<Head>
				<title>{singleBroadcast?.broadcast?.subject || 'Meta Mondays'}</title>
			</Head>
			{/* If there is not a broadcast, handle it */}
			{!singleBroadcast?.broadcast && <p>this broadcast is either private or does not exist yet</p>}

			{/* If there is a broadcast, let's render it */}
			{singleBroadcast?.broadcast?.content && <div dangerouslySetInnerHTML={createMarkup(singleBroadcast.broadcast.content)} />}
		</>
	);
};

export default BlogContent;
