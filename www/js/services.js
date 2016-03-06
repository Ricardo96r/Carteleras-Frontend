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

    .service('ItemsModel', function ($http, Backand) {
        var service = this,
            baseUrl = '/1/objects/',
            objectName = 'Pelicula/';

        function getUrl() {
            return Backand.getApiUrl() + baseUrl + objectName;
        }

        function getUrlForId(id) {
            return getUrl() + id;
        }

        service.all = function () {
            return $http.get(getUrl());
        };

        service.limit = function () {
            return $http.get(Backand.getApiUrl() + '/1/query/data/SelectDestacado');
        };

        service.destacados_ = function () {
            return $http.get(Backand.getApiUrl() + '/1/query/data/SelectDestacado');
        };

        service.nuevos = function () {
            return $http.get(Backand.getApiUrl() + '/1/query/data/SelectNuevo');
        };

        service.generos = function () {
            return $http.get(Backand.getApiUrl() + '/1/query/data/SelectNombresGeneros');
        };

        service.porGenero = function() {
            return $http.get(Backand.getApiUrl() + '/1/query/data/SelectPeliculaPorGenero?parameters=%7B%22nombreGenero%22:%22Animacion%22%7D');
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
