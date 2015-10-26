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

requireChrome.Cu.import("resource:///modules/NewTabURL.jsm");
requireChrome.Cu.import('resource://gre/modules/NetUtil.jsm');
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
		
		bindHandle.port.on('bookmarksFavicon', function(objectArguments) {
			Bookmarks.favicon.call(bindHandle, objectArguments, function(objectArguments) {
				bindHandle.port.emit('bookmarksFavicon', objectArguments);
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
								'strImage': 'chrome://bookrect/content/images/bookmark.png',
								'strTitle': PlacesUtils.bookmarks.getItemTitle(intIdent),
								'strLink': PlacesUtils.bookmarks.getBookmarkURI(intIdent).spec
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
						var objectFolder = PlacesUtils.getFolderContents(objectArguments.intIdent);
						
						for (var intFor1 = 0; intFor1 < objectFolder.root.childCount; intFor1 += 1) {
							var objectNode = objectFolder.root.getChild(intFor1);
							
							{
								if (PlacesUtils.nodeIsFolder(objectNode) === true) {
									Lookup_resultHandle.push({
										'intIdent': objectNode.itemId,
										'intTimestamp': objectNode.lastModified,
										'intParent': objectArguments.intIdent,
										'strType': 'typeFolder',
										'strImage': 'chrome://bookrect/content/images/folder.png',
										'strTitle': objectNode.title,
										'strLink': '',
										'strTags': '',
										'intAccesscount': 0
									});
									
								} else if (PlacesUtils.nodeIsBookmark(objectNode) === true) {
									Lookup_resultHandle.push({
										'intIdent': objectNode.itemId,
										'intTimestamp': objectNode.lastModified,
										'intParent': objectArguments.intIdent,
										'strType': 'typeBookmark',
										'strImage': 'chrome://bookrect/content/images/bookmark.png',
										'strTitle': objectNode.title,
										'strLink': objectNode.uri,
										'strTags': objectNode.tags,
										'intAccesscount': objectNode.accessCount
									});
									
								} else if (PlacesUtils.nodeIsSeparator(objectNode) === true) {
									Lookup_resultHandle.push({
										'intIdent': objectNode.itemId,
										'intTimestamp': objectNode.lastModified,
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
								if (PlacesUtils.nodeIsBookmark(objectNode) === true) {
									if (objectNode.icon !== null) {
										if (objectNode.icon.indexOf('moz-anno:favicon:') !== -1) {
											Lookup_resultHandle[Lookup_resultHandle.length - 1].strImage = objectNode.icon;
										}
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
	
	favicon: function(objectArguments, functionCallback) {
		var Lookup_resultHandle = [];
		
		var functionLookup = function() {
			PlacesUtils.favicons.getFaviconDataForPage(NetUtil.newURI(objectArguments.strLink), function(objectLink) {
				if (objectLink !== null) {
					functionCallback({
						'strCallback': objectArguments.strCallback,
						'strFavicon': 'moz-anno:favicon:' + objectLink.spec
					});
				}
			});
		};
		
		functionLookup();
	},
	
	search: function(objectArguments, functionCallback) {
		var Lookup_resultHandle = [];
		
		var functionLookup = function() {
			requireBookmarks.search({
				'query': objectArguments.strSearch
			}, {
				'count': 32,
				'sort': 'title',
				'descending': false
			}).on('end', function(resultHandle) {
				{
					for (var intFor1 = 0; intFor1 < resultHandle.length; intFor1 += 1) {
						Lookup_resultHandle.push({
							'intIdent': resultHandle[intFor1].id,
							'strType': 'typeBookmark',
							'strImage': 'chrome://bookrect/content/images/bookmark.png',
							'strTitle': resultHandle[intFor1].title,
							'strLink': resultHandle[intFor1].url
						});
					}
				}
				
				functionCallback({
					'strCallback': objectArguments.strCallback,
					'resultHandle': Lookup_resultHandle
				});
			});
		};
		
		functionLookup();
	}
};
Bookmarks.init();

exports.main = function(optionsHandle) {
	{
		if (optionsHandle.loadReason === 'install') {
			NewTabURL.override('about:bookrect');
			
		} else if (optionsHandle.loadReason === 'enable') {
			NewTabURL.override('about:bookrect');
			
		} else if (optionsHandle.loadReason === 'upgrade') {
			NewTabURL.override('about:bookrect');
			
		} else if (optionsHandle.loadReason === 'downgrade') {
			NewTabURL.override('about:bookrect');
			
		} else if (requirePreferences.get('extensions.BookRect.Advanced.boolAutostart') === true) {
			NewTabURL.override('about:bookrect');
			
		}
		
		if (NewTabURL.get() === 'about:bookrect') {
			requirePreferences.set('extensions.BookRect.Advanced.boolAutostart', true);
			
		} else if (NewTabURL.get() !== 'about:bookrect') {
			requirePreferences.set('extensions.BookRect.Advanced.boolAutostart', false);
			
		}
	}
	
	{
		if (optionsHandle.loadReason === 'install') {
			var intFirst = JSON.parse(requirePreferences.get('extensions.BookRect.Layout.strFirst'));
			var intSecond = JSON.parse(requirePreferences.get('extensions.BookRect.Layout.strSecond'));
			var intThird = JSON.parse(requirePreferences.get('extensions.BookRect.Layout.strThird'));
			
			if (intFirst.length === 0) {
				if (intSecond.length === 0) {
					if (intThird.length === 0) {
						intFirst.push(PlacesUtils.toolbarFolderId);
						intFirst.push(PlacesUtils.bookmarksMenuFolderId);
						intFirst.push(PlacesUtils.unfiledBookmarksFolderId);
					}
				}
			}
			
			requirePreferences.set('extensions.BookRect.Layout.strFirst', JSON.stringify(intFirst));
			requirePreferences.set('extensions.BookRect.Layout.strSecond', JSON.stringify(intSecond));
			requirePreferences.set('extensions.BookRect.Layout.strThird', JSON.stringify(intThird));
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
			'contentScriptFile': [ requireSelf.data.url('./index.js') ],
			'contentScriptOptions': {}
		});
		
		{
			toolbarpanelHandle.on('show', function() {
				toolbarbuttonHandle.state('window', {
					'checked': true
				});
				
				toolbarpanelHandle.port.emit('panelShow', {});
			});
			
			toolbarpanelHandle.on('hide', function() {
				toolbarbuttonHandle.state('window', {
					'checked': false
				});
				
				toolbarpanelHandle.port.emit('panelHide', {});
			});
		}
		
		{
			Bookmarks.bind(toolbarpanelHandle);
		}
	}
};

exports.onUnload = function(optionsHandle) {
	{
		if (NewTabURL.get() === 'about:bookrect') {
			NewTabURL.reset();
		}
	}
};