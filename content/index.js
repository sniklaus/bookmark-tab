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

PreferenceAdvancedObserver.addObserver(function() {

});

PreferenceLayoutObserver.addObserver(function() {
	for (var intFor1 = 0; intFor1 < 3; intFor1 += 1) {
		jQuery('table:eq(0)').find('td:eq(' + intFor1 + ')').find('.cssTreeview')
			.treeview('refresh')
		;
	}
	
	for (var intFor1 = 0; intFor1 < 3; intFor1 += 1) {
		jQuery('table:eq(1)').find('td:eq(' + (intFor1 + 1) + ')').find('.cssTreeview')
			.treeview('refresh')
		;
	}
});

jQuery(document).ready(function() {
	{
		for (var intFor1 = 0; intFor1 < 3; intFor1 += 1) {
			jQuery('table:eq(0)').find('td:eq(' + intFor1 + ')').find('.cssTreeview')
				.data({
					'intColumn': intFor1
				})
				.treeview({
					'intIdent': 0,
					'functionData': function(intIdent) {
						var objectFolder = [];
						
						if (intIdent === 0) {
							{
								PreferenceLayout.acquire();
								
								PreferenceLayout.selectOpen(
									'SELECT   * ' +
									'FROM     PreferenceLayout ' +
									'WHERE    intColumn = :PARAM0 ' +
									'ORDER BY intPosition ASC ',
									[ String(jQuery(this).data('intColumn')) ]
								);
								
								do {
									PreferenceLayout.selectNext();
									
									if (PreferenceLayout.intIdent === 0) {
										break;
									}
									
									var objectBookmark = Bookmarks.updatePeek(PreferenceLayout.intItem);
									
									objectFolder.push(objectBookmark);
								} while (true);
								
								PreferenceLayout.selectClose();
								
								PreferenceLayout.release();
							}
							
						} else if (intIdent !== 0) {
							{
								objectFolder = Bookmarks.updateFolder(intIdent);
							}
							
						}
						
						return objectFolder;
					},
					'functionOpen': function(intIdent) {
						
					},
					'functionClose': function(intIdent) {
						
					}
				})
			;
		}
	}
	
	{
		/*
		jQuery('table:eq(0)').find('td').find('.cssTreeview').each(function() {
			if (jQuery(this).children().length === 0) {
				jQuery(this).closest('td')
					.remove()
				;
			}
		});
		*/
	}
	
	{
		jQuery('#idIndex_Configure')
			.off('click')
			.on('click', function() {
				{
					jQuery('#idIndex_ModalConfigure');
						.modalShow()
					;
				}
			})
		;
	}
	
	{
		jQuery('table:eq(1)').find('td:eq(0)').find('.cssTreeview')
			.treeview({
				'intIdent': 0,
				'functionData': function(intIdent) {
					var objectFolder = [];
					
					{
						var objectBookmarks = Bookmarks.updateFolder(intIdent);
						
						for (var intFor1 = 0; intFor1 < objectBookmarks.length; intFor1 += 1) {
							var objectBookmark = objectBookmarks[intFor1];
							
							objectBookmark.objectExtension = jQuery('<div></div>')
								.addClass('glyphicon')
								.addClass('glyphicon-plus')
								.css({
									'cursor': 'alias',
									'display': 'block',
									'position': 'absolute',
									'right': '7px',
									'top': '7px',
									'font-size': '14px'
								})
								.data({
									'objectBookmark': objectBookmark
								})
								.off('click')
								.on('click', function(eventHandle) {
									var objectBookmark = jQuery(this).data('objectBookmark');
									
									{
										eventHandle.stopPropagation();
										
										eventHandle.preventDefault();
									}
									
									{
										PreferenceLayout.acquire();
										
										PreferenceLayout.selectOpen(
											'SELECT   * ' +
											'FROM     PreferenceLayout ' +
											'WHERE    intColumn = 0 ' +
											'ORDER BY intPosition DESC ',
											[]
										);
										
										if (PreferenceLayout.intIdent === 0) {
											PreferenceLayout.intIdent = 0;
											PreferenceLayout.intColumn = 0;
											PreferenceLayout.intPosition = 0;
											PreferenceLayout.intItem = objectBookmark.intIdent;
											
											PreferenceLayout.create();
											
										} else if (PreferenceLayout.intIdent !== 0) {
											PreferenceLayout.intIdent = 0;
											PreferenceLayout.intColumn = 0;
											PreferenceLayout.intPosition = PreferenceLayout.intPosition + 1;
											PreferenceLayout.intItem = objectBookmark.intIdent;
											
											PreferenceLayout.create();
											
										}
										
										PreferenceLayout.selectClose();
										
										PreferenceLayout.release();
									}
								})
							;
							
							if (objectBookmark.strType === 'typeBookmark') {
								objectBookmark.strLink = undefined;
								
							} else if (objectBookmark.strType === 'typeSeparator') {
								objectBookmark.objectExtension = undefined;
								
							}
							
							objectFolder.push(objectBookmark);
						}
					}
					
					return objectFolder;
				},
				'functionOpen': function(intIdent) {
					
				},
				'functionClose': function(intIdent) {
					
				}
			})
		;
	}
	
	{
		for (var intFor1 = 0; intFor1 < 3; intFor1 += 1) {
			jQuery('table:eq(1)').find('td:eq(' + (intFor1 + 1) + ')').find('.cssTreeview')
				.data({
					'intColumn': intFor1
				})
				.treeview({
					'intIdent': 0,
					'functionData': function(intIdent) {
						var objectFolder = [];
						
						{
							PreferenceLayout.acquire();
							
							PreferenceLayout.selectOpen(
								'SELECT   * ' +
								'FROM     PreferenceLayout ' +
								'WHERE    intColumn = :PARAM0 ' +
								'ORDER BY intPosition ASC ',
								[ String(jQuery(this).data('intColumn')) ]
							);
							
							do {
								PreferenceLayout.selectNext();
								
								if (PreferenceLayout.intIdent === 0) {
									break;
								}
								
								var objectBookmark = Bookmarks.updatePeek(PreferenceLayout.intItem);
								
								objectBookmark.objectExtension = jQuery('<div></div>')
									.addClass('glyphicon')
									.addClass('glyphicon-minus')
									.css({
										'cursor': 'alias',
										'display': 'block',
										'position': 'absolute',
										'right': '7px',
										'top': '7px',
										'font-size': '14px'
									})
									.data({
										'intIdent': PreferenceLayout.intIdent,
										'intColumn': PreferenceLayout.intColumn,
										'intPosition': PreferenceLayout.intPosition,
										'intItem': PreferenceLayout.intItem
									})
									.off('click')
									.on('click', function(eventHandle) {
										{
											eventHandle.stopPropagation();
											
											eventHandle.preventDefault();
										}
										
										{
											PreferenceLayout.acquire();
											
											PreferenceLayout.intIdent = jQuery(this).data('intIdent');
											PreferenceLayout.intColumn = jQuery(this).data('intColumn');
											PreferenceLayout.intPosition = jQuery(this).data('intPosition');
											PreferenceLayout.intItem = jQuery(this).data('intItem');
											
											PreferenceLayout.remove();
											
											PreferenceLayout.release();
										}
									})
								;
								
								if (objectBookmark.strType === 'typeBookmark') {
									objectBookmark.strLink = undefined;
									
								} else if (objectBookmark.strType === 'typeSeparator') {
									objectBookmark.objectExtension = undefined;
									
								}
								
								objectFolder.push(objectBookmark);
							} while (true);
							
							PreferenceLayout.selectClose();
							
							PreferenceLayout.release();
						}
						
						return objectFolder;
					},
					'functionOpen': function(intIdent) {
						
					},
					'functionClose': function(intIdent) {
						
					}
				})
			;
		}
	}
	
	{
		// TODO: cursor:move
		// TODO: bookmarks not sortable
		
		for (var intFor1 = 0; intFor1 < 3; intFor1 += 1) {
			jQuery('table:eq(1)').find('td:eq(' + (intFor1 + 1) + ')').find('.cssTreeview')
				.sortable({
					'group': 'Index_ModalConfigure',
					'containerSelector': '.cssTreeview',
					'itemSelector': '.cssTreeviewNodeContainer',
					'handle': '.cssTreeviewNodeContainer',
					'placeholder': '<hr></hr>',
					'onDrop': function(itemHandle, containerHandle, functionSuper) {
						{
							functionSuper(itemHandle, containerHandle);
						}
						
						{
							PreferenceLayoutObserver.boolEnabled = false;
						}
						
						{
							PreferenceLayout.clear();
						}
						
						{
							PreferenceLayout.acquire();
							
							PreferenceLayout.transactionOpen();
							
							jQuery('table:eq(1)').find('td').find('.cssTreeview').slice(1).each(function(intFor1) {
								jQuery(this).find('.cssTreeviewNodeContainer').each(function(intFor2) {
									PreferenceLayout.intIdent = 0;
									PreferenceLayout.intColumn = intFor1;
									PreferenceLayout.intPosition = intFor2;
									PreferenceLayout.intItem = jQuery(this).find('.cssTreeviewNodeExtension').find('div').data('intItem');
									
									PreferenceLayout.create();
								});
							});
							
							PreferenceLayout.transactionClose();
							
							PreferenceLayout.release();
						}
						
						{
							PreferenceLayoutObserver.boolEnabled = true;
							
							PreferenceLayoutObserver.update();
						}
					}
				})
			;
		}
	}
});