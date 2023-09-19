// Custom variables
var clickedCoord = []
var geojsonobj = {}
var HeatMapLayer,AttributeLayer,ClusterLayer,ClusterColorLayer,moveendfunction

// Define view layer
var view =  new ol.View({
    center:[11271441.918890238, 2016140.1661182125],
    zoom:5.5
    })

// Basemap layer
var basemapLayer = new ol.layer.Tile({
    source: new ol.source.Stamen({
        layer:'terrain'
    })
  })
// Layers Array
var layerArray = [basemapLayer]
// Initiating Map
var map = new ol.Map({
    target : 'mymap',
    view :view,
    layers:layerArray
})

//  1. To define a source
var drawSource = new ol.source.Vector()
// 2. To Define a style
// Skip it and let the OL use default styling
// 3. To Define a Layer
var drawLayer = new ol.layer.Vector({
    source:drawSource
})
// 4. Adding on map
map.addLayer(drawLayer)

// Initiate a draw interaction
var draw = new ol.interaction.Draw({
    type : 'Point',
    source:drawSource
})
draw.on('drawstart', function(evt){
    drawSource.clear()
})
draw.on('drawend',function(evt){
    // alert('point is added')
    clickedCoord = evt.feature.getGeometry().getFlatCoordinates() 
    $('#pointadding').modal('show');
    console.log('clicked at', evt.feature.getGeometry().getFlatCoordinates()    )
    map.removeInteraction(draw)
})

// Function that enables draw interaction

function startDrawing(){
    // add interaction to the map
    map.addInteraction(draw)
    }

// save data from to database
// function SaveDatatodb(){
//     var name = document.getElementById('userName').value;
//     var den = document.getElementById('userdensity').value;
//     var long = clickedCoord[0];
//     var lat = clickedCoord[1];
//     if (name != '' && den != '' && long != '' && lat != ''){
//         $.ajax({
//             url:'save.php',
//             type:'POST',
//             data :{
//                 username : name,
//                 userden : den,
//                 userlong : long,
//                 userlat : lat
//             },
//             success : function(dataResult){
//                 var dataResult = JSON.parse(dataResult)
//                 if (dataResult.statusCode == 200){
                    
//                     $('#pointadding').modal('hide');
//                 } else {
                    
//                 }
//             }
//         })
//     } else {
//         alert('Please fill complete information')
//     }
// }
