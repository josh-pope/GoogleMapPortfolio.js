<!DOCTYPE html>
<html>
<!--

                     ___           ___           ___     
        ___         /\  \         /\__\         /\  \    
       /\__\       /::\  \       /:/ _/_        \:\  \   
      /:/__/      /:/\:\  \     /:/ /\  \        \:\  \  
     /::\  \     /:/  \:\  \   /:/ /::\  \   ___ /::\  \ 
     \/\:\  \   /:/__/ \:\__\ /:/_/:/\:\__\ /\  /:/\:\__\
      ~~\:\  \  \:\  \ /:/  / \:\/:/ /:/  / \:\/:/  \/__/
         \:\__\  \:\  /:/  /   \::/ /:/  /   \::/__/     
         /:/  /   \:\/:/  /     \/_/:/  /     \:\  \     
        /:/  /     \::/  /        /:/  /       \:\__\    
        \/__/       \/__/         \/__/         \/__/    
          ___         ___           ___         ___      
         /\  \       /\  \         /\  \       /\__\     
        /::\  \     /::\  \       /::\  \     /:/ _/_    
       /:/\:\__\   /:/\:\  \     /:/\:\__\   /:/ /\__\   
      /:/ /:/  /  /:/  \:\  \   /:/ /:/  /  /:/ /:/ _/_  
     /:/_/:/  /  /:/__/ \:\__\ /:/_/:/  /  /:/_/:/ /\__\ 
     \:\/:/  /   \:\  \ /:/  / \:\/:/  /   \:\/:/ /:/  / 
      \::/__/     \:\  /:/  /   \::/__/     \::/_/:/  /  
       \:\  \      \:\/:/  /     \:\  \      \:\/:/  /   
        \:\__\      \::/  /       \:\__\      \::/  /    
         \/__/       \/__/         \/__/       \/__/     


-->
  <head>
    <title>Josh Pope // Web developer living and working in Portland, Oregon</title>
    
    <link rel="stylesheet" media="all" href="css/styles.css">
    <link href='http://fonts.googleapis.com/css?family=Roboto+Condensed:300,400' rel='stylesheet' type='text/css'>
    <meta name="viewport" content="user-scalable=no, initial-scale=.45, maximum-scale=.65, minimum-scale=.2, width=500, height=600" />
    
    
    <script type="text/javascript" src="js/jquery.js"></script>
    <script type="text/javascript" src="js/jquery-ui.js"></script>
    <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?sensor=false"></script>
    <script type="text/javascript" src="js/GoogleMapPortfolio.js"></script>
    <meta property="og:image" content="http://www.joshpope.com/profile-photo-josh-pope.png"/>
    <meta name="description" content="Josh Pope is a Web Developer from New York City (now living in Portland, Oregon), specializing in front-end programming as well as full-stack web architecture, UX design, project management and technical direction/consulting.">
    <meta property="og:title" content="Josh Pope // Web Developer in Portland, Oregon"/>
    <meta property="og:type" content="website"/>
    <meta property="og:site_name" content="Josh Pope // Web Developer in Portland, Oregon"/>
    <meta property="og:locale" content="en_US"/>

    <meta property="og:url" content="http://www.joshpope.com"/>
    <meta property="og:description" content="Josh Pope is a Web Developer from New York City (now living in Portland, Oregon), specializing in front-end programming as well as full-stack web architecture, UX design, project management and technical direction/consulting."/>
    <meta name="keywords" content="Josh Pope, Josh Pope New York City, Web Developer, Javascript, CSS">
    
    <meta http-equiv="EXPIRES" CONTENT="never" />
    <link rel="shortcut icon" href="/jpfavicon.ico" type="image/x-icon">
    <link rel="icon" href="/jpfavicon.ico" type="image/x-icon">
    
    
    
  </head>
  <body>
<div style="position: absolute; display: block;     font-family: 'Roboto Condensed', sans-serif; background-color: rgba(222, 222, 222, .6); color: black;â€
 id="title-cardâ€></div>
	<div class="work">
      <div class="close" alt="Hit Escape or Click here to close this project" title="Hit Escape or Click here to close this project">
        X
      </div>
      <img class="work-image" src="">
      <div class="text">
      </div>
  </div>
  <span id="main">
    JOSH POPE
  </span>
  
  <span id="subhead" >
    Web developer living and working in <span style="text-decoration:line-through;">New York City</span> Portland, Oregon
  </span>
  <span id="subhead_2">
    <a href="mailto:joshwpope@gmail.com">
      joshwpope@gmail.com
    </a>
  </span>
 <!-- <span id="subhead_3">
    <a href="/Josh-Pope-Resume.pdf" target="_new">
      Resume
    </a>
  </span>-->
  
  <span id="subhead_3" class="github" >
    <a href="http://github.com/josh-pope" target="_new" >
      GitHub
    </a>
  </span>
  <span id="subhead_4" class="github" style="opacity: 0;max-width:54px;margin-left:78px">
    <a href="http://www.linkedin.com/in/joshpope" target="_new">
      LinkedIn
    </a>
  </span>
  <script type="text/javascript">
    
    
  $(document).ready(function() {

  $("body").GoogleMapPortfolio({
    // set the lat/long of the default center
    lat_long: [40.747517, -73.912582], //40.747517,-73.912582
    // default zoom number
    zoom_level: 1,

    // this is the initial style object the google map will use
    // the 'easter egg' toggle (clicking center of mouse trailing nav) uses google maps
    // default styles (toggling functionality)
    style_obj: [{
      stylers: [{
        invert_lightness: true
      }, {
        saturation: -47
      }, {
        gamma: 1.76
      }, {
        visibility: "simplified"
      }]
    }, {
      stylers: [{
        hue: "#00ddff"
      }, {
        saturation: -95
      }, {
        lightness: -26
      }, {
        gamma: 0.94
      }, {
        visibility: "on"
      }]
    }, {
      featureType: "transit.stations",
      elementType: "labels",
      stylers: [{
        visibility: "off"
      }]
    }, {
      featureType: "road.local",
      elementType: "labels",
      stylers: [{
        visibility: "on"
      }]
    }, {
      featureType: "road",
      elementType: "labels",
      stylers: [{
        visibility: "on"
      }]
    }, {
      featureType: "road.arterial",
      elementType: "labels",
      stylers: [{
        visibility: "on"
      }]
    }],
    // default options for the google map as 
    map_options: {
      zoom: 12, 
      panControl: false, // remove the google maps zoom/pan slider controls
      zoomControl: false, // remove the google maps zoom/pan slider controls
      disableDefaultUI: true,
      mapTypeControlOptions: {
        mapTypeIds: [google.maps.MapTypeId.TERRAIN]
      }
    }
  });
});


  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-12758985-2', 'auto');
  ga('require', 'linkid', 'linkid.js');

  ga('send', 'pageview');

</script>
  <div id="preloaded-images">
    <img src="http://www.joshpope.com/newimages/arrow-1.png" width="1" height="1" alt="Image 01" />
    <img src="http://www.joshpope.com/newimages/arrow-2.png" width="1" height="1" alt="Image 02" />
    <img src="http://www.joshpope.com/newimages/arrow-3.png" width="1" height="1" alt="Image 03" />
    <img src="http://www.joshpope.com/newimages/bullseye.png" width="1" height="1" alt="Image 04" />
  </div>
  </body>
</html>
