 angular.module('SimpleRESTIonic.services', [])

    .constant('api', {
        url: 'http://cartelerascaracas.us-west-2.elasticbeanstalk.com/api/v1/',
        //url: 'http://api.app/api/v1/',
    })

    .service('LoginModel', function ($http, api) {
        var service = this;

        function getUrl(url) {
            return api.url + url;
        }

        service.getLoginCheck = function (token) {
            return $http({
                method: 'GET',
                url: getUrl('login'),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json',
                    'Authorization': token,
                },
            });
        };

        service.getUsuario = function (token) {
            return $http({
                method: 'GET',
                url: getUrl('usuario'),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json',
                    'Authorization': token,
                },
            });
        };

        service.postUsuario = function (nombre, email, password) {
            return $http({
                method: 'POST',
                url: getUrl('usuario'),
                data: 'nombre=' + nombre + '&email=' + email + '&password=' + password,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json',
                },
            });
        };

    })

    .service('CompraModel', function ($http, api) {
        var service = this;

        function getUrl(url) {
            return api.url + url;
        }

        service.funcion = function (funcionID) {
            return $http({
                method: 'GET',
                url: getUrl('funcion/' + funcionID),
            });
        };

        service.compra = function (funcionID, asientos, token) {
            return $http({
                method: 'GET',
                url: getUrl('funcion/' + funcionID + '/asientos/' + asientos),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json',
                    'Authorization': token,
                },
            });
        };

        service.recibo = function (idCompra) {
            return $http({
                method: 'GET',
                url: getUrl('compra/' + idCompra),
            });
        };
    })

    .service('PeliculasModel', function ($http, api) {
        var service = this;

        function getUrl(url) {
            return api.url + url;
        }

        service.destacados = function (diaSemana = 1) {
            return $http.get(getUrl('destacados/' + diaSemana));
        };


        service.todas = function () {
            return $http.get(getUrl('pelicula'));
        };
        service.nuevos = function (diaSemana = 1) {
            return $http.get(getUrl('nuevos/' + diaSemana));
        };

        service.generos = function (diaSemana = 1) {
            return $http.get(getUrl('genero/' + diaSemana));
        };

        service.municipios = function () {
            return $http.get(getUrl('municipios'));
        };

        service.porMunicipio = function (dir) {
            return $http({
                method: 'GET',
                url: getUrl('porMunicipio/' + dir),
            });
        };

        service.cines = function () {
            return $http.get(getUrl('cine'));
        };

        service.peliculasPorCine = function (idCine, diaSemana = 1) {
            return $http({
                method: 'GET',
                url: getUrl('cine/' + idCine + '/' + diaSemana),
            });
        };

        service.porGenero = function (id, diaSemana = 1) {
            return $http({
                method: 'GET',
                url: getUrl('genero/' + id + '/' + diaSemana),
            });
        };

        service.pelicula = function (id) {
            return $http({
                method: 'GET',
                url: getUrl('pelicula/' + id),
            });
        };

        service.fechasFunciones = function () {
            return $http({
                method: 'GET',
                url: getUrl('funcionFecha'),
            });
        };

        service.funciones = function (idPelicula, dia) {
            return $http({
                method: 'GET',
                url: getUrl('pelicula/' + idPelicula + '/funcion/' + dia),
            });
        };

        service.funcionesPorCine = function (idPelicula, dia, idCine) {
            return $http({
                method: 'GET',
                url: getUrl('pelicula/' + idPelicula + '/funcion/' + dia + '/cine/' + idCine),
            });
        };

        service.buscar = function (nombrePelicula) {
            return $http({
                method: 'GET',
                url: getUrl('busqueda/' + nombrePelicula),
            });
        };

        service.artistas = function () {
            return $http({
                method: 'GET',
                url: getUrl('artista'),
            });
        };

        service.peliculasPorArtista = function (artistaID) {
            return $http({
                method: 'GET',
                url: getUrl('artista/' + artistaID),
            });
        };


    })