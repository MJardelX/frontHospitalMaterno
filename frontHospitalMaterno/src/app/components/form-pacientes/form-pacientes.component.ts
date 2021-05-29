import { formatDate } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { PacientesInterface } from 'src/app/interfaces/pacientes-interface';
import { ApiService } from 'src/app/Services/api.service';
import { DeptosServiceService } from 'src/app/Services/deptos-service.service';
@Component({
  selector: 'app-form-pacientes',
  templateUrl: './form-pacientes.component.html',
  styleUrls: ['./form-pacientes.component.css'],
})
export class FormPacientesComponent implements OnInit {
  panelOpenState = false;
  form_pacientes: FormGroup;
  title = 'Agregar Paciente';
  constructor(
    private _builder: FormBuilder,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<FormPacientesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private apiService: ApiService,
    private deptoService: DeptosServiceService
  ) {

    
    this.form_pacientes = _builder.group({});

    console.log(new Date());

    this.form_pacientes.addControl('primer_nombre', this.primer_nombre);
    this.form_pacientes.addControl('segundo_nombre', this.segundo_nombre);
    this.form_pacientes.addControl('primer_apellido', this.primer_apellido);
    this.form_pacientes.addControl('segundo_apellido', this.segundo_apellido);
    this.form_pacientes.addControl('fecha_nacimiento', this.fecha_nacimiento);
    this.form_pacientes.addControl('dpi', this.dpi);
    //his.form_pacientes.addControl('pais', this.pais);
    this.form_pacientes.addControl('departamento', this.departamento);
    this.form_pacientes.addControl('municipio', this.municipio);
    this.form_pacientes.addControl('direccion', this.direccion);

    if (data) {
      this.title = 'Editar Paciente';

      this.municipios=deptoService.obtener_municipios(data.departamento)
      let fecha = formatDate(data.fecha_nacimiento, 'medium', 'en-GB');
      this.form_pacientes.get('primer_nombre').setValue(data.primer_nombre);
      this.form_pacientes.get('segundo_nombre').setValue(data.segundo_nombre);
      this.form_pacientes.get('primer_apellido').setValue(data.primer_apellido);
      this.form_pacientes
        .get('segundo_apellido')
        .setValue(data.segundo_apellido);
      this.form_pacientes.get('fecha_nacimiento').setValue(new Date(fecha));
      this.form_pacientes.get('dpi').setValue(data.dpi);
      //this.form_pacientes.get('pais').setValue(data.pais);
      this.form_pacientes.get('departamento').setValue(data.departamento);
      this.form_pacientes.get('municipio').setValue(data.municipio);
      this.form_pacientes.get('direccion').setValue(data.direccion);

      this.form_pacientes.get('dpi').disable();
    }
  }

  departamentos = [];
  municipios = [];
  departamento_selected:any;
  municipio_selected:any

  primer_nombre = new FormControl('', [Validators.required]);
  segundo_nombre = new FormControl('', []);
  primer_apellido = new FormControl('', [Validators.required]);
  segundo_apellido = new FormControl('', []);
  fecha_nacimiento = new FormControl('', [Validators.required]);
  dpi = new FormControl('', [Validators.required]);
  //pais = new FormControl('', [Validators.required]);
  departamento = new FormControl('', [Validators.required]);
  municipio = new FormControl('', [Validators.required]);
  direccion = new FormControl('', [Validators.required]);

  ngOnInit(): void {
    this.departamentos = this.deptoService.obtener_departamentos();
  }

  // -----------------------------------------------------
  //              PARA AGREGAR FECHA PREDETERMINADA TENEMOS QUE CONVERTIR A formatDate("2021-05-18", "medium", 'en-GB'))

  matcher = new ErrorStateMatcher();

  enviarDatos(data) {
    /*  console.log(data) */
    if (this.form_pacientes.invalid) {
      this.openSnackBar('Complete los campos requeridos', 'red-snackbar');
    } else {
      let fecha = formatDate(data.fecha_nacimiento, 'yyyy-MM-dd', 'en-GB');
      console.log(fecha);

      /* let fecha= dateFor */
      /* si no hay data */
      if (this.data == undefined) {
        this.apiService
          .agregar_paciente(
            data.primer_nombre,
            data.segundo_nombre,
            data.primer_apellido,
            data.segundo_apellido,
            data.dpi,
            fecha,
            data.departamento,
            data.municipio,
            data.direccion,
            "Guatemala"
          )
          .subscribe(
            (data) => {
              if (data.detail == 'Paciente ya registrada') {
                this.openSnackBar('Paciente ya registrada', 'red-snackbar');
              } else {
                this.openSnackBar(
                  'Paciente registrado Exitosamente',
                  'green-snackbar'
                );
                this.apiService.getPersonsEmmit.emit('cargar');
                this.dialogRef.close();
              }
            },
            (err) => {
              console.log(err);
            }
          );

        /* si hay data */
      } else {
        this.apiService
          .actualizar_paciente(
            this.data.id,
            data.primer_nombre,
            data.segundo_nombre,
            data.primer_apellido,
            data.segundo_apellido,
            fecha,
            data.departamento,
            data.municipio,
            data.direccion,
            "Guatemala"
          )
          .subscribe(
            (data) => {
              
                this.openSnackBar(
                  'Paciente Actualizado Exitosamente',
                  'green-snackbar'
                );
                this.apiService.getPersonsEmmit.emit('cargar');
                this.dialogRef.close();
              
            },
            (err) => {
              console.log(err);
            }
          );
      }
    }

    /* this.dialogRef.close({"data":"hola"}); */
  }

  cerrar() {
    this.dialogRef.close();
  }

  openSnackBar(mensaje, clase) {
    this._snackBar.open(mensaje, '', {
      duration: 1500,
      panelClass: [clase],
    });
  }

  // @ViewChild("myinput") myInputField: ElementRef;
  // ngAfterViewInit() {
  //   this.myInputField.nativeElement.blur();
  // }

  select_depto(depto){
    this.municipios=this.deptoService.obtener_municipios(depto)
  }
}
