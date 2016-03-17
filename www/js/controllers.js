angular.module('SimpleRESTIonic.controllers', [])
    .controller('CineCtrl', function (PeliculasModel, $stateParams) {
        var vm = this;

        function getCines() {
            PeliculasModel.cines()
                .then(function (result) {
                    vm.cines = result.data;
                });
        }

        function getFuncionesPorCine() {
            PeliculasModel.peliculasPorCine($stateParams.idCine)
                .then(function (result) {
                    vm.peliculas = result.data;
                });
            vm.cine = $stateParams.nombreCine;
        }

        vm.getCines = getCines;
        vm.getFuncionesPorCine = getFuncionesPorCine;

        if($stateParams.idCine) {
            getFuncionesPorCine();
        } else {
            getCines();
        }
    })

    .controller('BusquedaCtrl', function (CompraModel, PeliculasModel, $window, $stateParams) {
        var vm = this;

        function buscarRecibo(idRecibo) {
            vm.urlAction = "#/tabs/recibo/" + idRecibo + "/busqueda";
            $window.location.href = vm.urlAction;
        }

        function buscarPelicula(nombrePelicula) {
            vm.urlAction = "#/tabs/busqueda/pelicula/" + nombrePelicula;
            $window.location.href = vm.urlAction;
        }

        function getBuscarPeliculas() {
            if ($stateParams.nombrePelicula) {
                PeliculasModel.buscar($stateParams.nombrePelicula)
                    .then(function (result) {
                        vm.peliculas = result.data;
                    });
                vm.busqueda = $stateParams.nombrePelicula;
            }
        }

        vm.getBuscarPeliculas = getBuscarPeliculas;
        vm.buscarPelicula = buscarPelicula;
        vm.buscarRecibo = buscarRecibo;
        getBuscarPeliculas();

    })

    .controller('PeliculaCtrl', function (PeliculasModel, $stateParams) {
        var vm = this;

        function esTab() {
            if ($stateParams.busqueda) {
                vm.busqueda = "/busqueda";
            } else if($stateParams.cine){
                vm.busqueda = "/cine/"+$stateParams.cine;
            } else {
                vm.busqueda = "";
            }
        }

        function getPelicula() {
            PeliculasModel.pelicula($stateParams.idPelicula)
                .then(function (result) {
                    vm.pelicula = result.data;
                });
            vm.titulo = $stateParams.nombrePelicula;
        }

        function getFunciones() {
            PeliculasModel.funciones($stateParams.idPelicula)
                .then(function (result) {
                    vm.funciones = result.data;
                });
        }

        vm.getPelicula = getPelicula;
        vm.esTab = esTab;
        esTab();
        getPelicula();
        getFunciones();
    })

    .controller('CompraCtrl', function (PeliculasModel, CompraModel, $stateParams, $window, $ionicHistory) {
        var vm = this;

        function getPelicula() {
            PeliculasModel.pelicula($stateParams.idPelicula)
                .then(function (result) {
                    vm.pelicula = result.data;
                });
            vm.titulo = $stateParams.nombrePelicula;
        }

        function getFuncion() {
            CompraModel.funcion($stateParams.idCine, $stateParams.funcionHora, $stateParams.idSala)
                .then(function (result) {
                    vm.funcion = result.data;
                });
        }

        function getCompra() {
            if ($stateParams.idCompra) {
                CompraModel.recibo($stateParams.idCompra)
                    .then(function (result) {
                        vm.recibo = result.data;
                        if ($stateParams.busquedaRecibo) {
                            vm.busqueda = true;
                        } else {
                            vm.busqueda = false;
                        }
                        if ($stateParams.busqueda) {
                            vm.contenidoBoton = "Regresar a busqueda";
                            vm.regresarUrl = "#/tabs/busqueda";
                        } else if($stateParams.cine) {
                            vm.contenidoBoton = "Regresar a cines";
                            vm.regresarUrl = "#/tabs/cine";
                        } else {
                            vm.contenidoBoton = "Regresar a carteleras";
                            vm.regresarUrl = "#/tabs/dashboard";
                        }
                    });
            }
        }

        function crearCompra(nombreCliente, asientos, asientosDisponibles, idCine, idSala, funcionHora) {
            if (!isNaN(asientos)) {
                if (asientos > 0) {
                    if (asientos <= asientosDisponibles) {
                        CompraModel.compra(nombreCliente, asientos, idCine, idSala, funcionHora)
                            .then(function (result) {
                                vm.compra = result.data;
                                vm.getFuncion();
                                vm.urlAction = "#/tabs/compra/recibo/" + vm.compra[0].Id;
                                if ($stateParams.busqueda) {
                                    vm.urlAction += "/busqueda";
                                } else if($stateParams.cine) {
                                    vm.urlAction += "/cine/"+$stateParams.cine;
                                }
                                $ionicHistory.nextViewOptions({
                                    disableAnimate: true,
                                    disableBack: true
                                });
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

    .controller('DashboardCtrl', function (PeliculasModel) {
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

