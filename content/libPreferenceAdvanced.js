'use strict'

Components.utils.import('resource://gre/modules/Services.jsm');

var PreferenceAdvanced = {
	init: function() {
		
	},
	
	dispel: function() {
		
	},
	
	getBoolAutostart: function() {
		if (Services.prefs.prefHasUserValue('extensions.BookRect.Advanced.boolAutostart') === true) {
			return Services.prefs.getBoolPref('extensions.BookRect.Advanced.boolAutostart');
		}
		
		return true;
	},
	
	setBoolAutostart: function(boolAutostart) {
		{
			Services.prefs.setBoolPref('extensions.BookRect.Advanced.boolAutostart', boolAutostart);
		}
		
		{
			PreferenceAdvancedObserver.update();
		}
	},
	
	clearBoolAutostart: function() {
		{
			Services.prefs.clearUserPref('extensions.BookRect.Advanced.boolAutostart');
		}
		
		{
			PreferenceAdvancedObserver.update();
		}
	},
	
	getBoolSearch: function() {
		if (Services.prefs.prefHasUserValue('extensions.BookRect.Advanced.boolSearch') === true) {
			return Services.prefs.getBoolPref('extensions.BookRect.Advanced.boolSearch');
		}
		
		return true;
	},
	
	setBoolSearch: function(boolSearch) {
		{
			Services.prefs.setBoolPref('extensions.BookRect.Advanced.boolSearch', boolSearch);
		}
		
		{
			PreferenceAdvancedObserver.update();
		}
	},
	
	clearBoolSearch: function() {
		{
			Services.prefs.clearUserPref('extensions.BookRect.Advanced.boolSearch');
		}
		
		{
			PreferenceAdvancedObserver.update();
		}
	},
	
	getBoolState: function() {
		if (Services.prefs.prefHasUserValue('extensions.BookRect.Advanced.boolState') === true) {
			return Services.prefs.getBoolPref('extensions.BookRect.Advanced.boolState');
		}
		
		return false;
	},
	
	setBoolState: function(boolState) {
		{
			Services.prefs.setBoolPref('extensions.BookRect.Advanced.boolState', boolState);
		}
		
		{
			PreferenceAdvancedObserver.update();
		}
	},
	
	clearBoolState: function() {
		{
			Services.prefs.clearUserPref('extensions.BookRect.Advanced.boolState');
		}
		
		{
			PreferenceAdvancedObserver.update();
		}
	},
	
	clear: function() {
		{
			PreferenceAdvancedObserver.boolEnabled = false;
		}
		
		{
			PreferenceAdvanced.clearBoolAutostart();
			
			PreferenceAdvanced.clearBoolSearch();
			
			PreferenceAdvanced.clearBoolState();
		}
		
		{
			PreferenceAdvancedObserver.boolEnabled = true;
			
			PreferenceAdvancedObserver.update();
		}
	}
};
PreferenceAdvanced.init();
