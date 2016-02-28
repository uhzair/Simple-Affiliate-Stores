$(function() {
	simpleStore.init({
		// brand can be text or image URL
		brand : "Simple Affiliate Stores",
		// numder of products per row (accepts 1, 2 or 3)
		numColumns : 3,
		// name of JSON file
		JSONFile : "products.json",
		// set to true if you want pages; false if you want infinite scroll
		paginate : true
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
