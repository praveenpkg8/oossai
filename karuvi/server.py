import socket
import os
import wave
# import pyaudio
import shutil
from traceback import print_exc


from speech_text import convert_byte_to_text

# Socket
HOST = socket.gethostbyname('localhost')
PORT = 5000
print(HOST)

# Audio
CHANNELS = 1
RATE = 44100
SAMPLE_WIDTH = 2
# FORMAT = pyaudio.paInt16

WAVE_OUTPUT_FILENAME = "output.wav"
frames = []
# p = pyaudio.PyAudio()


def write_file(file_path, data):
    with wave.open(file_path, 'wb') as wf:
        wf.setnchannels(CHANNELS)
        wf.setsampwidth(SAMPLE_WIDTH)
        wf.setframerate(RATE)
        wf.writeframesraw(data)


def convert_file_to_text(file_path):
    with open(file_path, 'rb') as read_file:
        _text = convert_byte_to_text(read_file)
    return _text


def bootstrapping_process():
    try:
        shutil.rmtree('./audio_chunks')
        os.mkdir('./audio_chunks')
    except FileExistsError as e:
        print(e)
    except FileNotFoundError as e:
        print(e)


# def establish_connection():
#     with socket.socket() as server_socket:
#         server_socket.bind((HOST, PORT))
#         server_socket.listen(1)
#         conn, address = server_socket.accept()
#         print("Connection from " + address[0] + ":" + str(address[1]))
#         i = 1
#         file_iterator = 1
#         bootstrapping_process()
#         audio_bytes = b''
#         while True:
#             try:
#                 data = conn.recv(2048)
#                 if not data:
#                     continue
#                     # print(data)
#                 if i % 100 == 0:
#                     print('entering this part')
#                     file_name = f'./audio_chunks/chunk{file_iterator}.wav'
#                     write_file(file_name, audio_bytes)
#                     audio_bytes = b''
#                     text = convert_file_to_text(file_name)
#                     print(text)
#                     os.remove(file_name)
#                     file_iterator += 1
#                     conn.send(text.encode('utf-8'))
#                 audio_bytes += data
#                 frames.append(data)
#                 i += 1

#             except speech_recognition.UnknownValueError:
#                 continue

#             except socket.error as error_message:
#                 print('error happening')
#                 print(print_exc())
#                 print(error_message)
#                 break


def audio_byte_to_text(audio_bytes):
            try:
                file_name = './audio_chunks/sample.wav'
                write_file(file_name, audio_bytes)
                text = convert_byte_to_text(file_name)
                print(text)
                os.remove(file_name)
                return text

            # except speech_recognition.UnknownValueError:
            #     print("Error Happening")

            except socket.error as error_message:
                print('error happening')
                print(print_exc())
                print(error_message)
