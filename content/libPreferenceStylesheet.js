'use strict'

Components.utils.import('resource://gre/modules/Services.jsm');

var PreferenceStylesheet = {
	init: function() {
		
	},
	
	dispel: function() {
		
	},
	
	getStrGeneral: function() {
		if (Services.prefs.prefHasUserValue('extensions.BookRect.Stylesheet.strGeneral') === true) {
			return Services.prefs.getCharPref('extensions.BookRect.Stylesheet.strGeneral');
		}
		
		return "";
	},
	
	setStrGeneral: function(strGeneral) {
		{
			Services.prefs.setCharPref('extensions.BookRect.Stylesheet.strGeneral', strGeneral);
		}
		
		{
			PreferenceStylesheetObserver.update();
		}
	},
	
	clearStrGeneral: function() {
		{
			Services.prefs.clearUserPref('extensions.BookRect.Stylesheet.strGeneral');
		}
		
		{
			PreferenceStylesheetObserver.update();
		}
	},
	
	clear: function() {
		{
			PreferenceStylesheetObserver.boolEnabled = false;
		}
		
		{
			PreferenceStylesheet.clearStrGeneral();
		}
		
		{
			PreferenceStylesheetObserver.boolEnabled = true;
			
			PreferenceStylesheetObserver.update();
		}
	}
};
PreferenceStylesheet.init();
