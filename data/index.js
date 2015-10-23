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

self.port.on('bookmarksFavicon', function(objectArguments) {
	jQuery('#' + objectArguments.strCallback).find('.cssTreeviewNodeImage').find('img')
		.attr({
			'src': objectArguments.strFavicon
		})
	;
});

self.port.on('bookmarksSearch', function(objectArguments) {
	jQuery('#idGeneral_Search_Output')
		.treeviewData({
			'objectNode': objectArguments.resultHandle
		})
	;
});

PreferenceAdvancedObserver.addObserver(function() {
	
});

PreferenceLayoutObserver.addObserver(function() {
	jQuery('#idGeneral_Bookmarks_First, #idGeneral_Bookmarks_Second, #idGeneral_Bookmarks_Third').find('.cssTreeview').each(function() {
		jQuery(this)
			.triggerHandler('update')
		;
	});
	
	jQuery('#idSettings_ModalLayout_Available').find('.cssTreeview').each(function() {
		jQuery(this)
			.triggerHandler('update')
		;
	});
	
	jQuery('#idSettings_ModalLayout_First, #idSettings_ModalLayout_Second, #idSettings_ModalLayout_Third').find('.cssTreeview').each(function() {
		jQuery(this)
			.triggerHandler('update')
		;
	});
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
	if (PreferenceAdvanced.getBoolSearch() === false) {
		jQuery('#idGeneral_Search')
			.css({
				'display': 'none'
			})
		;
	}
}

{
	jQuery('#idGeneral_Search_Input')
		.off('input')
		.on('input', function() {
			if (jQuery(this).val().length < 2) {
				jQuery('#idGeneral_Search_Output')
					.treeviewData({
						'objectNode': []
					})
				;
				
			} else if (jQuery(this).val().length >= 2) {
				self.port.emit('bookmarksSearch', {
					'strSearch': jQuery(this).val()
				});
				
			}
		})
	;
}

{
	jQuery('#idGeneral_Search_Output')
		.off('update')
		.on('update', function() {
			jQuery(this)
				.treeview({
					'intIdent': 0,
					'functionOpen': function(objectNode) {
						
					},
					'functionData': function(objectNode) {
						{
							if (objectNode.strType === 'typeBookmark') {
								if (objectNode.strImage === 'chrome://bookrect/content/images/bookmark.png') {
									var objectArguments = {
										'strCallback': '',
										'strLink': ''
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
										objectArguments.strLink = objectNode.strLink;
									}
									
									{
										self.port.emit('bookmarksFavicon', objectArguments);
									}
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
	
	jQuery('#idGeneral_Search_Output')
		.triggerHandler('update')
	;
}

{
	jQuery('#idGeneral_Bookmarks_First, #idGeneral_Bookmarks_Second, #idGeneral_Bookmarks_Third').find('.cssTreeview').each(function(intFor1) {
		jQuery(this)
			.data({
				'intColumn': intFor1
			})
			.off('update')
			.on('update', function() {
				jQuery(this)
					.treeview({
						'intIdent': 0,
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
									
									{
										self.port.emit('bookmarksPeek', objectArguments);
									}
									
								} else if (objectNode.intIdent !== 0) {
									{
										objectArguments.intIdent = objectNode.intIdent;
									}
									
									{
										self.port.emit('bookmarksList', objectArguments);
									}
									
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
						'functionData': function(objectNode) {
							{
								if (objectNode.strType === 'typeBookmark') {
									if (objectNode.strImage === 'chrome://bookrect/content/images/bookmark.png') {
										var objectArguments = {
											'strCallback': '',
											'strLink': ''
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
											objectArguments.strLink = objectNode.strLink;
										}
										
										{
											self.port.emit('bookmarksFavicon', objectArguments);
										}
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
		
		jQuery(this)
			.triggerHandler('update')
		;
	});
}

{
	jQuery('#idSettings_Advanced')
		.off('click')
		.on('click', function() {
			{
				jQuery('#idSettings_ModalAdvanced')
					.modalShow()
				;
			}
		})
	;
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
	jQuery('#idSettings_ModalLayout_Available').find('.cssTreeview').each(function() {
		jQuery(this)
			.off('update')
			.on('update', function() {
				jQuery(this)
					.treeview({
						'intIdent': 0,
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
								objectArguments.intIdent = objectNode.intIdent;
							}
							
							{
								self.port.emit('bookmarksList', objectArguments);
							}
						},
						'functionData': function(objectNode) {
							{
								if (objectNode.strType === 'typeBookmark') {
									if (objectNode.strImage === 'chrome://bookrect/content/images/bookmark.png') {
										var objectArguments = {
											'strCallback': '',
											'strLink': ''
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
											objectArguments.strLink = objectNode.strLink;
										}
										
										{
											self.port.emit('bookmarksFavicon', objectArguments);
										}
									}
								}
							}
							
							{
								if (objectNode.strType === 'typeBookmark') {
									jQuery(this)
										.attr({
											'href': '#'
										})
									;
								}
							}
							
							{
								if (objectNode.strType !== 'typeSeparator') {
									jQuery(this)
										.append(jQuery('<div></div>')
											.addClass('fa')
											.addClass('fa-plus')
											.off('click')
											.on('click', function(eventHandle) {
												{
													eventHandle.stopPropagation();
													
													eventHandle.preventDefault();
												}
												
												{
													PreferenceLayoutObserver.boolEnabled = false;
												}
												
												{
													PreferenceLayout.acquire();
													
													PreferenceLayout.selectOpen(
														'SELECT * ' +
														'FROM   PreferenceLayout ' +
														'WHERE  intItem = :PARAM0 ',
														[ String(jQuery(this).closest('.cssTreeviewNodeContainer').data('intIdent')) ]
													);
													
													PreferenceLayout.selectNext();
													
													if (PreferenceLayout.intIdent !== 0) {
														PreferenceLayout.intIdent = PreferenceLayout.intIdent;
														PreferenceLayout.intColumn = PreferenceLayout.intColumn;
														PreferenceLayout.intPosition = PreferenceLayout.intPosition;
														PreferenceLayout.intItem = PreferenceLayout.intItem;
														
														PreferenceLayout.remove();
													}
													
													PreferenceLayout.selectClose();
													
													PreferenceLayout.release();
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
														PreferenceLayout.intItem = jQuery(this).closest('.cssTreeviewNodeContainer').data('intIdent');
														
														PreferenceLayout.create();
														
													} else if (PreferenceLayout.intIdent !== 0) {
														PreferenceLayout.intIdent = 0;
														PreferenceLayout.intColumn = 0;
														PreferenceLayout.intPosition = PreferenceLayout.intPosition + 1;
														PreferenceLayout.intItem = jQuery(this).closest('.cssTreeviewNodeContainer').data('intIdent');
														
														PreferenceLayout.create();
														
													}
													
													PreferenceLayout.selectClose();
													
													PreferenceLayout.release();
												}
												
												{
													PreferenceLayoutObserver.boolEnabled = true;
													
													PreferenceLayoutObserver.update();
												}
											})
										)
									;
								}
							}
						},
						'functionClose': function(objectNode) {
							
						},
						'functionClick': function(objectNode, eventHandle) {
							
						}
					})
				;
			})
		;
		
		jQuery(this)
			.triggerHandler('update')
		;
	});
	
	jQuery('#idSettings_ModalLayout_First, #idSettings_ModalLayout_Second, #idSettings_ModalLayout_Third').find('.cssTreeview').each(function(intFor1) {
		jQuery(this)
			.data({
				'intColumn': intFor1
			})
			.off('update')
			.on('update', function() {
				jQuery(this)
					.treeview({
						'intIdent': 0,
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
								objectArguments.intIdent = [];
							}
							
							{
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
							
							{
								self.port.emit('bookmarksPeek', objectArguments);
							}
						},
						'functionData': function(objectNode) {
							{
								if (objectNode.strType === 'typeBookmark') {
									if (objectNode.strImage === 'chrome://bookrect/content/images/bookmark.png') {
										var objectArguments = {
											'strCallback': '',
											'strLink': ''
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
											objectArguments.strLink = objectNode.strLink;
										}
										
										{
											self.port.emit('bookmarksFavicon', objectArguments);
										}
									}
								}
							}
							
							{
								if (objectNode.strType === 'typeFolder') {
									jQuery(this)
										.off('click')
									;
									
								} else if (objectNode.strType === 'typeBookmark') {
									jQuery(this)
										.attr({
											'href': '#'
										})
									;
									
								}
							}
							
							{
								if (objectNode.strType !== 'typeSeparator') {
									jQuery(this)
										.append(jQuery('<div></div>')
											.addClass('fa')
											.addClass('fa-minus')
											.off('click')
											.on('click', function(eventHandle) {
												{
													eventHandle.stopPropagation();
													
													eventHandle.preventDefault();
												}
												
												{
													PreferenceLayout.acquire();
													
													PreferenceLayout.selectOpen(
														'SELECT * ' +
														'FROM   PreferenceLayout ' +
														'WHERE  intItem = :PARAM0 ',
														[ String(jQuery(this).closest('.cssTreeviewNodeContainer').data('intIdent')) ]
													);
													
													PreferenceLayout.selectNext();
													
													if (PreferenceLayout.intIdent !== 0) {
														PreferenceLayout.intIdent = PreferenceLayout.intIdent;
														PreferenceLayout.intColumn = PreferenceLayout.intColumn;
														PreferenceLayout.intPosition = PreferenceLayout.intPosition;
														PreferenceLayout.intItem = PreferenceLayout.intItem;
														
														PreferenceLayout.remove();
													}
													
													PreferenceLayout.selectClose();
													
													PreferenceLayout.release();
												}
											})
										)
									;
								}
							}
						},
						'functionClose': function(objectNode) {
							
						},
						'functionClick': function(objectNode, eventHandle) {
							
						}
					})
				;
			})
		;
		
		jQuery(this)
			.triggerHandler('update')
		;
	});
	
	jQuery('#idSettings_ModalLayout_First, #idSettings_ModalLayout_Second, #idSettings_ModalLayout_Third').find('.cssTreeview').each(function() {
		jQuery(this)
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
						
						jQuery('#idSettings_ModalLayout_First, #idSettings_ModalLayout_Second, #idSettings_ModalLayout_Third').find('.cssTreeview').each(function(intFor1) {
							jQuery(this).find('.cssTreeviewNodeContainer').each(function(intFor2) {
								PreferenceLayout.intIdent = 0;
								PreferenceLayout.intColumn = intFor1;
								PreferenceLayout.intPosition = intFor2;
								PreferenceLayout.intItem = jQuery(this).data('intIdent');
								
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
	});
}