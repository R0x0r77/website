import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactEnvelopeComponent } from './contact-envelope.component';

describe('ContactEnvelopeComponent', () => {
  let component: ContactEnvelopeComponent;
  let fixture: ComponentFixture<ContactEnvelopeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactEnvelopeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactEnvelopeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
