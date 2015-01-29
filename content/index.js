'use strict';

{
	var windowHandle = window
		.QueryInterface(Components.interfaces.nsIInterfaceRequestor).getInterface(Components.interfaces.nsIWebNavigation)
	    .QueryInterface(Components.interfaces.nsIDocShellTreeItem).rootTreeItem
	    .QueryInterface(Components.interfaces.nsIInterfaceRequestor).getInterface(Components.interfaces.nsIDOMWindow)
	;
	
	if (windowHandle !== undefined) {
		if (windowHandle.gURLBar !== undefined) {
			windowHandle.gURLBar.focus();
			windowHandle.gURLBar.select();
		}
	}
}

PreferenceSourceObserver.addObserver(function() {
	jQuery('#idIndex_ModalConfigure_Toolbar_Visible')
		.trigger('update')
	;
	
	jQuery('#idIndex_ModalConfigure_Toolbar_Subfolder')
		.trigger('update')
	;
	
	jQuery('#idIndex_ModalConfigure_Menu_Visible')
		.trigger('update')
	;
	
	jQuery('#idIndex_ModalConfigure_Menu_Subfolder')
		.trigger('update')
	;
	
	jQuery('#idIndex_ModalConfigure_Unfiled_Visible')
		.trigger('update')
	;
	
	jQuery('#idIndex_ModalConfigure_Unfiled_Subfolder')
		.trigger('update')
	;
});

