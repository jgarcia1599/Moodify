console.log('hiii')
let captured = false;
let video,canvas;
var mood_val = 0.5;

function setup(){
    console.log("inside setup");
    canvas = createCanvas(640, 480);
    //Place cavas inside desired DOM element
	canvas.parent('jumbo-canvas');
    background(255);
    video = createCapture(VIDEO);
    video.hide()
    faceapi.load
    faceapi.loadSsdMobilenetv1Model('http://localhost:8888/static/models/')
    faceapi.loadFaceExpressionModel('http://localhost:8888/static/models/');
    $('#buttonstyle').hide();



}

function draw(){
    // image(video, 0, 0);
    console.log('whatuppp');
        faceapi.detectAllFaces(video.elt).withFaceExpressions()
        .then((allFaces) => {
            // console.log(captured);
            

            if (allFaces.length > 0){
                $('#waiting').hide()
                $('#buttonstyle').show()
                background(255);
                image(video, 640, 0, -640, 480);
                let moods = allFaces[0]['expressions']
                // console.log(moods);
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


                if (highest_val_mood === 'angry')   mood_val = 0.0;

                else if (highest_val_mood === 'disgusted')  mood_val = 0.2

                else if (highest_val_mood === 'happy')  mood_val = 1.0;

                else if (highest_val_mood === 'sad')    mood_val = 0.1;

                else if (highest_val_mood === 'surprised')  mood_val = 0.7;
            }
            
        },
        (onFailure) => console.log(onFailure));



}


function makespotifyrequest(){

    console.log("Make Spotify Request; mood val: ",mood_val)
    document.getElementById("loadercontainer").style.display = "flex";
    document.getElementById("jumbo-canvas").style.display = "none";
    fetch('http://localhost:8888/moodify',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({'mood': mood_val})
    }).then(function(response){
        response.json().then(function(data){

            url = data['result']
            window.location = window.origin + "/results" +'?' + 'url='+url

            console.log(data)
        })
        // if (response.status== 200){
        //     window.location = window.origin + "/results" +'?' + 'url='+'sample'

        // }
    });
}

