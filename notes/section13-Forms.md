# Section 13: Forms and Form Validation

We create our custom Component for HTML `<input>` tage. Make it easier for later styling and validation.

One thing to be careful about is when we want to coppy something with nested structure, ie: objects within objects. The spread operator`...` will not deep copy the whole structure, it only copy one level at one time.

In the HTML form, the `<input type='submit' />` is the default for `<button ...>`

Not verymuch on this section, see chode changes on Githubhistory -- finishing section 13

***
useful Links:  
Validate.js (you may import its functionality into your React projects): https://validatejs.org/  
Get more ideas about potential validation approaches: https://react.rocks/tag/Validation  

Alternatives to the manual approach taken in this course:
react-validation package: https://www.npmjs.com/package/react-validation  
formsy-react package: https://github.com/christianalfoni/formsy-react