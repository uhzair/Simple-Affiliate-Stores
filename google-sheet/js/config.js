$(function() {
	simpleStore.init({
		// brand can be text or image URL
		brand : "Simple Affiliate Stores",
		// numder of products per row (accepts 1, 2 or 3)
		numColumns : 3,
		// google sheets id
		spreadsheetID : "1iFqESLXyV8gVS5WCrrUFl6c35VT_nk6OZ_zxb0HO7Ew"
	});
});
//Pagination function
function paginate(){
	$("div.holder").jPages({
	        containerID : "simpleStore_container",
	    	// change this to how much rows of products you want per page. setting this to n means you get n*numColumns(above) products per page.
	        perPage : 3,
	        // change these if you want previous and next buttons in pagination controls.
	 	previous : false,
		next : false
		// for more pagination settings see http://luis-almeida.github.io/jPages/
    	});
};