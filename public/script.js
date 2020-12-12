console.log('hiii')

let video,canvas;


function setup(){
    canvas = createCanvas(640, 480);
    //Place cavas inside desired DOM element
	canvas.parent('jumbo-canvas');
    background(255);
    video = createCapture(VIDEO);
    video.hide()
    faceapi.load
    faceapi.loadSsdMobilenetv1Model('/models')
    faceapi.loadFaceExpressionModel('/models');

}

function draw(){
    // image(video, 0, 0);
    console.log('whatuppp');
    faceapi.detectAllFaces(video.elt).withFaceExpressions()
    .then((allFaces) => {
        
        background(255);
        image(video, 640, 0, -640, 480);
        let moods = allFaces[0]['expressions']
        console.log(moods);
        //Get value/per of each moods
        let angry_per = moods['angry'];
        let disgusted_per = moods['disgusted'];
        let happy_per = moods['happy'];
        let neutral_per = moods['neutral'];
        let sad_per = moods['sad'];
        let surprised_per = moods['surprised']
        //get highest value of mood
        let highest_val_mood = Object.keys(moods).reduce((a, b) => moods[a] > moods[b] ? a : b)
        $('#mood_result').text(highest_val_mood);

    });


}