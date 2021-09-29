import cx_Oracle
from datetime import datetime
import time

class Oracle_Controller():

    def __init__(self):
        self.host='localhost'
        self.user='proyecto_final'
        self.password='password'
        self.db=''
        pacientes=[]


    def obtener_conexion(self):
       
        return cx_Oracle.connect('proyecto_final/password@localhost:1521/xe') # if needed, place an 'r' before any 
        #print(c.version)

    

    def agregarPaciente(self,primer_nombre,primer_apellido,dpi,fecha_nacimiento,pais,departamento,municipio,direccion,segundo_nombre="",       segundo_apellido=""):
        conexion= self.obtener_conexion()
        cursor=conexion.cursor()

        detail=""
        finalData={}
        status=""
        code=409
        try:
            query=""" Insert into PROYECTO_FINAL.PACIENTES (PRIMER_NOMBRE,SEGUNDO_NOMBRE,PRIMER_APELLIDO,SEGUNDO_APELLIDO,DPI,FECHA_NACIMIENTO,PAIS,DEPARTAMENTO,MUNICIPIO,DIRECCION) values ('{0}','{1}','{2}','{3}','{4}',to_date('{5}','yyyy/mm/dd'),'{6}','{7}','{8}','{9}')""".format(primer_nombre,segundo_nombre, primer_apellido,segundo_apellido,dpi,fecha_nacimiento,pais,departamento,municipio,    direccion)

            
            cursor.execute(query)
            #print()
            conexion.commit()
            #conexion.close()
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
            print("Error:"+ str(e))
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
            query="""UPDATE pacientes set primer_nombre='{0}', segundo_nombre='{1}', primer_apellido='{2}', segundo_apellido='{3}', fecha_nacimiento=to_date('{4}','yyyy/mm/dd'), pais='{5}',
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

                query="""Insert into PROYECTO_FINAL.bebes_nacidos (dpi_mama,peso,sexo,FECHA_NACIMIENTO,PAIS_NACIMIENTO,DEPARTAMENTO_NACIMIENTO,MUNICIPIO_NACIMIENTO) 
                values ('{0}','{1}','{2}',to_date('{3}','yyyy/mm/dd'),'{4}','{5}','{6}')""".format(dpi_mama, peso, sexo, fecha_nacimiento, pais_nacimiento, departamento_nacimiento, municipio_nacimiento)

                cursor.execute(query)
                #print()
                conexion.commit()
                #conexion.close()
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
                              TO_CHAR(bebes_nacidos.fecha_nacimiento , 'yyyy-MM-dd') as fecha_nacimiento,
                              bebes_nacidos.pais_nacimiento, bebes_nacidos.departamento_nacimiento, bebes_nacidos.municipio_nacimiento,
                              pacientes.primer_nombre, pacientes.primer_apellido
                              from bebes_nacidos, pacientes
                              where bebes_nacidos.dpi_mama = pacientes.dpi
                              ORDER BY bebes_nacidos.id ASC""")
            pacientes= cursor.fetchall()
            headers=[i[0].lower() for i in cursor.description]
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
            suma=0
            for item in data:
                suma=suma+item["cantidad"]
            
            status="Success"
            code=200
        except Exception as e:
            data=[]
            detail= str(e)
            status="Error"
        finalData['detail']=detail
        finalData['status']=status
        finalData['data']=data
        finalData["total"]=suma
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

            suma=0
            for item in data:
                suma=suma+item["cantidad"]
            status="Success"
            code=200
        except Exception as e:
            data=[]
            detail= str(e)
            status="Error"
        finalData['detail']=detail
        finalData['status']=status
        finalData['data']=data
        finalData["total"]=suma
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
            total=0
            for paciente in data:
                total=total+ paciente['cantidad']
            status="Success"
            code=200
        except Exception as e:
            data=[]
            detail= str(e)
            status="Error"
        finalData['detail']=detail
        finalData['status']=status
        finalData['data']=data
        finalData['total']=total
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
        total=0
        try:

            for rango in rangos:
                query="""Select count(*) as cantidad
                         
                        from pacientes group by fecha_nacimiento having TRUNC( ( TO_NUMBER(TO_CHAR(SYSDATE,'YYYYMMDD')) -  TO_NUMBER(TO_CHAR(pacientes.fecha_nacimiento,'YYYYMMDD') ) ) / 10000) between {0} and {1}""".format(rango['inicio'], rango['final'])


                #print(query)

                cursor.execute( query)  
                pacientes= cursor.fetchall()
                #print(pacientes)
                
                headers=[i[0].lower() for i in cursor.description]
                data=self.createQueryDict(pacientes,headers)
                #print(data)
                suma=0
                for item in data:
                    suma=suma + item["cantidad"]
                
                data_total.append({"rango":"""{0} - {1} años""".format(rango['inicio'], rango['final']), "total":suma})


            conexion.close()

            
            total=0
            for item in data_total:
                total=total+item["total"]



            status="Success"
            code=200
        except Exception as e:
            print("errorrrrrrrrrrrrrr " + str(e))
            data_total=[]
            detail= str(e)
            status="Error"
        finalData['detail']=detail
        finalData['status']=status
        finalData['data']=data_total
        finalData['total']=total
        return finalData, code

    def obtenerPacientes_x_edad_depto(self,rangos,tipo,lugar):
        #year = datetime.now().year

        conexion= self.obtener_conexion()
        cursor=conexion.cursor()
        #with conexion.cursor() as cursor:
        detail=""
        finalData={}
        status=""
        code=409
        total=0

        data_total=[]
        try:

            for rango in rangos:
                query="""Select count(*) as cantidad
                        from pacientes 
                            where {0}='{1}'
                        group by fecha_nacimiento having TRUNC( ( TO_NUMBER(TO_CHAR(SYSDATE,'YYYYMMDD')) -  TO_NUMBER(TO_CHAR(pacientes.fecha_nacimiento,'YYYYMMDD') ) ) / 10000) between {2} and {3}""".format(tipo,lugar,rango['inicio'], rango['final'])


                print(query)

                cursor.execute( query)  
                pacientes= cursor.fetchall()
                
                headers=[i[0].lower() for i in cursor.description]
                data=self.createQueryDict(pacientes,headers)

                suma=0
                for item in data:
                    suma=suma + item["cantidad"]
                
                data_total.append({"rango":"""{0} - {1} años""".format(rango['inicio'], rango['final']), "total":suma})


            conexion.close()

            
            
            for item in data_total:
                total=total+item["total"]



            status="Success"
            code=200
        except Exception as e:
            data_total=[]
            detail= str(e)
            status="Error"
        finalData['detail']=detail
        finalData['status']=status
        finalData['data']=data_total
        finalData['total']=total
        return finalData, code

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
            total=0
            for bebe in data:
                total=total+ bebe['cantidad']

            status="Success"
            code=200
        except Exception as e:
            data=[]
            detail= str(e)
            status="Error"
        finalData['detail']=detail
        finalData['status']=status
        finalData['data']=data
        finalData['total']=total
        return finalData, code



    def obtenerNacimientos_x_Departamento(self):
        conexion= self.obtener_conexion()
        cursor=conexion.cursor()
        #with conexion.cursor() as cursor:
        detail=""
        finalData={}
        status=""
        code=409
        total=0
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
            for item in data:
                total=total+item['cantidad']
            status="Success"
            code=200
        except Exception as e:
            data=[]
            detail= str(e)
            status="Error"
        finalData['detail']=detail
        finalData['status']=status
        finalData['data']=data
        finalData["total"]=total
        return finalData, code

    def obtenerNacimientos_x_Municipio(self, depto):
        conexion= self.obtener_conexion()
        cursor=conexion.cursor()
        #with conexion.cursor() as cursor:
        detail=""
        finalData={}
        status=""
        code=409
        total=0
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
            for item in data:
                total=total+item['cantidad']
            status="Success"
            code=200
        except Exception as e:
            data=[]
            detail= str(e)
            status="Error"
        finalData['detail']=detail
        finalData['status']=status
        finalData['data']=data
        finalData['total']=total
        return finalData, code


    def obtenerNacimientos_x_año(self):
        conexion= self.obtener_conexion()
        cursor=conexion.cursor()
        #with conexion.cursor() as cursor:
        detail=""
        finalData={}
        status=""
        code=409
        total=0
        try:
            query="""Select count(*) as total, EXTRACT(YEAR FROM fecha_nacimiento)
                        from bebes_nacidos 
                        where EXTRACT(YEAR FROM fecha_nacimiento)=EXTRACT(YEAR FROM fecha_nacimiento) group by EXTRACT(YEAR FROM fecha_nacimiento)"""
            
            #print(query)

            cursor.execute( query)  
            pacientes= cursor.fetchall()
            headers=["cantidad","año"]
            conexion.close()
            data=self.createQueryDict(pacientes,headers)
            for item in data:
                total=total+item['cantidad']
            status="Success"
            code=200
        except Exception as e:
            data=[]
            detail= str(e)
            status="Error"
        finalData['detail']=detail
        finalData['status']=status
        finalData['data']=data
        finalData['total']=total
        return finalData, code

    def obtenerNacimientos_x_Municipio_año(self, año):
        conexion= self.obtener_conexion()
        cursor=conexion.cursor()
        #with conexion.cursor() as cursor:
        detail=""
        finalData={}
        status=""
        code=409
        total=0
        try:
            query="""Select count(*) as cantidad, municipio_nacimiento
                              from bebes_nacidos
                              where EXTRACT(YEAR FROM fecha_nacimiento)='{0}' and municipio_nacimiento=municipio_nacimiento 
                              group by municipio_nacimiento""".format(año)
            
            #print(query)

            cursor.execute( query)  
            pacientes= cursor.fetchall()
            headers=["cantidad","valor"]
            conexion.close()
            data=self.createQueryDict(pacientes,headers)
            for item in data:
                total=total+item['cantidad']
            status="Success"
            code=200
        except Exception as e:
            data=[]
            detail= str(e)
            status="Error"
        finalData['detail']=detail
        finalData['status']=status
        finalData['data']=data
        finalData['total']=total
        return finalData, code


    def obtenerNacimientos_x_Municipio_mes(self, mes):
        conexion= self.obtener_conexion()
        cursor=conexion.cursor()
        #with conexion.cursor() as cursor:
        detail=""
        finalData={}
        status=""
        code=409
        total=0
        try:
            query="""Select count(*) as cantidad, municipio_nacimiento
                              from bebes_nacidos
                              where EXTRACT(MONTH FROM fecha_nacimiento)='{0}' and municipio_nacimiento=municipio_nacimiento 
                              group by municipio_nacimiento""".format(mes)
            
            #print(query)

            cursor.execute( query)  
            pacientes= cursor.fetchall()
            headers=["cantidad","valor"]
            conexion.close()
            data=self.createQueryDict(pacientes,headers)
            for item in data:
                total=total+item['cantidad']
            status="Success"
            code=200
        except Exception as e:
            data=[]
            detail= str(e)
            status="Error"
        finalData['detail']=detail
        finalData['status']=status
        finalData['data']=data
        finalData['total']=total
        return finalData, code

    def obtenerNacimientos_x_Municipio_mes_año(self, mes,año):
        conexion= self.obtener_conexion()
        cursor=conexion.cursor()
        #with conexion.cursor() as cursor:
        detail=""
        finalData={}
        status=""
        code=409
        total=0
        try:
            query="""Select count(*) as cantidad, municipio_nacimiento
                              from bebes_nacidos
                              where EXTRACT(MONTH FROM fecha_nacimiento)='{0}' and 
                              EXTRACT(YEAR FROM fecha_nacimiento)='{1}' and 
                              
                              municipio_nacimiento=municipio_nacimiento 
                              group by municipio_nacimiento""".format(mes,año)
            
            #print(query)

            cursor.execute( query)  
            pacientes= cursor.fetchall()
            headers=["cantidad","valor"]
            conexion.close()
            data=self.createQueryDict(pacientes,headers)
            for item in data:
                total=total+item['cantidad']
            status="Success"
            code=200
        except Exception as e:
            data=[]
            detail= str(e)
            status="Error"
        finalData['detail']=detail
        finalData['status']=status
        finalData['data']=data
        finalData['total']=total
        return finalData, code

    def obtenerNacimientos_x_Municipio_departamento_año(self,depto, año):
        conexion= self.obtener_conexion()
        cursor=conexion.cursor()
        #with conexion.cursor() as cursor:
        detail=""
        finalData={}
        status=""
        code=409
        total=0
        try:
            query="""Select count(*) as cantidad, municipio_nacimiento
                              from bebes_nacidos
                              where EXTRACT(YEAR FROM fecha_nacimiento)='{0}' 
                              and departamento_nacimiento='{1}'
                              and municipio_nacimiento=municipio_nacimiento 
                              group by municipio_nacimiento""".format(año,depto)
            
            print(query)

            cursor.execute( query)  
            pacientes= cursor.fetchall()
            headers=["cantidad","valor"]
            conexion.close()
            data=self.createQueryDict(pacientes,headers)
            for item in data:
                total=total+item['cantidad']
            status="Success"
            code=200
        except Exception as e:
            data=[]
            detail= str(e)
            status="Error"
        finalData['detail']=detail
        finalData['status']=status
        finalData['data']=data
        finalData['total']=total
        return finalData, code

    def obtenerNacimientos_x_Municipio_departamento_mes(self,depto, mes):
        conexion= self.obtener_conexion()
        cursor=conexion.cursor()
        #with conexion.cursor() as cursor:
        detail=""
        finalData={}
        status=""
        code=409
        total=0
        try:
            query="""Select count(*) as cantidad, municipio_nacimiento
                              from bebes_nacidos
                              where EXTRACT(MONTH FROM fecha_nacimiento)='{0}' 
                              and departamento_nacimiento='{1}'
                              and municipio_nacimiento=municipio_nacimiento 
                              group by municipio_nacimiento""".format(mes,depto)
            
            print(query)

            cursor.execute( query)  
            pacientes= cursor.fetchall()
            headers=["cantidad","valor"]
            conexion.close()
            data=self.createQueryDict(pacientes,headers)
            for item in data:
                total=total+item['cantidad']
            status="Success"
            code=200
        except Exception as e:
            data=[]
            detail= str(e)
            status="Error"
        finalData['detail']=detail
        finalData['status']=status
        finalData['data']=data
        finalData['total']=total
        return finalData, code

    def obtenerNacimientos_x_Municipio_departamento_año_mes(self,depto,año, mes):
        conexion= self.obtener_conexion()
        cursor=conexion.cursor()
        #with conexion.cursor() as cursor:
        detail=""
        finalData={}
        status=""
        code=409
        total=0
        try:
            query="""Select count(*) as cantidad, municipio_nacimiento
                              from bebes_nacidos
                              where EXTRACT(MONTH FROM fecha_nacimiento)='{0}' 
                              and EXTRACT(YEAR FROM fecha_nacimiento)='{1}'
                              and departamento_nacimiento='{2}'
                              and municipio_nacimiento=municipio_nacimiento 
                              group by municipio_nacimiento""".format(mes,año,depto)
            
            print(query)

            cursor.execute( query)  
            pacientes= cursor.fetchall()
            headers=["cantidad","valor"]
            conexion.close()
            data=self.createQueryDict(pacientes,headers)
            for item in data:
                total=total+item['cantidad']
            status="Success"
            code=200
        except Exception as e:
            data=[]
            detail= str(e)
            status="Error"
        finalData['detail']=detail
        finalData['status']=status
        finalData['data']=data
        finalData['total']=total
        return finalData, code
        
    def obtenerNacimientos_x_Fecha(self,tipo):
        conexion= self.obtener_conexion()
        cursor=conexion.cursor()
        #with conexion.cursor() as cursor:
        detail=""
        finalData={}
        status=""
        code=409
        total=0
        try:
            query="""Select count(*) as total, EXTRACT({0} FROM fecha_nacimiento)
                        from bebes_nacidos 
                        where EXTRACT({0} FROM fecha_nacimiento)=EXTRACT({0} FROM fecha_nacimiento) group by EXTRACT({0} FROM fecha_nacimiento)""".format(tipo)
            
            #print(query)

            cursor.execute( query)  
            pacientes= cursor.fetchall()
            headers=["cantidad","valor"]
            conexion.close()
            data=self.createQueryDict(pacientes,headers)
            for item in data:
                total=total+item['cantidad']
            status="Success"
            code=200
        except Exception as e:
            data=[]
            detail= str(e)
            status="Error"
        finalData['detail']=detail
        finalData['status']=status
        finalData['data']=data
        finalData["total"]=total
        return finalData, code

    
    def obtenerNacimientos_x_año_tipo(self, tipo,lugar):
        conexion= self.obtener_conexion()
        cursor=conexion.cursor()
        #with conexion.cursor() as cursor:
        detail=""
        finalData={}
        status=""
        code=409
        total=0
        try:
            query="""Select count(*) as total, EXTRACT(YEAR FROM fecha_nacimiento)
                        from bebes_nacidos 
                        where EXTRACT(YEAR FROM fecha_nacimiento)=EXTRACT(YEAR FROM fecha_nacimiento) and {0}='{1}' group by EXTRACT(YEAR FROM fecha_nacimiento)""".format(tipo,lugar)
            
            print(query)

            cursor.execute( query)  
            pacientes= cursor.fetchall()
            headers=["cantidad","año"]
            conexion.close()
            data=self.createQueryDict(pacientes,headers)
            for item in data:
                total=total+item['cantidad']
            status="Success"
            code=200
        except Exception as e:
            data=[]
            detail= str(e)
            status="Error"
        finalData['detail']=detail
        finalData['status']=status
        finalData['data']=data
        finalData['total']=total
        return finalData, code

    def obtenerNacimientos_x_mes(self, año):
        conexion= self.obtener_conexion()
        cursor=conexion.cursor()
        #with conexion.cursor() as cursor:
        detail=""
        finalData={}
        status=""
        code=409
        total=0
        try:
            query="""Select count(*) as total, EXTRACT(MONTH FROM fecha_nacimiento)
                        from bebes_nacidos 
                        where  EXTRACT(YEAR FROM fecha_nacimiento)='{0}' and  EXTRACT(MONTH FROM fecha_nacimiento)=EXTRACT(MONTH FROM fecha_nacimiento) group by EXTRACT(MONTH FROM fecha_nacimiento)""".format(año)
            
            #print(query)

            cursor.execute( query)  
            pacientes= cursor.fetchall()
            headers=["cantidad","mes"]
            conexion.close()
            data=self.createQueryDict(pacientes,headers)
            for item in data:
                total=total+item['cantidad']
            status="Success"
            code=200
        except Exception as e:
            data=[]
            detail= str(e)
            status="Error"
        finalData['detail']=detail
        finalData['status']=status
        finalData['data']=data
        finalData['total']=total
        return finalData, code

    def obtenerNacimientos_x_mes_tipo_año(self, año,tipo,lugar):
        conexion= self.obtener_conexion()
        cursor=conexion.cursor()
        #with conexion.cursor() as cursor:
        detail=""
        finalData={}
        status=""
        code=409
        total=0
        try:
            query="""Select count(*) as total, EXTRACT(MONTH FROM fecha_nacimiento)
                        from bebes_nacidos 
                        where  EXTRACT(YEAR FROM fecha_nacimiento)='{0}' and  EXTRACT(MONTH FROM fecha_nacimiento)=EXTRACT(MONTH FROM fecha_nacimiento) and {1}='{2}' group by EXTRACT(MONTH FROM fecha_nacimiento)""".format(año,tipo,lugar)
            
            #print(query)

            cursor.execute( query)  
            pacientes= cursor.fetchall()
            headers=["cantidad","mes"]
            conexion.close()
            data=self.createQueryDict(pacientes,headers)
            for item in data:
                total=total+item['cantidad']
            status="Success"
            code=200
        except Exception as e:
            data=[]
            detail= str(e)
            status="Error"
        finalData['detail']=detail
        finalData['status']=status
        finalData['data']=data
        finalData['total']=total
        return finalData, code

    def obtenerNacimientos_x_mes_lugar(self, tipo,lugar):
        conexion= self.obtener_conexion()
        cursor=conexion.cursor()
        #with conexion.cursor() as cursor:
        detail=""
        finalData={}
        status=""
        code=409
        total=0
        try:
            query="""Select count(*) as total, EXTRACT(MONTH FROM fecha_nacimiento)
                        from bebes_nacidos 
                        where  EXTRACT(MONTH FROM fecha_nacimiento)=EXTRACT(MONTH FROM fecha_nacimiento) and {0}='{1}' group by EXTRACT(MONTH FROM fecha_nacimiento)""".format(tipo,lugar)
            
            #print(query)

            cursor.execute( query)  
            pacientes= cursor.fetchall()
            headers=["cantidad","mes"]
            conexion.close()
            data=self.createQueryDict(pacientes,headers)
            for item in data:
                total=total+item['cantidad']
            status="Success"
            code=200
        except Exception as e:
            data=[]
            detail= str(e)
            status="Error"
        finalData['detail']=detail
        finalData['status']=status
        finalData['data']=data
        finalData['total']=total
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


    def obtenerPacientes(self):
        conexion= self.obtener_conexion()
        cursor=conexion.cursor()
        #with conexion.cursor() as cursor:
        detail=""
        finalData={}
        status=""
        code=409
        try:
            cursor.execute("""Select count(bebes_nacidos.dpi_mama) as cantidad_hijos, pacientes.id, pacientes.primer_nombre, pacientes.segundo_nombre,
                                pacientes.primer_apellido, pacientes.segundo_apellido, pacientes.dpi,
                                TO_CHAR(pacientes.fecha_nacimiento , 'yyyy-MM-dd') as fecha_nacimiento ,
                                TRUNC( ( TO_NUMBER(TO_CHAR(SYSDATE,'YYYYMMDD')) -  TO_NUMBER(TO_CHAR(pacientes.fecha_nacimiento,'YYYYMMDD') ) ) / 10000) as edad_actual,
                                pacientes.pais, pacientes.departamento, pacientes.municipio, pacientes.direccion
                                
                                from pacientes left Join bebes_nacidos 
                                on pacientes.dpi= bebes_nacidos.dpi_mama
                                group by pacientes.id, pacientes.primer_nombre, pacientes.segundo_nombre, pacientes.primer_apellido, pacientes.segundo_apellido, 
pacientes.dpi, TO_CHAR(pacientes.fecha_nacimiento , 'yyyy-MM-dd'), TRUNC( ( TO_NUMBER(TO_CHAR(SYSDATE,'YYYYMMDD')) - TO_NUMBER(TO_CHAR(pacientes.fecha_nacimiento,'YYYYMMDD') ) ) / 10000), pacientes.pais, pacientes.departamento, 
pacientes.municipio, pacientes.direccion
                                ORDER BY pacientes.id ASC
                              """)
            pacientes= cursor.fetchall()
            headers=[i[0].lower() for i in cursor.description]
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