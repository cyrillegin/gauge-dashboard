export default class gaugeController {

    constructor($scope, $http, $interval, $rootScope) {
        'ngInject';

        this.$scope = $scope;
        this.$http = $http;
        this.$interval = $interval;
        this.$rootScope = $rootScope;
    }

    $onInit() {
        this.$http.get('/api/readings')
            .then((success) => {
                this.$scope.gauges = success.data.gauges;
            })
            .catch((error) => {
                console.log(error);
            });

        this.$interval(() => {
            this.getReadings();
        }, 3000);
    }

    getReadings() {
        const that = this;
        const ids = this.$scope.gauges.map((gauge) => gauge.id);
        const req = {
            method: 'POST',
            url: '/api/readings',
            headers: {
                'Content-Type': 'application/json',
            },
            data: JSON.stringify(ids),
        };
        this.$http(req)
            .then((success) => {
                const newGauges = [];
                success.data.readings.forEach((reading) => {
                    that.$scope.gauges.forEach((gauge) => {
                        if (reading.id === gauge.id) {
                            const newGauge = gauge;
                            newGauge.value = reading.newReading;
                            newGauges.push(newGauge);
                        }
                    });
                });

                that.$scope.gauges = newGauges;
                that.$rootScope.$broadcast('readings-update');
            })
            .catch((error) => {
                console.log(error);
            });
    }
}
