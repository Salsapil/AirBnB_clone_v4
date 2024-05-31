$(document).ready(() => {
    let amenities_ids = []
    let amenities_names = []
    $(".amenities ul input").on('click', function (params) {
        if ($(this).is(':checked')) {
            amenities_names.push($(this).parent().attr('data-name'));
            amenities_ids.push($(this).parent().attr('data-id'));
        } else {
            let q = amenities_names.indexOf($(this).parent().attr('data-name'))
            let i = amenities_ids.indexOf($(this).parent().attr('data-id'))

            amenities_names.splice(q, 1)
            amenities_ids.splice(i, 1)
        }
        if (amenities_names.length > 0) {
            $('.amenities h4').text(amenities_names.join(', '));

        } else {
            $('.amenities h4').html('&nbsp;');

        }
        // console.log(amenities_ids)
        // console.log(amenities_names)
    })

});