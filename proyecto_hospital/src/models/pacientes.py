


class Paciente:
    
    def __init__(self, primer_n, primer_a, dpi, fecha_nacimiento, departamento, municipio, direccion, pais='Guatemala', id_paciente='', segundo_n=None, segundo_a=None ):
        self.id_paciente:id_paciente
        self.primer_nombre:primer_n
        self.segundo_nombre:segundo_n
        self.primer_apellido:primer_a
        self.segundo_apellido:segundo_a
        self.dpi:dpi
        self.fecha_nacimiento:fecha_nacimiento
        self.pais:pais
        self.departamento:departamento
        self.municipio:municipio
        self.direccion:direccion


