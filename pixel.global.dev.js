  /**
  @param This project, 'PIXEL', is been sponsored by the VORTEX TECHNOLOGY FOUNDATION.
  *Visit 'www.pixel.com/guide' for for more information on the pixel project and documentation of pixel and its development process guide.
  *This is a web JIT development version of Pixel
  *We focus hard on developing and improving our features and perfomance issues, we only need your support to help and encourage us on maintaing this template engine.
  *Thanks for choosing Pixel
  */
const Pixel=(function(global){
  "use strict"
  const log=console.log
  const get_version= 'pixel-0.1.0';//pixel at it's earliest version
  const isEQ=(arg1, arg2)=>arg1===arg2;//checks if arg1 is equal to arg2
  const isArray=Array.isArray;
  const isDate=date=>{
  let res=false;//declare a response variable
    try{
      let value=new Date(date);
      value=Date.parse(date);
      res=isNaN(value) ? false : true;
    }catch(err){
      res=false
    }
    return res
  }
  const toString=Object.prototype.toString;
  const rawVToStr=txt=>toString.call(txt);
  const isSet=val=>isEQ(rawVToStr(val),'object Set');
  const isMap=map=>isEQ(rawVToStr(map), 'object Map');
  const getType=value=>isArray(value) ? 'array' : isDate(value) ? 'date' : isSet(value) ? 'set' : isMap(value) ? 'map' : typeof value;
  const isString=str=>isEQ(getType(str),'string');
  const isNull=arg=>arg==null;
  const isObject=obj=>isEQ(getType(obj),'object');
  const isPObject=obj=>isObject(obj) && !isArray(obj);
  const isPrimitive=val=>!isObject(val) && !isFunction(val) && !isArray(val);
  const hasOwn=Object.hasOwn;
  const assign=Object.assign;
  const defineProperty=Object.defineProperty;
  const entries=Object.entries;
  const mapValue=(obj, arg)=>isNull(obj) ? false : isPObject(obj) ? hasOwn(obj, arg) : isArray(obj) ? obj.includes(arg) : false;
  const isFunction=func=>isEQ(getType(func),'function');
  const isNumber=num=>isEQ(getType(num),'number');
  const isBoolean=bool=>isEQ(getType(bool), 'boolean');
  const isSymbol=sym=>getType(sym);
  const isGT=(val, arg)=>val>arg;//checks if val is greater than arg
  const isLT=(val, arg)=>val<arg;//checks if val is less than arg
  const isGTE=(val, arg)=>val>=arg;//checks if val is greater than or equal to args
  const isLTE=(val, arg)=>val<=arg;
  const $warner=`<<** Pixel Debug **>>.....>>>>>>>`;
  const PixelDebug=msg=>console.warn(`${$warner}\n\n ${msg}`);//pixel warming debugger
  const validWidgetOptions=['build','model','styleClass','widgets','preBuild','onBuilt','preMount','onMounted','preUpdate','onUpdated','preDestroy','onDestroyed','handlers','params','buildConfig','styleSheet','directives','template','name','observer'];//valid widget options---
  const stringBasedOptions=['name','template','styleSheet'];
  const methodBasedOptions=['build','model','preBuild','onBuilt','preMount','onMounted','preUpdate','onUpdated','preDestroy','onDestroyed'];
  const objectBasedOptions=['styleClass','widgets','handlers','params','buildConfig','directives','observer'];
  const isArrayBasedOptions=['params']
  const ObjSize=obj=>isPObject(obj) ? Object.keys(obj).length : isArray(obj) ? obj.length : 0;
  const isValidWidgetOption=opts=>mapValue(validWidgetOptions, opts);//checks if an option is a vslid Pixel widget option
  const HTML_TAGS=['html','head','style','title','body','address','article','aside','footer','header','h1','h2','h3','h4','h5','h6','main','nav','section','blockquote','dd','div','dl','dt','figcaption','figure','li','menu','ol','p','pre','ul','a','abbr','b','bdi','bdo','cite','code','data','dfn','em','i','kbd','mark','q','rp','rt','ruby','s','samp','small','span','strong','sub','sup','time','u','var','audio','map','video','iframe','object','picture','portal','svg','math','canvas','noscript','script','del','ins','caption','col','colgroup','table','tbody','td','tfoot','th','thead','tr','datalist','fieldset','form','label','legend','meter','optgroup','option','output','progress','select','textarea','details','dialog','summary','button']//All html valid tags supported by the Pixel framework
  const IS_HTML_TAG=txt=>mapValue(HTML_TAGS, txt);
  const WEB_COMPONENTS=['template','slot'];//Web components tags , also supported by the Pixel framework
  const HTML_FORM_ELEMENTS=['select', 'textarea','input'];
  const Is_Form_Element=txt=>mapValue(HTML_FORM_ELEMENTS, txt);
  const IS_WEB_COMPONENT=txt=>mapValue(WEB_COMPONENTS, txt);
  const HTML_VOID_TAGS=['base','link','meta','hr','br','wbr','area','img','track','embed','source','input'];//HTML void tags, also supported by the Pixel framework
  const IS_HTML_VOID_TAG=txt=>mapValue(HTML_VOID_TAGS, txt);
  const HTML_DEPRECATED_TAGS=['acronym','noembed','applet','noframes','bgsound','param','big','blink','plaintext','center','rb','content','rtc','dir','shadow','font','spacer','frame','strike','frameset','image','tt','keygen','xmp','marquee','nobr','menuitem'];//HTML obselete and deprecated element. 
  //The above tags are no more been supported by the pixel framework
  const IS_HTML_DEPRECATED_TAG=txt=>mapValue(HTML_DEPRECATED_TAGS, txt);
  const IS_VALID_TAGNAME=(txt)=>{
    if(IS_HTML_TAG(txt)||IS_WEB_COMPONENT(txt)||IS_HTML_VOID_TAG(txt))return true;
    else if(IS_HTML_DEPRECATED_TAG(txt)){PixelDebug(`"${txt}" is an html deprecated tag, and should not be used in new projects\n\nPixel JS does not offer the compilation of obselete elements`);return false;}
    else return false;
  }
  const dataStringTypes=['string','function','object','array','boolean','number','symbol','date'];//Valid javascript datatypes
  const isValidDataStringType=obj=>mapValue(dataTypes, obj);//checks if a string value is a dataTypes return text
  const DataFunctionMap=[String, Function, Object, Array, Date, Symbol, Number, Boolean];
  const Data_Flags=['FLAG_RANGE','NodeList','PATCH_FLAGS',]
  const hasUpperCase=str=>str.match(/[A-Z]/g);
  const hasLowerCase=str=>str.match(/[a-z]/g);
  const hasDigit=dig=>dig.match(/[0-9]/g);
  const NodeTypeMap={ ELEMENT_NODE:1, ATTRIBUTE_NODE:2, TEXT_NODE:3, CDATA_SECTION_NODE:4, ENTITY_REFERENCE_NODE:5, ENTITY_NODE:6, PROCESSING_INSTRUCTION_NODE:7, COMMENT_NODE:8, DOCUMENT_NODE:9, DOCUMENT_TYPE_NODE:10, DOCUMENT_FRAGMENT_NODE:11, NOTATION_NODE:12 }
  const isElementNode=nodeType=>mapValue(NodeTypeMap, nodeType);
  const IsValidElement=el=>isPObject(el) && IS_VALID_TAGNAME(el.localName)  ||  el.isPixel_Fragment;
  const IS_TEXT_NODE=node=>node && isEQ(node.nodeType, NodeTypeMap.TEXT_NODE);
  const IS_ATTRIBUTE_NODE=node=>node && isEQ(node.nodeType, NodeTypeMap.ATTRIBUTE_NODE);
  const IS_ELEMENT_NODE=node=>node && IsValidElement(node) && isEQ(node.nodeType, NodeTypeMap.ELEMENT_NODE);
  const IS_ENTITY_NODE=node=>node && isEQ(node.nodeType, NodeTypeMap.ENTITY_NODE);
  const IS_DOCUMENT_TYPE_NODE=node=>node && isEQ(node.nodeType, NodeTypeMap.DOCUMENT_TYPE_NODE);
  const IS_DOCUMENT_NODE=node=>node && isEQ(node.nodeType, NodeTypeMap.DOCUMENT_NODE);
  const IS_NOTATION_NODE=node=>node && isEQ(node.nodeType, NodeTypeMap.NOTATION_NODE);
  const IS_DOCUMENT_FRAGMENT_NODE=node=>node && isEQ(node.nodeType, NodeTypeMap.DOCUMENT_FRAGMENT_NODE);
  const IS_CDATA_SECTION_NODE=node=>node && IsValidElement(node) && isEQ(node.nodeType, NodeTypeMap.CDATA_SECTION_NODE);
  const IS_PROCESSING_INSTRUCTION_NODE=node=>node && isEQ(node.nodeType, NodeTypeMap.PROCESSING_INSTRUCTION_NODE);
  const IS_ENTITY_REFERENCE_NODE=node=>node && isEQ(node.nodeType, NodeTypeMap.ENTITY_REFERENCE_NODE);
  const IS_COMMENT_NODE=node=>node && isEQ(node.nodeType, NodeTypeMap.COMMENT_NODE);
  const TypeMethods={isString, isFunction, isPObject, isArray, isBoolean, isNumber}
  const isNodeChildren=val=> isString(val) || isArray(val) || isPObject(val) && val && val.isChildWidget || val && isPObject(val) && IS_VALID_TAGNAME(val.type);
  function parseScript(script){return Function(`"use strict"; return (${script})`)();}//helps compile string values to javascript statement
  const createNodeChildrenOrSetAttrs=function(args, element, self){
    if(isNull(args)) return element;
    else if(isNodeChildren(args) || args.isWidget ) element=NodeChildrenManager(args, element, self);
    else if (isPObject(args)) element=AttributeManager(args, element, self);
    return element;
  }
  const GLOBAL_EVENTS=['abort','animationcancel','animationend','animationiteration','animationstart','auxclick','blur','error','focus','canplay','canplaythrough','cancel','change','click','close','contextmenu','dblclick','drag','dragend','dragenter','dragleave','dragover','dragstart','drop','durationchange','emptied','ended','formdata','gotpointercapture','input','invalid','keydown','keypress','load','keyup','loadeddata','loadedmetadata','loadend','loadstart','lostpointercapture','mousedown','mouseenter','mouseleave','mousemove','mouseout','mouseover','mouseup','mousewheel','wheel','pause','play','playing','pointerdown','pointermove','pointerup','pointercancel','pointerover','pointerout','pointerleave','pointerenter','pointerlockchange','pointerlockerror','progress','ratechange','reset','resize','scroll','securitypolicyviolation','seeked','seeking','select','selectstart','selectionchange','slotchange','stalled','submit','suspend','timeupdate','touchcancel','touchend','touchstart','touchmove','transitioncancel','transitionrun','transitioned','transitionstart','waiting'];//Html event names managed by pixel on elements
  const IS_VALID_EVENT_HANDLER=eventName=>mapValue(GLOBAL_EVENTS, eventName);
  function createTxtNode(self, text, parent){
    text=String(text);
    let hasSkip;
    let node;
    if(parent){
      let hasSkip=hasOwn(parent, 'px-skip');
      const Skip=parent['px-skip'];
      hasSkip= hasSkip && isBoolean(Skip) ? Skip : hasSkip ;
    }
    if(text) node=document.createTextNode(text);
    defineProperty(node, 'FLAG_RANGE', {value:0 , configurable:true, writable:true});
    defineProperty(node, 'PATCH_FLAGS', {value:[]});
    if(hasSpecialCharacters(node.textContent) &&  !hasSkip ) node.textContent=resolveAccessor(self.state, node.textContent, self.state ? self.state.config : {}, parent, node);
    defineProperty(node, 'trigger_Effect_Run',{value:Node_Effect_Track.bind({target:node, self:self})});
    return node;
  }
  function createVNode(type, attrs=null, children=null, self={}, ctx){
    const argsCount=arguments.length;
    let element;
    const id=Math.floor(Math.random()*(100000000 * 9999999999999) + 10000000);
    const Pixel_El={
      __PX_ID:`__${id}`,
      widgets:self.widgets || undefined,
      __state:self.state || undefined,
      __params:self.params || undefined
    }
    if(type){
      if(IS_VALID_TAGNAME(type))element=document.createElement(type);
      defineProperty(element, 'px__VNode',{value:id});
      assign(element, Pixel_El);
    }
    defineProperty(element, 'FLAG_RANGE', {value:0 , configurable:true, enumerable: true, writable:true});
    defineProperty(element, 'PATCH_FLAGS', {value:[], configurable:true, enumerable:true, writable:true});
    defineProperty(element, 'NodeList',{value:[], configurable:true, writable:true});
    const attributes=!isNull(attrs) && !isNodeChildren(attrs) && isPObject(attrs) ? attrs : !isNull(children) && !isNodeChildren(children) && isPObject(children) ? children : {}
    if(!isNull(attributes['px-skip'])){
      const name=attributes['px-skip'];
      let item;
      try{
        item=parseScript(name);
        item= item || EvaluateTHIS(self.state, name, element);
      }catch(err){
        try{
          item=EvaluateTHIS(self.state, name, element);
        }catch(error){
          PixelDebug(`${err}`);
        }
      }
      defineProperty(element, 'px-skip', {value:item , configurable:true, enumerable: true});
    }
    if(ctx){
      defineProperty(element, 'ctx',{value: ctx});
      if(ctx.ref) {
        push_Unique(element.PATCH_FLAGS, ctx.ref);
        element.FLAG_RANGE++;
      }
    }
    element=createNodeChildrenOrSetAttrs(arguments[1], element, self);
    element=createNodeChildrenOrSetAttrs(arguments[2], element, self);
    if(element.hasAttribute('px-data')){
      const attr=element.getAttribute('px-data');
      if(attr.includes('.')){
        PixelDebug(`Directive resolver issue::\n\npx-data directive does not support dotted accessor property reference for binding in pixel `);return element;
      }
      if(has_Object_Prop(self.state, attr) || has_Object_Prop(self.state.config.$global.properties)){
        let item;
        try{
          item=get_Object_Value(self.state, attr, true);
        }catch(err){
          item=get_Object_Value(self.state.config.$global.properties, attr)
        }
        set_Object_Value(has_Object_Prop(self.state, attr) ? self.state : has_Object_Prop(self.state.config.$global.properties) ? self.state.config.$global.properties : {} , attr, {value:element})
      }else PixelDebug(`Reference Error:;\n\n '${attr} is referenced on build, but not defined on model`);
    }
    defineProperty(element, 'trigger_Effect_Run',{value:Node_Effect_Track.bind({target:element, self:self})});
    return element;
  }
  function hasSpecialCharacters(value) {// Define the regular expression for special characters
    const regex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    return regex.test(value);  // Test if the value contains any special characters
  }
  function escapeRegExp(string) { return string.replace(/[.!@#%_\,<>:;'"\-=*+?^${}()|[\]\\]/g, '\\$&'); }
  function resolveAccessor(self, str, config, el, node){
    let delimiters= ['{{', '}}'];
    if(config && config.delimiters){
      if(!hasSpecialCharacters(config.delimiters[0]) || !hasSpecialCharacters(config.delimiters[1]) ) PixelDebug(`mustache customization error::\n\n delimeters must match value of special characters\n\ne.g !, @, #, $, %, ^, &, *, (, ),  [, ], {, },  :, ?`); 
      else if(config.delimiters[0].startsWith('${') || config.delimiters[1].startsWith('${')) PixelDebug(`Invalid  delimiter value :: \n\n"$\{" cannot be used as a string mustache delimeter since this are javascript multiline string interpolation technic\n\n Delimeter Configuration failed`);
      else delimiters=config.delimiters;
    }
    if(delimiters && isArray(delimiters) && isEQ(delimiters.length, 2)){
      entries(delimiters).forEach(([key, val])=>{
        if(!isString(val)){
          PixelDebug(`${isEQ(key, 0) ? 'opening' : ' closing' } delimiters value must be passed as a string`);return;
        }
      })
    }
    const open=hasSpecialCharacters(delimiters[0]) ? escapeRegExp(delimiters[0]) : delimiters[0];
    const close=hasSpecialCharacters(delimiters[1]) ? escapeRegExp(delimiters[1]) : delimiters[1];
    const pattern=new RegExp(`${open}(.*?)${close}`, 'g');
    let link;
    if(str.match(pattern)) {
      str=str.replace(pattern, (match, text)=>{
        text=text.trim();
        link=text;
        try{
          let name=text;
          text=EvaluateTHIS(self, text, el);
          if(isNull(text)){
            PixelDebug(`"${name}" is undefined or not on widget model`);
          }
        } catch(err){
          PixelDebug(`accessor Error\n\n "${text}" property was accessed on build, but not defined on build model\n\n ${err}`);return '';
        }
        text= isPrimitive(text) ? String(text) : '';
        if(isString(text) || text && el) {
          push_Unique(el.PATCH_FLAGS, link);
          if(node) {
            push_Unique(node.PATCH_FLAGS, link);
            node.FLAG_RANGE++
          }
        }
        return isNull(text) ? '' : text;
      })
    }
    if(!isNull(str) && el) el.FLAG_RANGE+=1;
    return str;
  }
  function NodeChildrenManager(children, element, self){
    if(isArray(children)){
      for (const [ind, value] of children.entries()){
        element=children_Setup(value, element, self, true);
      }
    }else element=children_Setup(children, element, self, true);
    return element;
  }
  function pxBind(attr, key){
    if(key.startsWith('*')){
      attr=isString(attr) ? parseScript(attr) : attr;
      const ky=key.slice(1);
      return { ky, value:attr };
    }else if(isEQ(key, 'px')){
      attr=isString(attr) ? parseScript(attr) : attr;
      return { ky:key, value:attr };
    }else{
      return { ky:key, value:attr };
    }
  }
  const PixelDirectives=['px-if','px-else','px-else-if','px-html','px-text','px-for','px-skip','px-data','px-slot','px-model','px'];
  const NodeBasedDirectives=['px-html','px-text','px-slot','px-skip','px-model']
  const WidgetUsableDirectives=['px-data','px-for', 'px-if','px-else-if','px-else','px'];
  const isPixelDirective=dir=>mapValue(PixelDirectives, dir);
  const isNodeBaseDirective=dir=>mapValue(NodeBasedDirectives, dir)
  const isWidgetUsableDirective=dir=>mapValue(WidgetUsableDirectives, dir)
  function EvaluateTHIS(obj, str, el){
    // Check if the expression contains semicolons
    if (str.includes(';')) {
      throw new Error('Invalid expression: \n\n";" not allowed\n Only single expressions are allowed.');return;
    }// Use a regular expression to match statements or multiple expressions
    const statementRegex = /^(?:let|var|const|if|for|while|do|switch).*$/;
    if (statementRegex.test(str)) {
      throw new Error('Invalid expression:\n\n Only single expressions are allowed and no statement.');
    }// Use a regular expression to remove comments from the expression by using string .replace regex method
    const commentRegex = /\/\/.*|\/\*[^]*?\*\//g;//comment matching regular expression
    const expressionWithoutComments = str.replace(commentRegex, '');// Use a regular expression to match any remaining unsupported constructs and statement keywords
    const unsupportedRegex = /(?:\.\.|\/\/|\/\*|\*\*|\[=|==\+|-\+|\+=|\-=|\*=|\/=|%=\*\*=|&&=|\|\|=|<=|>=|\breturn\b|\bthrow\b|\bfunction\b|\bnew\b|\btypeof\b|\bdelete\b|\binstanceof\b|\bvoid\b|\bthis\b|\bnull\b|\bundefined\b|\bconst\b|\blet\b|\bvar\bclass\b)/;
    if (unsupportedRegex.test(expressionWithoutComments)) {
      throw new Error('Invalid expression: \n\nUnsupported constructs are not allowed.');
    }
    const getValue = new Function('obj', `with(obj){
      return ${str}}
    `);
    let value;
    let context;
    if(el && el.ctx){
      delete el.ctx.ref;
      context=el.ctx;
    }
      try{
        value = getValue(obj);
      }catch(error){
        try{
          value=getValue(context || {} );
        }catch(err){
          throw new Error(err);
        }
      }
      return value;
  }
  function AttrNameResolver(self, attr, el){
    attr= attr.slice(1);
    const pattern=/\[(.*?)\]/g;
    const matches=attr.match(/\[(.*?)\]/g);
    if(matches){
      let name=''
      attr=matches[0].replace(pattern, (match, text)=>{
        name=text;
        try{
          let suit=parseScript(text);
          suit= !isNull(suit) ? suit : EvaluateTHIS(self.state, text, el);
          if(isNull(suit))PixelDebug(`Value Error::\n\n ${text} value accessor is unefined or does not exist`);
          text=suit;
        }catch(error){
          try{
            text=EvaluateTHIS(self.state, text, el);
          }catch(err){
            throw err;
          }
        }
        return isNull(text) ? '' : text;
      })
      if(el){
        el.FLAG_RANGE+=1;
        push_Unique(el.PATCH_FLAGS, name);
      }
    }
    return `*${attr}`;
  }
  function push_Unique(arr, val){
    try{
      if(arr.includes(val)) do_Nothing();
      else arr.push(val);
    }catch(error){
      PixelDebug(error);
    }
    return arr;
  }
  const navigator_Array=function(str){
    if(!str.includes('.')) return str;
    const navigation=[];
    let link='';
    entries(str).forEach(([k, s])=>{
      if(isEQ(s, '.')){
        navigation.push(link);
        link='';
      }
      if(link.includes('.')) link=link.slice(1);
      link=link.concat(s);
    })
    navigation.push(link);
    link='';
    return navigation;
  }
  function get_Object_Value(obj, str, check = false) {
    if (str.includes('.')) {
      const navigation = str.split('.');
      let value = obj;
      for (const key of navigation) {
        if (check && !hasOwn(value, key)) throw new Error();
        value = value[key];
      }
      return value;
    } else return obj[str];
  }
  function has_Object_Prop(obj, str) {
    if (str.includes('.')) {
      const navigation = str.split('.');
      let value = obj;
      for (const key of navigation) {
        if (!hasOwn(value, key)) return false;
        value = value[key];
      }
    } else {
      if (!hasOwn(obj, str)) return false;
    }
    return true;
  }
  function set_Object_Value(obj, str, item) {
    const path = str.split('.');
    const lastKey = path.pop();
    let currentObj = obj;
    
    for (const key of path) {
      if (!hasOwn(currentObj, key) || !isPObject(currentObj[key])) currentObj[key] = {};
      currentObj = currentObj[key];
    }
    currentObj[lastKey] = item;
    return obj;
  }

  function get_Prop_Path(obj, prop) {
    const stack = [{ object: obj, path: '' }];
    while (isGT(stack.length ,0)) {
      const { object, path } = stack.pop();
      for (const [key, value] of entries(object)) {
        const currentPath = path ? `${path}.${key}` : key;
        if (isEQ(key, prop)) return currentPath;
        if (isPObject(value)) stack.push({ object: value, path: currentPath });
      }
    }
    return '';
  }
  function transpile_From_Hyphen(str) {
    return str.replace(/-+([a-zA-Z])/g, (match, letter) => letter.toUpperCase());
  }
  function compile_to_Hyphen(str) {
    return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
  }
  const parse_Class_Binding=function(self, item, element){
    if(isPObject(item)){
      entries(item).forEach(([key, value])=>{
        if(value) {
          key=key.split(' ')
          for(const cls of key.values()){ element.classList.add(cls);}
        }
      })
    }else if(isArray(item)){
      for(const value of item.values()){
        if(!isString(value)) {
          PixelDebug(`Failed to create element class from bind array data`);return;}
        element.className=`${element.className} ${item}`;
      }
    }else if(isString(item)){
      element.className=`${element.className} ${item}`;
    }
  }
  const parse_Style_Binding=function(self, item, element){
    if(isPObject(item)){
      entries(item).forEach(([key, style])=>{
        if(!isString(style)){ PixelDebug(`Unrecognized stype property value \n\nat at\n "${key}" style property\n\n${element.outerHTML}`); return;}
        key=transpile_From_Hyphen(key)//support for hyphen included css style classess
         element.style[key]=style
      })
    }else if(isArray(item)){
      for(const value of item.values()){
        parse_Style_Binding(self, value, element)
      }
    }else if(isString(item)){
      let splited=item.split(';');
      for(let styling of splited.values() ){
        if(styling && styling.includes(':')){
          const spread=styling.split(':');
          element.style[spread[0]]=spread[1];
        }
      }
    }
  }
  function context_Data(self, value, el){
    let item;
    let name;
    try{
      item=EvaluateTHIS(self.state, value, el) ;
      item=!item ? value : ''
    }catch(err){
      throw new Error(err)
    }
    return item
  }
  function AttributeManager(attrs, element, self){
     if(!isPObject(attrs))return;
     entries(attrs).forEach(([key, attr ])=>{
      if(key.startsWith('*')){
         let name;
         let item;
        key=AttrNameResolver(self, key, element);
         // context_Data(self.state, attr, element)
         try{
           const { value, ky }= pxBind(attr, key);
           item=value;
           name=ky;
        }catch(err){
          try{
            name=key;
            item=EvaluateTHIS(self.state, attr, element);
            if(!item && isNull(item)){
              PixelDebug(`value"${attr}" property value was accessed during render, but not initialized on model or is undefined\n\nat at\n ..."${name} attribute on ${element.localName} element`);
              return;
            }else{
              element.FLAG_RANGE+=1;
              push_Unique(element.PATCH_FLAGS, attr);
            }
          }catch(error){
            // let item=parse_Obj_Scope(self.state, attr);
            
             PixelDebug(`value "${attr}" property value was accessed during render, but not initialized on model\n\nat at\n \n${element.outerHTML}\n\n..."${name} \n${error}`);
             return;
          }
        }
        if(!isNull(name)){
          if(isEQ(name, 'style') || isEQ(name.slice(1), 'style') && isPObject(item)){
            parse_Style_Binding(self, item, element)
          }else if(IS_VALID_EVENT_HANDLER(name.slice(1))){
            name=name.slice(1)
            if(!isFunction(item)){
              PixelDebug(`"${name}" event must be passed as  a function \n \n`);return;
              }
              element.addEventListener(name, isFunction(item) ? item : do_Nothing);
           }else if(isEQ(name.slice(1), 'class') || isEQ(name, 'class')){
             parse_Class_Binding(self, item, element)
          }else if(isPixelDirective(name) || isPixelDirective(name.slice(1))){
            PixelDebug(`Disallowed data bind for directive\nat........\n${name.startsWith('*') ? name.slice(1) : name} attribute`);return;
          }else{
            element.setAttribute(name.slice(1), item);
          }
        }
      }else if(IS_VALID_EVENT_HANDLER(key.slice(1).toLowerCase())){
          const event=key.slice(1).toLowerCase();
          if(!isFunction(attr)){PixelDebug(`"${event}" event must be wrapped as  a function `);return;}
            element.addEventListener(event, isFunction(attr) ? attr : do_Nothing);
      }else if(isPixelDirective(key)){
         element=ResolveDirectives(self, key, attr, element)
      }else if(isEQ(key,'style')){
        parse_Style_Binding(self, attr, element);
      }else if(isEQ(key, 'class')){
        parse_Class_Binding(self, attr, element)
      }else{
        try{ 
          element.setAttribute(key, attr);
        }catch(err){
          PixelDebug(`Athribute Error::\n\n...unable to set node attribute "${key}\n\n ${err}`);
          return;
        }
      }
     })
     return element;
  }
  function ResolveDirectives(self, key, attr, el){
    let item;
    let name;
    try{
      const { value, ky }= pxBind(attr, key);
      item=value;
      name=ky;
    }catch(err){
      try{
        name=key;
        item=EvaluateTHIS(self.state, attr, el) ;
        item = item ? item : isEQ(name, 'px-html') || isEQ(name, 'px-text') ? `${attr}` : item
        if(!item && isNull(item)){
          PixelDebug(`value "${attr}" property value was accessed during render, but not initialized on model or is undefined\n\nat at\n ..."${name} directive on ${el.localName} element`);
          return;
        }else{
          el.FLAG_RANGE+=1;
          push_Unique(el.PATCH_FLAGS, name);
        }
      }catch(error){
        PixelDebug(`value "${attr}" property value was accessed during render, but not initialized on model\n\nat at\n ..."${name} Directive on ${el.localName} element`);
        return;
      }
    }
    if(isEQ(name, 'px')){
      
    
    }if(isEQ(name, 'px-for')){
      do_Nothing()//
    }else if(isEQ(name, 'px-html')){
      let bra
      try{
        bra=parseScript(item)
      }catch(error){
        try{
          get_Object_Value(self.state, item, true)
          bra=EvaluateTHIS(self.state, item, el) || item;
        }catch(err){
          PixelDebug(`value "${item}" property value was accessed during render, but not initialized on model or is undefined\n\nat at\n ..."${name} directive on ${el.localName} element`);return
        }
      }
      
      if(bra && isPrimitive(bra)) {
        el.innerHTML=!isNull(bra) ? bra : '';
        el.FLAG_RANGE+=1;
        push_Unique(el.PATCH_FLAGS, item);
      }
    }else if(isEQ(name, 'px-text')){
      let bra
      try{
        bra=parseScript(item)
      }catch(error){
        try{
          get_Object_Value(self.state, item, true)
          bra=EvaluateTHIS(self.state, item) || item;
        }catch(err){
          PixelDebug(`value "${item}" property value was accessed during render, but not initialized on model or is undefined\n\nat at\n ..."${name} directive on ${el.localName} element`);return;
        }
      }
      if(bra && isPrimitive(bra)) {
        el.innerText=!isNull(bra) ? bra : '';
        el.FLAG_RANGE+=1;
        push_Unique(el.PATCH_FLAGS, item);
      }
    }else if(isEQ(name, 'px-data')){
      el.setAttribute('px-data', item)
    }else if(isEQ(name, 'px-slot')){   
      if(!isString(item)){
        PixelDebug(`value Error::\n\n slot name undefined or is not a string\n\n Error resolving slot name`);return;
      }
      el.setAttribute(name.slice(3), item);
    }else if(isEQ(name, 'px-model')){
      if(!Is_Form_Element(el.localName)){
        PixelDebug(`Compilation Error::\n\n cannot bind a data mode for a none input element`);return;
      }
      let initVal='';
      try{
        initVal=get_Object_Value(self.state, item, true) || "";
      }catch(err){
        PixelDebug(`undefined reference for directive "px-model"\n\n "${item}" is not defined on widget model instance\n\n${err}`);
      }
      el.value=initVal;
      el.addEventListener('input', ()=>{
        try{
          set_Object_Value(self.state, item , el.value );
        }catch(err){
          throw new Error(err)
        }
      });
    }
    return el;
  }
  function getLoopData(str){
    const keyValueRegex=/(\[[\s]?(([a-zA-Z]*)[\s]?([\,][\s]?([a-zA-Z]*)?)?)[\s]?\]\s+([a-z]+)\s([a-zA-Z.\-\_\$]+))/;
    const valueRegex=/(([a-zA-Z]+)\s+([a-zA-Z]+)\s+([a-zA-Z.\-\_\$]+))/;
    const Loop_Data={}
    if(str.match(keyValueRegex)){
      str=str.replace(keyValueRegex,(match,p1, p2, key, rud, val,  type, obj)=>{
        defineProperty(Loop_Data, 'key', {value:key});
        if(val) defineProperty(Loop_Data, 'value',{value:val});
        defineProperty(Loop_Data, 'type', {value:type});
        defineProperty(Loop_Data, 'obj',{value:obj});
        return match;
      })
    }else if(str.match(valueRegex)){
      str=str.replace(valueRegex,(match, p1, key, type, obj)=>{
        defineProperty(Loop_Data,'key',{value:key});
        defineProperty(Loop_Data,'type',{value:type});
        defineProperty(Loop_Data, 'obj' ,{value:obj});
        return match;
      })
    }else{
      PixelDebug(`Usupported Loop format in 'px-for'\n\n"${str}" is not recognised`);return;
    }
    return Loop_Data
  }
  function For_Loop_MNG(self, attr){
    const data=getLoopData(attr);
    if(!data) return ;
    let dataObject;
    let ref;
    try{
      dataObject=EvaluateTHIS(self.state, data.obj);
      ref=data.obj;
    }catch(error){
      PixelDebug(`Trouble accessing '${data.obj}' object for px-for loop\n\nnot found on instance or is undefined\n\n${error}`);return;
    }
    if(!dataObject || !isPObject(dataObject) && !isArray(dataObject)){
      PixelDebug(`Undefined scope for px-for, \n\n${data.obj} not iterable`);return ;
    }
    const Valid_LoopType=['of','in'];
    if(!mapValue(Valid_LoopType, data.type)){
      PixelDebug(`Iteration issue\n\n"${data.type}" is not an iterator\n "of" or "in" only supported by Pixel`);return;
    }
    return { obj:dataObject, keyName:data.key, valRef:data.value, loopType:data.type, ref }
  }
  function VNodeManager(options, self){
    const { type, attrs, children }=options;
    if(!type)return;
    let node;
    if(attrs && hasOwn(attrs, 'px-for')){
      let wrapper;
      const { obj, keyName, valRef, loopType, ref }=For_Loop_MNG(self, attrs['px-for']);
      wrapper=createFragment()
      if(isEQ(loopType,'of')){
        if(valRef){
          for(const [ky, vl] of  entries(obj)){
            const ctx={[keyName]:ky, [valRef]:vl, ref};
            const loopNode=createVNode(type, children || null, attrs || null, self, ctx);
            wrapper.append(loopNode);
            wrapper.NodeList.push(loopNode);
          }
        }else{
          for(const [ky] of entries(obj)){
            const ctx={[keyName]:ky,  ref};
            let loopNode=createVNode(type, children || null, attrs || null, self, ctx);
            wrapper.append(loopNode);
            wrapper.NodeList.push(loopNode)
          }
        }
      }else if(isEQ(loopType, 'in')){
        if(valRef){
          for(const [ky, vl] in  entries(obj)){
            const ctx={[keyName]:ky, [valRef]:vl, ref};
            const loopNode=createVNode(type, children || null, attrs || null, self, ctx);
            wrapper.append(loopNode);
            wrapper.NodeList.push(loopNode)
          }
        }else{
          for(const ky in obj){
            const ctx={[keyName]:ky,  ref};
            let loopNode=createVNode(type, children || null, attrs || null, self, ctx);
            wrapper.append(loopNode);
            wrapper.NodeList.push(loopNode)
          }
        }
      }
      node=wrapper
    }else node=createVNode(type, children || null, attrs || null, self);
    return node;
  }
  function H(type, attrs=null, children=null){
    const argsCount=arguments.length;
    if(!type){ PixelDebug('error loading vnode type\n\ntype for H Vnode  function is not defined'); return; }else if(argsCount>3){PixelDebug(`H Vnode function cannot accept more than 3 arguments, \n\n "${ argsCount }" received`);return;}
    if(isPObject(type) || isFunction(type)){
      if(Boolean(type.is_Custom_Node)){
        return new type.element;
      }
      type=isFunction(type) ? type : Object.create(type);
      defineProperty(type, 'isWidget',{value:true, enumerable:true});
      let attributes;
      let child;
      if(!isNull(children)){
        if( children.isWidget || isNodeChildren(children))type.children=!isArray(children) && !isString(children) ? [children] : children;
        else if(isPObject(children))type.attributes=children;
      }
      if(!isNull(attrs)){
        if(attrs.isWidget || isNodeChildren(attrs))type.children=!isArray(attrs) && !isString(attrs) ? [attrs] : attrs;
        else if(isPObject(attrs))type.attributes=attrs;
      }
      return type;
    }else if( isString(type)){
      if (IS_VALID_TAGNAME(type))type=type;
      else{// return a nodeMake instance
        try{
          let texter=createVNode('body');
          let temp=`<${type} ></${type}>`
          texter.innerHTML=temp;
          const nodeMake=texter.childNodes[0];
          type=Boolean(nodeMake.is_Custom_Node) ? nodeMake : type
        }catch(err){
          throw new Error(err)
          PixelDebug(`invalid element tagname\n\n"${type}" is not a valid html tag name`); return;
          
        }
      }
    }
    if(isEQ(argsCount,1))return { type };
    else if(isEQ(argsCount,2)){
      if (isNodeChildren(attrs) || attrs.isWidget) return { type, children:attrs };
      else if(isPObject(attrs)) return { type, attrs };
    }else if(isEQ(argsCount,3)){
      if (isNodeChildren(attrs) || attrs &&  attrs.isWidget && isPObject(children))return { type, children:attrs, attrs:children }
      else if(isPObject(attrs) && isNodeChildren(children) || children && children.isWidget ) return { type, attrs, children };
      else PixelDebug(`invalid value pased to HyperScript function, \n ...\nat...>>>>>\n\n"${attrs}" <<and>>> "${children}"`);return;
    }
  }
  class Widget {
    constructor(){}
    static isClassBasedWidget=true;
  }
  class PXWidget extends Widget{
    constructor(self){ super();
    }
    static BUILT_IN_WIDGET=true;
    params={ self:{ type:[Object, Function, String], required:true}}
    build({self}){ 
      return H(self, this.$attrs);}
  }
  class Fragment extends Widget{
    constructor(){ super(); }
    static BUILT_IN_WIDGET=true;
    build(){ return [H('slot')];}
  }
  const BUILT_IN_WIDGETS={ Fragment,'px-widget':PXWidget}
  const modelManager=function(opts,self){
    if(!isNull(opts.model)){
      if(!isFunction(opts.model)){
        PixelDebug(`widget model option must be a function,\n\n and .....>>>>>\n`);return;
      }else{
        defineProperty(self.state, '$data',{value:{},configurable:true, enumerable:true});
        const modelReturnObj=opts.model.call(self.state);
        if(!isPObject(modelReturnObj)){ PixelDebug(`\nmodel method must return an object`);return;}
        entries(modelReturnObj).forEach(([key, value])=>{
          if(isPObject(value) && value._data_flag){
            defineProperty(self.state.$data, key, {value: !isNull(value.value) ? value.value : null, enumerable: true, writable: true, configurable:true});
          }else{
            defineProperty(self.state, key, {value: value, enumerable: true, writable: true, configurable:true});
          }
        });
      }
    }
  }
  const widgetsSetup=function(opts, self){
    if(!isNull(opts.widgets)){
      if(!isPObject(opts.widgets)){
        PixelDebug(`widget option must be an object,\n \n invalid value  "${getType(opts.widgets)}" found`);
        return;
      }else{
        entries(opts.widgets).forEach(([key, widget])=>{
          if(!hasUpperCase(key.at(0)) && !key.includes('-') && !key.includes('_') && hasDigit(key.at(0)) && !hasDigit(key)){
            PixelDebug(`Widget registration failed, improper widget namecasing found at "${key}"\n\nwidget names must atleast start with an uppercase letter or a multi-word string seperated by a hyphen or an underscore`);return;
          }
        })
        
        self.widgets=opts.widgets || undefined;
      }
    }
  }
  const checkDataType=function(obj){
    if(isNull(obj))return false;
    entries(obj).forEach(([ind, val])=>{
      val=isFunction(val) ? val() : val;
      if(!isValidDataType(val)){
        PixelDebug(`validation type for "${ind}" is not a valid javascript data type \n\nat at\n unable to resolve "${val}" `);
        return false;
      }
    })
    return true;
  }
  const methodsManager=function(opts, self,){
    if(opts.handlers && isPObject(opts.handlers)){
      self.handlers={};
      entries(opts.handlers).forEach(([ind, method])=>{
        if(!isNull(method) && !isFunction(method)){
          PixelDebug(`widget method option's values must be a method or a function\n\n type of "${getType(method)}" found`);return;
        }
        method=method.bind(self.state);
        defineProperty(method, 'pixel_handler',{value:true})
        defineProperty(self.state, ind, {value:method})
        defineProperty(self.handlers, ind, {value:method})
      });
    }else if(!isNull(opts.handlers) && !isPObject(opts.handlers)){
      PixelDebug(`widget handlers option must be an "object"\n\n........>>>> invalid "typeof ${getType(opts.handlers)}"   found`);return;
    }
  }
  const paramsManager=function(opts, self){
    let param;
    const params=opts.params || opts.params || undefined;
    const attrs=opts.attributes || opts.attrs || undefined;
    if(opts.isFunctionalWidget){
      if(attrs && isPObject(attrs) && !params){
        defineProperty(self.state, '$attrs',{value:{}})
        entries(attrs).forEach(([ind, attr])=>{
          self.state.$attrs[ind]=attr;
        });
      }
    }
    let paramsSet;
    if(params && isPObject(params) || isArray(params)){
      if(self.is_Custom_Node){
        defineProperty(self, '$params',{value:{}})
        paramsSet=self.$params;
      }else{
        defineProperty(self.state, '$params',{value:{}})
        defineProperty(self.state, '$attrs',{value:{}})
        paramsSet=self.state.$params;
      }
      entries(params).forEach(([ind, param])=>{
        if(isPixelDirective(ind)){
          PixelDebug(`Params "${ind}" pased to widget is a pixel directive,\n\nMay not be used as a params identifier`);return;
        }
        if(isFunction(param)){
          if(!mapValue(attrs || {}, ind)){
            defineProperty(paramsSet,ind,{value:''});return;}
        }else if(isArray(params) && isString(param)){
          defineProperty(paramsSet, param, {value: '', configurable: true});return;}
        if(isPObject(param) && param.required && isNull(param.default)){
          if(!mapValue(attrs || {}, ind)){
            PixelDebug(`validation error........\n\nrequired property is empty\n\nat at\n  .....${ind}`);
            defineProperty(paramsSet,ind,{value:'' });
            return;}
        }else if(isPObject(param) && !isNull(param.default) && !param.required){
          const defaultValue=isFunction(param.default) ? param.default() : param.default;
          if(!mapValue(attrs || {}, ind)){
            if(isFunction(param.type) && !isEQ(getType(param.type()), getType(defaultValue))){
              PixelDebug(`validation error .....\n\n
              property validation for widget default value failed, property "${ind}" is of an invalid type\n\n typeof "${getType(param.type())}" expected`);
              return;
            }else if(isArray(param.type)){
              let truthy=false;
              for (const [key, val] of param.type.entries()){
                if(isEQ(getType(val()), defaultValue)){
                  truthy=true;
                  defineProperty(paramsSet, ind, {value: defaultValue});
                }
              }
              if(!truthy){
                PixelDebug(`validation error  .......\n\nproperty validation for widget failed, property "${ind}" is of an invalid type\n\n matches no type in the validation list`);
                defineProperty(paramsSet,ind,{value:''});return; 
              }
            }else{
              defineProperty(paramsSet,ind,{value:defaultValue });
            }
          }
        }else if(isPObject(param) && !isNull(param.default) && Boolean(true)){
          PixelDebug(`validation error  .......\n\nthe required validator should not be truthy alongside a default value\nat at\n\n"${ind}`);
          return;
        }
      })
      entries(attrs || {}).forEach(([ind, attr])=>{
        if(isPObject(params) && mapValue(params || {}, ind)){
          param=params[ind];
          if(isFunction(param)){
            if( !isEQ(getType(param()), getType(attr))){
              PixelDebug(`validation error  .......\n\nproperty validation for widget failed, property "${ind}" is of an invalid type\n\n typeof "${getType(param())}" expected`);
              defineProperty(paramsSet,ind,{value:''});
              return; 
            }else{
              defineProperty(paramsSet,ind,{value:attr});
            }
          }else if(isArray(param)){
            let truthy=false;
            for (const [key, val] of param.entries()){
              if( isEQ(getType(val()), getType(attr))){
                truthy=true;
                defineProperty(paramsSet, ind, {value: attr});return;
                break;
              }
            }
            if(!truthy){
                PixelDebug(`validation error  .......\n\nproperty validation for widget failed, property "${ind}" is of an invalid type\n\n matches no type in the validation list`);
                defineProperty(paramsSet,ind,{value:''});return; 
            }
          }else if(isPObject(param)){
            if(!param.type){
              PixelDebug(`validation error  ......\n\nno type definition found at param validation for widget \n\nat\n"${ind}"`);
              defineProperty(paramsSet,ind,{value:''});return;
            }
            if(isFunction(param.type)){
              if(isNumber(param.type())) attr=Number(attr)
              if(isNumber(param.type()) && isNaN(attr) || !isEQ(getType(param.type()), getType(attr))){
                PixelDebug(`property validation for widget failed, property "${ind}" is of an invalid type\n\n typeof "${getType(param.type())}" expected`);
                defineProperty(paramsSet,ind,{value:''});return ;
              }else defineProperty(paramsSet,ind,{value:attr});
            }else if(isArray(param.type)){
              let truthy=false;
              for (const [key, val] of param.type.entries()){
                if(isEQ(getType(val()), getType(attr)) ){
                  truthy=true;
                  defineProperty(paramsSet, ind, {value: attr});
                  break;
                }
              }
              if(!truthy){
                PixelDebug(`validation error  .......\n\nproperty validation for widget failed, property "${ind}" is of an invalid type\n\n matches no type in the validation list`);
                defineProperty(paramsSet,ind,{value:''});return; 
              }
            }
          }
        }else if(isArray(params) && params.includes(ind)){
          entries(params).forEach(([key, val])=>{
            if(isEQ(val, ind)){
              defineProperty(paramsSet, val,{value: attr || ''})
            }
          })
          
        }else if(!mapValue(params, ind)){
          defineProperty(self.state.$attrs, ind,{value:attr || '', enumerable: true, configurable:true});
        }
      });
      if(params){
        for(const [key, par] of entries(params)){
          if(par.validator){
            if(!isFunction(par.validator)){
            PixelDebug(`Error resolving Validation \n\n at at\n${key} params, must be a method`);return;}
            let value=paramsSet[key];
            const result=par.validator(value);
            if(!Boolean(result)){PixelDebug(`Validation Error\n\nCustom validation for "param" ${key} failed`);return}
          }
        }
      }
    }else if(params && !isPObject(params) && !isArray(params)){
      PixelDebug(`params value for widget is of an invalid pattern,  must be an object or an árray\n typeof "${getType(params)}" found`);return;
    }
  }
  const setupBeforeBuildHook=function(opts, self){
    if(!isNull(opts.preBuild)){
      if(!isFunction(opts.preBuild)){
        PixelDebug(`"preBuild Callback" hook must be a function \n\n type of "${getType(opts.preBuild)}" found`);return;
      }
      self.preBuild=opts.preBuild.bind(self.state={});
      self.preBuild();
    }
  }
  const setupOnBuiltHook=function(opts, self, wheel){
    if(isGT(wheel, 1))return;
    if(!isNull(opts.onBuilt)){
      if(!isFunction(opts.onBuilt)){
        PixelDebug(`"onBuilt Callback" hook must be a function \n\n type of "${getType(opts.onBuilt)}" found`);return;
      }
      self.onBuilt=opts.onBuilt.bind(self.state);
      self.onBuilt();
    }
  }
  const setupBeforeMountHook=function( opts, self, wheel){
    if(isGT(wheel, 1))return;
    if(!isNull(opts.preMount)){
      if(!isFunction(opts.preMount)){
        PixelDebug(`"preMount Callback" hook must be a function \n\n type of "${getType(opts.preMount)}" found`);return;
      }
      self.preMount=opts.preMount.bind(self.state);
    }else self.preMount=do_Nothing;
  }
  const setupMountedHook=function(opts, self, wheel ){
    if(isGT(wheel, 1))return;
    if(!isNull(opts.onMounted)){
      if(!isFunction(opts.onMounted)){
        PixelDebug(`LifeCycle Error::\n\n"onMounted callback" hook must be a function \n\n type of "${getType(opts.onMounted)}" found`);return;
      }
      self.onMounted=opts.onMounted.bind(self.state);
    }else self.onMounted=do_Nothing;
  }
  const setupBeforeUpdateHook=function(opts, self, wheel){
    if(isLTE(wheel, 1))return;
    if(!isNull(opts.preUpdate)){
      if(!isFunction(opts.preUpdate)){
        PixelDebug(`"preUpdate Callback" hook must be a function \n\n type of "${getType(opts.preUpdate)}" found`);return;
      }
      self.preUpdate=opts.preUpdate.bind(self.state);
      self.preUpdate();
    }else self.preUpdate=do_Nothing;
  }
  const setupOnUpdatedHook=function(opts, self, wheel){
    if(isLTE(wheel, 1))return;
    if(!isNull(opts.onUpdated)){
      if(!isFunction(opts.onUpdated)){
        PixelDebug(`"onUpdated Callback" hook must be a function \n\n type of "${getType(opts.onUpdated)}" found`);return;
      }
      self.onUpdated=opts.onUpdated.bind(self.state);
    }else self.onUpdated=do_Nothing;
  }
  
  const compileStyleClasses=function(opts, self){
    if(!isNull(opts.styleClass && isPObject(opts.styleClass))){
      self.state.$styles={};
      entries(opts.styleClass).forEach(([ind, style])=>{
        if(!isNull(style) && !isPObject(style)){
          PixelDebug(`property value of style is of an invalid type, an object required....>>\n\n.....typeof ${getType(style)} fount`); return;
        }
        self.state.$styles[ind]=style;
      })
    }else if(!isNull(opts.styleClass && !isPObject(opts.styleClass))){
      PixelDebug(`invalid option.......\n\n styleClass option must be an object, typeof "${getType(styleClass)}" found`);return;
    }
  }
  const validateWidgetOptions=function(opts, self){
    const exist=[];
    entries(opts).forEach(([ind, val])=>{
      if(!exist.includes(ind))exist.push(ind);
      else{ PixelDebug(`widget options error\n\n....duplicate property "${ind} found on widget`);return;}
    });
  }
  const hydration_Compile=function(opts, self, el){
    if(!el.Pixel_NodeMake && IsValidElement(el) && !el.isPixel_Fragment){
      let inheritStyles=true;
      let inheritAttrs=true;
      if(!isNull(self.state.config)){
        if (!isNull(self.state.config.inheritStyles) && isBoolean(self.state.config.inheritStyles)) inheritStyles=isBoolean(Boolean(self.state.config.inheritStyles)) ? Boolean(self.state.config.inheritStyles) : inheritStyles;
        if (!isNull(self.state.config.inheritAttrs) && isBoolean(self.state.config.inheritAttrs)) inheritAttrs=isBoolean(Boolean(self.state.config.inheritAttrs)) ? Boolean(self.state.config.inheritAttrs) : inheritAttrs;
      }
      if(inheritStyles && isPObject(self.state.$styles)){
        entries(self.state.$styles).forEach(([ind, val])=>{
          if(isPObject(val)){
            entries(val).forEach(([key, value])=>{
              el.style[key]=value;
            });
          }else if(isPrimitive(val)){
            el.style[ind]=val;
          }
        });
      }
      if(inheritAttrs && isPObject(self.state.$attrs)){
        
        let attributes=self.state.$attrs
        AttributeManager( attributes, el, self)
        // 
        // entries(self.state.$attrs).forEach(([ind, attr])=>{
        //   if(isEQ(ind, 'class')) el.className=`${el.className} ${attr}`;
        //   else{
        //     try{ 
        //       el.setAttribute(ind, attr);
        //     }catch(err){
        //       PixelDebug(`Athribute Error::\n\n...unable to set node attribute \n\n `);
        //       return;
        //     }
        //   }
        // });
      }
    }
  }
  const setupClassBasedWidget=function(options, self){
    const opts=new options();
    const widget=new Object();
    if(options.attributes) widget.attributes=options.attributes;
    if(options.children) widget.children=options.children;
    
    const waitForReturnObjects=['params','handlers','styleClass','widgets','buildConfig','observer','directives'];
    entries(validWidgetOptions).forEach(([key, val])=>{
      if(!isNull(opts[val])){
        let value=opts[val];
        if(mapValue(waitForReturnObjects, val) && isFunction(value))value=opts[val]();
        widget[val]=value;
      }
    })
    entries(opts).forEach(([key, val])=>{
      if(!mapValue(validWidgetOptions, key ) && !mapValue(['params','ctx'], key)) self.state[key]=val;
    })
    return widget;
  }
  const BasedWidgets=function(opts, self){
    let isFunctionalWidget=false;
    let isClassBasedWidget=false;
    if(isFunction(opts)){
       if(opts.isClassBasedWidget){
         isClassBasedWidget=true
         opts=setupClassBasedWidget(opts, self);
         defineProperty(opts, 'isClassBasedWidget',{value:isClassBasedWidget});
      }else{
        isFunctionalWidget=true;
        opts=setupFunctionWidget(opts, self);
        defineProperty(opts,'isFunctionalWidget',{value:isFunctionalWidget});
       }
     }
     return opts;
  }
  const sanitizedOptions=function(args, self){
    const count=args.length;
    if(!args){ PixelDebug('error loading widget\n\ntype for Vnode  function is not defined'); return; }else if(isGT(count,3)){PixelDebug(`PixelBuild function cannot accept more than 3 arguments,  "${ count }" received`);return;}
    let widget=H(args[0], args[1], args[2]);
    widget=  set_Widget_Flag(self, widget, widget, 'children');
    return widget;}
  const appendClassToSelector = function(selector, className){
    const trimmed = selector.trim();
    const modified = trimmed ? `.${className}${trimmed}, .${className} ${trimmed}` : trimmed;
    return modified;
  };
  const cssStylesheetCompilation=function(opts, self, el){
    if(opts.styleSheet || opts.styles){
      let CssStylesheet=opts.styleSheet || opts.styles;
      if(!isString(CssStylesheet)){
        PixelDebug(`Invalid Value Type...\n\nstyleSheet must be in string value format`);return;
      }///attempt to add css rules to thw build shadow root
      const styleEl=createVNode('style', { type:'text/css'}, null);
      const id=Math.floor(Math.random()*(100000000 * 9999999999999) + 10000000);
      const selectorPattern = /([^\r\n{]+)\s*{/g;
      const ModifiedCssStylesheet=CssStylesheet.replace(selectorPattern, (match, text)=>{
          text=appendClassToSelector(text, `scoped${el.__PX_ID}`);
          return text+'{';
        });
      styleEl.textContent=/*Modified*/CssStylesheet;
      if(el.isPixel_Fragment){
        el.append(styleEl)
        
      }else if(IsValidElement(el)){
        el.append(styleEl)
      }else return el
    }
    return el;
  }
  const slotHydrateRenderer=function(self, opts, el){
    const childrenArr=opts.children ? opts.children.children : [];
    if(childrenArr && isGT(childrenArr.length,0)){
      const patchFlags=opts.children.patchFlags || {}
      let children=[]
      let fallData=self.state.config.fallThrough || {};
      defineProperty(patchFlags.state, '$fall', {value:fallData})
      entries(childrenArr).forEach(([key, child])=>{
        let value=compileTemplate(child, patchFlags, null, true);
        children.push(value);
        
      })
      defineProperty(self.state,'$slots',{value:{}});
      let template=H('template');
      template=compileTemplate(template, self, el);
      entries(children).forEach(([ind, value])=>{
        if(isEQ(value.localName, 'template')){
          const name=value.getAttribute('slot');
          defineProperty(self.state.$slots, name || 'default', {value: value, configurable: true, enumerable: true});
        }else{
          template.append(value);
          defineProperty(self.state.$slots, 'default', {value: template, configurable: true, enumerable: true});
        }
      })
      const enumerateSlots=function(cont){
        let slotContent=''
        if(isGT(cont.childNodes.length,1)){
          slotContent=createFragment();
          entries(cont.childNodes).forEach(([ind, myel])=>{
            slotContent.append(myel);
          });
        }else{
          if(cont.childNodes.length) slotContent=cont.childNodes[0];
        }
        return slotContent;
      }
      const slots=el.querySelectorAll('slot');
      entries(slots || []).forEach(([ind, slotEl])=>{
        const name=slotEl.getAttribute('name');
        if(name && isString(name)){
          if(self.state.$slots && mapValue(self.state.$slots, name)){
            const slotContent=enumerateSlots(self.state.$slots[name]);
            slotEl.replaceWith(slotContent);
          }
        }else if(!name){
          if(self.state.$slots && mapValue(self.state.$slots, 'default')){
            const slotContent=enumerateSlots(self.state.$slots['default']);
            
            slotEl.append(slotContent);
          }
        }
      });
      if(isEQ(slots.length, 0) && !el.isPixel_Fragment && !el.innerHTML.trim() && IsValidElement(el)){
        let inheritSlots=true;
        if(opts.buildConfig && !isNull(opts.buildConfig.inheritSlots) && isBoolean(opts.buildConfig.inheritSlots)){
          if(!isBoolean(opts.buildConfig.inheritSlots)){
            PixelDebug(`Value Error\n\n "inheritSlots" value cannot be compiled\n boolean value format required`);return;
          }
          inheritSlots=opts.buildConfig.inheritSlots;
        }
        if(!Boolean(inheritSlots))return;
        let slotContent=enumerateSlots(self.state.$slots['default']);
        el.append(slotContent);
      }
    }
  }
  const setConfig=function(opts, self){
    if(opts.buildConfig && isPObject(opts.buildConfig)){
      if(opts.buildConfig.fallThrough){
        if(!isPObject(opts.buildConfig.fallThrough)){
          PixelDebug(`Fallthrough data, unresolved type, \nmust be an object or an array data type`);return;
        }
        entries(opts.buildConfig.fallThrough).forEach(([key, value])=>{
          try{ value=parseScript(value) ;
          }catch(err){ value=EvaluateTHIS(self.state, value);}
          opts.buildConfig.fallThrough[key]=value
        })
      }
      entries(opts.buildConfig).forEach(([key, setting])=>{
        defineProperty(self.state.config, key , {value:setting});
      })
    }else if(opts.buildConfig && !isPObject(opts.buildConfig)){
      PixelDebug(`Value Error\n\nbuild Configuration settings object must be an object type format or is undefined`);
      return;
    }
  }
  const globalProps=['properties','widgets','directives','handlers']
  function MapGlobal(self, options){
    const exceptions=['children','attributes','isWidget','isClassBasedWidget','isFunctionalWidget'];
    const $options={};
    let hasOpts=false
    entries(options).forEach(([key, opts])=>{
      if(!mapValue(exceptions, key) && !isValidWidgetOption(key)){
        $options[key]=opts;
        hasOpts=true;
      }
    })
    if(hasOpts) defineProperty(self.state,'$options',{value: $options});
    defineProperty(self.state,'config',{value:{}});
    defineProperty(self.state.config,'$global',{value:{}});
    for(let prop of globalProps.values()){
      defineProperty(self.state.config.$global, prop,{value:{}, enumerable: true});
    }
  }
  const Observer_Track=function(self, opts){
    if(opts.observer && !isPObject(opts.observer)){
      PixelDebug(`Data error\n\nobserver option must be an object`);return;
    }
    defineProperty(self.state, 'observers',{value: {}})
    entries(opts.observer||{}).forEach(([name, method])=>{
      if(!isFunction(method)){
        PixelDebug(`an observer handler must be a function value`);return;
      }else if(name.includes('.')){
        PixelDebug(`Observer issue::\n\n unsupported dot accessor\n\n, found at "${name}" observer handler`);return;
      }else if(!hasOwn(self.state, name) && !hasOwn(self.state.$data, name) ){
        PixelDebug(`observer undefined reference\n\n no such data as "${name}" define on this widget model instance`);return;
      }
      const path=get_Prop_Path(self.state, name)
       defineProperty(self.state.observers, name, {value:method, enumerable:true});
    })
  }
  function Observer_Depend(self, prop, data){
    if(!self.state.observers)   return;
    for(let [key, func] of entries(self.state.observers)){
      if(isEQ(key, prop)) {
        func=func.bind(self.state);
        func(data[0], data[1], key);
      }
    }
  }
  const Consume_Global_State=function(self){
    defineProperty(self.state, '$base',{value:self.state.config.$global.properties})
    entries(self.state.config.$global.handlers).forEach(([key, value])=>{
      defineProperty(self.state.$base, key, {value})
    })
  }
  function ensureRenderer(self, options){
    modelManager(options, self);
    widgetsSetup(options, self);
    paramsManager(options, self);
    methodsManager(options, self);
    compileStyleClasses(options, self);
    Observer_Track(self, options);
  }
   function PixelBuild(options, params=null, children=[]){
     setupBeforeBuildHook(options, this);
     if(isNull(this)){
       PixelDebug(`build instanciation error\n\nunable to compile build widget,  .......this might be due to missing constructor's "new" keyword in PixelBuild call\n "PixelBuild is a constructor function, must be called with the "new" constructor keyword`);return;}
    options=sanitizedOptions(arguments, this);
    defineProperty(this, 'state',{value:{}})
    MapGlobal(this, options)
    options=BasedWidgets(options, this);
    ensureRenderer(this, options);
    let wheel=0
      setupBeforeUpdateHook(options, this, wheel);
      this.render=function(self, build){
        Consume_Global_State(this)
        setConfig(options, self);
        let node=compileTemplate(build || '', self, null, true) ;
        node=cssStylesheetCompilation(options, self, node);
        slotHydrateRenderer(self, options, node);
        hydration_Compile(options, self, node);//setting the buildConfig option
        wheel+=1;
        setupOnBuiltHook(options, self, wheel);
        setupBeforeMountHook(options, self, wheel);
        setupMountedHook(options, self, wheel);
        return node;
      }
      if(isNull(options.build) && isNull(options.template))options.build=null;
      defineProperty(this, 'build', {value:options.build || options.template , writable:true, enumerable:true});
      //setupOnUpdatedHook(options, this, wheel);
    resolve_Proto_Call(this, options);
  }
  const get_Init_Build=function(self, selector, build){
    if(isFunction(self.build)){
      self.build=self.build.bind(self.state);
      return self.build(self.state.$params||{},{events:self.state.$events || {},attrs:self.state.$attrs || {}, styles:self.state.$styles || {}, slots:self.state.$slots || {}});
    }else if(isString(self.build)){
      return TemplateParser(self.build);
    }else if(isNull(self.build) && selector){
      return TemplateParser(GenerateRoot(selector).innerHTML || '');
    }else return null;
  }
  function resolve_Proto_Call(self, opts){
    new Promise((resolve, reject)=>{
      resolve(self.protoPromisesCalls)
    }).then((data)=>{
      if(!self.hasMountProto){
        self.build=Render_View(self, get_Init_Build(self, null));
      }
      defineProperty(self.state, '$el', {value:self.build})
      delete self.protoPromisesCalls;
      //delete self.render;
      //delete self.widgets;
      delete self.hasMountProto;
      if(!opts.preMount) delete self.preMount;
      if(!opts.onMounted) delete self.onMounted;
      return self;
    })
    return self;
  }
  const GenerateRoot=(nodeSelector)=>{
    if(isNull(nodeSelector)){PixelDebug(`no node model or selector value passed to widget mountroot`); return;}
    let domRoot;
    if(isString(nodeSelector)){
      domRoot=document.querySelector(nodeSelector);
      if(!IsValidElement(domRoot)){
        PixelDebug(`error mounting widget, target not a valid element`);
        return;}
    }else if(IsValidElement(nodeSelector)){
      domRoot=nodeSelector;
    }
    return domRoot
  }
  PixelBuild.prototype.mount=mount;
  function mount(nodeSelector){
    this.hasMountProto=true;
    const domRoot=GenerateRoot(nodeSelector);
    if(!Boolean(domRoot.isPixel_Fragment)) defineProperty(domRoot, 'NodeList',{value:[], configurable:true, writable:true});
    if(!domRoot.PATCH_FLAGS) defineProperty(domRoot, 'PATCH_FLAGS',{value:[], configurable:true, writable:true});
    const initalBuild=get_Init_Build(this, nodeSelector)
    this.build=Render_View(this, initalBuild);
    Hydrate_Reactive_Data(this, initalBuild, nodeSelector, domRoot);
    domRoot.innerHTML='';
    if(domRoot.iS_PIXEL_MOUNTROOT){
      PixelDebug(`A Pixel widget has already been mounted on this element, cannot mount more than one Wdget on a single root element`);return;
    }else{
      const id=Math.floor(Math.random()*(12 * 99) + 766);
      const MoutRootToken={
        iS_PIXEL_MOUNTROOT:true,
        __mountRootToken:'px__'+id,
        widgets:this.widgets || undefined,
        __params: this.params || undefined,
        __state:this.state || undefined
      }
      domRoot.innerHTML='';
      domRoot.append(this.build || '');
      if(Boolean(this.build.isPixel_Fragment)){
        domRoot.NodeList=this.build.NodeList;
      }else{
        domRoot.NodeList=[this.build];
      }
      defineProperty(domRoot, 'px__VNode',{value:id});
      assign(domRoot, MoutRootToken);
      if(domRoot.isPixel_Fragment) defineProperty(domRoot, 'trigger_Effect_Run', {value: Widget_Effect_Trigger.bind({target:this,
      hydrate:(newWidget)=>{ 
        
      },
        initalBuild: initalBuild, root:domRoot})})
      //this.onMounted()
      return domRoot;
    }
  }
  PixelBuild.prototype.widget=widget;
  function widget(Value, obj){
    if(!isString(Value) || !isPObject(obj) && !isFunction(obj)){PixelDebug(`unrecognised global widget registration for ${obj} widget`);return this;}
    if(isEQ(arguments.length,2)){
      if(!isNull(this.state.config.$global.widgets)) this.state.config.$global.widgets[Value]=obj;
      else{
        defineProperty(this.state.config.$global, 'widgets', {value: {}});
        this.state.config.$global.widgets[Value]=obj;
      }
    }
    this.protoPromisesCalls++;
    return this;
  }
  PixelBuild.prototype.install=install;
  function install(plugin, options){
    if(!isNull(plugin) && !isPObject(plugin)){ PixelDebug(`plugin installation Error::\n\n install argument must be an object value with  an exposed plugin installation method`);return this;}
    let usePlugin=plugin.plugin;
    if(usePlugin && isFunction(usePlugin) ){
      plugin.plugin(this, options);
    }
    entries(this.state.config.$global.properties).forEach(([name, value])=>{
      if(isPObject(value) && isEQ(value._data_flag, true)) defineProperty(this.state.$data, name, {value: value.value, configurable: true});
      else defineProperty(this.state, name, {value: value, configurable: true});
    })
    entries(this.state.config.$global.handlers).forEach(([name, method])=>{
      if(!isFunction(method)){
        PixelDebug(`global handler error::\n\n The argument passed to a global handler is not a function\nInvalid dataType`);return this;
      }
      defineProperty(this.state, name, {value: method, configurable: false, enumerable: true});
    })
    this.protoPromisesCalls++
    return this;
  }
  PixelBuild.prototype.property=property;
  function property(name, value){
    if(!isString(name) ){PixelDebug(`unrecognised global property registration for ${value} widget`);return this;}
    if(isEQ(arguments.length,2)){
      if(isPObject(value) && Boolean(value._data_flag) || Boolean(value._deep_data_flag)){
        if(!isNull(this.state.config.$global.properties.$data)){
          this.state.config.$global.properties.$data[name]=value.value;
        }else{
          defineProperty(this.state.config.$global.properties,'$data', {value: {}});
          this.state.config.$global.properties.$data[name]=value.value;
        }
      }else{
        this.state.config.$global.properties[name]=value;
      }
    }
    this.protoPromisesCalls++
    return this;
  }
  PixelBuild.prototype.handler=handler;
  function handler(name, func){
    if(!isString(name) && !isFunction(func)){PixelDebug(`unrecognised global handler registration for ${func}`);return this;}
    if(isEQ(arguments.length,2)){
      if(!isNull(this.state.config.$global.handlers)) this.state.config.$global.handlers[name]=func;
      else{
        defineProperty(this.state.config.$global, 'handlers', {value: {}, configurable: true, enumerable: true, writable: true});
        this.state.config.$global.handlers[name]=func;
      }
    }
    this.protoPromisesCalls++
    return this
  }
  PixelBuild.prototype.directive=directive;
  function directive(name, method){
    this.protoPromisesCalls++
    return this;
  }
  function Render_View(self, initBuild){
    return self.render(self, initBuild);
  }
  const readOnlyStateProps=['$el','$params','$attrs','$data','$events','$styles','$slots','config','$base','observers'];
  const isReadOnlyProp=key=>mapValue(readOnlyStateProp, key);
  function Track_Data_Dependency(dataArray, watchCallback, optionalDepend, accessor){
    const watchers=[];
    let activeWatcher = null;
    class Dependency {
      constructor() {
        this.subscribers = new Set();
      }
      depend() {
        if (activeWatcher) this.subscribers.add(activeWatcher);
      }
      notify() {
        this.subscribers.forEach((watcher) => watcher.update());
      }
    }
    // Watcher
    class Watcher {
      constructor(widget, getter, callback) {
        this.widget = widget;
        this.getter = getter;
        this.callback = callback;
        this.value = this.get();
      }
      update() {
        const oldValue = this.value;
        this.value = this.getter();
        if (this.value !== oldValue) this.callback(this.value, oldValue);
      }
      get() {
        activeWatcher = this;
        const value = this.getter();
        activeWatcher = null;
        return value;
      }
    }
    
    function trackDependency(dependency) {
      if (activeWatcher) dependency.depend();
    }
    function createReactiveObject(obj={}) {
      const dependency = new Dependency();
      Object.keys(obj).forEach((key) => {
        let internalValue = obj[key];
        const dependency = new Dependency();
        if(!readOnlyStateProps.includes(key) && !obj[key].pixel_handler ){
          defineProperty(obj, key, {
            get() {
              trackDependency(dependency);
              return internalValue;
            },
            set(newValue) {
              internalValue= newValue;
              dependency.notify();
              return true;
            }
          });
        }
      });
      return obj;
    }
    function makeReactive(key, data){
      let internalValue=data;
      const dependency=new Dependency();
      defineProperty(optionalDepend || {}, key, {
        get() {
          trackDependency(dependency);
          return internalValue;
        },
        set(newValue) {
          internalValue = newValue;
           dependency.notify();
          return true
        }
      })
    }
    const watch=function(getter, callback){
      const watcher = new Watcher(self, getter, callback);
      watchers.push(watcher);
      watcher.update();
    }
    
    if(isGT(dataArray.length, 0)){
      for (let data of dataArray.values()){
        if(isPObject(data)) createReactiveObject(data);
        else if(!isNull(data))makeReactive(accessor, data)
      }
    }
    const mountWatch=function(watch, dataObj={}){
      for(let key of Object.keys(dataObj) ){//object handler
        if(!readOnlyStateProps.includes(key) && !dataObj[key].pixel_handler){
          watch(()=>dataObj[key],(newV, oldV)=>{
            watchCallback(newV, oldV, key);
          })
        }
      }
    }
    const setWatch=function(watch, dataObj, key){// watch observer for non object pointers
      //with key accessor location helper 
      watch(()=> dataObj[key], (newV, oldV)=>{
        watchCallback(newV, oldV, key);
      })
    }
    if(isGT(dataArray.length, 0)){
      for (let data of dataArray.values()){
        if(isPObject(data)) mountWatch(watch, data);
        else if(!isNull(data)) setWatch(watch, optionalDepend, accessor);
      }
    }
  }
  function Node_Effect_Track(build, key, root, access){
    const newNode=build.NodeList[key];
    //this.target.attributes.isEqualNode(newNode.attributes)
    const data_ref=get_Prop_Path(this.self.state, access);//get the relative path of the reacted data key "access"
    if(!isEQ(this.target.attributes.length, newNode.attributes.length)){
      for(let [key, attr] of entries(newNode.attributes)){
        const { name, value }=attr;
        // AttributeManager({name:value}, this.target, this.self)
        this.target.setAttribute(name, value);
      }
    }else{
      entries(newNode.attributes).forEach(([key, newAttr])=>{
        let oldAttr=this.target.attributes[key]
        if(!oldAttr.isEqualNode(newAttr)){
          if(newAttr){
            const { name, value }=newAttr;
            this.target.setAttribute(name, value);
          }
        }
      })
    }
    if(this.target.hasChildNodes()){
      for(let [ind, node] of entries(this.target.NodeList)){
        if(IS_TEXT_NODE(node)){

          let V=build.NodeList[ind]
          node.textContent=newNode.NodeList && newNode.NodeList[ind] ? newNode.NodeList[ind].textContent : V.textContent//update textContent in cases of test Node
        }else if(IS_ELEMENT_NODE(node)){
          if(isGT(node.FLAG_RANGE, 0) || isGT(node.PATCH_FLAGS.length, 0)){
            let shouldUpdate=false;
            for( let refs of node.PATCH_FLAGS){
              if(isEQ(refs, data_ref) ){
                shouldUpdate=true;
                break;
              }
            }
            if(Boolean(shouldUpdate)){
              node.trigger_Effect_Run(newNode, ind, node, access)
            }
          }
        }else if(IS_DOCUMENT_FRAGMENT_NODE(node) && node.isPixel_Fragment && node.iS_PIXEL_MOUNTROOT){
          node.trigger_Effect_Run()
        }else if(true){
          
          do_Nothing()//for now
        }else{
          do_Nothing()
        }
      }
    }
    if(!this.target.isEqualNode(newNode)){
      this.target.innerHTML=newNode.innerHTML
    }
  }
  function Widget_Effect_Trigger(build, el, key, root, ind ){
    const newWidget=build.NodeList[key];
    this.hydrate(newWidget)
    
     const data_ref=get_Prop_Path(this.target.state, ind);
    // entries(el.NodeList).forEach(([ky, node])=>{
    //   //node.trigger_Effect_Run(newWidget.NodeList[ky], ky, node, ind)
    // })
    
  }
  function Hydrate_Reactive_Data(self, initBuild, selector, root){
    const dataWatch=[self.state, self.state.$data, self.state.$params,self.state.$base, self.state.$base ? self.state.$base.$data  : {}, self.state.$attrs];
    Track_Data_Dependency(dataWatch, function(newV, oldV, ref){
      const build=Render_View(self, initBuild);
      Eject_Hydration_Flag(self, build, root, ref);
      Observer_Depend(self, ref, [newV, oldV])
    })
    function React_To_Nexted_Object(value){
      Track_Data_Dependency([value], (reg)=>{
        const build=Render_View(self, initBuild);
        Eject_Hydration_Flag(self, build, root, reg);
      })
      entries(value).forEach(([ky, val])=>{
         if(isPObject(val) || isArray(val) ) React_To_Nexted_Object(val);
      })
    }
    entries(self.state.$data).forEach(([key, value])=>{
       if(isPObject(value) || isArray(value)) React_To_Nexted_Object(value);
    })
    entries(self.state.$base ? self.state.$base.$data || {} : {}).forEach(([key, value])=>{
       if(isPObject(value) || isArray(value)) React_To_Nexted_Object(value);
    })
  }
  function Eject_Hydration_Flag(self, build, root, ind, selector){
    let data_ref=get_Prop_Path(self.state, ind) ;
    entries(root.NodeList).forEach(([key, el])=>{
      if(isGT(el.FLAG_RANGE, 0) || isGT(el.PATCH_FLAGS ? el.PATCH_FLAGS.length : 0, 0)){
        let shouldUpdate=false;
        for( let refs of el.PATCH_FLAGS){
          if(isEQ(refs, data_ref) ){
            shouldUpdate=true;
            break;
          }
        }
        if(Boolean(shouldUpdate)){
          if(el.isPixel_Fragment && el.iS_PIXEL_MOUNTROOT){
            el.trigger_Effect_Run(build, el, key, root, ind, selector)
          }else{
            el.trigger_Effect_Run(build, key, root, ind)
          }
        }
      }
    })
  }
  function data(val){
      let react={};
      defineProperty(react, '_data_flag',{value:true, enumerable:true});
      defineProperty(react, 'value',{value:val, enumerable:true, writable: true});
      return react;
  }
  function children_Setup(val, element, self, state=false, NodesList=[]){
    let child;
    if(isPrimitive(val)){
      child=createTxtNode(self, val, element);
      element.append(child);
      element.NodeList.push(child);
    }else if(isPObject(val) && IS_VALID_TAGNAME(val.type)){
      child=VNodeManager(val, self);
      if(IS_DOCUMENT_FRAGMENT_NODE(child) && child.isPixel_Fragment && child.NodeList && element){//
        for (const node of child.NodeList.values()){
          element.append(node);
          element.NodeList.push(node)
        }
      }else{
        element.append(child);
        element.NodeList.push(child);
      }
      if(isGT(child.PATCH_FLAGS.length, 0)) {
        element.PATCH_FLAGS=element.PATCH_FLAGS.concat(child.PATCH_FLAGS);
        element.FLAG_RANGE=element.FLAG_RANGE+child.FLAG_RANGE
      }
    }else if(isFunction(val)  || isPObject(val) && val.isWidget){
      child=CompilePatcher(self, val, val)//this sets the widget flags, passed the widget to PixelBuild, sets global widgets from  its parents if any, installs all BUILT_IN_WIDGETs, mounts the wodget to a fragment and return the domRoot'
      element.append(child);
      element.NodeList.push(child);
    }else if(val.Pixel_NodeMake){
      element.append(val);
      if(element.isPixel_Fragment) {
        element.NodeList.push(val);
      }
    }else if(val.type && isPObject(val.type) && Boolean(val.type.Pixel_NodeMake)){
        element.append(val.type);
        if(element.isPixel_Fragment) {
           element.NodeList.push(val.type);
        }
    }else if(self){
      element=ResolveWidget(self, element, 'widgets', val);
    }else if(isNull(val)){
      PixelDebug(`undefined reference error\n\n unable to instanciate reference, seems to be having a problem, please recheck your "${element.localName}" element children`);return element;
    }else element=ResolveWidget(element,element,'widgets',val);
    return element;
  }
  
  function compileTemplate(build='', self, element, isWidget=false){
    if(isPrimitive(build)){
      build=createTxtNode(self, build, element);
      defineProperty(element, 'FLAG_RANGE', {value:1});
    }else if(build.isWidget && isPObject(build) || isFunction(build)){//if build value is a valid widget data
      element=CompilePatcher(self, build, build);//this sets the widget flags, passed the widget to PixelBuild, sets global widgets from  its parents if any, installs all BUILT_IN_WIDGETs, mounts the wodget to a fragment and return the domRoot'
    }else if(!isArray(build)){
      if(build.Pixel_NodeMake){
        element=build;
      }else if(build.type && isPObject(build.type) && Boolean(build.type.Pixel_NodeMake)){
        element=build.type
      }else if(IS_VALID_TAGNAME(build.type)){//if build is an element object'
        element=VNodeManager(build, self, element);
      }else if(isPObject(build) || build.isWidget /*removed build.isWidget*/){
         element=ResolveWidget(self,null,'widgets',build);
         //if(element)element.widgets=self.widgets || {};
      }
    }else if(isArray(build)){
      element=createFragment();
      const NodesList=[]
      defineProperty(element,'widgets',{value:self.widgets || {}});
      try { 
        entries(build).forEach(([ind, value])=>{
          children_Setup(value, element, self, true, NodesList);
        });
        
      }catch(err){
         console.error(err)
        PixelDebug(`Template Compilation error::\n\nelement "${build}" may not ve been passed properly\n\n${err}`);
        PixelDebug(`This might be a pixel internal bug/issue, \n\n please report any bugy problem @ "http://www.pixel-framework.com/issue" or open an issue on our github repository`);
        return element;
      }
    }
    return element
  }
  function Widget_Directive_Handler(self, widget, props){
    const { name, item }= props;
    
  }
  function ResolveWidget(obj, element, widgets, value){
    if(!mapValue(BUILT_IN_WIDGETS, value.type) && !mapValue(obj[widgets] || {}, value.type) && !mapValue(obj.state.config.$global.widgets, value.type)){
      PixelDebug(`Template Compilation Error::\n\nUnresolved tagname "${value.type}"\n\n   ...if this is a pixel widget, make sure its registered through the "widgets" option or resolved through the custom nodemake resolver`);
      return element ;
    }
    if (mapValue(BUILT_IN_WIDGETS, value.type) || mapValue(obj[widgets] || {}, value.type ) || mapValue(obj.state.config.$global.widgets, value.type) ){
      let widget=mapValue(BUILT_IN_WIDGETS, value.type) ? BUILT_IN_WIDGETS[value.type] : obj.widgets && mapValue(obj.widgets, value.type) ? obj.widgets[value.type] : obj.state.config.$global.widgets[value.type] ;
      widget= isFunction(widget) ? widget.bind({}) : Object.create(widget);//binding or creating a new object model
      let patches=[]
      if(value.attrs){
        entries(value.attrs).forEach(([ind, param])=>{
          if(isNodeBaseDirective(ind)){
            PixelDebug(`Directive breakup on widget\n\n "${ind}" directive, is an element based directive\n\n cannot be used on a pixel widget\nat at.....\n....."${value.type}"`);return;//matching away all none widget usable directives
          }
          if(ind.startsWith('*') && isGT(ind.length,1)){
            let name=AttrNameResolver(obj, ind).slice(1);
            let item;
            try{
              item = EvaluateTHIS(obj.state, param)
              patches.push(param);
            }catch(err){
              //name=ind.slice(1);
              PixelDebug(`value "${param}" property value was accessed during render, but not initialized on model or is undefined\n\nat at\n ..."${name} property `);return;
            }
            delete value.attrs[ind];
            let nodeBased=['class','styles']
            if(mapValue(nodeBased, name)) {
              name=`${name}`
            }
            value.attrs[name]=item;
          }else if(isPixelDirective(ind)){
            Widget_Directive_Handler(obj, widget, {name:ind, item:param});
          }
        });
        widget.attributes=value.attrs;
      }
      const child=CompilePatcher(obj, widget, value);//this sets the widget flags, passed the widget to PixelBuild, sets global widgets from  its parents if any, installs all BUILT_IN_WIDGETs, mounts the wodget to a fragment and return the domRoot'
      if(isGT(patches.length, 0)) child.PATCH_FLAGS=patches
      if(!isNull(element)) {
        element.append(child);
        element.NodeList.push(child);
        if(isGT(child.PATCH_FLAGS.length, 0)) {
          element.PATCH_FLAGS=element.PATCH_FLAGS.concat(child.PATCH_FLAGS);
          element.FLAG_RANGE=element.FLAG_RANGE+child.FLAG_RANGE;
        }
      }
      else element=child;
    }
    return element;
  }
  function CompilePatcher(self, widget, value){
    if(isEQ(widget.name, 'bound PXWidget')){
      const refName=widget.attributes ? widget.attributes.self : null;
      const RefHedge=!isPrimitive(refName) ? refName : mapValue(BUILT_IN_WIDGETS, refName) ? BUILT_IN_WIDGETS[refName] : self.widgets && mapValue(self.widgets, refName) ? self.widgets[refName] : self.state.config.$global.widgets[refName] ;
      if(RefHedge && widget.children){
        RefHedge.children=widget.children
      }
      if(widget.attributes) widget.attributes.self=RefHedge || refName;
    }
    widget=  set_Widget_Flag(self, widget, value, 'children');//setting the widget flag
    let child=new PixelBuild(widget);//build the widget
    for(const [key, value] of entries(self.state.config.$global)){
      entries(value).forEach(([name, data])=>{
        if(isEQ(key, 'widgets')) child=child.widget(name, data);//in the loot, uses the build.widget prototype to define global widgets
        else if(isEQ(key, 'properties')) child=child.property(name, data);//in the loot, uses the build.widget prototype to define global properties
        else if(isEQ(key, 'directives')) child=child.directive(name, data);//in the loot, uses the build.widget prototype to define global directive
        else if(isEQ(key, 'handlers')) child=child.handler(name, data);//in the loot, uses the build.widget prototype to define global handlers
      })
    }
    return child.mount(createFragment());//mounts the build to a pixel fragment
  }
  function set_Widget_Flag(self, widget, val, arg){
    if(isEQ(arg, 'children')){ 
      if(val.children && isGT(val.children.length, 0) ){
        const Flag={ children:val.children, patchFlags:self }
        widget.children=Flag;
      }
    }
    return widget;
  }
  function createFragment(){
    const fragment=new DocumentFragment();
    defineProperty(fragment, 'isPixel_Fragment',{value:true});
    defineProperty(fragment, 'NodeList',{value:[], configurable:true, writable:true});
    defineProperty(fragment, 'PATCH_FLAGS',{value:[], configurable:true, writable:true});
    defineProperty(fragment, 'FLAG_RANGE',{value:0, configurable:true, writable:true});
    return fragment;
  }
  const devInfo='You are using the development build version of pixel, make sure you switched to the minified build version when deploying to production with the (*.min.js) file extension';//development information
  function setupFunctionWidget(opts, self){
    const widget={};
    widget.build=opts;
    if(opts.attributes)widget.attributes=opts.attributes;
    if(!isNull(opts.isWidget))widget.isWidget=opts.isWidget;
    const waitForReturnObjects=['params','handlers','styleClass','widgets','buildConfig','directives'];
    entries(validWidgetOptions).forEach(([key, val])=>{
      if(!isNull(opts[val])){
        let value=opts[val];
        if(mapValue(waitForReturnObjects, val) && isFunction(value))value=opts[val]();
        widget[val]=value;
      }
    });
    entries(opts).forEach(([key, val])=>{
      if(!mapValue(validWidgetOptions, key ) && !mapValue(['params','ctx'], key)) self.state[key]=val;
    })
    return widget;
  }
  function HTMLParser(html=''){
    if(!html.trim()) return null;
    const selfClosedTagsRegex=/<([a-zA-Z0-9\-\_]*)(\s[^>]*)?\/>/gs;
    const selfClosedTagRegex=/<([a-zA-Z0-9\-\_]*)(\s[^>]*?)?\/>/
    const openingTagsRegex=/<([a-zA-Z0-9\-\_]*)(\s[^>]*?)?[\/]?>/g;
    const attributesRegex=/([^=\s]*)\s*?=\s*?(?:(["'])(.*?)\2|([^"'\s>]+))/g;
    const attrRegex=/([^=\s]*)\s*?=\s*?(?:(["'])(.*?)\2|([^"'\s>]+))/;
    html=html.replace(openingTagsRegex, (match, tag, attrs)=>{
      if(hasUpperCase(tag)){
        const nodeSpace=`$px-nodespace=${tag}`;
        attrs=!isNull(attrs) ? `${attrs} ${nodeSpace}` : nodeSpace;
      }
      if(!isNull(attrs)){
        attrs=attrs.replace(attributesRegex,(mch, attr, sip, val, fall)=>{
          val=val || fall || '';
          if(hasUpperCase(attr)) attr=`${attr}-$px`;
          return `${attr}="${val}"`;
        })
        let attrsMatch=attrs.match(attributesRegex);
        for (let attr of attrsMatch || []){
          const attrMatch=attr.match(attrRegex);
          const attrName=attrMatch[1];
          if(hasUpperCase(attrName)){
            const fallbackAttr=`$px-${attrName.toLowerCase()}=${attrName}`;
            attrs=attrs ? `${attrs} ${fallbackAttr}` : fallbackAttr;
          }
        }
      }
      const selfClosedTagMatch=match.match(selfClosedTagRegex);
      match=`<${tag} ${attrs ? attrs : ''} ${ selfClosedTagMatch ? '/>' : '>'}`;
      return match;
    })
    html=html.replace(selfClosedTagsRegex, (match, tag)=>{ 
      const closingSlashIndex=match.lastIndexOf('/');
      match=match.slice(0, closingSlashIndex);
      if(IS_HTML_VOID_TAG(tag)) return `${match}>`;
      return `${match}></${tag}>`;});
    const body=createVNode('body');
    body.innerHTML=html;
    const stack=[];
    for (let node of body.childNodes){
      if(node ){
        if(IS_TEXT_NODE(node)){
          node=node.wholeText;
          if(node.trim()) stack.push(node);
        }else if(IS_COMMENT_NODE(node)){/*Ignore comment nodes*/do_Nothing();
        }else if(node.Pixel_NodeMake){
          stack.push(node);
        }else{
          let tagName=node.localName;
          const attributes={};
          for (const attribute of node.attributes){
            const { name, value }=attribute;
            if(!name.startsWith('$px')) attributes[name]=value;
            else if(isEQ(name,'$px-nodespace')) tagName=value;
            else if(name.startsWith('$px') && name.endsWith('$px')){
              const attrN=name.slice(4);
              if(hasOwn(attributes, attrN)){
                attributes[value.slice(0,value.length-4)]=attributes[attrN];
                delete attributes[attrN];
              }
            }
          }
          const children=HTMLParser(node.innerHTML) || null;
          const nodeOBJ={ type:tagName, attrs:ObjSize(attributes) ? attributes : null, children: children && isPObject(children) ? [children]  : children }
          stack.push(nodeOBJ);
        }
      }
    }
    return isEQ(stack.length,1) ? stack[0] : isLT(stack.length,1) ? null : stack;
  }
  function TemplateParser(html){ return HTMLParser(html);}
  const Template = (strings, ...values) => {
    const html = strings.reduce((acc, str, i) => {
      const value = !isNull(values[i]) ? values[i] : '';
      return acc + str + value;
    }, '');return HTMLParser(html);
  };
  const data_Reference=function(ref){
    return ref
  }
  function NodeMake(opts, options){
    this.is_Custom_Node=true;
    if(!isPObject(opts)){PixelDebug(`NodeMake option values must be type of object......>>>>`);return;}else if(isGT(arguments.length, 1)){PixelDebug(`NodeMake parameter values required only 1 argument.....\n\n${arguments.length} given>>>>>>>>>>>`);return;}
    const isValidNodeMakeopts=opt=>mapValue(['template','styles','plugin','name','params','onConnected','onDisconnected','onAdopted','onAttrChanged'],opt);
    entries(opts).forEach(([key, value])=>{
      if(!isValidNodeMakeopts(key)){PixelDebug(`invalid option value....\n\n "${key}" is not a recognised NodeMake option `);return;}
      if(isEQ(key, 'styles') && !isString(value)){PixelDebug(`styleSheet for custom elements must be of type "Strings of css styleSheets"`);return;}
      if(isEQ(key,'params')){
        if(!isPObject(opts.params)){PixelDebug(`params value for Custom Node must be of type "object"\n\n typeof "${getType(opts.params)}" found`);return;}
      }
    });
    if(!isNull(opts.params))paramsManager(opts, this)
    if(isNull(opts.template)){PixelDebug(`Custom element required a template option`);return;}else if(!isString(opts.template)){ PixelDebug(`string value required at the node make template option`);return;}
    if(isNull(opts.name)){PixelDebug('Custom node does not have a name option\n\nname required for node registration....');return;
    }else if(!isString(opts.name)){PixelDebug(`unrecovered  value type\nNodeMake name option required value of type "Strings"\n\n"${getType(opts.name)}" found`);return;
    } else if(IS_VALID_TAGNAME(opts.name)){PixelDebug(`"${opts.name}" is an Html tag name .....\n\nshould not be used in Custom nodes`);return;
    }else if(IS_HTML_DEPRECATED_TAG(opts.name)){PixelDebug(`an Html depreciated element tagname, \n\nshould not be used for CUSTOM_NODES`);return;
    }else if(!opts.name.includes('-')){PixelDebug(`Due to inDom tag passing caveats ,Custom Nodes are termed to be named differently by using lowercases, multiwords saperated by the hyphen or underscore characters\n\n Node with name "${opts.name}" is invalid.......`);return;}
    if(!isNull(opts.plugins)){
      if(isFunction(opts.plugins))opts.plugins();
      else if(isPObject(opts.plugins) || isArray(opts.plugins)){
      }else{
        PixelDebug(`plugin type not supported for custom node`);return;
      }
    }
    const LifeCycleHooksList=['onConnected','onDisconnected', 'onAdopted','onAttrChanged','plugin'];
    let Hooks={};
    entries(opts).forEach(([ind, value])=>{
      if(mapValue(LifeCycleHooksList, ind)){
        if(!isFunction(value)){
          PixelDebug(`LifeCycle callback error\n\n"${ind}" is a callback function, received an invalid type`);return;
        }
        if(isEQ('onConnected',ind)) defineProperty(Hooks, 'connectedCallback',{value:value, configurable:true});
        if(isEQ('onDisconnected',ind)) defineProperty(Hooks, 'disConnectedCallback',{value:value, configurable:true});
        if(isEQ('onAdopted',ind)) defineProperty(Hooks, 'adoptedCallback',{value:value, configurable:true});
        if(isEQ('onAttrChanged',ind)) defineProperty(Hooks, 'attributeChangedCallback',{value:value, configurable:true});
      } 
    })
    const pluginThis={
      name:opts.name,
      
    }
    class Pixel_NodeMake_Element extends HTMLElement{
      constructor(){
        super();
        const shadow=this.attachShadow({ mode: 'open'})
        const template=compileTemplate(TemplateParser(opts.template), this, null);
        cssStylesheetCompilation(opts, null, template);
        shadow.appendChild(template);
        const pluginData=opts.plugin.call(pluginThis);
      }
      Pixel_NodeMake=true;
      connectedCallback=Hooks.connectedCallback || do_Nothing;
      disConnectedCallback=Hooks.disConnectedCallback || do_Nothing;
      adoptedCallback=Hooks.adoptedCallback || do_Nothing;
      attributeChangedCallback=Hooks.attributeChangedCallback || do_Nothing;
    }
    this.name=opts.name;
    this.element=Pixel_NodeMake_Element;
    this.resolve=resolve
    return this;
  }
  NodeMake=NodeMake.bind({});
  function resolve(useState=false){
    useState=Boolean(useState);
    customElements.define(this.name, this.element);
  }
  function resolveType(data, type){
    let res=false;
    if(isFunction(type))type=type.name.toLowerCase();
    entries(TypeMethods).forEach(([name, method])=>{
      if(name.toLowerCase().includes(type)){ 
        res=method(data);
      }
    })
    return res;
  }
  function hasExistenceAndType(data, type, name=''){
    if(!data || isNull(data) ){
      PixelDebug(`${name} option must be passed to the request object options,\n\n null found , or is undefined`);return false;
    }else if(!resolveType(data, type)){
      PixelDebug(`found an invalid value to the "${name}" option\n\n must be a "${isFunction(type) ? type.name.toLowerCase() : type }" type value`);return false;
    }
    return true;
  }
  async function AsyncWidget(opts){
    opts=await defineWidget(opts)
    opts.isAsync=true;
    options= opts;
    return options;
  }
  function do_Nothing(){}
  function defineWidget(opts){
    if(isPrimitive(opts)){
      PixelDebug(`Value Error\n\n invalid value for the defineWidget macro\n/... at /././. at`);return;
    }else if(isGT(arguments.length, 1)){
      PixelDebug(`Parameter Error\n\nmax-one argument required\n ${arguments.length} given`);return;
    }
    return opts;
  }
  const initBuild=function(options, attrs, children){
    return new PixelBuild(options, attrs, children);}
  const initSSRBuild=function(options, attrs, children){
    for(let key of Object.keys(options)){
      if(!isValidWidgetOption(key)) PixelDebug(`Widget option error\n\n "${key}" not a valid widget option`);}
    
    return new PixelBuild(options);
  }
  function VNode(options){
    if(!isPObject(options)){ PixelDebug(`VNode Error\n expects an 'object'`);return;}
    const optionsName=['type','attrs', 'children'];
    if(isGT(Object.keys(options).length, 3)){
      PixelDebug(`Options Error\n\n VNode does not accept more than 3 arguments`);
    }
    for(let name of Object.keys(options)){
      if(!mapValue(optionsName, name)) {PixelDebug(`${name} is not a valid VNode options value`);return;}
    }
    const {type, attrs, children}=options;
    return  options ;
  }
  global.VNode=VNode;
  global.get_version=get_version;//dev
  global.H=H;
  global.initBuild=initBuild;
  global.initSSRBuild=initSSRBuild;
  global.log=log;//dev
  global.PXWidget=PXWidget;
  global.AsyncWidget=AsyncWidget;
  global.defineWidget=defineWidget;
  global.Template=Template;
  global.Widget=Widget;
  global.data=data;
  global.createVNode=createVNode;
  global.NodeMake=NodeMake;
  global.createFragment=createFragment;
  global.Debug=PixelDebug;//dev
  global.Fragment=Fragment;
  global.GenerateRoot=GenerateRoot;
  global.ref=data_Reference;
  console.info(devInfo);//dev
  return global;
})(({}));
