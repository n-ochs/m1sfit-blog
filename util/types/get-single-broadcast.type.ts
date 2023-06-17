export type SingleBroadcastResponseData = {
	broadcast: {
		id: number;
		created_at: string;
		subject: string;
		description: string;
		content: string;
		public: boolean;
		published_at: string;
		send_at: string;
		thumbnail_alt: string;
		thumbnail_url: string;
		email_address: string;
		email_layout_template: string;
	};
};
