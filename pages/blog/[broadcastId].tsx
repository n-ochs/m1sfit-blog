import Head from 'next/head';
import Link from 'next/link';
import React from 'react';

import Footer from '@components/footer';
import NotFound from '@components/not-found';
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
	return (
		<>
			<Head>
				<title>{singleBroadcast?.broadcast?.subject || 'Meta Mondays'}</title>
			</Head>

			{!singleBroadcast?.broadcast?.content ? (
				<NotFound />
			) : (
				<div className='pt-10 dark:bg-zinc-800 sm:pt-10 md:pt-24'>
					<main className='prose-md prose prose-xl prose-zinc mx-auto px-2 dark:prose-invert'>
						<h1 className='my-0 text-3xl'>{singleBroadcast?.broadcast?.subject}</h1>
						<p className='mt-0'>m1sfit</p>
						<article>
							<section dangerouslySetInnerHTML={{ __html: singleBroadcast.broadcast.content }} />
							<p className='my-0'>
								<Link href='/'>← Back to home</Link>
							</p>
						</article>
					</main>
					<Footer />
				</div>
			)}
		</>
	);
};

export default BlogContent;
