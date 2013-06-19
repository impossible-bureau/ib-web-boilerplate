#Static HTML/JS/CSS webapp boilerplate.

===
#Dependencies:

###compass
* Make sure you have ruby installed (osx/linux should already have it) <code>ruby -v</code>
* <code>sudo gem update --system</code>
* <code>sudo gem install compass</code>


###node/npm
Assuming you're on OSX and have homebrew installed:

* <code>brew install node</code>
* If you're using an up to date version of homebrew this install should include npm - make sure it's on your path before proceeding.
* Additionally you'll need to add the executables installed by npm to your path by appending it like so (in your .bash_profile or whatever you use) <code>export PATH="/usr/local/share/npm/bin:$PATH"</code>


###grunt
* <code>npm install -g grunt-cli</code>
* Now that grunt is installed you can install any project dependencies:
* <code>cd path/to/packages.json</code>
* <code>npm install</code>
* <code>grunt</code> (to initially generate the styles.min.css and other compiled files which are excluded from the repo). <code>grunt watch</code> will keep these up to date as you work on the source files.


===
#Common Development Tasks:


##Automated compilation on change (handlebars/scss)
Will call for recompilation when changes are detected in either templates/ or templates/

* <code>cd path/to/Gruntfile.js</code>   (or any subdirectory)
* <code>grunt watch</code>


##Deployment
This will purge and reproduce another copy of the site files in the deploy directory. The main difference is that index.html (and other files if specified in Gruntfile.js) will strip out individual js links in favor of a single link to scripts.min.js.

* <code>grunt deploy</code>
* Test the build by confirming index.html was successfully modified (scripts.min.js is included instead of individual ones), and that it works by setting up another vhost/server with that folder as the document root.


##Notes:
* Note that the handlebars template namespace has been changed to ib.Templates so you should now process a template with this:
<code>ib.Templates\['sample_template.html'](context)</code>
* Remember to suffix all templates in templates/ with '.html' or else they will be ignored.
* When adding new js scripts to source/index.html do not modify the comments (\<!-- DEV_ONLY -->, \<!-- END_DEV_ONLY -->, \<!-- PROD_ONLY -->, \<!-- END_PROD_ONLY -->). Similarly do not uncomment the min.js script. These should only be modified by the grunt deploy task. See the replace-string task in Gruntfile.js if you really need to modify these.
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
* Add the files (destination:source) to the "string-replace" task's file object in Gruntfile.js

###Changing javascript concat order or including additional folders
* In Gruntfile.js you can find the concat task's src object which controls this.

###Same, but with sass
* This is controlled by sass/styles.min.scss (it's not actually minified here - this was just a convenience issue for automatically building to styles.min.css).

###Everything else
* Most grunt modules have documenation on github - just search for the name listed in package.json (e.g. grunt-contrib-clean).
* When adding/removing plugins make sure to update package.json for everyone else by appending --save-dev to the install command like this:

  <code>cd path/to/package.json</code>
	
  <code>npm install package-name --save-dev</code>
  
  <code>npm uninstall package-name --save-dev</code>








