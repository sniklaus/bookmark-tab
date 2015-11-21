'use strict'

Components.utils.import('resource://gre/modules/Services.jsm');

var PreferenceState = {
	init: function() {
		
	},
	
	dispel: function() {
		
	},
	
	getStrState: function() {
		if (Services.prefs.prefHasUserValue('extensions.BookRect.State.strState') === true) {
			return Services.prefs.getCharPref('extensions.BookRect.State.strState');
		}
		
		return "{}";
	},
	
	setStrState: function(strState) {
		{
			Services.prefs.setCharPref('extensions.BookRect.State.strState', strState);
		}
		
		{
			PreferenceStateObserver.update();
		}
	},
	
	clearStrState: function() {
		{
			Services.prefs.clearUserPref('extensions.BookRect.State.strState');
		}
		
		{
			PreferenceStateObserver.update();
		}
	},
	
	clear: function() {
		{
			PreferenceStateObserver.boolEnabled = false;
		}
		
		{
			PreferenceState.clearStrState();
		}
		
		{
			PreferenceStateObserver.boolEnabled = true;
			
			PreferenceStateObserver.update();
		}
	}
};
PreferenceState.init();
