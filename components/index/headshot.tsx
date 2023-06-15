import Image from 'next/image';
import React from 'react';

const Headshot: React.FC = () => {
	return <Image src='/assets/headshot.png' width={80} height={80} alt='headshot-logo' className='white-box-shadow rounded-full border-2 border-solid border-gray-500' />;
};

export default Headshot;
