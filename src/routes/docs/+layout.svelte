<script lang="ts">
	import { page } from '$app/stores';
	import DocsNav from '$lib/components/DocsNav.svelte';
	import { docMetaForSlug } from '$lib/docs';

	let { children } = $props();

	const slug = $derived($page.url.pathname.replace(/^\/docs\/?/, '').replace(/\/$/, ''));
	const meta = $derived(docMetaForSlug(slug));
</script>

<svelte:head>
	{#if meta}
		<title>{meta.title} | Linguo</title>
		<meta name="description" content={meta.description} />
		<meta property="og:title" content="{meta.title} | Linguo" />
		<meta property="og:description" content={meta.description} />
		<meta name="twitter:title" content="{meta.title} | Linguo" />
		<meta name="twitter:description" content={meta.description} />
	{/if}
</svelte:head>

<div class="docs-shell">
	<div class="container layout">
		<aside class="sidebar">
			<DocsNav />
		</aside>
		<article class="content prose">
			{@render children()}
		</article>
	</div>
</div>

<style>
	.docs-shell {
		padding: 2.5rem 0 4rem;
	}

	.layout {
		display: grid;
		gap: 3rem;
		grid-template-columns: 14rem minmax(0, 1fr);
		align-items: start;
	}

	@media (max-width: 768px) {
		.layout {
			grid-template-columns: 1fr;
		}

		.sidebar {
			border-bottom: 1px solid var(--border);
			padding-bottom: 1.5rem;
		}
	}

	.content :global(h1:first-child) {
		margin-top: 0;
	}

	.prose :global(h2),
	.prose :global(h3),
	.prose :global(h4) {
		scroll-margin-top: 6rem;
	}

	.prose :global(a) {
		text-decoration: underline;
		text-underline-offset: 0.15em;
	}

	.prose :global(blockquote) {
		margin: 1.5rem 0;
		padding: 0.75rem 1rem;
		border-left: 3px solid var(--accent);
		background: var(--bg-elevated);
		color: var(--text-muted);
	}
</style>
