'use strict'

Components.utils.import('resource://gre/modules/Services.jsm');

var PreferenceSource = {
	init: function() {
		
	},
	
	dispel: function() {
		
	},
	
	getBoolToolbar: function() {
		if (Services.prefs.prefHasUserValue('extensions.BookRect.Source.boolToolbar') === true) {
			return Services.prefs.getBoolPref('extensions.BookRect.Source.boolToolbar');
		}
		
		return true;
	},
	
	setBoolToolbar: function(boolToolbar) {
		{
			Services.prefs.setBoolPref('extensions.BookRect.Source.boolToolbar', boolToolbar);
		}
		
		{
			PreferenceSourceObserver.update();
		}
	},
	
	clearBoolToolbar: function() {
		{
			Services.prefs.clearUserPref('extensions.BookRect.Source.boolToolbar');
		}
		
		{
			PreferenceSourceObserver.update();
		}
	},
	
	getBoolMenu: function() {
		if (Services.prefs.prefHasUserValue('extensions.BookRect.Source.boolMenu') === true) {
			return Services.prefs.getBoolPref('extensions.BookRect.Source.boolMenu');
		}
		
		return true;
	},
	
	setBoolMenu: function(boolMenu) {
		{
			Services.prefs.setBoolPref('extensions.BookRect.Source.boolMenu', boolMenu);
		}
		
		{
			PreferenceSourceObserver.update();
		}
	},
	
	clearBoolMenu: function() {
		{
			Services.prefs.clearUserPref('extensions.BookRect.Source.boolMenu');
		}
		
		{
			PreferenceSourceObserver.update();
		}
	},
	
	getBoolUnfiled: function() {
		if (Services.prefs.prefHasUserValue('extensions.BookRect.Source.boolUnfiled') === true) {
			return Services.prefs.getBoolPref('extensions.BookRect.Source.boolUnfiled');
		}
		
		return true;
	},
	
	setBoolUnfiled: function(boolUnfiled) {
		{
			Services.prefs.setBoolPref('extensions.BookRect.Source.boolUnfiled', boolUnfiled);
		}
		
		{
			PreferenceSourceObserver.update();
		}
	},
	
	clearBoolUnfiled: function() {
		{
			Services.prefs.clearUserPref('extensions.BookRect.Source.boolUnfiled');
		}
		
		{
			PreferenceSourceObserver.update();
		}
	},
	
	clear: function() {
		{
			PreferenceSourceObserver.boolEnabled = false;
		}
		
		{
			PreferenceSource.clearBoolToolbar();
			
			PreferenceSource.clearBoolMenu();
			
			PreferenceSource.clearBoolUnfiled();
		}
		
		{
			PreferenceSourceObserver.boolEnabled = true;
			
			PreferenceSourceObserver.update();
		}
	}
};
PreferenceSource.init();