const app = new PIXI.Application({
  resizeTo: window,
  backgroundAlpha: 0,
  antialias: false
});
document.body.appendChild(app.view);

const scanlines = new PIXI.Graphics();
function drawScanlines() {
  scanlines.clear();
  scanlines.beginFill(0x000000, 0.5);
  for (let y = 0; y < app.screen.height; y += 2) {
    scanlines.drawRect(0, y, app.screen.width, 1);
  }
  scanlines.endFill();
}
drawScanlines();
app.stage.addChild(scanlines);

const noiseCanvas = document.createElement('canvas');
noiseCanvas.width = app.screen.width;
noiseCanvas.height = app.screen.height;
const noiseCtx = noiseCanvas.getContext('2d');

function drawNoise() {
  const imageData = noiseCtx.createImageData(noiseCanvas.width, noiseCanvas.height);
  const pixels = imageData.data;

  for (let i = 0; i < pixels.length; i += 4) {
    const v = Math.random() * 255;
    pixels[i] = pixels[i + 1] = pixels[i + 2] = 0;
    pixels[i + 3] = v * 0.2;
  }

  noiseCtx.putImageData(imageData, 0, 0);
  noiseTexture.update();
}

const noiseTexture = PIXI.Texture.from(noiseCanvas);
const noiseSprite = new PIXI.Sprite(noiseTexture);
app.stage.addChild(noiseSprite);
noiseSprite.blendMode = PIXI.BLEND_MODES.MULTIPLY;

app.ticker.add(drawNoise);

window.addEventListener('resize', () => {
  noiseCanvas.width = app.screen.width;
  noiseCanvas.height = app.screen.height;
  noiseSprite.width = app.screen.width;
  noiseSprite.height = app.screen.height;
  drawScanlines();
});


