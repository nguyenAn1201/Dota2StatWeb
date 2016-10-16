$(document).ready(function() {
	$.ajax({
		url: "https://api.opendota.com/api/matches/2702244240"
	}).then(function(data) {
		$('.match-id').append(data.match_id);
		$('.duration').append(data.duration);
		$('.kills').append(data.kills)
	})
});