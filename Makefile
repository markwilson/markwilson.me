help: ## Usage instructions

build: ## Build the site
	php ./build.php

serve: build ## Run the development server
	php -S 0.0.0.0:8000 -t public

local: ## Run the development server and watch for changes
	make -j2 watch-and-serve

watch-and-serve: serve watch ## Watch and serve - this should be executed in parallel

watch: ## Watch for changes to pages, assets and layouts
	watchman-make -p "pages/*.html.twig" "static/*" "layouts/*.html.twig" -r "make build"
