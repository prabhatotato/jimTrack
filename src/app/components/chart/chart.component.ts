import { Component, Input, OnChanges } from '@angular/core';
// import * as CanvasJS from '@canvasjs/angular-charts';
import { User, Workout } from '../../services/user.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html'
})
export class ChartComponent implements OnChanges {
  @Input() user: User | null = null;

  chartOptions: any = {
    animationEnabled: true,
    title: {
      text: "Workout Progress"
    },
    axisY: {
      title: "Minutes"
    },
    data: [{
      type: "column",
      dataPoints: []
    }]
  };

  ngOnChanges(): void {
    this.updateChart();
  }

  updateChart(): void {
    if (this.user) {
      this.chartOptions.data[0].dataPoints = this.user.workouts.map((workout: Workout) => ({
        label: workout.type,
        y: workout.minutes
      }));
    }

    console.log(this.chartOptions);
    
  }
}
