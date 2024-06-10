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

       
        return Controller.extend("northwinddemo.controller.OrdersView", 
        {
            onInit: function() 
            {
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.getRoute("OrdersView").attachPatternMatched(this._onRouteMatched, this);
            },
                _onRouteMatched: function(oEvent) 
                {
                    var sCustomerId = oEvent.getParameter("arguments").customerId;
                    console.log(sCustomerId);
                    
                    var oModel = this.getOwnerComponent().getModel();
                    var oJSONModel = new sap.ui.model.json.JSONModel();
                    var oBusyDialog = new sap.m.BusyDialog({
                        title: "Loading Data",
                        text: "PLZ Wait ....."
                    });
                    oBusyDialog.open();
                    var oFilter = new sap.ui.model.Filter("CustomerID","EQ",sCustomerId);
                    oModel.read("/Orders",{
                        filters:[oFilter],
                        success: function(resp){
                            oBusyDialog.close();
                            oJSONModel.setData(resp.results);
                            this.getView().setModel(oJSONModel,"OrdersModel");
                        }.bind(this),
                        error: function(err){
                            oBusyDialog.close();
                        }
                });               
                },
                onNavBack: function () {
                    var oHistory = History.getInstance();
                    var sPreviousHash = oHistory.getPreviousHash();
                 
                    if (sPreviousHash !== undefined) {
                      window.history.go(-1);
                    } else {
                      var oRouter = this.getOwnerComponent().getRouter();
                      oRouter.navTo("MainView", {}, true);
                    }
               
                  },
                  onNavToOrderDetails: function(oEvent){
                
                    var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                    var sOrderId = oEvent.getSource().getCells()[0].getText();
                    oRouter.navTo("OrderDetails",{OrderID: sOrderId});
   
               },
               
            
          });



    });



    