import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reservation } from '../interfaces/reservation';

@Injectable({
  providedIn: 'root',
})
export class ReservationsService {
  private apiUrl = 'http://localhost:5000/api/reservations';

  constructor(private http: HttpClient) {}

  getData(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(this.apiUrl);
  }

  postData(data: Reservation): Observable<Reservation> {
    return this.http.post<Reservation>(this.apiUrl, data);
  }

  updateData(data: Reservation, id: string): Observable<Reservation> {
    return this.http.put<Reservation>(`${this.apiUrl}/${id}`, data);
  }

  deleteData(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
