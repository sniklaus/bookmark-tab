'use strict';

Components.utils.import('resource://gre/modules/FileUtils.jsm');
Components.utils.import('resource://gre/modules/Services.jsm');

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

var PreferenceSource = new function PreferenceSource() {
	var boolObtained = false;
	
	var objectSingleton = this;
	
	PreferenceSource.init = function() {
		if (boolObtained === false) {
			boolObtained = true;
			
			objectSingleton.init();
		}
	};
	
	PreferenceSource.dispel = function() {
		if (boolObtained === true) {
			boolObtained = false;
			
			objectSingleton.finalize();
		}
	};
	
	PreferenceSource.obtain = function() {
		PreferenceSource.init();
		
		return objectSingleton;
	};
	
	this.init = function() {

	};
	
	this.finalize = function() {

	};
	
	this.getBoolToolbar = function() {
		if (Services.prefs.prefHasUserValue('extensions.BookRect.Source.boolToolbar') === false) {
			this.setBoolToolbar(true);
		}
	
		return Services.prefs.getBoolPref('extensions.BookRect.Source.boolToolbar');
	};
	
	this.setBoolToolbar = function(boolToolbar) {
		Services.prefs.setBoolPref('extensions.BookRect.Source.boolToolbar', boolToolbar);
		
		{
			PreferenceCache.obtain().setIntBookmarkidentifier(0);
		}
	};
	
	this.clearBoolToolbar = function() {
		Services.prefs.clearUserPref('extensions.BookRect.Source.boolToolbar');
	};
	
	this.getBoolMenu = function() {
		if (Services.prefs.prefHasUserValue('extensions.BookRect.Source.boolMenu') === false) {
			this.setBoolMenu(true);
		}
	
		return Services.prefs.getBoolPref('extensions.BookRect.Source.boolMenu');
	};
	
	this.setBoolMenu = function(boolMenu) {
		Services.prefs.setBoolPref('extensions.BookRect.Source.boolMenu', boolMenu);
		
		{
			PreferenceCache.obtain().setIntBookmarkidentifier(0);
		}
	};
	
	this.clearBoolMenu = function() {
		Services.prefs.clearUserPref('extensions.BookRect.Source.boolMenu');
	};
	
	this.getBoolUnfiled = function() {
		if (Services.prefs.prefHasUserValue('extensions.BookRect.Source.boolUnfiled') === false) {
			this.setBoolUnfiled(true);
		}
	
		return Services.prefs.getBoolPref('extensions.BookRect.Source.boolUnfiled');
	};
	
	this.setBoolUnfiled = function(boolUnfiled) {
		Services.prefs.setBoolPref('extensions.BookRect.Source.boolUnfiled', boolUnfiled);
		
		{
			PreferenceCache.obtain().setIntBookmarkidentifier(0);
		}
	};
	
	this.clearBoolUnfiled = function() {
		Services.prefs.clearUserPref('extensions.BookRect.Source.boolUnfiled');
	};
	
	return PreferenceSource;
};

