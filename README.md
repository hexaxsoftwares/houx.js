# PixelJs
# Pixel js : Empowering Creativity, Building with Speed

### Using Pixel for Creativity



Pixel empowers creativity, building with speed.

## Table of Contents
### Introduction
### Installation
### Getting Started
### Basic Usage
### Widgets and Instances
### Template Strings
### Methods and Reactive Data
### Binding Attributes
### Pixel Directives
### Dynamic Attribute Names and Values
### Rendering with Template Strings or H Function
### Advanced Usage
### Params
### Custom Elements
### Slots
### Data Observation
### Global Datas and widgets
### Conclusion
### Additional Resources


## Introduction
Pixel is a JavaScript framework designed to enhance creativity and speed in building web applications. It provides a flexible and intuitive way to create interactive user interfaces using a declarative syntax. Pixel leverages reactive data and efficient rendering to deliver high-performance applications.

## Installation
To use Pixel, you need to include the Pixel library in your project. You can install Pixel via npm or include it directly in your HTML file using a script tag. Here are the installation options:

Using npm;

npm install pixel-framework

Using a script tag:

<script src="https://cdn.jsdelivr.net/gh/prince9216/PixelJs@main/pixel.global.dev.js"></script>
## Getting Started
Once you have Pixel installed in your project, you can start using it by importing the necessary components. Here's an example of how to import the required modules:


import { initBuild, Template, data, H, NodeMake, ref } from 'pixel';
## Basic Usage
Let's explore some basic usage of Pixel by going through  key concepts and examples.

## Widgets and Instances
In Pixel, you define widgets that encapsulate your UI components. A widget is an independent entity that can have its own state and behavior. Every Pixel widget Manages it's own state.

To create a widget,you should  use the initBuild function to iniatialize an initale Widget build. This can do for a start.

Here is a minimal example of using pixel 

```javascript
const { initBuild, Template }= Pixel// using the browser JIT compiler, we destructure our tools from the global Pixel Object
let build=initBuild({
    model(){
    
        return {
            count:0
        }
    },
    build(){
        return Template`<button>{{ count }}</button>`
    }
})
//to insert into the dom
build.mount(/*root element instance or selector*/)
```
here we passed in an object containing widget options that makes up our widget build.
lets go through the options above.

1. The model option: Requires to be a method/function. and must return an Object 

The method returns values that are esposed to the widget instance
datas defined and exposed in model are proxy datas and are made reactive, simply means that the widget UI gets updated whenever any of the properties of the widget model returned object are touched .
2. The build function: A method function that masterminds the normalization of your widget UI hydration.

The build function runs only once throughout the life of a widget, and uses its returned value to build the widget UI in pixel.

if returns a string,it will be passed and compiled as a textNode.

 You can return an instance of ***Pixel.Template*** strings, if you prefer the native way of building your ui.
here is a minimal example of using the Template option in the build function
```javascript
const { Template } = Pixel
export default{
  build(){
    return Template`<h1>My heading</h1>`
  }
}
```
Another optional way of encapsulating your ui is by using the template option, e.g
```javascript
export default{
    template:`
        <!--your html template strings -->
    `
}
```
this will be ignored if the build function is present.

The innerHtml of the mountRoot target will be used as the widget template if the build and the template options are both not provided.
to mount the widget into your root dom,
```javascript
  build.mount(/*selector*/)
  ```
  Your widget template will be injected into the selected dom element, clearing all inner content of the selected element
## Template Syntax
Pixel provides you an efficient way of encapsulating templates logic into your Pixel template when your the multline string literal

You can iterpolate state instances into the template by using the double curly braces, `{{ count }}`, data values exposed through the model option can directly be referenced from inside the mustache tags,.

This mustache tags accepts single expressions,parsing multiple statements will raise a Pixel template Error.

Accepts  calling of a function that returns a primitive value, will return an empty string if not a primitive value e.g. `{{ func() }}` or tenary operations like , `{{ count ? count : 0 }}`.

To customize the use of mustaches tags, you can achieve the configuration of custom mustache tags by setting the delimiters option in the ***buildConfig*** settings option , in your  widget. 

set the delimiters option to an array data , consisting of two string values, of an opening and closing tags. 

e.g
```javascript
export default{
    buildConfig:{
        delimiters:['[[',']]']
    }
}

```
the values will be used in interpolating template strings instead of the custom curly brace patterns.
## Handlers
Pixel provide an intuitive way of defining stateful method Handlers.

