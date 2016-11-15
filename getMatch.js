$(document).ready(function() {
  $('#myForm').submit(function(e) {
    e.preventDefault();  

  var search_input = $('#search-bar').val();
  console.log(search_input);
  $.getJSON("https://api.opendota.com/api/players/" +search_input+ "/matches", function(data) {

  
    $('#result').append(
      '<table class="table table-inverse table-striped table-bordered table-hover">' +
      '<thead>' +
        '<th class="text-xs-center">Hero</th>' +
        '<th class="text-xs-center">Duration</th>' +
        '<th class="text-xs-center">Result</th>' +
        '<th class="text-xs-center">Type</th>' +
        '<th class="text-xs-center">KDA</th>' +
      '</thhead>' +
      '<tbody class="matches">' + 
      '</tbody>'
    );

/*
      $('.matches').append(
        '<tr>' +
        '<td class="text-xs-center" id="image">' + '</td>' +
        '<td class="text-xs-center">' + secondsTimeSpanToHMS(data[i].duration) + '</td>' +
        winloss(i) +  
        type(i) + 
        '<td>' + data[i].kills + "/" + data[i].deaths + "/" + data[i].assists + '</td>' +
        '</tr>'
      );
      */
    
    for (var i=0; i<10; i++) {
      
      getPortrait(data[i].hero_id, i);

     
    }

    function winloss(i) {
      if (data[i].radiant_win==true && data[i].player_slot <128) {
          return '<td class="text-xs-center"><font color="green"> WIN</font></td>';
        } else if (data[i].radiant_win==true && data[i].player_slot >=128) {
          return '<td class="text-xs-center"><font color="red"> LOSS</font> </td>';
        } else if (data[i].radiant_win==false && data[i].player_slot <128) {
          return '<td class="text-xs-center"><font color="red"> LOSS</font></td>';
        } else {
          return '<td class=text-xs-center><font color="green"> WIN</font> </td>';
        }     
    }

    function secondsTimeSpanToHMS(s) {
      var h = Math.floor(s/3600); //Get whole hours
      s -= h*3600;
      var m = Math.floor(s/60); //Get remaining minutes
      s -= m*60;
      return h+":"+(m < 10 ? '0'+m : m)+":"+(s < 10 ? '0'+s : s); //zero padding on minutes and seconds
    }

    //Determine Normal or Ranked game
    function type(i) {
       if (data[i].game_mode == 22) {  
          return '<td class="text-xs-center"> Ranked </td>';
        } else {
          return '<td class="text-xs-center"> Normal </td>';
        }
    }

    function getPortrait(i, u ){
      $.getJSON("https://raw.githubusercontent.com/odota/dotaconstants/master/json/heroes.json", function(herodata) {
        $('.matches').append(
          '<tr>' +
          '<td><img style="width: 30%; height: 20%; vertical-align:middle" src=http://cdn.dota2.com' + herodata[i].img + '>' + '<span class="small"> ' + herodata[i].localized_name + '</span></td>' +  '</td>'  + '<td>' + secondsTimeSpanToHMS(data[i].duration) + '</td>' + winloss(u) + type(u) + '<td>' + data[u].kills + "/" + data[u].deaths + "/" + data[u].assists + '</td>' +
          '</tr>' 
          );
      });
    }


    });
  });
});

