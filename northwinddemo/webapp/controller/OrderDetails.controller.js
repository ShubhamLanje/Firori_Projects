sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/core/routing/History"
    

],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,JSONModel,Filter,FilterOperator,History) 
    {
        "use strict";

       
        return Controller.extend("northwinddemo.controller.OrderDetails", 
        {
            onInit: function() 
            {
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.getRoute("OrderDetails").attachPatternMatched(this._onRouteMatched, this);
            },
                _onRouteMatched: function(oEvent) 
                {
                    var sOrderID = oEvent.getParameter("arguments").OrderID;
                    console.log(sOrderID);
                    
                    var oModel = this.getOwnerComponent().getModel();
                    var oJSONModel = new sap.ui.model.json.JSONModel();
                    var oBusyDialog = new sap.m.BusyDialog({
                        title: "Loading Data",
                        text: "PLZ Wait ....."
                    });
                    oBusyDialog.open();
                    var oFilter = new sap.ui.model.Filter("OrderID","EQ",sOrderID);
                    oModel.read("/Order_Details",{
                        filters:[oFilter],
                        success: function(resp){
                            oBusyDialog.close();
                            oJSONModel.setData(resp.results);
                            this.getView().setModel(oJSONModel,"OrdersDModel");
                        }.bind(this),
                        error: function(err){
                            oBusyDialog.close();
                        }
                });               
                },
                onNavtBack: function () {
                    var oHistory = History.getInstance();
                    var sPreviousHash = oHistory.getPreviousHash();
                 
                    if (sPreviousHash !== undefined) {
                      window.history.go(-1);
                    } else {
                      var oRouter = this.getOwnerComponent().getRouter();
                      oRouter.navTo("MainView", {}, true);
                    }
               
                  }
               
            
          });



    });



    