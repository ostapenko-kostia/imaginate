import { Header } from '@/components/layout/header/header'
import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import { Toaster } from 'sonner'
import './globals.css'
import { Providers } from './providers'

const nunito = Nunito({
	subsets: ['latin']
})

export const metadata: Metadata = {
	title: 'Imaginate',
	description:
		'Imaginate is an AI-powered logo generator that creates unique and professional logos in seconds. Using advanced artificial intelligence algorithms, Imaginate delivers high-quality designs tailored to your brand. Integrate the API for automated logo generation in your app or service.'
}

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<body className={nunito.className}>
				<Providers>
					<Toaster />
					<Header />
					<main>{children}</main>
				</Providers>
			</body>
		</html>
	)
}
