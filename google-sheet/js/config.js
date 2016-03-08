$(function() {
	simpleStore.init({
		// brand can be text or image URL
		brand : "Simple Affiliate Stores",
		// numder of products per row (accepts 1, 2 or 3)
		numColumns : 3,
		// google sheets id
		spreadsheetID : "1iFqESLXyV8gVS5WCrrUFl6c35VT_nk6OZ_zxb0HO7Ew",
		// set to true if you want pages; false if you want infinite scroll
		paginate : false,
		//Google forms settings (For suggest an item feature)
		formID : "1uoRS0OQeXIzf380_MUASZIEvZct0wDov3cqQFY36t7k",
		itemName : "entry.1789872256",
		itemPrice : "entry.1082362107",
		itemImg : "entry.1872074530",
		itemURL : "entry.1622892934",
		itemDesc : "entry.333465733"
		
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
function postContactToGoogle() {
var name = $('#name').val();
var price = $('#price').val();
var img = $('#img').val();
var url = $('#url').val();
var desc = $('#desc').val();

    $.ajax({
        url: `https://docs.google.com/forms/d/${simpleStore.settings.formID}/formResponse`,
        data: {
        	simpleStore.settings.itemName : name,
        	simpleStore.settings.itemPrice : price, 
        	simpleStore.settings.itemimg : img, 
        	simpleStore.settings.itemURL : url,
        	simpleStore.settings.itemDesc : desc
        },
        type: "POST",
        dataType: "xml",
        statusCode: {
            0: function () {
                window.location = '';
            },
            200: function () {
                window.location = '';
            }
        }
    });
}
