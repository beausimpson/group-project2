$("#check-in-btn").on("click", function (event) {
  event.preventDefault();

  var addDog = {
    dogName: $("#dogName")
      .val()
      .trim(),
    dogBreed: $("#dogBreed").val(),
    dogPark: $("#dogPark")
      .val()
      .trim()
  };

  console.log(addDog);

  // Send the POST request.
  $.ajax("/api/dogs", {
    type: "POST",
    data: addDog
  }).then(function () {
    console.log("added dog to database");
    // location.reload();
  });
});


$("#dogBreed").change(function (event) {
  event.preventDefault();
  var value = $(this).val();
  var query = "https://dog.ceo/api/breed/" + value + "/images/random ";
  $.get(query, function (data) {
    console.log(data);
    var image = data.message;
    $('#dogPic').html(`<img style="height: auto; width: auto; margin: auto; 
   display: block;" src=${image}>`);
  })

})


$("select").formSelect();

// google map
function initAutocomplete() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 32.7767, lng: -96.7970},
    zoom: 13,
    mapTypeId: 'roadmap'
  });

  // Create the search box and link it to the UI element.
  var input = document.getElementById('pac-input');
  var searchBox = new google.maps.places.SearchBox(input);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  // Bias the SearchBox results towards current map's viewport.
  map.addListener('bounds_changed', function() {
    searchBox.setBounds(map.getBounds());
  });

  var markers = [];
  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener('places_changed', function() {
    var places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }

    // Clear out the old markers.
    markers.forEach(function(marker) {
      marker.setMap(null);
    });
    markers = [];

    // For each place, get the icon, name and location.
    var bounds = new google.maps.LatLngBounds();
    places.forEach(function(place) {
      if (!place.geometry) {
        console.log("Returned place contains no geometry");
        return;
      }
      var icon = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };

      // Create a marker for each place.
      markers.push(new google.maps.Marker({
        map: map,
        icon: icon,
        title: place.name,
        position: place.geometry.location
      }));

      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    map.fitBounds(bounds);
  });
}
