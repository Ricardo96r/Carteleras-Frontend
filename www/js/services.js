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
            //return "http://api.app/api/v1/" + url;
        }

        service.funcion = function(funcionID) {
            return $http ({
                method: 'GET',
                url: getUrl('/funcion/'+funcionID),
            });
        };

        service.compra = function(usuarioID, funcionID, asientos) {
            return $http ({
                method: 'GET',
                url: getUrl('/funcion/'+funcionID+'/usuario/'+usuarioID+'/asientos/'+asientos),
            });
        };

        service.recibo = function(idCompra) {
            return $http ({
                method: 'GET',
                url: getUrl('/compra/'+idCompra),
            });
        };
    })

    .service('PeliculasModel', function ($http, Backand) {
        var service = this;

        function getUrl(url) {
			return "http://cartelerascaracas.us-west-2.elasticbeanstalk.com/api/v1/" + url;
			//return "http://api.app/api/v1/" + url;
        }

        service.destacados = function () {
            return $http.get(getUrl('destacados'));
        };

		
        service.todas = function () {
            return $http.get(getUrl('pelicula'));
        };
        service.nuevos = function () {
            return $http.get(getUrl('nuevos'));
        };

        service.generos = function () {
            return $http.get(getUrl('genero'));
        };
		
		service.municipios = function () {
            return $http.get(getUrl('municipios'));
        };
		
		 service.porMunicipio = function(dir) {
            return $http ({
                method: 'GET',
                url: getUrl('porMunicipio/'+dir),
            });
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
                url: getUrl('pelicula/'+id),
            });
        };

        service.fechasFunciones = function() {
            return $http ({
                method: 'GET',
                url: getUrl('funcionFecha'),
            });
        };
		
		service.funciones = function(idPelicula, dia) {
            return $http ({
                method: 'GET',
                url: getUrl('pelicula/'+idPelicula+'/funcion/'+dia),
            });
        };

        service.funcionesPorCine = function(idPelicula, dia, idCine) {
            return $http ({
                method: 'GET',
                url: getUrl('pelicula/'+idPelicula+'/funcion/'+dia+'/cine/'+idCine),
            });
        };

        service.buscar = function(nombrePelicula) {
            return $http ({
                method: 'GET',
                url: getUrl('busqueda/'+nombrePelicula),
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