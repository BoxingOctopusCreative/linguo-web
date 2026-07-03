<script lang="ts">
	import { page } from '$app/stores';
	import type { GitHubStats } from '$lib/github';
	import { formatStarCount } from '$lib/github';
	import GitHubIcon from '$lib/components/GitHubIcon.svelte';

	interface Props {
		github: GitHubStats;
	}

	let { github }: Props = $props();

	const githubUrl = 'https://github.com/BoxingOctopusCreative/linguo';

	const githubLabel = $derived.by(() => {
		const parts = ['View Linguo on GitHub'];
		if (github.version) parts.push(github.version);
		if (github.stars !== null) parts.push(`${formatStarCount(github.stars)} stars`);
		return parts.join(', ');
	});
</script>

<header class="header">
	<div class="container inner">
		<a href="/" class="logo">
			<img
				src="/brand/linguo_wide.png"
				alt="Linguo"
				class="logo-image"
				width="1194"
				height="575"
			/>
		</a>

		<nav aria-label="Main">
			<ul>
				<li>
					<a
						href="/docs"
						class="docs-link text-display"
						class:active={$page.url.pathname.startsWith('/docs')}
					>
						Docs
					</a>
				</li>
				<li>
					<a
						href={githubUrl}
						class="github-link"
						target="_blank"
						rel="noopener noreferrer"
						aria-label={githubLabel}
					>
						<GitHubIcon class="github-icon" />
						<span class="github-meta">
							{#if github.version}
								<span class="github-version">{github.version}</span>
							{/if}
							{#if github.stars !== null}
								<span class="github-stars">
									<span class="github-stars-count">{formatStarCount(github.stars)}</span>
									<span class="sr-only">stars</span>
								</span>
							{/if}
						</span>
					</a>
				</li>
			</ul>
		</nav>
	</div>
</header>

<style>
	.header {
		position: sticky;
		top: 0;
		z-index: 10;
		border-bottom: 1px solid rgb(140 30 50 / 0.45);
		background: var(--nav-bg);
	}

	.inner {
		display: flex;
		align-items: center;
		justify-content: space-between;
		min-height: 3.75rem;
	}

	.logo {
		display: inline-flex;
		align-items: center;
		line-height: 0;
	}

	.logo:hover {
		opacity: 0.9;
	}

	.logo-image {
		display: block;
		height: 2rem;
		width: auto;
	}

	nav ul {
		display: flex;
		align-items: center;
		gap: 1.5rem;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	nav a:not(.docs-link) {
		color: var(--text-muted);
		font-size: 0.9375rem;
	}

	nav a:not(.docs-link):hover {
		color: var(--text);
	}

	.docs-link {
		font-size: 1.25rem;
		line-height: 1;
		color: var(--link);
	}

	.docs-link:hover {
		color: var(--text);
	}

	.github-link {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.375rem 0.625rem;
		margin: -0.375rem -0.625rem;
		border: 1px solid var(--border);
		border-radius: var(--radius);
		color: var(--text);
		line-height: 1;
	}

	.github-link:hover {
		border-color: var(--text-muted);
		color: var(--text);
	}

	.github-link :global(.github-icon) {
		width: 1.125rem;
		height: 1.125rem;
		flex-shrink: 0;
	}

	.github-meta {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.8125rem;
		font-variant-numeric: tabular-nums;
	}

	.github-version {
		color: var(--text-muted);
		font-weight: 500;
	}

	.github-stars {
		display: inline-flex;
		align-items: center;
		gap: 0.25rem;
		color: var(--text-muted);
	}

	.github-stars::before {
		content: '★';
		font-size: 0.75rem;
		color: #ffc200;
	}
</style>
