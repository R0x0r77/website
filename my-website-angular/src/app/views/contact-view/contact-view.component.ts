import { Component } from '@angular/core';
import { ContactEnvelopeComponent } from './contact-envelope/contact-envelope.component';

@Component({
  selector: 'app-contact-view',
  imports: [ContactEnvelopeComponent],
  templateUrl: './contact-view.component.html',
  styleUrl: './contact-view.component.scss',
})
export class ContactViewComponent {}
