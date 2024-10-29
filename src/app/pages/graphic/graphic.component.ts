import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { Month } from '../../models/month';
import { BarChartComponent } from "../../components/bar-chart/bar-chart.component";
import { TitleComponent } from "../../components/title/title.component";

@Component({
  selector: 'app-graphic',
  standalone: true,
  imports: [BaseChartDirective, CommonModule, BarChartComponent, TitleComponent],
  templateUrl: './graphic.component.html',
  styleUrl: './graphic.component.css'
})
export class GraphicComponent {

}
