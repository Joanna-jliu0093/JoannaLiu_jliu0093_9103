let noiseOffsets = []; // Store noise offsets for yellow lines
let lineX = []; 
let speed = [];
let lineCount = 16 // for vertical lines
let rotationOffsets = []; // Store rotation offsets for each blue boxes
let backgroundMusic;

function preload() {
  backgroundMusic = loadSound('assets/backgroundmusic.mp3');
}

function setup() {
  createCanvas(680, 680);

  // Initialize noise offsets
  for (let i = 0; i < 18; i++) noiseOffsets[i] = random(100);
  // Initialize vertical line positions and speeds
  let xPositions = [0.032, 0.07, 0.125, 0.233, 0.549, 0.59, 0.85, 0.89, 0.93, 0.97, 0.59, 0.661, 0.93, 0.93, 0.185, 0.445];
  for (let i = 0; i < lineCount; i++) {
       lineX[i] = xPositions[i] * width; // initial x position
       speed[i] = random(1, 3); //Random speed
  }
  // Initialise rotation offsets
  for (let i = 0; i < 54; i++) rotationOffsets[i] = random(0.05);

  //playing the background music and set it to loop
  if (!backgroundMusic.isPlaying()) {
     backgroundMusic.loop();
  }

}

function draw() {
  background(242, 242, 242);
  stroke(231, 206, 52);
  strokeCap(SQUARE)

  drawYellowLines();
  drawRedBoxes();
  drawBlueBoxes();
  drawGrayBoxes();
  otherBox()

}

function drawYellowLines() {

  // Full Length Horizontal Lines
  let yPositions = [0.034, 0.17, 0.36, 0.445, 0.575, 0.64, 0.866, 0.958, 0.70, 0.798, 0.896, 0.74, 0.813, 0.74, 0.075, 0.298, 0.818, 0.51];
  let horizontalStrokes = [14, 16, 15, 15, 15, 15, 15, 13, 15, 15, 16, 15, 18, 25, 25, 45, 53, 38];
  let xStarts = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.07, 0.85, 0.85, 0.13, 0.13, 0.13, 0.85];
  let xLength = [1, 1, 1, 1, 1, 1, 1, 1, 0.07, 0.07, 0.07, 0.55, 0.97, 0.97, 0.233, 0.233, 0.233, 0.97];
  let noiseSpeed = 0.015; // Small increment for smooth motion


  for (let i = 0; i < yPositions.length; i++) {

    let baseY = 680 * yPositions[i];
    let noiseValue = noise(noiseOffsets[i]); // Sample noise with a slight offset per line
    let floatingY = baseY + map(noiseValue, 0, 1, -70, 70); // Map noise to a small range for gentle movement
    
    strokeWeight(horizontalStrokes[i]);
    line(xStarts[i] * 680, floatingY, 680 * xLength[i], floatingY);

    noiseOffsets[i] += noiseSpeed;// Increment the noise offset slowly for smooth floating motion

  }

  // Full Length Vertical lines
  let xPositions = [0.032, 0.07, 0.125, 0.233, 0.549, 0.59, 0.85, 0.89, 0.93, 0.97, 0.59, 0.661, 0.93, 0.93, 0.185, 0.445];
  let verticalStrokes = [15, 15, 15, 15, 17, 15, 15, 17, 15, 17, 15, 17, 15, 15, 30, 50];
  let verticalHeight = [0.355, 1, 1, 1, 1, 0.355, 1, 0.36, 0.12, 1, 1, 0.65, 0.45, 0.82, 0.445, 0.575];
  let yStarts = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.45, 0.45, 0.178, 0.63, 0.36, 0.36]

  for (let i = 0; i < xPositions.length; i++) {

      strokeWeight(verticalStrokes[i]);

      line(lineX[i] , yStarts[i] * 680, lineX[i] , 680 * verticalHeight[i]);

        lineX[i] += speed[i];
        
      // Reverse direction at the edges
      if (lineX[i] >= width || lineX[i] <= 0) {
          speed[i] *= -1;
      }

  }
}

