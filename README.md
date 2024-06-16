## HexaxJs
### Hexax : The Transparent Web Renderer for perfectionists

### Welcome to hexax documentation


Hexax empowers creativity, speedy development while Building web apps.


### 1. Introduction

Hexax is a JavaScript framework designed with the target of enhancing creativity, speedy prototyping and efficient workflow while building web applications.  
It provides you with a flexible and intuitive API for creating an interactive user interfaces leveraging a declarative syntax. 

Hexax is a framework where creativity meets efficiency.

This guide isn't just about syntax and functions; it's a journey into a mindset that unleashes your creative potential and accelerates your web development skills.

Hexax leverages reactive data and efficient rendering to help delivering high-performance applications.

This guide will take you through a detailed journey, covering installation, basic concepts, advanced features, and practical examples.

Whether you're a newcomer to web development or seeking to expand your skills, Hexax serves as your guide to a higher level web UI development.


### 2. **Getting Started : installation and setting up your Hexax playground**

Before delving into the intricacies, let's establish our hexax playground.  
A basic understanding of HTML, CSS, and JavaScript is essential. If you're new to programming, take a moment to acquaint yourself with these fundamentals.

#### **Installation Proccess:**

Hexax is a dependency-free, browser-oriented, open-source javascript library. This means that using it is as simple as adding a `<script>` tag to your document head. No need for complicated build steps.

You can simply load Hexax by just including the following script tag in your main HTML file head tag and get going:

```html
<script src="https://cdn.jsdelivr.net/gh/hexaxsoftwares/Hexax-js@main/hexax.global.dev.js"></script>
```
You might also prefer the esm browser module. Here is the cdn link to a hexax exported components module.
```html
<script src="https://cdn.jsdelivr.net/gh/hexaxsoftwares/Hexax-js@main/hexax.esm-browser.dev.js"></script>
```
Some discreet developers might prefer loading and hosting hexax locally in production.

Then you can simply download the file from this jsdelivr Link . `https://cdn.jsdelivr.net/gh/hexaxsoftwares/Hexax-js@main/hexax.global.dev.js` and copy the file to your project directory, then link to it from your html head file .

```html 
<script src='path/to/hexax.global.dev.js'></script>
```
You can aswell use hexax in the cli  by installing it via npm/yarn  
Make sure you have nodejs installed.  
###### Using npm.
```bash
npm install hexaxjs-framework
```
###### Using yarn
```bash
yarn add --save hexaxjs-framework
```
Once installed, hexax becomes your creative companion.

## **Understanding hexax**

Once hexax is included in your project, the global namespace `Hexax` will be exposed and available within your script context scope if you are using the self/cdn hosting.  
Regular imports of hexax modules from `'hexax'` will be available if using the cli version or exported module

Destructuring while using the self/cdn hosting goes as below
```javascript
  const { initBuild, dataRef, el } = Hexax;
  ```
Regular imports while using the cli/esm installation guide
```javascript
import { initBuild, dataRef,  el } from 'hexax'
```
  
### **Introducing Widgets**

Hexax widgets are independent entities encapsulating UI components.  
A widget can range from a full page, to a simple component block within your application.  
Every widget has its own state, structure, and behavior and takes care of how it's model reactivity system is managed.  

This can be confusing at the moment , but don't bother, this documentation is designed for both beginners and experienced developers alike.

We define a widget with a simple plain javascript object:
Hexax supports the use of both classes and functions as valid widgets for  simplicity and completeness. You can learn how to use them in their dedicated sections  

Let's create your inaugural hexax widget.   
Envision a widget as the fundamental building block of your web application or a way you are allowed to create a self defined tag that can only be used in hexax compiled environment.  
Widgets helps you decomponentise your UI structure into smaller functions and components which helps reduce the complexity of project management.

Consider the example below
```javascript
let app={
  model(){
    this.greeting="Hello Hexax" 
  },
  template:`<h1> {{ greeting }} </h1>`
}
//this is a valid simple hexax widget
```

In the example code above, we created an object containing widget options that makes up our widget build.

lets go through the options above.

1. The ***model*** option: Expects a function.

The model option is used to define initial statefull properties that are to be exposed to the public instances.   
The model have you assign to `this` with property names of your model data.  
The `this` object values  are esposed to the widget instance and are however used in bulding and encapsulating the widget model and reactive datas.

This simply means that the widget UI and template will be provided a direct access to the model defined properties.  
You can simply make simple assignment to the `this` keyword within the model.
```javascript
model(){
  this.count=0
  this.info=[]
  this.greeting='Hello
}
```
The model method does not utilize a return value, do returned content will be ignored.

2. The ***template*** option: A string based option that is used to define your widget markup texts.  
Its recommended to use backticks while parsing this option to leverage the use of multline system.

You can parse any valid html markup to the template option, hexax only provides you with addition compile time semantics to help you build efficiently.

In the previous example, we've crafted a simple widget that conveys a greeting message.  
The `model` function establishes the widget's initial data store, and the `template` option defines the UI structure using the string based markup texts.  
Note how the model defined property via the inScope this keyword was to be accessed within the template tags directly by using the hexax interpolation syntax  
`{{ greeting }}`  
> Note: The properties are accessed directly, you don't have to access them through `this`

Without using the hexax based interpolation syntax, javascript provides you with a string interpolation system within the  backticks multline strings syntax.
But accessing `this` in the template option will rather point to the wrapping object.  
Same foul occurs if you are using a class based widget type, it will point to the class object.  
For example  
```javascript
let app={
  template:`<button > ${this.propValue} </button>`
}

```
Hexax reactive dependency tracker will not be notified if you used a non model defined prop since the widget UI build gots updated whenever the model returned properties changes or got mutated.  
Just know you have to declare all your initial values in model function, this also is useful in helping you reason about a widget as a self defined component.

### **Widgets as Art, Initial Entry point.**

In hexax, you're not just building widgets; you're crafting an art. Each widget is like a brushstroke, contributing to the canvas of your application. Think about the composition, the flow, and the visual poetry you create through your widgets.

When building with hexax, there must be an entry point for your app build. This is a fundamental concept.

The `initBuild` component is used to create an initial entry point widget, other child widgets can be passed here as components, pages or building blocks to the `initBuild` widget.

The initBuild method is passed a widget as its first Parameter.
This is an initial entrypoint widget of the app, we will learn how to use other widgets as child widgets  later on in this document.

Study the code below.
```javascript
const { initBuild } = Hexax;
let build = initBuild({
  model() {
    this.greeting='Hello Hexax
  },
  template:`<h1> {{ greeting }} </h1>` // Craft your visual poetry!
});

build.mount(/*root element instance or selector*/);
```
After creating an initial Build using `initBuild`, the DOM will still not display your template untill it's mounted.  
You ll ve to use the `build.mount` prototype method of the `initBuild()` to inject the widget template into the dom by providing a selector or a DOM Node as a first parameter to the mount prototype method.

There should be a root dom node in the html dom, where an initBuild instance would be mounted. The mount method is passed a seloctor or an instance of a dom node as a parameter.

The innerHtml of the mount Node target will be used as a fallback widget template if the build and the template options are both not provided or both returns `null` or `undefined`.

***Note:*** The in Dom template parsing caveat will be implemented when using the mount Root content as template in initBuild since hexax won't be able to take the responsibility of processing the innerHtml content before resolving.  


```javascript
//syntax
const { initBuild } = Hexax;
let build = initBuild({
  model() {
    this.greeting='Hello Hexax
  },
  template:`<h1> {{ greeting }} </h1>` // Craft your visual poetry!
});
  build.mount(/*selector*/)
```
Your widget template will be injected into the selected dom element, clearing all inner content of the selected element

***Note:*** More than one `initBuild` instance cannot be mounted into the same inDom Node.
But you can also have more than one `initBuild` in your project or in the same dom, provided they are not mounted into the same element

### **Template Syntax**

Hexax introduces a powerful templating language for expressing your UI elements using simple html markup syntax.  
Here is a well tested template language that provides you an efficient semantics of encapsulating complex logic into your Hexax template without foul or imposing perfomance loop holes.

Let's explore the templating features with some examples:

You can iterpolate model instances into the template by using the double curly braces, `{{ count }}`. 

Data values exposed through the model option can directly be referenced from inside the mustache tags expression text.

e.g.
```javascript
let app={
  model(){
    this.message="Hexax Explorer"
  },
  template:`<h1>This is the {{ message }} message</h1>`
}
```

`{{` and `}}` denotes the opening and closing tag by default . Any text within this tags will be parsed as javascript expression with the model instances in scope.

This mustache tags can only accepts single expressions, Which simply means that parsing of statements or more that one Expressions will raise a Hexax template Error.
Expressions are syntaxs that can be passed to a javascript function `return` keyword.  
For instance, a method call `value()` or inscope variable reference  `count`.
Statements are variable declarations using maybe the (`let|var|const`) keywords, reassignendts,  iterating using the `for` loop Statement, control flow using `if/else-if/else` or deleting an object property using the `delete` keyword.
Jusr make sure any expression passed can be received by a function's `return Statement

During template compilation, calling of a function that does not return a primitive value, will make hexax call its `prototype.toString()` method if it's callable.  
If not, it will be parsed `JSON.stringify` if it's not null or undefined.
`undefined` or nullish values will be transformed to an empty strong (`""`)


A method call `{{ func() }}` or tenary operations e.g , `{{ count ? count : 0 }}` can be a valid template expression provided it does'nt consist of a statement or more than a single expression

