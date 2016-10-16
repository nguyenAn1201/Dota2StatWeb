$matches = $_GET['matches'];
$acct = $_GET['accountid'];
$APIKEY =;

$steamurl = "https://api.steampowered.com/IDOTA2Match_570/GetMatchHistory/V001/?format=JSON&key=$APIKEY&account_id=76561198012171408&matches_requested=5"
$json_object= file_get_contents($steamurl);
header('Content-Type: application/json');
echo $json_object;