'use strict';

{
	// ------------------------------------------------------------------------------------------------
	// - preferences.js
	// ------------------------------------------------------------------------------------------------
	
	require('chrome').Cu.import('resource://gre/modules/Services.jsm');
	
	var PreferenceNewtab = new function PreferenceNewtab() {
		var boolObtained = false;
		
		var objectSingleton = this;
		
		PreferenceNewtab.init = function() {
			if (boolObtained === false) {
				boolObtained = true;
				
				objectSingleton.init();
			}
		};
		
		PreferenceNewtab.dispel = function() {
			if (boolObtained === true) {
				boolObtained = false;
				
				objectSingleton.finalize();
			}
		};
		
		PreferenceNewtab.obtain = function() {
			PreferenceNewtab.init();
			
			return objectSingleton;
		};
		
		this.init = function() {

		};
		
		this.finalize = function() {

		};
		
		this.getStrNewtab = function() {
			return Services.prefs.getCharPref('browser.newtab.url');
		};
		
		this.setStrNewtab = function(strNewtab) {
			Services.prefs.setCharPref('browser.newtab.url', strNewtab);
		};
		
		this.clearStrNewtab = function() {
			Services.prefs.clearUserPref('browser.newtab.url');
		};
		
		return PreferenceNewtab;
	};
}

exports.main = function(optionsHandle) {
	if (optionsHandle.loadReason === 'upgrade') {
		// TEMPORARY RESET
		
		Services.prefs.clearUserPref('extensions.BookRect.Advanced.boolAutostart');
		Services.prefs.clearUserPref('extensions.BookRect.Advanced.boolSearch');
		Services.prefs.clearUserPref('extensions.BookRect.Advanced.boolState');
		Services.prefs.clearUserPref('extensions.BookRect.Advanced.boolSubfolders');
		
		Services.prefs.clearUserPref('extensions.BookRect.Stylesheet.strIndex');
		Services.prefs.clearUserPref('extensions.BookRect.Stylesheet.strCoderectTree');
		
		Services.prefs.clearUserPref('extensions.BookRect.Cache.intBookmarkidentifier');
	}
	
	if (PreferenceNewtab.obtain().getStrNewtab() !== 'chrome://BookRect/content/assets/index.html') {
		if (Services.prefs.prefHasUserValue('extensions.BookRect.Advanced.boolAutostart') === false) {
			Services.prefs.setBoolPref('extensions.BookRect.Advanced.boolAutostart', true);
		}
		
		if (Services.prefs.getBoolPref('extensions.BookRect.Advanced.boolAutostart') === true) {
			PreferenceNewtab.obtain().setStrNewtab('chrome://BookRect/content/assets/index.html');
		}
	}
	
	{
		var panelHandle = require('panel').Panel({
			'width': 640,
			'height': 480,
			'contentURL': 'chrome://bookrect/content/assets/index.html',
			'contentScriptFile': [
				require('self').data.url('jquery.js'),
				require('self').data.url('panel.js')
			]
		});
		
		{
			panelHandle.on('show', function() {
				panelHandle.port.emit('eventShow');
			});
			
			panelHandle.on('hide', function() {
				panelHandle.port.emit('eventHide');
			});
			
			panelHandle.port.on('eventClickLeft', function(strHref) {
				require('tabs').activeTab.url = strHref;
				
				panelHandle.hide();
			});
			
			panelHandle.port.on('eventClickMiddle', function(strHref) {
				require('tabs').open(strHref);
				
				panelHandle.hide();
			});
		}

		var toolbarbuttonHandle = require('toolbarbutton').ToolbarButton({
			'id': 'idBookRect_Toolbarbutton',
			'label': 'BookRect',
			'tooltiptext': 'BookRect',
			'image': 'chrome://BookRect/content/res/drawable/basicFavicon.png',
			'panel': panelHandle
		});

		if (optionsHandle.loadReason === 'install') {
			toolbarbuttonHandle.moveTo({
				'toolbarID': 'nav-bar',
				'forceMove': false
			});
		}
	}
};

exports.onUnload = function(optionsHandle) {
	if (PreferenceNewtab.obtain().getStrNewtab() === 'chrome://BookRect/content/assets/index.html') {
		PreferenceNewtab.obtain().clearStrNewtab();
	}
};