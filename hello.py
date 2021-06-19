import sys
with open("./abc.txt", 'wb') as _file:
    _file.write(b"hello world")
    
print('Hello from Python!')
sys.stdout.flush()