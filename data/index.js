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
		if (objectArguments === null) {
			return;
		}
		
		{
			PreferenceAdvancedObserver.update();
			
			PreferenceLayoutObserver.update();
		}
		
		{
			jQuery(window.frames)
				.off('click')
				.on('click', function(eventHandle) {
					console.log('click');
					if (eventHandle.which !== 1) {
						if (eventHandle.which !== 2) {
							return;
						}
					}
					
					if (jQuery(eventHandle.target).closest('.cssTreeview_NodeContainer').size() === 0) {
						return;
						
					} else if (jQuery(eventHandle.target).closest('.cssTreeview_NodeContainer').find('.cssTreeview_Node').get(0).tagName.toLowerCase() !== 'a') {
						return;
						
					}
					
					{
						eventHandle.stopPropagation();
						
						eventHandle.preventDefault();
					}
					
					{
						var objectArguments = {
							'strTab': '',
							'strLink': jQuery(eventHandle.target).closest('.cssTreeview_NodeContainer').find('.cssTreeview_Node').attr('href')
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
		}
		
		{
			jQuery('#idSettings_Advanced')
				.css({
					'display': 'none'
				})
			;
			
			jQuery('#idSettings_Layout')
				.css({
					'display': 'none'
				})
			;
		}
	},
	
	hideCallback: function(objectArguments) {
		
	}
};
Panel.init();

var Treeview = {
	init: function() {
		{
			jQuery.fn.treeview = function(objectArguments) {
				{
					objectArguments = jQuery.extend({
						'intIdent': 0,
						'functionOpen': function(objectNode) {
							
						},
						'functionData': function(objectNode) {
							
						},
						'functionClose': function(objectNode) {
							
						}
					}, objectArguments);
				}
				
				{
					jQuery(this)
						.empty()
					;
				}
				
				{
					jQuery(this)
						.data(objectArguments)
					;
				}
				
				{
					jQuery(this).closest('.cssTreeview').data('functionOpen').call(jQuery(this), {
						'intIdent': objectArguments.intIdent
					});
				}
				
				return this;
			};
		}
		
		{
			jQuery.fn.treeviewData = function(objectArguments) {
				{
					objectArguments = jQuery.extend({
						'objectNode': []
					}, objectArguments);
				}
				
				{
					jQuery(this)
						.empty()
					;
				}
				
				{
					for (var intFor1 = 0; intFor1 < objectArguments.objectNode.length; intFor1 += 1) {
						var objectNode = objectArguments.objectNode[intFor1];
						
						{
							if (objectNode.strType === 'typeFolder') {
								jQuery(this)
									.treeviewFolder({
										'objectNode': objectNode
									})
								;
								
							} else if (objectNode.strType === 'typeBookmark') {
								jQuery(this)
									.treeviewBookmark({
										'objectNode': objectNode
									})
								;
								
							}
						}
						
						{
							jQuery(this).find('.cssTreeview_Node').last()
								.each(function() {
									jQuery(this).closest('.cssTreeview').data('functionData').call(jQuery(this), objectNode);
								})
							;
						}
					}
				}
				
				return this;
			};
		}
		
		{
			jQuery.fn.treeviewFolder = function(objectArguments) {
				{
					objectArguments = jQuery.extend({
						'objectNode': {}
					}, objectArguments);
				}
				
				{
					jQuery(this)
						.append(jQuery('<div></div>')
							.addClass('cssTreeview_NodeContainer')
							.data({
								'intIdent': objectArguments.objectNode.intIdent,
								'strType': objectArguments.objectNode.strType,
								'strImage': objectArguments.objectNode.strImage,
								'strTitle': objectArguments.objectNode.strTitle,
								'strLink': objectArguments.objectNode.strLink
							})
							.append(jQuery('<div></div>')
								.addClass('cssTreeview_Node')
								.off('click')
								.on('click', function(eventHandle) {
									{
										if (jQuery(this).closest('.cssTreeview_NodeContainer').find('.cssTreeview_NodePlaceholder').children().size() === 0) {
											{
												jQuery(this).closest('.cssTreeview_NodeContainer').find('.cssTreeview_NodePlaceholder')
													.treeview({
														'intIdent': jQuery(this).closest('.cssTreeview_NodeContainer').data('intIdent')
													})
												;
											}
											
											{
												jQuery(this).closest('.cssTreeview').data('functionOpen').call(jQuery(this).closest('.cssTreeview_NodeContainer').find('.cssTreeview_NodePlaceholder'), {
													'intIdent': jQuery(this).closest('.cssTreeview_NodeContainer').data('intIdent'),
													'strType': jQuery(this).closest('.cssTreeview_NodeContainer').data('strType'),
													'strImage': jQuery(this).closest('.cssTreeview_NodeContainer').data('strImage'),
													'strTitle': jQuery(this).closest('.cssTreeview_NodeContainer').data('strTitle'),
													'strLink': jQuery(this).closest('.cssTreeview_NodeContainer').data('strLink')
												}, eventHandle);
											}
											
										} else if (jQuery(this).closest('.cssTreeview_NodeContainer').find('.cssTreeview_NodePlaceholder').children().size() !== 0) {
											{
												jQuery(this).closest('.cssTreeview_NodeContainer').find('.cssTreeview_NodePlaceholder')
													.empty()
												;
											}
											
											{
												jQuery(this).closest('.cssTreeview').data('functionClose').call(jQuery(this).closest('.cssTreeview_NodeContainer').find('.cssTreeview_NodePlaceholder'), {
													'intIdent': jQuery(this).closest('.cssTreeview_NodeContainer').data('intIdent'),
													'strType': jQuery(this).closest('.cssTreeview_NodeContainer').data('strType'),
													'strImage': jQuery(this).closest('.cssTreeview_NodeContainer').data('strImage'),
													'strTitle': jQuery(this).closest('.cssTreeview_NodeContainer').data('strTitle'),
													'strLink': jQuery(this).closest('.cssTreeview_NodeContainer').data('strLink')
												}, eventHandle);
											}
											
										}
									}
								})
								.append(jQuery('<div></div>')
									.addClass('cssTreeview_NodeImage')
									.append(jQuery('<img></img>')
										.attr({
											'src': objectArguments.objectNode.strImage
										})
									)
								)
								.append(jQuery('<div></div>')
									.addClass('cssTreeview_NodeTitle')
									.text(objectArguments.objectNode.strTitle)
								)
							)
							.append(jQuery('<div></div>')
								.addClass('cssTreeview_NodePlaceholder')
							)
						)
					;
				}
				
				return this;
			}
		}
		
		{
			jQuery.fn.treeviewBookmark = function(objectArguments) {
				{
					objectArguments = jQuery.extend({
						'objectNode': {}
					}, objectArguments);
				}
				
				{
					jQuery(this)
						.append(jQuery('<div></div>')
							.addClass('cssTreeview_NodeContainer')
							.data({
								'intIdent': objectArguments.objectNode.intIdent,
								'strType': objectArguments.objectNode.strType,
								'strImage': objectArguments.objectNode.strImage,
								'strTitle': objectArguments.objectNode.strTitle,
								'strLink': objectArguments.objectNode.strLink
							})
							.append(jQuery('<a></a>')
								.addClass('cssTreeview_Node')
								.attr({
									'href': objectArguments.objectNode.strLink,
									'title': objectArguments.objectNode.strTitle
								})
								.append(jQuery('<div></div>')
									.addClass('cssTreeview_NodeImage')
									.append(jQuery('<img></img>')
										.attr({
											'src': objectArguments.objectNode.strImage
										})
									)
								)
								.append(jQuery('<div></div>')
									.addClass('cssTreeview_NodeTitle')
									.text(objectArguments.objectNode.strTitle)
								)
							)
						)
					;
				}
				
				return this;
			}
		}
	},
	
	dispel: function() {
		{
			jQuery.fn.treeview = null;
		}
		
		{
			jQuery.fn.treeviewData = null;
		}
		
		{
			jQuery.fn.treeviewFolder = null;
		}
		
		{
			jQuery.fn.treeviewBookmark = null;
		}
	}
};
Treeview.init();

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
	jQuery('#' + objectArguments.strCallback).find('.cssTreeview_NodeImage').find('img')
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
										if (jQuery(this).data('intColumn') === 0) {
											objectArguments.intIdent = JSON.parse(PreferenceLayout.getStrFirst());
											
										} else if (jQuery(this).data('intColumn') === 1) {
											objectArguments.intIdent = JSON.parse(PreferenceLayout.getStrSecond());
											
										} else if (jQuery(this).data('intColumn') === 2) {
											objectArguments.intIdent = JSON.parse(PreferenceLayout.getStrThird());
											
										}
									}
									
									{
										if (window.self.options !== null) {
											if (PreferenceAdvanced.getBoolCompact() === true) {
												{
													objectArguments.intIdent = [];
												}
												
												{
													if (jQuery(this).data('intColumn') === 0) {
														objectArguments.intIdent = objectArguments.intIdent.concat(JSON.parse(PreferenceLayout.getStrFirst()));
														objectArguments.intIdent = objectArguments.intIdent.concat(JSON.parse(PreferenceLayout.getStrSecond()));
														objectArguments.intIdent = objectArguments.intIdent.concat(JSON.parse(PreferenceLayout.getStrThird()));
													}
												}
											}
										}
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
												var intFirst = JSON.parse(PreferenceLayout.getStrFirst());
												var intSecond = JSON.parse(PreferenceLayout.getStrSecond());
												var intThird = JSON.parse(PreferenceLayout.getStrThird());
												
												{
													intFirst.push(jQuery(this).closest('.cssTreeview_NodeContainer').data('intIdent'));
												}
												
												PreferenceLayout.setStrFirst(JSON.stringify(intFirst));
												PreferenceLayout.setStrSecond(JSON.stringify(intSecond));
												PreferenceLayout.setStrThird(JSON.stringify(intThird));
											}
											
											{
												PreferenceLayoutObserver.boolEnabled = true;
												
												PreferenceLayoutObserver.update();
											}
										})
									)
								;
							}
						},
						'functionClose': function(objectNode) {
							
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
								if (jQuery(this).data('intColumn') === 0) {
									objectArguments.intIdent = JSON.parse(PreferenceLayout.getStrFirst());
									
								} else if (jQuery(this).data('intColumn') === 1) {
									objectArguments.intIdent = JSON.parse(PreferenceLayout.getStrSecond());
									
								} else if (jQuery(this).data('intColumn') === 2) {
									objectArguments.intIdent = JSON.parse(PreferenceLayout.getStrThird());
									
								}
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
												PreferenceLayoutObserver.boolEnabled = false;
											}
											
											{
												var intFirst = JSON.parse(PreferenceLayout.getStrFirst());
												var intSecond = JSON.parse(PreferenceLayout.getStrSecond());
												var intThird = JSON.parse(PreferenceLayout.getStrThird());
												
												if (jQuery(this).closest('.cssTreeview').data('intColumn') === 0) {
													intFirst.splice(jQuery(this).closest('.cssTreeview_NodeContainer').index(), 1);
													
												} else if (jQuery(this).closest('.cssTreeview').data('intColumn') === 1) {
													intSecond.splice(jQuery(this).closest('.cssTreeview_NodeContainer').index(), 1);
													
												} else if (jQuery(this).closest('.cssTreeview').data('intColumn') === 2) {
													intThird.splice(jQuery(this).closest('.cssTreeview_NodeContainer').index(), 1);
													
												}
												
												PreferenceLayout.setStrFirst(JSON.stringify(intFirst));
												PreferenceLayout.setStrSecond(JSON.stringify(intSecond));
												PreferenceLayout.setStrThird(JSON.stringify(intThird));
											}
											
											{
												PreferenceLayoutObserver.boolEnabled = true;
												
												PreferenceLayoutObserver.update();
											}
										})
									)
								;
							}
						},
						'functionClose': function(objectNode) {
							
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
				'itemSelector': '.cssTreeview_NodeContainer',
				'handle': '.cssTreeview_NodeContainer',
				'placeholder': '<hr></hr>',
				'onDrop': function(itemHandle, containerHandle, functionSuper) {
					{
						functionSuper(itemHandle, containerHandle);
					}
					
					{
						PreferenceLayoutObserver.boolEnabled = false;
					}
					
					{
						var intFirst = [];
						var intSecond = [];
						var intThird = [];
						
						jQuery('#idSettings_ModalLayout_First, #idSettings_ModalLayout_Second, #idSettings_ModalLayout_Third').find('.cssTreeview').each(function(intFor1) {
							jQuery(this).find('.cssTreeview_NodeContainer').each(function() {
								if (intFor1 === 0) {
									intFirst.push(jQuery(this).data('intIdent'));
									
								} else if (intFor1 === 1) {
									intSecond.push(jQuery(this).data('intIdent'));
									
								} else if (intFor1 === 2) {
									intThird.push(jQuery(this).data('intIdent'));
									
								}
							});
						});
						
						PreferenceLayout.setStrFirst(JSON.stringify(intFirst));
						PreferenceLayout.setStrSecond(JSON.stringify(intSecond));
						PreferenceLayout.setStrThird(JSON.stringify(intThird));
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