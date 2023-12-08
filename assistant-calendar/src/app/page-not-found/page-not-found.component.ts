import { Component } from '@angular/core';

import { Router } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})

/**
 * We created this component so that we can display it when the user tries to go to a route that doesn't exist
 * From this page the user can go back to the home page
 */
export class PageNotFoundComponent {

  constructor(
    private router: Router
  ) {}

  /**
   * Reroutes to homepage when clicked
   */
  backToHome(): void {
    this.router.navigate(['/home']);
  }
}
