sap.ui.define([], function() {
	"use strict";
	return {
		fullName: function(firstName, lastName) {
			return firstName + " " + lastName;
		},
		formatAge: function(birthDate) {
			if (!birthDate) {
				return "";
			}
			var birth = new Date(birthDate);
			var today = new Date();

			var age = today.getFullYear() - birth.getFullYear();
			var monthDiff = today.getMonth() - birth.getMonth();
			if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
				age--;
			}
			return age;
		},
		formatStatusIcon: function(status){
		    return status === "active" ?  "sap-icon://accept"  : "sap-icon://decline";
		}
	};
});