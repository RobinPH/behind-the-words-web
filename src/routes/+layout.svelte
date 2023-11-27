<script>
	import Sidebar from '$lib/Sidebar.svelte';
	import '../app.css';
	import { predictionQueue } from '../stores/store';
</script>

<div data-theme="dracula" class="min-h-screen">
	<div class="drawer">
		<input id="my-drawer-3" type="checkbox" class="drawer-toggle" />
		<div class="sticky top-0 hidden h-screen bg-white w-72 lg:block">
			<Sidebar />
		</div>
		<div class="flex flex-col drawer-content">
			<!-- Navbar -->
			<div class="sticky top-0 z-10 w-full shadow-xl navbar bg-base-200">
				<div class="flex-none lg:hidden">
					<label for="my-drawer-3" aria-label="open sidebar" class="btn btn-square btn-ghost">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							class="inline-block w-6 h-6 stroke-current"
							><path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M4 6h16M4 12h16M4 18h16"
							/></svg
						>
					</label>
				</div>
				<div class="flex-1 px-2 mx-2 text-lg font-bold text-info">
					<div class="hidden sm:block">Behind the Words</div>
				</div>
				<div class="flex-none">
					<a
						class="btn btn-info btn-sm"
						href="/"
						on:click={() => {
							predictionQueue.set([]);
						}}>NEW</a
					>
				</div>
			</div>
			<!-- Page content here -->
			<slot />
		</div>
		<div class="z-10 grid drawer-side lg:hidden">
			<label for="my-drawer-3" aria-label="close sidebar" class="drawer-overlay" />
			<Sidebar />
		</div>
	</div>
</div>
