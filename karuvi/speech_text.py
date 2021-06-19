# import speech_recognition as sr
import azure.cognitiveservices.speech as speechsdk
speech_config = speechsdk.SpeechConfig(subscription="3b4588130fc04736820ab2306bfd24ce", region="centralindia")

def convert_byte_to_text(file_name):
    audio_input = speechsdk.AudioConfig(filename=file_name)
    speech_recognizer = speechsdk.SpeechRecognizer(speech_config=speech_config, audio_config=audio_input)
    result = speech_recognizer.recognize_once_async().get()
    return result.text

def convert_byte_to_textv1(file_obj):
    r = sr.Recognizer()
    with sr.AudioFile(file_obj) as source:
        audio = r.record(source)
        text = r.recognize_google(audio)
    return text


def continuous_byte_to_text():
    pass