Handlers helps you perfornm stateful logic available to the template.

To define  methods on your widget, use the handlers object option in the widget options.
example
```javascript
export default{
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
  template:`<button *click='increment'>Clicked me {{ count }} times</button>`
}
```
handlers defined here are automatically exposed to the template instances directly and can be accessed within both the template and attribute scope

## stateful datas

The widget state is initialized on the ***model*** option method

Its returned datas are exposed to the template instances directly, and to the widget instance through the ***this*** keyword

for reactive datas, use the Pixel.data macro. 
here is a minimal example
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
by setting out the data macro, this helps us target nexted properties, handle dependency tracking;
datas defined using the data macro is used to define an external higher data hyponation level, by setting the $data scope.
## Binding Attributes
To bind an attribute value from a widget instance data, use the single asterisks '*' data binder. For example, ****class='$data.count'*** will bind the class attribute to the value of count.
direct access to the widget instance

```javascript
export default{
  model(){
    return { count:data(0) }
  },
  // ...
  build() {
    return Template`<p *class='$data.count'>Hello, Pixel!</p>`;
  },
};
```
## Dynamic Attribute Names and Values
You can use square brackets '[  ]' to specify dynamic attribute names or values. Inside the brackets, you can use expressions or access properties from the widget data instances

 ```javascript
 const { data }=Pixel
export default{
  model(){
    return {
      name:'class',
      value:data({'bg-dark':true})
    }
  },
  // ...
  build() {
    return Template`<p *[name]='$data.value'>Dynamic Attribute</p>`;
  },
};
```
appending the asterisks helps pixel decide when to bind a data property to a widget state data.
## Pixel directives
Pixel provides directives that allow you to conditionally display elements, bind reactive datas to an input element, reference an element or skip the compilation of an element's children. Here are some commonly used directives:
#### px-kip Directive
To skip the compilation of an elements children, use the `px-skip` attribute. All children of the element will be skipped while building this element

The `px-skip` directive does not need to be passed a value, it presence on an element is considered and defaults to truthy, accepts only boolean value, scopes to html elements only.
Will raise a Pixel warn warn when aplied on a pixel widget since it's only an element based directive.

### Conditional rendering

To render elements/widget based on some evaluated result of a statement or value, Pixel provides you with the `px-if` directive

```javascript
Template`<button px-if='false'></button>`
```

this element will not render since the condition render result is falsy

The `px-else-if` directive ,if available on the next element or widget following the previous 'px-if' or 'px-else-if' element/widget , will be processed if, the `px-if`, or previous `px-else-if ` if any, evaluated to false
Inoder to make it effective, should be passed to the next element or widget after the previous relative conditioned element/widget 

The `px-else` directive , displays its element if the previous `px-if` or `px-else-if` , if any, statements are falsy

its always a gotcha to pass a px-if alongsode the px-for ditective, if possible, avoid px-if with px-for
### List rendering

list rendering helps you render a widget or an element, from an iterable value , the resulting value will be available on the element, or widget rendering logic

To achieve this , pixel provides you with the `px-for` directive.

here is a minimal example on using 'px-for' directive.
```javascript
Template` <MyWidget px-for='item in $data.Packages' *data='item'> </MyWidget>`
```
PX-for encapsulates element datas, and creates the relatibe data based on the evalusted loop data, then passes the positional arguments to the element/widget context.
#### px-model
    Data instances defined and exposed from the model method option can be two way binded efficiently using the 'px-model' directive.
    e.g.
    ```javascript
    Template`<input px-model='$data.value'>`
    ```
    update to this data reference will update the dom or nodes efficiently
#### px-data
    accessing and touch-manipulation on dom objects is achieved using the 'px-data' directive.
    px-data is used to reference in template variables
    Template`<h1 px-data='$data.value'></h1>`
    
    value of $data.value will be populated with the element or widget instance if passed to a widget tag
### Display Rendering

Rendering with Template Strings or H Function
You have two options for rendering your UI widgets: using template strings or the H function.

#### Template Strings
Template strings allow you to define your UI structure directly ising the native html tags. You can use plain HTML tags with slight difference, widget tags that has no children can be closed immediately.eg ***<Widget/>***
To access widgets in the Template string, you must register it through the widgets option.
You can optionally define your widges using the template option, which is passed strings of your UI html structure
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

