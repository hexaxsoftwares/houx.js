
## Houx.js
#### The Transparent Web Framework for Perfectionists 

Welcome to Houx.js, the modern sleek and robust web framework that empowers creative and productive development while Building web apps.

### Overview

**Houx** pronounced as (`horse : hâïrš`), french word for `holly` which means `an evergreen tree`, is a sophisticated modern JavaScript framework partly inspired by the success of Vue.js, designed to streamline the development of dynamic, reactive, and component-based web applications.  
With its intuitive API and elegant architecture, Houx empowers developers to build interactive and complex UIs with simplicity and ease.  
Houx as a robust and revolutionary JavaScript framework that's changing the way we build web applications takes the best of modern web development and combines it with innovative features and a simplified architecture.


**Some Key Features and Capabilities:**

- 🧊 **Component-driven architecture**: Build reusable and modular components with ease known as Houx Widgets.
- 🕋 **Declarative templating**: Write clean and concise templates with Houx intuitive templating syntax.
- 🛣️ **Two-way data binding**: Keep your data in sync with automatic updates.
- 📶 **Powerful state management system**: Manage your application's state with ease with a lightweight builtin state management API.
- 🌐 **Extensive ecosystem**: Leverage a growing community of developers and a wealth of plugins and tools.
- 📝 **Easy to learn**: Houx has a gentle learning curve, making it perfect for developers of all skill levels.
- ⚡ **High-performance**: Houx is optimized for speed and efficiency, ensuring fast and seamless user experiences.
- 🚀 **Flexible and adaptable**: Designed to fit your needs. You can Seamlessly integrate with other libraries , frameworks and existing projects, or use it standalone for new projects..
- 📲 **Virtual DOM**: Optimize performance with a virtual DOM that minimizes DOM mutations and ensures accuracy during DOM reconciliation transform.
- 🎯 **Smart Updates**: Update components only when necessary, reducing unnecessary re-renders.
- 🤽 **Context API**: Share data and functionality between widgets with a simple and efficient API.
- 🧩 **Community-driven**: Join a growing community of developers and contributors.
- 🔖 **Directives**: Extend HTML with custom behaviorial attributes.
- 🪐 **Lifecycle Hooks**: Execute code at specific points in a component's and element's lifecycle.

**Building web applications has never been easier**

 With a strong focus on maintainability, modularity, reusability, and simplicity, Houx makes it easy to build complex web applications without sacrificing performance.


🌐 **Rich Ecosystem**

Houx has a rich ecosystem of tools and libraries that help you build and maintain your application with ease. From a powerful templating engine to a robust routing system, Houx provides everything you need to build fast, efficient, and scalable web applications.

🚇 **Convention over Configuration**

Houx follows the convention over configuration approach, which means you can focus on building your application without worrying about the underlying plumbing.


🎗️ **Just the UI**

Houx is only concerned with the view layer. It doesn't dictate how you manage your state or handle backend logic. This makes it easy to integrate with other libraries and frameworks, such as Redux or GraphQL.

📲 **Virtual DOM**

Houx is optimized for performance and scalability, with a virtual DOM that minimizes DOM mutations and smart updates that only update components when necessary. This means your application will be fast and responsive, even with complex and dynamic user interfaces.

⚛️ **JSX**
 
 Support for JSX, giving you more freedom over the rendering style that best suites your project requirements, use case or coding style.

💫 **TypeScript Support**

An exclusive out of the box support for typescript which optimizes development process and improves debuging.

💪 **Getting Started**

There are several ways through which you can simply get started with Houx depending on your available setup requirements and use case.
If you wish to experience the full power of Houx, we recommend installing the official scaffolding tool , HouxKit.
You can install the houxkit through npm or yarn depending on the availating node manager on your machine.  
The command below installs the houx kit using the npm package installer.
```bash
npm install init:houx
```
This will scaffold a build system with folders separating concerns, like styles, dist, widgets and docs.  
You can use Houx without a HouxKit in the terminal by calling `npm install houx`

if you wants to embed or try houx outside of the terminal by adding a touch of interacting to your project in the browser, you can simply include it directly in your HTML file through a CDN link:

```html
<script src="https://cdn.example.com/houx.js"></script>
```
check the Installation guide for detailed Installation information.

##### Basic Usage

Here’s a simple example to get you started:

