export type SingleBroadcastRespData = {
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

export class TrimmedBroadcast {
	id: number = null;
	subject: string = null;
	description: string = null;
	public: boolean = null;
	published_at: string = null;
	thumbnail_alt: string = null;
	thumbnail_url: string = null;
}

export class TrimmedBroadcastRespData {
	broadcast: TrimmedBroadcast = new TrimmedBroadcast();
}
