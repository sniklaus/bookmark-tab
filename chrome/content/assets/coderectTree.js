var CoderectTree = {
	init: function(jqContainer, functionLoad) {
		jqContainer.empty();
		
		CoderectTree.load(jqContainer, functionLoad, null);
	},
	
	load: function(jqContainer, functionLoad, objectNodeParent) {
		var objectFolder = functionLoad(objectNodeParent);
		
		for (var intFor1 = 0; intFor1 < objectFolder.length; intFor1 += 1) {
			var jqNode = null;
			
			if (objectFolder[intFor1].main.strHref) {
				jqNode = CoderectTree.createNodeHref(functionLoad, objectFolder[intFor1])
				
			} else if (!objectFolder[intFor1].main.strHref) {
				jqNode = CoderectTree.createNode(functionLoad, objectFolder[intFor1])
				
			}
			
			if (objectFolder[intFor1].folder) {
				var jqFolderPlaceholder = jQuery('<div></div>')
					.addClass(objectFolder[intFor1].folder.strClassPlaceholder)
				;
				
				jqContainer
					.append(jQuery('<div></div>')
						.addClass(objectFolder[intFor1].folder.strClassContainer)
						.append(jqNode)
						.append(jQuery('<div></div>')
							.addClass(objectFolder[intFor1].folder.strClassPlaceholder)
						)
					)
				;
				
				if (objectFolder[intFor1].folder.strStatus === 'statusOpened') {
					var jqFolderPlaceholder = jqNode.closest('.' + objectFolder[intFor1].folder.strClassContainer).children('.' + objectFolder[intFor1].folder.strClassPlaceholder);
					
					CoderectTree.load(jqFolderPlaceholder, functionLoad, objectFolder[intFor1].tree.objectNode);
				}
				
			} else if (!objectFolder[intFor1].folder) {
				jqContainer
					.append(jqNode)
				;
				
			}
		}
	},
	
	createNode: function(functionLoad, objectFolder) {
		var jqNode = jQuery('<div></div>')
			.addClass(objectFolder.main.strClass)
			.hover(
				function() {
					jQuery(this)
						.addClass(objectFolder.main.strClassHover)
					;
				},
				function() {
					jQuery(this)
						.removeClass(objectFolder.main.strClassHover)
					;
				}
			)
			.data({
				'functionLoad': functionLoad,
				'objectFolder': objectFolder
			})
			.off('click')
			.on('click', function() {
				var functionLoad = jQuery(this).data('functionLoad');
				var objectFolder = jQuery(this).data('objectFolder');
				
				if (objectFolder.main.functionClick) {
					objectFolder.main.functionClick(objectFolder.tree.objectNode);
				}
				
				if (objectFolder.folder) {
					var jqFolderPlaceholder = jQuery(this).closest('.' + objectFolder.folder.strClassContainer).children('.' + objectFolder.folder.strClassPlaceholder);
					
					if (jqFolderPlaceholder.children().length === 0) {
						CoderectTree.load(jqFolderPlaceholder, functionLoad, objectFolder.tree.objectNode);
						
						objectFolder.folder.functionStatus(objectFolder.tree.objectNode, 'statusOpened');
						
					} else if (jqFolderPlaceholder.children().length !== 0) {
						jqFolderPlaceholder.empty();
						
						objectFolder.folder.functionStatus(objectFolder.tree.objectNode, 'statusClosed');
						
					}
				}
			})
			.append(jQuery('<div></div>')
				.addClass(objectFolder.image.strClass)
				.append(jQuery('<img></img>')
					.attr({
						'src': objectFolder.image.strSrc,
						'width': objectFolder.image.intWidth,
						'height': objectFolder.image.intHeight,
						'border': objectFolder.image.intBorder
					})
				)
			)
			.append(jQuery('<div></div>')
				.addClass(objectFolder.title.strClass)
				.text(objectFolder.title.strText)
			)
		;
		
		if (objectFolder.extension) {
			jqNode
				.append(jQuery('<div></div>')
					.addClass(objectFolder.extension.strClass)
					.text(objectFolder.extension.strText)
				)
			;
		}
		
		return jqNode;
	},
	
	createNodeHref: function(functionLoad, objectFolder) {
		var jqNode = jQuery('<a></a>')
			.addClass(objectFolder.main.strClass)
			.attr({
				'href': objectFolder.main.strHref
			})
			.hover(
				function() {
					jQuery(this)
						.addClass(objectFolder.main.strClassHover)
					;
				},
				function() {
					jQuery(this)
						.removeClass(objectFolder.main.strClassHover)
					;
				}
			)
			.append(jQuery('<div></div>')
				.addClass(objectFolder.image.strClass)
				.append(jQuery('<img></img>')
					.attr({
						'src': objectFolder.image.strSrc,
						'width': objectFolder.image.intWidth,
						'height': objectFolder.image.intHeight,
						'border': objectFolder.image.intBorder
					})
				)
			)
			.append(jQuery('<div></div>')
				.addClass(objectFolder.title.strClass)
				.text(objectFolder.title.strText)
			)
		;
		
		if (objectFolder.extension) {
			jqNode
				.append(jQuery('<div></div>')
					.addClass(objectFolder.extension.strClass)
					.text(objectFolder.extension.strText)
				)
			;
		}
		
		return jqNode;
	}
};