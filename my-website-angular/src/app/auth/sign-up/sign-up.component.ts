import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { SignUpDialogComponent } from './sign-up-dialog.component';

@Component({
  selector: 'app-sign-up',
  templateUrl: 'sign-up.component.html',
  imports: [MatButtonModule, MatDialogModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpComponent {
  constructor(private readonly dialog: MatDialog) {}

  openDialog() {
    const dialogRef = this.dialog.open(SignUpDialogComponent);
  }
}
