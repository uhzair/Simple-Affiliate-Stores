simpleStore.plugins.google = (function() {

	var storeProducts = [];

	function getSpreadsheetData(s, callback) {

		var hostname = "https://spreadsheets.google.com";
		var format = "json";
		var spreadsheetURL = hostname + "/feeds/worksheets/" + s.spreadsheetID + "/public/full?alt=" + format;
		var mainsheetURL = hostname + "/feeds/list/" + s.spreadsheetID + "/od6/public/values?alt=" + format;
		var settingsSheetName = "Settings";
		var productsSheetName = "Products";
		var sheetIDs = {};

		function getSheetInfo (url, callback) {
			// Need to do this because od6 is default Google Sheet ID
			$.getJSON(url)
				.done(function(data) {

					var sheets = data.feed.entry;

					$(sheets).each(function(i, sheet) {

						var title = sheet.title.$t;
						var id = sheet.id.$t;
						var sheetID = id.substr(id.lastIndexOf('/') + 1);

						if(title == settingsSheetName) {
							sheetIDs.settingsSheetID = sheetID;
						}
						if(title == productsSheetName) {
							sheetIDs.productsSheetID  = sheetID;
						}
					});
					callback(sheetIDs.settingsSheetID);
					loadProductData(sheetIDs.productsSheetID);
				});
		}

		function loadSiteSettings (id, callback) {

			var settingsSheetURL = hostname + "/feeds/list/" + s.spreadsheetID + "/" + id + "/public/values?alt=" + format;

			$.getJSON(settingsSheetURL)
				.done(function(data) {
					var data = data.feed.entry;
					var s = simpleStore.settings;

					if(data[0]) {

						var siteName = data[0].gsx$sitenametextorimagelink.$t;
						var columns = data[0].gsx$columns123.$t;

						if (siteName) {
							s.brand = siteName;
						}
						if (columns) {
							s.numColumns = columns;
						}

						simpleStore.setLayout(s);
					}
				});
		}

		function loadProductData (id) {

			var productsSheetURL = hostname + "/feeds/list/" + s.spreadsheetID + "/" + id + "/public/values?alt=" + format;

			// Get Main Sheet Products data
			$.getJSON(productsSheetURL)
				.done(function(data) {

					var productsData = data.feed.entry;

					// Build products
					$(productsData).each(function(i) {

						// Get product values
						var product = {
							name : this.gsx$name.$t,
							price : this.gsx$price.$t,
							image : this.gsx$image.$t,
							href : this.gsx$href.$t,
							desc : this.gsx$description.$t
						};

						storeProducts.push(product);
					});
					callback();
				})
				.fail(function(data){
					var errorMsg = 'Error loading spreadsheet data. Make sure the spreadsheet ID is correct.';
					setTimeout(function(){ simpleStore.renderError(s, errorMsg); }, 1000);
				});
		}

		// Get Sheet data
		getSheetInfo(spreadsheetURL, loadSiteSettings);

	}

	return {
		init: function(callback) {
			var s = simpleStore.settings;

			// Clears out brand to allow for spreadsheet site name
			s.brand = "";
			simpleStore.setLayout(s);

			getSpreadsheetData(s, function(){
				callback(storeProducts);
			});
		}
	};
})();
