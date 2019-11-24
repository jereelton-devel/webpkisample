<!DOCTYPE html>
<html>
<header>
	<style>
		#target-test {width: 100%; margin: 0px auto;}
	</style>
</header>
<body>
<div id="target-test"></div>

<!--<script type="text/javascript" src="https://cdn.lacunasoftware.com/libs/web-pki/lacuna-web-pki-2.14.0.min.js" integrity="sha256-m0Wlj4Pp61wsYSB4ROM/W5RMnDyTpqXTJCOYPBNm300=" crossorigin="anonymous">
</script>-->

<!--Lib JS da Lacuna para manipulação do compoente Web Pki-->
<script type="text/javascript" src="js/lacuna-web-pki-2.14.0.min.js"></script>

<!--Codigo JS pessoal-->
<script type="text/javascript">

//Instancia da classe Lacuna
var license = 'ASYAanNmaWRkbGUubmV0LHdlYnBraS5sYWN1bmFzb2Z0d2FyZS5jb20AAAABClKvO1J22vAD+YmfANiKQLbcLE1lNraPKCel6tRM+ZxR+h6M/crtJYRRVGGz7hrdbM0Y0mfTu15RMYGqQMi1QNZS6GrT4vNzIayv552Fl0EFWQA7jWlctUwfYoHRHVEnCNx9YGXDiA9+yDoGlVwgTR7fjzNeS3Fen1MVIyKBF464gN0JvdiCRJMI47JGVDkPmKjcrYIvJs6y5Lg25RW4ZnBKVruS+HR2s3k8ZrV4y4RCQE4UYMKbukF9vsF+JqAEifRlPq2xLcrNdxBveVDSXS/LRHAcrZrMM+Iw4A79jl0ngWPcy+CwinAhT+3dxVo5ZWMRQFpmTkylEMDvTjV9wQ==';

var pki = new LacunaWebPKI();

//Iniciando ações sobre a classe LacunaWebPKI e configurando um callback para ações quando o componente estiver pronto e disponivel
pki.init(onWebPkiReady);

//Ações a serem executadas após o componente esta pronto
function onWebPkiReady() {
	
	//Listando certificados instalados na maquina do usuario local
	pki.listCertificates().success(function(certs) {

	    for (var i = 0; i < certs.length; i++) {

	    	var cert        = certs[i];
	        //Propriedades padrão de certificados
	        var subjectName = cert.subjectName;
	        var issuerName  = cert.issuerName;
	        var email       = cert.email;
	        var thumbprint  = cert.thumbprint;
	        var validityEnd = cert.validityEnd;
	        var pkiBrazil   = cert.pkiBrazil;
	        	//pkiBrazil.cpf: CPF do titular/responsável
	        	//pkiBrazil.cnpj: CNPJ da empresa (ou null, caso não seja um certificado de pessoa jurídica)
	        var pkiItaly    = cert.pkiItaly;
	        	//pkiItaly.codiceFiscale: codice fiscale do titular

	        var data = subjectName +"|"+ issuerName +"|"+ email +"|"+ thumbprint +"|"+ validityEnd +"|"+ pkiBrazil.cpf +"|"+ pkiBrazil.cnpj +"|"+ pkiItaly.codiceFiscale;

	        //cloneInnerHTML('target-test', data);

	        //Lendo um certificado em base64
	        pki.readCertificate(thumbprint).
	        success(function(certEncoding) {
	        	cloneInnerHTML('target-test', data +"<br />"+ certEncoding);
	        });

	    }

	}).fail(function(ex) {
		cloneInnerHTML('target-test', 'Ocorreu um erro durante o carregamento dos certificados: ' + ex.userMessage)
	});

}

function cloneInnerHTML(target, data) {
	document.getElementById(target).innerHTML += "<pre><p>" + data + "</p></pre>";
}

</script>

</body>
</html>
