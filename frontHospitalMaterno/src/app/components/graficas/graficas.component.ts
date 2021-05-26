import { Component, OnInit } from '@angular/core';
import 'chartjs-plugin-colorschemes/src/plugins/plugin.colorschemes';
import { ChartDataSets, ChartOptions, ChartType, Chart, plugins } from 'chart.js';

import { BaseChartDirective, Color, Label, ThemeService } from 'ng2-charts';
import * as themes from 'chartjs-plugin-colorschemes';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
// import * as datalabels from 'c';
import { Aspect6 } from 'chartjs-plugin-colorschemes/src/colorschemes/colorschemes.office';
// import 'chartjs-plugin-colorschemes';
// import 'chartjs-plugin-colorschemes/src/plugins/plugin.colorschemes';
// import { Aspect6 } from 'chartjs-plugin-colorschemes/src/colorschemes/colorschemes.office';
// import * as pluginDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-graficas',
  templateUrl: './graficas.component.html',
  styleUrls: ['./graficas.component.css']
})
export class GraficasComponent implements OnInit {


  constructor() {
    // BaseChartDirective.registerPlugin(p);
  }

  ngOnInit(): void {
    // var ctx = document.getElementById('myChart');
    var myChart = new Chart("myChart", {
      type: 'pie',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange', 'Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange','Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
          label: '# of Votes',
          data: [12, 19, 3, 5, 9, 3, 12, 19, 3, 5, 9, 3, 3, 5, 9, 3],
          borderWidth: 1
        }]
      },
      options: {
        title: {
          display: true,
          text: 'Pacientes por Departamento'
        },
        legend: {
          display: false
          // position:'bottom',
          // fullWidth:true,
        },
        responsive: true,
        plugins: {
          colorschemes: {
            // scheme: 'brewer.YlGnBu9',
            scheme:"brewer.Paired12"
          }
        },
        layout:{
          padding:0
        }
      }
    });
    myChart.options.plugins = (themes)


    this.customLegends(myChart, this.legendListId);
  }

  legendListId = document.getElementById("legendList");


  data_labels = []
  customLegends(chart, legendListId) {
    let data = chart.data.datasets[0]._meta[0].data
    let labels = (chart.data.labels)

    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      console.log(element._model.backgroundColor + " " + labels[index])

      this.data_labels.push({ "label": labels[index], "color": element._model.backgroundColor })
      // var li = document.createElement("li");
      // li.style.color = element._model.backgroundColor;
      // li.appendChild(document.createTextNode("Legend Test "+(labels[index])));
      // legendListId.appendChild(li); 
    }
    console.log(this.data_labels)

  }


  // public barChartOptions: ChartOptions = {
  //   responsive: true,
  //   // We use these empty structures as placeholders for dynamic theming.
  //   scales: { xAxes: [{}], yAxes: [{}] },
  //   plugins: {
  //     colorschemes: {

  //       scheme: 'brewer.Paired12'

  //     }
  //   }
  // };


  // public barChartLabels: Label[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  // public barChartType: ChartType = 'bar';
  // public barChartLegend = true;
  // public barChartPlugins = [ThemeService];
  // // public barChartPlugins = [pluginDataLabels];
  // // 
  // public barChartData: ChartDataSets[] = [
  //   { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
  //   { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' },
  //   { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series C' },
  // ];


  // // events
  // public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
  //   console.log(event, active);
  // }

  // public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
  //   console.log(event, active);
  // }

  // public randomize(): void {
  //   // Only Change 3 values
  //   this.barChartData[0].data = [
  //     Math.round(Math.random() * 100),
  //     59,
  //     80,
  //     (Math.random() * 100),
  //     56,
  //     (Math.random() * 100),
  //     40 ];
  // }




}
