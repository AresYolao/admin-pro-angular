import { Component, OnInit, Input } from '@angular/core';
import { MultiDataSet, Label, Colors } from 'ng2-charts';
import { ChartType } from 'chart.js';

@Component({
  selector: 'app-grafico-dona',
  templateUrl: './grafico-dona.component.html',
  styles: []
})
export class GraficoDonaComponent implements OnInit {
  
  @Input('chartLabels') doughnutChartLabels: Label[] = []; 
  // = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  @Input('chartData') doughnutChartData: MultiDataSet = [];
  @Input('chartType') doughnutChartType: ChartType;

  constructor() { }

  ngOnInit() {
  }

}
