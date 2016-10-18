
$(document).ready(function() {
  $('#search-button').click(function() {
    var search_input = $('#search-bar').val();

    $.getJSON("https://api.opendota.com/api/players/" +search_input+ "/matches", function(data) {
      var tr;
      //Adding table head
      $('#table-head').append("<th> Hero </th><th> Duration </th><th> Result </th><th> Type </th><th> KDA </th>");
      
      //Filling dank table
      for (var i=0; i < 10;i++) {
        tr = $('<tr/>');
        tr.append("<td>" + data[i].hero_id + "</td>");
        tr.append("<td>" + secondsTimeSpanToHMS(data[i].duration) + "</td>");
        tr.append("<td>" + data[i].radiant_win + "</td>");

        if (data[i].game_mode == 22) {
          tr.append("<td> Ranked </td>");
        } else {
          tr.append("<td> Normal </td>");
        }
        tr.append("<td>" + data[i].kills + "/" + data[i].deaths + "/" + data[i].assists);
        
        $('.table').append(tr);
      }  
    });
  })

  //Function to convert 4digits seconds into hh:mm:ss format
  function secondsTimeSpanToHMS(s) {
    var h = Math.floor(s/3600); //Get whole hours
    s -= h*3600;
    var m = Math.floor(s/60); //Get remaining minutes
    s -= m*60;
    return h+":"+(m < 10 ? '0'+m : m)+":"+(s < 10 ? '0'+s : s); //zero padding on minutes and seconds
}
secondsTimeSpanToHMS(125);
});