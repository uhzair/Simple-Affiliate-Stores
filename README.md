# Simple Affiliate Stores

Simple Affiliate Stores is a clean, responsive storefront boilerplate with no database you can setup in minutes. Simple Affiliate Stores is built on top of [simpleStore](https://github.com/cdmedia/simplestore) which uses Skeleton CSS Framework for a lightweight, fast, simple to use, and completely customizable experience.

# Features

* No Databases, all client-side (just simple HTML, CSS & Javascript)
* Lightweight & Fast
* Easy setup
* Use either JSON formatted products list or load products from Google Spreadsheet.
* User suggestions

# Demos

You can see a working demo [here](http://chlist.github.io/Simple-Affiliate-Stores/)

# Setup

* Make sure simple affiliates store is on a web server (any type will do as long as it can serve static web pages).
* Edit the `js/config.js` to your liking.

# Setting up user suggestions

* The user suggestions features require you to create a form at https://docs.google.com/forms/
* Use [This Form](https://docs.google.com/forms/d/1uoRS0OQeXIzf380_MUASZIEvZct0wDov3cqQFY36t7k/viewform) as a template.
* Set [Data validation](http://i.imgur.com/nNlmpGj.png) where required.
* Next go to the responses tab an click the [spreadsheet icon](http://i.imgur.com/jBkWO4J.png)
* It'll create a new spreadsheet for you similar to [this one](https://docs.google.com/spreadsheets/d/13jv-OL_J84_OWfNEGNGAUhybtDI8M-La_q12cZU4Xzk/)
* This spreadsheet will contain all suggestions from users, If you want to add any you can just copy and paste it into your products spreadsheet.
* Once all setup is done, click on send and open the [iframe tab](http://i.imgur.com/ljnBDS3.png)
* From here grab the src or the link and modify line 84 in index.html file; replacing the src value to your form src.
* You're done =)


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
