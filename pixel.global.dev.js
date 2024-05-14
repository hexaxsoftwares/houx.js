  /**
  *@param This project, 'PIXEL', is been sponsored by the VORTEX TECHNOLOGY FOUNDATION.
  *@param Visit 'www.pixel.com/guide' for for more information on the pixel project and documentation of pixel and its development process guide.
  *@param This is a web JIT development version of Pixel
  *@param We focus hard on developing and improving our features and perfomance issues, we only need your support to help and encourage us on maintaing this template engine.
  *@param Thanks for choosing Pixel
  */
const Pixel=(function(global){
  "use strict"
  const log=console.log
  const get_version=()=>'pixel-0.1.12';//pixel at it's earliest version
  const isEQ=(arg1, arg2)=>arg1===arg2;//checks if arg1 is equal to arg2
  const isArray=Array.isArray;
  const toString=Object.prototype.toString;
  const _toStringCall=txt=>toString.call(txt);
  const isDate=date=>isEQ(_toStringCall(date), '[object Date]');
  const isSet=val=>isEQ(_toStringCall(val),'[object Set]');
  const isMap=map=>isEQ(_toStringCall(map), '[object Map]');
  const getType=value=>isArray(value) ? 'array' : isDate(value) ? 'date' : isSet(value) ? 'set' : isMap(value) ? 'map' : typeof value;
  const toStringType=(value)=>_toStringCall(value).slice(8, -1).toLowerCase();
  const isString=str=>isEQ(getType(str),'string');
  const isNull=arg=>arg==null;
  const isUndefined=arg=>isEQ(_toStringCall(arg), '[object Undefined]')
  const isObject=obj=>isEQ(getType(obj), 'object');
  const isPObject=obj=>isEQ(_toStringCall(obj),'[object Object]');
  const isPrimitive=val=>!_validateType(val, [ Object, Function, Array, Date])
  const arrayMutationMethods="push,pop,shift,unshift,splice,sort,reverse";
  const setMutationMethods="add,delete,clear", mapMutationMethods="set,delete,clear";
  const hasOwn=Object.hasOwn, assign=Object.assign, entries=Object.entries, keys=Object.keys, values=Object.values;
  // function define(object, propKey, value){
  //   return Object.defineProperty(object, propKey, { enumerable, configurable, value });
  // }
  const define=Object.defineProperty;
  const hasProp=(obj, prop)=> prop  in obj;
  function _mapValue(obj, arg){
    return isString(obj) ? new Set(obj.split(',')).has(arg) : isPObject(obj) ? hasProp(obj, arg) : isArray(obj) ? obj.includes(arg) : isSet(obj) || isMap(obj) ? obj.has(arg) : false;
  }
  const isFunction=func=>isEQ(getType(func),'function');
  const isPFunction=func=>isFunction(func) && !isClass(func);
  const isNumber=num=>isEQ(getType(num),'number');
  const isBoolean=bool=>isEQ(getType(bool), 'boolean');
  const bool=Boolean;
  const defProps=Object.defineProperties;
  const isSymbol=sym=>isEQ(_toStringCall(prom), '[object Symbol]') 
  const isPromise=prom=> isEQ(_toStringCall(prom), '[object Promise]') && isFunction(prom.then) && isFunction(prom.catch);
  const isGT=(val, arg)=>val>arg;//checks if val is greater than arg
  const isLT=(val, arg)=>val<arg;//checks if val is less than arg
  const isGTE=(val, arg)=>val>=arg;//checks if val is greater than or equal to args
  const isTrue=compute=>isEQ(compute, true);
  const isFalse=compute=>isEQ(compute, false);
  const isLTE=(val, arg)=>val<=arg;
  const $warner=`<<** Pixel $Debug **>>.....>>>>>>>`;
  function $Debug(msg,self, dictateW=false, txt=''){
    let shouldlog=true
    if(self) shouldlog=self.core.settings.debug
    if(shouldlog ) {
      if(dictateW) console.warn(`${$warner}\n\nEncountered a problem ${txt} \n\n at  at  \n <${self ? self.ownProperties.name : 'UnknownWidget' }> widget`);//pixel warming debugger
      console.error(`${$warner}\n\n${msg}`);//pixel warming debugger
    }
  }
  function $warn(msg, self){
    let shouldlog=true
    if(self) shouldlog=self.core.settings.debug;
    if(shouldlog) console.warn(`${$warner}\n\n${msg}`);//pixel warming debugger
  }
  const isIterable=iterable=>_validateType(iterable, [Object,Array,Set,Map])
  const enumerable =true, configurable =true, writable = true ;
  const isEmptyStr=str=>isEQ(str,"");
  const $Error=(msg,self)=>{
    let shouldlog=true
    if(self) shouldlog=self.compiler.config.debug
    if(isTrue(shouldlog)) console.error(`${$warner}\n\n ${msg}`);//pixel warming debugger
  }
  const isBFunction=func=>isPFunction(func) && func.name.startsWith('bound');
  const hasHyphen_bind=key=>/^\-\-[a-zA-Z0-9\-_|[\]]+/.test(key);
  const hasAt_bind=key=>/^@[a-zA-Z0-9\-_|[\]]+/.test(key);
  const has$$_bind=key=>/^\$\$[a-zA-Z0-9\-_|[\]]+/.test(key);
  const hasDir_bind=key=>/^dir\-\-[a-zA-Z0-9\-_|[\]]+/.test(key)
  const hasSpread_bind=key=>/^\.\.\.[^.?]+/.test(key);
  const hasAsterisks_bind=key=>/^\*[a-zA-Z0-9\-_|[\]]+/.test(key)
  const validWidgetOptions="build,model,widgets,preBuild,postBuild,preMount,postMount,preUpdate,postUpdate,postDestroy,preDestroy,handlers,params,buildConfig,styleSheet,directives,template,name,observers,templateSrc,styleSheetSrc,blocks,signals,hang,fork,slots,markdown,markdownSrc,fallThrough";//valid widget options---
  const widgetOptionType={ build:Function, model:Function, widgets:Object, preBuild:Function, postBuild:Function, preMount:Function, postMount:Function, preUpdate:Function, postUpdate:Function, postDestroy:Function, preDestroy:Function, handlers:Object, params:[Array, Object], buildConfig:[Object, Function], styleSheet:String, directives:Object, template:String, name:String, observers:Object, templateSrc:String, styleSheetSrc:String, blocks:Object, signals:Array, hang:Array, fork:[Array, Object], slots:Array, markdownSrc:String, markdown:String,fallThrough:Function
  }
  const isArgument=arg=>isEQ(_toStringCall(arg), "[object Arguments]");
  const len=obj=>isPObject(obj) ? Object.keys(obj).length : isArray(obj) || isArgument(obj) ? obj.length : isSet(obj) ? obj.size : isString(obj) ? obj.length : isNumber(obj) ? obj : NaN ;
  const isValidWidgetOption=opts=>_mapValue(validWidgetOptions, opts);//checks if an option is a vslid Pixel widget option
  const HTML_TAGS="html,head,style,title,body,address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,main,nav,section,blockquote,dd,div,dl,dt,figcaption,figure,li,menu,ol,p,pre,ul,a,abbr,b,bdi,bdo,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,ruby,s,samp,small,span,strong,sub,sup,time,u,var,audio,map,video,iframe,object,picture,portal,svg,math,canvas,noscript,script,del,ins,caption,col,colgroup,table,tbody,td,tfoot,th,thead,tr,datalist,fieldset,form,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,summary,button,template,slot,base,link,meta,hr,br,wbr,area,img,track,embed,source,input"//All html valid tags supported by the Pixel framework
  const IS_HTML_TAG=txt=>_mapValue(HTML_TAGS, txt);
  const WEB_COMPONENTS="template,slot";//Web components tags , also supported by the Pixel framework
  const HTML_FORM_ELEMENTS="select,textarea,input,form,progress,meter,option";
  const Is_Form_Element=element=>_mapValue(HTML_FORM_ELEMENTS, element.localName);
  const IS_WEB_COMPONENT=txt=>_mapValue(WEB_COMPONENTS, txt);
  const HTML_VOID_TAGS="base,link,meta,hr,br,wbr,area,img,track,embed,source,input";//HTML void tags, also supported by the Pixel framework
  const IS_HTML_VOID_TAG=txt=>_mapValue(HTML_VOID_TAGS, txt);
  const HTML_DEPRECATED_TAGS="acronym,noembed,applet,noframes,bgsound,param,big,blink,plaintext,center,rb,content,rtc,dir,shadow,font,spacer,frame,strike,frameset,image,tt,keygen,xmp,marquee,nobr,menuitem";//HTML obselete and deprecated element. 
  //The above tags are no more been supported by the pixel framework
  const IS_HTML_DEPRECATED_TAG=txt=>_mapValue(HTML_DEPRECATED_TAGS, txt);
  const HTMLIDLAttributes="accesskey,contenteditable,dir,draggable,enterkeyhint,hidden,inert,innerText,inputmode,popover,lang,noModule,nonce,outerText,spellcheck,style,tabindex,title,translate,className,value,innerHTML,outerHTML";
  const isHTMLIDLAttributes=txt=>_mapValue(HTMLIDLAttributes, txt)
  const isHTMLBooleanAttributes=txt=>_mapValue(HTMLBooleanAttributes, txt)
  const HTMLBooleanAttributes="disabled,hidden,draggable,checked,selected,defer,ismap,reversed,readonly,autoplay,disableremoteplayback,muted,loop";
  const DomParserTags="html,head,link,meta,body,style,script,noscript,template"
  const IsDomparserTag=tag=>_mapValue(DomParserTags, tag);
  const SVG_TAGS="a,animate,animateMotion,animateTransform,circle,clipPath,defs,desc,discard,ellipse,feBlend,feColorMatrix,feComponentTransfer,feComposite,feConvolveMatrix,feDiffuseLighting,feDisplacementMap,feDistantLight,feDropShadow,feFlood,feFuncA,feFuncB,feFuncG,feFuncR,feGaussianBlur,feImage,feMerge,feMergeNode,feMorphology,feOffset,fePointLight,feSpecularLighting,feSpotLight,feTile,feTurbulence,filter,foreignObject,g,hatch,hatchpath,image,line,linearGradient,marker,mask,metadata,mpath,path,pattern,polygon,polyline,radialGradient,rect,script,set,stop,style,svg,switch,symbol,text,textPath,title,tspan,use,view";
  const SVG_DEPRECATED_TAGS="altGlyph,altGlyphDef,altGlyphItem,cursor,font,font-face,font-face-format,font-face-name,font-face-src,font-face-uri,glyph,glyphRef,hkern,missing-glyph,tref,vkern";
  const IS_SVG_TAG=tag=>_mapValue(SVG_TAGS, tag);
  const IS_SVG_DEPRRCATED_TAG=tag=>_mapValue(SVG_DEPRECATED_TAGS, tag);
  const IS_VALID_TAGNAME=(txt)=>{
    if(IS_HTML_TAG(txt)||IS_WEB_COMPONENT(txt)||IS_HTML_VOID_TAG(txt) || IS_SVG_TAG(txt))return true;
    else if(IS_HTML_DEPRECATED_TAG(txt) || IS_SVG_DEPRRCATED_TAG(txt)){$Debug(`"${txt}" is an html/svg deprecated tag, and should not be used in new projects\n\nPixel JS       does not offer the compilation of obselete elements`);
    return false;
    }
    return false;
  }
  const dataStringTypes="string,function,object,array,boolean,number,symbol,date,set,map,bigint,set,map,weakmap,weakset,date,weakref,promise,proxy";//Valid javascript datatypes
  const isValidDataStringType=obj=>_mapValue(dataTypes, obj);//checks if a string value is a dataTypes return text
  const DataFunctionMap=[String, Function, Object, Array, Symbol, Number, Boolean,]
  const DataCallableMap=[Set,Map,WeakMap,WeakSet, Date,WeakRef,Promise,RegExp,Proxy,BigInt,ArrayBuffer];
  const isBuiltInType=type=>_mapValue(DataFunctionMap, type) && _mapValue(DataCallableMap, type)
  const Data_Flags="NodeList,PATCH_FLAGS"
  const hasUpperCase=str=>str.match(/[A-Z]/g);
  const hasLowerCase=str=>str.match(/[a-z]/g);
  const hasDigit=dig=>dig.match(/[0-9]/g);
  const NodeTypeMap={ ELEMENT_NODE:1, ATTRIBUTE_NODE:2, TEXT_NODE:3, CDATA_SECTION_NODE:4, ENTITY_REFERENCE_NODE:5, ENTITY_NODE:6, PROCESSING_INSTRUCTION_NODE:7, COMMENT_NODE:8, DOCUMENT_NODE:9, DOCUMENT_TYPE_NODE:10, DOCUMENT_FRAGMENT_NODE:11, NOTATION_NODE:12 }
  const isNativeElement=(vnode)=> (vnode instanceof HTMLElement || vnode instanceof SVGElement);
  const IS_TEXT_NODE=node=>node && isEQ(node.nodeType, NodeTypeMap.TEXT_NODE);
  const IS_ATTRIBUTE_NODE=node=>node && isEQ(node.nodeType, NodeTypeMap.ATTRIBUTE_NODE);
  const IS_ELEMENT_NODE=node=>node && isNativeElement(node) && isEQ(node.nodeType, NodeTypeMap.ELEMENT_NODE);
  const IS_ENTITY_NODE=node=>node && isEQ(node.nodeType, NodeTypeMap.ENTITY_NODE);
  const IS_DOCUMENT_TYPE_NODE=node=>node && isEQ(node.nodeType, NodeTypeMap.DOCUMENT_TYPE_NODE);
  const IS_DOCUMENT_NODE=node=>node && isEQ(node.nodeType, NodeTypeMap.DOCUMENT_NODE);
  const IS_NOTATION_NODE=node=>node && isEQ(node.nodeType, NodeTypeMap.NOTATION_NODE);
  const IS_DOCUMENT_FRAGMENT_NODE=node=>node && isEQ(node.nodeType, NodeTypeMap.DOCUMENT_FRAGMENT_NODE);
  const IS_CDATA_SECTION_NODE=node=>node && isNativeElement(node) && isEQ(node.nodeType, NodeTypeMap.CDATA_SECTION_NODE);
  const IS_PROCESSING_INSTRUCTION_NODE=node=>node && isEQ(node.nodeType, NodeTypeMap.PROCESSING_INSTRUCTION_NODE);
  const IS_ENTITY_REFERENCE_NODE=node=>node && isEQ(node.nodeType, NodeTypeMap.ENTITY_REFERENCE_NODE);
  const IS_COMMENT_NODE=node=>node && isEQ(node.nodeType, NodeTypeMap.COMMENT_NODE);
  const TypeMethods={isString, isFunction, isPObject, isArray, isBoolean, isNumber, isDate, isSymbol, isSet, isMap}
  class pixelCustomNativeElement extends HTMLElement{
    constructor(){
      super();
    }
  }
  const isCustomElement=node=>  node instanceof  HTMLElement && !IS_VALID_TAGNAME(node.localName);
  const isChildrenNode=val=> {
    let res = isPrimitive(val) || isArray(val) || isPixelVNode(val) || isPixelBuild(val) || isCustomElement(val)  || isSlotInstance(val);
    if(!res && isFunction(val)) return isChildrenNode(val());
    return res;
  }
  const isBaseWidget=widget=> isPObject(widget) && widget instanceof Widget;
  const isProxy=value=>_validateType(value, Proxy);
  const validPixelWidget=(w)=>(isPObject(w) || isPFunction(w) || isClass(w)) && !isProxy(w);
  function parseScript(script){
    return new Function(`"use strict"; return ${script}`)();
  }//helps compile string values to javascript statement
  const isInDom=element=> isEQ(element.getRootNode(),document);
  const GLOBAL_EVENTS="abort,animationcancel,animationend,animationiteration,animationstart,auxclick,blur,error,focus,canplay,canplaythrough,cancel,change,click,close,contextmenu,dblclick,drag,dragend,dragenter,dragleave,dragover,dragstart,drop,durationchange,emptied,ended,formdata,gotpointercapture,input,invalid,keydown,keypress,load,keyup,loadeddata,loadedmetadata,loadend,loadstart,lostpointercapture,mousedown,mouseenter,mouseleave,mousemove,mouseout,mouseover,mouseup,mousewheel,wheel,pause,play,playing,pointerdown,pointermove,pointerup,pointercancel,pointerover,pointerout,pointerleave,pointerenter,pointerlockchange,pointerlockerror,progress,ratechange,reset,resize,scroll,securitypolicyviolation,seeked,seeking,select,selectstart,selectionchange,slotchange,stalled,submit,suspend,timeupdate,touchcancel,touchend,touchstart,touchmove,transitioncancel,transitionrun,transitioned,transitionstart,waiting,volumechange,autocompleteerror,autocomplete,hover";//Html event names managed by pixel on elements
  const IS_VALID_EVENT_HANDLER=eventName=>_mapValue(GLOBAL_EVENTS, eventName);
  const isClass = val=> isFunction(val) && val.toString().startsWith('class');
  const LCH="created,mounted,updated,init";
  function isInstanceOf(val, construct){
    if(isClass(construct) || isXtruct(construct)) return val instanceof construct;
    return false;
  }
  function instance_Has_Widget(self, name ){
    return _mapValue(BUILT_IN_WIDGETS, name) || _mapValue(self.register?.widgets || {}, name ) ;
  }
  const normalize_Widget=(self, name)=>_mapValue(BUILT_IN_WIDGETS, name) ? BUILT_IN_WIDGETS[name] : _mapValue(self.register.widgets, name) ? self.register.widgets[name]: null;
  const isSlotInstance=val=> _validateType(val, slotInstanceMap);
  const requestMethods="POST,GET,PATCH,HEAD,DELETE,PUT,CONNECT,OPTIONS,TRACE";
  const isRequestMethod=method=>_mapValue(requestMethods, method);
  const isPixelVNode=vnode=>vnode instanceof PixelVNode;
  const isPixelBuild=widget=>widget instanceof _Pixel_Build;
  const isPixelTextVNode=vnode=>vnode instanceof PixelTextVNode;
  const isPixelElementVNode=vnode=> vnode instanceof PixelElementVNode;
  const isPixelFragmentVnode=vnode => vnode instanceof PixelFragmentVNode;
  const isWidgetResolver=data=>_validateType(data, _WidgetResolver);
  const isDirectiveResolver=data=>_validateType(data, _DirectiveResolver);
  const readOnlyModelProps="$element,$params,$attrs,$signals,$slots,$parent,$root";
  const proxySkipped="$element,$attrs,$signals,$slots,$parent,$root,$observe,$nextTick";
  const isProxySkipped=prop=>_mapValue(proxySkipped, prop);
  function createObj(name, props){
    if(isEQ(len(arguments), 1) && isPObject(name)) props=name;
    if(props && !isPObject(props)) props=null;
    let objXtruct=Function('name',`
     return name ? class ${name}{} : Object ;
    `)
    objXtruct=objXtruct(name);
    objXtruct= new objXtruct();
    if(props) assign(objXtruct, props);
    return objXtruct;
  }
  const canRender=value=>isPrimitive(value) && !isNull(value);
  function compileToRenderable(value){
    if(canRender(value)) return String(value);
    else if(_validateType(value, [Array, Date, Function])) return value.toString();
    else if(!isNull(value)) return JSON.stringify(value);
    return "";
  }
  const arrowFNRegex=/^(\(([\w$,]*)\)|[\w$]+)[ ]*=>[ ]*[{]?\s*/;
  const functionFNRegex=/^function ([\w$]*)?\(([\w$]*)?\)[ ]*\{\s*/m
  const isAFunction=(fn)=> isPFunction(fn) && arrowFNRegex.test(fn.toString());
  const isFNString=str => arrowFNRegex.test(str) || functionFNRegex.test(str);
  const destructureRegex=/^{(.*?)}$/;
  class fallThrough{
    constructor(fn){
      this.callback=fn;
    }
  }
  const isFallThrough=fall=> fall instanceof fallThrough;
  function isReactiveValue(value){
    
  }
  function unWrapReactiveValue(value){
    
  }
  function isShallowReactiveValue(value){
    
  }
  function runtimeShallowUnwrap(value){
    
  }
  function effectHook(fn){
    
  }
  function deepCompare(val1, val2){
    if(isPrimitive(val1) && isPrimitive(val2) && !isEQ(val1,  val2)) return false;
    else if(!isEQ(getType(val1), getType(val2))) return false;
    if(isArray(val1) || isSet(val1) ){
      if(!isEQ(len(val1), len(val2))) return false;
      val1=isSet(val1) ? arrSet(val1) : val1;
      val2=isSet(val2) ? arrSet(val2) : val2;
      for(const [ key, value] of val1.entries()){
        if(isFalse(deepCompare(value, val2[key]))) return false;
      }
      return true;
    }else if(isObject(val1)){
      if(!isEQ(len(val1), len(val2))) return false;
      let index=0;
      for(const [ key, value] of entries(val1)){
        if(isFalse(isEQ(key, keys(val2)[index]))) return false;
        if(isFalse(deepCompare(value, val2[key]))) return false;
        index++;
      }
      return true
    }else if(isMap(val1)){
      if(!isEQ(len(val1), len(val2))) return false;
      let index=0;
      for(const [ key, value] of val1.entries()){
        const val2Key=val2.keys().next();
        if(isFalse(deepCompare(key, val2Key))) return false;
        const value2=val2.values().next();
        if(isFalse(deepCompare(val2, value2))) return false;
        index++;
      }
      return true;
    }
    return false;
  }
  function _$compiler_engine_hydrator(){
    global=createObj('Pixel');
  }
  class PixelGlobalSettings{
    debug=true
    forwardSlot=true
    forwardAttrs=true
    delimiters=['{{','}}']
    subAttrBinding=false
    inAttrDelimiters=this.delimiters
    isAsync=false
    isCustomElement=false
  }
  const Global_Settings= new PixelGlobalSettings()
  class pixelCompilerConfig{
    debug(debug){
      Global_Settings.debug=debug
    }
    forwardAttrs(forwardAttrs){
      Global_Settings.forwardAttrs=forwardAttrs
    }
    forwardSlot(forwardSlot){
      Global_Settings.forwardSlot=forwardSlot
    }
    delimiters(delimiters){
      Global_Settings.delimiters=delimiters
    }
    subAttrBinding(subAttrBinding){
      Global_Settings.subAttrBinding=subAttrBinding
    }
    inAttrDelimiters(inAttrDelimiters){
      Global_Settings.inAttrDelimiters=inAttrDelimiters
    }
    isAsync(isAsync){
      Global_Settings.isAsync=isAsync
    }
    isCustomElement(isCustomElement){
      PixelGlobalSettings.isCustomElement=isCustomElement;
    }
  }
  function isXtruct(func) {
    try {
      new func();
      return true;
    } catch (error) {
      return false;
    }
  }
  class Type{
    constructor(type, validator){
      this.type=type;
      this.validator=validator;
    }
  }
  class AnyType extends Type{
    constructor(){
      super([], function validator(value){
        return true;
      })
    }
  }
  class NoneType extends Type{
    constructor(){
      super();
    }
  }
  const isBaseType=type=>type instanceof Type;
  const Any=new AnyType();
  const None=new NoneType();
  const isAnyType=data=>_validateType(data, AnyType);
  const isNoneType=data=>_validateType(data, NoneType);
  function _validateType(val, type){
    if(isFunction(type) ){
      if(new Set(DataFunctionMap).has(type)){
        return isEQ(getType(val), getType(type()))
      }else if(new Set(DataCallableMap).has(type)){
        let res=false;
         try {
           res=isEQ(getType(val), getType(new type()))
         }catch(err){
           return res;
         }
         return res;
      }else if(isClass(type) || isXtruct(type)) {
        let res=false;
        try {
          res=val instanceof type;
        }catch(err){
          return res;
        }
        return res;
      }
    }else if(isArray(type)){
      let res=false;
      for(let typeF of type.values()){
        if(!isFunction(typeF)){
          $Debug(`type check value is not a function or class constructor type\n\n found "${typeF}"`); return false;
        }
        res=_validateType(val, typeF);
        if(isTrue(res)) break;
      }
      return res;
    }else if(isBaseType(type)){
      if(type instanceof AnyType) return true;
      else if(type instanceof NoneType) return _validateType(val, [undefined, null, ""]);
      let res;
      if(type.validator) res=type.validator(val);
      if(!isTrue(res)) res=_validateType(val, type.type);
      return res;
    }else if(new Set([undefined, null, "" ]).has(type)) return isString(val) ? isEmptyStr(val) : isNull(val);
    return false;
  }
  function Signal(name, callback, options){
    this.name=name;
    this.receiverRecord=new Set()
    this.depend=callback
  }
  Signal.prototype.fire=fire;
  function fire(...params){
    this.depend( ...params)
  }
  const isSignal=val=>_validateType(val, Signal);
  function _createTextElement(self, text, px__VNode){
    text=String(text);
    let hasSkip;
    let node;
    let is_hyperscript=px__VNode.is_hyperscript;
    if(px__VNode)  define(px__VNode, '_vnode_key',{value:_generateUUID(7), enumerable})
    if(parent && !is_hyperscript){
      let hasSkip=hasOwn(parent, '$$raw');
      const Skip=parent['$$raw'];
      hasSkip= hasSkip && isBoolean(Skip) ? Skip : hasSkip ;
    }
    if(text) node=document.createTextNode(text);
    if(hasSpecialCharacters(node.textContent) &&  !hasSkip && !is_hyperscript) {
      node.textContent=resolveAccessor(self, parent, node, px__VNode);
      px__VNode.PATCH_FLAGS.add('ELEMENT_CHILDREN');
      px__VNode.render_tracked=true;
    }
    px__VNode.is_text_node=true
    return node;
  }
  class PixelVNode{
    constructor(){
      if (isNativeElement(this.$element)) define(this.$element, 'pixelVNode',{value:this, enumerable, configurable})
      
      createVNodeSignalNotifier(this.VNodeManager, 'onDestroyEnd', ()=>{
        
      })
    }
    base_element=undefined
    get_parent_element(){
      return this.$element.parentElement.pixelVNode
    }
    render_tracked=false
    $element=undefined
    slot_name=undefined
    created_hook=new Set()
    widget_instance=undefined
    updated_hook=new Set()
    mounted_hook=new  Set()
    destroyed_hook=new Set()
    init_hook=new Set()
    _vnode_key=undefined
    patch_tracks=new Set()
    conditional_record={ src:undefined, res:false, passed:false}
    compiler_options=createObj('compiler_options', { fallThrough:createObj('fallThrough')});
    VNodeManager=createObj('VNodeManager', { updateFlags:{ active:false}})
    px_hash_=undefined
    children_nodes_list=new Set()
    is_hyperscript=false
    called_render=false
    is_fragment_node=false
    is_element_node=false
    is_mount_root=false
    mount_root_tooken=undefined
    is_text_node=false
    IS_RENDERLESS=false
    LabContext=undefined
    mounted=false
    isWidgetWrapper=false
    NodeList=new Set()
    PATCH_FLAGS=new Set()
    insert(node){
      if(isPixelVNode(node)){
         this.$element.append(node.$element)
         this.NodeList.add(node)
      }else pass
      return this;
    }
  }
  function createVNodeSignalNotifier(obj, prop, fn){
    obj=define(obj, prop, {
      get(value){
        return { fire:fn }
      }
    })
    return obj;
  }
  function isTagMatch(open, close){//match syntax for a $$for opening and closing tags
    let res=false;
    const tags=[['[',']'],['{','}'],['(',')'],['<','>']];
    for(const items of tags.values()){
      if(items.includes(open) || items.includes(close)){
        if(isEQ(open, items[0]) && isEQ(close, items[1]) || isEQ(open, items[1]) && isEQ(close, items[0])) {
          return true;
        }
      }
    }
    return res;
  }
  function get_Loop_Data(str){
    const keyValueRegex=/((\[|\()(.*?)?(\]|\)))[ ]+([of|in]+)[ ]+([.\w\$\[\]]+)/;
    const DestructuredRegex=/(([\{])(.*?[ ]*)*?([\}]))[ ]+([of|in]+)[ ]+([\w.\$\[\]]+)/;
    const valueRegex=/([\w\$]+)[ ]+([of|in]+)[ ]+([\w.\-\[\]\$]+)/;
    const iterableRegex=/^([.\w\$\[\]]+)$/
    const Loop_Data={}
    if(keyValueRegex.test(str)){
      str=str.replace(keyValueRegex,(match, p1, op, value, cl, type, obj)=>{
        if(!isEQ(op, cl) && isGT(cl, 1) ) {
          $Debug(`Unmaching tags for "for" directive loop data keys mapping\n opening tag does not match a closing tag\n\n found ${p1}`, self, true);
          return;
        }
        const [ item, key, index ] = value.split(' ').join('').split(',');
        
        if( value ) Loop_Data.value=item;
        if( key ) Loop_Data.key=key;
        if( index ) Loop_Data.index=index;
        define(Loop_Data, 'type', {value:type});
        define(Loop_Data, 'obj',{value:obj});
        return match;
      })
    }else if(DestructuredRegex.test(str)){
      str=str.replace(DestructuredRegex, (match, structs,  op, items, cl, type, value)=>{
        Loop_Data.obj=value;
        Loop_Data.type=type;
        Loop_Data.value=structs;
        return match;
      })
    }else if(valueRegex.test(str)){
      str=str.replace(valueRegex,(match, value, type, obj)=>{
        Loop_Data.value=value;
        Loop_Data.type=type;
        Loop_Data.obj=obj;
        return match;
      })
    }else if(str.match(iterableRegex)){
      str=str.replace(iterableRegex,(match, value)=>{
        Loop_Data.obj=value;
      })
    }else{
      $Debug(`Usupported Loop format in '$$for directive'\n\n"${str}" loop syntax is invalid or is not recognised`, self, true);
      return;
    }
    return Loop_Data
  }
  function For_Loop(self, attr, px__VNode){
    const data=get_Loop_Data(attr);
    if(!data) return ;
    let dataObject;
    try{
      dataObject=_$runModelBind(self, data.obj, px__VNode);
    }catch(error){
      $Debug(`Trouble accessing '${data.obj}' object for $$for loop\n\nnot found on instance or is undefined\n\n${error}`, self, true);
      return;
    }
    if(!isIterable(dataObject) && !isNumber(dataObject)){
      $Debug(`Undefined scope for $$for, \n\n${data.obj} not iterable`, self, true);
      return ;
    }
    const Valid_LoopType="of,in";
    if(data.type && !_mapValue(Valid_LoopType, data.type)){
      $Debug(`Iteration issue\n\n"${data.type}" is not an iterator\n "of" or "in" only supported by Pixel`, self, true);
      return;
    }
    return { obj:dataObject, keyName:data.key, valRef:data.value, loopType:data.type, ref:data.obj, index:data.index }
  }
  const hasIFWithFor=(props, cond)=> has_Intersect_Prop(cond.split(','), keys(props)) && keys(props).includes('$$for');
  class renderlessVNode {
    type='conditional'
    source=''
    value=undefined
    compiler_options=undefined
    px__VNode=undefined
    $element=undefined
    siblings=undefined
    constructor(value, compiler_options, source, px__VNode, siblings){
      const fragment=new PixelFragmentVNode(self);
      fragment.IS_RENDERLESS=true;
      this.$element=fragment.$element;
      this.value=value;
      this.compiler_options=assign(this.compiler_options,compiler_options);
      this.source=source;
      this.px__VNode=px__VNode;
      this.siblings=siblings;
    }
  }
  const isRenderlessVNode=vnode=> vnode instanceof renderlessVNode || isTrue(isPixelVNode(vnode) && isTrue(vnode.IS_RENDERLESS));
  function _$Conditional_Dir_Resolver(self, props, args, px__VNode, siblings){
    const GIC=new _$Directive_$Conditional$_Renderer(self, props, args, px__VNode, siblings);
    if(hasOwn(props, '$$if')) return GIC.Panel_If_Block();
    else if(hasOwn(props, '$$else-if')) return GIC.Panel_elseif_Block();
    else if(props && hasOwn(props, '$$else')) return GIC.Panel_else_Block();
  }
  class _$Directive_$Conditional$_Renderer{
    self=undefined
    props=undefined
    args=undefined
    px__VNode=undefined
    options=undefined
    isConditionalVnode=(vnode, cond)=> isPixelVNode(vnode) ? isEQ(vnode.conditional_record.src, cond ) : false;
    siblings=undefined
    constructor(self, props, args, px__VNode, siblings){
      this.self=self
      this.props=props;
      this.args=args;
      this.px__VNode=px__VNode;
      this.siblings=siblings;
    };
    Panel_If_Block(){
      let data=_$runModelBind(this.self, this.props['$$if'], this.px__VNode);
      delete this.args[1]['$$if'];
      if(isTrue(data)) {
        const node = createVElement(...this.args, false, this.px__VNode.LabContext);
        this.px__VNode.conditional_record.src='if';
        this.px__VNode.conditional_record.res=true;
        this.px__VNode.conditional_record.passed=true;
        this.px__VNode.NodeList.add(node);
        return node.$element;
      }else $IfElseDirRenderLess.call(this, data, 'if').$element;
    } 
    Panel_elseif_Block(isElse=false){
      const block=isElse ? 'else' : 'else-if' ;
      let data=_$runModelBind(this.self, this.props['$$'+block], this.px__VNode);
      const previous=this.siblings[len(this.siblings)-1];
      this.px__VNode.conditional_record.passed=previous.conditional_record.passed
      delete this.args[1]['$$'+block];
      if(!len(this.siblings) || !previous || (!this.isConditionalVnode(previous, 'if') && !this.isConditionalVnode(previous, 'else-if'))){
        $Debug(`"${block}" conditional rendering directive block has no preceding "if" or "else-if" directive element\n\n may return unexpected result\ndid you mean "if" directive instead?\n\n at>>>>>>>>""`, this.self, true);
        const node = createVElement(...this.args, false, this.px__VNode.LabContext);
        return node.$element;
      }else if(!isTrue(previous.conditional_record.passed) && isRenderlessVNode(previous) && !isTrue(previous.conditional_record.res)){
        if(isElse || data){
          const node = createVElement(...this.args, false, this.px__VNode.LabContext);
          this.px__VNode.conditional_record.src=block;
          this.px__VNode.conditional_record.res=true;
          this.px__VNode.NodeList.add(node);
          return node.$element;
        }else return $IfElseDirRenderLess.call(this, data, block).$element;
      }else return $IfElseDirRenderLess.call(this, data, block).$element;
    }
    Panel_else_Block(){
      return this.Panel_elseif_Block(true);
    }
  }
  function $IfElseDirRenderLess(data, block){
    const renderless= new renderlessVNode(data, this.args, block, this.px__VNode);
    this.px__VNode.conditional_record.src=block;
    this.px__VNode.IS_RENDERLESS=true;
    this.px__VNode.conditional_record.res=false;
    this.px__VNode.NodeList.add(renderless);
    return renderless;
  }
  function has_Intersect_Prop(obj1, obj2 ){
    let res=false;
    for(const [key, value] of entries(obj1)){
      if(isArray(obj1)) res=_mapValue(obj2, value);
      else if(isPObject(obj1)) res=_mapValue(obj2, key);
      if(isTrue(res)) break;
    }
    return res;
  }
  function _$Directive_$For_Loop$_Renderer(self, args, px__VNode){
    let wrapper;
    const { obj, keyName, valRef, loopType, ref, index }=For_Loop(self, args.props['$$for'], px__VNode) || {};
      delete args.props['$$for'];
    if(loopType && isEQ(loopType, 'in') && valRef && !isNumber(obj) && isObject(obj)){
      $warn(`((Warning))\n\nWe do not recommend the use of key value paires in 'for...in' loops while iterating over a plain object, \n\nsince the value of the value reference will remain "undefined"\nPreferable over a non plain object`, self);
      $warn(`Many JavaScript style guides and linters recommend against the use of 'for...in', because it iterates over the entire prototype chain which is rarely what one wants, and may be a confusion with the more widely-used "for...of" loop\n\nIt's included in Pixel's support for completeness.`, self);
    }
    const NodeList=[];
    const options={
      orgType:getType(obj),
      ref, src:obj,
      args:{ type:args.type, props:assign({}, args.props), children:args.children, is_hyperscript:false, px__VNode, alias:{valRef, keyName}} 
    }
    function destructWarn(ref, object){
      if(ref && destructureRegex.test(ref) && !isObject(object)){
        $Debug(`cannot destructure from a none object value\n\nillegal destructuring found at "${ref}" on $$for directive definition`, self, true);
        return false;
      }
      return true;
    }
    
    if(isNumber(obj)){
      let count=0
      for(let i=0 ; i < obj ; i++){
        count++
        let ctx= {}
        if(isFalse(destructWarn(valRef, obj))) return;
        if(valRef) ctx[valRef]=i+1;
        if(keyName) ctx[keyName]=valRef ? i : i+1;
        if(index) ctx[index]=count
        renderForConditional(self,  arg, ctx, NodeList, i, i+1, options, px__VNode )
      }
    }else if(loopType &&  _mapValue("of,in", loopType) || isIterable(obj)){
      let count=0;
      for(const [ky, vl] of  _validateType(obj, [Set, Map ]) ? obj.entries() : entries(obj)){
        count++;
        if(isFalse(destructWarn(valRef, vl))) return;
        let ctx ={ }
        if(valRef && destructureRegex.test(valRef) ){
          let items=valRef.match(destructureRegex);
          items= items[1].split(',');
          if(len(items)){
            items.forEach((item)=>{
              item=item.trim();
              if(!hasProp(vl, item)){
                $Debug(`loop object value has no such key as "${item}"\n\nInvalid key destructure at at..."${valRef}"`, self, true);
              }else ctx[item]=vl[item];
            });
          }
        }else{
          if(keyName) ctx[keyName]=valRef ? ky : vl;
          if(valRef) ctx[valRef]=vl;
          if(index) ctx[index]=count;
        }
        renderForConditional(self, args, ctx, NodeList, count, vl, options, px__VNode, {  count, value:vl, })
      }
    }
    wrapper= _getNodeListResponse(NodeList, self);
    wrapper.isWidgetWrapper=true;
    wrapper.compiler_options=assign(wrapper.compiler_options,options);
    px__VNode.NodeList.add(wrapper)
    return wrapper.$element
  }
  function renderForConditional(self, args, ctx, NodeList, count, vl, options, px__VNode, co){
    if(px__VNode.LabContext) ctx=assign(px__VNode.LabContext, ctx, NodeList);
      const props=assign({}, args.props);
      const Node=(type, props, children, self, is_hyperscript, ctx, NodeList)=>createVElement(type, props, children, self, is_hyperscript, ctx, NodeList);
      const loopNode=Node(args.type, props, args.children, args.self, false, ctx,  NodeList);
      loopNode.compiler_options=assign(loopNode.compiler_options, assign(co ||  { props, ctx, Node, index:count, value:vl}, options));
      options.Node=Node
      if(loopNode) NodeList.push(loopNode);
  }
  function keyIndex(obj, key){
    return isObject(obj) ? Object.keys(obj).indexOf(key) : _validateType(obj, [Array, Set, Number]) ? Number(key) : isMap(obj) ? obj.keys().indexOf(key) : NaN;
  }
  function VNodeManager(self, options, element, px__VNode, siblings){
    const { type, props, children }=options;
    const conditionals="$$if,$$else,$$else-if"
    if(hasIFWithFor(props, conditionals) && isLT(keyIndex(props, '$$if'), keyIndex(props, '$$for'))) return _$Conditional_Dir_Resolver(self, props, [type, props,  children, self], px__VNode, siblings);
    else if(hasOwn(props, '$$for')) return _$Directive_$For_Loop$_Renderer(self, {type, props, children, self}, px__VNode, siblings);
    else if(has_Intersect_Prop(conditionals.split(','), props)) return _$Conditional_Dir_Resolver(self, props, [type, props,  children, self], px__VNode, siblings);
    else return createPixelElement(type, children, props, self,px__VNode);
  }
  function arrSet(myset){
    const arr=[];
    for(let value of myset.values()){
      arr.push(value)
    }
    return arr;
  }
  function callSetHooks(self, hooks, element, bindObj={}){
    function Callback(){
      for(const hook of hooks.values()){
        try{
          hook.call(bindObj, element||self, hook.value, hook.modifiers);;
        }catch(err){
          $Debug("Unresolved problem during the call of the "+hook.name+" hook of custom "+hook.dirName+" directive",  self, true);
          $Debug(err);
          return element;
        }
      }
      return element;
    }
    return Callback();
  }
  function PixelElementLifeCircleHooks(self, element, px__VNode){
    const args=(hookN)=> [ self, px__VNode[hookN], element, self.model, px__VNode, hookN ];
    if(len(px__VNode.created_hook)){
      element=callSetHooks( ...args('created_hook') );
    }
    if(len(px__VNode.mounted_hook)){
      whenMounted(self, element, ()=>{
        callSetHooks( ...args('mounted_hook') );
      })
    }
    // if(len(px__VNode.updated_hook)) $assignToHookFN(...args('updated_hook') );
    if(len(px__VNode.destroyed_hook)) $assignToHookFN( ...args('destroyed_hook') );
    return  element;
  }
  function $assignToHookFN(self, hookSet, element, model, px__VNode, hookN){
    if(isEQ(len(hookSet), 1)) px__VNode[hookN] =arrSet(hookSet)[0];
    else{
      px__VNode.updated_hook=function(){
        callSetHooks(self, hookSet, element, self.model);
      }
    }
  }
  function resolveElementRef(self, ref, element, px__VNode){
    try{
      set_Object_Value(self.model, ref, element);
    }catch(err){
      $Debug(`Uresolved problem when resolve element ref directive\n\n${err}`, self, true);
      return
    }
  }
  function createVElement(type, props, children, self, is_hyperscript, ctx, siblings, ssc){
    return new PixelElementVNode(...arguments);
  }
  class PixelElementVNode extends PixelVNode{
    constructor(type, props, children, self, is_hyperscript=false, ctx, siblings, ssc){
      super();
      if(is_hyperscript){
        this.is_hyperscript=true;
        this.called_render=true;
      }
      if(ctx) this.LabContext=ctx;
      if(ssc) this.LabContext=assign(ssc, this.LabContext);
      const frameDirectives="$$for,$$if,$$else-if,$$else";
      let element;
      bufferDirSetups(self, props, this);
      if(!is_hyperscript && has_Intersect_Prop(frameDirectives.split(','), props)) element=VNodeManager(self, {type, props, children}, null, this, siblings);
      else element=createPixelElement(type, props, children, self, this);
      element=isNativeElement(element) ? PixelElementLifeCircleHooks(self, element, this) : element;
      this.$element=element
      
      if(hasProp( isPixelWidgetVNode(this) ?  this.widget_instance.ownProperties : this.compiler_options, 'dir--ref')) resolveElementRef(self, isPixelWidgetVNode(this) ? this.widget_instance.ownProperties['dir--ref']  : this.compiler_options['dir--ref'], isPixelWidgetVNode(this) ? this.widget_instance : this.$element, this );
    }
  }
  class PixelFragmentVNode extends PixelVNode{
    constructor(self, vnodes=[]){
      super();
      this.$element=_createFragment(self)
      vnodes=!isArray(vnodes) ? [vnodes] : vnodes;
      for(let node of vnodes.values()){
        if(isPrimitive(node)){
          if(isNull(node) || isEmptyStr(node)) pass;
          else node=new PixelTextVNode(self, String(node), this) ;
        }else if(isRender(node)) node=node(self);
        if(isPixelVNode(node)){
          this.NodeList.add(node)
          this.$element.append(isCustomElement(node) ? node : node.$element);
        }
      }
    }
  }
  class PixelTextVNode extends PixelVNode{
    constructor(self, text,  px__VNode){
      super();
      this.is_hyperscript= px__VNode?.is_hyperscript ;
      if(px__VNode?.LabContext && !this.is_hyperscript) this.LabContext=px__VNode.LabContext
      this.$element=_createTextElement(self, text, this);
      
    }
  }
  class slotInstanceMap{
    slots=new Object();
    constructor(opts){
      for(let [name, value] of entries(opts)){
        value=returnRender(()=>value);
        define(this.slots, name, { value, enumerable, configurable});
      }
    }
  }
  function bufferDirSetups(self, props, px__VNode){
    if(!props || !props['$$@@dir$$--render'] || !len(props['$$@@dir$$--render'])) return;
    for(let dir of props['$$@@dir$$--render'].values()){
      if(isString(dir.name) && !isPixelDirective(dir.name)){
        if(!hasProp(self.register.directives, dir.name) || !self.register.directives[dir.name]){
          $Debug(`"${dir.name} is not a registered directive\n`, self, true);
          return;
        }else if(!_validateType(self.register.directives[dir.name], [Function, Object])){
          $Debug(`directive resolved at "dir.name" is not a valid directive data value`,self, true);
          return;
        }
        dirMap(self, dir, self.register.directives[dir.name], px__VNode );
        props['$$@@dir$$--render'].delete(dir);
      }else if(!isString(dir.name)) {
        dirMap(self, dir, dir.name, px__VNode);
        props['$$@@dir$$--render'].delete(dir);
      }
    }
  }
  function dirMap(self, resolver, dir, px__VNode){
    if(isPObject(dir)){
      for(let [name, hook] of entries(dir)){
        if(_mapValue(LCH, name)){
          if(!isPFunction(hook)){
            $Debug(`"${name} directive hook received at buffer is not a function`, self, true);
            return;
          }
          hook.value=resolver.value;
          hook.modifiers=resolver.modifiers
          px__VNode[name+'_hook'].add(hook);
        }
      }
    }else if(isPFunction(dir)){
      dir.value=resolver.value;
      dir.modifiers=resolver.modifiers
      px__VNode.created_hook.add(dir);
    }
  }
  function renderSlots(options){
    if(!isPObject(options)){//renderimg of slots contents in hyperscript
      $Debug(`expects an Object as a positional argument  to "renderSlots" method`, self, true);return;
    }
    return new slotInstanceMap(options);
  }
  function renderFor(iterable, render){
    if(!isIterable(iterable) && !isNumber(iterable)){
      $Debug(`Undefined scope for "renderFor" macro, \n\n${iterable} value not iterable`);
      return ;
    }
    const NodeList=[]
    iterable=isPFunction(iterable) ? iterable() : iterable;
    if(isIterable(iterable)){
      const iteration =  _validateType(iterable, [Set, Map, Array]) ? iterable.entries() : isPObject(iterable) ? entries(iterable) : [] ;
      let index=0;
      for(let [key, value] of iteration){
        index++
        const vnode=render(value, key, index);
        vnode.compiler_options.index=index;
        NodeList.push(vnode);
      }
    }else if(isNumber(iterable)){
      let index=0;
      for(let i=0; i<iterable;i++){
        index++;
        const vnode=render(i, i+1, index);
        vnode.compiler_options.index=index;
        NodeList.push(vnode);
      }
    }
    return function render(self){
      const fragment= new PixelFragmentVNode(self, NodeList);
      fragment.isWidgetWrapper=true;
      fragment.compiler_options.src=iterable;
      return fragment
    }
  }
  const isPixelWidgetVNode=vnode=>isPixelVNode(vnode) && vnode.is_mount_root && isPixelBuild(vnode.widget_instance);
  function getChild(attributes, children){
    let res;
    if(attributes) {
      res= hasOwn(attributes,'args2') && isChildrenNode(children) ? children : hasOwn(attributes, 'args3') && isChildrenNode(attributes) ? attributes : null;
      if(hasOwn(attributes,'args2')) delete attributes['args2'];
      else if(hasOwn(attributes, 'args3')) delete attributes['args3'];
    }else if(!attributes && isChildrenNode(children)) res=children;
    return res;
  }
  function _resolveCustomNativeElement(self, nativeArgs, px__VNode){
    let { type, attributes, children }=nativeArgs;
    const body=createPixelElement('body');
    let attrsStr="";
    for(const [key, attr]  of entries(attributes||{})){
      attrsStr=`${attrsStr} ${key}="${attr}"`;
    }
    if(isRender(children) ? children(self) : children){
      children=isRender(children) ? children(self) :  children;
      if(!isString(children)) body.append(isPixelVNode(children)  ? children.$element  : isPixelWidgetVNode(children) ? children.build.$element : children);
      else body.innerHTML=children;
      children=body.innerHTML;
    }
    const html=`<${type} ${attrsStr.trim()}>${children||''}</${type}>`;
    const customEl=new DOMParser().parseFromString(html,'text/html').body.childNodes[0];
    if(isCustomElement(customEl) || isNativeElement(customEl)) return customEl;
  }
  function createPixelElement(type, props, children, self, px__VNode){
    if(isString(type) && (IS_VALID_TAGNAME(type) && !instance_Has_Widget(self||{}, type))) return _createNativeElement(...arguments);
    else return _createWidgetElement(...arguments);
  }
  
  function _createNativeElement(type, attributes, children, self, px__VNode){
    const argsCount=len(new Set(arguments));
    let element;
    const is_hyperscript=px__VNode?.is_hyperscript || false;
    if(px__VNode)  px__VNode._vnode_key=_generateUUID(7)
    if(isString(type)){
      if(IS_VALID_TAGNAME(type)){
        element=document.createElement(type);
        if(px__VNode) px__VNode.is_element_node=true
        if(self && len(self) && px__VNode) {
          px__VNode.px_hash_=self.ownProperties.px_hash_
        }
      }else return _resolveCustomNativeElement(self, { type, attributes, children}, px__VNode);
    }
    if(attributes && hasOwn(attributes, '$$raw')  && !is_hyperscript){
      const name=attributes['$$raw'];
      let item=_$runModelBind(self, name, px__VNode, true);
      if(px__VNode) px__VNode.compiler_options['dir--raw']=item;
      delete attributes['$$raw'];
    }
    element.PATCH_FLAGS=new Set()
    if(children && !IS_HTML_VOID_TAG(type)) {
      if(px__VNode && hasOwn(px__VNode.compiler_options,'dir--raw')){ 
        if(!isFalse(px__VNode.compiler_options['dir--raw'])){
          element.innerHTML=attributes.$$rawChildrenData$$
        }else element= _initiateChildNodes(self, children, px__VNode, element );
        delete attributes.$$rawChildrenData$$;
      } else element= _initiateChildNodes(self, children, px__VNode, element );
    }
    if(attributes) element=AttributeManager(attributes, element, self, px__VNode)
    if(self && self.ownProperties.px_hash_) element.setAttribute("data-px_hash_", self.ownProperties.px_hash_);
    return element;
  }
  function _createWidgetElement(type, props, children,  self, px__VNode){
    const is_hyperscript=px__VNode?.is_hyperscript;
    if(isString(type) && !is_hyperscript){
      children=children(self, px__VNode)
      const slotRender=(inst, VNode, fall)=>isString(children) ? _HTMLParser(children, inst, true, VNode, fall ) : isRender(children)  ? children(inst, VNode) : children
      const widget=ResolveWidget(self, px__VNode, {type, props, children:slotRender })//reso;ving a widget data object
      px__VNode.is_mount_root=true;
      px__VNode.px_hash_=self.ownProperties.px_hash_;
      px__VNode.widget_instance=widget;
      if(widget.ownProperties.slot_name) px__VNode.slot_name=widget.ownProperties.slot_name;
      return widget && isPixelBuild(widget) ? widget.build?.$element : '';
    }else if((validPixelWidget(type) || isWidgetResolver(type)) && is_hyperscript){
      if(isWidgetResolver(type)){
        if (instance_Has_Widget(self, type.name) ){
          let widget=normalize_Widget(self, type.name);
          widget= isPFunction(widget) ? widget.bind(self.model) : isClass(widget) ? widget : Object.create(widget);//binding or creating a new object model
          if(!widget.name) widget.name=type.name
          if(type.$attributes) define(widget, '$attributes', {value:type.$attributes, enumerable, writable})
          if(type.$children) define(widget, '$children', {value:type.$children, enumerable, writable})
          type=widget;
        }else{
          $Debug(`traverse macro was unable to find a widget with the provided name "${type.name}"\n\n are you sure this is a builtIn/globaly/localy registered widget`, self, true);
          return;
        }
      }
      const widget=CompilePatcher(self, type, type, px__VNode)
      if(px__VNode) {
        px__VNode.is_mount_root=true;
        px__VNode.widget_instance=widget;
      }
      if(widget.ownProperties.slot_name) px__VNode.slot_name=widget.ownProperties.slot_name;
      return widget && isPixelBuild(widget) ? widget.build.$element : '';
    }
  }
  function formatExpression(objKey, keys, expression){
    keys=new Set(keys)
    const keysRegex=/[\w@$.]+/g
    return expression.replace(keysRegex, (match, p2)=>{
      const matches=match.match(/[\w@#$]+/)
      if(keys.has(matches[0])) match = `${objKey}.${match}`;
      return match;
    });
  }
//A replacement for the with  js expression
  function _EvalWith( data , expression , autoReturn=false) {
    expression=formatExpression('obj', Object.keys(data), expression)
    const run = Function( 'obj',...Object.keys( data ) , `"use strict"; ${ autoReturn ? 'return' : '' } ${ expression }` );
    return run( data );
  }
  function hasSpecialCharacters(value) {// Define the regular expression for special characters
    const regex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    return regex.test(value);  // Test if the value contains any special characters
  }
  const unsupportedDelimiters="${,<,>";
  function includesUnsupported(delimiters){
    let response=false;
    for(const deli of delimiters.values()){
      unsupportedDelimiters.split(',').forEach((v)=>{
        response=deli.includes(v);
        if(isTrue(response)) return response;
      })
    }
    return response;
  }
  function escapeRegExp(string) { 
    return string.replace(/[.!@#%_\,<>:;'"\-=*+?^${}()|[\]\\]/g, '\\$&'); 
  }
  function _decodeReverse(str){
    str=str.replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      //.replace(/&amp;/g, '&')
      .replace(/&#39;/g, '\\')
    return str;
  }
  function resolveAccessor(self, vnode, node, px__VNode){
    let [ open, close ] = self.core.settings.delimiters ;
    if( open && close ){
      if( !hasSpecialCharacters( open ) || !hasSpecialCharacters( close ) ) $Debug(`mustache customization error::\n\n delimeters must match value of special characters\n\ne.g !, @, #, $, %, ^, &, *, (, ),  [, ], {, }, ;, :, ?`,  self, true ); 
      else if(includesUnsupported([ open, close ])) {
        $Debug(`Invalid  delimiter value :: \n\n"${open} or ${close} is an unsupported delimiter constructs"\n cannot be used as a string mustache delimeter since this are javascript multiline string interpolation technic\n\n Delimeter Configuration failed`, self, true);
      }
    }
    open=hasSpecialCharacters(open) ? escapeRegExp(open) : open ;
    close=hasSpecialCharacters(close) ? escapeRegExp(close) : close ;
    const pattern=new RegExp(`${open}(.*?)${close}`, 'g');
    let link;
    let str=node.textContent;
    if(str.match(pattern)) {
      str=str.replace(pattern, (match, text)=>{
        text=_decodeReverse(text.trim());
        link=text;
        const prefix=text.split('>>');
        const blocks=isGT(len(prefix), 1) ? prefix.shift() : null;
        if(blocks) {
          const parameters=retrieveBlocksParams(self, prefix, px__VNode);
          text=$Block_HelpersService(self, parameters, blocks, px__VNode).shift();
          
        }else{
          text=_$runModelBind(self, prefix.shift().trim(), px__VNode);
        }
        return compileToRenderable(text);
      })
    }
    return str;
  }
  function retrieveBlocksParams(self, params, px__VNode){
    const parameters=[];
    params.forEach((text)=>{
      const value=_$runModelBind(self, text.trim(), px__VNode);
      parameters.push(value);
    })
    return parameters;
  }
  function _$runModelBind(self, ref, px__VNode, returnRef=false){
    let value;
    try{
      value=_Evaluate_THIS( self.model , ref, self, px__VNode?.LabContext) ;
    } catch(err){
        if(!returnRef){
          $Debug(`Accessor Error::\n\nvalue "${ref}" property value was accessed during render, but not initialized on model or is undefined\n\nat at\n ..."${name} property \n\n${err}`, self, true);
          throw new Error(err)
          return;
        }else  return ref
    }
    return value 
  }
  const hasBlockInstance=(self, name)=>_mapValue(BUILT_IN_BLOCKS, name) || _mapValue(self.register.blocks, name);
  const normalize_Block=(self, name)=>hasOwn(BUILT_IN_BLOCKS, name) ? BUILT_IN_BLOCKS[name] : self.register.blocks[name] || pass;
  const BUILT_IN_BLOCKS={
    upper(args, modifiers){
      let [ value ]=args;
      return isString(value) ? String(value).toUpperCase() : value;
    },
    title(args, modifiers){
      let value=args[0]
      if(!isString(value)) return value;
      const splitted=String(value).split(' ');
      for(let [ind, val] of entries(splitted)){
        splitted[Number(ind)]=val.charAt(0).toUpperCase()+val.slice(1)
      }
      return splitted.join(' ');
    },
    lower(args,  modifiers){
      return String(args[0]).toLowerCase();
    },
  }
  function $Block_HelpersService(self, value, blocks,px__VNode){
    const modifiers=blocks.split('|');
    blocks=modifiers.shift().split('.');
    if(!len(blocks)) return  value.shift();
    let index=0;
    for(const block of blocks.values()){
      index++;
      let name=block.trim() ||  null;
      if(name && isEQ(index, 1) && !isEmptyStr(name) && !name.startsWith('%')){
        $Debug(`Failed Block helper call\n\n block names are recognised by prepending a single "percentage(%)" character to the initiale block name in the chain`,self, true);
        return;
      }
      name=isEQ(index, 1) ? name.slice(1) : name;
      if( name && !hasBlockInstance(self, name)) {
        $Debug(`Unrecognized  block name "${name}"\n\n if this is a custom block, make sure it's registered through the local block option or global prototype method`,  self, true);
        return;
      }
      const blockInstance=normalize_Block(self, name);
      if(!_validateType(blockInstance, [Function, Object])){
        $Debug(`${name} block receives and Invalid type definition\n\nExpects a block function or an object type exposing a block method which acts as the block function itself`, self, true);
        return;
      }else if(isPObject(blockInstance)){
        if(!hasProp(blockInstance, 'block')){
          $Debug(`"${name}" block instance does not expose a block method which acts as the block function`, self, true);
          return;
        }else if(!isPFunction(blockInstance.block)){
          $Debug(`"${name}" block instance block property value is not a method/callable  \n\n Expects a function type whiacts as the block function`, self, true);
          return;
        }
      }
      const blockCallback=isPObject(blockInstance) ? blockInstance.block : blockInstance;
      try{
        value=blockCallback(value, modifiers, px__VNode);
        value = [ value ]
      }catch(error){
        $Debug(`Encountered an error when running the block callback ${name}`, self, true);
        $Debug(error, self);
        return;
      }
    }
    return value
  }
  function _Compiler_Call(self, str, vnode, px__VNode){
    const pattern=/__\$ref\((.*?)\)__/g;
    let link;
    if(str.match(pattern)) {
      str=str.replace(pattern, (match, text)=>{
        text=text.trim();
        link=text;
        try{
          let name=text;
          text=_$runModelBind(self, text, px__VNode);
        } catch(err){
          $Debug(`accessor Error\n\n "${text}" property was accessed on build, but not defined on build model\n\n ${err}`, self, true);
          ;return ;
        }
        return text;
      })
    }
    return str;
  }
  const PixelDirectives="if,else,else-if,html,text,for,raw,ref,slot,model,px,bind,on,scoped,fall";
  const widgetPassableDirectives="html,text,scoped,if,else,else-if,for,ref,slot,bind,on"
  const autoBindedDirectives="model,for,ref,bind,on"
  const NodeBasedDirectives="html,text,raw,model,scoped,ref,if,else,else-if,slot,bind,on,fall";
  const hyperscriptDirectives="html,text,ref,slot,on,scoped,model,fall";
  const isHyperscriptDirective=dir=>_mapValue(hyperscriptDirectives, dir);
  const cond_Directives="if,else-if,else";
  const isPixelDirective=dir=>_mapValue(PixelDirectives, dir);
  const isNodeBaseDirective=dir=>_mapValue(NodeBasedDirectives, dir)
  function _Evaluate_THIS(obj, str, self, optional){
    // Check if the expression contains //semicolons
    if (str.includes(';')) {
      throw new Error('Invalid expression: \n\n";" not allowed\n Only single expressions are allowed.', self, true);
      return;
    }// Use a regular expression to match statements or multiple expressions
    const statementRegex = /^(?:let|var|const|if|for|while|do|switch).*$/;
    if (statementRegex.test(str)) {
      throw new Error('Invalid expression:\n\n Only single expressions are allowed and no statement.', self, true);
    }// Use a regular expression to remove comments from the expression by using string .replace regex method
    const commentRegex = /\/\/.*$|\/\*[^]*?\*\//g;//comment matching regular expression
    const expressionWithoutComments = str.replace(commentRegex, '');// Use a regular expression to match any remaining unsupported constructs and statement keywords
    // const unsupportedRegex = /(?:\.\.|\/\/|\/\*|\*\*|\[=|==\+|-\+|\+=|\-=|\*=|\/=|%=\*\*=|&&=|\|\|=|<=|>=|\breturn\b|\bthrow\b|\bfunction\b|\bnew\b|\btypeof\b|\bdelete\b|\binstanceof\b|\bvoid\b|\bnull\b|\bundefined\b|\bconst\b|\blet\b|\bvar\bclass\b)/;
    const unsupportedRegex = /(?:\.\.|\breturn\b|\bthrow\b|\bdelete\b|\bvoid\b|\bconst\b|\blet\b|\bvar\b)/;
    if (unsupportedRegex.test(expressionWithoutComments)) {
      throw new Error(`Invalid expression: \n\nUnsupported constructs are not allowed.\n\n"${expressionWithoutComments}"`, self, true);
    }
    const getValue = new Function('obj','$$$ctx', `
      with(obj){
        if($$$ctx){
          with($$$ctx){
            return ${str};
          }
        }
        return ${str};
      }
      `);
    let value;
    try{
      value = getValue(obj, isPObject(optional) ? optional : null);
    }catch(error){
      throw new  Error(error);
    }
      return value;
  }
  function withFallThrough(fn){
    return new fallThrough(fn);
  }
  function __Attr_Name_Resolver(self, attr, px__VNode){
    let iniAttr=attr;
    if (hasAsterisks_bind(attr)) attr= attr.slice(1)  ;
    const pattern=/\[(.*?)\]/g;
    const matches=attr.match(/\[(.*?)\]/g);
    if(attr.match(pattern)){
      let name=''
      attr=matches[0].replace(pattern, (match, text)=>_$runModelBind(self.model, text, px__VNode, true))
    }
    if(px__VNode) px__VNode.PATCH_FLAGS.add('ELEMENT_ATTRIBUTES');
    return hasAsterisks_bind(iniAttr) ?  '*'+attr : attr;
  }
  const DebugFlags={
    slots:"compilation of slot element",
    template:"template compile process",
    hook:name=>"during the call of "+name.toUpperCase()+" hook",
    build:"during the call of the build function",
    register:(name)=>"the registration of a "+name,
    forloop:"during mapping of the for directive",
    ifElse:name=>"during the consitional rendering of the "+name+" directive",
  }
  function push_Unique(arr, val){
    const  setData=new Set(arr);
    setData.add(val);
    return arrSet(setData);
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
    if ((isString(str) ? str.includes('.') : false)) {
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
  function _capitalize(str) {
    return str.replace(/-+([a-zA-Z])/g, (match, letter) => letter.toUpperCase());
  }
  function _hyphenate(str) {
    return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
  }
  function parse_Class_Binding(self, item, element, isRerender){
    if(isPObject(item)){
      entries(item).forEach(([key, value])=>{
        if(value) toggleClassNames(element, key);
      })
    }else if(isArray(item) || isSet(item)){
      for(const value of item.values()){
        if(isString(value)) toggleClassNames(element, value);
        else if(isPObject(value)) parse_Class_Binding(self, value, element, isRerender);
        else{
          $Debug(`Failed to create element class from bind array data`,self, true);
          return;
        }
      }
    }else if(isString(item)) toggleClassNames(element, item);
  }
  function toggleClassNames(element, classes, remove=false){
    classes.split(' ').forEach((cls)=>{
      if(cls) element.classList[isTrue(remove) ? 'remove' : 'add'](cls);
    })
  }
  function parse_Style_Binding(self, item, element){
    if(isPObject(item)){
      entries(item).forEach(([key, style])=>{
        if(!isString(style)){ 
          $Debug(`Unrecognized stype property value \n\nat at\n "${key}" style property\n\n${element.outerHTML}`, self, true); 
        return;
        }
        key=_capitalize(key)//support for hyphen included css style classess
         element.style[key]=style
      })
    }else if(isArray(item)){
      for(const value of item.values()){
       if(isPObject(value)) parse_Style_Binding(self, value, element)
      }
    }else if(isString(item)){
      let splited=item.trim().split(';');
      for(let styling of splited.values() ){
        if(styling && styling.includes(':')){
          const spread=styling.split(':');
          element.style[spread[0]]=spread[1];
        }
      }
    }
  }
  function fall_AttrName(key, attr){
    const Key_Binding={ '*':1, '@':1, '$$':2, '--':2, 'dir--':5, '...':3 };
    if( isString(attr) && attr.trim() || !isString(attr) && attr || isBoolean(attr)) return attr ;
    for(const [ky, sl] of entries(Key_Binding)){
      if(key.startsWith(ky)){
        return key.slice(sl);
      }
    }
  }
  const isOnListener=key=>/^on\w+$/.test(key);
  function directive_sep(key){
    return key.includes(':') ? key.split(':') : [key]
  }
  function vnodeObserver(self, element){
    function callback(list, observer){
      for(const mutation of values(list)){
      }
    }
    const observer= new MutationObserver(callback);
    observer.observe(element, { attributes: true, childList: true, subtree: true })
  }
  function AttributeManager(props, element, self, px__VNode, isRerender=false){
    if(!isPObject(props))return;
    const is_hyperscript= px__VNode ? px__VNode.is_hyperscript : false;
    if(isTrue(isRerender)) specialPropsPrefix(self, props, element, px__VNode);
    const illegal=prop=>is_hyperscript && isTrue(hasAsterisks_bind(prop) || has$$_bind(prop) || hasAt_bind(prop))
    entries(props).forEach(([key, attr ])=>{
      if(illegal(key)){
        $Debug(`Illegal binding not allowed in render function mode\n\n"${key}" property has a disallowed binding directive property`);
        return element;
      }
      if(!is_hyperscript){
        key=__Attr_Name_Resolver(self, key, px__VNode);
        if(hasAsterisks_bind(key)) key='$$bind:'+key.slice(1);
        else if(hasAt_bind(key)) key='$$on:'+key.slice(1);
        px__VNode.PATCH_FLAGS.add('ELEMENT_ATTRIBUTES')
      }
      if(has$$_bind(key)){
        let modifiers=key.includes('|') ? key.split('|') : [];
        key=len(modifiers) ? modifiers.shift() : key;
        if(isPixelDirective(directive_sep(key)[0].slice(2)) &&  !is_hyperscript) element=_Resolve_Builtin_Directives(self, key, attr, element, px__VNode, modifiers);
        else if(!is_hyperscript) element=_Resolve_Custom_Directives(self, key, attr, element, px__VNode);
        px__VNode.PATCH_FLAGS.add('ELEMENT_ATTRIBUTES')
      }else if(isHTMLIDLAttributes(key) && !isHTMLBooleanAttributes(key)){
        if(isEQ(key,'style')) parse_Style_Binding(self, attr, element);
        else element[key]=attr
      }else if(isHTMLBooleanAttributes(key)) boolAttrsParse(element, key, attr)
      else if(isEQ(key, 'class')) parse_Class_Binding(self, attr, element, isRerender);
      else if(hasSpread_bind(key) && !is_hyperscript) return Attribute_Spread(self, attr, element,  px__VNode);
      else if(isOnListener(key)) {
        if(!isPFunction(attr)){
          $Debug(`on<EventName> listener expects a function value\n\nFound "${attr}`, self, !isNull(self));
        }else{
          const options=attr.options || {};
          const events=_hyphenate(key).split('-');
          events.shift();
          $$dir_ON(self, attr, element, px__VNode, events, []);
        }
      }else if(isEQ(key,'$$@@dir$$--render')){
        justifyHyperscriptDirectiveBuffer(self, attr,  element, px__VNode);
        delete props[key];
      }else{
        try{ 
          element.setAttribute(key, attr||'');
        }catch(err){
          $Debug(`Attribute Error::\n\n...unable to set node attribute "${key}\n\n ${err}`, self, true, `When setting the attribute "${key}" on "${element.outerHTML}"`, self, !is_hyperscript );
          return element;
        }
      }
     })
     return element;
  }
  function specialPropsPrefix(self, props, element, px__VNode){
    
  }
  function justifyHyperscriptDirectiveBuffer(self, directives, element, px__VNode){
    for(const buff of directives.values()){
      let { name, value, modifiers }=buff;
      if(isHyperscriptDirective(name)) callHDir(self, buff, element, px__VNode )
      else {
        
      }
    }
  }
  function callHDir(self, direct, element, px__VNode){
    const { modifiers, name }= direct;
    if(isPixelDirective(name) && !isHyperscriptDirective(name)){
      $Debug(`can't commit buffering on the "${name}" directive`, self, true);
      return;
    }else if(!isHyperscriptDirective(name)){
      if(!hasProp(self.register.directives||{})){
        $Debug(`unresolve directive name passed to buffer\n\n"${name}" is not defined\nMake sure this is registered globally/localy through this widget instance thread`, self, true, "during resolving of the 'buffer' object");
        return;
      }else pass
    }else if(isEQ('html', name) || isEQ('text', name)) $$dir_HTML(self, direct.value, element, px__VNode, isEQ('text', name), modifiers);
    else if(isEQ('slot', name)) $$dir_SLOT(self, direct.value, element, px__VNode, modifiers);
    else if(isEQ('on', name)) $$dir_ON(self, direct.value, element, px__VNode, modifiers);
    else if(isEQ('scoped', name)) $$dir_SCOPED(self, direct.value, element, px__VNode, modifiers);
    else if(isEQ('ref', name)) $$dir_REF(self, direct.value, element, px__VNode, modifiers);
    else if(isEQ('model', name)) $$dir_MODEL(self, direct.value, element, px__VNode, modifiers);
    // else if(isEQ('fall', name)) $$dir_FALL(self, direct.value, element, px__VNode,modifiers );
  }
  function boolAttrsParse(vnode, key, attr){
    if(!isEQ(attr, false)) {
      if (isHTMLIDLAttributes(key)) vnode[key]=attr;
      else vnode.setAttribute(key, attr||'');
    }else{
      if (isHTMLIDLAttributes(key) && hasProp(vnode, key)) delete vnode[key];
      else if(hasAttribute(key)) vnode.removeAttribute(key);
    }
  }
  function Attribute_Spread(self, data, vnode, px__VNode){
    let value= isString(data) ? _$runModelBind(self, data.slice(3), px__VNode) : data;
    if(!isPObject(value)){
      $Debug(`spread syntax on px__VNode can only accept binded values of an object`, self, true);
      return vnode;
    }
    vnode = AttributeManager({ ['$$bind']:value }, vnode, self,  px__VNode)
    return vnode;
  }
  function _With_Custom_Directives(self, data, vnode, px__VNode){
    let { key, attr } = data || {};
    attr =bindKeyAsValue(key, attr);
    let value=_$runModelBind(self, attr, px__VNode, true)
    let has_modifiers=false;
    let modifiers=key.includes('|') ? key.split('|') : null ;
    if(modifiers && isGT(len(modifiers),1)) has_modifiers=true;
    let Name= bool(has_modifiers) ? modifiers.shift() : key ;
    Name=directive_sep(key)[0].slice(2);
    if( !hasOwn(self.register.directives, Name )){
      $Debug(
        `((Undefined Directives Reference))\n\n "${key}" directive is not a registered pixel directive on this widget\n\nat...........at>>>.\n ${vnode.outerHTML}`
      , self, true, "during directive resolving"  );
      return vnode;
    }
    const directive= self.register.directives[Name];
    const CustomDir ={  created:pass, updated :pass,  mounted :pass};
    if(isPFunction(directive)) CustomDir.created=directive;
    else if(isPObject(directive) ){
      if( !has_Intersect_Prop(LCH.split(','), keys(directive))) {
        $Debug(`((Directive Error))\n\ndirective object does not return an "created/mounted/updated/init" method`, self, true); 
        return vnode;
      }else{
        for(const [ name, hook] of  entries(directive)){
          if(new Set(LCH.split(',')).has(name)){
            if(!isPFunction(directive[name])){
              $Debug(`((Custom direction))\n\ncustom Directive "${Name}" ${name}  hook is not a function`,self, true);
              return vnode;
            }else {
              const Obj_Modifier={};
              if(len(modifiers)){
                for(const val of modifiers.values()){
                  define(Obj_Modifier, val, {value:val, enumerable, configurable})
                  }
              }
              hook.modifiers=Obj_Modifier;
              hook.value=value;
              hook.dirName=Name;
              CustomDir[name]=hook;
            }
          }
        }
      }
    }
    if(!isNativeElement(vnode) && vnode.$$$customDirs){
      define(vnode, '$$$customDirs',{value:{
        init_hook:new Set(), 
        created_hook:new Set(),
        mounted_hook:new Set(),
        updated_hook:new Set(),
      }, enumerable, configurable});
    }
    for(let hook of LCH.split(',').values()){

      if(CustomDir[hook] && !isPass(CustomDir[hook])) {
        if(isNativeElement(vnode) && !validPixelWidget(vnode)) px__VNode[hook+'_hook'].add(CustomDir[hook]);
        else if(validPixelWidget(vnode)) vnode.$$$customDirs[hook+'_hook'].add(CustomDir[hook]);
      }
    }
    return vnode;
  }
  function isPass(func){
    return isPFunction(func) && isEQ(func.name,'pass');
  }
  function _Resolve_Custom_Directives(self, key, attr, vnode, px__VNode){
    return _With_Custom_Directives(self, { key, attr}, vnode, px__VNode);
  }
  function _Run_With_Modifiers(vnode, modifiers, func, events, runImmediately=true){
    if(!isFunction(func)){
      $Debug(`"${key}" event Callback must be passed as  a function \n \n${func } is not a valid event callback  method`, self, true);
      return;
    }
    modifiers=new Set(modifiers);
    const options={}
    if(modifiers.has('once')) options.once=true;
    if(modifiers.has('passive')) options.passive=true;
    if(modifiers.has('nonpassive')) options.passive=false;
    if(modifiers.has('capture')) options.capture=true;
    if(modifiers.has('noncapture')) options.capture=false;
    function __With_Modifiers(event){
      if(modifiers.has('prevent')) event.preventDefault()
      if(modifiers.has('stop')) event.stopPropagation()
      if(modifiers.has('trusted')) func=event.isTrusted ? func : pass
      if(modifiers.has('self')){
        if(!vnode.isEqualNode(event.target)) return;
      }
      func(event)
    }
    if(!runImmediately)  return [ __With_Modifiers, options]
    if(!(IS_ELEMENT_NODE(vnode) && len(events))) return;
    for (let eventName of events.values()) vnode.addEventListener(eventName, __With_Modifiers, options);
  }
  function withModifiers(Callback, modifiers){
    if(!isFunction(Callback)){
      $Debug(`Callback argument passed  to withModifiers is not a function`);return pass
    }else if( modifiers && !isArray(modifiers)){
      $Debug(`Having a problem during the call of the "withModifiers" method.\n\nPositional argument, :"Modifiers" must be of type "Array" with string values. `);
      modifiers=[];
    }
    const Data=_Run_With_Modifiers(null, modifiers, Callback,[], false);
    const func=Data[0];
    if(len(Data[1])) define(func, 'options', {value:Data[1], enumerable, configurable});
    return func;
  }
  function bind_directive_receiver(self, props, vnode, px__VNode, modifiers){
    let is_hyperscript=px__VNode.is_hyperscript;
    let { item, key }=props;
    item=isOnListener(key) && !is_hyperscript && !has_Object_Prop(self.model, item ) && !isFNString(item) ? `()=>{ ${ item } }` : item ;
    let bra=_$runModelBind(self, item||'', px__VNode );
    if(isUndefined(bra)) bra='';
    if(!key){
      if (!isPObject(bra)) $Debug(`Directive attributes binding expects an objects value when not chained to any attribute/property argument`, self, true);
      else vnode=AttributeManager(bra, vnode, self, px__VNode);
    }else vnode=AttributeManager({ [key]:bra }, vnode, self, px__VNode );
    return vnode;
  }
  function  bindKeyAsValue(keys, value){
    if(isEmptyStr(value) ||  !value){
      const sep=directive_sep(keys)
      const lastAttr=len(sep) ? sep.pop() : value;
      return has$$_bind(lastAttr) ? lastAttr.slice(2) : lastAttr
    }else return value;
  }
  function $$dir_HTML(self, value, vnode, px__VNode, text, modifiers ){
    const is_hyperscript=px__VNode.is_hyperscript;
    if(!is_hyperscript) value=_$runModelBind(self, value, px__VNode, true)
    if( isPrimitive(value)) {
      const innerProp=isTrue(text) ? 'innerText' : 'innerHTML';
      if(!isNativeElement(vnode) && value)  self.model.$attrs[innerProp]=value;
      else if(value) vnode[innerProp]=value;
    }
  }
  function $$dir_SLOT(self, item, vnode, px__VNode, modifiers){
    try{
      Object_Value(self.model, item, true);
    }catch(err){
      
    }
    const iswt=!isNativeElement(vnode)
    let value=_$runModelBind(self, item, px__VNode, true)
    if(!isString(value)){
      $Debug(`value Error::\n\n slot name undefined or is not a string\n\n Error resolving slot  directive name reference on "${iswt  ?  self.ownProperties.name : vnode.localName}"`, self, true);
      return;
    }
    if(!iswt) px__VNode.slot_name=value;
    else vnode.$attributes['@@slotName']=value;
  }
  function $$dir_BIND(self, prop, el, px__VNode, modifiers ){
    let { key, item }=prop;
    if(isNativeElement(el)){
      key=directive_sep(key);
      key.shift();
      key= isGT(len(key), 1) ? key.join(':') : key[0];
      return bind_directive_receiver(self,{ key, item }, el, px__VNode, modifiers)
    }else widgetBindingReceiver(self, key, item, el, px__VNode, modifiers)
  }
  function $$dir_ON(self, attr, node, px__VNode, key, modifiers){
    const isWidget=!isNativeElement(node);
    if(isString(attr)){
      const signalsRegex=/^(@@)/g
      if(signalsRegex.test(attr)) attr=attr.replace(signalsRegex, (match)=>match='$signals.');
      try{
        attr=attr.split(' ').join('');
        const funcRef=attr;
        attr=_$runModelBind(self, isFalse(has_Object_Prop(self.model, attr.trim()) && has_Object_Prop(px__VNode.LabContext||{}, attr) && isFNString(attr)) ? `()=>{${attr.trim()}}` : attr.trim(), px__VNode);
        attr=has_Object_Prop(self.model, funcRef) && isPFunction(attr) ? attr.bind(self.model) : attr;
      }catch(err){
        $Debug(`${err}`, self, true);
        return node;
      }
      if(!isPFunction(attr)){
        $Debug(`"${name}" event must be wrapped as or in a function \n\non.....on...\n  "${isWidget ?  '' : node.localName}" \n`, self, true);
        return node;
      }
    }
    let opts;
    const events=isArray(key) ? key : key.slice(5).split('.');
    if(len(modifiers)) {
      if(isWidget){
        const [ attr, opts ] = _Run_With_Modifiers( null, modifiers, isFunction(attr) ? attr : pass, events, false);
      }else _Run_With_Modifiers(node, modifiers, isFunction(attr) ? attr : pass, events);
    } else {
      if(isWidget){
        if(len(events)){
          define(node.$attributes, '@@Events', { value:{}, configurable, enumerable});
          for( let [ ind, ev ] of events.entries()){
            define(node.$attributes['@@Events'], ev,{ value: new pixelSignal(ev, param, opts) , enumerable, configurable});
          }
        }
      }else if(len(events)){
        for(let event of events.values()) {
          if(!IS_VALID_EVENT_HANDLER(event)){
            $Debug(`"${event}" is not a valid event name`, self, true);
          }else node.addEventListener(event, isFunction(attr) ? attr : pass);
        }
      }
    }
    return node;
  }
  function $$dir_REF(self, item, node, px__VNode, modifiers){
    const isWidget=!isNativeElement(node);
    if(!has_Object_Prop(self.model, item)){
      $Debug(`value "${item}" property value was accessed during render, but not initialized on model or is undefined\n\nat at\n ..."${name} directive on ${isWidget ? '$$ref' : vnode.localName} `,self, true);
      return;
    }
    try{
      get_Object_Value(self.model, item, true);
    }catch(err){
      $Debug(`value "${item}" property value was accessed during render, but not initialized on model or is undefined\n\nat at\n ..."${name} directive on ${isWidget ? '$$ref' : vnode.localName} `, self, true);
      return;
    }
    if(isWidget) {
      node.$attributes['$$$$dir--ref$$$$']=item;
    }else px__VNode.compiler_options['dir--ref']=item;
  }
  function $$dir_SCOPED(self, item, node, px__VNode, modifiers){
    const isStyleEl=isNativeElement(node) && isEQ(node.localName, 'style');
    if(!isStyleEl) {
      $Debug(`"$$scoped" directive is only scoped to document <style> elements only`, self, true);
      return node;
    }
    let value=_$runModelBind(self, item, px__VNode, true);
    if(isFalse(value)) return node;
    node.innerHTML=_styleSheet_hydration(self, node.innerHTML);
    return node;
  }
  function $$dir_FALL(self, item, node, px__VNode, modifiers){
    const isWidget=!isNativeElement(node) && validPixelWidget(node);
    if(!isWidget) {
      $Debug(`"$$fall" directive is only scoped to widget instances vnode only\n\n found on "${isNativeElement(node) ? node.outerHTML+" element" : ""}"`, self, true);
      return node;
    }else if(!item || !isString(item)) {
      $Debug(`Unrecognized reference prop passrd to the "$$fall" directive`, self, true);
      return ;
    }
    node.$attributes['$$@fallThrough']=createObj('fallThrough', { prop:item});
    // let value=_$runModelBind(self, item, px__VNode, true);
    // px__VNode.compiler_options.fallThrough[len(modifiers) ? modifiers.shift() : '__'+_generateUUID(3) ]=()=>value;
    return node;
  }
  function $$dir_MODEL(self, item, node, px__VNode, modifiers){
    if(!Is_Form_Element(node)){
      $Debug(`Compilation Error::\n\n cannot bind a data model to  a none form element`, self, true);
      return;
    }
    let initVal='';
    try{
      initVal=get_Object_Value(self.model, item, true);
    }catch(err){
      $Debug(`undefined reference for directive "$$model"\n\n "${item}" is not defined on widget model instance\n\n${err}`, self, true);
      return
    }
    node.value=initVal;
    const eventName=get_Model_Event(node);
    if(eventName){
      node.addEventListener(eventName, function(){
        try{
          set_Object_Value(self.model, item , node.value );
          px__VNode.render_tracked=true;
        }catch(err){
          $Debug(`${err}`);
        }
      });
    }
  }
  function _Resolve_Builtin_Directives(self, key, attr, vnode, px__VNode, modifiers){
    let item =bindKeyAsValue(key, attr);
    let name=directive_sep(key )[0].slice(2);
    const callArgs=()=>[self, item, vnode, px__VNode, modifiers];
    if(isEQ(name, 'bind')) vnode=$$dir_BIND(self, {key, item}, vnode, px__VNode, modifiers);
    else if(isEQ(name, 'html') || isEQ(name, 'text')) $$dir_HTML(self, item, vnode, px__VNode, isEQ(name, 'text'), modifiers);
    else if(isEQ(name, 'ref')) $$dir_REF(self,  item, vnode, px__VNode, modifiers);
    else if(isEQ(name, 'slot')) $$dir_SLOT(self, item, vnode, px__VNode, modifiers);
    else  if(isEQ(name, 'scoped')) vnode=$$dir_SCOPED(self, item, vnode, px__VNode, modifiers);
    else  if(isEQ(name, 'fall')) vnode=$$dir_FALL(self, item, vnode, px__VNode, modifiers, modifiers);
    else if(isEQ(name, 'model')) $$dir_MODEL(self, item, vnode, px__VNode, modifiers);
    else if(isEQ(name, 'on')) vnode=$$dir_ON(self, attr, vnode, px__VNode, key, modifiers);
    return vnode;
  }
  function get_Model_Event(vnode ){
    const tag=vnode.localName;
    if(IS_ELEMENT_NODE(vnode) && Is_Form_Element(vnode)){
      if(isEQ(tag, 'input')) return _mapValue(['file'], vnode.type) ? 'change' : _mapValue(['button','submit','reset'], vnode.type) ? 'click' : _mapValue(['image','hidden']) ? 'change' : 'input';
      return isEQ(tag, 'form') ? 'submit' : isEQ(tag, 'select') ? 'change' : isEQ(tag, 'textarea') ? 'input' : 'input';
    }
  }
  function _compileToStaticTemplateScarfold(self, render, recursive=false){
    render=isString(render) ? _HTMLParser(render, null ) : render;
    let response;
    if(isArray(render)){
      const NodeList=[];
      for(let build of render.values()){
        let data=_compileToStaticTemplateScarfold(null,build, true);
        NodeList.push(data)
      }
      response=()=> _getNodeListResponse(NodeList);
    }else if(isString(render)){
      response=()=> new PixelTextVNode(null, render);
    }else if(isPObject(render)){
      
      const { type, props, children } = render
      response=()=>createVElement(type, props, children);
    }
    if(recursive) return response;
    return response ? returnRender(response) : null
  }
  function scarfold(render){
    render=isPFunction(render) ? render() : render;
    if(!_validateType(render, [String, Object, Array, None])  && !isPrimitive(render)){
      $Debug(`Illegal value type passed to scarfold `);
      return;
    }else if(isPrimitive(render) && !isNull(render)) render=String(render);
    return _compileToStaticTemplateScarfold(this, render);
  }
  function el(type, propsOrChildren, childrenOrProps){
    let props;
    const lab=new  Set();
    if(isFallThrough(propsOrChildren)){
      
    }else if(isPObject(propsOrChildren) && !isSlotInstance(propsOrChildren)){ 
      props=propsOrChildren;
      lab.add('propsOrChildren')
    }else if(isPObject(childrenOrProps) && !isSlotInstance(childrenOrProps)){ 
      props=childrenOrProps;
      lab.add('childrenOrProps')
    }
    if( !lab.has('propsOrChildren') && isChildrenNode(propsOrChildren)) childrenOrProps=propsOrChildren;
    if(validPixelWidget(type)){
      type=defineWidget(type);
      if(props) define(type, '$attributes', {value:props,enumerable});
      if(childrenOrProps) {
        define(type, '$children', {value:childrenOrProps,enumerable});
      }
    }
    return function render(self){ 
      const Node=(inst)=> createVElement(type, props, childrenOrProps, inst ,true);
      const vnode=Node(self);
      vnode.compiler_options=assign(vnode.compiler_options,{ props:()=>props, children:()=>childrenOrProps, type, Node  });
      return vnode;
    }
  }
  class Widget {
    constructor(options){
      if(!options) define(this, 'model', {value:new Model()})
      else if(isPObject(options)) {
        for(const [key, value] of entries(options)){
          this[key]=value;
        }
      }else if(isPFunction(options)){
        this.build=options;
        if(opts && isPObject(opts)) {
          if(hasProp(opts, 'build')) delete opts.build;
          assign(this, opts);
        }
      }else if(isClass(options)){
        options=new options();
        if(!isBaseWidget(options)){
          $Debug('class widget not an instance of the "Widget" base Widget');
        }else{
          for(let [key, value ] of entries(options)){
            this[key]=value;
          }
        }
      }
    }
  }
  class Build extends Widget {
    constructor(self){ super();
    }
    static BUILT_IN_WIDGET=true;
    params={ 
      self:{
        type:[Object, Function, String], 
        required:true
      }
    }
    build(params, { attrs }){ 
      return ()=> el(params.self, attrs);
    }
  }
  class Fragment extends Widget {
    constructor(){ 
      super();
    }
    static BUILT_IN_WIDGET=true;
    build(){ 
      return ()=> el('slot');
    }
  }
  class Transition extends Widget {
    constructor(){ 
      super();
    }
    params={ 
      onStart:Function,
      onEnd:Function
    }
    build(){
      return  ()=> el('section', { class:'slide'}, el('slot'))
    }
    styleSheet=`
    .slide{
      background-color:#0a3039;
      transition-property:all;
      transition-duration:3s;
    }
    `
  }
  class Animation extends Widget {
    constructor(){
      super()
    }
    build(){
      return ()=> el('slot')
    }
  }
  class Await extends Widget {
    constructor(){
      super()
    }
    build(){
      return ()=> el('slot')
    }
  }
  class Portal extends Widget {
    constructor(){
      super()
    };
    build(){
      return ()=> el('slot')
    }
  }
  const BUILT_IN_WIDGETS={ 'px-fragment':Fragment, Fragment, 'px-build':Build, Build, 'px-transition':Transition, Transition, 'px-animation':Animation, Animation, 'px-await':Await, Await, 'px-portal':Portal, Portal };
  function modelManager(opts,self){
    if(isNull(opts.model)) return;
    const modelData=isBaseWidget(opts) && isPObject(opts.model) ? opts.model : {} ;
    if(!isBaseWidget(opts) || isPFunction(opts.model)) {
      try{
        opts.model.call(modelData, self.model.$params||{}, self.model.$attrs||{}) ;
      }catch(err){
        $Debug(`There is an error when running the model function\n\n${err}`,self, true);
      }
    }
    if(!isPObject(modelData)){ 
      $Debug(`\nmodel method must return an object`);
      return;
    }
    entries(modelData).forEach(([key, value])=>{
      self.model[key]=value;
    });
    
  }
  function widgetsSetup(opts, self){
    if(!isNull(opts.widgets)){
      const validNameRegex=/^[_A-Z0-9\-]+/;
      const FirstCharRegex=/^[a-zA-Z_]+/;
      entries(opts.widgets).forEach(([key, widget])=>{
        if(!FirstCharRegex.test(key.at(0)) && !validNameRegex.test(key)){
          $Debug(`Widget registration failed,\nImproper widget namecasing found at "${key}"\n\nwidget names must atleast start with an uppercase letter or a multi-word string seperated by a hyphen or an underscore and not start with hyphen or a number`, self, true);
          return;
        }
      })
      for(let [name, value] of entries(opts.widgets)){
        define(self.register.widgets, name, {value, enumerable});
      }
    }
  }
  function methodsManager(opts, self,){
    if(!opts.handlers) return;
    entries(opts.handlers).forEach(([ind, method])=>{
      if(!isPFunction(method)){
          $Debug(`widget method option's values must be a method or a function\n\n type of "${getType(method)}" found`, self, true);
          return;
      }
      method.isHandler=true;
      define(self.register.handlers, ind, {value:method, enumerable, configurable})
    });
  }
  function inDomPropsFallback(self, props, params, garbage){
    const paramsKeys=isArray(params) ? params.values() : isObject(params) ? keys(params) : [];
    let index=0;
    paramsKeys.forEach((key)=>{
      index++;
      if(hasUpperCase(key)){
        const transpiled=_hyphenate(key);
        if(_mapValue(props, transpiled) && !_mapValue(paramsKeys, transpiled)){
          if(isPObject(params)) {
            define(garbage, transpiled, { value:params[key], enumerable, configurable});
            delete props[transpiled];
          }
        }
      }
    })
  }
  function paramsManager(opts, self){
    const params= opts.params ;
    const props=opts.$attributes||{};
    const garbage={};
    inDomPropsFallback(self, props, params, garbage);
    self.model.$params=createObj('$params');
    self.model.$attrs=createObj('$attrs');
    if(params && !_validateType(params, [ Object, Array ])){
      $Debug(`Param option type validation failed, \n\n unexpected data type ${getType(params)}`, self,  true);
      return;
    }
    if(isPFunction(opts)){
      entries(props).forEach(([ind, attr])=>{
        self.model.$attrs[ind]=attr;
      });
    }
    let paramsSet;
    if(params && len(params)){
      paramsSet=self.model.$params;
      entries(params).forEach(([ind, param])=>{
        if(has$$_bind(ind)){
          $Debug(`Params validation error "${ind}" passed to widget as a pixel directive binding
            \n\n
            The "$$" may not be appended or used on a params identifier key name`, 
            self, true);
          return;
        }
        if(_validateType(param, [Function, Array]) ){
          if(!_mapValue(props || {}, ind)){
            define(paramsSet,ind,{value:'', enumerable, configurable, writable});return;
          }else if(props ){
            const value=props[ind];
            if(_validateType(value, param)){
              define(paramsSet,ind,{value, enumerable, configurable, writable});
            }else{
              define(paramsSet,ind,{value:'', enumerable, configurable, writable});
              $Debug(`params validation error\n\nproperty validation for widget default value failed, property "${ind}" is of an invalid type\n\n typeof "${param.name}" required`, self, true);
              return;
            }
          }
        }else if(isArray(params) && isString(param)){
          if(props && _mapValue(props, param)){
            const value=!props[param] && !isBoolean(props[param]) ? '' : props[param];
            define(paramsSet, param, {value,enumerable, configurable});
          }else define(paramsSet, param, {value:'',enumerable, configurable});
        }
        if(isPObject(param)){
          if(isTrue(param.required) && hasProp(param, 'default')){
            $Debug(`validation error  .......\n\nthe required validator should not be truthy alongside a default value\nat at\n\n"${ind}" params`, self, true);
            return;
          }else if(hasProp(param, 'required') && !isBoolean(param.required)){
            $Debug(`The "required" validation options receives an unresolvable value \nat at \n"${ind}" params\n requires a boolean value`, self, true);
            return;
          }else if(!hasProp(param, 'type')){
            $Debug(`The type valodator property is  required\n  Mising at "${ind}" param`, self, true);
            return;
          }else if(!_validateType(param.type,[Function, Array]) ){
            $Debug(`unexpected value passed as the type validator option\n expects a function or an Array of type function`, self, true);
            return;
          }else if(hasProp(param,'validator') && !isPFunction(param.validator)){
            $Debug(`The "validator option must be a  function\n\nat ${ind} params`, self, true);
            return;
          }else if(isTrue(param.required) && !_mapValue(props || {}, ind)){
            $Debug(`Params validation error........\n\nrequired params is missing\n\nat at\n  ....."${ind}"  param`, self, true);
            define(paramsSet,ind,{value:'', enumerable, configurable, writable});
            return;
          }
          
          if(hasOwn(param, 'default') && !isNull(param.default)){
            const defaultValue=isFunction(param.default) ? param.default() : param.default;
            if(!_mapValue(props || {}, ind)){
              if(!_validateType(defaultValue, param.type)){
                  define(paramsSet,ind,{value:'', enumerable, configurable });
                  $Debug(`Params validation error .....\n\nproperty validation for widget default value failed, property "${ind}" is of an invalid type\n\n${ isArray(param.type) ? "Matches no type in the validation list" :  'typeof '+ param.type.name+" required"}`, self, true); 
                  return;
              }else{
                define(paramsSet,ind,{value:defaultValue , enumerable, configurable});
              }
            }
          }
          const value=props ? props[ind] :  undefined
          if(_mapValue(props, ind) && _validateType(value, param.type)){
            if(_mapValue(param, 'validator')){
              let valRes=param.validator(value)
              if(!_validateType(valRes, Boolean)){
                $Debug(`params validator option method must return a Boolean value`, self, true);
                return;
              }
              if(isEQ(valRes, false)){
                $Debug(`Validation for param ${ind} return false`, self, true);
                return ;
              }
            }
            define(paramsSet,ind,{value, enumerable, configurable, writable});
          }else if(_mapValue(props, ind) && !_validateType(value, param.type)){
            define(paramsSet,ind,{value:'', enumerable, configurable });
            $Debug(`Params validation error .....\n\nproperty validation for widget Params value failed, property "${ind}" is of an invalid type\n\n${ isArray(param.type) ? "Matches no type in the validation list" :  'typeof '+param.type.name+" required"}`, self,  true);
            return;
          }
        }
      })
    }
    GarbagePropsPrefix(self, paramsSet, garbage, props);
    entries(props||{}).forEach(([ind, value])=>{
      if(!hasOwn(paramsSet||{}, ind) && !isEQ(ind, '@@Events')) {
        define(self.model.$attrs, ind, {value, configurable,enumerable, writable});
      }
    })
  }
  function GarbagePropsPrefix(self, paramsSet, garbage, props){
  
  }
  function _hydrate_$Attributes(opts, self, vnode){
    vnode=isPFunction(vnode) ? vnode() : vnode;
    if( isNativeElement(vnode.$element) && IS_ELEMENT_NODE(vnode.$element)){
      if(self.core.settings.forwardAttrs) AttributeManager( self.model.$attrs, vnode.$element, self, vnode);
    }
    return vnode;
  }
  function BasedWidgets(opts, self){
    const widget = opts;
    // if(opts.$attributes) widget.$attributes=opts.$attributes;
    // if(opts.$children) widget.$children=opts.$children;
    return widget;
  }
  const pixelProps="$attributes,$children";
  const isPixelProp=prop=>_mapValue(pixelProps, prop);
  function sanitizedOptions(self, options){
    const argcount=len(options);
    for(const [ key, opt] of entries(options)){
      if(!isValidWidgetOption(key) && !isPixelProp(key)) self.operands._OPTIONS[key]=opt
      else if(isValidWidgetOption(key) && !_validateType(opt, widgetOptionType[key])){
        $Debug(`${key} option is of an invalid type, \n\n "${key}" option cannot be a ${getType(opt)} type`, self, true);
        return;
      }
    }
  }
  function _hydrateHashToSelector(selector, $Data_Hash){
    const trimmed = selector.trim();
    let modified=trimmed;
    const _Manage_Hash_Class=function(sel, sep){
      const splited=sel.split(sep);
      let fir=splited.shift();
      fir=`${fir}${$Data_Hash}`;
      splited.unshift(fir);
      return splited.join(sep);
    }
    const $make_Tape=function(sep){
      const split=trimmed.split(sep);
      for (let [key, sel] of entries(split)){
        sel=sel.trim();
        sel=_hydrateHashToSelector(sel, $Data_Hash)
        split[key]=sel;
      }
      return split.join(` ${sep} `)
    }
    if(trimmed.startsWith('@g ')) return trimmed.slice(2);
    if(trimmed.includes(',')) return $make_Tape(',');
    if(trimmed.includes('+')) return _Manage_Hash_Class(trimmed, '+')
    if(trimmed.includes('~')) return _Manage_Hash_Class(trimmed, '~')
    if(trimmed.includes('>')) return _Manage_Hash_Class(trimmed, '>')
    if(!trimmed.startsWith('@') && !trimmed.startsWith('body') && !trimmed.includes(':')  ) return trimmed ? `${trimmed}${$Data_Hash}` : trimmed;
    else if(trimmed.includes('::')) return _Manage_Hash_Class(trimmed, '::');
    else if(trimmed.includes(':') && !trimmed.startsWith('@') && !trimmed.startsWith(':')) return _Manage_Hash_Class(trimmed, ':')
    return modified;
  };
  function _styleSheet_hydration(self, styles){
    const selectorPattern = /([^\r\n{]+)\s*{/g;
    return styles.replace(selectorPattern, (match, text)=>{
      return _hydrateHashToSelector(text, `[data-px_hash_=${self.ownProperties.px_hash_}]`)+'{';
    });
  }
  function _preCompile_StyleSheet(opts, self, vnode){
    let CssStylesheet=opts.styleSheet ? opts.styleSheet : null;
    if(CssStylesheet){
      const styleEl=createPixelElement('style', { type:'text/css'}, null);
      const ModifiedCssStylesheet=_styleSheet_hydration(self, CssStylesheet);
      styleEl.textContent=ModifiedCssStylesheet;
      if(vnode  && !IS_TEXT_NODE(vnode.$element)) vnode.$element.append(styleEl);
    }
    return vnode;
  }
  function assignSlot(self, slot, content, name, assynedSlots){
    if(content && isPixelVNode(content)){
      slot.replaceWith(content.$element);
      assynedSlots.add(name);
    }
  }
  function _$slotHydrationRenderer(self, opts, vnode){
    const slots=self.core.slots;
    log(slots)
    if(!len(slots))  return vnode;
    vnode=isPFunction(vnode) ? vnode(self) : vnode;
    const slot_elements=vnode.$element.querySelectorAll('slot');
    const assynedSlots=new Set()
    for(let slot_el of slot_elements.values()){
      let slotN=slot_el.getAttribute('name');
      if(slotN && hasProp(slots, slotN) && !isNull(slots[slotN](self)) && !assynedSlots.has(slotN)) assignSlot(self, slot_el, slots[slotN](self), slotN, assynedSlots);
      else if((!slotN || isEmptyStr(slotN)) && !assynedSlots.has('default') && hasProp(slots, 'default')) assignSlot(self, slot_el, slots.default(self), 'default', assynedSlots );
    }
    if(!len(slot_elements) && isNativeElement(vnode.$element) && IS_ELEMENT_NODE(vnode.$element) && isEmptyStr(vnode.$element.innerHTML) && hasOwn(slots, 'default')){
      const forwardSlot=self.core.settings.forwardSlot;
      if(isTrue(forwardSlot)) {
        const slotContent=hasOwn(slots, 'default') ? slots.default(self) : null;
        if(slotContent) vnode.$element.append(slotContent.$element);
      }
    }
    return vnode;
  }
  function installCD_(self, options){//custom directives installer
    if(hasProp(options,'directives')){
      for(let [key, value] of entries(options.directives)){
        if(!_validateType(value, [ Object, Function])){
          $Debug(`a directive requires an object or a function`, self, true); 
          return;
        }
        define(self.register.directives, has$$_bind(key) ? key.slice(2) : key, {value, enumerable, configurable, writable});
      }
    }
  }
  const buildConfigOptions=  "delimiters,isAsync,isCustomElement,forwardAttrs,subAttrBinding,inAttrDelimiters,forwardSlot";
  function setConfig(opts, self){
    if(!opts.buildConfig || !len(opts.buildConfig)) return;
    entries(opts.buildConfig).forEach(([key, setting])=>{
      if(!_mapValue(buildConfigOptions, key)){
        $Debug(`unrecognised settings option found in buildConfig  at   at\n"${key} name property`,self,true);
        return ;
      };
      define(self.core.settings, key,{value:setting, enumerable, configurable});
    })
  }
  const globalProps="blocks,widgets,directives,handlers,hang";
  const exceptionsOptions="$children,$attributes";
  class _OBS{
    constructor(propOrGetter, oldValue, callback){
      this.propOrGetter=propOrGetter;
      this.oldValue=oldValue;
      this.callback=callback;
    }
    getNewV(self){
      return isPFunction(this.propOrGetter) ? this.propOrGetter() : get_Object_Value(self.model, this.propOrGetter);
    }
    shouldTrigger(self){
      return !isEQ(this.oldValue, this.getNewV(self));
    }
    trigger(self){
      if(this.shouldTrigger(self)){
        this.callback.call(self.model, this.getNewV(self), this.oldValue);
        this.oldValue=this.getNewV(self);
      }
    }
  }
  function Observer_Track(self, opts){
    const errArgs=(name)=>[ self, true, "When calling the "+name+" observer method callback"]
    entries(opts.observers||{}).forEach(([name, method])=>{
      if(!isPFunction(method)){
        $Debug(`an observer handler must be a function value`, ...errArgs(name));
        return;
      }else if(!has_Object_Prop(self.model, name)){
        $Debug(`observer undefined reference\n\n no such model instance as "${name}" define on this widget model instance`,...errArgs(name));
        return;
      }
      self.operands._OBSERVERS.add(new _OBS(name, get_Object_Value(self.model, name), method));
    })
  }
  function Observation_Dependecy_Notify(self){
    self.operands._OBSERVERS.values().forEach((obs)=>{
      obs.trigger(self);
    })
  }
  function RuntimeUtilitiesProvide(self, opts){
    define(self.model, '$observe', {value:DATA_OBSERVER.bind(self), enumerable });
    define(self.model, '$nextTick', {value:nextTick.bind(self), enumerable });
    define(self.core.utils, 'dataModel', {value:dataModel.bind(self), enumerable });
  }
  function dataModel(props){
    if(props && !isPObject(props)){
      $Debug(`argument at position 1 of the "dataModel" utils macro expects a plain object`, self, true);
      return;
    }else if(!props) return this.model;
    for(let [key, value] of entries(props)){
      if(!hasProp(this.model, key)) this.model[key]=value;
    }
    return this.model;
  }
  async function DATA_OBSERVER(prop, callback){
    const errArgs=()=>[ this, true, 'During the calling of the "$observe" macro'];
    if(!isPFunction(prop) && !isString(prop)){
      $Debug(`proplem setting Observer_Track for ${prop}\n\n widget model instance has no such property`, ...errArgs());
      return;
    }else if(!isPFunction(callback)){
      $Debug(`callback argument passed to the "$observe" macro is not callback`, ...errArgs());
      return
    } else if(isString(prop) && !has_Object_Prop(this, prop)){
      $Debug(`undefined property "${prop}" accessed in $observe macro`, ...errArgs());
      return;
    }
    this.operands._OBSERVERS.add(new _OBS(prop, isPFunction(prop) ? prop() : get_Object_Value(this.model, name), callback));
  }
  function map_Events_Fall(self, options){
    if(!options.$attributes || !options.$attributes['@@Events']) return;
    for(let [ name, value ] of entries(options.$attributes['@@Events'])){
      value=value.callback;
      define(self.model.$attrs, "on"+name, { value , enumerable, configurable })
    }
    delete options.$attributes['@@Events'];
  }
  function $construct_With_Signals(self, options){
    if(!len(options.signals) && !options.$attributes ) return;
    self.model.$signals=createObj('$signals');
    const signals=new Set(options.signals);
    const $$events=options?.$attributes ? options.$attributes['@@Events'] : {}
    for(const  [ key, event] of entries( $$events || {})){
      if(signals.has(key)){
        self.model.$signals[key]=new Signal(key, event?.callback || pass, event?.options);
        delete options.$attributes['@@Events'][key]
      }
    }
    (options.signals||[]).forEach((signal)=>{
      if(!hasOwn(self.model.$signals, signal)){
        self.model.$signals[signal]=new Signal(signal, pass )
      }
    });
    map_Events_Fall(self, options);
  }
  function resolveCustomBlocks(self, options){
    if(!len(options.blocks)) return;
    if(options.blocks && len(options.blocks)){
      for(const [name,block] of entries(options.blocks)){
        if(_mapValue(BUILT_IN_BLOCKS, name)){
          $Debug(`registration failure\nFailed to register the custom block with the name "${name}\n Which collides with a BUILT_IN_BLOCK name`,self, true);
        }else if(!isPFunction(block)) {
          $Debug(`Block must be a function \n\nat        at\n "${name}" block registration`, self);
        }else{
          self.register.blocks[name]=block
        }
      }
    }
  }
  function __Ensure_Renderer(self, options){
    widgetsSetup(options, self);
    methodsManager(options, self);
    resolveCustomBlocks(self, options);
    RuntimeUtilitiesProvide(self, options);
    installCD_(self, options);
    __Generate_Widget_Hash(self);
    return options;
  }
  function _generateUUID(length, type) {
    const isAlpha=isEQ(type, 'alpha');
    const isNum=isEQ(type, 'num');
    const isAlphaNum=isEQ(type, 'alphaNum') || isNull(type);
    const alphaNum ='A,a,B,b,C,c,D,d,E,e,F,f,G,g,H,h,I,i,J,j,K,k,L,l,M,m,N,n,O,o,P,p,Q,q,R,r,S,s,T,t,U,u,V,v,W,w,X,x,Y,y,Z,z,0,1,2,3,4,5,6,7,8,9,$';
    let letters=alphaNum.split(',');
    let id = '';
    let stack=[];
    for(let i = 0; i < len(letters); i=i){
      const randomIndex = Math.floor(Math.random() * len(letters));
      stack.push(letters[randomIndex]);
      letters.splice(randomIndex, 1);
    }
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * len(stack));
      id += stack[randomIndex];
    }
    return id;
  }
  function depsJustify(self){
    class depsRecord{
      constructor(self){
        
      }
      record=new Set()
      insert(dep){
        this.record.add(dep);
      }
      vibrate(){
        
      }
    }
    return new depsRecord(self)
  }
  function __Generate_Widget_Hash(self){
    let id=_generateUUID(10);
    const hash=`_px_${id}`;
    define(self.ownProperties, 'px_hash_', {value:hash, configurable, enumerable});
  }
  function _Data_Hydrations(self, options){
    paramsManager(options, self);
    modelManager(options, self);
    install_State_Observer(self);
    self.model=_Proxy_Setup(self, self.model, true);
    Observer_Track(self, options);
    for(let [ key, hand] of entries(self.register.handlers)) {
      self.model[key]=hand.bind(self.model);
    }
  }
  function install_State_Observer(self){
    class Observer {
      constructor(getter, callback, self) {
        this.getter = getter;
        this.callback = callback;
        this.value = this.get();
        this.self=self;
      }
      update() {
        const oldValue = this.value;
        this.value = this.getter();
        if (!isEQ(this.value , oldValue)){
          nextCircleReverse(this.self, ()=>{
            this.callback(this.value, oldValue);
          })
        }
      }
      get() {
        self.core.activeObserver = this;
        const value = this.getter();
        self.core.activeObserver = null;
        return value;
      }
    }
    self.core.Observer=Observer;
    class Dependency {
      constructor() {
        this.subscribers = new Set();
      }
      depend() {
        if (self.core.activeObserver) this.subscribers.add(self.core.activeObserver);
      }
      notify() {
        this.subscribers.forEach((observer) => observer.update());
      }
    }
    self.core.Dependency=Dependency;
  }
  function _Proxy_Setup(self, obj, deep=false){
    function Hydrate_Data_Proxy(obj, deep){
      function trackDependency(dependency) {
        if (self.core.activeObserver) dependency.depend();//caall the depend
      }
      const dependency = new self.core.Dependency();
      obj= new Proxy(obj, {
        get(target, prop){
          trackDependency(dependency);
          return Reflect.get(...arguments);
        },
        set(target, prop, value, receiver){
          Reflect.set(...arguments)
          dependency.notify();
          return true
        },
        defineProperty(target, prop, value){
          Reflect.defineProperty(...arguments);
          dependency.notify();
          return true;
        },
        deleteProperty(target, prop){
          Reflect.deleteProperty(...arguments);
          dependency.notify();
          return true;
        },
      })
      if(isTrue(deep)){
        for(const [ key, value] of entries(obj)){
          if(isIterable(value) && !isProxySkipped(key) ) obj[key]=Hydrate_Data_Proxy(value, true);
          
        }
        
      }
      for(const [ key, value] of entries(obj)){
        // if(_validateType(value, [Array, Set, Map])) proxifyMutationObjectMethods(self, obj,  value, key, dependency)
      }
      return obj
    }
    return Hydrate_Data_Proxy(obj, deep)
  }
  function mutatingHandlersCompile(src, prop, mutatingMethods, dependency){
    mutatingMethods.split(',').forEach((method)=>{

      src[prop][method]=new Proxy(src[prop][method],{
        apply(target, thisArg, args){
          const returnValue= Reflect.apply(...arguments);
          set_Object_Value(src, prop, src[prop])
          dependency.notify();
          return returnValue;
        }
      })
      // set_Object_Value(src, prop+'.'+method, proxy)
    })
  }
  function proxifyMutationObjectMethods(self, src, obj, key, dependency){
    if(isArray(obj)) mutatingHandlersCompile(src, key, arrayMutationMethods, dependency);
    else if(isSet(obj)) mutatingHandlersCompile(src, key, setMutationMethods);
    else if(isMap(obj)) mutatingHandlersCompile(src, key, mapMutationMethods);
  }
  class Model{}
  function createCordinateProps(self, opts){
    self.model=new Model();
    opts=opts || {};
    self.ownProperties=createObj('ownProperties',{ name:opts?.name || 'UnknownWidget', slot_name:hasProp(opts, '$attributes')  ? opts.$attributes['@@slotName'] : undefined });
    if(has_Object_Prop(opts, '$attributes.@@slotName')) delete opts.$attributes['@@slotName'];
    self.register=createObj( 'register',{ directives:createObj('directives'), blocks:createObj('blocks'), widgets:createObj('widgets'), handlers:createObj('handlers'), agents:createObj('agents'), properties:createObj('properties')});
    self.operands=createObj('operands',{ _OBSERVERS:new Set(), _LIFECIRCLEHOOKS:createObj('_LIFECIRCLEHOOKS'), _OPTIONS:createObj('_OPTIONS'), garbageWatch:false });
    self.core=createObj('core',{utils:createObj('utils'), settings:createObj('settings', Global_Settings), slots:createObj('slots'), map:createObj('map',{ is_hyperscript:false }), activeObserver:null});
    self.$globals=createObj('$globals',{register:createObj('register', self.register), setupOptions:createObj('setupOptions'), $hanger:createObj('$hanger'), legalOptions:createObj('legalOptions'), generic:new Set()});
  }
  function smartSlotMapping(self, slotContent, slotName, slottErr, defaultSlotsRecord){
    if(!isEQ(slotName, 'default') && !hasProp(self.core.slots, slotName) ){
      self.core.slots[slotName]=returnRender(()=> slotContent);
    }else if(isEQ(slotName, 'default')){
      defaultSlotsRecord.add(slotContent)
    }else{
      slottErr(slotName, slotContent);
      return;
    }
  }
  function _induceSlotContents(self, options){
    if(!hasProp(options, '$children') && !isTrue(options.slots && len(options.slots))) {
      log(options)
      defineFallbackSlotsRef(self, { slots:['default']})
      return;
    }
    const px__VNode=options.$children?.px__VNode;
    const is_hyperscript= options.build ? true : false;
    let slots=hasOwn(options.$children||{}, 'NodeList') ? options.$children.NodeList : options.$children||[];
    const slottErr=(slotName, slotContent)=>{
      $Debug(`
      Problem when mapping slot element,\n\nMore than one vnode seems to be pointing to the  same slot name\nat at "${slotName}" slot Directive  of "${slotContent.$element.outerHTML} \nmaybe you should wrap them within a single template wrapper`, self, true, "During the induction of slots contents");
      $Debug(`Note: unnamed contents will be automatically mapped  as "default" slot\nWon't conflict with other default contents`, self );
    }
    if(slots && !isArray(slots)) slots=[slots];
    else if(!slots || !len(slots)){ 
      if(!is_hyperscript) return;
      if(options.slots && len(options.slots) ) defineFallbackSlotsRef(self, options);
      return;
    }
    const defaultSlotsRecord=new Set();
    for(let slotContent of slots.values()){
      if(isPrimitive(slotContent) && !isNull(slotContent)){
        slotContent=new PixelTextVNode(self, String(slotContent), px__VNode);
        defaultSlotsRecord.add(slotContent);
      }else if(isPixelVNode(slotContent) || isRender(slotContent)){
        const slotName=slotContent.slot_name || 'default';
        if(isRender(slotContent)) slotContent = slotContent(self);
        if(isEQ(slotContent.$element.localName,'template')){
          slotContent=_getNodeListResponse(slotContent.NodeList, self);
        }
        smartSlotMapping(self, slotContent, slotName, slottErr, defaultSlotsRecord)
      }else if(isSlotInstance(slotContent) && len(slotContent.slots)){
        for(let [name, slot] of entries(slotContent.slots)){
          if(!isChildrenNode(slot(self))){
            $Debug(`Unexpected "${getType(slot)}" data type passed to renderSlots  instance\n at   ... ^ "${name}" slot"\n\nexpecting a pixel valid  DOM instance value`,self, true);
            return;
          }
          if(isPrimitive(slot()) && !isNull(slot())) slot=returnRender(()=> new PixelTextVNode(self, String(slot(self)), px__VNode))
          smartSlotMapping(self, slot(self), name, slottErr, defaultSlotsRecord)
        }
      }
    }
    if(len(defaultSlotsRecord)){
      self.core.slots.default=()=>_getNodeListResponse(arrSet(defaultSlotsRecord), self);
      log(self.core.slots)
    }
    if(!is_hyperscript) return;
    defineFallbackSlotsRef(self, options);
  }
  function defineFallbackSlotsRef(self, options){
    function slotRender(def){
      // if(isPixelBuild(def)) return null
      if(def && !isPFunction(def)){
        $Debug(`Render functions default slot content requires to be a render function also`, self, true);
        return null;
      }else if(!def) return null;
      def=def();
      return _getNodeListResponse(isPFunction(def) ? def() : def, self)
    }
    if(options.slots && len(options.slots)){
      for(const sn of options.slots.values()){
        if(!_mapValue(self.core.slots, sn)){
          self.core.slots[sn]=slotRender;
        }
      }
      if(!_mapValue(self.core.slots, 'default') && !_mapValue(options.slots, 'default')){
          self.core.slots['default']=slotRender;
        }
    }
  }
  function _$instanciateModelProps(self){
    const is_hyperscript=self.core.map.is_hyperscript;
    if(is_hyperscript && len(self.core.slots)){
      self.model.$slots=createObj('$slots', self.core.slots);
    }
  }
  function $ensureLifeCircleHooks(self, options){
    const hooks="preBuild,postBuild,postMount,preMount,postUpdate,preUpdate,preDestroy,postDestroy"
    const dirHKAlibi={ init_hook:'preBuild', mounted_hook:'postMount', created_hook:'postBuild', updated_hook:'postUpdate'}
    let customDirHk={}
    if(options.$$$customDirs){
      entries(options.$$$customDirs).forEach(([key, dirhk])=>{
        if(len(dirhk)){
          customDirHk[dirHKAlibi[key]]=function(){
            callSetHooks(self, dirhk, null, self.model);
          }
        }
      })
      delete options.$$$customDirs;
    }
    hooks.split(',').forEach((hookN)=>{
      if(options[hookN] || len(customDirHk)){
        if(len(customDirHk) &&  hasOwn(customDirHk, hookN)){
          let thisHook=customDirHk[hookN];
          const user_defined_callback=options[hookN] || pass;
          options[hookN]=function(utils){
            if(isPFunction(thisHook)) thisHook();
            if(user_defined_callback) user_defined_callback.call(self.model, utils)
          }
        }
        self.operands._LIFECIRCLEHOOKS[hookN]=options[hookN]||pass;
      }else self.operands._LIFECIRCLEHOOKS[hookN]=pass;
    })
    callbackHookWithCatch(self, self.operands._LIFECIRCLEHOOKS.preBuild,'preBuild');
  }
  function callbackHookWithCatch(self, hook, name){//this function calls a lifecircle hook with a catch debugger
    try{
      hook.call(self.model, self.core.utils);
    }catch(err){
      $Debug(`${err}`,self, true, `during the call of the "${name}" LifeCycle hook` );
    }
  }
  function RuntimeRefDir(self, options){
    const hasRef=options.$attributes && hasProp(options.$attributes, '$$$$dir--ref$$$$');
    if(!hasRef) return;
    self.ownProperties['dir--ref']=options.$attributes['$$$$dir--ref$$$$'];
  }
  function provideWidgetChildren(self, options){
    if(!options.$children) return;
    const px__VNode= options.$children?.px__VNode;
    const patchFlags = options.$children?.patchFlags;
    const childrenRender=options.$children?.NodeList;
    const fallThrough=self.core.fallThrough
    let children=isPFunction(options.$children) ? options.$children(patchFlags) : options.$children.NodeList(patchFlags, px__VNode, fallThrough);
    options.$children.NodeList= children && !isArray(children) ? [children] : children;
    if(!children) delete options.$children;
  }
  function $fallThroughEngine(self, options){
    if(!options.fallThrough) return;
    let data;
    try{
      data=options.fallThrough.call(self.model);
    }catch(err){
      $Debug(`Encountered an error when trying to run the fallThrough option method`, self, true);
      $Debug(err, self);
      return;
    }
    if(isNull(data)){
      $Debug(`The fallThrough option returns a nullish value \n\n `, self, true);
      return;
    }
    self.core.map.$$fallThrough=data;
  }
  function runtimeSlotsFallThrough(self, options){
    $fallThroughEngine(self, options)
    if(!options.$attributes || isTrue(options.$attributes && !options.$attributes['$$@fallThrough'])) return;
    const fallThrough=options.$attributes['$$@fallThrough'];
    delete options.$attributes['$$@fallThrough'];
    const prop=fallThrough.prop;
    if(!hasProp(self.core.map, '$$fallThrough')) return;
    const value=self.core.map.$$fallThrough;
    delete self.core.map.$$fallThrough;
    if(destructureRegex.test(prop) ){
      if(!isPObject(value)){
        $Debug(`Cannot destructure on a none object fallThrough data value`, self, true);
        return;
      }
      let items=prop.match(destructureRegex);
      items= items[1].split(',');
      if(len(items)){
        const fallThroughProps={};
        items.forEach((item)=>{
          item=item.trim();
          if(!hasOwn(value, item)){
            $Debug(`fallThrough object value has no such key as "${item}"\n\nInvalid key destructure`, self, true);
          }else fallThroughProps[item]=value[item];
        })
        self.core.fallThrough=createObj('fallThrough', fallThroughProps);
      }
    }else self.core.fallThrough=createObj('fallThrough', {[prop]:value});
  }
  function defineLateGlobalProps(self, build){
    self.property('$element', build.$element);
    dataModel.call(self, { $element:build.$element});
  }
  function _Pixel_Build(options){
    createCordinateProps(this, options);//create useful properties for the widget
    sanitizedOptions(this, options);//sanitize received options
    $ensureLifeCircleHooks(this, options);
    options=BasedWidgets(options, this);
    setConfig(options, this); 
    $construct_With_Signals(this, options)
    __Ensure_Renderer(this, options);
    this.render=function(self, build, update){
      build=_$slotHydrationRenderer(self, options, build);
      build =  _hydrate_$Attributes(options, self, build);
      build=_preCompile_StyleSheet(options, self, build);
      RuntimeRefDir(self, options);
      defineLateGlobalProps(self, build);
      callbackHookWithCatch(self, self.operands._LIFECIRCLEHOOKS.postBuild, 'postBuild');
      return build;
    }
    _Data_Hydrations(this, options);
    resolveBuildLab(this, options);
    resolve_Proto_Call(this, options);
  }
  function resolveBuildLab(self, options){
    let value=options.build || options.template || options.markdown 
    define(self.core, 'build', {value, writable, enumerable});
    self.core.opts=options;
  }
  function isRender(build){
    return isFunction(build) && isEQ(build.name,'render');
  }
  function returnRender(build, self){
    return function render(self){ 
      build= isPFunction(build) ? build(self) : build;
      return isArray(build) ? _getNodeListResponse(build, self) : build ;
    }
  }
  function get_Init_Build(self, selector, build){
    let render;
    if(isFunction(self.core.build)){
      let res;
      try{
        res = self.core.build.call(self.model, self.model.$params,{signals:self.model.$signals,attrs:self.model.$attrs, slots:self.core.slots, utils:self.core.utils});
      }catch(err){
        $Debug(`Error during the call of the build function`,self, true, DebugFlags.build);
        $Error(err);
        return;
      }
      if(!isFunction(res)){
        $Debug(`Error during the procession of the build function\n\nfailed to return a render function when returning the build method\n \n This may conflict with the processing of returnable DOM  nodes`, self, true, DebugFlags.build);
        return false;
      }
      self.core.map.is_hyperscript=true;
      render= ()=> returnRender(res(), self);
      self.core.render=render;
    }else if(isString(self.core.build)){
      render = (inst, update)=> returnRender(()=> _HTMLParser(self.core.build, inst, false));
      self.core.render=render;
    }else if(isNull(self.core.build) && selector){
      inDomCaveatRemodeling(self);
      render = (inst, update)=> returnRender(()=> _HTMLParser( _GenerateRoot(selector, self).innerHTML || '', inst, false));
      self.core.render=render;
    }
    return render(self);
  }
  function inDomCaveatRemodeling(self){
    const setRegex=/^[A-Z]+/
    for(const [ name, item] of entries(self.register.widgets)){
      if(setRegex.test(name)) self.register.widgets[_hyphenate(name)]=item;
    }
    for(const [ name, item] of entries(self.register.directives)){
      if(setRegex.test(name)) self.register.directives[_hyphenate(name)]=item;
    }
  }
  function resolve_Proto_Call(self, opts){
    new Promise((resolve, reject)=>{
      resolve(self.protoPromisesCalls)
    }).then((data)=>{
      if(!self.hasMountProto){
        //self.build=Render_Template(self, get_Init_Build(self, null));
      }
      delete self.protoPromisesCalls;
      //delete self.render;
      //delete self.widgets;
      delete self.hasMountProto;
      return self;
    })
    return self;
  }
  function _GenerateRoot(nodeSelector, self){
    if(isNull(nodeSelector)){
      $Debug(`no node model or selector value passed to widget mountroot`, self, true);
      return;
    }
    let domRoot;
    if(isString(nodeSelector)){
      domRoot=document.querySelector(nodeSelector);
      if(!isNativeElement(domRoot)){
        $Debug(`error mounting widget, target not a valid native element`, self, true);
        return;
      }
    }else if(isNativeElement(nodeSelector) || nodeSelector.isPixel_Fragment){
      domRoot=nodeSelector;
    }
    return domRoot
  }
  function mergeRegisteries(self){
    entries(self.$globals.register).forEach(([name, value])=>{
      for(let [key, content] of entries(value)){
        if(!hasProp(self.register[name], key)){
          self.register[name][key]=content
        }
      }
    })
    dataModel.call(self, assign({},self.register.properties))
  }
  function validateRegistryProvider(self){
    const registeredOpts=self.$globals.legalOptions;
    const _opts=self.operands._OPTIONS;
    for(let [ key, opt] of entries(_opts)){
      if(!_mapValue(registeredOpts, key)){
        $Debug(`Unrecognised option found\n\n"${key}" option is not a valid widget option or a registered option,
        \n\nYou can register this option by passing an "optionRegistry" object prop to "build.generic()" method`, self, true);
        return;
      }else if(!_validateType(opt, registeredOpts[key])){
        $Debug(`
        "${key}"" option does failed to match the required type\n\n
        Type of "${getType(opt)}"" found`,self, true );
        return;
      }
      
    }
  }
  function prefixManagement(self){
    const options=self.core.opts;
    validateRegistryProvider(self);
    runtimeSlotsFallThrough(self, options);
    provideWidgetChildren(self, options);
    _induceSlotContents(self, options);
    delete self.core.opts;
    mergeRegisteries(self);
    _$instanciateModelProps(self);
  }
  function callUpdatedHook(self, obs){
    for( let fn of obs.updated_hooks.values()){
      fn()
    }
    obs.updated_hooks.clear();
    callbackHookWithCatch(self, self.operands._LIFECIRCLEHOOKS.postUpdate, 'postUpdate');
  }
  function mount(nodeSelector){
    let domRoot=_GenerateRoot(nodeSelector, this);
    if(!bool(domRoot.isPixel_Fragment)) define(domRoot, 'NodeList',{value:[], configurable:true, writable:true});
    if(!domRoot.PATCH_FLAGS) define(domRoot, 'PATCH_FLAGS',{value:new Set(), configurable:true, writable:true});
    prefixManagement(this)
    let initialBuild=get_Init_Build(this, nodeSelector);
    if(!initialBuild) return
    this.build=Render_Template(this, initialBuild);
    _Reactive_Renderer(this.model, (newV, oldV, ref)=>{
      Observation_Dependecy_Notify(this);
      _hydrationEjectionTrigger(this, { newV, oldV, ref },  nodeSelector );
    }, this, true);
    domRoot.innerHTML='';
    if(domRoot.IS_PIXEL_MOUNTROOT && IS_ELEMENT_NODE(domRoot)){
      $Debug(`A Pixel widget has already been mounted on this element, cannot mount more than one Wdget on a single root element`, this, true, "When trying to mount this initialBuild widget to the DOM");
      return this;
    }
    const MoutRootToken={
      IS_PIXEL_MOUNTROOT:true,
      __mountRootToken:'px__'+_generateUUID(5),
    }
    callbackHookWithCatch(this, this.operands._LIFECIRCLEHOOKS.preMount, 'preMount');
    if(isInDom(domRoot) && IS_ELEMENT_NODE(domRoot)) {
      domRoot.innerHTML='';
      domRoot.append(this.build.$element || '');
    }else domRoot=this.build.$element;
    if(domRoot.isPixel_Fragment && !domRoot.trigger_Effect_Run ) define(domRoot, 'trigger_Effect_Run', {value: Widget_Effect_Trigger.bind(this)});
    whenMounted(this, this.build, ()=>{
      callbackHookWithCatch(this, this.operands._LIFECIRCLEHOOKS.postMount, 'postMount');
    });
    this.hasMountProto=true;
    return this;
  }
  function widget(name, widget){
    if(!isString(name) || !validPixelWidget(widget)){
      $Debug(`unrecognised global widget registration for ${name} widget`, this, true);
      return this;
    }
    if(isEQ(len(new Set(arguments)),2)){
     define(this.$globals.register.widgets, name, {value:widget, enumerable, configurable});
    }
    this.protoPromisesCalls++;
    return this;
  }
  function install(plugin, options){
    if(!isPObject(plugin) && !isPFunction(plugin)){ 
      $Debug(`plugin installation Error::\n\n install argument must be an object value with  an exposed plugin installation method or a function which acts as the plugin method itself`, this, true);
      return this;
    }else if(isPObject(plugin) && !isPFunction(plugin.plugin)){
      $Debug(`plugin installation Error::\n\n plugin object did not expose a plugin installation method`, this, true);
      return this;
    }
    let usePlugin=isPObject(plugin) ? plugin.plugin : plugin;
    if(isPObject(usePlugin) ) plugin.plugin(this, options);
    else usePlugin(this, options);
    this.protoPromisesCalls++
    return this;
  }
  function handler(name, handler){
    if(!isString(name) && !isFunction(handler)){
      $Debug(`unrecognised global handler registration for ${handler}`, this, true);
      return this;
    }
    if(isEQ(len(arguments),2)){
      this.$globals.register.handlers[name]=handler;
    }
    this.protoPromisesCalls++
    return this
  }
  function directive(name, directive){
    if(!isString(name) && !_validateType(directive, [ Function, Object ])){
      $Debug(`unrecognised global directives registration for ${directive}`, this, true);
      return this;
    }
    if(isEQ(len(arguments),2)){
      this.$globals.register.directives[name]=directive;
    }
    this.protoPromisesCalls++
    return this;
  }
  function block(name, block){
    if(!isString(name) && !isFunction(block)){
      $Debug(`unrecognised global block helper registration for ${block}`, this, true);
      return this;
    }
    if(isEQ(len(arguments),2)){
      this.$globals.register.blocks[name]=func;
    }
  }
  function property(name, value){
     if(!isString(name)){
      $Debug(`unrecognised global property registration for ${value}`, this, true);
      return this;
    }
    if(isEQ(arguments.length,2)){
      this.$globals.register.properties[name]=value;
    }
    return this
  }
  function configDelimeters(delimiters){
    
  }
  function configDebug(debug){
    
  }
  function configForwardAttrs(forwardAttrs){
    
  }
  function configIsAsync(isAsync){
    
  }
  function configForwardSlot(){
    
  }
  function configIsCustomElement(isCustomElement){
    
  }
  function configInAttrDelimiters(inAttrDelimiters){
    
  }
  function configSubAttrBinding(subAttrBinding){
    
  }
  function generic(options){
    if(!isPObject(options)){
      $Debug(`argument at position 1 expects a plain object\n\nType unaccepted`, this, true);
      return;
    }
    this.$globals.generic.add(options);
    optionsRegistery(this, options);
    
  }
  function configBuildOptions(buildOptions){
    
    return this
  }
  function optionsRegistery(self, options){
    if(!hasProp(options, 'optionsRegistery')) return;
    else if(!isPObject(options.optionsRegistery)){
      $Debug(`The "optionsRegistery" property argument of generic expects a plain object\n\nType Unexpected`, self, true);
      return;
    }
    const registered=options.optionsRegistery;
    entries(options.optionsRegistery).forEach(([key, validator])=>{
      if(_mapValue(self.$globals.legalOptions, key)){
        $Debug(`${key} custom optionsRegistery already exists in the registery record`, self, true);
        return;
      }
      define(self.$globals.legalOptions, key, {value: validator, enumerable});
    })
  }
  function mountedWarning(self, name){
    if(isTrue(self.hasMountProto)){
      if(!self.core.map.mountWarn) {
        $Debug(`This "mount" method has been called and calling of methods after the widget is mounted is prohibited\n\n call to the ('.${name}') method is considered an invalid pixel syntax`, self, true);
        self.core.map.mountWarn=true;
      }
      return false;
    }
    return true;
  }
  function buildMethods(){
    return { mount, widget, install, handler, directive, property, block, configDelimeters, configIsAsync, configIsCustomElement, configForwardSlot, configSubAttrBinding, configInAttrDelimiters, generic, configForwardAttrs, configBuildOptions };
  }
  for(let [ key, fn ] of entries( buildMethods() )){
    fn=new Proxy(fn, {
      apply(target, thisArg, args){
        const res = mountedWarning(thisArg, key );
        if(isTrue(res)) Reflect.apply(...arguments);
        return thisArg;
      }
    })
    _Pixel_Build.prototype[key]=fn;
  }
  function openTaskPrefix(self){
    self.core.depsQueue.vibrate();
  }
  async function nextCircleReverse(self, fn, persist){
    if(self){
      if(isFalse(self.operands.garbageWatch)){
        queueMicrotask(()=>{
          fn();
          queueMicrotask(()=>{
            self.operands.garbageWatch=false;
          });
        })
        self.operands.garbageWatch=true;
      }
      if(persist){
        new Promise((resolve, reject)=>{
          resolve(self.operands.garbageWatch===false)
        }).then(()=>{
          queueMicrotask(fn);
        })
      }
    }else queueMicrotask(fn);
  }
  function whenMounted(self, build, callback){
    return new Promise((resolve, reject)=>{
      resolve(isEQ(isPixelVNode(build) ? build.$element.getRootNode() : build.getRootNode(), document))
    }).then((res)=>{
      callback();
    })
  }
  function Render_Template(self, initBuild, update=false){
    initBuild=update ? initBuild(self, update) : initBuild ;
    return self.render(self, isPFunction(initBuild) ? initBuild(self) : initBuild, update);
  }
  function nextTick(fn){
    if(fn && !_validateType(fn, Function)){
      $Debug(`positional argument 1 on "nextTick" is not a function\n\n callback requires a function type`, self, !isNull(self) );
      return;
    }
    return new Promise((resolve, reject)=>{
      resolve(nextCircleReverse(self, fn || pass, isPixelBuild(this)));
    })
  }
  async function _Reactive_Renderer(data, callback, self, deep=false){
    const observers=[];
    let observe=(getter, callback)=>{
      const observer = new self.core.Observer( getter, callback, self);
      observers.push(observer);
      observer.update()
      
    }
    const deployObserver=function(observe, dataObj={}){
      for(let key of keys(dataObj) ){//object handler
        if(!isProxySkipped(key)){
          observe(()=>dataObj[key],(newV, oldV)=>{
            callback(newV, oldV, key);
          })
        }
      }
    }
    for(let [key, value] of entries(data)){
      if(isIterable(value) && !isProxySkipped(key)){
          _Reactive_Renderer(value, callback, self, true)
      }
    }
    deployObserver(observe, data);
  }
  const isReadOnlyProp=key=>_mapValue(readOnlyModelProp, key);
  function _hydrationEjectionTrigger(self, reacteData, selector){
    const { newV, oldV, ref  }= reacteData;
    let observer={ mutated:false, willMutate:false, updated_hooks:new Set() };
    if(isPixelVNode(self.build)) {
      Node_Effect_Track(self, self.build, Render_Template(self, self.core.render, true), observer);
      nextCircleReverse(self, ()=>{
        if(observer.mutated) callUpdatedHook(self, observer);
      }, true)
    }
  }
  function Node_Effect_Track(self, virtualElement, virtualBuild, observer){
    const is_hyperscript=self.core.map.is_hyperscript;
    for( const [ ind, node] of arrSet(virtualElement.NodeList).entries()){
       const virtualNode=arrSet(virtualBuild.NodeList)[ind]
      if(isPixelVNode(node)){
        if(isPixelTextVNode(node) && (isTrue(node.render_tracked || is_hyperscript))) RerenderingTextsContents(self, node, virtualNode, observer, virtualElement);
        if(isPixelWidgetVNode(node)) Widget_Effect_Trigger(self, node, virtualElement, observer);
        else if(isTrue(node.isWidgetWrapper)) LoopWrapperRehydration(self, node, virtualElement, virtualNode, observer);
        else {
          Node_Effect_Track(self, node, virtualNode, observer);
        }
      }else if(isCustomElement(node)){
        
      }
      
    }
    if(IS_ELEMENT_NODE(virtualElement.$element) && (virtualElement.PATCH_FLAGS.has('ELEMENT_ATTRIBUTES') || is_hyperscript)){
      let props;
      if(is_hyperscript) props=assign({}, virtualBuild.compiler_options.props())
      else props=assign({}, isFunction(virtualElement.compiler_options.props) ? virtualElement.compiler_options.props() : virtualElement.compiler_options.args ? virtualElement.compiler_options.args.props : {});
      const element=virtualElement.$element;
      const shouldUpdateProp=(prop)=>  !isTrue(has$$_bind(prop) && prop.startsWith('$$on:') && hasAt_bind(prop) ) && isFalse(hasAsterisks_bind(prop) && isOnListener(prop.slice(1)) || has$$_bind(prop) && prop.startsWith('$$bind:') && isOnListener(prop.slice(7)) ) && !isOnListener(prop);
      for(let [key, prop] of entries(props)){
        if( shouldUpdateProp( key ) ) {
          AttributeManager( { [key]:prop }, element, self, virtualElement.compiler_options.px__VNode||virtualElement,  true, observer);
          observer.mutated=true;
        }
      }
    }
  }
  function Widget_Effect_Trigger(self, node, virtualElement, observer){
    const props=assign({}, isFunction(node.compiler_options?.props) ? node.compiler_options.props() : node.compiler_options.args ? node.compiler_options.args.props : {} );
    const params=consume_Widget_Props(self, { $attributes:{}}, { props }, !virtualElement.LabContext ? node : virtualElement, true);
    const inst=node.widget_instance;
    for(const [ key, val ] of entries(params)){
      if(hasProp(inst.model.$params, key) && !isEQ(inst.model.$params[key], val)) {
        inst.model.$params[key]=val;
        observer.mutated=true;
        linkUpdateHook(self, node, observer);
      }
    }
  }
  function RerenderingTextsContents(self, node, vnode, observer, parent){
    const value=node.compiler_options.value;
    const virtualElement= vnode;
    if(!isEQ(node.$element.textContent, virtualElement.$element.textContent)) {
      node.$element.textContent=virtualElement.$element.textContent;
      observer.mutated=true;
      linkUpdateHook(self, parent, observer)
    }
  }
  function LoopWrapperRehydration(self, node, vnode, virtualBuild, observer){
    const  { orgType, ref, src }=node.compiler_options;
    // const newV=()=>get_Object_Value(self.model, ref);
    const is_hyperscript=self.core.map.is_hyperscript;
    const value=!is_hyperscript ? get_Object_Value(self.model, ref) : null;
    const added=new Set();
    const garbage=new Set();
    let index=0;
    for(const [ind, atom] of arrSet(node.NodeList).entries()){
      index++;
      if(deepCompare(src, value)){
        Node_Effect_Track(self, atom, node, observer);
        if(isEQ(ind+1, len(node.NodeList))) return
      }
      if(is_hyperscript){
        if(isGT(Number(ind), len(virtualBuild.NodeList))) garbage.add(atom);
      }else{
        if(isGT( isNumber(src) ? index : keyIndex(src, index), len(value))) {
          garbage.add(atom);
        }
      }
    }
    if(!is_hyperscript && isGT(len(value), len(src))){
      let index=0
      for(let i=0; i<=len(value)-len(src); i++){
        index++
        if(isGT(index, len(value)-len(src))) break;
        const addedIndex= _validateType(value, [Array, Set, Object, Map ]) ? len(src)+(i) : isNumber(value) ? len(src)+index : NaN;
        added.add(_fromKey(value, addedIndex))
      }
    }else if(is_hyperscript && isGT(len(virtualBuild.NodeList), len(node.NodeList))){
      for(let i=0;i<len(virtualBuild.NodeList)-len(node.NodeList); i++){
        added.add(arrSet(virtualBuild.NodeList)[len(node.NodeList)]);
      }
    }
    Node_Effect_Track(self, node, virtualBuild, observer)
    if(len(added)){
      let key =0
      for(let atom of added.values()){
        key++
        let addedNode;
        if(is_hyperscript) addedNode=atom;
        else{
          let { type, props, children,is_hyperscript, px__VNode, alias  }=node.compiler_options.args;
          let { valRef, keyName }=alias;
          let  ctx={}
          if(valRef) ctx[valRef]=atom;
          if(keyName) ctx[keyName]=key;
          if(px__VNode.LabContext) ctx=assign(px__VNode.LabContext, ctx);
          addedNode=node.compiler_options.Node(type, props, children, self, is_hyperscript, ctx, node.NodeList);
          addedNode.LabContext=ctx;
          addedNode.compiler_options.index=len(src)+key;
        }
        arrSet(node.NodeList)[len(node.NodeList)-1].$element.after(addedNode.$element);
        node.NodeList.add(addedNode);
        observer.mutated=true;
      }
    }
    if(len(garbage)){
      for(let atom of garbage.values()){
        atom.$element.remove();
        node.NodeList.delete(atom);
        observer.mutated=true;
      }
    }
    node.compiler_options.src=value;
    // Node_Effect_Track(self, node, virtualBuild, observer);
  }
  function _fromKey(obj, key){
    return isPObject(obj) ? values(obj)[key] : isSet(obj) ? arrSet(obj)[key] : isMap(obj) ? obj[obj.keys()[key]] :  isArray(obj) ? obj[key] : isNumber(key) ? Number(key) : null;
  }
  function linkUpdateHook(self, vnode, observer){
    if(len(vnode.updated_hook)){
      function hook(){
        callSetHooks(self, vnode.updated_hook, vnode.$element, self.model);
      }
      hook._vnode_key=vnode._vnode_key;
      observer.updated_hooks.add(hook);
    }
  }
  function data(value){
      let react={};
      define(react, '_data_flag',{value:true, enumerable,configurable});
      define(react, '$data',{ value, enumerable, configurable, writable});
      return _Proxy_Setup({}, react, true);
  }
  function _initiateChildNodes(self, children,  px__VNode, element){
    const is_hyperscript=px__VNode?.is_hyperscript;
    children=isRender(children) ? children(self, px__VNode) : children;
    if(isChildrenNode(children)){
      if(isPrimitive(children) && !isNull(children)){
        const node=new PixelTextVNode(self, String(children), px__VNode);
        node.compiler_options=assign(node.compiler_options,{ type:'text', value:()=>String(children), px__VNode });
        if(isTrue(node.render_tracked)) px__VNode.render_tracked=true;
        if(len(node.PATCH_FLAGS)) px__VNode.PATCH_FLAGS.add('ELEMENT_CHILDREN');
        element.append(node.$element);
        if(px__VNode) px__VNode.NodeList.add(node);
      }else if(isArray(children)){
        for(const child of children.values()){
          element=_initiateChildNodes(self, child, px__VNode,  element)
        }
      }else if(isPixelVNode(children) ){
        element.append(children.$element);
        px__VNode.NodeList.add(children);
      }else if(isCustomElement(children)){
        element.append(children);
        px__VNode.NodeList.add(children);
      }
    }
    return element;
  }
  function widgetBindingReceiver(self, key, param, widget, px__VNode, modifiers){
    let item=_$runModelBind(self, param, px__VNode)
    if(isUndefined(item)) item='';
    if( !key && !isPObject(item)){
      $Debug(`Trying  to bind directly to instance.\nstatus : failed,\nreason : value not an object`, self, true);
      return;
    }else if(!key && isPObject(item)){
      consume_Widget_Props(self, widget, {props:item}, px__VNode);
    }else if(key){
      consume_Widget_Props(self,widget, {props:{[key]:item}, px__VNode})
    }
  }
  class pixelSignal{
    constructor(signal, func, options){
      this.signal=signal
      this.callback=func
      this.options=options
    }
    signal=undefined
    callback=undefined
    options=undefined
  }
  function Widget_Directive_Handler(self, widget, props, px__VNode, modifiers){
    let name=Object.keys(props)[0];
    let key=directive_sep(name);
    let param=props[name] || "";
    param=bindKeyAsValue(name, param);
    name=directive_sep(name)[0].slice(2);
    key.shift();
    key= isGT(len(key), 1) ? key.join(':') : key[0];
    if(isEQ(name,'bind')) $$dir_BIND(self, { key, item:param }, widget, px__VNode, modifiers);
    else if(isEQ(name, 'on')) $$dir_ON(self, param, widget, px__VNode, key, modifiers);
    else if(isEQ(name, 'slot')) $$dir_SLOT(self, param, widget, px__VNode, modifiers);
    else if(isEQ(name, 'ref')) $$dir_REF(self, param, widget, px__VNode, modifiers);
    else if(isEQ(name, 'model')) pass;
    else if(isEQ(name, 'html') || isEQ(name, 'text')) $$dir_HTML(self, param, widget, px__VNode, isEQ(name, 'text'), modifiers);
    else if(isEQ(name, 'raw')) pass;
    else if(isEQ(name, 'fall')) $$dir_FALL(self, param, widget, px__VNode, modifiers);
    else if(isPixelDirective(name)) pass;
  }
  function ResolveWidget(self, px__VNode, value, ){
    if(!instance_Has_Widget(self,value.type)){
      $Debug(`Template Compilation Error::\n\nUnresolved tagname "${value.type}"\n\n   ...if this is a pixel widget, make sure its registered through the "widgets" option or resolved through the custom nodemake resolver`,self, true);
      return false;
    }
    let instance;
    if (instance_Has_Widget(self, value.type) ){
      let widget=normalize_Widget(self, value.type);
      if(!widget.name) widget.name=value.type
      let patches=[];
      const Ref_Rag={};
      if(value.props) {
        define(widget, '$attributes', {value:{}, enumerable, configurable, writable});
        consume_Widget_Props(self, widget, value, px__VNode);
      }
      instance=CompilePatcher(self, widget, value, px__VNode);//this sets the widget flags, passed the widget to _Pixel_Build, sets global widgets from  its parents if any, installs all BUILT_IN_WIDGETs, mounts the wodget to a fragment and return the domRoot'
        //define(instance, 'Ref_Rag', {value:Ref_Rag});
    }
    return instance;
  }
  function CompilePatcher(self, widget, value, px__VNode){
    if(isClass(widget) && isTrue(widget.BUILT_IN_WIDGET)){
      const refName=widget.$attributes?.self;
      const RefHedge=!isPrimitive(refName) ? refName :  isString(refName) ? normalize_Widget(self, refName) : null;
      if(RefHedge && widget.$children){
        RefHedge.$children=widget.$children
      }
      if(RefHedge && widget.$attributes) widget.$attributes.self=RefHedge || refName;
    }
    widget= defineWidget(widget)
    widget=  set_Widget_Flag(self, widget, value, px__VNode);//setting the widget flag
    log(widget)
    let child=new _Pixel_Build(widget);
    if(self) {
      child=genericHydration(self, child);
      child=child.install(genericGlobalPlugin, { self });//build the widget
    }
    child=child.mount(_createFragment());//mounts the build to a pixel fragment
    return child;
  }
  function genericHydration(self, build){
    if(!len(self.$globals.generic)) return build;
    for(let genre of self.$globals.generic.values()){
      build.generic(genre);
    }
    build.property('$parent', self.build)
    return build;
  }
  function genericGlobalPlugin(build, options){
    for(const [key, value] of entries(options.self.$globals.register)){
      entries(value).forEach(([name, data])=>{
        if(isEQ(key, 'widgets')) build=build.widget(name, data);//in the root, uses the build.widget prototype to define global widgets
        else if(isEQ(key, 'blocks')) build=build.block(name, data);//in the root, uses the build.widget prototype to define global properties
        else if(isEQ(key, 'directives')) build=build.directive(name, data);//in the root, uses the build.widget prototype to define global directive
        else if(isEQ(key, 'handlers')) build=build.handler(name, data);//in the root8, uses the build.widget prototype to define global handlers
        else if(isEQ(key, 'hangers')) build=build.hang(name, data);//in the root8, uses the build.widget prototype to define global hangers
        else if(isEQ(key, 'properties')) build=build.property(name, data);//in the root8, uses the buil/d.widget prototype to define global propertiess
      })
    }
    // log(build.$globalsarrSet(build.$globals.generic))
  }
  function set_Widget_Flag(self, widget, val, px__VNode){
    if(!val.children) return widget;
    widget.$children={ NodeList:val.children, patchFlags:self, px__VNode };
    return widget;
  }
  function consume_Widget_Props(self, widget, value , px__VNode, isRerender=false){
    entries(value.props).forEach(([ind, param])=>{
      let name=__Attr_Name_Resolver(self, ind, px__VNode);
      if(hasAsterisks_bind(name)) name='$$bind:'+name.slice(1);
      else if(hasAt_bind(name)) name='$$on:'+name.slice(1);
      if(has$$_bind(name)){
        const modifiers=name.split('|');
        name=modifiers.shift();
        if( isPixelDirective(directive_sep(name)[0].slice(2))) Widget_Directive_Handler(self, widget, {[name]:param}, px__VNode, modifiers);
        else _With_Custom_Directives(self,{key:name,  attr:param}, widget, px__VNode, modifiers);
      }else if(hasSpread_bind(ind)) Manage_Widget_Spread(self, widget, name)
      else widget.$attributes[name]=param;
    });
    if(isTrue(isRerender)) return widget.$attributes
  }
  function Manage_Widget_Spread(self, widget, props, px__VNode){
    props=isString(props) ? _$runModelBind(self, props.slice(3), px__VNode) : props;
    consume_Widget_Props(self, widget, { props }, px__VNode);
  }
  function _createFragment(){
    const fragment=new DocumentFragment();
    define(fragment, 'isPixel_Fragment',{value:true});
    define(fragment, 'NodeList',{value:[], configurable:true, writable:true});
    define(fragment, 'PATCH_FLAGS',{value:new Set(), configurable:true, writable:true});
    return fragment;
  }
  const devInfo='You are using the development version of pixel '+get_version().slice(6)+', make sure you switched to the minified build version when deploying to production with the (*.min.js) file extension';//development information
  class _Resolver{
    name=undefined
  }
  class _WidgetResolver extends _Resolver{
    constructor(name){
      super()
      this.name=name || undefined;
    }
  }
  class _DirectiveResolver extends _Resolver{
    constructor(name, value, modifiers){
      super();
      this.name=name || undefined;
      this.value=value;
      this.modifiers=modifiers
    }
  }
  function traverse(name){
    if(!isString(name)){
      $Debug(`"traverse" resolving positional argument name must be a string type matching a local/globaly registered widget data`);
      return;
    }
    return new _WidgetResolver(name);
  }
  function defer(obj, prop){
    
  }
  function buffer(name, value, modifiers){
    if(!_validateType(name, [String, Function, Object])){
      $Debug(`"buffer" resolving positional argument name must be a string  resolving to matching a local/globaly registered directive reference or a "Function/Object" type `);
      return;
    }else if(modifiers && !isArray(modifiers)){
      $Debug(`argument 3 passed to buffer expects an array of modifiers strings`);
    }
    return new _DirectiveResolver(name||"", value, modifiers);
  }
  function withDirectives(props, dirs){
    dirs = dirs || [];
    if(!isPObject(props)){
      $Debug(`first positional argument passed to the  "withDirectives" macro requires a plain object  of node attributes`);
      return {};
    }else if(!isArray(dirs)){
      $Debug(`provided position 2 argument on "withDirectives" macro not an array\n\nMay render  Unexpected result`);
    }else if(len(dirs)){
      const dirSet=new Set();
      for(const directive of dirs.values()){
        if(!isDirectiveResolver(directive)){
          $Debug(`in hyperscript use of directives failed\n\nuse the "buffer"  macro for resolving of directives when building with in hyperscript mode`);
        }else dirSet.add(directive);
      }
      if(len(dirSet)){
        define(props, '$$@@dir$$--render',{value:dirSet, enumerable, configurable});
      }
    }
    return props;
  }
  function _escapeDecoder(str){
    str=str/*.replace(/&/g, '&amp;')*/.replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')     
      .replace(/\\/g, '&#39;');  
    return str;
  }
  
  const openingTagsRegex = /<([\w\-\$:.]+)(\s+[^>]*?(?:(?:[\w]+[!@#$%^&*()+\-\[\]{};:\\|,.<\/?]*)|(?:'[^']*')|(?:"[^"]*")))*\s*(\/)?>/g;
  const openingTagAttrRegex=/^<[\w\-\$:.]+(.*?)?[\/]?>\s*$/;
  // const openingTagsRegex=/<([a-zA-Z0-9\-\$_:]*)((\s*[^=]=(?:["'])(.*?)\2)|(\s[^>]*?))?([\/])?>/g;
  const closingTagsRegex=/<[\/]([\w$]+)[ ]*>/g;
  const attrRegex=/([^=\s]*)\s*?=\s*?(?:(["'])(.*?)\2|([^"'\s>]+))/;
  const attributesRegex = /([^=\s]+)\s*=\s*(?:(["'])(.*?)\2|([^"'\s>]+))?|(\S+)(?:\s*=\s*(?:(["'])(.*?)\6|(\S+)))?/g;
  function RunMustacheExcape(self, html){
    if(!self) return html;
    const [ open, close ]= self.core.settings.delimiters;
    const pattern=new RegExp(`${open}(.*?)${close}`, 'g');
    return html.replace(pattern, (match, value )=>{
      return `${open}${ _escapeDecoder(value) }${close}`;
    });
  }
  function openingTagsHydration(html){
    return html.replace(openingTagsRegex, (match, tag, union, closedTag)=>{
      let props=match.trim().match(openingTagAttrRegex)[1];
      if(hasUpperCase(tag)){
        const nodeSpace=`$px-nodespace=${tag}`;
        props=!isNull(props) ? `${props} ${nodeSpace}` : nodeSpace;
      }else if(IsDomparserTag(tag)) tag=`px$$--${tag}-$px`;
      if(props){
        props=props.replace(attributesRegex,(mch, attr, sip, val, fall)=>{
          val=val || fall || null;
          attr=isNull(attr||sip||val||fall)? mch.trim() : attr.trim() ;
          attr= isEmptyStr(attr) ? null : attr ;
          if(attr && attr.startsWith('$px-$')|| attr && attr.endsWith('-$px')){
            $Debug("Indecent attribute name\nShould not start with '$px-$' or end with '-$px'\n\nThis are pixel system based template formating system");
          }
          if(attr && hasUpperCase(attr)) attr=`${attr}-$px`;
          return attr && val && /[\w\$]+/.test(attr) ? `${attr}="${val}"` : attr && !val && /[\w\$]+/.test(attr) ? `${ attr}=""` : '';
        })
        let attrsMatch=props.match(attributesRegex);
        for (let attr of attrsMatch || []){
          const attrMatch=attr.match(attrRegex);
          const attrName=attrMatch ? attrMatch[1] : null;
          if(attrName && hasUpperCase(attrName)){
            const fallbackAttr=`$px-${attrName.toLowerCase()}=${attrName}`;
            props=`${props || ''} ${fallbackAttr}`;
          }
        }
      }
      return `<${tag} ${props || ''} ${ closedTag && !IS_HTML_VOID_TAG(tag) ? '></'+tag+'>' : '>'}`;
    })
  }
  function _HTMLParser(html, self, parent, px__VNode, fall){
    if(!html) return null;
    html=RunMustacheExcape(self, html);
    html=openingTagsHydration(html).replace(closingTagsRegex, (match, tag)=> IsDomparserTag(tag) ? `</px$$--${tag}-$px>` : `</${tag}>` );
    const parser=new DOMParser().parseFromString(html,'text/html').body;
    const NodeList=[];
    for (let node of parser.childNodes){
      if(node ){
        if(IS_TEXT_NODE(node)){
          if(node.textContent.trim()){
            const value=node.textContent;
            node=self ? new PixelTextVNode(self, value,  px__VNode) : value;
            if(isPixelTextVNode(node)) node.compiler_options=assign(node.compiler_options,{ type:'text', value, px__VNode });
            NodeList.push(node);
          }
        }else if(IS_COMMENT_NODE(node))/*Ignore comment nodes*/pass();
        else if(IS_ELEMENT_NODE(node)){
          const hashedTagged=tag=>(tag.startsWith('px$$--') && tag.endsWith('-$px'));
          let tagName=hashedTagged(node.localName) ? node.localName.slice(6,-4) : node.localName;
          const attributes={};
          for (const attribute of entries(node.attributes)){
            const { name, value }=attribute[1];
            if(!name.startsWith('$px')) attributes[name]=value;
            else if(isEQ(name,'$px-nodespace')) {
              tagName=value;
              node.removeAttribute('$px-nodespace');
            }else if( name.startsWith('$px-') && name.endsWith('-$px')){
              const attrN=name.slice(4);
              if(hasOwn(attributes, attrN)){
                attributes[value.slice(0,value.length-4)]=attributes[attrN];
                delete attributes[attrN];
              }
            }
          }
          let Vnode;
          if(self){
            if(hasOwn(attributes||{}, '$$raw')) define(attributes, '$$rawChildrenData$$',{value:_escapeDecoder(node.innerHTML), enumerable, configurable});
            const children=function render(self, px__VNode){
              return IS_VALID_TAGNAME(tagName) ? _HTMLParser(node.innerHTML, self, true, px__VNode) : node.innerHTML;
            }
            let props=()=>len(attributes) ? attributes : null;
            const Node=()=> createVElement(tagName, props(), children, self, false, px__VNode?.LabContext, NodeList, fall);
            Vnode=Node();
            Vnode.compiler_options=assign(Vnode.compiler_options, {
              props, children, type:tagName, px__VNode, Node
            });
          }else{
            const children=node.innerHTML.trim() ? _HTMLParser(node.innerHTML, null, true) : null;
            Vnode={
              type:tagName, props:len(attributes) ? attributes : null, children
            }
          }
          NodeList.push(Vnode)
        }
      }
    }
    if(self) return _getNodeListResponse(NodeList, parent);
    else return isGT(len(NodeList),1) ? NodeList : isEQ(len(NodeList),1) ? NodeList[0] : null ;
  }
  function _getNodeListResponse(NodeList, parent=false){
    NodeList=isSet(NodeList) ? arrSet(NodeList) : NodeList;
    if(isTrue(parent) && len(NodeList)) return isGT(len(NodeList),1) ? NodeList : NodeList[0];
    else if(len(NodeList)) return isGT(len(NodeList),1) ?  new PixelFragmentVNode(parent, NodeList) : NodeList[0] ;
    else return null ;
  }
  function html( strings, ...values){
    const html = strings.reduce(( acc, str, i) => {
      const value = !isNull( values[i]) ? values[i] : '';
      return acc + str + value;
    }, ''); 
    if(!isString(html)){
      $Debug(`html parser helper expects strings values`);  return null;
    }
    return _HTMLParser( html, null);
  };
  function markdown(mkd){
    if(!isString(mkd)){
      $Debug(`markdown helper expects strings values`);  return null
    }
    
  }
  function makeNativeElement(opts){
    this.is_Custom_Node=true;
    if(!isPObject(opts)){
      $Debug(`makeNativeElement option argument values must be type of object......>>>>`);
      return;
    }else if(isGT(arguments.length, 1)){
      $Debug(`makeNativeElement parameter values required only 1 argument.....of an object  option\n\n${arguments.length} given>>>>>>>>>>>`);
      return;
    }
    const isMNEOwnOptions=opt=>_mapValue("plugin,onConnected,onDisconnected,onAdopted,onAttrChanged",opt);
    entries(opts).forEach(([key, value])=>{
      if(!isMNEOwnOptions(key) && !isValidWidgetOption(key)){
        $Debug(`invalid option value....\n\n "${key}" is not a recognised makeNativeElement option `);
        return;
      }
    });
    if(isNull(opts.template)){
      $Debug(`Custom element required a template option`);
      return;
    }
    if(!isNull(opts.plugins)){
      if(isPFunction(opts.plugins)) opts.plugins();
      else if(isPObject(opts.plugins) || isArray(opts.plugins)){
      }else{
        $Debug(`plugin type not supported for custom node`);return;
      }
    }
    const LifeCycleHooksList="onConnected,onDisconnected, onAdopted,onAttrChanged,plugin";
    let Hooks={};
    entries(opts).forEach(([ind, value])=>{
      if(_mapValue(LifeCycleHooksList, ind)){
        if(!isFunction(value)){
          $Debug(`LifeCycle callback error\n\n"${ind}" is a callback function, received an invalid type`);return;
        }
        if(isEQ('onConnected',ind)) define(Hooks, 'connectedCallback',{value, configurable});
        if(isEQ('onDisconnected',ind)) define(Hooks, 'disConnectedCallback',{value, configurable});
        if(isEQ('onAdopted',ind)) define(Hooks, 'adoptedCallback',{value, configurable});
        if(isEQ('onAttrChanged',ind)) define(Hooks, 'attributeChangedCallback',{value, configurable});
      } 
    })
    pixelCustomNativeElement.prototype.disConnectedCallback=Hooks.disConnectedCallback || pass;
    pixelCustomNativeElement.prototype.adoptedCallback=Hooks.adoptedCallback || pass;
      pixelCustomNativeElement.prototype.attributeChangedCallback=Hooks.attributeChangedCallback || pass;
    pixelCustomNativeElement.prototype.connectedCallback=connectedCallback;
    function connectedCallback(){
      const props=new Object();
      if(len(entries(this.attributes))){
        for( const [key, attr ] of entries(this.attributes)) {
          const { name, value } = attr;
          props[name]=value
        }
      }
      const shadow=this.attachShadow({ mode: 'open'});
      const template=el(opts, props )().$element;
      // this.replaceWith(template)
      shadow.appendChild(template);
      const user_defined_callback=Hooks.connectedCallback || pass
      user_defined_callback.call(this, ...arguments);
    }
    function render(){
      return pixelCustomNativeElement;
    }
    render.define=function define(name, inherit){
      if(!isString(name) || isEmptyStr(name) || IS_VALID_TAGNAME(name)){
        $Debug('Name positional argument passed to define is not a string or a valid name value\n\n or may have conflicted with native html/svg tags');
        return;
      }
      if(inherit && !isString(inherit) && !IS_HTML_TAG(inherit)){
        $Debug(`problem with the inherit value, \n\n may not be a string value or a valid HTML tagName`);
        $Debug(`CustomElement registration failed`);
        return;
      }
      customElements.define(name, pixelCustomNativeElement, inherit ? { extends:inherit} : {})
    }
    return render;
  }
  class Anchor extends Widget{
    constructor(){
      super()
    }
    build(){
      
      return ()=>el('slot');
    }
  }
  makeNativeElement=makeNativeElement.bind({});
  const validStoreOptions="model,actions";
  const isValidStoreOption=opt=>_mapValue(validStoreOptions, opt);
  class effectStorePlugin{
    constructor(data){
      
    }
    plugin=function plugin(build, options){
      const store=createObj('Store')
      build.property('$store', store);
    }
  }
  
  function openEffectStore(data){
    return new effectStorePlugin(data);
  }
  
  
  class buildRouterPlugin{
    constructor(routes){
      
    }
    plugin=function plugin(build, options){
      build.widget('px-anchor', defineWidget(Anchor))
      const router=createObj('Router')
      build.property('$router', router)
    }
    
  }
  function buildRouter(routes){
    return new buildRouterPlugin(routes)
  }
  async function AsyncWidget(opts){
    opts=await defineWidget(opts)
    opts.isAsync=true;
    options= opts;
    return await options;
  }
  function pass(){}
  function defineWidget(opts, options){
    if(!validPixelWidget(opts)){
      $Debug(`Value Error\n\n invalid value for the defineWidget macro\n/... at /././. at`);
      return;
    }else if(isGT(arguments.length, 2)){
      $Debug(`Parameter Error\n\nmax-2 argument required\n ${arguments.length} given`);
      return;
    }else if(isPObject(opts) || isFunction(opts)){
      let widget= new Object(opts)
      if(isPFunction(opts)) {
        widget.build=opts;
      }else if(isPObject(opts)){
        for( const [ key, value ] of entries(opts)){
          if(!hasProp(widget, key)) widget[key]=value;
        }
      }else if(isClass(opts)) widget=new opts();
      if(options) {
        for( const [ key, value ] of entries(options)){
          if(!hasProp(widget, key ) && !isPixelProp(key)) widget[key]=value;
        }
      }
      return widget;
    }
  }
  function processPIXELFile(Source) {
    const body=createPixelElement('body');
    body.innerHTML=Source
    const script=body.querySelector('script');
    const template=body.querySelector('template');
    const style=body.querySelector('style');
    let Widget={}
    if(script){
      let parser=Function('module',` ${script.innerHTML}`);
      const obj={}
      parser(obj)
      if(hasOwn(obj, 'default')) assign(Widget, obj.default)
    }
    if(template) define(Widget, 'template', {value: template.innerHTML, configurable, enumerable});
    if(style) define(Widget, 'styleSheet', {value: style.innerHTML, configurable, enumerable});
    return Widget;
  }
  function getPIXELFile(url, callback, data) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onreadystatechange =  ()=>{
      if (xhr.readyState === 4 && xhr.status === 200) {
        data = xhr.responseText;
        callback(data);
      } else if (xhr.readyState === 4 && xhr.status !== 200) {
        $Debug('Error loading/importing pixel widget file');
      }
    };
    xhr.send();
  }
  async function doFetch(URL, ){
    let thisBind={};
    let value
    await getPIXELFile(URL,function callback(source) {
      
      }, value)
    return await thisBind
  }
  async function importWidget(URL){
    let value=await doFetch(URL)
  }
  function initBuild(options, props, children){
    return new _Pixel_Build(options, props, children);}
  function initSSRBuild(options, props, children){
    for(let key of Object.keys(options)){
      if(!isValidWidgetOption(key)) $Debug(`Widget option error\n\n "${key}" not a valid widget option`);}
    return new _Pixel_Build(options);
  }
  function defineElement(options){
    if(!isPObject(options)){ $Debug(`defineElement Error\n expects an 'object'`);return;}
    const optionsName="type,props,children";
    if(isGT(Object.keys(options).length, 3)){
      $Debug(`Options Error\n\n defineElement does not accept more than 3 arguments`);
    }
    for(let name of Object.keys(options)){
      if(!_mapValue(optionsName, name)) {$Debug(`${name} is not a valid defineElement options value`);return;}
    }
    return el(options.type, options.props||{}, options.children||[]);
  }
  function Req__init__(urlOrOpts,method,options={}){
    let url;
    if(isPObject(urlOrOpts)){
      method=urlOrOpts.method||'GET'
      url=urlOrOpts.url
      delete urlOrOpts.method
      delete urlOrOpts.url
      options=urlOrOpts
    }else if(isString(urlOrOpts)){
      url=urlOrOpts
      if(isPObject(method)){
        method='GET'
        options=method
      }else if(isString(method)) method=method||'GET'
      else method='GET'
    }
    method=method.toUpperCase();
    return new Promise((resolve, reject)=>{
      const xhr=new XMLHttpRequest()
      xhr.open(method,url,options.async||true)
      if(Object.hasOwn(options,'timeout')) xhr.timeout=options.timeout
      if(Object.hasOwn(options,'headers')  && typeof options.headers==='object'){
        for(const [header, value] of Object.entries(options.headers)){
          xhr.setRequestHeader(header, value)
        }
      }
      resolveHooks(xhr, options)
      xhr.send()
      resolve(xhr.response)
    })
  }
  class _PixelHttpRequestModule{
    post=function post(url,options){
      return new Req__init__(url,'POST',options)
    }
    get=function get(url, options){
      return new Req__init__(url,'GET',options)
    }
    delete =function(url, options) {
      return new Req__init__(url,'DELETE',options)
    }
    head=function head(url, options){
      return new Req__init__(url,'HEAD',options)
    }
    patch=function patch(url, options){
      return new Req__init__(url,'PATCH',options)
    }
    put=function put(url, options){
      return new Req__init__(url,'PUT',options)
    }
    options=function options(url, options){
      return new Req__init__(url,'OPTIONS',options)
    }
    trace=function trace(url, options){
      return new Req__init__(url,'TRACE',options)
    }
    connect=function connect(url, options){
      return new Req__init__(url,'CONNECT',options)
    }
    request=function request(urlOrOpts,methodOrOptions,options){
      return new Req__init__(...arguments)
    }
  }
  function Request(urlOrOpts, methodOrOptions,options){
    return new Req__init__(...arguments)
  }
  for(const [name, callback] of entries(Object.create(new _PixelHttpRequestModule()))) Request[name]=callback;
  function resolveHooks(xhr, opts){
  
  }
  _$compiler_engine_hydrator();
  
  global._PixelHttpRequestModule=_PixelHttpRequestModule;
  global._styleSheet_hydration=_styleSheet_hydration;
  global._compileToStaticTemplateScarfold=_compileToStaticTemplateScarfold;
  global.scarfold=scarfold;
  global.importWidget=importWidget;
  global.defineElement=defineElement;
  global.get_version=get_version;//dev
  global.el=el;
  global._Evaluate_THIS=_Evaluate_THIS;
  global.None=None;
  global.renderSlots=renderSlots;
  global.pixelCompilerConfig=pixelCompilerConfig;
  global._mapValue=_mapValue;
  global.initBuild=initBuild;
  global.withModifiers=withModifiers;
  global._initiateChildNodes=_initiateChildNodes;
  global._$runModelBind=_$runModelBind;
  global.Await=Await;
  global._Run_With_Modifiers=_Run_With_Modifiers
  global.initSSRBuild=initSSRBuild;
  global.log=log;//dev
  global._Resolver=_Resolver;
  global._DirectiveResolver=_DirectiveResolver;
  global.Portal=Portal;
  global.renderFor=renderFor;
  global.Build=Build;
  global.Transition=Transition;
  global.AsyncWidget=AsyncWidget;
  global.Animation=Animation;
  global.createVElement=createVElement;
  global.markdown=markdown;
  global._validateType=_validateType
  global.Any=Any;
  global._getNodeListResponse=_getNodeListResponse;
  global.nextTick=nextTick;
  global._generateUUID=_generateUUID;
  global.Type=Type;
  global.defineWidget=defineWidget;
  global.html=html;
  global.defer=defer;
  global._escapeDecoder=_escapeDecoder;
  global.withDirectives=withDirectives;
  global.traverse=traverse;
  global.buffer=buffer;
  global.createPixelElement=createPixelElement;
  global.Widget=Widget;
  global.len=len;
  global._HTMLParser=_HTMLParser;
  global._EvalWith=_EvalWith;
  global._Proxy_Setup=_Proxy_Setup;
  global.data=data;
  global._createNativeElement=_createNativeElement;
  global.Request=Request;
  global.isNativeElement=isNativeElement;
  global._createWidgetElement=_createWidgetElement;
  global._hyphenate=_hyphenate;
  global.openEffectStore=openEffectStore;
  global._capitalize=_capitalize;
  global._createTextElement=_createTextElement;
  global.buildRouter=buildRouter;
  global.makeNativeElement=makeNativeElement;
  global._createFragment=_createFragment;//dev
  global.$Debug=$Debug;//dev
  global.Fragment=Fragment;
  global._GenerateRoot=_GenerateRoot;
  global.withFallThrough=withFallThrough;
  console.info(devInfo);//dev
  return global;
})(({}));
