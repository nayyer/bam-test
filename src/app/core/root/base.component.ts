import { Component, OnDestroy } from "@angular/core";
import { Subject } from "rxjs";

@Component({
  template: ``
})
export class BaseComponent implements OnDestroy {
  stop$ = new Subject<void>();

  ngOnDestroy() {
    this.stop$.next();
    this.stop$.complete();
  }
}
