$(document).ready( function() {
  var matchId = 2767913191;
  /*
  var inputBox = document.getElementById("input_box");
  inputBox.addEventListener("click", function(){
    matchId = ........
  }); */

  $.getJSON("https://api.opendota.com/api/matches/" + matchId, function(data) {
  console.log(data);
  console.log(radiantTotalKill());
  console.log(direTotalKill());

  if (data.radiant_win == true) {
    $('.victory').append(
    '<h3 class="text-xs-center" style="margin-top: -25px; color: #00CD00;"><strong>Radiant Victory</strong></h3>'
    );
  } else {
    $('.victory').append(
      '<h3 class="text-xs-center" style="margin-top: -25px; color: #EE4000"><strong>Dire Victory</strong></h3>'
    );
  }
  

  //Create table heading 
  $('.Radiant').append(
    '<table class="table table-inverse table-striped table-bordered table-hover small">' +
    '<thead>' + 
      '<th class="text-xs-center">Hero</th>' +
      '<th class="text-xs-center">Player</th>' +
      '<th class="text-xs-center">Lv</th>' +
      '<th class="text-xs-center">K</th>' +
      '<th class="text-xs-center">D</th>' +
      '<th class="text-xs-center">A</th>' +
      '<th class="text-xs-center">Damage</th>' +
      '<th class="text-xs-center">Healing</th>' +
      '<th class="text-xs-center">LH/DN</th>' +
      '<th class="text-xs-center">XPM/GPM</th>' +
    '</thead>' +
    '<tbody class="Radiant-body">' + 
    '</tbody>'
  );
  //Filling Radiant table with stat 
  for (var i =0; i < 5; i++) {
  $('.Radiant-body').append(
    '<tr>' +
    '<td class="text-xs-center">' + data.players[i].hero_id + '</td>' +
    privateRadiant(i) + 
    '<td class="text-xs-center">' + data.players[i].level + '</td>' +
    '<td class="text-xs-center">' + data.players[i].kills + '</td>' +
    '<td class="text-xs-center">' + data.players[i].deaths + '</td>' +
    '<td class="text-xs-center">' + data.players[i].assists + '</td>' +
    '<td class="text-xs-center">' + data.players[i].hero_damage + '</td>' +
    '<td class="text-xs-center">' + data.players[i].hero_healing + '</td>' +
    '<td class="text-xs-center">' + data.players[i].last_hits +'/' +data.players[i].denies+ '</td>' +
    '<td class="text-xs-center">' + data.players[i].xp_per_min +'/' +data.players[i].gold_per_min+ '</td>' +
    '</tr>'
    );
  }
 
 //Table for the Dire
 $('.Dire').append(
    '<table class="table table-striped table-inverse table-bordered table-hover small">' +
    '<thead>' + 
      '<th class="text-xs-center">Hero</th>' +
      '<th class="text-xs-center">Player</th>' +
      '<th class="text-xs-center">Lv</th>' +
      '<th class="text-xs-center">K</th>' +
      '<th class="text-xs-center">D</th>' +
      '<th class="text-xs-center">A</th>' +
      '<th class="text-xs-center">Damage</th>' +
      '<th class="text-xs-center">Healing</th>' +
      '<th class="text-xs-center">LH/DN</th>' +
      '<th class="text-xs-center">XPM/GPM</th>' +
    '</thead>' +
    '<tbody class="Dire-body">' + 
    '</tbody>'
  );
  //Filling Radiant table with stat 
  for (var i =5; i < 10; i++) {
  $('.Dire-body').append(
    '<tr>' +
    '<td class="text-xs-center">' + data.players[i].hero_id + '</td>' +
     privateDire(i) +
    '<td class="text-xs-center">' + data.players[i].level + '</td>' +
    '<td class="text-xs-center">' + data.players[i].kills + '</td>' +
    '<td class="text-xs-center">' + data.players[i].deaths + '</td>' +
    '<td class="text-xs-center">' + data.players[i].assists + '</td>' +
    '<td class="text-xs-center">' + data.players[i].hero_damage + '</td>' +
    '<td class="text-xs-center">' + data.players[i].hero_healing + '</td>' +
    '<td class="text-xs-center">' + data.players[i].last_hits +'/' +data.players[i].denies+ '</td>' +
    '<td class="text-xs-center">' + data.players[i].xp_per_min +'/' +data.players[i].gold_per_min+ '</td>' +
    '</tr>'
    );
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


  });
});


