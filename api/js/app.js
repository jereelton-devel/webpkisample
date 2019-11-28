
// RFEA: Recursos e Funções Especificas da Aplicação

$(document).ready(function () {
    signatureForm.init({
        token: token, //"<?= $token ?>",            // The token acquired from REST PKI.
        form: $('#authForm'),                       // The form that should be submitted when the operation is complete.
        certificateSelect: $('#certificateSelect'), // The <select> element (combo box) to list the certificates.
        refreshButton: $('#refreshButton'),         // The "refresh" button.
        signButton: $('#signInButton')              // The button that initiates the operation.
    });
});

$(function() {
    $('#readCertButton').click(readCert);
    $('#signDataButton').click(signData);
    $('#signHashButton').click(signHash);
});

angular.module("appWebPkiAngular_Module",[])
.controller("appWePkiAngular_Controller", function($scope){
    $scope.name    = "Sistema Lacuna + AngularJS";
    $scope.content = "Pequeno Modulo criado com AngularJS para exemplificar o funcionamento.";
});

