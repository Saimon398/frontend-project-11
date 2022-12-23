install:
	npm ci
publish:
	npm publish --dry-run
lint:
	npx eslint .
start:
	npx webpack serve
build:
	rm -rf dist
	NODE_ENV=production npx webpack
