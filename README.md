# PixelJs
# Pixel js : Empowering Creativity, Building with Speed

### Using Pixel for Creativity



Pixel empowers creativity, building with speed.

###Table of Contents
##Introduction
##Installation
##Getting Started
##Basic Usage
##Widgets and Instances
##Template Strings
##Methods and Reactive Data
##Binding Attributes
##Pixel Directives
##Dynamic Attribute Names and Values
##Rendering with Template Strings or H Function
##Advanced Usage
##Props
##Custom Elements
##Slots
##Conclusion
##Additional Resources


###Introduction
Pixel is a JavaScript framework designed to enhance creativity and speed in building web applications. It provides a flexible and intuitive way to create interactive user interfaces using a declarative syntax. Pixel leverages reactive data and efficient rendering to deliver high-performance applications.

### Installation
To use Pixel, you need to include the Pixel library in your project. You can install Pixel via npm or include it directly in your HTML file using a script tag. Here are the installation options:

Using npm;
npm install pixel-framework
Using a script tag:

<script src="https://cdn.pixel.com/pixel.js"></script>
###Getting Started
Once you have Pixel installed in your project, you can start using it by importing the necessary components. Here's an example of how to import the required modules:


import { PixelBuild, Template, data, H, NodeMake } from 'pixel';
## Basic Usage
Let's explore the basic usage of Pixel by going through some key concepts and examples.

###Widgets and Instances
In Pixel, you define widgets that encapsulate your UI components. A widget is an independent entity that can have its own state and behavior. To create a widget, use the PixelBuild function.

Here is a minimal example of using pixel

```javascript
const { PixelBuild, Template }= Pixel
let build=PixelBuild({
    instance(){
    
        return {
            count:0
        }
    },
    build(){
        return Template`<button>{{ count }}</button>`
    }
})
build.mountRoot(/*root element instance or selector*/)
```

### Template Syntax
for string interpolations in pixel widgets, use the double curly braces, `{{ count }}`, data values can directly be referenced from inside the mustache tags.

This mustache tags accepts single expressions,parsing a statement will raise a Pixel template Error.

Accepts expressions Like calling a function `{{ func() }}` or conditional datas `{{ count ? count : 0 }}`
To define the use of custom mustaches tags, define the buildConfig option , in your widget options. then set the delimiters option of an array value, consisting of two string values, whivh opens and closes the string interpolation. e.g
```javascript
export default{
    buildConfig:{
        delimiters:['[[',']]']
    }
}

```

### Methods
to define methods to use on your widget, use the method options in the widget options.

Functions defined here are automatically exposed to the template instances directly

### stateful datas

The widget state is initialized on the ***instance*** option method

Its returned datas are exposed to the template instances directly, and to the widget instance through the ***this*** keyword

for reactive datas, use the Pixel.data macro

```javascript
const { data }=Pixel
let widget={
    instance(){
    //initialized widget instances
        let count=data(0)
        //expose it to the template
        return { count }
    },
    build(){
    //accessed in the widget through the ***this*** keyword
        this.count+=70
    //to access them in template, it ll be esposed as $data.count, this datas object are reactive data
      return Template`<p >{{ $data.count }}</p>`
    }
}
```
##Binding Attributes
To bind an attribute name to a value, use double asterisks '*'. For example, *class='$data.count' will bind the class attribute to the value of count.
This aswell had direct access to the widget instance

```javascript
export default{
  // ...
  build() {
    return Template`<p *class='$data.count'>Hello, Pixel!</p>`;
  },
};
```
### Dynamic Attribute Names and Values
You can use square brackets '[]' to specify dynamic attribute names or values. Inside the brackets, you can use expressions or access properties from the widget data instances

 ```javascript
export default{
  // ...
  build() {
    return Template`<p *[name]='$data.value'>Dynamic Attribute</p>`;
  },
};
```
### Pixel directives
Pixel provides directives that allow you to conditionally display elements, bind reactive datas to an input element, reference an element or skip the compilation of an element's children. Here are some commonly used directives:
##X-Skip Directive
To skip the compilation of an elements children, use the `x-skip` attribute. All children of the element will be skipped while building this element

The `x-skip` directive does not need to ne passed a value, but if value is a Boolean value of ` false`, will not be applied on element.
Will raise a Pixel warn warn apllied on a pixel widget

### Conditional rendering

To render elements based on some evaluated result of a statement or value, Pixel provides you with the `x-if` directive

```javascript
Template`<button x-if='false'></button>`
```

this element will not render since the condition is falsy

The `x-else-if` directive ,if available on the next element or widget, will be processed if, the `x-if`, or previous `x-else-if ` if any, evaluated to false

The `x-else` directive , displays its element if the previous `**if` or `x-else-if` , if any, statements are falsy

### List rendering

list rendering helps you render a widget or an element, from an iterable value , the resulting value will be available on the element, or widget rendering logic

To achieve this , pixel provides you with the `x-for` directive.
```javascript
Template` <MyWidget x-for='item in $data.Packages' *data='item'> </MyWidget>`
```
### Display Rendering

Rendering with Template Strings or H Function
You have two options for rendering your UI widgets: using template strings or the H function.

Template Strings
Template strings allow you to define your UI structure directly. You can use plain HTML tags with slight difference, void elements must be closed immediately.
To access widgets in the Template string, you must register it through the widgets option.

Here is an example
```javascript
export default{
  widgets:{
    MyWidget
  },
  build() {
    return Template`
      <div>
        <p>Header</p>
        <input type="text">
      </div>
      <MyWidget/>
    `;
  },
};
```
H Function
The H function provides a more programmatic way of building your UI. It takes the element name or a widget instance as the first argument, followed by attributes and children. Children can be plain texts, or other H objects, 

