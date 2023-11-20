import React from 'react';

const BroadcastLoader: React.FC = () => {
	return (
		<div className='mx-auto flex flex-col space-y-12 px-2 pt-4 sm:px-2 sm:pt-4 md:px-4 md:pt-4 lg:space-y-6 lg:px-8 lg:pt-8'>
			{[0, 1, 2, 3].map(() => {
				return (
					<div className='flex flex-col items-center gap-2 sm:flex-col sm:gap-2 md:flex-row lg:gap-6 bg-slate-700'>
						<div className='white-box-shadow rounded-lg h-[225px] w-[400px] animate pulse bg-slate-700'></div>
						<div className='w-[300px] h-[24px] animate pulse bg-slate-700'></div>
						<div className='w-[200px] h-[24px] animate pulse bg-slate-700'></div>
					</div>
				);
			})}
		</div>
	);
};

export default BroadcastLoader;
