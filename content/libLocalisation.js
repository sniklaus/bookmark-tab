'use strict';

// TODO: redo

var LocalisationIndex = new function LocalisationIndex() {
	var boolObtained = false;
	
	var objectSingleton = this;
	
	LocalisationIndex.init = function() {
		if (boolObtained === false) {
			boolObtained = true;
			
			objectSingleton.init();
		}
	};
	
	LocalisationIndex.dispel = function() {
		if (boolObtained === true) {
			boolObtained = false;
			
			objectSingleton.finalize();
		}
	};
	
	LocalisationIndex.obtain = function() {
		LocalisationIndex.init();
		
		return objectSingleton;
	};
	
	this.stringserviceHandle = null;
	
	this.bundleHandle = null;
	
	this.init = function() {
		{
			this.stringserviceHandle = Components.classes['@mozilla.org/intl/stringbundle;1'].getService(Components.interfaces.nsIStringBundleService);
		}
		
		{
			this.bundleHandle = this.stringserviceHandle.createBundle('chrome://BookRect/locale/index.properties');
		}
	};
	
	this.finalize = function() {
		{
			this.stringserviceHandle = null;
		}
		
		{
			this.bundleHandle = null;
		}
	};
	
	this.getStrLocalized = function(strLocalize) {
		return this.bundleHandle.GetStringFromName(strLocalize);
	};
	
	return LocalisationIndex;
};

var LocalisationOptions = new function LocalisationOptions() {
	var boolObtained = false;
	
	var objectSingleton = this;
	
	LocalisationOptions.init = function() {
		if (boolObtained === false) {
			boolObtained = true;
			
			objectSingleton.init();
		}
	};
	
	LocalisationOptions.dispel = function() {
		if (boolObtained === true) {
			boolObtained = false;
			
			objectSingleton.finalize();
		}
	};
	
	LocalisationOptions.obtain = function() {
		LocalisationOptions.init();
		
		return objectSingleton;
	};
	
	this.stringserviceHandle = null;
	
	this.bundleHandle = null;
	
	this.init = function() {
		{
			this.stringserviceHandle = Components.classes['@mozilla.org/intl/stringbundle;1'].getService(Components.interfaces.nsIStringBundleService);
		}
		
		{
			this.bundleHandle = this.stringserviceHandle.createBundle('chrome://BookRect/locale/options.properties');
		}
	};
	
	this.finalize = function() {
		{
			this.stringserviceHandle = null;
		}
		
		{
			this.bundleHandle = null;
		}
	};
	
	this.getStrLocalized = function(strLocalize) {
		return this.bundleHandle.GetStringFromName(strLocalize);
	};
	
	return LocalisationOptions;
};