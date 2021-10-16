import { Location } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/Services/api.service';
import { PathService } from 'src/app/Services/path.service';
import { FormPacientesComponent } from '../../form-pacientes/form-pacientes.component';

@Component({
  selector: 'app-control-dialog',
  templateUrl: './control-dialog.component.html',
  styleUrls: ['./control-dialog.component.css']
})
export class ControlDialogComponent implements OnInit {

  constructor(
    private path_service: PathService,
    private _loc: Location,
    private route: ActivatedRoute,
    private apiServices: ApiService,
    private _snackBar: MatSnackBar,
    private router: Router,
    public dialogRef: MatDialogRef<FormPacientesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.iniciarForm();


    if(data!=null){
      console.log(data);
      this.id_paciente= data.id_paciente
      this.id_control=data.id_control
      console.log(this.id_paciente)
    }
  }

  Location: any;

  fecha_creacion;

  sub_get_exp: Subscription

  id_paciente;
  id_expediente

  // usuario;
  token: any
  ngOnInit(): void {
    this.Location = this._loc.path();
    this.path_service.setPath(this.Location);


    // console.log(moment(new Date))
    // this.fecha_creacion=(moment(new Date, 'MM/DD/YYYY').format('DD/MM/YYYY'))
    // !ANGULAR DEVUELVE LA FECHA SIEMPRE EN mm/dd/yyyy
    this.fecha_creacion = (new Date)
    this.form_identificacion_establecimiento.get('fecha_creacion').setValue(this.fecha_creacion)

    // this.id_paciente = this.route.snapshot.params['id_paciente'];
    // this.id_expediente = this.route.snapshot.params['id_expediente']


    // this.usuario = JSON.parse(localStorage.getItem('user'))

    // this.usuario = this.apiServices.usuario
    this.token = localStorage.getItem('token')

    this.obtenerDataPaciente()
    this.obtenerControl()
    // console.log(this.id_paciente+" "+ this.id_expediente)

  }

  

 

  checks_establecimiento = [
    {
      name: "PS",
      value: false,
    },
    {
      name: "PSF",
      value: false,
    },
    {
      name: 'C/S B',
      value: false,
    },
    {
      name: "CENAPA",
      value: false,
    },
    {
      name: 'C/S A',
      value: false,
    },
    {
      name: "CAP",
      value: false,
    },
    {
      name: "CAIMI",
      value: false,
    },
    {
      name: "CUM",
      value: false,
    },
    {
      name: "HOSPITAL",
      value: false,
    },
  ]




  establecimiento: any
  seleccionar_establecimiento(index) {
    this.checks_establecimiento.forEach(elemnt => {
      elemnt.value = false
    })
    this.checks_establecimiento[index].value = !this.checks_establecimiento[index].value
    this.establecimiento = this.checks_establecimiento[index].name
    this.form_identificacion_establecimiento.get('tipo_establecimiento').setValue(this.establecimiento)
  }


  migrante = {
    SI: false,
    NO: false
  }
  seleccionar_migrante(value) {
    this.migrante[value] = !this.migrante[value]
  }


  signos = {
    hemorragia_vaginal: {
      si: false,
      no: false
    },
    vision_borrosa: {
      si: false,
      no: false
    },
    convulsion: {
      si: false,
      no: false
    },
    dolor_de_cabeza: {
      si: false,
      no: false
    },

    dolor_abdominal: {
      si: false,
      no: false
    },

    presion_arterial: {
      si: false,
      no: false
    },

    fiebre: {
      si: false,
      no: false
    },

    presentaciones_fetales: {
      si: false,
      no: false
    },
  }
  seleccionar_signo(signo, value) {
    // if(value=='si'){
    // this.signos[signo][value]=!this.migrante[signo][value]
    if (value == 'si') {
      this.signos[signo]['no'] = false
    } else {
      this.signos[signo]['si'] = false
    }
    this.signos[signo][value] = !this.signos[signo][value]

    this.form_signos_de_peligro.get(signo).setValue(value);
    // console.log(this.signos[signo])
    // }
  }




