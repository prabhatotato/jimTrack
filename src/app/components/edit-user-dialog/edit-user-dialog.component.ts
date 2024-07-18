import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { User, Workout } from '../../services/user.service';

@Component({
  selector: 'app-edit-user-dialog',
  templateUrl: './edit-user-dialog.component.html'
})
export class EditUserDialogComponent {
  userForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public user: User
  ) {
    this.userForm = this.fb.group({
      name: [user.name, Validators.required],
      workouts: this.fb.array(user.workouts.map(workout => this.createWorkoutFormGroup(workout)))
    });
  }

  createWorkoutFormGroup(workout: Workout): FormGroup {
    return this.fb.group({
      type: [workout.type, Validators.required],
      minutes: [workout.minutes, [Validators.required, Validators.min(1)]]
    });
  }

  get workouts(): FormArray {
    return this.userForm.get('workouts') as FormArray;
  }

  addWorkout(): void {
    this.workouts.push(this.createWorkoutFormGroup({ type: '', minutes: 0 }));
  }

  removeWorkout(index: number): void {
    this.workouts.removeAt(index);
  }

  onSave(): void {
    if (this.userForm.valid) {
      const updatedUser: User = {
        ...this.user,
        name: this.userForm.value.name,
        workouts: this.userForm.value.workouts
      };
      this.dialogRef.close(updatedUser);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
