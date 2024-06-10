sap.ui.define([
    "sap/ui/core/mvc/Controller",
    'sap/ui/model/odata/v2/ODataModel'
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,ODataModel) {
        "use strict";

        return Controller.extend("smarttable.controller.MainPage", {
            onInit: function () {
                this._oSmartFilterBar  = this.byId("smartFilterBar");
            }



        });
    });