  m_consulta = [
    {
      name: "Embarazo",
      value: false,
    },
    {
      name: "Parto",
      value: false,
    },
    {
      name: 'Postparto',
      value: false,
    },
    {
      name: "Otro",
      value: false,
    }
  ]
  tipo_consulta: any
  seleccionar_consulta(index) {
    this.m_consulta.forEach(elemnt => {
      elemnt.value = false
    })
    this.m_consulta[index].value = !this.m_consulta[index].value
    this.tipo_consulta = this.m_consulta[index].name

    this.form_motivo_consulta.get('motivo_control').setValue(this.tipo_consulta)
  }


  // !  CHEKS ANTECEDENTES
  AB_consecutivos = {
    si: false,
    no: false
  }
  seleccionar_ab_consecutivos(value) {
    // if(value=='si'){
    this.AB_consecutivos['si'] = false
    // }else{
    this.AB_consecutivos['no'] = false
    // }
    this.AB_consecutivos[value] = !this.AB_consecutivos[value]
    this.form_antecedentes.get('ab_consecutivos').setValue(value)
  }



  embarazos_multiples = {
    si: false,
    no: false
  }

  seleccionar_embarazos_multiples(value) {
    // if(value=='si'){
    this.embarazos_multiples['si'] = false
    // }else{
    this.embarazos_multiples['no'] = false
    // }
    this.embarazos_multiples[value] = !this.embarazos_multiples[value]
    this.form_antecedentes.get('embarazos_multiples').setValue(value)
  }


  preeclampsia = {
    si: false,
    no: false
  }

  seleccionar_preeclampsia(value) {
    // if(value=='si'){
    this.preeclampsia['si'] = false
    // }else{
    this.preeclampsia['no'] = false
    // }
    this.preeclampsia[value] = !this.preeclampsia[value]
    this.form_antecedentes.get('preeclampsia').setValue(value)
  }

  rn_5 = {
    si: false,
    no: false
  }

  seleccionar_rn5(value) {
    // if(value=='si'){
    this.rn_5['si'] = false
    // }else{
    this.rn_5['no'] = false
    // }
    this.rn_5[value] = !this.rn_5[value]
    this.form_antecedentes.get('rm_menos_cinco').setValue(value)
  }

  rn_7 = {
    si: false,
    no: false
  }
  seleccionar_rn7(value) {
    // if(value=='si'){
    this.rn_7['si'] = false
    // }else{
    this.rn_7['no'] = false
    // }
    this.rn_7[value] = !this.rn_7[value]
    this.form_antecedentes.get('rm_mas_siete').setValue(value)
  }


  papanicolaou = {
    value: false
  }
  seleccionar_papanicolaou() {
    this.papanicolaou.value = !this.papanicolaou.value
    if (this.papanicolaou.value) {
      this.form_antecedentes.get('papanicolaou').setValue('si')
    } else {
      this.form_antecedentes.get('papanicolaou').setValue('no')
    }
  }


  ivaa = {
    value: false
  }
  seleccionar_ivaa() {
    this.ivaa.value = !this.ivaa.value
    if (this.ivaa.value) {
      this.form_antecedentes.get('ivvaa').setValue('si')
    } else {
      this.form_antecedentes.get('ivvaa').setValue('no')
    }
  }


  resultado_normal = {
    si: false,
    no: false
  }
  seleccionar_resultado_normal(value) {
    // if(value=='si'){
    this.resultado_normal['si'] = false
    // }else{
    this.resultado_normal['no'] = false
    // }
    this.resultado_normal[value] = !this.resultado_normal[value];
    this.form_antecedentes.get('resultado_normal').setValue(value)
  }


