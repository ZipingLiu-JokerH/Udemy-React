#Section3: Understanding the Base Features & Syntax

![section3-1 img](../markdownNotes-img/section3-1.png)

<a href="https://github.com/facebook/create-react-app" target="__blank">Create React apps with no build configuration: Create React App</a>

<span style="color: red; font-size: 17px">Every React Component has to return or render some HTML code which can be rendered to the screen!</span>

#### Understanding JSX
write "HTML" code inside Javascript
```JSX
class App extends Component{
  render(){
    return(
     <div className="App">
       <h1>Hi, I'm a React App</h1>
     </div> 
    );
  };
};
```