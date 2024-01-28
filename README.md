## PixelJs
### Pixel : Empowering Creativity, Building with Speed

### Welcome to PixelJs documentation



Pixel empowers creativity, speedy development while Building web apps.


### 1. Introduction

Pixel is a JavaScript framework designed to enhance creativity and speed in building web applications. It provides a flexible and intuitive way to creating interactive user interfaces using a declarative syntax. 

Pixel is a framework where creativity meets efficiency.

This guide isn't just about syntax and functions; it's a journey into a mindset that unleashes your creative potential and accelerates your web development skills.

Pixel leverages reactive data and efficient rendering to delivering high-performance applications.

This guide will take you through a detailed journey, covering installation, basic concepts, advanced features, and practical examples.

Whether you're a newcomer to web development or seeking to expand your skills, PixelJs serves as your guide to building interactive and dynamic web applications.

Let's dive in!

### 2. **Getting Started : installation and setting up your Pixel playground**

Before delving into the intricacies, let's establish our PixelJs playground. A basic understanding of HTML, CSS, and JavaScript is essential. If you're new to programming, take a moment to acquaint yourself with these fundamentals.

### **Installation Proccess:**

Pixel is a dependency-free, browser-oriented javascript library. This means that using it is as simple as adding a `<script>` tag to your document head. No need for complicated build steps.

You can simply load Pixel by just including the following script tag in your main HTML file head tag and get going:

****html****
```html
<script src="https://cdn.jsdelivr.net/gh/prince9216/PixelJs@main/pixel.global.dev.js"></script>
```

Some discreet developers might prefer loading and hosting pixel locally in production.

Then you can simply download the file from the jsdelivr Link, copy it to your project directory, and link to it from your html head file .

```html 
<script src='path/to/pixel.global.js'></script>
```

Once installed, PixelJs becomes your creative companion.

## **Understanding PixelJs**

Once PixelJs is included in your project, the global namespace **Pixel** will be exposed and available within your script scope. You can start using it by de-structuring the necessary components from the global Pixel Object. Here's how to:

```javascript
  const { initBuild, Template, data, H, NodeMake, ref } = Pixel;
  ```
  
The above methods and components are all made available to the scope.
  
### **Widgets and model instances**
  
Pixel widgets are independent entities encapsulating UI components. A widget has its state, structure, and behavior.

Model instances define stateful data for widgets, making them reactive.
Every Pixel widget Manages it's own state.

This can be confusing at the moment , but don't bother, this documentation is designed for both beginners and experienced developers alike.

A Pixel widget can be an object, a class or a function. 
Pixel supports the use of both dataTypes as valid widgets, but we are going to use the object widgets throughout the example in this documentation as we recommends the use of object type widget when writing widgets in pixel.

Let's create your inaugural PixelJs widget. Envision a widget as the fundamental building block of your web application.


```javascript
const { Template }= Pixel// using the browser JIT compiler, we destructure our tools from the global Pixel Object
let app={
    model(){
    
        return {
            greeting: "Hello Pixel"
        }
    },
    build(){
      
        return Template` <h1>{{ greeting }}</h1>`
    }
})
//this is a valid pixel widget
```

In the example code above, we passed in an object containing widget options that makes up our widget build.

lets go through the options above.

1. The ***model*** option: Requires to be a method/function. and must return an Object 

The model option is used to define statefull datas.
The model returned object values  are esposed to the widget instance and can be used in bulding and encapsulating the widget state management process.

This data defined and exposed in model are  converted proxy datas and are made reactive.

This simply means that the widget UI gets updated whenever any of the properties of the widget model returned object values are mutated .

2. The ***build*** option: A method function that masterminds the normalization of your widget UI hydration.

The build function runs only once throughout the life of a widget, and uses its returned value to build the widget UI in pixel.

if the build method returns a string,it will be passed and compiled as a textNode.

The build function must return a render function in form of an arrow function or an instance of the ***Pixel.Template*** function.

You can return an instance of ***Pixel.Template*** with a Parameter of javascript multline string literal, if you prefer the native way of building your ui.

The ***Template*** function is a pixel built in utility function used in parsing the DomStrings html markup to the Build method, you can optional return the Template instance directly without returning a render function.

In the previous example, we've crafted a simple widget that conveys a greeting message. The `model` function establishes the widget's initial data store, and the `build` function defines the UI structure using the `Pixel.Template ` function.

The widget gets updated whenever the model returned properties changes or got mutated.

A render function is required when building your UI using the `H` hyperscript function
 
Here is an example of using the `H` component by returning a render function in the build function instead of the `Pixel.Template` function.

```javascript
const { H } = Pixel//destructured from the global Pixel object
let app={
  
  build(){
    return ()=>H('h1', 'My heading');
  }
}
```
MeanWhile, while returning a render function, an  arrow function is recommended.

Another optional native and simple way of encapsulating your ui is by using the template option, which is parsed string of html markup texts.  e.g

```javascript
let app={
  
    template:`
        <!--your html template strings -->
    `
}
```
The template option will be ignored if the build function is present even if it does'nt return an UI instance.

We will continue this documentation using the template option throughout our examples.

### **Widgets as Art, Initial Entry point.**

In PixelJs, you're not just building widgets; you're crafting art. Each widget is like a brushstroke, contributing to the canvas of your application. Think about the composition, the flow, and the visual poetry you create through your widgets.

When building with pixel, there must be an entry point for your app build. This is a fundamental concept.

The `Pixel.initBuild` component is used to create an initial entry point widget, other child widgets can be passed here as components, pages or building blocks to the webpage.

You can then use the Pixel inbuilt routing framework to create a navigation through pages.

The initBuild method is passed a widget as its first Parameter.
This is an initial entrypoint of the app, we will learn how to use other widgets as child widgets.

Study the code below.
```javascript
const { initBuild } = Pixel;
let build = initBuild({
  model() {
    return {
      count: 0
    };
  },
  template:`<button>The count is {{ count }}</button>` // Craft your visual poetry!
});

build.mount(/*root element instance or selector*/);
```
An initBuild instances expects to be mounted , you ll ve to use the `build.mount` prototype method of the `initBuild()` to inject the widget ui into the dom.

