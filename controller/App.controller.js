sap.ui.define([
  'sap/ui/core/mvc/Controller',
  'sap/ui/model/json/JSONModel',
  'sap/m/Dialog',
  'sap/m/Button'
  ],
	function(Controller, JSONModel,Dialog, Button) {
	"use strict";
 
	var PageController = Controller.extend("opensap.myapp.controller.App", {
 
		onInit: function () {
			console.log('Controller rendering')
		},
 
		handleAppointmentSelect: function (oEvent) {
			var oAppointment = oEvent.getParameter("appointment");
			if (oAppointment) {
				alert("Appointment selected: " + oAppointment.getTitle());
			}else {
				var aAppointments = oEvent.getParameter("appointments");
				var sValue = aAppointments.length + " Appointments selected";
				alert(sValue);
			}
		},
		handleIntervalSelect:function(oEvent){
		  
		  var dialogData = {
		    newEntry: {
  		    start: oEvent.getParameter("startDate"),
  				end: oEvent.getParameter("endDate"),
  				title: "",
  				info: "",
  				type: "Type01",
  				pic: "sap-icon://sap-ui5",
  				tentative: false
		    },
		    people: this.getView().getModel().getProperty("/people").map(function(p,i){ return { name: p.name, index: i, selected: true }; }) //A List of all people. All selected by default.
				};
			var dialogModel = new JSONModel(dialogData);
			var that = this;
			var planningDialog = new Dialog({
			  title:"Add Appointment",
			  content: sap.ui.xmlview({viewName:"opensap.myapp.view.AppointmentDialog"}).setModel(dialogModel),
			  leftButton: new Button({
			    text: "Cancel", 
			    press: function(){ 
			      planningDialog.close(); 
			      planningDialog.destroy();
			    }}),
			  rightButton: new Button({
			    text: "Save", 
			    type: "Accept",
			    press: function(){ 
			      planningDialog.close(); 
			      that.addAppointment(dialogData);
			    }}),
			  
			});
			planningDialog.open();
			
		},
		addAppointment:function(data){
		  var model = this.getView().getModel();
		  var peopleList = model.getProperty("/people");
		  data.people
		    .filter(function(p){return p.selected;})
		    .forEach(function(p){ 
		      peopleList[p.index].appointments.push(data.newEntry);
		    });
		    model.setProperty("/people",peopleList); //Updates Bindings
		}
 
	});
 
	return PageController;
 
});