  planificacion_f = {
    si: false,
    no: false
  }
  seleccionar_planificacion_f(value) {
    // if(value=='si'){
    this.planificacion_f['si'] = false
    // }else{
    this.planificacion_f['no'] = false
    // }
    this.planificacion_f[value] = !this.planificacion_f[value]
    this.form_antecedentes.get('utilizo_metodo_pf').setValue(value)
  }


  toma_m = {
    si: false,
    no: false
  }
  seleccionar_toma_m(value) {
    // if(value=='si'){
    this.toma_m['si'] = false
    // }else{
    this.toma_m['no'] = false
    // }
    this.toma_m[value] = !this.toma_m[value]

    this.form_antecedentes.get('toma_medicamentos').setValue(value)
  }


  tipo_sangre = {
    "rh+": false,
    "rh-": false
  }
  seleccionar_tipo_sangre(value) {
    // if(value=='si'){
    this.tipo_sangre["rh+"] = false
    // }else{
    this.tipo_sangre['rh-'] = false
    // }
    this.tipo_sangre[value] = !this.tipo_sangre[value]
    this.form_antecedentes.get('tipo_sangre').setValue(value)
  }


  trastorno_ps = {
    "si": false,
    "no": false
  }
  seleccionar_trastorno_ps(value) {
    // if(value=='si'){
    this.trastorno_ps["si"] = false
    // }else{
    this.trastorno_ps['no'] = false
    // }
    this.trastorno_ps[value] = !this.trastorno_ps[value]
    this.form_antecedentes.get('trastorno_psicosocial').setValue(value)
  }


  violencia_f = {
    "si": false,
    "no": false
  }
  seleccionar_violencia_f(value) {
    // if(value=='si'){
    this.violencia_f["si"] = false
    // }else{
    this.violencia_f['no'] = false
    // }
    this.violencia_f[value] = !this.violencia_f[value]
    this.form_antecedentes.get('violencia_familiar').setValue(value)
  }


  violencia_g = {
    "si": false,
    "no": false
  }
  seleccionar_violencia_g(value) {
    // if(value=='si'){
    this.violencia_g["si"] = false
    // }else{
    this.violencia_g['no'] = false
    // }
    this.violencia_g[value] = !this.violencia_g[value]
    this.form_antecedentes.get('violencia_genero').setValue(value)
  }



  fuma = {
    "si": false,
    "no": false
  }
  seleccionar_fuma(value) {
    // if(value=='si'){
    this.fuma["si"] = false
    // }else{
    this.fuma['no'] = false
    // }
    this.fuma[value] = !this.fuma[value]
    this.form_antecedentes.get('fuma').setValue(value)
  }


  bebidas = {
    "si": false,
    "no": false
  }
  seleccionar_bebidas(value) {
    // if(value=='si'){
    this.bebidas["si"] = false
    // }else{
    this.bebidas['no'] = false
    // }
    this.bebidas[value] = !this.bebidas[value]
    this.form_antecedentes.get('bebidas_alcoholicas').setValue(value)
  }


  drogas = {
    "si": false,
    "no": false
  }
  seleccionar_drogas(value) {
    // if(value=='si'){
    this.drogas["si"] = false
    // }else{
    this.drogas['no'] = false
    // }
    this.drogas[value] = !this.drogas[value]
    this.form_antecedentes.get('drogas').setValue(value)
  }




  vacuna_td = {
    "si": false,
    "no": false
  }
  seleccionar_vacuna_td(value) {
    // if(value=='si'){
    this.vacuna_td["si"] = false
    // }else{
    this.vacuna_td['no'] = false
    // }
    this.vacuna_td[value] = !this.vacuna_td[value]
    this.form_antecedentes.get('vacuna_td').setValue(value)
  }


  sr = {
    "si": false,
    "no": false
  }
  seleccionar_sr(value) {
    // if(value=='si'){
    this.sr["si"] = false
    // }else{
    this.sr['no'] = false
    // }
    this.sr[value] = !this.sr[value]
    this.form_antecedentes.get('sr').setValue(value)
  }