Many javascript keyword will not be accepted if found within the template tags.
keywords like 
```javascript
function,delete,for,if,else,else-if,const,var,let,class
```
> Note: The mustache tags connot be used in attributes

<!--### **Hexax UI Symphony: Templating as Expressions**-->

Hexax templates are more than just HTML with placeholders. They are expressions of intent, a language to communicate with your UI.


```javascript

let app ={
  model() {
    this.name='Hexax Explorer',
  },
  template:`
      <div>
        <h1>Welcome, {{ name }}</h1>
        <input $$model='name' placeholder='Type your name'>
      </div>`
  ,
};

```
In this example, an input field dynamically updates the `name` text based on user input. The `$$model` directive establishes a two-way binding between the input and the data.

Hexax templates provide a concise and expressive way to define UI logic.

Confused of what directives are , we ll learn of that in the next section.
Just know directives are a kind of special attributes with compile-time hydration that provides useful modifications on our UI build.

##### **Hexax Template parsing caveat**

View your templates as a dialogue with your application – a conversation that shapes the user experience using an efficient and dynamic implemention.

Tags can be immediately closed if they expects no children nodes  by adding a forward slash before the closing of the opening tag.  `<h2 />`  
This helps you omit a closing tag for non void tags and saving you the stress of writing a closing tag, since there are no use case of children elements.
```html
<element attr='value' />
<p/>
```
If this is a non void tag, Html Requires that a closing tag be provided or it ll anex the next of the tags till the end of the parent closing tag, as it's children nodes.  
Omiting the immediately closing Syntax like , `<element attr-value >` or not including a closing tag, will include all nodes following it as its children.

for example...
```html
<p class='alert alert-primary m-3 p-4' ><!--No closing tag provided--> 
  Hello Hexax Text Node
<input placeholder="Write something...">
```
In the above code, Both the `Hello Hexax Text Nodee` text and the input element will  all be included as children nodes of th `p` element since the `p` element expects a closing tag.

The immediate closing syntax, `<p />` helps close  the element without a closing tag.

In terms of void elements, like  the ` input, br, img etc` elements , they can be rendered without being immediately closed or a closing tag.

When parsing attributes, attributes names and value cases sensitivity are maintained except in cases where an `initBuild` mount node is used as template.

If an attribute value does not contain a space or special characters that may conflict with html tags like the `<, >, = , ", '`, which may confuse the hexax attribute passer,  you can pass them without quoting them.

e.g.  
`<element attr=my Value />` ×Bad  
`<element attr="my Value" />` √great  

the `Value` text path in the first example above will be compiled as a different attribute. It should be quoted like in the later code if they belong to a single attribute property, gor containing a space.

`<element innerHtml=<div/> />` ×Bad  
`<element innerHtml="<div/>" />` √great  

`<element onclick=()=>count++ />` ×bad   
In the ablove examples, the arrow **>** in the attribute will be misinterpreted as the end of the opening tag if they were not quoted.  
`<element onclick="()=>count++" />` √great  
For example `<element attr=myValue />` works perfectly fine, Hexax accepts non quoted attributes values once they follow the hexax attributes passing caveats.

Also when a binded attribute name matches your attribute value text, you can just pass the attribute while omiting the value part . 
This works like the native javascript objects option mapping.

For example `<element *name=name />` can just be written as `<element *name />` or using the `$$bind` binding directive, `<element $$bind:name />`  or but not without a binding since binding is required for this feature to work  
For example
```html
<element  name />`
<!-- will result in -->
<element name="" />
<!--using binding, Hexax will force the attribute name into a model prop, will rather raise an exception when path is not defined on model-->
<element *message />
<!--results in the following -->
<element *message=message />
```

This also works in direct  use of directives cases.
e.g.
```javascript
let app={
  model(){
    this.text='Hexax Explorer'
  },
  template:` <h1 $$text /> `
}
```
In the above example code, `text` will be mapped as the value of the `$$text` directive and passed to the context of the model instances. 
The above widget will  result in the following dom node
```html
<h1 innerText="Hexax Explorer" ></h1>
```
You must ve been confused of the terms, directives and binding, don't worry, it's no big deal.  
We will explain in details in our next section.

#### **Attributes Data binding : Connecting your UI system**

To bind an attribute value to a widget model instance data scope , use the `$$bind` directive. 

The `$$bind` will be passed an argument of the attribute value separated by a hyphen (`:`);
For example.
```html
<input $$bind:value=inputValue >
```
The `inputValue` text will be resolved to the model properties.  
A `propValue is not defined` exception will be loged to the console if no model property with this value exists.  

Since the `$$bind` directive may be needed more often, we provided you with a short form of using the bind, for easy accessibility by prepending an asterisks (`*`) sign to an attribute.
```html
<element *value=inputValue ></element>
```

However, we ll continue this documentation  with the use of the asterisks method throughout the rest of this document as it's shorter and easier to access .  
But the `$$bind` form remains more self explainatory and easier to reason about

For example, `*class='color'` will bind the class attribute to the value of `color` expression, meaning that the text value, `color` will be evaluated as a javascript expression with the model state instances in scope.

Same rules implies as with the template mustache interpolation tags.   Once an attribute name is preceded with an asterisks, its value will be treated as a javascript expression .

Data binding in Hexax is not just connecting reactive variables with the template attribute; it's orchestrating a symphony of interactions. 

Envision your UI elements harmonizing with the underlying data. Your application is a symphony where each note resonates with a data point.

Consider the code below
```javascript
let app={
  model(){
    this.color='bg-info'
    this.name= ' myParagraph'
  },
  // ...
  template:`
    <p *class="color + name" >Hello, Hexax!</p>
    `;
    
  ,
};
```

This example binds the `class` attribute to the value of `color` concentenated with the name property resulting in the dom node as follows
```html
<p class="bg-info myParagraph">Hello, Hexax!</p>
```

#### **Dynamic Attribute Names and Values**

Use square brackets `[]` to specify dynamic attribute names or values.  
You do not need to use the `$$bind` directive on  this attribute for this feature to work  
Once an attribute Name is enclosed within square brackets, the text within the enclosed bracket will be binded to the model public instances.
Same rules applies as with the mustache interpolation and binding directives.

Watch the example...

 ```javascript
 const { dataRef }=Hexax
let app={
  model(){
    this.name='class',
  },
  // ...
  template:`<p [name]='alert alert-primary'>Dynamic Attribute</p>`
  //The attribute value not bound in this case.
  ,
};
```
Using the `$$bind` directive binds the contents Attribute value not Attribute name.
Which means, if you do not wish to bind the attribute value, you can omit the `$$bind` directive.

### **Hexax directives**

Hexax directives a special transformed attributes an modifiers that perfoms usefull manipulation on elements while working with Hexax.  
Hexax provides directives that allow you to conditionally display elements, bind reactive datas to an input element during compilation, reference an element or skip the compilation of an element's children.

Directive is a special attribute used in manipulating a node or widget before, during or after compilation.

Hexax directives are not just instructions; they are artistic attributes guiding the flow of your application or widget build. See `$$if` as a creative decision, `$$for` as a rhythmic pattern, and `$$ref` as a dynamic palette.

Here are some commonly used directives:

##### $$raw 
To skip the compilation of an elements children and innerContent, use the `$$raw` attribute. 

compilation of all children of the element will be skipped while building this element.

The `$$raw` directive does not need to be passed a value, it presence on an element is considered and defaults to truthy, considers only boolean values, other values are ignored and falls back to `true`. 

Scopes to html elements nodes only and will be consumed by a root element when passed as a widget prop if there is a single root element within the widget.

#### **Conditional rendering Directives**

To render elements/widget based on some evaluated result of an expression or value, Hexax provides you with some useful condition based directives.

##### $$if

```javascript
let app={
  template:`<button $$if='false'></button>`
  
}
```

this element will not render since the condition render result is falsy

##### $$else-if

Checks if the previous element/widget  has a `$$if`/`$$else-if` directive, if not found, will raise an `Hexax Error`.

The `$$else-if` directive ,if available on the next element or widget following a `$$if` or other `$$else-if` element/widget , will be processed if, the `$$if`,ir `$$else-if ` on the previous element/widget, evaluates to false
Inoder to make it effective, should be passed to the next element or widget after the previous relative conditioned element/widget 

If unable  to find a relative conditional directive on the previous element/widget, will raise a hexax conditional Directive Error.

##### $$else
The `$$else` directive , displays its element if the previous `$$if` or `$$else-if` , if any, statements are falsy

Its always a gotcha to pass a $$if alongsode the $$for directive, if possible, avoid $$if with $$for on the same element/Widget.

#### List rendering

##### $$for
list rendering helps you render a widget or an element, from an iterable value , the resulting value will be available on the element, or widget rendering scope.

To achieve this , hexax provides you with the `$$for` directive.

here is a minimal example on using '$$for' directive.
```javascript
import { dataRef  }  from 'hexax
let app={
  model(){
    this.fruits:dataRef({
      orange:{id:223, color:'yellow',shape:'circle',count:56},
      mango: {id:3570,color:'green',shape:'rect',count:911},
      pearl:{id:67,color:'navy-blue',shape:'rectangle',count:2},
    })
  },
  template:`
  <div $$for="(  value , key , index ) of fruits">
    <h1 >{{name}} </h1>
    <h3 >COLOR: {{value.color}}</h3>
    <h3 >SHAPE: {{value.shape}}</h3>
    <p>it's over {{ value.count }} pieces</p>
  </div>
`
}
```

`$$for `encapsulates element datas, and creates the relative data based on the evaluasted loop data, then passes the positional arguments to the element/widget context.

It also follows the common javascript  forloop structure.
Destructuring of arrays and object are also allowed.
Array destruct extends to Set,Array and the Hexax builtin Tuple.

###### Accepted constructs
```javascript
item of iterable
// just the value key name and the iteration syntax
( value , key ) of iterable
// value and key provided within a bracked
( value ) in iterable
//first argument in the parenthesis always remain the item value rather than keys
( count ) of number
//if a number is used, like above, the first wiil be the number count from 1- number
3
//number passed directly without a value/key props, element will be compiled to the number of count.
( count ) in 5
//same as the example above, just with a value getter prip
`iterable`  
//just the iterable value property
{ item:[], value='' }
//iterable passed directly rather than props
{ id, name } of arrayProfiles
//the value is an object, so we destructured the resulting object into the template context.
[ value ] of values
//array destructure
( [ value ] ,  key , index ) of iterable
// Destructuring syntax with key and index definition

