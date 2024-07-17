import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { User, Workout } from '../../services/user.service';

@Component({
  selector: 'app-add-user-dialog',
  templateUrl: './add-user-diag.component.html'
})
export class AddUserDialogComponent implements OnInit {
  userForm!: FormGroup;

  @Output() userAdded = new EventEmitter<User>();

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      workouts: this.fb.array([
        this.fb.group({
          type: ['', Validators.required],
          minutes: ['', [Validators.required, Validators.min(1)]]
        })
      ])
    });
  }

  get workouts(): FormArray {
    return this.userForm.get('workouts') as FormArray;
  }

  addWorkout(): void {
    this.workouts.push(this.fb.group({
      type: ['', Validators.required],
      minutes: ['', [Validators.required, Validators.min(1)]]
    }));
  }

  removeWorkout(index: number): void {
    this.workouts.removeAt(index);
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      const newUser: User = {
        id: '0',
        name: this.userForm.value.name,
        workouts: this.userForm.value.workouts
      };
      console.log('form submitted. emitting user dialog box:', newUser);
      this.userAdded.emit(newUser);
      this.userForm.reset();
    }
  }

  onCancel(): void {
    this.userForm.reset();
  }
}
