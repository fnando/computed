/*!
 * Computed.js
 * http://github.com/fnando/computed-js
 *
 * Copyright 2014 — Nando Vieira
 * Released under the MIT license
 */
var Computed = (function(){
  var Computed = {};

  // Shortcut for array's slice function.
  var slice = Array.prototype.slice;

  // Extract values from target object.
  // If property is a function, call it.
  var valuesFor = function(target, properties) {
    return properties.map(function(property){
      return get(target, property);
    });
  };

  // Get property from target object.
  var get = function(target, property) {
    // Transpose arguments.
    if (arguments.length === 1) {
      property = target;
      target = this;
    }

    var chain = property.split('.');
    var value;

    while (property = chain.shift()) {
      value = target[property];

      if (typeof(value) === 'function') {
        value = value.call(target);
      }

      target = value;

      if (target === undefined) {
        break;
      }
    }

    return value;
  };
  Computed.get = get;

  // Set property on target object.
  var set = function(target, property, value) {
    // Transpose arguments.
    if (arguments.length === 2) {
      value = property;
      property = target;
      target = this;
    }

    var key;
    var chain = property.split('.');
    property = chain.pop();

    while ((key = chain.shift()) && !isNone(target)) {
      target = target[key];
    }

    if (!target) {
      return;
    }

    if (typeof(target[property]) === 'function') {
      target[property].call(target, value);
    } else {
      target[property] = value;
    }
  };
  Computed.set = set;

  // Convert value to boolean equivalent.
  var bool = function(value) {
    return !!value;
  };

  // Define default sorter function;
  var sorter = function(a, b){
    if (a > b) { return 1; }
    if (a < b) { return -1; }
    return 0;
  };

  // Run array function against property values.
  var computed = function(funcName, properties, callback) {
    properties = slice.call(properties);

    return function() {
      return valuesFor(this, properties)[funcName](callback);
    };
  };

  // Returns true if the passed value is null or undefined.
  var isNone = function(value) {
    return value === null || value === undefined;
  };

  // Verifies that a value is null or an empty string, empty array,
  // or empty function. Constrains the rules on Computed.isNone by
  // returning true for empty string and empty arrays.
  var isEmpty = function(value) {
    if (typeof(value) === 'number') {
      return false;
    }

    if (typeof(value) === 'string') {
      return value === '';
    }

    return isNone(value) || ('length' in value && value.length === 0);
  };
  Computed.isEmpty = isEmpty;

  // A value is blank if it is empty or a whitespace string.
  var isBlank = function(value) {
    return isEmpty(value) || (typeof(value) === 'string' && value.match(/\S/) === null);
  };
  Computed.isBlank = isBlank;

  // A value is present if it not `isBlank`.
  var isPresent = function(value) {
    return !isBlank(value);
  };
  Computed.isPresent = isPresent;

  // A computed property that performs a logical `and` on the original values.
  // All values use JavaScript's truthy/falsy checking, with
  // exception of numbers (even zero is considered truthy).
  Computed.and = function() {
    return computed('every', arguments, function(value){
      return bool(value);
    });
  };

  // A computed property that returns the first truthy value from a list of
  // dependent properties.
  Computed.any = function() {
    return computed('find', arguments, function(value){
      return bool(value);
    });
  };

  // Creates a new property that is an alias for another property on an object.
  Computed.alias = function(property) {
    return function(value) {
      if (arguments.length === 1) {
        set(this, property, value);
      }

      return get(this, property);
    };
  };

  // A computed property that returns an object containing all listed
  // properties. Aliased as `Computed.attrs`.
  Computed.attributes = function() {
    var properties = slice.call(arguments);

    return function() {
      return properties.reduce(function(buffer, property){
        buffer[property] = get(this, property);
        return buffer;
      }.bind(this), {});
    };
  };
  Computed.attrs = Computed.attributes;

  // A computed property that converts the provided dependent property into a
  // boolean value.
  Computed.bool = function() {
    return computed('every', arguments, function(value){
      return bool(value);
    });
  };

  // A computed property that returns the array of values for the provided
  // dependent properties.
  Computed.collect = function() {
    return computed('map', arguments, function(value){
      return value;
    });
  };

  // A computed property that returns true if the value of the dependent
  // property is null/undefined, an empty string, or empty array.
  Computed.empty = function() {
    return computed('every', arguments, function(value){
      return isEmpty(value);
    });
  };

  // A computed property that returns true if the provided dependent property
  // is equal to the given value.
  Computed.equal = function(property, value) {
    return function(){
      return get(this, property) === value;
    };
  };

  // Filters the array by the callback.
  // The callback method you provide should have the following signature: `function(item, index){}`.
  //
  // - item is the current item in the iteration.
  // - index is the integer index of the current item in the iteration.
  Computed.filter = function(property, callback) {
    return function() {
      return get(this, property).filter(callback);
    };
  };

  // Filters the array by the property and value.
  Computed.filterBy = function(property, key, value) {
    return Computed.filter(property, function(item){
      return get(item, key) === value;
    });
  };

  // A computed property that returns true if the provided dependent property is
  // greater than the provided value.
  Computed.gt = function(property, value) {
    return function() {
      return get(this, property) > value;
    };
  };

  // A computed property that returns true if the provided dependent property is
  // greater than or equal to the provided value.
  Computed.gte = function(property, value) {
    return function() {
      return get(this, property) >= value;
    };
  };

  // A computed property that returns true if the provided dependent property
  // is less than the provided value.
  Computed.lt = function(property, value) {
    return function() {
      return get(this, property) < value;
    };
  };

  // A computed property that returns true if the provided dependent property
  // is less than or equal to the provided value.
  Computed.lte = function(property, value) {
    return function() {
      return get(this, property) <= value;
    };
  };

  // Returns an array mapped via the callback
  // The callback method you provide should have the following signature: `function(item, index){}`
  //
  // - item is the current item in the iteration.
  // - index is the integer index of the current item in the iteration.
  Computed.map = function(property, callback) {
    return function() {
      return get(this, property).map(callback);
    };
  };

  // Maps the array by the property and value.
  Computed.mapBy = function(property, key, value) {
    return Computed.map(property, function(item){
      return get(item, key);
    });
  };

  // A computed property which matches the original value for the dependent
  // property against a given RegExp, returning true if they values matches
  // the RegExp and false if it does not.
  Computed.match = function(property, regexp) {
    return function() {
      var value = get(this, property);
      return (typeof(value) === 'string' && value.match(regexp));
    };
  };

  // A computed property that calculates the maximum value in the dependent
  // array. This will return `-Infinity` when the dependent array is empty.
  Computed.max = function(property) {
    return function() {
      var values = valuesFor(this, [property])[0];
      return Math.max.apply(Math, values);
    };
  };

  // A computed property that calculates the minimum value in the dependent
  // array. This will return Infinity when the dependent array is empty.
  Computed.min = function(property) {
    return function() {
      var values = valuesFor(this, [property])[0];
      return Math.min.apply(Math, values);
    };
  };

  // A computed property that returns true if the value of the dependent
  // property is null or undefined.
  Computed.none = function(property) {
    return function() {
      return isNone(get(this, property));
    };
  };

  // A computed property that returns the inverse boolean value of the original
  // value for the dependent property.
  Computed.not = function(property) {
    return function() {
      return !bool(get(this, property));
    };
  };

  // A computed property that returns true if the value of the dependent
  // property is NOT null, an empty string, or empty array.
  Computed.notEmpty = function(property) {
    return function() {
      return !isEmpty(get(this, property));
    };
  };

  // A computed property which performs a logical or on the original values
  // for the provided dependent properties.
  Computed.or = function() {
    return computed('some', arguments, function(value){
      return bool(value);
    });
  };

  // A computed property which returns a new array with all the properties from
  // the first dependent array sorted based on a property or sort function.
  //
  // The callback method you provide should have the following signature: `function(itemA, itemB)`.
  //
  // - itemA the first item to compare.
  // - itemB the second item to compare.
  //
  // This function should return negative number (e.g. -1) when itemA should
  // come before itemB. It should return positive number (e.g. 1) when itemA
  // should come after itemB. If the itemA and itemB are equal this function
  // should return 0.
  //
  // Therefore, if this function is comparing some numeric values, simple
  // itemA - itemB can be used instead of series of if.
  Computed.sort = function(property, callback) {
    return function() {
      return valuesFor(this, [property])[0].sort(callback || sorter);
    };
  };

  // Sorts the array by the property and value.
  Computed.sortBy = function(property, key) {
    return function() {
      var items = get(this, property);

      return items.sort(function(a, b){
        a = get(a, key);
        b = get(b, key);

        if (a > b) { return 1; }
        if (a < b) { return -1; }
        return 0;
      });
    };
  };

  // A computed property which returns a new array with all the unique elements
  // from one or more dependent arrays.
  Computed.uniq = function() {
    var properties = slice.call(arguments);

    return function() {
      // First flatten array.
      var items = valuesFor(this, properties).reduce(function(buffer, collection){
        return buffer.concat(collection);
      }, []);

      // Then return a new array containing unique items.
      return items.reduce(function(buffer, item){
        if (buffer.indexOf(item) < 0) {
          buffer.push(item);
        }
        return buffer;
      }, []);
    };
  };

  return Computed;
})();
