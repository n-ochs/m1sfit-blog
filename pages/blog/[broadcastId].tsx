import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { NextRouter, useRouter } from 'next/router';
import React, { useState } from 'react';

import Banner from '@components/banner';
import Footer from '@components/footer';
import NotFound from '@components/not-found';
import { useQuery } from '@tanstack/react-query';
import { getSingleBroadcast } from '@util/api';
import { QueryKeys } from '@util/constants';

const BlogContent: React.FC = () => {
	const router: NextRouter = useRouter();
	const broadcastId: string = router.query?.broadcastId as string;
	const { data: singleBroadcast, isLoading, isError } = useQuery({ queryKey: [QueryKeys.SINGLE_BROADCAST, Number(broadcastId)], queryFn: () => getSingleBroadcast(broadcastId) });

	const [isVisible, setIsVisible] = useState<boolean>(true);

	const handleCloseBanner: () => void = () => {
		setIsVisible(false);
	};

	if (isLoading) {
		return (
			<>
				<Head>
					<title>Meta Mondays</title>
				</Head>
				<div className='h-screen w-screen bg-[#27272a] flex items-center justify-center'>
					<div className='animate-spin border-t-4 border-blue-500 border-solid h-16 w-16 rounded-full'></div>
				</div>
			</>
		);
	}

	if (isError) {
		return (
			<>
				<Head>
					<title>Meta Mondays</title>
				</Head>
				<span>Error</span>
			</>
		);
	}

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
								className='white-box-shadow mx-auto my-0 h-auto w-auto rounded-lg transition-opactiy opacity-0 duration-[1.5s]'
								onLoadingComplete={(img) => img.classList.remove('opacity-0')}
								priority
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
