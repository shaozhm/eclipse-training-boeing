sap.ui.define([
	"boeing/poc/Utilization/controller/BaseController",
	"sap/ui/model/json/JSONModel"
], function(BaseController, JSONModel) {
	"use strict";

	return BaseController.extend("boeing.poc.Utilization.controller.CreateTicket", {
		onInit: function() {
			var oRouter = this.getRouter();
			oRouter.getRoute("createTicket").attachPatternMatched(this.onRouteMatched, this);

			this.oPageJsonModel = new JSONModel();
			this.getView().setModel(this.oPageJsonModel, "page");


			// Attaches validation handlers
			sap.ui.getCore().attachValidationError(function (oEvent) {
				oEvent.getParameter("element").setValueState(sap.ui.core.ValueState.Error);
			});

			sap.ui.getCore().attachValidationSuccess(function (oEvent) {
				oEvent.getParameter("element").setValueState(sap.ui.core.ValueState.None);
			});
		},

		onRouteMatched: function(oEvent) {
			this._sTicketFrom = oEvent.getParameter("arguments").ticketfrom;
			var aTypeMockJsonData = [
				{
					"key":"1",
					"text":"Reservation"
				},{
					"key":"2",
					"text":"Check in issue"
				},{
					"key":"3",
					"text":"maintenance"
				}
			];
			var aPriorityMockJsonData = [
				{
					"key":"1",
					"text":"Very High"
				},{
					"key":"2",
					"text":"High"
				},{
					"key":"3",
					"text":"Medium"
				},{
					"key":"4",
					"text":"Low"
				}
			];
			this.oPageJsonModel.setData({typelist: aTypeMockJsonData, prioritylist: aPriorityMockJsonData});
		},
		onOkPress: function(oEvent) {
			this.getRouter().navTo(this._sTicketFrom, {}, true);
		},
		onNavBack: function(oEvent) {
			//TODO need know end trip
			this.getRouter().navTo(this._sTicketFrom, {}, true);
		}

	});
});
