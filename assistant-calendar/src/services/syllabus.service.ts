import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SyllabusService {
  private apiUrl = 'http://localhost:5000/upload';

  syllabusData$ = new Subject<Event[]>();

  constructor(private http: HttpClient) {}

  uploadPdfAndFetchData(pdfFile: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', pdfFile, pdfFile.name);

    return this.http.post(this.apiUrl, formData).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error uploading PDF:', error);
        return throwError('Something went wrong. Please try again later.');
      }),
      // Emit an event to trigger data fetching
      catchError(() => {
        this.fetchSyllabusData();
        return [];
      })
    );
  }

  private fetchSyllabusData(): void {
    this.http.get<Event[]>('http://localhost:5000/upload').subscribe(
      (data) => {
        // Update the syllabusData$ subject with the fetched data
        this.syllabusData$.next(data);
      },
      (error) => {
        console.error('Error fetching syllabus data:', error);
      }
    );
  }
}
