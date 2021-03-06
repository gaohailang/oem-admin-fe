define(['app_vertical/services'], function() {
    var app = angular.module('dataApp.controllers', ['pmtBase']);

    // https://docs.google.com/a/wandoujia.com/document/d/1czdHkZiPJMFnEMnvppbhGWLuhG-5xdUPa5vt9lQyr9k/edit
    // Todo support 特定 App 下载量

    setTimeout(function() {
        $('#reportrange').daterangepicker();
    }, 1000);

    // app.controller('dataIdxCtrl', function($scope, apiHelper) {

    // });

    app.controller('reportCtrl', function($scope, $rootScope, $timeout, apiHelper) {
        apiHelper('fetchMetrics', {
            params: {
                startTime: '12345667889',
                endTime: '1418788349261'
            }
        }).then(function(r) {
            var _dict = {};
            _.each(r, function(i) {
                _dict[i.tokenId] = i.data;
            });
            $scope.allReportData = _dict;

            if ($scope.$root.currentConfig) {
                $scope.currentReportData = $scope.allReportData[$scope.$root.currentConfig.alias];
            }
        });

        $rootScope.$watch('currentConfig.alias', function(val) {
            if (!val) return;
            if (!$scope.allReportData) return;
            $scope.currentReportData = $scope.allReportData[val];
        });
    });

    app.controller('appReportCtrl', function($scope, $rootScope, $timeout, apiHelper) {
        apiHelper('fetchAppDown', {
            params: {
                startTime: '12345667889',
                endTime: '1418788349261'
            }
        }).then(function(r) {
            var _dict = {};
            _.each(r, function(i) {
                _dict[i.tokenId] = i.data;
            });
            $scope.allAppReport = _dict;
            if ($scope.$root.currentConfig) {
                $scope.currentAppReport = $scope.allAppReport[$scope.$root.currentConfig.alias];
            }
        });

        $rootScope.$watch('currentConfig.alias', function(val) {
            if (!val) return;
            if (!$scope.allAppReport) return;
            $scope.currentAppReport = $scope.allAppReport[val];
        });
    });
});