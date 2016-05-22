import {Component} from 'angular2/core';
import {Http, Response, Headers, RequestOptions} from 'angular2/http';

@Component({
    selector: 'home',
    templateUrl: 'home/home.html'
})
export class Home {

    public apiPing: string;

    constructor(private http: Http) {

        let opts = new RequestOptions({ method: 'GET' });

        this.http.request('http://127.0.0.1:4001/api/ping', opts)
            .map(x => x.json())
            .subscribe(res => this.apiPing = res.ping);
    }
}
