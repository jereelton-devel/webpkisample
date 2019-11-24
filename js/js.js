// ------------------------------------------------------------------------------------------
// LacunaWebPKI: first example

var licenseWebPki = 'ASYAanNmaWRkbGUubmV0LHdlYnBraS5sYWN1bmFzb2Z0d2FyZS5jb20AAAABClKvO1J22vAD+YmfANiKQLbcLE1lNraPKCel6tRM+ZxR+h6M/crtJYRRVGGz7hrdbM0Y0mfTu15RMYGqQMi1QNZS6GrT4vNzIayv552Fl0EFWQA7jWlctUwfYoHRHVEnCNx9YGXDiA9+yDoGlVwgTR7fjzNeS3Fen1MVIyKBF464gN0JvdiCRJMI47JGVDkPmKjcrYIvJs6y5Lg25RW4ZnBKVruS+HR2s3k8ZrV4y4RCQE4UYMKbukF9vsF+JqAEifRlPq2xLcrNdxBveVDSXS/LRHAcrZrMM+Iw4A79jl0ngWPcy+CwinAhT+3dxVo5ZWMRQFpmTkylEMDvTjV9wQ==';

var pki = new LacunaWebPKI(licenseWebPki);

function start() {
    log('Initializing component ...');
    pki.init(onWebPkiReady);
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

function onWebPkiReady () {

    log('Component ready.');
    
    pki.listCertificates().success(function (certs) {
        
        log('Listing certificates ...');

        var select = $('#certificateSelect');
        $.each(certs, function() {
            
            if(new Date() > this.validityEnd) {
                this.validityEnd = this.validityEnd.toLocaleDateString() + ' [EXPIRADO]';
            } else {
                this.validityEnd = this.validityEnd.toLocaleDateString();
            }

            select.append(
                $('<option />')
                .val(this.thumbprint)
                .text(this.subjectName + '(emitido por ' + this.issuerName + ') em ' + this.validityEnd)
            );
        });
        
        log(certs.length + ' certificates found.');

        $.unblockUI();

    });
}

function readCert() {
    var selectedCertThumb = $('#certificateSelect').val();
    log('Reading certificate: ' + selectedCertThumb);
    pki.readCertificate(selectedCertThumb).success(function (certEncoding) {
        log('Result: ' + certEncoding);
    });
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

