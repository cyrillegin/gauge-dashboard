import gaugeContainer from './gauge.controller';
import gaugeTemplate from './gauge.template.html';
import './gauge.style.scss';

const gauge = {
    template: gaugeTemplate,
    controller: gaugeContainer,
    bindings: {
        attributes: '<',
    },
};

export default gauge;
