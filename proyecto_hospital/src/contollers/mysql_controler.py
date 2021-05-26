import pymysql
from datetime import datetime
import time

class MySql_Controller():

    def __init__(self):
        self.host='localhost'
        self.user='proyecto_final'
        self.password='mjardel10'
        self.db='hospital_materno'
        pacientes=[]


    def obtener_conexion(self):
        return pymysql.connect(host=self.host,user=self.user,password=self.password, db=self.db)

    def obtenerPacientes(self):
        conexion= self.obtener_conexion()
        cursor=conexion.cursor()
        #with conexion.cursor() as cursor:
        detail=""
        finalData={}
        status=""
        code=409
        try:
            cursor.execute("""Select pacientes.id, pacientes.primer_nombre, pacientes.segundo_nombre,
                              pacientes.primer_apellido, pacientes.segundo_apellido, pacientes.dpi,
                              CONVERT(pacientes.fecha_nacimiento, CHAR) as fecha_nacimiento,
                              pacientes.pais, pacientes.departamento, pacientes.municipio, pacientes.direccion, count(bebes_nacidos.dpi_mama) as cantidad_hijos
                              from pacientes left Join bebes_nacidos 
                              on pacientes.dpi= bebes_nacidos.dpi_mama 
                              group by pacientes.id""")
            pacientes= cursor.fetchall()
            headers=[i[0] for i in cursor.description]
            conexion.close()
            data=self.createQueryDict(pacientes,headers)
            status="Success"
            code=200
        except Exception as e:
            data=[]
            detail= str(e)
            status="Error"
        finalData['detail']=detail
        finalData['status']=status
        finalData['data']=data
        return finalData, code

    def agregarPaciente(self,primer_nombre,primer_apellido,dpi,fecha_nacimiento,pais,departamento,municipio,direccion,segundo_nombre="",       segundo_apellido=""):
        conexion= self.obtener_conexion()
        cursor=conexion.cursor()

        detail=""
        finalData={}
        status=""
        code=409
        try:
            cursor.execute("""INSERT INTO pacientes
            VALUES (null,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)""",
            (primer_nombre,segundo_nombre, primer_apellido,segundo_apellido,dpi,fecha_nacimiento,pais,departamento,municipio,    direccion))
            #print()
            conexion.commit()
            conexion.close()
            data= {
                "id":cursor.lastrowid,
                "dpi":dpi,
                "primer_nombre":primer_nombre,
                "primer_apellido":primer_apellido,
                "segundo_nombre":segundo_nombre,
                "segundo_apellido":segundo_apellido
            }
            status="Success"
            code=200

        except Exception as e:
            if self.personaExists(dpi):
                detail="Paciente ya registrada"  
                code="200"
            else:
                detail= str(e)
            data=[]
            status="Error"

        finalData['detail']=detail
        finalData['status']=status
        finalData['data']=data
        return finalData, code

    def actualizarPaciente(self,id, primer_nombre,primer_apellido,fecha_nacimiento,pais,departamento,municipio,direccion,segundo_nombre="",       segundo_apellido=""):
        conexion= self.obtener_conexion()
        cursor=conexion.cursor()

        detail=""
        finalData={}
        status=""
        code=409
        
        try:
            query="""UPDATE pacientes set primer_nombre='{0}', segundo_nombre='{1}', primer_apellido='{2}', segundo_apellido='{3}', fecha_nacimiento='{4}', pais='{5}',
            departamento='{6}', municipio='{7}', direccion='{8}' where id='{9}' """.format(primer_nombre,segundo_nombre, primer_apellido, segundo_apellido, fecha_nacimiento, pais, departamento, municipio,direccion, id)
            direccion='{8}'
            print(query)
            cursor.execute(query)
            conexion.commit()
            conexion.close()
            data= {
                "id":id,
                "primer_nombre":primer_nombre,
                "primer_apellido":primer_apellido
            }
            status="Success"
            code=200

        except Exception as e:
            
            code="409"
            detail= str(e)
            data=[]
            status="Error"

        finalData['detail']=detail
        finalData['status']=status
        finalData['data']=data
        return finalData, code


    def createQueryDict(self,queryData, headers):
        queryList =[{header:value[i] for i, header in enumerate(headers)} for value in queryData]
        return queryList
    
    def createQueryDictFiltros(self,queryData, headers):
        queryList =[{header:value[i] for i, header in enumerate(headers)} for value in queryData]
        return queryList

    def personaExists(self, dpi):
        conexion= self.obtener_conexion()
        cursor=conexion.cursor()
        #with conexion.cursor() as cursor:
        data=[]
        try:
            cursor.execute("""Select * from pacientes where dpi=%s""", dpi)
            data= cursor.fetchall()
            if data!= ():
                return True
            else:
                return False

        except Exception as e:
            return str(e)

    def agregarBebe(self, dpi_mama, peso, sexo, fecha_nacimiento, pais_nacimiento, departamento_nacimiento, municipio_nacimiento):
        conexion= self.obtener_conexion()
        cursor=conexion.cursor()

        detail=""
        finalData={}
        status=""
        code=409
        try:
            if self.personaExists(dpi_mama):
                cursor.execute("""INSERT INTO bebes_nacidos
                VALUES (null,%s,%s,%s,%s,%s,%s,%s)""",
                (dpi_mama, peso, sexo, fecha_nacimiento, pais_nacimiento, departamento_nacimiento, municipio_nacimiento))
                #print()
                conexion.commit()
                conexion.close()
                data= {
                    "id":cursor.lastrowid,
                    "dpi_mama": dpi_mama ,
                    "peso":peso,
                    "sexo":sexo,
                }
                status="Success"
                code=200
            else:    
                data=[]
                status="Error"
                detail= "La paciente con dpi: {0}, no está registrada".format(dpi_mama)
                

        except Exception as e:    
            data=[]
            status="Error"
            detail= str(e)

        finalData['detail']=detail
        finalData['status']=status
        finalData['data']=data
        return finalData, code

    def obtenerBebes(self):
        conexion= self.obtener_conexion()
        cursor=conexion.cursor()
        #with conexion.cursor() as cursor:
        detail=""
        finalData={}
        status=""
        code=409
        try:
            cursor.execute("""Select bebes_nacidos.id, bebes_nacidos.dpi_mama, bebes_nacidos.peso, bebes_nacidos.sexo,
                              CONVERT(bebes_nacidos.fecha_nacimiento, CHAR) as fecha_nacimiento,
                              bebes_nacidos.pais_nacimiento, bebes_nacidos.departamento_nacimiento, bebes_nacidos.municipio_nacimiento,
                              pacientes.primer_nombre, pacientes.primer_apellido
                              from bebes_nacidos, pacientes
                              where bebes_nacidos.dpi_mama= pacientes.dpi""")
            pacientes= cursor.fetchall()
            headers=[i[0] for i in cursor.description]
            conexion.close()
            data=self.createQueryDict(pacientes,headers)
            status="Success"
            code=200
        except Exception as e:
            data=[]
            detail= str(e)
            status="Error"
        finalData['detail']=detail
        finalData['status']=status
        finalData['data']=data
        return finalData, code


    def obtenerPacientes_x_Departamento(self):
        conexion= self.obtener_conexion()
        cursor=conexion.cursor()
        #with conexion.cursor() as cursor:
        detail=""
        finalData={}
        status=""
        code=409
        try:
            query="""Select count(*) as cantidad, departamento
                              from pacientes
                              where departamento=departamento 
                              group by departamento"""
            
            print(query)

            cursor.execute( query)  
            pacientes= cursor.fetchall()
            headers=["cantidad","valor"]
            conexion.close()
            data=self.createQueryDict(pacientes,headers)
            status="Success"
            code=200
        except Exception as e:
            data=[]
            detail= str(e)
            status="Error"
        finalData['detail']=detail
        finalData['status']=status
        finalData['data']=data
        return finalData, code
    
    def obtenerPacientes_x_municipio(self, depto):
        conexion= self.obtener_conexion()
        cursor=conexion.cursor()
        #with conexion.cursor() as cursor:
        detail=""
        finalData={}
        status=""
        code=409
        try:
            query="""Select count(*) as cantidad, municipio
                              from pacientes
                              where departamento='{0}' and municipio=municipio
                              group by municipio""".format(depto)
            
            print(query)

            cursor.execute( query)  
            pacientes= cursor.fetchall()
            headers=["cantidad","valor"]
            conexion.close()
            data=self.createQueryDict(pacientes,headers)
            status="Success"
            code=200
        except Exception as e:
            data=[]
            detail= str(e)
            status="Error"
        finalData['detail']=detail
        finalData['status']=status
        finalData['data']=data
        return finalData, code


    def obtenerPacientes_x_lugar(self, tipo):
        conexion= self.obtener_conexion()
        cursor=conexion.cursor()
        #with conexion.cursor() as cursor:
        detail=""
        finalData={}
        status=""
        code=409
        try:
            query="""Select count(*) as cantidad, {0}
                              from pacientes
                              where {0}={0} 
                              group by {0}""".format(tipo)
            
            #print(query)

            cursor.execute( query)  
            pacientes= cursor.fetchall()
            headers=["cantidad","valor"]
            conexion.close()
            data=self.createQueryDict(pacientes,headers)
            status="Success"
            code=200
        except Exception as e:
            data=[]
            detail= str(e)
            status="Error"
        finalData['detail']=detail
        finalData['status']=status
        finalData['data']=data
        return finalData, code

    def obtenerPacientes_x_edad(self,rangos):
        #year = datetime.now().year

        conexion= self.obtener_conexion()
        cursor=conexion.cursor()
        #with conexion.cursor() as cursor:
        detail=""
        finalData={}
        status=""
        code=409


        data_total=[]
        try:

            for rango in rangos:
                query="""Select count(*) as cantidad, 
                        YEAR(CURDATE())-YEAR(pacientes.fecha_nacimiento) + 
                        IF(DATE_FORMAT(CURDATE(),'%m-%d') > DATE_FORMAT(pacientes.fecha_nacimiento,'%m-%d'), 0 , -1 ) AS edad_actual 
                        from pacientes group by fecha_nacimiento having edad_actual between {0} and {1}""".format(rango['inicio'], rango['final'])


                print(query)

                cursor.execute( query)  
                pacientes= cursor.fetchall()
                
                headers=[i[0] for i in cursor.description]
                data=self.createQueryDict(pacientes,headers)

                suma=0
                for item in data:
                    suma=suma + item["cantidad"]
                
                data_total.append({"rango":"""{0} - {1} años""".format(rango['inicio'], rango['final']), "total":suma})


            conexion.close()





            status="Success"
            code=200
        except Exception as e:
            data_total=[]
            detail= str(e)
            status="Error"
        finalData['detail']=detail
        finalData['status']=status
        finalData['data']=data_total
        return finalData, code
        

        #return year

    def obtenerNacimientos_x_Lugar(self,tipo):
        conexion= self.obtener_conexion()
        cursor=conexion.cursor()
        #with conexion.cursor() as cursor:
        detail=""
        finalData={}
        status=""
        code=409
        try:
            query="""Select count(*) as cantidad, {0}
                              from bebes_nacidos
                              where {0}={0} 
                              group by {0}""".format(tipo)
            
            #print(query)

            cursor.execute( query)  
            pacientes= cursor.fetchall()
            headers=["cantidad","valor"]
            conexion.close()
            data=self.createQueryDict(pacientes,headers)
            status="Success"
            code=200
        except Exception as e:
            data=[]
            detail= str(e)
            status="Error"
        finalData['detail']=detail
        finalData['status']=status
        finalData['data']=data
        return finalData, code

    def obtenerNacimientos_x_Departamento(self):
        conexion= self.obtener_conexion()
        cursor=conexion.cursor()
        #with conexion.cursor() as cursor:
        detail=""
        finalData={}
        status=""
        code=409
        try:
            query="""Select count(*) as cantidad, departamento_nacimiento
                              from bebes_nacidos
                              where departamento_nacimiento=departamento_nacimiento 
                              group by departamento_nacimiento"""
            
            #print(query)

            cursor.execute( query)  
            pacientes= cursor.fetchall()
            headers=["cantidad","valor"]
            conexion.close()
            data=self.createQueryDict(pacientes,headers)
            status="Success"
            code=200
        except Exception as e:
            data=[]
            detail= str(e)
            status="Error"
        finalData['detail']=detail
        finalData['status']=status
        finalData['data']=data
        return finalData, code

    def obtenerNacimientos_x_Municipio(self, depto):
        conexion= self.obtener_conexion()
        cursor=conexion.cursor()
        #with conexion.cursor() as cursor:
        detail=""
        finalData={}
        status=""
        code=409
        try:
            query="""Select count(*) as cantidad, municipio_nacimiento
                              from bebes_nacidos
                              where departamento_nacimiento='{0}' and municipio_nacimiento=municipio_nacimiento 
                              group by municipio_nacimiento""".format(depto)
            
            #print(query)

            cursor.execute( query)  
            pacientes= cursor.fetchall()
            headers=["cantidad","valor"]
            conexion.close()
            data=self.createQueryDict(pacientes,headers)
            status="Success"
            code=200
        except Exception as e:
            data=[]
            detail= str(e)
            status="Error"
        finalData['detail']=detail
        finalData['status']=status
        finalData['data']=data
        return finalData, code

    def obtenerNacimientos_x_Fecha(self,tipo):
        conexion= self.obtener_conexion()
        cursor=conexion.cursor()
        #with conexion.cursor() as cursor:
        detail=""
        finalData={}
        status=""
        code=409
        try:
            query="""Select count(*) as total, {0}(fecha_nacimiento)
                        from bebes_nacidos 
                        where {0}(fecha_nacimiento)={0}(fecha_nacimiento) group by {0}(fecha_nacimiento)""".format(tipo)
            
            #print(query)

            cursor.execute( query)  
            pacientes= cursor.fetchall()
            headers=["cantidad","valor"]
            conexion.close()
            data=self.createQueryDict(pacientes,headers)
            status="Success"
            code=200
        except Exception as e:
            data=[]
            detail= str(e)
            status="Error"
        finalData['detail']=detail
        finalData['status']=status
        finalData['data']=data
        return finalData, code

    def obtenerNacimientos_x_año(self):
        conexion= self.obtener_conexion()
        cursor=conexion.cursor()
        #with conexion.cursor() as cursor:
        detail=""
        finalData={}
        status=""
        code=409
        try:
            query="""Select count(*) as total, YEAR(fecha_nacimiento)
                        from bebes_nacidos 
                        where YEAR(fecha_nacimiento)=YEAR(fecha_nacimiento) group by YEAR(fecha_nacimiento)"""
            
            #print(query)

            cursor.execute( query)  
            pacientes= cursor.fetchall()
            headers=["cantidad","año"]
            conexion.close()
            data=self.createQueryDict(pacientes,headers)
            status="Success"
            code=200
        except Exception as e:
            data=[]
            detail= str(e)
            status="Error"
        finalData['detail']=detail
        finalData['status']=status
        finalData['data']=data
        return finalData, code

    def obtenerNacimientos_x_mes(self, año):
        conexion= self.obtener_conexion()
        cursor=conexion.cursor()
        #with conexion.cursor() as cursor:
        detail=""
        finalData={}
        status=""
        code=409
        try:
            query="""Select count(*) as total, MONTH(fecha_nacimiento)
                        from bebes_nacidos 
                        where  YEAR(fecha_nacimiento)='{0}' and  MONTH(fecha_nacimiento)=MONTH(fecha_nacimiento) group by MONTH(fecha_nacimiento)""".format(año)
            
            #print(query)

            cursor.execute( query)  
            pacientes= cursor.fetchall()
            headers=["cantidad","mes"]
            conexion.close()
            data=self.createQueryDict(pacientes,headers)
            status="Success"
            code=200
        except Exception as e:
            data=[]
            detail= str(e)
            status="Error"
        finalData['detail']=detail
        finalData['status']=status
        finalData['data']=data
        return finalData, code

    def obtenerNacimientos_x_Sexo(self):
        conexion= self.obtener_conexion()
        cursor=conexion.cursor()
        #with conexion.cursor() as cursor:
        detail=""
        finalData={}
        status=""
        code=409
        try:
            query="""Select count(*) as cantidad, sexo
                              from bebes_nacidos
                              where sexo=sexo
                              group by sexo"""
            
            #print(query)

            cursor.execute( query)  
            pacientes= cursor.fetchall()
            headers=[i[0] for i in cursor.description]
            conexion.close()
            data=self.createQueryDict(pacientes,headers)
            status="Success"
            code=200
        except Exception as e:
            data=[]
            detail= str(e)
            status="Error"
        finalData['detail']=detail
        finalData['status']=status
        finalData['data']=data
        return finalData, code