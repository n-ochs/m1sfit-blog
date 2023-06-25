import React from 'react';
import { BsDiscord, BsTwitter, BsYoutube } from 'react-icons/bs';

const SocialLinks: React.FC = () => {
	return (
		<div className='flex items-center justify-center space-x-4'>
			<a className='rounded-full bg-white p-2 hover:opacity-70' href='https://twitter.com/m1sfitx' target='_blank'>
				<BsTwitter color='black' size='25px' />
			</a>
			<a className='rounded-full bg-white p-2 hover:opacity-70' href='https://discord.gg/m1sfit' target='_blank'>
				<BsDiscord color='black' size='25px' />
			</a>
			<a className='rounded-full bg-white p-2 hover:opacity-70' href='https://www.youtube.com/@m1sfitx' target='_blank'>
				<BsYoutube color='black' size='25px' />
			</a>
		</div>
	);
};

export default SocialLinks;
