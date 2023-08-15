import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

import Banner from '@components/banner';
import Footer from '@components/footer';
import NotFound from '@components/not-found';
import { getBaseUrl } from '@util/fns';
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
	try {
		const res: Response = await fetch(`${getBaseUrl()}/api/get-single-broadcast?broadcastId=${broadcastId}`);
		const singleBroadcast: SingleBroadcastRespData = (await res.json()) as SingleBroadcastRespData;

		return { props: { singleBroadcast } };
	} catch (error) {
		return { props: {} };
	}
};

type BlogContentProps = { singleBroadcast: SingleBroadcastRespData };

const BlogContent: React.FC<BlogContentProps> = ({ singleBroadcast }) => {
	const [isVisible, setIsVisible] = useState<boolean>(true);

	const handleCloseBanner: () => void = () => {
		setIsVisible(false);
	};

	return (
		<>
			<Head>
				<title>{singleBroadcast?.broadcast?.subject || 'Meta Mondays'}</title>
			</Head>

			{!singleBroadcast?.broadcast?.content ? (
				<NotFound />
			) : (
				<div className='dark:bg-zinc-800'>
					<Banner isVisible={isVisible} handleCloseBanner={handleCloseBanner} />
					<main className='prose-md prose prose-xl prose-zinc mx-auto px-2 dark:prose-invert'>
						<div className={isVisible ? 'mt-6 sm:mt-6 md:mt-4 lg:mt-6 mb-4 flex w-full' : 'pt-4 mb-4 flex w-full'}>
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
