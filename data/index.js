'use strict';

var Panel = {
	strConfiguration: '',
	
	init: function() {
		{
			self.port.on('panelShow', Panel.showCallback);
			
			self.port.on('panelHide', Panel.hideCallback);
		}
	},
	
	dispel: function() {
		{
			Panel.strConfiguration = '';
		}
	},
	
	showCallback: function(objectArguments) {
		if (objectArguments === null) {
			return;
		}
		
		{
			if (Panel.strConfiguration === '') {
				{
					jQuery(window.frames)
						.off('click')
						.on('click', function(eventHandle) {
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
									'strOpen': '',
									'strLink': jQuery(eventHandle.target).closest('.cssTreeview_NodeContainer').find('.cssTreeview_Node').attr('href')
								};
								
								{
									if (eventHandle.which === 1) {
										objectArguments.strOpen = 'openOverwrite';
										
									} else if (eventHandle.which === 2) {
										objectArguments.strOpen = 'openTab';
										
									}
								}
								
								{
									Browser.navigate(objectArguments);
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
					
					jQuery('#idSettings_Stylesheet')
						.css({
							'display': 'none'
						})
					;
				}
			}
		}
		
		{
			var strConfiguration = '';
			
			{
				strConfiguration += PreferenceAdvanced.getBoolAutostart() + ';';
				strConfiguration += PreferenceAdvanced.getBoolSearch() + ';';
				strConfiguration += PreferenceAdvanced.getBoolCompact() + ';';
				strConfiguration += PreferenceAdvanced.getBoolState() + ';';
				
				strConfiguration += PreferenceController.getLongTimestamp() + ';';
				
				strConfiguration += String(PreferenceLayout.getStrFirst()) + ';';
				strConfiguration += String(PreferenceLayout.getStrSecond()) + ';';
				strConfiguration += String(PreferenceLayout.getStrThird()) + ';';
				
				strConfiguration += String(PreferenceState.getStrState()) + ';';
				
				strConfiguration += String(PreferenceStylesheet.getStrGeneral()) + ';';
			}
			
			if (Panel.strConfiguration !== strConfiguration) {
				{
					Panel.strConfiguration = strConfiguration;
				}
				
				{
					PreferenceAdvancedObserver.update();
					
					PreferenceControllerObserver.update();
					
					PreferenceLayoutObserver.update();
					
					PreferenceStateObserver.update();
					
					PreferenceStylesheetObserver.update();
				}
			}
		}
	},
	
	hideCallback: function(objectArguments) {
		
	}
};
Panel.init();

var Controller = {
	init: function() {
		
	},
	
	dispel: function() {
		
	}
};
Controller.init();

var Browser = {
	init: function() {
		{
			self.port.on('browserNavigate', Browser.navigateCallback);
		}
	},
	
	dispel: function() {
		
	},
	
	newtab: function(objectArguments) {
		{
			self.port.emit('browserNewtab', objectArguments);
		}
	},
	
	newtabCallback: function(objectArguments) {
		
	},
	
	navigate: function(objectArguments) {
		{
			self.port.emit('browserNavigate', objectArguments);
		}
	},
	
	navigateCallback: function(objectArguments) {
		
	}
};
Browser.init();

var Bookmarks = {
	init: function() {
		{
			self.port.on('bookmarksList', Bookmarks.listCallback);
			
			self.port.on('bookmarksPeek', Bookmarks.peekCallback);
			
			self.port.on('bookmarksFavicon', Bookmarks.faviconCallback);
			
			self.port.on('bookmarksSearch', Bookmarks.searchCallback);
		}
	},
	
	dispel: function() {
		
	},
	
	list: function(objectArguments) {
		{
			self.port.emit('bookmarksList', objectArguments);
		}
	},
	
	listCallback: function(objectArguments) {
		{
			jQuery('#' + objectArguments.strCallback)
				.treeviewData({
					'objectNode': objectArguments.resultHandle
				})
			;
		}
	},
	
	peek: function(objectArguments) {
		{
			self.port.emit('bookmarksPeek', objectArguments);
		}
	},
	
	peekCallback: function(objectArguments) {
		{
			jQuery('#' + objectArguments.strCallback)
				.treeviewData({
					'objectNode': objectArguments.resultHandle
				})
			;
		}
	},
	
	favicon: function(objectArguments) {
		{
			self.port.emit('bookmarksFavicon', objectArguments);
		}
	},
	
	faviconCallback: function(objectArguments) {
		{
			jQuery('#' + objectArguments.strCallback).find('.cssTreeview_NodeImage').find('img')
				.attr({
					'src': objectArguments.strFavicon
				})
			;
		}
	},
	
	search: function(objectArguments) {
		{
			self.port.emit('bookmarksSearch', objectArguments);
		}
	},
	
	searchCallback: function(objectArguments) {
		{
			jQuery('#idGeneral_Search_Output')
				.treeviewData({
					'objectNode': objectArguments.resultHandle
				})
			;
		}
	}
};
Bookmarks.init();

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
								.on('click', function() {
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
												});
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
												});
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

