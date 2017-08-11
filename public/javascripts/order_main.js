


'use strict';

//code used earlier using cors
/*
code below was used earlier

function ConsoleManager() {

	console.log("getting Orders making ajax req");

	var getOrdersReq = createCORSRequest('POST','https://us-central1-bookaholic-786.cloudfunctions.net/getUndeliveredOrders');
	if (!getOrdersReq) {
  			throw new Error('CORS not supported');
	}

	 getOrdersReq.onload = function() {
    	var text = xhr.responseText;
  			  console.log("Got response "+text);
 		 
 	 };

 		 getOrdersReq.onerror = function() {
  		  	alert('Woops, there was an error making the request.');
  		};

  		getOrdersReq.send();
	// Init Map 


};

  function initMap() {
  	console.log("Initing Map");
        var uluru = {lat:12.9716, lng:77.59};
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 13,
          center: uluru
        });
        var marker = new google.maps.Marker({
          position: uluru,
          map: map
        });
      };








window.onload = function (event){
    console.log('Initializing Admin manager');
    window.console_manager = new ConsoleManager();
};
//https://www.html5rocks.com/en/tutorials/cors/#toc-making-a-cors-request

function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();
	// xhr.setRequestHeader(“Access-Control-Allow-Origin”, “https:us-central1-bookaholic-786.cloudfunctions.net”);
	// xhr.setRequestHeader(“Access-Control-Allow-Credentials”, “true”);
	// xhr.setRequestHeader(“Access-Control-Allow-Methods”, “GET”);
  if ("withCredentials" in xhr) {

    // Check if the XMLHttpRequest object has a "withCredentials" property.
    // "withCredentials" only exists on XMLHTTPRequest2 objects.
    xhr.open(method, url, true);

  } else if (typeof XDomainRequest != "undefined") {

    // Otherwise, check if XDomainRequest.
    // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
    xhr = new XDomainRequest();
    xhr.open(method, url);

  } else {

    // Otherwise, CORS is not supported by the browser.
    xhr = null;

  }
  return xhr;
}

*/

var link = 'https://us-central1-bookaholic-786.cloudfunctions.net/getUndeliveredOrders';
var locations;

    $.ajax({
		url: link,
		dataType: 'json',
		success: function(res){
            console.log('Success!');
            locations = res;
            initMap();
        },
        error: function(){alert('Error retrieving data. Please try again later.');}
	}); 
    
    function initMap() {
            var map;
            var bounds = new google.maps.LatLngBounds();
            var mapOptions = {
                mapTypeId: 'roadmap'
            };

            // Display a map on the web page
            map = new google.maps.Map(document.getElementById("map"), mapOptions);
            map.setTilt(50);

            // Multiple markers location, latitude, and longitude
        var markers = [];
        for (var i=0; i<locations.orders.length; i++){
            markers[i] = [];
            markers[i].push(locations.orders[i].firstName + locations.orders[i].lastName);
            markers[i].push(locations.orders[i].orderLat);
            markers[i].push(locations.orders[i].orderLon);
        }
        console.log(markers);

            // Info window content
        var infoWindowContent = [];
        for (var i=0; i<locations.orders.length; i++){
            var details = locations.orders[i];
            infoWindowContent[i]= [];
            var products = '';
            for (var j = 0; j<details.products.length;j++) {
                products += 'Product Name: '+details.products[j].productName + ' <br>';
                products += '<img src="' + details.products[j].imageURL+'" width="100"><br>';
                products += 'Pid: ' +details.products[j].pid + ' <br>';
                products += 'Amount: '+details.products[j].amountForWindow + '<br><br>';
            }
            infoWindowContent[i].push('<div class="info_content">' +
                '<h3>'+details.firstName+' '+details.lastName+'</h3>' +
                '<p>User Id: '+ details.userId +'<br><br><u>Products ordered:</u><br>'+products+'-----<br>Total Amount: '+details.amount+'</p>' + '</div>');
        }

            // Add multiple markers to map
            var infoWindow = new google.maps.InfoWindow(), marker, i;

            // Place each marker on the map  
            for( i = 0; i < markers.length; i++ ) {
                var position = new google.maps.LatLng(markers[i][1], markers[i][2]);
                bounds.extend(position);
                marker = new google.maps.Marker({
                    position: position,
                    map: map,
                    title: markers[i][0]
                });

                // Add info window to marker    
                google.maps.event.addListener(marker, 'click', (function(marker, i) {
                    return function() {
                        infoWindow.setContent(infoWindowContent[i][0]);
                        infoWindow.open(map, marker);
                    }
                })(marker, i));

                // Center the map to fit all markers on the screen
                map.fitBounds(bounds);
            }

            // Set zoom level
            var boundsListener = google.maps.event.addListener((map), 'bounds_changed', function(event) {
                google.maps.event.removeListener(boundsListener);
            });
        // Load initialize function
        google.maps.event.addDomListener(window, 'load', initMap);
      }