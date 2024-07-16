import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
      workoutType: ['', Validators.required],
      minutes: ['', [Validators.required, Validators.min(1)]]
    });
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      const newUser: User = {
        id: 0,
        name: this.userForm.value.name,
        workouts: [{
          type: this.userForm.value.workoutType,
          minutes: this.userForm.value.minutes
        }]
      };
      this.userAdded.emit(newUser);
      this.userForm.reset();
    }
  }

  onCancel(): void {
    this.userForm.reset();
  }
}
