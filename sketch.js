
var myVideo;
var vScale = 10;

let prevPixels = [];

let threshHold = 50;
function setup() {
  
  // create a p5 canvas at the dimensions of my webcam
  createCanvas(1280, 960);
  pixelDensity(1);
  // create a p5 webcam, then hide it
  myVideo = createCapture(VIDEO);
  myVideo.size(width/vScale,height/vScale); // see p5 documentation for width, height
  myVideo.hide(); // hide the webcam which appears below the canvas by default
}

function draw() {

  background(51);
  myVideo.loadPixels();
  const currentPixels = myVideo.pixels;

  for (let y = 0; y < myVideo.height; y++) {
    for (let x =0; x < myVideo.width; x++) { 
      // const i = (y*width+x) * 4;
      var i = (myVideo.width - x + 1 + (y * myVideo.width)) * 4;

      const diffR = abs(currentPixels[i+0]-prevPixels[i+0]);
      const diffG = abs(currentPixels[i+1]-prevPixels[i+1]);
      const diffB = abs(currentPixels[i+2]-prevPixels[i+2]);

      // set past pixels to current pixels
      // do this before we alter the current pixels in the coming lines of code
      prevPixels[i+0] = currentPixels[i+0];
      prevPixels[i+1] = currentPixels[i+1];
      prevPixels[i+2] = currentPixels[i+2];

      // get the average difference for the pixel from the 3 color channels
      const avgDiff = (diffR + diffG+ diffB)/3;


       // if the difference between frames is less than the threshold value
       if (avgDiff < threshHold) { 
        // turn the current pixel black
        currentPixels[i+0] = prevPixels[i];
        currentPixels[i+1] = 0;
        currentPixels[i+2] = 0;
      } else { 
        // otherwise, turn it a nice red 
        // comment these three line out to show natural color of image
        currentPixels[i+0] = 255;
        currentPixels[i+100] = 255;
        currentPixels[i-100] = 255;
      }




      var r1 = myVideo.pixels[i+1];
      var r2 = myVideo.pixels[i+2];
      var r3 = myVideo.pixels[i+30];

      var rgbAvg = (r1+r2+r3)/3;

      if (rgbAvg >100) {

        var width = map(rgbAvg, 0, 255, 0, vScale*2);
      }
    else {
      var width = map(rgbAvg, 0, 255, 0, vScale);

    }
      noStroke();
      fill(255);
      rectMode(CENTER);
  
      

      rect(x * vScale, y *vScale, width, width);


    }

  }
}