function drawRedBoxes() {
  noStroke();

  let RedBoxesColour = [152, 51, 43];
  let threshold = 200; // Distance threshold for effect
  let maxScale = 3; // Maximum scale factor for size increase

  let horizontalRedBoxesWidth = [
      15, 15, 16, 15, 15,
      15, 15, 15, 17, 17, 17,
      15, 15, 15, 13,
      15, 15, 15, 17, 15, 15, 17,
      15, 15, 15, 17, 19, 17, 17,
      14, 15, 19, 14, 15, 15, 15, 17,
      17, 17, 15, 17, 15, 17,
      15, 15, 17, 15, 15,
      15,
      15, 15, 16, 13,
      15, 14, 14, 15, 16, 16, 15,
      17,
      15, 15, 15, 15, 17,


  ];
  let horizontalRedBoxesHeight = [
      30, 30, 30, 30, 30,
      15, 15, 12, 15, 15, 15,
      17, 17, 17, 17,
      15, 15, 15, 20, 12, 15, 15,
      15, 15, 15, 15, 15, 15, 15,
      15, 15, 15, 15, 15, 15, 15, 15,
      15, 15, 15, 15, 15, 15,
      15, 15, 15, 15, 15,
      13,
      14, 15, 15, 15,
      15, 15, 15, 15, 15, 15, 15,
      15,
      13, 13, 13, 13, 13

  ]
  let xStarts = [
      0.07, 0.233, 0.549, 0.89, 0.97,
      0.07, 0.549, 0.59, 0.89, 0.97, 0.97,
      0.032, 0.21, 0.59, 0.91,
      0.032, 0.125, 0.233, 0.549, 0.59, 0.85, 0.97,
      0.032, 0.146, 0.392, 0.549, 0.659, 0.753, 0.89,
      0.026, 0.125, 0.3, 0.398, 0.639, 0.85, 0.93, 0.97,
      0.355, 0.413, 0.479, 0.661, 0.85, 0.97,
      0.07, 0.233, 0.42, 0.93, 0.99,
      0.07,
      0.07, 0.125, 0.44, 0.57,
      0.187, 0.44, 0.5, 0.59, 0.68, 0.85, 0.97,
      0.04,
      0.07, 0.186, 0.625, 0.9, 0.97,


  ];
  let yStarts = [
      0, 0, 0, 0, 0,
      0.1, 0.117, 0.067, 0.107, 0.055, 0.107,
      0.17, 0.17, 0.17, 0.17,
      0.276, 0.276, 0.276, 0.23, 0.23, 0.23, 0.308,
      0.36, 0.36, 0.36, 0.36, 0.36, 0.36, 0.36,
      0.445, 0.445, 0.445, 0.445, 0.445, 0.445, 0.445, 0.445,
      0.575, 0.575, 0.575, 0.575, 0.575, 0.575,
      0.64, 0.64, 0.64, 0.64, 0.64,
      0.7,
      0.74, 0.74, 0.74, 0.74,
      0.866, 0.866, 0.866, 0.866, 0.866, 0.866, 0.866,
      0.896,
      0.958, 0.958, 0.958, 0.958, 0.958,

  ];


  for (let i = 0; i < yStarts.length; i++) {
    let xCenter = 680 * xStarts[i];
    let yCenter = 680 * yStarts[i];

    // Calculate distance from mouse to rectangle center
    let distance = dist(mouseX, mouseY, xCenter, yCenter);

    // Determine scaling factor based on distance
    let scaleFactor = 1;
    if (distance < threshold) {
        scaleFactor = map(distance, 0, threshold, maxScale, 1); // Scale down as distance increases
    }

    //Adjust width and height based on scale factor
    let rectWidth = horizontalRedBoxesWidth[i] * scaleFactor;
    let rectHeight = horizontalRedBoxesHeight[i] * scaleFactor;


    // Place small boxes at the center of each line
    fill(RedBoxesColour);
    rect(xCenter - rectWidth / 2, yCenter - rectHeight / 2, rectWidth, rectHeight);
  }


  let verticalRedBoxesWidth = [
      30, 45, 15, 60, 50, 43, 40, 58, 15,
      15, 15,
      15,
      15, 15,
      17, 17, 17, 17, 17,
      15, 15,
      17,
      15,
      17, 17,
  ];
  let verticalRedBoxesHeight = [
      80, 60, 15, 45, 30, 40, 28, 100, 39,
      15, 15,
      13,
      13, 13,
      13, 13, 13, 13, 13,
      13, 13,
      15,
      13,
      13, 15,
  ];
  let xPositions = [
      0.18, 0.29, 0.233, 0.180, 0.486, 0.91, 0.889, 0.743, 0.912,
      0.07, 0.07,
      0.125,
      0.233, 0.233,
      0.549, 0.549, 0.549, 0.549, 0.549,
      0.59, 0.59,
      0.662,
      0.85,
      0.97, 0.97,

  ];
  let yPositions = [
      0.1, 0.088, 0.276, 0.53, 0.971, 0.235, 0.780, 0.529, 0.51,
      0.512, 0.79,
      0.816,
      0.788, 0.897,
      0.5, 0.618, 0.66, 0.846, 0.937,
      0.551, 0.784,
      0.616,
      0.709,
      0.71, 0.82,
  ];

  for (let i = 0; i < xPositions.length; i++) {
    let xCenter = 680 * xPositions[i];
    let yCenter = 680 * yPositions[i];

    // Calculate distance from mouse to rectangle center
    let distance = dist(mouseX, mouseY, xCenter, yCenter);

    // Determine scaling factor based on distance
    let scaleFactor = 1;
    if (distance < threshold) {
        scaleFactor = map(distance, 0, threshold, maxScale, 1); // Scale down as distance increases
    }

    //Adjust width and height based on scale factor
    let rectWidth = verticalRedBoxesWidth[i] * scaleFactor;
    let rectHeight = verticalRedBoxesHeight[i] * scaleFactor;

    // Place small boxes at the center of each line
    fill(RedBoxesColour);
    rect(xCenter - rectWidth / 2, yCenter - rectHeight / 2, rectWidth, rectHeight);
  }


}

