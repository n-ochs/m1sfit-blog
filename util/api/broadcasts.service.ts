import axios from 'axios';

import { SingleBroadcastResponseData } from '@util/types';

export const getAllBroadcasts: () => Promise<Omit<SingleBroadcastResponseData, 'content' | 'sent_at'>[]> = async () => {
	return (await axios.get('/api/get-all-broadcasts', { headers: { 'Content-Type': 'application/json' } }))?.data;
};

export const getSingleBroadcast: (broadcastId: string) => Promise<SingleBroadcastResponseData> = async (broadcastId: string) => {
	return axios.get(`/api/get-single-broadcast?broadcastId=${broadcastId}`, { headers: { 'Content-Type': 'application/json' } });
};
