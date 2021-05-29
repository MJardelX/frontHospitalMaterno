import { Component, OnInit } from '@angular/core';
//import { ApiService } from 'src/app/Services/api.service';
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
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-graficas-bebes',
  templateUrl: './graficas-bebes.component.html',
  styleUrls: ['./graficas-bebes.component.css'],
})
export class GraficasBebesComponent implements OnInit {
  chart_depto_ba: any;
  chart_muni_ba: any;
  chart_year_ba: any;
  chart_month_ba: any;

  filtro_depto_active: boolean = false;
  filtro_municipio_active: boolean = false;
  filtro_year_active: boolean = false;
  filtro_month_active:boolean=false;

  depto_selected = '';
  muni_selected = '';
  year_selected = '';
  depto_color_selected = '';
  year_color_selected = '';
  month_selected=""

  meses=[
    { "value": "01", "name": "Enero", "shortName": "Ene" },
    { "value": "02", "name": "Febrero", "shortName": "Feb" },
    { "value": "03", "name": "Marzo", "shortName": "Mar" },
    { "value": "04", "name": "Abril", "shortName": "Abr" },
    { "value": "05", "name": "Mayo", "shortName": "May" },
    { "value": "06", "name": "Junio", "shortName": "Jun" },
    { "value": "07", "name": "Julio", "shortName": "Jul" },
    { "value": "08", "name": "Agosto", "shortName": "Ago" },
    { "value": "09", "name": "Septiembre", "shortName": "Sep" },
    { "value": "10", "name": "Octubre", "shortName": "Oct" },
    { "value": "11", "name": "Noviembre", "shortName": "Nov" },
    { "value": "12", "name": "Diciembre", "shortName": "Dic" }
  ]
  

  constructor(private apiService: ApiService) {}

