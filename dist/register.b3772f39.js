// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"8zSRm":[function(require,module,exports) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
var HMR_USE_SSE = false;
module.bundle.HMR_BUNDLE_ID = "44146a94b3772f39";
"use strict";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE, HMR_USE_SSE, chrome, browser, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: {|[string]: mixed|};
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var HMR_USE_SSE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = "__parcel__error__overlay__";
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData[moduleName],
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData[moduleName] = undefined;
}
module.bundle.Module = Module;
module.bundle.hotData = {};
var checkedAssets /*: {|[string]: boolean|} */ , assetsToDispose /*: Array<[ParcelRequire, string]> */ , assetsToAccept /*: Array<[ParcelRequire, string]> */ ;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf("http") === 0 ? location.hostname : "localhost");
}
function getPort() {
    return HMR_PORT || location.port;
}
// eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== "undefined") {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == "https:" && ![
        "localhost",
        "127.0.0.1",
        "0.0.0.0"
    ].includes(hostname) ? "wss" : "ws";
    var ws;
    if (HMR_USE_SSE) ws = new EventSource("/__parcel_hmr");
    else try {
        ws = new WebSocket(protocol + "://" + hostname + (port ? ":" + port : "") + "/");
    } catch (err) {
        if (err.message) console.error(err.message);
        ws = {};
    }
    // Web extension context
    var extCtx = typeof browser === "undefined" ? typeof chrome === "undefined" ? null : chrome : browser;
    // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes("test.js");
    }
    // $FlowFixMe
    ws.onmessage = async function(event /*: {data: string, ...} */ ) {
        checkedAssets = {} /*: {|[string]: boolean|} */ ;
        assetsToAccept = [];
        assetsToDispose = [];
        var data /*: HMRMessage */  = JSON.parse(event.data);
        if (data.type === "update") {
            // Remove error overlay if there is one
            if (typeof document !== "undefined") removeErrorOverlay();
            let assets = data.assets.filter((asset)=>asset.envHash === HMR_ENV_HASH);
            // Handle HMR Update
            let handled = assets.every((asset)=>{
                return asset.type === "css" || asset.type === "js" && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear();
                // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
                if (typeof window !== "undefined" && typeof CustomEvent !== "undefined") window.dispatchEvent(new CustomEvent("parcelhmraccept"));
                await hmrApplyUpdates(assets);
                // Dispose all old assets.
                let processedAssets = {} /*: {|[string]: boolean|} */ ;
                for(let i = 0; i < assetsToDispose.length; i++){
                    let id = assetsToDispose[i][1];
                    if (!processedAssets[id]) {
                        hmrDispose(assetsToDispose[i][0], id);
                        processedAssets[id] = true;
                    }
                }
                // Run accept callbacks. This will also re-execute other disposed assets in topological order.
                processedAssets = {};
                for(let i = 0; i < assetsToAccept.length; i++){
                    let id = assetsToAccept[i][1];
                    if (!processedAssets[id]) {
                        hmrAccept(assetsToAccept[i][0], id);
                        processedAssets[id] = true;
                    }
                }
            } else fullReload();
        }
        if (data.type === "error") {
            // Log parcel errors to console
            for (let ansiDiagnostic of data.diagnostics.ansi){
                let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + "\n" + stack + "\n\n" + ansiDiagnostic.hints.join("\n"));
            }
            if (typeof document !== "undefined") {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html);
                // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    if (ws instanceof WebSocket) {
        ws.onerror = function(e) {
            if (e.message) console.error(e.message);
        };
        ws.onclose = function() {
            console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
        };
    }
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] \u2728 Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement("div");
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, "") : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          \u{1F6A8} ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + "</div>").join("")}
        </div>
        ${diagnostic.documentation ? `<div>\u{1F4DD} <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ""}
      </div>
    `;
    }
    errorHTML += "</div>";
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if ("reload" in location) location.reload();
    else if (extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var href = link.getAttribute("href");
    if (!href) return;
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute("href", // $FlowFixMe
    href.split("?")[0] + "?" + Date.now());
    // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href /*: string */  = links[i].getAttribute("href");
            var hostname = getHostname();
            var servedFromHMRServer = hostname === "localhost" ? new RegExp("^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):" + getPort()).test(href) : href.indexOf(hostname + ":" + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === "js") {
        if (typeof document !== "undefined") {
            let script = document.createElement("script");
            script.src = asset.url + "?t=" + Date.now();
            if (asset.outputFormat === "esmodule") script.type = "module";
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === "function") {
            // Worker scripts
            if (asset.outputFormat === "esmodule") return import(asset.url + "?t=" + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + "?t=" + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension fix
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3 && typeof ServiceWorkerGlobalScope != "undefined" && global instanceof ServiceWorkerGlobalScope) {
                        extCtx.runtime.reload();
                        return;
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle /*: ParcelRequire */ , asset /*:  HMRAsset */ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === "css") reloadCSS();
    else if (asset.type === "js") {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
            // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        }
        // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id];
        delete bundle.cache[id];
        // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id);
}
function hmrAcceptCheck(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
    // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToDispose.push([
        bundle,
        id
    ]);
    if (!cached || cached.hot && cached.hot._acceptCallbacks.length) {
        assetsToAccept.push([
            bundle,
            id
        ]);
        return true;
    }
}
function hmrDispose(bundle /*: ParcelRequire */ , id /*: string */ ) {
    var cached = bundle.cache[id];
    bundle.hotData[id] = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData[id];
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData[id]);
    });
    delete bundle.cache[id];
}
function hmrAccept(bundle /*: ParcelRequire */ , id /*: string */ ) {
    // Execute the module.
    bundle(id);
    // Run the accept callbacks in the new version of the module.
    var cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) {
            assetsToAlsoAccept.forEach(function(a) {
                hmrDispose(a[0], a[1]);
            });
            // $FlowFixMe[method-unbinding]
            assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
        }
    });
}

},{}],"4C53m":[function(require,module,exports) {
var _firebase = require("./firebase");
var _auth = require("firebase/auth");
var _common = require("./common");
var _model = require("./dashboard/model");
const form = document.querySelector("#form");
const btnRegister = document.getElementById("register-button");
const formInput = document.querySelectorAll("input");
// clear form input
function clearForm() {
    formInput.forEach((input)=>{
        input.value = "";
    });
}
// Capitalize FullName
function capitalizeName(name) {
    return name.split(" ").map((word)=>word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(" ");
}
// form submittion
form.addEventListener("submit", async (e)=>{
    e.preventDefault();
    const FullName = capitalizeName(document.querySelector("#FullName").value);
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;
    (0, _common.loadingSpinner)(btnRegister);
    try {
        const userCredential = await (0, _auth.createUserWithEmailAndPassword)((0, _firebase.auth), email, password);
        // Signed up
        const user = userCredential.user;
        await (0, _model.createUserData)(user, FullName, email);
        clearForm();
        (0, _common.toast).success("Thanks for Registering!");
        (0, _common.toast).hide();
        setTimeout(()=>{
            (0, _common.clearLoadingSpinner)(btnRegister, "Create Account");
        }, 6000);
    } catch (error) {
        const errorCode = error.code;
        let errorMessage;
        switch(errorCode){
            case "auth/weak-password":
                errorMessage = "password must be at least 6 characters long";
                break;
            case "auth/email-already-in-use":
                errorMessage = "This email is already in use";
                break;
            case "auth/invalid-email":
                errorMessage = "lease enter a valid email";
                break;
            default:
                errorMessage = error.message;
        }
        (0, _common.toast).error(errorMessage);
        (0, _common.toast).hide();
    } finally{
        setTimeout(()=>{
            (0, _common.clearLoadingSpinner)(btnRegister, "Create Account");
        }, 6000);
    }
    const form = document.querySelector("#form");
    const btnSubmit = document.querySelector("#submit-button");
    form.addEventListener("submit", (e)=>{
        e.preventDefault();
        const email = document.querySelector("#email").value;
        const password = document.querySelector("#password").value;
        (0, _auth.createUserWithEmailAndPassword)((0, _firebase.auth), email, password).then((userCredential)=>{
            // Signed up
            (0, _common.changeSubmitText)(btnSubmit, "Registering...");
            const user = userCredential.user;
            (0, _common.toast).success("Thanks for Registering!");
            (0, _common.toast).hide();
            setTimeout(()=>{
                (0, _common.changeSubmitText)(btnSubmit, "Register");
            }, 6000);
        }).catch((error)=>{
            const errorCode = error.code;
            let errorMessage;
            switch(errorCode){
                case "auth/weak-password":
                    errorMessage = "password must be at least 6 characters long";
                    break;
                case "auth/email-already-in-use":
                    errorMessage = "This email is already in use";
                    break;
                case "auth/invalid-email":
                    errorMessage = "lease enter a valid email";
                    break;
                default:
                    errorMessage = error.message;
            }
            (0, _common.toast).error(errorMessage);
            (0, _common.toast).hide();
        });
    });
}); // <div class="transaction__history__item">
 // <div class="u-flex u-gap-small u-flex-v-center">
 //   <figure class="user-picture">
 //     <img src=${userAvatar} alt="user-picture" />
 //   </figure>
 //   <div class="transaction-details">
 //     <p>Idris Saidu</p>
 //     <p class="transaction-details__date">Aug 8,2024-02:26</p>
 //   </div>
 // </div>
 // <div>
 //   <p class="debit">₦<span>700</span></p>
 // </div>
 // </div>
 // <div class="transaction__history__item">
 // <div class="u-flex u-gap-small u-flex-v-center">
 //   <figure class="user-picture">
 //     <img src=${userAvatar}  alt="user-picture" />
 //   </figure>
 //   <div class="transaction-details">
 //     <p>Idris Saidu</p>
 //     <p class="transaction-details__date">Aug 8,2024-02:26</p>
 //   </div>
 // </div>
 // <div>
 //   <p class="credit">₦<span>700</span></p>
 // </div>
 // </div>

},{"./firebase":"5VmhM","firebase/auth":"79vzg","./common":"2ASYY","./dashboard/model":"k67WZ"}],"k67WZ":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "state", ()=>state);
// creating New Banca user Data
parcelHelpers.export(exports, "createUserData", ()=>createUserData);
// get user data from firebase
parcelHelpers.export(exports, "getCurrentUserData", ()=>getCurrentUserData);
// send money to another banca user (transfer)
parcelHelpers.export(exports, "transfer", ()=>transfer);
// listen to balance changes
parcelHelpers.export(exports, "listenToBalance", ()=>listenToBalance);
// listen to transaction changes
parcelHelpers.export(exports, "listenToTransaction", ()=>listenToTransaction);
// fund banca account
parcelHelpers.export(exports, "fundAccount", ()=>fundAccount);
var _firestore = require("firebase/firestore");
var _firebase = require("../firebase");
var _auth = require("firebase/auth");
const state = {
    user: {},
    transactions: [],
    transactionsAmount: [],
    totalIncome: null,
    totalExpense: null,
    userRef: null,
    userTransactionsRef: null
};
async function createUserData(user, fullName, email) {
    // banca account number for new user
    const accountNumber = generateAccountNum();
    const userName = generateUserName(fullName);
    // Add New User to th Users database
    await (0, _firestore.setDoc)((0, _firestore.doc)((0, _firebase.db), "users", user.uid), {
        fullName: fullName,
        userName: userName,
        email: email,
        balance: 0,
        accountNumber: accountNumber
    });
    //   initializing user transaction
    await (0, _firestore.addDoc)((0, _firestore.collection)((0, _firebase.db), "users", user.uid, "transaction"), {
        type: "initial deposit",
        amount: 0,
        timestamp: (0, _firestore.serverTimestamp)()
    });
}
// generating 10 Digit Banca Account Number
function generateAccountNum() {
    const randomNumber = Math.floor(1000000000 + Math.random() * 9000000000);
    return randomNumber;
}
// generate username
function generateUserName(fullName) {
    const firstName = fullName.split(" ");
    return firstName[0];
}
// wait for user Auth
function waitForUserAuth() {
    const auth = (0, _auth.getAuth)();
    return new Promise((resolve, reject)=>{
        const unsubscribe = (0, _auth.onAuthStateChanged)(auth, (user)=>{
            unsubscribe(); // stop listening after the first response
            if (user) resolve(user);
            else reject(new Error("No user signed in"));
        });
    });
}
async function getCurrentUserData() {
    const user = await waitForUserAuth();
    if (!user) throw new Error("No user signed in");
    const userId = user.uid;
    try {
        const userRef = (0, _firestore.doc)((0, _firebase.db), "users", userId);
        const userSnap = await (0, _firestore.getDoc)(userRef);
        if (userSnap.exists()) {
            const data = {
                id: userSnap.id,
                ...userSnap.data()
            };
            const transactionsRef = (0, _firestore.collection)((0, _firebase.db), "users", userId, "transaction");
            const transactionsSnap = await (0, _firestore.getDocs)(transactionsRef);
            const transactions = transactionsSnap.docs.map((doc)=>doc.data()).sort((a, b)=>new Date(b.date) - new Date(a.date));
            const currentUser = {
                data,
                transactions
            };
            // modify existing state of current user
            state.user = data;
            state.transactions = [
                ...transactions
            ];
            state.transactionsAmount = state.transactions.map((transaction)=>transaction.amount);
            state.totalIncome = calculateTotalIncome(state.transactionsAmount);
            state.totalExpense = calculateTotalExpense(state.transactionsAmount);
            state.userTransactionsRef = transactionsRef;
        }
        state.userRef = userRef;
    } catch (error) {
        console.error(error.message);
    }
}
// get reciepient details from firebase
async function getRecipientData(recipientAccountNumber) {
    // get all banca users
    const usersRef = (0, _firestore.collection)((0, _firebase.db), "users");
    // query banca user based on account number
    const recipientDataQuery = (0, _firestore.query)(usersRef, (0, _firestore.where)("accountNumber", "==", recipientAccountNumber));
    // get query docs
    const docSnapshot = await (0, _firestore.getDocs)(recipientDataQuery);
    if (!docSnapshot.empty) {
        // Get the matched reciepientUser
        const recipientId = docSnapshot.docs[0].id;
        const recipientData = {
            id: recipientId,
            ...docSnapshot.docs[0].data()
        };
        const recipientRef = (0, _firestore.doc)((0, _firebase.db), "users", recipientId);
        // Now get transactions from subcollection
        const recipientTransactionsRef = (0, _firestore.collection)((0, _firebase.db), `users/${recipientId}/transaction`);
        // get transaction query
        const transactionSnapShot = await (0, _firestore.getDocs)(recipientTransactionsRef);
        const recipientTransactionsData = transactionSnapShot.docs.map((doc)=>({
                id: doc.id,
                ...doc.data()
            }));
        return {
            recipientId,
            recipientData,
            recipientRef,
            recipientTransactionsRef,
            recipientTransactionsData
        };
    } else throw new Error("recipient not found");
}
async function transfer(transfer) {
    try {
        const { recipientAccountNumber, amount } = transfer;
        await sendMoney(amount, recipientAccountNumber);
        return "transfer successful!";
    } catch (error) {
        console.log(error, error.message);
        return "transfer failed";
    }
}
// send/recive money in banca
async function sendMoney(amount, recipientAccountNumber) {
    const { user, userRef, userTransactionsRef } = state;
    const { recipientData, recipientRef, recipientTransactionsRef } = await getRecipientData(recipientAccountNumber);
    // update sender database
    if (user.balance >= amount && Number(recipientAccountNumber) !== Number(user.accountNumber)) {
        // debit banca user
        const balance = user.balance - amount;
        await (0, _firestore.updateDoc)(userRef, {
            balance: balance
        });
        // update sender transaction ref
        const name = recipientData.fullName;
        (0, _firestore.addDoc)(userTransactionsRef, {
            name,
            amount: -amount,
            date: new Date().toISOString(),
            type: "withdrawal"
        });
    } else throw new Error("something went wrong");
    // update recipient database
    if (recipientData) {
        const name = state.user.fullName;
        // credit banca user
        depositMoney(recipientData, recipientRef, recipientTransactionsRef, amount, name);
    // const balance = recipientData.balance + amount;
    // await updateDoc(recipientRef, {
    //   balance: balance,
    // });
    // // update recipient transactions list
    // await addDoc(recipientTransactionsRef, {
    //   senderName,
    //   amount,
    //   date: new Date().toISOString(),
    //   type: "deposit",
    // });
    } else throw new Error("recipient could not be found");
}
// calculate total transaction income and expenses
function calculateTotalIncome(transactionList) {
    return transactionList.filter((amount)=>amount > 0).reduce((acc, amount)=>acc + amount, 0);
}
function calculateTotalExpense(transactionList) {
    return transactionList.filter((amount)=>amount < 0).reduce((acc, amount)=>acc + amount, 0);
}
function listenToBalance(handleBalanceChange) {
    const userId = state.user.id;
    const userRef = (0, _firestore.doc)((0, _firebase.db), "users", userId);
    (0, _firestore.onSnapshot)(userRef, (docSnap)=>{
        const newBalance = docSnap.data().balance;
        state.user.balance = newBalance;
        handleBalanceChange(newBalance);
    });
}
function listenToTransaction(handleTransactionChange) {
    const userId = state.user.id;
    const transactionRef = (0, _firestore.collection)((0, _firebase.db), "users", userId, "transaction");
    (0, _firestore.onSnapshot)(transactionRef, (querySnapshot)=>{
        const newTransaction = querySnapshot.docs.map((doc)=>({
                id: doc.id,
                ...doc.data()
            })).sort((a, b)=>new Date(b.date) - new Date(a.date));
        const newTransactionAmount = newTransaction.map((transaction)=>transaction.amount);
        const newTotalIncome = calculateTotalIncome(newTransactionAmount);
        const newTotalExpense = calculateTotalExpense(newTransactionAmount);
        // update state of application
        state.transactions = newTransaction;
        state.totalIncome = newTotalIncome;
        state.totalExpense = newTotalExpense;
        handleTransactionChange(newTransaction, newTotalIncome, newTotalExpense);
    });
}
async function fundAccount(fundAmount) {
    const { user, userRef, userTransactionsRef } = state;
    const name = "Self Funding";
    try {
        const handler = PaystackPop.setup({
            key: "pk_test_86d236442aa4f6fd2b610b3d8838d7737184036f",
            email: state.user.email,
            amount: fundAmount * 100,
            currency: "NGN",
            callback: function(response) {
                // verify the transaction here
                response.reference;
                // You can now call your backend to update wallet
                console.log(user, userRef, userTransactionsRef, fundAmount, name);
                depositMoney(user, userRef, userTransactionsRef, fundAmount, name);
                console.log("funding successful");
            },
            onClose: function() {
                alert("Transaction was not completed");
            }
        });
        handler.openIframe();
    } catch (err) {
        console.log("funding went wrong", err);
    }
}
async function depositMoney(user, userRef, transactionRef, amount, name) {
    try {
        // credit banca user
        const balance = user.balance + amount;
        await (0, _firestore.updateDoc)(userRef, {
            balance: balance
        });
        // update transactions list
        await (0, _firestore.addDoc)(transactionRef, {
            name,
            amount,
            date: new Date().toISOString(),
            type: "deposit"
        });
    } catch (err) {
        throw new Error("transaction not successful");
    }
}

},{"firebase/firestore":"8A4BC","../firebase":"5VmhM","firebase/auth":"79vzg","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}]},["8zSRm","4C53m"], "4C53m", "parcelRequiree06a")

//# sourceMappingURL=register.b3772f39.js.map