PreferenceAdvancedObserver.addObserver(function() {
	jQuery('#idGeneral_Search').triggerHandler('update');
	
	jQuery('#idSettings_ModalAdvanced_Autostart').triggerHandler('update');
	
	jQuery('#idSettings_ModalAdvanced_Search').triggerHandler('update');
	
	jQuery('#idSettings_ModalAdvanced_Compact').triggerHandler('update');
	
	jQuery('#idSettings_ModalAdvanced_State').triggerHandler('update');
});

PreferenceControllerObserver.addObserver(function() {
	
});

PreferenceLayoutObserver.addObserver(function() {
	jQuery('#idGeneral_Bookmarks_First, #idGeneral_Bookmarks_Second, #idGeneral_Bookmarks_Third').find('.cssTreeview').each(function() {
		jQuery(this).triggerHandler('update');
	});
	
	jQuery('#idSettings_ModalLayout_Available').find('.cssTreeview').each(function() {
		jQuery(this).triggerHandler('update');
	});
	
	jQuery('#idSettings_ModalLayout_First, #idSettings_ModalLayout_Second, #idSettings_ModalLayout_Third').find('.cssTreeview').each(function() {
		jQuery(this).triggerHandler('update');
	});
});

PreferenceStateObserver.addObserver(function() {
	
});

