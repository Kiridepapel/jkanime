import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JKAnimeComponent } from './jkanime.component';

describe('MainComponent', () => {
  let component: JKAnimeComponent;
  let fixture: ComponentFixture<JKAnimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JKAnimeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JKAnimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
