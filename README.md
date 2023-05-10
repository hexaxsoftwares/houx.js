# PixelJs
Pixel js : Empowering Creativity, Building with Speed

Using Pixel for Creativity


User
pixel empowers creativity, building with speed.
how to use pixel

here is a minimal example of using pixel widgets

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
for string interpolations in pixel widgets, use the double curly braces, {{ count }}
this mustaches accepts single statements , not expressions, like calling a function {{ func() }} or conditional {{ count ? count : 0 }}
to define methods , use the method options in the widget options

for reactive datas, destructure the data method from pixel
also available to dynamic attribute names and value, 
const { data }=Pixel
let widget={
    instance(){
        let count=data(0)
        //expose it to the template
        return { count }
    },
    build(){
    //to access them in template, it ll be available as $data.count, this datas object are reactive
      return Template`<p >{{ $data.count }}</p>`
    }
}
to bind an attribute name , use the double aesterisks
**class='$data.count'

for dynamic attribute name,use the block bracket on the attribute
 
 **[name]='$data.value'

pixel directives
to skip the compilation of an elements children
**skip
for condition display
**if='true'
**if-else='false'
**else='true'

for list display
**for='item in $data.list'

for displaying either using Template strings, or get the H render function
example
return H('p', { class:'name '}, /*more children like texts or more H objects */ H('input'))
if there are to be multiple nodes , there are to be wraped in an array
return [H('p', 'Header'), H('input')]
the first argument must be an element name, or an instance of a widget, other two can be a children or attributes, accepts only three arguments
for props, use the widget option, properties, values works just like in vue js
for a custom element, destructure the NodeMake from pixel, then pass in the props, templates, style and plugins  as an object, to register, node.resolve()
slots works as same

write a good documentation out of this

ChatGPT
Pixel Documentation

Welcome to the documentation for Pixel, a powerful framework that empowers creativity and enables rapid building. This guide will provide you with an overview of how to use Pixel, including the syntax, features, and examples.

Table of Contents
Introduction
Installation
Getting Started
Basic Usage
Widgets and Instances
Template Strings
Methods and Reactive Data
Binding Attributes
Pixel Directives
Dynamic Attribute Names and Values
Rendering with Template Strings or H Function
Advanced Usage
Props
Custom Elements
Slots
Conclusion
Additional Resources
1. Introduction
Pixel is a JavaScript framework designed to enhance creativity and speed in building web applications. It provides a flexible and intuitive way to create interactive user interfaces using a declarative syntax. Pixel leverages reactive data and efficient rendering to deliver high-performance applications.

2. Installation
To use Pixel, you need to include the Pixel library in your project. You can install Pixel via npm or include it directly in your HTML file using a script tag. Here are the installation options:

Using npm;
npm install pixel-framework
Using a script tag:

<script src="https://cdn.pixel.com/pixel.js"></script>
3. Getting Started
Once you have Pixel installed in your project, you can start using it by importing the necessary components. Here's an example of how to import the required modules:


import { PixelBuild, Template, data, H, NodeMake } from 'pixel-framework';
4. Basic Usage
Let's explore the basic usage of Pixel by going through some key concepts and examples.

Widgets and Instances
In Pixel, you define widgets that encapsulate your UI components. A widget is an independent entity that can have its own state and behavior. To create a widget, use the PixelBuild function.


const { PixelBuild } = Pixel;
const widget = PixelBuild({
  instance() {
    // Initialize widget state
    return {
      count: 0,
    };
  },
  build() {
    // Define the widget's template
    return Template`<button>{{ count }}</button>`;
  },
});
Template Strings
Pixel uses template strings to define the structure of your UI components. Inside template strings, you can use double curly braces ({{ }}) for string interpolations. For example, {{ count }} will be replaced with the value of the count property.


const { Template } = Pixel;
const widget = PixelBuild({
  // ...
  build() {
    return Template`<button>{{ count }}</button>`;
  },
});
Methods and Reactive Data
To define methods for your widget, use the method option in the widget's options object. You can also make your data reactive by using the data function from Pixel.


