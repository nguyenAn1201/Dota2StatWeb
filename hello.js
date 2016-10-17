 /*$(document).ready(function() {
	$.ajax({
		url: "https://api.opendota.com/api/matches/2702244240"
	}).then(function(data) {

		$('.match-id').append(data.match_id);
		$('.duration').append(data.duration);
		$('.kills').append(data.kills)
	})

}); */

$(document).ready(function(){
	 $.getJSON('https://api.opendota.com/api/matches/2702244240', function (data) {
      console.log(data);

      var players = data.players.map(function (data) {
        return item.key + ': ' + item.value;
      });


      if (players.length) {
        
       	
        $('.match-id').append(data.match_id);

      }
    });
});

