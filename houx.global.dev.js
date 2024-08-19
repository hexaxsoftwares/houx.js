  /**
   * Prince Godswill *
  *@param This project, 'HOUX', is been sponsored by the HEXAX SOFTWARES FOUNDATION.
  *@param Visit 'www.houx.com/guide' for for more information on the houx project , documentation and houx's development process roadmap.
  *@param This is a web JIT development version of Houx
  *@param We at the core team of Houx project are determined on developing and improving Houx.js features and perfomance issues, we only need your support to help and encourage us on maintaing this template engine.
  *@param Thanks for choosing Houx
  */
const Houx=(function(global){
  "use strict"
  const log=console.log;
  const version = "0.1.12";
  const get_version=()=>'houx-'+version;//houx at it's earliest version
  const isEQ=(arg1, arg2)=>arg1===arg2;//checks if arg1 is equal to arg2
  const isArray=Array.isArray;
  const toString=Object.prototype.toString;
  const _toStringCall=txt=>toString.call(txt);
  const isDate=date=>isEQ(_toStringCall(date), '[object Date]');
  const isSet=val=>isEQ(_toStringCall(val),'[object Set]');
  const isMap=map=>isEQ(_toStringCall(map), '[object Map]');
  const toStringType=(value)=>_toStringCall(value).slice(8, -1).toLowerCase();
  const isString=str=>isEQ(getType(str),'string');
  const isNull=arg=>arg==null;
  const isUndefined=arg=>isEQ(_toStringCall(arg), '[object Undefined]')
  const isObject=obj=>isEQ(getType(obj), 'object');
  const isPObject=obj=>isEQ(_toStringCall(obj),'[object Object]');
  const isPrimitive=val=>_validateType(val, [ String, Number, Symbol, Boolean, Date ]) || isNull(val);
  const hasOwn=Object.hasOwn, assign=Object.assign, entries=Object.entries, keys=Object.keys, values=Object.values;
  const preventX=Object.preventExtensions;
  // function define(object, propKey, value){
  //   return Object.defineProperty(object, propKey, { enumerable, configurable, value });
  // }
  const define=Object.defineProperty, isEqualValue=Object.is;
  const hasProp=(obj, prop)=> prop  in obj;
  function _mapValue(obj, arg){
    return isString(obj) ? new Set(obj.split(',')).has(arg) : _validateType(arg, [Set, Tuple, Map ]) ? obj.has(arg) : isPObject(obj) ? hasProp(obj, arg) : isArray(obj) ? obj.includes(arg) :  false;
  }
  const variableDeclarationRegex=/([\s\S]+[^=]*)[ ]*=[ ]*([\s\S]+)/m;
  const invalidIdentifierCharRegex=/[='"!@#%^&*()+\-\[\]{};:\\|,.<\/? ]/;
  const isValidIdentifier=variable => isString(variable) && variable.at(0).match(/[a-zA-Z_$]/) && !variable.match(invalidIdentifierCharRegex);
  const constBlockContext="if_Block,for_Block,slots_Block,children_Block";
  const isValidCtxType=type=>_mapValue(constBlockContext, type);
  const isFunction=func=>isEQ(getType(func),'function');
  const isPFunction=func=>isFunction(func) && !isClass(func);
  const isNumber=num=>isEQ(getType(num),'number');
  const isBoolean=bool=>isEQ(getType(bool), 'boolean');
  const bool=Boolean;
  const defProps=Object.defineProperties;
  const isSymbol=sym=>isEQ(_toStringCall(sym), '[object Symbol]') 
  const isChar=char=>isString(char) || isSymbol(char);
  const isPromise=prom=> isEQ(_toStringCall(prom), '[object Promise]') && isFunction(prom.then) && isFunction(prom.catch);
  const isGT=(val, arg)=>val>arg;//checks if val is greater than arg
  const isLT=(val, arg)=>val<arg;//checks if val is less than arg
  const isGTE=(val, arg)=>val>=arg;//checks if val is greater than or equal to args
  const nullObj=()=> Object.create(null);
  const isTrue=compute=>isEQ(compute, true);
  const isFalse=compute=>isEQ(compute, false);
  const isLTE=(val, arg)=>val<=arg;
  const $warner=`<<** Houx $Debug **>>.....>>>>>>>`;
  const characters=/\!\"\#\%\&\'\(\)\*\+\,\.\/\;\<\=\>\@\[\\\]\^\`\{\|\}\~ /
  function $Debug(msg,self, dictateW=false, txt=''){
    let shouldlog=true
    if(isHouxBuild(self)) shouldlog=self[$$$core].settings.debug && !self[$$$operands].initialized
    if(shouldlog ) {
      if(dictateW) console.warn(`${$warner}\n\nEncountered a problem ${txt} \n\n at  at  \n <${self && isHouxBuild(self) ? self[$$$ownProperties].name : 'UnknownWidget' }> widget`);//houx warming debugger
      console.error(`${$warner}\n\n${msg}`);//houx warming debugger
      $warn(msg.stack ? msg.stack : msg, self)
    }
  }
  function $warn(msg, self){
    let shouldlog=true
    if(isHouxBuild(self)) shouldlog=self[$$$core].settings.debug;
    if(shouldlog) console.warn(`${$warner}\n\n${msg}`);//houx warming debugger
  }
  const isIterator=iterator=>iterator && !isArray(iterator) && isPFunction(iterator[Symbol.iterator]);
  const isIterable=iterable=>(_validateType(iterable, [Object,Array,Set,Map,Tuple]) || isIterator(iterable)) && !isString(iterable);
  const enumerable =true, configurable =true, writable = true ;
  const isEmptyStr=str=>isEQ(str,"");
  const $Error=(msg,self)=>{
    let shouldlog=true
    if(self) shouldlog=self[$$$compiler].config.debug
    if(isTrue(shouldlog)) console.error(`${$warner}\n\n ${msg}`);//houx warming debugger
  }
  const blockTagRegex=/^(::[\w_]+)/;
  const isBlockTag=tagName=>blockTagRegex.test(tagName);
  const hasHyphen_bind=key=>/^\-\-[\w\-|[\]]+/.test(key);
  const hasAt_bind=key=>/^@[\w\-|[\]]+/.test(key);
  const has$$_bind=key=>/^\$\$[\w\-|[\]]+/.test(key);
  const hasDir_bind=key=>/^dir\-\-[\w\-|[\]]+/.test(key)
  const hasSpread_bind=( key , useAccessor=false )=> ( useAccessor ? /^\.\.\.[\w$.]+/ : /^\.\.\.[\w$]+/ ).test(key);
  const exists=value=> value || isNumber(value) ? true : false ;
  const hasAsterisks_bind=key=>/^\*[\w\-|[\]]+/.test(key)
  const widgetOptionType={ 
    build:Function, 
    model:Function, 
    widgets:Object, 
    preBuild:Function, 
    postBuild:Function, 
    preMount:Function, 
    postMount:Function, 
    preUpdate:Function, 
    postUpdate:Function, 
    postDestroy:Function, 
    preDestroy:Function, 
    handlers:Object, 
    params:[Array, Object], 
    buildConfig:Object, 
    styleSheet:String, 
    directives:Object, 
    template:String, 
    name:String, 
    observers:Object, 
    templateSrc:String, 
    styleSheetSrc:String, 
    filters:Object, 
    blocks:Object,
    signals:Array, 
    publish:Function, 
    transform:[Array, Object], 
    slots:Array, 
    markdownSrc:String, 
    markdown:String,
    fallThrough:Function,
    computedRefs:Object,
    mixins:Array,
    onTracked:Function,
    onEffect:Function,
    onCatch:Function
  }
  const validWidgetOptions=keys(widgetOptionType).join(',');//valid widget options---
  const plainFunctionOptions="model,preBuild,postBuild,preMount,postMount,preUpdate,postUpdate,postDestroy,preDestroy,publish,fallThrough,onEffect,onTracked,onCatch";
  const nonAFuncMethod=fnName=> _mapValue(plainFunctionOptions, fnName);
  const nodeJSOnlyOption="markdownSrc,styleSheetSrc,templateSrc";
  const isNodeJSOnlyOption=opt=>_mapValue(nodeJSOnlyOption, opt);
  const primaryKeyOptions="build,styleSheetSrc,styleSheet,templateSrc,template,name,markdownSrc,markdown,fallThrough";
  const isPrimaryKeyOption=opt=>_mapValue(opt, primaryKeyOptions);
  const isArgument=arg=>isEQ(_toStringCall(arg), "[object Arguments]");
  function len(obj){
    return _validateType(obj, [ String , Array ] ) || isArgument(obj) ? obj.length : isRef(obj) ? len(refUnwrap(obj)) : _validateType(obj, [ Set, Map, Tuple ]) ? obj.size : isObject(obj) ? keys(obj).length : isNumber(obj) ? obj : -1 ;
  }
  const isValidWidgetOption=opts=>_mapValue(validWidgetOptions, opts);//checks if an option is a vslid Houx widget option
  const HTML_TAGS="html,head,style,title,body,address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,main,nav,section,blockquote,dd,div,dl,dt,figcaption,figure,li,menu,ol,p,pre,ul,a,abbr,b,bdi,bdo,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,ruby,s,samp,small,span,strong,sub,sup,time,u,var,audio,map,video,iframe,object,picture,portal,svg,math,canvas,noscript,script,del,ins,caption,col,colgroup,table,tbody,td,tfoot,th,thead,tr,datalist,fieldset,form,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,summary,button,template,slot,base,link,meta,hr,br,wbr,area,img,track,embed,source,input,template,slot" ;//All html valid tags supported by the Houx framework
  const IS_HTML_TAG=txt=>_mapValue(HTML_TAGS, txt);
  const WEB_COMPONENTS="template,slot";//Web components tags , also supported by the Houx framework
  const HTML_FORM_ELEMENTS="select,textarea,input,form,progress,meter,option";
  const Is_Form_Element=element=>IS_ELEMENT_NODE(element) && _mapValue(HTML_FORM_ELEMENTS, element.localName);
  const IS_WEB_COMPONENT=txt=>_mapValue(WEB_COMPONENTS, txt);
  const HTML_VOID_TAGS="base,link,meta,hr,br,wbr,area,img,track,embed,source,input";//HTML void tags, also supported by the Houx framework
  const IS_HTML_VOID_TAG=txt=>_mapValue(HTML_VOID_TAGS, txt);
  const HTML_DEPRECATED_TAGS="acronym,noembed,applet,noframes,bgsound,param,big,blink,plaintext,center,rb,content,rtc,dir,shadow,font,spacer,frame,strike,frameset,image,tt,keygen,xmp,marquee,nobr,menuitem";//HTML obselete and deprecated element. 
  //The above tags are no more been supported by the houx framework
  const IS_HTML_DEPRECATED_TAG= txt => _mapValue(HTML_DEPRECATED_TAGS, txt);
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
  const MATHML_TAGS = "math,malignmark,menclose,annotation,annotation-xml,maction,merror,maligngroup,mfenced,mn,mo,mmultiscripts,mfrac,semantics,none,mlongdiv,mlabeledtr,mfraction,mtr,mglyph,mi,mover,munder,munderover,mpadded,mphantom,mspace,mroot,mprescripts,msline,mrow,ms,mscarries,mscarry,msgroup,msqrt,mstack,mtd,mtext,mtable,mstyle,msub,msubsup,msrow,msup";
  const IS_MATHML_TAG=tag=>_mapValue(MATHML_TAGS, tag);
  const IS_VALID_TAGNAME=(txt)=>{
    if(IS_HTML_TAG(txt)||IS_WEB_COMPONENT(txt)||IS_HTML_VOID_TAG(txt) || IS_SVG_TAG(txt) || IS_MATHML_TAG(txt)) return true;
    if(IS_HTML_DEPRECATED_TAG(txt) || IS_SVG_DEPRRCATED_TAG(txt)){
      $Debug(`"${txt}" is an html/svg deprecated tag, and should not be used in new projects\n\nhoux    does not offer the compilation of obselete elements`);
    }
    return false;
  }
  const dataStringTypes="string,function,object,array,boolean,number,symbol,set,map,bigint,set,map,weakmap,weakset,date,weakref,promise,proxy";//Valid javascript datatypes
  const isValidDataStringType=obj=>_mapValue(dataTypes, obj);//checks if a string value is a dataTypes return text
  const DataFunctionMap=[String, Function, Object, Array, Symbol, Number, Boolean]
  const XtructDataCallableTypes=[Set,Map,WeakMap,WeakSet, Date,WeakRef,Promise,RegExp,Proxy,BigInt,ArrayBuffer];
  const isBuiltInType=type=>_mapValue(DataFunctionMap, type) || _mapValue(XtructDataCallableTypes, type)
  const Data_Flags="NodeList,PATCH_FLAGS,PATCH-TYPE-TUPLE"
  const hasUpperCase=str=>str.match(/[A-Z]/);
  const hasLowerCase=str=>str.match(/[a-z]/);
  const hasDigit=dig=>dig.match(/[0-9]/);
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
  class houxCustomNativeElement extends HTMLElement{
    constructor(){
      super();
    }
  }
  const isCustomElement=node=>  node instanceof  HTMLElement && isNativeElement(node);
  const spreadFragmentKey=Symbol()
  class spreadRenderFragment{
    constructor(VnodeClasses){
      this[spreadFragmentKey]=VnodeClasses;
    }
  }
  const isSpreadFragment=vnode=> vnode instanceof spreadRenderFragment;
  const lazyKey=Symbol()
  const lazyCacheKey=Symbol()
  const lazyPatchFlagKey=Symbol()
  class lazyRender{
    constructor(render){
      this[lazyKey]=render;
      this[lazyPatchFlagKey]=0
      this[lazyCacheKey]=undefined
    }
  }
  const isLazyRender=render=>render instanceof lazyRender;
  function lazyUnwrap(render){
    if(isRef(render)) render = refUnwrap(render);
    if(isLazyRender(render)) {
      if(isUndefined(render[lazyCacheKey]) || render[lazyPatchFlagKey]){
        const renderValue=render[lazyKey]();
        render[lazyCacheKey]=renderValue;
        return renderValue;
      }else return render[lazyCacheKey];
    }else return render ;
  }
  function isChildrenNode(val){
    return isPrimitive(val) || isArray(val) || isHouxVNode(val) || isHouxBuild(val) || isCustomElement(val)  || isSlotInstance(val) || isRenderVNodeClass(val) || isSpreadFragment(val) || isLazyRender(val);
  }
  function isChildrenObjInstances(val){
    if(!isChildrenObj(val)) return false;
    return isHouxVNode(val) || isHouxBuild(val) || isCustomElement(val)  || isSlotInstance(val) || isRenderVNodeClass(val) || isSpreadFragment(val) || isLazyRender(val);
  }
  function isChildrenObj(val){
    return isChildrenNode(val) && !( isPrimitive(val) || isArray(val))
  }
  const isBaseWidget=widget=> isPObject(widget) && widget instanceof Widget;
  const isProxy=value=>_validateType(value, Proxy);
  const validHouxWidget=(w)=>(isPObject(w) || isPFunction(w) || isClass(w)) && !isProxy(w);
  const isHoistedVNode=vnode=>isHouxVNode(vnode) && isTrue(vnode.VNodeManager.patchFlags.isHoisted);
  const isStaticVnode=vnode=>isHouxVNode(vnode) && !isHoistedVNode(vnode);
  function lazy(callback){
    if(!isPFunction(callback)){
      $Debug(`lazy method expects a plain function as its formal argument`);
      return ""
    }
    return new lazyRender(callback);
  }
  function parseScript(script){
    return new Function(`"use strict"; return ${script}`)();
  }//helps compile string values to javascript statement
  function passableBlock(block, warn){
    try{
      parseScript(block);
      return true;
    }catch(err){
      if(isTrue(warn)){
        $Debug(`Statement not passage in Mustache/binding context\n\nContext expects a single expression\n"${block}"`);
        $Debug(err);
      }
      return false
    }
  }
  const isInDomNode=element=> isNativeElement(element) && isEQ(element.getRootNode(),document);
  const GLOBAL_EVENTS="abort,animationcancel,animationend,animationiteration,animationstart,auxclick,blur,error,focus,canplay,canplaythrough,cancel,change,click,close,contextmenu,dblclick,drag,dragend,dragenter,dragleave,dragover,dragstart,drop,durationchange,emptied,ended,formdata,gotpointercapture,input,invalid,keydown,keypress,load,keyup,loadeddata,loadedmetadata,loadend,loadstart,lostpointercapture,mousedown,mouseenter,mouseleave,mousemove,mouseout,mouseover,mouseup,mousewheel,wheel,pause,play,playing,pointerdown,pointermove,pointerup,pointercancel,pointerover,pointerout,pointerleave,pointerenter,pointerlockchange,pointerlockerror,progress,ratechange,reset,resize,scroll,securitypolicyviolation,seeked,seeking,select,selectstart,selectionchange,slotchange,stalled,submit,suspend,timeupdate,touchcancel,touchend,touchstart,touchmove,transitioncancel,transitionrun,transitioned,transitionstart,waiting,volumechange,autocompleteerror,autocomplete,hover";//Html event names managed by houx on elements
  const IS_VALID_EVENT_HANDLER=eventName=>_mapValue(GLOBAL_EVENTS, eventName);
  const isClass = val=> isFunction(val) && val.toString().startsWith('class');
  const directivesHooksMap="created,mounted,updated,init,destroyed";
  function isInstanceOf(val, construct){
    if(isFunction(construct) && isXtruct(construct)) return val instanceof construct;
    return false;
  }
  function instance_Has_Widget(self, name ){
    return _mapValue(BUILT_IN_WIDGETS, name) || _mapValue(self[$$$register]?.widgets || {}, name ) ;
  }
  const normalize_Widget=(self, name)=>_mapValue(BUILT_IN_WIDGETS, name) ? BUILT_IN_WIDGETS[name] : _mapValue(self[$$$register].widgets, name) ? self[$$$register].widgets[name]: null;
  const isSlotInstance=val=> val instanceof slotInstanceMap;
  const requestMethods="POST,GET,PATCH,HEAD,DELETE,PUT,CONNECT,OPTIONS,TRACE";
  const isRequestMethod=method=>_mapValue(requestMethods, method);
  const isHouxVNode=vnode=>vnode instanceof HouxVNode;
  const isHouxBuild=widget=>widget instanceof _Houx_Build;
  const isHouxTextVNode=vnode=>vnode instanceof HouxTextVNode;
  const isHouxElementVNode=vnode=> vnode instanceof HouxElementVNode;
  const isHouxFragmentVnode=vnode => vnode instanceof HouxFragmentVNode;
  const isWidgetResolver=data=>_validateType(data, _WidgetResolver);
  const isDirectiveResolver=data=>_validateType(data, _DirectiveResolver);
  const readOnlyModelProps="$element,$params,$attrs,$signals,$slots,$parent,$root";
  const proxySkipped="$element,$signals,$parent,$root,_observe,_useAgent,_deferTick,_mutate,_effectHook,[[[_Reactive__Ref_]]]";
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
  const arrowFNRegex=/^(\(([\w$,\[\]\{\} ]*)\)|[\w$]+)[ ]*=>[ ]*[{]?\s*/;
  const functionFNRegex=/^(async[ ]+)?(function)?([*]?([ ]*)[\w$]*)?\(([\w$]*)?\)[ ]*\{\s*/m;
  const isAFunction=(fn)=> isPFunction(fn) && arrowFNRegex.test(fn.toString());
  const isFNString=str => isString(str) && isTrue(arrowFNRegex.test(str) || functionFNRegex.test(str));
  const boundFNRegex=/^bound [\w$]*$/;
  const isBFunction=func=>isPFunction(func) && !isAFunction(func) && boundFNRegex.test(func.name);
  const objectDestructureRegex=/^{(.*?)}$/;
  const arrayDestructureRegex=/^\[(.*?)\]$/;
  const isDestructureSyntax=syntax=>objectDestructureRegex.test(syntax) || arrayDestructureRegex.test(syntax) ;
  class fallThrough{
    constructor(fn){
      this.callback=fn;
    }
  }
  class Model{}
  class Params{}
  class Attrs{}
  class Slots{}
  class Signals{}
  const isModelInstance=model=>model instanceof Model;
  const isParamsInstance=param=>param instanceof Params;
  const isAttrsInstance=param=>param instanceof Attrs;
  const isSlotsInstance=param=>param instanceof Slots;
  const isSignalsInstance=param=>param instanceof Signals;
  const isClassBasedBuild=build=>isHouxBuild(build) && isEQ(build[$$$ownProperties].widgetType, 'class-based');
  const isFunctionBasedBuild=build=>isHouxBuild(build) && isEQ(build[$$$ownProperties].widgetType, 'function-based');
  const isObjectBasedBuild=build=>isHouxBuild(build) && isEQ(build[$$$ownProperties].widgetType, 'object-based');
  const isFallThrough = fall => fall instanceof fallThrough;
  const $$tupleStore=Symbol()
  const $$tupleUnique=Symbol()
  const $$tupleIsFrozen=Symbol()
  const $$dexTransformKey=Symbol();
  const genericKeyProp=Symbol();
  const $$rawChildrenData$$=Symbol('[[[$$rawChildrenData$$]]]');
  const $$$$dir__ref$$$$=Symbol('[[[$$$$dir__ref$$$$]]]');
  const dir$$__render=Symbol("[[[$$@@dir$$__render]]]");
  const $$$fallThrough=Symbol("[[[$$@fallThrough]]]");
  const $$slotName=Symbol('[[[~~slotName~~]]]');
  const $$$Events=Symbol('[[[@@Events]]]');
  const $$$operands=Symbol();//for the operands property of a widget instance
  const $$$ownProperties=Symbol();
  const $$$compiler=Symbol();
  const $$$core=Symbol();
  const $$$register=Symbol();
  const $$$ReactiveProxyKey=Symbol();//used in marking a reactive object
  const activeFlagInstanceKey= Symbol();
  const scopedDirKey=Symbol();//for the scoped directive
  const lifeCiycleBinding=Symbol();
  const $$$customDirs=Symbol();
  const $$renderClass=Symbol();
  const rawObjKey=Symbol()
  const $$$ModelUpdateKey = Symbol();//resolving a midel directive consumption on widget fallThrough
  const $$BuiltinWidgetKey=Symbol();
  const $buildWidgetNormalizerKey=Symbol()
  const isBuiltinWidgetBuild=self=> isHouxBuild(self) && hasOwn(self[$$$ownProperties], 'builtin_widget');
  const isBuiltinWidgetAndType=( self, type ) => isBuiltinWidgetBuild(self) && isEQ(self[$$$ownProperties].builtin_widget, type )
  const isBuiltInPortalWidget=self=> isBuiltinWidgetAndType(self, 'hx:portal')
  const isBuiltInMotionWidget=self=>isBuiltinWidgetAndType(self, 'hx:motion')
  const isBuiltInMemoWidget=self=>isBuiltinWidgetAndType(self, 'hx:memo')
  const isBuiltInFragmentWidget=self=>isBuiltinWidgetAndType(self, 'hx:fragment')
  const isBuiltInSelfWidget=self=>isBuiltInSuspenseWidget(self, 'hx:self')
  const isBuiltInBuildWidget=self=>isBuiltinWidgetAndType(self, 'hx:build')
  const isBuiltInSuspenseWidget=self=>isBuiltinWidgetAndType(self, 'hx:suspense')
  const isBuiltinWidget =widget=> hasOwn(widget, $$BuiltinWidgetKey);
  const builtinValidWidget=(widget, type)=> isBuiltinWidget(widget) && isEQ(widget[$$BuiltinWidgetKey], type) ;
  const $buildHx_VNodeKey=Symbol()//saving the $buildHx_VNodeKey key while passing widget to houx build.
  function isReactiveProxy(obj){
    if(isObject(obj)) return hasOwn(obj, $$$ReactiveProxyKey) ;
    else if(isArray(obj)) obj.includes($$$ReactiveProxyKey);
    else if(_validateType(obj, [Set, Tuple, Map])) obj.has($$$ReactiveProxyKey);
    return false;
  }
  const widgetSpecialAttrProps = new Set([ $$rawChildrenData$$ , $$$$dir__ref$$$$ , dir$$__render, $$$fallThrough , $$slotName, $$$Events, $$$ModelUpdateKey ]);
  const isSpecProp = prop => widgetSpecialAttrProps.has(prop);
  const isBuiltinBlocks=block=>_mapValue("if,else,else:if,for,const", block);
  function createRenderFN(self, fn){
    if(!isPFunction(fn)){
      $Debug(`parameter 2 of "createRenderFN" macro expects a plain Function`);
      return pass
    }
    let callback=Function('self', 'fn',`
      return function renderClass(instance, updated, forceFragment){
        return fn(self);
      }
    `)
    callback = callback(self, fn);
    callback[$$renderClass]=true;
    return callback;
  }
  const isRenderClass=render=>isPFunction(render) && isEQ(render.name, "renderClass") && render[$$renderClass];
  const $passKey=Symbol()
  function pass(){}
  pass[$passKey]=true
  const isContextMethodString = ( self , hx__VNode , str ) => object_Has_Path(self.$$publicModel, str) || isTrue(hx__VNode && object_Has_Path(hx__VNode.LabContext||{}, str) || isFNString(str));
  const isIfKey=key=>/^\$\$if[\w|$]*$/.test(key);
  const isElseIfKey=key=>/^\$\$else-if[\w$|]*$/.test(key);
  const isElseKey=key=>/^\$\$else[\w$|]*$/.test(key);
  const isForKey=key=>/^\$\$for[\w_$|]*$/.test(key);
  function getter(fn){
    if(!isPFunction(fn)){
      $Debug(`The "getter" macro expects a single parameter which requires a plain function`);
      return;
    }
    fn=new Proxy(fn, {
      apply(target, thisArgs, args){
        return  Reflect.apply(...arguments);
      }
    })
    return fn
  }
  function isElementType(element, type){
    if(isEQ(type, 'text')) return IS_TEXT_NODE(element);
    return isNativeElement(element) && IS_ELEMENT_NODE(element) && isEQ(element.localName, type);
  }
  function markRaw(obj){
    if(isChildrenObj){
      $Debug(`Cannot mark a renderable Houx instance as a raw data`);
      return obj;
    }
    if(!_validateType(obj, [Object, Array]) || isRaw(obj)) return obj;
    obj[rawObjKey]=true;
  }
  function isRaw(obj){
    return _validateType(obj, [Object, Array]) && ( isObject(obj) ? hasOwn(obj, rawObjKey ) : isTrue(obj[rawObjKey]));
  }
  function memMove(){
    
  }
  function RegisterInjector(instance){
    
  }
  function vb(self){
    if(!isHouxBuild(self)) return ;
    return {
      operands:self[$$$operands],
      ownProperties:self[$$$ownProperties],
      compiler:self[$$$compiler],
      core:self[$$$core],
      register:self[$$$register]
    }
  }
  class _Houx_Ref__ {
    _data=undefined
    constructor(reactive, watchers, isShallow=false, isReadonlyRef=false, isComputed=false, bypassKey=undefined){
      this[refInternalEffectKey]=watchers;
      const returnValue=()=>{
        if(isComputed){
          if(this[refInternalEffectKey].updateFlags){
            this[refInternalEffectKey].updateFlags=0;
            const getCookie = this[refInternalEffectKey].computed.call(this[refInternalEffectKey].ModelInstance) ;
            this[refInternalEffectKey].cache=getCookie;
            return getCookie;
          }else {
            return this[refInternalEffectKey].ModelInstance ? this[refInternalEffectKey].cache : reactive ;
          }
        }else return refUnwrap(reactive);
      }
      const descriptor={
        get(){
          const valueX=returnValue()
          return isReadonlyRef && !isBypassSymbol(bypassKey) ? valueX :  refUnwrap( isReadonlyRef ? valueX : reactive._data ) ;
        }
      }
      if(!isReadonlyRef || isTrue(isReadonlyRef && isBypassSymbol(bypassKey))){
        descriptor.set=function set(value){
          if( isReadonlyRef ){
            if(!isReadonlyBypasser(value) && !isBypassSymbol(value.bypassKey)){
              $Debug(`Cannot reassign/mutate a "readonly" ref value\n\n___MUTATION FAILED___\n........".${prop}" property assignment \n\nParams are readonly \n.........>>>bypassKey verification failure`);
                return false;
            }
            value=value.value
          }
          if(isRef(value)){
            value.effectTrigger(()=>{
              watchers.mutated=1
            })
            value=refUnwrap(value)
          }
          watchers.mutated=1;
          reactive._data=value
          return true;
        }
      }
      define(this, '_data' , descriptor );
      watchers.cache=undefined;
      watchers["[[[computed__Ref]]]"]=false
      watchers.updateFlags=0;
      watchers.computed=pass
      watchers.ModelInstance=null;
      define(this, refIsShallowKey, { value:isShallow, enumerable })
      define(this, '[[[key]]]',{ value:_generateUUID(7, 'alphaNum').toUpperCase(), enumerable })
      define(this, refGenreId,{ value: `[[[_${ isReadonlyRef ? "Readonly" : "Reactive" }__Ref_]]]`, enumerable })
    }
    effectTrigger(fn, self){
      if(isEQ(this[refGenreId], '[[[_Readonly__Ref_]]]') && isFalse(this[refIsShallowKey])) return
      let mutated=this[refInternalEffectKey].mutated;
      define(this[refInternalEffectKey] , 'mutated', {
        get(){
          return mutated;
        },
        set(valueX){
          mutated=valueX;
          deferTick(()=>{
            fn(this);
          })
          return true;
        }
      }) //call the effectTrigger call with an function param
    }
    isSameRef(ref){
      return isRef(ref) && isEQ(this["[[[key]]]"] , ref["[[[key]]]"]);
    }
  }
  class _Reactive__Ref_ extends _Houx_Ref__{
    constructor(reactive){
      super(...arguments)
    }
  }
  class _Readonly__Ref_ extends _Houx_Ref__{
    constructor(){
      super(...arguments)
    }
  }
  const Ref= _Houx_Ref__;
  Ref.createRef=function createRef(valueX){
    return dataRef(valueX);
  }
  function _createReactiveProxyObjectOrArray(iterable, watcher, deep, path, readonly, bypass ) {
    if(isRef(iterable) || !isIterable(iterable) ) return iterable;
    if(isPObject(iterable) && !bypass){
      try{
        return definePropertyAccessors(iterable, watcher, deep, path, false , readonly);
      }catch(err){
        return _createReactiveProxyObjectOrArray(iterable, watcher, deep, path, readonly, true)
      }
    }
    return new Proxy(iterable, {
      get(target, prop, receiver){
        const value=Reflect.get(...arguments);
        if(isRef(value)){
          return refUnwrap(value)
        }
        return isIterable(value) && deep && !isRef(value) ? _createReactiveProxyObjectOrArray(value, watcher , deep, path, readonly) : value;
      },
      set(target, prop, value, receiver){
        if(readonly && !deep){
          $Debug(`Cannot reassign/mutate a "readonly" ref value\n\n___MUTATION FAILED___\n........".${prop}" property assignment `);
          return false;
        }
        Reflect.set(...arguments);
        if(isRef(value)){
          value.effectTrigger(()=>{
            watcher.mutated=1
          })
          return true
        }
        watcher.mutated=1;
        return true;
      },
      deleteProperty(target, prop ){
        if(readonly && !deep){
          $Debug(`Cannot reassign/mutate a "readonly" ref value\n\n___MUTATION FAILED___\n........".${prop}" property assignment  `);
          return false;
        }
        Reflect.deleteProperty(...arguments);
        watcher.mutated=1;
        return true
      },
      defineProperty(target, prop, descriptor){
        if(readonly && !deep){
          $Debug(`Cannot reassign/mutate a "readonly" ref value\n\n___MUTATION FAILED___ \n........".${prop}" property assignment `);
          return false;
        }
        Reflect.defineProperty(...arguments)
        watcher.mutated=1
        let value=descriptor.value;
        if(isRef(value)){
          value.effectTrigger(()=>{
            watcher.mutated=1
          })
          return true
        }
        return true;
      }
    })
  }
  function definePropertyAccessors(obj, watcher, deep, path="", init, readonly){
    if(isRef(obj)) return obj
    obj=!isPObject(obj) && isTrue(init) ? { _data:obj } : obj;
    if(!isPObject(obj) && isIterable(obj) && (!readonly && !deep)) return _createReactiveProxyObjectOrArray(obj, watcher, deep, path, readonly);
    else if(!isPObject(obj) || !readonly && deep) return obj;
    for (let [key, value ] of entries(obj)){
      define(obj, key, {
        get(){
          return isIterable(value) ? _createReactiveProxyObjectOrArray(value, watcher , deep, path, readonly) : value;
        },
        set(valueX) {
          if(readonly && !deep){
            $Debug(`Cannot reassign/mutate a readonly ref value\n\n___MUTATION FAILED___ \n........".${key}" property assignment `);
            return false;
          }
          const oldValue = value
          if(isRef(valueX)){
            valueX.effectTrigger(()=>{
              watcher.mutated=1
            })
          }
          if(isEQ(key, '_data' ) && isTrue(init) && !isPrimitive(valueX) && !isRef(valueX)){
            value = definePropertyAccessors(valueX, watcher, deep, path, false, readonly)
          }else value = valueX
            // Notify watchers if property has changed
          watcher.mutated = 1 ;
          return true ;
        }
      })
    }
    return obj ;
  }
  function dataRef( target , isShallow = false ) {
    if(isRef(target)) return isReadonlyRef(targer) ? fromReadonlyRef(targer, isShallow ) : target;
    const observers=new Tuple();
    const watchers={ observers , mutated : 0 } ;
    let mutated=watchers.mutated
    target = definePropertyAccessors(target, watchers, !isShallow , "");
    let reactive=hasOwn(target, '_data') ? target : { _data:target};
    reactive=definePropertyAccessors(reactive, watchers, false ,"", true, false );
    return preventX(new _Reactive__Ref_(reactive, watchers, isShallow, false, false ));
  }
  function createCustomDataRef(callback){
    if(!isPFunction(callback)){
      $Debug(`createCustomDataRef macro expects a function argument`);
      return;
    }
    
    const descriptor=callback()
  }
  function isTuple(tp){
    return tp instanceof Tuple;
  }
  const arrSet=setData=>isSet( setData ) ? [...setData] : isTuple(setData) ? setData.list() : setData ;
  function setValueIndex(setData , value){
    if(!isSet(setData) && !len(setData) && !setData.has(value)) return NaN;
    let index=0
    for(let data of setData.values()){
      if(isEQ(data, value)) return index;
      index++;
    }
  }
  const arrayMutationMethods="push,pop,shift,unshift,splice,sort,reverse,set,copyWithin,fill";
  const setMutationMethods="add,delete,clear,set";
  const mapMutationMethods="set,delete,clear";
  const tupleMutationMethods=setMutationMethods+",shift,unshift,splice,pop,shift"
  function getAgentMutators(data, prop, model){
    const value=data;
    data=refUnwrap(data);
    let mutateArgs= isArray(data) ? arrayMutationMethods : isSet(data) ? setMutationMethods : isMap(data) ? mapMutationMethods : isTuple(data) ? tupleMutationMethods : isPObject(data) ? "define,set,delete" : isPrimitive(data) ? "set" : "set";
    const mutation_object=createObj('mutatations');
    for(let name of mutateArgs.split(',').values()){
      function mutate(arg){
        let rv=undefined;
        if( _validateType(data, [Set, Tuple,Array, Map]) && isFalse(!isMap(data) && isEQ(name, 'set'))) {
          rv=data[name](arg);
        }else if(isPObject(data)){
          if(isEQ('define', name)) rv=define(data, ...arguments );
          else if(isEQ('delete', name )) {
            delete data[arg];
          }
        }
        let assV=rv;
        if((model || !isPrimitive(value) ) && prop ) {
          if(!isEQ(name, 'define')) assV=set_Object_Value(isHouxBuild(model) ? model.$$publicModel : !isPrimitive(value) ? value : model , prop, isEQ(name, 'set') && !isMap(data) && len(arguments) ? arg : data  );
        }
        return  isEQ(name, 'set') && !isMap(data) ? assV : rv;
      }
      mutate=new Proxy(mutate, {
        apply(target, thisArgs, args){
          return Reflect.apply(...arguments);
        }
      })
      mutate = Function('fn', `
        return function ${name}(value){
          return fn(...arguments);
        }
      `)(mutate);
      mutation_object[name]=mutate;
    }
    return mutation_object;
  }
  function useAgent(dataOrModel, data){
    data = () => data || undefined
    if(isEQ(len(arguments), 1) &&  isModelInstance(dataOrModel)){
      $Debug(`data value is missing\n\n........."useAgent"`);
      return [data, pass];
    }else if(isModelInstance(dataOrModel) && !isChar(data())){
      $Debug(`data property at positional argument 2 of "useAgent" expects a string/symbol`);
      return [data, pass];
    }else if(isHouxBuild(this) && !isChar(dataOrModel)){
      $Debug(`data path at positional argument 1 expects a string/symbol value of a valid model path\n\n.>.../useAgent`);
      return [data, pass];
    }
    const model= isHouxBuild(this) ? this : isModelInstance(dataOrModel) ? dataOrModel : null;
    let ModelInstance= model && isHouxBuild(model) ? model.$$publicModel : model ? model : null;
    let prop=isHouxBuild(this) ? dataOrModel : isModelInstance(dataOrModel) ? data() : isRef(dataOrModel) ? '_data' : dataOrModel;
    if(model && !object_Has_Path(ModelInstance, prop)){
      $Debug(`"${prop}" property is not a valid model property`, );
      return[data, pass];
    }
    data = ()=> model ? _$runModelBind(isHouxBuild(model) ? model.$$publicModel : model, prop ) : dataOrModel;
    const mutateArgs= getAgentMutators(data(), prop , model);
    let defineCount = 0;
    const unwrappedGetter= ()=>refUnwrap(data())
    function mutate(mutation){
      if(isPFunction(mutation) && isLT(defineCount, 1)){
        defineCount++;
        define(mutateArgs, 'value', {
          get(){
            return unwrappedGetter();
          }
        })
      }
      if(isPFunction(mutation) ){
        try{
          mutation(mutateArgs)
        }catch(err){
          $Debug(`Encountered an error during the call of the mutate callback\n\n${err}`);
          return ;
        }
      }else if(!isPFunction(mutation)){
        set_Object_Value( model ? ModelInstance : !isPrimitive(data()) ? data() : {} , prop, mutation  );
      }
    }
    return [ unwrappedGetter , mutate ] ;
  }
  function Mutate(props){
    if(!isPObject(props)){
      $Debug(`"_mutate" parameter 1 argument expects a plain Object`,this, true);
      return false
    }
    for (const [prop, value] of entries(props)){
      if(!object_Has_Path(this.$$publicModel, prop)){
        $Debug(`"${prop}" not found in model instance\n\n..............at......"_mutate"`, this, true);
        return false
      }
      const [ propValue, mutate ] = this.$$publicModel._useAgent(prop);
      mutate(({set})=>{
        set(value);
      });
    }
    return true;
  }
  const getIterator=obj=>_validateType(obj, [Set, Map, Array,Tuple ]) ? obj.entries() : isPObject(obj) ? entries(obj) : isIterator(obj) ? obj : [] ;
  const refGenreId=Symbol("[[[GenreIDType]]]");
  const refInternalEffectKey=Symbol();
  const refIsShallowKey=Symbol()
  function readonly(value, isShallow=false, isComputed=false, metrics = []){
    if(isReactiveRef(value)) return toReadonlyRef(value);
    else if(isReadonlyRef(value)) return value;
    let [ mutate=false, key ]=metrics
    const watchers={
      mutated:0,
      observers:new Tuple()
    }
    value=_createReactiveProxyObjectOrArray(value, watchers, isShallow, "", true);
    return preventX(new _Readonly__Ref_(value, watchers, isShallow, true, isComputed, key))
  }
  function isRef(value){
    return value instanceof _Houx_Ref__;
  }
  function refUnwrap(value){
    if(isLazyRender(value)) value=lazyUnwrap(value);
    if(!isRef(value)) return value;
    return value._data;
  }
  function unRef(ref){
    return refUnwrap(ref);
  }
  function fromRef(ref){
    return refUnwrap(ref);
  }
  function toRef(path, object){
    return 
  }
  function isReactiveRef(value){
    return isRef(value) && isEQ(value[refGenreId], "[[[_Reactive__Ref_]]]");
  }
  function isReadonlyRef(value){
    return isRef(value) && isEQ("[[[_Readonly__Ref_]]]", value[refGenreId]);
  }
  function isShallowRef(value){
    return isRef(value) && isTrue(value[refIsShallowKey]);
  }
  function isShallowReactiveRef(value){
    return isReactiveRef(value) && isReadonlyRef(value);
  }
  function isShallowReadOnlyRef(value){
    return isReadonlyRef(value) && isShallowRef(value)
  }
  function isComputedRef(value){
    return isReadonlyRef(value) && isTrue(value[refInternalEffectKey]['[[[computed__Ref]]]'])
  }
  function fromReadonlyRef(ref, isShallow=false){
    if(!isRef(ref)) return dataRef(ref, isShallow);
    if(isReadonlyRef(ref)) return dataRef(refUnwrap(ref), isShallow);
    return ref;
  }
  function toReadonlyRef(ref, isShallow=false, computedRef=false, metrics){
    if(!isRef(ref)) return readonly(ref, isShallow, computedRef, metrics);
    if(isReactiveRef(ref)) return readonly(refUnwrap(ref, isShallow, computedRef, metrics));
    return ref;
  }
  class readonlyBypasser {
    bypassKey=undefined;
    value=undefined
    constructor(value, bypassKey){
      this.bypassKey=bypassKey
      this.value=value
    }
  }
  const isReadonlyBypasser = bypasser=>bypasser instanceof readonlyBypasser;
  const bypassSymbol=Symbol("Readonly_Bypass_Symbol");
  const isBypassSymbol=sym=>isEQ(sym, bypassSymbol);
  function defineReadonlyGetter(parent, prop, value, metrics=[], ){ 
    let [ isShallow=false, isComputedRef=false, key]=metrics;
    value=isReadonlyRef(value) ? value : isRef(value) ? toReadonlyRef(value, isShallow, isComputedRef, [ isBypassSymbol(key), key ]) : readonly(value, isShallow, isComputedRef, [ isBypassSymbol(key), key ] );
    define(parent, prop, { value , enumerable });
  }
  function useReadonlyBypass(parent, key, value, bypassKey){
    const bypasser=new readonlyBypasser(value, bypassKey);
    set_Object_Value(parent, key, bypasser );
  }
  function objFreeze(obj, deep=true){
    if(!_validateType(obj, [Object, Array, Tuple])) return obj;
    if(isTuple(obj)) return obj.freeze();
    if(isTrue(deep)){
      for (let [key, value] of getIterator(obj)){
        obj[key]=objFreeze(value, true);
      }
    }
    return Object.freeze(obj);
  }
  function effectDependencyTracking(self, fn , args=[]){
    args=!isArray(args) ? [args] : args;
    self[$$$operands].onEffectWatch = true;
    const value = fn(...args);
    self[$$$operands].onEffectWatch=false;
    const subscribers=arrSet(self[$$$core].effectSubscribers);
    self[$$$core].effectSubscribers.clear();
    return [ subscribers, value ];
  }
  const effectHookValueKey=Symbol()
  function effectHook(fn, config){
    if(!isPFunction(fn)){
      $Debug(`"effectHook" at parameter 1 argument expects a plain function`, this, true);
      return ;
    }else if(isGT(len(arguments), 1) && !isPObject(config)){
      $Debug(`config parameter 2 argument of effectHook expects a plain objectj`);
      return;
    }
    config.now=false;
    const [ subscribers, returnValue ]=effectDependencyTracking(this, function(){
      return fn()
    } );
    const stoper=this.$$publicModel._observe(subscribers, fn, config);
    return function stopEffect(callback){
      if(len(arguments) ) {
        if(isPFunction(callback)){
          callback[effectHookValueKey]=returnValue;
          stoper(callback);
        }
      }else stoper()
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
  function getType(value){
    return isArray(value) ? 'array' : isDate(value) ? 'date' : isSet(value) ? 'set' : isMap(value) ? 'map' : isTuple(value) ? 'tuple' : value instanceof AnyType ? 'any' : value instanceof NoneType ? 'none' : isRef(value) ? '_'+isReactiveRef(value) ? 'Reactive' : 'Readonly' +'__Ref_' :typeof value;
  }
  function isFrozenWarn(isFrozen, action, type){
    if(isFrozen){
      $Debug(`cannot perfom ${action} on ${type}\n\ninstance may have been frozen or sealed from future possible mutations`);
      return false;
    }
    return true
  }
  function TupleConstructorManager(self, args){
    self[$$tupleStore]=[];
    self[$$tupleUnique]=new Set();
    let size=0
    define(self, 'size', {
      get(){
        return size;
      },
      set(NS){
        size=NS;
        return true
      }
    })
    self[$$tupleIsFrozen]=false
    let [ value ] = args;
    if(len(args) && !_validateType(value, [Set, Array, Tuple ])) {
      $Debug(`"Tuple" type expects a set/array value at parameter 1 argument`);
      return;
    }else if(len(args)){
      value=isSet(value) ? arrSet(value) : isTuple(value) ? value.list() : value;
    }else return;
    for(let item of value.values()){
      if(!self[$$tupleUnique].has(item)){
        self[$$tupleUnique].add(item);
        self[$$tupleStore].push(item)
      }
    }
    self.size=len(self[$$tupleStore]);
  }
  function Tuple(value){
    TupleConstructorManager(this, [...arguments])
  }
  Tuple.prototype.filter=function filter(args){
    
  }
  Tuple.prototype.shift=function shift(){
    if(isFalse(isFrozenWarn(this[$$tupleIsFrozen], 'shift()', 'tuple'))) return false
    const firstValue=this[$$tupleStore][0];
    if(isGT(this.size, 0)){
      this[$$tupleStore].shift();
      this[$$tupleUnique].delete(firstValue);
      this.size--;
    }
    return firstValue;
  }
  Tuple.prototype.freeze=function freeze(deep=false){
    this[$$tupleStore]=objFreeze(this[$$tupleStore], deep);
    this[$$tupleIsFrozen]=true;
    return this;
  }
  Tuple.prototype.values=function values(){
    return this[$$tupleStore].values();
  }
  Tuple.prototype.keys=function keys(){
    return this[$$tupleStore].keys()
  }
  Tuple.prototype.entries=function entries(){
    return this[$$tupleStore].entries()
  }
  Tuple.prototype.has=function has(value){
    return this[$$tupleUnique].has(value)
  }
  Tuple.prototype.indexOf=function indexOf(value){
    return len(arguments) && this[$$tupleUnique].has(value) ? this[$$tupleStore].indexOf(value) : -1 ;
  }
  Tuple.prototype.add=function add(value){
    if(isFalse(isFrozenWarn(this[$$tupleIsFrozen], 'add()', 'tuple'))) return false
    if(len(arguments) && !this.has(value)){
      this[$$tupleUnique].add(value);
      this[$$tupleStore].push(value);
      this.size++;
      return true;
    }
    return false;
  }
  Tuple.prototype.delete=function Tuple_delete(value){
    if(isFalse(isFrozenWarn(this[$$tupleIsFrozen], 'delete()', 'tuple'))) return false
    if(this.has(value)) {
      const index=this.indexOf(value);
      if(!isLTE(index, 0)) {
        this[$$tupleStore].splice(index, 1);
      }
      this[$$tupleUnique].delete(value);
      this.size--;
      return index
    }
    return null;
  }
  Tuple.prototype.replace=function replace(oldV, newV){
    if(isFalse(isFrozenWarn(this[$$tupleIsFrozen], 'replace()', 'tuple'))) return false
    if(!this.has(oldV) && this.has(newV)) return false;
    const index=this.indexOf(oldV);
    this[$$tupleStore].splice(index, 1 , newV);
    this[$$tupleUnique].delete(oldV);
    this[$$tupleUnique].add(newV);
    return true;
  }
  Tuple.prototype.prepend=function prepend(value){
    if(isFalse(isFrozenWarn(this[$$tupleIsFrozen], 'prepend()', 'tuple'))) return false
    if(!this.has(value)) {
      this[$$tupleStore].unshift(value)
      this[$$tupleUnique].add(value);
      this.size++;
      return true
    }
    return false
  }
  Tuple.prototype.splice=function splice(index=0, count=this.size, ...newV){
    if(isFalse(isFrozenWarn(this[$$tupleIsFrozen], 'splice()', 'tuple'))) return false
    newV= len(newV) ? newV : [];
    for(let i=0;i<count;i++){
      const oldV=this[$$tupleStore][index+i];
      const newValue=newV.shift()
      this[$$tupleUnique].delete(oldV)
      if(isLT(index+i, len(newValue)) && !this.has(newValue)) {
        this[$$tupleStore].splice(index+i, 1, newValue);
        this[$$tupleUnique].add(newValue)
      }else this[$$tupleStore].splice(index+i, 1)
    }
    if(len(newV)){
      for(let item of newV.values()){
        if(!this.has(item)){
          this.add(item);
        }
      }
    }
    this.size=len(this[$$tupleStore]);
  }
  Tuple.prototype.clear=function clear(){
    if(isFalse(isFrozenWarn(this[$$tupleIsFrozen], 'clear()', 'tuple'))) return false
    this.splice();
  }
  Tuple.prototype.pop=function pop(){
    if(isFalse(isFrozenWarn(this[$$tupleIsFrozen], 'pop()', 'tuple'))) return false
    const lastIndex=this[$$tupleStore][this.size-1];
    if(isLT(this.size-1, 0 ) && !this.has(lastIndex) ) return;
    this[$$tupleUnique].delete(lastIndex);
    this[$$tupleStore].pop();
    this.size--
    return lastIndex;
  }
  Tuple.prototype.at=function at(index){
    if(isLT(index, 0) && isGT(index, this.size)){
      $Debug(`index exceded Tuple limit.........\n"at()"`);
      return null
    }
    return this[$$tupleStore][Number(index)];
  }
  Tuple.prototype.list=function list(){
    return this[$$tupleStore];
  }
  const effectTuple= new Tuple()
  var previousRunningEffectBuild = undefined ;
  var currentRunningEffectBuild = undefined ;
  var ancestorRunningEffect = undefined ;
  function installCurrentRunningEffect(self){
    effectTuple.add(self);
    if(isHouxBuild(currentRunningEffectBuild)){
      previousRunningEffectBuild = currentRunningEffectBuild;
    }
    currentRunningEffectBuild = self;
  }
  function reinstatePreviousRunningEffect(){
    if(previousRunningEffectBuild) {
      currentRunningEffectBuild = previousRunningEffectBuild
      
    }else currentRunningEffectBuild = undefined;
  }
  function getCurrentRunningEffect(binding){
    const self=currentRunningEffectBuild;
    const { name } = binding;
    if(!isHouxBuild(self)){
      $Debug(`${name} utility function cannot be called outside of a build or widget function body\n"${name}" may ve ben called in an asynchronous thread or outside of the build/widget based function`);
      return false;
    }
    return self;
  }
  function createAgent(value, prop){
    const self=getCurrentRunningEffect({
      name:'createAgent'
    })
    if(!self) return [ pass, pass ];
    if(isGT(len(arguments), 1) && (!isString(prop) || !exists(prop))){
      $Debug(`createAgent at argument 2 expects an valid property name or is an empty value `, self);
      return [ pass, pass ];
    }
    const parameters = exists(prop) ? [ value, prop ] : [ value ] ;
    return useAgent(stateRef(...parameters));
  }
  function deferWatch(getter){
    if(!isPFunction(getter)){
      $Debug(`deferWatch expects a getter function`);
      return 
    }
  }
  function pushEffect(){
    if(len(arguments)){
      $warn(`_pushEffect expects no formal arguments`, this )
    }
    this[$$$operands].dependency.notify();
    return this.$$publicModel._deferTick();
  }
  function isSameNodeType(node1, node2){
    if(!node1 instanceof Element && !node2 instanceof Element) return false;
    else if(!isEQ(node1.nodeType, node2.nodeType)) return false;
    else if(!isEQ(node1.localName, node2.localName)) return false;
    return true
  }
  function isEQNode(node1, node2){
    if(!isSameNodeType(node1, node2)) return false;
    else if(!isEQ(node1.outerHTML, node2.outerHTML)) return false;
    else if(!isEQ(len(node1.attributes), len(node2.attributes))) return false;
    else if (isEQ(len(node1.attributes), len(node2.attributes))){
      const node2Attrs=node2.attributes;
      for(let [key, attr ] of entries(node1.attributes)){
        const { name , value } = attr;
        const { name:node2N, value:node2V } = node2Attrs[key];
        if(!isEQ(name, node2N) && !isEQ(value, node2V)) return false;
      }
    }
    return true;
  }
  function cloneVElement(vnode){
    if(!isHouxVNode(vnode)){
      $Debug(`cloneVElement() macro expects a houx virtual node as it's first argument`);
      return;
    }
    return vnode.compiler_options.Node()
  }
  function makeCloneVerson(value, deep=true){
    let cValue
    if(isPrimitive(value) ) return value;
    else if(_validateType(value, [Array, Set, Tuple, Object])){
      cValue= isArray(value) ? [] : isSet(value) ? new Set() : isTuple(value) ? new Tuple() : isObject(value) ? new value.__proto__.constructor() : undefined;
      let index = 0
      for(let [ prop, item] of getIterator(value)){
        item =  makeCloneVerson(item, deep) ;
        if(_validateType(value, [Set, Tuple])) cValue.add(item);
        else if(isArray(value)) cValue.push(item);
        else if(isObject(value)){
          cValue[prop]=item;
        }
        index ++
      }
      return cValue;
    }else if(isFunction(value)){
      if(isClass(value)){
        cValue=new Proxy(value, {
          apply(){
            return Reflect.apply(...arguments)
          }
        })
      }else{
        
      }
      return cValue
    }
  }
  function deepEqualityCheck(val1, val2){
    val1=refUnwrap(val1)
    val2=refUnwrap(val2)
    if(_validateType(val1, None) && _validateType(val2, None)){
      if(isEmptyStr(val1) && isEmptyStr(val2)) return true;
      else if(isUndefined(val1) && isUndefined(val2)) return true;
      else if(isEQ(val1, null) && isEQ(val2, null)) return true;
      else return false;
    }
    if(!isEQ(getType(val1), getType(val2))) return false;
    if(isPrimitive(val1) && isPrimitive(val2)) return isEQ(val1,  val2);
    if(_validateType(val1, [Array, Set, Tuple]) || isArgument(val1) ){
      if(!isEQ(len(val1), len(val2))) return false;
      val2=_validateType(val2, [Set, Tuple]) ? arrSet(val2) : val2;
      for(const [ key, value] of val1.entries()){
        if(isFalse(deepEqualityCheck(value, val2[key]))) return false;
      }
      return true;
    }else if(isMap(val1)){
      if(!isEQ(len(val1), len(val2))) return false;
      let index=0;
      for(const [ key, value] of val1.entries()){
        const val2Key=val2.keys().next();
        if(isFalse(deepEqualityCheck(key, val2Key))) return false;
        const value2=val2.values().next();
        if(isFalse(deepEqualityCheck(val2, value2))) return false;
        index++;
      }
      return true;
    }else if(isObject(val1)){
      if(!isEQ(len(val1), len(val2))) return false;
      let index=0;
      for(const [ key, value] of entries(val1)){
        if(isFalse(isEQ(key, keys(val2)[index]))) return false;
        if(isFalse(deepEqualityCheck(value, val2[key]))) return false;
        index++;
      }
      return true
    }
    return isEQ(JSON.stringify(val1), JSON.stringify(val2));
  }
  function _$compiler_engine_hydrator(){
    global=createObj('Houx');
    window.Houx=global;
  }
  const exceptions=createObj('Exceptions',{
    SE:(self)=>$Debug(``, self, isHouxBuild(self))
  });
  const ConfigValidator={
    debug:Boolean, 
    forwardSlot:Boolean, 
    forwardAttrs:Boolean, 
    delimiters:Array, 
    scopedStyleSheet:Boolean, 
    isAsync:Boolean,
    isCustomElement:Boolean,
    useSSRCompiler:Boolean
  }
  class FrameworkCompilerOptions{
    debug=true
    forwardSlot=true
    forwardAttrs=true
    delimiters=['{{','}}']
    scopedStyleSheet=true
    isAsync=false
    isCustomElement=false
    useSSRCompiler=false
  }
  const isGlobalConfig=config=>config instanceof FrameworkCompilerOptions;
  const Compiler_Config_Options= new FrameworkCompilerOptions()
  class HouxCompilerSetup{
    debug(debug){
      if(isFalse(mapSettingCheck(this, 'debug', debug))) return this;
      Compiler_Config_Options.debug=debug
    }
    forwardAttrs(forwardAttrs){
      if(isFalse(mapSettingCheck(this, 'forwardAttrs', forwardAttrs))) return this;
      Compiler_Config_Options.forwardAttrs=forwardAttrs
    }
    forwardSlot(forwardSlot){
      if(isFalse(mapSettingCheck(this, 'forwardSlot', forwardSlot))) return this;
      Compiler_Config_Options.forwardSlot=forwardSlot
    }
    delimiters(delimiters){
      if(isFalse(mapSettingCheck(this, 'delimiters', delimiters))) return this;
      Compiler_Config_Options.delimiters=delimiters
    }
    scopedStyleSheet(scopedStyleSheet){
      if(isFalse(mapSettingCheck(this, 'scopedStyleSheet', scopedStyleSheet))) return this;
      Compiler_Config_Options.scopedStyleSheet=scopedStyleSheet
    }
    isAsync(isAsync){
      if(isFalse(mapSettingCheck(this, 'isAsync', isAsync))) return this;
      Compiler_Config_Options.isAsync=isAsync
    }
    isCustomElement(isCustomElement){
      if(isFalse(mapSettingCheck(this, 'isCustomElement', isCustomElement))) return this;
      Compiler_Config_Options.isCustomElement=isCustomElement;
    }
    useSSRCompiler(useSSRCompiler){
      if(isFalse(mapSettingCheck(this, 'useSSRCompiler', useSSRCompiler ))) return this;
      Compiler_Config_Options.useSSRCompiler=useSSRCompiler
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
      }else if(new Set(XtructDataCallableTypes).has(type)){
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
        if(!isFunction(typeF) && !isBaseType(typeF) && !isNull(typeF) && !isEmptyStr(typeF)){
          $Debug(`type check value is not a function or class constructor type\n\n found "${typeF}"`); 
          return false;
        }
        res=_validateType(val, typeF);
        if(isTrue(res)) {
          return res;
          break;
        }
      }
      return res;
    }else if(isBaseType(type)){
      if(type instanceof AnyType) return !_validateType(val , None );
      else if(type instanceof NoneType) return _validateType(val, [undefined, null, ""]);
      let res;
      if(type.validator) res=type.validator(val);
      if(!isTrue(res) && type.type ) res=_validateType(val, type.type);
      return res;
    }else if(new Set([undefined, null, "" ]).has(type)) return isString(val) ? isEmptyStr(val) : isNull(val);
    return false;
  }
  function Signal(name, callback, options){
    this.name=name;
    this.receiverForm=new Set()
    this.depend=callback
  }
  Signal.prototype.fire=function fire(...params){
    this.depend( ...params)
  }
  const isSignal=val=>_validateType(val, Signal);
  function _createTextElement(self, text, hx__VNode){
    if(!isPrimitive(text)){
      $Debug(`cannot create a TEXT_NODE from a none primitive value.......\n\n"${text}" value`);
      text = "";
    }
    text=String(text);
    let hasSkip;
    let node;
    let is_hyperscript=hx__VNode.is_hyperscript;
    if(hx__VNode)  define(hx__VNode, '_vnode_key',{value:_generateUUID(7), enumerable})
     node=document.createTextNode(text);
    if(hasSpecialCharacters(node?.textContent)  && !is_hyperscript) {
      let [subscribers, textContent] = effectDependencyTracking(self, function(){
        return resolveAccessor(self, parent, node, hx__VNode);
      })
      node.textContent=textContent
      hx__VNode.PATCH_FLAGS.add('ELEMENT_CHILDREN');
      hx__VNode.render_tracked=exists(len(subscribers));
      hx__VNode.VNodeManager.patchFlags.isHoisted=true
    }
    hx__VNode.is_text_node=true
    return node ;
  }
  function VirtualizePropTick(hx__VNode, org, resolved, [ unevaluated, evaluated ], Deps ){
    let initialDependencies = [];
    if(hasOwn(hx__VNode.VNodeManager.patchFlags.PropFlags, org)){ 
      const PropFlags=hx__VNode.VNodeManager.patchFlags.PropFlags[org]
      if(len(PropFlags.dependencies) ) Deps=Deps.concat(PropFlags.dependencies);
      return false;
    }
    for( const dep of Deps.values() ){
      initialDependencies.push(dep());
    }
    hx__VNode.VNodeManager.patchFlags.PropFlags[org]={
      resolvedPropName : () => resolved,
      accessor : () => unevaluated ,
      evaluatedValue : () => evaluated,
      dependencies : () => Deps,
      initialDependencies
    }
    return true;
  }
  class VNodeClass{
    constructor(type, props, children, configOptions){
      this.$$type=type
      this.$$properties=props
      children = lazyUnwrap(children)
      this.$$children= exists(children) && !isArray(children) ? [ children ] : exists(children) ? children : null
    }
    $$type=null
    hx_hash_=null
    $element=null
    id_ref=null
    $$properties=null
    PropFlags=null
    compiler=null
    prototype_=null
    renderPipeline=null
    $$children=null
    key=null
    reactive_flags=null
    notifiers_record=null
    config=null
    LabContext=null
    renderID_Key=null
    filesFilter=null
    _is_VNodeClass=true
    filesFilter=null
    subscriptions=null
    hx__VNode=null
  }
  const isRenderVNodeClass=vnode=>vnode instanceof VNodeClass;
  class HouxVNode{
    constructor(){
      if (isNativeElement(this.$element)) define(this.$element, 'houxVNode',{value:this, enumerable, configurable})
      
      createVNodeSignalNotifier(this.VNodeManager, 'onDestroyEnd', ()=>{
        
      })
    }
    base_element=undefined
    get_parent_element(){
      return this.$element.parentElement.houxVNode
    }
    render_tracked=false
    $element=undefined
    slot_name=undefined
    widget_instance=undefined
    updated_hook=pass
    destroyed_hook=pass
    _vnode_key=undefined
    patch_tracks=new Set()
    conditional_record={ src:undefined, res:false, passed:false}
    compiler_options=createObj('compiler_options', { fallThrough:createObj('fallThrough')});
    VNodeManager=createObj('VNodeManager', { 
      updateFlags:{ 
        active:false
      },
      GeneticProvider:undefined,
      Attribute_Collection:undefined,
      VNodeClass:undefined,
      factoryCompiler:pass,
      LifeCycleHooks:{
        init_hook:new Tuple(),
        created_hook:new Tuple(),
        mounted_hook:new Tuple(),
        updated_hook:new Tuple(),
        destroyed_hook:new Tuple()
      },
      patchFlags:{
        isHoisted:false,
        subscriptions:[],
        PropFlags:{},
        shapeProps:{}
      },
      dexTransform:{
        sourcesArray:[],
        syntaxArray:[]
      }
    })
    hx_hash_=undefined
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
    NodeList=new Tuple()
    PATCH_FLAGS=new Set()
    insert(node){
      if(isHouxVNode(node)){
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
  function tagMachErr(self, metrics){
    let [ op, cl, p1 ] = metrics;
    if(!isTagMatch(op, cl) ) {
      $Debug(`Unmaching tags for "for" directive loop data keys mapping\n opening tag does not match a closing tag\n\n found ${p1}`, self, true);
      return false;
    }
  }
  const keyValueRegex=/((\(|\<)(.*?)?(\)|\>))[ ]+([of|in]+)[ ]+([.\w\$\[\]\(\) \S]+)/;
  const DestructuredRegex=/((\{|\[)(.*?[ ]*)*?(\}|\]))[ ]+([of|in]+)[ ]+([\w.\$\[\]\(\) \S]+)/;
  const valueRegex=/([\w\$]+)[ ]+([of|in]+)[ ]+([\w.\-\[\]\$\(\) \S]+)/;
  const iterableRegex=/^([.\w\$\[\]\(\) \S]+)$/
  const interRegex=/[ ]*(\{|\[)(.*?)(\}|\])[ ]*/;
  function get_Loop_Data(self, str){
    const Loop_Data={}
    if(keyValueRegex.test(str)){
      str=str.replace(keyValueRegex,(match, p1, op, value, cl, type, obj)=>{
        if(isFalse(tagMachErr(self, [ op, cl, p1]))) return ;
        let item , index , key ;
        if(interRegex.test(value)){
          let destrV=value.replace(interRegex, (match, opn, vvv, cls )=>{
            if(isFalse(tagMachErr(self, [ opn, cls, vvv]))) return ''
            item = match
            return ''
          })
          let [ em, keyX, indexX ] = destrV.split(' ').join('').split(',');
          key=keyX;
          index=indexX;
        }else{
          let [ itemX, keyX, indexX ] = value.split(' ').join('').split(',');
          key=keyX;
          item=itemX;
          index=indexX;
        }
        if( value ) Loop_Data.value=item;
        if( key ) Loop_Data.key=key;
        if( index ) Loop_Data.index=index;
        define(Loop_Data, 'type', {value:type});
        define(Loop_Data, 'obj',{value:obj});
        return match;
      })
    }else if(DestructuredRegex.test(str)){
      str=str.replace(DestructuredRegex, (match, structs,  op, items, cl, type, value)=>{
        if(!isTagMatch(op, cl) ) {
          $Debug(`Unmaching tags for "for" directive loop data keys mapping\n opening tag does not match a closing tag\n\n found at${match}`, self, true);
          return;
        }
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
  function For_Loop(self, attr, hx__VNode){
    const data=get_Loop_Data(self, attr);
    if(!data) return ;
    let dataObject;
    try{
      dataObject=_$runModelBind(self, data.obj, hx__VNode);
      dataObject=refUnwrap(dataObject);
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
      $Debug(`Iteration issue\n\n"${data.type}" is not an iterator\n "of" or "in" only supported by Houx`, self, true);
      return;
    }
    return { obj:dataObject, keyName:data.key, valRef:data.value, loopType:data.type, ref:data.obj, index:data.index }
  }
  
  function NormalizeDirGarbage(props){
    let has_conditional=false;
    let has_loop=false
    let dataRecord={};
    let index=0
    for(const [key, val] of entries(props)){
      if(isIfKey(key)){
        has_conditional=true;
        dataRecord.ifIndex=index;
        dataRecord.hasIf=true;
        dataRecord.getIf=val;
        dataRecord.ifKey=key;
      }else if(isElseKey(key)){
        has_conditional=true;
        dataRecord.elseIndex=index;
        dataRecord.hasElse=true;
        dataRecord.getElse=val;
        dataRecord.elseKey=key;
      }else if(isElseIfKey(key)) {
        has_conditional=true;
        dataRecord.elseIfIndex=index;
        dataRecord.getElseIf=val;
        dataRecord.hasElseIf=true;
        dataRecord.elseIfKey=key
      }else if(isForKey(key)) {
        has_loop=true;
        dataRecord.forIndex=index
        dataRecord.hasFor=true;
        dataRecord.getFor=val;
        dataRecord.forKey=key;
      }
      index++
    }
    dataRecord.hasIFWithFor=isTrue(has_conditional && has_loop);
    return dataRecord;
  }
  class renderlessVNode {
    type='conditional'
    source=''
    value=undefined
    compiler_options=undefined
    hx__VNode=undefined
    $element=undefined
    siblings=undefined
    constructor(value, compiler_options, source, hx__VNode, siblings){
      this.$element=_createFragment();
      this.value=value;
      this.compiler_options=assign(this.compiler_options||{},compiler_options);
      this.source=source;
      this.hx__VNode=hx__VNode;
      this.siblings=siblings;
      this.hx__VNode.IS_RENDERLESS=true
    }
  }
  const isRenderlessVNode=vnode=> vnode instanceof renderlessVNode || isTrue(isHouxVNode(vnode) && isTrue(vnode.IS_RENDERLESS));
  function _$Conditional_Dir_Resolver(self, props, args, hx__VNode, siblings, recordPatch){
    const [ hasIf, hasElseIf , hasElse ] = recordPatch[3];
    const GIC=new _$Directive_$Conditional$_Renderer(self, props, args, hx__VNode, siblings, recordPatch);
    if(hasIf) return GIC.Panel_If_Block();
    else if(hasElseIf) return GIC.Panel_elseif_Block();
    else if(hasElse) return GIC.Panel_else_Block();
  }
  const isConditionalVnode=(vnode, cond)=> isHouxVNode(vnode) ? isEQ(vnode.conditional_record.src, cond ) : false;
  class _$Directive_$Conditional$_Renderer{
    options=undefined
    constructor(self, props, args, hx__VNode, siblings, recordPatch){
      const [ hasEx , propValue , srcKey ]=recordPatch
      this.propValue=propValue;
      this.srcKey=srcKey
      this.self=self
      this.props=props;
      this.args=args;
      this.hx__VNode=hx__VNode;
      this.siblings=siblings;
      this.parameters=()=>[...this.args, false, this.hx__VNode.LabContext]
      hx__VNode.compiler_options.parameters=this.parameters;
      // this.modifiers=modifiers
    };
    Panel_If_Block(){
      const { self, propValue, hx__VNode, parameters, args, srcKey } = this ;
      let data=_$runModelBind(self, propValue, hx__VNode);
      delete args[1][srcKey];
      if(data) {
        const node = _createVirtualElement(...parameters()/*...args, false, hx__VNode.LabContext*/);
        hx__VNode.conditional_record.src='if';
        hx__VNode.conditional_record.res=true;
        hx__VNode.conditional_record.passed=true;
        hx__VNode.NodeList.add(node);
        return node.$element;
      }else return $IfElseDirRenderLess.call(this, data, 'if').$element;
    } 
    Panel_elseif_Block(isElse=false){
      const block=isElse ? 'else' : 'else-if' ;
      const { self, propValue, hx__VNode, siblings, args, srcKey, parameters } = this
      let data=_$runModelBind(self, propValue, hx__VNode);
      const previous=siblings[len(siblings)-1];
      if(previous) hx__VNode.conditional_record.passed=previous.conditional_record.passed;
      delete args[1][srcKey];
      if(!len(siblings) || !previous || (!isConditionalVnode(previous, 'if') && !isConditionalVnode(previous, 'else-if'))){
        $Debug(`"The ${block}" conditional rendering directive block expects a preceding "if" or "else-if" directive element\n\nMay return unexpected result\ndid you mean "if" directive instead?\n\n at>>>>>>>>""`, self, true);
        const node = _createVirtualElement(...args, false, hx__VNode.LabContext);
        return node.$element;
      }else if(isFalse(previous.conditional_record.passed) && isRenderlessVNode(previous) && isFalse(previous.conditional_record.res)){
        if(isElse || data){
          const node = _createVirtualElement(...parameters()/*...args, false, hx__VNode.LabContext*/);
          hx__VNode.conditional_record.src=block;
          hx__VNode.conditional_record.res=true;
          if(!isElse) hx__VNode.conditional_record.passed=true
          hx__VNode.NodeList.add(node);
          return node.$element;
        }else return $IfElseDirRenderLess.call(this, data, block, previous ).$element;
      }else return $IfElseDirRenderLess.call(this, data, block, previous).$element;
    }
    Panel_else_Block(){
      return this.Panel_elseif_Block(true);
    }
  }
  function $IfElseDirRenderLess( data, block, previous){
    const { args, hx__VNode } = this;
    const renderless= new renderlessVNode(data, args, block, hx__VNode);
    hx__VNode.conditional_record.src=block;
    hx__VNode.IS_RENDERLESS=true;
    hx__VNode.conditional_record.res=false;
    hx__VNode.conditional_record.passed=previous ? previous.conditional_record.passed : false ;
    hx__VNode.NodeList.add(renderless);
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
  function destructWarn(ref, object, self){
    if(ref && objectDestructureRegex.test(ref) && !isObject(object)){
      $Debug(`Invalid object destructuring from a none object value\n\nillegal destructuring found at "${object}" on $$for directive definition\nTarget value is not an object`, self, true);
      return false;
    }else if(ref && arrayDestructureRegex.test(ref) && !isArray(object)){
      $Debug(`Invalid array destructuring from a none array value\n\nillegal destructuring found at "${object}" on $$for directive definition\nTarget value is not an array iterable`, self, true);
      return false;
    }
    return true;
  }
  function generateDestructurePrefix(self){
    
  }
  function defineDestructuringContextProps(self, hx__VNode, ctx, items, value, metrics ){
    let { objDex , link, item, key , garbageProps  } = metrics;
    if(objDex && link ? link.includes('=') : !objDex ? item.includes('=') : false){
      let assign=(objDex ? link : item).split(' ').join('').split('=');
      let [ keyX, valX ]=assign;
      valX = self && hx__VNode ? _$runModelBind(self, valX, hx__VNode, true ) : null;
      const realV=value[ !objDex && isArray(value) ? key : item ];
      ctx[keyX]=!realV ? valX : realV;
      garbageProps.add(keyX);
    }else if(objDex && !link && item.startsWith('...') ){
      if(!isEQ(len(items), key+1)){
        $Debug(`rest property destructuring can only be used as the last value on destructure mapping`, self, true);
        return;
      }
      item=item.slice(3);
    }else {
      ctx[ link || item ] = value[ isArray( value ) ? key : item ] ;
      if(objDex) garbageProps.add( item )
    }
  }
  function _destructure_wizard_compiler( self , value , valRef , ctx , hx__VNode) {
    const itemsRef = valRef.match( objectDestructureRegex ) || valRef.match( arrayDestructureRegex ) ;//runs des'
    const isobj = !isArray( value ) ;
    const objDex=objectDestructureRegex.test(valRef);//check if this is an object destructure
    let items = itemsRef[ 1 ].split( ',' )// ;
    if( len( items ) ) {
      let key = 0 ;//loops through items
      const garbageProps = new Tuple() ;
      items.forEach( ( item ) => {
        item = isobj ? item.trim().split( ':' ) /*if thisis an obj, get alias by colon*/: item.trim() ;
        if( isobj && isGT( len( item ) , 2 ) ) {
          $Debug( `Problem with destructuring reassignment alias\n\nExceded parameter length expectation\n..............${ item.join( ':' ) }` , self , true ) ;
          return ;
        }
        const link = isobj ? item[ 1 ] : null ;
        item = isobj ? item[ 0 ] : item ;
        if(hasSpread_bind(item)){
          if(!isEQ(key+1, len(items))){
            $Debug(`"${item}" spread parameter element must come last in the destructured elements definition`);
            return;
          }
          const restProps=objDex ? {} : [];
          for(let [ name, val] of entries(value)){
            if(!garbageProps.has(name)) {
              if(objDex) restProps[name] = val;
              else restProps.push(val)
            }
          }
          ctx[item.slice(3)]=restProps;
        }else if( isTrue( isArray( value ) && isGT( key + 1 , len( value ) ) ) || isTrue( isObject( value ) && !hasProp( value , item ) ) ) {
          if( isArray( value) ) {
            $Debug( `${ item } array destructure key exceeds array length` , self , true );
            return;
          }else {
            $Debug( `destructure object value has no such key as "${ item }"\n\nInvalid key destructure at at..."${ valRef }"`, self , true ) ;
            return;
          }
        }else{
          defineDestructuringContextProps(self, hx__VNode, ctx, items, value, { objDex, link, item, key, garbageProps } );
        }
        key ++;
      } );
    }
  }
  function _$Directive_$For_Loop$_Renderer(self, args, hx__VNode, siblings, renderPatch){
    const [ check, propValue , srcKey ] = renderPatch;
    let wrapper;
    let { obj, keyName, valRef, loopType, ref, index }=For_Loop(self, propValue, hx__VNode) || {};
      delete args.props[srcKey];
    if(loopType && isEQ(loopType, 'in') && valRef && !isNumber(obj) && isObject(obj)){
      $warn(`((Warning))\n\nWe do not recommend the use of key value paires in 'for...in' loops while iterating over a plain object, \n\nsince the value of the value reference will remain "undefined"\nPreferable over a non plain object`, self);
      $warn(`Many JavaScript style guides and linters recommend against the use of 'for...in', because it iterates over the entire prototype chain which is rarely what one wants, and may be a confusion with the more widely-used "for...of" loop\n\nIt's included in Houx's support for completeness.`, self);
    }
    const NodeList=[];
    const options={
      orgType:getType(obj),
      ref, src:obj,
      args:{ type:args.type, props:assign({}, args.props), children:args.children, is_hyperscript:false, hx__VNode, alias:{valRef, keyName}} 
    }
    let league;
    if(isNumber(obj)){
      let count=0
      for(let i=0 ; i < obj ; i++){
        count++
        let ctx= {}
        if(isFalse(destructWarn(valRef, obj, self))) return;
        if(valRef) ctx[valRef]=i+1;
        if(keyName) ctx[keyName]=valRef ? i : i+1;
        if(index) ctx[index]=count
        league=renderForConditional(self,  args, ctx, NodeList, i, i+1, options, hx__VNode )
      }
    }else if(loopType &&  _mapValue("of,in", loopType) && isIterable(obj)){
      let count=0;
      valRef=valRef ? valRef.trim() : null;
      keyName=keyName ? keyName.trim() : null ;
      index=index ? index.trim() : null ;
      for(const [ky, vl] of getIterator(obj)){
        count++;
        const ctx={}
        mapCTXFallProps(self, {valRef, keyName, index }, {ky, vl, count }, ctx);
        league=renderForConditional(self, args, ctx, NodeList, count, vl, options, hx__VNode, {  count, value:vl })
      }
    }
    wrapper= new HouxFragmentVNode(self, NodeList)
    if(wrapper){
      wrapper.isWidgetWrapper=true;
      wrapper.compiler_options=assign(wrapper.compiler_options,options);
    }
    if(league){
      for ( let [ key, val ] of entries(league)){
        if(!isEQ(key, 'IS_RENDERLESS')) hx__VNode.conditional_record[key]=val;
        hx__VNode.IS_RENDERLESS=val;
      }
    }else if(!len(NodeList)){
      wrapper=new HouxFragmentVNode([], self);
      wrapper.isWidgetWrapper=true;
      wrapper.compiler_options=assign(wrapper.compiler_options,options);
    }
    hx__VNode.NodeList.add(wrapper)
    return wrapper?.$element
  }
  function mapCTXFallProps(self, Loop_Data, it_Data, ctx){
    let dexTransform={
      sourcesArray:[],
      syntaxArray:[]
    };
    const { valRef, keyName , index} = Loop_Data
    const { ky, vl, count } = it_Data 
    if(isFalse(destructWarn(valRef, vl, self))) return wrapper;
      if(valRef && isDestructureSyntax(valRef) ){ 
      dexTransform.sourcesArray.push(vl);
      dexTransform.syntaxArray.push(valRef)
      if(hasOwn(ctx, $$dexTransformKey)){
        ctx[$$dexTransformKey].sourcesArray=ctx[$$dexTransformKey].sourcesArray.concat(dexTransform.sourcesArray)
        ctx[$$dexTransformKey].syntaxArray=ctx[$$dexTransformKey].syntaxArray.concat(dexTransform.syntaxArray);
      }else ctx[$$dexTransformKey]=dexTransform
      // _destructure_wizard_compiler(self, vl, valRef, ctx, hx__VNode);
    }else{
      if(valRef) ctx[valRef]=vl;
    }
    if(keyName) ctx[keyName]=valRef ? ky : vl;
    if(index) ctx[index]=count;
  }
  function renderForConditional(self, args, ctx, NodeList, count, vl, options, hx__VNode, co){
    if(hx__VNode.LabContext) ctx=assign(hx__VNode.LabContext, ctx, NodeList);
    const props=assign({}, args.props);
    const Node=()=>_createVirtualElement(args.type, props, args.children, args.self, false, ctx,  NodeList);
    const loopNode=Node();
    loopNode.compiler_options=assign(loopNode.compiler_options, assign(co ||  { props, ctx, Node, index:count, value:vl}, options));
    options.Node=Node;
    if(loopNode) NodeList.push(loopNode);
    if(isConditionalVnode(loopNode, 'if') || isConditionalVnode(loopNode, 'else-if')){
       return { 
        src:loopNode.conditional_record.src,
        res:loopNode.conditional_record.res,
        passed:loopNode.conditional_record.passed,
        IS_RENDERLESS:loopNode.IS_RENDERLESS
      }
    }
  }
  function keyIndex(obj, key){
    return isObject(obj) ? keys(obj).indexOf(key) : _validateType(obj, [Array, Set, Number]) ? Number(key) : isMap(obj) ? obj.keys().indexOf(key) : NaN;
  }
  function VNodeManager(self, options, element, hx__VNode, siblings, saveGarbageContent, isRerender){
    const { type, props, children }=options;
    const { hasIFWithFor , ifIndex , elseIndex, elseIfIndex, forIndex}=saveGarbageContent
    const {getIf, hasIf, hasElse, getElse, hasElseIf, getElseIf, hasFor, getFor } = saveGarbageContent;
    const { ifKey, elseKey, elseIfKey, forKey } = saveGarbageContent;
    const getValue=hasIf ? getIf : hasElse ? getElse : hasElseIf ? getElseIf : hasFor ? getFor : null ;
    const getEx=hasIf || hasElse || hasElseIf;
    const getKey= hasIf ? ifKey : hasElse ? elseKey : hasElseIf ? elseIfKey : hasFor ? forKey : null ;
    const conditionalArgs= [getEx, getValue, getKey, [ hasIf, hasElseIf, hasElse ]]
    if(hasIFWithFor && isLT(hasIf ? ifIndex : hasElse ? elseIndex : hasElseIf ? elseIfIndex : -1, forIndex)) return _$Conditional_Dir_Resolver(self, props, [type, props,  children, self], hx__VNode, siblings, conditionalArgs );
    else if(hasFor) return _$Directive_$For_Loop$_Renderer(self, {type, props, children, self}, hx__VNode, siblings,  [getEx, getFor, forKey ] );
    else if( getEx ) return _$Conditional_Dir_Resolver(self, props, [type, props,  children, self], hx__VNode, siblings, conditionalArgs );
    else return createHouxElement(type, children, props, self,hx__VNode, null, isRerender );
  }
  function callSetHooks(self, hooks, element, bindObj={}, hx__VNode, Name ){
    function Callback(){
      for(let hook of hooks.values()){
        if(isPass(hook)) continue
        try{
          const { value, modifiers } = hook[lifeCiycleBinding] || {}
          hook.call(self.$$publicModel, element && isNativeElement(element) ? hx__VNode : self, value, modifiers);
        }catch(err){
          // $warn(err.stack)
          $Debug("Unresolved problem during the call of the "+Name.slice(0, -5) +" hook of custom "+hook.dirName||""+" directive\n",  self, true);
          $Debug(err, self);
          return element;
        }
      }
      return element;
    }
    return Callback();
  }
  function HouxElementLifeCircleHooks(self, element, hx__VNode){
    const args=(hookN)=> [ self, hx__VNode.VNodeManager.LifeCycleHooks[hookN], element, self.$$publicModel, hx__VNode, hookN ];
    hx__VNode.$element=element;
    if(self && !isFalse(self[$$$operands].initialized)) return element
    if(len(hx__VNode.VNodeManager.LifeCycleHooks.created_hook)){
      callSetHooks( ...args('created_hook') );
    }
    if(len(hx__VNode.VNodeManager.LifeCycleHooks.mounted_hook)){
      self[$$$compiler].whenMountedHooks.add(function(){
        whenMounted(self, element, ()=>{
          callSetHooks( ...args('mounted_hook') );
        })
      })
    }
    if(len(hx__VNode.VNodeManager.LifeCycleHooks.updated_hook)) $assignToHookFN( ...args('updated_hook') );
    if(len(hx__VNode.VNodeManager.LifeCycleHooks.destroyed_hook)) $assignToHookFN( ...args('destroyed_hook') );
    return  element;
  }
  function $assignToHookFN(self, hookSet, element, model, hx__VNode, hookN){
    hx__VNode[hookN]=function hook(){
      callSetHooks(self, hookSet, element, self.$$publicModel, hx__VNode, hookN);
    }
  }
  function resolveElementRef(self, ref, element, hx__VNode){
    try{
      set_Object_Value(self.$$publicModel, ref, element);
    }catch(err){
      $Debug(`Uresolved problem when resolve element ref directive\n\n${err}`, self, true);
      return
    }
  }
  function _createVirtualElement(type, props, children, self, is_hyperscript, ctx, siblings, ssc, isRerender=false){
    return new HouxElementVNode(...arguments);
  }
  function smartDextCtxMerging(context, ssc){
    if(context && hasOwn(context, $$dexTransformKey) && hasOwn(ssc, $$dexTransformKey)){
      const sourcesArray=new Set(context[$$dexTransformKey].sourcesArray.concat(ssc[$$dexTransformKey].sourcesArray));
      const syntaxArray=new Set(context[$$dexTransformKey].syntaxArray.concat(ssc[$$dexTransformKey].syntaxArray));
      context[$$dexTransformKey].sourcesArray=arrSet(sourcesArray);
      context[$$dexTransformKey].syntaxArray=arrSet(syntaxArray);
      for(let [key, value] of entries(ssc)){
        if(!isEQ($$dexTransformKey, key)){
          context[key]=value
        }
      }
    }else if(context){
      if(hasOwn(ssc, $$dexTransformKey)){
        context[$$dexTransformKey]=ssc[$$dexTransformKey];
      }
      for(let [key, value] of entries(ssc)){
        if(!isEQ($$dexTransformKey, key)){
          context[key]=value
        }
      }
    }else context=ssc
    return context;
  }
  class HouxElementVNode extends HouxVNode{
    constructor(type, props, children, self, is_hyperscript=false, ctx, siblings, ssc, isRerender=false){
      super();
      if(is_hyperscript){
        this.is_hyperscript=true;
        this.called_render=true;
      }
      if(ctx) this.LabContext=ctx;
      if(ssc) {
        this.LabContext=smartDextCtxMerging(this.LabContext, ssc);
      };
      if(validHouxWidget(type) || isWidgetResolver(type)){
        this.VNodeManager.rawChildren=()=> children
      }
      const frameDirectives="$$for,$$if,$$else-if,$$else";
      let element;
      bufferDirSetups(self, props, this);
      const saveGarbageContent = NormalizeDirGarbage(props||{});
      const { hasIf, hasElseIf, hasElse, hasFor } = saveGarbageContent
      if(!is_hyperscript && isTrue( hasFor || hasIf || hasElse || hasElseIf ) ) element=VNodeManager(self, {type, props, children}, null, this, siblings, saveGarbageContent, isRerender);
      else element=createHouxElement(type, props, children, self, this, siblings, isRerender);
      element=isNativeElement(element) ? HouxElementLifeCircleHooks(self, element, this) : element;
      this.$element=element;
      if(self && (isNull(self[$$$core].posixVNode) || isElementType(this.$element, 'slot')) && IS_ELEMENT_NODE(this.$element)) {
        self[$$$core].posixVNode=this.$element;
      }
      if(hasProp( isHouxWidgetVNode(this) ?  this.widget_instance[$$$ownProperties] : this.compiler_options, 'dir--ref')) resolveElementRef(self, isHouxWidgetVNode(this) ? this.widget_instance[$$$ownProperties]['dir--ref']  : this.compiler_options['dir--ref'], isHouxWidgetVNode(this) ? this.widget_instance : this.$element, this );
    }
  }
  class HouxFragmentVNode extends HouxVNode{
    constructor(self, vnodes=[]){
      super();
      this.$element=_createFragment(self)
      vnodes=!isArray(vnodes) ? [vnodes] : vnodes;
      for(let node of vnodes.values()){
        if(isPrimitive(node)){
          if(!exists(node)) node="";
          node=new HouxTextVNode(self, String(node), this) ;
        }else if(isPFunction(node)) node=node(self);
        if(isHouxVNode(node)){
          this.NodeList.add(node)
          this.$element.append(isCustomElement(node) ? node : node.$element);
        }
      }
    }
  }
  class HouxTextVNode extends HouxVNode{
    constructor(self, text,  hx__VNode, fall){
      super();
      this.is_hyperscript= hx__VNode?.is_hyperscript ;
      if(hx__VNode?.LabContext && !this.is_hyperscript) this.LabContext=hx__VNode.LabContext
      else if(!this.hx__VNode?.LabContext && !this.is_hyperscript && fall ) this.LabContext=fall
      this.$element=_createTextElement(self, text, this);
      if(this.render_tracked && isHouxVNode(hx__VNode)) {
        hx__VNode.render_tracked=this.render_tracked
        hx__VNode.VNodeManager.patchFlags.isHoisted=true;
      }else if(this.render_tracked && isHouxBuild(self)){
        self[$$$compiler].hoistedNodelist.add(this);
      }
    }
  }
  class slotInstanceMap{
    slots=new Object();
    constructor(opts){
      for(let [name, value] of entries(opts)){
        // value=returnRender(()=>isPFunction(value) ? value() : value );
        define(this.slots, name, { value, enumerable, configurable});
      }
    }
  }
  function bufferDirSetups(self, props, hx__VNode){
    if(!props || !props[dir$$__render] || !len(props[dir$$__render])) return;
    for(let dir of props[dir$$__render].values()){
      if(isChar(dir.name) && !isHouxDirective(dir.name)){
        if(!hasProp(self[$$$register].directives, dir.name) || !self[$$$register].directives[dir.name]){
          $Debug(`"${dir.name} is not a registered directive\n`, self, true);
          return;
        }else if(!_validateType(self[$$$register].directives[dir.name], [Function, Object])){
          $Debug(`directive resolved at "dir.name" is not a valid directive data value`,self, true);
          return;
        }
        dirMap(self, dir, self[$$$register].directives[dir.name], hx__VNode );
        props[dir$$__render].delete(dir);
      }else if(!isChar(dir.name)) {
        dirMap(self, dir, dir.name, hx__VNode);
        props[dir$$__render].delete(dir);
      }
    }
  }
  function dirMap(self, resolver, dir, hx__VNode){
    if(isPObject(dir)){
      for(let [name, hook] of entries(dir)){
        if(_mapValue(directivesHooksMap, name)){
          if(!isPFunction(hook)){
            $Debug(`"${name} directive hook received at batch is not a function`, self, true);
            return;
          }
          hook.value=resolver.value;
          hook.modifiers=resolver.modifiers
          hx__VNode[name+'_hook'].add(hook);
        }
      }
    }else if(isPFunction(dir)){
      dir.value=resolver.value;
      dir.modifiers=resolver.modifiers
      hx__VNode.created_hook.add(dir);
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
      return "";
    }
    const NodeList=[]
    iterable=isPFunction(iterable) ? iterable() : iterable;
    if(isIterable(iterable)){
      let index=0;
      for(let [key, value] of getIterator(iterable)){
        index++
        const vnode=render(value, key, index);
        NodeList.push(vnode);
      }
    }else if(isNumber(iterable)){
      let index=0;
      for(let i=0; i<iterable;i++){
        index++;
        const vnode=render(i, i+1, index);
        NodeList.push(vnode);
      }
    }
    return new spreadRenderFragment(NodeList)
  }
  function createRenderlessVNode(self, ...compiler_options){
    let [type, props, children, instance, hx__VNode ]=compiler_options;
    // hx__VNode.widget_instance=true;
    return _createFragment()
  }
  const isHouxWidgetVNode=vnode=>isHouxVNode(vnode) && vnode.is_mount_root && isHouxBuild(vnode.widget_instance) ;
  const maybeHouxWidgetVNode=vnode=>isHouxVNode(vnode) && vnode.is_mount_root && isHouxBuild(vnode.widget_instance) || validHouxWidget(vnode?.VNodeManager?.GeneticProvider);
  function dirExistenceCheck(attrs, dir){
    const escaped=hasSpecialCharacters(dir) ? escapeRegExp(dir) : dir
    const rawDirRegex=new RegExp(`^${escaped}[\\w|$:\\-]*$`);
    let RawMap={ hasDir:false  };
    for(let [key, val] of entries(attrs)){
      if(rawDirRegex.test(key)){
        const getKey=directive_sep(key).shift().split('|').shift().split(':').shift();
        if(isEQ(getKey, dir)){
          RawMap={ hasDir:true, getDir:val , getKey:key };
        } 
        break;
      }
    }
    return RawMap;
  }
  function prefixRenderBuidProperties(self, props, index, hx__VNode){
    const [ key, value ] = props ;
    hx__VNode.VNodeManager.patchFlags.shapeProps[index]={
      key,
      value
    }
  }
  function _resolveCustomNativeElement(self, nativeArgs, hx__VNode){
    let { type, attributes, children }=nativeArgs;
    const body=createHouxElement('body');
    let attrsStr="";
    for(const [key, attr]  of entries(attributes||{})){
      attrsStr=`${attrsStr} ${key}="${attr}"`;
    }
    if(isRender(children) ? children(self) : children){
      children=isRender(children) ? children(self) :  children;
      if(!isString(children)) body.append(isHouxVNode(children)  ? children.$element  : isHouxWidgetVNode(children) ? children.build.$element : children);
      else body.innerHTML=children;
      children=body.innerHTML;
    }
    const html=`<${type} ${attrsStr.trim()}>${children||''}</${type}>`;
    const customEl=new DOMParser().parseFromString(html,'text/html').body.childNodes[0];
    if(isCustomElement(customEl) || isNativeElement(customEl)) return customEl;
  }
  function createHouxElement(type, props, children, self, hx__VNode, siblings, isRerender){
    if(props){
      if(!isRerender){ 
        let propsIndex = 0;
        for(const [ key , value ] of entries(props)){
          prefixRenderBuidProperties(self, [key , value ], propsIndex, hx__VNode );
          propsIndex++
        }
      }
    }
    if(isString(type) && (IS_VALID_TAGNAME(type) && !instance_Has_Widget(self||{}, type))) return _createNativeElement(...arguments);
    else return _createWidgetElement(...arguments, self && isTrue(self[$$$operands]?.initialized) );
  }
  function _createNativeElement(type, attributes, children, self, hx__VNode, siblings, isRerender){
    const argsCount=len(new Set(arguments));
    let element;
    const is_hyperscript=hx__VNode?.is_hyperscript || false;
    if(hx__VNode)  hx__VNode._vnode_key=_generateUUID(7)+"<::>"+(len(siblings));
    if(isString(type)){
      if(IS_VALID_TAGNAME(type)){
        element=document.createElement(type);
        if(hx__VNode) {
          hx__VNode.is_element_node=true;
          if(isHouxBuild(self)) {
            hx__VNode.hx_hash_=self[$$$ownProperties].hx_hash_
            if(self[$$$ownProperties].hx_hash_) element.setAttribute("data-hx_hash_", self[$$$ownProperties].hx_hash_);
          }
        }
      }else return _resolveCustomNativeElement(self, { type, attributes, children}, hx__VNode);
    }
    let { hasDir, getDir, getKey }=dirExistenceCheck(attributes||{}, "$$raw");
    if(attributes && hasDir  && !is_hyperscript){
      let item=_$runModelBind(self, getDir, hx__VNode, true);
      if(hx__VNode) hx__VNode.compiler_options['dir--raw']=item;
      delete attributes[getKey];
    }
    element.PATCH_FLAGS=new Set()
    if(children && !IS_HTML_VOID_TAG(type)) {
      if(hx__VNode && hasOwn(hx__VNode.compiler_options,'dir--raw')){ 
        if(!isFalse(hx__VNode.compiler_options['dir--raw'])){
          element.innerHTML=attributes[$$rawChildrenData$$]
        }else element= _initiateChildNodes(self, children, hx__VNode, element );
        delete attributes[$$rawChildrenData$$];
      } else {
        element= _initiateChildNodes(self, children, hx__VNode, element );
      }
    }
    if(attributes) {
      element=ElementPropsCompiler(attributes, element, self, hx__VNode);
    }
    const { hasDir:hasModel } = dirExistenceCheck(attributes||{}, '$$model');
    return element;
  }
  function _createWidgetElement(type, props, children, self, hx__VNode, siblings, isRerender, IS_RENDERLESS){
    const is_hyperscript=hx__VNode?.is_hyperscript;
    if(hx__VNode)  hx__VNode._vnode_key=_generateUUID(7)+"::"+len(siblings)-1;
    if(isString(type) && !is_hyperscript){
      children=children(self, hx__VNode);
      const slotRender=function(instance, VNode, fall, isRerender=false){
        const config={
          contextScope:'slots_Block',
          slots_Block:true,
          props:{
        
          },
          ctx:{}
        }
        return isString(children) ? _HouxTemplateParser(children, instance, true, VNode, fall, isRerender, config ) : isPFunction(children)  ? children(instance, VNode, fall, isRerender) : children;
      }
      
      const widget=ResolveWidget(self, hx__VNode, {type, props, $children:slotRender }, IS_RENDERLESS, children)//reso;ving a widget data object
      if(IS_RENDERLESS) return createRenderlessVNode(self, ...arguments)
      hx__VNode.is_mount_root=true;
      hx__VNode.hx_hash_=self[$$$ownProperties].hx_hash_;
      hx__VNode.widget_instance=widget;
      if(widget[$$$ownProperties]?.slot_name) hx__VNode.slot_name=widget[$$$ownProperties].slot_name;
      return widget && isHouxBuild(widget) ? widget.build?.$element : '';
    }else if((validHouxWidget(type) || isWidgetResolver(type)) && is_hyperscript){
      if(isWidgetResolver(type)){
        if (instance_Has_Widget(self, type.name) ){
          let widget=normalize_Widget(self, type.name);
          hx__VNode.VNodeManager.GeneticProvider=widget;
          // widget = new Proxy(widget, {});
          widget= isPFunction(widget) ? widget.bind(self.$$publicModel) : isClass(widget) ? widget : Object.create(widget);//binding or creating a new object model
          if(!widget.name) widget.name=type.name
          if(type.$attributes) define(widget, '$attributes', {value:type.$attributes, enumerable, writable})
          if(type.$children) define(widget, '$children', {value:type.$children, enumerable, writable})
          type=widget;
        }else{
          $Debug(`traverse macro was unable to find a widget with the provided name "${type.name}"\n\n are you sure this is a builtIn/globaly/localy registered widget`, self, true);
          return;
        }
      }
      hx__VNode.VNodeManager.GeneticProvider=type;
      // type = new Proxy(type, {});
      if(IS_RENDERLESS) return createRenderlessVNode(self, ...arguments);
      const widget =$compilerEngine(self, type, type, hx__VNode, children );
      if(hx__VNode) {
        hx__VNode.is_mount_root=true;
        hx__VNode.widget_instance=widget;
      }
      if(widget[$$$ownProperties].slot_name) hx__VNode.slot_name=widget[$$$ownProperties].slot_name;
      return widget && isHouxBuild(widget) ? widget.build.$element : _createTextElement(self, '', hx__VNode);
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
    expression=formatExpression('obj', keys(data), expression)
    const run = Function( 'obj',...keys( data ) , `"use strict"; ${ autoReturn ? 'return' : '' } ${ expression }` );
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
  function _escapeReverseDecoder(str){
    str=str.replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      //.replace(/&amp;/g, '&')
      .replace(/&#39;/g, '\\')
    return str;
  }
  const isSafeString=text=>/\[\[\[\%\%safe\-\-(.*?)\-\-\%\%\]\]\]/.test(text);
  function markSafeString(text){
    return `[[[%%safe--${text}--%%]]]`;
  }
  function RenderableContextManeger(self, text, hasSafeString ){
    text=compileToRenderable(refUnwrap(text));
    return hasSafeString ? _escapeDecoder(text) : text ;
  }
  function validateDelimiterConstruct(self, delimiters){
    if(!isArray(delimiters)){
      $Debug(`expects an arrah of character strings encoding\n\n.....delimiters config setup`, self, isHouxBuild(self));
      return false;
    }
    let [ open, close ] = delimiters ;
    if( open && close ){
      if( !hasSpecialCharacters( open ) || !hasSpecialCharacters( close ) ) {
        $Debug(`mustache customization error::\n\n delimeters must match value of special characters\n\ne.g !, @, #, $, %, ^, &, *, (, ),  [, ], {, }, ;, :, ?`,  self, isHouxBuild(self) ); 
        return false;
      }else if(includesUnsupported([ open, close ])) {
        $Debug(`Invalid  delimiter value :: \n\n"${open} or ${close} is an unsupported delimiter constructs"\n cannot be used as a string mustache delimeter since this are javascript multiline string interpolation technic\n\n Delimeter Configuration failed`, self, isHouxBuild(self));
        return false;
      }
    }
  }
  function resolveAccessor(self, vnode, node, hx__VNode){
    let [ open, close ] = self[$$$core].settings.delimiters ;
    open=hasSpecialCharacters(open) ? escapeRegExp(open) : open ;
    close=hasSpecialCharacters(close) ? escapeRegExp(close) : close ;
    const pattern=new RegExp(`${open}(.*?)${close}`, 'g');
    let link;
    let str=node.textContent;
    if(str.match(pattern)) {
      str=str.replace(pattern, (match, text)=>{
        text=_escapeReverseDecoder(text.trim());
        link=text;
        const prefix=text.split('>>');
        let filters=isGT(len(prefix), 1) ? prefix.shift() : null;
        
        let hasSafeString=false;
        if(filters ) {
          const setFilters=new Set( ( filters.startsWith('%') ? filters.slice(1) : filters ).split(" ").join("").split('.') );
          if(setFilters.has('safe')){
            hasSafeString=true;
            setFilters.delete('safe')
            filters=arrSet(setFilters).join('.');
          }
          const parameters=retrieveFiltersParams(self, prefix, hx__VNode);
          text=$Filter_HelpersService(self, parameters, filters, hx__VNode).shift();
        }else{
          text=_$runModelBind(self, prefix.shift().trim(), hx__VNode);
        }
        return RenderableContextManeger(self, text, hasSafeString);
      })
    }
    return str;
  }
  function retrieveFiltersParams(self, params, hx__VNode){
    const parameters=[];
    params.forEach((text)=>{
      const value=_$runModelBind(self, text.trim(), hx__VNode);
      parameters.push(value);
    })
    return parameters;
  }
  function _$runModelBind(self, ref, hx__VNode, returnRef=false){
    let value;
    try{
      value=_Evaluate_THIS( isHouxBuild(self) ? self.$$publicModel : isModelInstance(self) ? self : {}, ref, self, isHouxVNode(hx__VNode) ? hx__VNode?.LabContext : isPObject(hx__VNode) ? hx__VNode : {} ) ;
    } catch(err){
        if(!returnRef){
          $Debug(`Accessor Error::\n\n"${ref}" property value was accessed during render, but not initialized on model or is undefined\n\nat at\n ..."${ref}" property \n\n${err}`, self, true);
          $Debug(err);
          return;
        }else  return ref
    }
    return value 
  }
  const hasFilterInstance=(self, name)=>_mapValue(BUILT_IN_FILTERS, name) || _mapValue(self[$$$register].filters, name);
  const normalize_Filter=(self, name)=>hasOwn(BUILT_IN_FILTERS, name) ? BUILT_IN_FILTERS[name] : self[$$$register].filters[name] || pass;
  const BUILT_IN_FILTERS={
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
  function $Filter_HelpersService(self, value, filters,hx__VNode){
    if(filters.trim() || isEmptyStr(filters.trim())) return value 
    const modifiers=filters.split('|');
    filters=modifiers.shift().trim().split('.');
    if(!len(filters)) return  value;
    let index=0;
    for(const filter of filters.values()){
      index++;
      let name=filter.trim() ||  null;
      if(name && isEQ(index, 1) && !isEmptyStr(name) && !name.startsWith('%')){
        $Debug(`Failed Filter helper call\n\n filter names are recognised by prepending a single "percentage(%)" character to the initiale filter name in the chain`,self, true);
        return;
      }
      name=isEQ(index, 1) ? name.slice(1) : name;
      if( name && !hasFilterInstance(self, name)) {
        $Debug(`Unrecognized  filter name "${name}"\n\n if this is a custom filter, make sure it's registered through the local filter option or global prototype method`,  self, true);
        return;
      }
      const filterInstance=normalize_Filter(self, name);
      if(!_validateType(filterInstance, [Function, Object])){
        $Debug(`${name} filter receives and Invalid type definition\n\nExpects a filter function or an object type exposing a filter method which acts as the filter function itself`, self, true);
        return;
      }else if(isPObject(filterInstance)){
        if(!hasProp(filterInstance, 'filter')){
          $Debug(`"${name}" filter instance object does not expose a "filter" method which acts as the filter function`, self, true);
          return;
        }else if(!isPFunction(filterInstance.filter)){
          $Debug(`"${name}".filter instance filter property value is not a method/callable  \n\n Expects a function type which acts as the filter function`, self, true);
          return;
        }
      }
      const filterCallback=isPObject(filterInstance) ? filterInstance.filter : filterInstance;
      try{
        value=filterCallback(value, modifiers, hx__VNode);
        value = [ value ]
      }catch(error){
        $Debug(`Encountered an error when running the filter callback ${name}`, self, true);
        $Debug(error, self);
        return;
      }
    }
    return value
  }
  function _Compiler_Call(self, str, vnode, hx__VNode){
    const pattern=/__\$ref\((.*?)\)__/g;
    let link;
    if(str.match(pattern)) {
      str=str.replace(pattern, (match, text)=>{
        text=text.trim();
        link=text;
        try{
          let name=text;
          text=_$runModelBind(self, text, hx__VNode);
        } catch(err){
          $Debug(`accessor Error\n\n "${text}" property was accessed on build, but not defined on build model\n\n ${err}`, self, true);
          ;return ;
        }
        return text;
      })
    }
    return str;
  }
  const HouxDirectives="if,else,else-if,html,text,for,raw,ref,slot,model,hx,bind,on,scoped,fall,animation,transition,clone";
  const widgetPassableDirectives="html,text,scoped,if,else,else-if,for,ref,slot,bind,on,clone"
  const autoBindedDirectives="model,for,ref,bind,on,clone"
  const NodeBasedDirectives="html,text,raw,model,scoped,ref,if,else,else-if,slot,bind,on,clone";
  const buildUsableDirectives="html,text,ref,slot,on,scoped,model,clone";
  const isHyperscriptDirective=dir=>_mapValue(buildUsableDirectives, dir);
  const cond_Directives="if,else-if,else";
  const isHouxDirective=dir=>_mapValue(HouxDirectives, dir);
  const isNodeBaseDirective=dir=>_mapValue(NodeBasedDirectives, dir);
  const validIdentifierRegex=/([...]*[\w\d]+)/g;
  function trackExistentDextructureNamespace(self, syntaxes){
    const register= new Tuple();
    const newSyntaxRecord=[]
    let rIndex=0;
    for(let [index, syntax] of syntaxes.toReversed().entries()){
      let setup=syntax;
      syntax=syntax.replace(validIdentifierRegex, (match, valId)=>{
        valId=hasSpread_bind(valId) ? valId.slice(3) : valId;
        if(register.has(valId)){
          setup=setup.replace(new RegExp(`${valId}`), (m, v)=> v)
        }else register.add(valId)
      })
      newSyntaxRecord.unshift(setup)
      rIndex++
    }
    return newSyntaxRecord;
  }
  function _Evaluate_THIS(obj, str, self, optional){
  // Use a regular expression to match statements or multiple expressions
    const statementRegex = /^(?:let|var|const|if|for|while|do|switch|else|else-if|await|break|case|yield|with|catch|continue|debugger|void|try|import|throw|finally|exports|do|delete|return|throw|delete|;).*$/;
    /*=|\+\+|\+=|--|-=|\*|\*=|\.\.|\/\/|\/\*|\*\*|\[=|==\+|\/=|%=\*\*=|&&=|\|\|=|<=|>=|\\|*/
    if (statementRegex.test(str) && !passableBlock(str)) {
      throw new Error(`Invalid expression: \n\n"${str}" Your binding seems to contain an unallowed expression a a statement\n Only single expressions are allowed.`, self, true);
    }// Use a regular expression to remove comments from the expression by using string .replace regex method
    const commentRegex = /\/\/.*$|\/\*[^]*?\*\//g;//comment matching regular expression
    const expressionWithoutComments = str.replace(commentRegex, '');// Use a regular expression to match any remaining unsupported constructs and statement keywords
    // const unsupportedRegex = /(?:\.\.|\/\/|\/\*|\*\*|\[=|==\+|-\+|\+=|\-=|\*=|\/=|%=\*\*=|&&=|\|\|=|<=|>=|\breturn\b|\bthrow\b|\bfunction\b|\bnew\b|\btypeof\b|\bdelete\b|\binstanceof\b|\bvoid\b|\bnull\b|\bundefined\b|\bconst\b|\blet\b|\bvar\bclass\b)/;
    const unsupportedRegex = /(?:\.\.|\breturn\b|\bthrow\b|\bdelete\b|\bvoid\b|\bconst\b|\blet\b|\bvar\b)/;
    if (unsupportedRegex.test(expressionWithoutComments)) {
      throw new Error(`Invalid expression: \n\nUnsupported constructs are not allowed.\n\n"${expressionWithoutComments}"`, self, true);
    }
    let dexTransform;
    if(optional && isPObject(optional) && hasOwn(optional, $$dexTransformKey)){
      dexTransform=optional[$$dexTransformKey];
      let syntaxArray=dexTransform.syntaxArray;
      syntaxArray = trackExistentDextructureNamespace(self, syntaxArray)
      dexTransform.traverse=()=>transformDestructureContext(syntaxArray, dexTransform.sourcesArray, str, [obj, optional]);
    }
    const getValue = new Function('obj','$$$ctx','dexTransform', `
      with(obj){
        with($$$ctx){
          return dexTransform ? dexTransform.traverse()  : ${str.trim() || "undefined" };
        }
      }
    `);
    let value;
    try{
      value = getValue.call(obj, obj, isPObject(optional) ? optional : {}, dexTransform);
    }catch(error){
      throw new  Error(error);
    }
      return value;
  }
  function transformDestructureContext(props, sources, vv, metrics=[]){
    const traverse =Function('obj', '$$$ctx',`
      with(obj){
        with($$$ctx){
          return function trasform(${props.join(",")}){
            return ${vv}
          }
        }
      }
    `)
    const [obj={}, $$$ctx={}]=metrics;
    return traverse.call(obj, obj, $$$ctx )(...sources);
  }
  function withFallThrough(fn){
    return new fallThrough(fn);
  }
  function _DynamicAttrNameResolver(self, attr, hx__VNode, isRerender, patchFlags, metrics){
    let iniAttr=attr;
    attr= fall_AttrName(attr) ;
    const pattern=/\[(.*?)\]/;
    if(pattern.test(attr)){
      const matches=attr.match(pattern);
      let name=''
      let subscribers;
      [ subscribers, attr ] = effectDependencyTracking(self, function(){
        return matches[0].replace(pattern, (match, text)=>refUnwrap(_$runModelBind(self.$$publicModel, text, hx__VNode, true)));
      });
      if(len(subscribers) && !isRerender){
        
      }else if(isRerender){
        
      }
    }
    if(!isString(attr)){
      $Debug(`Unexpected value at "${iniAttr}" as dynamically evaluated prop name binding is not a valId prop string`);
      return iniAttr;
    }
    if(hx__VNode) hx__VNode.PATCH_FLAGS.add('ELEMENT_ATTRIBUTES');
    return iniAttr.replace(pattern, function (match, space){
      return attr;
    });
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
  function get_Object_Value(obj, path, check=false){
    const processor=Function('obj','check',`
      let value;
      try{
        value= obj.${path}
      }catch(err){
        if(check) throw new Error(err)
        return
      }
      return value;
    `)
    return processor(obj, check);
  }
  const accessorsRegex=/[.[\]]/;
  const dynamicAccessorsRegex=/(\[(.*?)\])/g;
  function object_Has_Path(obj, str, getRes) {
    let res=false;
    let value=obj
    if ((!isEmptyStr(str) ? accessorsRegex.test(str) : false)) {
      const navigation = str.split('.');
      for (const key of navigation) {
        if(dynamicAccessorsRegex.test(key)){
          let shouldBreak=false;
          let access=[];
          let match=key.replace(dynamicAccessorsRegex, (match, p1, internal)=>{
            internal=Number(internal)
            if(!isNaN(internal)) access.push(internal)
            return ""
          })
          if(shouldBreak && !res) {
            return false
          }
            if(!value) return false
            if(!isEmptyStr(match)) value = value[match];
            if(len(access)) {
              for(let [index, keys ] of access.entries()){
                if( !_validateType(value, [ Object , Array, Function]) && isTrue(isArray(value) && isNaN(Number(keys))) && isGT(Number(keys)+1, len(value) ) ) return false
                value=value[keys];
              }
            }
        }else if (!hasOwn(value||{}, key)) return false;
        else {
          value = value[key];
          res=true;
        }
      }
    } else {
      if (!hasOwn(obj, str)) return false;
      else {
        value=value[str]
        return true
      }
    }
    return res;
  }
  function set_Object_Value(obj, path, value, check=false){
    const processor=Function('obj','value','check','metrics',`
      try{
        const [ isRef, get_Object_Value, debug ] = metrics;
        const initVal=get_Object_Value(obj, "${path}" );
        if(isRef(initVal)) obj.${path}._data=value;
        else obj.${path}=value;
      }catch(err){
        if(check) $Debug(err)
        return err
      }
      return obj;
    `)
    return processor(obj, value, check, [isRef, get_Object_Value, $Debug]);
  }
  function get_Prop_Path(obj, prop) {
    const stack = [{ 
      object: obj, 
      path: '' 
    }];
    while (isGT(len(stack)  ,0)) {
      const { object, path } = stack.pop();
      for (const [key, value] of getIterator(object)) {
        const currentPath = path ? `${path}${ isPObject(object) ? '.' : '[' }${key}${isArray(object) ? ']' : ''}` : key;
        prop = isNumber(key) ? ( isNaN(Number(prop) ) ? prop : Number(prop ) ): prop ;
        if (isEQ(key, prop)) return currentPath;
        if (_validateType(value, [Object, Array ])) stack.push({ 
          object: value, 
          path: currentPath 
        });
      }
    }
    return null;
  }
  function _toCamelCase(str) {
    return str.replace(/-+([a-zA-Z])/g, (match, letter) => letter.toUpperCase());
  }
  function _ToPascalCase(str){
    const camelCase=_toCamelCase(str);
    return camelCase.at(0).toUpperCase()+camelCase.slice(1);
  }
  function _to_kebab_case(str) {
    return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
  }
  function mapClassTypeTransform(item, transpiled){
    if(isPObject(item)){
      entries(item).forEach(([key, value])=>{
        value=refUnwrap(value)
        if(value || isString(value)) {
          key.split(' ').values().forEach((val)=>{
            transpiled.add(val);
          })
        }
      })
    }else if(_validateType(item, [Array, Set, Tuple]) || isArgument(item)){
      for(let value of item.values()){
        mapClassTypeTransform(value, transpiled);
      }
    }else if(isString(item)){ 
      item.split(' ').values().forEach((val)=>{
        transpiled.add(val);
      })
    }
    return transpiled.list();
  }
  function resolveDiffing(class1, class2){
    if(deepEqualityCheck(class1, class2)) return [];
    for(let [key, index] of getIterator(class1)){
      
    }
  }
  function parse_Class_Binding(self, item, element, isRerender, patch, hx__VNode){
    const is_hyperscript=hx__VNode.is_hyperscript;
    item=refUnwrap(item);
    if(isRerender && (!is_hyperscript && patch?.evaluatedValue ? deepEqualityCheck( patch.evaluatedValue(), item) : !patch.evaluatedValue ? true : is_hyperscript) ) return;
    const transform=mapClassTypeTransform(item, new Tuple());
    const initValTranspile=isRerender ? mapClassTypeTransform(patch.evaluatedValue(), new Tuple() ) : null ;
    if(isRerender){
      for(let [index, cls] of initValTranspile.entries()){
        cls = refUnwrap(cls)
        if(!transform.includes(cls) && element.classList.contains(cls)) {
          toggleClassNames(element, cls, true);
        }
      }
      patch.observer.mutated=true
      hx__VNode.VNodeManager.patchFlags.PropFlags[patch.key].evaluatedValue=() =>transform.join(' ')
    }
    for(let [index, cls] of transform.entries()){
      cls=refUnwrap(cls)
      if(!element.classList.contains(cls)) {
        toggleClassNames(element, cls);
      }
    }
  }
  function toggleClassNames(element, classes, remove=false){
    const toggler=isTrue(remove) ? 'remove' : 'add';
    classes.split(' ').forEach((cls)=>{
      if(cls)  element.classList[toggler](cls);
    })
  }
  function compileStyleProps(self, item, styleProps, element){
    if(isPObject(item)){
      entries(item).forEach(([key, style])=>{
        if(!isString(refUnwrap(style))){ 
          $Debug(`Unrecognized stype property value \n\nat at\n "${key}" style property\n\n${element.outerHTML}`, self, true); 
        return;
        }
         styleProps[_toCamelCase(key)]=style;
      })
    }else if(isArray(item)){
      for(const value of item.values()){
        compileStyleProps(self, value, styleProps, element)
      }
    }else if(isString(item)){
      let splited=item.trim().split(';');
      for(let styling of splited.values() ){
        if(styling && styling.includes(':')){
          const spread=styling.split(':');
          styleProps[spread[0]]=spread[1];
        }
      }
    }
    return styleProps;
  }
  function parse_Style_Binding(self, item, element, isRerender, patch, hx__VNode){
    const styleProps=compileStyleProps(self, item, {}, element);
    const is_hyperscript=hx__VNode.is_hyperscript
    const prevStyles={};
    if(isRerender && !is_hyperscript) {
      compileStyleProps(self, patch.evaluatedValue(), prevStyles);
      for(const [ prop, style] of entries(prevStyles)){
        if(!hasOwn(styleProps, prop) || !isEQ(refUnwrap(style), refUnwrap(styleProps[prop])) || !isEQ(element.style[prop], refUnwrap(style))) {
          element.style[prop]=""
          patch.observer.mutated=true
        }
      }
    }
    for(let [ prop, style ] of entries(styleProps)){
      style=refUnwrap(style)
      if(isTrue(isRerender && (!hasOwn(prevStyles, prop) || !isEQ(style, prevStyles[prop])) ) || !isRerender) {
        element.style[prop]=style;
      }
    }
    if(isRerender && !is_hyperscript) {
      patch.observer.mutated=true
      hx__VNode.VNodeManager.patchFlags.PropFlags[patch.key].evaluatedValue=() => item;
    }
  }
  function fall_AttrName(key, attr){
    const Key_Binding={ 
      '*':1, 
      '@':1, 
      '...':3, 
      "$$" : 2
    };
    if( !isString(key) && !key.trim() && hasSpecialCharacters(attr)) return key ;
    for(const [ky, sl] of entries(Key_Binding)){
      if(key.startsWith(ky)){
        if(has$$_bind(key)){ 
          key=key.split(':')
          key.shift();
          return key.join(':')
        }
        return key.slice(sl);
      }
    }
    return key;
  }
  function isOnListener(key){
    return exists(key) && isString(key) && /^on[A-Z]+\w+$/.test(key);
  }
  function directive_sep(key){
    return key.includes(':') ? key.split(':') : [key]
  }
  function elementObserverWatch(self, element){
    function callback(list, observer){
      for(const mutation of values(list)){
      }
    }
    const observer= new MutationObserver(callback);
    observer.observe(element, { 
      attributes: true,
      childList: true, 
      subtree: true 
    })
  }
  function element_Attribute_Manager(props, element, self, hx__VNode, metrics, patchFlags){
    let { key, is_hyperscript, attr, isRerender, illegal, patch } = metrics ;
    let hasBind=false;
    if(illegal(key)){
      $Debug(`Illegal binding not allowed in build function mode\n\n"${key}" property has a disallowed binding directive property`);
      return element;
    }
    let $orgKey=key;
    if(!is_hyperscript){
      key=_DynamicAttrNameResolver(self, key, hx__VNode, isRerender, patchFlags, metrics);
      if(hasAsterisks_bind(key)) {
        key='$$bind:'+key.slice(1);
        hasBind=true
      }else if(hasAt_bind(key)) key='$$on:'+key.slice(1);
      hx__VNode.PATCH_FLAGS.add('ELEMENT_ATTRIBUTES')
    }
    if(has$$_bind(key)){
      let modifiers=key.includes('|') ? key.split('|') : [];
      key=len(modifiers) ? modifiers.shift() : key;
      modifiers = new Set(modifiers);
      if(isHouxDirective(directive_sep(key)[0].slice(2)) &&  !is_hyperscript) {
        element=_Resolve_Builtin_Directives(self, key, attr, element, hx__VNode, modifiers, patchFlags, { 
          [activeFlagInstanceKey]:$orgKey,
          is_hyperscript,
          isRerender,
          patch,
        } );
      }else if(!is_hyperscript) {
        element=_Resolve_Custom_Directives(self, key, attr, element, hx__VNode, modifiers);
      }
      hx__VNode.PATCH_FLAGS.add('ELEMENT_ATTRIBUTES')
    }else if(isHTMLBooleanAttributes(key)) {
      BooleanAttributesManager(element, key, attr, { isRerender, is_hyperscript }, patch, hx__VNode);
    }else if(isHTMLIDLAttributes(key)){
      IDLPropsTransform(self, { key, attr}, element, isRerender, patch, hx__VNode )
    }else if(isEQ(key, 'class')) {
      parse_Class_Binding(self, attr, element, isRerender, patch, hx__VNode);
    }else if(hasSpread_bind(key, true ) && !is_hyperscript){ 
      return Attribute_Spread(self, key, element,  hx__VNode, { isRerender, is_hyperscript }, patch );
    }else if(isOnListener(key)) {
      attr=refUnwrap(attr)
      if(!isPFunction(attr)){
        $Debug(`on<EventName> listener expects a function value\n\nFound "${attr}`, self, !isNull(self));
      }else{
        const options=attr.options || {};
        const events=_to_kebab_case(key).split('-');
        events.shift();
        $$dir_ON(self, attr, element, hx__VNode, events, []);
      }
    }else if(is_hyperscript && isEQ(key, dir$$__render)){
      justifyHyperscriptDirectiveBuffer(self, refUnwrap(attr()),  element, hx__VNode, isRerender, patch);
      delete props[key];
    }else{
      try{ 
        element.setAttribute(key, compileToRenderable(refUnwrap(attr)));
      }catch(err){
        $Debug(`Attribute Error::\n\n...unable to set node attribute "${key}\n\n ${err}`, self, true, `When setting the attribute "${key}" on "${element.outerHTML}"`, self, !is_hyperscript );
        return element;
      }
    }
    return element
  }
  function IDLPropsTransform(self, props, element, isRerender, patch, hx__VNode ){
    const { key, attr } = props;
    const is_hyperscript=hx__VNode.is_hyperscript
    if(isEQ(key, 'style')) return parse_Style_Binding(self, attr, element, isRerender, patch, hx__VNode);
    if(!isRerender || !is_hyperscript ? !deepEqualityCheck(patch?.evaluatedValue(), attr) : true) element[key]=attr ;
    if(isRerender && !is_hyperscript ? !deepEqualityCheck(patch?.evaluatedValue(), attr) : false ){
      patch.observer.mutated=true;
      hx__VNode.VNodeManager.patchFlags.PropFlags[patch.key].evaluatedValue=() => attr;
    }
  }
  function ElementPropsCompiler(props, element, self, hx__VNode, isRerender=false, patch){
    if(!isPObject(props)) return element;
    const is_hyperscript= self ? self[$$$core].map.is_hyperscript : hx__VNode ? hx__VNode.is_hyperscript : true;
    const illegal=prop=>is_hyperscript && isTrue(hasAsterisks_bind(prop) || has$$_bind(prop) || hasAt_bind(prop))
    const patchFlags={ 
      isHoisted:false, 
      subscriptions:[] ,
    }
    let propsIndex=0
    entries(refUnwrap(props)).forEach(function([key, attr ]){
      element=element_Attribute_Manager(props, element, self, hx__VNode, { key, attr, isRerender, is_hyperscript, illegal, patch }, patchFlags ) ;
      propsIndex++
    })
    if(!patch) return element;
    if(len(patchFlags.subscriptions) && !isRerender) {
      patchFlags.subscriptions.forEach((sub)=>{
        hx__VNode.VNodeManager.patchFlags.subscriptions.push(sub)
      })
    }
    if(isFalse(hx__VNode.VNodeManager.patchFlags.isHoisted) && !isRerender) hx__VNode.VNodeManager.patchFlags.isHoisted=patchFlags.isHoisted;
     return element;
  }
  function specialPropsPrefix(self, props, element, hx__VNode){
    
  }
  function justifyHyperscriptDirectiveBuffer(self, directives, element, hx__VNode, isRerender, patch){
    for(const buff of directives.values()){
      let { name, value, modifiers }=buff;
      if(isHyperscriptDirective(name)) callHDir(self, buff, element, hx__VNode );
    }
  }
  function callHDir(self, direct, element, hx__VNode, metrics){
    let { modifiers, name }= direct;
    modifiers = new Set(modifiers)
    if(isHouxDirective(name) && !isHyperscriptDirective(name)){
      $Debug(`can't trigger a directive batch on the "${name}" directive`, self, true);
      return;
    }else if(!isHyperscriptDirective(name)){
      if(!hasProp(self[$$$register].directives||{})){
        $Debug(`unresolve directive name passed to batch\n\n"${name}" is not defined\nMake sure this is registered globally/localy through this widget instance thread`, self, true, "during resolving of the 'batch' object");
        return;
      }else pass
    }else if(isEQ('html', name) || isEQ('text', name)) $$dir_HTML(self, direct.value, element, hx__VNode, isEQ('text', name), modifiers);
    else if(isEQ('slot', name)) $$dir_SLOT(self, direct.value, element, hx__VNode, modifiers);
    else if(isEQ('on', name)) $$dir_ON(self, direct.value, element, hx__VNode, modifiers);
    else if(isEQ('scoped', name)) $$dir_SCOPED(self, direct.value, element, hx__VNode, modifiers);
    else if(isEQ('ref', name)) $$dir_REF(self, direct.value, element, hx__VNode, modifiers);
    else if(isEQ('model', name)) $$dir_MODEL(self, direct.value, element, hx__VNode, modifiers, metrics);
    else if(isEQ(name, 'transition')) $$dir_TRANSITION(self, attr, element, hx__VNode, key, modifiers)
    else if(isEQ(name, 'animation')) $dir_ANIMATION(self, attr, element, hx__VNode, key, modifiers)
    else if(isEQ(name, 'clone')) $$dir_CLONE(self, attr, element, hx__VNode, key, modifiers)
    // else if(isEQ('fall', name)) $$dir_FALL(self, direct.value, element, hx__VNode,modifiers );
  }
  function BooleanAttributesManager(vnode, key, attr, metrics, patch, hx__VNode){
    const $orgKey=metrics[activeFlagInstanceKey];
    const { is_hyperscript, isRerender}=metrics;
    let prevQuery;
    let contact;
    if(isRerender){
      prevQuery=refUnwrap(patch.evaluatedValue());
      contact=attr
    }
    attr=refUnwrap(attr)
    if(exists(attr) || isString(attr)) {
      if (isHTMLIDLAttributes(key)) {
        vnode[key]=attr;
      }else {
        vnode.setAttribute(key, attr||'');
      }
    }else if(!exists(attr) && !isString(attr) && isRerender && (exists(prevQuery) && !isString(prevQuery))){
      if(isHTMLIDLAttributes(key) && hasOwn(vnode, key)) {
        vnode[key]="";
      }else {
        vnode.removeAttribute(key);
      }
    }
    if(isRerender && !deepEqualityCheck(prevQuery, attr)){
      hx__VNode.VNodeManager.patchFlags.PropFlags[patch.key].evaluatedValue=() => contact;
      patch.observer.mutated=true
    }
  }
  function Attribute_Spread(self, data, vnode, hx__VNode, metrics, patch){
    const { is_hyperscript, isRerender } = metrics;
    const $orgKey=metrics[activeFlagInstanceKey];
    let prevValue;
    if(isRerender){
      prevValue=patch.evaluatedValue();
    }
    let value;
    let subscribers;
    [ subscribers, value ]= effectDependencyTracking(self, function(){
      return isString(data) ? _$runModelBind(self, data.slice(3).trim(), hx__VNode) : data;
    })
    if(!isPObject(refUnwrap(value))){
      $Debug(`spread syntax on hx__VNode can only accept binded values of an object`, self, true);
      return vnode;
    }
    if(isRerender && !deepEqualityCheck(value, prevValue)){
      for(const [key, val] of entries(value)){
        if(!hasOwn(prevValue, key) || !deepEqualityCheck(val, prevValue[key])){
          if(shouldUpdateProp(key)) ElementPropsCompiler({ [ key ] : val }, vnode, self, hx__VNode);
        }
      }
      hx__VNode.VNodeManager.patchFlags.PropFlags[patch.key].evaluatedValue=() => value;
      patch.observer.mutated=true
    }else{
      vnode = ElementPropsCompiler({ ['$$bind']:value }, vnode, self,  hx__VNode, isRerender, patch  );
      if(len(subscribers) && !is_hyperscript){
        VirtualizePropTick(hx__VNode, $orgKey, "", [ data.slice(3), value], subscribers );
      }
    }
    return vnode;
  }
  function _With_Custom_Directives(self, data, vnode, hx__VNode, modifiers){
    let { key, attr } = data || {};
    attr =bindKeyAsValue(key, attr);
    let value=_$runModelBind(self, attr, hx__VNode, true)
    let has_modifiers=len(modifiers) ? true : false;
    let Name=directive_sep(key)[0].slice(2);
    if( !hasOwn(self[$$$register].directives, Name )){
      $Debug(
        `((Undefined Directives Reference))\n\n "${key}" directive is not a registered houx directive on this widget\n\nat...........at>>>.\n ${vnode.outerHTML}`
      , self, true, "during directive resolving"  );
      return vnode;
    }
    const directive= self[$$$register].directives[Name];
    const CustomDir ={ 
      init:pass, 
      destroyed:pass,
      created:pass, 
      updated :pass,  
      mounted :pass
    };
    if(isPFunction(directive)) CustomDir.created=directive;
    else if(isPObject(directive) ){
      if( !has_Intersect_Prop(directivesHooksMap.split(','), keys(directive))) {
        $Debug(`((Directive Error))\n\ndirective object does not define any of widget Directive hook.\n  "created/mounted/updated/init/destroyed" method`, self, true); 
        return vnode;
      }else{
        for(const [ name, hook] of  entries(directive)){
          if(new Set(directivesHooksMap.split(',')).has(name)){
            if(!isPFunction(directive[name])){
              $Debug(`((Custom direction))\n\ncustom Directive "${Name}" ${name}  hook is not a function`,self, true);
              return vnode;
            }else {
              const Obj_Modifier={};
              if(len(modifiers)){
                for(const val of modifiers.values()){
                  Obj_Modifier[val]=val;
                }
              }
              hook[lifeCiycleBinding]={
                modifiers:Obj_Modifier,
                dirName:Name,
                value
              }
              CustomDir[name]=hook;
            }
          }
        }
      }
    }
    if(!isNativeElement(vnode) && validHouxWidget(vnode)){
      define(vnode, $$$customDirs,{ value:{
        init_hook:new Tuple(), 
        created_hook:new Tuple(),
        mounted_hook:new Tuple(),
        updated_hook:new Tuple(),
        destroyed_hook:new Tuple()
      }, enumerable, configurable });
    }
    for(let hook of directivesHooksMap.split(',').values()){
      if(CustomDir[hook] && !isPass(CustomDir[hook])) {
        if(isNativeElement(vnode) && !validHouxWidget(vnode)){
          if(isEQ(hook, 'init')) continue;
          hx__VNode.VNodeManager.LifeCycleHooks[hook+'_hook'].add(CustomDir[hook]);
        }else if(validHouxWidget(vnode)) vnode[$$$customDirs][hook+'_hook'].add(CustomDir[hook]);
      }
    }
    return vnode;
  }
  function isPass(func){
    return isPFunction(func) && isEQ(func.name,'pass') && hasOwn(func, $passKey);
  }
  function _Resolve_Custom_Directives(self, key, attr, vnode, hx__VNode, modifiers){
    return _With_Custom_Directives(self, { key, attr}, vnode, hx__VNode, modifiers);
  }
  function _Run_With_Modifiers(vnode, modifiers, func, events, runImmediately=true){
    if(!isFunction(func)){
      $Debug(`"${key}" event Callback must be passed as  a function \n \n${func } is not a valid event callback  method`, self, true);
      return;
    }
    modifiers=isArray(modifiers) ? new Set(modifiers) : modifiers;
    const options=createObj('options');
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
    const [ func, options ]=Data;
    if(len(options)) func.options=options;
    return func;
  }
  function bind_directive_receiver(self, props, vnode, hx__VNode, modifiers, patchFlags, metrics){
    const $orgKey=metrics[activeFlagInstanceKey];
    const { isRerender, patch, is_hyperscript } = metrics
    let { item, key }=props;
    item=isOnListener(key) && !is_hyperscript && isString( item) && isContextMethodString(self, hx__VNode, item) ? item : isOnListener(key) && !is_hyperscript ? `()=>{ ${ item } }` : item ;
    let trasform; 
    let subscribers;
    [ subscribers , trasform] = effectDependencyTracking(self, function(){
      return isString(item) ? _$runModelBind(self, item||'', hx__VNode ) : item ;
    })
    if( len(subscribers) && !is_hyperscript && !isRerender ) {
      patchFlags.isHoisted=(true);
      subscribers.forEach((sub)=>{
        patchFlags.subscriptions.push(sub);
      })
      VirtualizePropTick(hx__VNode, $orgKey, key, [ item, trasform ], subscribers)
    }
    trasform=refUnwrap(trasform)
    // if(isUndefined(trasform)) trasform='';
    if(!key){
      if (!isPObject(trasform)) $Debug(`Directive attributes binding expects an objects value when not chained to any attribute/property argument`, self, true);
      else return ElementPropsCompiler(trasform, vnode, self, hx__VNode, isRerender, metrics.patch);
    }else return ElementPropsCompiler({ 
      [key]:trasform 
    }, vnode, self, hx__VNode, isRerender, patch );
    return vnode;
  }
  function bindKeyAsValue(keys, value){
    if(isEmptyStr(value) ||  !value){
      const sep=directive_sep(keys)
      const lastAttr=len(sep) ? sep.pop() : value;
      return has$$_bind(lastAttr) ? lastAttr.slice(2) : lastAttr
    }else return value;
  }
  function $$dir_HTML(self, value, vnode, hx__VNode, text, modifiers, metrics={} ){
    const $orgKey=metrics[activeFlagInstanceKey];
    const is_hyperscript=hx__VNode.is_hyperscript;
    const item=value;
    let subscribers;
    const runBinding= ()=> _$runModelBind(self, value, hx__VNode, !modifiers.has('bind'))
    if(!is_hyperscript) {
      [ subscribers, value ] = effectDependencyTracking(self, function(){
        return runBinding()
      } )
    }else value= runBinding();
    value=refUnwrap(value)
    const innerProp=isTrue(text) ? 'innerText' : 'innerHTML';
    if( isPrimitive(value)) {
      if(!isNativeElement(vnode) && value)  self.$$publicModel.$attrs[innerProp]=value;
      else if(value) vnode[innerProp]=value;
    }
    if(!is_hyperscript && len(subscribers) && !metrics.isRerender){
      VirtualizePropTick(hx__VNode, $orgKey, innerProp, [ item, value], subscribers );
    }
  }
  function $$dir_SLOT(self, item, vnode, hx__VNode, modifiers){
    try{
      get_Object_Value(self.$$publicModel, item, true);
    }catch(err){
      $Debug(err);
    }
    const iswt=!isNativeElement(vnode)
    let value=_$runModelBind(self, item, hx__VNode, !modifiers.has('bind'));
    value=refUnwrap(value)
    if(!isString(value)){
      $Debug(`value Error::\n\n slot name undefined or is not a string\n\n Error resolving slot  directive name reference on "${iswt  ?  self[$$$ownProperties].name : vnode.localName}"`, self, true);
      return;
    }
    if(!iswt) hx__VNode.slot_name=value;
    else vnode.$attributes[$$slotName]=value;
  }
  function $$dir_BIND(self, prop, el, hx__VNode, modifiers , patchFlags , metrics){
    let { key, item }=prop;
    if(isNativeElement(el)){
      key=directive_sep(key);
      key.shift();
      key= isGT(len(key), 1) ? key.join(':') : key[0];
      return bind_directive_receiver(self,{ key, item }, el, hx__VNode, modifiers, patchFlags, metrics )
    }else widgetBindingReceiver(self, key, item, el, hx__VNode, modifiers, patchFlags, metrics)
  }
  function $$dir_ON(self, attr, node, hx__VNode, key, modifiers){
    const isWidget=!isNativeElement(node);
    if(isString(attr)){
      try{
        attr=attr.split(' ').join('').trim();
        const funcRef=attr;
        attr=_$runModelBind(self, isContextMethodString(self, hx__VNode, attr) ? attr : `()=>{${attr}}`, hx__VNode);
        attr=object_Has_Path(self.$$publicModel, funcRef) && isPFunction(attr) ? attr.bind(self.$$publicModel) : attr;
      }catch(err){
        $Debug(`${err}`, self, true);
        return node;
      }
      attr=refUnwrap(attr)
      if(!isPFunction(attr)){
        $Debug(`"${name}" event must be wrapped as or in a function \n\non.....on...\n  "${isWidget ?  '' : node.localName}" \n`, self, true);
        return node;
      }
    }
    let opts;
    const events=isArray(key) ? key : has$$_bind(key) ? key.slice(5).split('.') : key.split('.');
    if(len(modifiers)) {
      if(isWidget){
        const [ attr, opts ] = _Run_With_Modifiers( null, modifiers, isFunction(attr) ? attr : pass, events, false);
      }else _Run_With_Modifiers(node, modifiers, isFunction(attr) ? attr : pass, events);
    } else {
      if(isWidget){
        if(len(events)){
          if(!node.$attributes[$$$Events]) node.$attributes[$$$Events]={};
          for( let [ ind, ev ] of events.entries()){
            define(node.$attributes[$$$Events], ev,{ value: new houxSignal(ev, attr , opts) , enumerable, configurable});
          }
        }
      }else if(len(events)){
        let index=0
        for(let event of events.values()) {
          if(!IS_VALID_EVENT_HANDLER(event)){
            $Debug(`"${event}" is not a valid event name`, self, true);
          }else node.addEventListener(event, isFunction(attr) ? attr : pass);
        }
      }
    }
    return node;
  }
  function $$dir_CLONE(self, item, vnode, hx__VNode, key, modifiers, metrics){
    const is_hyperscript=hx__VNode.is_hyperscript;
    if(!object_Has_Path(self.$$publicModel, item)){
      $Debug(`value "${item}" property value was accessed during render, but not initialized on model or is undefined\n\nat at\n ..."${name} directive on ${isWidget ? '$$clone' : vnode.localName} `,self, true);
      return;
    }
    let ref;
    let subscribers;
    try{
      if(!is_hyperscript){
        [ subscribers, ref ] = effectDependencyTracking(self, function(){
          return get_Object_Value(self.$$publicModel, item, modifiers.has('bind'));
        })
      }
      if(ref && !isNull(ref)) ref = get_Object_Value(self.$$publicModel, item, modifiers.has('bind'));
    }catch(err){
      $Debug(`There is a problem with accesding the path "${item}" property which was accessed during render, but seems not initialized on model or is undefined\n\nat at\n ..."${name} directive on ${isWidget ? '$$ref' : vnode.localName} `, self, true);
      $Debug(err)
      return;
    }
    let propPath=item;
    if(isRef(ref)){
      if(isReadonlyRef(ref)){
        $Debug(`Path provided to the $$clone directive path "${item}" resolves to a readonly ref value\n\nFailed to mutate a readonly ref......at ......."${name}"`, self, true);
        return;
      }else propPath= item+"._data"
    }
    // self.$$publicModel._deferTick(()=>{
      
    // log(vnode.outerHTML, (hx__VNode.compiler_options.Node()))
    // self[$$$operands].initialized=false;
    // const NewNode=hx__VNode.compiler_options.Node();
    // self[$$$operands].initialized=true;
    // set_Object_Value(self.$$publicModel, propPath, NewNode, true);
    // })
  }
  function $$dir_ANIMATION(self, value, node, hx__VNode, key, modifiers, metrics={}){
    const $orgKey=metrics[activeFlagInstanceKey];
    const is_hyperscript=hx__VNode.is_hyperscript;
    const item=value;
    let subscribers;
    const runBinding= ()=> _$runModelBind(self, value, hx__VNode, !modifiers.has('bind'))
    if(!is_hyperscript) {
      [ subscribers, value ] = effectDependencyTracking(self, function(){
        return runBinding()
      } )
    }else value= runBinding();
    value=refUnwrap(value)
    animateElementVnode(self, node, {
      hx__VNode,
      modifiers,
      item : value,
    });
  }
  function $$dir_TRANSITION(self, value, node, hx__VNode, key, modifiers, metrics={}){
    const $orgKey=metrics[activeFlagInstanceKey];
    const is_hyperscript=hx__VNode.is_hyperscript;
    const item=value;
    let subscribers;
    const runBinding= ()=> _$runModelBind(self, value, hx__VNode, !modifiers.has('bind'))
    if(!is_hyperscript) {
      [ subscribers, value ] = effectDependencyTracking(self, function(){
        return runBinding()
      } )
    }else value= runBinding();
    value=refUnwrap(value)
    transitElementVnode(self, node, {
      hx__VNode,
      modifiers,
      item : value,
    });
  }
  function $$dir_REF(self, item, node, hx__VNode, modifiers, metrics){
    const $orgKey=metrics[activeFlagInstanceKey];
    const isWidget=!isNativeElement(node);
    const is_hyperscript=hx__VNode.is_hyperscript;
    if(!object_Has_Path(self.$$publicModel, item)){
      $Debug(`value "${item}" property value was accessed during render, but not initialized on model or is undefined\n\nat at\n ..."${name} directive on ${isWidget ? '$$ref' : vnode.localName} `,self, true);
      return;
    }
    let ref;
    let subscribers;
    try{
      if(!is_hyperscript){
        [ subscribers, ref ] = effectDependencyTracking(self, function(){
          return get_Object_Value(self.$$publicModel, item, modifiers.has('bind'));
        })
      }else ref = get_Object_Value(self.$$publicModel, item, modifiers.has('bind'));
    }catch(err){
      $Debug(`There is a problem with accessing the path "${item}" property which was accessed during render, but seems not initialized on model or is undefined\n\nat at\n ..."${name} directive on ${isWidget ? '$$ref' : vnode.localName} `, self, true);
      $Debug(err)
      return;
    }
    let propPath=item;
    if(isRef(ref)){
      if(isReadonlyRef(ref)){
        $Debug(`Path provided to the $$ref directive path "${item}" resolves to a readonly vale`, self, true);
        return;
      }else propPath= item+"._data"
    }
    if(node && isWidget) {
      node.$attributes[$$$$dir__ref$$$$]=propPath;
    }else if(node) hx__VNode.compiler_options['dir--ref']=propPath;
    if(!is_hyperscript && len(subscribers) && !metrics.isRerender){
      VirtualizePropTick(hx__VNode, $orgKey, $$$$dir__ref$$$$, [propPath, isWidget ? hx__VNode.widget_instance : node], subscribers);
    }
  }
  function $$dir_SCOPED(self, item, node, hx__VNode, modifiers, metrics){
    const $orgKey=metrics[activeFlagInstanceKey];
    const isStyleEl=isNativeElement(node) && isEQ(node.localName, 'style');
    if(!isStyleEl) {
      $Debug(`"$$scoped" directive is only scoped to document <style> elements only`, self, true);
      return node;
    }
    let subscribers;
    let value;
    const runBinding= ()=>_$runModelBind(self, item, hx__VNode, !modifiers.has('bind'));
    if(!is_hyperscript){
      [ subscribers, value] = effectDependencyTracking(self, function(){
        return runBinding();
      })
    }else value=runBinding();
    const unwraped=refUnwrap(value);
    if(isFalse(unwraped) || isNull(unwraped)) return node;
    node.innerHTML=_styleSheet_hydration(self, node.innerHTML);
    if(!is_hyperscript && len(subscribers) && !metrics.isRerender){
      VirtualizePropTick(hx__VNode, $orgKey, scopedDirKey , [ item, value], subscribers );
    }
    return node;
  }
  function $$dir_FALL(self, item, node, hx__VNode, modifiers){
    const isWidget=!isNativeElement(node) && validHouxWidget(node);
    const is_hyperscript=hx__VNode.is_hyperscript
    if(!isWidget) {
      $Debug(`"$$fall" directive is only scoped to widget instances vnode only\n\n found on "${isNativeElement(node) ? node.outerHTML+" element" : ""}"`, self, true);
      return node;
    }else if(!item || !isString(is_hyperscript ? refUnwrap(item) : item )) {
      $Debug(`Unrecognized reference prop passed to the "$$fall" directive`, self, true);
      return ;
    }
    node.$attributes[$$$fallThrough]=createObj('fallThrough', { prop:item});
    return node;
  }
  function $$dir_MODEL(self, item, node, hx__VNode, modifiers, metrics){
    let initVal='';
    try{
      initVal=get_Object_Value(self.$$publicModel, item, true);
    }catch(err){
      $Debug(`undefined reference for directive "$$model"\n\n "${item}" is not defined on widget model instance\n\n${err}`, self, true);
      return
    }
    function compileStraightModelBinding(element, failSilently=false){
      if(!Is_Form_Element(element) ){
        $Debug(`Compilation Error::\n\n cannot bind a data model to  a none form element\n\n`, self, true);
        if(failSilently) $warn("widget root element is not a form element", self);
        return;
      }
      element.value=compileToRenderable(refUnwrap(initVal));
      const eventName=get_Model_Event(element);
      if(eventName){
        element.addEventListener(eventName, function(){
          try{
            set_Object_Value(self.$$publicModel, item , element.value );
            hx__VNode.render_tracked=true;
          }catch(err){
            $Debug(`${err}`, self, true);
          }
        });
      }
      hx__VNode.patch_tracks.add({
        'model:Value':item,
        initialValue:refUnwrap(initVal),
        "parent:instance":self
      });
      if(failSilently){
        self.$$publicModel._observe(item, (newV, oldV)=>{
          if(!deepEqualityCheck(newV, oldV)){
            element.value=refUnwrap(newV);
          }
        })
      }
    }
    if(!isNativeElement(node) && validHouxWidget(node)){
      if(!node.$attributes) node.$attributes=createObj('$attributes');
      if(!hasOwn(node.$attributes, $$$ModelUpdateKey)) node.$attributes[$$$ModelUpdateKey]={};
      node.$attributes[$$$ModelUpdateKey]['resourceModel:IPAddress:Binding']=new houxSignal("resourceModel:IPAddress:Binding", compileStraightModelBinding, {});
    }else{
      compileStraightModelBinding(node)
    }
  }
  function _Resolve_Builtin_Directives(self, key, attr, vnode, hx__VNode, modifiers, patchFlags, metrics){
    let item =bindKeyAsValue(key, attr);
    let name=directive_sep(key )[0].slice(2);
    const callArgs=()=>[self, item, vnode, hx__VNode, modifiers];
    if(isEQ(name, 'bind')) vnode=$$dir_BIND(self, {key, item}, vnode, hx__VNode, modifiers, patchFlags, metrics );
    else if(isEQ(name, 'html') || isEQ(name, 'text')) $$dir_HTML(self, item, vnode, hx__VNode, isEQ(name, 'text'), modifiers, metrics);
    else if(isEQ(name, 'ref')) $$dir_REF(self,  item, vnode, hx__VNode, modifiers, metrics);
    else if(isEQ(name, 'slot')) $$dir_SLOT(self, item, vnode, hx__VNode, modifiers);
    else  if(isEQ(name, 'scoped')) vnode=$$dir_SCOPED(self, item, vnode, hx__VNode, modifiers, metrics);
    else  if(isEQ(name, 'fall')) vnode=$$dir_FALL(self, item, vnode, hx__VNode, modifiers, metrics);
    else if(isEQ(name, 'model')) $$dir_MODEL(self, item, vnode, hx__VNode, modifiers, metrics);
    else if(isEQ(name, 'on')) vnode=$$dir_ON(self, attr, vnode, hx__VNode, key, modifiers);
    else if(isEQ(name, 'transition')) $$dir_TRANSITION(self, attr, vnode, hx__VNode, key, modifiers)
    else if(isEQ(name, 'animation')) $$dir_ANIMATION(self, attr, vnode, hx__VNode, key, modifiers)
    else if(isEQ(name, 'clone')) $$dir_CLONE(self, attr, vnode, hx__VNode, key, modifiers)
    return vnode;
  }
  function animateElementVnode(self, vnode, binding){
    const { item, hx__VNode, modifiers } = binding;

  }
  function transitElementVnode(self, vnode, binding){
    const { item, hx__VNode, modifiers } = binding;
  
  }
  function get_Model_Event(vnode ){
    const tag=vnode.localName;
    const type=vnode.type;
    if(IS_ELEMENT_NODE(vnode) && Is_Form_Element(vnode)){
      if(isEQ(tag, 'input')) return _mapValue(['file'], type) ? 'change' : _mapValue(['button','submit','reset'], type) ? 'click' : _mapValue(['image','hidden'], type ) ? 'change' : 'input';
      return isEQ(tag, 'form') ? 'submit' : isEQ(tag, 'select') ? 'change' : isEQ(tag, 'textarea') ? 'input' : 'input';
    }
  }
  function _compileToStaticTemplateScarfold(self, render, recursive=false){
    render=isString(render) ? _HouxTemplateParser(render, null ) : render;
    let response;
    render = !isArray(render) ? [ render ] : render
    const NodeList=[];
    for(let build of render.values()){
      if(isPObject(build)) build=defineElement(build)
      NodeList.push(build)
    }
    return len(NodeList) && isGT(len(NodeList), 1) ? new spreadRenderFragment(NodeList) : len(NodeList) ? NodeList.pop() : "" ;
  }
  function scarfold(render){
    render=isPFunction(render) ? render() : render;
    if(!_validateType(render, [String, Object, Array, None])  && !isPrimitive(render)){
      $Debug(`Illegal value type passed to scarfold `);
      return;
    }else if(isPrimitive(render) && !isNull(render)) render=String(render);
    return _compileToStaticTemplateScarfold(this, render);
  }
  function hyperscriptElArgumentsValidator(args){
    const [ type , propsOrChildren , childrenOrProps ] = args ;
    if( isGT( len( args ) , 3 ) ) {
      $Debug( `el render function cannot receive more than three arguments\n\n"...........${ len( args ) }" received" `  )
      return false ;
    }else if( !_validateType( type , [ String , Object , Function , HTMLElement ] )  ) {
      $Debug( `parameter 1 at el macro expexts a native Element name or a widget options instance data `) ;
      return false ;
    }else if( isPObject( propsOrChildren ) && !isChildrenObj(propsOrChildren) && isPObject( childrenOrProps ) && !isChildrenObj(childrenOrProps) ) {
      $Debug( `Unintended plain object parsed at parameter 2 and 3 of el render macro\n\nplain objects are considered as props and cannot be duplicated`) ;
      return false ;
    }else if( ( exists( propsOrChildren ) && isChildrenNode( propsOrChildren ) )  && ( exists( childrenOrProps ) && isChildrenNode( childrenOrProps ) ) ) {
      $Debug( `arguments 2 and arguments 3 of el render receives duplicated identical Vnodes instance \n\nRenderable Vnodes cannot be duplicated` );
      return false ;
    }
    return true ;
  }
  function propsAndChildrenGetter( type , propsOrChildren , childrenOrProps ) {
    const response = hyperscriptElArgumentsValidator( [ ...arguments ] ) ;
    if( isFalse( response ) ) return [ ] ;
    let props ;
    const lab = new Set() ;
    if( isFallThrough( propsOrChildren ) ) pass ;
    else if( isPObject( propsOrChildren ) && !isChildrenNode( propsOrChildren ) ) { 
      props = propsOrChildren ;
      lab.add( 'propsOrChildren' ) ;
    }else if( isPObject( childrenOrProps ) && !isChildrenNode( childrenOrProps ) ) { 
      props = childrenOrProps ;
      lab.add( 'childrenOrProps' ) ;
    }
    if( !lab.has( 'propsOrChildren' ) && isChildrenNode( propsOrChildren ) ) childrenOrProps = propsOrChildren ;
    if( validHouxWidget( type ) ) {
      type = isPObject( type ) ? assign( {} , type ) : type ;
      if( props ) define( type , '$attributes' , { value : props , enumerable , writable } ) ;
      childrenOrProps = exists(childrenOrProps) && !isArray( childrenOrProps ) && !isLazyRender(childrenOrProps) ? [ childrenOrProps ] : childrenOrProps ;
      if( exists(childrenOrProps )) {
        try{
          define( type , '$children' , { value : childrenOrProps , enumerable , writable , configurable } );
        }catch(err){
          pass
        }
      }
    }
    return [ type , props , childrenOrProps ] ;
  }
  function el( typeValue , propsOrChildren , childrenOrProps ) {
    let [ type , props , children ] = propsAndChildrenGetter( ...arguments ) ;
    return defineElement( {
      type , props , children 
    } ) ;
  }
  class Widget {
    constructor(options){
      if(!options) {
        let model=new Model();
        this.model=model;
        define( this, 'model', { 
          get(){
            return model
          },
          set(modelX){
            if(!isPObject(modelX)){
              $Debug(`Unexpected assignment to the model instance object\n\nassignment expects a plain object`);
              return false;
            }
            model=modelX;
            return true;
          }
        })
      }else if(isPObject(options)) {
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
    constructor(){ 
      super()
      this[$$BuiltinWidgetKey]='hx:build'
    }
    name='Build'
    params={ 
      self:{
        type:[Object, Function, String], 
        required:true
      }
    }
  }
  class Fragment extends Widget {
    constructor(){ 
      super();
      this[$$BuiltinWidgetKey]='hx:fragment'
    }
    name='Fragment'
    buildConfig={
      debug:false
    }
  }
  class Self extends Widget {
    constructor(){ 
      super()
      this[$$BuiltinWidgetKey]='hx:self'
    }
    name='Self'
    params={ 
      onStart:Function,
      onEnd:Function
    }
  }
  class Motion extends Widget {
    constructor(){
      super()
      this[$$BuiltinWidgetKey]='hx:motion'
    }
    name='Motion'
    
  }
  class Suspense extends Widget{
    constructor(){
      super()
      this[$$BuiltinWidgetKey]='hx:suspense'
    }
    name='Suspense'
  }
  class Memo extends Widget {
    constructor(){
      super();
      this[$$BuiltinWidgetKey]='hx:memo'
    }
    name='Memo'
  }
  class Portal extends Widget {
    constructor(){
      super()
      this[$$BuiltinWidgetKey]='hx:portal'
    }
    name="Portal"
    params={
      target:{
        type:[String, Element ],
        required:true
      },
      disabled:{
        type:Boolean,
        default:false
      }
    }
    build(params, { slots }){
      return ()=> slots.default()
        
    }
  }
  class Provider extends Widget{
    constructor(){
      super()
      this[$$BuiltinWidgetKey]='hx:portal'
    }
    name="Provider"
  }
  const BUILT_IN_WIDGETS={ 
    'hx:fragment':Fragment, 
    'hx:build':Build, 
    'hx:self':Self, 
    'hx:motion':Motion, 
    'hx:memo':Memo, 
    'hx:portal':Portal,
    'hx:suspense':Suspense,
    'hx:provider':Provider
  }
  function refVariableTransform(self, binding, metrics){
    const { value, prop, descriptor } = binding;
    const data=dataRef(value);
    if(exists(prop) ) useModel({
      [prop]:data
    })
    else data.effectTrigger(()=>{
      generateDependencySubscriptions(self, ()=>data)
      self.$$publicModel._pushEffect();
    })
    return exists(prop) ? self.$$publicModel[prop] : data ;
  }
  const allowedComposers="postBuild,preMount,postMount,preUpdate,postUpdate,preDestroy,postDestroy,setupConfig,defineSignals,mapSlots,makePublish,useTransform,createExpose,injectParams,stateRef,onEffect,onTracked,onCatch";
  function composersArgValidator(arg, type, metrics={}){
    const { name }=metrics
    if(!_validateType(arg, type)){
      $Debug(`composer Hook "${name}" got an unexpected value\n\nexpects a .......... `);
      return false;
    }
  }
  const garbageKey=Symbol();
  function injectParams(params){
    const self=getCurrentRunningEffect({
      name:'injectParams'
    })
    if( !self && (!len(arguments) && isNull(params)) && isFalse(composersArgValidator(params, [Array, Object], { name: "injectParams"}))) return self.$$publicModel.$params;
    paramsManager(self, {
      $attributes:self[$$$core]?.opts?.$attributes || {},
      params
    }, true);
    return self.$$publicModel.$params
  }
  function stateRef(value, prop, descriptor){//settibg of variable based ref in build fn
    const self=getCurrentRunningEffect({
      name:'stateRef'
    })
    if(!self) return undefined;
    if(isGT(len(arguments), 3)){
      $Debug(`stateRef expects not more than 3 arguments`, self);
      return;
    }
    if( (!len(arguments) && isFalse(composersArgValidator(prop, String, { name: 'stateRef'}))) ) return ;
    return refVariableTransform(self, { value, prop, descriptor})
  }
  function mapSlots(slots){
    const self=getCurrentRunningEffect({
      name:'mapSlots'
    })
    if( !self && (!len(arguments) && isNull(slots)) && isFalse(composersArgValidator(slots, Array, { name: "mapSlots"}))) {
      defineFallbackSlotsRef(self, {slots:[]}, self[$$$core].slots)
      return self[$$$core].slots;
    }
    for(const [index, sl ] of slots.entries()){
      if(!isString(sl)) {
        $Debug(`mapSlots() composer macro array value ecpects a String value\n\nat array index ..........${index}`, self, true);
        continue;
      }
    }
    defineFallbackSlotsRef(self, { slots }, [], self[$$$core].slots );
    return self[$$$core].slots;
  }
  function defineSignals(signals){
    const self=getCurrentRunningEffect({
      name:'defineSignals'
    })
    if(!self && (!len(arguments) && isNull(signals)) && isFalse(composersArgValidator(signals, Array, {name:"defineSignals"}))) return self.$$publicModel.$signals;
    $construct_With_Signals(self, { signals }, true);
    for(const [key, value] of entries((self[$$$core].opts.$attributes||{})[$$$Events]||{})){
      const transformKey=_toCamelCase(`on-${key}`);
      if(hasOwn(self.$$publicModel.$attrs, transformKey) && hasOwn(self.$$publicModel.$signals, key)){
        delete self.$$publicModel.$attrs[transformKey];
      }
    }
    return self.$$publicModel.$signals
  }
  function setupConfig(config){
    const self=getCurrentRunningEffect({
      name:'setupConfig'
    })
    if(!self && (!len(arguments) && isNull(config)) && isFalse(composersArgValidator(config, Object, {name:"setupConfig"}))) return
    setConfig(self, { buildConfig: config });
    return void 0
  }
  function makePublish(publish){
    const self=getCurrentRunningEffect({
      name:"makePublish"
    })
    if(!self && (!len(arguments) && isNull(publish)) && isFalse(composersArgValidator(publish, Object, {name:"makePublish"} ))) return false;
    mapPublicationsTraverse(self, { 
      publish(){
        return publish;
      }
    })
    return true;
  }
  function useTransform(transform){
    const self=getCurrentRunningEffect({
      name:'useTransform'
    })
    if(!self && (!len(arguments) && isNull(transform)) && isFalse(composersArgValidator(transform, [Array, Object], {name:"useTransform"}))) return
    return transformPublicationPrefix(self, { transform });
  }
  function createExpose(fallThrough){
    const self=getCurrentRunningEffect({
      name:'createExpose'
    })
    if(!self && (!len(arguments) && isNull(fallThrough)) && isFalse(composersArgValidator(fallThrough, Function, {name:'createExpose'}))) return false;
    if(!hasOwn(self[$$$core].opts, "fallThrough")){
      self[$$$core].opts.fallThrough=function expose(){
        return fallThrough()
      }
    }
    return true;
  }
  function postBuild(callback){
    const self=getCurrentRunningEffect({
      name:'postBuild'
    })
    if(!self && isFalse(composersArgValidator(callback, Function, { name:"postBuild"}))) return;
    self[$$$compiler][garbageKey].postBuild.add(callback);
  }
  function preMount(callback){
    const self=getCurrentRunningEffect({
      name:'preMount'
    })
    if(!self && isFalse(composersArgValidator(callback, Function, { name:"preMount"}))) return
    self[$$$compiler][garbageKey].preMount.add(callback);
  }
  function postMount(callback){
    const self=getCurrentRunningEffect({
      name:'postMount'
    })
    if(!self && isFalse(composersArgValidator(callback, Function, { name:"postMount"}))) return
    self[$$$compiler][garbageKey].postMount.add(callback);
  }
  function preUpdate(callback){
    const self=getCurrentRunningEffect({
      name:'preUpdate'
    })
    if(!self && isFalse(composersArgValidator(callback, Function, { name:"preUpdate"}))) return
    self[$$$compiler][garbageKey].preUpdate.add(callback);
  }
  function onEffect(callback){
    const self=getCurrentRunningEffect({
      name:'onEffect'
    })
    if(!self && isFalse(composersArgValidator(callback, Function, { name:"onEffect"}))) return
    self[$$$compiler][garbageKey].onEffect.add(callback);
  }
  function onCatch(callback){
    const self=getCurrentRunningEffect({
      name:'onCatch'
    })
    if(!self && isFalse(composersArgValidator(callback, Function, { name:"onCatch"}))) return
    self[$$$compiler][garbageKey].onCatch.add(callback);
  }
  function onTracked(callback){
    const self=getCurrentRunningEffect({
      name:'onTracked'
    })
    if(!self && isFalse(composersArgValidator(callback, Function, { name:"onTracked"}))) return
    self[$$$compiler][garbageKey].onTracked.add(callback);
  }
  function postUpdate(callback){
    const self=getCurrentRunningEffect({
      name:'postUpdate'
    })
    if(!self && isFalse(composersArgValidator(callback, Function, { name:"postUpdate"}))) return
    self[$$$compiler][garbageKey].postUpdate.add(callback);
  }
  function preDestroy(callback){
    const self=getCurrentRunningEffect({
      name:'preDestroy'
    })
    if(!self && isFalse(composersArgValidator(callback, Function, { name:"preDestroy"}))) return;
    self[$$$compiler][garbageKey].preDestroy.add(callback);
  }
  function postDestroy(callback){
    const self=getCurrentRunningEffect({
      name:'postDestroy'
    })
    if(!self && isFalse(composersArgValidator(callback, Function, { name:"postDestroy"}))) return;
    self[$$$compiler][garbageKey].postDestroy.add(callback);
    
  }
  const resolvableMacros="postDestroy,preDestroy,postMount,preMount,preUpdate,postUpdate,postBuild,resolveHook,onEffect,onTracked,onCatch"
  function resolveHook(hook, ...args){
    const self=getCurrentRunningEffect({
      name:'resolveHook'
    })
    if(!self && isFalse(composersArgValidator(hook, Function, { name:"resolveHook"}))) return
    if(!isAFunction(hook)) hook=hook.bind(self.$$publicModel);
    const macros=createObj("Composers");
    for(const hookName of resolvableMacros.split(",").values()){
      macros[hookName]=self[$$$core].utils[hookName];
    }
    return hook.call(self.$$publicModel, macros,  ...args );
  }
  function directiveKeyInfo(self, key , dirName){
    
  }
  function populateModelData(self, key, value, code , mygetters, useModel=false){
    if(isComputedMacro(value)){
      if(isTrue(useModel)){
        computedRefsCompile(self, value.transformer(key));
      }else{
        $Debug(`The computed macro is not allowed in the model option\n\nOnly allowed to be used within the body of the Build method option, in a function based widget or within the <script "houx:build"> SFW build system scope\n\nUse the "computedRefs" option instead`, self, true);
        return;
      }
    }else if(isReadonlyRef(value)){
      define(self[code], key, mygetters ? mygetters : {
        get(){
          if(isTrue(useModel) && isShallowReadOnlyRef(value)){
            value.effectTrigger(function(){
              generateDependencySubscriptions(self, ()=>value)
              self[$$$operands].dependency.notify()
            })
          }
          return value;
        },
        set(valueX){
          $Debug(`cannot reassign/mutate a "readonly" ref property\n\n.........on property "${key}"`) ;
          return false;
        }, enumerable
      })
    }else if(isReactiveRef(value)){
      if( isTrue(useModel) && !isShallowReactiveRef(value)){
        value.effectTrigger(function(){
          generateDependencySubscriptions(self, ()=>value)
          self[$$$operands].dependency.notify()
        })
      }
      define(self[code], key, { value , enumerable } )
    }else{
      self[code][key]=value;
    }
  }
  function modelManager(self, opts){
    if(isNull(opts.model)) return;
    const modelData=isBaseWidget(opts) ? opts.model : {} ;
    if(hasOwn(opts, 'model') && isPFunction(opts.model)) {
      try{
        opts.model.call(modelData, self.$$publicModel.$params, self.$$publicModel.$attrs) ;
      }catch(err){
        $Debug(`There is an error when running the model function\n\n${err}`,self, true);
        $warn(err, self)
      }
    }
    entries(modelData).forEach(([key, value])=>{
      populateModelData(self, key, value, '$$publicModel')
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
        define(self[$$$register].widgets, key, {value:widget, enumerable});
      })
    }
  }
  const $$isHandler=Symbol()
  function methodsManager(opts, self,){
    if(!opts.handlers) return;
    entries(opts.handlers).forEach(([ind, method])=>{
      if(!isPFunction(method)){
          $Debug(`widget method option's values must be a method or a function\n\n type of "${getType(method)}" found`, self, true);
          return;
      }
      method[$$isHandler]=true;
      define(self[$$$register].handlers, ind, {value:method, enumerable, configurable})
    });
  }
  function inDomPropsFallback(self, props, params, garbage){
    const paramsKeys=isArray(params) ? params.values() : isObject(params) ? keys(params) : [];
    let index=0;
    paramsKeys.forEach((key)=>{
      index++;
      if(hasUpperCase(key)){
        const transpiled=_to_kebab_case(key);
        if(_mapValue(props, transpiled) && !_mapValue(paramsKeys, transpiled)){
          if(isPObject(params)) {
            define(garbage, transpiled, { value:params[key], enumerable, configurable});
            delete props[transpiled];
          }
        }
      }
    })
  }
  function paramsKeysDefer(self, paramsSet, essenceTags, ){
    const [ props, ind , param ] = essenceTags;
    if(!_mapValue(props || {}, ind)){
      define(paramsSet,ind,{value:undefined, enumerable, configurable, writable});
      return false;
    }else if(props ){
      const value=props[ind];
      if(_validateType(value, param)){
        define(paramsSet,ind,{value, enumerable, configurable, writable});
      }else{
        define(paramsSet,ind,{value:undefined, enumerable, configurable, writable});
        $Debug(`params validation error\n\nproperty validation for widget default value failed, property "${ind}" is of an invalid type\n\n typeof "${param.name}" required`, self, true);
        return false;
      }
    }
  }
  function arrayParamsResolver(self, paramsSet, metrics ){
    const [ props, param ] = metrics ;
    if(props && _mapValue(props, param)){
      const value=!props[param] && !isBoolean(props[param]) ? '' : props[param];
      paramsSet[param]=value;
    }else paramsSet[param]=undefined; 
  }
  function runObjectifiedParamsValidation(self, paramsSet, objMetrics){
    const [ props, param, ind ] = objMetrics;
    if(isTrue(param.required) && hasProp(param, 'default')){
      $Debug(`validation error  .......\n\nthe required validator should not be truthy alongside a default value\nat at\n\n"${ind}" params`, self, true);
      return false;
    }else if(hasProp(param, 'required') && !isBoolean(param.required)){
      $Debug(`The "required" validation options receives an unresolvable value \nat at \n"${ind}" params\n requires a boolean value`, self, true);
      return false;
    }else if(!hasProp(param, 'type')){
      $Debug(`The type validator property is  required\n  Mising at "${ind}" param`, self, true);
      return false;
    }else if(!_validateType(param.type,[Function, Array]) ){
      $Debug(`unexpected value passed as the type validator option\n expects a function or an Array of type function`, self, true);
      return false;
    }else if(hasProp(param,'validator') && !isPFunction(param.validator)){
      $Debug(`The "validator option must be a  function\n\nat ${ind} params`, self, true);
      return false;
    }else if(isTrue(param.required) && !_mapValue(props || {}, ind)){
      $Debug(`Params validation error........\n\nrequired params is missing\n\nat at\n  ....."${ind}"  param`, self, true);
      paramsSet[ind]=undefined;
      return false;
    }
  }
  function defaultParamBuffering(self, paramsSet, deferable){
    const [ props, param, ind ] = deferable ;
    if(hasOwn(param, 'default') && !isNull(param.default)){
      const defaultValue=isFunction(param.default) ? ( !isAFunction(param.default) ? param.default.call(self.$$publicModel) : param.default() ) : param.default;
      if(!_mapValue(props || {}, ind)){
        if(!_validateType(defaultValue, param.type)){
          define(paramsSet,ind,{value:undefined, enumerable, configurable });
          $Debug(`Params validation error .....\n\nproperty validation for widget default value failed, property "${ind}" is of an invalid type\n\n${ isArray(param.type) ? "Matches no type in the validation list" :  'typeof '+ param.type.name+" required"}`, self, true); 
          return false;
        }else paramsSet[ind]=defaultValue ;
      }
    }
  }
  function paramsValidationCircle(self, paramsSet, deferable){
    const [ props, param, ind] = deferable;
    const value=props ? props[ind] :  undefined
    if(_mapValue(props, ind) && _validateType(value, param.type)){
      if(_mapValue(param, 'validator')){
        let valRes=param.validator(value)
        if(!_validateType(valRes, Boolean)){
          $Debug(`params validator option method must return a Boolean value`, self, true);
          return false;
        }
        if(isFalse(valRes)){
          $Debug(`Validation for param ${ind} return false`, self, true);
          return false ;
        }
      }
      paramsSet[ind]=value
    }else if(_mapValue(props, ind) && !_validateType(value, param.type)){
      paramsSet[ind]=undefined;
      $Debug(`Params validation error .....\n\nproperty validation for widget Params value failed, property "${ind}" is of an invalid type\n\n${ isArray(param.type) ? "Matches no type in the validation list" :  'typeof '+param.type.name+" required"}`, self,  true);
      return false;
    }
  }
  function resolveParamsPossibility(self, outlinedMetrics){
    let [ props, opts, params ] = outlinedMetrics;
    if(isPFunction(opts)){
      entries(props).forEach(([ind, attr])=>{
        self.$$publicModel.$attrs[ind]=attr;
      });
    }
    let paramsSet;
    let rv;
    if(params && len(params)){
      paramsSet=self.$$publicModel.$params;
      entries(params).forEach(([ind, param])=>{
        if(has$$_bind(ind)){
          $Debug(`Params validation error "${ind}" passed to widget as a houx directive binding
            \n\n
            The "$$" may not be appended or used on a params identifier key name`, 
            self, true);
          return false;
        }
        if(_validateType(param, [Function, Array]) ){
          rv=paramsKeysDefer(self, paramsSet, [ props, ind, param ]);//Defer type, runs validation for tyoes in Array and JavaScript prototype Methods tyoes
          if(isFalse(rv)) return false;
        }else if(isArray(params) && isString(param)) arrayParamsResolver(self, paramsSet, [props, param])//array and string based validation
        if(isPObject(param)){
          let rv=runObjectifiedParamsValidation(self, paramsSet, [ props, param, ind ]);//params in object type
          if(isFalse(rv)) return false;
          rv=defaultParamBuffering(self, paramsSet, [  props, param, ind ]);//validating defaut values
          if(isFalse(rv)) return false
          rv=paramsValidationCircle(self, paramsSet, [props, param, ind ]);
          if(isFalse(rv)) return false
        }
      })
    }
    return paramsSet;
  }
  function paramsManager(self, opts, in_build=false){
    const params= opts.params ;
    const props=opts.$attributes||{};
    const garbage={};
    inDomPropsFallback(self, props, params, garbage);
    if(!in_build) defineGetter(self.$$publicModel, '$params', new Params())
    if(params && !_validateType(params, [ Object, Array ])){
      $Debug(`Param option type validation failed, \n\n unexpected data type ${getType(params)}`, self,  true);
      return;
    }
    const paramsSet=resolveParamsPossibility(self, [ props, opts, params]);
    if(isFalse(paramsSet)) return;
    GarbagePropsPrefix(self, paramsSet, garbage, props);
    entries(props||{}).forEach(([ind, value])=>{
      if(!hasOwn(paramsSet||{}, ind) && !isEQ(ind, $$$Events)) {
        define(self.$$publicModel.$attrs, ind, {value, configurable,enumerable, writable});
      }else if(hasOwn(paramsSet, ind) && hasOwn(self.$$publicModel.$attrs, ind)) delete self.$$publicModel.$attrs[ind];
    })
    if(paramsSet && len(paramsSet)){
      for(const [key, value ] of entries(paramsSet)){
        defineReadonlyGetter(paramsSet, key, value , [ true, false, bypassSymbol ] );
      }
    }
  }
  function GarbagePropsPrefix(self, paramsSet, garbage, props){
  
  }
  function _hydrate_$Attributes(opts, self, vnode, metrics){
    vnode=isPFunction(vnode) ? vnode(self) : vnode;
    if(!isHouxVNode(vnode)) return vnode
    if( isNativeElement(vnode.$element) && IS_ELEMENT_NODE(vnode.$element) && isTrue(self[$$$core].settings.forwardAttrs)){
      ElementPropsCompiler( self.$$publicModel.$attrs, vnode.$element, self, vnode);
      if(hasOwn(self.$$publicModel.$signals, 'resourceModel:IPAddress:Binding')){
        self.$$publicModel.$signals["resourceModel:IPAddress:Binding"].fire(vnode.$element, true);
      }
    }
    return vnode;
  }
  const houxProps="$attributes,$children";
  const isHouxProp=prop=>_mapValue(houxProps, prop);
  const initBuildInstaceKey=Symbol("<<<!@---initBuild---@>>>")
  const widgetTypeKey=Symbol("[[[widget-typing-system]]]");
  function sanitizedOptions(self, options){
    const argcount=len(options);
    if(hasProp(options, initBuildInstaceKey)){
      self[$$$ownProperties].isInitialBuild = options[initBuildInstaceKey] ;
      delete options[initBuildInstaceKey]
    }
    if(hasOwn(options, widgetTypeKey)){
      self[$$$ownProperties].widgetType=options[widgetTypeKey];
      delete options[widgetTypeKey];
    }
    if(isBuiltinWidget(options)){
      self[$$$ownProperties].builtin_widget=options[$$BuiltinWidgetKey];
      delete options[$$BuiltinWidgetKey];
    }
    for(const [ key, opt] of entries(options)){
      if(isHouxProp(key)) pass;
      else if(isValidWidgetOption(key) && !isNodeJSOnlyOption(key) && !_validateType(opt, widgetOptionType[key])){
        if(isClassBasedBuild(self) && isEQ(key, 'model') && !isPObject(opt) || !isClassBasedBuild(self) ){
          $Debug(`${key} option is of an invalid type, \n\n "${key}" option cannot be a ${getType(opt)} type`, self, true);
          return;
        }
      }else if(nonAFuncMethod(key)){
        if(!isAFunction(opt)) {
          if(isClass(opt)){
            $Debug(`class function cannot be used as an option\n\n.........at___"${key}"`, self, true);
            return ;
          }
        }else{
          $Debug(`${key} option expects a method or a "function()" declaration\n\nfound an arrow function`, self, true);
          return;
        }
      }else if(isNodeJSOnlyOption(key)) {
        $Debug(`"${key}" option is a nodejs only option, and cannot be used in houx inbrowser compiler`, self, true);
      }else if(!isValidWidgetOption(key)) self[$$$operands]._OPTIONS[key]=opt
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
  const selectorPattern = /([^\r\n{]+)\s*{/g;
  function _styleSheet_hydration(self, styles){
    return styles.replace(selectorPattern, (match, text)=>{
      return _hydrateHashToSelector(text, `[data-hx_hash_=${self[$$$ownProperties].hx_hash_}]`)+'{';
    });
  }
  function _preCompile_StyleSheet(opts, self, vnode){
    if(IS_TEXT_NODE(vnode?.$element)) return vnode;
    const CssStylesheet=opts.styleSheet ? opts.styleSheet : null;
    if(CssStylesheet){
      const styleEl=createHouxElement('style', { type:'text/css'}, null);
      const ModifiedCssStylesheet=_styleSheet_hydration(self, CssStylesheet);
      styleEl.textContent=ModifiedCssStylesheet;
      if(vnode  && !IS_TEXT_NODE(vnode.$element)) vnode.$element.append(styleEl);
    }
    return vnode;
  }
  function assignSlot(self, slot, content, name, assynedSlots, renderedSlotsList, tillMount){
    if(content && isHouxVNode(content) && !hasOwn(renderedSlotsList, name)){
      whenMounted(self, slot, ()=>{
        slot.replaceWith(content.$element||"");
      })
      assynedSlots.add(name);
      renderedSlotsList[name]=content
    }
  }
  function resolveSlotsFilter(self, vnode){
    let slotElementsList=vnode?.$element && isFunction(vnode.$element.querySelectorAll) ? vnode.$element?.querySelectorAll('slot') : [];
    if( IS_ELEMENT_NODE(vnode.$element) && isEQ(vnode.$element.localName, 'slot')){
      slotElementsList=[ vnode.$element , ...slotElementsList ];
    }
    if(!len(slotElementsList)) return [];
    const hash=self[$$$ownProperties].hx_hash_;
    const scopedList=[];
    for(const el of slotElementsList.values()){
      if(exists(el.dataset.hx_hash_) && isEQ(el.dataset.hx_hash_, hash)) scopedList.push(el)
    }
    return scopedList;
  }
  function _$slotHydrationRenderer(self, opts, vnode){
    const slots=self[$$$core].slots;
    if(!len(slots) || !vnode || !isHouxVNode(vnode) || isHouxTextVNode(vnode)) return vnode ;
    const renderedSlotsList={}
    const slot_elements=resolveSlotsFilter( self, vnode ) ;
    const assynedSlots=new Tuple()
    for(const slot_el of slot_elements.values()){
      const slotN=slot_el.getAttribute('name') || 'default';
      if(hasOwn(slots, slotN) && !assynedSlots.has(slotN)) {
        assignSlot(self, slot_el, slots[slotN](self), slotN, assynedSlots, renderedSlotsList);
      }
    }
    if(!len(slot_elements) && isNativeElement(vnode?.$element) && IS_ELEMENT_NODE(vnode.$element) && isEmptyStr(vnode.$element.innerHTML.trim()) && !isEQ(vnode?.$element?.localName, 'slot')){
      const forwardSlot=self[$$$core].settings.forwardSlot;
      if(isTrue(forwardSlot)) {
        const slotContent=hasOwn(slots, 'default') ? slots.default(self) : null;
        if(slotContent) vnode.$element.append(slotContent.$element);
        assynedSlots.add('default');
        renderedSlotsList['default']=slotContent
      }
    }
    if(!len(renderedSlotsList)) return vnode 
    for(const [name, content] of entries(renderedSlotsList) ){
      self[$$$core].slotsFactory.renderedSlotsList[name]=content;
    }
    return vnode;
  }
  function injectCustomDirective(self, options){//custom directives installer
    if(hasProp(options,'directives')){
      for(let [key, value] of entries(options.directives)){
        if(!_validateType(value, [ Object, Function])){
          $Debug(`a directive requires an object or a function`, self, true); 
          return;
        }
        define(self[$$$register].directives, has$$_bind(key) ? key.slice(2) : key, {value, enumerable, configurable, writable});
      }
    }
  }
  const configOptionsSettings = keys(ConfigValidator).join(',') ;
  function mapSettingCheck(self, key, setting){
    self=!isHouxBuild(self) ? null : self
    if(!_mapValue(configOptionsSettings, key)){
      $Debug(`unrecognised settings option found in buildConfig setupConfig  at   at\n"${key} name property`,self, isHouxBuild(self));
      return false;
    }else if(!_validateType(setting, ConfigValidator[key])){
      $Debug(`${key} config option of buildConfig receives an invalid type\n\nExpects a/an "${ConfigValidator[key].name.toLowerCase()}" type`, self, isHouxBuild(self));
      return false;
    }
    if(isEQ(key, 'delimiters')){
      let rv=validateDelimiterConstruct(self, setting);
      if(isFalse(rv)) return false
    };
    return true;
  }
  function setConfig( self, opts ){
    if(!opts.buildConfig || !len(opts.buildConfig)) return false;
    entries(opts.buildConfig).forEach(([key, setting])=>{
      let rv= mapSettingCheck(self, key, setting);
      if(isFalse(rv)) return false;
      define(self[$$$core].settings, key,{value:setting, enumerable, configurable});
    })
    return true
  }
  const globalProps="filters,widgets,directives,handlers,publish,blocks,mixins";
  const exceptionsOptions="$children,$attributes";
  const flushOptions="post,sync"
  class _OBS{
    flushType='post'
    constructor(self, propOrGetter, oldValue, callback, options, depps){
      this.propOrGetter=propOrGetter;
      this.oldValue=oldValue;
      this.callback=callback;
      this.self=self
      this.options=options;
      this.depps=depps
      if(isTrue(options.now)) {
        depps.value = this.callback.call(self.$$publicModel, ...this.wrapValueArgs(self));
      }
      if(hasOwn(options, 'flushType')){
        const flushType=options.flushType
        if(!isString(flushType) && !_mapValue(flushOptions, flushType)){
          $Debug(`unrecognised flushType options received\n\nvakue "${flushType}" is not a vailid flushType`, self, true);
        }else this.flushType=flushType
      }
    }
    getNewV(self){
      return getObsCurrentValue(self, this.propOrGetter ) ;
    }
    shouldTrigger(self){
      return !deepEqualityCheck(this.oldValue, this.getNewV(self));
    }
    trigger(self){
      if(this.shouldTrigger(self)){
        this.depps.value=this.callback.call(self.$$publicModel, ...this.wrapValueArgs(self));
        this.oldValue=this.getNewV(self);
      }
    }
    wrapValueArgs(self){
      if(isArray(this.oldValue)){
        const list=[]
        const newValue=this.getNewV(self)
        for (const [key, valueX] of this.oldValue.entries()){
          const content=[newValue[key], valueX ]
          list.push(content)
        }
        return list
      }else{
        return [ this.getNewV(self), this.oldValue , function stopEffect(){
          this.stopEffect(self, this);
        } ]
      }
    }
    stopEffect( self, obs){
      self[$$$operands]._OBSERVERS.delete(obs);
    }
  }
  function Observer_Track(self, opts){
    entries(opts.observers||{}).forEach(([name, method])=>{
      EffectObserver.call(self.$$publicModel, name, method);
    })
  }
  async function _EffectDependencyNotifier(self){
    self[$$$operands]._OBSERVERS.values().forEach((obs)=>{
      obs.trigger(self);
    })
  }
  const contextComposersMacro={
    
  }
  function RuntimeUtilitiesProvide( self , opts ) {
    if(isTrue(true)){
      for(const [key, composer] of entries(contextComposersMacro)){
        // define( self[$$$core].utils , key , { value : composer.bind( self ) , enumerable } ) ;
      }
    }
    defineGetter( self.$$publicModel , "_observe" , EffectObserver.bind( self ) ) ;
    defineGetter( self.$$publicModel , "_deferTick" , deferTick.bind( self ) ) ;
    defineGetter( self.$$publicModel , "_useAgent" , useAgent.bind( self ) ) ;
    defineGetter( self.$$publicModel , "_mutate", Mutate.bind( self ) ) ;
    defineGetter( self.$$publicModel , "_effectHook" , effectHook.bind( self ) ) ;
    defineGetter( self.$$publicModel , "_pushEffect" , pushEffect.bind( self ) ) ;
  }
  function useModel( props ) {
    let self = isHouxBuild(this) ? this : getCurrentRunningEffect({
      name:"useModel"
    })
    if(!self) return undefined
    if( props && !isPObject( props ) ) {
      $Debug( `argument at position 1 of the "useModel" utils macro expects a plain object` , self , true ) ;
      return ;
    } else if( !props ) return self.$$publicModel ;
    for( let [ key , value ] of entries( props ) ) {
      if( !object_Has_Path( self.$$publicModel , key ) && !isProxySkipped( key ) && !isEQ( key , '$params' ) ) populateModelData( self , key , value , '$$publicModel' , null , true ) ;
      else if(object_Has_Path( self.$$publicModel , key ) && !isProxySkipped( key ) && !isEQ( key , "$params") ) self._mutate( { [ key ] : value } ) ;
    }
    return self.$$publicModel ;
  }
  function checkObserversValidations(self, propOrGetter, callback){
    const errArgs=()=>[ self, true, 'During the call of the "effect" macro'];
    if(!_validateType(propOrGetter, [Function, String, Array, Tuple, Set])){
      $Debug(`proplem setting Observer for ${propOrGetter}\n\n invalid type`, ...errArgs());
      return false
    }else if(!isPFunction(callback)){
      $Debug(`observer callback expects a plain function method`);
      return false
    } else if(isString(propOrGetter) && !object_Has_Path(self.$$publicModel, propOrGetter)){
      $Debug(`undefined property "${propOrGetter}" accessed in effect  macro`, ...errArgs());
      return false
    }
    return true
  }
  function getObsCurrentValue(self, propOrGetter){
    const tuple=[]
     let response;
    if(_validateType(propOrGetter, [Function, String])){
      response=isFunction(propOrGetter) ? propOrGetter() : get_Object_Value(self.$$publicModel, propOrGetter);
    }else{
      propOrGetter=!isArray(propOrGetter) ? arrSet(propOrGetter) : propOrGetter;
      propOrGetter.forEach((value)=>{
        response=isPFunction(value) ? value() : get_Object_Value(self.$$publicModel, value);
        tuple.push(refUnwrap(response));
      })
    }
    return !_validateType(propOrGetter, [Function, String]) ? tuple : refUnwrap(response);
  }
  function EffectObserver(propOrGetter, callback, options){
    if(isEQ(len(arguments), 3) && !isPObject(options)){
      $Debug(`parameter 3 arguments of effect observer expects a plain object`);
      return 
    }
    let rv=checkObserversValidations(this, propOrGetter, callback);
    if(isFalse(rv)) return;
    if(isArray(propOrGetter)){
      propOrGetter.forEach((value)=>{
        rv=checkObserversValidations(this, value, callback);
        if(isFalse(rv)) return
      })
    }
    const effectDeps={
      value:undefined
    }
    const observer=new _OBS(this, propOrGetter, getObsCurrentValue(this, propOrGetter), callback, options || {}, effectDeps)
    this[$$$operands]._OBSERVERS.add(observer);
    const self=this
    return function stopEffect(callback){
      if(!self[$$$operands]._OBSERVERS.has(observer)){
        $Debug(`effect observer has already been stopped`, self, true);
        return false;
      }
      observer.stopEffect(self, observer);
      if(isPFunction(callback) ) {
        let returnValue=undefined
        if(hasOwn(callback, effectHookValueKey)) returnValue=callback[effectHookValueKey];
        else returnValue = effectDeps.value;
        callback.call(self.$$publicModel, returnValue);
        return true;
      }else if(len(arguments) && !isPFunction(callback)) {
        $Debug(`callback at effect stopper expects a plain function`, self, true);
        return false;
      }
    }
  }
  function map_Events_Fall(self, options){
    defineGetter(self.$$publicModel, '$attrs', new Attrs());
    if(!options.$attributes || !options.$attributes[$$$Events]) return;
    for(let [ name, value ] of entries(options.$attributes[$$$Events])){
      value=value.callback;
      define(self.$$publicModel.$attrs, _toCamelCase("on-"+name), { value , enumerable, configurable })
    }
    // delete options.$attributes[$$$Events];
  }
  function $construct_With_Signals(self, options, in_build=false){
    if(options.$attributes && hasOwn(options.$attributes, $$$ModelUpdateKey)){
      if(len(options.$attributes[$$$ModelUpdateKey])){
        if(!options.signals) options.signals=[];
        if(!hasOwn(options.$attributes, $$$Events)) options.$attributes[$$$Events] = {}
        for(const [eventName, signal] of entries(options.$attributes[$$$ModelUpdateKey])){
          self.$$publicModel.$signals[eventName]=new Signal(eventName, signal?.callback || pass, signal?.options);
        }
      }
    }
    const $$events=((in_build ? self[$$$core].opts : options)?.$attributes||{})[$$$Events]
    if(!len(options.signals) && !$$events ) return;
    const signals=new Set(options.signals);
    for(const  [ key, event] of entries( $$events || {})){
      if(!hasOwn((options?.$attributes||{})[$$$ModelUpdateKey] || {}, key) && signals.has(key)){
        self.$$publicModel.$signals[key]=new Signal(key, event?.callback || pass, event?.options);
      }
    }
    for(const signal of (options.signals || []).values()){
      if(isEQ('resourceModel:IPAddress:Binding', signal)){
        $warn(`"resourceModel:IPAddress:Binding" defined signal is a houx built in signal name`, self);
        continue;
      }
      if(!hasOwn(self.$$publicModel.$signals, signal)){
        self.$$publicModel.$signals[signal]=new Signal(signal, pass )
      }
    };
  }
  function resolveCustomFiltersOrBlocks(self, options, optName){
    if(!hasOwn(options, optName) || !len(options[optName])) return;
    const sName=optName.slice(0, -1)
    for(const [name, filter] of entries(options[optName])){
      if(isEQ(optName, 'blocks') ? isBuiltinBlocks(name) : _mapValue(BUILT_IN_FILTERS, name)){
        $Debug(`registration failure\nFailed to register the custom ${sName} with the name "${name}\n\n Which collides with a BUILT_IN_${sName.toUpperCase()} name\nregistration FAILED___`,self, true);
        continue;
      }else if(!_validateType(filter, [ Function, Object] )) {
        $Debug(`${sName.at(0).toUpperCase()+sName.slice(1)} must be a function or an object exposing a "${sName}" method option \n\nat        at\n "${name}" ${sName} registration`, self, true);
        continue;
      }
      if(isObject(filter) && (!hasOwn(filter, sName) || !isPFunction(filter[sName]))){
        $Debug(`"${name}" ${sName} object must expose a ${sName} method\n\nregistration FAILED___`, self, true);
        continue
      }
      self[$$$register][optName][name]=filter
    }
  }
  function __Ensure_Renderer(self, options){
    widgetsSetup(options, self);
    methodsManager(options, self);
    resolveCustomFiltersOrBlocks(self, options, 'filters');
    resolveCustomFiltersOrBlocks(self, options, 'blocks');
    RuntimeUtilitiesProvide(self, options);
    injectCustomDirective(self, options);
    __Generate_Widget_Hash(self);
    return options;
  }
  const alphaNum ='A,a,B,b,C,c,D,d,E,e,F,f,G,g,H,h,I,i,J,j,K,k,L,l,M,m,N,n,O,o,P,p,Q,q,R,r,S,s,T,t,U,u,V,v,W,w,X,x,Y,y,Z,z,0,1,2,3,4,5,6,7,8,9,$';
  const alpha ='A,a,B,b,C,c,D,d,E,e,F,f,G,g,H,h,I,i,J,j,K,k,L,l,M,m,N,n,O,o,P,p,Q,q,R,r,S,s,T,t,U,u,V,v,W,w,X,x,Y,y,Z,z'
  const num='0,1,2,3,4,5,6,7,8,9';
  const numRegex=/\d/;
  const alphaNumRegex=/\w/;
  const alphaRegex=/\b/;
  function _generateUUID(length, type) {
    const isAlpha=isEQ(type, 'alpha');
    const isNum=isEQ(type, 'num');
    let letters=(isAlpha ? alpha : isNum ? num : alphaNum).split(',');
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
    return isNum ? Number(id) : id;
  }
  function __Generate_Widget_Hash(self){
    let id=_generateUUID(10).toUpperCase();
    define(self[$$$ownProperties], 'hx_hash_', {value:`_hx_${id}`, configurable, enumerable});
  }
  function _Data_Hydrations(self, options){
    paramsManager(self, options);
    modelManager(self, options);
    install_State_Observer(self)
    self.$$publicModel=_Proxy_Setup(self, self.$$publicModel, true);
    entries(self[$$$register].handlers).forEach(([key, handler])=>{
      define(self.$$publicModel, key, { value:handler.bind(self.$$publicModel), enumerable});
    })
    computedRefsCompile(self, options)
    transformPublicationPrefix(self, options);
    Observer_Track(self, options);
  }
  function install_State_Observer(self){ 
    class Observer{
      constructor(getter, callback, self){
        this.getter = getter;
        this.callback = callback;
        this.value = this.get();
        this.self=self;
      }
      update() {
        const oldValue = this.value;
        this.value = this.getter();
        if (this.self[$$$operands].PATCH_FLAG && self[$$$operands].onRenderTracked){
          deferEventCircleThread(this.self, ()=>{
            deferTick(()=>this.callback(this.value, oldValue));
          })
        }
      }
      get() {
        self[$$$core].activeObserver = this;
        const value = this.getter();
        self[$$$core].activeObserver = null;
        return value;
      }
    }
    self[$$$core].Observer=Observer;
    class Dependency {
      constructor() {
        this.subscribers = new Set();
      }
      depend() {
        if (self[$$$core].activeObserver) {
          this.subscribers.add(self[$$$core].activeObserver);
        }
      }
      notify() {
        self[$$$operands].PATCH_FLAG++
        this.subscribers.forEach((observer) => observer.update());
      }
    }
    self[$$$core].Dependency=Dependency;
  }
  function trackDependency(self, dependency) {
    if (self[$$$core].activeObserver) dependency.depend();//call the depend
  }
  function pausePlayEffectScope(self, action){
    if(isEQ(action, 'pause')){
      self[$$$operands].PATCH_FLAG=0
    }
  }
  function _Proxy_Setup(self, obj, deep=false ){
    const dependency = new self[$$$core].Dependency();
    self[$$$operands].dependency=dependency;
    function Hydrate_Data_Proxy(obj, deep, path=""){
      for(let [key , value] of getIterator(obj)){
        if(isReactiveRef(value) && !isShallowReactiveRef(value) || isShallowReadOnlyRef(value)){
          value.effectTrigger((ref, getter)=>{
            generateDependencySubscriptions(self, ()=>value)
            dependency.notify();
          })
        }else if( isTrue(deep) && value && isIterable(value) && (isObject(value) || isArray(value)) && !isProxySkipped(key) && isFalse(isPFunction(value) && value[$$isHandler]) && !isRef(obj) ) {
          obj[key]=Hydrate_Data_Proxy(value, deep, path);
        }
      }
      obj= new Proxy(obj, {
        get(target, prop){
          trackDependency(self, dependency);
          const getter=()=> Reflect.get(...arguments);
          generateDependencySubscriptions(self, getter);
          return getter();
        },
        set(target, prop, value, receiver){
          const oldValue=()=>target[prop]
          if(isReactiveRef(oldValue())) {
            $Debug(`cannot reassign to a "dataRef" property\n\nTry reassigning to "${prop}._data" instead`)
            return false
          }
          generateDependencySubscriptions(self, oldValue);
          dependency.notify();
          Reflect.set(...arguments);
          return true
        },
        defineProperty(target, prop, value, receiver){
          dependency.notify();
          Reflect.defineProperty(...arguments);
          generateDependencySubscriptions(self, ()=>target[prop])
          return true;
        },
        deleteProperty(target, prop){
          Reflect.deleteProperty(...arguments);
          dependency.notify();
          return true;
        }
      })
      return obj
    }
    for(let [key , value] of entries(self.$$publicModel.$params)){
      value.effectTrigger(function(ref){
        generateDependencySubscriptions(self, ()=>value)
        dependency.notify();
      });
    }
    return Hydrate_Data_Proxy(obj, deep, )
  }
  function generateDependencySubscriptions(self, getter){
    if(!self[$$$operands].onEffectWatch) return;
    self[$$$core].effectSubscribers.add(getter)
  }
  // function mutatingHandlersCompile(src, prop, mutatingMethods, dependency){
  //   mutatingMethods.split(',').forEach((method)=>{
  //     src[prop][method]=new Proxy(src[prop][method],{
  //       apply(target, thisArg, args){
  //         const returnValue= Reflect.apply(...arguments);
  //         set_Object_Value(src, prop, src[prop])
  //         dependency.notify();
  //         return returnValue;
  //       }
  //     })
  //     // set_Object_Value(src, prop+'.'+method, proxy)
  //   })
  // }
  function defineGetter(obj, prop, value, desc={}){
    const { enumerable=false, writable=false, debug=false }=desc;
    const descriptor={
      get (){
        return value
      },
    }
    if(writable || debug ){
      descriptor.set=function(valueX){
        if(writable){
          value=valueX
        }
        if(debug){
          $Debug(`${prop} cannot be assigned`)
        }
      }
    }
    if(isTrue(enumerable)) descriptor.enumerable=enumerable
    return define(obj, prop, descriptor)
  }
  function instancerdinateProps(self, opts){
    self.$$publicModel=new Model();
    opts=opts || {};
    defineGetter(self, $$$ownProperties, createObj('OwnProperties',{ 
      name:opts?.name || 'UnknownWidget', 
      slot_name:hasProp(opts, '$attributes')  ? opts.$attributes[$$slotName] : undefined , 
      isInitialBuild:false ,
      widgetType:undefined,
      hx__VNode:undefined
    }), {} )
    if(exists(opts.$attributes) && hasOwn(opts.$attributes, $$slotName)) delete opts.$attributes[$$slotName];
    const registra=()=>{
      return createObj( 'Register', { 
        directives:createObj('directives'), 
        filters:createObj('filters'), 
        widgets:createObj('widgets'), 
        handlers:createObj('handlers'), 
        agents:createObj('agents'), 
        blocks:createObj('blocks'),
        mixins:new Tuple(),
        properties:createObj('properties')
      }) 
    }
    defineGetter(self, $$$register, registra() );
    defineGetter(self, $$$operands, createObj('Operands',{ 
      _OBSERVERS:new Set(), 
      _LIFECIRCLEHOOKS:createObj('_LIFECIRCLEHOOKS'), 
      _OPTIONS:createObj('_OPTIONS'),  
      garbageWatch:false, 
      initialized:false , 
      PATCH_FLAG:0, 
      onRenderTracked:false,
      onEffectWatch:false, 
      modelMethods:createObj('modelMethods')
    }));
    defineGetter(self, $$$core ,createObj('core',{
      utils:createObj('Utils'), 
      posixVNode:undefined,
      settings:createObj('settings', Compiler_Config_Options), 
      slots: new Slots(), 
      map:createObj('map',{ 
        is_hyperscript:false 
      } ), 
      activeObserver:null, 
      effectSubscribers:new Set(),
      slotsFactory:createObj('slotsFactory', {
        renderedSlotsList:createObj('renderedSlotsList'),
      })
    }));
    defineGetter(self[$$$core], '$globals', createObj('$globals',{
      register:createObj('Register', registra() ),
      setupOptions:createObj('setupOptions'), 
       published:createObj('Published'), 
      legalOptions:createObj('legalOptions'), 
      controller:new Set()
    }) );
    defineGetter(self, $$$compiler, createObj('compiler', {
      templateProcessor:pass,
      slotsTransformRender,
      slotRendererNotified:false,
      whenMountedHooks:new Tuple(),
      hoistedNodelist:new Tuple(),
      composedSlots:createObj('composedSlots'),
      compilerFlags:{},
      rawChildren:()=> undefined
    }));
    defineGetter(self.$$publicModel, '$signals', new Signals());
    getHouxBuildInstance(self, opts);
  }
  function maintainCompilerFlag_flag(self, effect){
    let flag=0;
    define(self[$$$compiler].compilerFlags, 'flags', {
      get(){
        return flag
      },
      set(newFlag){
        flag = newFlag;
        effect(self, flag)
        flag=0
        return true;
      }
    })
  }
  function triggerSlotsElementsEffect(self, renderedSlotsList, rawChildren){
    const observer = { 
      mutated:false, 
      willMutate:false, 
      updated_hooks:new Tuple(),
      effectFlush:new Tuple(),
      active:false
    } ;
    const data_set=slotsGeneticProvider(self, self[$$$core].opts, true, true, rawChildren);
    const slotsCore=_induceSlotContents(self, self[$$$core].opts, data_set, createObj("renderedSlotsList"));
    let index=0;
    for(const [key, node] of entries(renderedSlotsList)){
      if(!hasOwn(slotsCore, key)) {
        inDOMElementNodesRemover(self, node)
        delete renderedSlotsList[key]
        continue
      }
      let vnode=slotsCore[key](data_set[1], true) ;
      Render_Effect_Reactive_Transform(data_set[1], node, vnode, observer);
      self.$$publicModel._deferTick( function( resolve, reject ){
        if(len(observer.effectFlush)) {
          callSetHooks(self, observer.effectFlush  );
        }
      }).then(function(){
        if( observer.mutated && len(observer.updated_hooks ) && len(observer.effectFlush)) {
          callSetHooks( self , observer.updated_hooks, null, self.$$publicModel ) ;
          observer.updated_hooks.clear();
        }
      }) ;
      index++
    }
  }
  function slotsTransformRender(self, observer, rawChildren){
    const notified=self[$$$compiler].slotRendererNotified;
    if(isTrue(notified)) return;
    self[$$$compiler].slotRendererNotified=(true);
    const renderedSlotsList=self[$$$core].slotsFactory.renderedSlotsList
    if(!len(renderedSlotsList)) return;
    self.$$publicModel._deferTick(function(){
      triggerSlotsElementsEffect(self, renderedSlotsList, rawChildren);
    }).then(()=>{
      self[$$$compiler].slotRendererNotified= (false);
    })
  }
  function slotDebuger(self){
    return (slotName, slotContent)=>{
      $Debug(`
      Problem when mapping slot element,\n\nMore than one vnode seems to be pointing to the  same slot name\nat at "${slotName}" slot Directive  of "${slotContent.$element.outerHTML} \nmaybe you should wrap them within a single template wrapper`, self, true, "During the induction of slots contents");
      $warn(`Note: unnamed contents will be automatically mapped  as "default" slot\nWon't conflict with other default contents`, self );
      return false;
    }
  }
  function smartSlotMapping(self, slotContent, slotName, defaultSlotsRecord, slotsCore, patchFlags){
    if(!isEQ(slotName, 'default') && !hasOwn(slotsCore, slotName) ){
      slotsCore[slotName]=function slotRender() {
        return  new HouxFragmentVNode(patchFlags || self, isArray(slotContent) ? slotContent : [ slotContent ] )
      }
    }else if(isEQ(slotName, 'default')){
      defaultSlotsRecord.push(slotContent)
    }else{
      slotDebuger(self)(slotName, slotContent);
      return;
    }
  }
  function _induceSlotContents(self, options, setData , renderedSlotsList){
    let [ children, patchFlags, Flaghx__VNode ] = setData;
    const defaultSlotsRecord=[];
    const slotsCore=renderedSlotsList ? renderedSlotsList : self[$$$core].slots;
    if(!len(children) ) {
      defineFallbackSlotsRef(self, options, defaultSlotsRecord, slotsCore);
      return renderedSlotsList;
    }
    const hx__VNode=options.$children?.hx__VNode;
    const is_hyperscript= options.build ? true : false;
    if(exists(children) && isEQ(len(children), 1) && isLazyRender(children[0])){
      const evaluatedValue=children[0][lazyKey]()
      if(isArray(evaluatedValue)) children=evaluatedValue;
    }
    for(let slotContent of (children || [])?.values() ){
      slotContent=lazyUnwrap(slotContent)
      if(isPrimitive(slotContent) && exists(slotContent)){
        slotContent=new HouxTextVNode(patchFlags, String(slotContent), hx__VNode);
        defaultSlotsRecord.push(slotContent);
      }else if(isHouxVNode(slotContent) || isRenderVNodeClass(slotContent)){
        if(isRenderVNodeClass(slotContent)) slotContent =createInitialRenderBuild(patchFlags, !isArray(slotContent) ? [ slotContent ] : slotContent , hx__VNode);
        const slotName=slotContent.slot_name || 'default';
        if(IS_ELEMENT_NODE(slotContent.$element) && isEQ(slotContent.$element.localName,'template')){
          slotContent=new HouxFragmentVNode(patchFlags, slotContent.NodeList);
        }
        smartSlotMapping(self, slotContent, slotName, defaultSlotsRecord, slotsCore, patchFlags);
      }else if(isSlotInstance(slotContent) && len(slotContent.slots)){
        for(let [name, slot] of entries(slotContent.slots)){
          slot = lazyUnwrap(isPFunction(slot) ? slot(patchFlags) : slot );
          if(!isChildrenNode(slot)){
            $Debug(`Unexpected "${getType(slot)}" data type passed to renderSlots  instance\n at   ... ^ "${name}" slot"\n\nexpecting a houx valid  DOM instance value`,self, true);
            return;
          }
          slot=createInitialRenderBuild(patchFlags, !isArray(slot) && !isLazyRender(slot) ? [ slot ] : slot , hx__VNode);
          if(IS_ELEMENT_NODE(slot.$element) && isEQ(slot.$element.localName,'template')){
            slot=new HouxFragmentVNode(patchFlags, slotContent.NodeList);
          }
          smartSlotMapping(self, slot, name, defaultSlotsRecord, slotsCore, patchFlags);
        }
      }
    }
    if(len(defaultSlotsRecord)){
      slotsCore.default=function slotRender() {
        return _getNodeListResponse(defaultSlotsRecord, patchFlags)
      }
    }
    if(is_hyperscript ) defineFallbackSlotsRef(self, options, defaultSlotsRecord, slotsCore);
    return renderedSlotsList
  }
  function defineFallbackSlotsRef(self, options, defaultSlotsRecord, slotsCore){
    function factory(name){
      return function slotRender(def){
        if(len(arguments) && def && !isChildrenNode(def) || (isAFunction(def) && !isChildrenNode(def()))){
          $Debug(`Render functions default slot content requires to be a render function also`, self, true);
           return null;
        }else if(def && isChildrenNode(def)) {
          def=isPFunction(def) ? def(self) : def;
          return defineElement({
            type:"slot", 
            props:{ name },
            children:def 
          })
        }
        return defineElement({
          type:"slot", 
          props:{ name }
        });
      }
    }
    const o_slots=new Tuple(options.slots && len(options.slots) ? options.slots : [ "default" ] );
    if(!o_slots.has("default")) o_slots.add("default");
    for(const sn of o_slots.values()){
      if(!hasOwn(self[$$$compiler].composedSlots, sn)){
        self[$$$compiler].composedSlots[sn]=factory(sn);;
      }
    }
  }
  function _$instanciateModelProps(self){
    const is_hyperscript=self[$$$core].map.is_hyperscript;
    define( self.$$publicModel , $$$ReactiveProxyKey , { 
      value : self[$$$ownProperties].hx_hash_ + self[$$$operands].PATCH_FLAG  , 
      enumerable
    } ) ;
    if(isBuiltinWidgetBuild(self)) maintainCompilerFlag_flag(self, (instance)=>{
      self.$$publicModel._pushEffect();
    })
  }
  function $ensureLifeCircleHooks(self, options){
    const hooks="preBuild,postBuild,postMount,preMount,postUpdate,preUpdate,preDestroy,postDestroy,onTracked,onEffect,onCatch"
    const dirHKAlibi={ 
      init_hook:'preBuild',
      mounted_hook:'postMount',
      created_hook:'postBuild',
      updated_hook:'postUpdate',
      destroyed_hook:'postDestroy'
    }
    let customDirHk={}
    if(options[$$$customDirs]){
      entries(options[$$$customDirs]).forEach(([key, dirhk])=>{
        if(len(dirhk)){
          customDirHk[dirHKAlibi[key]]=function(){
            callSetHooks(self, dirhk, null, self.$$publicModel);
          }
        }
      })
      delete options[$$$customDirs];
    }
    hooks.split(',').forEach((hookN)=>{
      if(options[hookN] || len(customDirHk)){
        if( len( customDirHk) &&  hasOwn(customDirHk, hookN)){
          let thisHook=customDirHk[hookN];
          const user_defined_callback=options[hookN] || pass;
          options[hookN]=function(utils){
            if(isPFunction(thisHook)) thisHook();
            if(user_defined_callback) user_defined_callback.call(self.$$publicModel, utils)
          }
        }
        self[$$$operands]._LIFECIRCLEHOOKS[hookN]=options[hookN]||pass;
      }else self[$$$operands]._LIFECIRCLEHOOKS[hookN]=pass;
    })
    if(isFalse(self[$$$operands].initialized)) callbackHookWithCatch(self, self[$$$operands]._LIFECIRCLEHOOKS.preBuild,'preBuild');
  }
  function callbackHookWithCatch(self, hook, name){//this function calls a lifecircle hook with a catch debugger
    if(isPass(hook)) return
    try{
      hook.call(self.$$publicModel);
    }catch(err){
      $Debug(`${name} hook \n\n`,self, true, `during the call of the "${name}" LifeCycle hook` );
      $Debug(err)
    }
  }
  function RuntimeRefDir(self, options){
    const hasRef=options.$attributes && hasProp(options.$attributes, $$$$dir__ref$$$$);
    if(!hasRef) return;
    self[$$$ownProperties]['dir--ref']=options.$attributes[$$$$dir__ref$$$$];
    delete options.$attributes[$$$$dir__ref$$$$];
  }
  const ppK=Symbol()
  function slotsGeneticProvider(self, options, isRerender=false, inSlot, rawChildren){
    if(!options.$children) return;
    const hx__VNode= options.$children?.hx__VNode;
    const patchFlags = inSlot ? options[ppK] : options.$children?.patchFlags;
    const is_hyperscript = patchFlags ? patchFlags[$$$core].map.is_hyperscript : false;
    let childrenRender= inSlot && !hasOwn(options.$children, 'NodeList') ? options?.$children : options.$children?.NodeList;
    if(is_hyperscript) childrenRender = rawChildren;
    if(!inSlot && !isRerender) options[ppK]=patchFlags
    const fallThrough=self[$$$core].fallThrough ;
    let children=isPFunction(childrenRender) ? childrenRender(patchFlags, hx__VNode, fallThrough, isRerender) : childrenRender ;
    if( isFunction( children ) ) {
      children.$$patchFlags$$ = patchFlags;
      children = children( patchFlags ) ;
    }else if(isArray(children)){
      const childrenArr= new Set();
      children.values().forEach((child)=>{
        if( isPFunction( child ) ) {
          child.$$patchFlags$$ = patchFlags;
          child = child( patchFlags ) ;
        }
        childrenArr.add(child);
      })
      children= arrSet(childrenArr);
    }
    children = children && !isArray( children ) ? [ children ] : exists(children) ? children : [] ;
    return [ children, patchFlags, hx__VNode ] ;
  }
  function $fallThroughEngine(self, options){
    if(!options.fallThrough) return;
    let data;
    let subscribers;
    try{
      [ subscribers , data ] = effectDependencyTracking(self , function(){
        return options.fallThrough.call(self.$$publicModel);
      })
    }catch(err){
      $Debug(`Encountered an error when trying to run the fallThrough option method`, self, true);
      $Debug(err, self);
      return;
    }
    if(isNull(data)){
      $Debug(`The fallThrough option returns a nullish value \n\nReturning null is an invalid semantic `, self, true);
      return;
    }
    if(subscribers && len(subscribers)) self.$$publicModel._observe(subscribers, function(){
      self[$$$core].map.$$$fallThrough=options.fallThrough.call(self.$$publicModel)
      runtimeSlotsFallThrough(self, options, {} )
      self[$$$compiler].slotsTransformRender(self);
    });
    self[$$$core].map.$$$fallThrough=data;
  }
  function runtimeSlotsFallThrough(self, options, patch ){
    if(!options.$attributes && !hasProp(options.$attributes||{}, $$$fallThrough ) ) return;
    if(!patch) $fallThroughEngine(self, options);
    const value=self[$$$core].map?.$$$fallThrough;
    if(hasOwn(options, genericKeyProp) && hasOwn(self[$$$core].map, '$$$fallThrough') ){
      const genre=options[genericKeyProp];
      genre.propsTraverse(options, genre.hx__VNode, value, patch)//calls the consume_Widget_Props method in houx build 
    }
    const fallThrough=options.$attributes[$$$fallThrough];
    const prop=fallThrough?.prop;
    if(!hasProp(self[$$$core].map, '$$$fallThrough')) return;
    const hx__VNode= options?.$children?.hx__VNode;
    const patchFlags = options?.$children?.patchFlags;
    if(isFalse(destructWarn(prop, value, self))) return;
    if(isDestructureSyntax(prop)){
      const fallThroughProps = createObj('fallThrough');
      fallThroughProps[$$dexTransformKey]=hx__VNode.VNodeManager.dexTransform
      self[$$$core].fallThrough=fallThroughProps
    }else self[$$$core].fallThrough=createObj('fallThrough', {[prop]:value});
  }
  function defineLateGlobalProps(self, build){
    if(isHouxVNode(build)) useModel.call(self, { $element:build.$element});
  }
  function isInitialBuild(self){
    return isHouxBuild(self) && isTrue(self[$$$ownProperties].isInitialBuild)
  }
  function mapPublicationsTraverse(self, opts){
    if(!hasOwn(opts, 'publish')) return;
    const [ subscribers, value ]=effectDependencyTracking(self, ()=>{
      return opts.publish.call(self.$$publicModel)
    });
    if(!isPObject(value)) {
      $Debug(`Publish method option expects a plain object as a return value`, self, true);
      return
    }else if(isRef(value)){
      $Debug(`Publish cannot directly return a Reactive/readonly ref\n\nDefine it as a property of a plain object`, self, true)
      return;
    }
    const globalBoard= isInitialBuild(self) ? self[$$$core].$globals.published : self[$$$core]._root[$$$core].$globals.published;
    for(const [key, valueX] of entries(value)){
      define(globalBoard, key, { value: valueX, enumerable })
    }
  }
  function transformPublicationPrefix(self, opts){
    if(!hasOwn(opts, 'transform')) return;
    const globalBoard= isInitialBuild(self) ? self[$$$core]?.$globals.published : (self[$$$core]._root||{})[$$$core]?.$globals.published;
    for(let [ key, valueX] of getIterator(opts.transform)){
      let keyName = isArray(opts.transform) ? valueX : key ;
      if( !_validateType(keyName, [String, Symbol])){
        $Debug(`Arrays value of Transform option expects a string / Symbol values of published property names\n\n........"${keyName}"`, self, true);
        return
      }
      let defaultValue;
      if(!hasOwn(globalBoard, keyName)){
        if(isPObject(valueX) && hasProp(valueX, 'default')){
          if(!isPFunction(valueX.default)) defaultValue=valueX.default
          else{
            defaultValue = !isAFunction(valueX.default) ? valueX.default.call(self.$$publicModel) : valueX.default()
          }
        }else{ 
          $Debug(`No published props with the provided transform key "${keyName}"\n\nUnrecognized transform property`, self, true);
          return;
        }
      }
      let transformed= get_Object_Value( globalBoard , keyName );
      if(isPObject(valueX) && hasOwn(valueX, 'transform')){
        if(!isPFunction(valueX.transform)){
          $Debug(`transform option of "${key}" transform property expects a function`, self, true);
          return 
        }
        transformed = !isAFunction(valueX.transform) ? valueX.transform.call(self.$$publicModel, transformed ) : valueX.transform(transformed);
      }
      if(!hasOwn(globalBoard, keyName) && !exists(transformed) && hasProp(valueX, 'default') && exists(defaultValue)) transformed=defaultValue ;
      if(isReactiveRef(transformed) || isShallowReadOnlyRef(transformed)){
        transformed.effectTrigger(()=>{
          generateDependencySubscriptions(self, transformed );
          self[$$$operands].dependency.notify()
        })
      }
      let aliasKey=keyName;
      if(isPObject(valueX)){
        if(!hasOwn(valueX, 'alias')){
          $Debug(`transform prop "${keyName}" object expects an "alias" property`, self, true);
          return;
        }else if(!_validateType(valueX.alias, [ String, Symbol])){
          $Debug(`"${keyName}" transform alias property expects a String or a Symbol`, self, true);
          return;
        }else if(!exists(valueX.alias)){
          $Debug(`alias property of "${keyName}" transform property is an empty string or undefined`, self, true);
          return
        }else if(_validateType(valueX, [String, Symbol])){
          valueX={ alias:valueX };
        }
        aliasKey = valueX.alias;
      }
      if(object_Has_Path(self.$$publicModel, aliasKey)){
        $Debug(`"${aliasKey}" property of transform conflicts with an existing model property\n\nTry configuring an alias property\n\n............at "${keyName}"`, self, true);
        return;
      }
      define( self.$$publicModel , aliasKey , { value : transformed  , enumerable , configurable } ) ;
    }
    return true;
  }
  function traverseMixins_Inheritance(self, options){
    if(!hasOwn(options, 'mixins') && !len(options.mixins)) return;
    for(const [ index, mx ] of entries(options.mixins)){
      if(isPFunction(mx) ){
        
      }
    }
  }
  function getHouxBuildInstance(self, options){
    if(!hasOwn(options, $buildHx_VNodeKey) && !isHouxVNode(options[$buildHx_VNodeKey])) return;
    self[$$$ownProperties].hx__VNode=options[$buildHx_VNodeKey];
    delete options[$buildHx_VNodeKey];
  }
  function _Houx_Build( options ) {
    instancerdinateProps( this , options ) ; //create properties;
    sanitizedOptions( this , options ) ;//sanitize received options
    $ensureLifeCircleHooks( this , options ) ;
    setConfig(this, options ); 
    $construct_With_Signals(this, options);
    map_Events_Fall(this , options);
    __Ensure_Renderer(this, options);
    this[$$$compiler].templateProcessor = function templateProcessor(self, build, rerender ){
      if(!rerender) build=_$slotHydrationRenderer(self, options, build);
      build =  _hydrate_$Attributes(options, self, build);
      build=_preCompile_StyleSheet(options, self, build);
      RuntimeRefDir(self, options);
      defineLateGlobalProps(self, build);
      return build;
    }
    resolveBuildLab(this, options);
    resolve_Proto_Call(this, options);
  }
  function resolveBuildLab(self, options){
    self[$$$core].build=options.build || options.template || options.markdown 
    self[$$$core].opts=options;
  }
  function isRender(build){
    return isPFunction(build) && isEQ(build.name,'render');
  }
  function returnRender( build , self ){
    return function render( self , update , forceFragment){ 
      build= isPFunction( build ) ? build( self ) : build;
      return  isArray(build) ? _getNodeListResponse(build, self) : build ;
    }
  }
  function $$houxPower(){
    
  }
  function getComposersContext(self, ){
    const composers=createObj("Composers");
      define(composers, 'signals', { value:self.$$publicModel.$signals, enumerable })
      define(composers, 'attrs', {value:self.$$publicModel.$attrs, enumerable })
      define(composers, 'slots', { value:self[$$$compiler].composedSlots , enumerable });
    for(const [key, macro] of entries(self[$$$core].utils)){
      define(composers, key, { value:macro, enumerable })
    }
    return composers
  }
  function trackTemplateSource(self, selector, fall, hx__VNode){
    fall = fall || {};
    let render = pass;
    if(isString(self[$$$core].build)){
      render = (instance, update)=> _HouxTemplateParser(self[$$$core].build, instance, false, hx__VNode, fall);
      self[$$$core].render=render;
    }else if(isNull(self[$$$core].build) && selector){
      inDomCaveatRemodeling(self);
      self[$$$core].build=_GenerateRoot(selector, self)?.innerHTML || ''
      render = (instance, update)=> _HouxTemplateParser( self[$$$core].build, instance, false, hx__VNode, fall);
      self[$$$core].render=render;
    }
    self[$$$core].map.is_hyperscript=false
    return render
  }
  function createGarbageCollector(self){
    self[$$$compiler][garbageKey]={
      postBuild:new Tuple(),
      postUpdate:new Tuple(),
      postMount:new Tuple(),
      postDestroy:new Tuple(),
      preDestroy:new Tuple(),
      preUpdate:new Tuple(),
      preMount:new Tuple(),
      onEffect:new Tuple(),
      onTracked:new Tuple(),
      onCatch:new Tuple()
    }
  }
  function mapGarbargeHooks(self){
    for(const [name, tuple] of entries(self[$$$compiler][garbageKey])){
      if(!len(tuple)) continue;
      function hook(){
        tuple.list().forEach(function(fn){
          callbackHookWithCatch(self, fn, name )
        })
      }
      const joinder=self[$$$operands]._LIFECIRCLEHOOKS[name]
      if(isPass(joinder)) self[$$$operands]._LIFECIRCLEHOOKS[name]=hook;
      else {
        self[$$$operands]._LIFECIRCLEHOOKS[name]=function(){
          hook();
          callbackHookWithCatch(self, joinder, name )
        }
      }
    }
    delete self[$$$compiler][garbageKey];
  }
  function traverseBuildWidgetTemplate(self){
    const normalizer=self[$$$core].opts[$buildWidgetNormalizerKey];
    self[$$$core].build=normalizer(self.$$publicModel.$params.self._data, self);
    if(hasOwn(self[$$$core].build, 'template')) self[$$$core].opts.template=self[$$$core].build.template;
    delete self[$$$core].opts[$buildWidgetNormalizerKey];
    self[$$$compiler].parentContext=self[$$$core].build.parentContext;;
    return self[$$$core].build.parentContext;
  }
  function tramsformBuiltinTradeOFF(self){
    const normalizer=self[$$$core].opts[$buildWidgetNormalizerKey];
    const { template, is_hyperscript } = normalizer;
    let build = template;
    // log(template, is_hyperscript, lazyUnwrap(template))
    if(is_hyperscript){
      build = function render(params, ctx ){
        return ()=> lazyUnwrap(template)
      }
    }
    const context = assign({}, normalizer);
    delete context.template;
    delete normalizer[$buildWidgetNormalizerKey];
    self[$$$compiler].parentContext=context;
    self[$$$core].build=build;
    return context
  }
  function handleBuildGenerator(self, selector, build){
    let context;
    if(isBuiltInBuildWidget(self)) context = traverseBuildWidgetTemplate(self);
    else if(isBuiltinWidgetBuild(self)) context = tramsformBuiltinTradeOFF(self);
    let render;
    if(isFunction(self[$$$core].build)){
      let responseRender;
      let renderer;
      createGarbageCollector(self)
      try{
        if(!isBuiltInBuildWidget(self) && !isBuiltinWidgetBuild(self)) widgetSlotsManager(self, self[$$$core].opts)
        installCurrentRunningEffect(self);
        renderer = self[$$$core].build.call(self.$$publicModel, self.$$publicModel.$params, getComposersContext(self));
        reinstatePreviousRunningEffect()
        responseRender=renderer;
        if(isAFunction(self[$$$core].build) && !isPFunction(renderer) ) responseRender=()=>renderer;
      }catch(err){
        $Debug(`Error during the call of the build function`,self, true, DebugFlags.build);
        if(isXtruct(self[$$$core].build)){
          $Debug(`Method seems to be a constructor function`, self);
        }else $Debug(err, self);
        return ;
      }
      mapGarbargeHooks(self);
      if(isModelInstance(renderer) && !isFunctionBasedBuild(self)) {
        const options = self[$$$core].opts
        self[$$$core].build=hasOwn(options, "template") ? options.template : null ;
        const templateRender= trackTemplateSource(self, selector, context && hasOwn(context, 'self') ? {
            props:self.$$publicModel.props
          } : null)(context?.self || self );
        if(isBuiltInBuildWidget(self)) { 
          self[$$$core].build=`<hx:build>${self[$$$core].build}</hx:build>`;
        }
        return templateRender
      }
      if(!isPFunction(responseRender) && !isAFunction(self[$$$core].build) ){
        $Debug(`Error during the procession of the build function/functional widget\n\nfailed to return a render function when returning the build method\n \n This may conflict with the processing of returnable DOM  nodes`, self, true, DebugFlags.build);
        return false;
      }else if(!isChildrenNode(responseRender())){
        $Debug(`value not a valid Houx-DOM instance`, self, true);
        return false;
      }
      self[$$$core].map.is_hyperscript=true;
      self[$$$core].render= function factoryRender(instance, update=false){
        let response=lazyUnwrap(responseRender());
        return !isArray(response) ? [ response ] : response ;
      };
    }else {
      if(!isBuiltInBuildWidget(self)) widgetSlotsManager(self, self[$$$core].opts)
      render=trackTemplateSource(self, selector,context?.self ? { 
        props:self.$$publicModel.props 
      } : null );
    }
    return self[$$$core].render(context?.self || self);
  }
  function inDomCaveatRemodeling(self){
    const setRegex=/^[A-Z]+/
    for(const [ name, item] of entries(self[$$$register].widgets)){
      if(setRegex.test(name)) self[$$$register].widgets[_to_kebab_case(name)]=item;
    }
    for(const [ name, item] of entries(self[$$$register].directives)){
      if(setRegex.test(name)) self[$$$register].directives[_to_kebab_case(name)]=item;
    }
  }
  function resolve_Proto_Call(self, opts){
    new Promise((resolve, reject)=>{
    }).then((data)=>{
      if(!self[$$$operands].hasMountProto){
      }
      return self;
    })
    return self;
  }
  function _GenerateRoot(nodeSelector, self){
    if(isNull(nodeSelector)){
      $Debug(`no node model or selector value passed for deployment`, self, true);
      return;
    }
    let domRoot;
    if(isString(nodeSelector)){
      domRoot=document.querySelector(nodeSelector);
      if(!isNativeElement(domRoot)){
        $Debug(`error generating element, target not a valid native element`, self, true);
        return;
      }
    }else if(isNativeElement(nodeSelector) || nodeSelector.isHoux_Fragment){
      domRoot=nodeSelector;
    }
    return domRoot
  }
  function getGlobalRegistery(self){
    return self[$$$core].$globals ;
  }
  function mergeRegisteries(self){
    entries(self[$$$core].$globals.register).forEach(([name, value])=>{
      for(let [key, content] of entries(value)){
        if(!hasProp(self[$$$register][name], key)){
          self[$$$register][name][key]=content
        }
      }
    })
    useModel.call(self, assign({}, self[$$$register].properties))
  }
  function validateRegistryProvider(self){
    const registeredOpts=getGlobalRegistery(self).legalOptions;
    const _opts=self[$$$operands]._OPTIONS;
    for(let [ key, opt] of entries(_opts)){
      if(!_mapValue(registeredOpts, key)){
        $Debug(`Unrecognised option found\n\n"${key}" option is not a valid widget option or a registered option,
        \n\nYou can register this option by passing an "optionRegistry" object prop to "build.controller()" method`, self, true);
        return;
      }else if(!_validateType(opt, registeredOpts[key])){
        $Debug(`The privided "${key}" option validation failed on the required type\n\n
        Type of "${getType(opt)}"" found\n\n`,self, true );
        return;
      }
      
    }
  }
  function createPortalEntryDisplay(self, build){
    if(!isBuiltInPortalWidget(self)) return;
    const target=self.$$publicModel.$params.target._data;
    const portalElement=target ? _GenerateRoot(target) : undefined
    if(!portalElement){
      $Debug(`unable to generate portal element\n\nTarget not existing in the current document model`, self, true);
      return;
    }else if(!IS_ELEMENT_NODE(portalElement) && !IS_DOCUMENT_FRAGMENT_NODE(portalElement) && !IS_DOCUMENT_NODE(portalElement)){
      $Debug(`mounting target for Portal widget is not a valid element`, self, true);
      return;
    }
    return portalElement
  }
  function widgetSlotsManager(self, options){
    runtimeSlotsFallThrough( self , options ) ;
    const setData = slotsGeneticProvider( self , options )
    _induceSlotContents( self , options , setData || [] ) ;
    for(const [key, content] of entries(self[$$$core].slots)){
      self[$$$compiler].composedSlots[key]=function slotRender(){
        return defineElement({
          type:'slot', 
          props:{ name: key }
        })
      }
    }
  }
  function prefixManagement( self ) {
    const options = self[$$$core].opts ;
    mapPublicationsTraverse(self, options) ;
    validateRegistryProvider( self ) ;
    mergeRegisteries( self ) ;
    _$instanciateModelProps( self ) ;
  }
  const isGettersObject=computed=>isPObject(computed) && (hasProp(computed, 'get') && isPFunction(computed.get) || hasProp(computed, 'set') && isPFunction(computed.set));
  class computedRefCache {
    computedRef = pass
    constructor( callback ) {
      this.computedRef=callback
    }
    transformer(prop){
      return {
        computedRefs:{
          [prop]:this.computedRef
        }
      }
    }
  }
  const isComputedMacro=value=> value instanceof computedRefCache;
  function computed(callback){
    if(!isPFunction(callback) && !isGettersObject(callback)){
      $Debug(`computed properties expects a getter function or a descriptor object of getter and an optional setter property methods`, self, true);
      return;
    }
    return new computedRefCache(callback)
  }
  function computedRefsCompile(self, opts){
    if(!opts.computedRefs || !len(opts.computedRefs)) return
    for(let [key, computed] of entries(opts.computedRefs)){
      if(!isPFunction(computed)){
        $Debug(`computed properties expects a getter function or a descriptor object of getter and an optional setter property methods`, self, true);
        return
      }
      const [ subscribers, value ] = effectDependencyTracking(self, ()=>{
        return computed.call(self.$$publicModel);
      } )
      const computedRef=readonly(value, isGettersObject(computed), true);
      computedRef[refInternalEffectKey][ '[[[computed__Ref]]]' ] = true;
      computedRef[refInternalEffectKey].computed=computed;
      if( len( subscribers ) ) {
        self.$$publicModel._observe( subscribers , () => {
          if( isComputedRef( computedRef ) ) {
            computedRef[refInternalEffectKey].updateFlags ++;
            if( !computedRef[refInternalEffectKey].ModelInstance ) computedRef[refInternalEffectKey].ModelInstance = self.$$publicModel;
          }
        } )
      }
      define(self.$$publicModel, key, {
        get(){
          return computedRef
        }
      })
    }
  }
  function callUpdatedHook(self, obs, ){
    for( let fn of obs.updated_hooks.values()){
      fn()
    }
    obs.updated_hooks.clear();
    callbackHookWithCatch(self, self[$$$operands]._LIFECIRCLEHOOKS.postUpdate, 'postUpdate');
  }
  function mount(nodeSelector){
    let domRoot=_GenerateRoot(nodeSelector, this);
    if(!bool(domRoot.isHoux_Fragment)) define(domRoot, 'NodeList',{
      value:new Tuple(), 
      configurable, 
      writable
    });
    if(!domRoot.PATCH_FLAGS) define(domRoot, 'PATCH_FLAGS',{
      value:new Set(),
      configurable, 
      writable
    });
    const fakePortal = activateWatchObserverPlugin(this, nodeSelector);
    if(isBuiltInPortalWidget(this)) domRoot = fakePortal
    else if(IS_ELEMENT_NODE(domRoot)) domRoot.innerHTML='';
    if(this[$$$ownProperties].isInitialBuild && !IS_ELEMENT_NODE(domRoot)){
      $Debug('initial entry Point mount root expects an element node', this, true);
      return this
    }else if(this[$$$ownProperties].isInitialBuild && domRoot.IS_HOUX_MOUNTROOT){
      $Debug(`A Houx widget has already been mounted on this element, cannot mount more than one Widget on a single root element`, this, true, "When trying to mount this initialBuild widget to the DOM");
      return this;
    }
    adapterDOMMountingProduction(this, domRoot)
    return this;
  }
  function activateWatchObserverPlugin(self, nodeSelector){
    _Data_Hydrations(self, self[$$$core].opts)
    prefixManagement(self);
    let initialBuild=handleBuildGenerator(self, nodeSelector);
    defineGetter(self, 'build', Render_Template(self, initialBuild, false) );
    _Reactive_Adapter_Plugin( self.$$publicModel ,async function adapter(newV, oldV, ref){
      _EffectDependencyNotifier(self);
      _ReconciliationTransformTrigger(self, { newV, oldV, ref },  nodeSelector );
    }, self, true);
    callbackHookWithCatch(self, self[$$$operands]._LIFECIRCLEHOOKS.onTracked, 'onTracked');
    callbackHookWithCatch(self, self[$$$operands]._LIFECIRCLEHOOKS.postBuild, 'postBuild');
    deferTick(()=>self[$$$operands].onRenderTracked=true);
    self[$$$operands].initialized = true ;
    return createPortalEntryDisplay(self, self.build)
  }
  function adapterDOMMountingProduction(self, domRoot){
    const MoutRootToken={
      IS_HOUX_MOUNTROOT:true,
      __mountRootToken:'hx__'+_generateUUID(5),
    }
    callbackHookWithCatch(self, self[$$$operands]._LIFECIRCLEHOOKS.preMount, 'preMount');
    domRoot = activateBuildMount(self, domRoot);
    whenMounted(self, self.build, ()=>{
      for(const fn of self[$$$compiler].whenMountedHooks.values()){
        callbackHookWithCatch(self, fn, '')
      }
      callbackHookWithCatch(self, self[$$$operands]._LIFECIRCLEHOOKS.postMount, 'postMount');
    });
    self[$$$operands].hasMountProto=true;
  }
  function activateBuildMount(self, domRoot){
    if(isBuiltInPortalWidget(self)) return domRoot;
    if(isInDomNode(domRoot) && IS_ELEMENT_NODE(domRoot) ) {
        domRoot.innerHTML='';
        domRoot.append(self.build?.$element || '');
      if(self[$$$ownProperties].isInitialBuild) self.property('$root', self.build);
    }else domRoot=self.build?.$element;
    if(domRoot?.isHoux_Fragment && !domRoot?.trigger_Effect_Run ) define(domRoot, 'trigger_Effect_Run', {
      value: Widget_Effect_Trigger.bind(self)
    });
    return domRoot
  }
  function widget(name, widget){
    if(!isString(name) || !validHouxWidget(widget)){
      $Debug(`unrecognised global widget registration for "${name}" widget`, this, true);
      return this;
    }
    if(isEQ(len(new Set(arguments)),2)){
     define(this[$$$core].$globals.register.widgets, name, {
       value:widget,
       enumerable, 
       configurable
     });
    }
    return this;
  }
  function install(plugin, options){
    if(!_validateType(plugin, [ Object, Function ])){ 
      $Debug(`plugin installation Error::\n\n install argument must be an object value with  an exposed plugin installation method or a function which acts as the plugin method itself`, this, true);
      return this;
    }else if(isPObject(plugin) && !isPFunction(plugin.plugin)){
      $Debug(`plugin installation Error::\n\n plugin object did not expose a plugin installation method`, this, true);
      return this;
    }
    let usePlugin=isPObject(plugin) ? plugin.plugin : plugin;
    if(isPObject(usePlugin) ) plugin.plugin(this, options);
    else usePlugin(this, options);
    return this;
  }
  function handler(name, handler){
    if(!isChar(name) && !isFunction(handler)){
      $Debug(`unrecognised global handler registration for ${handler}`, this, true);
      return this;
    }
    if(isEQ(len(arguments),2)){
      this[$$$core].$globals.register.handlers[name]=handler;
    }
    
    return this
  }
  function directive(name, directive){
    if(!isChar(name) && !_validateType(directive, [ Function, Object ])){
      $Debug(`unrecognised global directives registration for ${directive}`, this, true);
      return this;
    }
    if(isEQ(len(arguments),2)){
      this[$$$core].$globals.register.directives[name]=directive;
    }
    return this;
  }
  function mixin(mixin){
    if(isClass(mixin) || _validateType(mixin, [Object])){
      $Debug(`unrecognised global mixin registration for ${compileToRenderable(mixin)}`, this, true);
      return this;
    }else if(!isEQ(len(arguments), 1)){
      $Debug(`.mixin() expects not more than one formal argument`, this);
      return this;
    }
    this[$$$core].$globals.register.mixins.add(mixin);
    return this ;
  }
  function filter(name, filter){
    if(!isChar(name) && !isFunction(filter)){
      $Debug(`unrecognised global filter helper registration for ${filter}`, this, true);
      return this;
    }
    if(isEQ(len(arguments),2)){
      this[$$$core].$globals.register.filters[name]=filter;
    }
    return this ;
  }
  function block(name, block){
    if(!isChar(name) && !isFunction(block)){
      $Debug(`unrecognised global block helper registration for ${block}`, this, true);
      return this;
    }
    if(isEQ(len(arguments),2)){
      this[$$$core].$globals.register.blocks[name]=block;
    }
    return this ;
  }
  
  function property(name, value){
     if(!isChar(name)){
      $Debug(`unrecognised global property registration for ${value}`, this, true);
      return this;
    }
    if(isEQ(len(arguments),2)){
      this[$$$core].$globals.register.properties[name]=value;
    }
    return this
  }
  function destroy(){
    if(len(arguments)){
      $Debug(`.destroy() method of initBuild accepts no formal parameters`, this);
    }else if(!this[$$$operands].hasMountProto){
      $Debug(`instance of widget not yet mounted\n\nwidget unmounting failure`);
      return false
    }
    try{
      inDOMElementNodesRemover(this, this.build);
      delete this[$$$operands];
      delete this[$$$core];
      delete this[$$$compiler];
      delete this[$$$ownProperties];
      delete this.$$publicModel;
      delete this.build;
      Object.setProtypeOf(this, null)
    }catch(err){
      $Debug(`widget destroy failed`, this, true);
      $Debug(err);
      return false;
    }
    return freeze(this);
  }
  function configDelimeters(delimiters){
    if(isFalse(mapSettingCheck(this, 'delimiters', delimiters))) return this;
    this[$$$core].settings.delimiters=delimiters;
    return this
  }
  function configDebug(debug){
    if(isFalse(mapSettingCheck(this, 'debug', debug))) return this;
    this[$$$core].settings.debug=debug;
    return this
  }
  function configForwardAttrs(forwardAttrs){
    if(isFalse(mapSettingCheck(this, 'forwardAttrs', forwardAttrs))) return this;
    this[$$$core].settings.forwardAttrs=forwardAttrs
    return this;
  }
  function configIsAsync(isAsync){
    if(isFalse(mapSettingCheck(this, 'isAsync', isAsync))) return this;
    this[$$$core].settings.isAsync=isAsync;
    return this
  }
  function configForwardSlot(){
    if(isFalse(mapSettingCheck(this, 'forwardSlot', forwardSlot))) return this;
    this[$$$core].settings.forwardSlot=forwardSlot;
    return this
  }
  function configIsCustomElement(isCustomElement){
    if(isFalse(mapSettingCheck(this, 'isCustomElement', isCustomElement))) return this;
    this[$$$core].settings.isCustomElement=isCustomElement;
    return this
  }
  function configUseSSRCompiler(useSSRCompiler){
    if(isFalse(mapSettingCheck(this, 'useSSRCompiler', useSSRCompiler ))) return this;
    this[$$$core].settings.useSSRCompiler=useSSRCompiler;
    return this;
  }
  function configScopedStyleSheet(scopedStyleSheet){
    if(isFalse(mapSettingCheck(this, 'scopedStyleSheet', scopedStyleSheet))) return this;
    this[$$$core].settings.scopedStyleSheet=scopedStyleSheet;
    return this
  }
  function optionsHookTransform(hookName, callback ){
    
  }
  function controller(options){
    if(!isPObject(options)){
      $Debug(`argument at position 1 expects a plain object\n\nType unaccepted`, this, true);
      return;
    }
    this[$$$core].$globals.controller.add(options);
    optionsRegistery(this, options);
    let { setupOptions , pluginAdapter } = options;
    if(hasOwn(options, 'pluginAdapter') && !isPFunction(pluginAdapter)) {
      $Debug(`pluginAdapter option of .controller() method expects a function/method type`, this, true);
      return this;
    }
    if(!exists(pluginAdapter) && !isPFunction(pluginAdapter)) pluginAdapter = pass
    pluginAdapter( this , optionsHookTransform );
    return this
  }
  function configOptions(buildConfig={}){
    setConfig(this, { buildConfig });
    return this
  }
  function optionsRegistery(self, options){
    if(!hasProp(options, 'optionsRegistery')) return;
    else if(!isPObject(options.optionsRegistery)){
      $Debug(`The "optionsRegistery" property argument of controller expects a plain object\n\nType Unexpected`, self, true);
      return;
    }
    const registered=options.optionsRegistery;
    const globals=getGlobalRegistery(self);
    entries(options.optionsRegistery).forEach(([key, validator])=>{
      if(_mapValue(globals.legalOptions, key)){
        $Debug(`${key} custom optionsRegistery already exists in the registery record`, self, true);
        return;
      }
      define(globals.legalOptions, key, {
        value: validator, 
        enumerable
      });
    })
  }
  function mountedWarning(self, name){
    if(isTrue(self[$$$operands].hasMountProto)){
      if(!self[$$$core].map.mountWarn) {
        $Debug(`This "mount" method has been called and calling of methods after the widget is mounted is prohibited\n\n call to the ('.${name}') method is considered an invalid houx syntax`, self, true);
        self[$$$core].map.mountWarn=true;
      }
      return false;
    }
    return true;
  }
  function publish(prop, value){
    if(!_validateType(prop, [ String, Symbol ])){
      $Debug(`Parameter 1 on .publish() expects a string or a Symbol `, this, true);
      return this;
    }
    const globalBoard= isInitialBuild(this) ? this[$$$core].$globals.published : this[$$$core]._root[$$$core].$globals.published;
    define(globalBoard, key, { 
      value: valueX, 
      enumerable 
    });
    return this;
  }
  function hydrate(){
    
    return this
  }
  function buildMethods(){
    return { 
      mount,
      widget, 
      mixin,
      install, 
      handler, 
      directive,
      property,
      filter,
      block,
      configDelimeters,
      configIsAsync,
      configIsCustomElement,
      configForwardSlot, 
      configScopedStyleSheet,
      configUseSSRCompiler, 
      controller,
      configForwardAttrs,
      hydrate,
      configOptions,
      destroy,
      publish
    };
  }
  for(let [ key, fn ] of entries( buildMethods() )){
    fn=new Proxy(fn, {
      apply(target, thisArg, args){
        const res =isEQ(key, 'destroy') ? true :  mountedWarning(thisArg, key ) ;
        if(isTrue(res)) Reflect.apply(...arguments);
        return thisArg;
      }
    })
    _Houx_Build.prototype[key]=fn;
  }
  function openTaskPrefix(self){
    self[$$$core].depsQueue.vibrate();
  }
  async function deferEventCircleThread(self, fn, persist=false){
    if(self && isHouxBuild(self)){
      if(isFalse(self[$$$operands].garbageWatch)){
        queueMicrotask(()=>{
          fn.call(self.$$publicModel);
          queueMicrotask(()=>{
            self[$$$operands].garbageWatch=false;
          });
        })
        self[$$$operands].garbageWatch=true;
      }
      if(persist){
        new Promise((resolve, reject)=>{
          resolve(isFalse(self[$$$operands].garbageWatch))
        }).then(()=>{
          queueMicrotask(fn);
        })
      }
    }else queueMicrotask(fn);
  }
  function whenMounted(self, build, callback){
    return new Promise((resolve, reject)=>{
      resolve(isEQ(isHouxVNode(build) ? build.$element.getRootNode() : build.getRootNode(), document))
    }).then((res)=>{
      callback();
    }).catch((err)=>{
      $Debug(`${err}`, self, true);
    })
  }
  function createInitialRenderBuild(self, vnodes, update=false){
    const NodeList=new Tuple();
    for(let [index, node ] of vnodes.entries()){
      node = lazyUnwrap(node)
      if(!isChildrenNode(node)){
        $Debug(`unrecognised element passed to render`, self, true);
        continue;
      }else if(isPrimitive(node) && exists(node)){
        if(!exists(String(node).trim())) continue;
        node=new HouxTextVNode(self, String(node) );
        NodeList.add(node);
      }else if(isRenderVNodeClass(node)){
        node=renderVNodeClassElement(self, node, update);
        NodeList.add(node);
      }else if(isHouxVNode(node)) NodeList.add(node);
      else if(isCustomElement(node)) NodeList.add(node);
      else if(isSpreadFragment(node)){
        for(let child of node[spreadFragmentKey].values()){
          if(!isChildrenNode(child)){
            $Debug(`unrecognised element passed to render`, self, true);
            continue;
          }
          child=lazyUnwrap(child);
          child =renderVNodeClassElement(self, child, update)
          NodeList.add(child);
        }
      }
    }
    return _getNodeListResponse(NodeList, self)
  }
  function posixVNodeTransform(self, build){
    if(!self[$$$core].posixVNode || isElementType(self[$$$core].posixVNode, 'slot')){
      const newPosixVnode = new HouxTextVNode(self, "");
      if(isElementType(self[$$$core].posixVNode, 'slot')){
        if(IS_DOCUMENT_FRAGMENT_NODE(build.$element) || (IS_ELEMENT_NODE(build.$element) && !isElementType(build.$element, 'slot'))){
          build.$element.append(newPosixVnode.$element)
        }else if(isElementType(build.$element, 'slot')){
          build=new HouxFragmentVNode(self, [ newPosixVnode, build])
        }else build = newPosixVnode;
      }
      self[$$$core].posixVNode=newPosixVnode;
    }
    return build
  }
  function Render_Template( self , initBuild , update = false ) {
    const instance = (isBuiltInBuildWidget(self) || isBuiltinWidgetBuild(self)) && self[$$$compiler].parentContext ? self[$$$compiler].parentContext.self : self;
    initBuild = isFunction(initBuild) ? initBuild( instance , update ) : initBuild  ;
    // if(isBuiltinWidgetBuild(self)) log(initBuild, vb(self).ownProperties)
    if(isArray(initBuild)) initBuild= createInitialRenderBuild(instance, initBuild, update)
    initBuild = posixVNodeTransform(self, initBuild)
    if(!initBuild || !initBuild.$element ){
      initBuild=self[$$$core].posixVNode;
    }
    initBuild = self[$$$compiler].templateProcessor( instance , initBuild, update ) ;
    return initBuild ;
  }
  function deferTick( fn ) {
    const self= this && isHouxBuild( this ) ? this : null
    if( len( arguments ) && !isPFunction( fn ) ) {
      $Debug( `positional argument 1 on "deferTick" is not a function\n\n callback requires a function type` , self , !isNull( self ) ) ;
      fn = pass ;
    }
    return new Promise( ( resolve , reject ) => {
      resolve( deferEventCircleThread( self , fn , isHouxBuild( self ) ) ) ;
    } ) ;
  }
  function _Reactive_Adapter_Plugin(data, callback, self, deep=false){
    const observers=[];
    const observe=(getter, callback)=>{
      const observer = new self[$$$core].Observer( getter, callback, self);
      observers.push(observer);
      observer.update();
    }
    if(self[$$$operands].PATCH_FLAG ){
      observe(()=>data[$$$ReactiveProxyKey], (newV, oldV)=>{
        try{
          callback(newV, oldV, $$$ReactiveProxyKey);
          self[$$$operands].PATCH_FLAG=0
        }catch(err){
          $Debug(`Encountered a Problem during DOM rendering reactive trigger\n\n`, self, true);
          $warn(err, self);
        }
      })
    }
  }
  const isReadOnlyProp=key=>_mapValue(readOnlyModelProp, key);
  function preUpdateHookFlush(self){
    
  }
  function triggerHydration(self, observer){
    callbackHookWithCatch(self, self[$$$operands]._LIFECIRCLEHOOKS.onEffect, 'onEffect');
    if(isHouxVNode(self.build)) {
      let buildTemplate = isBuiltinWidgetBuild(self) ? self[$$$compiler].rawChildren : self[$$$core].render;
      if(isBuiltinWidgetBuild(self) && isPFunction(buildTemplate)){ 
        buildTemplate = buildTemplate()
      }
      Render_Effect_Reactive_Transform( self , self.build , Render_Template( self , buildTemplate , true ) , observer ) ;
      self.$$publicModel._deferTick(function() {
        if(len(observer.effectFlush)){
          callbackHookWithCatch(self, self[$$$operands]._LIFECIRCLEHOOKS.preUpdate, 'preUpdate');
          callSetHooks(self, observer.effectFlush );
        }
      } ).then(function(){
        if( observer.mutated && len(observer.effectFlush) ){
          callUpdatedHook( self , observer ) ;
          observer.updated_hooks.clear();
        }
      }) ;
    }
  }
  function _ReconciliationTransformTrigger(self, reacteData, selector){
    const { newV:newValue, oldV:oldValue, ref:reference  }= reacteData;
    const observer={ 
      mutated:false, 
      updated_hooks:new Tuple(), 
      active:false , 
      willMutate:false,
      effectFlush:new Tuple()
    };
    triggerHydration(self, observer);
  }
  const HouxUpdateSkippDirectives="if,else,else-if,for,raw,ref,slot,model,hx,bind,on,scoped,fall,animation,transition,clone";
  const HouxUpdateDirs="html,text"
  function shouldUpdateProp(prop){
    if((has$$_bind(prop) && !(prop.startsWith("$$html") || prop.startsWith("$$text")) ) || hasAt_bind(prop) || hasAsterisks_bind(prop) || isOnListener(prop)) return false;
    return true;
  }
  function callDepsGetters(depsArray=[]){
    depsArray.entries().forEach(([index, getter])=>{
      if(isPFunction(getter)) depsArray[index]= getter()
    });
    return depsArray;
  }
  function validityPropsHydration(self, element, vnode, observer, is_hyperscript){
    const PropFlags=vnode.VNodeManager.patchFlags.PropFlags;
    let index=0;
    for(const [ key, item ] of entries(PropFlags)){
      if(!(shouldUpdateProp(key) )) continue;
      let { dependencies, accessor, evaluatedValue, initialDependencies, resolvedPropName } = item;
      const response=AttributeEqualityDiffing(self, vnode, {
        value:evaluatedValue(),
        key:resolvedPropName(),
        index
      } , {
        is_hyperscript,
        observer,
        value:accessor(),
        key
      })
      index++
      if(!response) continue;
      ElementPropsCompiler( { 
        [key]:accessor()
      }, element, self, vnode, true, {
        evaluatedValue,
        observer,
        accessor,
        key
      })
    }
  }
  function AttributeEqualityDiffing(self, hx__VNode, shapeProps, metrics){
    const { index, key, value, observer, is_hyperscript } = metrics;
    const initialValue=is_hyperscript ? shapeProps[index] : shapeProps;
    const valueX=initialValue.value;
    const keyX=initialValue.key;
    if(!isEQ(key, keyX) && is_hyperscript){
      shapeProps[index].key=key;
      shapeProps[index].value=value;
      ElementPropsCompiler({
        [keyX]:null 
      }, hx__VNode.$element, self, hx__VNode, true, {
        observer
      })
      ElementPropsCompiler({
        [key]:value
      }, hx__VNode.$element, self, hx__VNode);
      return false
    }
    return !deepEqualityCheck(value, valueX)
  }
  function AttributeAndPropsReactiveManager(self, virtualElement,virtualBuild, metrics){
    let [ is_hyperscript, observer ] = metrics
    if(!IS_ELEMENT_NODE(virtualElement.$element)) return;
    let props;
    if(is_hyperscript && isPFunction(virtualBuild.compiler_options.props)) props=assign({}, virtualBuild.compiler_options.props())
    else props=assign({}, isFunction(virtualElement.compiler_options.props) ? virtualElement.compiler_options.props() : virtualElement.compiler_options.args ? virtualElement.compiler_options.args.props : {});
    const element=virtualElement.$element;
    if(!is_hyperscript && len(virtualElement.VNodeManager.patchFlags.PropFlags)){
      validityPropsHydration(self, element, virtualElement, observer, is_hyperscript);
      if(observer.mutated) linkUpdateHook(self, virtualElement, observer);
    }else if(is_hyperscript){
      let index = 0;
      const shapeProps = virtualElement.VNodeManager.patchFlags.shapeProps;
      for(let [key, prop] of entries(props)){
        if( shouldUpdateProp( key ) && AttributeEqualityDiffing(self, virtualElement, shapeProps, { 
          index, 
          key, 
          value:prop,
          observer,
          is_hyperscript
        })){
          shapeProps[index].value=prop;
          ElementPropsCompiler( { [key]:prop }, element, self, virtualElement.compiler_options.hx__VNode||virtualElement, true, {
            observer
          });
          linkUpdateHook(self, virtualElement, observer);
            observer.mutated=true;
        }
        index++
      }
    }
    if(Is_Form_Element(element) && len(virtualElement.patch_tracks)){
      const patch=arrSet(virtualElement.patch_tracks)[0]
      const prop=patch['model:Value'];
      const initVal=patch.initialValue;
      const currentValue=get_Object_Value(self.$$publicModel, prop);
      if(!deepEqualityCheck(initVal, refUnwrap(currentValue))){
        observer.effectFlush.add(function(){
          element.value=refUnwrap(currentValue)
          observer.active=false
          linkUpdateHook(self, virtualElement, observer);
        })
      }
    }
  }
  const isConditionalHx_Vnode=node=>isConditionalVnode(node, 'if') || isConditionalVnode(node, 'else-if') || isConditionalVnode(node, 'else') ;
  function virtualBuildFilterExchange(self, node, vnode, parent, observer){
    self[$$$operands].initialized=false;
    const NewNode=vnode.compiler_options.Node();
    self[$$$operands].initialized=true;
    const getPosixVNode=node.VNodeManager.posixVNode
    inDOMElementNodesRemover(self, node);
    getPosixVNode.$element.after(NewNode.$element);
    parent.NodeList.replace(node, NewNode);
  }
  function heuristicsVNodeEqualityDiffing(node, vnode){
    if((maybeHouxWidgetVNode(node) && !maybeHouxWidgetVNode(vnode) ) || ( !maybeHouxWidgetVNode(node) && maybeHouxWidgetVNode(vnode))) return false;
    else if(!isSameNodeType(node.$element, vnode.$element) && (!IS_DOCUMENT_FRAGMENT_NODE(node.$element) && !IS_DOCUMENT_FRAGMENT_NODE(vnode.$element))) return false;
    else if(maybeHouxWidgetVNode(node) && maybeHouxWidgetVNode(vnode)){
      const nodeWidget=node.VNodeManager.GeneticProvider;
      const vnodeWidget=vnode.VNodeManager.GeneticProvider;
      return isEqualValue(nodeWidget, vnodeWidget) && (isObject(nodeWidget) ? deepEqualityCheck(nodeWidget, vnodeWidget) : isEQ( nodeWidget, vnodeWidget ) );
    }
    return true;
  }
  function Render_Effect_Reactive_Transform(self, virtualElement, virtualBuild, observer, parent){
    const is_hyperscript=isHouxBuild(self) ? self[$$$core].map.is_hyperscript : false ;
    if(!isHouxVNode(virtualElement) && !isHouxVNode(virtualBuild)) return;
    else if(!heuristicsVNodeEqualityDiffing(virtualElement, virtualBuild)) {
      virtualBuildFilterExchange(self, virtualElement, virtualBuild, parent, observer );
      return 
    }else if(!isHouxFragmentVnode(virtualElement)){
      effectCleanupFlush(self, virtualElement, virtualBuild, null, observer, true );
    }
    if(len(virtualElement?.NodeList) || len(virtualBuild?.NodeList)){
      const NodeListElementsCollection= virtualBuild?.NodeList || new Tuple()
      for( const [ ind, node] of virtualElement.NodeList.entries()){
        const virtualNode= NodeListElementsCollection.at(ind)
        effectCleanupFlush(self, node, virtualNode, virtualElement, observer);
      }
    }
    AttributeAndPropsReactiveManager(self, virtualElement, virtualBuild, [is_hyperscript, observer] );
  }
  function effectCleanupFlush(self, node, virtualNode, virtualElement, observer, ignore){
    if(isHouxVNode(node)){
      if(!virtualNode && isGT(len(virtualElement?.NodeList, len(virtualNode?.NodeList)))) pass;//vhecking if indom is greater than memo
      else if(isHouxTextVNode(node) ) RerenderingTextsContents(self, node, virtualNode, observer, virtualElement);
      else if(isConditionalHx_Vnode(node) || isRenderlessVNode(node)) cond_Directive_Rerenderer(self, node, virtualElement, virtualNode, observer);
      else if(maybeHouxWidgetVNode(node)) Widget_Effect_Trigger(self, node, virtualElement, observer, virtualNode);
      else if(isTrue(node.isWidgetWrapper)) LoopWrapperRehydration(self, node, virtualElement, virtualNode, observer);
      else if(!ignore) Render_Effect_Reactive_Transform( self, node, virtualNode, observer );
    }else if(isCustomElement(node)){
        
    }
  }
  function Widget_Effect_Trigger(self, node, virtualElement, observer, virtualNode){
    const props=assign({}, isFunction(node.compiler_options?.props) ? node.compiler_options.props() : node.compiler_options.args ? node.compiler_options.args.props : {} );
    const PropFlags = node.VNodeManager.patchFlags.PropFlags;
    const attrsObject={ $attributes:{} }
    for(const [key, flags] of entries(PropFlags)){
      const { accessor, initialDependencies, resolvedPropName, evaluatedValue, dependencies } = flags ;
      consume_Widget_Props(self, attrsObject, {
        props:{
          [key] : accessor()
        }
      }, virtualElement?.LabContext ? virtualElement : node, true, {
        observer,
        evaluatedValue,
        accessor,
        key
      })
    }
    const instance=node.widget_instance;
    for(const [ key, val ] of entries(attrsObject)){
      if(object_Has_Path(instance.$$publicModel.$params, key) && !deepEqualityCheck(refUnwrap(get_Object_Value(instance.$$publicModel.$params, key)), refUnwrap(val)) ) {
        observer.effectFlush.add(function(){
          useReadonlyBypass(instance.$$publicModel.$params, key, refUnwrap(val), bypassSymbol );
          observer.mutated=true
          observer.active=false
        })
      }
    }
    if(isBuiltinWidgetBuild(instance)) {
      instance[$$$compiler].rawChildren=virtualNode.VNodeManager.rawChildren
      instance[$$$compiler].compilerFlags.flags++;//call internal reactiver of 'instance' widget.
    }
    instance[$$$compiler].slotsTransformRender(instance, observer, virtualNode.VNodeManager.rawChildren);
  }
  function RerenderingTextsContents(self, node, vnode, observer, parent){
    const value=node.compiler_options.value;
    const virtualElement= vnode;
    if(!isEQ(node?.$element.textContent, virtualElement?.$element.textContent)) {
      observer.effectFlush.add(function(){
        node.$element.textContent=virtualElement?.$element.textContent;
        if(parent) linkUpdateHook(self, parent, observer);
        observer.mutated=true
        observer.active=false
      })
    }
  }
  function findElementNode(vnode, last){
    let hasElementNode=false ,  elementNode=undefined;
    if(isRenderlessVNode(vnode) ) return [false, undefined];
    if(IS_ELEMENT_NODE(vnode.$element) || IS_TEXT_NODE(vnode.$element)) {
      elementNode=vnode.$element
      hasElementNode=true
       return [ true, elementNode ] ;
    }else if(IS_DOCUMENT_FRAGMENT_NODE(vnode.$element)){
      let list=[];
      for(let node of vnode?.NodeList?.values() || []){
        let  [ has, elem ]=findElementNode(node, last);
        if(isTrue(has) && IS_ELEMENT_NODE(elem) || IS_TEXT_NODE(elem)) {
          hasElementNode=true;
          elementNode=elem;
          list.push(elementNode)
          if(!last) break;
        }
      }
      if(last) elementNode=list.pop();
    }
    return [ hasElementNode ,  elementNode ] ;
  }
  function backTrackForElementNode(parent, ind, last){
    let has=false, element=null;
    let getPrevNode=parent.NodeList.at(ind);
    let [ hasEl, node]=findElementNode(getPrevNode, last);
    if(isFalse(hasEl) && isGT(Number(ind), 0)) {
      [has, element] = backTrackForElementNode(parent, ind-1, last);
    }else{
      has=hasEl;
      element=node;
    }
    return [ has, has ? element : null ];
  }
  function inDOMElementNodesRemover(self, vnode){
    const getEl=elem=>isHouxVNode(elem) ? elem.$element : isNativeElement(elem) || IS_DOCUMENT_FRAGMENT_NODE(elem) ? elem : isHouxBuild(elem) ? elem.build.$element : null;
    const replace=isArray(vnode);
    vnode = replace ? vnode[0] : vnode;
    const element = getEl(vnode);
    let replacer=replace ? vnode[1] : null;
    replacer = isHouxBuild(replacer) ? replacer.build : replacer ;
    const replacerEl=replacer ? getEl(replacer) : null;
    if(maybeHouxWidgetVNode(vnode)) {
      vnode.widget_instance.destroy()
    }else if( isHouxVNode(vnode) && IS_DOCUMENT_FRAGMENT_NODE(element)){
      let index=0;
      let done=false
      for(let node of vnode.NodeList.values()){
        inDOMElementNodesRemover(self, node);
        index++;
        vnode.NodeList.delete(node);
      }
    }else if(isNativeElement(element) || IS_TEXT_NODE(element)){
      if(replace && ( IS_ELEMENT_NODE(element) || IS_TEXT_NODE(element))){
        element.replaceWith(replacerEl);
        if(isHouxVNode(vnode)) vnode.$element=replacerEl;
      }else if(!replace) element.remove();
    }else{
      $Debug(`Unexpected inDom Node removal Input system`, self);
    }
  }
  function findAndObserveProcessor(vnode, ind, NewNode){
    let [ hasEl, element ]=backTrackForElementNode(vnode, ind-1, true);
    if(hasEl){
      element.after(NewNode.$element)
      vnode.NodeList.splice(ind, 1, NewNode);
    }
  }
  function cond_Directive_Rerenderer(self, node, vnode, virtualBuild, observer){
    if(isRenderlessVNode(node) && !isRenderlessVNode(virtualBuild)){//add a newly created node and make it render
      observer.effectFlush.add(function(){
        self[$$$operands].initialized=false;
        const NewNode=virtualBuild.compiler_options.Node();
        NewNode.conditional_record=virtualBuild.conditional_record;
        self[$$$operands].initialized=true;
        const ind=vnode.NodeList.indexOf(node);
        findAndObserveProcessor(vnode, ind, NewNode)
        observer.mutated=true
        observer.active=false
      })
    }else if(isRenderlessVNode(virtualBuild) && !isRenderlessVNode(node)){//remove the old a make it re
      observer.effectFlush.add(function(){
        inDOMElementNodesRemover(self, node);
        node.IS_RENDERLESS=virtualBuild.IS_RENDERLESS;
        node.conditional_record=virtualBuild.conditional_record;
        observer.mutated=true
        observer.active=false;
      })
    }
  }
  function LoopWrapperRehydration( self, node, vnode, virtualBuild, observer){
    const  { orgType, ref, src }=node.compiler_options;;
    const is_hyperscript=self[$$$core].map.is_hyperscript;
    const value=!is_hyperscript ? get_Object_Value(self.$$publicModel, ref) : null;
    const added=new Tuple();
    const garbage=new Tuple();
    let index=0;
    for(const [ind, atom] of node.NodeList.entries()){
      index++;
      if(isGT(index, len(virtualBuild.NodeList))) garbage.add(atom);
    }
    if(isGT(len(virtualBuild.NodeList), len(node.NodeList))){
      for(let i=0;i<len(virtualBuild.NodeList)-len(node.NodeList); i++){
        added.add(virtualBuild.NodeList.at(len(node.NodeList)));
      }
    }
    if(len(added)){
      let key =0
      for(let atom of added.values()){
        key++
        let addedNode;
        if(is_hyperscript) addedNode=atom;
        else{
          let { type, props, children,is_hyperscript, hx__VNode, alias  }=node.compiler_options.args;
          let { valRef, keyName }=alias;
          let  ctx={}
          if(valRef) ctx[valRef]=atom;
          if(keyName) ctx[keyName]=key;
          if(hx__VNode.LabContext) ctx=assign(hx__VNode.LabContext, ctx);
          self[$$$operands].initialized=false;
          addedNode=node.compiler_options.Node();
          self[$$$operands].initialized=true;
          addedNode.LabContext=ctx;
          addedNode.compiler_options.index=len(src)+key;
        }
        observer.effectFlush.add(function(){
          findAndObserveProcessor(node, len(node.NodeList), addedNode);
        })
      }
    }
    if(len(garbage)){
      for(let atom of garbage.values()){
        observer.effectFlush.add(function(){
          inDOMElementNodesRemover(self, atom);
          node.NodeList.delete(atom);
        })
      }
    }
    Render_Effect_Reactive_Transform(self, node, virtualBuild, observer);
    node.compiler_options.src=value;
  }
  function _fromKey(obj, key){
    return isPObject(obj) ? values(obj)[key] : isSet(obj) ? arrSet(obj)[key] : isMap(obj) ? obj[obj.keys()[key]] :  isArray(obj) ? obj[key] : isNumber(key) ? Number(key) : null;
  }
  function linkUpdateHook(self, vnode, observer){
    if(!isPass(vnode.updated_hook)){
      observer.updated_hooks.add(vnode.updated_hook);
    }
  }
  const recordFieldTypes="auto,number,boolean,password,string,date,date-time,email,file,image,ref,ip-address,json,slug,time,url,uuid,mtm,oto,fk,option,choice,regex,decimal,typed-option";
  const isFormFieldType=type=>_mapValue(recordFieldTypes, type);
  const FieldProps = {
    required:Boolean,
    options:[Array, Object, Tuple, Set],
    default:Any,
    unique:Boolean,
    writable:Boolean,
    validator:Function,
    primaryKey:Boolean,
    maxSize:Number,
    disabled:Boolean,
    label:String,
  }
  function processValidationTransform(type, record){
    
  }
  class AdminDatasaseTable{
    constructor(){
      
    }
    registerForm(record){
      
    }
  }
  class FormField {
    constructor(type, validators){
      if(!isString(type) && !isFormField(type)){
        $Debug(`Parameter 1 at FormField instance expects a string value of a value FormField type`);
        return;
      }
      processValidationTransform(type, this)
    }
  }
  const isFormField= field=>field instanceof FormField;
  function validatorsIsValid(validators, type){
    if(!isPObject(validators)){
      $Debug(`properties passed to field must be an object `);
      return false
    }
  }
  function AutoField(validators){
    if(isFalse(validatorsIsValid(validators, 'auto'))) return
    return new FormField('auto', validators)
  }
  function NumberField(validators){
    return new FormField('number', validators );
  }
  function BooleanField(validators){
    return new FormField('boolean', validators)
  }
  function StringField(validators){
    return new FormField('String', validators)
  }
  function DateField(validators){
    return new FormField('date', validators)
  }
  function DateTimeField(validators){
    return new FormField('date-time', validators)
  }
  function EmailField(validators){
    return new FormField('email', validators)
  }
  function FileField(validators){
    return new FormField('file', validators)
  }
  function ImageField(validators){
    return new FormField('image', validators)
  }
  function RefField(validators){
    return new FormField('ref', validators)
  }
  function IPAddressField(validators){
    return new FormField('ip-address', validators)
  }
  function JSONField(validators){
    return new FormField('json', validators)
  }
  function SlugField(validators){
    return new FormField('slug', validators)
  }
  function TimeField(validators){
    return new FormField('time', validators)
  }
  function OptionField(validators){
    return new FormField('option', validators)
  }
  function MTMField(validators){
    return new FormField('mtm', validators)
  }
  function OTOField(validators){
    return new FormField('oto', validators)
  }
  function FKField(validators){
    return new FormField('fk', validators)
  }
  function RegexField(validators){
    return new FormField('regex', validators)
  }
  function ChoiceField(validators){
    return new FormField('choice', validators)
  }
  function DecimalField(validators){
    return new FormField('decimal', validators)
  }
  function UUIDField(validators){
    return new FormField('uuid', validators)
  }
  function URLField(validators){
    return new FormField('url', validators)
  }
  function TypedOptionField(validators){
    return new FormField('typed-option', validators)
  }
  function PasswordField(validators){
    return new FormField('password', validators )
  }
  const fields=createObj('Fields', {
    AutoField,
    NumberField, 
    TypedOptionField, 
    URLField, 
    BooleanField, 
    StringField,
    DateField,
    DateTimeField , 
    EmailField, 
    FileField,
    ImageField, 
    RefField, 
    IPAddressField,
    JSONField, 
    SlugField,
    TimeField,
    OptionField,
    MTMField, 
    OTOField, 
    FKField, 
    RegexField, 
    ChoiceField,
    DecimalField,
    UUIDField, 
    URLField,
    TypedOptionField, 
    PasswordField
  })
  class Form {
    self=undefined;
    FormFields={}
    constructor(name="Form", tableKeys=[]){
      if(!_validateType(name, String) && !_validateType(tableKeys, [ Array, Object ])){
        $Debug(`"name" and "tableKeys" arguments of FormFields are nit valid dataTypes`);
        return;
      }
      const xtruct=parseScript(`class ${name}{}`);
      for(let [ key, value ] of getIterator(tableKeys)){
        if(isArray(tableKeys) && !isString(value)){
          $Debug(`"tableKeys" array values expects strings`);
          return;
        }
        this.FormFields[isObject(tableKeys) ? key : value ] = isPObject(tableKeys) ? value : Any ;
      } 
      this.self=xtruct
    }
    create(fields){
      const name = this.self.name
      let fieldAlias={}
      let fieldKeys=keys(this.FormFields)
      if(!isPObject(fields)){
        for(let [ind, value] of getIterator([...arguments])){
          if(isGT(ind+1, len(fieldKeys))){
            $Debug(`arguments passed to create exceded the Form fields length`);
            return
          }
          fieldAlias[fieldKeys[ind]]=value
        }
        fields=fieldAlias;
      }
      const record=new this.self()
      for(let [key, value] of entries(fields)){
        if(!hasOwn(this.FormFields, key)){
          $Debug(`"${name}" Form have no such field as "${key}"\n\n........during create\n`);
          return 
        }
        if(!isFormField(this.FormFields[key]) && !_validateType(value, this.FormFields[key])){
          $Debug(`invalid dataTypes received at "${key}" field \n\n........at "${name}" Form\n\ntype validation failed`);
          return;
        }
        record[key]=value
      }
      return record
    }
    createField(){
      
    }
    deleteField(){
      
    }
    clearForm(){
      
    }
    extendForm(){
      
    }
  }
  function getFieldType(field){
    if(!isFormField(field)){
      $Debug(`isFieldTypeOf  argument 1 not a form Input field`);
      return false
    }
    return field
  }
  function isFieldTypeOf(field, type){
    if(!isFormField(field)){
      $Debug(`isFieldTypeOf  argument 1 not a form Input field`);
      return false
    }else if(!isString(type) && !isFormFieldType(_to_kebab_case(type))){
      $Debug(`Input at argument 2 of isFieldTypeOf macro is not a valid houx form field type`);
      return false;
    }
    return isEQ(getFieldType(field), _to_kebab_case(type))
  }
  function createFormModel(){
    return preventX(new Form(...arguments))
  }
  function createFormAdmin(){
    return preventX(new AdminDatasaseTable(...arguments))
  }
  function _initiateChildNodes(self, children,  hx__VNode, element){
    const is_hyperscript=hx__VNode?.is_hyperscript;
    children=isPFunction(children) ? children(self, hx__VNode) : children;
    if(isChildrenNode(children)){
      children = lazyUnwrap(children)
      if(isPrimitive(children)){
        const node=new HouxTextVNode(self, String(!exists(children) ? "" : children), hx__VNode);
        node.compiler_options=assign(node.compiler_options,{ type:'text', value:()=>String(children), hx__VNode });
        if(isTrue(node.render_tracked)) hx__VNode.render_tracked=true;
        if(len(node.PATCH_FLAGS)) hx__VNode.PATCH_FLAGS.add('ELEMENT_CHILDREN');
        element.append(node.$element);
        if(hx__VNode) hx__VNode.NodeList.add(node);
      }else if(isArray(children)){
        for(const child of children.values()){
          element=_initiateChildNodes(self, child, hx__VNode,  element)
        }
      }else if(isHouxVNode(children) ){
        element.append(children.$element);
        hx__VNode.NodeList.add(children);
      }else if(isCustomElement(children)){
        element.append(children);
        hx__VNode.NodeList.add(children);
      }else if(isRenderVNodeClass(children)){
        const vnode=renderVNodeClassElement(self, children);
        element.append(vnode.$element);
        hx__VNode.NodeList.add(vnode);
      }else if(isSpreadFragment(children)){
        for(const child of children[spreadFragmentKey].values()){
          child = lazyUnwrap(child)
          element=_initiateChildNodes(self, child, hx__VNode,  element)
        }
      }
    }
    return element;
  }
  function widgetBindingReceiver(self, key, param, widget, hx__VNode, modifiers, patchFlags, metrics){
    const { isRerender, observer, is_hyperscript, ind, patch } = metrics;
    const $orgKey=ind
    let trasform
    let [ subscribers , item ] = effectDependencyTracking(self, function(){
      return _$runModelBind(self, param, hx__VNode);
    });
    if( len(subscribers) && !is_hyperscript && !isRerender ) {
      patchFlags.isHoisted=(true);
      subscribers.forEach((sub)=>{
        patchFlags.subscriptions.push(sub);
      })
      VirtualizePropTick(hx__VNode, $orgKey, key, [ param, item ], subscribers)
    }
     item=refUnwrap(item);
    if( !key && !isPObject(item)){
      $Debug(`Trying  to bind directly to instance.\nstatus : failed,\n((reason)) : value not an object`, self, true);
      return;
    }else if(!key && isPObject(item)){
      consume_Widget_Props(self, widget, {props:item}, hx__VNode, isRerender, metrics);
    }else if(key){
      consume_Widget_Props(self,widget, {
        props:{ 
          [key]:item
        }
      }, hx__VNode, isRerender, metrics)
    }
  }
  class houxSignal{
    constructor(signal, func, options){
      this.signal=signal
      this.callback=func
      this.options=options
    }
    signal=undefined
    callback=undefined
    options=undefined
  }
  function Widget_Directive_Handler(self, widget, props, hx__VNode, modifiers, patchFlags,metrics){
    const { props:valProps, ind, isRerender, patch } = metrics
    let name=keys(props)[0];
    let key=directive_sep(name);
    let param=props[name] || "";
    param=bindKeyAsValue(name, param);
    name=directive_sep(name)[0].slice(2);
    key.shift();
    key= isGT(len(key), 1) ? key.join(':') : key[0];
    if(isEQ(name,'bind')) $$dir_BIND(self, { key, item:param }, widget, hx__VNode, modifiers, patchFlags, metrics);
    else if(isEQ(name, 'on')) $$dir_ON(self, param, widget, hx__VNode, key, modifiers);
    else if(isEQ(name, 'slot')) $$dir_SLOT(self, param, widget, hx__VNode, modifiers);
    else if(isEQ(name, 'ref')) $$dir_REF(self, param, widget, hx__VNode, modifiers, [valProps, ind]);
    else if(isEQ(name, 'model')) $$dir_MODEL(self, param, widget, hx__VNode, modifiers, metrics );
    else if(isEQ(name, 'html') || isEQ(name, 'text')) $$dir_HTML(self, param, widget, hx__VNode, isEQ(name, 'text'), modifiers);
    else if(isEQ(name, 'raw')) pass;
    else if(isEQ(name, 'fall')) $$dir_FALL(self, param, widget, hx__VNode, modifiers);
    else if(isEQ(name, 'transition')) $$dir_TRANSITION(self, attr, widget, hx__VNode, key, modifiers)
    else if(isEQ(name, 'animation')) $$dir_ANIMATION(self, attr, widget, hx__VNode, key, modifiers)
    else if(isEQ(name, 'clone')) $$dir_CLONE(self, attr, widget, hx__VNode, key, modifiers)
    else if(isHouxDirective(name)) pass;
  }
  function dynamicPropRemover(obj, propName){
    for(let [key, value ] of entries(obj)){
      if(!key.includes(propName)) continue;
      let keyCache;
      if(key.startsWith('$$bind')) keyCache=key.slice(6);
      keyCache=fall_AttrName(key);
      if(key.includes("|")) keyCache=keyCache.split('|').shift();
      if(isEQ(propName, keyCache)){
        delete obj[key];
        break;
      }
    }
    return obj;
  }
  function builtinBuildWidgetGenerator(self, widget, rawChildren){
    const model=self.$$publicModel;
    const is_hyperscript=self[$$$ownProperties].is_hyperscript
    function instanceNormalizer(instance, build){
      if(isString(instance) ){
        if(!IS_VALID_TAGNAME(instance)){
          if(instance_Has_Widget(self, instance)){
            instance = normalize_Widget(self, instance)
          }else{
            $Debug(`Unresolved tag name received at build builtin widget\n\n"${instance}" is not a valid registered or builtin widget name `, self, true);
            return undefined;
          }
        }
      }
      if(!isString(instance) && !validHouxWidget(instance)){
        $Debug(`Instance value received at build builtin widget is not a valid houx widget Instance`, self, true);
        return undefined;
      }else if( validHouxWidget(instance) && !hasOwn(self[$$$register].widgets, instance.name || "FactoryRender")) {
        self[$$$register].widgets[instance.name || 'FactoryRender']=instance;
      }
      function factoryRender(params, { attrs, useModel }){
        const props=dynamicPropRemover( build[$$$ownProperties].hx__VNode?.VNodeManager.Attribute_Collection||{}, 'self');
        if(is_hyperscript) return defineElement({
          type:instance, 
          props,
          children:lazyUnwrap(rawChildren)
        });
        return useModel({
          props
        });
      }
      if(!is_hyperscript) {
        const tagname = validHouxWidget(instance) ? instance.name || 'FactoryRender' : instance.trim() ;
        factoryRender.template=`
        <${tagname} ...props >
          ${rawChildren}
        </${tagname}>
        `
        factoryRender.parentContext={
          self,
          hx__VNode:build[$$$ownProperties].hx__VNode,
          is_hyperscript
        }
      }
      return factoryRender;
    }
    widget[$buildWidgetNormalizerKey]=instanceNormalizer;
    return widget
  }
  function looseEffectTraverseBuild(self, widget, rawChildren, Binding){
    const normalizer=createObj("Normalizer",{
      template:rawChildren,
      ...Binding
    });
    widget[$buildWidgetNormalizerKey]=normalizer
    return widget
  }
  function installTransformersArgumentations(self, child){
    const root= isTrue(self[$$$ownProperties].isInitialBuild) ? self : self[$$$core]._root;
    defineGetter(child[$$$core], '_root', root ) ;
    defineGetter(child[$$$core], '_parent', self ) ;
    for(let [ prop, content] of entries(root[$$$core].$globals.register)){
      child[$$$core].$globals.register[prop] = assign(child[$$$core].$globals.register[prop], content);
    }
  } 
  function ResolveWidget(self, hx__VNode, value, IS_RENDERLESS, rawChildren){
    if( !instance_Has_Widget( self , value.type ) ){
      $Debug(`Template Compilation Error::\n\nUnresolved tagname "${value.type}"\n\n   ...if this is a houx widget, make sure its registered through the "widgets" option or defined through the CustomElementsInstance.define() method if it's a customElement `,self, true);
      return false;
    }
    let widget=normalize_Widget(self, value.type);
    hx__VNode.VNodeManager.GeneticProvider=widget;
    // widget = new Proxy(widget, {});
    if(IS_RENDERLESS) return;
    widget=isObject(widget) ? assign({},widget) : widget ;
    if(!widget.name) widget.name=value.type;
    if(value.props) {
      widget.$attributes=createObj('$attributes');
      consume_Widget_Props(self, widget, value, hx__VNode);
    }
    widget[genericKeyProp]={
      parentFlag:self,
      hx__VNode,
      propsTraverse( widget, hx__VNode , fallThrough, patch ){
        if(value.props){
          let { hasDir , getKey, getDir }=dirExistenceCheck(value.props, '$$fall');
          if(isTrue(hasDir) && isTrue( isDestructureSyntax(getDir)) && widget.fallThrough){
            if(isFalse(destructWarn(getDir, fallThrough, self))) return;
            if(!patch) hx__VNode.VNodeManager.dexTransform.syntaxArray.push(getDir);
            if(patch) hx__VNode.VNodeManager.dexTransform.sourcesArray.splice( 0, 1 , fallThrough )
            else hx__VNode.VNodeManager.dexTransform.sourcesArray.push(fallThrough);
          }
        }
      }
    }
    return $compilerEngine(self, widget, value, hx__VNode, rawChildren);//$compilerEngine the widget flags, passed the widget to _Houx_Build, sets global widgets from  its parents if any, installs all GLOBAL_WIDGETS_AND_PLUGINS, mounts the widget to a fragment and return the domRoot'
  }
  function $compilerEngine ( self , widget , value , hx__VNode, rawChildren ) {
    const is_hyperscript=self[$$$ownProperties].is_hyperscript || hx__VNode.is_hyperscript;
    if( widget.$attributes ) value.$attributes = assign( value.$attributes || {} , widget.$attributes || {} ) ;
    widget = defineWidget( widget ) ; 
    widget = set_Widget_Flag( self , widget , value , hx__VNode ) ;//setting the widget flag
    if( !widget.$attributes && value.$attributes ) {
      widget.$attributes = value.$attributes ;
    }
    if(builtinValidWidget(widget, 'hx:build')){
      widget = builtinBuildWidgetGenerator(self, widget, rawChildren)
    }else if(isBuiltinWidget(widget)){
      widget = looseEffectTraverseBuild( self, widget, rawChildren, {
        is_hyperscript,
        hx__VNode,
        self
      })
    }
    if(isHouxVNode(hx__VNode)) widget[$buildHx_VNodeKey]=hx__VNode ;
    if(!hx__VNode.VNodeManager.Attribute_Collection){
      hx__VNode.VNodeManager.Attribute_Collection=widget.$attributes;
    }
    const child = new _Houx_Build( widget ) ;
    if( self ) {
      controllerHydration( self , child ) ;
      child.install( controllerGlobalPlugin , { self } ) ;//build the widget and other installations
    }
    return child.mount( _createFragment() ) ;//mounts the build to a houx fragment
  }
  function controllerHydration( self , build ) {
    const globals=getGlobalRegistery(self)
    if( !len( globals.controller ) ) return build ;
    for( let genre of globals.controller.values() ) {
      build.controller( genre ) ;
    }
    installTransformersArgumentations(self, build )
    // build.property('$parent', self.build)
    return build;
  }
  function controllerGlobalPlugin ( build , options ) {
    for ( const [ key , value ] of entries( getGlobalRegistery(options.self).register ) ) {
      getIterator( value ).forEach( ( [ name , data ] ) => {
        if ( isEQ( key , 'widgets' ) ) build = build.widget( name , data ) ;//in the root, uses the build.widget prototype to define global widgets
        else if ( isEQ( key , 'mixins' ) ) build = build.mixin( data ) ;//in the root, uses the build.widget prototype to define global properties
        else if ( isEQ( key , 'filters' ) ) build = build.filter( name , data ) ;//in the root, uses the build.widget prototype to define global properties
        else if ( isEQ( key , 'blocks' ) ) build = build.block( name , data ) ;//in the root, uses the build.widget prototype to define global properties
        else if ( isEQ( key , 'directives' ) ) build = build.directive( name , data );//in the root, uses the build.widget prototype to define global directive
        else if ( isEQ( key , 'handlers' ) ) build = build.handler( name , data ) ;//in the root8, uses the build.widget prototype to define global handlers
        else if ( isEQ( key , 'published' ) ) build = build.publish( name , data ) ;//in the root8, uses the build.widget prototype to define global published
        else if ( isEQ( key , 'properties' ) ) build = build.property( name , data ) ;//in the root8, uses the buil/d.widget prototype to define global propertiess
      })
    }
  }
  function set_Widget_Flag(self, widget, val, hx__VNode){
    if(!val.$children) return widget;
    try{
      widget.$children={ 
        NodeList:val.$children, 
        patchFlags:self, 
        hx__VNode 
      };
    }catch(err) {
      pass
    }
    return widget;
  }
  function consume_Widget_Props(self, widget, value , hx__VNode, isRerender=false, patch){
    const patchFlags={ 
      isHoisted:false, 
      subscriptions:[] ,
    }
    const is_hyperscript=hx__VNode.is_hyperscript;
    entries(value.props).forEach(([ind, param])=>{
      let name=_DynamicAttrNameResolver(self, ind, hx__VNode, isRerender, patchFlags, patch);
      if(hasAsterisks_bind(name)) name='$$bind:'+name.slice(1);
      else if(hasAt_bind(name)) name='$$on:'+name.slice(1);
      if(has$$_bind(name)){
        let modifiers=name.split('|');
        name=modifiers.shift();
        modifiers = new Set(modifiers);
        if( isHouxDirective(directive_sep(name)[0].slice(2))){ 
          Widget_Directive_Handler(self, widget, {
            [name]:param
          }, hx__VNode, modifiers, patchFlags, { 
            props:value.props, 
            ind,
            isRerender,
            patch,
            is_hyperscript
          });
        }else {
          _With_Custom_Directives(self,{
            key:name,
            attr:param
          }, widget, hx__VNode, modifiers, isRerender, patch);
        }
      }else if(hasSpread_bind(ind, true )) Manage_Widget_Spread(self, widget, name, hx__VNode, isRerender, { 
        patch, 
        patchFlags, 
        is_hyperscript 
      })
      else {
        if(isRerender && !is_hyperscript){
          const newQuery=patch.patch?.evaluatedValue();
          if(!deepEqualityCheck(newQuery, param)){
            widget.$attributes[name]=param;
            hx__VNode.VNodeManager.patchFlags.PropFlags.evaluatedValue=() => param ;
          }
        }else widget.$attributes[name]=param;
      }
    });
    if(!patch) return widget.$attributes;
    if(len(patchFlags.subscriptions) && !isRerender) {
      patchFlags.subscriptions.forEach((sub)=>{
        hx__VNode.VNodeManager.patchFlags.subscriptions.push(sub)
      })
    }
    if(isFalse(hx__VNode.VNodeManager.patchFlags.isHoisted) && !isRerender) hx__VNode.VNodeManager.patchFlags.isHoisted=patchFlags.isHoisted;
    return widget.$attributes
  }
  function Manage_Widget_Spread(self, widget, props, hx__VNode, isRerender, metrics){
    const { patch, patchFlags, is_hyperscript } = metrics
    let object;
    let subscribers;
    [ subscribers, object ]=effectDependencyTracking(self, function(){
      return isString(props) ? _$runModelBind(self, props.slice(3), hx__VNode) : props;
    })
    object=refUnwrap(object)
    if(!is_hyperscript && !isRerender && len(subscribers)){
      patchFlags.isHoisted=true;
      patchFlags.subscriptions=patchFlags.subscriptions.concat(subscribers)
      VirtualizePropTick(hx__VNode, props, props.slice(3), [ props, object, ], subscribers );
    }
    if(!isPObject(object)){
      $Debug(`spread syntax on widget consumer can only accept binded values of an object`, self, true);
      return
    }
    if(is_hyperscript && isRerender){
      const prevObj=patch.evaluatedValue()
      if(!deepEqualityCheck(prevObj, object)){
        hx__VNode.VNodeManager.patchFlags.PropFlags.evaluatedValue= () => object;
        consume_Widget_Props(self, widget, {
          props:object
        }, hx__VNode, true, patch)
      }
    }else consume_Widget_Props(self, widget, { 
      props:object 
    }, hx__VNode);
  }
  function _createFragment(){
    const fragment=new DocumentFragment();
    define(fragment, 'isHoux_Fragment',{
      value:true
    });
    define(fragment, 'NodeList',{
      value:[], 
      configurable,
      writable
    });
    define(fragment, 'PATCH_FLAGS',{
      value:new Set(), 
      configurable,
      writable
    });
    return fragment;
  }
  const devInfo='You are using the development version of houx '+get_version().slice(5)+', make sure you switched to the minified build version with the (*.min.js) file extension when deploying to production';//development information
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
  function traverse(name){//dynamically resolving widget name
    if(!isChar(name)){
      $Debug(`"traverse" resolving positional argument name must be a string type matching a local/globaly registered widget data`);
      return;
    }
    return new _WidgetResolver(name);
  }
  function batch(name, value, modifiers){//dynamically resolving and controlling of directives and arguments
    if(!_validateType(name, [String, Function, Object])){
      $Debug(`"batch" resolving positional argument name must be a string  resolving to matching a local/globaly registered directive reference or a "Function/Object" type `);
      return;
    }else if(modifiers && !isArray(modifiers)){
      $Debug(`argument 3 passed to batch expects an array of modifiers strings`);
    }
    return new _DirectiveResolver(name||"", value, modifiers);
  }
  function withDirectives(props, dirs){
    dirs = dirs || [];
    if(!isPObject(props)){
      $Debug(`first positional argument passed to the  "withDirectives" macro requires a plain object  of node attributes and props`);
      return {};
    }else if(!isArray(dirs)){
      $Debug(`provided position 2 argument on "withDirectives" macro not an array\n\nMay produce  Unexpected result`);
    }else if(len(dirs)){
      const dirSet=new Set();
      for(const directive of dirs.values()){
        if(!isDirectiveResolver(directive)){
          $Debug(`in hyperscript use of directives failed\n\nuse the "batch"  macro for resolving of directives when building with in hyperscript mode`);
        }else dirSet.add(directive);
      }
      if(len(dirSet)){
        define(props, dir$$__render, {
          value:dirSet, 
          enumerable, 
          configurable
        });
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
  function negotiateRawDirective(self, attributes, node){
   const { hasDir, getDir, getKey } = dirExistenceCheck(attributes, "$$raw");
    if(isTrue(hasDir) ) define(attributes, $$rawChildrenData$$,{value:_escapeDecoder(node.innerHTML), enumerable, configurable});
  }
  function transpileHouxDelimiterTemplateBlocks(self, html){
    let [ open, close ]= self[$$$core].settings.delimiters;
    open=hasSpecialCharacters(open) ? escapeRegExp(open) : open ;
    close=hasSpecialCharacters(close) ? escapeRegExp(close) : close ;
    const pattern=new RegExp(`${open}(\\/)?\\:\\:([\\S]+)[ ]*(.*?)[ ]*(\\/)?${close}`, 'g');
    if(!pattern.test(html)) return html;
    return html.replace(pattern, function(match, ct, name, value, imcl ){
      return `<${ct?.trim() ? "/" : "" }::${name}${ value?.trim() ? ' exp="'+value?.trim()+'"' : "" }${ imcl?.trim() ? "/" : ""}>`;
    });
  }
  function connectAncestorsProps(self, Vnode, hx__VNode, NodeList){
    if(!isHouxVNode(Vnode) && isHouxVNode(hx__VNode)) return;
    if(Vnode.render_tracked && hx__VNode){
      hx__VNode.render_tracked=true
      hx__VNode.VNodeManager.patchFlags.isHoisted=true
    }
  }
  function specializedTemplateProductionProcessor(self, attributes, node, metrics, isRerender=false, config ){
    let [ hx__VNode, NodeList , tagName, fall ]=metrics;
    let Vnode;
    if(config.if_Block && !config.props?.status) return
    if(self){
      negotiateRawDirective(self, attributes, node);
      if(IS_VALID_TAGNAME(tagName)) config={
        contextScope:"children_Block",
        children_Block:true,
        props:{
          subscriptions:[]
        },
        ctx:{}
      }
      const children=function render(self, hx__VNode){
        return IS_VALID_TAGNAME(tagName) ? _HouxTemplateParser(node.innerHTML, self, true, hx__VNode, fall, isRerender, config ) : node.innerHTML;
      }
      let props=()=>len(attributes) ? attributes : null;
      const Node=()=> _createVirtualElement(tagName, props(), children, self, false, hx__VNode?.LabContext, arrSet(NodeList), fall, isRerender );
      Vnode=Node();
      Vnode.compiler_options=assign(Vnode.compiler_options, {
        props, children, type:tagName, hx__VNode, Node
      });
      connectAncestorsProps(self, Vnode, hx__VNode, NodeList)
    }else{
      const children=node.innerHTML.trim() ? _HouxTemplateParser(node.innerHTML, null, true) : null;
      Vnode={
        type:tagName, props:len(attributes) ? attributes : null, children
      }
    }
      NodeList.add(Vnode)
  }
  const openingTagsRegex = /<([\w\-\$\@:.]+)(\s[^>]*?(?:(?:[\w]*[='"!@#$%^&*()+\-\[\]{};:\\|,.<\/? ]*[^\/>])|(?:'[^']*'[=!@'"#$%^&*()+\-\[\]{};:\\|,.<\/? ]*[^\/>])|(?:"[^"]*"[=!@#$%^'"&*()+\-\[\]{};:\\|,.<\/? ]*[^\/>])))*\s*(\/)?>/g;
  // const openingTagsRegex = /<([\w\-\$\@:.]+)(\s[^>]*?(?:(?:[\s\S]*[^\/>])|(?:'[^']*'[\s\S]*[^\/>])|(?:"[^"]*"[\s\S]*[^\/>])))*\s*(\/)?>/g;
  const openingTagAttrRegex=/^<[\w\-\$\@:.]+([\s\S]*[^\/>])?\s*(\/)?>\s*$/m;
  const closingTagsRegex=/<[\/]([\w$.:\-\@]+)[ ]*>/g;
  const attrRegex=/([^=\s]*)\s*?=\s*?(?:(["'])(.*?)\2|([^"'\s>]+))/;
  const attributesRegex = /([^=\s]+)\s*=\s*(?:(["'])(.*?)\2|([^"'\s>]+))?|(\S+)(?:\s*=\s*(?:(["'])(.*?)\6|(\S+)))?/g;
  function RunMustacheExcape(self, html){
    let [ open, close ]= self[$$$core].settings.delimiters;
    // open=hasSpecialCharacters(open) ? escapeRegExp(open) : open ;
    // close=hasSpecialCharacters(close) ? escapeRegExp(close) : close ;
    const pattern=new RegExp(`${open}(.*?)${close}`, 'g');
    return transpileHouxDelimiterTemplateBlocks(self, html).replace(pattern, (match, value )=>{
      return `${open}${ _escapeDecoder(value) }${close}`;
    });
  }
  function openingTagsHydration( self , html ){
    return html.replace( openingTagsRegex , ( match , tag ,  union , closedTag ) => {
      let props = match.trim().match( openingTagAttrRegex )[ 1 ]?.split(`\n`).join("") ;
      let nodeSpace={ 
        tagName : tag ,
        props : {},
        blockProps:{},
        isBlockTag:null
      }
      if(isBlockTag(tag.trim())) {
        nodeSpace.blockProps={
          expression:props||""
        }
        nodeSpace.isBlockTag=true;
      }
      if( IsDomparserTag( tag )) tag = `hx$$--${ tag }-$hx` ;
      if( props ) {
        props = props.replace( attributesRegex , ( mch , attr , sip , val , fall ) => {
          val = val || fall || null ;
          attr = isNull( attr || sip || val ) ? mch.trim() : attr.trim() ;
          attr = isEmptyStr( attr ) ? null : attr ;
          if ( attr && val && /[\w\$]+/.test( attr ) ) {
            if ( !isEQ( attr.trim() , '[[[$$$houxpack$$$]]]' ) ) nodeSpace.props[ attr ] = val ;
            else nodeSpace = JSON.parse( _escapeReverseDecoder( val ) ) ;
          } else if ( attr && !val && /[\w\$]+/.test( attr ) ) {
            if ( !isEQ( attr.trim(), '[[[$$$houxpack$$$]]]' )) nodeSpace.props[ attr ] = "" ;
          }
        })
      }
      if( isBlockTag( tag.trim() ) && hasOwn( nodeSpace.props , 'exp' ) ) {
        nodeSpace.blockProps.expression = nodeSpace.props.exp ;
      }
      nodeSpace = `[[[$$$houxpack$$$]]]="${ _escapeDecoder( JSON.stringify( nodeSpace ) ) }"` ;
      tag = ( isBlockTag(tag) ? 'section' : tag ).trim();
       return `<${ tag } ${ nodeSpace } ${ closedTag && !IS_HTML_VOID_TAG( tag ) ? '></' + tag + '>' : '>' }` ;
    });
  }
  function _HouxTemplateParser(html, self, parent, hx__VNode, fall, isRerender=false, config={} ){
    if(!html) return null;
    if(self && isHouxBuild(self))  html=RunMustacheExcape(self, html );
    html=openingTagsHydration( self , html).replace(closingTagsRegex, (match, tag)=> {
      tag = isBlockTag(tag) ? "section" : tag ;
      return IsDomparserTag(tag) ? `</hx$$--${tag}-$hx>` : `</${tag}>` ;
    });
    const parser=new DOMParser().parseFromString(html,'text/html').body;
    const NodeList=new Tuple();
    let contextmenu={};
    for (let node of parser.childNodes){
      if(node ){
        if(IS_TEXT_NODE(node)){
          if(node.textContent.trim()){
            let LabContext;
            if(len(config.ctx)){
              fall=smartDextCtxMerging(fall||{}, config.ctx||{})
            }
            if(fall) {
              LabContext=smartDextCtxMerging(hx__VNode?.LabContext || {} , fall );
              if(hx__VNode) {
                hx__VNode.LabContext=LabContext
                LabContext=null
              }
            }
            const value=node.textContent;
            node=self ? new HouxTextVNode(self, value,  hx__VNode, LabContext ) : value;
            if(isHouxTextVNode(node)) node.compiler_options=assign(node.compiler_options,{ 
              type:'text', 
              value, 
              hx__VNode 
            });
            NodeList.add(node);
          }
        }else if(IS_COMMENT_NODE(node))/*Ignore comment nodes*/pass;
        else if(IS_ELEMENT_NODE(node)){
          let nodeSpace=node.getAttribute('[[[$$$houxpack$$$]]]');
          nodeSpace=JSON.parse(nodeSpace);
          node.removeAttribute('[[[$$$houxpack$$$]]]');
          let tagName=nodeSpace?.tagName;
          let attributes=nodeSpace?.props;
          if(!tagName || !attributes ){
            $Debug(`((_HouxTemplateParser Exception))\n\nUntraceable Exception during template attributes parsing Compilation\n\n>>> This might be connected with attributes caveat failure`, self, true);
            tagName = 'template'
            attributes={}
          }
          const children = node.innerHTML;
          let context=smartDextCtxMerging(hx__VNode?.LabContext||{}, fall||{});
          if(config) mountConstBlockTransform(self, context, config, hx__VNode);
          if(config, isEQ(config.contextScope, 'children_Block')){
          }
          if(nodeSpace.isBlockTag) {
            if(!isHouxBuild(self)) {
              $Debug(`block tags Cannot be used in build/static templates mode`, self, true);
            }else {
              blockElementsPreProcessors(self, nodeSpace, node, children, isRerender, [ hx__VNode, NodeList, tagName, context ], config )
            }
          }else specializedTemplateProductionProcessor(self, attributes, node, [ hx__VNode, NodeList, tagName, context ], isRerender, config);
        }
      }
    }
    if(self) return _getNodeListResponse(NodeList.list(), parent);
    else return isGT(len(NodeList),1) ? NodeList.list() : isEQ(len(NodeList),1) ? NodeList.shift() : null ;
  }
  function mountConstBlockTransform(self, context, config, hx__VNode){
    if(!isValidCtxType(config.contextScope) && !config.ctx && !len(config.ctx)) return;
    if(config.ctx && hasOwn(config.ctx||{}, $$dexTransformKey)){
      smartDextCtxMerging(context, config.ctx);
    }else if(config.ctx && len(config.ctx) && !hasOwn(context, keys(config?.ctx||{})[0] )){
      const key=keys(config.ctx)[0];
      if(key) {
        context[key]=config.ctx[key];
      }
    }
    return context;
  }
  function controlBuiltInBlocks(self, nodeSpace, node, blockN, isRerender, metrics, config){
    const [ hx__VNode, NodeList, tagName, context, fall ] = metrics ;
    const args=()=>[ self, nodeSpace, node, blockN, isRerender, metrics ]
    const children=node.innerHTML
    const exp=nodeSpace.blockProps.expression;
    let template=[]
    let subscribers=[];
    let data;
    const ctx=[children, exp ]
    if(isEQ(blockN, 'if')) template = blockIFPreprocessor(...args(), ctx);
    else if(isEQ(blockN, 'else')) blockElsePreprocessor(...args(), ctx, config, "::else");
    else if(isEQ(blockN, 'else:if')) blockElseIfPreprocessor(...args(), ctx, config );
    else if(isEQ(blockN, 'for')) template = blockForProcessor(...args(), ctx);
    else if(isEQ(blockN, 'const')) blockConstPreprocessor(...args(), ctx, config);
    return !isArray(template) ? (_validateType(template, [Set, Tuple]) ? [...arrSet(template)] : [template] ) : template ;
  }
  function blockConstPreprocessor(self, nodeSpaace, node, blockN, isRerender, metrics , [children, exp], config){
    const [ hx__VNode, NodeList, tagName, context, fall ] = metrics ;
    if(!isValidCtxType(config.contextScope)){
      $Debug(`"::const" block expects to be a direct sibling  within a widget slot, a ::for/::if block or an element scope\n\ncannot be used on a top level scope`, self, true);
      return [] ;
    }else if(!variableDeclarationRegex.test(exp)){
      $Debug(`"${exp}" statement is not recognised or not a valid statement or expression`, self);
      return []
    }
    let [ match, variable, expression ] = exp.match(variableDeclarationRegex);
    variable=variable.trim();
    if(!isDestructureSyntax(variable) && !isValidIdentifier(variable)){
      $Debug(`"${variable}" is an invalid identifier`, self);
      return []
    }
    const data = _$runModelBind(self, expression.trim(), hx__VNode || context );
    if(isDestructureSyntax(variable)){
      if(isFalse(destructWarn(variable, data, self))){
        return []
      }
      config.ctx[$$dexTransformKey]={
        sourcesArray:[data],
        syntaxArray:[variable]
      }
    }else if(!hasOwn(context, variable)){
      define(config.ctx, variable, { 
        value:data, 
        enumerable 
      });
    }
  }
  function blockForProcessor(self, nodeSpaace, node, blockN, isRerender, metrics , [children, exp]){
    const [ hx__VNode, NodeList, tagName, context, fall ] = metrics ;
    let Loop_Data=For_Loop(self, exp, hx__VNode);
    let template = []
    if(!isIterable(Loop_Data.obj)){
      $Debug(`${getType(Loop_Data.obj)} value passed to the if block is not an iterable object`, self, true);
      return template;
    }
    function factoryRender(option, config){
      return _HouxTemplateParser(children, self, true, hx__VNode, option, isRerender, config);
    }
    let count=0
    for(const [key , value ] of getIterator(refUnwrap(Loop_Data.obj))){
      const options=assign(fall||{}, {});
      count++
      const config={
        contextScope:'for_Block',
        for_Block:true,
        props:{
        
        },
        ctx:{}
      }
      mapCTXFallProps(self, {
        valRef:Loop_Data.valRef?.trim(),
        keyName:Loop_Data.keyName?.trim(),
        index:Loop_Data.index?.trim()
      }, { 
        ky:key,
        vl:value,
        count
      }, options );
      const source=factoryRender(options, config);
      if(_validateType(source, [Array, Set, Tuple])){
        for(let [ index, vnode] of getIterator(source)){
          template.push(vnode);
        }
      }else template.push(source);
    }
    return template;
  }
  function blockIFPreprocessor(self, nodeSpaace, node, blockN, isRerender, metrics, [children, exp]){
    const [ hx__VNode, NodeList, tagName, context, fall ] = metrics ;
    const [ subscribers, data ]=effectDependencyTracking(self, ()=>{
      return _$runModelBind(self, exists(exp.trim()) ? exp : "undefined", hx__VNode);
    })
    let template = []
    const condition = exists(refUnwrap(data));
    const config={
      contextScope:"if_Block",
      if_Block:true,
      props:{
        status:condition,
        prevBlock:"::if",
        activeBlock:"::if",
        shouldContinue:!condition
      },
      ctx:{}
    }
    template = _HouxTemplateParser(children, self, true, hx__VNode, fall, isRerender, config)
    return template;
  }
  function blockElseIfPreprocessor(self, nodeSpaace, node, blockN, isRerender, metrics, [children, exp], config ){
    const [ hx__VNode, NodeList, tagName, context, fall ] = metrics ;
    if(!config.props.shouldContinue) {
      config.props.status=false;
      return []
    }
    blockElsePreprocessor(...arguments, "::else:if");
    const [ subscribers, data ]=effectDependencyTracking(self, ()=>{
      return _$runModelBind(self, exists(exp.trim()) ? exp : "undefined", hx__VNode);
    })
    const condition=exists(refUnwrap(data));
    config.props.status=condition;
    config.props.shouldContinue=!condition;
    return []
  }
  function blockElsePreprocessor(self, nodeSpaace, node, blockN, isRerender, metrics, [children, exp], config, active ){
    const [ hx__VNode, NodeList, tagName, context, fall ] = metrics ;
    if(!config.props.shouldContinue){
      config.props.status=false;
      return []
    }
    if(!config.if_Block){
      $Debug(`The "::else or ::else:if" block cannot be used outside of the "::if" template block`, self, true);
      return;
    }else if(config.props.status) return
    else if(isEQ(config.props.prevBlock,'::else') ){
      $Debug(`Seems the previous defined block not an "::if" or "::else:if" block`, self, true);
      return;
    }
    config.props.status=isEQ(active, "::else");
    config.props.activeBlock=active;
    return []
  }
  function instance_Has_Block(self, name ){
    return _mapValue(self[$$$register]?.blocks || {}, name ) ;
  }
  const normalize_Block=(self, name)=>_mapValue(self[$$$register].blocks, name) ? self[$$$register].blocks[name]: null;
  function blockElementsPreProcessors(self, nodeSpace, node, children, isRerender, metrics, config){
    const [ hx__VNode, NodeList, tagName, context, fall ] = metrics ;
    const blockN=tagName.slice(2).trim();
    let renderedNodes=[];
    if(isBuiltinBlocks(blockN)) {
      renderedNodes = controlBuiltInBlocks(self, nodeSpace, node, blockN, isRerender, metrics, config)
    }else if(instance_Has_Block(self, blockN)){
      renderedNodes=customBlocksTraverse(self, nodeSpace, node, blockN, isRerender, metrics);
    }else{
      $Debug(`((Block Resolver Error))\n\n"${blockN}" block is not a registered block element`, self, true);
    }
    for(const [ index, vnode ] of (!isArray(renderedNodes) ? (_validateType(renderedNodes, [Set, Tuple]) ? [...arrSet(renderedNodes)] : [renderedNodes] ) : renderedNodes).entries()){
      if(vnode) NodeList.add(vnode);
    }
  }
  function customBlocksTraverse(self, nodeSpace, node, blockN, isRerender, metrics){
    let [ hx__VNode, NodeList, tagName, context, fall ] = metrics ;
    const children=node.innerHTML;
    const [ subscribers, data ]=effectDependencyTracking(self, ()=>{
      return _$runModelBind(self, nodeSpace.blockProps.expression, hx__VNode);
    });
    function factoryRender(ctx={}){
      if(!isPObject(ctx)){
        $Debug(`context data passed to factoryRender expects a plain object`, self);
      }
      fall=smartDextCtxMerging(fall||{}, ctx);
      return _HouxTemplateParser(children, self, true, hx__VNode, fall, isRerender);
    }
    const template = factoryRender()
    const block=normalize_Block(self, blockN );
    const blockCalllback=isObject(block) ? block.block : block
    const response=blockCalllback.call(self.$$publicModel, !template ? [] : !isArray(template) ? (_validateType(template, [Set, Tuple]) ? [...arrSet(template)] : [template] ) : template, data, factoryRender )
    return !response ? [] : !isArray(response) ? (_validateType(response, [Set, Tuple]) ? [...arrSet(response)] : [response] ) : response
  }
  function _getNodeListResponse(NodeList, parent=false){
    NodeList=isSet(NodeList) ? arrSet(NodeList) : isTuple(NodeList) ? NodeList.list() : NodeList;
    if(isTrue(parent) && len(NodeList)) {
      const response = isGT(len(NodeList),1) ? NodeList : NodeList[0];
      return isString(response) ? new HouxTextVNode(parent, response) : response ;
    }else if(len(NodeList)) return isGT(len(NodeList),1) ?  new HouxFragmentVNode(parent, NodeList) : ( isPrimitive(NodeList[0]) ? new  HouxTextVNode(parent, isNull(NodeList[0]) ? "" :  NodeList[0]) : NodeList[0] ) ;
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
    return _HouxTemplateParser( html, null);
  };
  function markdown(mkd){
    if(!isString(mkd)){
      $Debug(`markdown helper expects strings values`);
      return null
    }
  }
  function createCustomElement(opts){
    this.is_Custom_Node=true;
    opts=defineWidget(...arguments);
    if(!_validateType(opts, [Object, Function])){
      $Debug(`createCustomElement option argument values must be type of object......>>>>`);
      return;
    }else if(isGT(len(arguments), 1)){
      $Debug(`createCustomElement parameter values required only 1 argument.....of a valid widget option\n\n${len(arguments)} given>>>>>>>>>>>`);
      return;
    }
    const isMNEOwnOptions=opt=>_mapValue("plugin,onConnected,onDisconnected,onAdopted,onAttrChanged",opt);
    entries(opts).forEach(([key, value])=>{
      if(!isMNEOwnOptions(key) && !isValidWidgetOption(key)){
        $Debug(`invalid option value....\n\n "${key}" is not a recognised createCustomElement option `);
        return;
      }
    });
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
    houxCustomNativeElement.prototype.disConnectedCallback=Hooks.disConnectedCallback || pass;
    houxCustomNativeElement.prototype.adoptedCallback=Hooks.adoptedCallback || pass;
      houxCustomNativeElement.prototype.attributeChangedCallback=Hooks.attributeChangedCallback || pass;
    houxCustomNativeElement.prototype.connectedCallback=connectedCallback;
    function connectedCallback(){
      const props=new Object();
      if(len(entries(this.attributes))){
        for( const [key, attr ] of entries(this.attributes)) {
          const { name, value } = attr;
          props[name]=value
        }
      }
      const shadow=this.attachShadow({ mode: 'open'});
      const template=defineElement({
        type:opts,
        props
      })().$element;
      // this.replaceWith(template)
      shadow.appendChild(template);
      const user_defined_callback=Hooks.connectedCallback || pass
      user_defined_callback.call(this, ...arguments);
    }
    function render(){
      return houxCustomNativeElement;
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
      customElements.define(name, houxCustomNativeElement, inherit ? { extends:inherit} : {})
    }
    return render;
  }
  createCustomElement=createCustomElement.bind({});
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
  class Anchor extends Widget{
    constructor(){
      super()
      this[$$BuiltinWidgetKey]='hx:acchor'
    }
    params={
      to:{
        type:String,
        default:'/'
      }
    }
    handlers={
      clickHandler(){
        
      }
    }
    build(params, { slots }){
      return ()=>defineElement({type:'a', 
        props:{ 
          onClick:withModifiers( this.clickHandler, [ 'prevent' ]),
        }, 
        children: slots.default()
      });
    }
  }
  class Display extends Widget {
    constructor(){
      super()
      this[$$BuiltinWidgetKey]='hx:nav-view'
    }
    build(params, { slots }){
      
      return ()=> slots.default()
    }
  }
  function mergerPathsToRouter(router){
    
  }
  class buildRouterPlugin{
    constructor(routes){
      mergerPathsToRouter(this)
    }
    plugin=function plugin(build, options){
      build.widget('hx:anchor', Anchor)
      const router=createObj('Router')
      useModel.call(build, { 
        $router:router
      } )
    }
    extend(routes){
      mergerPathsToRouter(this)
    }
    
  }
  const validRouterOptions="as,widget,path";
  const isRouteOpt=key=>_mapValue(validRouterOptions, key);
  class URLRouterPath{
    constructor(path, widget, as){
      this.path=path
      this.widget=widget
      this.as=as
    }
    routify(){
      
    }
  }
  const isURLRouterPath=route=>route instanceof URLRouterPath
  function path(path, widget, alias){
    if(!isString(path)){
      $Debug(`parameter 1 received at path is not a string valid path`)
    }else if(!path.includes('/')){
      $Debug(`"${path}" is invalid\n\nMissing "/" decorator`)
    }else if(!validHouxWidget(widget) && !isPromise(widget)){
      $Debug(`parameter 2 of path macro expects a valid Houx Widget or an asynchronous Promise instance`)
    }else if(alias && !isString(alias)){
      $Debug(`parameter 3 "alias" alias expects a string value`);
    }
    return new URLRouterPath(...arguments);
  }
  async function asyncPath(path, widget, alias){
    return await path(...arguments)
  }
  function buildRouter(routes){
    if(!isArray(routes)){
      $Debug(`"buildRouter" parameter 1, routes expects an array value of routes object maps`);
      return pass
    }
    for (const [ ind,  path] of routes.entries()){
      if(!isURLRouterPath(path)){
        $Debug(`Path arguments values  must be passed to the "Houx.path" routing macro\n\nAt the route index ${ind+1}`);
        return pass
      }
      
    }
    return new buildRouterPlugin(routes)
  }
  function setAsyncSettings(opts){
    if(opts.buildConfig && isPObject(opts.buildConfig)) opts.buildConfig.isAsync=true;
    else if(!opts.buildConfig || !isPObject(opts.buildConfig)) opts.buildConfig={ 
      isAsync:true 
    };
    return opts;
  }
  async function asyncWidget(opts){
    opts=await defineWidget(opts)
    opts=await setAsyncSettings(opts);
    return await opts;
  }
  function defineWidget(opts, options){
    if(!validHouxWidget(opts)){
      $Debug(`Value Error\n\n invalid value for the defineWidget macro\n/... at /././. at`);
      return;
    }else if(isGT(len(arguments), 2)){
      $Debug(`Parameter Error\n\nmax-2 argument required\n ${len(arguments)} given`);
      return;
    }else if(isPObject(opts) || isFunction(opts)){
      const type=isClass(opts) ? 'class-based' : isPFunction(opts) ? 'function-based' : 'object-based' ;
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
          if(!hasProp(widget, key ) && !isHouxProp(key)) widget[key]=value;
        }
      }
      if(!hasOwn(widget, widgetTypeKey)) widget[widgetTypeKey]=type;
      return widget;
    }
  }
  function initialBuildTransform(options, props, children ){
    if(!validHouxWidget(options)){
      $Debug(`initBuild Error\n\nCannot compile value as a Houx widget\nMaybe an invalid houx widget value`);
      return false ;
    }
    let [ widget ] = propsAndChildrenGetter( ...arguments );
    widget = defineWidget( widget ) ;
    widget[initBuildInstaceKey]=true;
    if(widget.$children) widget.$children={ 
      NodeList:widget.$children
    };
    return widget
  }
  function initBuild(options, props, children){
    const widget = initialBuildTransform(...arguments);
    if(isFalse(widget)) return ;
    return new _Houx_Build( widget );
  }
  function initSSRBuild(options, props, children){
    
    return initBuild( ...arguments )
  }
  function defineElementOptionsValidator(options){
    const optionsName="type,props,children";
    if(!isPObject(options)){ 
      $Debug(`defineElement Error\n expects an 'object' at......\n\nparameter 1`);
      return false;
    }else if(isGT(len(options), 3)){
      $Debug(`Options Error\n\n defineElement does not accept more than 3 options properties arguments`);
      return false
    }else if(!options.type && !_validateType(options.type, [String, Object, Function , _WidgetResolver ] )){
      $Debug(`Unexpected value passed to type in defineElement\n\n"${getType(options.type)}" is an invalid type value to type option`);
      $Debug(`NOTE : The "type" option is required`);
      return false;
    }
    for(let [ name, opt ] of entries(options)){
      if(!_mapValue(optionsName, name)) {
        $Debug(`${name} is not a valid defineElement options value`);
        return false;
      }else if(isEQ(name, 'props') && opt && !isPObject(opt)){
        $Debug(`Element props property expects an object value\n\nUnexpected "${getType(opt)}" value`);
        return false;
      }else if(isEQ(name, 'children') && exists(opt) && !isChildrenNode(opt)){
        $Debug(`Element children property expects a valid houx child node instance value\n\nUnexpected "${getType(opt)}" value`);
        return false;
      }
    }
    return true;
  }
  function createVNodeClass(type, props, children){
    return new VNodeClass(...arguments);
  }
  function renderVNodeClassElement ( self, vnodeClass ) {
    const { $$type, $$properties, $$children } = vnodeClass;
    const Node = ( instance ) => _createVirtualElement( $$type , $$properties , $$children , instance , true ) ;
    const vnode = Node( self ) ;
    vnode.compiler_options = assign( vnode.compiler_options , { 
      props : () => $$properties , 
      children : () => $$children , 
      type : $$type , 
      Node 
    } ) ;
    return vnode ;
  }
  function defineElement(options){
    if(isFalse(defineElementOptionsValidator(options))) return undefined;
    const { type , props , children } = options ;
    return preventX(createVNodeClass( type, props, children ))
  }
  function Req__init__(urlOrOptions, methodOrOptions, options={}){
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
      if(hasOwn(options,'timeout')) xhr.timeout=options.timeout
      if(hasOwn(options,'headers')  && isPObject(options.headers)){
        for(const [header, value] of entries(options.headers)){
          xhr.setRequestHeader(header, value)
        }
      }
      resolveHooks(xhr, options)
      xhr.send()
      resolve(xhr.response)
    })
  }
  class _HouxHttpRequestModule{
    post=function post(url,options){
      return new Req__init__(url,'POST',options)
    }
    get=function get(url, options){
      return new Req__init__(url,'GET',options)
    }
    delete =function del(url, options) {
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
    request=function request(urlOrOptions, methodOrOptions, options){
      return new Req__init__(...arguments)
    }
  }
  function Request(urlOrOpts, methodOrOptions, options){
    return new Req__init__(...arguments)
  }
  for(const [name, callback] of entries(createObj('Request', new _HouxHttpRequestModule()))) Request[name]=callback;
  function resolveHooks(xhr, opts){
  
  }
  _$compiler_engine_hydrator();

  global.createFormAdmin = createFormAdmin ;
  global._HouxHttpRequestModule = _HouxHttpRequestModule ;
  global._styleSheet_hydration = _styleSheet_hydration ;
  global.isRef = isRef ;
  global.scarfold = scarfold ;
  global.defineElement = defineElement ;
  global.get_version = get_version ;//dev
  global.el = el ;
  global._Evaluate_THIS = _Evaluate_THIS ;
  global.None = None ;
  global.renderSlots = renderSlots ;
  global._escapeReverseDecoder = _escapeReverseDecoder ;
  global.HouxCompilerSetup = HouxCompilerSetup ;
  global.isReactiveRef = isReactiveRef ;
  global._mapValue = _mapValue ;
  global.initBuild = initBuild ;
  global.withModifiers = withModifiers ;
  global._initiateChildNodes = _initiateChildNodes ;
  global._$runModelBind = _$runModelBind ;
  global.Memo = Memo ;
  global.postUpdate = postUpdate ;
  global.Suspense = Suspense ;
  global._Run_With_Modifiers = _Run_With_Modifiers ;
  global.initSSRBuild = initSSRBuild ;
  global.$log = log ;//dev
  global._Resolver = _Resolver ;
  global._DirectiveResolver = _DirectiveResolver ;
  global.preMount = preMount ;
  global.Portal = Portal ;
  global.postDestroy = postDestroy ;
  global.Anchor = Anchor ;
  global.Display = Display ;
  global.renderFor = renderFor ;
  global.Build = Build ;
  global.Self = Self ;
  global.asyncWidget = asyncWidget ;
  global.preUpdate = preUpdate ;
  global.isShallowRef = isShallowRef ;
  global.Motion = Motion ;
  global.Provider = Provider ;
  global.postMount = postMount ;
  global.postBuild = postBuild ;
  global.useTransform = useTransform ;
  global.unRef = unRef ;
  global.makePublish = makePublish ;
  global.setConfig = setupConfig ;
  global.createExpose = createExpose ;
  global.mapSlots = mapSlots ;
  global.injectParams = injectParams ;
  global.resolveHooks = resolveHook ;
  global.useModel = useModel ;
  global.stateRef = stateRef ;
  global._createVirtualElement = _createVirtualElement ;
  global.isReadonlyRef = isReadonlyRef ;
  global.preDestroy = preDestroy ;
  global.markdown = markdown ;
  global._validateType = _validateType ;
  global.FormField = FormField ;
  global.Any = Any ;
  global.fields = fields ;
  global._getNodeListResponse = _getNodeListResponse ;
  global.deferTick = deferTick ;
  global._generateUUID = _generateUUID ;
  global.Type = Type ;
  global.defineWidget = defineWidget ;
  global.onCatch = onCatch ;
  global.createFormModel = createFormModel ;
  global.onEffect = onEffect ;
  global.onTracked = onTracked ;
  global.html = html ;
  global.deferWatch = deferWatch ;
  global.readonly = readonly ;
  global._escapeDecoder = _escapeDecoder ;
  global.path = path ;
  global.withDirectives = withDirectives ;
  global.traverse = traverse ;
  global.batch = batch ;
  global.createHouxElement = createHouxElement ;
  global.memMove = memMove ;
  global.RegisterInjector = RegisterInjector ;
  global.defineSignals = defineSignals ;
  global.Widget = Widget ;
  global.len = len ;
  global.markRaw = markRaw ;
  global.isRaw = isRaw ;
  global.asyncPath = asyncPath ;
  global.toReadonlyRef = toReadonlyRef ;
  global.fromReadonlyRef = fromReadonlyRef ;
  global._HouxTemplateParser = _HouxTemplateParser ;
  global._EvalWith = _EvalWith ;
  global._Proxy_Setup = _Proxy_Setup ;
  global.dataRef = dataRef ;
  global._createNativeElement = _createNativeElement ;
  global.Request = Request ;
  global.computed = computed ;
  global.getter = getter ;
  global.createCustomDataRef = createCustomDataRef ;
  global.Form = Form ;
  global.isNativeElement = isNativeElement ;
  global._createWidgetElement = _createWidgetElement ;
  global.fromRef = fromRef ;
  global.isFieldTypeOf = isFieldTypeOf ;
  global.getFieldType = getFieldType ;
  global.toRef = toRef ;
  global._to_kebab_case = _to_kebab_case ;
  global.Ref = Ref ;
  global.openEffectStore = openEffectStore ;
  global._toCamelCase = _toCamelCase ;
  global._createTextElement = _createTextElement ;
  global.buildRouter = buildRouter ;
  global.cloneVElement = cloneVElement ;
  global.createCustomElement = createCustomElement ;
  global._createFragment = _createFragment ; //dev
  global.$Debug = $Debug ; //dev
  global.Fragment = Fragment ;
  global.createAgent = createAgent ;
  global.isShallowReactiveRef = isShallowReactiveRef ;
  global.Tuple = Tuple ;
  global._GenerateRoot = _GenerateRoot ;
  global.withFallThrough = withFallThrough ;
  global.lazy = lazy ;
  global.version = version ;
  global.deepEqualityCheck = deepEqualityCheck ;
  global.isShallowReadOnlyRef = isShallowReadOnlyRef ;
  global.isComputedRef = isComputedRef ;
  global.useAgent = useAgent ;
  console.info( devInfo ) ; //dev
  return global ;
} )( ( { } ) ) ;