There should be a root dom node in the html dom, where an initBuild instance would be mounted. The mount method is passed a seloctor or an instance of a dom node as a parameter.

The innerHtml of the mount Node target will be used as a fallback widget template if the build and the template options are both not provided or both returns no valid dom instance.

***Note:*** The in Dom template parsing caveat will be implemented since pixel won't be able to take the responsibility of processing the innerHtml content before resolving.

```javascript
  build.mount(/*selector*/)
```
Your widget template will be injected into the selected dom element, clearing all inner content of the selected element

***Note:*** More than one `initBuild` instance cannot be mounted into the same inDom Node.

### **Template Syntax**

Pixel provides you an efficient way of encapsulating templates logic into your Pixel template without using the default javascript multline string interpolation system.

You can iterpolate state instances into the template by using the double curly braces, `{{ count }}`. 

Data values exposed through the model option can directly be referenced from inside the mustache tags expression text.

e.g.
```javascript
let app={
  model(){
    return {
      message:"Pixel Explorer"
    }
  },
  template:`<h1>This is the {{ message }} message</h1>`
}
```

`{{` and `}}` is the opening and closing tag.
This are the default settings. Any text within this tags will be parsed as javascript expression with the state instances in scope.

This mustache tags can only accepts single expressions,parsing multiple statements will raise a Pixel template Error.

During template compilation, calling of a function that does not return a primitive value, will return an empty string or 'undefined' in some cases since we target in Dom text interpolation.
e.g.

`{{ func() }}` or tenary operations e.g , `{{ count ? count : 0 }}` are all  valid template interpolation in pixel provided it does'nt consist of more than a single expression or other unsupported construct like variable declaration.

Many javascript keyword will not be accepted if found within the template tags.

Here are the regex pattern of pixel unsupported template tag expression.
```javascript
 /(?:\.\.|\/\/|\/\*|\*\*|\[=|==\+|-\+|\+=|\-=|\*=|\/=|%=\*\*=|&&=|\|\|=|<=|>=|\breturn\b|\bthrow\b|\bfunction\b|\bnew\b|\btypeof\b|\bdelete\b|\binstanceof\b|\bvoid\b|\bnull\b|\bundefined\b|\bconst\b|\blet\b|\bvar\bclass\b)/;

```

This construct cannot be used within these tag or attribute Binding

To customize these mustaches tags, you will ve to setup a widget configuration option known as the  `buildConfig`  in your  widget which is an object of widget configuration settings. 
Then you parse in an option `delimiters` with an array value of two datas consisting of two string values,  an opening and closing tags. 

e.g
```javascript
export default{
    buildConfig:{
        delimiters:['[['/*the opening tag*/,']]'/*the closing tag*/]
    }
}

```

The values will be used in interpolating template strings instead of the default curly brace patterns within the present widget.

### **Building Blocks: Components Based Architecture**

PixelJs encourages a component-based architecture, allowing you to create modular and reusable UI elements. 

Let's create a simple header widget and compose it into a larger application structure:

```javascript
const { initBuild } = Pixel;

// Component
let header = {
  model() {
    return {
      title: 'Pixel World',
    };
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
    Header:header
  }
});

app.mount(/*root element instance or selector*/);
```

Here, we've created a simple header widget (`header`) and seamlessly integrated it into a larger application structure (`build`). Widgets enhance the modularity and manageability of your application.

This means widgets can be nexted down the thread as much as you wish, by composing a widget into another that is composed into a larger Component.

Before a widget can be used in another widget as a tag , it must be registered in the `widgets` object option.

***Note:*** During widget registration, be sure it followed the pixel widget naming rules. 
Must not conflict with any built in pixel widgets, must contain atleast one of these characters .

 1. Should contain a hyphen (-),
 2. An underscore (_), 
 3. A number or
 4. An uppercase letter.
 
###### **Usuported Widget naming construct**
 1. Must not contain  html own tag  characters ( < , > )

If it posseses none of this requirments, pixel will raise a ***Widget registration Warn***.

### **Handlers**
Pixel provide an intuitive way of defining stateful method Handlers.

Handlers helps you perfornm stateful logic or functions  on state datas.

To define  methods on your widget, define a handlers object option in the widget options.

for example...

```javascript
let app={
  model(){
    return {
      count:0
    }
  },
  handlers:{
    increment(){
      this.count++
    }
  },
  template:`
<button on:click='increment'>Clicked me {{ count }} times</button>`
}
```
Example using hyperscript.
```javascript
const { H ) = Pixel
let app={
  model(){
    return {
      count:0
    }
  },
  handlers:{
    increment(){
      this.count++
    }
  },
  build(){
    return ()=>H('button', { onClick:this.increment }, 'Clicked me' + this.count + 'times' )
  }
}
```

Handlers defined here are automatically exposed to the template instances directly and can be accessed within both the template and attribute scope like in the examples above.

For calling a handler, pixel provides you with the `on:handler` event caller, or the `@handler` shortcut pattern.

Pixel supports all non depreciated event calls through the `on:xxx` or `@xxx` event  triggering directives.

You can also parse modifiers to your handlers when been called. They are to be separated using pipes character after the eventName

e.g.
`<button on:click|once='increment' />`

Modifiers can be chained 

`<button on:click|once|stop|trusted='increment' />`

For passing modifiers to handlers when using a hyperscript powered UI, you needs the `withModifiers` macro .
```javascript
const { H, withModifiers }=
let app={
  model(){
    return {
      count:0
    }
  },
  handlers:{
    increment(){
      this.count++
    }
  },
  build(){
    return ()=>H('button', { onClick:withModifiers(this.increment, ['Prevent', 'trusted', 'nonpassive']) }, 'Clicked me' + this.count + 'times' )
  }
```
Accepts a first argument of the handler, and an array of modifiers strings names.

Here are Pixel supported event modifiers

1. **once:** Prevents the handler from being called more than once.
2. **capture:** Sets the capture modifier to true.
3. **trusted:** Checks if the `Node.isTrusted` is `truthy`
4. **prevent:** Calls the `event.preventDefault` on the handler.
5. **stop:** Calls the `event.stopPropagation` on the handler.
6. **self:** Checks if the present node is the same node with the target node.
7. **passive:** Sets the passive modifier to true
8. **nonpassive:** Explicitly sets the passive modifier to false.

