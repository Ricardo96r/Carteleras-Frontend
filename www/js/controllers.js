angular.module('SimpleRESTIonic.controllers', [])

    .constant('$ionicLoadingConfig', {
        content: '<ion-spinner></ion-spinner><br> Cargando',
        hideOnStateChange: true,
    })

    .controller('CrearCuentaCtrl', function (LoginModel, $stateParams, $ionicLoading, $localStorage, $state, $window) {
        var vm = this;

        function crearUsuario(nombre, email, password, passwordRepeat) {
            if (nombre) {
                if (nombre.length >= 3) {
                    if (email) {
                        if (email.length >= 6) {
                            if (password) {
                                if (password.length >= 6) {
                                    if (passwordRepeat) {
                                        $ionicLoading.show();
                                        LoginModel.postUsuario(nombre, email, password)
                                            .then(function (result) {
                                                vm.usuario = result.data;
                                                vm.error = false;
                                            }).catch(function (response) {
                                                vm.error = "Existe(n) errores(s) en la creacion de la cuenta.";
                                            })
                                            .finally(function () {
                                                $ionicLoading.hide();
                                                if (!vm.error) {
                                                    if ($stateParams.dashboard) {
                                                        $window.location.href = "#/tabs/dashboard/cuenta/login/dashboard";
                                                    } else if ($stateParams.cine) {
                                                        $window.location.href = "#/tabs/cine/cuenta/login/cine";
                                                    } else if ($stateParams.busqueda) {
                                                        $window.location.href = "#/tabs/busqueda/cuenta/login/busqueda";
                                                    } else {
                                                        $state.transitionTo("tab.login");
                                                    }
                                                }
                                            });
                                    } else {
                                        vm.error = "El campo de repetir contraseña esta vacio"
                                    }
                                } else {
                                    vm.error = "El campo passsword debe tener mas de 6 caracteres"
                                }
                            } else {
                                vm.error = "El campo contraseña esta vacio"
                            }
                        } else {
                            vm.error = "El campo email tiene muy pocos caracteres"
                        }
                    } else {
                        vm.error = "El campo email esta vacio"
                    }
                } else {
                    vm.error = "El campo nombre tiene que tener mas de 3 caracteres"
                }
            } else {
                vm.error = "El campo nombre esta vacio"
            }
        }

        vm.crearUsuario = crearUsuario;
    })

    .controller('CuentaCtrl', function (LoginModel, $scope, $stateParams, $ionicLoading, $localStorage, $ionicHistory, $state) {
        var vm = this;

        $scope.$on("$ionicView.enter", function (event, data) {
            existeTokenGuardada();
            vm.busqueda = true;
            obtenerUsuario();
        });

        function obtenerToken() {
            return $localStorage.token;
        }

        function obtenerUsuario() {
            $ionicLoading.show();
            LoginModel.getUsuario(obtenerToken())
                .then(function (result) {
                    vm.usuario = result.data[0];
                    $ionicLoading.hide();
                });
        }

        function eliminarToken() {
            $localStorage.$reset();
        }

        function existeTokenGuardada() {
            if (!$localStorage.token) {
                $ionicHistory.nextViewOptions({
                    disableAnimate: true,
                    disableBack: true
                });
                $state.transitionTo("tab.login");
            }
        }

        function cerrarSesion() {
            eliminarToken();
            $ionicHistory.nextViewOptions({
                disableAnimate: true,
                disableBack: true
            });
            $state.transitionTo("tab.login");
        }

        vm.cerrarSesion = cerrarSesion;
    })

    .controller('LoginCtrl', function (LoginModel, $stateParams, $ionicLoading, $localStorage, $state, $ionicHistory, $window, $scope) {
        var vm = this;

        $scope.$on("$ionicView.enter", function () {
            if ($localStorage.token) {
                if ($stateParams.dashboard) {
                    $window.location.href = "#/tabs/dashboard";
                } else if ($stateParams.cine) {
                    $window.location.href = "#/tabs/cine";
                } else if ($stateParams.busqueda) {
                    $window.location.href = "#/tabs/busqueda";
                } else {
                    $state.transitionTo('tab.cuenta')
                }
            }
        });

        function getLoginToken(email, password) {
            return "Basic ".concat(btoa(email + ":" + password));
        }

        function eliminarToken() {
            $localStorage.$reset();
        }

        function guardarToken(email, password) {
            $localStorage = $localStorage.$default({
                token: ""
            });
            $localStorage.token = getLoginToken(email, password);
        }

        function obtenerToken() {
            return $localStorage.token;
        }

        function verificarToken(token) {
            LoginModel.getLoginCheck(token)
                .then(function (result) {
                    vm.login = result.data;
                    if (!vm.login.login) {
                        eliminarToken();
                        vm.error = "Credenciales inválidas";
                    } else {
                        vm.cuenta.email = "";
                        vm.cuenta.password = "";
                        if ($stateParams.dashboard || $stateParams.cine || $stateParams.busqueda) {
                            $ionicHistory.goBack();
                        } else {
                            $ionicHistory.nextViewOptions({
                                disableAnimate: true,
                                disableBack: true
                            });
                            $state.transitionTo("tab.cuenta");
                        }
                    }
                    $ionicLoading.hide();
                });
        }

        function irCrearCuenta() {
            if ($stateParams.dashboard) {
                $window.location.href = "#/tabs/dashboard/cuenta/crear/dashboard";
            } else if ($stateParams.cine) {
                $window.location.href = "#/tabs/cine/cuenta/crear/cine";
            } else if ($stateParams.busqueda) {
                $window.location.href = "#/tabs/busqueda/cuenta/crear/busqueda";
            } else {
                $state.transitionTo("tab.crearcuenta");
            }
        }

        function loginForm(username, password) {
            $ionicLoading.show();
            eliminarToken();
            guardarToken(username, password);
            verificarToken(obtenerToken());
        }

        vm.irCrearCuenta = irCrearCuenta;
        vm.loginForm = loginForm;
    })

    .controller('CineCtrl', function (PeliculasModel, $stateParams, $ionicLoading) {
        var vm = this;
        vm.diaSemanaToogle = true;
        vm.urlDiaSemana = 1;

        function diaSemanaToogleClick() {
            if (vm.diaSemanaToogle) {
                vm.urlDiaSemana = 1;
            } else {
                vm.urlDiaSemana = 0;
            }
            $ionicLoading.show();
            getPeliculasPorCine();
        }
        
        function getCines() {
            PeliculasModel.cines()
                .then(function (result) {
                    vm.cines = result.data;
                    $ionicLoading.hide();
                });
        }

        function getPeliculasPorCine() {
            vm.idCine = $stateParams.idCine;
            PeliculasModel.peliculasPorCine($stateParams.idCine, vm.urlDiaSemana)
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
        vm.diaSemanaToogleClick = diaSemanaToogleClick;

        getMunicipios();
    })

    .controller('BusquedaCtrl', function (CompraModel,$state, PeliculasModel, $window, $stateParams, $ionicLoading,$scope,$ionicPopup) {
        var vm = this;

        function obtenerPeliculas() {
            $ionicLoading.show();
            PeliculasModel.todas()
                .then(function (result) {
                    vm.todas = result.data;
                    $ionicLoading.hide();
                    //console.log(result.data);
                });
        }

        obtenerPeliculas();

        $scope.showConfirm = function() {
            $window.location.href = "#/tabs/busqueda/director";
        };
    })

    .controller('Busquedadirect', function (CompraModel, PeliculasModel, $window, $stateParams, $ionicLoading,$scope) {
        var vm = this;

        function obtenerArtista() {
            $ionicLoading.show();
            PeliculasModel.artistas()
                .then(function (result) {
                    vm.todas = result.data;
                    $ionicLoading.hide();
                });
        }

        obtenerArtista();

        $scope.showConfirm = function() {
            $window.location.href = "#/tabs/busqueda";
        };
    })

    .controller('Busquedapelid', function (CompraModel, PeliculasModel, $window, $stateParams, $ionicLoading,$scope) {
        var vm = this;

        function obtenerPeliculaArtista() {
            $ionicLoading.show();
            PeliculasModel.peliculasPorArtista($stateParams.id)
                //alert($stateParams.id)
                .then(function (result) {
                    vm.todas = result.data;
                    $ionicLoading.hide();
                });
        }

        obtenerPeliculaArtista();

        $scope.showConfirm = function() {
            $window.location.href = $stateParams.busqueda-director;
        };
    })

    .controller('PeliculaCtrl', function (PeliculasModel, $stateParams, $ionicLoading, $localStorage, $window, $state) {
        var vm = this;
        vm.fecha = 0;

        function cargando() {
            $ionicLoading.show();
        }

        function irCompra(idPelicula, nombre, idFuncion) {
            if (!$localStorage.token) {
                if ($stateParams.idCine) {
                    $window.location.href = "#/tabs/cine/cuenta/login/cine";
                } else if ($stateParams.busqueda) {
                    $window.location.href = "#/tabs/busqueda/cuenta/login/busqueda";
                } else {
                    $window.location.href = "#/tabs/dashboard/cuenta/login/dashboard";
                }
            } else {
                if ($stateParams.idCine) {
                    $window.location.href = "#/tabs/pelicula/" + idPelicula + "/" + nombre + "/funcion/" + idFuncion + "/cine";
                } else if ($stateParams.busqueda) {
                    $window.location.href = "#/tabs/busqueda/pelicula/" + idPelicula + "/" + nombre + "/funcion/" + idFuncion + "/busqueda";
                } else {
                    $window.location.href = "#/tabs/pelicula/" + idPelicula + "/" + nombre + "/funcion/" + idFuncion;
                }
            }
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
        vm.irCompra = irCompra;
        cargando();
        esTab();
        getPelicula();
        getFechasFunciones();
        getFunciones();
    })

    .controller('CompraCtrl', function (PeliculasModel, CompraModel, $scope, $state, $stateParams, $window, $ionicHistory, $ionicLoading, $localStorage) {
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
            CompraModel.funcion($stateParams.idFuncion)
                .then(function (result) {
                    vm.funcion = result.data[0];
                    $ionicLoading.hide();
                });
        }

        function getCompra() {
            if ($stateParams.idCompra) {
                $ionicLoading.show();
                CompraModel.recibo($stateParams.idCompra)
                    .then(function (result) {
                        vm.recibo = result.data[0];
                        if ($stateParams.busquedaRecibo) {
                            vm.busqueda = true;
                        } else {
                            vm.busqueda = false;
                        }
                        if ($stateParams.cine) {
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

        function crearCompra(asientos, asientosDisponibles, idFuncion) {
            if (!isNaN(asientos)) {
                if (asientos > 0) {
                    if (asientos <= asientosDisponibles) {
                        $ionicLoading.show();
                        CompraModel.compra(idFuncion, asientos, $localStorage.token)
                            .then(function (result) {
                                vm.compra = result.data[0];
                                vm.getFuncion();
                                vm.urlAction = "#/tabs/compra/recibo/" + vm.compra.id;
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
        vm.diaSemanaToogle = true;
        vm.urlDiaSemana = 1;
        
        function diaSemanaToogleClick() {
            if (vm.diaSemanaToogle) {
                vm.urlDiaSemana = 1;
            } else {
                vm.urlDiaSemana = 0;
            }
            getDestacados();
            getEstrenos();
            getGeneros();
        }

        function getDestacados() {
            $ionicLoading.show();
            PeliculasModel.destacados(vm.urlDiaSemana)
                .then(function (result) {
                    vm.destacados = result.data;
                });
        }

        function getEstrenos() {
            PeliculasModel.nuevos(vm.urlDiaSemana)
                .then(function (result) {
                    vm.estreno = result.data;
                });
        }

        function getGeneros() {
            PeliculasModel.generos(vm.urlDiaSemana)
                .then(function (result) {
                    vm.generos = result.data;
                    getPorGenero(vm.generos);
                });
        }

        function getPorGenero(generos) {
            vm.porGenero = []
            for (i = 0; i < generos.total; i++) {
                PeliculasModel.porGenero(generos.data[i].id, vm.urlDiaSemana)
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
        vm.diaSemanaToogleClick = diaSemanaToogleClick;
        getDestacados();
        getEstrenos();
        getGeneros();
    });

