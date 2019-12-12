$(onReady);

function onReady() {
    // console.log('jquery', $);
    $('#gobutton').click(getData);
}

function getData() {
    $.ajax({
        url: '/api/data',
        method: 'POST',
        data: {
            token: $('#token').val(),
        }
    }).then(function (response) {
        appendData(response);
    });
}

function appendData(data) {
    // $('.data').append(JSON.stringify(data, null, 2));
    $('.api-table').empty();
    data.map(route => {
        if (route.path != '/users/sign_in' && route.path != '/users/sign_up') {
            if (route.status == 'NOT WORKING') {
                $('.api-table').append(`
            <tr class="not">
                <td>${route.path}</td>
                <td>${route.status}</td>
            </tr>
        `)
            } else {
                if ($("input[type=checkbox]").prop(":checked")) {
                    $('.api-table').append(`
                        <tr class="working">
                            <td>${route.path}</td>
                            <td><pre>${JSON.stringify(route.data, null, 2)}</pre></td>
                        </tr>
                    `)
                } else {
                    $('.api-table').append(`
                        <tr class="working">
                            <td>${route.path}</td>
                            <td>${JSON.stringify(route.data, null, 2)}</td>
                        </tr>
                    `)
                }
            }
        }
    })
}