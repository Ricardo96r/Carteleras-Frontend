angular.module('SimpleRESTIonic.services', [])

    .service('APIInterceptor', function ($rootScope, $q) {
        var service = this;

        service.responseError = function (response) {
            if (response.status === 401) {
                $rootScope.$broadcast('unauthorized');
            }
            return $q.reject(response);
        };
    })

    .service('CompraModel', function ($http, Backand) {
        var service = this,
            baseUrl = '/1/objects/',
            objectName = 'Compra/',
            queryUrl = '/1/query/data/';

        function getUrl() {
            return Backand.getApiUrl() + baseUrl + objectName;
        }

        function getQueryUrl(query) {
            return Backand.getApiUrl() + queryUrl + query;
        }

        function getUrlForId(id) {
            return getUrl() + id;
        }

        service.funcion = function(id) {
            return $http ({
                method: 'GET',
                url: getQueryUrl('SelectFuncion'),
                params: {
                    parameters: {
                        ID: id
                    }
                }
            });
        };

        service.compra = function(idFuncion, nombre, asientos) {
            return $http ({
                method: 'GET',
                url: getQueryUrl('InsertCompra'),
                params: {
                    parameters: {
                        IDFuncion: idFuncion,
                        NombreCliente: nombre,
                        Asientos: asientos,
                    }
                }
            });
        };

        service.recibo = function(idCompra) {
            return $http ({
                method: 'GET',
                url: getQueryUrl('SelectCompra'),
                params: {
                    parameters: {
                        ID: idCompra,
                    }
                }
            });
        };
    })

    .service('PeliculasModel', function ($http, Backand) {
        var service = this,
            baseUrl = '/1/objects/',
            objectName = 'Pelicula/',
            queryUrl = '/1/query/data/';

        function getUrl() {
            return Backand.getApiUrl() + baseUrl + objectName;
        }

        function getQueryUrl(query) {
            return Backand.getApiUrl() + queryUrl + query;
        }

        function getUrlForId(id) {
            return getUrl() + id;
        }

        service.destacados = function () {
            return $http.get(getQueryUrl('SelectDestacado'));
        };

        service.nuevos = function () {
            return $http.get(getQueryUrl('SelectNuevo'));
        };

        service.generos = function () {
            return $http.get(getQueryUrl('SelectNombresGeneros'));
        };

        service.porGenero = function(genero) {
            return $http ({
                method: 'GET',
                url: getQueryUrl('SelectPeliculaPorGenero'),
                params: {
                    parameters: {
                        nombreGenero: genero
                    }
                }
            });
        };
		
		service.pelicula = function(id) {
            return $http ({
                method: 'GET',
                url: getQueryUrl('SelectPelicula'),
                params: {
                    parameters: {
                        ID: id
                    }
                }
            });
        };
		
		service.funciones = function(id) {
            return $http ({
                method: 'GET',
                url: getQueryUrl('SelectFunciones'),
                params: {
                    parameters: {
                        ID: id
                    }
                }
            });
        };

        service.fetch = function (id) {
            return $http.get(getUrlForId(id));
        };

        service.create = function (object) {
            return $http.post(getUrl(), object);
        };

        service.update = function (id, object) {
            return $http.put(getUrlForId(id), object);
        };

        service.delete = function (id) {
            return $http.delete(getUrlForId(id));
        };
    })

    .service('LoginService', function (Backand) {
        var service = this;

        service.signin = function (email, password, appName) {
            //call Backand for sign in
            return Backand.signin(email, password);
        };

        service.anonymousLogin= function(){
            // don't have to do anything here,
            // because we set app token att app.js
        }

        service.signout = function () {
            return Backand.signout();
        };
    });
