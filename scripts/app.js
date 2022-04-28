const Application = PIXI.Application;

const app = new Application({
    width: window.innerWidth,
    height: window.innerHeight,
    antialias: true,
    position: 'absolute',
});

document.body.appendChild(app.view);

const loader = PIXI.Loader.shared;
loader.add('backgroundImage')
    .load(setup);

function setup(loader, resources) {
    const container = new PIXI.Container();

    const backgroundImage = PIXI.Sprite.from("./images/background.png");
    backgroundImage.anchor.set(0.5);
    backgroundImage.x = app.renderer.width / 2;
    backgroundImage.y = app.renderer.height / 2;

    container.addChild(backgroundImage);
    app.stage.addChild(container);

    const displacementImage = new PIXI.Sprite.from("images/displacement.jpg");
    displacementImage.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
    displacementImage.anchor.set(0.5);

    const diplacementFilter = new PIXI.filters.DisplacementFilter(displacementImage);

    const logo = new PIXI.Sprite.from("./images/Yo_Gorillaz.png");
    logo.anchor.set(0.5);
    logo.x = app.renderer.width / 2;
    logo.y = app.renderer.height / 2 + 20;
    logo.scale.set(app.renderer.height * 0.001);

    logo.filters = [/* new PIXI.filters.DotFilter(1,5), */ new PIXI.filters.GlowFilter(1, 1, 1, 0x42EA19, 0.5)];

    container.addChild(logo);

    
    container.addChild(displacementImage);
    backgroundImage.filters = [diplacementFilter/* , new PIXI.filters.DotFilter(1, 5) */];

    const options1 = {
        amplitude: 40, //300
        wavelength: 30, //160
        speed: 200, //500
        radius: 80
    };

    const shockwaveFilter1 = new PIXI.filters.ShockwaveFilter(
        [Math.random() * app.screen.width, Math.random() * app.screen.height],
        options1,
        0
    );

    const options2 = {
        amplitude: 80, //300
        wavelength: 45, //160
        speed: 240, //500
        radius: 100
    };

    const shockwaveFilter2 = new PIXI.filters.ShockwaveFilter(
        [Math.random() * app.screen.width, Math.random() * app.screen.height],
        options2,
        0
    );

    const options3 = {
        amplitude: 105, //300
        wavelength: 65, //160
        speed: 300, //500
        radius: 160
    };

    const shockwaveFilter3 = new PIXI.filters.ShockwaveFilter(
        [Math.random() * app.screen.width, Math.random() * app.screen.height],
        options3,
        0
    );

    container.filters = [shockwaveFilter1, shockwaveFilter2, shockwaveFilter3, new PIXI.filters.AsciiFilter(6)];
    const style = new PIXI.TextStyle({
        fontFamily: 'Arial',
        fontSize: 20 + window.innerWidth * 0.06,
        fontStyle: 'italic',
        fontWeight: 'bold',
        fill: ['#ffffff', '#00ff99'], // gradient
        stroke: '#4a1850',
        strokeThickness: 5,
        dropShadow: true,
        dropShadowColor: '#000000',
        dropShadowBlur: 4,
        dropShadowAngle: Math.PI / 6,
        dropShadowDistance: 6,
        wordWrap: true,
    });
    const myText = new PIXI.Text('What are you looking for?',style)
    myText.x = 10;
    
    container.addChild(myText);
    app.ticker.add(function () {
        displacementImage.x += 0.3;
        if (displacementImage.x > displacementImage.width) {
            displacementImage.x = 0;
        }

        createRaindrops(shockwaveFilter1, 0.7);
        createRaindrops(shockwaveFilter2, 0.5);
        createRaindrops(shockwaveFilter3, 1);
    });

    function createRaindrops(filter, resetTime) {
        filter.time += 0.003;
        if (filter.time > resetTime) {
            filter.time = 0;
            filter.center = [
                Math.random() * app.screen.width,
                Math.random() * app.screen.height
            ];
        }
    }

    window.addEventListener('resize', function () {
        app.renderer.resize(window.innerWidth, window.innerHeight);
        logo.x = app.renderer.width / 2;
        logo.y = app.renderer.height / 2 + 20;
        style.fontSize = 20 + window.innerWidth * 0.06;
        logo.scale.set(app.renderer.height * 0.001);

    })

}
