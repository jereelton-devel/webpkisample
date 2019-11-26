<!DOCTYPE html>
<html ng-app="appWebPkiAngular_Module">
<header>
	<link href="css/bootstrap.css" rel="stylesheet"/>
	<link href="css/bootstrap-theme.css" rel="stylesheet"/>
	<link href="css/site.css" rel="stylesheet"/>
</header>
<body ng-controller="appWePkiAngular_Controller">

<div class="container">

	<h1>{{name}}</h1>
	<p>{{content}}</p>

	<select id="certificateSelect"></select><br><br>
	<button id="readCertButton" type="button">Read Cert</button>
	<button id="signDataButton" type="button">Sign Data</button>
	<button id="signHashButton" type="button">Sign Hash</button>
	<div id="logPanel"></div>

</div>

<?php
	
	$url  = "http://lacuna.rest-pki.local/api/?getlibs=lacuna";
	$init = curl_init($url);
	
	curl_setopt($init, CURLOPT_RETURNTRANSFER, 1);
	//curl_setopt($init, CURLOPT_SSL_VERIFYPEER, 0);
	curl_setopt($init, CURLOPT_URL, $url);
	
	//Carregamento de client-libs js web pki
	$getlibs = "getlibs=lacuna";
	//curl_setopt($init, CURLOPT_POSTFIELDS, $getlibs);

	//Libs Pki
	$getlibs_response = curl_exec($init);
	echo $getlibs_response;

	//Processo de assinatura
	//$sendsignature = "sendsignature=signlacuna";
	//curl_setopt($init, CURLOPT_POSTFIELDS, $sendsignature);

	//Assinatura Digital
	//$sendsignature_response = curl_exec($init);
	//echo $sendsignature_response;

	curl_close($init);

?>

</body>
</html>
