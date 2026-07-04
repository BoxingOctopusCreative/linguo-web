<script lang="ts">
	import { distributionPlatforms } from '$lib/distribution';
</script>

<section class="get-it-on">
	<div class="container">
		<h2>Get it on</h2>
		<ul class="platform-list">
			{#each distributionPlatforms as platform (platform.name)}
				<li>
					<a
						href={platform.href}
						class="platform-link"
						target="_blank"
						rel="noopener noreferrer"
						aria-label="Get Linguo on {platform.name}"
					>
						<img src={platform.logo} alt="" class="platform-logo" />
						<span class="sr-only">{platform.name}</span>
					</a>
				</li>
			{/each}
		</ul>
		<p class="footnote">
			Need curl, MSI, or Linux packages? See the full
			<a href="/docs/install">installation guide</a>.
		</p>
	</div>
</section>

<style>
	.get-it-on {
		padding: 4rem 0 5rem;
		border-top: 1px solid var(--border);
	}

	.get-it-on h2 {
		margin-top: 0;
	}

	.platform-list {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
		list-style: none;
		margin: 0 0 1.5rem;
		padding: 0;
	}

	.platform-link {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0.25rem;
		transition: opacity 0.15s, transform 0.15s;
	}

	.platform-link:hover {
		opacity: 0.85;
		transform: translateY(-1px);
	}

	.platform-logo {
		display: block;
		height: 2.25rem;
		width: auto;
		max-width: 7.5rem;
		object-fit: contain;
	}

	.footnote {
		margin: 0;
		color: var(--text-muted);
		font-size: 0.9375rem;
	}
</style>
