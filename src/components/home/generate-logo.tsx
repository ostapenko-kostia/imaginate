'use client'

import { useGenerateLogo } from '@/hooks/useGenerateLogo'
import { CrownIcon, DownloadIcon, ImageIcon, LoaderIcon } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { Button } from '../ui/button'
import { QUALITY } from '@/typing/types'
import { cn } from '@/lib/utils'
import Link from 'next/link'

export function GenerateLogo() {
	const [prompt, setPrompt] = useState<string>('')
	const [quality, setQuality] = useState<QUALITY>('speed')

	const [loadingToastId, setLoadingToastId] = useState<string | number>('')
	const { mutateAsync: generateLogo, isSuccess, isError, isPending, data } = useGenerateLogo()

	useEffect(() => {
		if (isPending) {
			const loadingToastId = toast.loading('Generating...')
			setLoadingToastId(loadingToastId)
		}
		if (isSuccess || isError) {
			loadingToastId && loadingToastId && toast.dismiss(loadingToastId)
		}
	}, [isPending, isSuccess, isError])

	const handleGenerate = async () => {
		try {
			await generateLogo({ prompt, quality })
		} catch {}
	}

	return (
		<div className='border rounded-xl p-6 w-3/4 max-sm:w-full'>
			<div className='w-full h-full grid grid-cols-[1fr_1.2fr] max-lg:grid-cols-1 gap-6'>
				<div className='flex flex-col items-center gap-5'>
					<h2 className='text-xl'>Create an logo from text prompt</h2>
					<div className='relative w-full h-min'>
						<textarea
							name='prompt'
							id='prompt'
							value={prompt}
							onChange={e => setPrompt(e.target.value)}
							placeholder='Enter your prompt. You can include a logo title, suggested style and even whatever you want.'
							className='border no-scrollbar outline-none w-full h-[100px] resize-none px-4 py-2 rounded-xl'
							maxLength={250}
						/>
						<span className='absolute text-sm text-nowrap opacity-50 bottom-3 right-3'>
							{prompt.length}/250
						</span>
					</div>
					<h2 className='text-lg self-start -mb-3'>Preference</h2>
					<div className='relative w-full h-16 grid grid-cols-2 p-2 rounded-2xl bg-slate-50'>
						<button
							onClick={() => setQuality('speed')}
							className={cn(
								'rounded-l-2xl bg-slate-200 transition-colors duration-300 cursor-pointer flex items-center justify-center text-lg font-medium',
								{
									'bg-slate-500 text-background ': quality === 'speed'
								}
							)}
						>
							Speed
						</button>
						<button
							onClick={() => setQuality('quality')}
							className={cn(
								'rounded-r-2xl bg-slate-200 transition-colors duration-300 cursor-pointer flex items-center justify-center text-lg font-medium',
								{
									'bg-slate-500 text-background ': quality === 'quality'
								}
							)}
						>
							<CrownIcon
								size={20}
								className='mr-2'
								stroke='#bf9808'
							/>{' '}
							Quality
						</button>
					</div>
					{quality === 'quality' && (
						<p className='text-sm opacity-60 -my-2'>
							* Quality option generates better logos, but takes much more time. It can take up to 1
							minute.
						</p>
					)}
					<Button
						size='lg'
						onClick={handleGenerate}
						disabled={isPending}
						className='w-1/2 text-lg max-[500px]:w-full'
					>
						{isPending && <LoaderIcon className='animate-spin' />}
						{isPending ? 'Generating...' : 'Generate'}
					</Button>
				</div>
				<div>
					{!data && (
						<div className='w-full bg-slate-100 rounded-xl aspect-square animate-pulse relative'>
							<ImageIcon
								className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10'
								size={128}
							/>
						</div>
					)}
					{data && (
						<div className='h-auto w-full flex flex-col'>
							<Image
								width={1000}
								height={1000}
								className='aspect-square h-full w-full rounded-xl mx-auto object-cover'
								src={data?.data?.url}
								alt='logo'
							/>
							<Link
								className='block mx-auto w-1/2'
								href={data?.data?.url}
								download
							>
								<Button className='w-full mx-auto mt-5'>
									<DownloadIcon /> Download
								</Button>
							</Link>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}
