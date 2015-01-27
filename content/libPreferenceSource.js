'use strict'

Components.utils.import('resource://gre/modules/Services.jsm');

var PreferenceSource = {
	init: function() {
		
	},
	
	dispel: function() {
		
	},
	
	getStrLayout: function() {
		if (Services.prefs.prefHasUserValue('extensions.BookRect.Source.strLayout') === true) {
			return Services.prefs.getCharPref('extensions.BookRect.Source.strLayout');
		}
		
		return '[ [ "folderMenu", "folderToolbar" ], [ "folderUnfiled" ], [] ]';
	},
	
	setStrLayout: function(strLayout) {
		{
			Services.prefs.setCharPref('extensions.BookRect.Source.strLayout', strLayout);
		}
		
		{
			PreferenceSourceObserver.update();
		}
	},
	
	clearStrLayout: function() {
		{
			Services.prefs.clearUserPref('extensions.BookRect.Source.strLayout');
		}
		
		{
			PreferenceSourceObserver.update();
		}
	},
	
	getBoolToolbarVisible: function() {
		if (Services.prefs.prefHasUserValue('extensions.BookRect.Source.boolToolbarVisible') === true) {
			return Services.prefs.getBoolPref('extensions.BookRect.Source.boolToolbarVisible');
		}
		
		return true;
	},
	
	setBoolToolbarVisible: function(boolToolbarVisible) {
		{
			Services.prefs.setBoolPref('extensions.BookRect.Source.boolToolbarVisible', boolToolbarVisible);
		}
		
		{
			PreferenceSourceObserver.update();
		}
	},
	
	clearBoolToolbarVisible: function() {
		{
			Services.prefs.clearUserPref('extensions.BookRect.Source.boolToolbarVisible');
		}
		
		{
			PreferenceSourceObserver.update();
		}
	},
	
	getBoolToolbarSubfolder: function() {
		if (Services.prefs.prefHasUserValue('extensions.BookRect.Source.boolToolbarSubfolder') === true) {
			return Services.prefs.getBoolPref('extensions.BookRect.Source.boolToolbarSubfolder');
		}
		
		return false;
	},
	
	setBoolToolbarSubfolder: function(boolToolbarSubfolder) {
		{
			Services.prefs.setBoolPref('extensions.BookRect.Source.boolToolbarSubfolder', boolToolbarSubfolder);
		}
		
		{
			PreferenceSourceObserver.update();
		}
	},
	
	clearBoolToolbarSubfolder: function() {
		{
			Services.prefs.clearUserPref('extensions.BookRect.Source.boolToolbarSubfolder');
		}
		
		{
			PreferenceSourceObserver.update();
		}
	},
	
	getBoolMenuVisible: function() {
		if (Services.prefs.prefHasUserValue('extensions.BookRect.Source.boolMenuVisible') === true) {
			return Services.prefs.getBoolPref('extensions.BookRect.Source.boolMenuVisible');
		}
		
		return true;
	},
	
	setBoolMenuVisible: function(boolMenuVisible) {
		{
			Services.prefs.setBoolPref('extensions.BookRect.Source.boolMenuVisible', boolMenuVisible);
		}
		
		{
			PreferenceSourceObserver.update();
		}
	},
	
	clearBoolMenuVisible: function() {
		{
			Services.prefs.clearUserPref('extensions.BookRect.Source.boolMenuVisible');
		}
		
		{
			PreferenceSourceObserver.update();
		}
	},
	
	getBoolMenuSubfolder: function() {
		if (Services.prefs.prefHasUserValue('extensions.BookRect.Source.boolMenuSubfolder') === true) {
			return Services.prefs.getBoolPref('extensions.BookRect.Source.boolMenuSubfolder');
		}
		
		return true;
	},
	
	setBoolMenuSubfolder: function(boolMenuSubfolder) {
		{
			Services.prefs.setBoolPref('extensions.BookRect.Source.boolMenuSubfolder', boolMenuSubfolder);
		}
		
		{
			PreferenceSourceObserver.update();
		}
	},
	
	clearBoolMenuSubfolder: function() {
		{
			Services.prefs.clearUserPref('extensions.BookRect.Source.boolMenuSubfolder');
		}
		
		{
			PreferenceSourceObserver.update();
		}
	},
	
	getBoolUnfiledVisible: function() {
		if (Services.prefs.prefHasUserValue('extensions.BookRect.Source.boolUnfiledVisible') === true) {
			return Services.prefs.getBoolPref('extensions.BookRect.Source.boolUnfiledVisible');
		}
		
		return true;
	},
	
	setBoolUnfiledVisible: function(boolUnfiledVisible) {
		{
			Services.prefs.setBoolPref('extensions.BookRect.Source.boolUnfiledVisible', boolUnfiledVisible);
		}
		
		{
			PreferenceSourceObserver.update();
		}
	},
	
	clearBoolUnfiledVisible: function() {
		{
			Services.prefs.clearUserPref('extensions.BookRect.Source.boolUnfiledVisible');
		}
		
		{
			PreferenceSourceObserver.update();
		}
	},
	
	getBoolUnfiledSubfolder: function() {
		if (Services.prefs.prefHasUserValue('extensions.BookRect.Source.boolUnfiledSubfolder') === true) {
			return Services.prefs.getBoolPref('extensions.BookRect.Source.boolUnfiledSubfolder');
		}
		
		return true;
	},
	
	setBoolUnfiledSubfolder: function(boolUnfiledSubfolder) {
		{
			Services.prefs.setBoolPref('extensions.BookRect.Source.boolUnfiledSubfolder', boolUnfiledSubfolder);
		}
		
		{
			PreferenceSourceObserver.update();
		}
	},
	
	clearBoolUnfiledSubfolder: function() {
		{
			Services.prefs.clearUserPref('extensions.BookRect.Source.boolUnfiledSubfolder');
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
			PreferenceSource.clearStrLayout();
			
			PreferenceSource.clearBoolToolbarVisible();
			
			PreferenceSource.clearBoolToolbarSubfolder();
			
			PreferenceSource.clearBoolMenuVisible();
			
			PreferenceSource.clearBoolMenuSubfolder();
			
			PreferenceSource.clearBoolUnfiledVisible();
			
			PreferenceSource.clearBoolUnfiledSubfolder();
		}
		
		{
			PreferenceSourceObserver.boolEnabled = true;
			
			PreferenceSourceObserver.update();
		}
	}
};
PreferenceSource.init();
