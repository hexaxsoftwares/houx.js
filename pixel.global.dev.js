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
  const isPrimitive=val=>!isObject(val) && !isFunction(val) && !isArray(val);
  const hasOwn=Object.hasOwn;
  const assign=Object.assign;
  const define=Object.defineProperty;
  const entries=Object.entries;
  const keys=Object.keys;
  const values=Object.values;
  const vSet=se=>{
    if(!isSet(se)) return null;
    const li=[];
    for(let [key, value] in se.entries()){
      li.push(value);
    }
    return li;
  }
  function _mapValue(obj, arg){
    return isNull(obj) ? false : isString(obj) ? new Set(obj.split(',')).has(arg) : isPObject(obj) ? hasOwn(obj, arg) : isArray(obj) ? obj.includes(arg) : isSet(obj) || isMap(obj) ? obj.has(arg) : false;
  }
  const isFunction=func=>isEQ(getType(func),'function');
  const isPFunction=func=>isFunction(func) && !isClass(func);
  const isNumber=num=>isEQ(getType(num),'number');
  const isBoolean=bool=>isEQ(getType(bool), 'boolean');
  const bool=Boolean;
  const defProps=Object.defineProperties
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
    if(shouldlog) {
      if(dictateW) console.warn(`${$warner}\n\nEncountered a problem ${txt} \n\n at  at  \n <${self.ownProperties.name}> widget`);//pixel warming debugger
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
  const validWidgetOptions="build,model,widgets,preBuild,postBuild,preMount,onMounted,preUpdate,onUpdated,onDestroyed,preDestroy,handlers,params,buildConfig,styleSheet,directives,template,name,observers,templateSrc,styleSheetSrc,blocks,signals,hang,fork,slots,markdown,markdownSrc,slots";//valid widget options---
  const stringBasedOptions="name,template,styleSheet,templateSrc,styleSheetSrc,markdown,markdownSrc";
  const methodBasedOptions="build,model,preBuild,postBuild,preMount,onMounted,preUpdate,onUpdated,onDestroyed,preDestroy";
  const objectBasedOptions="widgets,handlers,params,buildConfig,directives,observers,blocks";
  const arrayBasedOptions="params,fork,signals,hang,slots"
  const len=obj=>isPObject(obj) ? Object.keys(obj).length : isArray(obj) ? obj.length : isSet(obj) ? obj.size : isString(obj) ? obj.length : 0;
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
  const HTMLIDLAttributes="accesskey,contenteditable,dir,draggable,enterkeyhint,hidden,inert,innerText,inputmode,popover,lang,noModule,nonce,outerText,spellcheck,style,tabindex,title,translate,className,value";
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
    else if(IS_HTML_DEPRECATED_TAG(txt) || IS_SVG_DEPRRCATED_TAG(txt)){$Debug(`"${txt}" is an html/svg deprecated tag, and should not be used in new projects\n\nPixel JS       does not offer the compilation of obselete elements`);return false;}
    else return false;
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
  const IsValidElement=(vnode)=> vnode instanceof Element
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
  const TypeMethods={isString, isFunction, isPObject, isArray, isBoolean, isNumber, isDate, isSymbol, isSet, isMap}
  const isCustomVNode=node=>node?.is_Custom_Node && _validateType(node, HTMLElement);
  const isChildrenNode=val=> {
    let res = isPrimitive(val) || isArray(val) || isPixelVNode(val) || isPixelBuild(val) || isCustomVNode(val);
    if(!res && isFunction(val)) return isChildrenNode(val());
    return res;
  }
  const isProxy=value=>_validateType(value, Proxy);
  class Type{
    type=undefined
    validator=undefined
    constructor(){
      
    }
  }
  class AnyType extends Type{
    constructor(){
      super()
    }
    any_data_type=true
  }
  class NoneType extends Type{
    void_data_type=true
  }
  const is_Custom_Type=type=>_validateType(type, Type);
  const Any=new AnyType();
  const None=new NoneType();
  const isAnyType=data=>_validateType(data, AnyType);
  const isNoneType=data=>_validateType(data, NoneType);
  const validPixelWidget=(w)=>(isPObject(w) || isFunction(w) || isClass(w)) && !isProxy(w);
  function parseScript(script){return new Function(`"use strict"; return ${script}`)();}//helps compile string values to javascript statement
  const isInDom=element=> isEQ(element.getRootNode(),document);
  const GLOBAL_EVENTS="abort,animationcancel,animationend,animationiteration,animationstart,auxclick,blur,error,focus,canplay,canplaythrough,cancel,change,click,close,contextmenu,dblclick,drag,dragend,dragenter,dragleave,dragover,dragstart,drop,durationchange,emptied,ended,formdata,gotpointercapture,input,invalid,keydown,keypress,load,keyup,loadeddata,loadedmetadata,loadend,loadstart,lostpointercapture,mousedown,mouseenter,mouseleave,mousemove,mouseout,mouseover,mouseup,mousewheel,wheel,pause,play,playing,pointerdown,pointermove,pointerup,pointercancel,pointerover,pointerout,pointerleave,pointerenter,pointerlockchange,pointerlockerror,progress,ratechange,reset,resize,scroll,securitypolicyviolation,seeked,seeking,select,selectstart,selectionchange,slotchange,stalled,submit,suspend,timeupdate,touchcancel,touchend,touchstart,touchmove,transitioncancel,transitionrun,transitioned,transitionstart,waiting,volumechange,autocompleteerror,autocomplete";//Html event names managed by pixel on elements
  const IS_VALID_EVENT_HANDLER=eventName=>_mapValue(GLOBAL_EVENTS, eventName);
  const isClass = val=> val.toString().startsWith('class')
  function isInstanceOf(construct, val){
    if(isClass(construct)) return val instanceof construct;
    return false;
  }
  const instance_Has_Widget=(self, name )=>_mapValue(BUILT_IN_WIDGETS, name) || _mapValue(self.register.widgets || {}, name ) ;
  const normalize_Widget=(self, name)=>_mapValue(BUILT_IN_WIDGETS, name) ? BUILT_IN_WIDGETS[name] : _mapValue(self.register.widgets, name) ? self.register.widgets[name]: null;
  const isSlotInstance=val=> _validateType(val, slotInstanceMap);
  const requestMethods="POST,GET,PATCH,HEAD,DELETE,PUT,CONNECT,OPTIONS,TRACE";
  const isRequestMethod=method=>_mapValue(requestMethods, method);
  const isPixelVNode=vnode=>vnode instanceof PixelVNode;
  const isPixelBuild=widget=>widget instanceof _Pixel_Build;
  const isWidgetResolver=data=>_validateType(data, _WidgetResolver);
  function isReactiveValue(value){
    
  }
  function unWrapReactiveValue(value){
    
  }
  function isShallowReactiveValue(value){
    
  }
  class PixelGlobalSettings{
    debug=true
    inheritSlot=true
    inheritAttrs=true
    delimiters=['{{','}}']
    subAttrBinding=false
    inAttrDelimiters=this.delimiters
    isAsync=false
  }
  const Global_Settings= new PixelGlobalSettings()
  class pixelCompilerEngineSettings{
    debug(debug){
      Global_Settings.debug=debug
    }
    inheritAttrs(inheritAttrs){
      Global_Settings.inheritAttrs=inheritAttrs
    }
    inheritSlot(inheritSlot){
      Global_Settings.inheritSlot=inheritSlot
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
  }
  function isXtruct(func) {
    try {
      new func();
      return true;
    } catch (error) {
      return false;
    }
  }
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
          res=val instanceof type
        }catch(err){
          return res;
        }
        return res
      }
    }else if(isAnyType(type)) return true;
    else if(isArray(type)){
      let res=false;
      for(let typeF of type.values()){
        if(!isFunction(typeF)){
          $Debug(`type check value is not a function or class constructor type\n\n found "${typeF}"`); return false;
        }
        res=_validateType(val, typeF);
        if(isTrue(res)) break;
      }
      return res;
    }
    return false;
  }
  class Pixel{}
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
    if(px__VNode)  define(px__VNode, '_vnode_key',{value:_generate_UUID(7), enumerable})
    if(parent && !is_hyperscript){
      let hasSkip=hasOwn(parent, '$$raw');
      const Skip=parent['$$raw'];
      hasSkip= hasSkip && isBoolean(Skip) ? Skip : hasSkip ;
    }
    if(text) node=document.createTextNode(text);
    if(hasSpecialCharacters(node.textContent) &&  !hasSkip && !is_hyperscript) {
      node.textContent=resolveAccessor(self, parent, node, px__VNode);
    }
    define(px__VNode, 'trigger_Effect_Run',{value:Node_Effect_Track.bind({target:node, self:self})});
    px__VNode.is_text_node=true
    return node;
  }
  class PixelVNode{
    constructor(){
      if (IsValidElement(this.$element)) define(this.$element, 'pixelVNode',{value:this, enumerable, configurable})
    }
    base_element=undefined
    get_parent_element(){
      return this.$element.parentElement.pixelVNode
    }
    render_tracked=false
    $element=undefined
    slot_name=undefined
    before_create=undefined
    created_hook=undefined
    mounted_hook=undefined
    widget_instance=undefined
    updated_hook=undefined
    _vnode_key=undefined
    destroyed_hook=undefined
    patch_tracks=new Set()
    conditional_record={ src:undefined, res:false, passed:false}
    compiler_options=new Object()
    px_hash_=undefined
    children_nodes_list=new Array()
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
    trigger_Effect_Run=undefined
    NodeList=new Set()
    PATCH_FLAGS=new Set()
    insertChild(node){
      if(isPixelVNode(node)){
         this.$element.append(node.$element)
         this.NodeList.add(node)
      }else do_Nothing
      return this;
    }
    insertBefore(){
      
    }
    insertAfter(){
      
    }
    normalizeVnode(){
      
    }
    remove(){
      
    }
    replace(){
      
    }
    
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
    const keyValueRegex=/(([{|\[|\(])[ ]*(([a-zA-Z0-9.\$\_]*)[ ]*([\,][ ]*([a-zA-Z0-9\_\$]+)?)?)[ ]*([}|\]|)])[ ]+([of|in]+)[ ]+([a-zA-Z0-9.\_\$]+))/;
    const valueRegex=/(([a-zA-Z.\_\$]+)[ ]+([of|in]+)[ ]+([a-zA-Z0-9.\-\_\$]+))/;
    const iterableRegex=/^([a-zA-Z0-9.\_\$]+)$/
    const Loop_Data={}
    if(str.match(keyValueRegex)){
      str=str.replace(keyValueRegex,(match,p1, op, p2, key, rud, val,  cl, type, obj)=>{
        if(isGT(op, 1) && isGT(cl, 1) ) {
          $Debug(`únrecognised tags, \n must be a single opening or closing brackets`);return;
        }else if(!isTagMatch(op, cl)){
          $Debug(`Unmaching tags for "for" directive loop data keys mapping\n `);return;
        }
        define(Loop_Data, 'key', {value:key});
        if(val) define(Loop_Data, 'value',{value:val});
        define(Loop_Data, 'type', {value:type});
        define(Loop_Data, 'obj',{value:obj});
        return match;
      })
    }else if(str.match(valueRegex)){
      str=str.replace(valueRegex,(match, p1, key, type, obj)=>{
        define(Loop_Data,'key',{value:key});
        define(Loop_Data,'type',{value:type});
        define(Loop_Data, 'obj' ,{value:obj});
        return match;
      })
    }else if(str.match(iterableRegex)){
      str=str.replace(iterableRegex,(match, value)=>{
        define(Loop_Data, 'obj',{value, enumerable})
      })
    }else{
      $Debug(`Usupported Loop format in '$$for'\n\n"${str}" directive  is not recognised`);return;
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
      $Debug(`Trouble accessing '${data.obj}' object for $$for loop\n\nnot found on instance or is undefined\n\n${error}`);return;
    }
    if(!dataObject || !isPObject(dataObject) && !isArray(dataObject) && !isNumber(dataObject)){
      $Debug(`Undefined scope for $$for, \n\n${data.obj} not iterable`);return ;
    }
    const Valid_LoopType="of,in";
    if(data.type && !_mapValue(Valid_LoopType, data.type)){
      $Debug(`Iteration issue\n\n"${data.type}" is not an iterator\n "of" or "in" only supported by Pixel`);return;
    }
    return { obj:dataObject, keyName:data.key, valRef:data.value, loopType:data.type, ref:data.obj }
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
      this.compiler_options=compiler_options;
      this.source=source;
      this.px__VNode=px__VNode;
      this.siblings=siblings;
    }
  }
  const isRenderlessVNode=vnode=>_validateType(vnode, renderlessVNode) || (isPixelVNode(vnode) && isTrue(vnode.IS_RENDERLESS));
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
        const node = new PixelElementVNode(...this.args, false, this.px__VNode.LabContext);
        this.px__VNode.conditional_record.src='if';
        this.px__VNode.conditional_record.res=true;
        this.px__VNode.conditional_record.passed=true;
        this.px__VNode.NodeList.add(node);
        return node.$element;
      }else {
        const renderless= new renderlessVNode(data, this.args, 'if', this.px__VNode);
        this.px__VNode.conditional_record.src='if';
        this.px__VNode.IS_RENDERLESS=true;
        this.px__VNode.conditional_record.res=false;
        this.px__VNode.NodeList.add(renderless);
        return renderless.$element;
      }
    } 
    Panel_elseif_Block(isElse=false){
      const block=isElse ? 'else' : 'else-if' ;
      let data=_$runModelBind(this.self, this.props['$$'+block], this.px__VNode);
      const previous=this.siblings[len(this.siblings)-1];
      this.px__VNode.conditional_record.passed=previous.conditional_record.passed
      delete this.args[1]['$$'+block];
      if(!len(this.siblings) || !previous || (!this.isConditionalVnode(previous, 'if') && !this.isConditionalVnode(previous, 'else-if'))){
        $Debug(`"${block}" conditional rendering directive block has no preceding "if" or "else-if" directive element\n\n may return unexpected result\ndid you mean "if" directive instead?\n\n at>>>>>>>>""`, this.self, true);
        const node = new PixelElementVNode(...this.args, false, this.px__VNode.LabContext);
        return node.$element;
      }else if(!isTrue(previous.conditional_record.passed) && isRenderlessVNode(previous) && !isTrue(previous.conditional_record.res)){
        if(isElse || data){
          const node = new PixelElementVNode(...this.args, false, this.px__VNode.LabContext);
          this.px__VNode.conditional_record.src=block;
          this.px__VNode.conditional_record.res=true;
          this.px__VNode.NodeList.add(node);
          return node.$element;
        }else{
          const renderless= new renderlessVNode(data, this.args, block, this.px__VNode);
          this.px__VNode.conditional_record.src=block;
          this.px__VNode.IS_RENDERLESS=true;
          this.px__VNode.conditional_record.res=false;
          this.px__VNode.NodeList.add(renderless);
          return renderless.$element;
        }
      }else {
        const renderless= new renderlessVNode(data, this.args, block, this.px__VNode);
        this.px__VNode.conditional_record.src=block;
          this.px__VNode.IS_RENDERLESS=true;
          this.px__VNode.conditional_record.res=false;
          this.px__VNode.NodeList.add(renderless);
          return renderless.$element;
      }
    }
    Panel_else_Block(){
      return this.Panel_elseif_Block(true);
    }
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
    const { obj, keyName, valRef, loopType, ref }=For_Loop(self, args.props['$$for'], px__VNode);
      delete args.props['$$for'];
    if(loopType && isEQ(loopType, 'in') && valRef && !isNumber(obj) && isObject(obj)){
      $warn(`((Warning))\n\nWe do not recommend the use of key value paires in 'for...in' loops while iterating over a plain object, \n\nsince the value of the value reference will remain "undefined"\nPreferable over a non plain object`, self);
      $warn(`Many JavaScript style guides and linters recommend against the use of 'for...in', because it iterates over the entire prototype chain which is rarely what one wants, and may be a confusion with the more widely-used "for...of" loop\n\nIt's included in Pixel's support for completeness.`, self);
    }
    const NodeList=[];
    if(isNumber(obj)){
      for(let i=0 ; i < obj ; i++){
        let ctx= {}
        if(valRef) ctx[valRef]=i+1;
        if(keyName) ctx[keyName]=valRef ? i : i+1;
        if(px__VNode.LabContext) ctx=assign(px__VNode.LabContext, ctx);
        const props=assign({}, args.props);
        const loopNode=new  PixelElementVNode(args.type, props, args.children, args.self, false, ctx);
        if(loopNode) NodeList.push(loopNode);
      }
    }else if(loopType &&  _mapValue("of,in", loopType)){
      for(const [ky, vl] of  entries(obj)){
        let ctx ={ }
        if(keyName) ctx[keyName]=valRef ? ky : vl;
        if(valRef) ctx[valRef]=vl;
        if(px__VNode.LabContext) ctx=assign(px__VNode.LabContext, ctx, NodeList);
        const props=assign({}, args.props);
        const loopNode= new PixelElementVNode(args.type, props, args.children, args.self, false, ctx,  NodeList);
        if(loopNode) NodeList.push(loopNode);
      }
    }
    wrapper= _getNodeListResponse(NodeList);
    px__VNode.NodeList.add(wrapper)
    return wrapper.$element
  }
  function keyIndex(obj, key){
    const mapKeys=Object.keys(obj);
    return mapKeys.indexOf(key);
  }
  function VNodeManager(self, options, element, px__VNode, siblings){
    const { type, props, children }=options;
    const conditionals="$$if,$$else,$$else-if"
    if(hasIFWithFor(props, conditionals) && isLT(keyIndex(props, '$$if'), keyIndex(props, '$$for'))) return _$Conditional_Dir_Resolver(self, props, [type, props,  children, self], px__VNode, siblings);
    else if(hasOwn(props, '$$for')) return _$Directive_$For_Loop$_Renderer(self, {type, props, children, self}, px__VNode, siblings);
    else if(has_Intersect_Prop(conditionals.split(','), props)) return _$Conditional_Dir_Resolver(self, props, [type, props,  children, self], px__VNode, siblings);
    else return createElementVNode(type, children, props, self,px__VNode);
  }
  class PixelElementVNode extends PixelVNode{
    constructor(type, props, children, self, is_hyperscript=false, ctx, siblings){
      super();
      if(is_hyperscript){
        this.is_hyperscript=true;
        this.called_render=true;
      }
      if(ctx) this.LabContext=ctx;
      const frameDirectives="$$for,$$if,$$else-if,$$else";
      if(!is_hyperscript && has_Intersect_Prop(frameDirectives.split(','), props)) this.$element=VNodeManager(self, {type, props, children}, null, this, siblings);
      else this.$element=createElementVNode(type, props, children, self, this);
    }
  }
  class PixelFragmentVNode extends PixelVNode{
    constructor(self, vnodes=[]){
      super();
      this.$element=_createFragment(self)
      for(let node of vnodes.values()){
        if(isPrimitive(node)){
          if(isNull(node) || isEmptyStr(node)) do_Nothing;
          else node=new PixelTextVNode(self, String(node), this) ;
        }else if(isRender(node)) node=node(self);
        if(isPixelVNode(node)){
          this.$element.append(node.$element)
          this.NodeList.add(node);
        }
      }
    }
  }
  class PixelTextVNode extends PixelVNode{
    constructor(self, text,  px__VNode){
      super();
      this.is_hyperscript= px__VNode?.is_hyperscript ;
      if(px__VNode?.LabContext && !this.is_hyperscript) this.LabContext=px__VNode.LabContext
      this.$element=_createTextElement(self, text, this)
    }
  }
  class slotInstanceMap{
    slots=new Object();
    constructor(opts){
      for(let [name, value] of entries(opts)){
        value=returnRender(value);
        define(this.slots, name, { value, enumerable, configurable});
      }
    }
  }
  function renderSlots(options){
    if(!isPObject(options)){//renderimg of slots contents in hypeescript
      $Debug(`expects an Object as a positional argument  to "renderSlots" method`, self, true);return;
    }
    return new slotInstanceMap(options);
  }
  function renderFor(iterable, render){
    const NodeList=[]
    if(isIterable(iterable)){
      for(let [key, value] of entries(iterable)){
        const vnode=render(value, key);
        NodeList.push(vnode);
      }
    }
    return function render(self){
      return new PixelFragmentVNode(self, NodeList);
    }
  }
  const isPixelWidgetVNode=vnode=>isPixelVNode(vnode) && vnode.is_mount_root;
  function getChild(attributes, children){
    let res;
    if(attributes) {
      res= hasOwn(attributes,'args2') && isChildrenNode(children) ? children : hasOwn(attributes, 'args3') && isChildrenNode(attributes) ? attributes : null;
      if(hasOwn(attributes,'args2')) delete attributes['args2'];
      else if(hasOwn(attributes, 'args3')) delete attributes['args3'];
    }else if(!attributes && isChildrenNode(children)) res=children;
    return res;
  }
  function createElementVNode(type, props, children, self, px__VNode){
    if(isString(type) && IS_VALID_TAGNAME(type)) return _createNativeElement(...arguments);
    else return _createWidgetElement(...arguments);
  }
  function _createNativeElement(type, attributes, children, self, px__VNode){
    const argsCount=len(new Set(arguments));
    let element;
    const is_hyperscript=px__VNode?.is_hyperscript || false;
    if(px__VNode)  define(px__VNode, '_vnode_key',{value:_generate_UUID(7), enumerable})
    if(isString(type)){
      if(IS_VALID_TAGNAME(type)){
        element=document.createElement(type);
        if(px__VNode) px__VNode.is_element_node=true
        if(self && len(self) && px__VNode) {
          px__VNode.px_hash_=self.ownProperties.px_hash_
        }
      }
    }
    if(attributes && hasOwn(attributes, '$$raw')  && !is_hyperscript){
      const name=attributes['$$raw'];
      let item=_$runModelBind(self, name, px__VNode, true);
      if(px__VNode) px__VNode.compiler_options['dir--raw']=item;
    }
    element.PATCH_FLAGS=new Set()
    if(children && !IS_HTML_VOID_TAG(type)) {
      if(hasOwn(px__VNode.compiler_options,'dir--raw')){ 
        if(!isFalse(px__VNode.compiler_options['dir--raw'])){
          element.innerHTML=attributes.$$rawChildrenData$$
        }else element= _initiateChildNodes(self, children, px__VNode, element );
        delete attributes.$$rawChildrenData$$;
      } else element= _initiateChildNodes(self, children, px__VNode, element );
    }
    if(attributes) element=AttributeManager(attributes, element, self, px__VNode)
    if(self) element.setAttribute("data-px_hash_", self.ownProperties.px_hash_|| "")
    if(!is_hyperscript && element.hasAttribute('$$ref')){
      const attr=element.getAttribute('$$ref');
      if(!has_Object_Prop(self.model,attr)){
        $Debug(`Directive resolver issue::\n\n$$ref directive property value does not point to a valid model path\n"${attr}" is referenced on build, but not defined on model instance. `);return element;
      }else{
        let item;
        try{
          item=get_Object_Value(self.model, attr, true);
        }catch(err){
          $Debug(`undefined property path at       at\n\n"ref" directive of "${element.outerHTML} element`);
          return;
        }
        set_Object_Value(self.model || {} , attr, {value:element})
      }
    }
    if(px__VNode) define(px__VNode,'trigger_Effect_Run', {value:Node_Effect_Track.bind({target:element, self:self}),enumerable});
    return element;
  }
  function _createWidgetElement(type, props, children,  self, px__VNode){
    const is_hyperscript=px__VNode?.is_hyperscript;
    if(isString(type) && !is_hyperscript){
      children=children(self, px__VNode)
      children=isString(children) ? _HTMLParser(children,  self, true, px__VNode) : isRender(children)  ? children(self, px__VNode) : children;
      if(!isArray(children)) children=[children]
      const widget=ResolveWidget(self, px__VNode, {type, props, children })//reso;ving a widget data object
      px__VNode.is_mount_root=true;
      px__VNode.px_hash_=self.ownProperties.px_hash_;
      px__VNode.widget_instance=widget;
      if(widget.ownProperties.slot_name) px__VNode.slot_name=widget.ownProperties.slot_name;
      return widget && isPixelBuild(widget) ? widget.build.$element : '';
    }else if((validPixelWidget(type) || isWidgetResolver(type)) || is_hyperscript){
      if(isWidgetResolver(type)){
        if (instance_Has_Widget(self, type.name) ){
          let widget=normalize_Widget(self, type.name);
          widget= isPFunction(widget) ? widget.bind(self.model) : isClass(widget) ? widget : Object.create(widget);//binding or creating a new object model
          if(!widget.name) widget.name=type.name
          if(type.$attributes) widget.$attributes=type.$attributes
          if(type.$children) widget.$children=type.$children;
          type=widget;
        }else{
          $Debug(`traverse macro was unable to find a widget with the provided name "${type.name}"\n\n are you sure this is a builtIn/globally registered widget`, self, true);
          return;
        }
      }
      const widget=CompilePatcher(self, type, type, px__VNode)
      px__VNode.is_mount_root=true;
      px__VNode.widget_instance=widget;
      if(widget.ownProperties.slot_name) px__VNode.slot_name=widget.ownProperties.slot_name;
      return widget && isPixelBuild(widget) ? widget.build.$element : '';
    }
  }
  function formatExpression(objKey, keys, expression){
    keys=new Set(keys)
    const keysRegex=/[a-zA-Z0-9_@#$.]+/g
    return expression.replace(keysRegex, (match, p2)=>{
      const matches=match.match(/[a-zA-Z0-9_@#$]+/)
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
  function escapeRegExp(string) { return string.replace(/[.!@#%_\,<>:;'"\-=*+?^${}()|[\]\\]/g, '\\$&'); }
  function resolveAccessor(self, vnode, node, px__VNode){
    let delimiters=self.core.settings.delimiters;
    if(delimiters){
      if(!hasSpecialCharacters(delimiters[0]) || !hasSpecialCharacters(delimiters[1]) ) $Debug(`mustache customization error::\n\n delimeters must match value of special characters\n\ne.g !, @, #, $, %, ^, &, *, (, ),  [, ], {, }, ;, :, ?`,  self, true); 
      else if(includesUnsupported(delimiters)) $Debug(`Invalid  delimiter value :: \n\n"$\{" cannot be used as a string mustache delimeter since this are javascript multiline string interpolation technic\n\n Delimeter Configuration failed`,self, true);
      
    }
    const open=hasSpecialCharacters(delimiters[0]) ? escapeRegExp(delimiters[0]) : delimiters[0];
    const close=hasSpecialCharacters(delimiters[1]) ? escapeRegExp(delimiters[1]) : delimiters[1];
    const pattern=new RegExp(`${open}(.*?)${close}`, 'g');
    let link;
    let str=node.textContent;
    if(str.match(pattern)) {
      str=str.replace(pattern, (match, text)=>{
        text=text.trim();
        link=text;
        const blocks=text.split('>>')
        text=_$runModelBind(self, blocks.pop(), px__VNode);
        text= isPrimitive(text) && !isNull(text) ? String(text) : '';
        if(len(blocks)) text=$Block_HelpersService(self,text, blocks, px__VNode);
        return isNull(text) ? '' : text;
      })
    }
    return str;
  }
  function _$runModelBind(self, ref, px__VNode, returnRef=false){
    let value;
    try{
      value=_Evaluate_THIS( self.model , ref, self, px__VNode?.LabContext) ;
    } catch(err){
        $Debug(`Accessor Error::\n\nvalue "${data}" property value was accessed during render, but not initialized on model or is undefined\n\nat at\n ..."${name} property \n\n${err}`, self, true);return;
        return null;
    }
    return value 
  }
  const hasBlockInstance=(self, name)=>_mapValue(BUILT_IN_BLOCKS, name) || _mapValue(self.register.blocks, name);
  const normalize_Block=(self, name)=>hasOwn(BUILT_IN_BLOCKS, name) ? BUILT_IN_BLOCKS[name] : self.register.blocks[name] || do_Nothing;
  const BUILT_IN_BLOCKS={
    upper(value, modifiers){
      return String(value).toUpperCase();
    },
    capitalize(value, modifiers){
      const splitted=String(value).split(' ');
      for(let [ind, val] of entries(splitted)){
        splitted[Number(ind)]=val.charAt(0).toUpperCase()+val.slice(1)
      }
      return splitted.join(' ');
    },
    lower(value,  modifiers){
      return String(value).toLowerCase();
    },
    
  }
  function $Block_HelpersService(self, value, blocks,px__VNode){
    const modifiers=blocks[0].split('|');
    blocks=modifiers.shift().split('.');
    if(!len(blocks)) return  value;
    for(const block of blocks.values()){
      if(!isEmptyStr(block) && !block.startsWith('%')){
        $Debug(`Failed Block helper call\n\n block names are recognised by prepending a single "percentage(%)" character to each block name`,self, true);
        return;
      }
      const name=block.trim().slice(1) || null;
      
      if( name && !hasBlockInstance(self, name)) {
        $Debug(`Unrecognized  block name "${name}"\n\n if this is a custom block, make sure it's registered through the local block option or global prototype method`,  self, true);
        return;
      }
      const blockCallback=normalize_Block(self, name);
      value=blockCallback(value, modifiers) || value;
    }
    return value
  }
  function _Compiler_Call(self, str, vnode, node){
    const pattern=/__\$ref\((.*?)\)__/g;
    let link;
    if(str.match(pattern)) {
      str=str.replace(pattern, (match, text)=>{
        text=text.trim();
        link=text;
        try{
          let name=text;
          text=_$runModelBind(self, text, vnode)||'';
        } catch(err){
          $Debug(`accessor Error\n\n "${text}" property was accessed on build, but not defined on build model\n\n ${err}`);return '';
        }
        text= isPrimitive(text) ? String(text) : '';
        if(isString(text) || text && vnode) {
          vnode.PATCH_FLAGS.add(link);
          if(node) node.PATCH_FLAGS.add(link);
        }
        return isNull(text) ? '' : text;
      })
    }
    return str;
  }
  const PixelDirectives="if,else,else-if,html,text,for,raw,ref,slot,model,px,bind,on,scoped";
  const widgetPassableDirectives="html,text,raw,scoped"
  const autoBindedDirectives="model,for,ref,bind,on"
  const NodeBasedDirectives="html,text,raw,model,scoped";
  const cond_Directives="if,else-if,else";
  const isPixelDirective=dir=>_mapValue(PixelDirectives, dir);
  const isNodeBaseDirective=dir=>_mapValue(NodeBasedDirectives, dir)
  function _Evaluate_THIS(obj, str, self, optional){
    // Check if the expression contains //semicolons
    if (str.includes(';')) {
      throw new Error('Invalid expression: \n\n";" not allowed\n Only single expressions are allowed.');return;
    }// Use a regular expression to match statements or multiple expressions
    const statementRegex = /^(?:let|var|const|if|for|while|do|switch).*$/;
    if (statementRegex.test(str)) {
      throw new Error('Invalid expression:\n\n Only single expressions are allowed and no statement.');
    }// Use a regular expression to remove comments from the expression by using string .replace regex method
    const commentRegex = /\/\/.*|\/\*[^]*?\*\//g;//comment matching regular expression
    const expressionWithoutComments = str.replace(commentRegex, '');// Use a regular expression to match any remaining unsupported constructs and statement keywords
    // const unsupportedRegex = /(?:\.\.|\/\/|\/\*|\*\*|\[=|==\+|-\+|\+=|\-=|\*=|\/=|%=\*\*=|&&=|\|\|=|<=|>=|\breturn\b|\bthrow\b|\bfunction\b|\bnew\b|\btypeof\b|\bdelete\b|\binstanceof\b|\bvoid\b|\bnull\b|\bundefined\b|\bconst\b|\blet\b|\bvar\bclass\b)/;
    const unsupportedRegex = /(?:\.\.|\breturn\b|\bthrow\b|\bfunction\b|\bnew\b|\bdelete\b|\bvoid\b|\bnull\b|\bundefined\b|\bconst\b|\blet\b|\bvar\bclass\b)/;
    if (unsupportedRegex.test(expressionWithoutComments)) {
      throw new Error(`Invalid expression: \n\nUnsupported constructs are not allowed.\n\n"${expressionWithoutComments}"`);
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
      $Debug(`error during the Compilation of template expresion \n???????\n"${str}`, self, true);
      $Debug(`${error}`);
    }
      return value;
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
    try{
      if(arr.includes(val)) do_Nothing();
      else arr.push(val);
    }catch(error){
      $Debug(error);
    }
    return arr;
  }
  function navigator_Array(str){
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
  function define_Object_Value(obj, str, item){
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
  function parse_Class_Binding(self, item, element){
    if(isPObject(item)){
      entries(item).forEach(([key, value])=>{
        if(value) element.className=`${element.className} ${key}`;
      })
    }else if(isArray(item)){
      for(const value of item.values()){
        if(isString(value)) {
          element.className=`${element.className} ${item}`;
        }else if(isPObject(value)){
          parse_Class_Binding(self, value, element);
        }else{
          $Debug(`Failed to create element class from bind array data`);
          return;
        }
        element.className=`${element.className} ${item}`;
      }
    }else if(isString(item)){
      element.className=`${element.className} ${item}`;
    }
  }
  function parse_Style_Binding(self, item, element){
    if(isPObject(item)){
      entries(item).forEach(([key, style])=>{
        if(!isString(style)){ $Debug(`Unrecognized stype property value \n\nat at\n "${key}" style property\n\n${element.outerHTML}`); return;}
        key=transpile_From_Hyphen(key)//support for hyphen included css style classess
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
  function directive_sep(key){
    return  key.includes(':') ? key.split(':') : [key]
  }
  function AttributeManager(props, element, self, px__VNode){
     if(!isPObject(props))return;
     const pattern=/__\$ref\((.*?)\)__/;
     const is_hyperscript= px__VNode ? px__VNode.is_hyperscript : false;
     entries(props).forEach(([key, attr ])=>{
      if(!is_hyperscript){
        key=__Attr_Name_Resolver(self, key, px__VNode);
        if(hasAsterisks_bind(key)) key='$$bind:'+key.slice(1);
        else if(hasAt_bind(key)) key='$$on:'+key.slice(1);
      }
      if(has$$_bind(key) && isPixelDirective(directive_sep(key)[0].slice(2)) &&  !is_hyperscript){
         element=__Resolve__Directives(self, key, attr, element, px__VNode)
      }else if(isHTMLIDLAttributes(key) && !isHTMLBooleanAttributes(key)){
        if(isEQ(key,'style')) parse_Style_Binding(self, attr, element);
        else element[key]=attr
      }else if(isHTMLBooleanAttributes(key)) boolAttrsParse(element, key, attr)
      else if(isEQ(key, 'class')) parse_Class_Binding(self, attr, element);
      else if(hasSpread_bind(key) && !is_hyperscript) return Attribute_Spread(self, { key:attr}, element,  px__VNode);
      else if(key.startsWith('on') && IS_VALID_EVENT_HANDLER(key.slice(2).toLowerCase())) element[key.toLowerCase()]=attr;
      else{
        try{ 
          element.setAttribute(key, attr||'');
        }catch(err){
          $Debug(`Athribute Error::\n\n...unable to set node attribute "${key}\n\n ${err}`);
          return element;
        }
      }
     })
     return element;
  }
  function boolAttrsParse(vnode, key, attr){
    if(!isEQ(attr, false)) {
      if (isHTMLIDLAttributes(key)) vnode[key]=attr;
      else vnode.setAttribute(key, attr||'');
    }
  }
  function Attribute_Spread(self, data, vnode, px__VNode){
    const { key }=data;
    let value=_$runModelBind(self, key, px__VNode);
    if(!isPObject(value)){
      $Debug(`spread syntax on px__VNode can only accept binded values of an object`);return vnode;
    }
    vnode = AttributeManager({ ['$$bind']:value }, vnode, self)
    return vnode;
  }
  function _With_Custom_Directives(self, data={}, vnode, px__VNode){
    const { key, attr } = data;
    let value=_$runModelBind(self, attr, px__VNode, true)
    let has_modifiers=false;
    let modifiers=key.includes('|') ? key.split('|') : null ;
    if(modifiers && len(modifiers)) has_modifiers=true;
    const Name= bool(has_modifiers) ? modifiers.shift() : key ;
    if( !hasOwn(self.register.directives, Name )){
      $Debug(
        `((Undefined Directives Reference))\n\n "${key}" directive is not a registered pixel directive on this widget\n\nat...........at>>>.\n ${vnode.outerHTML}`
        );return vnode;
    }
    const directive= self.register.directives[Name];
    let action =  isFunction(directive) ? directive :  null;
    if(!action || !isFunction(action)){
      if(isPObject(directive) && isTrue(!hasOwn(directive, 'created' ) && !hasOwn(directive, 'mounted') )) {
        $Debug(`((Directive Error))\n\ndirective object does not return an "created/mounted" method`); return vnode;
      }else if(!isPObject(directive) && !isFunction(directive)) {
        $Debug(`((Directive Error))\n\n directive value is not a function`); return vnode;
      }
    }
    const Obj_Modifier={};
    if(len(modifiers)){
      for(const val of modifiers.values()){
        define(Obj_Modifier, val, {value:val, enumerable})
      }
    }
    if(isPObject(directive)){
      if(hasOwn(directive, 'created')){
        if(!isFunction(directive['created'])){
          $Debug(`((Directive created hook))\n\n Custom directive created hook is not a function`); return vnode;
        }
        action= directive['created']
      }
    }
    action.call(self.model , vnode, {value}, Obj_Modifier);
    let mountedHook;
    if(isPObject(directive)){
      if(hasOwn(directive, 'mounted')){
        if(!isFunction(directive['mounted'])){
          $Debug(`((Directive mounted hook))\n\n Custom directive mounted hook is not a function`); return vnode;
        }
        mountedHook = directive['mounted'].bind( self.model );
        define( vnode, 'mountedDirectiveHook', { value :{ hook : mountedHook , self, modifiers:Obj_Modifier , value }});
      }
    }
    return vnode;
  }
  function _Run_With_Modifiers(vnode, modifiers, func, events, runImmediately=true){
    if(!isFunction(func)){
      $Debug(`"${key}" event Callback must be passed as  a function \n \n${func } is not a valid event callback  method`);return;}
    modifiers=new Set(modifiers);
    const options={}
    if(modifiers.has('once')) define(options, 'once', {value:true});
    if(modifiers.has('passive')) define(options, 'passive', {value:true});
    if(modifiers.has('nonpassive')) define(options, 'passive', {value:false});
    if(modifiers.has('capture')) define(options, 'capture', {value:true});
    function __With_Modifiers(event){
      if(modifiers.has('prevent')) event.preventDefault()
      if(modifiers.has('stop')) event.stopPropagation()
      if(modifiers.has('trusted')) func=event.isTrusted ? func : do_Nothing
      if(modifiers.has('self')){
        if(!vnode.isEqualNode(event.target)) return;
      }
      func(event)
    }
    if(!runImmediately)  return [ __With_Modifiers, options]
    if(!(IS_ELEMENT_NODE(vnode) && len(events))) return;
    for (let eventName of events.values()) vnode.addEventListener(eventName, __With_Modifiers, options);
  }
  function addMod(Callback, modifiers){
    if(!isFunction(Callback)){
      $Debug(`Callback argument passed  to addMod is not a function`);return do_Nothing
    }else if( modifiers && !isArray(modifiers)){
      $Debug(`Having a problem during tge call of the "addMod" method.\n\nPositional argument, :"Modifiers" must be of type "Array". `);
      modifiers=[];
    }
    const Data=_Run_With_Modifiers(null, modifiers, Callback,[], false);
    const func=Data[0];
    if(len(Data[1])) define(func, 'options', {value:Data[1], enumerable, configurable});
    return func;
  }
  function bind_directive_receiver(self, props, vnode, px__VNode){
    const { item, key }=props;
    let bra=_$runModelBind(self, item, px__VNode )
    if(isUndefined(bra)) bra='';
    if(!key){
      if (!isPObject(bra)) $Debug(`Directive attributes binding expects an objects `)
      else vnode=AttributeManager(bra, vnode, self, px__VNode)
    }else vnode=AttributeManager({ [key]:bra }, vnode, self, px__VNode );
    return vnode
  }
  function  bindKeyAsValue(keys, value){
    if(isEmptyStr(value) ||  !value){
      const sep=directive_sep(keys)
      const lastAttr=len(sep) ? sep.pop() : value;
      return has$$_bind(lastAttr) ? lastAttr.slice(2) : lastAttr
    }else return value;
  }
  function __Resolve__Directives(self, key, attr, vnode, px__VNode){
    let item =bindKeyAsValue(key, attr);
    let name=directive_sep(key)[0].slice(2);
    if(isEQ(name, 'bind')) {
      key=directive_sep(key);
      key.shift();
      if (isGT(len(key)),0) key=key.join(':')
      vnode=bind_directive_receiver(self,{key, item}, vnode, px__VNode)
    }else if(isEQ(name, 'html')){
      get_Object_Value(self.model, item, true)
      let value=_$runModelBind(self, item, px__VNode, true)
      if( isPrimitive(value)) vnode.innerHTML= value || '';
    }else if(isEQ(name, 'text')){
      get_Object_Value(self.model, item, true)
      let value=_$runModelBind(self, item, px__VNode, true)
      if( isPrimitive(value)) vnode.innerText= value || '';
    }else if(isEQ(name, 'ref')){
      try{
        get_Object_Value(self.model, item);
      }catch(err){
        $Debug(`value "${item}" property value was accessed during render, but not initialized on model or is undefined\n\nat at\n ..."${name} directive on ${vnode.localName} element`);return;
      }
      vnode.setAttribute('$$ref', value)
    }else if(isEQ(name, 'slot')){   
      get_Object_Value(self.model, item, true)
      let value=_$runModelBind(self, item, px__VNode, true)
      if(!isString(value)){
        $Debug(`value Error::\n\n slot name undefined or is not a string\n\n Error resolving slot  directive name reference on "${vnode.localName}"`);return;
      }
      px__VNode.slot_name=value;
    }else if(isEQ(name, 'model')){
      if(!Is_Form_Element(vnode)){
        $Debug(`Compilation Error::\n\n cannot bind a data model to  a none form element`);return;
      }
      let initVal='';
      try{
        initVal=get_Object_Value(self.model, item, true) || "";
      }catch(err){
        $Debug(`undefined reference for directive "$$model"\n\n "${item}" is not defined on widget model instance\n\n${err}`);
      }
      vnode.value=initVal;
      const eventName=get_Model_Event(vnode);
      if(eventName){
        vnode.addEventListener(eventName, function(){
          try{
            set_Object_Value(self.model, item , vnode.value );
          }catch(err){
            $Debug(`${err}`)
          }
        });
      }
     vnode.PATCH_FLAGS.add(item);
    }else if(isEQ(name, 'on')){
      if(isString(attr)){
        const signalsRegex=/^(@@)/g
        if(signalsRegex.test(attr)) attr=attr.replace(signalsRegex, (match, at)=>match='$signals.');
        try{
          attr=attr.split(' ').join('');
          attr=_$runModelBind(self, has_Object_Prop(self.model, attr) || has_Object_Prop(px__VNode.LabContext||{}, attr) ? attr.trim() : `()=>{${attr.trim()}}`, px__VNode);
        }catch(err){
          $Debug(`${err}`, self, true);
          return vnode;
        }
        if(!isFunction(attr)){
          $Debug(`"${name}" event must be wrapped as or in a function \n\non.....on...\n  "${vnode.localName}" element\n`);
        return vnode;
        }
      }
      const modifiers=key.split('|');
      const events=modifiers.shift().slice(5).split('.')
      if(len(modifiers)) _Run_With_Modifiers(vnode, modifiers, isFunction(attr) ? attr : do_Nothing, events);
      else {
        for(let event of events.values()) vnode.addEventListener(event, isFunction(attr) ? attr : do_Nothing);
      }
    }
    return vnode;
  }
  function get_Model_Event(vnode ){
    let event='input';
    if(IS_ELEMENT_NODE(vnode) && Is_Form_Element(vnode)){
      if(isEQ(vnode.localName, 'input')){
        event= _mapValue(['file'], vnode.type) ? 'change' : _mapValue(['button','submit','reset'], vnode.type) ? 'click' : _mapValue(['image','hidden']) ? null : 'input'
      }else if(isEQ(vnode.localName, 'form')) event='submit';
      else if(isEQ(vnode.localName, 'select')){
        
      }else event= 'change';
    }
    return event;
  }
  function El_Mounted_Directive_Hook(self, node){
    if(node.mountedDirectiveHook){
      new Promise((res, rej)=>{
        res(node.getRootNode()===document)
      }).then(()=>{
        const modifiers=node.mountedDirectiveHook.modifiers;
        const value=node.mountedDirectiveHook.value;
        node.mountedDirectiveHook.hook(node, { value } , modifiers );
      })
    }
  }
  function _renterNodeObjects(render, recursive=false){
    let response;
    if(isArray(render())){
      const NodeList=[];
      for(let build of render().values()){
        let data=_renterNodeObjects(()=>build, true);
        NodeList.push(data)
      }
      response=new PixelFragmentVNode(this, NodeList)
    }else if(isString(render())){
      response=new PixelTextVNode(this, render())
    }else if(isPObject(render)){
      const { type, props, children } = render()
      response=new PixelElementVNode(type, props, children, this)
    }
    if(recursive) return response
    return response ? returnRender(response) : null
  }
  function $scarfold(render){
    return _renterNodeObjects(render);
  }
  function el(type, propsOrChildren, childrenOrProps){
    let props;
    const lab=new  Set()
    if(isPObject(propsOrChildren)){ 
      props=propsOrChildren;
      lab.add('propsOrChildren')
    }else if(isPObject(childrenOrProps)){ 
      props=childrenOrProps;
      lab.add('childrenOrProps')
    }
    if( !lab.has('propsOrChildren') && isChildrenNode(propsOrChildren)) childrenOrProps=propsOrChildren;
    if(validPixelWidget(type)){
      if(isPObject(type)) type=Object.create(type);
      if(props) define(type, '$attributes', {value:props,enumerable});
      if(childrenOrProps) {
        define(type, '$children', {value:childrenOrProps,enumerable});
      }
    }
    return function render(self){ 
      return new PixelElementVNode(type, props, childrenOrProps, self ,true);
    }
  }
  class Widget {
    constructor(){}
    model=new Object()
    isClassBasedWidget=true;
  }
  class Build extends Widget{
    constructor(self){ super();
    }
    static BUILT_IN_WIDGET=true;
    params={ 
      self:{
        type:[Object, Function, String], 
        required:true
      }
    }
    build(params, { utils, attrs }){ 
      return ()=> el(params.self, attrs);
    }
  }
  class Fragment extends Widget{
    constructor(){ super(); }
    static BUILT_IN_WIDGET=true;
    build(){ return ()=> [el('slot')];}
  }
  class Transition extends Widget{
    constructor(){ super(); }
    params={ 
      onStart:{
        type:Function
      },
      onEnd:{
        type:Function
      }
      
    }
    build(){
      return  ()=> el('section', { class:'slide'},[el('slot')])
    }
    styleSheet=`
    .slide{
      background-color:#0a3039;
      transition-property:all;
      transition-duration:3s;
    }
    `
  }
  class Animation extends Widget{
    
    build(){
      return ()=> el()
    }
  }
  class Await extends Widget{
    
  }
  class Portal extends Widget{
    
  }
  const BUILT_IN_WIDGETS={ 'px-fragment':Fragment, Fragment, 'px-build':Build, Build, 'px-transition':Transition, Transition, 'px-animation':Animation, Animation, 'px-await':Await, Await, 'px-portal':Portal, Portal };
  function modelManager(opts,self){
    if(isNull(opts.model)) return;
    const modelData=isTrue(opts.isClassBasedWidget) ? opts.model : {} ;
    if(!opts.isClassBasedWidget) {
      try{
        opts.model.call(modelData, self.model.$params||{}, self.model.$attrs||{}) ;
      }catch(err){
        $Debug(`There is an error when running the model function\n\n${err}`,self, true);
      }
    }
    if(!isPObject(modelData)){ $Debug(`\nmodel method must return an object`);return;}
      entries(modelData).forEach(([key, value])=>{
        if(isPObject(value) && bool(value._data_flag) && hasOwn(value, 'data')) value=__Proxy_Setup(self, value, isObject(value.data) ? true : false);
        define(self.model, key, {value, enumerable, writable, configurable});
      });
    
  }
  function widgetsSetup(opts, self){
    if(!isNull(opts.widgets)){
      const validMameRegex=/^[_A-Z0-9\-]+/;
      const FirstCharRegext=/^[a-zA-Z_]+/
      entries(opts.widgets).forEach(([key, widget])=>{
        if(!FirstCharRegext.test(key.at(0)) && !validMameRegex.test(key)){
          $Debug(`Widget registration failed,\nImproper widget namecasing found at "${key}"\n\nwidget names must atleast start with an uppercase letter or a multi-word string seperated by a hyphen or an underscore and not start with hyphen or a number`);return;
        }
      })
      for(let [name, value] of entries(opts.widgets)){
        define(self.register.widgets, name, {value, enumerable})
      }
    }
  }
  function methodsManager(opts, self,){
    if(!opts.handlers) return;
    entries(opts.handlers).forEach(([ind, method])=>{
      if(!isPFunction(method)){
          $Debug(`widget method option's values must be a method or a function\n\n type of "${getType(method)}" found`);return;
      }
      define(self.register.handlers, ind, {value:method, enumerable, configurable})
    });
      assign(self.model, self.register.handlers);
  }
  function paramsManager(opts, self, ceElOp=false){
    const params= opts.params ;
    const props=isTrue(ceElOp) ? opts.props : opts.$attributes;
    if(params && !_validateType(params, [ Object, Array ])){
      $Debug(`Param option type validation failed, \n\n unexpected data type ${getType(params)}`);return;
    }
    if(opts.isFunctionalWidget){
      if(props && isPObject(props) && !params){
        define(self.model, '$attrs',{value:{}})
        entries(props).forEach(([ind, attr])=>{
          self.model.$attrs[ind]=attr;
        });
      }
    }
    let paramsSet;
    if(params && len(params)){
      if(self.is_Custom_Node){
        define(self, '$props',{value:{}, configurable, enumerable})
        paramsSet=self.$props;
      }else{
        define(self.model, '$params',{value:{}, enumerable, configurable, writable})
        define(self.model, '$attrs',{value:{}, enumerable, configurable})
        paramsSet=self.model.$params;
      }
      entries(params).forEach(([ind, param])=>{
        if(has$$_bind(ind)){
          $Debug(`Params validation error"${ind}" passed to widget as a pixel directive binding,\n\nthe "$$" may not be appended or used on a params identifier`);return;
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
              $Debug(`params validation error\n\nproperty validation for widget default value failed, property "${ind}" is of an invalid type\n\n typeof "${param.name}" required`);return;
            }
          }
        }else if(isArray(params) && isString(param)){
          if(props && _mapValue(props, param)){
            const value=!props[param] && !isBoolean(props[param]) ? '' : props[param];
            define(paramsSet, param, {value,enumerable, configurable});
          }else define(paramsSet, param, {value:'',enumerable, configurable});
        }
        if(isPObject(param)){
          if(isTrue(param.required) && hasOwn(param, 'default')){
            $Debug(`validation error  .......\n\nthe required validator should not be truthy alongside a default value\nat at\n\n"${ind}" params`);
            return;
          }else if(hasOwn(param, 'required') && !isBoolean(param.required)){
            $Debug(`The "required" validation options receives an unresolvable value \nat at \n"${ind}" params\n requires a boolean value`);return;
          }else if(!hasOwn(param, 'type')){
            $Debug(`The type valodator property is  required\n  Mising at "${ind}" param`);return;
          }else if(!_validateType(param.type,[Function, Array]) ){
            $Debug(`unexpected value passed to the type validator option`);return;
          }else if(hasOwn(param,'validator') && !_validateType(param.validator,  Function)){
            $Debug(`The "validator option must be a  function\n\nat ${ind} params`);return;
          }else if(params.required && !_mapValue(props || {}, ind)){
            $Debug(`Params validation error........\n\nrequired params is missing\n\nat at\n  .....${ind}`);
            define(paramsSet,ind,{value:'', enumerable, configurable, writable});
            return;
          }
          
          if(hasOwn(param, 'default') && !isNull(param.default)){
            const defaultValue=isFunction(param.default) ? param.default() : param.default;
            if(!_mapValue(props || {}, ind)){
              if(!_validateType(defaultValue, param.type)){
                  define(paramsSet,ind,{value:'', enumerable, configurable });
                  $Debug(`Params validation error .....\n\nproperty validation for widget default value failed, property "${ind}" is of an invalid type\n\n${ isArray(param.type) ? "Matches no type in the validation list" :  'typeof '+ param.type.name+" required"}`, self, true); return;
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
                $Debug(`params validator option method must return a Boolean value`);return;
              }
              if(isEQ(valRes, false)){
                $Debug(`Validation return false`);return ;
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
    const attributes=self.model.$attrs;
    entries(props||{}).forEach(([ind, value])=>{
      if(!hasOwn(paramsSet||{}, ind) && !isEQ(ind, '@@Events')){
        define(self.model.$attrs, ind, {value, configurable,enumerable, writable});
      }
    })
  }
  function $$consumeLifeCircleHooks(self, opts){
    const hooks="preBuild,PostBuild,preUpdate,onUpdated,preMount,onMounted,preDestroy,onDestroyed";
    for(let hook of hooks.split(',').values()){
      if(_mapValue(opts. hook)) do_Nothing;
      else if(!isFunction(opts[hook])){
        $Debug(`"${hook} Callback" hook must be a function \n\n type of "${getType(opts[name])}" found`);return;
      }else{
        define(self.operands._LIFECIRCLEHOOKS, hook, { values:opts[hook].bind(), enumerable, configurable } );
      }
    }
  }
  function _hydrate_$Attributes(opts, self, vnode){
    vnode=vnode();
    if( IsValidElement(vnode.$element) && IS_ELEMENT_NODE(vnode.$element)){
      if(self.core.settings.inheritAttrs) AttributeManager( self.model.$attrs, vnode.$element, self);
    }
    return  returnRender(vnode);
  }
  function setupClassBasedWidget(options, self){
    const widget=Object.create(new options());
    if(options.$attributes) widget.$attributes=options.$attributes;
    if(options.$children) widget.$children=options.$children;
    return widget;
  }
  function BasedWidgets(opts, self){
    if(isClass(opts)) return setupClassBasedWidget(opts, self);
    else if(isPFunction(opts)) return setupFunctionWidget(opts, self);
    return opts;
  }
  function sanitizedOptions(args, self){
    const argcount=args.length;
    if(!args){ $Debug('error loading widget\n\ntype for Vnode  function is not defined'); return; }else if(isGT(argcount,3)){$Debug(`_Pixel_Build function cannot accept more than 3 arguments,  "${ argcount }" received`);return;}
    let widget=  set_Widget_Flag(self);
    return widget;}
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
  function _preCompile_StyleSheet(opts, self, vnode){
    let CssStylesheet=self ? opts.styleSheet : opts.styles;
    if(CssStylesheet){
      const styleEl=createElementVNode('style', { type:'text/css'}, null);
      const id=Math.floor(Math.random()*(100000000 * 9999999999999) + 10000000);
      const selectorPattern = /([^\r\n{]+)\s*{/g;
      const ModifiedCssStylesheet=CssStylesheet.replace(selectorPattern, (match, text)=>{
        const hashData=`[data-px_hash_=${self.ownProperties.px_hash_}]`
          text=_hydrateHashToSelector(text, hashData);
          return text+'{';
        });
      styleEl.textContent=ModifiedCssStylesheet;
      if(vnode  && !IS_TEXT_NODE(vnode.$element)) vnode.$element.append(styleEl);
    }
    return returnRender(vnode);
  }
  
  function _$slotHydrationRenderer(self, opts, vnode){
    const slots=self.core.slots;
    if(!len(slots))  return vnode
    vnode=vnode()
    const slot_elements=vnode.$element.querySelectorAll('slot');
    const assynedSlots=new Set()
    for(let slot_el of slot_elements.values()){
      let slotN=slot_el.getAttribute('name');
      if(hasOwn(slots, slotN) && !isNull(slots[slotN]()) && !assynedSlots.has(slotN)){
        slot_el.replaceWith(slots[slotN]().$element);
        assynedSlots.add(slotN);
      }else if((!slotN || isEmptyStr(slotN)) && !assynedSlots.has('default') && hasOwn(slots, 'default')) slot_el.replaceWith(slots.default(self)?.$element);
    }
    if(!len(slot_elements) && IsValidElement(vnode.$element) && IS_ELEMENT_NODE(vnode.$element) && isEmptyStr(vnode.$element.innerHTML) && hasOwn(slots, 'default')){
      const inheritSlot=self.core.settings.inheritSlot;
      if(isTrue(inheritSlot)) {
        const slotContent=hasOwn(slots, 'default') ? slots.default() : null;
        if(slotContent) vnode.$element.append(slotContent.$element);
      }
    }
    return returnRender(vnode);
  }
  function installCD_(self, options){//custom directives installer
    if(hasOwn(options,'directives')){
      for(let [key, value] of entries(options.directives)){
        if(!_validateType(value, [ Object, Function])){
          $Debug(`a directive requires an object or a function`); return;
        }
        if(key.startsWith('$$')) key=key.slice(2);
        define(self.register.directives, key, {value, enumerable, configurable, writable});
      }
    }
  }
  const buildConfigOptions="inheritSlot,debug,isAsync,inheritAttrs,subAttrBinding,inAttrDelimiters,delimiters";
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
  const globalProps="blocks,widgets,directives,handlers";
  const exceptionsOptions="$children,$attributes,isClassBasedWidget,isFunctionalWidget";
  function Observer_Track(self, opts){
    if(opts.observers && !isPObject(opts.observers)){
      $Debug(`Data error\n\nobserver option must be an object`);return;
    }
    define(self.model, 'observers',{value: {}})//define the observers object
    entries(opts.observers||{}).forEach(([name, method])=>{
      if(!isFunction(method)){
        $Debug(`an observer handler must be a function value`);return;
      }else if(name.includes('.')){
        $Debug(`Observer issue::\n\n unsupported dot accessor\n\n, found at "${name}" observer handler`);return;
      }else if(!hasOwn(self.model, name) && !hasOwn(self.model.$data, name) ){
        $Debug(`observer undefined reference\n\n no such data as "${name}" define on this widget model instance`);return;
      }
      const path=get_Prop_Path(self.model, name)
       define(self.model.observers, name, {value:method, enumerable});
    })
  }
  function Observer_Depend(self, prop, data){
    if(!self.model.observers)   return;
    for(let [key, func] of entries(self.model.observers)){
      if(isEQ(key, prop)) {
        func=func.bind(self.model);
        func(data[0], data[1], key);
      }
    }
  }
  function Register_$Observer(self, opts){
    define(self.core.utils, '$observe', {value:DATA_OBSERVER.bind(self)});
  }
  function DATA_OBSERVER(prop, callback){
    if(!isFunction(prop) && !isString(prop) && !has_Object_Prop(this.model, prop)){
      $Debug(`proplem setting Observer_Track for ${prop}\n\n widget model instance has no such property`);return;
    };
    if(isString(prop) && bool(has_Object_Prop(this.model, prop) || has_Object_Prop(this.model.$data, prop))){
      define(this.operands._OBSERVERS, prop,{value:callback});
    }else if(true){
      
    }else{
      $Debug(`undefined property accessed in $observe macro`);
    }
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
    if(!options.signals && !options.$attributes ) return;
    define(self.model, '$signals', {value:self.operands._SIGNALS,enumerable, configurable, writable});
    const signals=new Set(options.signals)
    for(const  [ key, event] of entries(options?.$attributes['@@Events']||{})){
      if(signals.has(key)){
        self.model.$signals[key]=new Signal(key, event?.callback || do_Nothing, event?.options);
        delete options.$attributes['@@Events'][key]
      }
    }
    options.signals.forEach((signal)=>{
      if(!hasOwn(self.model.$signals, signal)){
        self.model.$signals[signal]=new Signal(signal, do_Nothing )
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
          $Debug(`Block must be a function \n\nat        at\n "${name}" block registration`);
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
    Observer_Track(self, options);
    Register_$Observer(self, options);
    installCD_(self, options);
  }
  function _generate_UUID(length) {
    const alpaNum ='A,a,B,b,C,c,D,d,E,e,F,f,G,g,H,h,I,i,J,j,K,k,L,l,M,m,N,n,O,o,P,p,Q,q,R,r,S,s,T,t,U,u,V,v,W,w,X,x,Y,y,Z,z,0,1,2,3,4,5,6,7,8,9,$';
    let letters=alpaNum.split(',');
    let id = '';
    let stack=[]
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
  function __Generate_Widget_Hash(self){
    let id=_generate_UUID(10);
    const hash=`_px_${id}`;
    define(self.ownProperties, 'px_hash_', {value:hash, configurable, enumerable});
  }
  function _Data_Hydrations(self, options){
    paramsManager(options, self);
    modelManager(options, self);
    define(self,'model',{value:__Proxy_Setup(self, self.model)});
    if(self.model.$attrs) define(self.model, '$attrs', {value:__Proxy_Setup(self, self.model.$attrs, true)})
    if(self.model.$params) define(self.model, '$params', {value:__Proxy_Setup(self, self.model.$params, true)});
  }
  const default_LifeCycleHooks=()=>Object.create({
    preBuild(){}, postBuild(){}, preMount(){}, onMounted(){}, preUpdate(){}, onUpdated(){}, preDestroy(){}, onDestroyed(){}
  })
  function createCordinateProps(self, opts){
    define(self, 'model',{value:{}, configurable, enumerable})
    define(self, 'ownProperties', {value:{ name:opts.name || 'UnknownWidget', slot_name:hasOwn(opts, '$attributes')  ? opts.$attributes['@@slotName'] : undefined }})
    if(has_Object_Prop(opts, '$attributes.@@slotName')) delete opts.$attributes['@@slotName'];
    define(self, 'register',{value:{ directives:{}, blocks:{}, widgets:{}, handlers:{}, agents:{}}, enumerable,  configurable})
    define(self,'operands',{value:{ _OBSERVERS:{}, _LIFECIRCLEHOOKS:default_LifeCycleHooks(), _SIGNALS:{} }, enumerable, writable, configurable});
    define(self, 'core',{value:{utils:{}, settings:Object.create(Global_Settings), slots:{}, map:{ is_hyperscript:false }}})
    define(self, '$globals',{value:{register:{ directives:{}, blocks:{}, widgets:{}, handlers:{}, agents:{}}, setupOptions:{}, $hanger:{}}})
  }
  function _induceSlotContents(self, options){
    if(!hasOwn(options, '$children')) return;
    const px__VNode=options.$children?.px__VNode;
    const is_hyperscript=px__VNode ? px__VNode.is_hyperscript : hasOwn(options, 'build');
    const slots=hasOwn(options.$children, 'NodeList') ? options.$children.NodeList : options.$children;
    const slottErr=(slotName, slotContent)=>{
      $Debug(`
      Problem when mapping slot element,\n\nMore than one vnode seems to be pointing to the  same slot name\nat at "${slotName}" slot Directive  of "${slotContent.$element.outerHTML} \nmaybe you should wrap them within a single template wrapper`);
      $Debug(`Note: unnamed contents will be automatically mapped  as "default" slot`);
    }
    if(!len(slots)) return;
    for(let slotContent of slots.values()){
      if(isPrimitive(slotContent)){
        slotContent=new PixelTextVNode(self, String(slotContent), px__VNode);
      }
      if(isPixelVNode(slotContent) || isRender(slotContent)){
        if(isRender(slotContent)) slotContent = slotContent(self);
        const slotName=slotContent.slot_name || 'default';
        if(isEQ(slotContent.$element.localName,'template')){
          slotContent=new PixelFragmentVNode(self, slotContent.NodeList)
        }
        if( !self.core.slots[slotName] ){
          self.core.slots[slotName]=returnRender(slotContent);
        }else if(isEQ(slotName, 'default')){
          slotContent=new PixelFragmentVNode(self, [ self.core.slots[slotName](self), slotContent]);
          self.core.slots[slotName]=returnRender(slotContent);
        }else{
          slottErr(slotName, slotContent);
          return;
        }
      }else if(isSlotInstance(slotContent)){
        for(let [name, slot] of entries(slotContent.slots)){
          if(!isChildrenNode(slot())){
            $Debug(`Unexpected "${getType(slot)}" data type passed to renderSlots  instance\n at   ... ^ "${name}" slot"\n\nexpecting a pixel valid  DOM value`,self, true);return;
          }
          if(isPrimitive(slot()) && !isNull(slot())) slot=returnRender(new PixelTextVNode(self, String(slot(self)), px__VNode))
          if( !hasOwn(self.core.slots, name)  ){
            self.core.slots[name]=returnRender(slot(self),);
          }else if(isEQ(name, 'default')){
            if(self.core.slots.default) slot=returnRender(new PixelFragmentVNode(self, [ self.core.slots[name](), slot(self)]));
            self.core.slots.default=returnRender(slot(self));
          }else{
            slottErr(name, slot);
            return;
          }
        }
      }
    }
    if(!is_hyperscript) return;
    if(options.slots && len(options.slots)){
      for(const sn of options.slots.values()){
        if(!_mapValue(self.core.slots, sn)){
          self.core.slots[sn]=returnRender(null);
        }
      }
      if(!_mapValue(self.core.slots, 'default') && !_mapValue(options.slots, 'default')){
          self.core.slots['default']=returnRender(null);
        }
    }
  }
  function _$instanciateModelProps(self ){
    const is_hyperscript=self.core.map.is_hyperscript;
    if(is_hyperscript && len(self.core.slots)){
      define(self.model, '$slots', {value:{}, enumerable, configurable});
      assign(self.model.$slots, self.core.slots);
    }
  }
  function _Pixel_Build(options){
    //options=sanitizedOptions(arguments, this);//sanitize received options
    createCordinateProps(this, options)
    _induceSlotContents(this, options);
    options=BasedWidgets(options, this);
    setConfig(options, this); 
    _Data_Hydrations(this, options)
    $construct_With_Signals(this, options)
    __Ensure_Renderer(this, options);
    __Generate_Widget_Hash(this)
    this.render=function(self, build){
      build=_$slotHydrationRenderer(self, options, build);
      build =  _hydrate_$Attributes(options, self, build);
      build=_preCompile_StyleSheet(options, self, build());
      
      
      return build();
    }
    if(isNull(options.build) && isNull(options.template))options.build=null;
    define(this, 'build', {value:options.build || options.template , writable, enumerable});
    resolve_Proto_Call(this, options);
  }
  function isRender(build){
    return isFunction(build) && isEQ(build.name,'render');
}
  function returnRender(build, self){
    if(isRender(build) ) build=build(self);
    return function render(self){ 
      return isArray(build) ? new PixelFragmentVNode(self, build) : build; }
  }
  function get_Init_Build(self, selector, build){
    if(isFunction(self.build)){
      self.build=self.build.bind(self.model);
      let res;
      try{
        res = self.build(self.model.$params||{},{signals:self.model.$signals || {},attrs:self.model.$attrs || {}, slots:self.model.$slots || {}, utils:self.core.utils});
      }catch(err){
        $Debug(`Error during the call of the build function`,self, true, DebugFlags.build);
        $Error(err);return;
      }
      if(!isFunction(res)){
        $Debug(`Error during the procession of the build function\n\nfailed to return a render function when returning the build method\n \n This may conflict with the processing of returnable DOM  nodes`, self, true, DebugFlags.build);return false
      }
      self.core.map.is_hyperscript=true;
      return returnRender(res(), self);
    }else if(isString(self.build)){
      return returnRender(_HTMLParser(self.build, self));
    }else if(isNull(self.build) && selector){
      return returnRender(_HTMLParser( _GenerateRoot(selector).innerHTML || '', self));
    }else return false;
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
  function _GenerateRoot(nodeSelector){
    if(isNull(nodeSelector)){$Debug(`no node model or selector value passed to widget mountroot`); return;}
    let domRoot;
    if(isString(nodeSelector)){
      domRoot=document.querySelector(nodeSelector);
      if(!IsValidElement(domRoot)){
        $Debug(`error mounting widget, target not a valid element`);
        return;}
    }else if(IsValidElement(nodeSelector) || nodeSelector.isPixel_Fragment){
      domRoot=nodeSelector;
    }
    return domRoot
  }
  function mergeRegisteries(self){
    entries(self.$globals.register).forEach(([name, value])=>{
      const localRegister=self.register[name];
      
      for(let [key, content] of entries(value)){
        if(!hasOwn(localRegister, key)){
          localRegister[key]=content
        }
      }
    })
  }
  _Pixel_Build.prototype.mount=mount;
  function mount(nodeSelector){
    this.hasMountProto=true;
    let domRoot=_GenerateRoot(nodeSelector);
    if(!bool(domRoot.isPixel_Fragment)) define(domRoot, 'NodeList',{value:[], configurable:true, writable:true});
    if(!domRoot.PATCH_FLAGS) define(domRoot, 'PATCH_FLAGS',{value:new Set(), configurable:true, writable:true});
    mergeRegisteries(this);
    _$instanciateModelProps(this)
    let initialBuild=get_Init_Build(this, nodeSelector);
    if(!initialBuild)return
    // _Proxy_Reactive_Dependency(this.model, (newV, oldV, ref)=>{
    //   const build=Render_Template(this, initialBuild);
    //   Eject_Hydration_Flag(this, build, domRoot, ref);
    //   //_Slot_Update_Run(this, build, ref);
    // }, this, true)
    // Hydrate_Reactive_Data(this, initialBuild, nodeSelector, domRoot);
    this.build=Render_Template(this, initialBuild);
    domRoot.innerHTML='';
    if(domRoot.IS_PIXEL_MOUNTROOT && IS_ELEMENT_NODE(domRoot)){
      $Debug(`A Pixel widget has already been mounted on this element, cannot mount more than one Wdget on a single root element`);return;
    }else{
      const MoutRootToken={
        IS_PIXEL_MOUNTROOT:true,
        __mountRootToken:'px__'+_generate_UUID(5),
      }
      domRoot.innerHTML='';
      if(isInDom(domRoot)) domRoot.append(this.build.$element || '');
      else domRoot=this.build.$element;
      if(domRoot.isPixel_Fragment && !domRoot.trigger_Effect_Run ) define(domRoot, 'trigger_Effect_Run', {value: Widget_Effect_Trigger.bind(this)})
      return this;
    }
  }
  _Pixel_Build.prototype.widget=widget;
  function widget(name, widget){
    if(!isString(name) || !validPixelWidget(widget)){$Debug(`unrecognised global widget registration for ${name} widget`);return this;}
    if(isEQ(len(new Set(arguments)),2)){
     define(this.$globals.register.widgets, name, {value:widget, enumerable, configurable});
    }
    this.protoPromisesCalls++;
    return this;
  }
  _Pixel_Build.prototype.install=install;
  function install(plugin, options){
    if(!isNull(plugin) && !isPObject(plugin)){ $Debug(`plugin installation Error::\n\n install argument must be an object value with  an exposed plugin installation method`);return this;}
    let usePlugin=plugin.plugin;
    if(usePlugin && isFunction(usePlugin) ){
      plugin.plugin(this, options);
    }
    this.protoPromisesCalls++
    return this;
  }
  _Pixel_Build.prototype.handler=handler;
  function handler(name, handler){
    if(!isString(name) && !isFunction(handler)){$Debug(`unrecognised global handler registration for ${handler}`);return this;}
    if(isEQ(len(arguments),2)){
      this.$globals.register.handlers[name]=handler
    }
    this.protoPromisesCalls++
    return this
  }
  _Pixel_Build.prototype.directive=directive;
  function directive(name, directive){
    if(!isString(name) && !isFunction(dir)){$Debug(`unrecognised global directives registration for ${directive}`);return this;}
    if(isEQ(len(arguments),2)){
      this.$globals.register.directives[name]=directive;
    }
    this.protoPromisesCalls++
    return this;
  }
  _Pixel_Build.prototype.block=block;
  function block(name, block){
    if(!isString(name) && !isFunction(block)){$Debug(`unrecognised global block helper registration for ${block}`);return this;}
    if(isEQ(len(arguments),2)){
      this.$globals.register.blocks[name]=func;
    }
  }
  const globalConfigMethods=`delimiters,debug,inheritAttrs,inheritSlot,isAsync,`
  _Pixel_Build.prototype.configDelimeters=configDelimeters;
  function configDelimeters(delimiters){
    
  }
  _Pixel_Build.prototype.configDebug=configDebug;
  function configDebug(debug){
    
  }
  _Pixel_Build.prototype.configInheritAttrs=configInheritAttrs;
  function configInheritAttrs(inheritAttrs){
    
  }
  _Pixel_Build.prototype.configIsAsync=configIsAsync;
  function configIsAsync(isAsync){
    
  }
  _Pixel_Build.prototype.configInheritSlot=configInheritSlot;
  function configInheritSlot(){
    
  }
  _Pixel_Build.prototype.legalize=legalize;
  function legalize(){
    
  }
  legalize.optionRegistry=function optionRegistry(name, type){
    
    
  }
  function Render_Template(self, initBuild, update=false){
    if(self.core.map.is_hyperscript) initBuild=initBuild(self);
    if(!isFunction(initBuild)) initBuild=returnRender(initBuild)
    return self.render(self, initBuild, update);
  }
  function __Proxy_Setup(self, obj, deep=false){
    let activeWatcher=null
    class Watcher {
      constructor(getter, callback) {
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
    self.Watcher=Watcher
    function Hydrate_Data_Proxy(obj, deep){
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
      function trackDependency(dependency) {
        if (activeWatcher) dependency.depend();//caall the depend
      }
      for(let [key, value] of Object.entries(obj)){
        if(bool(deep)){
          if(isPObject(value)) obj[key]=Hydrate_Data_Proxy(value);
        }
      }
      const dependency = new Dependency();
      return new Proxy(obj, {
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
        }
      })
    }
    return Hydrate_Data_Proxy(obj, deep)
  }

  function _Proxy_Reactive_Dependency(data, callback, self, deep=false){
    const watchers=[];
    let watch=(getter, callback)=>{
      const watcher = new self.Watcher( getter, callback);
      watchers.push(watcher);
      watcher.update();
    }
    const deployObserver=function(observe, dataObj={}){
      for(let key of Object.keys(dataObj) ){//object handler
        observe(()=>dataObj[key],(newV, oldV)=>{
          callback(newV, oldV, key);
        })
      }
    }
    if(bool(deep)){
      for(let [key, value] of entries(data)){
        if(isPObject(value)){
          _Proxy_Reactive_Dependency(value, callback, self, true)
        }
      }
    }
    deployObserver(watch, data);
  }
  const readOnlyModelProps="$element,$params,$attrs,$signals,$styles,$slots,config,$fall";
  const isReadOnlyProp=key=>_mapValue(readOnlyModelProp, key);
  function _Slot_Update_Run(self, build, ref){
    const slots=self.model.$slots;
    if(slots){
      for(const [name, slot] of entries(slots)){
        for (let bu of build.childNodes){
          
        }
      }
    }
  }
  function Node_Effect_Track(build, key, root, access, self){
    const newNode=IS_DOCUMENT_FRAGMENT_NODE(build) ? build.NodeList[key] : build;
    //this.target.attributes.isEqualNode(newNode.attributes)
    
    const data_ref=get_Prop_Path(this.self.model, access);//get the relative path of the reacted data key "access"'
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
          const data_ref=get_Prop_Path(self.model, access);
          if(node.PATCH_FLAGS.has(data_ref)){
            node.textContent=newNode.NodeList[ind].textContent; //update textContent in cases of test Node
          }
        }else if(IS_ELEMENT_NODE(node)){
          if( isGT(node.PATCH_FLAGS.size, 0)){
            let shouldUpdate=false;
            for( let refs of node.PATCH_FLAGS.values()){
              if(isEQ(refs, data_ref) ){
                shouldUpdate=true;
                break;
              }
            }
            if(bool(shouldUpdate)){
              node.trigger_Effect_Run(newNode, ind, node, access);
            }
          }
        }else if(IS_DOCUMENT_FRAGMENT_NODE(node) && node.IS_PIXEL_MOUNTROOT){
          node.trigger_Effect_Run(self, node, access);
        }else if(true){
          
        }else{
          do_Nothing();
        }
      }
    }
    if(IS_TEXT_NODE(this.target)) this.target.textContent=newNode.textContent;
    if(Is_Form_Element(this.target)) this.target.value=newNode.value;
    if(!this.target.isEqualNode(newNode)) this.target.innerHTML=newNode.innerHTML;
  }
  function Widget_Effect_Trigger(self, vnode, ind){
    const data_ref=get_Prop_Path(self.model, ind);
    for(const refs of vnode.PATCH_FLAGS.values()){
      if(isEQ(refs, data_ref)){
        const newValue=get_Object_Value(self.model, refs);
        let Owner_prop=vnode.Ref_Rag[refs];
        let Owner_path=get_Prop_Path(this.model, Owner_prop);
        set_Object_Value(this.model, Owner_path,  newValue );
      }
    }
  }
  function Eject_Hydration_Flag(self, build, root, ind, selector){
    let data_ref=get_Prop_Path(self.model, ind) ;
    entries(root.NodeList).forEach(([key, vnode])=>{
      if( isGT(vnode.PATCH_FLAGS ? vnode.PATCH_FLAGS.size : 0, 0)){
        let shouldUpdate=false;
        for( const refs of vnode.PATCH_FLAGS.values()){
          if(isEQ(refs, data_ref) ){
            shouldUpdate=true;
            break;
          }
        }
        if(bool(shouldUpdate)){
          if(IS_DOCUMENT_FRAGMENT_NODE(vnode)  && vnode.IS_PIXEL_MOUNTROOT){
            vnode.trigger_Effect_Run(self, vnode, ind);
          }else{
            vnode.trigger_Effect_Run(build, key, root, ind, self);
          }
        }
      }
    })
  }
  function data(value){
      let react={};
      define(react, '_data_flag',{value:true, enumerable,configurable});
      define(react, '$data',{value, enumerable, configurable, writable});
      return react;
  }
  function _initiateChildNodes(self, children,  px__VNode, element){
    const is_hyperscript=px__VNode.is_hyperscript;
    children=isRender(children) ? children(self, px__VNode) : children;
    if(isChildrenNode(children)){
      if(isPrimitive(children) && !isNull(children)){
        const node=new PixelTextVNode(self, String(children), px__VNode);
        element.append(node.$element);
        px__VNode.NodeList.add(node);
      }else if(isArray(children)){
        for(const child of children.values()){
          element=_initiateChildNodes(self, child, px__VNode,  element)
        }
      }else if(isPixelVNode(children) ){
        if(isPixelWidgetVNode(children)){
          element.append(children.$element);
        }else{
          element.append(children.$element);
          px__VNode.NodeList.add(children);
        }
      }
    }
    return element;
  }
  function widgetBindingReceiver(self, key, param, widget, px__VNode){
    let item=_$runModelBind(self, param, px__VNode)
    if(isUndefined(item)) item='';
    if( !key && !isPObject(item)){
      $Debug(`Trying  to bind directly to instance.\nstatus : failed,\nreason : value not an object`);return
    }else if(!key && isPObject(item)){
      consume_Widget_Props(self, widget, {props:item}, px__VNode);
    }else if(key){
      consume_Widget_Props(self,widget, {props:{[key]:item}, px__VNode})
    }
  }
  class maybeSignal{
    constructor(signal, func, options){
      this.signal=signal
      this.callback=func
      this.options=options
    }
    signal=undefined
    callback=undefined
    options=undefined
  }
  function Widget_Directive_Handler(self, widget, props, px__VNode){
    let name=Object.keys(props)[0];
    let key=directive_sep(name);
    let param=props[name] || "";
    param=bindKeyAsValue(name, param)
    name=directive_sep(name)[0].slice(2)
    key.shift()
    key=key.join(':')
    if(isEQ(name,'bind')){
       widgetBindingReceiver(self, key,param, widget, px__VNode)
    }else if(isEQ(name, 'on')){
      if(isString(param)){
        try{
          param=param.split(' ').join('');
          param=_$runModelBind(self, has_Object_Prop(self.model, param) || has_Object_Prop(px__VNode.LabContext||{}, attr) ? param.trim() : `()=>{${param}}`, px__VNode);
        }catch(err){
          throw new Error(err);
        }
        if(!isFunction(param)){$Debug(`"${name}" event must be wrapped as or in a function \n\non.....on...\n  \n`);
        return ;}
      }
      let modifiers=key.split('|');
      let events=key.split('|')[0].split('.');
      if(len(modifiers)) modifiers.shift()
      let opts;
      if(len(modifiers)) {
        const mode= _Run_With_Modifiers( null, modifiers, isFunction(param) ? param : do_Nothing, events, false);
        param=mode[0];
        opts=mode[1];
      }
      if(len(events)){
        define(widget.$attributes, '@@Events', { value:{}, configurable, enumerable});
        for( let [ ind, ev ] of events.entries()){
          define(widget.$attributes['@@Events'], ev,{ value: new maybeSignal(ev, param, opts) , enumerable, configurable});
        }
      }
    }else if(isEQ(name, 'slot')){
      let bra=_$runModelBind(self, param, px__VNode, true)
      if(!isString(bra)){
        $Debug(`value Error::\n\n slot name undefined or is not a string\n\n Error resolving slot  directive name reference on "<${self.ownProperties.name}>"`);return;
      }
      
      widget.$attributes['@@slotName']=bra;
    }else if(true){
      
    }
  }
  function ResolveWidget(self, px__VNode, value, ){
    if(!instance_Has_Widget(self,value.type)){
      $Debug(`Template Compilation Error::\n\nUnresolved tagname "${value.type}"\n\n   ...if this is a pixel widget, make sure its registered through the "widgets" option or resolved through the custom nodemake resolver`,self, true);
      return false;
    }
    let instance;
    if (instance_Has_Widget(self, value.type) ){
      let widget=normalize_Widget(self, value.type);
      widget= isFunction(widget) && !isClass(widget) ? widget.bind(self.model) : isClass(widget) ? widget : Object.create(widget);//binding or creating a new object model
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
    widget=  set_Widget_Flag(self, widget, value, px__VNode);//setting the widget flag
    let child=new _Pixel_Build(widget);//build the widget
    if(self){
      for(const [key, value] of entries(self.$globals.register)){
        entries(value).forEach(([name, data])=>{
          if(isEQ(key, 'widgets')) child=child.widget(name, data);//in the root, uses the build.widget prototype to define global widgets
          else if(isEQ(key, 'blocks')) child=child.block(name, data);//in the root, uses the build.widget prototype to define global properties
          else if(isEQ(key, 'directives')) child=child.directive(name, data);//in the root, uses the build.widget prototype to define global directive
          else if(isEQ(key, 'handlers')) child=child.handler(name, data);//in the root8, uses the build.widget prototype to define global handlers
          else if(isEQ(key, 'hangers')) child=child.hang(name, data);//in the root8, uses the build.widget prototype to define global hangers
        })
      }
    }
    child=child.mount(_createFragment());//mounts the build to a pixel fragment
    
    return child;
  }
  function set_Widget_Flag(self, widget, val, px__VNode){
    if(val.children && isGT(len(val.children), 0) ){
      const Flag={ NodeList:val.children, patchFlags:self, px__VNode }
        widget.$children=Flag;
      }
    return widget;
  }
  function consume_Widget_Props(self, widget, value , px__VNode){
    entries(value.props).forEach(([ind, param])=>{
      let name=__Attr_Name_Resolver(self, ind, px__VNode);
      if(hasAsterisks_bind(name)) name='$$bind:'+name.slice(1);
      else if(hasAt_bind(name)) name='$$on:'+name.slice(1);
      if(has$$_bind(name) && isPixelDirective(directive_sep(name)[0].slice(2))) Widget_Directive_Handler(self, widget, {[name]:param}, px__VNode)
      else if(hasSpread_bind(ind)) Manage_Widget_Spread(self, widget, { name})
      else widget.$attributes[name]=param;
    });
  }
  function Manage_Widget_Spread(self, widget, props, px__VNode){
    const { key:data } = props;
    let item=_$runModelBind(self, data, px__VNode)
    consume_Widget_Props(self, widget, { props:item}, px__VNode);
  }
  function _createFragment(){
    const fragment=new DocumentFragment();
    define(fragment, 'isPixel_Fragment',{value:true});
    define(fragment, 'NodeList',{value:[], configurable:true, writable:true});
    define(fragment, 'PATCH_FLAGS',{value:new Set(), configurable:true, writable:true});
    return fragment;
  }
  function _$compiler_engine_hydrator(){
    global=new Pixel();
  }
  const devInfo='You are using the development version of pixel '+get_version().slice(6)+', make sure you switched to the minified build version when deploying to production with the (*.min.js) file extension';//development information
  function setupFunctionWidget(opts, self){
    const widget={};
    widget.build=opts;
    if(opts.$attributes)widget.$attributes=opts.$attributes;
    if(opts.$children) widget.$children=opts.$children;
    return widget;
  }
  class _WidgetResolver{
    constructor(name){
      if(!isString(name)){
        $Debug(`name positional argument must be a string type matching a local/globaly registered widget data`,{},true);return;
      }
      this.name=name || undefined;
    }
    name=undefined
  }
  function traverse(name){
    return new _WidgetResolver(name)
  }
  function resolveDirective(name){
    
  }
  function withDirectives(props, dirs){
    
  }
  function $Entity_Decoder(str){
    str=str.replace(/&/g, '&amp;')     
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')     
      .replace(/\\/g, '&#39;');  
    return str;
  }
  function _HTMLParser(html, self, parent, px__VNode){
    if(!html) return null;
    const selfClosedTagsRegex=/<([a-zA-Z0-9\-\_:$]*)(\s[^>]*)?\/>/gs;
    const selfClosedTagRegex=/<([a-zA-Z0-9\-\_:$]*)(\s[^>]*?)?\/>/s;
    const openingTagsRegex=/<([a-zA-Z0-9\-\$_:]*)(\s[^>]*?)?[\/]?>/g;
    const closingTagsRegex=/<[\/]([a-zA-Z1-6]+)[ ]*>/g;
    const attributesRegex=/([^=\s]*)\s*?=\s*?(?:(["'])(.*?)\2|([^"'\s>]+))/g;
    const attrRegex=/([^=\s]*)\s*?=\s*?(?:(["'])(.*?)\2|([^"'\s>]+))/;
    html=html.replace(openingTagsRegex, (match, tag, props)=>{
      if(hasUpperCase(tag)){
        const nodeSpace=`$px-nodespace=${tag}`;
        props=!isNull(props) ? `${props} ${nodeSpace}` : nodeSpace;
      }else if(IsDomparserTag(tag)) tag=`px$$--${tag}-$px`;
      if(props){
        props=props.replace(attributesRegex,(mch, attr, sip, val, fall)=>{
          val=val || fall || '';
          if(hasUpperCase(attr)) attr=`${attr}-$px`;
          return `${attr}="${val}"`;
        })
        let attrsMatch=props.match(attributesRegex);
        for (let attr of attrsMatch || []){
          const attrMatch=attr.match(attrRegex);
          const attrName=attrMatch[1];
          if(hasUpperCase(attrName)){
            const fallbackAttr=`$px-${attrName.toLowerCase()}=${attrName}`;
            props=`${props || ''} ${fallbackAttr}`;
          }
        }
      }
      const selfClosedTagMatch=match.match(selfClosedTagRegex);
      match=`<${tag} ${props || ''} ${ selfClosedTagMatch ? '/>' : '>'}`;
      return match;
    })
    html=html.replace(selfClosedTagsRegex, (match, tag)=>{
      const closingSlashIndex=match.lastIndexOf('/');
      match=match.slice(0, closingSlashIndex);
      if(IS_HTML_VOID_TAG(tag)) return `${match}>`;
      return `${match}></${tag}>`;
    });
    const hashedTagged=tag=>(tag.startsWith('px$$--') && tag.endsWith('-$px'));
    html=html.replace(closingTagsRegex, (match, tag)=> IsDomparserTag(tag) ? `</px$$--${tag}-$px>` : `</${tag}>`
    );
    const parser=new DOMParser().parseFromString(html,'text/html').body;
    const NodeList=[];
    for (let node of parser.childNodes){
      if(node ){
        if(IS_TEXT_NODE(node)){
          if(node.textContent.trim()){
            node=self ? new PixelTextVNode(self, node.textContent,  px__VNode) : node.textContent;
            NodeList.push(node)
          }
        }else if(IS_COMMENT_NODE(node))/*Ignore comment nodes*/do_Nothing();
        else if(isCustomVNode(node) && self){
          NodeList.push(node)
        }else if(IS_ELEMENT_NODE(node)){
          let tagName=node.localName;
          if(hashedTagged(tagName)) tagName= tagName.slice(6,-4);
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
            if(hasOwn(attributes||{}, '$$raw')) define(attributes, '$$rawChildrenData$$',{value:$Entity_Decoder(node.innerHTML), enumerable, configurable});
            const children=function render(self, px__VNode){
              return IS_VALID_TAGNAME(tagName) ? _HTMLParser(node.innerHTML, self, true, px__VNode ) : node.innerHTML;
            }
            let props=len(attributes) ? attributes : null;
            Vnode=new PixelElementVNode(tagName, props, children, self, false, px__VNode?.LabContext, NodeList);
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
    else {
      return isGT(len(NodeList),1) ? NodeList : isEQ(len(NodeList),1) ? NodeList[0] : null ;
    }
  }
  function _getNodeListResponse(NodeList, parent){
    if(parent && len(NodeList)) return isGT(len(NodeList),1) ? NodeList : NodeList[0];
    else if(len(NodeList)) return isGT(len(NodeList),1) ?  new PixelFragmentVNode(self, NodeList) : NodeList[0] ;
    else return null ;
  }
  function markup(html){ 
    if(!isString(html)){
      $Debug(`markup helper expects strings values`);  return null
    }
    return _HTMLParser(html, null);}
  function html( strings, ...values){
    const html = strings.reduce(( acc, str, i) => {
      const value = !isNull( values[i]) ? values[i] : '';
      return acc + str + value;
    }, ''); return _HTMLParser( html, this);
  };
  function markdown(mkd){
    if(!isString(mkd)){
      $Debug(`markdown helper expects strings values`);  return null
    }
    
  }
  function NodeMake(opts, options){
    this.is_Custom_Node=true;
    if(!isPObject(opts)){$Debug(`NodeMake option values must be type of object......>>>>`);return;}else if(isGT(arguments.length, 1)){$Debug(`NodeMake parameter values required only 1 argument.....\n\n${arguments.length} given>>>>>>>>>>>`);return;}
    const isValidNodeMakeopts=opt=>_mapValue("template,styles,plugin,name,params,onConnected,onDisconnected,onAdopted,onAttrChanged",opt);
    entries(opts).forEach(([key, value])=>{
      if(!isValidNodeMakeopts(key)){$Debug(`invalid option value....\n\n "${key}" is not a recognised NodeMake option `);return;}
      if(isEQ(key, 'styles') && !isString(value)){$Debug(`styleSheet for custom elements must be of type "Strings of css styleSheets"`);return;}
      if(isEQ(key,'params')){
        if(!isPObject(opts.params)){$Debug(`params value for Custom Node must be of type "object"\n\n typeof "${getType(opts.params)}" found`);return;}
      }
    });
    if(!isNull(opts.params))paramsManager(opts, this)
    if(isNull(opts.template)){$Debug(`Custom element required a template option`);return;}else if(!isString(opts.template)){ $Debug(`string value required at the node make template option`);return;}
    if(isNull(opts.name)){$Debug('Custom node does not have a name option\n\nname required for node registration....');return;
    }else if(!isString(opts.name)){$Debug(`unrecovered  value type\nNodeMake name option required value of type "Strings"\n\n"${getType(opts.name)}" found`);return;
    } else if(IS_VALID_TAGNAME(opts.name)){$Debug(`"${opts.name}" is an Html tag name .....\n\nshould not be used in Custom nodes`);return;
    }else if(IS_HTML_DEPRECATED_TAG(opts.name)){$Debug(`an Html depreciated element tagname, \n\nshould not be used for CUSTOM_NODES`);return;
    }else if(!opts.name.includes('-')){$Debug(`Due to inDom tag passing caveats ,Custom Nodes are termed to be named differently by using lowercases, multiwords saperated by the hyphen or underscore characters\n\n Node with name "${opts.name}" is invalid.......`);return;}
    if(!isNull(opts.plugins)){
      if(isFunction(opts.plugins))opts.plugins();
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
        if(isEQ('onConnected',ind)) define(Hooks, 'connectedCallback',{value, configurable:true});
        if(isEQ('onDisconnected',ind)) define(Hooks, 'disConnectedCallback',{value, configurable:true});
        if(isEQ('onAdopted',ind)) define(Hooks, 'adoptedCallback',{value, configurable:true});
        if(isEQ('onAttrChanged',ind)) define(Hooks, 'attributeChangedCallback',{value, configurable:true});
      } 
    })
    const pluginThis={
      name:opts.name,
    }
    class Pixel_NodeMake_Element extends HTMLElement{
      constructor(){
        super();
        const shadow=this.attachShadow({ mode: 'open'})
        const template=compileTemplate(TemplateParser(opts.template, this), this, null);
        $Data_Hash(opts, null, template);
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
    useState=bool(useState);
    customElements.define(this.name, this.element);
  }
  async function AsyncWidget(opts){
    opts=await defineWidget(opts)
    opts.isAsync=true;
    options= opts;
    return await options;
  }
  function do_Nothing(){}
  function defineWidget(opts){
    if(isPrimitive(opts) || isArray(opts)){
      $Debug(`Value Error\n\n invalid value for the defineWidget macro\n/... at /././. at`);return;
    }else if(isGT(arguments.length, 1)){
      $Debug(`Parameter Error\n\nmax-one argument required\n ${arguments.length} given`);return;
    }else if(isPObject(opts) || isFunction(opts)) return opts;
  }
  function processPIXELFile(Source) {
    const body=createElementVNode('body');
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
    return el(options.type, options.props, options.children);
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
  for(const [name, callback] of entries(Object.create(new _PixelHttpRequestModule()))) Request[name]=callback
  function resolveHooks(xhr, opts){
  
  }
  _$compiler_engine_hydrator()
  
  global._PixelHttpRequestModule=_PixelHttpRequestModule
  global._renterNodeObjects=_renterNodeObjects;
  global.importWidget=importWidget;
  global.defineElement=defineElement;
  global.get_version=get_version;//dev
  global.el=el;
  global._Evaluate_THIS=_Evaluate_THIS;
  global.None=None;
  global.renderSlots=renderSlots;
  global.pixelCompilerEngineSettings=pixelCompilerEngineSettings;
  global._mapValue=_mapValue
  global.initBuild=initBuild;
  global.addMod=addMod;
  global._initiateChildNodes=_initiateChildNodes;
  global._$runModelBind=_$runModelBind;
  global.Await=Await;
  global._Run_With_Modifiers=_Run_With_Modifiers
  global.initSSRBuild=initSSRBuild;
  global.log=log;//dev
  global.Portal=Portal;
  global.renderFor=renderFor;
  global.Build=Build;
  global.Transition=Transition;
  global.AsyncWidget=AsyncWidget;
  global.markup=markup;
  global.Animation=Animation;
  global.markdown=markdown;
  global._validateType=_validateType
  global.Any=Any;
  global._getNodeListResponse=_getNodeListResponse;
  global._generate_UUID=_generate_UUID;
  global.Type=Type;
  global.defineWidget=defineWidget;
  global.html=html;
  global.withDirectives=withDirectives;
  global.traverse=traverse;
  global.resolveDirective=resolveDirective;
  global.createElementVNode=createElementVNode;
  global.Widget=Widget;
  global._HTMLParser=_HTMLParser;
  global._EvalWith=_EvalWith;
  global.data=data;
  global._createNativeElement=_createNativeElement;
  global.Request=Request
  global._createWidgetElement=_createWidgetElement;
  global._createTextElement=_createTextElement;
  global.NodeMake=NodeMake;
  global._createFragment=_createFragment;//dev
  global.$Debug=$Debug;//dev
  global.Fragment=Fragment;
  global._GenerateRoot=_GenerateRoot;
  console.info(devInfo);//dev
  return global;
})(({}));
