import axios from 'axios';

export const addSub: (email: string) => Promise<void> = async (email: string) => {
	return axios.post('/api/add-sub', { email }, { headers: { 'Content-Type': 'application/json' } });
};