if you are using the H render function, here is an
example using the H module
``` javascript
export default{
build(){
    return H('p', { class:'name '}, /*more children like texts or more H objects */ H('input'))
    }
}
```
if there are needs for multiple nodes , there can be wraped in an Array or square brackets e.g

H macro can accept as many child H as possible, 
```javascrip
export default{
  // ...
  build() {
    return H('div', null, [
      H('p', null, 'Header'),
      H('input', { type: 'text' }),
    ]);
  },
};
```
For multiple root Nodes
`return [H('p', 'Header'), H('input')]`

the first argument is required and  must be a string value of an  element name, or an instance of a widget, other two can be a children or attributes. 

Accepts only three arguments, whereas 2nd and 3rd arguments can be passed dynamicaly if there are no need for the both, unlike other frameworks where you have to passe a positional arguments or null.
###Advanced Usage
In addition to the basics, Pixel offers some advanced features that can enhance your development experience.

### Properties
You can pass properties  to your widgets to make them more dynamic and reusable. Define the properties option in the widget's options object and access them in the template using $props.
validation can be a type function, or an object consisting of type , default, or required, e.g
```javascript
export default{
    properties:{
        color:String,//or as an object
        seed:{
            type:Object,
            required:true,//required maynot co-exist with the default option
            default:{
                name:'Prince'
            }
        }
    }
}
// Usage:
<widget name="John" />
//widget properties or attributes names can also be bind using the '*' , asterisks flag
```
properties will be exposed to the template instance as `$props`
validations will raise a Pixel Error or warn , if failed.

properties can aswell be passed as an array of props names, this is useful when there is no use of validations e.g

`properties:['color','seed']`


##Custom Nodes
Pixel allows you to create custom elements by using the NodeMake module. You can register your custom elements by calling node.resolve(). This is useful when you want to encapsulate complex functionality into reusable components.
for a custom element, use the Pixel.NodeMake macro, then pass in the props, templates, style and plugins  as an object options.

here is a minimal example on creating a pixel custom element
```javascript
let node=NodeMake({
    /* accepts props, template, style and plugins options */
})

```
to register the custome node ` node.resolve()`

it will be available to use in your widget Template, globally, does not require registration.

if you tend to use it through the render Function, ***H*** macro, it must be availble , or imported into the namespace.

### Slots
Slots provide a way to pass content into your widget, from the parent widget. You can define slots in your widget's template using the <slot> tag. The passed content will be rendered in the slot tag as a default slot.

Slot tags with no nome attribute, will specifically be rendered as a default slot, you can as well, specifically set a default slot by setting the name attribute to default.
```javascript
export default{
  // ...
  build() {
    return Template`
      <div>
        <h1>My widget heading</h1>
        <slot></slot>
      </div>
    `;
  },
};
```
the slot tag can be named, ***<slot name='header'/>***

to parse slots contents for named slots, use the ***template*** tag, slots can be assigned to a slot using the x-slot directive..e.g
```javascript
export default{
    build(){
        return Template`
        <Widget>
            <template x-slot='header'>
                <!--Slot contents goes here -->
            </template>
        </Widget>
        `
    }
}
```
slots works same as in other frameworks with slight differences in pixel, 
If a child widget has only a single root element, Pixel will try to parse all default slots to its innerHtml if it has none.

to disable this action, set the `inheritSlots` settings to false in your buildConfig option

all widget instances of the parent, are available, within the child widget scope, but not the other way round.
but if need be to access a child widget's data within the scope it's defined in the parent, pixel provides you withe the ***fallThrogh*** setting option in the child widget's buildConfig.
access to state instances are to be exposed directly, not using the ***this*** keyword, and must be in string format e.g

```JavaScript
export default{
    buildConfig:{
        fallThrogh:{
            count:'$data.count'//direct access to widget instance datas
            name:'$props.name',
            msg:messages//namespace variable
        }
    }
}

```
This will be exposed withing the scope of the child widget tag as `$fall[xxx]` or `this.$fall[xxx]` if using the hyperscript function. e.g
```JavaScript
export default{
    build(){
        return Template`
            <Widget>
                <!-- fallThrogh attributes of this child widget will only be available within this scope as $fall-->
                <h1>{{ $fall.name }}</h1>
            </Widget>
        `
    }

}

```
##The Build function
The build function is the widget Logic method
the build function has access to some widget options as parameters, through two arguments,[props, context]
the props parameter is a reference to `this.$props` datas, can be destructured
the context is aswell an object, with access to, styles, emits, slots and attrs.
Here is an example
```JavaScript
export default{
    build(props, context){
        return //...
    }
}
```
this are also available within the this keyword

##Widget type

Pixel also accepts a function and class widgets, 

Function widget works as the scope of the build function, with no data state of it's own.
Class widgets are perfect and statefull datas, in short, it was used in building the pixel builtin widgets.
Class widgets must extend the `Pixel.WIDGET` base widget, to ne treated as a class widget
Pixel recommends the object widget for declarative syntax

###Conclusion
Congratulations! You've learned the basics of using Pixel to empower your creativity and build with speed. You now know how to define widgets, use template strings, handle methods and reactive data, bind attributes, apply directives, and render your UI widgets. Additionally, you've explored advanced features like props, custom elements, and slots.


Pixel offers a powerful and flexible framework for developing dynamic and interactive web applications. Remember to consult the official Pixel documentation and explore the additional resources for more in-depth information and examples.

### Additional Resources
To further expand your knowledge and explore more advanced features of Pixel, check out the following resources:

Official Pixel Documentation: https://pixel-docs.com
Pixel GitHub Repository: https://github.com/pixel-framework/pixel
Pixel Community Forum: https://community.pixel.com
These resources provide comprehensive documentation, examples, and a supportive community to help you make the most of Pixel in your projects. Happy coding!
