from flask import Flask, jsonify, request, abort,Blueprint, session
#from contollers.db_controler import db_Controller
from contollers.postgresql_controller import PostgreSQL_Controller
from contollers.mysql_controler import MySql_Controller

from contollers.contoller import getDB

from validator import validate

app = Flask(__name__)
app.secret_key = '\xfd{H\xe5<\x95\xf9\xe3\x96.5\xd1\x01O<!\xd5\xa2\xa0\x9fR"\xa1\xa8'

bp= Blueprint('pacientes',__name__)

#db=MySql_Controller()


rulesSetDataBase={
    "database":"required"
}
@bp.route('/set-database', methods=['POST'])
def setdatabse():
    data = request.json

    try:
        if(validate(data, rulesSetDataBase)):
            database= data['database']
            session['db']=database
            code=200
            data={
                "status":"success",
                "data":[{
                    "database":database
                }]
            }
            return jsonify(data),code
        else:
            print("error validacion")
            abort(409)
    
    except Exception as e:
        print("error " + str(e))
        abort(409)




@bp.route('/obtener-pacientes')
def get():
    db=getDB(session['db'])
    print(session['db'])
    data_pacientes, code= db.obtenerPacientes()    
    return jsonify(data_pacientes), code

@bp.route('/obtener-bebes')
def get_bebes():
    db=getDB(session['db'])
    data_pacientes, code= db.obtenerBebes()
    return jsonify(data_pacientes), code
    #print(headers)
    #return 


rulesAddPacient={
    "primer_nombre":"required",
    "primer_apellido":"required",
    "dpi":"required",
    "fecha_nacimiento":"required",
    "pais":"required",
    "departamento":"required",
    "municipio":"required",
    "direccion":"required"
}
@bp.route('/agregar-paciente', methods=["POST"])
def agregar_paciente():
    db=getDB(session['db'])
    data = request.json

    try:
        if(validate(data,rulesAddPacient)):

            segundo_nombre=""
            segundo_apellido=""

            if "segundo_nombre" in data:
                segundo_nombre= data["segundo_nombre"]
            
            if "segundo_apellido" in data:
                segundo_apellido= data["segundo_apellido"]

            sqlData, code = db.agregarPaciente(
                data["primer_nombre"],
                data["primer_apellido"],
                data["dpi"],
                data["fecha_nacimiento"],
                data['pais'],
                data["departamento"],
                data["municipio"],
                data["direccion"],
                segundo_nombre=segundo_nombre,
                segundo_apellido=segundo_apellido)
            return jsonify(sqlData), code
        else:
            abort(409)
    
    except Exception as e:
        print("error " + str(e))
        abort(409)

rulesUpdatePacient={
    "id":"required",
    "primer_nombre":"required",
    "primer_apellido":"required",
    "fecha_nacimiento":"required",
    "pais":"required",
    "departamento":"required",
    "municipio":"required",
    "direccion":"required"
}
@bp.route('/actualizar-paciente', methods=["POST"])
def actualizar_paciente():
    db=getDB(session['db'])
    data = request.json

    try:
        if(validate(data,rulesUpdatePacient)):

            segundo_nombre=""
            segundo_apellido=""

            if "segundo_nombre" in data:
                segundo_nombre= data["segundo_nombre"]
            
            if "segundo_apellido" in data:
                segundo_apellido= data["segundo_apellido"]

            sqlData, code = db.actualizarPaciente(
                data["id"],
                data["primer_nombre"],
                data["primer_apellido"],
                data["fecha_nacimiento"],
                data['pais'],
                data["departamento"],
                data["municipio"],
                data["direccion"],
                segundo_nombre=segundo_nombre,
                segundo_apellido=segundo_apellido)
            return jsonify(sqlData), code
        else:
            abort(409)
    
    except Exception as e:
        print("error " + str(e))
        abort(409)


