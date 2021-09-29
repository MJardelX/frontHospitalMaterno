from contollers.postgresql_controller import PostgreSQL_Controller
from contollers.mysql_controler import MySql_Controller
from contollers.oracle_controller import Oracle_Controller



def getDB(type):
    db=any

    if type=="postgresql":
        db= PostgreSQL_Controller()
        #print(database)
    elif type=="mysql":
        db=MySql_Controller()
    elif type=="oracle":
        db=Oracle_Controller()


    return db