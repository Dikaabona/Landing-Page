
export const convertDriveUrl = (url: string) => {
  if (!url) return url;
  if (url.includes('drive.google.com')) {
    const match = url.match(/\/d\/(.+?)(?:\/|$|\?)/) || url.match(/[?&]id=(.+?)(?:&|$)/);
    if (match && match[1]) {
      return `https://drive.google.com/uc?export=view&id=${match[1]}`;
    }
  }
  return url;
};

export const cleanArticleHtml = (html: string): string => {
  if (!html) return '';

  // 1. Remove soft hyphens and invisible break characters (often pasted from news sites/PDFs)
  let cleaned = html
    .replace(/[\u00AD\u200B-\u200D\uFEFF]/g, '')
    .replace(/&(?:shy|#173|#xAD);/gi, '');

  // 2. Replace hyphens inside text nodes (outside HTML tags) between letters/numbers with non-breaking hyphens (\u2011)
  // This keeps words like "e-commerce", "masing-masing", "kira-kira", "Covid-19" from breaking awkwardly across lines.
  cleaned = cleaned.replace(/(>|^)([^<]+)(<|$)/g, (match, prefix, text, suffix) => {
    const processedText = text.replace(/(\b[a-zA-Z0-9]+)-([a-zA-Z0-9]+\b)/g, '$1\u2011$2');
    return prefix + processedText + suffix;
  });

  return cleaned;
};