```

The `$$for` directive can iterate over any iterable  object or number value type.

A parenthesis `()`, and greaterthan/lesserthan  characters `<>` can all be used in enclosing the key value pairs.

It's recommended to use the `for...of` when iterating through an object over the `for...in` iterator protocol except when iterating over a none object data type, e.g A number.

Like in `< text > in arrayData `.

The `for...in` iterator at times may produce unexpected result when used on an object data type expecially in cases where key/value pairs is required.

We  do not recommend the use of key value paires in `for...in` loops, since the value of the value path  reference will remain "undefined";

From the JavaScript official documentation, it's quoted 

> `Many JavaScript style guides and linters recommend against the use of 'for...in', because it iterates over the entire prototype chain which is rarely what one wants, and may be a confusion with the more widely-used "for...of" . `

Both the `for...of` and `for...in` can be used interchangeably.

It's included in Hexax's support for completeness.`

If a single reference is passed, it references the value data. If the iterated data is a Number, it will reference the number count.  
Can be enclosed within bracked or standalone.

For example...

`value of iterable` works aswell as 

`( value ) of iterable`

In cases where key/value pairs are required, then the enclosing brackets are required.
Here if `for...in` is used, the second value might be of `undefined`.

An iterable or a number can just be passed without a looping format , like key or value mapping. The widget or element will be evaluated to the count of the iterable or number value.

e.g
```javascript
template:`<input $$for="iterable" >`
```

***Note:*** No  value of key/index or value is passed to the context, remember.

#### ***Artistic Directives***

##### $$model

Data instances defined and exposed from the model method option can be two way binded efficiently using the '$$model' directive.
    e.g.
```javascript
const { dataRef } = Hexax

let app={
  model(){
    this.value=dataRef("Hexax Explorer")
  }
  template:`
    <input $$model='value._data'>
    <h3> {{ value._data}} </h3>
    `
}
```
By using the `$$model` directive, the input element is now bound to and from the value state data, which means, the input is been populated with the data from the value property, any update to the input will aswell update the value property, hereby triggering a state rerendering.

Scoped to Input, Textarea and select elements only.

##### $$ref

Accessing a node object from inside a widget and side effect manipulation on dom objects can be achieved using the '$$ref' directive.

`$$ref` is used to reference in template variables.
```javascript

let app={
  model(){
    this.value:""
  }
  template:`
    
    <input $$ref=value >
    `,
  handlers:{
    doSomething(){
     console.log(this.value)//<input>
     //will now be populated with the instance of the input element
    }
  }
}

```
Value of `value` property will be populated with the element or widget instance if passed to a widget tag.

##### $$text

Injecting an innerText content into a Dom Node is achieved using the `$$text` directive.

This directive uses the `element.innerText` method to populate an element's innerText with the provided string value.

This is how to...

```javascript
const { html } = Hexax

let app={
  model(){
    this.text:"Hexax Explorer"
  }
  template:`
    
    <p $$text=text > </p>
```

 
##### $$html

Same as `$$text` only used in inserting innerHtml into an element.

##### $$bind

Used in binding attributes to the reactive data instance.
```javascript
let app={
  model(){
    this.value='m-5 primary btn'
  },
  template:`<button $$bind:class='value' > Hello Hexax</button>`
}
```
The `$$bind` directive can be chained  with other attributes with exception of directives 

Cannot chain more  than one attribute to `$$bind`.   
Since `$$bind` is been used too frequently, hexax provides  a shortform of invorking  the binding directive using the  asterisks (`*`).  
```html
<button $$bind:class='value' > Hello Hexax</button>
<!--can just  be written as  -->
<button *class='value' > Hello Hexax</button>
```
`$$bind` can also be used to parse an object of elements  attributes and values without passing an argument to `$$bind`.
```html
`<button $$bind="{ class:value+' btn', innerText:'click me'}" />
```
This  works  as like the hexax spread syntax, you  can however declare  the object within the model  instance  and reference it  from the  binding attribute value. 
```html
<button $$bind=buttonProps />
```
Or more preferably, you can use the hexax attribute spread syntax binding.  
```html
<button ...buttonProps />
```
The spread syntax cannot be used on a none plain javascript object.  
Hexax also provide way more useful directives and an API on how to build Custom directives on both widget and html elements
Contact  the Hexax builtin directives API for more about Hexax directives.

##### **Custom Directive**

Hexax provides a declarative interface for building customized directives.
This is useful when you want to incorparate useful and self defined functionality into a HexaxDomInstance .

You can create a fully functional directive using a function or an object consisting of hooks callback.   
directives must be registered using the directives option.
Here  is an example of creating a custom directive 
```javascript

export default{
  directives:{
    autoFocus(el, value, modifiers){
      //receives the element/Widget instance, value being  passed and and array modifiers
      el.focus()
    },//a function directive behaves as the created hook
    beautify:{//an option based directive accepts LifeCycleHooks methods e.g. created, mounted, unMounted, 
    
      created(vnode, value, modifiers){
        vnode.$element.style.background='#0a3039'
      },
      mounted(vnode, value, modifiers){
        
      },
      init(build, value, modifiers){
        //Reaceives thw nodeObjectValue as passed to the defineVNodeElement module
      }
    }
  },//usagw
  template:`
  <input placeholder='Write your content' $$autoFocus >
  `
}
```
Custom directives can also be used the same way as built in directives.  Beware of hexax builtin directives name while registering your custom in order not to conflict

Read the directives API Docs for more Details on using directives.

### **Building Blocks: Components Based Architecture**

hexax encourages a component-based architecture, allowing you to create modular and reusable UI elements. 

Let's create a simple header widget and compose it into a larger application structure:

```javascript
const { initBuild } = Hexax;

// Component
let Header = {
  model() {
    this.title= 'Hexax World';
  },
  template:`<h1>{{ title }}</h1>`
};

// Compose into a larger structure
let build = initBuild({
  template:`
      <div>
      
        <Header/>
        
        <p>Welcome to the {{ title }}</p>
      </div>`,
  widgets:{
    Header
  }
});

app.mount(/*root element instance or selector*/);
```

Here, we've created a simple header widget (`Header`) and seamlessly integrated it into a larger application structure (`build`). Widgets enhance the modularity and manageability of your application.

This means widgets can be nexted down the thread as much as you wish, by composing a widget into another that is composed into a larger Component.

Before a widget can be used in another widget as a tag , it must be registered in the `widgets` object option.
Many widgets  as possible can be used within the `Header`  widget provided it's registered.
***Note:*** During widget registration, be sure it followed the hexax widget naming rules. 
Must not conflict with any built in hexax widgets.  
Widgets registration names must pass atleast one of these tests .

contains :
 1. A hyphen (-),
 2. An underscore (_), 
 3. A number or
 4. An uppercase letter.
 
