/* jshint ignore:start */
import Component from "metal-component";
import Soy from "metal-soy";
var templates;
goog.loadModule(function(exports) {
  // This file was automatically generated from App.soy.
  // Please don't edit this file by hand.

  /**
 * @fileoverview Templates in namespace App.
 * @public
 */

  goog.module("App.incrementaldom");

  /** @suppress {extraRequire} */
  var soy = goog.require("soy");
  /** @suppress {extraRequire} */
  var soydata = goog.require("soydata");
  /** @suppress {extraRequire} */
  goog.require("goog.asserts");
  /** @suppress {extraRequire} */
  goog.require("soy.asserts");
  /** @suppress {extraRequire} */
  goog.require("goog.i18n.bidi");
  /** @suppress {extraRequire} */
  goog.require("goog.string");
  var IncrementalDom = goog.require("incrementaldom");
  var ie_open = IncrementalDom.elementOpen;
  var ie_close = IncrementalDom.elementClose;
  var ie_void = IncrementalDom.elementVoid;
  var ie_open_start = IncrementalDom.elementOpenStart;
  var ie_open_end = IncrementalDom.elementOpenEnd;
  var itext = IncrementalDom.text;
  var iattr = IncrementalDom.attr;

  var $templateAlias1 = Soy.getTemplate("Home.incrementaldom", "render");

  /**
 * @param {{
 *    page: string
 * }} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object<string, *>=} opt_ijData
 * @return {void}
 * @suppress {checkTypes}
 */
  function $render(opt_data, opt_ignored, opt_ijData) {
    soy.asserts.assertType(
      goog.isString(opt_data.page) ||
        opt_data.page instanceof goog.soy.data.SanitizedContent,
      "page",
      opt_data.page,
      "string|goog.soy.data.SanitizedContent"
    );
    var page /** @type {string|goog.soy.data.SanitizedContent} */ =
      opt_data.page;
    ie_open("div");
    if (page == "home") {
      $templateAlias1(null, null, opt_ijData);
    }
    ie_close("div");
  }
  exports.render = $render;
  if (goog.DEBUG) {
    $render.soyTemplateName = "App.render";
  }

  exports.render.params = ["page"];
  exports.render.types = { page: "string" };
  templates = exports;
  return exports;
});

class App extends Component {}
Soy.register(App, templates);
export { App, templates };
export default templates;
/* jshint ignore:end */
