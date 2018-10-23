const setFontSize = (minFontSize = 12, maxFontSize = 16) => {
  const docEle = document.documentElement;
  const clientWidth = docEle.clientWidth;
  if (!clientWidth) return;
  const fontSize = Math.max(minFontSize, Math.min(12 * (clientWidth / 320), maxFontSize));
  docEle.style.fontSize = `${fontSize}px`;
};

export default {
  setFontSize,
};
