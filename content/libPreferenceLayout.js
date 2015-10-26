'use strict'

Components.utils.import('resource://gre/modules/Services.jsm');

var PreferenceLayout = {
	init: function() {
		
	},
	
	dispel: function() {
		
	},
	
	getStrFirst: function() {
		if (Services.prefs.prefHasUserValue('extensions.BookRect.Layout.strFirst') === true) {
			return Services.prefs.getCharPref('extensions.BookRect.Layout.strFirst');
		}
		
		return "[]";
	},
	
	setStrFirst: function(strFirst) {
		{
			Services.prefs.setCharPref('extensions.BookRect.Layout.strFirst', strFirst);
		}
		
		{
			PreferenceLayoutObserver.update();
		}
	},
	
	clearStrFirst: function() {
		{
			Services.prefs.clearUserPref('extensions.BookRect.Layout.strFirst');
		}
		
		{
			PreferenceLayoutObserver.update();
		}
	},
	
	getStrSecond: function() {
		if (Services.prefs.prefHasUserValue('extensions.BookRect.Layout.strSecond') === true) {
			return Services.prefs.getCharPref('extensions.BookRect.Layout.strSecond');
		}
		
		return "[]";
	},
	
	setStrSecond: function(strSecond) {
		{
			Services.prefs.setCharPref('extensions.BookRect.Layout.strSecond', strSecond);
		}
		
		{
			PreferenceLayoutObserver.update();
		}
	},
	
	clearStrSecond: function() {
		{
			Services.prefs.clearUserPref('extensions.BookRect.Layout.strSecond');
		}
		
		{
			PreferenceLayoutObserver.update();
		}
	},
	
	getStrThird: function() {
		if (Services.prefs.prefHasUserValue('extensions.BookRect.Layout.strThird') === true) {
			return Services.prefs.getCharPref('extensions.BookRect.Layout.strThird');
		}
		
		return "[]";
	},
	
	setStrThird: function(strThird) {
		{
			Services.prefs.setCharPref('extensions.BookRect.Layout.strThird', strThird);
		}
		
		{
			PreferenceLayoutObserver.update();
		}
	},
	
	clearStrThird: function() {
		{
			Services.prefs.clearUserPref('extensions.BookRect.Layout.strThird');
		}
		
		{
			PreferenceLayoutObserver.update();
		}
	},
	
	clear: function() {
		{
			PreferenceLayoutObserver.boolEnabled = false;
		}
		
		{
			PreferenceLayout.clearStrFirst();
			
			PreferenceLayout.clearStrSecond();
			
			PreferenceLayout.clearStrThird();
		}
		
		{
			PreferenceLayoutObserver.boolEnabled = true;
			
			PreferenceLayoutObserver.update();
		}
	}
};
PreferenceLayout.init();
