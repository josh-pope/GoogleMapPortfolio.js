/*
 * GoogleMapPortfolio.js jQuery plugin. not v1 - use at your own risk. current limitations are data specific to 
 *  my portfolio implementation (which uses a templating engine to populate the data).
 *
 *	joshwpope@gmail.com
 *
 */
(function($) {

var iOS, genericTimeout;

$.fn.GoogleMapPortfolio = function(opts, settings) {
	// todo: this is not an ideal place to define this iOS var
	iOS = navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? !0 : !1;
	iOS && $("#follower").addClass('follower-inactive');

	// 
    if (typeof opts === 'object') settings = opts;
    settings = $.extend({}, $.fn.GoogleMapPortfolio.private, settings || {});

  	// we are only creating one instance, so this each loop is only run once.
    return this.each(function() {
        var $elem = $(this);

            // aggregate the passed in options, the options defined here, and the options 
            // variable based on cms output. 
            var $settings = jQuery.extend(true, $.fn.GoogleMapPortfolio.private, settings);

            var _o = new $.fn.GoogleMapPortfolio.app();

            $elem.data('_floatingControlsMap', _o);
    })
};
$.fn.GoogleMapPortfolio.private = {
		baseURL: 'http://www.joshpope.com',
		baseAssetPath: 'work-images',
		baseAssetPathNew: 'newimages', // temp
		urls: [], // holds data passed into plugin

		// from cms
		zoom_level: 1,
	    shell: $("#gmap"),
	    active_markers: [],
	    active_marker_img: "http://www.joshpope.com/newimages/bullseye.png",
	    marker_img_one: "http://www.joshpope.com/newimages/arrow-1.png",
	    marker_img_two: "http://www.joshpope.com/newimages/arrow-2.png",
	    marker_img_three: "http://www.joshpope.com/newimages/arrow-3.png"
	};
$.fn.GoogleMapPortfolio.app = function(a) {
	ref = this;
	ref.setHashListener();
    ref.generate();
    ref.initialize();
    ref.setMap();
    
    return this
}
	

$.fn.GoogleMapPortfolio.app.prototype = {
    generate: function() {
        ref.container_shell = $("body").prepend("<div id='gmap'></div>");
        iOS || ref.container_shell.append('<div id="follower" style=""><a href="#" id="zoom_in">+</a> <a href="#" id="zoom_out"><span>-</span></a> <a href="#" id="road_map"></a></div>');
        ref.container_shell.append($('<div id="container"><div id="customZoom"></div></div>'))
    },
    initialize: function() {
        $.fn.GoogleMapPortfolio.private.map_options.center = new google.maps.LatLng($.fn.GoogleMapPortfolio.private.lat_long[0], $.fn.GoogleMapPortfolio.private.lat_long[1]);
        $.fn.GoogleMapPortfolio.private.defaultMap_style = new google.maps.StyledMapType($.fn.GoogleMapPortfolio.private.style_obj, {
            name: "portfolio_google_map"
        })
    },
    setHashListener: function() {
		// rather than some bulky library for this.. a simple hashchange listener 
		// to give full back/forward/reload/deep-link support
		window.onhashchange = function() {
		    if ("" == String(window.location.hash)) try {
		        ref.closeWork()
		    } catch (a) {} else
		        for (var c = 0; c < $.fn.GoogleMapPortfolio.private.urls.length; c++)
		            if (String("#" + $.fn.GoogleMapPortfolio.private.urls[c][1]) == String(window.location.hash)) {
		                google.maps.event.trigger($.fn.GoogleMapPortfolio.private.urls[c][0], "click");
		                break
		            }
		};
    },

    // this is the meat of the google maps implementation. 
    // it sets up the map, adds the pins, sets the 'bounce' time when a pin is clicked,
    // associates portfolio data with a pin, and anything else that needs to happen with the gmap api
    setMap: function() {
        $.fn.GoogleMapPortfolio.app.map = new google.maps.Map(document.getElementById("container"), $.fn.GoogleMapPortfolio.private.map_options);
        $.fn.GoogleMapPortfolio.app.map.mapTypes.set("portfolio_google_map", $.fn.GoogleMapPortfolio.private.defaultMap_style);
        $.fn.GoogleMapPortfolio.app.map.setMapTypeId("portfolio_google_map");
        $.fn.GoogleMapPortfolio.private.bounce_time = 1700;
        google.maps.event.addDomListener(window,
            "load",
            function() {
                ref.markerss = [
                	// this should be passed into via a data object or pulled from an async data request.
                	// however- my CMS outputs this data like so, using a templating engine.
                    [$.fn.GoogleMapPortfolio.private.lat_long[0], $.fn.GoogleMapPortfolio.private.lat_long[1], $.fn.GoogleMapPortfolio.private.marker_img_one, "<h3>Nike Vintage</h3>I built this site for Nike to showcase their new line of Vintage cross trainers (a reproduction shoes that are identical in design to their famous \"waffle\" shoes from the 1970's). The site was well received. And the Nike Vintage brand continues to go strong. <br/><br/>",
                        "/"+$.fn.GoogleMapPortfolio.private.baseAssetPath+"/vintage.jpg", "nike"
                    ],
                    [$.fn.GoogleMapPortfolio.private.lat_long[0] + .01, $.fn.GoogleMapPortfolio.private.lat_long[1] + .01, $.fn.GoogleMapPortfolio.private.marker_img_two,
                        "<h3>Ferdinand Center For The Creative</h3>Ferdinand Center For The Creative is a non-profit operating in the Philippines. They needed a website to showcase their work and provide information about the non-profit, and host a blog. <br/><br/><a target='_new' href='http://www.ferdinandcc.org'>Visit Ferdinandcc.org</a>", "/"+$.fn.GoogleMapPortfolio.private.baseAssetPath+"/ferdinand.jpg", "ferdinand"
                    ],
                    [$.fn.GoogleMapPortfolio.private.lat_long[0] - .042, $.fn.GoogleMapPortfolio.private.lat_long[1] + .031, $.fn.GoogleMapPortfolio.private.marker_img_two, "<h3>Yves Saint Laurent</h3>I had the privilege building the website to coincide with branding and subsequent launch party of yve saint laurent's re-release of classic <i>Opium</i> line of perfumes. The site was designed for iPad, and included a social media wall that displayed facebook and twitter feed. The site was built to generate excitement toward the launch by slowly revealing more about the product each day up to launch. <br><br>This site was temporary, but have a post-party information site - which includes several stills from the website and video footage from the event. <br/><br/><a target='_new' href='http://greatworks.com/luxurysociety/casestudies.html'>http://greatworks.com/luxurysociety/casestudies.html</a>",
                        "/"+$.fn.GoogleMapPortfolio.private.baseAssetPath+"/YSL_1.jpg", "yves"
                    ],
                    [$.fn.GoogleMapPortfolio.private.lat_long[0] - .022, $.fn.GoogleMapPortfolio.private.lat_long[1] + .035, $.fn.GoogleMapPortfolio.private.marker_img_one, "<h3>Bloomberg</h3>Built on wordpress- I developed this boutique website to showcase one of Mayor Bloombergs largest side-projects. <br/><br/><a target='_new' href='http://www.bna.com'>Visit bna.com</a>", "/"+$.fn.GoogleMapPortfolio.private.baseAssetPath+"/bna.jpg", "bloomberg"],
                    [$.fn.GoogleMapPortfolio.private.lat_long[0] - .016, $.fn.GoogleMapPortfolio.private.lat_long[1] + .055, $.fn.GoogleMapPortfolio.private.marker_img_three, "<h3>Old Spice</h3>While I was at W+K we created the web site for Old Spice. I did the majority of friend end coding and data templating. <br/><br/><a target='_new' href='http://www.oldspice.com'>Visit OldSpice.com</a>",
                        "/"+$.fn.GoogleMapPortfolio.private.baseAssetPath+"/oldspice.jpg", "oldspice"
                    ],
                    [$.fn.GoogleMapPortfolio.private.lat_long[0] - .026, $.fn.GoogleMapPortfolio.private.lat_long[1] - .08, $.fn.GoogleMapPortfolio.private.marker_img_three, "<h3>Cielo Club</h3>I worked to concept and develop the website for Cielo Club, a club in downtown Manhattan. I worked directly with the owners to conceive and develop this site using a custom WP and plugins. <br/><br/><a target='_new' href='http://www.cieloclub.com'>Visit Cieloclub.com</a>",
                        "/"+$.fn.GoogleMapPortfolio.private.baseAssetPath+"/cielo.jpg", "cielo"
                    ],
                    [$.fn.GoogleMapPortfolio.private.lat_long[0] + .01, $.fn.GoogleMapPortfolio.private.lat_long[1] - .077, $.fn.GoogleMapPortfolio.private.marker_img_three, "<h3>Coca Cola</h3>Working with StinkDigital in Manhattan, I did all of the front-end coding and cms integration for the Coke Zero <i>Make it Possible</i> campaign. Utlized isotope for a engaging, modular experience that worked great across all devices and screen <a target='_new' href='http://www.stinkdigital.com/work/coke-zero-make-it-possible-project/'>Visit makeitpossibleproject.com</a>",
                        "/"+$.fn.GoogleMapPortfolio.private.baseAssetPath+"/makeitpossible.jpg", "cocacola"
                    ]
                ];
                ref.updateMouseFollower('ready');
                var i;
                for (i = 0; i < ref.markerss.length; i++) {
                	ref.generateMapMarker([ref.markerss[i][0], ref.markerss[i][1]], ref.markerss[i][2], ref.markerss[i][3], ref.markerss[i][4], 1500 * (i + Math.random()) * Math.random(), ref.markerss[i][5]);
                }
                genericTimeout = setTimeout(function() {
                	clearTimeout(genericTimeout); // memory leaks avoided..
                    $(".gm-style").bind('click',function() {
                        "0" != $(".work").css("opacity") && ref.closeWork()
                    });
                    $("#main").delay(700).animate({
                        width: "445px",
                        opacity: "1",
                        duration: "4.5s",
                        easing: "easeInOutBack"
                    });
                    $("#subhead").delay(1E3).animate({
                        width: "545px",
                        opacity: "1",
                        duration: "4.5s",
                        easing: "easeInOutBack"
                    });
                    $("#subhead_2").delay(1500).animate({
                        width: "160px",
                        opacity: "1",
                        duration: "4.5s",
                        easing: "easeInOutBack"
                    });
                    $("#subhead_3,.github").delay(1900).animate({
                        width: "55px",
                        opacity: "1",
                        duration: "4.5s",
                        easing: "easeInOutBack"
                    })
                }, 10)
            });
        genericTimeout = setTimeout(function() {
        	clearTimeout(genericTimeout);
            ref.applyMouseActions();
            ref.applyMouseTrail()
        }, 2500)
    },
    // update the mouse trailing navigation (apply class)
    updateMouseFollower: function(state) {
    	switch (state) {
    		case 'ready' :
    			$("#follower").addClass("follower-ready");
    		break;
    		default :
    			console.error('updateMouseFollower function\s switch statement did not receive an appropriate state var');

    	}
    },

    // For every 'marker' (pin) passed into the plugin, we call this method
    // it applies the pin to the map, sets the coords, gives it a proper icon,
    // applies the intro animation (a googlemaps api defined constant), and
    // we allow the user to drag the pin if they choose (which is basically an easter egg..
    // one of a few hidden in here)

	// variable h generates a sequential, yet random, sequence for the icons to fall into view. 
	// so you'll notice that each page load has a different sequence of pins that fall onto the map
    generateMapMarker: function(b, d, c, e, h, g) { 
        var maps_marker = new google.maps.Marker({
            position: new google.maps.LatLng(b[0], b[1]), //apply the lat/long passed in with the data 
            map: $.fn.GoogleMapPortfolio.app.map, // reference to the map, for internal use
            icon: d, // icon associated with this map marker(pin)
            animation: google.maps.Animation.DROP, // init animation, drop pins from sky (out of frame, top)
            draggable: !0 // yes, why not? drag the pins around if you want
        });
        maps_marker.setVisible(!1);
        maps_marker.urlAnchor = g;
        ref.registerURL(maps_marker, g);
        genericTimeout = setTimeout(function() {
        	clearTimeout(genericTimeout);
            maps_marker.setVisible(!0)
        }, h);

        // IF A PORTFOLIO PROJECT IS OPEN, and hash tag is set
        // then we want to listen for the user to hit the escape key
        // to close the project and go back to the map view.
        $(document).keyup(function(a) {
        	// is 27(esc)? then call closeWork()- the method called on click of the project close X button
            27 == a.keyCode && ref.closeWork()
        });
        google.maps.event.addListener(maps_marker, "click", function() {
            window.location.hash = maps_marker.urlAnchor;
            ref.active = !0;
            ref.openWork();
            $(".work .text").html(c);
            $(".work-image").attr({
                src: e
            });
            $(".close").bind('click',function() {
                ref.closeWork()
            });
            maps_marker.orig_img = d;
            ref.registerActiveMarker(maps_marker);
            ref.orig_img && ref.setIcon(ref.orig_img);
            if (null != ref.getAnimation()) {
                ref.setAnimation(null);
                ref.setOptions({
                    opacity: 1
                });
                var b = this;
                genericTimeout = setTimeout(function() {
                	clearTimeout(genericTimeout);
                    b.setIcon($.fn.GoogleMapPortfolio.private.active_marker_img)
                }, 500)
            } else ref.orig_img = d, ref.setAnimation(google.maps.Animation.BOUNCE), b = this, ref.timer = setTimeout(function() {
                b.setAnimation(null);
                b.setIcon($.fn.GoogleMapPortfolio.private.active_marker_img)
            }, $.fn.GoogleMapPortfolio.private.bounce_time)
        });
        google.maps.event.addListener(maps_marker, "mouseover", function() {
            this.setAnimation(google.maps.Animation.BOUNCE);
        });
        google.maps.event.addListener(maps_marker,
            "mouseout",
            function() {
                this.setAnimation(null)
            })
    },
    openWork: function(b) {
        $(".work").fadeIn("slow", "swing")
    },
    // top right X close button for project (also activated by clicking esc)
    closeWork: function(b) {
        $(".work").fadeOut();
        window.location.hash = ""
    },
    // when a marker has been made active, from then forward- we denote that to the user via the UI 
    // by updating the marker to a double arrow. So all previously viewed projects are clearly delineated 
    registerActiveMarker: function(b) {
        $.fn.GoogleMapPortfolio.private.active_markers.push(b)
    },
    // register each url that the site handles (hash value change)
    registerURL: function(a, d) {
        $.fn.GoogleMapPortfolio.private.urls.push([a, d]);
        if (6 <= $.fn.GoogleMapPortfolio.private.urls.length && "" != String(window.location.hash)) window.onhashchange()
    },

	// apply math logic to the mouse trailing navigation so it always follows the mouse but also is
	// easily stopped and used as navigation.. some funky, but simple, maths easings
    applyMouseTrail: function() {
        var _horizontalPosition = $(window).width() / 2,
            _verticalPosition = $(window).height() / 2;
        	$(document).mousemove(function(a) {
            	_horizontalPosition = a.pageX; 	// grab precise mouse X pos
            	_verticalPosition = a.pageY		// grab precise mouse Y pos
        	});
        var _containerHorizontalPos = $("#container").width() / 2 - 60,
            _containerVerticalPos = $("#container").height() / 2 - 60;
        $(window).loop = setInterval(function() {
            !$("#follower").is(":hover") && $("body").is(":hover") && (_containerHorizontalPos += (_horizontalPosition - _containerHorizontalPos) / 12, _containerVerticalPos += (_verticalPosition - _containerVerticalPos) / 12, $("#follower").css({
                left: _containerHorizontalPos,
                top: _containerVerticalPos
            }))
        }, 30)
    },

    // Apply navigation actions
    applyMouseActions: function() {
    	// view_default: This tells us if the user has switched the styles on the map by clicking the center of floating nav
        ref.view_default = !0;
        $("#zoom_in").bind('click',function() {
            $.fn.GoogleMapPortfolio.app.map.setZoom($.fn.GoogleMapPortfolio.app.map.getZoom() + $.fn.GoogleMapPortfolio.private.zoom_level)
        });
        $("#zoom_out").bind('click',function() {
            $.fn.GoogleMapPortfolio.app.map.setZoom($.fn.GoogleMapPortfolio.app.map.getZoom() -
                $.fn.GoogleMapPortfolio.private.zoom_level)
        });

        $("#road_map").bind('click',function() {
            self.view_default ? ($.fn.GoogleMapPortfolio.app.map.setMapTypeId(google.maps.MapTypeId.TERRAIN), self.view_default = !1) : ($.fn.GoogleMapPortfolio.app.map.setMapTypeId("portfolio_google_map"), self.view_default = !0)
        })
    }
}
})(jQuery);


/* 
		classes to remember:
			mouse following controls 
				Inactive: .follower-inactive
				Active: sans inactive class
				Initialize (intro enlarge/shrink/twist): .ready
	*/