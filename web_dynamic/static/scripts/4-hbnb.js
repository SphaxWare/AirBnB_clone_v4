$(document).ready(() => {
  const amenities = {};
  $('input[type="checkbox"]').change(function() {
    if ($(this).is(":checked")) {
      amenities[$(this).data("id")] = $(this).data("name");
    } else {
      delete amenities[$(this).data("id")];
    }
    $(".amenities h4").text(Object.values(amenities).join(", "));
  });
  $.getJSON("http://0.0.0.0:5001/api/v1/status/", function(data) {
    if (data.status === "OK") {
      $("#api_status").addClass("available");
    } else {
      $("#api_status").removeClass("available");
    }
  });
  $("button").click(() => {
    $.ajax("http://0.0.0.0:5001/api/v1/places_search/", {
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify({}),
      success: (data) => {
        $.each(data, function (key, value) {
          $.getJSON(
            "http://0.0.0.0:5001/api/v1/users/" + value.user_id,
            (res) => {
              $("section.places").append(
                "<article>" +
                  "<div class='title_box'>" +
                  "<h2>" +
                  value.name +
                  "</h2>" +
                  "<div class='price_by_night'>" +
                  "$" +
                  value.price_by_night +
                  "</div>" +
                  "</div>" +
                  "<div class='information'>" +
                  "<div class='max_guest'>" +
                  value.max_guest +
                  " Guest" +
                  "</div>" +
                  "<div class='number_rooms'>" +
                  value.number_rooms +
                  `${value.number_rooms == 1 ? " Bedroom" : " Bedrooms"}` +
                  "</div>" +
                  "<div class='number_bathrooms'>" +
                  value.number_bathrooms +
                  `${value.number_bathrooms == 1 ? " Bathroom" : " Bathrooms"}` +
                  "</div>" +
                  "</div>" +
                  "<div class='user'>" +
                  "<b>Owner:</b>" +
                  res.first_name +
                  " " +
                  res.last_name +
                  // return `${data.first_name} ${data.last_name}`;
                  "</div>" +
                  "<div class='description'>" +
                  value.description +
                  "</div>" +
                  "</article>",
              );
            },
          );
        });
      },
    });
  });
});
