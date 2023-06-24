import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import Footer from '@components/footer';
import NotFound from '@components/not-found';
import { SingleBroadcastRespData } from '@util/types';

import type { NextPageContext } from 'next';
export const getServerSideProps: (context: NextPageContext) => Promise<{
	props:
		| {
				singleBroadcast: SingleBroadcastRespData;
		  }
		| {};
}> = async (context: NextPageContext) => {
	const broadcastId: string = context.query?.broadcastId as string;
	const baseUrl: string = process.env.VERCEL_URL || process.env.DOMAIN || 'http://localhost:3000';

	try {
		const res: Response = await fetch(`${baseUrl}/api/get-single-broadcast?broadcastId=${broadcastId}`);
		const singleBroadcast: SingleBroadcastRespData = (await res.json()) as SingleBroadcastRespData;

		return { props: { singleBroadcast } };
	} catch (error) {
		return { props: {} };
	}
};

type BlogContentProps = { singleBroadcast: SingleBroadcastRespData };

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
						<div className='mb-4 flex w-full'>
							<Image
								height={675}
								width={850}
								src={singleBroadcast?.broadcast.thumbnail_url}
								alt={singleBroadcast?.broadcast.thumbnail_alt || `${singleBroadcast?.broadcast.subject} thumbnail`}
								className='white-box-shadow mx-auto my-0 h-auto w-auto rounded-lg'
								priority
								placeholder='empty'
							/>
						</div>
						<h1 className='my-0 text-3xl'>{singleBroadcast?.broadcast?.subject}</h1>
						<p className='my-0'>m1sfit</p>
						<article>
							<section dangerouslySetInnerHTML={{ __html: singleBroadcast.broadcast.content }} />
							<p className='my-0'>
								<Link href='/'>← Back to home</Link>
							</p>
						</article>
					</main>
					<Footer includeForm />
				</div>
			)}
		</>
	);
};

export default BlogContent;
