import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { BarChartComponent } from "../../components/bar-chart/bar-chart.component";
import { TitleComponent } from "../../components/title/title.component";
import { MonthYear } from '../../models/month-year';

@Component({
  selector: 'app-graphic',
  standalone: true,
  imports: [BaseChartDirective, CommonModule, BarChartComponent, TitleComponent],
  templateUrl: './graphic.component.html',
  styleUrl: './graphic.component.css'
})

export class GraphicComponent {

    monthYear: MonthYear;
    monthsYears: MonthYear[];
    uniqueYear: number[] = [];

    ngOnInit() {

        this.monthsYears = [
            this.monthYear = {
                month: 11,
                year: 2021
            },
            this.monthYear = {
                month: 12,
                year: 2022
            },
            this.monthYear = {
                month: 1,
                year: 2023
            },
            this.monthYear = {
                month: 2,
                year: 2023
            },
            this.monthYear = {
                month: 3,
                year: 2023
            },
            this.monthYear = {
                month: 4,
                year: 2023
            },
            this.monthYear = {
                month: 1,
                year: 2024
            }
        ]

        this.uniqueYear = this.getUniqueYear(this.monthsYears);

    }

    private getUniqueYear(monthYear: MonthYear[]): number[] {
        return Array.from(new Set(monthYear.map(obj => obj.year)));
    }

}
