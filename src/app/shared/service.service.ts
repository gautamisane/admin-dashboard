import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private roleSubject = new BehaviorSubject<string>(
    localStorage.getItem('role') || 'Viewer'
  );
  private selectedRowSubject = new BehaviorSubject<any>(null);
  roleObservable = this.roleSubject.asObservable();
  selectedRowObservable = this.selectedRowSubject.asObservable();

  setRole(role: string) {
    localStorage.setItem('role', role)
    this.roleSubject.next(role) // emits this role to all subsribers.
  }

  get currentRole() {
    return this.roleSubject.value;
  }

  setSelectedRow(row: any) {
    this.selectedRowSubject.next(row)
  }

  constructor() { }
}
