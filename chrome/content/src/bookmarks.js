'use strict';

Components.utils.import('resource://gre/modules/NetUtil.jsm');
Components.utils.import('resource://gre/modules/PlacesUtils.jsm');

var Bookmarks = new function Bookmarks() {
	var boolObtained = false;
	
	var objectSingleton = this;
	
	Bookmarks.init = function() {
		if (boolObtained === false) {
			boolObtained = true;
			
			objectSingleton.init();
		}
	};
	
	Bookmarks.dispel = function() {
		if (boolObtained === true) {
			boolObtained = false;
			
			objectSingleton.finalize();
		}
	};
	
	Bookmarks.obtain = function() {
		Bookmarks.init();
		
		return objectSingleton;
	};
	
	this.init = function() {
		
	};
	
	this.finalize = function() {
		
	};
	
	this.update = function() {
		var intMax = 0;
		
		{
			var functionMax = function(intFolderRefresh) {
				var nodeParent = PlacesUtils.getFolderContents(intFolderRefresh);
				
				for (var intFor1 = 0; intFor1 < nodeParent.root.childCount; intFor1 += 1) {
					var nodeChild = nodeParent.root.getChild(intFor1);
					
					if (PlacesUtils.nodeIsFolder(nodeChild) === true) {
						if (nodeChild.lastModified > intMax) {
							intMax = nodeChild.lastModified;
						}
						
					} else if (PlacesUtils.nodeIsBookmark(nodeChild) === true) {
						if (nodeChild.lastModified > intMax) {
							intMax = nodeChild.lastModified;
						}
						
					}
					
					if (PlacesUtils.nodeIsFolder(nodeChild) === true) {
						functionMax(nodeChild.itemId);
					}
				}
			};
			
			functionMax(PlacesUtils.placesRootId);
		}
		
		{
			// PREFERENCES CAN'T STORE 64 BIT INTEGERS
			
			intMax = intMax % 123456789;
		}
		
		if (intMax !== PreferenceCache.obtain().getIntBookmarkidentifier()) {
			{
				PreferenceCache.obtain().setIntBookmarkidentifier(intMax);
			}
			
			{
				this.refresh();
			}
		}
	};
	
	this.refresh = function() {
		{
			PreferenceBookmark.obtain().acquire();
			
			PreferenceBookmark.obtain().clear();
			
			PreferenceBookmark.obtain().release();
		}
		
		{
			PreferenceBookmark.obtain().acquire();
			
			PreferenceBookmark.obtain().transactionOpen();
			
			if (PreferenceSource.obtain().getBoolToolbar() === true) {
				if (PlacesUtils.toolbarFolderId) {
					if (PreferenceAdvanced.obtain().getBoolSubfolders() === true) {
						var strStatus = 'statusClosed';
						var intFolder = PlacesUtils.toolbarFolderId;
						var intFolderParent = PlacesUtils.placesRootId;
						var strFavicon = 'chrome://BookRect/content/assets/images/treeFolder.png';
						var strTitle = LocalisationOptions.obtain().getStrLocalized('Options_General_Source_strToolbar');
						var strLink = '';
						
						PreferenceBookmark.obtain().strStatus = strStatus;
						PreferenceBookmark.obtain().intFolder = intFolder;
						PreferenceBookmark.obtain().intFolderParent = intFolderParent;
						PreferenceBookmark.obtain().strFavicon = strFavicon;
						PreferenceBookmark.obtain().strTitle = strTitle;
						PreferenceBookmark.obtain().strLink = strLink;
						
						PreferenceBookmark.obtain().create();
					}
					
					this.refreshFolder(PlacesUtils.toolbarFolderId);
				}
			}
			
			if (PreferenceSource.obtain().getBoolMenu() === true) {
				if (PlacesUtils.bookmarksMenuFolderId) {
					if (PreferenceAdvanced.obtain().getBoolSubfolders() === true) {
						var strStatus = 'statusClosed';
						var intFolder = PlacesUtils.bookmarksMenuFolderId;
						var intFolderParent = PlacesUtils.placesRootId;
						var strFavicon = 'chrome://BookRect/content/assets/images/treeFolder.png';
						var strTitle = LocalisationOptions.obtain().getStrLocalized('Options_General_Source_strMenu');
						var strLink = '';
						
						PreferenceBookmark.obtain().strStatus = strStatus;
						PreferenceBookmark.obtain().intFolder = intFolder;
						PreferenceBookmark.obtain().intFolderParent = intFolderParent;
						PreferenceBookmark.obtain().strFavicon = strFavicon;
						PreferenceBookmark.obtain().strTitle = strTitle;
						PreferenceBookmark.obtain().strLink = strLink;
						
						PreferenceBookmark.obtain().create();
					}
					
					this.refreshFolder(PlacesUtils.bookmarksMenuFolderId);
				}
			}
			
			if (PreferenceSource.obtain().getBoolUnfiled() === true) {
				if (PlacesUtils.unfiledBookmarksFolderId) {
					if (PreferenceAdvanced.obtain().getBoolSubfolders() === true) {
						var strStatus = 'statusClosed';
						var intFolder = PlacesUtils.unfiledBookmarksFolderId;
						var intFolderParent = PlacesUtils.placesRootId;
						var strFavicon = 'chrome://BookRect/content/assets/images/treeFolder.png';
						var strTitle = LocalisationOptions.obtain().getStrLocalized('Options_General_Source_strUnfiled');
						var strLink = '';
						
						PreferenceBookmark.obtain().strStatus = strStatus;
						PreferenceBookmark.obtain().intFolder = intFolder;
						PreferenceBookmark.obtain().intFolderParent = intFolderParent;
						PreferenceBookmark.obtain().strFavicon = strFavicon;
						PreferenceBookmark.obtain().strTitle = strTitle;
						PreferenceBookmark.obtain().strLink = strLink;
						
						PreferenceBookmark.obtain().create();
					}
					
					this.refreshFolder(PlacesUtils.unfiledBookmarksFolderId);
				}
			}
			
			PreferenceBookmark.obtain().transactionClose();
			
			PreferenceBookmark.obtain().release();
		}
	};
	
	this.refreshFolder = function(intFolderRefresh) {
		var nodeParent = PlacesUtils.getFolderContents(intFolderRefresh);
		
		for (var intFor1 = 0; intFor1 < nodeParent.root.childCount; intFor1 += 1) {
			var nodeChild = nodeParent.root.getChild(intFor1);
			
			if (PlacesUtils.nodeIsFolder(nodeChild) === true) {
				var strStatus = 'statusClosed';
				var intFolder = nodeChild.itemId;
				var intFolderParent = intFolderRefresh;
				var strFavicon = 'chrome://BookRect/content/assets/images/treeFolder.png';
				var strTitle = nodeChild.title;
				var strLink = '';
				
				PreferenceBookmark.obtain().strStatus = strStatus;
				PreferenceBookmark.obtain().intFolder = intFolder;
				PreferenceBookmark.obtain().intFolderParent = intFolderParent;
				PreferenceBookmark.obtain().strFavicon = strFavicon;
				PreferenceBookmark.obtain().strTitle = strTitle;
				PreferenceBookmark.obtain().strLink = strLink;
				
				PreferenceBookmark.obtain().create();
				
			} else if (PlacesUtils.nodeIsBookmark(nodeChild) === true) {				
				var strStatus = 'statusNone';
				var intFolder = 0;
				var intFolderParent = intFolderRefresh;
				var strFavicon = 'http://g.etfv.co/' + nodeChild.uri;
				var strTitle = nodeChild.title;
				var strLink = nodeChild.uri;
				
				PreferenceBookmark.obtain().strStatus = strStatus;
				PreferenceBookmark.obtain().intFolder = intFolder;
				PreferenceBookmark.obtain().intFolderParent = intFolderParent;
				PreferenceBookmark.obtain().strFavicon = strFavicon;
				PreferenceBookmark.obtain().strTitle = strTitle;
				PreferenceBookmark.obtain().strLink = strLink;
				
				PreferenceBookmark.obtain().create();
				
			}
			
			if (PlacesUtils.nodeIsFolder(nodeChild) === true) {
				this.refreshFolder(nodeChild.itemId);
			}
		}
	};
	
	return Bookmarks;
};