  signos_medicos = {
    asma_branquial: {
      si: false,
      no: false
    },
    hipertension_arterial: {
      si: false,
      no: false
    },
    cancer: {
      si: false,
      no: false
    },
    its: {
      si: false,
      no: false
    },

    chagas: {
      si: false,
      no: false
    },

    diabetes: {
      si: false,
      no: false
    },

    cardiopatia: {
      si: false,
      no: false
    },

    tuberculosis: {
      si: false,
      no: false
    },

    neuropatia: {
      si: false,
      no: false
    },
    infecciones_urinarias: {
      si: false,
      no: false
    },
  }
  seleccionar_signo_medico(signo, value) {



    // if(value=='si'){
    // this.signos[signo][value]=!this.migrante[signo][value]

    if (value == 'si') {
      this.signos_medicos[signo]['no'] = false
    } else {
      this.signos_medicos[signo]['si'] = false
    }
    this.signos_medicos[signo][value] = !this.signos_medicos[signo][value]
    this.form_antecedentes.get(signo).setValue(value)
    // console.log(this.signos[signo])

    // }
  }





  // form_antecedentes: FormGroup
  form_identificacion_establecimiento: FormGroup
  form_signos_de_peligro: FormGroup
  form_referencia: FormGroup;
  form_motivo_consulta: FormGroup;
  form_enfermedad_actual: FormGroup;
  form_antecedentes: FormGroup


  iniciarForm() {

    this.form_identificacion_establecimiento = new FormGroup({
      "fecha_creacion": new FormControl('', Validators.required),
      // "id_usuario": new FormControl('', Validators.required),
      "id_expediente": new FormControl('', Validators.required),
      "tipo_establecimiento": new FormControl('', Validators.required),
      "distrito": new FormControl('', Validators.required),
      "area_salud": new FormControl('', Validators.required),
    })

    this.form_signos_de_peligro = new FormGroup({
      // !Signos vitales
      "hemorragia_vaginal": new FormControl('', Validators.required),
      "dolor_de_cabeza": new FormControl('', Validators.required),
      "vision_borrosa": new FormControl('', Validators.required),
      "convulsion": new FormControl('', Validators.required),
      "dolor_abdominal": new FormControl('', Validators.required),
      "presion_arterial": new FormControl('', Validators.required),
      "fiebre": new FormControl('', Validators.required),
      "presentaciones_fetales": new FormControl('', Validators.required),

    })

    this.form_referencia = new FormGroup({
      "referencia": new FormControl('', Validators.required),
    })

    this.form_motivo_consulta = new FormGroup({
      "motivo_control": new FormControl('', Validators.required),
    })


    this.form_enfermedad_actual = new FormGroup({
      "historia_enfermedad": new FormControl('', Validators.required),
    })


    this.form_antecedentes = new FormGroup({
      "fur_an": new FormControl('', Validators.required),
      "no_gestas": new FormControl('', Validators.required),
      "partos": new FormControl('', Validators.required),
      "ab": new FormControl('', Validators.required),
      "ab_consecutivos": new FormControl('', Validators.required),
      "no_liu": new FormControl('', Validators.required),
      "nacidos_vivos": new FormControl('', Validators.required),
      "nacidos_muertos": new FormControl('', Validators.required),
      "hijos_vivos": new FormControl('', Validators.required),
      "hijos_muertos": new FormControl('', Validators.required),
      "no_cesarea": new FormControl('', Validators.required),
      "embarazos_multiples": new FormControl('', Validators.required),
      "fecha_ultimo_parto": new FormControl('', Validators.required),
      "nacidos_8_meses": new FormControl('', Validators.required),
      "preeclampsia": new FormControl('', Validators.required),
      "rm_menos_cinco": new FormControl('', Validators.required),
      "rm_mas_siete": new FormControl('', Validators.required),
      "papanicolaou": new FormControl('', Validators.required),
      "ivvaa": new FormControl('no', Validators.required),
      "fecha": new FormControl('no', Validators.required),
      "resultado_normal": new FormControl('', Validators.required),
      "utilizo_metodo_pf": new FormControl('', Validators.required),
      "metodo_planificacion": new FormControl('', []),
      "asma_branquial": new FormControl('', Validators.required),
      "hipertension_arterial": new FormControl('', Validators.required),
      "cancer": new FormControl('', Validators.required),
      "its": new FormControl('', Validators.required),
      "chagas": new FormControl('', Validators.required),
      "diabetes": new FormControl('', Validators.required),
      "cardiopatia": new FormControl('', Validators.required),
      "tuberculosis": new FormControl('', Validators.required),
      "neuropatia": new FormControl('', Validators.required),
      "infecciones_urinarias": new FormControl('', Validators.required),
      "toma_medicamentos": new FormControl('', Validators.required),
      "medicamento": new FormControl('', []),
      "tipo_sangre_grupo": new FormControl('', Validators.required),
      "tipo_sangre": new FormControl('', Validators.required),
      "trastorno_psicosocial": new FormControl('', Validators.required),
      "violencia_familiar": new FormControl('', Validators.required),
      "violencia_genero": new FormControl('', Validators.required),
      "quirurgicos": new FormControl('', Validators.required),
      "fuma": new FormControl('', Validators.required),
      "bebidas_alcoholicas": new FormControl('', Validators.required),
      "drogas": new FormControl('', Validators.required),
      "vacuna_td": new FormControl('', Validators.required),
      "dosis": new FormControl('', []),
      "fecha_ultima_dosis": new FormControl('', Validators.required),
      "sr": new FormControl('', Validators.required),
      "otros_antecedentes": new FormControl('', Validators.required),
    })


  }


