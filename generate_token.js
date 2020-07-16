

var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({"username":"wsditest","password":"qNIYOc7YR"});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("https://ws.di.no/ws/json/auth/v-3/login/1440", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
function submitForm(e, form){
  e.preventDefault();

  const proxyurl = "https://cors-anywhere.herokuapp.com/";
  const url = 'https://ws.di.no/ws/json/addressCheck/single/v-1/find'
  const url2 = 'https://ws.di.no/ws/json/freightcoverage/v-1/servicepoints'

  var raw = JSON.stringify({"shopId":"1","transportSolutionId":"11", "customerName": "Ken", "countryCode": "NO", "address": form.formAddress.value, "zipCode": form.formZip.value, "postalName": form.formPostal.value, "co": "", "weight": "1000", "volume":""});

  var raw2 = JSON.stringify({"shopId":"1","transportSolutionId":"11", "countryCode": "NO", "streetAddress": form.formAddress.value, "zipCode": form.formZip.value, "postalName": form.formPostal.value});


  var requestOptions = {
  method: 'POST',
  headers: new Headers({
     'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ3c2RpdGVzdCIsImlhdCI6MTU5NDg4ODcwNCwiZXhwIjoxNTk0OTc1MTA0LCJ1c2VySWQiOiIzODUwMiIsInJvbGVzIjpbXSwiY3VzdG9tZXJTeXN0ZW1zIjpbMTY2NV0sImZsb3dTaG9wcyI6WzEsMjIzLDIyNCw0MjcsNDI4XSwid2ViU2VydmljZXMiOlsibm8uZGkud3MuanNvbi5jb250cm9sbGVycy5GbG93Qm9va2luZyIsIm5vLmRpLndzLmpzb24uY29udHJvbGxlcnMuRmxvd0xhYmVsIiwibm8uZGkud3MuanNvbi5jb250cm9sbGVycy5UcmFuc3BvcnRJbmZvcm1hdGlvbiIsIm5vLmRpLndzLmpzb24uY29udHJvbGxlcnMuRXZlbnRMb2cucmVhZCIsIm5vLmRpLndzLmpzb24uY29udHJvbGxlcnMuRmxvd1NlcnZpY2VQb2ludCIsIm5vLmRpLndzLmpzb24uY29udHJvbGxlcnMuRnJlaWdodENvdmVyYWdlRm9yWmlwIl19.CoTJm_uM6Q0h_xC0ZRWWNVY1tAzyPpAMk8t37YUuwjPPMCOBJyhBFczHScISK3OJvoX78aTg2FIl1sfRxEqJtg',
     'Content-Type': 'application/json'
   }),
  body: raw,
  redirect: 'follow'
  };

  var requestOptions2 = {
  method: 'POST',
  headers: new Headers({
     'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ3c2RpdGVzdCIsImlhdCI6MTU5NDg4ODcwNCwiZXhwIjoxNTk0OTc1MTA0LCJ1c2VySWQiOiIzODUwMiIsInJvbGVzIjpbXSwiY3VzdG9tZXJTeXN0ZW1zIjpbMTY2NV0sImZsb3dTaG9wcyI6WzEsMjIzLDIyNCw0MjcsNDI4XSwid2ViU2VydmljZXMiOlsibm8uZGkud3MuanNvbi5jb250cm9sbGVycy5GbG93Qm9va2luZyIsIm5vLmRpLndzLmpzb24uY29udHJvbGxlcnMuRmxvd0xhYmVsIiwibm8uZGkud3MuanNvbi5jb250cm9sbGVycy5UcmFuc3BvcnRJbmZvcm1hdGlvbiIsIm5vLmRpLndzLmpzb24uY29udHJvbGxlcnMuRXZlbnRMb2cucmVhZCIsIm5vLmRpLndzLmpzb24uY29udHJvbGxlcnMuRmxvd1NlcnZpY2VQb2ludCIsIm5vLmRpLndzLmpzb24uY29udHJvbGxlcnMuRnJlaWdodENvdmVyYWdlRm9yWmlwIl19.CoTJm_uM6Q0h_xC0ZRWWNVY1tAzyPpAMk8t37YUuwjPPMCOBJyhBFczHScISK3OJvoX78aTg2FIl1sfRxEqJtg',
     'Content-Type': 'application/json'
   }),
  body: raw2,
  redirect: 'follow'
  };

  fetch(proxyurl + url, requestOptions)
  .then(function(response) {
      return response.json()
    })
  .then(data => {
      console.log(data)
      if (data.productName == 'POSTNORD_MYPACK'){
        console.log('POSTNORD')
        fetch(proxyurl + url2, requestOptions2)
        .then(function(response) {
            return response.json()
          })
          .then(data2 => {
            document.getElementById("address").innerHTML = "For " + form.formAddress.value + " is ";
            document.getElementById("name").innerHTML = data.productName + ' with service points ';
            document.getElementById("alt1").innerHTML = data2.freightProducts[0].servicePoints[0].servicePointName;
            document.getElementById("alt2").innerHTML = data2.freightProducts[0].servicePoints[1].servicePointName;
            document.getElementById("alt3").innerHTML = data2.freightProducts[0].servicePoints[2].servicePointName;
            //document.getElementById("alt2").innerHTML = data2.productName;
            //document.getElementById("alt3").innerHTML = data2.productName;

            console.log(data2)
          })
      } else {
        console.log('HELTHJEM_EXPRESS')
        document.getElementById("address").innerHTML = "For " + form.formAddress.value + " is ";
        document.getElementById("name").innerHTML = data.productName;
        document.getElementById("alt1").innerHTML = "";
        document.getElementById("alt2").innerHTML = "";
        document.getElementById("alt3").innerHTML = "";
      }

    })
  .catch(function(err) {
      //Failure
      alert('Error')
    });
}
