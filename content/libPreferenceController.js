'use strict'

Components.utils.import('resource://gre/modules/Services.jsm');

var PreferenceController = {
	init: function() {
		
	},
	
	dispel: function() {
		
	},
	
	getLongTimestamp: function() {
		if (Services.prefs.prefHasUserValue('extensions.BookRect.Controller.longTimestamp') === true) {
			return parseInt(Services.prefs.getCharPref('extensions.BookRect.Controller.longTimestamp'), 10);
		}
		
		return 0;
	},
	
	setLongTimestamp: function(longTimestamp) {
		{
			Services.prefs.setCharPref('extensions.BookRect.Controller.longTimestamp', String(longTimestamp));
		}
		
		{
			PreferenceControllerObserver.update();
		}
	},
	
	clearLongTimestamp: function() {
		{
			Services.prefs.clearUserPref('extensions.BookRect.Controller.longTimestamp');
		}
		
		{
			PreferenceControllerObserver.update();
		}
	},
	
	clear: function() {
		{
			PreferenceControllerObserver.boolEnabled = false;
		}
		
		{
			PreferenceController.clearLongTimestamp();
		}
		
		{
			PreferenceControllerObserver.boolEnabled = true;
			
			PreferenceControllerObserver.update();
		}
	}
};
PreferenceController.init();
