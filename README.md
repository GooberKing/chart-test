# Front-end coding style guide
This document is intended to outline best practices around front-end development, with a focus on Angular code. Please use these guidelines when starting a new Angular project, or even when updating an existing codebase.

## The Basics

### General

* Follow DRY (**D**on't **R**epeat **Y**ourself) principles when structuring code
* Make locating code intuitive and fast when building the application folder structure
* Name files so that you can immediately tell what it contains
* Keep a flat folder structure as much as possible
* Be **consistent**!

### HTML

* Adhere to XHTML formatting rules
  - All elements and attribute names must be lowercase
  - All attribute values must have double quotes
  - Non-empty elements require a closing tag
  - Empty elements are terminated with a space and trailing slash
```html
<!-- Bad -->
<P>Paragraph Text
<INPUT TYPE=Text NAME='firstName' VALUE=John>

<!-- Good -->
<p>Paragraph Text
    <input type="text" name="firstName" value="John />
</p>
```
* Use semantically correct HTML elements as much as possible (i.e. avoid using too many `div` or `span` elements)
  - Use CSS to override browser default styles of semantic elements
```html
<!-- Bad -->
<div>A. Item 1</div>
<div>B. Item 2</div>

<!-- Good -->
<ol type="A">
    <li>Item 1</li>
    <li>Item 2</li>
</ol>
```
* Provide alt text for multimedia elements
```html
<img src="test.png" alt="Test image" />
```
* Do **not** use style-based HTML elements (e.g. `center`, `br`, `u`, `i`, `font`, etc.)
```html
<!-- Bad -->
<p>Here is some <i>emphasized text</i></p>

<!-- Good -->
<p>Here is some <em>emphasized text</em></p>
```
* Do **not** use inline CSS styles on elements
```html
<!-- Bad -->
<div style="color: red;">Warning message</div>

<!-- Better -->
<style>.warning { color: red; }</style>
<div class="warning">Warning message</div>

<!-- Best -->
<!-- styles.css
.warning {
    color: red;
}
-->
<html>
    <head>
        <link rel="stylesheet" href="styles.css" />
    </head>
    <body>
        <div class="warning">Warning message</div>
    </body>
</html>
```
* Only use links (`a` elements) for actions that navigate users to another area of the application. Use `button` elements for all other actions (e.g. submitting forms, launching modals, etc.)
  - Do **not** use `img` elements to create clickable icons. Wrap the `img` with a `button` element instead, and put the action on the `button`.
```html
<!-- Bad -->
<a href="javascript:void(0)" onclick="doSomething();">Do something</a>
<img src="button-icon.png" onclick="doSomethingElse();" alt="Do something else" />

<!-- Good -->
<a href="somewhere.html">Go somewhere</a>
<button type="button" onclick="doSomething();">Do something</button>
<button type="button" onclick="doSomethingElse();"><img src="button-icon.png" alt="Do something else" /></button>
```
* All input fields (`input`, `select`, `textarea`, etc.) should have corresponding `label` elements with a defined `for` attribute and descriptive text
```html
<div>
    <label for="firstName">First name:</label>
    <input type="text" id="firstName" />
</div>
```
* Tables should have defined `thead` and `th` elements for each column, as well as a `tbody` element and a `caption` element that describes what the data in the table represents
  - Use CSS to style or hide the caption as necessary (though not in a way that breaks screen readers -- see below)
```html
<table>
    <caption>2017 Quarterback Statistics</caption>
    <thead>
        <tr>
            <th>Name</th>
            <th abbr="Completions">Comp</th>
            <th abbr="Attempts">Att</th>
            <th abbr="Touchdowns">TD</th>
            <th abbr="Interceptions">Int</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Tom Brady</td>
            <td>385</td>
            <td>581</td>
            <td>32</td>
            <td>8</td>
        </tr>
        <tr>
            <td>Philip Rivers</td>
            <td>360</td>
            <td>575</td>
            <td>28</td>
            <td>10</td>
        </tr>
        <tr>
            <td>Matthew Stafford</td>
            <td>371</td>
            <td>565</td>
            <td>29</td>
            <td>10</td>
        </tr>
    </tbody>
</table>
```
* Consider including WAI-ARIA attributes on elements to improve accessibility

### CSS

* Use hyphens to separate words in selector names
```css
/* Bad */
.someClassName { /*..*/ }
.SomeClassName { /*..*/ }
.some_class_name { /*..*/ }

/* Good */
.some-class-name { /*..*/ }
```
* Use meaningful class and ID selector names, rather than presentational ones
```css
/* Bad */
.red-text { /*..*/ }

/* Good */
.error-message { /*..*/ }
```
* Use `class` names and IDs in selectors as much as possible, rather than element names or attribute selectors
```css
/* Bad */
table tr td { /*..*/ }
div[data-name="test"] { /*..*/ }

/* Good */
.member-data-cell { /*..*/ }
#specificElement { /*..*/ }
```
* Always write selectors in multiple lines, even if it only has one property
```css
/* Bad */
.member-name { font-weight: bold; }

/* Good */
.member-name {
    font-weight: bold;
}
```
* Use namespacing in selector names to differentiate between apps, modules, components, etc.
```css
.auth-inpatient-name {
    font-weight: 700;
}
```
* Omit units and leading "0"s where possible
```css
.helper-text {
    padding: 0;
    font-size: .8em;
}
```
* Use lowercase characters for hexadecimal values
  - Use three-digit hexadecimal color codes where possible
```css
/* Bad */
.link-text {
    color: #0099CC;
}

/* Good */
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
  - In these cases, use absolute positioning and clipping to collapse content instead.
```css
/* Bad */
.hide-element {
    display: none;
    visibility: hidden;
}

/* Good */
.hide-element {
    position: absolute !important;
    height: 1px;
    width: 1px; 
    overflow: hidden;
    clip: rect(1px, 1px, 1px, 1px);
}
```

### JavaScript/TypeScript

* Use `const` when declaring variables, unless you need to reassign the value later, then use `let` instead
  - Never use `var` to declare variables
```js
const defineOnce = 12;
let defineTwice = 13;
var defineVar = 14; // Bad
	
defineOnce = 23; // Bad
defineTwice = 34; // Good
```
* Use descriptive names for variables and functions, even in loops
```js
// Bad
const m = {fn: 'John', ln: 'Doe'};
function addInAuth(ia) { /* .. */}
for (let i=0; i < auths.length; i++) { /* .. */ }

// Good
const member = {firstName: 'John', lastName: 'Doe'};
function addInpatientAuthorization(inpatientAuth) { /* .. */ }
for (let index=0; index < authorizations.length; index++) { /* .. */ }
```
* Use 'single quotes' for string values, not "double quotes"
  - Escape single quotes in existing string values
  - Use \`backquotes\` for strings that contain both types of quotes or need to preserve line breaks
```js
// Bad
const oneLine = "Some text";
const apostropheLine = "Don't do this!";
const mixedLine = "\"What's up?\" she asked.";
const twoLines = "Line 1\nLine 2";

// Good
const oneLine = 'Some text';
const apostropheLine = 'Don\'t do this!';
const mixedLine = `"What's up?" she asked.`;
const twoLines = `Line 1
Line 2`;
```
* Use template strings for concatenation
```js
// Bad
const fullName = firstName + ' ' + lastName;
const fullName = [firstName, lastName].join();

// Good
const fullName = `${firstName} ${lastName}`;
```
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
```ts
function addNumbers(a: number, b = 0): number {
    return a+b;
}
```
* Do not modify or reassign parameter values within functions
```ts
// Bad
function addMember(members: Member[], member: Member) {
	members.push(member);
}

// Good
function addMember(members: Member[], member: Member): Member[] {
	const newList = members;
	newList.push(member);
	return newList;
}
```
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
```ts
// Bad
function Member(firstName: string, lastName: string, ssn: number) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.ssn = ssn;
}
Member.prototype.getSSN = function(): number {
    return this.ssn;
};

