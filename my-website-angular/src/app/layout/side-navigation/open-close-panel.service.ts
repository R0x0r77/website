import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OpenClosePanelService {
  private openClose = new Subject<boolean>();

  openedClosed$ = this.openClose.asObservable();

  onOpenClose(value: boolean) {
    this.openClose.next(value);
  }
}
