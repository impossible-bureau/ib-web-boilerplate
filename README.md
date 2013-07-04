#Static HTML/JS/CSS webapp boilerplate.

===
This project contains boilerplate applications for either plain javascript (original/) or CoffeeScrip (coffescript/) projects.

This project makes use of:

* [SASS](http://sass-lang.com/) - A precompiled alternative to plain CSS (using the scss syntax)
* [compass](http://compass-style.org/) - A set of convenient SASS mixins
* [grunt](http://gruntjs.com/) - To automate build tasks
* [jQuery](http://jquery.com/) - A popular JS library for common tasks
* [Handlebars.js](http://handlebarsjs.com/) - Frontend templating
* [coffeescript](http://coffeescript.org/) - (optional) A precompiled alternative to plain javascript


Additionally this project makes use of plugins or is based on code from:
* [jQuery Easing Plugin](http://gsgd.co.uk/sandbox/jquery/easing/) - Adds Robert Penner's easing functions to jQuery animations.
* [Cinnamon Boilerplate](https://github.com/wagerfield/cinnamon) - Adds Robert Penner's easing functions as SASS variables and has some common reset styles.
* [Soulwire](http://soulwire.co.uk/) - ComponentLoader is based on some of his work.
* [rAF.js](https://gist.github.com/paulirish/1579671) - requestAnimationFrame polyfill.

The boilerplate is built around a minimal framework that allows for instantiable components to be dynamically initialized at any time by attaching a reference to the component in markup on the element that will become that component's context.

Ex/

	<div class="ib-component" data-component="ib.Carousel"></div>

#Dependencies:

###compass
Make sure you have ruby installed and up to date with a copy of the compass gem.
	
		sudo gem update --system
		sudo gem install compass


###node/npm
Assuming you're on OSX and have homebrew installed:

		<code>brew install node</code>

If you're using an up to date version of homebrew this install should include npm - make sure it's on your path before proceeding.

Additionally you'll need to add the executables installed by npm to your path by appending it like so (in your .bash_profile or whatever you use)

		export PATH="/usr/local/share/npm/bin:$PATH"


###grunt
Install:

		npm install -g grunt-cli
Now that grunt is installed you can install any project dependencies:

		cd path/to/packages.json
		npm install

To initially generate the styles.min.css and other compiled files which are excluded from the repo:

		grunt

To keep these files up to date as you develop.

		grunt watch

===
#Common Development Tasks:


##Automated compilation on change (handlebars/scss)
Will call for recompilation when changes are detected in either templates/ or templates/

		cd path/to/Gruntfile   (or any subdirectory)
		grunt watch

###livereload

While running the <code>grunt watch</code> command a livereload server will also be available for having your sass changes update on save without having to refresh the browser. A browser extension is required for enabling this behavior and can be found [here](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei) for Chrome. One important note is that you need to make sure the "Allow access to file URLs" permission is on and that the plugin itself is enabled (the icon that will appear in the top right of your browser).


##Deployment Ready Build
This will purge and generate another copy of the site files in the deploy directory. The main difference is that index.html (and other files if specified in Gruntfile) will strip out individual js links in favor of a single link to scripts.min.js. If you wish to include certain libraries separately simple keep the library in the root of the source/libs/ directory and link it outside of the DEV_ONLY comment block in index.html.

	grunt deploy


##Notes:
* Note that the handlebars template namespace has been changed to ib.Templates so you should now process a template with this:
<code>ib.Templates\['sample_template.html'](context)</code>
* Remember to suffix all templates in templates/ with '.html' or else they will be ignored.
* When adding new js scripts to source/index.html do not modify the comments (\<!-- DEV_ONLY -->, \<!-- END_DEV_ONLY -->, \<!-- PROD_ONLY -->, \<!-- END_PROD_ONLY -->). Similarly do not uncomment the min.js script. These should only be modified by the grunt deploy task. See the replace-string task in Gruntfile if you really need to modify these.
* If you're using a text editor like sublime you can make your life easier by limiting the open folders to source/, templates/, and sass/ and adding \*.min.css and \*.min.js to your editor's search ignore preferences to keep searches manageable.


===
#Project Setup Tasks:

##Naming:
Project specific naming needs to be done in the following files:

* source/index.html (title/description/opengraph tags)
* package.json (replace projectname)
* source/favicon.ico (replace IB logo with something else when assets are available).

===
#Common Grunt Customization Tasks:

###Preprocessing more than just index.html
Add the files (destination:source) to the "string-replace" task's file object in Gruntfile

###Changing javascript concat order or including additional folders
In the Gruntfile you can find the concat task's src object which controls this.

###Same, but with sass
This is controlled by sass/styles.min.scss (it's not actually minified here - this was just a convenience issue for automatically building to styles.min.css).

###Everything else
Most grunt modules have documenation on github - just search for the name listed in package.json (e.g. grunt-contrib-clean).

When adding/removing plugins make sure to update package.json for everyone else by appending --save-dev to the install command like this:

		cd path/to/package.json
		npm install package-name --save-dev
	
Similarly to remove a package:

		npm uninstall package-name --save-dev
