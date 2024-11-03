import os
import threading

def start_mongodb():
    os.system("mongod")
def start_frontend():
    os.system("cd front-end && npm run dev")
def start_backend():
    os.system("clear")
    os.system("cd back-end && npm run dev")
    
t1 = threading.Thread(target=start_mongodb)
t2 = threading.Thread(target=start_frontend)
#t3 = threading.Thread(target=start_backend)
t1.start()
t2.start()
#t3.start()