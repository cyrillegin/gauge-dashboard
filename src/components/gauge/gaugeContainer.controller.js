export default class gaugeController {

    constructor($scope) {
        'ngInject';

        this.$scope = $scope;

        $scope.gauges = [{
            name: 'gauge1',
            value: 5,
            upperLimit: 10,
            lowerLimit: 0,
            valueUnit: 'kW',
            precision: 2,
            endpoint: '/api/readings',
            ranges: [{
                min: 0,
                max: 2,
                color: '#DEDEDE',
            }, {
                min: 2,
                max: 4,
                color: '#8DCA2F',
            },
            {
                min: 4,
                max: 6,
                color: '#FDC702',
            },
            {
                min: 6,
                max: 8,
                color: '#FF7700',
            },
            {
                min: 8,
                max: 10,
                color: '#C50200',
            }],
        }, {
            name: 'gauge2',
            value: 5,
            upperLimit: 10,
            lowerLimit: 0,
            valueUnit: 'kW',
            precision: 2,
            endpoint: '/api/readings',
            ranges: [{
                min: 0,
                max: 2,
                color: '#DEDEDE',
            }, {
                min: 2,
                max: 4,
                color: '#8DCA2F',
            },
            {
                min: 4,
                max: 6,
                color: '#FDC702',
            },
            {
                min: 6,
                max: 8,
                color: '#FF7700',
            },
            {
                min: 8,
                max: 10.0,
                color: '#C50200',
            }],
        }, {
            name: 'gauge3',
            value: 5,
            upperLimit: 10,
            lowerLimit: 0,
            valueUnit: 'kW',
            precision: 2,
            endpoint: '/api/readings',
            ranges: [{
                min: 0,
                max: 2,
                color: '#DEDEDE',
            }, {
                min: 2,
                max: 4,
                color: '#8DCA2F',
            },
            {
                min: 4,
                max: 6,
                color: '#FDC702',
            },
            {
                min: 6,
                max: 8,
                color: '#FF7700',
            },
            {
                min: 8,
                max: 10.0,
                color: '#C50200',
            }],
        }, {
            name: 'gauge4',
            value: 5,
            upperLimit: 10,
            lowerLimit: 0,
            valueUnit: 'kW',
            precision: 2,
            endpoint: '/api/readings',
            ranges: [{
                min: 0,
                max: 2,
                color: '#DEDEDE',
            }, {
                min: 2,
                max: 4,
                color: '#8DCA2F',
            },
            {
                min: 4,
                max: 6,
                color: '#FDC702',
            },
            {
                min: 6,
                max: 8,
                color: '#FF7700',
            },
            {
                min: 8,
                max: 10.0,
                color: '#C50200',
            }],
        }, {
            name: 'gauge5',
            value: 5,
            upperLimit: 10,
            lowerLimit: 0,
            valueUnit: 'kW',
            precision: 2,
            endpoint: '/api/readings',
            ranges: [{
                min: 0,
                max: 2,
                color: '#DEDEDE',
            }, {
                min: 2,
                max: 4,
                color: '#8DCA2F',
            },
            {
                min: 4,
                max: 6,
                color: '#FDC702',
            },
            {
                min: 6,
                max: 8,
                color: '#FF7700',
            },
            {
                min: 8,
                max: 10.0,
                color: '#C50200',
            }],
        }, {
            name: 'gauge6',
            value: 5,
            upperLimit: 10,
            lowerLimit: 0,
            valueUnit: 'kW',
            precision: 2,
            endpoint: '/api/readings',
            ranges: [{
                min: 0,
                max: 2,
                color: '#DEDEDE',
            }, {
                min: 2,
                max: 4,
                color: '#8DCA2F',
            },
            {
                min: 4,
                max: 6,
                color: '#FDC702',
            },
            {
                min: 6,
                max: 8,
                color: '#FF7700',
            },
            {
                min: 8,
                max: 10.0,
                color: '#C50200',
            }],
        }];
    }
}