Explore their usage to perform logic on state data:

### **Reacting to Changes: Crafting Dynamic Reactive mentality**

In the world of PixelJs, think of your application as a living, breathing entity. The reactive nature of PixelJs means your UI responds dynamically to changes in data.

Embrace this reactivity – it's not just a feature; it's a mindset. Your UI evolves as your data evolves.

PixelJs excels at reactivity making it easier in building dynamic widgets.

Let's create a button that increments a counter each time it's clicked:
Notice how the button counter displays responds to the user interaction

```javascript
const { Template } = Pixel;

let app= {
  model() {
    
    return {
      count: 0,
    };
  },
  template:`
      <button on:click='increment'>
        Clicked {{ count }} times
      </button>` ,
  handlers: {
    
    increment() {
      this.count++;
    },
  },
});

```

Now, a button increments a counter with every click by calling the `increment` method from the handlers. Notice how changes in the data (`count`) automatically update the UI.

This reactivity system may not be effective when a data been mutated is accesed from an object based dataType like a Set, Map, Array, or a plain object.

Utilize the `Pixel.data` macro for reactive object dataTypes reactivity hydration:
Its returned datas are exposed to the template instances directly as `<propName\>.$data`.

here is a minimal example

```javascript
const { data }=Pixel
let widget={
    model(){
    //initialized widget instances
        let obj=data({
          message:"Exploring Pixel",
          count:0
        })
        //expose it to the template
        return { 
          obj ,
          num:data(34)
        }
    },
    build(){
    //accessed in the widget through the ***this*** keyword
        this.obj.$data.count+=70
    //to access them in template, it ll be esposed as $data.count, this datas object are reactive data
      return Template`
      <h1>{{ obj.$data.message}}</h1>
      <p >{{ obj.$data.count }}</p>
      <h5> {{ num.$data}}</h5>
      `
    }
}
```
By utilizing the `data` macro, this helps us handle dependency tracking for nexted and deep data properties;

### **Pixel UI Symphony: Templating as Expressions**

PixelJs templates are more than just HTML with placeholders. They are expressions of intent, a language to communicate with your UI.

View your templates as a dialogue with your application – a conversation that shapes the user experience.


PixelJs introduces a powerful templating language for expressing UI elements. Let's explore the templating features with an example:

```javascript
const { Template } = Pixel;

let app ={
  model() {
    return {
      name: 'Pixel Explorer',
    };
  },
  template:`
      <div>
        <h1>Welcome, {{ name }}</h1>
        <input px:model='name' placeholder='Type your name'>
      </div>`
  ,
};

```

Example using the hyperscript powered UI  , you will need the `withDirectives` macro to use the `px:model` directive.
```javascript
const { H, withDirectives }=Pixel
let app={
  model(){
    return {
      name:"Pixel Explorer"
    }
  },
  build(){
    return ()=> H('div', 
      [
        H('h1', 'Welcome, '+ this.name ),
        H("input", withDirectives({ placeholder : "Type your name"},
          [{ name:"model", propName:"name", modifiers:[] } , ]),   )
      ]
      )
  }
```
The `withDirectives` macro takes the elements normal attributes as its first argument, then an array containing objects of directives options.
Which are the directive name, state based propName and an array of modifiers. 

Can accept as many directives as possible.

In this example, an input field dynamically updates the `name` text based on user input. The `px:model` directive establishes a two-way binding between the input and the data.

PixelJs templates provide a concise and expressive way to define UI logic.

Confused of what directives are , we ll learn of that soon.

##### **Pixel Template parsing caveat**

In pixel, dom templates is made to be an essential made easy for all , especially for people who comes from native html background.

Tags can be immediately closed if they expects no children nodes , this helps you omit a closing tag for html elements that Requires a closing tag.
```html
<element attr='value' />
```

If this is an element that Requires a closing tag, if you omit the immediately closing Syntax like , `<element attr-value >` or not including a closing tag, pixel will include all nodes following it as its children.

for example...
```html
<p > 
Hello Pixel
<input>
```

In the above code, Both the `Hello Pixel` text and the input element are all child nodes of th p element since the `p` element Requires a closing tag and none  was provided.

The immediate closing syntax, `<p />` helps close  the element without a closing tag.

In terms of void elements, like input, br, img etc , they can be rendered without being immediately closed or a closing tag.

When parsing attributes, attributes names and value cases sensitivity are maintained.

If an attribute value does not contain a space or special characters that may conflict with html tags like the `<>`,or confuse the pixel attribute passing caveat,  you can pass them without quoting them.

e.g.
`<element attr=my Value />` ×Bad

the `Value` text path will be compiled as a different attribute. It should be quoted if they belong to a single attribute property.

For example `<element attr=myValue />` works perfectly fine, Pixel accepts non cased attributes values once they follow the Pixel attributes passing mechanism.

Also when your attribute name matches your attribute value text, you can just pass the attribute while omiting the value part. 
This works like the native javascript objects option mapping.

For example `<element *name=name />` can just be written as `<element *name />` or using the `px:` binding directive, `<element px:name />`  or  even without the binding semantics `<element  name />`

This also works in directives cases.
e.g.
```javascript
let app={
  model(){
    return {
      text:'Pixel Explorer'
    }
  },
  template:` <h1 px:text /> `
}
```
In the above example code, `text` will be mapped as the value of the `px:text` directive.

### **Attributes Data binding : Connecting your UI system**

To bind an attribute value from a widget instance data, use the single asterisks ***`*`*** data binding mechanism. 

`*attr=data` is a shorthand way of binding data Attributes to the official `px:attr=data` .

The `px:` data binding  directive is the official method, but we ll continue with the use of the asterisks method throughout the rest of this documentation as it's shorter and easier to reason about.

For example, `*class='color'` will bind the class attribute to the value of `color` expression, meaning that the text value, `color` will be evaluated as a javascript expression with the model state instances in scope.

