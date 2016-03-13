angular.module('SimpleRESTIonic.controllers', [])
    .controller('CineCtrl', function () {

    })

    .controller('BusquedaCtrl', function () {

    })

    .controller('PeliculaCtrl', function (PeliculasModel, $stateParams, $rootScope) {
        var vm = this;

        function getPelicula() {
            PeliculasModel.pelicula($stateParams.id)
                .then(function (result) {
                    vm.pelicula = result.data;
                });
        }

        function getFunciones() {
            PeliculasModel.funciones($stateParams.id)
                .then(function (result) {
                    vm.funciones = result.data;
                });
        }

        vm.getPelicula = getPelicula;

        getPelicula();
        getFunciones();
    })

    .controller('CompraCtrl', function (PeliculasModel, CompraModel, $stateParams, $rootScope) {
        var vm = this;

        function getPelicula() {
            PeliculasModel.pelicula($stateParams.id)
                .then(function (result) {
                    vm.pelicula = result.data;
                });
        }

        function getFuncion() {
            CompraModel.funcion($stateParams.idHorario)
                .then(function (result) {
                    vm.funcion = result.data;
                });
        }

        vm.getPelicula = getPelicula;
        vm.getFuncion = getFuncion;
        getPelicula();
        getFuncion();
    })

    .controller('DashboardCtrl', function (PeliculasModel, $rootScope) {
        var vm = this,
            generos;

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
                    getPorGenero(vm.generos);
                });
        }

        function getPorGenero(generos) {
            for (i = 0; i < generos.length; i++) {
                PeliculasModel.porGenero(generos[i].Genero)
                    .then(function (result) {
                        if (vm.porGenero) {
                            vm.porGenero.push(result.data);
                        } else {
                            vm.porGenero = [result.data];
                        }
                    });
            }
        }

        vm.getDestacados = getDestacados;
        vm.getEstrenos = getEstrenos;
        vm.getGeneros = getGeneros;
        vm.getPorGenero = getPorGenero;
        getDestacados();
        getEstrenos();
        getGeneros();
    });

