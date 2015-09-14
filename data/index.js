'use strict';

var Panel = {
	init: function() {
		{
			self.port.on('panelShow', Panel.showCallback);
			
			self.port.on('panelHide', Panel.hideCallback);
		}
	},
	
	dispel: function() {
		
	},
	
	showCallback: function(objectArguments) {
		
	},
	
	hideCallback: function(objectArguments) {
		
	}
};
Panel.init();

self.port.on('bookmarksList', function(objectArguments) {
	jQuery('#' + objectArguments.strCallback)
		.treeviewData({
			'objectNode': objectArguments.resultHandle
		})
	;
});

self.port.on('bookmarksPeek', function(objectArguments) {
	jQuery('#' + objectArguments.strCallback)
		.treeviewData({
			'objectNode': objectArguments.resultHandle
		})
	;
});

self.port.on('bookmarksSearch', function(objectArguments) {
	
});

PreferenceAdvancedObserver.addObserver(function() {
	
});

PreferenceLayoutObserver.addObserver(function() {
	for (var intFor1 = 0; intFor1 < 3; intFor1 += 1) {
		jQuery('table').eq(0).find('td').eq(intFor1).find('.cssTreeview').triggerHandler('update');
	}
	
	for (var intFor1 = 0; intFor1 < 3; intFor1 += 1) {
		jQuery('table').eq(1).find('td').eq(intFor1 + 1).find('.cssTreeview').triggerHandler('update');
	}
});

{
	if (window.gURLBar !== undefined) {
		{
			window.gURLBar.focus();
		}
		
		{
			window.gURLBar.select();
		}
	}
}

{
	for (var intFor1 = 0; intFor1 < 3; intFor1 += 1) {
		jQuery('table').eq(0).find('td').eq(intFor1).find('.cssTreeview')
			.data({
				'intColumn': intFor1
			})
			.off('update')
			.on('update', function() {
				jQuery(this)
					.treeview({
						'intIdent': 0,
						'functionData': function(objectNode) {
							
						},
						'functionOpen': function(objectNode) {
							var objectArguments = {
								'strCallback': '',
								'intIdent': 0
							};
							
							{
								objectArguments.strCallback += Math.random().toString(36).substr(2);
								
								objectArguments.strCallback += Math.random().toString(36).substr(2);
								
								objectArguments.strCallback += Math.random().toString(36).substr(2);
							}
							
							{
								jQuery(this)
									.attr({
										'id': objectArguments.strCallback
									})
								;
							}
							
							{
								if (objectNode.intIdent === 0) {
									{
										objectArguments.intIdent = [];
									}
									
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
											
											{
												objectArguments.intIdent.push(PreferenceLayout.intItem);
											}
										} while (true);
										
										PreferenceLayout.selectClose();
										
										PreferenceLayout.release();
									}
									
								} else if (objectNode.intIdent !== 0) {
									{
										objectArguments.intIdent = objectNode.intIdent;
									}
									
								}
							}
							
							{
								if (objectNode.intIdent === 0) {
									self.port.emit('bookmarksPeek', objectArguments);
									
								} else if (objectNode.intIdent !== 0) {
									self.port.emit('bookmarksList', objectArguments);
									
								}
							}
							
							{
								if (objectNode.intIdent === 0) {
									if (objectArguments.intIdent.length === 0) {
										jQuery(this).closest('td')
											.css({
												'display': 'none'
											})
										;
										
									} else if (objectArguments.intIdent.length !== 0) {
										jQuery(this).closest('td')
											.css({
												'display': 'table-cell'
											})
										;
										
									}
								}
							}
						},
						'functionClose': function(objectNode) {
							
						},
						'functionClick': function(objectNode, eventHandle) {
							if (eventHandle.which !== 1) {
								if (eventHandle.which !== 2) {
									return;
								}
							}
							
							{
								eventHandle.stopPropagation();
								
								eventHandle.preventDefault();
							}
							
							var objectArguments = {
								'strTab': '',
								'strLink': objectNode.strLink
							};
							
							{
								if (eventHandle.which === 1) {
									objectArguments.strTab = 'tabCurrent';
									
								} else if (eventHandle.which === 2) {
									objectArguments.strTab = 'tabNew';
									
								}
							}
							
							{
								self.port.emit('bookmarksNavigate', objectArguments);
							}
						}
					})
				;
			})
		;
		
		jQuery('table').eq(0).find('td').eq(intFor1).find('.cssTreeview').triggerHandler('update');
	}
}

