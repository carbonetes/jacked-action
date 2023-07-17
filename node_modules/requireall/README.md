# requireall

Returns an array of results based on "require"ing all files that match the glob pattern.

## Usage

The following example shows how you could easily modularize an express app and automatically load the modules from a directory.

~~~js
var express = require('express'),
    requireall = require('requireall');

var app = express();

...

requireall('modules/*.js').forEach(function(factory) {
    factory(app);
});
~~~