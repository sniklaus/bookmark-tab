'use strict'

Components.utils.import('resource://gre/modules/PlacesUtils.jsm');

var Bookmarks = {
	init: function() {
		
	},
	
	dispel: function() {
		
	},
	
	updateFolder: function(intFolder) {
		var objectFolder = [];
		
		{
			if (intFolder === 0) {
				{
					objectFolder.push({
						'intIdent': PlacesUtils.toolbarFolderId,
						'intTimestamp': 0,
						'intParent': 0,
						'strType': 'typeFolder',
						'strImage': 'chrome://BookRect/content/images/folder.png',
						'strTitle': PlacesUtils.bookmarks.getItemTitle(PlacesUtils.toolbarFolderId),
						'strLink': '',
						'strTags': '',
						'intAccesscount': 0
					});
				}
				
				{
					objectFolder.push({
						'intIdent': PlacesUtils.bookmarksMenuFolderId,
						'intTimestamp': 0,
						'intParent': 0,
						'strType': 'typeFolder',
						'strImage': 'chrome://BookRect/content/images/folder.png',
						'strTitle': PlacesUtils.bookmarks.getItemTitle(PlacesUtils.bookmarksMenuFolderId),
						'strLink': '',
						'strTags': '',
						'intAccesscount': 0
					});
				}
				
				{
					objectFolder.push({
						'intIdent': PlacesUtils.unfiledBookmarksFolderId,
						'intTimestamp': 0,
						'intParent': 0,
						'strType': 'typeFolder',
						'strImage': 'chrome://BookRect/content/images/folder.png',
						'strTitle': PlacesUtils.bookmarks.getItemTitle(PlacesUtils.unfiledBookmarksFolderId),
						'strLink': '',
						'strTags': '',
						'intAccesscount': 0
					});
				}
				
			} else if (intFolder !== 0) {
				{
					var nodeFolder = PlacesUtils.getFolderContents(intFolder);
					
					for (var intFor1 = 0; intFor1 < nodeFolder.root.childCount; intFor1 += 1) {
						var nodeHandle = nodeFolder.root.getChild(intFor1);
						
						if (PlacesUtils.nodeIsFolder(nodeHandle) === true) {
							objectFolder.push({
								'intIdent': nodeHandle.itemId,
								'intTimestamp': nodeHandle.lastModified,
								'intParent': intFolder,
								'strType': 'typeFolder',
								'strImage': 'chrome://BookRect/content/images/folder.png',
								'strTitle': nodeHandle.title,
								'strLink': '',
								'strTags': '',
								'intAccesscount': 0
							});
							
						} else if (PlacesUtils.nodeIsBookmark(nodeHandle) === true) {
							objectFolder.push({
								'intIdent': nodeHandle.itemId,
								'intTimestamp': nodeHandle.lastModified,
								'intParent': intFolder,
								'strType': 'typeBookmark',
								'strImage': 'http://grabicon.com/icon?domain=' + nodeHandle.uri + '&size=16',
								'strTitle': nodeHandle.title,
								'strLink': nodeHandle.uri,
								'strTags': nodeHandle.tags,
								'intAccesscount': nodeHandle.accessCount
							});
							
						} else if (PlacesUtils.nodeIsSeparator(nodeHandle) === true) {
							objectFolder.push({
								'intIdent': nodeHandle.itemId,
								'intTimestamp': nodeHandle.lastModified,
								'intParent': intFolder,
								'strType': 'typeSeparator',
								'strImage': '',
								'strTitle': '',
								'strLink': '',
								'strTags': '',
								'intAccesscount': 0
							});
							
						}
						
						if (PlacesUtils.nodeIsBookmark(nodeHandle) === true) {
							if (nodeHandle.icon.indexOf('moz-anno:favicon:') !== -1) {
								objectFolder[objectFolder.length - 1].strImage = nodeHandle.icon;
							}
						}
					}
				}
				
			}
		}
		
		return objectFolder;
	},
	
	updatePeek: function(intItem) {
		var objectBookmark = null;
		
		{
			objectBookmark = {
				'intIdent': 0,
				'strType': '',
				'strImage': '',
				'strTitle': ''
			};
		}
		
		{
			if (PlacesUtils.bookmarks.getItemType(intItem) === PlacesUtils.bookmarks.TYPE_FOLDER) {
				objectBookmark.intIdent = intItem;
				objectBookmark.strType = 'typeFolder';
				objectBookmark.strImage = 'chrome://BookRect/content/images/folder.png';
				objectBookmark.strTitle = PlacesUtils.bookmarks.getItemTitle(intItem);
				
			} else if (PlacesUtils.bookmarks.getItemType(intItem) === PlacesUtils.bookmarks.TYPE_BOOKMARK) {
				objectBookmark.intIdent = intItem;
				objectBookmark.strType = 'typeBookmark';
				objectBookmark.strImage = 'http://grabicon.com/icon?domain=' + PlacesUtils.bookmarks.getBookmarkURI(intItem).spec + '&size=16';
				objectBookmark.strTitle = PlacesUtils.bookmarks.getItemTitle(intItem);
				
			} else if (PlacesUtils.bookmarks.getItemType(intItem) === PlacesUtils.bookmarks.TYPE_SEPARATOR) {
				objectBookmark.intIdent = intItem;
				objectBookmark.strType = 'typeSeparator';
				objectBookmark.strImage = '';
				objectBookmark.strTitle = '';
				
			}
		}
		
		return objectBookmark;
	},
	
	updateSearch: function(intFolder, strSearch) {
		// https://developer.mozilla.org/en-US/docs/Mozilla/Tech/Places/Retrieving_part_of_the_bookmarks_tree
		var query1 = historyService.getNewQuery();
		query1.searchTerms = "firefox";
	}
};
Bookmarks.init();