// Good
class Member {
    constructor(
        public firstName,
	    public lastName,
	    private ssn,
    ) { }
    getSSN(): number {
        return ssn;
    }
}
```
* List public class members before private ones in class definitions, and list properties before methods
```ts
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
```ts
// Bad
class Member {
    run(feet: number) { this.distance += feet; }
	jump(feet: number) { this.height += feet; }
}
const member = new Member();
member.run(10);
member.jump(5);

// Good
class Member {
    run(feet: number) {
        this.distance += feet;
        return this;
    }
    jump(feet: number) {
        this.height += feet;
        return this;
    }
}
const member = new Member();
member.run(10).jump(5);
```
* Do not use wildcard `import` statements
```js
// Bad
import * as MemberComponent from './MemberComponent';

// Good
import MemberComponent from './MemberComponent';
```
* Use Array methods like `map()`, `reduce()`, `filter()`, etc. to iterate over elements instead of `for` loops
```js
const numbers = [1, 2, 3, 4, 5];

// Bad
let total = 0;
for (let num of numbers) { total += num; }

const numbersPlusOne = [];
for (let index=0; index < numbers.length; index++) { numbersPlusOne.push(numbers[index] + 1); }

// Good
const total = numbers.reduce((total, num) => total + num, 0);
const numbersPlusOne = numbers.map(num => num + 1);
```
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