var PreferenceAdvanced = new function PreferenceAdvanced() {
	var boolObtained = false;
	
	var objectSingleton = this;
	
	PreferenceAdvanced.init = function() {
		if (boolObtained === false) {
			boolObtained = true;
			
			objectSingleton.init();
		}
	};
	
	PreferenceAdvanced.dispel = function() {
		if (boolObtained === true) {
			boolObtained = false;
			
			objectSingleton.finalize();
		}
	};
	
	PreferenceAdvanced.obtain = function() {
		PreferenceAdvanced.init();
		
		return objectSingleton;
	};
	
	this.init = function() {

	};
	
	this.finalize = function() {

	};
	
	this.getBoolAutostart = function() {
		if (Services.prefs.prefHasUserValue('extensions.BookRect.Advanced.boolAutostart') === false) {
			this.setBoolAutostart(true);
		}
		
		if (PreferenceNewtab.obtain().getStrNewtab() === 'chrome://BookRect/content/assets/index.html') {
			this.setBoolAutostart(true);
			
		} else if (PreferenceNewtab.obtain().getStrNewtab() !== 'chrome://BookRect/content/assets/index.html') {
			this.setBoolAutostart(false);
			
		}
		
		return Services.prefs.getBoolPref('extensions.BookRect.Advanced.boolAutostart');
	};
	
	this.setBoolAutostart = function(boolAutostart) {
		Services.prefs.setBoolPref('extensions.BookRect.Advanced.boolAutostart', boolAutostart);
		
		if (boolAutostart === true) {
			PreferenceNewtab.obtain().setStrNewtab('chrome://BookRect/content/assets/index.html');
			
		} else if (boolAutostart === false) {
			PreferenceNewtab.obtain().clearStrNewtab();
			
		}
	};
	
	this.clearBoolAutostart = function() {
		Services.prefs.clearUserPref('extensions.BookRect.Advanced.boolAutostart');
		
		if (this.getBoolAutostart() === true) {
			PreferenceNewtab.obtain().setStrNewtab('chrome://BookRect/content/assets/index.html');
			
		} else if (this.getBoolAutostart() === false) {
			PreferenceNewtab.obtain().clearStrNewtab();
			
		}
	};
	
	this.getBoolSearch = function() {
		if (Services.prefs.prefHasUserValue('extensions.BookRect.Advanced.boolSearch') === false) {
			this.setBoolSearch(true);
		}
	
		return Services.prefs.getBoolPref('extensions.BookRect.Advanced.boolSearch');
	};
	
	this.setBoolSearch = function(boolSearch) {
		Services.prefs.setBoolPref('extensions.BookRect.Advanced.boolSearch', boolSearch);
	};
	
	this.clearBoolSearch = function() {
		Services.prefs.clearUserPref('extensions.BookRect.Advanced.boolSearch');
	};
	
	this.getBoolState = function() {
		if (Services.prefs.prefHasUserValue('extensions.BookRect.Advanced.boolState') === false) {
			this.setBoolState(false);
		}
	
		return Services.prefs.getBoolPref('extensions.BookRect.Advanced.boolState');
	};
	
	this.setBoolState = function(boolState) {
		Services.prefs.setBoolPref('extensions.BookRect.Advanced.boolState', boolState);
	};
	
	this.clearBoolState = function() {
		Services.prefs.clearUserPref('extensions.BookRect.Advanced.boolState');
	};
	
	this.getBoolSubfolders = function() {
		if (Services.prefs.prefHasUserValue('extensions.BookRect.Advanced.boolSubfolders') === false) {
			this.setBoolSubfolders(true);
		}
	
		return Services.prefs.getBoolPref('extensions.BookRect.Advanced.boolSubfolders');
	};
	
	this.setBoolSubfolders = function(boolSubfolders) {
		Services.prefs.setBoolPref('extensions.BookRect.Advanced.boolSubfolders', boolSubfolders);
		
		{
			PreferenceCache.obtain().setIntBookmarkidentifier(0);
		}
	};
	
	this.clearBoolSubfolders = function() {
		Services.prefs.clearUserPref('extensions.BookRect.Advanced.boolSubfolders');
		
		{
			PreferenceCache.obtain().setIntBookmarkidentifier(0);
		}
	};
	
	return PreferenceAdvanced;
};

var PreferenceStylesheet = new function PreferenceStylesheet() {
	var boolObtained = false;
	
	var objectSingleton = this;
	
	PreferenceStylesheet.init = function() {
		if (boolObtained === false) {
			boolObtained = true;
			
			objectSingleton.init();
		}
	};
	
	PreferenceStylesheet.dispel = function() {
		if (boolObtained === true) {
			boolObtained = false;
			
			objectSingleton.finalize();
		}
	};
	
	PreferenceStylesheet.obtain = function() {
		PreferenceStylesheet.init();
		
		return objectSingleton;
	};
	
	this.init = function() {

	};
	
	this.finalize = function() {

	};
	
	this.initStrIndex = function(functionCallback) {
		if (Services.prefs.prefHasUserValue('extensions.BookRect.Stylesheet.strIndex') === true) {
			functionCallback();
			
		} else if (Services.prefs.prefHasUserValue('extensions.BookRect.Stylesheet.strIndex') === false) {
			var xmlhttprequestHandle = new XMLHttpRequest();
			
			xmlhttprequestHandle.open('GET', 'chrome://bookrect/content/assets/index.css', true);
			xmlhttprequestHandle.overrideMimeType('text/css');
			xmlhttprequestHandle.onreadystatechange = function() {
				if (xmlhttprequestHandle.readyState === 4) {
					PreferenceStylesheet.obtain().setStrIndex(xmlhttprequestHandle.responseText);
					
					functionCallback();
				}
			};
			xmlhttprequestHandle.send();
			
		}
	};
	
	this.getStrIndex = function() {
		return Services.prefs.getCharPref('extensions.BookRect.Stylesheet.strIndex');
	};
	
	this.setStrIndex = function(strIndex) {
		Services.prefs.setCharPref('extensions.BookRect.Stylesheet.strIndex', strIndex);
	};
	
	this.clearStrIndex = function() {
		Services.prefs.clearUserPref('extensions.BookRect.Stylesheet.strIndex');
	};
	
	this.initStrCoderectTree = function(functionCallback) {
		if (Services.prefs.prefHasUserValue('extensions.BookRect.Stylesheet.strCoderectTree') === true) {
			functionCallback();
			
		} else if (Services.prefs.prefHasUserValue('extensions.BookRect.Stylesheet.strCoderectTree') === false) {
			var xmlhttprequestHandle = new XMLHttpRequest();
			
			xmlhttprequestHandle.open('GET', 'chrome://bookrect/content/assets/coderectTree.css', true);
			xmlhttprequestHandle.overrideMimeType('text/css');
			xmlhttprequestHandle.onreadystatechange = function() {
				if (xmlhttprequestHandle.readyState === 4) {
					PreferenceStylesheet.obtain().setStrCoderectTree(xmlhttprequestHandle.responseText);
					
					functionCallback();
				}
			};
			xmlhttprequestHandle.send();
			
		}
	};
	
	this.getStrCoderectTree = function() {
		return Services.prefs.getCharPref('extensions.BookRect.Stylesheet.strCoderectTree');
	};
	
	this.setStrCoderectTree = function(strCoderectTree) {
		Services.prefs.setCharPref('extensions.BookRect.Stylesheet.strCoderectTree', strCoderectTree);
	};
	
	this.clearStrCoderectTree = function() {
		Services.prefs.clearUserPref('extensions.BookRect.Stylesheet.strCoderectTree');
	};
	
	return PreferenceStylesheet;
};

