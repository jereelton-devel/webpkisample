<?php

namespace Jerry;

class Api
{

	public static function getWebPkiLibsJS()
	{
		echo '
		<script src="http://lacuna.rest-pki.local/api/js/jquery-1.11.3.js"></script>
		<script src="http://lacuna.rest-pki.local/api/js/jquery.blockUI.js"></script>
		<script src="http://lacuna.rest-pki.local/api/js/angular.min.js"></script>
		<script src="http://lacuna.rest-pki.local/api/js/bootstrap.js"></script>
		<script src="http://lacuna.rest-pki.local/api/js/lacuna-web-pki-2.14.0.min.js"></script>
		<script src="http://lacuna.rest-pki.local/api/js/js.js"></script>
		';
	}

	public static function sendSignatureRequest()
	{
		echo "Processo de assinatura ativado";
	}

}

?>