Same rules implies as in template mustache tags. Once an attribute name is preceded with an asterisks, its value will be treated as a javascript expression.

Data binding in PixelJs is not just connecting variables; it's orchestrating a symphony of interactions. 

Envision your UI elements harmonizing with the underlying data. Your application is a symphony where each note resonates with a data point.

e.g
```javascript
let app={
  model(){
    return { 
      color:data('bg-info'),
      name: ' myParagraph'
    }
  },
  // ...
  template:`
    <p *class='color.$data + name'>Hello, Pixel!</p>`;
  ,
};
```

This example binds the `class` attribute to the value of `color` concentenated with the name property.

#### **Dynamic Attribute Names and Values**

Use square brackets `[]` to specify dynamic attribute names or values. You can aswell Dynamically reference properties from widget data instances:

Attribute binding concept implies as the attribute must be proceded by the asterisks 

Watch the example...

 ```javascript
 const { data }=Pixel
let app={
  model(){
    return {
      name:'class',
      value:data('bg-dark')
    }
  },
  // ...
  template:`<p *[name]='value.$data'>Dynamic Attribute</p>`;
  ,
};
```
Appending the asterisks helps pixel decide when to bind a data property to a widget state data.

### **Pixel directives**

Pixel provides directives that allow you to conditionally display elements, bind reactive datas to an input element during compilation, reference an element or skip the compilation of an element's children.

Directive is a special attribute used in manipulating a node or widget before, during or after compilation.

Pixel directives are not just instructions; they are artistic attributes guiding the flow of your application or widget build. See `px:if` as a creative decision, `px:for` as a rhythmic pattern, and `px:data` as a dynamic palette.

Here are some commonly used directives:

##### px:skip 
To skip the compilation of an elements children and innerContent, use the `px:skip` attribute. 

compilation of all children of the element will be skipped while building this element.

The `px:skip` directive does not need to be passed a value, it presence on an element is considered and defaults to truthy, considers only boolean values, other values are ignored and falls back to `true`. 

Scopes to html elements nodes only.
Will raise a `Pixel Directives warn:` if used  on a pixel widget since it's only an element based directive.

#### **Conditional rendering**

To render elements/widget based on some evaluated result of an expression or value, Pixel provides you with some useful condition based directives.

##### px:if

```javascript
let app={
  template:`<button px:if='false'></button>`
  
}
```

this element will not render since the condition render result is falsy

##### px:else-if

Checks if the previous element/widget  has a `px:if`/`px:else-if` directive, if not found, will raise an Exception.

The `px:else-if` directive ,if available on the next element or widget following a `px:if` or other `px:else-if` element/widget , will be processed if, the `px:if`, or previous `px:else-if ` if any, evaluates to false
Inoder to make it effective, should be passed to the next element or widget after the previous relative conditioned element/widget 

If unable  to find a relative conditional directive on the previous element/widget, will raise a pixel conditional Directive Error.

##### px:else
The `px:else` directive , displays its element if the previous `px:if` or `px:else-if` , if any, statements are falsy

Its always a gotcha to pass a px:if alongsode the px:for ditective, if possible, avoid px:if with px:for.

#### List rendering

##### px:for
list rendering helps you render a widget or an element, from an iterable value , the resulting value will be available on the element, or widget rendering scope.

To achieve this , pixel provides you with the `px:for` directive.

here is a minimal example on using 'px:for' directive.
```javascript
let app={

  template:` <MyWidget px:for='item of $data.Packages' *data='item'> This is {{ item }} </MyWidget>`
}
```

`px:for `encapsulates element datas, and creates the relative data based on the evaluasted loop data, then passes the positional arguments to the element/widget context.

It also follows the common javascript  forloop structure.

###### Accepted constructs

`item in obj`,

`[ key, value ] of iterable`,

`[ value ] in iterable`,

`[ index, count ] of numberVal`,

`count in 5`,

`3`,

`[ count ] in 5`

`iterableValueRef`


The `px:for` directive can iterate over any iterable  object or number value type.

Both a parenthesis `()`,  block brackets `[]`, curly bracket `{}` can all be used in enclosing the key value pairs.

It's recommended to use the `for...of` when iterating through an object over the `for...in` iterator protocol except when iterating over a none object data type, e.g A number.

Like in `[ text ] in arrayData `.

The `for...in` iterator attimes may produce unexpected result when used on an object data type expecially in cases where key/value pairs is required.

We  do not recommend the use of key value paires in `for...in` loops, since the value of the value path  reference will remain "undefined";

From the JavaScript official documentation, it's quoted 

`Many JavaScript style guides and linters recommend against the use of 'for...in', because it iterates over the entire prototype chain which is rarely what one wants, and may be a confusion with the more widely-used "for...of" . `

Both the `for...of` and `for...in` can be used interchangeably.

It's included in Pixel's support for completeness.`

If a single reference is passed, it references the value data. If the iterated data is a Number, it will reference the number count.

In be enclosed within bracked or not.

For example...

`value of iterable` works aswell as 

`[ value ] of iterable`

In cases where key/value pairs are required, then the enclosing brackets are required.
Here if `for...in` is used, the second value might be of `undefined`.

An iterable or a number can just be passed without a looping format , like key or value mapping. The widget or element will be evaluated to the count of the iterable or number value.

e.g
```javascript
template:`<input px:for="iterable" >`
```

***Note:*** No  value of key or value is passed to the context, remember.

#### ***Artistic Directives***

##### px:model

Data instances defined and exposed from the model method option can be two way binded efficiently using the 'px:model' directive.
    e.g.
```javascript
const { Template } = Pixel

let app={
  model(){
    
    return {
      value:data("Pixel Explorer")
    }
  }
  template:`
    
    <input px:model='value.$data'>
    <h3> {{ value.$data}} </h3>
    `
}
```
By using the `px:model` directive, the input element is now bound to and from the value state data, which means, the input is been populated with the data from the value property, any update to the input will aswell update the value property, hereby triggering a state rerendering.

Scoped to Input, Textarea and option elements only.

##### px:data

Accessing a node object from inside a widget and touch-manipulation on dom objects is achieved using the 'px:data' directive.

`px:data` is used to reference in template variables.
```javascript
const { Template } = Pixel

