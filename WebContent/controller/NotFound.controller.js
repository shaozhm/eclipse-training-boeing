sap.ui.define([
		"boeing/poc/Utilization/controller/BaseController"
	], function (BaseController) {
		"use strict";

		return BaseController.extend("boeing.poc.Utilization.controller.NotFound", {

			/**
			 * Navigates to the worklist when the link is pressed
			 * @public
			 */
			onLinkPressed: function () {
				this.getRouter().navTo("main");
			}

		});

	}
);
