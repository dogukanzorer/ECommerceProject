import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteDailogComponent } from './delete-dailog.component';

describe('DeleteDailogComponent', () => {
  let component: DeleteDailogComponent;
  let fixture: ComponentFixture<DeleteDailogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteDailogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteDailogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