const { data } = Pixel;
const widget = PixelBuild({
  instance() {
    let count = data(0); // Make the count reactive
    return { count };
  },
  build() {
    return Template`<p>{{ $data.count }}</p>`;
  },
});
Binding Attributes
To bind an attribute name to a value, use double asterisks (**). For example, **class='$data.count' will bind the class attribute to the value of count.


const widget = PixelBuild({
  // ...
  build() {
    return Template`<p **class='$data.count'>Hello, Pixel!</p>`;
  },
});
Dynamic Attribute Names and Values
You can use square brackets ([]) to specify dynamic attribute names or values. Inside the brackets, you can use expressions or access properties from the reactive data object ($data). Here's an example:


const widget = PixelBuild({
  // ...
  build() {
    return Template`<p **[name]='$data.value'>Dynamic Attribute</p>`;
  },
});
Pixel Directives
Pixel provides directives that allow you to conditionally display elements or skip the compilation of an element's children. Here are some commonly used directives:

**if='condition': Conditionally display the element if the condition is true.
**if-else='condition': Conditionally display the element based on the condition. If the condition is false, the else block will be rendered.
**else='condition': Conditionally display the else block if the condition is true.
**skip: Skip the compilation of the element's children.
Here's an example of using the **if directive:


const widget = PixelBuild({
  // ...
  build() {
    return Template`
      <div>
        **if='$data.loggedIn'
          <p>Welcome, User!</p>
        **else
          <p>Please log in to continue.</p>
      </div>
    `;
  },
});
Rendering with Template Strings or H Function
You have two options for rendering your UI components: using template strings or the H function.

Template Strings
Template strings allow you to define your UI structure directly. You can use plain HTML tags or even include other widgets. If you have multiple elements, wrap them in an array.


const widget = PixelBuild({
  // ...
  build() {
    return Template`
      <div>
        <p>Header</p>
        <input type="text">
      </div>
    `;
  },
});
H Function
The H function provides a more programmatic way of building your UI. It takes the element name as the first argument, followed by attributes and children. Children can be plain texts, other H objects, or widget instances.


const widget = PixelBuild({
  // ...
  build() {
    return H('div', null, [
      H('p', null, 'Header'),
      H('input', { type: 'text' }),
    ]);
  },
});
5. Advanced Usage
In addition to the basics, Pixel offers some advanced features that can enhance your development experience.

Props
You can pass properties (props) to your widgets to make them more dynamic and reusable. Define the props in the widget's options object and access them in the template using $props. Here's an example:


const widget = PixelBuild({
  // ...
  properties: {
    name:String
  },
  build() {
    return Template`<p>Hello, {{ $props.name }}!</p>`;
  },
});

// Usage:
<widget name="John" />
Custom Elements
Pixel allows you to create custom elements by using the NodeMake module. You can register your custom elements by calling node.resolve(). This is useful when you want to encapsulate complex functionality into reusable components.

javascript
Copy code
const { NodeMake } = Pixel;
const CustomElement = NodeMake({
  // Custom element options
});

CustomElement.resolve(); // Register the custom element
Slots
Slots provide a way to pass content into your custom elements. You can define slots in your custom element's template using the <slot> tag. The passed content will be ren
const CustomElement = NodeMake({
  // ...
  build() {
    return Template`
      <div>
        <h1>Custom Element</h1>
        <slot></slot>
      </div>
    `;
  },
});

CustomElement.resolve(); // Register the custom element
Usage:


<custom-element>
  <p>Content passed into the slot.</p>
</custom-element>
6. Conclusion
Congratulations! You've learned the basics of using Pixel to empower your creativity and build with speed. You now know how to define widgets, use template strings, handle methods and reactive data, bind attributes, apply directives, and render your UI components. Additionally, you've explored advanced features like props, custom elements, and slots.

Pixel offers a powerful and flexible framework for developing dynamic and interactive web applications. Remember to consult the official Pixel documentation and explore the additional resources for more in-depth information and examples.

7. Additional Resources
To further expand your knowledge and explore more advanced features of Pixel, check out the following resources:

Official Pixel Documentation: https://pixel-docs.com
Pixel GitHub Repository: https://github.com/pixel-framework/pixel
Pixel Community Forum: https://community.pixel.com
These resources provide comprehensive documentation, examples, and a supportive community to help you make the most of Pixel in your projects. Happy coding!