function drawBlueBoxes() {
  noStroke();
  let BlueBoxesColour = [67, 104, 186];

  let horizontalBlueBoxesWidth = [
      14, 17, 14, 14,
      14, 16, 17, 15, 17,
      15, 15, 17, 15, 15, 15, 13,
      15, 15, 15, 16,
      15, 15, 15, 15, 15, 15,
      15, 17, 17, 17, 15, 15,
      15,
      15, 16, 15,
      15,
      15, 15, 15, 15, 14, 17, 17, 16, 16,
      15, 15, 15, 12, 15, 15, 15,
  ]
  let horizontalBlueBoxesHeight = [
      14, 14, 14, 14,
      15, 15, 16, 17, 17,
      15, 15, 15, 15, 15, 15, 15,
      15, 15, 15, 15,
      15, 15, 15, 15, 15, 15,
      15, 15, 15, 15, 15, 15,
      15,
      15, 15, 15,
      15,
      15, 15, 15, 15, 15, 15, 15, 15, 15,
      13, 13, 13, 13, 13, 13, 13,
  ]
  let xStarts = [
      0.032, 0.16, 0.85, 0.93,
      0.125, 0.3, 0.549, 0.850, 0.97,
      0.07, 0.233, 0.34, 0.49, 0.59, 0.85, 0.95,
      0.07, 0.233, 0.49, 0.775,
      0.07, 0.125, 0.233, 0.71, 0.78, 0.93,
      0.125, 0.36, 0.49, 0.72, 0.775, 0.85,
      0.034,
      0.233, 0.38, 0.49,
      0.035,
      0.07, 0.125, 0.233, 0.4, 0.47, 0.549, 0.63, 0.73, 0.9,
      0.125, 0.125, 0.4, 0.44, 0.67, 0.72, 0.85,
  ]
  let yStarts = [
      0.034, 0.034, 0.034, 0.034,
      0.17, 0.17, 0.17, 0.17, 0.17,
      0.36, 0.36, 0.36, 0.36, 0.36, 0.36, 0.36,
      0.445, 0.445, 0.445, 0.445,
      0.575, 0.575, 0.575, 0.575, 0.575, 0.575,
      0.64, 0.64, 0.64, 0.64, 0.64, 0.64,
      0.7,
      0.74, 0.74, 0.74,
      0.798,
      0.866, 0.866, 0.866, 0.866, 0.866, 0.866, 0.866, 0.866, 0.866,
      0.958, 0.958, 0.958, 0.958, 0.958, 0.958, 0.958,
  ]
  for (let i = 0; i < yStarts.length; i++) {
      // Place small boxes at the center of each line
      fill(BlueBoxesColour);

      // Make the setting more clean and simple
      let centerX = 680 * xStarts[i];
      let centerY = 680 * yStarts[i];
      let width = horizontalBlueBoxesWidth[i];
      let height = horizontalBlueBoxesHeight[i];
      
      push();//Save the current drawing state

      // Move the coordinate system to the triangle's center and apply random rotation
      translate(centerX, centerY);

      //Apply random rotation
      rotate(rotationOffsets[i] * TWO_PI);

      rectMode(CENTER);
      rect(0, 0, width, height); 
        
      pop();// Restore the previuos drawing state

      rotationOffsets[i] += 0.008;// Update for slight rotation over time
  }


  let verticalBlueBoxesWidth = [
      40, 65, 37, 40, 38, 50,
      15, 15,
      15, 15, 15, 15, 15, 15,
      15, 15, 15,
      15, 17, 17, 15,
      15, 15, 15,
      15, 15, 15, 15, 15,
      15, 17,
      15,
      15, 15, 15,
  ];
  let verticalBlueBoxesHeight = [
      35, 113, 40, 35, 22, 58,
      15, 15,
      15, 15, 15, 15, 13, 13,
      15, 13, 14,
      15, 15, 15, 15,
      15, 15, 15,
      15, 15, 15, 15, 15,
      15, 15,
      15,
      15, 15, 15,
  ];
  let xPositions = [
      0.107, 0.701, 0.108, 0.891, 0.931, 0.321,
      0.032, 0.032,
      0.125, 0.125, 0.125, 0.125, 0.125, 0.125,
      0.233, 0.233, 0.233,
      0.549, 0.549, 0.549, 0.549,
      0.59, 0.59, 0.59,
      0.85, 0.85, 0.85, 0.85, 0.85,
      0.89, 0.89,
      0.93,
      0.97, 0.97, 0.97,
  ];
  let yPositions = [
      0.225, 0.265, 0.699, 0.696, 0.126, 0.52,
      0.104, 0.222,
      0.101, 0.34, 0.384, 0.512, 0.784, 0.896,
      0.1, 0.147, 0.224,
      0.099, 0.315, 0.396, 0.785,
      0.5, 0.66, 0.934,
      0.121, 0.309, 0.504, 0.747, 0.81,
      0.052, 0.309,
      0.747,
      0.234, 0.504, 0.747,
  ];

  for (let i = 0; i < xPositions.length; i++) {
      // Place small boxes at the center of each line
      fill(BlueBoxesColour);

      //centre of the rectangles
      let centerX = 680 * xPositions[i];
      let centerY = 680 * yPositions[i];
      let width = verticalBlueBoxesWidth[i];
      let height = verticalBlueBoxesHeight[i];

      push();//Save the current drawing state

      // Move the coordinate system to the rectangles center and apply random rotation
      translate(centerX, centerY);

      //Apply random rotation
      rotate(rotationOffsets[i] * -TWO_PI); // rotate in reverse direction

      rectMode(CENTER);
      rect(0, 0, width, height); 
      
      pop();// Restore the previuos drawing state

      rotationOffsets[i] += 0.008;

  }
}

