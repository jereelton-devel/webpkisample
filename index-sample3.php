<!DOCTYPE html>
<html ng-app="appWebPkiAngular_Module">

<head>
    <title>Authentication</title>

	<?php
		
	//Carregamento de client-libs js web pki
	$url  = "http://lacuna.rest-pki.local/api/?getlibs=lacuna";
	$init = curl_init($url);

	curl_setopt($init, CURLOPT_RETURNTRANSFER, 1);
	curl_setopt($init, CURLOPT_SSL_VERIFYPEER, 0);
	curl_setopt($init, CURLOPT_URL, $url);

	$getlibs_response = curl_exec($init);
	echo $getlibs_response;

	curl_close($init);

	$token = "ABCDEFGHIJLMNOPQRSTUVXZ0123456789";

	?>

	<link href="css/bootstrap.css" rel="stylesheet"/>
	<link href="css/bootstrap-theme.css" rel="stylesheet"/>
	<link href="css/site.css" rel="stylesheet"/>
</head>

<body ng-controller="appWePkiAngular_Controller">

<div class="container">

	<h1>{{name}}</h1>
	<p>{{content}}</p>

    <h2>Authentication</h2>

    <form id="authForm" action="authentication-action.php" method="POST">

        <input type="hidden" name="token" value="<?= $token ?>">

        <div class="form-group">
            <label for="certificateSelect">Choose a certificate</label>
            <select id="certificateSelect" class="form-control"></select>
        </div>

        <button id="signInButton" type="button" class="btn btn-primary">Sign In</button>
        <button id="refreshButton" type="button" class="btn btn-default">Refresh Certificates</button>

		<button id="readCertButton" type="button" class="btn btn-default">Read Cert</button>
		<button id="signDataButton" type="button" class="btn btn-default">Sign Data</button>
		<button id="signHashButton" type="button" class="btn btn-default">Sign Hash</button>

    </form>

	<div id="logPanel"></div>

</div>

</body>
</html>
