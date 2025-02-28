import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 's3.eu-north-1.amazonaws.com',
				pathname: '/imaginate-bucket/**'
			}
		]
	}
}

export default nextConfig