The H function can only be used or passed as return value of the build fumction
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
```javascript
export default{
  // ...
  build() {
    return H('div', [
      H('p','Header'),
      H('input', { type: 'text' }),
    ]);
  },
};
```
For multiple root Nodes, you can wrap them in square bracket
`return [H('p', 'Header'), H('input')]`

the first argument is required and  must be a string value of an  element name, or an instance of a widget, other two can be a children or attributes. 

Accepts only three arguments, whereas 2nd and 3rd arguments can be passed dynamicaly,  if there are no need for any, it absence does not matter as there is no contextual defined position for any of the both, unlike other frameworks where you have to passe a positional arguments or null.
### Advanced Usage
In addition to the basics, Pixel offers some advanced features that can enhance your development experience.

### Params
You can pass Parameters  to your widgets to make them more dynamic and reusable. 

Params is a consistent way of passing state based datas from the parent down to the child widget

Define the params option in the widget's options object and access them in the template using $params.
validation can be a type function, or an object consisting of type , default, or required, and a validator method which returns a conditional boolean valuee.g
```javascript
export default{
    params:{
        color:String,//a String prototype functiob, which will be ised to chech against params datas
        seed:{
            type:Object,
            required:true,//required maynot co-exist with the default option
            default:{}
          }
            name:{
              type:Array
              default:()=>'Prince'//default validation option may be passed a finction which returned the valie
              }
        
        }
    }
}
// Usage:
<widget name="John" />
//widget properties or attributes names can also be bind using the '*' , asterisks flag
```
params will be exposed to the template instance as `$params`

validations will raise a Pixel Error or warn , if failed.

params can aswell be passed an array of params names strings, this is useful when there is no use case of validations e.g

`params:['color','seed']`


# Custom Nodes
Pixel allows you to create custom elements by using the NodeMake module. You can register your custom elements by calling node.resolve(). This is useful when you want to encapsulate complex functionality into reusable components.
for a custom element, use the Pixel.NodeMake macro, then pass in the name '<required>', props, templates '<required>', style and plugins  as an object options.

here is a minimal example on creating a pixel custom element
```javascript
let node=NodeMake({
    /* accepts props, template, style and plugins options */
})

```
to register the custome node  if you are using the string template, ` node.resolve()`

it will be available to use in your widget Template, globally, does not require registration.

if you tend to use it through the render Function, ***H*** macro, it must be availble , or imported into the namespace and passed as the first argument.
NodeMake also accepts the custom elements LifeCycleHooks
e.g.

***onConnected, onDisconnected, onAdopted and onAttrsChanged***

NodeMake props same as a widget parans, with validations and inheritance for none props defined attributes.
# Slots
Slots provide a way to pass content to your child widget, from the parent widget. 

You can define slots in your widget's template using the <slot> tag. The passed content will be rendered in the slot tag as a default slot.

Slot tags with no name attribute, will specifically be rendered as a default slot, you can as well, specifically set a default slot by setting the name attribute to default.
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
Slot tags can also be named dynamically,e.g ***<slot name='header'/>***

to parse slots contents for named slots, use the ***template*** tag, templates can be assigned to a slot using the px-slot directive on the template tag..e.g
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
If a child widget has only a single root element, Pixel will try to parse all default slots to its innerHtml if, there is no default slot, and it has no innerHtml content.

to disable this action, set the `inheritSlots` settings to false in your buildConfig settings option.

All widget instances of the parent, are available, within the child widget scope, but not the other way round.
but if need be to access a child widget's data within the scope it's defined in the parent, pixel provides you with the ***fallThrogh*** setting option in the child widget's buildConfig.
access to state instances are to be exposed directly, the ***this*** keyword would not be available in the scope,and so,  should be passed as a string format  e.g

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
```javascript
export default{
    build(){
        return Template`
            <Widget>
                <!-- fallThrogh attributes of this child widget will only be available within this scope of Widget instance as $fall-->
                <h1>{{ $fall.name }}</h1>
            </Widget>
        `
    }

}

```
# The Build function
The build function is the widget Logic method
the build function has access to some useful widget options data as parameters, through two arguments,[params, context]
the params parameter is a reference to `this.$params` datas, can be destructured
the context is aswell an object, with access to, styles, events, slots and attrs.
Here is an example
```javascript
export default{
    build(params, context){
        return //...
    }
}
```
this are also available within the this keyword
with the ***$*** style appended to the `styles, events, slots and attrs` data instances. 
### Widget type

Pixel also accepts a function and class as a widgets, 

