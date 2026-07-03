<script lang="ts">
	import { page } from '$app/stores';
	import { docGroups, docHref } from '$lib/docs';

	function isActive(slug: string): boolean {
		const path = $page.url.pathname.replace(/\/$/, '') || '/';
		const href = docHref(slug).replace(/\/$/, '') || '/';
		return path === href;
	}
</script>

<nav class="docs-nav" aria-label="Documentation">
	{#each docGroups as group (group.title)}
		<section>
			<h2>{group.title}</h2>
			<ul>
				{#each group.items as item (item.slug)}
					<li>
						<a href={docHref(item.slug)} class:active={isActive(item.slug)}>
							{item.title}
						</a>
					</li>
				{/each}
			</ul>
		</section>
	{/each}
</nav>

<style>
	.docs-nav {
		position: sticky;
		top: 5rem;
		align-self: start;
	}

	section + section {
		margin-top: 1.75rem;
	}

	h2 {
		margin: 0 0 0.625rem;
		font-size: 0.75rem;
		font-weight: 600;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: var(--text-muted);
	}

	ul {
		margin: 0;
		padding: 0;
		list-style: none;
	}

	li + li {
		margin-top: 0.125rem;
	}

	a {
		display: block;
		padding: 0.375rem 0.625rem;
		margin-inline: -0.625rem;
		border-radius: 0.375rem;
		color: var(--text-muted);
		font-size: 0.9375rem;
	}

	a:hover {
		color: var(--text);
		background: var(--bg-subtle);
	}

	a.active {
		color: var(--button-text);
		background: var(--link);
	}
</style>
