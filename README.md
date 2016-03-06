# Carteleras-Frontend

Cuando logremos que reciba el parámetro, creo que el servicio será algo así:

service.porGenero = function(Object) {
            return $http.get(Backand.getApiUrl() + '/1/query/data/SelectPeliculaPorGenero?parameters=%7B%22nombreGenero%22:%22'+Object+'%22%7D');
        };

