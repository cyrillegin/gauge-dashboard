import * as d3 from 'd3';

export default class gaugeController {

    constructor($scope, $window, $timeout, $interval, $http) {
        'ngInject';

        this.$scope = $scope;
        this.$window = $window;
        this.$timeout = $timeout;
        this.$interval = $interval;
        this.$http = $http;
    }
    $onInit() {
        this.$scope.name = this.$scope.$ctrl.attributes.name;
        this.$scope.value = this.$scope.$ctrl.attributes.value;
        this.$scope.upperLimit = this.$scope.$ctrl.attributes.upperLimit;
        this.$scope.lowerLimit = this.$scope.$ctrl.attributes.lowerLimit;
        this.$scope.valueUnit = this.$scope.$ctrl.attributes.valueUnit;
        this.$scope.precision = this.$scope.$ctrl.attributes.precision;
        this.$scope.ranges = this.$scope.$ctrl.attributes.ranges;
        this.$scope.endpoint = this.$scope.$ctrl.attributes.endpoint;

        this.$timeout(() => {
            this.drawGraph();
        });

        this.$interval(() => {
            this.getReading();
        }, 3000);
    }

    getReading() {
        const that = this;
        this.$http.get(this.$scope.endpoint)
            .then((success) => {
                that.$scope.value = success.data.newReading;
            })
            .catch((error) => {
                console.log(error);
            });
    }

