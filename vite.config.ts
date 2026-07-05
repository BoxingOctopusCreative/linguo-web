import { mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-static';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import rehypeSlug from 'rehype-slug';

export default defineConfig({
	plugins: [
		sveltekit({
			compilerOptions: {
				runes: ({ filename }) => {
					if (filename.split(/[/\\]/).includes('node_modules')) return undefined;
					if (/\.(md|svx)$/.test(filename)) return false;
					return true;
				}
			},
			adapter: adapter(),
			preprocess: [
				mdsvex({
					extensions: ['.svx', '.md'],
					rehypePlugins: [rehypeSlug]
				})
			],
			extensions: ['.svelte', '.svx', '.md']
		})
	]
});
