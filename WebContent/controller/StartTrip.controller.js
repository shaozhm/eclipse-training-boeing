sap.ui.define([
	"boeing/poc/Utilization/controller/BaseController",
	"sap/ui/model/json/JSONModel"
], function(BaseController, JSONModel) {
	"use strict";

	return BaseController.extend("boeing.poc.Utilization.controller.StartTrip", {
		onInit: function() {
			var oRouter = this.getRouter();
			//this.attachRequestFaild();
			oRouter.getRoute("startTrip").attachPatternMatched(this.onObjectMatched, this);

			this.oChecklistJsonModel = new JSONModel();
			this.oChecklistJsonModel.setDefaultBindingMode(sap.ui.model.BindingMode.TwoWay);
			this.getView().setModel(this.oChecklistJsonModel, "checkList");

			this.oPageJsonModel = new JSONModel();
			this.oPageJsonModel.setDefaultBindingMode(sap.ui.model.BindingMode.TwoWay);
			this.getView().setModel(this.oPageJsonModel, "page");
		},
		attachRequestFaild: function(){
			this.getOwnerComponent().getModel().attachRequestFailed(function(oEvent){
				var oError = oEvent.getParameters();

			}, this);
		},
		onObjectMatched: function(oEvent) {

			var aMockJsonData = [
				{
					"title":"Mirrors/Cameras",
					"checkState":false
				},{	
					"title":"Brake Lights/Headlights",
					"checkState":false
				},{	
					"title":"Gauges/ Radio/Horn",
					"checkState":false
				},{	
					"title":"Hydraulic/Limit Switch",
					"checkState":false
				},{	
					"title":"Steering/Braking",
					"checkState":false
				},{	
					"title":"Hoist-Lower/Tilt Controls",
					"checkState":false
				},{	
					"title":"Seat Belt",
					"checkState":false
				},{	
					"title":"Back-Up Alarm",
					"checkState":false
				},{	
					"title":"Back-Up Lights",
					"checkState":false
				}
			];
			this.oChecklistJsonModel.setData({
				list: aMockJsonData
			});

			var oPageMockJsonData = {
				"reservationDetails": {
					"gasUsed": "29.8L",
					"distance": "239KM",
					"during": "8h35m",
					"status": "Active"
				},
				"checkinButtonEnabled": false
			};
			this.oPageJsonModel.setData(oPageMockJsonData);

		},
		changeSwitch: function(oEvent) {
			console.log("change switch", oEvent.getSource().getState());
			var aList = this.oChecklistJsonModel.getData().list;
			var bCheckInEnabled = true;
			for(var oItem in aList) {
				if (!aList[oItem].checkState) {
					bCheckInEnabled = false;
					break;
				}
			}
			console.log("bCheckInEnabled: ", bCheckInEnabled);
			this.oPageJsonModel.setProperty("/checkinButtonEnabled", bCheckInEnabled);
		},
		onCheckInPress: function () {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("endTrip", {}, true);
		},
		onNavBack: function(oEvent) {
			this._navBack("reservationDetail", {});
		},
		onRequestAsstPress: function () {
			//1. open dialog
			if (!this._oRequestAsstDialog) {
				this._oRequestAsstDialog = sap.ui.xmlfragment("boeing.poc.Utilization.view.RequestAssistanceDialog", this);
				this.getView().addDependent(this._oRequestAsstDialog);
			}
			this._oRequestAsstDialog.open();
		},

		//Choose Create ticket
		onCreateTicketPress: function() {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			console.log("close the page.");
			// window.close();
			this._oRequestAsstDialog.close();
			console.log("open the ticket creation page.");
			oRouter.navTo("createTicket", {"ticketfrom": "startTrip"}, true);
		},
		//Choose Create ticket
		onCancelTicketPress: function() {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			console.log("close the page.");
			// window.close();
			this._oRequestAsstDialog.close();
		},
		formatReservationStatusState: function( sStatusText ) {
			return "Success";
		},
		formatReservationStatusIcon: function( sStatusIcon ) {
			return "sap-icon://pending";
		}
	});
});
