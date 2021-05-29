import { Component, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import 'chartjs-plugin-colorschemes/src/plugins/plugin.colorschemes';
import {
  ChartDataSets,
  ChartOptions,
  ChartType,
  Chart,
  plugins,
} from 'chart.js';

import * as themes from 'chartjs-plugin-colorschemes';

import { ApiService } from 'src/app/Services/api.service';
import { DeptosServiceService } from 'src/app/Services/deptos-service.service';

@Component({
  selector: 'app-graficas',
  templateUrl: './graficas.component.html',
  styleUrls: ['./graficas.component.css'],
})
export class GraficasComponent implements OnInit {
  chart_depto_pa: any;
  chart_muni_pa: any;
  chart_edad_pa: any;

  constructor(
    private apiService: ApiService,
    private deptoService: DeptosServiceService
  ) {
    // BaseChartDirective.registerPlugin(p);
  }

  departamentos = [];
  municipios = [];

  departamento_selected = [];

  filtroDeptoActive: boolean = false;
  filtroMuniActive: boolean = false;

  departamento_seleccionado=""
  color_depto_seleccionado=""
  evtEmitter = new EventEmitter<any>();
  ngOnInit(): void {
    //console.log(this.myChart?.data?.datasets[0]?._meta)
    this.departamentos = this.deptoService.obtener_departamentos();
    //console.log(this.deptoService.obtener_municipios("Chimaltenango"))

    this.apiService.pacientes_por_depto().subscribe((data) => {
      let valores = [],
        labels = [];
      for (let index = 0; index < data.data.length; index++) {
        const element = data.data[index];
        valores.push(element.cantidad);
        let porcentaje = ((element.cantidad / data.total) * 100).toFixed(1);
        labels.push(element.valor);
        this.porcentajes_depto.push(porcentaje + '%');
      }

      this.chart_depto_pa = new Chart('chart-depto-pa', {
        type: 'pie',
        data: {
          labels: labels,
          datasets: [
            {
              label: '# of Votes',
              data: valores,
              borderWidth: 1,
            },
          ],
        },
        options: {
          onClick: (evt, item) => {
            try {
              let i = item[0]['_index'];
              let label = item[0]['_chart'].chart.config.data.labels[i];
              this.departamento_seleccionado = label.split('-')[0];
              this.color_depto_seleccionado =
                item[0]['_chart'].chart.config.data.datasets[0].backgroundColor[
                  i
                ];
              //console.log(color);
              //console.log(depto)
              this.filtroDeptoActive = true;
              this.select_depto(this.departamento_seleccionado, this.color_depto_seleccionado);
            } catch (error) {
              console.log('Quitar filtro');
              if (this.filtroDeptoActive && !this.filtroMuniActive) {
                this.filtroDeptoActive = false;
                this.restablecer_Grafica_edad();
                this.restablecer_Grafica_municipio();
              }
            }
          },
          title: {
            display: true,
            text: 'Pacientes por Departamento, Total:'+data.total,
          },
          legend: {
            display: false,
            // position:'bottom',
            // fullWidth:true,
          },
          responsive: true,
          plugins: {
            colorschemes: {
              scheme: 'brewer.GnBu9',
              //scheme:"brewer.Paired12"
            },
          },
          layout: {
            padding: 0,
          },
        },
      });
      this.chart_depto_pa.options.plugins = themes;
      //this.chart_depto_pa.options.onClick= this.click
      //console.log(this.myChart.data)
      this.data_labels = this.customLegends(this.chart_depto_pa);
    });

    this.apiService.pacientes_por_lugar('municipio').subscribe((data) => {
      let valores = [],
        labels = [];
      for (let index = 0; index < data.data.length; index++) {
        const element = data.data[index];
        valores.push(element.cantidad);
        let porcentaje = ((element.cantidad / data.total) * 100).toFixed(1);
        labels.push(element.valor + ' - ' + porcentaje + '%');
      }

      /* console.log(valores)
      console.log(labels) */

      this.chart_muni_pa = new Chart('chart-muni-pa', {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [
            {
              //label: '# of Votes',
              data: valores,
              borderWidth: 1,
              backgroundColor: 'Blue',
            },
          ],
        },
        options: {
          onClick: (evt, item) => {
            try {
              let i = item[0]['_index'];
              let label = item[0]['_chart'].chart.config.data.labels[i];
              let muni = label.split('-')[0].trim();
              let color =
                item[0]['_chart'].chart.config.data.datasets[0].backgroundColor[
                  i
                ];
              console.log(muni);

              //console.log(depto)
              this.filtroMuniActive = true;
              this.select_municipio(muni);
            } catch (error) {
              if (this.filtroMuniActive && !this.filtroDeptoActive) {
                console.log('Quitar filtro');
                this.filtroMuniActive = false;
                this.restablecer_Grafica_edad();
              }else{
                this.filtroMuniActive = false;
                this.select_depto(this.departamento_seleccionado, this.color_depto_seleccionado);
              }

              //this.grafica_por_municipio();
            }
          },
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                },
              },
            ],
          },
          title: {
            display: true,
            text: 'Pacientes por Municipio, Total:' + data.total,
            position: 'top',
          },
          legend: {
            display: false,
            // position:'bottom',
            // fullWidth:true,
          },
          responsive: true,
          plugins: {},
          layout: {
            padding: 0,
          },
        },
      });
      this.chart_muni_pa.options.plugins = themes;
    });

    this.apiService.pacientes_por_edad().subscribe((data) => {
      let valores = [],
        labels = [];
      for (let index = 0; index < data.data.length; index++) {
        const element = data.data[index];
        valores.push(element.total);
        let porcentaje = ((element.total / data.total) * 100).toFixed(1);
        this.porcentajes_edad.push(porcentaje + '%');
      }

      //console.log(this.porcentajes_edad)
      this.chart_edad_pa = new Chart('chart-edad-pa', {
        type: 'doughnut',
        data: {
          labels: [
            'menores de 19 años',
            '19 - 25 años',
            '26 - 32 años',
            '33 - 45 años',
            'màs de 45 años',
          ],
          datasets: [
            {
              label: '# of Votes',
              data: valores,
              borderWidth: 1,
            },
          ],
        },
        options: {
          /* onClick: (evt, item) => {
            try {
              let i = item[0]['_index'];
              let label = item[0]['_chart'].chart.config.data.labels[i];
              let depto = label.split('-')[0];
              let color =
                item[0]['_chart'].chart.config.data.datasets[0].backgroundColor[
                  i
                ];
              console.log(color);
              //console.log(depto)
              this.select_depto(depto, color);
            } catch (error) {
              console.log("Quitar filtro")
              this.grafica_por_municipio();
            }
          }, */
          title: {
            display: true,
            text: 'Clasificacion de pacientes por edad, Total: ' + data.total,
          },
          legend: {
            display: false,
            // position:'bottom',
            // fullWidth:true,
          },
          responsive: true,
          plugins: {
            colorschemes: {
              scheme: 'brewer.GnBu9',
              //scheme:"brewer.Paired12"
            },
          },
          layout: {
            padding: 0,
          },
        },
      });
      this.chart_edad_pa.options.plugins = themes;
      //this.chart_depto_pa.options.onClick= this.click
      //console.log(this.myChart.data)
      this.data_labels_edad = this.customLegends(this.chart_edad_pa);
    });
  }

  //legendListId = document.getElementById("legendList");

  data_labels = [];
  data_labels_muni = [];
  data_labels_edad = [];
  porcentajes_edad = [];
  porcentajes_depto = [];
  customLegends(chart) {
    let data = chart?.data?.datasets[0].backgroundColor;
    let labels = chart.data.labels;
    let data_labels = [];
    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      //console.log(element._model.backgroundColor + " " + labels[index])

      data_labels.push({ label: labels[index], color: element });
      // var li = document.createElement("li");
      // li.style.color = element._model.backgroundColor;
      // li.appendChild(document.createTextNode("Legend Test "+(labels[index])));
      // legendListId.appendChild(li);
    }
    //console.log(this.data_labels)

    return data_labels;
  }

  select_depto(depto, color) {
    //this.chart_muni_pa=null
    this.apiService.pacientes_por_municipio(depto).subscribe((data) => {
      //console.log(data);
      let valores = [],
        labels = [];
      for (let index = 0; index < data.data.length; index++) {
        const element = data.data[index];
        valores.push(element.cantidad);
        let porcentaje = ((element.cantidad / data.total) * 100).toFixed(1);
        labels.push(element.valor + ' - ' + porcentaje + '%');
      }

      this.chart_muni_pa.data.labels = labels;
      this.chart_muni_pa.data.datasets[0].data = valores;
      this.chart_muni_pa.data.datasets[0].backgroundColor = color;
      this.chart_muni_pa.options.title.text =
        'Pacientes en el departamento de ' + depto + ', Total: ' + data.total;

      this.chart_muni_pa.options.onClick = (evt, item) => {
        try {
          let i = item[0]['_index'];
          let label = item[0]['_chart'].chart.config.data.labels[i];
          let muni = label.split('-')[0].trim();
          let color =
            item[0]['_chart'].chart.config.data.datasets[0].backgroundColor[i];
          console.log(muni);

          //console.log(depto)
          this.filtroMuniActive = true;
          this.select_municipio(muni);
        } catch (error) {
          if (this.filtroMuniActive && !this.filtroDeptoActive) {
            console.log('Quitar filtro');
            this.filtroMuniActive = false;
            this.restablecer_Grafica_edad();
          }else{
            this.filtroMuniActive = false;
            this.select_depto(this.departamento_seleccionado, this.color_depto_seleccionado);
          }
          //this.grafica_por_municipio();
        }
      };
      this.chart_muni_pa.update();

      //console.log(this.chart_muni_pa.data);
      //this.data_labels_muni = this.customLegends(this.chart_muni_pa);
    });

    this.apiService
      .pacientes_por_lugar_edad('departamento', depto)
      .subscribe((data) => {
        this.porcentajes_edad = [];
        let valores = [],
          labels = [];
        for (let index = 0; index < data.data.length; index++) {
          const element = data.data[index];
          valores.push(element.total);
          let porcentaje = ((element.total / data.total) * 100).toFixed(1);
          this.porcentajes_edad.push(porcentaje + '%');
        }

        //this.chart_muni_pa.data.labels = labels;
        this.chart_edad_pa.data.datasets[0].data = valores;
        //this.chart_edad_pa.data.datasets[0].backgroundColor = color;
        this.chart_edad_pa.options.title.text =
          'Clasificacion por edad en el departamento de ' +
          depto +
          ', Total: ' +
          data.total;
        this.chart_edad_pa.update();
      });
  }

  select_municipio(muni) {
    this.apiService
      .pacientes_por_lugar_edad('municipio', muni)
      .subscribe((data) => {
        this.porcentajes_edad = [];
        let valores = [],
          labels = [];
        for (let index = 0; index < data.data.length; index++) {
          const element = data.data[index];
          valores.push(element.total);
          let porcentaje = ((element.total / data.total) * 100).toFixed(1);
          this.porcentajes_edad.push(porcentaje + '%');
        }

        //this.chart_muni_pa.data.labels = labels;
        this.chart_edad_pa.data.datasets[0].data = valores;
        //this.chart_edad_pa.data.datasets[0].backgroundColor = color;
        this.chart_edad_pa.options.title.text =
          'Clasificacion por edad en el municipio de ' +
          muni +
          ', Total: ' +
          data.total;
        this.chart_edad_pa.update();
      });
  }

  restablecer_Grafica_municipio() {
    this.apiService.pacientes_por_lugar('municipio').subscribe((data) => {
      //console.log(data);
      let valores = [],
        labels = [];
      for (let index = 0; index < data.data.length; index++) {
        const element = data.data[index];
        valores.push(element.cantidad);
        let porcentaje = ((element.cantidad / data.total) * 100).toFixed(1);
        labels.push(element.valor + ' - ' + porcentaje + '%');
      }

      this.chart_muni_pa.data.labels = labels;
      this.chart_muni_pa.data.datasets[0].data = valores;
      this.chart_muni_pa.data.datasets[0].backgroundColor = 'Blue';
      this.chart_muni_pa.options.title.text =
        'Pacientes por Municipio, Total:' + data.total;

      this.chart_muni_pa.options.onClick = (evt, item) => {
        try {
          let i = item[0]['_index'];
          let label = item[0]['_chart'].chart.config.data.labels[i];
          let muni = label.split('-')[0].trim();
          let color =
            item[0]['_chart'].chart.config.data.datasets[0].backgroundColor[i];
          console.log(muni);

          //console.log(depto)
          this.filtroMuniActive = true;
          this.select_municipio(muni);
        } catch (error) {
          if (this.filtroMuniActive && !this.filtroDeptoActive) {
            console.log('Quitar filtro');
            this.filtroMuniActive = false;
            this.restablecer_Grafica_edad();
          }else{
            this.filtroMuniActive = false;
            this.select_depto(this.departamento_seleccionado, this.color_depto_seleccionado);
          }
          //this.grafica_por_municipio();
        }
      };

      this.chart_muni_pa.update();

      console.log(this.chart_muni_pa.data);
      //this.data_labels_muni = this.customLegends(this.chart_muni_pa);
    });
  }

  restablecer_Grafica_edad() {
    this.apiService.pacientes_por_edad().subscribe((data) => {
      this.porcentajes_edad = [];
      let valores = [],
        labels = [];
      for (let index = 0; index < data.data.length; index++) {
        const element = data.data[index];
        valores.push(element.total);
        let porcentaje = ((element.total / data.total) * 100).toFixed(1);
        this.porcentajes_edad.push(porcentaje + '%');
      }

      //this.chart_muni_pa.data.labels = labels;
      this.chart_edad_pa.data.datasets[0].data = valores;
      //this.chart_edad_pa.data.datasets[0].backgroundColor = color;
      this.chart_edad_pa.options.title.text =
        'Clasificacion de pacientes por edad, Total: ' + data.total;
      this.chart_edad_pa.update();
    });
  }
}
