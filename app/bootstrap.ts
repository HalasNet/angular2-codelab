/// <reference path="typings/_custom.d.ts" />

import { bind, provide, bootstrap } from 'angular2/angular2';
import { ROUTER_PROVIDERS, HashLocationStrategy, LocationStrategy } from 'angular2/router';
import { Devfest } from './app';

bootstrap(Devfest, [
	ROUTER_PROVIDERS, 
	provide(LocationStrategy, {useClass: HashLocationStrategy})
]);