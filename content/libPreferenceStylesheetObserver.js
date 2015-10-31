'use strict'

var PreferenceStylesheetObserver = {
	voidObserver: [],
	
	boolEnabled: false,
	
	init: function() {
		{
			PreferenceStylesheetObserver.voidObserver = [];
		}
		
		{
			PreferenceStylesheetObserver.boolEnabled = true;
		}
	},
	
	dispel: function() {
		{
			PreferenceStylesheetObserver.voidObserver = [];
		}
		
		{
			PreferenceStylesheetObserver.boolEnabled = false;
		}
	},
	
	addObserver: function(functionobserverHandle) {
		{
			PreferenceStylesheetObserver.voidObserver.push(functionobserverHandle);
		}
	},
	
	deleteObserver: function(functionobserverHandle) {
		{
			PreferenceStylesheetObserver.voidObserver.splice(PreferenceStylesheetObserver.voidObserver.indexOf(functionobserverHandle), 1);
		}
	},
	
	update: function() {
		{
			if (PreferenceStylesheetObserver.boolEnabled === false) {
				return;
			}
		}
		
		{
			for (var intFor1 = 0; intFor1 < PreferenceStylesheetObserver.voidObserver.length; intFor1 += 1) {
				(PreferenceStylesheetObserver.voidObserver[intFor1])();
			}
		}
	}
};
PreferenceStylesheetObserver.init();
