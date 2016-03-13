angular.module('SimpleRESTIonic.controllers', [])
    .controller('CineCtrl', function () {

    })

    .controller('BusquedaCtrl', function (CompraModel, $window) {
        var vm = this;

        function buscarRecibo(idRecibo) {
            vm.urlAction = "#/tabs/busqueda/recibo/" + idRecibo;
            $window.location.href = vm.urlAction;
        }

        vm.buscarRecibo = buscarRecibo;
    })

    .controller('PeliculaCtrl', function (PeliculasModel, $stateParams, $rootScope) {
        var vm = this;

        function getPelicula() {
            PeliculasModel.pelicula($stateParams.idPelicula)
                .then(function (result) {
                    vm.pelicula = result.data;
                });
        }

        function getFunciones() {
            PeliculasModel.funciones($stateParams.idPelicula)
                .then(function (result) {
                    vm.funciones = result.data;
                });
        }

        vm.getPelicula = getPelicula;

        getPelicula();
        getFunciones();
    })

    .controller('CompraCtrl', function (PeliculasModel, CompraModel, $stateParams, $window) {
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

        function getCompra() {
            if ($stateParams.idCompra) {
                CompraModel.recibo($stateParams.idCompra)
                    .then(function (result) {
                        vm.recibo = result.data;
                    });
            }
        }

        function crearCompra(idFuncion, nombre, asientos, asientosDisponibles) {
            if (!isNaN(asientos)) {
                if (asientos > 0) {
                    if (asientos <= asientosDisponibles) {
                        CompraModel.compra(idFuncion, nombre, asientos)
                            .then(function (result) {
                                vm.compra = result.data;
                                vm.getFuncion();
                                vm.urlAction = "#/tabs/compra/recibo/" + vm.compra[0].Id;
                                $window.location.href = vm.urlAction;
                            });
                    } else {
                        vm.error = "Estas tratando de comprar " + asientos + " asiento(s) y solo hay disponibles " + asientosDisponibles + " asiento(s)";
                    }
                } else {
                    vm.error = "Esta insertando un valor negativo en el campo asientos";
                }
            } else {
                vm.error = "Solo valores numéricos en el campo asientos";
            }
        }

        vm.getPelicula = getPelicula;
        vm.getFuncion = getFuncion;
        vm.crearCompra = crearCompra;
        getPelicula();
        getFuncion();
        getCompra();
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

