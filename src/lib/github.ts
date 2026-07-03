export type GitHubStats = {
	stars: number | null;
	version: string | null;
};

const REPO = 'BoxingOctopusCreative/linguo';

export async function fetchGitHubStats(fetchFn: typeof fetch): Promise<GitHubStats> {
	try {
		const [repoResponse, releaseResponse] = await Promise.all([
			fetchFn(`https://api.github.com/repos/${REPO}`),
			fetchFn(`https://api.github.com/repos/${REPO}/releases/latest`)
		]);

		const repo = repoResponse.ok ? await repoResponse.json() : null;
		const release = releaseResponse.ok ? await releaseResponse.json() : null;

		return {
			stars: typeof repo?.stargazers_count === 'number' ? repo.stargazers_count : null,
			version: typeof release?.tag_name === 'string' ? release.tag_name : null
		};
	} catch {
		return { stars: null, version: null };
	}
}

export function formatStarCount(count: number): string {
	if (count >= 1_000_000) {
		return `${(count / 1_000_000).toFixed(1).replace(/\.0$/, '')}M`;
	}
	if (count >= 1_000) {
		return `${(count / 1_000).toFixed(1).replace(/\.0$/, '')}k`;
	}
	return count.toLocaleString();
}
