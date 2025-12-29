const PIXEL_SCALE = 3;

const bgApp = new PIXI.Application({
  resizeTo: window,
  backgroundAlpha: 0,
  antialias: false
});

const overlayApp = new PIXI.Application({
  resizeTo: window,
  backgroundAlpha: 0,
  antialias: false
});

document.getElementById('bg').appendChild(bgApp.view);
document.getElementById('overlay').appendChild(overlayApp.view);

// container layers

const backgroundLayer = new PIXI.Container();
const overlayLayer = new PIXI.Container();

bgApp.stage.addChild(backgroundLayer);
overlayApp.stage.addChild(overlayLayer);

// bg layer

const bgTexture = PIXI.Texture.from('assets/containerbg.png');
const bgSprite = new PIXI.Sprite(bgTexture);

bgSprite.anchor.set(0.5);
backgroundLayer.addChild(bgSprite);

function resizeBackground() {
  const { width, height } = bgApp.screen;

  bgSprite.x = width / 2;
  bgSprite.y = height / 2;

  const scale = Math.max(
    width / bgTexture.width,
    height / bgTexture.height
  );

  bgSprite.scale.set(scale);
}

bgTexture.baseTexture.once('loaded', resizeBackground);

// noise overlay

const noiseCanvas = document.createElement('canvas');
const noiseCtx = noiseCanvas.getContext('2d');

function resizeNoiseCanvas() {
  noiseCanvas.width = Math.floor(overlayApp.screen.width / PIXEL_SCALE);
  noiseCanvas.height = Math.floor(overlayApp.screen.height / PIXEL_SCALE);
}

resizeNoiseCanvas();

const noiseTexture = PIXI.Texture.from(noiseCanvas);
noiseTexture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;

const noiseSprite = new PIXI.Sprite(noiseTexture);
noiseSprite.scale.set(PIXEL_SCALE);
noiseSprite.blendMode = PIXI.BLEND_MODES.MULTIPLY;

overlayLayer.addChild(noiseSprite);

function drawNoise() {
  const imageData = noiseCtx.createImageData(
    noiseCanvas.width,
    noiseCanvas.height
  );

  const pixels = imageData.data;

  for (let i = 0; i < pixels.length; i += 4) {
    const alpha = Math.random() * 255;
    pixels[i] = pixels[i + 1] = pixels[i + 2] = 0;
    pixels[i + 3] = alpha * 0.3;
  }

  noiseCtx.putImageData(imageData, 0, 0);
  noiseTexture.update();
}

overlayApp.ticker.add(drawNoise);

// resizing

window.addEventListener('resize', () => {
  resizeNoiseCanvas();
  noiseSprite.scale.set(PIXEL_SCALE);
  drawNoise();
  resizeBackground();
});
