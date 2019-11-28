
// -----------------------------------------------------------------------------------------------------
// This file contains logic for calling the Web PKI component. It is only an example, feel free to alter
// it to meet your application's needs.
// -----------------------------------------------------------------------------------------------------
var signatureForm = (function() {

    // Auxiliary global variables.
    var token = null;
    var formElement = null;
    var selectElement = null;

    // Create an instance of the LacunaWebPKI object.
    var pki = new LacunaWebPKI(_webPkiLicense);

    // -------------------------------------------------------------------------------------------------
    // Initializes the signature form.
    // -------------------------------------------------------------------------------------------------
    function init(args) {

        token = args.token;
        formElement = args.form;
        selectElement = args.certificateSelect;

        // Wireup of button clicks.
        args.signButton.click(sign);
        args.refreshButton.click(refresh);

        // Block the UI while we get things ready.
        blockUI();

        // Call the init() method on the LacunaWebPKI object, passing a callback for when the component
        // is ready to be used and another to be called when an error occurs on any of the subsequent
        // operations. For more information, see:
        // http://docs.lacunasoftware.com/en-us/articles/web-pki/get-started.html
        // http://webpki.lacunasoftware.com/Help/classes/LacunaWebPKI.html#method_init
        pki.init({
            ready: loadCertificates, // As soon as the component is ready we'll load the certificates.
            defaultError: onWebPkiError, // Generic error callback.
            restPkiUrl: _restPkiEndpoint
        });
    }

    // -------------------------------------------------------------------------------------------------
    // Function called when the user clicks the "Refresh" button.
    // -------------------------------------------------------------------------------------------------
    function refresh() {
        // Block the UI while we load the certificates.

        blockUI();
        // Invoke the loading of the certificates.
        loadCertificates();
    }

    // -------------------------------------------------------------------------------------------------
    // Function that loads the certificates, either on startup or when the user clicks the "Refresh"
    // button. At this point, the UI is already blocked.
    // -------------------------------------------------------------------------------------------------
    function loadCertificates() {

        // Call the listCertificates() method to list the user's certificates. For more information see:
        // http://webpki.lacunasoftware.com/Help/classes/LacunaWebPKI.html#method_listCertificates
        pki.listCertificates({

            // The ID of the <select> element to be populated with the certificates.
            selectId: selectElement.attr('id'),

            // Function that will be called to get the text that should be displayed for each option.
            selectOptionFormatter: function (cert) {
                var s = cert.subjectName + ' (issued by ' + cert.issuerName + ')';
                if (new Date() > cert.validityEnd) {
                    s = '[EXPIRADO] ' + s;
                }
                return s;
            }

        }).success(function () {

            // Once the certificates have been listed, unblock the UI.
            $.unblockUI();
        });

    }

    // -------------------------------------------------------------------------------------------------
    // Function called when the user clicks the "Sign" button.
    // -------------------------------------------------------------------------------------------------
    function sign() {

        // Block the UI while we perform the signature.
        blockUI();

        // Get the thumbprint of the selected certificate.
        var selectedCertThumbprint = selectElement.val();

        // Call signWithRestPki() on the Web PKI component passing the token received from REST PKI
        // and the certificate selected by the user.
        pki.signWithRestPki({
            token: token,
            thumbprint: selectedCertThumbprint
        }).success(function() {
            // Once the operation is completed, we submit the form.
            formElement.submit();
        });
    }

    // -------------------------------------------------------------------------------------------------
    // Function called if an error occurs on the Web PKI component.
    // -------------------------------------------------------------------------------------------------
    function onWebPkiError(message, error, origin) {
        // Unblock the UI.
        $.unblockUI();
        // Log the error to the browser console (for debugging purposes).
        if (console) {
            console.log('An error has occurred on the signature browser component: ' + message, error);
        }
        // Show the message to the user. You might want to substitute the alert below with a more
        // user-friendly UI component to show the error.
        alert(message);
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

    function blockUI() {
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

    return {
        init: init
    };

})();