{
	jQuery('#idSettings_Layout')
		.off('click')
		.on('click', function() {
			{
				jQuery('#idSettings_ModalLayout')
					.modalShow()
				;
			}
		})
	;
}

{
	jQuery('table').eq(1).find('td').eq(0).find('.cssTreeview')
		.off('update')
		.on('update', function() {
			return; // TODO: remove
			
			jQuery(this)
				.treeview({
					'intIdent': 0,
					'functionData': function(intIdent) {
						var objectFolder = [];
						
						{
							var objectBookmarks = Bookmarks.list(intIdent);
							
							for (var intFor1 = 0; intFor1 < objectBookmarks.length; intFor1 += 1) {
								var objectBookmark = objectBookmarks[intFor1];
								
								{
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
											'intIdent': objectBookmark.intIdent,
											'strType': objectBookmark.strType,
											'strImage': objectBookmark.strImage,
											'strTitle': objectBookmark.strTitle
										})
										.off('click')
										.on('click', function(eventHandle) {
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
												
												PreferenceLayout.selectNext();
												
												if (PreferenceLayout.intIdent === 0) {
													PreferenceLayout.intIdent = 0;
													PreferenceLayout.intColumn = 0;
													PreferenceLayout.intPosition = 0;
													PreferenceLayout.intItem = jQuery(this).data('intIdent');
													
													PreferenceLayout.create();
													
												} else if (PreferenceLayout.intIdent !== 0) {
													PreferenceLayout.intIdent = 0;
													PreferenceLayout.intColumn = 0;
													PreferenceLayout.intPosition = PreferenceLayout.intPosition + 1;
													PreferenceLayout.intItem = jQuery(this).data('intIdent');
													
													PreferenceLayout.create();
													
												}
												
												PreferenceLayout.selectClose();
												
												PreferenceLayout.release();
											}
										})
									;
								}
								
								{
									if (objectBookmark.strType === 'typeBookmark') {
										objectBookmark.strLink = undefined;
										
									} else if (objectBookmark.strType === 'typeSeparator') {
										objectBookmark.objectExtension = undefined;
										
									}
								}
								
								{
									objectFolder.push(objectBookmark);
								}
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
		})
	;
	
	jQuery('table').eq(1).find('td').eq(0).find('.cssTreeview').triggerHandler('update');
}

{
	for (var intFor1 = 0; intFor1 < 3; intFor1 += 1) {
		jQuery('table').eq(1).find('td').eq(intFor1 + 1).find('.cssTreeview')
			.data({
				'intColumn': intFor1
			})
			.off('update')
			.on('update', function() {
				return; // TODO: remove
				
				jQuery(this)
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
									
									var objectBookmark = Bookmarks.peek(PreferenceLayout.intItem);
									
									{
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
									}
									
									{
										if (objectBookmark.strType === 'typeBookmark') {
											objectBookmark.strLink = undefined;
											
										} else if (objectBookmark.strType === 'typeSeparator') {
											objectBookmark.objectExtension = undefined;
											
										}
									}
									
									{
										objectFolder.push(objectBookmark);
									}
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
			})
		;
		
		jQuery('table').eq(1).find('td').eq(intFor1 + 1).find('.cssTreeview').triggerHandler('update');
	}
}

{
	// TODO: cursor:move
	// TODO: bookmarks not sortable
	
	for (var intFor1 = 0; intFor1 < 3; intFor1 += 1) {
		jQuery('table').eq(1).find('td').eq(intFor1 + 1).find('.cssTreeview')
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
						
						jQuery('table').eq(1).find('td').find('.cssTreeview').slice(1).each(function(intFor1) {
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