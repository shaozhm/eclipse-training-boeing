sap.ui.define([
	"boeing/poc/Utilization/controller/BaseController",
	"sap/ui/model/json/JSONModel"
], function(BaseController, JSONModel) {
	"use strict";

	return BaseController.extend("boeing.poc.Utilization.controller.App", {
		onInit: function() {
			var oViewModel;
			oViewModel = new JSONModel({
				busy: false,
				delay: 0
			});
			this.setModel(oViewModel, "appView");

		}
	});
});