PreferenceStylesheetObserver.addObserver(function() {
	jQuery('#idStylesheet_General').triggerHandler('update');
	
	jQuery('#idSettings_ModalStylesheet_General').triggerHandler('update');
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
	
	if (window.location.hash.substr(1) !== '') {
		{
			jQuery('#idGeneral_Search_Input')
				.val(decodeURIComponent(window.location.hash.substr(1)))
			;
		}
		
		{
			Bookmarks.search({
				'strSearch': window.location.hash.substr(1)
			});
		}
	}
}

{
	jQuery('#idStylesheet_General')
		.off('update')
		.on('update', function() {
			if (String(PreferenceStylesheet.getStrGeneral()) !== '') {
				jQuery(this)
					.text(String(PreferenceStylesheet.getStrGeneral()))
				;
			}
		})
	;
	
	jQuery('#idStylesheet_General').triggerHandler('update');
}

{
	jQuery('#idGeneral_Search')
		.off('update')
		.on('update', function() {
			if (PreferenceAdvanced.getBoolSearch() === true) {
				jQuery(this)
					.css({
						'display': 'block'
					})
				;
				
				
			} else if (PreferenceAdvanced.getBoolSearch() === false) {
				jQuery(this)
					.css({
						'display': 'none'
					})
				;
				
			}
		})
	;
	
	jQuery('#idGeneral_Search').triggerHandler('update');
}

{
	jQuery('#idGeneral_Search_Input')
		.off('input')
		.on('input', function() {
			if (jQuery(this).val() === '' ) {
				window.location.hash = '';
				
			} else if (jQuery(this).val() !== '') {
				window.location.hash = '#' + jQuery(this).val();
				
			}
			
			if (jQuery(this).val().length < 2) {
				jQuery('#idGeneral_Search_Output')
					.treeviewData({
						'objectNode': []
					})
				;
				
			} else if (jQuery(this).val().length >= 2) {
				Bookmarks.search({
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
										Bookmarks.favicon(objectArguments);
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
	
	jQuery('#idGeneral_Search_Output').triggerHandler('update');
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
										if (window.self.options.strType === 'typePanel') {
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
										Bookmarks.peek(objectArguments);
									}
									
								} else if (objectNode.intIdent !== 0) {
									{
										objectArguments.intIdent = objectNode.intIdent;
									}
									
									{
										Bookmarks.list(objectArguments);
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
							
							{
								if (objectNode.strType === 'typeFolder') {
									var objectState = JSON.parse(PreferenceState.getStrState());
									
									{
										if (objectState.hasOwnProperty(objectNode.intIdent) === false) {
											objectState[objectNode.intIdent] = new Date().getTime();
										}
									}
									
									PreferenceState.setStrState(JSON.stringify(objectState));
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
											Bookmarks.favicon(objectArguments);
										}
									}
								}
							}
							
							{
								if (objectNode.strType === 'typeFolder') {
									if (PreferenceAdvanced.getBoolState() === true) {
										if (PreferenceState.intTimestamp === undefined) {
											PreferenceState.intTimestamp = new Date().getTime();
											
											PreferenceState.objectState = JSON.parse(PreferenceState.getStrState());
											
										} else if (PreferenceState.intTimestamp < new Date().getTime() - 1000) {
											PreferenceState.intTimestamp = new Date().getTime();
											
											PreferenceState.objectState = JSON.parse(PreferenceState.getStrState());
											
										}
										
										if (PreferenceState.objectState.hasOwnProperty(objectNode.intIdent) === true) {
											jQuery(this).triggerHandler('click');
										}
									}
								}
							}
						},
						'functionClose': function(objectNode) {
							{
								if (objectNode.strType === 'typeFolder') {
									var objectState = JSON.parse(PreferenceState.getStrState());
									
									{
										if (objectState.hasOwnProperty(objectNode.intIdent) === true) {
											delete objectState[objectNode.intIdent];
										}
									}
									
									PreferenceState.setStrState(JSON.stringify(objectState));
								}
							}
						}
					})
				;
			})
		;
		
		jQuery(this).triggerHandler('update');
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
	jQuery('#idSettings_ModalAdvanced_Autostart')
		.off('click')
		.on('click', function() {
			if (PreferenceAdvanced.getBoolAutostart() === true) {
				PreferenceAdvanced.setBoolAutostart(false);
				
				Browser.newtab({
					'strOverride': ''
				});
				
			} else if (PreferenceAdvanced.getBoolAutostart() === false) {
				PreferenceAdvanced.setBoolAutostart(true);
				
				Browser.newtab({
					'strOverride': 'about:bookrect'
				});
				
			}
		})
		.off('update')
		.on('update', function() {
			if (PreferenceAdvanced.getBoolAutostart() === true) {
				jQuery(this)
					.addClass('btn-primary')
					.removeClass('btn-default')
				;
				
				jQuery(this).find('span')
					.addClass('fa-check-square-o')
					.removeClass('fa-square-o')
				;
				
			} else if (PreferenceAdvanced.getBoolAutostart() === false) {
				jQuery(this)
					.addClass('btn-default')
					.removeClass('btn-primary')
				;
				
				jQuery(this).find('span')
					.addClass('fa-square-o')
					.removeClass('fa-check-square-o')
				;
				
			}
		})
	;
	
	jQuery('#idSettings_ModalAdvanced_Autostart').triggerHandler('update');
}

