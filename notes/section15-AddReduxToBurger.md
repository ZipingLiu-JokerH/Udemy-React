# Section 15: Adding Redux to our Burger Project

If we using Routing in our project, we will notice that we have already use `BrowserRouter` to wrap the `App` component. Now, where should we place the `Provider`? 

Answer: `Provider` should also wrap the `BrowserRouter` being the outer one.

***

When we want to add `connect` to `<BurgerBuilder>` we notice that we have already using the `withErrorHandler` to wrap it. Where do we use `connect`?  

Answer: We can wrap as many hoc as we wanted, the key is `connect` set props for the component. As long as the hoc we defined passed on all the props, we will be fine.

***
Lecture 279: Handling `purchasable`  

1. We can setup the purchasable variable in the store and update it whenever we need.
2. We can also change a little bit the function: instead of `setState` we can simply return true of false. Then in the `<BuildControl>` `purchaseable` property, we can directly call the handled function which return trur of false.

***
In Javascript, if we want to change a property of an object, but that property name is dynamically passed by someone else, we need to use this syntax.  

```javascript
ingredients:{
    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
}
```