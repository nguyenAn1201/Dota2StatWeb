$.ajax({
	url: 'https://api.steampowered.com/IDOTA2Match_570/GetMatchHistory/V001/?key=17F8FFF1EEB567E26393742D9DC47132&account_id=76561198012171408',
	data: {
		format: 'json'
	},
	error: function() {
		$(#info).html('<p>An error has occurred</p>');
	},
	dataType: 'jsonp',
	success: function(data) {
		var $title = $('<h1>').text(data.talks[0].talk_title);
		var $description = $('<p>.text(data.talk[0].talk_description');
		$('#info')
			.append($title)
			.append($descriptionn);
	},
	type: 'GET'
});