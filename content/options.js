'use strict';

jQuery(document).on('pageshow', '#idOptions', function() {
	{
		document.title = 'BookRect - ' + LocalisationOptions.obtain().getStrLocalized('Options_strTitle');
	}
	
	{
		jQuery('#idOptions_Header_Title')
			.text('BookRect - ' + LocalisationOptions.obtain().getStrLocalized('Options_Header_strTitle'))
		;
	}

	{
		jQuery('#idOptions_Navigation_Title')
			.text(LocalisationOptions.obtain().getStrLocalized('Options_Navigation_strTitle'))
		;
	}
	
	{
		jQuery('#idOptions_Navigation_General')
			.val(LocalisationOptions.obtain().getStrLocalized('Options_Navigation_strGeneral'))
			.button('refresh')
			.button({
				'defaults': true,
				'icon': 'gear'
			})
			.off('click')
			.on('click', function() {
				{
					jQuery.mobile.changePage('#idGeneralOptions');
				}
			})
		;
	}
	
	{
		jQuery('#idOptions_Navigation_Stylesheet')
			.val(LocalisationOptions.obtain().getStrLocalized('Options_Navigation_strStylesheet'))
			.button('refresh')
			.button({
				'defaults': true,
				'icon': 'edit'
			})
			.off('click')
			.on('click', function() {
				{
					jQuery.mobile.changePage('#idStylesheetOptions');
				}
			})
		;
	}
});

