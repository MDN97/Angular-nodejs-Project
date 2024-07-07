import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Data } from '../interfaces/data';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MeetingRoomsService {
  private baseUrl = 'http://localhost:5000/api/meetingRooms';

  constructor(private http: HttpClient) {}

  postData(data: any) {
    debugger;
    return this.http.post(this.baseUrl, data, {
      responseType: 'text' as 'json',
    });
  }

  getData(): Observable<Data[]> {
    return this.http.get(this.baseUrl).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  updateData(data: any, id?: number) {
    return this.http.put(`${this.baseUrl}/${id}`, data, {
      responseType: 'text' as 'json',
    });
  }

  deleteData(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`).pipe(
      map((response: any) => {
        const deleteResponse = response.json;
        console.log('deleteResponse: ', deleteResponse);
      })
    );
  }
}
