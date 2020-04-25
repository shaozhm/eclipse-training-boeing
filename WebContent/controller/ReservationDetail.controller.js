sap.ui.define([
	"boeing/poc/Utilization/controller/BaseController",
	"sap/ui/core/routing/History"
], function(BaseController, History) {
	"use strict";

	return BaseController.extend("boeing.poc.Utilization.controller.ReservationDetail", {
		onInit: function() {
			var oRouter = this.getRouter();
			oRouter.getRoute("reservationDetail").attachPatternMatched(this.onRouteMatched, this);
		},
		onRouteMatched: function(oEvent) {
		},
		onNavBack: function(oEvent) {
			this._navBack("main", {});
		},
		onCheck: function () {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("startTrip", {}, true);
		}
	});
});
