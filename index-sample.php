<!DOCTYPE html>
<html>
<header>
	<link href="css/bootstrap.css" rel="stylesheet"/>
	<link href="css/bootstrap-theme.css" rel="stylesheet"/>
	<link href="css/site.css" rel="stylesheet"/>
</header>
<body>

<div class="container">

	<select id="certificateSelect"></select><br><br>
	<button id="readCertButton" type="button">Read Cert</button>
	<button id="signDataButton" type="button">Sign Data</button>
	<button id="signHashButton" type="button">Sign Hash</button>
	<div id="logPanel"></div>

</div>

<script src="js/jquery-1.11.3.js"></script>
<script src="js/jquery.blockUI.js"></script>
<script src="js/bootstrap.js"></script>
<script type="text/javascript" src="js/lacuna-web-pki-2.14.0.min.js"></script>
<script type="text/javascript" src="js/js.js"></script>

</body>
</html>