{
	jQuery('#idSettings_ModalAdvanced_Search')
		.off('click')
		.on('click', function() {
			if (PreferenceAdvanced.getBoolSearch() === true) {
				PreferenceAdvanced.setBoolSearch(false);
				
			} else if (PreferenceAdvanced.getBoolSearch() === false) {
				PreferenceAdvanced.setBoolSearch(true);
				
			}
		})
		.off('update')
		.on('update', function() {
			if (PreferenceAdvanced.getBoolSearch() === true) {
				jQuery(this)
					.addClass('btn-primary')
					.removeClass('btn-default')
				;
				
				jQuery(this).find('span')
					.addClass('fa-check-square-o')
					.removeClass('fa-square-o')
				;
				
			} else if (PreferenceAdvanced.getBoolSearch() === false) {
				jQuery(this)
					.addClass('btn-default')
					.removeClass('btn-primary')
				;
				
				jQuery(this).find('span')
					.addClass('fa-square-o')
					.removeClass('fa-check-square-o')
				;
				
			}
		})
	;
	
	jQuery('#idSettings_ModalAdvanced_Search').triggerHandler('update');
}

{
	jQuery('#idSettings_ModalAdvanced_Compact')
		.off('click')
		.on('click', function() {
			if (PreferenceAdvanced.getBoolCompact() === true) {
				PreferenceAdvanced.setBoolCompact(false);
				
			} else if (PreferenceAdvanced.getBoolCompact() === false) {
				PreferenceAdvanced.setBoolCompact(true);
				
			}
		})
		.off('update')
		.on('update', function() {
			if (PreferenceAdvanced.getBoolCompact() === true) {
				jQuery(this)
					.addClass('btn-primary')
					.removeClass('btn-default')
				;
				
				jQuery(this).find('span')
					.addClass('fa-check-square-o')
					.removeClass('fa-square-o')
				;
				
			} else if (PreferenceAdvanced.getBoolCompact() === false) {
				jQuery(this)
					.addClass('btn-default')
					.removeClass('btn-primary')
				;
				
				jQuery(this).find('span')
					.addClass('fa-square-o')
					.removeClass('fa-check-square-o')
				;
				
			}
		})
	;
	
	jQuery('#idSettings_ModalAdvanced_Compact').triggerHandler('update');
}

{
	jQuery('#idSettings_ModalAdvanced_State')
		.off('click')
		.on('click', function() {
			if (PreferenceAdvanced.getBoolState() === true) {
				PreferenceAdvanced.setBoolState(false);
				
			} else if (PreferenceAdvanced.getBoolState() === false) {
				PreferenceAdvanced.setBoolState(true);
				
			}
		})
		.off('update')
		.on('update', function() {
			if (PreferenceAdvanced.getBoolState() === true) {
				jQuery(this)
					.addClass('btn-primary')
					.removeClass('btn-default')
				;
				
				jQuery(this).find('span')
					.addClass('fa-check-square-o')
					.removeClass('fa-square-o')
				;
				
			} else if (PreferenceAdvanced.getBoolState() === false) {
				jQuery(this)
					.addClass('btn-default')
					.removeClass('btn-primary')
				;
				
				jQuery(this).find('span')
					.addClass('fa-square-o')
					.removeClass('fa-check-square-o')
				;
				
			}
		})
	;
	
	jQuery('#idSettings_ModalAdvanced_State').triggerHandler('update');
}