    drawGraph() {
        const container = $(`#${this.$scope.name}`);
        // Clear anything that is already in there.
        container.html('');
        const that = this;

        let renderTimeout;
        const width = 300;
        const innerRadius = Math.round((width * 130) / 300);
        const outterRadius = Math.round((width * 145) / 300);
        const majorGraduations = 5;
        const minorGraduations = 10;
        const majorGraduationLenght = Math.round((width * 16) / 300);
        const minorGraduationLenght = Math.round((width * 10) / 300);
        const majorGraduationMarginTop = Math.round((width * 7) / 300);
        const majorGraduationColor = '#B0B0B0';
        const minorGraduationColor = '#D0D0D0';
        const majorGraduationTextColor = '#6C6C6C';
        const needleColor = '#416094';
        const valueVerticalOffset = Math.round((width * 30) / 300);
        const unactiveColor = '#D7D7D7';
        const majorGraduationTextSize = 12;
        const needleValueTextSize = 12;

        const svg = d3.select(container[0])
            .append('svg')
            .attr('width', width)
            .attr('height', width * 0.75);

        const renderMajorGraduations = function (majorGraduationsAngles) {
            const centerX = width / 2;
            const centerY = width / 2;
            // Render Major Graduations
            $.each(majorGraduationsAngles, (index, value) => {
                const cos1Adj = Math.round(Math.cos((90 - value) * Math.PI / 180) * (innerRadius - majorGraduationMarginTop - majorGraduationLenght));
                const sin1Adj = Math.round(Math.sin((90 - value) * Math.PI / 180) * (innerRadius - majorGraduationMarginTop - majorGraduationLenght));
                const cos2Adj = Math.round(Math.cos((90 - value) * Math.PI / 180) * (innerRadius - majorGraduationMarginTop));
                const sin2Adj = Math.round(Math.sin((90 - value) * Math.PI / 180) * (innerRadius - majorGraduationMarginTop));
                const x1 = centerX + cos1Adj;
                const y1 = centerY + sin1Adj * -1;
                const x2 = centerX + cos2Adj;
                const y2 = centerY + sin2Adj * -1;
                svg.append('svg:line')
                    .attr('x1', x1)
                    .attr('y1', y1)
                    .attr('x2', x2)
                    .attr('y2', y2)
                    .style('stroke', majorGraduationColor);

                renderMinorGraduations(majorGraduationsAngles, index);
            });
        };
        const renderMinorGraduations = function (majorGraduationsAngles, indexMajor) {
            const minorGraduationsAngles = [];

            if (indexMajor > 0) {
                const minScale = majorGraduationsAngles[indexMajor - 1];
                const maxScale = majorGraduationsAngles[indexMajor];
                const scaleRange = maxScale - minScale;

                for (let index = 1; index < minorGraduations; index++) {
                    const scaleValue = minScale + index * scaleRange / minorGraduations;
                    minorGraduationsAngles.push(scaleValue);
                }

                const centerX = width / 2;
                const centerY = width / 2;
                // Render Minor Graduations
                $.each(minorGraduationsAngles, (indexMinor, value) => {
                    const cos1Adj = Math.round(Math.cos((90 - value) * Math.PI / 180) * (innerRadius - majorGraduationMarginTop - minorGraduationLenght));
                    const sin1Adj = Math.round(Math.sin((90 - value) * Math.PI / 180) * (innerRadius - majorGraduationMarginTop - minorGraduationLenght));
                    const cos2Adj = Math.round(Math.cos((90 - value) * Math.PI / 180) * (innerRadius - majorGraduationMarginTop));
                    const sin2Adj = Math.round(Math.sin((90 - value) * Math.PI / 180) * (innerRadius - majorGraduationMarginTop));
                    const x1 = centerX + cos1Adj;
                    const y1 = centerY + sin1Adj * -1;
                    const x2 = centerX + cos2Adj;
                    const y2 = centerY + sin2Adj * -1;
                    svg.append('svg:line')
                        .attr('x1', x1)
                        .attr('y1', y1)
                        .attr('x2', x2)
                        .attr('y2', y2)
                        .style('stroke', minorGraduationColor);
                });
            }
        };

        const getMajorGraduationValues = function (minLimit, maxLimit) {
            const scaleRange = maxLimit - minLimit;
            const majorGraduationValues = [];
            for (let index = 0; index <= majorGraduations; index++) {
                const scaleValue = minLimit + index * scaleRange / (majorGraduations);
                majorGraduationValues.push(scaleValue.toFixed(that.$scope.precision));
            }

            return majorGraduationValues;
        };
        const getMajorGraduationAngles = function () {
            const scaleRange = 240;
            const minScale = -120;
            const graduationsAngles = [];
            for (let index = 0; index <= majorGraduations; index++) {
                const scaleValue = minScale + index * scaleRange / (majorGraduations);
                graduationsAngles.push(scaleValue);
            }
            return graduationsAngles;
        };

        const renderMajorGraduationTexts = function (majorGraduationsAngles, majorGraduationValues) {
            if (!that.$scope.ranges) {
                return;
            }
            const centerX = width / 2;
            const centerY = width / 2;
            const textVerticalPadding = 5;
            const textHorizontalPadding = 5;

            const lastGraduationValue = majorGraduationValues[majorGraduationValues.length - 1];
            const textSize = isNaN(majorGraduationTextSize) ? (width * 12) / 300 : majorGraduationTextSize;
            const fontStyle = `${textSize}px Courier`;

            const dummyText = svg.append('text')
                .attr('x', centerX)
                .attr('y', centerY)
                .attr('fill', 'transparent')
                .attr('text-anchor', 'middle')
                .style('font', fontStyle)
                .text(lastGraduationValue + that.$scope.valueUnit);

            const textWidth = dummyText.node().getBBox().width;

            for (let index = 0; index < majorGraduationsAngles.length; index++) {
                const angle = majorGraduationsAngles[index];
                let cos1Adj = Math.round(Math.cos((90 - angle) * Math.PI / 180) * (innerRadius - majorGraduationMarginTop - majorGraduationLenght - textHorizontalPadding));
                const sin1Adj = Math.round(Math.sin((90 - angle) * Math.PI / 180) * (innerRadius - majorGraduationMarginTop - majorGraduationLenght - textVerticalPadding));

                let sin1Factor = 1;
                if (sin1Adj < 0) {
                    sin1Factor = 1.1;
                }
                if (sin1Adj > 0) {
                    sin1Factor = 0.9;
                }
                if (cos1Adj > 0) {
                    if (angle > 0 && angle < 45) {
                        cos1Adj -= textWidth / 2;
                    } else {
                        cos1Adj -= textWidth;
                    }
                }
                if (cos1Adj < 0) {
                    if (angle < 0 && angle > -45) {
                        cos1Adj -= textWidth / 2;
                    }
                }
                if (cos1Adj === 0) {
                    cos1Adj -= angle === 0 ? textWidth / 4 : textWidth / 2;
                }

                const x1 = centerX + cos1Adj;
                const y1 = centerY + sin1Adj * sin1Factor * -1;

                svg.append('text')
                    .attr('class', 'mtt-majorGraduationText')
                    .style('font', fontStyle)
                    .attr('text-align', 'center')
                    .attr('x', x1)
                    .attr('dy', y1)
                    .attr('fill', majorGraduationTextColor)
                    .text(majorGraduationValues[index] + that.$scope.valueUnit);
            }
        };

        const renderGraduationNeedle = function (minLimit, maxLimit) {
            const centerX = width / 2;
            const centerY = width / 2;
            let centerColor;

            if (typeof that.$scope.value === 'undefined') {
                centerColor = unactiveColor;
            } else {
                centerColor = needleColor;
                const needleValue = ((that.$scope.value - minLimit) * 240 / (maxLimit - minLimit)) - 30;
                const thetaRad = needleValue * Math.PI / 180;

                const needleLen = innerRadius - majorGraduationLenght - majorGraduationMarginTop;
                const needleRadius = (width * 2.5) / 300;
                const topX = centerX - needleLen * Math.cos(thetaRad);
                const topY = centerY - needleLen * Math.sin(thetaRad);
                const leftX = centerX - needleRadius * Math.cos(thetaRad - Math.PI / 2);
                const leftY = centerY - needleRadius * Math.sin(thetaRad - Math.PI / 2);
                const rightX = centerX - needleRadius * Math.cos(thetaRad + Math.PI / 2);
                const rightY = centerY - needleRadius * Math.sin(thetaRad + Math.PI / 2);
                const triangle = `M ${leftX} ${leftY} L ${topX} ${topY} L ${rightX} ${rightY}`;
                const textSize = isNaN(needleValueTextSize) ? (width * 12) / 300 : needleValueTextSize;
                const fontStyle = `${textSize}px Courier`;

                if (that.$scope.value >= minLimit && that.$scope.value <= maxLimit) {
                    that.$scope.needle = svg.append('svg:path')
                        .attr('d', triangle)
                        .style('stroke-width', 1)
                        .style('stroke', needleColor)
                        .style('fill', needleColor)
                        .attr('id', `${that.$scope.name}-needle`);
                }

                svg.append('text')
                    .attr('x', centerX)
                    .attr('y', centerY + valueVerticalOffset)
                    .attr('class', 'mtt-graduationValueText')
                    .attr('fill', needleColor)
                    .attr('text-anchor', 'middle')
                    .attr('font-weight', 'bold')
                    .attr('id', `${that.$scope.name}-text`)
                    .style('font', fontStyle)
                    .text(`[ ${that.$scope.value.toFixed(that.$scope.precision)}${that.$scope.valueUnit} ]`);
            }

            const circleRadius = (width * 6) / 300;

            svg.append('circle')
                .attr('r', circleRadius)
                .attr('cy', centerX)
                .attr('cx', centerY)
                .attr('fill', centerColor);
        };
        this.$window.onresize = function () {
            that.$scope.$apply();
        };
        this.$scope.$watch(() => angular.element(this.$window)[0].innerWidth, () => {
            that.$scope.render();
        });
        this.$scope.$watch('value', () => {
            that.$scope.renderNeedle();
        }, true);
        this.$scope.renderNeedle = function () {
            const maxLimit = that.$scope.upperLimit ? that.$scope.upperLimit : 100;
            const minLimit = that.$scope.lowerLimit ? that.$scope.lowerLimit : 0;
            d3.selectAll(`#${that.$scope.name}-needle`).remove();
            d3.selectAll(`#${that.$scope.name}-text`).remove();
            renderGraduationNeedle(minLimit, maxLimit);
        };
        this.$scope.render = function () {
            svg.selectAll('*').remove();
            if (renderTimeout) {
                clearTimeout(renderTimeout);
            }
            renderTimeout = that.$timeout(() => {
                const maxLimit = that.$scope.upperLimit ? that.$scope.upperLimit : 100;
                const minLimit = that.$scope.lowerLimit ? that.$scope.lowerLimit : 0;
                const d3DataSource = [];
                if (typeof that.$scope.ranges === 'undefined') {
                    d3DataSource.push([minLimit, maxLimit, unactiveColor]);
                } else {
                    // Data Generation
                    $.each(that.$scope.ranges, (index, value) => {
                        d3DataSource.push([value.min, value.max, value.color]);
                    });
                }

                // Render Gauge Color Area
                const translate = `translate(${width / 2},${width / 2})`;
                const cScale = d3.scaleLinear().domain([minLimit, maxLimit])
                    .range([-120 * (Math.PI / 180), 120 * (Math.PI / 180)]);
                const arc = d3.arc()
                    .innerRadius(innerRadius)
                    .outerRadius(outterRadius)
                    .startAngle((di) => cScale(di[0]))
                    .endAngle((di) => cScale(di[1]));
                svg.selectAll('path')
                    .data(d3DataSource)
                    .enter()
                    .append('path')
                    .attr('d', arc)
                    .style('fill', (di) => di[2])
                    .attr('transform', translate);

                const majorGraduationsAngles = getMajorGraduationAngles();
                const majorGraduationValues = getMajorGraduationValues(minLimit, maxLimit);
                renderMajorGraduations(majorGraduationsAngles);
                renderMajorGraduationTexts(majorGraduationsAngles, majorGraduationValues);
                renderGraduationNeedle(minLimit, maxLimit);
            }, 200);
        };
    }
}
