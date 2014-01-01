/*jshint eqnull:true, expr:true*/

var _ = { };

(function() {

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
	  if (n === undefined){
		  return array[0];
	  } else {
		  return array.slice(0,n);
	  }
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
	  if (n === undefined){
		  return array[array.length - 1];
	  } else if (n > array.length){
		  return array
	  } else {
		  return array.slice(array.length - n, array.length);
	  }
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  _.each = function(collection, iterator) {
	  if (Array.isArray(collection)){
		  for (var i = 0; i < collection.length; i ++){
			  iterator(collection[i], i, collection);	  
		  }
	  } else {
		  for (var i in collection){
			  iterator(collection[i], i, collection);	  
		  }
	  }
	  
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
	  var index = -1
	  var each = function(value, key, collection){
		  if (value === target){
			  if (index === (-1)){
				  index = key;
			  }
		  }
	  };
	  _.each(array, each);
	  return index
	  
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, iterator) {
	  var sArray = [];
	  for (var i = 0; i < collection.length; i ++){
		  if (iterator(collection[i])){
			  sArray.push(collection[i]);
		  }
	  }
	  return sArray;
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, iterator) {
	  var sArray = [];
	  for (var i = 0; i < collection.length; i ++){
		  if (_.indexOf(_.filter(collection, iterator), collection[i]) === (-1)){
			  sArray.push(collection[i]);
		  }
	  }
	  return sArray;
    // TIP: see if you can re-use _.select() here, without simply
    // copying code in and modifying it
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array) {
	  var nArray = [];
	  for (var i = 0; i < array.length; i ++){
		  if (_.indexOf(nArray, array[i]) === (-1)){
			  nArray.push(array[i]);
		  }
	  }
	  return nArray;
  };


  // Return the results of applying an iterator to each element.
  _.map = function(array, iterator) {
	  var nArray = [];
	  for (var i = 0; i < array.length; i ++){
		  nArray.push(iterator(array[i]));
	  }
	  return nArray;
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(array, propertyName) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(array, function(value){
      return value[propertyName];
    });
  };

  // Calls the method named by methodName on each value in the list.
  _.invoke = function(list, methodName, args) {
	  var nArr = []
	  if (typeof(methodName) === 'function'){
		  for (var i = 0; i < list.length; i ++){
			  var p = methodName.apply(list[i], args);
			  nArr.push(p);
		  }
	  }else{
		  for (var i = 0; i < list.length; i ++){
			  var p = list[methodName].apply(list[i], args);
			  nArr.push(p);
		  }
	  }
	  return nArr;
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(previousValue, item) for each item. previousValue should be
  // the return value of the previous iterator call.
  //
  // You can pass in an initialValue that is passed to the first iterator
  // call. Defaults to 0.
  //
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  //
  _.reduce = function(collection, iterator, initialValue) {
	  if (initialValue === undefined){
		  var previousValue = 0;
	  } else {
		  var previousValue = initialValue;
	  }
	  for (var i in collection){
		  previousValue = iterator(previousValue, collection[i]);
	  }
	  return previousValue
  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    return _.reduce(collection, function(wasFound, item) {
	  if(wasFound) {
        return true;
      }
      return item === target;
    }, false);
  };


  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
	  if (iterator === undefined){
		  iterator = function(input){
			  return input;
		  };
	  }
	  return _.reduce(collection, function(match, item){
		  if(!match){
			  return false;
		  }
		  if (iterator(item)){
			  return true;
		  }else{
			  return false;
		  };
	  }, true);
    // TIP: Try re-using reduce() here.
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) {
	  for (var i = 0; i < collection.length; i ++){
		  var b = _.every([collection[i]], iterator);
		  if (b){
			  return true;
		  }
	  }
	  return false;
    // TIP: There's a very clever way to re-use every() here.
  };


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  _.extend = function(obj) {
	  for (var i = 1; i < arguments.length; i ++){
		  for (var key in arguments[i]){
			  obj[key] = arguments[i][key];
		  }
	  }
	  return obj;
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
	  for (var i = 1; i < arguments.length; i ++){
		  for (var key in arguments[i]){
			  if (obj[key] === undefined){
				  obj[key] = arguments[i][key];
			  }
		  }
	  }
	  return obj;
  };


  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;
    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function(){
      if(!alreadyCalled){
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // infromation from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  // Memoize an expensive function by storing its results. You may assume
  // that the function takes only one argument and that it is a primitive.
  //
  // Memoize should return a function that when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) {
	  var keys = {};
	  return function(x){
		  if (keys[x] === undefined){
			  keys[x] = func(x);
		  }
		  return keys[x];
	  };
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
	  var args= [];
	  for (var i = 2; i < arguments.length; i ++){
		  args.push(arguments[i]);
	  }
	  setTimeout(function() { func.apply(this, args); }, wait);
  };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Shuffle an array.
  _.shuffle = function(array) {
	  var nArray = [];
	  var length = array.length;
	  while (nArray.length < length){
		  var n = Math.floor(length * Math.random());
		  if (_.indexOf(nArray, array[n]) === (-1)){
			  nArray.push(array[n]);
		  }
	  }
	  return nArray;
  };


  /**
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */


  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
 /* _.sortBy = function(collection, iterator) {
    var sorted = [];
    for (var i in collection){
      if (sorted.length === 0){
        sorted.push(collection[i]);
      } else {
        for (var j = 0; j < sorted.length; j ++){
          if (i[iterator] < sorted[j][iterator]){
            sorted.splice(j, 0, collection[i]);
            break;
          } else if (i[iterator] > sorted[j][iterator]){
            sorted.splice(j + 1, 0, collection[i]);
            break;
          } else {
            sorted.push(collection[i]);
          }
        }
      }
    }
    return sorted;
  }; */

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
    var array = []
    var count = 0
    for (var i = 0; i < arguments.length; i ++){
      if (arguments[i].length > count){
        count = arguments[i].length;
      }
    }
    for (var i = 0; i < arguments.length; i ++){
      for (var j = 0; j < count; j ++){
        if (array[j] === undefined){
          array[j] = [arguments[i][j]];
        } else if (arguments[i][j] === undefined){
          array[j].push(undefined);
        }else {
          array[j].push(arguments[i][j]);
        }
      }
    }
    return array;
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, result) {
    var flattened = [];
    for (var i = 0; i < nestedArray.length; i ++){
      if (Array.isArray(nestedArray[i])){
        var nested = _.flatten(nestedArray[i]);
        for (var j = 0; j < nested.length; j ++){
          flattened.push(nested[j]);
        }
      } else {
        flattened.push(nestedArray[i]);
      }
    }
    return flattened;
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
    var longestArray = [];
    var returnArray = [];
    for (var i = 0; i < arguments.length; i ++){
      if (arguments[i].length > longestArray.length){
        longestArray = arguments[i];
      }
    }
    for (var i = 0; i < longestArray.length; i ++){
      var intersects = true;
      for (var j = 0; j < arguments.length;j ++){
        if (_.indexOf(arguments[j], longestArray[i]) === -1){
          intersects = false;
        }
      }
      if (intersects){
        returnArray.push(longestArray[i]);
      }
      return returnArray;
    }
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
  };


  /**
   * MEGA EXTRA CREDIT
   * =================
   */

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.
  //
  // See the Underbar readme for details.
  _.throttle = function(func, wait) {
  };

}).call(this);
