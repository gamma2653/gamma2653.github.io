

//Smooth Scrolling (added by Peam) from https://css-tricks.com/snippets/jquery/smooth-scrolling/ User: SquirFly
function smooth_scrolling_init() {
  $('a[href*=\\#]:not([href=\\#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });
};


function initMap() {
  var cornell = {lat: 42.449700, lng: -76.477700};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center: cornell
  });
  var mapicon = "images/bicycle.png"
  var contentStringBalch =
  '<h2 id="firstHeading">Balch Hall</h2>'+
  '<p> Cornell University </p>'+
  '<p> 600 Thurston Ave </p>' +
  '<p> Ithaca, NY 14853</p>' +
  '<p> United States </p>'
  var infowindowBalch = new google.maps.InfoWindow({
    content: contentStringBalch
  });
  var balch = new google.maps.Marker({
    position: {lat:42.453490, lng:-76.478752},
    map: map,
    title: "balch",
    icon: mapicon,
  });
  balch.addListener('click', function() {
    infowindowBalch.open(map, balch);
  });
  var contentStringKennedy =
  '<h2 id="firstHeading">Kennedy Hall</h2>'+
  '<p> Cornell University </p>'+
  '<p> 222 Tower Rd </p>' +
  '<p> Ithaca, NY 14853</p>' +
  '<p> United States </p>'
  var infowindowKennedy = new google.maps.InfoWindow({
    content: contentStringKennedy
  });
  var kennedy = new google.maps.Marker({
    position: {lat:42.447853, lng:-76.478801},
    map: map,
    title: "kennedy",
    icon: mapicon,
  });
  kennedy.addListener('click', function() {
    infowindowKennedy.open(map, kennedy);
  });
  var contentStringDairyBar =
  '<h2 id="firstHeading">Stocking Hall (Cornell Dairy Bar)</h2>'+
  '<p> Cornell University </p>'+
  '<p> 411 Tower Rd </p>' +
  '<p> Ithaca, NY 14853</p>' +
  '<p> United States </p>'
  var infowindowDairyBar = new google.maps.InfoWindow({
    content: contentStringDairyBar
  });
  var dairybar = new google.maps.Marker({
    position: {lat:42.447534, lng:-76.471235},
    map: map,
    title: "dairybar",
    icon: mapicon,
  });
  dairybar.addListener('click', function() {
    infowindowDairyBar.open(map, dairybar);
  });
  var contentStringGrumman =
  '<h2 id="firstHeading">Grumman Hall</h2>'+
  '<p> Cornell University </p>'+
  '<p> 505 Campus Rd </p>' +
  '<p> Ithaca, NY 14853</p>' +
  '<p> United States </p>'
  var infowindowGrumman = new google.maps.InfoWindow({
    content: contentStringGrumman
  });
  var grumman = new google.maps.Marker({
    position: {lat:42.445161, lng:-76.479325},
    map: map,
    title: "grumman",
    icon: mapicon,
  });
  grumman.addListener('click', function() {
    infowindowGrumman.open(map, grumman);
  });
  var contentStringStimson =
  '<h2 id="firstHeading">Olin Library (Between Olin and Stimson)</h2>'+
  '<p> Cornell University </p>'+
  '<p> 204 East Ave </p>' +
  '<p> Ithaca, NY 14853</p>' +
  '<p> United States </p>'
  var infowindowStimson = new google.maps.InfoWindow({
    content: contentStringStimson
  });
  var stimson = new google.maps.Marker({
    position: {lat:42.447789, lng:-76.483677},
    map: map,
    title: "stimson",
    icon: mapicon,
  });
  stimson.addListener('click', function() {
    infowindowStimson.open(map, stimson);
  });
};
// Never implemented
// // Used to toggle the menu on small screens when clicking on the menu button
// function myFunction() {
//   var x = document.getElementById("navDemo");
//   alert(x);
//   if (x.className.indexOf("w3-show") == -1) {
//     x.className += " w3-show";
//   } else {
//     x.className = x.className.replace(" w3-show", "");
//   }
// }
$(document).ready(function () {
  smooth_scrolling_init();
});
