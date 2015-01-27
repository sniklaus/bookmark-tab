'use strict';

var Modal = {
	init: function() {
		
	},
	
	dispel: function() {
		
	},
	
	updateShow: function(strModal) {
		{
			jQuery(strModal)
				.css({
					'display': 'block',
					'margin': (-0.5 * jQuery(strModal).outerHeight(false)) + 'px 0px 0px ' + (-0.5 * jQuery(strModal).outerWidth(false)) + 'px'
				})
			;
			
			jQuery(strModal).prev()
				.css({
					'display': 'block'
				})
			;
		}
		
		{
			jQuery(strModal).prev()
				.off('click')
				.on('click', function() {
					{
						Modal.updateHide(strModal);
					}
				})
			;
		}
	},
	
	updateHide: function(strModal) {
		{
			jQuery(strModal)
				.css({
					'display': 'none'
				})
			;
			
			jQuery(strModal).prev()
				.css({
					'display': 'none'
				})
			;
		}
	}
};
Modal.init();