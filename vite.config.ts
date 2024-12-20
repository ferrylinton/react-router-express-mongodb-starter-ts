import { reactRouter } from '@react-router/dev/vite';
import autoprefixer from 'autoprefixer';
import tailwindcss from 'tailwindcss';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { envOnlyMacros } from 'vite-env-only';

export default defineConfig(config => {
	return {
		build: {
			rollupOptions: config.isSsrBuild
				? {
						input: './server/server-prod.ts',
					}
				: undefined,
		},
		css: {
			postcss: {
				plugins: [tailwindcss, autoprefixer],
			},
		},
		plugins: [reactRouter(), tsconfigPaths(), envOnlyMacros()],
	};
});
