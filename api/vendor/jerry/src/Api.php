<?php

namespace Jerry;

class Api
{

	public static function getWebPkiLibsJS()
	{
		return '
		<script src="http://'.$_SERVER["SERVER_NAME"].'/api/js/jquery-1.11.3.js"></script>
		<script src="http://'.$_SERVER["SERVER_NAME"].'/api/js/jquery.blockUI.js"></script>
		<script src="http://'.$_SERVER["SERVER_NAME"].'/api/js/angular.min.js"></script>
		<script src="http://'.$_SERVER["SERVER_NAME"].'/api/js/bootstrap.js"></script>
		<script src="http://'.$_SERVER["SERVER_NAME"].'/api/js/lacuna-web-pki-2.14.0.min.js"></script>
		<script src="http://'.$_SERVER["SERVER_NAME"].'/api/js/vars.js"></script>
		<script src="http://'.$_SERVER["SERVER_NAME"].'/api/js/signature-form.js"></script>
		<script src="http://'.$_SERVER["SERVER_NAME"].'/api/js/js.js"></script>
		<script src="http://'.$_SERVER["SERVER_NAME"].'/api/js/app.js"></script>
		';
	}

	public static function sendSignatureRequest()
	{
		return "Processo de assinatura ativado";
	}

}

?>