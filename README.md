[![Build Status](https://travis-ci.org/murwa/ui-router-errors.svg?branch=master)](https://travis-ci.org/murwa/ui-router-errors)

## UI-Router Errors

An angularjs module to easily handle errors between and on states

### Installation

Bower:

~~~javascript
bower install ui-router-errors
~~~

In your page, add:

~~~html
<script src="bower_components/ui-router-errors/dist/ui-router-errors.min.js"></script>
~~~

### Usage

#### Load module

Add the module as a dependency to your app:

~~~javascript
var app = angular.module('app', ['ui-router-errors']
~~~

#### State Definition

##### Easiest

Simply add your error state like so:

~~~javascript
    var state = {
        name: 'errors',
        template: 'Error occured',
        controller: ['$errors', function($errors){
            var self = this;
            angular.extend(self, $errors);

            // Access get methods in your template
        }]
    }
~~~
