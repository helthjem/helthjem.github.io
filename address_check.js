if (data.productName == 'POSTNORD_MYPACK'){
    console.log('POSTNORD')

      document.getElementById("address").innerHTML = "For " + form.formAddress.value + " is ";
      document.getElementById("name").innerHTML = data.productName;
      //document.getElementById("alt1").innerHTML = data2.productName;
      //document.getElementById("alt2").innerHTML = data2.productName;
      //document.getElementById("alt3").innerHTML = data2.productName;
} else {
    console.log('HELTHJEM')
})