rulesAddBaby={
    "dpi_mama":"required",
    "peso":"required",
    "sexo":"required",
    "fecha_nacimiento":"required",
    "pais":"required",
    "departamento":"required",
    "municipio":"required"
}     
@bp.route('/agregar-bebe', methods=["POST"])
def agregar_bebe():
    db=getDB(session['db'])
    data = request.json

    try:
        if(validate(data,rulesAddBaby)):

            sqlData, code = db.agregarBebe(
                data["dpi_mama"],
                data["peso"],
                data["sexo"],
                data["fecha_nacimiento"],
                data['pais'],
                data["departamento"],
                data["municipio"])
            return jsonify(sqlData), code
        else:
            abort(409)
    
    except Exception as e:
        print("error " + str(e))
        abort(409)


@bp.route('/pacientes-por-departamento', methods=['GET'])
def getPacientes_x_departamento():
    db=getDB(session['db'])
    data_pacientes, code= db.obtenerPacientes_x_Departamento()
    return jsonify(data_pacientes), code
    #print(headers)
    #return 


rulesGetPacientsMunicipio={
    "departamento":"required",
}
@bp.route('/pacientes-por-municipio', methods=['POST'])
def getPacientes_x_municipio():
    db=getDB(session['db'])
    data = request.json


    try:
        if(validate(data, rulesGetPacientsMunicipio)):

            sqlData, code = db.obtenerPacientes_x_municipio(data['departamento'])
            return jsonify(sqlData), code
        else:
            abort(409)
    
    except Exception as e:
        print("error " + str(e))
        abort(409)



rulesGetPacientsLugar={
    "tipo":"required",
}
@bp.route('/pacientes-por-lugar', methods=['POST'])
def getPacientes_x_lugar():
    db=getDB(session['db'])
    data = request.json


    try:
        if(validate(data, rulesGetPacientsLugar)):

            sqlData, code = db.obtenerPacientes_x_lugar(data['tipo'])
            return jsonify(sqlData), code
        else:
            abort(409)
    
    except Exception as e:
        print("error " + str(e))
        abort(409)





rulesGetPacientesAge={
    "rangos":"required"
}
@bp.route('/pacientes-por-edad', methods=['POST'])
def getPacientes_x_Edad():
    db=getDB(session['db'])
    data = request.json

    try:
        if(validate(data, rulesGetPacientesAge)):
            rangos= data['rangos']

            #sqlData, code = db.obtenerPacientes_x_lugar(data['tipo'])
            #return jsonify(sqlData), code
            data, code=db.obtenerPacientes_x_edad(rangos)
            print(data)
            return jsonify(data),code
        else:
            print("error validacion")
            abort(409)
    
    except Exception as e:
        print("error " + str(e))
        abort(409)

rulesGetPacientesAgeDepto={
    "rangos":"required",
    "tipo":"required",
    "lugar":"required"
}
@bp.route('/pacientes-por-lugar-edad', methods=['POST'])
def getPacientes_x_Lugar_edad():
    db=getDB(session['db'])
    data = request.json

    try:
        if(validate(data, rulesGetPacientesAgeDepto)):
            rangos= data['rangos']
        
            #sqlData, code = db.obtenerPacientes_x_lugar(data['tipo'])
            #return jsonify(sqlData), code
            data, code=db.obtenerPacientes_x_edad_depto(rangos,data["tipo"],data["lugar"])
            print(data)
            return jsonify(data),code
        else:
            print("error validacion")
            abort(409)
    
    except Exception as e:
        print("error " + str(e))
        abort(409)


@bp.route('/nacimientos-por-departamento', methods=['GET'])
def getNacimientos_x_departamento():
    db=getDB(session['db'])
    data_pacientes, code= db.obtenerNacimientos_x_Departamento()
    return jsonify(data_pacientes), code
    #print(headers)
    #return 


