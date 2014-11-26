# Composed.js

[![Build Status](https://travis-ci.org/fnando/computed.svg)](https://travis-ci.org/fnando/computed)

Computed properties for regular JavaScript objects.

This project is heavily inspired by [Ember](http://emberjs.com).

## Requirements

You may have to include [es5-shim](https://github.com/es-shims/es5-shim)
and [es6-shim](https://github.com/paulmillr/es6-shim) depending on the
browser you're targeting.

## Usage

### Computed.and

A computed property that performs a logical `and` on the original values.
All values use JavaScript's truthy/falsy checking, with
exception of numbers (even zero is considered truthy).

```javascript
var hamster = {
  readyForCamp: Computed.and('hasTent', 'hasBackpack')
};

hamster.readyForCamp(); // false
hamster.hasTent = true;
hamster.readyForCamp(); // false
hamster.hasBackpack = true;
hamster.readyForCamp(); // true
```

### Computed.alias

Creates a new property that is an alias for another property on an object.

```javascript
var post = {
    id: 'some-post'
  , slug: Computed.alias('id')
};

post.slug(); // some-post
post.slug('a-new-post');
post.id; // a-new-post
```

### Computed.any

A computed property that returns the first truthy value from a list of
dependent properties.

```javascript
var hamster = {
  hasClothes: Computed.any('hat', 'shirt')
};

hamster.hasClothes(); // null
hamster.shirt = 'Hawaiian Shirt';
hamster.hasClothes(); // 'Hawaiian Shirt'
```

### Computed.attributes

A computed property that returns an object containing all listed
properties. Aliased as `Computed.attrs`.

```javascript
var hamster = {
    name: 'John'
  , age: 42
  , salary: 1000
  , attributes: Computed.attributes('name', 'age')
};

hamster.attributes(); // {name: 'John', age: 42}
```

### Computed.bool

A computed property that converts the provided dependent property into a boolean value.

```javascript
var hamster = {
  hasBananas: Computed.bool('numBananas')
};

hamster.hasBananas(); // false
hamster.numBananas = 0;
hamster.hasBananas(); // false
hamster.numBananas = 1;
hamster.hasBananas(); // true
hamster.numBananas = null;
hamster.hasBananas(); // false
```

### Computed.collect

A computed property that returns the array of values for the provided
dependent properties.

```javascript
var hamster = {
  clothes: Computed.collect('hat', 'shirt')
};

hamster.clothes(); // [undefined, undefined]
hamster.hat = 'Camp Hat';
hamster.shirt = 'Camp Shirt';
hamster.clothes(); // ['Camp Hat', 'Camp Shirt']
```

### Computed.empty

A computed property that returns true if the value of the dependent
property is null/undefined, an empty string, or empty array.

```javascript
var todoList = {
    todos: ['Unit Test', 'Documentation', 'Release']
  , done: Computed.empty('todos')
};

todoList.done(); // false
todoList.todos.length = 0;
todoList.done(); // true
```

### Computed.equal

A computed property that returns true if the provided dependent property
is equal to the given value.

```javascript
var hamster = {
  napTime: Computed.equal('state', 'sleepy')
};

hamster.napTime(); // false
hamster.state = 'sleepy';
hamster.napTime(); // true
hamster.state = 'hungry';
hamster.napTime(); // false
```

### Computed.filter

Filters the array by the callback.
The callback method you provide should have the following signature: `function(item, index){}`.

- `item` is the current item in the iteration.
- `index` is the integer index of the current item in the iteration.

```javascript
var hamster = {
    chores: [
      {name: 'cook', done: true},
      {name: 'clean', done: true},
      {name: 'write more unit tests', done: false}
    ]

  , remainingChores: Computed.filter('chores', function(chore, index) {
      return !chore.done;
    })
};

hamster.remainingChores(); // [{name: 'write more unit tests', done: false}]
```

### Computed.filterBy

Filters the array by the property and value.

```javascript
var hamster = {
    chores: [
      {name: 'cook', done: true},
      {name: 'clean', done: true},
      {name: 'write more unit tests', done: false}
    ]

  , remainingChores: Computed.filterBy('chores', 'done', false)
};

hamster.remainingChores(); // [{name: 'write more unit tests', done: false}]
```

### Computed.gt

A computed property that returns true if the provided dependent property is
greater than the provided value.

```javascript
var hamster = {
  hasTooManyBananas: Computed.gt('numBananas', 10)
};

hamster.hasTooManyBananas(); // false
hamster.numBananas = 3;
hamster.hasTooManyBananas(); // false
hamster.numBananas = 11;
hamster.hasTooManyBananas(); // true
```

### Computed.gte

A computed property that returns true if the provided dependent property is
greater than or equal to the provided value.

```javascript
var hamster = {
  hasTooManyBananas: Computed.gte('numBananas', 10)
};

hamster.hasTooManyBananas(); // false
hamster.numBananas = 3;
hamster.hasTooManyBananas(); // false
hamster.numBananas = 10;
hamster.hasTooManyBananas(); // true
```

### Computed.lt

A computed property that returns true if the provided dependent property
is less than the provided value.

```javascript
var hamster = {
  needsMoreBananas: Computed.lt('numBananas', 3)
};

hamster.needsMoreBananas(); // true
hamster.numBananas = 3;
hamster.needsMoreBananas(); // false
hamster.numBananas = 2;
hamster.needsMoreBananas(); // true
```

### Computed.lte

A computed property that returns true if the provided dependent property
is less than or equal to the provided value.

```javascript
var hamster = {
  needsMoreBananas: Computed.lte('numBananas', 3)
};

hamster.needsMoreBananas(); // true
hamster.numBananas = 5;
hamster.needsMoreBananas(); // false
hamster.numBananas = 3;
hamster.needsMoreBananas(); // true
```

### Computed.map

Returns an array mapped via the callback
The callback method you provide should have the following signature: `function(item, index){}`

- item is the current item in the iteration.
- index is the integer index of the current item in the iteration.

```javascript
var hamster = {
    chores: ['clean', 'write more unit tests']

  , excitingChores: Computed.map('chores', function(chore, index) {
      return chore.toUpperCase() + '!';
    })
};

hamster.excitingChores(); // ['CLEAN!', 'WRITE MORE UNIT TESTS!']
```

### Computed.mapBy

Maps the array by the property and value.

```javascript
var info = {
    countries: [{id: 1, name: 'Brazil'}, {id: 2, name: 'USA'}]
  , names: Computed.mapBy('countries', 'name')
};

object.names(); // ['Brazil', 'USA']
```

### Computed.match

A computed property which matches the original value for the dependent
property against a given RegExp, returning true if they values matches
the RegExp and false if it does not.

```javascript
var user = {
  hasValidEmail: Computed.match('email', /^.+@.+\..+$/)
};

user.hasValidEmail(); // false
user.email = '';
user.hasValidEmail(); // false
user.email = 'john@example.com';
user.hasValidEmail(); // true
```

### Computed.max

A computed property that calculates the maximum value in the dependent
array. This will return `-Infinity` when the dependent array is empty.

```javascript
var object = {
    numbers: [1,2,3,4,5]
  , maxNumber: Computed.max('numbers')
};

object.maxNumber(); // 5
```

### Computed.min

A computed property that calculates the minimum value in the dependent
array. This will return `Infinity` when the dependent array is empty.

```javascript
var object = {
    numbers: [1,2,3,4,5]
  , minNumber: Computed.min('numbers')
};

object.minNumber(); // 1
```

### Computed.none

A computed property that returns true if the value of the dependent
property is `null` or `undefined`.

```javascript
var hamster = {
  isHungry: Computed.none('food')
};

hamster.isHungry(); // true
hamster.food = 'Banana';
hamster.isHungry(); // false
hamster.food = null;
hamster.isHungry(); // true
```

### Computed.not

A computed property that returns the inverse boolean value of the original
value for the dependent property.

```javascript
var user = Ember.Object.extend({
    loggedIn: false
  , isAnonymous: Ember.computed.not('loggedIn')
});

user.isAnonymous(); // true
user.loggedIn = true;
user.isAnonymous(); // false
```

### Computed.notEmpty

A computed property that returns true if the value of the dependent
property is NOT null, an empty string, or empty array.

```javascript
var hamster = {
    backpack: ['Food', 'Sleeping Bag', 'Tent']
  , hasStuff: Computed.notEmpty('backpack')
};

hamster.hasStuff();           // true
hamster.backpack.length = 0;  // []
hamster.hasStuff();           // false
```

### Computed.or

A computed property which performs a logical or on the original values
for the provided dependent properties.

```javascript
var hamster = {
  readyForRain: Computed.or('hasJacket', 'hasUmbrella')
});

hamster.readyForRain(); // false
hamster.hasJacket = true;
hamster.readyForRain(); // true
```

### Computed.sort

A computed property which returns a new array with all the properties from
the first dependent array sorted based on a property or sort function.

The callback method you provide should have the following signature: `function(itemA, itemB)`.

- itemA the first item to compare.
- itemB the second item to compare.

This function should return negative number (e.g. -1) when itemA should
come before itemB. It should return positive number (e.g. 1) when itemA
should come after itemB. If the itemA and itemB are equal this function
should return 0.

Therefore, if this function is comparing some numeric values, simple
itemA - itemB can be used instead of series of if.

```javascript
var info = {
    names: ['John', 'Bob', 'Mary']
  , sortedNames: Computed.sort('names', function(a, b){
      if (a > b) {
        return 1;
      } else if (a < b) {
        return -1;
      }

      return 1;
    })
};

info.sortedNames(); // ['Bob', 'John', 'Mary']
```

### Computed.sortBy

Sorts the array by the property and value.

```javascript
var info = {
    users: [{name: 'John'}, {name: 'Bob'}, {name: 'Mary'}]
  , sortedNames: Computed.sortBy('users', 'name')
};

info.sortedNames(); // ['Bob', 'John', 'Mary']
```

### Computed.uniq

A computed property which returns a new array with all the unique elements
from one or more dependent arrays.

```javascript
var hamster = {
    fruits: ['banana', 'grape', 'kale', 'banana']
  , uniqueFruits: Computed.uniq('fruits')
};

hamster.uniqueFruits(); // ['banana', 'grape', 'kale']
```

## Maintainer

- Nando Vieira - <http://nandovieira.com.br>

## Contributing

Once you've made your great commits:

1. [Fork](http://help.github.com/forking/) Composed.js
2. Create a topic branch - `git checkout -b my_branch`
3. Push to your branch - `git push origin my_branch`
4. [Create an Issue](http://github.com/fnando/composed/issues) with a link to your branch
5. That's it!

Please respect the indentation rules and code style.
And use 2 spaces, not tabs. And don't touch the versioning thing.

## Development

Make sure you have [Phantom.js](http://phantomjs.org) installed.

```
$ npm install
$ bower install
$ gulp default watch
```

### Running tests manually

```
$ gulp spec
```

## License

(The MIT License)

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
