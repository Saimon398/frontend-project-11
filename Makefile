install:
	npm ci
publish:
	npm publish --dry-run
lint:
	npx eslint .
style:
	npx stylelint ./src/styles/*.scss
start:
	npx webpack serve
build:
	rm -rf dist
	NODE_ENV=production npx webpack
