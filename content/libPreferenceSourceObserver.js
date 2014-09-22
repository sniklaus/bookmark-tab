'use strict'

var PreferenceSourceObserver = {
	voidObserver: [],
	
	boolEnabled: false,
	
	init: function() {
		{
			PreferenceSourceObserver.voidObserver = [];
		}
		
		{
			PreferenceSourceObserver.boolEnabled = true;
		}
	},
	
	dispel: function() {
		{
			PreferenceSourceObserver.voidObserver = [];
		}
		
		{
			PreferenceSourceObserver.boolEnabled = false;
		}
	},
	
	addObserver: function(functionobserverHandle) {
		{
			PreferenceSourceObserver.voidObserver.push(functionobserverHandle);
		}
	},
	
	deleteObserver: function(functionobserverHandle) {
		{
			PreferenceSourceObserver.voidObserver.splice(PreferenceSourceObserver.voidObserver.indexOf(functionobserverHandle), 1);
		}
	},
	
	update: function() {
		{
			if (PreferenceSourceObserver.boolEnabled === false) {
				return;
			}
		}
		
		{
			for (var intFor1 = 0; intFor1 < PreferenceSourceObserver.voidObserver.length; intFor1 += 1) {
				(PreferenceSourceObserver.voidObserver[intFor1])();
			}
		}
	}
};
PreferenceSourceObserver.init();
