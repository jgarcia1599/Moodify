console.log('hiii')

let video;


function setup(){
    createCanvas(640, 480);
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
        console.log(allFaces);

    });


}