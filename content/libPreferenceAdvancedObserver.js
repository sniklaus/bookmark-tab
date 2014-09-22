'use strict'

var PreferenceAdvancedObserver = {
	voidObserver: [],
	
	boolEnabled: false,
	
	init: function() {
		{
			PreferenceAdvancedObserver.voidObserver = [];
		}
		
		{
			PreferenceAdvancedObserver.boolEnabled = true;
		}
	},
	
	dispel: function() {
		{
			PreferenceAdvancedObserver.voidObserver = [];
		}
		
		{
			PreferenceAdvancedObserver.boolEnabled = false;
		}
	},
	
	addObserver: function(functionobserverHandle) {
		{
			PreferenceAdvancedObserver.voidObserver.push(functionobserverHandle);
		}
	},
	
	deleteObserver: function(functionobserverHandle) {
		{
			PreferenceAdvancedObserver.voidObserver.splice(PreferenceAdvancedObserver.voidObserver.indexOf(functionobserverHandle), 1);
		}
	},
	
	update: function() {
		{
			if (PreferenceAdvancedObserver.boolEnabled === false) {
				return;
			}
		}
		
		{
			for (var intFor1 = 0; intFor1 < PreferenceAdvancedObserver.voidObserver.length; intFor1 += 1) {
				(PreferenceAdvancedObserver.voidObserver[intFor1])();
			}
		}
	}
};
PreferenceAdvancedObserver.init();
