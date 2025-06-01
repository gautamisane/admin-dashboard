import { Component } from '@angular/core';
import { ServiceService } from '../../shared/service.service';
import { data } from '../../mock';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  constructor(private service: ServiceService) { }
  currentRole = this.service.currentRole;
  data = data;

  ngOnInit() {
    localStorage.setItem('role', 'Viewer')
    this.currentRole = 'Viewer'
  }


  setRole(role: string) {
    this.currentRole = role;
    this.service.setRole(role);
  }

  // Emits selected row to all subscribers.
  onRowClick(ev: any) {
    this.service.setSelectedRow(ev)
  }


}
