import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

type RespData = { message: string };

export default async (req: NextApiRequest, res: NextApiResponse<RespData>): Promise<void> => {
	if (req.method === 'POST') {
		if (req?.body && (!req?.body?.email || req?.body?.email === undefined || req?.body?.email === '')) {
			res.status(400).json({ message: 'Email is required to subscribe' });
		}

		if (req.body.email) {
			const emailPattern: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			if (emailPattern.test(req.body.email)) {
				try {
					await axios.post(
						`${process.env.CONVERT_KIT_API_BASE_URL}/forms/${process.env.CONVERT_KIT_FORM_ID}/subscribe`,
						{ api_key: `${process.env.CONVERT_KIT_API_KEY}`, email: req.body.email },
						{ headers: { 'Content-Type': 'application/json' } }
					);
					res.status(200).json({ message: 'Subscriber added successfully' });
				} catch (error) {
					res.status(500).json({ message: 'Server error' });
				}
			} else {
				res.status(400).json({ message: 'Email is invalid' });
			}
		}
	}
};
