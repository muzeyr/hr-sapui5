sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function(Controller, JSONModel, Filter, FilterOperator) {
	"use strict";

	return Controller.extend("ZEGITIM_HRZEGITIM_HR.controller.Main", {
			onInit: function() {
		var oModel = new sap.ui.model.odata.v2.ODataModel({
    serviceUrl: "/sap/opu/odata/sap/ZEGITIM_HR_SRV/",
    json: true, // JSON formatında veri almak için
    defaultCountMode: "Inline", // Sayfalama kullanımı
    useBatch: true, // Toplu işlemler
    odataVersion: "2.0" // OData v2 versiyonunu belirtmek
});

             //var oModel = new sap.ui.model.odata.v2.ODataModel("/sap/opu/odata/sap/ZEGITIM_HR_SRV/");
            this.getView().setModel(oModel);

		}

	});
});