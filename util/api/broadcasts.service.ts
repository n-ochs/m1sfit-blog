import axios from 'axios';

import { Broadcast } from '@util/types/get-all-broadcasts.type';
import { SingleBroadcastResponseData } from '@util/types/get-single-broadcast.type';

export const getAllBroadcasts: () => Promise<Broadcast[]> = async () => {
	return (await axios.get('/api/get-all-broadcasts', { headers: { 'Content-Type': 'application/json' } }))?.data;
};

export const getSingleBroadcast: (broadcastId: string) => Promise<SingleBroadcastResponseData> = async (broadcastId: string) => {
	return axios.get(`/api/get-single-broadcast?broadcastId=${broadcastId}`, { headers: { 'Content-Type': 'application/json' } });
};