rulesNacimientosMunicipio={
    "departamento":"required"
}
@bp.route('/nacimientos-por-municipio', methods=['POST'])
def getNacimientos_x_Municipior():
    db=getDB(session['db'])
    data = request.json
    try:
        if(validate(data, rulesNacimientosMunicipio)):

            sqlData, code = db.obtenerNacimientos_x_Municipio(data['departamento'])
            return jsonify(sqlData), code
        else:
            abort(409)
    
    except Exception as e:
        print("error " + str(e))
        abort(409)


rulesNacimientosMunicipioAño={
    "año":"required"
}
@bp.route('/nacimientos-por-municipio-año', methods=['POST'])
def getNacimientos_x_Municipio_año():
    db=getDB(session['db'])
    data = request.json
    try:
        if(validate(data, rulesNacimientosMunicipioAño)):

            sqlData, code = db.obtenerNacimientos_x_Municipio_año(data['año'])
            return jsonify(sqlData), code
        else:
            abort(409)
    
    except Exception as e:
        print("error " + str(e))
        abort(409)


rulesNacimientosMunicipioMes={
    "mes":"required"
}
@bp.route('/nacimientos-por-municipio-mes', methods=['POST'])
def getNacimientos_x_Municipio_mes():
    db=getDB(session['db'])
    data = request.json
    try:
        if(validate(data, rulesNacimientosMunicipioMes)):

            sqlData, code = db.obtenerNacimientos_x_Municipio_mes(data['mes'])
            return jsonify(sqlData), code
        else:
            abort(409)
    
    except Exception as e:
        print("error " + str(e))
        abort(409)



rulesNacimientosMunicipioMesAño={
    "mes":"required",
    "año":"required"

}
@bp.route('/nacimientos-por-municipio-mes-año', methods=['POST'])
def getNacimientos_x_Municipio_mes_año():
    db=getDB(session['db'])
    data = request.json
    try:
        if(validate(data, rulesNacimientosMunicipioMesAño)):

            sqlData, code = db.obtenerNacimientos_x_Municipio_mes_año(data['mes'],data["año"])
            return jsonify(sqlData), code
        else:
            abort(409)
    
    except Exception as e:
        print("error " + str(e))
        abort(409)




rulesNacimientosMunicipioDeptoAño={
    "año":"required",
    "departamento":"required"
}
@bp.route('/nacimientos-por-municipio-depto-año', methods=['POST'])
def getNacimientos_x_Municipio_depto_año():
    db=getDB(session['db'])
    data = request.json
    try:
        if(validate(data, rulesNacimientosMunicipioDeptoAño)):

            sqlData, code = db.obtenerNacimientos_x_Municipio_departamento_año(data['departamento'], data["año"])
            return jsonify(sqlData), code
        else:
            abort(409)
    
    except Exception as e:
        print("error " + str(e))
        abort(409)


rulesNacimientosMunicipioDeptoMes={
    "mes":"required",
    "departamento":"required"
}
@bp.route('/nacimientos-por-municipio-depto-mes', methods=['POST'])
def getNacimientos_x_Municipio_depto_mes():
    db=getDB(session['db'])
    data = request.json
    try:
        if(validate(data, rulesNacimientosMunicipioDeptoMes)):

            sqlData, code = db.obtenerNacimientos_x_Municipio_departamento_mes(data['departamento'], data["mes"])
            return jsonify(sqlData), code
        else:
            abort(409)
    
    except Exception as e:
        print("error " + str(e))
        abort(409)


rulesNacimientosMunicipioDeptoAñoMes={
    "mes":"required",
    "departamento":"required",
    "año":"required"
}
@bp.route('/nacimientos-por-municipio-depto-año-mes', methods=['POST'])
def getNacimientos_x_Municipio_depto_año_mes():
    db=getDB(session['db'])
    data = request.json
    try:
        if(validate(data, rulesNacimientosMunicipioDeptoAñoMes)):

            sqlData, code = db.obtenerNacimientos_x_Municipio_departamento_año_mes(data['departamento'], data["año"],data["mes"])
            return jsonify(sqlData), code
        else:
            abort(409)
    
    except Exception as e:
        print("error " + str(e))
        abort(409)






