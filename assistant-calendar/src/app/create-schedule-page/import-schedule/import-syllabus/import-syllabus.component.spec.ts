import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ImportSyllabusComponent } from './import-syllabus.component';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('ImportSyllabusComponent', () => {
  let component: ImportSyllabusComponent;
  let fixture: ComponentFixture<ImportSyllabusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImportSyllabusComponent],
      imports: [
        MatDialogModule,
        BrowserAnimationsModule // Import BrowserAnimationsModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA] // Keep this to ignore unrecognized elements and attributes
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImportSyllabusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle file drop correctly', () => {
    const mockFile: File = new File(
      ["dummy content"], 
      "0-ECO1504 C - Prof. Boubacar Moumouni.pdf", 
      { type: "application/pdf" }
    );

    // Using type assertion to bypass TypeScript type checking
    const mockFileEntry: any = {
      isFile: true,
      isDirectory: false,
      name: mockFile.name,
      file: (callback: (file: File) => void) => {
        callback(mockFile);
      }
    };

    const mockNgxFileDropEntry = {
      fileEntry: mockFileEntry
    };

    component.fileUploadHandler([mockNgxFileDropEntry as any]);
    expect(component.files.length).toBeGreaterThan(0);
  });

  it('should correctly transform file sizes', () => {
    const size = component.transform(1024); // 1 KB
    expect(size).toBe('1.00 KB');
  });

  it('should remove a file on removeFile call', () => {
    const mockFile = { relativePath: 'test.pdf' };
    component.data.push(mockFile as any);
    component.removeFile(mockFile as any);
    expect(component.data.length).toBe(0);
  });
});
