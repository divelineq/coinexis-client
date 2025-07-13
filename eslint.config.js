import pluginQuery from "@tanstack/eslint-plugin-query";
import importPlugin from "eslint-plugin-import";
import eslintPluginReact from "eslint-plugin-react";
import eslintPluginReactHooks from "eslint-plugin-react-hooks";
import sonarjs from "eslint-plugin-sonarjs";
// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";
import eslintPluginUnicorn from "eslint-plugin-unicorn";
import globals from "globals";
import tseslint from "typescript-eslint";

export const reactHooksOnlyConfig = tseslint.config({
	files: ["**/*.ts", "**/*.tsx"],
	plugins: {
		"react-hooks": eslintPluginReactHooks,
	},
	rules: {
		...eslintPluginReactHooks.configs.recommended.rules,
		"react-hooks/rules-of-hooks": "error",
		"react-hooks/exhaustive-deps": "warn",
		"@typescript-eslint/naming-convention": [
			"error",
			{
				selector: "function",
				format: ["camelCase"],
				filter: {
					regex: "^use[A-Z].*$",
					match: false,
				},
			},
			{
				selector: "function",
				format: ["camelCase"],
				filter: {
					regex: "^use[A-Z].*$",
					match: true,
				},
			},
		],
	},
});

export const reactConfig = tseslint.config(
	{
		files: ["**/*.ts", "**/*.tsx"],
		...eslintPluginReact.configs.flat.recommended,
		settings: {
			react: {
				version: "detect",
			},
			componentWrapperFunctions: ["observer", "withOverrides"],
			formComponents: ["HookForm", "HookForm.Dialog", "HookForm.StepperDialog"],
			linkComponents: [{ name: "Link", linkAttribute: "to" }],
		},
		languageOptions: {
			...eslintPluginReact.configs.flat.recommended.languageOptions,
			globals: globals.browser,
		},
		rules: {
			"react/hook-use-state": "warn",
			"react/jsx-boolean-value": "warn",
			"react/jsx-curly-brace-presence": ["warn", "never"],
			"react/jsx-no-script-url": "error",
			"react/jsx-no-useless-fragment": "warn",
			"react/jsx-pascal-case": "warn",
			"react/jsx-sort-props": [
				"warn",
				{
					callbacksLast: true,
					multiline: "last",
					reservedFirst: true,
					shorthandLast: true,
				},
			],
			"react/no-typos": "off",
			"react/no-access-state-in-setstate": "error",
			"react/no-arrow-function-lifecycle": "error",
			"react/prop-types": "off",
			"react/react-in-jsx-scope": "off",
			"react/self-closing-comp": "warn",
			"react/style-prop-object": "warn",
			"react/void-dom-elements-no-children": "error",
		},
	},
	{
		files: ["**/*.stories.@(ts|tsx|js|jsx)"],
		plugins: {
			storybook,
		},
		rules: {
			...storybook.configs.recommended.rules,
		},
	},
	...reactHooksOnlyConfig,
);

export const tanstackQueryConfig = tseslint.config(
	...pluginQuery.configs["flat/recommended"],
);

