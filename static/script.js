console.log('hiii')

let video,canvas;


function setup(){
    console.log("inside setup");
    canvas = createCanvas(640, 480);
    //Place cavas inside desired DOM element
	canvas.parent('jumbo-canvas');
    background(255);
    video = createCapture(VIDEO);
    video.hide()
    faceapi.load
    faceapi.loadSsdMobilenetv1Model('http://127.0.0.1:8888/static/models/')
    faceapi.loadFaceExpressionModel('http://127.0.0.1:8888/static/models/');

}

function draw(){
    // image(video, 0, 0);
    console.log('whatuppp');
    faceapi.detectAllFaces(video.elt).withFaceExpressions()
    .then((allFaces) => {
        console.log(allFaces);
        if (allFaces.length > 0){
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
        }
        
    },
    (onFailure) => console.log(onFailure));


}

// Promise.all([
//     faceapi.loadSsdMobilenetv1Model('models'),
//     faceapi.loadFaceExpressionModel('models'),
// ])
//   .then(startVideo)
//   .catch(err => console.error(err));

// //Fetching Video frame from HTML
// const video = document.getElementById('video');
// //Requesting permission from chrome to access webcam
// navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
// //Fuction which starts streaming og webcam data and creates stream object
// function startVideo() {
//   console.log("access");
//   navigator.getUserMedia(
//     {
//       video: {}
//     },
//     stream => video.srcObject = stream,
//     err => console.error(err)
//   )
// }

// video.addEventListener('play', () => {
// //Creating a canvas to add overlay image
//   const canvas = faceapi.createCanvasFromMedia(video);
//   document.body.append(canvas);
//   const displaySize = { width: video.width, height: video.height };
//   // faceapi.matchDimensions(canvas, displaySize);

// //Asynchronusly get detections from the video Stream
//   setInterval(async () => {
//     const detections = await faceapi
//       .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()) //Face Detectors
//       .withFaceExpressions();  //Get Face Expression confidence values
// // Resize and Display the detections on the video frame using canvas
// //Printing the detection coordinates
//     console.log(detections);
//   }, 100)
// })