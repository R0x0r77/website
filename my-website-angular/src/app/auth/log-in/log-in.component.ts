import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { LogInDialogComponent } from './log-in-dialog.component';

@Component({
  selector: 'app-log-in',
  templateUrl: 'log-in.component.html',
  imports: [MatButtonModule, MatDialogModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogInComponent {
  constructor(private readonly dialog: MatDialog) {}

  openDialog() {
    this.dialog.open(LogInDialogComponent);
  }
}
