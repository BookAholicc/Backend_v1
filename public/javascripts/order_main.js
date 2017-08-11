


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


    $.ajax({
		url: link,
		dataType: 'json',
		success: function(res){
            console.log('Success!');
        },
        error: function(){alert('Error retrieving data. Please try again later.');}
	}); 
    
    function initMap() {
        var uluru = {lat:12.9716, lng:77.59};
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 13,
          center: uluru
        });
        
        

        var contentString = '<div id="content">'+
            '<div id="siteNotice">'+
            '</div>'+
            '<h1 id="firstHeading" class="firstHeading">Uluru</h1>'+
            '<div id="bodyContent">'+
            '<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
            'sandstone rock formation in the southern part of the '+
            'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) '+
            'south west of the nearest large town, Alice Springs; 450&#160;km '+
            '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major '+
            'features of the Uluru - Kata Tjuta National Park. Uluru is '+
            'sacred to the Pitjantjatjara and Yankunytjatjara, the '+
            'Aboriginal people of the area. It has many springs, waterholes, '+
            'rock caves and ancient paintings. Uluru is listed as a World '+
            'Heritage Site.</p>'+
            '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">'+
            'https://en.wikipedia.org/w/index.php?title=Uluru</a> '+
            '(last visited June 22, 2009).</p>'+
            '</div>'+
            '</div>';

        var infowindow = new google.maps.InfoWindow({
          content: contentString
        });

        var marker = new google.maps.Marker({
          position: uluru,
          map: map,
          title: 'Uluru (Ayers Rock)'
        });
        marker.addListener('click', function() {
          infowindow.open(map, marker);
        });
      }