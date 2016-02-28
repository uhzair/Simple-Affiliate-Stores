$(function() {
	simpleStore.init({
		// brand can be text or image URL
		brand : "Simple Affiliate Stores",
		// numder of products per row (accepts 1, 2 or 3)
		numColumns : 3,
		// name of JSON file
		JSONFile : "products.json"
	});
});
function paginate(){
	setTimeout(function(){
		$("div.holder").jPages({
	    containerID : "simpleStore_container",
	    perPage : 3,
	    previous : false,
	    next : false
		});
	}, 500);    
};