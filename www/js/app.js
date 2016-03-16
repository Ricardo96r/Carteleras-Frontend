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
            .state('tab.dashboard', {
                url: '/dashboard',
                views: {
                    'tab-dashboard': {
                        templateUrl: 'templates/tab-dashboard.html',
                        controller: 'DashboardCtrl as vm'
                    }
                }
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
            .state('tab.busqueda', {
                url: '/busqueda',
                views: {
                    'tab-busqueda': {
                        templateUrl: 'templates/tab-busqueda.html',
                        controller: 'BusquedaCtrl as vm'
                    },
                }
            })
            .state('tab.pelicula', {
                url: '/pelicula/:idPelicula',
                views: {
                    'tab-dashboard': {
                        templateUrl: 'templates/tab-pelicula.html',
                        controller: 'PeliculaCtrl as vm',
                    }
                },
            })
            .state('tab.compra', {
                url: '/pelicula/:idPelicula/cine/:idCine/funcion/:funcionHora/sala/:idSala',
                views: {
                    'tab-dashboard': {
                        templateUrl: 'templates/tab-compra.html',
                        controller: 'CompraCtrl as vm',
                    }
                },
            })
            .state('tab.recibo', {
                url: '/compra/recibo/:idCompra',
                views: {
                    'tab-dashboard': {
                        templateUrl: 'templates/tab-recibo.html',
                        controller: 'CompraCtrl as vm',
                    }
                },
            })
            .state('tab.buscarecibo', {
            url: '/busqueda/recibo/:idCompra',
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

