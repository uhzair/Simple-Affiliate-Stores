# Simple Affiliate Stores

Simple Affiliate Stores is a clean, responsive storefront boilerplate with no database you can setup in minutes. Simple Affiliate Stores is built on top of [simpleStore](https://github.com/cdmedia/simplestore) which uses Skeleton CSS Framework for a lightweight, fast, simple to use, and completely customizable experience.

# Features

* No Databases, all client-side (just simple HTML, CSS & Javascript)
* Lightweight & Fast
* Easy setup
* Use either JSON formatted products list or load products from Google Spreadsheet.

# Demos

You can see a working demo [here](http://chlist.github.io/Simple-Affiliate-Stores/)

# Setup

* Make sure simple affiliates store is on a web server (any type will do as long as it can serve static web pages).
* Edit the `js/config.js` to your liking.

# Using JSON version

* Use the products.json file as a starting point.
* Add additional products in the `products.json` file.
* Make sure mode is set to `JSON` in `js/config.js` and that `googleSheets.js` is not being referenced in the setup.

# Using Google Spreadsheet

To use a Google Spreadsheet, add a reference just before your `config.js` file

```
<script src="js/googleSheets.js"></script>
```

* Use the [Demo Spreadsheet](https://docs.google.com/spreadsheets/d/1iFqESLXyV8gVS5WCrrUFl6c35VT_nk6OZ_zxb0HO7Ew/edit?usp=sharing) as a starting point
* Create a new Google spreadsheet
* Set sharing permissions to either “Public” or set to “Anyone with link can view”
* Publish the sheet (File -> Publish to the web -> Publish)
* Add the spreadsheet ID to your 'config.js' ( spreadsheetID : "XXXXXXXXXXXXXXXXXXXXXXX" )

## Credit where credit is due

For further documentation on expanding/tweaking simple affiliate stores, check out the
framework/plugin pages.

* [simpleStore](https://github.com/cdmedia/simplestore)
* [Skeleton](http://getskeleton.com)
* [Normalize.css](http://necolas.github.io/normalize.css)
* [FontAwesome](http://fortawesome.github.io/Font-Awesome)
* [jQuery](https://jquery.com/)
* [jPages](https://github.com/luis-almeida/jPages)
