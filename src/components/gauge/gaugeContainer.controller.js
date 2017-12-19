export default class gaugeController {

    constructor($scope) {
        'ngInject';
        $scope.gauges = [{
            name: 'gauge1',
            value: 1.6,
            upperLimit: 6,
            lowerLimit: 0,
            valueUnit: 'kW',
            precision: 2,
            ranges: [{
                min: 0,
                max: 1.5,
                color: '#DEDEDE',
            }, {
                min: 1.5,
                max: 2.5,
                color: '#8DCA2F',
            },
            {
                min: 2.5,
                max: 3.5,
                color: '#FDC702',
            },
            {
                min: 3.5,
                max: 4.5,
                color: '#FF7700',
            },
            {
                min: 4.5,
                max: 6.0,
                color: '#C50200',
            }],
        }, {
            name: 'gauge2',
            value: 2.6,
            upperLimit: 6,
            lowerLimit: 0,
            valueUnit: 'kW',
            precision: 2,
            ranges: [{
                min: 0,
                max: 1.5,
                color: '#DEDEDE',
            }, {
                min: 1.5,
                max: 2.5,
                color: '#8DCA2F',
            },
            {
                min: 2.5,
                max: 3.5,
                color: '#FDC702',
            },
            {
                min: 3.5,
                max: 4.5,
                color: '#FF7700',
            },
            {
                min: 4.5,
                max: 6.0,
                color: '#C50200',
            }],
        }];
    }
}
