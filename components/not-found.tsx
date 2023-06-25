import Link from 'next/link';

const NotFound: React.FC = () => {
	return (
		<main>
			<div className='flex h-screen w-full items-center justify-start bg-black px-4 text-white md:px-8'>
				<div className='mx-auto max-w-lg text-center'>
					<h3 className='mb-5 text-4xl font-semibold sm:text-5xl'>Page not found</h3>
					<Link href='/'>← Go to home</Link>
				</div>
			</div>
		</main>
	);
};

export default NotFound;
