module.exports = {
	eslint: {
		// Warning: Dangerously allow production builds to successfully complete even if
		// your project has ESLint errors.
		ignoreDuringBuilds: true
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'pbs.twimg.com',
				port: ''
			},
			{
				protocol: 'https',
				hostname: 'embed.filekitcdn.com',
				port: ''
			}
		]
	}
};
