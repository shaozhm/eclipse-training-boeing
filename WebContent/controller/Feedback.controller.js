sap.ui.define([
	"boeing/poc/Utilization/controller/BaseController",
	"sap/ui/core/routing/History"
], function(BaseController, History, Dialog, Text, Button) {
	"use strict";

	return BaseController.extend("boeing.poc.Utilization.controller.Feedback", {
		onInit: function() {
			var oRouter = this.getRouter();
			oRouter.getRoute("feedback").attachPatternMatched(this.onRouteMatched, this);
		},

		onRouteMatched: function(oEvent) {
		},
		onNavBack: function(oEvent) {
			this._navBack("endTrip", {});
		},
		onFeedbackSubmit: function (oEvent) {
			//1. Call oData to submit ticket information

			//2. If success, open a dialog to show ticket number
			if (!this._oFeedbackSubmitDialog) {
				this._oFeedbackSubmitDialog = sap.ui.xmlfragment("boeing.poc.Utilization.view.FeedbackSubmitDialog", this);
				this.getView().addDependent(this._oFeedbackSubmitDialog);
			}
			this._oFeedbackSubmitDialog.open();
		},

		//Submit Feedback dialog ->OK
		onSubmitOKPress: function(oEvent) {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			console.log("close the page.");
			// window.close();
			this._oFeedbackSubmitDialog.close();
			//3. click OK to nav to main view.
			oRouter.navTo("main", {}, true);
		},
		//Submit Feedback dialog ->Cancel
		onSubmitCancelPress: function(oEvent) {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			// window.close();
			this._oFeedbackSubmitDialog.close();
		},

		//Skip Feedback dialog
		onFeedbackSkip: function (oEvent) {
			if (!this._oFeedbackSkipDialog) {
				this._oFeedbackSkipDialog = sap.ui.xmlfragment("boeing.poc.Utilization.view.FeedbackSkipDialog", this);
				this.getView().addDependent(this._oFeedbackSkipDialog);
			}
			this._oFeedbackSkipDialog.open();
		},
		//SKip Feedback ->Skip
		onSkipOKPress: function(oEvent) {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			// window.close();
			this._oFeedbackSkipDialog.close();
			//3. click OK to nav to main view.
			oRouter.navTo("main", {}, true);
		},
		//SKip Feedback ->Cancel
		onSkipCancelPress: function(oEvent) {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			// window.close();
			this._oFeedbackSkipDialog.close();
		}
	});
});
