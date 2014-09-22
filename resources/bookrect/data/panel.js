'use strict';

self.port.on('eventShow', function() {
	
});

self.port.on('eventHide', function() {
	
});

jQuery(document).ready(function() {
	jQuery(window)
		.off('click')
		.on('click', function(eventHandle) {
			{
				if (jQuery(eventHandle.target).closest('a').size() !== 0) {
					{
						eventHandle.stopPropagation();
						
						eventHandle.preventDefault();
					}
					
					{
						if (eventHandle.which === 1) {
							self.port.emit('eventClickLeft', jQuery(eventHandle.target).closest('a').attr('href'));
							
						} else if (eventHandle.which === 2) {
							self.port.emit('eventClickMiddle', jQuery(eventHandle.target).closest('a').attr('href'));
							
						}
					}
				}
			}
		})
	;
});