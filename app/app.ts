import {bootstrap} from 'angular2/platform/browser';
import {provide, Component} from 'angular2/core';
import {NgClass, NgStyle} from 'angular2/common';
import {HTTP_PROVIDERS} from 'angular2/http';
import {Router, APP_BASE_HREF, RouteConfig, RouterLink, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, LocationStrategy, HashLocationStrategy} from 'angular2/router';

import {Home} from './home/home';
import {PageOne} from './page-one/page-one';
import {PageTwo} from './page-two/page-two';

@Component({
  selector: 'app',
  styles: [`
    .activeHome {
      color: white;
      background-color: black;
    }
  `],
  templateUrl: './app.html',
  directives: [RouterLink, ROUTER_DIRECTIVES, NgClass, NgStyle]
})

@RouteConfig([
  { path: 'Home', name: 'Home', component: Home, useAsDefault: true },
  { path: '/PageOne', name: 'PageOne', component: PageOne },
  { path: '/PageTwo', name: 'PageTwo', component: PageTwo }
])

export class App {

  public selectedMenuItem: string;

  constructor(private router: Router) {
    router.subscribe((val) => {
      this.selectedMenuItem = val;
    })
  }
}

bootstrap(
  App,
  [
    ROUTER_PROVIDERS,
    HTTP_PROVIDERS,
    provide(LocationStrategy, { useClass: HashLocationStrategy })
  ]
);