{
	jQuery('#idSettings_ModalAdvanced_Reset')
		.off('click')
		.on('click', function() {
			{
				PreferenceAdvanced.clear();
			}
			
			{
				window.location.reload();
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
								Bookmarks.list(objectArguments);
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
											Bookmarks.favicon(objectArguments);
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
												var objectFirst = JSON.parse(PreferenceLayout.getStrFirst());
												var objectSecond = JSON.parse(PreferenceLayout.getStrSecond());
												var objectThird = JSON.parse(PreferenceLayout.getStrThird());
												
												{
													objectFirst.push(jQuery(this).closest('.cssTreeview_NodeContainer').data('intIdent'));
												}
												
												PreferenceLayout.setStrFirst(JSON.stringify(objectFirst));
												PreferenceLayout.setStrSecond(JSON.stringify(objectSecond));
												PreferenceLayout.setStrThird(JSON.stringify(objectThird));
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
		
		jQuery(this).triggerHandler('update');
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
								Bookmarks.peek(objectArguments);
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
											Bookmarks.favicon(objectArguments);
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
												var objectFirst = JSON.parse(PreferenceLayout.getStrFirst());
												var objectSecond = JSON.parse(PreferenceLayout.getStrSecond());
												var objectThird = JSON.parse(PreferenceLayout.getStrThird());
												
												if (jQuery(this).closest('.cssTreeview').data('intColumn') === 0) {
													objectFirst.splice(jQuery(this).closest('.cssTreeview_NodeContainer').index(), 1);
													
												} else if (jQuery(this).closest('.cssTreeview').data('intColumn') === 1) {
													objectSecond.splice(jQuery(this).closest('.cssTreeview_NodeContainer').index(), 1);
													
												} else if (jQuery(this).closest('.cssTreeview').data('intColumn') === 2) {
													objectThird.splice(jQuery(this).closest('.cssTreeview_NodeContainer').index(), 1);
													
												}
												
												PreferenceLayout.setStrFirst(JSON.stringify(objectFirst));
												PreferenceLayout.setStrSecond(JSON.stringify(objectSecond));
												PreferenceLayout.setStrThird(JSON.stringify(objectThird));
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
		
		jQuery(this).triggerHandler('update');
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
						var objectFirst = [];
						var objectSecond = [];
						var objectThird = [];
						
						jQuery('#idSettings_ModalLayout_First, #idSettings_ModalLayout_Second, #idSettings_ModalLayout_Third').find('.cssTreeview').each(function(intFor1) {
							jQuery(this).find('.cssTreeview_NodeContainer').each(function() {
								if (intFor1 === 0) {
									objectFirst.push(jQuery(this).data('intIdent'));
									
								} else if (intFor1 === 1) {
									objectSecond.push(jQuery(this).data('intIdent'));
									
								} else if (intFor1 === 2) {
									objectThird.push(jQuery(this).data('intIdent'));
									
								}
							});
						});
						
						PreferenceLayout.setStrFirst(JSON.stringify(objectFirst));
						PreferenceLayout.setStrSecond(JSON.stringify(objectSecond));
						PreferenceLayout.setStrThird(JSON.stringify(objectThird));
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

{
	jQuery('#idSettings_ModalLayout_Reset')
		.off('click')
		.on('click', function() {
			{
				var objectFirst = [];
				var objectSecond = [];
				var objectThird = [];
				
				{ 
					objectFirst = objectFirst.concat(window.self.options.intBookmarks);
				}
				
				PreferenceLayout.setStrFirst(JSON.stringify(objectFirst));
				PreferenceLayout.setStrSecond(JSON.stringify(objectSecond));
				PreferenceLayout.setStrThird(JSON.stringify(objectThird));
			}
			
			{
				window.location.reload();
			}
		})
	;
}

{
	jQuery('#idSettings_Stylesheet')
		.off('click')
		.on('click', function() {
			{
				jQuery('#idSettings_ModalStylesheet')
					.modalShow()
				;
			}
		})
	;
}

{
	jQuery('#idSettings_ModalStylesheet_General')
		.off('input')
		.on('input', function() {
			PreferenceStylesheet.setStrGeneral(jQuery(this).val());
		})
		.off('update')
		.on('update', function() {
			if (String(PreferenceStylesheet.getStrGeneral()) === '') {
				jQuery(this)
					.val(jQuery('#idStylesheet_General').text().replace(new RegExp('(^)([\\s]+)', 'g'), '').replace(new RegExp('\\t\\t\\t', 'g'), ''))
				;
				
			} else if (String(PreferenceStylesheet.getStrGeneral()) !== '') {
				jQuery(this)
					.val(String(PreferenceStylesheet.getStrGeneral()))
				;
				
			}
		})
	;
	
	jQuery('#idSettings_ModalStylesheet_General').triggerHandler('update');
}

{
	jQuery('#idSettings_ModalStylesheet_Reset')
		.off('click')
		.on('click', function() {
			{
				PreferenceStylesheet.clear();
			}
			
			{
				window.location.reload();
			}
		})
	;
}