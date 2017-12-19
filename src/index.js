import angular from 'angular';
import angularRoute from 'angular-route'; // eslint-disable-line
// Page imports
import startPage from './pages/home/home.page.html';
// Component imports
import gauge from './components/gauge/gauge.component';

// Style
import './main.style.scss';

angular.module('gauge-app', ['ngRoute'])
    .component('gauge', gauge)
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
        }]);
