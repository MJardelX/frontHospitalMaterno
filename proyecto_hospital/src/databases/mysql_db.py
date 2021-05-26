import pymysql

def obtener_conexion():
    return pymysql.connect(host='localhost',user='proyecto_final',password='mjardel10', db='Hospital Materno')