```html
<!DOCTYPE html>
<html>
<head>
  <title>Houx.js Example</title>
  <script src="https://cdn.example.com/houx.js"></script>
</head>
<body>
  <div id="app">
    <p>{{ message }}</p>
  </div>

  <script>
    Houx.initBuild({
      model:function(){
        this.message= 'Hello, Houx.js!'
      }
    }).mount('#app');
    //houx will have to call the .mount(selector or DOM node) to get rendered to the DOM
  </script>
</body>
</html>
```

This example demonstrates how to create a basic Houx.js instance and bind data to the DOM.

##### Widgets

Widgets are reusable pieces of your UI. Define an initial entrypoint widget build by calling the `Houx.initBuild()` method: and then registering them with the initBuild.widget call.

```javascript
Houx.initBuild({
  model:function(){
    this.message= 'Hello, Houx.js!'
  }
}).widget('my-widget', {
  template: '<div>A custom widget!</div>'
}).mount('#app');
```

Use your widget in the DOM within the mount root:

```html
<my-widget></my-widget>
```

##### Reactivity System

Houx.js uses a reactive data system to update the DOM when your data changes. When you modify the data, the framework automatically re-renders the affected parts of the UI.

##### Directives

Directives are special tokens in the markup that tell the library to do something to a DOM element or widget instance. Common directives include:

- `$$bind`: Bind a value to an element's attribute.
- `$$on`: Attach an event listener to an element.

Example:

```html
<button $$on:click="increment">Click me</button>
```
> Directives are denoted by prepending a double dollar sign (`$$`) to an attribue.

## Event Handling

Houx.js makes it easy to handle user events. Define methods in your widget and use the `$$on` directive to attach it to an actual houx element vnode:

```javascript
Houx.initBuild({
  data: {
    count: 0
  },
  methods: {
    increment() {
      this.count++;
    }
  }
}).mount('#app);
```
Usage in template
```html
<button $$on:click="increment">Click me</button>
```

##### Data Binding

Houx.js supports both one-way and two-way data binding. Use the `$$model` directive for two-way data binding with form elements:

```html
<input $$model="message">
```

## Lifecycle Hooks

Houx.js provides several lifecycle hooks that allow you to run code at specific stages of a widget's life:

- `postBuild`: Called after the instance is created.
- `postMount`: Called after the instance is mounted.
- `postUpdate`: Called after the instance's data is updated.
- `postDestroy`: Called after the instance is destroyed.

Example:

```javascript
Houx.initBuild({
  model:function() {
    this.message= 'Hello!'
  },
  postBuild() {
    console.log('Instance created!');
  }
});
```
This merely scratches the surface, contact the lifecycle hooks API fore more hooks.

#### Advanced Topics

##### Custom Directives

You can create custom directives to encapsulate reusable behavior:

```javascript
Houx.initBuild({
  //widget options
}).directive('focus', {
  created(vnode, value, modifiers ) {
    el.$element.focus();
  }
});
```
To be used the same way with builtin Directives

##### Plugins

Extend Houx.js functionality with plugins. A plugin is a function that adds an app level functionality to your build:

```javascript

Houx.initBuild({
  //options
}).install({
  plugin:function(build, options){
    
  }
}, {
  //plugin options
});
```
This is meant to be an overview, contact the houx documentation and guides for more explainatory and detailed information.

Ready to experience the power of Houx? Get started with our comprehensive documentation, tutorials, and example projects.

- **Documentation**: [insert link]
- **Tutorials**: [insert link]
- **Example Projects**: [insert link]

Houx is inspired by the success of Vue's API and builds upon the shoulders of giants in the web development community. We're grateful for the contributions and innovations that have paved the way for Houx.

**Join the Community**

Houx is an open-source project with a growing community of developers and contributors. Join us on GitHub, Forum, and Discord to get involved and help shape the future of web development.

- [GitHub](https//:www.github.com/hexaxsoftwares/houx.js)
- Forum: [N/A]
- Discord: [N/A]


**Contributions**

We welcome contributions from the community. To get involved, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a Pull Request.


**License**

Houx is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

Begin your journey with Houx.js by joining the community today and exploring its core features and understanding how it simplifies the complexities of modern web development. With Houx.js, you can focus on creating exceptional user experiences while the framework takes care of the underlying details.

Discover the elegance of Houx.js and elevate your web development projects to new heights by starting your next web project with houx.
