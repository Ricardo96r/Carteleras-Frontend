angular.module('SimpleRESTIonic.controllers', [])
    .constant('$ionicLoadingConfig', {
        content: '<ion-spinner></ion-spinner><br> Cargando',
        hideOnStateChange: true,
    })

    .controller('CineCtrl', function (PeliculasModel, $stateParams, $ionicLoading) {
        var vm = this;

        function getCines() {
            PeliculasModel.cines()
                .then(function (result) {
                    vm.cines = result.data;
                    $ionicLoading.hide();
                });
        }

        function getPeliculasPorCine() {
            vm.idCine = $stateParams.idCine;
            PeliculasModel.peliculasPorCine($stateParams.idCine)
                .then(function (result) {
                    vm.peliculas = result.data;
                    $ionicLoading.hide();
                });
            vm.cine = $stateParams.nombreCine;
        }

        vm.getCines = getCines;
        vm.getPeliculasPorCine = getPeliculasPorCine;

        $ionicLoading.show();
        if ($stateParams.idCine) {
            getPeliculasPorCine();
        } else {
            getCines();
        }


        function getMunicipios() {
            PeliculasModel.municipios()
                .then(function (result) {
                    vm.municipios = result.data;
                    getPorMunicipio(vm.municipios);
                });
        }

        function getPorMunicipio(municipios) {
            vm.porMunicipio = []
            for (i = 0; i < municipios.to; i++) {
                PeliculasModel.porMunicipio(municipios.data[i].direccion)
                    .then(function (result) {
                        for (j = 0; j < municipios.to; j++) {
                            if (result.data[0].direccion == municipios.data[j].direccion) {
                                vm.porMunicipio[j] = result.data;
                            }
                        }

                    });
            }
            $ionicLoading.hide();
        }

        vm.getMunicipios = getMunicipios;
        vm.getPorMuncipio = getPorMunicipio;

        getMunicipios();
    })

    .controller('BusquedaCtrl', function (CompraModel, PeliculasModel, $window, $stateParams, $ionicLoading) {
        var vm = this;

        function obtenerPeliculas() {
            $ionicLoading.show();
            PeliculasModel.todas()
                .then(function (result) {
                    vm.todas = result.data;
                    $ionicLoading.hide();
                });
        }

        function buscarRecibo(idRecibo) {
            vm.urlAction = "#/tabs/recibo/" + idRecibo + "/busqueda";
            $window.location.href = vm.urlAction;
        }

        function buscarPelicula(nombrePelicula) {
            vm.urlAction = "#/tabs/busqueda/pelicula/" + nombrePelicula;
            $window.location.href = vm.urlAction;
        }

        vm.buscarPelicula = buscarPelicula;
        vm.buscarRecibo = buscarRecibo;
        obtenerPeliculas();

    })

    .controller('PeliculaCtrl', function (PeliculasModel, $stateParams, $ionicLoading) {
        var vm = this;
        vm.fecha = 0;

        function cargando() {
            $ionicLoading.show();
        }

        function esTab() {
            if ($stateParams.busqueda) {
                vm.busqueda = "/busqueda";
            } else if ($stateParams.cine) {
                vm.busqueda = "/cine/" + $stateParams.cine;
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

        function getFechasFunciones() {
            PeliculasModel.fechasFunciones()
                .then(function (result) {
                    vm.fechas = result.data;
                });
        }

        function getFunciones() {
            if (!$stateParams.idCine) {
                PeliculasModel.funciones($stateParams.idPelicula, vm.fecha)
                    .then(function (result) {
                        vm.funciones = result.data;
                        for (let i = 0; i < vm.funciones.length; i++) {
                            vm.funciones[i].dia = new Date(vm.funciones[i].dia.replace(/-/g, "/"));
                        }
                        $ionicLoading.hide();
                    });
            } else {
                PeliculasModel.funcionesPorCine($stateParams.idPelicula, vm.fecha, $stateParams.idCine)
                    .then(function (result) {
                        vm.funciones = result.data;
                        for (let i = 0; i < vm.funciones.length; i++) {
                            vm.funciones[i].dia = new Date(vm.funciones[i].dia.replace(/-/g, "/"));
                        }
                        $ionicLoading.hide();
                    });
            }
        }

        vm.getPelicula = getPelicula;
        vm.getFunciones = getFunciones;
        vm.getFechasFunciones = getFechasFunciones;
        vm.esTab = esTab;
        cargando();
        esTab();
        getPelicula();
        getFechasFunciones();
        getFunciones();
    })

    .controller('CompraCtrl', function (PeliculasModel, CompraModel, $stateParams, $window, $ionicHistory, $ionicLoading) {
        var vm = this;

        function getPelicula() {
            $ionicLoading.show();
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
                    $ionicLoading.hide();
                });
        }

        function getCompra() {
            if ($stateParams.idCompra) {
                $ionicLoading.show();
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
                        } else if ($stateParams.cine) {
                            vm.contenidoBoton = "Regresar a cines";
                            vm.regresarUrl = "#/tabs/cine";
                        } else {
                            vm.contenidoBoton = "Regresar a carteleras";
                            vm.regresarUrl = "#/tabs/dashboard";
                        }
                        if ($stateParams.comprado) {
                            $ionicHistory.clearHistory();
                            $ionicHistory.clearCache();
                        }
                        $ionicLoading.hide();
                    });
            }
        }

        function crearCompra(nombreCliente, asientos, asientosDisponibles, idCine, idSala, funcionHora) {
            if (nombreCliente) {
                if (!isNaN(asientos)) {
                    if (asientos > 0) {
                        if (asientos <= asientosDisponibles) {
                            $ionicLoading.show();
                            CompraModel.compra(nombreCliente, asientos, idCine, idSala, funcionHora)
                                .then(function (result) {
                                    vm.compra = result.data;
                                    vm.getFuncion();
                                    vm.urlAction = "#/tabs/compra/recibo/" + vm.compra[0].Id;
                                    if ($stateParams.busqueda) {
                                        vm.urlAction += "/busqueda";
                                    } else if ($stateParams.cine) {
                                        vm.urlAction += "/cine/" + $stateParams.cine;
                                    }
                                    vm.urlAction += "/comprado";
                                    $ionicHistory.nextViewOptions({
                                        disableAnimate: true,
                                        disableBack: true
                                    });
                                    $ionicLoading.hide();
                                    $window.location.href = vm.urlAction;
                                });
                        } else {
                            vm.error = "Estas tratando de comprar " + asientos + " asiento(s) y solo hay disponibles " + asientosDisponibles + " asiento(s)";
                        }
                    } else {
                        vm.error = "Esta insertando un valor negativo o cero en el campo asientos";
                    }
                } else {
                    vm.error = "Solo valores numéricos en el campo asientos";
                }
            } else {
                vm.error = "Inserte un nombre válido.";
            }
        }

        vm.getPelicula = getPelicula;
        vm.getFuncion = getFuncion;
        vm.crearCompra = crearCompra;
        getPelicula();
        getFuncion();
        getCompra();
    })

    .controller('DashboardCtrl', function (PeliculasModel, $ionicLoading) {
        var vm = this;

        function getDestacados() {
            $ionicLoading.show();
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
            vm.porGenero = []
            for (i = 0; i < generos.total; i++) {
                PeliculasModel.porGenero(generos.data[i].id)
                    .then(function (result) {
                        for (j = 0; j < generos.total; j++) {
                            if (result.data.genero == generos.data[j].genero) {
                                vm.porGenero[j] = result.data.peliculas;
                            }
                        }
                        $ionicLoading.hide();
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

