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
					if (PreferenceSource.getBoolToolbar() === true) {
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
				}

				if (PlacesUtils.bookmarksMenuFolderId !== undefined) {
					if (PreferenceSource.getBoolMenu() === true) {
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
				}

				if (PlacesUtils.unfiledBookmarksFolderId !== undefined) {
					if (PreferenceSource.getBoolUnfiled() === true) {
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
				}
				
			} else if (intFolder !== 0) {
				var nodeFolder = PlacesUtils.getFolderContents(intFolder);
				
				for (var intFor1 = 0; intFor1 < nodeFolder.root.childCount; intFor1 += 1) {
					var nodeHandle = nodeFolder.root.getChild(intFor1);
					
					{
						if (PlacesUtils.nodeIsFolder(nodeHandle) === true) {
							objectFolder.push({
								'intIdent': nodeHandle.itemId,
								'intTimestamp': nodeHandle.lastModified,
								'intParent': intFolder,
								'strTitle': nodeHandle.title,
								'strLink': '',
								'strType': 'typeFolder',
								'strIcon': '',
								'strTags': '',
								'intAccesscount': 0
							});
							
						} else if (PlacesUtils.nodeIsBookmark(nodeHandle) === true) {
							objectFolder.push({
								'intIdent': nodeHandle.itemId,
								'intTimestamp': nodeHandle.lastModified,
								'intParent': intFolder,
								'strType': 'typeBookmark',
								'strTitle': nodeHandle.title,
								'strLink': nodeHandle.uri,
								'strIcon': nodeHandle.icon,
								'strTags': nodeHandle.tags,
								'intAccesscount': nodeHandle.accessCount
							});
							
						} else if (PlacesUtils.nodeIsSeparator(nodeHandle) === true) {
							objectFolder.push({
								'intIdent': nodeHandle.itemId,
								'intTimestamp': nodeHandle.lastModified,
								'intParent': intFolder,
								'strTitle': '',
								'strLink': '',
								'strType': 'typeSeparator',
								'strIcon': '',
								'strTags': '',
								'intAccesscount': 0
							});
							
						}
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