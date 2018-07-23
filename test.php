<html>
  <head>
   <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
    <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
    <script type="text/javascript">
   

      ////NEED JQUERY//
      google.charts.load('current', {'packages':['corechart','bar']});
     
      //google.charts.setOnLoadCallback(drawRadiantChart);

     // google.charts.setOnLoadCallback(drawDireChart);

      google.charts.setOnLoadCallback(drawDireGraph);

      //google.charts.setOnLoadCallback(drawBarChart);

      /*function drawBarChart(){
        var heroDam = [];
        $.getJSON("https://api.opendota.com/api/matches/2756880995", function(data) {
          console.log(data.players[0].hero_damage)
          for(var i = 0; i < 10; i++){
          heroDam[i] = data.players[i].hero_damage;
          console.log(heroDam[i]);
        }
        var data = google.visualization.arrayToDataTable([
          ['Team', 'Radiant', 'Dire'],
          ['Player1', heroDam[0], heroDam[5]],
          ['Player2', heroDam[1], heroDam[6]],
          ['Player3', heroDam[2], heroDam[7]],
          ['Player4', heroDam[3], heroDam[8]]
          ]);
        var options = {
          title: 'Total tower damage dealt by role in each Team',
          chartArea: {width: '50%'},
          colors: ['#4d4dff', '#cc0000'],
          hAxis: {
            title: 'Total Damage',
          },
          vAxis: {
            title: 'Team'
          }
        };
        var chart = new google.visualization.BarChart(document.getElementById('bar_div'));
        chart.draw(data,options);
      });
      } */

    function drawDireGraph() {
        var heroDam = [];
        var playerName = [];
        $.getJSON("https://api.opendota.com/api/matches/2756880995", function(data) {
          console.log(data.players[0].hero_damage)
          for(var i = 0; i < 10; i++){
          heroDam[i] = data.players[i].hero_damage;
          console.log(data.players[0].personaname)
        }
          for(var j = 0; j < 10; j++){
          playerName[j] = data.players[j].personaname;
        }
        var data = new google.visualization.arrayToDataTable([
          ['Player', 'Tower Damage', {role:'style'}],
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

        
        var options = {title:'Total tower damage dealt by player',
                       width: 1000,
                       height: 700,
                       bar: {groupWidth: "95%"},
                       legend: { position: "none"},
        };

        var chart = new google.visualization.ColumnChart(document.getElementById('columnchart_div'));
        chart.draw(data, options);
      });
      }
    </script>
  </head>
  <body style = "background-color: #141414">
    <!--Table and divs that hold the pie charts-->
    <table class="columns">
      <tr>
        <td><div id="Radiant_chart_div" style="border: 0px solid #ccc; width: 600px;"></div></td>
        <td><div id="Dire_chart_div" style="border: 0px solid #ccc; width: 420px; height: 300px"></td></div>
      </tr>
        <td><div id="columnchart_div" style="width: 2000px; height: 500px;"></div></td>
        <td><div id = 'bar_div' style="width: 600px, height: 600px;"></div></td>
    </table>
  </body>
</html>
