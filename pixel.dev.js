const Pixel=(function(global){
    "use strict"
    const log=console.log
    const get_version= 'pixel-0.1.0';//pixel at it's earliest version
    /**
    *This project, 'PIXEL', is been sponsored by the VORTEX TECHNOLOGY FOUNDATION.
    *Visit 'www.pixel.com/guide' for for more information on the pixel project and documentation of pixel and its development process guide.
    *This is a web JIT development version of Pixel
    *We focus hard on developing and improving iur features and perfomance issues, we only need your support to help and encourage us on maintaing this template engine.
    *Thanks for choosing Pixel
    */
    const isEqual=(arg1, arg2)=>arg1===arg2;//checks if arg1 is equal to arg2
    const isString=str=>isEqual(typeof str,'string');
    const isNull=arg=>arg==null;
    const isObject=obj=>isEqual(typeof obj,'object');
    const isPObject=obj=>isObject(obj) && isNull(obj.length);
    const isArray=arr=>Array.isArray(arr)
    const isPrimitive=val=>!isObject(val) && !isFunction(val);
    const mapValue=(obj, arg)=>isNull(obj) ? false : isPObject(obj) ? Object.hasOwn(obj, arg) : isArray(obj) ? obj.includes(arg) : false
    const isFunction=func=>isEqual(typeof func,'function');
    const isNumber=num=>isEqual(typeof num,'number');
    const isBoolean=bool=>isEqual(typeof bool, 'boolean');
    const isGT=(val, arg)=>val>arg;//checks if val is greater than arg
    const isLT=(val, arg)=>val<arg;//checks if val is less than arg
    const isGTE=(val, arg)=>val>=arg;//checks if val is greater than or equal to args
    const isLTE=(val, arg)=>val<=arg;
    const $warner=`** Pixel Error **.....>>>>>>>`;
    const PixelDebug=msg=>console.error(`${$warner}\n\n ${msg}`);//pixel warming debugger
    const validWidgetOptions=['build','instance','styleClass','widgets','beforeBuild','onBuilt','beforeMount','onMounted','beforeUpdate','onUpdated','methods','properties','buildConfig','styleSheet'];//valid widget options---
    const isValidWidgetOption=opts=>mapValue(validWidgetOptions, opts);//checks if an option is a vslid Pixel widget option
    const HTML_TAGS=['html','head','style','title','body','address','article','aside','footer','header','h1','h2','h3','h4','h5','h6','main','nav','section','blockquote','dd','div','dl','dt','figcaption','figure','li','menu','ol','p','pre','ul','a','abbr','b','bdi','bdo','cite','code','data','dfn','em','i','kbd','mark','q','rp','rt','ruby','s','samp','small','span','strong','sub','sup','time','u','var','audio','map','video','iframe','object','picture','portal','svg','math','canvas','noscript','script','del','ins','caption','col','colgroup','table','tbody','td','tfoot','th','thead','tr','datalist','fieldset','form','label','legend','meter','optgroup','option','output','progress','select','textarea','details','dialog','summary','button']//All html valid tags supported by the Pixel framework
    const IS_HTML_TAG=txt=>mapValue(HTML_TAGS, txt);
    const WEB_COMPONENTS=['template','slot'];//Web components tags , also supported by the Pixel framework
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
    const dataTypes=['string','function','object','array','boolean','number'];
    const isValidDataType=obj=>mapValue(dataTypes, obj);
    const isUpperCase=str=>str.match(/[A-Z]/g);
    const isLowerCase=str=>str.match(/[a-z]/g);
    const isDigit=dig=>dig.match(/[0-9]/g);
    const IsValidElement=el=>isPObject(el) && IS_VALID_TAGNAME(el.localName) || el.isPixel_Fragment;
    const TypeMethods={isString, isFunction, isPObject, isArray, isBoolean, isNumber}
    const isNodeChildren=val=> isString(val) || isArray(val) || isPObject(val) && val.isChildWidget || isPObject(val)&& IS_VALID_TAGNAME(val.type);
    function parseScript(script){return Function(`"use strict"; return (${script})`)();}//helps compile string values to javascript statement
    const createNodeChildrenOrSetAttrs=function(args, element, self){
        if(isNull(args)){
            return element;
        }else if(isNodeChildren(args) || args.isWidget ){
            element=NodeChildrenManager(args, element, self);
            return element;
        }else if (isPObject(args)){
            element=AttributeManager(args, element, self)
            return element;
        }else{ return element; }
    }
    const GLOBAL_EVENTS=['abort','animationcancel','animationend','animationiteration','animationstart','auxclick','blur','error','focus','canplay','canplaythrough','cancel','change','click','close','contextmenu','dblclick','drag','dragend','dragenter','dragleave','dragover','dragstart','drop','durationchange','emptied','ended','formdata','gotpointercapture','input','invalid','keydown','keypress','load','keyup','loadeddata','loadedmetadata','loadend','loadstart','lostpointercapture','mousedown','mouseenter','mouseleave','mousemove','mouseout','mouseover','mouseup','mousewheel','wheel','pause','play','playing','pointerdown','pointermove','pointerup','pointercancel','pointerover','pointerout','pointerleave','pointerenter','pointerlockchange','pointerlockerror','progress','ratechange','reset','resize','scroll','securitypolicyviolation','seeked','seeking','select','selectstart','selectionchange','slotchange','stalled','submit','suspend','timeupdate','touchcancel','touchend','touchstart','touchmove','transitioncancel','transitionrun','transitioned','transitionstart','waiting'];
    const IS_VALID_EVENT_HANDLER=eventName=>mapValue(GLOBAL_EVENTS, eventName);
    const APP_WIDGETS={};
    const CUSTOM_NODES={};
    const BUILT_IN_WIDGETS={};
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
        element=createNodeChildrenOrSetAttrs(arguments[1], element, self);
        element=createNodeChildrenOrSetAttrs(arguments[2], element, self);
        return element;
    }
    function hasSpecialCharacters(value) {// Define the regular expression for special characters
        const regex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
        return regex.test(value);  // Test if the value contains any special characters
    }
    function escapeRegExp(string) {
        return string.replace(/[.!@#%_\,<>:;'"\-=*+?^${}()|[\]\\]/g, '\\$&');
    }
    function resolveAccessor(self, str, config){
        let delimiters= ['{{', '}}'];
        if(config && config.delimiters){
            if(!hasSpecialCharacters(config.delimiters[0]) || !hasSpecialCharacters(config.delimiters[1]) ){
                PixelDebug(`delimeters must be value of special characters\n\ne.g !, @, #, $, %, ^, &, *, (, ),  [, ], {, },  :, ?`); 
            }else if(config.delimiters[0].startsWith('${')){
                PixelDebug(`Invalid value :: "" cannot be used as a string mustache`);
            }else delimiters=config.delimiters;
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
        let matches=str.match(pattern);
        if(matches && isGT(matches.length, 0)) {
            str=str.replace(pattern, (match, text)=>{
                text=text.trim()
                
                try{
                    text=EvaluateTHIS(self, text)
                } catch(err){
                    PixelDebug(`accessor Error\n\naccessor "${text}" is accessed on build, but not declared on instance\n\n ${err}`);return
                }
                text= isPrimitive(text) ? text : '';
                return text || ''
            })
        }
        return str
    }
    function childrenSet(val, element, self){
        let child;
        if(isPrimitive(val)){
            let hasSkip=element.getAttribute('skip');
            const makeValue=parseScript(hasSkip);
            hasSkip= isBoolean(makeValue) ? makeValue : hasSkip;
            if(hasSpecialCharacters(val) &&  !hasSkip) val=resolveAccessor(self.$data, val, self.$data.config);
            if(!isNull(val)){
                child=document.createTextNode(val);
                element.append(child);
            }
            return element;
        }else if(isPObject(val) && IS_VALID_TAGNAME(val.type)){
            child=VNodeManager(val, self);
            element.append(child);
            return element;
        }else if(isFunction(val) && val.isWidget || isPObject(val) && val.isWidget){
            const widget=new PixelBuild(val);
            element.append(widget.mountRoot(createFragment()));
            return element;
        }else if(self){
            
           element=patchChildWidget(self, element, 'widgets', val);
            if (isEqual(element, 'error'))return;
            else return element;
        } else if(isNull(val)){
            PixelDebug(`undefined reference error\n\n unable to instanciate reference, seems to be having a problem, please recheck your "${element.localName}" element children`)
            return element;
        }else{
            element=patchChildWidget(element,element,'widgets',val);
            if(isEqual(element, 'error'))return;
            else return element;
        }
    }
    function NodeChildrenManager(children, element, self){
        if(isString(children) || isPObject(children)){
            element=childrenSet(children, element, self);
            return element;
        }else if(isArray(children)){
            for (const [ind, value] of children.entries()){
                element=childrenSet(value, element, self);
            }
            return element;
        }
    }
    function pxBind(attr, key){
        if(key.startsWith('**')){
            attr=isString(attr) ? parseScript(attr) : attr;
            const ky=key.slice(2);
            return { ky, value:attr };
        }else if(isEqual(key, 'px')){
            attr=isString(attr) ? parseScript(attr) : attr;
            return { ky:key, value:attr };
        }else{
            return { ky:key, value:attr };
        }
    }
    const PixelDirectives=['**if','**else','**else-if','**html','**text','**for','**skip','**data',];
    const DataDirectives=['**for','**data'];
    const isBuiltInDirective=(dir)=>mapValue(PixelDirectives, dir);
    function EvaluateTHIS(obj, str){
        // Check if the expression contains semicolons
        if (str.includes(';')) {
            throw new Error('Invalid expression: Only single expressions are allowed.');return;
        }
  // Use a regular expression to match statements or multiple expressions
        const statementRegex = /^(?:let|var|const|if|for|while|do|switch|{|}).*$/;
        if (statementRegex.test(str)) {
            throw new Error('Invalid expression:\n\n Only single expressions are allowed and no statement.');
        }
  // Use a regular expression to remove comments from the expression by using string .replace regex method
        const commentRegex = /\/\/.*|\/\*[^]*?\*\//g;
        const expressionWithoutComments = str.replace(commentRegex, '');
  // Use a regular expression to match any remaining unsupported constructs and statement keywords
        const unsupportedRegex = /(?:\.\.|\/\/|\/\*|\*\*|\[=|==\+|-\+|\+=|\-=|\*=|\/=|%=\*\*=|&&=|\|\|=|<=|>=|\breturn\b|\bthrow\b|\bfunction\b|\bnew\b|\btypeof\b|\bdelete\b|\binstanceof\b|\bvoid\b|\bthis\b|\btrue\b|\bfalse\b|\bnull\b|\bundefined\b)/;
        if (unsupportedRegex.test(expressionWithoutComments)) {
            throw new Error('Invalid expression: Unsupported constructs are not allowed.');
        }
        const getValue = new Function('obj', '...args', `with(obj){ return ${str};}`);
        const value = getValue(obj, ...Object.values(obj));
        return value;
    }
    function AttrNameResolver(self, attr){
        attr= attr.slice(2);
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
        return `**${attr}`;
    }
    function AttributeManager(attrs, element, self){
       if(!isPObject(attrs))return;
       Object.entries(attrs).forEach(([key, attr])=>{
            if(key.startsWith('**')){
               let name;
               let item;
                key=AttrNameResolver(self, key);
               try{
                   const { value, ky }= pxBind(attr, key);
                   item=value;
                   name=ky;
                }catch(err){
                    try{
                        name=key
                        item=EvaluateTHIS(self.$data, attr);
                        if(!item && isNull(item)){
                            PixelDebug(`value"${attr}" property value was accessed during render, but not initialized on instance or is undefined\n\nat at\n ..."${name} attribute on ${element.localName} element`);return;
                        }
                    }catch(error){
                        name=key.slice(2)
                        attr=attr.trim()
                        const LoopInSplit=attr.split(' ')
                        Object.entries(LoopInSplit).forEach(([k, Li])=>{
                            LoopInSplit[k]=Li.trim();
                        })
                        
                        //f(!isEqual(LoopInSplit.length, 3) ) PixelDebug(`unknonw loop expression`);return
                        if(isEqual(name, 'for')){
                            const getValue =EvaluateTHIS(self.$data, LoopInSplit[2])
                            let outer;
                            Object.entries(getValue).forEach(([sk, im])=>{
                                
                            })
                        }else PixelDebug(`value "${attr}" property value was accessed during render, but not initialized on instance\n\nat at\n \n${element.outerHTML}\n\n..."${name} attribute on ${element.localName} element`);return;
                    }
                }
                if(!isNull(name)){
                    //name=name.slice(2)
                    if(isEqual(name, 'style') && isPObject(item)){
                        Object.entries(item).forEach(([name, val])=>{
                            element.style[name]=val;
                      })
                    }else if(IS_VALID_EVENT_HANDLER(name.slice(2))){
                      name=name.slice(2)
                        if(!isFunction(item)){PixelDebug(`"${name}" event must be passed as  a function \n \n`);return;}
                            element.addEventListener(name, isFunction(item) ? item : ()=>{});
                    }else if(isEqual(name, 'slot')){   
                        if(!isString(item)){
                            PixelDebug(`value Error::\n\n slot name undefined or is not a string\n\n Error resolving slot name`);return;
                        }
                        element.setAttribute(name, item);
                    }else if(isEqual(name, 'skip')){
                        element.setAttribute(name, item);
                    }else{
                        
                        element.setAttribute(name.slice(2), item);
                        
                    }
                }
            }else if(IS_VALID_EVENT_HANDLER(key.slice(2).toLowerCase())){
                    const event=key.slice(2).toLowerCase();
                    if(!isFunction(attr)){PixelDebug(`"${event}" event must be wrapped as  a function `);return;}
                        element.addEventListener(event, isFunction(attr) ? attr : ()=>{});
            }else if(isBuiltInDirective(key)){
               ResolveDirectives(self, key, attr, element)
            }else if(!isString(attr) && !key.startsWith('**')){
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
                    PixelDebug(`Athribute Error::\n\n...unable to set node attribute "${key}`);return;
                }
            }
       })
       return element;
    }
    function ResolveDirectives(self, key, attr, el){
        key=AttrNameResolver(self, key);
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
                item = item ? item : isEqual(name, '**html') || isEqual(name, '**text') ? `${attr}` : item
                if(!item && isNull(item)){
                    PixelDebug(`value "${attr}" property value was accessed during render, but not initialized on instance or is undefined\n\nat at\n ..."${name} directive on ${el.localName} element`);return;
                }
            }catch(error){
                PixelDebug(`value "${attr}" property value was accessed during render, but not initialized on instance\n\nat at\n ..."${name} Directive on ${el.localName} element`);return;
            }
        }
        name=key.slice(2);
        if(isEqual(name, 'if')){
            if(!isBoolean(item)){
                PixelDebug(`Directive compilation error;:\n\nThe return value of px*if attribute value must be a value of type "boolean"`);return;
            }
            if(!item) el.style.display='none';
            let nextEl=el.nextElementSibling;
            if(nextEl && IsValidElement(nextEl)){
            }
        }else if(isEqual(name, 'html')){
            if(item && isPrimitive(item)) el.innerHTML=item;
        }else if(isEqual(name, 'text')){
            if(item && isPrimitive(item)) el.innerText=item;
        }else if(isEqual(name, 'data')){
            
        }
               
    }
    function VNodeManager(options, self){
        const { type, attrs, children }=options
        if(!type)return;
        if (isNull(attrs)&& isNull(children))return createVNode(type);
        else if(isNull(attrs)&& !isNull(children))return createVNode(type, children, null, self );
        else if(isNull(children) && !isNull(attrs))return createVNode(type, attrs, null, self);
        else if(type && attrs && children)return createVNode(type, attrs, children, self);
    }
    function H(type, attrs=null, children=null){
        const argsCount=arguments.length;;
        if(!type){ PixelDebug('error loading vnode type\n\ntype for Vnode  function is not defined'); return; }else if(argsCount>3){
            PixelDebug(`Vnode function cannot accept more than 3 arguments,  "${ argsCount }" received`);
            return;
        }
        if(isPObject(type) || isFunction(type)){
            type=isFunction(type) ? type : Object.create(type);
            Object.defineProperty(type, 'isWidget',{value:true, enumerable:true});
            if(attrs && isPObject(attrs)){
                type.attributes=attrs;
            }else if(attrs && isNodeChildren(attrs)){
                type.children=attrs;
            }else if(children && isPObject(children)){
                type.attributes=children;
            }else if(children && isNodeChildren(children)){
                type.children=children;
            }
            return type;
        }else if( isString(type)){
            if (IS_VALID_TAGNAME(type))type=type;
            else{ PixelDebug(`invalid element tagname\n\n"${type}" is not a valid html tag name`); return;}
        }
        if(isEqual(argsCount,1))return { type };
        else if(isEqual(argsCount,2)){
            if (isNodeChildren(attrs) || attrs.isWidget) return { type, children:attrs };
            else if(isPObject(attrs)) return { type, attrs };
        }else if(isEqual(argsCount,3)){
            if (isNodeChildren(attrs) ||  attrs.isWidget && isPObject(children))return { type, children:attrs, attrs:children }
            else if(isPObject(attrs) && isNodeChildren(children) || children.isWidget )return { type, attrs, children };
            else PixelDebug(`invalid value pased to HyperScript function, \n ...\nat...>>>>>\n\n"${attrs}" <<and>>> "${children}"`);return;
        }
    }
    class WIDGET {
        constructor(){
        }
        static isClassBasedWidget=true;
    }
    const instanceManager=function(opts,self){
        if(!isNull(opts.instance)){
            if(!isFunction(opts.instance) || !isPObject(opts.instance())){
                PixelDebug(`widget instance option must be a function,\n\n and .....>>>>>\n\ninstance method must return an object`);
                return;
            }else{
                Object.defineProperty(self.$data, '$data',{value:{},writable:true, enumerable:true});
                Object.entries(opts.instance()).forEach(([key, value])=>{
                    if(isPObject(value) && value.isData){
                        Object.defineProperty(self.$data.$data, key, {value: value.value, enumerable: true, writable: true, configurable:true});
                    }else{
                        if(isPObject(value) && value.isObData){
                            delete value.isObData;
                        }
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
                    if(!isUpperCase(key.at(0))){
                        PixelDebug(`Widget registration failed, improper widget namecasing found at "${key}"\n\nwidget names must atleast start with an uppercase letter`);return;
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
    const methodsManager=function(opts, self, data){
        if(opts.methods && isPObject(opts.methods)){
            self.methods={};
            Object.entries(opts.methods).forEach(([ind, method])=>{
                if(!isNull(method) && !isFunction(method)){
                    PixelDebug(`widget method option's values must be a method or a function\n\n type of "${typeof method}" found`);return;
                }
                method=method.bind(data);
                data[ind]=method;
                self.methods[ind]=method;
            });
        }else if(!isNull(opts.methods) && !isPObject(opts.methods)){
            PixelDebug(`widget methods option must be an "object"\n\n........>>>> invalid "typeof ${typeof opts.methods}"   found`);return;
        }
    }
    const propsManager=function(opts, self={}){
        let prop;
        const props=opts.properties || opts.props || undefined;
        const attrs=opts.attributes || opts.attrs || undefined;
        if(opts.isFunctionalWidget){
            if(attrs && isPObject(attrs)){
                self.$data.$props={};
                Object.entries(attrs).forEach(([ind, attr])=>{
                    self.$data.$props[ind]=attr;
                });
            }
        }
        if(props && isPObject(props)){
            let propsSet;
            if(self.is_Custom_Node){
                propsSet=self.$props={};
            }else{
                propsSet=self.$data.$props={};
                self.$data.$attrs={};
            }
            Object.entries(props).forEach(([ind, prop])=>{
                if(isFunction(prop)){
                    if(!Object.hasOwn(attrs || {}, ind)){
                        Object.defineProperty(propsSet,ind,{value:''});
                        return;
                    }
                }
                if(isPObject(prop) && prop.required && isNull(prop.default)){
                    if(!Object.hasOwn(attrs || {}, ind)){
                        PixelDebug(`validation error........\n\nrequired property is empty\n\nat at\n    .....${ind}`);
                        return;
                    }
                }else if(isPObject(prop) && !isNull(prop.default) && !prop.required){
                    const defaultValue=prop.default;
                    if(!Object.hasOwn(attrs || {}, ind)){
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
                if(Object.hasOwn(props || {}, ind)){
                    prop=props[ind];
                    if(isFunction(prop)){
                        if(!isEqual(typeof prop(), typeof attr)){
                            PixelDebug(`validation error  .......\n\nproperty validation for widget failed, property "${ind}" is of an invalid type\n\n typeof "${typeof prop()}" expected`);
                            Object.defineProperty(propsSet,ind,{value:''});
                            return; 
                        }else{
                            Object.defineProperty(propsSet,ind,{value:attr});
                        }
                    }else if(isArray(prop)){
                        let truthy=false;
                        for (const [key, val] of prop.entries()){
                            if(isEqual(typeof val(), typeof attr)){
                                truthy=true;
                                Object.defineProperty(propsSet, ind, {value: attr});return;
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
                            if(!isEqual(typeof prop.type(), typeof attr)){
                                PixelDebug(`property validation for widget failed, property "${ind}" is of an invalid type\n\n typeof "${typeof prop.type()}" expected`);
                                Object.defineProperty(propsSet,ind,{value:''});return ;
                            }else Object.defineProperty(propsSet,ind,{value:attr});
                        }else if(isArray(prop.type)){
                            let truthy=false;
                            for (const [key, val] of prop.type.entries()){
                                if(isEqual(typeof val(), typeof attr)){
                                    truthy=true;
                                    Object.defineProperty(propsSet, ind, {value: attr});
                                }
                            }
                            if(!truthy){
                                PixelDebug(`validation error  .......\n\nproperty validation for widget failed, property "${ind}" is of an invalid type\n\n matches no type in the validation list`);
                                Object.defineProperty(propsSet,ind,{value:''});return; 
                            }
                        }
                    }
                }else{
                    //Object.defineProperty(propsSet,ind,{value:''})
                    Object.defineProperty(self.$data.$attrs, ind,{value:attr});
                }
            });
        }else if(props && !isPObject(props)){
            PixelDebug(`properties value for widget is of an invalid pattern,  must be an object\n typeof "${typeof props}" found`);return;
        }
    }
    const setupBeforeBuildHook=function(opts, self, data){
        if(!isNull(opts.beforeBuild)){
            if(!isFunction(opts.beforeBuild)){
                PixelDebug(`"beforeBuild Callback" hook must be a function \n\n type of "${typeof opts.beforeBuild}" found`);return;
            }
            self.beforeBuild=opts.beforeBuild.bind(self.$data);
            self.beforeBuild();
        }
    }
    const setupBuildHook=function(opts, self, data){
        if(!isNull(opts.onBuilt)){
            if(!isFunction(opts.onBuilt)){
                PixelDebug(`"onBuilt Callback" hook must be a function \n\n type of "${typeof opts.onBuilt}" found`);return;
            }
            self.onBuilt=opts.onBuilt.bind(data);
            self.onBuilt()
        }
    }
    const setupBeforeMountHook=function( opts, self, data){
        if(!isNull(opts.beforeMount)){
            if(!isFunction(opts.beforeMount)){
                PixelDebug(`"beforeMount Callback" hook must be a function \n\n type of "${typeof opts.beforeMount}" found`);return;
            }
            self.beforeMount=opts.beforeMount.bind(data);
        }else self.beforeMount=()=>{}
    }
    const setupMountedHook=function(opts, self, data ){
        if(!isNull(opts.onMounted)){
            if(!isFunction(opts.onMounted)){
                PixelDebug(`"onMounted callback" hook must be a function \n\n type of "${typeof opts.onMounted}" found`);return;
            }
            self.onMounted=opts.onMounted.bind(data);
        }else self.onMounted=()=>{}
    }
    const setupBeforeUpdateHook=function(opts, self, data, wheel){
        if(isLTE(wheel, 1))return;
        if(!isNull(opts.beforeUpdate)){
            if(!isFunction(opts.beforeUpdate)){
                PixelDebug(`"beforeUpdate Callback" hook must be a function \n\n type of "${typeof opts.beforeUpdate}" found`);return;
            }
            self.beforeUpdate=opts.beforeUpdate.bind(data);
            self.beforeUpdate()
        }else self.beforeUpdate=()=>{}
    }
    const setupOnUpdatedHook=function(opts, self, data, wheel){
        if(isLTE(wheel, 1))return;
        if(!isNull(opts.onUpdated)){
            if(!isFunction(opts.onUpdated)){
                PixelDebug(`"onUpdated Callback" hook must be a function \n\n type of "${typeof opts.onUpdated}" found`);return;
            }
            self.onUpdated=opts.onUpdated.bind(data);
        }else self.onUpdated=()=>{}
    }
    
    const compileStyleClasses=function(opts, self, data){
        if(!isNull(opts.styleClass && isPObject(opts.styleClass))){
            data.$styles={};
            Object.entries(opts.styleClass).forEach(([ind, style])=>{
                if(!isNull(style) && !isPObject(style)){
                    PixelDebug(`property value of style is of an invalid type, an object required....>>\n\n.....typeof ${typeof style} fount`); return;
                }
                data.$styles[ind]=style;
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
    const configurationSetup=function(opts, self, el, data){
        if(IsValidElement(el) && !el.isPixel_Fragment){
            let inheritStyles=true;
            let inheritAttrs=true;
            if(!isNull(opts.buildConfig) && isPObject(opts.buildConfig)){
                Object.entries(opts.buildConfig).forEach(([ind, val])=>{
                    if(isEqual(ind,'inheritStyles')){
                        inheritStyles=opts.buildConfig.inheritStyles;
                    }else if(isEqual(ind, 'inheritAttrs')){
                        inheritAttrs=opts.buildConfig.inheritAttrs;
                    }
                });
            }
            if(inheritStyles && !isNull(data.$styles) && isPObject(data.$styles)){
                Object.entries(data.$styles).forEach(([ind, val])=>{
                    Object.entries(val).forEach(([key, value])=>{
                        el.style[key]=value;
                    });
                });
            }
            if(inheritAttrs && !isNull(data.$attrs) && isPObject(data.$attrs)){
                Object.entries(data.$attrs).forEach(([ind, attr])=>{
                    el.setAttribute(ind, attr);
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
    let target=null
    class Dependency {
      constructor() {
        this.subscribers = [];
      }
      depend() {
        if (target && !this.subscribers.includes(target)) {// Only if there is a target & it's not already subscribed
          this.subscribers.push(target);
        }
      }
      notify(key) {
        this.subscribers.forEach(sub => sub());
      }
    }
    function watcher(func){//a watcher function that helps with the replay and depends notification methods
        target=func;
        target();
        target=null;
    }
    const sanitizedOptions=function(args, self){
        const count=args.length
        if(!args){ PixelDebug('error loading widget\n\ntype for Vnode  function is not defined'); return; }else if(isGT(count,3)){
            PixelDebug(`PixelBuild function cannot accept more than 3 arguments,  "${ count }" received`);
            return;
        }
        if(isPObject(args[0]) || isFunction(args[0]) && isEqual(count, 1))return args[0];
        else if(isEqual(count, 2) && isPObject(args[1]) ){
            args[0].attributes=args[1];
            return args[0];
        }else if(isEqual(count, 3)) {
            args[0].children=args[2];
        }
    }
    const appendClassToSelector = function(selector, className){
        const trimmed = selector.trim();
        const modified = trimmed ? `.${className} ${trimmed}` : trimmed;
        return modified;
    };
    const cssStylesheetCompilation=function(opts, self, el){
        if(opts.styleSheet || opts.styles){
            let cssStylesheet=opts.styleSheet || opts.styles
            if(!isString(cssStylesheet)){
                PixelDebug(`Invalid Value Type...\n\nstyleSheet must be in string value format`);
                return;
            }///attempt to add css rules to thw build shadow root
            const styleEl=createVNode('style', { type:'text/css',}, null);
            const id=Math.floor(Math.random()*(100000000 * 9999999999999) + 10000000);
            const selectorPattern = /([^\r\n{]+)\s*{/g;
            
            
            if(el.isPixel_Fragment){
               /* const container=createVNode('div');
                let shadowRoot=container.attachShadow({ mode: 'open' });*/
                /*const ModifiedCssStylesheet=cssStylesheet.replace(selectorPattern, (match, text)=>{
                    text=appendClassToSelector(text, `PX${shadowRoot.host.__PX_ID}`)
                    return text
                })
                shadowRoot.host.classList.add(`PX${shadowRoot.host.__PX_ID}`)*/
                styleEl.innerHTML=cssStylesheet;
                el.appendChild(styleEl);
                /*const clone=container.cloneNode(true);
                clone.appendChild(el)
                shadowRoot.appendChild(clone);
                shadowRoot.isPixeShadowRoot=true
                el=shadowRoot;*/
            }else {
                styleEl.innerHTML=cssStylesheet;
                el.classList.add(`PX${el.__PX_ID}`);
                el.appendChild(styleEl);
            }
        }
        return el
    }
    const widgetChildrenSlot=function(self, opts, el, packData ){
        const children=opts.children
        if(children){
            self.$data.$slots={};
            let template=H('template',{slot:'default'});
            template=compileTemplate(template, self, el);
            Object.entries(children).forEach(([ind, value])=>{
                value=compileTemplate(value, self );
                if(isEqual(value.localName, 'template')){
                    const name=value.getAttribute('slot');
                    Object.defineProperty(self.$data.$slots, name || 'default', {value: value, configurable: true, enumerable: true});
                }else{
                    template.append(value);
                    Object.defineProperty(self.$data.$slots, 'default', {value: template, configurable: true, enumerable: true});
                }
            })
            const slots=el.querySelectorAll('slot');
            Object.entries(slots || []).forEach(([ind, slotEl])=>{
                const name=slotEl.getAttribute('name');
                if(name && isString(name)){
                    let content;
                    if(self.$data.$slots && Object.hasOwn(self.$data.$slots, name)){
                        content=self.$data.$slots[name];
                        const fragment=createFragment();
                        Object.entries(content.childNodes).forEach(([ind, myel])=>{
                            fragment.append(myel);
                        });
                        slotEl.innerHTML=null;
                        slotEl.append(fragment);
                    }
                }else if(!name){
                    let content;
                    if(self.$data.$slots && Object.hasOwn(self.$data.$slots, 'default')){
                        content=self.$data.$slots['default'];
                        const fragment=createFragment();
                        Object.entries(content.childNodes).forEach(([ind, myel])=>{
                            fragment.append(myel);
                        });
                        slotEl.innerHTML=null;
                        slotEl.append(fragment);
                    }
                }
            });
            if(isEqual(slots.length, 0) && !el.isPixel_Fragment && !el.innerHTML){
                let inheritSlots=true;
                if(opts.buildConfig && !isNull(opts.buildConfig.inheritSlots)){
                    if(!isBoolean(opts.buildConfig.inheritSlots)){
                        PixelDebug(`Value Error\n\n "inheritSlots" value cannot be compiled\n boolean value format required`);return;
                    }
                    inheritSlots=opts.buildConfig.inheritSlots;
                }
                if(!inheritSlots)return;
                const content=self.$data.$slots['default'];
                const fragment=createFragment();
                Object.entries(content.childNodes).forEach(([ind, myel])=>{
                    fragment.append(myel);
                })
                el.append(fragment);
            }
        }
    }
    const setConfig=function(opts, self){
        if(opts.buildConfig && isPObject(opts.buildConfig)){
            Object.defineProperty(self.$data, 'config', {value:opts.buildConfig, configurable: true, enumerable:true, writable: true});
        }else if(opts.buildConfig && !isPObject(opts.buildConfig)){
            PixelDebug(`Value Error\n\nbuild Configuration must be an object type format or is undefined`);return;
        }
    }
   function PixelBuild(options, properties=null, children=null){
       options=sanitizedOptions(arguments, this);
       if(isNull(this)){
           PixelDebug(`build instanciation error\n\nunable to compile build widget,  .......this might be due to missing constructor's "new" keyword in PixelBuild call\n "PixelBuild is a constructor function, must be called with the "new" constructor keyword`);return;}
        this.$data={};
        setupBeforeBuildHook(options, this, this.$data)
        options=BasedWidgets(options, this);
        instanceManager(options, this);
        widgetsSetup(options, this);
        propsManager(options, this);
        methodsManager(options, this, this.$data);
        compileStyleClasses(options, this, this.$data);
        Object.keys(this.$data.$data || {}).forEach(key=>{
            let internalValue=this.$data.$data[key];// plain data that isn'nt passed to proxy
            const dep=new Dependency()//here trying to store all the value of our data dependency in a class
            Object.defineProperty(this.$data.$data, key, {
                get(){
                dep.depend();//thishelps remembet the stored functiom of changes
                    return internalValue;
                },
                set(newvalue){
                    if(isFunction(internalValue)){
                    PixelDebug(`unable to set value on a function`);return false;
                    }
                    internalValue=newvalue;
                   dep.notify(key);//this will rerun these functiins
                    return true;
                }
            });
        })
        let wheel=0;
        watcher(()=>{
            wheel+=1;
            setupBeforeUpdateHook(options, this, this.$data, wheel);
            this.renderFunction=function(build){
                setConfig(options, this);
                let node=compileTemplate(build, this, null);
                node=cssStylesheetCompilation(options, this, node);
                configurationSetup(options, this, node, this.$data);//setting the buildConfig option
                widgetChildrenSlot(this, options, node);
                this.$data.$el=node;
                return node;
        
            }
            if(isNull(options.build)){PixelDebug(`unable to build widget\n\n  ,no build function provided for this widget`);return;}
            options.build=options.build.bind(this.$data);
            const build=this.renderFunction(options.build(this.$data.$props||{},{emits:this.methods || undefined,attrs:this.$data.$attrs || undefined, styles:this.$data.$styles || undefined, slots:this.$data.$slots || undefined}));
            Object.defineProperty(this, 'build', {value:build, writable:true, enumerable:true, configurable:true});
            setupOnUpdatedHook(options, this, this.$data, wheel);
        })
        setupBuildHook(options, this, this.$data);
        // delete this.widgets;
        delete this.renderFunction;
        setupBeforeMountHook(options, this, this.$data);
        setupMountedHook(options, this, this.$data);
    }
    PixelBuild.prototype.mountRoot=mountRoot;
    function mountRoot(nodeSelector){
        this.beforeMount();
        delete this.beforeMount;
        if(isNull(nodeSelector)){PixelDebug(`no node instance or selector value passed to widget mountroot`); return;}
        let domRoot;
        if(isString(nodeSelector)){
            domRoot=document.querySelector(nodeSelector);
            if(!IsValidElement(domRoot)){
                PixelDebug(`error mounting widget, target not a valid element`);
                return;}
            domRoot.innerHTML=null;
        }else if(IsValidElement(nodeSelector)){
            domRoot=nodeSelector;
            domRoot.innerHTML=null;
        }
        if(domRoot.iS_PIXEL_MOUNTROOT){
            PixelDebug(`A Pixel widget has already been mounted on this element, cannot mount more than one Wdget on a single root element`);
            return;
        }else{
            const id=Math.floor(Math.random()*(12 * 99) + 766);
            const MoutRootToken={
                iS_PIXEL_MOUNTROOT:true,
                __mountRootToken:'px__'+id,
                widgets:this.widgets || undefined,
                __properties: this.properties || undefined,
                __$data:this.$data || undefined
            }
            let wheel=0;
            watcher(()=>{
                Object.entries(this.$data).forEach(([key, data])=>{
                    let newData=data;
                })
                const template=this.build;
                domRoot.innerHTML=null;
                domRoot.append(template);
                Object.defineProperty(domRoot, 'px__VNode',{value:id});
                Object.assign(domRoot, MoutRootToken);
                wheel+=1;
                if(isGT(wheel, 1)) this.onUpdated();
            })
            this.onMounted();
            delete this.onMounted;
            return domRoot;
        }
    }
    function data(val){
        if (isPObject(val)){
            Object.defineProperty(val, 'isObData',{value:true, enumerable:true});
            return val;
        }else if(isPrimitive(val) || isArray(val)){
            let react={};
            Object.defineProperty(react, 'isData',{value:true, enumerable:true});
            Object.defineProperty(react, 'value',{value:val, enumerable:true, writable: true});
            return react;
        }
        return val;
    }
    function compileTemplate(build, self, element){
        if(isPrimitive(build)){
            if(hasSpecialCharacters(build)) build=resolveAccessor(self.$data, build, self.$data.config);
            element=document.createTextNode(build);
        }else if(build.isWidget && isPObject(build) || isFunction(build)){
            const fr=createFragment();
            const widget=new PixelBuild(build);
            element=widget.mountRoot(fr);
        }else if(!isArray(build)){
            if(IS_VALID_TAGNAME(build.type)){
                element=VNodeManager(build, self, element);
            }else if(isPObject(build)){
                 element=patchChildWidget(self,null,'widgets',build);
            }
        }else if(isArray(build)){
            element=createFragment();
            Object.defineProperty(element,'widgets',{value:self.widgets || {}});
            try { 
                Object.entries(build).forEach(([ind, value])=>{
                    element=childrenSet(value, element, self);
                });
            }catch(err){
                PixelDebug(`Tag Value Error::\n\nelement "${build}" might be  missing an end tag\n\n${err}`);return element;
            }
        }
        return element
    }
    function patchChildWidget(obj, element, widgets, value){
        if(!isPObject(obj[widgets]) && !isPObject(APP_WIDGETS) || !Object.hasOwn(obj[widgets]|| {}, value.type) && !Object.hasOwn(APP_WIDGETS, value.type) && !Object.hasOwn(CUSTOM_NODES, value.type) && !Object.hasOwn(BUILT_IN_WIDGETS, value.type)){
            PixelDebug(`Template Compilation Error::\n\nUnresolved tagname "${value.type}"\n\n   ...if this is a pixel widget, make sure its registered through the "widgets" option or resolved through the custom nodemake resolver`);
            return element ;}
        if (Object.hasOwn(obj[widgets] || {}, value.type ) || Object.hasOwn(APP_WIDGETS, value.type) || Object.hasOwn(BUILT_IN_WIDGETS, value.type)){
            let widget=APP_WIDGETS[value.type] || obj[widgets][value.type] || BUILT_IN_WIDGETS[value.type];
            widget=isFunction(widget) ? widget.bind({}) : Object.create(widget);
            if(value.attrs){
                Object.entries(value.attrs).forEach(([ind, prop])=>{
                    //const { ky, value:val }=pxBind(prop, ind);
                    if(ind.startsWith('**') && isGT(ind.length,2)){
                        let name;
                        let item;
                        try{
                            const { value, ky }= pxBind(prop, ind);
                            item=value;
                            name=ky;
                        }catch(err){
                            name=ind.slice(2);
                            try{
                                item=EvaluateTHIS(obj.$data, prop);
                                
                                if(!item && isNull(item)){
                                    PixelDebug(`value "${prop}" property value was accessed during render, but not initialized on instance or is undefined\n\nat at\n ..."${name} property `);return;
                                }
                            }catch(error){
                                PixelDebug(`value "${prop}" property value was accessed during render, but not initialized on instance\n\nat at\n ..."${name} property`);return;
                            }
                        }
                        delete value.attrs[ind];
                        value.attrs[name]=item;
                    }
                })
            
                widget.attributes=value.attrs;
            }
            widget.children=value.children || undefined;
            const build=new PixelBuild(widget);
            const child=build.mountRoot(createFragment());
            if(!isNull(element)){element.append(child); return element;}
            else return child;
        }else if(Object.hasOwn(CUSTOM_NODES, value.type)){
            const el=CUSTOM_NODES[value.type];
            if(!isNull(element)){element.append(el); return element;}
            else return el;
        }
    }
    function createFragment(){
        const fragment=new DocumentFragment();
        Object.defineProperty(fragment, 'isPixel_Fragment',{value:true});
        return fragment;
    }
    const devInfo='You are using the development build version of pixel, make sure you switched to the minified build version when deploying to production with the (*.min.js) file extension';
    function setupFunctionWidget(opts, self){
        const widget={};
        widget.build=opts;
        if(opts.attributes)widget.attributes=opts.attributes;
        if(!isNull(opts.isWidget))widget.isWidget=opts.isWidget;
        const waitForReturnObjects=['properties','methods','styleClass','widgets','buildConfig'];
        Object.entries(validWidgetOptions).forEach(([key, val])=>{
            if(!isNull(opts[val])){
                let value=opts[val];
                if(mapValue(waitForReturnObjects, val) && isFunction(value))value=opts[val]();
                widget[val]=value;
            }
        });
        Object.entries(opts).forEach(([key, val])=>{
            if(!mapValue(validWidgetOptions, key ) && !mapValue(['props','context'], key)){
                self.$data[key]=val;
            }
        })
        return widget;
    }
    function Register(nameOrObj, widgets=null){
        const argsCount=arguments.length;
        if(isEqual(argsCount,2)){
            if(!isString(nameOrObj)){
                PixelDebug(`widget name must be a string`); return;
            }
            if(!widgets || isNull(widgets) && !isPObject(widgets) || !isFunction(widgets)){
                PixelDebug(`unable to register widget, Unresolved widget registeration`);return;
            }
            if(!isUpperCase(nameOrObj.at(0))){
                PixelDebug(`global widget registration falure.....>.\n\nwrong naming for global widget registration\n\nat at\n"${nameOrObj}">.>, widgets names are required to start with an uppercase letter`);return;
            }
            Object.defineProperty(APP_WIDGETS, nameOrObj, {value:widgets});
        }else if( isPObject(arguments[0]) || isFunction(arguments[0]) && isEqual(argsCount,1)){
            arguments[0]=isFunction(arguments[0]) ? arguments[0]() : arguments[0];
            Object.entries(arguments[0]).forEach(([ind, widget])=>{
                if(!isUpperCase(ind.at(0))){
                    PixelDebug(`global widget registration falure.....>.\n\nwrong naming for global widget registration\n\nat at\n"${ind}">.>, widgets names are required to start with an uppercase letter`);return;
                }
                if(!isPObject(widget)){
                    PixelDebug(`unable to register widget, Unresolved widget registeration`); return;
                }
                APP_WIDGETS[ind]=widget;
            })
        }
    }
    const InBuiltStyles={
        primary:{background:'#cfe2ff',borderColor:' #b6d4fe',color:'#084298',},
        success:{color: '#0f5132',background: '#d1e7dd',borderColor: ' #badbcc'},
        light:{color: '#636464',background: '#fefefe',borderColor: '#fdfdfe'},
        danger:{color: '#842029',background: '#f8d7da',borderColor: '#f5c2c7'},
        warning:{color: '#664d03',background: '#fff3cd',borderColor: '#ffecb5'},
        info:{color: '#055160',background: '#cff4fc',borderColor: '#b6effb'},
        secondary:{color: '#41464b',background: '#e2e3e5',borderColor: '#d3d6d8'},
        dark:{color: '#141619',background: '#d3d3d4',borderColor: '#bcbebf'}
    }
    class PX extends WIDGET{
        constructor(){
            super()
        }
        static BUILT_IN_WIDGET=true
        properties={
             ref:{
                 type:[Object, Function, String],
                 required:true
             },
             props:{
                 type:[Object],
                 default:{}
             }
        }
        build({ ref, props }){
            return H(isString(ref) ? parseScript(ref) : ref,  props )
        }
    }
    Object.defineProperty(BUILT_IN_WIDGETS, 'PX', {value: PX, configurable:true})
    class Button extends WIDGET{
        constructor(){
            super()
        }
        static BUILT_IN_WIDGET=true;
        instance(){
            return {
                InBuiltStyles
            }
        }
        properties={
            color:{
                type:String,
                default:'primary'
            },
            title:{
                type:String,
                default:'Click me'
            },
            style:Object,
            diabled:Boolean
        }
        build({color, title, disabled}, {styles}){
            return H('button',{ style: this.setStyles() }, H('slot',title ))
        }
        styleClass={
            defaultStyles:{padding:'5px 10px 5px 10px',borderRadius:'7px',fontWeight:'bold',margin:'10px',fontSize:'20px',borderStyle: 'outset',borderWidth:'2px',textAlign:'center'}
        }
        methods={
            setStyles(){
                const color=this.$props.color;
                return this.InBuiltStyles[color];
            }
        }
    }
    Object.defineProperty(BUILT_IN_WIDGETS, 'Button', {value: Button, configurable:true})
    const Compile = function (tag, setup, rest, est) {
        var negate;setup[0] = 0;
        for (var hyper = 1; hyper < setup.length; hyper++) {
            var viewer = setup[hyper++],
            param = setup[hyper] ? (setup[0] |= viewer ? 1 : 2,
            rest[setup[hyper++]]) : setup[++hyper];
            isEqual(3, viewer) ? est[0] = param : isEqual(4, viewer) ? est[1] = Object.assign(est[1] || {}, param) : isEqual(5, viewer) ? (est[1] = est[1] || {})[setup[++hyper]] = param : isEqual(6, viewer) ? est[1][setup[++hyper]] += param + "" : viewer ? (negate = tag.apply(param, Compile(tag, param, rest, ["", null])),
            est.push(negate), param[0] ? setup[0] |= 2 : (setup[hyper - 2] = 0,
            setup[hyper] = negate)) : est.push(param);
        }
        return est;
    },
    tag = new Map();
    function TemplateStrings (setup) {
        var rest = tag.get(this);
        return rest || (rest = new Map(), tag.set(this, rest)),
        (rest = Compile(this, rest.get(setup) || (rest.set(setup, rest = function (Compile) {
            for (var tag, setup, rest = 1, est = "", negate = "", hyper = [0],
            viewer = function (Compile) {
                1 === rest && (Compile || (est = est.replace(/^\s*\n\s*|\s*\n\s*$/g, ""))) ? hyper.push(0, Compile, est) : isEqual(3, rest) && (Compile || est) ? (hyper.push(3, Compile, est), rest = 2) : isEqual(2, rest) && isEqual("...", est) && Compile ? hyper.push(4, Compile, 0) : isEqual(2, rest) && est && !Compile ? hyper.push(5, 0, !0, est) : rest >= 5 && ((est || !Compile && isEqual(5, rest)) && (hyper.push(rest, 0, est, setup), rest = 6), Compile && (hyper.push(rest, Compile, 0, setup), rest = 6)), est = "";
            },
                param = 0; param < Compile.length; param++) {
                    param && (isEqual(1, rest) && viewer(), viewer(param));
                    for (var light = 0; light < Compile[param].length; light++) 
                    tag = Compile[param][light], isEqual(1, rest) ? isEqual("<", tag) ? (viewer(), hyper = [hyper],
                    rest = 3) : est += tag : isEqual(4, rest) ? isEqual("--",  est) && isEqual(">", tag) ? (rest = 1, est = "") : est = tag + est[0] : negate ? isEqual(tag, negate) ? negate = "" : est += tag : isEqual('"', tag) || isEqual("'", tag) ? negate = tag : isEqual(">", tag) ? (viewer(), rest = 1) : rest && (isEqual("=", tag) ? (rest = 5, setup = est, est = "") : isEqual("/", tag) && (rest < 5 || isEqual(">", Compile[param][light + 1])) ? (viewer(), isEqual(3, rest) && (hyper = hyper[0]), rest = hyper, (hyper = hyper[0]).push(2, 0, rest), rest = 0) : isEqual(" ", tag) || isEqual("\t", tag) || isEqual("\n", tag) || isEqual("\r", tag) ? (viewer(), rest = 2) : est += tag), isEqual(3, rest) && isEqual("!--", est) && (rest = 4, hyper = hyper[0]);}return viewer(), hyper;}(setup)), rest), arguments, [])).length > 1 ? rest : rest[0];
    }
    function StringAlign(type, attrs, ...children){
        return { type, attrs, children }
    }
    const Template=TemplateStrings.bind(StringAlign)
    function NodeMake(opts){
        this.is_Custom_Node=true
        if(!isPObject(opts)){PixelDebug(`NodeMake option values must be type of object......>>>>`);return;}else if(isGT(arguments.length, 1)){PixelDebug(`NodeMake parameter values required only 1 argument.....\n\n${arguments.length} given>>>>>>>>>>>`);return;}
        const isValidNodeMakeopts=opt=>mapValue(['template','styles','plugins','name','props'],opt);
        Object.entries(opts).forEach(([key, value])=>{
            if(!isValidNodeMakeopts(key)){PixelDebug(`invalid value....\n\n "${key}" is not a recognised NodeMake argument `);return;}
            if(isEqual(key, 'styles') && !isString(value)){PixelDebug(`styleSheet for custom elements must be of type "Strings of css styleSheets"`);return;}
            if(isEqual(key,'props')){
                if(!isPObject(opts.props)){PixelDebug(`props value for Custom Node must be of type "object"\n\n typeof "${typeof opts.props}" found`);return;}
            }
        });
        if(!isNull(opts.props))propsManager(opts, this)
        if(isNull(opts.template)){PixelDebug(`Custom element required a template option`);return;}
        if(isNull(opts.name)){PixelDebug('Custom node does not have a name option\n\nname required for node registration....');return;
        }else if(!isString(opts.name)){PixelDebug(`unrecovered  value type\nNodeMake name option required value of type "Strings"\n\n"${typeof opts.name}" found`);return;
        } else if(IS_VALID_TAGNAME(opts.name)){PixelDebug(`"${opts.name}" is an Html tag name .....\n\nshould not be used in Custom nodes`);return;
        }else if(IS_HTML_DEPRECATED_TAG(opts.name)){PixelDebug(`an Html depreciated element tagname, \n\nshould not be used for CUSTOM_NODES`);return;
        }else if(!opts.name.includes('-')){PixelDebug(`Custom Nodes are termed to be named differently by using multiwords saperated by the hyphen sign\n\n Node with name "${opts.name}" is invalid.......`);return;}
        if(!isNull(opts.plugins)){
            if(isFunction(opts.plugins))opts.plugins();
            else if(isPObject(opts.plugins) || isArray(opts.plugins)){
            }else{
                PixelDebug(`plugin type not supported for custum node`);return;
            }
        }
        const template=compileTemplate(opts.template, {}, null);
        cssStylesheetCompilation(opts, null, template);
        this.name=opts.name;
        this.template=template;
        return template.outerHTML;
    }
    NodeMake.prototype.resolve=resolve;
    function resolve(){
        Object.defineProperty(CUSTOM_NODES, this.name, {value: this.template, enumerable: true})
    }
    function resolveType(data, type){
        let res=false
        if(isFunction(type))type=type.name.toLowerCase()
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
    const REQUEST_METHODS=['POST','GET','PUT','TRACE','OPTIONS','HEAD','DELETE','PATCH'];
    const isValidRequestMethod=method=>mapValue(REQUEST_METHODS, method)
    function Server(args, setup, pack){
        const argCount=arguments.length;
        let url;
        let opts;
        let config;
        let method='GET';
        const xhr=new XMLHttpRequest()
        if(isEqual(argCount, 1) && !isNull(args)){
            if(!isPObject(args) && !isString(args)){
                PixelDebug(`Server object value is of an invalid type "${typeof args }", \n\nmust be an object or a url string value, \n\n defaults to a "Get" request method`);return;
            }
            if(isString(args)){
                url= args || undefined;
                return send(method, url);
            }else if(isPObject(args)){
                opts=args || undefined;
                if(!hasExistenceAndType(opts.url, String,'url'))return;
                else{
                    url=opts.url;
                    delete opts.url;
                }
                if(opts.method && isString(opts.method)) {
                    method=opts.method.toUpperCase();
                    if(!isValidRequestMethod(method)){
                        PixelDebug(`Server Error\n\n${method } is not a valid request method`);return;
                    }
                    delete opts.method
                }else if(opts.method && !isString(opts.method)){
                    PixelDebug(`found an invalid value at the "${opts.method}" option\n\n must be a "string"  type value of a valid request method`);return;
                }
                return send(method, url, opts)
            }
        }else if( isEqual(argCount, 2)){
            if(args){
                if(!isString(args)){
                    PixelDebug(`first argument must ba a string consisting of the access url link\n\n found an unrecognized type`);return;
                }
                url=args;
            }else if(setup){
                if(!isPObject(setup) ){
                    PixelDebug(`improper Config object value\n\n....at pos 2\nan object type format required`);return;
                }
                config=setup
            }
            return send(method, url, config )
        }else if(isEqual(argCount, 3)){
            if(!isString(args) && !isString(setup)){
                    PixelDebug(`Get and url values may be an invalid value type\n\n argument must ba a string consisting of the access url link\n\n found an unrecognized type\n\nat at pos 2`);return;
                }else if(!isPObject(pack)){
                    PixelDebug(`improper Config object value\n\n....at pos 3\nan object type format required`);return;
                }
            method=args.toUpperCase();
            url=setup;
            Config=pack
            return send(method, url, config)
        }
        function send(method, url, options = {}) {
            return new Promise((resolve, reject) => {
                xhr.open(method, url, true);
                if (options.headers) {
                    for (const header in options.headers) {
                        xhr.setRequestHeader(header, options.headers[header]);
                    }
                }
                xhr.onload = function () {
                    if (xhr.status >= 200 && xhr.status < 300) {
                        let response;
                        const contentType = xhr.getResponseHeader('Content-Type');
                        if (contentType && contentType.includes('application/json')) {
                            try {
                                response = JSON.parse(xhr.responseText);
                            } catch (error) {
                                reject(new Error('Error parsing JSON response'));return;
                            }
                        }
                        resolve(response);
                    } else {
                        reject(new Error(`Error: ${this.status}`));
                    }
                };
                xhr.onerror = function (err) {
                    PixelDebug(`Pixel Server Error:: with ${xhr.status} status code`);
                    reject(new Error('Pixel Server error'));
                };
                if (options.timeout) {
                    xhr.timeout = options.timeout;
                    xhr.ontimeout = function () {
                        reject(new Error('Server timeout'));
                    };
                }
                let data = null;
                if (options.body) {
                    data = JSON.stringify(options.body);
                    xhr.setRequestHeader('Content-type', 'application/json');
                }
                if (options.credentials) {
                    xhr.withCredentials = true;
                }
                if (options.onProgress) {
                    xhr.addEventListener('progress', options.onProgress);
                }
                if (options.onUpload) {
                    xhr.upload.addEventListener('progress', options.onUploadProgress);
                }
                if (options.onDownload) {
                    xhr.addEventListener('progress', options.onDownloadProgress);
                }
                if (options.onAbort) {
                    xhr.addEventListener('abort', options.onAbort);
                }
                if (options.responseType) {// Response Type
                    xhr.responseType = options.responseType;
                }
                let isCanceled = false;// Cancellation
                const cancelToken = options.cancelToken;
                if (cancelToken) {
                    cancelToken.promise.then(() => {
                    isCanceled = true;
                    xhr.abort();
                    });
                }
                if (options.auth) {  // Authentication
                    const { username, password } = options.auth;
                    const credentials = btoa(`${username}:${password}`);
                    xhr.setRequestHeader('Authorization', `Basic ${credentials}`);
                }
                if (options.params) { // Query Parameters
                    const params = Object.entries(options.params)
                        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
                        .join('&');
                    url += `?${params}`;
                }
                xhr.send(data);
            });
        }
        // Additional Features
        /**
        * Perform a request with automatic request cancellation.
        * @param {string} url - The URL to request.
        * @param {object} options - Additional options for the request (optional).
        * @returns {Promise} - A promise that resolves with the response or rejects with an error.
         */
        function cancelableRequest(url, options = {}) {
            const controller = new AbortController();
            options.signal = controller.signal;

            const requestPromise = send(options.method || 'GET', url, options);
            requestPromise.cancel = () => {
            controller.abort();
            };
            requestPromise.then = function(onSuccess, onError) {
                return requestPromise.then(onSuccess).catch(onError)
            };
            return requestPromise;
        }
        /**
        * Perform a request with request interception before sending.
        * @param {string} url - The URL to request.
        * @param {function} interceptor - The interceptor function to modify the request options.
        * @returns {Promise} - A promise that resolves with the response or rejects with an error.
        */
        function interceptedRequest(url, interceptor) {
            const options = {};
            interceptor(options);
            const promise = send(options.method || 'GET', url, options);
            promise.then = function (onSuccess, onError) {
                return promise.then(onSuccess).catch(onError);
            };
            return promise;
        }

    }
    const sendRequest=(method, url, options={}, body=null)=>{
        if(body) options.body=body
        const promise=Server(url, options);
        promise.then = function (onSuccess, onError) {
            return promise.then(onSuccess).catch(onError);
        };
        return promise 
    }
    const REQUEST_METHODS__CALLBACKS={
        get(url, options = {}) {
            const promise = sendRequest('GET', url, options);
            return promise;
        },
        post(url, body, options = {}) {
            const promise=sendRequest('POST', url, options, body);
            return promise;
        },
        delete(url, options = {}) {
            const promise = sendRequest('DELETE', url, options);
             return promise;
        },
        put(url, body, options = {}) {
            const promise = sendRequest('PUT', url, options, body);
            return promise;
        },
        patch(url, body, options= {}){
            const promise=sendRequest('PATCH', url, options, body);
            return promise
        },
        trace(url, options={} ){
            const promise=sendRequest('TRACE', url, options);
            return promise
        },
        head(url, options={}){
            const promise=sendRequest('HEAD', options);
            return promise
        },
        options(url, options={}){
            const promise=sendRequest('OPTIONS', options);
            return promise
        }
    }
    Object.entries(REQUEST_METHODS__CALLBACKS).forEach(([name, callback])=>{
        Object.defineProperty(Server, name, {value:callback, configurable:false, writable:false, enumerable:true})
    })
    async function AsyncWidget(opts){
        opts.isAsync=true
        options=await opts
        return options
    }
    function defineWidget(opts){
        if(!isPObject(opts)){
            PixelDebug(`Value Error\n\n invalid value for the defineWidget macro\n/...requires an object type format`);return;
        }else if(isGT(arguments.length, 1)){
            PixelDebug(`Parameter Error\n\nmax-one argument required\n ${arguments.length} given`);return;
        }
        return opts
    }
    global.get_version=get_version//dev
    global.H=H
    global.Server=Server
    global.PixelBuild=PixelBuild
    global.log=log//dev
    global.AsyncWidget=AsyncWidget
    global.defineWidget=defineWidget
    global.Register=Register
    global.Template=Template
    global.WIDGET=WIDGET
    global.data=data
    global.createVNode=createVNode
    global.NodeMake=NodeMake
    global.PX=PX
    global.Debug=PixelDebug//dev
    console.info(devInfo)//dev
    return global
})(({}));