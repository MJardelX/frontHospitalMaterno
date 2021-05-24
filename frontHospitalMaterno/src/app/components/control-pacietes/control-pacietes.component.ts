import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { PacientesInterface } from 'src/app/interfaces/pacientes-interface';
import { FormPacientesComponent } from '../form-pacientes/form-pacientes.component';

@Component({
  selector: 'app-control-pacietes',
  templateUrl: './control-pacietes.component.html',
  styleUrls: ['./control-pacietes.component.css']
})
export class ControlPacietesComponent implements OnInit, AfterViewInit {

  constructor(
    // private actroute:ActivatedRoute
    public dialog: MatDialog
  ) { }

  DATA_PACIENTES: PacientesInterface[] = [
    {
      "id":1,
      primer_nombre:"Ana",
      segundo_nombre:"Maria",
      primer_apellido:"Xiquita", 
      segundo_apellido:"Xajpot",
      dpi:"12342134",
      fecha_nacimiento:"2021-02-05",
      pais:"Guatemala",
      departamento:"Chimaltenango",
      municipio:"Patzun",
      direccion:"2da av",
      hijos:2
    },
    {
      id:2,
      primer_nombre:"Grisel",
      segundo_nombre:"Maria",
      primer_apellido:"Xiquita", 
      segundo_apellido:"Xajpot",
      dpi:"12342134",
      fecha_nacimiento:"2021-02-05",
      pais:"Guatemala",
      departamento:"Chimaltenango",
      municipio:"Patzun",
      direccion:"2da av",
      hijos:2
    },
    {
      "id":3,
      primer_nombre:"Odilia",
      segundo_nombre:"Maria",
      primer_apellido:"Xiquita", 
      segundo_apellido:"Xajpot",
      dpi:"12342134",
      fecha_nacimiento:"2021-02-05",
      pais:"Guatemala",
      departamento:"Chimaltenango",
      municipio:"Patzun",
      direccion:"2da av",
      hijos:2
    },
    {
      "id":4,
      primer_nombre:"Victoria",
      segundo_nombre:"Maria",
      primer_apellido:"Xiquita", 
      segundo_apellido:"Xajpot",
      dpi:"12342134",
      fecha_nacimiento:"2021-02-05",
      pais:"Guatemala",
      departamento:"Chimaltenango",
      municipio:"Patzun",
      direccion:"2da av",
      hijos:2
    },
    {
      "id":1,
      primer_nombre:"Juana",
      segundo_nombre:"Maria",
      primer_apellido:"Xiquita", 
      segundo_apellido:"Xajpot",
      dpi:"12342134",
      fecha_nacimiento:"2021-02-05",
      pais:"Guatemala",
      departamento:"Chimaltenango",
      municipio:"Patzun",
      direccion:"2da av",
      hijos:2
    },
    {
      "id":1,
      primer_nombre:"Juana",
      segundo_nombre:"Maria",
      primer_apellido:"Xiquita", 
      segundo_apellido:"Xajpot",
      dpi:"12342134",
      fecha_nacimiento:"2021-02-05",
      pais:"Guatemala",
      departamento:"Chimaltenango",
      municipio:"Patzun",
      direccion:"2da av",
      hijos:2
    },
    {
      "id":1,
      primer_nombre:"Juana",
      segundo_nombre:"Maria",
      primer_apellido:"Xiquita", 
      segundo_apellido:"Xajpot",
      dpi:"12342134",
      fecha_nacimiento:"2021-02-05",
      pais:"Guatemala",
      departamento:"Chimaltenango",
      municipio:"Patzun",
      direccion:"2da av",
      hijos:2
    },
    {
      "id":1,
      primer_nombre:"Juana",
      segundo_nombre:"Maria",
      primer_apellido:"Xiquita", 
      segundo_apellido:"Xajpot",
      dpi:"12342134",
      fecha_nacimiento:"2021-02-05",
      pais:"Guatemala",
      departamento:"Chimaltenango",
      municipio:"Patzun",
      direccion:"2da av",
      hijos:2
    },
    {
      "id":1,
      primer_nombre:"Juana",
      segundo_nombre:"Maria",
      primer_apellido:"Xiquita", 
      segundo_apellido:"Xajpot",
      dpi:"12342134",
      fecha_nacimiento:"2021-02-05",
      pais:"Guatemala",
      departamento:"Chimaltenango",
      municipio:"Patzun",
      direccion:"2da av",
      hijos:2
    },
    {
      "id":1,
      primer_nombre:"Juana",
      segundo_nombre:"Maria",
      primer_apellido:"Xiquita", 
      segundo_apellido:"Xajpot",
      dpi:"12342134",
      fecha_nacimiento:"2021-02-05",
      pais:"Guatemala",
      departamento:"Chimaltenango",
      municipio:"Patzun",
      direccion:"2da av",
      hijos:2
    },
    {
      "id":1,
      primer_nombre:"Juana",
      segundo_nombre:"Maria",
      primer_apellido:"Xiquita", 
      segundo_apellido:"Xajpot",
      dpi:"12342134",
      fecha_nacimiento:"2021-02-05",
      pais:"Guatemala",
      departamento:"Chimaltenango",
      municipio:"Patzun",
      direccion:"2da av",
      hijos:2
    },
    
  ];
  ngOnInit(): void {
    
  }


  displayedColumns: string[] = ['id', 'nombres', 'apellidos', 'dpi',"fecha_nacimiento","pais","depto","municipio","direccion","cant_h","actions"];
  // dataSource = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA);

  dataSource = new MatTableDataSource<PacientesInterface>(this.DATA_PACIENTES);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }


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


}
