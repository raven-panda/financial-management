import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalboxComponent } from './modalbox.component';

describe('ModalboxComponent', () => {
  let component: ModalboxComponent;
  let fixture: ComponentFixture<ModalboxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalboxComponent]
    });
    fixture = TestBed.createComponent(ModalboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
