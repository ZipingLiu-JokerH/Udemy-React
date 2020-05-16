# Scetion 27: Using Hooks in Burger Builder

In a class based component, we use `componentWillMount` to let some code to run before the JSX code gets executed. When we changed to a functional component, the same trick can be applied by simply call these code before the JSX code.

In a class based component, we use `componentWillUnmount` to do clean up work. The same behaviour can be done by using the `useEffect` where the function returns a clean up function. Remember to let the depenency to be an empty array, if only want to call clean up function on unmount.

In a class based component, we use `shouldComponentUpdate` to optimize our performance. Where we return true if we need update, false do not update. In functional component, we can use `React.memo` to achieve this. By default, it compaires all the props, return true to not update, false to update(Rever logic). We can set only a set of props to compair.
```javascript
export default React.memo(Modal, (prevProps, nextProps) => {
    return prevProps.show === nextProps.show && prevProps.children === nextProps.children;
});
```

***
Since React-Redux 7.0, it provides hooks to connect Redux Store and React.  
`useDispatch`  
`useSelector`  

***
useful Links:  
Official Hooks Docs: https://reactjs.org/docs/hooks-intro.html