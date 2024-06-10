sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/util/Export", 
    "sap/ui/core/util/ExportTypeCSV"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,JSONModel,Export,ExportTypeCSV) {
        "use strict";

            return Controller.extend("northwinddemo.controller.MainView", {
            onInit: function() {
                this.onReadEmpData();
            },
            onReadEmpData: function(){
                var oModel = this.getOwnerComponent().getModel();
                var oJSONModel = new sap.ui.model.json.JSONModel();
                var oBusyDialog = new sap.m.BusyDialog({
                    title: "Loading Data",
                    text: "PLZ Wait ....."
                });
                oBusyDialog.open();
                oModel.read("/Customers",{
                    urlParameters:{
                        "$expand": "Orders"
                    },
                    success: function(resp){
                        oBusyDialog.close();
                        oJSONModel.setData(resp.results);
                        this.getView().setModel(oJSONModel,"EmployeeDataModel");
                    }.bind(this),
                    error: function(err){
                        oBusyDialog.close();
                    }
                });
            },

            onNavToDetails: function(oEvent){
                
                 var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                 var sCustomerId = oEvent.getSource().getCells()[0].getText();
                 oRouter.navTo("OrdersView",{customerId: sCustomerId});
            },

            onDataExport: sap.m.Table.prototype.exportData || function() {

                var oModel =  this.getOwnerComponent().getModel();
                var oExport = new Export({
    
                    exportType: new ExportTypeCSV({
                        fileExtension: "csv",
                        separatorChar: ";"
                    }),
    
                    models: oModel,
    
                    rows: {
                        path: "/Customers"
                    },
                    columns: [{
                        name: "First Name",
                        template: {
                            content: "{CustomerID}"
                        }
                    }, {
                        name: "Last name",
                        template: {
                            content: "{CompanyName}"
                        }
                    }]
                });
                console.log(oExport);
                oExport.saveFile().catch(function(oError) {
    
                }).then(function() {
                    oExport.destroy();
                });
            }
           
          });



    });
