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

	return Controller.extend("hr_reportzhr_report.controller.Adress", {
		formatter: formatter,

		onInit: function() {
			console.log(11);

			debugger;

			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.getRoute("adress").attachPatternMatched(this._onObjectMatched, this);

			var oCombinedmodel = new JSONModel();
			oCombinedmodel.loadData("model/combinedData.json");

			this.getView().setModel(oCombinedmodel, "data");

		},
		_onObjectMatched: function(oEvent) {

			debugger;
			console.log(oEvent.getParameter("arguments"));
			var oData = this.getView().getModel("data").getData();
			var detail = {
				id: oEvent.getParameter("arguments").id
			};
			this.getView().setModel(new JSONModel(detail), "detail");

			var oTable = this.byId("idAddressTable");
			var oBinding = oTable.getBinding("items");
			var oFilter = new sap.ui.model.Filter("PersonelId", sap.ui.model.FilterOperator.EQ, oEvent.getParameter("arguments").id);
			oBinding.filter([oFilter]);

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

		}
	});
});