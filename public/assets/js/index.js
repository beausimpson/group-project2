$("#check-in-btn").on("click", function(event) {
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
  }).then(function() {
    console.log("added dog to database");
    // location.reload();
  });
});

$("select").formSelect();
