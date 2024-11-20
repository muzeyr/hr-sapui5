sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"hr_reportzhr_report/model/models"
], function(UIComponent, Device, models) {
	"use strict";

	return UIComponent.extend("hr_reportzhr_report.Component", {

		metadata: {
			manifest: "json"
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function() {
		    console.log('Component'+ new Date())
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);
            this.getRouter().initialize();
			// set the device model
			this.setModel(models.createDeviceModel(), "device");
		}
	});
});