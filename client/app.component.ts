import { Component } from '@angular/core';

@Component({ 
  moduleId: module.id,
  selector: 'app-container',
  template: `
  <div class="container">
  <h1 class="text-center">SCG Application</h1>
  <nav class="navbar navbar-default">
    <div class="container-fluid">
      <ul class="nav navbar-nav">
        <li class="active"><a routerLink="/" routerLinkActive="active">Home</a></li>
        <li><a routerLink="/category" >Category</a></li>    
      </ul>
    </div>
  </nav> 
  <router-outlet></router-outlet>
  </div>
  `
})
export class AppComponent {
  
}
