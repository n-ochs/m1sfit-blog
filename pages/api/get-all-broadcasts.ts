import axios, { AxiosResponse } from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

import { asyncForEach } from '@util/fns';
import { AllBroadcastResponseData, SingleBroadcastResponseData } from '@util/types';

export default async (req: NextApiRequest, res: NextApiResponse<Omit<SingleBroadcastResponseData, 'content' | 'sent_at'>[] | { message: 'Server error' }>): Promise<void> => {
	if (req.method === 'GET') {
		try {
			const broadcastsResp: AxiosResponse<AllBroadcastResponseData, any> = await axios.get(
				`${process.env.CONVERT_KIT_API_BASE_URL}/broadcasts?page=1&api_secret=${process.env.CONVERT_KIT_API_SECRET}`,
				{
					headers: { 'Content-Type': 'application/json' }
				}
			);

			const broadcastsData: Omit<SingleBroadcastResponseData, 'content' | 'sent_at'>[] = [];

			if (broadcastsResp?.data) {
				const broadcastIds: number[] = broadcastsResp.data.broadcasts.filter((e) => e.subject.startsWith('Meta Mondays #'))?.map((e) => e.id);
				await asyncForEach<number>(broadcastIds, async (e) => {
					const singleBroadcastResp: AxiosResponse<SingleBroadcastResponseData, any> = await axios.get(
						`${process.env.CONVERT_KIT_API_BASE_URL}/broadcasts/${e}?api_secret=${process.env.CONVERT_KIT_API_SECRET}`,
						{
							headers: { 'Content-Type': 'application/json' }
						}
					);
					if (singleBroadcastResp?.data?.broadcast.public) {
						delete singleBroadcastResp.data.broadcast.content;
						delete singleBroadcastResp.data.broadcast.send_at;
						broadcastsData.push(singleBroadcastResp.data);
					}
				});
			}

			res.status(200).json(broadcastsData);
		} catch (error) {
			res.status(500).json({ message: 'Server error' });
		}
	}
};
