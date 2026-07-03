<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import {
		DEFAULT_DESCRIPTION,
		OG_IMAGE,
		OG_IMAGE_HEIGHT,
		OG_IMAGE_WIDTH,
		SITE_NAME,
		SITE_URL
	} from '$lib/site';
	import '../app.css';

	let { children, data } = $props();
</script>

<svelte:head>
	<link rel="icon" type="image/png" href="/brand/linguo_favicon.png" />
	<link rel="preconnect" href="https://use.typekit.net" crossorigin="anonymous" />
	<link rel="stylesheet" href="https://use.typekit.net/nsm2gtw.css" />
	<meta property="og:site_name" content={SITE_NAME} />
	<meta property="og:type" content="website" />
	<meta property="og:image" content={OG_IMAGE} />
	<meta property="og:image:width" content={String(OG_IMAGE_WIDTH)} />
	<meta property="og:image:height" content={String(OG_IMAGE_HEIGHT)} />
	<meta property="og:image:alt" content={SITE_NAME} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:image" content={OG_IMAGE} />
	<meta property="og:url" content={SITE_URL} />
	<meta property="og:title" content="{SITE_NAME} | Multi-language runtime manager" />
	<meta property="og:description" content={DEFAULT_DESCRIPTION} />
	<meta name="twitter:title" content="{SITE_NAME} | Multi-language runtime manager" />
	<meta name="twitter:description" content={DEFAULT_DESCRIPTION} />
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
