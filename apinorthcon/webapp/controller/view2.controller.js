sap.ui.define([
    "sap/ui/core/mvc/Controller",
    'sap/ui/model/json/JSONModel'
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */   
    function (Controller) {
        "use strict";

        return Controller.extend("apinorthcon.controller.view2", {
            onInit: function () {
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
                //this.getOwnerComponent().getModel( "EmployeeDataModel" ).setProperty( "/Customers", e.results);
                 var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                 var SelectedItem = oEvent.getSource().getCells()[0].getText();
                 oRouter.navTo("view2",{customerID:SelectedItem});
                //oRouter.navTo("view2");

            },
            onRowClick: function(oEvent){
                var oPath = oEvent.getSource().getBindingContext('EmployeeDataModel').getPath();
            if(!this.oDialog){
                this.loadFragment({
                    name:"apinorthcon.fragments.dialog"
                }).then(function(odialog){
                    this.oDialog = odialog;
                    this.oDialog.open();
                    this.oDialog.bindElement({
                        path: oPath,
                        model: "EmployeeDataModel"
                    })
                }.bind(this))
            }else{
                this.oDialog.open();
                this.oDialog.bindElement({
                    path: oPath,
                    model: "EmployeeDataModel"
                })
                }
            },
            handleCloseDialog: function(){
                this.oDialog.close();
            }
        });
    });

