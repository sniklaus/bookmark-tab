'use strict';

var requireBookmarks = require('sdk/places/bookmarks');
var requireChrome = require('chrome');
var requireHeritage = require('sdk/core/heritage');
var requirePagemod = require('sdk/page-mod');
var requirePanel = require('sdk/panel');
var requirePreferences = require('sdk/preferences/service');
var requireSelf = require('sdk/self');
var requireTabs = require('sdk/tabs');
var requireToggle = require('sdk/ui/button/toggle');
var requireXpcom = require('sdk/platform/xpcom');

requireChrome.Cu.import('resource://gre/modules/PlacesUtils.jsm');
requireChrome.Cu.import('resource://gre/modules/Services.jsm');

var Bookmarks = {
	init: function() {
		
	},
	
	dispel: function() {
		
	},
	
	bind: function(bindHandle) {
		bindHandle.port.on('bookmarksNavigate', function(objectArguments) {
			Bookmarks.navigate.call(bindHandle, objectArguments, function(objectArguments) {
				bindHandle.port.emit('bookmarksNavigate', objectArguments);
			});
		});
		
		bindHandle.port.on('bookmarksPeek', function(objectArguments) {
			Bookmarks.peek.call(bindHandle, objectArguments, function(objectArguments) {
				bindHandle.port.emit('bookmarksPeek', objectArguments);
			});
		});
		
		bindHandle.port.on('bookmarksList', function(objectArguments) {
			Bookmarks.list.call(bindHandle, objectArguments, function(objectArguments) {
				bindHandle.port.emit('bookmarksList', objectArguments);
			});
		});
		
		bindHandle.port.on('bookmarksSearch', function(objectArguments) {
			Bookmarks.search.call(bindHandle, objectArguments, function(objectArguments) {
				bindHandle.port.emit('bookmarksSearch', objectArguments);
			});
		});
	},
	
	navigate: function(objectArguments, functionCallback) {
		{
			if (this.hide !== undefined) {
				this.hide();
			}
		}
		
		{
			if (objectArguments.strTab === 'tabCurrent') {
				requireTabs.activeTab.url = objectArguments.strLink;
				
			} else if (objectArguments.strTab === 'tabNew') {
				requireTabs.open(objectArguments.strLink);
				
			}
		}
		
		functionCallback({});
	},
	
	peek: function(objectArguments, functionCallback) {
		var Lookup_resultHandle = [];
		
		var functionLookup = function() {
			{
				for (var intFor1 = 0; intFor1 < objectArguments.intIdent.length; intFor1 += 1) {
					var intIdent = objectArguments.intIdent[intFor1];
					
					{
						if (PlacesUtils.bookmarks.getItemType(intIdent) === PlacesUtils.bookmarks.TYPE_FOLDER) {
							Lookup_resultHandle.push({
								'intIdent': intIdent,
								'strType': 'typeFolder',
								'strImage': 'chrome://bookrect/content/images/folder.png',
								'strTitle': PlacesUtils.bookmarks.getItemTitle(intIdent),
								'strLink': ''
							});
							
						} else if (PlacesUtils.bookmarks.getItemType(intIdent) === PlacesUtils.bookmarks.TYPE_BOOKMARK) {
							Lookup_resultHandle.push({
								'intIdent': intIdent,
								'strType': 'typeBookmark',
								'strImage': 'http://grabicon.com/icon?domain=' + PlacesUtils.bookmarks.getBookmarkURI(intIdent).spec + '&size=16',
								'strTitle': PlacesUtils.bookmarks.getItemTitle(intIdent),
								'strLink': PlacesUtils.bookmarks.getBookmarkURI(intIdent)
							});
							
						} else if (PlacesUtils.bookmarks.getItemType(intIdent) === PlacesUtils.bookmarks.TYPE_SEPARATOR) {
							Lookup_resultHandle.push({
								'intIdent': intIdent,
								'strType': 'typeSeparator',
								'strImage': '',
								'strTitle': '',
								'strLink': ''
							});
							
						}
					}
				}
			}
			
			functionCallback({
				'strCallback': objectArguments.strCallback,
				'resultHandle': Lookup_resultHandle
			});
		};
		
		functionLookup();
	},
	
	list: function(objectArguments, functionCallback) {
		var Lookup_resultHandle = [];
		
		var functionLookup = function() {
			{
				if (objectArguments.intIdent === 0) {
					{
						Lookup_resultHandle.push({
							'intIdent': PlacesUtils.toolbarFolderId,
							'intTimestamp': 0,
							'intParent': 0,
							'strType': 'typeFolder',
							'strImage': 'chrome://bookrect/content/images/folder.png',
							'strTitle': PlacesUtils.bookmarks.getItemTitle(PlacesUtils.toolbarFolderId),
							'strLink': '',
							'strTags': '',
							'intAccesscount': 0
						});
					}
					
					{
						Lookup_resultHandle.push({
							'intIdent': PlacesUtils.bookmarksMenuFolderId,
							'intTimestamp': 0,
							'intParent': 0,
							'strType': 'typeFolder',
							'strImage': 'chrome://bookrect/content/images/folder.png',
							'strTitle': PlacesUtils.bookmarks.getItemTitle(PlacesUtils.bookmarksMenuFolderId),
							'strLink': '',
							'strTags': '',
							'intAccesscount': 0
						});
					}
					
					{
						Lookup_resultHandle.push({
							'intIdent': PlacesUtils.unfiledBookmarksFolderId,
							'intTimestamp': 0,
							'intParent': 0,
							'strType': 'typeFolder',
							'strImage': 'chrome://bookrect/content/images/folder.png',
							'strTitle': PlacesUtils.bookmarks.getItemTitle(PlacesUtils.unfiledBookmarksFolderId),
							'strLink': '',
							'strTags': '',
							'intAccesscount': 0
						});
					}
					
				} else if (objectArguments.intIdent !== 0) {
					{
						var nodeFolder = PlacesUtils.getFolderContents(objectArguments.intIdent);
						
						for (var intFor1 = 0; intFor1 < nodeFolder.root.childCount; intFor1 += 1) {
							var nodeHandle = nodeFolder.root.getChild(intFor1);
							
							{
								if (PlacesUtils.nodeIsFolder(nodeHandle) === true) {
									Lookup_resultHandle.push({
										'intIdent': nodeHandle.itemId,
										'intTimestamp': nodeHandle.lastModified,
										'intParent': objectArguments.intIdent,
										'strType': 'typeFolder',
										'strImage': 'chrome://bookrect/content/images/folder.png',
										'strTitle': nodeHandle.title,
										'strLink': '',
										'strTags': '',
										'intAccesscount': 0
									});
									
								} else if (PlacesUtils.nodeIsBookmark(nodeHandle) === true) {
									Lookup_resultHandle.push({
										'intIdent': nodeHandle.itemId,
										'intTimestamp': nodeHandle.lastModified,
										'intParent': objectArguments.intIdent,
										'strType': 'typeBookmark',
										'strImage': 'http://grabicon.com/icon?domain=' + nodeHandle.uri + '&size=16',
										'strTitle': nodeHandle.title,
										'strLink': nodeHandle.uri,
										'strTags': nodeHandle.tags,
										'intAccesscount': nodeHandle.accessCount
									});
									
								} else if (PlacesUtils.nodeIsSeparator(nodeHandle) === true) {
									Lookup_resultHandle.push({
										'intIdent': nodeHandle.itemId,
										'intTimestamp': nodeHandle.lastModified,
										'intParent': objectArguments.intIdent,
										'strType': 'typeSeparator',
										'strImage': '',
										'strTitle': '',
										'strLink': '',
										'strTags': '',
										'intAccesscount': 0
									});
									
								}
							}
							
							{
								if (PlacesUtils.nodeIsBookmark(nodeHandle) === true) {
									if (nodeHandle.icon.indexOf('moz-anno:favicon:') !== -1) {
										Lookup_resultHandle[Lookup_resultHandle.length - 1].strImage = nodeHandle.icon;
									}
								}
							}
						}
					}
					
				}
			}
			
			functionCallback({
				'strCallback': objectArguments.strCallback,
				'resultHandle': Lookup_resultHandle
			});
		};
		
		functionLookup();
	},
	
	search: function(objectArguments, functionCallback) {
		// https://developer.mozilla.org/en-US/docs/Mozilla/Tech/Places/Retrieving_part_of_the_bookmarks_tree
		// var query1 = historyService.getNewQuery();
		// query1.searchTerms = "firefox";
		
		requireBookmarks.search([{
			'url': objectArguments.strSearch
		}, {
			'tags': objectArguments.strSearch
		}]).on('end', function(resultHandle) {
			
		});
	}
};
Bookmarks.init();

