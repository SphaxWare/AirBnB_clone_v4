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
});
