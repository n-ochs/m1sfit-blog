import Image from 'next/image';
import React, { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';

import SocialLinks from '@components/social-links';
import { useMutation } from '@tanstack/react-query';
import { addSub } from '@util/api';

const Hero: React.FC = () => {
	const [emailAddress, setEmailAddress] = useState<string>('');

	const { mutate } = useMutation({
		mutationFn: addSub,
		onSuccess: () => {
			toast.dismiss();
			toast.success('Thank you for subscribing!', { duration: 5000 });
			setEmailAddress('');
		},
		onError: () => {
			toast.dismiss();
			toast.error('Something went wrong. Please try again.');
			setEmailAddress('');
		}
	});

	const handleSubmit: (e: FormEvent) => void = (e: FormEvent) => {
		e.preventDefault();
		toast.loading('Subscribing...');
		mutate(emailAddress);
	};

	return (
		<div className='space-y-4 text-white'>
			<div className='pl-2 md:pl-0'>
				<Image src='/assets/headshot.png' width={80} height={80} alt='headshot-logo' className='white-box-shadow rounded-full border-2 border-solid border-gray-500' />
			</div>

			<div className='flex flex-col items-center justify-center gap-8 lg:flex-row'>
				{/* Left */}
				<div className='space-y-4 p-2 lg:w-[28rem] lg:p-0'>
					<h1 className='heading text-5xl'>Meta Mondays</h1>
					<p className='text-sm md:text-base'>Newsletter for players who want to improve at Valorant.</p>
					<p className='text-sm md:text-base'>
						Subscribe to get my pro insight on how to improve your skills, impact your games and ignite your journey into high elo in less than 4 minutes every Monday.
					</p>
					<SocialLinks />
				</div>

				{/* Right */}
				<div className='w-full space-y-4 p-2 lg:w-96 lg:p-0'>
					<form className='relative space-y-4' onSubmit={handleSubmit}>
						<input
							type='text'
							className='white-box-shadow w-full rounded-lg bg-neutral-500 bg-opacity-50 px-4 py-2 font-bold text-white focus:outline-none focus:ring-2 focus:ring-blue-500'
							placeholder='Email Address'
							name='email'
							required
							value={emailAddress}
							onChange={(e) => setEmailAddress(e.target.value)}
						/>
						<button type='submit' className='btn animate-border white-box-shadow w-full rounded-md bg-neutral-900 px-4 py-2 uppercase'>
							Subscribe
						</button>
						<p className='text-center text-xs'>I will never sell your email. Unsubscribe at any time.</p>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Hero;
