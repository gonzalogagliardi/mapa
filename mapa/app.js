


let houseAddress = document.querySelector('#address');

let addresses = document.querySelector('#addresses');

let address = document.querySelector('#id_address');
let longitud = document.querySelector('#id_longitud');
let latitud = document.querySelector('#id_latitud');

function showAddresses(){
    addresses.innerHTML = ''
    addresses.innerHTML = houseAddress.value;
    if(addressArr.length > 0){
        addressArr.forEach(houseAddress => {
           // addressName =  address.display_name.replace("'", " ")
            addresses.innerHTML +=  "<div class='results' onclick='selectAddress("
                                    +houseAddress.lat + "," + houseAddress.lon + ","  +  '"' + houseAddress.display_name + '"'  + ")'>"
                                    + houseAddress.display_name +"</div>"
                                              
        });
    }
}


function selectAddress(x,y,adr){
    address.value = adr
    longitud.value = x
    latitud.value = y
    mymap.flyTo([x,y], 15)
    marker.closePopup();
    marker.setLatLng([x,y]);
    marker.closePopup();
}


function findAddresses(){
   
    // url = "https://nominatim.openstreetmap.org/search?q="+ addressHouse.value +"&format=geojson" 
    let url = "https://nominatim.openstreetmap.org/search?format=json&limit=3&q="+ houseAddress.value
    fetch(url)
               .then(response => response.json())
               .then(data => addressArr = data)
               .then(showAddress => showAddresses())
               
 }




 //map
 let mymap = L.map('mapid').setView([-34.597792, -58.413802],8);
 

 let tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
  }).addTo(mymap);

  let marker = L.marker([51.5, -0.09]).addTo(mymap)





 //Marker touch

 marker.on('dragend', function(event){
    let position = marker.getLatLng();
    
    marker.setLatLng(position, {
        draggable: 'true',
    }).bindPopup(position).update();
    selectAddress(position.lat,position.lng ,"adr")
    
    
  });

  mymap.addLayer(marker);

  mymap.on("click", function(e){
    let lat = e.latlng.lat;
    let lng = e.latlng.lng;
    if(!marker){
        marker = L.marker(e.latlng).addTo(mymap);
        
    }
    else
    {
        marker.setLatLng(e.latlng);
    }

    

    longitud.value = lat;
    latitud.value = lng;
  });
