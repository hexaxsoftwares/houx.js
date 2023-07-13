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
  const get_version= 'pixel-0.1.0';//pixel at it's earliest version
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
  const _mapValue=(obj, arg)=>isNull(obj) ? false : isPObject(obj) ? hasOwn(obj, arg) : isArray(obj) ? obj.includes(arg) : isSet(obj) || isMap(obj) ? obj.has(arg) : false;
  const isFunction=func=>isEQ(getType(func),'function');
  const isNum=num=>isEQ(getType(num),'number');
  const isBool=bool=>isEQ(getType(bool), 'boolean');
  const bool=Boolean;
  const defProps=Object.defineProperties
  const isSym=sym=>getType(sym);
  const isPromise=prom=> isEQ(_toStringCall(prom), '[object Promise]') && isFunction(prom.then) && isFunction(prom.catch);
  const isGT=(val, arg)=>val>arg;//checks if val is greater than arg
  const isLT=(val, arg)=>val<arg;//checks if val is less than arg
  const isGTE=(val, arg)=>val>=arg;//checks if val is greater than or equal to args
  const yes=compute=>isEQ(compute, true);
  const isLTE=(val, arg)=>val<=arg;
  const $warner=`<<** Pixel $Debug **>>.....>>>>>>>`;
  const $Debug=msg=>console.warn(`${$warner}\n\n ${msg}`);//pixel warming debugger
  const isBFun=func=>isFunction(func) && func.name.startsWith('bound');
  const hasOn_bind=key=>/^on:[a-zA-Z0-9\-_|[\]]+/.test(key);
  const hasAt_bind=key=>/^@[a-zA-Z0-9\-_|[\]]+/.test(key);
  const hasPx_bind=key=>/^px:[a-zA-Z0-9\-_|[\]]+/.test(key)
  const hasSpread_bind=key=>/^\.\.\.[^.?]+/.test(key);
  const hasAsterisks_bind=key=>/^\*[a-zA-Z0-9\-_|[\]]+/.test(key)
  const validWidgetOptions=['build','model','styleClass','widgets','beforeBuild','onBuilt','onMounted','beforeUpdate', 'onUpdated','onDestroyed','handlers','params','buildConfig','styleSheet','directives','template','name','observers'];//valid widget options---
  const stringBasedOptions=['name','template','styleSheet'];
  const methodBasedOptions=['build','model','beforeBuild','onBuilt','beforeMount','onMounted','beforeUpdate','onUpdated','onDestroyed'];
  const objectBasedOptions=['styleClass','widgets','handlers','params','buildConfig','directives','observers'];
  const isArrayBasedOptions=['params']
  const count=obj=>isPObject(obj) ? Object.keys(obj).length : isArray(obj) ? obj.length : isSet(obj) ? obj.size : 0;
  const isValidWidgetOption=opts=>_mapValue(validWidgetOptions, opts);//checks if an option is a vslid Pixel widget option
  const HTML_TAGS=['html','head','style','title','body','address','article','aside','footer','header','h1','h2','h3','h4','h5','h6','main','nav','section','blockquote','dd','div','dl','dt','figcaption','figure','li','menu','ol','p','pre','ul','a','abbr','b','bdi','bdo','cite','code','data','dfn','em','i','kbd','mark','q','rp','rt','ruby','s','samp','small','span','strong','sub','sup','time','u','var','audio','map','video','iframe','object','picture','portal','svg','math','canvas','noscript','script','del','ins','caption','col','colgroup','table','tbody','td','tfoot','th','thead','tr','datalist','fieldset','form','label','legend','meter','optgroup','option','output','progress','select','textarea','details','dialog','summary','button']//All html valid tags supported by the Pixel framework
  const IS_HTML_TAG=txt=>_mapValue(HTML_TAGS, txt);
  const WEB_COMPONENTS=['template','slot'];//Web components tags , also supported by the Pixel framework
  const HTML_FORM_ELEMENTS=['select', 'textarea','input','form','progress','meter','option'];
  const Is_Form_Element=txt=>_mapValue(HTML_FORM_ELEMENTS, txt);
  const IS_WEB_COMPONENT=txt=>_mapValue(WEB_COMPONENTS, txt);
  const HTML_VOID_TAGS=['base','link','meta','hr','br','wbr','area','img','track','embed','source','input'];//HTML void tags, also supported by the Pixel framework
  const IS_HTML_VOID_TAG=txt=>_mapValue(HTML_VOID_TAGS, txt);
  const HTML_DEPRECATED_TAGS=['acronym','noembed','applet','noframes','bgsound','param','big','blink','plaintext','center','rb','content','rtc','dir','shadow','font','spacer','frame','strike','frameset','image','tt','keygen','xmp','marquee','nobr','menuitem'];//HTML obselete and deprecated element. 
  //The above tags are no more been supported by the pixel framework
  const IS_HTML_DEPRECATED_TAG=txt=>_mapValue(HTML_DEPRECATED_TAGS, txt);
  const IS_VALID_TAGNAME=(txt)=>{
    if(IS_HTML_TAG(txt)||IS_WEB_COMPONENT(txt)||IS_HTML_VOID_TAG(txt))return true;
    else if(IS_HTML_DEPRECATED_TAG(txt)){$Debug(`"${txt}" is an html deprecated tag, and should not be used in new projects\n\nPixel JS does not offer the compilation of obselete elements`);return false;}
    else return false;
  }
  const SVG_TAGS=['a','animate','animateMotion','animateTransform','circle','clipPath','defs','desc','discard','ellipse','feBlend','feColorMatrix','feComponentTransfer','feComposite','feConvolveMatrix','feDiffuseLighting','feDisplacementMap','feDistantLight','feDropShadow','feFlood','feFuncA','feFuncB','feFuncG','feFuncR','feGaussianBlur','feImage','feMerge','feMergeNode','feMorphology','feOffset','fePointLight','feSpecularLighting','feSpotLight','feTile','feTurbulence','filter','foreignObject','g','hatch','hatchpath','image','line','linearGradient','marker','mask','metadata','mpath','path','pattern','polygon','polyline','radialGradient','rect','script','set','stop','style','svg','switch','symbol','text','textPath','title','tspan','use','view'];
  const SVG_DEPRECATED_TAGS=['altGlyph','altGlyphDef','altGlyphItem','cursor','font','font-face','font-face-format','font-face-name','font-face-src','font-face-uri','glyph','glyphRef','hkern','missing-glyph','tref','vkern'];
  const dataStringTypes=['string','function','object','array','boolean','number','symbol','date','set','map'];//Valid javascript datatypes
  const isValidDataStringType=obj=>_mapValue(dataTypes, obj);//checks if a string value is a dataTypes return text
  const DataFunctionMap=[String, Function, Object, Array, Date, Symbol, Number, Boolean];
  const Data_Flags=['NodeList','PATCH_FLAGS',]
  const hasUpperCase=str=>str.match(/[A-Z]/g);
  const hasLowerCase=str=>str.match(/[a-z]/g);
  const hasDigit=dig=>dig.match(/[0-9]/g);
  const NodeTypeMap={ ELEMENT_NODE:1, ATTRIBUTE_NODE:2, TEXT_NODE:3, CDATA_SECTION_NODE:4, ENTITY_REFERENCE_NODE:5, ENTITY_NODE:6, PROCESSING_INSTRUCTION_NODE:7, COMMENT_NODE:8, DOCUMENT_NODE:9, DOCUMENT_TYPE_NODE:10, DOCUMENT_FRAGMENT_NODE:11, NOTATION_NODE:12 }
  const isElementNode=nodeType=>_mapValue(NodeTypeMap, nodeType);
  const IsValidElement=(el)=> IS_VALID_TAGNAME(el.localName)  ||  el.isPixel_Fragment;
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
  const TypeMethods={isString, isFunction, isPObject, isArray, isBool, isNum, isDate, isSym, isSet, isMap}
  const isNodeChildren=val=> isString(val) || isArray(val) || isPObject(val) && val && val.isChildWidget || val && isPObject(val) && IS_VALID_TAGNAME(val.type) && hasOwn(val, 'attrs') && hasOwn(val, 'children') && isEQ(count(val), 3);
  function parseScript(script){return Function(`"use strict"; return (${script})`)();}//helps compile string values to javascript statement
  const createNodeChildrenOrSetAttrs=function(args, element, self){
    if(isNull(args)) return element;
    else if(isNodeChildren(args) || args.isWidget ) return NodeChildrenManager(args, element, self);
    else if (isPObject(args)) return AttributeManager(args, element, self);
  }
  const GLOBAL_EVENTS=['abort','animationcancel','animationend','animationiteration','animationstart','auxclick','blur','error','focus','canplay','canplaythrough','cancel','change','click','close','contextmenu','dblclick','drag','dragend','dragenter','dragleave','dragover','dragstart','drop','durationchange','emptied','ended','formdata','gotpointercapture','input','invalid','keydown','keypress','load','keyup','loadeddata','loadedmetadata','loadend','loadstart','lostpointercapture','mousedown','mouseenter','mouseleave','mousemove','mouseout','mouseover','mouseup','mousewheel','wheel','pause','play','playing','pointerdown','pointermove','pointerup','pointercancel','pointerover','pointerout','pointerleave','pointerenter','pointerlockchange','pointerlockerror','progress','ratechange','reset','resize','scroll','securitypolicyviolation','seeked','seeking','select','selectstart','selectionchange','slotchange','stalled','submit','suspend','timeupdate','touchcancel','touchend','touchstart','touchmove','transitioncancel','transitionrun','transitioned','transitionstart','waiting','volumechange','autocompleteerror','autocomplete'];//Html event names managed by pixel on elements
  const IS_VALID_EVENT_HANDLER=eventName=>_mapValue(GLOBAL_EVENTS, eventName);
  const HtmlEntityMap={'&quot;':'"','&apos;':"'",'&lt;':"<",'&gt;':'>','&amp;':'&','&cent;':'¢','&pound;':'£','&yen;':'¥','&euro;':'€','&copy;':'©','&reg;':'®','&trade;':'™','&times;':'×','&divide;':'÷','&Aacute;':'Á','&aacute;':'á','&Acirc;':'Â','&acirc;':'â','&Agrave;':'À','&agrave;':'à','&Aring;':'Å','&aring;':'å','&Atilde;':'Ã','&atilde;':'ã','&Auml;':'Ä','&auml;':'ä','&AElig;':'Æ','&aelig;':'æ','&Ccedil;':'Ç','&ccedil;':'ç','&Eacute;':'É','&eacute;':'é','&Ecirc;':'Ê','&ecirc;':'ê','&Egrave;':'È','&egrave;':'è','&ETH;':'Ð','&eth;':'ð','&Ecirc;':'Ê','&ecirc;':'ê','&Iacute;':'Í','&iacute;':'í','&Icirc;':'Î','&icirc;':'î','&Igrave;':'Ì','&igrave;':'ì','&Iuml;':'Ï','&iuml;':'ï','&Ntilde;':'Ñ','&ntilde;':'ñ','&Oacute;':'Ó','&oacute;':'ó','&Ocirc;':'Ô','&ocirc;':'ô','&Ograve;':'Ò','&ograve;':'ò','&Oslash;':'Ø','&oslash;':'ø','&Otilde;':'Õ','&otilde;':'õ','&Ouml;':'Ö','&ouml;':'ö','&Scaron;':'Š','&scaron;':'š','&Uacute;':'Ú','&uacute;':'ú','&Ucirc;':'Û','&ucirc;':'û','&Ugrave;':'Ù','&ugrave;':'ù','&Uuml;':'Ü','&uuml;':'ü','&Yacute;':'Ý','&yacute;':'ý','&Yuml;':'Ÿ','&yuml;':'ÿ'};
  function createTxtNode(self, text, parent){
    text=String(text);
    let hasSkip;
    let node;
    if(parent){
      let hasSkip=hasOwn(parent, 'px:skip');
      const Skip=parent['px:skip'];
      hasSkip= hasSkip && isBool(Skip) ? Skip : hasSkip ;
    }
    if(text) node=document.createTextNode(text);
    define(node, 'PATCH_FLAGS', {value:new Set()});
    if(hasSpecialCharacters(node.textContent) &&  !hasSkip ) {
      node.textContent=resolveAccessor(self.state, node.textContent, self.state ? self.state.config : {}, parent, node);
      node.textContent=_Compiler_Call(self.state, node.textContent, parent);
    }
    define(node, 'trigger_Effect_Run',{value:Node_Effect_Track.bind({target:node, self:self})});
    return node;
  }
  function createVNode(type, attrs=null, children=null, self={}, ctx){
    const argsCount=arguments.length;
    let element;
    const Pixel_El={
      __PX_ID:`__${generate_UUID(10)}`,
    }
    if(type){
      if(IS_VALID_TAGNAME(type))element=document.createElement(type);
      if(count(self)) {
        define(element, 'px__VNode',{value:self._px_hash_});
        element.classList.add(self._px_hash_);
      }
      assign(element, Pixel_El);
    }
    define(element, 'PATCH_FLAGS', {value:new Set(), configurable:true, enumerable:true, writable:true});
    define(element, 'NodeList',{value:[], configurable:true, writable:true});
    const attributes=!isNull(attrs) && !isNodeChildren(attrs) && isPObject(attrs) ? attrs : !isNull(children) && !isNodeChildren(children) && isPObject(children) ? children : {}
    if(!isNull(attributes['px:skip'])){
      const name=attributes['px:skip'];
      let item;
      try{
        item=parseScript(name);
        item= item || __Evaluate_THIS(self.state, name, element);
      }catch(err){
        try{
          item=__Evaluate_THIS(self.state, name, element);
        }catch(error){
          $Debug(`${err}`);
        }
      }
      define(element, 'px:skip', {value:item , configurable:true, enumerable: true});
    }
    if(ctx){
      define(element, 'ctx',{value: ctx});
      if(ctx.ref) element.PATCH_FLAGS.add(ctx.ref);
    }
    element=createNodeChildrenOrSetAttrs(arguments[1], element, self);
    element=createNodeChildrenOrSetAttrs(arguments[2], element, self);
    if(element.hasAttribute('px:data')){
      const attr=element.getAttribute('px:data');
      if(attr.includes('.')){
        $Debug(`Directive resolver issue::\n\npx:data directive does not support dotted accessor property reference for binding in pixel `);return element;
      }
      if(has_Object_Prop(self.state, attr) || has_Object_Prop(self.state.config.$global.properties)){
        let item;
        try{
          item=get_Object_Value(self.state, attr, true);
        }catch(err){
          item=get_Object_Value(self.state.config.$global.properties, attr)
        }
        set_Object_Value(has_Object_Prop(self.state, attr) ? self.state : has_Object_Prop(self.state.config.$global.properties) ? self.state.config.$global.properties : {} , attr, {value:element})
      }else $Debug(`Reference Error:;\n\n '${attr} is referenced on build, but not defined on model`);
    }
    define(element, 'trigger_Effect_Run',{value:Node_Effect_Track.bind({target:element, self:self})});
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
      if(!hasSpecialCharacters(config.delimiters[0]) || !hasSpecialCharacters(config.delimiters[1]) ) $Debug(`mustache customization error::\n\n delimeters must match value of special characters\n\ne.g !, @, #, $, %, ^, &, *, (, ),  [, ], {, },  :, ?`); 
      else if(config.delimiters[0].startsWith('${') || config.delimiters[1].startsWith('${')) $Debug(`Invalid  delimiter value :: \n\n"$\{" cannot be used as a string mustache delimeter since this are javascript multiline string interpolation technic\n\n Delimeter Configuration failed`);
      else delimiters=config.delimiters;
    }
    if(delimiters && isArray(delimiters) && isEQ(delimiters.length, 2)){
      entries(delimiters).forEach(([key, val])=>{
        if(!isString(val)){
          $Debug(`${isEQ(key, 0) ? 'opening' : ' closing' } delimiters value must be passed as a string`);return;
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
          text=__Evaluate_THIS(self, text, el);
        } catch(err){
          $Debug(`accessor Error\n\n "${text}" property was accessed on build, but not defined on build model\n\n ${err}`);return '';
        }
        text= isPrimitive(text) ? String(text) : '';
        if(el && yes(isString(text) || text)) {
          el.PATCH_FLAGS.add(link);
          if(node) node.PATCH_FLAGS.add(link);
        }
        return isNull(text) ? '' : text;
      })
    }
    return str;
  }
  function _Compiler_Call(self, str, el, node){
    const pattern=/__\$ref\((.*?)\)__/g;
    let link;
    if(str.match(pattern)) {
      str=str.replace(pattern, (match, text)=>{
        text=text.trim();
        link=text;
        try{
          let name=text;
          text=__Evaluate_THIS(self, text, el)||'';
        } catch(err){
          $Debug(`accessor Error\n\n "${text}" property was accessed on build, but not defined on build model\n\n ${err}`);return '';
        }
        text= isPrimitive(text) ? String(text) : '';
        if(isString(text) || text && el) {
          el.PATCH_FLAGS.add(link);
          if(node) node.PATCH_FLAGS.add(link);
        }
        return isNull(text) ? '' : text;
      })
    }
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
  const PixelDirectives=['px:if','px:else','px:else-if','px:html','px:text','px:for','px:skip','px:data','px:slot','px:model','px','px:bind'];
  const NodeBasedDirectives=['px:html','px:text','px:skip','px:model'];
  const WidgetUsableDirectives=['px:data','px:for', 'px:if','px:else-if','px:else','px','px:bind','px:slot'];
  const cond_Directives=['px:if', 'px:else-if', 'px:else'];
  const isPixelDirective=dir=>_mapValue(PixelDirectives, dir);
  const isNodeBaseDirective=dir=>_mapValue(NodeBasedDirectives, dir)
  const isWidgetUsableDirective=dir=>_mapValue(WidgetUsableDirectives, dir)
  function __Evaluate_THIS(obj, str, el){
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
    // const unsupportedRegex = /(?:\.\.|\/\/|\/\*|\*\*|\[=|==\+|-\+|\+=|\-=|\*=|\/=|%=\*\*=|&&=|\|\|=|<=|>=|\breturn\b|\bthrow\b|\bfunction\b|\bnew\b|\btypeof\b|\bdelete\b|\binstanceof\b|\bvoid\b|\bnull\b|\bundefined\b|\bconst\b|\blet\b|\bvar\bclass\b)/;
    const unsupportedRegex = /(?:\.\.|\/\/|\/\*|\*\*|\[=|==\+|-\+|\+=|\-=|\*=|\/=|%=\*\*=|&&=|\|\|=|<=|>=|\breturn\b|\bthrow\b|\bfunction\b|\bnew\b|\btypeof\b|\bdelete\b|\binstanceof\b|\bvoid\b|\bnull\b|\bundefined\b|\bconst\b|\blet\b|\bvar\bclass\b)/;
    if (unsupportedRegex.test(expressionWithoutComments)) {
      throw new Error(`Invalid expression: \n\nUnsupported constructs are not allowed.\n\n"${expressionWithoutComments}"`);
    }
    const getValue = new Function('obj', `with(obj){
      return ${str}}
    `);
    let value;
    let context;
    if(el && el.ctx){
      delete el.ctx.ref;
      context=el.ctx;
    }else if(hasOwn(obj, 'ctx')){
      context=obj.ctx;
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
  function __Attr_Name_Resolver(self, attr, el){
    attr= attr.slice(1);
    const pattern=/\[(.*?)\]/g;
    const matches=attr.match(/\[(.*?)\]/g);
    if(attr.match(pattern)){
      let name=''
      attr=matches[0].replace(pattern, (match, text)=>{
        name=text;
        try{
          let suit=parseScript(text);
          suit= !isNull(suit) ? suit : __Evaluate_THIS(self.state, text, el);
          if(isNull(suit))$Debug(`Value Error::\n\n ${text} value accessor is unefined or does not exist`);
          text=suit;
        }catch(error){
          try{
            text=__Evaluate_THIS(self.state, text, el);
          }catch(err){
            throw err;
          }
        }
        return isNull(text) ? '' : text;
      })
      if(el) el.PATCH_FLAGS.add(name);
    }
    return `*${attr}`;
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
          $Debug(`Failed to create element class from bind array data`);return;}
        element.className=`${element.className} ${item}`;
      }
    }else if(isString(item)){
      element.className=`${element.className} ${item}`;
    }
  }
  const parse_Style_Binding=function(self, item, element){
    if(isPObject(item)){
      entries(item).forEach(([key, style])=>{
        if(!isString(style)){ $Debug(`Unrecognized stype property value \n\nat at\n "${key}" style property\n\n${element.outerHTML}`); return;}
        key=transpile_From_Hyphen(key)//support for hyphen included css style classess
         element.style[key]=style
      })
    }else if(isArray(item)){
      for(const value of item.values()){
        parse_Style_Binding(self, value, element)
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
  function context_Data(self, value, el){
    let item;
    let name;
    try{
      item=__Evaluate_THIS(self.state, value, el) ;
      item=!item ? value : ''
    }catch(err){
      throw new Error(err)
    }
    return item
  }
  const fall_AttrName=(key, attr)=>{
    const Key_Binding={ '*':1, '@':1, ':':1, 'on:':3, 'px:':3, 'on':2, '...':3 };
    if( isString(attr) && attr.trim() || !isString(attr) && attr || isBool(attr)) return attr ;
    for(const [ky, sl] of entries(Key_Binding)){
      if(key.startsWith(ky)){
        return key.slice(sl);
      }
    }
  }
  function AttributeManager(attrs, element, self){
     if(!isPObject(attrs))return;
     const pattern=/__\$ref\((.*?)\)__/;
     entries(attrs).forEach(([key, attr ])=>{
       attr=fall_AttrName(key, attr)
      if(key.match(pattern)) key=_Compiler_Call(self.state, key, element);
      if(hasAsterisks_bind(key)){
         let name;
         let item;
        key=__Attr_Name_Resolver(self, key, element);
         try{
           item=item=__Evaluate_THIS(self.state, attr, element);
           name=key;
        }catch(err){
          try{
            name=key;
            item=__Evaluate_THIS(element.ctx, attr, element);
            if(!item && isNull(item)){
              $Debug(`value"${attr}" property value was accessed during render, but not initialized on model or is undefined\n\nat at\n ..."${name} attribute on ${element.localName} element`);
              return;
            }else element.PATCH_FLAGS.add(attr);
          }catch(error){
             $Debug(`value "${attr}" property value was accessed during render, but not initialized on model\n\nat at\n \n${element.outerHTML}\n\n..."${name} \n${error}`);
             return;
          }
        }
        if(!isNull(name)){
          if(isEQ(name, 'style') || isEQ(name.slice(1), 'style') && isPObject(item)){
            parse_Style_Binding(self, item, element)
          }else if(isEQ(name.slice(1), 'class') || isEQ(name, 'class')){
             parse_Class_Binding(self, item, element)
          }else if(isPixelDirective(name) || isPixelDirective(name.slice(1))){
            $Debug(`Disallowed data bind for directive\nat........\n${fall_AttrName(name)} attribute`);return;
          }else{
            element.setAttribute(fall_AttrName(name), item);
          }
        }
      }else if(hasAt_bind(key) || hasOn_bind(key) || key.startsWith('on') || yes(hasPx_bind(key) && IS_VALID_EVENT_HANDLER(key.slice(3))) ){
        if(isString(attr)){
          try{
            attr=attr.split(' ').join('');
            attr=__Evaluate_THIS(self.state, attr.match(pattern) ? attr.match(pattern)[1].trim() : attr.trim(), element);
          }catch(err){
            throw new Error(err);
          }
        }
        if(!isFunction(attr)){$Debug(`"${event}" event must be wrapped as or in a function \n\non.....on...\n  "${element.localName}" element\n`);return element;}
        if(!isBFun(attr)) attr=attr.bind(self.state);
        if(hasAt_bind(key) || yes(hasPx_bind(key) && IS_VALID_EVENT_HANDLER(key.slice(3))) || hasOn_bind(key)){
          _Run_With_Modifiers({key, attr}, element, key.includes('|'));
        }else{
          if(key.includes('|')){
            $Debug(`Event passing Error\n\nThe "on<EVENT>" Event listener does not support the event modifiers, \n\n use the "@<evenName>|modifiers" or "on:<evenName>|modifiers" binding  instead`);return element;
          };
          const event =fall_AttrName(key).toLowerCase()
          element.addEventListener(event, isFunction(attr) ? attr : do_Nothing);
        }
      }else if(isPixelDirective(key)){
        if(isString(attr) && attr.match(pattern)) attr=attr.match(pattern)[1].trim();
         element=__Resolve__Directives(self, key, attr, element)
      }else if(isEQ(key,'style')){
        if(isString(attr) && attr.match(pattern)) attr=_Compiler_Call(self.state, attr, element);
        parse_Style_Binding(self, attr, element);
      }else if(isEQ(key, 'class')){
        if(isString(attr) && attr.match(pattern)) attr=_Compiler_Call(self.state, attr, element);
        parse_Class_Binding(self, attr, element)
      }else if(hasPx_bind(key)){
        key=fall_AttrName(key)
        const obj=  { [`*${key}`]:attr || isBool(attr) ? attr : `${key}`} 
        element=AttributeManager(obj, element, self);
      }else if(key.startsWith(':')){
        return _With_Custom_Directives(self, {key, attr}, element);
      }else if(hasSpread_bind(key)){ 
        return Attribute_Spread(self, { key:attr}, element);
      }else{
        try{ 
          if(isString(attr) && attr.match(pattern)) attr=_Compiler_Call(self.state, attr, element);
          element.setAttribute(key, attr||'');
        }catch(err){
          $Debug(`Athribute Error::\n\n...unable to set node attribute "${key}\n\n ${err}`);
          return element;
        }
      }
     })
     return element;
  }
  function Attribute_Spread(self, data, el){
    const { key }=data;
    let value;
    try{
      get_Object_Value(self.state, key, true);
      value=__Evaluate_THIS(self.state, key, el);
    }catch(err){
      $Debug(err);
    }
    if(!isPObject(value)){
      $Debug(`spread syntax on px__VNode can only accept binded values of an object`);return el;
    }
    el = AttributeManager(value, el, self)
    return el;
  }
  function _With_Custom_Directives(self, data={}, el){
    const { key, attr } = data;
    let value;
    try{
      get_Object_Value(self.state, attr, true)
      value=__Evaluate_THIS(self.state, attr, el);
    }catch(err){
      value=attr;
      //$Debug(err)
    }
    let has_modifiers=false;
    let modifiers=key.includes('|') ? key.split('|') : null ;
    if(modifiers && count(modifiers)) has_modifiers=true;
    const Name= bool(has_modifiers) ? modifiers.shift() : key ;
    if(!self.directives || !hasOwn(self.directives, Name )){
      $Debug(
        `((Undefined Directives Reference))\n\n "${key}" directive is not a registered pixel directive on this widget\n\nat...........at>>>.\n ${el.outerHTML}`
        );return el;
    }
    const directive= self.directives[Name];
    let action =  isFunction(directive) ? directive :  null;
    if(!action || !isFunction(action)){
      if(isPObject(directive) && yes(!hasOwn(directive, 'created' ) && !hasOwn(directive, 'mounted') )) {
        $Debug(`((Directive Error))\n\ndirective object does not return an "created/mounted" method`); return el;
      }else if(!isPObject(directive) && !isFunction(directive)) {
        $Debug(`((Directive Error))\n\n directive value is not a function`); return el;
      }
    }
    const Obj_Modifier={};
    if(count(modifiers)){
      for(const val of modifiers.values()){
        define(Obj_Modifier, val, {value:val, enumerable:true})
      }
    }
    if(isPObject(directive)){
      if(hasOwn(directive, 'created')){
        if(!isFunction(directive['created'])){
          $Debug(`((Directive created hook))\n\n Custom directive created hook is not a function`); return el;
        }
        action= directive['created']
      }
    }
    action=action.bind(self.state);
    action(el, {value}, Obj_Modifier);
    let mountedHook;
    if(isPObject(directive)){
      if(hasOwn(directive, 'mounted')){
        if(!isFunction(directive['mounted'])){
          $Debug(`((Directive mounted hook))\n\n Custom directive mounted hook is not a function`); return el;
        }
        mountedHook = directive['mounted'].bind( self.state );
        define( el, 'mountedDirectiveHook', { value :{ hook : mountedHook , self, modifiers:Obj_Modifier , value }});
      }
    }
    return el;
  }
  function _Run_With_Modifiers(model, el, with_modifiers){
    let { key, attr:func } = model;
    if(!isFunction(func)){
      $Debug(`"${key}" event must be passed as  a function \n \n${func } is not a valid event method`);return;}
    let modifiers=bool(with_modifiers) ? key.split('|') : null;
    let eventName= modifiers ?  modifiers.shift() : key ;
    eventName=fall_AttrName(eventName);
    modifiers=new Set(modifiers);
    const has_modifiers=isGT(modifiers.size,0);
    const options={}
    if(has_modifiers){
      if(modifiers.has('once')) define(options, 'once', {value:true});
      if(modifiers.has('passive')) define(options, 'passive', {value:true});
      if(modifiers.has('nonpassive')) define(options, 'passive', {value:false});
      if(modifiers.has('capture')) define(options, 'capture', {value:true});
    }
    function __With_Modifiers(event){
      if(has_modifiers){
        if(modifiers.has('prevent')) event.preventDefault()
        if(modifiers.has('stop')) event.stopPropagation()
        if(modifiers.has('trusted')) func=event.isTrusted ? func : do_Nothing
        if(modifiers.has('self')){
          if(!el.isEqualNode(event.target)) return;
        }
      }
      func(event);
    }
    el.addEventListener(eventName, has_modifiers ? __With_Modifiers : isFunction(func) ? func : do_Nothing, options);
  }
  function __Resolve__Directives(self, key, attr, el){
    let item=attr;
    let name=key;
    const getCtx=(it)=>{
      let res;
      try{
        get_Object_Value(el.ctx, it, true);
        res=__Evaluate_THIS(el.ctx, it) || item;
      }catch(err){
        res=it;
      }
      return res;
    }
    if(isEQ(name, 'px')){
      
    }else if(isEQ(name, 'px:bind')){ 
      let bra;
        try{
          get_Object_Value(self.state, item, true);
          bra=__Evaluate_THIS(self.state, item, el);
      }catch(err){
          bra=getCtx(item);
      }
      if(!bra || !isPObject(bra)){
        $Debug(`Invalid value found on "px:bind" directive\n\n   required an object\n at>>>>>>>>> ${el.localName} element`);
      }else el=AttributeManager(bra, el, self);
    }else if(isEQ(name, 'px:for')){
      do_Nothing();//
    }else if(isEQ(name, 'px:html')){
      let bra;
        try{
          get_Object_Value(self.state, item, true)
          bra=__Evaluate_THIS(self.state, item, el) || item;
      }catch(err){
          bra=getCtx(item)
      }
      if(bra && isPrimitive(bra)) {
        el.innerHTML=!isNull(bra) ? bra : '';
        el.PATCH_FLAGS.add(item);
      }
    }else if(isEQ(name, 'px:text')){
      let bra;
      try{
        get_Object_Value(self.state, item, true)
        bra=__Evaluate_THIS(self.state, item, el) || item;
      }catch(error){
        bra=getCtx(item)
      }
      if(bra && isPrimitive(bra)) {
        el.innerText=!isNull(bra) ? bra : '';
        el.PATCH_FLAGS.add(item);
      }
    }else if(isEQ(name, 'px:data')){
      try{
        get_Object_Value(self.state, item);
      }catch{
        $Debug(`value "${item}" property value was accessed during render, but not initialized on model or is undefined\n\nat at\n ..."${name} directive on ${el.localName} element`);return;
      }
      el.setAttribute('px:data', item)
    }else if(isEQ(name, 'px:slot')){   
      if(!isString(item)){
        $Debug(`value Error::\n\n slot name undefined or is not a string\n\n Error resolving slot name reference on "${el.localName}"`);return;
      }
      el.setAttribute(name.slice(3), item);
    }else if(isEQ(name, 'px:model')){
      if(!Is_Form_Element(el.localName)){
        $Debug(`Compilation Error::\n\n cannot bind a data model to  a none form element`);return;
      }
      let initVal='';
      try{
        initVal=get_Object_Value(self.state, item, true) || "";
      }catch(err){
        $Debug(`undefined reference for directive "px:model"\n\n "${item}" is not defined on widget model instance\n\n${err}`);
      }
      el.value=initVal;
      const eventName=get_Model_Event(el);
      if(eventName){
        el.addEventListener(eventName, function(){
          try{
            set_Object_Value(self.state, item , el.value );
          }catch(err){
            throw new Error(err);
          }
        });
      }
     el.PATCH_FLAGS.add(item);
    }
    return el;
  }
  function get_Model_Event(el ){
    let event='input';
    if(IS_ELEMENT_NODE(el) && Is_Form_Element(el.localName)){
      if(isEQ(el.localName, 'input')){
        event= _mapValue(['file'], el.type) ? 'change' : _mapValue(['button','submit','reset'], el.type) ? 'click' : _mapValue(['image','hidden']) ? null : 'input'
      }else if(isEQ(el.localName, 'form')) event='submit';
      else event= 'change';
    }
    return event;
  }
  const isTagMatch=(open, close)=>{//match syntax for a px:for opening and closing tags
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
    const keyValueRegex=/(([{|\[|\(])[\s]?(([a-zA-Z]*)[\s]?([\,][\s]?([a-zA-Z]*)?)?)[\s]?([}|\]|)])\s+([of|in]+)\s([a-zA-Z0-9.\-\_\$]+))/;
    const valueRegex=/(([a-zA-Z]+)\s+([of|in]+)\s+([a-zA-Z0-9.\-\_\$]+))/;
    const Loop_Data={}
    if(str.match(keyValueRegex)){
      str=str.replace(keyValueRegex,(match,p1, op, p2, key, rud, val,  cl, type, obj)=>{
        if(isGT(op, 1) && isGT(cl, 1) ) {
          $Debug(`únrecognised tags, \n must be a single opening or closing brackets`);return;
        }else if(!isTagMatch(op, cl)){
          $Debug(`Unmaching tags for px:for loop data keys mapping\n `);return;
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
    }else{
      $Debug(`Usupported Loop format in 'px:for'\n\n"${str}" is not recognised`);return;
    }
    return Loop_Data
  }
  function For_Loop(self, attr){
    const data=get_Loop_Data(attr);
    if(!data) return ;
    let dataObject;
    let ref;
    try{
      dataObject=__Evaluate_THIS(self.state, data.obj);
      ref=data.obj;
    }catch(error){
      $Debug(`Trouble accessing '${data.obj}' object for px:for loop\n\nnot found on instance or is undefined\n\n${error}`);return;
    }
    if(!dataObject || !isPObject(dataObject) && !isArray(dataObject) && !isNum(dataObject)){
      $Debug(`Undefined scope for px:for, \n\n${data.obj} not iterable`);return ;
    }
    const Valid_LoopType=['of','in'];
    if(!_mapValue(Valid_LoopType, data.type)){
      $Debug(`Iteration issue\n\n"${data.type}" is not an iterator\n "of" or "in" only supported by Pixel`);return;
    }
    return { obj:dataObject, keyName:data.key, valRef:data.value, loopType:data.type, ref }
  }
  const hasIFWithFor=(attrs)=>{
    const isST=new Set(cond_Directives);
    let res=false;
    for(const [key, attr] of entries(attrs)){
      if(isST.has(key) && hasOwn(attrs, 'px:for')) {
        res=true;
        break;
      }
    }
    return res;
  }
  const Node_$for$if$_Compiler=function(self, options, el){
    const { type, attrs, children } = options;
    let node;
    if(attrs && hasOwn(attrs, 'px:for')) return _$Directive_$For_Loop$_Renderer(self, attrs, createVNode, [type, children, attrs, self],options , null, el);
    else if(has_Intersect_Prop(cond_Directives, attrs)) return Node_if_directive(...arguments);
    else return createVNode(type, children || null, attrs || null, self);
  }
  function Node_if_directive(self, options, el){
    const { type, attrs, children } = options;
    let GIC=new _$Directive_$Conditional$_Renderer();
    if(attrs && hasOwn(attrs, 'px:if')) return GIC.Panel_If_Block(self, attrs, VNodeManager, [self, {type, attrs, children}, el], el);
    else if(attrs && hasOwn(attrs, 'px:else-if')) return GIC.Panel_elseif_Block(self, attrs, VNodeManager, [self, {type, attrs, children}, el], el);
    else if(attrs && hasOwn(attrs, 'px:else')) return GIC.Panel_else_Block(self, attrs, VNodeManager, [self, {type, attrs, children}, el], el);
  }
  function VNodeManager(self, options, el){
    const { type, attrs, children }=options;
    if(!type)return;
    if(attrs && hasIFWithFor(attrs) ) {
      $Debug(`((Warning))\n\n Avoid using a conditional rendering diretive with a "px:for" on the same element\n\n"px:if/ px:else-if/ px-else" should not be present with "px:for" directive`);
    }
    let node= Node_$for$if$_Compiler(self, options, el);
    if(IS_DOCUMENT_FRAGMENT_NODE(node) && bool(node.is_forLoop_Wrapper)){
    }
    if(IS_DOCUMENT_FRAGMENT_NODE(node) && bool(node.is_forLoop_Wrapper)){
      for(let el of node.NodeList.values()){
        El_Mounted_Directive_Hook(self, el)
      }
    }else El_Mounted_Directive_Hook(self, node)
    return node
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
  class _$Directive_$Conditional$_Renderer{
    constructor(){};
    Panel_If_Block(self, attrs, _$Compile_Hydrator, args, el, ctx){
      let data;
      let node;
      if(ctx) define(el, 'ctx', {value:ctx, enumerable:true, configurable:true});
      try{
        data=__Evaluate_THIS(self.state, attrs['px:if'], el)
      }catch(err){
        $Debug(err)
      }
      if(data) {
        // delete attrs['px:if']
        node = _$Compile_Hydrator(...args, ctx);
        if(IS_DOCUMENT_FRAGMENT_NODE(node) && !hasOwn(node, 'IS_PIXEL_MOUNTROOT')){
            const thisNode=node.NodeList.pop();
            define(thisNode, 'if_data', {value:true, enumerable:true});
            define(thisNode, 'chain', {value:false, enumerable:true});
            node.NodeList.push(thisNode)
          }else {
            define(node, 'if_data',{value:true, enumerable:true, configurable:true});
            define(node, 'chain',{value:false, enumerable:true, configurable:true});
          }
        return node;
      }else {
        if(el) el.NodeList.push({if_data:false, chain:true});
        return null;
      }
    } 
    Panel_elseif_Block(self, attrs, _$Compile_Hydrator, args, el, ctx){
      let data;
      let node;
      try{
        data=__Evaluate_THIS(self.state, attrs['px:else-if'])
      }catch(err){
        $Debug(err)
      }
      const tagName=args[3] ? args[3].type : args[1].type;
      const previous=el ? el.NodeList.at(-1) : {};
      if(!hasOwn(previous, 'if_data') && !hasOwn(previous, 'else-if_data')){
        $Debug(`"px:else-if" conditional rendering directive block has no preceding "if" or "else-if" directive\n\n may return unexpected result\ndid you mean "px:if" directive instead?\n\n at>>>>>>>>"${tagName} tag`);
        delete attrs['px:else-if'];
        return _$Compile_Hydrator(...args, ctx);
      }
      if(!bool(previous['if_data']) && !bool(previous['else-if_data'])){
        if(data) {
          // delete attrs['px:else-if'];
          node = _$Compile_Hydrator(...args, ctx);
          if(IS_DOCUMENT_FRAGMENT_NODE(node) && !hasOwn(node, 'IS_PIXEL_MOUNTROOT')){
            const thisNode=node.NodeList.pop();
            define(thisNode, 'else-if_data', {value:true});
            define(thisNode, 'chain', {value:false});
            node.NodeList.push(thisNode)
          }else {
            define(node, 'else-if_data',{value:true});
            define(node, 'chain',{value:false});
          }
          return node;
        }else return null;
      }else if(previous){
        if( bool(previous['if_data']) || bool(previous['else-if_data'])) {
          if(el) el.NodeList.push({'else-if_data':false, chain:previous.chain ? true : false});
          return null;
        }
      }
    }
    Panel_else_Block(self, attrs, _$Compile_Hydrator, args, el, ctx){
      const previous=el ? el.NodeList.at(-1) : {};
      let node; 
      const tagName=!isNull(args[3]) ? args[3].type : args[1].type
      if(!hasOwn(previous, 'if_data') && !hasOwn(previous, 'else-if_data')){
        $Debug(`"px:else" conditional rendering directive block has no preceding "if" or "else-if" directive\n\n may return unexpected result\ndid you mean "px:if" directive instead?\n\nat>>>>>>>>>${tagName} tag`);
        delete attrs['px:else'];
        return _$Compile_Hydrator(...args, ctx)
      }
      if(!bool(previous['if_data']) && !bool(previous['else-if_data']) && bool(previous.chain)){
        delete attrs['px:else'];
        node = _$Compile_Hydrator(...args, ctx);
        define(node, 'else_data',{value:true});
        return node;
      }else if(bool(previous['if_data']) || bool(previous['else-if_data'])){
        if(hasOwn(previous, 'if_data') && bool(previous['if_data'])) return null;
        else if(hasOwn(previous, 'else-if_data') && bool(previous['else-if_data'])) return null;
      }
    }
  }
  function Dehydrate_Node_CTX(self, opts, _$Compile_Hydrator, args, attrs, wrapper, ctx ){
    if(has_Intersect_Prop(cond_Directives, attrs)){
      const { type, attrs, children } = opts;
      let GIC=new _$Directive_$Conditional$_Renderer();
      if(attrs && hasOwn(attrs, 'px:if')) return GIC.Panel_If_Block(self, attrs, _$Compile_Hydrator, args, wrapper, ctx);
      else if(attrs && hasOwn(attrs, 'px:else-if')) return GIC.Panel_elseif_Block(self, attrs, _$Compile_Hydrator, args, wrapper, ctx);
      else if(attrs && hasOwn(attrs, 'px:else')) return GIC.Panel_else_Block(self, attrs, _$Compile_Hydrator, args, wrapper, ctx);
    }else return _$Compile_Hydrator(...args, ctx);
  }
  function Dehydrate_Widget_CTX(self, val, element, ctx){
    const GIC=new _$Directive_$Conditional$_Renderer();
    if(has_Intersect_Prop(cond_Directives, val.attrs)){
      if(val.attrs && hasOwn(val.attrs, 'px:if')) return GIC.Panel_If_Block(self, val.attrs, ResolveWidget, [self, element, 'widgets', val], element, ctx);
      else if(val.attrs && hasOwn(val.attrs, 'px:else-if')) return GIC.Panel_elseif_Block(self, val.attrs, ResolveWidget, [self, element, 'widgets', val], element, ctx);
      else if(val.attrs && hasOwn(val.attrs, 'px:else')) return GIC.Panel_else_Block(self, val.attrs, ResolveWidget, [self, element, 'widgets', val], element, ctx);
   }else return ResolveWidget(...[self, element, 'widgets', val], ctx);
  }
  function _$Directive_$For_Loop$_Renderer(self, attrs, _$Compile_Hydrator, args, build=null, opts, nodeParent){
    let wrapper;
    const For_Data=For_Loop(self, attrs['px:for']);
    const { obj, keyName, valRef, loopType, ref }=For_Data;
      //delete attrs['px:for']
    if(isEQ(loopType, 'in') && valRef && !isNum(obj) && isObject(obj)){
      $Debug(`((Warning))\n\nWe do not recommend the use of key value paires in 'for...in' loops, \n\nsince the value of the value reference will remain "undefined"`);
      $Debug(`Many JavaScript style guides and linters recommend against the use of 'for...in', because it iterates over the entire prototype chain which is rarely what one wants, and may be a confusion with the more widely-used "for...of" loop\n\nIt's included in Pixel's support for completeness.`);
      }
    
      wrapper=createFragment()
      define(wrapper, 'is_forLoop_Wrapper',{value:true, enumerable:true});
      if(isNum(obj)){
        for(let i=0 ; i < obj ; i++){
          let ctx= { [valRef]:i+1, [keyName]:valRef ? i : i+1, ref};
          if(nodeParent && nodeParent.ctx) {
            assign(nodeParent.ctx, ctx);
            ctx=nodeParent.ctx; 
          }
          const loopNode=isNull(opts) ? Dehydrate_Node_CTX(self, build, _$Compile_Hydrator, args, attrs, wrapper, ctx) : Dehydrate_Widget_CTX(self,args[3], wrapper, ctx ) ;
          if(loopNode) {
            wrapper.append(loopNode);
            wrapper.NodeList.push(loopNode);
          }
        }
      }else if(isEQ(loopType,'of')){
        for(const [ky, vl] of  entries(obj)){
          let ctx = {[keyName]: valRef ? ky : vl, [valRef]:vl, ref};
          if(nodeParent && nodeParent.ctx) {
            assign(nodeParent.ctx, ctx);
            ctx=nodeParent.ctx; 
          }
          const loopNode=isNull(opts) ? Dehydrate_Node_CTX(self, build, _$Compile_Hydrator, args, attrs, wrapper, ctx) : Dehydrate_Widget_CTX(self,args[3], wrapper, ctx ) ;
          if(loopNode) {
            wrapper.append(loopNode);
            wrapper.NodeList.push(loopNode);
          }
        }
      }else if(isEQ(loopType, 'in')){
        for(const [ky, vl] in  entries(obj)){
          let ctx = {[keyName]:ky, [valRef]:vl, ref} ;
          if(nodeParent && nodeParent.ctx) {
            assign(nodeParent.ctx, ctx);
            ctx=nodeParent.ctx ;
          }
          const loopNode=isNull(opts) ? Dehydrate_Node_CTX(self, build, _$Compile_Hydrator, args, attrs, wrapper, ctx) : Dehydrate_Widget_CTX(self,args[3], wrapper, ctx ) ;
          if(loopNode) {
            wrapper.append(loopNode);
            wrapper.NodeList.push(loopNode);
          }
        }
      }
      if(build && IsValidElement(build)) {
        for( const widget of wrapper.NodeList.values() ){
          build.NodeList.push(widget)
        }
        build.append(wrapper)
        return build;
      }
      return wrapper;
  }
  function H(type, attrs=null, children=null){
    const argsCount=arguments.length;
    if(!type){ $Debug('error loading vnode type\n\ntype for H Vnode  function is not defined'); return; }else if(isGT(argsCount,3)){$Debug(`H Vnode function cannot accept more than 3 arguments, \n\n "${ argsCount }" received`);return;}
    if(isPObject(type) || isFunction(type)){
      if(bool(type.is_Custom_Node)){
        return new type.element;
      }
      type=isFunction(type) ? type : Object.create(type);
      define(type, 'isWidget',{value:true, enumerable:true});
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
          type=bool(nodeMake.is_Custom_Node) ? nodeMake : type
        }catch(err){
          throw new Error(err)
          $Debug(`invalid element tagname\n\n"${type}" is not a valid html tag name`); return;
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
      else $Debug(`invalid value pased to HyperScript function, \n ...\nat...>>>>>\n\n"${attrs}" <<and>>> "${children}"`);return;
    }
  }
  class Widget {
    constructor(){}
    static isClassBasedWidget=true;
  }
  class Build extends Widget{
    constructor(self){ super();
    }
    static BUILT_IN_WIDGET=true;
    params={ self:{ type:[Object, Function, String], required:true}}
    build({self}){ 
      return H(this.$params.self, this.$attrs);}
  }
  class Fragment extends Widget{
    constructor(){ super(); }
    static BUILT_IN_WIDGET=true;
    build(){ return [H('slot')];}
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
      return H('section', { class:'slide'},[H('slot')])
    }
    styleSheet=`
    .slide{
      background-color:#0a3039;
      transition-property:all;
      transition-duration:3s;
    }
    `
  }
  const BUILT_IN_WIDGETS={ 'px:fragment':Fragment,'px:build':Build, 'px:transition':Transition}
  const modelManager=function(opts,self){
    if(!isNull(opts.model)){
      if(!isFunction(opts.model)){
        $Debug(`widget model option must be a function,\n\n and .....>>>>>\n`);return;
      }else{
        const modelReturnObj=opts.model.call(self.state);
        if(!isPObject(modelReturnObj)){ $Debug(`\nmodel method must return an object`);return;}
        entries(modelReturnObj).forEach(([key, value])=>{
          if(isPObject(value) && bool(value._data_flag) && hasOwn(value, 'data')) value=__Proxy_Setup(self, value, isObject(value.data) ? true : false);
          define(self.state, key, {value, enumerable: true, writable: true, configurable:true});
        });
      
      }
    }
  }
  const widgetsSetup=function(opts, self){
    if(!isNull(opts.widgets)){
      if(!isPObject(opts.widgets)){
        $Debug(`widget option must be an object,\n \n invalid value  "${getType(opts.widgets)}" found`);
        return;
      }else{
        entries(opts.widgets).forEach(([key, widget])=>{
          if(!hasUpperCase(key.at(0)) && !key.includes('-') && !key.includes('_') && hasDigit(key.at(0)) && !hasDigit(key)){
            $Debug(`Widget registration failed, improper widget namecasing found at "${key}"\n\nwidget names must atleast start with an uppercase letter or a multi-word string seperated by a hyphen or an underscore`);return;
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
        $Debug(`validation type for "${ind}" is not a valid javascript data type \n\nat at\n unable to resolve "${val}" `);
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
          $Debug(`widget method option's values must be a method or a function\n\n type of "${getType(method)}" found`);return;
        }
        method=method.bind(self.state);
        define(method, 'pixel_handler',{value:true})
        define(self.state, ind, {value:method})
        define(self.handlers, ind, {value:method})
      });
    }else if(!isNull(opts.handlers) && !isPObject(opts.handlers)){
      $Debug(`widget handlers option must be an "object"\n\n........>>>> invalid "typeof ${getType(opts.handlers)}"   found`);return;
    }
  }
  const paramsManager=function(opts, self){
    let param;
    const params=opts.params || opts.props || undefined;
    const attrs=opts.attributes || opts.attrs || undefined;
    if(opts.isFunctionalWidget){
      if(attrs && isPObject(attrs) && !params){
        define(self.state, '$attrs',{value:{}})
        entries(attrs).forEach(([ind, attr])=>{
          self.state.$attrs[ind]=attr;
        });
      }
    }
    let paramsSet;
    if(params && isPObject(params) || isArray(params)){
      if(self.is_Custom_Node){
        define(self, '$params',{value:{}, configurable:true, enumerable:true})
        paramsSet=self.$params;
      }else{
        define(self.state, '$params',{value:{}, enumerable:true, configurable:true})
        define(self.state, '$attrs',{value:{}, enumerable:true, configurable:true})
        paramsSet=self.state.$params;
      }
      entries(params).forEach(([ind, param])=>{
        if(isPixelDirective(ind)){
          $Debug(`Params "${ind}" pased to widget is a pixel directive,\n\nMay not be used as a params identifier`);return;
        }else if(self.directives && hasOwn(self.directives, ind)) return;
        if(isFunction(param)){
          if(!_mapValue(attrs || {}, ind)){
            define(paramsSet,ind,{value:'', enumerable:true, configurable:true});return;}
        }else if(isArray(params) && isString(param)){
          define(paramsSet, param, {value: '',enumerable:true, configurable: true});return;}
        if(isPObject(param) && param.required && isNull(param.default)){
          if(!_mapValue(attrs || {}, ind)){
            $Debug(`validation error........\n\nrequired property is empty\n\nat at\n  .....${ind}`);
            define(paramsSet,ind,{value:'', enumerable:true, configurable:true });
            return;}
        }else if(isPObject(param) && !isNull(param.default) && !param.required){
          const defaultValue=isFunction(param.default) ? param.default() : param.default;
          if(!_mapValue(attrs || {}, ind)){
            if(isFunction(param.type) && !isEQ(getType(param.type()), getType(defaultValue))){
              $Debug(`validation error .....\n\n
              property validation for widget default value failed, property "${ind}" is of an invalid type\n\n typeof "${getType(param.type())}" expected`);
              return;
            }else if(isArray(param.type)){
              let truthy=false;
              for (const [key, val] of param.type.entries()){
                if(isEQ(getType(val()), defaultValue)){
                  truthy=true;
                  define(paramsSet, ind, {value: defaultValue, enumerable:true, configurable:true});
                }
              }
              if(!truthy){
                $Debug(`validation error  .......\n\nproperty validation for widget failed, property "${ind}" is of an invalid type\n\n matches no type in the validation list`);
                define(paramsSet,ind,{value:'', enumerable:true, configurable:true});return; 
              }
            }else{
              define(paramsSet,ind,{value:defaultValue , enumerable:true, configurable:true});
            }
          }
        }else if(isPObject(param) && !isNull(param.default) && bool(true)){
          $Debug(`validation error  .......\n\nthe required validator should not be truthy alongside a default value\nat at\n\n"${ind}`);
          return;
        }
      })
      entries(attrs || {}).forEach(([ind, attr])=>{
        if(isPObject(params) && _mapValue(params || {}, ind)){
          param=params[ind];
          if(isFunction(param)){
            if( !isEQ(getType(param()), getType(attr))){
              $Debug(`validation error  .......\n\nproperty validation for widget failed, property "${ind}" is of an invalid type\n\n typeof "${getType(param())}" expected`);
              define(paramsSet,ind,{value:'', enumerable:true, configurable:true});
              return; 
            }else{
              define(paramsSet,ind,{value:attr, enumerable:true, configurable:true});
            }
          }else if(isArray(param)){
            let truthy=false;
            for (const [key, val] of param.entries()){
              if( isEQ(getType(val()), getType(attr))){
                truthy=true;
                define(paramsSet, ind, {value: attr, enumerable:true, configurable:true, writable:true}); return;
                break;
              }
            }
            if(!bool(truthy)){
                $Debug(`validation error  .......\n\nproperty validation for widget failed, property "${ind}" is of an invalid type\n\n matches no type in the validation list`);
                define(paramsSet,ind,{value:'', enumerable:true, configurable:true});return; 
            }
          }else if(isPObject(param)){
            if(!param.type){
              $Debug(`validation error  ......\n\nno type definition found at param validation for widget \n\nat\n"${ind}"`);
              define(paramsSet,ind,{value:'', enumerable:true, configurable:true});return;
            }
            if(isFunction(param.type)){
              if(!isEQ(getType(param.type()), getType(attr))){
                $Debug(`property validation for widget failed, property "${ind}" is of an invalid type\n\n typeof "${getType(param.type())}" expected`);
                define(paramsSet,ind,{value:'', enumerable:true, configurable:true});return ;
              }else{
                define(paramsSet,ind,{value:attr, enumerable:true, configurable:true});
              }
            }else if(isArray(param.type)){
              let truthy=false;
              for (const [key, val] of param.type.entries()){
                if(isEQ(getType(val()), getType(attr)) ){
                  truthy=true;
                  define(paramsSet, ind, {value: attr, enumerable:true, configurable:true, writable:true});
                  break;
                }
              }
              if(!truthy){
                $Debug(`validation error  .......\n\nproperty validation for widget failed, property "${ind}" is of an invalid type\n\n matches no type in the validation list`);
                define(paramsSet,ind,{value:'', enumerable:true, configurable:true});return; 
              }
            }
          }
        }else if(isArray(params) && params.includes(ind)){
          entries(params).forEach(([key, val])=>{
            if(isEQ(val, ind)){
              define(paramsSet, val,{value: attr, enumerable:true, configurable:true, writable:true})
            }
          })
          
        }else if(!_mapValue(params, ind)){
          define(self.state.$attrs, ind,{value:attr, enumerable: true, configurable:true}); 
        }
      });
      if(params){
        for(const [key, par] of entries(params)){
          if(par.validator){
            if(!isFunction(par.validator)){
            $Debug(`Error resolving Validation \n\n at at\n${key} params, must be a method`);return;}
            let value=paramsSet[key];
            const result=par.validator(value);
            if(!bool(result)){$Debug(`Validation Error\n\nCustom validation for "param" ${key} failed`);return}
          }
        }
      }
    }else if(params && !isPObject(params) && !isArray(params)){
      $Debug(`params value for widget is of an invalid pattern,  must be an object or an árray\n typeof "${getType(params)}" found`);return;
    }
  }
  const setupBeforeBuildHook=function(opts, self){
    if(!isNull(opts.beforeBuild)){
      if(!isFunction(opts.beforeBuild)){
        $Debug(`"beforeBuild Callback" hook must be a function \n\n type of "${getType(opts.beforeBuild)}" found`);return;
      }
      self.beforeBuild=opts.beforeBuild.bind(opts.attributes || {});
      self.beforeBuild();
    }
  }
  const setupOnBuiltHook=function(opts, self, wheel){
    if(isGT(wheel, 1))return;
    if(!isNull(opts.onBuilt)){
      if(!isFunction(opts.onBuilt)){
        $Debug(`"onBuilt Callback" hook must be a function \n\n type of "${getType(opts.onBuilt)}" found`);return;
      }
      self.onBuilt=opts.onBuilt.bind(self.state);
    }
  }
  const setupMountedHook=function(opts, self, wheel ){
    if(isGT(wheel, 1))return;
    if(!isNull(opts.onMounted)){
      if(!isFunction(opts.onMounted)){
        $Debug(`LifeCycle Error::\n\n"onMounted callback" hook must be a function \n\n type of "${getType(opts.onMounted)}" found`);return;
      }
      self.onMounted=opts.onMounted.bind(self.state);
    }else self.onMounted=do_Nothing;
  }
  const setupOnUpdatedHook=function(opts, self, wheel){
    if(isLTE(wheel, 1))return;
    if(!isNull(opts.onUpdated)){
      if(!isFunction(opts.onUpdated)){
        $Debug(`"onUpdated Callback" hook must be a function \n\n type of "${getType(opts.onUpdated)}" found`);return;
      }
      self.onUpdated=opts.onUpdated.bind(self.state);
    }else self.onUpdated=do_Nothing;
  }
  
  const compileStyleClasses=function(opts, self){
    if(!isNull(opts.styleClass && isPObject(opts.styleClass))){
      self.state.$styles={};
      entries(opts.styleClass).forEach(([ind, style])=>{
        if(!isNull(style) && !isPObject(style)){
          $Debug(`property value of style is of an invalid type, an object required....>>\n\n.....typeof ${getType(style)} fount`); return;
        }
        self.state.$styles[ind]=style;
      })
    }else if(!isNull(opts.styleClass && !isPObject(opts.styleClass))){
      $Debug(`invalid option.......\n\n styleClass option must be an object, typeof "${getType(styleClass)}" found`);return;
    }
  }
  const validateWidgetOptions=function(opts, self){
    const exist=[];
    entries(opts).forEach(([ind, val])=>{
      if(!exist.includes(ind))exist.push(ind);
      else{ $Debug(`widget options error\n\n....duplicate property "${ind} found on widget`);return;}
    });
  }
  const hydration_Compile=function(opts, self, el){
    if(el && !el.Pixel_NodeMake && IsValidElement(el) && !el.isPixel_Fragment){
      let inheritStyles=true;
      let inheritAttrs=true;
      if(!isNull(self.state.config)){
        if (!isNull(self.state.config.inheritStyles) && isBool(self.state.config.inheritStyles)) inheritStyles=isBool(bool(self.state.config.inheritStyles)) ? bool(self.state.config.inheritStyles) : inheritStyles;
        if (!isNull(self.state.config.inheritAttrs) && isBool(self.state.config.inheritAttrs)) inheritAttrs=isBool(bool(self.state.config.inheritAttrs)) ? bool(self.state.config.inheritAttrs) : inheritAttrs;
      }
      if(bool(inheritStyles) && isPObject(self.state.$styles)){
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
      if(bool(inheritAttrs) && isPObject(self.state.$attrs)){
        let attributes=self.state.$attrs;
        AttributeManager( attributes, el, self);
      }
    }
  }
  const setupClassBasedWidget=function(options, self){
    const opts=new options();
    const widget=new Object();
    if(options.attributes) widget.attributes=options.attributes;
    if(options.children) widget.children=options.children;
    
    const waitForReturnObjects=['params','handlers','styleClass','widgets','buildConfig','observers','directives'];
    entries(validWidgetOptions).forEach(([key, val])=>{
      if(!isNull(opts[val])){
        let value=opts[val];
        if(_mapValue(waitForReturnObjects, val) && isFunction(value))value=opts[val]();
        widget[val]=value;
      }
    })
    entries(opts).forEach(([key, val])=>{
      if(!_mapValue(validWidgetOptions, key ) && !_mapValue(['params','ctx'], key)) self.state[key]=val;
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
         define(opts, 'isClassBasedWidget',{value:isClassBasedWidget});
      }else{
        isFunctionalWidget=true;
        opts=setupFunctionWidget(opts, self);
        define(opts,'isFunctionalWidget',{value:isFunctionalWidget});
       }
     }
     return opts;
  }
  const sanitizedOptions=function(args, self){
    const argcount=args.length;
    if(!args){ $Debug('error loading widget\n\ntype for Vnode  function is not defined'); return; }else if(isGT(argcount,3)){$Debug(`__Pixel_Build function cannot accept more than 3 arguments,  "${ argcount }" received`);return;}
    let widget=H(args[0], args[1], args[2]);
    widget=  set_Widget_Flag(self, widget, widget, 'children');
    return widget;}
  const appendClassToSelector = function(selector, className){
    const trimmed = selector.trim();
    let modified=trimmed;
    const _Manage_Hash_Class=function(sel, sep){
      const splited=sel.split(sep);
      let fir=splited.shift();
      fir=`${fir}.${className}${sep}`;
      splited.unshift(fir);
      return splited.join('');
    }
    const $make_Tape=function(sep){
      const split=trimmed.split(sep);
      for (let [key, sel] of entries(split)){
        sel=sel.trim();
        sel=appendClassToSelector(sel, className)
        split[key]=sel;
      }
      return split.join(` ${sep} `)
    }
    if(trimmed.startsWith('@g ')) return trimmed.slice(2);
    if(trimmed.includes(',')) return $make_Tape(',');
    if(trimmed.includes('+')) return _Manage_Hash_Class(trimmed, '+')
    if(trimmed.includes('~')) return _Manage_Hash_Class(trimmed, '~')
    if(trimmed.includes('>')) return _Manage_Hash_Class(trimmed, '>')
    if(!trimmed.startsWith('@') && !trimmed.startsWith('body') && !trimmed.includes(':')  ) return trimmed ? `${trimmed}.${className}` : trimmed;
    else if(trimmed.includes('::')) return _Manage_Hash_Class(trimmed, '::');
    else if(trimmed.includes(':') && !trimmed.startsWith('@') && !trimmed.startsWith(':')) return _Manage_Hash_Class(trimmed, ':')
    return modified;
  };
  const css_Stylesheet_Compilation=function(opts, self, el){
    if(self ? opts.styleSheet : opts.styles){
      let CssStylesheet=self ? opts.styleSheet : opts.styles;
      if(!isString(CssStylesheet) && !isFunction(CssStylesheet)){
        $Debug(`Invalid Value Type...\n\nstyleSheet must be in string value format`);return;
      }///attempt to add css rules to thw build shadow root
      
      if(isFunction(CssStylesheet)) {
        
      }
      const styleEl=createVNode('style', { type:'text/css'}, null);
      const id=Math.floor(Math.random()*(100000000 * 9999999999999) + 10000000);
      const selectorPattern = /([^\r\n{]+)\s*{/g;
      const ModifiedCssStylesheet=CssStylesheet.replace(selectorPattern, (match, text)=>{
          text=appendClassToSelector(text, self._px_hash_);
          return text+'{';
        });
        // log(ModifiedCssStylesheet)
      styleEl.textContent=ModifiedCssStylesheet;
      if(el) el.append(styleEl);
    }
    return el;
  }
  const appendOrCreate=(self, value, name)=>{
    if( self.state.$slots && hasOwn(self.state.$slots, name)) {
      const fragment=createFragment();
      fragment.append(self.state.$slots[name])
      fragment.append(value)
      define(self.state.$slots, name, {value: fragment, configurable: true, enumerable: true});
    }else define(self.state.$slots, name, {value, configurable: true, enumerable: true});
  }
  const __$slot_Hydrate_Renderer=function(self, opts, el){
    const childrenArr=opts.children ? opts.children.children : [];
    if(childrenArr && isGT(childrenArr.length,0)){
      const patchFlags=opts.children.patchFlags || {}
      let children=[]
      let fallData=self.state.config.fallThrough || {};
      define(patchFlags.state, '$fall', {value:{}, configurable:true})
      for(const [key, value] of entries(fallData)){
        define(patchFlags.state.$fall, key, { value, enumerable:true, configurable:true})
      } 
      const ctx=opts.children.ctx;
      if(ctx) patchFlags.state.ctx=ctx;
      entries(childrenArr).forEach(([key, child])=>{
        let value=compileTemplate(child, patchFlags, null, true);
        children.push(value);
      })
      if(hasOwn(patchFlags.state, 'ctx') ) delete patchFlags.state.ctx;
      if(hasOwn(patchFlags.state, '$fall') ) delete patchFlags.state.$fall
      define(self.state,'$slots',{value:{}, configurable:true});
      entries(children).forEach(([ind, value])=>{
        ensure_Slot_Mapping(self, value)
      })
      const _enumerate_Slots=function(cont){
        let slotContent=''
        if(IS_ELEMENT_NODE(cont) && isEQ(cont.localName, 'template') && isGT(cont.NodeList.length,1)){
          slotContent=createFragment();
          entries(cont.NodeList).forEach(([ind, myel])=>{
            slotContent.append(myel);
          });
        }else return cont
        return slotContent;
      }
      const slots=el ? el.querySelectorAll('slot') : [];
      entries(slots || []).forEach(([ind, slotEl])=>{
        const name=slotEl.getAttribute('name');//get slot element name
        if(name && isString(name)){//checks if name is a string
          if(self.state.$slots && _mapValue(self.state.$slots, name)){
            const slotContent=_enumerate_Slots(self.state.$slots[name]);//configure slot and return its value
            slotEl.replaceWith(slotContent);//replace slotEl with matching slotContent
          }
        }else if(!name){
          if(self.state.$slots && _mapValue(self.state.$slots, 'default')){
            const slotContent=_enumerate_Slots(self.state.$slots['default']);
            slotEl.replaceWith(slotContent);//replace default slots placeholdres when there is a specified slot Content
          }
        }
      });
      if(isEQ(slots.length, 0) && !el.isPixel_Fragment && !el.innerHTML && IsValidElement(el)){
        let inheritSlots=true;
        if(opts.buildConfig && !isNull(opts.buildConfig.inheritSlots) && isBool(opts.buildConfig.inheritSlots)){
          if(!isBool(opts.buildConfig.inheritSlots)){
            $Debug(`Value Error\n\n "inheritSlots" value cannot be compiled\n boolean value format required`);return;
          }
          inheritSlots=opts.buildConfig.inheritSlots;
        }
        if(!bool(inheritSlots))return;
        let slotContent=_enumerate_Slots(self.state.$slots['default']);
        el.append(slotContent);
      }
    }
  }
  function ensure_Slot_Mapping(self, node){
    if(IS_ELEMENT_NODE(node)){
      const name=node.getAttribute('slot');
      appendOrCreate(self, node, name||'default');
    }else if(IS_TEXT_NODE(node)){
      appendOrCreate(self, node, 'default');
    }else if(IS_DOCUMENT_FRAGMENT_NODE(node) && bool(node.IS_PIXEL_MOUNTROOT)){
      const name=node.slot;
      appendOrCreate(self, node, name||'default');
    }else if(IS_DOCUMENT_FRAGMENT_NODE(node) && bool(node.is_forLoop_Wrapper)){
      for(let [key, el] of entries(node.NodeList)){
        ensure_Slot_Mapping(self, el);
      }
    }
  }
  function Hydrate_Custom_Directive(self, options){
    if(options.directives){
      if(!isPObject(options.directives))return
      define(self, 'directives', {value:{}});
      for(let [key, value] of entries(options.directives)){
        if(!isPObject(value) && !isFunction(value)){
          $Debug(`a directive requires an object or a function`); return;
        }
        if(!key.startsWith(':')) key=`:${key}`
        define(self.directives, key, {value, enumerable:true, configurable:true});
      }
    }
  }
  const setConfig=function(opts, self){
    if(opts.buildConfig && isPObject(opts.buildConfig)){
      if(opts.buildConfig.fallThrough){
        if(!isPObject(opts.buildConfig.fallThrough)){
          $Debug(`Fallthrough data, unresolved type, \nmust be an object or an array data type`);return;
        }
        entries(opts.buildConfig.fallThrough).forEach(([key, value])=>{
          try{ value=parseScript(value) ;
          }catch(err){ value=__Evaluate_THIS(self.state, value);}
          opts.buildConfig.fallThrough[key]=value
        })
      }
      entries(opts.buildConfig).forEach(([key, setting])=>{
        define(self.state.config, key , {value:setting, configurable:true, enumerable:true, writable:true});
      })
    }else if(opts.buildConfig && !isPObject(opts.buildConfig)){
      $Debug(`Value Error\n\nbuild Configuration settings object must be an object type format or is undefined`);
      return;
    }
  }
  const globalProps=['properties','widgets','directives','handlers']
  function MapGlobal(self, options){
    const exceptions=['children','attributes','isWidget','isClassBasedWidget','isFunctionalWidget'];
    const $options={};
    let hasOpts=false
    entries(options).forEach(([key, opts])=>{
      if(!_mapValue(exceptions, key) && !isValidWidgetOption(key)){
        $options[key]=opts;
        hasOpts=true;
      }
    })
    if(hasOpts) define(self.state,'$options',{value: $options});
    define(self.state,'config',{value:{}});
    define(self.state.config,'$global',{value:{}});
    for(let prop of globalProps.values()){
      define(self.state.config.$global, prop,{value:{}, enumerable: true});
    }
  }
  const Observer_Track=function(self, opts){
    if(opts.observers && !isPObject(opts.observers)){
      $Debug(`Data error\n\nobserver option must be an object`);return;
    }
    define(self.state, 'observers',{value: {}})//define the observers object
    entries(opts.observers||{}).forEach(([name, method])=>{
      if(!isFunction(method)){
        $Debug(`an observer handler must be a function value`);return;
      }else if(name.includes('.')){
        $Debug(`Observer issue::\n\n unsupported dot accessor\n\n, found at "${name}" observer handler`);return;
      }else if(!hasOwn(self.state, name) && !hasOwn(self.state.$data, name) ){
        $Debug(`observer undefined reference\n\n no such data as "${name}" define on this widget model instance`);return;
      }
      const path=get_Prop_Path(self.state, name)
       define(self.state.observers, name, {value:method, enumerable:true});
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
    define(self.state, '$base',{value:self.state.config.$global.properties})
    entries(self.state.config.$global.handlers).forEach(([key, value])=>{
      define(self.state.$base, key, {value})
    })
  }
  const Register_$Observer=function(self, opts){
    define(self.state, '$observe', {value:DATA_OBSERVER.bind(self)});
    define(self, '_OBS', {value:{}});
  }
  function DATA_OBSERVER(prop, callback){
    if(!isFunction(prop) && !isString(prop) && !has_Object_Prop(this.state, prop)){
      $Debug(`proplem setting Observer_Track for ${prop}\n\n widget has no such property`);return;
    };
    if(isString(prop) && bool(has_Object_Prop(this.state, prop) || has_Object_Prop(this.state.$data, prop))){
      define(this._OBS, prop,{value:callback});
    }else if(true){
      
    }else{
      $Debug(`undefined property accessed in $observe macro`);
    }
  }
  function __Ensure_Renderer(self, options){
    widgetsSetup(options, self);
    methodsManager(options, self);
    compileStyleClasses(options, self);
    Observer_Track(self, options);
    Register_$Observer(self, options);
    Hydrate_Custom_Directive(self, options);
  }
  function generate_UUID(length) {
    const alpaNum ='AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz0123456789';
    let id = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * alpaNum.length);
      id += alpaNum.charAt(randomIndex);
    }
    return id;
  }
  function __Generate_Widget_Hash(self){
    let id=generate_UUID(7)
    const hash=`_px__${id}`;
    define(self, '_px_hash_', {value:hash, configurable:true});
  }
  function _Data_Hydrations(self, options){
    modelManager(options, self);
    paramsManager(options, self);
    if(self.state.$attrs) define(self.state, '$attrs', {value:__Proxy_Setup(self, self.state.$attrs, true)})
    if(self.state.$params) define(self.state, '$params', {value:__Proxy_Setup(self, self.state.$params, true)});
    if(self.state.$base) define(self.state, '$base', {value:__Proxy_Setup(self, self.state.$base, true)});
    if(self.state.$fall) define(self.state, '$fall', { value: __Proxy_Setup(self, self.state.$fall, true)});
  }
   function __Pixel_Build(options, params=null, children=[]){
    options=sanitizedOptions(arguments, this);//sanitize received options
    setupBeforeBuildHook(options, this);
    define(this, 'state',{value:{}, configurable:true, enumerable:true})
    MapGlobal(this, options);//global properties hydration
    options=BasedWidgets(options, this);
    _Data_Hydrations(this, options)
    setConfig(options, this); 
    define(this,'state',{value:__Proxy_Setup(this, this.state)});
    __Ensure_Renderer(this, options);
    this.render=function(self, build, update=false){
      Consume_Global_State(this);
      __Generate_Widget_Hash(this)
      let node=compileTemplate(build || '', self, null, true) ;
      node=css_Stylesheet_Compilation(options, self, node);
      __$slot_Hydrate_Renderer(self, options, node);
      hydration_Compile(options, self, node);//setting the buildConfig option
      setupOnBuiltHook(options, self);
      setupMountedHook(options, self);
      return node;
    }
    if(isNull(options.build) && isNull(options.template))options.build=null;
    define(this, 'build', {value:options.build || options.template , writable:true, enumerable:true});
    
    resolve_Proto_Call(this, options);
  }
  const get_Init_Build=function(self, selector, build){
    const $ref=(ref)=> `__$ref( ${ref} )__`;
    if(isFunction(self.build)){
      self.build=self.build.bind(self.state);
      return self.build(self.state.$params||{},{events:self.state.$events || {},attrs:self.state.$attrs || {}, styles:self.state.$styles || {}, slots:self.state.$slots || {}},$ref.bind(self.state));
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
        self.build=Render_Template(self, get_Init_Build(self, null));
      }
      define(self.state, '$el', {value:self.build})
      delete self.protoPromisesCalls;
      //delete self.render;
      //delete self.widgets;
      delete self.hasMountProto;
      if(!opts.beforeMount) delete self.beforeMount;
      if(!opts.onMounted) delete self.onMounted;
      return self;
    })
    return self;
  }
  const GenerateRoot=(nodeSelector)=>{
    if(isNull(nodeSelector)){$Debug(`no node model or selector value passed to widget mountroot`); return;}
    let domRoot;
    if(isString(nodeSelector)){
      domRoot=document.querySelector(nodeSelector);
      if(!IsValidElement(domRoot)){
        $Debug(`error mounting widget, target not a valid element`);
        return;}
    }else if(IsValidElement(nodeSelector)){
      domRoot=nodeSelector;
    }
    return domRoot
  }
  __Pixel_Build.prototype.mount=mount;
  function mount(nodeSelector){
    this.hasMountProto=true;
    const domRoot=GenerateRoot(nodeSelector);
    if(!bool(domRoot.isPixel_Fragment)) define(domRoot, 'NodeList',{value:[], configurable:true, writable:true});
    if(!domRoot.PATCH_FLAGS) define(domRoot, 'PATCH_FLAGS',{value:new Set(), configurable:true, writable:true});
    const initalBuild=get_Init_Build(this, nodeSelector);
    
    _Proxy_Reactive_Dependency(this.state, (newV, oldV, ref)=>{
      const build=Render_Template(this, initalBuild);
      Eject_Hydration_Flag(this, build, domRoot, ref);
      //_Slot_Update_Run(this, build, ref);
    }, this, true)
    // Hydrate_Reactive_Data(this, initalBuild, nodeSelector, domRoot);
    this.build=Render_Template(this, initalBuild);
    if(this.onBuilt) this.onBuilt()
    domRoot.innerHTML='';
    if(domRoot.IS_PIXEL_MOUNTROOT && IS_ELEMENT_NODE(domRoot)){
      $Debug(`A Pixel widget has already been mounted on this element, cannot mount more than one Wdget on a single root element`);return;
    }else{
      const MoutRootToken={
        IS_PIXEL_MOUNTROOT:true,
        __mountRootToken:'px__'+generate_UUID(5),
        widgets:this.widgets || undefined,
        __params: this.params || undefined,
        __state:this.state || undefined
      }
      domRoot.innerHTML='';
      domRoot.append(this.build || '');
      if(bool(this.build && IS_DOCUMENT_FRAGMENT_NODE(this.build))){
        domRoot.NodeList=this.build.NodeList;
      }else{
        domRoot.NodeList=[this.build];
      }
      define(domRoot, 'px__VNode',{value:this._px_hash_});
      assign(domRoot, MoutRootToken);
      if(domRoot.isPixel_Fragment) define(domRoot, 'trigger_Effect_Run', {value: Widget_Effect_Trigger.bind(this)})
      define(this.state, '$el', {value:this.build, enumerable:true})
      this.onMounted()
      return domRoot;
    }
  }
  __Pixel_Build.prototype.widget=widget;
  function widget(Value, obj){
    if(!isString(Value) || !isPObject(obj) && !isFunction(obj)){$Debug(`unrecognised global widget registration for ${obj} widget`);return this;}
    if(isEQ(arguments.length,2)){
      if(!isNull(this.state.config.$global.widgets)) this.state.config.$global.widgets[Value]=obj;
      else{
        define(this.state.config.$global, 'widgets', {value: {}});
        this.state.config.$global.widgets[Value]=obj;
      }
    }
    this.protoPromisesCalls++;
    return this;
  }
  __Pixel_Build.prototype.install=install;
  function install(plugin, options){
    if(!isNull(plugin) && !isPObject(plugin)){ $Debug(`plugin installation Error::\n\n install argument must be an object value with  an exposed plugin installation method`);return this;}
    let usePlugin=plugin.plugin;
    if(usePlugin && isFunction(usePlugin) ){
      plugin.plugin(this, options);
    }
    entries(this.state.config.$global.properties).forEach(([name, value])=>{
      if(isPObject(value) && isEQ(value._data_flag, true)) define(this.state.$data, name, {value: value.value, configurable: true});
      else define(this.state, name, {value: value, configurable: true});
    })
    entries(this.state.config.$global.handlers).forEach(([name, method])=>{
      if(!isFunction(method)){
        $Debug(`global handler error::\n\n The argument passed to a global handler is not a function\nInvalid dataType`);return this;
      }
      define(this.state, name, {value: method, configurable: false, enumerable: true});
    })
    this.protoPromisesCalls++
    return this;
  }
  __Pixel_Build.prototype.property=property;
  function property(name, value){
    if(!isString(name) ){$Debug(`unrecognised global property registration for ${value} widget`);return this;}
    if(isEQ(arguments.length,2)){
      if(isPObject(value) && bool(value._data_flag) || bool(value._deep_data_flag)){
        if(!isNull(this.state.config.$global.properties.$data)){
          this.state.config.$global.properties.$data[name]=value.value;
        }else{
          define(this.state.config.$global.properties,'$data', {value: {}});
          this.state.config.$global.properties.$data[name]=value.value;
        }
      }else{
        this.state.config.$global.properties[name]=value;
      }
    }
    this.protoPromisesCalls++
    return this;
  }
  __Pixel_Build.prototype.handler=handler;
  function handler(name, func){
    if(!isString(name) && !isFunction(func)){$Debug(`unrecognised global handler registration for ${func}`);return this;}
    if(isEQ(arguments.length,2)){
      if(!isNull(this.state.config.$global.handlers)) this.state.config.$global.handlers[name]=func;
      else{
        define(this.state.config.$global, 'handlers', {value: {}, configurable: true, enumerable: true, writable: true});
        this.state.config.$global.handlers[name]=func;
      }
    }
    this.protoPromisesCalls++
    return this
  }
  __Pixel_Build.prototype.directive=directive;
  function directive(name, method){
    this.protoPromisesCalls++
    return this;
  }
  function Render_Template(self, initBuild, update=false){
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
    const mountWatch=function(watch, dataObj={}){
      for(let key of Object.keys(dataObj) ){//object handler
        watch(()=>dataObj[key],(newV, oldV)=>{
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
    mountWatch(watch, data);
  }
  const readOnlyStateProps=['$el','$params','$attrs','$data','$events','$styles','$slots','config','$base','observers', '$observe'];
  const isReadOnlyProp=key=>_mapValue(readOnlyStateProp, key);
  function _Slot_Update_Run(self, build, ref){
    const slots=self.state.$slots;
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
    const data_ref=get_Prop_Path(this.self.state, access);//get the relative path of the reacted data key "access"'
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
          const data_ref=get_Prop_Path(self.state, access);
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
    if(Is_Form_Element(this.target.localName)) this.target.value=newNode.value;
    if(!this.target.isEqualNode(newNode)) this.target.innerHTML=newNode.innerHTML;
  }
  function Widget_Effect_Trigger(self, el, ind){
    const data_ref=get_Prop_Path(self.state, ind);
    for(const refs of el.PATCH_FLAGS.values()){
      if(isEQ(refs, data_ref)){
        const newValue=get_Object_Value(self.state, refs);
        let Owner_prop=el.Ref_Rag[refs];
        let Owner_path=get_Prop_Path(this.state, Owner_prop);
        set_Object_Value(this.state, Owner_path,  newValue );
      }
    }
  }
  function Eject_Hydration_Flag(self, build, root, ind, selector){
    let data_ref=get_Prop_Path(self.state, ind) ;
    entries(root.NodeList).forEach(([key, el])=>{
      if( isGT(el.PATCH_FLAGS ? el.PATCH_FLAGS.size : 0, 0)){
        let shouldUpdate=false;
        for( const refs of el.PATCH_FLAGS.values()){
          if(isEQ(refs, data_ref) ){
            shouldUpdate=true;
            break;
          }
        }
        if(bool(shouldUpdate)){
          if(IS_DOCUMENT_FRAGMENT_NODE(el)  && el.IS_PIXEL_MOUNTROOT){
            el.trigger_Effect_Run(self, el, ind);
          }else{
            el.trigger_Effect_Run(build, key, root, ind, self);
          }
        }
      }
    })
  }
  function data(value){
      let react={};
      define(react, '_data_flag',{value:true, enumerable:true,configurable:true});
      define(react, 'data',{value, enumerable:true, configurable: true, writable:true});
      return react;
  }
  function children_Setup(val, element, self, state=false){
    let child;
    if(isPrimitive(val)){
      child=createTxtNode(self, val, element);
      element.append(child);
      element.NodeList.push(child);
    }else if(isPObject(val) && IS_VALID_TAGNAME(val.type)){
      child=VNodeManager(self, val, element);
      if(child && IS_DOCUMENT_FRAGMENT_NODE(child) && child.isPixel_Fragment && child.NodeList && element && child.is_forLoop_Wrapper){//
        for (const node of child.NodeList.values()){
          if(bool(node['if_data']) || bool(node['else-if_data']) || bool(node['else_data']) || IsValidElement(node)){
            element.append(node);
          }
          element.NodeList.push(node);
        }
      }else if(child){
        element.append(child);
        element.NodeList.push(child);
      }
      if(child && isGT(child.PATCH_FLAGS.size, 0)) {
        for(let flag of child.PATCH_FLAGS.values()){
          element.PATCH_FLAGS.add(flag);
        }
      }
    }else if(isFunction(val)  || isPObject(val) && val.isWidget){
      child = CompilePatcher( self , val , val )//this sets the widget flags, passed the widget to __Pixel_Build, sets global widgets from  its parents if any, installs all BUILT_IN_WIDGETs and global datas, mounts the wodget to a fragment and return the domRoot'
      element.append(child);
      element.NodeList.push(child);
    }else if(val.Pixel_NodeMake){
      element.append(val);
      if(element.isPixel_Fragment) {
        element.NodeList.push(val);
      }
    }else if(val.type && isPObject(val.type) && bool(val.type.Pixel_NodeMake)){
        element.append(val.type);
        if(element.isPixel_Fragment) {
           element.NodeList.push(val.type);
        }
    }else if(self){
      if(val.attrs && hasIFWithFor(val.attrs) ) {
        $Debug(`((Warning))\n\n Avoid the use a conditional rendering diretive alongside a "px:for" loop  on the same widget\n\n"px:if/ px:else-if/ px-else" statement block must not be present with a "px:for" directive`);
        //delete val.attrs['px:for'];
      }
      return Widget_$For$If$_(self, val, element);
    }else if(isNull(val)){
      $Debug(`undefined reference error\n\n unable to instanciate reference, seems to be having a problem, please recheck your "${element.localName}" element children`);return element;
    }else element=ResolveWidget(element,element,'widgets',val);
    return element;
  } 
  function Widget_$For$If$_(self, val, element){
    if(val.attrs && hasOwn(val.attrs, 'px:for')) return _$Directive_$For_Loop$_Renderer(self, val.attrs, ResolveWidget, [self, element, 'widgets', val], element, val);
    else if(has_Intersect_Prop(cond_Directives, val.attrs)) return Widget_Conditional_Directive_Resolver(self, val, element)
    else return ResolveWidget(self,element,'widgets',val);
  }
  function has_Intersect_Prop(obj1, obj2 ){
    let res=false;
    for(const [key, value] of entries(obj1)){
      if(isArray(obj1)) res=_mapValue(obj2, value);
      else if(isPObject(obj1)) res=_mapValue(obj2, key);
      if(bool(res)) break;
    }
    return res;
  }
  function Widget_Conditional_Directive_Resolver(self, val, element){
    const GIC=new _$Directive_$Conditional$_Renderer();
    if(val.attrs && hasOwn(val.attrs, 'px:if')){
      return GIC.Panel_If_Block(self, val.attrs, ResolveWidget, [self, element, 'widgets', val], element);
    }else if(val.attrs && hasOwn(val.attrs, 'px:else-if')){
      return GIC.Panel_elseif_Block(self, val.attrs, ResolveWidget, [self, element, 'widgets', val], element);
    }else if(val.attrs && hasOwn(val.attrs, 'px:else')){
      return GIC.Panel_else_Block(self, val.attrs, ResolveWidget, [self, element, 'widgets', val], element);
    }
  }
  function compileTemplate(build='', self, element, isWidget=false){
    if(isPrimitive(build)){
      build=build.trim() ? createTxtNode(self, build, element) : '';
      element=build
    }else if(build.isWidget && isPObject(build) || isFunction(build)){//if build value is a valid widget data
      element=CompilePatcher(self, build, build);//this sets the widget flags, passed the widget to __Pixel_Build, sets global widgets from  its parents if any, installs all BUILT_IN_WIDGETs, mounts the wodget to a fragment and return the domRoot'
    }else if(!isArray(build)){
      if(build.Pixel_NodeMake){
        element=build;
      }else if(build.type && isPObject(build.type) && bool(build.type.Pixel_NodeMake)){
        element=build.type
      }else if(IS_VALID_TAGNAME(build.type)){//if build is an element object'
        element=VNodeManager(self, build, element);
        
      }else if(isPObject(build) || build.isWidget /*removed build.isWidget*/){
        if(build.attrs && hasIFWithFor(build.attrs) ) {
          $Debug(`((Warning))\n\n Cannot include a conditional rendering diretive with a "px:for" loop  on the same widget\n\n"px:if/ px:else-if/ px-else" statement block must not be present with a "px:for" directive`);
          //delete build.attrs['px:for'];
        }
        return Widget_$For$If$_(self, build, element)
      }
    }else if(isArray(build)){
      element=createFragment();
      define(element,'widgets',{value:self.widgets || {}});
      try { 
        entries(build).forEach(([ind, value])=>{
          children_Setup(value, element, self, true);
        });
        
      }catch(err){
        $Debug(`Template Compilation error::\n\nelement "${build}" may not ve been passed properly\n\n${err}`);
        $Debug(`This might be a pixel internal bug/issue, \n\n please report any bugy problem @ "http://www.pixel-framework.com/issue" or open an issue on our github repository`);
        return element;
      }
    }
    return element;
  }
  function Widget_Directive_Handler(self, widget, props, ctx, patches, Ref_Rag){
    const { name, item:data } = props;
    if(isWidgetUsableDirective(name)){
      let item;
      try{
        item = __Evaluate_THIS(self.state, data);
        patches.push(data);
        define(Ref_Rag, data, {value:name, enumerable:true});
      }catch(err){
        if(ctx){
          try{
            item = __Evaluate_THIS(ctx, data);
            patches.push(data);
            define(Ref_Rag, data, {value:name, enumerable:true});
          }catch(error){
            $Debug(`value "${data}" property value was accessed during render, but not initialized on model or is undefined\n\nat at\n ..."${name} property \n\n${err}`);return;
          }
        }
      }
      if(isObject(item)){
        for(const [prop, value] of entries(item)){
          const attribute={ attrs:{ [prop]:value}};
          consume_Widget_Props(self, widget, attribute, ctx, patches, Ref_Rag );
        }
      }
    }else{
      $Debug(`((Warning))\n\nSyntax warning\n"${name}" is not a valid widget directive, \n\n if this us a custom directive, make sure it's renamed to a name that doesn't conflict with the Pixel builtin directives`);return;
    }
  }
  const instance_Has_Widget=(self, name )=>_mapValue(BUILT_IN_WIDGETS, name) || _mapValue(self.widgets || {}, name ) || _mapValue(self.state.config.$global.widgets, name) ;
  const normalize_Widget=(self, name)=>_mapValue(BUILT_IN_WIDGETS, name) ? BUILT_IN_WIDGETS[name] : self.widgets && _mapValue(self.widgets, name) ? self.widgets[name] : self.state.config.$global.widgets[name] ;
  function ResolveWidget(obj, element, widgets, value, ctx){
    if(!_mapValue(BUILT_IN_WIDGETS, value.type) && !_mapValue(obj[widgets] || {}, value.type) && !_mapValue(obj.state.config.$global.widgets, value.type)){
      $Debug(`Template Compilation Error::\n\nUnresolved tagname "${value.type}"\n\n   ...if this is a pixel widget, make sure its registered through the "widgets" option or resolved through the custom nodemake resolver`);
      return element ;
    }
    if (instance_Has_Widget(obj, value.type) ){
      let widget=normalize_Widget(obj, value.type);
      widget= isFunction(widget) ? widget.bind({}) : Object.create(widget);//binding or creating a new object model
      let patches=[];
      const Ref_Rag={};
      if(ctx) delete ctx.ref;
      if(value.attrs) {
        define(widget, 'attributes', {value:{}, enumerable:true, configurable:true});
        consume_Widget_Props(obj, widget, value, ctx, patches, Ref_Rag);
      }
      let child;
      child=CompilePatcher(obj, widget, value, ctx);//this sets the widget flags, passed the widget to __Pixel_Build, sets global widgets from  its parents if any, installs all BUILT_IN_WIDGETs, mounts the wodget to a fragment and return the domRoot'
      if(hasOwn(value.attrs || {}, 'px:slot')){
        let slotN=value.attrs['px:slot'];
        let bra;
        try{
          get_Object_Value(obj.state, slotN, true)
          bra=__Evaluate_THIS(obj.state, slotN) || slotN;
        }catch(error){
          bra=slotN;
        }
        slotN=bra;
        define(child, 'slot', {value:slotN})
      }
      if(isGT(patches.length, 0)) {
        for(const patch of patches.values()){
          child.PATCH_FLAGS.add(patch);
        }
        define(child, 'Ref_Rag', {value:Ref_Rag})
      }
      if(!isNull(element) && !ctx) {
        element.append(child);
        element.NodeList.push(child);
        if(isGT(child.PATCH_FLAGS.size, 0)) {
          for(let flag of child.PATCH_FLAGS.values()){
            element.PATCH_FLAGS.add(flag);
          }
        }
      }else element=child;
    }
    return element;
  }
  function CompilePatcher(self, widget, value, ctx){
    if(isEQ(widget.name, 'bound Build') || isEQ(widget.name, 'bound px:build')){
      const refName=widget.attributes ? widget.attributes.self : null;
      const RefHedge=!isPrimitive(refName) ? refName : _mapValue(BUILT_IN_WIDGETS, refName) ? BUILT_IN_WIDGETS[refName] : self.widgets && _mapValue(self.widgets, refName) ? self.widgets[refName] : self.state.config.$global.widgets[refName] ;
      if(RefHedge && widget.children){
        RefHedge.children=widget.children
      }
      if(widget.attributes) widget.attributes.self=RefHedge || refName;
    }
    widget=  set_Widget_Flag(self, widget, value, 'children', ctx);//setting the widget flag
    let child=new __Pixel_Build(widget);//build the widget
    for(const [key, value] of entries(self.state.config.$global)){
      entries(value).forEach(([name, data])=>{
        if(isEQ(key, 'widgets')) child=child.widget(name, data);//in the loot, uses the build.widget prototype to define global widgets
        else if(isEQ(key, 'properties')) child=child.property(name, data);//in the loot, uses the build.widget prototype to define global properties
        else if(isEQ(key, 'directives')) child=child.directive(name, data);//in the loot, uses the build.widget prototype to define global directive
        else if(isEQ(key, 'handlers')) child=child.handler(name, data);//in the loot, uses the build.widget prototype to define global handlers
      })
    }
    child=child.mount(createFragment());//mounts the build to a pixel fragment
    return child;
  }
  function set_Widget_Flag(self, widget, val, arg, ctx){
    if(isEQ(arg, 'children')){ 
      if(val.children && isGT(val.children.length, 0) ){
        const Flag={ children:val.children, patchFlags:self, ctx }
        widget.children=Flag;
      }
    }
    return widget;
  }
  function consume_Widget_Props(self, widget, value , ctx, patches, Ref_Rag){
    const properties={}
    entries(value.attrs).forEach(([ind, param])=>{
      param=fall_AttrName(ind, param)
      if(isNodeBaseDirective(ind)){
        $Debug(`Directive breakup on widget\n\n "${ind}" directive is an element based directive\n\n cannot be used on a pixel widget\nat at.....\n....."${value.type} widget"`);return;//matching away all none widget usable directives
      }
      if(hasAsterisks_bind(ind) && isGT(ind.length,1)){
        let name=fall_AttrName(__Attr_Name_Resolver(self, ind));
        let item;
        try{
          item = __Evaluate_THIS(self.state, param);
          patches.push(param);
          define(Ref_Rag, param, {value:name, enumerable:true});
        }catch(err){
          if(ctx){
            try{
              item = __Evaluate_THIS(ctx, param);
              patches.push(param);
              define(Ref_Rag, param, {value:name, enumerable:true});
            }catch(error){
              $Debug(`value "${param}" property value was accessed during render, but not initialized on model or is undefined\n\nat at\n ..."${name} property \n\n${err}`);return;
            }
          }
        }
        let nodeBased=['class','style']
        if(_mapValue(nodeBased, name)) name=`${name}`;
        define(properties, name, {value:item, enumerable:true});
      }else if(isPixelDirective(ind)) Widget_Directive_Handler(self, widget, {name:ind, item:param}, ctx, patches, Ref_Rag);
      else if(hasPx_bind(ind)) {
        const props={ attrs:{[`*${fall_AttrName(ind)}`]:param }}
        consume_Widget_Props(self, widget, props, ctx, patches, Ref_Rag);
      }else if(hasSpread_bind(ind)){ 
        Manage_Widget_Spread(self, widget, { key:fall_AttrName(ind)}, ctx, patches, Ref_Rag)
      }else define(properties, ind, {value:param, enumerable: true});
    });
    assign(widget.attributes, properties);
  }
  function Manage_Widget_Spread(self, widget, props, ctx, patches, Ref_Rag){
    const { key:data } = props;
    let item;
    try{
      item = __Evaluate_THIS(self.state, data);
      patches.push(data);
      define(Ref_Rag, data, {value:name, enumerable:true});
    }catch(err){
      if(ctx){
        try{
          item = __Evaluate_THIS(ctx, data);
          patches.push(data);
          define(Ref_Rag, data, {value:name, enumerable:true});
        }catch(error){
          $Debug(`value "${data}" property value was accessed during render, but not initialized on model or is undefined\n\nat at\n ..."${name} property \n\n${err}`);return;
        }
      }
    }
    const prop={ attrs:item };
    consume_Widget_Props(self, widget, prop, ctx, patches, Ref_Rag);
  }
  function createFragment(){
    const fragment=new DocumentFragment();
    define(fragment, 'isPixel_Fragment',{value:true});
    define(fragment, 'NodeList',{value:[], configurable:true, writable:true});
    define(fragment, 'PATCH_FLAGS',{value:new Set(), configurable:true, writable:true});
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
        if(_mapValue(waitForReturnObjects, val) && isFunction(value)) value=opts[val]();
        widget[val]=value;
      }
    });
    entries(opts).forEach(([key, val])=>{
      if(!_mapValue(validWidgetOptions, key ) && !_mapValue(['params','ctx'], key)) self.state[key]=val;
    })
    return widget;
  }
  function $Entity_Decoder(str){
    const regex=/([{{](.*?)([}}]))/g;
    str=str.replace(regex, (match, p1)=>{
      const entityKey=new Set();
      const entity=new Set();
      for(const [ent, key] of entries(HtmlEntityMap)){
        entityKey.add(key);
        entity.add(ent);
      }
      p1=p1.replace(/&/g, '&amp;')     
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')     
        .replace(/\\/g, '&#39;');  
        return p1
    })
    return str
  }
  function HTMLParser(html=''){
    if(!html.trim()) return null;
    const selfClosedTagsRegex=/<([a-zA-Z0-9\-\_:]*)(\s[^>]*)?\/>/gs;
    const selfClosedTagRegex=/<([a-zA-Z0-9\-\_:]*)(\s[^>]*?)?\/>/s;
    const openingTagsRegex=/<([a-zA-Z0-9\-\_:]*)(\s[^>]*?)?[\/]?>/g;
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
    const parser=new DOMParser();
    const doc=parser.parseFromString(html,'text/html');
    const body=doc.body;
    const stack=[];
    for (let node of body.childNodes){
      if(node ){
        if(IS_TEXT_NODE(node)){
          node=node.textContent;
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
          const nodeOBJ={ type:tagName, attrs:isGT(Object.keys(attributes).length,0) ? attributes : null, children: children && isPObject(children) ? [children]  : children }
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
  function NodeMake(opts, options){
    this.is_Custom_Node=true;
    if(!isPObject(opts)){$Debug(`NodeMake option values must be type of object......>>>>`);return;}else if(isGT(arguments.length, 1)){$Debug(`NodeMake parameter values required only 1 argument.....\n\n${arguments.length} given>>>>>>>>>>>`);return;}
    const isValidNodeMakeopts=opt=>_mapValue(['template','styles','plugin','name','params','onConnected','onDisconnected','onAdopted','onAttrChanged'],opt);
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
    const LifeCycleHooksList=['onConnected','onDisconnected', 'onAdopted','onAttrChanged','plugin'];
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
        const template=compileTemplate(TemplateParser(opts.template), this, null);
        css_Stylesheet_Compilation(opts, null, template);
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
      $Debug(`${name} option must be passed to the request object options,\n\n null found , or is undefined`);return false;
    }else if(!resolveType(data, type)){
      $Debug(`found an invalid value to the "${name}" option\n\n must be a "${isFunction(type) ? type.name.toLowerCase() : type }" type value`);return false;
    }
    return true;
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
    const body=createVNode('body');
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
    if(template) define(Widget, 'template', {value: template.innerHTML, configurable:true, enumerable:true});
    if(style) define(Widget, 'styleSheet', {value: style.innerHTML, configurable:true, enumerable:true});
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
        throw new Error('Error loading/importing pixel widget file');
      }
    };
    xhr.send();
  }
  async function doFetch(URL, ){
    let thisBind={};
    let value
    await getPIXELFile(URL,function(source) {
      
      }, value)
    return await thisBind
  }
  async function importWidget(URL){
    let value=await doFetch(URL)
  }
  const initBuild=function(options, attrs, children){
    return new __Pixel_Build(options, attrs, children);}
  const initSSRBuild=function(options, attrs, children){
    for(let key of Object.keys(options)){
      if(!isValidWidgetOption(key)) $Debug(`Widget option error\n\n "${key}" not a valid widget option`);}
    return new __Pixel_Build(options);
  }
  function VNode(options){
    if(!isPObject(options)){ $Debug(`VNode Error\n expects an 'object'`);return;}
    const optionsName=['type','attrs', 'children'];
    if(isGT(Object.keys(options).length, 3)){
      $Debug(`Options Error\n\n VNode does not accept more than 3 arguments`);
    }
    for(let name of Object.keys(options)){
      if(!_mapValue(optionsName, name)) {$Debug(`${name} is not a valid VNode options value`);return;}
    }
    const {type, attrs, children}=options;
    return  options ;
  }
  global.importWidget=importWidget;
  global.VNode=VNode;
  global.get_version=get_version;//dev
  global.H=H;
  global.initBuild=initBuild;
  global.initSSRBuild=initSSRBuild;
  global.log=log;//dev
  global.Build=Build;
  global.Transition=Transition;
  global.AsyncWidget=AsyncWidget;
  global.defineWidget=defineWidget;
  global.Template=Template;
  global.Widget=Widget;
  global.data=data;
  global.createVNode=createVNode;
  global.NodeMake=NodeMake;
  global.createFragment=createFragment;//dev
  global.$Debug=$Debug;//dev
  global.Fragment=Fragment;
  global.GenerateRoot=GenerateRoot;
  console.info(devInfo);//dev
  return global;
})(({}));
