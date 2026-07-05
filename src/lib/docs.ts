import GithubSlugger from 'github-slugger';

export type DocSection = {
	title: string;
	slug: string;
	description: string;
};

export type DocGroup = {
	title: string;
	items: DocSection[];
};

export type DocTocEntry = {
	title: string;
	id: string;
	level: 2 | 3 | 4;
};

const docTocSources: Record<string, Array<{ title: string; level: 2 | 3 | 4 }>> = {
	'': [
		{ title: 'Why Linguo?', level: 2 },
		{ title: "What's next?", level: 2 }
	],
	install: [
		{ title: 'PICK YOUR CHANNEL', level: 2 },
		{ title: 'Quick Install via Curl (macOS/Linux)', level: 3 },
		{ title: 'Cargo (Native Rust Package Manager)', level: 3 },
		{ title: 'via Crates.io', level: 4 },
		{ title: 'Build from source', level: 4 },
		{ title: 'macOS', level: 3 },
		{ title: 'Homebrew', level: 4 },
		{ title: 'Release tarball (Intel or Apple silicon)', level: 4 },
		{ title: 'Linux', level: 3 },
		{ title: 'Debian / Ubuntu (Standalone Package Installation)', level: 4 },
		{ title: 'Ubuntu (Via the BOC Engineering PPA)', level: 4 },
		{ title: 'Fedora / RHEL (.rpm)', level: 4 },
		{ title: 'Arch Linux (AUR)', level: 4 },
		{ title: 'Generic tarball (glibc or musl)', level: 4 },
		{ title: 'Windows', level: 3 },
		{ title: 'MSI installer (recommended)', level: 4 },
		{ title: 'Zip archive', level: 4 },
		{ title: 'Chocolatey', level: 4 },
		{ title: 'Shell hook', level: 2 },
		{ title: 'Auto-install (optional)', level: 2 }
	],
	'quick-start': [
		{ title: 'Install a runtime', level: 2 },
		{ title: 'Pin a version', level: 2 },
		{ title: 'Run commands', level: 2 },
		{ title: 'Initialize a project', level: 2 },
		{ title: 'Check status', level: 2 },
		{ title: 'Sync a monorepo', level: 2 }
	],
	usage: [
		{ title: 'Upgrades', level: 2 },
		{ title: 'Project commands', level: 2 },
		{ title: 'Monorepo sync', level: 2 },
		{ title: 'Terraform and OpenTofu', level: 2 },
		{ title: 'Rust channels, components, and targets', level: 2 },
		{ title: 'JVM stack', level: 2 },
		{ title: 'Zig projects', level: 2 },
		{ title: 'Supported languages', level: 2 }
	],
	'version-pins': [
		{ title: 'Pin formats', level: 2 },
		{ title: 'Resolution order', level: 2 },
		{ title: 'Toolchain storage', level: 2 },
		{ title: 'Existing projects', level: 2 }
	]
};

function buildToc(source: Array<{ title: string; level: 2 | 3 | 4 }>): DocTocEntry[] {
	const slugger = new GithubSlugger();
	return source.map(({ title, level }) => ({
		title,
		level,
		id: slugger.slug(title)
	}));
}

export const docTocBySlug: Record<string, DocTocEntry[]> = Object.fromEntries(
	Object.entries(docTocSources).map(([slug, source]) => [slug, buildToc(source)])
);

export function docTocForSlug(slug: string): DocTocEntry[] | undefined {
	return docTocBySlug[slug];
}

export const docGroups: DocGroup[] = [
	{
		title: 'Getting started',
		items: [
			{
				title: 'Introduction',
				slug: '',
				description: 'What Linguo is and how it works'
			},
			{
				title: 'Installation',
				slug: 'install',
				description: 'Install Linguo via Homebrew, curl script, AUR, PPA, or native packages'
			},
			{
				title: 'Quick start',
				slug: 'quick-start',
				description: 'Pin a runtime and run your first Linguo command'
			}
		]
	},
	{
		title: 'Guide',
		items: [
			{
				title: 'Usage',
				slug: 'usage',
				description: 'Linguo runtime and project commands'
			},
			{
				title: 'Version pins',
				slug: 'version-pins',
				description: 'How Linguo resolves and stores runtime version pins'
			}
		]
	}
];

export function docHref(slug: string): string {
	return slug ? `/docs/${slug}` : '/docs';
}

export function docMetaForSlug(slug: string): DocSection | undefined {
	for (const group of docGroups) {
		const item = group.items.find((entry) => entry.slug === slug);
		if (item) return item;
	}
}