var PreferenceCache = new function PreferenceCache() {
	var boolObtained = false;
	
	var objectSingleton = this;
	
	PreferenceCache.init = function() {
		if (boolObtained === false) {
			boolObtained = true;
			
			objectSingleton.init();
		}
	};
	
	PreferenceCache.dispel = function() {
		if (boolObtained === true) {
			boolObtained = false;
			
			objectSingleton.finalize();
		}
	};
	
	PreferenceCache.obtain = function() {
		PreferenceCache.init();
		
		return objectSingleton;
	};
	
	this.init = function() {

	};
	
	this.finalize = function() {

	};
	
	this.getIntBookmarkidentifier = function() {
		if (Services.prefs.prefHasUserValue('extensions.BookRect.Cache.intBookmarkidentifier') === false) {
			this.setIntBookmarkidentifier(0);
		}
	
		return Services.prefs.getIntPref('extensions.BookRect.Cache.intBookmarkidentifier');
	};
	
	this.setIntBookmarkidentifier = function(intBookmarkidentifier) {
		Services.prefs.setIntPref('extensions.BookRect.Cache.intBookmarkidentifier', intBookmarkidentifier);
	};
	
	this.clearIntBookmarkidentifier = function() {
		Services.prefs.clearUserPref('extensions.BookRect.Cache.intBookmarkidentifier');
	};
	
	return PreferenceCache;
};

