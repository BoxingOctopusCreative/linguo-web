<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import '../app.css';

	let { children, data } = $props();
</script>

<svelte:head>
	<link rel="icon" type="image/png" href="/brand/linguo_favicon.png" />
	<link rel="preconnect" href="https://use.typekit.net" crossorigin="anonymous" />
	<link rel="stylesheet" href="https://use.typekit.net/nsm2gtw.css" />
</svelte:head>

<div class="site">
	<Header github={data.github} />
	<main>{@render children()}</main>
	<Footer />
</div>

<style>
	.site {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
	}
</style>
