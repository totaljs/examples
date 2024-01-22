import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private _http: HttpClient) {}

  addEmployee(data: any): Observable<any> {
    return this._http.post('/api/employees/create', data);
  }

  updateEmployee(id: string, data: any): Observable<any> {
    return this._http.put(`/api/employees/update/${id}`, data);
  }

  getEmployeeList(): Observable<any> {
    return this._http.get('/api/employees');
  }

  deleteEmployee(id: string): Observable<any> {
    return this._http.delete(`/api/employees/remove/${id}`);
  }
}
