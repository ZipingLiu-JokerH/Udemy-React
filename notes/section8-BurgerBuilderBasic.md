# Section8: A real App: the Burger Builder (Basic Version)

### Planning a React APP

- Component Tree/Component Structure
- Application State(Data)
- Components VS Containers (stateless vs stateful)

***
`Object.keys(myObj)` will return a list of the keys in the object  
`[...Array(2)].map` to create an array of 2 empty element in order to do map. This is the same idea with for-loop.

***
Modal: 弹窗  
Backdrop: 背景变暗  

when ever we want to use an assets during development, we always need to import it, not simply use the path on our machine. Since webpack will bundle all together later in production, the relative path will not working anymore. Bu importing the assets, we let webpack aware of it and it can handle that while bundling.

Dynamically adjust size for same content displayed in different device and multiple places:  
(see example in Git History: adding side draw VS)

- one way of doing this is to use media query all over the place.
- another way is to using props to dynamically passing the height or width and use CSS inline style to overwrite the previous styling.
- third way is to use a `div` to wrap the elements, and we can adding addition styling to the div and using the power of CSS module to apply new style to the element.

***
Refresh on JS:  
Accessing Object properties:

- `objectName.propertyName`   or
- `objectName["propertyName"]`

***
Refresh on HTML:  
`<header>`:  represents a container for introductory content or a set of navigational links  
Typically contains:

- one or more heading elements
- logo or icon
- authorship information
- nav links

`<nav>`: defines a set of navigation links

***
Refresh on CSS:  
`box-sizing:`

- border-box: Width and height apply to all parts of the element: content, padding and borders
- content-box(default): Width and height only apply to the content of the element


