import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../shared/service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { data } from '../../mock';
import { ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-settings',
  standalone: false,
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent implements OnInit {

  constructor(private service: ServiceService, private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) { }

  settingsForm!: FormGroup;
  roleCounts: any = {};
  barChartLabels: string[] = ['Admin', 'Viewer'];
  barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: ['Admin', 'Viewer'],
    datasets: [
      { data: [0, 0], label: 'User Count' }
    ]
  };
  data = data;

  ngOnInit() {
    const currentRole = localStorage.getItem('role') || 'Viewer';
    console.log(currentRole)
    // Selected row in table
    this.service.selectedRowObservable.subscribe(row => {
      console.log(row)
    })

    this.settingsForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required],
      address: this.fb.group({
        street: ['', Validators.required],
        city: ['', Validators.required],
        state: ['']
      })
    });

    this.calculateRoleCounts();

  }

  calculateRoleCounts() {
    const counts: any = { Admin: 0, Viewer: 0 };

    data.forEach(user => {
      counts[user.Role] = (counts[user.Role] || 0) + 1;
    });

    this.roleCounts = counts;
    this.barChartData = {
      labels: ['Admin', 'Viewer'],
      datasets: [
        {
          data: [counts.Admin, counts.Viewer],
          label: 'User Count'
        }
      ]
    };

  }

  onSubmit(): void {
    if (this.settingsForm.valid) {
      console.log('Form Submitted:', this.data, this.settingsForm.value);
      let formData = this.settingsForm.value;
      const mappedUser = {
        ID: data.length + 1,
        Name: formData.name,
        Email: formData.email,
        Role: formData.role,
        Address: formData.address.state
          ? `${formData.address.city}, ${formData.address.state}`
          : `${formData.address.city}`,
        Skills: []
      };
      this.data.push(mappedUser);
      this.calculateRoleCounts();
      this.snackBar.open('Form submitted successfully!', 'Close', {
        duration: 2000,
        horizontalPosition: 'right',
        verticalPosition: 'bottom',
      }).afterDismissed().subscribe(() => {
        this.snackBar.open('Chart updated!', 'Close', {
          duration: 2000,
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
        });
      });
     
    } else {
      this.settingsForm.markAllAsTouched();
    }
  }

}







