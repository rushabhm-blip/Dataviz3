// Bike Mileage Data calculated from midpoint averages
const bikes = [
  { name: "Honda CB200X", mileage: 42.5, color: "#00E676" },
  { name: "TVS Ronin 225", mileage: 40.0, color: "#00E5FF" },
  { name: "TVS Apache RTR 200 4V", mileage: 40.0, color: "#3D5AFF" },
  { name: "Hero XPulse 200 4V", mileage: 37.5, color: "#FFEA00" },
  { name: "Honda H'ness CB350", mileage: 36.5, color: "#FF9100" },
  { name: "RE Hunter 350", mileage: 34.0, color: "#FF3D00" },
  { name: "TVS Apache 300", mileage: 30.0, color: "#D500F9" }
];

function setup() {
  createCanvas(850, 680);
  angleMode(DEGREES);
}

function draw() {
  background(18, 22, 30);

  let cx = width / 2;
  let cy = height / 2 - 30;
  let maxMileage = 50;

  // Title
  textAlign(CENTER, CENTER);
  fill(255);
  textSize(22);
  textFont('Helvetica');
  textStyle(BOLD);
  text("REAL-WORLD MILEAGE COMPARISON (km/l)", cx, 40);

  // Speedometer Gauge Outer Dial
  let startAngle = 135;
  let endAngle = 405;

  noFill();
  stroke(40, 50, 70);
  strokeWeight(2);
  arc(cx, cy, 410, 410, startAngle, endAngle);

  // Scale Ticks (0 to 50 km/l)
  for (let m = 0; m <= maxMileage; m += 5) {
    let angle = map(m, 0, maxMileage, startAngle, endAngle);
    let r1 = 205;
    let r2 = (m % 10 === 0) ? 218 : 212;

    let x1 = cx + cos(angle) * r1;
    let y1 = cy + sin(angle) * r1;
    let x2 = cx + cos(angle) * r2;
    let y2 = cy + sin(angle) * r2;

    stroke(m % 10 === 0 ? color(160, 180, 200) : color(80, 100, 120));
    strokeWeight(m % 10 === 0 ? 2 : 1);
    line(x1, y1, x2, y2);

    if (m % 10 === 0) {
      let tx = cx + cos(angle) * 238;
      let ty = cy + sin(angle) * 238;
      fill(160, 180, 200);
      noStroke();
      textSize(12);
      textStyle(NORMAL);
      text(m, tx, ty);
    }
  }

  // Draw Concentric Mileage Arcs for each bike
  let baseRadius = 380;
  let radiusStep = 22;
  let hoveredBike = null;

  for (let i = 0; i < bikes.length; i++) {
    let b = bikes[i];
    let r = baseRadius - (i * radiusStep);
    let targetAngle = map(b.mileage, 0, maxMileage, startAngle, endAngle);

    // Dark track behind arc
    noFill();
    stroke(30, 38, 52);
    strokeWeight(12);
    arc(cx, cy, r, r, startAngle, endAngle);

    // Active mileage arc
    stroke(b.color);
    strokeWeight(12);
    arc(cx, cy, r, r, startAngle, targetAngle);

    // Hover detection
    let d = dist(mouseX, mouseY, cx, cy);
    if (abs(d - r / 2) < 8) {
      hoveredBike = b;
    }
  }

  // Center Speedometer Display Box
  noStroke();
  fill(25, 32, 45);
  ellipse(cx, cy, 180, 180);
  stroke(50, 65, 88);
  strokeWeight(2);
  ellipse(cx, cy, 170, 170);

  // Center Reading
  textAlign(CENTER, CENTER);
  if (hoveredBike) {
    fill(hoveredBike.color);
    textSize(14);
    textStyle(BOLD);
    text(hoveredBike.name.toUpperCase(), cx, cy - 25);

    fill(255);
    textSize(34);
    text(hoveredBike.mileage.toFixed(1), cx, cy + 10);

    fill(140, 160, 180);
    textSize(12);
    textStyle(NORMAL);
    text("km/l (Avg)", cx, cy + 35);
  } else {
    fill(120, 140, 165);
    textSize(12);
    textStyle(NORMAL);
    text("HOVER AN ARC", cx, cy - 15);

    fill(255);
    textSize(20);
    textStyle(BOLD);
    text("0 - 50 km/l", cx, cy + 10);

    fill(120, 140, 165);
    textSize(11);
    textStyle(NORMAL);
    text("Gauge Scale", cx, cy + 30);
  }

  // Bottom Legend
  drawLegend(60, height - 100);
}

function drawLegend(startX, startY) {
  let colWidth = 260;
  let rowHeight = 28;

  textSize(12);
  textStyle(NORMAL);

  for (let i = 0; i < bikes.length; i++) {
    let b = bikes[i];
    let col = i % 3;
    let row = floor(i / 3);

    let x = startX + col * colWidth;
    let y = startY + row * rowHeight;

    // Legend color bar
    fill(b.color);
    noStroke();
    rect(x, y - 6, 16, 12, 3);

    // Legend Text
    fill(220, 230, 240);
    textAlign(LEFT, CENTER);
    text(`${b.name}: ${b.mileage.toFixed(1)} km/l`, x + 24, y);
  }
}