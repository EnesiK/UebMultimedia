// Initialize PixiJS Application
const app = new PIXI.Application({
    view: document.getElementById('pixiCanvas'),
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: 0x87CEEB // Sky blue background
});

// Resize the renderer to fill the entire window
app.renderer.resize(window.innerWidth, window.innerHeight);

// Add the application to the HTML document
document.body.appendChild(app.view);

// Create the road
const road = new PIXI.Graphics();
road.beginFill(0x333333);
road.drawRect(0, app.screen.height - 100, app.screen.width, 100);
road.endFill();
app.stage.addChild(road);

// Create the water
const water = new PIXI.Graphics();
water.beginFill(0x1E90FF);
water.drawRect(0, app.screen.height - 150, app.screen.width, 50);
water.endFill();
app.stage.addChild(water);

// Create the car
const car = new PIXI.Container();
const carBody = new PIXI.Graphics();
const carWidth = 80;
const carHeight = 30;
const carHoodWidth = 20;
const carHoodHeight = 10;
const carRoofHeight = 10;
const tireRadius = 10;

// Draw the car body
carBody.beginFill(0x4682B4); // Blue color for the car
carBody.drawRect(0, 0, carWidth, carHeight); // Car body
carBody.drawRect((carWidth - carHoodWidth) / 2, -carHoodHeight, carHoodWidth, carHoodHeight); // Car hood
carBody.drawRect((carWidth - carHoodWidth) / 2 + 10, -carHoodHeight - carRoofHeight, carHoodWidth - 20, carRoofHeight); // Car roof
carBody.endFill();

// Draw the car tires
const tireY = carHeight; // Adjusted position relative to the car body

// Front tire
const frontTire = new PIXI.Graphics();
frontTire.beginFill(0x000000); // Black color for tires
frontTire.drawCircle(0, 0, tireRadius);
frontTire.endFill();
frontTire.x = 15;
frontTire.y = tireY;

// Back tire
const backTire = new PIXI.Graphics();
backTire.beginFill(0x000000); // Black color for tires
backTire.drawCircle(0, 0, tireRadius);
backTire.endFill();
backTire.x = carWidth - 15;
backTire.y = tireY;

car.addChild(carBody);
car.addChild(frontTire);
car.addChild(backTire);

// Position the car
car.x = 0;
car.y = app.screen.height - 95; // Adjusted to fit the road
app.stage.addChild(car);

// Draw the road lines
const roadLines = new PIXI.Graphics();
roadLines.lineStyle(4, 0xFFFFFF); // White color for the road lines
roadLines.moveTo(0, app.screen.height - 50); // Start at the bottom of the screen
roadLines.lineTo(app.screen.width, app.screen.height - 50); // Draw a line across the screen
app.stage.addChild(roadLines);

// Create the ship
const ship = new PIXI.Graphics();
ship.beginFill(0x8B4513);
ship.moveTo(-50, 0);
ship.lineTo(-20, -15);
ship.lineTo(20, -15);
ship.lineTo(50, 0);
ship.lineTo(20, 15);
ship.lineTo(-20, 15);
ship.lineTo(-50, 0);
ship.endFill();

// Draw the ship's flag
const flagHeight = 40; // Adjust the flag height as needed
const flagWidth = 30; // Adjust the flag width as needed
const flagOffsetX = -10; // Adjust the offset to the left
ship.beginFill(0xFFFFFF); // White color for the flag
ship.moveTo(flagOffsetX, -20);
ship.lineTo(flagWidth + flagOffsetX, -30 - flagHeight);
ship.lineTo(flagWidth + flagOffsetX, -20);
ship.lineTo(flagOffsetX, -20);
ship.endFill();

ship.x = app.screen.width / 2;
ship.y = app.screen.height - 150; // Adjusted to fit the water
app.stage.addChild(ship);

// Create the plane
const plane = new PIXI.Graphics();
plane.beginFill(0xFFFFFF); // White color for the plane
plane.moveTo(-40, 0); // Fuselage shape
plane.lineTo(40, 0);
plane.lineTo(0, -15);
plane.lineTo(-40, 0);

plane.moveTo(20, 0); // Wing shape
plane.lineTo(40, 8);
plane.lineTo(40, 0);
plane.lineTo(20, 0);

plane.moveTo(20, 0); // Tail shape
plane.lineTo(15, -15);
plane.lineTo(25, -15);
plane.lineTo(20, 0);

plane.endFill();
plane.x = app.screen.width;
plane.y = 100;
app.stage.addChild(plane);

// Create Clouds
const clouds = [];

const cloudTextures = [
    'video/cloudremove.png',
    'video/c1.png',
    'video/c2.png'
];

for (let i = 0; i < 50; i++) { // Increase number of clouds
    const cloudTexture = PIXI.Texture.from(cloudTextures[i % cloudTextures.length]);
    const cloud = new PIXI.Sprite(cloudTexture);
    cloud.anchor.set(0.5);
    cloud.scale.set(0.05 + Math.random() * 0.1); // Smaller scale for variation
    cloud.x = Math.random() * app.screen.width;
    cloud.y = Math.random() * (app.screen.height / 2); // Distribute clouds across the sky
    app.stage.addChild(cloud);
    clouds.push(cloud);
}

// Create additional clouds near the ship
for (let i = 0; i < 15; i++) { // Increase number of clouds near the ship
    const cloudTexture = PIXI.Texture.from(cloudTextures[i % cloudTextures.length]);
    const cloud = new PIXI.Sprite(cloudTexture);
    cloud.anchor.set(0.5);
    cloud.scale.set(0.05 + Math.random() * 0.1); // Smaller scale for variation
    cloud.x = Math.random() * app.screen.width;
    cloud.y = app.screen.height / 2 - 50 + Math.random() * 50; // Position clouds above the water but below the upper half of the screen
    app.stage.addChild(cloud);
    clouds.push(cloud);
}

// Animate the elements
app.ticker.add((delta) => {
    // Move the car along the road
    car.x += 2 * delta;
    if (car.x > app.screen.width) {
        car.x = -car.width;
    }

    // Make the plane fly across the screen
    plane.x -= 3 * delta;
    if (plane.x < -plane.width) {
        plane.x = app.screen.width + plane.width;
    }

    // Make the ship sail back and forth
    ship.x += 1 * delta;
    if (ship.x > app.screen.width) {
        ship.x = -ship.width;
    }

    // Animate clouds
    clouds.forEach(cloud => {
        cloud.x -= 1 * delta;
        if (cloud.x < -cloud.width) {
            cloud.x = app.screen.width + cloud.width;
            if (cloud.y < app.screen.height / 2) {
                cloud.y = Math.random() * (app.screen.height / 2); // Redistribute clouds across the sky
            } else {
                cloud.y = app.screen.height / 2 - 50 + Math.random() * 50; // Redistribute clouds above the water but below the upper half of the screen
            }
        }
    });
});

// Initialize date pickers
const arrivalsPicker = new Pikaday({
    field: document.getElementById('arrivals'),
    format: 'YYYY-MM-DD',
    minDate: new Date(),
    maxDate: new Date('2025-12-31'),
    toString(date) {
        return date.toISOString().split('T')[0];
    },
});

const leavingPicker = new Pikaday({
    field: document.getElementById('leaving'),
    format: 'YYYY-MM-DD',
    minDate: new Date(),
    maxDate: new Date('2025-12-31'),
    toString(date) {
        return date.toISOString().split('T')[0];
    },
});
