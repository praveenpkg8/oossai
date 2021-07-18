package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"

	"github.com/go-vgo/robotgo"
)

type SpeechResponse struct {
	RecognitionStatus string
	DisplayText       string
	Offset            int
	Duration          int
}

func speechToText() string {
	client := &http.Client{}
	data, _ := os.Open("./output.wav")

	req, err := http.NewRequest("POST", "https://centralindia.stt.speech.microsoft.com/speech/recognition/conversation/cognitiveservices/v1?language=en-US", data)
	if err != nil {
		log.Fatal(err)
	}
	req.Header.Set("Ocp-Apim-Subscription-Key", "3b4588130fc04736820ab2306bfd24ce")
	req.Header.Set("Content-Type", "audio/wav")
	resp, err := client.Do(req)
	if err != nil {
		log.Fatal(err)
	}
	bodyText, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		log.Fatal(err)
	}
	var sampleResponse SpeechResponse
	json.Unmarshal(bodyText, &sampleResponse)
	fmt.Printf("%s\n", sampleResponse.RecognitionStatus)
	return sampleResponse.DisplayText
}

func typeWrite(text string) {
	robotgo.TypeStr(text)

	// robotgo.KeyTap("enter")
	// robotgo.TypeString("en")
	// robotgo.KeyTap("i", "alt", "command")

	// arr := []string{"alt", "command"}
	// robotgo.KeyTap("i", arr)

	// robotgo.WriteAll("Test")
	// text, err := robotgo.ReadAll()
	// if err == nil {
	// 	fmt.Println(text)
	// }
}

func convertSpeectToText() {
	var recongnizedText string = speechToText()
	typeWrite(recongnizedText)
}
