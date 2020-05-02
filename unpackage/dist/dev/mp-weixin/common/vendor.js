(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],{

/***/ 1:
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(n);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

var HOOKS = [
'invoke',
'success',
'fail',
'complete',
'returnValue'];


var globalInterceptors = {};
var scopedInterceptors = {};

function mergeHook(parentVal, childVal) {
  var res = childVal ?
  parentVal ?
  parentVal.concat(childVal) :
  Array.isArray(childVal) ?
  childVal : [childVal] :
  parentVal;
  return res ?
  dedupeHooks(res) :
  res;
}

function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}

function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}

function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}

function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}

function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}

function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}

function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.then(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {} };

      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    } };

}

function wrapperOptions(interceptor) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}

function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}

function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}

function invokeApi(method, api, options) {for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {params[_key - 3] = arguments[_key];}
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}

var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return res.then(function (res) {
      return res[1];
    }).catch(function (res) {
      return res[0];
    });
  } };


var SYNC_API_RE =
/^\$|sendNativeEvent|restoreGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64/;

var CONTEXT_API_RE = /^create|Manager$/;

// Context例外情况
var CONTEXT_API_RE_EXC = ['createBLEConnection'];

// 同步例外情况
var ASYNC_API = ['createBLEConnection'];

var CALLBACK_API_RE = /^on|^off/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(
    function (value) {return promise.resolve(callback()).then(function () {return value;});},
    function (reason) {return promise.resolve(callback()).then(function () {
        throw reason;
      });});

  };
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {params[_key2 - 1] = arguments[_key2];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
    })));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      return 1;
    } else {
      return 0.5;
    }
  }
  return number < 0 ? -result : result;
}

var interceptors = {
  promiseInterceptor: promiseInterceptor };


var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor,
  interceptors: interceptors });


var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(
      function (item, index) {return index < currentIndex ? item !== urls[currentIndex] : true;});

    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false };

  } };


function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.windowHeight - safeArea.bottom };

  }
}
var protocols = {
  previewImage: previewImage,
  getSystemInfo: {
    returnValue: addSafeAreaInsets },

  getSystemInfoSync: {
    returnValue: addSafeAreaInsets } };


var todos = [
'vibrate'];

var canIUses = [];

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// 不支持的参数
          console.warn("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F ".concat(methodName, "\u6682\u4E0D\u652F\u6301").concat(key));
        } else if (isStr(keyOption)) {// 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// 暂不支持的 api
      return function () {
        console.error("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F \u6682\u4E0D\u652F\u6301".concat(methodName));
      };
    }
    return function (arg1, arg2) {// 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      var returnValue = wx[options.name || methodName].apply(wx, args);
      if (isSyncApi(methodName)) {// 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'onTabBarMidButtonTap',
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail:\u6682\u4E0D\u652F\u6301 ").concat(name, " \u65B9\u6CD5") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail:服务[' + service + ']不存在' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider });


var getEmitter = function () {
  if (typeof getUniEmitter === 'function') {
    /* eslint-disable no-undef */
    return getUniEmitter;
  }
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}

var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });


var api = /*#__PURE__*/Object.freeze({
  __proto__: null });


var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  {
    if (!wx.canIUse('nextTick')) {
      return;
    }
  }
  var oldTriggerEvent = mpInstance.triggerEvent;
  mpInstance.triggerEvent = function (event) {for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {args[_key3 - 1] = arguments[_key3];}
    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
}

function initHook(name, options) {
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {args[_key4] = arguments[_key4];}
      return oldHook.apply(this, args);
    };
  }
}

Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('onLoad', options);
  return MPPage(options);
};

Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('created', options);
  return MPComponent(options);
};

var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }

  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super &&
    vueOptions.super.options &&
    Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {return hasHook(hook, mixin);});
  }
}

function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}

function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
    vueOptions = VueComponent.extendOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions.behaviors;
  var vueExtends = vueOptions.extends;
  var vueMixins = vueOptions.mixins;

  var vueProps = vueOptions.props;

  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps.name = {
            type: String,
            default: '' };

          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: '' };

        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: initProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: initProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts.default;
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (hasOwn(event, 'markerId')) {
    event.detail = typeof event.detail === 'object' ? event.detail : {};
    event.detail.markerId = event.markerId;
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor = dataPath ? vm.__get_value(dataPath, context) : context;

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *'test'
                                              */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象
  if (isCustom) {// 自定义事件
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {// wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function handleEvent(event) {var _this = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn('事件信息不存在');
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn('事件信息不存在');
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;

  var ret = [];

  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this.$vm;
          if (
          handlerCtx.$options.generic &&
          handlerCtx.$parent &&
          handlerCtx.$parent.$parent)
          {// mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = handlerCtx.$parent.$parent;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx,
            processEventArgs(
            _this.$vm,
            event,
            eventArray[1],
            eventArray[2],
            isCustom,
            methodName));

            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            throw new Error(" _vm.".concat(methodName, " is not a function"));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          ret.push(handler.apply(handlerCtx, processEventArgs(
          _this.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName)));

        }
      });
    }
  });

  if (
  eventType === 'input' &&
  ret.length === 1 &&
  typeof ret[0] !== 'undefined')
  {
    return ret[0];
  }
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound'];


function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }

  _vue.default.prototype.mpHost = "mp-weixin";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;

      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {// 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (!wx.canIUse('nextTick')) {// 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }

  initHooks(appOptions, hooks);

  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // 反向递归查找
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      var components = mpInstance.selectAllComponents('.vue-ref');
      components.forEach(function (component) {
        var ref = component.dataset.ref;
        $refs[ref] = component.$vm || component;
      });
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

function handleLink(event) {var _ref4 =



  event.detail || event.value,vuePid = _ref4.vuePid,vueOptions = _ref4.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

}

function createApp(vm) {
  App(parseApp(vm));
  return vm;
}

function parseBaseComponent(vueComponentOptions)


{var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage = _ref5.isPage,initRelation = _ref5.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var options = _objectSpread({
    multipleSlots: true,
    addGlobalClass: true },
  vueOptions.options || {});


  {
    // 微信 multipleSlots 部分情况有 bug，导致内容顺序错乱 如 u-list，提供覆盖选项
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin'].options) {
      Object.assign(options, vueOptions['mp-weixin'].options);
    }
  }

  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;

        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties };


        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options });


        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __l: handleLink,
      __e: handleEvent } };



  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }

  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

var hooks$1 = [
'onShow',
'onHide',
'onUnload'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6)


{var isPage = _ref6.isPage,initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions);

  initHooks(pageOptions.methods, hooks$1, vuePageOptions);

  pageOptions.methods.onLoad = function (args) {
    this.$vm.$mp.query = args; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', args);
  };

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (target[name]) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    } });

} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;

/***/ }),

/***/ 12:
/*!**************************************!*\
  !*** D:/UAD/Jdt-zhcx/common/Home.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; //司机端全局参数定义

//接口域名
var Url = 'http://111.231.109.113:8002';

//接口对象
var Interface = {

  addPassengerPosition: {
    value: Url + '/api/zhcx/addPassengerPosition',
    name: '旅客端定时实时上报位置',
    method: 'GET', //GET-POST
    pages: ["Jdt-zhcx/App.vue"] } };



var dateFormat = {
  dateformat: 'Y-m-d H:i:s' };


// 接口声明区
var _default = {
  Interface: Interface,
  dateFormat: dateFormat };exports.default = _default;

/***/ }),

/***/ 13:
/*!******************************************************************!*\
  !*** D:/UAD/Jdt-zhcx/components/CTKY/shoyu-date/utils.filter.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = {
  friendlyDate: function friendlyDate(timestamp) {
    var formats = {
      'year': '%n% 年前',
      'month': '%n% 月前',
      'day': '%n% 天前',
      'hour': '%n% 小时前',
      'minute': '%n% 分钟前',
      'second': '%n% 秒前' };

    var now = Date.now();
    var seconds = Math.floor((now - parseInt(timestamp)) / 1000);
    var minutes = Math.floor(seconds / 60);
    var hours = Math.floor(minutes / 60);
    var days = Math.floor(hours / 24);
    var months = Math.floor(days / 30);
    var years = Math.floor(months / 12);

    var diffType = '';
    var diffValue = 0;
    if (years > 0) {
      diffType = 'year';
      diffValue = years;
    } else {
      if (months > 0) {
        diffType = 'month';
        diffValue = months;
      } else {
        if (days > 0) {
          diffType = 'day';
          diffValue = days;
        } else {
          if (hours > 0) {
            diffType = 'hour';
            diffValue = hours;
          } else {
            if (minutes > 0) {
              diffType = 'minute';
              diffValue = minutes;
            } else {
              diffType = 'second';
              diffValue = seconds === 0 ? seconds = 1 : seconds;
            }
          }
        }
      }
    }
    return formats[diffType].replace('%n%', diffValue);
  },
  timeTodate: function timeTodate(format, timestamp) {

    var myDate = new Date();
    myDate.getYear(); //获取当前年份(2位)  
    myDate.getFullYear(); //获取完整的年份(4位,1970-????)  
    myDate.getMonth(); //获取当前月份(0-11,0代表1月)         // 所以获取当前月份是myDate.getMonth()+1;   
    myDate.getDate(); //获取当前日(1-31)  
    myDate.getDay(); //获取当前星期X(0-6,0代表星期天)  
    myDate.getTime(); //获取当前时间(从1970.1.1开始的毫秒数)  
    myDate.getHours(); //获取当前小时数(0-23)  
    myDate.getMinutes(); //获取当前分钟数(0-59)  
    myDate.getSeconds(); //获取当前秒数(0-59)  
    myDate.getMilliseconds(); //获取当前毫秒数(0-999)  
    myDate.toLocaleDateString(); //获取当前日期  
    var mytime = myDate.toLocaleTimeString(); //获取当前时间  
    myDate.toLocaleString(); //获取日期与时间  

    // 2019-10-01 23:08:35
    var tmpDate = new Date(timestamp);
    var seconds = tmpDate.getSeconds();
    var minutes = ('0' + tmpDate.getMinutes()).substr(-2);
    var hours = tmpDate.getHours();
    var days = ('0' + tmpDate.getDate()).substr(-2);
    var months = ('0' + (tmpDate.getMonth() + 1)).substr(-2);
    var years = tmpDate.getFullYear();

    var value = '自定义替换值';
    // 输出格式为 .replace(被替换字符, 计算后值)

    return format.replace('Y', years).replace('m', months).replace('d', days).replace('H', hours).replace('i', minutes).replace('s', seconds).replace('index', value);
  } };exports.default = _default;

/***/ }),

/***/ 14:
/*!********************************************!*\
  !*** ./node_modules/vuex/dist/vuex.esm.js ***!
  \********************************************/
/*! exports provided: Store, install, mapState, mapMutations, mapGetters, mapActions, createNamespacedHelpers, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Store", function() { return Store; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "install", function() { return install; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapState", function() { return mapState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapMutations", function() { return mapMutations; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapGetters", function() { return mapGetters; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapActions", function() { return mapActions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createNamespacedHelpers", function() { return createNamespacedHelpers; });
/**
 * vuex v3.0.1
 * (c) 2017 Evan You
 * @license MIT
 */
var applyMixin = function (Vue) {
  var version = Number(Vue.version.split('.')[0]);

  if (version >= 2) {
    Vue.mixin({ beforeCreate: vuexInit });
  } else {
    // override init and inject vuex init procedure
    // for 1.x backwards compatibility.
    var _init = Vue.prototype._init;
    Vue.prototype._init = function (options) {
      if ( options === void 0 ) options = {};

      options.init = options.init
        ? [vuexInit].concat(options.init)
        : vuexInit;
      _init.call(this, options);
    };
  }

  /**
   * Vuex init hook, injected into each instances init hooks list.
   */

  function vuexInit () {
    var options = this.$options;
    // store injection
    if (options.store) {
      this.$store = typeof options.store === 'function'
        ? options.store()
        : options.store;
    } else if (options.parent && options.parent.$store) {
      this.$store = options.parent.$store;
    }
  }
};

var devtoolHook =
  typeof window !== 'undefined' &&
  window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

function devtoolPlugin (store) {
  if (!devtoolHook) { return }

  store._devtoolHook = devtoolHook;

  devtoolHook.emit('vuex:init', store);

  devtoolHook.on('vuex:travel-to-state', function (targetState) {
    store.replaceState(targetState);
  });

  store.subscribe(function (mutation, state) {
    devtoolHook.emit('vuex:mutation', mutation, state);
  });
}

/**
 * Get the first item that pass the test
 * by second argument function
 *
 * @param {Array} list
 * @param {Function} f
 * @return {*}
 */
/**
 * Deep copy the given object considering circular structure.
 * This function caches all nested objects and its copies.
 * If it detects circular structure, use cached copy to avoid infinite loop.
 *
 * @param {*} obj
 * @param {Array<Object>} cache
 * @return {*}
 */


/**
 * forEach for object
 */
function forEachValue (obj, fn) {
  Object.keys(obj).forEach(function (key) { return fn(obj[key], key); });
}

function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

function isPromise (val) {
  return val && typeof val.then === 'function'
}

function assert (condition, msg) {
  if (!condition) { throw new Error(("[vuex] " + msg)) }
}

var Module = function Module (rawModule, runtime) {
  this.runtime = runtime;
  this._children = Object.create(null);
  this._rawModule = rawModule;
  var rawState = rawModule.state;
  this.state = (typeof rawState === 'function' ? rawState() : rawState) || {};
};

var prototypeAccessors$1 = { namespaced: { configurable: true } };

prototypeAccessors$1.namespaced.get = function () {
  return !!this._rawModule.namespaced
};

Module.prototype.addChild = function addChild (key, module) {
  this._children[key] = module;
};

Module.prototype.removeChild = function removeChild (key) {
  delete this._children[key];
};

Module.prototype.getChild = function getChild (key) {
  return this._children[key]
};

Module.prototype.update = function update (rawModule) {
  this._rawModule.namespaced = rawModule.namespaced;
  if (rawModule.actions) {
    this._rawModule.actions = rawModule.actions;
  }
  if (rawModule.mutations) {
    this._rawModule.mutations = rawModule.mutations;
  }
  if (rawModule.getters) {
    this._rawModule.getters = rawModule.getters;
  }
};

Module.prototype.forEachChild = function forEachChild (fn) {
  forEachValue(this._children, fn);
};

Module.prototype.forEachGetter = function forEachGetter (fn) {
  if (this._rawModule.getters) {
    forEachValue(this._rawModule.getters, fn);
  }
};

Module.prototype.forEachAction = function forEachAction (fn) {
  if (this._rawModule.actions) {
    forEachValue(this._rawModule.actions, fn);
  }
};

Module.prototype.forEachMutation = function forEachMutation (fn) {
  if (this._rawModule.mutations) {
    forEachValue(this._rawModule.mutations, fn);
  }
};

Object.defineProperties( Module.prototype, prototypeAccessors$1 );

var ModuleCollection = function ModuleCollection (rawRootModule) {
  // register root module (Vuex.Store options)
  this.register([], rawRootModule, false);
};

ModuleCollection.prototype.get = function get (path) {
  return path.reduce(function (module, key) {
    return module.getChild(key)
  }, this.root)
};

ModuleCollection.prototype.getNamespace = function getNamespace (path) {
  var module = this.root;
  return path.reduce(function (namespace, key) {
    module = module.getChild(key);
    return namespace + (module.namespaced ? key + '/' : '')
  }, '')
};

ModuleCollection.prototype.update = function update$1 (rawRootModule) {
  update([], this.root, rawRootModule);
};

ModuleCollection.prototype.register = function register (path, rawModule, runtime) {
    var this$1 = this;
    if ( runtime === void 0 ) runtime = true;

  if (true) {
    assertRawModule(path, rawModule);
  }

  var newModule = new Module(rawModule, runtime);
  if (path.length === 0) {
    this.root = newModule;
  } else {
    var parent = this.get(path.slice(0, -1));
    parent.addChild(path[path.length - 1], newModule);
  }

  // register nested modules
  if (rawModule.modules) {
    forEachValue(rawModule.modules, function (rawChildModule, key) {
      this$1.register(path.concat(key), rawChildModule, runtime);
    });
  }
};

ModuleCollection.prototype.unregister = function unregister (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];
  if (!parent.getChild(key).runtime) { return }

  parent.removeChild(key);
};

function update (path, targetModule, newModule) {
  if (true) {
    assertRawModule(path, newModule);
  }

  // update target module
  targetModule.update(newModule);

  // update nested modules
  if (newModule.modules) {
    for (var key in newModule.modules) {
      if (!targetModule.getChild(key)) {
        if (true) {
          console.warn(
            "[vuex] trying to add a new module '" + key + "' on hot reloading, " +
            'manual reload is needed'
          );
        }
        return
      }
      update(
        path.concat(key),
        targetModule.getChild(key),
        newModule.modules[key]
      );
    }
  }
}

var functionAssert = {
  assert: function (value) { return typeof value === 'function'; },
  expected: 'function'
};

var objectAssert = {
  assert: function (value) { return typeof value === 'function' ||
    (typeof value === 'object' && typeof value.handler === 'function'); },
  expected: 'function or object with "handler" function'
};

var assertTypes = {
  getters: functionAssert,
  mutations: functionAssert,
  actions: objectAssert
};

function assertRawModule (path, rawModule) {
  Object.keys(assertTypes).forEach(function (key) {
    if (!rawModule[key]) { return }

    var assertOptions = assertTypes[key];

    forEachValue(rawModule[key], function (value, type) {
      assert(
        assertOptions.assert(value),
        makeAssertionMessage(path, key, type, value, assertOptions.expected)
      );
    });
  });
}

function makeAssertionMessage (path, key, type, value, expected) {
  var buf = key + " should be " + expected + " but \"" + key + "." + type + "\"";
  if (path.length > 0) {
    buf += " in module \"" + (path.join('.')) + "\"";
  }
  buf += " is " + (JSON.stringify(value)) + ".";
  return buf
}

var Vue; // bind on install

var Store = function Store (options) {
  var this$1 = this;
  if ( options === void 0 ) options = {};

  // Auto install if it is not done yet and `window` has `Vue`.
  // To allow users to avoid auto-installation in some cases,
  // this code should be placed here. See #731
  if (!Vue && typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
  }

  if (true) {
    assert(Vue, "must call Vue.use(Vuex) before creating a store instance.");
    assert(typeof Promise !== 'undefined', "vuex requires a Promise polyfill in this browser.");
    assert(this instanceof Store, "Store must be called with the new operator.");
  }

  var plugins = options.plugins; if ( plugins === void 0 ) plugins = [];
  var strict = options.strict; if ( strict === void 0 ) strict = false;

  var state = options.state; if ( state === void 0 ) state = {};
  if (typeof state === 'function') {
    state = state() || {};
  }

  // store internal state
  this._committing = false;
  this._actions = Object.create(null);
  this._actionSubscribers = [];
  this._mutations = Object.create(null);
  this._wrappedGetters = Object.create(null);
  this._modules = new ModuleCollection(options);
  this._modulesNamespaceMap = Object.create(null);
  this._subscribers = [];
  this._watcherVM = new Vue();

  // bind commit and dispatch to self
  var store = this;
  var ref = this;
  var dispatch = ref.dispatch;
  var commit = ref.commit;
  this.dispatch = function boundDispatch (type, payload) {
    return dispatch.call(store, type, payload)
  };
  this.commit = function boundCommit (type, payload, options) {
    return commit.call(store, type, payload, options)
  };

  // strict mode
  this.strict = strict;

  // init root module.
  // this also recursively registers all sub-modules
  // and collects all module getters inside this._wrappedGetters
  installModule(this, state, [], this._modules.root);

  // initialize the store vm, which is responsible for the reactivity
  // (also registers _wrappedGetters as computed properties)
  resetStoreVM(this, state);

  // apply plugins
  plugins.forEach(function (plugin) { return plugin(this$1); });

  if (Vue.config.devtools) {
    devtoolPlugin(this);
  }
};

var prototypeAccessors = { state: { configurable: true } };

prototypeAccessors.state.get = function () {
  return this._vm._data.$$state
};

prototypeAccessors.state.set = function (v) {
  if (true) {
    assert(false, "Use store.replaceState() to explicit replace store state.");
  }
};

Store.prototype.commit = function commit (_type, _payload, _options) {
    var this$1 = this;

  // check object-style commit
  var ref = unifyObjectStyle(_type, _payload, _options);
    var type = ref.type;
    var payload = ref.payload;
    var options = ref.options;

  var mutation = { type: type, payload: payload };
  var entry = this._mutations[type];
  if (!entry) {
    if (true) {
      console.error(("[vuex] unknown mutation type: " + type));
    }
    return
  }
  this._withCommit(function () {
    entry.forEach(function commitIterator (handler) {
      handler(payload);
    });
  });
  this._subscribers.forEach(function (sub) { return sub(mutation, this$1.state); });

  if (
     true &&
    options && options.silent
  ) {
    console.warn(
      "[vuex] mutation type: " + type + ". Silent option has been removed. " +
      'Use the filter functionality in the vue-devtools'
    );
  }
};

Store.prototype.dispatch = function dispatch (_type, _payload) {
    var this$1 = this;

  // check object-style dispatch
  var ref = unifyObjectStyle(_type, _payload);
    var type = ref.type;
    var payload = ref.payload;

  var action = { type: type, payload: payload };
  var entry = this._actions[type];
  if (!entry) {
    if (true) {
      console.error(("[vuex] unknown action type: " + type));
    }
    return
  }

  this._actionSubscribers.forEach(function (sub) { return sub(action, this$1.state); });

  return entry.length > 1
    ? Promise.all(entry.map(function (handler) { return handler(payload); }))
    : entry[0](payload)
};

Store.prototype.subscribe = function subscribe (fn) {
  return genericSubscribe(fn, this._subscribers)
};

Store.prototype.subscribeAction = function subscribeAction (fn) {
  return genericSubscribe(fn, this._actionSubscribers)
};

Store.prototype.watch = function watch (getter, cb, options) {
    var this$1 = this;

  if (true) {
    assert(typeof getter === 'function', "store.watch only accepts a function.");
  }
  return this._watcherVM.$watch(function () { return getter(this$1.state, this$1.getters); }, cb, options)
};

Store.prototype.replaceState = function replaceState (state) {
    var this$1 = this;

  this._withCommit(function () {
    this$1._vm._data.$$state = state;
  });
};

Store.prototype.registerModule = function registerModule (path, rawModule, options) {
    if ( options === void 0 ) options = {};

  if (typeof path === 'string') { path = [path]; }

  if (true) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
    assert(path.length > 0, 'cannot register the root module by using registerModule.');
  }

  this._modules.register(path, rawModule);
  installModule(this, this.state, path, this._modules.get(path), options.preserveState);
  // reset store to update getters...
  resetStoreVM(this, this.state);
};

Store.prototype.unregisterModule = function unregisterModule (path) {
    var this$1 = this;

  if (typeof path === 'string') { path = [path]; }

  if (true) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }

  this._modules.unregister(path);
  this._withCommit(function () {
    var parentState = getNestedState(this$1.state, path.slice(0, -1));
    Vue.delete(parentState, path[path.length - 1]);
  });
  resetStore(this);
};

Store.prototype.hotUpdate = function hotUpdate (newOptions) {
  this._modules.update(newOptions);
  resetStore(this, true);
};

Store.prototype._withCommit = function _withCommit (fn) {
  var committing = this._committing;
  this._committing = true;
  fn();
  this._committing = committing;
};

Object.defineProperties( Store.prototype, prototypeAccessors );

function genericSubscribe (fn, subs) {
  if (subs.indexOf(fn) < 0) {
    subs.push(fn);
  }
  return function () {
    var i = subs.indexOf(fn);
    if (i > -1) {
      subs.splice(i, 1);
    }
  }
}

function resetStore (store, hot) {
  store._actions = Object.create(null);
  store._mutations = Object.create(null);
  store._wrappedGetters = Object.create(null);
  store._modulesNamespaceMap = Object.create(null);
  var state = store.state;
  // init all modules
  installModule(store, state, [], store._modules.root, true);
  // reset vm
  resetStoreVM(store, state, hot);
}

function resetStoreVM (store, state, hot) {
  var oldVm = store._vm;

  // bind store public getters
  store.getters = {};
  var wrappedGetters = store._wrappedGetters;
  var computed = {};
  forEachValue(wrappedGetters, function (fn, key) {
    // use computed to leverage its lazy-caching mechanism
    computed[key] = function () { return fn(store); };
    Object.defineProperty(store.getters, key, {
      get: function () { return store._vm[key]; },
      enumerable: true // for local getters
    });
  });

  // use a Vue instance to store the state tree
  // suppress warnings just in case the user has added
  // some funky global mixins
  var silent = Vue.config.silent;
  Vue.config.silent = true;
  store._vm = new Vue({
    data: {
      $$state: state
    },
    computed: computed
  });
  Vue.config.silent = silent;

  // enable strict mode for new vm
  if (store.strict) {
    enableStrictMode(store);
  }

  if (oldVm) {
    if (hot) {
      // dispatch changes in all subscribed watchers
      // to force getter re-evaluation for hot reloading.
      store._withCommit(function () {
        oldVm._data.$$state = null;
      });
    }
    Vue.nextTick(function () { return oldVm.$destroy(); });
  }
}

function installModule (store, rootState, path, module, hot) {
  var isRoot = !path.length;
  var namespace = store._modules.getNamespace(path);

  // register in namespace map
  if (module.namespaced) {
    store._modulesNamespaceMap[namespace] = module;
  }

  // set state
  if (!isRoot && !hot) {
    var parentState = getNestedState(rootState, path.slice(0, -1));
    var moduleName = path[path.length - 1];
    store._withCommit(function () {
      Vue.set(parentState, moduleName, module.state);
    });
  }

  var local = module.context = makeLocalContext(store, namespace, path);

  module.forEachMutation(function (mutation, key) {
    var namespacedType = namespace + key;
    registerMutation(store, namespacedType, mutation, local);
  });

  module.forEachAction(function (action, key) {
    var type = action.root ? key : namespace + key;
    var handler = action.handler || action;
    registerAction(store, type, handler, local);
  });

  module.forEachGetter(function (getter, key) {
    var namespacedType = namespace + key;
    registerGetter(store, namespacedType, getter, local);
  });

  module.forEachChild(function (child, key) {
    installModule(store, rootState, path.concat(key), child, hot);
  });
}

/**
 * make localized dispatch, commit, getters and state
 * if there is no namespace, just use root ones
 */
function makeLocalContext (store, namespace, path) {
  var noNamespace = namespace === '';

  var local = {
    dispatch: noNamespace ? store.dispatch : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if ( true && !store._actions[type]) {
          console.error(("[vuex] unknown local action type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      return store.dispatch(type, payload)
    },

    commit: noNamespace ? store.commit : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if ( true && !store._mutations[type]) {
          console.error(("[vuex] unknown local mutation type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      store.commit(type, payload, options);
    }
  };

  // getters and state object must be gotten lazily
  // because they will be changed by vm update
  Object.defineProperties(local, {
    getters: {
      get: noNamespace
        ? function () { return store.getters; }
        : function () { return makeLocalGetters(store, namespace); }
    },
    state: {
      get: function () { return getNestedState(store.state, path); }
    }
  });

  return local
}

function makeLocalGetters (store, namespace) {
  var gettersProxy = {};

  var splitPos = namespace.length;
  Object.keys(store.getters).forEach(function (type) {
    // skip if the target getter is not match this namespace
    if (type.slice(0, splitPos) !== namespace) { return }

    // extract local getter type
    var localType = type.slice(splitPos);

    // Add a port to the getters proxy.
    // Define as getter property because
    // we do not want to evaluate the getters in this time.
    Object.defineProperty(gettersProxy, localType, {
      get: function () { return store.getters[type]; },
      enumerable: true
    });
  });

  return gettersProxy
}

function registerMutation (store, type, handler, local) {
  var entry = store._mutations[type] || (store._mutations[type] = []);
  entry.push(function wrappedMutationHandler (payload) {
    handler.call(store, local.state, payload);
  });
}

function registerAction (store, type, handler, local) {
  var entry = store._actions[type] || (store._actions[type] = []);
  entry.push(function wrappedActionHandler (payload, cb) {
    var res = handler.call(store, {
      dispatch: local.dispatch,
      commit: local.commit,
      getters: local.getters,
      state: local.state,
      rootGetters: store.getters,
      rootState: store.state
    }, payload, cb);
    if (!isPromise(res)) {
      res = Promise.resolve(res);
    }
    if (store._devtoolHook) {
      return res.catch(function (err) {
        store._devtoolHook.emit('vuex:error', err);
        throw err
      })
    } else {
      return res
    }
  });
}

function registerGetter (store, type, rawGetter, local) {
  if (store._wrappedGetters[type]) {
    if (true) {
      console.error(("[vuex] duplicate getter key: " + type));
    }
    return
  }
  store._wrappedGetters[type] = function wrappedGetter (store) {
    return rawGetter(
      local.state, // local state
      local.getters, // local getters
      store.state, // root state
      store.getters // root getters
    )
  };
}

function enableStrictMode (store) {
  store._vm.$watch(function () { return this._data.$$state }, function () {
    if (true) {
      assert(store._committing, "Do not mutate vuex store state outside mutation handlers.");
    }
  }, { deep: true, sync: true });
}

function getNestedState (state, path) {
  return path.length
    ? path.reduce(function (state, key) { return state[key]; }, state)
    : state
}

function unifyObjectStyle (type, payload, options) {
  if (isObject(type) && type.type) {
    options = payload;
    payload = type;
    type = type.type;
  }

  if (true) {
    assert(typeof type === 'string', ("Expects string as the type, but found " + (typeof type) + "."));
  }

  return { type: type, payload: payload, options: options }
}

function install (_Vue) {
  if (Vue && _Vue === Vue) {
    if (true) {
      console.error(
        '[vuex] already installed. Vue.use(Vuex) should be called only once.'
      );
    }
    return
  }
  Vue = _Vue;
  applyMixin(Vue);
}

var mapState = normalizeNamespace(function (namespace, states) {
  var res = {};
  normalizeMap(states).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedState () {
      var state = this.$store.state;
      var getters = this.$store.getters;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapState', namespace);
        if (!module) {
          return
        }
        state = module.context.state;
        getters = module.context.getters;
      }
      return typeof val === 'function'
        ? val.call(this, state, getters)
        : state[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

var mapMutations = normalizeNamespace(function (namespace, mutations) {
  var res = {};
  normalizeMap(mutations).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedMutation () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      var commit = this.$store.commit;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapMutations', namespace);
        if (!module) {
          return
        }
        commit = module.context.commit;
      }
      return typeof val === 'function'
        ? val.apply(this, [commit].concat(args))
        : commit.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

var mapGetters = normalizeNamespace(function (namespace, getters) {
  var res = {};
  normalizeMap(getters).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    val = namespace + val;
    res[key] = function mappedGetter () {
      if (namespace && !getModuleByNamespace(this.$store, 'mapGetters', namespace)) {
        return
      }
      if ( true && !(val in this.$store.getters)) {
        console.error(("[vuex] unknown getter: " + val));
        return
      }
      return this.$store.getters[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

var mapActions = normalizeNamespace(function (namespace, actions) {
  var res = {};
  normalizeMap(actions).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedAction () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      var dispatch = this.$store.dispatch;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapActions', namespace);
        if (!module) {
          return
        }
        dispatch = module.context.dispatch;
      }
      return typeof val === 'function'
        ? val.apply(this, [dispatch].concat(args))
        : dispatch.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

var createNamespacedHelpers = function (namespace) { return ({
  mapState: mapState.bind(null, namespace),
  mapGetters: mapGetters.bind(null, namespace),
  mapMutations: mapMutations.bind(null, namespace),
  mapActions: mapActions.bind(null, namespace)
}); };

function normalizeMap (map) {
  return Array.isArray(map)
    ? map.map(function (key) { return ({ key: key, val: key }); })
    : Object.keys(map).map(function (key) { return ({ key: key, val: map[key] }); })
}

function normalizeNamespace (fn) {
  return function (namespace, map) {
    if (typeof namespace !== 'string') {
      map = namespace;
      namespace = '';
    } else if (namespace.charAt(namespace.length - 1) !== '/') {
      namespace += '/';
    }
    return fn(namespace, map)
  }
}

function getModuleByNamespace (store, helper, namespace) {
  var module = store._modulesNamespaceMap[namespace];
  if ( true && !module) {
    console.error(("[vuex] module namespace not found in " + helper + "(): " + namespace));
  }
  return module
}

var index_esm = {
  Store: Store,
  install: install,
  version: '3.0.1',
  mapState: mapState,
  mapMutations: mapMutations,
  mapGetters: mapGetters,
  mapActions: mapActions,
  createNamespacedHelpers: createNamespacedHelpers
};


/* harmony default export */ __webpack_exports__["default"] = (index_esm);


/***/ }),

/***/ 17:
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 18:
/*!**************************************!*\
  !*** D:/UAD/Jdt-zhcx/common/Ctky.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /* 接口参数区 */
// 示例
var userInfo = {
  status: 1, //成功/失败提示返回值
  data: {
    unid: 183252546, //唯一ID标示
    mobile: 18888888888, //手机号码
    nickname: '茜茜爱玩', //姓名
    gender: 1, //性别
    birthday: '1994-01-19', //生日
    permanent: '福建省南平市武夷山市', //地址
    autograph: '喜欢可以点关注哦~', //签名
    portrait: '/static/user/touxiang2.jpg', //头像
    bg: '/static/index/banner2.jpg' //背景图
  },
  msg: '提示' };




// 接口声明区
var _default = {
  userInfo: userInfo };exports.default = _default;

/***/ }),

/***/ 19:
/*!*************************************!*\
  !*** D:/UAD/Jdt-zhcx/common/Czc.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /* 接口参数区 */
// 示例

var GaoDeWebKey = [
"2348ba1d476b5e44917533b65583f969",
"1df2cef2c0e71acc0ed1e90d5bf6431a"];


var InterfaceAddress = [
//根据起终点经纬度获取线路规划
//使用页面 - /CZC/CallAndDrive - 
'http://111.231.109.113:8002/api/zhcx/getPlanningLineByLonLat',
//获取所有车辆定位数据
'http://111.231.109.113:8002/api/zhcx/getAllVehiclePosition',
//根据经纬度获取附近一定范围的经纬度
'http://111.231.109.113:8002/api/zhcx/getLonLatRangeVehiclePosition'];


//旅客端出租车接口配置

//接口域名
var Url = 'http://111.231.109.113:8002';

//接口对象
var Interface = {
  //GET-POST
  AddExpressOrder_Passenger: {
    value: Url + '/api/taxi/AddExpressOrder_Passenger',
    name: '旅客端-出租车下单',
    method: 'POST',
    pages: ["Home/ChooseSite.nvue"] },

  SearchExpressOrderByOrderNum_Passenger: {
    value: Url + '/api/taxi/SearchExpressOrderByOrderNum_Passenger',
    name: '旅客端-等车时候根据订单号查询出租车快车订单',
    method: 'POST',
    page: ["CZC/CallAndDrive.nvue"] },

  CancelExpressOrderByOrderNum_Passenger: {
    value: Url + '/api/taxi/CancelExpressOrderByOrderNum_Passenger',
    name: '旅客端-根据订单号取消订单',
    method: 'POST',
    page: ["CZC/CallAndDrive.nvue"] },

  addPassengerOneTouchAlarm: {
    value: Url + '/api/taxi/addPassengerOneTouchAlarm',
    name: '旅客端-一键报警',
    method: 'POST',
    page: ["CZC/CallAndDrive.nvue"] },

  addPassengerEvaluate_Passenger: {
    value: Url + '/api/taxi/addPassengerEvaluate_Passenger',
    name: '旅客端-添加评价',
    method: 'POST',
    page: ["CZC/OrderDetail.nvue", "CZC/SpecialLineDetail.nvue"] } };



var dateFormat = {
  dateformat: 'Y-m-d H:i:s' };

// 接口声明区
var _default = {
  GaoDeWebKey: GaoDeWebKey,
  InterfaceAddress: InterfaceAddress,
  Interface: Interface,
  dateFormat: dateFormat };exports.default = _default;

/***/ }),

/***/ 2:
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2020 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    {
      if(vm.$scope && vm.$scope.is){
        return vm.$scope.is
      }
    }
    if (vm.$root === vm) {
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm) {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  // fixed by xxxxxx (nvue vuex)
  /* eslint-disable no-undef */
  if(typeof SharedObject !== 'undefined'){
    this.id = SharedObject.uid++;
  } else {
    this.id = uid++;
  }
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = typeof SharedObject !== 'undefined' ? SharedObject : {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i++, i)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  
  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);
  
  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu'){//百度 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    !vm._$fallback && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    !vm._$fallback && initProvide(vm); // resolve provide after data/props
    !vm._$fallback && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue != pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);
  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  !vm._$fallback && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err) {
    console.error(err);
    /* eslint-disable no-undef */
    var app = getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      this.$scope['triggerEvent'](event, {
        __args__: toArray(arguments, 1)
      });
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string,number
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onError',
    //Page
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3)))

/***/ }),

/***/ 20:
/*!************************************!*\
  !*** D:/UAD/Jdt-zhcx/common/Dd.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /* 接口参数区 */
// 示例
var userInfo = {
  status: 1, //成功/失败提示返回值
  data: {
    unid: 183252546, //唯一ID标示
    mobile: 18888888888, //手机号码
    nickname: '茜茜爱玩', //姓名
    gender: 1, //性别
    birthday: '1994-01-19', //生日
    permanent: '福建省南平市武夷山市', //地址
    autograph: '喜欢可以点关注哦~', //签名
    portrait: '/static/user/touxiang2.jpg', //头像
    bg: '/static/index/banner2.jpg' //背景图
  },
  msg: '提示' };




// 接口声明区
var _default = {
  userInfo: userInfo };exports.default = _default;

/***/ }),

/***/ 21:
/*!**************************************!*\
  !*** D:/UAD/Jdt-zhcx/common/Gjcx.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /* 接口参数区 */
// 示例
var userInfo = {
  status: 1, //成功/失败提示返回值
  data: {
    unid: 183252546, //唯一ID标示
    mobile: 18888888888, //手机号码
    nickname: '茜茜爱玩', //姓名
    gender: 1, //性别
    birthday: '1994-01-19', //生日
    permanent: '福建省南平市武夷山市', //地址
    autograph: '喜欢可以点关注哦~', //签名
    portrait: '/static/user/touxiang2.jpg', //头像
    bg: '/static/index/banner2.jpg' //背景图
  },
  msg: '提示' };

var nearBy = {
  status: 1, //成功/失败提示返回值
  data: {
    stationID: '123',
    stationName: '信和站',
    distance: '170米' },

  msg: '提示' };

var line = {
  status: 1, //成功/失败提示返回值
  data: [{
    lineID: '1',
    lineName: 'X2路',
    direction: '新塘·尚好家园',
    distance: '120',
    stationNumber: '即将到站',
    arriveTime: '1分钟',
    unit: '千米' //距离单位
  }, {
    lineID: '2',
    lineName: '17路',
    direction: '福厦高铁泉州站',
    distance: '400',
    stationNumber: '1站',
    arriveTime: '1分钟',
    unit: '千米' //距离单位
  },
  {
    lineID: '3',
    lineName: '19路',
    direction: '航空旅游首末站',
    distance: '1.1',
    stationNumber: '2站',
    arriveTime: '3分钟',
    unit: '千米' //距离单位
  },
  {
    lineID: '4',
    lineName: 'K508路',
    direction: '市中医院首末站',
    distance: '5',
    stationNumber: '5站',
    arriveTime: '13分钟',
    unit: '千米' //距离单位
  }],
  msg: '提示' };

var detailLine = {
  status: 1, //成功/失败提示返回值
  data: {
    lineID: '3',
    starStation: '武夷花园',
    endStation: '五金机电产业园',
    starTime: '06:00',
    endTime: '18:00',
    price: '4元',
    departureInterval: '15',
    departureTime: '10:00',
    distance: '600',
    unit: '米' } };


// 实时动态
var realtimeDynamic = {
  status: 1, //成功/失败提示返回值
  direction: 0, //判断方向 有0,1
  data: [{
    stationID: '1',
    stationName: '武夷花园',
    stationStatu: '0', //道路状态：0通畅，1一般，2拥堵
    isArrive: '0' //是否到站：0未到站，1到站
  },
  {
    stationID: '2',
    stationName: '玉屏公园 长富花园',
    stationStatu: '1', //道路状态：0通畅，1一般，2拥堵
    isArrive: '0' //是否到站：0未到站，1到站
  },
  {
    stationID: '3',
    stationName: '交通运输局 住建局',
    stationStatu: '1', //道路状态：0通畅，1一般，2拥堵
    isArrive: '1' //是否到站：0未到站，1到站
  },
  {
    stationID: '4',
    stationName: '商业城 小方舞蹈中心',
    stationStatu: '2', //道路状态：0通畅，1一般，2拥堵
    isArrive: '0' //是否到站：0未到站，1到站
  },
  {
    stationID: '5',
    stationName: '爱尚生活城 文化广场',
    stationStatu: '2', //道路状态：0通畅，1一般，2拥堵
    isArrive: '0' //是否到站：0未到站，1到站
  },
  {
    stationID: '6',
    stationName: '人民路',
    stationStatu: '0', //道路状态：0通畅，1一般，2堵
    isArrive: '0' //是否到站：0未到站，1到站
  },
  {
    stationID: '7',
    stationName: '西湖公园',
    stationStatu: '0', //道路状态：0通畅，1一般，2堵
    isArrive: '0' //是否到站：0未到站，1到站
  }],
  msg: '提示' };

//反向
var realtimeDynamicback = {
  status: 1, //成功/失败提示返回值
  direction: 1, //判断方向 有0,1
  data: [
  {
    stationID: '7',
    stationName: '西湖公园',
    stationStatu: '0', //道路状态：0通畅，1一般，2堵
    isArrive: '0' //是否到站：0未到站，1到站
  },
  {
    stationID: '6',
    stationName: '人民路',
    stationStatu: '0', //道路状态：0通畅，1一般，2堵
    isArrive: '0' //是否到站：0未到站，1到站
  },
  {
    stationID: '5',
    stationName: '爱尚生活城   文化广场',
    stationStatu: '2', //道路状态：0通畅，1一般，2拥堵
    isArrive: '0' //是否到站：0未到站，1到站
  },
  {
    stationID: '4',
    stationName: '商业城   小方舞蹈中心',
    stationStatu: '2', //道路状态：0通畅，1一般，2拥堵
    isArrive: '0' //是否到站：0未到站，1到站
  },
  {
    stationID: '3',
    stationName: '交通运输局   住建局',
    stationStatu: '1', //道路状态：0通畅，1一般，2拥堵
    isArrive: '1' //是否到站：0未到站，1到站
  },
  {
    stationID: '2',
    stationName: '玉屏公园   长富花园',
    stationStatu: '1', //道路状态：0通畅，1一般，2拥堵
    isArrive: '0' //是否到站：0未到站，1到站
  },
  {
    stationID: '1',
    stationName: '武夷花园',
    stationStatu: '0', //道路状态：0通畅，1一般，2拥堵
    isArrive: '0' //是否到站：0未到站，1到站
  }],
  msg: '提示' };

var InterfaceAddress = [

//获取线路信息，根据站点名称
'http://111.231.109.113:8002/api/bus/getBusLineInfoByStationName',
//获取离某个经纬度最近的一个站点信息，根据经纬度信息
'http://111.231.109.113:8002/api/bus/getBusStationInfoByLonLat',
//获取线路站点信息，根据线路编号，线路方向
'http://111.231.109.113:8002/api/bus/getBusLineStationInfoByLineIdDirection',
//获取车辆实时到站信息，根据线路编号，线路方向
'http://111.231.109.113:8002/api/bus/getBusArriveLeaveStationInfoByLineIdDirection',
//获取距离某站最近车辆信息 根据线路编号，方向，站点名称 
'http://111.231.109.113:8002/api/bus/getBusLineArriveLeaveStationInfoByLineIdDirectionStationName',
//根据起始点经纬度获取距离
'http://111.231.109.113:8002/api/zhcx/getPlanningLineByLonLat',
//获取线路轨迹定位信息，根据线路编号，线路方向
'http://111.231.109.113:8002/api/bus/getBusLineTrajectoryByLineIdDirection',
//获取所有线路信息
'http://111.231.109.113:8002/api/bus/getBusLineInfo'];

var GaoDeWebKey = [
"2348ba1d476b5e44917533b65583f969",
"1df2cef2c0e71acc0ed1e90d5bf6431a"];

// 接口声明区
var _default = {
  userInfo: userInfo,
  line: line,
  nearBy: nearBy,
  detailLine: detailLine,
  realtimeDynamic: realtimeDynamic,
  realtimeDynamicback: realtimeDynamicback,
  InterfaceAddress: InterfaceAddress,
  GaoDeWebKey: GaoDeWebKey };exports.default = _default;

/***/ }),

/***/ 22:
/*!**************************************!*\
  !*** D:/UAD/Jdt-zhcx/common/Grzx.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /* 接口参数区 */
// 示例
var user = {
  status: 1, //成功/失败提示返回值
  data: {
    chineseName: '张三', //中文姓名
    englishSurname: 'zhang', //英文姓
    englishName: 'san', //英文名
    sex: 0, //性别，0代表男，1代表女
    codeNum: '3333333', //身份证号
    date: '1998-04-29', //有效期
    person: 0, //是否设置为本人，0代表否，1代表是
    phoneNum: '15260769766' //电话号码
  },
  msg: '乘车人信息' };


var addressInfo = {
  status: 1,
  data: {
    receiver: '张三', //收件人
    phoneNum: '15260769766', //手机号码
    district: '福建省 丰泽区 泉秀路', //所在地区
    detailAddress: '丰泽区', //详细地址
    postalCode: '366300', //邮政编码
    defaultAddress: 0 //是否设置为默认地址，0代表否，1代表是
  },
  msg: '地址详情' };

/* 用户 */
var userInfo = {
  status: 1,
  data: {
    id: 1,
    unid: 183252546,
    mobile: 18888888888,
    nickname: '茜茜爱玩',
    gender: 1,
    birthday: '1994-01-19',
    permanent: '福建省南平市武夷山市',
    autograph: '喜欢可以点关注哦~',
    portrait: '/static/user/touxiang2.jpg',
    bg: '/static/index/banner2.jpg' },

  msg: '用户信息' };


//const Url='http://111.231.109.113:8002';
var Url = 'http://zntc.145u.net';
var Url1 = 'http://111.231.109.113:8002';
var Interface = {
  login: {
    value: Url + '/api/person/login',
    name: '用户登录',
    method: 'POST',
    pages: [] },

  changeInfo: {
    value: Url + '/api/person/changeInfo',
    name: '修改个人信息（除头像外）',
    method: 'POST',
    pages: [] },

  userInfoList: {
    value: Url + '/api/person/userInfoList',
    name: '获取乘车人信息',
    method: 'POST',
    pages: [] },

  changeUserInfo: {
    value: Url + '/api/person/changeUserInfo',
    name: '修改乘车人信息',
    method: 'POST',
    pages: [] },

  deletuserInfoList: {
    value: Url + '/api/person/deletuserInfoList',
    name: '删除乘车人信息',
    method: 'POST',
    pages: [] },

  getLoginCode: {
    value: Url + '/api/person/getLoginCode',
    name: '获取手机验证码',
    method: 'POST',
    pages: [] },

  userInfoListDetail: {
    value: Url + '/api/person/userInfoListDetail',
    name: '获取详细信息',
    method: 'POST',
    pages: [] },

  BindPersonInfoOpenID_wxAndPhoneNumber: {
    value: Url + '/api/person/BindPersonInfoOpenID_wxAndPhoneNumber',
    name: '微信openid，绑定手机号',
    method: 'POST',
    pages: [] },

  changeInfoPortrait: {
    value: Url + '/api/person/changeInfoPortrait',
    name: '只修改头像',
    method: 'POST',
    pages: [] },

  GetUserInfoByOpenId_wx: {
    value: Url + '/api/person/GetUserInfoByOpenId_wx',
    name: '通过微信的openid获取用户信息',
    method: 'POST',
    pages: [] },

  GetUserInfoByOpenId_qq: {
    value: Url + '/api/person/GetUserInfoByOpenId_qq',
    name: '通过qq的openid获取用户信息',
    method: 'POST',
    pages: [] },

  SearchVersion: {
    value: Url + '/api/person/SearchVersion',
    name: '获取版本号',
    method: 'POST',
    pages: [] } };




// 接口声明区
var _default = {
  userInfo: userInfo, addressInfo: addressInfo, user: user, Interface: Interface };exports.default = _default;

/***/ }),

/***/ 224:
/*!*****************************************!*\
  !*** D:/UAD/Jdt-zhcx/common/uqrcode.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; //---------------------------------------------------------------------
// github https://github.com/Sansnn/uQRCode
//---------------------------------------------------------------------

var uQRCode = {};

(function () {
  //---------------------------------------------------------------------
  // QRCode for JavaScript
  //
  // Copyright (c) 2009 Kazuhiko Arase
  //
  // URL: http://www.d-project.com/
  //
  // Licensed under the MIT license:
  //   http://www.opensource.org/licenses/mit-license.php
  //
  // The word "QR Code" is registered trademark of 
  // DENSO WAVE INCORPORATED
  //   http://www.denso-wave.com/qrcode/faqpatent-e.html
  //
  //---------------------------------------------------------------------

  //---------------------------------------------------------------------
  // QR8bitByte
  //---------------------------------------------------------------------

  function QR8bitByte(data) {
    this.mode = QRMode.MODE_8BIT_BYTE;
    this.data = data;
  }

  QR8bitByte.prototype = {

    getLength: function getLength(buffer) {
      return this.data.length;
    },

    write: function write(buffer) {
      for (var i = 0; i < this.data.length; i++) {
        // not JIS ...
        buffer.put(this.data.charCodeAt(i), 8);
      }
    } };


  //---------------------------------------------------------------------
  // QRCode
  //---------------------------------------------------------------------

  function QRCode(typeNumber, errorCorrectLevel) {
    this.typeNumber = typeNumber;
    this.errorCorrectLevel = errorCorrectLevel;
    this.modules = null;
    this.moduleCount = 0;
    this.dataCache = null;
    this.dataList = new Array();
  }

  QRCode.prototype = {

    addData: function addData(data) {
      var newData = new QR8bitByte(data);
      this.dataList.push(newData);
      this.dataCache = null;
    },

    isDark: function isDark(row, col) {
      if (row < 0 || this.moduleCount <= row || col < 0 || this.moduleCount <= col) {
        throw new Error(row + "," + col);
      }
      return this.modules[row][col];
    },

    getModuleCount: function getModuleCount() {
      return this.moduleCount;
    },

    make: function make() {
      // Calculate automatically typeNumber if provided is < 1
      if (this.typeNumber < 1) {
        var typeNumber = 1;
        for (typeNumber = 1; typeNumber < 40; typeNumber++) {
          var rsBlocks = QRRSBlock.getRSBlocks(typeNumber, this.errorCorrectLevel);

          var buffer = new QRBitBuffer();
          var totalDataCount = 0;
          for (var i = 0; i < rsBlocks.length; i++) {
            totalDataCount += rsBlocks[i].dataCount;
          }

          for (var i = 0; i < this.dataList.length; i++) {
            var data = this.dataList[i];
            buffer.put(data.mode, 4);
            buffer.put(data.getLength(), QRUtil.getLengthInBits(data.mode, typeNumber));
            data.write(buffer);
          }
          if (buffer.getLengthInBits() <= totalDataCount * 8)
          break;
        }
        this.typeNumber = typeNumber;
      }
      this.makeImpl(false, this.getBestMaskPattern());
    },

    makeImpl: function makeImpl(test, maskPattern) {

      this.moduleCount = this.typeNumber * 4 + 17;
      this.modules = new Array(this.moduleCount);

      for (var row = 0; row < this.moduleCount; row++) {

        this.modules[row] = new Array(this.moduleCount);

        for (var col = 0; col < this.moduleCount; col++) {
          this.modules[row][col] = null; //(col + row) % 3;
        }
      }

      this.setupPositionProbePattern(0, 0);
      this.setupPositionProbePattern(this.moduleCount - 7, 0);
      this.setupPositionProbePattern(0, this.moduleCount - 7);
      this.setupPositionAdjustPattern();
      this.setupTimingPattern();
      this.setupTypeInfo(test, maskPattern);

      if (this.typeNumber >= 7) {
        this.setupTypeNumber(test);
      }

      if (this.dataCache == null) {
        this.dataCache = QRCode.createData(this.typeNumber, this.errorCorrectLevel, this.dataList);
      }

      this.mapData(this.dataCache, maskPattern);
    },

    setupPositionProbePattern: function setupPositionProbePattern(row, col) {

      for (var r = -1; r <= 7; r++) {

        if (row + r <= -1 || this.moduleCount <= row + r) continue;

        for (var c = -1; c <= 7; c++) {

          if (col + c <= -1 || this.moduleCount <= col + c) continue;

          if (0 <= r && r <= 6 && (c == 0 || c == 6) ||
          0 <= c && c <= 6 && (r == 0 || r == 6) ||
          2 <= r && r <= 4 && 2 <= c && c <= 4) {
            this.modules[row + r][col + c] = true;
          } else {
            this.modules[row + r][col + c] = false;
          }
        }
      }
    },

    getBestMaskPattern: function getBestMaskPattern() {

      var minLostPoint = 0;
      var pattern = 0;

      for (var i = 0; i < 8; i++) {

        this.makeImpl(true, i);

        var lostPoint = QRUtil.getLostPoint(this);

        if (i == 0 || minLostPoint > lostPoint) {
          minLostPoint = lostPoint;
          pattern = i;
        }
      }

      return pattern;
    },

    createMovieClip: function createMovieClip(target_mc, instance_name, depth) {

      var qr_mc = target_mc.createEmptyMovieClip(instance_name, depth);
      var cs = 1;

      this.make();

      for (var row = 0; row < this.modules.length; row++) {

        var y = row * cs;

        for (var col = 0; col < this.modules[row].length; col++) {

          var x = col * cs;
          var dark = this.modules[row][col];

          if (dark) {
            qr_mc.beginFill(0, 100);
            qr_mc.moveTo(x, y);
            qr_mc.lineTo(x + cs, y);
            qr_mc.lineTo(x + cs, y + cs);
            qr_mc.lineTo(x, y + cs);
            qr_mc.endFill();
          }
        }
      }

      return qr_mc;
    },

    setupTimingPattern: function setupTimingPattern() {

      for (var r = 8; r < this.moduleCount - 8; r++) {
        if (this.modules[r][6] != null) {
          continue;
        }
        this.modules[r][6] = r % 2 == 0;
      }

      for (var c = 8; c < this.moduleCount - 8; c++) {
        if (this.modules[6][c] != null) {
          continue;
        }
        this.modules[6][c] = c % 2 == 0;
      }
    },

    setupPositionAdjustPattern: function setupPositionAdjustPattern() {

      var pos = QRUtil.getPatternPosition(this.typeNumber);

      for (var i = 0; i < pos.length; i++) {

        for (var j = 0; j < pos.length; j++) {

          var row = pos[i];
          var col = pos[j];

          if (this.modules[row][col] != null) {
            continue;
          }

          for (var r = -2; r <= 2; r++) {

            for (var c = -2; c <= 2; c++) {

              if (r == -2 || r == 2 || c == -2 || c == 2 ||
              r == 0 && c == 0) {
                this.modules[row + r][col + c] = true;
              } else {
                this.modules[row + r][col + c] = false;
              }
            }
          }
        }
      }
    },

    setupTypeNumber: function setupTypeNumber(test) {

      var bits = QRUtil.getBCHTypeNumber(this.typeNumber);

      for (var i = 0; i < 18; i++) {
        var mod = !test && (bits >> i & 1) == 1;
        this.modules[Math.floor(i / 3)][i % 3 + this.moduleCount - 8 - 3] = mod;
      }

      for (var i = 0; i < 18; i++) {
        var mod = !test && (bits >> i & 1) == 1;
        this.modules[i % 3 + this.moduleCount - 8 - 3][Math.floor(i / 3)] = mod;
      }
    },

    setupTypeInfo: function setupTypeInfo(test, maskPattern) {

      var data = this.errorCorrectLevel << 3 | maskPattern;
      var bits = QRUtil.getBCHTypeInfo(data);

      // vertical		
      for (var i = 0; i < 15; i++) {

        var mod = !test && (bits >> i & 1) == 1;

        if (i < 6) {
          this.modules[i][8] = mod;
        } else if (i < 8) {
          this.modules[i + 1][8] = mod;
        } else {
          this.modules[this.moduleCount - 15 + i][8] = mod;
        }
      }

      // horizontal
      for (var i = 0; i < 15; i++) {

        var mod = !test && (bits >> i & 1) == 1;

        if (i < 8) {
          this.modules[8][this.moduleCount - i - 1] = mod;
        } else if (i < 9) {
          this.modules[8][15 - i - 1 + 1] = mod;
        } else {
          this.modules[8][15 - i - 1] = mod;
        }
      }

      // fixed module
      this.modules[this.moduleCount - 8][8] = !test;

    },

    mapData: function mapData(data, maskPattern) {

      var inc = -1;
      var row = this.moduleCount - 1;
      var bitIndex = 7;
      var byteIndex = 0;

      for (var col = this.moduleCount - 1; col > 0; col -= 2) {

        if (col == 6) col--;

        while (true) {

          for (var c = 0; c < 2; c++) {

            if (this.modules[row][col - c] == null) {

              var dark = false;

              if (byteIndex < data.length) {
                dark = (data[byteIndex] >>> bitIndex & 1) == 1;
              }

              var mask = QRUtil.getMask(maskPattern, row, col - c);

              if (mask) {
                dark = !dark;
              }

              this.modules[row][col - c] = dark;
              bitIndex--;

              if (bitIndex == -1) {
                byteIndex++;
                bitIndex = 7;
              }
            }
          }

          row += inc;

          if (row < 0 || this.moduleCount <= row) {
            row -= inc;
            inc = -inc;
            break;
          }
        }
      }

    } };



  QRCode.PAD0 = 0xEC;
  QRCode.PAD1 = 0x11;

  QRCode.createData = function (typeNumber, errorCorrectLevel, dataList) {

    var rsBlocks = QRRSBlock.getRSBlocks(typeNumber, errorCorrectLevel);

    var buffer = new QRBitBuffer();

    for (var i = 0; i < dataList.length; i++) {
      var data = dataList[i];
      buffer.put(data.mode, 4);
      buffer.put(data.getLength(), QRUtil.getLengthInBits(data.mode, typeNumber));
      data.write(buffer);
    }

    // calc num max data.
    var totalDataCount = 0;
    for (var i = 0; i < rsBlocks.length; i++) {
      totalDataCount += rsBlocks[i].dataCount;
    }

    if (buffer.getLengthInBits() > totalDataCount * 8) {
      throw new Error("code length overflow. (" +
      buffer.getLengthInBits() +
      ">" +
      totalDataCount * 8 +
      ")");
    }

    // end code
    if (buffer.getLengthInBits() + 4 <= totalDataCount * 8) {
      buffer.put(0, 4);
    }

    // padding
    while (buffer.getLengthInBits() % 8 != 0) {
      buffer.putBit(false);
    }

    // padding
    while (true) {

      if (buffer.getLengthInBits() >= totalDataCount * 8) {
        break;
      }
      buffer.put(QRCode.PAD0, 8);

      if (buffer.getLengthInBits() >= totalDataCount * 8) {
        break;
      }
      buffer.put(QRCode.PAD1, 8);
    }

    return QRCode.createBytes(buffer, rsBlocks);
  };

  QRCode.createBytes = function (buffer, rsBlocks) {

    var offset = 0;

    var maxDcCount = 0;
    var maxEcCount = 0;

    var dcdata = new Array(rsBlocks.length);
    var ecdata = new Array(rsBlocks.length);

    for (var r = 0; r < rsBlocks.length; r++) {

      var dcCount = rsBlocks[r].dataCount;
      var ecCount = rsBlocks[r].totalCount - dcCount;

      maxDcCount = Math.max(maxDcCount, dcCount);
      maxEcCount = Math.max(maxEcCount, ecCount);

      dcdata[r] = new Array(dcCount);

      for (var i = 0; i < dcdata[r].length; i++) {
        dcdata[r][i] = 0xff & buffer.buffer[i + offset];
      }
      offset += dcCount;

      var rsPoly = QRUtil.getErrorCorrectPolynomial(ecCount);
      var rawPoly = new QRPolynomial(dcdata[r], rsPoly.getLength() - 1);

      var modPoly = rawPoly.mod(rsPoly);
      ecdata[r] = new Array(rsPoly.getLength() - 1);
      for (var i = 0; i < ecdata[r].length; i++) {
        var modIndex = i + modPoly.getLength() - ecdata[r].length;
        ecdata[r][i] = modIndex >= 0 ? modPoly.get(modIndex) : 0;
      }

    }

    var totalCodeCount = 0;
    for (var i = 0; i < rsBlocks.length; i++) {
      totalCodeCount += rsBlocks[i].totalCount;
    }

    var data = new Array(totalCodeCount);
    var index = 0;

    for (var i = 0; i < maxDcCount; i++) {
      for (var r = 0; r < rsBlocks.length; r++) {
        if (i < dcdata[r].length) {
          data[index++] = dcdata[r][i];
        }
      }
    }

    for (var i = 0; i < maxEcCount; i++) {
      for (var r = 0; r < rsBlocks.length; r++) {
        if (i < ecdata[r].length) {
          data[index++] = ecdata[r][i];
        }
      }
    }

    return data;

  };

  //---------------------------------------------------------------------
  // QRMode
  //---------------------------------------------------------------------

  var QRMode = {
    MODE_NUMBER: 1 << 0,
    MODE_ALPHA_NUM: 1 << 1,
    MODE_8BIT_BYTE: 1 << 2,
    MODE_KANJI: 1 << 3 };


  //---------------------------------------------------------------------
  // QRErrorCorrectLevel
  //---------------------------------------------------------------------

  var QRErrorCorrectLevel = {
    L: 1,
    M: 0,
    Q: 3,
    H: 2 };


  //---------------------------------------------------------------------
  // QRMaskPattern
  //---------------------------------------------------------------------

  var QRMaskPattern = {
    PATTERN000: 0,
    PATTERN001: 1,
    PATTERN010: 2,
    PATTERN011: 3,
    PATTERN100: 4,
    PATTERN101: 5,
    PATTERN110: 6,
    PATTERN111: 7 };


  //---------------------------------------------------------------------
  // QRUtil
  //---------------------------------------------------------------------

  var QRUtil = {

    PATTERN_POSITION_TABLE: [
    [],
    [6, 18],
    [6, 22],
    [6, 26],
    [6, 30],
    [6, 34],
    [6, 22, 38],
    [6, 24, 42],
    [6, 26, 46],
    [6, 28, 50],
    [6, 30, 54],
    [6, 32, 58],
    [6, 34, 62],
    [6, 26, 46, 66],
    [6, 26, 48, 70],
    [6, 26, 50, 74],
    [6, 30, 54, 78],
    [6, 30, 56, 82],
    [6, 30, 58, 86],
    [6, 34, 62, 90],
    [6, 28, 50, 72, 94],
    [6, 26, 50, 74, 98],
    [6, 30, 54, 78, 102],
    [6, 28, 54, 80, 106],
    [6, 32, 58, 84, 110],
    [6, 30, 58, 86, 114],
    [6, 34, 62, 90, 118],
    [6, 26, 50, 74, 98, 122],
    [6, 30, 54, 78, 102, 126],
    [6, 26, 52, 78, 104, 130],
    [6, 30, 56, 82, 108, 134],
    [6, 34, 60, 86, 112, 138],
    [6, 30, 58, 86, 114, 142],
    [6, 34, 62, 90, 118, 146],
    [6, 30, 54, 78, 102, 126, 150],
    [6, 24, 50, 76, 102, 128, 154],
    [6, 28, 54, 80, 106, 132, 158],
    [6, 32, 58, 84, 110, 136, 162],
    [6, 26, 54, 82, 110, 138, 166],
    [6, 30, 58, 86, 114, 142, 170]],


    G15: 1 << 10 | 1 << 8 | 1 << 5 | 1 << 4 | 1 << 2 | 1 << 1 | 1 << 0,
    G18: 1 << 12 | 1 << 11 | 1 << 10 | 1 << 9 | 1 << 8 | 1 << 5 | 1 << 2 | 1 << 0,
    G15_MASK: 1 << 14 | 1 << 12 | 1 << 10 | 1 << 4 | 1 << 1,

    getBCHTypeInfo: function getBCHTypeInfo(data) {
      var d = data << 10;
      while (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G15) >= 0) {
        d ^= QRUtil.G15 << QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G15);
      }
      return (data << 10 | d) ^ QRUtil.G15_MASK;
    },

    getBCHTypeNumber: function getBCHTypeNumber(data) {
      var d = data << 12;
      while (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G18) >= 0) {
        d ^= QRUtil.G18 << QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G18);
      }
      return data << 12 | d;
    },

    getBCHDigit: function getBCHDigit(data) {

      var digit = 0;

      while (data != 0) {
        digit++;
        data >>>= 1;
      }

      return digit;
    },

    getPatternPosition: function getPatternPosition(typeNumber) {
      return QRUtil.PATTERN_POSITION_TABLE[typeNumber - 1];
    },

    getMask: function getMask(maskPattern, i, j) {

      switch (maskPattern) {

        case QRMaskPattern.PATTERN000:
          return (i + j) % 2 == 0;
        case QRMaskPattern.PATTERN001:
          return i % 2 == 0;
        case QRMaskPattern.PATTERN010:
          return j % 3 == 0;
        case QRMaskPattern.PATTERN011:
          return (i + j) % 3 == 0;
        case QRMaskPattern.PATTERN100:
          return (Math.floor(i / 2) + Math.floor(j / 3)) % 2 == 0;
        case QRMaskPattern.PATTERN101:
          return i * j % 2 + i * j % 3 == 0;
        case QRMaskPattern.PATTERN110:
          return (i * j % 2 + i * j % 3) % 2 == 0;
        case QRMaskPattern.PATTERN111:
          return (i * j % 3 + (i + j) % 2) % 2 == 0;

        default:
          throw new Error("bad maskPattern:" + maskPattern);}

    },

    getErrorCorrectPolynomial: function getErrorCorrectPolynomial(errorCorrectLength) {

      var a = new QRPolynomial([1], 0);

      for (var i = 0; i < errorCorrectLength; i++) {
        a = a.multiply(new QRPolynomial([1, QRMath.gexp(i)], 0));
      }

      return a;
    },

    getLengthInBits: function getLengthInBits(mode, type) {

      if (1 <= type && type < 10) {

        // 1 - 9

        switch (mode) {
          case QRMode.MODE_NUMBER:
            return 10;
          case QRMode.MODE_ALPHA_NUM:
            return 9;
          case QRMode.MODE_8BIT_BYTE:
            return 8;
          case QRMode.MODE_KANJI:
            return 8;
          default:
            throw new Error("mode:" + mode);}


      } else if (type < 27) {

        // 10 - 26

        switch (mode) {
          case QRMode.MODE_NUMBER:
            return 12;
          case QRMode.MODE_ALPHA_NUM:
            return 11;
          case QRMode.MODE_8BIT_BYTE:
            return 16;
          case QRMode.MODE_KANJI:
            return 10;
          default:
            throw new Error("mode:" + mode);}


      } else if (type < 41) {

        // 27 - 40

        switch (mode) {
          case QRMode.MODE_NUMBER:
            return 14;
          case QRMode.MODE_ALPHA_NUM:
            return 13;
          case QRMode.MODE_8BIT_BYTE:
            return 16;
          case QRMode.MODE_KANJI:
            return 12;
          default:
            throw new Error("mode:" + mode);}


      } else {
        throw new Error("type:" + type);
      }
    },

    getLostPoint: function getLostPoint(qrCode) {

      var moduleCount = qrCode.getModuleCount();

      var lostPoint = 0;

      // LEVEL1

      for (var row = 0; row < moduleCount; row++) {

        for (var col = 0; col < moduleCount; col++) {

          var sameCount = 0;
          var dark = qrCode.isDark(row, col);

          for (var r = -1; r <= 1; r++) {

            if (row + r < 0 || moduleCount <= row + r) {
              continue;
            }

            for (var c = -1; c <= 1; c++) {

              if (col + c < 0 || moduleCount <= col + c) {
                continue;
              }

              if (r == 0 && c == 0) {
                continue;
              }

              if (dark == qrCode.isDark(row + r, col + c)) {
                sameCount++;
              }
            }
          }

          if (sameCount > 5) {
            lostPoint += 3 + sameCount - 5;
          }
        }
      }

      // LEVEL2

      for (var row = 0; row < moduleCount - 1; row++) {
        for (var col = 0; col < moduleCount - 1; col++) {
          var count = 0;
          if (qrCode.isDark(row, col)) count++;
          if (qrCode.isDark(row + 1, col)) count++;
          if (qrCode.isDark(row, col + 1)) count++;
          if (qrCode.isDark(row + 1, col + 1)) count++;
          if (count == 0 || count == 4) {
            lostPoint += 3;
          }
        }
      }

      // LEVEL3

      for (var row = 0; row < moduleCount; row++) {
        for (var col = 0; col < moduleCount - 6; col++) {
          if (qrCode.isDark(row, col) &&
          !qrCode.isDark(row, col + 1) &&
          qrCode.isDark(row, col + 2) &&
          qrCode.isDark(row, col + 3) &&
          qrCode.isDark(row, col + 4) &&
          !qrCode.isDark(row, col + 5) &&
          qrCode.isDark(row, col + 6)) {
            lostPoint += 40;
          }
        }
      }

      for (var col = 0; col < moduleCount; col++) {
        for (var row = 0; row < moduleCount - 6; row++) {
          if (qrCode.isDark(row, col) &&
          !qrCode.isDark(row + 1, col) &&
          qrCode.isDark(row + 2, col) &&
          qrCode.isDark(row + 3, col) &&
          qrCode.isDark(row + 4, col) &&
          !qrCode.isDark(row + 5, col) &&
          qrCode.isDark(row + 6, col)) {
            lostPoint += 40;
          }
        }
      }

      // LEVEL4

      var darkCount = 0;

      for (var col = 0; col < moduleCount; col++) {
        for (var row = 0; row < moduleCount; row++) {
          if (qrCode.isDark(row, col)) {
            darkCount++;
          }
        }
      }

      var ratio = Math.abs(100 * darkCount / moduleCount / moduleCount - 50) / 5;
      lostPoint += ratio * 10;

      return lostPoint;
    } };




  //---------------------------------------------------------------------
  // QRMath
  //---------------------------------------------------------------------

  var QRMath = {

    glog: function glog(n) {

      if (n < 1) {
        throw new Error("glog(" + n + ")");
      }

      return QRMath.LOG_TABLE[n];
    },

    gexp: function gexp(n) {

      while (n < 0) {
        n += 255;
      }

      while (n >= 256) {
        n -= 255;
      }

      return QRMath.EXP_TABLE[n];
    },

    EXP_TABLE: new Array(256),

    LOG_TABLE: new Array(256) };



  for (var i = 0; i < 8; i++) {
    QRMath.EXP_TABLE[i] = 1 << i;
  }
  for (var i = 8; i < 256; i++) {
    QRMath.EXP_TABLE[i] = QRMath.EXP_TABLE[i - 4] ^
    QRMath.EXP_TABLE[i - 5] ^
    QRMath.EXP_TABLE[i - 6] ^
    QRMath.EXP_TABLE[i - 8];
  }
  for (var i = 0; i < 255; i++) {
    QRMath.LOG_TABLE[QRMath.EXP_TABLE[i]] = i;
  }

  //---------------------------------------------------------------------
  // QRPolynomial
  //---------------------------------------------------------------------

  function QRPolynomial(num, shift) {

    if (num.length == undefined) {
      throw new Error(num.length + "/" + shift);
    }

    var offset = 0;

    while (offset < num.length && num[offset] == 0) {
      offset++;
    }

    this.num = new Array(num.length - offset + shift);
    for (var i = 0; i < num.length - offset; i++) {
      this.num[i] = num[i + offset];
    }
  }

  QRPolynomial.prototype = {

    get: function get(index) {
      return this.num[index];
    },

    getLength: function getLength() {
      return this.num.length;
    },

    multiply: function multiply(e) {

      var num = new Array(this.getLength() + e.getLength() - 1);

      for (var i = 0; i < this.getLength(); i++) {
        for (var j = 0; j < e.getLength(); j++) {
          num[i + j] ^= QRMath.gexp(QRMath.glog(this.get(i)) + QRMath.glog(e.get(j)));
        }
      }

      return new QRPolynomial(num, 0);
    },

    mod: function mod(e) {

      if (this.getLength() - e.getLength() < 0) {
        return this;
      }

      var ratio = QRMath.glog(this.get(0)) - QRMath.glog(e.get(0));

      var num = new Array(this.getLength());

      for (var i = 0; i < this.getLength(); i++) {
        num[i] = this.get(i);
      }

      for (var i = 0; i < e.getLength(); i++) {
        num[i] ^= QRMath.gexp(QRMath.glog(e.get(i)) + ratio);
      }

      // recursive call
      return new QRPolynomial(num, 0).mod(e);
    } };


  //---------------------------------------------------------------------
  // QRRSBlock
  //---------------------------------------------------------------------

  function QRRSBlock(totalCount, dataCount) {
    this.totalCount = totalCount;
    this.dataCount = dataCount;
  }

  QRRSBlock.RS_BLOCK_TABLE = [

  // L
  // M
  // Q
  // H

  // 1
  [1, 26, 19],
  [1, 26, 16],
  [1, 26, 13],
  [1, 26, 9],

  // 2
  [1, 44, 34],
  [1, 44, 28],
  [1, 44, 22],
  [1, 44, 16],

  // 3
  [1, 70, 55],
  [1, 70, 44],
  [2, 35, 17],
  [2, 35, 13],

  // 4		
  [1, 100, 80],
  [2, 50, 32],
  [2, 50, 24],
  [4, 25, 9],

  // 5
  [1, 134, 108],
  [2, 67, 43],
  [2, 33, 15, 2, 34, 16],
  [2, 33, 11, 2, 34, 12],

  // 6
  [2, 86, 68],
  [4, 43, 27],
  [4, 43, 19],
  [4, 43, 15],

  // 7		
  [2, 98, 78],
  [4, 49, 31],
  [2, 32, 14, 4, 33, 15],
  [4, 39, 13, 1, 40, 14],

  // 8
  [2, 121, 97],
  [2, 60, 38, 2, 61, 39],
  [4, 40, 18, 2, 41, 19],
  [4, 40, 14, 2, 41, 15],

  // 9
  [2, 146, 116],
  [3, 58, 36, 2, 59, 37],
  [4, 36, 16, 4, 37, 17],
  [4, 36, 12, 4, 37, 13],

  // 10		
  [2, 86, 68, 2, 87, 69],
  [4, 69, 43, 1, 70, 44],
  [6, 43, 19, 2, 44, 20],
  [6, 43, 15, 2, 44, 16],

  // 11
  [4, 101, 81],
  [1, 80, 50, 4, 81, 51],
  [4, 50, 22, 4, 51, 23],
  [3, 36, 12, 8, 37, 13],

  // 12
  [2, 116, 92, 2, 117, 93],
  [6, 58, 36, 2, 59, 37],
  [4, 46, 20, 6, 47, 21],
  [7, 42, 14, 4, 43, 15],

  // 13
  [4, 133, 107],
  [8, 59, 37, 1, 60, 38],
  [8, 44, 20, 4, 45, 21],
  [12, 33, 11, 4, 34, 12],

  // 14
  [3, 145, 115, 1, 146, 116],
  [4, 64, 40, 5, 65, 41],
  [11, 36, 16, 5, 37, 17],
  [11, 36, 12, 5, 37, 13],

  // 15
  [5, 109, 87, 1, 110, 88],
  [5, 65, 41, 5, 66, 42],
  [5, 54, 24, 7, 55, 25],
  [11, 36, 12],

  // 16
  [5, 122, 98, 1, 123, 99],
  [7, 73, 45, 3, 74, 46],
  [15, 43, 19, 2, 44, 20],
  [3, 45, 15, 13, 46, 16],

  // 17
  [1, 135, 107, 5, 136, 108],
  [10, 74, 46, 1, 75, 47],
  [1, 50, 22, 15, 51, 23],
  [2, 42, 14, 17, 43, 15],

  // 18
  [5, 150, 120, 1, 151, 121],
  [9, 69, 43, 4, 70, 44],
  [17, 50, 22, 1, 51, 23],
  [2, 42, 14, 19, 43, 15],

  // 19
  [3, 141, 113, 4, 142, 114],
  [3, 70, 44, 11, 71, 45],
  [17, 47, 21, 4, 48, 22],
  [9, 39, 13, 16, 40, 14],

  // 20
  [3, 135, 107, 5, 136, 108],
  [3, 67, 41, 13, 68, 42],
  [15, 54, 24, 5, 55, 25],
  [15, 43, 15, 10, 44, 16],

  // 21
  [4, 144, 116, 4, 145, 117],
  [17, 68, 42],
  [17, 50, 22, 6, 51, 23],
  [19, 46, 16, 6, 47, 17],

  // 22
  [2, 139, 111, 7, 140, 112],
  [17, 74, 46],
  [7, 54, 24, 16, 55, 25],
  [34, 37, 13],

  // 23
  [4, 151, 121, 5, 152, 122],
  [4, 75, 47, 14, 76, 48],
  [11, 54, 24, 14, 55, 25],
  [16, 45, 15, 14, 46, 16],

  // 24
  [6, 147, 117, 4, 148, 118],
  [6, 73, 45, 14, 74, 46],
  [11, 54, 24, 16, 55, 25],
  [30, 46, 16, 2, 47, 17],

  // 25
  [8, 132, 106, 4, 133, 107],
  [8, 75, 47, 13, 76, 48],
  [7, 54, 24, 22, 55, 25],
  [22, 45, 15, 13, 46, 16],

  // 26
  [10, 142, 114, 2, 143, 115],
  [19, 74, 46, 4, 75, 47],
  [28, 50, 22, 6, 51, 23],
  [33, 46, 16, 4, 47, 17],

  // 27
  [8, 152, 122, 4, 153, 123],
  [22, 73, 45, 3, 74, 46],
  [8, 53, 23, 26, 54, 24],
  [12, 45, 15, 28, 46, 16],

  // 28
  [3, 147, 117, 10, 148, 118],
  [3, 73, 45, 23, 74, 46],
  [4, 54, 24, 31, 55, 25],
  [11, 45, 15, 31, 46, 16],

  // 29
  [7, 146, 116, 7, 147, 117],
  [21, 73, 45, 7, 74, 46],
  [1, 53, 23, 37, 54, 24],
  [19, 45, 15, 26, 46, 16],

  // 30
  [5, 145, 115, 10, 146, 116],
  [19, 75, 47, 10, 76, 48],
  [15, 54, 24, 25, 55, 25],
  [23, 45, 15, 25, 46, 16],

  // 31
  [13, 145, 115, 3, 146, 116],
  [2, 74, 46, 29, 75, 47],
  [42, 54, 24, 1, 55, 25],
  [23, 45, 15, 28, 46, 16],

  // 32
  [17, 145, 115],
  [10, 74, 46, 23, 75, 47],
  [10, 54, 24, 35, 55, 25],
  [19, 45, 15, 35, 46, 16],

  // 33
  [17, 145, 115, 1, 146, 116],
  [14, 74, 46, 21, 75, 47],
  [29, 54, 24, 19, 55, 25],
  [11, 45, 15, 46, 46, 16],

  // 34
  [13, 145, 115, 6, 146, 116],
  [14, 74, 46, 23, 75, 47],
  [44, 54, 24, 7, 55, 25],
  [59, 46, 16, 1, 47, 17],

  // 35
  [12, 151, 121, 7, 152, 122],
  [12, 75, 47, 26, 76, 48],
  [39, 54, 24, 14, 55, 25],
  [22, 45, 15, 41, 46, 16],

  // 36
  [6, 151, 121, 14, 152, 122],
  [6, 75, 47, 34, 76, 48],
  [46, 54, 24, 10, 55, 25],
  [2, 45, 15, 64, 46, 16],

  // 37
  [17, 152, 122, 4, 153, 123],
  [29, 74, 46, 14, 75, 47],
  [49, 54, 24, 10, 55, 25],
  [24, 45, 15, 46, 46, 16],

  // 38
  [4, 152, 122, 18, 153, 123],
  [13, 74, 46, 32, 75, 47],
  [48, 54, 24, 14, 55, 25],
  [42, 45, 15, 32, 46, 16],

  // 39
  [20, 147, 117, 4, 148, 118],
  [40, 75, 47, 7, 76, 48],
  [43, 54, 24, 22, 55, 25],
  [10, 45, 15, 67, 46, 16],

  // 40
  [19, 148, 118, 6, 149, 119],
  [18, 75, 47, 31, 76, 48],
  [34, 54, 24, 34, 55, 25],
  [20, 45, 15, 61, 46, 16]];


  QRRSBlock.getRSBlocks = function (typeNumber, errorCorrectLevel) {

    var rsBlock = QRRSBlock.getRsBlockTable(typeNumber, errorCorrectLevel);

    if (rsBlock == undefined) {
      throw new Error("bad rs block @ typeNumber:" + typeNumber + "/errorCorrectLevel:" + errorCorrectLevel);
    }

    var length = rsBlock.length / 3;

    var list = new Array();

    for (var i = 0; i < length; i++) {

      var count = rsBlock[i * 3 + 0];
      var totalCount = rsBlock[i * 3 + 1];
      var dataCount = rsBlock[i * 3 + 2];

      for (var j = 0; j < count; j++) {
        list.push(new QRRSBlock(totalCount, dataCount));
      }
    }

    return list;
  };

  QRRSBlock.getRsBlockTable = function (typeNumber, errorCorrectLevel) {

    switch (errorCorrectLevel) {
      case QRErrorCorrectLevel.L:
        return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 0];
      case QRErrorCorrectLevel.M:
        return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 1];
      case QRErrorCorrectLevel.Q:
        return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 2];
      case QRErrorCorrectLevel.H:
        return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 3];
      default:
        return undefined;}

  };

  //---------------------------------------------------------------------
  // QRBitBuffer
  //---------------------------------------------------------------------

  function QRBitBuffer() {
    this.buffer = new Array();
    this.length = 0;
  }

  QRBitBuffer.prototype = {

    get: function get(index) {
      var bufIndex = Math.floor(index / 8);
      return (this.buffer[bufIndex] >>> 7 - index % 8 & 1) == 1;
    },

    put: function put(num, length) {
      for (var i = 0; i < length; i++) {
        this.putBit((num >>> length - i - 1 & 1) == 1);
      }
    },

    getLengthInBits: function getLengthInBits() {
      return this.length;
    },

    putBit: function putBit(bit) {

      var bufIndex = Math.floor(this.length / 8);
      if (this.buffer.length <= bufIndex) {
        this.buffer.push(0);
      }

      if (bit) {
        this.buffer[bufIndex] |= 0x80 >>> this.length % 8;
      }

      this.length++;
    } };


  //---------------------------------------------------------------------
  // Support Chinese
  //---------------------------------------------------------------------
  function utf16To8(text) {
    var result = '';
    var c;
    for (var i = 0; i < text.length; i++) {
      c = text.charCodeAt(i);
      if (c >= 0x0001 && c <= 0x007F) {
        result += text.charAt(i);
      } else if (c > 0x07FF) {
        result += String.fromCharCode(0xE0 | c >> 12 & 0x0F);
        result += String.fromCharCode(0x80 | c >> 6 & 0x3F);
        result += String.fromCharCode(0x80 | c >> 0 & 0x3F);
      } else {
        result += String.fromCharCode(0xC0 | c >> 6 & 0x1F);
        result += String.fromCharCode(0x80 | c >> 0 & 0x3F);
      }
    }
    return result;
  }

  uQRCode = {

    defaults: {
      size: 258,
      margin: 0,
      backgroundColor: '#ffffff',
      foregroundColor: '#000000',
      fileType: 'png', // 'jpg', 'png'
      correctLevel: 3,
      typeNumber: -1 },


    make: function make(options) {
      var defaultOptions = {
        canvasId: options.canvasId,
        componentInstance: options.componentInstance,
        text: options.text,
        size: this.defaults.size,
        margin: this.defaults.margin,
        backgroundColor: this.defaults.backgroundColor,
        foregroundColor: this.defaults.foregroundColor,
        fileType: this.defaults.fileType,
        correctLevel: this.defaults.correctLevel,
        typeNumber: this.defaults.typeNumber };

      if (options) {
        for (var i in options) {
          defaultOptions[i] = options[i];
        }
      }
      options = defaultOptions;
      if (!options.canvasId) {
        console.error('uQRCode: Please set canvasId!');
        return;
      }

      function createCanvas() {
        var qrcode = new QRCode(options.typeNumber, options.correctLevel);
        qrcode.addData(utf16To8(options.text));
        qrcode.make();

        var ctx = uni.createCanvasContext(options.canvasId, options.componentInstance);
        ctx.setFillStyle(options.backgroundColor);
        ctx.fillRect(0, 0, options.size, options.size);

        var tileW = (options.size - options.margin * 2) / qrcode.getModuleCount();
        var tileH = tileW;

        for (var row = 0; row < qrcode.getModuleCount(); row++) {
          for (var col = 0; col < qrcode.getModuleCount(); col++) {
            var style = qrcode.isDark(row, col) ? options.foregroundColor : options.backgroundColor;
            ctx.setFillStyle(style);
            var x = Math.round(col * tileW) + options.margin;
            var y = Math.round(row * tileH) + options.margin;
            var w = Math.ceil((col + 1) * tileW) - Math.floor(col * tileW);
            var h = Math.ceil((row + 1) * tileW) - Math.floor(row * tileW);
            ctx.fillRect(x, y, w, h);
          }
        }

        setTimeout(function () {
          ctx.draw(false, function () {
            setTimeout(function () {
              uni.canvasToTempFilePath({
                canvasId: options.canvasId,
                fileType: options.fileType,
                width: options.size,
                height: options.size,
                destWidth: options.size,
                destHeight: options.size,
                success: function success(res) {
                  options.success && options.success(res.tempFilePath);
                },
                fail: function fail(error) {
                  options.fail && options.fail(error);
                },
                complete: function complete(res) {
                  options.complete && options.complete(res);
                } },
              options.componentInstance);
            }, options.text.length + 100);
          });
        }, 150);
      }

      createCanvas();
    } };



})();var _default =

uQRCode;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 225:
/*!*******************************************!*\
  !*** D:/UAD/Jdt-zhcx/common/BCFW/bcfw.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;

//接口域名
var Url = 'http://111.231.109.113:8004';

//接口对象
var Interface = {
  spt_GetcouponByuserId: {
    value: Url + '/api/bc/GetcouponByuserId',
    name: '包车订单-优惠券列表',
    method: 'POST',
    pages: ["LYFW/scenicSpotTickets/orderAdd.vue"] },


  spt_scenicSpotSetOrder: {
    value: Url + '/api/app/scenicSpotSetOrder',
    name: '包车订单-H5提交订单',
    method: 'POST',
    pages: ["BCFW//bf_information.vue"] },


  spt_AddtouristOrder: {
    value: Url + '/api/Chartered/AddCharteredOrder_Passenger',
    name: '包车订单-APP提交订单',
    method: 'POST',
    pages: ["BCFW/bf_information.vue"] },


  spt_RequestTicketsList: {
    value: Url + '/api/Chartered/QueryCharteredOrderByUserID_Passenger',
    name: '订单列表',
    method: 'POST',
    pages: ["order/OrderList.vue"] },


  spt_RequestTickets: {
    value: Url + '/api/Chartered/QuerySpecialLineOrder_Passenger',
    name: '订单-去支付',
    method: 'POST',
    pages: ["BCFW/charteredBusPayment.vue"] },


  spt_CancelTickets: {
    value: Url + '/api/Chartered/CancelCharteredOrder_Passenger',
    name: '订单-取消',
    method: 'POST',
    pages: ["BCFW/charteredBusPayment.vue", "order/OrderList.vue"] },


  spt_DeleteTickets: {
    value: Url + '/api/Chartered/DeleteCharteredOrder_Passenger',
    name: '订单-删除',
    method: 'POST',
    pages: ["order/OrderList.vue"] },


  spt_Pay: {
    value: Url + '/api/bc/Pay',
    name: '订单-请求支付参数',
    method: 'POST',
    pages: ["BCFW/charteredBusPayment.vue"] },


  fw_selectSpecialLine: {
    value: Url + '/api/Chartered/GetCharteredAllLine_Passenger',
    name: '包车-选择专线',
    method: 'POST',
    pages: ["BCFW/bf_choice.vue"] },


  fw_privateLineSearch: {
    value: Url + '/api/Chartered/GetCharteredLineByLineName_Passenger',
    name: '包车-选择专线搜索',
    method: 'POST',
    pages: ["BCFW/bf_choice.vue"] },


  fw_selectVehicle: {
    value: Url + '/api/Chartered/GetVehicleType_Passenger',
    name: '包车-选择车辆',
    method: 'POST',
    pages: ["BCFW/bf_choiceVehicleType.vue"] } };




var InterfaceAddress = [
//根据起终点经纬度获取线路规划
//使用页面 - /CZC/CallAndDrive - 
'http://111.231.109.113:8002/api/zhcx/getPlanningLineByLonLat',
//获取所有车辆定位数据
'http://111.231.109.113:8002/api/zhcx/getAllVehiclePosition',
//根据经纬度获取附近一定范围的经纬度
'http://111.231.109.113:8002/api/zhcx/getLonLatRangeVehiclePosition'];


// 接口声明区
var _default = {
  Interface: Interface,
  InterfaceAddress: InterfaceAddress };exports.default = _default;

/***/ }),

/***/ 23:
/*!**********************************************!*\
  !*** D:/UAD/Jdt-zhcx/common/LYFW/LyfwFmq.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; //弹框须知文本
var notice = {
  status: 1, //1成功/0失败提示返回值
  data: {
    explain: '预订时间：最晚需在出行当天18:00前购票 \n 有效时间：指定购买日期起，1日有效',
    way: '1、本产品每个账号每天限购一张，购买APP订单中的二维码检票入园即可 \n 2、费用包含：成人票一张、竹筏票一张 \n 3、本产品不支持代购或转售，仅限购票人本人使用。因代购或转售无法入园申请退改，不退不改。',
    date: '周一至周日 09:00~18:00',
    policy: '1、70岁以上老年人凭老年证免费 \n 2、身高80厘米以下免票 \n 3、身高80-120厘米儿童票价半折 \n 4、身高120以上儿童全票',
    rule: '该产品未使用且在有效期内支持随时退，过期不退不改，敬请谅解！如需取消，请登录APP账号申请取消，经核实 未使用且在有效期内，可免费取消。如需 改期，请申请取消后重新预订。',
    security: '1.本票仅为乘坐使用，不作为报销凭证 \n 2.本票仅供一人使用、当趟有效，逾期作废 \n 3.请勿携带贵重物品乘坐竹筏 \n 4.在行筏过程中严禁站立或行走拍照 \n 5.在雷雨、大风、能见度差等条件下停筏 \n 6.竹筏在行驶中或未停稳时，严禁强行登、下筏 \n 7.严禁下河游泳，戏水 \n 8.严禁携带戏水工具（水枪、水瓢等）乘坐竹筏 \n 9.严禁未穿救生衣承筏，乘筏过程中严禁解脱救生衣 \n 10.严禁携带易燃、易爆、腐蚀、毒害、放射性等危险品和管制刀具及国家禁止运输的其它危险化学品乘坐竹筏 \n 11.严禁超载（原则上正常水位每张拼排乘坐体重75公斤以下游客10人），如遇超标准体重者，由现场管理人员统一调整 \n 12.咨询电话：0599-8030999 投诉电话：0599-8030995' },

  msg: '提示' };



//接口域名
var Url = 'http://zntc.145u.net';

//引入模板
// url:$lyfw.Interface.spt_tl_six.value,
// method:$lyfw.Interface.spt_tl_six.method,
// import $lyfw from '../../../common/LYFW/LyfwFmq.js' //引用路径

//接口对象
var Interface = {
  //GET-POST
  spt_GetticketSearchByrequestArea_Six: {
    value: Url + '/api/ly/GetticketSearchByrequestArea_Six',
    name: '景区列表-六宫格',
    method: 'POST',
    pages: ["LYFW/scenicSpotTickets/ticketsList.vue"] },


  spt_GetticketSearchByrequestArea: {
    value: Url + '/api/ly/GetticketSearchByrequestArea',
    name: '景区列表-景区列表',
    method: 'POST',
    pages: ["LYFW/scenicSpotTickets/ticketsList.vue"] },


  spt_GetticketSearchBysearchValue: {
    value: Url + '/api/ly/GetticketSearchBysearchValue',
    name: '景区列表-搜索',
    method: 'POST',
    pages: ["LYFW/scenicSpotTickets/ticketsList.vue"] },


  spt_GetticketDetailByticketId: {
    value: Url + '/api/ly/GetticketDetailByticketId',
    name: '景区门票-详情',
    method: 'POST',
    pages: ["LYFW/scenicSpotTickets/ticketsDetails.vue"] },


  spt_GetticketSecurityByticketIde: {
    value: Url + '/api/ly/GetticketSecurityByticketId',
    name: '景区门票-门票须知',
    method: 'POST',
    pages: ["LYFW/scenicSpotTickets/orderAdd.vue"] },


  spt_GetcouponByuserId: {
    value: Url + '/api/ly/GetcouponByuserId',
    name: '景区门票-优惠券列表',
    method: 'POST',
    pages: ["LYFW/scenicSpotTickets/orderAdd.vue"] },


  spt_AddtouristOrder: {
    value: Url + '/api/ly/AddtouristOrder',
    name: '景区门票-提交订单',
    method: 'POST',
    pages: ["LYFW/scenicSpotTickets/orderAdd.vue"] },


  spt_RequestTicketsList: {
    value: Url + '/api/ly/RequestTicketsList',
    name: '订单列表',
    method: 'POST',
    pages: ["order/OrderList.vue"] },


  spt_RequestTicketsListDetail: {
    value: Url + '/api/ly/RequestTicketsListDetail',
    name: '订单详情',
    method: 'POST',
    pages: ["LYFW/scenicSpotTickets/orderDetails.vue", "LYFW/scenicSpotTickets/selectivePayment.vue", "order/OrderList.vue"] },


  spt_getIsPaySuccess: {
    value: Url + '/api/ly/getIsPaySuccess',
    name: '订单-去支付-查询是否出票',
    method: 'POST',
    pages: ["LYFW/scenicSpotTickets/selectivePayment.vue"] },


  spt_RequestTickets: {
    value: Url + '/api/ly/RequestTickets',
    name: '订单-去支付-出票',
    method: 'POST',
    pages: ["LYFW/scenicSpotTickets/selectivePayment.vue"] },


  spt_CancelTickets: {
    value: Url + '/api/ly/CancelTickets',
    name: '订单-取消',
    method: 'POST',
    pages: ["LYFW/scenicSpotTickets/selectivePayment.vue", "order/OrderList.vue"] },


  spt_BounceTickets: {
    value: Url + '/api/ly/BounceTickets',
    name: '订单-退票',
    method: 'POST',
    pages: ["LYFW/scenicSpotTickets/selectivePayment.vue", "order/OrderList.vue"] },


  spt_DeleteTickets: {
    value: Url + '/api/ly/DeleteTickets',
    name: '订单-删除',
    method: 'POST',
    pages: ["order/OrderList.vue"] },


  spt_Pay: {
    value: Url + '/api/ly/Pay',
    name: '订单-请求支付参数',
    method: 'POST',
    pages: ["LYFW/scenicSpotTickets/selectivePayment.vue"] } };





// 接口声明区
var _default = {
  notice: notice,
  Interface: Interface };exports.default = _default;

/***/ }),

/***/ 24:
/*!**********************************************!*\
  !*** D:/UAD/Jdt-zhcx/common/LYFW/LyfwCwd.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /* 接口参数区 */
// 示例
var userInfo = {
  status: 1, //成功/失败提示返回值
  data: {
    unid: 183252546, //唯一ID标示
    mobile: 18888888888, //手机号码
    nickname: '茜茜爱玩', //姓名
    gender: 1, //性别
    birthday: '1994-01-19', //生日
    permanent: '福建省南平市武夷山市', //地址
    autograph: '喜欢可以点关注哦~', //签名
    portrait: '../../../static/LYFW/peripheralTourism/user/touxiang2.jpg', //头像
    bg: '/static/index/banner2.jpg', //背景图
    date: '2019-12-21' //回复日期
  },
  msg: '提示' };


/* 六宫格-景区列表 */
var sixPalaceList = [{
  scenicId: 0,
  name: '武夷山',
  englishName: 'Wuyi Mount',
  image: '../../../static/LYFW/Tickets/ticketsList/wuyishan.jpg' },

{
  scenicId: 1,
  name: '溪源峡谷',
  englishName: 'Creek Gorge',
  image: '../../../static/LYFW/scenicSpotTickets/ticketsList/xiyuanxiagu.jpg' },

{
  scenicId: 2,
  name: '芒荡山',
  englishName: 'Mount Mandang',
  image: '../../../static/LYFW/scenicSpotTickets/ticketsList/mangdangshan.jpg' },

{
  scenicId: 3,
  name: '和平古镇',
  englishName: 'Peace Towns',
  image: '../../../static/LYFW/scenicSpotTickets/ticketsList/hepingguzhen.jpg' },

{
  scenicId: 4,
  name: '天成奇侠',
  englishName: 'Natural Gorge',
  image: '../../../static/LYFW/scenicSpotTickets/ticketsList/tianchengqixia.jpg' },

{
  scenicId: 5,
  name: '青龙大瀑布',
  englishName: 'Qinglong Waterfa',
  image: '../../../static/LYFW/scenicSpotTickets/ticketsList/qinglongdapubu.jpg' },

{
  scenicId: 6,
  name: '茶博园',
  englishName: 'Tea Expo',
  image: '../../../static/LYFW/scenicSpotTickets/ticketsList/chaboyuan.jpg' }];



/* 景区列表 */
var scenicList = [{
  scenicId: 0,
  scenicName: '南平武夷山',
  comment: '一码通 | 可订明日票 | 非即时退',
  image: '../../../static/LYFW/scenicSpotTickets/ticketsList/wuyishan.jpg',
  price: 320,
  sales: 20188 },

{
  scenicId: 1,
  scenicName: '南平溪源峡谷',
  comment: '一码通 | 可订明日票 | 非即时退',
  image: '../../../static/LYFW/scenicSpotTickets/ticketsList/xiyuanxiagu.jpg',
  price: 60,
  sales: 18687 },

{
  scenicId: 2,
  scenicName: '南平芒荡山',
  comment: '一码通 | 可订明日票 | 非即时退',
  image: '../../../static/LYFW/scenicSpotTickets/ticketsList/mangdangshan.jpg',
  price: 10,
  sales: 19245 },

{
  scenicId: 3,
  scenicName: '邵武和平古镇',
  comment: '一码通 | 可订明日票 | 非即时退',
  image: '../../../static/LYFW/scenicSpotTickets/ticketsList/hepingguzhen.jpg',
  price: 0,
  sales: 12815 },

{
  scenicId: 4,
  scenicName: '邵武天成奇峡',
  comment: '一码通 | 可订明日票 | 非即时退',
  image: '../../../static/LYFW/scenicSpotTickets/ticketsList/tianchengqixia.jpg',
  price: 130,
  sales: 21048 },

{
  scenicId: 5,
  scenicName: '武夷山青龙大瀑布',
  comment: '一码通 | 可订明日票 | 非即时退',
  image: '../../../static/LYFW/scenicSpotTickets/ticketsList/qinglongdapubu.jpg',
  price: 60,
  sales: 23074 },


{
  scenicId: 6,
  scenicName: '中华武夷茶博园',
  comment: '一码通 | 可订明日票 | 非即时退',
  image: '../../../static/LYFW/scenicSpotTickets/ticketsList/chaboyuan.jpg',
  price: 218,
  sales: 23078 },


{
  scenicId: 7,
  scenicName: '建阳卧龙湾花花世界',
  comment: '一码通 | 可订明日票 | 非即时退',
  image: '../../../static/LYFW/scenicSpotTickets/ticketsList/huahuashijie.jpg',
  price: 10,
  sales: 110871 }];



//景区详情 - 武夷山
var scSpotDetails = {
  scenicId: 0,
  image: [{
    src: '../../../static/LYFW/scenicSpotTickets/ticketsDetails/banner1.jpg' },
  {
    src: '../../../static/LYFW/scenicSpotTickets/ticketsDetails/banner2.jpg' },
  {
    src: '../../../static/LYFW/scenicSpotTickets/ticketsDetails/banner3.jpg' }],

  imageNumber: 3,
  scenicName: '南平武夷山',
  openup: '09:00 - 18:00',
  scenicContent: '武夷山，武夷山位于江西与福建西北部两省交界处，武夷山脉北段东南麓总面积999.75平方公里，是中国著名的风景旅游区和避暑胜地。属典型的丹霞地貌，是首批国家级重点风景名胜区之一。武夷山是三教名山。自秦汉以来，武夷山就为羽流禅家栖息之地，留下了不少宫观、道院和庵堂故址。武夷山还曾是儒家学者倡道讲学之地。武夷山自然保护区，是地球同纬度地区保护最好、物种最丰富的生态系统，拥有2527种植物物种，近5000种野生动物。在中生代晚期，武夷山发生了强烈的火山喷发活动，继之为大规模的花岗岩侵入，已发现本区有丰富的火山机构，为典型的亚洲东部环太平洋带的构造特征。白垩纪晚期的红色砂砾岩是形成丹霞地貌的主体。中生代的地壳运动奠定了武夷山地貌的基本骨架。告性对武夷山地貌发育也很明显，西部海拔1500m以上的山峰，基本上由坚硬的凝灰熔岩和流纹岩等构成，东部红色砂页岩地区则往往发育有较宽的谷地和盆地。所以武夷山丰富的地貌类型是地质构造、流水侵蚀、风化剥蚀、重力崩塌等综合作用的结果。',
  comment: '一码通 | 可订明日票 | 非即时退',
  state: true, //false为免费 true为收费
  ticket: [{
    quantityStatus: true, //false为数量无限 true为数量有限
    quantity: 50, //门票数量
    title: '【成人】南平武夷山三日游路线 （观光车+成人门票+竹筏票）',
    comment: '一码通 | 可订明日票 | 非即时退',
    price: 320 },

  {
    quantityStatus: false, //false为数量无限 true为数量有限
    quantity: 50, //门票数量
    title: '【儿童】南平,三日游路线 （观光车+儿童门票+竹筏票）',
    comment: '一码通 | 可订明日票 | 非即时退',
    price: 160 }] };



//蔡伟达-旅游路线-景区推文
var lunBo = {
  status: 1, //1成功,0失败提示返回值
  data: {
    image: [{
      title: '武夷山|全方位详尽三日',
      src: '../../../static/LYFW/ouristRoute/SceneryTable/lunBo/banner1.jpg' },
    {
      title: '巴厘岛一日游',
      src: '../../../static/LYFW/ouristRoute/SceneryTable/lunBo/banner2.jpg' },
    {
      title: '浪漫巴厘岛',
      src: '../../../static/LYFW/ouristRoute/SceneryTable/lunBo/banner3.jpg' }] },


  msg: '提示' };


//蔡伟达-旅游路线-景点内容/热门路线
var touristRoute = {
  status: 1, //1成功,0失败提示返回值
  data: [{
    routeId: 1,
    routeClicks: '2.1',
    headImage: '../../../static/LYFW/ouristRoute/SceneryTable/TouristRoute/touxiang.png',
    nickName: '李茜茜',
    autograph: '步步寻往迹,有处特依依~',
    address: '南平市',
    scennicName: '武夷山风景名胜区三日游',
    scName: '武夷山',
    scEnglish: 'THREE DAY TOUR OF WUYISHAN SCENIC SPOOT',
    jungle: '自然风光',
    cost: 1200,
    days: 3,
    related: 108,
    attribute: '旅游度假区',
    image: '../../../static/LYFW/ouristRoute/SceneryTable/TouristRoute/wuyishan.jpg',
    date: '2019-11-05',
    like: 1088,
    comment: 92 },
  {
    routeId: 2,
    routeClicks: '2.1',
    headImage: '../../../static/LYFW/ouristRoute/SceneryTable/TouristRoute/touxiang.png',
    nickName: '李茜茜',
    autograph: '步步寻往迹,有处特依依~',
    address: '南平市',
    scennicName: '溪源峡谷风景名胜区',
    scName: '溪源峡谷',
    scEnglish: 'XIYAN CANYON SCENIC SPOT',
    jungle: '自然风光',
    cost: 600,
    days: 2,
    related: 89,
    attribute: '旅游度假区',
    image: '../../../static/LYFW/ouristRoute/SceneryTable/TouristRoute/xiyuanxiagu.jpg',
    date: '2019-11-06',
    like: 682,
    comment: 78 },
  {
    routeId: 3,
    routeClicks: '2.1',
    headImage: '../../../static/LYFW/ouristRoute/SceneryTable/TouristRoute/touxiang.png',
    nickName: '李茜茜',
    autograph: '步步寻往迹,有处特依依~',
    address: '南平市',
    scennicName: '芒荡山风景名胜区',
    scName: '芒荡山',
    scEnglish: 'MANGDANG MOUNTAIN SCENIC SPOT',
    jungle: '自然风光',
    cost: 200,
    days: 1,
    related: 68,
    attribute: '旅游度假区',
    image: '../../../static/LYFW/ouristRoute/SceneryTable/TouristRoute/mangdangshan.jpg',
    date: '2019-11-07',
    like: 308,
    comment: 66 },
  {
    routeId: 4,
    routeClicks: '2.1',
    headImage: '../../../static/LYFW/ouristRoute/SceneryTable/TouristRoute/touxiang.png',
    nickName: '李茜茜',
    autograph: '步步寻往迹,有处特依依~',
    address: '南平市',
    scennicName: '和平古镇一日游',
    scName: '和平古镇',
    scEnglish: 'ONE DAY TOUR OF HEPING ANCIENT TOWN',
    jungle: '自然风光',
    cost: 180,
    days: 1,
    related: 64,
    attribute: '旅游度假区',
    image: '../../../static/LYFW/ouristRoute/SceneryTable/TouristRoute/hepingguzhen.jpg',
    date: '2019-11-08',
    like: 873,
    comment: 91 },
  {
    routeId: 5,
    routeClicks: '2.1',
    headImage: '../../../static/LYFW/ouristRoute/SceneryTable/TouristRoute/touxiang.png',
    nickName: '李茜茜',
    autograph: '步步寻往迹,有处特依依~',
    address: '南平市',
    scennicName: '天成奇侠一日游',
    scName: '天成奇侠',
    scEnglish: 'ONE DAY TOUR OF TIANCHENG WONDER',
    jungle: '自然风光',
    cost: 150,
    days: 1,
    related: 82,
    attribute: '旅游度假区',
    image: '../../../static/LYFW/ouristRoute/SceneryTable/TouristRoute/tianchengqixia.jpg',
    date: '2019-11-09',
    like: 546,
    comment: 83 },
  {
    routeId: 6,
    routeClicks: '2.1',
    headImage: '../../../static/LYFW/ouristRoute/SceneryTable/TouristRoute/touxiang.png',
    nickName: '李茜茜',
    autograph: '步步寻往迹,有处特依依~',
    address: '南平市',
    scennicName: '青龙大瀑布一日游',
    scName: '青龙大瀑布',
    scEnglish: 'ONE DAY TOUR OF QINGLONG WATERFALL',
    jungle: '自然风光',
    cost: 120,
    days: 1,
    related: 63,
    attribute: '旅游度假区',
    image: '../../../static/LYFW/ouristRoute/SceneryTable/TouristRoute/qinglongdapubu.jpg',
    date: '2019-11-10',
    like: 1251,
    comment: 35 },
  {
    routeId: 7,
    routeClicks: '2.1',
    headImage: '../../../static/LYFW/ouristRoute/SceneryTable/TouristRoute/touxiang.png',
    nickName: '李茜茜',
    autograph: '步步寻往迹,有处特依依~',
    address: '南平市',
    scennicName: '中华武夷山茶博园一日游',
    scName: '茶博园',
    scEnglish: 'ONE DAY TOUR OF WUYISHAN TEA GARDEN IN CHINA',
    jungle: '自然风光',
    cost: 125,
    days: 1,
    related: 57,
    attribute: '旅游度假区',
    image: '../../../static/LYFW/ouristRoute/SceneryTable/TouristRoute/chaboyuan.jpg',
    date: '2019-11-11',
    like: 1098,
    comment: 51 },
  {
    routeId: 8,
    routeClicks: '2.1',
    headImage: '../../../static/LYFW/ouristRoute/SceneryTable/TouristRoute/touxiang.png',
    nickName: '李茜茜',
    autograph: '步步寻往迹,有处特依依~',
    address: '南平市',
    scennicName: '建阳卧龙湾花花世界一日游',
    scName: '花花世界',
    scEnglish: 'ONE DAY TOUR OF FLOWER WORLD IN WOLONG BAY JIANYANG',
    jungle: '动植物园',
    cost: 200,
    days: 1,
    related: 35,
    attribute: '旅游度假区',
    image: '../../../static/LYFW/ouristRoute/SceneryTable/TouristRoute/huahuashijie.jpg',
    date: '2019-11-12',
    like: 1205,
    comment: 24 }],

  msg: '提示' };


// 蔡伟达-旅游服务-路线评论区2
var routeComment2 = {
  status: 1, //1成功/0失败提示返回值
  data: {
    image: [{
      ticketImage: '../../../static/LYFW/ouristRoute/SceneryTable/lunBo/banner1.jpg' },
    {
      ticketImage: '../../../static/LYFW/ouristRoute/SceneryTable/lunBo/banner2.jpg' },
    {
      ticketImage: '../../../static/LYFW/ouristRoute/SceneryTable/lunBo/banner3.jpg' }] },


  msg: '提示' };



// 蔡伟达-旅游服务-路线评论区
var routeComment = {
  status: 1, //1成功/0失败提示返回值
  data: {
    scenicId: 0,
    image: [{
      src: '../../../static/LYFW/ouristRoute/SceneryTable/lunBo/banner1.jpg' },
    {
      src: '../../../static/LYFW/ouristRoute/SceneryTable/lunBo/banner2.jpg' },
    {
      src: '../../../static/LYFW/ouristRoute/SceneryTable/lunBo/banner3.jpg' }],

    title: '武夷山 | 全方位详尽三日',
    time: '2019-11-05',
    clicks: '2000',
    scenicName: '南平武夷山',
    openup: '09:00 - 18:00',
    headImage: '../../../static/LYFW/ouristRoute/SceneryTable/TouristRoute/touxiang.png',
    nickName: '李茜茜',
    autograph: '步步寻往迹,有处特依依~',
    address: '南平市',
    scenicContent: '武夷山，武夷山位于江西与福建西北部两省交界处，武夷山脉北段东南麓总面积999.75平方公里，是中国著名的风景旅游区和避暑胜地。属典型的丹霞地貌，是首批国家级重点风景名胜区之一。武夷山是三教名山。自秦汉以来，武夷山就为羽流禅家栖息之地，留下了不少宫观、道院和庵堂故址。武夷山还曾是儒家学者倡道讲学之地。武夷山自然保护区，是地球同纬度地区保护最好、物种最丰富的生态系统，拥有2527种植物物种，近5000种野生动物。在中生代晚期，武夷山发生了强烈的火山喷发活动，继之为大规模的花岗岩侵入，已发现本区有丰富的火山机构，为典型的亚洲东部环太平洋带的构造特征。白垩纪晚期的红色砂砾岩是形成丹霞地貌的主体。中生代的地壳运动奠定了武夷山地貌的基本骨架。告性对武夷山地貌发育也很明显，西部海拔1500m以上的山峰，基本上由坚硬的凝灰熔岩和流纹岩等构成，东部红色砂页岩地区则往往发育有较宽的谷地和盆地。所以武夷山丰富的地貌类型是地质构造、流水侵蚀、风化剥蚀、重力崩塌等综合作用的结果。',
    comment: '一码通 | 可订明日票 | 儿童半票',
    state: true, //false为免费 true为收费
    collection: 389,
    collectionState: false,
    like: 207,
    likeState: false,
    commentState: false },

  msg: '提示' };


// 蔡伟达-旅游服务-用户路线
var userRoute = {
  status: 1, //1成功/0失败提示返回值
  data: [{
    scenicId: 0,
    day: 1,
    address: '南平',
    scenicName: '武夷山风景名胜区',
    playtime: '游玩建议6小时',
    start: '国内原生森林',
    scenicContent: ' 武夷山西部是全球生物多样性保护的关键地区，是中...',
    icon: '../../../static/LYFW/ouristRoute/SceneryTable/TouristRoute/icon1.png',
    image: '../../../static/LYFW/ouristRoute/SceneryTable/TouristRoute/routewuyishan1.png' },

  {
    scenicId: 1,
    day: 1,
    address: '南平',
    scenicName: '武夷山市 - 建阳区',
    playtime: '1小时',
    start: '武夷山汽车站',
    scenicContent: ' 武夷山西部是全球生物多样性保护的关键地区，是中...',
    icon: '../../../static/LYFW/ouristRoute/SceneryTable/TouristRoute/icon2.png',
    image: '../../../static/LYFW/ouristRoute/SceneryTable/TouristRoute/routewuyishan2.png' },

  {
    scenicId: 2,
    day: 2,
    address: '南平',
    scenicName: '武夷山风景名胜区',
    playtime: '游玩建议6小时',
    start: '国内原生森林',
    scenicContent: ' 武夷山西部是全球生物多样性保护的关键地区，是中...',
    icon: '../../../static/LYFW/ouristRoute/SceneryTable/TouristRoute/icon1.png',
    image: '../../../static/LYFW/ouristRoute/SceneryTable/TouristRoute/routewuyishan1.png' },

  {
    scenicId: 3,
    day: 2,
    address: '南平',
    scenicName: '武夷山市 - 建阳区',
    playtime: '1小时',
    start: '武夷山汽车站',
    scenicContent: ' 武夷山西部是全球生物多样性保护的关键地区，是中...',
    icon: '../../../static/LYFW/ouristRoute/SceneryTable/TouristRoute/icon2.png',
    image: '../../../static/LYFW/ouristRoute/SceneryTable/TouristRoute/routewuyishan2.png' },

  {
    scenicId: 4,
    day: 3,
    address: '南平',
    scenicName: '武夷山风景名胜区',
    playtime: '游玩建议6小时',
    start: '国内原生森林',
    scenicContent: ' 武夷山西部是全球生物多样性保护的关键地区，是中...',
    icon: '../../../static/LYFW/ouristRoute/SceneryTable/TouristRoute/icon1.png',
    image: '../../../static/LYFW/ouristRoute/SceneryTable/TouristRoute/routewuyishan1.png' },

  {
    scenicId: 5,
    day: 3,
    address: '南平',
    scenicName: '武夷山市 - 建阳区',
    playtime: '1小时',
    start: '武夷山汽车站',
    scenicContent: ' 武夷山西部是全球生物多样性保护的关键地区，是中...',
    icon: '../../../static/LYFW/ouristRoute/SceneryTable/TouristRoute/icon2.png',
    image: '../../../static/LYFW/ouristRoute/SceneryTable/TouristRoute/routewuyishan2.png' }],


  msg: '提示' };


/*蔡伟达-旅游路线-回复内容 */
var reply = {
  status: 1, //1成功/0失败提示返回值
  data: [{
    unid: 185677868,
    scennicName: '李大刚',
    portrait: '../../../static/LYFW/peripheralTourism/user/t1.jpg',
    content: '小姐姐的笔记写的很好啊！照片也拍的很美，给你点个赞，想来武夷山游玩的朋友们可以加我微信15359031110为您提供游玩攻略、民宿、帐篷预订及门票船票预订等旅游服务。我们整合了山上所有的旅游资源，花2分钟咨询，换一次完美旅行。赶紧动动手指联系我们把！',
    date: '2019-12-16',
    fabulous: 18,
    fabulousState: false },
  {
    unid: 185271851,
    scennicName: 'NDNPSOSWANGT',
    portrait: '../../../static/LYFW/peripheralTourism/user/t2.jpg',
    content: '不错,很赞的小姐姐,感谢分享',
    date: '2019-12-16',
    fabulous: 15,
    fabulousState: true },
  {
    unid: 153218884,
    scennicName: '小郑哥',
    portrait: '../../../static/LYFW/peripheralTourism/user/t3.jpg',
    content: '专门说武夷山的笔记在哪里？',
    date: '2019-12-16',
    fabulous: 12,
    fabulousState: false },
  {
    unid: 415546455,
    scennicName: 'Mickin',
    portrait: '../../../static/LYFW/peripheralTourism/user/t1.jpg',
    content: '小姐姐的笔记写的很好啊',
    date: '2019-12-16',
    fabulous: 8,
    fabulousState: true },
  {
    unid: 653235635,
    scennicName: '王老五',
    portrait: '../../../static/LYFW/peripheralTourism/user/t2.jpg',
    content: '不错,很赞的小姐姐,感谢分享',
    date: '2019-12-16',
    fabulous: 5,
    fabulousState: false },
  {
    unid: 215851875,
    scennicName: '富士康代工007',
    portrait: '../../../static/LYFW/peripheralTourism/user/t3.jpg',
    content: '小姐姐真好看？Emm?',
    date: '2019-12-16',
    fabulous: 0,
    fabulousState: false }],

  msg: '提示' };


//蔡伟达-旅游路线-景点内容/热门路线
var touristRoute2 = {
  status: 1, //1成功,0失败提示返回值
  data: [{
    routeId: 1,
    routeClicks: '2.1',
    headImage: '../../../static/LYFW/ouristRoute/SceneryTable/TouristRoute/touxiang.png',
    nickName: '李茜茜',
    autograph: '步步寻往迹,有处特依依~',
    address: '南平市',
    scennicName: '武夷山风景名胜区三日游',
    scName: '武夷山',
    scEnglish: 'THREE DAY TOUR OF WUYISHAN SCENIC SPOOT',
    jungle: '自然风光',
    cost: 1200,
    days: 3,
    related: 108,
    attribute: '旅游度假区',
    image: '../../../static/LYFW/ouristRoute/SceneryTable/TouristRoute/wuyishan.jpg',
    date: '2019-11-05',
    like: 1088,
    comment: 92 },
  {
    routeId: 2,
    routeClicks: '2.1',
    headImage: '../../../static/LYFW/ouristRoute/SceneryTable/TouristRoute/touxiang.png',
    nickName: '李茜茜',
    autograph: '步步寻往迹,有处特依依~',
    address: '南平市',
    scennicName: '溪源峡谷风景名胜区',
    scName: '溪源峡谷',
    scEnglish: 'XIYAN CANYON SCENIC SPOT',
    jungle: '自然风光',
    cost: 600,
    days: 2,
    related: 89,
    attribute: '旅游度假区',
    image: '../../../static/LYFW/ouristRoute/SceneryTable/TouristRoute/xiyuanxiagu.jpg',
    date: '2019-11-06',
    like: 682,
    comment: 78 }],

  msg: '提示' };


//蔡伟达-旅游路线-景点内容/热门路线
var touristRoute3 = {
  status: 1, //1成功,0失败提示返回值
  data: [{
    routeId: 1,
    routeClicks: '2.1',
    headImage: '../../../static/LYFW/ouristRoute/SceneryTable/TouristRoute/touxiang.png',
    nickName: '李茜茜',
    autograph: '步步寻往迹,有处特依依~',
    address: '南平市',
    scennicName: '芒荡山风景名胜区',
    scName: '芒荡山',
    scEnglish: 'MANGDANG MOUNTAIN SCENIC SPOT',
    jungle: '自然风光',
    cost: 200,
    days: 1,
    related: 68,
    attribute: '旅游度假区',
    image: '../../../static/LYFW/ouristRoute/SceneryTable/TouristRoute/mangdangshan.jpg',
    date: '2019-11-07',
    like: 308,
    comment: 66 },
  {
    routeId: 2,
    routeClicks: '2.1',
    headImage: '../../../static/LYFW/ouristRoute/SceneryTable/TouristRoute/touxiang.png',
    nickName: '李茜茜',
    autograph: '步步寻往迹,有处特依依~',
    address: '南平市',
    scennicName: '和平古镇一日游',
    scName: '和平古镇',
    scEnglish: 'ONE DAY TOUR OF HEPING ANCIENT TOWN',
    jungle: '自然风光',
    cost: 180,
    days: 1,
    related: 64,
    attribute: '旅游度假区',
    image: '../../../static/LYFW/ouristRoute/SceneryTable/TouristRoute/hepingguzhen.jpg',
    date: '2019-11-08',
    like: 873,
    comment: 91 },
  {
    routeId: 3,
    routeClicks: '2.1',
    headImage: '../../../static/LYFW/ouristRoute/SceneryTable/TouristRoute/touxiang.png',
    nickName: '李茜茜',
    autograph: '步步寻往迹,有处特依依~',
    address: '南平市',
    scennicName: '天成奇侠一日游',
    scName: '天成奇侠',
    scEnglish: 'ONE DAY TOUR OF TIANCHENG WONDER',
    jungle: '自然风光',
    cost: 150,
    days: 1,
    related: 82,
    attribute: '旅游度假区',
    image: '../../../static/LYFW/ouristRoute/SceneryTable/TouristRoute/tianchengqixia.jpg',
    date: '2019-11-09',
    like: 546,
    comment: 83 },
  {
    routeId: 4,
    routeClicks: '2.1',
    headImage: '../../../static/LYFW/ouristRoute/SceneryTable/TouristRoute/touxiang.png',
    nickName: '李茜茜',
    autograph: '步步寻往迹,有处特依依~',
    address: '南平市',
    scennicName: '青龙大瀑布一日游',
    scName: '青龙大瀑布',
    scEnglish: 'ONE DAY TOUR OF QINGLONG WATERFALL',
    jungle: '自然风光',
    cost: 120,
    days: 1,
    related: 63,
    attribute: '旅游度假区',
    image: '../../../static/LYFW/ouristRoute/SceneryTable/TouristRoute/qinglongdapubu.jpg',
    date: '2019-11-10',
    like: 1251,
    comment: 35 },
  {
    routeId: 5,
    routeClicks: '2.1',
    headImage: '../../../static/LYFW/ouristRoute/SceneryTable/TouristRoute/touxiang.png',
    nickName: '李茜茜',
    autograph: '步步寻往迹,有处特依依~',
    address: '南平市',
    scennicName: '中华武夷山茶博园一日游',
    scName: '茶博园',
    scEnglish: 'ONE DAY TOUR OF WUYISHAN TEA GARDEN IN CHINA',
    jungle: '自然风光',
    cost: 125,
    days: 1,
    related: 57,
    attribute: '旅游度假区',
    image: '../../../static/LYFW/ouristRoute/SceneryTable/TouristRoute/chaboyuan.jpg',
    date: '2019-11-11',
    like: 1098,
    comment: 51 },
  {
    routeId: 6,
    routeClicks: '2.1',
    headImage: '../../../static/LYFW/ouristRoute/SceneryTable/TouristRoute/touxiang.png',
    nickName: '李茜茜',
    autograph: '步步寻往迹,有处特依依~',
    address: '南平市',
    scennicName: '建阳卧龙湾花花世界一日游',
    scName: '花花世界',
    scEnglish: 'ONE DAY TOUR OF FLOWER WORLD IN WOLONG BAY JIANYANG',
    jungle: '动植物园',
    cost: 200,
    days: 1,
    related: 35,
    attribute: '旅游度假区',
    image: '../../../static/LYFW/ouristRoute/SceneryTable/TouristRoute/huahuashijie.jpg',
    date: '2019-11-12',
    like: 1205,
    comment: 24 }],

  msg: '提示' };


var complaint = {
  status: 1, //1成功,0失败提示返回值
  data: [
  '请选择内容',
  'bilibili公司',
  '日升企业',
  '腾讯企业',
  '鹅厂',
  '777电子竞技俱乐部',
  '枣子哥电子企业',
  '666大公司',
  '无敌风火轮电子商务有限公司',
  '国科电子培训有限公司',
  '养猪场',
  '4396电子有限公司'],

  msg: '提示' };


var collectionContent = {
  status: 1, //1成功,0失败提示返回值
  data: [{
    routeId: 1,
    scenicName: '武夷山 | 全方位详尽三日',
    title: '南平市武夷山风景名胜区',
    cost: 320,
    day: 3,
    date: '2019-11-12',
    like: 119,
    comment: 15,
    image: '../../static/LYFW/scenicSpotTickets/ticketsList/wuyishan.jpg' },

  {
    routeId: 2,
    scenicName: '武夷山 | 全方位详尽三日',
    title: '南平市武夷山风景名胜区',
    cost: 320,
    day: 3,
    date: '2019-11-13',
    like: 119,
    comment: 15,
    image: '../../static/LYFW/scenicSpotTickets/ticketsList/wuyishan.jpg' }],

  msg: '提示' };


var collectionCommodity = {
  status: 1, //1成功,0失败提示返回值
  data: [{
    routeId: 1,
    scenicName: '南平正宗熏鹅（武夷山店)',
    label: ['老字号', '南平特色', '物美价廉'],
    score: 4.5,
    cost: 140,
    comment: 15,
    image: '../../../static/LYFW/ouristRoute/SceneryTable/collection/shangping.png' },

  {
    routeId: 2,
    scenicName: '南平正宗熏鹅（武夷山店)',
    label: ['老字号', '南平特色', '物美价廉'],
    score: 3.5,
    cost: 140,
    comment: 15,
    image: '../../../static/LYFW/ouristRoute/SceneryTable/collection/shangping.png' }],

  msg: '提示' };


var record = {
  status: 1, //1成功,0失败提示返回值
  data: [{
    routeId: 1,
    day: 1,
    date: '2020-11-16',
    scenicName: '南平正宗熏鹅（武夷山店)',
    address: '南平 · 武夷山',
    icon: '../../static/LYFW/ouristRoute/SceneryTable/history/ICON1.png' },

  {
    routeId: 2,
    day: 2,
    date: '2020-11-17',
    scenicName: '武夷山 | 全方位详尽三日路攻略',
    address: '南平 · 武夷山',
    icon: '../../static/LYFW/ouristRoute/SceneryTable/history/ICON2.png' },

  {
    routeId: 3,
    day: 2,
    date: '2020-11-17',
    scenicName: '南平正宗熏鹅（武夷山店)',
    address: '南平 · 武夷山',
    icon: '../../static/LYFW/ouristRoute/SceneryTable/history/ICON1.png' },

  {
    routeId: 4,
    day: 3,
    date: '2020-11-18',
    scenicName: '南平正宗熏鹅（武夷山店)',
    address: '南平 · 武夷山',
    icon: '../../static/LYFW/ouristRoute/SceneryTable/history/ICON1.png' },

  {
    routeId: 5,
    day: 3,
    date: '2020-11-18',
    scenicName: '南平正宗熏鹅（武夷山店)',
    address: '南平 · 武夷山',
    icon: '../../static/LYFW/ouristRoute/SceneryTable/history/ICON1.png' }],

  msg: '提示' };


var travel = {
  status: 1, //1成功,0失败提示返回值
  data: {
    scenicName: '武夷山|全方位详尽三日路线全方位详尽三日路线',
    date: '2019-11-05',
    time: '13:20',
    name: '南平中宝旅游',
    number: '15625566555',
    address: '南平',
    cost: 2500,
    image: '../../../static/LYFW/ouristRoute/SceneryTable/travelArrange/touxiang1.png',
    ladel: '官方' },


  msg: '提示' };


var arrange = {
  status: 1, //1成功,0失败提示返回值
  data: [{
    day: 1,
    title: '泉州 — 南平 — 武夷山二日游',
    hotel: '南平武夷山香格里拉酒店',
    dinnerTime: '晚',
    content: [{
      contentTitle: '集合：泉州湖美大酒店  不在二环的自发前往，不接送，不迟到 ',
      contentTIme: '08:00 — 09:00',
      contentText: '泉州市区二环内酒店接，不在二环的自行前往集合。 集合时间：8：00 集合地点： 泉州火车站旁边昆明汽车客运站1号门（湖美酒店对面）集合泉州二环内可免费接，正常接送时间为6：00——7：40之间。如您入住稍远，可能接送安排会提前。具体时间以工作人员提前一天联系通知为准。</div>' },

    {
      contentTitle: '交通工具：大型高一大巴前往武夷山风景区',
      contentTIme: '09:00 — 12:00',
      contentText: '泉州市区二环内酒店接，不在二环的自行前往集合。 集合时间：8：00 集合地点： 泉州火车站旁边昆明汽车客运站1号门（三元宾馆对面）集合泉州二环内可免费接，正常接送时间为6：00——7：40之间。如您入住稍远，可能接送安排会提前。  <p></p><image src="../../../static/LYFW/ouristRoute/SceneryTable/TouristRoute/mangdangshan.jpg"/>' }] }],


  msg: '提示' };


var description = {
  status: 1, //1成功,0失败提示返回值
  data: [{
    title: '费用包含',
    way: '1、住宿：全程包含2晚住宿（两人入住标准间一间）。 <p></p> 2、用餐：全程包含9早餐13正餐，正餐包含特色餐：南平特色菜、藏族风味餐+风情表演、瑞丽勐卯宴。 <p></p> 3、门票：和顺古镇，其它行程内景点根据时间及个人身体状态、宗教信仰等因素选择自费项目。 <p></p> 4、领队及领航车服务：领队及领航车服务。 <p></p> 5、保险：旅行社组合险、旅游意外险。' },

  {
    title: '费用不含',
    way: '1、各地抵达泉州往返大交通费用。 <p></p> 2、单房差费用。 <p></p> 3、用车：车辆建议选择为科迪亚克或四驱越野车（如需其它车型选择，请另行补足车型差额）。 <p></p> 4、行程使用车辆的租车费、油费、过路费、停车费等车辆相关费用。 <p></p> 5、费用包含中未提及的其他个人消费。 <p></p> 6、因交通延阻、罢工、天气、飞机、机器故障、航班取消或更改时间等不可抗力原因所导致的额外费用。 <p></p> 7、酒店内洗衣、理发、电话、饮品等个人消费。' }],

  msg: '提示' };


var reserve = {
  status: 1, //1成功,0失败提示返回值
  data: [{
    id: 1,
    title: '退款规则:按规则退',
    way: '<img src="../../../static/LYFW/ouristRoute/SceneryTable/travelArrange/fuwenben.png" style="width:100%;height:auto;" /image> <p></p> 补充说明：实际退款金额，请以旅行社客服确认为准。' },

  {
    id: 2,
    title: '温馨提示',
    way: '1、机票：本产品不含大交通费用，如需大交通费用请联系我们的客服。 <p></p> 2、儿童门票预算为全票，门票减免根据各景点儿童票政策执行，具体减免费用在行程结束时进行退款。' },

  {
    id: 3,
    title: '重要提醒',
    way: '1、尊重并保护用户隐私，用户信息只会用于协助用户预订旅游商品； <p></p> 2、预订旅游产品，需要在下单后支付时限内支付全款，超出时限订单将会取消；再次购买需重新下单，购买成功会收到确认邮件及短信； <p></p> 3、报名旅游线路时，请确保身体状况良好适合参加线路行程；如身体不适，请务必将自身健康状况如实告知； <p></p> 4、请尊重地方民风民俗、行程中文明旅游，关注景区相关说明，遵守当地法律法规； <p></p> 5、因旅行社营业时间限制18:00后付款的订单无法在二次确认时间内回复，我们会在次日及时为您处理。如有急需处理的订单，请您通过电话咨询旅行社； <p></p> 6、您所预订的商品如果包含高危项目（如漂流、攀岩、潜水等），请在报名前根据自身条件进行选择，并充分阅读产品页面中相关重要提示事项； <p></p> 7、酒店内洗衣、理发、电话、饮品等个人消费。' }],

  msg: '提示' };



var groupTour = {
  status: 1, //1成功,0失败提示返回值
  data: [{
    groupId: 1,
    groupTItle: '北京+天津+河北',
    content: [{
      contentId: 1,
      contentImage: '../../../static/LYFW/ouristRoute/SceneryTable/lunBo/banner1.jpg',
      contentTitle: '【立即下单立减300】北京天津河北五日游北京天津河北五日游北京天津河北五日游北京天津河北五日游',
      contentLabel: '5A风景 | 周边游 | 历史古城 ',
      cost: 1800,
      sell: 55,
      comment: 8 },

    {
      contentId: 2,
      contentImage: '../../../static/LYFW/ouristRoute/SceneryTable/lunBo/banner1.jpg',
      contentTitle: '【立即下单立减300】北京天津河北五日游北京天津河北五日游北京天津河北五日游北京天津河北五日游',
      contentLabel: '5A风景 | 周边游 | 历史古城 ',
      cost: 1800,
      sell: 55,
      comment: 8 },

    {
      contentId: 3,
      contentImage: '../../../static/LYFW/ouristRoute/SceneryTable/lunBo/banner1.jpg',
      contentTitle: '【立即下单立减300】北京天津河北五日游北京天津河北五日游北京天津河北五日游北京天津河北五日游',
      contentLabel: '5A风景 | 周边游 | 历史古城 ',
      cost: 1800,
      sell: 55,
      comment: 8 },

    {
      contentId: 4,
      contentImage: '../../../static/LYFW/ouristRoute/SceneryTable/lunBo/banner1.jpg',
      contentTitle: '【立即下单立减300】北京天津河北五日游北京天津河北五日游北京天津河北五日游北京天津河北五日游',
      contentLabel: '5A风景 | 周边游 | 历史古城 ',
      cost: 1800,
      sell: 55,
      comment: 8 }] },


  {
    groupId: 2,
    groupTItle: '北京+天津+河北',
    content: [{
      contentId: 1,
      contentImage: '../../../static/LYFW/ouristRoute/SceneryTable/lunBo/banner1.jpg',
      contentTitle: '【立即下单立减300】北京天津河北五日游北京天津河北五日游北京天津河北五日游北京天津河北五日游',
      contentLabel: '5A风景 | 周边游 | 历史古城 ',
      cost: 1800,
      sell: 55,
      comment: 8 },

    {
      contentId: 2,
      contentImage: '../../../static/LYFW/ouristRoute/SceneryTable/lunBo/banner1.jpg',
      contentTitle: '【立即下单立减300】北京天津河北五日游北京天津河北五日游北京天津河北五日游北京天津河北五日游',
      contentLabel: '5A风景 | 周边游 | 历史古城 ',
      cost: 1800,
      sell: 55,
      comment: 8 }] }],


  msg: '提示' };


var Announcement = {
  status: 1, //1成功,0失败提示返回值
  data: {
    zl_title: '不负灿烂时光，周边游更精彩，美轮美奂',
    LabelContent: [{
      lc_text: '海丝泉州一日游' },

    {
      lc_text: '普陀山祈福双飞三日游' }] },


  msg: '提示' };


var recommendedContent = {
  status: 1, //1成功,0失败提示返回值
  data: [{
    rc_id: 1,
    rc_image: '../../static/Home/ho_zhly/xiaoxichen.png',
    rc_text: '泉州小西埕' },

  {
    rc_id: 2,
    rc_image: '../../static/Home/ho_zhly/moyu.png',
    rc_text: '稻田摸鱼' },

  {
    rc_id: 3,
    rc_image: '../../static/Home/ho_zhly/zhonglou.png',
    rc_text: '泉州钟楼' },

  {
    rc_id: 4,
    rc_image: '../../static/Home/ho_zhly/luoyangqiao.png',
    rc_text: '泉州洛阳桥' },

  {
    rc_id: 5,
    rc_image: '../../static/Home/ho_zhly/qicai.png',
    rc_text: '七彩官畲' }],

  msg: '提示' };


var charteredCarContent = {
  status: 1, //1成功,0失败提示返回值
  data: [{
    cityName: '厦门',
    dedicatedAddress: [
    '厦门机场专线',
    '厦门机场专线',
    '厦门机场专线',
    '厦门机场专线',
    '厦门机场专线',
    '厦门机场专线'] },


  {
    cityName: '泉州',
    dedicatedAddress: [
    '泉州机场专线',
    '泉州机场专线',
    '泉州机场专线',
    '泉州机场专线',
    '泉州机场专线',
    '泉州机场专线'] }],


  msg: '提示' };


var noticeContent = {
  status: 1, //1成功,0失败提示返回值
  data: {
    way: '1、上车前一定要核对车牌号、车身颜色是否与系统派发车辆一致，如果有电话往来，也请核对下号码是否无误。 <p></p> 2、如果是要外出，上车后请将车辆信息发送一份给自己的朋友，作为紧急联系人，保持联系，如果有不好的苗头，可以及时沟通。 <p></p> 3、单身一人乘车请勿坐在副驾驶位置上，一旦歹徒有犯罪意向，第一时间可以侵害到你，坐在后排可为自己增加应对时间。 <p></p> 4、在陌生人的车辆上一定切记不要熟睡，不要一直低头玩手机，要注意车窗外的风景，注意行驶路线是否正确。',
    day: [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10'] },


  msg: '提示' };


var choiceVehicle = {
  status: 1, //1成功,0失败提示返回值
  data: {
    id: 1,
    address: '厦门国际机场',
    destination: '泉州晋江',
    time: '2020-03-20',
    day: '1天' },

  msg: '提示' };


var priceExplain = {
  status: 1, //1成功,0失败提示返回值
  data: [{
    title: '费用说明',
    way: '用车当日可使用8小时，包括100公里（多日包车中，当日未用完的部分不可累计）' },

  {
    title: '费用包含',
    way: '车辆使用费，燃油费，司机服务费，司机餐食费' },

  {
    title: '费用不含',
    way: '费用中，不包括以下内容产生的费用： <p></p> 1、超时长费：超出套餐时长外产生的费用（收费标准详见订单填写页） <p></p> 2、超公里费：超出套餐公里数产生的费用（收费标准详见订单填写页） <p></p> 3、空驶费：实际下车地点与下车时填写的不一致，导致的司机车辆空驶的费用。（具体收费标准详见订单填写页）' }],

  msg: '提示' };


var vehicleSelection = {
  status: 1, //1成功,0失败提示返回值
  data: [{
    tabId: 0,
    tabName: '轿车(5座)',
    cost: [{
      btId: 0,
      price: '100-200',
      vehicle: [{
        carId: 0,
        car: '../../static/BCFW/choice/che1.png',
        carName: '比亚迪  54',
        carNumberSeats: '轿车(5座)',
        carprice: '110' },


      {
        carId: 1,
        car: '../../static/BCFW/choice/che2.png',
        carName: '奥迪  888',
        carNumberSeats: '轿车(5座)',
        carprice: '120' }] },


    {
      btId: 1,
      price: '200-300',
      vehicle: [{
        carId: 0,
        car: '../../static/BCFW/choice/che1.png',
        carName: '比亚迪  54',
        carNumberSeats: '轿车(5座)',
        carprice: '120' },

      {
        carId: 1,
        car: '../../static/BCFW/choice/che2.png',
        carName: '奥迪  888',
        carNumberSeats: '轿车(5座)',
        carprice: '120' }] },


    {
      btId: 2,
      price: '250-350',
      vehicle: [{
        car: '../../static/BCFW/choice/che1.png',
        carName: '比亚迪  54',
        carNumberSeats: '轿车(5座)',
        carprice: '120' },

      {
        car: '../../static/BCFW/choice/che2.png',
        carName: '奥迪  888',
        carNumberSeats: '轿车(5座)',
        carprice: '120' }] },


    {
      btId: 3,
      price: '400-500',
      vehicle: [{
        car: '../../static/BCFW/choice/che1.png',
        carName: '比亚迪  54',
        carNumberSeats: '轿车(5座)',
        carprice: '120' },

      {
        car: '../../static/BCFW/choice/che2.png',
        carName: '奥迪  888',
        carNumberSeats: '轿车(5座)',
        carprice: '120' }] }] },



  {
    tabId: 1,
    tabName: 'SUV(7座)',
    cost: [{
      btId: 0,
      price: '10-200',
      vehicle: [{
        carId: 0,
        car: '../../static/BCFW/choice/che1.png',
        carName: '比亚迪  54',
        carNumberSeats: '轿车(5座)',
        carprice: '120' },

      {
        carId: 1,
        car: '../../static/BCFW/choice/che2.png',
        carName: '奥迪  888',
        carNumberSeats: '轿车(5座)',
        carprice: '120' }] },


    {
      btId: 1,
      price: '20-300',
      vehicle: [{
        carId: 0,
        car: '../../static/BCFW/choice/che1.png',
        carName: '比亚迪  54',
        carNumberSeats: '轿车(5座)',
        carprice: '120' },

      {
        carId: 1,
        car: '../../static/BCFW/choice/che2.png',
        carName: '奥迪  888',
        carNumberSeats: '轿车(5座)',
        carprice: '120' }] },


    {
      btId: 2,
      price: '250-350',
      vehicle: [{
        car: '../../static/BCFW/choice/che1.png',
        carName: '比亚迪  54',
        carNumberSeats: '轿车(5座)',
        carprice: '120' },

      {
        car: '../../static/BCFW/choice/che2.png',
        carName: '奥迪  888',
        carNumberSeats: '轿车(5座)',
        carprice: '120' }] },


    {
      btId: 3,
      price: '400-500',
      vehicle: [{
        car: '../../static/BCFW/choice/che1.png',
        carName: '比亚迪  54',
        carNumberSeats: '轿车(5座)',
        carprice: '120' },

      {
        car: '../../static/BCFW/choice/che2.png',
        carName: '奥迪  888',
        carNumberSeats: '轿车(5座)',
        carprice: '120' }] }] },



  {
    tabId: 2,
    tabName: '商务车(7座)',
    cost: [{
      btId: 0,
      price: '100-200',
      vehicle: [{
        carId: 0,
        car: '../../static/BCFW/choice/che1.png',
        carName: '比亚迪  54',
        carNumberSeats: '轿车(5座)',
        carprice: '120' },

      {
        carId: 1,
        car: '../../static/BCFW/choice/che2.png',
        carName: '奥迪  888',
        carNumberSeats: '轿车(5座)',
        carprice: '120' }] },


    {
      btId: 1,
      price: '200-300',
      vehicle: [{
        carId: 0,
        car: '../../static/BCFW/choice/che1.png',
        carName: '比亚迪  54',
        carNumberSeats: '轿车(5座)',
        carprice: '120' },

      {
        carId: 1,
        car: '../../static/BCFW/choice/che2.png',
        carName: '奥迪  888',
        carNumberSeats: '轿车(5座)',
        carprice: '120' }] },


    {
      btId: 2,
      price: '250-350',
      vehicle: [{
        car: '../../static/BCFW/choice/che1.png',
        carName: '比亚迪  54',
        carNumberSeats: '轿车(5座)',
        carprice: '120' },

      {
        car: '../../static/BCFW/choice/che2.png',
        carName: '奥迪  888',
        carNumberSeats: '轿车(5座)',
        carprice: '120' }] },


    {
      btId: 3,
      price: '400-500',
      vehicle: [{
        car: '../../static/BCFW/choice/che1.png',
        carName: '比亚迪  54',
        carNumberSeats: '轿车(5座)',
        carprice: '120' },

      {
        car: '../../static/BCFW/choice/che2.png',
        carName: '奥迪  888',
        carNumberSeats: '轿车(5座)',
        carprice: '120' }] }] }],



  msg: '提示' };


var driverInformation = {
  status: 1, //1成功,0失败提示返回值
  data: {
    orderType: '待支付',
    licensePlate: '闽A88888',
    vehicleType: '豪华车型',
    name: '张三丰',
    age: '6',
    telephone: '134566456126',
    day: '3',
    duration: '47:00',
    cost: '200',
    overtimeCharge: '50',
    totalCost: '250',
    boardingPoint: '泉州客运中心',
    destination: '泉州动车站',
    totalLi: '150km',
    totalDuration: '02:00:00' },

  msg: '提示' };



var selectSpecialLine = {
  status: 1, //1成功,0失败提示返回值
  data: {
    ci_countyCount: 0,
    ci_cityName: '泉州',
    countys: [{
      ct_countys: '晋江专线',
      ct_longitude: '118.600608',
      ct_latitude: '24.889217' },
    {
      ct_countys: '惠安专线',
      ct_longitude: '118.600608',
      ct_latitude: '24.889217' },
    {
      ct_countys: '福州专线',
      ct_longitude: '118.600608',
      ct_latitude: '24.889217' },
    {
      ct_countys: '安溪专线',
      ct_longitude: '118.600608',
      ct_latitude: '24.889217' },
    {
      ct_countys: '安海专线',
      ct_longitude: '118.600608',
      ct_latitude: '24.889217' },
    {
      ct_countys: '东石专线',
      ct_longitude: '118.600608',
      ct_latitude: '24.889217' }] },


  msg: '提示' };


// 接口声明区
var _default = {
  routeComment2: routeComment2,
  userInfo: userInfo,
  sixPalaceList: sixPalaceList,
  scenicList: scenicList,
  scSpotDetails: scSpotDetails,
  lunBo: lunBo,
  touristRoute: touristRoute,
  routeComment: routeComment,
  userRoute: userRoute,
  reply: reply,
  touristRoute2: touristRoute2,
  touristRoute3: touristRoute3,
  complaint: complaint,
  collectionContent: collectionContent,
  collectionCommodity: collectionCommodity,
  record: record,
  travel: travel,
  arrange: arrange,
  description: description,
  reserve: reserve,
  groupTour: groupTour,
  Announcement: Announcement,
  recommendedContent: recommendedContent,
  charteredCarContent: charteredCarContent,
  noticeContent: noticeContent,
  choiceVehicle: choiceVehicle,
  priceExplain: priceExplain,
  vehicleSelection: vehicleSelection,
  driverInformation: driverInformation,
  selectSpecialLine: selectSpecialLine };exports.default = _default;

/***/ }),

/***/ 25:
/*!***************************************!*\
  !*** D:/UAD/Jdt-zhcx/common/login.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));
var _vuex = _interopRequireDefault(__webpack_require__(/*! vuex */ 14));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

_vue.default.use(_vuex.default);

var store = new _vuex.default.Store({
  state: {
    hasLogin: false,
    userInfo: {} },

  mutations: {
    login: function login(state, provider) {

      state.hasLogin = true;
      state.userInfo = provider;
      uni.setStorage({ //缓存用户登陆状态
        key: 'userInfo',
        data: provider });

      //console.log(state.userInfo);
    },
    logout: function logout(state) {
      state.hasLogin = false;
      state.userInfo = {};
      uni.removeStorage({
        key: 'userInfo' });

    } },

  actions: {} });var _default =




store;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 26:
/*!**********************************************!*\
  !*** D:/UAD/Jdt-zhcx/common/BCFW/BcfwZyx.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; //示例
var charteredBus = {
  status: 1,
  data: {
    departName: '厦门机场厦门机场厦门机场', //出发地
    borunName: '晋江厦门机场厦门机场厦门机场', //到达地
    date: '2020-01-20', //出发时间
    number: '1', //包车天数
    car: '../../../static/BCFW/choice/che.png',
    carName: '比亚迪',
    carType: '轿车（5座）',
    carMoney: '110',
    tripName: '张三丰',
    tripId: '350583*********2645',
    tripPhone: '17522044126',
    security: '1.本票仅为乘坐使用，不作为报销凭证 \n 2.本票仅供一人使用、当趟有效，逾期作废 \n 3.请勿携带贵重物品乘坐竹筏 \n 4.在行筏过程中严禁站立或行走拍照 \n 5.在雷雨、大风、能见度差等条件下停筏 \n 6.竹筏在行驶中或未停稳时，严禁强行登、下筏 \n 7.严禁下河游泳，戏水 \n 8.严禁携带戏水工具（水枪、水瓢等）乘坐竹筏 \n 9.严禁未穿救生衣承筏，乘筏过程中严禁解脱救生衣 \n 10.严禁携带易燃、易爆、腐蚀、毒害、放射性等危险品和管制刀具及国家禁止运输的其它危险化学品乘坐竹筏 \n 11.严禁超载（原则上正常水位每张拼排乘坐体重75公斤以下游客10人），如遇超标准体重者，由现场管理人员统一调整 \n 12.咨询电话：0599-8030999 投诉电话：0599-8030995' },


  msg: '提示' };

var ArrayInfo = {
  status: 1, //1成功/0失败提示返回值
  data: [{
    or_class: '包车-定制',
    or_time: '2020-03-04',
    or_type: '待发车',
    or_cost: 100,
    or_dateString: '2020-03-04 20:20',
    or_boardingPoint: '厦门',
    or_destination: '晋江',
    cm_day: '3',
    or_driverTelephone: '123',
    or_number: '0000' },

  {
    or_class: '包车-定制',
    or_time: '2020-03-04',
    or_type: '进行中',
    or_cost: 200,
    or_dateString: '2020-03-04 20:20',
    or_boardingPoint: '厦门',
    or_destination: '安溪',
    cm_day: '3',
    or_driverTelephone: '123',
    or_number: '0000' },

  {
    or_class: '包车-定制',
    or_time: '2020-03-04',
    or_type: '已完成',
    or_cost: 50,
    or_dateString: '2020-03-04 20:20',
    or_boardingPoint: '厦门',
    or_destination: '晋江',
    cm_day: '3',
    or_driverTelephone: '123',
    or_number: '0000' },

  {
    or_class: '包车-定制',
    or_time: '2020-03-04',
    or_type: '待发车',
    or_cost: 100,
    or_dateString: '2020-03-04 20:20',
    or_boardingPoint: '泉州',
    or_destination: '晋江',
    cm_day: '3',
    or_driverTelephone: '123',
    or_number: '0000' },

  {
    or_class: '包车-定制',
    or_time: '2020-03-04',
    or_type: '待支付',
    or_cost: 100,
    or_dateString: '2020-03-04 20:20',
    or_boardingPoint: '厦门',
    or_destination: '晋江',
    cm_day: '3',
    or_driverTelephone: '123',
    or_number: '0000' },

  {
    or_class: '包车-专线', //标题
    or_time: '2020-03-04', //预定时间
    or_type: '已取消', //状态
    or_cost: 100, //价格
    or_dateString: '2020-03-04 20:20', //发车时间
    or_boardingPoint: '厦门', //出发地
    or_destination: '晋江', //目的地
    cm_day: '3', //包车天数
    or_driverTelephone: '123', //司机电话
    or_number: '0000' //订单号
  }],

  msg: '提示' };

var orderInfo = {
  status: 1, //1成功/0失败提示返回值
  data: {
    or_class: '包车-定制',
    or_type: '待发车',
    userName: '张三丰',
    userCID: '350583199909010022',
    userPhone: '13235912326',
    cm_totalCost: 100,
    or_dateString: '2020-03-04 20:20',
    or_boardingPoint: '厦门',
    or_destination: '晋江',
    cm_day: 3,
    or_driverTelephone: '123',
    or_number: '0000' } };


// 接口声明区
var _default = {
  ArrayInfo: ArrayInfo,
  orderInfo: orderInfo,
  charteredBus: charteredBus };exports.default = _default;

/***/ }),

/***/ 262:
/*!**************************************************!*\
  !*** D:/UAD/Jdt-zhcx/libs/qqmap-wx-jssdk.min.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}var ERROR_CONF = { KEY_ERR: 311, KEY_ERR_MSG: 'key格式错误', PARAM_ERR: 310, PARAM_ERR_MSG: '请求参数信息有误', SYSTEM_ERR: 600, SYSTEM_ERR_MSG: '系统错误', WX_ERR_CODE: 1000, WX_OK_CODE: 200 };var BASE_URL = 'https://apis.map.qq.com/ws/';var URL_SEARCH = BASE_URL + 'place/v1/search';var URL_SUGGESTION = BASE_URL + 'place/v1/suggestion';var URL_GET_GEOCODER = BASE_URL + 'geocoder/v1/';var URL_CITY_LIST = BASE_URL + 'district/v1/list';var URL_AREA_LIST = BASE_URL + 'district/v1/getchildren';var URL_DISTANCE = BASE_URL + 'distance/v1/';var URL_DIRECTION = BASE_URL + 'direction/v1/';var MODE = { driving: 'driving', transit: 'transit' };var EARTH_RADIUS = 6378136.49;var Utils = { safeAdd: function safeAdd(x, y) {var lsw = (x & 0xffff) + (y & 0xffff);var msw = (x >> 16) + (y >> 16) + (lsw >> 16);return msw << 16 | lsw & 0xffff;}, bitRotateLeft: function bitRotateLeft(num, cnt) {return num << cnt | num >>> 32 - cnt;}, md5cmn: function md5cmn(q, a, b, x, s, t) {return this.safeAdd(this.bitRotateLeft(this.safeAdd(this.safeAdd(a, q), this.safeAdd(x, t)), s), b);}, md5ff: function md5ff(a, b, c, d, x, s, t) {return this.md5cmn(b & c | ~b & d, a, b, x, s, t);}, md5gg: function md5gg(a, b, c, d, x, s, t) {return this.md5cmn(b & d | c & ~d, a, b, x, s, t);}, md5hh: function md5hh(a, b, c, d, x, s, t) {return this.md5cmn(b ^ c ^ d, a, b, x, s, t);}, md5ii: function md5ii(a, b, c, d, x, s, t) {return this.md5cmn(c ^ (b | ~d), a, b, x, s, t);}, binlMD5: function binlMD5(x, len) {x[len >> 5] |= 0x80 << len % 32;x[(len + 64 >>> 9 << 4) + 14] = len;var i;var olda;var oldb;var oldc;var oldd;var a = 1732584193;var b = -271733879;var c = -1732584194;var d = 271733878;for (i = 0; i < x.length; i += 16) {olda = a;oldb = b;oldc = c;oldd = d;a = this.md5ff(a, b, c, d, x[i], 7, -680876936);d = this.md5ff(d, a, b, c, x[i + 1], 12, -389564586);c = this.md5ff(c, d, a, b, x[i + 2], 17, 606105819);b = this.md5ff(b, c, d, a, x[i + 3], 22, -1044525330);a = this.md5ff(a, b, c, d, x[i + 4], 7, -176418897);d = this.md5ff(d, a, b, c, x[i + 5], 12, 1200080426);c = this.md5ff(c, d, a, b, x[i + 6], 17, -1473231341);b = this.md5ff(b, c, d, a, x[i + 7], 22, -45705983);a = this.md5ff(a, b, c, d, x[i + 8], 7, 1770035416);d = this.md5ff(d, a, b, c, x[i + 9], 12, -1958414417);c = this.md5ff(c, d, a, b, x[i + 10], 17, -42063);b = this.md5ff(b, c, d, a, x[i + 11], 22, -1990404162);a = this.md5ff(a, b, c, d, x[i + 12], 7, 1804603682);d = this.md5ff(d, a, b, c, x[i + 13], 12, -40341101);c = this.md5ff(c, d, a, b, x[i + 14], 17, -1502002290);b = this.md5ff(b, c, d, a, x[i + 15], 22, 1236535329);a = this.md5gg(a, b, c, d, x[i + 1], 5, -165796510);d = this.md5gg(d, a, b, c, x[i + 6], 9, -1069501632);c = this.md5gg(c, d, a, b, x[i + 11], 14, 643717713);b = this.md5gg(b, c, d, a, x[i], 20, -373897302);a = this.md5gg(a, b, c, d, x[i + 5], 5, -701558691);d = this.md5gg(d, a, b, c, x[i + 10], 9, 38016083);c = this.md5gg(c, d, a, b, x[i + 15], 14, -660478335);b = this.md5gg(b, c, d, a, x[i + 4], 20, -405537848);a = this.md5gg(a, b, c, d, x[i + 9], 5, 568446438);d = this.md5gg(d, a, b, c, x[i + 14], 9, -1019803690);c = this.md5gg(c, d, a, b, x[i + 3], 14, -187363961);b = this.md5gg(b, c, d, a, x[i + 8], 20, 1163531501);a = this.md5gg(a, b, c, d, x[i + 13], 5, -1444681467);d = this.md5gg(d, a, b, c, x[i + 2], 9, -51403784);c = this.md5gg(c, d, a, b, x[i + 7], 14, 1735328473);b = this.md5gg(b, c, d, a, x[i + 12], 20, -1926607734);a = this.md5hh(a, b, c, d, x[i + 5], 4, -378558);d = this.md5hh(d, a, b, c, x[i + 8], 11, -2022574463);c = this.md5hh(c, d, a, b, x[i + 11], 16, 1839030562);b = this.md5hh(b, c, d, a, x[i + 14], 23, -35309556);a = this.md5hh(a, b, c, d, x[i + 1], 4, -1530992060);d = this.md5hh(d, a, b, c, x[i + 4], 11, 1272893353);c = this.md5hh(c, d, a, b, x[i + 7], 16, -155497632);b = this.md5hh(b, c, d, a, x[i + 10], 23, -1094730640);a = this.md5hh(a, b, c, d, x[i + 13], 4, 681279174);d = this.md5hh(d, a, b, c, x[i], 11, -358537222);c = this.md5hh(c, d, a, b, x[i + 3], 16, -722521979);b = this.md5hh(b, c, d, a, x[i + 6], 23, 76029189);a = this.md5hh(a, b, c, d, x[i + 9], 4, -640364487);d = this.md5hh(d, a, b, c, x[i + 12], 11, -421815835);c = this.md5hh(c, d, a, b, x[i + 15], 16, 530742520);b = this.md5hh(b, c, d, a, x[i + 2], 23, -995338651);a = this.md5ii(a, b, c, d, x[i], 6, -198630844);d = this.md5ii(d, a, b, c, x[i + 7], 10, 1126891415);c = this.md5ii(c, d, a, b, x[i + 14], 15, -1416354905);b = this.md5ii(b, c, d, a, x[i + 5], 21, -57434055);a = this.md5ii(a, b, c, d, x[i + 12], 6, 1700485571);d = this.md5ii(d, a, b, c, x[i + 3], 10, -1894986606);c = this.md5ii(c, d, a, b, x[i + 10], 15, -1051523);b = this.md5ii(b, c, d, a, x[i + 1], 21, -2054922799);a = this.md5ii(a, b, c, d, x[i + 8], 6, 1873313359);d = this.md5ii(d, a, b, c, x[i + 15], 10, -30611744);c = this.md5ii(c, d, a, b, x[i + 6], 15, -1560198380);b = this.md5ii(b, c, d, a, x[i + 13], 21, 1309151649);a = this.md5ii(a, b, c, d, x[i + 4], 6, -145523070);d = this.md5ii(d, a, b, c, x[i + 11], 10, -1120210379);c = this.md5ii(c, d, a, b, x[i + 2], 15, 718787259);b = this.md5ii(b, c, d, a, x[i + 9], 21, -343485551);a = this.safeAdd(a, olda);b = this.safeAdd(b, oldb);c = this.safeAdd(c, oldc);d = this.safeAdd(d, oldd);}return [a, b, c, d];}, binl2rstr: function binl2rstr(input) {var i;var output = '';var length32 = input.length * 32;for (i = 0; i < length32; i += 8) {output += String.fromCharCode(input[i >> 5] >>> i % 32 & 0xff);}return output;}, rstr2binl: function rstr2binl(input) {var i;var output = [];output[(input.length >> 2) - 1] = undefined;for (i = 0; i < output.length; i += 1) {output[i] = 0;}var length8 = input.length * 8;for (i = 0; i < length8; i += 8) {output[i >> 5] |= (input.charCodeAt(i / 8) & 0xff) << i % 32;}return output;}, rstrMD5: function rstrMD5(s) {return this.binl2rstr(this.binlMD5(this.rstr2binl(s), s.length * 8));}, rstrHMACMD5: function rstrHMACMD5(key, data) {var i;var bkey = this.rstr2binl(key);var ipad = [];var opad = [];var hash;ipad[15] = opad[15] = undefined;if (bkey.length > 16) {bkey = this.binlMD5(bkey, key.length * 8);}for (i = 0; i < 16; i += 1) {ipad[i] = bkey[i] ^ 0x36363636;opad[i] = bkey[i] ^ 0x5c5c5c5c;}hash = this.binlMD5(ipad.concat(this.rstr2binl(data)), 512 + data.length * 8);return this.binl2rstr(this.binlMD5(opad.concat(hash), 512 + 128));}, rstr2hex: function rstr2hex(input) {var hexTab = '0123456789abcdef';var output = '';var x;var i;for (i = 0; i < input.length; i += 1) {x = input.charCodeAt(i);output += hexTab.charAt(x >>> 4 & 0x0f) + hexTab.charAt(x & 0x0f);}return output;}, str2rstrUTF8: function str2rstrUTF8(input) {return unescape(encodeURIComponent(input));}, rawMD5: function rawMD5(s) {return this.rstrMD5(this.str2rstrUTF8(s));}, hexMD5: function hexMD5(s) {return this.rstr2hex(this.rawMD5(s));}, rawHMACMD5: function rawHMACMD5(k, d) {return this.rstrHMACMD5(this.str2rstrUTF8(k), str2rstrUTF8(d));}, hexHMACMD5: function hexHMACMD5(k, d) {return this.rstr2hex(this.rawHMACMD5(k, d));}, md5: function md5(string, key, raw) {if (!key) {if (!raw) {return this.hexMD5(string);}return this.rawMD5(string);}if (!raw) {return this.hexHMACMD5(key, string);}return this.rawHMACMD5(key, string);}, getSig: function getSig(requestParam, sk, feature, mode) {var sig = null;var requestArr = [];Object.keys(requestParam).sort().forEach(function (key) {requestArr.push(key + '=' + requestParam[key]);});if (feature == 'search') {sig = '/ws/place/v1/search?' + requestArr.join('&') + sk;}if (feature == 'suggest') {sig = '/ws/place/v1/suggestion?' + requestArr.join('&') + sk;}if (feature == 'reverseGeocoder') {sig = '/ws/geocoder/v1/?' + requestArr.join('&') + sk;}if (feature == 'geocoder') {sig = '/ws/geocoder/v1/?' + requestArr.join('&') + sk;}if (feature == 'getCityList') {sig = '/ws/district/v1/list?' + requestArr.join('&') + sk;}if (feature == 'getDistrictByCityId') {sig = '/ws/district/v1/getchildren?' + requestArr.join('&') + sk;}if (feature == 'calculateDistance') {sig = '/ws/distance/v1/?' + requestArr.join('&') + sk;}if (feature == 'direction') {sig = '/ws/direction/v1/' + mode + '?' + requestArr.join('&') + sk;}sig = this.md5(sig);return sig;}, location2query: function location2query(data) {if (typeof data == 'string') {return data;}var query = '';for (var i = 0; i < data.length; i++) {var d = data[i];if (!!query) {query += ';';}if (d.location) {query = query + d.location.lat + ',' + d.location.lng;}if (d.latitude && d.longitude) {query = query + d.latitude + ',' + d.longitude;}}return query;}, rad: function rad(d) {return d * Math.PI / 180.0;}, getEndLocation: function getEndLocation(location) {var to = location.split(';');var endLocation = [];for (var i = 0; i < to.length; i++) {endLocation.push({ lat: parseFloat(to[i].split(',')[0]), lng: parseFloat(to[i].split(',')[1]) });}return endLocation;}, getDistance: function getDistance(latFrom, lngFrom, latTo, lngTo) {var radLatFrom = this.rad(latFrom);var radLatTo = this.rad(latTo);var a = radLatFrom - radLatTo;var b = this.rad(lngFrom) - this.rad(lngTo);var distance = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLatFrom) * Math.cos(radLatTo) * Math.pow(Math.sin(b / 2), 2)));distance = distance * EARTH_RADIUS;distance = Math.round(distance * 10000) / 10000;return parseFloat(distance.toFixed(0));}, getWXLocation: function getWXLocation(success, fail, complete) {wx.getLocation({ type: 'gcj02', success: success, fail: fail, complete: complete });}, getLocationParam: function getLocationParam(location) {if (typeof location == 'string') {var locationArr = location.split(',');if (locationArr.length === 2) {location = { latitude: location.split(',')[0], longitude: location.split(',')[1] };} else {location = {};}}return location;}, polyfillParam: function polyfillParam(param) {param.success = param.success || function () {};param.fail = param.fail || function () {};param.complete = param.complete || function () {};}, checkParamKeyEmpty: function checkParamKeyEmpty(param, key) {if (!param[key]) {var errconf = this.buildErrorConfig(ERROR_CONF.PARAM_ERR, ERROR_CONF.PARAM_ERR_MSG + key + '参数格式有误');param.fail(errconf);param.complete(errconf);return true;}return false;}, checkKeyword: function checkKeyword(param) {return !this.checkParamKeyEmpty(param, 'keyword');}, checkLocation: function checkLocation(param) {var location = this.getLocationParam(param.location);if (!location || !location.latitude || !location.longitude) {var errconf = this.buildErrorConfig(ERROR_CONF.PARAM_ERR, ERROR_CONF.PARAM_ERR_MSG + ' location参数格式有误');param.fail(errconf);param.complete(errconf);return false;}return true;}, buildErrorConfig: function buildErrorConfig(errCode, errMsg) {return { status: errCode, message: errMsg };}, handleData: function handleData(param, data, feature) {if (feature == 'search') {var searchResult = data.data;var searchSimplify = [];for (var i = 0; i < searchResult.length; i++) {searchSimplify.push({ id: searchResult[i].id || null, title: searchResult[i].title || null, latitude: searchResult[i].location && searchResult[i].location.lat || null, longitude: searchResult[i].location && searchResult[i].location.lng || null, address: searchResult[i].address || null, category: searchResult[i].category || null, tel: searchResult[i].tel || null, adcode: searchResult[i].ad_info && searchResult[i].ad_info.adcode || null, city: searchResult[i].ad_info && searchResult[i].ad_info.city || null, district: searchResult[i].ad_info && searchResult[i].ad_info.district || null, province: searchResult[i].ad_info && searchResult[i].ad_info.province || null });}param.success(data, { searchResult: searchResult, searchSimplify: searchSimplify });} else if (feature == 'suggest') {var suggestResult = data.data;var suggestSimplify = [];for (var i = 0; i < suggestResult.length; i++) {suggestSimplify.push({ adcode: suggestResult[i].adcode || null, address: suggestResult[i].address || null, category: suggestResult[i].category || null, city: suggestResult[i].city || null, district: suggestResult[i].district || null, id: suggestResult[i].id || null, latitude: suggestResult[i].location && suggestResult[i].location.lat || null, longitude: suggestResult[i].location && suggestResult[i].location.lng || null, province: suggestResult[i].province || null, title: suggestResult[i].title || null, type: suggestResult[i].type || null });}param.success(data, { suggestResult: suggestResult, suggestSimplify: suggestSimplify });} else if (feature == 'reverseGeocoder') {var reverseGeocoderResult = data.result;var reverseGeocoderSimplify = { address: reverseGeocoderResult.address || null, latitude: reverseGeocoderResult.location && reverseGeocoderResult.location.lat || null, longitude: reverseGeocoderResult.location && reverseGeocoderResult.location.lng || null, adcode: reverseGeocoderResult.ad_info && reverseGeocoderResult.ad_info.adcode || null, city: reverseGeocoderResult.address_component && reverseGeocoderResult.address_component.city || null, district: reverseGeocoderResult.address_component && reverseGeocoderResult.address_component.district || null, nation: reverseGeocoderResult.address_component && reverseGeocoderResult.address_component.nation || null, province: reverseGeocoderResult.address_component && reverseGeocoderResult.address_component.province || null, street: reverseGeocoderResult.address_component && reverseGeocoderResult.address_component.street || null, street_number: reverseGeocoderResult.address_component && reverseGeocoderResult.address_component.street_number || null, recommend: reverseGeocoderResult.formatted_addresses && reverseGeocoderResult.formatted_addresses.recommend || null, rough: reverseGeocoderResult.formatted_addresses && reverseGeocoderResult.formatted_addresses.rough || null };if (reverseGeocoderResult.pois) {var pois = reverseGeocoderResult.pois;var poisSimplify = [];for (var i = 0; i < pois.length; i++) {poisSimplify.push({ id: pois[i].id || null, title: pois[i].title || null, latitude: pois[i].location && pois[i].location.lat || null, longitude: pois[i].location && pois[i].location.lng || null, address: pois[i].address || null, category: pois[i].category || null, adcode: pois[i].ad_info && pois[i].ad_info.adcode || null, city: pois[i].ad_info && pois[i].ad_info.city || null, district: pois[i].ad_info && pois[i].ad_info.district || null, province: pois[i].ad_info && pois[i].ad_info.province || null });}param.success(data, { reverseGeocoderResult: reverseGeocoderResult, reverseGeocoderSimplify: reverseGeocoderSimplify, pois: pois, poisSimplify: poisSimplify });} else {param.success(data, { reverseGeocoderResult: reverseGeocoderResult, reverseGeocoderSimplify: reverseGeocoderSimplify });}} else if (feature == 'geocoder') {var geocoderResult = data.result;var geocoderSimplify = { title: geocoderResult.title || null, latitude: geocoderResult.location && geocoderResult.location.lat || null, longitude: geocoderResult.location && geocoderResult.location.lng || null, adcode: geocoderResult.ad_info && geocoderResult.ad_info.adcode || null, province: geocoderResult.address_components && geocoderResult.address_components.province || null, city: geocoderResult.address_components && geocoderResult.address_components.city || null, district: geocoderResult.address_components && geocoderResult.address_components.district || null, street: geocoderResult.address_components && geocoderResult.address_components.street || null, street_number: geocoderResult.address_components && geocoderResult.address_components.street_number || null, level: geocoderResult.level || null };param.success(data, { geocoderResult: geocoderResult, geocoderSimplify: geocoderSimplify });} else if (feature == 'getCityList') {var provinceResult = data.result[0];var cityResult = data.result[1];var districtResult = data.result[2];param.success(data, { provinceResult: provinceResult, cityResult: cityResult, districtResult: districtResult });} else if (feature == 'getDistrictByCityId') {var districtByCity = data.result[0];param.success(data, districtByCity);} else if (feature == 'calculateDistance') {var calculateDistanceResult = data.result.elements;var distance = [];for (var i = 0; i < calculateDistanceResult.length; i++) {distance.push(calculateDistanceResult[i].distance);}param.success(data, { calculateDistanceResult: calculateDistanceResult, distance: distance });} else if (feature == 'direction') {var direction = data.result.routes;param.success(data, direction);} else {param.success(data);}}, buildWxRequestConfig: function buildWxRequestConfig(param, options, feature) {var that = this;options.header = { "content-type": "application/json" };options.method = 'GET';options.success = function (res) {var data = res.data;if (data.status === 0) {that.handleData(param, data, feature);} else {param.fail(data);}};options.fail = function (res) {res.statusCode = ERROR_CONF.WX_ERR_CODE;param.fail(that.buildErrorConfig(ERROR_CONF.WX_ERR_CODE, res.errMsg));};options.complete = function (res) {var statusCode = +res.statusCode;switch (statusCode) {case ERROR_CONF.WX_ERR_CODE:{param.complete(that.buildErrorConfig(ERROR_CONF.WX_ERR_CODE, res.errMsg));break;}case ERROR_CONF.WX_OK_CODE:{var data = res.data;if (data.status === 0) {param.complete(data);} else {param.complete(that.buildErrorConfig(data.status, data.message));}break;}default:{param.complete(that.buildErrorConfig(ERROR_CONF.SYSTEM_ERR, ERROR_CONF.SYSTEM_ERR_MSG));}}};return options;}, locationProcess: function locationProcess(param, locationsuccess, locationfail, locationcomplete) {var that = this;locationfail = locationfail || function (res) {res.statusCode = ERROR_CONF.WX_ERR_CODE;param.fail(that.buildErrorConfig(ERROR_CONF.WX_ERR_CODE, res.errMsg));};locationcomplete = locationcomplete || function (res) {if (res.statusCode == ERROR_CONF.WX_ERR_CODE) {param.complete(that.buildErrorConfig(ERROR_CONF.WX_ERR_CODE, res.errMsg));}};if (!param.location) {that.getWXLocation(locationsuccess, locationfail, locationcomplete);} else if (that.checkLocation(param)) {var location = Utils.getLocationParam(param.location);locationsuccess(location);}} };var QQMapWX = /*#__PURE__*/function () {"use strict";function QQMapWX(options) {_classCallCheck(this, QQMapWX);if (!options.key) {throw Error('key值不能为空');}this.key = options.key;}_createClass(QQMapWX, [{ key: "search", value: function search(options) {var that = this;options = options || {};Utils.polyfillParam(options);if (!Utils.checkKeyword(options)) {return;}var requestParam = { keyword: options.keyword, orderby: options.orderby || '_distance', page_size: options.page_size || 10, page_index: options.page_index || 1, output: 'json', key: that.key };if (options.address_format) {requestParam.address_format = options.address_format;}if (options.filter) {requestParam.filter = options.filter;}var distance = options.distance || "1000";var auto_extend = options.auto_extend || 1;var region = null;var rectangle = null;if (options.region) {region = options.region;}if (options.rectangle) {rectangle = options.rectangle;}var locationsuccess = function locationsuccess(result) {if (region && !rectangle) {requestParam.boundary = "region(" + region + "," + auto_extend + "," + result.latitude + "," + result.longitude + ")";if (options.sig) {requestParam.sig = Utils.getSig(requestParam, options.sig, 'search');}} else if (rectangle && !region) {requestParam.boundary = "rectangle(" + rectangle + ")";if (options.sig) {requestParam.sig = Utils.getSig(requestParam, options.sig, 'search');}} else {requestParam.boundary = "nearby(" + result.latitude + "," + result.longitude + "," + distance + "," + auto_extend + ")";if (options.sig) {requestParam.sig = Utils.getSig(requestParam, options.sig, 'search');}}wx.request(Utils.buildWxRequestConfig(options, { url: URL_SEARCH, data: requestParam }, 'search'));};Utils.locationProcess(options, locationsuccess);} }, { key: "getSuggestion", value: function getSuggestion(options) {var that = this;options = options || {};Utils.polyfillParam(options);if (!Utils.checkKeyword(options)) {return;}var requestParam = { keyword: options.keyword, region: options.region || '全国', region_fix: options.region_fix || 0, policy: options.policy || 0, page_size: options.page_size || 10, page_index: options.page_index || 1, get_subpois: options.get_subpois || 0, output: 'json', key: that.key };if (options.address_format) {requestParam.address_format = options.address_format;}if (options.filter) {requestParam.filter = options.filter;}if (options.location) {var locationsuccess = function locationsuccess(result) {requestParam.location = result.latitude + ',' + result.longitude;if (options.sig) {requestParam.sig = Utils.getSig(requestParam, options.sig, 'suggest');}wx.request(Utils.buildWxRequestConfig(options, { url: URL_SUGGESTION, data: requestParam }, "suggest"));};Utils.locationProcess(options, locationsuccess);} else {if (options.sig) {requestParam.sig = Utils.getSig(requestParam, options.sig, 'suggest');}wx.request(Utils.buildWxRequestConfig(options, { url: URL_SUGGESTION, data: requestParam }, "suggest"));}} }, { key: "reverseGeocoder", value: function reverseGeocoder(options) {var that = this;options = options || {};Utils.polyfillParam(options);var requestParam = { coord_type: options.coord_type || 5, get_poi: options.get_poi || 0, output: 'json', key: that.key };if (options.poi_options) {requestParam.poi_options = options.poi_options;}var locationsuccess = function locationsuccess(result) {requestParam.location = result.latitude + ',' + result.longitude;if (options.sig) {requestParam.sig = Utils.getSig(requestParam, options.sig, 'reverseGeocoder');}wx.request(Utils.buildWxRequestConfig(options, { url: URL_GET_GEOCODER, data: requestParam }, 'reverseGeocoder'));};Utils.locationProcess(options, locationsuccess);} }, { key: "geocoder", value: function geocoder(options) {var that = this;options = options || {};Utils.polyfillParam(options);if (Utils.checkParamKeyEmpty(options, 'address')) {return;}var requestParam = { address: options.address, output: 'json', key: that.key };if (options.region) {requestParam.region = options.region;}if (options.sig) {requestParam.sig = Utils.getSig(requestParam, options.sig, 'geocoder');}wx.request(Utils.buildWxRequestConfig(options, { url: URL_GET_GEOCODER, data: requestParam }, 'geocoder'));} }, { key: "getCityList", value: function getCityList(options) {var that = this;options = options || {};Utils.polyfillParam(options);var requestParam = { output: 'json', key: that.key };if (options.sig) {requestParam.sig = Utils.getSig(requestParam, options.sig, 'getCityList');}wx.request(Utils.buildWxRequestConfig(options, { url: URL_CITY_LIST, data: requestParam }, 'getCityList'));} }, { key: "getDistrictByCityId", value: function getDistrictByCityId(options) {var that = this;options = options || {};Utils.polyfillParam(options);if (Utils.checkParamKeyEmpty(options, 'id')) {return;}var requestParam = { id: options.id || '', output: 'json', key: that.key };if (options.sig) {requestParam.sig = Utils.getSig(requestParam, options.sig, 'getDistrictByCityId');}wx.request(Utils.buildWxRequestConfig(options, { url: URL_AREA_LIST, data: requestParam }, 'getDistrictByCityId'));} }, { key: "calculateDistance", value: function calculateDistance(options) {var that = this;options = options || {};Utils.polyfillParam(options);if (Utils.checkParamKeyEmpty(options, 'to')) {return;}var requestParam = { mode: options.mode || 'walking', to: Utils.location2query(options.to), output: 'json', key: that.key };if (options.from) {options.location = options.from;}if (requestParam.mode == 'straight') {var locationsuccess = function locationsuccess(result) {var locationTo = Utils.getEndLocation(requestParam.to);var data = { message: "query ok", result: { elements: [] }, status: 0 };for (var i = 0; i < locationTo.length; i++) {data.result.elements.push({ distance: Utils.getDistance(result.latitude, result.longitude, locationTo[i].lat, locationTo[i].lng), duration: 0, from: { lat: result.latitude, lng: result.longitude }, to: { lat: locationTo[i].lat, lng: locationTo[i].lng } });}var calculateResult = data.result.elements;var distanceResult = [];for (var i = 0; i < calculateResult.length; i++) {distanceResult.push(calculateResult[i].distance);}return options.success(data, { calculateResult: calculateResult, distanceResult: distanceResult });};Utils.locationProcess(options, locationsuccess);} else {var locationsuccess = function locationsuccess(result) {requestParam.from = result.latitude + ',' + result.longitude;if (options.sig) {requestParam.sig = Utils.getSig(requestParam, options.sig, 'calculateDistance');}wx.request(Utils.buildWxRequestConfig(options, { url: URL_DISTANCE, data: requestParam }, 'calculateDistance'));};Utils.locationProcess(options, locationsuccess);}} }, { key: "direction", value: function direction(options) {var that = this;options = options || {};Utils.polyfillParam(options);if (Utils.checkParamKeyEmpty(options, 'to')) {return;}var requestParam = { output: 'json', key: that.key };if (typeof options.to == 'string') {requestParam.to = options.to;} else {requestParam.to = options.to.latitude + ',' + options.to.longitude;}var SET_URL_DIRECTION = null;options.mode = options.mode || MODE.driving;SET_URL_DIRECTION = URL_DIRECTION + options.mode;if (options.from) {options.location = options.from;}if (options.mode == MODE.driving) {if (options.from_poi) {requestParam.from_poi = options.from_poi;}if (options.heading) {requestParam.heading = options.heading;}if (options.speed) {requestParam.speed = options.speed;}if (options.accuracy) {requestParam.accuracy = options.accuracy;}if (options.road_type) {requestParam.road_type = options.road_type;}if (options.to_poi) {requestParam.to_poi = options.to_poi;}if (options.from_track) {requestParam.from_track = options.from_track;}if (options.waypoints) {requestParam.waypoints = options.waypoints;}if (options.policy) {requestParam.policy = options.policy;}if (options.plate_number) {requestParam.plate_number = options.plate_number;}}if (options.mode == MODE.transit) {if (options.departure_time) {requestParam.departure_time = options.departure_time;}if (options.policy) {requestParam.policy = options.policy;}}var locationsuccess = function locationsuccess(result) {requestParam.from = result.latitude + ',' + result.longitude;if (options.sig) {requestParam.sig = Utils.getSig(requestParam, options.sig, 'direction', options.mode);}wx.request(Utils.buildWxRequestConfig(options, { url: SET_URL_DIRECTION, data: requestParam }, 'direction'));};Utils.locationProcess(options, locationsuccess);} }]);return QQMapWX;}();;module.exports = QQMapWX;

/***/ }),

/***/ 27:
/*!********************************************************!*\
  !*** D:/UAD/Jdt-zhcx/common/scenicSpotDistribution.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; //景区分类
var cateList = [
//一级分类
{
  id: 1,
  name: '武夷山市' },

//二级分类
//武夷山市
{
  id: 2,
  pid: 1,
  name: '溪源峡谷景区' },

{
  id: 3,
  pid: 1,
  name: '华阳山景区' },

{
  id: 4,
  pid: 1,
  name: '天成奇峡景区' },

{
  id: 5,
  pid: 1,
  name: '云灵山景区' },

{
  id: 6,
  pid: 1,
  name: '三千八百坎景区' },

{
  id: 7,
  pid: 1,
  name: '武夷花花世界' }

// {
// 	id: 1,
// 	name: '武夷山市'
// }, 
// {
// 	id: 2,
// 	name: '延平区'
// },
// {
// 	id: 3,
// 	name: '顺昌县'
// },
// {
// 	id: 4,
// 	name: '浦城县'
// },
// {
// 	id: 5,
// 	name: '光泽县'
// },
// {
// 	id: 6,
// 	name: '松溪县'
// },
// {
// 	id: 7,
// 	name: '政和县'
// },
// {
// 	id: 8,
// 	name: '邵武市'
// },
// {
// 	id: 9,
// 	name: '建瓯市'
// },
// {
// 	id: 10,
// 	name: '建阳区'
// },
// //二级分类
// 	//武夷山市
// {
// 	id: 5,
// 	pid: 1,
// 	name: '武夷山风景名胜区'
// },
// {
// 	id: 6,
// 	pid: 1,
// 	name: '大安源'
// },
// {
// 	id: 8,
// 	pid: 1,
// 	name: '茶博园',
// },
// {
// 	id: 9,
// 	pid: 1,
// 	name: '自遊小镇',
// },
// {
// 	id: 10,
// 	pid: 1,
// 	name: '香江茗苑',
// },
// {
// 	id: 11,
// 	pid: 1,
// 	name: '青龙大瀑布',
// },
// {
// 	id: 12,
// 	pid: 1,
// 	name: '天上宫',
// },
// {
// 	id: 14,
// 	pid: 1,
// 	name: '武夷精舍',
// },
// {
// 	id: 15,
// 	pid: 1,
// 	name: '武夷源',
// },
// {
// 	id: 16,
// 	pid: 1,
// 	name: '五夫古镇',
// },
// {
// 	id: 17,
// 	pid: 1,
// 	name: '柳永纪念馆',
// },
// {
// 	id: 18,
// 	pid: 1,
// 	name: '列宁公园',
// },
// {
// 	id: 19,
// 	pid: 1,
// 	name: '龙川大峡谷',
// },
// {
// 	id: 20,
// 	pid: 1,
// 	name: '慧苑禅寺',
// },
// {
// 	id: 21,
// 	pid: 1,
// 	name: '山下梅村',
// },
// 	//延平区
// {
// 	id: 22,
// 	pid: 2,
// 	name: '溪源峡谷',
// },
// {
// 	id: 23,
// 	pid: 2,
// 	name: '三千八百坎',
// },
// {
// 	id: 24,
// 	pid: 2,
// 	name: '杉湖岛度假区',
// },
// {
// 	id: 25,
// 	pid: 2,
// 	name: '九峰山公园',
// },
// {
// 	id: 26,
// 	pid: 2,
// 	name: '峡阳古镇',
// },
// {
// 	id: 27,
// 	pid: 2,
// 	name: '茫荡山',
// },
// {
// 	id: 28,
// 	pid: 2,
// 	name: '明翠阁',
// },
// 	//顺昌县
// {
// 	id: 29,
// 	pid: 3,
// 	name: '华阳山',
// },
// {
// 	id: 30,
// 	pid: 3,
// 	name: '宝山',
// },
// {
// 	id: 31,
// 	pid: 3,
// 	name: '张墩乡村',
// },
// {
// 	id: 32,
// 	pid: 3,
// 	name: '高老庄摄影基地',
// },
// {
// 	id: 33,
// 	pid: 3,
// 	name: '元坑古镇',
// },
// 	//浦城县
// {
// 	id: 34,
// 	pid: 4,
// 	name: '中国包酒文化博览园',
// },
// 	//光泽县
// {
// 	id: 35,
// 	pid: 5,
// 	name: '乌君山',
// },
// 	//松溪县
// {
// 	id: 39,
// 	pid: 6,
// 	name: '湛卢山',
// },
// 	//政和县
// {
// 	id: 36,
// 	pid: 7,
// 	name: '佛子山',
// },
// {
// 	id: 37,
// 	pid: 7,
// 	name: '凤头楠木林',
// },
// {
// 	id: 39,
// 	pid: 7,
// 	name: '石圳村',
// },
// {
// 	id: 42,
// 	pid: 7,
// 	name: '洋后厝桥',
// },
// {
// 	id: 43,
// 	pid: 7,
// 	name: '后山廊桥',
// },
// {
// 	id: 44,
// 	pid: 7,
// 	name: '云根书院',
// },
// {
// 	id: 45,
// 	pid: 7,
// 	name: '洞宫山',
// },
// 	//邵武市 
// {
// 	id: 46,
// 	pid: 8,
// 	name: '和平古镇',
// },
// {
// 	id: 47,
// 	pid: 8,
// 	name: '天成奇峡',
// },
// {
// 	id: 48,
// 	pid: 8,
// 	name: '瀑布林生态',
// },{
// 	id: 49,
// 	pid: 8,
// 	name: '云灵山',
// },
// {
// 	id: 50,
// 	pid: 8,
// 	name: '温泉度假区',
// },
// {
// 	id: 51,
// 	pid: 8,
// 	name: '熙春园',
// },
// {
// 	id: 52,
// 	pid: 8,
// 	name: '小隐竹源',
// },
// {
// 	id: 53,
// 	pid: 8,
// 	name: '中央苏区纪念馆',
// },
// {
// 	id: 54,
// 	pid: 8,
// 	name: '李忠定公祠',
// },
// {
// 	id: 55,
// 	pid: 8,
// 	name: '宝严寺',
// },
// {
// 	id: 56,
// 	pid: 8,
// 	name: '民俗馆',
// },
// {
// 	id: 57,
// 	pid: 8,
// 	name: '华严寺',
// },
// {
// 	id: 58,
// 	pid: 8,
// 	name: '清真寺',
// },
// 	//建瓯市
// {
// 	id: 59,
// 	pid: 9,
// 	name: '鼓楼',
// },
// {
// 	id: 60,
// 	pid: 9,
// 	name: '归宗岩',
// },
// {
// 	id: 61,
// 	pid: 9,
// 	name: '东岳庙',
// },
// 	//建阳区
// {
// 	id: 62,
// 	pid: 10,
// 	name: '花花世界',
// },
// {
// 	id: 63,
// 	pid: 10,
// 	name: '黄坑',
// },
// {
// 	id: 64,
// 	pid: 10,
// 	name: '考亭书院',
// },
];var _default =

{
  cateList: cateList };exports.default = _default;

/***/ }),

/***/ 3:
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ 4:
/*!**********************************!*\
  !*** D:/UAD/Jdt-zhcx/pages.json ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ 5:
/*!*******************************************************!*\
  !*** ./node_modules/@dcloudio/uni-stat/dist/index.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {var _package = __webpack_require__(/*! ../package.json */ 6);function _createSuper(Derived) {return function () {var Super = _getPrototypeOf(Derived),result;if (_isNativeReflectConstruct()) {var NewTarget = _getPrototypeOf(this).constructor;result = Reflect.construct(Super, arguments, NewTarget);} else {result = Super.apply(this, arguments);}return _possibleConstructorReturn(this, result);};}function _possibleConstructorReturn(self, call) {if (call && (typeof call === "object" || typeof call === "function")) {return call;}return _assertThisInitialized(self);}function _assertThisInitialized(self) {if (self === void 0) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return self;}function _isNativeReflectConstruct() {if (typeof Reflect === "undefined" || !Reflect.construct) return false;if (Reflect.construct.sham) return false;if (typeof Proxy === "function") return true;try {Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));return true;} catch (e) {return false;}}function _getPrototypeOf(o) {_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {return o.__proto__ || Object.getPrototypeOf(o);};return _getPrototypeOf(o);}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function");}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });if (superClass) _setPrototypeOf(subClass, superClass);}function _setPrototypeOf(o, p) {_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {o.__proto__ = p;return o;};return _setPrototypeOf(o, p);}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}

var STAT_VERSION = _package.version;
var STAT_URL = 'https://tongji.dcloud.io/uni/stat';
var STAT_H5_URL = 'https://tongji.dcloud.io/uni/stat.gif';
var PAGE_PVER_TIME = 1800;
var APP_PVER_TIME = 300;
var OPERATING_TIME = 10;

var UUID_KEY = '__DC_STAT_UUID';
var UUID_VALUE = '__DC_UUID_VALUE';

function getUuid() {
  var uuid = '';
  if (getPlatformName() === 'n') {
    try {
      uuid = plus.runtime.getDCloudId();
    } catch (e) {
      uuid = '';
    }
    return uuid;
  }

  try {
    uuid = uni.getStorageSync(UUID_KEY);
  } catch (e) {
    uuid = UUID_VALUE;
  }

  if (!uuid) {
    uuid = Date.now() + '' + Math.floor(Math.random() * 1e7);
    try {
      uni.setStorageSync(UUID_KEY, uuid);
    } catch (e) {
      uni.setStorageSync(UUID_KEY, UUID_VALUE);
    }
  }
  return uuid;
}

var getSgin = function getSgin(statData) {
  var arr = Object.keys(statData);
  var sortArr = arr.sort();
  var sgin = {};
  var sginStr = '';
  for (var i in sortArr) {
    sgin[sortArr[i]] = statData[sortArr[i]];
    sginStr += sortArr[i] + '=' + statData[sortArr[i]] + '&';
  }
  // const options = sginStr.substr(0, sginStr.length - 1)
  // sginStr = sginStr.substr(0, sginStr.length - 1) + '&key=' + STAT_KEY;
  // const si = crypto.createHash('md5').update(sginStr).digest('hex');
  return {
    sign: '',
    options: sginStr.substr(0, sginStr.length - 1) };

};

var getSplicing = function getSplicing(data) {
  var str = '';
  for (var i in data) {
    str += i + '=' + data[i] + '&';
  }
  return str.substr(0, str.length - 1);
};

var getTime = function getTime() {
  return parseInt(new Date().getTime() / 1000);
};

var getPlatformName = function getPlatformName() {
  var platformList = {
    'app-plus': 'n',
    'h5': 'h5',
    'mp-weixin': 'wx',
    'mp-alipay': 'ali',
    'mp-baidu': 'bd',
    'mp-toutiao': 'tt',
    'mp-qq': 'qq' };

  return platformList["mp-weixin"];
};

var getPackName = function getPackName() {
  var packName = '';
  if (getPlatformName() === 'wx' || getPlatformName() === 'qq') {
    // 兼容微信小程序低版本基础库
    if (uni.canIUse('getAccountInfoSync')) {
      packName = uni.getAccountInfoSync().miniProgram.appId || '';
    }
  }
  return packName;
};

var getVersion = function getVersion() {
  return getPlatformName() === 'n' ? plus.runtime.version : '';
};

var getChannel = function getChannel() {
  var platformName = getPlatformName();
  var channel = '';
  if (platformName === 'n') {
    channel = plus.runtime.channel;
  }
  return channel;
};

var getScene = function getScene(options) {
  var platformName = getPlatformName();
  var scene = '';
  if (options) {
    return options;
  }
  if (platformName === 'wx') {
    scene = uni.getLaunchOptionsSync().scene;
  }
  return scene;
};
var First__Visit__Time__KEY = 'First__Visit__Time';
var Last__Visit__Time__KEY = 'Last__Visit__Time';

var getFirstVisitTime = function getFirstVisitTime() {
  var timeStorge = uni.getStorageSync(First__Visit__Time__KEY);
  var time = 0;
  if (timeStorge) {
    time = timeStorge;
  } else {
    time = getTime();
    uni.setStorageSync(First__Visit__Time__KEY, time);
    uni.removeStorageSync(Last__Visit__Time__KEY);
  }
  return time;
};

var getLastVisitTime = function getLastVisitTime() {
  var timeStorge = uni.getStorageSync(Last__Visit__Time__KEY);
  var time = 0;
  if (timeStorge) {
    time = timeStorge;
  } else {
    time = '';
  }
  uni.setStorageSync(Last__Visit__Time__KEY, getTime());
  return time;
};


var PAGE_RESIDENCE_TIME = '__page__residence__time';
var First_Page_residence_time = 0;
var Last_Page_residence_time = 0;


var setPageResidenceTime = function setPageResidenceTime() {
  First_Page_residence_time = getTime();
  if (getPlatformName() === 'n') {
    uni.setStorageSync(PAGE_RESIDENCE_TIME, getTime());
  }
  return First_Page_residence_time;
};

var getPageResidenceTime = function getPageResidenceTime() {
  Last_Page_residence_time = getTime();
  if (getPlatformName() === 'n') {
    First_Page_residence_time = uni.getStorageSync(PAGE_RESIDENCE_TIME);
  }
  return Last_Page_residence_time - First_Page_residence_time;
};
var TOTAL__VISIT__COUNT = 'Total__Visit__Count';
var getTotalVisitCount = function getTotalVisitCount() {
  var timeStorge = uni.getStorageSync(TOTAL__VISIT__COUNT);
  var count = 1;
  if (timeStorge) {
    count = timeStorge;
    count++;
  }
  uni.setStorageSync(TOTAL__VISIT__COUNT, count);
  return count;
};

var GetEncodeURIComponentOptions = function GetEncodeURIComponentOptions(statData) {
  var data = {};
  for (var prop in statData) {
    data[prop] = encodeURIComponent(statData[prop]);
  }
  return data;
};

var Set__First__Time = 0;
var Set__Last__Time = 0;

var getFirstTime = function getFirstTime() {
  var time = new Date().getTime();
  Set__First__Time = time;
  Set__Last__Time = 0;
  return time;
};


var getLastTime = function getLastTime() {
  var time = new Date().getTime();
  Set__Last__Time = time;
  return time;
};


var getResidenceTime = function getResidenceTime(type) {
  var residenceTime = 0;
  if (Set__First__Time !== 0) {
    residenceTime = Set__Last__Time - Set__First__Time;
  }

  residenceTime = parseInt(residenceTime / 1000);
  residenceTime = residenceTime < 1 ? 1 : residenceTime;
  if (type === 'app') {
    var overtime = residenceTime > APP_PVER_TIME ? true : false;
    return {
      residenceTime: residenceTime,
      overtime: overtime };

  }
  if (type === 'page') {
    var _overtime = residenceTime > PAGE_PVER_TIME ? true : false;
    return {
      residenceTime: residenceTime,
      overtime: _overtime };

  }

  return {
    residenceTime: residenceTime };


};

var getRoute = function getRoute() {
  var pages = getCurrentPages();
  var page = pages[pages.length - 1];
  var _self = page.$vm;

  if (getPlatformName() === 'bd') {
    return _self.$mp && _self.$mp.page.is;
  } else {
    return _self.$scope && _self.$scope.route || _self.$mp && _self.$mp.page.route;
  }
};

var getPageRoute = function getPageRoute(self) {
  var pages = getCurrentPages();
  var page = pages[pages.length - 1];
  var _self = page.$vm;
  var query = self._query;
  var str = query && JSON.stringify(query) !== '{}' ? '?' + JSON.stringify(query) : '';
  // clear
  self._query = '';
  if (getPlatformName() === 'bd') {
    return _self.$mp && _self.$mp.page.is + str;
  } else {
    return _self.$scope && _self.$scope.route + str || _self.$mp && _self.$mp.page.route + str;
  }
};

var getPageTypes = function getPageTypes(self) {
  if (self.mpType === 'page' || self.$mp && self.$mp.mpType === 'page' || self.$options.mpType === 'page') {
    return true;
  }
  return false;
};

var calibration = function calibration(eventName, options) {
  //  login 、 share 、pay_success 、pay_fail 、register 、title
  if (!eventName) {
    console.error("uni.report \u7F3A\u5C11 [eventName] \u53C2\u6570");
    return true;
  }
  if (typeof eventName !== 'string') {
    console.error("uni.report [eventName] \u53C2\u6570\u7C7B\u578B\u9519\u8BEF,\u53EA\u80FD\u4E3A String \u7C7B\u578B");
    return true;
  }
  if (eventName.length > 255) {
    console.error("uni.report [eventName] \u53C2\u6570\u957F\u5EA6\u4E0D\u80FD\u5927\u4E8E 255");
    return true;
  }

  if (typeof options !== 'string' && typeof options !== 'object') {
    console.error("uni.report [options] \u53C2\u6570\u7C7B\u578B\u9519\u8BEF,\u53EA\u80FD\u4E3A String \u6216 Object \u7C7B\u578B");
    return true;
  }

  if (typeof options === 'string' && options.length > 255) {
    console.error("uni.report [options] \u53C2\u6570\u957F\u5EA6\u4E0D\u80FD\u5927\u4E8E 255");
    return true;
  }

  if (eventName === 'title' && typeof options !== 'string') {
    console.error('uni.report [eventName] 参数为 title 时，[options] 参数只能为 String 类型');
    return true;
  }
};

var PagesJson = __webpack_require__(/*! uni-pages?{"type":"style"} */ 7).default;
var statConfig = __webpack_require__(/*! uni-stat-config */ 8).default || __webpack_require__(/*! uni-stat-config */ 8);

var resultOptions = uni.getSystemInfoSync();var

Util = /*#__PURE__*/function () {
  function Util() {_classCallCheck(this, Util);
    this.self = '';
    this._retry = 0;
    this._platform = '';
    this._query = {};
    this._navigationBarTitle = {
      config: '',
      page: '',
      report: '',
      lt: '' };

    this._operatingTime = 0;
    this._reportingRequestData = {
      '1': [],
      '11': [] };

    this.__prevent_triggering = false;

    this.__licationHide = false;
    this.__licationShow = false;
    this._lastPageRoute = '';
    this.statData = {
      uuid: getUuid(),
      ut: getPlatformName(),
      mpn: getPackName(),
      ak: statConfig.appid,
      usv: STAT_VERSION,
      v: getVersion(),
      ch: getChannel(),
      cn: '',
      pn: '',
      ct: '',
      t: getTime(),
      tt: '',
      p: resultOptions.platform === 'android' ? 'a' : 'i',
      brand: resultOptions.brand || '',
      md: resultOptions.model,
      sv: resultOptions.system.replace(/(Android|iOS)\s/, ''),
      mpsdk: resultOptions.SDKVersion || '',
      mpv: resultOptions.version || '',
      lang: resultOptions.language,
      pr: resultOptions.pixelRatio,
      ww: resultOptions.windowWidth,
      wh: resultOptions.windowHeight,
      sw: resultOptions.screenWidth,
      sh: resultOptions.screenHeight };


  }_createClass(Util, [{ key: "_applicationShow", value: function _applicationShow()

    {
      if (this.__licationHide) {
        getLastTime();
        var time = getResidenceTime('app');
        if (time.overtime) {
          var options = {
            path: this._lastPageRoute,
            scene: this.statData.sc };

          this._sendReportRequest(options);
        }
        this.__licationHide = false;
      }
    } }, { key: "_applicationHide", value: function _applicationHide(

    self, type) {

      this.__licationHide = true;
      getLastTime();
      var time = getResidenceTime();
      getFirstTime();
      var route = getPageRoute(this);
      this._sendHideRequest({
        urlref: route,
        urlref_ts: time.residenceTime },
      type);
    } }, { key: "_pageShow", value: function _pageShow()

    {
      var route = getPageRoute(this);
      var routepath = getRoute();
      this._navigationBarTitle.config = PagesJson &&
      PagesJson.pages[routepath] &&
      PagesJson.pages[routepath].titleNView &&
      PagesJson.pages[routepath].titleNView.titleText ||
      PagesJson &&
      PagesJson.pages[routepath] &&
      PagesJson.pages[routepath].navigationBarTitleText || '';

      if (this.__licationShow) {
        getFirstTime();
        this.__licationShow = false;
        // console.log('这是 onLauch 之后执行的第一次 pageShow ，为下次记录时间做准备');
        this._lastPageRoute = route;
        return;
      }

      getLastTime();
      this._lastPageRoute = route;
      var time = getResidenceTime('page');
      if (time.overtime) {
        var options = {
          path: this._lastPageRoute,
          scene: this.statData.sc };

        this._sendReportRequest(options);
      }
      getFirstTime();
    } }, { key: "_pageHide", value: function _pageHide()

    {
      if (!this.__licationHide) {
        getLastTime();
        var time = getResidenceTime('page');
        this._sendPageRequest({
          url: this._lastPageRoute,
          urlref: this._lastPageRoute,
          urlref_ts: time.residenceTime });

        this._navigationBarTitle = {
          config: '',
          page: '',
          report: '',
          lt: '' };

        return;
      }
    } }, { key: "_login", value: function _login()

    {
      this._sendEventRequest({
        key: 'login' },
      0);
    } }, { key: "_share", value: function _share()

    {
      this._sendEventRequest({
        key: 'share' },
      0);
    } }, { key: "_payment", value: function _payment(
    key) {
      this._sendEventRequest({
        key: key },
      0);
    } }, { key: "_sendReportRequest", value: function _sendReportRequest(
    options) {

      this._navigationBarTitle.lt = '1';
      var query = options.query && JSON.stringify(options.query) !== '{}' ? '?' + JSON.stringify(options.query) : '';
      this.statData.lt = '1';
      this.statData.url = options.path + query || '';
      this.statData.t = getTime();
      this.statData.sc = getScene(options.scene);
      this.statData.fvts = getFirstVisitTime();
      this.statData.lvts = getLastVisitTime();
      this.statData.tvc = getTotalVisitCount();
      if (getPlatformName() === 'n') {
        this.getProperty();
      } else {
        this.getNetworkInfo();
      }
    } }, { key: "_sendPageRequest", value: function _sendPageRequest(

    opt) {var

      url =


      opt.url,urlref = opt.urlref,urlref_ts = opt.urlref_ts;
      this._navigationBarTitle.lt = '11';
      var options = {
        ak: this.statData.ak,
        uuid: this.statData.uuid,
        lt: '11',
        ut: this.statData.ut,
        url: url,
        tt: this.statData.tt,
        urlref: urlref,
        urlref_ts: urlref_ts,
        ch: this.statData.ch,
        usv: this.statData.usv,
        t: getTime(),
        p: this.statData.p };

      this.request(options);
    } }, { key: "_sendHideRequest", value: function _sendHideRequest(

    opt, type) {var

      urlref =

      opt.urlref,urlref_ts = opt.urlref_ts;
      var options = {
        ak: this.statData.ak,
        uuid: this.statData.uuid,
        lt: '3',
        ut: this.statData.ut,
        urlref: urlref,
        urlref_ts: urlref_ts,
        ch: this.statData.ch,
        usv: this.statData.usv,
        t: getTime(),
        p: this.statData.p };

      this.request(options, type);
    } }, { key: "_sendEventRequest", value: function _sendEventRequest()



    {var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},_ref$key = _ref.key,key = _ref$key === void 0 ? '' : _ref$key,_ref$value = _ref.value,value = _ref$value === void 0 ? "" : _ref$value;
      var route = this._lastPageRoute;
      var options = {
        ak: this.statData.ak,
        uuid: this.statData.uuid,
        lt: '21',
        ut: this.statData.ut,
        url: route,
        ch: this.statData.ch,
        e_n: key,
        e_v: typeof value === 'object' ? JSON.stringify(value) : value.toString(),
        usv: this.statData.usv,
        t: getTime(),
        p: this.statData.p };

      this.request(options);
    } }, { key: "getNetworkInfo", value: function getNetworkInfo()

    {var _this = this;
      uni.getNetworkType({
        success: function success(result) {
          _this.statData.net = result.networkType;
          _this.getLocation();
        } });

    } }, { key: "getProperty", value: function getProperty()

    {var _this2 = this;
      plus.runtime.getProperty(plus.runtime.appid, function (wgtinfo) {
        _this2.statData.v = wgtinfo.version || '';
        _this2.getNetworkInfo();
      });
    } }, { key: "getLocation", value: function getLocation()

    {var _this3 = this;
      if (statConfig.getLocation) {
        uni.getLocation({
          type: 'wgs84',
          geocode: true,
          success: function success(result) {
            if (result.address) {
              _this3.statData.cn = result.address.country;
              _this3.statData.pn = result.address.province;
              _this3.statData.ct = result.address.city;
            }

            _this3.statData.lat = result.latitude;
            _this3.statData.lng = result.longitude;
            _this3.request(_this3.statData);
          } });

      } else {
        this.statData.lat = 0;
        this.statData.lng = 0;
        this.request(this.statData);
      }
    } }, { key: "request", value: function request(

    data, type) {var _this4 = this;
      var time = getTime();
      var title = this._navigationBarTitle;
      data.ttn = title.page;
      data.ttpj = title.config;
      data.ttc = title.report;

      var requestData = this._reportingRequestData;
      if (getPlatformName() === 'n') {
        requestData = uni.getStorageSync('__UNI__STAT__DATA') || {};
      }
      if (!requestData[data.lt]) {
        requestData[data.lt] = [];
      }
      requestData[data.lt].push(data);

      if (getPlatformName() === 'n') {
        uni.setStorageSync('__UNI__STAT__DATA', requestData);
      }
      if (getPageResidenceTime() < OPERATING_TIME && !type) {
        return;
      }
      var uniStatData = this._reportingRequestData;
      if (getPlatformName() === 'n') {
        uniStatData = uni.getStorageSync('__UNI__STAT__DATA');
      }
      // 时间超过，重新获取时间戳
      setPageResidenceTime();
      var firstArr = [];
      var contentArr = [];
      var lastArr = [];var _loop = function _loop(

      i) {
        var rd = uniStatData[i];
        rd.forEach(function (elm) {
          var newData = getSplicing(elm);
          if (i === 0) {
            firstArr.push(newData);
          } else if (i === 3) {
            lastArr.push(newData);
          } else {
            contentArr.push(newData);
          }
        });};for (var i in uniStatData) {_loop(i);
      }

      firstArr.push.apply(firstArr, contentArr.concat(lastArr));
      var optionsData = {
        usv: STAT_VERSION, //统计 SDK 版本号
        t: time, //发送请求时的时间戮
        requests: JSON.stringify(firstArr) };


      this._reportingRequestData = {};
      if (getPlatformName() === 'n') {
        uni.removeStorageSync('__UNI__STAT__DATA');
      }

      if (data.ut === 'h5') {
        this.imageRequest(optionsData);
        return;
      }

      if (getPlatformName() === 'n' && this.statData.p === 'a') {
        setTimeout(function () {
          _this4._sendRequest(optionsData);
        }, 200);
        return;
      }
      this._sendRequest(optionsData);
    } }, { key: "_sendRequest", value: function _sendRequest(
    optionsData) {var _this5 = this;
      uni.request({
        url: STAT_URL,
        method: 'POST',
        // header: {
        //   'content-type': 'application/json' // 默认值
        // },
        data: optionsData,
        success: function success() {
          // if (process.env.NODE_ENV === 'development') {
          //   console.log('stat request success');
          // }
        },
        fail: function fail(e) {
          if (++_this5._retry < 3) {
            setTimeout(function () {
              _this5._sendRequest(optionsData);
            }, 1000);
          }
        } });

    }
    /**
       * h5 请求
       */ }, { key: "imageRequest", value: function imageRequest(
    data) {
      var image = new Image();
      var options = getSgin(GetEncodeURIComponentOptions(data)).options;
      image.src = STAT_H5_URL + '?' + options;
    } }, { key: "sendEvent", value: function sendEvent(

    key, value) {
      // 校验 type 参数
      if (calibration(key, value)) return;

      if (key === 'title') {
        this._navigationBarTitle.report = value;
        return;
      }
      this._sendEventRequest({
        key: key,
        value: typeof value === 'object' ? JSON.stringify(value) : value },
      1);
    } }]);return Util;}();var



Stat = /*#__PURE__*/function (_Util) {_inherits(Stat, _Util);var _super = _createSuper(Stat);_createClass(Stat, null, [{ key: "getInstance", value: function getInstance()
    {
      if (!this.instance) {
        this.instance = new Stat();
      }
      return this.instance;
    } }]);
  function Stat() {var _this6;_classCallCheck(this, Stat);
    _this6 = _super.call(this);
    _this6.instance = null;
    // 注册拦截器
    if (typeof uni.addInterceptor === 'function' && "development" !== 'development') {
      _this6.addInterceptorInit();
      _this6.interceptLogin();
      _this6.interceptShare(true);
      _this6.interceptRequestPayment();
    }return _this6;
  }_createClass(Stat, [{ key: "addInterceptorInit", value: function addInterceptorInit()

    {
      var self = this;
      uni.addInterceptor('setNavigationBarTitle', {
        invoke: function invoke(args) {
          self._navigationBarTitle.page = args.title;
        } });

    } }, { key: "interceptLogin", value: function interceptLogin()

    {
      var self = this;
      uni.addInterceptor('login', {
        complete: function complete() {
          self._login();
        } });

    } }, { key: "interceptShare", value: function interceptShare(

    type) {
      var self = this;
      if (!type) {
        self._share();
        return;
      }
      uni.addInterceptor('share', {
        success: function success() {
          self._share();
        },
        fail: function fail() {
          self._share();
        } });

    } }, { key: "interceptRequestPayment", value: function interceptRequestPayment()

    {
      var self = this;
      uni.addInterceptor('requestPayment', {
        success: function success() {
          self._payment('pay_success');
        },
        fail: function fail() {
          self._payment('pay_fail');
        } });

    } }, { key: "report", value: function report(

    options, self) {
      this.self = self;
      // if (process.env.NODE_ENV === 'development') {
      //   console.log('report init');
      // }
      setPageResidenceTime();
      this.__licationShow = true;
      this._sendReportRequest(options, true);
    } }, { key: "load", value: function load(

    options, self) {
      if (!self.$scope && !self.$mp) {
        var page = getCurrentPages();
        self.$scope = page[page.length - 1];
      }
      this.self = self;
      this._query = options;
    } }, { key: "show", value: function show(

    self) {
      this.self = self;
      if (getPageTypes(self)) {
        this._pageShow(self);
      } else {
        this._applicationShow(self);
      }
    } }, { key: "ready", value: function ready(

    self) {
      // this.self = self;
      // if (getPageTypes(self)) {
      //   this._pageShow(self);
      // }
    } }, { key: "hide", value: function hide(
    self) {
      this.self = self;
      if (getPageTypes(self)) {
        this._pageHide(self);
      } else {
        this._applicationHide(self, true);
      }
    } }, { key: "error", value: function error(
    em) {
      if (this._platform === 'devtools') {
        if (true) {
          console.info('当前运行环境为开发者工具，不上报数据。');
        }
        // return;
      }
      var emVal = '';
      if (!em.message) {
        emVal = JSON.stringify(em);
      } else {
        emVal = em.stack;
      }
      var options = {
        ak: this.statData.ak,
        uuid: this.statData.uuid,
        lt: '31',
        ut: this.statData.ut,
        ch: this.statData.ch,
        mpsdk: this.statData.mpsdk,
        mpv: this.statData.mpv,
        v: this.statData.v,
        em: emVal,
        usv: this.statData.usv,
        t: getTime(),
        p: this.statData.p };

      this.request(options);
    } }]);return Stat;}(Util);


var stat = Stat.getInstance();
var isHide = false;
var lifecycle = {
  onLaunch: function onLaunch(options) {
    stat.report(options, this);
  },
  onReady: function onReady() {
    stat.ready(this);
  },
  onLoad: function onLoad(options) {
    stat.load(options, this);
    // 重写分享，获取分享上报事件
    if (this.$scope && this.$scope.onShareAppMessage) {
      var oldShareAppMessage = this.$scope.onShareAppMessage;
      this.$scope.onShareAppMessage = function (options) {
        stat.interceptShare(false);
        return oldShareAppMessage.call(this, options);
      };
    }
  },
  onShow: function onShow() {
    isHide = false;
    stat.show(this);
  },
  onHide: function onHide() {
    isHide = true;
    stat.hide(this);
  },
  onUnload: function onUnload() {
    if (isHide) {
      isHide = false;
      return;
    }
    stat.hide(this);
  },
  onError: function onError(e) {
    stat.error(e);
  } };


function main() {
  if (true) {
    uni.report = function (type, options) {};
  } else { var Vue; }
}

main();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 56:
/*!********************************************!*\
  !*** D:/UAD/Jdt-zhcx/common/Czcprivate.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _Interface;function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;} /* 专线出租车 */
/* 接口参数区 */
// 示例

//接口域名
var Url = 'http://111.231.109.113:8004';
var Url1 = "http://111.231.109.113:8002";
//接口对象
var Interface = (_Interface = {
  //GET-POST
  GetSpecialLine: {
    value: Url + '/api/SpecialLine/GetSpecialLine_Passenger',
    name: '旅客端-获取专线车线路信息',
    method: 'GET',
    pages: ["Home/ChooseSite.nvue"] },

  GetSpecialLineByLineID: {
    value: Url + '/api/SpecialLine/GetSpecialLineByLineID_Passenger',
    name: '旅客端-根据线路ID获取线路信息',
    method: 'POST',
    pages: ["CZC/PrivateTaxiPayment.vue"] },

  AddSpecialLineOrder_Passenger: {
    value: Url + '/api/SpecialLine/AddSpecialLineOrder_Passenger',
    name: '旅客端-添加订单',
    method: 'POST',
    pages: ["CZC/PrivateTaxi.nvue"] },

  CancelSpecialLineOrder_Passenger: {
    value: Url + '/api/SpecialLine/CancelSpecialLineOrder_Passenger',
    name: '旅客端-取消订单',
    method: 'POST',
    pages: ["CZC/PrivateTaxi.nvue"] },

  getCommonPayparameter: {
    value: Url1 + '/api/Pay/getCommonPayparameter',
    name: '旅客端-获取支付信息',
    method: 'POST',
    pages: ["CZC/PrivateTaxiPayment.vue"] },

  BouncePay: {
    value: Url1 + '/api/Pay/BouncePay',
    name: '旅客端-退款',
    method: 'POST',
    pages: ["CZC/PrivateTaxi.nvue"] },

  CheckPayState: {
    value: Url1 + '/api/Pay/CheckPayState',
    name: '旅客端-检测支付是否成功',
    method: 'POST',
    pages: ["CZC/PrivateTaxi.nvue"] },

  SpecialLineOrderPay_Passenger: {
    value: Url1 + '/api/ly/SpecialLineOrderPay_Passenger',
    name: '旅客端-订单支付完成',
    method: 'POST',
    pages: ["CZC/PrivateTaxiPayment.vue"] },

  QuerySpecialLineOrderByUserID_Passenger: {
    value: Url + '/api/SpecialLine/QuerySpecialLineOrderByUserID_Passenger',
    name: '旅客端-根据用户ID查询订单',
    method: 'POST',
    pages: ["CZC/PrivateTaxi.nvue"] },

  QuerySpecialLineOrder_Passenger: {
    value: Url + '/api/SpecialLine/QuerySpecialLineOrder_Passenger',
    name: '旅客端-根据订单ID查询订单',
    method: 'POST',
    pages: ["CZC/WaitTakeOrder.nvue", "CZC/SpecialLineDetail.nvue"] } }, _defineProperty(_Interface, "SpecialLineOrderPay_Passenger",

{
  value: Url + '/api/SpecialLine/SpecialLineOrderPay_Passenger',
  name: '旅客端-支付完成',
  method: 'POST',
  pages: ["CZC/PrivateTaxi.nvue"] }), _defineProperty(_Interface, "DeleteSpecialLineOrder_Passenger",

{
  value: Url + '/api/SpecialLine/DeleteSpecialLineOrder_Passenger',
  name: '旅客端-支付完成',
  method: 'POST',
  pages: ["CZC/PrivateTaxi.nvue"] }), _Interface);




// 接口声明区
var _default = {
  Interface: Interface };exports.default = _default;

/***/ }),

/***/ 6:
/*!******************************************************!*\
  !*** ./node_modules/@dcloudio/uni-stat/package.json ***!
  \******************************************************/
/*! exports provided: _from, _id, _inBundle, _integrity, _location, _phantomChildren, _requested, _requiredBy, _resolved, _shasum, _spec, _where, author, bugs, bundleDependencies, deprecated, description, devDependencies, files, gitHead, homepage, license, main, name, repository, scripts, version, default */
/***/ (function(module) {

module.exports = {"_from":"@dcloudio/uni-stat@next","_id":"@dcloudio/uni-stat@2.0.0-26920200424005","_inBundle":false,"_integrity":"sha512-FT8Z/C5xSmIxooqhV1v69jTkxATPz+FsRQIFOrbdlWekjGkrE73jfrdNMWm7gL5u41ALPJTVArxN1Re9by1bjQ==","_location":"/@dcloudio/uni-stat","_phantomChildren":{},"_requested":{"type":"tag","registry":true,"raw":"@dcloudio/uni-stat@next","name":"@dcloudio/uni-stat","escapedName":"@dcloudio%2funi-stat","scope":"@dcloudio","rawSpec":"next","saveSpec":null,"fetchSpec":"next"},"_requiredBy":["#USER","/","/@dcloudio/vue-cli-plugin-uni"],"_resolved":"https://registry.npmjs.org/@dcloudio/uni-stat/-/uni-stat-2.0.0-26920200424005.tgz","_shasum":"47f4375095eda3089cf4678b4b96fc656a7ab623","_spec":"@dcloudio/uni-stat@next","_where":"/Users/guoshengqiang/Documents/dcloud-plugins/release/uniapp-cli","author":"","bugs":{"url":"https://github.com/dcloudio/uni-app/issues"},"bundleDependencies":false,"deprecated":false,"description":"","devDependencies":{"@babel/core":"^7.5.5","@babel/preset-env":"^7.5.5","eslint":"^6.1.0","rollup":"^1.19.3","rollup-plugin-babel":"^4.3.3","rollup-plugin-clear":"^2.0.7","rollup-plugin-commonjs":"^10.0.2","rollup-plugin-copy":"^3.1.0","rollup-plugin-eslint":"^7.0.0","rollup-plugin-json":"^4.0.0","rollup-plugin-node-resolve":"^5.2.0","rollup-plugin-replace":"^2.2.0","rollup-plugin-uglify":"^6.0.2"},"files":["dist","package.json","LICENSE"],"gitHead":"94494d54ed23e2dcf9ab8e3245b48b770b4e98a9","homepage":"https://github.com/dcloudio/uni-app#readme","license":"Apache-2.0","main":"dist/index.js","name":"@dcloudio/uni-stat","repository":{"type":"git","url":"git+https://github.com/dcloudio/uni-app.git","directory":"packages/uni-stat"},"scripts":{"build":"NODE_ENV=production rollup -c rollup.config.js","dev":"NODE_ENV=development rollup -w -c rollup.config.js"},"version":"2.0.0-26920200424005"};

/***/ }),

/***/ 67:
/*!***********************************************************************************!*\
  !*** D:/UAD/Jdt-zhcx/components/GRZX/js_sdk/gsq-image-tools/image-tools/index.js ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.pathToBase64 = pathToBase64;exports.base64ToPath = base64ToPath;function getLocalFilePath(path) {
  if (path.indexOf('_www') === 0 || path.indexOf('_doc') === 0 || path.indexOf('_documents') === 0 || path.indexOf('_downloads') === 0) {
    return path;
  }
  if (path.indexOf('file://') === 0) {
    return path;
  }
  if (path.indexOf('/storage/emulated/0/') === 0) {
    return path;
  }
  if (path.indexOf('/') === 0) {
    var localFilePath = plus.io.convertAbsoluteFileSystem(path);
    if (localFilePath !== path) {
      return localFilePath;
    } else {
      path = path.substr(1);
    }
  }
  return '_www/' + path;
}

function pathToBase64(path) {
  return new Promise(function (resolve, reject) {
    if (typeof window === 'object' && 'document' in window) {
      var canvas = document.createElement('canvas');
      var c2x = canvas.getContext('2d');
      var img = new Image();
      img.onload = function () {
        canvas.width = img.width;
        canvas.height = img.height;
        c2x.drawImage(img, 0, 0);
        resolve(canvas.toDataURL());
      };
      img.onerror = reject;
      img.src = path;
      return;
    }
    if (typeof plus === 'object') {
      plus.io.resolveLocalFileSystemURL(getLocalFilePath(path), function (entry) {
        entry.file(function (file) {
          var fileReader = new plus.io.FileReader();
          fileReader.onload = function (data) {
            resolve(data.target.result);
          };
          fileReader.onerror = function (error) {
            reject(error);
          };
          fileReader.readAsDataURL(file);
        }, function (error) {
          reject(error);
        });
      }, function (error) {
        reject(error);
      });
      return;
    }
    if (typeof wx === 'object' && wx.canIUse('getFileSystemManager')) {
      wx.getFileSystemManager().readFile({
        filePath: path,
        encoding: 'base64',
        success: function success(res) {
          resolve('data:image/png;base64,' + res.data);
        },
        fail: function fail(error) {
          reject(error);
        } });

      return;
    }
    reject(new Error('not support'));
  });
}

function base64ToPath(base64) {
  return new Promise(function (resolve, reject) {
    if (typeof window === 'object' && 'document' in window) {
      base64 = base64.split(',');
      var type = base64[0].match(/:(.*?);/)[1];
      var str = atob(base64[1]);
      var n = str.length;
      var array = new Uint8Array(n);
      while (n--) {
        array[n] = str.charCodeAt(n);
      }
      return resolve((window.URL || window.webkitURL).createObjectURL(new Blob([array], { type: type })));
    }
    var extName = base64.match(/data\:\S+\/(\S+);/);
    if (extName) {
      extName = extName[1];
    } else {
      reject(new Error('base64 error'));
    }
    var fileName = Date.now() + '.' + extName;
    if (typeof plus === 'object') {
      var bitmap = new plus.nativeObj.Bitmap('bitmap' + Date.now());
      bitmap.loadBase64Data(base64, function () {
        var filePath = '_doc/uniapp_temp/' + fileName;
        bitmap.save(filePath, {}, function () {
          bitmap.clear();
          resolve(filePath);
        }, function (error) {
          bitmap.clear();
          reject(error);
        });
      }, function (error) {
        bitmap.clear();
        reject(error);
      });
      return;
    }
    if (typeof wx === 'object' && wx.canIUse('getFileSystemManager')) {
      var filePath = wx.env.USER_DATA_PATH + '/' + fileName;
      wx.getFileSystemManager().writeFile({
        filePath: filePath,
        data: base64.replace(/^data:\S+\/\S+;base64,/, ''),
        encoding: 'base64',
        success: function success() {
          resolve(filePath);
        },
        fail: function fail(error) {
          reject(error);
        } });

      return;
    }
    reject(new Error('not support'));
  });
}

/***/ }),

/***/ 681:
/*!**********************************************************!*\
  !*** D:/UAD/Jdt-zhcx/components/HOME/uni-icons/icons.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = {
  "pulldown": "\uE588",
  "refreshempty": "\uE461",
  "back": "\uE471",
  "forward": "\uE470",
  "more": "\uE507",
  "more-filled": "\uE537",
  "scan": "\uE612",
  "qq": "\uE264",
  "weibo": "\uE260",
  "weixin": "\uE261",
  "pengyouquan": "\uE262",
  "loop": "\uE565",
  "refresh": "\uE407",
  "refresh-filled": "\uE437",
  "arrowthindown": "\uE585",
  "arrowthinleft": "\uE586",
  "arrowthinright": "\uE587",
  "arrowthinup": "\uE584",
  "undo-filled": "\uE7D6",
  "undo": "\uE406",
  "redo": "\uE405",
  "redo-filled": "\uE7D9",
  "bars": "\uE563",
  "chatboxes": "\uE203",
  "camera": "\uE301",
  "chatboxes-filled": "\uE233",
  "camera-filled": "\uE7EF",
  "cart-filled": "\uE7F4",
  "cart": "\uE7F5",
  "checkbox-filled": "\uE442",
  "checkbox": "\uE7FA",
  "arrowleft": "\uE582",
  "arrowdown": "\uE581",
  "arrowright": "\uE583",
  "smallcircle-filled": "\uE801",
  "arrowup": "\uE580",
  "circle": "\uE411",
  "eye-filled": "\uE568",
  "eye-slash-filled": "\uE822",
  "eye-slash": "\uE823",
  "eye": "\uE824",
  "flag-filled": "\uE825",
  "flag": "\uE508",
  "gear-filled": "\uE532",
  "reload": "\uE462",
  "gear": "\uE502",
  "hand-thumbsdown-filled": "\uE83B",
  "hand-thumbsdown": "\uE83C",
  "hand-thumbsup-filled": "\uE83D",
  "heart-filled": "\uE83E",
  "hand-thumbsup": "\uE83F",
  "heart": "\uE840",
  "home": "\uE500",
  "info": "\uE504",
  "home-filled": "\uE530",
  "info-filled": "\uE534",
  "circle-filled": "\uE441",
  "chat-filled": "\uE847",
  "chat": "\uE263",
  "mail-open-filled": "\uE84D",
  "email-filled": "\uE231",
  "mail-open": "\uE84E",
  "email": "\uE201",
  "checkmarkempty": "\uE472",
  "list": "\uE562",
  "locked-filled": "\uE856",
  "locked": "\uE506",
  "map-filled": "\uE85C",
  "map-pin": "\uE85E",
  "map-pin-ellipse": "\uE864",
  "map": "\uE364",
  "minus-filled": "\uE440",
  "mic-filled": "\uE332",
  "minus": "\uE410",
  "micoff": "\uE360",
  "mic": "\uE302",
  "clear": "\uE434",
  "smallcircle": "\uE868",
  "close": "\uE404",
  "closeempty": "\uE460",
  "paperclip": "\uE567",
  "paperplane": "\uE503",
  "paperplane-filled": "\uE86E",
  "person-filled": "\uE131",
  "contact-filled": "\uE130",
  "person": "\uE101",
  "contact": "\uE100",
  "images-filled": "\uE87A",
  "phone": "\uE200",
  "images": "\uE87B",
  "image": "\uE363",
  "image-filled": "\uE877",
  "location-filled": "\uE333",
  "location": "\uE303",
  "plus-filled": "\uE439",
  "plus": "\uE409",
  "plusempty": "\uE468",
  "help-filled": "\uE535",
  "help": "\uE505",
  "navigate-filled": "\uE884",
  "navigate": "\uE501",
  "mic-slash-filled": "\uE892",
  "search": "\uE466",
  "settings": "\uE560",
  "sound": "\uE590",
  "sound-filled": "\uE8A1",
  "spinner-cycle": "\uE465",
  "download-filled": "\uE8A4",
  "personadd-filled": "\uE132",
  "videocam-filled": "\uE8AF",
  "personadd": "\uE102",
  "upload": "\uE402",
  "upload-filled": "\uE8B1",
  "starhalf": "\uE463",
  "star-filled": "\uE438",
  "star": "\uE408",
  "trash": "\uE401",
  "phone-filled": "\uE230",
  "compose": "\uE400",
  "videocam": "\uE300",
  "trash-filled": "\uE8DC",
  "download": "\uE403",
  "chatbubble-filled": "\uE232",
  "chatbubble": "\uE202",
  "cloud-download": "\uE8E4",
  "cloud-upload-filled": "\uE8E5",
  "cloud-upload": "\uE8E6",
  "cloud-download-filled": "\uE8E9",
  "headphones": "\uE8BF",
  "shop": "\uE609" };exports.default = _default;

/***/ }),

/***/ 7:
/*!***************************************************!*\
  !*** D:/UAD/Jdt-zhcx/pages.json?{"type":"style"} ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = { "pages": { "pages/Home/init": {}, "pages/Home/guidePage": { "navigationStyle": "custom" }, "pages/Home/Index": { "navigationStyle": "custom" }, "pages/Home/ChooseSite": { "backgroundColor": "#007AFF", "navigationStyle": "custom" }, "pages/GRZX/user": { "navigationStyle": "custom" }, "pages/GRZX/userLogin": { "navigationStyle": "custom" }, "pages/GRZX/wxLogin": { "navigationStyle": "custom" }, "pages/GRZX/personal": {}, "pages/GRZX/address": { "navigationStyle": "custom" }, "pages/GRZX/set": { "navigationBarTitleText": "设置" }, "pages/GRZX/passengerInfo": { "enablePullDownRefresh": true, "navigationStyle": "custom" }, "pages/GRZX/addPassenger": { "navigationStyle": "custom" }, "pages/GRZX/addAddress": { "navigationBarTitleText": "添加邮寄地址", "navigationBarBackgroundColor": "#FFFFFF" }, "pages/GRZX/aboutApp": { "navigationBarTitleText": "关于App" }, "pages/GRZX/coupon": { "navigationBarTitleText": "卡券红包" }, "pages/GRZX/myNews": { "navigationBarTitleText": "我的消息" }, "pages/GRZX/infoList": { "enablePullDownRefresh": true, "navigationStyle": "custom" }, "pages/GRZX/complaint": { "navigationBarTitleText": "我要投诉" }, "pages/GRZX/collection": { "navigationBarTitleText": "我的收藏" }, "pages/GRZX/history": { "navigationBarTitleText": "我的历史" }, "pages/GRZX/notice": { "navigationBarTitleText": "通知" }, "pages/GRZX/detailTweet": { "navigationBarTitleText": "推送详情" }, "pages/GRZX/feedback": { "navigationBarTitleText": "意见反馈" }, "pages/order/OrderList": { "enablePullDownRefresh": true, "navigationBarTitleText": "", "navigationBarBackgroundColor": "#f5f5f5" }, "pages/order/OrderDetail": { "navigationStyle": "custom" }, "pages/order/SpecialLineDetail": { "navigationStyle": "custom" }, "pages/Home/InformationDetails": { "navigationBarTitleText": "资讯详情" }, "pages/Home/MapIndex": { "navigationBarTitleText": "搜索地址" }, "pages/Home/MapSearch": {}, "pages/Home/serve": { "navigationBarTitleText": "服务" }, "pages_CTKY/pages/CTKY/SpecialBus/Home/specialBusHome": {}, "pages_CTKY/pages/CTKY/SpecialBus/Home/specialLinePicker": {}, "pages_CTKY/pages/CTKY/SpecialBus/Home/specialReserve": {}, "pages_CTKY/pages/CTKY/TraditionSpecial/Home/ctkyIndex": { "navigationBarTitleText": "客运" }, "pages_CTKY/pages/CTKY/TraditionSpecial/stationPicker/homeSattionPick": { "navigationBarTitleText": "选择站点" }, "pages_CTKY/pages/CTKY/TraditionSpecial/Order/selectTickets": { "navigationBarTitleText": "班次列表" }, "pages_CTKY/pages/CTKY/TraditionSpecial/Order/scheduleDetails": { "backgroundColor": "#F1F1F1", "navigationBarBackgroundColor": "#FC4646", "navigationBarTextStyle": "white", "navigationBarTitleText": "班次详情" }, "pages_CTKY/pages/CTKY/TraditionSpecial/seatSelection": { "backgroundColor": "#F1F1F1", "navigationBarBackgroundColor": "#FC4646", "navigationBarTextStyle": "white", "navigationBarTitleText": "选择座位" }, "pages_CTKY/pages/CTKY/TraditionSpecial/Order/oederList": { "navigationBarTitleText": "订单列表" }, "pages_CTKY/pages/CTKY/TraditionSpecial/Order/orderDetail": { "navigationBarTitleText": "订单详情" }, "pages_CTKY/pages/CTKY/TraditionSpecial/issueView": { "navigationBarTitleText": "订单评价" }, "pages_CTKY/pages/CTKY/TraditionSpecial/MapMark/traditionCarMark": { "navigationBarTitleText": "传统地图标识" }, "pages_CTKY/pages/CTKY/TraditionSpecial/MapMark/specialMark": { "navigationBarTitleText": "定制标识" }, "pages_CTKY/pages/CTKY/TraditionSpecial/MapMark/checkBusLocation": { "navigationBarTitleText": "查看班车位置" }, "pages_CTKY/pages/CTKY/TraditionSpecial/PayMent/orderPayment": {}, "pages_CTKY/pages/CTKY/TraditionSpecial/stationPicker/selectStation": { "navigationBarTitleText": "上下车点选择", "navigationBarBackgroundColor": "#FE6C66" }, "pages_CTKY/pages/CTKY/TraditionSpecial/PayMent/CTKYPaySuccess": {}, "pages_CTKY/pages/CTKY/TraditionSpecial/PayMent/CTKYPayFail": {}, "pages_CZC/pages/CZC/Index": { "navigationStyle": "custom" }, "pages_CZC/pages/CZC/CallAndDrive": { "navigationStyle": "custom" }, "pages_CZC/pages/CZC/PrivateTaxi": { "navigationStyle": "custom" }, "pages_CZC/pages/CZC/WaitTakeOrder": { "navigationStyle": "custom" }, "pages_CZC/pages/CZC/PriceDetail": { "navigationBarTitleText": "费用明细" }, "pages_CZC/pages/CZC/PaymentSuccess": { "navigationStyle": "custom" }, "pages_CZC/pages/CZC/PaymentFail": {}, "pages_CZC/pages/CZC/PrivateTaxiPayment": { "navigationStyle": "custom" }, "pages_CZC/pages/CZC/PrivatePaySuccess": { "navigationStyle": "custom" }, "pages_GJCX/pages/GJCX/busH5": {}, "pages_BCFW/pages/BCFW/bf_chartered": {}, "pages_BCFW/pages/BCFW/bf_choice": {}, "pages_BCFW/pages/BCFW/bf_information": { "navigationBarTitleText": "用车信息" }, "pages_BCFW/pages/BCFW/bf_choiceVehicleType": { "navigationBarTitleText": "选择车型" }, "pages_BCFW/pages/BCFW/charterMap": { "navigationStyle": "custom" }, "pages_BCFW/pages/BCFW/bf_charterMap": { "navigationStyle": "custom" }, "pages_BCFW/pages/BCFW/BCsuccessfulPayment": {}, "pages_BCFW/pages/BCFW/charteredBusPayment": {}, "pages_LYFW/pages/LYFW/currency/imglist": { "navigationBarTitleText": "全部图片" }, "pages_LYFW/pages/LYFW/currency/imgPreview": { "navigationBarTitleText": "查看图片" }, "pages_LYFW/pages/LYFW/currency/travelDetails": {}, "pages_LYFW/pages/LYFW/currency/ho_zhly": { "navigationBarTitleText": "旅游服务" }, "pages_LYFW/pages/LYFW/groupTour/groupTourList": { "navigationBarTitleText": "跟团游列表" }, "pages_LYFW/pages/LYFW/groupTour/viewMore": {}, "pages_LYFW/pages/LYFW/independentTravel/it_list": {}, "pages_LYFW/pages/LYFW/scenicSpotTickets/ticketsList": { "navigationBarTitleText": "景区列表", "enablePullDownRefresh": true, "navigationBarBackgroundColor": "#FFFFFF", "onReachBottomDistance": 0 }, "pages_LYFW/pages/LYFW/scenicSpotTickets/ticketsDetails": { "navigationBarTitleText": "景区详情" }, "pages_LYFW/pages/LYFW/scenicSpotTickets/selectivePayment": { "navigationBarTitleText": "选择支付 " }, "pages_LYFW/pages/LYFW/scenicSpotTickets/successfulPayment": { "navigationBarTitleText": "购票成功" }, "pages_LYFW/pages/LYFW/scenicSpotTickets/orderAdd": { "navigationBarTitleText": "填写订单" }, "pages_LYFW/pages/LYFW/scenicSpotTickets/orderDetails": { "navigationBarTitleText": "订单详情" } }, "globalStyle": { "navigationBarTextStyle": "black", "navigationBarBackgroundColor": "#F8F8F8", "backgroundColor": "#F8F8F8" } };exports.default = _default;

/***/ }),

/***/ 722:
/*!**********************************************************************!*\
  !*** D:/UAD/Jdt-zhcx/components/GRZX/w-picker/city-data/province.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /* eslint-disable */
var provinceData = [{
  "label": "北京市",
  "value": "11" },

{
  "label": "天津市",
  "value": "12" },

{
  "label": "河北省",
  "value": "13" },

{
  "label": "山西省",
  "value": "14" },

{
  "label": "内蒙古自治区",
  "value": "15" },

{
  "label": "辽宁省",
  "value": "21" },

{
  "label": "吉林省",
  "value": "22" },

{
  "label": "黑龙江省",
  "value": "23" },

{
  "label": "上海市",
  "value": "31" },

{
  "label": "江苏省",
  "value": "32" },

{
  "label": "浙江省",
  "value": "33" },

{
  "label": "安徽省",
  "value": "34" },

{
  "label": "福建省",
  "value": "35" },

{
  "label": "江西省",
  "value": "36" },

{
  "label": "山东省",
  "value": "37" },

{
  "label": "河南省",
  "value": "41" },

{
  "label": "湖北省",
  "value": "42" },

{
  "label": "湖南省",
  "value": "43" },

{
  "label": "广东省",
  "value": "44" },

{
  "label": "广西壮族自治区",
  "value": "45" },

{
  "label": "海南省",
  "value": "46" },

{
  "label": "重庆市",
  "value": "50" },

{
  "label": "四川省",
  "value": "51" },

{
  "label": "贵州省",
  "value": "52" },

{
  "label": "云南省",
  "value": "53" },

{
  "label": "西藏自治区",
  "value": "54" },

{
  "label": "陕西省",
  "value": "61" },

{
  "label": "甘肃省",
  "value": "62" },

{
  "label": "青海省",
  "value": "63" },

{
  "label": "宁夏回族自治区",
  "value": "64" },

{
  "label": "新疆维吾尔自治区",
  "value": "65" },

{
  "label": "台湾",
  "value": "66" },

{
  "label": "香港",
  "value": "67" },

{
  "label": "澳门",
  "value": "68" }];var _default =


provinceData;exports.default = _default;

/***/ }),

/***/ 723:
/*!******************************************************************!*\
  !*** D:/UAD/Jdt-zhcx/components/GRZX/w-picker/city-data/city.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /* eslint-disable */
var cityData = [
[{
  "label": "市辖区",
  "value": "1101" }],

[{
  "label": "市辖区",
  "value": "1201" }],

[{
  "label": "石家庄市",
  "value": "1301" },

{
  "label": "唐山市",
  "value": "1302" },

{
  "label": "秦皇岛市",
  "value": "1303" },

{
  "label": "邯郸市",
  "value": "1304" },

{
  "label": "邢台市",
  "value": "1305" },

{
  "label": "保定市",
  "value": "1306" },

{
  "label": "张家口市",
  "value": "1307" },

{
  "label": "承德市",
  "value": "1308" },

{
  "label": "沧州市",
  "value": "1309" },

{
  "label": "廊坊市",
  "value": "1310" },

{
  "label": "衡水市",
  "value": "1311" }],


[{
  "label": "太原市",
  "value": "1401" },

{
  "label": "大同市",
  "value": "1402" },

{
  "label": "阳泉市",
  "value": "1403" },

{
  "label": "长治市",
  "value": "1404" },

{
  "label": "晋城市",
  "value": "1405" },

{
  "label": "朔州市",
  "value": "1406" },

{
  "label": "晋中市",
  "value": "1407" },

{
  "label": "运城市",
  "value": "1408" },

{
  "label": "忻州市",
  "value": "1409" },

{
  "label": "临汾市",
  "value": "1410" },

{
  "label": "吕梁市",
  "value": "1411" }],


[{
  "label": "呼和浩特市",
  "value": "1501" },

{
  "label": "包头市",
  "value": "1502" },

{
  "label": "乌海市",
  "value": "1503" },

{
  "label": "赤峰市",
  "value": "1504" },

{
  "label": "通辽市",
  "value": "1505" },

{
  "label": "鄂尔多斯市",
  "value": "1506" },

{
  "label": "呼伦贝尔市",
  "value": "1507" },

{
  "label": "巴彦淖尔市",
  "value": "1508" },

{
  "label": "乌兰察布市",
  "value": "1509" },

{
  "label": "兴安盟",
  "value": "1522" },

{
  "label": "锡林郭勒盟",
  "value": "1525" },

{
  "label": "阿拉善盟",
  "value": "1529" }],


[{
  "label": "沈阳市",
  "value": "2101" },

{
  "label": "大连市",
  "value": "2102" },

{
  "label": "鞍山市",
  "value": "2103" },

{
  "label": "抚顺市",
  "value": "2104" },

{
  "label": "本溪市",
  "value": "2105" },

{
  "label": "丹东市",
  "value": "2106" },

{
  "label": "锦州市",
  "value": "2107" },

{
  "label": "营口市",
  "value": "2108" },

{
  "label": "阜新市",
  "value": "2109" },

{
  "label": "辽阳市",
  "value": "2110" },

{
  "label": "盘锦市",
  "value": "2111" },

{
  "label": "铁岭市",
  "value": "2112" },

{
  "label": "朝阳市",
  "value": "2113" },

{
  "label": "葫芦岛市",
  "value": "2114" }],


[{
  "label": "长春市",
  "value": "2201" },

{
  "label": "吉林市",
  "value": "2202" },

{
  "label": "四平市",
  "value": "2203" },

{
  "label": "辽源市",
  "value": "2204" },

{
  "label": "通化市",
  "value": "2205" },

{
  "label": "白山市",
  "value": "2206" },

{
  "label": "松原市",
  "value": "2207" },

{
  "label": "白城市",
  "value": "2208" },

{
  "label": "延边朝鲜族自治州",
  "value": "2224" }],


[{
  "label": "哈尔滨市",
  "value": "2301" },

{
  "label": "齐齐哈尔市",
  "value": "2302" },

{
  "label": "鸡西市",
  "value": "2303" },

{
  "label": "鹤岗市",
  "value": "2304" },

{
  "label": "双鸭山市",
  "value": "2305" },

{
  "label": "大庆市",
  "value": "2306" },

{
  "label": "伊春市",
  "value": "2307" },

{
  "label": "佳木斯市",
  "value": "2308" },

{
  "label": "七台河市",
  "value": "2309" },

{
  "label": "牡丹江市",
  "value": "2310" },

{
  "label": "黑河市",
  "value": "2311" },

{
  "label": "绥化市",
  "value": "2312" },

{
  "label": "大兴安岭地区",
  "value": "2327" }],


[{
  "label": "市辖区",
  "value": "3101" }],

[{
  "label": "南京市",
  "value": "3201" },

{
  "label": "无锡市",
  "value": "3202" },

{
  "label": "徐州市",
  "value": "3203" },

{
  "label": "常州市",
  "value": "3204" },

{
  "label": "苏州市",
  "value": "3205" },

{
  "label": "南通市",
  "value": "3206" },

{
  "label": "连云港市",
  "value": "3207" },

{
  "label": "淮安市",
  "value": "3208" },

{
  "label": "盐城市",
  "value": "3209" },

{
  "label": "扬州市",
  "value": "3210" },

{
  "label": "镇江市",
  "value": "3211" },

{
  "label": "泰州市",
  "value": "3212" },

{
  "label": "宿迁市",
  "value": "3213" }],


[{
  "label": "杭州市",
  "value": "3301" },

{
  "label": "宁波市",
  "value": "3302" },

{
  "label": "温州市",
  "value": "3303" },

{
  "label": "嘉兴市",
  "value": "3304" },

{
  "label": "湖州市",
  "value": "3305" },

{
  "label": "绍兴市",
  "value": "3306" },

{
  "label": "金华市",
  "value": "3307" },

{
  "label": "衢州市",
  "value": "3308" },

{
  "label": "舟山市",
  "value": "3309" },

{
  "label": "台州市",
  "value": "3310" },

{
  "label": "丽水市",
  "value": "3311" }],


[{
  "label": "合肥市",
  "value": "3401" },

{
  "label": "芜湖市",
  "value": "3402" },

{
  "label": "蚌埠市",
  "value": "3403" },

{
  "label": "淮南市",
  "value": "3404" },

{
  "label": "马鞍山市",
  "value": "3405" },

{
  "label": "淮北市",
  "value": "3406" },

{
  "label": "铜陵市",
  "value": "3407" },

{
  "label": "安庆市",
  "value": "3408" },

{
  "label": "黄山市",
  "value": "3410" },

{
  "label": "滁州市",
  "value": "3411" },

{
  "label": "阜阳市",
  "value": "3412" },

{
  "label": "宿州市",
  "value": "3413" },

{
  "label": "六安市",
  "value": "3415" },

{
  "label": "亳州市",
  "value": "3416" },

{
  "label": "池州市",
  "value": "3417" },

{
  "label": "宣城市",
  "value": "3418" }],


[{
  "label": "福州市",
  "value": "3501" },

{
  "label": "厦门市",
  "value": "3502" },

{
  "label": "莆田市",
  "value": "3503" },

{
  "label": "三明市",
  "value": "3504" },

{
  "label": "泉州市",
  "value": "3505" },

{
  "label": "漳州市",
  "value": "3506" },

{
  "label": "南平市",
  "value": "3507" },

{
  "label": "龙岩市",
  "value": "3508" },

{
  "label": "宁德市",
  "value": "3509" }],


[{
  "label": "南昌市",
  "value": "3601" },

{
  "label": "景德镇市",
  "value": "3602" },

{
  "label": "萍乡市",
  "value": "3603" },

{
  "label": "九江市",
  "value": "3604" },

{
  "label": "新余市",
  "value": "3605" },

{
  "label": "鹰潭市",
  "value": "3606" },

{
  "label": "赣州市",
  "value": "3607" },

{
  "label": "吉安市",
  "value": "3608" },

{
  "label": "宜春市",
  "value": "3609" },

{
  "label": "抚州市",
  "value": "3610" },

{
  "label": "上饶市",
  "value": "3611" }],


[{
  "label": "济南市",
  "value": "3701" },

{
  "label": "青岛市",
  "value": "3702" },

{
  "label": "淄博市",
  "value": "3703" },

{
  "label": "枣庄市",
  "value": "3704" },

{
  "label": "东营市",
  "value": "3705" },

{
  "label": "烟台市",
  "value": "3706" },

{
  "label": "潍坊市",
  "value": "3707" },

{
  "label": "济宁市",
  "value": "3708" },

{
  "label": "泰安市",
  "value": "3709" },

{
  "label": "威海市",
  "value": "3710" },

{
  "label": "日照市",
  "value": "3711" },

{
  "label": "莱芜市",
  "value": "3712" },

{
  "label": "临沂市",
  "value": "3713" },

{
  "label": "德州市",
  "value": "3714" },

{
  "label": "聊城市",
  "value": "3715" },

{
  "label": "滨州市",
  "value": "3716" },

{
  "label": "菏泽市",
  "value": "3717" }],


[{
  "label": "郑州市",
  "value": "4101" },

{
  "label": "开封市",
  "value": "4102" },

{
  "label": "洛阳市",
  "value": "4103" },

{
  "label": "平顶山市",
  "value": "4104" },

{
  "label": "安阳市",
  "value": "4105" },

{
  "label": "鹤壁市",
  "value": "4106" },

{
  "label": "新乡市",
  "value": "4107" },

{
  "label": "焦作市",
  "value": "4108" },

{
  "label": "濮阳市",
  "value": "4109" },

{
  "label": "许昌市",
  "value": "4110" },

{
  "label": "漯河市",
  "value": "4111" },

{
  "label": "三门峡市",
  "value": "4112" },

{
  "label": "南阳市",
  "value": "4113" },

{
  "label": "商丘市",
  "value": "4114" },

{
  "label": "信阳市",
  "value": "4115" },

{
  "label": "周口市",
  "value": "4116" },

{
  "label": "驻马店市",
  "value": "4117" },

{
  "label": "省直辖县级行政区划",
  "value": "4190" }],


[{
  "label": "武汉市",
  "value": "4201" },

{
  "label": "黄石市",
  "value": "4202" },

{
  "label": "十堰市",
  "value": "4203" },

{
  "label": "宜昌市",
  "value": "4205" },

{
  "label": "襄阳市",
  "value": "4206" },

{
  "label": "鄂州市",
  "value": "4207" },

{
  "label": "荆门市",
  "value": "4208" },

{
  "label": "孝感市",
  "value": "4209" },

{
  "label": "荆州市",
  "value": "4210" },

{
  "label": "黄冈市",
  "value": "4211" },

{
  "label": "咸宁市",
  "value": "4212" },

{
  "label": "随州市",
  "value": "4213" },

{
  "label": "恩施土家族苗族自治州",
  "value": "4228" },

{
  "label": "省直辖县级行政区划",
  "value": "4290" }],


[{
  "label": "长沙市",
  "value": "4301" },

{
  "label": "株洲市",
  "value": "4302" },

{
  "label": "湘潭市",
  "value": "4303" },

{
  "label": "衡阳市",
  "value": "4304" },

{
  "label": "邵阳市",
  "value": "4305" },

{
  "label": "岳阳市",
  "value": "4306" },

{
  "label": "常德市",
  "value": "4307" },

{
  "label": "张家界市",
  "value": "4308" },

{
  "label": "益阳市",
  "value": "4309" },

{
  "label": "郴州市",
  "value": "4310" },

{
  "label": "永州市",
  "value": "4311" },

{
  "label": "怀化市",
  "value": "4312" },

{
  "label": "娄底市",
  "value": "4313" },

{
  "label": "湘西土家族苗族自治州",
  "value": "4331" }],


[{
  "label": "广州市",
  "value": "4401" },

{
  "label": "韶关市",
  "value": "4402" },

{
  "label": "深圳市",
  "value": "4403" },

{
  "label": "珠海市",
  "value": "4404" },

{
  "label": "汕头市",
  "value": "4405" },

{
  "label": "佛山市",
  "value": "4406" },

{
  "label": "江门市",
  "value": "4407" },

{
  "label": "湛江市",
  "value": "4408" },

{
  "label": "茂名市",
  "value": "4409" },

{
  "label": "肇庆市",
  "value": "4412" },

{
  "label": "惠州市",
  "value": "4413" },

{
  "label": "梅州市",
  "value": "4414" },

{
  "label": "汕尾市",
  "value": "4415" },

{
  "label": "河源市",
  "value": "4416" },

{
  "label": "阳江市",
  "value": "4417" },

{
  "label": "清远市",
  "value": "4418" },

{
  "label": "东莞市",
  "value": "4419" },

{
  "label": "中山市",
  "value": "4420" },

{
  "label": "潮州市",
  "value": "4451" },

{
  "label": "揭阳市",
  "value": "4452" },

{
  "label": "云浮市",
  "value": "4453" }],


[{
  "label": "南宁市",
  "value": "4501" },

{
  "label": "柳州市",
  "value": "4502" },

{
  "label": "桂林市",
  "value": "4503" },

{
  "label": "梧州市",
  "value": "4504" },

{
  "label": "北海市",
  "value": "4505" },

{
  "label": "防城港市",
  "value": "4506" },

{
  "label": "钦州市",
  "value": "4507" },

{
  "label": "贵港市",
  "value": "4508" },

{
  "label": "玉林市",
  "value": "4509" },

{
  "label": "百色市",
  "value": "4510" },

{
  "label": "贺州市",
  "value": "4511" },

{
  "label": "河池市",
  "value": "4512" },

{
  "label": "来宾市",
  "value": "4513" },

{
  "label": "崇左市",
  "value": "4514" }],


[{
  "label": "海口市",
  "value": "4601" },

{
  "label": "三亚市",
  "value": "4602" },

{
  "label": "三沙市",
  "value": "4603" },

{
  "label": "儋州市",
  "value": "4604" },

{
  "label": "省直辖县级行政区划",
  "value": "4690" }],


[{
  "label": "市辖区",
  "value": "5001" },

{
  "label": "县",
  "value": "5002" }],


[{
  "label": "成都市",
  "value": "5101" },

{
  "label": "自贡市",
  "value": "5103" },

{
  "label": "攀枝花市",
  "value": "5104" },

{
  "label": "泸州市",
  "value": "5105" },

{
  "label": "德阳市",
  "value": "5106" },

{
  "label": "绵阳市",
  "value": "5107" },

{
  "label": "广元市",
  "value": "5108" },

{
  "label": "遂宁市",
  "value": "5109" },

{
  "label": "内江市",
  "value": "5110" },

{
  "label": "乐山市",
  "value": "5111" },

{
  "label": "南充市",
  "value": "5113" },

{
  "label": "眉山市",
  "value": "5114" },

{
  "label": "宜宾市",
  "value": "5115" },

{
  "label": "广安市",
  "value": "5116" },

{
  "label": "达州市",
  "value": "5117" },

{
  "label": "雅安市",
  "value": "5118" },

{
  "label": "巴中市",
  "value": "5119" },

{
  "label": "资阳市",
  "value": "5120" },

{
  "label": "阿坝藏族羌族自治州",
  "value": "5132" },

{
  "label": "甘孜藏族自治州",
  "value": "5133" },

{
  "label": "凉山彝族自治州",
  "value": "5134" }],


[{
  "label": "贵阳市",
  "value": "5201" },

{
  "label": "六盘水市",
  "value": "5202" },

{
  "label": "遵义市",
  "value": "5203" },

{
  "label": "安顺市",
  "value": "5204" },

{
  "label": "毕节市",
  "value": "5205" },

{
  "label": "铜仁市",
  "value": "5206" },

{
  "label": "黔西南布依族苗族自治州",
  "value": "5223" },

{
  "label": "黔东南苗族侗族自治州",
  "value": "5226" },

{
  "label": "黔南布依族苗族自治州",
  "value": "5227" }],


[{
  "label": "昆明市",
  "value": "5301" },

{
  "label": "曲靖市",
  "value": "5303" },

{
  "label": "玉溪市",
  "value": "5304" },

{
  "label": "保山市",
  "value": "5305" },

{
  "label": "昭通市",
  "value": "5306" },

{
  "label": "丽江市",
  "value": "5307" },

{
  "label": "普洱市",
  "value": "5308" },

{
  "label": "临沧市",
  "value": "5309" },

{
  "label": "楚雄彝族自治州",
  "value": "5323" },

{
  "label": "红河哈尼族彝族自治州",
  "value": "5325" },

{
  "label": "文山壮族苗族自治州",
  "value": "5326" },

{
  "label": "西双版纳傣族自治州",
  "value": "5328" },

{
  "label": "大理白族自治州",
  "value": "5329" },

{
  "label": "德宏傣族景颇族自治州",
  "value": "5331" },

{
  "label": "怒江傈僳族自治州",
  "value": "5333" },

{
  "label": "迪庆藏族自治州",
  "value": "5334" }],


[{
  "label": "拉萨市",
  "value": "5401" },

{
  "label": "日喀则市",
  "value": "5402" },

{
  "label": "昌都市",
  "value": "5403" },

{
  "label": "林芝市",
  "value": "5404" },

{
  "label": "山南市",
  "value": "5405" },

{
  "label": "那曲地区",
  "value": "5424" },

{
  "label": "阿里地区",
  "value": "5425" }],


[{
  "label": "西安市",
  "value": "6101" },

{
  "label": "铜川市",
  "value": "6102" },

{
  "label": "宝鸡市",
  "value": "6103" },

{
  "label": "咸阳市",
  "value": "6104" },

{
  "label": "渭南市",
  "value": "6105" },

{
  "label": "延安市",
  "value": "6106" },

{
  "label": "汉中市",
  "value": "6107" },

{
  "label": "榆林市",
  "value": "6108" },

{
  "label": "安康市",
  "value": "6109" },

{
  "label": "商洛市",
  "value": "6110" }],


[{
  "label": "兰州市",
  "value": "6201" },

{
  "label": "嘉峪关市",
  "value": "6202" },

{
  "label": "金昌市",
  "value": "6203" },

{
  "label": "白银市",
  "value": "6204" },

{
  "label": "天水市",
  "value": "6205" },

{
  "label": "武威市",
  "value": "6206" },

{
  "label": "张掖市",
  "value": "6207" },

{
  "label": "平凉市",
  "value": "6208" },

{
  "label": "酒泉市",
  "value": "6209" },

{
  "label": "庆阳市",
  "value": "6210" },

{
  "label": "定西市",
  "value": "6211" },

{
  "label": "陇南市",
  "value": "6212" },

{
  "label": "临夏回族自治州",
  "value": "6229" },

{
  "label": "甘南藏族自治州",
  "value": "6230" }],


[{
  "label": "西宁市",
  "value": "6301" },

{
  "label": "海东市",
  "value": "6302" },

{
  "label": "海北藏族自治州",
  "value": "6322" },

{
  "label": "黄南藏族自治州",
  "value": "6323" },

{
  "label": "海南藏族自治州",
  "value": "6325" },

{
  "label": "果洛藏族自治州",
  "value": "6326" },

{
  "label": "玉树藏族自治州",
  "value": "6327" },

{
  "label": "海西蒙古族藏族自治州",
  "value": "6328" }],


[{
  "label": "银川市",
  "value": "6401" },

{
  "label": "石嘴山市",
  "value": "6402" },

{
  "label": "吴忠市",
  "value": "6403" },

{
  "label": "固原市",
  "value": "6404" },

{
  "label": "中卫市",
  "value": "6405" }],


[{
  "label": "乌鲁木齐市",
  "value": "6501" },

{
  "label": "克拉玛依市",
  "value": "6502" },

{
  "label": "吐鲁番市",
  "value": "6504" },

{
  "label": "哈密市",
  "value": "6505" },

{
  "label": "昌吉回族自治州",
  "value": "6523" },

{
  "label": "博尔塔拉蒙古自治州",
  "value": "6527" },

{
  "label": "巴音郭楞蒙古自治州",
  "value": "6528" },

{
  "label": "阿克苏地区",
  "value": "6529" },

{
  "label": "克孜勒苏柯尔克孜自治州",
  "value": "6530" },

{
  "label": "喀什地区",
  "value": "6531" },

{
  "label": "和田地区",
  "value": "6532" },

{
  "label": "伊犁哈萨克自治州",
  "value": "6540" },

{
  "label": "塔城地区",
  "value": "6542" },

{
  "label": "阿勒泰地区",
  "value": "6543" },

{
  "label": "自治区直辖县级行政区划",
  "value": "6590" }],


[{
  "label": "台北",
  "value": "6601" },

{
  "label": "高雄",
  "value": "6602" },

{
  "label": "基隆",
  "value": "6603" },

{
  "label": "台中",
  "value": "6604" },

{
  "label": "台南",
  "value": "6605" },

{
  "label": "新竹",
  "value": "6606" },

{
  "label": "嘉义",
  "value": "6607" },

{
  "label": "宜兰",
  "value": "6608" },

{
  "label": "桃园",
  "value": "6609" },

{
  "label": "苗栗",
  "value": "6610" },

{
  "label": "彰化",
  "value": "6611" },

{
  "label": "南投",
  "value": "6612" },

{
  "label": "云林",
  "value": "6613" },

{
  "label": "屏东",
  "value": "6614" },

{
  "label": "台东",
  "value": "6615" },

{
  "label": "花莲",
  "value": "6616" },

{
  "label": "澎湖",
  "value": "6617" }],


[{
  "label": "香港岛",
  "value": "6701" },

{
  "label": "九龙",
  "value": "6702" },

{
  "label": "新界",
  "value": "6703" }],


[{
  "label": "澳门半岛",
  "value": "6801" },

{
  "label": "氹仔岛",
  "value": "6802" },

{
  "label": "路环岛",
  "value": "6803" },

{
  "label": "路氹城",
  "value": "6804" }]];var _default =



cityData;exports.default = _default;

/***/ }),

/***/ 724:
/*!******************************************************************!*\
  !*** D:/UAD/Jdt-zhcx/components/GRZX/w-picker/city-data/area.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /* eslint-disable */
var areaData = [
[
[{
  "label": "东城区",
  "value": "110101" },

{
  "label": "西城区",
  "value": "110102" },

{
  "label": "朝阳区",
  "value": "110105" },

{
  "label": "丰台区",
  "value": "110106" },

{
  "label": "石景山区",
  "value": "110107" },

{
  "label": "海淀区",
  "value": "110108" },

{
  "label": "门头沟区",
  "value": "110109" },

{
  "label": "房山区",
  "value": "110111" },

{
  "label": "通州区",
  "value": "110112" },

{
  "label": "顺义区",
  "value": "110113" },

{
  "label": "昌平区",
  "value": "110114" },

{
  "label": "大兴区",
  "value": "110115" },

{
  "label": "怀柔区",
  "value": "110116" },

{
  "label": "平谷区",
  "value": "110117" },

{
  "label": "密云区",
  "value": "110118" },

{
  "label": "延庆区",
  "value": "110119" }]],



[
[{
  "label": "和平区",
  "value": "120101" },

{
  "label": "河东区",
  "value": "120102" },

{
  "label": "河西区",
  "value": "120103" },

{
  "label": "南开区",
  "value": "120104" },

{
  "label": "河北区",
  "value": "120105" },

{
  "label": "红桥区",
  "value": "120106" },

{
  "label": "东丽区",
  "value": "120110" },

{
  "label": "西青区",
  "value": "120111" },

{
  "label": "津南区",
  "value": "120112" },

{
  "label": "北辰区",
  "value": "120113" },

{
  "label": "武清区",
  "value": "120114" },

{
  "label": "宝坻区",
  "value": "120115" },

{
  "label": "滨海新区",
  "value": "120116" },

{
  "label": "宁河区",
  "value": "120117" },

{
  "label": "静海区",
  "value": "120118" },

{
  "label": "蓟州区",
  "value": "120119" }]],



[
[{
  "label": "长安区",
  "value": "130102" },

{
  "label": "桥西区",
  "value": "130104" },

{
  "label": "新华区",
  "value": "130105" },

{
  "label": "井陉矿区",
  "value": "130107" },

{
  "label": "裕华区",
  "value": "130108" },

{
  "label": "藁城区",
  "value": "130109" },

{
  "label": "鹿泉区",
  "value": "130110" },

{
  "label": "栾城区",
  "value": "130111" },

{
  "label": "井陉县",
  "value": "130121" },

{
  "label": "正定县",
  "value": "130123" },

{
  "label": "行唐县",
  "value": "130125" },

{
  "label": "灵寿县",
  "value": "130126" },

{
  "label": "高邑县",
  "value": "130127" },

{
  "label": "深泽县",
  "value": "130128" },

{
  "label": "赞皇县",
  "value": "130129" },

{
  "label": "无极县",
  "value": "130130" },

{
  "label": "平山县",
  "value": "130131" },

{
  "label": "元氏县",
  "value": "130132" },

{
  "label": "赵县",
  "value": "130133" },

{
  "label": "石家庄高新技术产业开发区",
  "value": "130171" },

{
  "label": "石家庄循环化工园区",
  "value": "130172" },

{
  "label": "辛集市",
  "value": "130181" },

{
  "label": "晋州市",
  "value": "130183" },

{
  "label": "新乐市",
  "value": "130184" }],


[{
  "label": "路南区",
  "value": "130202" },

{
  "label": "路北区",
  "value": "130203" },

{
  "label": "古冶区",
  "value": "130204" },

{
  "label": "开平区",
  "value": "130205" },

{
  "label": "丰南区",
  "value": "130207" },

{
  "label": "丰润区",
  "value": "130208" },

{
  "label": "曹妃甸区",
  "value": "130209" },

{
  "label": "滦县",
  "value": "130223" },

{
  "label": "滦南县",
  "value": "130224" },

{
  "label": "乐亭县",
  "value": "130225" },

{
  "label": "迁西县",
  "value": "130227" },

{
  "label": "玉田县",
  "value": "130229" },

{
  "label": "唐山市芦台经济技术开发区",
  "value": "130271" },

{
  "label": "唐山市汉沽管理区",
  "value": "130272" },

{
  "label": "唐山高新技术产业开发区",
  "value": "130273" },

{
  "label": "河北唐山海港经济开发区",
  "value": "130274" },

{
  "label": "遵化市",
  "value": "130281" },

{
  "label": "迁安市",
  "value": "130283" }],


[{
  "label": "海港区",
  "value": "130302" },

{
  "label": "山海关区",
  "value": "130303" },

{
  "label": "北戴河区",
  "value": "130304" },

{
  "label": "抚宁区",
  "value": "130306" },

{
  "label": "青龙满族自治县",
  "value": "130321" },

{
  "label": "昌黎县",
  "value": "130322" },

{
  "label": "卢龙县",
  "value": "130324" },

{
  "label": "秦皇岛市经济技术开发区",
  "value": "130371" },

{
  "label": "北戴河新区",
  "value": "130372" }],


[{
  "label": "邯山区",
  "value": "130402" },

{
  "label": "丛台区",
  "value": "130403" },

{
  "label": "复兴区",
  "value": "130404" },

{
  "label": "峰峰矿区",
  "value": "130406" },

{
  "label": "肥乡区",
  "value": "130407" },

{
  "label": "永年区",
  "value": "130408" },

{
  "label": "临漳县",
  "value": "130423" },

{
  "label": "成安县",
  "value": "130424" },

{
  "label": "大名县",
  "value": "130425" },

{
  "label": "涉县",
  "value": "130426" },

{
  "label": "磁县",
  "value": "130427" },

{
  "label": "邱县",
  "value": "130430" },

{
  "label": "鸡泽县",
  "value": "130431" },

{
  "label": "广平县",
  "value": "130432" },

{
  "label": "馆陶县",
  "value": "130433" },

{
  "label": "魏县",
  "value": "130434" },

{
  "label": "曲周县",
  "value": "130435" },

{
  "label": "邯郸经济技术开发区",
  "value": "130471" },

{
  "label": "邯郸冀南新区",
  "value": "130473" },

{
  "label": "武安市",
  "value": "130481" }],


[{
  "label": "桥东区",
  "value": "130502" },

{
  "label": "桥西区",
  "value": "130503" },

{
  "label": "邢台县",
  "value": "130521" },

{
  "label": "临城县",
  "value": "130522" },

{
  "label": "内丘县",
  "value": "130523" },

{
  "label": "柏乡县",
  "value": "130524" },

{
  "label": "隆尧县",
  "value": "130525" },

{
  "label": "任县",
  "value": "130526" },

{
  "label": "南和县",
  "value": "130527" },

{
  "label": "宁晋县",
  "value": "130528" },

{
  "label": "巨鹿县",
  "value": "130529" },

{
  "label": "新河县",
  "value": "130530" },

{
  "label": "广宗县",
  "value": "130531" },

{
  "label": "平乡县",
  "value": "130532" },

{
  "label": "威县",
  "value": "130533" },

{
  "label": "清河县",
  "value": "130534" },

{
  "label": "临西县",
  "value": "130535" },

{
  "label": "河北邢台经济开发区",
  "value": "130571" },

{
  "label": "南宫市",
  "value": "130581" },

{
  "label": "沙河市",
  "value": "130582" }],


[{
  "label": "竞秀区",
  "value": "130602" },

{
  "label": "莲池区",
  "value": "130606" },

{
  "label": "满城区",
  "value": "130607" },

{
  "label": "清苑区",
  "value": "130608" },

{
  "label": "徐水区",
  "value": "130609" },

{
  "label": "涞水县",
  "value": "130623" },

{
  "label": "阜平县",
  "value": "130624" },

{
  "label": "定兴县",
  "value": "130626" },

{
  "label": "唐县",
  "value": "130627" },

{
  "label": "高阳县",
  "value": "130628" },

{
  "label": "容城县",
  "value": "130629" },

{
  "label": "涞源县",
  "value": "130630" },

{
  "label": "望都县",
  "value": "130631" },

{
  "label": "安新县",
  "value": "130632" },

{
  "label": "易县",
  "value": "130633" },

{
  "label": "曲阳县",
  "value": "130634" },

{
  "label": "蠡县",
  "value": "130635" },

{
  "label": "顺平县",
  "value": "130636" },

{
  "label": "博野县",
  "value": "130637" },

{
  "label": "雄县",
  "value": "130638" },

{
  "label": "保定高新技术产业开发区",
  "value": "130671" },

{
  "label": "保定白沟新城",
  "value": "130672" },

{
  "label": "涿州市",
  "value": "130681" },

{
  "label": "定州市",
  "value": "130682" },

{
  "label": "安国市",
  "value": "130683" },

{
  "label": "高碑店市",
  "value": "130684" }],


[{
  "label": "桥东区",
  "value": "130702" },

{
  "label": "桥西区",
  "value": "130703" },

{
  "label": "宣化区",
  "value": "130705" },

{
  "label": "下花园区",
  "value": "130706" },

{
  "label": "万全区",
  "value": "130708" },

{
  "label": "崇礼区",
  "value": "130709" },

{
  "label": "张北县",
  "value": "130722" },

{
  "label": "康保县",
  "value": "130723" },

{
  "label": "沽源县",
  "value": "130724" },

{
  "label": "尚义县",
  "value": "130725" },

{
  "label": "蔚县",
  "value": "130726" },

{
  "label": "阳原县",
  "value": "130727" },

{
  "label": "怀安县",
  "value": "130728" },

{
  "label": "怀来县",
  "value": "130730" },

{
  "label": "涿鹿县",
  "value": "130731" },

{
  "label": "赤城县",
  "value": "130732" },

{
  "label": "张家口市高新技术产业开发区",
  "value": "130771" },

{
  "label": "张家口市察北管理区",
  "value": "130772" },

{
  "label": "张家口市塞北管理区",
  "value": "130773" }],


[{
  "label": "双桥区",
  "value": "130802" },

{
  "label": "双滦区",
  "value": "130803" },

{
  "label": "鹰手营子矿区",
  "value": "130804" },

{
  "label": "承德县",
  "value": "130821" },

{
  "label": "兴隆县",
  "value": "130822" },

{
  "label": "滦平县",
  "value": "130824" },

{
  "label": "隆化县",
  "value": "130825" },

{
  "label": "丰宁满族自治县",
  "value": "130826" },

{
  "label": "宽城满族自治县",
  "value": "130827" },

{
  "label": "围场满族蒙古族自治县",
  "value": "130828" },

{
  "label": "承德高新技术产业开发区",
  "value": "130871" },

{
  "label": "平泉市",
  "value": "130881" }],


[{
  "label": "新华区",
  "value": "130902" },

{
  "label": "运河区",
  "value": "130903" },

{
  "label": "沧县",
  "value": "130921" },

{
  "label": "青县",
  "value": "130922" },

{
  "label": "东光县",
  "value": "130923" },

{
  "label": "海兴县",
  "value": "130924" },

{
  "label": "盐山县",
  "value": "130925" },

{
  "label": "肃宁县",
  "value": "130926" },

{
  "label": "南皮县",
  "value": "130927" },

{
  "label": "吴桥县",
  "value": "130928" },

{
  "label": "献县",
  "value": "130929" },

{
  "label": "孟村回族自治县",
  "value": "130930" },

{
  "label": "河北沧州经济开发区",
  "value": "130971" },

{
  "label": "沧州高新技术产业开发区",
  "value": "130972" },

{
  "label": "沧州渤海新区",
  "value": "130973" },

{
  "label": "泊头市",
  "value": "130981" },

{
  "label": "任丘市",
  "value": "130982" },

{
  "label": "黄骅市",
  "value": "130983" },

{
  "label": "河间市",
  "value": "130984" }],


[{
  "label": "安次区",
  "value": "131002" },

{
  "label": "广阳区",
  "value": "131003" },

{
  "label": "固安县",
  "value": "131022" },

{
  "label": "永清县",
  "value": "131023" },

{
  "label": "香河县",
  "value": "131024" },

{
  "label": "大城县",
  "value": "131025" },

{
  "label": "文安县",
  "value": "131026" },

{
  "label": "大厂回族自治县",
  "value": "131028" },

{
  "label": "廊坊经济技术开发区",
  "value": "131071" },

{
  "label": "霸州市",
  "value": "131081" },

{
  "label": "三河市",
  "value": "131082" }],


[{
  "label": "桃城区",
  "value": "131102" },

{
  "label": "冀州区",
  "value": "131103" },

{
  "label": "枣强县",
  "value": "131121" },

{
  "label": "武邑县",
  "value": "131122" },

{
  "label": "武强县",
  "value": "131123" },

{
  "label": "饶阳县",
  "value": "131124" },

{
  "label": "安平县",
  "value": "131125" },

{
  "label": "故城县",
  "value": "131126" },

{
  "label": "景县",
  "value": "131127" },

{
  "label": "阜城县",
  "value": "131128" },

{
  "label": "河北衡水经济开发区",
  "value": "131171" },

{
  "label": "衡水滨湖新区",
  "value": "131172" },

{
  "label": "深州市",
  "value": "131182" }]],



[
[{
  "label": "小店区",
  "value": "140105" },

{
  "label": "迎泽区",
  "value": "140106" },

{
  "label": "杏花岭区",
  "value": "140107" },

{
  "label": "尖草坪区",
  "value": "140108" },

{
  "label": "万柏林区",
  "value": "140109" },

{
  "label": "晋源区",
  "value": "140110" },

{
  "label": "清徐县",
  "value": "140121" },

{
  "label": "阳曲县",
  "value": "140122" },

{
  "label": "娄烦县",
  "value": "140123" },

{
  "label": "山西转型综合改革示范区",
  "value": "140171" },

{
  "label": "古交市",
  "value": "140181" }],


[{
  "label": "城区",
  "value": "140202" },

{
  "label": "矿区",
  "value": "140203" },

{
  "label": "南郊区",
  "value": "140211" },

{
  "label": "新荣区",
  "value": "140212" },

{
  "label": "阳高县",
  "value": "140221" },

{
  "label": "天镇县",
  "value": "140222" },

{
  "label": "广灵县",
  "value": "140223" },

{
  "label": "灵丘县",
  "value": "140224" },

{
  "label": "浑源县",
  "value": "140225" },

{
  "label": "左云县",
  "value": "140226" },

{
  "label": "大同县",
  "value": "140227" },

{
  "label": "山西大同经济开发区",
  "value": "140271" }],


[{
  "label": "城区",
  "value": "140302" },

{
  "label": "矿区",
  "value": "140303" },

{
  "label": "郊区",
  "value": "140311" },

{
  "label": "平定县",
  "value": "140321" },

{
  "label": "盂县",
  "value": "140322" },

{
  "label": "山西阳泉经济开发区",
  "value": "140371" }],


[{
  "label": "城区",
  "value": "140402" },

{
  "label": "郊区",
  "value": "140411" },

{
  "label": "长治县",
  "value": "140421" },

{
  "label": "襄垣县",
  "value": "140423" },

{
  "label": "屯留县",
  "value": "140424" },

{
  "label": "平顺县",
  "value": "140425" },

{
  "label": "黎城县",
  "value": "140426" },

{
  "label": "壶关县",
  "value": "140427" },

{
  "label": "长子县",
  "value": "140428" },

{
  "label": "武乡县",
  "value": "140429" },

{
  "label": "沁县",
  "value": "140430" },

{
  "label": "沁源县",
  "value": "140431" },

{
  "label": "山西长治高新技术产业园区",
  "value": "140471" },

{
  "label": "潞城市",
  "value": "140481" }],


[{
  "label": "城区",
  "value": "140502" },

{
  "label": "沁水县",
  "value": "140521" },

{
  "label": "阳城县",
  "value": "140522" },

{
  "label": "陵川县",
  "value": "140524" },

{
  "label": "泽州县",
  "value": "140525" },

{
  "label": "高平市",
  "value": "140581" }],


[{
  "label": "朔城区",
  "value": "140602" },

{
  "label": "平鲁区",
  "value": "140603" },

{
  "label": "山阴县",
  "value": "140621" },

{
  "label": "应县",
  "value": "140622" },

{
  "label": "右玉县",
  "value": "140623" },

{
  "label": "怀仁县",
  "value": "140624" },

{
  "label": "山西朔州经济开发区",
  "value": "140671" }],


[{
  "label": "榆次区",
  "value": "140702" },

{
  "label": "榆社县",
  "value": "140721" },

{
  "label": "左权县",
  "value": "140722" },

{
  "label": "和顺县",
  "value": "140723" },

{
  "label": "昔阳县",
  "value": "140724" },

{
  "label": "寿阳县",
  "value": "140725" },

{
  "label": "太谷县",
  "value": "140726" },

{
  "label": "祁县",
  "value": "140727" },

{
  "label": "平遥县",
  "value": "140728" },

{
  "label": "灵石县",
  "value": "140729" },

{
  "label": "介休市",
  "value": "140781" }],


[{
  "label": "盐湖区",
  "value": "140802" },

{
  "label": "临猗县",
  "value": "140821" },

{
  "label": "万荣县",
  "value": "140822" },

{
  "label": "闻喜县",
  "value": "140823" },

{
  "label": "稷山县",
  "value": "140824" },

{
  "label": "新绛县",
  "value": "140825" },

{
  "label": "绛县",
  "value": "140826" },

{
  "label": "垣曲县",
  "value": "140827" },

{
  "label": "夏县",
  "value": "140828" },

{
  "label": "平陆县",
  "value": "140829" },

{
  "label": "芮城县",
  "value": "140830" },

{
  "label": "永济市",
  "value": "140881" },

{
  "label": "河津市",
  "value": "140882" }],


[{
  "label": "忻府区",
  "value": "140902" },

{
  "label": "定襄县",
  "value": "140921" },

{
  "label": "五台县",
  "value": "140922" },

{
  "label": "代县",
  "value": "140923" },

{
  "label": "繁峙县",
  "value": "140924" },

{
  "label": "宁武县",
  "value": "140925" },

{
  "label": "静乐县",
  "value": "140926" },

{
  "label": "神池县",
  "value": "140927" },

{
  "label": "五寨县",
  "value": "140928" },

{
  "label": "岢岚县",
  "value": "140929" },

{
  "label": "河曲县",
  "value": "140930" },

{
  "label": "保德县",
  "value": "140931" },

{
  "label": "偏关县",
  "value": "140932" },

{
  "label": "五台山风景名胜区",
  "value": "140971" },

{
  "label": "原平市",
  "value": "140981" }],


[{
  "label": "尧都区",
  "value": "141002" },

{
  "label": "曲沃县",
  "value": "141021" },

{
  "label": "翼城县",
  "value": "141022" },

{
  "label": "襄汾县",
  "value": "141023" },

{
  "label": "洪洞县",
  "value": "141024" },

{
  "label": "古县",
  "value": "141025" },

{
  "label": "安泽县",
  "value": "141026" },

{
  "label": "浮山县",
  "value": "141027" },

{
  "label": "吉县",
  "value": "141028" },

{
  "label": "乡宁县",
  "value": "141029" },

{
  "label": "大宁县",
  "value": "141030" },

{
  "label": "隰县",
  "value": "141031" },

{
  "label": "永和县",
  "value": "141032" },

{
  "label": "蒲县",
  "value": "141033" },

{
  "label": "汾西县",
  "value": "141034" },

{
  "label": "侯马市",
  "value": "141081" },

{
  "label": "霍州市",
  "value": "141082" }],


[{
  "label": "离石区",
  "value": "141102" },

{
  "label": "文水县",
  "value": "141121" },

{
  "label": "交城县",
  "value": "141122" },

{
  "label": "兴县",
  "value": "141123" },

{
  "label": "临县",
  "value": "141124" },

{
  "label": "柳林县",
  "value": "141125" },

{
  "label": "石楼县",
  "value": "141126" },

{
  "label": "岚县",
  "value": "141127" },

{
  "label": "方山县",
  "value": "141128" },

{
  "label": "中阳县",
  "value": "141129" },

{
  "label": "交口县",
  "value": "141130" },

{
  "label": "孝义市",
  "value": "141181" },

{
  "label": "汾阳市",
  "value": "141182" }]],



[
[{
  "label": "新城区",
  "value": "150102" },

{
  "label": "回民区",
  "value": "150103" },

{
  "label": "玉泉区",
  "value": "150104" },

{
  "label": "赛罕区",
  "value": "150105" },

{
  "label": "土默特左旗",
  "value": "150121" },

{
  "label": "托克托县",
  "value": "150122" },

{
  "label": "和林格尔县",
  "value": "150123" },

{
  "label": "清水河县",
  "value": "150124" },

{
  "label": "武川县",
  "value": "150125" },

{
  "label": "呼和浩特金海工业园区",
  "value": "150171" },

{
  "label": "呼和浩特经济技术开发区",
  "value": "150172" }],


[{
  "label": "东河区",
  "value": "150202" },

{
  "label": "昆都仑区",
  "value": "150203" },

{
  "label": "青山区",
  "value": "150204" },

{
  "label": "石拐区",
  "value": "150205" },

{
  "label": "白云鄂博矿区",
  "value": "150206" },

{
  "label": "九原区",
  "value": "150207" },

{
  "label": "土默特右旗",
  "value": "150221" },

{
  "label": "固阳县",
  "value": "150222" },

{
  "label": "达尔罕茂明安联合旗",
  "value": "150223" },

{
  "label": "包头稀土高新技术产业开发区",
  "value": "150271" }],


[{
  "label": "海勃湾区",
  "value": "150302" },

{
  "label": "海南区",
  "value": "150303" },

{
  "label": "乌达区",
  "value": "150304" }],


[{
  "label": "红山区",
  "value": "150402" },

{
  "label": "元宝山区",
  "value": "150403" },

{
  "label": "松山区",
  "value": "150404" },

{
  "label": "阿鲁科尔沁旗",
  "value": "150421" },

{
  "label": "巴林左旗",
  "value": "150422" },

{
  "label": "巴林右旗",
  "value": "150423" },

{
  "label": "林西县",
  "value": "150424" },

{
  "label": "克什克腾旗",
  "value": "150425" },

{
  "label": "翁牛特旗",
  "value": "150426" },

{
  "label": "喀喇沁旗",
  "value": "150428" },

{
  "label": "宁城县",
  "value": "150429" },

{
  "label": "敖汉旗",
  "value": "150430" }],


[{
  "label": "科尔沁区",
  "value": "150502" },

{
  "label": "科尔沁左翼中旗",
  "value": "150521" },

{
  "label": "科尔沁左翼后旗",
  "value": "150522" },

{
  "label": "开鲁县",
  "value": "150523" },

{
  "label": "库伦旗",
  "value": "150524" },

{
  "label": "奈曼旗",
  "value": "150525" },

{
  "label": "扎鲁特旗",
  "value": "150526" },

{
  "label": "通辽经济技术开发区",
  "value": "150571" },

{
  "label": "霍林郭勒市",
  "value": "150581" }],


[{
  "label": "东胜区",
  "value": "150602" },

{
  "label": "康巴什区",
  "value": "150603" },

{
  "label": "达拉特旗",
  "value": "150621" },

{
  "label": "准格尔旗",
  "value": "150622" },

{
  "label": "鄂托克前旗",
  "value": "150623" },

{
  "label": "鄂托克旗",
  "value": "150624" },

{
  "label": "杭锦旗",
  "value": "150625" },

{
  "label": "乌审旗",
  "value": "150626" },

{
  "label": "伊金霍洛旗",
  "value": "150627" }],


[{
  "label": "海拉尔区",
  "value": "150702" },

{
  "label": "扎赉诺尔区",
  "value": "150703" },

{
  "label": "阿荣旗",
  "value": "150721" },

{
  "label": "莫力达瓦达斡尔族自治旗",
  "value": "150722" },

{
  "label": "鄂伦春自治旗",
  "value": "150723" },

{
  "label": "鄂温克族自治旗",
  "value": "150724" },

{
  "label": "陈巴尔虎旗",
  "value": "150725" },

{
  "label": "新巴尔虎左旗",
  "value": "150726" },

{
  "label": "新巴尔虎右旗",
  "value": "150727" },

{
  "label": "满洲里市",
  "value": "150781" },

{
  "label": "牙克石市",
  "value": "150782" },

{
  "label": "扎兰屯市",
  "value": "150783" },

{
  "label": "额尔古纳市",
  "value": "150784" },

{
  "label": "根河市",
  "value": "150785" }],


[{
  "label": "临河区",
  "value": "150802" },

{
  "label": "五原县",
  "value": "150821" },

{
  "label": "磴口县",
  "value": "150822" },

{
  "label": "乌拉特前旗",
  "value": "150823" },

{
  "label": "乌拉特中旗",
  "value": "150824" },

{
  "label": "乌拉特后旗",
  "value": "150825" },

{
  "label": "杭锦后旗",
  "value": "150826" }],


[{
  "label": "集宁区",
  "value": "150902" },

{
  "label": "卓资县",
  "value": "150921" },

{
  "label": "化德县",
  "value": "150922" },

{
  "label": "商都县",
  "value": "150923" },

{
  "label": "兴和县",
  "value": "150924" },

{
  "label": "凉城县",
  "value": "150925" },

{
  "label": "察哈尔右翼前旗",
  "value": "150926" },

{
  "label": "察哈尔右翼中旗",
  "value": "150927" },

{
  "label": "察哈尔右翼后旗",
  "value": "150928" },

{
  "label": "四子王旗",
  "value": "150929" },

{
  "label": "丰镇市",
  "value": "150981" }],


[{
  "label": "乌兰浩特市",
  "value": "152201" },

{
  "label": "阿尔山市",
  "value": "152202" },

{
  "label": "科尔沁右翼前旗",
  "value": "152221" },

{
  "label": "科尔沁右翼中旗",
  "value": "152222" },

{
  "label": "扎赉特旗",
  "value": "152223" },

{
  "label": "突泉县",
  "value": "152224" }],


[{
  "label": "二连浩特市",
  "value": "152501" },

{
  "label": "锡林浩特市",
  "value": "152502" },

{
  "label": "阿巴嘎旗",
  "value": "152522" },

{
  "label": "苏尼特左旗",
  "value": "152523" },

{
  "label": "苏尼特右旗",
  "value": "152524" },

{
  "label": "东乌珠穆沁旗",
  "value": "152525" },

{
  "label": "西乌珠穆沁旗",
  "value": "152526" },

{
  "label": "太仆寺旗",
  "value": "152527" },

{
  "label": "镶黄旗",
  "value": "152528" },

{
  "label": "正镶白旗",
  "value": "152529" },

{
  "label": "正蓝旗",
  "value": "152530" },

{
  "label": "多伦县",
  "value": "152531" },

{
  "label": "乌拉盖管委会",
  "value": "152571" }],


[{
  "label": "阿拉善左旗",
  "value": "152921" },

{
  "label": "阿拉善右旗",
  "value": "152922" },

{
  "label": "额济纳旗",
  "value": "152923" },

{
  "label": "内蒙古阿拉善经济开发区",
  "value": "152971" }]],



[
[{
  "label": "和平区",
  "value": "210102" },

{
  "label": "沈河区",
  "value": "210103" },

{
  "label": "大东区",
  "value": "210104" },

{
  "label": "皇姑区",
  "value": "210105" },

{
  "label": "铁西区",
  "value": "210106" },

{
  "label": "苏家屯区",
  "value": "210111" },

{
  "label": "浑南区",
  "value": "210112" },

{
  "label": "沈北新区",
  "value": "210113" },

{
  "label": "于洪区",
  "value": "210114" },

{
  "label": "辽中区",
  "value": "210115" },

{
  "label": "康平县",
  "value": "210123" },

{
  "label": "法库县",
  "value": "210124" },

{
  "label": "新民市",
  "value": "210181" }],


[{
  "label": "中山区",
  "value": "210202" },

{
  "label": "西岗区",
  "value": "210203" },

{
  "label": "沙河口区",
  "value": "210204" },

{
  "label": "甘井子区",
  "value": "210211" },

{
  "label": "旅顺口区",
  "value": "210212" },

{
  "label": "金州区",
  "value": "210213" },

{
  "label": "普兰店区",
  "value": "210214" },

{
  "label": "长海县",
  "value": "210224" },

{
  "label": "瓦房店市",
  "value": "210281" },

{
  "label": "庄河市",
  "value": "210283" }],


[{
  "label": "铁东区",
  "value": "210302" },

{
  "label": "铁西区",
  "value": "210303" },

{
  "label": "立山区",
  "value": "210304" },

{
  "label": "千山区",
  "value": "210311" },

{
  "label": "台安县",
  "value": "210321" },

{
  "label": "岫岩满族自治县",
  "value": "210323" },

{
  "label": "海城市",
  "value": "210381" }],


[{
  "label": "新抚区",
  "value": "210402" },

{
  "label": "东洲区",
  "value": "210403" },

{
  "label": "望花区",
  "value": "210404" },

{
  "label": "顺城区",
  "value": "210411" },

{
  "label": "抚顺县",
  "value": "210421" },

{
  "label": "新宾满族自治县",
  "value": "210422" },

{
  "label": "清原满族自治县",
  "value": "210423" }],


[{
  "label": "平山区",
  "value": "210502" },

{
  "label": "溪湖区",
  "value": "210503" },

{
  "label": "明山区",
  "value": "210504" },

{
  "label": "南芬区",
  "value": "210505" },

{
  "label": "本溪满族自治县",
  "value": "210521" },

{
  "label": "桓仁满族自治县",
  "value": "210522" }],


[{
  "label": "元宝区",
  "value": "210602" },

{
  "label": "振兴区",
  "value": "210603" },

{
  "label": "振安区",
  "value": "210604" },

{
  "label": "宽甸满族自治县",
  "value": "210624" },

{
  "label": "东港市",
  "value": "210681" },

{
  "label": "凤城市",
  "value": "210682" }],


[{
  "label": "古塔区",
  "value": "210702" },

{
  "label": "凌河区",
  "value": "210703" },

{
  "label": "太和区",
  "value": "210711" },

{
  "label": "黑山县",
  "value": "210726" },

{
  "label": "义县",
  "value": "210727" },

{
  "label": "凌海市",
  "value": "210781" },

{
  "label": "北镇市",
  "value": "210782" }],


[{
  "label": "站前区",
  "value": "210802" },

{
  "label": "西市区",
  "value": "210803" },

{
  "label": "鲅鱼圈区",
  "value": "210804" },

{
  "label": "老边区",
  "value": "210811" },

{
  "label": "盖州市",
  "value": "210881" },

{
  "label": "大石桥市",
  "value": "210882" }],


[{
  "label": "海州区",
  "value": "210902" },

{
  "label": "新邱区",
  "value": "210903" },

{
  "label": "太平区",
  "value": "210904" },

{
  "label": "清河门区",
  "value": "210905" },

{
  "label": "细河区",
  "value": "210911" },

{
  "label": "阜新蒙古族自治县",
  "value": "210921" },

{
  "label": "彰武县",
  "value": "210922" }],


[{
  "label": "白塔区",
  "value": "211002" },

{
  "label": "文圣区",
  "value": "211003" },

{
  "label": "宏伟区",
  "value": "211004" },

{
  "label": "弓长岭区",
  "value": "211005" },

{
  "label": "太子河区",
  "value": "211011" },

{
  "label": "辽阳县",
  "value": "211021" },

{
  "label": "灯塔市",
  "value": "211081" }],


[{
  "label": "双台子区",
  "value": "211102" },

{
  "label": "兴隆台区",
  "value": "211103" },

{
  "label": "大洼区",
  "value": "211104" },

{
  "label": "盘山县",
  "value": "211122" }],


[{
  "label": "银州区",
  "value": "211202" },

{
  "label": "清河区",
  "value": "211204" },

{
  "label": "铁岭县",
  "value": "211221" },

{
  "label": "西丰县",
  "value": "211223" },

{
  "label": "昌图县",
  "value": "211224" },

{
  "label": "调兵山市",
  "value": "211281" },

{
  "label": "开原市",
  "value": "211282" }],


[{
  "label": "双塔区",
  "value": "211302" },

{
  "label": "龙城区",
  "value": "211303" },

{
  "label": "朝阳县",
  "value": "211321" },

{
  "label": "建平县",
  "value": "211322" },

{
  "label": "喀喇沁左翼蒙古族自治县",
  "value": "211324" },

{
  "label": "北票市",
  "value": "211381" },

{
  "label": "凌源市",
  "value": "211382" }],


[{
  "label": "连山区",
  "value": "211402" },

{
  "label": "龙港区",
  "value": "211403" },

{
  "label": "南票区",
  "value": "211404" },

{
  "label": "绥中县",
  "value": "211421" },

{
  "label": "建昌县",
  "value": "211422" },

{
  "label": "兴城市",
  "value": "211481" }]],



[
[{
  "label": "南关区",
  "value": "220102" },

{
  "label": "宽城区",
  "value": "220103" },

{
  "label": "朝阳区",
  "value": "220104" },

{
  "label": "二道区",
  "value": "220105" },

{
  "label": "绿园区",
  "value": "220106" },

{
  "label": "双阳区",
  "value": "220112" },

{
  "label": "九台区",
  "value": "220113" },

{
  "label": "农安县",
  "value": "220122" },

{
  "label": "长春经济技术开发区",
  "value": "220171" },

{
  "label": "长春净月高新技术产业开发区",
  "value": "220172" },

{
  "label": "长春高新技术产业开发区",
  "value": "220173" },

{
  "label": "长春汽车经济技术开发区",
  "value": "220174" },

{
  "label": "榆树市",
  "value": "220182" },

{
  "label": "德惠市",
  "value": "220183" }],


[{
  "label": "昌邑区",
  "value": "220202" },

{
  "label": "龙潭区",
  "value": "220203" },

{
  "label": "船营区",
  "value": "220204" },

{
  "label": "丰满区",
  "value": "220211" },

{
  "label": "永吉县",
  "value": "220221" },

{
  "label": "吉林经济开发区",
  "value": "220271" },

{
  "label": "吉林高新技术产业开发区",
  "value": "220272" },

{
  "label": "吉林中国新加坡食品区",
  "value": "220273" },

{
  "label": "蛟河市",
  "value": "220281" },

{
  "label": "桦甸市",
  "value": "220282" },

{
  "label": "舒兰市",
  "value": "220283" },

{
  "label": "磐石市",
  "value": "220284" }],


[{
  "label": "铁西区",
  "value": "220302" },

{
  "label": "铁东区",
  "value": "220303" },

{
  "label": "梨树县",
  "value": "220322" },

{
  "label": "伊通满族自治县",
  "value": "220323" },

{
  "label": "公主岭市",
  "value": "220381" },

{
  "label": "双辽市",
  "value": "220382" }],


[{
  "label": "龙山区",
  "value": "220402" },

{
  "label": "西安区",
  "value": "220403" },

{
  "label": "东丰县",
  "value": "220421" },

{
  "label": "东辽县",
  "value": "220422" }],


[{
  "label": "东昌区",
  "value": "220502" },

{
  "label": "二道江区",
  "value": "220503" },

{
  "label": "通化县",
  "value": "220521" },

{
  "label": "辉南县",
  "value": "220523" },

{
  "label": "柳河县",
  "value": "220524" },

{
  "label": "梅河口市",
  "value": "220581" },

{
  "label": "集安市",
  "value": "220582" }],


[{
  "label": "浑江区",
  "value": "220602" },

{
  "label": "江源区",
  "value": "220605" },

{
  "label": "抚松县",
  "value": "220621" },

{
  "label": "靖宇县",
  "value": "220622" },

{
  "label": "长白朝鲜族自治县",
  "value": "220623" },

{
  "label": "临江市",
  "value": "220681" }],


[{
  "label": "宁江区",
  "value": "220702" },

{
  "label": "前郭尔罗斯蒙古族自治县",
  "value": "220721" },

{
  "label": "长岭县",
  "value": "220722" },

{
  "label": "乾安县",
  "value": "220723" },

{
  "label": "吉林松原经济开发区",
  "value": "220771" },

{
  "label": "扶余市",
  "value": "220781" }],


[{
  "label": "洮北区",
  "value": "220802" },

{
  "label": "镇赉县",
  "value": "220821" },

{
  "label": "通榆县",
  "value": "220822" },

{
  "label": "吉林白城经济开发区",
  "value": "220871" },

{
  "label": "洮南市",
  "value": "220881" },

{
  "label": "大安市",
  "value": "220882" }],


[{
  "label": "延吉市",
  "value": "222401" },

{
  "label": "图们市",
  "value": "222402" },

{
  "label": "敦化市",
  "value": "222403" },

{
  "label": "珲春市",
  "value": "222404" },

{
  "label": "龙井市",
  "value": "222405" },

{
  "label": "和龙市",
  "value": "222406" },

{
  "label": "汪清县",
  "value": "222424" },

{
  "label": "安图县",
  "value": "222426" }]],



[
[{
  "label": "道里区",
  "value": "230102" },

{
  "label": "南岗区",
  "value": "230103" },

{
  "label": "道外区",
  "value": "230104" },

{
  "label": "平房区",
  "value": "230108" },

{
  "label": "松北区",
  "value": "230109" },

{
  "label": "香坊区",
  "value": "230110" },

{
  "label": "呼兰区",
  "value": "230111" },

{
  "label": "阿城区",
  "value": "230112" },

{
  "label": "双城区",
  "value": "230113" },

{
  "label": "依兰县",
  "value": "230123" },

{
  "label": "方正县",
  "value": "230124" },

{
  "label": "宾县",
  "value": "230125" },

{
  "label": "巴彦县",
  "value": "230126" },

{
  "label": "木兰县",
  "value": "230127" },

{
  "label": "通河县",
  "value": "230128" },

{
  "label": "延寿县",
  "value": "230129" },

{
  "label": "尚志市",
  "value": "230183" },

{
  "label": "五常市",
  "value": "230184" }],


[{
  "label": "龙沙区",
  "value": "230202" },

{
  "label": "建华区",
  "value": "230203" },

{
  "label": "铁锋区",
  "value": "230204" },

{
  "label": "昂昂溪区",
  "value": "230205" },

{
  "label": "富拉尔基区",
  "value": "230206" },

{
  "label": "碾子山区",
  "value": "230207" },

{
  "label": "梅里斯达斡尔族区",
  "value": "230208" },

{
  "label": "龙江县",
  "value": "230221" },

{
  "label": "依安县",
  "value": "230223" },

{
  "label": "泰来县",
  "value": "230224" },

{
  "label": "甘南县",
  "value": "230225" },

{
  "label": "富裕县",
  "value": "230227" },

{
  "label": "克山县",
  "value": "230229" },

{
  "label": "克东县",
  "value": "230230" },

{
  "label": "拜泉县",
  "value": "230231" },

{
  "label": "讷河市",
  "value": "230281" }],


[{
  "label": "鸡冠区",
  "value": "230302" },

{
  "label": "恒山区",
  "value": "230303" },

{
  "label": "滴道区",
  "value": "230304" },

{
  "label": "梨树区",
  "value": "230305" },

{
  "label": "城子河区",
  "value": "230306" },

{
  "label": "麻山区",
  "value": "230307" },

{
  "label": "鸡东县",
  "value": "230321" },

{
  "label": "虎林市",
  "value": "230381" },

{
  "label": "密山市",
  "value": "230382" }],


[{
  "label": "向阳区",
  "value": "230402" },

{
  "label": "工农区",
  "value": "230403" },

{
  "label": "南山区",
  "value": "230404" },

{
  "label": "兴安区",
  "value": "230405" },

{
  "label": "东山区",
  "value": "230406" },

{
  "label": "兴山区",
  "value": "230407" },

{
  "label": "萝北县",
  "value": "230421" },

{
  "label": "绥滨县",
  "value": "230422" }],


[{
  "label": "尖山区",
  "value": "230502" },

{
  "label": "岭东区",
  "value": "230503" },

{
  "label": "四方台区",
  "value": "230505" },

{
  "label": "宝山区",
  "value": "230506" },

{
  "label": "集贤县",
  "value": "230521" },

{
  "label": "友谊县",
  "value": "230522" },

{
  "label": "宝清县",
  "value": "230523" },

{
  "label": "饶河县",
  "value": "230524" }],


[{
  "label": "萨尔图区",
  "value": "230602" },

{
  "label": "龙凤区",
  "value": "230603" },

{
  "label": "让胡路区",
  "value": "230604" },

{
  "label": "红岗区",
  "value": "230605" },

{
  "label": "大同区",
  "value": "230606" },

{
  "label": "肇州县",
  "value": "230621" },

{
  "label": "肇源县",
  "value": "230622" },

{
  "label": "林甸县",
  "value": "230623" },

{
  "label": "杜尔伯特蒙古族自治县",
  "value": "230624" },

{
  "label": "大庆高新技术产业开发区",
  "value": "230671" }],


[{
  "label": "伊春区",
  "value": "230702" },

{
  "label": "南岔区",
  "value": "230703" },

{
  "label": "友好区",
  "value": "230704" },

{
  "label": "西林区",
  "value": "230705" },

{
  "label": "翠峦区",
  "value": "230706" },

{
  "label": "新青区",
  "value": "230707" },

{
  "label": "美溪区",
  "value": "230708" },

{
  "label": "金山屯区",
  "value": "230709" },

{
  "label": "五营区",
  "value": "230710" },

{
  "label": "乌马河区",
  "value": "230711" },

{
  "label": "汤旺河区",
  "value": "230712" },

{
  "label": "带岭区",
  "value": "230713" },

{
  "label": "乌伊岭区",
  "value": "230714" },

{
  "label": "红星区",
  "value": "230715" },

{
  "label": "上甘岭区",
  "value": "230716" },

{
  "label": "嘉荫县",
  "value": "230722" },

{
  "label": "铁力市",
  "value": "230781" }],


[{
  "label": "向阳区",
  "value": "230803" },

{
  "label": "前进区",
  "value": "230804" },

{
  "label": "东风区",
  "value": "230805" },

{
  "label": "郊区",
  "value": "230811" },

{
  "label": "桦南县",
  "value": "230822" },

{
  "label": "桦川县",
  "value": "230826" },

{
  "label": "汤原县",
  "value": "230828" },

{
  "label": "同江市",
  "value": "230881" },

{
  "label": "富锦市",
  "value": "230882" },

{
  "label": "抚远市",
  "value": "230883" }],


[{
  "label": "新兴区",
  "value": "230902" },

{
  "label": "桃山区",
  "value": "230903" },

{
  "label": "茄子河区",
  "value": "230904" },

{
  "label": "勃利县",
  "value": "230921" }],


[{
  "label": "东安区",
  "value": "231002" },

{
  "label": "阳明区",
  "value": "231003" },

{
  "label": "爱民区",
  "value": "231004" },

{
  "label": "西安区",
  "value": "231005" },

{
  "label": "林口县",
  "value": "231025" },

{
  "label": "牡丹江经济技术开发区",
  "value": "231071" },

{
  "label": "绥芬河市",
  "value": "231081" },

{
  "label": "海林市",
  "value": "231083" },

{
  "label": "宁安市",
  "value": "231084" },

{
  "label": "穆棱市",
  "value": "231085" },

{
  "label": "东宁市",
  "value": "231086" }],


[{
  "label": "爱辉区",
  "value": "231102" },

{
  "label": "嫩江县",
  "value": "231121" },

{
  "label": "逊克县",
  "value": "231123" },

{
  "label": "孙吴县",
  "value": "231124" },

{
  "label": "北安市",
  "value": "231181" },

{
  "label": "五大连池市",
  "value": "231182" }],


[{
  "label": "北林区",
  "value": "231202" },

{
  "label": "望奎县",
  "value": "231221" },

{
  "label": "兰西县",
  "value": "231222" },

{
  "label": "青冈县",
  "value": "231223" },

{
  "label": "庆安县",
  "value": "231224" },

{
  "label": "明水县",
  "value": "231225" },

{
  "label": "绥棱县",
  "value": "231226" },

{
  "label": "安达市",
  "value": "231281" },

{
  "label": "肇东市",
  "value": "231282" },

{
  "label": "海伦市",
  "value": "231283" }],


[{
  "label": "加格达奇区",
  "value": "232701" },

{
  "label": "松岭区",
  "value": "232702" },

{
  "label": "新林区",
  "value": "232703" },

{
  "label": "呼中区",
  "value": "232704" },

{
  "label": "呼玛县",
  "value": "232721" },

{
  "label": "塔河县",
  "value": "232722" },

{
  "label": "漠河县",
  "value": "232723" }]],



[
[{
  "label": "黄浦区",
  "value": "310101" },

{
  "label": "徐汇区",
  "value": "310104" },

{
  "label": "长宁区",
  "value": "310105" },

{
  "label": "静安区",
  "value": "310106" },

{
  "label": "普陀区",
  "value": "310107" },

{
  "label": "虹口区",
  "value": "310109" },

{
  "label": "杨浦区",
  "value": "310110" },

{
  "label": "闵行区",
  "value": "310112" },

{
  "label": "宝山区",
  "value": "310113" },

{
  "label": "嘉定区",
  "value": "310114" },

{
  "label": "浦东新区",
  "value": "310115" },

{
  "label": "金山区",
  "value": "310116" },

{
  "label": "松江区",
  "value": "310117" },

{
  "label": "青浦区",
  "value": "310118" },

{
  "label": "奉贤区",
  "value": "310120" },

{
  "label": "崇明区",
  "value": "310151" }]],



[
[{
  "label": "玄武区",
  "value": "320102" },

{
  "label": "秦淮区",
  "value": "320104" },

{
  "label": "建邺区",
  "value": "320105" },

{
  "label": "鼓楼区",
  "value": "320106" },

{
  "label": "浦口区",
  "value": "320111" },

{
  "label": "栖霞区",
  "value": "320113" },

{
  "label": "雨花台区",
  "value": "320114" },

{
  "label": "江宁区",
  "value": "320115" },

{
  "label": "六合区",
  "value": "320116" },

{
  "label": "溧水区",
  "value": "320117" },

{
  "label": "高淳区",
  "value": "320118" }],


[{
  "label": "锡山区",
  "value": "320205" },

{
  "label": "惠山区",
  "value": "320206" },

{
  "label": "滨湖区",
  "value": "320211" },

{
  "label": "梁溪区",
  "value": "320213" },

{
  "label": "新吴区",
  "value": "320214" },

{
  "label": "江阴市",
  "value": "320281" },

{
  "label": "宜兴市",
  "value": "320282" }],


[{
  "label": "鼓楼区",
  "value": "320302" },

{
  "label": "云龙区",
  "value": "320303" },

{
  "label": "贾汪区",
  "value": "320305" },

{
  "label": "泉山区",
  "value": "320311" },

{
  "label": "铜山区",
  "value": "320312" },

{
  "label": "丰县",
  "value": "320321" },

{
  "label": "沛县",
  "value": "320322" },

{
  "label": "睢宁县",
  "value": "320324" },

{
  "label": "徐州经济技术开发区",
  "value": "320371" },

{
  "label": "新沂市",
  "value": "320381" },

{
  "label": "邳州市",
  "value": "320382" }],


[{
  "label": "天宁区",
  "value": "320402" },

{
  "label": "钟楼区",
  "value": "320404" },

{
  "label": "新北区",
  "value": "320411" },

{
  "label": "武进区",
  "value": "320412" },

{
  "label": "金坛区",
  "value": "320413" },

{
  "label": "溧阳市",
  "value": "320481" }],


[{
  "label": "虎丘区",
  "value": "320505" },

{
  "label": "吴中区",
  "value": "320506" },

{
  "label": "相城区",
  "value": "320507" },

{
  "label": "姑苏区",
  "value": "320508" },

{
  "label": "吴江区",
  "value": "320509" },

{
  "label": "苏州工业园区",
  "value": "320571" },

{
  "label": "常熟市",
  "value": "320581" },

{
  "label": "张家港市",
  "value": "320582" },

{
  "label": "昆山市",
  "value": "320583" },

{
  "label": "太仓市",
  "value": "320585" }],


[{
  "label": "崇川区",
  "value": "320602" },

{
  "label": "港闸区",
  "value": "320611" },

{
  "label": "通州区",
  "value": "320612" },

{
  "label": "海安县",
  "value": "320621" },

{
  "label": "如东县",
  "value": "320623" },

{
  "label": "南通经济技术开发区",
  "value": "320671" },

{
  "label": "启东市",
  "value": "320681" },

{
  "label": "如皋市",
  "value": "320682" },

{
  "label": "海门市",
  "value": "320684" }],


[{
  "label": "连云区",
  "value": "320703" },

{
  "label": "海州区",
  "value": "320706" },

{
  "label": "赣榆区",
  "value": "320707" },

{
  "label": "东海县",
  "value": "320722" },

{
  "label": "灌云县",
  "value": "320723" },

{
  "label": "灌南县",
  "value": "320724" },

{
  "label": "连云港经济技术开发区",
  "value": "320771" },

{
  "label": "连云港高新技术产业开发区",
  "value": "320772" }],


[{
  "label": "淮安区",
  "value": "320803" },

{
  "label": "淮阴区",
  "value": "320804" },

{
  "label": "清江浦区",
  "value": "320812" },

{
  "label": "洪泽区",
  "value": "320813" },

{
  "label": "涟水县",
  "value": "320826" },

{
  "label": "盱眙县",
  "value": "320830" },

{
  "label": "金湖县",
  "value": "320831" },

{
  "label": "淮安经济技术开发区",
  "value": "320871" }],


[{
  "label": "亭湖区",
  "value": "320902" },

{
  "label": "盐都区",
  "value": "320903" },

{
  "label": "大丰区",
  "value": "320904" },

{
  "label": "响水县",
  "value": "320921" },

{
  "label": "滨海县",
  "value": "320922" },

{
  "label": "阜宁县",
  "value": "320923" },

{
  "label": "射阳县",
  "value": "320924" },

{
  "label": "建湖县",
  "value": "320925" },

{
  "label": "盐城经济技术开发区",
  "value": "320971" },

{
  "label": "东台市",
  "value": "320981" }],


[{
  "label": "广陵区",
  "value": "321002" },

{
  "label": "邗江区",
  "value": "321003" },

{
  "label": "江都区",
  "value": "321012" },

{
  "label": "宝应县",
  "value": "321023" },

{
  "label": "扬州经济技术开发区",
  "value": "321071" },

{
  "label": "仪征市",
  "value": "321081" },

{
  "label": "高邮市",
  "value": "321084" }],


[{
  "label": "京口区",
  "value": "321102" },

{
  "label": "润州区",
  "value": "321111" },

{
  "label": "丹徒区",
  "value": "321112" },

{
  "label": "镇江新区",
  "value": "321171" },

{
  "label": "丹阳市",
  "value": "321181" },

{
  "label": "扬中市",
  "value": "321182" },

{
  "label": "句容市",
  "value": "321183" }],


[{
  "label": "海陵区",
  "value": "321202" },

{
  "label": "高港区",
  "value": "321203" },

{
  "label": "姜堰区",
  "value": "321204" },

{
  "label": "泰州医药高新技术产业开发区",
  "value": "321271" },

{
  "label": "兴化市",
  "value": "321281" },

{
  "label": "靖江市",
  "value": "321282" },

{
  "label": "泰兴市",
  "value": "321283" }],


[{
  "label": "宿城区",
  "value": "321302" },

{
  "label": "宿豫区",
  "value": "321311" },

{
  "label": "沭阳县",
  "value": "321322" },

{
  "label": "泗阳县",
  "value": "321323" },

{
  "label": "泗洪县",
  "value": "321324" },

{
  "label": "宿迁经济技术开发区",
  "value": "321371" }]],



[
[{
  "label": "上城区",
  "value": "330102" },

{
  "label": "下城区",
  "value": "330103" },

{
  "label": "江干区",
  "value": "330104" },

{
  "label": "拱墅区",
  "value": "330105" },

{
  "label": "西湖区",
  "value": "330106" },

{
  "label": "滨江区",
  "value": "330108" },

{
  "label": "萧山区",
  "value": "330109" },

{
  "label": "余杭区",
  "value": "330110" },

{
  "label": "富阳区",
  "value": "330111" },

{
  "label": "临安区",
  "value": "330112" },

{
  "label": "桐庐县",
  "value": "330122" },

{
  "label": "淳安县",
  "value": "330127" },

{
  "label": "建德市",
  "value": "330182" }],


[{
  "label": "海曙区",
  "value": "330203" },

{
  "label": "江北区",
  "value": "330205" },

{
  "label": "北仑区",
  "value": "330206" },

{
  "label": "镇海区",
  "value": "330211" },

{
  "label": "鄞州区",
  "value": "330212" },

{
  "label": "奉化区",
  "value": "330213" },

{
  "label": "象山县",
  "value": "330225" },

{
  "label": "宁海县",
  "value": "330226" },

{
  "label": "余姚市",
  "value": "330281" },

{
  "label": "慈溪市",
  "value": "330282" }],


[{
  "label": "鹿城区",
  "value": "330302" },

{
  "label": "龙湾区",
  "value": "330303" },

{
  "label": "瓯海区",
  "value": "330304" },

{
  "label": "洞头区",
  "value": "330305" },

{
  "label": "永嘉县",
  "value": "330324" },

{
  "label": "平阳县",
  "value": "330326" },

{
  "label": "苍南县",
  "value": "330327" },

{
  "label": "文成县",
  "value": "330328" },

{
  "label": "泰顺县",
  "value": "330329" },

{
  "label": "温州经济技术开发区",
  "value": "330371" },

{
  "label": "瑞安市",
  "value": "330381" },

{
  "label": "乐清市",
  "value": "330382" }],


[{
  "label": "南湖区",
  "value": "330402" },

{
  "label": "秀洲区",
  "value": "330411" },

{
  "label": "嘉善县",
  "value": "330421" },

{
  "label": "海盐县",
  "value": "330424" },

{
  "label": "海宁市",
  "value": "330481" },

{
  "label": "平湖市",
  "value": "330482" },

{
  "label": "桐乡市",
  "value": "330483" }],


[{
  "label": "吴兴区",
  "value": "330502" },

{
  "label": "南浔区",
  "value": "330503" },

{
  "label": "德清县",
  "value": "330521" },

{
  "label": "长兴县",
  "value": "330522" },

{
  "label": "安吉县",
  "value": "330523" }],


[{
  "label": "越城区",
  "value": "330602" },

{
  "label": "柯桥区",
  "value": "330603" },

{
  "label": "上虞区",
  "value": "330604" },

{
  "label": "新昌县",
  "value": "330624" },

{
  "label": "诸暨市",
  "value": "330681" },

{
  "label": "嵊州市",
  "value": "330683" }],


[{
  "label": "婺城区",
  "value": "330702" },

{
  "label": "金东区",
  "value": "330703" },

{
  "label": "武义县",
  "value": "330723" },

{
  "label": "浦江县",
  "value": "330726" },

{
  "label": "磐安县",
  "value": "330727" },

{
  "label": "兰溪市",
  "value": "330781" },

{
  "label": "义乌市",
  "value": "330782" },

{
  "label": "东阳市",
  "value": "330783" },

{
  "label": "永康市",
  "value": "330784" }],


[{
  "label": "柯城区",
  "value": "330802" },

{
  "label": "衢江区",
  "value": "330803" },

{
  "label": "常山县",
  "value": "330822" },

{
  "label": "开化县",
  "value": "330824" },

{
  "label": "龙游县",
  "value": "330825" },

{
  "label": "江山市",
  "value": "330881" }],


[{
  "label": "定海区",
  "value": "330902" },

{
  "label": "普陀区",
  "value": "330903" },

{
  "label": "岱山县",
  "value": "330921" },

{
  "label": "嵊泗县",
  "value": "330922" }],


[{
  "label": "椒江区",
  "value": "331002" },

{
  "label": "黄岩区",
  "value": "331003" },

{
  "label": "路桥区",
  "value": "331004" },

{
  "label": "三门县",
  "value": "331022" },

{
  "label": "天台县",
  "value": "331023" },

{
  "label": "仙居县",
  "value": "331024" },

{
  "label": "温岭市",
  "value": "331081" },

{
  "label": "临海市",
  "value": "331082" },

{
  "label": "玉环市",
  "value": "331083" }],


[{
  "label": "莲都区",
  "value": "331102" },

{
  "label": "青田县",
  "value": "331121" },

{
  "label": "缙云县",
  "value": "331122" },

{
  "label": "遂昌县",
  "value": "331123" },

{
  "label": "松阳县",
  "value": "331124" },

{
  "label": "云和县",
  "value": "331125" },

{
  "label": "庆元县",
  "value": "331126" },

{
  "label": "景宁畲族自治县",
  "value": "331127" },

{
  "label": "龙泉市",
  "value": "331181" }]],



[
[{
  "label": "瑶海区",
  "value": "340102" },

{
  "label": "庐阳区",
  "value": "340103" },

{
  "label": "蜀山区",
  "value": "340104" },

{
  "label": "包河区",
  "value": "340111" },

{
  "label": "长丰县",
  "value": "340121" },

{
  "label": "肥东县",
  "value": "340122" },

{
  "label": "肥西县",
  "value": "340123" },

{
  "label": "庐江县",
  "value": "340124" },

{
  "label": "合肥高新技术产业开发区",
  "value": "340171" },

{
  "label": "合肥经济技术开发区",
  "value": "340172" },

{
  "label": "合肥新站高新技术产业开发区",
  "value": "340173" },

{
  "label": "巢湖市",
  "value": "340181" }],


[{
  "label": "镜湖区",
  "value": "340202" },

{
  "label": "弋江区",
  "value": "340203" },

{
  "label": "鸠江区",
  "value": "340207" },

{
  "label": "三山区",
  "value": "340208" },

{
  "label": "芜湖县",
  "value": "340221" },

{
  "label": "繁昌县",
  "value": "340222" },

{
  "label": "南陵县",
  "value": "340223" },

{
  "label": "无为县",
  "value": "340225" },

{
  "label": "芜湖经济技术开发区",
  "value": "340271" },

{
  "label": "安徽芜湖长江大桥经济开发区",
  "value": "340272" }],


[{
  "label": "龙子湖区",
  "value": "340302" },

{
  "label": "蚌山区",
  "value": "340303" },

{
  "label": "禹会区",
  "value": "340304" },

{
  "label": "淮上区",
  "value": "340311" },

{
  "label": "怀远县",
  "value": "340321" },

{
  "label": "五河县",
  "value": "340322" },

{
  "label": "固镇县",
  "value": "340323" },

{
  "label": "蚌埠市高新技术开发区",
  "value": "340371" },

{
  "label": "蚌埠市经济开发区",
  "value": "340372" }],


[{
  "label": "大通区",
  "value": "340402" },

{
  "label": "田家庵区",
  "value": "340403" },

{
  "label": "谢家集区",
  "value": "340404" },

{
  "label": "八公山区",
  "value": "340405" },

{
  "label": "潘集区",
  "value": "340406" },

{
  "label": "凤台县",
  "value": "340421" },

{
  "label": "寿县",
  "value": "340422" }],


[{
  "label": "花山区",
  "value": "340503" },

{
  "label": "雨山区",
  "value": "340504" },

{
  "label": "博望区",
  "value": "340506" },

{
  "label": "当涂县",
  "value": "340521" },

{
  "label": "含山县",
  "value": "340522" },

{
  "label": "和县",
  "value": "340523" }],


[{
  "label": "杜集区",
  "value": "340602" },

{
  "label": "相山区",
  "value": "340603" },

{
  "label": "烈山区",
  "value": "340604" },

{
  "label": "濉溪县",
  "value": "340621" }],


[{
  "label": "铜官区",
  "value": "340705" },

{
  "label": "义安区",
  "value": "340706" },

{
  "label": "郊区",
  "value": "340711" },

{
  "label": "枞阳县",
  "value": "340722" }],


[{
  "label": "迎江区",
  "value": "340802" },

{
  "label": "大观区",
  "value": "340803" },

{
  "label": "宜秀区",
  "value": "340811" },

{
  "label": "怀宁县",
  "value": "340822" },

{
  "label": "潜山县",
  "value": "340824" },

{
  "label": "太湖县",
  "value": "340825" },

{
  "label": "宿松县",
  "value": "340826" },

{
  "label": "望江县",
  "value": "340827" },

{
  "label": "岳西县",
  "value": "340828" },

{
  "label": "安徽安庆经济开发区",
  "value": "340871" },

{
  "label": "桐城市",
  "value": "340881" }],


[{
  "label": "屯溪区",
  "value": "341002" },

{
  "label": "黄山区",
  "value": "341003" },

{
  "label": "徽州区",
  "value": "341004" },

{
  "label": "歙县",
  "value": "341021" },

{
  "label": "休宁县",
  "value": "341022" },

{
  "label": "黟县",
  "value": "341023" },

{
  "label": "祁门县",
  "value": "341024" }],


[{
  "label": "琅琊区",
  "value": "341102" },

{
  "label": "南谯区",
  "value": "341103" },

{
  "label": "来安县",
  "value": "341122" },

{
  "label": "全椒县",
  "value": "341124" },

{
  "label": "定远县",
  "value": "341125" },

{
  "label": "凤阳县",
  "value": "341126" },

{
  "label": "苏滁现代产业园",
  "value": "341171" },

{
  "label": "滁州经济技术开发区",
  "value": "341172" },

{
  "label": "天长市",
  "value": "341181" },

{
  "label": "明光市",
  "value": "341182" }],


[{
  "label": "颍州区",
  "value": "341202" },

{
  "label": "颍东区",
  "value": "341203" },

{
  "label": "颍泉区",
  "value": "341204" },

{
  "label": "临泉县",
  "value": "341221" },

{
  "label": "太和县",
  "value": "341222" },

{
  "label": "阜南县",
  "value": "341225" },

{
  "label": "颍上县",
  "value": "341226" },

{
  "label": "阜阳合肥现代产业园区",
  "value": "341271" },

{
  "label": "阜阳经济技术开发区",
  "value": "341272" },

{
  "label": "界首市",
  "value": "341282" }],


[{
  "label": "埇桥区",
  "value": "341302" },

{
  "label": "砀山县",
  "value": "341321" },

{
  "label": "萧县",
  "value": "341322" },

{
  "label": "灵璧县",
  "value": "341323" },

{
  "label": "泗县",
  "value": "341324" },

{
  "label": "宿州马鞍山现代产业园区",
  "value": "341371" },

{
  "label": "宿州经济技术开发区",
  "value": "341372" }],


[{
  "label": "金安区",
  "value": "341502" },

{
  "label": "裕安区",
  "value": "341503" },

{
  "label": "叶集区",
  "value": "341504" },

{
  "label": "霍邱县",
  "value": "341522" },

{
  "label": "舒城县",
  "value": "341523" },

{
  "label": "金寨县",
  "value": "341524" },

{
  "label": "霍山县",
  "value": "341525" }],


[{
  "label": "谯城区",
  "value": "341602" },

{
  "label": "涡阳县",
  "value": "341621" },

{
  "label": "蒙城县",
  "value": "341622" },

{
  "label": "利辛县",
  "value": "341623" }],


[{
  "label": "贵池区",
  "value": "341702" },

{
  "label": "东至县",
  "value": "341721" },

{
  "label": "石台县",
  "value": "341722" },

{
  "label": "青阳县",
  "value": "341723" }],


[{
  "label": "宣州区",
  "value": "341802" },

{
  "label": "郎溪县",
  "value": "341821" },

{
  "label": "广德县",
  "value": "341822" },

{
  "label": "泾县",
  "value": "341823" },

{
  "label": "绩溪县",
  "value": "341824" },

{
  "label": "旌德县",
  "value": "341825" },

{
  "label": "宣城市经济开发区",
  "value": "341871" },

{
  "label": "宁国市",
  "value": "341881" }]],



[
[{
  "label": "鼓楼区",
  "value": "350102" },

{
  "label": "台江区",
  "value": "350103" },

{
  "label": "仓山区",
  "value": "350104" },

{
  "label": "马尾区",
  "value": "350105" },

{
  "label": "晋安区",
  "value": "350111" },

{
  "label": "闽侯县",
  "value": "350121" },

{
  "label": "连江县",
  "value": "350122" },

{
  "label": "罗源县",
  "value": "350123" },

{
  "label": "闽清县",
  "value": "350124" },

{
  "label": "永泰县",
  "value": "350125" },

{
  "label": "平潭县",
  "value": "350128" },

{
  "label": "福清市",
  "value": "350181" },

{
  "label": "长乐市",
  "value": "350182" }],


[{
  "label": "思明区",
  "value": "350203" },

{
  "label": "海沧区",
  "value": "350205" },

{
  "label": "湖里区",
  "value": "350206" },

{
  "label": "集美区",
  "value": "350211" },

{
  "label": "同安区",
  "value": "350212" },

{
  "label": "翔安区",
  "value": "350213" }],


[{
  "label": "城厢区",
  "value": "350302" },

{
  "label": "涵江区",
  "value": "350303" },

{
  "label": "荔城区",
  "value": "350304" },

{
  "label": "秀屿区",
  "value": "350305" },

{
  "label": "仙游县",
  "value": "350322" }],


[{
  "label": "梅列区",
  "value": "350402" },

{
  "label": "三元区",
  "value": "350403" },

{
  "label": "明溪县",
  "value": "350421" },

{
  "label": "清流县",
  "value": "350423" },

{
  "label": "宁化县",
  "value": "350424" },

{
  "label": "大田县",
  "value": "350425" },

{
  "label": "尤溪县",
  "value": "350426" },

{
  "label": "沙县",
  "value": "350427" },

{
  "label": "将乐县",
  "value": "350428" },

{
  "label": "泰宁县",
  "value": "350429" },

{
  "label": "建宁县",
  "value": "350430" },

{
  "label": "永安市",
  "value": "350481" }],


[{
  "label": "鲤城区",
  "value": "350502" },

{
  "label": "丰泽区",
  "value": "350503" },

{
  "label": "洛江区",
  "value": "350504" },

{
  "label": "泉港区",
  "value": "350505" },

{
  "label": "惠安县",
  "value": "350521" },

{
  "label": "安溪县",
  "value": "350524" },

{
  "label": "永春县",
  "value": "350525" },

{
  "label": "德化县",
  "value": "350526" },

{
  "label": "金门县",
  "value": "350527" },

{
  "label": "石狮市",
  "value": "350581" },

{
  "label": "晋江市",
  "value": "350582" },

{
  "label": "南安市",
  "value": "350583" }],


[{
  "label": "芗城区",
  "value": "350602" },

{
  "label": "龙文区",
  "value": "350603" },

{
  "label": "云霄县",
  "value": "350622" },

{
  "label": "漳浦县",
  "value": "350623" },

{
  "label": "诏安县",
  "value": "350624" },

{
  "label": "长泰县",
  "value": "350625" },

{
  "label": "东山县",
  "value": "350626" },

{
  "label": "南靖县",
  "value": "350627" },

{
  "label": "平和县",
  "value": "350628" },

{
  "label": "华安县",
  "value": "350629" },

{
  "label": "龙海市",
  "value": "350681" }],


[{
  "label": "延平区",
  "value": "350702" },

{
  "label": "建阳区",
  "value": "350703" },

{
  "label": "顺昌县",
  "value": "350721" },

{
  "label": "浦城县",
  "value": "350722" },

{
  "label": "光泽县",
  "value": "350723" },

{
  "label": "松溪县",
  "value": "350724" },

{
  "label": "政和县",
  "value": "350725" },

{
  "label": "邵武市",
  "value": "350781" },

{
  "label": "武夷山市",
  "value": "350782" },

{
  "label": "建瓯市",
  "value": "350783" }],


[{
  "label": "新罗区",
  "value": "350802" },

{
  "label": "永定区",
  "value": "350803" },

{
  "label": "长汀县",
  "value": "350821" },

{
  "label": "上杭县",
  "value": "350823" },

{
  "label": "武平县",
  "value": "350824" },

{
  "label": "连城县",
  "value": "350825" },

{
  "label": "漳平市",
  "value": "350881" }],


[{
  "label": "蕉城区",
  "value": "350902" },

{
  "label": "霞浦县",
  "value": "350921" },

{
  "label": "古田县",
  "value": "350922" },

{
  "label": "屏南县",
  "value": "350923" },

{
  "label": "寿宁县",
  "value": "350924" },

{
  "label": "周宁县",
  "value": "350925" },

{
  "label": "柘荣县",
  "value": "350926" },

{
  "label": "福安市",
  "value": "350981" },

{
  "label": "福鼎市",
  "value": "350982" }]],



[
[{
  "label": "东湖区",
  "value": "360102" },

{
  "label": "西湖区",
  "value": "360103" },

{
  "label": "青云谱区",
  "value": "360104" },

{
  "label": "湾里区",
  "value": "360105" },

{
  "label": "青山湖区",
  "value": "360111" },

{
  "label": "新建区",
  "value": "360112" },

{
  "label": "南昌县",
  "value": "360121" },

{
  "label": "安义县",
  "value": "360123" },

{
  "label": "进贤县",
  "value": "360124" }],


[{
  "label": "昌江区",
  "value": "360202" },

{
  "label": "珠山区",
  "value": "360203" },

{
  "label": "浮梁县",
  "value": "360222" },

{
  "label": "乐平市",
  "value": "360281" }],


[{
  "label": "安源区",
  "value": "360302" },

{
  "label": "湘东区",
  "value": "360313" },

{
  "label": "莲花县",
  "value": "360321" },

{
  "label": "上栗县",
  "value": "360322" },

{
  "label": "芦溪县",
  "value": "360323" }],


[{
  "label": "濂溪区",
  "value": "360402" },

{
  "label": "浔阳区",
  "value": "360403" },

{
  "label": "柴桑区",
  "value": "360404" },

{
  "label": "武宁县",
  "value": "360423" },

{
  "label": "修水县",
  "value": "360424" },

{
  "label": "永修县",
  "value": "360425" },

{
  "label": "德安县",
  "value": "360426" },

{
  "label": "都昌县",
  "value": "360428" },

{
  "label": "湖口县",
  "value": "360429" },

{
  "label": "彭泽县",
  "value": "360430" },

{
  "label": "瑞昌市",
  "value": "360481" },

{
  "label": "共青城市",
  "value": "360482" },

{
  "label": "庐山市",
  "value": "360483" }],


[{
  "label": "渝水区",
  "value": "360502" },

{
  "label": "分宜县",
  "value": "360521" }],


[{
  "label": "月湖区",
  "value": "360602" },

{
  "label": "余江县",
  "value": "360622" },

{
  "label": "贵溪市",
  "value": "360681" }],


[{
  "label": "章贡区",
  "value": "360702" },

{
  "label": "南康区",
  "value": "360703" },

{
  "label": "赣县区",
  "value": "360704" },

{
  "label": "信丰县",
  "value": "360722" },

{
  "label": "大余县",
  "value": "360723" },

{
  "label": "上犹县",
  "value": "360724" },

{
  "label": "崇义县",
  "value": "360725" },

{
  "label": "安远县",
  "value": "360726" },

{
  "label": "龙南县",
  "value": "360727" },

{
  "label": "定南县",
  "value": "360728" },

{
  "label": "全南县",
  "value": "360729" },

{
  "label": "宁都县",
  "value": "360730" },

{
  "label": "于都县",
  "value": "360731" },

{
  "label": "兴国县",
  "value": "360732" },

{
  "label": "会昌县",
  "value": "360733" },

{
  "label": "寻乌县",
  "value": "360734" },

{
  "label": "石城县",
  "value": "360735" },

{
  "label": "瑞金市",
  "value": "360781" }],


[{
  "label": "吉州区",
  "value": "360802" },

{
  "label": "青原区",
  "value": "360803" },

{
  "label": "吉安县",
  "value": "360821" },

{
  "label": "吉水县",
  "value": "360822" },

{
  "label": "峡江县",
  "value": "360823" },

{
  "label": "新干县",
  "value": "360824" },

{
  "label": "永丰县",
  "value": "360825" },

{
  "label": "泰和县",
  "value": "360826" },

{
  "label": "遂川县",
  "value": "360827" },

{
  "label": "万安县",
  "value": "360828" },

{
  "label": "安福县",
  "value": "360829" },

{
  "label": "永新县",
  "value": "360830" },

{
  "label": "井冈山市",
  "value": "360881" }],


[{
  "label": "袁州区",
  "value": "360902" },

{
  "label": "奉新县",
  "value": "360921" },

{
  "label": "万载县",
  "value": "360922" },

{
  "label": "上高县",
  "value": "360923" },

{
  "label": "宜丰县",
  "value": "360924" },

{
  "label": "靖安县",
  "value": "360925" },

{
  "label": "铜鼓县",
  "value": "360926" },

{
  "label": "丰城市",
  "value": "360981" },

{
  "label": "樟树市",
  "value": "360982" },

{
  "label": "高安市",
  "value": "360983" }],


[{
  "label": "临川区",
  "value": "361002" },

{
  "label": "东乡区",
  "value": "361003" },

{
  "label": "南城县",
  "value": "361021" },

{
  "label": "黎川县",
  "value": "361022" },

{
  "label": "南丰县",
  "value": "361023" },

{
  "label": "崇仁县",
  "value": "361024" },

{
  "label": "乐安县",
  "value": "361025" },

{
  "label": "宜黄县",
  "value": "361026" },

{
  "label": "金溪县",
  "value": "361027" },

{
  "label": "资溪县",
  "value": "361028" },

{
  "label": "广昌县",
  "value": "361030" }],


[{
  "label": "信州区",
  "value": "361102" },

{
  "label": "广丰区",
  "value": "361103" },

{
  "label": "上饶县",
  "value": "361121" },

{
  "label": "玉山县",
  "value": "361123" },

{
  "label": "铅山县",
  "value": "361124" },

{
  "label": "横峰县",
  "value": "361125" },

{
  "label": "弋阳县",
  "value": "361126" },

{
  "label": "余干县",
  "value": "361127" },

{
  "label": "鄱阳县",
  "value": "361128" },

{
  "label": "万年县",
  "value": "361129" },

{
  "label": "婺源县",
  "value": "361130" },

{
  "label": "德兴市",
  "value": "361181" }]],



[
[{
  "label": "历下区",
  "value": "370102" },

{
  "label": "市中区",
  "value": "370103" },

{
  "label": "槐荫区",
  "value": "370104" },

{
  "label": "天桥区",
  "value": "370105" },

{
  "label": "历城区",
  "value": "370112" },

{
  "label": "长清区",
  "value": "370113" },

{
  "label": "章丘区",
  "value": "370114" },

{
  "label": "平阴县",
  "value": "370124" },

{
  "label": "济阳县",
  "value": "370125" },

{
  "label": "商河县",
  "value": "370126" },

{
  "label": "济南高新技术产业开发区",
  "value": "370171" }],


[{
  "label": "市南区",
  "value": "370202" },

{
  "label": "市北区",
  "value": "370203" },

{
  "label": "黄岛区",
  "value": "370211" },

{
  "label": "崂山区",
  "value": "370212" },

{
  "label": "李沧区",
  "value": "370213" },

{
  "label": "城阳区",
  "value": "370214" },

{
  "label": "即墨区",
  "value": "370215" },

{
  "label": "青岛高新技术产业开发区",
  "value": "370271" },

{
  "label": "胶州市",
  "value": "370281" },

{
  "label": "平度市",
  "value": "370283" },

{
  "label": "莱西市",
  "value": "370285" }],


[{
  "label": "淄川区",
  "value": "370302" },

{
  "label": "张店区",
  "value": "370303" },

{
  "label": "博山区",
  "value": "370304" },

{
  "label": "临淄区",
  "value": "370305" },

{
  "label": "周村区",
  "value": "370306" },

{
  "label": "桓台县",
  "value": "370321" },

{
  "label": "高青县",
  "value": "370322" },

{
  "label": "沂源县",
  "value": "370323" }],


[{
  "label": "市中区",
  "value": "370402" },

{
  "label": "薛城区",
  "value": "370403" },

{
  "label": "峄城区",
  "value": "370404" },

{
  "label": "台儿庄区",
  "value": "370405" },

{
  "label": "山亭区",
  "value": "370406" },

{
  "label": "滕州市",
  "value": "370481" }],


[{
  "label": "东营区",
  "value": "370502" },

{
  "label": "河口区",
  "value": "370503" },

{
  "label": "垦利区",
  "value": "370505" },

{
  "label": "利津县",
  "value": "370522" },

{
  "label": "广饶县",
  "value": "370523" },

{
  "label": "东营经济技术开发区",
  "value": "370571" },

{
  "label": "东营港经济开发区",
  "value": "370572" }],


[{
  "label": "芝罘区",
  "value": "370602" },

{
  "label": "福山区",
  "value": "370611" },

{
  "label": "牟平区",
  "value": "370612" },

{
  "label": "莱山区",
  "value": "370613" },

{
  "label": "长岛县",
  "value": "370634" },

{
  "label": "烟台高新技术产业开发区",
  "value": "370671" },

{
  "label": "烟台经济技术开发区",
  "value": "370672" },

{
  "label": "龙口市",
  "value": "370681" },

{
  "label": "莱阳市",
  "value": "370682" },

{
  "label": "莱州市",
  "value": "370683" },

{
  "label": "蓬莱市",
  "value": "370684" },

{
  "label": "招远市",
  "value": "370685" },

{
  "label": "栖霞市",
  "value": "370686" },

{
  "label": "海阳市",
  "value": "370687" }],


[{
  "label": "潍城区",
  "value": "370702" },

{
  "label": "寒亭区",
  "value": "370703" },

{
  "label": "坊子区",
  "value": "370704" },

{
  "label": "奎文区",
  "value": "370705" },

{
  "label": "临朐县",
  "value": "370724" },

{
  "label": "昌乐县",
  "value": "370725" },

{
  "label": "潍坊滨海经济技术开发区",
  "value": "370772" },

{
  "label": "青州市",
  "value": "370781" },

{
  "label": "诸城市",
  "value": "370782" },

{
  "label": "寿光市",
  "value": "370783" },

{
  "label": "安丘市",
  "value": "370784" },

{
  "label": "高密市",
  "value": "370785" },

{
  "label": "昌邑市",
  "value": "370786" }],


[{
  "label": "任城区",
  "value": "370811" },

{
  "label": "兖州区",
  "value": "370812" },

{
  "label": "微山县",
  "value": "370826" },

{
  "label": "鱼台县",
  "value": "370827" },

{
  "label": "金乡县",
  "value": "370828" },

{
  "label": "嘉祥县",
  "value": "370829" },

{
  "label": "汶上县",
  "value": "370830" },

{
  "label": "泗水县",
  "value": "370831" },

{
  "label": "梁山县",
  "value": "370832" },

{
  "label": "济宁高新技术产业开发区",
  "value": "370871" },

{
  "label": "曲阜市",
  "value": "370881" },

{
  "label": "邹城市",
  "value": "370883" }],


[{
  "label": "泰山区",
  "value": "370902" },

{
  "label": "岱岳区",
  "value": "370911" },

{
  "label": "宁阳县",
  "value": "370921" },

{
  "label": "东平县",
  "value": "370923" },

{
  "label": "新泰市",
  "value": "370982" },

{
  "label": "肥城市",
  "value": "370983" }],


[{
  "label": "环翠区",
  "value": "371002" },

{
  "label": "文登区",
  "value": "371003" },

{
  "label": "威海火炬高技术产业开发区",
  "value": "371071" },

{
  "label": "威海经济技术开发区",
  "value": "371072" },

{
  "label": "威海临港经济技术开发区",
  "value": "371073" },

{
  "label": "荣成市",
  "value": "371082" },

{
  "label": "乳山市",
  "value": "371083" }],


[{
  "label": "东港区",
  "value": "371102" },

{
  "label": "岚山区",
  "value": "371103" },

{
  "label": "五莲县",
  "value": "371121" },

{
  "label": "莒县",
  "value": "371122" },

{
  "label": "日照经济技术开发区",
  "value": "371171" },

{
  "label": "日照国际海洋城",
  "value": "371172" }],


[{
  "label": "莱城区",
  "value": "371202" },

{
  "label": "钢城区",
  "value": "371203" }],


[{
  "label": "兰山区",
  "value": "371302" },

{
  "label": "罗庄区",
  "value": "371311" },

{
  "label": "河东区",
  "value": "371312" },

{
  "label": "沂南县",
  "value": "371321" },

{
  "label": "郯城县",
  "value": "371322" },

{
  "label": "沂水县",
  "value": "371323" },

{
  "label": "兰陵县",
  "value": "371324" },

{
  "label": "费县",
  "value": "371325" },

{
  "label": "平邑县",
  "value": "371326" },

{
  "label": "莒南县",
  "value": "371327" },

{
  "label": "蒙阴县",
  "value": "371328" },

{
  "label": "临沭县",
  "value": "371329" },

{
  "label": "临沂高新技术产业开发区",
  "value": "371371" },

{
  "label": "临沂经济技术开发区",
  "value": "371372" },

{
  "label": "临沂临港经济开发区",
  "value": "371373" }],


[{
  "label": "德城区",
  "value": "371402" },

{
  "label": "陵城区",
  "value": "371403" },

{
  "label": "宁津县",
  "value": "371422" },

{
  "label": "庆云县",
  "value": "371423" },

{
  "label": "临邑县",
  "value": "371424" },

{
  "label": "齐河县",
  "value": "371425" },

{
  "label": "平原县",
  "value": "371426" },

{
  "label": "夏津县",
  "value": "371427" },

{
  "label": "武城县",
  "value": "371428" },

{
  "label": "德州经济技术开发区",
  "value": "371471" },

{
  "label": "德州运河经济开发区",
  "value": "371472" },

{
  "label": "乐陵市",
  "value": "371481" },

{
  "label": "禹城市",
  "value": "371482" }],


[{
  "label": "东昌府区",
  "value": "371502" },

{
  "label": "阳谷县",
  "value": "371521" },

{
  "label": "莘县",
  "value": "371522" },

{
  "label": "茌平县",
  "value": "371523" },

{
  "label": "东阿县",
  "value": "371524" },

{
  "label": "冠县",
  "value": "371525" },

{
  "label": "高唐县",
  "value": "371526" },

{
  "label": "临清市",
  "value": "371581" }],


[{
  "label": "滨城区",
  "value": "371602" },

{
  "label": "沾化区",
  "value": "371603" },

{
  "label": "惠民县",
  "value": "371621" },

{
  "label": "阳信县",
  "value": "371622" },

{
  "label": "无棣县",
  "value": "371623" },

{
  "label": "博兴县",
  "value": "371625" },

{
  "label": "邹平县",
  "value": "371626" }],


[{
  "label": "牡丹区",
  "value": "371702" },

{
  "label": "定陶区",
  "value": "371703" },

{
  "label": "曹县",
  "value": "371721" },

{
  "label": "单县",
  "value": "371722" },

{
  "label": "成武县",
  "value": "371723" },

{
  "label": "巨野县",
  "value": "371724" },

{
  "label": "郓城县",
  "value": "371725" },

{
  "label": "鄄城县",
  "value": "371726" },

{
  "label": "东明县",
  "value": "371728" },

{
  "label": "菏泽经济技术开发区",
  "value": "371771" },

{
  "label": "菏泽高新技术开发区",
  "value": "371772" }]],



[
[{
  "label": "中原区",
  "value": "410102" },

{
  "label": "二七区",
  "value": "410103" },

{
  "label": "管城回族区",
  "value": "410104" },

{
  "label": "金水区",
  "value": "410105" },

{
  "label": "上街区",
  "value": "410106" },

{
  "label": "惠济区",
  "value": "410108" },

{
  "label": "中牟县",
  "value": "410122" },

{
  "label": "郑州经济技术开发区",
  "value": "410171" },

{
  "label": "郑州高新技术产业开发区",
  "value": "410172" },

{
  "label": "郑州航空港经济综合实验区",
  "value": "410173" },

{
  "label": "巩义市",
  "value": "410181" },

{
  "label": "荥阳市",
  "value": "410182" },

{
  "label": "新密市",
  "value": "410183" },

{
  "label": "新郑市",
  "value": "410184" },

{
  "label": "登封市",
  "value": "410185" }],


[{
  "label": "龙亭区",
  "value": "410202" },

{
  "label": "顺河回族区",
  "value": "410203" },

{
  "label": "鼓楼区",
  "value": "410204" },

{
  "label": "禹王台区",
  "value": "410205" },

{
  "label": "祥符区",
  "value": "410212" },

{
  "label": "杞县",
  "value": "410221" },

{
  "label": "通许县",
  "value": "410222" },

{
  "label": "尉氏县",
  "value": "410223" },

{
  "label": "兰考县",
  "value": "410225" }],


[{
  "label": "老城区",
  "value": "410302" },

{
  "label": "西工区",
  "value": "410303" },

{
  "label": "瀍河回族区",
  "value": "410304" },

{
  "label": "涧西区",
  "value": "410305" },

{
  "label": "吉利区",
  "value": "410306" },

{
  "label": "洛龙区",
  "value": "410311" },

{
  "label": "孟津县",
  "value": "410322" },

{
  "label": "新安县",
  "value": "410323" },

{
  "label": "栾川县",
  "value": "410324" },

{
  "label": "嵩县",
  "value": "410325" },

{
  "label": "汝阳县",
  "value": "410326" },

{
  "label": "宜阳县",
  "value": "410327" },

{
  "label": "洛宁县",
  "value": "410328" },

{
  "label": "伊川县",
  "value": "410329" },

{
  "label": "洛阳高新技术产业开发区",
  "value": "410371" },

{
  "label": "偃师市",
  "value": "410381" }],


[{
  "label": "新华区",
  "value": "410402" },

{
  "label": "卫东区",
  "value": "410403" },

{
  "label": "石龙区",
  "value": "410404" },

{
  "label": "湛河区",
  "value": "410411" },

{
  "label": "宝丰县",
  "value": "410421" },

{
  "label": "叶县",
  "value": "410422" },

{
  "label": "鲁山县",
  "value": "410423" },

{
  "label": "郏县",
  "value": "410425" },

{
  "label": "平顶山高新技术产业开发区",
  "value": "410471" },

{
  "label": "平顶山市新城区",
  "value": "410472" },

{
  "label": "舞钢市",
  "value": "410481" },

{
  "label": "汝州市",
  "value": "410482" }],


[{
  "label": "文峰区",
  "value": "410502" },

{
  "label": "北关区",
  "value": "410503" },

{
  "label": "殷都区",
  "value": "410505" },

{
  "label": "龙安区",
  "value": "410506" },

{
  "label": "安阳县",
  "value": "410522" },

{
  "label": "汤阴县",
  "value": "410523" },

{
  "label": "滑县",
  "value": "410526" },

{
  "label": "内黄县",
  "value": "410527" },

{
  "label": "安阳高新技术产业开发区",
  "value": "410571" },

{
  "label": "林州市",
  "value": "410581" }],


[{
  "label": "鹤山区",
  "value": "410602" },

{
  "label": "山城区",
  "value": "410603" },

{
  "label": "淇滨区",
  "value": "410611" },

{
  "label": "浚县",
  "value": "410621" },

{
  "label": "淇县",
  "value": "410622" },

{
  "label": "鹤壁经济技术开发区",
  "value": "410671" }],


[{
  "label": "红旗区",
  "value": "410702" },

{
  "label": "卫滨区",
  "value": "410703" },

{
  "label": "凤泉区",
  "value": "410704" },

{
  "label": "牧野区",
  "value": "410711" },

{
  "label": "新乡县",
  "value": "410721" },

{
  "label": "获嘉县",
  "value": "410724" },

{
  "label": "原阳县",
  "value": "410725" },

{
  "label": "延津县",
  "value": "410726" },

{
  "label": "封丘县",
  "value": "410727" },

{
  "label": "长垣县",
  "value": "410728" },

{
  "label": "新乡高新技术产业开发区",
  "value": "410771" },

{
  "label": "新乡经济技术开发区",
  "value": "410772" },

{
  "label": "新乡市平原城乡一体化示范区",
  "value": "410773" },

{
  "label": "卫辉市",
  "value": "410781" },

{
  "label": "辉县市",
  "value": "410782" }],


[{
  "label": "解放区",
  "value": "410802" },

{
  "label": "中站区",
  "value": "410803" },

{
  "label": "马村区",
  "value": "410804" },

{
  "label": "山阳区",
  "value": "410811" },

{
  "label": "修武县",
  "value": "410821" },

{
  "label": "博爱县",
  "value": "410822" },

{
  "label": "武陟县",
  "value": "410823" },

{
  "label": "温县",
  "value": "410825" },

{
  "label": "焦作城乡一体化示范区",
  "value": "410871" },

{
  "label": "沁阳市",
  "value": "410882" },

{
  "label": "孟州市",
  "value": "410883" }],


[{
  "label": "华龙区",
  "value": "410902" },

{
  "label": "清丰县",
  "value": "410922" },

{
  "label": "南乐县",
  "value": "410923" },

{
  "label": "范县",
  "value": "410926" },

{
  "label": "台前县",
  "value": "410927" },

{
  "label": "濮阳县",
  "value": "410928" },

{
  "label": "河南濮阳工业园区",
  "value": "410971" },

{
  "label": "濮阳经济技术开发区",
  "value": "410972" }],


[{
  "label": "魏都区",
  "value": "411002" },

{
  "label": "建安区",
  "value": "411003" },

{
  "label": "鄢陵县",
  "value": "411024" },

{
  "label": "襄城县",
  "value": "411025" },

{
  "label": "许昌经济技术开发区",
  "value": "411071" },

{
  "label": "禹州市",
  "value": "411081" },

{
  "label": "长葛市",
  "value": "411082" }],


[{
  "label": "源汇区",
  "value": "411102" },

{
  "label": "郾城区",
  "value": "411103" },

{
  "label": "召陵区",
  "value": "411104" },

{
  "label": "舞阳县",
  "value": "411121" },

{
  "label": "临颍县",
  "value": "411122" },

{
  "label": "漯河经济技术开发区",
  "value": "411171" }],


[{
  "label": "湖滨区",
  "value": "411202" },

{
  "label": "陕州区",
  "value": "411203" },

{
  "label": "渑池县",
  "value": "411221" },

{
  "label": "卢氏县",
  "value": "411224" },

{
  "label": "河南三门峡经济开发区",
  "value": "411271" },

{
  "label": "义马市",
  "value": "411281" },

{
  "label": "灵宝市",
  "value": "411282" }],


[{
  "label": "宛城区",
  "value": "411302" },

{
  "label": "卧龙区",
  "value": "411303" },

{
  "label": "南召县",
  "value": "411321" },

{
  "label": "方城县",
  "value": "411322" },

{
  "label": "西峡县",
  "value": "411323" },

{
  "label": "镇平县",
  "value": "411324" },

{
  "label": "内乡县",
  "value": "411325" },

{
  "label": "淅川县",
  "value": "411326" },

{
  "label": "社旗县",
  "value": "411327" },

{
  "label": "唐河县",
  "value": "411328" },

{
  "label": "新野县",
  "value": "411329" },

{
  "label": "桐柏县",
  "value": "411330" },

{
  "label": "南阳高新技术产业开发区",
  "value": "411371" },

{
  "label": "南阳市城乡一体化示范区",
  "value": "411372" },

{
  "label": "邓州市",
  "value": "411381" }],


[{
  "label": "梁园区",
  "value": "411402" },

{
  "label": "睢阳区",
  "value": "411403" },

{
  "label": "民权县",
  "value": "411421" },

{
  "label": "睢县",
  "value": "411422" },

{
  "label": "宁陵县",
  "value": "411423" },

{
  "label": "柘城县",
  "value": "411424" },

{
  "label": "虞城县",
  "value": "411425" },

{
  "label": "夏邑县",
  "value": "411426" },

{
  "label": "豫东综合物流产业聚集区",
  "value": "411471" },

{
  "label": "河南商丘经济开发区",
  "value": "411472" },

{
  "label": "永城市",
  "value": "411481" }],


[{
  "label": "浉河区",
  "value": "411502" },

{
  "label": "平桥区",
  "value": "411503" },

{
  "label": "罗山县",
  "value": "411521" },

{
  "label": "光山县",
  "value": "411522" },

{
  "label": "新县",
  "value": "411523" },

{
  "label": "商城县",
  "value": "411524" },

{
  "label": "固始县",
  "value": "411525" },

{
  "label": "潢川县",
  "value": "411526" },

{
  "label": "淮滨县",
  "value": "411527" },

{
  "label": "息县",
  "value": "411528" },

{
  "label": "信阳高新技术产业开发区",
  "value": "411571" }],


[{
  "label": "川汇区",
  "value": "411602" },

{
  "label": "扶沟县",
  "value": "411621" },

{
  "label": "西华县",
  "value": "411622" },

{
  "label": "商水县",
  "value": "411623" },

{
  "label": "沈丘县",
  "value": "411624" },

{
  "label": "郸城县",
  "value": "411625" },

{
  "label": "淮阳县",
  "value": "411626" },

{
  "label": "太康县",
  "value": "411627" },

{
  "label": "鹿邑县",
  "value": "411628" },

{
  "label": "河南周口经济开发区",
  "value": "411671" },

{
  "label": "项城市",
  "value": "411681" }],


[{
  "label": "驿城区",
  "value": "411702" },

{
  "label": "西平县",
  "value": "411721" },

{
  "label": "上蔡县",
  "value": "411722" },

{
  "label": "平舆县",
  "value": "411723" },

{
  "label": "正阳县",
  "value": "411724" },

{
  "label": "确山县",
  "value": "411725" },

{
  "label": "泌阳县",
  "value": "411726" },

{
  "label": "汝南县",
  "value": "411727" },

{
  "label": "遂平县",
  "value": "411728" },

{
  "label": "新蔡县",
  "value": "411729" },

{
  "label": "河南驻马店经济开发区",
  "value": "411771" }],


[{
  "label": "济源市",
  "value": "419001" }]],


[
[{
  "label": "江岸区",
  "value": "420102" },

{
  "label": "江汉区",
  "value": "420103" },

{
  "label": "硚口区",
  "value": "420104" },

{
  "label": "汉阳区",
  "value": "420105" },

{
  "label": "武昌区",
  "value": "420106" },

{
  "label": "青山区",
  "value": "420107" },

{
  "label": "洪山区",
  "value": "420111" },

{
  "label": "东西湖区",
  "value": "420112" },

{
  "label": "汉南区",
  "value": "420113" },

{
  "label": "蔡甸区",
  "value": "420114" },

{
  "label": "江夏区",
  "value": "420115" },

{
  "label": "黄陂区",
  "value": "420116" },

{
  "label": "新洲区",
  "value": "420117" }],


[{
  "label": "黄石港区",
  "value": "420202" },

{
  "label": "西塞山区",
  "value": "420203" },

{
  "label": "下陆区",
  "value": "420204" },

{
  "label": "铁山区",
  "value": "420205" },

{
  "label": "阳新县",
  "value": "420222" },

{
  "label": "大冶市",
  "value": "420281" }],


[{
  "label": "茅箭区",
  "value": "420302" },

{
  "label": "张湾区",
  "value": "420303" },

{
  "label": "郧阳区",
  "value": "420304" },

{
  "label": "郧西县",
  "value": "420322" },

{
  "label": "竹山县",
  "value": "420323" },

{
  "label": "竹溪县",
  "value": "420324" },

{
  "label": "房县",
  "value": "420325" },

{
  "label": "丹江口市",
  "value": "420381" }],


[{
  "label": "西陵区",
  "value": "420502" },

{
  "label": "伍家岗区",
  "value": "420503" },

{
  "label": "点军区",
  "value": "420504" },

{
  "label": "猇亭区",
  "value": "420505" },

{
  "label": "夷陵区",
  "value": "420506" },

{
  "label": "远安县",
  "value": "420525" },

{
  "label": "兴山县",
  "value": "420526" },

{
  "label": "秭归县",
  "value": "420527" },

{
  "label": "长阳土家族自治县",
  "value": "420528" },

{
  "label": "五峰土家族自治县",
  "value": "420529" },

{
  "label": "宜都市",
  "value": "420581" },

{
  "label": "当阳市",
  "value": "420582" },

{
  "label": "枝江市",
  "value": "420583" }],


[{
  "label": "襄城区",
  "value": "420602" },

{
  "label": "樊城区",
  "value": "420606" },

{
  "label": "襄州区",
  "value": "420607" },

{
  "label": "南漳县",
  "value": "420624" },

{
  "label": "谷城县",
  "value": "420625" },

{
  "label": "保康县",
  "value": "420626" },

{
  "label": "老河口市",
  "value": "420682" },

{
  "label": "枣阳市",
  "value": "420683" },

{
  "label": "宜城市",
  "value": "420684" }],


[{
  "label": "梁子湖区",
  "value": "420702" },

{
  "label": "华容区",
  "value": "420703" },

{
  "label": "鄂城区",
  "value": "420704" }],


[{
  "label": "东宝区",
  "value": "420802" },

{
  "label": "掇刀区",
  "value": "420804" },

{
  "label": "京山县",
  "value": "420821" },

{
  "label": "沙洋县",
  "value": "420822" },

{
  "label": "钟祥市",
  "value": "420881" }],


[{
  "label": "孝南区",
  "value": "420902" },

{
  "label": "孝昌县",
  "value": "420921" },

{
  "label": "大悟县",
  "value": "420922" },

{
  "label": "云梦县",
  "value": "420923" },

{
  "label": "应城市",
  "value": "420981" },

{
  "label": "安陆市",
  "value": "420982" },

{
  "label": "汉川市",
  "value": "420984" }],


[{
  "label": "沙市区",
  "value": "421002" },

{
  "label": "荆州区",
  "value": "421003" },

{
  "label": "公安县",
  "value": "421022" },

{
  "label": "监利县",
  "value": "421023" },

{
  "label": "江陵县",
  "value": "421024" },

{
  "label": "荆州经济技术开发区",
  "value": "421071" },

{
  "label": "石首市",
  "value": "421081" },

{
  "label": "洪湖市",
  "value": "421083" },

{
  "label": "松滋市",
  "value": "421087" }],


[{
  "label": "黄州区",
  "value": "421102" },

{
  "label": "团风县",
  "value": "421121" },

{
  "label": "红安县",
  "value": "421122" },

{
  "label": "罗田县",
  "value": "421123" },

{
  "label": "英山县",
  "value": "421124" },

{
  "label": "浠水县",
  "value": "421125" },

{
  "label": "蕲春县",
  "value": "421126" },

{
  "label": "黄梅县",
  "value": "421127" },

{
  "label": "龙感湖管理区",
  "value": "421171" },

{
  "label": "麻城市",
  "value": "421181" },

{
  "label": "武穴市",
  "value": "421182" }],


[{
  "label": "咸安区",
  "value": "421202" },

{
  "label": "嘉鱼县",
  "value": "421221" },

{
  "label": "通城县",
  "value": "421222" },

{
  "label": "崇阳县",
  "value": "421223" },

{
  "label": "通山县",
  "value": "421224" },

{
  "label": "赤壁市",
  "value": "421281" }],


[{
  "label": "曾都区",
  "value": "421303" },

{
  "label": "随县",
  "value": "421321" },

{
  "label": "广水市",
  "value": "421381" }],


[{
  "label": "恩施市",
  "value": "422801" },

{
  "label": "利川市",
  "value": "422802" },

{
  "label": "建始县",
  "value": "422822" },

{
  "label": "巴东县",
  "value": "422823" },

{
  "label": "宣恩县",
  "value": "422825" },

{
  "label": "咸丰县",
  "value": "422826" },

{
  "label": "来凤县",
  "value": "422827" },

{
  "label": "鹤峰县",
  "value": "422828" }],


[{
  "label": "仙桃市",
  "value": "429004" },

{
  "label": "潜江市",
  "value": "429005" },

{
  "label": "天门市",
  "value": "429006" },

{
  "label": "神农架林区",
  "value": "429021" }]],



[
[{
  "label": "芙蓉区",
  "value": "430102" },

{
  "label": "天心区",
  "value": "430103" },

{
  "label": "岳麓区",
  "value": "430104" },

{
  "label": "开福区",
  "value": "430105" },

{
  "label": "雨花区",
  "value": "430111" },

{
  "label": "望城区",
  "value": "430112" },

{
  "label": "长沙县",
  "value": "430121" },

{
  "label": "浏阳市",
  "value": "430181" },

{
  "label": "宁乡市",
  "value": "430182" }],


[{
  "label": "荷塘区",
  "value": "430202" },

{
  "label": "芦淞区",
  "value": "430203" },

{
  "label": "石峰区",
  "value": "430204" },

{
  "label": "天元区",
  "value": "430211" },

{
  "label": "株洲县",
  "value": "430221" },

{
  "label": "攸县",
  "value": "430223" },

{
  "label": "茶陵县",
  "value": "430224" },

{
  "label": "炎陵县",
  "value": "430225" },

{
  "label": "云龙示范区",
  "value": "430271" },

{
  "label": "醴陵市",
  "value": "430281" }],


[{
  "label": "雨湖区",
  "value": "430302" },

{
  "label": "岳塘区",
  "value": "430304" },

{
  "label": "湘潭县",
  "value": "430321" },

{
  "label": "湖南湘潭高新技术产业园区",
  "value": "430371" },

{
  "label": "湘潭昭山示范区",
  "value": "430372" },

{
  "label": "湘潭九华示范区",
  "value": "430373" },

{
  "label": "湘乡市",
  "value": "430381" },

{
  "label": "韶山市",
  "value": "430382" }],


[{
  "label": "珠晖区",
  "value": "430405" },

{
  "label": "雁峰区",
  "value": "430406" },

{
  "label": "石鼓区",
  "value": "430407" },

{
  "label": "蒸湘区",
  "value": "430408" },

{
  "label": "南岳区",
  "value": "430412" },

{
  "label": "衡阳县",
  "value": "430421" },

{
  "label": "衡南县",
  "value": "430422" },

{
  "label": "衡山县",
  "value": "430423" },

{
  "label": "衡东县",
  "value": "430424" },

{
  "label": "祁东县",
  "value": "430426" },

{
  "label": "衡阳综合保税区",
  "value": "430471" },

{
  "label": "湖南衡阳高新技术产业园区",
  "value": "430472" },

{
  "label": "湖南衡阳松木经济开发区",
  "value": "430473" },

{
  "label": "耒阳市",
  "value": "430481" },

{
  "label": "常宁市",
  "value": "430482" }],


[{
  "label": "双清区",
  "value": "430502" },

{
  "label": "大祥区",
  "value": "430503" },

{
  "label": "北塔区",
  "value": "430511" },

{
  "label": "邵东县",
  "value": "430521" },

{
  "label": "新邵县",
  "value": "430522" },

{
  "label": "邵阳县",
  "value": "430523" },

{
  "label": "隆回县",
  "value": "430524" },

{
  "label": "洞口县",
  "value": "430525" },

{
  "label": "绥宁县",
  "value": "430527" },

{
  "label": "新宁县",
  "value": "430528" },

{
  "label": "城步苗族自治县",
  "value": "430529" },

{
  "label": "武冈市",
  "value": "430581" }],


[{
  "label": "岳阳楼区",
  "value": "430602" },

{
  "label": "云溪区",
  "value": "430603" },

{
  "label": "君山区",
  "value": "430611" },

{
  "label": "岳阳县",
  "value": "430621" },

{
  "label": "华容县",
  "value": "430623" },

{
  "label": "湘阴县",
  "value": "430624" },

{
  "label": "平江县",
  "value": "430626" },

{
  "label": "岳阳市屈原管理区",
  "value": "430671" },

{
  "label": "汨罗市",
  "value": "430681" },

{
  "label": "临湘市",
  "value": "430682" }],


[{
  "label": "武陵区",
  "value": "430702" },

{
  "label": "鼎城区",
  "value": "430703" },

{
  "label": "安乡县",
  "value": "430721" },

{
  "label": "汉寿县",
  "value": "430722" },

{
  "label": "澧县",
  "value": "430723" },

{
  "label": "临澧县",
  "value": "430724" },

{
  "label": "桃源县",
  "value": "430725" },

{
  "label": "石门县",
  "value": "430726" },

{
  "label": "常德市西洞庭管理区",
  "value": "430771" },

{
  "label": "津市市",
  "value": "430781" }],


[{
  "label": "永定区",
  "value": "430802" },

{
  "label": "武陵源区",
  "value": "430811" },

{
  "label": "慈利县",
  "value": "430821" },

{
  "label": "桑植县",
  "value": "430822" }],


[{
  "label": "资阳区",
  "value": "430902" },

{
  "label": "赫山区",
  "value": "430903" },

{
  "label": "南县",
  "value": "430921" },

{
  "label": "桃江县",
  "value": "430922" },

{
  "label": "安化县",
  "value": "430923" },

{
  "label": "益阳市大通湖管理区",
  "value": "430971" },

{
  "label": "湖南益阳高新技术产业园区",
  "value": "430972" },

{
  "label": "沅江市",
  "value": "430981" }],


[{
  "label": "北湖区",
  "value": "431002" },

{
  "label": "苏仙区",
  "value": "431003" },

{
  "label": "桂阳县",
  "value": "431021" },

{
  "label": "宜章县",
  "value": "431022" },

{
  "label": "永兴县",
  "value": "431023" },

{
  "label": "嘉禾县",
  "value": "431024" },

{
  "label": "临武县",
  "value": "431025" },

{
  "label": "汝城县",
  "value": "431026" },

{
  "label": "桂东县",
  "value": "431027" },

{
  "label": "安仁县",
  "value": "431028" },

{
  "label": "资兴市",
  "value": "431081" }],


[{
  "label": "零陵区",
  "value": "431102" },

{
  "label": "冷水滩区",
  "value": "431103" },

{
  "label": "祁阳县",
  "value": "431121" },

{
  "label": "东安县",
  "value": "431122" },

{
  "label": "双牌县",
  "value": "431123" },

{
  "label": "道县",
  "value": "431124" },

{
  "label": "江永县",
  "value": "431125" },

{
  "label": "宁远县",
  "value": "431126" },

{
  "label": "蓝山县",
  "value": "431127" },

{
  "label": "新田县",
  "value": "431128" },

{
  "label": "江华瑶族自治县",
  "value": "431129" },

{
  "label": "永州经济技术开发区",
  "value": "431171" },

{
  "label": "永州市金洞管理区",
  "value": "431172" },

{
  "label": "永州市回龙圩管理区",
  "value": "431173" }],


[{
  "label": "鹤城区",
  "value": "431202" },

{
  "label": "中方县",
  "value": "431221" },

{
  "label": "沅陵县",
  "value": "431222" },

{
  "label": "辰溪县",
  "value": "431223" },

{
  "label": "溆浦县",
  "value": "431224" },

{
  "label": "会同县",
  "value": "431225" },

{
  "label": "麻阳苗族自治县",
  "value": "431226" },

{
  "label": "新晃侗族自治县",
  "value": "431227" },

{
  "label": "芷江侗族自治县",
  "value": "431228" },

{
  "label": "靖州苗族侗族自治县",
  "value": "431229" },

{
  "label": "通道侗族自治县",
  "value": "431230" },

{
  "label": "怀化市洪江管理区",
  "value": "431271" },

{
  "label": "洪江市",
  "value": "431281" }],


[{
  "label": "娄星区",
  "value": "431302" },

{
  "label": "双峰县",
  "value": "431321" },

{
  "label": "新化县",
  "value": "431322" },

{
  "label": "冷水江市",
  "value": "431381" },

{
  "label": "涟源市",
  "value": "431382" }],


[{
  "label": "吉首市",
  "value": "433101" },

{
  "label": "泸溪县",
  "value": "433122" },

{
  "label": "凤凰县",
  "value": "433123" },

{
  "label": "花垣县",
  "value": "433124" },

{
  "label": "保靖县",
  "value": "433125" },

{
  "label": "古丈县",
  "value": "433126" },

{
  "label": "永顺县",
  "value": "433127" },

{
  "label": "龙山县",
  "value": "433130" },

{
  "label": "湖南吉首经济开发区",
  "value": "433172" },

{
  "label": "湖南永顺经济开发区",
  "value": "433173" }]],



[
[{
  "label": "荔湾区",
  "value": "440103" },

{
  "label": "越秀区",
  "value": "440104" },

{
  "label": "海珠区",
  "value": "440105" },

{
  "label": "天河区",
  "value": "440106" },

{
  "label": "白云区",
  "value": "440111" },

{
  "label": "黄埔区",
  "value": "440112" },

{
  "label": "番禺区",
  "value": "440113" },

{
  "label": "花都区",
  "value": "440114" },

{
  "label": "南沙区",
  "value": "440115" },

{
  "label": "从化区",
  "value": "440117" },

{
  "label": "增城区",
  "value": "440118" }],


[{
  "label": "武江区",
  "value": "440203" },

{
  "label": "浈江区",
  "value": "440204" },

{
  "label": "曲江区",
  "value": "440205" },

{
  "label": "始兴县",
  "value": "440222" },

{
  "label": "仁化县",
  "value": "440224" },

{
  "label": "翁源县",
  "value": "440229" },

{
  "label": "乳源瑶族自治县",
  "value": "440232" },

{
  "label": "新丰县",
  "value": "440233" },

{
  "label": "乐昌市",
  "value": "440281" },

{
  "label": "南雄市",
  "value": "440282" }],


[{
  "label": "罗湖区",
  "value": "440303" },

{
  "label": "福田区",
  "value": "440304" },

{
  "label": "南山区",
  "value": "440305" },

{
  "label": "宝安区",
  "value": "440306" },

{
  "label": "龙岗区",
  "value": "440307" },

{
  "label": "盐田区",
  "value": "440308" },

{
  "label": "龙华区",
  "value": "440309" },

{
  "label": "坪山区",
  "value": "440310" }],


[{
  "label": "香洲区",
  "value": "440402" },

{
  "label": "斗门区",
  "value": "440403" },

{
  "label": "金湾区",
  "value": "440404" }],


[{
  "label": "龙湖区",
  "value": "440507" },

{
  "label": "金平区",
  "value": "440511" },

{
  "label": "濠江区",
  "value": "440512" },

{
  "label": "潮阳区",
  "value": "440513" },

{
  "label": "潮南区",
  "value": "440514" },

{
  "label": "澄海区",
  "value": "440515" },

{
  "label": "南澳县",
  "value": "440523" }],


[{
  "label": "禅城区",
  "value": "440604" },

{
  "label": "南海区",
  "value": "440605" },

{
  "label": "顺德区",
  "value": "440606" },

{
  "label": "三水区",
  "value": "440607" },

{
  "label": "高明区",
  "value": "440608" }],


[{
  "label": "蓬江区",
  "value": "440703" },

{
  "label": "江海区",
  "value": "440704" },

{
  "label": "新会区",
  "value": "440705" },

{
  "label": "台山市",
  "value": "440781" },

{
  "label": "开平市",
  "value": "440783" },

{
  "label": "鹤山市",
  "value": "440784" },

{
  "label": "恩平市",
  "value": "440785" }],


[{
  "label": "赤坎区",
  "value": "440802" },

{
  "label": "霞山区",
  "value": "440803" },

{
  "label": "坡头区",
  "value": "440804" },

{
  "label": "麻章区",
  "value": "440811" },

{
  "label": "遂溪县",
  "value": "440823" },

{
  "label": "徐闻县",
  "value": "440825" },

{
  "label": "廉江市",
  "value": "440881" },

{
  "label": "雷州市",
  "value": "440882" },

{
  "label": "吴川市",
  "value": "440883" }],


[{
  "label": "茂南区",
  "value": "440902" },

{
  "label": "电白区",
  "value": "440904" },

{
  "label": "高州市",
  "value": "440981" },

{
  "label": "化州市",
  "value": "440982" },

{
  "label": "信宜市",
  "value": "440983" }],


[{
  "label": "端州区",
  "value": "441202" },

{
  "label": "鼎湖区",
  "value": "441203" },

{
  "label": "高要区",
  "value": "441204" },

{
  "label": "广宁县",
  "value": "441223" },

{
  "label": "怀集县",
  "value": "441224" },

{
  "label": "封开县",
  "value": "441225" },

{
  "label": "德庆县",
  "value": "441226" },

{
  "label": "四会市",
  "value": "441284" }],


[{
  "label": "惠城区",
  "value": "441302" },

{
  "label": "惠阳区",
  "value": "441303" },

{
  "label": "博罗县",
  "value": "441322" },

{
  "label": "惠东县",
  "value": "441323" },

{
  "label": "龙门县",
  "value": "441324" }],


[{
  "label": "梅江区",
  "value": "441402" },

{
  "label": "梅县区",
  "value": "441403" },

{
  "label": "大埔县",
  "value": "441422" },

{
  "label": "丰顺县",
  "value": "441423" },

{
  "label": "五华县",
  "value": "441424" },

{
  "label": "平远县",
  "value": "441426" },

{
  "label": "蕉岭县",
  "value": "441427" },

{
  "label": "兴宁市",
  "value": "441481" }],


[{
  "label": "城区",
  "value": "441502" },

{
  "label": "海丰县",
  "value": "441521" },

{
  "label": "陆河县",
  "value": "441523" },

{
  "label": "陆丰市",
  "value": "441581" }],


[{
  "label": "源城区",
  "value": "441602" },

{
  "label": "紫金县",
  "value": "441621" },

{
  "label": "龙川县",
  "value": "441622" },

{
  "label": "连平县",
  "value": "441623" },

{
  "label": "和平县",
  "value": "441624" },

{
  "label": "东源县",
  "value": "441625" }],


[{
  "label": "江城区",
  "value": "441702" },

{
  "label": "阳东区",
  "value": "441704" },

{
  "label": "阳西县",
  "value": "441721" },

{
  "label": "阳春市",
  "value": "441781" }],


[{
  "label": "清城区",
  "value": "441802" },

{
  "label": "清新区",
  "value": "441803" },

{
  "label": "佛冈县",
  "value": "441821" },

{
  "label": "阳山县",
  "value": "441823" },

{
  "label": "连山壮族瑶族自治县",
  "value": "441825" },

{
  "label": "连南瑶族自治县",
  "value": "441826" },

{
  "label": "英德市",
  "value": "441881" },

{
  "label": "连州市",
  "value": "441882" }],


[{
  "label": "东莞市",
  "value": "441900" }],

[{
  "label": "中山市",
  "value": "442000" }],

[{
  "label": "湘桥区",
  "value": "445102" },

{
  "label": "潮安区",
  "value": "445103" },

{
  "label": "饶平县",
  "value": "445122" }],


[{
  "label": "榕城区",
  "value": "445202" },

{
  "label": "揭东区",
  "value": "445203" },

{
  "label": "揭西县",
  "value": "445222" },

{
  "label": "惠来县",
  "value": "445224" },

{
  "label": "普宁市",
  "value": "445281" }],


[{
  "label": "云城区",
  "value": "445302" },

{
  "label": "云安区",
  "value": "445303" },

{
  "label": "新兴县",
  "value": "445321" },

{
  "label": "郁南县",
  "value": "445322" },

{
  "label": "罗定市",
  "value": "445381" }]],



[
[{
  "label": "兴宁区",
  "value": "450102" },

{
  "label": "青秀区",
  "value": "450103" },

{
  "label": "江南区",
  "value": "450105" },

{
  "label": "西乡塘区",
  "value": "450107" },

{
  "label": "良庆区",
  "value": "450108" },

{
  "label": "邕宁区",
  "value": "450109" },

{
  "label": "武鸣区",
  "value": "450110" },

{
  "label": "隆安县",
  "value": "450123" },

{
  "label": "马山县",
  "value": "450124" },

{
  "label": "上林县",
  "value": "450125" },

{
  "label": "宾阳县",
  "value": "450126" },

{
  "label": "横县",
  "value": "450127" }],


[{
  "label": "城中区",
  "value": "450202" },

{
  "label": "鱼峰区",
  "value": "450203" },

{
  "label": "柳南区",
  "value": "450204" },

{
  "label": "柳北区",
  "value": "450205" },

{
  "label": "柳江区",
  "value": "450206" },

{
  "label": "柳城县",
  "value": "450222" },

{
  "label": "鹿寨县",
  "value": "450223" },

{
  "label": "融安县",
  "value": "450224" },

{
  "label": "融水苗族自治县",
  "value": "450225" },

{
  "label": "三江侗族自治县",
  "value": "450226" }],


[{
  "label": "秀峰区",
  "value": "450302" },

{
  "label": "叠彩区",
  "value": "450303" },

{
  "label": "象山区",
  "value": "450304" },

{
  "label": "七星区",
  "value": "450305" },

{
  "label": "雁山区",
  "value": "450311" },

{
  "label": "临桂区",
  "value": "450312" },

{
  "label": "阳朔县",
  "value": "450321" },

{
  "label": "灵川县",
  "value": "450323" },

{
  "label": "全州县",
  "value": "450324" },

{
  "label": "兴安县",
  "value": "450325" },

{
  "label": "永福县",
  "value": "450326" },

{
  "label": "灌阳县",
  "value": "450327" },

{
  "label": "龙胜各族自治县",
  "value": "450328" },

{
  "label": "资源县",
  "value": "450329" },

{
  "label": "平乐县",
  "value": "450330" },

{
  "label": "荔浦县",
  "value": "450331" },

{
  "label": "恭城瑶族自治县",
  "value": "450332" }],


[{
  "label": "万秀区",
  "value": "450403" },

{
  "label": "长洲区",
  "value": "450405" },

{
  "label": "龙圩区",
  "value": "450406" },

{
  "label": "苍梧县",
  "value": "450421" },

{
  "label": "藤县",
  "value": "450422" },

{
  "label": "蒙山县",
  "value": "450423" },

{
  "label": "岑溪市",
  "value": "450481" }],


[{
  "label": "海城区",
  "value": "450502" },

{
  "label": "银海区",
  "value": "450503" },

{
  "label": "铁山港区",
  "value": "450512" },

{
  "label": "合浦县",
  "value": "450521" }],


[{
  "label": "港口区",
  "value": "450602" },

{
  "label": "防城区",
  "value": "450603" },

{
  "label": "上思县",
  "value": "450621" },

{
  "label": "东兴市",
  "value": "450681" }],


[{
  "label": "钦南区",
  "value": "450702" },

{
  "label": "钦北区",
  "value": "450703" },

{
  "label": "灵山县",
  "value": "450721" },

{
  "label": "浦北县",
  "value": "450722" }],


[{
  "label": "港北区",
  "value": "450802" },

{
  "label": "港南区",
  "value": "450803" },

{
  "label": "覃塘区",
  "value": "450804" },

{
  "label": "平南县",
  "value": "450821" },

{
  "label": "桂平市",
  "value": "450881" }],


[{
  "label": "玉州区",
  "value": "450902" },

{
  "label": "福绵区",
  "value": "450903" },

{
  "label": "容县",
  "value": "450921" },

{
  "label": "陆川县",
  "value": "450922" },

{
  "label": "博白县",
  "value": "450923" },

{
  "label": "兴业县",
  "value": "450924" },

{
  "label": "北流市",
  "value": "450981" }],


[{
  "label": "右江区",
  "value": "451002" },

{
  "label": "田阳县",
  "value": "451021" },

{
  "label": "田东县",
  "value": "451022" },

{
  "label": "平果县",
  "value": "451023" },

{
  "label": "德保县",
  "value": "451024" },

{
  "label": "那坡县",
  "value": "451026" },

{
  "label": "凌云县",
  "value": "451027" },

{
  "label": "乐业县",
  "value": "451028" },

{
  "label": "田林县",
  "value": "451029" },

{
  "label": "西林县",
  "value": "451030" },

{
  "label": "隆林各族自治县",
  "value": "451031" },

{
  "label": "靖西市",
  "value": "451081" }],


[{
  "label": "八步区",
  "value": "451102" },

{
  "label": "平桂区",
  "value": "451103" },

{
  "label": "昭平县",
  "value": "451121" },

{
  "label": "钟山县",
  "value": "451122" },

{
  "label": "富川瑶族自治县",
  "value": "451123" }],


[{
  "label": "金城江区",
  "value": "451202" },

{
  "label": "宜州区",
  "value": "451203" },

{
  "label": "南丹县",
  "value": "451221" },

{
  "label": "天峨县",
  "value": "451222" },

{
  "label": "凤山县",
  "value": "451223" },

{
  "label": "东兰县",
  "value": "451224" },

{
  "label": "罗城仫佬族自治县",
  "value": "451225" },

{
  "label": "环江毛南族自治县",
  "value": "451226" },

{
  "label": "巴马瑶族自治县",
  "value": "451227" },

{
  "label": "都安瑶族自治县",
  "value": "451228" },

{
  "label": "大化瑶族自治县",
  "value": "451229" }],


[{
  "label": "兴宾区",
  "value": "451302" },

{
  "label": "忻城县",
  "value": "451321" },

{
  "label": "象州县",
  "value": "451322" },

{
  "label": "武宣县",
  "value": "451323" },

{
  "label": "金秀瑶族自治县",
  "value": "451324" },

{
  "label": "合山市",
  "value": "451381" }],


[{
  "label": "江州区",
  "value": "451402" },

{
  "label": "扶绥县",
  "value": "451421" },

{
  "label": "宁明县",
  "value": "451422" },

{
  "label": "龙州县",
  "value": "451423" },

{
  "label": "大新县",
  "value": "451424" },

{
  "label": "天等县",
  "value": "451425" },

{
  "label": "凭祥市",
  "value": "451481" }]],



[
[{
  "label": "秀英区",
  "value": "460105" },

{
  "label": "龙华区",
  "value": "460106" },

{
  "label": "琼山区",
  "value": "460107" },

{
  "label": "美兰区",
  "value": "460108" }],


[{
  "label": "海棠区",
  "value": "460202" },

{
  "label": "吉阳区",
  "value": "460203" },

{
  "label": "天涯区",
  "value": "460204" },

{
  "label": "崖州区",
  "value": "460205" }],


[{
  "label": "西沙群岛",
  "value": "460321" },

{
  "label": "南沙群岛",
  "value": "460322" },

{
  "label": "中沙群岛的岛礁及其海域",
  "value": "460323" }],


[{
  "label": "儋州市",
  "value": "460400" }],

[{
  "label": "五指山市",
  "value": "469001" },

{
  "label": "琼海市",
  "value": "469002" },

{
  "label": "文昌市",
  "value": "469005" },

{
  "label": "万宁市",
  "value": "469006" },

{
  "label": "东方市",
  "value": "469007" },

{
  "label": "定安县",
  "value": "469021" },

{
  "label": "屯昌县",
  "value": "469022" },

{
  "label": "澄迈县",
  "value": "469023" },

{
  "label": "临高县",
  "value": "469024" },

{
  "label": "白沙黎族自治县",
  "value": "469025" },

{
  "label": "昌江黎族自治县",
  "value": "469026" },

{
  "label": "乐东黎族自治县",
  "value": "469027" },

{
  "label": "陵水黎族自治县",
  "value": "469028" },

{
  "label": "保亭黎族苗族自治县",
  "value": "469029" },

{
  "label": "琼中黎族苗族自治县",
  "value": "469030" }]],



[
[{
  "label": "万州区",
  "value": "500101" },

{
  "label": "涪陵区",
  "value": "500102" },

{
  "label": "渝中区",
  "value": "500103" },

{
  "label": "大渡口区",
  "value": "500104" },

{
  "label": "江北区",
  "value": "500105" },

{
  "label": "沙坪坝区",
  "value": "500106" },

{
  "label": "九龙坡区",
  "value": "500107" },

{
  "label": "南岸区",
  "value": "500108" },

{
  "label": "北碚区",
  "value": "500109" },

{
  "label": "綦江区",
  "value": "500110" },

{
  "label": "大足区",
  "value": "500111" },

{
  "label": "渝北区",
  "value": "500112" },

{
  "label": "巴南区",
  "value": "500113" },

{
  "label": "黔江区",
  "value": "500114" },

{
  "label": "长寿区",
  "value": "500115" },

{
  "label": "江津区",
  "value": "500116" },

{
  "label": "合川区",
  "value": "500117" },

{
  "label": "永川区",
  "value": "500118" },

{
  "label": "南川区",
  "value": "500119" },

{
  "label": "璧山区",
  "value": "500120" },

{
  "label": "铜梁区",
  "value": "500151" },

{
  "label": "潼南区",
  "value": "500152" },

{
  "label": "荣昌区",
  "value": "500153" },

{
  "label": "开州区",
  "value": "500154" },

{
  "label": "梁平区",
  "value": "500155" },

{
  "label": "武隆区",
  "value": "500156" }],


[{
  "label": "城口县",
  "value": "500229" },

{
  "label": "丰都县",
  "value": "500230" },

{
  "label": "垫江县",
  "value": "500231" },

{
  "label": "忠县",
  "value": "500233" },

{
  "label": "云阳县",
  "value": "500235" },

{
  "label": "奉节县",
  "value": "500236" },

{
  "label": "巫山县",
  "value": "500237" },

{
  "label": "巫溪县",
  "value": "500238" },

{
  "label": "石柱土家族自治县",
  "value": "500240" },

{
  "label": "秀山土家族苗族自治县",
  "value": "500241" },

{
  "label": "酉阳土家族苗族自治县",
  "value": "500242" },

{
  "label": "彭水苗族土家族自治县",
  "value": "500243" }]],



[
[{
  "label": "锦江区",
  "value": "510104" },

{
  "label": "青羊区",
  "value": "510105" },

{
  "label": "金牛区",
  "value": "510106" },

{
  "label": "武侯区",
  "value": "510107" },

{
  "label": "成华区",
  "value": "510108" },

{
  "label": "龙泉驿区",
  "value": "510112" },

{
  "label": "青白江区",
  "value": "510113" },

{
  "label": "新都区",
  "value": "510114" },

{
  "label": "温江区",
  "value": "510115" },

{
  "label": "双流区",
  "value": "510116" },

{
  "label": "郫都区",
  "value": "510117" },

{
  "label": "金堂县",
  "value": "510121" },

{
  "label": "大邑县",
  "value": "510129" },

{
  "label": "蒲江县",
  "value": "510131" },

{
  "label": "新津县",
  "value": "510132" },

{
  "label": "都江堰市",
  "value": "510181" },

{
  "label": "彭州市",
  "value": "510182" },

{
  "label": "邛崃市",
  "value": "510183" },

{
  "label": "崇州市",
  "value": "510184" },

{
  "label": "简阳市",
  "value": "510185" }],


[{
  "label": "自流井区",
  "value": "510302" },

{
  "label": "贡井区",
  "value": "510303" },

{
  "label": "大安区",
  "value": "510304" },

{
  "label": "沿滩区",
  "value": "510311" },

{
  "label": "荣县",
  "value": "510321" },

{
  "label": "富顺县",
  "value": "510322" }],


[{
  "label": "东区",
  "value": "510402" },

{
  "label": "西区",
  "value": "510403" },

{
  "label": "仁和区",
  "value": "510411" },

{
  "label": "米易县",
  "value": "510421" },

{
  "label": "盐边县",
  "value": "510422" }],


[{
  "label": "江阳区",
  "value": "510502" },

{
  "label": "纳溪区",
  "value": "510503" },

{
  "label": "龙马潭区",
  "value": "510504" },

{
  "label": "泸县",
  "value": "510521" },

{
  "label": "合江县",
  "value": "510522" },

{
  "label": "叙永县",
  "value": "510524" },

{
  "label": "古蔺县",
  "value": "510525" }],


[{
  "label": "旌阳区",
  "value": "510603" },

{
  "label": "罗江区",
  "value": "510604" },

{
  "label": "中江县",
  "value": "510623" },

{
  "label": "广汉市",
  "value": "510681" },

{
  "label": "什邡市",
  "value": "510682" },

{
  "label": "绵竹市",
  "value": "510683" }],


[{
  "label": "涪城区",
  "value": "510703" },

{
  "label": "游仙区",
  "value": "510704" },

{
  "label": "安州区",
  "value": "510705" },

{
  "label": "三台县",
  "value": "510722" },

{
  "label": "盐亭县",
  "value": "510723" },

{
  "label": "梓潼县",
  "value": "510725" },

{
  "label": "北川羌族自治县",
  "value": "510726" },

{
  "label": "平武县",
  "value": "510727" },

{
  "label": "江油市",
  "value": "510781" }],


[{
  "label": "利州区",
  "value": "510802" },

{
  "label": "昭化区",
  "value": "510811" },

{
  "label": "朝天区",
  "value": "510812" },

{
  "label": "旺苍县",
  "value": "510821" },

{
  "label": "青川县",
  "value": "510822" },

{
  "label": "剑阁县",
  "value": "510823" },

{
  "label": "苍溪县",
  "value": "510824" }],


[{
  "label": "船山区",
  "value": "510903" },

{
  "label": "安居区",
  "value": "510904" },

{
  "label": "蓬溪县",
  "value": "510921" },

{
  "label": "射洪县",
  "value": "510922" },

{
  "label": "大英县",
  "value": "510923" }],


[{
  "label": "市中区",
  "value": "511002" },

{
  "label": "东兴区",
  "value": "511011" },

{
  "label": "威远县",
  "value": "511024" },

{
  "label": "资中县",
  "value": "511025" },

{
  "label": "内江经济开发区",
  "value": "511071" },

{
  "label": "隆昌市",
  "value": "511083" }],


[{
  "label": "市中区",
  "value": "511102" },

{
  "label": "沙湾区",
  "value": "511111" },

{
  "label": "五通桥区",
  "value": "511112" },

{
  "label": "金口河区",
  "value": "511113" },

{
  "label": "犍为县",
  "value": "511123" },

{
  "label": "井研县",
  "value": "511124" },

{
  "label": "夹江县",
  "value": "511126" },

{
  "label": "沐川县",
  "value": "511129" },

{
  "label": "峨边彝族自治县",
  "value": "511132" },

{
  "label": "马边彝族自治县",
  "value": "511133" },

{
  "label": "峨眉山市",
  "value": "511181" }],


[{
  "label": "顺庆区",
  "value": "511302" },

{
  "label": "高坪区",
  "value": "511303" },

{
  "label": "嘉陵区",
  "value": "511304" },

{
  "label": "南部县",
  "value": "511321" },

{
  "label": "营山县",
  "value": "511322" },

{
  "label": "蓬安县",
  "value": "511323" },

{
  "label": "仪陇县",
  "value": "511324" },

{
  "label": "西充县",
  "value": "511325" },

{
  "label": "阆中市",
  "value": "511381" }],


[{
  "label": "东坡区",
  "value": "511402" },

{
  "label": "彭山区",
  "value": "511403" },

{
  "label": "仁寿县",
  "value": "511421" },

{
  "label": "洪雅县",
  "value": "511423" },

{
  "label": "丹棱县",
  "value": "511424" },

{
  "label": "青神县",
  "value": "511425" }],


[{
  "label": "翠屏区",
  "value": "511502" },

{
  "label": "南溪区",
  "value": "511503" },

{
  "label": "宜宾县",
  "value": "511521" },

{
  "label": "江安县",
  "value": "511523" },

{
  "label": "长宁县",
  "value": "511524" },

{
  "label": "高县",
  "value": "511525" },

{
  "label": "珙县",
  "value": "511526" },

{
  "label": "筠连县",
  "value": "511527" },

{
  "label": "兴文县",
  "value": "511528" },

{
  "label": "屏山县",
  "value": "511529" }],


[{
  "label": "广安区",
  "value": "511602" },

{
  "label": "前锋区",
  "value": "511603" },

{
  "label": "岳池县",
  "value": "511621" },

{
  "label": "武胜县",
  "value": "511622" },

{
  "label": "邻水县",
  "value": "511623" },

{
  "label": "华蓥市",
  "value": "511681" }],


[{
  "label": "通川区",
  "value": "511702" },

{
  "label": "达川区",
  "value": "511703" },

{
  "label": "宣汉县",
  "value": "511722" },

{
  "label": "开江县",
  "value": "511723" },

{
  "label": "大竹县",
  "value": "511724" },

{
  "label": "渠县",
  "value": "511725" },

{
  "label": "达州经济开发区",
  "value": "511771" },

{
  "label": "万源市",
  "value": "511781" }],


[{
  "label": "雨城区",
  "value": "511802" },

{
  "label": "名山区",
  "value": "511803" },

{
  "label": "荥经县",
  "value": "511822" },

{
  "label": "汉源县",
  "value": "511823" },

{
  "label": "石棉县",
  "value": "511824" },

{
  "label": "天全县",
  "value": "511825" },

{
  "label": "芦山县",
  "value": "511826" },

{
  "label": "宝兴县",
  "value": "511827" }],


[{
  "label": "巴州区",
  "value": "511902" },

{
  "label": "恩阳区",
  "value": "511903" },

{
  "label": "通江县",
  "value": "511921" },

{
  "label": "南江县",
  "value": "511922" },

{
  "label": "平昌县",
  "value": "511923" },

{
  "label": "巴中经济开发区",
  "value": "511971" }],


[{
  "label": "雁江区",
  "value": "512002" },

{
  "label": "安岳县",
  "value": "512021" },

{
  "label": "乐至县",
  "value": "512022" }],


[{
  "label": "马尔康市",
  "value": "513201" },

{
  "label": "汶川县",
  "value": "513221" },

{
  "label": "理县",
  "value": "513222" },

{
  "label": "茂县",
  "value": "513223" },

{
  "label": "松潘县",
  "value": "513224" },

{
  "label": "九寨沟县",
  "value": "513225" },

{
  "label": "金川县",
  "value": "513226" },

{
  "label": "小金县",
  "value": "513227" },

{
  "label": "黑水县",
  "value": "513228" },

{
  "label": "壤塘县",
  "value": "513230" },

{
  "label": "阿坝县",
  "value": "513231" },

{
  "label": "若尔盖县",
  "value": "513232" },

{
  "label": "红原县",
  "value": "513233" }],


[{
  "label": "康定市",
  "value": "513301" },

{
  "label": "泸定县",
  "value": "513322" },

{
  "label": "丹巴县",
  "value": "513323" },

{
  "label": "九龙县",
  "value": "513324" },

{
  "label": "雅江县",
  "value": "513325" },

{
  "label": "道孚县",
  "value": "513326" },

{
  "label": "炉霍县",
  "value": "513327" },

{
  "label": "甘孜县",
  "value": "513328" },

{
  "label": "新龙县",
  "value": "513329" },

{
  "label": "德格县",
  "value": "513330" },

{
  "label": "白玉县",
  "value": "513331" },

{
  "label": "石渠县",
  "value": "513332" },

{
  "label": "色达县",
  "value": "513333" },

{
  "label": "理塘县",
  "value": "513334" },

{
  "label": "巴塘县",
  "value": "513335" },

{
  "label": "乡城县",
  "value": "513336" },

{
  "label": "稻城县",
  "value": "513337" },

{
  "label": "得荣县",
  "value": "513338" }],


[{
  "label": "西昌市",
  "value": "513401" },

{
  "label": "木里藏族自治县",
  "value": "513422" },

{
  "label": "盐源县",
  "value": "513423" },

{
  "label": "德昌县",
  "value": "513424" },

{
  "label": "会理县",
  "value": "513425" },

{
  "label": "会东县",
  "value": "513426" },

{
  "label": "宁南县",
  "value": "513427" },

{
  "label": "普格县",
  "value": "513428" },

{
  "label": "布拖县",
  "value": "513429" },

{
  "label": "金阳县",
  "value": "513430" },

{
  "label": "昭觉县",
  "value": "513431" },

{
  "label": "喜德县",
  "value": "513432" },

{
  "label": "冕宁县",
  "value": "513433" },

{
  "label": "越西县",
  "value": "513434" },

{
  "label": "甘洛县",
  "value": "513435" },

{
  "label": "美姑县",
  "value": "513436" },

{
  "label": "雷波县",
  "value": "513437" }]],



[
[{
  "label": "南明区",
  "value": "520102" },

{
  "label": "云岩区",
  "value": "520103" },

{
  "label": "花溪区",
  "value": "520111" },

{
  "label": "乌当区",
  "value": "520112" },

{
  "label": "白云区",
  "value": "520113" },

{
  "label": "观山湖区",
  "value": "520115" },

{
  "label": "开阳县",
  "value": "520121" },

{
  "label": "息烽县",
  "value": "520122" },

{
  "label": "修文县",
  "value": "520123" },

{
  "label": "清镇市",
  "value": "520181" }],


[{
  "label": "钟山区",
  "value": "520201" },

{
  "label": "六枝特区",
  "value": "520203" },

{
  "label": "水城县",
  "value": "520221" },

{
  "label": "盘州市",
  "value": "520281" }],


[{
  "label": "红花岗区",
  "value": "520302" },

{
  "label": "汇川区",
  "value": "520303" },

{
  "label": "播州区",
  "value": "520304" },

{
  "label": "桐梓县",
  "value": "520322" },

{
  "label": "绥阳县",
  "value": "520323" },

{
  "label": "正安县",
  "value": "520324" },

{
  "label": "道真仡佬族苗族自治县",
  "value": "520325" },

{
  "label": "务川仡佬族苗族自治县",
  "value": "520326" },

{
  "label": "凤冈县",
  "value": "520327" },

{
  "label": "湄潭县",
  "value": "520328" },

{
  "label": "余庆县",
  "value": "520329" },

{
  "label": "习水县",
  "value": "520330" },

{
  "label": "赤水市",
  "value": "520381" },

{
  "label": "仁怀市",
  "value": "520382" }],


[{
  "label": "西秀区",
  "value": "520402" },

{
  "label": "平坝区",
  "value": "520403" },

{
  "label": "普定县",
  "value": "520422" },

{
  "label": "镇宁布依族苗族自治县",
  "value": "520423" },

{
  "label": "关岭布依族苗族自治县",
  "value": "520424" },

{
  "label": "紫云苗族布依族自治县",
  "value": "520425" }],


[{
  "label": "七星关区",
  "value": "520502" },

{
  "label": "大方县",
  "value": "520521" },

{
  "label": "黔西县",
  "value": "520522" },

{
  "label": "金沙县",
  "value": "520523" },

{
  "label": "织金县",
  "value": "520524" },

{
  "label": "纳雍县",
  "value": "520525" },

{
  "label": "威宁彝族回族苗族自治县",
  "value": "520526" },

{
  "label": "赫章县",
  "value": "520527" }],


[{
  "label": "碧江区",
  "value": "520602" },

{
  "label": "万山区",
  "value": "520603" },

{
  "label": "江口县",
  "value": "520621" },

{
  "label": "玉屏侗族自治县",
  "value": "520622" },

{
  "label": "石阡县",
  "value": "520623" },

{
  "label": "思南县",
  "value": "520624" },

{
  "label": "印江土家族苗族自治县",
  "value": "520625" },

{
  "label": "德江县",
  "value": "520626" },

{
  "label": "沿河土家族自治县",
  "value": "520627" },

{
  "label": "松桃苗族自治县",
  "value": "520628" }],


[{
  "label": "兴义市",
  "value": "522301" },

{
  "label": "兴仁县",
  "value": "522322" },

{
  "label": "普安县",
  "value": "522323" },

{
  "label": "晴隆县",
  "value": "522324" },

{
  "label": "贞丰县",
  "value": "522325" },

{
  "label": "望谟县",
  "value": "522326" },

{
  "label": "册亨县",
  "value": "522327" },

{
  "label": "安龙县",
  "value": "522328" }],


[{
  "label": "凯里市",
  "value": "522601" },

{
  "label": "黄平县",
  "value": "522622" },

{
  "label": "施秉县",
  "value": "522623" },

{
  "label": "三穗县",
  "value": "522624" },

{
  "label": "镇远县",
  "value": "522625" },

{
  "label": "岑巩县",
  "value": "522626" },

{
  "label": "天柱县",
  "value": "522627" },

{
  "label": "锦屏县",
  "value": "522628" },

{
  "label": "剑河县",
  "value": "522629" },

{
  "label": "台江县",
  "value": "522630" },

{
  "label": "黎平县",
  "value": "522631" },

{
  "label": "榕江县",
  "value": "522632" },

{
  "label": "从江县",
  "value": "522633" },

{
  "label": "雷山县",
  "value": "522634" },

{
  "label": "麻江县",
  "value": "522635" },

{
  "label": "丹寨县",
  "value": "522636" }],


[{
  "label": "都匀市",
  "value": "522701" },

{
  "label": "福泉市",
  "value": "522702" },

{
  "label": "荔波县",
  "value": "522722" },

{
  "label": "贵定县",
  "value": "522723" },

{
  "label": "瓮安县",
  "value": "522725" },

{
  "label": "独山县",
  "value": "522726" },

{
  "label": "平塘县",
  "value": "522727" },

{
  "label": "罗甸县",
  "value": "522728" },

{
  "label": "长顺县",
  "value": "522729" },

{
  "label": "龙里县",
  "value": "522730" },

{
  "label": "惠水县",
  "value": "522731" },

{
  "label": "三都水族自治县",
  "value": "522732" }]],



[
[{
  "label": "五华区",
  "value": "530102" },

{
  "label": "盘龙区",
  "value": "530103" },

{
  "label": "官渡区",
  "value": "530111" },

{
  "label": "西山区",
  "value": "530112" },

{
  "label": "东川区",
  "value": "530113" },

{
  "label": "呈贡区",
  "value": "530114" },

{
  "label": "晋宁区",
  "value": "530115" },

{
  "label": "富民县",
  "value": "530124" },

{
  "label": "宜良县",
  "value": "530125" },

{
  "label": "石林彝族自治县",
  "value": "530126" },

{
  "label": "嵩明县",
  "value": "530127" },

{
  "label": "禄劝彝族苗族自治县",
  "value": "530128" },

{
  "label": "寻甸回族彝族自治县",
  "value": "530129" },

{
  "label": "安宁市",
  "value": "530181" }],


[{
  "label": "麒麟区",
  "value": "530302" },

{
  "label": "沾益区",
  "value": "530303" },

{
  "label": "马龙县",
  "value": "530321" },

{
  "label": "陆良县",
  "value": "530322" },

{
  "label": "师宗县",
  "value": "530323" },

{
  "label": "罗平县",
  "value": "530324" },

{
  "label": "富源县",
  "value": "530325" },

{
  "label": "会泽县",
  "value": "530326" },

{
  "label": "宣威市",
  "value": "530381" }],


[{
  "label": "红塔区",
  "value": "530402" },

{
  "label": "江川区",
  "value": "530403" },

{
  "label": "澄江县",
  "value": "530422" },

{
  "label": "通海县",
  "value": "530423" },

{
  "label": "华宁县",
  "value": "530424" },

{
  "label": "易门县",
  "value": "530425" },

{
  "label": "峨山彝族自治县",
  "value": "530426" },

{
  "label": "新平彝族傣族自治县",
  "value": "530427" },

{
  "label": "元江哈尼族彝族傣族自治县",
  "value": "530428" }],


[{
  "label": "隆阳区",
  "value": "530502" },

{
  "label": "施甸县",
  "value": "530521" },

{
  "label": "龙陵县",
  "value": "530523" },

{
  "label": "昌宁县",
  "value": "530524" },

{
  "label": "腾冲市",
  "value": "530581" }],


[{
  "label": "昭阳区",
  "value": "530602" },

{
  "label": "鲁甸县",
  "value": "530621" },

{
  "label": "巧家县",
  "value": "530622" },

{
  "label": "盐津县",
  "value": "530623" },

{
  "label": "大关县",
  "value": "530624" },

{
  "label": "永善县",
  "value": "530625" },

{
  "label": "绥江县",
  "value": "530626" },

{
  "label": "镇雄县",
  "value": "530627" },

{
  "label": "彝良县",
  "value": "530628" },

{
  "label": "威信县",
  "value": "530629" },

{
  "label": "水富县",
  "value": "530630" }],


[{
  "label": "古城区",
  "value": "530702" },

{
  "label": "玉龙纳西族自治县",
  "value": "530721" },

{
  "label": "永胜县",
  "value": "530722" },

{
  "label": "华坪县",
  "value": "530723" },

{
  "label": "宁蒗彝族自治县",
  "value": "530724" }],


[{
  "label": "思茅区",
  "value": "530802" },

{
  "label": "宁洱哈尼族彝族自治县",
  "value": "530821" },

{
  "label": "墨江哈尼族自治县",
  "value": "530822" },

{
  "label": "景东彝族自治县",
  "value": "530823" },

{
  "label": "景谷傣族彝族自治县",
  "value": "530824" },

{
  "label": "镇沅彝族哈尼族拉祜族自治县",
  "value": "530825" },

{
  "label": "江城哈尼族彝族自治县",
  "value": "530826" },

{
  "label": "孟连傣族拉祜族佤族自治县",
  "value": "530827" },

{
  "label": "澜沧拉祜族自治县",
  "value": "530828" },

{
  "label": "西盟佤族自治县",
  "value": "530829" }],


[{
  "label": "临翔区",
  "value": "530902" },

{
  "label": "凤庆县",
  "value": "530921" },

{
  "label": "云县",
  "value": "530922" },

{
  "label": "永德县",
  "value": "530923" },

{
  "label": "镇康县",
  "value": "530924" },

{
  "label": "双江拉祜族佤族布朗族傣族自治县",
  "value": "530925" },

{
  "label": "耿马傣族佤族自治县",
  "value": "530926" },

{
  "label": "沧源佤族自治县",
  "value": "530927" }],


[{
  "label": "楚雄市",
  "value": "532301" },

{
  "label": "双柏县",
  "value": "532322" },

{
  "label": "牟定县",
  "value": "532323" },

{
  "label": "南华县",
  "value": "532324" },

{
  "label": "姚安县",
  "value": "532325" },

{
  "label": "大姚县",
  "value": "532326" },

{
  "label": "永仁县",
  "value": "532327" },

{
  "label": "元谋县",
  "value": "532328" },

{
  "label": "武定县",
  "value": "532329" },

{
  "label": "禄丰县",
  "value": "532331" }],


[{
  "label": "个旧市",
  "value": "532501" },

{
  "label": "开远市",
  "value": "532502" },

{
  "label": "蒙自市",
  "value": "532503" },

{
  "label": "弥勒市",
  "value": "532504" },

{
  "label": "屏边苗族自治县",
  "value": "532523" },

{
  "label": "建水县",
  "value": "532524" },

{
  "label": "石屏县",
  "value": "532525" },

{
  "label": "泸西县",
  "value": "532527" },

{
  "label": "元阳县",
  "value": "532528" },

{
  "label": "红河县",
  "value": "532529" },

{
  "label": "金平苗族瑶族傣族自治县",
  "value": "532530" },

{
  "label": "绿春县",
  "value": "532531" },

{
  "label": "河口瑶族自治县",
  "value": "532532" }],


[{
  "label": "文山市",
  "value": "532601" },

{
  "label": "砚山县",
  "value": "532622" },

{
  "label": "西畴县",
  "value": "532623" },

{
  "label": "麻栗坡县",
  "value": "532624" },

{
  "label": "马关县",
  "value": "532625" },

{
  "label": "丘北县",
  "value": "532626" },

{
  "label": "广南县",
  "value": "532627" },

{
  "label": "富宁县",
  "value": "532628" }],


[{
  "label": "景洪市",
  "value": "532801" },

{
  "label": "勐海县",
  "value": "532822" },

{
  "label": "勐腊县",
  "value": "532823" }],


[{
  "label": "大理市",
  "value": "532901" },

{
  "label": "漾濞彝族自治县",
  "value": "532922" },

{
  "label": "祥云县",
  "value": "532923" },

{
  "label": "宾川县",
  "value": "532924" },

{
  "label": "弥渡县",
  "value": "532925" },

{
  "label": "南涧彝族自治县",
  "value": "532926" },

{
  "label": "巍山彝族回族自治县",
  "value": "532927" },

{
  "label": "永平县",
  "value": "532928" },

{
  "label": "云龙县",
  "value": "532929" },

{
  "label": "洱源县",
  "value": "532930" },

{
  "label": "剑川县",
  "value": "532931" },

{
  "label": "鹤庆县",
  "value": "532932" }],


[{
  "label": "瑞丽市",
  "value": "533102" },

{
  "label": "芒市",
  "value": "533103" },

{
  "label": "梁河县",
  "value": "533122" },

{
  "label": "盈江县",
  "value": "533123" },

{
  "label": "陇川县",
  "value": "533124" }],


[{
  "label": "泸水市",
  "value": "533301" },

{
  "label": "福贡县",
  "value": "533323" },

{
  "label": "贡山独龙族怒族自治县",
  "value": "533324" },

{
  "label": "兰坪白族普米族自治县",
  "value": "533325" }],


[{
  "label": "香格里拉市",
  "value": "533401" },

{
  "label": "德钦县",
  "value": "533422" },

{
  "label": "维西傈僳族自治县",
  "value": "533423" }]],



[
[{
  "label": "城关区",
  "value": "540102" },

{
  "label": "堆龙德庆区",
  "value": "540103" },

{
  "label": "林周县",
  "value": "540121" },

{
  "label": "当雄县",
  "value": "540122" },

{
  "label": "尼木县",
  "value": "540123" },

{
  "label": "曲水县",
  "value": "540124" },

{
  "label": "达孜县",
  "value": "540126" },

{
  "label": "墨竹工卡县",
  "value": "540127" },

{
  "label": "格尔木藏青工业园区",
  "value": "540171" },

{
  "label": "拉萨经济技术开发区",
  "value": "540172" },

{
  "label": "西藏文化旅游创意园区",
  "value": "540173" },

{
  "label": "达孜工业园区",
  "value": "540174" }],


[{
  "label": "桑珠孜区",
  "value": "540202" },

{
  "label": "南木林县",
  "value": "540221" },

{
  "label": "江孜县",
  "value": "540222" },

{
  "label": "定日县",
  "value": "540223" },

{
  "label": "萨迦县",
  "value": "540224" },

{
  "label": "拉孜县",
  "value": "540225" },

{
  "label": "昂仁县",
  "value": "540226" },

{
  "label": "谢通门县",
  "value": "540227" },

{
  "label": "白朗县",
  "value": "540228" },

{
  "label": "仁布县",
  "value": "540229" },

{
  "label": "康马县",
  "value": "540230" },

{
  "label": "定结县",
  "value": "540231" },

{
  "label": "仲巴县",
  "value": "540232" },

{
  "label": "亚东县",
  "value": "540233" },

{
  "label": "吉隆县",
  "value": "540234" },

{
  "label": "聂拉木县",
  "value": "540235" },

{
  "label": "萨嘎县",
  "value": "540236" },

{
  "label": "岗巴县",
  "value": "540237" }],


[{
  "label": "卡若区",
  "value": "540302" },

{
  "label": "江达县",
  "value": "540321" },

{
  "label": "贡觉县",
  "value": "540322" },

{
  "label": "类乌齐县",
  "value": "540323" },

{
  "label": "丁青县",
  "value": "540324" },

{
  "label": "察雅县",
  "value": "540325" },

{
  "label": "八宿县",
  "value": "540326" },

{
  "label": "左贡县",
  "value": "540327" },

{
  "label": "芒康县",
  "value": "540328" },

{
  "label": "洛隆县",
  "value": "540329" },

{
  "label": "边坝县",
  "value": "540330" }],


[{
  "label": "巴宜区",
  "value": "540402" },

{
  "label": "工布江达县",
  "value": "540421" },

{
  "label": "米林县",
  "value": "540422" },

{
  "label": "墨脱县",
  "value": "540423" },

{
  "label": "波密县",
  "value": "540424" },

{
  "label": "察隅县",
  "value": "540425" },

{
  "label": "朗县",
  "value": "540426" }],


[{
  "label": "乃东区",
  "value": "540502" },

{
  "label": "扎囊县",
  "value": "540521" },

{
  "label": "贡嘎县",
  "value": "540522" },

{
  "label": "桑日县",
  "value": "540523" },

{
  "label": "琼结县",
  "value": "540524" },

{
  "label": "曲松县",
  "value": "540525" },

{
  "label": "措美县",
  "value": "540526" },

{
  "label": "洛扎县",
  "value": "540527" },

{
  "label": "加查县",
  "value": "540528" },

{
  "label": "隆子县",
  "value": "540529" },

{
  "label": "错那县",
  "value": "540530" },

{
  "label": "浪卡子县",
  "value": "540531" }],


[{
  "label": "那曲县",
  "value": "542421" },

{
  "label": "嘉黎县",
  "value": "542422" },

{
  "label": "比如县",
  "value": "542423" },

{
  "label": "聂荣县",
  "value": "542424" },

{
  "label": "安多县",
  "value": "542425" },

{
  "label": "申扎县",
  "value": "542426" },

{
  "label": "索县",
  "value": "542427" },

{
  "label": "班戈县",
  "value": "542428" },

{
  "label": "巴青县",
  "value": "542429" },

{
  "label": "尼玛县",
  "value": "542430" },

{
  "label": "双湖县",
  "value": "542431" }],


[{
  "label": "普兰县",
  "value": "542521" },

{
  "label": "札达县",
  "value": "542522" },

{
  "label": "噶尔县",
  "value": "542523" },

{
  "label": "日土县",
  "value": "542524" },

{
  "label": "革吉县",
  "value": "542525" },

{
  "label": "改则县",
  "value": "542526" },

{
  "label": "措勤县",
  "value": "542527" }]],



[
[{
  "label": "新城区",
  "value": "610102" },

{
  "label": "碑林区",
  "value": "610103" },

{
  "label": "莲湖区",
  "value": "610104" },

{
  "label": "灞桥区",
  "value": "610111" },

{
  "label": "未央区",
  "value": "610112" },

{
  "label": "雁塔区",
  "value": "610113" },

{
  "label": "阎良区",
  "value": "610114" },

{
  "label": "临潼区",
  "value": "610115" },

{
  "label": "长安区",
  "value": "610116" },

{
  "label": "高陵区",
  "value": "610117" },

{
  "label": "鄠邑区",
  "value": "610118" },

{
  "label": "蓝田县",
  "value": "610122" },

{
  "label": "周至县",
  "value": "610124" }],


[{
  "label": "王益区",
  "value": "610202" },

{
  "label": "印台区",
  "value": "610203" },

{
  "label": "耀州区",
  "value": "610204" },

{
  "label": "宜君县",
  "value": "610222" }],


[{
  "label": "渭滨区",
  "value": "610302" },

{
  "label": "金台区",
  "value": "610303" },

{
  "label": "陈仓区",
  "value": "610304" },

{
  "label": "凤翔县",
  "value": "610322" },

{
  "label": "岐山县",
  "value": "610323" },

{
  "label": "扶风县",
  "value": "610324" },

{
  "label": "眉县",
  "value": "610326" },

{
  "label": "陇县",
  "value": "610327" },

{
  "label": "千阳县",
  "value": "610328" },

{
  "label": "麟游县",
  "value": "610329" },

{
  "label": "凤县",
  "value": "610330" },

{
  "label": "太白县",
  "value": "610331" }],


[{
  "label": "秦都区",
  "value": "610402" },

{
  "label": "杨陵区",
  "value": "610403" },

{
  "label": "渭城区",
  "value": "610404" },

{
  "label": "三原县",
  "value": "610422" },

{
  "label": "泾阳县",
  "value": "610423" },

{
  "label": "乾县",
  "value": "610424" },

{
  "label": "礼泉县",
  "value": "610425" },

{
  "label": "永寿县",
  "value": "610426" },

{
  "label": "彬县",
  "value": "610427" },

{
  "label": "长武县",
  "value": "610428" },

{
  "label": "旬邑县",
  "value": "610429" },

{
  "label": "淳化县",
  "value": "610430" },

{
  "label": "武功县",
  "value": "610431" },

{
  "label": "兴平市",
  "value": "610481" }],


[{
  "label": "临渭区",
  "value": "610502" },

{
  "label": "华州区",
  "value": "610503" },

{
  "label": "潼关县",
  "value": "610522" },

{
  "label": "大荔县",
  "value": "610523" },

{
  "label": "合阳县",
  "value": "610524" },

{
  "label": "澄城县",
  "value": "610525" },

{
  "label": "蒲城县",
  "value": "610526" },

{
  "label": "白水县",
  "value": "610527" },

{
  "label": "富平县",
  "value": "610528" },

{
  "label": "韩城市",
  "value": "610581" },

{
  "label": "华阴市",
  "value": "610582" }],


[{
  "label": "宝塔区",
  "value": "610602" },

{
  "label": "安塞区",
  "value": "610603" },

{
  "label": "延长县",
  "value": "610621" },

{
  "label": "延川县",
  "value": "610622" },

{
  "label": "子长县",
  "value": "610623" },

{
  "label": "志丹县",
  "value": "610625" },

{
  "label": "吴起县",
  "value": "610626" },

{
  "label": "甘泉县",
  "value": "610627" },

{
  "label": "富县",
  "value": "610628" },

{
  "label": "洛川县",
  "value": "610629" },

{
  "label": "宜川县",
  "value": "610630" },

{
  "label": "黄龙县",
  "value": "610631" },

{
  "label": "黄陵县",
  "value": "610632" }],


[{
  "label": "汉台区",
  "value": "610702" },

{
  "label": "南郑区",
  "value": "610703" },

{
  "label": "城固县",
  "value": "610722" },

{
  "label": "洋县",
  "value": "610723" },

{
  "label": "西乡县",
  "value": "610724" },

{
  "label": "勉县",
  "value": "610725" },

{
  "label": "宁强县",
  "value": "610726" },

{
  "label": "略阳县",
  "value": "610727" },

{
  "label": "镇巴县",
  "value": "610728" },

{
  "label": "留坝县",
  "value": "610729" },

{
  "label": "佛坪县",
  "value": "610730" }],


[{
  "label": "榆阳区",
  "value": "610802" },

{
  "label": "横山区",
  "value": "610803" },

{
  "label": "府谷县",
  "value": "610822" },

{
  "label": "靖边县",
  "value": "610824" },

{
  "label": "定边县",
  "value": "610825" },

{
  "label": "绥德县",
  "value": "610826" },

{
  "label": "米脂县",
  "value": "610827" },

{
  "label": "佳县",
  "value": "610828" },

{
  "label": "吴堡县",
  "value": "610829" },

{
  "label": "清涧县",
  "value": "610830" },

{
  "label": "子洲县",
  "value": "610831" },

{
  "label": "神木市",
  "value": "610881" }],


[{
  "label": "汉滨区",
  "value": "610902" },

{
  "label": "汉阴县",
  "value": "610921" },

{
  "label": "石泉县",
  "value": "610922" },

{
  "label": "宁陕县",
  "value": "610923" },

{
  "label": "紫阳县",
  "value": "610924" },

{
  "label": "岚皋县",
  "value": "610925" },

{
  "label": "平利县",
  "value": "610926" },

{
  "label": "镇坪县",
  "value": "610927" },

{
  "label": "旬阳县",
  "value": "610928" },

{
  "label": "白河县",
  "value": "610929" }],


[{
  "label": "商州区",
  "value": "611002" },

{
  "label": "洛南县",
  "value": "611021" },

{
  "label": "丹凤县",
  "value": "611022" },

{
  "label": "商南县",
  "value": "611023" },

{
  "label": "山阳县",
  "value": "611024" },

{
  "label": "镇安县",
  "value": "611025" },

{
  "label": "柞水县",
  "value": "611026" }]],



[
[{
  "label": "城关区",
  "value": "620102" },

{
  "label": "七里河区",
  "value": "620103" },

{
  "label": "西固区",
  "value": "620104" },

{
  "label": "安宁区",
  "value": "620105" },

{
  "label": "红古区",
  "value": "620111" },

{
  "label": "永登县",
  "value": "620121" },

{
  "label": "皋兰县",
  "value": "620122" },

{
  "label": "榆中县",
  "value": "620123" },

{
  "label": "兰州新区",
  "value": "620171" }],


[{
  "label": "嘉峪关市",
  "value": "620201" }],

[{
  "label": "金川区",
  "value": "620302" },

{
  "label": "永昌县",
  "value": "620321" }],


[{
  "label": "白银区",
  "value": "620402" },

{
  "label": "平川区",
  "value": "620403" },

{
  "label": "靖远县",
  "value": "620421" },

{
  "label": "会宁县",
  "value": "620422" },

{
  "label": "景泰县",
  "value": "620423" }],


[{
  "label": "秦州区",
  "value": "620502" },

{
  "label": "麦积区",
  "value": "620503" },

{
  "label": "清水县",
  "value": "620521" },

{
  "label": "秦安县",
  "value": "620522" },

{
  "label": "甘谷县",
  "value": "620523" },

{
  "label": "武山县",
  "value": "620524" },

{
  "label": "张家川回族自治县",
  "value": "620525" }],


[{
  "label": "凉州区",
  "value": "620602" },

{
  "label": "民勤县",
  "value": "620621" },

{
  "label": "古浪县",
  "value": "620622" },

{
  "label": "天祝藏族自治县",
  "value": "620623" }],


[{
  "label": "甘州区",
  "value": "620702" },

{
  "label": "肃南裕固族自治县",
  "value": "620721" },

{
  "label": "民乐县",
  "value": "620722" },

{
  "label": "临泽县",
  "value": "620723" },

{
  "label": "高台县",
  "value": "620724" },

{
  "label": "山丹县",
  "value": "620725" }],


[{
  "label": "崆峒区",
  "value": "620802" },

{
  "label": "泾川县",
  "value": "620821" },

{
  "label": "灵台县",
  "value": "620822" },

{
  "label": "崇信县",
  "value": "620823" },

{
  "label": "华亭县",
  "value": "620824" },

{
  "label": "庄浪县",
  "value": "620825" },

{
  "label": "静宁县",
  "value": "620826" },

{
  "label": "平凉工业园区",
  "value": "620871" }],


[{
  "label": "肃州区",
  "value": "620902" },

{
  "label": "金塔县",
  "value": "620921" },

{
  "label": "瓜州县",
  "value": "620922" },

{
  "label": "肃北蒙古族自治县",
  "value": "620923" },

{
  "label": "阿克塞哈萨克族自治县",
  "value": "620924" },

{
  "label": "玉门市",
  "value": "620981" },

{
  "label": "敦煌市",
  "value": "620982" }],


[{
  "label": "西峰区",
  "value": "621002" },

{
  "label": "庆城县",
  "value": "621021" },

{
  "label": "环县",
  "value": "621022" },

{
  "label": "华池县",
  "value": "621023" },

{
  "label": "合水县",
  "value": "621024" },

{
  "label": "正宁县",
  "value": "621025" },

{
  "label": "宁县",
  "value": "621026" },

{
  "label": "镇原县",
  "value": "621027" }],


[{
  "label": "安定区",
  "value": "621102" },

{
  "label": "通渭县",
  "value": "621121" },

{
  "label": "陇西县",
  "value": "621122" },

{
  "label": "渭源县",
  "value": "621123" },

{
  "label": "临洮县",
  "value": "621124" },

{
  "label": "漳县",
  "value": "621125" },

{
  "label": "岷县",
  "value": "621126" }],


[{
  "label": "武都区",
  "value": "621202" },

{
  "label": "成县",
  "value": "621221" },

{
  "label": "文县",
  "value": "621222" },

{
  "label": "宕昌县",
  "value": "621223" },

{
  "label": "康县",
  "value": "621224" },

{
  "label": "西和县",
  "value": "621225" },

{
  "label": "礼县",
  "value": "621226" },

{
  "label": "徽县",
  "value": "621227" },

{
  "label": "两当县",
  "value": "621228" }],


[{
  "label": "临夏市",
  "value": "622901" },

{
  "label": "临夏县",
  "value": "622921" },

{
  "label": "康乐县",
  "value": "622922" },

{
  "label": "永靖县",
  "value": "622923" },

{
  "label": "广河县",
  "value": "622924" },

{
  "label": "和政县",
  "value": "622925" },

{
  "label": "东乡族自治县",
  "value": "622926" },

{
  "label": "积石山保安族东乡族撒拉族自治县",
  "value": "622927" }],


[{
  "label": "合作市",
  "value": "623001" },

{
  "label": "临潭县",
  "value": "623021" },

{
  "label": "卓尼县",
  "value": "623022" },

{
  "label": "舟曲县",
  "value": "623023" },

{
  "label": "迭部县",
  "value": "623024" },

{
  "label": "玛曲县",
  "value": "623025" },

{
  "label": "碌曲县",
  "value": "623026" },

{
  "label": "夏河县",
  "value": "623027" }]],



[
[{
  "label": "城东区",
  "value": "630102" },

{
  "label": "城中区",
  "value": "630103" },

{
  "label": "城西区",
  "value": "630104" },

{
  "label": "城北区",
  "value": "630105" },

{
  "label": "大通回族土族自治县",
  "value": "630121" },

{
  "label": "湟中县",
  "value": "630122" },

{
  "label": "湟源县",
  "value": "630123" }],


[{
  "label": "乐都区",
  "value": "630202" },

{
  "label": "平安区",
  "value": "630203" },

{
  "label": "民和回族土族自治县",
  "value": "630222" },

{
  "label": "互助土族自治县",
  "value": "630223" },

{
  "label": "化隆回族自治县",
  "value": "630224" },

{
  "label": "循化撒拉族自治县",
  "value": "630225" }],


[{
  "label": "门源回族自治县",
  "value": "632221" },

{
  "label": "祁连县",
  "value": "632222" },

{
  "label": "海晏县",
  "value": "632223" },

{
  "label": "刚察县",
  "value": "632224" }],


[{
  "label": "同仁县",
  "value": "632321" },

{
  "label": "尖扎县",
  "value": "632322" },

{
  "label": "泽库县",
  "value": "632323" },

{
  "label": "河南蒙古族自治县",
  "value": "632324" }],


[{
  "label": "共和县",
  "value": "632521" },

{
  "label": "同德县",
  "value": "632522" },

{
  "label": "贵德县",
  "value": "632523" },

{
  "label": "兴海县",
  "value": "632524" },

{
  "label": "贵南县",
  "value": "632525" }],


[{
  "label": "玛沁县",
  "value": "632621" },

{
  "label": "班玛县",
  "value": "632622" },

{
  "label": "甘德县",
  "value": "632623" },

{
  "label": "达日县",
  "value": "632624" },

{
  "label": "久治县",
  "value": "632625" },

{
  "label": "玛多县",
  "value": "632626" }],


[{
  "label": "玉树市",
  "value": "632701" },

{
  "label": "杂多县",
  "value": "632722" },

{
  "label": "称多县",
  "value": "632723" },

{
  "label": "治多县",
  "value": "632724" },

{
  "label": "囊谦县",
  "value": "632725" },

{
  "label": "曲麻莱县",
  "value": "632726" }],


[{
  "label": "格尔木市",
  "value": "632801" },

{
  "label": "德令哈市",
  "value": "632802" },

{
  "label": "乌兰县",
  "value": "632821" },

{
  "label": "都兰县",
  "value": "632822" },

{
  "label": "天峻县",
  "value": "632823" },

{
  "label": "大柴旦行政委员会",
  "value": "632857" },

{
  "label": "冷湖行政委员会",
  "value": "632858" },

{
  "label": "茫崖行政委员会",
  "value": "632859" }]],



[
[{
  "label": "兴庆区",
  "value": "640104" },

{
  "label": "西夏区",
  "value": "640105" },

{
  "label": "金凤区",
  "value": "640106" },

{
  "label": "永宁县",
  "value": "640121" },

{
  "label": "贺兰县",
  "value": "640122" },

{
  "label": "灵武市",
  "value": "640181" }],


[{
  "label": "大武口区",
  "value": "640202" },

{
  "label": "惠农区",
  "value": "640205" },

{
  "label": "平罗县",
  "value": "640221" }],


[{
  "label": "利通区",
  "value": "640302" },

{
  "label": "红寺堡区",
  "value": "640303" },

{
  "label": "盐池县",
  "value": "640323" },

{
  "label": "同心县",
  "value": "640324" },

{
  "label": "青铜峡市",
  "value": "640381" }],


[{
  "label": "原州区",
  "value": "640402" },

{
  "label": "西吉县",
  "value": "640422" },

{
  "label": "隆德县",
  "value": "640423" },

{
  "label": "泾源县",
  "value": "640424" },

{
  "label": "彭阳县",
  "value": "640425" }],


[{
  "label": "沙坡头区",
  "value": "640502" },

{
  "label": "中宁县",
  "value": "640521" },

{
  "label": "海原县",
  "value": "640522" }]],



[
[{
  "label": "天山区",
  "value": "650102" },

{
  "label": "沙依巴克区",
  "value": "650103" },

{
  "label": "新市区",
  "value": "650104" },

{
  "label": "水磨沟区",
  "value": "650105" },

{
  "label": "头屯河区",
  "value": "650106" },

{
  "label": "达坂城区",
  "value": "650107" },

{
  "label": "米东区",
  "value": "650109" },

{
  "label": "乌鲁木齐县",
  "value": "650121" },

{
  "label": "乌鲁木齐经济技术开发区",
  "value": "650171" },

{
  "label": "乌鲁木齐高新技术产业开发区",
  "value": "650172" }],


[{
  "label": "独山子区",
  "value": "650202" },

{
  "label": "克拉玛依区",
  "value": "650203" },

{
  "label": "白碱滩区",
  "value": "650204" },

{
  "label": "乌尔禾区",
  "value": "650205" }],


[{
  "label": "高昌区",
  "value": "650402" },

{
  "label": "鄯善县",
  "value": "650421" },

{
  "label": "托克逊县",
  "value": "650422" }],


[{
  "label": "伊州区",
  "value": "650502" },

{
  "label": "巴里坤哈萨克自治县",
  "value": "650521" },

{
  "label": "伊吾县",
  "value": "650522" }],


[{
  "label": "昌吉市",
  "value": "652301" },

{
  "label": "阜康市",
  "value": "652302" },

{
  "label": "呼图壁县",
  "value": "652323" },

{
  "label": "玛纳斯县",
  "value": "652324" },

{
  "label": "奇台县",
  "value": "652325" },

{
  "label": "吉木萨尔县",
  "value": "652327" },

{
  "label": "木垒哈萨克自治县",
  "value": "652328" }],


[{
  "label": "博乐市",
  "value": "652701" },

{
  "label": "阿拉山口市",
  "value": "652702" },

{
  "label": "精河县",
  "value": "652722" },

{
  "label": "温泉县",
  "value": "652723" }],


[{
  "label": "库尔勒市",
  "value": "652801" },

{
  "label": "轮台县",
  "value": "652822" },

{
  "label": "尉犁县",
  "value": "652823" },

{
  "label": "若羌县",
  "value": "652824" },

{
  "label": "且末县",
  "value": "652825" },

{
  "label": "焉耆回族自治县",
  "value": "652826" },

{
  "label": "和静县",
  "value": "652827" },

{
  "label": "和硕县",
  "value": "652828" },

{
  "label": "博湖县",
  "value": "652829" },

{
  "label": "库尔勒经济技术开发区",
  "value": "652871" }],


[{
  "label": "阿克苏市",
  "value": "652901" },

{
  "label": "温宿县",
  "value": "652922" },

{
  "label": "库车县",
  "value": "652923" },

{
  "label": "沙雅县",
  "value": "652924" },

{
  "label": "新和县",
  "value": "652925" },

{
  "label": "拜城县",
  "value": "652926" },

{
  "label": "乌什县",
  "value": "652927" },

{
  "label": "阿瓦提县",
  "value": "652928" },

{
  "label": "柯坪县",
  "value": "652929" }],


[{
  "label": "阿图什市",
  "value": "653001" },

{
  "label": "阿克陶县",
  "value": "653022" },

{
  "label": "阿合奇县",
  "value": "653023" },

{
  "label": "乌恰县",
  "value": "653024" }],


[{
  "label": "喀什市",
  "value": "653101" },

{
  "label": "疏附县",
  "value": "653121" },

{
  "label": "疏勒县",
  "value": "653122" },

{
  "label": "英吉沙县",
  "value": "653123" },

{
  "label": "泽普县",
  "value": "653124" },

{
  "label": "莎车县",
  "value": "653125" },

{
  "label": "叶城县",
  "value": "653126" },

{
  "label": "麦盖提县",
  "value": "653127" },

{
  "label": "岳普湖县",
  "value": "653128" },

{
  "label": "伽师县",
  "value": "653129" },

{
  "label": "巴楚县",
  "value": "653130" },

{
  "label": "塔什库尔干塔吉克自治县",
  "value": "653131" }],


[{
  "label": "和田市",
  "value": "653201" },

{
  "label": "和田县",
  "value": "653221" },

{
  "label": "墨玉县",
  "value": "653222" },

{
  "label": "皮山县",
  "value": "653223" },

{
  "label": "洛浦县",
  "value": "653224" },

{
  "label": "策勒县",
  "value": "653225" },

{
  "label": "于田县",
  "value": "653226" },

{
  "label": "民丰县",
  "value": "653227" }],


[{
  "label": "伊宁市",
  "value": "654002" },

{
  "label": "奎屯市",
  "value": "654003" },

{
  "label": "霍尔果斯市",
  "value": "654004" },

{
  "label": "伊宁县",
  "value": "654021" },

{
  "label": "察布查尔锡伯自治县",
  "value": "654022" },

{
  "label": "霍城县",
  "value": "654023" },

{
  "label": "巩留县",
  "value": "654024" },

{
  "label": "新源县",
  "value": "654025" },

{
  "label": "昭苏县",
  "value": "654026" },

{
  "label": "特克斯县",
  "value": "654027" },

{
  "label": "尼勒克县",
  "value": "654028" }],


[{
  "label": "塔城市",
  "value": "654201" },

{
  "label": "乌苏市",
  "value": "654202" },

{
  "label": "额敏县",
  "value": "654221" },

{
  "label": "沙湾县",
  "value": "654223" },

{
  "label": "托里县",
  "value": "654224" },

{
  "label": "裕民县",
  "value": "654225" },

{
  "label": "和布克赛尔蒙古自治县",
  "value": "654226" }],


[{
  "label": "阿勒泰市",
  "value": "654301" },

{
  "label": "布尔津县",
  "value": "654321" },

{
  "label": "富蕴县",
  "value": "654322" },

{
  "label": "福海县",
  "value": "654323" },

{
  "label": "哈巴河县",
  "value": "654324" },

{
  "label": "青河县",
  "value": "654325" },

{
  "label": "吉木乃县",
  "value": "654326" }],


[{
  "label": "石河子市",
  "value": "659001" },

{
  "label": "阿拉尔市",
  "value": "659002" },

{
  "label": "图木舒克市",
  "value": "659003" },

{
  "label": "五家渠市",
  "value": "659004" },

{
  "label": "铁门关市",
  "value": "659006" }]],



[
[{
  "label": "台北",
  "value": "660101" }],

[{
  "label": "高雄",
  "value": "660201" }],

[{
  "label": "基隆",
  "value": "660301" }],

[{
  "label": "台中",
  "value": "660401" }],

[{
  "label": "台南",
  "value": "660501" }],

[{
  "label": "新竹",
  "value": "660601" }],

[{
  "label": "嘉义",
  "value": "660701" }],

[{
  "label": "宜兰",
  "value": "660801" }],

[{
  "label": "桃园",
  "value": "660901" }],

[{
  "label": "苗栗",
  "value": "661001" }],

[{
  "label": "彰化",
  "value": "661101" }],

[{
  "label": "南投",
  "value": "661201" }],

[{
  "label": "云林",
  "value": "661301" }],

[{
  "label": "屏东",
  "value": "661401" }],

[{
  "label": "台东",
  "value": "661501" }],

[{
  "label": "花莲",
  "value": "661601" }],

[{
  "label": "澎湖",
  "value": "661701" }]],


[
[{
  "label": "香港岛",
  "value": "670101" }],

[{
  "label": "九龙",
  "value": "670201" }],

[{
  "label": "新界",
  "value": "670301" }]],


[
[{
  "label": "澳门半岛",
  "value": "680101" }],

[{
  "label": "氹仔岛",
  "value": "680201" }],

[{
  "label": "路环岛",
  "value": "680301" }],

[{
  "label": "路氹城",
  "value": "680401" }]]];var _default =



areaData;exports.default = _default;

/***/ }),

/***/ 725:
/*!************************************************************!*\
  !*** D:/UAD/Jdt-zhcx/components/GRZX/w-picker/w-picker.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var forMatNum = function forMatNum(num) {
  return num < 10 ? '0' + num : num + '';
};
var initPicker = {
  //日期
  date: {
    init: function init(start, end) {var mode = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "date";var step = arguments.length > 3 ? arguments[3] : undefined;var value = arguments.length > 4 ? arguments[4] : undefined;var flag = arguments.length > 5 ? arguments[5] : undefined;var disabled = arguments.length > 6 ? arguments[6] : undefined;
      var aToday = new Date();
      var tYear,tMonth,tDay,tHours,tMinutes,tSeconds,defaultVal = [];
      var initstartDate = new Date(start.toString());
      var endDate = new Date(end.toString());
      if (start > end) {
        initstartDate = new Date(end.toString());
        endDate = new Date(start.toString());
      };
      var startYear = initstartDate.getFullYear();
      var startMonth = initstartDate.getMonth() + 1;
      var endYear = endDate.getFullYear();
      var years = [],months = [],days = [],hours = [],minutes = [],seconds = [],areas = [],returnArr = [];
      var curMonth = flag ? value[1] * 1 : value[1] + 1;
      var dYear = aToday.getFullYear();
      var dMonth = aToday.getMonth() + 1;
      var dDate = aToday.getDate();
      var totalDays = new Date(startYear, curMonth, 0).getDate();
      var dvalObj = {};
      switch (mode) {
        case "half":
        case "date":
        case "yearMonth":
          var curYear = value[0];
          var _curMonth = value[1];
          if (disabled) {
            for (var s = startYear; s <= dYear; s++) {
              years.push(s + '');
            };
            if (curYear == dYear) {
              for (var m = 1; m <= dMonth; m++) {
                months.push(forMatNum(m));
              };
            } else {
              for (var _m = 1; _m <= 12; _m++) {
                months.push(forMatNum(_m));
              };
            }
            if (_curMonth == dMonth) {
              for (var d = 1; d <= dDate; d++) {
                days.push(forMatNum(d));
              }
            } else {
              for (var _d = 1; _d <= totalDays; _d++) {
                days.push(forMatNum(_d));
              }
            }

          } else {
            for (var _s = startYear; _s <= endYear; _s++) {
              years.push(_s + '');
            };
            for (var _m2 = 1; _m2 <= 12; _m2++) {
              months.push(forMatNum(_m2));
            };
            for (var _d2 = 1; _d2 <= totalDays; _d2++) {
              days.push(forMatNum(_d2));
            }
          };
          break;
        default:
          for (var _s2 = startYear; _s2 <= endYear; _s2++) {
            years.push(_s2 + '');
          };
          for (var _m3 = 1; _m3 <= 12; _m3++) {
            months.push(forMatNum(_m3));
          };
          for (var _d3 = 1; _d3 <= totalDays; _d3++) {
            days.push(forMatNum(_d3));
          }
          break;}

      for (var h = 0; h < 24; h++) {
        hours.push(forMatNum(h));
      }
      for (var _m4 = 0; _m4 < 60; _m4 += step * 1) {
        minutes.push(forMatNum(_m4));
      }
      for (var _s3 = 0; _s3 < 60; _s3++) {
        seconds.push(forMatNum(_s3));
      }
      if (flag) {
        returnArr = [
        years.indexOf(value[0]),
        months.indexOf(value[1]),
        days.indexOf(value[2]),
        hours.indexOf(value[3]),
        minutes.indexOf(value[4]) == -1 ? 0 : minutes.indexOf(value[4]),
        seconds.indexOf(value[5])];

      }
      switch (mode) {
        case "range":
          if (flag) {
            defaultVal = [returnArr[0], returnArr[1], returnArr[2], 0, returnArr[0], returnArr[1], returnArr[2]];
            return { years: years, months: months, days: days, defaultVal: defaultVal };
          } else {
            return { years: years, months: months, days: days };
          }
          break;
        case "date":
          if (flag) {
            defaultVal = [returnArr[0], returnArr[1], returnArr[2]];
            return { years: years, months: months, days: days, defaultVal: defaultVal };
          } else {
            defaultVal = [
            years.indexOf(value[0]) == -1 ? 0 : years.indexOf(value[0]),
            months.indexOf(value[1]) == -1 ? 0 : months.indexOf(value[1]),
            days.indexOf(value[2]) == -1 ? 0 : days.indexOf(value[2])];

            return { years: years, months: months, days: days, defaultVal: defaultVal };
          }
          break;
        case "half":
          areas = [{
            label: "上午",
            value: 0 },
          {
            label: "下午",
            value: 1 }];

          if (flag) {
            defaultVal = [returnArr[0], returnArr[1], returnArr[2], returnArr[3]];
            return { years: years, months: months, days: days, areas: areas, defaultVal: defaultVal };
          } else {
            var idx = 0;
            areas.map(function (v, k) {
              if (v.label == value[3]) {
                idx = v.value;
              }
            });
            defaultVal = [
            years.indexOf(value[0]) == -1 ? 0 : years.indexOf(value[0]),
            months.indexOf(value[1]) == -1 ? 0 : months.indexOf(value[1]),
            days.indexOf(value[2]) == -1 ? 0 : days.indexOf(value[2]),
            idx];

            return { years: years, months: months, days: days, areas: areas, defaultVal: defaultVal };
          }
          break;
        case "yearMonth":
          if (flag) {
            defaultVal = [returnArr[0], returnArr[1]];
            return { years: years, months: months, defaultVal: defaultVal };
          } else {
            defaultVal = [
            years.indexOf(value[0]) == -1 ? 0 : years.indexOf(value[0]),
            months.indexOf(value[1]) == -1 ? 0 : months.indexOf(value[1])];

            return { years: years, months: months, defaultVal: defaultVal };
          }
          break;
        case "dateTime":
          if (flag) {
            defaultVal = returnArr;
          } else {
            defaultVal = [
            years.indexOf(value[0]) == -1 ? 0 : years.indexOf(value[0]),
            months.indexOf(value[1]) == -1 ? 0 : months.indexOf(value[1]),
            days.indexOf(value[2]) == -1 ? 0 : days.indexOf(value[2]),
            hours.indexOf(value[3]) == -1 ? 0 : hours.indexOf(value[3]),
            minutes.indexOf(value[4]) == -1 ? 0 : minutes.indexOf(value[4]),
            seconds.indexOf(value[5]) == -1 ? 0 : seconds.indexOf(value[5])];

          }
          return { years: years, months: months, days: days, hours: hours, minutes: minutes, seconds: seconds, defaultVal: defaultVal };
          break;
        case "time":
          if (flag) {
            defaultVal = [returnArr[3], returnArr[4], returnArr[5]];
          } else {
            defaultVal = [
            hours.indexOf(value[0]) == -1 ? 0 : hours.indexOf(value[0]),
            minutes.indexOf(value[1]) == -1 ? 0 : minutes.indexOf(value[1]),
            seconds.indexOf(value[2]) == -1 ? 0 : seconds.indexOf(value[2])];

          }
          return { hours: hours, minutes: minutes, seconds: seconds, defaultVal: defaultVal };
          break;}

    },
    initMonths: function initMonths(year, disabled) {
      var aDate = new Date();
      var dYear = aDate.getFullYear();
      var dMonth = aDate.getMonth() + 1;
      var dDate = aDate.getDate();
      var flag = dYear == year ? true : false;
      var months = [];
      if (disabled) {
        if (flag) {
          for (var m = 1; m <= dMonth; m++) {
            months.push(forMatNum(m));
          };
        } else {
          for (var _m5 = 1; _m5 <= 12; _m5++) {
            months.push(forMatNum(_m5));
          };
        }
      } else {
        for (var _m6 = 1; _m6 <= 12; _m6++) {
          months.push(forMatNum(_m6));
        };
      };
      return months;
    },
    initDays: function initDays(year, month, disabled) {
      var aDate = new Date();
      var dYear = aDate.getFullYear();
      var dMonth = aDate.getMonth() + 1;
      var dDate = aDate.getDate();
      var flag = dYear == year && dMonth == month ? true : false;
      var totalDays = new Date(year, month, 0).getDate();
      var dates = [];
      if (flag && disabled) {
        for (var d = 1; d <= dDate; d++) {
          dates.push(forMatNum(d));
        };
      } else {
        for (var _d4 = 1; _d4 <= totalDays; _d4++) {
          dates.push(forMatNum(_d4));
        };
      };
      return dates;
    } },

  //短期日期上下午
  limitHour: {
    init: function init() {var dayStep = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 7;var dVal = arguments.length > 1 ? arguments[1] : undefined;
      var startDate = new Date();
      var date = [],areas = [],hours = [];
      var hour = new Date().getHours();
      var weeks = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
      var arrs = [];
      var defaultVal = [];
      var d = 0,a = 0,h = 0;
      for (var i = 0; i < dayStep; i++) {
        var year = void 0,month = void 0,day = void 0,weekday = void 0;
        year = startDate.getFullYear();
        month = forMatNum(startDate.getMonth() + 1);
        day = forMatNum(startDate.getDate());
        weekday = weeks[startDate.getDay()];
        var label = "";
        switch (i) {
          case 0:
            label = "今天";
            break;
          case 1:
            label = "明天";
            break;
          case 2:
            label = "后天";
            break;
          default:
            label = month + "月" + day + "日" + " " + weekday;
            break;}

        date.push({
          label: label,
          value: year + "-" + month + "-" + day,
          today: i == 0 ? true : false });

        startDate.setDate(startDate.getDate() + 1);
      }
      if (hour > 12) {
        areas = [{
          label: "下午",
          value: 1 }];

      } else {
        areas = [{
          label: "上午",
          value: 0 },
        {
          label: "下午",
          value: 1 }];

      };
      for (var k = hour > 12 ? hour - 12 : hour; k <= 12; k++) {
        hours.push({
          label: forMatNum(k),
          value: forMatNum(hour > 12 ? k + 12 : k) });

      };
      date.map(function (v, k) {
        if (v.label == dVal[0]) {
          d = k;
        }
      });
      if (d != 0) {
        areas = this.initAreas(date[d]);
        hours = this.initHours(date[d], areas[a]);
      }
      areas.map(function (v, k) {
        if (v.label == dVal[1]) {
          a = k;
        }
      });
      hours.map(function (v, k) {
        if (v.label == dVal[2]) {
          h = k;
        }
      });
      defaultVal = [d, a, h];
      return { date: date, areas: areas, hours: hours, defaultVal: defaultVal };
    },
    initAreas: function initAreas(date) {
      var areas = [];
      var hour = new Date().getHours();
      if (date.today) {
        if (hour > 12) {
          areas = [{
            label: "下午",
            value: 1 }];

        } else {
          areas = [{
            label: "上午",
            value: 0 },
          {
            label: "下午",
            value: 1 }];

        };
      } else {
        areas = [{
          label: "上午",
          value: 0 },
        {
          label: "下午",
          value: 1 }];

      }
      return areas;
    },
    initHours: function initHours(dateCol, hourCol) {
      var hours = [];
      var hour = new Date().getHours();
      if (dateCol.today) {
        if (hourCol.value == 1 && hour <= 12) {
          for (var k = 1; k <= 12; k++) {
            hours.push({
              label: forMatNum(k),
              value: forMatNum(hourCol.value == 1 ? k + 12 : k) });

          };
        } else {
          for (var _k = hour > 12 ? hour - 12 : hour; _k <= 12; _k++) {
            hours.push({
              label: forMatNum(_k),
              value: forMatNum(hourCol.value == 1 ? _k + 12 : _k) });

          };
        }

      } else {
        for (var _k2 = 1; _k2 <= 12; _k2++) {
          hours.push({
            label: forMatNum(_k2),
            value: forMatNum(hourCol.value == 1 ? _k2 + 12 : _k2) });

        };
      };
      return hours;
    } },

  //短期日期时间初始化
  limit: {
    init: function init() {var dayStep = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 7;var startHour = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 8;var endHour = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 20;var minuteStep = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;var afterStep = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 30;var dVal = arguments.length > 5 ? arguments[5] : undefined;
      var startDate = new Date();
      var bsDate = new Date(new Date().getTime() + afterStep * 60 * 1000);
      var date = [],hours = [],minutes = [];
      var hour = bsDate.getHours();
      var minute = Math.floor(bsDate.getMinutes() / minuteStep) * minuteStep;
      var weeks = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
      var d = 0,h = 0,m = 0;
      var defaultVal = [];
      for (var i = 0; i < dayStep; i++) {
        var year = void 0,month = void 0,day = void 0,weekday = void 0;
        year = startDate.getFullYear();
        month = forMatNum(startDate.getMonth() + 1);
        day = forMatNum(startDate.getDate());
        weekday = weeks[startDate.getDay()];
        var label = "";
        switch (i) {
          case 0:
            label = "今天";
            break;
          case 1:
            label = "明天";
            break;
          case 2:
            label = "后天";
            break;
          default:
            label = month + "月" + day + "日" + " " + weekday;
            break;}

        date.push({
          label: label,
          value: year + "-" + month + "-" + day,
          flag: i == 0 ? true : false });

        startDate.setDate(startDate.getDate() + 1);
      }
      if (hour < startHour) {
        hour = startHour;
      };
      if (hour > endHour) {
        hour = endHour;
      };
      for (var k = hour * 1; k <= endHour * 1; k++) {
        hours.push({
          label: forMatNum(k),
          value: forMatNum(k),
          flag: k == hour ? true : false });

      };
      for (var j = minute; j < 60; j += minuteStep * 1) {
        minutes.push({
          label: forMatNum(j),
          value: forMatNum(j) });

      }
      date.map(function (v, k) {
        if (v.label == dVal[0]) {
          d = k;
        }
      });
      if (d != 0) {
        hours = this.initHours(startHour = 8, endHour = 20, minuteStep = 1, afterStep = 30, date[d].value);
      }
      hours.map(function (v, k) {
        if (v.label == dVal[1]) {
          h = k;
        }
      });
      minutes.map(function (v, k) {
        if (v.label == dVal[2]) {
          m = k;
        }
      });
      defaultVal = [d, h, m];
      return { date: date, hours: hours, minutes: minutes, defaultVal: defaultVal };
    },
    initHours: function initHours() {var startHour = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 8;var endHour = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 20;var minuteStep = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;var afterStep = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 30;var date = arguments.length > 4 ? arguments[4] : undefined;
      var hours = [];
      var arr = date.split("-");
      var aDate = new Date();
      var dYear = aDate.getFullYear();
      var dMonth = aDate.getMonth() + 1;
      var dDate = aDate.getDate();
      var bsDate = new Date(new Date().getTime() + afterStep * 60 * 1000);
      var hour = bsDate.getHours();
      var flag = dYear == arr[0] && dMonth == arr[1] && dDate == arr[2] ? true : false;
      if (hour > endHour) {
        hour = endHour;
      };
      if (flag) {
        for (var k = hour * 1; k <= endHour * 1; k++) {
          hours.push({
            label: forMatNum(k),
            value: forMatNum(k),
            flag: k == hour ? true : false });

        };
      } else {
        for (var _k3 = startHour * 1; _k3 <= endHour * 1; _k3++) {
          hours.push({
            label: forMatNum(_k3),
            value: forMatNum(_k3),
            flag: false });

        }
      };
      return hours;
    },
    initMinutes: function initMinutes() {var startHour = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 8;var endHour = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 20;var minuteStep = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;var afterStep = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 30;var date = arguments.length > 4 ? arguments[4] : undefined;var hour = arguments.length > 5 ? arguments[5] : undefined;
      var minutes = [];
      var bsDate = new Date(new Date().getTime() + afterStep * 60 * 1000);
      var arr = date.split("-");
      var aDate = new Date();
      var dYear = aDate.getFullYear();
      var dMonth = aDate.getMonth() + 1;
      var dDate = aDate.getDate();
      var dHour = bsDate.getHours();;
      var minute = Math.floor(bsDate.getMinutes() / minuteStep) * minuteStep;
      var flag = dYear == arr[0] && dMonth == arr[1] && dDate == arr[2] ? true : false;
      if (flag) {
        if (hour == dHour) {
          for (var j = minute; j < 60; j += minuteStep * 1) {
            minutes.push({
              label: forMatNum(j),
              value: forMatNum(j) });

          }
        } else {
          for (var _j = 0; _j < 60; _j += minuteStep * 1) {
            minutes.push({
              label: forMatNum(_j),
              value: forMatNum(_j) });

          }
        }

      } else {
        for (var _j2 = 0; _j2 < 60; _j2 += minuteStep * 1) {
          minutes.push({
            label: forMatNum(_j2),
            value: forMatNum(_j2) });

        }
      }
      return minutes;
    } },

  //选择区间初始化
  range: {
    init: function init(start, end, value, flag) {
      var aToday = new Date();
      var tYear,tMonth,tDay,tHours,tMinutes,tSeconds,defaultVal = [];
      var initstartDate = new Date(start.toString());
      var endDate = new Date(end.toString());
      if (start > end) {
        initstartDate = new Date(end.toString());
        endDate = new Date(start.toString());
      };
      var startYear = initstartDate.getFullYear();
      var startMonth = initstartDate.getMonth() + 1;
      var endYear = endDate.getFullYear();
      var fyears = [],fmonths = [],fdays = [],tyears = [],tmonths = [],tdays = [],returnArr = [];
      var curMonth = flag ? value[1] * 1 : value[1] + 1;
      var totalDays = new Date(startYear, curMonth, 0).getDate();
      for (var s = startYear; s <= endYear; s++) {
        fyears.push(s + '');
      };
      for (var m = 1; m <= 12; m++) {
        fmonths.push(forMatNum(m));
      };
      for (var d = 1; d <= totalDays; d++) {
        fdays.push(forMatNum(d));
      };
      for (var _s4 = startYear; _s4 <= endYear; _s4++) {
        tyears.push(_s4 + '');
      };
      for (var _m7 = 1; _m7 <= 12; _m7++) {
        tmonths.push(forMatNum(_m7));
      };
      for (var _d5 = 1; _d5 <= totalDays; _d5++) {
        tdays.push(forMatNum(_d5));
      };
      defaultVal = [
      fyears.indexOf(value[0]) == -1 ? 0 : fyears.indexOf(value[0]),
      fmonths.indexOf(value[1]) == -1 ? 0 : fmonths.indexOf(value[1]),
      fdays.indexOf(value[2]) == -1 ? 0 : fdays.indexOf(value[2]),
      0,
      tyears.indexOf(value[4]) == -1 ? 0 : tyears.indexOf(value[4]),
      tmonths.indexOf(value[5]) == -1 ? 0 : tmonths.indexOf(value[5]),
      tdays.indexOf(value[6]) == -1 ? 0 : tdays.indexOf(value[6])];

      return {
        fyears: fyears,
        fmonths: fmonths,
        fdays: fdays,
        tyears: tyears,
        tmonths: tmonths,
        tdays: tdays,
        defaultVal: defaultVal };

    },
    initDays: function initDays(year, month) {
      var totalDays = new Date(year, month, 0).getDate();
      var dates = [];
      for (var d = 1; d <= totalDays; d++) {
        dates.push(forMatNum(d));
      };
      return dates;
    } } };var _default =



initPicker;exports.default = _default;

/***/ }),

/***/ 733:
/*!**********************************************************************!*\
  !*** D:/UAD/Jdt-zhcx/components/GRZX/wangding-pickerAddress/data.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = [
{
  "provinceCode": "110000",
  "provinceName": "北京",
  "city": [{
    "cityCode": "110000-1",
    "cityName": "北京市",
    "county": [{
      "countyCode": "110115",
      "countyName": "大兴区" },
    {
      "countyCode": "110116",
      "countyName": "怀柔区" },
    {
      "countyCode": "110105",
      "countyName": "朝阳区" },
    {
      "countyCode": "110229",
      "countyName": "延庆区" },
    {
      "countyCode": "110114",
      "countyName": "昌平区" },
    {
      "countyCode": "110108",
      "countyName": "海淀区" },
    {
      "countyCode": "110107",
      "countyName": "石景山区" },
    {
      "countyCode": "110112",
      "countyName": "通州区" },
    {
      "countyCode": "110228",
      "countyName": "密云区" },
    {
      "countyCode": "110117",
      "countyName": "平谷区" },
    {
      "countyCode": "110109",
      "countyName": "门头沟区" },
    {
      "countyCode": "110113",
      "countyName": "顺义区" },
    {
      "countyCode": "110106",
      "countyName": "丰台区" },
    {
      "countyCode": "110111",
      "countyName": "房山区" },
    {
      "countyCode": "110101",
      "countyName": "东城区" },
    {
      "countyCode": "110102",
      "countyName": "西城区" }] }] },


{
  "provinceCode": "120000",
  "provinceName": "天津",
  "city": [{
    "cityCode": "120000-1",
    "cityName": "天津市",
    "county": [{
      "countyCode": "120103",
      "countyName": "河西区" },
    {
      "countyCode": "120106",
      "countyName": "红桥区" },
    {
      "countyCode": "120223",
      "countyName": "静海区" },
    {
      "countyCode": "120114",
      "countyName": "武清区" },
    {
      "countyCode": "120110",
      "countyName": "东丽区" },
    {
      "countyCode": "120111",
      "countyName": "西青区" },
    {
      "countyCode": "120225",
      "countyName": "蓟州区" },
    {
      "countyCode": "120116",
      "countyName": "滨海新区" },
    {
      "countyCode": "120113",
      "countyName": "北辰区" },
    {
      "countyCode": "120115",
      "countyName": "宝坻区" },
    {
      "countyCode": "120101",
      "countyName": "和平区" },
    {
      "countyCode": "120112",
      "countyName": "津南区" },
    {
      "countyCode": "120221",
      "countyName": "宁河区" },
    {
      "countyCode": "120104",
      "countyName": "南开区" },
    {
      "countyCode": "120105",
      "countyName": "河北区" },
    {
      "countyCode": "120102",
      "countyName": "河东区" }] }] },


{
  "provinceCode": "130000",
  "provinceName": "河北省",
  "city": [{
    "cityCode": "130400",
    "cityName": "邯郸市",
    "county": [{
      "countyCode": "130404",
      "countyName": "复兴区" },
    {
      "countyCode": "130424",
      "countyName": "成安县" },
    {
      "countyCode": "130403",
      "countyName": "丛台区" },
    {
      "countyCode": "130402",
      "countyName": "邯山区" },
    {
      "countyCode": "130434",
      "countyName": "魏县" },
    {
      "countyCode": "130429",
      "countyName": "永年区" },
    {
      "countyCode": "130427",
      "countyName": "磁县" },
    {
      "countyCode": "130433",
      "countyName": "馆陶县" },
    {
      "countyCode": "130421",
      "countyName": "邯郸县" },
    {
      "countyCode": "130435",
      "countyName": "曲周县" },
    {
      "countyCode": "130425",
      "countyName": "大名县" },
    {
      "countyCode": "130426",
      "countyName": "涉县" },
    {
      "countyCode": "130423",
      "countyName": "临漳县" },
    {
      "countyCode": "130431",
      "countyName": "鸡泽县" },
    {
      "countyCode": "130406",
      "countyName": "峰峰矿区" },
    {
      "countyCode": "130430",
      "countyName": "邱县" },
    {
      "countyCode": "130428",
      "countyName": "肥乡区" },
    {
      "countyCode": "130432",
      "countyName": "广平县" },
    {
      "countyCode": "130481",
      "countyName": "武安市" }] },

  {
    "cityCode": "131100",
    "cityName": "衡水市",
    "county": [{
      "countyCode": "131127",
      "countyName": "景县" },
    {
      "countyCode": "131102",
      "countyName": "桃城区" },
    {
      "countyCode": "131128",
      "countyName": "阜城县" },
    {
      "countyCode": "131125",
      "countyName": "安平县" },
    {
      "countyCode": "131121",
      "countyName": "枣强县" },
    {
      "countyCode": "131123",
      "countyName": "武强县" },
    {
      "countyCode": "131122",
      "countyName": "武邑县" },
    {
      "countyCode": "131181",
      "countyName": "冀州区" },
    {
      "countyCode": "131126",
      "countyName": "故城县" },
    {
      "countyCode": "131124",
      "countyName": "饶阳县" },
    {
      "countyCode": "131182",
      "countyName": "深州市" }] },

  {
    "cityCode": "130900",
    "cityName": "沧州市",
    "county": [{
      "countyCode": "130930",
      "countyName": "孟村回族自治县" },
    {
      "countyCode": "130923",
      "countyName": "东光县" },
    {
      "countyCode": "130981",
      "countyName": "泊头市" },
    {
      "countyCode": "130924",
      "countyName": "海兴县" },
    {
      "countyCode": "130927",
      "countyName": "南皮县" },
    {
      "countyCode": "130922",
      "countyName": "青县" },
    {
      "countyCode": "130902",
      "countyName": "新华区" },
    {
      "countyCode": "130925",
      "countyName": "盐山县" },
    {
      "countyCode": "130903",
      "countyName": "运河区" },
    {
      "countyCode": "130921",
      "countyName": "沧县" },
    {
      "countyCode": "130984",
      "countyName": "河间市" },
    {
      "countyCode": "130926",
      "countyName": "肃宁县" },
    {
      "countyCode": "130982",
      "countyName": "任丘市" },
    {
      "countyCode": "130983",
      "countyName": "黄骅市" },
    {
      "countyCode": "130928",
      "countyName": "吴桥县" },
    {
      "countyCode": "130929",
      "countyName": "献县" }] },

  {
    "cityCode": "130200",
    "cityName": "唐山市",
    "county": [{
      "countyCode": "130207",
      "countyName": "丰南区" },
    {
      "countyCode": "130204",
      "countyName": "古冶区" },
    {
      "countyCode": "130224",
      "countyName": "滦南县" },
    {
      "countyCode": "130209",
      "countyName": "曹妃甸区" },
    {
      "countyCode": "130202",
      "countyName": "路南区" },
    {
      "countyCode": "130208",
      "countyName": "丰润区" },
    {
      "countyCode": "130203",
      "countyName": "路北区" },
    {
      "countyCode": "130281",
      "countyName": "遵化市" },
    {
      "countyCode": "130205",
      "countyName": "开平区" },
    {
      "countyCode": "130283",
      "countyName": "迁安市" },
    {
      "countyCode": "130227",
      "countyName": "迁西县" },
    {
      "countyCode": "130229",
      "countyName": "玉田县" },
    {
      "countyCode": "130225",
      "countyName": "乐亭县" },
    {
      "countyCode": "130223",
      "countyName": "滦州市" }] },

  {
    "cityCode": "130700",
    "cityName": "张家口市",
    "county": [{
      "countyCode": "130728",
      "countyName": "怀安县" },
    {
      "countyCode": "130723",
      "countyName": "康保县" },
    {
      "countyCode": "130702",
      "countyName": "桥东区" },
    {
      "countyCode": "130732",
      "countyName": "赤城县" },
    {
      "countyCode": "130733",
      "countyName": "崇礼区" },
    {
      "countyCode": "130727",
      "countyName": "阳原县" },
    {
      "countyCode": "130731",
      "countyName": "涿鹿县" },
    {
      "countyCode": "130705",
      "countyName": "宣化区" },
    {
      "countyCode": "130722",
      "countyName": "张北县" },
    {
      "countyCode": "130729",
      "countyName": "万全区" },
    {
      "countyCode": "130724",
      "countyName": "沽源县" },
    {
      "countyCode": "130703",
      "countyName": "桥西区" },
    {
      "countyCode": "130706",
      "countyName": "下花园区" },
    {
      "countyCode": "130730",
      "countyName": "怀来县" },
    {
      "countyCode": "130725",
      "countyName": "尚义县" },
    {
      "countyCode": "130726",
      "countyName": "蔚县" },
    {
      "countyCode": "130721",
      "countyName": "宣化县" }] },

  {
    "cityCode": "131000",
    "cityName": "廊坊市",
    "county": [{
      "countyCode": "131002",
      "countyName": "安次区" },
    {
      "countyCode": "131082",
      "countyName": "三河市" },
    {
      "countyCode": "131025",
      "countyName": "大城县" },
    {
      "countyCode": "131023",
      "countyName": "永清县" },
    {
      "countyCode": "131028",
      "countyName": "大厂回族自治县" },
    {
      "countyCode": "131022",
      "countyName": "固安县" },
    {
      "countyCode": "131003",
      "countyName": "广阳区" },
    {
      "countyCode": "131081",
      "countyName": "霸州市" },
    {
      "countyCode": "131026",
      "countyName": "文安县" },
    {
      "countyCode": "131024",
      "countyName": "香河县" }] },

  {
    "cityCode": "130300",
    "cityName": "秦皇岛市",
    "county": [{
      "countyCode": "130323",
      "countyName": "抚宁区" },
    {
      "countyCode": "130321",
      "countyName": "青龙满族自治县" },
    {
      "countyCode": "130303",
      "countyName": "山海关区" },
    {
      "countyCode": "130304",
      "countyName": "北戴河区" },
    {
      "countyCode": "130302",
      "countyName": "海港区" },
    {
      "countyCode": "130322",
      "countyName": "昌黎县" },
    {
      "countyCode": "130324",
      "countyName": "卢龙县" }] },

  {
    "cityCode": "130500",
    "cityName": "邢台市",
    "county": [{
      "countyCode": "130533",
      "countyName": "威县" },
    {
      "countyCode": "130532",
      "countyName": "平乡县" },
    {
      "countyCode": "130527",
      "countyName": "南和县" },
    {
      "countyCode": "130521",
      "countyName": "邢台县" },
    {
      "countyCode": "130524",
      "countyName": "柏乡县" },
    {
      "countyCode": "130522",
      "countyName": "临城县" },
    {
      "countyCode": "130530",
      "countyName": "新河县" },
    {
      "countyCode": "130534",
      "countyName": "清河县" },
    {
      "countyCode": "130582",
      "countyName": "沙河市" },
    {
      "countyCode": "130531",
      "countyName": "广宗县" },
    {
      "countyCode": "130525",
      "countyName": "隆尧县" },
    {
      "countyCode": "130529",
      "countyName": "巨鹿县" },
    {
      "countyCode": "130523",
      "countyName": "内丘县" },
    {
      "countyCode": "130528",
      "countyName": "宁晋县" },
    {
      "countyCode": "130526",
      "countyName": "任县" },
    {
      "countyCode": "130581",
      "countyName": "南宫市" },
    {
      "countyCode": "130535",
      "countyName": "临西县" },
    {
      "countyCode": "130502",
      "countyName": "桥东区" },
    {
      "countyCode": "130503",
      "countyName": "桥西区" }] },

  {
    "cityCode": "130100",
    "cityName": "石家庄市",
    "county": [{
      "countyCode": "130125",
      "countyName": "行唐县" },
    {
      "countyCode": "130185",
      "countyName": "鹿泉区" },
    {
      "countyCode": "130123",
      "countyName": "正定县" },
    {
      "countyCode": "130107",
      "countyName": "井陉矿区" },
    {
      "countyCode": "130102",
      "countyName": "长安区" },
    {
      "countyCode": "130184",
      "countyName": "新乐市" },
    {
      "countyCode": "130183",
      "countyName": "晋州市" },
    {
      "countyCode": "130128",
      "countyName": "深泽县" },
    {
      "countyCode": "130181",
      "countyName": "辛集市" },
    {
      "countyCode": "130124",
      "countyName": "栾城区" },
    {
      "countyCode": "130126",
      "countyName": "灵寿县" },
    {
      "countyCode": "130104",
      "countyName": "桥西区" },
    {
      "countyCode": "130130",
      "countyName": "无极县" },
    {
      "countyCode": "130108",
      "countyName": "裕华区" },
    {
      "countyCode": "130129",
      "countyName": "赞皇县" },
    {
      "countyCode": "130133",
      "countyName": "赵县" },
    {
      "countyCode": "130182",
      "countyName": "藁城区" },
    {
      "countyCode": "130127",
      "countyName": "高邑县" },
    {
      "countyCode": "130132",
      "countyName": "元氏县" },
    {
      "countyCode": "130131",
      "countyName": "平山县" },
    {
      "countyCode": "130121",
      "countyName": "井陉县" },
    {
      "countyCode": "130105",
      "countyName": "新华区" }] },

  {
    "cityCode": "130800",
    "cityName": "承德市",
    "county": [{
      "countyCode": "130803",
      "countyName": "双滦区" },
    {
      "countyCode": "130827",
      "countyName": "宽城满族自治县" },
    {
      "countyCode": "130802",
      "countyName": "双桥区" },
    {
      "countyCode": "130826",
      "countyName": "丰宁满族自治县" },
    {
      "countyCode": "130821",
      "countyName": "承德县" },
    {
      "countyCode": "130828",
      "countyName": "围场满族蒙古族自治县" },
    {
      "countyCode": "130822",
      "countyName": "兴隆县" },
    {
      "countyCode": "130825",
      "countyName": "隆化县" },
    {
      "countyCode": "130823",
      "countyName": "平泉市" },
    {
      "countyCode": "130804",
      "countyName": "鹰手营子矿区" },
    {
      "countyCode": "130824",
      "countyName": "滦平县" }] },

  {
    "cityCode": "130600",
    "cityName": "保定市",
    "county": [{
      "countyCode": "130638",
      "countyName": "雄县" },
    {
      "countyCode": "130625",
      "countyName": "徐水区" },
    {
      "countyCode": "130682",
      "countyName": "定州市" },
    {
      "countyCode": "130631",
      "countyName": "望都县" },
    {
      "countyCode": "130630",
      "countyName": "涞源县" },
    {
      "countyCode": "130621",
      "countyName": "满城区" },
    {
      "countyCode": "130626",
      "countyName": "定兴县" },
    {
      "countyCode": "130624",
      "countyName": "阜平县" },
    {
      "countyCode": "130636",
      "countyName": "顺平县" },
    {
      "countyCode": "130627",
      "countyName": "唐县" },
    {
      "countyCode": "130623",
      "countyName": "涞水县" },
    {
      "countyCode": "130629",
      "countyName": "容城县" },
    {
      "countyCode": "130634",
      "countyName": "曲阳县" },
    {
      "countyCode": "130637",
      "countyName": "博野县" },
    {
      "countyCode": "130622",
      "countyName": "清苑区" },
    {
      "countyCode": "130632",
      "countyName": "安新县" },
    {
      "countyCode": "130684",
      "countyName": "高碑店市" },
    {
      "countyCode": "130633",
      "countyName": "易县" },
    {
      "countyCode": "130628",
      "countyName": "高阳县" },
    {
      "countyCode": "130683",
      "countyName": "安国市" },
    {
      "countyCode": "130604",
      "countyName": "南市区" },
    {
      "countyCode": "130603",
      "countyName": "北市区" },
    {
      "countyCode": "130681",
      "countyName": "涿州市" },
    {
      "countyCode": "130635",
      "countyName": "蠡县" },
    {
      "countyCode": "130602",
      "countyName": "竞秀区" },
    {
      "countyCode": "130606",
      "countyName": "莲池区" }] }] },


{
  "provinceCode": "140000",
  "provinceName": "山西省",
  "city": [{
    "cityCode": "141000",
    "cityName": "临汾市",
    "county": [{
      "countyCode": "141033",
      "countyName": "蒲县" },
    {
      "countyCode": "141025",
      "countyName": "古县" },
    {
      "countyCode": "141034",
      "countyName": "汾西县" },
    {
      "countyCode": "141027",
      "countyName": "浮山县" },
    {
      "countyCode": "141021",
      "countyName": "曲沃县" },
    {
      "countyCode": "141032",
      "countyName": "永和县" },
    {
      "countyCode": "141082",
      "countyName": "霍州市" },
    {
      "countyCode": "141028",
      "countyName": "吉县" },
    {
      "countyCode": "141022",
      "countyName": "翼城县" },
    {
      "countyCode": "141030",
      "countyName": "大宁县" },
    {
      "countyCode": "141081",
      "countyName": "侯马市" },
    {
      "countyCode": "141002",
      "countyName": "尧都区" },
    {
      "countyCode": "141026",
      "countyName": "安泽县" },
    {
      "countyCode": "141024",
      "countyName": "洪洞县" },
    {
      "countyCode": "141023",
      "countyName": "襄汾县" },
    {
      "countyCode": "141029",
      "countyName": "乡宁县" },
    {
      "countyCode": "141031",
      "countyName": "隰县" }] },

  {
    "cityCode": "140200",
    "cityName": "大同市",
    "county": [{
      "countyCode": "140223",
      "countyName": "广灵县" },
    {
      "countyCode": "140203",
      "countyName": "矿区" },
    {
      "countyCode": "140212",
      "countyName": "新荣区" },
    {
      "countyCode": "140224",
      "countyName": "灵丘县" },
    {
      "countyCode": "140222",
      "countyName": "天镇县" },
    {
      "countyCode": "140213",
      "countyName": "平城区" },
    {
      "countyCode": "140227",
      "countyName": "云州区" },
    {
      "countyCode": "140202",
      "countyName": "城区" },
    {
      "countyCode": "140225",
      "countyName": "浑源县" },
    {
      "countyCode": "140221",
      "countyName": "阳高县" },
    {
      "countyCode": "140211",
      "countyName": "南郊区" },
    {
      "countyCode": "140214",
      "countyName": "云冈区" },
    {
      "countyCode": "140226",
      "countyName": "左云县" }] },

  {
    "cityCode": "140700",
    "cityName": "晋中市",
    "county": [{
      "countyCode": "140722",
      "countyName": "左权县" },
    {
      "countyCode": "140721",
      "countyName": "榆社县" },
    {
      "countyCode": "140728",
      "countyName": "平遥县" },
    {
      "countyCode": "140723",
      "countyName": "和顺县" },
    {
      "countyCode": "140726",
      "countyName": "太谷县" },
    {
      "countyCode": "140781",
      "countyName": "介休市" },
    {
      "countyCode": "140725",
      "countyName": "寿阳县" },
    {
      "countyCode": "140727",
      "countyName": "祁县" },
    {
      "countyCode": "140724",
      "countyName": "昔阳县" },
    {
      "countyCode": "140702",
      "countyName": "榆次区" },
    {
      "countyCode": "140729",
      "countyName": "灵石县" }] },

  {
    "cityCode": "140500",
    "cityName": "晋城市",
    "county": [{
      "countyCode": "140521",
      "countyName": "沁水县" },
    {
      "countyCode": "140581",
      "countyName": "高平市" },
    {
      "countyCode": "140524",
      "countyName": "陵川县" },
    {
      "countyCode": "140522",
      "countyName": "阳城县" },
    {
      "countyCode": "140525",
      "countyName": "泽州县" },
    {
      "countyCode": "140502",
      "countyName": "城区" }] },

  {
    "cityCode": "140600",
    "cityName": "朔州市",
    "county": [{
      "countyCode": "140621",
      "countyName": "山阴县" },
    {
      "countyCode": "140623",
      "countyName": "右玉县" },
    {
      "countyCode": "140603",
      "countyName": "平鲁区" },
    {
      "countyCode": "140602",
      "countyName": "朔城区" },
    {
      "countyCode": "140622",
      "countyName": "应县" },
    {
      "countyCode": "140624",
      "countyName": "怀仁市" }] },

  {
    "cityCode": "141100",
    "cityName": "吕梁市",
    "county": [{
      "countyCode": "141125",
      "countyName": "柳林县" },
    {
      "countyCode": "141127",
      "countyName": "岚县" },
    {
      "countyCode": "141122",
      "countyName": "交城县" },
    {
      "countyCode": "141128",
      "countyName": "方山县" },
    {
      "countyCode": "141129",
      "countyName": "中阳县" },
    {
      "countyCode": "141102",
      "countyName": "离石区" },
    {
      "countyCode": "141126",
      "countyName": "石楼县" },
    {
      "countyCode": "141182",
      "countyName": "汾阳市" },
    {
      "countyCode": "141130",
      "countyName": "交口县" },
    {
      "countyCode": "141124",
      "countyName": "临县" },
    {
      "countyCode": "141181",
      "countyName": "孝义市" },
    {
      "countyCode": "141123",
      "countyName": "兴县" },
    {
      "countyCode": "141121",
      "countyName": "文水县" }] },

  {
    "cityCode": "140900",
    "cityName": "忻州市",
    "county": [{
      "countyCode": "140902",
      "countyName": "忻府区" },
    {
      "countyCode": "140922",
      "countyName": "五台县" },
    {
      "countyCode": "140981",
      "countyName": "原平市" },
    {
      "countyCode": "140932",
      "countyName": "偏关县" },
    {
      "countyCode": "140927",
      "countyName": "神池县" },
    {
      "countyCode": "140925",
      "countyName": "宁武县" },
    {
      "countyCode": "140924",
      "countyName": "繁峙县" },
    {
      "countyCode": "140931",
      "countyName": "保德县" },
    {
      "countyCode": "140926",
      "countyName": "静乐县" },
    {
      "countyCode": "140930",
      "countyName": "河曲县" },
    {
      "countyCode": "140921",
      "countyName": "定襄县" },
    {
      "countyCode": "140923",
      "countyName": "代县" },
    {
      "countyCode": "140928",
      "countyName": "五寨县" },
    {
      "countyCode": "140929",
      "countyName": "岢岚县" }] },

  {
    "cityCode": "140100",
    "cityName": "太原市",
    "county": [{
      "countyCode": "140107",
      "countyName": "杏花岭区" },
    {
      "countyCode": "140109",
      "countyName": "万柏林区" },
    {
      "countyCode": "140105",
      "countyName": "小店区" },
    {
      "countyCode": "140181",
      "countyName": "古交市" },
    {
      "countyCode": "140110",
      "countyName": "晋源区" },
    {
      "countyCode": "140122",
      "countyName": "阳曲县" },
    {
      "countyCode": "140108",
      "countyName": "尖草坪区" },
    {
      "countyCode": "140121",
      "countyName": "清徐县" },
    {
      "countyCode": "140123",
      "countyName": "娄烦县" },
    {
      "countyCode": "140106",
      "countyName": "迎泽区" }] },

  {
    "cityCode": "140300",
    "cityName": "阳泉市",
    "county": [{
      "countyCode": "140302",
      "countyName": "城区" },
    {
      "countyCode": "140321",
      "countyName": "平定县" },
    {
      "countyCode": "140311",
      "countyName": "郊区" },
    {
      "countyCode": "140303",
      "countyName": "矿区" },
    {
      "countyCode": "140322",
      "countyName": "盂县" }] },

  {
    "cityCode": "140800",
    "cityName": "运城市",
    "county": [{
      "countyCode": "140802",
      "countyName": "盐湖区" },
    {
      "countyCode": "140829",
      "countyName": "平陆县" },
    {
      "countyCode": "140828",
      "countyName": "夏县" },
    {
      "countyCode": "140825",
      "countyName": "新绛县" },
    {
      "countyCode": "140830",
      "countyName": "芮城县" },
    {
      "countyCode": "140823",
      "countyName": "闻喜县" },
    {
      "countyCode": "140826",
      "countyName": "绛县" },
    {
      "countyCode": "140822",
      "countyName": "万荣县" },
    {
      "countyCode": "140821",
      "countyName": "临猗县" },
    {
      "countyCode": "140827",
      "countyName": "垣曲县" },
    {
      "countyCode": "140824",
      "countyName": "稷山县" },
    {
      "countyCode": "140881",
      "countyName": "永济市" },
    {
      "countyCode": "140882",
      "countyName": "河津市" }] },

  {
    "cityCode": "140400",
    "cityName": "长治市",
    "county": [{
      "countyCode": "140428",
      "countyName": "长子县" },
    {
      "countyCode": "140430",
      "countyName": "沁县" },
    {
      "countyCode": "140426",
      "countyName": "黎城县" },
    {
      "countyCode": "140481",
      "countyName": "潞城市" },
    {
      "countyCode": "140403",
      "countyName": "潞州区" },
    {
      "countyCode": "140402",
      "countyName": "城区" },
    {
      "countyCode": "140427",
      "countyName": "壶关县" },
    {
      "countyCode": "140429",
      "countyName": "武乡县" },
    {
      "countyCode": "140425",
      "countyName": "平顺县" },
    {
      "countyCode": "140421",
      "countyName": "长治县" },
    {
      "countyCode": "140424",
      "countyName": "屯留县" },
    {
      "countyCode": "140431",
      "countyName": "沁源县" },
    {
      "countyCode": "140411",
      "countyName": "郊区" },
    {
      "countyCode": "140423",
      "countyName": "襄垣县" }] }] },


{
  "provinceCode": "150000",
  "provinceName": "内蒙古自治区",
  "city": [{
    "cityCode": "150100",
    "cityName": "呼和浩特市",
    "county": [{
      "countyCode": "150125",
      "countyName": "武川县" },
    {
      "countyCode": "150124",
      "countyName": "清水河县" },
    {
      "countyCode": "150105",
      "countyName": "赛罕区" },
    {
      "countyCode": "150122",
      "countyName": "托克托县" },
    {
      "countyCode": "150121",
      "countyName": "土默特左旗" },
    {
      "countyCode": "150102",
      "countyName": "新城区" },
    {
      "countyCode": "150104",
      "countyName": "玉泉区" },
    {
      "countyCode": "150123",
      "countyName": "和林格尔县" },
    {
      "countyCode": "150103",
      "countyName": "回民区" }] },

  {
    "cityCode": "150300",
    "cityName": "乌海市",
    "county": [{
      "countyCode": "150303",
      "countyName": "海南区" },
    {
      "countyCode": "150302",
      "countyName": "海勃湾区" },
    {
      "countyCode": "150304",
      "countyName": "乌达区" }] },

  {
    "cityCode": "150500",
    "cityName": "通辽市",
    "county": [{
      "countyCode": "150502",
      "countyName": "科尔沁区" },
    {
      "countyCode": "150526",
      "countyName": "扎鲁特旗" },
    {
      "countyCode": "150522",
      "countyName": "科尔沁左翼后旗" },
    {
      "countyCode": "150523",
      "countyName": "开鲁县" },
    {
      "countyCode": "150524",
      "countyName": "库伦旗" },
    {
      "countyCode": "150525",
      "countyName": "奈曼旗" },
    {
      "countyCode": "150521",
      "countyName": "科尔沁左翼中旗" },
    {
      "countyCode": "150581",
      "countyName": "霍林郭勒市" }] },

  {
    "cityCode": "150400",
    "cityName": "赤峰市",
    "county": [{
      "countyCode": "150422",
      "countyName": "巴林左旗" },
    {
      "countyCode": "150429",
      "countyName": "宁城县" },
    {
      "countyCode": "150421",
      "countyName": "阿鲁科尔沁旗" },
    {
      "countyCode": "150423",
      "countyName": "巴林右旗" },
    {
      "countyCode": "150425",
      "countyName": "克什克腾旗" },
    {
      "countyCode": "150426",
      "countyName": "翁牛特旗" },
    {
      "countyCode": "150402",
      "countyName": "红山区" },
    {
      "countyCode": "150430",
      "countyName": "敖汉旗" },
    {
      "countyCode": "150428",
      "countyName": "喀喇沁旗" },
    {
      "countyCode": "150404",
      "countyName": "松山区" },
    {
      "countyCode": "150424",
      "countyName": "林西县" },
    {
      "countyCode": "150403",
      "countyName": "元宝山区" }] },

  {
    "cityCode": "150200",
    "cityName": "包头市",
    "county": [{
      "countyCode": "150203",
      "countyName": "昆都仑区" },
    {
      "countyCode": "150204",
      "countyName": "青山区" },
    {
      "countyCode": "150205",
      "countyName": "石拐区" },
    {
      "countyCode": "150221",
      "countyName": "土默特右旗" },
    {
      "countyCode": "150222",
      "countyName": "固阳县" },
    {
      "countyCode": "150223",
      "countyName": "达尔罕茂明安联合旗" },
    {
      "countyCode": "150206",
      "countyName": "白云鄂博矿区" },
    {
      "countyCode": "150202",
      "countyName": "东河区" },
    {
      "countyCode": "150207",
      "countyName": "九原区" }] },

  {
    "cityCode": "150700",
    "cityName": "呼伦贝尔市",
    "county": [{
      "countyCode": "150721",
      "countyName": "阿荣旗" },
    {
      "countyCode": "150723",
      "countyName": "鄂伦春自治旗" },
    {
      "countyCode": "150785",
      "countyName": "根河市" },
    {
      "countyCode": "150782",
      "countyName": "牙克石市" },
    {
      "countyCode": "150783",
      "countyName": "扎兰屯市" },
    {
      "countyCode": "150724",
      "countyName": "鄂温克族自治旗" },
    {
      "countyCode": "150784",
      "countyName": "额尔古纳市" },
    {
      "countyCode": "150727",
      "countyName": "新巴尔虎右旗" },
    {
      "countyCode": "150726",
      "countyName": "新巴尔虎左旗" },
    {
      "countyCode": "150702",
      "countyName": "海拉尔区" },
    {
      "countyCode": "150703",
      "countyName": "扎赉诺尔区" },
    {
      "countyCode": "150781",
      "countyName": "满洲里市" },
    {
      "countyCode": "150725",
      "countyName": "陈巴尔虎旗" },
    {
      "countyCode": "150722",
      "countyName": "莫力达瓦达斡尔族自治旗" }] },

  {
    "cityCode": "152500",
    "cityName": "锡林郭勒盟",
    "county": [{
      "countyCode": "152529",
      "countyName": "正镶白旗" },
    {
      "countyCode": "152501",
      "countyName": "二连浩特市" },
    {
      "countyCode": "152525",
      "countyName": "东乌珠穆沁旗" },
    {
      "countyCode": "152524",
      "countyName": "苏尼特右旗" },
    {
      "countyCode": "152523",
      "countyName": "苏尼特左旗" },
    {
      "countyCode": "152526",
      "countyName": "西乌珠穆沁旗" },
    {
      "countyCode": "152531",
      "countyName": "多伦县" },
    {
      "countyCode": "152528",
      "countyName": "镶黄旗" },
    {
      "countyCode": "152530",
      "countyName": "正蓝旗" },
    {
      "countyCode": "152522",
      "countyName": "阿巴嘎旗" },
    {
      "countyCode": "152502",
      "countyName": "锡林浩特市" },
    {
      "countyCode": "152527",
      "countyName": "太仆寺旗" }] },

  {
    "cityCode": "152200",
    "cityName": "兴安盟",
    "county": [{
      "countyCode": "152221",
      "countyName": "科尔沁右翼前旗" },
    {
      "countyCode": "152223",
      "countyName": "扎赉特旗" },
    {
      "countyCode": "152201",
      "countyName": "乌兰浩特市" },
    {
      "countyCode": "152224",
      "countyName": "突泉县" },
    {
      "countyCode": "152222",
      "countyName": "科尔沁右翼中旗" },
    {
      "countyCode": "152202",
      "countyName": "阿尔山市" }] },

  {
    "cityCode": "150900",
    "cityName": "乌兰察布市",
    "county": [{
      "countyCode": "150902",
      "countyName": "集宁区" },
    {
      "countyCode": "150921",
      "countyName": "卓资县" },
    {
      "countyCode": "150922",
      "countyName": "化德县" },
    {
      "countyCode": "150923",
      "countyName": "商都县" },
    {
      "countyCode": "150928",
      "countyName": "察哈尔右翼后旗" },
    {
      "countyCode": "150926",
      "countyName": "察哈尔右翼前旗" },
    {
      "countyCode": "150927",
      "countyName": "察哈尔右翼中旗" },
    {
      "countyCode": "150929",
      "countyName": "四子王旗" },
    {
      "countyCode": "150981",
      "countyName": "丰镇市" },
    {
      "countyCode": "150925",
      "countyName": "凉城县" },
    {
      "countyCode": "150924",
      "countyName": "兴和县" }] },

  {
    "cityCode": "150600",
    "cityName": "鄂尔多斯市",
    "county": [{
      "countyCode": "150624",
      "countyName": "鄂托克旗" },
    {
      "countyCode": "150621",
      "countyName": "达拉特旗" },
    {
      "countyCode": "150626",
      "countyName": "乌审旗" },
    {
      "countyCode": "150602",
      "countyName": "东胜区" },
    {
      "countyCode": "150603",
      "countyName": "康巴什区" },
    {
      "countyCode": "150623",
      "countyName": "鄂托克前旗" },
    {
      "countyCode": "150622",
      "countyName": "准格尔旗" },
    {
      "countyCode": "150625",
      "countyName": "杭锦旗" },
    {
      "countyCode": "150627",
      "countyName": "伊金霍洛旗" }] },

  {
    "cityCode": "152900",
    "cityName": "阿拉善盟",
    "county": [{
      "countyCode": "152923",
      "countyName": "额济纳旗" },
    {
      "countyCode": "152921",
      "countyName": "阿拉善左旗" },
    {
      "countyCode": "152922",
      "countyName": "阿拉善右旗" }] },

  {
    "cityCode": "150800",
    "cityName": "巴彦淖尔市",
    "county": [{
      "countyCode": "150802",
      "countyName": "临河区" },
    {
      "countyCode": "150823",
      "countyName": "乌拉特前旗" },
    {
      "countyCode": "150821",
      "countyName": "五原县" },
    {
      "countyCode": "150826",
      "countyName": "杭锦后旗" },
    {
      "countyCode": "150825",
      "countyName": "乌拉特后旗" },
    {
      "countyCode": "150824",
      "countyName": "乌拉特中旗" },
    {
      "countyCode": "150822",
      "countyName": "磴口县" }] }] },


{
  "provinceCode": "210000",
  "provinceName": "辽宁省",
  "city": [{
    "cityCode": "211200",
    "cityName": "铁岭市",
    "county": [{
      "countyCode": "211281",
      "countyName": "调兵山市" },
    {
      "countyCode": "211221",
      "countyName": "铁岭县" },
    {
      "countyCode": "211224",
      "countyName": "昌图县" },
    {
      "countyCode": "211223",
      "countyName": "西丰县" },
    {
      "countyCode": "211282",
      "countyName": "开原市" },
    {
      "countyCode": "211202",
      "countyName": "银州区" },
    {
      "countyCode": "211204",
      "countyName": "清河区" }] },

  {
    "cityCode": "210500",
    "cityName": "本溪市",
    "county": [{
      "countyCode": "210522",
      "countyName": "桓仁满族自治县" },
    {
      "countyCode": "210502",
      "countyName": "平山区" },
    {
      "countyCode": "210503",
      "countyName": "溪湖区" },
    {
      "countyCode": "210505",
      "countyName": "南芬区" },
    {
      "countyCode": "210504",
      "countyName": "明山区" },
    {
      "countyCode": "210521",
      "countyName": "本溪满族自治县" }] },

  {
    "cityCode": "211400",
    "cityName": "葫芦岛市",
    "county": [{
      "countyCode": "211421",
      "countyName": "绥中县" },
    {
      "countyCode": "211481",
      "countyName": "兴城市" },
    {
      "countyCode": "211403",
      "countyName": "龙港区" },
    {
      "countyCode": "211404",
      "countyName": "南票区" },
    {
      "countyCode": "211422",
      "countyName": "建昌县" },
    {
      "countyCode": "211402",
      "countyName": "连山区" }] },

  {
    "cityCode": "210100",
    "cityName": "沈阳市",
    "county": [{
      "countyCode": "210122",
      "countyName": "辽中区" },
    {
      "countyCode": "210104",
      "countyName": "大东区" },
    {
      "countyCode": "210105",
      "countyName": "皇姑区" },
    {
      "countyCode": "210123",
      "countyName": "康平县" },
    {
      "countyCode": "210124",
      "countyName": "法库县" },
    {
      "countyCode": "210181",
      "countyName": "新民市" },
    {
      "countyCode": "210103",
      "countyName": "沈河区" },
    {
      "countyCode": "210111",
      "countyName": "苏家屯区" },
    {
      "countyCode": "210106",
      "countyName": "铁西区" },
    {
      "countyCode": "210102",
      "countyName": "和平区" },
    {
      "countyCode": "210113",
      "countyName": "沈北新区" },
    {
      "countyCode": "210114",
      "countyName": "于洪区" },
    {
      "countyCode": "210112",
      "countyName": "浑南区" }] },

  {
    "cityCode": "210900",
    "cityName": "阜新市",
    "county": [{
      "countyCode": "210905",
      "countyName": "清河门区" },
    {
      "countyCode": "210911",
      "countyName": "细河区" },
    {
      "countyCode": "210921",
      "countyName": "阜新蒙古族自治县" },
    {
      "countyCode": "210902",
      "countyName": "海州区" },
    {
      "countyCode": "210903",
      "countyName": "新邱区" },
    {
      "countyCode": "210922",
      "countyName": "彰武县" },
    {
      "countyCode": "210904",
      "countyName": "太平区" }] },

  {
    "cityCode": "210800",
    "cityName": "营口市",
    "county": [{
      "countyCode": "210802",
      "countyName": "站前区" },
    {
      "countyCode": "210804",
      "countyName": "鲅鱼圈区" },
    {
      "countyCode": "210811",
      "countyName": "老边区" },
    {
      "countyCode": "210882",
      "countyName": "大石桥市" },
    {
      "countyCode": "210881",
      "countyName": "盖州市" },
    {
      "countyCode": "210803",
      "countyName": "西市区" }] },

  {
    "cityCode": "210300",
    "cityName": "鞍山市",
    "county": [{
      "countyCode": "210304",
      "countyName": "立山区" },
    {
      "countyCode": "210381",
      "countyName": "海城市" },
    {
      "countyCode": "210321",
      "countyName": "台安县" },
    {
      "countyCode": "210311",
      "countyName": "千山区" },
    {
      "countyCode": "210302",
      "countyName": "铁东区" },
    {
      "countyCode": "210303",
      "countyName": "铁西区" },
    {
      "countyCode": "210323",
      "countyName": "岫岩满族自治县" }] },

  {
    "cityCode": "210700",
    "cityName": "锦州市",
    "county": [{
      "countyCode": "210727",
      "countyName": "义县" },
    {
      "countyCode": "210781",
      "countyName": "凌海市" },
    {
      "countyCode": "210711",
      "countyName": "太和区" },
    {
      "countyCode": "210726",
      "countyName": "黑山县" },
    {
      "countyCode": "210782",
      "countyName": "北镇市" },
    {
      "countyCode": "210702",
      "countyName": "古塔区" },
    {
      "countyCode": "210703",
      "countyName": "凌河区" }] },

  {
    "cityCode": "210400",
    "cityName": "抚顺市",
    "county": [{
      "countyCode": "210403",
      "countyName": "东洲区" },
    {
      "countyCode": "210411",
      "countyName": "顺城区" },
    {
      "countyCode": "210404",
      "countyName": "望花区" },
    {
      "countyCode": "210402",
      "countyName": "新抚区" },
    {
      "countyCode": "210421",
      "countyName": "抚顺县" },
    {
      "countyCode": "210423",
      "countyName": "清原满族自治县" },
    {
      "countyCode": "210422",
      "countyName": "新宾满族自治县" }] },

  {
    "cityCode": "210200",
    "cityName": "大连市",
    "county": [{
      "countyCode": "210213",
      "countyName": "金州区" },
    {
      "countyCode": "210202",
      "countyName": "中山区" },
    {
      "countyCode": "210282",
      "countyName": "普兰店区" },
    {
      "countyCode": "210204",
      "countyName": "沙河口区" },
    {
      "countyCode": "210203",
      "countyName": "西岗区" },
    {
      "countyCode": "210281",
      "countyName": "瓦房店市" },
    {
      "countyCode": "210211",
      "countyName": "甘井子区" },
    {
      "countyCode": "210212",
      "countyName": "旅顺口区" },
    {
      "countyCode": "210224",
      "countyName": "长海县" },
    {
      "countyCode": "210283",
      "countyName": "庄河市" }] },

  {
    "cityCode": "211000",
    "cityName": "辽阳市",
    "county": [{
      "countyCode": "211003",
      "countyName": "文圣区" },
    {
      "countyCode": "211081",
      "countyName": "灯塔市" },
    {
      "countyCode": "211011",
      "countyName": "太子河区" },
    {
      "countyCode": "211005",
      "countyName": "弓长岭区" },
    {
      "countyCode": "211004",
      "countyName": "宏伟区" },
    {
      "countyCode": "211021",
      "countyName": "辽阳县" },
    {
      "countyCode": "211002",
      "countyName": "白塔区" }] },

  {
    "cityCode": "210600",
    "cityName": "丹东市",
    "county": [{
      "countyCode": "210603",
      "countyName": "振兴区" },
    {
      "countyCode": "210681",
      "countyName": "东港市" },
    {
      "countyCode": "210624",
      "countyName": "宽甸满族自治县" },
    {
      "countyCode": "210682",
      "countyName": "凤城市" },
    {
      "countyCode": "210604",
      "countyName": "振安区" },
    {
      "countyCode": "210602",
      "countyName": "元宝区" }] },

  {
    "cityCode": "211300",
    "cityName": "朝阳市",
    "county": [{
      "countyCode": "211382",
      "countyName": "凌源市" },
    {
      "countyCode": "211322",
      "countyName": "建平县" },
    {
      "countyCode": "211381",
      "countyName": "北票市" },
    {
      "countyCode": "211303",
      "countyName": "龙城区" },
    {
      "countyCode": "211302",
      "countyName": "双塔区" },
    {
      "countyCode": "211324",
      "countyName": "喀喇沁左翼蒙古族自治县" },
    {
      "countyCode": "211321",
      "countyName": "朝阳县" }] },

  {
    "cityCode": "211100",
    "cityName": "盘锦市",
    "county": [{
      "countyCode": "211122",
      "countyName": "盘山县" },
    {
      "countyCode": "211103",
      "countyName": "兴隆台区" },
    {
      "countyCode": "211102",
      "countyName": "双台子区" },
    {
      "countyCode": "211121",
      "countyName": "大洼区" }] }] },


{
  "provinceCode": "220000",
  "provinceName": "吉林省",
  "city": [{
    "cityCode": "220600",
    "cityName": "白山市",
    "county": [{
      "countyCode": "220621",
      "countyName": "抚松县" },
    {
      "countyCode": "220602",
      "countyName": "浑江区" },
    {
      "countyCode": "220622",
      "countyName": "靖宇县" },
    {
      "countyCode": "220605",
      "countyName": "江源区" },
    {
      "countyCode": "220681",
      "countyName": "临江市" },
    {
      "countyCode": "220623",
      "countyName": "长白朝鲜族自治县" }] },

  {
    "cityCode": "220500",
    "cityName": "通化市",
    "county": [{
      "countyCode": "220523",
      "countyName": "辉南县" },
    {
      "countyCode": "220521",
      "countyName": "通化县" },
    {
      "countyCode": "220581",
      "countyName": "梅河口市" },
    {
      "countyCode": "220502",
      "countyName": "东昌区" },
    {
      "countyCode": "220524",
      "countyName": "柳河县" },
    {
      "countyCode": "220503",
      "countyName": "二道江区" },
    {
      "countyCode": "220582",
      "countyName": "集安市" }] },

  {
    "cityCode": "220700",
    "cityName": "松原市",
    "county": [{
      "countyCode": "220722",
      "countyName": "长岭县" },
    {
      "countyCode": "220702",
      "countyName": "宁江区" },
    {
      "countyCode": "220724",
      "countyName": "扶余市" },
    {
      "countyCode": "220721",
      "countyName": "前郭尔罗斯蒙古族自治县" },
    {
      "countyCode": "220723",
      "countyName": "乾安县" }] },

  {
    "cityCode": "220800",
    "cityName": "白城市",
    "county": [{
      "countyCode": "220802",
      "countyName": "洮北区" },
    {
      "countyCode": "220821",
      "countyName": "镇赉县" },
    {
      "countyCode": "220822",
      "countyName": "通榆县" },
    {
      "countyCode": "220881",
      "countyName": "洮南市" },
    {
      "countyCode": "220882",
      "countyName": "大安市" }] },

  {
    "cityCode": "220100",
    "cityName": "长春市",
    "county": [{
      "countyCode": "220105",
      "countyName": "二道区" },
    {
      "countyCode": "220182",
      "countyName": "榆树市" },
    {
      "countyCode": "220106",
      "countyName": "绿园区" },
    {
      "countyCode": "220181",
      "countyName": "九台区" },
    {
      "countyCode": "220122",
      "countyName": "农安县" },
    {
      "countyCode": "220103",
      "countyName": "宽城区" },
    {
      "countyCode": "220102",
      "countyName": "南关区" },
    {
      "countyCode": "220104",
      "countyName": "朝阳区" },
    {
      "countyCode": "220183",
      "countyName": "德惠市" },
    {
      "countyCode": "220112",
      "countyName": "双阳区" }] },

  {
    "cityCode": "222400",
    "cityName": "延边朝鲜族自治州",
    "county": [{
      "countyCode": "222424",
      "countyName": "汪清县" },
    {
      "countyCode": "222401",
      "countyName": "延吉市" },
    {
      "countyCode": "222404",
      "countyName": "珲春市" },
    {
      "countyCode": "222405",
      "countyName": "龙井市" },
    {
      "countyCode": "222402",
      "countyName": "图们市" },
    {
      "countyCode": "222426",
      "countyName": "安图县" },
    {
      "countyCode": "222406",
      "countyName": "和龙市" },
    {
      "countyCode": "222403",
      "countyName": "敦化市" }] },

  {
    "cityCode": "220400",
    "cityName": "辽源市",
    "county": [{
      "countyCode": "220422",
      "countyName": "东辽县" },
    {
      "countyCode": "220402",
      "countyName": "龙山区" },
    {
      "countyCode": "220421",
      "countyName": "东丰县" },
    {
      "countyCode": "220403",
      "countyName": "西安区" }] },

  {
    "cityCode": "220300",
    "cityName": "四平市",
    "county": [{
      "countyCode": "220381",
      "countyName": "公主岭市" },
    {
      "countyCode": "220323",
      "countyName": "伊通满族自治县" },
    {
      "countyCode": "220322",
      "countyName": "梨树县" },
    {
      "countyCode": "220382",
      "countyName": "双辽市" },
    {
      "countyCode": "220302",
      "countyName": "铁西区" },
    {
      "countyCode": "220303",
      "countyName": "铁东区" }] },

  {
    "cityCode": "220200",
    "cityName": "吉林市",
    "county": [{
      "countyCode": "220204",
      "countyName": "船营区" },
    {
      "countyCode": "220283",
      "countyName": "舒兰市" },
    {
      "countyCode": "220282",
      "countyName": "桦甸市" },
    {
      "countyCode": "220202",
      "countyName": "昌邑区" },
    {
      "countyCode": "220281",
      "countyName": "蛟河市" },
    {
      "countyCode": "220284",
      "countyName": "磐石市" },
    {
      "countyCode": "220211",
      "countyName": "丰满区" },
    {
      "countyCode": "220203",
      "countyName": "龙潭区" },
    {
      "countyCode": "220221",
      "countyName": "永吉县" }] }] },


{
  "provinceCode": "230000",
  "provinceName": "黑龙江省",
  "city": [{
    "cityCode": "230400",
    "cityName": "鹤岗市",
    "county": [{
      "countyCode": "230406",
      "countyName": "东山区" },
    {
      "countyCode": "230407",
      "countyName": "兴山区" },
    {
      "countyCode": "230422",
      "countyName": "绥滨县" },
    {
      "countyCode": "230403",
      "countyName": "工农区" },
    {
      "countyCode": "230404",
      "countyName": "南山区" },
    {
      "countyCode": "230421",
      "countyName": "萝北县" },
    {
      "countyCode": "230402",
      "countyName": "向阳区" },
    {
      "countyCode": "230405",
      "countyName": "兴安区" }] },

  {
    "cityCode": "230700",
    "cityName": "伊春市",
    "county": [{
      "countyCode": "230708",
      "countyName": "美溪区" },
    {
      "countyCode": "230705",
      "countyName": "西林区" },
    {
      "countyCode": "230722",
      "countyName": "嘉荫县" },
    {
      "countyCode": "230709",
      "countyName": "金山屯区" },
    {
      "countyCode": "230711",
      "countyName": "乌马河区" },
    {
      "countyCode": "230707",
      "countyName": "新青区" },
    {
      "countyCode": "230702",
      "countyName": "伊春区" },
    {
      "countyCode": "230704",
      "countyName": "友好区" },
    {
      "countyCode": "230703",
      "countyName": "南岔区" },
    {
      "countyCode": "230710",
      "countyName": "五营区" },
    {
      "countyCode": "230716",
      "countyName": "上甘岭区" },
    {
      "countyCode": "230712",
      "countyName": "汤旺河区" },
    {
      "countyCode": "230781",
      "countyName": "铁力市" },
    {
      "countyCode": "230714",
      "countyName": "乌伊岭区" },
    {
      "countyCode": "230715",
      "countyName": "红星区" },
    {
      "countyCode": "230706",
      "countyName": "翠峦区" },
    {
      "countyCode": "230713",
      "countyName": "带岭区" }] },

  {
    "cityCode": "230800",
    "cityName": "佳木斯市",
    "county": [{
      "countyCode": "230881",
      "countyName": "同江市" },
    {
      "countyCode": "230805",
      "countyName": "东风区" },
    {
      "countyCode": "230811",
      "countyName": "郊区" },
    {
      "countyCode": "230882",
      "countyName": "富锦市" },
    {
      "countyCode": "230828",
      "countyName": "汤原县" },
    {
      "countyCode": "230833",
      "countyName": "抚远市" },
    {
      "countyCode": "230804",
      "countyName": "前进区" },
    {
      "countyCode": "230803",
      "countyName": "向阳区" },
    {
      "countyCode": "230826",
      "countyName": "桦川县" },
    {
      "countyCode": "230822",
      "countyName": "桦南县" }] },

  {
    "cityCode": "230200",
    "cityName": "齐齐哈尔市",
    "county": [{
      "countyCode": "230207",
      "countyName": "碾子山区" },
    {
      "countyCode": "230203",
      "countyName": "建华区" },
    {
      "countyCode": "230204",
      "countyName": "铁锋区" },
    {
      "countyCode": "230208",
      "countyName": "梅里斯达斡尔族区" },
    {
      "countyCode": "230230",
      "countyName": "克东县" },
    {
      "countyCode": "230227",
      "countyName": "富裕县" },
    {
      "countyCode": "230205",
      "countyName": "昂昂溪区" },
    {
      "countyCode": "230221",
      "countyName": "龙江县" },
    {
      "countyCode": "230206",
      "countyName": "富拉尔基区" },
    {
      "countyCode": "230223",
      "countyName": "依安县" },
    {
      "countyCode": "230225",
      "countyName": "甘南县" },
    {
      "countyCode": "230229",
      "countyName": "克山县" },
    {
      "countyCode": "230281",
      "countyName": "讷河市" },
    {
      "countyCode": "230202",
      "countyName": "龙沙区" },
    {
      "countyCode": "230231",
      "countyName": "拜泉县" },
    {
      "countyCode": "230224",
      "countyName": "泰来县" }] },

  {
    "cityCode": "230500",
    "cityName": "双鸭山市",
    "county": [{
      "countyCode": "230524",
      "countyName": "饶河县" },
    {
      "countyCode": "230506",
      "countyName": "宝山区" },
    {
      "countyCode": "230503",
      "countyName": "岭东区" },
    {
      "countyCode": "230505",
      "countyName": "四方台区" },
    {
      "countyCode": "230523",
      "countyName": "宝清县" },
    {
      "countyCode": "230521",
      "countyName": "集贤县" },
    {
      "countyCode": "230522",
      "countyName": "友谊县" },
    {
      "countyCode": "230502",
      "countyName": "尖山区" }] },

  {
    "cityCode": "230100",
    "cityName": "哈尔滨市",
    "county": [{
      "countyCode": "230109",
      "countyName": "松北区" },
    {
      "countyCode": "230127",
      "countyName": "木兰县" },
    {
      "countyCode": "230124",
      "countyName": "方正县" },
    {
      "countyCode": "230103",
      "countyName": "南岗区" },
    {
      "countyCode": "230183",
      "countyName": "尚志市" },
    {
      "countyCode": "230129",
      "countyName": "延寿县" },
    {
      "countyCode": "230126",
      "countyName": "巴彦县" },
    {
      "countyCode": "230125",
      "countyName": "宾县" },
    {
      "countyCode": "230102",
      "countyName": "道里区" },
    {
      "countyCode": "230111",
      "countyName": "呼兰区" },
    {
      "countyCode": "230112",
      "countyName": "阿城区" },
    {
      "countyCode": "230110",
      "countyName": "香坊区" },
    {
      "countyCode": "230108",
      "countyName": "平房区" },
    {
      "countyCode": "230182",
      "countyName": "双城区" },
    {
      "countyCode": "230123",
      "countyName": "依兰县" },
    {
      "countyCode": "230184",
      "countyName": "五常市" },
    {
      "countyCode": "230104",
      "countyName": "道外区" },
    {
      "countyCode": "230128",
      "countyName": "通河县" }] },

  {
    "cityCode": "231000",
    "cityName": "牡丹江市",
    "county": [{
      "countyCode": "231003",
      "countyName": "阳明区" },
    {
      "countyCode": "231005",
      "countyName": "西安区" },
    {
      "countyCode": "231025",
      "countyName": "林口县" },
    {
      "countyCode": "231024",
      "countyName": "东宁市" },
    {
      "countyCode": "231004",
      "countyName": "爱民区" },
    {
      "countyCode": "231084",
      "countyName": "宁安市" },
    {
      "countyCode": "231083",
      "countyName": "海林市" },
    {
      "countyCode": "231002",
      "countyName": "东安区" },
    {
      "countyCode": "231085",
      "countyName": "穆棱市" },
    {
      "countyCode": "231081",
      "countyName": "绥芬河市" }] },

  {
    "cityCode": "230900",
    "cityName": "七台河市",
    "county": [{
      "countyCode": "230904",
      "countyName": "茄子河区" },
    {
      "countyCode": "230921",
      "countyName": "勃利县" },
    {
      "countyCode": "230902",
      "countyName": "新兴区" },
    {
      "countyCode": "230903",
      "countyName": "桃山区" }] },

  {
    "cityCode": "231100",
    "cityName": "黑河市",
    "county": [{
      "countyCode": "231102",
      "countyName": "爱辉区" },
    {
      "countyCode": "231182",
      "countyName": "五大连池市" },
    {
      "countyCode": "231181",
      "countyName": "北安市" },
    {
      "countyCode": "231124",
      "countyName": "孙吴县" },
    {
      "countyCode": "231123",
      "countyName": "逊克县" },
    {
      "countyCode": "231121",
      "countyName": "嫩江县" }] },

  {
    "cityCode": "230600",
    "cityName": "大庆市",
    "county": [{
      "countyCode": "230605",
      "countyName": "红岗区" },
    {
      "countyCode": "230606",
      "countyName": "大同区" },
    {
      "countyCode": "230623",
      "countyName": "林甸县" },
    {
      "countyCode": "230622",
      "countyName": "肇源县" },
    {
      "countyCode": "230621",
      "countyName": "肇州县" },
    {
      "countyCode": "230624",
      "countyName": "杜尔伯特蒙古族自治县" },
    {
      "countyCode": "230603",
      "countyName": "龙凤区" },
    {
      "countyCode": "230602",
      "countyName": "萨尔图区" },
    {
      "countyCode": "230604",
      "countyName": "让胡路区" }] },

  {
    "cityCode": "232700",
    "cityName": "大兴安岭地区",
    "county": [{
      "countyCode": "232703",
      "countyName": "新林区" },
    {
      "countyCode": "232702",
      "countyName": "松岭区" },
    {
      "countyCode": "232701",
      "countyName": "加格达奇区" },
    {
      "countyCode": "232722",
      "countyName": "塔河县" },
    {
      "countyCode": "232721",
      "countyName": "呼玛县" },
    {
      "countyCode": "232704",
      "countyName": "呼中区" },
    {
      "countyCode": "232723",
      "countyName": "漠河市" }] },

  {
    "cityCode": "231200",
    "cityName": "绥化市",
    "county": [{
      "countyCode": "231281",
      "countyName": "安达市" },
    {
      "countyCode": "231224",
      "countyName": "庆安县" },
    {
      "countyCode": "231282",
      "countyName": "肇东市" },
    {
      "countyCode": "231283",
      "countyName": "海伦市" },
    {
      "countyCode": "231225",
      "countyName": "明水县" },
    {
      "countyCode": "231222",
      "countyName": "兰西县" },
    {
      "countyCode": "231223",
      "countyName": "青冈县" },
    {
      "countyCode": "231226",
      "countyName": "绥棱县" },
    {
      "countyCode": "231221",
      "countyName": "望奎县" },
    {
      "countyCode": "231202",
      "countyName": "北林区" }] },

  {
    "cityCode": "230300",
    "cityName": "鸡西市",
    "county": [{
      "countyCode": "230303",
      "countyName": "恒山区" },
    {
      "countyCode": "230302",
      "countyName": "鸡冠区" },
    {
      "countyCode": "230305",
      "countyName": "梨树区" },
    {
      "countyCode": "230321",
      "countyName": "鸡东县" },
    {
      "countyCode": "230304",
      "countyName": "滴道区" },
    {
      "countyCode": "230381",
      "countyName": "虎林市" },
    {
      "countyCode": "230307",
      "countyName": "麻山区" },
    {
      "countyCode": "230306",
      "countyName": "城子河区" },
    {
      "countyCode": "230382",
      "countyName": "密山市" }] }] },


{
  "provinceCode": "310000",
  "provinceName": "上海",
  "city": [{
    "cityCode": "310000-1",
    "cityName": "上海市",
    "county": [{
      "countyCode": "310115",
      "countyName": "浦东新区" },
    {
      "countyCode": "310110",
      "countyName": "杨浦区" },
    {
      "countyCode": "310230",
      "countyName": "崇明区" },
    {
      "countyCode": "310113",
      "countyName": "宝山区" },
    {
      "countyCode": "310114",
      "countyName": "嘉定区" },
    {
      "countyCode": "310109",
      "countyName": "虹口区" },
    {
      "countyCode": "310101",
      "countyName": "黄浦区" },
    {
      "countyCode": "310120",
      "countyName": "奉贤区" },
    {
      "countyCode": "310118",
      "countyName": "青浦区" },
    {
      "countyCode": "310112",
      "countyName": "闵行区" },
    {
      "countyCode": "310105",
      "countyName": "长宁区" },
    {
      "countyCode": "310104",
      "countyName": "徐汇区" },
    {
      "countyCode": "310117",
      "countyName": "松江区" },
    {
      "countyCode": "310106",
      "countyName": "静安区" },
    {
      "countyCode": "310107",
      "countyName": "普陀区" },
    {
      "countyCode": "310116",
      "countyName": "金山区" }] }] },


{
  "provinceCode": "340000",
  "provinceName": "安徽省",
  "city": [{
    "cityCode": "341000",
    "cityName": "黄山市",
    "county": [{
      "countyCode": "341022",
      "countyName": "休宁县" },
    {
      "countyCode": "341024",
      "countyName": "祁门县" },
    {
      "countyCode": "341021",
      "countyName": "歙县" },
    {
      "countyCode": "341003",
      "countyName": "黄山区" },
    {
      "countyCode": "341023",
      "countyName": "黟县" },
    {
      "countyCode": "341004",
      "countyName": "徽州区" },
    {
      "countyCode": "341002",
      "countyName": "屯溪区" }] },

  {
    "cityCode": "340200",
    "cityName": "芜湖市",
    "county": [{
      "countyCode": "340208",
      "countyName": "三山区" },
    {
      "countyCode": "340222",
      "countyName": "繁昌县" },
    {
      "countyCode": "340207",
      "countyName": "鸠江区" },
    {
      "countyCode": "340221",
      "countyName": "芜湖县" },
    {
      "countyCode": "340202",
      "countyName": "镜湖区" },
    {
      "countyCode": "340203",
      "countyName": "弋江区" },
    {
      "countyCode": "340225",
      "countyName": "无为县" },
    {
      "countyCode": "340223",
      "countyName": "南陵县" }] },

  {
    "cityCode": "340800",
    "cityName": "安庆市",
    "county": [{
      "countyCode": "340826",
      "countyName": "宿松县" },
    {
      "countyCode": "340824",
      "countyName": "潜山市" },
    {
      "countyCode": "340881",
      "countyName": "桐城市" },
    {
      "countyCode": "340828",
      "countyName": "岳西县" },
    {
      "countyCode": "340825",
      "countyName": "太湖县" },
    {
      "countyCode": "340811",
      "countyName": "宜秀区" },
    {
      "countyCode": "340803",
      "countyName": "大观区" },
    {
      "countyCode": "340827",
      "countyName": "望江县" },
    {
      "countyCode": "340802",
      "countyName": "迎江区" },
    {
      "countyCode": "340822",
      "countyName": "怀宁县" }] },

  {
    "cityCode": "341100",
    "cityName": "滁州市",
    "county": [{
      "countyCode": "341103",
      "countyName": "南谯区" },
    {
      "countyCode": "341102",
      "countyName": "琅琊区" },
    {
      "countyCode": "341181",
      "countyName": "天长市" },
    {
      "countyCode": "341125",
      "countyName": "定远县" },
    {
      "countyCode": "341124",
      "countyName": "全椒县" },
    {
      "countyCode": "341122",
      "countyName": "来安县" },
    {
      "countyCode": "341182",
      "countyName": "明光市" },
    {
      "countyCode": "341126",
      "countyName": "凤阳县" }] },

  {
    "cityCode": "340600",
    "cityName": "淮北市",
    "county": [{
      "countyCode": "340621",
      "countyName": "濉溪县" },
    {
      "countyCode": "340603",
      "countyName": "相山区" },
    {
      "countyCode": "340602",
      "countyName": "杜集区" },
    {
      "countyCode": "340604",
      "countyName": "烈山区" }] },

  {
    "cityCode": "340700",
    "cityName": "铜陵市",
    "county": [{
      "countyCode": "340711",
      "countyName": "郊区" },
    {
      "countyCode": "340702",
      "countyName": "铜官山区" },
    {
      "countyCode": "340823",
      "countyName": "枞阳县" },
    {
      "countyCode": "340703",
      "countyName": "铜官区" },
    {
      "countyCode": "340721",
      "countyName": "义安区" }] },

  {
    "cityCode": "340300",
    "cityName": "蚌埠市",
    "county": [{
      "countyCode": "340303",
      "countyName": "蚌山区" },
    {
      "countyCode": "340323",
      "countyName": "固镇县" },
    {
      "countyCode": "340322",
      "countyName": "五河县" },
    {
      "countyCode": "340304",
      "countyName": "禹会区" },
    {
      "countyCode": "340311",
      "countyName": "淮上区" },
    {
      "countyCode": "340302",
      "countyName": "龙子湖区" },
    {
      "countyCode": "340321",
      "countyName": "怀远县" }] },

  {
    "cityCode": "340400",
    "cityName": "淮南市",
    "county": [{
      "countyCode": "340421",
      "countyName": "凤台县" },
    {
      "countyCode": "341521",
      "countyName": "寿县" },
    {
      "countyCode": "340403",
      "countyName": "田家庵区" },
    {
      "countyCode": "340404",
      "countyName": "谢家集区" },
    {
      "countyCode": "340406",
      "countyName": "潘集区" },
    {
      "countyCode": "340405",
      "countyName": "八公山区" },
    {
      "countyCode": "340402",
      "countyName": "大通区" }] },

  {
    "cityCode": "341300",
    "cityName": "宿州市",
    "county": [{
      "countyCode": "341321",
      "countyName": "砀山县" },
    {
      "countyCode": "341322",
      "countyName": "萧县" },
    {
      "countyCode": "341324",
      "countyName": "泗县" },
    {
      "countyCode": "341323",
      "countyName": "灵璧县" },
    {
      "countyCode": "341302",
      "countyName": "埇桥区" }] },

  {
    "cityCode": "341700",
    "cityName": "池州市",
    "county": [{
      "countyCode": "341723",
      "countyName": "青阳县" },
    {
      "countyCode": "341722",
      "countyName": "石台县" },
    {
      "countyCode": "341721",
      "countyName": "东至县" },
    {
      "countyCode": "341702",
      "countyName": "贵池区" }] },

  {
    "cityCode": "340500",
    "cityName": "马鞍山市",
    "county": [{
      "countyCode": "340522",
      "countyName": "含山县" },
    {
      "countyCode": "340503",
      "countyName": "花山区" },
    {
      "countyCode": "340506",
      "countyName": "博望区" },
    {
      "countyCode": "340523",
      "countyName": "和县" },
    {
      "countyCode": "340521",
      "countyName": "当涂县" },
    {
      "countyCode": "340504",
      "countyName": "雨山区" }] },

  {
    "cityCode": "341200",
    "cityName": "阜阳市",
    "county": [{
      "countyCode": "341222",
      "countyName": "太和县" },
    {
      "countyCode": "341226",
      "countyName": "颍上县" },
    {
      "countyCode": "341221",
      "countyName": "临泉县" },
    {
      "countyCode": "341204",
      "countyName": "颍泉区" },
    {
      "countyCode": "341225",
      "countyName": "阜南县" },
    {
      "countyCode": "341282",
      "countyName": "界首市" },
    {
      "countyCode": "341203",
      "countyName": "颍东区" },
    {
      "countyCode": "341202",
      "countyName": "颍州区" }] },

  {
    "cityCode": "341600",
    "cityName": "亳州市",
    "county": [{
      "countyCode": "341621",
      "countyName": "涡阳县" },
    {
      "countyCode": "341623",
      "countyName": "利辛县" },
    {
      "countyCode": "341602",
      "countyName": "谯城区" },
    {
      "countyCode": "341622",
      "countyName": "蒙城县" }] },

  {
    "cityCode": "341800",
    "cityName": "宣城市",
    "county": [{
      "countyCode": "341881",
      "countyName": "宁国市" },
    {
      "countyCode": "341822",
      "countyName": "广德县" },
    {
      "countyCode": "341821",
      "countyName": "郎溪县" },
    {
      "countyCode": "341823",
      "countyName": "泾县" },
    {
      "countyCode": "341825",
      "countyName": "旌德县" },
    {
      "countyCode": "341802",
      "countyName": "宣州区" },
    {
      "countyCode": "341824",
      "countyName": "绩溪县" }] },

  {
    "cityCode": "340100",
    "cityName": "合肥市",
    "county": [{
      "countyCode": "340181",
      "countyName": "巢湖市" },
    {
      "countyCode": "340104",
      "countyName": "蜀山区" },
    {
      "countyCode": "340122",
      "countyName": "肥东县" },
    {
      "countyCode": "340111",
      "countyName": "包河区" },
    {
      "countyCode": "340102",
      "countyName": "瑶海区" },
    {
      "countyCode": "340123",
      "countyName": "肥西县" },
    {
      "countyCode": "340124",
      "countyName": "庐江县" },
    {
      "countyCode": "340121",
      "countyName": "长丰县" },
    {
      "countyCode": "340103",
      "countyName": "庐阳区" }] },

  {
    "cityCode": "341500",
    "cityName": "六安市",
    "county": [{
      "countyCode": "341525",
      "countyName": "霍山县" },
    {
      "countyCode": "341502",
      "countyName": "金安区" },
    {
      "countyCode": "341503",
      "countyName": "裕安区" },
    {
      "countyCode": "341522",
      "countyName": "霍邱县" },
    {
      "countyCode": "341504",
      "countyName": "叶集区" },
    {
      "countyCode": "341523",
      "countyName": "舒城县" },
    {
      "countyCode": "341524",
      "countyName": "金寨县" }] }] },


{
  "provinceCode": "350000",
  "provinceName": "福建省",
  "city": [{
    "cityCode": "350200",
    "cityName": "厦门市",
    "county": [{
      "countyCode": "350206",
      "countyName": "湖里区" },
    {
      "countyCode": "350212",
      "countyName": "同安区" },
    {
      "countyCode": "350203",
      "countyName": "思明区" },
    {
      "countyCode": "350213",
      "countyName": "翔安区" },
    {
      "countyCode": "350205",
      "countyName": "海沧区" },
    {
      "countyCode": "350211",
      "countyName": "集美区" }] },

  {
    "cityCode": "350800",
    "cityName": "龙岩市",
    "county": [{
      "countyCode": "350881",
      "countyName": "漳平市" },
    {
      "countyCode": "350825",
      "countyName": "连城县" },
    {
      "countyCode": "350821",
      "countyName": "长汀县" },
    {
      "countyCode": "350802",
      "countyName": "新罗区" },
    {
      "countyCode": "350823",
      "countyName": "上杭县" },
    {
      "countyCode": "350822",
      "countyName": "永定区" },
    {
      "countyCode": "350824",
      "countyName": "武平县" }] },

  {
    "cityCode": "350100",
    "cityName": "福州市",
    "county": [{
      "countyCode": "350124",
      "countyName": "闽清县" },
    {
      "countyCode": "350103",
      "countyName": "台江区" },
    {
      "countyCode": "350121",
      "countyName": "闽侯县" },
    {
      "countyCode": "350182",
      "countyName": "长乐区" },
    {
      "countyCode": "350125",
      "countyName": "永泰县" },
    {
      "countyCode": "350111",
      "countyName": "晋安区" },
    {
      "countyCode": "350123",
      "countyName": "罗源县" },
    {
      "countyCode": "350102",
      "countyName": "鼓楼区" },
    {
      "countyCode": "350105",
      "countyName": "马尾区" },
    {
      "countyCode": "350104",
      "countyName": "仓山区" },
    {
      "countyCode": "350128",
      "countyName": "平潭县" },
    {
      "countyCode": "350181",
      "countyName": "福清市" },
    {
      "countyCode": "350122",
      "countyName": "连江县" }] },

  {
    "cityCode": "350700",
    "cityName": "南平市",
    "county": [{
      "countyCode": "350724",
      "countyName": "松溪县" },
    {
      "countyCode": "350783",
      "countyName": "建瓯市" },
    {
      "countyCode": "350725",
      "countyName": "政和县" },
    {
      "countyCode": "350723",
      "countyName": "光泽县" },
    {
      "countyCode": "350721",
      "countyName": "顺昌县" },
    {
      "countyCode": "350781",
      "countyName": "邵武市" },
    {
      "countyCode": "350782",
      "countyName": "武夷山市" },
    {
      "countyCode": "350722",
      "countyName": "浦城县" },
    {
      "countyCode": "350784",
      "countyName": "建阳区" },
    {
      "countyCode": "350702",
      "countyName": "延平区" }] },

  {
    "cityCode": "350900",
    "cityName": "宁德市",
    "county": [{
      "countyCode": "350922",
      "countyName": "古田县" },
    {
      "countyCode": "350924",
      "countyName": "寿宁县" },
    {
      "countyCode": "350902",
      "countyName": "蕉城区" },
    {
      "countyCode": "350926",
      "countyName": "柘荣县" },
    {
      "countyCode": "350925",
      "countyName": "周宁县" },
    {
      "countyCode": "350982",
      "countyName": "福鼎市" },
    {
      "countyCode": "350923",
      "countyName": "屏南县" },
    {
      "countyCode": "350981",
      "countyName": "福安市" },
    {
      "countyCode": "350921",
      "countyName": "霞浦县" }] },

  {
    "cityCode": "350500",
    "cityName": "泉州市",
    "county": [{
      "countyCode": "350526",
      "countyName": "德化县" },
    {
      "countyCode": "350582",
      "countyName": "晋江市" },
    {
      "countyCode": "350583",
      "countyName": "南安市" },
    {
      "countyCode": "350503",
      "countyName": "丰泽区" },
    {
      "countyCode": "350581",
      "countyName": "石狮市" },
    {
      "countyCode": "350525",
      "countyName": "永春县" },
    {
      "countyCode": "350521",
      "countyName": "惠安县" },
    {
      "countyCode": "350524",
      "countyName": "安溪县" },
    {
      "countyCode": "350502",
      "countyName": "鲤城区" },
    {
      "countyCode": "350505",
      "countyName": "泉港区" },
    {
      "countyCode": "350527",
      "countyName": "金门县" },
    {
      "countyCode": "350504",
      "countyName": "洛江区" }] },

  {
    "cityCode": "350400",
    "cityName": "三明市",
    "county": [{
      "countyCode": "350421",
      "countyName": "明溪县" },
    {
      "countyCode": "350403",
      "countyName": "三元区" },
    {
      "countyCode": "350423",
      "countyName": "清流县" },
    {
      "countyCode": "350426",
      "countyName": "尤溪县" },
    {
      "countyCode": "350481",
      "countyName": "永安市" },
    {
      "countyCode": "350424",
      "countyName": "宁化县" },
    {
      "countyCode": "350425",
      "countyName": "大田县" },
    {
      "countyCode": "350427",
      "countyName": "沙县" },
    {
      "countyCode": "350430",
      "countyName": "建宁县" },
    {
      "countyCode": "350428",
      "countyName": "将乐县" },
    {
      "countyCode": "350402",
      "countyName": "梅列区" },
    {
      "countyCode": "350429",
      "countyName": "泰宁县" }] },

  {
    "cityCode": "350300",
    "cityName": "莆田市",
    "county": [{
      "countyCode": "350322",
      "countyName": "仙游县" },
    {
      "countyCode": "350303",
      "countyName": "涵江区" },
    {
      "countyCode": "350304",
      "countyName": "荔城区" },
    {
      "countyCode": "350302",
      "countyName": "城厢区" },
    {
      "countyCode": "350305",
      "countyName": "秀屿区" }] },

  {
    "cityCode": "350600",
    "cityName": "漳州市",
    "county": [{
      "countyCode": "350629",
      "countyName": "华安县" },
    {
      "countyCode": "350623",
      "countyName": "漳浦县" },
    {
      "countyCode": "350602",
      "countyName": "芗城区" },
    {
      "countyCode": "350625",
      "countyName": "长泰县" },
    {
      "countyCode": "350603",
      "countyName": "龙文区" },
    {
      "countyCode": "350622",
      "countyName": "云霄县" },
    {
      "countyCode": "350628",
      "countyName": "平和县" },
    {
      "countyCode": "350627",
      "countyName": "南靖县" },
    {
      "countyCode": "350681",
      "countyName": "龙海市" },
    {
      "countyCode": "350624",
      "countyName": "诏安县" },
    {
      "countyCode": "350626",
      "countyName": "东山县" }] }] },


{
  "provinceCode": "360000",
  "provinceName": "江西省",
  "city": [{
    "cityCode": "361000",
    "cityName": "抚州市",
    "county": [{
      "countyCode": "361002",
      "countyName": "临川区" },
    {
      "countyCode": "361023",
      "countyName": "南丰县" },
    {
      "countyCode": "361026",
      "countyName": "宜黄县" },
    {
      "countyCode": "361028",
      "countyName": "资溪县" },
    {
      "countyCode": "361029",
      "countyName": "东乡区" },
    {
      "countyCode": "361027",
      "countyName": "金溪县" },
    {
      "countyCode": "361022",
      "countyName": "黎川县" },
    {
      "countyCode": "361021",
      "countyName": "南城县" },
    {
      "countyCode": "361025",
      "countyName": "乐安县" },
    {
      "countyCode": "361024",
      "countyName": "崇仁县" },
    {
      "countyCode": "361030",
      "countyName": "广昌县" }] },

  {
    "cityCode": "360900",
    "cityName": "宜春市",
    "county": [{
      "countyCode": "360981",
      "countyName": "丰城市" },
    {
      "countyCode": "360902",
      "countyName": "袁州区" },
    {
      "countyCode": "360921",
      "countyName": "奉新县" },
    {
      "countyCode": "360983",
      "countyName": "高安市" },
    {
      "countyCode": "360922",
      "countyName": "万载县" },
    {
      "countyCode": "360926",
      "countyName": "铜鼓县" },
    {
      "countyCode": "360923",
      "countyName": "上高县" },
    {
      "countyCode": "360924",
      "countyName": "宜丰县" },
    {
      "countyCode": "360925",
      "countyName": "靖安县" },
    {
      "countyCode": "360982",
      "countyName": "樟树市" }] },

  {
    "cityCode": "360100",
    "cityName": "南昌市",
    "county": [{
      "countyCode": "360104",
      "countyName": "青云谱区" },
    {
      "countyCode": "360105",
      "countyName": "湾里区" },
    {
      "countyCode": "360124",
      "countyName": "进贤县" },
    {
      "countyCode": "360102",
      "countyName": "东湖区" },
    {
      "countyCode": "360123",
      "countyName": "安义县" },
    {
      "countyCode": "360122",
      "countyName": "新建区" },
    {
      "countyCode": "360121",
      "countyName": "南昌县" },
    {
      "countyCode": "360111",
      "countyName": "青山湖区" },
    {
      "countyCode": "360103",
      "countyName": "西湖区" }] },

  {
    "cityCode": "360700",
    "cityName": "赣州市",
    "county": [{
      "countyCode": "360725",
      "countyName": "崇义县" },
    {
      "countyCode": "360727",
      "countyName": "龙南县" },
    {
      "countyCode": "360728",
      "countyName": "定南县" },
    {
      "countyCode": "360723",
      "countyName": "大余县" },
    {
      "countyCode": "360734",
      "countyName": "寻乌县" },
    {
      "countyCode": "360702",
      "countyName": "章贡区" },
    {
      "countyCode": "360726",
      "countyName": "安远县" },
    {
      "countyCode": "360729",
      "countyName": "全南县" },
    {
      "countyCode": "360735",
      "countyName": "石城县" },
    {
      "countyCode": "360782",
      "countyName": "南康区" },
    {
      "countyCode": "360721",
      "countyName": "赣县区" },
    {
      "countyCode": "360732",
      "countyName": "兴国县" },
    {
      "countyCode": "360781",
      "countyName": "瑞金市" },
    {
      "countyCode": "360724",
      "countyName": "上犹县" },
    {
      "countyCode": "360730",
      "countyName": "宁都县" },
    {
      "countyCode": "360733",
      "countyName": "会昌县" },
    {
      "countyCode": "360722",
      "countyName": "信丰县" },
    {
      "countyCode": "360731",
      "countyName": "于都县" }] },

  {
    "cityCode": "360200",
    "cityName": "景德镇市",
    "county": [{
      "countyCode": "360222",
      "countyName": "浮梁县" },
    {
      "countyCode": "360281",
      "countyName": "乐平市" },
    {
      "countyCode": "360202",
      "countyName": "昌江区" },
    {
      "countyCode": "360203",
      "countyName": "珠山区" }] },

  {
    "cityCode": "360800",
    "cityName": "吉安市",
    "county": [{
      "countyCode": "360829",
      "countyName": "安福县" },
    {
      "countyCode": "360821",
      "countyName": "吉安县" },
    {
      "countyCode": "360827",
      "countyName": "遂川县" },
    {
      "countyCode": "360803",
      "countyName": "青原区" },
    {
      "countyCode": "360828",
      "countyName": "万安县" },
    {
      "countyCode": "360826",
      "countyName": "泰和县" },
    {
      "countyCode": "360823",
      "countyName": "峡江县" },
    {
      "countyCode": "360822",
      "countyName": "吉水县" },
    {
      "countyCode": "360802",
      "countyName": "吉州区" },
    {
      "countyCode": "360824",
      "countyName": "新干县" },
    {
      "countyCode": "360830",
      "countyName": "永新县" },
    {
      "countyCode": "360881",
      "countyName": "井冈山市" },
    {
      "countyCode": "360825",
      "countyName": "永丰县" }] },

  {
    "cityCode": "360400",
    "cityName": "九江市",
    "county": [{
      "countyCode": "360423",
      "countyName": "武宁县" },
    {
      "countyCode": "360421",
      "countyName": "柴桑区" },
    {
      "countyCode": "360429",
      "countyName": "湖口县" },
    {
      "countyCode": "360427",
      "countyName": "庐山市" },
    {
      "countyCode": "360426",
      "countyName": "德安县" },
    {
      "countyCode": "360428",
      "countyName": "都昌县" },
    {
      "countyCode": "360430",
      "countyName": "彭泽县" },
    {
      "countyCode": "360403",
      "countyName": "浔阳区" },
    {
      "countyCode": "360402",
      "countyName": "濂溪区" },
    {
      "countyCode": "360424",
      "countyName": "修水县" },
    {
      "countyCode": "360481",
      "countyName": "瑞昌市" },
    {
      "countyCode": "360425",
      "countyName": "永修县" },
    {
      "countyCode": "360482",
      "countyName": "共青城市" }] },

  {
    "cityCode": "360600",
    "cityName": "鹰潭市",
    "county": [{
      "countyCode": "360602",
      "countyName": "月湖区" },
    {
      "countyCode": "360622",
      "countyName": "余江区" },
    {
      "countyCode": "360681",
      "countyName": "贵溪市" }] },

  {
    "cityCode": "360500",
    "cityName": "新余市",
    "county": [{
      "countyCode": "360521",
      "countyName": "分宜县" },
    {
      "countyCode": "360502",
      "countyName": "渝水区" }] },

  {
    "cityCode": "361100",
    "cityName": "上饶市",
    "county": [{
      "countyCode": "361181",
      "countyName": "德兴市" },
    {
      "countyCode": "361102",
      "countyName": "信州区" },
    {
      "countyCode": "361130",
      "countyName": "婺源县" },
    {
      "countyCode": "361128",
      "countyName": "鄱阳县" },
    {
      "countyCode": "361129",
      "countyName": "万年县" },
    {
      "countyCode": "361123",
      "countyName": "玉山县" },
    {
      "countyCode": "361122",
      "countyName": "广丰区" },
    {
      "countyCode": "361124",
      "countyName": "铅山县" },
    {
      "countyCode": "361121",
      "countyName": "上饶县" },
    {
      "countyCode": "361127",
      "countyName": "余干县" },
    {
      "countyCode": "361126",
      "countyName": "弋阳县" },
    {
      "countyCode": "361125",
      "countyName": "横峰县" }] },

  {
    "cityCode": "360300",
    "cityName": "萍乡市",
    "county": [{
      "countyCode": "360322",
      "countyName": "上栗县" },
    {
      "countyCode": "360313",
      "countyName": "湘东区" },
    {
      "countyCode": "360302",
      "countyName": "安源区" },
    {
      "countyCode": "360323",
      "countyName": "芦溪县" },
    {
      "countyCode": "360321",
      "countyName": "莲花县" }] }] },


{
  "provinceCode": "370000",
  "provinceName": "山东省",
  "city": [{
    "cityCode": "370400",
    "cityName": "枣庄市",
    "county": [{
      "countyCode": "370402",
      "countyName": "市中区" },
    {
      "countyCode": "370481",
      "countyName": "滕州市" },
    {
      "countyCode": "370406",
      "countyName": "山亭区" },
    {
      "countyCode": "370405",
      "countyName": "台儿庄区" },
    {
      "countyCode": "370403",
      "countyName": "薛城区" },
    {
      "countyCode": "370404",
      "countyName": "峄城区" }] },

  {
    "cityCode": "371100",
    "cityName": "日照市",
    "county": [{
      "countyCode": "371121",
      "countyName": "五莲县" },
    {
      "countyCode": "371102",
      "countyName": "东港区" },
    {
      "countyCode": "371122",
      "countyName": "莒县" },
    {
      "countyCode": "371103",
      "countyName": "岚山区" }] },

  {
    "cityCode": "371700",
    "cityName": "菏泽市",
    "county": [{
      "countyCode": "371722",
      "countyName": "单县" },
    {
      "countyCode": "371724",
      "countyName": "巨野县" },
    {
      "countyCode": "371721",
      "countyName": "曹县" },
    {
      "countyCode": "371702",
      "countyName": "牡丹区" },
    {
      "countyCode": "371727",
      "countyName": "定陶区" },
    {
      "countyCode": "371728",
      "countyName": "东明县" },
    {
      "countyCode": "371723",
      "countyName": "成武县" },
    {
      "countyCode": "371725",
      "countyName": "郓城县" },
    {
      "countyCode": "371726",
      "countyName": "鄄城县" }] },

  {
    "cityCode": "371500",
    "cityName": "聊城市",
    "county": [{
      "countyCode": "371524",
      "countyName": "东阿县" },
    {
      "countyCode": "371521",
      "countyName": "阳谷县" },
    {
      "countyCode": "371526",
      "countyName": "高唐县" },
    {
      "countyCode": "371502",
      "countyName": "东昌府区" },
    {
      "countyCode": "371581",
      "countyName": "临清市" },
    {
      "countyCode": "371522",
      "countyName": "莘县" },
    {
      "countyCode": "371525",
      "countyName": "冠县" },
    {
      "countyCode": "371523",
      "countyName": "茌平县" }] },

  {
    "cityCode": "371000",
    "cityName": "威海市",
    "county": [{
      "countyCode": "371002",
      "countyName": "环翠区" },
    {
      "countyCode": "371083",
      "countyName": "乳山市" },
    {
      "countyCode": "371082",
      "countyName": "荣成市" },
    {
      "countyCode": "371081",
      "countyName": "文登区" }] },

  {
    "cityCode": "370300",
    "cityName": "淄博市",
    "county": [{
      "countyCode": "370322",
      "countyName": "高青县" },
    {
      "countyCode": "370321",
      "countyName": "桓台县" },
    {
      "countyCode": "370305",
      "countyName": "临淄区" },
    {
      "countyCode": "370306",
      "countyName": "周村区" },
    {
      "countyCode": "370323",
      "countyName": "沂源县" },
    {
      "countyCode": "370304",
      "countyName": "博山区" },
    {
      "countyCode": "370302",
      "countyName": "淄川区" },
    {
      "countyCode": "370303",
      "countyName": "张店区" }] },

  {
    "cityCode": "370800",
    "cityName": "济宁市",
    "county": [{
      "countyCode": "370811",
      "countyName": "任城区" },
    {
      "countyCode": "370802",
      "countyName": "市中区" },
    {
      "countyCode": "370882",
      "countyName": "兖州区" },
    {
      "countyCode": "370830",
      "countyName": "汶上县" },
    {
      "countyCode": "370883",
      "countyName": "邹城市" },
    {
      "countyCode": "370828",
      "countyName": "金乡县" },
    {
      "countyCode": "370829",
      "countyName": "嘉祥县" },
    {
      "countyCode": "370826",
      "countyName": "微山县" },
    {
      "countyCode": "370881",
      "countyName": "曲阜市" },
    {
      "countyCode": "370827",
      "countyName": "鱼台县" },
    {
      "countyCode": "370831",
      "countyName": "泗水县" },
    {
      "countyCode": "370832",
      "countyName": "梁山县" }] },

  {
    "cityCode": "371200",
    "cityName": "莱芜市",
    "county": [{
      "countyCode": "371202",
      "countyName": "莱城区" },
    {
      "countyCode": "371203",
      "countyName": "钢城区" }] },

  {
    "cityCode": "370500",
    "cityName": "东营市",
    "county": [{
      "countyCode": "370523",
      "countyName": "广饶县" },
    {
      "countyCode": "370521",
      "countyName": "垦利区" },
    {
      "countyCode": "370502",
      "countyName": "东营区" },
    {
      "countyCode": "370522",
      "countyName": "利津县" },
    {
      "countyCode": "370503",
      "countyName": "河口区" }] },

  {
    "cityCode": "371600",
    "cityName": "滨州市",
    "county": [{
      "countyCode": "371625",
      "countyName": "博兴县" },
    {
      "countyCode": "371622",
      "countyName": "阳信县" },
    {
      "countyCode": "371621",
      "countyName": "惠民县" },
    {
      "countyCode": "371626",
      "countyName": "邹平市" },
    {
      "countyCode": "371602",
      "countyName": "滨城区" },
    {
      "countyCode": "371623",
      "countyName": "无棣县" },
    {
      "countyCode": "371624",
      "countyName": "沾化区" }] },

  {
    "cityCode": "371300",
    "cityName": "临沂市",
    "county": [{
      "countyCode": "371328",
      "countyName": "蒙阴县" },
    {
      "countyCode": "371302",
      "countyName": "兰山区" },
    {
      "countyCode": "371329",
      "countyName": "临沭县" },
    {
      "countyCode": "371321",
      "countyName": "沂南县" },
    {
      "countyCode": "371311",
      "countyName": "罗庄区" },
    {
      "countyCode": "371325",
      "countyName": "费县" },
    {
      "countyCode": "371326",
      "countyName": "平邑县" },
    {
      "countyCode": "371327",
      "countyName": "莒南县" },
    {
      "countyCode": "371312",
      "countyName": "河东区" },
    {
      "countyCode": "371324",
      "countyName": "兰陵县" },
    {
      "countyCode": "371323",
      "countyName": "沂水县" },
    {
      "countyCode": "371322",
      "countyName": "郯城县" }] },

  {
    "cityCode": "370200",
    "cityName": "青岛市",
    "county": [{
      "countyCode": "370211",
      "countyName": "黄岛区" },
    {
      "countyCode": "370203",
      "countyName": "市北区" },
    {
      "countyCode": "370281",
      "countyName": "胶州市" },
    {
      "countyCode": "370212",
      "countyName": "崂山区" },
    {
      "countyCode": "370202",
      "countyName": "市南区" },
    {
      "countyCode": "370282",
      "countyName": "即墨区" },
    {
      "countyCode": "370205",
      "countyName": "四方区" },
    {
      "countyCode": "370214",
      "countyName": "城阳区" },
    {
      "countyCode": "370283",
      "countyName": "平度市" },
    {
      "countyCode": "370213",
      "countyName": "李沧区" },
    {
      "countyCode": "370285",
      "countyName": "莱西市" }] },

  {
    "cityCode": "370100",
    "cityName": "济南市",
    "county": [{
      "countyCode": "370124",
      "countyName": "平阴县" },
    {
      "countyCode": "370103",
      "countyName": "市中区" },
    {
      "countyCode": "370181",
      "countyName": "章丘区" },
    {
      "countyCode": "370126",
      "countyName": "商河县" },
    {
      "countyCode": "370125",
      "countyName": "济阳区" },
    {
      "countyCode": "370113",
      "countyName": "长清区" },
    {
      "countyCode": "370102",
      "countyName": "历下区" },
    {
      "countyCode": "370112",
      "countyName": "历城区" },
    {
      "countyCode": "370105",
      "countyName": "天桥区" },
    {
      "countyCode": "370104",
      "countyName": "槐荫区" }] },

  {
    "cityCode": "371400",
    "cityName": "德州市",
    "county": [{
      "countyCode": "371481",
      "countyName": "乐陵市" },
    {
      "countyCode": "371423",
      "countyName": "庆云县" },
    {
      "countyCode": "371421",
      "countyName": "陵城区" },
    {
      "countyCode": "371482",
      "countyName": "禹城市" },
    {
      "countyCode": "371424",
      "countyName": "临邑县" },
    {
      "countyCode": "371426",
      "countyName": "平原县" },
    {
      "countyCode": "371425",
      "countyName": "齐河县" },
    {
      "countyCode": "371427",
      "countyName": "夏津县" },
    {
      "countyCode": "371422",
      "countyName": "宁津县" },
    {
      "countyCode": "371428",
      "countyName": "武城县" },
    {
      "countyCode": "371402",
      "countyName": "德城区" }] },

  {
    "cityCode": "370900",
    "cityName": "泰安市",
    "county": [{
      "countyCode": "370911",
      "countyName": "岱岳区" },
    {
      "countyCode": "370923",
      "countyName": "东平县" },
    {
      "countyCode": "370983",
      "countyName": "肥城市" },
    {
      "countyCode": "370921",
      "countyName": "宁阳县" },
    {
      "countyCode": "370982",
      "countyName": "新泰市" },
    {
      "countyCode": "370902",
      "countyName": "泰山区" }] },

  {
    "cityCode": "370600",
    "cityName": "烟台市",
    "county": [{
      "countyCode": "370686",
      "countyName": "栖霞市" },
    {
      "countyCode": "370634",
      "countyName": "长岛县" },
    {
      "countyCode": "370613",
      "countyName": "莱山区" },
    {
      "countyCode": "370612",
      "countyName": "牟平区" },
    {
      "countyCode": "370681",
      "countyName": "龙口市" },
    {
      "countyCode": "370683",
      "countyName": "莱州市" },
    {
      "countyCode": "370602",
      "countyName": "芝罘区" },
    {
      "countyCode": "370682",
      "countyName": "莱阳市" },
    {
      "countyCode": "370685",
      "countyName": "招远市" },
    {
      "countyCode": "370611",
      "countyName": "福山区" },
    {
      "countyCode": "370684",
      "countyName": "蓬莱市" },
    {
      "countyCode": "370687",
      "countyName": "海阳市" }] },

  {
    "cityCode": "370700",
    "cityName": "潍坊市",
    "county": [{
      "countyCode": "370781",
      "countyName": "青州市" },
    {
      "countyCode": "370782",
      "countyName": "诸城市" },
    {
      "countyCode": "370703",
      "countyName": "寒亭区" },
    {
      "countyCode": "370785",
      "countyName": "高密市" },
    {
      "countyCode": "370702",
      "countyName": "潍城区" },
    {
      "countyCode": "370725",
      "countyName": "昌乐县" },
    {
      "countyCode": "370704",
      "countyName": "坊子区" },
    {
      "countyCode": "370784",
      "countyName": "安丘市" },
    {
      "countyCode": "370705",
      "countyName": "奎文区" },
    {
      "countyCode": "370724",
      "countyName": "临朐县" },
    {
      "countyCode": "370786",
      "countyName": "昌邑市" },
    {
      "countyCode": "370783",
      "countyName": "寿光市" }] }] },


{
  "provinceCode": "410000",
  "provinceName": "河南省",
  "city": [{
    "cityCode": "411500",
    "cityName": "信阳市",
    "county": [{
      "countyCode": "411523",
      "countyName": "新县" },
    {
      "countyCode": "411525",
      "countyName": "固始县" },
    {
      "countyCode": "411524",
      "countyName": "商城县" },
    {
      "countyCode": "411528",
      "countyName": "息县" },
    {
      "countyCode": "411502",
      "countyName": "浉河区" },
    {
      "countyCode": "411521",
      "countyName": "罗山县" },
    {
      "countyCode": "411522",
      "countyName": "光山县" },
    {
      "countyCode": "411503",
      "countyName": "平桥区" },
    {
      "countyCode": "411526",
      "countyName": "潢川县" },
    {
      "countyCode": "411527",
      "countyName": "淮滨县" }] },

  {
    "cityCode": "410300",
    "cityName": "洛阳市",
    "county": [{
      "countyCode": "410323",
      "countyName": "新安县" },
    {
      "countyCode": "410306",
      "countyName": "吉利区" },
    {
      "countyCode": "410328",
      "countyName": "洛宁县" },
    {
      "countyCode": "410325",
      "countyName": "嵩县" },
    {
      "countyCode": "410302",
      "countyName": "老城区" },
    {
      "countyCode": "410322",
      "countyName": "孟津县" },
    {
      "countyCode": "410311",
      "countyName": "洛龙区" },
    {
      "countyCode": "410304",
      "countyName": "瀍河回族区" },
    {
      "countyCode": "410327",
      "countyName": "宜阳县" },
    {
      "countyCode": "410381",
      "countyName": "偃师市" },
    {
      "countyCode": "410326",
      "countyName": "汝阳县" },
    {
      "countyCode": "410329",
      "countyName": "伊川县" },
    {
      "countyCode": "410305",
      "countyName": "涧西区" },
    {
      "countyCode": "410324",
      "countyName": "栾川县" },
    {
      "countyCode": "410303",
      "countyName": "西工区" }] },

  {
    "cityCode": "411200",
    "cityName": "三门峡市",
    "county": [{
      "countyCode": "411222",
      "countyName": "陕州区" },
    {
      "countyCode": "411281",
      "countyName": "义马市" },
    {
      "countyCode": "411282",
      "countyName": "灵宝市" },
    {
      "countyCode": "411221",
      "countyName": "渑池县" },
    {
      "countyCode": "411202",
      "countyName": "湖滨区" },
    {
      "countyCode": "411224",
      "countyName": "卢氏县" }] },

  {
    "cityCode": "411700",
    "cityName": "驻马店市",
    "county": [{
      "countyCode": "411729",
      "countyName": "新蔡县" },
    {
      "countyCode": "411728",
      "countyName": "遂平县" },
    {
      "countyCode": "411727",
      "countyName": "汝南县" },
    {
      "countyCode": "411724",
      "countyName": "正阳县" },
    {
      "countyCode": "411723",
      "countyName": "平舆县" },
    {
      "countyCode": "411725",
      "countyName": "确山县" },
    {
      "countyCode": "411722",
      "countyName": "上蔡县" },
    {
      "countyCode": "411702",
      "countyName": "驿城区" },
    {
      "countyCode": "411721",
      "countyName": "西平县" },
    {
      "countyCode": "411726",
      "countyName": "泌阳县" }] },

  {
    "cityCode": "410500",
    "cityName": "安阳市",
    "county": [{
      "countyCode": "410505",
      "countyName": "殷都区" },
    {
      "countyCode": "410527",
      "countyName": "内黄县" },
    {
      "countyCode": "410522",
      "countyName": "安阳县" },
    {
      "countyCode": "410526",
      "countyName": "滑县" },
    {
      "countyCode": "410502",
      "countyName": "文峰区" },
    {
      "countyCode": "410503",
      "countyName": "北关区" },
    {
      "countyCode": "410506",
      "countyName": "龙安区" },
    {
      "countyCode": "410523",
      "countyName": "汤阴县" },
    {
      "countyCode": "410581",
      "countyName": "林州市" }] },

  {
    "cityCode": "411300",
    "cityName": "南阳市",
    "county": [{
      "countyCode": "411325",
      "countyName": "内乡县" },
    {
      "countyCode": "411328",
      "countyName": "唐河县" },
    {
      "countyCode": "411381",
      "countyName": "邓州市" },
    {
      "countyCode": "411322",
      "countyName": "方城县" },
    {
      "countyCode": "411330",
      "countyName": "桐柏县" },
    {
      "countyCode": "411321",
      "countyName": "南召县" },
    {
      "countyCode": "411323",
      "countyName": "西峡县" },
    {
      "countyCode": "411327",
      "countyName": "社旗县" },
    {
      "countyCode": "411302",
      "countyName": "宛城区" },
    {
      "countyCode": "411303",
      "countyName": "卧龙区" },
    {
      "countyCode": "411326",
      "countyName": "淅川县" },
    {
      "countyCode": "411329",
      "countyName": "新野县" },
    {
      "countyCode": "411324",
      "countyName": "镇平县" }] },

  {
    "cityCode": "410700",
    "cityName": "新乡市",
    "county": [{
      "countyCode": "410711",
      "countyName": "牧野区" },
    {
      "countyCode": "410721",
      "countyName": "新乡县" },
    {
      "countyCode": "410704",
      "countyName": "凤泉区" },
    {
      "countyCode": "410781",
      "countyName": "卫辉市" },
    {
      "countyCode": "410727",
      "countyName": "封丘县" },
    {
      "countyCode": "410702",
      "countyName": "红旗区" },
    {
      "countyCode": "410726",
      "countyName": "延津县" },
    {
      "countyCode": "410703",
      "countyName": "卫滨区" },
    {
      "countyCode": "410782",
      "countyName": "辉县市" },
    {
      "countyCode": "410728",
      "countyName": "长垣县" },
    {
      "countyCode": "410724",
      "countyName": "获嘉县" },
    {
      "countyCode": "410725",
      "countyName": "原阳县" }] },

  {
    "cityCode": "410200",
    "cityName": "开封市",
    "county": [{
      "countyCode": "410205",
      "countyName": "禹王台区" },
    {
      "countyCode": "410222",
      "countyName": "通许县" },
    {
      "countyCode": "410225",
      "countyName": "兰考县" },
    {
      "countyCode": "410223",
      "countyName": "尉氏县" },
    {
      "countyCode": "410203",
      "countyName": "顺河回族区" },
    {
      "countyCode": "410204",
      "countyName": "鼓楼区" },
    {
      "countyCode": "410224",
      "countyName": "祥符区" },
    {
      "countyCode": "410221",
      "countyName": "杞县" },
    {
      "countyCode": "410211",
      "countyName": "金明区" },
    {
      "countyCode": "410202",
      "countyName": "龙亭区" }] },

  {
    "cityCode": "411400",
    "cityName": "商丘市",
    "county": [{
      "countyCode": "411402",
      "countyName": "梁园区" },
    {
      "countyCode": "411422",
      "countyName": "睢县" },
    {
      "countyCode": "411423",
      "countyName": "宁陵县" },
    {
      "countyCode": "411421",
      "countyName": "民权县" },
    {
      "countyCode": "411424",
      "countyName": "柘城县" },
    {
      "countyCode": "411425",
      "countyName": "虞城县" },
    {
      "countyCode": "411426",
      "countyName": "夏邑县" },
    {
      "countyCode": "411481",
      "countyName": "永城市" },
    {
      "countyCode": "411403",
      "countyName": "睢阳区" }] },

  {
    "cityCode": "411000",
    "cityName": "许昌市",
    "county": [{
      "countyCode": "411024",
      "countyName": "鄢陵县" },
    {
      "countyCode": "411082",
      "countyName": "长葛市" },
    {
      "countyCode": "411002",
      "countyName": "魏都区" },
    {
      "countyCode": "411081",
      "countyName": "禹州市" },
    {
      "countyCode": "411025",
      "countyName": "襄城县" },
    {
      "countyCode": "411023",
      "countyName": "建安区" }] },

  {
    "cityCode": "410100",
    "cityName": "郑州市",
    "county": [{
      "countyCode": "410185",
      "countyName": "登封市" },
    {
      "countyCode": "410182",
      "countyName": "荥阳市" },
    {
      "countyCode": "410104",
      "countyName": "管城回族区" },
    {
      "countyCode": "410108",
      "countyName": "惠济区" },
    {
      "countyCode": "410122",
      "countyName": "中牟县" },
    {
      "countyCode": "410105",
      "countyName": "金水区" },
    {
      "countyCode": "410183",
      "countyName": "新密市" },
    {
      "countyCode": "410184",
      "countyName": "新郑市" },
    {
      "countyCode": "410181",
      "countyName": "巩义市" },
    {
      "countyCode": "410106",
      "countyName": "上街区" },
    {
      "countyCode": "410103",
      "countyName": "二七区" },
    {
      "countyCode": "410102",
      "countyName": "中原区" }] },

  {
    "cityCode": "419001",
    "cityName": "济源市",
    "county": [{
      "countyCode": "419001-1",
      "countyName": "济源市" }] },

  {
    "cityCode": "410400",
    "cityName": "平顶山市",
    "county": [{
      "countyCode": "410481",
      "countyName": "舞钢市" },
    {
      "countyCode": "410421",
      "countyName": "宝丰县" },
    {
      "countyCode": "410482",
      "countyName": "汝州市" },
    {
      "countyCode": "410404",
      "countyName": "石龙区" },
    {
      "countyCode": "410403",
      "countyName": "卫东区" },
    {
      "countyCode": "410411",
      "countyName": "湛河区" },
    {
      "countyCode": "410402",
      "countyName": "新华区" },
    {
      "countyCode": "410423",
      "countyName": "鲁山县" },
    {
      "countyCode": "410422",
      "countyName": "叶县" },
    {
      "countyCode": "410425",
      "countyName": "郏县" }] },

  {
    "cityCode": "410900",
    "cityName": "濮阳市",
    "county": [{
      "countyCode": "410902",
      "countyName": "华龙区" },
    {
      "countyCode": "410922",
      "countyName": "清丰县" },
    {
      "countyCode": "410926",
      "countyName": "范县" },
    {
      "countyCode": "410927",
      "countyName": "台前县" },
    {
      "countyCode": "410923",
      "countyName": "南乐县" },
    {
      "countyCode": "410928",
      "countyName": "濮阳县" }] },

  {
    "cityCode": "410600",
    "cityName": "鹤壁市",
    "county": [{
      "countyCode": "410603",
      "countyName": "山城区" },
    {
      "countyCode": "410611",
      "countyName": "淇滨区" },
    {
      "countyCode": "410602",
      "countyName": "鹤山区" },
    {
      "countyCode": "410621",
      "countyName": "浚县" },
    {
      "countyCode": "410622",
      "countyName": "淇县" }] },

  {
    "cityCode": "411100",
    "cityName": "漯河市",
    "county": [{
      "countyCode": "411102",
      "countyName": "源汇区" },
    {
      "countyCode": "411122",
      "countyName": "临颍县" },
    {
      "countyCode": "411103",
      "countyName": "郾城区" },
    {
      "countyCode": "411104",
      "countyName": "召陵区" },
    {
      "countyCode": "411121",
      "countyName": "舞阳县" }] },

  {
    "cityCode": "411600",
    "cityName": "周口市",
    "county": [{
      "countyCode": "411626",
      "countyName": "淮阳县" },
    {
      "countyCode": "411681",
      "countyName": "项城市" },
    {
      "countyCode": "411624",
      "countyName": "沈丘县" },
    {
      "countyCode": "411622",
      "countyName": "西华县" },
    {
      "countyCode": "411627",
      "countyName": "太康县" },
    {
      "countyCode": "411623",
      "countyName": "商水县" },
    {
      "countyCode": "411628",
      "countyName": "鹿邑县" },
    {
      "countyCode": "411602",
      "countyName": "川汇区" },
    {
      "countyCode": "411621",
      "countyName": "扶沟县" },
    {
      "countyCode": "411625",
      "countyName": "郸城县" }] },

  {
    "cityCode": "410800",
    "cityName": "焦作市",
    "county": [{
      "countyCode": "410883",
      "countyName": "孟州市" },
    {
      "countyCode": "410823",
      "countyName": "武陟县" },
    {
      "countyCode": "410882",
      "countyName": "沁阳市" },
    {
      "countyCode": "410822",
      "countyName": "博爱县" },
    {
      "countyCode": "410821",
      "countyName": "修武县" },
    {
      "countyCode": "410825",
      "countyName": "温县" },
    {
      "countyCode": "410804",
      "countyName": "马村区" },
    {
      "countyCode": "410802",
      "countyName": "解放区" },
    {
      "countyCode": "410811",
      "countyName": "山阳区" },
    {
      "countyCode": "410803",
      "countyName": "中站区" }] }] },


{
  "provinceCode": "420000",
  "provinceName": "湖北省",
  "city": [{
    "cityCode": "429004",
    "cityName": "仙桃市",
    "county": [{
      "countyCode": "429004-1",
      "countyName": "仙桃市" }] },

  {
    "cityCode": "421200",
    "cityName": "咸宁市",
    "county": [{
      "countyCode": "421223",
      "countyName": "崇阳县" },
    {
      "countyCode": "421224",
      "countyName": "通山县" },
    {
      "countyCode": "421202",
      "countyName": "咸安区" },
    {
      "countyCode": "421222",
      "countyName": "通城县" },
    {
      "countyCode": "421221",
      "countyName": "嘉鱼县" },
    {
      "countyCode": "421281",
      "countyName": "赤壁市" }] },

  {
    "cityCode": "421300",
    "cityName": "随州市",
    "county": [{
      "countyCode": "421381",
      "countyName": "广水市" },
    {
      "countyCode": "421303",
      "countyName": "曾都区" },
    {
      "countyCode": "421321",
      "countyName": "随县" }] },

  {
    "cityCode": "422800",
    "cityName": "恩施土家族苗族自治州",
    "county": [{
      "countyCode": "422828",
      "countyName": "鹤峰县" },
    {
      "countyCode": "422825",
      "countyName": "宣恩县" },
    {
      "countyCode": "422801",
      "countyName": "恩施市" },
    {
      "countyCode": "422822",
      "countyName": "建始县" },
    {
      "countyCode": "422823",
      "countyName": "巴东县" },
    {
      "countyCode": "422826",
      "countyName": "咸丰县" },
    {
      "countyCode": "422827",
      "countyName": "来凤县" },
    {
      "countyCode": "422802",
      "countyName": "利川市" }] },

  {
    "cityCode": "420900",
    "cityName": "孝感市",
    "county": [{
      "countyCode": "420902",
      "countyName": "孝南区" },
    {
      "countyCode": "420981",
      "countyName": "应城市" },
    {
      "countyCode": "420923",
      "countyName": "云梦县" },
    {
      "countyCode": "420982",
      "countyName": "安陆市" },
    {
      "countyCode": "420922",
      "countyName": "大悟县" },
    {
      "countyCode": "420921",
      "countyName": "孝昌县" },
    {
      "countyCode": "420984",
      "countyName": "汉川市" }] },

  {
    "cityCode": "420100",
    "cityName": "武汉市",
    "county": [{
      "countyCode": "420104",
      "countyName": "硚口区" },
    {
      "countyCode": "420107",
      "countyName": "青山区" },
    {
      "countyCode": "420116",
      "countyName": "黄陂区" },
    {
      "countyCode": "420102",
      "countyName": "江岸区" },
    {
      "countyCode": "420115",
      "countyName": "江夏区" },
    {
      "countyCode": "420114",
      "countyName": "蔡甸区" },
    {
      "countyCode": "420106",
      "countyName": "武昌区" },
    {
      "countyCode": "420112",
      "countyName": "东西湖区" },
    {
      "countyCode": "420105",
      "countyName": "汉阳区" },
    {
      "countyCode": "420113",
      "countyName": "汉南区" },
    {
      "countyCode": "420111",
      "countyName": "洪山区" },
    {
      "countyCode": "420103",
      "countyName": "江汉区" },
    {
      "countyCode": "420117",
      "countyName": "新洲区" }] },

  {
    "cityCode": "420500",
    "cityName": "宜昌市",
    "county": [{
      "countyCode": "420502",
      "countyName": "西陵区" },
    {
      "countyCode": "420505",
      "countyName": "猇亭区" },
    {
      "countyCode": "420503",
      "countyName": "伍家岗区" },
    {
      "countyCode": "420581",
      "countyName": "宜都市" },
    {
      "countyCode": "420504",
      "countyName": "点军区" },
    {
      "countyCode": "420526",
      "countyName": "兴山县" },
    {
      "countyCode": "420525",
      "countyName": "远安县" },
    {
      "countyCode": "420527",
      "countyName": "秭归县" },
    {
      "countyCode": "420583",
      "countyName": "枝江市" },
    {
      "countyCode": "420529",
      "countyName": "五峰土家族自治县" },
    {
      "countyCode": "420582",
      "countyName": "当阳市" },
    {
      "countyCode": "420506",
      "countyName": "夷陵区" },
    {
      "countyCode": "420528",
      "countyName": "长阳土家族自治县" }] },

  {
    "cityCode": "420800",
    "cityName": "荆门市",
    "county": [{
      "countyCode": "420804",
      "countyName": "掇刀区" },
    {
      "countyCode": "420822",
      "countyName": "沙洋县" },
    {
      "countyCode": "420802",
      "countyName": "东宝区" },
    {
      "countyCode": "420881",
      "countyName": "钟祥市" },
    {
      "countyCode": "420821",
      "countyName": "京山市" }] },

  {
    "cityCode": "429006",
    "cityName": "天门市",
    "county": [{
      "countyCode": "429006-1",
      "countyName": "天门市" }] },

  {
    "cityCode": "421000",
    "cityName": "荆州市",
    "county": [{
      "countyCode": "421003",
      "countyName": "荆州区" },
    {
      "countyCode": "421023",
      "countyName": "监利县" },
    {
      "countyCode": "421087",
      "countyName": "松滋市" },
    {
      "countyCode": "421022",
      "countyName": "公安县" },
    {
      "countyCode": "421002",
      "countyName": "沙市区" },
    {
      "countyCode": "421024",
      "countyName": "江陵县" },
    {
      "countyCode": "421081",
      "countyName": "石首市" },
    {
      "countyCode": "421083",
      "countyName": "洪湖市" }] },

  {
    "cityCode": "420600",
    "cityName": "襄阳市",
    "county": [{
      "countyCode": "420625",
      "countyName": "谷城县" },
    {
      "countyCode": "420607",
      "countyName": "襄州区" },
    {
      "countyCode": "420606",
      "countyName": "樊城区" },
    {
      "countyCode": "420602",
      "countyName": "襄城区" },
    {
      "countyCode": "420626",
      "countyName": "保康县" },
    {
      "countyCode": "420624",
      "countyName": "南漳县" },
    {
      "countyCode": "420683",
      "countyName": "枣阳市" },
    {
      "countyCode": "420682",
      "countyName": "老河口市" },
    {
      "countyCode": "420684",
      "countyName": "宜城市" }] },

  {
    "cityCode": "420700",
    "cityName": "鄂州市",
    "county": [{
      "countyCode": "420702",
      "countyName": "梁子湖区" },
    {
      "countyCode": "420703",
      "countyName": "华容区" },
    {
      "countyCode": "420704",
      "countyName": "鄂城区" }] },

  {
    "cityCode": "429021",
    "cityName": "神农架林区",
    "county": [{
      "countyCode": "429021-1",
      "countyName": "神农架林区" }] },

  {
    "cityCode": "420200",
    "cityName": "黄石市",
    "county": [{
      "countyCode": "420202",
      "countyName": "黄石港区" },
    {
      "countyCode": "420281",
      "countyName": "大冶市" },
    {
      "countyCode": "420205",
      "countyName": "铁山区" },
    {
      "countyCode": "420222",
      "countyName": "阳新县" },
    {
      "countyCode": "420203",
      "countyName": "西塞山区" },
    {
      "countyCode": "420204",
      "countyName": "下陆区" }] },

  {
    "cityCode": "421100",
    "cityName": "黄冈市",
    "county": [{
      "countyCode": "421181",
      "countyName": "麻城市" },
    {
      "countyCode": "421125",
      "countyName": "浠水县" },
    {
      "countyCode": "421121",
      "countyName": "团风县" },
    {
      "countyCode": "421182",
      "countyName": "武穴市" },
    {
      "countyCode": "421124",
      "countyName": "英山县" },
    {
      "countyCode": "421122",
      "countyName": "红安县" },
    {
      "countyCode": "421102",
      "countyName": "黄州区" },
    {
      "countyCode": "421123",
      "countyName": "罗田县" },
    {
      "countyCode": "421126",
      "countyName": "蕲春县" },
    {
      "countyCode": "421127",
      "countyName": "黄梅县" }] },

  {
    "cityCode": "420300",
    "cityName": "十堰市",
    "county": [{
      "countyCode": "420322",
      "countyName": "郧西县" },
    {
      "countyCode": "420321",
      "countyName": "郧阳区" },
    {
      "countyCode": "420323",
      "countyName": "竹山县" },
    {
      "countyCode": "420324",
      "countyName": "竹溪县" },
    {
      "countyCode": "420325",
      "countyName": "房县" },
    {
      "countyCode": "420302",
      "countyName": "茅箭区" },
    {
      "countyCode": "420303",
      "countyName": "张湾区" },
    {
      "countyCode": "420381",
      "countyName": "丹江口市" }] },

  {
    "cityCode": "429005",
    "cityName": "潜江市",
    "county": [{
      "countyCode": "429005-1",
      "countyName": "潜江市" }] }] },


{
  "provinceCode": "430000",
  "provinceName": "湖南省",
  "city": [{
    "cityCode": "430300",
    "cityName": "湘潭市",
    "county": [{
      "countyCode": "430381",
      "countyName": "湘乡市" },
    {
      "countyCode": "430302",
      "countyName": "雨湖区" },
    {
      "countyCode": "430382",
      "countyName": "韶山市" },
    {
      "countyCode": "430321",
      "countyName": "湘潭县" },
    {
      "countyCode": "430304",
      "countyName": "岳塘区" }] },

  {
    "cityCode": "430600",
    "cityName": "岳阳市",
    "county": [{
      "countyCode": "430623",
      "countyName": "华容县" },
    {
      "countyCode": "430682",
      "countyName": "临湘市" },
    {
      "countyCode": "430603",
      "countyName": "云溪区" },
    {
      "countyCode": "430681",
      "countyName": "汨罗市" },
    {
      "countyCode": "430624",
      "countyName": "湘阴县" },
    {
      "countyCode": "430602",
      "countyName": "岳阳楼区" },
    {
      "countyCode": "430626",
      "countyName": "平江县" },
    {
      "countyCode": "430611",
      "countyName": "君山区" },
    {
      "countyCode": "430621",
      "countyName": "岳阳县" }] },

  {
    "cityCode": "430100",
    "cityName": "长沙市",
    "county": [{
      "countyCode": "430111",
      "countyName": "雨花区" },
    {
      "countyCode": "430103",
      "countyName": "天心区" },
    {
      "countyCode": "430104",
      "countyName": "岳麓区" },
    {
      "countyCode": "430181",
      "countyName": "浏阳市" },
    {
      "countyCode": "430124",
      "countyName": "宁乡市" },
    {
      "countyCode": "430112",
      "countyName": "望城区" },
    {
      "countyCode": "430121",
      "countyName": "长沙县" },
    {
      "countyCode": "430105",
      "countyName": "开福区" },
    {
      "countyCode": "430102",
      "countyName": "芙蓉区" }] },

  {
    "cityCode": "430200",
    "cityName": "株洲市",
    "county": [{
      "countyCode": "430202",
      "countyName": "荷塘区" },
    {
      "countyCode": "430225",
      "countyName": "炎陵县" },
    {
      "countyCode": "430281",
      "countyName": "醴陵市" },
    {
      "countyCode": "430203",
      "countyName": "芦淞区" },
    {
      "countyCode": "430224",
      "countyName": "茶陵县" },
    {
      "countyCode": "430211",
      "countyName": "天元区" },
    {
      "countyCode": "430221",
      "countyName": "株洲县" },
    {
      "countyCode": "430223",
      "countyName": "攸县" },
    {
      "countyCode": "430204",
      "countyName": "石峰区" }] },

  {
    "cityCode": "431000",
    "cityName": "郴州市",
    "county": [{
      "countyCode": "431028",
      "countyName": "安仁县" },
    {
      "countyCode": "431021",
      "countyName": "桂阳县" },
    {
      "countyCode": "431002",
      "countyName": "北湖区" },
    {
      "countyCode": "431027",
      "countyName": "桂东县" },
    {
      "countyCode": "431024",
      "countyName": "嘉禾县" },
    {
      "countyCode": "431026",
      "countyName": "汝城县" },
    {
      "countyCode": "431023",
      "countyName": "永兴县" },
    {
      "countyCode": "431025",
      "countyName": "临武县" },
    {
      "countyCode": "431022",
      "countyName": "宜章县" },
    {
      "countyCode": "431003",
      "countyName": "苏仙区" },
    {
      "countyCode": "431081",
      "countyName": "资兴市" }] },

  {
    "cityCode": "431200",
    "cityName": "怀化市",
    "county": [{
      "countyCode": "431223",
      "countyName": "辰溪县" },
    {
      "countyCode": "431202",
      "countyName": "鹤城区" },
    {
      "countyCode": "431224",
      "countyName": "溆浦县" },
    {
      "countyCode": "431226",
      "countyName": "麻阳苗族自治县" },
    {
      "countyCode": "431229",
      "countyName": "靖州苗族侗族自治县" },
    {
      "countyCode": "431230",
      "countyName": "通道侗族自治县" },
    {
      "countyCode": "431281",
      "countyName": "洪江市" },
    {
      "countyCode": "431228",
      "countyName": "芷江侗族自治县" },
    {
      "countyCode": "431221",
      "countyName": "中方县" },
    {
      "countyCode": "431225",
      "countyName": "会同县" },
    {
      "countyCode": "431227",
      "countyName": "新晃侗族自治县" },
    {
      "countyCode": "431222",
      "countyName": "沅陵县" }] },

  {
    "cityCode": "431100",
    "cityName": "永州市",
    "county": [{
      "countyCode": "431123",
      "countyName": "双牌县" },
    {
      "countyCode": "431125",
      "countyName": "江永县" },
    {
      "countyCode": "431102",
      "countyName": "零陵区" },
    {
      "countyCode": "431129",
      "countyName": "江华瑶族自治县" },
    {
      "countyCode": "431124",
      "countyName": "道县" },
    {
      "countyCode": "431127",
      "countyName": "蓝山县" },
    {
      "countyCode": "431103",
      "countyName": "冷水滩区" },
    {
      "countyCode": "431122",
      "countyName": "东安县" },
    {
      "countyCode": "431128",
      "countyName": "新田县" },
    {
      "countyCode": "431121",
      "countyName": "祁阳县" },
    {
      "countyCode": "431126",
      "countyName": "宁远县" }] },

  {
    "cityCode": "430700",
    "cityName": "常德市",
    "county": [{
      "countyCode": "430703",
      "countyName": "鼎城区" },
    {
      "countyCode": "430725",
      "countyName": "桃源县" },
    {
      "countyCode": "430724",
      "countyName": "临澧县" },
    {
      "countyCode": "430781",
      "countyName": "津市市" },
    {
      "countyCode": "430702",
      "countyName": "武陵区" },
    {
      "countyCode": "430721",
      "countyName": "安乡县" },
    {
      "countyCode": "430726",
      "countyName": "石门县" },
    {
      "countyCode": "430722",
      "countyName": "汉寿县" },
    {
      "countyCode": "430723",
      "countyName": "澧县" }] },

  {
    "cityCode": "431300",
    "cityName": "娄底市",
    "county": [{
      "countyCode": "431322",
      "countyName": "新化县" },
    {
      "countyCode": "431302",
      "countyName": "娄星区" },
    {
      "countyCode": "431321",
      "countyName": "双峰县" },
    {
      "countyCode": "431381",
      "countyName": "冷水江市" },
    {
      "countyCode": "431382",
      "countyName": "涟源市" }] },

  {
    "cityCode": "430800",
    "cityName": "张家界市",
    "county": [{
      "countyCode": "430821",
      "countyName": "慈利县" },
    {
      "countyCode": "430822",
      "countyName": "桑植县" },
    {
      "countyCode": "430802",
      "countyName": "永定区" },
    {
      "countyCode": "430811",
      "countyName": "武陵源区" }] },

  {
    "cityCode": "430400",
    "cityName": "衡阳市",
    "county": [{
      "countyCode": "430423",
      "countyName": "衡山县" },
    {
      "countyCode": "430408",
      "countyName": "蒸湘区" },
    {
      "countyCode": "430405",
      "countyName": "珠晖区" },
    {
      "countyCode": "430481",
      "countyName": "耒阳市" },
    {
      "countyCode": "430422",
      "countyName": "衡南县" },
    {
      "countyCode": "430426",
      "countyName": "祁东县" },
    {
      "countyCode": "430407",
      "countyName": "石鼓区" },
    {
      "countyCode": "430482",
      "countyName": "常宁市" },
    {
      "countyCode": "430424",
      "countyName": "衡东县" },
    {
      "countyCode": "430406",
      "countyName": "雁峰区" },
    {
      "countyCode": "430421",
      "countyName": "衡阳县" },
    {
      "countyCode": "430412",
      "countyName": "南岳区" }] },

  {
    "cityCode": "430500",
    "cityName": "邵阳市",
    "county": [{
      "countyCode": "430524",
      "countyName": "隆回县" },
    {
      "countyCode": "430503",
      "countyName": "大祥区" },
    {
      "countyCode": "430528",
      "countyName": "新宁县" },
    {
      "countyCode": "430529",
      "countyName": "城步苗族自治县" },
    {
      "countyCode": "430581",
      "countyName": "武冈市" },
    {
      "countyCode": "430502",
      "countyName": "双清区" },
    {
      "countyCode": "430523",
      "countyName": "邵阳县" },
    {
      "countyCode": "430522",
      "countyName": "新邵县" },
    {
      "countyCode": "430521",
      "countyName": "邵东县" },
    {
      "countyCode": "430525",
      "countyName": "洞口县" },
    {
      "countyCode": "430511",
      "countyName": "北塔区" },
    {
      "countyCode": "430527",
      "countyName": "绥宁县" }] },

  {
    "cityCode": "433100",
    "cityName": "湘西土家族苗族自治州",
    "county": [{
      "countyCode": "433123",
      "countyName": "凤凰县" },
    {
      "countyCode": "433126",
      "countyName": "古丈县" },
    {
      "countyCode": "433125",
      "countyName": "保靖县" },
    {
      "countyCode": "433124",
      "countyName": "花垣县" },
    {
      "countyCode": "433127",
      "countyName": "永顺县" },
    {
      "countyCode": "433122",
      "countyName": "泸溪县" },
    {
      "countyCode": "433101",
      "countyName": "吉首市" },
    {
      "countyCode": "433130",
      "countyName": "龙山县" }] },

  {
    "cityCode": "430900",
    "cityName": "益阳市",
    "county": [{
      "countyCode": "430923",
      "countyName": "安化县" },
    {
      "countyCode": "430921",
      "countyName": "南县" },
    {
      "countyCode": "430902",
      "countyName": "资阳区" },
    {
      "countyCode": "430981",
      "countyName": "沅江市" },
    {
      "countyCode": "430903",
      "countyName": "赫山区" },
    {
      "countyCode": "430922",
      "countyName": "桃江县" }] }] },


{
  "provinceCode": "450000",
  "provinceName": "广西壮族自治区",
  "city": [{
    "cityCode": "450400",
    "cityName": "梧州市",
    "county": [{
      "countyCode": "450481",
      "countyName": "岑溪市" },
    {
      "countyCode": "450423",
      "countyName": "蒙山县" },
    {
      "countyCode": "450421",
      "countyName": "苍梧县" },
    {
      "countyCode": "450422",
      "countyName": "藤县" },
    {
      "countyCode": "450403",
      "countyName": "万秀区" },
    {
      "countyCode": "450405",
      "countyName": "长洲区" },
    {
      "countyCode": "450424",
      "countyName": "龙圩区" },
    {
      "countyCode": "450404",
      "countyName": "蝶山区" }] },

  {
    "cityCode": "450500",
    "cityName": "北海市",
    "county": [{
      "countyCode": "450521",
      "countyName": "合浦县" },
    {
      "countyCode": "450512",
      "countyName": "铁山港区" },
    {
      "countyCode": "450502",
      "countyName": "海城区" },
    {
      "countyCode": "450503",
      "countyName": "银海区" }] },

  {
    "cityCode": "450300",
    "cityName": "桂林市",
    "county": [{
      "countyCode": "450327",
      "countyName": "灌阳县" },
    {
      "countyCode": "450305",
      "countyName": "七星区" },
    {
      "countyCode": "450326",
      "countyName": "永福县" },
    {
      "countyCode": "450325",
      "countyName": "兴安县" },
    {
      "countyCode": "450321",
      "countyName": "阳朔县" },
    {
      "countyCode": "450332",
      "countyName": "恭城瑶族自治县" },
    {
      "countyCode": "450302",
      "countyName": "秀峰区" },
    {
      "countyCode": "450304",
      "countyName": "象山区" },
    {
      "countyCode": "450330",
      "countyName": "平乐县" },
    {
      "countyCode": "450331",
      "countyName": "荔浦县" },
    {
      "countyCode": "450329",
      "countyName": "资源县" },
    {
      "countyCode": "450323",
      "countyName": "灵川县" },
    {
      "countyCode": "450324",
      "countyName": "全州县" },
    {
      "countyCode": "450322",
      "countyName": "临桂区" },
    {
      "countyCode": "450303",
      "countyName": "叠彩区" },
    {
      "countyCode": "450311",
      "countyName": "雁山区" },
    {
      "countyCode": "450328",
      "countyName": "龙胜各族自治县" }] },

  {
    "cityCode": "451100",
    "cityName": "贺州市",
    "county": [{
      "countyCode": "451121",
      "countyName": "昭平县" },
    {
      "countyCode": "451122",
      "countyName": "钟山县" },
    {
      "countyCode": "451102",
      "countyName": "八步区" },
    {
      "countyCode": "451123",
      "countyName": "富川瑶族自治县" },
    {
      "countyCode": "451103",
      "countyName": "平桂区" }] },

  {
    "cityCode": "450800",
    "cityName": "贵港市",
    "county": [{
      "countyCode": "450804",
      "countyName": "覃塘区" },
    {
      "countyCode": "450881",
      "countyName": "桂平市" },
    {
      "countyCode": "450821",
      "countyName": "平南县" },
    {
      "countyCode": "450803",
      "countyName": "港南区" },
    {
      "countyCode": "450802",
      "countyName": "港北区" }] },

  {
    "cityCode": "450900",
    "cityName": "玉林市",
    "county": [{
      "countyCode": "450921",
      "countyName": "容县" },
    {
      "countyCode": "450924",
      "countyName": "兴业县" },
    {
      "countyCode": "450902",
      "countyName": "玉州区" },
    {
      "countyCode": "450903",
      "countyName": "福绵区" },
    {
      "countyCode": "450981",
      "countyName": "北流市" },
    {
      "countyCode": "450923",
      "countyName": "博白县" },
    {
      "countyCode": "450922",
      "countyName": "陆川县" }] },

  {
    "cityCode": "450200",
    "cityName": "柳州市",
    "county": [{
      "countyCode": "450225",
      "countyName": "融水苗族自治县" },
    {
      "countyCode": "450202",
      "countyName": "城中区" },
    {
      "countyCode": "450223",
      "countyName": "鹿寨县" },
    {
      "countyCode": "450226",
      "countyName": "三江侗族自治县" },
    {
      "countyCode": "450204",
      "countyName": "柳南区" },
    {
      "countyCode": "450203",
      "countyName": "鱼峰区" },
    {
      "countyCode": "450222",
      "countyName": "柳城县" },
    {
      "countyCode": "450224",
      "countyName": "融安县" },
    {
      "countyCode": "450205",
      "countyName": "柳北区" },
    {
      "countyCode": "450221",
      "countyName": "柳江区" }] },

  {
    "cityCode": "451000",
    "cityName": "百色市",
    "county": [{
      "countyCode": "451002",
      "countyName": "右江区" },
    {
      "countyCode": "451031",
      "countyName": "隆林各族自治县" },
    {
      "countyCode": "451027",
      "countyName": "凌云县" },
    {
      "countyCode": "451023",
      "countyName": "平果县" },
    {
      "countyCode": "451026",
      "countyName": "那坡县" },
    {
      "countyCode": "451030",
      "countyName": "西林县" },
    {
      "countyCode": "451024",
      "countyName": "德保县" },
    {
      "countyCode": "451022",
      "countyName": "田东县" },
    {
      "countyCode": "451021",
      "countyName": "田阳县" },
    {
      "countyCode": "451028",
      "countyName": "乐业县" },
    {
      "countyCode": "451029",
      "countyName": "田林县" },
    {
      "countyCode": "451025",
      "countyName": "靖西市" }] },

  {
    "cityCode": "451300",
    "cityName": "来宾市",
    "county": [{
      "countyCode": "451381",
      "countyName": "合山市" },
    {
      "countyCode": "451322",
      "countyName": "象州县" },
    {
      "countyCode": "451324",
      "countyName": "金秀瑶族自治县" },
    {
      "countyCode": "451321",
      "countyName": "忻城县" },
    {
      "countyCode": "451302",
      "countyName": "兴宾区" },
    {
      "countyCode": "451323",
      "countyName": "武宣县" }] },

  {
    "cityCode": "450100",
    "cityName": "南宁市",
    "county": [{
      "countyCode": "450105",
      "countyName": "江南区" },
    {
      "countyCode": "450107",
      "countyName": "西乡塘区" },
    {
      "countyCode": "450109",
      "countyName": "邕宁区" },
    {
      "countyCode": "450126",
      "countyName": "宾阳县" },
    {
      "countyCode": "450108",
      "countyName": "良庆区" },
    {
      "countyCode": "450125",
      "countyName": "上林县" },
    {
      "countyCode": "450123",
      "countyName": "隆安县" },
    {
      "countyCode": "450124",
      "countyName": "马山县" },
    {
      "countyCode": "450122",
      "countyName": "武鸣区" },
    {
      "countyCode": "450102",
      "countyName": "兴宁区" },
    {
      "countyCode": "450127",
      "countyName": "横县" },
    {
      "countyCode": "450103",
      "countyName": "青秀区" }] },

  {
    "cityCode": "450700",
    "cityName": "钦州市",
    "county": [{
      "countyCode": "450702",
      "countyName": "钦南区" },
    {
      "countyCode": "450722",
      "countyName": "浦北县" },
    {
      "countyCode": "450721",
      "countyName": "灵山县" },
    {
      "countyCode": "450703",
      "countyName": "钦北区" }] },

  {
    "cityCode": "450600",
    "cityName": "防城港市",
    "county": [{
      "countyCode": "450603",
      "countyName": "防城区" },
    {
      "countyCode": "450621",
      "countyName": "上思县" },
    {
      "countyCode": "450602",
      "countyName": "港口区" },
    {
      "countyCode": "450681",
      "countyName": "东兴市" }] },

  {
    "cityCode": "451200",
    "cityName": "河池市",
    "county": [{
      "countyCode": "451202",
      "countyName": "金城江区" },
    {
      "countyCode": "451281",
      "countyName": "宜州区" },
    {
      "countyCode": "451221",
      "countyName": "南丹县" },
    {
      "countyCode": "451224",
      "countyName": "东兰县" },
    {
      "countyCode": "451228",
      "countyName": "都安瑶族自治县" },
    {
      "countyCode": "451229",
      "countyName": "大化瑶族自治县" },
    {
      "countyCode": "451222",
      "countyName": "天峨县" },
    {
      "countyCode": "451225",
      "countyName": "罗城仫佬族自治县" },
    {
      "countyCode": "451227",
      "countyName": "巴马瑶族自治县" },
    {
      "countyCode": "451226",
      "countyName": "环江毛南族自治县" },
    {
      "countyCode": "451223",
      "countyName": "凤山县" }] },

  {
    "cityCode": "451400",
    "cityName": "崇左市",
    "county": [{
      "countyCode": "451423",
      "countyName": "龙州县" },
    {
      "countyCode": "451425",
      "countyName": "天等县" },
    {
      "countyCode": "451481",
      "countyName": "凭祥市" },
    {
      "countyCode": "451422",
      "countyName": "宁明县" },
    {
      "countyCode": "451402",
      "countyName": "江州区" },
    {
      "countyCode": "451421",
      "countyName": "扶绥县" },
    {
      "countyCode": "451424",
      "countyName": "大新县" }] }] },


{
  "provinceCode": "460000",
  "provinceName": "海南省",
  "city": [{
    "cityCode": "469005",
    "cityName": "文昌市",
    "county": [{
      "countyCode": "469005-1",
      "countyName": "文昌市" }] },

  {
    "cityCode": "460300",
    "cityName": "三沙市",
    "county": [{
      "countyCode": "460321",
      "countyName": "西沙群岛" },
    {
      "countyCode": "460322",
      "countyName": "南沙群岛" },
    {
      "countyCode": "469031",
      "countyName": "西沙群岛" },
    {
      "countyCode": "469032",
      "countyName": "南沙群岛" },
    {
      "countyCode": "460323",
      "countyName": "中沙群岛的岛礁及其海域" }] },

  {
    "cityCode": "469027",
    "cityName": "乐东黎族自治县",
    "county": [{
      "countyCode": "469027-1",
      "countyName": "乐东黎族自治县" }] },

  {
    "cityCode": "460200",
    "cityName": "三亚市",
    "county": [{
      "countyCode": "460203",
      "countyName": "吉阳区" },
    {
      "countyCode": "460202",
      "countyName": "海棠区" },
    {
      "countyCode": "460205",
      "countyName": "崖州区" },
    {
      "countyCode": "460204",
      "countyName": "天涯区" }] },

  {
    "cityCode": "469002",
    "cityName": "琼海市",
    "county": [{
      "countyCode": "469002-1",
      "countyName": "琼海市" }] },

  {
    "cityCode": "469021",
    "cityName": "定安县",
    "county": [{
      "countyCode": "469021-1",
      "countyName": "定安县" }] },

  {
    "cityCode": "460100",
    "cityName": "海口市",
    "county": [{
      "countyCode": "460107",
      "countyName": "琼山区" },
    {
      "countyCode": "460108",
      "countyName": "美兰区" },
    {
      "countyCode": "460105",
      "countyName": "秀英区" },
    {
      "countyCode": "460106",
      "countyName": "龙华区" }] },

  {
    "cityCode": "469006",
    "cityName": "万宁市",
    "county": [{
      "countyCode": "469006-1",
      "countyName": "万宁市" }] },

  {
    "cityCode": "469029",
    "cityName": "保亭黎族苗族自治县",
    "county": [{
      "countyCode": "469029-1",
      "countyName": "保亭黎族苗族自治县" }] },

  {
    "cityCode": "469003",
    "cityName": "儋州市",
    "county": [{
      "countyCode": "469003-1",
      "countyName": "儋州市" }] },

  {
    "cityCode": "469023",
    "cityName": "澄迈县",
    "county": [{
      "countyCode": "469023-1",
      "countyName": "澄迈县" }] },

  {
    "cityCode": "469022",
    "cityName": "屯昌县",
    "county": [{
      "countyCode": "469022-1",
      "countyName": "屯昌县" }] },

  {
    "cityCode": "469028",
    "cityName": "陵水黎族自治县",
    "county": [{
      "countyCode": "469028-1",
      "countyName": "陵水黎族自治县" }] },

  {
    "cityCode": "469007",
    "cityName": "东方市",
    "county": [{
      "countyCode": "469007-1",
      "countyName": "东方市" }] },

  {
    "cityCode": "469001",
    "cityName": "五指山市",
    "county": [{
      "countyCode": "469001-1",
      "countyName": "五指山市" }] },

  {
    "cityCode": "469025",
    "cityName": "白沙黎族自治县",
    "county": [{
      "countyCode": "469025-1",
      "countyName": "白沙黎族自治县" }] },

  {
    "cityCode": "469026",
    "cityName": "昌江黎族自治县",
    "county": [{
      "countyCode": "469026-1",
      "countyName": "昌江黎族自治县" }] },

  {
    "cityCode": "469024",
    "cityName": "临高县",
    "county": [{
      "countyCode": "469024-1",
      "countyName": "临高县" }] },

  {
    "cityCode": "469030",
    "cityName": "琼中黎族苗族自治县",
    "county": [{
      "countyCode": "469030-1",
      "countyName": "琼中黎族苗族自治县" }] }] },


{
  "provinceCode": "500000",
  "provinceName": "重庆",
  "city": [{
    "cityCode": "500000-1",
    "cityName": "重庆市",
    "county": [{
      "countyCode": "500108",
      "countyName": "南岸区" },
    {
      "countyCode": "500101",
      "countyName": "万州区" },
    {
      "countyCode": "500103",
      "countyName": "渝中区" },
    {
      "countyCode": "500106",
      "countyName": "沙坪坝区" },
    {
      "countyCode": "500102",
      "countyName": "涪陵区" },
    {
      "countyCode": "500226",
      "countyName": "荣昌区" },
    {
      "countyCode": "500223",
      "countyName": "潼南区" },
    {
      "countyCode": "500242",
      "countyName": "酉阳土家族苗族自治县" },
    {
      "countyCode": "500232",
      "countyName": "武隆区" },
    {
      "countyCode": "500113",
      "countyName": "巴南区" },
    {
      "countyCode": "500109",
      "countyName": "北碚区" },
    {
      "countyCode": "500104",
      "countyName": "大渡口区" },
    {
      "countyCode": "500117",
      "countyName": "合川区" },
    {
      "countyCode": "500112",
      "countyName": "渝北区" },
    {
      "countyCode": "500116",
      "countyName": "江津区" },
    {
      "countyCode": "500228",
      "countyName": "梁平区" },
    {
      "countyCode": "500119",
      "countyName": "南川区" },
    {
      "countyCode": "500110",
      "countyName": "綦江区" },
    {
      "countyCode": "500227",
      "countyName": "璧山区" },
    {
      "countyCode": "500115",
      "countyName": "长寿区" },
    {
      "countyCode": "500231",
      "countyName": "垫江县" },
    {
      "countyCode": "500230",
      "countyName": "丰都县" },
    {
      "countyCode": "500224",
      "countyName": "铜梁区" },
    {
      "countyCode": "500243",
      "countyName": "彭水苗族土家族自治县" },
    {
      "countyCode": "500105",
      "countyName": "江北区" },
    {
      "countyCode": "500107",
      "countyName": "九龙坡区" },
    {
      "countyCode": "500236",
      "countyName": "奉节县" },
    {
      "countyCode": "500111",
      "countyName": "大足区" },
    {
      "countyCode": "500234",
      "countyName": "开州区" },
    {
      "countyCode": "500241",
      "countyName": "秀山土家族苗族自治县" },
    {
      "countyCode": "500229",
      "countyName": "城口县" },
    {
      "countyCode": "500238",
      "countyName": "巫溪县" },
    {
      "countyCode": "500118",
      "countyName": "永川区" },
    {
      "countyCode": "500233",
      "countyName": "忠县" },
    {
      "countyCode": "500240",
      "countyName": "石柱土家族自治县" },
    {
      "countyCode": "500114",
      "countyName": "黔江区" },
    {
      "countyCode": "500237",
      "countyName": "巫山县" },
    {
      "countyCode": "500235",
      "countyName": "云阳县" }] }] },


{
  "provinceCode": "510000",
  "provinceName": "四川省",
  "city": [{
    "cityCode": "511300",
    "cityName": "南充市",
    "county": [{
      "countyCode": "511304",
      "countyName": "嘉陵区" },
    {
      "countyCode": "511323",
      "countyName": "蓬安县" },
    {
      "countyCode": "511322",
      "countyName": "营山县" },
    {
      "countyCode": "511381",
      "countyName": "阆中市" },
    {
      "countyCode": "511303",
      "countyName": "高坪区" },
    {
      "countyCode": "511324",
      "countyName": "仪陇县" },
    {
      "countyCode": "511302",
      "countyName": "顺庆区" },
    {
      "countyCode": "511321",
      "countyName": "南部县" },
    {
      "countyCode": "511325",
      "countyName": "西充县" }] },

  {
    "cityCode": "511800",
    "cityName": "雅安市",
    "county": [{
      "countyCode": "511826",
      "countyName": "芦山县" },
    {
      "countyCode": "511824",
      "countyName": "石棉县" },
    {
      "countyCode": "511803",
      "countyName": "名山区" },
    {
      "countyCode": "511827",
      "countyName": "宝兴县" },
    {
      "countyCode": "511802",
      "countyName": "雨城区" },
    {
      "countyCode": "511823",
      "countyName": "汉源县" },
    {
      "countyCode": "511825",
      "countyName": "天全县" },
    {
      "countyCode": "511822",
      "countyName": "荥经县" }] },

  {
    "cityCode": "513400",
    "cityName": "凉山彝族自治州",
    "county": [{
      "countyCode": "513427",
      "countyName": "宁南县" },
    {
      "countyCode": "513432",
      "countyName": "喜德县" },
    {
      "countyCode": "513431",
      "countyName": "昭觉县" },
    {
      "countyCode": "513401",
      "countyName": "西昌市" },
    {
      "countyCode": "513437",
      "countyName": "雷波县" },
    {
      "countyCode": "513433",
      "countyName": "冕宁县" },
    {
      "countyCode": "513434",
      "countyName": "越西县" },
    {
      "countyCode": "513435",
      "countyName": "甘洛县" },
    {
      "countyCode": "513429",
      "countyName": "布拖县" },
    {
      "countyCode": "513430",
      "countyName": "金阳县" },
    {
      "countyCode": "513436",
      "countyName": "美姑县" },
    {
      "countyCode": "513428",
      "countyName": "普格县" },
    {
      "countyCode": "513424",
      "countyName": "德昌县" },
    {
      "countyCode": "513425",
      "countyName": "会理县" },
    {
      "countyCode": "513423",
      "countyName": "盐源县" },
    {
      "countyCode": "513426",
      "countyName": "会东县" },
    {
      "countyCode": "513422",
      "countyName": "木里藏族自治县" }] },

  {
    "cityCode": "511400",
    "cityName": "眉山市",
    "county": [{
      "countyCode": "511422",
      "countyName": "彭山区" },
    {
      "countyCode": "511424",
      "countyName": "丹棱县" },
    {
      "countyCode": "511425",
      "countyName": "青神县" },
    {
      "countyCode": "511402",
      "countyName": "东坡区" },
    {
      "countyCode": "511423",
      "countyName": "洪雅县" },
    {
      "countyCode": "511421",
      "countyName": "仁寿县" }] },

  {
    "cityCode": "510300",
    "cityName": "自贡市",
    "county": [{
      "countyCode": "510304",
      "countyName": "大安区" },
    {
      "countyCode": "510302",
      "countyName": "自流井区" },
    {
      "countyCode": "510321",
      "countyName": "荣县" },
    {
      "countyCode": "510303",
      "countyName": "贡井区" },
    {
      "countyCode": "510322",
      "countyName": "富顺县" },
    {
      "countyCode": "510311",
      "countyName": "沿滩区" }] },

  {
    "cityCode": "511900",
    "cityName": "巴中市",
    "county": [{
      "countyCode": "511903",
      "countyName": "恩阳区" },
    {
      "countyCode": "511921",
      "countyName": "通江县" },
    {
      "countyCode": "511922",
      "countyName": "南江县" },
    {
      "countyCode": "511902",
      "countyName": "巴州区" },
    {
      "countyCode": "511923",
      "countyName": "平昌县" }] },

  {
    "cityCode": "513300",
    "cityName": "甘孜藏族自治州",
    "county": [{
      "countyCode": "513328",
      "countyName": "甘孜县" },
    {
      "countyCode": "513324",
      "countyName": "九龙县" },
    {
      "countyCode": "513332",
      "countyName": "石渠县" },
    {
      "countyCode": "513337",
      "countyName": "稻城县" },
    {
      "countyCode": "513326",
      "countyName": "道孚县" },
    {
      "countyCode": "513330",
      "countyName": "德格县" },
    {
      "countyCode": "513336",
      "countyName": "乡城县" },
    {
      "countyCode": "513325",
      "countyName": "雅江县" },
    {
      "countyCode": "513334",
      "countyName": "理塘县" },
    {
      "countyCode": "513329",
      "countyName": "新龙县" },
    {
      "countyCode": "513338",
      "countyName": "得荣县" },
    {
      "countyCode": "513331",
      "countyName": "白玉县" },
    {
      "countyCode": "513323",
      "countyName": "丹巴县" },
    {
      "countyCode": "513327",
      "countyName": "炉霍县" },
    {
      "countyCode": "513335",
      "countyName": "巴塘县" },
    {
      "countyCode": "513321",
      "countyName": "康定市" },
    {
      "countyCode": "513333",
      "countyName": "色达县" },
    {
      "countyCode": "513322",
      "countyName": "泸定县" }] },

  {
    "cityCode": "511700",
    "cityName": "达州市",
    "county": [{
      "countyCode": "511722",
      "countyName": "宣汉县" },
    {
      "countyCode": "511781",
      "countyName": "万源市" },
    {
      "countyCode": "511724",
      "countyName": "大竹县" },
    {
      "countyCode": "511723",
      "countyName": "开江县" },
    {
      "countyCode": "511721",
      "countyName": "达川区" },
    {
      "countyCode": "511702",
      "countyName": "通川区" },
    {
      "countyCode": "511725",
      "countyName": "渠县" }] },

  {
    "cityCode": "510500",
    "cityName": "泸州市",
    "county": [{
      "countyCode": "510524",
      "countyName": "叙永县" },
    {
      "countyCode": "510521",
      "countyName": "泸县" },
    {
      "countyCode": "510502",
      "countyName": "江阳区" },
    {
      "countyCode": "510504",
      "countyName": "龙马潭区" },
    {
      "countyCode": "510525",
      "countyName": "古蔺县" },
    {
      "countyCode": "510522",
      "countyName": "合江县" },
    {
      "countyCode": "510503",
      "countyName": "纳溪区" }] },

  {
    "cityCode": "510800",
    "cityName": "广元市",
    "county": [{
      "countyCode": "510802",
      "countyName": "利州区" },
    {
      "countyCode": "510811",
      "countyName": "昭化区" },
    {
      "countyCode": "510824",
      "countyName": "苍溪县" },
    {
      "countyCode": "510812",
      "countyName": "朝天区" },
    {
      "countyCode": "510823",
      "countyName": "剑阁县" },
    {
      "countyCode": "510821",
      "countyName": "旺苍县" },
    {
      "countyCode": "510822",
      "countyName": "青川县" }] },

  {
    "cityCode": "512000",
    "cityName": "资阳市",
    "county": [{
      "countyCode": "512022",
      "countyName": "乐至县" },
    {
      "countyCode": "512021",
      "countyName": "安岳县" },
    {
      "countyCode": "512002",
      "countyName": "雁江区" }] },

  {
    "cityCode": "510400",
    "cityName": "攀枝花市",
    "county": [{
      "countyCode": "510411",
      "countyName": "仁和区" },
    {
      "countyCode": "510422",
      "countyName": "盐边县" },
    {
      "countyCode": "510403",
      "countyName": "西区" },
    {
      "countyCode": "510421",
      "countyName": "米易县" },
    {
      "countyCode": "510402",
      "countyName": "东区" }] },

  {
    "cityCode": "510100",
    "cityName": "成都市",
    "county": [{
      "countyCode": "510115",
      "countyName": "温江区" },
    {
      "countyCode": "510105",
      "countyName": "青羊区" },
    {
      "countyCode": "510124",
      "countyName": "郫都区" },
    {
      "countyCode": "510122",
      "countyName": "双流区" },
    {
      "countyCode": "510129",
      "countyName": "大邑县" },
    {
      "countyCode": "510106",
      "countyName": "金牛区" },
    {
      "countyCode": "510112",
      "countyName": "龙泉驿区" },
    {
      "countyCode": "512081",
      "countyName": "简阳市" },
    {
      "countyCode": "510181",
      "countyName": "都江堰市" },
    {
      "countyCode": "510108",
      "countyName": "成华区" },
    {
      "countyCode": "510132",
      "countyName": "新津县" },
    {
      "countyCode": "510113",
      "countyName": "青白江区" },
    {
      "countyCode": "510182",
      "countyName": "彭州市" },
    {
      "countyCode": "510114",
      "countyName": "新都区" },
    {
      "countyCode": "510184",
      "countyName": "崇州市" },
    {
      "countyCode": "510121",
      "countyName": "金堂县" },
    {
      "countyCode": "510107",
      "countyName": "武侯区" },
    {
      "countyCode": "510104",
      "countyName": "锦江区" },
    {
      "countyCode": "510131",
      "countyName": "蒲江县" },
    {
      "countyCode": "510183",
      "countyName": "邛崃市" }] },

  {
    "cityCode": "511100",
    "cityName": "乐山市",
    "county": [{
      "countyCode": "511132",
      "countyName": "峨边彝族自治县" },
    {
      "countyCode": "511113",
      "countyName": "金口河区" },
    {
      "countyCode": "511111",
      "countyName": "沙湾区" },
    {
      "countyCode": "511181",
      "countyName": "峨眉山市" },
    {
      "countyCode": "511126",
      "countyName": "夹江县" },
    {
      "countyCode": "511102",
      "countyName": "市中区" },
    {
      "countyCode": "511112",
      "countyName": "五通桥区" },
    {
      "countyCode": "511124",
      "countyName": "井研县" },
    {
      "countyCode": "511129",
      "countyName": "沐川县" },
    {
      "countyCode": "511123",
      "countyName": "犍为县" },
    {
      "countyCode": "511133",
      "countyName": "马边彝族自治县" }] },

  {
    "cityCode": "510700",
    "cityName": "绵阳市",
    "county": [{
      "countyCode": "510724",
      "countyName": "安州区" },
    {
      "countyCode": "510725",
      "countyName": "梓潼县" },
    {
      "countyCode": "510781",
      "countyName": "江油市" },
    {
      "countyCode": "510704",
      "countyName": "游仙区" },
    {
      "countyCode": "510727",
      "countyName": "平武县" },
    {
      "countyCode": "510723",
      "countyName": "盐亭县" },
    {
      "countyCode": "510703",
      "countyName": "涪城区" },
    {
      "countyCode": "510722",
      "countyName": "三台县" },
    {
      "countyCode": "510726",
      "countyName": "北川羌族自治县" }] },

  {
    "cityCode": "511600",
    "cityName": "广安市",
    "county": [{
      "countyCode": "511623",
      "countyName": "邻水县" },
    {
      "countyCode": "511622",
      "countyName": "武胜县" },
    {
      "countyCode": "511603000000",
      "countyName": "前锋区" },
    {
      "countyCode": "511602",
      "countyName": "广安区" },
    {
      "countyCode": "511621",
      "countyName": "岳池县" },
    {
      "countyCode": "511681",
      "countyName": "华蓥市" }] },

  {
    "cityCode": "511500",
    "cityName": "宜宾市",
    "county": [{
      "countyCode": "511523",
      "countyName": "江安县" },
    {
      "countyCode": "511521",
      "countyName": "叙州区" },
    {
      "countyCode": "511525",
      "countyName": "高县" },
    {
      "countyCode": "511529",
      "countyName": "屏山县" },
    {
      "countyCode": "511528",
      "countyName": "兴文县" },
    {
      "countyCode": "511502",
      "countyName": "翠屏区" },
    {
      "countyCode": "511527",
      "countyName": "筠连县" },
    {
      "countyCode": "511524",
      "countyName": "长宁县" },
    {
      "countyCode": "511526",
      "countyName": "珙县" },
    {
      "countyCode": "511503",
      "countyName": "南溪区" }] },

  {
    "cityCode": "511000",
    "cityName": "内江市",
    "county": [{
      "countyCode": "511024",
      "countyName": "威远县" },
    {
      "countyCode": "511002",
      "countyName": "市中区" },
    {
      "countyCode": "511011",
      "countyName": "东兴区" },
    {
      "countyCode": "511028",
      "countyName": "隆昌市" },
    {
      "countyCode": "511025",
      "countyName": "资中县" }] },

  {
    "cityCode": "513200",
    "cityName": "阿坝藏族羌族自治州",
    "county": [{
      "countyCode": "513230",
      "countyName": "壤塘县" },
    {
      "countyCode": "513225",
      "countyName": "九寨沟县" },
    {
      "countyCode": "513223",
      "countyName": "茂县" },
    {
      "countyCode": "513226",
      "countyName": "金川县" },
    {
      "countyCode": "513227",
      "countyName": "小金县" },
    {
      "countyCode": "513233",
      "countyName": "红原县" },
    {
      "countyCode": "513222",
      "countyName": "理县" },
    {
      "countyCode": "513232",
      "countyName": "若尔盖县" },
    {
      "countyCode": "513221",
      "countyName": "汶川县" },
    {
      "countyCode": "513228",
      "countyName": "黑水县" },
    {
      "countyCode": "513229",
      "countyName": "马尔康市" },
    {
      "countyCode": "513231",
      "countyName": "阿坝县" },
    {
      "countyCode": "513224",
      "countyName": "松潘县" }] },

  {
    "cityCode": "510900",
    "cityName": "遂宁市",
    "county": [{
      "countyCode": "510904",
      "countyName": "安居区" },
    {
      "countyCode": "510923",
      "countyName": "大英县" },
    {
      "countyCode": "510922",
      "countyName": "射洪县" },
    {
      "countyCode": "510903",
      "countyName": "船山区" },
    {
      "countyCode": "510921",
      "countyName": "蓬溪县" }] },

  {
    "cityCode": "510600",
    "cityName": "德阳市",
    "county": [{
      "countyCode": "510682",
      "countyName": "什邡市" },
    {
      "countyCode": "510683",
      "countyName": "绵竹市" },
    {
      "countyCode": "510623",
      "countyName": "中江县" },
    {
      "countyCode": "510681",
      "countyName": "广汉市" },
    {
      "countyCode": "510626",
      "countyName": "罗江区" },
    {
      "countyCode": "510603",
      "countyName": "旌阳区" }] }] },


{
  "provinceCode": "520000",
  "provinceName": "贵州省",
  "city": [{
    "cityCode": "520100",
    "cityName": "贵阳市",
    "county": [{
      "countyCode": "520103",
      "countyName": "云岩区" },
    {
      "countyCode": "520123",
      "countyName": "修文县" },
    {
      "countyCode": "520121",
      "countyName": "开阳县" },
    {
      "countyCode": "520114",
      "countyName": "小河区" },
    {
      "countyCode": "520122",
      "countyName": "息烽县" },
    {
      "countyCode": "520113",
      "countyName": "白云区" },
    {
      "countyCode": "520115",
      "countyName": "观山湖区" },
    {
      "countyCode": "520102",
      "countyName": "南明区" },
    {
      "countyCode": "520181",
      "countyName": "清镇市" },
    {
      "countyCode": "520112",
      "countyName": "乌当区" },
    {
      "countyCode": "520111",
      "countyName": "花溪区" }] },

  {
    "cityCode": "520300",
    "cityName": "遵义市",
    "county": [{
      "countyCode": "520381",
      "countyName": "赤水市" },
    {
      "countyCode": "520329",
      "countyName": "余庆县" },
    {
      "countyCode": "520325",
      "countyName": "道真仡佬族苗族自治县" },
    {
      "countyCode": "520326",
      "countyName": "务川仡佬族苗族自治县" },
    {
      "countyCode": "520328",
      "countyName": "湄潭县" },
    {
      "countyCode": "520327",
      "countyName": "凤冈县" },
    {
      "countyCode": "520302",
      "countyName": "红花岗区" },
    {
      "countyCode": "520382",
      "countyName": "仁怀市" },
    {
      "countyCode": "520321",
      "countyName": "播州区" },
    {
      "countyCode": "520330",
      "countyName": "习水县" },
    {
      "countyCode": "520324",
      "countyName": "正安县" },
    {
      "countyCode": "520303",
      "countyName": "汇川区" },
    {
      "countyCode": "520323",
      "countyName": "绥阳县" },
    {
      "countyCode": "520322",
      "countyName": "桐梓县" }] },

  {
    "cityCode": "522700",
    "cityName": "黔南布依族苗族自治州",
    "county": [{
      "countyCode": "522722",
      "countyName": "荔波县" },
    {
      "countyCode": "522725",
      "countyName": "瓮安县" },
    {
      "countyCode": "522702",
      "countyName": "福泉市" },
    {
      "countyCode": "522728",
      "countyName": "罗甸县" },
    {
      "countyCode": "522723",
      "countyName": "贵定县" },
    {
      "countyCode": "522701",
      "countyName": "都匀市" },
    {
      "countyCode": "522726",
      "countyName": "独山县" },
    {
      "countyCode": "522731",
      "countyName": "惠水县" },
    {
      "countyCode": "522732",
      "countyName": "三都水族自治县" },
    {
      "countyCode": "522727",
      "countyName": "平塘县" },
    {
      "countyCode": "522729",
      "countyName": "长顺县" },
    {
      "countyCode": "522730",
      "countyName": "龙里县" }] },

  {
    "cityCode": "520200",
    "cityName": "六盘水市",
    "county": [{
      "countyCode": "520222",
      "countyName": "盘州市" },
    {
      "countyCode": "520203",
      "countyName": "六枝特区" },
    {
      "countyCode": "520201",
      "countyName": "钟山区" },
    {
      "countyCode": "520221",
      "countyName": "水城县" }] },

  {
    "cityCode": "520400",
    "cityName": "安顺市",
    "county": [{
      "countyCode": "520424",
      "countyName": "关岭布依族苗族自治县" },
    {
      "countyCode": "520423",
      "countyName": "镇宁布依族苗族自治县" },
    {
      "countyCode": "520422",
      "countyName": "普定县" },
    {
      "countyCode": "520421",
      "countyName": "平坝区" },
    {
      "countyCode": "520425",
      "countyName": "紫云苗族布依族自治县" },
    {
      "countyCode": "520402",
      "countyName": "西秀区" }] },

  {
    "cityCode": "520500",
    "cityName": "毕节市",
    "county": [{
      "countyCode": "520523",
      "countyName": "金沙县" },
    {
      "countyCode": "520524",
      "countyName": "织金县" },
    {
      "countyCode": "520525",
      "countyName": "纳雍县" },
    {
      "countyCode": "520522",
      "countyName": "黔西县" },
    {
      "countyCode": "520526",
      "countyName": "威宁彝族回族苗族自治县" },
    {
      "countyCode": "520527",
      "countyName": "赫章县" },
    {
      "countyCode": "520521",
      "countyName": "大方县" },
    {
      "countyCode": "520502",
      "countyName": "七星关区" }] },

  {
    "cityCode": "522600",
    "cityName": "黔东南苗族侗族自治州",
    "county": [{
      "countyCode": "522626",
      "countyName": "岑巩县" },
    {
      "countyCode": "522630",
      "countyName": "台江县" },
    {
      "countyCode": "522624",
      "countyName": "三穗县" },
    {
      "countyCode": "522625",
      "countyName": "镇远县" },
    {
      "countyCode": "522636",
      "countyName": "丹寨县" },
    {
      "countyCode": "522633",
      "countyName": "从江县" },
    {
      "countyCode": "522634",
      "countyName": "雷山县" },
    {
      "countyCode": "522623",
      "countyName": "施秉县" },
    {
      "countyCode": "522629",
      "countyName": "剑河县" },
    {
      "countyCode": "522628",
      "countyName": "锦屏县" },
    {
      "countyCode": "522632",
      "countyName": "榕江县" },
    {
      "countyCode": "522631",
      "countyName": "黎平县" },
    {
      "countyCode": "522627",
      "countyName": "天柱县" },
    {
      "countyCode": "522622",
      "countyName": "黄平县" },
    {
      "countyCode": "522635",
      "countyName": "麻江县" },
    {
      "countyCode": "522601",
      "countyName": "凯里市" }] },

  {
    "cityCode": "522300",
    "cityName": "黔西南布依族苗族自治州",
    "county": [{
      "countyCode": "522326",
      "countyName": "望谟县" },
    {
      "countyCode": "522327",
      "countyName": "册亨县" },
    {
      "countyCode": "522323",
      "countyName": "普安县" },
    {
      "countyCode": "522322",
      "countyName": "兴仁县" },
    {
      "countyCode": "522301",
      "countyName": "兴义市" },
    {
      "countyCode": "522328",
      "countyName": "安龙县" },
    {
      "countyCode": "522324",
      "countyName": "晴隆县" },
    {
      "countyCode": "522325",
      "countyName": "贞丰县" }] },

  {
    "cityCode": "520600",
    "cityName": "铜仁市",
    "county": [{
      "countyCode": "520602",
      "countyName": "碧江区" },
    {
      "countyCode": "520622",
      "countyName": "玉屏侗族自治县" },
    {
      "countyCode": "520603",
      "countyName": "万山区" },
    {
      "countyCode": "520627",
      "countyName": "沿河土家族自治县" },
    {
      "countyCode": "520624",
      "countyName": "思南县" },
    {
      "countyCode": "520626",
      "countyName": "德江县" },
    {
      "countyCode": "520628",
      "countyName": "松桃苗族自治县" },
    {
      "countyCode": "520621",
      "countyName": "江口县" },
    {
      "countyCode": "520623",
      "countyName": "石阡县" },
    {
      "countyCode": "520625",
      "countyName": "印江土家族苗族自治县" }] }] },


{
  "provinceCode": "530000",
  "provinceName": "云南省",
  "city": [{
    "cityCode": "530400",
    "cityName": "玉溪市",
    "county": [{
      "countyCode": "530425",
      "countyName": "易门县" },
    {
      "countyCode": "530423",
      "countyName": "通海县" },
    {
      "countyCode": "530421",
      "countyName": "江川区" },
    {
      "countyCode": "530424",
      "countyName": "华宁县" },
    {
      "countyCode": "530426",
      "countyName": "峨山彝族自治县" },
    {
      "countyCode": "530402",
      "countyName": "红塔区" },
    {
      "countyCode": "530422",
      "countyName": "澄江县" },
    {
      "countyCode": "530427",
      "countyName": "新平彝族傣族自治县" },
    {
      "countyCode": "530428",
      "countyName": "元江哈尼族彝族傣族自治县" }] },

  {
    "cityCode": "533100",
    "cityName": "德宏傣族景颇族自治州",
    "county": [{
      "countyCode": "533124",
      "countyName": "陇川县" },
    {
      "countyCode": "533122",
      "countyName": "梁河县" },
    {
      "countyCode": "533123",
      "countyName": "盈江县" },
    {
      "countyCode": "533103",
      "countyName": "芒市" },
    {
      "countyCode": "533102",
      "countyName": "瑞丽市" }] },

  {
    "cityCode": "532900",
    "cityName": "大理白族自治州",
    "county": [{
      "countyCode": "532927",
      "countyName": "巍山彝族回族自治县" },
    {
      "countyCode": "532931",
      "countyName": "剑川县" },
    {
      "countyCode": "532923",
      "countyName": "祥云县" },
    {
      "countyCode": "532932",
      "countyName": "鹤庆县" },
    {
      "countyCode": "532928",
      "countyName": "永平县" },
    {
      "countyCode": "532929",
      "countyName": "云龙县" },
    {
      "countyCode": "532930",
      "countyName": "洱源县" },
    {
      "countyCode": "532924",
      "countyName": "宾川县" },
    {
      "countyCode": "532925",
      "countyName": "弥渡县" },
    {
      "countyCode": "532926",
      "countyName": "南涧彝族自治县" },
    {
      "countyCode": "532901",
      "countyName": "大理市" },
    {
      "countyCode": "532922",
      "countyName": "漾濞彝族自治县" }] },

  {
    "cityCode": "530100",
    "cityName": "昆明市",
    "county": [{
      "countyCode": "530124",
      "countyName": "富民县" },
    {
      "countyCode": "530114",
      "countyName": "呈贡区" },
    {
      "countyCode": "530126",
      "countyName": "石林彝族自治县" },
    {
      "countyCode": "530181",
      "countyName": "安宁市" },
    {
      "countyCode": "530128",
      "countyName": "禄劝彝族苗族自治县" },
    {
      "countyCode": "530125",
      "countyName": "宜良县" },
    {
      "countyCode": "530103",
      "countyName": "盘龙区" },
    {
      "countyCode": "530102",
      "countyName": "五华区" },
    {
      "countyCode": "530122",
      "countyName": "晋宁区" },
    {
      "countyCode": "530113",
      "countyName": "东川区" },
    {
      "countyCode": "530111",
      "countyName": "官渡区" },
    {
      "countyCode": "530127",
      "countyName": "嵩明县" },
    {
      "countyCode": "530112",
      "countyName": "西山区" },
    {
      "countyCode": "530129",
      "countyName": "寻甸回族彝族自治县" }] },

  {
    "cityCode": "530900",
    "cityName": "临沧市",
    "county": [{
      "countyCode": "530921",
      "countyName": "凤庆县" },
    {
      "countyCode": "530926",
      "countyName": "耿马傣族佤族自治县" },
    {
      "countyCode": "530922",
      "countyName": "云县" },
    {
      "countyCode": "530924",
      "countyName": "镇康县" },
    {
      "countyCode": "530923",
      "countyName": "永德县" },
    {
      "countyCode": "530927",
      "countyName": "沧源佤族自治县" },
    {
      "countyCode": "530925",
      "countyName": "双江拉祜族佤族布朗族傣族自治县" },
    {
      "countyCode": "530902",
      "countyName": "临翔区" }] },

  {
    "cityCode": "532300",
    "cityName": "楚雄彝族自治州",
    "county": [{
      "countyCode": "532329",
      "countyName": "武定县" },
    {
      "countyCode": "532324",
      "countyName": "南华县" },
    {
      "countyCode": "532327",
      "countyName": "永仁县" },
    {
      "countyCode": "532328",
      "countyName": "元谋县" },
    {
      "countyCode": "532331",
      "countyName": "禄丰县" },
    {
      "countyCode": "532326",
      "countyName": "大姚县" },
    {
      "countyCode": "532325",
      "countyName": "姚安县" },
    {
      "countyCode": "532301",
      "countyName": "楚雄市" },
    {
      "countyCode": "532323",
      "countyName": "牟定县" },
    {
      "countyCode": "532322",
      "countyName": "双柏县" }] },

  {
    "cityCode": "532800",
    "cityName": "西双版纳傣族自治州",
    "county": [{
      "countyCode": "532823",
      "countyName": "勐腊县" },
    {
      "countyCode": "532801",
      "countyName": "景洪市" },
    {
      "countyCode": "532822",
      "countyName": "勐海县" }] },

  {
    "cityCode": "532600",
    "cityName": "文山壮族苗族自治州",
    "county": [{
      "countyCode": "532601",
      "countyName": "文山市" },
    {
      "countyCode": "532623",
      "countyName": "西畴县" },
    {
      "countyCode": "532627",
      "countyName": "广南县" },
    {
      "countyCode": "532625",
      "countyName": "马关县" },
    {
      "countyCode": "532622",
      "countyName": "砚山县" },
    {
      "countyCode": "532628",
      "countyName": "富宁县" },
    {
      "countyCode": "532624",
      "countyName": "麻栗坡县" },
    {
      "countyCode": "532626",
      "countyName": "丘北县" }] },

  {
    "cityCode": "530300",
    "cityName": "曲靖市",
    "county": [{
      "countyCode": "530302",
      "countyName": "麒麟区" },
    {
      "countyCode": "530325",
      "countyName": "富源县" },
    {
      "countyCode": "530326",
      "countyName": "会泽县" },
    {
      "countyCode": "530324",
      "countyName": "罗平县" },
    {
      "countyCode": "530328",
      "countyName": "沾益区" },
    {
      "countyCode": "530323",
      "countyName": "师宗县" },
    {
      "countyCode": "530321",
      "countyName": "马龙区" },
    {
      "countyCode": "530322",
      "countyName": "陆良县" },
    {
      "countyCode": "530381",
      "countyName": "宣威市" }] },

  {
    "cityCode": "533400",
    "cityName": "迪庆藏族自治州",
    "county": [{
      "countyCode": "533421",
      "countyName": "香格里拉市" },
    {
      "countyCode": "533422",
      "countyName": "德钦县" },
    {
      "countyCode": "533423",
      "countyName": "维西傈僳族自治县" }] },

  {
    "cityCode": "530600",
    "cityName": "昭通市",
    "county": [{
      "countyCode": "530629",
      "countyName": "威信县" },
    {
      "countyCode": "530624",
      "countyName": "大关县" },
    {
      "countyCode": "530630",
      "countyName": "水富县" },
    {
      "countyCode": "530626",
      "countyName": "绥江县" },
    {
      "countyCode": "530628",
      "countyName": "彝良县" },
    {
      "countyCode": "530623",
      "countyName": "盐津县" },
    {
      "countyCode": "530602",
      "countyName": "昭阳区" },
    {
      "countyCode": "530621",
      "countyName": "鲁甸县" },
    {
      "countyCode": "530627",
      "countyName": "镇雄县" },
    {
      "countyCode": "530625",
      "countyName": "永善县" },
    {
      "countyCode": "530622",
      "countyName": "巧家县" }] },

  {
    "cityCode": "533300",
    "cityName": "怒江傈僳族自治州",
    "county": [{
      "countyCode": "533323",
      "countyName": "福贡县" },
    {
      "countyCode": "533324",
      "countyName": "贡山独龙族怒族自治县" },
    {
      "countyCode": "533321",
      "countyName": "泸水市" },
    {
      "countyCode": "533325",
      "countyName": "兰坪白族普米族自治县" }] },

  {
    "cityCode": "530700",
    "cityName": "丽江市",
    "county": [{
      "countyCode": "530724",
      "countyName": "宁蒗彝族自治县" },
    {
      "countyCode": "530722",
      "countyName": "永胜县" },
    {
      "countyCode": "530702",
      "countyName": "古城区" },
    {
      "countyCode": "530721",
      "countyName": "玉龙纳西族自治县" },
    {
      "countyCode": "530723",
      "countyName": "华坪县" }] },

  {
    "cityCode": "530800",
    "cityName": "普洱市",
    "county": [{
      "countyCode": "530822",
      "countyName": "墨江哈尼族自治县" },
    {
      "countyCode": "530823",
      "countyName": "景东彝族自治县" },
    {
      "countyCode": "530827",
      "countyName": "孟连傣族拉祜族佤族自治县" },
    {
      "countyCode": "530825",
      "countyName": "镇沅彝族哈尼族拉祜族自治县" },
    {
      "countyCode": "530828",
      "countyName": "澜沧拉祜族自治县" },
    {
      "countyCode": "530829",
      "countyName": "西盟佤族自治县" },
    {
      "countyCode": "530821",
      "countyName": "宁洱哈尼族彝族自治县" },
    {
      "countyCode": "530802",
      "countyName": "思茅区" },
    {
      "countyCode": "530826",
      "countyName": "江城哈尼族彝族自治县" },
    {
      "countyCode": "530824",
      "countyName": "景谷傣族彝族自治县" }] },

  {
    "cityCode": "532500",
    "cityName": "红河哈尼族彝族自治州",
    "county": [{
      "countyCode": "532525",
      "countyName": "石屏县" },
    {
      "countyCode": "532530",
      "countyName": "金平苗族瑶族傣族自治县" },
    {
      "countyCode": "532503",
      "countyName": "蒙自市" },
    {
      "countyCode": "532528",
      "countyName": "元阳县" },
    {
      "countyCode": "532527",
      "countyName": "泸西县" },
    {
      "countyCode": "532502",
      "countyName": "开远市" },
    {
      "countyCode": "532524",
      "countyName": "建水县" },
    {
      "countyCode": "532532",
      "countyName": "河口瑶族自治县" },
    {
      "countyCode": "532529",
      "countyName": "红河县" },
    {
      "countyCode": "532531",
      "countyName": "绿春县" },
    {
      "countyCode": "532501",
      "countyName": "个旧市" },
    {
      "countyCode": "532523",
      "countyName": "屏边苗族自治县" },
    {
      "countyCode": "532526",
      "countyName": "弥勒市" }] },

  {
    "cityCode": "530500",
    "cityName": "保山市",
    "county": [{
      "countyCode": "530523",
      "countyName": "龙陵县" },
    {
      "countyCode": "530522",
      "countyName": "腾冲市" },
    {
      "countyCode": "530521",
      "countyName": "施甸县" },
    {
      "countyCode": "530502",
      "countyName": "隆阳区" },
    {
      "countyCode": "530524",
      "countyName": "昌宁县" }] }] },


{
  "provinceCode": "540000",
  "provinceName": "西藏自治区",
  "city": [{
    "cityCode": "542100",
    "cityName": "昌都市",
    "county": [{
      "countyCode": "542122",
      "countyName": "江达县" },
    {
      "countyCode": "542129",
      "countyName": "芒康县" },
    {
      "countyCode": "542128",
      "countyName": "左贡县" },
    {
      "countyCode": "542126",
      "countyName": "察雅县" },
    {
      "countyCode": "542132",
      "countyName": "洛隆县" },
    {
      "countyCode": "542121",
      "countyName": "卡若区" },
    {
      "countyCode": "542125",
      "countyName": "丁青县" },
    {
      "countyCode": "542133",
      "countyName": "边坝县" },
    {
      "countyCode": "542123",
      "countyName": "贡觉县" },
    {
      "countyCode": "542127",
      "countyName": "八宿县" },
    {
      "countyCode": "542124",
      "countyName": "类乌齐县" }] },

  {
    "cityCode": "542200",
    "cityName": "山南市",
    "county": [{
      "countyCode": "542229",
      "countyName": "加查县" },
    {
      "countyCode": "542225",
      "countyName": "琼结县" },
    {
      "countyCode": "542232",
      "countyName": "错那县" },
    {
      "countyCode": "542221",
      "countyName": "乃东区" },
    {
      "countyCode": "542224",
      "countyName": "桑日县" },
    {
      "countyCode": "542222",
      "countyName": "扎囊县" },
    {
      "countyCode": "542227",
      "countyName": "措美县" },
    {
      "countyCode": "542223",
      "countyName": "贡嘎县" },
    {
      "countyCode": "542228",
      "countyName": "洛扎县" },
    {
      "countyCode": "542226",
      "countyName": "曲松县" },
    {
      "countyCode": "542233",
      "countyName": "浪卡子县" },
    {
      "countyCode": "542231",
      "countyName": "隆子县" }] },

  {
    "cityCode": "542400",
    "cityName": "那曲市",
    "county": [{
      "countyCode": "542426",
      "countyName": "申扎县" },
    {
      "countyCode": "542423",
      "countyName": "比如县" },
    {
      "countyCode": "542430",
      "countyName": "尼玛县" },
    {
      "countyCode": "542421",
      "countyName": "色尼区" },
    {
      "countyCode": "542422",
      "countyName": "嘉黎县" },
    {
      "countyCode": "542424",
      "countyName": "聂荣县" },
    {
      "countyCode": "542427",
      "countyName": "索县" },
    {
      "countyCode": "542425",
      "countyName": "安多县" },
    {
      "countyCode": "542428",
      "countyName": "班戈县" },
    {
      "countyCode": "542429",
      "countyName": "巴青县" }] },

  {
    "cityCode": "542600",
    "cityName": "林芝市",
    "county": [{
      "countyCode": "542623",
      "countyName": "米林县" },
    {
      "countyCode": "542626",
      "countyName": "察隅县" },
    {
      "countyCode": "542627",
      "countyName": "朗县" },
    {
      "countyCode": "542622",
      "countyName": "工布江达县" },
    {
      "countyCode": "542625",
      "countyName": "波密县" },
    {
      "countyCode": "542624",
      "countyName": "墨脱县" },
    {
      "countyCode": "542621",
      "countyName": "巴宜区" }] },

  {
    "cityCode": "540100",
    "cityName": "拉萨市",
    "county": [{
      "countyCode": "540121",
      "countyName": "林周县" },
    {
      "countyCode": "540124",
      "countyName": "曲水县" },
    {
      "countyCode": "540126",
      "countyName": "达孜区" },
    {
      "countyCode": "540125",
      "countyName": "堆龙德庆区" },
    {
      "countyCode": "540122",
      "countyName": "当雄县" },
    {
      "countyCode": "540127",
      "countyName": "墨竹工卡县" },
    {
      "countyCode": "540123",
      "countyName": "尼木县" },
    {
      "countyCode": "540102",
      "countyName": "城关区" }] },

  {
    "cityCode": "542300",
    "cityName": "日喀则市",
    "county": [{
      "countyCode": "542335",
      "countyName": "吉隆县" },
    {
      "countyCode": "542323",
      "countyName": "江孜县" },
    {
      "countyCode": "542331",
      "countyName": "康马县" },
    {
      "countyCode": "542322",
      "countyName": "南木林县" },
    {
      "countyCode": "542338",
      "countyName": "岗巴县" },
    {
      "countyCode": "542336",
      "countyName": "聂拉木县" },
    {
      "countyCode": "542328",
      "countyName": "谢通门县" },
    {
      "countyCode": "542325",
      "countyName": "萨迦县" },
    {
      "countyCode": "542329",
      "countyName": "白朗县" },
    {
      "countyCode": "542326",
      "countyName": "拉孜县" },
    {
      "countyCode": "542332",
      "countyName": "定结县" },
    {
      "countyCode": "542327",
      "countyName": "昂仁县" },
    {
      "countyCode": "542334",
      "countyName": "亚东县" },
    {
      "countyCode": "542337",
      "countyName": "萨嘎县" },
    {
      "countyCode": "542324",
      "countyName": "定日县" },
    {
      "countyCode": "542333",
      "countyName": "仲巴县" },
    {
      "countyCode": "542301",
      "countyName": "桑珠孜区" },
    {
      "countyCode": "542330",
      "countyName": "仁布县" }] },

  {
    "cityCode": "542500",
    "cityName": "阿里地区",
    "county": [{
      "countyCode": "542523",
      "countyName": "噶尔县" },
    {
      "countyCode": "542525",
      "countyName": "革吉县" },
    {
      "countyCode": "542524",
      "countyName": "日土县" },
    {
      "countyCode": "542527",
      "countyName": "措勤县" },
    {
      "countyCode": "542521",
      "countyName": "普兰县" },
    {
      "countyCode": "542526",
      "countyName": "改则县" },
    {
      "countyCode": "542522",
      "countyName": "札达县" }] }] },


{
  "provinceCode": "610000",
  "provinceName": "陕西省",
  "city": [{
    "cityCode": "610800",
    "cityName": "榆林市",
    "county": [{
      "countyCode": "610831",
      "countyName": "子洲县" },
    {
      "countyCode": "610825",
      "countyName": "定边县" },
    {
      "countyCode": "610827",
      "countyName": "米脂县" },
    {
      "countyCode": "610821",
      "countyName": "神木市" },
    {
      "countyCode": "610829",
      "countyName": "吴堡县" },
    {
      "countyCode": "610822",
      "countyName": "府谷县" },
    {
      "countyCode": "610830",
      "countyName": "清涧县" },
    {
      "countyCode": "610823",
      "countyName": "横山区" },
    {
      "countyCode": "610824",
      "countyName": "靖边县" },
    {
      "countyCode": "610826",
      "countyName": "绥德县" },
    {
      "countyCode": "610802",
      "countyName": "榆阳区" },
    {
      "countyCode": "610828",
      "countyName": "佳县" }] },

  {
    "cityCode": "610200",
    "cityName": "铜川市",
    "county": [{
      "countyCode": "610202",
      "countyName": "王益区" },
    {
      "countyCode": "610203",
      "countyName": "印台区" },
    {
      "countyCode": "610204",
      "countyName": "耀州区" },
    {
      "countyCode": "610222",
      "countyName": "宜君县" }] },

  {
    "cityCode": "611000",
    "cityName": "商洛市",
    "county": [{
      "countyCode": "611022",
      "countyName": "丹凤县" },
    {
      "countyCode": "611023",
      "countyName": "商南县" },
    {
      "countyCode": "611026",
      "countyName": "柞水县" },
    {
      "countyCode": "611025",
      "countyName": "镇安县" },
    {
      "countyCode": "611024",
      "countyName": "山阳县" },
    {
      "countyCode": "611021",
      "countyName": "洛南县" },
    {
      "countyCode": "611002",
      "countyName": "商州区" }] },

  {
    "cityCode": "610500",
    "cityName": "渭南市",
    "county": [{
      "countyCode": "610582",
      "countyName": "华阴市" },
    {
      "countyCode": "610524",
      "countyName": "合阳县" },
    {
      "countyCode": "610521",
      "countyName": "华州区" },
    {
      "countyCode": "610581",
      "countyName": "韩城市" },
    {
      "countyCode": "610526",
      "countyName": "蒲城县" },
    {
      "countyCode": "610527",
      "countyName": "白水县" },
    {
      "countyCode": "610522",
      "countyName": "潼关县" },
    {
      "countyCode": "610528",
      "countyName": "富平县" },
    {
      "countyCode": "610523",
      "countyName": "大荔县" },
    {
      "countyCode": "610502",
      "countyName": "临渭区" },
    {
      "countyCode": "610525",
      "countyName": "澄城县" }] },

  {
    "cityCode": "610300",
    "cityName": "宝鸡市",
    "county": [{
      "countyCode": "610328",
      "countyName": "千阳县" },
    {
      "countyCode": "610330",
      "countyName": "凤县" },
    {
      "countyCode": "610329",
      "countyName": "麟游县" },
    {
      "countyCode": "610323",
      "countyName": "岐山县" },
    {
      "countyCode": "610302",
      "countyName": "渭滨区" },
    {
      "countyCode": "610327",
      "countyName": "陇县" },
    {
      "countyCode": "610322",
      "countyName": "凤翔县" },
    {
      "countyCode": "610324",
      "countyName": "扶风县" },
    {
      "countyCode": "610304",
      "countyName": "陈仓区" },
    {
      "countyCode": "610303",
      "countyName": "金台区" },
    {
      "countyCode": "610326",
      "countyName": "眉县" },
    {
      "countyCode": "610331",
      "countyName": "太白县" }] },

  {
    "cityCode": "610900",
    "cityName": "安康市",
    "county": [{
      "countyCode": "610927",
      "countyName": "镇坪县" },
    {
      "countyCode": "610923",
      "countyName": "宁陕县" },
    {
      "countyCode": "610922",
      "countyName": "石泉县" },
    {
      "countyCode": "610921",
      "countyName": "汉阴县" },
    {
      "countyCode": "610925",
      "countyName": "岚皋县" },
    {
      "countyCode": "610926",
      "countyName": "平利县" },
    {
      "countyCode": "610928",
      "countyName": "旬阳县" },
    {
      "countyCode": "610929",
      "countyName": "白河县" },
    {
      "countyCode": "610902",
      "countyName": "汉滨区" },
    {
      "countyCode": "610924",
      "countyName": "紫阳县" }] },

  {
    "cityCode": "610700",
    "cityName": "汉中市",
    "county": [{
      "countyCode": "610724",
      "countyName": "西乡县" },
    {
      "countyCode": "610721",
      "countyName": "南郑区" },
    {
      "countyCode": "610722",
      "countyName": "城固县" },
    {
      "countyCode": "610727",
      "countyName": "略阳县" },
    {
      "countyCode": "610728",
      "countyName": "镇巴县" },
    {
      "countyCode": "610702",
      "countyName": "汉台区" },
    {
      "countyCode": "610729",
      "countyName": "留坝县" },
    {
      "countyCode": "610723",
      "countyName": "洋县" },
    {
      "countyCode": "610730",
      "countyName": "佛坪县" },
    {
      "countyCode": "610726",
      "countyName": "宁强县" },
    {
      "countyCode": "610725",
      "countyName": "勉县" }] },

  {
    "cityCode": "610600",
    "cityName": "延安市",
    "county": [{
      "countyCode": "610628",
      "countyName": "富县" },
    {
      "countyCode": "610631",
      "countyName": "黄龙县" },
    {
      "countyCode": "610602",
      "countyName": "宝塔区" },
    {
      "countyCode": "610630",
      "countyName": "宜川县" },
    {
      "countyCode": "610624",
      "countyName": "安塞区" },
    {
      "countyCode": "610629",
      "countyName": "洛川县" },
    {
      "countyCode": "610621",
      "countyName": "延长县" },
    {
      "countyCode": "610632",
      "countyName": "黄陵县" },
    {
      "countyCode": "610626",
      "countyName": "吴起县" },
    {
      "countyCode": "610623",
      "countyName": "子长县" },
    {
      "countyCode": "610627",
      "countyName": "甘泉县" },
    {
      "countyCode": "610625",
      "countyName": "志丹县" },
    {
      "countyCode": "610622",
      "countyName": "延川县" }] },

  {
    "cityCode": "610100",
    "cityName": "西安市",
    "county": [{
      "countyCode": "610116",
      "countyName": "长安区" },
    {
      "countyCode": "610112",
      "countyName": "未央区" },
    {
      "countyCode": "610102",
      "countyName": "新城区" },
    {
      "countyCode": "610114",
      "countyName": "阎良区" },
    {
      "countyCode": "610111",
      "countyName": "灞桥区" },
    {
      "countyCode": "610126",
      "countyName": "高陵区" },
    {
      "countyCode": "610122",
      "countyName": "蓝田县" },
    {
      "countyCode": "610103",
      "countyName": "碑林区" },
    {
      "countyCode": "610115",
      "countyName": "临潼区" },
    {
      "countyCode": "610113",
      "countyName": "雁塔区" },
    {
      "countyCode": "610124",
      "countyName": "周至县" },
    {
      "countyCode": "610104",
      "countyName": "莲湖区" },
    {
      "countyCode": "610125",
      "countyName": "鄠邑区" }] },

  {
    "cityCode": "610400",
    "cityName": "咸阳市",
    "county": [{
      "countyCode": "610430",
      "countyName": "淳化县" },
    {
      "countyCode": "610423",
      "countyName": "泾阳县" },
    {
      "countyCode": "610481",
      "countyName": "兴平市" },
    {
      "countyCode": "610422",
      "countyName": "三原县" },
    {
      "countyCode": "610424",
      "countyName": "乾县" },
    {
      "countyCode": "610426",
      "countyName": "永寿县" },
    {
      "countyCode": "610427",
      "countyName": "彬州市" },
    {
      "countyCode": "610402",
      "countyName": "秦都区" },
    {
      "countyCode": "610404",
      "countyName": "渭城区" },
    {
      "countyCode": "610403",
      "countyName": "杨陵区" },
    {
      "countyCode": "610431",
      "countyName": "武功县" },
    {
      "countyCode": "610428",
      "countyName": "长武县" },
    {
      "countyCode": "610425",
      "countyName": "礼泉县" },
    {
      "countyCode": "610429",
      "countyName": "旬邑县" }] }] },


{
  "provinceCode": "620000",
  "provinceName": "甘肃省",
  "city": [{
    "cityCode": "620500",
    "cityName": "天水市",
    "county": [{
      "countyCode": "620524",
      "countyName": "武山县" },
    {
      "countyCode": "620502",
      "countyName": "秦州区" },
    {
      "countyCode": "620521",
      "countyName": "清水县" },
    {
      "countyCode": "620523",
      "countyName": "甘谷县" },
    {
      "countyCode": "620522",
      "countyName": "秦安县" },
    {
      "countyCode": "620503",
      "countyName": "麦积区" },
    {
      "countyCode": "620525",
      "countyName": "张家川回族自治县" }] },

  {
    "cityCode": "620300",
    "cityName": "金昌市",
    "county": [{
      "countyCode": "620302",
      "countyName": "金川区" },
    {
      "countyCode": "620321",
      "countyName": "永昌县" }] },

  {
    "cityCode": "620600",
    "cityName": "武威市",
    "county": [{
      "countyCode": "620602",
      "countyName": "凉州区" },
    {
      "countyCode": "620623",
      "countyName": "天祝藏族自治县" },
    {
      "countyCode": "620622",
      "countyName": "古浪县" },
    {
      "countyCode": "620621",
      "countyName": "民勤县" }] },

  {
    "cityCode": "620700",
    "cityName": "张掖市",
    "county": [{
      "countyCode": "620702",
      "countyName": "甘州区" },
    {
      "countyCode": "620724",
      "countyName": "高台县" },
    {
      "countyCode": "620725",
      "countyName": "山丹县" },
    {
      "countyCode": "620723",
      "countyName": "临泽县" },
    {
      "countyCode": "620722",
      "countyName": "民乐县" },
    {
      "countyCode": "620721",
      "countyName": "肃南裕固族自治县" }] },

  {
    "cityCode": "621200",
    "cityName": "陇南市",
    "county": [{
      "countyCode": "621225",
      "countyName": "西和县" },
    {
      "countyCode": "621223",
      "countyName": "宕昌县" },
    {
      "countyCode": "621227",
      "countyName": "徽县" },
    {
      "countyCode": "621224",
      "countyName": "康县" },
    {
      "countyCode": "621221",
      "countyName": "成县" },
    {
      "countyCode": "621228",
      "countyName": "两当县" },
    {
      "countyCode": "621226",
      "countyName": "礼县" },
    {
      "countyCode": "621222",
      "countyName": "文县" },
    {
      "countyCode": "621202",
      "countyName": "武都区" }] },

  {
    "cityCode": "620100",
    "cityName": "兰州市",
    "county": [{
      "countyCode": "620121",
      "countyName": "永登县" },
    {
      "countyCode": "620111",
      "countyName": "红古区" },
    {
      "countyCode": "620103",
      "countyName": "七里河区" },
    {
      "countyCode": "620122",
      "countyName": "皋兰县" },
    {
      "countyCode": "620104",
      "countyName": "西固区" },
    {
      "countyCode": "620102",
      "countyName": "城关区" },
    {
      "countyCode": "620105",
      "countyName": "安宁区" },
    {
      "countyCode": "620123",
      "countyName": "榆中县" }] },

  {
    "cityCode": "621000",
    "cityName": "庆阳市",
    "county": [{
      "countyCode": "621025",
      "countyName": "正宁县" },
    {
      "countyCode": "621026",
      "countyName": "宁县" },
    {
      "countyCode": "621027",
      "countyName": "镇原县" },
    {
      "countyCode": "621023",
      "countyName": "华池县" },
    {
      "countyCode": "621002",
      "countyName": "西峰区" },
    {
      "countyCode": "621024",
      "countyName": "合水县" },
    {
      "countyCode": "621022",
      "countyName": "环县" },
    {
      "countyCode": "621021",
      "countyName": "庆城县" }] },

  {
    "cityCode": "620200",
    "cityName": "嘉峪关市",
    "county": [{
      "countyCode": "620200-1",
      "countyName": "嘉峪关市" }] },

  {
    "cityCode": "620800",
    "cityName": "平凉市",
    "county": [{
      "countyCode": "620826",
      "countyName": "静宁县" },
    {
      "countyCode": "620822",
      "countyName": "灵台县" },
    {
      "countyCode": "620823",
      "countyName": "崇信县" },
    {
      "countyCode": "620825",
      "countyName": "庄浪县" },
    {
      "countyCode": "620824",
      "countyName": "华亭县" },
    {
      "countyCode": "620821",
      "countyName": "泾川县" },
    {
      "countyCode": "620802",
      "countyName": "崆峒区" }] },

  {
    "cityCode": "623000",
    "cityName": "甘南藏族自治州",
    "county": [{
      "countyCode": "623024",
      "countyName": "迭部县" },
    {
      "countyCode": "623026",
      "countyName": "碌曲县" },
    {
      "countyCode": "623022",
      "countyName": "卓尼县" },
    {
      "countyCode": "623021",
      "countyName": "临潭县" },
    {
      "countyCode": "623025",
      "countyName": "玛曲县" },
    {
      "countyCode": "623001",
      "countyName": "合作市" },
    {
      "countyCode": "623027",
      "countyName": "夏河县" },
    {
      "countyCode": "623023",
      "countyName": "舟曲县" }] },

  {
    "cityCode": "620400",
    "cityName": "白银市",
    "county": [{
      "countyCode": "620422",
      "countyName": "会宁县" },
    {
      "countyCode": "620403",
      "countyName": "平川区" },
    {
      "countyCode": "620423",
      "countyName": "景泰县" },
    {
      "countyCode": "620421",
      "countyName": "靖远县" },
    {
      "countyCode": "620402",
      "countyName": "白银区" }] },

  {
    "cityCode": "620900",
    "cityName": "酒泉市",
    "county": [{
      "countyCode": "620921",
      "countyName": "金塔县" },
    {
      "countyCode": "620924",
      "countyName": "阿克塞哈萨克族自治县" },
    {
      "countyCode": "620923",
      "countyName": "肃北蒙古族自治县" },
    {
      "countyCode": "620922",
      "countyName": "瓜州县" },
    {
      "countyCode": "620981",
      "countyName": "玉门市" },
    {
      "countyCode": "620902",
      "countyName": "肃州区" },
    {
      "countyCode": "620982",
      "countyName": "敦煌市" }] },

  {
    "cityCode": "621100",
    "cityName": "定西市",
    "county": [{
      "countyCode": "621122",
      "countyName": "陇西县" },
    {
      "countyCode": "621123",
      "countyName": "渭源县" },
    {
      "countyCode": "621125",
      "countyName": "漳县" },
    {
      "countyCode": "621124",
      "countyName": "临洮县" },
    {
      "countyCode": "621121",
      "countyName": "通渭县" },
    {
      "countyCode": "621126",
      "countyName": "岷县" },
    {
      "countyCode": "621102",
      "countyName": "安定区" }] },

  {
    "cityCode": "622900",
    "cityName": "临夏回族自治州",
    "county": [{
      "countyCode": "622921",
      "countyName": "临夏县" },
    {
      "countyCode": "622925",
      "countyName": "和政县" },
    {
      "countyCode": "622924",
      "countyName": "广河县" },
    {
      "countyCode": "622901",
      "countyName": "临夏市" },
    {
      "countyCode": "622926",
      "countyName": "东乡族自治县" },
    {
      "countyCode": "622923",
      "countyName": "永靖县" },
    {
      "countyCode": "622927",
      "countyName": "积石山保安族东乡族撒拉族自治县" },
    {
      "countyCode": "622922",
      "countyName": "康乐县" }] }] },


{
  "provinceCode": "630000",
  "provinceName": "青海省",
  "city": [{
    "cityCode": "632200",
    "cityName": "海北藏族自治州",
    "county": [{
      "countyCode": "632224",
      "countyName": "刚察县" },
    {
      "countyCode": "632222",
      "countyName": "祁连县" },
    {
      "countyCode": "632223",
      "countyName": "海晏县" },
    {
      "countyCode": "632221",
      "countyName": "门源回族自治县" }] },

  {
    "cityCode": "632500",
    "cityName": "海南藏族自治州",
    "county": [{
      "countyCode": "632522",
      "countyName": "同德县" },
    {
      "countyCode": "632525",
      "countyName": "贵南县" },
    {
      "countyCode": "632524",
      "countyName": "兴海县" },
    {
      "countyCode": "632523",
      "countyName": "贵德县" },
    {
      "countyCode": "632521",
      "countyName": "共和县" }] },

  {
    "cityCode": "630100",
    "cityName": "西宁市",
    "county": [{
      "countyCode": "630102",
      "countyName": "城东区" },
    {
      "countyCode": "630122",
      "countyName": "湟中县" },
    {
      "countyCode": "630105",
      "countyName": "城北区" },
    {
      "countyCode": "630121",
      "countyName": "大通回族土族自治县" },
    {
      "countyCode": "630103",
      "countyName": "城中区" },
    {
      "countyCode": "630104",
      "countyName": "城西区" },
    {
      "countyCode": "630123",
      "countyName": "湟源县" }] },

  {
    "cityCode": "632700",
    "cityName": "玉树藏族自治州",
    "county": [{
      "countyCode": "632726",
      "countyName": "曲麻莱县" },
    {
      "countyCode": "632721",
      "countyName": "玉树市" },
    {
      "countyCode": "632723",
      "countyName": "称多县" },
    {
      "countyCode": "632722",
      "countyName": "杂多县" },
    {
      "countyCode": "632725",
      "countyName": "囊谦县" },
    {
      "countyCode": "632724",
      "countyName": "治多县" }] },

  {
    "cityCode": "632800",
    "cityName": "海西蒙古族藏族自治州",
    "county": [{
      "countyCode": "632801",
      "countyName": "格尔木市" },
    {
      "countyCode": "632823",
      "countyName": "天峻县" },
    {
      "countyCode": "632802",
      "countyName": "德令哈市" },
    {
      "countyCode": "632822",
      "countyName": "都兰县" },
    {
      "countyCode": "632821",
      "countyName": "乌兰县" },
    {
      "countyCode": "632803",
      "countyName": "茫崖市" }] },

  {
    "cityCode": "632100",
    "cityName": "海东市",
    "county": [{
      "countyCode": "632128",
      "countyName": "循化撒拉族自治县" },
    {
      "countyCode": "632126",
      "countyName": "互助土族自治县" },
    {
      "countyCode": "632127",
      "countyName": "化隆回族自治县" },
    {
      "countyCode": "632122",
      "countyName": "民和回族土族自治县" },
    {
      "countyCode": "632121",
      "countyName": "平安区" },
    {
      "countyCode": "632123",
      "countyName": "乐都区" }] },

  {
    "cityCode": "632300",
    "cityName": "黄南藏族自治州",
    "county": [{
      "countyCode": "632322",
      "countyName": "尖扎县" },
    {
      "countyCode": "632323",
      "countyName": "泽库县" },
    {
      "countyCode": "632324",
      "countyName": "河南蒙古族自治县" },
    {
      "countyCode": "632321",
      "countyName": "同仁县" }] },

  {
    "cityCode": "632600",
    "cityName": "果洛藏族自治州",
    "county": [{
      "countyCode": "632625",
      "countyName": "久治县" },
    {
      "countyCode": "632623",
      "countyName": "甘德县" },
    {
      "countyCode": "632622",
      "countyName": "班玛县" },
    {
      "countyCode": "632626",
      "countyName": "玛多县" },
    {
      "countyCode": "632624",
      "countyName": "达日县" },
    {
      "countyCode": "632621",
      "countyName": "玛沁县" }] }] },


{
  "provinceCode": "640000",
  "provinceName": "宁夏回族自治区",
  "city": [{
    "cityCode": "640200",
    "cityName": "石嘴山市",
    "county": [{
      "countyCode": "640205",
      "countyName": "惠农区" },
    {
      "countyCode": "640202",
      "countyName": "大武口区" },
    {
      "countyCode": "640221",
      "countyName": "平罗县" }] },

  {
    "cityCode": "640300",
    "cityName": "吴忠市",
    "county": [{
      "countyCode": "640323",
      "countyName": "盐池县" },
    {
      "countyCode": "640381",
      "countyName": "青铜峡市" },
    {
      "countyCode": "640302",
      "countyName": "利通区" },
    {
      "countyCode": "640303",
      "countyName": "红寺堡区" },
    {
      "countyCode": "640324",
      "countyName": "同心县" }] },

  {
    "cityCode": "640500",
    "cityName": "中卫市",
    "county": [{
      "countyCode": "640522",
      "countyName": "海原县" },
    {
      "countyCode": "640502",
      "countyName": "沙坡头区" },
    {
      "countyCode": "640521",
      "countyName": "中宁县" }] },

  {
    "cityCode": "640400",
    "cityName": "固原市",
    "county": [{
      "countyCode": "640402",
      "countyName": "原州区" },
    {
      "countyCode": "640423",
      "countyName": "隆德县" },
    {
      "countyCode": "640424",
      "countyName": "泾源县" },
    {
      "countyCode": "640422",
      "countyName": "西吉县" },
    {
      "countyCode": "640425",
      "countyName": "彭阳县" }] },

  {
    "cityCode": "640100",
    "cityName": "银川市",
    "county": [{
      "countyCode": "640106",
      "countyName": "金凤区" },
    {
      "countyCode": "640105",
      "countyName": "西夏区" },
    {
      "countyCode": "640122",
      "countyName": "贺兰县" },
    {
      "countyCode": "640104",
      "countyName": "兴庆区" },
    {
      "countyCode": "640181",
      "countyName": "灵武市" },
    {
      "countyCode": "640121",
      "countyName": "永宁县" }] }] },


{
  "provinceCode": "650000",
  "provinceName": "新疆维吾尔自治区",
  "city": [{
    "cityCode": "650200",
    "cityName": "克拉玛依市",
    "county": [{
      "countyCode": "650203",
      "countyName": "克拉玛依区" },
    {
      "countyCode": "650205",
      "countyName": "乌尔禾区" },
    {
      "countyCode": "650202",
      "countyName": "独山子区" },
    {
      "countyCode": "650204",
      "countyName": "白碱滩区" }] },

  {
    "cityCode": "652800",
    "cityName": "巴音郭楞蒙古自治州",
    "county": [{
      "countyCode": "652829",
      "countyName": "博湖县" },
    {
      "countyCode": "652824",
      "countyName": "若羌县" },
    {
      "countyCode": "652826",
      "countyName": "焉耆回族自治县" },
    {
      "countyCode": "652823",
      "countyName": "尉犁县" },
    {
      "countyCode": "652822",
      "countyName": "轮台县" },
    {
      "countyCode": "652825",
      "countyName": "且末县" },
    {
      "countyCode": "652801",
      "countyName": "库尔勒市" },
    {
      "countyCode": "652827",
      "countyName": "和静县" },
    {
      "countyCode": "652828",
      "countyName": "和硕县" }] },

  {
    "cityCode": "654200",
    "cityName": "塔城地区",
    "county": [{
      "countyCode": "654223",
      "countyName": "沙湾县" },
    {
      "countyCode": "654201",
      "countyName": "塔城市" },
    {
      "countyCode": "654226",
      "countyName": "和布克赛尔蒙古自治县" },
    {
      "countyCode": "654202",
      "countyName": "乌苏市" },
    {
      "countyCode": "654224",
      "countyName": "托里县" },
    {
      "countyCode": "654221",
      "countyName": "额敏县" },
    {
      "countyCode": "654225",
      "countyName": "裕民县" }] },

  {
    "cityCode": "652200",
    "cityName": "哈密市",
    "county": [{
      "countyCode": "652222",
      "countyName": "巴里坤哈萨克自治县" },
    {
      "countyCode": "652201",
      "countyName": "伊州区" },
    {
      "countyCode": "652223",
      "countyName": "伊吾县" }] },

  {
    "cityCode": "654000",
    "cityName": "伊犁哈萨克自治州",
    "county": [{
      "countyCode": "654027",
      "countyName": "特克斯县" },
    {
      "countyCode": "654024",
      "countyName": "巩留县" },
    {
      "countyCode": "654022",
      "countyName": "察布查尔锡伯自治县" },
    {
      "countyCode": "654004",
      "countyName": "霍尔果斯市" },
    {
      "countyCode": "654023",
      "countyName": "霍城县" },
    {
      "countyCode": "654028",
      "countyName": "尼勒克县" },
    {
      "countyCode": "654003",
      "countyName": "奎屯市" },
    {
      "countyCode": "654021",
      "countyName": "伊宁县" },
    {
      "countyCode": "654025",
      "countyName": "新源县" },
    {
      "countyCode": "654002",
      "countyName": "伊宁市" },
    {
      "countyCode": "654026",
      "countyName": "昭苏县" }] },

  {
    "cityCode": "654300",
    "cityName": "阿勒泰地区",
    "county": [{
      "countyCode": "654325",
      "countyName": "青河县" },
    {
      "countyCode": "654326",
      "countyName": "吉木乃县" },
    {
      "countyCode": "654321",
      "countyName": "布尔津县" },
    {
      "countyCode": "654323",
      "countyName": "福海县" },
    {
      "countyCode": "654301",
      "countyName": "阿勒泰市" },
    {
      "countyCode": "654322",
      "countyName": "富蕴县" },
    {
      "countyCode": "654324",
      "countyName": "哈巴河县" }] },

  {
    "cityCode": "652100",
    "cityName": "吐鲁番市",
    "county": [{
      "countyCode": "652122",
      "countyName": "鄯善县" },
    {
      "countyCode": "652101",
      "countyName": "高昌区" },
    {
      "countyCode": "652123",
      "countyName": "托克逊县" }] },

  {
    "cityCode": "650100",
    "cityName": "乌鲁木齐市",
    "county": [{
      "countyCode": "650121",
      "countyName": "乌鲁木齐县" },
    {
      "countyCode": "650109",
      "countyName": "米东区" },
    {
      "countyCode": "650103",
      "countyName": "沙依巴克区" },
    {
      "countyCode": "650105",
      "countyName": "水磨沟区" },
    {
      "countyCode": "650107",
      "countyName": "达坂城区" },
    {
      "countyCode": "650104",
      "countyName": "新市区" },
    {
      "countyCode": "650102",
      "countyName": "天山区" },
    {
      "countyCode": "650106",
      "countyName": "头屯河区" }] },

  {
    "cityCode": "659002",
    "cityName": "阿拉尔市",
    "county": [{
      "countyCode": "659002-1",
      "countyName": "阿拉尔市" }] },

  {
    "cityCode": "653200",
    "cityName": "和田地区",
    "county": [{
      "countyCode": "653222",
      "countyName": "墨玉县" },
    {
      "countyCode": "653226",
      "countyName": "于田县" },
    {
      "countyCode": "653223",
      "countyName": "皮山县" },
    {
      "countyCode": "653221",
      "countyName": "和田县" },
    {
      "countyCode": "653224",
      "countyName": "洛浦县" },
    {
      "countyCode": "653225",
      "countyName": "策勒县" },
    {
      "countyCode": "653227",
      "countyName": "民丰县" },
    {
      "countyCode": "653201",
      "countyName": "和田市" }] },

  {
    "cityCode": "659003",
    "cityName": "图木舒克市",
    "county": [{
      "countyCode": "659003-1",
      "countyName": "图木舒克市" }] },

  {
    "cityCode": "695005",
    "cityName": "北屯市",
    "county": [{
      "countyCode": "695005-1",
      "countyName": "北屯市" }] },

  {
    "cityCode": "652300",
    "cityName": "昌吉回族自治州",
    "county": [{
      "countyCode": "652302",
      "countyName": "阜康市" },
    {
      "countyCode": "652324",
      "countyName": "玛纳斯县" },
    {
      "countyCode": "652325",
      "countyName": "奇台县" },
    {
      "countyCode": "652323",
      "countyName": "呼图壁县" },
    {
      "countyCode": "652301",
      "countyName": "昌吉市" },
    {
      "countyCode": "652327",
      "countyName": "吉木萨尔县" },
    {
      "countyCode": "652328",
      "countyName": "木垒哈萨克自治县" },
    {
      "countyCode": "652303",
      "countyName": "准东开发区" }] },

  {
    "cityCode": "653100",
    "cityName": "喀什地区",
    "county": [{
      "countyCode": "653128",
      "countyName": "岳普湖县" },
    {
      "countyCode": "653129",
      "countyName": "伽师县" },
    {
      "countyCode": "653126",
      "countyName": "叶城县" },
    {
      "countyCode": "653122",
      "countyName": "疏勒县" },
    {
      "countyCode": "653124",
      "countyName": "泽普县" },
    {
      "countyCode": "653121",
      "countyName": "疏附县" },
    {
      "countyCode": "653131",
      "countyName": "塔什库尔干塔吉克自治县" },
    {
      "countyCode": "653130",
      "countyName": "巴楚县" },
    {
      "countyCode": "653123",
      "countyName": "英吉沙县" },
    {
      "countyCode": "653127",
      "countyName": "麦盖提县" },
    {
      "countyCode": "653125",
      "countyName": "莎车县" },
    {
      "countyCode": "653101",
      "countyName": "喀什市" }] },

  {
    "cityCode": "659001",
    "cityName": "石河子市",
    "county": [{
      "countyCode": "659001-1",
      "countyName": "石河子市" }] },

  {
    "cityCode": "695006",
    "cityName": "铁门关市",
    "county": [{
      "countyCode": "695006-1",
      "countyName": "铁门关市" }] },

  {
    "cityCode": "652900",
    "cityName": "阿克苏地区",
    "county": [{
      "countyCode": "652901",
      "countyName": "阿克苏市" },
    {
      "countyCode": "652922",
      "countyName": "温宿县" },
    {
      "countyCode": "652928",
      "countyName": "阿瓦提县" },
    {
      "countyCode": "652929",
      "countyName": "柯坪县" },
    {
      "countyCode": "652925",
      "countyName": "新和县" },
    {
      "countyCode": "652924",
      "countyName": "沙雅县" },
    {
      "countyCode": "652927",
      "countyName": "乌什县" },
    {
      "countyCode": "652923",
      "countyName": "库车县" },
    {
      "countyCode": "652926",
      "countyName": "拜城县" }] },

  {
    "cityCode": "653000",
    "cityName": "克孜勒苏柯尔克孜自治州",
    "county": [{
      "countyCode": "653023",
      "countyName": "阿合奇县" },
    {
      "countyCode": "653022",
      "countyName": "阿克陶县" },
    {
      "countyCode": "653001",
      "countyName": "阿图什市" },
    {
      "countyCode": "653024",
      "countyName": "乌恰县" }] },

  {
    "cityCode": "659004",
    "cityName": "五家渠市",
    "county": [{
      "countyCode": "659004-1",
      "countyName": "五家渠市" }] },

  {
    "cityCode": "652700",
    "cityName": "博尔塔拉蒙古自治州",
    "county": [{
      "countyCode": "652701",
      "countyName": "博乐市" },
    {
      "countyCode": "652723",
      "countyName": "温泉县" },
    {
      "countyCode": "652722",
      "countyName": "精河县" }] },

  {
    "cityCode": "695007",
    "cityName": "双河市",
    "county": [{
      "countyCode": "695007-1",
      "countyName": "双河市" }] }] },


{
  "provinceCode": "330000",
  "provinceName": "浙江省",
  "city": [{
    "cityCode": "330900",
    "cityName": "舟山市",
    "county": [{
      "countyCode": "330922",
      "countyName": "嵊泗县" },
    {
      "countyCode": "330903",
      "countyName": "普陀区" },
    {
      "countyCode": "330902",
      "countyName": "定海区" },
    {
      "countyCode": "330921",
      "countyName": "岱山县" }] },

  {
    "cityCode": "330800",
    "cityName": "衢州市",
    "county": [{
      "countyCode": "330824",
      "countyName": "开化县" },
    {
      "countyCode": "330803",
      "countyName": "衢江区" },
    {
      "countyCode": "330881",
      "countyName": "江山市" },
    {
      "countyCode": "330802",
      "countyName": "柯城区" },
    {
      "countyCode": "330822",
      "countyName": "常山县" },
    {
      "countyCode": "330825",
      "countyName": "龙游县" }] },

  {
    "cityCode": "330700",
    "cityName": "金华市",
    "county": [{
      "countyCode": "330782",
      "countyName": "义乌市" },
    {
      "countyCode": "330784",
      "countyName": "永康市" },
    {
      "countyCode": "330727",
      "countyName": "磐安县" },
    {
      "countyCode": "330702",
      "countyName": "婺城区" },
    {
      "countyCode": "330726",
      "countyName": "浦江县" },
    {
      "countyCode": "330783",
      "countyName": "东阳市" },
    {
      "countyCode": "330781",
      "countyName": "兰溪市" },
    {
      "countyCode": "330723",
      "countyName": "武义县" },
    {
      "countyCode": "330703",
      "countyName": "金东区" }] },

  {
    "cityCode": "330300",
    "cityName": "温州市",
    "county": [{
      "countyCode": "330302",
      "countyName": "鹿城区" },
    {
      "countyCode": "330322",
      "countyName": "洞头区" },
    {
      "countyCode": "330381",
      "countyName": "瑞安市" },
    {
      "countyCode": "330329",
      "countyName": "泰顺县" },
    {
      "countyCode": "330324",
      "countyName": "永嘉县" },
    {
      "countyCode": "330304",
      "countyName": "瓯海区" },
    {
      "countyCode": "330327",
      "countyName": "苍南县" },
    {
      "countyCode": "330328",
      "countyName": "文成县" },
    {
      "countyCode": "330326",
      "countyName": "平阳县" },
    {
      "countyCode": "330382",
      "countyName": "乐清市" },
    {
      "countyCode": "330303",
      "countyName": "龙湾区" }] },

  {
    "cityCode": "330200",
    "cityName": "宁波市",
    "county": [{
      "countyCode": "330204",
      "countyName": "江东区" },
    {
      "countyCode": "330225",
      "countyName": "象山县" },
    {
      "countyCode": "330212",
      "countyName": "鄞州区" },
    {
      "countyCode": "330226",
      "countyName": "宁海县" },
    {
      "countyCode": "330283",
      "countyName": "奉化区" },
    {
      "countyCode": "330282",
      "countyName": "慈溪市" },
    {
      "countyCode": "330281",
      "countyName": "余姚市" },
    {
      "countyCode": "330211",
      "countyName": "镇海区" },
    {
      "countyCode": "330205",
      "countyName": "江北区" },
    {
      "countyCode": "330206",
      "countyName": "北仑区" },
    {
      "countyCode": "330203",
      "countyName": "海曙区" }] },

  {
    "cityCode": "330100",
    "cityName": "杭州市",
    "county": [{
      "countyCode": "330110",
      "countyName": "余杭区" },
    {
      "countyCode": "330106",
      "countyName": "西湖区" },
    {
      "countyCode": "330109",
      "countyName": "萧山区" },
    {
      "countyCode": "330185",
      "countyName": "临安区" },
    {
      "countyCode": "330122",
      "countyName": "桐庐县" },
    {
      "countyCode": "330103",
      "countyName": "下城区" },
    {
      "countyCode": "330182",
      "countyName": "建德市" },
    {
      "countyCode": "330102",
      "countyName": "上城区" },
    {
      "countyCode": "330127",
      "countyName": "淳安县" },
    {
      "countyCode": "330105",
      "countyName": "拱墅区" },
    {
      "countyCode": "330104",
      "countyName": "江干区" },
    {
      "countyCode": "330108",
      "countyName": "滨江区" },
    {
      "countyCode": "330183",
      "countyName": "富阳区" }] },

  {
    "cityCode": "330400",
    "cityName": "嘉兴市",
    "county": [{
      "countyCode": "330482",
      "countyName": "平湖市" },
    {
      "countyCode": "330402",
      "countyName": "南湖区" },
    {
      "countyCode": "330481",
      "countyName": "海宁市" },
    {
      "countyCode": "330421",
      "countyName": "嘉善县" },
    {
      "countyCode": "330424",
      "countyName": "海盐县" },
    {
      "countyCode": "330411",
      "countyName": "秀洲区" },
    {
      "countyCode": "330483",
      "countyName": "桐乡市" }] },

  {
    "cityCode": "330600",
    "cityName": "绍兴市",
    "county": [{
      "countyCode": "330681",
      "countyName": "诸暨市" },
    {
      "countyCode": "330602",
      "countyName": "越城区" },
    {
      "countyCode": "330682",
      "countyName": "上虞区" },
    {
      "countyCode": "330683",
      "countyName": "嵊州市" },
    {
      "countyCode": "330624",
      "countyName": "新昌县" },
    {
      "countyCode": "330621",
      "countyName": "柯桥区" }] },

  {
    "cityCode": "331100",
    "cityName": "丽水市",
    "county": [{
      "countyCode": "331125",
      "countyName": "云和县" },
    {
      "countyCode": "331121",
      "countyName": "青田县" },
    {
      "countyCode": "331126",
      "countyName": "庆元县" },
    {
      "countyCode": "331124",
      "countyName": "松阳县" },
    {
      "countyCode": "331123",
      "countyName": "遂昌县" },
    {
      "countyCode": "331122",
      "countyName": "缙云县" },
    {
      "countyCode": "331127",
      "countyName": "景宁畲族自治县" },
    {
      "countyCode": "331102",
      "countyName": "莲都区" },
    {
      "countyCode": "331181",
      "countyName": "龙泉市" }] },

  {
    "cityCode": "330500",
    "cityName": "湖州市",
    "county": [{
      "countyCode": "330522",
      "countyName": "长兴县" },
    {
      "countyCode": "330503",
      "countyName": "南浔区" },
    {
      "countyCode": "330523",
      "countyName": "安吉县" },
    {
      "countyCode": "330502",
      "countyName": "吴兴区" },
    {
      "countyCode": "330521",
      "countyName": "德清县" }] },

  {
    "cityCode": "331000",
    "cityName": "台州市",
    "county": [{
      "countyCode": "331024",
      "countyName": "仙居县" },
    {
      "countyCode": "331021",
      "countyName": "玉环市" },
    {
      "countyCode": "331082",
      "countyName": "临海市" },
    {
      "countyCode": "331023",
      "countyName": "天台县" },
    {
      "countyCode": "331003",
      "countyName": "黄岩区" },
    {
      "countyCode": "331004",
      "countyName": "路桥区" },
    {
      "countyCode": "331022",
      "countyName": "三门县" },
    {
      "countyCode": "331002",
      "countyName": "椒江区" },
    {
      "countyCode": "331081",
      "countyName": "温岭市" }] }] },


{
  "provinceCode": "320000",
  "provinceName": "江苏省",
  "city": [{
    "cityCode": "320200",
    "cityName": "无锡市",
    "county": [{
      "countyCode": "320282",
      "countyName": "宜兴市" },
    {
      "countyCode": "320205",
      "countyName": "锡山区" },
    {
      "countyCode": "320211",
      "countyName": "滨湖区" },
    {
      "countyCode": "320281",
      "countyName": "江阴市" },
    {
      "countyCode": "320206",
      "countyName": "惠山区" },
    {
      "countyCode": "320207",
      "countyName": "梁溪区" },
    {
      "countyCode": "320214",
      "countyName": "新吴区" }] },

  {
    "cityCode": "320400",
    "cityName": "常州市",
    "county": [{
      "countyCode": "320412",
      "countyName": "武进区" },
    {
      "countyCode": "320405",
      "countyName": "戚墅堰区" },
    {
      "countyCode": "320481",
      "countyName": "溧阳市" },
    {
      "countyCode": "320402",
      "countyName": "天宁区" },
    {
      "countyCode": "320411",
      "countyName": "新北区" },
    {
      "countyCode": "320404",
      "countyName": "钟楼区" },
    {
      "countyCode": "320482",
      "countyName": "金坛区" }] },

  {
    "cityCode": "320500",
    "cityName": "苏州市",
    "county": [{
      "countyCode": "320509",
      "countyName": "吴江区" },
    {
      "countyCode": "320506",
      "countyName": "吴中区" },
    {
      "countyCode": "320582",
      "countyName": "张家港市" },
    {
      "countyCode": "320508",
      "countyName": "姑苏区" },
    {
      "countyCode": "320571",
      "countyName": "苏州工业园区" },
    {
      "countyCode": "320583",
      "countyName": "昆山市" },
    {
      "countyCode": "320581",
      "countyName": "常熟市" },
    {
      "countyCode": "320505",
      "countyName": "虎丘区" },
    {
      "countyCode": "320507",
      "countyName": "相城区" },
    {
      "countyCode": "320585",
      "countyName": "太仓市" }] },

  {
    "cityCode": "320800",
    "cityName": "淮安市",
    "county": [{
      "countyCode": "320811",
      "countyName": "清浦区" },
    {
      "countyCode": "320829",
      "countyName": "洪泽区" },
    {
      "countyCode": "320802",
      "countyName": "清江浦区" },
    {
      "countyCode": "320803",
      "countyName": "淮安区" },
    {
      "countyCode": "320831",
      "countyName": "金湖县" },
    {
      "countyCode": "320804",
      "countyName": "淮阴区" },
    {
      "countyCode": "320830",
      "countyName": "盱眙县" },
    {
      "countyCode": "320826",
      "countyName": "涟水县" }] },

  {
    "cityCode": "320300",
    "cityName": "徐州市",
    "county": [{
      "countyCode": "320381",
      "countyName": "新沂市" },
    {
      "countyCode": "320324",
      "countyName": "睢宁县" },
    {
      "countyCode": "320311",
      "countyName": "泉山区" },
    {
      "countyCode": "320302",
      "countyName": "鼓楼区" },
    {
      "countyCode": "320305",
      "countyName": "贾汪区" },
    {
      "countyCode": "320303",
      "countyName": "云龙区" },
    {
      "countyCode": "320312",
      "countyName": "铜山区" },
    {
      "countyCode": "320321",
      "countyName": "丰县" },
    {
      "countyCode": "320322",
      "countyName": "沛县" },
    {
      "countyCode": "320382",
      "countyName": "邳州市" }] },

  {
    "cityCode": "321200",
    "cityName": "泰州市",
    "county": [{
      "countyCode": "321203",
      "countyName": "高港区" },
    {
      "countyCode": "321202",
      "countyName": "海陵区" },
    {
      "countyCode": "321283",
      "countyName": "泰兴市" },
    {
      "countyCode": "321284",
      "countyName": "姜堰区" },
    {
      "countyCode": "321282",
      "countyName": "靖江市" },
    {
      "countyCode": "321281",
      "countyName": "兴化市" }] },

  {
    "cityCode": "320700",
    "cityName": "连云港市",
    "county": [{
      "countyCode": "320723",
      "countyName": "灌云县" },
    {
      "countyCode": "320721",
      "countyName": "赣榆区" },
    {
      "countyCode": "320705",
      "countyName": "新浦区" },
    {
      "countyCode": "320722",
      "countyName": "东海县" },
    {
      "countyCode": "320706",
      "countyName": "海州区" },
    {
      "countyCode": "320703",
      "countyName": "连云区" },
    {
      "countyCode": "320724",
      "countyName": "灌南县" }] },

  {
    "cityCode": "321100",
    "cityName": "镇江市",
    "county": [{
      "countyCode": "321112",
      "countyName": "丹徒区" },
    {
      "countyCode": "321102",
      "countyName": "京口区" },
    {
      "countyCode": "321182",
      "countyName": "扬中市" },
    {
      "countyCode": "321181",
      "countyName": "丹阳市" },
    {
      "countyCode": "321183",
      "countyName": "句容市" },
    {
      "countyCode": "321111",
      "countyName": "润州区" }] },

  {
    "cityCode": "320600",
    "cityName": "南通市",
    "county": [{
      "countyCode": "320602",
      "countyName": "崇川区" },
    {
      "countyCode": "320684",
      "countyName": "海门市" },
    {
      "countyCode": "320681",
      "countyName": "启东市" },
    {
      "countyCode": "320612",
      "countyName": "通州区" },
    {
      "countyCode": "320621",
      "countyName": "海安市" },
    {
      "countyCode": "320623",
      "countyName": "如东县" },
    {
      "countyCode": "320611",
      "countyName": "港闸区" },
    {
      "countyCode": "320682",
      "countyName": "如皋市" }] },

  {
    "cityCode": "320900",
    "cityName": "盐城市",
    "county": [{
      "countyCode": "320922",
      "countyName": "滨海县" },
    {
      "countyCode": "320981",
      "countyName": "东台市" },
    {
      "countyCode": "320925",
      "countyName": "建湖县" },
    {
      "countyCode": "320903",
      "countyName": "盐都区" },
    {
      "countyCode": "320921",
      "countyName": "响水县" },
    {
      "countyCode": "320924",
      "countyName": "射阳县" },
    {
      "countyCode": "320902",
      "countyName": "亭湖区" },
    {
      "countyCode": "320923",
      "countyName": "阜宁县" },
    {
      "countyCode": "320982",
      "countyName": "大丰区" }] },

  {
    "cityCode": "320100",
    "cityName": "南京市",
    "county": [{
      "countyCode": "320106",
      "countyName": "鼓楼区" },
    {
      "countyCode": "320115",
      "countyName": "江宁区" },
    {
      "countyCode": "320111",
      "countyName": "浦口区" },
    {
      "countyCode": "320116",
      "countyName": "六合区" },
    {
      "countyCode": "320104",
      "countyName": "秦淮区" },
    {
      "countyCode": "320124",
      "countyName": "溧水区" },
    {
      "countyCode": "320125",
      "countyName": "高淳区" },
    {
      "countyCode": "320113",
      "countyName": "栖霞区" },
    {
      "countyCode": "320107",
      "countyName": "下关区" },
    {
      "countyCode": "320102",
      "countyName": "玄武区" },
    {
      "countyCode": "320105",
      "countyName": "建邺区" },
    {
      "countyCode": "320114",
      "countyName": "雨花台区" },
    {
      "countyCode": "320103",
      "countyName": "白下区" }] },

  {
    "cityCode": "321000",
    "cityName": "扬州市",
    "county": [{
      "countyCode": "321084",
      "countyName": "高邮市" },
    {
      "countyCode": "321023",
      "countyName": "宝应县" },
    {
      "countyCode": "321012",
      "countyName": "江都区" },
    {
      "countyCode": "321003",
      "countyName": "邗江区" },
    {
      "countyCode": "321081",
      "countyName": "仪征市" },
    {
      "countyCode": "321002",
      "countyName": "广陵区" }] },

  {
    "cityCode": "321300",
    "cityName": "宿迁市",
    "county": [{
      "countyCode": "321323",
      "countyName": "泗阳县" },
    {
      "countyCode": "321302",
      "countyName": "宿城区" },
    {
      "countyCode": "321311",
      "countyName": "宿豫区" },
    {
      "countyCode": "321324",
      "countyName": "泗洪县" },
    {
      "countyCode": "321322",
      "countyName": "沭阳县" }] }] },


{
  "provinceCode": "440000",
  "provinceName": "广东省",
  "city": [{
    "cityCode": "445100",
    "cityName": "潮州市",
    "county": [{
      "countyCode": "445123",
      "countyName": "潮安县" },
    {
      "countyCode": "445122",
      "countyName": "饶平县" },
    {
      "countyCode": "445121",
      "countyName": "潮安区" },
    {
      "countyCode": "445102",
      "countyName": "湘桥区" }] },

  {
    "cityCode": "441800",
    "cityName": "清远市",
    "county": [{
      "countyCode": "441802",
      "countyName": "清城区" },
    {
      "countyCode": "441825",
      "countyName": "连山壮族瑶族自治县" },
    {
      "countyCode": "441821",
      "countyName": "佛冈县" },
    {
      "countyCode": "441882",
      "countyName": "连州市" },
    {
      "countyCode": "441823",
      "countyName": "阳山县" },
    {
      "countyCode": "441826",
      "countyName": "连南瑶族自治县" },
    {
      "countyCode": "441827",
      "countyName": "清新区" },
    {
      "countyCode": "441881",
      "countyName": "英德市" }] },

  {
    "cityCode": "441300",
    "cityName": "惠州市",
    "county": [{
      "countyCode": "441303",
      "countyName": "惠阳区" },
    {
      "countyCode": "441322",
      "countyName": "博罗县" },
    {
      "countyCode": "441323",
      "countyName": "惠东县" },
    {
      "countyCode": "441324",
      "countyName": "龙门县" },
    {
      "countyCode": "441302",
      "countyName": "惠城区" }] },

  {
    "cityCode": "445200",
    "cityName": "揭阳市",
    "county": [{
      "countyCode": "445221",
      "countyName": "揭东区" },
    {
      "countyCode": "445224",
      "countyName": "惠来县" },
    {
      "countyCode": "445222",
      "countyName": "揭西县" },
    {
      "countyCode": "445281",
      "countyName": "普宁市" },
    {
      "countyCode": "445202",
      "countyName": "榕城区" }] },

  {
    "cityCode": "440300",
    "cityName": "深圳市",
    "county": [{
      "countyCode": "440303",
      "countyName": "罗湖区" },
    {
      "countyCode": "440306",
      "countyName": "宝安区" },
    {
      "countyCode": "440305",
      "countyName": "南山区" },
    {
      "countyCode": "440307",
      "countyName": "龙岗区" },
    {
      "countyCode": "440311",
      "countyName": "光明区" },
    {
      "countyCode": "440309",
      "countyName": "龙华区" },
    {
      "countyCode": "440308",
      "countyName": "盐田区" },
    {
      "countyCode": "440304",
      "countyName": "福田区" },
    {
      "countyCode": "440312",
      "countyName": "坪山区" },
    {
      "countyCode": "440313",
      "countyName": "大鹏新区" }] },

  {
    "cityCode": "441900",
    "cityName": "东莞市",
    "county": [{
      "countyCode": "441900-1",
      "countyName": "东莞市" }] },

  {
    "cityCode": "441400",
    "cityName": "梅州市",
    "county": [{
      "countyCode": "441422",
      "countyName": "大埔县" },
    {
      "countyCode": "441423",
      "countyName": "丰顺县" },
    {
      "countyCode": "441426",
      "countyName": "平远县" },
    {
      "countyCode": "441481",
      "countyName": "兴宁市" },
    {
      "countyCode": "441427",
      "countyName": "蕉岭县" },
    {
      "countyCode": "441421",
      "countyName": "梅县区" },
    {
      "countyCode": "441424",
      "countyName": "五华县" },
    {
      "countyCode": "441402",
      "countyName": "梅江区" }] },

  {
    "cityCode": "440500-1",
    "cityName": "汕头市",
    "county": [{
      "countyCode": "440515",
      "countyName": "澄海区" },
    {
      "countyCode": "440511",
      "countyName": "金平区" },
    {
      "countyCode": "440523",
      "countyName": "南澳县" },
    {
      "countyCode": "440513",
      "countyName": "潮阳区" },
    {
      "countyCode": "440514",
      "countyName": "潮南区" },
    {
      "countyCode": "440507",
      "countyName": "龙湖区" },
    {
      "countyCode": "440512",
      "countyName": "濠江区" }] },

  {
    "cityCode": "441600",
    "cityName": "河源市",
    "county": [{
      "countyCode": "441602",
      "countyName": "源城区" },
    {
      "countyCode": "441621",
      "countyName": "紫金县" },
    {
      "countyCode": "441624",
      "countyName": "和平县" },
    {
      "countyCode": "441622",
      "countyName": "龙川县" },
    {
      "countyCode": "441625",
      "countyName": "东源县" },
    {
      "countyCode": "441623",
      "countyName": "连平县" }] },

  {
    "cityCode": "445300",
    "cityName": "云浮市",
    "county": [{
      "countyCode": "445322",
      "countyName": "郁南县" },
    {
      "countyCode": "445381",
      "countyName": "罗定市" },
    {
      "countyCode": "445302",
      "countyName": "云城区" },
    {
      "countyCode": "445321",
      "countyName": "新兴县" },
    {
      "countyCode": "445323",
      "countyName": "云安区" }] },

  {
    "cityCode": "440400",
    "cityName": "珠海市",
    "county": [{
      "countyCode": "440404",
      "countyName": "金湾区" },
    {
      "countyCode": "440403",
      "countyName": "斗门区" },
    {
      "countyCode": "440402",
      "countyName": "香洲区" }] },

  {
    "cityCode": "440700",
    "cityName": "江门市",
    "county": [{
      "countyCode": "440785",
      "countyName": "恩平市" },
    {
      "countyCode": "440704",
      "countyName": "江海区" },
    {
      "countyCode": "440705",
      "countyName": "新会区" },
    {
      "countyCode": "440784",
      "countyName": "鹤山市" },
    {
      "countyCode": "440703",
      "countyName": "蓬江区" },
    {
      "countyCode": "440783",
      "countyName": "开平市" },
    {
      "countyCode": "440781",
      "countyName": "台山市" }] },

  {
    "cityCode": "441500",
    "cityName": "汕尾市",
    "county": [{
      "countyCode": "441523",
      "countyName": "陆河县" },
    {
      "countyCode": "441502",
      "countyName": "城区" },
    {
      "countyCode": "441581",
      "countyName": "陆丰市" },
    {
      "countyCode": "441521",
      "countyName": "海丰县" }] },

  {
    "cityCode": "441200",
    "cityName": "肇庆市",
    "county": [{
      "countyCode": "441203",
      "countyName": "鼎湖区" },
    {
      "countyCode": "441224",
      "countyName": "怀集县" },
    {
      "countyCode": "441283",
      "countyName": "高要区" },
    {
      "countyCode": "441284",
      "countyName": "四会市" },
    {
      "countyCode": "441202",
      "countyName": "端州区" },
    {
      "countyCode": "441225",
      "countyName": "封开县" },
    {
      "countyCode": "441226",
      "countyName": "德庆县" },
    {
      "countyCode": "441223",
      "countyName": "广宁县" }] },

  {
    "cityCode": "440200",
    "cityName": "韶关市",
    "county": [{
      "countyCode": "440222",
      "countyName": "始兴县" },
    {
      "countyCode": "440281",
      "countyName": "乐昌市" },
    {
      "countyCode": "440203",
      "countyName": "武江区" },
    {
      "countyCode": "440233",
      "countyName": "新丰县" },
    {
      "countyCode": "440224",
      "countyName": "仁化县" },
    {
      "countyCode": "440232",
      "countyName": "乳源瑶族自治县" },
    {
      "countyCode": "440229",
      "countyName": "翁源县" },
    {
      "countyCode": "440282",
      "countyName": "南雄市" },
    {
      "countyCode": "440205",
      "countyName": "曲江区" },
    {
      "countyCode": "440204",
      "countyName": "浈江区" }] },

  {
    "cityCode": "440600",
    "cityName": "佛山市",
    "county": [{
      "countyCode": "440606",
      "countyName": "顺德区" },
    {
      "countyCode": "440604",
      "countyName": "禅城区" },
    {
      "countyCode": "440607",
      "countyName": "三水区" },
    {
      "countyCode": "440608",
      "countyName": "高明区" },
    {
      "countyCode": "440605",
      "countyName": "南海区" }] },

  {
    "cityCode": "440100",
    "cityName": "广州市",
    "county": [{
      "countyCode": "440114",
      "countyName": "花都区" },
    {
      "countyCode": "440111",
      "countyName": "白云区" },
    {
      "countyCode": "440115",
      "countyName": "南沙区" },
    {
      "countyCode": "440113",
      "countyName": "番禺区" },
    {
      "countyCode": "440183",
      "countyName": "增城区" },
    {
      "countyCode": "440112",
      "countyName": "黄埔区" },
    {
      "countyCode": "440106",
      "countyName": "天河区" },
    {
      "countyCode": "440184",
      "countyName": "从化区" },
    {
      "countyCode": "440105",
      "countyName": "海珠区" },
    {
      "countyCode": "440103",
      "countyName": "荔湾区" },
    {
      "countyCode": "440104",
      "countyName": "越秀区" }] },

  {
    "cityCode": "442000",
    "cityName": "中山市",
    "county": [{
      "countyCode": "442000-1",
      "countyName": "中山市" }] },

  {
    "cityCode": "440800",
    "cityName": "湛江市",
    "county": [{
      "countyCode": "440881",
      "countyName": "廉江市" },
    {
      "countyCode": "440804",
      "countyName": "坡头区" },
    {
      "countyCode": "440882",
      "countyName": "雷州市" },
    {
      "countyCode": "440823",
      "countyName": "遂溪县" },
    {
      "countyCode": "440803",
      "countyName": "霞山区" },
    {
      "countyCode": "440825",
      "countyName": "徐闻县" },
    {
      "countyCode": "440802",
      "countyName": "赤坎区" },
    {
      "countyCode": "440811",
      "countyName": "麻章区" },
    {
      "countyCode": "440883",
      "countyName": "吴川市" }] },

  {
    "cityCode": "441700",
    "cityName": "阳江市",
    "county": [{
      "countyCode": "441781",
      "countyName": "阳春市" },
    {
      "countyCode": "441702",
      "countyName": "江城区" },
    {
      "countyCode": "441721",
      "countyName": "阳西县" },
    {
      "countyCode": "441723",
      "countyName": "阳东区" }] },

  {
    "cityCode": "440900",
    "cityName": "茂名市",
    "county": [{
      "countyCode": "440902",
      "countyName": "茂南区" },
    {
      "countyCode": "440923",
      "countyName": "电白区" },
    {
      "countyCode": "440982",
      "countyName": "化州市" },
    {
      "countyCode": "440903",
      "countyName": "茂港区 " },
    {
      "countyCode": "440981",
      "countyName": "高州市" },
    {
      "countyCode": "440983",
      "countyName": "信宜市" }] }] },


{
  "provinceCode": "810000",
  "provinceName": "香港特别行政区",
  "city": [{
    "cityCode": "810000-1",
    "cityName": "香港",
    "county": [{
      "countyCode": "810400",
      "countyName": "离岛" },
    {
      "countyCode": "810100",
      "countyName": "香港岛" },
    {
      "countyCode": "810300",
      "countyName": "新界" },
    {
      "countyCode": "810200",
      "countyName": "九龙" }] }] }];exports.default = _default;

/***/ }),

/***/ 76:
/*!*********************************************************************************************!*\
  !*** ./node_modules/@vue/babel-preset-app/node_modules/@babel/runtime/regenerator/index.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! regenerator-runtime */ 77);

/***/ }),

/***/ 767:
/*!***********************************************************!*\
  !*** D:/UAD/Jdt-zhcx/components/Order/uni-icons/icons.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = {
  "pulldown": "\uE588",
  "refreshempty": "\uE461",
  "back": "\uE471",
  "forward": "\uE470",
  "more": "\uE507",
  "more-filled": "\uE537",
  "scan": "\uE612",
  "qq": "\uE264",
  "weibo": "\uE260",
  "weixin": "\uE261",
  "pengyouquan": "\uE262",
  "loop": "\uE565",
  "refresh": "\uE407",
  "refresh-filled": "\uE437",
  "arrowthindown": "\uE585",
  "arrowthinleft": "\uE586",
  "arrowthinright": "\uE587",
  "arrowthinup": "\uE584",
  "undo-filled": "\uE7D6",
  "undo": "\uE406",
  "redo": "\uE405",
  "redo-filled": "\uE7D9",
  "bars": "\uE563",
  "chatboxes": "\uE203",
  "camera": "\uE301",
  "chatboxes-filled": "\uE233",
  "camera-filled": "\uE7EF",
  "cart-filled": "\uE7F4",
  "cart": "\uE7F5",
  "checkbox-filled": "\uE442",
  "checkbox": "\uE7FA",
  "arrowleft": "\uE582",
  "arrowdown": "\uE581",
  "arrowright": "\uE583",
  "smallcircle-filled": "\uE801",
  "arrowup": "\uE580",
  "circle": "\uE411",
  "eye-filled": "\uE568",
  "eye-slash-filled": "\uE822",
  "eye-slash": "\uE823",
  "eye": "\uE824",
  "flag-filled": "\uE825",
  "flag": "\uE508",
  "gear-filled": "\uE532",
  "reload": "\uE462",
  "gear": "\uE502",
  "hand-thumbsdown-filled": "\uE83B",
  "hand-thumbsdown": "\uE83C",
  "hand-thumbsup-filled": "\uE83D",
  "heart-filled": "\uE83E",
  "hand-thumbsup": "\uE83F",
  "heart": "\uE840",
  "home": "\uE500",
  "info": "\uE504",
  "home-filled": "\uE530",
  "info-filled": "\uE534",
  "circle-filled": "\uE441",
  "chat-filled": "\uE847",
  "chat": "\uE263",
  "mail-open-filled": "\uE84D",
  "email-filled": "\uE231",
  "mail-open": "\uE84E",
  "email": "\uE201",
  "checkmarkempty": "\uE472",
  "list": "\uE562",
  "locked-filled": "\uE856",
  "locked": "\uE506",
  "map-filled": "\uE85C",
  "map-pin": "\uE85E",
  "map-pin-ellipse": "\uE864",
  "map": "\uE364",
  "minus-filled": "\uE440",
  "mic-filled": "\uE332",
  "minus": "\uE410",
  "micoff": "\uE360",
  "mic": "\uE302",
  "clear": "\uE434",
  "smallcircle": "\uE868",
  "close": "\uE404",
  "closeempty": "\uE460",
  "paperclip": "\uE567",
  "paperplane": "\uE503",
  "paperplane-filled": "\uE86E",
  "person-filled": "\uE131",
  "contact-filled": "\uE130",
  "person": "\uE101",
  "contact": "\uE100",
  "images-filled": "\uE87A",
  "phone": "\uE200",
  "images": "\uE87B",
  "image": "\uE363",
  "image-filled": "\uE877",
  "location-filled": "\uE333",
  "location": "\uE303",
  "plus-filled": "\uE439",
  "plus": "\uE409",
  "plusempty": "\uE468",
  "help-filled": "\uE535",
  "help": "\uE505",
  "navigate-filled": "\uE884",
  "navigate": "\uE501",
  "mic-slash-filled": "\uE892",
  "search": "\uE466",
  "settings": "\uE560",
  "sound": "\uE590",
  "sound-filled": "\uE8A1",
  "spinner-cycle": "\uE465",
  "download-filled": "\uE8A4",
  "personadd-filled": "\uE132",
  "videocam-filled": "\uE8AF",
  "personadd": "\uE102",
  "upload": "\uE402",
  "upload-filled": "\uE8B1",
  "starhalf": "\uE463",
  "star-filled": "\uE438",
  "star": "\uE408",
  "trash": "\uE401",
  "phone-filled": "\uE230",
  "compose": "\uE400",
  "videocam": "\uE300",
  "trash-filled": "\uE8DC",
  "download": "\uE403",
  "chatbubble-filled": "\uE232",
  "chatbubble": "\uE202",
  "cloud-download": "\uE8E4",
  "cloud-upload-filled": "\uE8E5",
  "cloud-upload": "\uE8E6",
  "cloud-download-filled": "\uE8E9",
  "headphones": "\uE8BF",
  "shop": "\uE609" };exports.default = _default;

/***/ }),

/***/ 77:
/*!************************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime-module.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = (function() {
  return this || (typeof self === "object" && self);
})() || Function("return this")();

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = __webpack_require__(/*! ./runtime */ 78);

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}


/***/ }),

/***/ 78:
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() {
    return this || (typeof self === "object" && self);
  })() || Function("return this")()
);


/***/ }),

/***/ 79:
/*!*****************************************************************!*\
  !*** D:/UAD/Jdt-zhcx/components/GRZX/wfgo-getChina/getChina.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.pinyin = void 0;
/**
                                                                                                     * getChina
                                                                                                     * 根据省市的拼音获取对应的中文
                                                                                                     */
var province = [{ name: "beijing", cities: ["xicheng", "dongcheng", "chongwen", "xuanwu", "chaoyang", "haidian", "fengtai", "shijingshan", "mentougou", "fangshan", "tongzhou", "shunyi", "daxing", "changping", "pinggu", "huairou", "miyun", "yanqing"] },
{ name: "tianjin", cities: ["qingyang", "hedong", "hexi", "nankai", "hebei", "hongqiao", "tanggu", "hangu", "dagang", "dongli", "xiqing", "beichen", "jinnan", "wuqing", "baodi", "jinghai", "ninghe", "jixian", "kaifaqu"] },
{ name: "hebei", cities: ["shijiazhuang", "qinhuangdao", "langfang", "baoding", "handan", "tangshan", "xingtai", "hengshui", "zhangjiakou", "chengde", "cangzhou", "hengshui"] },
{ name: "shanxi", cities: ["taiyuan", "datong", "changzhi", "jinzhong", "yangquan", "shuozhou", "yuncheng", "linfen"] },
{ name: "namenggu", cities: ["huhehaote", "chifeng", "tongliao", "xilinguole", "xingan"] },
{ name: "liaoning", cities: ["dalian", "shenyang", "anshan", "fushun", "yingkou", "jinzhou", "dandong", "chaoyang", "liaoyang", "fuxin", "tieling", "panjin", "benxi", "huludao"] },
{ name: "jilin", cities: ["changchun", "jilin", "siping", "liaoyuan", "tonghua", "yanji", "baicheng", "liaoyuan", "songyuan", "linjiang", "huichun"] },
{ name: "heilongjiang", cities: ["haerbin", "qiqihaer", "daqing", "mudanjiang", "hegang", "jiamusi", "suihua"] },
{ name: "shanghai", cities: ["pudong", "yangpu", "xuhui", "jingan", "luwan", "huangpu", "putuo", "zhabei", "hongkou", "changning", "baoshan", "minxing", "jiading", "jinshan", "songjiang", "qingpu", "chongming", "fengxian", "nanhui"] },
{ name: "jiangsu", cities: ["nanjing", "suzhou", "wuxi", "changzhou", "yangzhou", "xuzhou", "nantong", "zhenjiang", "taizhou", "huaian", "lianyungang", "suqian", "yancheng", "huaiyin", "muyang", "zhangjiagang"] },
{ name: "zhejiang", cities: ["hangzhou", "jinhua", "ningbo", "wenzhou", "jiaxing", "shaoxing", "lishui", "huzhou", "taizhou", "zhoushan", "quzhou"] },
{ name: "anhui", cities: ["hefei", "maanshan", "bangbu", "huangshan", "wuhu", "huainan", "tongling", "fuyang", "xuancheng", "anqing"] },
{ name: "fujian", cities: ["fuzhou", "xiamen", "quanzhou", "zhangzhou", "nanping", "longyan", "putian", "sanming", "ningde"] },
{ name: "jiangxi", cities: ["nanchang", "jingdezhen", "shangrao", "pingxiang", "jiujiang", "jian", "yichun", "yingtan", "xinyu", "ganzhou"] },
{ name: "shandong", cities: ["qingdao", "jinan", "zibo", "yantai", "taian", "linyi", "rizhao", "dezhou", "weihai", "dongying", "heze", "jining", "weifang", "zaozhuang", "liaocheng"] },
{ name: "henan", cities: ["zhengzhou", "luoyang", "kaifeng", "pingdingshan", "puyang", "anyang", "xuchang", "nanyang", "xinyang", "zhoukou", "xinxiang", "jiaozuo", "sanmenxia", "shangqiu"] },
{ name: "hubei", cities: ["wuhan", "xiangfan", "xiaogan", "shiyan", "jingzhou", "huangshi", "yichang", "huanggang", "enshi", "ezhou", "jianghan", "suizao", "jingsha", "xianning"] },
{ name: "hunan", cities: ["changsha", "xiangtan", "yueyang", "zhuzhou", "huaihua", "yongzhou", "yiyang", "zhangjiajie", "changde", "hengyang", "xiangxi", "shaoyang", "loudi", "chenzhou"] },
{ name: "guangdong", cities: ["guangzhou", "shenzhen", "dongwan", "foshan", "zhuhai", "shantou", "shaoguan", "jiangmen", "meizhou", "jieyang", "zhongshan", "heyuan", "huizhou", "maoming", "zhanjiang", "yangjiang", "chaozhou", "yunfu", "shanwei", "chaoyang", "zhaoqing", "shunde", "qingyuan"] },
{ name: "guangxi", cities: ["nanning", "guilin", "liuzhou", "wuzhou", "laibin", "guigang", "yulin", "hezhou"] },
{ name: "hainan", cities: ["haikou", "sanya"] },
{ name: "zhongqing", cities: ["yuzhong", "dadukou", "jiangbei", "shapingba", "jiulongpo", "nanan", "beibei", "wansheng", "shuangqiao", "yubei", "banan", "wanzhou", "fuling", "qianjiang", "changshou"] },
{ name: "sichuan", cities: ["chengdou", "dazhou", "nanchong", "leshan", "mianyang", "deyang", "najiang", "suining", "yibin", "bazhong", "zigong", "kangding", "panzhihua"] },
{ name: "guizhou", cities: ["guiyang", "zunyi", "anshun", "qianxinan", "douyun"] },
{ name: "yunnan", cities: ["kunming", "lijiang", "zhaotong", "yuxi", "lincang", "wenshan", "honghe", "chuxiong", "dali"] },
{ name: "xicang", cities: ["lasa", "linzhi", "rikaze", "changdou"] },
{ name: "shanxi", cities: ["xian", "xianyang", "yanan", "hanzhong", "yulin", "shangnan", "lueyang", "yijun", "linyou", "baihe"] },
{ name: "gansu", cities: ["lanzhou", "jinchang", "tianshui", "wuwei", "zhangye", "pingliang", "jiuquan"] },
{ name: "qinghai", cities: ["huangnan", "hainan", "xining", "haidong", "haixi", "haibei", "guoluo", "yushu"] },
{ name: "ningxia", cities: ["yinchuan", "wuzhong"] },
{ name: "xinjiang", cities: ["wulumuqi", "hami", "kashi", "bayinguoleng", "changji", "yili", "aletai", "kelamayi", "boertala"] },
{ name: "xianggang", cities: ["zhongxiqu", "wanziqu", "dongqu", "nanqu", "jiulong-youjianwangqu", "jiulong-shenshuibuqu", "jiulong-jiulongchengqu", "jiulong-huangdaxianqu", "jiulong-guantangqu", "xinjie-beiqu", "xinjie-dapuqu", "xinjie-shatianqu", "xinjie-xigongqu", "xinjie-quanwanqu", "xinjie-tunmenqu", "xinjie-yuanlangqu", "xinjie-kuiqingqu", "xinjie-lidaoqu"] },
{ name: "aomen", cities: ["huadimatangqu", "shenganduonitangqu", "datangqu", "wangdetangqu", "fengshuntangqu", "jiamotangqu", "shengfangjigetangqu", "ludangcheng"] }];

var province2 = [{ name: "北京", cities: ["西城", "东城", "崇文", "宣武", "朝阳", "海淀", "丰台", "石景山", "门头沟", "房山", "通州", "顺义", "大兴", "昌平", "平谷", "怀柔", "密云", "延庆"] },
{ name: "天津", cities: ["青羊", "河东", "河西", "南开", "河北", "红桥", "塘沽", "汉沽", "大港", "东丽", "西青", "北辰", "津南", "武清", "宝坻", "静海", "宁河", "蓟县", "开发区"] },
{ name: "河北", cities: ["石家庄", "秦皇岛", "廊坊", "保定", "邯郸", "唐山", "邢台", "衡水", "张家口", "承德", "沧州", "衡水"] },
{ name: "山西", cities: ["太原", "大同", "长治", "晋中", "阳泉", "朔州", "运城", "临汾"] },
{ name: "内蒙古", cities: ["呼和浩特", "赤峰", "通辽", "锡林郭勒", "兴安"] },
{ name: "辽宁", cities: ["大连", "沈阳", "鞍山", "抚顺", "营口", "锦州", "丹东", "朝阳", "辽阳", "阜新", "铁岭", "盘锦", "本溪", "葫芦岛"] },
{ name: "吉林", cities: ["长春", "吉林", "四平", "辽源", "通化", "延吉", "白城", "辽源", "松原", "临江", "珲春"] },
{ name: "黑龙江", cities: ["哈尔滨", "齐齐哈尔", "大庆", "牡丹江", "鹤岗", "佳木斯", "绥化"] },
{ name: "上海", cities: ["浦东", "杨浦", "徐汇", "静安", "卢湾", "黄浦", "普陀", "闸北", "虹口", "长宁", "宝山", "闵行", "嘉定", "金山", "松江", "青浦", "崇明", "奉贤", "南汇"] },
{ name: "江苏", cities: ["南京", "苏州", "无锡", "常州", "扬州", "徐州", "南通", "镇江", "泰州", "淮安", "连云港", "宿迁", "盐城", "淮阴", "沐阳", "张家港"] },
{ name: "浙江", cities: ["杭州", "金华", "宁波", "温州", "嘉兴", "绍兴", "丽水", "湖州", "台州", "舟山", "衢州"] },
{ name: "安徽", cities: ["合肥", "马鞍山", "蚌埠", "黄山", "芜湖", "淮南", "铜陵", "阜阳", "宣城", "安庆"] },
{ name: "福建", cities: ["福州", "厦门", "泉州", "漳州", "南平", "龙岩", "莆田", "三明", "宁德"] },
{ name: "江西", cities: ["南昌", "景德镇", "上饶", "萍乡", "九江", "吉安", "宜春", "鹰潭", "新余", "赣州"] },
{ name: "山东", cities: ["青岛", "济南", "淄博", "烟台", "泰安", "临沂", "日照", "德州", "威海", "东营", "荷泽", "济宁", "潍坊", "枣庄", "聊城"] },
{ name: "河南", cities: ["郑州", "洛阳", "开封", "平顶山", "濮阳", "安阳", "许昌", "南阳", "信阳", "周口", "新乡", "焦作", "三门峡", "商丘"] },
{ name: "湖北", cities: ["武汉", "襄樊", "孝感", "十堰", "荆州", "黄石", "宜昌", "黄冈", "恩施", "鄂州", "江汉", "随枣", "荆沙", "咸宁"] },
{ name: "湖南", cities: ["长沙", "湘潭", "岳阳", "株洲", "怀化", "永州", "益阳", "张家界", "常德", "衡阳", "湘西", "邵阳", "娄底", "郴州"] },
{ name: "广东", cities: ["广州", "深圳", "东莞", "佛山", "珠海", "汕头", "韶关", "江门", "梅州", "揭阳", "中山", "河源", "惠州", "茂名", "湛江", "阳江", "潮州", "云浮", "汕尾", "潮阳", "肇庆", "顺德", "清远"] },
{ name: "广西", cities: ["南宁", "桂林", "柳州", "梧州", "来宾", "贵港", "玉林", "贺州"] },
{ name: "海南", cities: ["海口", "三亚"] },
{ name: "重庆", cities: ["渝中", "大渡口", "江北", "沙坪坝", "九龙坡", "南岸", "北碚", "万盛", "双桥", "渝北", "巴南", "万州", "涪陵", "黔江", "长寿"] },
{ name: "四川", cities: ["成都", "达州", "南充", "乐山", "绵阳", "德阳", "内江", "遂宁", "宜宾", "巴中", "自贡", "康定", "攀枝花"] },
{ name: "贵州", cities: ["贵阳", "遵义", "安顺", "黔西南", "都匀"] },
{ name: "云南", cities: ["昆明", "丽江", "昭通", "玉溪", "临沧", "文山", "红河", "楚雄", "大理"] },
{ name: "西藏", cities: ["拉萨", "林芝", "日喀则", "昌都"] },
{ name: "陕西", cities: ["西安", "咸阳", "延安", "汉中", "榆林", "商南", "略阳", "宜君", "麟游", "白河"] },
{ name: "甘肃", cities: ["兰州", "金昌", "天水", "武威", "张掖", "平凉", "酒泉"] },
{ name: "青海", cities: ["黄南", "海南", "西宁", "海东", "海西", "海北", "果洛", "玉树"] },
{ name: "宁夏", cities: ["银川", "吴忠"] },
{ name: "新疆", cities: ["乌鲁木齐", "哈密", "喀什", "巴音郭楞", "昌吉", "伊犁", "阿勒泰", "克拉玛依", "博尔塔拉"] },
{ name: "香港", cities: ["中西区", "湾仔区", "东区", "南区", "九龙-油尖旺区", "九龙-深水埗区", "九龙-九龙城区", "九龙-黄大仙区", "九龙-观塘区", "新界-北区", "新界-大埔区", "新界-沙田区", "新界-西贡区", "新界-荃湾区", "新界-屯门区", "新界-元朗区", "新界-葵青区", "新界-离岛区"] },
{ name: "澳门", cities: ["花地玛堂区", "圣安多尼堂区", "大堂区", "望德堂区", "风顺堂区", "嘉模堂区", "圣方济各堂区", "路氹城"] }];


var pinyin = function pinyin(strs) {
  var str = strs.toLowerCase();
  for (var i = 0; i < province.length; i++) {
    if (str == province[i].name) {
      return province2[i].name;
      // break;
    }
    for (var u = 0; u < province[i].cities.length; u++) {
      if (str == province[i].cities[u]) {
        return province2[i].cities[u];
        // break;
      }
    }
  }
  return '火星人';
};exports.pinyin = pinyin;

module.exports = {
  pinyin: pinyin };

/***/ }),

/***/ 8:
/*!**************************************************!*\
  !*** D:/UAD/Jdt-zhcx/pages.json?{"type":"stat"} ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = { "appid": "__UNI__7BBF03F" };exports.default = _default;

/***/ }),

/***/ 817:
/*!*********************************************************!*\
  !*** D:/UAD/Jdt-zhcx/components/CZC/uni-icons/icons.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = {
  "pulldown": "\uE588",
  "refreshempty": "\uE461",
  "back": "\uE471",
  "forward": "\uE470",
  "more": "\uE507",
  "more-filled": "\uE537",
  "scan": "\uE612",
  "qq": "\uE264",
  "weibo": "\uE260",
  "weixin": "\uE261",
  "pengyouquan": "\uE262",
  "loop": "\uE565",
  "refresh": "\uE407",
  "refresh-filled": "\uE437",
  "arrowthindown": "\uE585",
  "arrowthinleft": "\uE586",
  "arrowthinright": "\uE587",
  "arrowthinup": "\uE584",
  "undo-filled": "\uE7D6",
  "undo": "\uE406",
  "redo": "\uE405",
  "redo-filled": "\uE7D9",
  "bars": "\uE563",
  "chatboxes": "\uE203",
  "camera": "\uE301",
  "chatboxes-filled": "\uE233",
  "camera-filled": "\uE7EF",
  "cart-filled": "\uE7F4",
  "cart": "\uE7F5",
  "checkbox-filled": "\uE442",
  "checkbox": "\uE7FA",
  "arrowleft": "\uE582",
  "arrowdown": "\uE581",
  "arrowright": "\uE583",
  "smallcircle-filled": "\uE801",
  "arrowup": "\uE580",
  "circle": "\uE411",
  "eye-filled": "\uE568",
  "eye-slash-filled": "\uE822",
  "eye-slash": "\uE823",
  "eye": "\uE824",
  "flag-filled": "\uE825",
  "flag": "\uE508",
  "gear-filled": "\uE532",
  "reload": "\uE462",
  "gear": "\uE502",
  "hand-thumbsdown-filled": "\uE83B",
  "hand-thumbsdown": "\uE83C",
  "hand-thumbsup-filled": "\uE83D",
  "heart-filled": "\uE83E",
  "hand-thumbsup": "\uE83F",
  "heart": "\uE840",
  "home": "\uE500",
  "info": "\uE504",
  "home-filled": "\uE530",
  "info-filled": "\uE534",
  "circle-filled": "\uE441",
  "chat-filled": "\uE847",
  "chat": "\uE263",
  "mail-open-filled": "\uE84D",
  "email-filled": "\uE231",
  "mail-open": "\uE84E",
  "email": "\uE201",
  "checkmarkempty": "\uE472",
  "list": "\uE562",
  "locked-filled": "\uE856",
  "locked": "\uE506",
  "map-filled": "\uE85C",
  "map-pin": "\uE85E",
  "map-pin-ellipse": "\uE864",
  "map": "\uE364",
  "minus-filled": "\uE440",
  "mic-filled": "\uE332",
  "minus": "\uE410",
  "micoff": "\uE360",
  "mic": "\uE302",
  "clear": "\uE434",
  "smallcircle": "\uE868",
  "close": "\uE404",
  "closeempty": "\uE460",
  "paperclip": "\uE567",
  "paperplane": "\uE503",
  "paperplane-filled": "\uE86E",
  "person-filled": "\uE131",
  "contact-filled": "\uE130",
  "person": "\uE101",
  "contact": "\uE100",
  "images-filled": "\uE87A",
  "phone": "\uE200",
  "images": "\uE87B",
  "image": "\uE363",
  "image-filled": "\uE877",
  "location-filled": "\uE333",
  "location": "\uE303",
  "plus-filled": "\uE439",
  "plus": "\uE409",
  "plusempty": "\uE468",
  "help-filled": "\uE535",
  "help": "\uE505",
  "navigate-filled": "\uE884",
  "navigate": "\uE501",
  "mic-slash-filled": "\uE892",
  "search": "\uE466",
  "settings": "\uE560",
  "sound": "\uE590",
  "sound-filled": "\uE8A1",
  "spinner-cycle": "\uE465",
  "download-filled": "\uE8A4",
  "personadd-filled": "\uE132",
  "videocam-filled": "\uE8AF",
  "personadd": "\uE102",
  "upload": "\uE402",
  "upload-filled": "\uE8B1",
  "starhalf": "\uE463",
  "star-filled": "\uE438",
  "star": "\uE408",
  "trash": "\uE401",
  "phone-filled": "\uE230",
  "compose": "\uE400",
  "videocam": "\uE300",
  "trash-filled": "\uE8DC",
  "download": "\uE403",
  "chatbubble-filled": "\uE232",
  "chatbubble": "\uE202",
  "cloud-download": "\uE8E4",
  "cloud-upload-filled": "\uE8E5",
  "cloud-upload": "\uE8E6",
  "cloud-download-filled": "\uE8E9",
  "headphones": "\uE8BF",
  "shop": "\uE609" };exports.default = _default;

/***/ }),

/***/ 825:
/*!************************************************************!*\
  !*** D:/UAD/Jdt-zhcx/components/HOME/uni-location/city.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * Created by dianwoda on 2019/3/28.
                                                                                                      * // A B C D E F G H I J K L M N O P Q R S T U V W X Y Z
                                                                                                         // { cityName: '', pinYin: '', py: '', code: '', airName: ''},
                                                                                                      */var _default =
{
  hotCity: [
  { cityName: '北京', pinYin: 'beijing', py: 'bj', code: 'PEK' },
  { cityName: '上海', pinYin: 'shanghai', py: 'sh', code: 'SHA' },
  { cityName: '天津', pinYin: 'tianjin', py: 'tj', code: 'TSN' },
  { cityName: '青岛', pinYin: 'qingdao', py: 'qd', code: 'TAO' },
  { cityName: '南京', pinYin: 'nanjing', py: 'nj', code: 'NKG' },
  { cityName: '杭州', pinYin: 'hangzhou', py: 'hz', code: 'HGH' },
  { cityName: '厦门', pinYin: 'xiamen', py: 'xm', code: 'XMN' },
  { cityName: '成都', pinYin: 'chengdu', py: 'cd', code: 'CTU' },
  { cityName: '深圳', pinYin: 'shenzhen', py: 'sz', code: 'SZX' },
  { cityName: '广州', pinYin: 'guangzhou', py: 'gz', code: 'CAN' },
  { cityName: '沈阳', pinYin: 'shenyang', py: 'sy', code: 'SHE' },
  { cityName: '武汉', pinYin: 'wuhan', py: 'wh', code: 'WUH' }],

  cities: [{
    "cityName": "厦门市",
    "pinyin": "xiamenshi",
    "py": "xms",
    "code": "XMS" },
  {
    "cityName": "龙岩市",
    "pinyin": "longyanshi",
    "py": "lys",
    "code": "LYS" },
  {
    "cityName": "南平市",
    "pinyin": "nanpingshi",
    "py": "np",
    "code": "NPS" },
  {
    "cityName": "宁德市",
    "pinyin": "ningdeshi",
    "py": "nds",
    "code": "NDS" },
  {
    "cityName": "莆田市",
    "pinyin": "putianshi",
    "py": "pts",
    "code": "PTS" },
  {
    "cityName": "泉州市",
    "pinyin": "quanzhoushi",
    "py": "qzs",
    "code": "QZS" },
  {
    "cityName": "三明市",
    "pinyin": "sanmingshi",
    "py": "sms",
    "code": "SMS" },
  {
    "cityName": "福州市",
    "pinyin": "fuzhoushi",
    "py": "fzs",
    "code": "FZS" },
  {
    "cityName": "漳州市",
    "pinyin": "zhangzhoushi",
    "py": "zss",
    "code": "ZSS" }] };exports.default = _default;

/***/ }),

/***/ 826:
/*!********************************************************************!*\
  !*** D:/UAD/Jdt-zhcx/components/HOME/uni-location/amap/amap-wx.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function AMapWX(a) {this.key = a.key, this.requestConfig = { key: a.key, s: "rsx", platform: "WXJS", appname: a.key, sdkversion: "1.2.0", logversion: "2.0" };}AMapWX.prototype.getWxLocation = function (a, b) {wx.getLocation({ type: "gcj02", success: function success(a) {var c = a.longitude + "," + a.latitude;wx.setStorage({ key: "userLocation", data: c }), b(c);}, fail: function fail(c) {wx.getStorage({ key: "userLocation", success: function success(a) {a.data && b(a.data);} }), a.fail({ errCode: "0", errMsg: c.errMsg || "" });} });}, AMapWX.prototype.getRegeo = function (a) {function c(c) {var d = b.requestConfig;wx.request({ url: "https://restapi.amap.com/v3/geocode/regeo", data: { key: b.key, location: c, extensions: "all", s: d.s, platform: d.platform, appname: b.key, sdkversion: d.sdkversion, logversion: d.logversion }, method: "GET", header: { "content-type": "application/json" }, success: function success(b) {var d, e, f, g, h, i, j, k, l;b.data.status && "1" == b.data.status ? (d = b.data.regeocode, e = d.addressComponent, f = [], g = "", d && d.roads[0] && d.roads[0].name && (g = d.roads[0].name + "附近"), h = c.split(",")[0], i = c.split(",")[1], d.pois && d.pois[0] && (g = d.pois[0].name + "附近", j = d.pois[0].location, j && (h = parseFloat(j.split(",")[0]), i = parseFloat(j.split(",")[1]))), e.provice && f.push(e.provice), e.city && f.push(e.city), e.district && f.push(e.district), e.streetNumber && e.streetNumber.street && e.streetNumber.number ? (f.push(e.streetNumber.street), f.push(e.streetNumber.number)) : (k = "", d && d.roads[0] && d.roads[0].name && (k = d.roads[0].name), f.push(k)), f = f.join(""), l = [{ iconPath: a.iconPath, width: a.iconWidth, height: a.iconHeight, name: f, desc: g, longitude: h, latitude: i, id: 0, regeocodeData: d }], a.success(l)) : a.fail({ errCode: b.data.infocode, errMsg: b.data.info });}, fail: function fail(b) {a.fail({ errCode: "0", errMsg: b.errMsg || "" });} });}var b = this;a.location ? c(a.location) : b.getWxLocation(a, function (a) {c(a);});}, AMapWX.prototype.getWeather = function (a) {function d(d) {var e = "base";a.type && "forecast" == a.type && (e = "all"), wx.request({ url: "https://restapi.amap.com/v3/weather/weatherInfo", data: { key: b.key, city: d, extensions: e, s: c.s, platform: c.platform, appname: b.key, sdkversion: c.sdkversion, logversion: c.logversion }, method: "GET", header: { "content-type": "application/json" }, success: function success(b) {function c(a) {var b = { city: { text: "城市", data: a.city }, weather: { text: "天气", data: a.weather }, temperature: { text: "温度", data: a.temperature }, winddirection: { text: "风向", data: a.winddirection + "风" }, windpower: { text: "风力", data: a.windpower + "级" }, humidity: { text: "湿度", data: a.humidity + "%" } };return b;}var d, e;b.data.status && "1" == b.data.status ? b.data.lives ? (d = b.data.lives, d && d.length > 0 && (d = d[0], e = c(d), e["liveData"] = d, a.success(e))) : b.data.forecasts && b.data.forecasts[0] && a.success({ forecast: b.data.forecasts[0] }) : a.fail({ errCode: b.data.infocode, errMsg: b.data.info });}, fail: function fail(b) {a.fail({ errCode: "0", errMsg: b.errMsg || "" });} });}function e(e) {wx.request({ url: "https://restapi.amap.com/v3/geocode/regeo", data: { key: b.key, location: e, extensions: "all", s: c.s, platform: c.platform, appname: b.key, sdkversion: c.sdkversion, logversion: c.logversion }, method: "GET", header: { "content-type": "application/json" }, success: function success(b) {var c, e;b.data.status && "1" == b.data.status ? (e = b.data.regeocode, e.addressComponent ? c = e.addressComponent.adcode : e.aois && e.aois.length > 0 && (c = e.aois[0].adcode), d(c)) : a.fail({ errCode: b.data.infocode, errMsg: b.data.info });}, fail: function fail(b) {a.fail({ errCode: "0", errMsg: b.errMsg || "" });} });}var b = this,c = b.requestConfig;a.city ? d(a.city) : b.getWxLocation(a, function (a) {e(a);});}, AMapWX.prototype.getPoiAround = function (a) {function d(d) {var e = { key: b.key, location: d, s: c.s, platform: c.platform, appname: b.key, sdkversion: c.sdkversion, logversion: c.logversion };a.querytypes && (e["types"] = a.querytypes), a.querykeywords && (e["keywords"] = a.querykeywords), wx.request({ url: "https://restapi.amap.com/v3/place/around", data: e, method: "GET", header: { "content-type": "application/json" }, success: function success(b) {var c, d, e, f;if (b.data.status && "1" == b.data.status) {if (b = b.data, b && b.pois) {for (c = [], d = 0; d < b.pois.length; d++) {e = 0 == d ? a.iconPathSelected : a.iconPath, c.push({ latitude: parseFloat(b.pois[d].location.split(",")[1]), longitude: parseFloat(b.pois[d].location.split(",")[0]), iconPath: e, width: 22, height: 32, id: d, name: b.pois[d].name, address: b.pois[d].address });}f = { markers: c, poisData: b.pois }, a.success(f);}} else a.fail({ errCode: b.data.infocode, errMsg: b.data.info });}, fail: function fail(b) {a.fail({ errCode: "0", errMsg: b.errMsg || "" });} });}var b = this,c = b.requestConfig;a.location ? d(a.location) : b.getWxLocation(a, function (a) {d(a);});}, AMapWX.prototype.getStaticmap = function (a) {function f(b) {c.push("location=" + b), a.zoom && c.push("zoom=" + a.zoom), a.size && c.push("size=" + a.size), a.scale && c.push("scale=" + a.scale), a.markers && c.push("markers=" + a.markers), a.labels && c.push("labels=" + a.labels), a.paths && c.push("paths=" + a.paths), a.traffic && c.push("traffic=" + a.traffic);var e = d + c.join("&");a.success({ url: e });}var e,b = this,c = [],d = "https://restapi.amap.com/v3/staticmap?";c.push("key=" + b.key), e = b.requestConfig, c.push("s=" + e.s), c.push("platform=" + e.platform), c.push("appname=" + e.appname), c.push("sdkversion=" + e.sdkversion), c.push("logversion=" + e.logversion), a.location ? f(a.location) : b.getWxLocation(a, function (a) {f(a);});}, AMapWX.prototype.getInputtips = function (a) {var b = this,c = b.requestConfig,d = { key: b.key, s: c.s, platform: c.platform, appname: b.key, sdkversion: c.sdkversion, logversion: c.logversion };a.location && (d["location"] = a.location), a.keywords && (d["keywords"] = a.keywords), a.type && (d["type"] = a.type), a.city && (d["city"] = a.city), a.citylimit && (d["citylimit"] = a.citylimit), wx.request({ url: "https://restapi.amap.com/v3/assistant/inputtips", data: d, method: "GET", header: { "content-type": "application/json" }, success: function success(b) {b && b.data && b.data.tips && a.success({ tips: b.data.tips });}, fail: function fail(b) {a.fail({ errCode: "0", errMsg: b.errMsg || "" });} });}, AMapWX.prototype.getDrivingRoute = function (a) {var b = this,c = b.requestConfig,d = { key: b.key, s: c.s, platform: c.platform, appname: b.key, sdkversion: c.sdkversion, logversion: c.logversion };a.origin && (d["origin"] = a.origin), a.destination && (d["destination"] = a.destination), a.strategy && (d["strategy"] = a.strategy), a.waypoints && (d["waypoints"] = a.waypoints), a.avoidpolygons && (d["avoidpolygons"] = a.avoidpolygons), a.avoidroad && (d["avoidroad"] = a.avoidroad), wx.request({ url: "https://restapi.amap.com/v3/direction/driving", data: d, method: "GET", header: { "content-type": "application/json" }, success: function success(b) {b && b.data && b.data.route && a.success({ paths: b.data.route.paths, taxi_cost: b.data.route.taxi_cost || "" });}, fail: function fail(b) {a.fail({ errCode: "0", errMsg: b.errMsg || "" });} });}, AMapWX.prototype.getWalkingRoute = function (a) {var b = this,c = b.requestConfig,d = { key: b.key, s: c.s, platform: c.platform, appname: b.key, sdkversion: c.sdkversion, logversion: c.logversion };a.origin && (d["origin"] = a.origin), a.destination && (d["destination"] = a.destination), wx.request({ url: "https://restapi.amap.com/v3/direction/walking", data: d, method: "GET", header: { "content-type": "application/json" }, success: function success(b) {b && b.data && b.data.route && a.success({ paths: b.data.route.paths });}, fail: function fail(b) {a.fail({ errCode: "0", errMsg: b.errMsg || "" });} });}, AMapWX.prototype.getTransitRoute = function (a) {var b = this,c = b.requestConfig,d = { key: b.key, s: c.s, platform: c.platform, appname: b.key, sdkversion: c.sdkversion, logversion: c.logversion };a.origin && (d["origin"] = a.origin), a.destination && (d["destination"] = a.destination), a.strategy && (d["strategy"] = a.strategy), a.city && (d["city"] = a.city), a.cityd && (d["cityd"] = a.cityd), wx.request({ url: "https://restapi.amap.com/v3/direction/transit/integrated", data: d, method: "GET", header: { "content-type": "application/json" }, success: function success(b) {if (b && b.data && b.data.route) {var c = b.data.route;a.success({ distance: c.distance || "", taxi_cost: c.taxi_cost || "", transits: c.transits });}}, fail: function fail(b) {a.fail({ errCode: "0", errMsg: b.errMsg || "" });} });}, AMapWX.prototype.getRidingRoute = function (a) {var b = this,c = b.requestConfig,d = { key: b.key, s: c.s, platform: c.platform, appname: b.key, sdkversion: c.sdkversion, logversion: c.logversion };a.origin && (d["origin"] = a.origin), a.destination && (d["destination"] = a.destination), wx.request({ url: "https://restapi.amap.com/v4/direction/bicycling", data: d, method: "GET", header: { "content-type": "application/json" }, success: function success(b) {b && b.data && b.data.data && a.success({ paths: b.data.data.paths });}, fail: function fail(b) {a.fail({ errCode: "0", errMsg: b.errMsg || "" });} });}, module.exports.AMapWX = AMapWX;

/***/ }),

/***/ 848:
/*!**********************************************************************!*\
  !*** D:/UAD/Jdt-zhcx/components/LYFW/ouristRoute/uni-icons/icons.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = {
  "pulldown": "\uE588",
  "refreshempty": "\uE461",
  "back": "\uE471",
  "forward": "\uE470",
  "more": "\uE507",
  "more-filled": "\uE537",
  "scan": "\uE612",
  "qq": "\uE264",
  "weibo": "\uE260",
  "weixin": "\uE261",
  "pengyouquan": "\uE262",
  "loop": "\uE565",
  "refresh": "\uE407",
  "refresh-filled": "\uE437",
  "arrowthindown": "\uE585",
  "arrowthinleft": "\uE586",
  "arrowthinright": "\uE587",
  "arrowthinup": "\uE584",
  "undo-filled": "\uE7D6",
  "undo": "\uE406",
  "redo": "\uE405",
  "redo-filled": "\uE7D9",
  "bars": "\uE563",
  "chatboxes": "\uE203",
  "camera": "\uE301",
  "chatboxes-filled": "\uE233",
  "camera-filled": "\uE7EF",
  "cart-filled": "\uE7F4",
  "cart": "\uE7F5",
  "checkbox-filled": "\uE442",
  "checkbox": "\uE7FA",
  "arrowleft": "\uE582",
  "arrowdown": "\uE581",
  "arrowright": "\uE583",
  "smallcircle-filled": "\uE801",
  "arrowup": "\uE580",
  "circle": "\uE411",
  "eye-filled": "\uE568",
  "eye-slash-filled": "\uE822",
  "eye-slash": "\uE823",
  "eye": "\uE824",
  "flag-filled": "\uE825",
  "flag": "\uE508",
  "gear-filled": "\uE532",
  "reload": "\uE462",
  "gear": "\uE502",
  "hand-thumbsdown-filled": "\uE83B",
  "hand-thumbsdown": "\uE83C",
  "hand-thumbsup-filled": "\uE83D",
  "heart-filled": "\uE83E",
  "hand-thumbsup": "\uE83F",
  "heart": "\uE840",
  "home": "\uE500",
  "info": "\uE504",
  "home-filled": "\uE530",
  "info-filled": "\uE534",
  "circle-filled": "\uE441",
  "chat-filled": "\uE847",
  "chat": "\uE263",
  "mail-open-filled": "\uE84D",
  "email-filled": "\uE231",
  "mail-open": "\uE84E",
  "email": "\uE201",
  "checkmarkempty": "\uE472",
  "list": "\uE562",
  "locked-filled": "\uE856",
  "locked": "\uE506",
  "map-filled": "\uE85C",
  "map-pin": "\uE85E",
  "map-pin-ellipse": "\uE864",
  "map": "\uE364",
  "minus-filled": "\uE440",
  "mic-filled": "\uE332",
  "minus": "\uE410",
  "micoff": "\uE360",
  "mic": "\uE302",
  "clear": "\uE434",
  "smallcircle": "\uE868",
  "close": "\uE404",
  "closeempty": "\uE460",
  "paperclip": "\uE567",
  "paperplane": "\uE503",
  "paperplane-filled": "\uE86E",
  "person-filled": "\uE131",
  "contact-filled": "\uE130",
  "person": "\uE101",
  "contact": "\uE100",
  "images-filled": "\uE87A",
  "phone": "\uE200",
  "images": "\uE87B",
  "image": "\uE363",
  "image-filled": "\uE877",
  "location-filled": "\uE333",
  "location": "\uE303",
  "plus-filled": "\uE439",
  "plus": "\uE409",
  "plusempty": "\uE468",
  "help-filled": "\uE535",
  "help": "\uE505",
  "navigate-filled": "\uE884",
  "navigate": "\uE501",
  "mic-slash-filled": "\uE892",
  "search": "\uE466",
  "settings": "\uE560",
  "sound": "\uE590",
  "sound-filled": "\uE8A1",
  "spinner-cycle": "\uE465",
  "download-filled": "\uE8A4",
  "personadd-filled": "\uE132",
  "videocam-filled": "\uE8AF",
  "personadd": "\uE102",
  "upload": "\uE402",
  "upload-filled": "\uE8B1",
  "starhalf": "\uE463",
  "star-filled": "\uE438",
  "star": "\uE408",
  "trash": "\uE401",
  "phone-filled": "\uE230",
  "compose": "\uE400",
  "videocam": "\uE300",
  "trash-filled": "\uE8DC",
  "download": "\uE403",
  "chatbubble-filled": "\uE232",
  "chatbubble": "\uE202",
  "cloud-download": "\uE8E4",
  "cloud-upload-filled": "\uE8E5",
  "cloud-upload": "\uE8E6",
  "cloud-download-filled": "\uE8E9",
  "headphones": "\uE8BF",
  "shop": "\uE609" };exports.default = _default;

/***/ }),

/***/ 863:
/*!*********************************************************************!*\
  !*** D:/UAD/Jdt-zhcx/components/Order/StarJudge/uni-icons/icons.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = {
  'contact': "\uE100",
  'person': "\uE101",
  'personadd': "\uE102",
  'contact-filled': "\uE130",
  'person-filled': "\uE131",
  'personadd-filled': "\uE132",
  'phone': "\uE200",
  'email': "\uE201",
  'chatbubble': "\uE202",
  'chatboxes': "\uE203",
  'phone-filled': "\uE230",
  'email-filled': "\uE231",
  'chatbubble-filled': "\uE232",
  'chatboxes-filled': "\uE233",
  'weibo': "\uE260",
  'weixin': "\uE261",
  'pengyouquan': "\uE262",
  'chat': "\uE263",
  'qq': "\uE264",
  'videocam': "\uE300",
  'camera': "\uE301",
  'mic': "\uE302",
  'location': "\uE303",
  'mic-filled': "\uE332",
  'speech': "\uE332",
  'location-filled': "\uE333",
  'micoff': "\uE360",
  'image': "\uE363",
  'map': "\uE364",
  'compose': "\uE400",
  'trash': "\uE401",
  'upload': "\uE402",
  'download': "\uE403",
  'close': "\uE404",
  'redo': "\uE405",
  'undo': "\uE406",
  'refresh': "\uE407",
  'star': "\uE408",
  'plus': "\uE409",
  'minus': "\uE410",
  'circle': "\uE411",
  'checkbox': "\uE411",
  'close-filled': "\uE434",
  'clear': "\uE434",
  'refresh-filled': "\uE437",
  'star-filled': "\uE438",
  'plus-filled': "\uE439",
  'minus-filled': "\uE440",
  'circle-filled': "\uE441",
  'checkbox-filled': "\uE442",
  'closeempty': "\uE460",
  'refreshempty': "\uE461",
  'reload': "\uE462",
  'starhalf': "\uE463",
  'spinner': "\uE464",
  'spinner-cycle': "\uE465",
  'search': "\uE466",
  'plusempty': "\uE468",
  'forward': "\uE470",
  'back': "\uE471",
  'left-nav': "\uE471",
  'checkmarkempty': "\uE472",
  'home': "\uE500",
  'navigate': "\uE501",
  'gear': "\uE502",
  'paperplane': "\uE503",
  'info': "\uE504",
  'help': "\uE505",
  'locked': "\uE506",
  'more': "\uE507",
  'flag': "\uE508",
  'home-filled': "\uE530",
  'gear-filled': "\uE532",
  'info-filled': "\uE534",
  'help-filled': "\uE535",
  'more-filled': "\uE537",
  'settings': "\uE560",
  'list': "\uE562",
  'bars': "\uE563",
  'loop': "\uE565",
  'paperclip': "\uE567",
  'eye': "\uE568",
  'arrowup': "\uE580",
  'arrowdown': "\uE581",
  'arrowleft': "\uE582",
  'arrowright': "\uE583",
  'arrowthinup': "\uE584",
  'arrowthindown': "\uE585",
  'arrowthinleft': "\uE586",
  'arrowthinright': "\uE587",
  'pulldown': "\uE588",
  'closefill': "\uE589",
  'sound': "\uE590",
  'scan': "\uE612" };exports.default = _default;

/***/ }),

/***/ 878:
/*!********************************************************************!*\
  !*** D:/UAD/Jdt-zhcx/components/CTKY/StarJudge/uni-icons/icons.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = {
  'contact': "\uE100",
  'person': "\uE101",
  'personadd': "\uE102",
  'contact-filled': "\uE130",
  'person-filled': "\uE131",
  'personadd-filled': "\uE132",
  'phone': "\uE200",
  'email': "\uE201",
  'chatbubble': "\uE202",
  'chatboxes': "\uE203",
  'phone-filled': "\uE230",
  'email-filled': "\uE231",
  'chatbubble-filled': "\uE232",
  'chatboxes-filled': "\uE233",
  'weibo': "\uE260",
  'weixin': "\uE261",
  'pengyouquan': "\uE262",
  'chat': "\uE263",
  'qq': "\uE264",
  'videocam': "\uE300",
  'camera': "\uE301",
  'mic': "\uE302",
  'location': "\uE303",
  'mic-filled': "\uE332",
  'speech': "\uE332",
  'location-filled': "\uE333",
  'micoff': "\uE360",
  'image': "\uE363",
  'map': "\uE364",
  'compose': "\uE400",
  'trash': "\uE401",
  'upload': "\uE402",
  'download': "\uE403",
  'close': "\uE404",
  'redo': "\uE405",
  'undo': "\uE406",
  'refresh': "\uE407",
  'star': "\uE408",
  'plus': "\uE409",
  'minus': "\uE410",
  'circle': "\uE411",
  'checkbox': "\uE411",
  'close-filled': "\uE434",
  'clear': "\uE434",
  'refresh-filled': "\uE437",
  'star-filled': "\uE438",
  'plus-filled': "\uE439",
  'minus-filled': "\uE440",
  'circle-filled': "\uE441",
  'checkbox-filled': "\uE442",
  'closeempty': "\uE460",
  'refreshempty': "\uE461",
  'reload': "\uE462",
  'starhalf': "\uE463",
  'spinner': "\uE464",
  'spinner-cycle': "\uE465",
  'search': "\uE466",
  'plusempty': "\uE468",
  'forward': "\uE470",
  'back': "\uE471",
  'left-nav': "\uE471",
  'checkmarkempty': "\uE472",
  'home': "\uE500",
  'navigate': "\uE501",
  'gear': "\uE502",
  'paperplane': "\uE503",
  'info': "\uE504",
  'help': "\uE505",
  'locked': "\uE506",
  'more': "\uE507",
  'flag': "\uE508",
  'home-filled': "\uE530",
  'gear-filled': "\uE532",
  'info-filled': "\uE534",
  'help-filled': "\uE535",
  'more-filled': "\uE537",
  'settings': "\uE560",
  'list': "\uE562",
  'bars': "\uE563",
  'loop': "\uE565",
  'paperclip': "\uE567",
  'eye': "\uE568",
  'arrowup': "\uE580",
  'arrowdown': "\uE581",
  'arrowleft': "\uE582",
  'arrowright': "\uE583",
  'arrowthinup': "\uE584",
  'arrowthindown': "\uE585",
  'arrowthinleft': "\uE586",
  'arrowthinright': "\uE587",
  'pulldown': "\uE588",
  'closefill': "\uE589",
  'sound': "\uE590",
  'scan': "\uE612" };exports.default = _default;

/***/ })

}]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map