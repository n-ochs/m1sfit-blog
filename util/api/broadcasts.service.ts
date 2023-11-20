import axios from 'axios';

import { SingleBroadcastRespData, TrimmedBroadcastRespData } from '@util/types';

export const getAllBroadcasts: () => Promise<TrimmedBroadcastRespData[]> = async () => {
	return (await axios.get('/api/get-all-broadcasts', { headers: { 'Content-Type': 'application/json' } }))?.data;
};

export const getSingleBroadcast: (broadcastId: string) => Promise<SingleBroadcastRespData> = async (broadcastId: string) => {
	return (await axios.get(`/api/get-single-broadcast?broadcastId=${broadcastId}`, { headers: { 'Content-Type': 'application/json' } }))?.data;
};
