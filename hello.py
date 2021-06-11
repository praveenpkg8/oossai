import sys
with open("./abc.txt", 'wb') as _file:
    _file.write("hello world")
    
print('Hello from Python!')
sys.stdout.flush()