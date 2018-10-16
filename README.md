# Front-end coding style guide
This document is intended to outline best practices around front-end development, with a focus on Angular code. Please use these guidelines when starting a new Angular project, or even when updating an existing codebase.

## The Basics

### General

* Follow DRY (**D**on't **R**epeat **Y**ourself) principles when structuring code
* Make locating code intuitive and fast when building the application folder structure
* Name files so that you can immediately tell what it contains
* Keep a flat folder structure as much as possible

### HTML

* All elements, attributes, and values should be lowercase, unless the value represents text that is displayed to the user
* Use semantically correct HTML elements as much as possible (i.e. avoid using too many `div` or `span` elements)
* Provide alt text for multimedia elements
* Do **not** use style-based HTML elements (e.g. `center`, `br`, `u`, `i`, `font`, etc.)
* Do **not** use inline CSS styles on elements
* Use "double quotes" around attribute values
* Only use links (`a` elements) for actions that navigate users to another area of the application. Use `button` elements for all other actions (e.g. submitting forms, launching modals, etc.)
  - Do **not** use `img` elements to create clickable icons. Wrap the `img` with a `button` element instead, and put the action on the `button`.
* All input fields (`input`, `select`, `textarea`, etc.) should have corresponding `label` elements with a defined `for` attribute and descriptive text
* Tables should have defined `thead` and `th` elements for each column, and a `caption` element that describes what the data in the table represents
* Consider including WAI-ARIA attributes on elements to improve accessibility

### CSS

* Use `class` names in selectors as much as possible, rather than element names, IDs, or attribute selectors
* Use hyphens to separate words in selector names
* Use meaningful class and ID selector names, rather than presentational ones
```css
.error-message { color: red; }
```
* Use namespacing in selector names to differentiate between apps, modules, components, etc.
```css
.auth-inpatient-name { font-weight: 700; }
```
* Omit units and leading "0"s where possible
```css
.helper-text {
    padding: 0;
    font-size: .8em;
}
```
* Use three-digit hexadecimal color codes where possible
```css
.link-text {
    color: #09c;
}
```
* Use 'single quotes' for attribute selectors and property values
  - Don’t use any quotes for URI values
```css
@import url(https://www.google.com/css/maia.css);
```
* Don't use `visibility: hidden` or `display: none` to temporarily hide elements on a page, as this will make those elements invisible to screen readers
  - In these cases, use absolute positioning or `height: 0` instead. This is especially useful for showing/hiding error messages.

### JavaScript/TypeScript

* Use `const` when declaring variables, unless you need to reassign the value later, then use `let` instead
  - Never use `var` to declare variables
* Use literals to define complex structures (objects, arrays, etc.)
  - Don’t put quotes around property names. If the property name needs quotes because it is an invalid identifier, consider renaming the property.
```js
// Bad
const obj = {'first-name': 'John', 'last-name': 'Doe'};

// Good
const obj = {firstName: 'John', lastName: 'Doe'};
```
* Use the spread operator to create copies of objects
  - Use this pattern to override properties of the copied object
```js
const obj1 = {firstName: 'John', lastName: 'Doe'};

// Create new object with {firstName: 'John', lastName: 'Smith'}
const obj2 = {...obj1, lastName: 'Smith'};
```
* Use `Array.push` to add elements to arrays instead of direct assignment
* Use 'single quotes' for string values, unless it needs to preserve line breaks, then use template strings (i.e. \`backquotes\`)
```js
// Create string 'Line 1\nLine 2'
const twoLines = `Line 1
Line 2`;
```
* Use template strings for concatenation
* Use destructuring as much as possible
```js
function getFullName({firstName, lastName}) {
    return `${firstName} ${lastName}`; 
}

const obj = {firstName: 'John', lastName: 'Doe'};
const fullName = getFullName(obj);
```
* Never use `eval()`. Ever.
* Use default parameter values in function definitions
  - Parameters without default values are considered required parameters and should be listed first in the parameter list
```js
function addNumbers(a, b = 0) {
	if (typeof a === 'undefined') {
	    alert('First number is required!');
		return 0;
	}
    return a+b;
}
```
* Do not modify or reassign parameter values within functions
* Use arrow notation for anonymous functions
```js
const verboseArray = [1, 2, 3].map((number, index) => `Value ${number} at index ${index}`);
```
* Keep functions as small as possible. If you need to write a lot of lines of code for one function, consider breaking it up into smaller functions.
```js
// Bad
function doStuff() {
	
}
```
* Use `class` declarations to create objects instead of manipulating the prototype
* List public class members before private ones in class definitions, and list properties before methods
```js
export class Member {
    public firstName: string;
	public lastName: string;
	
	private dateOfBirth: Date;
	private ssn: number;
	
	public getSSN(): number { return ssn; }
	public getAge(): number { return calcAge(); }
	
	private calcAge(): number { return moment().diff(dateOfBirth, 'years'); }
}
```
* Leverage inheritance as much as possible by using `extends`
* Consider returning `this` in class methods to enable chaining
* Do not use wildcard `import` statements
* Use Array methods like `map()`, `reduce()`, `filter()`, etc. to iterate over elements instead of `for` loops
* Use `===` and `!==` for equality conditions instead of `==` or `!=`.
* Don't nest ternary operators
```js
const maybeNull = value1 > value2 ? 'baz' : null;
const foo = maybe1 > maybe2 ?  'bar' : maybeNull;
```
* Provide keyboard alternatives to mouse or touch events (e.g. `focus`, `blur`, `keyUp`, etc.)

## Angular

### General

* Utilize the Angular CLI commands to create new Angular elements such as modules, components, services, pipes, etc.
```
ng generate component login
```
* Only define one Angular element (component, service, etc.) per file
* File names should match the pattern `feature.type.ts`
```
inpatient-authorizations.service.ts
```
* Angular element class names should be UpperCamelCase and end with the element type
```js
export class InpatientAuthorizationComponent {}
```
* Use kebab-case naming for element selector names with a custom app-specific prefix
```js
@Component({
    selector: 'auth-outpatient-authorizations-list',
})
```
* Unit test files should end with `spec.ts` 
```
full-name.pipe.spec.ts
```
* Keep all code related to one feature in one folder

### Modules

* All apps should have a root `AppModule` in the src/app folder
  - This module should only be used to define app-wide module properties such as imports, exports, declarations, providers, etc.
* Each distinct feature should also have its own module defined
* Consider collecting all reused elements, such as components, directives, and pipes, into a single `SharedModule`
  - Consider collecting all shared, single-use elements, like services, into a `CoreModule` and only import it into the `AppModule`.

### Components

* Do **not** embed templates or styles directly in components; move them into separate `.html` and `.css` files.
* Component logic should only focus on rendering the view; move complex logic out into a service
  - Put presentation logic (e.g. string formatting, calculations, etc.) in the component, not the template
* Use attribute-based directives to handle presentation logic that does not require a template

### Services

* Services should be treated as singletons with a single responsibility (e.g. handling member information)
* Use services to handle all data operations, such as API calls, data storage, etc.

---
## Further reading
Here are some other resources that provide more detailed guidelines for coding in general, and for Angular development in particular:

* [Clean Code](https://gist.github.com/wojteklu/73c6914cc446146b8b533c0988cf8d29) by Robert C. Martin
* [Google HTML/CSS Style Guide](https://google.github.io/styleguide/htmlcssguide.html)
* [Mozilla WAI-ARIA basics](https://developer.mozilla.org/en-US/docs/Learn/Accessibility/WAI-ARIA_basics)
* [Javascript Style Guide](https://github.com/airbnb/javascript)
* [Angular Style Guide](https://angular.io/guide/styleguide)