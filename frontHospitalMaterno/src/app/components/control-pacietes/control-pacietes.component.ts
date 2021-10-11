import { AfterViewInit, Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { PacientesInterface } from 'src/app/interfaces/pacientes-interface';
import { ApiService } from 'src/app/Services/api.service';
import { FormBebesComponent } from '../form-bebes/form-bebes.component';
import { FormPacientesComponent } from '../form-pacientes/form-pacientes.component';

@Component({
  selector: 'app-control-pacietes',
  templateUrl: './control-pacietes.component.html',
  styleUrls: ['./control-pacietes.component.css']
})
export class ControlPacietesComponent implements OnInit{

  constructor(
    // private actroute:ActivatedRoute
    public dialog: MatDialog,
    private apiService:ApiService,
    private router: Router
  ) { }
  
  dataSource:any;
  dataSourceBaby:any;
  pacientes=[]
  bebes=[]
  @ViewChildren(MatPaginator) paginator = new QueryList<MatPaginator>();
  displayedColumns: string[] = ['id', 'nombres', 'apellidos', 'dpi',"edad","depto","municipio","direccion","cant_h","actions"];
  displayedColumnsBaby: string[] = ['id', 'peso', 'sexo',"fecha_nacimiento","depto","municipio","madre"];
  





  ngOnInit(): void {
    this.apiService.obtener_pacientes("").subscribe(data=>{
      
      this.pacientes=data.data
      this.dataSource= new MatTableDataSource<any>(this.pacientes);
      

      this.dataSource.paginator = this.paginator.toArray()[0];
    })  

    this.apiService.obtener_bebes().subscribe(data=>{
      console.log(data)
      this.bebes=data.data
      this.dataSourceBaby= new MatTableDataSource<any>(this.bebes);
      this.dataSourceBaby.paginator = this.paginator.toArray()[1];
    })


    this.apiService.getPersonsEmmit.subscribe(data=>{
      this.apiService.obtener_pacientes("").subscribe(data=>{
        
        this.pacientes=data.data
        this.dataSource= new MatTableDataSource<any>(this.pacientes);
        this.dataSource.paginator = this.paginator.toArray()[0];
      })  

      this.apiService.obtener_bebes().subscribe(data=>{
    
        this.bebes=data.data
        this.dataSourceBaby= new MatTableDataSource<any>(this.bebes);
        this.dataSourceBaby.paginator = this.paginator.toArray()[1];
      })
    })
  }

  // dataSource = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA);

  
  openDialog() {
    const dialogRef = this.dialog.open(FormPacientesComponent,
      {
        width: '500px',
        height:"425x",
        // data: {name: "hola", animal: "mundo"},
        panelClass: 'custom-modalbox',
        autoFocus:false
      }
      
      );

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log(`Dialog result: ${result.data}`);
    // });
  }



  editar(item){
    const dialogRef = this.dialog.open(FormPacientesComponent,
      {
        width: '500px',
        height:"425x",
        data: item,
        panelClass: 'custom-modalbox',
        autoFocus:false
      }
      
      );

  }

  agregarB(item){
    const dialogRef = this.dialog.open(FormBebesComponent,
      {
        width: '500px',
        height:"425x",
        data: item,
        panelClass: 'custom-modalbox',
        autoFocus:false
      }
      
      );

  }


  ir_a_graficas(){
    this.router.navigateByUrl('graficas')
  }


}
