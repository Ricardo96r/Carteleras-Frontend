// Ionic template App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'SimpleRESTIonic' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('SimpleRESTIonic', ['ionic', 'backand', 'SimpleRESTIonic.controllers', 'SimpleRESTIonic.services'])

    .run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);

            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleLightContent();
            }
        });
    })
    .config(function (BackandProvider, $stateProvider, $urlRouterProvider, $httpProvider) {

        BackandProvider.setAppName('cartelerascaracas'); // change here to your app name
        BackandProvider.setSignUpToken('ef8be651-e9fe-4a7e-8f76-c0cee7416d65'); //token that enable sign up. see http://docs.backand.com/en/latest/apidocs/security/index.html#sign-up
        BackandProvider.setAnonymousToken('b41abe65-ce24-46af-9794-97e9d8f955a5'); // token is for anonymous login. see http://docs.backand.com/en/latest/apidocs/security/index.html#anonymous-access

        $stateProvider
        // setup an abstract state for the tabs directive
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
                url: '/pelicula/:idPelicula/:nombrePelicula/cine/:idCine/funcion/:funcionHora/sala/:idSala',
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
            .state('tab.cine', {
                url: '/cine',
                views: {
                    'tab-cine': {
                        templateUrl: 'templates/tab-cine.html',
                        controller: 'CineCtrl as vm'
                    },
                }
            })
            /*
             Tab cine
             */
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
                url: '/pelicula/:idPelicula/:nombrePelicula/cine/:idCine/funcion/:funcionHora/sala/:idSala/cine/:cine',
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
                url: '/pelicula/:idPelicula/:nombrePelicula/cine/:idCine/funcion/:funcionHora/sala/:idSala/:busqueda',
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
            });

        $urlRouterProvider.otherwise('/tabs/dashboard');

        $httpProvider.interceptors.push('APIInterceptor');
    })

    .run(function ($rootScope, $state, LoginService, Backand) {

        function unauthorized() {
            console.log("user is unauthorized, sending to login");
            $state.go('tab.login');
        }

        function signout() {
            LoginService.signout();
        }

        $rootScope.$on('unauthorized', function () {
            unauthorized();
        });

        $rootScope.$on('$stateChangeSuccess', function (event, toState) {
            if (toState.name == 'tab.login') {
                signout();
            }
            else if (toState.name != 'tab.login' && Backand.getToken() === undefined) {
                unauthorized();
            }
        });

    })

