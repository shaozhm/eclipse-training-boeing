sap.ui.define([
	"boeing/poc/Utilization/controller/BaseController"
], function(BaseController) {
	"use strict";

	return BaseController.extend("boeing.poc.Utilization.controller.Main", {
		onInit: function() {
			var oRouter = this.getRouter();
			oRouter.getRoute("main").attachPatternMatched(this.onRouteMatched, this);
		},

		onRouteMatched: function(oEvent) {
		},
		handleNavigation: function () {
			console.log("press");
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("reservationDetail", {}, true);
		}
	});
});