###### **Usuported Widget naming construct**
 1. Must not contain  html own tag  characters ( < , > , =, " , ')
 2. Must not start with a number or a hyphen

If it posseses none of this requirments, hexax will raise a `Widget registration Warn`.

### **Handlers**
Hexax provide an intuitive way of defining stateful method Handlers.

Handlers helps you perfornm stateful logic or functions  on model datas.

To define  methods on your widget, define a handlers object option in the widget options.

for example...

```javascript
let app={
  model(){
    this.count=0
  },
  handlers:{
    increment(){
      this.count++
    }
  },
  template:`
<button $$on:click='increment'>Clicked me {{ count }} times</button>`
}
```
Example using hyperscript.
```javascript
const { el ) = Hexax

let app={
  model(){
    this.count=0
  },
  handlers:{
    increment(){
      this.count++
    }
  },
  build(){
    return ()=>el('button', { onClick:this.increment }, 'Clicked me' + this.count + 'times' )
  }
}
```

Handlers defined here are automatically exposed to the template instances directly and can be accessed within both the template and attribute scope like in the examples above.

For calling a handler, hexax provides you with the `$$on:handler` event caller, or the `@handler` shortcut pattern.

Hexax supports all non deprecated event calls through the `$$on:xxx` or `@xxx` event  triggering directives.

You can also parse modifiers to your handlers when been called. They are to be separated using pipes character after the eventName

e.g.
`<button $$on:click|once='increment' />`

Modifiers can be chained 

`<button $$on:click|once|stop|trusted='increment' />`

For passing modifiers to handlers when using a hyperscript powered UI, you needs the `withModifiers` macro .
```javascript
const { el, withModifiers }=Hexax
let app={
  model(){
    this.count=0;
  },
  handlers:{
    increment(){
      this.count++
    }
  },
  build(){
    return ()=>el('button', { onClick:withModifiers(this.increment, ['Prevent', 'trusted', 'nonpassive']) }, 'Clicked me' + this.count + 'times' )
  }
```
Accepts a first argument of the handler, and an array of modifiers strings names.

Here are Hexax supported event modifiers

1. **once:** Prevents the handler from being called more than once.
2. **capture:** Sets the capture modifier to true.
3. **trusted:** Checks if the `Node.isTrusted` is `truthy`
4. **prevent:** Calls the `event.preventDefault` on the handler.
5. **stop:** Calls the `event.stopPropagation` on the handler.
6. **self:** Checks if the present node is the same node with the target node.
7. **passive:** Sets the passive modifier to true
8. **nonpassive:** Explicitly sets the passive modifier to false.

Explore their usage to perform logic on model data:

Events can be chained too, like when you wish to incorparate the same handler to more than one event, hexax provides you a stress saving  semantics that stops you from writing different attributes and directives for each of the events when they have to use the same handler and maybe share same modifiers.
`<button $$on:click.hover.keydown='increment' />`  Using the dot sepaeator, you can chain as many events as possible.   
`<button $$on:click.hover|present|trusted|capture='increment' />`  They all share from the modifiers being passed.

### **Reacting to Changes: Crafting Dynamic Reactive mentality**

In the world of Hexax, think of your application as a living, breathing entity. The reactive nature of Hexax means your UI responds dynamically to changes in data.

Embrace this reactivity – it's not just a feature; it's a mindset. Your UI evolves as your data revolves.

Hexax excels at reactivity making it easier in building dynamic widgets.

Let's create a button that increments a counter each time it's clicked:
Notice how the button counter displays responds to the user interaction

```javascript
const { initBuild } = Hexax;

let app= initBuild({
  model() {
    this.count: 0;
  },
  template:`
      <button $$on:click='increment'>
        Clicked {{ count }} times
      </button>` ,
  handlers: {
    increment() {
      this.count++;
    },
  },
}).mount('#root');

```

Now, a button increments a counter with every click by calling the `increment` method from the handlers. Notice how changes in the data (`count`) automatically update the UI.

This reactivity system may not be effective when a data been mutated is accesed from an object based dataType like a Set, Map, Array, or a plain object.

Utilize the `dataRef` macro for deep reactive object dataTypes reactivity hydration:
Its returned datas are exposed to the template instances directly as `<propName>._data`.

here is a minimal example

```javascript
const { dataRef }=Hexax
let widget={
  model(){
    //initialized widget instances
    this.obj=dataRef({
      message:"Exploring Hexax",
      count:0
    })
    this.num=dataRef(34)
  },
  build(){
    //accessed in the widget through the ***this*** keyword
    this.obj._data.count+=70
    //to access them in template, it ll be esposed as _data.count, this datas object are reactive data
    return html`
      <h1>{{ obj._data.message}}</h1>
      <p >{{ obj._data.count }}</p>
      <h5> {{ num._data}}</h5>
      `
  }
}
```
By utilizing the `dataRef` macro, this helps us handle dependency tracking for nexted and deep data properties;


### **Display rendering**
To customize these mustaches tags, you will ve to setup a widget configuration option known as the  `buildConfig`  in your  widget which is an object of widget configuration settings. 
Then you parse in an option `delimiters` with an array value of two datas consisting of two string values,  an opening and closing tags. 

e.g
```javascript
let app={
    buildConfig:{
        delimiters:['[[',']]']
    }
}

```

The values will be used in interpolating template strings instead of the default curly brace patterns within the present widget.


hexax offers flexibility in rendering your UI widgets.

You have two options for rendering your UI widgets: using template strings or the `el` Hyperscript function through render .

Choose the rendering option that best suits your coding style and project requirements.

#### **Native html templating system**

Define your UI structure directly using template strings. Widgets has to be Registered through the `widgets` option for accessibility:  
Consider it as a way hexax enables you create your own tag elements .

```javascript
let app= {
  widgets: {
    MyWidget,
  },
  template:`
      <div>
        <p>Header</p>
        <input type="text">
      </div>
      <MyWidget/>
    `,
};
```

#### **The Hyperscript Function: programmatic templating approach**

The `el` function is a hyperscript function for creating virtual DOM nodes, offering a programmatic approach to widget definition : Just an alternative to React's JSX

Choose the rendering option that best suits your coding style and project requirements.

It takes the element name or a widget instance as the first argument, followed by attributes and children. Children can be plain texts, or other el objects, 

The `el` function can only be used or returned with a render function from the build function

Here is an example using the el module
``` javascript
let app={
  build(){
    return ()=>el('p', { class:'name '}, /*more children like texts or more el objects */   el('input'))
  }
}
```
el macro can accept as many child `el` instances as possible by wrapping them in an array.

```javascript
let app={
  // ...
  build() {
    return ()=>el('div', [
      el('p','Header'),
      el('input', { type: 'text' }),
    ]);
  },
};
```
For multiple root Nodes, you can wrap them in array square brackets seperated by comma.
`return ()=>[el('p', 'Header'), el('input')]`

the first argument is required and  must be a string value of a valid html/svg/resolved Custom makeNativeElement tag name, an unresolved makeNativeElement instance or an instance of a valid  widget dataType, other two arguments  can be dynamicaly passed as children `el` nodes or attributes. 

The el function accepts only three arguments, whereas 2nd and 3rd arguments can be passed dynamicaly,  if there are no need for any, it absence does not matter as there is no contextual defined position for any of the both, unlike other frameworks where you have to pass a positional arguments or null  to the hyperscript function.

```javascript
import MyWidget from 'widgets/pages.js'
let app= {
  
  build() {
    return ()=>el('div',
      [
        el('h1', 'Header'),//only a text node child
        
        el('input', { type: 'text' }),//only am object of attributes or Params 
        
        el(MyWidget),//omly widget definition
        
        el('p',['A child text node',el('br')],{ class:'m-5 text-primary'}),//children nodes paseed at parameter 2 before an attributes objecr
        
        el('makeNativeElement'),//registered customElements 
        
        el('input')//just an element name
      ]
    );
  },
};
```

Widgets do not need to be registered before been used, they only need to be in scope.

### **Advanced Usage**

In addition to the basics, Hexax offers some advanced features that can enhance your development experience.

### **Params**
You can pass Parameters  to your widgets to make them more dynamic and reusable. 

Params is a consistent way of passing model based datas from the parent down to the child widget

You can Define the params option in the widget's options object and access them in the template as `$params.xxx`.

validation can be a type function, or an object consisting of type , a validator method which should conditionally return a boolean value and default, or required properties.

e.g

```javascript
let app={
  params:{
    color:String,//a String prototype functiob, which will be ised to chech against params datas
    
    }
    seed:{
      type:Object,
      required:true,//required may not co-exist with the default option
      default:{},
    }
    name:{
      type:String,
      default:'Prince'//default validation option may be passed a finction which returned the valie
      validator(value){
      //a validator function, with a Parameter of the value
      if(!typeof value === "string") return false
      else return true;
    }
  },
  template:`<h2> My name is {{ $params.name }} </h2>`
}
```
 Usage:
 ```html
<widget name="John" *seed="{}" />
<!--widget properties / javascript expressions or attributes names can also be bind using the '*' , asterisks flag-->
```
Remember when passing an in template expressions, like objects/array/function or other special data types, it must be quoted, especially in cases where an inner quoting might be involved, then double quoting is recommended, so single quoting can be used internally.

In cases where some kind of complex expression might be involved, its recommended to define the data in the model data method, then reference it from the template.

Params will be exposed to the template instance as `$params.xxx` within the child widget

Validations will raise a Hexax Error or warn , if failed or when a validator function returns false.

Params can aswell be passed an array of params names strings, this is useful when there is no use case of validations e.g

`params:['color','seed']`

#####  ***Params validation options***

- `required`

Type: `Boolean`  
default: `false`  

- `validator`

type: `Function`  

- `default`

- `type`

Type: `Function`


##### ***Custom dataTypes prototyping***

Hexax supports the production of custom dataType using class Object.
For example...
```javascript
class PersonType{
  
}

let App={
  params:{
    person:{
      type:PersonType
    }
  }
}
```
Usage:
```html
<App *person=PersonTypeInstance />

```
Can be used same way as other normal dataType.

### ***Custom Nodes: Element free Styling***

Hexax allows you to create custom elements by using the makeNativeElement module. You can register your custom elements by calling node.define(). This is useful when you want to encapsulate complex functionality into reusable components.
for a custom element, use the `makeNativeElement` macro, then pass on normal widget options

here is a minimal example on creating a hexax custom element
```javascript
let node=makeNativeElement({
    /* accepts props, template, style and plugins options */
})

```
To register the custome node  if you are using the string template, ` node.define()`

or `customElements.define('my-element', node())`
It will be available to use in your widget Template, globally, does not require registration.

If you tend to use it through the render Function, `el` macro, it's resolve instance tag name can be used as `el`'s first Parameter , or import an unresolved instance into the namespace and passed as the first argument.

makeNativeElement also accepts all the native custom elements LifeCycleHooks
e.g.

***`onConnected, onDisconnected, onAdopted and onAttrsChanged`***


### **Slots: UI maintainability**

Slots provide a way to pass content to your child widget, from the parent widget. 

You can define slots on  your widget's template using the <slot> tag. The passed content will be used to replace the slot element.

Slot tags with no name attribute, will specifically be rendered as a default slot, you can as well, specifically set a default slot by setting the name attribute to default.
```html
      <div>
        <h1>My widget heading</h1>
        <slot/>
      </div>
      <slot name=default />
    `
```
Slot tags can also be named or dynamically named using binding to model data properties.
e.g
```html
<slot name='header'/>
<slot *name='dataProp'/><!-- dynamic slot naming -->
```

To parse slots contents for slots elements, Hexax provides you with the `$$slot` directive on elements/widgets.
e.g
```html
        <Widget>
            <template $$slot='header'>
                <!--Slot contents goes here -->
            </template>
            <input>
        </Widget>
  
```
Any element/widget can be passed as a slot content by specifying the slot to which it belongs to through the `$$slot` directive.
Slot elements can be passed default contents by providing inner cointent to it.  When no slot is specified for it, the default slot will be rendered.
```html
<slot name=header > <h2>A default slot content</h2></slot>
```

#### **Hexax slots passing caveat**

Slots works same as in other frameworks that uses the slot system, with slight differences in hexax.   
If a child widget has only a single root element, Hexax will try to parse all default slots to its innerHtml if, there is no default slot provided, and it has no innerHtml content.

To disable this action, you can set the `forwardSlot` settings to false in your buildConfig settings option  as it defaults to true.

All widget instances of the parent, are available, within the child widget scope, but not the other way round.  
but if need be to access a child widget's data within the scope it's defined in the parent, hexax provides you with the `fallThrogh`  option in the child widget.
A method with it;s `this` keyword  model public instance.  
Access to model instances are to be exposed directly, the `this` keyword would be available in the scope,and so it's returned value will be exposed as a state within it's consumer scope  e.g

```javascript
let app={
  fallThrogh(){
    return {
      count:this.count._data,//direct access to widget instance datas like in the string interpolation system
      name:this.$params.name,
      msg:this.messages//namespace variable
    }
  }
}

```
Any value can be returned from the fallThrogh.  
This will be exposed to the scope of the child widget tag through the `$$fall` directive. e.g
```html
    <Widget $$fall=prop >
      <!-- fallThrogh attributes of this child widget will only be available within this scope of Widget instance as $fall-->
        <h1>{{ prop.<xxx> }}</h1>
    </Widget>
```
if `$$fall` omits a value, fall will be used instead
Elements with no specified slot mapping, will be rendered into the default slot, if any default slot element is provided or the  child element  has a  single root element with no innerHtml contents or childNodes.

Slot contents are merged , and replaces  the matching slot element within the child widget template.

### **The `Build` function**

The build function is the widget major building compilation engine.
The build function has access to some useful widget options data as parameters, through two arguments, `[params, context]` provided.

The params parameter is a reference to `this.$params` datas object while the context is aswell an object, with access to, , signals, slots ,attrs and  utils .

This is useful when utilizing the hyperscript pattern.
Here is an example
```javascript
let app={
    build(params, context){
        return //...
    }
}
```
This properties can be accessed from the use of the `this` keyword with the exception of the slots and utils, but are provided here for simplicity .

They can be accessed by Appending  the ***$*** character to the `signals and attrs` data instances. 
for example...
```javascript
const { log } = Hexax
let app={ 
  postMount(){
    log(this.$attrs)
    log(this.$signals)
  }
}

```
### **Widget type system**

Hexax also accepts the use of functions and class objects as valid widgets, but with slight edge  case.

Function widget works as the scope of the build function, with no data state of it's own.
The `html` macro  is provided to help the functional widget  access  the hexax rich templating syntax.
Here is a simple hexax functional widget using the Template component system.
```javascript
const { html }=Hexax
function FW(){
  
  return ()=>el('input)
}

```
Can be registered and used as other normal widgets.

The Hexax style guides recommends against the use of arrow function widgets as an initBuild widget, nevertheless, function widget is a perfect hexax widget provided with hexax utilities. .

Class widgets are perfect and statefull widget encapsulation, in short, it was used in building the hexax builtin widgets.

Hexax does not utilize the `model` function, when working woth class based widgets, instead, hexax takes its defined props to this.model as hexax options.

A hexax class widget must extend the base `Widget` class. 
e.g.
```javascript
const { Widget }= Hexax

class myCW extends Widget{
  constructor(){
    super();
    this.model.count=56//props assignement to this.model
  }
  template:`<button > {{ count }} </button>`
}
```

Hexax recommends the use of object widget for declarative syntax

#### **LifeCycleHooks**

Hexax provides you with some usefull callback functions that run at some specific stage of the life of a widget.
    
##### preBuild: 
Called Synchronously except in the case of an asynchronous widget, before the widget instances are instanciated or any build process  is even started.
    
##### postBuild:
Called Synchronously except in the case of an asynchronous widget, after all widget instances are instanciated and after running the build function and creating all widget instances.
    
##### preMount:
<Promise Based> Called Asynchronously before inserting the widget UI into the dom.
    
##### postMount:
<Promise Based> Called Asynchronously after inserting the widget UI build into the dom.
    
##### preUpdate: 
<Promise Based> Called  Asynchronously before starting an update on any change on a statefull datas.
    
##### postUpdate:
<Promise Based> Called Asynchronously after updating the dom of changes the reactive datas.
    
##### preDestroy: 
<Promise Based> Called Asynchronously before destroying the widget instances and unmounting from the dom.
    
##### postDestroy: 
<Promise based> Called Asynchronously after destroying all widget instances and unmounted from the dom
    
    
LifeCycleHooks has there `this` keyword bound to the widget model instances with the Exception of the `preBuild` hook.  
Contact the LifeCycleHooks API for more detailed information.
    
### **Dynamic Widget**
Widgets can be dynamicaly rendered, expecially, when resorting to in dom templates, this can be achieved using the hx-build built in widget.
    
It accepts one required property, **self** which can be any registered widget instance or a valid  html/svg tag name.
    
Attributes or params for the widget pased to self, can be passed alongside the self params with `self` as first params.  
Children are passed as children to hx-build
    
### **Data Observation**
To perfom a data Observation within the widget instance datas, the 'observers' option can be used.
  
Within the observe object option, hexax accepts only  object, with names that references the widget defined model instances datas
  
Can  accept nested property accessor as metthod name e.g
  
```javascript
  let app={
    observers:{
      'value._data':()=>{
        
      }
    }
  }
```
Hexax will raise an observer error on access to a property that cannot be found on the model instance while naming an `observes` property.
  
To set up an observer method for the property of `value._data` inasmuch as the target  data is a `dataRef` data, or would not require nexted property accessing.
  
You can specifically set the method name to 'value'.
  here is an example.
```javascript
  let app={
    model(){
      this.count=2
      this.value=dataRef(77)
    },
    observer:{
      count(newV, oldV){
        //this method observes the count property of the widget instance
        //with parameter values of the new assigned value and it's former value
      },
      value(){
        //here is an observer method for the 'value._data' model instance
      }
    }
  }
```
Observer methods gets triggered each time the select prop calls its setter function.

For Observation of nexted object props, you can acomplish such tax within the postMount or any hooks or handlers  by using the `this._observe` macro.

```javascript

const { dataRef } = Hexax

let app= {
  model(){
    this.obj=dataRef( { num:56 , info : { name: 'Hexax Explorer', age :43 } } )//An object data
  },
  postMount(){
    
    //We are targeting to watch the age property of obj._data.info
    thid._observe('obj._data.info.age' , ()=>{
     // a callback function
    })
    //observe accepts two arguments, the path to the reactive object to watch, and a callback function,
    //Recommended to be an arrow function, so to be able to access the postMount scope this keyword.
    
  }
}

```

Precisely, you can watch more than one property using the `observe` component , by passing a getter function that returns the value of the live properties you wish to observe.

```javascript
const { dataRef , observe} = Hexax

let app= {
  model(){
    this.obj=dataRef( { num:56 , info : { name: 'Hexax Explorer', age :43 } } ) ,//An object data
    this.count=45
  },
  postMount(){
    
    //We are targeting to watch the age property of obj._data.info
    observe( ()=> this.obj._data.info.age + this.count, (newV, oldV)=>{
     // a callback function
    })
    //if both properties may not be concentenated, you may use an array  to  parse in the strings  of the props path, or getters
    observe( ['obj._data.info.age' ,()=>this.count], ([ newAge, oldAge ], [ newCount, oldCount])=>{
     // a callback function
      //Notice how we received arrays of two values , old an new from this callback parameter arguments
    })
    //NOTE:this must be omitted, and you must nit return it  from a function.
  }
}
```
Hexax watches the value of this properties and reacts when there values changes when reavaluated, instead of the data properties directly.

### **_effectHook**


## **Global instanciciation**

Hexax provides an effective way of injecting a global datas through out the scope of an initBuild and all it's child widget

1. `build.property`: Used to define a global property  to all child widgets of this parent widget;

global widget properties are encapsulated abd exposed to individual widgets model instanciciations and will be overiden by widget's own internally defined properties if conflicts occure.
Example usage
```javascript
const { initBuild }=Hexax
let build=initBuild({
  //widget options
  template:`<p>{{ text }}</p>`
}).property('text','Hello Hexax')
//accepts two parameters, a property name and the property data ref.
```
2. `build.handlers`: The hanlers prototype of initBuild sets global handlers for a widget
3. `build.widget` Also the widget prototype of the initBuild instance is used to set a global widget for all widget that are child of this parent widget.

### **Style and class guide**

Styling and class management is such a complex task that changes on daily basis. 
Hexax provides you with easy and reusable semantics that helps you create your widget with ease, no matter your project requirements or size.

##### **styleSheet: Scoping css**

Hexax provides you with a styleSheet option for defining styles for a widget.

Styles defined here are scoped to the widget template only by default.
The styleSheet option is passed the String multline literal as template option.
e.g.
**js*
```javascript
let app={
  template:`
<button class='btn' > Click me </button>
`,
  styleSheet:`
  .btn{
    height:40hx;
    color:blue;
    width:70%;
  }
  button{
    font-size:20hx;
  }
`
}


```

The styleSheet option is a complete css  Styling with scope functionality.
If you wish to make a paticular style global, to go beyond the scope of the present widget, prepend the `@g` directive to an independent style sheet selector.
for example...
```css
@g .btn{
  color:blue;
}
.btn{
  color: #0a3039;
}
```
The first `.btn` block will be a global style during processing , It will affect all elements matching the selector in the dom.

While the second sheet is scoped only to the widget template only.

#### **Inline style binding**

Hexax provides you with a helpful semantics that can help you pass styles within the template using the style Inline attribute.

A plain object can be psssed to the style attribute using the data binding syntax.

Here is a minimal example ...
```html
<h1 *style="{ color:red , 'font-size':'18hx', borderRadius:'10hx'}" >My heading</h1>
```
Notice how we single quoted the `font-size` propName for containing a special character,a hyphen(-) and the propValue `18hx` for containing a mix of a number and an aphabet.  
The single quote was used since the outer value was quoted using the double quote. It may be preferable to define this data objects in the model and bind them from the style attribute

MeanWhile, you can use the javascript provided css style property semantics, by Capitalizing a letter whenever there occured a hyphen replaced space like in the last property of the style attribute value in the previous example, the `borderRadius`.

You can simply define the style object using the `data` macro, and define it to a property in the model method.
Whatever way you choose , both the reactivity and responsiveness are maintained.
Also an array of style objects can be parsed to the style binding.
```html
<element *style="[styleObj,{ margin:'10hx', background:'#0a3039' }, elementStyles ]" />
```
Hexax will iterate through the array values and parse the resulting objects as styles  

#### **Class binding**

Class is a special attribute to an html element, so hexax provides useful semantics for encapsulating class names.

A class can be passed an array or a plain object.
for example...
```html
<button *class="[ btn, m-5 , w-70 ]"> Click me </button>
```
When a class binding receives an object, hexax evaluates the property values as a condition on passing the property keys as the class names.
e.g.
```html
<button *class="{ largeBtn:true, 'bg-dark':false, btn: true,  }">Click me</button>
```
The above example will result in a button element as below.
```html
<button class="largeBtn btn">Click me</button>
```
Since the `bg-dark` property has a falsy value, it was omitted.

An array of class objects or arrays can also be received. see Below
```html
<button *class="[ classObjects ,{ largeBtn:true, 'bg-dark':false, btn: true,  }, otherModelRefs  ]" />
```

### **Mustache Block Helpers***

Hexax provides in  mustache tags configuration setup  while compiling mustache tag expressions.  
Below is a simple example of using the block helpers.
`{{ %foo >> model_based_expressions  }}`
A template block helper is recognized by appending the `%` character before the block name and separating the block name from the actual expression using double greater-than character `>>`  
Block helpers can be aswell passed modifiers just  like passing modifiers to directives.  
`{{ %safe|mod|once >> stringValues }}`. Modifiers are separated using pipe `|`  just  like it's directive counterpart and can be chained aswell.  
Blocks helpers can however be chained, separating each block with the  dot `.` character.  
`{{ %safe.html|mod|once >> stringValues }}`


#### Custom blocks

Custom block helper can be generated  through a simple function which is to be registered on the blocks option before it can be used within the widget template.  
Customization helps you integrate some useful and complex functionality that may not ve been provided by the builtin components and gives you the full power of javascript over you dynamicaly rendered contents
See below
```javascript
export default{
  model(){
    this.name='hexax
  }
  blocks:{
    capitalize(valueBinding, modifiers){
      //receives the  resolved array of values being passed and an  array of modifiers as Parameters
      return value.charAt(0).toUpperCase();//the returned value will be used during rendering
    }
  },//Usage in template
  template:`<h1>Hello {{ %capitalize >> name  }}</h1>`
}
```
While building custom blocks, note it must return the actuall modified value  you want rendered.    

While chaining blocks,mind how it's ordered,  since it matters.   
For example `{{ %safe.html|mod >> stringValues }}` results to a block,  consisting of an `html` block helper chained to a `safe` block.  
In this case, since the `safe` block comes before the `html`  block, the later will be passed the return value of the former and used as it's value first value of the resulting valye array.     
All modifiers provided are passed to each chained block.  
You can aswell pass multiple Parameters by separating them with the `>>` character.
```html
<p> {{ %myBlock >> firstValue >> 890 }}</p>
```
This will be received within tge block Callback first Parameter as an array of two values;
You can also typecheck the values been expected  by using conditional statements on the resolved value.  
Blocks can be defined as a plain object, which exposes an enumerable `block` callback method;
Reference the Hexax blocks helpers API for more information.

###  **Hexax Plugin  mechanism**

Plugin is an interface  that reduces repeating of some global implemention on a build and helps create codes that improves reusability.  
There  are some use cases of plugins which we will explore in this document.   
Like you have some utility handlers, widgets,blocks,directives and also other plugins aswell that you are porting over to other developers. It's gonna be stressful to go over this modules and maybe register them globally/locally one after the other.  
Using the plugin system , you can make the registrations yourself and just port a simple object/function and it's dependencies to other developers.

A plugin can be defined using an object with just a plugin method or a function which acts as the plugin method itself.
A plugin is installed calling the install method on the `initBuild` instance.  
`initBuild(app).install(plungin)` method and can be chained.
Watch the  example code below
```javascript
import  { initBuild } from 'hexax'
import buttonCounter from './widgets/buttonCounter.js
const my_plugin={
  plugin(build, options){
    build.widget('buttonCounter',buttonCounter)
    //a plugin can also contain other complex computations on the widget instance
  }
}
function FuncPlugin(build, options){
  //plugin scope
}

let app={
  
}
initBuild(app).install(my_plugin,{/*config options*/})//plugin installation  can be chained to alongside other global methods  since they still  returns an instance of PIXEL_BUILD  with the exception of the  mount method which must be called last.
        .install(FuncPlugin)
```

### **Widget signals events listening**



### ***Hexax Agents***




### **API documentation**

#### **Built in Widgets API**

1. ***`<hx-build />`:***

Global NameSpace: `Build`

params:
  self:<required>
**Description:** A built in widget useful for rendering widgets dynamicaly.
Accepts one required params ,  The `self` params, which describes a native/resolved custom element tag name or an internally registered widget name.
If binded to a model property from the template or accessed using the hyperscript `this`, will raise a hexax warn since the hexax model instances are proxied objects/data. Except the data was to be parsed using the `rawData` function. 
Watch the example below
```javascript
import { rawData } from 'hexax'
export default{
  model(){
    this.inModelWidget:rawData({
      template:`<h1>Hello Hexax!</h1>`
    })
  },
  template:`
    <hx-build *self=inModelWidget />
  `
}
```
> **Note**: Does not require binding if the name be  passed is not an in model instance property.

The widget can be accessed from the template as `hx-build` but can be imported from hexax itself as `Build` while using the hyperscript building system.  
Other properties/attributes passed to the `hx-build`  widget ,except the self params, will be resolved as attributes/properties of the returned elememt .  
Children passed to `hx-build` will be passed to the resolved elememt/widget, including the defined slots within the defined widget template.

2. ***`<hx-fragment />`:***

Global NameSpace: `Fragment`

**Description:** `hx-fragment` is a built in widget that is used to  render a set of elements without having to wrap them within an enclosing tag / element.  
This is technically useful, expecially when rendering a slot content and don't want to get them wrapped within an enclosing wrapper element.
```html
<ButtonCounter >
  <hx-fragment $$slot='content'>
    <h1>This is a counter button</h1>
    <p>Click on me</p>
    Thanks
  </hx-fragment>
</ButtonCounter>
```
The `hx-fragment` expects/requires no params .  
Available from the global hexax as `Build` if need be of compiling it using the `el` render and hyperscript functions

3. ***`<hx-for />`:***

Global NameSpace: `For`

params:
  - iterable:<required> An iterable data type like `Object,Array,Set,Map` or optionally a number value 
  - context:<optional> An optional params that is passed a set of context variables.

Description: This is built on top the `for` directive and simplifies the use of the `for` loop rendering.
For example  
```javascript
import { dataRef  }  from 'hexax
export default{
  model(){
    this.fruits=dataRef({
      orange:{id:223, color:'yellow',shape:'circle',count:56},
      mango: {id:3570,color:'green',shape:'rect',count:911},
      pearl:{id:67,color:'navy-blue',shape:'rectangle',count:2},
    })
  },
  template:`
  <hx-for *iterable=fruits._data $fall="[ name, value ]" >
    <h1 >{{name}} </h1>
    <h3 >COLOR: {{value.color}}</h3>
    <h3 >SHAPE: {{value.shape}}</h3>
    <p>it's over {{ value.count }} pieces</p>
  </hx-for>
`
}
```
Passed all children of the `hx-for` widget and ports it to a default slot which works with the `$$for` as a fundamental building block.
The iterable is required an must  be parsed an iterable or Object data type.  
Context expects an array of names to ve passed as context variables within the loop body.  

Hexax namespaces harbours the `hx-for` widget as `For`.
  
4. ***`<hx-if />`:***

Global NameSpace: `If`



5. ***`<hx-else-if />`:***

Global NameSpace: `ElseIf`

6. ***`<hx-else />`:***

Global NameSpace: `Else`

7. ***`<hx-animation />`:***

Global NameSpace: `Animation`

8. ***`<hx-transition />`:***

Global NameSpace: `Transition`

9. ***`<hx-stay-awake />`:***

Global NameSpace: `LiveWidget`

10. ***`<hx-markup />`:***

Global NameSpace: `Markup`

11. ***`<hx-await />`:***

Global NameSpace: `Await`

12. ***`<hx-send-frame />`:***

Global NameSpace: `SendFrame`

13. ***`<hx-extend />`:***

Global NameSpace: `Extend`

`#### **Utility functions API**

* `withDirectives()`:

Arguments: 
  - Attributes: `<Object>` Element's original attributes.
  - Directives: `<Array` An array value containing of objects with Directives properties.
      1. `name:<String>` Directive name.
      2. `modifiers:<Array>` Modifiers to be passed to the directive if any.
      3. `value:<Any>` Directive value   
Interface:
```javascript
function withDirectives( Attributes:<Object> , Directives: <Array> ) : <Object>

```

Details:
Helpers function that provides the use of directives within the hyperscript Interface while passing the initial node attributes as it's first parameter.

It accepts an array of directive objects.  
Contact the hyperscript directives usage guide for more information.

* `withModifiers()`:

Arguments:
  - Handler: `<Function>` Handler function.
  - Modifiers: `<Array>` An array of modifiers in string format.  
  Interface:
```javascript
  function withModifiers( Handler: <Function> ,  Modifiers : <Array> ) : <Function>
```
Details:  
Helpers function that provides the use of modifiers within the hyperscript Interface

* `dataRef()`:

Arguments:
  - DataValue: `<Any>` Data values to be sibcribed to and to a reactive data ref.  
  
  Interface:
```javascript
function dataRef( DataValue:<Any> ) : <Reactive__Ref_Object>
```
* `deferTick()`:

Arguments:
  - Callback: `<Function>` A callback function to be called after the next dom update circle is completed.
  - TimeOut:`<TimeOutInstance>` An optional timeout instance
Interface:
```javascript
function deferTick( Callback:<Function> , TimeOut:<TimeOutInstance> ) : <void>
```
Details:  
deferTick waits for the dom to rerender after mutating a model property before being called.  
For  example
```javascript
let { deferTick }=Hexax
let app={
  model(){
    this.count=34 
  }
  postMount(){
    this.count+=34;
    deferTick(()=>{
      //this callback  will wait till the about mutation is done with  it's dom rerendering before being triggered
    })
  }
}
```
* `html<BackTicks>`:

Arguments:
  - html: `<String>` Backtick based arguments generator.
  
Interface:
```javascript
function html<BacktickString> : <HexaxDomInstance>
```
* `AsyncWidget()`:

Arguments:  
  - Widget: `<Widget>` A widget to be rendered or turn asynchronous.  
This functionality can be achieved by setting the async setting to false in the `buildConfig` option.  
Interface:  
```javascript
function AsyncWidget( Widget:<Object>|<Class>|<Function> ) : <AsynchronousWidgetInstance>
```

* `defineWidget()`:

Arguments:  
  - Widget: `<Object>|<Class>|<Function>` A valid hexax widget instance  
  
Interface:
```javascript
function defineWidget(Widget:<Object>|<Class>|<Function> ) : <WidgetInstance>
```

Details:  
Used in resolving and  officialy defining a wodget

* `makeNativeElement()`:

Arguments:
  - Options: `<Object>` Valid widget options also used in building custom elements.
  
Interface:
```javascript
function makeNativeElement(Options:<Object>) : <CustomElementInstance>
```

Details:  
component used in defining custom elements.  
Accepts only an object parameter with options.

Contact the custom element guide for deeper guide.

* `VNode()`:

* `mapFor()`:

* `el()`:

Arguments: 
  1. `<String>|<HexaxDomInstance>` >>required
  2. `<Object>|<Array>`
  3. `<Object>|<Array>`
  


* `initBuild()`:

Arguments :
  





* `initSSRBuild()`:

* `ref()`:

* `initAsyncBuild()`

* `defineElement()`:
* 
* `markup()`

* `extend()`

* `$scarfold()`

* `renderSlots()`

* `$expose()`


* `postBuild()`

Arguments:
  - `<Function>` a callback function  
Interface:  
```javascript
  function postBuild(Callback:<Function>) <Null>
```
Details:   
A macro used in entailing the postBuild LifeCycleHooks within the build function or a function widget.  
Accepts only a single parameter,a Callback method to be stalled as the postBuild hook.

* `postMount()`

Arguments:
  - `<Function>` a callback function  
Interface:  
```javascript
  function postMount(Callback:<Function>) <Null>
```
Details:   
A macro used in entailing the postMount LifeCycleHooks within the build function or a function widget.  
Accepts only a single parameter,a Callback method to be stalled as the postMount hook.

* `preMount()`

Arguments:
  - `<Function>` a callback function  
Interface:  
```javascript
  function preMount(Callback:<Function>) <Null>
```
Details:   
A macro used in entailing the preMount LifeCycleHooks within the build function or a function widget.  
Accepts only a single parameter,a Callback method to be stalled as the preMount hook.

* `postDestroy()`

Arguments:
  - `<Function>` a callback function  
Interface:  
```javascript
  function postDestroy(Callback:<Function>) <Null>
```
Details:   
A macro used in entailing the postDestroy LifeCycleHooks within the build function or a function widget.  
Accepts only a single parameter,a Callback method to be stalled as the postDestroy hook.

* `preDestroy()`

Arguments:
  - `<Function>` a callback function  
Interface:  
```javascript
  function preDestroy(Callback:<Function>) <Null>
```
Details:   
A macro used in entailing the preDestroy LifeCycleHooks within the build function or a function widget.  
Accepts only a single parameter,a Callback method to be stalled as the preDestroy hook.

* `preUpdate()`

Arguments:
  - `<Function>` a callback function  
Interface:  
```javascript
  function preUpdate(Callback:<Function>) <Null>
```
Details:   
A macro used in entailing the preUpdate LifeCycleHooks within the build function or a function widget.  
Accepts only a single parameter,a Callback method to be stalled as the preUpdate hook.

* `postUpdate()`

Arguments:
  - `<Function>` a callback function  
Interface:  
```javascript
  function postUpdate(Callback:<Function>) <Null>
```
Details:   
A macro used in entailing the postUpdate LifeCycleHooks within the build function or a function widget.  
Accepts only a single parameter,a Callback method to be stalled as the postUpdate hook.



#### **Directives API**

1. `$$ref`

Used to assign an in dom element or a widget instance to a model property.

2. `$$for`

iterable rendering dirextive.

3. `$$if`

4. `$$else-if`

5. `$$else`

6. `$$model`

7. `$$bind`

8. `$$on:<eventName>`

9. `$$text`

10. `$$slot`

11. `$$raw`

12. `$$html`

13. `$$scoped`

14. `$$hx`

15.  `$$transition`

16.  `$$animation`

#### **Widget options API**

1. ##### `template`

Type:`String`

Details :

Used as it's passed strings a markup in building the widget user interface.

Example :
```javascript
let app={
  template:`<div > 
    <button> Click me</button>
  </div>`
}
```
Recommends the use of Backticks for multline string literal for concise templating.

2. ##### `model`

Type : `Function` | `<Object>`

Details:

A method used in instanciating widget model datas. Props are assigned to the `this` keyword and are to be exposed to the widget and template scope as the Widget's model datas.

e.g.
```javascript
let app={
  model(){
    this.count=2
  },
  //Usage
  template:`<h1> {{ count }} is the count value </h1>`
}
```
All initial data instances are expected to be  define and exposed using the model method.

3. ##### `styleSheet`

Type : `String`

Details :

styleSheet options provides a complete scoped css styling power on a widget.

Accepts string value of css style blocks, using the multiline string literal. e.g.
```javascript
let app={
  styleSheet:`
    #btn{
      height:40hx;
      width:70%;
      border-radius:10hx;
    }
    .beautify{
      border-color:#179d97;
      color:lightblue;
      background-color:#0a3039
    }
  `,//Usage
  template:`<button id='btn' class='beautify' > Hexax button styleSheet Example</button>`
}
```
Using the styleSheet option activates style scoping to the widget markup by default, MeanWhile you can disable scope by prepending the  `@g` global style directive to an individual block.
```css
@g .beautify{
      border-color:#179d97;
      color:lightblue;
      background-color:#0a3039
    }
```
The beautify class  style will be applied globally, considering no scoping semantics.

4. ##### `handlers`

Type: `Object` | `<Function>`

Details:

An object that expects method/Function properties .
This are to be exposed to the widget scope as method leveraging and mutating reactive instances.

Usage Example
```javascript
let app ={
  model(){
    this.count=0//Reactive instances defines
  },
  handlers:{
    increment(){
      this.count+=1//mutated a Reactive instance through a handler method
    }
  },//This methods are exposed and can be uswd anywhere within the widget scopw
}
```

5. ##### `name`

Type: `String`

Details:

A naming option used to define a name for the widget, to be used  for  the widget when  no optional naming argument  is provided.

Useful expecially, during the resolving process of the widget and helps Hexax in being more specific during debuging and error handlin.

6. ##### `styleClass`

Type: `Object` | `<Object>`

Details:

An Object that requires object properties  as options.

Used  in defining raw javascript powered css properties to be manually injected into the dom, expecially when using the build, with  hyperscript.
e.g.
```javascript
let app={
  styleClass:{
    headStyle:{
      borderWeight:'15hx',
      backgroundColor:'#0a3039'
    }
  },//Usage
  template:`
  <h1 *style=$styles.headStyle > Hexax Explorer</h1>
  `
}
```
Available as `this.$styles.headStyle` within the widget scope.

7. ##### `observers`

Type: `Object` | `<Function>`

Details:

Used to to define methods that should watch reactive properties when they were mutated.

The methods names must match a model exposed property. Deep/nexted objects properties are accepted.
Here is how to...
```javascript
let app={
  model(){
    this.count=dataRef(0),
    this.message="Welcome to Hexax JS"
  },
  observers:{
    count(){
      //This get's called when the count property got mutated
    },
    message(){
      
    }
  }
}
for watching of complex data , use the `this._observe` utility macro
```
To watch a nexted/deep property, or morethan one property of the same type at a time, use the  `this.observe` macro.

Contact the **Observers** documentation for detailed information.

8. ##### `params`

Type: `Object` | `<Object>`/`<Function>` OR `Array` | `<String>` 

Details:

Used in defining parameters for a child widget, as in `props` in other frameworks.

A params option can accept an object with other object values of parameters properties consisting of validation props or a javascript global type Function. For example...
```javascript
let app={
  params:{
    seeds:{
      type:Object,//this option is required
      required:true
    },//If only the type prop is available, you can just pass the prop a Function type for validation without an object
    name:String
  },//
}
```
This params, will be received as speciall attributes from a parent widget.

Contact the `params` guide for more details.

9. ##### `widgets`

Type: `Object` | `<Object>`/`Class`/`Function`

Details:

An object used in registering widgets that are to be used within the local widget native template. e.g.
```javascript
let app={
  widgets:{
    HeaderWidget:{
      template:`<h1> Hexax Explorer</h1>`
    }
  },//Usage in template
  template:`
  <HeaderWidget />
  `
}
```
Accepts all widget dataTypes.

Contact the widget registration guide for more details.

##### **LifeCycleHooks **

10. ##### `postMount`

Type: `Function`

Details:

An function/method, that is to be called asynchronously, when a widget mounting process has been completed.
```javascript
let app={
  postMount(){
    //The this scope exposed here
  }
}
```
Do not use an arrow function for this option.

11. ##### `postUpdate`

Type: `Function`

Details:

An function/method, that is to be called asynchronously, when a widget triggers an update on the widget inDom object, when a reactive property got mutated. 
```javascript
let app={
  postUpdate(){
    //The this scope exposed here
  }
}
```
Do not use an arrow function for this option.

12. ##### `preBuild`

Type: `Function`

Details:

An function/method, that is to be called synchronously, before a widget  building process is initialized, and before  the rective datas a compiled.

Only the `$attrs` and `$slots`  are exposed to the methos scope.
```javascript
let app={
  preBuild(){
    //only the 'thia.$attrs' and 'this.$slors' are exposed from within the this  keyword.
  }
}
```
Do not use an arrow function for this option.

13. ##### `postBuild`

Type: `Function`

Details:

An function/method, that is to be called synchronously after building the widget and initializing model properties and before the widget mounting process is started.
```javascript
let app={
  postBuild(){
    //The this scope exposed here
  }
}
```
Do not use an arrow function for this option.

14. ##### `preUpdate`

Type: `Function`

Details:

An function/method, that is to be called asynchronously, before a  reactive  Dom update is  triggered.
```javascript
let app={
  preUpdate(){
    //The this scope exposed here
  }
}
```
Do not use an arrow function for this option.

15. ##### `preDestroy`

Type: `Function`

Details:

An function/method, that is to be called asynchronously, before a widget  instance is destroyed, and removed from the Dom.
```javascript
let app={
  preDestroy(){
    //The this scope exposed here
  }
}
```
Do not use an arrow function for this option.

16. ##### `postDestroy`

Type: `Function`

Details:

An function/method, that is to be called asynchronously, after  a  widget instance has been destroyed and removed from the dom.
```javascript
let app={
  postDestroy(){
    //The this scope exposed here
  }
}
```
Do not use an arrow function for this option.

17. ##### `build`

Type: `Function` | `<HexaxDomInstance>`

Details:

An function/method, that us used to encapsulate  the widget UI system.

Should return a `HexaxDomInstance`  either  through the  hyperscript method,  or using the `hexax.html` util.

Specialy provided for users coming from hyperscript background.
e.g
```javascript
let app={
  build(params, { slots, signals , attrs, utils }){
    //The this scope exposed here
    return el('h1', "Hexax Explorer")
  }
}
```
parameters provided are the params and the context data properties.
Do not use an arrow function for this option.

Contact the build Function guide for more information.

18. ##### `directives`

Type: `Object` | `<Object>`/`<Function>`

Details:

An Object option used to register custom directives.
```javascript
let app={
  directives:{
    MyDir:{
      created(element, value, modifiers){
        //Directive created hook statement
      },
    },
    autoFocus(element){
      element.focus()
    }
  }, //Usage  of custom directives in templates
  template:`
  <p  $$MyDir='true' > Hexax Explorer</p>
  <input $$autoFocus >
  `
}
```
Contact the Custom directives guide for mote details.

19. ##### `buildConfig`

Type: `Object` |  `<Any>`

Details:

An object type option, used in defining the local widget's configuration  setup.

properties  to be paased must be a valid widget's configuration setting option.
```javascript
let app={
  buildConfig:{
    debug:false,
    forwardSlot:false
  }
}
```
Contact the `Config` API documentation for more information on `buildConfig` options use cases.

#### **`build.config`  settings API**

- `debug`

Type: `Boolean` | default: `false`

Details:  
Used to silence all error and debug warns within an individual widget.  
Every Hexax generated error will fall silently if set to a falsy value with exceptions of errors generated from macros utilities in build function and through hyperscript.

- `forwardAttrs`

Type: `Boolean` | default: `true`

Details:  
This option is used to toggle attribute inheritance when a widget has only a single root element.  
When an element has only one  root  html element, hexax will try parsing down the attributes received from the consumer that does not match with params to the element by default.  

This functionality can be disabled by setting the `forwardAttrs` option to `false`

- `forwardSlot`

Type: `Boolean` | default: `true`

Details:  
When a widget has a single root element with no `innerHtml` content, hexax will try parsing any children elememt/default slots received from the consumer as it's `innerHtml` content by default.  

This behavior can be stoped by setting the `forwardSlot` option to `false`.

- `fallThrogh` `<Deprecated>`

> `This functionality is Deprecated and may be removed in future updates`

Type: `Object` | `<String>`

Details:  
Hexax allows passing of model data props in a reversed manner , from a child widget to it's scope within the consumer parent's widget using the `fallThrogh` option.  

Contact the slot guide for more Details.

- `inheritStyleClass`

Type: `Boolean` | default: `true`

Details:  
Boolean option used to disable the passing of styleClass properties on a widget root elememt whem it has only a single root node.

- `delimiters`

Type: `Array` | `<String>`  

default: `["{{", "}}"]`

Details:  
Hexax allows the recomfiguration and customization  of the tempalate mustache tag using the delimiters options .  
Accepts an array of two characters values string. e.g.
```javascript
let app={
  model(){
    this.text="Hexax Explorer"
  },
  buildConfig:{
    delimiters:['[[', ']]'],//Usage
  },
  tempalate:`<h2> This is [[ %safe >> text ]]</h2>`
}
```

- `async`

Type: `<Boolean>`

default: `false`

Details:  
To build a widget asynchronously, this option  can be turn true.  
This functionality can be achieved by utilizing the `AsyncWidget` macro.

### **Best Practices**

As you dive deeper into hexax, consider adopting best practices to ensure clean and maintainable code. Here are some recommendations:

- **Modular Components:** Break down your UI into small, reusable components.
- **Effective Naming:** Use clear and meaningful names for model properties, widgets, block helpers, directives, plugins, agents, and handlers.
- **Reactive Data Usage:** Leverage reactive data for efficient UI updates.
- **Observer Methods:** Use observer methods for data changes that require specific customized reactions.

### **Conclusion**
Congratulations! You've learned the basics of using Hexax to empower your creativity and build of web apps with speed. You now know how to define widgets, use template strings, handle methods and reactive data, bind attributes, customize and apply directives, and render your UI widgets.

Additionally, you've explored advanced features like params, custom elements, observers, template blocks helpers, plugins, slots, agents and some useful configuration options.

Hexax offers a powerful and flexible framework for developing dynamic and interactive web applications. Remember to consult the official Hexax documentation and explore the additional resources for more in-depth information and examples.

## **Additional Resources**
To further expand your knowledge and explore more advanced features of Hexax, check out the following resources:

Official Hexax Documentation: https://hexax-docs.com
Hexax GitHub Repository: https://github.com/hexaxsoftwares/hexaxjs
Hexax Community Forum: https://community.hexax.com
These resources provide comprehensive documentation, examples, and a supportive community to help you make the most of Hexax in your projects. Happy coding!.
