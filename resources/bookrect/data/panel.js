'use strict';

self.port.on('eventShow', function() {
	{
		jQuery('.cssSearchInput')
			.val('')
		;
		
		jQuery('.cssSearchTree')
			.empty()
		;
	}

	{	
		// ------------------------------------------------------------------------------------------------
		// - index.js
		// ------------------------------------------------------------------------------------------------
		
		Components.utils.import('resource://gre/modules/PlacesUtils.jsm');
		
		{
			Bookmarks.obtain().update();
		}
		
		{
			if (PreferenceAdvanced.obtain().getBoolSearch() === true) {
				jQuery('.cssSearchContainer')
					.css({
						'display': 'block'
					})
				;
				
			} else if (PreferenceAdvanced.obtain().getBoolSearch() === false) {
				jQuery('.cssSearchContainer')
					.css({
						'display': 'none'
					})
				;
				
			}
			
			jQuery('.cssSearch')
				.hover(
					function() {
						jQuery(this)
							.addClass('cssSearchHover')
						;
					},
					function() {
						jQuery(this)
							.removeClass('cssSearchHover')
						;
					}
				)
				.off('click')
				.on('click', function() {
					jQuery('.cssSearchInput')
						.focus()
					;
				})
			;
			
			jQuery('.cssSearchInput')
				.off('input')
				.on('input', function() {
					var strSearch = jQuery('.cssSearchInput').val();
					
					if (strSearch.length < 2) {
						jQuery('.cssSearchTree')
							.empty()
						;
						
					} else if (strSearch.length > 1) {
						CoderectTree.init(jQuery('.cssSearchTree'), function(objectNodeParent) {
							var objectFolder = [];
							
							{
								PreferenceBookmark.obtain().acquire();
								
								if (objectNodeParent === null) {
									PreferenceBookmark.obtain().selectOpen(
										'SELECT * ' +
										'FROM PreferenceBookmark ' +
										'WHERE LOWER(TRIM(strTitle)) LIKE LOWER(TRIM(:PARAMETER1)) OR LOWER(TRIM(strLink)) LIKE LOWER(TRIM(:PARAMETER1)) ' +
										'ORDER BY strTitle ASC ',
										['%' + strSearch + '%']
									);
									
								} else if (objectNodeParent !== null) {
									PreferenceBookmark.obtain().selectOpen(
										'SELECT * ' +
										'FROM PreferenceBookmark ' +
										'WHERE intFolderParent = :PARAMETER1 ',
										[objectNodeParent]
									);
									
								}
								
								do {
									PreferenceBookmark.obtain().selectNext();
									
									if (PreferenceBookmark.obtain().intIdent === 0) {
										break;
									}
								
									var strStatus = PreferenceBookmark.obtain().strStatus;
									var intFolder = PreferenceBookmark.obtain().intFolder;
									var intFolderParent = PreferenceBookmark.obtain().intFolderParent;
									var strFavicon = PreferenceBookmark.obtain().strFavicon;
									var strTitle = PreferenceBookmark.obtain().strTitle;
									var strLink = PreferenceBookmark.obtain().strLink;
									
									if (intFolder === 0) {
										objectFolder.push({
											'tree': {
												'objectNode': intFolder,
												'objectNodeParent': objectNodeParent
											},
											'main': {
												'strClass': 'cssTreeNode',
												'strClassHover': 'cssTreeNodeHover',
												'strHref': strLink
											},
											'image': {
												'strClass': 'cssTreeNodeImage',
												'strSrc': strFavicon,
												'intWidth': 16,
												'intHeight': 16,
												'intBorder': 0
											},
											'title': {
												'strClass': 'cssTreeNodeTitle',
												'strText': strTitle
											}
										});
										
									} else if (intFolder !== 0) {
										objectFolder.push({
											'tree': {
												'objectNode': intFolder,
												'objectNodeParent': objectNodeParent
											},
											'main': {
												'strClass': 'cssTreeNode',
												'strClassHover': 'cssTreeNodeHover',
												'functionClick': function(objectNode) {
													
												}
											},
											'folder': {
												'strClassContainer': 'cssTreeNodeContainer',
												'strClassPlaceholder': 'cssTreeNodePlaceholder',
												'strStatus': 'statusClosed',
												'functionStatus': function(objectNode, strStatus) {
													
												}
											},
											'image': {
												'strClass': 'cssTreeNodeImage',
												'strSrc': strFavicon,
												'intWidth': 16,
												'intHeight': 16,
												'intBorder': 0
											},
											'title': {
												'strClass': 'cssTreeNodeTitle',
												'strText': strTitle
											}
										});
										
									}
								} while (true);
								
								PreferenceBookmark.obtain().selectClose();
								
								PreferenceBookmark.obtain().release();
							}
							
							return objectFolder;
						});
						
					}
				})
			;
		}
		
		{
			CoderectTree.init(jQuery('.cssTree'), function(objectNodeParent) {
				var objectFolder = [];
				
				{
					var intLoad = [];
					
					if (objectNodeParent === null) {
						if (PreferenceAdvanced.obtain().getBoolSubfolders() === true) {
							intLoad.push(PlacesUtils.placesRootId);
						
						} else if (PreferenceAdvanced.obtain().getBoolSubfolders() === false) {
							intLoad.push(PlacesUtils.toolbarFolderId);
							
							intLoad.push(PlacesUtils.bookmarksMenuFolderId);
							
							intLoad.push(PlacesUtils.unfiledBookmarksFolderId);
							
						}
						
					} else if (objectNodeParent !== null) {
						intLoad.push(objectNodeParent);
						
					}
					
					for (var intFor1 = 0; intFor1 < intLoad.length; intFor1 += 1) {
						PreferenceBookmark.obtain().acquire();
						
						PreferenceBookmark.obtain().selectOpen(
							'SELECT * ' +
							'FROM PreferenceBookmark ' +
							'WHERE intFolderParent = :PARAMETER1 ',
							[intLoad[intFor1]]
						);
						
						do {
							PreferenceBookmark.obtain().selectNext();
							
							if (PreferenceBookmark.obtain().intIdent === 0) {
								break;
							}
						
							var strStatus = PreferenceBookmark.obtain().strStatus;
							var intFolder = PreferenceBookmark.obtain().intFolder;
							var intFolderParent = PreferenceBookmark.obtain().intFolderParent;
							var strFavicon = PreferenceBookmark.obtain().strFavicon;
							var strTitle = PreferenceBookmark.obtain().strTitle;
							var strLink = PreferenceBookmark.obtain().strLink;
							
							if (intFolder === 0) {
								objectFolder.push({
									'tree': {
										'objectNode': intFolder,
										'objectNodeParent': objectNodeParent,
									},
									'main': {
										'strClass': 'cssTreeNode',
										'strClassHover': 'cssTreeNodeHover',
										'strHref': strLink
									},
									'image': {
										'strClass': 'cssTreeNodeImage',
										'strSrc': strFavicon,
										'intWidth': 16,
										'intHeight': 16,
										'intBorder': 0
									},
									'title': {
										'strClass': 'cssTreeNodeTitle',
										'strText': strTitle
									}
								});
								
							} else if (intFolder !== 0) {
								objectFolder.push({
									'tree': {
										'objectNode': intFolder,
										'objectNodeParent': objectNodeParent,
									},
									'main': {
										'strClass': 'cssTreeNode',
										'strClassHover': 'cssTreeNodeHover',
										'functionClick': function(objectNode) {
											
										}
									},
									'folder': {
										'strClassContainer': 'cssTreeNodeContainer',
										'strClassPlaceholder': 'cssTreeNodePlaceholder',
										'strStatus': strStatus,
										'functionStatus': function(objectNode, strStatus) {
											PreferenceBookmark.obtain().acquire();
											
											PreferenceBookmark.obtain().selectOpen(
												'SELECT * ' +
												'FROM PreferenceBookmark ' +
												'WHERE intFolder = :PARAMETER1 ',
												[objectNode] 
											);
											
											PreferenceBookmark.obtain().selectNext();
											
											if (PreferenceBookmark.obtain().intIdent !== 0) {
												PreferenceBookmark.obtain().strStatus = strStatus;
												
												PreferenceBookmark.obtain().save();
											}
											
											PreferenceBookmark.obtain().selectClose();
											
											PreferenceBookmark.obtain().release();
										}
									},
									'image': {
										'strClass': 'cssTreeNodeImage',
										'strSrc': strFavicon,
										'intWidth': 16,
										'intHeight': 16,
										'intBorder': 0
									},
									'title': {
										'strClass': 'cssTreeNodeTitle',
										'strText': strTitle
									}
								});
								
							}
						} while (true);
						
						PreferenceBookmark.obtain().selectClose();
						
						PreferenceBookmark.obtain().release();
					}
				}
				
				if (PreferenceAdvanced.obtain().getBoolState() === false) {
					for (var intFor1 = 0; intFor1 < objectFolder.length; intFor1 += 1) {
						if (objectFolder[intFor1].folder) {
							objectFolder[intFor1].folder.strStatus = 'statusClosed';
						}
					}
				}
				
				return objectFolder;
			});
		}
	}
});

self.port.on('eventHide', function() {

});

jQuery(document).ready(function() {
	jQuery(window)
		.off('click')
		.on('click', function(eventHandle) {
			if (jQuery(eventHandle.target).closest('a').size() !== 0) {
				{
					eventHandle.stopPropagation();
					
					eventHandle.preventDefault();
				}
				
				if (eventHandle.which === 1) {
					self.port.emit('eventClickLeft', jQuery(eventHandle.target).closest('a').attr('href'));
					
				} else if (eventHandle.which === 2) {
					self.port.emit('eventClickMiddle', jQuery(eventHandle.target).closest('a').attr('href'));
					
				}
			}
		})
	;
});