import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormPacientesComponent } from '../../form-pacientes/form-pacientes.component';

@Component({
  selector: 'app-information-dialog',
  templateUrl: './information-dialog.component.html',
  styleUrls: ['./information-dialog.component.css']
})
export class InformationDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<FormPacientesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
  }

  close(){
    this.dialogRef.close('cancelar')
  }


  aceptar(){
    this.dialogRef.close('aceptar')
  }

}
