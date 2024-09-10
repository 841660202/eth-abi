<div class="grid grid-cols-1 gap-10 mx-4">
	<div class="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-10 sm:gap-x-0">
		{#each [1, 2, 3, 4, 5, 6, 7] as item}
			<div class="text-center sm:text-left">
				<div class="card glass w-96">
					<figure>
						<img
							src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
							alt="car!"
						/>
					</figure>
					<div class="card-body">
						<h2 class="card-title">Life hack</h2>
						<p>How to park your car at your garage?</p>
						<div class="card-actions justify-end">
							<button class="btn btn-primary">Learn now!</button>
						</div>
					</div>
				</div>
			</div>
		{/each}
	</div>

	<div class="grid grid-cols-1 gap-10">
		{#each [1, 2, 3, 4, 5, 6, 7] as item}
			<div class="card card-side bg-base-100 shadow-xl">
				<figure>
					<img
						src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
						alt="Movie"
					/>
				</figure>
				<div class="card-body">
					<h2 class="card-title">New movie is released! {item}</h2>
					<p>Click the button to watch on Jetflix app.</p>
					<div class="card-actions justify-end">
						<button class="btn btn-primary">Watch</button>
					</div>
				</div>
			</div>
		{/each}
	</div>
</div>

<style lang="postcss">
	:global(html) {
	}
</style>
