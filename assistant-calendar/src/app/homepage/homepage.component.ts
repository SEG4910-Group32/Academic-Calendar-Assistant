import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DataService } from 'src/services/data.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent {

  redirectFrom: any;

  constructor(
    private route: ActivatedRoute,
    private data: DataService
  ) {}

  /**
   * Checks route for params, and updates redirected status 
   * if yes 
   */
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.redirectFrom = params['redirect'];
    });

    if (this.redirectFrom === "true") {
      this.data.updateRedirected("true");
    }
  }

  clickDemoButton(): void {
    // implement click demo trigger function here.
  }
  clickGetStarted(): void {
    // implement get started trigger function here.
  }
}
