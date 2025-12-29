const PIXEL_SCALE = 3; // 2 = double pixel size

const app = new PIXI.Application({
  resizeTo: window,
  backgroundAlpha: 0,
  antialias: false
});
document.body.appendChild(app.view);

const noiseCanvas = document.createElement('canvas');
const noiseCtx = noiseCanvas.getContext('2d');

// IMPORTANT: lower-resolution noise buffer
function resizeNoiseCanvas() {
  noiseCanvas.width = Math.floor(app.screen.width / PIXEL_SCALE);
  noiseCanvas.height = Math.floor(app.screen.height / PIXEL_SCALE);
}

resizeNoiseCanvas();

function drawNoise() {
  const imageData = noiseCtx.createImageData(
    noiseCanvas.width,
    noiseCanvas.height
  );
  const pixels = imageData.data;

  for (let i = 0; i < pixels.length; i += 4) {
    const v = Math.random() * 255;
    pixels[i] = pixels[i + 1] = pixels[i + 2] = 0;
    pixels[i + 3] = v * 0.3;
  }

  noiseCtx.putImageData(imageData, 0, 0);
  noiseTexture.update();
}

const noiseTexture = PIXI.Texture.from(noiseCanvas);
// Prevent Pixi from smoothing when scaling
noiseTexture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;

const noiseSprite = new PIXI.Sprite(noiseTexture);
noiseSprite.scale.set(PIXEL_SCALE);
noiseSprite.blendMode = PIXI.BLEND_MODES.MULTIPLY;

app.stage.addChild(noiseSprite);

app.ticker.add(drawNoise);

window.addEventListener('resize', () => {
  resizeNoiseCanvas();
  noiseSprite.scale.set(PIXEL_SCALE);
  drawNoise();
});