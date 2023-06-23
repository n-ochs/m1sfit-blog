import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { useQuery } from '@tanstack/react-query';
import { getAllBroadcasts } from '@util/api';

const ListBroadcasts: React.FC = () => {
	const { data, isSuccess } = useQuery({ queryKey: ['broadcasts'], queryFn: getAllBroadcasts, retry: false, refetchOnWindowFocus: false });
	return (
		isSuccess && (
			<div>
				{data?.map((e, i) => {
					return (
						<div key={`${e.broadcast.id}_${i}`}>
							<Image width={400} height={400} src={e.broadcast.thumbnail_url} alt={e.broadcast.thumbnail_alt || `${e.broadcast.subject}_thumbnail`} />
							<Link href={`/blog/${e.broadcast.id}`}>{e.broadcast.subject}</Link>
						</div>
					);
				})}
			</div>
		)
	);
};

export default ListBroadcasts;