  id_control
  data_control:any;
  obtenerControl(){
    this.apiServices.obtenerControlById(this.token, this.id_control).subscribe(data=>{
      console.log(data)
      this.data_control=data.data[0]


      let momentVariable = moment(this.data_control?.fecha_creacion, 'DD/MM/YYYY');
      this.form_identificacion_establecimiento.get('fecha_creacion').setValue(momentVariable.toDate())
      // this.form_identificacion_establecimiento.get('fecha_creacion').setValue(this.data_control.fecha_creacion)

      // "fecha_creacion": new FormControl('', Validators.required),
      // "id_usuario": new FormControl('', Validators.required),
      // "id_expediente": new FormControl('', Validators.required),

      this.checks_establecimiento.forEach(element => {
        if(element.name==this.data_control?.tipo_establecimiento){
          element.value=true
        }
      });

      this.form_identificacion_establecimiento.get("distrito").setValue(this.data_control?.distrito)
      this.form_identificacion_establecimiento.get("area_salud").setValue(this.data_control?.area_de_salud)

      this.signos.hemorragia_vaginal[this.data_control?.hemorragia_vaginal]=true
      this.signos.dolor_de_cabeza[this.data_control?.dolor_de_cabeza]=true
      this.signos.vision_borrosa[this.data_control?.vision_borrosa]=true
      this.signos.hemorragia_vaginal[this.data_control?.hemorragia_vaginal]=true
      this.signos.convulsion[this.data_control?.convulsion]=true
      this.signos.dolor_abdominal[this.data_control?.dolor_abdominal]=true
      this.signos.presion_arterial[this.data_control?.presion_arterial]=true
      this.signos.hemorragia_vaginal[this.data_control?.hemorragia_vaginal]=true
      this.signos.fiebre[this.data_control?.fiebre]=true
      this.signos.presentaciones_fetales[this.data_control?.presentaciones_fetales]=true

      this.form_referencia.get('referencia').setValue(this.data_control.referencia)
      

      this.m_consulta.forEach(element => {
        if(element.name==this.data_control?.motivo_control){
          element.value=true
        }
      });

      this.form_enfermedad_actual.get('historia_enfermedad').setValue(this.data_control.historia_enfermedad_actual)

      

      this.form_antecedentes.get('fur_an').setValue(this.data_control.fur)
      this.form_antecedentes.get('no_gestas').setValue(this.data_control.no_gestas)
      this.form_antecedentes.get('partos').setValue(this.data_control.partos)
      this.form_antecedentes.get('ab').setValue(this.data_control.ab)

      this.AB_consecutivos[this.data_control.ab_consecutivos]=true
      this.form_antecedentes.get('no_liu').setValue(this.data_control.no_liu)

      this.form_antecedentes.get("nacidos_vivos").setValue(this.data_control.nacidos_vivos)
      this.form_antecedentes.get("nacidos_muertos").setValue(this.data_control.nacidos_muertos)
      this.form_antecedentes.get("hijos_vivos").setValue(this.data_control.hijos_vivos)
      this.form_antecedentes.get("hijos_muertos").setValue(this.data_control.hijos_muertos)
      this.form_antecedentes.get("no_cesarea").setValue(this.data_control.no_cesarea)

      this.embarazos_multiples[this.data_control.embarazos_multiples]=true


      let moment_up = moment(this.data_control?.fecha_ultimo_parto, 'DD/MM/YYYY');
      this.form_antecedentes.get('fecha_ultimo_parto').setValue(moment_up.toDate())
      

      // TODO: cambiar a nacidos_antes_8_meses
      this.form_antecedentes.get('nacidos_8_meses').setValue(this.data_control.niños_nacidos_antes_8_meses)

      this.preeclampsia[this.data_control.preeclampsia]=true
      this.rn_5[this.data_control.rm_menos_cinco_lbs]=true
      this.rn_7[this.data_control.rm_mas_siete_lbs]=true
      
      if(this.data_control.papanicolaou=='si'){
        this.papanicolaou.value=true
      }

      if(this.data_control.ivaa=='si'){
        this.ivaa.value=true
      }

      let moment_f = moment(this.data_control?.fecha, 'DD/MM/YYYY');
      this.form_antecedentes.get('fecha').setValue(moment_f.toDate())

      this.resultado_normal[this.data_control.resultado_normal]=true
      this.planificacion_f[this.data_control.utilizo_metodo_pf]=true
      this.form_antecedentes.get('metodo_planificacion').setValue(this.data_control.metodo_planificacion_familiar)
      
      this.signos_medicos.asma_branquial[this.data_control.asma_branquial]=true
      this.signos_medicos.hipertension_arterial[this.data_control.hipertension_arterial]=true
      this.signos_medicos.cancer[this.data_control.cancer]=true
      this.signos_medicos.its[this.data_control.its]=true
      this.signos_medicos.chagas[this.data_control.chagas]=true

      this.signos_medicos.diabetes[this.data_control.diabetes]=true
      this.signos_medicos.cardiopatia[this.data_control.cardiopatia]=true
      this.signos_medicos.tuberculosis[this.data_control.tuberculosis]=true
      this.signos_medicos.neuropatia[this.data_control.neuropatia]=true
      this.signos_medicos.infecciones_urinarias[this.data_control.infecciones_urinarias]=true

      this.toma_m[this.data_control.toma_medicamentos]=true

      this.form_antecedentes.get('medicamento').setValue(this.data_control.medicamento)
      this.form_antecedentes.get('tipo_sangre_grupo').setValue(this.data_control.tipo_sangre_grupo)
      this.tipo_sangre[this.data_control.tipo_sangre]=true
      this.trastorno_ps[this.data_control.trastorno_psicosocial]=true
      this.violencia_f[this.data_control.violencia_familiar]=true
      this.violencia_g[this.data_control.violencia_basada_en_genero]=true
      this.form_antecedentes.get('quirurgicos').setValue(this.data_control.quirurgicos)
      this.fuma[this.data_control.fuma]=true
      this.drogas[this.data_control.drogas]=true
      this.bebidas[this.data_control.bebidas_alcoholicas]=true

      this.vacuna_td[this.data_control.vacuna_td]=true

      this.form_antecedentes.get('dosis').setValue(this.data_control.Dosis)



      let moment_ud = moment(this.data_control?.fecha_ultima_dosis, 'DD/MM/YYYY');
      this.form_antecedentes.get('fecha_ultima_dosis').setValue(moment_ud.toDate())

      this.sr[this.data_control.sr]=true

      this.form_antecedentes.get('otros_antecedentes').setValue(this.data_control.otros_antecedentes)




      // this.establecimiento

      // "tipo_establecimiento": new FormControl('', Validators.required),
    })
  }




