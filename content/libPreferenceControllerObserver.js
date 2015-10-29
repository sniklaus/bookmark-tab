'use strict'

var PreferenceControllerObserver = {
	voidObserver: [],
	
	boolEnabled: false,
	
	init: function() {
		{
			PreferenceControllerObserver.voidObserver = [];
		}
		
		{
			PreferenceControllerObserver.boolEnabled = true;
		}
	},
	
	dispel: function() {
		{
			PreferenceControllerObserver.voidObserver = [];
		}
		
		{
			PreferenceControllerObserver.boolEnabled = false;
		}
	},
	
	addObserver: function(functionobserverHandle) {
		{
			PreferenceControllerObserver.voidObserver.push(functionobserverHandle);
		}
	},
	
	deleteObserver: function(functionobserverHandle) {
		{
			PreferenceControllerObserver.voidObserver.splice(PreferenceControllerObserver.voidObserver.indexOf(functionobserverHandle), 1);
		}
	},
	
	update: function() {
		{
			if (PreferenceControllerObserver.boolEnabled === false) {
				return;
			}
		}
		
		{
			for (var intFor1 = 0; intFor1 < PreferenceControllerObserver.voidObserver.length; intFor1 += 1) {
				(PreferenceControllerObserver.voidObserver[intFor1])();
			}
		}
	}
};
PreferenceControllerObserver.init();
