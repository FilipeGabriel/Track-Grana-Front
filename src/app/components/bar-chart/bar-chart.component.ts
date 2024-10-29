import { Component } from '@angular/core';
import { Month } from '../../models/month';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-bar-chart',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.css'
})
export class BarChartComponent {

    month: Month;

    public barChartLabels: string[];
    public barChartType: string;
    public barChartData: any[];
    public barChartOptions: any;

    constructor(){
        this.month = new Month();
    }

    ngOnInit(){
        this.changeColors();
        this.updateChartData();
    }

    months: Month[] = [
        { name: 'Janeiro', value: 3000, color: 'rgb(183, 188, 184)' },
        { name: 'Feveiro', value: 2400, color: 'rgb(183, 188, 184)' },
        { name: 'Março', value: 3450, color: 'rgb(183, 188, 184)' },
        { name: 'Abril', value: 4100, color: 'rgb(183, 188, 184)' },
        { name: 'Maio', value: 2900, color: 'rgb(183, 188, 184)' },
        { name: 'Junho', value: 2750, color: 'rgb(183, 188, 184)' },
        { name: 'Julho', value: 2200, color: 'rgb(183, 188, 184)' },
        { name: 'Agosto', value: 3550, color: 'rgb(183, 188, 184)' },
        { name: 'Setembro', value: 2760, color: 'rgb(183, 188, 184)' },
        { name: 'Outubro', value: 2600, color: 'rgb(183, 188, 184)' },
        { name: 'Novembro', value: 2950, color: 'rgb(183, 188, 184)' },
        { name: 'Dezembro', value: 2850, color: 'rgb(183, 188, 184)' }
    ]

    numbers: number[] = this.months.map(months => months.value);

    maxNumber: number = Math.max(...this.numbers);
    minNumber: number = Math.min(...this.numbers);

    changeColors(){

        for (let i = 0; i < this.months.length; i++){
            if (this.months[i].value === this.minNumber){
                this.months[i].color = 'rgb(61, 166, 72)';
            }if (this.months[i].value === this.maxNumber){
                this.months[i].color = 'rgb(243, 145, 29)';
            }
        }
    }

    updateChartData() {

        this.barChartOptions = {
        responsive: true,
        plugins: {
            legend: {
            display: false
            }
        },
        scales: {
            x: {
            beginAtZero: true
            },
            y: {
            beginAtZero: true
            }
        }
        };
        this.barChartLabels = this.months.map(months => months.name);
        this.barChartType = 'bar';
        this.barChartData = [
        {
            data: this.numbers,
            label: 'Valor da fatura',
            backgroundColor: this.months.map(months => months.color)
        }
        ];
    }

}
