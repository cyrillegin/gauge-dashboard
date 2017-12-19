import './home.style.scss';

export default class homeController {
    // No current use for a controller here so leaving blank.
    constructor($scope) {
        this.$scope = $scope;
    }
    $onInit() {
        console.log('hello there');

        this.$scope.gauges = [{
            name: 'Gauge Name',
            currentValue: 4,
            units: 'F',
        }, {
            name: 'Another Name',
            currentValue: 80,
            units: 'C',
        }];
    }
}
