import {Injectable} from 'angular2/core';


@Injectable()
export class Store {
	static save(questions) {
		sessionStorage.setItem('store', JSON.stringify(questions));
	}

	static read() {
		return JSON.parse(sessionStorage.getItem('store'));
	}

	static clear() {
		sessionStorage.clear();
	}
}
