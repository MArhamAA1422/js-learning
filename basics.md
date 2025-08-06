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

// callback function: function as parameter, a function to run in the future

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

myArr.push(100);  // insert back
myArr.unshift(100);  // insert front

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

- __Polymorphism__: use a method without knowing the class

- __this__
```js
// inside a function, we can change "this" to whatever we want (using call())

function logThis() {
    console.log(this);  // normally 'undefined'
}

logThis.call('hello');  // prints 'hello'
```
```js
// Arrow functions do not change the value of "this"

const obj = {
    method() {
        console.log(this);  // object

        [1, 2, 3].forEach(() => {
            console.log(this);  // regular function: undefined ('this' is changed), but arrow function: outer "this", object
        });

        [1, 2, 3].forEach(function() {
            console.log(this);  // undefined
        });
    }
}
```

### Procedural Programming is simpler in JavaScript

## Backend
- another computer that manages the data of a website
- response type: text, JSON, HTML, image
- using the browser = making a GET request

### Status Code
- starts with 4 or 5 = failed
    - 4: our problem
    - 5: backend's problem

### Backend API
- List of URL paths
- interface: how we interact with something

### window.location.href = "file-name.html";
- change the URL path

## URL Parameters
- let us save data directly in the URL
- also, known as __search parameters__
- ?orderId=123
- more params: ?orderId=123&productId=456

```js
const url = new URL(window.location.href);
console.log(url.searchParams.get('orderId'));
```

## Promises
- better way to handle asynchronous code
- similar to done() function
- let us wait for some code to finish, before going to the next step
- create separate thread, run parallel

```js
new Promise(() => {  // it's going to run this function immediately
    console.log('promise');
});

// resolve is a function
// similar to done()
// lets us control when to go the next step
new Promise((resolve) => {
    console.log('starts promise')
    loadProducts(() => {
        console.log('finished loading');
        resolve();
    });
}).then(() => {
    console.log('next step');
});
```
- if we have lots of callbacks, our code will become more and more nested:
```js
loadProducts(() => {  // callback
    loadCart(() => {  // callback
        renderCheckoutHeader();
        renderOrderSummary();
        renderPaymentSummary();
    });
});
```

- Promises let us flatten our code
```js
// A feature of promise
new Promise((resolve) => {
    loadProducts(() => {
        resolve('some value');
    });
}).then((value) => {
    console.log(value);  // 'some value'
    // other codes
});
```

- (another feature) We can run multiple promises at the same time: Promise.all()
    - wait for all of them to finish
```js
// Array of promises
Promise.all([
    new Promise((resolve) => {
        loadProducts(() => {
            resolve();
        });

    }),
    new Promise(resolve => {
        loadCart(() => {
            resolve();
        });
    })

]).then((valuesFromResolves) => {
    renderCheckoutHeader();
    renderOrderSummary();
    renderPaymentSummary();
});
```

## fetch()
- better way to make HTTP requests
- fetch uses a promise instead of callback

```js
// default request type: GET
fetch('https://supersimplebackend.dev/products').then((response) => {
    console.log(response);
});

fetch('https://supersimplebackend.dev/products').then((response) => {
    return response.json();  // also a promise
}).then((productsData) => {
    console.log(productsData);
});
```

## Async Await
- even better way to handle asynchronous code
- a shortcut for promises
- async = makes a function return a promise

```js
async function loadPage() {
    console.log('load page');
}
// same as
function loadPage() {
    return new Promise((resolve) => {
        console.log('load page');
        resolve();
    });
}
```
```js
async function loadPage() {
    console.log('load page');
    return 'some value';
}

loadPage().then((value) => {
    console.log('next step');
    console.log(value);  // 'some value'
});
```

- async let us use `await`
- await lets us __wait for a promise to finish__, before going to the next line
- await lets us write asynchronous code like normal code
- async await can only be used with promises

```js
async function loadPage() {
    await loadProductsFetch();

    await new Promise(resolve => {
        loadCart(() => {
            resolve();
        });
    });

    renderCheckoutHeader();
    renderOrderSummary();
    renderPaymentSummary();
}
```
```js
async function load() {
    const someValue = await new Promise((resolve) => {
        loadSome(() => {
            resolve('some value');
        });
    });
}
```

## Error Handling
- when we're sending HTTP request we could get unexpected errors.

```js
xhr.addEventListener('error', (error) => {
    console.log(`Unexpected error. Please try again later.`);
});
```

### try/catch
- it's meant to handle unexpected errors, (code is correct, outside our control)
- so, we don't use try/catch everywhere
- error handling in `async await` needs try/catch

```js
try {
    throw `error1`;  // manual error creation
    
    // these codes will be ignored due to error1
} catch(error) {
    console.log(error);
}
```

- manual error in promise
```js
// reject: it lets us create an error in the future
new Promise((resolve, reject) => {
    loadCart(() => {
        reject('error');
    });
});
```

## TESTING
-  __Manual Testing__ Open the website and try out the code
-  __Automated Testing__ using code to test code
- Test suite: Group of related tests

-  Flaky Test: test that sometimes passes and sometimes fails
-  Mocks: let us replace a method with a fake version
    -  A mock only lasts for one item

-  __Unit Tests__ testing 1 piece of the code (maybe a function at a time)
-  __Integration Tests__ testing many units/pieces of code working together

-  __Hooks__ let us run some code for each test
    - Hooks in Jasmine: `beforeEach(), beforeAll(), afterEach(), afterAll()`

    - beforeAll Hook, done() function
    ```js
    beforeAll(done => {
        loadProducts(() => {
            done();  // after load continue
        });  // load from backend, rest of the code should wait (normally don't)
    });
    ```