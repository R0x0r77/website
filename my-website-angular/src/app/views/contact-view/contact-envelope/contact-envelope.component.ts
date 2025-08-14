import { Component, computed, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { PostStampSvgComponent } from '../post-stamp-svg/post-stamp-svg.component';
import { EmailService } from '../services/email.service';
import { MyErrorStateMatcher } from '../../../shared/input/my-error-state-matcher';
import { finalize } from 'rxjs';
import { NotificationService } from '../../../shared/services/notification.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { UserStore } from '../../../../store/user.store';

@Component({
  selector: 'app-contact-envelope',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    PostStampSvgComponent,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './contact-envelope.component.html',
  styleUrl: './contact-envelope.component.scss',
})
export class ContactEnvelopeComponent {
  private userStore = inject(UserStore);
  sending = false;
  loggedIn = this.userStore.loggedIn;
  previousLoggedIn = this.loggedIn();

  initialName = computed(() =>
    this.loggedIn()
      ? (this.userStore.user()?.firstName || '') +
        ' ' +
        (this.userStore.user()?.lastName || '')
      : ''
  );
  initialEmail = computed(() =>
    this.loggedIn() ? this.userStore.user()?.email : ''
  );

  nameFormControl = new FormControl(this.initialName(), [Validators.required]);
  emailFormControl = new FormControl(this.initialEmail(), [
    Validators.required,
    Validators.email,
  ]);
  messageFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(10),
    Validators.maxLength(1000),
  ]);
  matcher = new MyErrorStateMatcher();

  constructor(
    private emailService: EmailService,
    private notificationService: NotificationService
  ) {
    effect(() => {
      const current = this.loggedIn();
      if (!this.previousLoggedIn && current) {
        this.nameFormControl.setValue(this.initialName());
        this.emailFormControl.setValue(this.initialEmail());
      }
      this.previousLoggedIn = current;
    });
  }

  sendMessage() {
    if (
      !this.nameFormControl.value ||
      !this.emailFormControl.value ||
      !this.messageFormControl.value
    ) {
      this.notificationService.showInfo('Please fill in all fields.');
      return;
    }

    if (
      this.nameFormControl.invalid ||
      this.emailFormControl.invalid ||
      this.messageFormControl.invalid
    ) {
      this.notificationService.showInfo('Some fields have invalid data.');
      return;
    }

    this.sending = true;
    this.emailService
      .sendEmail({
        name: this.nameFormControl.value,
        email: this.emailFormControl.value,
        message: this.messageFormControl.value,
      })
      .pipe(finalize(() => (this.sending = false)))
      .subscribe({
        next: (res) => {
          this.notificationService.showSuccess(res.message);
          this.nameFormControl.reset();
          this.emailFormControl.reset();
          this.messageFormControl.reset();
        },
        error: (err) => {
          console.error('Error sending email:', err);
          this.notificationService.showError(err);
        },
      });
  }
}
