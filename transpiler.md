### Copy the following line and execute it in a terminal from your base directory

<code>./node_modules/.bin/babel \-\-presets react src \-\-watch \-o build/bundled.js</code>

then, let it be. It will transpile your JSX code into standard javascript.

### Just to notice

All JSX code must be placed in the **src** directory. Babel will transpile all the files from that directory and output a single **bundled.js** file in the build directory. That **bundled.js** must be linked in your index.html just before closing the body tag.

This file and all related could be found in my [simple-react-boilerplate](http://github.com/kwaref/simple-react-boilerplate) on [GitHub](http://github.com).
