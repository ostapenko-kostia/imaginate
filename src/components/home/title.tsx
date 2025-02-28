export function Title() {
	return (
		<div>
			<h1 className='text-center text-5xl max-[500px]:text-4xl max-[400px]:text-3xl font-semibold'>
				<span className='bg-clip-text font-extrabold text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'>
					AI
				</span>{' '}
				Logo Generator
			</h1>
			<p className='text-center text-xl mt-5 max-[500px]:text-lg max-[400px]:text-base'>
				This is an AI Logo Generator. It creates an logo from scratch from a text description.
			</p>
		</div>
	)
}
