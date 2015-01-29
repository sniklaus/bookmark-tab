'use strict'

Components.utils.import('resource://gre/modules/PlacesUtils.jsm');

var Bookmarks = {
	init: function() {
		
	},
	
	dispel: function() {
		
	},
	
	updateFancytree: function(boolRoot, intFolder) {
		var objectFolder = [];
		
		{
			var objectBookmarks = Bookmarks.updateFolder(boolRoot, intFolder);
			
			for (var intFor1 = 0; intFor1 < objectBookmarks.length; intFor1 += 1) {
				var objectBookmark = objectBookmarks[intFor1];
				
				{
					if (objectBookmark.strType === 'typeFolder') {
						objectFolder.push({
							'key': String(objectBookmark.intIdent),
							'title': objectBookmark.strTitle,
							'icon': 'chrome://BookRect/content/images/treeFolder.png',
							'folder': true,
							'lazy': true
						});
						
					} else if (objectBookmark.strType === 'typeBookmark') {
						objectFolder.push({
							'key': String(objectBookmark.intIdent),
							'title': objectBookmark.strTitle,
							'title': '<a href="' + objectBookmark.strLink + '">' + objectBookmark.strTitle + '</a>',
							'icon': objectBookmark.strIcon,
							'folder': false,
							'lazy': false
						});
						
					}
				}
			}
		}
		
		return objectFolder;
	},
	
	updateFolder: function(boolRoot, intFolder) {
		var objectFolder = [];
		
		{
			if (boolRoot === true) {
				if (intFolder === PlacesUtils.toolbarFolderId) {
					if (PreferenceSource.getBoolToolbarSubfolder() === true) {
						objectFolder.push({
							'intIdent': intFolder,
							'intTimestamp': 0,
							'intParent': 0,
							'strType': 'typeFolder',
							'strTitle': '@string/Toolbar',
							'strLink': '',
							'strIcon': '',
							'strTags': '',
							'intAccesscount': 0
						});
						
					} else if (PreferenceSource.getBoolToolbarSubfolder() === false) {
						objectFolder.push.apply(objectFolder, Bookmarks.updateFolder(false, intFolder));
						
					}
					
				} else if (intFolder === PlacesUtils.bookmarksMenuFolderId) {
					if (PreferenceSource.getBoolMenuSubfolder() === true) {
						objectFolder.push({
							'intIdent': intFolder,
							'intTimestamp': 0,
							'intParent': 0,
							'strType': 'typeFolder',
							'strTitle': '@string/Menu',
							'strLink': '',
							'strIcon': '',
							'strTags': '',
							'intAccesscount': 0
						});
						
					} else if (PreferenceSource.getBoolMenuSubfolder() === false) {
						objectFolder.push.apply(objectFolder, Bookmarks.updateFolder(false, intFolder));
						
					}
					
				} else if (intFolder === PlacesUtils.unfiledBookmarksFolderId) {
					if (PreferenceSource.getBoolUnfiledSubfolder() === true) {
						objectFolder.push({
							'intIdent': intFolder,
							'intTimestamp': 0,
							'intParent': 0,
							'strType': 'typeFolder',
							'strTitle': '@string/Unfiled',
							'strLink': '',
							'strIcon': '',
							'strTags': '',
							'intAccesscount': 0
						});
						
					} else if (PreferenceSource.getBoolUnfiledSubfolder() === false) {
						objectFolder.push.apply(objectFolder, Bookmarks.updateFolder(false, intFolder));
						
					}
					
				}
				
			}
		}
		
		{
			if (boolRoot === false) {
				var nodeFolder = PlacesUtils.getFolderContents(intFolder);
				
				for (var intFor1 = 0; intFor1 < nodeFolder.root.childCount; intFor1 += 1) {
					var nodeHandle = nodeFolder.root.getChild(intFor1);
					
					{
						var strType = '';
						var strTitle = '';
						var strLink = '';
						var strIcon = '';
						var strTags = '';
						var intAccesscount = 0;
						
						if (PlacesUtils.nodeIsFolder(nodeHandle) === true) {
							strType = 'typeFolder';
							strTitle = nodeHandle.title;
							strLink = '';
							strIcon = '';
							strTags = '';
							intAccesscount = 0;
							
						} else if (PlacesUtils.nodeIsBookmark(nodeHandle) === true) {
							strType = 'typeBookmark';
							strTitle = nodeHandle.title;
							strLink = nodeHandle.uri;
							strIcon = nodeHandle.icon;
							strTags = nodeHandle.tags;
							intAccesscount = nodeHandle.accessCount;
							
							if (strIcon.indexOf('moz-anno:favicon:') === -1) {
								strIcon = 'http://g.etfv.co/' + strLink;
							}
							
						} else if (PlacesUtils.nodeIsSeparator(nodeHandle) === true) {
							strType = 'typeSeparator';
							strTitle = '';
							strLink = '';
							strIcon = '';
							strTags = '';
							intAccesscount = 0;
							
						}
						
						objectFolder.push({
							'intIdent': nodeHandle.itemId,
							'intTimestamp': nodeHandle.lastModified,
							'intParent': intFolder,
							'strType': strType,
							'strTitle': strTitle,
							'strLink': strLink,
							'strIcon': strIcon,
							'strTags': strTags,
							'intAccesscount': intAccesscount
						});
					}
				}
			}
		}
		
		return objectFolder;
	},
	
	updateSearch: function(intFolder, strSearch) {
		
	}
};
Bookmarks.init();