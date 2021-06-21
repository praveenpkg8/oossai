import pyautogui
import ctypes
from flask import Flask, render_template
from flask_socketio import SocketIO
from server import audio_byte_to_text


app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app, cors_allowed_origins="*")

@socketio.on('message')
def userAdded(message):
    audio_bytes = message.get('audio')
    print(audio_bytes)
    text = audio_byte_to_text(audio_bytes)
    pyautogui.typewrite(text)
    # sio.emit('rec_message', text)


@socketio.on('mouse')
def change_speed(data):
    set_mouse_speed = data.get('speed')
    ctypes.windll.user32.SystemParametersInfoA(set_mouse_speed,0,10, 0)

@app.route("/test")
def hello_word():
    return "Hello World"


if __name__ == '__main__':
    socketio.run(app)