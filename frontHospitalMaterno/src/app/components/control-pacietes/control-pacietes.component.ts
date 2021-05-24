import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
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
    private apiService:ApiService
  ) { }
  
  dataSource:any;
  pacientes=[]
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['id', 'nombres', 'apellidos', 'dpi',"fecha_nacimiento","pais","depto","municipio","direccion","cant_h","actions"];
  
  ngOnInit(): void {
    this.apiService.obtener_pacientes().subscribe(data=>{
      console.log(data.data)
      this.pacientes=data.data
      this.dataSource= new MatTableDataSource<any>(this.pacientes);
      this.dataSource.paginator = this.paginator;
    })  
  }

  // dataSource = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA);

  
  openDialog() {
    const dialogRef = this.dialog.open(FormPacientesComponent,
      {
        width: '100%',
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
        width: '100%',
        data: item,
        panelClass: 'custom-modalbox',
        autoFocus:false
      }
      
      );

  }

  agregarB(item){
    const dialogRef = this.dialog.open(FormBebesComponent,
      {
        width: '100%',
        data: item,
        panelClass: 'custom-modalbox',
        autoFocus:false
      }
      
      );

  }


}
