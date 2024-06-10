sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History"
],
     /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */  
    function (Controller,History) {
        "use strict";

        return Controller.extend("apinorthcon.controller.Overview", {
          
          onInit: function () { 
             var a = sap.ui.core.UIComponent.getRouterFor(this);
                a.getRoute("view2").attachPatternMatched(this._onload, this);
            },
            _onload:function(oEvent){
              var oArgs, oView;
              oArgs=oEvent.getParameters("arguments");
              oView=this.getView();
              oView.bindElement({
                path:"/Customers("+oArgs.CustomerID+")", //?$expand=Orders
                event:{
                    dataRequester:function(){oView.setBusy(true)},
                    dataRecevied:function(){oView.setBusy(false)},
                },
              });
              } ,
             
            onNavBack: function () {
                var oHistory = History.getInstance();
                var sPreviousHash = oHistory.getPreviousHash();
              
                if (sPreviousHash !== undefined) {
                  window.history.go(-1);
                } else {
                  var oRouter = this.getOwnerComponent().getRouter();
                  oRouter.navTo("view1", {}, true);
                }
              }
            
        });
    });