var PreferenceBookmark = new function PreferenceBookmark() {
	var boolObtained = false;
	
	var objectSingleton = this;
	
	PreferenceBookmark.init = function() {
		if (boolObtained === false) {
			boolObtained = true;
			
			objectSingleton.init();
		}
	};
	
	PreferenceBookmark.dispel = function() {
		if (boolObtained === true) {
			boolObtained = false;
			
			objectSingleton.finalize();
		}
	};
	
	PreferenceBookmark.obtain = function() {
		PreferenceBookmark.init();
		
		return objectSingleton;
	};
	
	this.sqlserviceHandle = null;
	
	this.statementCreate = null;
	this.statementSave = null;
	this.statementRemove = null;
	this.statementClear = null;
	
	this.cursorSelect = null;
	
	this.intIdent = 0;
	this.strStatus = '';
	this.intFolder = 0;
	this.intFolderParent = 0;
	this.strFavicon = '';
	this.strTitle = '';
	this.strLink = '';
	
	this.init = function() {
		{
			var fileHandle = FileUtils.getFile('ProfD', ['BookRect.sqlite']);  
			
			this.sqlserviceHandle = Services.storage.openDatabase(fileHandle);
		}
		
		{
			this.sqlserviceHandle.executeSimpleSQL(
				'CREATE TABLE IF NOT EXISTS PreferenceBookmark ' +
				'  ( ' +
				'     intIdent        INTEGER PRIMARY KEY AUTOINCREMENT, ' +
				'     strStatus       TEXT, ' +
				'     intFolder       INTEGER, ' +
				'     intFolderParent INTEGER, ' +
				'     strFavicon      CLOB, ' +
				'     strTitle        TEXT, ' +
				'     strLink         TEXT ' +
				'  ) '
			);
		}
		
		{
			this.statementCreate = this.sqlserviceHandle.createStatement(
				'INSERT INTO PreferenceBookmark ' +
				'            (strStatus, ' +
				'             intFolder, ' +
				'             intFolderParent, ' +
				'             strFavicon, ' +
				'             strTitle, ' +
				'             strLink) ' +
				'VALUES      (:PARAMETER1, ' +
				'             :PARAMETER2, ' +
				'             :PARAMETER3, ' +
				'             :PARAMETER4, ' +
				'             :PARAMETER5, ' +
				'             :PARAMETER6) '
			);
			
			this.statementSave = this.sqlserviceHandle.createStatement(
				'UPDATE PreferenceBookmark ' +
				'SET    strStatus = :PARAMETER1, ' +
				'       intFolder = :PARAMETER2, ' +
				'       intFolderParent = :PARAMETER3, ' +
				'       strFavicon = :PARAMETER4, ' +
				'       strTitle = :PARAMETER5, ' +
				'       strLink = :PARAMETER6 ' +
				'WHERE  intIdent = :PARAMETER7 '
			);
			
			this.statementRemove = this.sqlserviceHandle.createStatement(
				'DELETE FROM PreferenceBookmark ' +
				'WHERE  intIdent = :PARAMETER1 '
			);
			
			this.statementClear = this.sqlserviceHandle.createStatement(
				'DELETE FROM PreferenceBookmark '
			);
		}
		
		{
			this.cursorSelect = null;
		}
		
		{
			this.intIdent = 0;
			
			this.strStatus = '';
			
			this.intFolder = 0;
			
			this.intFolderParent = 0;
			
			this.strFavicon = '';
			
			this.strTitle = '';
			
			this.strLink = '';
		}
	};
	
	this.finalize = function() {
		{
			this.sqlserviceHandle.close();
			
			this.sqlserviceHandle = null;
		}
		
		{
			this.statementCreate.finalize();
			
			this.statementSave.finalize();
			
			this.statementRemove.finalize();
			
			this.statementClear.finalize();
		}
		
		{
			this.cursorSelect = null;
		}
		
		{
			this.intIdent = 0;
			
			this.strStatus = '';
			
			this.intFolder = 0;
			
			this.intFolderParent = 0;
			
			this.strFavicon = '';
			
			this.strTitle = '';
			
			this.strLink = '';
		}
	};
	
	this.acquire = function() {
		
	};
	
	this.release = function() {
		
	};
	
	this.transactionOpen = function() {
		this.sqlserviceHandle.beginTransaction();
	};
	
	this.transactionClose = function() {
		this.sqlserviceHandle.commitTransaction();
	};
	
	this.selectOpen = function(strSql, strParameters) {
		this.statementSelect = this.sqlserviceHandle.createStatement(strSql);
		
		for (var intFor1 = 0; intFor1 < strParameters.length; intFor1 += 1) {
			this.statementSelect.params['PARAMETER' + (intFor1 + 1)] = strParameters[intFor1];
		}
	};
	
	this.selectNext = function() {
		var boolStep = this.statementSelect.step();
		
		if (boolStep === true) {
			this.intIdent = this.statementSelect.row.intIdent;
			this.strStatus = this.statementSelect.row.strStatus;
			this.intFolder = this.statementSelect.row.intFolder;
			this.intFolderParent = this.statementSelect.row.intFolderParent;
			this.strFavicon = this.statementSelect.row.strFavicon;
			this.strTitle = this.statementSelect.row.strTitle;
			this.strLink = this.statementSelect.row.strLink;
			
		} else if (boolStep === false) {
			this.intIdent = 0;
			this.strStatus = '';
			this.intFolder = 0;
			this.intFolderParent = 0;
			this.strFavicon = '';
			this.strTitle = '';
			this.strLink = '';
			
		}
	};
	
	this.selectClose = function() {
		this.statementSelect.finalize();
	};
	
	this.create = function() {
		this.statementCreate.params['PARAMETER1'] = this.strStatus;
		this.statementCreate.params['PARAMETER2'] = this.intFolder;
		this.statementCreate.params['PARAMETER3'] = this.intFolderParent;
		this.statementCreate.params['PARAMETER4'] = this.strFavicon;
		this.statementCreate.params['PARAMETER5'] = this.strTitle;
		this.statementCreate.params['PARAMETER6'] = this.strLink;
		
		this.statementCreate.execute();
		
		this.statementCreate.reset();
	};
	
	this.save = function() {
		this.statementSave.params['PARAMETER1'] = this.strStatus;
		this.statementSave.params['PARAMETER2'] = this.intFolder;
		this.statementSave.params['PARAMETER3'] = this.intFolderParent;
		this.statementSave.params['PARAMETER4'] = this.strFavicon;
		this.statementSave.params['PARAMETER5'] = this.strTitle;
		this.statementSave.params['PARAMETER6'] = this.strLink;
		this.statementSave.params['PARAMETER7'] = this.intIdent;
		
		this.statementSave.execute();
		
		this.statementSave.reset();
	};
	
	this.remove = function() {
		this.statementRemove.params['PARAMETER1'] = this.intIdent;
		
		this.statementRemove.execute();
		
		this.statementRemove.reset();
	};
	
	this.clear = function() {
		this.statementClear.execute();
		
		this.statementClear.reset();
	};
	
	return PreferenceBookmark;
};