  labels_ba_depto = [];
  labels_ba_year = [];
  porcentajes_depto = [];
  porcentajes_year = [];
  ngOnInit(): void {
    this.apiService.bebes_por_depto().subscribe((data) => {
      let valores = [],
        labels = [];
      for (let index = 0; index < data.data.length; index++) {
        const element = data.data[index];
        valores.push(element.cantidad);
        let porcentaje = ((element.cantidad / data.total) * 100).toFixed(1);
        labels.push(element.valor);
        this.porcentajes_depto.push(porcentaje + '%');
      }

      this.chart_depto_ba = new Chart('chart-depto-ba', {
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
              this.depto_selected = label.split('-')[0];
              this.depto_color_selected =
                item[0]['_chart'].chart.config.data.datasets[0].backgroundColor[
                  i
                ];
              ////(color);
              ////(depto)

              this.select_bebes_depto(
                this.depto_selected,
                this.depto_color_selected
              );
              this.filtro_depto_active = true;
              if(this.filtro_year_active){
                this.select_place_year(this.year_selected,"departamento_nacimiento",this.depto_selected,this.year_color_selected)
                //this.filtro_depto_active = true;
              }

              if(this.filtro_year_active && !this.filtro_municipio_active){
                this.municipio_por_año_depto(this.depto_selected,this.year_selected, this.year_color_selected)
                this.filtro_year_active = true;
              }


            } catch (error) {
              //('Quitar filtro');

              if (
                this.filtro_depto_active &&
                !this.filtro_municipio_active &&
                !this.filtro_year_active
              ) {
                this.filtro_depto_active = false;
                //this.restablecer_Grafica_edad();
                this.restablecer_Grafica_municipio();
                this.restablecer_Grafica_año();
                this.restablecer_Grafica_month();
              }
            }
          },
          title: {
            display: true,
            text: 'Nacimientos por Departamento, Total:'+data.total,
          },
          legend: {
            display: false,
            // position:'bottom',
            // fullWidth:true,
          },
          responsive: true,
          plugins: {
            colorschemes: {
              scheme: 'brewer.BuPu9',
              //scheme:"brewer.Paired12"
            },
          },
          layout: {
            padding: 0,
          },
        },
      });
      this.chart_depto_ba.options.plugins = themes;
      //this.chart_depto_pa.options.onClick= this.click
      ////(this.myChart.data)
      this.labels_ba_depto = this.customLegends(this.chart_depto_ba);
    });

    this.apiService
      .bebes_por_lugar('municipio_nacimiento').subscribe((data) => {
        let valores = [],
          labels = [];
        for (let index = 0; index < data.data.length; index++) {
          const element = data.data[index];
          valores.push(element.cantidad);
          let porcentaje = ((element.cantidad / data.total) * 100).toFixed(1);
          labels.push(element.valor + ' - ' + porcentaje + '%');
        }

        /* //(valores)
      //(labels) */

        this.chart_muni_ba = new Chart('chart-muni-ba', {
          type: 'bar',
          data: {
            labels: labels,
            datasets: [
              {
                //label: '# of Votes',
                data: valores,
                borderWidth: 1,
                backgroundColor: 'Pink',
              },
            ],
          },
          options: {
            onClick: (evt, item) => {
              try {
                let i = item[0]['_index'];
                let label = item[0]['_chart'].chart.config.data.labels[i];
                this.muni_selected = label.split('-')[0].trim();
                /* let color =
                item[0]['_chart'].chart.config.data.datasets[0].backgroundColor[
                  i
                ]; */
                ////(muni);

                ////(depto)
                /* if(){

                } */
                
                

                if(this.filtro_year_active && !this.filtro_month_active){
                  this.select_place_year(this.year_selected,"municipio_nacimiento",this.muni_selected,this.year_color_selected)
                  this.filtro_municipio_active = true;
                }else if(!this.filtro_year_active && !this.filtro_month_active){
                  this.select_municipio(this.muni_selected);
                  this.filtro_municipio_active = true;
                }




              } catch (error) {

                /* if(){
                  console.log("municipio por año y depto")
                }
 */
                if (this.filtro_municipio_active && (!this.filtro_year_active && !this.filtro_depto_active)) {
                  //('Quitar filtro');
                  this.filtro_municipio_active = false;
                  this.restablecer_Grafica_año();
                  this.restablecer_Grafica_month();
                }else if(this.filtro_municipio_active && this.filtro_year_active && !this.filtro_depto_active){
                  this.filtro_municipio_active=false
                  this.select_bebes_year(this.year_selected,this.year_color_selected)
                  this.restablecer_Grafica_año()
                }else if(this.filtro_municipio_active && this.filtro_year_active && this.filtro_depto_active){
                  this.filtro_municipio_active=false
                  this.select_bebes_depto(this.depto_selected,this.depto_color_selected)
                  this.select_place_year(this.year_selected,"departamento_nacimiento",this.depto_selected,this.year_color_selected)
                  //this.filtro_municipio_active = true;
                }else if(this.filtro_depto_active){
                  this.filtro_municipio_active=false
                  this.select_bebes_depto(this.depto_selected,this.depto_color_selected)
                }


                if(this.filtro_depto_active && this.filtro_year_active){
                  this.municipio_por_año_depto(this.depto_selected,this.year_selected, this.year_color_selected)
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
              text: 'Nacimientos por Municipio, Total:' + data.total,
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
        this.chart_muni_ba.options.plugins = themes;
      });

    this.apiService.nacimientos_por_año().subscribe((data) => {
      let valores = [],
        labels = [];
      for (let index = 0; index < data.data.length; index++) {
        const element = data.data[index];
        valores.push(element.cantidad);
        let porcentaje = ((element.cantidad / data.total) * 100).toFixed(1);
        labels.push(element.año);
        this.porcentajes_year.push(porcentaje + '%');
      }

      this.chart_year_ba = new Chart('chart-year-ba', {
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
              this.year_selected = item[0]['_chart'].chart.config.data.labels[i];
              //let año = label.split('-')[0];
              this.year_color_selected =
                item[0]['_chart'].chart.config.data.datasets[0].backgroundColor[
                  i
                ];
              ////(label);
              ////(depto)

              


              if(!this.filtro_depto_active && !this.filtro_municipio_active){
                this.select_bebes_year(this.year_selected, this.year_color_selected);
                this.filtro_year_active = true;
                this.municipio_por_año(this.year_selected, this.year_color_selected)
              }else if(  this.filtro_municipio_active){
                this.select_place_year(this.year_selected,"municipio_nacimiento",this.muni_selected,this.year_color_selected)
                this.filtro_year_active = true;
              }else if( this.filtro_depto_active){
                this.select_place_year(this.year_selected,"departamento_nacimiento",this.depto_selected,this.year_color_selected)
                this.filtro_year_active = true;
              }

              if(this.filtro_depto_active && !this.filtro_municipio_active && !this.filtro_month_active){
                this.municipio_por_año_depto(this.depto_selected,this.year_selected, this.year_color_selected)
                this.filtro_year_active = true;
              }else if(this.filtro_depto_active && this.filtro_month_active && !this.filtro_municipio_active){
                this.municipio_por_depto_mes_año(this.depto_selected,this.year_selected,this.month_selected, this.year_color_selected)
                this.filtro_year_active=true
              }else if(this.filtro_month_active && !this.filtro_depto_active && !this.filtro_municipio_active){
                  this.filtro_year_active=true
                  this.municipio_por_año_mes(this.year_selected,this.month_selected,this.year_color_selected)
              }


              /* f(){

              } */


            } catch (error) {
              //this.filtro_municipio_active=false
              if (this.filtro_year_active && !this.filtro_depto_active && !this.filtro_municipio_active && !this.filtro_month_active) {
                //(error);
                //('Quitar filtro');
                //this.restablecer_Grafica_edad();
                this.filtro_year_active = false;
                this.restablecer_Grafica_month();
                this.restablecer_Grafica_municipio();
              }else if(this.filtro_year_active && this.filtro_municipio_active){
                this.filtro_year_active=false
                this.select_municipio(this.muni_selected)
              }else if(this.filtro_year_active && this.filtro_month_active && this.filtro_depto_active){
                this.filtro_year_active=false;
                this.municipio_por_depto_mes(this.depto_selected,this.month_selected,this.depto_color_selected)
                console.log(this.muni_selected)
                this.select_bebes_depto(this.depto_selected, this.depto_color_selected)
                //this.select_municipio(this.muni_selected)

              }else if(this.filtro_month_active && !this.filtro_depto_active && !this.filtro_municipio_active){
                this.filtro_year_active=false
                this.municipio_por_mes(this.month_selected,"pink")
                //this.select_bebes_depto(this.select_bebes_depto)
              }else{
                this.filtro_year_active=false
                this.select_bebes_depto(this.depto_selected, this.depto_color_selected)
              }



            }
          },
          title: {
            display: true,
            text: 'Nacimientos por año, total: ' + data.total,
          },
          legend: {
            display: false,
            // position:'bottom',
            // fullWidth:true,
          },
          responsive: true,
          plugins: {
            colorschemes: {
              scheme: 'brewer.BuPu9',
              //scheme:"brewer.Paired12"
            },
          },
          layout: {
            padding: 0,
          },
        },
      });
      this.chart_year_ba.options.plugins = themes;
      //this.chart_depto_pa.options.onClick= this.click
      ////(this.myChart.data)
      this.labels_ba_year = this.customLegends(this.chart_year_ba);
    });

    this.apiService.nacimiento_por_fecha('Month').subscribe((data) => {
      let valores = [],
        labels = [];
      for (let index = 0; index < data.data.length; index++) {
        const element = data.data[index];
        valores.push(element.cantidad);
        let porcentaje = ((element.cantidad / data.total) * 100).toFixed(1);
        labels.push(element.valor + ' - ' + porcentaje + '%');
      }

      /* //(valores)
      //(labels) */

      this.chart_month_ba = new Chart('chart-month-ba', {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [
            {
              //label: '# of Votes',
              data: valores,
              borderWidth: 1,
              backgroundColor: 'Pink',
            },
          ],
        },
        options: {
          onClick: (evt, item) => {
            try {
              let i = item[0]['_index'];
              let label = item[0]['_chart'].chart.config.data.labels[i];
              this.month_selected = label.split('-')[0].trim();
              console.log(this.filtro_year_active);
              console.log(this.filtro_depto_active)


              //console.log()
              if(!this.filtro_depto_active && !this.filtro_municipio_active && !this.filtro_year_active){
                this.municipio_por_mes(this.month_selected,"pink")
                this.filtro_month_active=true
              }else if(this.filtro_depto_active && !this.filtro_municipio_active && !this.filtro_year_active){
                this.municipio_por_depto_mes(this.depto_selected,this.month_selected,this.depto_color_selected)
                this.filtro_month_active=true
              }else if(this.filtro_depto_active && this.filtro_year_active && !this.filtro_municipio_active){
                this.municipio_por_depto_mes_año(this.depto_selected,this.year_selected,this.month_selected,this.depto_color_selected)
                this.filtro_month_active=true
              }if(this.filtro_year_active && !this.filtro_depto_active && !this.filtro_municipio_active){
                this.filtro_month_active=true
                this.municipio_por_año_mes(this.year_selected,this.month_selected,this.year_color_selected)
              }
              
              /* let color =
              item[0]['_chart'].chart.config.data.datasets[0].backgroundColor[
                i
              ]; */
              ////(muni);

              ////(depto)
              /* if(){

              } */
              

            } catch (error) {
              if(this.filtro_depto_active && !this.filtro_municipio_active && !this.filtro_year_active){
                this.filtro_month_active=false
                this.select_bebes_depto(this.depto_selected,this.depto_color_selected)
              }else if(this.filtro_depto_active && this.filtro_year_active && !this.filtro_municipio_active){
                this.filtro_month_active=false
                this.municipio_por_año_depto(this.depto_selected,this.year_selected,this.year_color_selected)
              }else if(!this.filtro_year_active && !this.filtro_depto_active){
                this.filtro_month_active=false
                this.restablecer_Grafica_municipio()
              }if(this.filtro_year_active && !this.filtro_depto_active && !this.filtro_municipio_active){
                this.filtro_month_active=false
                this.municipio_por_año(this.year_selected,this.year_color_selected)
              }
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
            text: 'Nacimientos por mes, Total:' + data.total,
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
      this.chart_month_ba.options.plugins = themes;
    });

    /* this.apiService.nacimiento_por_mes_año(2021).subscribe((data) => {
      //(data);
    }); */

    
  }

  customLegends(chart) {
    let data = chart?.data?.datasets[0].backgroundColor;
    let labels = chart.data.labels;
    let data_labels = [];
    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      ////(element._model.backgroundColor + " " + labels[index])

      data_labels.push({ label: labels[index], color: element });
      // var li = document.createElement("li");
      // li.style.color = element._model.backgroundColor;
      // li.appendChild(document.createTextNode("Legend Test "+(labels[index])));
      // legendListId.appendChild(li);
    }
    ////(this.data_labels)

    ////(data_labels)
    return data_labels;
  }

  select_bebes_depto(depto, color) {

    if( !this.filtro_month_active){
      this.apiService.bebes_por_municipio(depto).subscribe((data) => {
        ////(data);
  
        let valores = [],
          labels = [];
        for (let index = 0; index < data.data.length; index++) {
          const element = data.data[index];
          valores.push(element.cantidad);
          let porcentaje = ((element.cantidad / data.total) * 100).toFixed(1);
          labels.push(element.valor + ' - ' + porcentaje + '%');
        }
  
        this.chart_muni_ba.data.labels = labels;
        this.chart_muni_ba.data.datasets[0].data = valores;
        this.chart_muni_ba.data.datasets[0].backgroundColor = color;
        this.chart_muni_ba.options.title.text =
          'Nacimientos en el departamento de ' + depto + ', Total: ' + data.total;
  
        /* this.chart_muni_ba.options.onClick = (evt, item) => {
          try {
            let i = item[0]['_index'];
            let label = item[0]['_chart'].chart.config.data.labels[i];
            let muni = label.split('-')[0];
            let color =
              item[0]['_chart'].chart.config.data.datasets[0].backgroundColor[i];
            //(muni);
  
            this.select_municipio(muni);
          } catch (error) {
            //('Quitar filtro');
            this.restablecer_Grafica_edad();
            
          }
        }; */
        this.chart_muni_ba.update();
  
        ////(this.chart_muni_pa.data);
        //this.data_labels_muni = this.customLegends(this.chart_muni_pa);
      });
    }

    this.apiService
      .nacimientos_por_año_lugar('departamento_nacimiento', depto)
      .subscribe((data) => {
        //(data);
        this.labels_ba_year = [];
        this.porcentajes_year = [];
        let valores = [],
          labels = [];
        for (let index = 0; index < data.data.length; index++) {
          const element = data.data[index];
          valores.push(element.cantidad);
          let porcentaje = ((element.cantidad / data.total) * 100).toFixed(1);
          labels.push(element.año);
          this.porcentajes_year.push(porcentaje + '%');
        }

        //(valores), //(labels);
        this.chart_year_ba.data.labels = labels;
        this.chart_year_ba.data.datasets[0].data = valores;
        //this.chart_year_ba.data.datasets[0].backgroundColor = color;
        this.chart_year_ba.options.title.text =
          'Nacimientos por año en el departamento de ' +
          depto +
          ', Total: ' +
          data.total;

        /* this.chart_muni_ba.options.onClick = (evt, item) => {
        try {
          let i = item[0]['_index'];
          let label = item[0]['_chart'].chart.config.data.labels[i];
          let muni = label.split('-')[0];
          let color =
            item[0]['_chart'].chart.config.data.datasets[0].backgroundColor[i];
          //(muni);

          this.select_municipio(muni);
        } catch (error) {
          //('Quitar filtro');
          this.restablecer_Grafica_edad();
          
        }
      }; */
        this.chart_year_ba.update();
        this.labels_ba_year = this.customLegends(this.chart_year_ba);

        ////(this.chart_muni_pa.data);
        //this.data_labels_muni = this.customLegends(this.chart_muni_pa);
      });

    this.apiService
      .nacimiento_por_mes_lugar('departamento_nacimiento', depto)
      .subscribe((data) => {
        let valores = [],
          labels = [];
        for (let index = 0; index < data.data.length; index++) {
          const element = data.data[index];
          valores.push(element.cantidad);
          let porcentaje = ((element.cantidad / data.total) * 100).toFixed(1);
          labels.push(element.mes + ' - ' + porcentaje + '%');
        }

        this.chart_month_ba.data.labels = labels;
        this.chart_month_ba.data.datasets[0].data = valores;
        this.chart_month_ba.data.datasets[0].backgroundColor = color;
        this.chart_month_ba.options.title.text =
          'Nacimientos por mes en el departamento de ' +
          depto +
          ', Total: ' +
          data.total;

        /* this.chart_muni_ba.options.onClick = (evt, item) => {
        try {
          let i = item[0]['_index'];
          let label = item[0]['_chart'].chart.config.data.labels[i];
          let muni = label.split('-')[0];
          let color =
            item[0]['_chart'].chart.config.data.datasets[0].backgroundColor[i];
          //(muni);

          this.select_municipio(muni);
        } catch (error) {
          //('Quitar filtro');
          this.restablecer_Grafica_edad();
          
        }
      }; */
        this.chart_month_ba.update();
      });
  }

  restablecer_Grafica_municipio() {
    this.apiService
      .bebes_por_lugar('municipio_nacimiento')
      .subscribe((data) => {
        ////(data);
        let valores = [],
          labels = [];
        for (let index = 0; index < data.data.length; index++) {
          const element = data.data[index];
          valores.push(element.cantidad);
          let porcentaje = ((element.cantidad / data.total) * 100).toFixed(1);
          labels.push(element.valor + ' - ' + porcentaje + '%');
        }

        this.chart_muni_ba.data.labels = labels;
        this.chart_muni_ba.data.datasets[0].data = valores;
        this.chart_muni_ba.data.datasets[0].backgroundColor = 'Pink';
        (this.chart_muni_ba.options.title.text =
          'Nacimientos por Municipio, Total:' + data.total),
          this.chart_muni_ba.update();

        //(this.chart_muni_ba.data);
        //this.data_labels_muni = this.customLegends(this.chart_muni_pa);
      });
  }

  restablecer_Grafica_año() {
    this.apiService.nacimientos_por_año().subscribe((data) => {
      //(data);
      this.labels_ba_year = [];
      this.porcentajes_year = [];
      let valores = [],
        labels = [];
      for (let index = 0; index < data.data.length; index++) {
        const element = data.data[index];
        valores.push(element.cantidad);
        let porcentaje = ((element.cantidad / data.total) * 100).toFixed(1);
        labels.push(element.año);
        this.porcentajes_year.push(porcentaje + '%');
      }

      //(valores), //(labels);
      this.chart_year_ba.data.labels = labels;
      this.chart_year_ba.data.datasets[0].data = valores;
      //this.chart_year_ba.data.datasets[0].backgroundColor = color;
      this.chart_year_ba.options.title.text =
        'Nacimientos por año, total: ' + data.total;

      /* this.chart_muni_ba.options.onClick = (evt, item) => {
        try {
          let i = item[0]['_index'];
          let label = item[0]['_chart'].chart.config.data.labels[i];
          let muni = label.split('-')[0];
          let color =
            item[0]['_chart'].chart.config.data.datasets[0].backgroundColor[i];
          //(muni);

          this.select_municipio(muni);
        } catch (error) {
          //('Quitar filtro');
          this.restablecer_Grafica_edad();
          
        }
      }; */
      this.chart_year_ba.update();
      this.labels_ba_year = this.customLegends(this.chart_year_ba);
    });
  }

  select_municipio(municipio) {
    this.apiService
      .nacimientos_por_año_lugar('municipio_nacimiento', municipio)
      .subscribe((data) => {
        //(data);
        this.labels_ba_year = [];
        this.porcentajes_year = [];
        let valores = [],
          labels = [];
        for (let index = 0; index < data.data.length; index++) {
          const element = data.data[index];
          valores.push(element.cantidad);
          let porcentaje = ((element.cantidad / data.total) * 100).toFixed(1);
          labels.push(element.año);
          this.porcentajes_year.push(porcentaje + '%');
        }

        //(valores), //(labels);
        this.chart_year_ba.data.labels = labels;
        this.chart_year_ba.data.datasets[0].data = valores;
        //this.chart_year_ba.data.datasets[0].backgroundColor = color;
        this.chart_year_ba.options.title.text =
          'Nacimientos por año en el municipio de ' +
          municipio +
          ', Total: ' +
          data.total;

        /* this.chart_muni_ba.options.onClick = (evt, item) => {
        try {
          let i = item[0]['_index'];
          let label = item[0]['_chart'].chart.config.data.labels[i];
          let muni = label.split('-')[0];
          let color =
            item[0]['_chart'].chart.config.data.datasets[0].backgroundColor[i];
          //(muni);

          this.select_municipio(muni);
        } catch (error) {
          //('Quitar filtro');
          this.restablecer_Grafica_edad();
          
        }
      }; */
        this.chart_year_ba.update();
        this.labels_ba_year = this.customLegends(this.chart_year_ba);

        ////(this.chart_muni_pa.data);
        //this.data_labels_muni = this.customLegends(this.chart_muni_pa);
      });

    //if(this.filtro_depto_active=false || this.filtro_year_active==false){
      
      this.apiService
      .nacimiento_por_mes_lugar('municipio_nacimiento', municipio)
      .subscribe((data) => {
        let valores = [],
          labels = [];
        for (let index = 0; index < data.data.length; index++) {
          const element = data.data[index];
          valores.push(element.cantidad);
          let porcentaje = ((element.cantidad / data.total) * 100).toFixed(1);
          labels.push(element.mes + ' - ' + porcentaje + '%');
        }

        this.chart_month_ba.data.labels = labels;
        this.chart_month_ba.data.datasets[0].data = valores;
        this.chart_month_ba.data.datasets[0].backgroundColor = 'Pink';
        this.chart_month_ba.options.title.text =
          'Nacimientos por mes en el municipio de ' +
          municipio +
          ', Total: ' +
          data.total;

        /* this.chart_muni_ba.options.onClick = (evt, item) => {
        try {
          let i = item[0]['_index'];
          let label = item[0]['_chart'].chart.config.data.labels[i];
          let muni = label.split('-')[0];
          let color =
            item[0]['_chart'].chart.config.data.datasets[0].backgroundColor[i];
          //(muni);

          this.select_municipio(muni);
        } catch (error) {
          //('Quitar filtro');
          this.restablecer_Grafica_edad();
          
        }
      }; */
        this.chart_month_ba.update();
      });
    //}
  }

  restablecer_Grafica_month() {
    this.apiService.nacimiento_por_fecha('Month').subscribe((data) => {
      let valores = [],
        labels = [];
      for (let index = 0; index < data.data.length; index++) {
        const element = data.data[index];
        valores.push(element.cantidad);
        let porcentaje = ((element.cantidad / data.total) * 100).toFixed(1);
        labels.push(element.valor + ' - ' + porcentaje + '%');
      }

      this.chart_month_ba.data.labels = labels;
      this.chart_month_ba.data.datasets[0].data = valores;
      this.chart_month_ba.data.datasets[0].backgroundColor = 'Pink';
      (this.chart_month_ba.options.title.text =
        'Nacimientos por mes, Total:' + data.total),
        /* this.chart_muni_ba.options.onClick = (evt, item) => {
        try {
          let i = item[0]['_index'];
          let label = item[0]['_chart'].chart.config.data.labels[i];
          let muni = label.split('-')[0];
          let color =
            item[0]['_chart'].chart.config.data.datasets[0].backgroundColor[i];
          //(muni);

          this.select_municipio(muni);
        } catch (error) {
          //('Quitar filtro');
          this.restablecer_Grafica_edad();
          
        }
      }; */
        this.chart_month_ba.update();
    });
  }

  select_bebes_year(año, color) {
    this.apiService.nacimiento_por_mes_año(año).subscribe((data) => {
      let valores = [],
        labels = [];
      for (let index = 0; index < data.data.length; index++) {
        const element = data.data[index];
        valores.push(element.cantidad);
        let porcentaje = ((element.cantidad / data.total) * 100).toFixed(1);
        labels.push(element.mes + ' - ' + porcentaje + '%');
      }

      this.chart_month_ba.data.labels = labels;
      this.chart_month_ba.data.datasets[0].data = valores;
      this.chart_month_ba.data.datasets[0].backgroundColor = color;
      this.chart_month_ba.options.title.text =
        'Nacimientos por mes en el año ' + año + ', Total: ' + data.total;

      /* this.chart_muni_ba.options.onClick = (evt, item) => {
        try {
          let i = item[0]['_index'];
          let label = item[0]['_chart'].chart.config.data.labels[i];
          let muni = label.split('-')[0];
          let color =
            item[0]['_chart'].chart.config.data.datasets[0].backgroundColor[i];
          //(muni);

          this.select_municipio(muni);
        } catch (error) {
          //('Quitar filtro');
          this.restablecer_Grafica_edad();
          
        }
      }; */
      this.chart_month_ba.update();
    });
  }



  select_place_year(año,tipo,valor,color){
    this.apiService
      .nacimiento_por_mes_lugar_año(
        año,
        tipo,
        valor
      )
      .subscribe((data) => {
        let valores = [],
          labels = [];
        for (let index = 0; index < data.data.length; index++) {
          const element = data.data[index];
          valores.push(element.cantidad);
          let porcentaje = ((element.cantidad / data.total) * 100).toFixed(1);
          labels.push(element.mes + ' - ' + porcentaje + '%');
        }

        this.chart_month_ba.data.labels = labels;
        this.chart_month_ba.data.datasets[0].data = valores;
        this.chart_month_ba.data.datasets[0].backgroundColor = color;

        if(tipo=="departamento_nacimiento"){
          this.chart_month_ba.options.title.text =
            'Nacimientos por mes en el año ' +
            año +
            ' en el departamento de '+ valor +',Total: ' +
            data.total;
        }else{
          this.chart_month_ba.options.title.text =
            'Nacimientos por mes en el año ' +
            año +
            ' en el municipio de '+ valor +',Total: ' +
            data.total;
        }

        /* this.chart_muni_ba.options.onClick = (evt, item) => {
        try {
          let i = item[0]['_index'];
          let label = item[0]['_chart'].chart.config.data.labels[i];
          let muni = label.split('-')[0];
          let color =
            item[0]['_chart'].chart.config.data.datasets[0].backgroundColor[i];
          //(muni);

          this.select_municipio(muni);
        } catch (error) {
          //('Quitar filtro');
          this.restablecer_Grafica_edad();
          
        }
      }; */
        this.chart_month_ba.update();
      });
  }



  municipio_por_año_depto( depto,año, color){
    this.apiService.bebes_por_municipio_depto_año(depto,año).subscribe((data) => {
      ////(data);

      let valores = [],
        labels = [];
      for (let index = 0; index < data.data.length; index++) {
        const element = data.data[index];
        valores.push(element.cantidad);
        let porcentaje = ((element.cantidad / data.total) * 100).toFixed(1);
        labels.push(element.valor + ' - ' + porcentaje + '%');
      }

      this.chart_muni_ba.data.labels = labels;
      this.chart_muni_ba.data.datasets[0].data = valores;
      this.chart_muni_ba.data.datasets[0].backgroundColor = color;
      this.chart_muni_ba.options.title.text =
      'Nacimientos por municipio en el año '+año +" en el departamento de "+ depto + ', Total: ' + data.total;

      /* this.chart_muni_ba.options.onClick = (evt, item) => {
        try {
          let i = item[0]['_index'];
          let label = item[0]['_chart'].chart.config.data.labels[i];
          let muni = label.split('-')[0];
          let color =
            item[0]['_chart'].chart.config.data.datasets[0].backgroundColor[i];
          //(muni);

          this.select_municipio(muni);
        } catch (error) {
          //('Quitar filtro');
          this.restablecer_Grafica_edad();
          
        }
      }; */
      this.chart_muni_ba.update();

      ////(this.chart_muni_pa.data);
      //this.data_labels_muni = this.customLegends(this.chart_muni_pa);
    });
  }


  municipio_por_año( año, color){
    this.apiService.bebes_por_municipio_año(año).subscribe((data) => {
      ////(data);

      let valores = [],
        labels = [];
      for (let index = 0; index < data.data.length; index++) {
        const element = data.data[index];
        valores.push(element.cantidad);
        let porcentaje = ((element.cantidad / data.total) * 100).toFixed(1);
        labels.push(element.valor + ' - ' + porcentaje + '%');
      }

      this.chart_muni_ba.data.labels = labels;
      this.chart_muni_ba.data.datasets[0].data = valores;
      this.chart_muni_ba.data.datasets[0].backgroundColor = color;
      this.chart_muni_ba.options.title.text =
        'Nacimientos por municipio en el año '+año + ', Total: ' + data.total;

      /* this.chart_muni_ba.options.onClick = (evt, item) => {
        try {
          let i = item[0]['_index'];
          let label = item[0]['_chart'].chart.config.data.labels[i];
          let muni = label.split('-')[0];
          let color =
            item[0]['_chart'].chart.config.data.datasets[0].backgroundColor[i];
          //(muni);

          this.select_municipio(muni);
        } catch (error) {
          //('Quitar filtro');
          this.restablecer_Grafica_edad();
          
        }
      }; */
      this.chart_muni_ba.update();

      ////(this.chart_muni_pa.data);
      //this.data_labels_muni = this.customLegends(this.chart_muni_pa);
    });
  }


  municipio_por_mes( mes, color){
    this.apiService.bebes_por_municipio_mes(mes).subscribe((data) => {
      ////(data);

      let valores = [],
        labels = [];
      for (let index = 0; index < data.data.length; index++) {
        const element = data.data[index];
        valores.push(element.cantidad);
        let porcentaje = ((element.cantidad / data.total) * 100).toFixed(1);
        labels.push(element.valor + ' - ' + porcentaje + '%');
      }

      this.chart_muni_ba.data.labels = labels;
      this.chart_muni_ba.data.datasets[0].data = valores;
      this.chart_muni_ba.data.datasets[0].backgroundColor = color;
      this.chart_muni_ba.options.title.text =
        'Nacimientos por municipio en el mes de '+this.meses[mes-1].name + ', Total: ' + data.total;

      /* this.chart_muni_ba.options.onClick = (evt, item) => {
        try {
          let i = item[0]['_index'];
          let label = item[0]['_chart'].chart.config.data.labels[i];
          let muni = label.split('-')[0];
          let color =
            item[0]['_chart'].chart.config.data.datasets[0].backgroundColor[i];
          //(muni);

          this.select_municipio(muni);
        } catch (error) {
          //('Quitar filtro');
          this.restablecer_Grafica_edad();
          
        }
      }; */
      this.chart_muni_ba.update();

      ////(this.chart_muni_pa.data);
      //this.data_labels_muni = this.customLegends(this.chart_muni_pa);
    });
  }

  municipio_por_depto_mes( depto,mes, color){
    this.apiService.bebes_por_municipio_depto_mes(depto,mes).subscribe((data) => {
      ////(data);

      let valores = [],
        labels = [];
      for (let index = 0; index < data.data.length; index++) {
        const element = data.data[index];
        valores.push(element.cantidad);
        let porcentaje = ((element.cantidad / data.total) * 100).toFixed(1);
        labels.push(element.valor + ' - ' + porcentaje + '%');
      }

      this.chart_muni_ba.data.labels = labels;
      this.chart_muni_ba.data.datasets[0].data = valores;
      this.chart_muni_ba.data.datasets[0].backgroundColor = color;
      this.chart_muni_ba.options.title.text =
      'Nacimientos por municipio en el mes de '+this.meses[mes-1].name +" en el departamento de "+ depto + ', Total: ' + data.total;

      /* this.chart_muni_ba.options.onClick = (evt, item) => {
        try {
          let i = item[0]['_index'];
          let label = item[0]['_chart'].chart.config.data.labels[i];
          let muni = label.split('-')[0];
          let color =
            item[0]['_chart'].chart.config.data.datasets[0].backgroundColor[i];
          //(muni);

          this.select_municipio(muni);
        } catch (error) {
          //('Quitar filtro');
          this.restablecer_Grafica_edad();
          
        }
      }; */
      this.chart_muni_ba.update();

      ////(this.chart_muni_pa.data);
      //this.data_labels_muni = this.customLegends(this.chart_muni_pa);
    });
  }


  municipio_por_depto_mes_año(depto,año, mes,color){

    this.apiService.bebes_por_municipio_depto_año_mes(depto,año,mes).subscribe((data) => {
      ////(data);

      let valores = [],
        labels = [];
      for (let index = 0; index < data.data.length; index++) {
        const element = data.data[index];
        valores.push(element.cantidad);
        let porcentaje = ((element.cantidad / data.total) * 100).toFixed(1);
        labels.push(element.valor + ' - ' + porcentaje + '%');
      }

      this.chart_muni_ba.data.labels = labels;
      this.chart_muni_ba.data.datasets[0].data = valores;
      this.chart_muni_ba.data.datasets[0].backgroundColor = color;
      this.chart_muni_ba.options.title.text =
      'Nacimientos por municipio en el mes de '+this.meses[mes-1].name +" del año "+ año +", en el departamento de "+ depto + ', Total: ' + data.total;

      /* this.chart_muni_ba.options.onClick = (evt, item) => {
        try {
          let i = item[0]['_index'];
          let label = item[0]['_chart'].chart.config.data.labels[i];
          let muni = label.split('-')[0];
          let color =
            item[0]['_chart'].chart.config.data.datasets[0].backgroundColor[i];
          //(muni);

          this.select_municipio(muni);
        } catch (error) {
          //('Quitar filtro');
          this.restablecer_Grafica_edad();
          
        }
      }; */
      this.chart_muni_ba.update();

      ////(this.chart_muni_pa.data);
      //this.data_labels_muni = this.customLegends(this.chart_muni_pa);
    });
  }


  municipio_por_año_mes(año,mes,color){
    this.apiService.bebes_por_municipio_año_mes(año,mes).subscribe((data) => {
      ////(data);

      let valores = [],
        labels = [];
      for (let index = 0; index < data.data.length; index++) {
        const element = data.data[index];
        valores.push(element.cantidad);
        let porcentaje = ((element.cantidad / data.total) * 100).toFixed(1);
        labels.push(element.valor + ' - ' + porcentaje + '%');
      }

      this.chart_muni_ba.data.labels = labels;
      this.chart_muni_ba.data.datasets[0].data = valores;
      this.chart_muni_ba.data.datasets[0].backgroundColor = color;
      this.chart_muni_ba.options.title.text =
      'Nacimientos por municipio en el mes de '+this.meses[mes-1].name +" del año "+ año +', Total: ' + data.total;

      /* this.chart_muni_ba.options.onClick = (evt, item) => {
        try {
          let i = item[0]['_index'];
          let label = item[0]['_chart'].chart.config.data.labels[i];
          let muni = label.split('-')[0];
          let color =
            item[0]['_chart'].chart.config.data.datasets[0].backgroundColor[i];
          //(muni);

          this.select_municipio(muni);
        } catch (error) {
          //('Quitar filtro');
          this.restablecer_Grafica_edad();
          
        }
      }; */
      this.chart_muni_ba.update();

      ////(this.chart_muni_pa.data);
      //this.data_labels_muni = this.customLegends(this.chart_muni_pa);
    });
  }
}

