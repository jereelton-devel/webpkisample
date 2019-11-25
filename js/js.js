// ------------------------------------------------------------------------------------------
// LacunaWebPKI: first example

var licenseWebPki = 'ASYAanNmaWRkbGUubmV0LHdlYnBraS5sYWN1bmFzb2Z0d2FyZS5jb20AAAABClKvO1J22vAD+YmfANiKQLbcLE1lNraPKCel6tRM+ZxR+h6M/crtJYRRVGGz7hrdbM0Y0mfTu15RMYGqQMi1QNZS6GrT4vNzIayv552Fl0EFWQA7jWlctUwfYoHRHVEnCNx9YGXDiA9+yDoGlVwgTR7fjzNeS3Fen1MVIyKBF464gN0JvdiCRJMI47JGVDkPmKjcrYIvJs6y5Lg25RW4ZnBKVruS+HR2s3k8ZrV4y4RCQE4UYMKbukF9vsF+JqAEifRlPq2xLcrNdxBveVDSXS/LRHAcrZrMM+Iw4A79jl0ngWPcy+CwinAhT+3dxVo5ZWMRQFpmTkylEMDvTjV9wQ==';
var certificates  = null;
var pki           = new LacunaWebPKI(licenseWebPki);
var loop          = 0;

function start() {

    log('Initializing component ...');

    pki.init({
        ready: onWebPkiReady,
        defaultFail: onWebPkiFail,
        notInstalled: onWebPkiNotInstalled,
        angularScope: $scope
        //brand: appBrand
    });
    $.blockUI({
        css: {
            backgroundColor: '#FFFFFF', 
            color: '#00B088',
            padding: '40px',
            borderRadius: '10px',
        },
        message: '<h1>Aguarde...</h1>'
    });
}

function appBrand() {

    window.location.href = "index.php";
}

function onWebPkiNotInstalled (status, message) {
    alert(message + '\n\nVocê será redirecionado para a página de instalação.');
    pki.redirectToInstallPage();
}

function onWebPkiFail(ex) {
    alert(ex.userMessage + ' (' + ex.code + ')');
    log('Web PKI error originated at ' + ex.origin + ': (' + ex.code + ') ' + ex.error);
}

function onWebPkiReady () {

    log('Component ready.');
    
    pki.listCertificates().success(function (certs) {
        log('Listing certificates ...');
        var select = $('#certificateSelect');
        certificates = certs;
        $.each(certs, function() {
            
            composetext = this.subjectName + ' (emitido por ' + this.issuerName + ') em ' + this.validityEnd.toLocaleDateString();
            if(new Date() > this.validityEnd)
                composetext = "[EXPIRADO] " + composetext;

            select.append(
                $('<option />')
                .val(this.thumbprint)
                .text(composetext)
            );
        });
        log(certs.length + ' certificates found.');
        $.unblockUI();

        //if(loop < 4) { start(); loop += 1; } else { loop = 0; }

    });
}

function getSelectedCert() {
    var selectedCertThumb = $('#certificateSelect').val();
    for (var i = 0; i < certificates.length; i++) {
        var cert = certificates[i];
        if (cert.thumbprint == selectedCertThumb) {
            return cert;
        }
    }
    return null;
}

function validityEndCert() {
    var selectedCert = getSelectedCert();
    if(new Date() > selectedCert.validityEnd) {
        alert("Este certificado expirou em " + selectedCert.validityEnd.toLocaleDateString() + " !");
        return false;
    }
    return true;
}

function readCert() {
    if(validityEndCert()) {
        if(confirm("Deseja mesmo ler este certificado: " + getSelectedCert().subjectName + " ?" )) {
            var selectedCertThumb = $('#certificateSelect').val();
            log('Reading certificate: ' + selectedCertThumb);
            pki.readCertificate(selectedCertThumb).success(function (certEncoding) {
                log('Result: ' + certEncoding);
            });
        }
    }
}

function signData() {
    var selectedCertThumb = $('#certificateSelect').val();
    log('Signing data with certificate: ' + selectedCertThumb);
    pki.signData({
        thumbprint: selectedCertThumb,
        data: 'SGVsbG8sIFdvcmxkIQ==', // ASCII encoding of the string "Hello, World!", encoded in Base64
        digestAlgorithm: 'SHA-256'
    }).success(function (signature) {
        log('Result: ' + signature);
    }).fail(function(ex) {
        alert('Houve um erro ao tentar assinar o documento: ' + ex.userMessage);
    });
}

function signHash() {
    var selectedCertThumb = $('#certificateSelect').val();
    log('Signing hash with certificate: ' + selectedCertThumb);
    pki.signHash({
        thumbprint: selectedCertThumb,
        hash: '3/1gIbsr1bCvZ2KQgJ7DpTGR3YHH9wpLKGiKNiGCmG8=', // Base64 encoding of the SHA-256 digest of the ASCII encoding of the string "Hello, World!"
        digestAlgorithm: 'SHA-256'
    }).success(function (signature) {
        log('Result: ' + signature);
    });
}

function log(message) {
    $('#logPanel').append('<p>' + message + '</p>');
    if (window.console) {
        window.console.log(message);
    }    
}

$(function() {
    $('#readCertButton').click(readCert);
    $('#signDataButton').click(signData);
    $('#signHashButton').click(signHash);
    start();
});

angular.module("meuModulo",[])
.controller("indexController", function($scope){
    $scope.name    = "Sistema Lacuna + AngularJS";
    $scope.content = "Pequeno Modulo criado com AngularJS para exemplificar o funcionamento.";
});

