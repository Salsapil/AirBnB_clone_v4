
$(document).ready(() => {
    let amenities_ids = []
    let amenities_names = []

    let cities_ids = []
    let cities_names = []

    let states_ids = []
    let states_names = []

    $('.locations h2 input').on('click', function (params) {
        if ($(this).is(':checked')) {
            states_names.push($(this).parent().parent().attr('data-name'));
            states_ids.push($(this).parent().parent().attr('data-id'));
        } else {
            let q = states_names.indexOf($(this).parent().attr('data-name'))
            let i = states_ids.indexOf($(this).parent().attr('data-id'))

            states_names.splice(q, 1)
            states_ids.splice(i, 1)
        }
        console.log(states_ids)
        console.log(states_names)

        $('.locations h4').text(states_names.join(', ').concat(states_names.length > 0 ? ', ' : '').concat(cities_names.join(', ')))

        if (cities_names.length == 0 && states_names.length == 0) {
            $('.locations h4').html('&nbsp;');

        }
    });

    $('.locations ul li ul li input').on('click', function (params) {
        if ($(this).is(':checked')) {
            cities_names.push($(this).parent().attr('data-name'));
            cities_ids.push($(this).parent().attr('data-id'));
        } else {
            let q = cities_names.indexOf($(this).parent().attr('data-name'))
            let i = cities_ids.indexOf($(this).parent().attr('data-id'))

            cities_names.splice(q, 1)
            cities_ids.splice(i, 1)
        }

        $('.locations h4').text(states_names.join(', ').concat(states_names.length > 0 ? ', ' : '').concat(cities_names.join(', ')))


        if (cities_names.length == 0 && states_names.length == 0) {
            $('.locations h4').html('&nbsp;');

        }
        console.log(cities_ids)
        console.log(cities_names)
    });
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
    $.ajax({
        url: "http://0.0.0.0:5001/api/v1/status/",
        crossDomain: true,
    }).done(function (data) {
        console.log(data['status'])
        if (data["status"] == "OK") {
            $('div#api_status').addClass('available')
        } else {

            $('div#api_status').removeClass('available')

        }
    }).fail(() => {
        $('div#api_status').removeClass('available')

    });





    $.ajax({
        url: "http://0.0.0.0:5001/api/v1/places_search",
        method: 'POST',
        contentType: 'application/json',
        // dataType:'application/json',

        data: JSON.stringify({}),
        crossDomain: true,
    }).done(function (data) {
        console.log("Here2")
        console.log(data);
        data.forEach(place => {

            $('section.places').append(
                `
                    <article>
				<div class="title_box">
					<h2>${place['name']}</h2>
					<div class="price_by_night">$${place['price_by_night']}</div>
				</div>
				<div class="information">
					<div class="max_guest">${place['max_guest']} Guest` + (place['max_guest'] > 1 ? 's' : '') + `</div>
					<div class="number_rooms">${place['number_rooms']} Bedroom` + (place['number_rooms'] > 1 ? 's' : '') + `</div>
					<div class="number_bathrooms">${place['number_bathrooms']} Bathroom` + (place['number_bathrooms'] > 1 ? 's' : '') + `</div>
				</div>
				
				<div class="description">
					${place['description']}
				</div>
			</article>
                    `
            )
        });

    }).fail((err) => {

        console.log(err)

    });


    $('section.filters button').on('click', (e) => {
        console.log('Button clicked');
        $.ajax({
            url: "http://0.0.0.0:5001/api/v1/places_search",
            method: 'POST',
            contentType: 'application/json',

            data: JSON.stringify({ 'amenities': amenities_ids, 'cities': cities_ids, 'states': states_ids }),
            crossDomain: true,
        }).done(function (data) {
            console.log("Here2")
            console.log(data);
            $('section.places').html('')
            data.forEach(place => {

                $('section.places').append(
                    `
                        <article>
                    <div class="title_box">
                        <h2>${place['name']}</h2>
                        <div class="price_by_night">$${place['price_by_night']}</div>
                    </div>
                    <div class="information">
                        <div class="max_guest">${place['max_guest']} Guest` + (place['max_guest'] > 1 ? 's' : '') + `</div>
                        <div class="number_rooms">${place['number_rooms']} Bedroom` + (place['number_rooms'] > 1 ? 's' : '') + `</div>
                        <div class="number_bathrooms">${place['number_bathrooms']} Bathroom` + (place['number_bathrooms'] > 1 ? 's' : '') + `</div>
                    </div>
                    
                    <div class="description">
                        ${place['description']}
                    </div>
                </article>
                        `
                )
            });

        }).fail((err) => {

            console.log(err)

        });
    })
});