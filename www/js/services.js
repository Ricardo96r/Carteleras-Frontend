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
        var service = this;

        function getUrl(url) {
            return "http://cartelerascaracas.us-west-2.elasticbeanstalk.com/api/v1/" + url;
        }

        service.funcion = function(idCine, funcionHora, idSala) {
            return $http ({
                method: 'GET',
                url: getUrl('SelectFuncion'),
                params: {
                    parameters: {
                        CineID: idCine,
                        Dia: funcionHora,
                        Sala: idSala,
                    }
                }
            });
        };

        service.compra = function(nombreCliente, asientos, idCine, idSala, funcionHora) {
            return $http ({
                method: 'GET',
                url: getUrl('InsertCompra'),
                params: {
                    parameters: {
                        NombreCliente: nombreCliente,
                        Asientos: asientos,
                        CineID: idCine,
                        Sala: idSala,
                        Hora: funcionHora
                    }
                }
            });
        };

        service.recibo = function(idCompra) {
            return $http ({
                method: 'GET',
                url: getUrl('SelectCompra'),
                params: {
                    parameters: {
                        ID: idCompra,
                    }
                }
            });
        };
    })

    .service('PeliculasModel', function ($http, Backand) {
        var service = this;

        function getUrl(url) {
            return "http://cartelerascaracas.us-west-2.elasticbeanstalk.com/api/v1/" + url;
        }

        service.destacados = function () {
            return $http.get(getUrl('destacados'));
        };

        service.nuevos = function () {
            return $http.get(getUrl('nuevos'));
        };

        service.generos = function () {
            return $http.get(getUrl('genero'));
        };

        service.cines = function () {
            return $http.get(getUrl('cine'));
        };

        service.peliculasPorCine = function(idCine) {
            return $http ({
                method: 'GET',
                url: getUrl('cine/'+idCine),
            });
        };

        service.porGenero = function(id) {
            return $http ({
                method: 'GET',
                url: getUrl('genero/'+id),
            });
        };
		
		service.pelicula = function(id) {
            return $http ({
                method: 'GET',
                url: getUrl('SelectPelicula'),
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
                url: getUrl('SelectFunciones'),
                params: {
                    parameters: {
                        ID: id
                    }
                }
            });
        };

        service.buscar = function(nombrePelicula) {
            return $http ({
                method: 'GET',
                url: getUrl('BuscarPelicula'),
                params: {
                    parameters: {
                        nombrePelicula: nombrePelicula
                    }
                }
            });
        };

        service.fetch = function (id) {
            return $http.get(getUrl(id));
        };

        service.create = function (object) {
            return $http.post(getUrl(), object);
        };

        service.update = function (id, object) {
            return $http.put(getUrl(id), object);
        };

        service.delete = function (id) {
            return $http.delete(getUrl(id));
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