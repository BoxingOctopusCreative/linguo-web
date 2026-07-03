<script lang="ts">
	import { DEFAULT_DESCRIPTION } from '$lib/site';

	const languages = [
		{ name: 'Python', runtime: 'python-build-standalone', project: 'pyproject.toml + pip-backed .venv' },
		{ name: 'Node.js', runtime: 'nodejs.org/dist', project: 'package.json via npm' },
		{
			name: 'Ruby',
			runtime: 'rv-ruby; RubyInstaller on Windows',
			project: 'Gemfile via bundler'
		},
		{ name: 'Rust', runtime: 'static.rust-lang.org', project: 'Cargo.toml via cargo' },
		{ name: 'Go', runtime: 'go.dev/dl', project: 'go.mod via go tool' },
		{
			name: 'Terraform / OpenTofu',
			runtime: 'HashiCorp / OpenTofu releases',
			project: 'runtime-only'
		}
	];
</script>

<svelte:head>
	<title>Linguo | Multi-language runtime manager</title>
	<meta name="description" content={DEFAULT_DESCRIPTION} />
	<meta property="og:title" content="Linguo | Multi-language runtime manager" />
	<meta property="og:description" content={DEFAULT_DESCRIPTION} />
	<meta name="twitter:title" content="Linguo | Multi-language runtime manager" />
	<meta name="twitter:description" content={DEFAULT_DESCRIPTION} />
</svelte:head>

<section class="hero">
	<div class="container hero-inner">
		<div class="hero-brand">
			<img
				src="/brand/linguo_vertical.png"
				alt="Linguo"
				class="hero-logo"
				width="625"
				height="1240"
				fetchpriority="high"
			/>
			<p class="eyebrow">Open source · Cross-platform</p>
		</div>
		<div class="hero-content">
			<h1>One command shape for every language runtime</h1>
			<p class="lead">
				Linguo is a cross-platform runtime, package, and project manager for Python, Node.js, Ruby,
				Rust, Go, and Terraform/OpenTofu. Pin versions, install toolchains, and run project
				workflows with the same CLI everywhere.
			</p>
			<div class="actions">
				<a href="/docs/install" class="button button-primary">Get started</a>
				<a
					href="https://github.com/BoxingOctopusCreative/linguo"
					class="button button-secondary"
					target="_blank"
					rel="noopener noreferrer"
				>
					View on GitHub
				</a>
			</div>
			<pre class="hero-code" aria-label="Example command"><code>linguo &lt;language&gt; &lt;command&gt;</code></pre>
		</div>
	</div>
</section>

<section class="features">
	<div class="container grid">
		<article>
			<h2>Unified CLI</h2>
			<p>
				Every language shares the same command shape: install, list, use, run, upgrade. Learn it
				once, use it everywhere.
			</p>
		</article>
		<article>
			<h2>Verified downloads</h2>
			<p>
				Every toolchain download is sha256-verified against upstream checksums. Toolchains live under
				<code>~/.linguo/toolchains/&lt;language&gt;/&lt;version&gt;</code>.
			</p>
		</article>
		<article>
			<h2>Project-aware</h2>
			<p>
				Pins live in <code>linguo.toml</code> and activate automatically via shell hooks. Run
				<code>linguo sync</code> at the monorepo root to set up every member project at once.
			</p>
		</article>
	</div>
</section>

<section class="languages">
	<div class="container">
		<h2>Supported languages</h2>
		<div class="table-wrap">
			<table>
				<thead>
					<tr>
						<th scope="col">Language</th>
						<th scope="col">Runtime source</th>
						<th scope="col">Project layer</th>
					</tr>
				</thead>
				<tbody>
					{#each languages as lang (lang.name)}
						<tr>
							<td>{lang.name}</td>
							<td>{lang.runtime}</td>
							<td>{lang.project}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>
</section>

<section class="install-cta">
	<div class="container">
		<h2>Install in seconds</h2>
		<pre><code>curl -fsSL https://raw.githubusercontent.com/BoxingOctopusCreative/linguo/main/install.sh | sh</code></pre>
		<p>
			Or use Homebrew (<code>brew tap boxingoctopuscreative/tap && brew install linguo</code>).
			Prebuilt binaries for macOS, Linux (glibc and musl), and Windows are on the
			<a href="https://github.com/BoxingOctopusCreative/linguo/releases">releases page</a>.
		</p>
	</div>
</section>

<style>
	.hero {
		padding: 3rem 0 4rem;
		border-bottom: 1px solid var(--border);
		background:
			radial-gradient(ellipse 80% 60% at 50% -20%, var(--crimson-subtle), transparent),
			var(--bg);
	}

	.hero-inner {
		display: grid;
		gap: 2.5rem;
		align-items: center;
	}

	@media (min-width: 900px) {
		.hero-inner {
			grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr);
			gap: 3rem;
		}
	}

	.hero-brand {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1.25rem;
	}

	@media (min-width: 900px) {
		.hero-brand {
			align-items: flex-start;
		}
	}

	.hero-logo {
		width: min(100%, 14rem);
		height: auto;
		display: block;
	}

	.hero-content h1 {
		margin-top: 0;
	}

	.eyebrow {
		margin: 0;
		color: var(--accent);
		font-family: var(--font-mono);
		font-size: 0.8125rem;
		letter-spacing: 0.04em;
		text-transform: uppercase;
		text-align: center;
	}

	@media (min-width: 900px) {
		.eyebrow {
			text-align: left;
		}
	}

	.lead {
		max-width: 42rem;
		margin: 0 0 2rem;
		font-size: 1.125rem;
		color: var(--text-muted);
	}

	.actions {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
		margin-bottom: 2.5rem;
	}

	.hero-code {
		max-width: 28rem;
		margin: 0;
	}

	.features {
		padding: 4rem 0;
	}

	.grid {
		display: grid;
		gap: 2rem;
		grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
	}

	.grid h2 {
		margin-top: 0;
		font-size: 1.125rem;
	}

	.grid p {
		margin: 0;
		color: var(--text-muted);
		font-size: 0.9375rem;
	}

	.languages {
		padding: 4rem 0;
		border-top: 1px solid var(--border);
	}

	.languages h2 {
		margin-top: 0;
	}

	.table-wrap {
		overflow-x: auto;
		border: 1px solid var(--border);
		border-radius: var(--radius);
	}

	table {
		width: 100%;
		border-collapse: collapse;
		font-size: 0.9375rem;
	}

	th,
	td {
		padding: 0.875rem 1rem;
		text-align: left;
		border-bottom: 1px solid var(--border);
	}

	tr:last-child td {
		border-bottom: none;
	}

	th {
		background: var(--bg-elevated);
		color: var(--text-muted);
		font-weight: 500;
		font-size: 0.8125rem;
		letter-spacing: 0.03em;
		text-transform: uppercase;
	}

	td:first-child {
		font-weight: 500;
		white-space: nowrap;
	}

	.install-cta {
		padding: 4rem 0 5rem;
		border-top: 1px solid var(--border);
	}

	.install-cta h2 {
		margin-top: 0;
	}

	.install-cta pre {
		max-width: 36rem;
	}
</style>
