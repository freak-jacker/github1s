!function(e,t){for(var n in t)e[n]=t[n]}(exports,function(e){var t={};function n(o){if(t[o])return t[o].exports;var i=t[o]={i:o,l:!1,exports:{}};return e[o].call(i.exports,i,i.exports,n),i.l=!0,i.exports}return n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)n.d(o,i,function(t){return e[t]}.bind(null,i));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=7)}([function(e,t){e.exports=require("vscode")},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.b64DecodeUnicode=t.getWebviewOptions=t.getNonce=t.prop=t.uniqueId=t.dirname=t.joinPath=t.trimEnd=t.trimStart=t.noop=t.setExtensionContext=t.getExtensionContext=t.throttle=t.reuseable=t.fetch=void 0;const o=n(0);var i=n(3);Object.defineProperty(t,"fetch",{enumerable:!0,get:function(){return i.fetch}});var r=n(4);Object.defineProperty(t,"reuseable",{enumerable:!0,get:function(){return r.reuseable}}),Object.defineProperty(t,"throttle",{enumerable:!0,get:function(){return r.throttle}});var a=n(5);Object.defineProperty(t,"getExtensionContext",{enumerable:!0,get:function(){return a.getExtensionContext}}),Object.defineProperty(t,"setExtensionContext",{enumerable:!0,get:function(){return a.setExtensionContext}});t.noop=()=>{};t.trimStart=(e,t=" ")=>{let n=0;for(;-1!==t.indexOf(e[n]);)n++;return e.slice(n)};t.trimEnd=(e,t=" ")=>{let n=e.length;for(;n&&-1!==t.indexOf(e[n-1]);)n--;return e.slice(0,n)};t.joinPath=(...e)=>e.length?e.reduce((e,n)=>t.trimEnd(e,"/")+"/"+t.trimStart(n,"/")):"";var s;t.dirname=e=>{const n=t.trimEnd(e,"/");return n.substr(0,n.lastIndexOf("/"))||""},t.uniqueId=(s=1,()=>s++);t.prop=(e,t=[])=>{let n=e;return t.forEach(e=>n=n?n[e]:void 0),n};t.getNonce=()=>{let e="";const t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";for(let n=0;n<32;n++)e+=t.charAt(Math.floor(Math.random()*t.length));return e};t.getWebviewOptions=e=>({enableScripts:!0,localResourceRoots:[o.Uri.joinPath(e,"assets")]});t.b64DecodeUnicode=e=>decodeURIComponent(atob(e).split("").map((function(e){return"%"+("00"+e.charCodeAt(0).toString(16)).slice(-2)})).join(""))},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.validateToken=t.readGitHubFile=t.readGitHubDirectory=void 0;const o=n(0),i=n(3),r=e=>{const[t,n,o]=(e.authority||"").split("+").filter(Boolean);return{owner:t,repo:n,branch:o,path:e.path}},a=e=>{if(e instanceof i.RequestRateLimitError){if(!e.token)throw o.FileSystemError.NoPermissions("API Rate Limit Exceeded, Please Offer an OAuth Token.");throw o.FileSystemError.NoPermissions("API Rate Limit Exceeded, Please Change Another OAuth Token.")}if(e instanceof i.RequestInvalidTokenError)throw o.FileSystemError.NoPermissions("Current OAuth Token Is Invalid, Please Change Another One.");if(e instanceof i.RequestNotFoundError)throw o.FileSystemError.NoPermissions("Current OAuth Token Is Invalid, Please Change Another One.");if(e instanceof i.RequestNotFoundError)throw o.FileSystemError.FileNotFound("GitHub Resource Not Found");throw o.FileSystemError.Unavailable(e.message||"Unknown Error Occurred When Request To GitHub")};t.readGitHubDirectory=e=>{const t=r(e);return i.fetch(`https://api.github.com/repos/${t.owner}/${t.repo}/git/trees/${t.branch}${t.path.replace(/^\//,":")}`).catch(a)};t.readGitHubFile=(e,t)=>{const n=r(e);return i.fetch(`https://api.github.com/repos/${n.owner}/${n.repo}/git/blobs/${t}`).catch(a)};t.validateToken=e=>{const t=e?{Authorization:"token "+e}:{};return self.fetch("https://api.github.com",{headers:Object.assign({},t)}).then(t=>({token:!!e,valid:401!==t.status,limit:+t.headers.get("X-RateLimit-Limit")||0,remaining:+t.headers.get("X-RateLimit-Remaining")||0,reset:+t.headers.get("X-RateLimit-Reset")||0})).catch(()=>{throw i.throttledReportNetworkError(),new i.RequestError("Request Failed, Maybe an Network Error",e)})}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.fetch=t.throttledReportNetworkError=t.RequestInvalidTokenError=t.RequestRateLimitError=t.RequestNotFoundError=t.RequestError=void 0;const o=n(0),i=n(4),r=n(5);class a extends Error{constructor(e,t){super(e),this.token=t,"function"==typeof Object.setPrototypeOf&&Object.setPrototypeOf(this,a.prototype)}}t.RequestError=a;class s extends a{constructor(e,t){super(e,t),"function"==typeof Object.setPrototypeOf&&Object.setPrototypeOf(this,s.prototype)}}t.RequestNotFoundError=s;class u extends a{constructor(e,t){super(e,t),"function"==typeof Object.setPrototypeOf&&Object.setPrototypeOf(this,u.prototype)}}t.RequestRateLimitError=u;class c extends a{constructor(e,t){super(e,t),"function"==typeof Object.setPrototypeOf&&Object.setPrototypeOf(this,c.prototype)}}t.RequestInvalidTokenError=c,t.throttledReportNetworkError=i.throttle(()=>o.window.showErrorMessage("Request Failed, Maybe an Network Error"),5e3);t.fetch=(e,n)=>{const o=(()=>{const e=r.getExtensionContext();return(null==e?void 0:e.globalState.get("github-oauth-token"))||""})(),i=o?{Authorization:"token "+o}:{},l=n&&"headers"in n?n.headers:{};return self.fetch(e,Object.assign(Object.assign({mode:"cors"},n),{headers:Object.assign(Object.assign({},i),l)})).catch(()=>{throw t.throttledReportNetworkError(),new a("Request Failed, Maybe an Network Error",o)}).then(e=>{if(e.status<400)return e.json();if(403===e.status)return e.json().then(e=>{throw new u(e.message,o)});if(401===e.status)return e.json().then(e=>{throw new c(e.message,o)});if(404===e.status)throw new s("Not Found",o);throw new a(`GitHub1s: Request got HTTP ${e.status} response`,o)})}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.throttle=t.reuseable=void 0;const o=n(9),i=n(13),r=(...e)=>o([...e]);t.reuseable=(e,t=r)=>{const n=new Map;return function(...o){const r=t(...o);if(n.has(r))return n.get(r);const a=e.call(this,...o);return n.set(r,a),i(a,()=>n.delete(r))}};t.throttle=(e,t)=>{let n=null;return function(...o){n||(e.call(this,...o),n=setTimeout(()=>n=null,t))}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.getExtensionContext=t.setExtensionContext=void 0;let o=null;t.setExtensionContext=e=>{o=e};t.getExtensionContext=()=>o},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.commandClearToken=t.commandUpdateToken=t.commandValidateToken=void 0;const o=n(0),i=n(1),r=n(2);t.commandValidateToken=(e=!1)=>{const t=i.getExtensionContext().globalState.get("github-oauth-token")||"";return r.validateToken(t).then(n=>{if(!e){const e=n.remaining;t?n.valid?n.valid&&n.remaining>0?o.window.showInformationMessage(`Current GitHub OAuth Token is OK, and you can have ${e} requests in the current rate limit window.`):n.valid&&n.remaining<=0&&o.window.showWarningMessage("Current GitHub OAuth Token is Valid, but the rate limit is exceeded."):o.window.showErrorMessage("Current GitHub OAuth Token is invalid."):e>0?o.window.showWarningMessage(`You haven't set a GitHub OAuth Token yet, and you can have ${e} requests in the current rate limit window.`):o.window.showWarningMessage("You haven't set a GitHub OAuth Token yet, and the rate limit is exceeded.")}return n})};t.commandUpdateToken=(e=!1)=>o.window.showInputBox({placeHolder:"Please input the GitHub OAuth Token"}).then(t=>{if(t)return i.getExtensionContext().globalState.update("github-oauth-token",t||"").then(()=>{r.validateToken(t).then(t=>{e||(t.valid?t.remaining<=0?o.window.showWarningMessage("GitHub OAuth Token have updated, but the rate limit is exceeded."):o.window.showInformationMessage("GitHub OAuth Token have updated."):o.window.showErrorMessage("GitHub OAuth Token have updated, but it is invalid.")),t.valid&&t.remaining>0&&o.commands.executeCommand("workbench.files.action.refreshFilesExplorer")})})});t.commandClearToken=(e=!1)=>o.window.showWarningMessage("Would you want to clear the saved GitHub OAuth Token?",{modal:!0},"Confirm").then(t=>"Confirm"===t&&i.getExtensionContext().globalState.update("github-oauth-token","").then(()=>{!e&&o.window.showInformationMessage("You have cleared the saved GitHb OAuth Token.")}).then(()=>!0))},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.activate=void 0;const o=n(0),i=n(8),r=n(14),a=n(1),s=n(6);t.activate=function(e){a.setExtensionContext(e),e.subscriptions.push(new i.GitHub1sFS),e.subscriptions.push(o.window.registerWebviewViewProvider(r.SettingsView.viewType,new r.SettingsView)),e.subscriptions.push(o.commands.registerCommand("github1s.validate-token",s.commandValidateToken)),e.subscriptions.push(o.commands.registerCommand("github1s.update-token",s.commandUpdateToken)),e.subscriptions.push(o.commands.registerCommand("github1s.clear-token",s.commandClearToken))}},function(e,t,n){"use strict";var o=this&&this.__awaiter||function(e,t,n,o){return new(n||(n=Promise))((function(i,r){function a(e){try{u(o.next(e))}catch(e){r(e)}}function s(e){try{u(o.throw(e))}catch(e){r(e)}}function u(e){var t;e.done?i(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(a,s)}u((o=o.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0}),t.GitHub1sFS=t.Directory=t.File=void 0;const i=n(0),r=n(1),a=n(2);class s{constructor(e,t,n){this.uri=e,this.type=i.FileType.File,this.ctime=Date.now(),this.mtime=Date.now(),this.name=t,this.sha=n&&"sha"in n?n.sha:"",this.size=n&&"size"in n?n.size:0,this.data=n&&"data"in n?n.data:null}}t.File=s;class u{constructor(e,t,n){this.uri=e,this.type=i.FileType.Directory,this.ctime=Date.now(),this.mtime=Date.now(),this.size=0,this.name=t,this.entries=null,this.sha=n&&"sha"in n?n.sha:"",this.size=n&&"size"in n?n.size:0}}t.Directory=u;class c{constructor(){this._emitter=new i.EventEmitter,this.root=null,this.onDidChangeFile=this._emitter.event,this.readDirectory=r.reuseable(e=>{if(!e.authority)throw i.FileSystemError.FileNotFound(e);return this._lookupAsDirectory(e,!1).then(t=>{if(null!==t.entries){const e=Array.from(t.entries.values()).map(e=>[e.name,e instanceof u?i.FileType.Directory:i.FileType.File]);return Promise.resolve(e)}return a.readGitHubDirectory(e).then(n=>(t.entries=new Map,n.tree.map(n=>{const o="tree"===n.type?i.FileType.Directory:i.FileType.File;return t.entries.set(n.path,o===i.FileType.Directory?new u(e,n.path,{sha:n.sha}):new s(e,n.path,{sha:n.sha,size:n.size})),[n.path,o]})))})},e=>e.toString()),this.readFile=r.reuseable(e=>{if(!e.authority)throw i.FileSystemError.FileNotFound(e);return this._lookupAsFile(e,!1).then(t=>{if(null!==t.data)return t.data;const n=new TextEncoder;return a.readGitHubFile(e,t.sha).then(e=>(t.data=n.encode(r.b64DecodeUnicode(e.content)),t.data))})},e=>e.toString()),this.disposable=i.Disposable.from(i.workspace.registerFileSystemProvider(c.scheme,this,{isCaseSensitive:!0,isReadonly:!0}))}dispose(){var e;null===(e=this.disposable)||void 0===e||e.dispose()}_lookup(e,t){return o(this,void 0,void 0,(function*(){let n=e.path.split("/").filter(Boolean),o=this.root||(this.root=new u(e.with({path:"/"}),""));for(const r of n){let n;if(o instanceof u&&(null===o.entries&&(yield this.readDirectory(i.Uri.joinPath(o.uri,o.name))),n=o.entries.get(r)),!n){if(t)return;throw i.FileSystemError.FileNotFound(e)}o=n}return o}))}_lookupAsDirectory(e,t){return o(this,void 0,void 0,(function*(){const n=yield this._lookup(e,t);if(n instanceof u)return n;if(!t)throw i.FileSystemError.FileNotADirectory(e)}))}_lookupAsFile(e,t){return o(this,void 0,void 0,(function*(){const n=yield this._lookup(e,t);if(n instanceof s)return n;if(!t)throw i.FileSystemError.FileIsADirectory(e)}))}_lookupParentDirectory(e){const t=e.with({path:r.dirname(e.path)});return this._lookupAsDirectory(t,!1)}watch(e,t){return new i.Disposable(r.noop)}stat(e){return this._lookup(e,!1)}createDirectory(e){return Promise.resolve()}writeFile(e,t,n){return Promise.resolve()}delete(e,t){return Promise.resolve()}rename(e,t,n){return Promise.resolve()}copy(e,t,n){return Promise.resolve()}}t.GitHub1sFS=c,c.scheme="github1s"},function(e,t,n){var o="undefined"!=typeof JSON?JSON:n(10);e.exports=function(e,t){t||(t={}),"function"==typeof t&&(t={cmp:t});var n=t.space||"";"number"==typeof n&&(n=Array(n+1).join(" "));var a,s="boolean"==typeof t.cycles&&t.cycles,u=t.replacer||function(e,t){return t},c=t.cmp&&(a=t.cmp,function(e){return function(t,n){var o={key:t,value:e[t]},i={key:n,value:e[n]};return a(o,i)}}),l=[];return function e(t,a,d,p){var h=n?"\n"+new Array(p+1).join(n):"",f=n?": ":":";if(d&&d.toJSON&&"function"==typeof d.toJSON&&(d=d.toJSON()),void 0!==(d=u.call(t,a,d))){if("object"!=typeof d||null===d)return o.stringify(d);if(i(d)){for(var v=[],g=0;g<d.length;g++){var b=e(d,g,d[g],p+1)||o.stringify(null);v.push(h+n+b)}return"["+v.join(",")+h+"]"}if(-1!==l.indexOf(d)){if(s)return o.stringify("__cycle__");throw new TypeError("Converting circular structure to JSON")}l.push(d);var y=r(d).sort(c&&c(d));for(v=[],g=0;g<y.length;g++){var m=e(d,a=y[g],d[a],p+1);if(m){var w=o.stringify(a)+f+m;v.push(h+n+w)}}return l.splice(l.indexOf(d),1),"{"+v.join(",")+h+"}"}}({"":e},"",e,0)};var i=Array.isArray||function(e){return"[object Array]"==={}.toString.call(e)},r=Object.keys||function(e){var t=Object.prototype.hasOwnProperty||function(){return!0},n=[];for(var o in e)t.call(e,o)&&n.push(o);return n}},function(e,t,n){t.parse=n(11),t.stringify=n(12)},function(e,t){var n,o,i,r,a={'"':'"',"\\":"\\","/":"/",b:"\b",f:"\f",n:"\n",r:"\r",t:"\t"},s=function(e){throw{name:"SyntaxError",message:e,at:n,text:i}},u=function(e){return e&&e!==o&&s("Expected '"+e+"' instead of '"+o+"'"),o=i.charAt(n),n+=1,o},c=function(){var e,t="";for("-"===o&&(t="-",u("-"));o>="0"&&o<="9";)t+=o,u();if("."===o)for(t+=".";u()&&o>="0"&&o<="9";)t+=o;if("e"===o||"E"===o)for(t+=o,u(),"-"!==o&&"+"!==o||(t+=o,u());o>="0"&&o<="9";)t+=o,u();if(e=+t,isFinite(e))return e;s("Bad number")},l=function(){var e,t,n,i="";if('"'===o)for(;u();){if('"'===o)return u(),i;if("\\"===o)if(u(),"u"===o){for(n=0,t=0;t<4&&(e=parseInt(u(),16),isFinite(e));t+=1)n=16*n+e;i+=String.fromCharCode(n)}else{if("string"!=typeof a[o])break;i+=a[o]}else i+=o}s("Bad string")},d=function(){for(;o&&o<=" ";)u()};r=function(){switch(d(),o){case"{":return function(){var e,t={};if("{"===o){if(u("{"),d(),"}"===o)return u("}"),t;for(;o;){if(e=l(),d(),u(":"),Object.hasOwnProperty.call(t,e)&&s('Duplicate key "'+e+'"'),t[e]=r(),d(),"}"===o)return u("}"),t;u(","),d()}}s("Bad object")}();case"[":return function(){var e=[];if("["===o){if(u("["),d(),"]"===o)return u("]"),e;for(;o;){if(e.push(r()),d(),"]"===o)return u("]"),e;u(","),d()}}s("Bad array")}();case'"':return l();case"-":return c();default:return o>="0"&&o<="9"?c():function(){switch(o){case"t":return u("t"),u("r"),u("u"),u("e"),!0;case"f":return u("f"),u("a"),u("l"),u("s"),u("e"),!1;case"n":return u("n"),u("u"),u("l"),u("l"),null}s("Unexpected '"+o+"'")}()}},e.exports=function(e,t){var a;return i=e,n=0,o=" ",a=r(),d(),o&&s("Syntax error"),"function"==typeof t?function e(n,o){var i,r,a=n[o];if(a&&"object"==typeof a)for(i in a)Object.prototype.hasOwnProperty.call(a,i)&&(void 0!==(r=e(a,i))?a[i]=r:delete a[i]);return t.call(n,o,a)}({"":a},""):a}},function(e,t){var n,o,i,r=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,a={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"};function s(e){return r.lastIndex=0,r.test(e)?'"'+e.replace(r,(function(e){var t=a[e];return"string"==typeof t?t:"\\u"+("0000"+e.charCodeAt(0).toString(16)).slice(-4)}))+'"':'"'+e+'"'}e.exports=function(e,t,r){var a;if(n="",o="","number"==typeof r)for(a=0;a<r;a+=1)o+=" ";else"string"==typeof r&&(o=r);if(i=t,t&&"function"!=typeof t&&("object"!=typeof t||"number"!=typeof t.length))throw new Error("JSON.stringify");return function e(t,r){var a,u,c,l,d,p=n,h=r[t];switch(h&&"object"==typeof h&&"function"==typeof h.toJSON&&(h=h.toJSON(t)),"function"==typeof i&&(h=i.call(r,t,h)),typeof h){case"string":return s(h);case"number":return isFinite(h)?String(h):"null";case"boolean":case"null":return String(h);case"object":if(!h)return"null";if(n+=o,d=[],"[object Array]"===Object.prototype.toString.apply(h)){for(l=h.length,a=0;a<l;a+=1)d[a]=e(a,h)||"null";return c=0===d.length?"[]":n?"[\n"+n+d.join(",\n"+n)+"\n"+p+"]":"["+d.join(",")+"]",n=p,c}if(i&&"object"==typeof i)for(l=i.length,a=0;a<l;a+=1)"string"==typeof(u=i[a])&&(c=e(u,h))&&d.push(s(u)+(n?": ":":")+c);else for(u in h)Object.prototype.hasOwnProperty.call(h,u)&&(c=e(u,h))&&d.push(s(u)+(n?": ":":")+c);return c=0===d.length?"{}":n?"{\n"+n+d.join(",\n"+n)+"\n"+p+"}":"{"+d.join(",")+"}",n=p,c}}("",{"":e})}},function(e,t,n){"use strict";e.exports=async(e,t=(()=>{}))=>{let n;try{n=await e}catch(e){throw await t(),e}return await t(),n}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.SettingsView=void 0;const o=n(0),i=n(1),r=n(6),a=n(2);class s{constructor(){this._extensionContext=i.getExtensionContext()}resolveWebviewView(e,t,n){this._webviewView=e,e.webview.options=i.getWebviewOptions(this._extensionContext.extensionUri),e.webview.html=this._getHtmlForWebview(e.webview),e.webview.onDidReceiveMessage(e=>{switch(e.type){case"validate-token":this.handleValidateToken(e.payload);break;case"update-token":this.handleUpdateToken(e.payload);break;case"clear-token":r.commandClearToken().then(e=>{e&&this.updateWebviewState({token:"",pageType:"EDIT",valid:!1,validating:!1})});break;case"welcome-page":o.commands.executeCommand("workbench.action.showWelcomePage");break;default:const t=this._extensionContext.globalState.get("github-oauth-token")||"";(t?a.validateToken(t).then(e=>e.valid&&e.remaining>0):Promise.resolve(!1)).then(e=>{this.updateWebviewState({token:t,pageType:t?"PREVIEW":"EDIT",valid:e,validating:!1})})}})}updateWebviewState(e){this._webviewView.webview.postMessage({type:"update-state",payload:e})}handleValidateToken(e){this.updateWebviewState({validating:!0}),a.validateToken(e).then(e=>{e.valid?e.remaining<=0?o.window.showWarningMessage("This GitHub OAuth Token is valid, but the rate limit is exceeded."):o.window.showInformationMessage("This GitHub OAuth Token is OK."):o.window.showErrorMessage("This GitHub OAuth Token is invalid."),this.updateWebviewState({valid:e.valid&&e.remaining>0,validating:!1})}).catch(()=>this.updateWebviewState({valid:!1,validating:!1}))}handleUpdateToken(e){e&&(this.updateWebviewState({validating:!0}),a.validateToken(e).then(t=>{t.valid?t.remaining<=0?(this.updateWebviewState({pageType:"EDIT",validating:!1}),o.window.showWarningMessage("This GitHub OAuth Token is valid, but the rate limit is exceeded.")):(this.updateWebviewState({token:e,valid:!0,pageType:"PREVIEW",validating:!1}),this._extensionContext.globalState.update("github-oauth-token",e||"").then(()=>{o.commands.executeCommand("workbench.files.action.refreshFilesExplorer")})):(this.updateWebviewState({pageType:"EDIT",validating:!1}),o.window.showErrorMessage("This GitHub OAuth Token is invalid."))}).catch(()=>this.updateWebviewState({token:e,validating:!1})))}_getHtmlForWebview(e){const t=i.getNonce();return`\n<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'nonce-${t}'; script-src 'nonce-${t}';">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>GitHub1s Settings</title>\n  <style nonce="${t}">\nhtml {\n  box-sizing: border-box;\n  font-size: 13px;\n}\n\n*,\n*:before,\n*:after {\n  box-sizing: inherit;\n}\n\nbody, h1, h2, h3, h4, h5, h6, p, ol, ul {\n  margin: 0;\n  padding: 0;\n  font-weight: normal;\n}\n\nbody {\n  background-color: transparent;\n}\n\ninput {\n  display: block;\n  width: 100%;\n  height: 24px;\n  border: none;\n  margin-bottom: 10px;\n  padding-left: 4px;\n  padding-right: 4px;\n  font-family: var(--vscode-font-family);\n  color: var(--vscode-input-foreground);\n  outline-color: var(--vscode-input-border);\n  background-color: var(--vscode-input-background);\n}\n\nbutton {\n  border: none;\n  width: 100%;\n  height: 26px;\n  margin-bottom: 10px;\n  padding: var(--input-padding-vertical) var(--input-padding-horizontal);\n  text-align: center;\n  outline: 1px solid transparent;\n  outline-offset: 2px !important;\n  color: var(--vscode-button-foreground);\n  background: var(--vscode-button-background);\n}\n\nbutton:hover {\n  cursor: pointer;\n  background: var(--vscode-button-hoverBackground);\n}\n\nbutton:focus {\n  outline-color: var(--vscode-focusBorder);\n}\n\nbutton.secondary {\n  color: var(--vscode-button-secondaryForeground);\n  background: var(--vscode-button-secondaryBackground);\n}\n\nbutton.secondary:hover {\n  background: var(--vscode-button-secondaryHoverBackground);\n}\n\n.loading-page {\n  width: 50px;\n  height: 40px;\n  margin: 60px auto;\n  text-align: center;\n}\n\n.loading-page span {\n  width: 5px;\n  height: 100%;\n  margin-right: 4px;\n  display: inline-block;\n  background:#2b6298;\n  animation: loading 1.2s infinite ease-in-out;\n  -webkit-animation: loading 1.2s infinite ease-in-out;\n}\n\n.loading-page >span:nth-child(2) {\n  -webkit-animation-delay: -1.0s;\n  animation-delay: -1.0s;\n}\n\n.loading-page >span:nth-child(3) {\n  -webkit-animation-delay: -0.9s;\n  animation-delay: -0.9s;\n}\n\n.loading-page >span:nth-child(4) {\n  -webkit-animation-delay: -0.8s;\n  animation-delay: -0.8s;\n}\n\n.loading-page >span:nth-child(5) {\n  -webkit-animation-delay: -0.7s;\n  animation-delay: -0.7s;\n}\n\n@keyframes loading {\n  0% { transform: scaleY(0.4); }\n  25% { transform: scaleY(1.0); }\n  50% { transform: scaleY(0.4); }\n  75% { transform: scaleY(0.4); }\n  100% { transform: scaleY(0.4); }\n}\n\n.preview-page, .edit-page {\n  display: none;\n}\n\n.container {\n  padding: 10px;\n}\n\n.container .token-invalid {\n  display: none;\n}\n\n.page-title {\n  font-size: 16px;\n  font-weight: bold;\n  margin-bottom: 10px;\n}\n\n.description {\n  margin-bottom: 10px;\n}\n\n.description div {\n  margin-bottom: 5px;\n}\n\n.description div:last-child {\n  margin-bottom: 0;\n}\n\n.token-link {\n  margin-bottom: 10px;\n}\n  </style>\n</head>\n<body>\n  <div class="loading-page">\n    <span></span><span></span><span></span><span></span><span></span>\n  </div>\n  <div class="container edit-page">\n    <div class="page-title">Set OAuth Token</div>\n    <div class="description">\n      <div>For unauthenticated requests, the rate limit of GitHub allows for up to 60 requests per hour.</div>\n      <div>For API requests using Authentication, you can make up to 5,000 requests per hour.</div>\n    </div>\n    <div class="token-link">\n      <a href="https://github.com/settings/tokens/new?scopes=repo&description=GitHub1s" target="_blank">\n        Generate New OAuth Token\n      </a>\n    </div>\n    <div><input id="token-input" name="token" autocomplete="off" /></div>\n    <div><button id="save-button">Save</button></div>\n    <div><button id="preview-button">Cancel</button></div>\n  </div>\n  <div class="container preview-page">\n    <div class="page-title">You have authenticated</div>\n    <div class="description">\n      <div class="token-status">\n        Current OAuth Token is <span class="token-status-text"> ...</span>.\n      </div>\n      <div id="token-text"></div>\n    </div>\n    <div><button id="welcome-button">Detail</button></div>\n    <div><button id="validate-button">Validate</button></div>\n    <div><button id="edit-button">Edit</button></div>\n    <div><button id="clear-button">Clear</button></div>\n  </div>\n  <script nonce="${t}">\n(function () {\n  const vscode = acquireVsCodeApi();\n\n  const updateState = (state) => {\n    const prevState = vscode.getState();\n    vscode.setState({ ...prevState, ...state });\n    updatePage();\n  };\n\n  window.addEventListener('message', ({ data }) => {\n    if (data && data.type === 'update-state') {\n      updateState(data.payload);\n    }\n  });\n  vscode.postMessage({ type: 'initialization', payload: null });\n\n  const delegate = (element, selector, eventName, handler) => {\n    if (!element) return null;\n    element.addEventListener(eventName, function (event) {\n      const children = element.querySelectorAll(selector);\n      for (let i = 0, len = children.length; i < len; i++) {\n        if (children[i] === event.target) {\n          handler.call(this, event);\n        }\n      }\n    });\n  };\n\n  delegate(document.body, '#save-button', 'click', () => {\n    const tokenInput = document.getElementById('token-input');\n    vscode.postMessage({ type: 'update-token', payload: tokenInput ? tokenInput.value : '' });\n  });\n\n  delegate(document.body, '#preview-button', 'click', () => {\n    updateState({ pageType: 'PREVIEW' });\n  });\n\n  delegate(document.body, '#validate-button', 'click', () => {\n    const state = vscode.getState();\n    vscode.postMessage({ type: 'validate-token', payload: state ? state.token : '' });\n  });\n\n  delegate(document.body, '#edit-button', 'click', () => {\n    updateState({ pageType: 'EDIT' });\n  });\n\n  delegate(document.body, '#clear-button', 'click', () => {\n    vscode.postMessage({ type: 'clear-token' });\n  });\n\n  delegate(document.body, '#welcome-button', 'click', () => {\n    vscode.postMessage({ type: 'welcome-page' });\n  });\n\n  const updatePage = () => {\n    const { token, pageType, valid, validating } = vscode.getState() || { token: '', preview: 'EDIT', valid: true, validating: true };\n    if (validating) {\n      document.querySelector('.loading-page').style.display = 'block';\n      document.querySelector('.preview-page').style.display = 'none';\n      document.querySelector('.edit-page').style.display = 'none';\n      return;\n    }\n\n    if (pageType === 'EDIT') {\n      document.querySelector('.loading-page').style.display = 'none';\n      document.querySelector('.preview-page').style.display = 'none';\n      document.querySelector('.edit-page').style.display = 'block';\n      document.querySelector('#preview-button').style.display = (token ? 'block' : 'none');\n      return;\n    }\n\n    document.querySelector('.loading-page').style.display = 'none';\n    document.querySelector('.edit-page').style.display = 'none';\n    document.querySelector('.preview-page').style.display = 'block';\n    document.querySelector('.container .token-status .token-status-text').innerText = (valid ? ' VALID' : ' INVALID');\n    document.querySelector('#token-text').innerText = token.slice(0, 7) + token.slice(7).replace(/./g, '*');\n    document.querySelector('#token-text').style.color = (valid ? '#73c991' : '#f88070');\n  };\n})();\n  <\/script>\n</body>\n</html>\n    `}}t.SettingsView=s,s.viewType="github1s-settings"}]));
//# sourceMappingURL=extension.js.map