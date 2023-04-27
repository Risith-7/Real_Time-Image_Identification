function setup(){
    canvas = createCanvas(300, 300)
    canvas.center()
    video = createCapture(VIDEO)
    video.hide()
    model = ml5.imageClassifier("MobileNet", modelLoaded)
}

function draw(){
    image(video, 0, 0, 300, 300)
    model.classify(video, showResult)
}

function modelLoaded(){
    console.log("Model is Loaded!")
}

previous_result = ""

function showResult(error, results){
    if(error){
        console.log(error)
    }
    else{
        if(results[0].confidence > 0.5 && previous_result != results[0].label){
            console.log(results)
            previous_result = results[0].label
            synth = window.speechSynthesis
            text = "The object identified is " + results[0].label
            audio = new SpeechSynthesisUtterance(text)
            synth.speak(audio)
            document.getElementById("object_p").innerHTML = results[0].label
            document.getElementById("accuracy_p").innerHTML = (results[0].confidence*100).toFixed(2)
        }
    }
}

