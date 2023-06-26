import axios, { AxiosResponse } from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

import { HttpMethod } from '@util/constants';
import { SingleBroadcastRespData } from '@util/types';

export default async (req: NextApiRequest, res: NextApiResponse<SingleBroadcastRespData | any>): Promise<void> => {
	if (req.method === HttpMethod.GET) {
		const broadcastId: string = req.query?.broadcastId as string;

		try {
			const broadcastResp: AxiosResponse<SingleBroadcastRespData, any> = await axios.get(
				`${process.env.CONVERT_KIT_API_BASE_URL}/broadcasts/${broadcastId}?api_secret=${process.env.CONVERT_KIT_API_SECRET}`,
				{
					headers: { 'Content-Type': 'application/json' }
				}
			);

			if (broadcastResp?.data?.broadcast?.content) {
				// Some of the styling that comes from the ConvertKit API is not styled properly, so let's manually fix it
				const tablePattern: RegExp = /<table\s/g;
				const tableReplacement: string = '<table class="not-prose"';
				const tableFixResult: string = broadcastResp.data.broadcast.content.replace(tablePattern, tableReplacement);

				const anchorPattern: RegExp = /<a\s/g;
				const anchorReplacement: string = '<a class="break-all"';
				const anchorFixResult: string = tableFixResult.replace(anchorPattern, anchorReplacement);

				const anchorTweetPattern: RegExp = /<a class="break-all" href="/g;
				const anchorTweetReplacement: string = '<a style="text-decoration:none;display:block;word-break:normal;overflow-wrap:normal" href=';
				const anchorTweetFixResult: string = anchorFixResult.replace(anchorTweetPattern, anchorTweetReplacement);

				const zeroWidthSpaceFixResult: string = anchorTweetFixResult.replace('<p>​</p>', ''); // has invisible character

				const dividerPattern: RegExp = /<p>_[\s\S]*?<\/p>/g;
				const dividerReplacement: string = '<hr class="w-full h-[2px] m-0" />';
				const dividerFixResult: string = zeroWidthSpaceFixResult.replace(dividerPattern, dividerReplacement);

				broadcastResp.data.broadcast.content = dividerFixResult;

				const showOnlyPublic: boolean = process.env.SHOW_ONLY_PUBLIC?.toString()?.toLowerCase() === 'true' ? true : false;

				if (showOnlyPublic) {
					if (broadcastResp.data.broadcast.public) {
						res.status(200).json(broadcastResp.data);
					} else {
						res.status(200).json({ message: 'Broadcast is not public' });
					}
				} else {
					res.status(200).json(broadcastResp.data);
				}
			} else {
				res.status(200).json({ message: 'No content' });
			}
		} catch (error) {
			res.status(500).json({ message: 'Server error' });
		}
	}
};
