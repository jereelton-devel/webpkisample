<?php

require_once("vendor/autoload.php");

use \Slim\Slim;
use \Jerry\Api;

$app = new Slim();

$app->get('/', function(){



	if(isset($_GET['getlibs']) && $_GET['getlibs'] == 'lacuna') {

		Api::getWebPkiLibsJS();

	} elseif(isset($_GET['sendsignature']) && $_GET['sendsignature'] == 'signlacuna') {

		Api::sendSignatureRequest();

	} else {

		echo "Erro ao tentar carregar as libs do Web Pki !";

	}

});

$app->run();

?>
