sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"hr_reportzhr_report/model/formatter",
	"sap/ui/core/routing/History",
	"sap/ui/core/UIComponent"
], function(Controller, JSONModel, Filter, FilterOperator, formatter, History, UIComponent) {
	"use strict";

	return Controller.extend("hr_reportzhr_report.controller.Salary", {
		formatter: formatter,

		onInit: function() {
			console.log(11);
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.getRoute("detail").attachPatternMatched(this._onObjectMatched, this);

			var oCombinedmodel = new JSONModel();
			oCombinedmodel.loadData("model/combinedData.json");

			this.getView().setModel(oCombinedmodel, "data");

		},
		_onObjectMatched: function(oEvent) {
			console.log(oEvent.getParameter("arguments"));
			var oData = this.getView().getModel("data").getData();
			var detail = {
				id: oEvent.getParameter("arguments").id
			};
			this.getView().setModel(new JSONModel(detail), "detail");

			console.log(oData);
		},
		onNavBack: function() {
			var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				// Tarayıcı geçmişinde geri gidilir
				window.history.go(-1);
			} else {
				// Önceki sayfa yoksa ana sayfaya yönlendirilir
				var oRouter = UIComponent.getRouterFor(this);
				oRouter.navTo("main", {}, true);
			}
		},
		onMainPage: function() {
			// Önceki sayfa yoksa ana sayfaya yönlendirilir
			var oRouter = UIComponent.getRouterFor(this);
			oRouter.navTo("main", {}, true);

		},
			onAdressDetail: function(oEvent) {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("adress", {
				id: 1
			});}
	});
});