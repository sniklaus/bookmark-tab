'use strict'

var PreferenceStateObserver = {
	voidObserver: [],
	
	boolEnabled: false,
	
	init: function() {
		{
			PreferenceStateObserver.voidObserver = [];
		}
		
		{
			PreferenceStateObserver.boolEnabled = true;
		}
	},
	
	dispel: function() {
		{
			PreferenceStateObserver.voidObserver = [];
		}
		
		{
			PreferenceStateObserver.boolEnabled = false;
		}
	},
	
	addObserver: function(functionobserverHandle) {
		{
			PreferenceStateObserver.voidObserver.push(functionobserverHandle);
		}
	},
	
	deleteObserver: function(functionobserverHandle) {
		{
			PreferenceStateObserver.voidObserver.splice(PreferenceStateObserver.voidObserver.indexOf(functionobserverHandle), 1);
		}
	},
	
	update: function() {
		{
			if (PreferenceStateObserver.boolEnabled === false) {
				return;
			}
		}
		
		{
			for (var intFor1 = 0; intFor1 < PreferenceStateObserver.voidObserver.length; intFor1 += 1) {
				(PreferenceStateObserver.voidObserver[intFor1])();
			}
		}
	}
};
PreferenceStateObserver.init();
