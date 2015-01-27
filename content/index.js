'use strict';

{
	var windowHandle = window
		.QueryInterface(Components.interfaces.nsIInterfaceRequestor)
	    .getInterface(Components.interfaces.nsIWebNavigation)
	    .QueryInterface(Components.interfaces.nsIDocShellTreeItem)
	    .rootTreeItem
	    .QueryInterface(Components.interfaces.nsIInterfaceRequestor)
	    .getInterface(Components.interfaces.nsIDOMWindow)
	;
	
	if (windowHandle !== undefined) {
		if (windowHandle.gURLBar !== undefined) {
			windowHandle.gURLBar.focus();
			windowHandle.gURLBar.select();
		}
	}
}

jQuery(document).ready(function() {
	/*
	{
		jQuery('#idIndex_Tree')
			.jstree({
				'core': {
					'data': function(parentHandle, callbackHandle) {
						var objectData = [];
						
						{
							var objectBookmarks = [];
							
							if (parentHandle.id === '#') {
								objectBookmarks = Bookmarks.updateEnumerate(0);
								
							} else if (parentHandle.id !== '#') {
								objectBookmarks = Bookmarks.updateEnumerate(parseInt(parentHandle.id, 10));
								
							}
							
							for (var intFor1 = 0; intFor1 < objectBookmarks.length; intFor1 += 1) {
								var objectBookmark = objectBookmarks[intFor1];
								
								{
									var strIdent = String(objectBookmark.intIdent);
									var strParent = String(objectBookmark.intParent);
									
									if (strParent === '0') {
										strParent = '#';
									}
									
									if (objectBookmark.strType === 'typeFolder') {
										objectData.push({
											'id': strIdent,
											'parent': strParent,
											'text': objectBookmark.strTitle,
											'icon': 'chrome://BookRect/content/images/treeFolder.png',
											'children': true
										});
										
									} else if (objectBookmark.strType === 'typeBookmark') {
										objectData.push({
											'id': strIdent,
											'parent': strParent,
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
					},
					'check_callback': false,
					'animation': false,
					'themes': { }
				},
				'plugins': []
			})
		;
	}
	*/
	
	{
		var strLayout = JSON.parse(PreferenceSource.getStrLayout());
		
		for (var intFor1 = 0; intFor1 < strLayout.length; intFor1 += 1) {
			for (var intFor2 = 0; intFor2 < strLayout[intFor1].length; intFor2 += 1) {
				jQuery('li[name="' + strLayout[intFor1][intFor2] + '"]')
					.detach()
					.appendTo(jQuery('#idIndex_ModalConfigure').find('ol').eq(intFor1))
				;
			}
		}
	}
	
	{
		jQuery('#idIndex_ModalConfigure').find('ol')
			.sortable({
				'group': 'Index_ModalConfigure',
				'placeholder': '<hr></hr>',
				'onDrop': function(itemHandle, containerHandle, functionSuper) {
					{
						functionSuper(itemHandle, containerHandle);
					}
					
					{
						var strLayout = [ [], [], [] ];
						
						jQuery('#idIndex_ModalConfigure').find('ol').each(function(intFor1) {
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
		Modal.updateShow('#idIndex_ModalConfigure');
	}
});

/*
'intIdent': nodeHandle.itemId,
'intTimestamp' nodeHandle.lastModified,
'intParent': nodeParent.itemId,
'strTitle': nodeHandle.title,
'strLink': nodeHandle.uri,
'strFavicon': nodeHandle.icon,
'strTags': nodeHandle.tags,
'intAccesscount': nodeHandle.accessCount
*/