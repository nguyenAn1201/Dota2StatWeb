
$(document).ready( function() {
  $('#myForm').submit(function(e) {
    e.prevenDefault();
  var search_input = $('#search-bar').val();

  $.getJSON("https://api.opendota.com/api/players/166044481" , function(data) {
  	console.log(data.profile.personaname);

    $('#playerProfile').append(
        '<img src="' + data.profile.avatarmedium + '">' +
        '<h5 style="color: white"><b>' + data.profile.personaname + '</b></h5>' + 
        '<ul class="list-unstyled">' + '</li>' +
    		'<li style="color: white">Estimated MMR ' + '</li>' +
    		'<li style="color: white">' + data.mmr_estimate.estimate + '</li>' +
    	'</ul>'

    );
  });

  $.getJSON("https://api.opendota.com/api/players/166044481/wl", function(data) {
  	$('#playerProfile').append(
  		'<p style="margin-bottom:-5px ;color: white"> Win - Loss</p>' +
  		'<span style="color: green">' + data.win + 
  		'</span>' + '<span style="color: white"> - </>' + '<span style="color: red">' + data.lose + '</>'
  	);
  });
});
});