exports.main = function(optionsHandle) {
	{
		if (optionsHandle.loadReason === 'install') {
			requirePreferences.set('browser.newtab.url', 'about:bookrect');
			
		} else if (optionsHandle.loadReason === 'enable') {
			requirePreferences.set('browser.newtab.url', 'about:bookrect');
			
		} else if (optionsHandle.loadReason === 'upgrade') {
			requirePreferences.set('browser.newtab.url', 'about:bookrect');
			
		} else if (optionsHandle.loadReason === 'downgrade') {
			requirePreferences.set('browser.newtab.url', 'about:bookrect');
			
		}
	}
	
	{
		if (requirePreferences.get('browser.newtab.url') === 'about:bookrect') {
			requirePreferences.set('extensions.BookRect.Advanced.boolAutostart', true);
			
		} else if (requirePreferences.get('browser.newtab.url') !== 'about:bookrect') {
			requirePreferences.set('extensions.BookRect.Advanced.boolAutostart', false);
			
		}
	}
	
	{
		requireXpcom.Factory({
			'contract': '@mozilla.org/network/protocol/about;1?what=bookrect',
			'Component': requireHeritage.Class({
				'extends': requireXpcom.Unknown,
				'interfaces': [ 'nsIAboutModule' ],
				'newChannel': function(uriHandle) {
					var channelHandle = Services.io.newChannel('chrome://bookrect/content/index.html', null, null);
					
					{
						channelHandle.originalURI = uriHandle;
					}
					
					return channelHandle;
				},
				'getURIFlags': function(uriHandle) {
					return requireChrome.Ci.nsIAboutModule.ALLOW_SCRIPT;
				}
			})
		});
	}
	
	{
		requirePagemod.PageMod({
			'include': [ 'about:bookrect', 'chrome://bookrect/content/index.html' ],
			'contentScriptFile': [ requireSelf.data.url('./index.js') ],
		    'onAttach': function(workerHandle) {
				{
					Bookmarks.bind(workerHandle);
				}
		    }
		});
	}
	
	{	
		var toolbarbuttonHandle = requireToggle.ToggleButton({
			'id': 'idToolbarbutton',
			'label': 'BookRect',
			'icon': 'chrome://bookrect/content/images/icon.png'
		});
		
		{
			toolbarbuttonHandle.on('click', function(stateHandle) {
				if (stateHandle.checked === true) {
					toolbarpanelHandle.show({
						'position': toolbarbuttonHandle
					});
				}
			});
			
			toolbarbuttonHandle.on('click', function(stateHandle) {
				if (stateHandle.checked === false) {
					toolbarpanelHandle.hide();
				}
			});
		}
		
		var toolbarpanelHandle = requirePanel.Panel({
			'width': 640,
			'height': 480,
			'contentURL': 'chrome://bookrect/content/index.html',
			'contentScriptFile': [ requireSelf.data.url('./index.js') ]
		});
		
		{
			toolbarpanelHandle.on('show', function() {
				toolbarbuttonHandle.state('window', {
					'checked': true
				});
			});
			
			toolbarpanelHandle.on('hide', function() {
				toolbarbuttonHandle.state('window', {
					'checked': false
				});
			});
		}
		
		{
			Bookmarks.bind(toolbarpanelHandle);
		}
	}
};

exports.onUnload = function(optionsHandle) {
	{
		if (requirePreferences.get('browser.newtab.url') === 'about:bookrect') {
			requirePreferences.reset('browser.newtab.url');
		}
	}
};