let app={
  model(){
    
    return {
      value:""
    }
  }
  template:`
    
    <input px:data=value >
    `,
  handlers:{
    doSomething(){
      this.value//will now be populated with the instance of the input element
    }
  }
}

```
Value of `value` will be populated with the element or widget instance if passed to a widget tag.

##### px:text

Injecting an innerText content into a Dom Node is achieved using the `px:text` directive.

This directive uses the `element.innerText` method to populate an element's innerText with the provided string value.

This is how to...

```javascript
const { Template } = Pixel

let app={
  model(){
    
    return {
      text:"Pixel Explorer"
    }
  }
  template:`
    
    <p px:text=text > </p>
    `,
}
```

The innerText of this paragraph will be resolved to the value of the `text` property.

##### px:html

Same as `px:text` only used in inserting innerHtml into an element.

##### px:bind

Used in binding reactive data instance, a replacement for the asterisks binding.

Contact  the Pixel builtin directives API for more about Pixel directives.

PixelJs also provide way to build Custom directives on both widget and html elements


### **Display rendering**

PixelJs offers flexibility in rendering your UI widgets.

You have two options for rendering your UI widgets: using template strings or the `H` Hyperscript function.

Choose the rendering option that best suits your coding style and project requirements.

#### **Native html templating system**

Define your UI structure directly using template strings. Widgets has to be Registered through the `widgets` option for accessibility:

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

The `H` function is a hyperscript function for creating virtual DOM nodes, offering a programmatic approach to widget definition:

Choose the rendering option that best suits your coding style and project requirements.

It takes the element name or a widget instance as the first argument, followed by attributes and children. Children can be plain texts, or other H objects, 

The `H` function can only be used or returned with a render function from the build function

Here is an example using the H module
``` javascript
let app={
  build(){
    return ()=>H('p', { class:'name '}, /*more children like texts or more H objects */   H('input'))
  }
}
```
H macro can accept as many child `H` instances as possible.

```javascript
let app={
  // ...
  build() {
    return ()=>H('div', [
      H('p','Header'),
      H('input', { type: 'text' }),
    ]);
  },
};
```
For multiple root Nodes, you can wrap them in square bracket
`return ()=>[H('p', 'Header'), H('input')]`

the first argument is required and  must be a string value of an valid html/svg tag name, an unresolved NodeMake instance or an instance of a widget, other two arguments  can be dynamicaly passed as children `H` nodes or attributes. 

Accepts only three arguments, whereas 2nd and 3rd arguments can be passed dynamicaly,  if there are no need for any, it absence does not matter as there is no contextual defined position for any of the both, unlike other frameworks where you have to pass a positional arguments or null.

```javascript
import MyWidget from 'widgets/pages.js'
let app= {
  
  build() {
    return ()=>H('div',
      H('p', 'Header'),
      H('input', { type: 'text' }),
      H(MyWidget)
    );
  },
};
```

Widgets do not need to be registered before been used, they only need to be in scope.

### **Advanced Usage**

In addition to the basics, Pixel offers some advanced features that can enhance your development experience.

### **Params**
You can pass Parameters  to your widgets to make them more dynamic and reusable. 

Params is a consistent way of passing state based datas from the parent down to the child widget

Define the params option in the widget's options object and access them in the template using $params.

validation can be a type function, or an object consisting of type , default, or required, and a validator method which returns a conditional boolean value

e.g

```javascript
let app={
  params:{
    color:String,//a String prototype functiob, which will be ised to chech against params datas
    validator(value){
      //a validator function, with a Parameter of the value
      if(!typeof value === "string") return false
      else return true;
    }
    seed:{
      type:Object,
      required:true,//required may not co-exist with the default option
      default:{}
    }
    name:{
      type:String,
      default:()=>'Prince'//default validation option may be passed a finction which returned the valie
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

Params will be exposed to the template instance as `$params` within the child widget

Validations will raise a Pixel Error or warn , if failed or when a validator function returns false.

Params can aswell be passed an array of params names strings, this is useful when there is no use case of validations e.g

`params:['color','seed']`

#####  ***Params validation options***

1. `required`
2. `validator`
3. `default`
4. `type`


##### ***Custom dataTypes prototyping***

Pixel supports the production of custom dataType using class Object.
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

Pixel allows you to create custom elements by using the NodeMake module. You can register your custom elements by calling node.resolve(). This is useful when you want to encapsulate complex functionality into reusable components.
for a custom element, use the Pixel.NodeMake macro, then pass in the name '<required>', props, templates '<required>', style and plugins  as an object options.

here is a minimal example on creating a pixel custom element
```javascript
let node=NodeMake({
    /* accepts props, template, style and plugins options */
})

```
To register the custome node  if you are using the string template, ` node.resolve()`

It will be available to use in your widget Template, globally, does not require registration.

If you tend to use it through the render Function, `H` macro, it must be availble , or imported into the namespace and passed as the first argument.

NodeMake also accepts the custom elements LifeCycleHooks
e.g.

***`onConnected, onDisconnected, onAdopted and onAttrsChanged`***

NodeMake props same as a widget params, with validations and inheritance for none props defined attributes, just differently named as props instead of params.

### **Slots: UI maintainability**

Slots provide a way to pass content to your child widget, from the parent widget. 

You can define slots in your widget's template using the <slot> tag. The passed content will be rendered in the slot tag as a default slot.

Slot tags with no name attribute, will specifically be rendered as a default slot, you can as well, specifically set a default slot by setting the name attribute to default.
```javascript
let app={
  // ...
  template:`
      <div>
        <h1>My widget heading</h1>
        <slot></slot>
      </div>
    `,
};
```
Slot tags can also be named or dynamically named using bind to model data properties.
e.g
```html
<slot name='header'/>
```

To parse slots contents for slots elements, Pixel provides you with the `px:slot` directive on elements/widgets.
e.g
```javascript
let app={
  template:`
        <Widget>
            <template px:slot='header'>
                <!--Slot contents goes here -->
            </template>
            <input>
        </Widget>
        `
}
```

#### **Pixel slots passing caveat**

Slots works same as in other frameworks that uses the slot system, with slight differences in pixel, 
If a child widget has only a single root element, Pixel will try to parse all default slots to its innerHtml if, there is no default slot provided, and it has no innerHtml content.

To disable this action, set the `inheritSlots` settings to false in your buildConfig settings option.

All widget instances of the parent, are available, within the child widget scope, but not the other way round.
but if need be to access a child widget's data within the scope it's defined in the parent, pixel provides you with the `fallThrogh` setting option in the child widget's buildConfig.

access to state instances are to be exposed directly, the `this` keyword would not be available in the scope,and so,  should be passed as a string format  e.g

```javascript
export default{
  buildConfig:{
    fallThrogh:{
      count:'$data.count',//direct access to widget instance datas as in the string interpolation system
      name:'$params.name',
      msg:messages//namespace variable
    }
  }
}

```
This will be exposed withing the scope of the child widget tag as `$fall[xxx]` or `this.$fall[xxx]` if using the hyperscript function. e.g
```html
    <Widget>
      <!-- fallThrogh attributes of this child widget will only be available within this scope of Widget instance as $fall-->
        <h1>{{ $fall.name }}</h1>
    </Widget>
```

Elements with no specified slot, will be rendered into the default slot, if provided.

Slot contents are merged , and replaces  the matching slot element on the child element.

### **The `Build` function**

The build function is the widget major building compilation engine.
The build function has access to some useful widget options data as parameters, through two arguments, `[params, context]` provided.

The params parameter is a reference to `this.$params` datas object while the context is aswell an object, with access to, styles, events, slots and attrs.

This is useful when utilizing the hyperscript pattern.
Here is an example
```javascript
export default{
    build(params, context){
        return //...
    }
}
```
This are also available within the this keyword put peovided here for simplicity.

The can be accessed with the ***$*** character appended to the `styles, events, slots and attrs` data instances. 
for example...
```javascript
const { log } = Pixel
let app={ 
  onMounted(){
    log(this.$styles)
    log(this.$slots)
  }
}

```
### **Widget type system**

Pixel also accepts a function and class as a widgets, but with slight edge  cases.

Function widget works as the scope of the build function, with no data state of it's own.
The `Pixel.Template` macro  is provided to help the functional widget  access  the pixel rich templating syntax.
Here is a simple pixel functional widget
```javascript
const { Template }=Pixel
function FW(){
  
  return Template`<p> Hello Pixel</p>`
}

```
Can be registered and used as other normal widgets.

The Pixel style guides recommends against the use of function widgets as an initBuild widget, inshort, function widget is only supported in pixel for completness.

Class widgets are perfect and statefull widget encapsulation, in short, it was used in building the pixel builtin widgets.

Pixel does not utilize the constructor function, like React  did, instead, pixel takes its defined method options as pixel options.

A pixel class widget must extend the base `Widget` class. 
e.g.
```javascript
const { Widget }= Pixel

class myCW extends Widget{
  constructor(){
    
  }
  model(){
    
    return {
      count:56
    }
  },
  template:`<button > {{ count }} </button>`
}
```

Pixel recommends the use of object widget for declarative syntax



#### **LifeCycleHooks**

  Pixel provides you with some us3full callback functions that run at some specific stage of the life of a widget.
    
##### beforeBuild: 
Runs before the widget instances are instanciated
    
##### onBuilt:
runs after all widget instances are instanciated and after running the build function and creating all widget instances.
    
##### beforeMount:
Runs before inserting the widget UI into the dom.
    
##### onMounted:
<Promise Based> Runs after inserting the widget UI build into the dom.
    
##### beforeUpdate: 
Runs before starting an update on any change on a statefull datas.
    
##### onUpdated:
<Promise Based> Runs after updating the dom of changes the reactive datas.
    
##### beforeDestroy: 
Runs before destroying the widget instances and unmounting from the dom.
    
##### onDestroyed: 
<Promise based> Runs after destroying all widget instances and unmounted from the dom
    
    
LifeCycleHooks has there `this` keyword bound to the widget state data.
    
### **Dynamic Widget**
    Widgets can be dynamicaly rendered, expecially, when resorting to in dom templates, 
    
    this can be achieved using the px-build buit in widget.
    
    it accepts one required property, **self** which can registered any registered widget instance.
    
    attributes or params for the widget pased to self, can be passed alongside the self params. children are passed as children to px-build
    
### **Data Observation**
  To perfom a data Observation within the widget instance datas, the 'observers' option can be used.
  
  Within the observe object option, pixel acceptd only  object, with names that references the widget defined model instances datas
  
  Does not  accept the use of nested property accessor as metthod neme e.g
  
  ```javascript
  let app={
    observer:{
      '$data.value':()=>{
        //this will be rejected
      }
    }
  }
  ```
  Pixel will raise an observer error on access to a nexted property.
  
  To set up an observer method for the property of ***$data.value***.
  
  You can specifically set the method name to 'value'.
  here is an example.
  ```javascript
  let app={
    model(){
      return {
        count:2,
        value:data(77)
      }
    },
    observer:{
      count(newV, oldV){
        //this method observes the count property of the widget instance
        //with parameter values of the new assigned value and it's former value
      },
      value(){
        //here is an observer method for the 'value.$data' state instance
      }
    }
  }
  ```
Observer methods gets triggered each time the select prop calls its setter function.

For Observation of nexted object props, you can acomplish such tax within the onMounted LifeCycleHooks by using the `this.observer` macro.

```javascript

const { Template, data } = Pixel

let app= {
  model(){
    
    return {
      obj:data( { num:56 , info : { name: 'Pixel Explorer', age :43 } } )//An object data
    }
  },
  onMounted(){
    
    //We are targeting to watch the age property of obj.$data.info
    this.observe('obj.$data.info.age' , ()=>{
     // a callback function
    })
    //this.observe accepts two arguments, the path to the reactiveo object to watch, and a callback function,
    //Recommended to be an arrow function, so to be able to access the onMounted scope this keyword.
    
  }
}

```

Precisely, you can watch more than one property using the `this.observe` component , by passing an arrow function that returns the value of the live properties you wish to observe.

```javascript
const { Template, data } = Pixel

let app= {
  model(){
    
    return {
      obj:data( { num:56 , info : { name: 'Pixel Explorer', age :43 } } ) ,//An object data
      count:45
    }
  },
  onMounted(){
    
    //We are targeting to watch the age property of obj.$data.info
    this.observe( (oldV, newV)=> this.obj.$data.info.age + this.count, ()=>{
     // a callback function
    })
    
  }
}
```
Pixel watches the value of this properties and reacts when there values changes when reavaluated, instead of the data properties directly.

## **Global instanciciation**

Pixel provides an effective way of injecting a global datas through out the scope of an initBuild and all it's child widget

1. `build.property`: Used to define a global property  to all child widgets of this parent widget;

Can be accessed as `$base.xxx`;
global widget properties are encapsulated into a single data object, $base.
Example usage
```javascript
const { initBuild }=Pixel
let build=initBuild({
  //widget options
  template:`<p>{{ $base.$data.text }}</p>`
})
//build.property('text','cursor-pointer');
accepts two parameters, a property name and the property data ref.
```
2. `build.handlers`: The hanlers prototype of initBuild sets global handlers for a widget
3. `build.widget` Also the widget prototype of the initBuild instance is used to set a global widget for all widget that are child of this parent widget.

### **Style and class guide**

Styling and class management is such a complex task that changes on daily basis. 
Pixel provides you with easy and reusable semantics that helps you create your widget with ease, no matter your project requirements or size.

##### **styleSheet: Scoping css**

Pixel provides you with a styleSheet option for defining styles for a widget.

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
    height:40px;
    color:blue;
    width:70%;
  }
  button{
    font-size:20px;
  }
`
}


```

The styleSheet option is a complete css  Styling with scope functionality.
If you wish to make a paticular style global, to go beyond the scope of the present widget, prepend the `@g` directive to an independent style sheet.
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

Pixel provides you with a helpful semantics that can help you pass styles within the template using the style attribute.

A plain object can be psssed to the style attribute using the data binding syntax.

Here is a minimal example ...
```html
<h1 *style="{ color:red , 'font-size':'18px', borderRadius:'10px'}" >My heading</h1>
```
Notice how we single quoted the `font-size` propName for containing a special character,a hyphen(-) and the propValue `18px` for containing a mix of a number and an aphabet.

MeanWhile, you can use the javascript provided css style property semantics, by Capitalizing a letter whenever there occured a hyphen replaced space like in the last property of the style attribute value in the previous example, the `borderRadius`.

It's pixel recommendation to define the styling data properties in a `styleClass` option.
```javascript
let app={
  styleClass:{
    headStyle:{
      color:'#0a3039'
    }
  }
}
```
The styleClass option is passed an object, the object must receive property values of object type.
This properties are exposed to the widget scope as `this.$styles.headStyle` or to the template as `$styles.headStyle`.
You can simply define the style object using the `data` macro, and return it from the model method.
Whatever way you choose , both the reactivity and responsiveness are maintained.

Its also privided to the context variable of the  build function as `context.styles`.

#### **Class binding**

Class is a special attribute to an html element, so pixel provides useful semantics for encapsulating class names.

A class can be passed an array or a plain object.
for example...
```html
<button *class="[ btn, m-5 , w-70 ]"> Click me </button>
```
When a class binding receives an object, pixel evaluates the property values as a condition on passing the property keys as the class names.
e.g.
```html
<button *class="{ largeBtn:true, 'bg-dark':false, btn: true,  }">Click me</button>
```
The above example will result in a button element as below.
```html
<button class="largeBtn btn">Click me</button>
```
Since the `bg-dark` property has a falsy value.

### **Custom Directive**


###  **Pixel Plugin  mechanism**

### **API documentation**

#### **Built in Widgets API**

1. ***<px-build />:***

Global Name: `Pixel.Build`


2. ***<px-fragment />:***

Global Name: `Pixel.Fragment`

3. ***<px-for />:***

Global Name: `Pixel.For`

4. ***<px-if />:***

Global Name: `Pixel.If`

5. ***<px-else-if />:***

Global Name: `Pixel.ElseIf`

6. ***<px-else />:***

Global Name: `Pixel.Else`

7. ***<px-animation />:***

Global Name: `Pixel.Animation`

8. ***<px-transition />:***

Global Name: `Pixel.Transition`

9. ***<px-live-widget />:***

Global Name: `Pixel.LiveWidget`

#### **Utility functions API**

1. `Pixel.withDirectives`:

2. `Pixel.withModifiers`:

3. `Pixel.data`:

4. `Pixel.nextTick`:

5. `Pixel.Template`:

6. `Pixel.AsyncWidget`:

7. `Pixel.defineWidget`:

8. `Pixel.NodeMake`:

9. `Pixel.VNode`:

10. `Pixel.H`:

11. `Pixel.initBuild`:

12. `Pixel.initSSRBuild`:

13. `Pixel.ref`:

14. `Pixel.createVNode`:

15. `Pixel.Buffer`

16. `Pixel.Resolve`

#### **Directives API**

1. `px:data`

2. `px:for`

3. `px:if`

4. `px:else-if`

5. `px:else`

6. `px:model`

7. `px:bind`

8. `on:<eventName>`

9. `@<eventName>`

10. `px:text`

11. `px:slot`

12. `px:skip`

13. `px:html`

14. `px:<dataVariable>`

15. `*<dataVariable>`

16. `px:scoped`


#### **Widget options API**

1. ##### `template`

Type:`String`

Details :

Used as a markup in building the widget user interface.

Example :
```javascript
let app={
  template:`<div > 
    <button> Click me</button>
  </div>`
}
```
Recommends the use of multline string literal to support multiline and concise templating.

2. ##### `model`

Type : `Function` | `<Object>`

Details:

A method used in instanciating widget state datas. Must return an object of properties that are to be exposed to the widget and template scope as the Widget's state datas.

e.g.
```javascript
let app={
  model(){
    return {
      count:2
    }
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
      height:40px;
      width:70%;
      border-radius:10px;
    }
    .beautify{
      border-color:#179d97;
      color:lightblue;
      background-color:#0a3039
    }
  `,//Usage
  template:`<button id='btn' class='beautify' > Pixel button styleSheet Example</button>`
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
    return {
      count:0
    }//Reactive instances defines
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

Useful expecially, during the resolving process of the widget.

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
      borderWeight:'15px',
      backgroundColor:'#0a3039'
    }
  },//Usage
  template:`
  <h1 *style=$styles.headStyle > Pixel Explorer</h1>
  `
}
```
Available as `this.$styles.headStyle` within the widget scope.

7. ##### `observers`

Type: `Object` | `<Function>`

Details:

Used to to define methods that should watch reactive properties when they were mutated.

The methods names must match a model exposed property. Deep/nexted objects properties will raise an error warn.
Here is how to...
```javascript
let app={
  model(){
    
    return {
      count:data(0),
      message: "Welcome to Pixel JS"
    }
  },
  observers:{
    count(){
      //This get's called when the count property got mutated
    },
    message(){
      
    }
  }
}
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
    headerWidget:{
      template:`<h1> Pixel Explorer</h1>`
    }
  },
  template:`
  <headerWidget />
  `
}
```
Accepts all widget dataTypes.

Contact the widget registration guide for more details.

##### **LifeCycleHooks**

10. ##### `onMounted`

Type: `Function`

Details:

An function/method, that is to be called asynchronously, when a widget mounting process has been completed.
```javascript
let app={
  onMounted(){
    //The this scope exposed here
  }
}
```
Do not use an arrow function for this option.

11. ##### `onUpdated`

Type: `Function`

Details:

An function/method, that is to be called asynchronously, when a widget triggers an update on the widget inDom object, when a reactive property got mutated. 
```javascript
let app={
  onUpdated(){
    //The this scope exposed here
  }
}
```
Do not use an arrow function for this option.

12. ##### `beforeBuild`

Type: `Function`

Details:

An function/method, that is to be called synchronously, before a widget  building process is initialized, and before  the rective datas a compiled.

Only the `$attrs` and `$slots`  are exposed to the methos scope.
```javascript
let app={
  beforeBuild(){
    //only the 'thia.$attrs' and 'this.$slors' are exposed from within the this  keyword.
  }
}
```
Do not use an arrow function for this option.

13. ##### `onBuilt`

Type: `Function`

Details:

An function/method, that is to be called synchronously after building the widget and initializing state properties and before the widget mounting process is started.
```javascript
let app={
  onBuilt(){
    //The this scope exposed here
  }
}
```
Do not use an arrow function for this option.

14. ##### `beforeUpdate`

Type: `Function`

Details:

An function/method, that is to be called asynchronously, before a  reactive  Dom update is  triggered.
```javascript
let app={
  beforeUpdate(){
    //The this scope exposed here
  }
}
```
Do not use an arrow function for this option.

15. ##### `beforeDestroy`

Type: `Function`

Details:

An function/method, that is to be called asynchronously, before a widget  instance is destroyed, and removed from the Dom.
```javascript
let app={
  beforeDestroy(){
    //The this scope exposed here
  }
}
```
Do not use an arrow function for this option.

16. ##### `onDestroyed`

Type: `Function`

Details:

An function/method, that is to be called asynchronously, after  a  widfet instance has been destroyed and removed from the dom.
```javascript
let app={
  onDestroyed(){
    //The this scope exposed here
  }
}
```
Do not use an arrow function for this option.

17. ##### `build`

Type: `Function` | `<PixelDomInstance>`

Details:

An function/method, that us used to encapsulate  the widget UI system.

Should return a `PixelDomInstance`  either  through the  hyperscript method,  or using the `pixel.Template` util.

Specialy provided for users coming from hyperscript background.
e.g
```javascript
let app={
  build(params, { slots, events, attrs, styles }){
    //The this scope exposed here
    return H('h1', "Pixel Explorer")
  }
}
```
parameters provided are the params and the context data properties.
Do not use an arrow function for this option.

Contact the build Function guide for more information.

18. ##### `directives`

Type: `Object` | `<Object>`/`<Function>`

Details:

An Object  used to register custom directives.
```javascript
let app={
  directives:{
    MyDir:{
      created(element, value, modifiers){
        //Directive code
      }
    }
  }, //Usage  of custom directives in templates
  template:`
  <p  :MyDir='true' > Pixel Explorer</p>
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
    inheritSlots:false
  }
}
```
Contact the `Pixel.Config` API documentation for more information on `buildConfig` options use cases.

#### **`build.config`  settings API**

1. `debug`

Type: `Boolean`

2. `inheritAttrs`

Type: `Boolean`

3. `inheritSlots`

Type: `Boolean`

4. `fallThrogh`

Type: `Object` | `<String>`

5. `inheritStyleClass`

Type: `Boolean`

6. `delimiters`

Type: `Array` | `<String>`

### **Best Practices**

As you dive deeper into PixelJs, consider adopting best practices to ensure clean and maintainable code. Here are some recommendations:

- **Modular Components:** Break down your UI into small, reusable components.
- **Effective Naming:** Use clear and meaningful names for variables, widgets, and handlers.
- **Reactive Data Usage:** Leverage reactive data for efficient UI updates.
- **Observer Methods:** Use observer methods for data changes that require specific reactions.

### **Conclusion**
Congratulations! You've learned the basics of using Pixel to empower your creativity and build with speed. You now know how to define widgets, use template strings, handle methods and reactive data, bind attributes, apply directives, and render your UI widgets.

Additionally, you've explored advanced features like params, custom elements, observers, life'=capitalize and slots.


Pixel offers a powerful and flexible framework for developing dynamic and interactive web applications. Remember to consult the official Pixel documentation and explore the additional resources for more in-depth information and examples.

## **Additional Resources**
To further expand your knowledge and explore more advanced features of Pixel, check out the following resources:

Official Pixel Documentation: https://pixel-docs.com
Pixel GitHub Repository: https://github.com/prince9216/pixeljs
Pixel Community Forum: https://community.pixel.com
These resources provide comprehensive documentation, examples, and a supportive community to help you make the most of Pixel in your projects. Happy coding!.
