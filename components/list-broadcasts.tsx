import Link from 'next/link';
import React from 'react';

import { useQuery } from '@tanstack/react-query';
import { getAllBroadcasts } from '@util/api';

const ListBroadcasts: React.FC = () => {
	const { data, isSuccess } = useQuery({ queryKey: ['broadcasts'], queryFn: getAllBroadcasts, retry: false, refetchOnWindowFocus: false });
	return (
		isSuccess && (
			<div>
				{data.broadcasts?.map((e, i) => {
					return (
						<div key={`${e.id}_${i}`}>
							<Link href={`/blog/${e.id}`}>{e.subject}</Link>
						</div>
					);
				})}
			</div>
		)
	);
};

export default ListBroadcasts;
