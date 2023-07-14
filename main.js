song = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWrist = 0;
scoreRightWrist = 0;

function preload() {
    song = loadSound("music.mp3");
}

function setup() {
    canvas = createCanvas(600, 350);
    canvas.position(385, 200);


    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotResult);
}

function modelLoaded() {
    console.log("PoseNet is initialized");
}

function gotResult(results) {
    if (results.length > 0) {
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreLeftWrist = " + scoreLeftWrist);
        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log("Right Wrist Score = " + scoreRightWrist);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("Left Wrist x=" + leftWristX + " and y=" + leftWristY);
        console.log("Right Wrist x=" + rightWristX + " and y=" + rightWristY);

    }
}

function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function draw() {
    image(video, 0, 0, 600, 350);

    fill('#000000');
    stroke('#0000FF');

    if (scoreRightWrist > 0.2) {

        circle(rightWristX, rightWristY, 20);

        if (rightWristY > 0 && rightWristY <= 100) {
            document.getElementById("speed").innerHTML = "Song Speed = 0.5x";
            song.rate(0.5);
        } else if (rightWristY > 100 && rightWristY <= 200) {
            document.getElementById("speed").innerHTML = "Song Speed = 1.0x";
            song.rate(1.0);
        } else if (rightWristY > 200 && rightWristY <= 300) {
            document.getElementById("speed").innerHTML = "Song Speed = 1.5x";
            song.rate(1.5);
        } else if (rightWristY > 300 && rightWristY <= 400) {
            document.getElementById("speed").innerHTML = "Song Speed = 2.0x";
            song.rate(2.0);
        } else if (rightWristY > 400 && rightWristY <= 500) {
            document.getElementById("speed").innerHTML = "Song Speed = 2.5x";
            song.rate(2.5);
        }
    }


    if (scoreLeftWrist > 0.2) {
        circle(leftWristX, leftWristY, 20);

        inNumberLeftWristY = Number(leftWristY);
        round = floor(inNumberLeftWristY);
        decimal_value = round / 500;
        volume = decimal_value;
        song.setVolume(volume)
        document.getElementById("volume").innerHTML = "Volume - " + volume;
    }
}