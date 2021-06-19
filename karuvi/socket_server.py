import socketio
import eventlet
import wave
import random
import pyautogui


import sys

print(sys.path)


from io import BytesIO
# from pydub import AudioSegment
from server import audio_byte_to_text



CHANNELS = 1
RATE = 44100
SAMPLE_WIDTH = 2


sio = socketio.Server(cors_allowed_origins='*')
app = socketio.WSGIApp(sio)

# sio.attach(app)

i = 1
file_iterator = 1

@sio.event
def connect(sid, environ):
    print("connect ", sid)

@sio.event
def chat_message(sid, data):
    print("message ", data)

@sio.on('message')
def userAdded(sid, message):
    audio_bytes = message.get('audio')
    text = audio_byte_to_text(audio_bytes)
    pyautogui.typewrite(text)
    # sio.emit('rec_message', text)


@sio.on('text')
def sample_text(sid, message):
    text = message.get('text')
    sio.emit('re_text', "sample message")
    print(text)



def write_file(file_path, data):
    with wave.open(file_path, 'wb') as wf:
        wf.setnchannels(CHANNELS)
        wf.setsampwidth(SAMPLE_WIDTH)
        wf.setframerate(RATE)
        wf.writeframesraw(data)







if __name__ == '__main__':
    # web.run_app(app)
    eventlet.wsgi.server(eventlet.listen(('', 5000)), app)
