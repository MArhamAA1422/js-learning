## Main Idea of JavaScript
- Save the data
- Generate the HTML
- Make it interactive

#### alert('hello universe!');

#### 'hello' + 5 => hello5

## template string
```js
// Interpolation {}
`Items (${1 + 1}): $${(2095 + 799) / 100}`
=> 'Items (2): $28.94'
```

## DOM
- DOM (document object model)
- DOM combines js & html together
- It gives js full control of the webpage

```js
document.body.innerHTML = 'hello';  // changing current web page, always string

// Void HTML
document.querySelector('any-element').value;  // string

5 == '5.00'  // true
5 === '5.00'  // false
```

#### Falsy Values: `false 0 '' NaN undefined null`

#### Ternary operator: `?:`
#### Guard operator: `&&`  // short-circuits (false)
#### Default operator: `||`  // short-circuits (true)

## JSON
- JSON is Universal.
- With less feature.
- It doesn't support function/method.
- Always double quote.
- Built-in object in JS.

```js
JSON.stringify(obj);  // string

JSON to JS obj: JSON.parse(JSON.stringify(obj));
```

## localStorage
- Variables are volatile (page refresh all gone).
- So, we can store stuffs in localStorage.
- Only supports string store.
- Built-in object in JS.

```js
localStorage.setItem('message', 'some_string');
localStorage.getItem('message');

// js object in localStorage
localStorage.setItem('score', JSON.stringify(score));

obj = JSON.parse(localStorage.getItem('score'));

localStorage.removeItem('score');
```

```js
localStorage.clear();  // in browser console (if any issue)
```

### Auto Boxing
`'hello'.length  // string, but works like obj (auto)`

### Type Coercion
```js
String(25)
console.log('25' - 5); // 20, string to Number
```

#### DOCUMENT points webpage

#### WINDOW (object) points browser  `window.document === document`

## Functions
```js
function fn(param1, param2) {}

const function1 = function() {
    console.log('hello');
};

console.log(function1());  // function is a value

function run(param) {
    param();
}

// callback function: function as parameter

run(function() {
    //
});
```

## Arrow functions
- one parameter
- one line
```js
const = arrowFunction = () => {
    //
};
arrowFunction();

const oneParam = param => {
    //
};

const oneLine = () => 2 + 3;  // returns 5
```

## Arrays
```js
const myArr = [1, 2, 3, 'hello', true, { name: 'name'}, [1, 2]];

myArr.push(100);

myArr.splice(idx, tot);  // delete total 'tot' elements starting at 'idx'

const arr2 = arr1.slice();  // making a copy instead of referencing

const [firstVal, secondVal] = [1, 2, 3];  // element from array
```

## forEach Loop
```js
[
    'a',
    'b',
    'c'
].forEach(function(value){
    console.log(value);  // a b c
});

[
    'a',
    'b',
    'c'
].forEach(function(value, index){
    if (value === 'b') {
        return;  // same as continue
    }
    console.log(value);  // a c
});
```

## filter(), map()
- filter: removes elements
- map: some conditions on elements

```js
[1, -3, 5].filter((value, index) => {
    return value >= 0;
});  // [1, 5]

[1, 1, 3].map((value, index) => {
    return value*2;
});  // [2, 2, 6]

[1, 1, 3].map(value => value*2);  // oneParam, oneLine
```

## Objects

```js
const obj = {
    message: val;
    price: p;
};
const { message, price } = obj;  // destructuring (shortcut)

same = 'text';
const obj = {
    // same: same
    same,

    // method: function function() {
        //
    // }

    method() {
        //
    }
};

const obj = {
    prop1: val,
    prop2: val
};

obj.prop3 = val;  // new property
delete obj.prop3;

const obj = {
    obj1: {
        p1: v1;
        p2: v2;
    },
    f: function fn() {
        //
    }
};
```

### object, function all are values in JS

```clicks, keydowns``` => event

```onclick, onkeydown``` => event listeners

## Asynchronous code
- won't wait for a line to finish before going to the next line

```js
let timeOutId = setTimeout(function(){
    //
}, 3000);  // 3s
console.log('next line');  // it come's first before setTimeout above

clearTimeOut(timeOutId);

// keep running a function in the future, in every 3s

setInterval(function(){
    //
}, 3000);
```
    
## Synchronous code
- line by line execution

## Event listeners
- Same as onclick
- Can run multiple events on same element
- Has delete option

```js
const eventListenerFunction = () => {
    console.log('click');
};

buttonElement.addEventListener('click', eventListenerFunction);

buttonElement.addEventListener('click', () => {
    console.log('clicked');
});

// Remove

buttonElement.removeEventListener('click', eventListenerFunction);
```

## Data Attribute
- just another HTML Attribute
- allows us to attach any info to an element
- starts with __data__ (in html class)
```html
data-product-info
```
```js
const productInfo
```

## Closure
- if a function has access to a value/variable, it will always have access to that value/variable

## Modules
- better way to organize codes
- work with live server
- help us avoid naming conflict
- don't have to worry about order of files

## ESM Version: EcmaScript
```js
export default some_stuff;  // default export/import, at a time one thing from one file
```

## MVC (design patter)
- many JS frameworks are based on MVC
- update the data + regenerate all the HTML = MVC
- make sure the page always matches the data

### MVC splits our code into 3 parts:
- __Model__: saves and manages the data
- __View:__ takes the data and displays it on the page
- __Controller__: runs some code when we interact with the page (update)

## TESTING
-  __Manual Testing__ Open the website and try out the code
-  __Automated Testing__ using code to test code
- Test suite: Group of related tests

-  Flaky Test: test that sometimes passes and sometimes fails
-  Mocks: let us replace a method with a fake version
    -  A mock only lasts for one item

-  __Unit Tests__ testing 1 piece of the code (maybe a function at a time)
-  __Integration Tests__ testing many units/pieces of code working together

-  __Hooks__ lets us run some code for each test
    - Hooks in Jasmine: `beforeEach(), beforeAll(), afterEach(), afterAll()`

## OOP
- another way of programming, another way to write code
- organizing our code into objects
- trying to represent the real world
- easy to create multiple objects
- use _PascalCase_ for things that generate objects

- we can use functions to generate objects, better way: class

- class = object generator
    - constructor(param) {}
    - #property  // private

- __Inheritance__: lets use reuse code between classes