jQuery(document).on('pagecreate', '#idGeneralOptions', function() {
	{
		document.title = 'BookRect - ' + LocalisationOptions.obtain().getStrLocalized('Options_strTitle');
	}
	
	{
		jQuery('#idGeneralOptions_Header_Title')
			.text('BookRect - ' + LocalisationOptions.obtain().getStrLocalized('Options_Header_strTitle'))
		;
	}
	
	{
		jQuery('#idGeneralOptions_Header_Popup')
			.text(LocalisationOptions.obtain().getStrLocalized('Options_Popup_strTitle'))
		;
	}
	
	{
		jQuery('#idGeneralOptions_Navigation_Title')
			.text(LocalisationOptions.obtain().getStrLocalized('Options_Navigation_strTitle'))
		;
	}
	
	{
		jQuery('#idGeneralOptions_Navigation_General')
			.val(LocalisationOptions.obtain().getStrLocalized('Options_Navigation_strGeneral'))
			.button('refresh')
			.button({
				'defaults': true,
				'icon': 'gear'
			})
			.off('click')
			.on('click', function() {
				{
					jQuery.mobile.changePage('#idGeneralOptions');
				}
			})
		;
		
		jQuery('#idGeneralOptions_Navigation_General').parent()
			.addClass('ui-btn-active')
		;
	}
	
	{
		jQuery('#idGeneralOptions_Navigation_Stylesheet')
			.val(LocalisationOptions.obtain().getStrLocalized('Options_Navigation_strStylesheet'))
			.button('refresh')
			.button({
				'defaults': true,
				'icon': 'edit'
			})
			.off('click')
			.on('click', function() {
				{
					jQuery.mobile.changePage('#idStylesheetOptions');
				}
			})
		;
	}
	
	{
		jQuery('#idGeneralOptions_Source_Title')
			.text(LocalisationOptions.obtain().getStrLocalized('Options_General_Source_strTitle'))
		;
	}
	
	{
		jQuery('#idGeneralOptions_Source_Toolbar').prev()
			.text(LocalisationOptions.obtain().getStrLocalized('Options_General_Source_strToolbar'))
		;
		
		jQuery('#idGeneralOptions_Source_Toolbar')
			.off('change')
			.on('change', function() {
				var boolToolbar = jQuery('#idGeneralOptions_Source_Toolbar').is(':checked');
				
				if (boolToolbar === true) {
					PreferenceSource.obtain().setBoolToolbar(true);
					
				} else if (boolToolbar === false) {
					PreferenceSource.obtain().setBoolToolbar(false);
					
				}
			})
			.off('update')
			.on('update', function() {
				if (PreferenceSource.obtain().getBoolToolbar() === true) {
					jQuery(this)
						.prop({
							'checked': true
						})
						.checkboxradio('refresh')
					;
					
				} else if (PreferenceSource.obtain().getBoolToolbar() === false) {
					jQuery(this)
						.prop({
							'checked': false
						})
						.checkboxradio('refresh')
					;
				
				}
			})
		;
		
		jQuery('#idGeneralOptions_Source_Toolbar')
			.trigger('update')
		;
	}
	
	{
		jQuery('#idGeneralOptions_Source_Menu').prev()
			.text(LocalisationOptions.obtain().getStrLocalized('Options_General_Source_strMenu'))
		;
		
		jQuery('#idGeneralOptions_Source_Menu')
			.off('change')
			.on('change', function() {
				var boolMenu = jQuery('#idGeneralOptions_Source_Menu').is(':checked');
				
				if (boolMenu === true) {
					PreferenceSource.obtain().setBoolMenu(true);
					
				} else if (boolMenu === false) {
					PreferenceSource.obtain().setBoolMenu(false);
					
				}
			})
			.off('update')
			.on('update', function() {
				if (PreferenceSource.obtain().getBoolMenu() === true) {
					jQuery(this)
						.prop({
							'checked': true
						})
						.checkboxradio('refresh')
					;
					
				} else if (PreferenceSource.obtain().getBoolMenu() === false) {
					jQuery(this)
						.prop({
							'checked': false
						})
						.checkboxradio('refresh')
					;
				
				}
			})
		;
		
		jQuery('#idGeneralOptions_Source_Menu')
			.trigger('update')
		;
	}
	
	{
		jQuery('#idGeneralOptions_Source_Unfiled').prev()
			.text(LocalisationOptions.obtain().getStrLocalized('Options_General_Source_strUnfiled'))
		;
		
		jQuery('#idGeneralOptions_Source_Unfiled')
			.off('change')
			.on('change', function() {
				var boolUnfiled = jQuery('#idGeneralOptions_Source_Unfiled').is(':checked');
				
				if (boolUnfiled === true) {
					PreferenceSource.obtain().setBoolUnfiled(true);
					
				} else if (boolUnfiled === false) {
					PreferenceSource.obtain().setBoolUnfiled(false);
					
				}
			})
			.off('update')
			.on('update', function() {
				if (PreferenceSource.obtain().getBoolUnfiled() === true) {
					jQuery(this)
						.prop({
							'checked': true
						})
						.checkboxradio('refresh')
					;
					
				} else if (PreferenceSource.obtain().getBoolUnfiled() === false) {
					jQuery(this)
						.prop({
							'checked': false
						})
						.checkboxradio('refresh')
					;
				
				}
			})
		;
		
		jQuery('#idGeneralOptions_Source_Unfiled')
			.trigger('update')
		;
	}
	
	{
		jQuery('#idGeneralOptions_Advanced_Title')
			.text(LocalisationOptions.obtain().getStrLocalized('Options_General_Advanced_strTitle'))
		;
	}
	
	{
		jQuery('#idGeneralOptions_Advanced_Autostart').prev()
			.text(LocalisationOptions.obtain().getStrLocalized('Options_General_Advanced_strAutostart'))
		;
		
		jQuery('#idGeneralOptions_Advanced_Autostart')
			.off('change')
			.on('change', function() {
				var boolAutostart = jQuery('#idGeneralOptions_Advanced_Autostart').is(':checked');
				
				if (boolAutostart === true) {
					PreferenceAdvanced.obtain().setBoolAutostart(true);
					
				} else if (boolAutostart === false) {
					PreferenceAdvanced.obtain().setBoolAutostart(false);
					
				}
			})
			.off('update')
			.on('update', function() {
				if (PreferenceAdvanced.obtain().getBoolAutostart() === true) {
					jQuery(this)
						.prop({
							'checked': true
						})
						.checkboxradio('refresh')
					;
					
				} else if (PreferenceAdvanced.obtain().getBoolAutostart() === false) {
					jQuery(this)
						.prop({
							'checked': false
						})
						.checkboxradio('refresh')
					;
				
				}
			})
		;
		
		jQuery('#idGeneralOptions_Advanced_Autostart')
			.trigger('update')
		;
	}
	
	{
		jQuery('#idGeneralOptions_Advanced_Search').prev()
			.text(LocalisationOptions.obtain().getStrLocalized('Options_General_Advanced_strSearch'))
		;
		
		jQuery('#idGeneralOptions_Advanced_Search')
			.off('change')
			.on('change', function() {
				var boolSearch = jQuery('#idGeneralOptions_Advanced_Search').is(':checked');
				
				if (boolSearch === true) {
					PreferenceAdvanced.obtain().setBoolSearch(true);
					
				} else if (boolSearch === false) {
					PreferenceAdvanced.obtain().setBoolSearch(false);
					
				}
			})
			.off('update')
			.on('update', function() {
				if (PreferenceAdvanced.obtain().getBoolSearch() === true) {
					jQuery(this)
						.prop({
							'checked': true
						})
						.checkboxradio('refresh')
					;
					
				} else if (PreferenceAdvanced.obtain().getBoolSearch() === false) {
					jQuery(this)
						.prop({
							'checked': false
						})
						.checkboxradio('refresh')
					;
				
				}
			})
		;
		
		jQuery('#idGeneralOptions_Advanced_Search')
			.trigger('update')
		;
	}
	
	{
		jQuery('#idGeneralOptions_Advanced_State').prev()
			.text(LocalisationOptions.obtain().getStrLocalized('Options_General_Advanced_strState'))
		;
		
		jQuery('#idGeneralOptions_Advanced_State')
			.off('change')
			.on('change', function() {
				var boolState = jQuery('#idGeneralOptions_Advanced_State').is(':checked');
				
				if (boolState === true) {
					PreferenceAdvanced.obtain().setBoolState(true);
					
				} else if (boolState === false) {
					PreferenceAdvanced.obtain().setBoolState(false);
					
				}
			})
			.off('update')
			.on('update', function() {
				if (PreferenceAdvanced.obtain().getBoolState() === true) {
					jQuery(this)
						.prop({
							'checked': true
						})
						.checkboxradio('refresh')
					;
					
				} else if (PreferenceAdvanced.obtain().getBoolState() === false) {
					jQuery(this)
						.prop({
							'checked': false
						})
						.checkboxradio('refresh')
					;
				
				}
			})
		;
		
		jQuery('#idGeneralOptions_Advanced_State')
			.trigger('update')
		;
	}
	
	{
		jQuery('#idGeneralOptions_Advanced_Subfolders').prev()
			.text(LocalisationOptions.obtain().getStrLocalized('Options_General_Advanced_strSubfolders'))
		;
		
		jQuery('#idGeneralOptions_Advanced_Subfolders')
			.off('change')
			.on('change', function() {
				var boolState = jQuery('#idGeneralOptions_Advanced_Subfolders').is(':checked');
				
				if (boolState === true) {
					PreferenceAdvanced.obtain().setBoolSubfolders(true);
					
				} else if (boolState === false) {
					PreferenceAdvanced.obtain().setBoolSubfolders(false);
					
				}
			})
			.off('update')
			.on('update', function() {
				if (PreferenceAdvanced.obtain().getBoolSubfolders() === true) {
					jQuery(this)
						.prop({
							'checked': true
						})
						.checkboxradio('refresh')
					;
					
				} else if (PreferenceAdvanced.obtain().getBoolSubfolders() === false) {
					jQuery(this)
						.prop({
							'checked': false
						})
						.checkboxradio('refresh')
					;
				
				}
			})
		;
		
		jQuery('#idGeneralOptions_Advanced_Subfolders')
			.trigger('update')
		;
	}
	
	{
		jQuery('#idGeneralOptions_Popup')
			.popup({
				'defaults': true
			})
		;
	}
	
	{
		jQuery('#idGeneralOptions_Popup_Reset')
			.val(LocalisationOptions.obtain().getStrLocalized('Options_Popup_strReset'))
			.button('refresh')
			.button({
				'defaults': true,
				'icon': 'back'
			})
			.off('click')
			.on('click', function() {
		    	{
		    		jQuery('#idGeneralOptions_Popup')
		    			.popup('close')
		    		;
		    	}
				
				{
					PreferenceSource.obtain().clearBoolToolbar();
					PreferenceSource.obtain().clearBoolMenu();
					PreferenceSource.obtain().clearBoolUnfiled();
				}
				
				{
					jQuery('#idGeneralOptions_Source_Toolbar')
						.trigger('update')
					;
					
					jQuery('#idGeneralOptions_Source_Menu')
						.trigger('update')
					;
					
					jQuery('#idGeneralOptions_Source_Unfiled')
						.trigger('update')
					;
				}
				
				{
					PreferenceAdvanced.obtain().clearBoolAutostart();
					PreferenceAdvanced.obtain().clearBoolSearch();
					PreferenceAdvanced.obtain().clearBoolState();
					PreferenceAdvanced.obtain().clearBoolSubfolders();
				}
				
				{
					jQuery('#idGeneralOptions_Advanced_Autostart')
						.trigger('update')
					;
					
					jQuery('#idGeneralOptions_Advanced_Search')
						.trigger('update')
					;
					
					jQuery('#idGeneralOptions_Advanced_State')
						.trigger('update')
					;
					
					jQuery('#idGeneralOptions_Advanced_Subfolders')
						.trigger('update')
					;
				}
			})
		;
	}
});

