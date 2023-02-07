import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportSyllabusComponent } from './import-syllabus.component';

describe('ImportSyllabusComponent', () => {
  let component: ImportSyllabusComponent;
  let fixture: ComponentFixture<ImportSyllabusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportSyllabusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImportSyllabusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