jQuery(document).ready(function() {
	{
		var strLayout = JSON.parse(PreferenceSource.getStrLayout());
		
		for (var intFor1 = 0; intFor1 < strLayout.length; intFor1 += 1) {
			for (var intFor2 = 0; intFor2 < strLayout[intFor1].length; intFor2 += 1) {
				{
					jQuery('table').eq(0).find('div[name="' + strLayout[intFor1][intFor2] + '"]')
						.detach()
						.appendTo(jQuery('table').eq(0).find('td').eq(intFor1))
					;
				}
				
				{
					var intFolder = 0;
					
					if (strLayout[intFor1][intFor2] === 'folderToolbar') {
						intFolder = PlacesUtils.toolbarFolderId;
						
					} else if (strLayout[intFor1][intFor2] === 'folderMenu') {
						intFolder = PlacesUtils.bookmarksMenuFolderId;
						
					} else if (strLayout[intFor1][intFor2] === 'folderUnfiled') {
						intFolder = PlacesUtils.unfiledBookmarksFolderId;
						
					}
					
					jQuery('table').eq(0).find('div[name="' + strLayout[intFor1][intFor2] + '"]')
						.fancytree({
							'clickFolderMode': 2,
							'keyboard': false,
							'selectMode': 1,
							'toggleEffect': false,
							'source': Bookmarks.updateFancytree(true, intFolder),
							'lazyLoad': function(eventHandle, dataHandle) {
								{
									dataHandle.result = Bookmarks.updateFancytree(false, parseInt(dataHandle.node.key, 10));
								}
							}
						})
					;
				}
				
				/*
				{
					var intRoot = 0;
					
					if (strLayout[intFor1][intFor2] === 'folderToolbar') {
						intRoot = PlacesUtils.toolbarFolderId;
						
					} else if (strLayout[intFor1][intFor2] === 'folderMenu') {
						intRoot = PlacesUtils.bookmarksMenuFolderId;
						
					} else if (strLayout[intFor1][intFor2] === 'folderUnfiled') {
						intRoot = PlacesUtils.unfiledBookmarksFolderId;
						
					}
					
					jQuery('table').eq(0).find('div[name="' + strLayout[intFor1][intFor2] + '"]')
						.jstree({
							'core': {
								'animation': false,
								'check_callback': false,
								'dblclick_toggle': false,
								'multiple': false,
								'worker': false,
								'themes': {
									'url': 'chrome://bookrect/content/',
									'dir': 'content',
									'name': false,
									'dots': true,
									'icons': true
								},
								'data': function(parentHandle, callbackHandle) {
									var objectData = [];
									
									{
										var objectBookmarks = [];
										
										if (parentHandle.id === '#') {
											objectBookmarks = Bookmarks.updateRoot(intRoot);
											
										} else if (parentHandle.id !== '#') {
											objectBookmarks = Bookmarks.updateFolder(parseInt(parentHandle.id, 10));
											
										}
										
										for (var intFor1 = 0; intFor1 < objectBookmarks.length; intFor1 += 1) {
											var objectBookmark = objectBookmarks[intFor1];
											
											{
												if (objectBookmark.strType === 'typeFolder') {
													objectData.push({
														'parent': parentHandle.id,
														'id': String(objectBookmark.intIdent),
														'text': objectBookmark.strTitle,
														'icon': 'chrome://BookRect/content/images/treeFolder.png',
														'children': true
													});
													
												} else if (objectBookmark.strType === 'typeBookmark') {
													objectData.push({
														'parent': parentHandle.id,
														'id': String(objectBookmark.intIdent),
														'text': objectBookmark.strTitle,
														'icon': objectBookmark.strIcon,
														'children': false,
														'a_attr': {
															'href': objectBookmark.strLink
														} 
													});
													
												}
											}
										}
									}
									
									callbackHandle.call(this, objectData);
								}
							},
							'plugins': [ 'wholerow', 'state' ],
							'state': {
								'key': 'jstree' + intRoot,
								'events': 'select_node.jstree'
							}
						})
						//.off('select_node.jstree')
						.on('select_node.jstree', function(nodeHandle, selectedHandle) {
							if (selectedHandle.node.a_attr.href === '#') {
								{
									selectedHandle.instance.toggle_node(selectedHandle.node.id);
								}
								
								{
									selectedHandle.instance.deselect_all();
								}
								
							} else if (selectedHandle.node.a_attr.href !== '#') {
								{
									window.location.href = selectedHandle.node.a_attr.href;
								}
								
							}
						})
					;
					
					jQuery('table').eq(0).find('.jstree-no-dots')
						.removeClass('jstree-no-dots')
					;
				}
				*/
			}
		}
	}
	
	{
		jQuery('#idIndex_Configure')
			.off('click')
			.on('click', function() {
				{
					Modal.updateShow('#idIndex_ModalConfigure');
				}
			})
		;
	}
	
	{
		var strLayout = JSON.parse(PreferenceSource.getStrLayout());
		
		for (var intFor1 = 0; intFor1 < strLayout.length; intFor1 += 1) {
			for (var intFor2 = 0; intFor2 < strLayout[intFor1].length; intFor2 += 1) {
				{
					jQuery('table').eq(1).find('li[name="' + strLayout[intFor1][intFor2] + '"]')
						.detach()
						.appendTo(jQuery('table').eq(1).find('ol').eq(intFor1))
					;
				}
			}
		}
	}
	
	{
		jQuery('table').eq(1).find('ol')
			.sortable({
				'group': 'Index_ModalConfigure',
				'handle': '.panel-heading',
				'placeholder': '<hr></hr>',
				'onDrop': function(itemHandle, containerHandle, functionSuper) {
					{
						functionSuper(itemHandle, containerHandle);
					}
					
					{
						var strLayout = [ [], [], [] ];
						
						jQuery('table').eq(1).find('ol').each(function(intFor1) {
							jQuery(this).find('li').each(function() {
								strLayout[intFor1].push(jQuery(this).attr('name'));
							});
						});
						
						PreferenceSource.setStrLayout(JSON.stringify(strLayout));
					}
				}
			})
		;
	}
	
	{
		jQuery('#idIndex_ModalConfigure_Toolbar_Visible')
			.off('click')
			.on('click', function() {
				if (PreferenceSource.getBoolToolbarVisible() === true) {
					PreferenceSource.setBoolToolbarVisible(false);
					
				} else if (PreferenceSource.getBoolToolbarVisible() === false) {
					PreferenceSource.setBoolToolbarVisible(true);
					
				}
			})
			.off('update')
			.on('update', function() {
				if (PreferenceSource.getBoolToolbarVisible() === true) {
					jQuery(this)
						.addClass('btn-primary')
						.removeClass('btn-default')
					;
					
					jQuery(this).find('span')
						.addClass('glyphicon-check')
						.removeClass('glyphicon-unchecked')
					;
					
				} else if (PreferenceSource.getBoolToolbarVisible() === false) {
					jQuery(this)
						.addClass('btn-default')
						.removeClass('btn-primary')
					;
					
					jQuery(this).find('span')
						.addClass('glyphicon-unchecked')
						.removeClass('glyphicon-check')
					;
					
				}
			})
		;
		
		jQuery('#idIndex_ModalConfigure_Toolbar_Visible')
			.trigger('update')
		;
	}
	
	{
		jQuery('#idIndex_ModalConfigure_Toolbar_Subfolder')
			.off('click')
			.on('click', function() {
				if (PreferenceSource.getBoolToolbarSubfolder() === true) {
					PreferenceSource.setBoolToolbarSubfolder(false);
					
				} else if (PreferenceSource.getBoolToolbarSubfolder() === false) {
					PreferenceSource.setBoolToolbarSubfolder(true);
					
				}
			})
			.off('update')
			.on('update', function() {
				if (PreferenceSource.getBoolToolbarSubfolder() === true) {
					jQuery(this)
						.addClass('btn-primary')
						.removeClass('btn-default')
					;
					
					jQuery(this).find('span')
						.addClass('glyphicon-check')
						.removeClass('glyphicon-unchecked')
					;
					
				} else if (PreferenceSource.getBoolToolbarSubfolder() === false) {
					jQuery(this)
						.addClass('btn-default')
						.removeClass('btn-primary')
					;
					
					jQuery(this).find('span')
						.addClass('glyphicon-unchecked')
						.removeClass('glyphicon-check')
					;
					
				}
			})
		;
		
		jQuery('#idIndex_ModalConfigure_Toolbar_Subfolder')
			.trigger('update')
		;
	}
	
	{
		jQuery('#idIndex_ModalConfigure_Menu_Visible')
			.off('click')
			.on('click', function() {
				if (PreferenceSource.getBoolMenuVisible() === true) {
					PreferenceSource.setBoolMenuVisible(false);
					
				} else if (PreferenceSource.getBoolMenuVisible() === false) {
					PreferenceSource.setBoolMenuVisible(true);
					
				}
			})
			.off('update')
			.on('update', function() {
				if (PreferenceSource.getBoolMenuVisible() === true) {
					jQuery(this)
						.addClass('btn-primary')
						.removeClass('btn-default')
					;
					
					jQuery(this).find('span')
						.addClass('glyphicon-check')
						.removeClass('glyphicon-unchecked')
					;
					
				} else if (PreferenceSource.getBoolMenuVisible() === false) {
					jQuery(this)
						.addClass('btn-default')
						.removeClass('btn-primary')
					;
					
					jQuery(this).find('span')
						.addClass('glyphicon-unchecked')
						.removeClass('glyphicon-check')
					;
					
				}
			})
		;
		
		jQuery('#idIndex_ModalConfigure_Menu_Visible')
			.trigger('update')
		;
	}
	
	{
		jQuery('#idIndex_ModalConfigure_Menu_Subfolder')
			.off('click')
			.on('click', function() {
				if (PreferenceSource.getBoolMenuSubfolder() === true) {
					PreferenceSource.setBoolMenuSubfolder(false);
					
				} else if (PreferenceSource.getBoolMenuSubfolder() === false) {
					PreferenceSource.setBoolMenuSubfolder(true);
					
				}
			})
			.off('update')
			.on('update', function() {
				if (PreferenceSource.getBoolMenuSubfolder() === true) {
					jQuery(this)
						.addClass('btn-primary')
						.removeClass('btn-default')
					;
					
					jQuery(this).find('span')
						.addClass('glyphicon-check')
						.removeClass('glyphicon-unchecked')
					;
					
				} else if (PreferenceSource.getBoolMenuSubfolder() === false) {
					jQuery(this)
						.addClass('btn-default')
						.removeClass('btn-primary')
					;
					
					jQuery(this).find('span')
						.addClass('glyphicon-unchecked')
						.removeClass('glyphicon-check')
					;
					
				}
			})
		;
		
		jQuery('#idIndex_ModalConfigure_Menu_Subfolder')
			.trigger('update')
		;
	}
	
	{
		jQuery('#idIndex_ModalConfigure_Unfiled_Visible')
			.off('click')
			.on('click', function() {
				if (PreferenceSource.getBoolUnfiledVisible() === true) {
					PreferenceSource.setBoolUnfiledVisible(false);
					
				} else if (PreferenceSource.getBoolUnfiledVisible() === false) {
					PreferenceSource.setBoolUnfiledVisible(true);
					
				}
			})
			.off('update')
			.on('update', function() {
				if (PreferenceSource.getBoolUnfiledVisible() === true) {
					jQuery(this)
						.addClass('btn-primary')
						.removeClass('btn-default')
					;
					
					jQuery(this).find('span')
						.addClass('glyphicon-check')
						.removeClass('glyphicon-unchecked')
					;
					
				} else if (PreferenceSource.getBoolUnfiledVisible() === false) {
					jQuery(this)
						.addClass('btn-default')
						.removeClass('btn-primary')
					;
					
					jQuery(this).find('span')
						.addClass('glyphicon-unchecked')
						.removeClass('glyphicon-check')
					;
					
				}
			})
		;
		
		jQuery('#idIndex_ModalConfigure_Unfiled_Visible')
			.trigger('update')
		;
	}
	
	{
		jQuery('#idIndex_ModalConfigure_Unfiled_Subfolder')
			.off('click')
			.on('click', function() {
				if (PreferenceSource.getBoolUnfiledSubfolder() === true) {
					PreferenceSource.setBoolUnfiledSubfolder(false);
					
				} else if (PreferenceSource.getBoolUnfiledSubfolder() === false) {
					PreferenceSource.setBoolUnfiledSubfolder(true);
					
				}
			})
			.off('update')
			.on('update', function() {
				if (PreferenceSource.getBoolUnfiledSubfolder() === true) {
					jQuery(this)
						.addClass('btn-primary')
						.removeClass('btn-default')
					;
					
					jQuery(this).find('span')
						.addClass('glyphicon-check')
						.removeClass('glyphicon-unchecked')
					;
					
				} else if (PreferenceSource.getBoolUnfiledSubfolder() === false) {
					jQuery(this)
						.addClass('btn-default')
						.removeClass('btn-primary')
					;
					
					jQuery(this).find('span')
						.addClass('glyphicon-unchecked')
						.removeClass('glyphicon-check')
					;
					
				}
			})
		;
		
		jQuery('#idIndex_ModalConfigure_Unfiled_Subfolder')
			.trigger('update')
		;
	}
});