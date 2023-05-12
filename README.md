# PixelJs
# Pixel js : Empowering Creativity, Building with Speed

### Using Pixel for Creativity



pixel empowers creativity, building with speed.
how to use pixel

Here is a minimal example of using pixel widgets
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

Accepts expressions Like calling a function `{{ func() }}` or conditional rendering `{{ count ? count : 0 }}`
To define the use of custom mustaches tags, define the buildConfig option , in your widget options. then set the delimiters option of an array value, consisting of two string values, whivh opens and closes the string interpolation. e.g
```javascript
export default{
    buildConfig:{
        delimiters:['[[',']]']
    }
}

```

### Methods
to define methods and widget instance functions, use the method options in the widget options.

Functions defined here are automatically exposed to the template instance

### stateful datas

The widget state is initialized on the ***instance*** option methods

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

### Attribute name and data binding

to bind an attribute value , use the double aesterisks

`**class='$data.count'`,  datas passed will be resolved, including the exposed widget instances and methods

for dynamic attribute name,use the block bracket on the attribute on the double asterisks, 
 
` **[name]='$data.value'`

### Pixel directives

Pixel provides a pinch of some useful directives, for extensive development

To skip the compilation of an elements children, add the `**skip` attribute. All children of the element will be skipped while building this element

The `**skip` directive does not need to ne passed a value, but if value is a Boolean value of ` false`, will be removed

### Conditional rendering

To render elements based on some evaluated result of a statement or value, Pixel provides you with the `**if` directive

```javascript
Template`<button **if='false'></button>`
```

this element will not render since the condition is falsy

The `**if-else` directive ,if available on the next element, will be processed if, the `**if`, or previous `**else-if ` if any, evaluated to false

The `**else` directive , displays its element if the previous `**if` or `**else-if` , if any, statements are falsy

### List rendering

list rendering helps you render a widget or an element, from a an iterable value , the resulting value will be available on the element, or widget rendering logic

```javascript
Template` <MyWidget **for='item in $data.Packages'> </MyWidget>`
```
### Display

for template displays, you can either use the  Template strings, if you are close with the html, tags system, or using the Pixel.H render function
example using the H macro
``` javascript
export default{
build(){
    return H('p', { class:'name '}, /*more children like texts or more H objects */ H('input'))
    }
}
```
if there are needs for multiple nodes , there can be wraped in an Array or square brackets e.g

```javascript
return [H('p', 'Header'), H('input')]
```

the first argument is required and  must be a string value of an  element name, or an instance of a widget, other two can be a children or attributes. 

Accepts only three arguments, whereas two can be passed dynamicaly if there are no need for the third, unlike other frameworks where you have to passe a positional arguments or null.

### Properties

for properties, use the widget option, properties, validation can be a type function, or and object consisting of type , default, or required, e.g
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
```
properties will be exposed to the template instance as `$props`
validations will raise a Pixel Error or warn , if failed.


for a custom element, use the Pixel.NodeMake macro, then pass in the props, templates, style and plugins  as an object options.

here is a minimal example on creating a pixel custom element
```javascript
let node=NodeMake({
    /* accepts props, template, style and plugins options */
})

```
to register the custome node ` node.resolve()`

it will be available to use in your widget instance, does not require registration.

if you tend to use in the ***H*** macro, it must be availble , or imported to the namespace.