Function widget works as the scope of the build function, with no data state of it's own.
Class widgets are perfect and statefull widget encapsulation, in short, it was used in building the pixel builtin widgets.
Class widgets must extend the `Pixel.WIDGET` base widget, to be treated as a class widget
Pixel recommends the use of object options widget for declarative syntax
# LifeCycleHooks
    Pixel provides you with some us3full callback functions that run at some specific stage of the life of a widget.
    
    beforeBuild: Runs before the widget instances are instanciated
    onBuilt:runs after all widget instances are instanciated and after running the build function and creating all widget instances.
    beforeMount: Runs before inserting the widget UI into the dom.
    onMounted: Runs after inserting the widget UI build into the dom.
    beforeUpdate: Runs before starting an update on any change on a statefull datas.
    onUpdated: Runs after updating the dom of changes the reactive datas.
    beforeDestroy: Runs before destroying the widget instances and unmounting from the dom.
    onDestroyed: <Promise based> Runs after destroying all widget instances and unmounted from the dom
    
    
    LifeCycleHooks has the this keyword bound to the widget state data
## Dynamic Widget
    Widgets can be dynamicaly rendered, expecially, when resorting to in dom templates, 
    this can be achieved using the px-widget buit in widget.
    it accepts one required property, **self** which can registered any registered widget instance.
    
    attributes or params for the widget pased to self, can be passed alongside the self params. children are passed as children to px-widget
## Data Observation
  To perfom a data Observation within the widget instance datas, the 'observer' option can be used.
  
  Within the observe object option, pixel acceptd only  object, with names that references the widget defined model instances datas
  
  Does not  accept the use of nested property accessor as metthod neme e.g
  ```javascript
  export default{
    observer:{
      '$data.value':()=>{
        //this will be rejected
      }
    }
  }
  ```
  Pixel will reject every access to a nexted access, maybe to a user defined object/array data type, or a reactive data instanciation.
  
  To set up an observer method for the property of ***$data.value***.
  
  You can specifically set the method name to 'value'.
  here is an example.
  ```javascript
  export default{
    model(){
      return {
        count:2,
        num:data(77)
      }
    },
    observer:{
      count(newV, oldV){
        //this method observes the count property of the widget instance
        //with parameter values of the new assigned value and it's former value
      },
      num(){
        //here is an observer method for the '$data.num' state instance
      },
      value(){
        
      }
    }
  }
  ```
  observer methods gets triggered each time the select prop calls its getter function.
## Widge registration
if you are using the template strings to parse your UI, pixel provides a way of registering widgets, before it can be passed as a template tag within the template encapsulation.

To register your widgets, set the ***widgets*** object option in your widget, and passin your widget within the options , using desired accessor name.
once registered, you can now use your widget within the template tags or if you are using the H function through the buikd function, widget objects, class or functions are passed as the first argument of the H macro

##Global instanciciation
Pixel provides an effective way of inject a global datas through out tge scope of an initBuild and all it's child widget
1. ***build.property***: Used to define a global property  to all child widgets of this parent widget;

can be accessed as '$base.xxx';
global widget properties are encapsulated into a single data object, $base.
Example usage
```javascript
const { initBuild }=Pixel
let build=initBuild({
  //widget options
  template:`<p>{{$base.$data.text}}</p>`
})
//build.property('text','cursor-pointer');
accepts two parameters, a property name and the property data ref.
```
2. ***build.handlers***: The hanlers prototype of initBuild sets global handlers for a widget
3. ***build.widget*** Also the widget prototype of the initBuild instance is used to set a global widget for all widget that are child of this parent widget.
# Conclusion
Congratulations! You've learned the basics of using Pixel to empower your creativity and build with speed. You now know how to define widgets, use template strings, handle methods and reactive data, bind attributes, apply directives, and render your UI widgets. Additionally, you've explored advanced features like params, custom elements, and slots.


Pixel offers a powerful and flexible framework for developing dynamic and interactive web applications. Remember to consult the official Pixel documentation and explore the additional resources for more in-depth information and examples.

# Additional Resources
To further expand your knowledge and explore more advanced features of Pixel, check out the following resources:

Official Pixel Documentation: https://pixel-docs.com
Pixel GitHub Repository: https://github.com/prince9216/pixeljs
Pixel Community Forum: https://community.pixel.com
These resources provide comprehensive documentation, examples, and a supportive community to help you make the most of Pixel in your projects. Happy coding!
