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
  var value = $(this).val();
  var query = "https://dog.ceo/api/breed/" + value + "/images/random ";
  $.get(query, function (data) {
    console.log(data);
    var image = data.message;
    $("#dogPic").html(`<img style="height: auto; width: auto; margin: auto; 
   display: block;" src=${image}>`);
  })

});


$("select").formSelect();

$('#search').on('click', function(){
  alert('search works')
  var search = {
    name: $('#parkName').val()
  }

  $('#parkAttendees').empty();

  $.post('/api/findDogs', search, function(results){
    console.log(results);
    results.forEach(dog => {
      $('#parkAttendees').append(`<tr><td>${dog.dogName}<td>${dog.dogBreed}</td></tr>`)
    })
  })
})

// $("button").click(function(){
//   $("div").empty();
// });