  sub_guardar_control: Subscription

  cargando=false;
  guardo=false;
  guardar() {

    console.log(this.id_expediente)
    this.guardo=true

    this.form_identificacion_establecimiento.get('id_expediente').setValue(this.id_expediente)
    // this.cargando=true;


    if (this.form_antecedentes.get('utilizo_metodo_pf').value == 'no') {
      // data.metodo_planificacion=' '
      if (this.form_antecedentes.get('metodo_planificacion').value == '') {
        this.form_antecedentes.get('metodo_planificacion').setValue(' ')
      }
    }

    if (this.form_antecedentes.get('toma_medicamentos').value == 'no') {
      // data.metodo_planificacion=' '
      if (this.form_antecedentes.get('medicamento').value == '') {
        this.form_antecedentes.get('medicamento').setValue(' ')
      }
    }

    if (this.form_antecedentes.get('vacuna_td').value == 'no') {
      // data.metodo_planificacion=' '
      if (this.form_antecedentes.get('dosis').value == '') {
        this.form_antecedentes.get('dosis').setValue(' ')
      }

      if (this.form_antecedentes.get('fecha_ultima_dosis').value == '') {
        this.form_antecedentes.get('fecha_ultima_dosis').setValue(' ')
      }
    }



    // // !Una sola opcion
    // if (this.papanicolaou.value) {
    //   this.form_antecedentes.get('papanicolaou').setValue('si')
    // } else {
    //   this.form_antecedentes.get('papanicolaou').setValue('no')
    // }

    this.ivaa.value = !this.ivaa.value
    if (this.ivaa.value) {
      this.form_antecedentes.get('ivvaa').setValue('si')
    } else {
      this.form_antecedentes.get('ivvaa').setValue('no')
    }

    if (this.form_identificacion_establecimiento.invalid &&
      this.form_signos_de_peligro.invalid &&
      this.form_referencia.invalid &&
      this.form_motivo_consulta.invalid &&
      this.form_enfermedad_actual.invalid &&
      this.form_antecedentes.invalid) {

      this.openSnackBar('Debe completar todos los apartados', 'red-snackbar')
    } else if (this.form_identificacion_establecimiento.invalid) {
      this.openSnackBar('Complete el apartado de identificacion del establecimiento', 'red-snackbar')

    } else if (this.form_signos_de_peligro.invalid) {
      this.openSnackBar('Complete el apartado de signos y síntomas de peligro', 'red-snackbar')

    } else if (this.form_referencia.invalid) {
      this.openSnackBar('Complete el apartado de referencia', 'red-snackbar')

    } else if (this.form_motivo_consulta.invalid) {
      this.openSnackBar('Complete el apartado de motivo de la consulta', 'red-snackbar')

    } else if (this.form_enfermedad_actual.invalid) {
      this.openSnackBar('Complete el apartado de historia de la enfermedad actual', 'red-snackbar')

    } else if (this.form_antecedentes.invalid) {
      this.openSnackBar('Complete el apartado de antecedentes', 'red-snackbar')
      
    } else {
      let data = Object.assign(this.form_antecedentes.getRawValue(), this.form_identificacion_establecimiento.getRawValue());
      data = Object.assign(data, this.form_signos_de_peligro.getRawValue())
      data = Object.assign(data, this.form_referencia.getRawValue())
      data = Object.assign(data, this.form_motivo_consulta.getRawValue())
      data = Object.assign(data, this.form_enfermedad_actual.getRawValue())


      this.cargando=true
      this.sub_guardar_control = this.apiServices.agregarControl(this.token, data).subscribe(d => {
        if (d.status == 'Success') {

          let id_control = d.id_control
          this.router.navigateByUrl('/control-prenatal/'+this.id_paciente+'/'+id_control)
          this.openSnackBar('Control agregado exitosamente', "green-snackbar")
        }
        this.cargando=false
      },err=>{
        this.cargando=false
        this.openSnackBar('Error al guardar control', 'red-snackbar')
      })
      // console.log(data)
  
      // var keys = Object.keys(data);
      // var len = keys.length;
      // console.log(len)
      
    }








  }



