# Section26: React Hooks

Come with React 16.8  

No more class-based components. We use functional components with Hooks.  
React Hooks: Javascript Functions which can only be used from inside Functional Components or other Hooks. ie:`useXYZ()`  
Only used in the root level of functional components or inside other hooks.  
<sapn style="color:red">Important:</sapn> React Hooks have nothing to do with Lifecycle Methods(Lifecycle Hooks)

***
#### useState()
https://reactjs.org/docs/hooks-reference.html#usestate  
`useState` can be initialized with a default state, can be anything, a number, string, list, object etc. (Whereas in class-based component, state always an object)  
Initialize has two way: #1 simply pass the state to `useState`, #2 pass a functino that returns the state. The difference is that, in #1 the initial part will always being called, eventhought it is not the first time that components is being rendered. in #2 it will only be called once at the first render.

`useState` always return an array with 2 elements, the first element is the current state, second element is a function that allows us to update the state.This function takse in a new state and replace the old one.   

The update function can also takes in a function which have access to prev-state and returns a new state(in the case we need to determine new state based on prev-state, this is helpful and ensure we are updating correctly)  
In this case, when we access the `event` in the inner function, React will not like that, since React changed a little bit of the behaviour of `event`, it reuse it instead creat a new one. Hence, we need to declear a variablel to store the even related information befor going into the inner function.

<sapn style="color:blue">Important:</sapn> The update will replace the state not merge.
This might be a problem when the state is complex. Thanks to react, we can setup multiple state. Then we can update which one we want.
```JSX
const [enteredTitle, setTitle] = useState('');
const [enteredAmount, setAmount] = useState('');
```

***
#### useEffect()
https://reactjs.org/docs/hooks-reference.html#useeffect  
Now we want to fetch data when the component is rendered. Previously we use `componentDidMount` to do that. Now we introduce this new Hook.  

`useEffect` is normally used to manage side effect such as HTTP request. `useEffect` takes in an function and by default gets called after every component render cycle(same as ComponentDidUpdate). We can add a second arguments to `useEffect` which is an arry, a list of dependicies that will listen to. Only these change, `useEffect` will then be called. Passing an empty array as the second argument will only call `useEffect` at the first render cycle(same as ComponentDidMount)

The reason we can not simply send request and change our state is that, it will creat infinate loop. We send request, then set state, component re-rendered. We do it again and again.

`useEffect` can return a clean up function, which will run before the next run of `useEffect`. If we set `[]` empty array as dependencies, it will run when the component gets unmounted.

***
#### useCallback
https://reactjs.org/docs/hooks-reference.html#usecallback  
When we passing callback function into other components and the other components use that callback and affect the previous compoents to re-rendering. This re-rendering will actually create a new callback function which does exactly the same thing. We dont want this, so we can use `useCallback` to wrap that function, react will cache this function object and reuse without creat a new one.  
This is extremely helpful when we use that callback in `useEffect`. If we dont wrap that callback function with `useCallback`, it will create infinate loop.

***
#### useRef
https://reactjs.org/docs/hooks-reference.html#useref  
useRef returns a mutable ref object whose .current property is initialized to the passed argument (initialValue). The returned object will persist for the full lifetime of the component.

Note that useRef() is useful for more than the ref attribute. It’s handy for keeping any mutable value around similar to how you’d use instance fields in classes.