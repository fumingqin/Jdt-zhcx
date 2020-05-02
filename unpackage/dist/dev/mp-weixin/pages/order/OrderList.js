(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pages/order/OrderList"],{

/***/ 127:
/*!********************************************************************!*\
  !*** D:/UAD/Jdt-zhcx/main.js?{"page":"pages%2Forder%2FOrderList"} ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ 4);__webpack_require__(/*! @dcloudio/uni-stat */ 5);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));
var _OrderList = _interopRequireDefault(__webpack_require__(/*! ./pages/order/OrderList.vue */ 128));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_OrderList.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["createPage"]))

/***/ }),

/***/ 128:
/*!*************************************************!*\
  !*** D:/UAD/Jdt-zhcx/pages/order/OrderList.vue ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _OrderList_vue_vue_type_template_id_4005de4c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./OrderList.vue?vue&type=template&id=4005de4c& */ 129);
/* harmony import */ var _OrderList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./OrderList.vue?vue&type=script&lang=js& */ 131);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _OrderList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _OrderList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _OrderList_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./OrderList.vue?vue&type=style&index=0&lang=scss& */ 135);
/* harmony import */ var _Software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../Software/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 17);

var renderjs





/* normalize component */

var component = Object(_Software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _OrderList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _OrderList_vue_vue_type_template_id_4005de4c___WEBPACK_IMPORTED_MODULE_0__["render"],
  _OrderList_vue_vue_type_template_id_4005de4c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null,
  false,
  _OrderList_vue_vue_type_template_id_4005de4c___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "UAD/Jdt-zhcx/pages/order/OrderList.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 129:
/*!********************************************************************************!*\
  !*** D:/UAD/Jdt-zhcx/pages/order/OrderList.vue?vue&type=template&id=4005de4c& ***!
  \********************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_Software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_Software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_Software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_OrderList_vue_vue_type_template_id_4005de4c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../Software/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../Software/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!../../../../Software/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!../../../../Software/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!../../../../Software/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../Software/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./OrderList.vue?vue&type=template&id=4005de4c& */ 130);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _Software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_Software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_Software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_Software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_OrderList_vue_vue_type_template_id_4005de4c___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _Software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_Software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_Software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_Software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_OrderList_vue_vue_type_template_id_4005de4c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _Software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_Software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_Software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_Software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_OrderList_vue_vue_type_template_id_4005de4c___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _Software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_Software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_Software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_Software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_OrderList_vue_vue_type_template_id_4005de4c___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 130:
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/UAD/Jdt-zhcx/pages/order/OrderList.vue?vue&type=template&id=4005de4c& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return recyclableRender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "components", function() { return components; });
var components
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  var l0 = _vm.__map(_vm.info, function(item, index) {
    var m0 = _vm.changeTime(item.appointmentTime)
    var m1 = _vm.changeTime(item.appointmentTime)
    var m2 = _vm.taxiOrderState(item.state)
    var m3 = _vm.changeTime(item.orderTime)
    var m4 = _vm.taxiOrderState(item.state)
    var m5 = _vm.taxiOrderState(item.state)
    var m6 = _vm.taxiOrderState(item.state)
    var m7 = _vm.taxiOrderState(item.state)
    var m8 = _vm.taxiOrderState(item.state)
    var m9 = _vm.taxiOrderState(item.state)
    var m10 = _vm.taxiOrderState(item.state)
    var m11 = _vm.getBCstate(item.or_Type)
    var m12 = _vm.getCtkyOrderStatus(item.state)
    return {
      $orig: _vm.__get_orig(item),
      m0: m0,
      m1: m1,
      m2: m2,
      m3: m3,
      m4: m4,
      m5: m5,
      m6: m6,
      m7: m7,
      m8: m8,
      m9: m9,
      m10: m10,
      m11: m11,
      m12: m12
    }
  })

  var l1 = _vm.__map(_vm.finishArr, function(item, index) {
    var m13 = _vm.changeTime(item.appointmentTime)
    var m14 = _vm.changeTime(item.appointmentTime)
    var m15 = _vm.taxiOrderState(item.state)
    var m16 = _vm.changeTime(item.orderTime)
    var m17 = _vm.taxiOrderState(item.state)
    var m18 = _vm.taxiOrderState(item.state)
    var m19 = _vm.taxiOrderState(item.state)
    var m20 = _vm.taxiOrderState(item.state)
    var m21 = _vm.taxiOrderState(item.state)
    var m22 = _vm.taxiOrderState(item.state)
    var m23 = _vm.taxiOrderState(item.state)
    var m24 = _vm.taxiOrderState(item.state)
    var m25 = _vm.getBCstate(item.or_Type)
    var m26 = _vm.getCtkyOrderStatus(item.state)
    return {
      $orig: _vm.__get_orig(item),
      m13: m13,
      m14: m14,
      m15: m15,
      m16: m16,
      m17: m17,
      m18: m18,
      m19: m19,
      m20: m20,
      m21: m21,
      m22: m22,
      m23: m23,
      m24: m24,
      m25: m25,
      m26: m26
    }
  })

  var l2 = _vm.__map(_vm.goingArr, function(item, index) {
    var m27 = _vm.changeTime(item.appointmentTime)
    var m28 = _vm.changeTime(item.appointmentTime)
    var m29 = _vm.taxiOrderState(item.state)
    var m30 = _vm.changeTime(item.orderTime)
    var m31 = _vm.taxiOrderState(item.state)
    var m32 = _vm.taxiOrderState(item.state)
    var m33 = _vm.taxiOrderState(item.state)
    var m34 = _vm.taxiOrderState(item.state)
    var m35 = _vm.taxiOrderState(item.state)
    var m36 = _vm.taxiOrderState(item.state)
    var m37 = _vm.taxiOrderState(item.state)
    var m38 = _vm.taxiOrderState(item.state)
    var m39 = _vm.getBCstate(item.or_Type)
    var m40 = _vm.getCtkyOrderStatus(item.state)
    return {
      $orig: _vm.__get_orig(item),
      m27: m27,
      m28: m28,
      m29: m29,
      m30: m30,
      m31: m31,
      m32: m32,
      m33: m33,
      m34: m34,
      m35: m35,
      m36: m36,
      m37: m37,
      m38: m38,
      m39: m39,
      m40: m40
    }
  })

  var l3 = _vm.__map(_vm.unfinishArr, function(item, index) {
    var m41 = _vm.changeTime(item.appointmentTime)
    var m42 = _vm.changeTime(item.appointmentTime)
    var m43 = _vm.taxiOrderState(item.state)
    var m44 = _vm.changeTime(item.orderTime)
    var m45 = _vm.taxiOrderState(item.state)
    var m46 = _vm.taxiOrderState(item.state)
    var m47 = _vm.taxiOrderState(item.state)
    var m48 = _vm.taxiOrderState(item.state)
    var m49 = _vm.taxiOrderState(item.state)
    var m50 = _vm.taxiOrderState(item.state)
    var m51 = _vm.taxiOrderState(item.state)
    var m52 = _vm.taxiOrderState(item.state)
    var m53 = _vm.getBCstate(item.or_Type)
    var m54 = _vm.getCtkyOrderStatus(item.state)
    return {
      $orig: _vm.__get_orig(item),
      m41: m41,
      m42: m42,
      m43: m43,
      m44: m44,
      m45: m45,
      m46: m46,
      m47: m47,
      m48: m48,
      m49: m49,
      m50: m50,
      m51: m51,
      m52: m52,
      m53: m53,
      m54: m54
    }
  })

  var l4 = _vm.__map(_vm.cancelArr, function(item, index) {
    var m55 = _vm.changeTime(item.appointmentTime)
    var m56 = _vm.changeTime(item.appointmentTime)
    var m57 = _vm.taxiOrderState(item.state)
    var m58 = _vm.changeTime(item.orderTime)
    var m59 = _vm.taxiOrderState(item.state)
    var m60 = _vm.taxiOrderState(item.state)
    var m61 = _vm.taxiOrderState(item.state)
    var m62 = _vm.taxiOrderState(item.state)
    var m63 = _vm.taxiOrderState(item.state)
    var m64 = _vm.taxiOrderState(item.state)
    var m65 = _vm.taxiOrderState(item.state)
    var m66 = _vm.taxiOrderState(item.state)
    var m67 = _vm.getBCstate(item.or_Type)
    var m68 = _vm.getCtkyOrderStatus(item.state)
    return {
      $orig: _vm.__get_orig(item),
      m55: m55,
      m56: m56,
      m57: m57,
      m58: m58,
      m59: m59,
      m60: m60,
      m61: m61,
      m62: m62,
      m63: m63,
      m64: m64,
      m65: m65,
      m66: m66,
      m67: m67,
      m68: m68
    }
  })

  _vm.$mp.data = Object.assign(
    {},
    {
      $root: {
        l0: l0,
        l1: l1,
        l2: l2,
        l3: l3,
        l4: l4
      }
    }
  )
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 131:
/*!**************************************************************************!*\
  !*** D:/UAD/Jdt-zhcx/pages/order/OrderList.vue?vue&type=script&lang=js& ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Software_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_Software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_OrderList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../Software/HBuilderX/plugins/uniapp-cli/node_modules/babel-loader/lib!../../../../Software/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!../../../../Software/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!../../../../Software/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../Software/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./OrderList.vue?vue&type=script&lang=js& */ 132);