rulesNacimientosLugar={
    "tipo":"required",
}
@bp.route('/nacimientos-por-lugar', methods=['POST'])
def getNacimientos_x_lugar():
    db=getDB(session['db'])
    data = request.json
    try:
        if(validate(data, rulesNacimientosLugar)):

            sqlData, code = db.obtenerNacimientos_x_Lugar(data['tipo'])
            return jsonify(sqlData), code
        else:
            abort(409)
    
    except Exception as e:
        print("error " + str(e))
        abort(409)



rulesNacimientosFecha={
    "tipo":"required"
}
@bp.route('/nacimientos-por-fecha', methods=['POST'])
def getNacimientos_x_fecha():
    db=getDB(session['db'])
    data = request.json
    try:
        if(validate(data, rulesNacimientosFecha)):

            sqlData, code = db.obtenerNacimientos_x_Fecha(data['tipo'])
            return jsonify(sqlData), code
        else:
            abort(409)
    
    except Exception as e:
        print("error " + str(e))
        abort(409)



rulesNacimientosMes={
    "año":"required"
}
@bp.route('/nacimientos-por-mes', methods=['POST'])
def getNacimientos_x_mes():
    db=getDB(session['db'])
    data = request.json
    try:
        if(validate(data, rulesNacimientosMes)):

            sqlData, code = db.obtenerNacimientos_x_mes(data['año'])
            return jsonify(sqlData), code
        else:
            abort(409)
    
    except Exception as e:
        print("error " + str(e))
        abort(409)


@bp.route('/nacimientos-por-año', methods=['GET'])
def getNacimientos_x_año():
    db=getDB(session['db'])
    data_pacientes, code= db.obtenerNacimientos_x_año()
    return jsonify(data_pacientes), code
    #print(headers)
    #return 


rulesNacimientosAñoLugar={
    "tipo":"required",
    "lugar":"required"
}
@bp.route('/nacimientos-por-año-lugar', methods=['POST'])
def getNacimientos_x_año_lugar():
    db=getDB(session['db'])
    data = request.json
    try:
        if(validate(data, rulesNacimientosAñoLugar)):

            sqlData, code = db.obtenerNacimientos_x_año_tipo(data['tipo'],data["lugar"])
            return jsonify(sqlData), code
        else:
            abort(409)
    
    except Exception as e:
        print("error " + str(e))
        abort(409)


rulesNacimientosMesLugarAño={
    "año":"required",
    "tipo":"required",
    "lugar":"required"
}

@bp.route('/nacimientos-por-mes-lugar-año', methods=['POST'])
def getNacimientos_x_mes_lugar_año():
    db=getDB(session['db'])
    data = request.json
    try:
        if(validate(data, rulesNacimientosMesLugarAño)):

            sqlData, code = db.obtenerNacimientos_x_mes_tipo_año(data['año'],data['tipo'],data["lugar"])
            return jsonify(sqlData), code
        else:
            abort(409)
    
    except Exception as e:
        print("error " + str(e))
        abort(409)


rulesNacimientosMesLugar={
    "tipo":"required",
    "lugar":"required"
}

@bp.route('/nacimientos-por-mes-lugar', methods=['POST'])
def getNacimientos_x_mes_lugar():
    db=getDB(session['db'])
    data = request.json
    try:
        if(validate(data, rulesNacimientosMesLugar)):

            sqlData, code = db.obtenerNacimientos_x_mes_lugar(data['tipo'],data["lugar"])
            return jsonify(sqlData), code
        else:
            abort(409)
    
    except Exception as e:
        print("error " + str(e))
        abort(409)



@bp.route('/bebes-por-sexo')
def getBebes_x_sexo():
    db=getDB(session['db'])
    data_pacientes, code= db.obtenerNacimientos_x_Sexo()
    return jsonify(data_pacientes), code
    #print(headers)
    #return 



app.register_blueprint(bp, url_prefix="/control-medico")

if __name__ == '__main__':
    app.run(debug=True)