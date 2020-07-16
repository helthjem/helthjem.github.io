var map;
var lat1 = -25.344;
var lng1 = 131.036;
var lat2 = -25.344;
var lng2 = 131.036;
var lat3 = -25.344;
var lng3 = 131.036;
var info;

function submitForm(e, form){
  e.preventDefault();

  const proxyurl = "https://cors-anywhere.herokuapp.com/";
  const url2 = 'https://ws.di.no/ws/json/freightcoverage/v-1/servicepoints'

  var raw = JSON.stringify({"shopId":"1","transportSolutionId":"11", "customerName": "Ken", "countryCode": "NO", "address": form.formAddress.value, "zipCode": form.formZip.value, "postalName": form.formPostal.value, "co": "", "weight": "1000", "volume":""});

  var raw2 = JSON.stringify({"shopId":"1","transportSolutionId":"11", "countryCode": "NO", "streetAddress": form.formAddress.value, "zipCode": form.formZip.value, "postalName": form.formPostal.value});

  var requestOptions2 = {
  method: 'POST',
  headers: new Headers({
     'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ3c2RpdGVzdCIsImlhdCI6MTU5NDg4ODcwNCwiZXhwIjoxNTk0OTc1MTA0LCJ1c2VySWQiOiIzODUwMiIsInJvbGVzIjpbXSwiY3VzdG9tZXJTeXN0ZW1zIjpbMTY2NV0sImZsb3dTaG9wcyI6WzEsMjIzLDIyNCw0MjcsNDI4XSwid2ViU2VydmljZXMiOlsibm8uZGkud3MuanNvbi5jb250cm9sbGVycy5GbG93Qm9va2luZyIsIm5vLmRpLndzLmpzb24uY29udHJvbGxlcnMuRmxvd0xhYmVsIiwibm8uZGkud3MuanNvbi5jb250cm9sbGVycy5UcmFuc3BvcnRJbmZvcm1hdGlvbiIsIm5vLmRpLndzLmpzb24uY29udHJvbGxlcnMuRXZlbnRMb2cucmVhZCIsIm5vLmRpLndzLmpzb24uY29udHJvbGxlcnMuRmxvd1NlcnZpY2VQb2ludCIsIm5vLmRpLndzLmpzb24uY29udHJvbGxlcnMuRnJlaWdodENvdmVyYWdlRm9yWmlwIl19.CoTJm_uM6Q0h_xC0ZRWWNVY1tAzyPpAMk8t37YUuwjPPMCOBJyhBFczHScISK3OJvoX78aTg2FIl1sfRxEqJtg',
     'Content-Type': 'application/json'
   }),
  body: raw2,
  redirect: 'follow'
  };

  fetch(proxyurl + url2, requestOptions2)
  .then(function(response) {
      return response.json()
    })
  .then(data => {
    lat1 = data.freightProducts[0].servicePoints[0].servicePointCoordinates[0].northing;
    lng1 = data.freightProducts[0].servicePoints[0].servicePointCoordinates[0].easting;
    lng2 = data.freightProducts[0].servicePoints[1].servicePointCoordinates[0].easting;
    lat2 = data.freightProducts[0].servicePoints[1].servicePointCoordinates[0].northing;
    lng3 = data.freightProducts[0].servicePoints[2].servicePointCoordinates[0].easting;
    lat3 = data.freightProducts[0].servicePoints[2].servicePointCoordinates[0].northing;
    console.log(lat1, lng1)
    console.log(lat2, lng2)
    console.log(lat3, lng3)
    var pos1 = {lat: lat1, lng: lng1};
    var pos2 = {lat: lat2, lng: lng2};
    var pos3 = {lat: lat3, lng: lng3};
    // The map, centered at Uluru
    var map = new google.maps.Map(
        document.getElementById('map'), {zoom: 13, center: pos1});
    // The marker, positioned at Uluru
    var marker = new google.maps.Marker({position: pos1, map: map, clickable: true});
    var marker2 = new google.maps.Marker({position: pos2, map: map, clickable: true});
    var marker3 = new google.maps.Marker({position: pos3, map: map, clickable: true});

    var infowindow = new google.maps.InfoWindow({
    content: data.freightProducts[0].servicePoints[0].servicePointName
    })
    var infowindow2 = new google.maps.InfoWindow({
    content: data.freightProducts[0].servicePoints[1].servicePointName
    })
    var infowindow3 = new google.maps.InfoWindow({
    content: data.freightProducts[0].servicePoints[2].servicePointName
    })
    infowindow.open(map,marker);
    infowindow2.open(map,marker2);
    infowindow3.open(map,marker3);

    })
      // The map, centered at Uluru
  .catch(function(err) {
      //Failure
      alert('Error')
    });
}

function initMap() {
  var pos1 = {lat: lat1, lng: lng1};
  var map = new google.maps.Map(
      document.getElementById('map'), {zoom: 13, center: pos1});

}
