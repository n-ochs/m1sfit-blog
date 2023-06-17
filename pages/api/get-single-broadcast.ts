import axios, { AxiosResponse } from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

import { SingleBroadcastResponseData } from '@util/types/get-single-broadcast.type';

export default async (req: NextApiRequest, res: NextApiResponse<SingleBroadcastResponseData | any>): Promise<void> => {
	if (req.method === 'GET') {
		const broadcastId: string = req.query?.broadcastId as string;

		try {
			const broadcastResp: AxiosResponse<SingleBroadcastResponseData, any> = await axios.get(
				`https://api.convertkit.com/v3/broadcasts/${broadcastId}?api_secret=${process.env.CONVERT_KIT_API_SECRET}`,
				{
					headers: { 'Content-Type': 'application/json' }
				}
			);

			const showOnlyPublic: boolean = process.env.SHOW_ONLY_PUBLIC.toString().toLowerCase() === 'true' ? true : false;

			if (showOnlyPublic) {
				if (broadcastResp.data.broadcast.public) {
					res.status(200).json(broadcastResp.data);
				} else {
					res.status(200).json({ message: 'Broadcast is not public' });
				}
			} else {
				res.status(200).json(broadcastResp.data);
			}
		} catch (error) {
			res.status(500).json({ message: 'Server error' });
		}
	}
};
