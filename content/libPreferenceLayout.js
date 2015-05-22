'use strict'

Components.utils.import('resource://gre/modules/FileUtils.jsm');
Components.utils.import('resource://gre/modules/Services.jsm');

var PreferenceLayout = {
	sqlserviceHandle: null,
	
	statementCreate: null,
	statementSave: null,
	statementRemove: null,
	statementClear: null,
	statementCount: null,
	
	statementSelect: null,
	
	intIdent: 0,
	intColumn: 0,
	intPosition: 0,
	intItem: 0,
	
	init: function() {
		{
			PreferenceLayout.sqlserviceHandle = Services.storage.openDatabase(FileUtils.getFile('ProfD', [ 'BookRect.PreferenceLayout.sqlite' ]));
		}
		
		{
			// @formatter:off
			PreferenceLayout.sqlserviceHandle.executeSimpleSQL(
				'CREATE TABLE IF NOT EXISTS PreferenceLayout ' +
				'	( ' +
				'		intIdent INTEGER PRIMARY KEY AUTOINCREMENT, ' +
				'		intColumn INTEGER, ' +
				'		intPosition INTEGER, ' +
				'		intItem INTEGER ' +
				'	) '
			);
			// @formatter:on
		}
		
		{
			{
				var intIndex = -1;
				
				// @formatter:off
				PreferenceLayout.statementCreate = PreferenceLayout.sqlserviceHandle.createStatement(
					'INSERT INTO PreferenceLayout ' +
					'	( ' + 
					'		intColumn, ' +
					'		intPosition, ' +
					'		intItem ' +
					'	) ' +
					'VALUES ' +
					'	( ' +
					'		:PARAM' + (intIndex += 1) + ', ' +
					'		:PARAM' + (intIndex += 1) + ', ' +
					'		:PARAM' + (intIndex += 1) + ' ' +
					'	) '
				);
				// @formatter:on
			}
			
			{
				var intIndex = -1;
				
				// @formatter:off
				PreferenceLayout.statementSave = PreferenceLayout.sqlserviceHandle.createStatement(
					'UPDATE PreferenceLayout ' +
					'SET ' +
					'	intColumn = :PARAM' + (intIndex += 1) + ', ' +
					'	intPosition = :PARAM' + (intIndex += 1) + ', ' +
					'	intItem = :PARAM' + (intIndex += 1) + ' ' +
					'WHERE intIdent = :PARAM' + (intIndex += 1) + ' '
				);
				// @formatter:on
			}
			
			{
				var intIndex = -1;
				
				// @formatter:off
				PreferenceLayout.statementRemove = PreferenceLayout.sqlserviceHandle.createStatement(
					'DELETE FROM PreferenceLayout ' +
					'WHERE intIdent = :PARAM' + (intIndex += 1) + ' '
				);
				// @formatter:on
			}
			
			{
				// @formatter:off
				PreferenceLayout.statementClear = PreferenceLayout.sqlserviceHandle.createStatement(
					'DELETE FROM PreferenceLayout '
				);
				// @formatter:on
			}
			
			{
				// @formatter:off
				PreferenceLayout.statementCount = PreferenceLayout.sqlserviceHandle.createStatement(
					'SELECT COUNT(*) FROM PreferenceLayout '
				);
				// @formatter:on
			}
		}
		
		{
			PreferenceLayout.statementSelect = null;
		}
		
		{
			PreferenceLayout.intIdent = 0;
			
			PreferenceLayout.intColumn = 0;
			
			PreferenceLayout.intPosition = 0;
			
			PreferenceLayout.intItem = 0;
		}
	},
	
	dispel: function() {
		{
			PreferenceLayout.statementCreate.finalize();
			PreferenceLayout.statementSave.finalize()
			PreferenceLayout.statementRemove.finalize()
			PreferenceLayout.statementClear.finalize()
			PreferenceLayout.statementCount.finalize()
			
			PreferenceLayout.sqlserviceHandle.close();
		}
		
		{
			PreferenceLayout.sqlserviceHandle = null;
		}
		
		{
			PreferenceLayout.statementCreate = null;
			
			PreferenceLayout.statementSave = null;
			
			PreferenceLayout.statementRemove = null;
			
			PreferenceLayout.statementClear = null;
			
			PreferenceLayout.statementCount = null;
		}
		
		{
			PreferenceLayout.statementSelect = null;
		}
		
		{
			PreferenceLayout.intIdent = 0;
			
			PreferenceLayout.intColumn = 0;
			
			PreferenceLayout.intPosition = 0;
			
			PreferenceLayout.intItem = 0;
		}
	},
	
	acquire: function() {
		
	},
	
	release: function() {
		
	},
	
	transactionOpen: function() {
		PreferenceLayout.sqlserviceHandle.beginTransaction();
	},
	
	transactionClose: function() {
		PreferenceLayout.sqlserviceHandle.commitTransaction();
	},
	
	selectOpen: function(strSql, strParameter) {
		PreferenceLayout.statementSelect = PreferenceLayout.sqlserviceHandle.createStatement(strSql);
		
		for (var intFor1 = 0; intFor1 < strParameter.length; intFor1 += 1) {
			PreferenceLayout.statementSelect.params['PARAM' + intFor1] = strParameter[intFor1];
		}
	},
	
	selectNext: function() {
		var boolStep = PreferenceLayout.statementSelect.step();
		
		if (boolStep === true) {
			PreferenceLayout.intIdent = PreferenceLayout.statementSelect.row.intIdent;
			PreferenceLayout.intColumn = PreferenceLayout.statementSelect.row.intColumn;
			PreferenceLayout.intPosition = PreferenceLayout.statementSelect.row.intPosition;
			PreferenceLayout.intItem = PreferenceLayout.statementSelect.row.intItem;
			
		} else if (boolStep === false) {
			PreferenceLayout.intIdent = 0;
			PreferenceLayout.intColumn = 0;
			PreferenceLayout.intPosition = 0;
			PreferenceLayout.intItem = 0;
			
		}
	},
	
	selectClose: function() {
		PreferenceLayout.statementSelect.finalize();
	},
	
	create: function() {
		{
			var intIndex = -1;
			
			PreferenceLayout.statementCreate.params['PARAM' + (intIndex += 1)] = PreferenceLayout.intColumn;
			PreferenceLayout.statementCreate.params['PARAM' + (intIndex += 1)] = PreferenceLayout.intPosition;
			PreferenceLayout.statementCreate.params['PARAM' + (intIndex += 1)] = PreferenceLayout.intItem;
			
			PreferenceLayout.statementCreate.execute();
			
			PreferenceLayout.statementCreate.reset();
		}
		
		{
			PreferenceLayoutObserver.update();
		}
	},
	
	save: function() {
		{
			var intIndex = -1;
			
			PreferenceLayout.statementSave.params['PARAM' + (intIndex += 1)] = PreferenceLayout.intColumn;
			PreferenceLayout.statementSave.params['PARAM' + (intIndex += 1)] = PreferenceLayout.intPosition;
			PreferenceLayout.statementSave.params['PARAM' + (intIndex += 1)] = PreferenceLayout.intItem;
			PreferenceLayout.statementSave.params['PARAM' + (intIndex += 1)] = PreferenceLayout.intIdent;
			
			PreferenceLayout.statementSave.execute();
			
			PreferenceLayout.statementSave.reset();
		}
		
		{
			PreferenceLayoutObserver.update();
		}
	},
	
	remove: function() {
		{
			var intIndex = -1;
			
			PreferenceLayout.statementRemove.params['PARAM' + (intIndex += 1)] = PreferenceLayout.intIdent;
			
			PreferenceLayout.statementRemove.execute();
			
			PreferenceLayout.statementRemove.reset();
		}
		
		{
			PreferenceLayoutObserver.update();
		}
	},
	
	clear: function() {
		{
			PreferenceLayout.statementClear.execute();
			
			PreferenceLayout.statementClear.reset();
		}
		
		{
			PreferenceLayoutObserver.update();
		}
	},
	
	count: function() {
		var intCount = 0;
		
		{
			var boolStep = PreferenceLayout.statementCount.step();
			
			if (boolStep === true) {
				intCount = PreferenceLayout.statementCount.row.COUNT; // TODO: change
				
			} else if (boolStep === false) {
				intCount = 0;
				
			}
		}
		
		{
			PreferenceLayout.statementCount.reset();
		}
		
		return intCount;
	}
};
PreferenceLayout.init();