function drawGrayBoxes() {
  noStroke();
  let GrayBoxesColour = [223, 224, 218];
  let horizontalGrayBoxesWidth = [
      17, 17, 16, 14, 15, 20, 15, 15, 14, 14,
      28, 13, 16, 17, 15, 15, 12, 12, 12,
      13, 10, 17, 14, 14,
      15, 16, 13, 30, 48, 15, 15, 17, 17, 15,
      13, 17, 30, 15, 15, 30, 13,
      14, 16, 15, 15, 15, 16, 13,
      18, 16, 15, 15,
      17, 15, 17, 15,
      16, 17, 15, 15, 15, 16,
  ]
  let horizontalGrayBoxesHeight = [
      15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
      15, 15, 15, 15, 15, 15, 15, 15, 15,
      15, 15, 15, 15, 15,
      15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
      15, 15, 15, 15, 15, 15, 15,
      15, 15, 15, 15, 15, 15, 15,
      15, 15, 15, 15,
      15, 15, 15, 15,
      15, 15, 15, 15, 15, 15
  ]
  let xStarts = [
      0.21, 0.33, 0.525, 0.57, 0.61, 0.74, 0.83, 0.89, 0.95, 0.99,
      0.18, 0.252, 0.36, 0.522, 0.614, 0.75, 0.83, 0.87, 0.95,
      0.125, 0.213, 0.28, 0.93, 0.97,
      0.044, 0.148, 0.216, 0.33, 0.445, 0.548, 0.589, 0.659, 0.905, 0.991,
      0.05, 0.288, 0.449, 0.55, 0.59, 0.746, 0.951,
      0.05, 0.185, 0.293, 0.548, 0.59, 0.662, 0.946,
      0.19, 0.303, 0.548, 0.59,
      0.037, 0.211, 0.321, 0.785,
      0.049, 0.313, 0.366, 0.548, 0.59, 0.773,
  ]
  let yStarts = [
      0.034, 0.034, 0.034, 0.034, 0.034, 0.034, 0.034, 0.034, 0.034, 0.034,
      0.17, 0.17, 0.17, 0.17, 0.17, 0.17, 0.17, 0.17, 0.17,
      0.36, 0.36, 0.36, 0.36, 0.36,
      0.445, 0.445, 0.445, 0.445, 0.445, 0.445, 0.445, 0.445, 0.445, 0.445,
      0.575, 0.575, 0.575, 0.575, 0.575, 0.575, 0.575,
      0.64, 0.64, 0.64, 0.64, 0.64, 0.64, 0.64,
      0.74, 0.74, 0.74, 0.74,
      0.866, 0.866, 0.866, 0.866,
      0.958, 0.958, 0.958, 0.958, 0.958, 0.958,
  ]
  for (let i = 0; i < yStarts.length; i++) {
      // Place small boxes at the center of each line
      fill(GrayBoxesColour);
      rect(680 * xStarts[i] - horizontalGrayBoxesWidth[i] / 2, 680 * yStarts[i] - horizontalGrayBoxesHeight[i] / 2, horizontalGrayBoxesWidth[i], horizontalGrayBoxesHeight[i]);
  }


  let verticalGrayBoxesWidth = [
      32, 20, 16, 50, 35, 28, 20,
      15, 15,
      15, 15, 14, 14, 15, 15, 15, 15, 15, 15,
      15, 15, 15, 15, 15, 15,
      15, 15, 15, 15, 15, 14, 14, 15, 15, 15, 15, 15,
      17, 17, 17, 17, 17,
      15, 15, 15, 15, 15, 15, 15, 15, 15,
      17,
      15, 15, 15, 15, 15, 15, 15, 15,
      15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
  ];
  let verticalGrayBoxesHeight = [
      15, 16, 16, 36, 25, 24, 17,
      14, 14,
      14, 14, 14, 14, 14, 14, 12, 14, 14, 14,
      20, 28, 28, 10, 10, 15,
      12, 12, 12, 15, 13, 12, 13, 15, 13, 13, 10, 13,
      17, 15, 10, 15, 14,
      14, 15, 14, 17, 17, 14, 14, 14, 13,
      15,
      14, 14, 14, 14, 14, 14, 14, 14,
      14, 14, 14, 14, 14, 14, 14, 14, 12, 14,
  ];
  let xPositions = [
      0.180, 0.181, 0.185, 0.445, 0.742, 0.29, 0.185,
      0.032, 0.032,
      0.07, 0.07, 0.07, 0.07, 0.07, 0.07, 0.07, 0.07, 0.07, 0.07,
      0.125, 0.125, 0.125, 0.125, 0.125, 0.125,
      0.233, 0.233, 0.233, 0.233, 0.233, 0.233, 0.233, 0.233, 0.233, 0.233, 0.233, 0.233,
      0.549, 0.549, 0.549, 0.549, 0.549,
      0.59, 0.59, 0.59, 0.59, 0.59, 0.59, 0.59, 0.59, 0.59,
      0.661,
      0.85, 0.85, 0.85, 0.85, 0.85, 0.85, 0.85, 0.85,
      0.97, 0.97, 0.97, 0.97, 0.97, 0.97, 0.97, 0.97, 0.97, 0.97,
  ];
  let yPositions = [
      0.103, 0.3, 0.4, 0.5, 0.507, 0.09, 0.807,
      0.054, 0.34,
      0.054, 0.149, 0.19, 0.257, 0.55, 0.676, 0.719, 0.81, 0.887, 0.937,
      0.076, 0.309, 0.413, 0.801, 0.882, 0.937,
      0.0514, 0.188, 0.31, 0.382, 0.467, 0.501, 0.551, 0.684, 0.807, 0.846, 0.882, 0.935,
      0.054, 0.257, 0.379, 0.676, 0.884,
      0.05, 0.1, 0.147, 0.194, 0.26, 0.315, 0.694, 0.806, 0.886,
      0.506,
      0.053, 0.289, 0.422, 0.617, 0.66, 0.728, 0.899, 0.978,
      0.076, 0.147, 0.196, 0.254, 0.423, 0.524, 0.613, 0.656, 0.728,0.9,

  ];

  for (let i = 0; i < xPositions.length; i++) {
      // Place small boxes at the center of each line
      fill(GrayBoxesColour);
      rect(680 * xPositions[i] - verticalGrayBoxesWidth[i] / 2, 680 * yPositions[i] - verticalGrayBoxesHeight[i] / 2, verticalGrayBoxesWidth[i], verticalGrayBoxesHeight[i]);
  }
}

function otherBox() {
  noStroke();
  let RedBoxesColour = [152, 51, 43];
  let YellowBoxesColour = [231, 206, 52];
  fill(RedBoxesColour);
  rect(680 * 0.701 - 65 / 2,
      680 * 0.276 - 50 / 2,
      65,
      50
  );

  fill(YellowBoxesColour);
  rect(680 * 0.703 - 35 / 2,
      680 * 0.279 - 25 / 2,
      35,
      25
  );

  rect(680 * 0.322 - 30 / 2,
      680 * 0.518 - 25 / 2,
      30,
      25
  );
  rect(680 * 0.321 - 50 / 2,
      680 * 0.465 - 17 / 2,
      50,
      17
  );
}

function windowResized() {
  draw();
}
