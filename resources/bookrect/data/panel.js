'use strict';

self.port.on('eventShow', function(objectEvent) {
	
});

self.port.on('eventHide', function(objectEvent) {
	
});

jQuery(document).ready(function() {
	{
		jQuery(window)
			.off('click')
			.on('click', function(eventHandle) {
				if (jQuery(eventHandle.target).closest('a').size() === 0) {
					return;
				}
				
				{
					eventHandle.stopPropagation();
					
					eventHandle.preventDefault();
				}
				
				{
					if (eventHandle.which === 1) {
						self.port.emit('eventNavigate', {
							'strLink': jQuery(eventHandle.target).closest('a').attr('href')
						});
						
					} else if (eventHandle.which === 2) {
						self.port.emit('eventOpen', {
							'strLink': jQuery(eventHandle.target).closest('a').attr('href')
						});
						
					}
				}
			})
		;
	}
});