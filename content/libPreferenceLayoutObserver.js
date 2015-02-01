'use strict'

var PreferenceLayoutObserver = {
	voidObserver: [],
	
	boolEnabled: false,
	
	init: function() {
		{
			PreferenceLayoutObserver.voidObserver = [];
		}
		
		{
			PreferenceLayoutObserver.boolEnabled = true;
		}
	},
	
	dispel: function() {
		{
			PreferenceLayoutObserver.voidObserver = [];
		}
		
		{
			PreferenceLayoutObserver.boolEnabled = false;
		}
	},
	
	addObserver: function(functionobserverHandle) {
		{
			PreferenceLayoutObserver.voidObserver.push(functionobserverHandle);
		}
	},
	
	deleteObserver: function(functionobserverHandle) {
		{
			PreferenceLayoutObserver.voidObserver.splice(PreferenceLayoutObserver.voidObserver.indexOf(functionobserverHandle), 1);
		}
	},
	
	update: function() {
		{
			if (PreferenceLayoutObserver.boolEnabled === false) {
				return;
			}
		}
		
		{
			for (var intFor1 = 0; intFor1 < PreferenceLayoutObserver.voidObserver.length; intFor1 += 1) {
				(PreferenceLayoutObserver.voidObserver[intFor1])();
			}
		}
	}
};
PreferenceLayoutObserver.init();
