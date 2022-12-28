const limit = (number, min, max) => Math.min(max, Math.max(min, number));
/**
 * rgb转hsl颜色
 * @param {*} r rgb颜色中的r
 * @param {*} g rgb颜色中的g
 * @param {*} b rgb颜色中的b
 */
let rgb2hsl = function(r = 0, g = 0, b = 0) {
  r = parseFloat(r);
  g = parseFloat(g);
  b = parseFloat(b);
  if (r < 0) r = 0;
  if (g < 0) g = 0;
  if (b < 0) b = 0;
  if (r > 255) r = 255;
  if (g > 255) g = 255;
  if (b > 255) b = 255;
  r /= 255;
  g /= 255;
  b /= 255;
  const M = Math.max(r, g, b);
  const m = Math.min(r, g, b);
  const C = M - m;
  let h, s, v;
  if (C == 0) h = 0;
  else if (M == r) h = ((g - b) / C) % 6;
  else if (M == g) h = (b - r) / C + 2;
  else h = (r - g) / C + 4;
  h *= 60;
  if (h < 0) h += 360;
  v = M;
  if (C == 0) s = 0;
  else s = C / v;
  s *= 100;
  v *= 100;
  return [h, s, v];
}

/**
 * hsl转rgb颜色
 * @param {*} h 
 * @param {*} s 
 * @param {*} v 
 * @param {*} a 
 */
let hslToRgb = function(h = 0, s = 0, v = 0, a) {
  const hsb = [h, s, v].map((bit, i) => {
    let _bit = bit;
    if (_bit) _bit = parseFloat(_bit);
    if (i === 0) {
      // eslint-disable-next-line
      return Math.round((_bit %= 360) < 0 ? _bit + 360 : _bit);
    }
    return limit(Math.round(bit), 0, 100);
  });

  const br = Math.round(hsb[2] / 100 * 255);
  if (hsb[1] === 0) return [br, br, br];

  const hue = hsb[0];
  const f = hue % 60;
  const p = Math.round(hsb[2] * (100 - hsb[1]) / 10000 * 255);
  const q = Math.round(hsb[2] * (6000 - hsb[1] * f) / 600000 * 255);
  const t = Math.round(hsb[2] * (6000 - hsb[1] * (60 - f)) / 600000 * 255);

  let rgb;
  switch (Math.floor(hue / 60)) {
    case 0:
      rgb = [br, t, p];
      break;
    case 1:
      rgb = [q, br, p];
      break;
    case 2:
      rgb = [p, br, t];
      break;
    case 3:
      rgb = [p, q, br];
      break;
    case 4:
      rgb = [t, p, br];
      break;
    default:
      rgb = [br, p, q];
      break;
  }
  if (a !== undefined) {
    rgb.push(limit(Number(a), 0, 1));
  }
  return rgb;
}

/**
 * 色温转RGB
 * @param {*} k 色温
 */
let k2rgb = function(t){
  let k = t/100;
  let r=0;
  let g=0;
  let b=0;
  let tmpCalc;  
  // 红色
  if(k<=66){
    r = 255;
  }else{
    tmpCalc = k - 60;
    tmpCalc = 329.698727446 * (Math.pow(tmpCalc, -0.1332047592));
    r = tmpCalc;
    if(r<0){
      r=0;
    }
    if(r>255){
      r=255;
    }
  }
  // 绿色
  if(k<= 66){
    tmpCalc = k;
    tmpCalc = 99.4708025861 * Math.log(tmpCalc) - 161.1195681661;
    g = tmpCalc;
    if(g<0){
      g=0;
    }
    if(g>255){
      g=255;
    }
  }else{
    tmpCalc = k - 60;    
    tmpCalc = 288.1221695283 * (Math.pow(tmpCalc, -0.0755148492));
    g = tmpCalc;
    if(g<0){
      g=0;
    }
    if(g>255){
      g=255;
    }
  }  
  // 蓝色
  if(k >= 66){
    b =255;
  }else if(k<=19){
    b =0;
  }else{
    tmpCalc = k - 10
    tmpCalc = 138.5177312231 * Math.log(tmpCalc) - 305.0447927307;
    b= tmpCalc;
    if(b<0){
      b=0;
    }
    if(b>255){
      b=255;
    }
  }
  return [r,g,b]
}

module.exports = {
  rgb2hsl: rgb2hsl,
  hslToRgb: hslToRgb,
  k2rgb:k2rgb
}