var Treeview = {
	init: function() {
		{
			jQuery.fn.treeview = function(settingsHandle) {
				Treeview.update.call(this, settingsHandle);
				
				return this;
			}
			
			jQuery.fn.treeviewFolder = function(settingsHandle) {
				Treeview.updateFolder.call(this, settingsHandle);
				
				return this;
			}
			
			jQuery.fn.treeviewBookmark = function(settingsHandle) {
				Treeview.updateBookmark.call(this, settingsHandle);
				
				return this;
			}
			
			jQuery.fn.treeviewSeparator = function(settingsHandle) {
				Treeview.updateSeparator.call(this, settingsHandle);
				
				return this;
			}
		}
	},
	
	dispel: function() {
		{
			jQuery.fn.treeview = null;
			
			jQuery.fn.treeviewFolder = null;
			
			jQuery.fn.treeviewBookmark = null;
			
			jQuery.fn.treeviewSeparator = null;
		}
	},
	
	update: function(settingsHandle) {
		{
			if (settingsHandle === 'refresh') {
				settingsHandle = jQuery(this).data('settingsHandle');
			}
		}
		
		{
			jQuery(this)
				.empty()
			;
		}
		
		{
			jQuery(this)
				.data({
					'settingsHandle': settingsHandle
				})
			;
		}
		
		{
			var objectNodes = settingsHandle.functionData.call(this, settingsHandle.intIdent);
			
			for (var intFor1 = 0; intFor1 < objectNodes.length; intFor1 += 1) {
				var objectNode = objectNodes[intFor1];
				
				{
					if (objectNode.strType === 'typeFolder') {
						Treeview.updateFolder.call(this, {
							'functionData': settingsHandle.functionData,
							'functionOpen': settingsHandle.functionOpen,
							'functionClose': settingsHandle.functionClose,
							'objectNode': objectNode
						});
						
					} else if (objectNode.strType === 'typeBookmark') {
						Treeview.updateBookmark.call(this, {
							'functionData': settingsHandle.functionData,
							'functionOpen': settingsHandle.functionOpen,
							'functionClose': settingsHandle.functionClose,
							'objectNode': objectNode
						});
						
					} else if (objectNode.strType === 'typeSeparator') {
						Treeview.updateSeparator.call(this, {
							'functionData': settingsHandle.functionData,
							'functionOpen': settingsHandle.functionOpen,
							'functionClose': settingsHandle.functionClose,
							'objectNode': objectNode
						});
						
					}
				}
			}
		}
	},
	
	updateFolder: function(settingsHandle) {
		jQuery(this)
			.append(jQuery('<div></div>')
				.addClass('cssTreeviewNodeContainer')
				.append(jQuery('<div></div>')
					.addClass('cssTreeviewNode')
					.data({
						'settingsHandle': settingsHandle
					})
					.off('click')
					.on('click', function() {
						var settingsHandle = jQuery(this).data('settingsHandle');
						
						{
							if (jQuery(this).closest('.cssTreeviewNodeContainer').find('.cssTreeviewNodePlaceholder').children().length === 0) {
								{
									jQuery(this).closest('.cssTreeviewNodeContainer').find('.cssTreeviewNodePlaceholder')
										.treeview({
											'intIdent': settingsHandle.objectNode.intIdent,
											'functionData': settingsHandle.functionData,
											'functionOpen': settingsHandle.functionOpen,
											'functionClose': settingsHandle.functionClose
										})
									;
								}
								
								{
									settingsHandle.functionOpen(settingsHandle.objectNode.intIdent);
								}
								
							} else if (jQuery(this).closest('.cssTreeviewNodeContainer').find('.cssTreeviewNodePlaceholder').children().length !== 0) {
								{
									jQuery(this).closest('.cssTreeviewNodeContainer').find('.cssTreeviewNodePlaceholder')
										.empty()
									;
								}
								
								{
									settingsHandle.functionClose(settingsHandle.objectNode.intIdent);
								}
								
							}
						}
					})
					.append(jQuery('<div></div>')
						.addClass('cssTreeviewNodeImage')
						.append(jQuery('<img></img>')
							.attr({
								'src': settingsHandle.objectNode.strImage
							})
						)
					)
					.append(jQuery('<div></div>')
						.addClass('cssTreeviewNodeTitle')
						.text(settingsHandle.objectNode.strTitle)
					)
					.each(function() {
						if (settingsHandle.objectNode.objectExtension !== undefined) {
							jQuery(this)
								.append(jQuery('<div></div>')
									.addClass('cssTreeviewNodeExtension')
									.append(settingsHandle.objectNode.objectExtension)
								)
							;
						}
					})
				)
				.append(jQuery('<div></div>')
					.addClass('cssTreeviewNodePlaceholder')
				)
			)
		;
	},
	
	updateBookmark: function(settingsHandle) {
		jQuery(this)
			.append(jQuery('<a></a>')
				.addClass('cssTreeviewNode')
				.attr({
					'href': settingsHandle.objectNode.strLink
				})
				.append(jQuery('<div></div>')
					.addClass('cssTreeviewNodeImage')
					.append(jQuery('<img></img>')
						.attr({
							'src': settingsHandle.objectNode.strImage
						})
					)
				)
				.append(jQuery('<div></div>')
					.addClass('cssTreeviewNodeTitle')
					.text(settingsHandle.objectNode.strTitle)
				)
				.each(function() {
					if (settingsHandle.objectNode.objectExtension !== undefined) {
						jQuery(this)
							.append(jQuery('<div></div>')
								.addClass('cssTreeviewNodeExtension')
								.append(settingsHandle.objectNode.objectExtension)
							)
						;
					}
				})
			)
		;
	},
	
	updateSeparator: function(settingsHandle) {
		jQuery(this)
			.append(jQuery('<div></div>')
				.addClass('cssTreeviewSeparator')
			)
		;
	}
};
Treeview.init();