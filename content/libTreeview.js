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
			
			jQuery.fn.treeviewLink = function(settingsHandle) {
				Treeview.updateLink.call(this, settingsHandle);
				
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
			
			jQuery.fn.treeviewLink = null;
			
			jQuery.fn.treeviewSeparator = null;
		}
	},
	
	update: function(settingsHandle) {
		{
			jQuery(this)
				.empty()
			;
		}
		
		{
			var objectNodes = settingsHandle.functionData(settingsHandle.intIdent);
			
			for (var intFor1 = 0; intFor1 < objectNodes.length; intFor1 += 1) {
				var objectNode = objectNodes[intFor1];
				
				{
					if (objectNode.strType === 'typeFolder') {
						Treeview.updateFolder.call(this, {
							'functionData': settingsHandle.functionData,
							'objectNode': objectNode
						});
						
					} else if (objectNode.strType === 'typeLink') {
						Treeview.updateLink.call(this, {
							'functionData': settingsHandle.functionData,
							'objectNode': objectNode
						});
						
					} else if (objectNode.strType === 'typeSeparator') {
						Treeview.updateSeparator.call(this, {
							'functionData': settingsHandle.functionData,
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
				.addClass('cssTreeNodeContainer')
				.append(jQuery('<div></div>')
					.addClass('cssTreeviewNode')
					.data({
						'settingsHandle': settingsHandle
					})
					.off('mouseenter')
					.on('mouseenter', function() {
						jQuery(this)
							.addClass('cssTreeviewNodeHover')
						;
					})
					.off('mouseleave')
					.on('mouseleave', function() {
						jQuery(this)
							.removeClass('cssTreeviewNodeHover')
						;
					})
					.off('click')
					.on('click', function() {
						var settingsHandle = jQuery(this).data('settingsHandle');
						
						{
							if (jQuery(this).closest('.cssTreeNodeContainer').children('.cssTreeviewNodePlaceholder').children().length === 0) {
								{
									jQuery(this).closest('.cssTreeNodeContainer').children('.cssTreeviewNodePlaceholder')
										.treeview({
											'intIdent': settingsHandle.objectNode.intIdent,
											'functionData': settingsHandle.functionData
										})
									;
								}
								
								{
									settingsHandle.objectNode.functionOpen(settingsHandle.objectNode.intIdent);
								}
								
							} else if (jQuery(this).closest('.cssTreeNodeContainer').children('.cssTreeviewNodePlaceholder').children().length !== 0) {
								{
									jQuery(this).closest('.cssTreeNodeContainer').children('.cssTreeviewNodePlaceholder')
										.empty()
									;
								}
								
								{
									settingsHandle.objectNode.functionClose(settingsHandle.objectNode.intIdent);
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
						if (settingsHandle.objectNode.strExtension !== undefined) {
							jQuery(this)
								.append(jQuery('<div></div>')
									.addClass('cssTreeviewNodeExtension')
									.text(settingsHandle.objectNode.strExtension)
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
	
	updateLink: function(settingsHandle) {
		console.log("updateLink");
		jQuery(this)
			.append(jQuery('<a></a>')
				.addClass('cssTreeviewNode')
				.attr({
					'href': settingsHandle.objectNode.strLink
				})
				.off('mouseenter')
				.on('mouseenter', function() {
					jQuery(this)
						.addClass('cssTreeviewNodeHover')
					;
				})
				.off('mouseleave')
				.on('mouseleave', function() {
					jQuery(this)
						.removeClass('cssTreeviewNodeHover')
					;
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
					if (settingsHandle.objectNode.strExtension !== undefined) {
						jQuery(this)
							.append(jQuery('<div></div>')
								.addClass('cssTreeviewNodeExtension')
								.text(settingsHandle.objectNode.strExtension)
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