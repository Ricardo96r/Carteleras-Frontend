angular.module('SimpleRESTIonic.controllers', [])
    .controller('CineCtrl', function () {

    })

    .controller('DashboardCtrl', function (PeliculasModel, $rootScope) {
        var vm = this;

        function getDestacados() {
            PeliculasModel.destacados()
                .then(function (result) {
                    vm.destacados = result.data;
                });
        }

        function getEstrenos() {
            PeliculasModel.nuevos()
                .then(function (result) {
                    vm.estreno = result.data;
                });
        }

        function getGeneros() {
            PeliculasModel.generos()
                .then(function (result) {
                    vm.generos = result.data;
                });
        }

        function getPorGenero(genero) {
            PeliculasModel.porGenero(genero)
                .then(function (result) {
                    if (vm.porGenero) {
                        vm.porGenero.push(result.data);
                    } else {
                        vm.porGenero = [result.data];
                    }
                });
        }

        vm.getDestacados = getDestacados;
        vm.getEstrenos = getEstrenos;
        vm.getGeneros = getGeneros;
        vm.getPorGenero = getPorGenero;

        getDestacados();
        getEstrenos();
        getGeneros();
    });