  ngOnDestroy() {
    if (this.sub_get_exp) {
      this.sub_get_exp.unsubscribe()
    }

    if (this.sub_guardar_control) {
      this.sub_guardar_control.unsubscribe()
    }

    if(this.sub_obtener_paciente){
      this.sub_obtener_paciente.unsubscribe()
    }

  }


  openSnackBar(message, tipo) {
    this._snackBar.open(message, "", {
      duration: 1500,
      panelClass: [tipo]
    });
  }



  sub_obtener_paciente:Subscription;
  data_paciente:any;

  cargando_paciente=false;
  obtenerDataPaciente(){

    this.cargando_paciente=true;
    this.sub_obtener_paciente=this.apiServices.obtener_paciente(this.token,this.id_paciente).subscribe(data=>{
      this.data_paciente=data.data[0]
      
      // console.log(this.data_paciente)
      this.id_expediente=this.data_paciente.id_expediente
      // this.form_data_paciente=new FormGroup({
      //   'primer_nombre':new FormControl(this.data_paciente.primer_nombre,Validators.required),
      //   'segundo_nombre': new FormControl(this.data_paciente.segundo_nombre),
      //   'primer_apellido':new FormControl(this.data_paciente.primer_apellido,Validators.required),
      //   'segundo_apellido': new FormControl(this.data_paciente.segundo_apellido),
      //   'dpi':new FormControl(this.data_paciente.dpi,Validators.required),
      //   'fecha_nacimiento':new FormControl(this.data_paciente.fecha_nacimiento,Validators.required),
      //   'calle_avenida':new FormControl(this.data_paciente.calle_avenida,Validators.required),
      //   'municipio':new FormControl(this.data_paciente.municipio,Validators.required),
      //   'departamento':new FormControl(this.data_paciente.departamento,Validators.required),
      //   'telefono':new FormControl(this.data_paciente.telefono,Validators.required),
      //   'ocupacion':new FormControl(this.data_paciente.ocupacion,Validators.required),
      //   'migrante':new FormControl(this.data_paciente.migrante,Validators.required),
      //   'nombre_responsable':new FormControl(this.data_paciente.nombre_responsable,Validators.required),
      //   'telefono_responsable':new FormControl(this.data_paciente.telefono_responsable,Validators.required),
      // })

      this.migrante[this.data_paciente.migrante]=true
      console.log(this.migrante)
      this.cargando_paciente=false
      // console.log(this.data_paciente)
    },err=>{
      this.cargando_paciente=false
      this.openSnackBar('Error al obtener datos de la paciente', 'red-snackbar')
    })
  }


  close(){
    this.dialogRef.close();
  }

}
