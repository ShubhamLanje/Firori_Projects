
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/Dialog",
    "sap/m/Button",
    "sap/m/MessageBox"
    
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,Dialog,Button,MessageBox,) {
        "use strict";

        return Controller.extend("gauravpro.controller.MainView", {
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
                oModel.read("/Employees",{
                    success: function(resp){
                        oBusyDialog.close();
                        oJSONModel.setData(resp.results);
                        this.getView().setModel(oJSONModel,"Emp");
                    }.bind(this),
                    error: function(err){
                        oBusyDialog.close();
                    }
                });
            },
                       
            onRowClick: function(oEvent){
                //var oPath = oEvent.getSource().getBindingContext('Emp').getPath();
            if(!this.oDialog){
                this.loadFragment({
                    name:"gauravpro.fragment.dialog"
                }).then(function(odialog){
                    this.oDialog = odialog;
                    this.oDialog.open();
                    
                }.bind(this))
            }else{
                this.oDialog.open();
               
                }
            },
            handleCloseDialog: function(){
                this.oDialog.close();
            },
            savedata: function(){
                const myUniversallyUniqueID = globalThis.crypto.randomUUID();
                var a = this.byId("name1");
                var fmana = a.getValue();
                var b = this.byId("name2");
                var fname = b.getValue();
                var c = this.byId("name3");
                var fmail = c.getValue();
                
                
                var record = {
                    "ID": myUniversallyUniqueID,
                    "createdAt": null,
                    "createdBy": null,
                    "modifiedAt":null,
                    "modifiedBy":null,
                    "name": fname,
                    "email_id": fmail,
                    "manager": fmana,
                }
                
                console.log(record);
                jQuery.ajax({
                    type: "POST",
                    contentType: "application/json",
                    url: "/v2/odata/v4/employee-services/Employees",
                    data: JSON.stringify(record),
                    success: function (data) {
                        MessageBox.success("Data saved to local database successfully!");
                    },
                    error: function (err) {
                        MessageBox.error("Error saving data to local database: " + err.responseText);
                    }
                });
            
            },
            
                deleteData: function(oEvent){

                var oTable = this.getView().byId("tablemain");
                var aSelectedItems = oTable.getSelectedItems();
                var aListData = [];
 
               
                aSelectedItems.forEach(function (oItem) {
                    var oContext = oItem.getBindingContext("Emp");
                    var oData = oContext.getObject();
                    var oListItem = {
                        ID: oData.ID,
                        createdAt: oData.createdAt,
                        createdBy: oData.createdBy,
                        ContactTitle: oData.ContactTitle,
                        modifiedAt: oData.modifiedAt,
                        modifiedBy: oData.modifiedBy,
                        name: oData.name,
                        email_id: oData.email_id,
                        manager: oData.manager
                       
                    };
                    
                    var na = oListItem.ID;
                    jQuery.ajax({
                        type: "DELETE",
                        contentType: "application/json",
                        url: "/v2/odata/v4/employee-services/Employees(" + na + ")",
                        //data: JSON.stringify(oListItem),
                        success: function (data) {
                            MessageBox.success("Data IS DELETE");
                            
                        },
                        error: function (err) {
                            MessageBox.error("Error saving data to local database: " + err.responseText);
                        }
                    });
                   
                });
                // var na = oListItem.ID;
                // var path = "/Employees(" + na + ")"; 
                // var odataModel = this.getView().getModel();
                // odataModel.remove(path,{
                //     success: function(data,response){
                //         MessageBox.success("Deleted data");
                //     },
                //     error: function(error){
                //         MessageBox.error("Deletion failed");
                //     }
                // })
                
                }
 
            
            
        


        });
    });
