import { GenerateLogo } from '@/components/home/generate-logo'
import { Title } from '@/components/home/title'
import { Container } from '@/components/layout/container'

export default function Home() {
	return (
		<section>
			<Container className='py-6 flex flex-col items-center gap-10'>
				<Title />
        <GenerateLogo />
			</Container>
		</section>
	)
}
