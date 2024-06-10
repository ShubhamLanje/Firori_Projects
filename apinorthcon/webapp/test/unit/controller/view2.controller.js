/*global QUnit*/

sap.ui.define([
	"apinorthcon/controller/view2.controller"
], function (Controller) {
	"use strict";

	QUnit.module("view2 Controller");

	QUnit.test("I should test the view2 controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
