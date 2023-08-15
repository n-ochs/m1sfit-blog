/* eslint-disable max-len */
import Link from 'next/link';
import React from 'react';

interface IBannerProps {
	isVisible: boolean;
	handleCloseBanner: () => void;
}

const Banner: React.FC<IBannerProps> = ({ isVisible, handleCloseBanner }) => {
	return (
		isVisible && (
			<div tabIndex={-1} className='flex justify-between w-full p-2 sm:p-2 md:p-4 border-b border-gray-200 bg-gray-50 dark:bg-black dark:border-gray-600'>
				<div className='flex items-center mx-auto'>
					<p className='flex items-center text-sm font-normal text-gray-500 dark:text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white rounded-lg p-1.5'>
						<span>
							<Link href='/'>← Back to home</Link>
						</span>
					</p>
				</div>
				<div className='flex items-center'>
					<button
						data-dismiss-target='#sticky-banner'
						type='button'
						className='flex-shrink-0 inline-flex justify-center w-7 h-7 items-center text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 dark:hover:bg-gray-600 dark:hover:text-white'
						onClick={handleCloseBanner}
					>
						<svg className='w-3 h-3' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 14 14'>
							<path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6' />
						</svg>
					</button>
				</div>
			</div>
		)
	);
};

export default Banner;
