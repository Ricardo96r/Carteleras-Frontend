angular.module('SimpleRESTIonic.controllers', [])
    .controller('CineCtrl', function () {

    })

    .controller('DashboardCtrl', function (ItemsModel, $rootScope) {
        var vm = this;

        function goToBackand() {
            window.location = 'http://docs.backand.com';
        }

        function getAll() {
            ItemsModel.limit()
                .then(function (result) {
                    vm.data = result.data;
                });
        }

        function getDestacados() {
            ItemsModel.destacados_()
                .then(function (result) {
                    vm.destacados = result.data;
                });
        }

        function getEstrenos() {
            ItemsModel.nuevos()
                .then(function (result) {
                    vm.estreno = result.data;
                });
        }

        function getGeneros() {
            ItemsModel.generos()
                .then(function (result) {
                    vm.generos = result.data;
                });
        }

        function getPorGenero(object) {
            ItemsModel.porGenero(object)
                .then(function (result) {
                    vm.porGener = result.data;
                });
            return vm.porGener;
        }

        function clearData() {
            vm.data = null;
        }

        function create(object) {
            ItemsModel.create(object)
                .then(function (result) {
                    cancelCreate();
                    getAll();
                });
        }

        function update(object) {
            ItemsModel.update(object.id, object)
                .then(function (result) {
                    cancelEditing();
                    getAll();
                });
        }

        function deleteObject(id) {
            ItemsModel.delete(id)
                .then(function (result) {
                    cancelEditing();
                    getAll();
                });
        }

        function initCreateForm() {
            vm.newObject = {name: '', description: ''};
        }

        function setEdited(object) {
            vm.edited = angular.copy(object);
            vm.isEditing = true;
        }

        function isCurrent(id) {
            return vm.edited !== null && vm.edited.id === id;
        }

        function cancelEditing() {
            vm.edited = null;
            vm.isEditing = false;
        }

        function cancelCreate() {
            initCreateForm();
            vm.isCreating = false;
        }

        vm.objects = [];
        vm.edited = null;
        vm.isEditing = false;
        vm.isCreating = false;
        vm.getDestacados = getDestacados;
        vm.getEstrenos = getEstrenos;
        vm.getGeneros = getGeneros;
        vm.getPorGenero = getPorGenero;
        vm.getAll = getAll;
        vm.create = create;
        vm.update = update;
        vm.delete = deleteObject;
        vm.setEdited = setEdited;
        vm.isCurrent = isCurrent;
        vm.cancelEditing = cancelEditing;
        vm.cancelCreate = cancelCreate;
        vm.goToBackand = goToBackand;
        vm.isAuthorized = false;

        $rootScope.$on('authorized', function () {
            vm.isAuthorized = true;
            getAll();
        });

        $rootScope.$on('logout', function () {
            clearData();
        });

        if (!vm.isAuthorized) {
            $rootScope.$broadcast('logout');
        }

        initCreateForm();
        getAll();
        getDestacados();
        getEstrenos();
        getGeneros();
    });

