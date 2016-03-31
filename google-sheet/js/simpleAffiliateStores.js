var simpleStore = {

    products: [],
    plugins: {},

    // Default settings
    settings: {
        fadeSpeed: 200,
        buttonColor: null,
        backgroundColor: null,
        textColor: null,
        container: $('.simpleStore_container'),
        rowClass: 'simpleStore_row_',
        columnWidthClasses: {
            1: "",
            2: "one-half",
            3: "one-third"
        }
    },

    extend: function (target, opts, callback) {
        var next;
        if (typeof opts === "undefined") {
            opts = target;
            target = simpleStore;
        }
        for (next in opts) {
            if (Object.prototype.hasOwnProperty.call(opts, next)) {
                target[next] = opts[next];
            }
        }
        callback(); // check user config options
        return target;
    },

    render: function (url, s) {
        var type = url.split('/')[0];

        var map = {
            // Main view
            '': function () {
                simpleStore.renderProducts(simpleStore.products, s);
            },
            '#suggest': function () {
                simpleStore.renderForm(s);
            }
        };

        if (map[type]) {
            map[type]();
        } else {
            simpleStore.renderError(s);
        }
    },

    insertData: function (tmpl, product) {
        tmpl.find('.item_thumb').attr("src", product.image);
        tmpl.find('.item_name').text(product.name);
        tmpl.find('.item_price').text(product.price);
        tmpl.find('.prodURL').attr('href', product.href);
        tmpl.find('.item_desc').text(product.desc);
    },
    
    renderForm: function(s){
	s.container.html('').fadeIn(s.fadeSpeed);
	$('.holder').html('');
	s.container.html($('#form-template').html());
	$('#suggestionForm').attr("src", s.suggestionFormURL);
    },
    
    renderProducts: function (products, s) {

        var rowCount = 1,
            numProducts = products.length,
            numRows = Math.ceil(products.length / s.numColumns),
            itemWidth;

            // Empty out main container on load
            s.container.html('').fadeIn(s.fadeSpeed);

            // Build rows based on number of products
            for (var r = 0; r < numRows; r++) {
                s.container.append('<div class="row ' + s.rowClass + (r + 1) + '"></div>');
            }

            // Get item column width
            var widthClasses = s.columnWidthClasses;
            for (var k in widthClasses) {
                if (k == s.numColumns) {
                    itemWidth = widthClasses[k];
                }
            }

            // List layout
            products.forEach(function (product, i) {

				if (!product.soldOut) {
					var tmpl = $('#products-template').html(),
						$tmpl = $(tmpl);

					// Set item width
					$tmpl.first().addClass(itemWidth);

					// Insert data into template
					simpleStore.insertData($tmpl, product);

					// Check where to add new item based on row
					if (i === 0) {
						i = 1;
					}
					if (i % (s.numColumns) === 0) {
						rowCount++;
					}

					// Append to appropriate container
					$('.' + s.rowClass + rowCount).append($tmpl);
				}
            });
            if(simpleStore.settings.paginate){
            	paginate();
            }
    },

    renderError: function (s, msg) {
        var tmpl = $('#error-template').html(),
            $tmpl = $(tmpl);

		// Empty out main container on load
		s.container.html('').fadeIn(s.fadeSpeed);

		if (msg.length) {
			$tmpl.find('.error_text').text(msg);
		}
		s.container.append($tmpl);
		s.container.fadeIn(s.fadeSpeed);

		$tmpl.find('.alert_close').on('click', function (e) {
			e.preventDefault();
			$tmpl.fadeOut(s.fadeSpeed, function() {
				$tmpl.remove();
			});
		});
    },

	handleFailure:  function(s, errorMsg) {
		setTimeout(function () {
			simpleStore.renderError(s, errorMsg);
		}, 1000);
	},

    initJSON: function (s) {
        var errorMsg = 'There was an error loading the JSON file.' +
            ' Please make sure you have "' + s.JSONFile + '" file in' +
            ' your main directory.';

        // Checks to make sure file exists
        $.get(s.JSONFile)
            .success(function () {
                // Get product data from JSON file
                $.getJSON(s.JSONFile, function (data) {
                    simpleStore.setProducts(data.products);
                })
                .fail(function () { simpleStore.handleFailure(s, errorMsg); });
            })
            .fail(function () { simpleStore.handleFailure(s, errorMsg); });
    },

    checkMode : function (s) {
        if (s.hasOwnProperty("spreadsheetID") || s.hasOwnProperty("spreadsheetId")) {
            s.mode = "Google";
        }
    },

    setProducts: function (products, s) {
        if (products.length > 0) {
            products.forEach(function (product, index) {
                product.id = index + 1;
                simpleStore.products.push(product);
            });
        }

        // Manually trigger on initial load
        $(window).trigger('hashchange');
    },

	setLayout: function (s) {
		// Set brand
        if (s.brand.match('^http://') || s.brand.match('^https://') || s.brand.match('^www.')) {
            $('.brand').html('<img src="' + s.brand + '" />');
        } else {
            $('.brand').html('<h5>' + s.brand + '</h5>');
        }

		// Set title
		$('title').html(s.brand);
	},

    generateStore: function () {

        var s = this.settings;

        // Set mode
        this.checkMode(s);

        // Set layout
        this.setLayout(s);

        // Check for hash changes
        $(window).on('hashchange', function () {
            simpleStore.render(window.location.hash, s);
        });

        // Set products based on mode
        switch (s.mode) {
            case 'JSON':
                this.initJSON(s);
                break;
            case 'Google':
				if(simpleStore.plugins.google) {
					simpleStore.plugins.google.init(function (products) {
						simpleStore.setProducts(products, s);
					});
				} else {
					var errorMsg = 'There was an error loading the Google plugin. Make sure it is installed properly.';
					simpleStore.renderError(s, errorMsg);
				}
                break;
            default:
                this.initJSON(s);
        }
    },

    init: function (options) {
        if ($.isPlainObject(options)) {
            return this.extend(this.settings, options, function () {
                simpleStore.generateStore();
            });
        }
    }
};
