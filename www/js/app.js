angular.module('SimpleRESTIonic', ['ionic', 'ngStorage', 'SimpleRESTIonic.controllers', 'SimpleRESTIonic.services'])

    .run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);

            }
            if (window.StatusBar) {
                StatusBar.styleLightContent();
            }
        });
    })

    .config(function ($stateProvider, $urlRouterProvider, $httpProvider) {
        $stateProvider
            .state('tab', {
                url: '/tabs',
                abstract: true,
                templateUrl: 'templates/tabs.html'
            })
            /*
             Dashboard
             */
            .state('tab.dashboard', {
                url: '/dashboard',
                views: {
                    'tab-dashboard': {
                        templateUrl: 'templates/tab-dashboard.html',
                        controller: 'DashboardCtrl as vm'
                    }
                }
            })
            .state('tab.pelicula', {
                url: '/pelicula/:idPelicula/:nombrePelicula',
                views: {
                    'tab-dashboard': {
                        templateUrl: 'templates/tab-pelicula.html',
                        controller: 'PeliculaCtrl as vm',
                    }
                },
            })
            .state('tab.compra', {
                url: '/pelicula/:idPelicula/:nombrePelicula/funcion/:idFuncion',
                views: {
                    'tab-dashboard': {
                        templateUrl: 'templates/tab-compra.html',
                        controller: 'CompraCtrl as vm',
                    }
                },
            })
            .state('tab.recibo', {
                url: '/compra/recibo/:idCompra/:comprado',
                views: {
                    'tab-dashboard': {
                        templateUrl: 'templates/tab-recibo.html',
                        controller: 'CompraCtrl as vm',
                    }
                },
            })
            .state('tab.dashboardlogin', {
                url: '/dashboard/cuenta/login/:dashboard',
                views: {
                    'tab-dashboard': {
                        templateUrl: 'templates/tab-login.html',
                        controller: 'LoginCtrl as vm',
                    }
                },
            })
            .state('tab.dashboardcrearcuenta', {
                url: '/dashboard/cuenta/crear/:dashboard',
                views: {
                    'tab-dashboard': {
                        templateUrl: 'templates/tab-crear-cuenta.html',
                        controller: 'CrearCuentaCtrl as vm',
                    }
                },
            })
            /*
             Tab cine
             */
            .state('tab.cine', {
                url: '/cine',
                views: {
                    'tab-cine': {
                        templateUrl: 'templates/tab-cine.html',
                        controller: 'CineCtrl as vm'
                    },
                }
            })
            .state('tab.cinepeliculas', {
                url: '/cine/:idCine/:nombreCine',
                views: {
                    'tab-cine': {
                        templateUrl: 'templates/tab-cine-peliculas.html',
                        controller: 'CineCtrl as vm'
                    },
                }
            })
            .state('tab.cpelicula', {
                url: '/pelicula/:idPelicula/:nombrePelicula/cine/:idCine',
                views: {
                    'tab-cine': {
                        templateUrl: 'templates/tab-pelicula.html',
                        controller: 'PeliculaCtrl as vm',
                    }
                },
            })
            .state('tab.ccompra', {
                url: '/pelicula/:idPelicula/:nombrePelicula/funcion/:idFuncion/:cine',
                views: {
                    'tab-cine': {
                        templateUrl: 'templates/tab-compra.html',
                        controller: 'CompraCtrl as vm',
                    }
                },
            })
            .state('tab.crecibo', {
                url: '/compra/recibo/:idCompra/cine/:cine/:comprado',
                views: {
                    'tab-cine': {
                        templateUrl: 'templates/tab-recibo.html',
                        controller: 'CompraCtrl as vm',
                    }
                },
            })
            .state('tab.cinelogin', {
                url: '/cine/cuenta/login/:cine',
                views: {
                    'tab-cine': {
                        templateUrl: 'templates/tab-login.html',
                        controller: 'LoginCtrl as vm',
                    }
                },
            })
            .state('tab.cinecrearcuenta', {
                url: '/cine/cuenta/crear/:cine',
                views: {
                    'tab-cine': {
                        templateUrl: 'templates/tab-crear-cuenta.html',
                        controller: 'CrearCuentaCtrl as vm',
                    }
                },
            })

            /*
             Tab Busqueda
             */
            .state('tab.busqueda', {
                url: '/busqueda',
                views: {
                    'tab-busqueda': {
                        templateUrl: 'templates/tab-busqueda.html',
                        controller: 'BusquedaCtrl as vm'
                    },
                }
            })
            .state('tab.buscarecibo', {
                url: '/recibo/:idCompra/:busquedaRecibo',
                views: {
                    'tab-busqueda': {
                        templateUrl: 'templates/tab-recibo.html',
                        controller: 'CompraCtrl as vm',
                    }
                },
            })
            /*
             Buscar Pelicula.
             */
            .state('tab.buscarpelicula', {
                url: '/busqueda/pelicula/:nombrePelicula',
                views: {
                    'tab-busqueda': {
                        templateUrl: 'templates/tab-busqueda-pelicula.html',
                        controller: 'BusquedaCtrl as vm',
                    }
                },
            })

            .state('tab.director', {
                url: '/busqueda/director',
                views: {
                    'tab-busqueda': {
                        templateUrl: 'templates/tab-busqueda-director.html',
                        controller: 'Busquedadirect as vm',
                    }
                },
            })

            .state('tab.Pdirector', {
                url: '/artista/:id',
                views: {
                    'tab-busqueda': {
                        templateUrl: 'templates/tab-artista-pelicula.html',
                        controller: 'Busquedapelid as vm',
                    }
                },
            })

            .state('tab.bpelicula', {
                url: '/pelicula/:idPelicula/:nombrePelicula/:busqueda',
                views: {
                    'tab-busqueda': {
                        templateUrl: 'templates/tab-pelicula.html',
                        controller: 'PeliculaCtrl as vm',
                    }
                },
            })
            .state('tab.bcompra', {
                url: '/busqueda/pelicula/:idPelicula/:nombrePelicula/funcion/:idFuncion/:busqueda',
                views: {
                    'tab-busqueda': {
                        templateUrl: 'templates/tab-compra.html',
                        controller: 'CompraCtrl as vm',
                    }
                },
            })
            .state('tab.brecibo', {
                url: '/compra/recibo/:idCompra/:busqueda/:comprado',
                views: {
                    'tab-busqueda': {
                        templateUrl: 'templates/tab-recibo.html',
                        controller: 'CompraCtrl as vm',
                    }
                },
            })
            .state('tab.busquedalogin', {
                url: '/busqueda/cuenta/login/:busqueda',
                views: {
                    'tab-busqueda': {
                        templateUrl: 'templates/tab-login.html',
                        controller: 'LoginCtrl as vm',
                    }
                },
            })
            .state('tab.busquedacrearcuenta', {
                url: '/busqueda/cuenta/crear/:busqueda',
                views: {
                    'tab-busqueda': {
                        templateUrl: 'templates/tab-crear-cuenta.html',
                        controller: 'CrearCuentaCtrl as vm',
                    }
                },
            })
            /*
             Cuenta
             */
            .state('tab.cuenta', {
                url: '/cuenta',
                views: {
                    'tab-cuenta': {
                        templateUrl: 'templates/tab-cuenta.html',
                        controller: 'CuentaCtrl as vm',
                    }
                },
            })
            .state('tab.login', {
                url: '/cuenta/login',
                views: {
                    'tab-cuenta': {
                        templateUrl: 'templates/tab-login.html',
                        controller: 'LoginCtrl as vm',
                    }
                },
            })
            .state('tab.crearcuenta', {
                url: '/cuenta/crear',
                views: {
                    'tab-cuenta': {
                        templateUrl: 'templates/tab-crear-cuenta.html',
                        controller: 'CrearCuentaCtrl as vm',
                    }
                },
            })
            .state('tab.cuentarecibo', {
                url: '/cuenta/recibo/:idCompra/:busquedaRecibo',
                views: {
                    'tab-cuenta': {
                        templateUrl: 'templates/tab-recibo.html',
                        controller: 'CompraCtrl as vm',
                    }
                },
            });

        $urlRouterProvider.otherwise('/tabs/dashboard');
    })
