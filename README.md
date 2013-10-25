#Static HTML/JS/CSS webapp boilerplate.

===
This project contains boilerplate applications for either plain javascript (original/) or CoffeeScrip (coffescript/) projects.

This project makes use of:

* [SASS](http://sass-lang.com/) - A precompiled alternative to plain CSS (using the scss syntax)
* [compass](http://compass-style.org/) - A set of convenient SASS mixins
* [grunt](http://gruntjs.com/) - To automate build tasks
* [jQuery](http://jquery.com/) - A popular JS library for common tasks
* [Handlebars.js](http://handlebarsjs.com/) - Frontend templating
* [bower](http://bower.io/) - A package manager for javascript dependencies
* [coffeescript](http://coffeescript.org/) - (optional) A precompiled alternative to plain javascript


Additionally this project makes use of plugins or is based on code from:
* [jQuery Easing Plugin](http://gsgd.co.uk/sandbox/jquery/easing/) - Adds Robert Penner's easing functions to jQuery animations.
* [Cinnamon Boilerplate](https://github.com/wagerfield/cinnamon) - Adds Robert Penner's easing functions as SASS variables and has some common reset styles.
* [Soulwire](http://soulwire.co.uk/) - ComponentLoader is based on some of his work.
* [raf.js](https://github.com/ngryman/raf.js) - requestAnimationFrame polyfill.

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
Install grunt globally:

		npm install -g grunt-cli
		
Install node packages specific to the project:

		npm install


###livereload

While running the <code>grunt watch</code> command a livereload server will also be available for having your sass changes update on save without having to refresh the browser. A browser extension is required for enabling this behavior and can be found [here](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei) for Chrome. One important note is that you need to make sure the "Allow access to file URLs" permission is on and that the plugin itself is enabled (the icon that will appear in the top right of your browser).



##Notes:
* When adding new js scripts to do not modify the the index.html file directly. You should instead modify the concatenatedScriptSources list in the Gruntfile and run the grunt command to update it instead.
* Remember to suffix all templates in templates/ with '.html' or else they will be ignored (this can be modified in the Gruntfile options).


===
#Usage:

###Grunt

To update bower dependencies, and process any other files initially or after a pull:

		grunt

To keep these files up to date as you develop run this process (includes livereload task too):

		grunt watch

Generate a copy with processed scripts in a separate deploy folder:

	grunt deploy

===
#Customization:

###Naming
Project specific naming needs to be done in the following files:

* source/index.html (title/description/opengraph tags)
* package.json (replace projectname)
* bower.json (replace projectname)
* source/favicon.ico (replace IB logo with something else when assets are available).

###Changing javascript concat order or including additional folders
In the Gruntfile you can find the scriptLinkWarning array that is the master source of all linked scripts the are processed by grunt. Run the grunt command after any changes made here to regenerate your source/index.html file with updated script links.

###Same, but with sass
This is controlled by sass/styles.min.scss (it's not actually minified here - this was just a convenience issue for automatically building to styles.min.css).

###Editing npm and bower dependencies
When adding/removing grunt/node plugins make sure to update package.json for everyone else by appending --save to the install command like this:

		cd path/to/package.json
		npm install package-name --save

Similarly to remove a package:

		npm uninstall package-name --save

Bower has similar commands using the bower.json file.