    /**
    *This project, 'PIXEL', is been sponsored by the VORTEX TECHNOLOGY FOUNDATION.
    *Visit 'www.pixel.com/guide' for for more information on the pixel project and documentation of pixel and its development process guide.
    *This is a web JIT development version of Pixel
    *We focus hard on developing and improving our features and perfomance issues, we only need your support to help and encourage us on maintaing this template engine.
    *Thanks for choosing Pixel
    */
const Pixel=(function(global){
    "use strict"
    const log=console.log
    const get_version= 'pixel-0.1.0';//pixel at it's earliest version
    const isEqual=(arg1, arg2)=>arg1===arg2;//checks if arg1 is equal to arg2
    const isString=str=>isEqual(typeof str,'string');
    const isNull=arg=>arg==null;
    const isObject=obj=>isEqual(typeof obj,'object');
    const isArray=Array.isArray;
    const isPObject=obj=>isObject(obj) && !isArray(obj);
    const isPrimitive=val=>!isObject(val) && !isFunction(val);
    const mapValue=(obj, arg)=>isNull(obj) ? false : isPObject(obj) ? Object.hasOwn(obj, arg) : isArray(obj) ? obj.includes(arg) : false;
    const isFunction=func=>isEqual(typeof func,'function');
    const isNumber=num=>isEqual(typeof num,'number');
    const isBoolean=bool=>isEqual(typeof bool, 'boolean');
    const isGT=(val, arg)=>val>arg;//checks if val is greater than arg
    const isLT=(val, arg)=>val<arg;//checks if val is less than arg
    const isGTE=(val, arg)=>val>=arg;//checks if val is greater than or equal to args
    const isLTE=(val, arg)=>val<=arg;
    const $warner=`<<** Pixel Debug **>>.....>>>>>>>`;
    const PixelDebug=msg=>console.warn(`${$warner}\n\n ${msg}`);//pixel warming debugger
    const validWidgetOptions=['build','instance','styleClass','widgets','beforeBuild','onBuilt','beforeMount','onMounted','beforeUpdate','onUpdated','methods','properties','buildConfig','styleSheet','directives','template','name'];//valid widget options---
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
    const dataTypes=['string','function','object','array','boolean','number'];//Valid javascript datatypes
    const isValidDataType=obj=>mapValue(dataTypes, obj);//checks if a string value is a dataTypes return text
    const hasUpperCase=str=>str.match(/[A-Z]/g);
    const hasLowerCase=str=>str.match(/[a-z]/g);
    const hasDigit=dig=>dig.match(/[0-9]/g);
    const NodeTypeMap={ ELEMENT_NODE:1, ATTRIBUTE_NODE:2, TEXT_NODE:3, CDATA_SECTION_NODE:4, ENTITY_REFERENCE_NODE:5, ENTITY_NODE:6, PROCESSING_INSTRUCTION_NODE:7, COMMENT_NODE:8, DOCUMENT_NODE:9, DOCUMENT_TYPE_NODE:10, DOCUMENT_FRAGMENT_NODE:11, NOTATION_NODE:12 }
    const isElementNode=nodeType=>mapValue(NodeTypeMap, nodeType);
    const IsValidElement=el=>isPObject(el) && IS_VALID_TAGNAME(el.localName)  ||  el.isPixel_Fragment;
    const IS_TEXT_NODE=node=>node && isEqual(node.nodeType, NodeTypeMap.TEXT_NODE);
    const IS_ATTRIBUTE_NODE=node=>node && isEqual(node.nodeType, NodeTypeMap.ATTRIBUTE_NODE);
    const IS_ELEMENT_NODE=node=>node && IsValidElement(node) && isEqual(node.nodeType, NodeTypeMap.ELEMENT_NODE);
    const IS_ENTITY_NODE=node=>node && isEqual(node.nodeType, NodeTypeMap.ENTITY_NODE);
    const IS_DOCUMENT_TYPE_NODE=node=>node && isEqual(node.nodeType, NodeTypeMap.DOCUMENT_TYPE_NODE);
    const IS_DOCUMENT_NODE=node=>node && isEqual(node.nodeType, NodeTypeMap.DOCUMENT_NODE);
    const IS_NOTATION_NODE=node=>node && isEqual(node.nodeType, NodeTypeMap.NOTATION_NODE);
    const IS_DOCUMENT_FRAGMENT_NODE=node=>node && isEqual(node.nodeType, NodeTypeMap.DOCUMENT_FRAGMENT_NODE);
    const IS_CDATA_SECTION_NODE=node=>node && IsValidElement(node) && isEqual(node.nodeType, NodeTypeMap.CDATA_SECTION_NODE);
    const IS_PROCESSING_INSTRUCTION_NODE=node=>node && isEqual(node.nodeType, NodeTypeMap.PROCESSING_INSTRUCTION_NODE);
    const IS_ENTITY_REFERENCE_NODE=node=>node && isEqual(node.nodeType, NodeTypeMap.ENTITY_REFERENCE_NODE);
    const IS_COMMENT_NODE=node=>node && isEqual(node.nodeType, NodeTypeMap.COMMENT_NODE);
    const TypeMethods={isString, isFunction, isPObject, isArray, isBoolean, isNumber}
    const isNodeChildren=val=> isString(val) || isArray(val) || isPObject(val) && val.isChildWidget || isPObject(val)&& IS_VALID_TAGNAME(val.type);
    function parseScript(script){return Function(`"use strict"; return (${script})`)();}//helps compile string values to javascript statement
    const createNodeChildrenOrSetAttrs=function(args, element, self){
        if(isNull(args)) return element;
        else if(isNodeChildren(args) || args.isWidget ) element=NodeChildrenManager(args, element, self);
        else if (isPObject(args)) element=AttributeManager(args, element, self);
        return element;
    }
    const GLOBAL_EVENTS=['abort','animationcancel','animationend','animationiteration','animationstart','auxclick','blur','error','focus','canplay','canplaythrough','cancel','change','click','close','contextmenu','dblclick','drag','dragend','dragenter','dragleave','dragover','dragstart','drop','durationchange','emptied','ended','formdata','gotpointercapture','input','invalid','keydown','keypress','load','keyup','loadeddata','loadedmetadata','loadend','loadstart','lostpointercapture','mousedown','mouseenter','mouseleave','mousemove','mouseout','mouseover','mouseup','mousewheel','wheel','pause','play','playing','pointerdown','pointermove','pointerup','pointercancel','pointerover','pointerout','pointerleave','pointerenter','pointerlockchange','pointerlockerror','progress','ratechange','reset','resize','scroll','securitypolicyviolation','seeked','seeking','select','selectstart','selectionchange','slotchange','stalled','submit','suspend','timeupdate','touchcancel','touchend','touchstart','touchmove','transitioncancel','transitionrun','transitioned','transitionstart','waiting'];//Html event names managed by pixel on elements
    const IS_VALID_EVENT_HANDLER=eventName=>mapValue(GLOBAL_EVENTS, eventName);
    function createVNode(type, attrs=null, children=null, self={}){
        const argsCount=arguments.length;
        let element;
        const id=Math.floor(Math.random()*(100000000 * 9999999999999) + 10000000);
        const Pixel_El={
            __PX_ID:`__${id}`,
            widgets:self.widgets || undefined,
            __$data:self.$data || undefined,
            __properties:self.properties || undefined
        }
        if(type){
            if(IS_VALID_TAGNAME(type))element=document.createElement(type);
            Object.defineProperty(element, 'px__VNode',{value:id});
            Object.assign(element, Pixel_El);
        }
        const attributes=!isNull(attrs) && !isNodeChildren(attrs) && isPObject(attrs) ? attrs : !isNull(children) && !isNodeChildren(children) && isPObject(children) ? children : {}
        if(!isNull(attributes['px-skip'])){
            const name=attributes['px-skip'];
            let item;
            try{
                item=parseScript(name);
                item= item || EvaluateTHIS(self.$data, name);
            }catch(err){
                try{
                    item=EvaluateTHIS(self.$data, name);
                }catch(error){
                    PixelDebug(`${err}`);
                }
            }
            Object.defineProperty(element, 'px-skip', {value:item , configurable:true, enumerable: true});
        }
        element=createNodeChildrenOrSetAttrs(arguments[1], element, self);
        element=createNodeChildrenOrSetAttrs(arguments[2], element, self);
        return element;
    }
    function hasSpecialCharacters(value) {// Define the regular expression for special characters
        const regex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
        return regex.test(value);  // Test if the value contains any special characters
    }
    function escapeRegExp(string) { return string.replace(/[.!@#%_\,<>:;'"\-=*+?^${}()|[\]\\]/g, '\\$&'); }
    function resolveAccessor(self, str, config){
        let delimiters= ['{{', '}}'];
        if(config && config.delimiters){
            if(!hasSpecialCharacters(config.delimiters[0]) || !hasSpecialCharacters(config.delimiters[1]) ) PixelDebug(`mustache customization error::\n\n delimeters must match value of special characters\n\ne.g !, @, #, $, %, ^, &, *, (, ),  [, ], {, },  :, ?`); 
            else if(config.delimiters[0].startsWith('${') || config.delimiters[1].startsWith('${')) PixelDebug(`Invalid  delimiter value :: \n\n"$\{" cannot be used as a string mustache delimeter since this are javascript multiline string interpolation technic\n\n Delimeter Configuration failed`);
            else delimiters=config.delimiters;
        }
        if(delimiters && isArray(delimiters) && isEqual(delimiters.length, 2)){
            Object.entries(delimiters).forEach(([key, val])=>{
                if(!isString(val)){
                    PixelDebug(`${isEqual(key, 0) ? 'opening' : ' closing' } delimiters value must be passed as a string`);return;
                }
            })
        }
        const open=hasSpecialCharacters(delimiters[0]) ? escapeRegExp(delimiters[0]) : delimiters[0];
        const close=hasSpecialCharacters(delimiters[1]) ? escapeRegExp(delimiters[1]) : delimiters[1];
        const pattern=new RegExp(`${open}(.*?)${close}`, 'g');
        if(str.match(pattern)) {
            str=str.replace(pattern, (match, text)=>{
                text=text.trim();
                try{
                    let name=text;
                    text=EvaluateTHIS(self, text) || '';
                    if(isNull(text)){
                        PixelDebug(`"${name}" is undefined or not on widget instance`);
                    }
                } catch(err){
                    PixelDebug(`accessor Error\n\naccessor "${text}" is accessed on build, but not defined on build instance\n\n ${err}`);return;
                }
                text= isPrimitive(text) ? String(text) : '';
                return text || '';
            })
        }
        return str;
    }
    function NodeChildrenManager(children, element, self){
        if(isArray(children)){
            for (const [ind, value] of children.entries()){
                element=childrenSet(value, element, self);
            }
        }else element=childrenSet(children, element, self);
        return element;
    }
    function pxBind(attr, key){
        if(key.startsWith('*')){
            attr=isString(attr) ? parseScript(attr) : attr;
            const ky=key.slice(1);
            return { ky, value:attr };
        }else if(isEqual(key, 'px')){
            attr=isString(attr) ? parseScript(attr) : attr;
            return { ky:key, value:attr };
        }else{
            return { ky:key, value:attr };
        }
    }
    function contextData(self, value, key=null, el){
        let item;
        let name;
            try{
                item=parseScript(value)
            }catch(error){
                try{
                    item=EvaluateTHIS(self.$data, item) || value;
                }catch(err){
                    item=value
                }
            }
            return value
    }
    const PixelDirectives=['px-if','px-else','px-else-if','px-html','px-text','px-for','px-skip','px-data','px-slot','px-model'];
    const DataDirectives=['px-for','px-data','px-model'];
    const isPixelDirective=(dir)=>mapValue(PixelDirectives, dir);
    function EvaluateTHIS(obj, str, el){
        // Check if the expression contains semicolons
        if (str.includes(';')) {
            throw new Error('Invalid expression: \n\n";" not allowed\n Only single expressions are allowed.');return;
        }// Use a regular expression to match statements or multiple expressions
        const statementRegex = /^(?:let|var|const|if|for|while|do|switch|{|}).*$/;
        if (statementRegex.test(str)) {
            throw new Error('Invalid expression:\n\n Only single expressions are allowed and no statement.');
        }// Use a regular expression to remove comments from the expression by using string .replace regex method
        const commentRegex = /\/\/.*|\/\*[^]*?\*\//g;//comment matching regular expression
        const expressionWithoutComments = str.replace(commentRegex, '');// Use a regular expression to match any remaining unsupported constructs and statement keywords
        const unsupportedRegex = /(?:\.\.|\/\/|\/\*|\*\*|\[=|==\+|-\+|\+=|\-=|\*=|\/=|%=\*\*=|&&=|\|\|=|<=|>=|\breturn\b|\bthrow\b|\bfunction\b|\bnew\b|\btypeof\b|\bdelete\b|\binstanceof\b|\bvoid\b|\bthis\b|\bnull\b|\bundefined\b|\bconst\b|\blet\b|\bvar\bclass\b)/;
        if (unsupportedRegex.test(expressionWithoutComments)) {
            throw new Error('Invalid expression: \n\nUnsupported constructs are not allowed.');
        }
        const getValue = new Function('obj', '...args', `with(obj){ return ${str};}`);
        const value = getValue(obj, ...Object.values(obj));
        return value;
    }
    function AttrNameResolver(self, attr, el){
        attr= attr.slice(1);
        const pattern=/\[(.*?)\]/g;
        const matches=attr.match(/\[(.*?)\]/g);
        if(matches){
            attr=matches[0].replace(pattern, (match, text)=>{
                try{
                    let suit=parseScript(text);
                    suit= suit || EvaluateTHIS(self.$data, text);
                    if(isNull(suit))PixelDebug(`Value Error::\n\n ${text} value accessor is unefined or does not exist`);
                    text=suit;
                }catch(error){
                    try{
                        text=EvaluateTHIS(self.$data, text);
                    
                    }catch(err){
                        throw err;
                    }
                }
                return text || '';
            })
        }
        return `*${attr}`;
    }
    function AttributeManager(attrs, element, self){
       if(!isPObject(attrs))return;
       Object.entries(attrs).forEach(([key, attr])=>{
            if(key.startsWith('*')){
               let name;
               let item;
                key=AttrNameResolver(self, key, element);
               try{
                   const { value, ky }= pxBind(attr, key);
                   item=value;
                   name=ky;
                }catch(err){
                    try{
                        name=key
                        item=EvaluateTHIS(self.$data, attr, element);
                        if(!item && isNull(item)){
                            PixelDebug(`value"${attr}" property value was accessed during render, but not initialized on instance or is undefined\n\nat at\n ..."${name} attribute on ${element.localName} element`);
                            return;
                        }
                    }catch(error){
                         PixelDebug(`value "${attr}" property value was accessed during render, but not initialized on instance\n\nat at\n \n${element.outerHTML}\n\n..."${name} attribute on ${element.localName} element`);
                         return;
                    }
                }
                if(!isNull(name)){
                    //name=name.slice(1)
                    if(isEqual(name, 'style') && isPObject(item)){
                        Object.entries(item).forEach(([name, val])=>{
                            element.style[name]=val;
                      })
                    }else if(IS_VALID_EVENT_HANDLER(name.slice(1))){
                      name=name.slice(1)
                        if(!isFunction(item)){PixelDebug(`"${name}" event must be passed as  a function \n \n`);return;}
                            element.addEventListener(name, isFunction(item) ? item : Do_Nothing);
                   }else if(isEqual(name.slice(1), 'class')){
                        element.className=element.className+item
                    }else{
                        
                        element.setAttribute(name.slice(1), item);
                    }
                }
            }else if(IS_VALID_EVENT_HANDLER(key.slice(1).toLowerCase())){
                    const event=key.slice(1).toLowerCase();
                    if(!isFunction(attr)){PixelDebug(`"${event}" event must be wrapped as  a function `);return;}
                        element.addEventListener(event, isFunction(attr) ? attr : Do_Nothing);
            }else if(isPixelDirective(key)){
               element=ResolveDirectives(self, key, attr, element)
            }else if(!isString(attr) && !key.startsWith('*')){
                if(isEqual(key,'style')){
                    if(isPObject(attr)){
                        Object.entries(attr).forEach(([name, val])=>{
                            element.style[name]=val;
                        });
                    }
                }
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
                item=EvaluateTHIS(self.$data, attr) ;
                item = item ? item : isEqual(name, 'px-html') || isEqual(name, 'px-text') ? `${attr}` : item
                if(!item && isNull(item)){
                    PixelDebug(`value "${attr}" property value was accessed during render, but not initialized on instance or is undefined\n\nat at\n ..."${name} directive on ${el.localName} element`);
                    return;
                }
            }catch(error){
                PixelDebug(`value "${attr}" property value was accessed during render, but not initialized on instance\n\nat at\n ..."${name} Directive on ${el.localName} element`);
                return;
            }
        }
        if(isEqual(name, 'px-for')){
            name=key.slice(3)
            attr=attr.trim()
            const LoopInSplit=attr.split(' ')
            Object.entries(LoopInSplit).forEach(([k, Li])=>{
                LoopInSplit[k]=Li.trim();
            })
            //f(!isEqual(LoopInSplit.length, 3) ) PixelDebug(`unknonw loop expression`);return
            const getValue =EvaluateTHIS(self.$data, LoopInSplit[2])
            el.patchFlags={}
            const forData={
                data:getValue,
                accessor:LoopInSplit[0]
            }
            Object.defineProperty(el.patchFlags, 'forData', {value: forData, configurable: true})
            /*let Loop=new Function('obj','...args', `
                with(obj){
                    for (const ${tap[0]} of ${tap[2]}) {
                    
                    }
                }
            )
            Loop(self.$data, ...Object.values(self.$data))
                            */
        }else if(isEqual(name, 'px-html')){
            if(item && isPrimitive(item)) el.innerHTML=item;
        }else if(isEqual(name, 'px-text')){
            let bra
            try{
                bra=parseScript(item)
            }catch(error){
                try{
                    bra=EvaluateTHIS(self.$data, item) || item;
                }catch(err){
                    bra=item
                }
            }
            item=bra
            if(item && isPrimitive(item)) el.innerText=item;
        }else if(isEqual(name, 'px-data')){
            
        }else if(isEqual(name, 'px-slot')){   
            if(!isString(item)){
                PixelDebug(`value Error::\n\n slot name undefined or is not a string\n\n Error resolving slot name`);return;
            }
            
            el.setAttribute(name.slice(3), item);
        }
        return el
    }
    function VNodeManager(options, self){
        const { type, attrs, children }=options;
        if(!type)return;
        return createVNode(type, children || null, attrs || null, self);
    }
    function H(type, attrs=null, children=null){
        const argsCount=arguments.length;
        if(!type){ PixelDebug('error loading vnode type\n\ntype for H Vnode  function is not defined'); return; }else if(argsCount>3){PixelDebug(`H Vnode function cannot accept more than 3 arguments, \n\n "${ argsCount }" received`);return;}
        if(isPObject(type) || isFunction(type)){
            if(Boolean(type.is_Custom_Node)){
                return new type.element;
            }
            type=isFunction(type) ? type : Object.create(type);
            Object.defineProperty(type, 'isWidget',{value:true, enumerable:true});
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
            else{
                try{
                    let texter=createVNode('body');
                    let temp=`<${type} ></${type}>`
                    texter.innerHTML=temp;
                    type=texter.childNodes[0];
                }catch(err){
                    throw new Error(err)
                    PixelDebug(`invalid element tagname\n\n"${type}" is not a valid html tag name`); return;
                    
                }
            }
        }
        if(isEqual(argsCount,1))return { type };
        else if(isEqual(argsCount,2)){
            if (isNodeChildren(attrs) || attrs.isWidget) return { type, children:attrs };
            else if(isPObject(attrs)) return { type, attrs };
        }else if(isEqual(argsCount,3)){
            if (isNodeChildren(attrs) ||  attrs.isWidget && isPObject(children))return { type, children:attrs, attrs:children }
            else if(isPObject(attrs) && isNodeChildren(children) || children.isWidget ) return { type, attrs, children };
            else PixelDebug(`invalid value pased to HyperScript function, \n ...\nat...>>>>>\n\n"${attrs}" <<and>>> "${children}"`);return;
        }
    }
    class Widget {
        constructor(){}
        static isClassBasedWidget=true;
        
    }
    class XWidget extends Widget{
        constructor(self){ super();
        }
        static BUILT_IN_WIDGET=true;
        properties={ self:{ type:[Object, Function, String], required:true}}
        build({self}){ 
            return H(self, this.$attrs);}
    }
    class Fragment extends Widget{
        constructor(){ super(); }
        static BUILT_IN_WIDGET=true;
        build(){ return [H('slot')];}
    }
    const BUILT_IN_WIDGETS={ Fragment,'x-widget':XWidget, XWidget }
    const instanceManager=function(opts,self){
        if(!isNull(opts.instance)){
            if(!isFunction(opts.instance)){
                PixelDebug(`widget instance option must be a function,\n\n and .....>>>>>\n`);return;
            }else{
                Object.defineProperty(self.$data, '$data',{value:{},writable:true, enumerable:true});
                const instanceReturnObj=opts.instance.call(self.$data);
                if(!isPObject(instanceReturnObj)){ PixelDebug(`\ninstance method must return an object`);return;}
                Object.entries(instanceReturnObj).forEach(([key, value])=>{
                    if(isPObject(value) && value._data_flag){
                        Object.defineProperty(self.$data.$data, key, {value: value.value, enumerable: true, writable: true, configurable:true});
                    }else{
                        Object.defineProperty(self.$data, key, {value: value, enumerable: true, writable: true});
                    }
                });
            }
        }
    }
    const widgetsSetup=function(opts, self){
        if(!isNull(opts.widgets)){
            if(!isPObject(opts.widgets)){
                PixelDebug(`widget option must be an object,\n \n invalid value  "${typeof opts.widgets}" found`);
                return;
            }else{
                Object.entries(opts.widgets).forEach(([key, widget])=>{
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
        Object.entries(obj).forEach(([ind, val])=>{
            val=isFunction(val) ? val() : val;
            if(!isValidDataType(val)){
                PixelDebug(`validation type for "${ind}" is not a valid javascript data type \n\nat at\n unable to resolve "${val}" `);
                return false;
            }
        })
        return true;
    }
    const methodsManager=function(opts, self,){
        if(opts.methods && isPObject(opts.methods)){
            self.methods={};
            Object.entries(opts.methods).forEach(([ind, method])=>{
                if(!isNull(method) && !isFunction(method)){
                    PixelDebug(`widget method option's values must be a method or a function\n\n type of "${typeof method}" found`);return;
                }
                method=method.bind(self.$data);
                self.$data[ind]=method;
                self.methods[ind]=method;
            });
        }else if(!isNull(opts.methods) && !isPObject(opts.methods)){
            PixelDebug(`widget methods option must be an "object"\n\n........>>>> invalid "typeof ${typeof opts.methods}"   found`);return;
        }
    }
    const propsManager=function(opts, self){
        let prop;
        const props=opts.properties || opts.props || undefined;
        const attrs=opts.attributes || opts.attrs || undefined;
        if(opts.isFunctionalWidget){
            if(attrs && isPObject(attrs) && !props){
                self.$data.$attrs={};
                Object.entries(attrs).forEach(([ind, attr])=>{
                    self.$data.$attrs[ind]=attr;
                });
            }
        }
        let propsSet;
        if(props && isPObject(props) || isArray(props)){
            if(self.is_Custom_Node){
                propsSet=self.$props={};
            }else{
                propsSet=self.$data.$props={};
                self.$data.$attrs={};
            }
            Object.entries(props).forEach(([ind, prop])=>{
                if(isFunction(prop)){
                    if(!mapValue(attrs || {}, ind)){
                        Object.defineProperty(propsSet,ind,{value:''});return;}
                }else if(isArray(props) && isString(prop)){
                    Object.defineProperty(propsSet, prop, {value: '', configurable: true});return;}
                if(isPObject(prop) && prop.required && isNull(prop.default)){
                    if(!mapValue(attrs || {}, ind)){
                        PixelDebug(`validation error........\n\nrequired property is empty\n\nat at\n    .....${ind}`);
                        Object.defineProperty(propsSet,ind,{value:'' });
                        return;}
                }else if(isPObject(prop) && !isNull(prop.default) && !prop.required){
                    const defaultValue=prop.default;
                    if(!mapValue(attrs || {}, ind)){
                        if(isFunction(prop.type) && !isEqual(typeof prop.type(), typeof defaultValue)){
                            PixelDebug(`validation error .....\n\n
                            property validation for widget default value failed, property "${ind}" is of an invalid type\n\n typeof "${typeof prop.type()}" expected`);
                            return;
                        }else if(isArray(prop.type)){
                            let truthy=false;
                            for (const [key, val] of prop.type.entries()){
                                if(isEqual(typeof val(), typeof defaultValue)){
                                    truthy=true;
                                    Object.defineProperty(propsSet, ind, {value: defaultValue});
                                }
                            }
                            if(!truthy){
                                PixelDebug(`validation error  .......\n\nproperty validation for widget failed, property "${ind}" is of an invalid type\n\n matches no type in the validation list`);
                                Object.defineProperty(propsSet,ind,{value:''});return; 
                            }
                        }else{
                            Object.defineProperty(propsSet,ind,{value:defaultValue });
                        }
                    }
                }else if(isPObject(prop) && !isNull(prop.default) && isEqual(prop.required, true)){
                    PixelDebug(`validation error  .......\n\nthe required validator should not be truthy alongside a default value\nat at\n\n"${ind}`);
                    return;
                }
            })
            Object.entries(attrs || {}).forEach(([ind, attr])=>{
                if(isPObject(props) && mapValue(props || {}, ind)){
                    prop=props[ind];
                    if(isFunction(prop)){
                        if(isNumber(prop())) attr=Number(attr)
                        if(isNumber(prop()) && isNaN(attr) || !isEqual(typeof prop(), typeof attr)){
                            PixelDebug(`validation error  .......\n\nproperty validation for widget failed, property "${ind}" is of an invalid type\n\n typeof "${typeof prop()}" expected`);
                            Object.defineProperty(propsSet,ind,{value:''});
                            return; 
                        }else{
                            Object.defineProperty(propsSet,ind,{value:attr});
                        }
                    }else if(isArray(prop)){
                        let truthy=false;
                        for (const [key, val] of prop.entries()){
                            if( isEqual(typeof val(), typeof attr)){
                                truthy=true;
                                Object.defineProperty(propsSet, ind, {value: attr});return;
                                break;
                            }
                        }
                        if(!truthy){
                                PixelDebug(`validation error  .......\n\nproperty validation for widget failed, property "${ind}" is of an invalid type\n\n matches no type in the validation list`);
                                Object.defineProperty(propsSet,ind,{value:''});return; 
                        }
                    }else if(isPObject(prop)){
                        if(!prop.type){
                            PixelDebug(`validation error  ......\n\nno type definition found at prop validation for widget \n\nat\n"${ind}"`);
                            Object.defineProperty(propsSet,ind,{value:''});return;
                        }
                        if(isFunction(prop.type)){
                            if(isNumber(prop.type())) attr=Number(attr)
                            if(isNumber(prop.type()) && isNaN(attr) || !isEqual(typeof prop.type(), typeof attr)){
                                PixelDebug(`property validation for widget failed, property "${ind}" is of an invalid type\n\n typeof "${typeof prop.type()}" expected`);
                                Object.defineProperty(propsSet,ind,{value:''});return ;
                            }else Object.defineProperty(propsSet,ind,{value:attr});
                        }else if(isArray(prop.type)){
                            let truthy=false;
                            for (const [key, val] of prop.type.entries()){
                                if(isEqual(typeof val(), typeof attr) ){
                                    truthy=true;
                                    Object.defineProperty(propsSet, ind, {value: attr});
                                    break;
                                }
                            }
                            if(!truthy){
                                PixelDebug(`validation error  .......\n\nproperty validation for widget failed, property "${ind}" is of an invalid type\n\n matches no type in the validation list`);
                                Object.defineProperty(propsSet,ind,{value:''});return; 
                            }
                        }
                    }
                }else if(isArray(props)){
                    Object.entries(props).forEach(([key, val])=>{
                        if(isEqual(val, ind)){
                            Object.defineProperty(propsSet, val,{value: attr || ''})
                        }
                    })
                    
                }else if(!mapValue(props, ind)){
                    Object.defineProperty(self.$data.$attrs, ind,{value:attr || '', configurable: true, enumerable: true});
                }
            });
        }else if(props && !isPObject(props)){
            PixelDebug(`properties value for widget is of an invalid pattern,  must be an object\n typeof "${typeof props}" found`);return;
        }
    }
    const setupBeforeBuildHook=function(opts, self){
        if(!isNull(opts.beforeBuild)){
            if(!isFunction(opts.beforeBuild)){
                PixelDebug(`"beforeBuild Callback" hook must be a function \n\n type of "${typeof opts.beforeBuild}" found`);return;
            }
            self.beforeBuild=opts.beforeBuild.bind(self.$data={});
            self.beforeBuild();
        }
    }
    const setupBuildHook=function(opts, self){
        if(!isNull(opts.onBuilt)){
            if(!isFunction(opts.onBuilt)){
                PixelDebug(`"onBuilt Callback" hook must be a function \n\n type of "${typeof opts.onBuilt}" found`);return;
            }
            self.onBuilt=opts.onBuilt.bind(self.$data);
            self.onBuilt();
        }
    }
    const setupBeforeMountHook=function( opts, self){
        if(!isNull(opts.beforeMount)){
            if(!isFunction(opts.beforeMount)){
                PixelDebug(`"beforeMount Callback" hook must be a function \n\n type of "${typeof opts.beforeMount}" found`);return;
            }
            self.beforeMount=opts.beforeMount.bind(self.$data);
        }else self.beforeMount=Do_Nothing;
    }
    const setupMountedHook=function(opts, self ){
        if(!isNull(opts.onMounted)){
            if(!isFunction(opts.onMounted)){
                PixelDebug(`LifeCycle Error::\n\n"onMounted callback" hook must be a function \n\n type of "${typeof opts.onMounted}" found`);return;
            }
            self.onMounted=opts.onMounted.bind(self.$data);
        }else self.onMounted=Do_Nothing;
    }
    const setupBeforeUpdateHook=function(opts, self, wheel){
        if(isLTE(wheel, 1))return;
        if(!isNull(opts.beforeUpdate)){
            if(!isFunction(opts.beforeUpdate)){
                PixelDebug(`"beforeUpdate Callback" hook must be a function \n\n type of "${typeof opts.beforeUpdate}" found`);return;
            }
            self.beforeUpdate=opts.beforeUpdate.bind(self.$data);
            self.beforeUpdate();
        }else self.beforeUpdate=Do_Nothing;
    }
    const setupOnUpdatedHook=function(opts, self, wheel){
        if(isLTE(wheel, 1))return;
        if(!isNull(opts.onUpdated)){
            if(!isFunction(opts.onUpdated)){
                PixelDebug(`"onUpdated Callback" hook must be a function \n\n type of "${typeof opts.onUpdated}" found`);return;
            }
            self.onUpdated=opts.onUpdated.bind(self.$data);
        }else self.onUpdated=Do_Nothing;
    }
    
    const compileStyleClasses=function(opts, self){
        if(!isNull(opts.styleClass && isPObject(opts.styleClass))){
            self.$data.$styles={};
            Object.entries(opts.styleClass).forEach(([ind, style])=>{
                if(!isNull(style) && !isPObject(style)){
                    PixelDebug(`property value of style is of an invalid type, an object required....>>\n\n.....typeof ${typeof style} fount`); return;
                }
                self.$data.$styles[ind]=style;
            })
        }else if(!isNull(opts.styleClass && !isPObject(opts.styleClass))){
            PixelDebug(`invalid option.......\n\n styleClass option must be an object, typeof "${typeof styleClass}" found`);return;
        }
    }
    const validateWidgetOptions=function(opts, self){
        const exist=[];
        Object.entries(opts).forEach(([ind, val])=>{
            if(!exist.includes(ind))exist.push(ind);
            else{ PixelDebug(`widget options error\n\n....duplicate property "${ind} found on widget`);return;}
        });
    }
    const hydrationCompile=function(opts, self, el){
        if(!el.Pixel_NodeMake && IsValidElement(el) && !el.isPixel_Fragment){
            let inheritStyles=true;
            let inheritAttrs=true;
            if(!isNull(self.$data.config)){
                if (!isNull(self.$data.config.inheritStyles) && isBoolean(self.$data.config.inheritStyles)) inheritStyles=isBoolean(Boolean(self.$data.config.inheritStyles)) ? Boolean(self.$data.config.inheritStyles) : inheritStyles;
                if (!isNull(self.$data.config.inheritAttrs) && isBoolean(self.$data.config.inheritAttrs)) inheritAttrs=isBoolean(Boolean(self.$data.config.inheritAttrs)) ? Boolean(self.$data.config.inheritAttrs) : inheritAttrs;
            }
            if(inheritStyles && isPObject(self.$data.$styles)){
                Object.entries(self.$data.$styles).forEach(([ind, val])=>{
                    if(isPObject(val)){
                        Object.entries(val).forEach(([key, value])=>{
                            el.style[key]=value;
                        });
                    }else if(isPrimitive(val)){
                        el.style[ind]=val;
                    }
                });
            }
            if(inheritAttrs && isPObject(self.$data.$attrs)){
                let attributes=self.$data.$attrs
                Object.entries(self.$data.$attrs).forEach(([ind, attr])=>{
                    if(isEqual(ind, 'class')) el.className=`${el.className} ${attr}`;
                    else el.setAttribute(ind, attr);
                });
            }
        }
    }
    const setupClassBasedWidget=function(options, self){
        const opts=new options();
        const widget=new Object();
        if(options.attributes) widget.attributes=options.attributes;
        if(options.children) widget.children=options.children;
        const waitForReturnObjects=['properties','methods','styleClass','widgets','buildConfig'];
        Object.entries(validWidgetOptions).forEach(([key, val])=>{
            if(!isNull(opts[val])){
                let value=opts[val];
                if(mapValue(waitForReturnObjects, val) && isFunction(value))value=opts[val]();
                widget[val]=value;
            }
        })
        Object.entries(opts).forEach(([key, val])=>{
            if(!mapValue(validWidgetOptions, key ) && !mapValue(['props','context'], key)) self.$data[key]=val;
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
               opts.isClassBasedWidget=isClassBasedWidget;
            }else{
                isFunctionalWidget=true;
                opts=setupFunctionWidget(opts, self);
                opts.isFunctionalWidget=isFunctionalWidget;
           }
       }
       return opts;
    }
    const sanitizedOptions=function(args, self){
        const count=args.length;
        if(!args){ PixelDebug('error loading widget\n\ntype for Vnode  function is not defined'); return; }else if(isGT(count,3)){PixelDebug(`PixelBuild function cannot accept more than 3 arguments,  "${ count }" received`);return;}
        let widget=H(args[0], args[1], args[2]);
        widget=setWidgetFlag(self, widget, widget, 'children');
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
            let fallData=self.$data.config.fallThrough || {};
            Object.defineProperty(patchFlags.$data, '$fall', {value:fallData, configurable:true})
            Object.entries(childrenArr).forEach(([key, child])=>{
                let value=compileTemplate(child, patchFlags, null);
                children.push(value);
                
            })
            self.$data.$slots={};
            let template=H('template');
            template=compileTemplate(template, self, el);
            Object.entries(children).forEach(([ind, value])=>{
                if(isEqual(value.localName, 'template')){
                    const name=value.getAttribute('slot');
                    Object.defineProperty(self.$data.$slots, name || 'default', {value: value, configurable: true, enumerable: true});
                }else{
                    template.append(value);
                    Object.defineProperty(self.$data.$slots, 'default', {value: template, configurable: true, enumerable: true});
                }
            })
            const enumerateSlots=function(cont){
                let slotContent=''
                if(isGT(cont.childNodes.length,1)){
                    slotContent=createFragment();
                    Object.entries(cont.childNodes).forEach(([ind, myel])=>{
                        slotContent.append(myel);
                    });
                }else{
                    if(cont.childNodes.length) slotContent=cont.childNodes[0];
                }
                return slotContent;
            }
            const slots=el.querySelectorAll('slot');
            Object.entries(slots || []).forEach(([ind, slotEl])=>{
                const name=slotEl.getAttribute('name');
                if(name && isString(name)){
                    if(self.$data.$slots && mapValue(self.$data.$slots, name)){
                        const slotContent=enumerateSlots(self.$data.$slots[name]);
                        slotEl.replaceWith(slotContent);
                    }
                }else if(!name){
                    if(self.$data.$slots && mapValue(self.$data.$slots, 'default')){
                        const slotContent=enumerateSlots(self.$data.$slots['default']);
                        
                        slotEl.append(slotContent);
                    }
                }
            });
            if(isEqual(slots.length, 0) && !el.isPixel_Fragment && !el.innerHTML.trim() && IsValidElement(el)){
                let inheritSlots=true;
                if(opts.buildConfig && !isNull(opts.buildConfig.inheritSlots) && isBoolean(opts.buildConfig.inheritSlots)){
                    if(!isBoolean(opts.buildConfig.inheritSlots)){
                        PixelDebug(`Value Error\n\n "inheritSlots" value cannot be compiled\n boolean value format required`);return;
                    }
                    inheritSlots=opts.buildConfig.inheritSlots;
                }
                if(!Boolean(inheritSlots))return;
                let slotContent=enumerateSlots(self.$data.$slots['default']);
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
                Object.entries(opts.buildConfig.fallThrough).forEach(([key, value])=>{
                    try{ value=parseScript(value) ;
                    }catch(err){ value=EvaluateTHIS(self.$data, value);}
                    opts.buildConfig.fallThrough[key]=value
                })
            }
            Object.entries(opts.buildConfig).forEach(([key, setting])=>{
                Object.defineProperty(self.$data.config, key , {value:setting, configurable: true, enumerable:true, writable: true});
            })
        }else if(opts.buildConfig && !isPObject(opts.buildConfig)){
            PixelDebug(`Value Error\n\nbuild Configuration settings object must be an object type format or is undefined`);
            return;
        }
    }
    function MapGlobal(self, options){
        const exceptions=['children','attributes','isWidget','isClassBasedWidget','isFunctionalWidget'];
        const $options={};
        let hasOpts=false
        Object.entries(options).forEach(([key, opts])=>{
            if(!mapValue(exceptions, key) && !isValidWidgetOption(key)){
                $options[key]=opts;
                hasOpts=true;
            }
        })
        if(hasOpts) Object.defineProperty(self.$data,'$options',{value: $options});
        Object.defineProperty(self.$data,'config',{value:{}});
       self.$data.config.$global={};
       self.$data.config.$global.properties={};
       self.$data.config.$global.widgets={};
       self.$data.config.$global.methods={};
    }
    function ensureRenderer(self, options){
        instanceManager(options, self);
        widgetsSetup(options, self);
        propsManager(options, self);
        methodsManager(options, self);
        compileStyleClasses(options, self);
    }
   function PixelBuild(options, properties=null, children=[]){
       setupBeforeBuildHook(options, this);
       if(isNull(this)){
           PixelDebug(`build instanciation error\n\nunable to compile build widget,  .......this might be due to missing constructor's "new" keyword in PixelBuild call\n "PixelBuild is a constructor function, must be called with the "new" constructor keyword`);return;}
        options=sanitizedOptions(arguments, this);
        this.$data={};
        MapGlobal(this, options)
        options=BasedWidgets(options, this);
        ensureRenderer(this, options);
        let wheel=0
            setupBeforeUpdateHook(options, this, wheel);
            this.render=function(self, build){
                setConfig(options, self);
                let node=compileTemplate(build || '', self, null) ;
                node=cssStylesheetCompilation(options, self, node);
                slotHydrateRenderer(self, options, node);
                hydrationCompile(options, self, node);//setting the buildConfig option
                self.$data.$el=node;
                setupBuildHook(options, self);
                setupBeforeMountHook(options, self);
                setupMountedHook(options, self);
                return node;
            }
            if(isNull(options.build) && isNull(options.template))options.build=null;
            Object.defineProperty(this, 'build', {value:options.build || options.template , writable:true, enumerable:true, configurable:true});
            //setupOnUpdatedHook(options, this, wheel);
        //})
        /*this.protoPromisesCalls=0;
        this.hasMountProto=false;
        this.widget=widget;
        this.install=install;
        this.directive=directive;
        this.property=property;
        this.method=method;
        this.mountRoot=mountRoot*/
        resolveProto(this, options);
    }
    //PixelBuild=PixelBuild.bind({});
    function resolveProto(self, opts){
        new Promise((resolve, reject)=>{
            resolve(self.protoPromisesCalls)
        }).then((data)=>{
            if(!self.hasMountProto){
                self.build=suspenseBuildCall(self, null);
            }
            delete self.protoPromisesCalls;
            delete self.render;
            //delete self.widgets;
            delete self.hasMountProto;
            if(!opts.beforeMount) delete self.beforeMount;
            if(!opts.onMounted) delete self.onMounted;
            return self;
        })
        return self;
    }
    const GenerateRoot=(nodeSelector)=>{
        if(isNull(nodeSelector)){PixelDebug(`no node instance or selector value passed to widget mountroot`); return;}
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
    PixelBuild.prototype.mountRoot=mountRoot;
    function mountRoot(nodeSelector){
        this.hasMountProto=true;
        let activeWatcher = null;
       /* class Dependency {
            constructor() {
                this.subscribers = new Set();
            }
            depend() {
                if (activeWatcher) {
                    this.subscribers.add(activeWatcher);
                }
            }
            notify() {
                this.subscribers.forEach((watcher) => watcher.update());
            }
        }
        // Watcher
        class Watcher {
            constructor(component, getter, callback) {
                this.component = component;
                this.getter = getter;
                this.callback = callback;
                this.value = this.get();
            }
            update() {
                const oldValue = this.value;
                this.value = this.getter();
                if (this.value !== oldValue) {
                    this.callback(this.value, oldValue);
                }
            }
            get() {
                activeWatcher = this;
                const value = this.getter();
                activeWatcher = null;
                return value;
            }
        }
        
        function trackDependency(dependency) {
            if (activeWatcher) {
                dependency.depend();
            }
        }
        function makeReactive(obj) {
            Object.keys(obj).forEach((key) => {
                let internalValue = obj[key];
                const dependency = new Dependency();
                Object.defineProperty(obj, key, {
                    get() {
                        trackDependency(dependency);
                        return internalValue;
                    },
                    set(newValue) {
                        internalValue = newValue;
                        dependency.notify();
                    },
                });
            });
            return obj;
        }
        const watch=(getter, callback)=>{
            const watcher = new Watcher(this, getter, callback);
            this.watchers.push(watcher);
            watcher.update();
        }
        makeReactive(this.$data.$data);
        //Object.entries(this.$data.$data).forEach(([i, v])=>{
        // watch(()=>this.$data.$data.count, (newV, oldV)=>{
              
        //     })
       // })
        // const update=(self)=>{
        //     this.watchers.forEach((watcher) =>{
        //         watcher.update();
                
        //     })
                
        // }
        //update(this)*/
        this.build=suspenseBuildCall(this, nodeSelector);
        this.beforeMount()
        const domRoot=GenerateRoot(nodeSelector);
        domRoot.innerHTML='';
        if(domRoot.iS_PIXEL_MOUNTROOT){
            PixelDebug(`A Pixel widget has already been mounted on this element, cannot mount more than one Wdget on a single root element`);return;
        }else{
            const id=Math.floor(Math.random()*(12 * 99) + 766);
            const MoutRootToken={
                iS_PIXEL_MOUNTROOT:true,
                __mountRootToken:'px__'+id,
                widgets:this.widgets || undefined,
                __properties: this.properties || undefined,
                __$data:this.$data || undefined
            }
            domRoot.innerHTML='';
            
            domRoot.append(this.build || '');
            Object.defineProperty(domRoot, 'px__VNode',{value:id});
            Object.assign(domRoot, MoutRootToken);
            this.onMounted()
            return domRoot;
        }
    }
    PixelBuild.prototype.widget=widget;
    function widget(Value, obj){
        if(!isString(Value) || !isPObject(obj) && !isFunction(obj)){PixelDebug(`unrecognised global widget registration for ${obj} widget`);return this;}
        if(isEqual(arguments.length,2)){
            if(!isNull(this.$data.config.$global.widgets)) this.$data.config.$global.widgets[Value]=obj;
            else{
                Object.defineProperty(this.$data.config.$global, 'widgets', {value: {}, configurable: true, enumerable: true, writable: true});
                this.$data.config.$global.widgets[Value]=obj;
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
        Object.entries(this.$data.config.$global.properties).forEach(([name, value])=>{
            if(isPObject(value) && isEqual(value._data_flag, true)) Object.defineProperty(this.$data.$data, name, {value: value.value, configurable: true});
            else Object.defineProperty(this.$data, name, {value: value, configurable: true});
        })
        Object.entries(this.$data.config.$global.methods).forEach(([name, method])=>{
            if(!isFunction(method)){
                PixelDebug(`global method error::\n\n The argument passed to a global method is not a function\nInvalid dataType`);return this;
            }
            Object.defineProperty(this.$data, name, {value: method, configurable: false, enumerable: true});
        })
        this.protoPromisesCalls++
        return this;
    }
    PixelBuild.prototype.property=property;
    function property(name, value){
        if(!isString(name) ){PixelDebug(`unrecognised global property registration for ${value} widget`);return this;}
        if(isEqual(arguments.length,2)){
            if(!isNull(this.$data.config.$global.widgets)) this.$data.config.$global.properties[name]=value;
            else{
                Object.defineProperty(this.$data.config.$global, 'properties', {value: {}, configurable: true, enumerable: true, writable: true});
                this.$data.config.$global.properties[name]=value;
            }
        }
        this.protoPromisesCalls++
        return this;
    }
    PixelBuild.prototype.method=method;
    function method(name, func){
        if(!isString(name) && !isFunction(func)){PixelDebug(`unrecognised global method registration for ${func}`);return this;}
        if(isEqual(arguments.length,2)){
            if(!isNull(this.$data.config.$global.methods)) this.$data.config.$global.methods[name]=func;
            else{
                Object.defineProperty(this.$data.config.$global, 'methods', {value: {}, configurable: true, enumerable: true, writable: true});
                this.$data.config.$global.methods[name]=func;
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
    const expose=function(dataObj){
        
    }
    function suspenseBuildCall(self, selector){
        if(isFunction(self.build)){
            self.build=self.build.bind(self.$data);
            self.build=self.render(self, self.build(self.$data.$props||{},{emits:self.$data.$emits || {},attrs:self.$data.$attrs || {}, styles:self.$data.$styles || {}, slots:self.$data.$slots || {}}));
        }else if(isString(self.build)){
            self.build=self.render(self, TemplateParser(self.build));
        }else if(isNull(self.build) && selector){
            self.build=self.render(self, TemplateParser(GenerateRoot(selector).innerHTML || ''));
        }else return null;
        return self.build;
    }
    function data(val){
        if (isPObject(val)){
            Object.defineProperty(val, '_deep_data_flag',{value:true, enumerable:true});
            return val;
        }else if(isPrimitive(val) || isArray(val)){
            let react={};
            Object.defineProperty(react, '_data_flag',{value:true, enumerable:true});
            Object.defineProperty(react, 'value',{value:val, enumerable:true, writable: true});
            return react;
        }
        return val;
    }
    function childrenSet(val, element, self){
        let child;
        if(isPrimitive(val)){
            val=String(val);
            let hasSkip=mapValue(element, 'px-skip');
            const Skip=element['px-skip'];
            hasSkip= hasSkip && isBoolean(Skip) ? Skip : hasSkip ;
            if(hasSpecialCharacters(val) &&  !hasSkip ) val=resolveAccessor(self.$data, val, self.$data ? self.$data.config : {});
            if(!isNull(val)){
                child=document.createTextNode(val);
                element.append(child);
            }
        }else if(isPObject(val) && IS_VALID_TAGNAME(val.type)){
            child=VNodeManager(val, self);
            element.append(child);
            return element
        }else if(isFunction(val)  || isPObject(val) && val.isWidget){
            element.append(CompilePatcher(self, val, val));//this sets the widget flags, passed the widget to PixelBuild, sets global widgets from  its parents if any, installs all BUILT_IN_WIDGETs, mounts the wodget to a fragment and return the domRoot'
        }else if(val.Pixel_NodeMake){
            element.append(val);
        }else if(val.type && isPObject(val.type) && Boolean(val.type.Pixel_NodeMake)){
                element.append(val.type);
        }else if(self){
            element=ResolveWidget(self, element, 'widgets', val);
        }else if(isNull(val)){
            PixelDebug(`undefined reference error\n\n unable to instanciate reference, seems to be having a problem, please recheck your "${element.localName}" element children`);return element;
        }else element=ResolveWidget(element,element,'widgets',val);
        return element;
    }
    
    function compileTemplate(build='', self, element){
        if(isPrimitive(build)){
            if(hasSpecialCharacters(build)) build=resolveAccessor(self.$data, build, self.$data.config);
            element=document.createTextNode(build);
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
            Object.defineProperty(element,'widgets',{value:self.widgets || {}});
            
            try { 
                Object.entries(build).forEach(([ind, value])=>{
                    element=childrenSet(value, element, self);
                });
            }catch(err){
               // throw new Error(err)
                PixelDebug(`Template Compilation error::\n\nelement "${build}" might be  missing an end tag\n\n${err}`);
                PixelDebug(`This might likely be a pixel internal error, \n\n report at "www.pixel.com/issue" or open an issue on our github repository`);
                return element;
            }
        }
        return element
    }
    function ResolveWidget(obj, element, widgets, value){
        if(!mapValue(BUILT_IN_WIDGETS, value.type) && !mapValue(obj[widgets] || {}, value.type) && !mapValue(obj.$data.config.$global.widgets, value.type)){
            PixelDebug(`Template Compilation Error::\n\nUnresolved tagname "${value.type}"\n\n   ...if this is a pixel widget, make sure its registered through the "widgets" option or resolved through the custom nodemake resolver`);
            return element ;
        }
        if (mapValue(BUILT_IN_WIDGETS, value.type) || mapValue(obj[widgets] || {}, value.type ) || mapValue(obj.$data.config.$global.widgets, value.type) ){
            let widget=mapValue(BUILT_IN_WIDGETS, value.type) ? BUILT_IN_WIDGETS[value.type] : obj.widgets && mapValue(obj.widgets, value.type) ? obj.widgets[value.type] : obj.$data.config.$global.widgets[value.type] ;
            widget= isFunction(widget) ? widget.bind({}) : Object.create(widget);//binding or creating a new object instance
            if(value.attrs){
                Object.entries(value.attrs).forEach(([ind, prop])=>{
                    if(ind.startsWith('*') && isGT(ind.length,1)){
                        let name=AttrNameResolver(obj, ind).slice(1);
                        let item;
                        try{
                            item= parseScript(prop);
                            item = item || EvaluateTHIS(obj.$data, prop);
                        }catch(err){
                            name=ind.slice(1);
                            try{
                                item=EvaluateTHIS(obj.$data, prop);
                                if(!item && isNull(item)){
                                    PixelDebug(`value "${prop}" property value was accessed during render, but not initialized on instance or is undefined\n\nat at\n ..."${name} property `);return;}
                            }catch(error){
                                PixelDebug(`value "${prop}" property value was accessed during render, but not initialized on instance\n\nat at\n ..."${name} property`);return;}
                        }
                        delete value.attrs[ind];
                        value.attrs[name]=item;
                    }else if(isPixelDirective(ind)){
                        Do_Nothing();
                    }
                });
                widget.attributes=value.attrs;
            }
            const child=CompilePatcher(obj, widget, value);//this sets the widget flags, passed the widget to PixelBuild, sets global widgets from  its parents if any, installs all BUILT_IN_WIDGETs, mounts the wodget to a fragment and return the domRoot'
            if(!isNull(element)) element.append(child);
            else element=child;
        }
        return element;
    }
    function CompilePatcher(self, widget, value){
        if(isEqual(widget.name, 'bound XWidget')){
            const refName=widget.attributes.self
            const RefHedge=!isPrimitive(refName) ? refName : mapValue(BUILT_IN_WIDGETS, refName) ? BUILT_IN_WIDGETS[refName] : self.widgets && mapValue(self.widgets, refName) ? self.widgets[refName] : self.$data.config.$global.widgets[refName] ;
            if(RefHedge && widget.children){
                RefHedge.children=widget.children
            }
            widget.attributes.self=RefHedge || refName;
        }
        widget=setWidgetFlag(self, widget, value, 'children');//setting the widget flag
        let child=new PixelBuild(widget);//build the widget
        if(isGT(ObjSize(self.$data.config.$global.widgets), 0)){//Checks if there is a global widget
            Object.entries(self.$data.config.$global.widgets).forEach(([name, wig])=>{
                child=child.widget(name, wig);//in the loot, uses the build.widget prototype to define global widgets
            })
        }
        return child.mountRoot(createFragment());//mounts the buit to a pixel fragment
    }
    function setWidgetFlag(self, widget, val, arg){
        if(isEqual(arg, 'children')){ 
            if(val.children && isGT(val.children.length, 0) ){
                const Flag={ children:val.children, patchFlags:self }
                widget.children=Flag;
            }
        }
        return widget;
    }
    function createFragment(){
        const fragment=new DocumentFragment();
        Object.defineProperty(fragment, 'isPixel_Fragment',{value:true});
        return fragment;
    }
    const devInfo='You are using the development build version of pixel, make sure you switched to the minified build version when deploying to production with the (*.min.js) file extension';//development information
    function setupFunctionWidget(opts, self){
        const widget={};
        widget.build=opts;
        if(opts.attributes)widget.attributes=opts.attributes;
        if(!isNull(opts.isWidget))widget.isWidget=opts.isWidget;
        const waitForReturnObjects=['properties','methods','styleClass','widgets','buildConfig','directives'];
        Object.entries(validWidgetOptions).forEach(([key, val])=>{
            if(!isNull(opts[val])){
                let value=opts[val];
                if(mapValue(waitForReturnObjects, val) && isFunction(value))value=opts[val]();
                widget[val]=value;
            }
        });
        Object.entries(opts).forEach(([key, val])=>{
            if(!mapValue(validWidgetOptions, key ) && !mapValue(['props','context'], key)) self.$data[key]=val;
        })
        return widget;
    }
    function HTMLParser(html=''){
        if(!html.trim()) return null;
        const selfClosedTagsRegex=/<([a-zA-Z0-9\-\_]*)(\s[^>]*)?\/>/gs;
        const selfClosedTagRegex=/<([a-zA-Z0-9\-\_]*)(\s[^>]*)?\/>/
        const openingTagsRegex=/<([a-zA-Z0-9\-\_]*)(\s[^>]*?)?[\/]?>/g;
        const attributesRegex=/([^\s=]+)=?(['"]?[^'"]*['"]?)?/g;
        const attrRegex=/([^\s=]+)=?(['"]?[^'"]+['"]?)?/;
        html=html.replace(openingTagsRegex, (match, tag, attrs)=>{
            if(hasUpperCase(tag)){
                const nodeSpace=`$px-nodespace=${tag}`;
                attrs=attrs ? `${attrs} ${nodeSpace}` : nodeSpace;
            }
            if(attrs){
                attrs=attrs.replace(attributesRegex,(mch, attr, val)=>{
                    if(hasUpperCase(attr)) attr=`${attr}-$px`;
                    return `${attr}=${val}`;
                })
                let attrsMatch=attrs.match(attributesRegex);
                for (let attr of attrsMatch){
                    const attrMatch=attr.match(attrRegex)
                    const attrName=attrMatch[1];
                    if(hasUpperCase(attrName)){
                        const fallbackAttr=`$px-${attrName.toLowerCase()}=${attrName}`;
                        attrs=attrs ? `${attrs} ${fallbackAttr}` : fallbackAttr;
                    }
                }
            }
            const selfClosedTagMatch=match.match(selfClosedTagRegex);
            match=`<${tag} ${attrs} ${ selfClosedTagMatch ? '/>' : '>'}`;
            // log(match)
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
                    node=node.wholeText.trim();
                    if(node) stack.push(node);
                }else if(IS_COMMENT_NODE(node)){//Ignore comment nodes
                    Do_Nothing();
                }else if(node.Pixel_NodeMake){
                    stack.push(node)
                }else{
                    let tagName=node.localName;
                    const attributes={};
                    for (const attribute of node.attributes){
                        const { name, value }=attribute;
                        if(!name.startsWith('$px')) attributes[name]=value;
                        else if(isEqual(name,'$px-nodespace')) tagName=value;
                        else if(name.startsWith('$px') && name.endsWith('-$px')){
                            const attrN=name.slice(4);
                            if(mapValue(attributes, attrN)){
                                attributes[value.slice(0,value.length-4)]=attributes[attrN];
                                delete attributes[attrN];
                            }
                        }
                    }
                    const children=HTMLParser(node.innerHTML) || null;
                    const nodeOBJ={ type:tagName, attrs:ObjSize(attributes) ? attributes : null, children: children && isPObject(children) ? [children]  : children }
                    stack.push(nodeOBJ);
                    // log(nodeOBJ)
                }
            }
        }
        return stack.length===1 ? stack[0] : stack.length<1 ? null : stack;
    }
    function TemplateParser(html){ return HTMLParser(html);}
    const Template = (strings, ...values) => {
        const html = strings.reduce((acc, str, i) => {
            const value = values[i] !== undefined ? values[i] : '';
            return acc + str + value;
        }, '');return HTMLParser(html);
    };
    function NodeMake(opts, options){
        this.is_Custom_Node=true;
        if(!isPObject(opts)){PixelDebug(`NodeMake option values must be type of object......>>>>`);return;}else if(isGT(arguments.length, 1)){PixelDebug(`NodeMake parameter values required only 1 argument.....\n\n${arguments.length} given>>>>>>>>>>>`);return;}
        const isValidNodeMakeopts=opt=>mapValue(['template','styles','plugin','name','props','onConnected','onDisconnected','onAdopted','onAttrChanged'],opt);
        Object.entries(opts).forEach(([key, value])=>{
            if(!isValidNodeMakeopts(key)){PixelDebug(`invalid option value....\n\n "${key}" is not a recognised NodeMake option `);return;}
            if(isEqual(key, 'styles') && !isString(value)){PixelDebug(`styleSheet for custom elements must be of type "Strings of css styleSheets"`);return;}
            if(isEqual(key,'props')){
                if(!isPObject(opts.props)){PixelDebug(`props value for Custom Node must be of type "object"\n\n typeof "${typeof opts.props}" found`);return;}
            }
        });
        if(!isNull(opts.props))propsManager(opts, this)
        if(isNull(opts.template)){PixelDebug(`Custom element required a template option`);return;}else if(!isString(opts.template)){ PixelDebug(`string value required at the node make template option`);return;}
        if(isNull(opts.name)){PixelDebug('Custom node does not have a name option\n\nname required for node registration....');return;
        }else if(!isString(opts.name)){PixelDebug(`unrecovered  value type\nNodeMake name option required value of type "Strings"\n\n"${typeof opts.name}" found`);return;
        } else if(IS_VALID_TAGNAME(opts.name)){PixelDebug(`"${opts.name}" is an Html tag name .....\n\nshould not be used in Custom nodes`);return;
        }else if(IS_HTML_DEPRECATED_TAG(opts.name)){PixelDebug(`an Html depreciated element tagname, \n\nshould not be used for CUSTOM_NODES`);return;
        }else if(!opts.name.includes('-')){PixelDebug(`Due to inDom tag passing caveats ,Custom Nodes are termed to be named differently by using lowercases, multiwords saperated by the hyphen or underscore characters\n\n Node with name "${opts.name}" is invalid.......`);return;}
        if(!isNull(opts.plugins)){
            if(isFunction(opts.plugins))opts.plugins();
            else if(isPObject(opts.plugins) || isArray(opts.plugins)){
            }else{
                PixelDebug(`plugin type not supported for custume node`);return;
            }
        }
        const LifeCycleHooksList=['onConnected','onDisconnected', 'onAdopted','onAttrChanged','plugin'];
        let Hooks={};
        Object.entries(opts).forEach(([ind, value])=>{
            if(mapValue(LifeCycleHooksList, ind)){
                if(!isFunction(value)){
                    PixelDebug(`LifeCycle callback error\n\n"${ind}" is a callback function, received an invalid type`);return;
                }
                if(isEqual('onConnected',ind)) Object.defineProperty(Hooks, 'connectedCallback',{value:value, configurable:true});
                if(isEqual('onDisconnected',ind)) Object.defineProperty(Hooks, 'disConnectedCallback',{value:value, configurable:true});
                if(isEqual('onAdopted',ind)) Object.defineProperty(Hooks, 'adoptedCallback',{value:value, configurable:true});
                if(isEqual('onAttrChanged',ind)) Object.defineProperty(Hooks, 'attributeChangedCallback',{value:value, configurable:true});
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
                shadow.append(template);
                const pluginData=opts.plugin.call(pluginThis);
            }
            Pixel_NodeMake=true;
            connectedCallback=Hooks.connectedCallback || Do_Nothing;
            disConnectedCallback=Hooks.disConnectedCallback || Do_Nothing;
            adoptedCallback=Hooks.adoptedCallback || Do_Nothing;
            attributeChangedCallback=Hooks.attributeChangedCallback || Do_Nothing;
        }
        this.name=opts.name;
        this.element=Pixel_NodeMake_Element;
        this.resolve=resolve
        return this;
    }
    NodeMake=NodeMake.bind({});
    function resolve(){
        customElements.define(this.name, this.element);
    }
    function resolveType(data, type){
        let res=false;
        if(isFunction(type))type=type.name.toLowerCase();
        Object.entries(TypeMethods).forEach(([name, method])=>{
            if(name.toLowerCase().includes(type)) res=method(data);
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
    function Do_Nothing(){}
    function defineWidget(opts){
        if(isPrimitive(opts)){
            PixelDebug(`Value Error\n\n invalid value for the defineWidget macro\n/... at /././. at`);return;
        }else if(isGT(arguments.length, 1)){
            PixelDebug(`Parameter Error\n\nmax-one argument required\n ${arguments.length} given`);return;
        }
        return opts;
    }
    function HNode(type, attrs, ...children){
            return H(type, attrs || null, children);
    }
    global.HNode=HNode;
    global.get_version=get_version;//dev
    global.H=H;
    global.expose=expose;
    global.PixelBuild=PixelBuild;
    global.log=log;//dev
    global.XWidget=XWidget;
    global.AsyncWidget=AsyncWidget;
    global.defineWidget=defineWidget;
    global.Template=Template;
    global.Widget=Widget;
    global.data=data;
    global.createVNode=createVNode;
    global.NodeMake=NodeMake;
    global.createFragment=createFragment;
    global.Debug=PixelDebug;//dev
    global.Fragment=Fragment
    global.GenerateRoot=GenerateRoot
    console.info(devInfo);//dev
    return global;
})(({}));
