export type DistributionPlatform = {
	name: string;
	href: string;
	logo: string;
};

export const distributionPlatforms: DistributionPlatform[] = [
	{
		name: 'GitHub Releases',
		href: 'https://github.com/BoxingOctopusCreative/linguo/releases',
		logo: '/distribution/github.svg'
	},
	{
		name: 'Crates.io',
		href: 'https://crates.io/crates/linguo',
		logo: '/distribution/crates-io.svg'
	},
	{
		name: 'Chocolatey',
		href: 'https://community.chocolatey.org/packages/linguo',
		logo: '/distribution/chocolatey.svg'
	},
	{
		name: 'Homebrew',
		href: 'https://github.com/BoxingOctopusCreative/homebrew-tap',
		logo: '/distribution/homebrew.svg'
	},
	{
		name: 'Launchpad PPA',
		href: 'https://launchpad.net/~boxingoctopuscreative/+archive/ubuntu/ppa',
		logo: '/distribution/launchpad.svg'
	},
	{
		name: 'Arch Linux AUR',
		href: 'https://aur.archlinux.org/packages/linguo-bin',
		logo: '/distribution/arch-linux.svg'
	}
];
