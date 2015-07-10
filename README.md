# A web boilerplate using:

* [sass](http://sass-lang.com/) - Precompiled alternative to plain CSS
* [autoprefixer](https://github.com/postcss/autoprefixer-core) - Automatically add vendor prefixes using values from [Can I Use](http://caniuse.com/)
* [livereload](http://livereload.com/extensions/) - Grab the Chrome extension for auto-updating styles
* [gulp-connect](https://github.com/avevlad/gulp-connect) - Launches a webserver
* [browserify](http://browserify.org/) - CommonJS dependency management
* [jquery](http://jquery.com/) - Javascript library for common tasks
* [underscore](http://underscorejs.org/) - Javascript helper functions and templating
* [gulp](http://gulpjs.com/) - Javascript build tool
* [npm](https://www.npmjs.com/) - Node package manager

Dependencies: [node/npm](https://nodejs.org/)

===

## Install

You'll want to install the boilerplate globally to act as a generator:
	
	$ npm install -g impossible-bureau/ib-web-boilerplate

Now you should have `ib-web-boilerplate` available on your path you can make a new project with:

	$ ib-web-boilerplate path/to/project
	$ cd path/to/project
    $ npm install

## Work (Build/Watch)

    $ npm run gulp

This also spawns a livereload enabled server on [http://localhost:8080](http://localhost:8080)

===

## Other Tasks:

#### Add a new package

    $ npm install -S PACKAGE_NAME
    $ npm run gulp

#### Production (minified with no sourcemaps) build

    $ npm run prod_build

#### Quick Heroku deployment

1) Commit your changes to a repo or make a new one:

    $ git init
    $ git add -A
    $ git commit -m "Initial commit"

2) Ensure you have the [heroku toolbelt](https://toolbelt.heroku.com/) or:

	$ brew install heroku

3) Create a new heroku app:

    $ heroku login
    $ heroku create the-subdomain-you-want

3) Deploy from your master branch:

    $ git push heroku master

4) Check it out:

	$ heroku open

5) Repeat step 3 as needed.