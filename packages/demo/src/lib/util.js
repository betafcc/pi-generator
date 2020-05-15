export const copyElementTextContent = el => {
    const sel = selectElementText(el);
    document.execCommand('copy');
    sel.removeAllRanges();
};

const selectElementText = el => {
    const range = document.createRange();
    range.selectNodeContents(el);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);

    return selection;
};


export const formatTimeDuration = ms => {
  const d = Math.floor(ms / 1000 / 60 / 60 / 24);
  const h = Math.floor(ms / 1000 / 60 / 60) % 24;
  const m = Math.floor(ms / 1000 / 60) % 60;
  const s = Math.floor(ms / 1000) % 60;

  if (d)
    return `${d}d ${h}h ${m}m ${s}s`;
  if (h)
    return `${h}h ${m}m ${s}s`;
  if (m)
    return `${m}m ${s}s`

  return `${s}s`;
};
