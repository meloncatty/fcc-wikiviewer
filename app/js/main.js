import $ from 'jquery'

var url = "https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=";
var urlArray = [];
//var searchTerm = "cats"

$(document).ready(function(){
$("#searchbox").keypress(function(event){
  if(event.which === 13){
    search($("#searchbox").val());
    }
  });
});

function clearSearch (){
  urlArray = [];
  $('.results').html('');
}

function search (searchTerm){
    clearSearch();
    $.ajax({
        type: "GET",
        url: url + searchTerm,
        contentType: "application/json; charset=utf-8",
        async: false,
        dataType: "jsonp",
        success: function (data) {
            //console.log(data)

            for(var i = 0; i < data[1].length; i++){
              $('.results').append(`<h3 class="${i}">` + data[1][i] + "</h3>");
              $('.results').append(`<p class="${i}">` + data[2][i] + "</p>");
              urlArray.push(data[3][i]);
              $(`.${i}`).on('click', function(){
                window.open(urlArray[$(this).attr("class")], '_blank');
              });
            };


              // var title = data[1][i];
              // var titleText = data[2][i];
              // var wikilink = data[3][i]

        //success: function (data, textStatus, jqXHR) {

          //  var markup = data.parse.text["*"];
          //  var blurb = $('<div></div>').html(markup);

            // remove links as they will not work
          //  blurb.find('a').each(function() { $(this).replaceWith($(this).html()); });

            // remove any references
            // blurb.find('sup').remove();
            //
            // // remove cite error
            // blurb.find('.mw-ext-cite-error').remove();
            // $('#article').html($(blurb).find('p'));

        },
        error: function (errorMessage) {
        }
    });
}
