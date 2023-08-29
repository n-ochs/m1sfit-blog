import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { TrimmedBroadcastRespData } from '@util/types';

type ListBroadcastsProps = { data: TrimmedBroadcastRespData[] };

const ListBroadcasts: React.FC<ListBroadcastsProps> = ({ data }) => {
	return (
		<div className='mx-auto flex flex-col space-y-12 px-2 pt-4 sm:px-2 sm:pt-4 md:px-4 md:pt-4 lg:space-y-6 lg:px-8 lg:pt-8'>
			{data.map((e, i) => {
				return (
					<div key={`${e.broadcast.id}_${i}`} className='flex flex-col items-center gap-2 sm:flex-col sm:gap-2 md:flex-row lg:gap-6'>
						<Link href={`/blog/${e.broadcast.id}`}>
							<Image
								height={225}
								width={400}
								src={e.broadcast.thumbnail_url}
								alt={e.broadcast.thumbnail_alt || `${e.broadcast.subject} thumbnail`}
								className='white-box-shadow rounded-lg'
							/>
						</Link>
						<Link href={`/blog/${e.broadcast.id}`}>
							<p>{e.broadcast.subject}</p>
							<i>{e.broadcast.published_at}</i>
						</Link>
					</div>
				);
			})}
		</div>
	);
};

export default ListBroadcasts;
