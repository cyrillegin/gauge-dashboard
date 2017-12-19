import angular from 'angular';
import angularRoute from 'angular-route'; // eslint-disable-line
import 'jquery';
// Page imports
import startPage from './pages/home/home.page.html';
// Controller imports
import homeController from './pages/home/home.controller';
// Component imports
import gaugeContainerComponent from './components/gauge/gaugeContainer.component';
import gaugeComponent from './components/gauge/gauge.component';

// Style
import './main.style.scss';

angular.module('gaugeApp', ['ngRoute'])
    .component('container', gaugeContainerComponent)
    .component('gauge', gaugeComponent)
    .controller('homeController', homeController)
    .config(
        ['$routeProvider', '$locationProvider', ($routeProvider, $locationProvider) => {
            $locationProvider.hashPrefix('');
            $routeProvider
                .when('/', {
                    template: startPage,
                })
                .otherwise({
                    redirectTo: '/',
                });
        }],
    );
