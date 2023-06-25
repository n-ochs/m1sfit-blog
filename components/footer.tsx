import { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';

import SocialLinks from '@components/social-links';
import { useMutation } from '@tanstack/react-query';
import { addSub } from '@util/api';

type FooterProps = { includeForm: boolean };

const Footer: React.FC<FooterProps> = ({ includeForm }) => {
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
		<footer className='pt-12 text-black dark:text-white'>
			<div className='mx-auto max-w-screen-xl px-4 md:px-8'>
				{includeForm && (
					<div className='items-center justify-between gap-12 md:flex'>
						<div className='max-w-lg flex-1'>
							<h3 className='text-2xl font-bold'>Not subscribed?</h3>
						</div>
						<div className='mt-6 flex-1 md:mt-0'>
							<form className='relative flex space-x-4 sm:justify-start md:justify-end' onSubmit={handleSubmit}>
								<input
									type='text'
									className='white-box-shadow rounded-lg bg-neutral-500 bg-opacity-50 px-4 py-2 font-bold text-white focus:outline-none focus:ring-2 focus:ring-blue-500 md:w-72'
									placeholder='Email Address'
									name='email'
									required
									value={emailAddress}
									onChange={(e) => setEmailAddress(e.target.value)}
								/>
								<button type='submit' className='btn animate-border white-box-shadow rounded-md bg-neutral-900 px-4 py-2 uppercase'>
									Subscribe
								</button>
							</form>
						</div>
					</div>
				)}

				<div className='mt-10 flex items-center justify-between border-t py-10 sm:flex-col md:flex-row'>
					<p>© 2023 m1sfit</p>
					<SocialLinks />
				</div>
			</div>
		</footer>
	);
};

export default Footer;
