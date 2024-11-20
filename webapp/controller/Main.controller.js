sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"hr_reportzhr_report/model/formatter"
], function(Controller, JSONModel, Filter, FilterOperator, formatter) {
	"use strict";

	return Controller.extend("hr_reportzhr_report.controller.Main", {
		formatter: formatter,
		onInit: function() {
			console.log('MainComponent' + new Date())
			var oCombinedmodel = new JSONModel();
			oCombinedmodel.loadData("model/combinedData.json");
			oCombinedmodel.attachRequestCompleted(function() {
				console.log("JSON data loaded successgully");
			})

			this.getView().setModel(oCombinedmodel, "data");

		},
		onFilter: function() {
			var oTable = this.getView().byId("persons");
			var oBinding = oTable.getBinding("items");
			var oData = this.getView().getModel("data").getData();

			var oFilters = [];
			if (oData.filter.gender) {
				oFilters.push(new Filter("gender", FilterOperator.EQ, oData.filter.gender));
			}
			if (oData.filter.birthPlace) {
				oFilters.push(new Filter("birthPlace", FilterOperator.Contains, oData.filter.birthPlace));
			}
			if (oData.filter.isActive) {
				oFilters.push(new Filter("status", FilterOperator.EQ, "active"));
			}
			if (oData.filter.fullName) {
				var orFilter = new Filter({
					filters: [
						new Filter("firstName", FilterOperator.Contains, oData.filter.fullName),
						new Filter("lastName", FilterOperator.Contains, oData.filter.fullName)
					],
					and: false
				});
				oFilters.push(orFilter);
			}
			if (oData.filter.birtDate) {
				var dateRange = oData.filter.birtDate.split(" - ");
				var oStartDate = new Date(dateRange[0]);
				var oEndDate = new Date(dateRange[1]);

				// Eğer tarihler UTC formatında olması gerekiyorsa, bu formatlamayı kullanabilirsiniz:
				// var oStartDate = new Date(dateRange[0] + "T00:00:00Z");
				// var oEndDate = new Date(dateRange[1] + "T23:59:59Z");

				oFilters.push(new Filter("birthDate", FilterOperator.BT, oStartDate, oEndDate));
			}

			oBinding.filter(oFilters);

		},
		onAfterRendering: function() {
			var oTable = this.getView().byId("persons");
			var oItems = oTable.getItems();
			oItems.forEach(function(oItem) {
				var oContext = oItem.getBindingContext("data");
				if (oContext) {
					var birthDate = oContext.getProperty("birthDate");
					var age = this.formatter.formatAge(birthDate);
					if (age > 35) {
						oItem.addStyleClass("highlight-red");
					}

				}

			}.bind(this))

			console.log("onAfterRending");
		},
		onPlaceOfBirthValueHelp: function() {
			if (!this._oDialog) {
				this._oDialog = sap.ui.xmlfragment(this.getView().getId(), "hr_reportzhr_report.view.PlaceOfBirthDialog", this)
				this.getView().addDependent(this._oDialog);
			}

			this._oDialog.open();

		},
		onCloseDialog: function() {
			if (this._oDialog) {
				this._oDialog.close();

			}
		},
		onFilterPlaces: function(oEvent) {
			var sValue = oEvent.getParameter("value");
			var oList = this.byId("placesList");
			var oBinding = oList.getBinding("items");
			var oFilter = new Filter("name", FilterOperator.Contains, sValue);
			oBinding.filter(oFilter);
		},
		onPlaceSelected: function(oEvent) {
			var sSelectedPlace = oEvent.getSource().getTitle();
			var oData = this.getView().getModel("data").getData();
			oData.filter.birthPlace = sSelectedPlace;
			this.getView().setModel(new JSONModel(oData), "data");
			this.onCloseDialog();
			this.onFilter();

		},
		onTableItemPress: function(oEvent) {
			var oItem = oEvent.getSource();

			var oContext = oItem.getBindingContext("vbap");

			if (oContext) {
				var oData = oContext.getObject();

				// Router nesnesini alır ve detail sayfasına yönlendirir
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("detail", {
					id: oData.Id,
					fullName: oData.FirstName + ' ' + oData.LastName
				});
			} else {
				console.error("Bağlam alınamadı, oContext 'undefined' döndü.");
			}

		}

	});
});