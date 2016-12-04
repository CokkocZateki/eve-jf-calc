/**
 *
 */
var imageNumb = getRandomArbitrary(1, 5);

function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

$(document).ready(function(){

    // set background
    $('.bgimg').css('background-image', 'url(\'assets/media/'+imageNumb+'.jpg\')');

    // get routes data
    $.ajax({
        type: 'GET',
        dataType: 'json',
        url: './data/routes.json'
    }).done(function(returnData) {

        for(var counter in returnData.routes) {
            var routeData = returnData.routes[counter];

            $('select#routeInput').append($('<option>', {
                value: routeData.cost,
                text: routeData.start + ' -> ' + routeData.end,
                'data-start': routeData.start,
                'data-end': routeData.end,
                'data-cost': routeData.cost,
                'data-type': routeData.type,
            }));
        }
    });

    $('select, input').on('change, keyup', function(){
        event.preventDefault();

        if (!$('select#routeInput option:selected').data('start') || !$('#volumeInput').val()) {
            return false;
        }

        var routeData = $('select#routeInput option:selected');
        var coll = $('input#collateralInput').val() != '' ? $('input#collateralInput').val() : 0;

        //$('div#outputText').innerHtml("<pre>asdf \n zxcv</pre>");
        document.getElementById('outputText').innerHTML = '<div class="alert alert-success">' +
            '<pre>' +
            'Type: Private\n' +
            'Corp: XYZ Corp\n' +
            'Length: 2 weeks\n' +
            'Complete: 3 days\n' +
            'Start At: ' + routeData.data('start') + '\n' +
            'End At: ' + routeData.data('end')+ '\n' +
            'Reward: ' + routeMath(routeData)  + ' ISK\n' +
            'Collateral: ' + coll + ' ISK\n' +
            '</pre>' +
            '</div>';
    });
});

/**
 *
 * @param routeData array
 * @returns {number}
 */
function routeMath(routeData) {
    var returnData = (routeData.data('cost') * $('#volumeInput').val());

    // return data as whole number
    return Math.round(returnData);
}