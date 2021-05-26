from flask import Flask, jsonify, request, abort,Blueprint
from contollers.mysql_controler import MySql_Controller
from validator import validate

app = Flask(__name__)

bp= Blueprint('pacientes',__name__)

mysql=MySql_Controller()
@bp.route('/obtener-pacientes')
def get():
    data_pacientes, code= mysql.obtenerPacientes()
    return jsonify(data_pacientes), code
    #print(headers)
    #return 

@bp.route('/obtener-bebes')
def get_bebes():
    data_pacientes, code= mysql.obtenerBebes()
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
    data = request.json

    try:
        if(validate(data,rulesAddPacient)):

            segundo_nombre=""
            segundo_apellido=""

            if "segundo_nombre" in data:
                segundo_nombre= data["segundo_nombre"]
            
            if "segundo_apellido" in data:
                segundo_apellido= data["segundo_apellido"]

            sqlData, code = mysql.agregarPaciente(
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
    data = request.json

    try:
        if(validate(data,rulesUpdatePacient)):

            segundo_nombre=""
            segundo_apellido=""

            if "segundo_nombre" in data:
                segundo_nombre= data["segundo_nombre"]
            
            if "segundo_apellido" in data:
                segundo_apellido= data["segundo_apellido"]

            sqlData, code = mysql.actualizarPaciente(
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
    data = request.json

    try:
        if(validate(data,rulesAddBaby)):

            sqlData, code = mysql.agregarBebe(
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
    data_pacientes, code= mysql.obtenerPacientes_x_Departamento()
    return jsonify(data_pacientes), code
    #print(headers)
    #return 


rulesGetPacientsMunicipio={
    "departamento":"required",
}
@bp.route('/pacientes-por-municipio', methods=['POST'])
def getPacientes_x_municipio():
    data = request.json


    try:
        if(validate(data, rulesGetPacientsMunicipio)):

            sqlData, code = mysql.obtenerPacientes_x_municipio(data['departamento'])
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
    data = request.json

    try:
        if(validate(data, rulesGetPacientesAge)):
            rangos= data['rangos']

            #sqlData, code = mysql.obtenerPacientes_x_lugar(data['tipo'])
            #return jsonify(sqlData), code
            data, code=mysql.obtenerPacientes_x_edad(rangos)
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
    data_pacientes, code= mysql.obtenerNacimientos_x_Departamento()
    return jsonify(data_pacientes), code
    #print(headers)
    #return 


rulesNacimientosMunicipio={
    "departamento":"required"
}
@bp.route('/nacimientos-por-municipio', methods=['POST'])
def getNacimientos_x_Municipior():
    data = request.json
    try:
        if(validate(data, rulesNacimientosMunicipio)):

            sqlData, code = mysql.obtenerNacimientos_x_Municipio(data['departamento'])
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
    data = request.json
    try:
        if(validate(data, rulesNacimientosMes)):

            sqlData, code = mysql.obtenerNacimientos_x_mes(data['año'])
            return jsonify(sqlData), code
        else:
            abort(409)
    
    except Exception as e:
        print("error " + str(e))
        abort(409)


@bp.route('/nacimientos-por-año', methods=['GET'])
def getNacimientos_x_año():
    data_pacientes, code= mysql.obtenerNacimientos_x_año()
    return jsonify(data_pacientes), code
    #print(headers)
    #return 





@bp.route('/bebes-por-sexo')
def getBebes_x_sexo():
    data_pacientes, code= mysql.obtenerNacimientos_x_Sexo()
    return jsonify(data_pacientes), code
    #print(headers)
    #return 



app.register_blueprint(bp, url_prefix="/control-medico")

if __name__ == '__main__':
    app.run(debug=True)