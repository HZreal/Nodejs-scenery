const _ = require('lodash')

// doc   https://www.lodashjs.com/



// forEach()


// chunk()
const arr = [1,2,3,4,5,6,7,8,9];
_.chunk(arr,2);     // =>[[1,2],[3,4],[5,6],[7,8],[9]]


// uniq，数组去重。（将数组中的对象去重，只能是数组去重，不能是对象去重。
// _.uniq()


// find()
const users = [
  { 'user': 'barney', 'age': 36, 'active': true },
  { 'user': 'fred',   'age': 40, 'active': false },
  { 'user': 'pebbles', 'age': 1, 'active': true }
];
 
_.find(users, function(o) { return o.age < 40; }); // => { 'user': 'barney', 'age': 36, 'active': true }
 
// The `_.matches` iteratee shorthand.
_.find(users, { 'age': 1, 'active': true }); // => { 'user': 'pebbles', 'age': 1, 'active': true }
 
// The `_.matchesProperty` iteratee shorthand.
_.find(users, ['active', false]); // => { 'user': 'fred', 'age': 40, 'active': false }
 
// The `_.property` iteratee shorthand.
_.find(users, 'active'); // => { 'user': 'barney', 'age': 36, 'active': true }
