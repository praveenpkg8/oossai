import tkinter as tk
import pyaudio
import wave

CHUNK = 1024 
FORMAT = pyaudio.paInt16
CHANNELS = 2
RATE = 44100
SAMPLE_WIDTH = 2
RECORD_SECONDS = 5


p = pyaudio.PyAudio()

class Application(tk.Frame):
    def __init__(self, master=None):
        super().__init__(master)
        self.master = master
        self.pack()
        self.create_widgets()

    def create_widgets(self):
        self.hi_there = tk.Button(self)
        self.hi_there["text"] = "Hello World\n(click me)"
        self.hi_there["command"] = self.say_hi
        self.hi_there.pack(side="top")

        self.quit = tk.Button(self, text="QUIT", fg="red",
                              command=self.master.destroy)
        self.quit.pack(side="bottom")

    def say_hi(self):
        audio_bytes = b''
        i = 1
        stream = p.open(
                format=FORMAT,
                channels=CHANNELS,
                rate=RATE,
                input=True,
                frames_per_buffer=CHUNK
            )
        frames = []
        while True:
            data = stream.read(CHUNK)
            print(data)
            i += 1
            frames.append(data)
            print(i)
            if i % 500 == 0:
                with wave.open('./sample.wav', 'wb') as wf:
                    wf.setnchannels(CHANNELS)
                    wf.setsampwidth(p.get_sample_size(FORMAT))
                    wf.setframerate(RATE)
                    wf.writeframes(b''.join(frames))
                break
        print("hi there, everyone!")

root = tk.Tk()
app = Application(master=root)
app.mainloop()