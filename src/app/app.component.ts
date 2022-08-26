import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigateService } from '@ux-stencil/common/services/navigate.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit, OnDestroy {
  private readonly subscription$: Subscription;
  public title = 'UX Stencil';

  constructor(
    private readonly navigateService: NavigateService,
  ) {
    this.subscription$ = new Subscription();
  }

  public ngOnInit(): void {
    this.subscription$.add(this.navigateService.startTrackNavigation());
  }

  public ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }
}
