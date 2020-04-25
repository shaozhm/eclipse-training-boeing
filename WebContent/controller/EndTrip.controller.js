sap.ui.define([
	"boeing/poc/Utilization/controller/BaseController",
	"sap/ui/model/json/JSONModel"
], function(BaseController, JSONModel) {
	"use strict";

	return BaseController.extend("boeing.poc.Utilization.controller.EndTrip", {
		onInit: function() {
			var oRouter = this.getRouter();
			//this.attachRequestFaild();
			oRouter.getRoute("endTrip").attachPatternMatched(this.onRouteMatched, this);

			this.oCheckoutlistJsonModel = new JSONModel();
			this.oCheckoutlistJsonModel.setDefaultBindingMode(sap.ui.model.BindingMode.TwoWay);
			this.getView().setModel(this.oCheckoutlistJsonModel, "checkOutList");

			this.oPageJsonModel = new JSONModel();
			this.oPageJsonModel.setDefaultBindingMode(sap.ui.model.BindingMode.TwoWay);
			this.getView().setModel(this.oPageJsonModel, "page");
		},
		attachRequestFaild: function(){
			this.getOwnerComponent().getModel().attachRequestFailed(function(oEvent){
				var oError = oEvent.getParameters();

			}, this);
		},
		onRouteMatched: function(oEvent) {
			var aMockJsonData = [
				{
					"title":"Tires & Lug Nuts",
					"checkState":false
				},{
					"title":"Mast/Chains",
					"checkState":false
				},{
					"title":"Hydraulic/Fittings/Hoses",
					"checkState":false
				},{
					"title":"Forks/Tow Hitch/Rollers",
					"checkState":false
				},{
					"title":"Fuel System/Fittings",
					"checkState":false
				},{
					"title":"Belt Tension/Wear",
					"checkState":false
				},{
					"title":"Current Service",
					"checkState":false
				},{
					"title":"Battery Condition",
					"checkState":false
				},{
					"title":"No Fluid Leaks Equip",
					"checkState":false
				},{
					"title":"Check Fluid Level",
					"checkState":false
				},{
					"title":"Attachments to Forks",
					"checkState":false
				},{
					"title":"Load Backrest Extension",
					"checkState":false
				}				
			];
			this.oCheckoutlistJsonModel.setData({
				list: aMockJsonData
			});

			var oPageMockJsonData = {
				"reservationDetails": {
					"gasUsed": "29.8L",
					"distance": "239KM",
					"during": "8h35m",
					"status": "Active"
				},
				"checkoutButtonEnabled": false
			};
			this.oPageJsonModel.setData(oPageMockJsonData);
		},
		changeSwitch: function(oEvent) {
			console.log("change switch", oEvent.getSource().getState());
			var aList = this.oCheckoutlistJsonModel.getData().list;
			var bCheckOutEnabled = true;
			for(var oItem in aList) {
				if (!aList[oItem].checkState) {
					bCheckOutEnabled = false;
					break;
				}
			}
			console.log("bCheckOutEnabled: ", bCheckOutEnabled);
			this.oPageJsonModel.setProperty("/checkoutButtonEnabled", bCheckOutEnabled);
		},
		onCheckOutPress: function () {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("feedback", {}, true);
		},
		onNavBack: function(oEvent) {
			this._navBack("startTrip", {});
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
			//TODO need know end trip
			oRouter.navTo("createTicket", {"ticketfrom": "endTrip"}, true);
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
