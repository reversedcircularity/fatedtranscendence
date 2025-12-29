const PIXEL_SCALE = 3;

const app = new PIXI.Application({
  resizeTo: window,
  backgroundAlpha: 0,
  antialias: false
});

document.body.appendChild(app.view);
app.view.style.pointerEvents = 'none';

// layers

const backgroundLayer = new PIXI.Container();
const overlayLayer = new PIXI.Container();

app.stage.addChild(backgroundLayer);
app.stage.addChild(overlayLayer);

// bg layer

const bgTexture = PIXI.Texture.from('assets/containerbg.png');
const bgSprite = new PIXI.Sprite(bgTexture);

bgSprite.anchor.set(0.5);
backgroundLayer.addChild(bgSprite);

function resizeBackground() {
  const { width, height } = app.screen;

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
  noiseCanvas.width = Math.floor(app.screen.width / PIXEL_SCALE);
  noiseCanvas.height = Math.floor(app.screen.height / PIXEL_SCALE);
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

app.ticker.add(drawNoise);

// resizing

window.addEventListener('resize', () => {
  resizeNoiseCanvas();
  noiseSprite.scale.set(PIXEL_SCALE);
  drawNoise();
  resizeBackground();
});
