'use strict';

require('chrome').Cu.import('resource://gre/modules/Services.jsm');

exports.main = function(optionsHandle) {
	{
		if (optionsHandle.loadReason === 'install') {
			require('sdk/preferences/service').set('browser.newtab.url', 'about:bookrect');
			
		} else if (optionsHandle.loadReason === 'enable') {
			require('sdk/preferences/service').set('browser.newtab.url', 'about:bookrect');
			
		}
	}
	
	{
		if (require('sdk/preferences/service').get('browser.newtab.url') === 'about:bookrect') {
			require('sdk/preferences/service').set('extensions.BookRect.Advanced.boolAutostart', true);
			
		} else if (require('sdk/preferences/service').get('browser.newtab.url') !== 'about:bookrect') {
			require('sdk/preferences/service').set('extensions.BookRect.Advanced.boolAutostart', false);
			
		}
	}
	
	{
		require('sdk/platform/xpcom').Factory({
			'contract': '@mozilla.org/network/protocol/about;1?what=bookrect',
			'register': true,
			'unregister': true,
			'Component': require('sdk/core/heritage').Class({
				'extends': require('sdk/platform/xpcom').Unknown,
				'interfaces': [ 'nsIAboutModule' ],
				'newChannel': function(uriHandle) {
					var channelHandle = Services.io.newChannel('chrome://bookrect/content/index.html', null, null);
					
					{
						channelHandle.originalURI = uriHandle;
					}
					
					return channelHandle;
				},
				'getURIFlags': function(uriHandle) {
					return require('chrome').Ci.nsIAboutModule.ALLOW_SCRIPT;
				}
			})
		});
	}
	
	{	
		var toolbarbuttonHandle = require('sdk/ui/button/toggle').ToggleButton({
			'id': 'idBookRect_Toolbarbutton',
			'label': 'BookRect',
			'icon': 'chrome://BookRect/content/images/bodyFavicon.png'
		});

		{
			toolbarbuttonHandle.on('click', function(stateHandle) {
				{
					if (stateHandle.checked === true) {
						toolbarpanelHandle.show({
							'position': toolbarbuttonHandle
						});
						
					} else if (stateHandle.checked === false) {
						toolbarpanelHandle.hide();
						
					}
				}
			});
		}
		
		var toolbarpanelHandle = require('sdk/panel').Panel({
			'width': 640,
			'height': 480,
			'contentURL': 'about:bookrect',
			'contentScriptFile': [
				require('sdk/self').data.url('./jquery.js'),
				require('sdk/self').data.url('./panel.js')
			]
		});
		
		{
			toolbarpanelHandle.on('show', function() {
				{
					toolbarbuttonHandle.state('window', {
						'checked': true
					});
				}
				
				{
					toolbarpanelHandle.port.emit('eventShow');
				}
			});
			
			toolbarpanelHandle.on('hide', function() {
				{
					toolbarbuttonHandle.state('window', {
						'checked': false
					});
				}
				
				{
					toolbarpanelHandle.port.emit('eventHide');
				}
			});
			
			toolbarpanelHandle.port.on('eventClickLeft', function(strHref) {
				{
					toolbarpanelHandle.hide();
				}
				
				{
					require('sdk/tabs').activeTab.url = strHref;
				}
			});
			
			toolbarpanelHandle.port.on('eventClickMiddle', function(strHref) {
				{
					toolbarpanelHandle.hide();
				}
				
				{
					require('sdk/tabs').open(strHref);
				}
			});
		}
	}
};

exports.onUnload = function(optionsHandle) {
	{
		if (require('sdk/preferences/service').get('browser.newtab.url') === 'about:bookrect') {
			require('sdk/preferences/service').reset('browser.newtab.url');
		}
	}
};