import { cloudflareTest } from "@cloudflare/vitest-plugin";
import { defineConfig } from "vite-plus";

export default defineConfig({
	plugins: [
		cloudflareTest({
			wrangler: { configPath: "./wrangler.jsonc" },
		}),
	],
	// Oxfmt. Keeps the formatting this template had with Biome's defaults.
	fmt: {
		useTabs: true,
		printWidth: 80,
		// Biome left package.json key order alone.
		sortPackageJson: false,
		// Node built-ins, packages, then relative paths, with a blank line
		// between groups.
		sortImports: {
			groups: [
				"builtin",
				"external",
				["internal", "subpath"],
				["parent", "sibling", "index"],
				"unknown",
			],
		},
		// wrangler.jsonc and friends were written without trailing commas.
		overrides: [{ files: ["*.jsonc"], options: { trailingComma: "none" } }],
		ignorePatterns: ["worker-configuration.d.ts", "pnpm-lock.yaml"],
	},
	// Oxlint, with type-aware rules and type checking (replaces tsc --noEmit).
	lint: {
		plugins: ["typescript", "unicorn", "oxc", "import"],
		categories: {
			correctness: "error",
			suspicious: "warn",
		},
		ignorePatterns: ["worker-configuration.d.ts"],
		jsPlugins: [{ name: "vite-plus", specifier: "vite-plus/oxlint-plugin" }],
		rules: { "vite-plus/prefer-vite-plus-imports": "error" },
		options: { typeAware: true, typeCheck: true },
	},
});
