import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { User, Workout } from '../../services/user.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html'
})
export class ChartComponent implements OnChanges {
  @Input() user: User | null = null;
  chartData: any;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['user'] && this.user) {
      this.updateChartData();
    }
  }

  private updateChartData(): void {
    this.chartData = {
      labels: this.user!.workouts.map(workout => workout.type),
      datasets: [
        {
          label: 'Workout Minutes',
          data: this.user!.workouts.map(workout => workout.minutes),
          backgroundColor: '#42A5F5'
        }
      ]
    };
  }
}
