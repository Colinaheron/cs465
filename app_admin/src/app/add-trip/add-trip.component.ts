import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { TripDataService } from '../services/trip-data.service';

@Component({
  selector: 'app-add-trip',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-trip.component.html',
  styleUrls: ['./add-trip.component.css'] // Fixed "styleUrl" to "styleUrls"
})
export class AddTripComponent implements OnInit {
  public addForm!: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private tripService: TripDataService
  ) {}

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      _id: [],
      code: ["", Validators.required], // Replaced invalid quotes
      name: ["", Validators.required], // Replaced invalid quotes
      length: ["", Validators.required], // Replaced invalid quotes
      start: ["", Validators.required], // Replaced invalid quotes
      resort: ["", Validators.required], // Replaced invalid quotes
      perPerson: ["", Validators.required], // Replaced invalid quotes
      image: ["", Validators.required], // Replaced invalid quotes
      description: ["", Validators.required] // Replaced invalid quotes
    });
  }

  public onSubmit() {
    this.submitted = true;

    if (this.addForm.valid) {
      this.tripService.addTrip(this.addForm.value)
        .subscribe({
          next: (data: any) => {
            console.log(data);
            this.router.navigate(['']);
          },
          error: (error: any) => {
            console.log('Error: ' + error);
          }
        });
    }
  }

  // get the form short name to access the form fields
  get f() { return this.addForm.controls; }
}

