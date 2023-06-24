import axios, { AxiosResponse } from 'axios';
import dayjs from 'dayjs';
import { NextApiRequest, NextApiResponse } from 'next';

import { asyncForEach } from '@util/fns';
import { AllBroadcastRespData, SingleBroadcastRespData, TrimmedBroadcastRespData } from '@util/types';

export default async (req: NextApiRequest, res: NextApiResponse<TrimmedBroadcastRespData[] | { message: 'Server error' }>): Promise<void> => {
	if (req.method === 'GET') {
		try {
			const broadcastsResp: AxiosResponse<AllBroadcastRespData, any> = await axios.get(
				`${process.env.CONVERT_KIT_API_BASE_URL}/broadcasts?page=1&api_secret=${process.env.CONVERT_KIT_API_SECRET}`,
				{
					headers: { 'Content-Type': 'application/json' }
				}
			);

			const broadcastsData: TrimmedBroadcastRespData[] = [];
			if (broadcastsResp?.data) {
				const broadcastIds: number[] = broadcastsResp.data.broadcasts.filter((e) => e.subject.startsWith('Meta Mondays #'))?.map((e) => e.id);
				await asyncForEach<number>(broadcastIds, async (e) => {
					const singleBroadcastResp: AxiosResponse<SingleBroadcastRespData, any> = await axios.get(
						`${process.env.CONVERT_KIT_API_BASE_URL}/broadcasts/${e}?api_secret=${process.env.CONVERT_KIT_API_SECRET}`,
						{
							headers: { 'Content-Type': 'application/json' }
						}
					);
					if (singleBroadcastResp?.data?.broadcast.public) {
						// Some data we don't want going back to the client, so let's trim it
						// Could use delete, but probably too slow
						const broadcastToBeAdded: TrimmedBroadcastRespData = new TrimmedBroadcastRespData();
						broadcastToBeAdded.broadcast.id = singleBroadcastResp.data.broadcast.id;
						broadcastToBeAdded.broadcast.subject = singleBroadcastResp.data.broadcast.subject.split('#')?.[1];
						// broadcastToBeAdded.broadcast.subject = singleBroadcastResp.data.broadcast.subject;
						broadcastToBeAdded.broadcast.description = singleBroadcastResp.data.broadcast.description;
						broadcastToBeAdded.broadcast.public = singleBroadcastResp.data.broadcast.public;
						broadcastToBeAdded.broadcast.published_at = dayjs(singleBroadcastResp.data.broadcast.published_at).format('MMMM D, YYYY');
						broadcastToBeAdded.broadcast.thumbnail_alt = singleBroadcastResp.data.broadcast.thumbnail_alt;
						broadcastToBeAdded.broadcast.thumbnail_url = singleBroadcastResp.data.broadcast.thumbnail_url;

						broadcastsData.push(broadcastToBeAdded);
					}
				});
			}

			res.status(200).json(broadcastsData.reverse());
		} catch (error) {
			res.status(500).json({ message: 'Server error' });
		}
	}
};
