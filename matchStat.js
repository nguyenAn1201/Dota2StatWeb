$(document).ready( function() {

  var matchId = dismatchId; 
  
  $('#matchId').append(
    matchId
  );
  $.getJSON("https://api.opendota.com/api/matches/" + matchId, function(data) {
  console.log(data.duration);
  

  if (data.radiant_win == true) {
    $('.victory').append(
    '<h3 class="text-xs-center" style="margin-top: -25px; color: #00CD00;"><strong>Radiant Victory</strong></h3>'
    );
  } else {
    $('.victory').append(
      '<h3 class="text-xs-center" style="margin-top: -25px; color: #EE4000"><strong>Dire Victory</strong></h3>'
    );
  }
  
  $('#duration').append(
      secondsTimeSpanToHMS(2081)
    );

  if (data.skill == 1) {
    $('#skill').append(
        '<p>Normal Skill</>'
      );
  } else {
    $('#skill').append(
        '<p>High Skill</>'
      );
  }
  //Create table heading 
  $('.Radiant').append(
    '<table class="table table-inverse table-striped table-bordered table-hover">' +
    '<thead>' + 
      '<th class="text-xs-center">Hero</th>' +
      '<th class="text-xs-center">Player</th>' +
      '<th class="text-xs-center"><abbr title="Hero Level">Lv</abbr></th>' +
      '<th class="text-xs-center"><abbr title="Total Kills">K</abbr></th>' +
      '<th class="text-xs-center"><abbr title="Total Deaths">D</abbr></th>' +
      '<th class="text-xs-center"><abbr title="Total Assists">A</abbr></th>' +
      '<th class="text-xs-center"><abbr title="Total Damage dealt by player">Damage</></th>' +
      '<th class="text-xs-center"><abbr title="Total Healing by player">Healing</abbr></th>' +
      '<th class="text-xs-center"><abbr title="Total last hits and denies">LH/DN</abbr></th>' +
      '<th class="text-xs-center"><abbr title="Experience per minute/Gold per minute">XPM/GPM</abbr></th>' +
    '</thead>' +
    '<tbody class="Radiant-body">' + 
    '</tbody>'
  );


//Filling Radiant table with stat   
for (var i = 0; i < 5; i++) {
  getPortrait(data.players[i].hero_id, i, ".Radiant-body");
}

 //Table for the Dire
 $('.Dire').append(
    '<table class="table table-striped table-inverse table-bordered table-hover">' +
    '<thead>' + 
      '<th class="text-xs-center">Hero</th>' +
      '<th class="text-xs-center">Player</th>' +
      '<th class="text-xs-center"><abbr title="Hero Level">Lv</abbr></th>' +
      '<th class="text-xs-center"><abbr title="Total Kills">K</abbr></th>' +
      '<th class="text-xs-center"><abbr title="Total Deaths">D</abbr></th>' +
      '<th class="text-xs-center"><abbr title="Total Assists">A</abbr></th>' +
      '<th class="text-xs-center"><abbr title="Total Damage dealt by player">Damage</></th>' +
      '<th class="text-xs-center"><abbr title="Total Healing by player">Healing</abbr></th>' +
      '<th class="text-xs-center"><abbr title="Total last hits and denies">LH/DN</abbr></th>' +
      '<th class="text-xs-center"><abbr title="Experience per minute/Gold per minute">XPM/GPM</abbr></th>' +
    '</thead>' +
    '<tbody class="Dire-body">' + 
    '</tbody>'
  );
 
  //Filling Dire table with stat 
  for (var i =5; i < 10; i++) {
    getPortrait(data.players[i].hero_id, i, ".Dire-body");
  }



function radiantTotalKill() {
  var total =0;
  for (var i=0; i < 5; i++) {
    total += data.players[i].kills;
  }
   return total;
}

function direTotalKill() {
  var total =0;
  for (var i=5; i < 10; i++) {
    total += data.players[i].kills;
  }
  return total;
}

function privateDire(i) {
  if (data.players[i].personaname == undefined) {
    return '<td class="text-xs-center">Private</td>';
  } else {

    return '<td class="text-xs-center" style="width: 30%; color:#FF6103 ">' + data.players[i].personaname + '</td>'
  }
}

function privateRadiant(i) {
  if (data.players[i].personaname == undefined) {
    return '<td class="text-xs-center">Private</td>';
  } else {

    return '<td class="text-xs-center" style="width: 30%; color:#00EE00">' + data.players[i].personaname + '</td>'
  }
}

function secondsTimeSpanToHMS(s) {
      var h = Math.floor(s/3600); //Get whole hours
      s -= h*3600;
      var m = Math.floor(s/60); //Get remaining minutes
      s -= m*60;
      return h+":"+(m < 10 ? '0'+m : m)+":"+(s < 10 ? '0'+s : s); //zero padding on minutes and seconds
}

function getPortrait(i, u, team ){
     $.getJSON("https://raw.githubusercontent.com/odota/dotaconstants/master/json/heroes.json", function(herodata) {
       $(team).append(
         '<tr id="r1">' +
         '<td><img style="width: 35%; height: 30%; vertical-align:middle" src=http://cdn.dota2.com' + herodata[i].img + '>' + '<span class="small"> ' + herodata[i].localized_name + '</span></td>'+ privateRadiant(u) + 
         '<td class="text-xs-center">' + data.players[u].level + '</><td class="text-xs-center">' + 
         data.players[u].kills + '</><td class="text-xs-center">' + 
         data.players[u].deaths + '</><td class="text-xs-center">' +
         data.players[u].assists + '</><td class="text-xs-center">' + 
         data.players[u].hero_damage + '</><td class="text-xs-center">' +
         data.players[u].hero_healing + '</><td class="text-xs-center">' +
         data.players[u].last_hits +'/'+data.players[u].denies+'</><td class="text-xs-center">'+
         data.players[u].xp_per_min+'/'+data.players[u].gold_per_min + '</>' +
         '</tr>' 
         );
     });
}

//Google Chart function
google.charts.load('current', {'packages':['corechart','bar']});
google.charts.setOnLoadCallback(drawDireGraph);

function drawDireGraph() {
        var heroDam = [];
        var playerName = [];
        var xpm = [];
        var gpm = [];
        $.getJSON("https://api.opendota.com/api/matches/" + matchId, function(data) {
          //console.log(data.players[0].hero_damage)
          for(var i = 0; i < 10; i++){
          heroDam[i] = data.players[i].hero_damage;
          xpm[i] = data.players[i].xp_per_min;
          gpm[i] = data.players[i].gold_per_min;
          console.log(xpm[i] + '/' + gpm[i]);
        }

          for(var j = 0; j < 10; j++){
          playerName[j] = data.players[j].personaname;
        }

        var damagedata = new google.visualization.arrayToDataTable([
          ['Player', 'Hero Damage', {role:'style'}],
          [playerName[0], heroDam[0], 'stroke-width: 5'],
          [playerName[1], heroDam[1], 'stroke-width: 5'],
          [playerName[2], heroDam[2], 'stroke-width: 5'],
          [playerName[3], heroDam[3], 'stroke-width: 5'],
          [playerName[4], heroDam[4], 'stroke-width: 5'],
          [playerName[5], heroDam[5], 'stroke-width: 5'],
          [playerName[6], heroDam[6], 'stroke-width: 5'],
          [playerName[7], heroDam[7], 'stroke-width: 5'],
          [playerName[8], heroDam[8], 'stroke-width: 5'],
          [playerName[9], heroDam[9], 'stroke-width: 5']
        ]);

        var xgpmData = new google.visualization.arrayToDataTable([
          ['Player', 'XPM', 'GPM'],
          [playerName[0], xpm[0], gpm[0]],
          [playerName[1], xpm[1], gpm[1]],
          [playerName[2], xpm[2], gpm[2]],
          [playerName[3], xpm[3], gpm[3]],
          [playerName[4], xpm[4], gpm[4]],
          [playerName[5], xpm[5], gpm[5]],
          [playerName[6], xpm[6], gpm[6]],
          [playerName[7], xpm[7], gpm[7]],
          [playerName[8], xpm[8], gpm[8]],
          [playerName[9], xpm[9], gpm[9]]
        ]);

        damagedata.sort({column: 1, desc: true});        
        var damage_options = {title:'Total hero damage dealt by player',
                       width: 400,
                       height: 300,
                       bar: {groupWidth: "75%"},
                       legend: { position: "none"},
        };

        xgpmData.sort({column: 1, desc: true});
        var xgpm_options = {title:'epm, gpm',
                        width: 400, 
                        height: 300,
                        bar: {groupWidth: "75%"},
                        legend: {position: "none"},

        };

        var chart = new google.visualization.ColumnChart(document.getElementById('columnchart_div'));
        chart.draw(damagedata, damage_options);

        var chart2 = new google.visualization.ColumnChart(document.getElementById('columnchart_div2'));
        chart2.draw(xgpmData, xgpm_options);
      });
  }

  }); //getJSON


}); //(documnet).ready