export default tseslint.config(
	{
		ignores: [
			"**/mockServiceWorker.js",
			"**/routeTree.gen.ts",
			"TODO.ts",
			"**/dist",
			"**/vite.config.ts",
			"**/.storybook/*.ts",
			"**/vite.config.ts.*",
			"**/vite.server.config.ts",
			"**/vitest.global-setup.ts",
			"**/vitest.global.config.ts",
			"**/vitest.workspace.ts",
		],
	},
	{
		linterOptions: {
			reportUnusedDisableDirectives: "warn",
			reportUnusedInlineConfigs: "warn",
		},
	},
	{
		...sonarjs.configs.recommended,
		files: ["**/*.ts", "**/*.tsx"],
		rules: {
			"sonarjs/cognitive-complexity": "warn",
			"sonarjs/comma-or-logical-or-case": "warn",
			"sonarjs/deprecation": "warn",
			"sonarjs/no-all-duplicated-branches": "warn",
			"sonarjs/no-duplicated-branches": "warn",
			"sonarjs/no-empty-collection": "warn",
			"sonarjs/no-identical-conditions": "warn",
			"sonarjs/no-identical-functions": "warn",
			"sonarjs/no-identical-expressions": "warn",
			"sonarjs/no-inverted-boolean-check": "warn",
			"sonarjs/no-one-iteration-loop": "warn",
			"sonarjs/no-undefined-argument": "warn",
			"sonarjs/no-unused-collection": "warn",
			"sonarjs/no-redundant-optional": "warn",
			"sonarjs/prefer-default-last": "warn",
			"sonarjs/prefer-immediate-return": "warn",
			"sonarjs/prefer-single-boolean-return": "warn",
			"sonarjs/prefer-regexp-exec": "warn",
			"sonarjs/public-static-readonly": "warn",
		},
	},
	{
		files: ["**/*.ts", "**/*.tsx"],
		plugins: {
			unicorn: eslintPluginUnicorn,
		},
		rules: {
			"unicorn/better-regex": "warn",
			"unicorn/catch-error-name": "warn",
			"unicorn/consistent-function-scoping": "error",
			"unicorn/custom-error-definition": "error",
			"unicorn/error-message": "error",
			"unicorn/escape-case": "warn",
			"unicorn/expiring-todo-comments": "warn",
			"unicorn/explicit-length-check": "warn",
			"unicorn/new-for-builtins": "error",
			"unicorn/no-abusive-eslint-disable": "error",
			"unicorn/no-array-for-each": "warn",
			"unicorn/no-array-push-push": "warn",
			"unicorn/no-await-expression-member": "warn",
			"unicorn/no-document-cookie": "error",
			"unicorn/no-for-loop": "warn",
			"unicorn/no-hex-escape": "warn",
			"unicorn/no-instanceof-array": "warn",
			"unicorn/no-invalid-remove-event-listener": "error",
			"unicorn/no-lonely-if": "warn",
			"unicorn/no-new-array": "warn",
			"unicorn/no-new-buffer": "warn",
			"unicorn/no-object-as-default-parameter": "error",
			"unicorn/no-static-only-class": "warn",
			"unicorn/no-this-assignment": "error",
			"unicorn/no-typeof-undefined": "error",
			"unicorn/no-unreadable-iife": "error",
			"unicorn/no-useless-fallback-in-spread": "warn",
			"unicorn/no-useless-length-check": "warn",
			"unicorn/no-useless-spread": "warn",
			"unicorn/numeric-separators-style": "warn",
			"unicorn/prefer-add-event-listener": "warn",
			"unicorn/prefer-array-find": "warn",
			"unicorn/prefer-array-flat": "warn",
			"unicorn/prefer-array-flat-map": "warn",
			"unicorn/prefer-array-index-of": "warn",
			"unicorn/prefer-array-some": "warn",
			"unicorn/prefer-at": "warn",
			"unicorn/prefer-date-now": "warn",
			"unicorn/prefer-default-parameters": "warn",
			"unicorn/prefer-dom-node-append": "warn",
			"unicorn/prefer-dom-node-remove": "warn",
			"unicorn/prefer-export-from": "warn",
			"unicorn/prefer-includes": "warn",
			"unicorn/prefer-keyboard-event-key": "warn",
			"unicorn/prefer-logical-operator-over-ternary": "warn",
			"unicorn/prefer-math-trunc": "error",
			"unicorn/prefer-modern-dom-apis": "warn",
			"unicorn/prefer-modern-math-apis": "warn",
			"unicorn/prefer-native-coercion-functions": "warn",
			"unicorn/prefer-negative-index": "warn",
			"unicorn/prefer-object-from-entries": "warn",
			"unicorn/prefer-optional-catch-binding": "warn",
			"unicorn/prefer-prototype-methods": "warn",
			"unicorn/prefer-reflect-apply": "warn",
			"unicorn/prefer-regexp-test": "warn",
			"unicorn/prefer-set-size": "error",
			"unicorn/prefer-spread": "warn",
			"unicorn/prefer-string-slice": "warn",
			"unicorn/prefer-string-starts-ends-with": "warn",
			"unicorn/prefer-string-trim-start-end": "warn",
			"unicorn/prefer-type-error": "warn",
			"unicorn/require-array-join-separator": "warn",
			"unicorn/require-number-to-fixed-digits-argument": "warn",
			"unicorn/throw-new-error": "warn",
		},
	},
	{
		files: ["**/*.ts", "**/*.tsx"],
		languageOptions: {
			parserOptions: {
				projectService: true,
			},
		},
		settings: {
			"import/resolver": {
				typescript: {
					alwaysTryTypes: true,
				},
			},
		},
		extends: [
			tseslint.configs.recommendedTypeChecked,
			importPlugin.flatConfigs.recommended,
			importPlugin.flatConfigs.typescript,
		],
		rules: {
			"import/newline-after-import": "warn",
			"import/no-named-as-default": "off",
			"import/no-named-as-default-member": "off",
			"import/default": "off",
			"import/named": "off",
			"import/no-duplicates": "off",
			"import/no-unresolved": [
				"error",
				{
					ignore: [
						"virtual:pwa-register/react",
						"@ask/features",
						"@ask/ridership",
						"@ask/modular-catalogs",
						"@ask/support",
						"@ask/navigation",
						"@ask/assets",
						"@ask/tools",
						"@ask/hooks",
						"@ask/types",
						"@ask/ui",
						"@ask/api",
					],
				},
			],
			"import/no-cycle": "off",
			"import/namespace": "off",
			"import/no-deprecated": "off",
			"prefer-const": "warn",
			"no-console": [
				"error",
				{
					allow: ["warn", "error", "info"],
				},
			],
			"no-use-before-define": "off",
			"no-unused-vars": "off",
			"require-await": "off",
			"@typescript-eslint/naming-convention": [
				"warn",
				{
					selector: "variable",
					format: ["camelCase", "UPPER_CASE", "PascalCase"],
					leadingUnderscore: "allow",
				},
				{
					selector: "function",
					format: ["camelCase", "PascalCase"],
					leadingUnderscore: "allow",
				},
				{
					selector: ["typeLike", "enum", "enumMember", "class"],
					format: ["PascalCase"],
					leadingUnderscore: "forbid",
				},
				{
					selector: "typeParameter",
					format: ["PascalCase"],
					prefix: ["T"],
				},
				{
					selector: "interface",
					format: ["PascalCase"],
				},
				{
					selector: [
						"classProperty",
						"objectLiteralProperty",
						"typeProperty",
						"classMethod",
						"objectLiteralMethod",
						"typeMethod",
						"accessor",
						"enumMember",
						"parameter",
						"memberLike",
						"typeParameter",
					],
					format: null,
					modifiers: ["requiresQuotes"],
				},
			],
			"@typescript-eslint/require-await": "error",
			"@typescript-eslint/no-unnecessary-type-assertion": "warn",
			"@typescript-eslint/no-use-before-define": ["error", "nofunc"],
			"@typescript-eslint/array-type": "warn",
			"@typescript-eslint/consistent-type-exports": "off",
			"@typescript-eslint/consistent-type-imports": "off",
			"@typescript-eslint/unbound-method": "off",
			"@typescript-eslint/no-floating-promises": "off",
			"@typescript-eslint/no-misused-promises": "off",
			"@typescript-eslint/no-unsafe-assignment": "off",
			"@typescript-eslint/no-unsafe-call": "off",
			"@typescript-eslint/no-unsafe-member-access": "off",
			"@typescript-eslint/no-unsafe-argument": "off",
			"@typescript-eslint/no-unsafe-return": "off",
			"@typescript-eslint/no-unnecessary-template-expression": "warn",
			"@typescript-eslint/no-unsafe-enum-comparison": "off",
			"@typescript-eslint/explicit-member-accessibility": [
				"warn",
				{
					overrides: {
						constructors: "no-public",
					},
				},
			],
			"@typescript-eslint/no-base-to-string": "warn",
			"@typescript-eslint/no-confusing-non-null-assertion": "warn",
			"@typescript-eslint/no-confusing-void-expression": [
				"warn",
				{
					ignoreArrowShorthand: true,
				},
			],
			"@typescript-eslint/no-duplicate-enum-values": "error",
			"@typescript-eslint/no-empty-function": "off",
			"@typescript-eslint/no-empty-interface": "off",
			"@typescript-eslint/no-explicit-any": "off",
			"@typescript-eslint/no-invalid-void-type": "error",
			"@typescript-eslint/no-meaningless-void-operator": "error",
			"@typescript-eslint/no-non-null-assertion": "off",
			"@typescript-eslint/no-restricted-imports": [
				"error",
				{
					paths: [
						{
							name: "react-map-gl",
							message:
								"Т.к. мы используем maplibre, необходимо импортировать всё только из react-map-gl/maplibre",
						},
						{
							name: "react-hook-form",
							importNames: ["useForm"],
							message: "Вместо этого используйте useHookForm из @ask/features",
						},
						{
							name: "react-router-dom",
							importNames: ["useForm"],
							message:
								"Возможно вы хотели использовать useHookForm из @ask/features",
						},
						{
							name: "zod",
							message: "Используйте zod/v4",
						},
					],
					patterns: [
						{
							group: ["react-map-gl/*", "!react-map-gl/maplibre"],
							message:
								"Т.к. мы используем maplibre, необходимо импортировать всё только из react-map-gl/maplibre",
						},
					],
				},
			],
			"sort-imports": "off",
			"@typescript-eslint/no-unnecessary-boolean-literal-compare": "warn",
			"@typescript-eslint/no-unnecessary-qualifier": "warn",
			"@typescript-eslint/no-unused-vars": "warn",
			"@typescript-eslint/prefer-includes": "warn",
			"@typescript-eslint/prefer-literal-enum-member": [
				"error",
				{
					allowBitwiseExpressions: true,
				},
			],
			"@typescript-eslint/prefer-string-starts-ends-with": "warn",
			"@typescript-eslint/ban-ts-comment": [
				"error",
				{ "ts-expect-error": "allow-with-description" },
			],
			"@typescript-eslint/no-empty-object-type": "error",
			"@typescript-eslint/no-unsafe-function-type": "error",
			"@typescript-eslint/no-wrapper-object-types": "error",
			"@typescript-eslint/sort-type-constituents": [
				"warn",
				{
					checkIntersections: false,
				},
			],
			"@typescript-eslint/unified-signatures": "error",
			camelcase: "off",
			"default-case-last": "warn",
			eqeqeq: ["warn", "always", { null: "ignore" }],
			"max-classes-per-file": ["error", 1],
			"max-depth": ["error", 4],
			"no-alert": "error",
			"no-await-in-loop": "error",
			"no-constant-binary-expression": "warn",
			"no-constructor-return": "error",
			"no-duplicate-imports": "off",
			"no-else-return": "warn",
			"no-empty": [
				"warn",
				{
					allowEmptyCatch: true,
				},
			],
			"no-eval": "error",
			"no-lonely-if": "off",
			"no-promise-executor-return": "warn",
			"no-restricted-properties": [
				"error",
				{
					message:
						"localeCompare() в 20 раз (реально в 20) медленней, чем Intl.Collator().compare(). Не забудь вынести new Intl.Collator() конструктор за пределы цикла",
					property: "localeCompare",
				},
				{
					object: "JSON",
					property: "parse",
					message:
						"Необходимо использовать функцию parseJson из @ask/tools вместо JSON.parse",
				},
			],
			"no-self-compare": "error",
			"no-unmodified-loop-condition": "error",
			"no-unreachable-loop": "error",
			"no-unused-expressions": [
				"error",
				{
					enforceForJSX: true,
				},
			],
			"no-unused-private-class-members": "warn",
			"no-useless-rename": "warn",
			"object-shorthand": ["warn", "always"],
			"padding-line-between-statements": [
				"warn",
				{
					blankLine: "always",
					next: "*",
					prev: "block",
				},
				{
					blankLine: "always",
					next: "*",
					prev: "block-like",
				},
				{
					blankLine: "always",
					next: "return",
					prev: "const",
				},
				{
					blankLine: "always",
					next: "if",
					prev: "multiline-const",
				},
				{
					blankLine: "always",
					next: "if",
					prev: "expression",
				},
				{
					blankLine: "always",
					next: "multiline-const",
					prev: "*",
				},
				{
					blankLine: "any",
					next: "multiline-const",
					prev: "const",
				},
				{
					blankLine: "any",
					next: "multiline-const",
					prev: "multiline-const",
				},
				{
					blankLine: "always",
					next: "block-like",
					prev: "multiline-const",
				},
				{
					blankLine: "always",
					next: "multiline-block-like",
					prev: "multiline-const",
				},
				{
					blankLine: "always",
					next: "export",
					prev: "*",
				},
				{
					blankLine: "always",
					next: "function",
					prev: "*",
				},
				{
					blankLine: "any",
					next: "export",
					prev: "export",
				},
				{
					blankLine: "never",
					next: "import",
					prev: "import",
				},
			],
			quotes: "off",
			curly: "off",
			"require-atomic-updates": "warn",
			"spaced-comment": "off",
		},
	},
	storybook.configs["flat/recommended"],
);
