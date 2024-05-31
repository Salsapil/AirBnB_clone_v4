$(document).ready(() => {
    // let list = ["sdaff", "asdfdsaf", "asdfdsaf sdafads"]
    let list = []
    $("ul input").on('click', function (params) {
        if ($(this).is(':checked')) {
            list.push($(this).parent().attr('data-name'));
        } else {
            let q = list.indexOf($(this).parent().attr('data-name'))

            list.splice(q, 1)
        }
        console.log(list);
        if (list.length > 0) {
            $('.amenities h4').text(list.join(', '));

        } else {
            $('.amenities h4').html('&nbsp;');

        }
    })

});