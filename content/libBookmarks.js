'use strict'

Components.utils.import('resource://gre/modules/PlacesUtils.jsm');

var Bookmarks = {
	init: function() {
		
	},
	
	dispel: function() {
		
	},
	
	updateEnumerate: function(intFolder) {
		var objectFolder = [];
		
		{
			if (intFolder === 0) {
				if (PlacesUtils.toolbarFolderId !== undefined) {
					if (PreferenceAdvanced.getBoolSubfolders() === true) {
						objectFolder.push({
							'intIdent': PlacesUtils.toolbarFolderId,
							'intTimestamp': 0,
							'intParent': 0,
							'strType': 'typeFolder',
							'strTitle': '@string/Toolbar',
							'strLink': '',
							'strIcon': '',
							'strTags': '',
							'intAccesscount': 0
						});
						
					} else if (PreferenceAdvanced.getBoolSubfolders() === false) {
						objectFolder.push.apply(objectFolder, Bookmarks.updateEnumerate(PlacesUtils.toolbarFolderId));
						
					}
				}

				if (PlacesUtils.bookmarksMenuFolderId !== undefined) {
					if (PreferenceAdvanced.getBoolSubfolders() === true) {
						objectFolder.push({
							'intIdent': PlacesUtils.bookmarksMenuFolderId,
							'intTimestamp': 0,
							'intParent': 0,
							'strType': 'typeFolder',
							'strTitle': '@string/Menu',
							'strLink': '',
							'strIcon': '',
							'strTags': '',
							'intAccesscount': 0
						});
						
					} else if (PreferenceAdvanced.getBoolSubfolders() === false) {
						objectFolder.push.apply(objectFolder, Bookmarks.updateEnumerate(PlacesUtils.bookmarksMenuFolderId));
						
					}
				}

				if (PlacesUtils.unfiledBookmarksFolderId !== undefined) {
					if (PreferenceAdvanced.getBoolSubfolders() === true) {
						objectFolder.push({
							'intIdent': PlacesUtils.unfiledBookmarksFolderId,
							'intTimestamp': 0,
							'intParent': 0,
							'strType': 'typeFolder',
							'strTitle': '@string/Unfiled',
							'strLink': '',
							'strIcon': '',
							'strTags': '',
							'intAccesscount': 0
						});
						
					} else if (PreferenceAdvanced.getBoolSubfolders() === false) {
						objectFolder.push.apply(objectFolder, Bookmarks.updateEnumerate(PlacesUtils.unfiledBookmarksFolderId));
						
					}
				}
				
			} else if (intFolder !== 0) {
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