# Section24: Animations in React Apps

#### Using CSS Transition to apply animation:

```css
.Modal {
    /* some other properties */
    transition: all 0.3s ease-out;
}

.ModalOpen {
    opacity: 1;
    transform: translateY(0);
}

.ModalClosed {
    opacity: 0;
    transform: translateY(-100%);
}
```

#### Using CSS Animation to apply animation:

```css
.ModalOpen {
    animation: openModal 0.4s ease-out forwards;
}

.ModalClosed {
    animation: closeModal 0.4s ease-out forwards;
}

@keyframes openModal {
    0%{
        opacity: 0;
        transform: translateY(-100%);
    }
    50%{
        opacity: 1;
        transform: translateY(20%);
    }
    100%{
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes closeModal {
    0%{
        opacity: 1;
        transform: translateY(0);
    }
    50%{
        opacity: 0.8;
        transform: translateY(60%);
    }
    100%{
        opacity: 0;
        transform: translateY(-100%);
    }
}
```

#### Limitations of using CSS transition and animation:
The modal and backdrop are always there, it is only the display changed. The code is still there.  
If we try to use condition to decide whether or not to render the modal or backdrop component. ie `{this.state.modalIsOpen? <Backdrop /> : null}`. This will only apply the animation of showing the component, the disapearing part will not be showed.

*** 
#### Using React Transition Group
Github page: https://github.com/reactjs/react-transition-group  

Exposes simple components useful for defining entering and exiting transitions. React Transition Group is not an animation library like <a href='https://github.com/chenglou/react-motion' target="_blank">React-Motion</a>, it does not animate styles by itself. Instead it exposes transition stages, manages classes and group elements and manipulates the DOM in useful ways, making the implementation of actual visual transitions much easier.

Components

- <a href="https://reactcommunity.org/react-transition-group/transition">Transition</a>
- <a href="https://reactcommunity.org/react-transition-group/css-transition">CSSTransition</a>
- <a href="https://reactcommunity.org/react-transition-group/switch-transition">SwitchTransition</a>
- <a href="https://reactcommunity.org/react-transition-group/transition-group">TransitionGroup</a>

***
Useful Link and other posiable library:  
More on CSS Transitions: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Transitions/Using_CSS_transitions  
More on CSS Animations: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations/Using_CSS_animations  
More on ReactTransitionGroup: https://github.com/reactjs/react-transition-group  
Alternative => React Motion: https://github.com/chenglou/react-motion  
Alternative => React Move: https://github.com/react-tools/react-move  
Animating Route Animations: https://github.com/maisano/react-router-transition  

