import axios, { AxiosResponse } from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

import { AllBroadcastResponseData, Broadcast } from '@util/types/get-all-broadcasts.type';

export default async (req: NextApiRequest, res: NextApiResponse<Broadcast[] | { message: 'Server error' }>): Promise<void> => {
	if (req.method === 'GET') {
		try {
			const broadcasts: AxiosResponse<AllBroadcastResponseData, any> = await axios.get(`https://api.convertkit.com/v3/broadcasts?page=1&api_secret=${process.env.CONVERT_KIT_API_SECRET}`, {
				headers: { 'Content-Type': 'application/json' }
			});
			res.status(200).json(broadcasts.data.broadcasts.filter((e) => e.subject.startsWith('Meta Mondays #')));
		} catch (error) {
			res.status(500).json({ message: 'Server error' });
		}
	}
};