jQuery(document).on('pagecreate', '#idStylesheetOptions', function() {
	{
		document.title = 'BookRect - ' + LocalisationOptions.obtain().getStrLocalized('Options_strTitle');
	}
	
	{
		jQuery('#idStylesheetOptions_Header_Title')
			.text('BookRect - ' + LocalisationOptions.obtain().getStrLocalized('Options_Header_strTitle'))
		;
	}
	
	{
		jQuery('#idStylesheetOptions_Header_Popup')
			.text(LocalisationOptions.obtain().getStrLocalized('Options_Popup_strTitle'))
		;
	}
	
	{
		jQuery('#idStylesheetOptions_Navigation_Title')
			.text(LocalisationOptions.obtain().getStrLocalized('Options_Navigation_strTitle'))
		;
	}
	
	{
		jQuery('#idStylesheetOptions_Navigation_General')
			.val(LocalisationOptions.obtain().getStrLocalized('Options_Navigation_strGeneral'))
			.button('refresh')
			.button({
				'defaults': true,
				'icon': 'gear'
			})
			.off('click')
			.on('click', function() {
				{
					jQuery.mobile.changePage('#idGeneralOptions');
				}
			})
		;
	}
	
	{
		jQuery('#idStylesheetOptions_Navigation_Stylesheet')
			.val(LocalisationOptions.obtain().getStrLocalized('Options_Navigation_strStylesheet'))
			.button('refresh')
			.button({
				'defaults': true,
				'icon': 'edit'
			})
			.off('click')
			.on('click', function() {
				{
					jQuery.mobile.changePage('#idStylesheetOptions');
				}
			})
		;
		
		jQuery('#idStylesheetOptions_Navigation_Stylesheet').parent()
			.addClass('ui-btn-active')
		;
	}
	
	{
		jQuery('#idStylesheetOptions_Stylesheet_Title')
			.text(LocalisationOptions.obtain().getStrLocalized('Options_Stylesheet_strTitle'))
		;
	}
	
	{
		jQuery('#idStylesheetOptions_Stylesheet_Index')
			.off('input')
			.on('input', function() {
				var strIndex = jQuery('#idStylesheetOptions_Stylesheet_Index').val();
				
				PreferenceStylesheet.obtain().setStrIndex(strIndex);
			})
			.off('update')
			.on('update', function() {
				PreferenceStylesheet.obtain().initStrIndex(function() {
					jQuery('#idStylesheetOptions_Stylesheet_Index')
						.val(PreferenceStylesheet.obtain().getStrIndex())
					;
				});
			})
		;
		
		jQuery('#idStylesheetOptions_Stylesheet_Index')
			.trigger('update')
		;
	}
	
	{
		jQuery('#idStylesheetOptions_Stylesheet_CoderectTree')
			.off('input')
			.on('input', function() {
				var strCoderectTree = jQuery('#idStylesheetOptions_Stylesheet_CoderectTree').val();
				
				PreferenceStylesheet.obtain().setStrCoderectTree(strCoderectTree);
			})
			.off('update')
			.on('update', function() {
				PreferenceStylesheet.obtain().initStrCoderectTree(function() {
					jQuery('#idStylesheetOptions_Stylesheet_CoderectTree')
						.val(PreferenceStylesheet.obtain().getStrCoderectTree())
					;
				});
			})
		;
		
		jQuery('#idStylesheetOptions_Stylesheet_CoderectTree')
			.trigger('update')
		;
	}
	
	{
		jQuery('#idStylesheetOptions_Popup')
			.popup({
				'defaults': true
			})
		;
	}
	
	{
		jQuery('#idStylesheetOptions_Popup_Reset')
			.val(LocalisationOptions.obtain().getStrLocalized('Options_Popup_strReset'))
			.button('refresh')
			.button({
				'defaults': true,
				'icon': 'back'
			})
			.off('click')
			.on('click', function() {
		    	{
		    		jQuery('#idGeneralOptions_Popup')
		    			.popup('close')
		    		;
		    	}
				
				{
					PreferenceStylesheet.obtain().clearStrIndex();
					
					PreferenceStylesheet.obtain().clearStrCoderectTree();
				}
				
				{
					jQuery('#idStylesheetOptions_Stylesheet_Index')
						.trigger('update')
					;
					
					jQuery('#idStylesheetOptions_Stylesheet_CoderectTree')
						.trigger('update')
					;
				}
			})
		;
	}
});