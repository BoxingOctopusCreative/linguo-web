export const prerender = true;

import { fetchGitHubStats } from '$lib/github';

export async function load({ fetch }) {
	const github = await fetchGitHubStats(fetch);
	return { github };
}
