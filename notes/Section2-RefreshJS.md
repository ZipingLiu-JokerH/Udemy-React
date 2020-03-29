#Section2: Refreshing Next Generation JavaScript
A PDF summary can be find in the folder

- let & const
- Arrow function
- Exports & imports
- classes
    + proprtyies & methods
        * ES6
        ```javascript
        constructor(){
            this.myProperty = 'value'
        };

        myMethod(){...};
        ```
        * ES7
        ```javascript
        myProperty = 'value';

        myMethod = () => {...};
        // in ES7 when we use the extends keyword to create subclasses
        // we don't need to call super in the constructor anymore
        ```
- Spread & Rest Operators (...)
    + spread: used to split up array elements OR object properties
    ```javascript
    const newArray = [...oldArray, 1,2];
    const newObj = {...oldObj, newProp:5};
    ```
    + rest: used to merge a list of function arguments into an array
    ```javascript
    function sortArgs(...args){
        return args.sort();
    };
    ```
- Destructuring
```javascript
[a,b] = [1,2];
{name, age} = {name:'HJ', age:23};
```
- ArrayFunctions
    + <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map" target="__blank">map()</a>
    + <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find" target="__blank">find()</a>
    + <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex" target="__blank">findIndex()</a>
    + <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter" target="__blank">filter()</a>
    + <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce?v=b" target="__blank">reduce()</a>
    + <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat?v=b" target="__blank">concat()</a>
    + <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice" target="__blank">slice()</a>
    + <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice" target="__blank">splice()</a>
