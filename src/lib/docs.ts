export type DocSection = {
	title: string;
	slug: string;
	description: string;
};

export type DocGroup = {
	title: string;
	items: DocSection[];
};

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
				description: 'Install Linguo on macOS, Linux, and Windows'
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