/* harmony import */ var _Software_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_Software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_OrderList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Software_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_Software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_OrderList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _Software_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_Software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_OrderList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _Software_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_Software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_OrderList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_Software_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_Software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_OrderList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 132:
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/UAD/Jdt-zhcx/pages/order/OrderList.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;



































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































var _Czc = _interopRequireDefault(__webpack_require__(/*! ../../common/Czc.js */ 19));
var _Czcprivate = _interopRequireDefault(__webpack_require__(/*! ../../common/Czcprivate.js */ 56));
var _LyfwFmq = _interopRequireDefault(__webpack_require__(/*! @/common/LYFW/LyfwFmq.js */ 23));
var _uqrcode = _interopRequireDefault(__webpack_require__(/*! @/common/uqrcode.js */ 133));
var _bcfw = _interopRequireDefault(__webpack_require__(/*! ../../common/BCFW/bcfw.js */ 134));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var uniSegmentedControl = function uniSegmentedControl() {__webpack_require__.e(/*! require.ensure | components/Order/uni-segmented-control/uni-segmented-control */ "components/Order/uni-segmented-control/uni-segmented-control").then((function () {return resolve(__webpack_require__(/*! @/components/Order/uni-segmented-control/uni-segmented-control.vue */ 637));}).bind(null, __webpack_require__)).catch(__webpack_require__.oe);};var uniPopup = function uniPopup() {__webpack_require__.e(/*! require.ensure | components/Order/uni-popup/uni-popup */ "components/Order/uni-popup/uni-popup").then((function () {return resolve(__webpack_require__(/*! @/components/Order/uni-popup/uni-popup.vue */ 644));}).bind(null, __webpack_require__)).catch(__webpack_require__.oe);};var uniIcons = function uniIcons() {Promise.all(/*! require.ensure | components/Order/uni-icons/uni-icons */[__webpack_require__.e("common/vendor"), __webpack_require__.e("components/Order/uni-icons/uni-icons")]).then((function () {return resolve(__webpack_require__(/*! @/components/Order/uni-icons/uni-icons.vue */ 651));}).bind(null, __webpack_require__)).catch(__webpack_require__.oe);};var uniPopup2 = function uniPopup2() {__webpack_require__.e(/*! require.ensure | components/Order/uni-popup/uni-popup2 */ "components/Order/uni-popup/uni-popup2").then((function () {return resolve(__webpack_require__(/*! @/components/Order/uni-popup/uni-popup2.vue */ 659));}).bind(null, __webpack_require__)).catch(__webpack_require__.oe);};var emptyData = function emptyData() {__webpack_require__.e(/*! require.ensure | components/CTKY/emptyData/emptyData */ "components/CTKY/emptyData/emptyData").then((function () {return resolve(__webpack_require__(/*! @/components/CTKY/emptyData/emptyData.vue */ 612));}).bind(null, __webpack_require__)).catch(__webpack_require__.oe);};var _default =
{
  components: {
    uniSegmentedControl: uniSegmentedControl,
    uniPopup: uniPopup,
    //加载多方弹框组件
    uniPopup2: uniPopup2,
    uniIcons: uniIcons,
    emptyData: emptyData },

  data: function data() {
    return {
      TaxiCost: 0, //价格
      countdown: 0,
      items: ['全部', '已完成', '进行中', '未支付', '已取消'],
      current: 0,
      index: 1,
      exitindex: 0, //订单判断值
      ticketOrderNumber: '', //门票订单编号
      orderIndex: 0, //订单调用数值
      orderIndexData: '', //二维码订单数据
      QRCodeArray: [{
        checkPlace: 'A5',
        seatNum: 'E1',
        lunchTime: '18:00',
        carNum: '闽C12345' }],

      info: [], //请求服务器订单列表
      userInfo: '', //个人信息
      finishArr: [],
      goingArr: [],
      unfinishArr: [],
      cancelArr: [],
      keYunTicketArray: [], //客运订单
      keYunTicket: [], //客运订单
      keYunPaymentData: '', //客运支付
      driverName: '张师傅', //司机姓名
      totalPrice: 32.5,
      orderType1: '',
      ctkyOrderNum: '', //传统客运订单号（退票需要）
      payType: [{
        typeName: '微信',
        typeColor: '#00C805',
        iconPath: '../../static/CZC/Wechatpay.png',
        value: 'wxpay',
        checked: true },

      {
        typeName: '支付宝',
        typeColor: '#0EBDFF',
        iconPath: '../../static/CZC/Alipay.png',
        value: 'alipay',
        checked: false }],


      specialLineInfo: '' };

  },
  onLoad: function onLoad() {
    var that = this;
    //读取用户ID
    uni.getStorage({
      key: 'userInfo',
      success: function success(data) {
        that.userInfo = data.data;
      } });

  },
  onShow: function onShow() {
    //请求景区门票数据
    this.toFinished();
  },
  onPullDownRefresh: function onPullDownRefresh() {
    this.toFinished();
  },
  methods: {
    changeTime: function changeTime(value) {//时间格式转换
      var date = new Date(value + "+08:00");
      var year = date.getFullYear();
      var mounth = date.getMonth() + 1;
      if (mounth < 10) {
        mounth = "0" + mounth;
      }
      var day = date.getDate();
      if (day < 10) {
        day = "0" + day;
      }
      var hours = date.getHours();
      if (hours < 10) {
        hours = "0" + hours;
      }
      var minutes = date.getMinutes();
      if (minutes < 10) {
        minutes = "0" + minutes;
      }
      return year + '-' + mounth + '-' + day + " " + hours + ':' + minutes;
    },
    //-------------------------支付页面-------------------------
    payDetail: function payDetail() {
      //支付详情
      uni.navigateTo({
        url: '../CZC/PriceDetail' });

    },
    closePayment: function closePayment() {
      //关闭
      var that = this;
      that.closeBottomPopup();
    },
    payment: function payment(e) {
      //支付
      var that = this;
      var timeStamp = new Date().getTime();
      uni.requestPayment({
        provider: e.detail.value.chooseType,
        orderInfo: '111',
        timeStamp: timeStamp,
        nonceStr: '',
        package: '',
        paySign: '',
        success: function success(res) {
          // console.log(res);
          uni.navigateTo({
            url: '../CZC/PaymentSuccess' });

        },
        fail: function fail(res) {
          // console.log(res);
          uni.navigateTo({
            url: '../CZC/PaymentFail' });

        } });

    },
    openBottomPopup: function openBottomPopup() {
      this.$nextTick(function () {
        this.$refs['bottomPopup'].open();
      });
    },
    closeBottomPopup: function closeBottomPopup() {
      this.$nextTick(function () {
        this.$refs['bottomPopup'].close();
      });
    },

    back: function back() {
      var that = this;
      uni.switchTab({
        url: '/pages/Home/Index' });

    },
    //------------------------------------------------客运开始------------------------------------------------
    //-------------------------客运用户详情-------------------------
    getUserInfo: function getUserInfo() {
      var that = this;
      //读取用户ID
      uni.getStorage({
        key: 'userInfo',
        success: function success(data) {
          that.userInfo = data.data;
          console.log('用户信息', that.userInfo);
          that.getKeYunOrderInfo();
          that.getArrayInfo();
        },
        fail: function fail(res) {
          // console.log('错误', res);
        } });

    },

    //-------------------------请求客运订单数据-------------------------
    getKeYunOrderInfo: function getKeYunOrderInfo() {
      var that = this;
      uni.request({
        url: 'http://zntc.145u.net/api/ky/searchOrder',
        method: 'GET',
        header: {
          'content-type': 'application/json' },

        data: {
          clientID: that.userInfo.userId },

        success: function success(res) {
          uni.stopPullDownRefresh();
          console.log('11111', res.data);
          that.ctkyOrderNum = res.data.orderNumber;
          if (res.data.status == true) {
            for (var i = 0; i < res.data.data.length; i++) {
              that.info.push(res.data.data[i]);
            }
            for (var i = 0; i < res.data.data.length; i++) {
              if (res.data.data[i].state == '5') {
                that.finishArr.push(res.data.data[i]);
              } else if (res.data.data[i].state == '4') {
                that.goingArr.push(res.data.data[i]);
              } else if (res.data.data[i].state == '7') {
                that.unfinishArr.push(res.data.data[i]);
              } else if (res.data.data[i].state == '6' || res.data.data[i].state == '9') {
                that.cancelArr.push(res.data.data[i]);
              }
            }
            //出租车请求数据
            that.loadczcData();
          } else if (res.data.status == false) {
            // console.log('无客运车票数据');
            //出租车请求数据
            that.loadczcData();
          }
        },
        fail: function fail(res) {
          //请求数据失败，停止刷新
          uni.stopPullDownRefresh();
          // console.log('错误', res);
        } });

    },
    //-------------------------判断订单状态-------------------------
    getCtkyOrderStatus: function getCtkyOrderStatus(param) {
      if (param == 4) {
        return '进行中';
      } else if (param == 5) {
        return '已完成';
      } else if (param == 6) {
        return '已退票';
      } else if (param == 7) {
        return '未支付';
      } else if (param == 9) {
        return '已撤销';
      } else if (param == 22) {
        return '已改签';
      }
    },
    //-------------------------跳转到详情页-------------------------
    keYunDetail: function keYunDetail(res) {
      console.log(res);
      uni.navigateTo({
        url: '../CTKY/TraditionSpecial/Order/orderDetail?orderInfo=' + JSON.stringify(res) });

    },
    // -------------------------客运退票-------------------------
    keYunRefundTicket: function keYunRefundTicket(orderNumber) {var _this = this;
      console.log(orderNumber);
      var that = this;
      uni.request({
        url: 'http://zntc.145u.net/api/ky/RefundTicket_Flow',
        method: 'GET',
        header: {
          'content-type': 'application/x-www-form-urlencoded' },

        data: {
          orderNumber: orderNumber },

        success: function success(respones) {
          console.log('删除结果', respones);
          if (respones.data.status == true) {
            uni.hideLoading();
            uni.showToast({
              title: '退票成功' });

            _this.$refs.popup2.close();
            uni.startPullDownRefresh();
          } else {
            uni.hideLoading();
            uni.showToast({
              title: '退票失败',
              icon: 'none' });

            uni.startPullDownRefresh();
          }
        },
        fail: function fail(respones) {
          uni.hideLoading();
          console.log(respones);
          uni.showToast({
            title: '服务器异常，请联系客服' });

        } });

    },
    // -------------------------客运取消-------------------------
    keYunCancelTicket: function keYunCancelTicket(orderNumber) {var _this2 = this;
      console.log(orderNumber);
      var that = this;
      uni.request({
        url: 'http://zntc.145u.net/api/ky/CancelTicket_Flow',
        method: 'GET',
        header: {
          'content-type': 'application/x-www-form-urlencoded' },

        data: {
          orderNumber: orderNumber },

        success: function success(respones) {
          // alert(respones.data)
          console.log('取消结果', respones);
          if (respones.data.status == true) {
            uni.hideLoading();
            uni.showToast({
              title: '取消成功' });

            _this2.$refs.popup3.close();
            uni.startPullDownRefresh();
          } else {
            uni.hideLoading();
            uni.showToast({
              title: '取消失败',
              icon: 'none' });

            _this2.$refs.popup3.close();
            uni.startPullDownRefresh();
          }
        },
        fail: function fail(respones) {
          // alert(respones.data.msg)
          uni.hideLoading();
          console.log(respones);
          uni.showToast({
            title: '服务器异常，请联系客服' });

          _this2.$refs.popup3.close();
        } });

    },
    // -------------------------客运支付-------------------------
    keYunPay: function keYunPay(orderNumber) {
      // var orderInfo = this.info[index];
      console.log(orderNumber);
      this.getTicketPaymentInfo(orderNumber);
    },
    //--------------------------获取车票支付参数--------------------------
    getTicketPaymentInfo: function getTicketPaymentInfo(orderNumber) {
      // console.log('支付参数', orderNumber);
      var that = this;
      var timer = null;
      that.timer = timer;
      uni.showLoading();
      timer = setInterval(function () {
        uni.request({
          url: 'http://zntc.145u.net/api/ky/SellTicket_Flow',
          method: 'GET',
          header: {
            'content-type': 'application/x-www-form-urlencoded' },

          data: {
            orderNumber: orderNumber },

          success: function success(res) {
            console.log('支付参数返回数据', res);
            if (res.data.status == true) {
              uni.hideLoading();
              var info = JSON.parse(res.data.msg);
              if (info.oldState == '结束') {
                uni.showToast({
                  title: '订单已支付',
                  icon: 'none' });

                clearInterval(timer);
              } else {
                clearInterval(timer);
                that.keYunPaymentData = JSON.parse(res.data.msg);
                // console.log('支付参数返回数据', that.keYunPaymentData);
                that.keYunPayment();
              }
            } else if (res.data.status == false) {
              uni.hideLoading();
              var info = JSON.parse(res.data.msg);
              if (info.oldState == '结束') {
                uni.showToast({
                  title: '订单已超时',
                  icon: 'none' });

                clearInterval(timer);
              } else {
                uni.showModal({
                  content: info.oldState,
                  showCancel: false });

              }
            }
          },
          fail: function fail(res) {
            uni.hideLoading();
            //回调失败，取消定时器
            clearInterval(timer);
          } });

      }, 3000);
    },
    //--------------------------调起支付--------------------------
    keYunPayment: function keYunPayment() {
      // console.log('点击了支付');
      var that = this;
      if (that.isPayEnable == 0) {
        uni.showToast({
          title: '正在获取支付,请稍等...',
          icon: 'none' });

      } else {


















































































      }
    },
    //-------------------------客运二维码弹框-------------------------
    QRCodeTap: function QRCodeTap() {
      this.$refs.popup.open();
    },
    //------------------------------------------------客运结束------------------------------------------------
    onClickItem: function onClickItem(e) {//tab点击事件
      if (this.current !== e.currentIndex) {
        this.current = e.currentIndex;
      }
    },

    //-------------------------出租车开始-------------------------
    loadczcData: function loadczcData() {var _this3 = this;

      var that = this;
      uni.getStorage({
        key: 'userInfo',
        success: function success(res1) {
          _this3.userInfo = res1.data;
          uni.request({
            url: 'http://zntc.145u.net/api/taxi/GetAllExpressOrder_Passenger',
            data: {
              userId: that.userInfo.userId },

            method: 'POST',
            success: function success(res) {
              uni.stopPullDownRefresh();
              if (res.data.status) {
                for (var i = 0; i < res.data.data.length; i++) {
                  that.info.push(res.data.data[i]);
                  if (res.data.data[i].state == "0" || res.data.data[i].state == "1" || res.data.data[i].state == "2" ||
                  res.data.data[i].state == "3" || res.data.data[i].state == "4") {
                    that.goingArr.push(res.data.data[i]);
                  } else if (res.data.data[i].state == "5" || res.data.data[i].state == "9") {
                    that.unfinishArr.push(res.data.data[i]);
                  } else if (res.data.data[i].state == "7" || res.data.data[i].state == "8") {
                    that.cancelArr.push(res.data.data[i]);
                  } else if (res.data.data[i].state == 6) {
                    that.finishArr.push(res.data.data[i]);
                  }
                }
                //包车请求数据
                _this3.getOrderList();
              } else {
                //包车请求数据
                _this3.getOrderList();
              }
            } });

        },
        fail: function fail() {
          //请求数据失败，停止刷新
          uni.stopPullDownRefresh();
          uni.showToast({
            title: '暂无订单数据，请先登录后查看订单',
            icon: 'none',
            success: function success() {
              uni.redirectTo({
                url: '../GRZX/userLogin?loginType=1&&urlData=2' });

            } });

        } });

    },
    taxiOrderState: function taxiOrderState(param) {
      if (param == 0 || param == 1 || param == 2 || param == 3 || param == 4) {
        return '进行中';
      } else if (param == 5 || param == 9) {
        return '未支付';
      } else if (param == 7 || param == 8) {
        return '已取消';
      } else if (param == 6) {
        return '已完成';
      }
    },
    //-------------------------出租车订单取消-------------------------
    cancleOrder: function cancleOrder(item) {
      //取消订单
      var that = this;
      //关闭所有的定时器
      uni.showModal({
        title: "取消订单",
        content: "您是否取消订单",
        success: function success(res) {
          if (res.confirm) {
            getApp().globalData.closeUpload();
            uni.request({
              url: _Czc.default.Interface.CancelExpressOrderByOrderNum_Passenger.value,
              method: _Czc.default.Interface.CancelExpressOrderByOrderNum_Passenger.method,
              data: {
                OrderNumber: item.orderNumber,
                userId: that.userInfo.userId },

              success: function success(res) {
                var data = res.data.data;
                if (res.data.status) {
                  uni.showToast({
                    title: '取消成功',
                    icon: 'none',
                    success: function success() {} });

                  setTimeout(function () {
                    uni.startPullDownRefresh();
                  }, 1500);
                } else {
                  uni.showToast({
                    title: res.data.msg,
                    icon: 'none' });

                }
              },
              fail: function fail(res) {
                uni.showToast({
                  title: '网络连接失败',
                  icon: 'none' });

                // console.log(res);
              } });

          }

        } });

    },
    //-------------------------出租车专线代码开始-------------------------
    getOrderList: function getOrderList() {//获取出租车专线订单
      var that = this;
      uni.request({
        url: _Czcprivate.default.Interface.QuerySpecialLineOrderByUserID_Passenger.value,
        method: _Czcprivate.default.Interface.QuerySpecialLineOrderByUserID_Passenger.method,
        data: {
          UserID: that.userInfo.userId },

        success: function success(res) {
          uni.stopPullDownRefresh();
          if (res.data.status) {
            for (var i = 0; i < res.data.data.length; i++) {
              var data = res.data.data[i];
              var orderType = '';
              if (data.State == 0 || data.State == 1 || data.State == 2 || data.State == 3 || data.State == 4) {
                orderType = '进行中';
              } else if (data.State == 5 || data.State == 9) {
                orderType = '未支付';
              } else if (data.State == 7 || data.State == 8) {
                orderType = '已取消';
              } else if (data.State == 6) {
                orderType = '已完成';
              }
              var obj = {
                title: '出租车-专线',
                titleIndex: '1',
                SpecialorderState: data.State,
                time: data.OrderTime,
                orderType: orderType,
                appointmentTime: data.AppointmentTime,
                money: data.EstimatePrice,
                startAddress: data.StartAddress,
                endAddress: data.EndAddress,
                orderNumber: data.OrderNumber,
                appointment: true };

              that.info.push(obj);
              if (orderType == '已完成') {
                that.finishArr.push(obj);
              } else if (orderType == '等待司机接单' || orderType == '进行中' || orderType == '待上车') {
                that.goingArr.push(obj);
              } else if (orderType == '未支付') {
                that.unfinishArr.push(obj);
              } else if (orderType == '已取消') {
                that.cancelArr.push(obj);
              }
            }
          }
        },
        fail: function fail() {
          uni.stopPullDownRefresh();
        } });

    },
    CancelSpecialLineOrder: function CancelSpecialLineOrder(OrderNumber) {//取消出租车专线订单
      var that = this;
      uni.showModal({
        content: "您确定要取消订单吗",
        success: function success(res) {
          if (res.confirm) {
            uni.request({
              url: _Czcprivate.default.Interface.CancelSpecialLineOrder_Passenger.value,
              method: _Czcprivate.default.Interface.CancelSpecialLineOrder_Passenger.method,
              data: {
                OrderNumber: OrderNumber,
                UserID: that.userInfo.userId },

              success: function success(res) {
                if (res.data.status) {
                  uni.showToast({
                    title: res.data.msg,
                    icon: "none" });

                  uni.startPullDownRefresh();
                }
              },
              fail: function fail() {
                uni.showToast({
                  title: "网络连接失败",
                  icon: "none" });

              } });

          }
        } });

    },
    SpecialLineOrderDetail: function SpecialLineOrderDetail(item) {//专线车详情
      if (item.orderType == '进行中') {
        uni.navigateTo({
          url: '/pages/CZC/WaitTakeOrder?orderNumber=' + item.orderNumber });

      } else {
        uni.navigateTo({
          url: '/pages/order/SpecialLineDetail?orderNumber=' + item.orderNumber });

      }
    },
    DeleteSpecialLineOrder: function DeleteSpecialLineOrder(OrderNumber) {//专线车删除订单
      var that = this;
      uni.showModal({
        content: "您确定要删除订单吗",
        success: function success(res) {
          if (res.confirm) {
            uni.request({
              url: _Czcprivate.default.Interface.DeleteSpecialLineOrder_Passenger.value,
              method: _Czcprivate.default.Interface.DeleteSpecialLineOrder_Passenger.method,
              data: {
                OrderNumber: OrderNumber,
                UserID: that.userInfo.userId },

              success: function success(res) {
                // console.log(res)
                if (res.data.status) {

                  uni.showToast({
                    title: res.data.msg,
                    icon: "none" });

                  uni.startPullDownRefresh();
                }
              } });

          }
        } });

    },
    GotoPay: function GotoPay(value) {
      uni.navigateTo({
        url: "../CZC/PrivateTaxiPayment?orderNumber=" + value });

    },
    //-------------------------出租车专线代码结束-------------------------


    //-------------------------景区门票代码开始-------------------------
    //-------------------------请求订单列表-------------------------
    toFinished: function toFinished() {var _this4 = this;
      var that = this;
      uni.getStorage({
        key: 'userInfo',
        success: function success(res) {
          _this4.userInfo = res.data;
          uni.request({
            url: _LyfwFmq.default.Interface.spt_RequestTicketsList.value,
            method: _LyfwFmq.default.Interface.spt_RequestTicketsList.method,
            data: {
              userId: _this4.userInfo.userId },

            header: {
              'content-type': 'application/json' },

            success: function success(res) {
              uni.stopPullDownRefresh();
              if (res.data.msg == '订单获取成功') {
                that.info = res.data.data;
                that.finishArr = [];
                that.goingArr = [];
                that.unfinishArr = [];
                that.cancelArr = [];
                if (that.info) {
                  for (var i = 0; i < that.info.length; i++) {
                    if (that.info[i].orderType == '已完成' || that.info[i].orderType == '已使用') {
                      that.finishArr.push(that.info[i]);
                    } else if (that.info[i].orderType == '进行中' || that.info[i].orderType == '待使用') {
                      that.goingArr.push(that.info[i]);
                    } else if (that.info[i].orderType == '未支付' || that.info[i].orderType == '待支付') {
                      that.unfinishArr.push(that.info[i]);
                    } else if (that.info[i].orderType == '已取消' || that.info[i].orderType == '已退票' || that.info[i].orderType == '支付超时') {
                      that.cancelArr.push(that.info[i]);
                    }
                  }
                }
                //客运
                //获取用户信息
                that.getUserInfo();
              } else {
                that.info = [];
                that.finishArr = [];
                that.goingArr = [];
                that.unfinishArr = [];
                that.cancelArr = [];
                that.getUserInfo();
              }
            } });

        },
        fail: function fail() {
          //请求数据失败，停止刷新
          uni.stopPullDownRefresh();
          uni.showToast({
            title: '暂无订单数据，请先登录后查看订单',
            icon: 'none',
            success: function success() {
              uni.redirectTo({
                url: '../GRZX/userLogin?loginType=1&&urlData=2' });

            } });

        } });

    },
    //-------------------------景区门票-打开二维码弹框-------------------------
    open5: function open5(e) {
      uni.showLoading({
        title: '生成中...' });

      this.orderIndexData = e;
      this.make(e);
    },
    //-------------------------景区门票-关闭二维码弹框-------------------------
    close5: function close5() {
      this.$refs.popup5.close();
    },
    //-------------------------景区门票-打开退票弹框-------------------------
    open2: function open2(e, exitindex) {
      this.ticketOrderNumber = e;
      this.exitindex = exitindex;
      this.$refs.popup2.open();
    },
    //-------------------------景区门票-关闭退票弹框-------------------------
    close2: function close2() {
      this.$refs.popup2.close();
    },
    //-------------------------景区门票-打开取消弹框-------------------------
    open3: function open3(e, exitindex) {
      this.ticketOrderNumber = e;
      this.exitindex = exitindex;
      this.$refs.popup3.open();
    },
    //-------------------------景区门票-关闭取消弹框-------------------------
    close3: function close3() {
      this.$refs.popup3.close();
    },
    //-------------------------景区门票-打开删除弹框-------------------------
    open4: function open4(e, exitindex) {
      this.ticketOrderNumber = e;
      this.exitindex = exitindex;
      this.$refs.popup4.open();
    },
    //-------------------------景区门票-关闭删除弹框-------------------------
    close4: function close4() {
      this.$refs.popup4.close();
    },


    //-------------------------景区门票-详情跳转-------------------------
    details: function details(e) {
      uni.navigateTo({
        url: '../LYFW/scenicSpotTickets/orderDetails?orderNumber=' + e });

    },
    //-------------------------景区门票-去支付跳转-------------------------
    topay: function topay(e) {
      uni.navigateTo({
        url: '../LYFW/scenicSpotTickets/selectivePayment?orderNumber=' + e });

    },
    //-------------------------景区门票-再次购买-------------------------
    repurchase: function repurchase(e) {
      uni.navigateTo({
        url: '../LYFW/scenicSpotTickets/ticketsDetails?ticketId=' + JSON.stringify(e) });

    },
    //-------------------------景区门票-退票-------------------------
    refund: function refund() {var _this5 = this;
      var that = this;
      if (this.exitindex == '2') {
        uni.showLoading({
          title: '请求退票中...' });

        this.keYunRefundTicket(that.ticketOrderNumber);
      } else if (this.exitindex == '3') {
        uni.request({
          url: _LyfwFmq.default.Interface.spt_BounceTickets.value,
          method: _LyfwFmq.default.Interface.spt_BounceTickets.method,
          data: {
            orderNumber: this.ticketOrderNumber },

          header: {
            'content-type': 'application/json' },

          success: function success(e) {
            // console.log(e)
            uni.showToast({
              title: '退票成功',
              icon: 'success',
              duration: 1500 });

            _this5.close2();
            _this5.toFinished();
          } });

      }


    },

    //-------------------------景区门票-取消-------------------------
    cancel: function cancel() {var _this6 = this;
      if (this.exitindex == '3') {
        uni.request({
          url: _LyfwFmq.default.Interface.spt_CancelTickets.value,
          method: _LyfwFmq.default.Interface.spt_CancelTickets.method,
          data: {
            orderNumber: this.ticketOrderNumber },

          header: {
            'content-type': 'application/json' },

          success: function success(e) {
            // console.log(e)
            if (e.data.msg == '订单取消成功') {
              uni.showToast({
                title: '订单取消成功',
                icon: 'none' });

              _this6.close3();
              _this6.toFinished();
            } else if (e.data.msg == '订单取消失败') {
              uni.showToast({
                title: '订单取消失败',
                icon: 'none' });

              _this6.close3();
              _this6.toFinished();
            }
          },
          fail: function fail() {
            uni.showToast({
              title: '取消失败！请检查网络状态',
              icon: 'none',
              duration: 1500 });

          } });

      } else if (this.exitindex == '4') {
        console.log(this.ticketOrderNumber);
        uni.request({
          url: _bcfw.default.Interface.spt_CancelTickets.value,
          method: _bcfw.default.Interface.spt_CancelTickets.method,
          data: {
            or_number: this.ticketOrderNumber },

          header: {
            'content-type': 'application/json' },

          success: function success(e) {
            console.log(e);
            if (e.data.status == true) {
              uni.showToast({
                title: '订单取消成功',
                icon: 'none' });

              _this6.close3();
              _this6.toFinished();
            } else if (e.data.status == false) {
              uni.showToast({
                title: '订单取消失败',
                icon: 'none' });

              _this6.close3();
              _this6.toFinished();
            }
          },
          fail: function fail() {
            uni.showToast({
              title: '取消失败！请检查网络状态',
              icon: 'none',
              duration: 1500 });

          } });

      } else if (this.exitindex == '2') {
        this.keYunCancelTicket(this.ticketOrderNumber);
      }
    },

    //-------------------------景区门票-删除-------------------------
    del: function del() {var _this7 = this;
      if (this.exitindex == '3') {
        uni.request({
          url: _LyfwFmq.default.Interface.spt_DeleteTickets.value,
          method: _LyfwFmq.default.Interface.spt_DeleteTickets.method,
          data: {
            orderNumber: this.ticketOrderNumber },

          header: {
            'content-type': 'application/json' },

          success: function success(e) {
            // console.log(e)
            uni.showToast({
              title: '删除成功',
              icon: 'success',
              duration: 1500 });

            _this7.close4();
            _this7.toFinished();
          },
          fail: function fail() {
            uni.showToast({
              title: '删除失败！订单已删除',
              icon: 'none',
              duration: 1500 });

          } });

      } else if (this.exitindex == '4') {
        uni.request({
          url: _bcfw.default.Interface.spt_DeleteTickets.value,
          method: _bcfw.default.Interface.spt_DeleteTickets.method,
          data: {
            or_number: this.ticketOrderNumber },

          header: {
            'content-type': 'application/json' },

          success: function success(e) {
            // console.log(e)
            uni.showToast({
              title: '删除成功',
              icon: 'success',
              duration: 1500 });

            _this7.close4();
            _this7.toFinished();
          },
          fail: function fail() {
            uni.showToast({
              title: '删除失败！订单已删除',
              icon: 'none',
              duration: 1500 });

          } });

      }

    },

    //-------------------------生成二维码-------------------------
    make: function make(e) {
      console.log(e);
      _uqrcode.default.make({
        canvasId: 'qrcode2',
        componentInstance: this,
        text: e.orderTicketNumber,
        size: 160,
        margin: 10,
        backgroundColor: '#ffffff',
        foregroundColor: '#000000',
        correctLevel: _uqrcode.default.defaults.correctLevel });

      uni.hideLoading();
      this.$refs.popup5.open();
    },
    //-------------------------景区门票代码结束-------------------------

    detail: function detail(item) {
      if (item == 1) {
        uni.navigateTo({
          url: '/pages/order/OrderDetail' });

      }
    },

    going: function going(item) {
      // console.log(item)
      var state = this.taxiOrderState(item.state);
      // console.log(state)
      if (item.vehicleType == '出租车') {
        if (item.state == '0' || item.state == '1' || item.state == '2' || item.state == '3' || item.state == '4') {
          uni.navigateTo({
            url: '/pages/CZC/CallAndDrive?orderNumber=' + item.orderNumber });

        } else {
          uni.navigateTo({
            url: '/pages/order/OrderDetail?orderNumber=' + item.orderNumber });

        }
      }
    },

    //-------------------包车订单添加-------------------------
    getArrayInfo: function getArrayInfo() {var _this8 = this;
      var that = this;
      uni.getStorage({
        key: 'userInfo',
        success: function success(res) {
          _this8.userInfo = res.data;
          uni.request({
            url: _bcfw.default.Interface.spt_RequestTicketsList.value,
            method: _bcfw.default.Interface.spt_RequestTicketsList.method,
            data: {
              userId: _this8.userInfo.userId },


            header: { 'content-type': 'application/json' },
            success: function success(res) {
              console.log(_this8.userInfo.userId);
              console.log(res);
              if (res.data.msg == '订单查询完成') {
                for (var i = 0; i < res.data.data.length; i++) {
                  that.info.push(res.data.data[i]);
                }
                if (res.data.data !== '') {
                  for (var i = 0; i < res.data.data.length; i++) {
                    if (res.data.data[i].or_Type == '6') {
                      that.finishArr.push(res.data.data[i]);
                    } else if (res.data.data[i].or_Type == '4' || res.data.data[i].or_type == '2' || res.data.data[i].or_type == '11') {
                      that.goingArr.push(res.data.data[i]);
                    } else if (res.data.data[i].or_Type == '5') {
                      that.unfinishArr.push(res.data.data[i]);
                    } else if (res.data.data[i].or_Type == '8' || res.data.data[i].or_Type == '9') {
                      that.cancelArr.push(res.data.data[i]);
                    }
                  }
                }
              }

            } });

        },
        fail: function fail() {
          //请求数据失败，停止刷新
          uni.stopPullDownRefresh();
          uni.showToast({
            title: '暂无订单数据，请先登录后查看订单',
            icon: 'none',
            success: function success() {
              uni.redirectTo({
                url: '../GRZX/userLogin?loginType=1&&urlData=2' });

            } });

        } });

    },
    //-------------------------拨打电话-------------------------
    tel: function tel(e) {
      uni.makePhoneCall({
        phoneNumber: e });

    },
    //-------------------------包车-详情跳转-------------------------
    details2: function details2(e) {
      uni.navigateTo({
        url: '../BCFW/bf_charterMap?or_number=' + JSON.stringify(e) });

    },
    //-------------------------判断订单状态-------------------------
    getBCstate: function getBCstate(param) {
      if (param == '4') {
        return '进行中';
      } else if (param == '6') {
        return '已完成';
      } else if (param == '5') {
        return '待支付';
      } else if (param == '1') {
        return '待发车';
      } else if (param == '8' || param == '9') {
        return '已取消';
      } else if (param == '11') {
        return '待补款';
      }
    } } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 135:
/*!***********************************************************************************!*\
  !*** D:/UAD/Jdt-zhcx/pages/order/OrderList.vue?vue&type=style&index=0&lang=scss& ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Software_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_Software_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_Software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_Software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_Software_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_Software_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_Software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_Software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_OrderList_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../Software/HBuilderX/plugins/uniapp-cli/node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!../../../../Software/HBuilderX/plugins/uniapp-cli/node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!../../../../Software/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!../../../../Software/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!../../../../Software/HBuilderX/plugins/uniapp-cli/node_modules/postcss-loader/src??ref--8-oneOf-1-3!../../../../Software/HBuilderX/plugins/uniapp-cli/node_modules/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!../../../../Software/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!../../../../Software/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../Software/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./OrderList.vue?vue&type=style&index=0&lang=scss& */ 136);
/* harmony import */ var _Software_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_Software_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_Software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_Software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_Software_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_Software_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_Software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_Software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_OrderList_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Software_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_Software_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_Software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_Software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_Software_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_Software_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_Software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_Software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_OrderList_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _Software_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_Software_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_Software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_Software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_Software_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_Software_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_Software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_Software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_OrderList_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _Software_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_Software_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_Software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_Software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_Software_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_Software_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_Software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_Software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_OrderList_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_Software_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_Software_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_Software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_Software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_Software_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_Software_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_Software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_Software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_OrderList_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 136:
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/UAD/Jdt-zhcx/pages/order/OrderList.vue?vue&type=style&index=0&lang=scss& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ })

},[[127,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/order/OrderList.js.map