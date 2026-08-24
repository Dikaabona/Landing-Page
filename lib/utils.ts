
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

  let cleaned = html;

  // 1. Normalize non-breaking spaces and remove soft hyphens/invisible zero-width characters
  cleaned = cleaned
    .replace(/&nbsp;/gi, ' ')
    .replace(/\u00A0/g, ' ')
    .replace(/[\u00AD\u200B-\u200D\uFEFF]/g, '')
    .replace(/&(?:shy|#173|#xAD);/gi, '');

  // 2. Comprehensive Indonesian word pairs that get broken by column-hyphenation / copy-paste line-breaks
  const brokenPairs: [string, string, string][] = [
    ['N', 'omor', 'Nomor'],
    ['Ag', 'ustus', 'Agustus'],
    ['pem', 'ungut', 'pemungut'],
    ['belu', 'm', 'belum'],
    ['peda', 'gang', 'pedagang'],
    ['onli', 'ne', 'online'],
    ['m', 'endukung', 'mendukung'],
    ['men', 'dukung', 'mendukung'],
    ['seca', 'ra', 'secara'],
    ['implementa', 'si', 'implementasi'],
    ['m', 'endalam', 'mendalam'],
    ['se', 'belumnya', 'sebelumnya'],
    ['ter', 'us', 'terus'],
    ['ketera', 'ngan', 'keterangan'],
    ['b', 'atas', 'batas'],
    ['penun', 'jukan', 'penunjukan'],
    ['per', 'pajakan', 'perpajakan'],
    ['ke', 'bijakan', 'kebijakan'],
    ['kebijak', 'an', 'kebijakan'],
    ['di', 'tunda', 'ditunda'],
    ['di', 'umumkan', 'diumumkan'],
    ['se', 'besar', 'sebesar'],
    ['pe', 'merintah', 'pemerintah'],
    ['ke', 'putusan', 'keputusan'],
    ['ter', 'baru', 'terbaru'],
    ['di', 'berlakukan', 'diberlakukan'],
    ['di', 'targetkan', 'ditargetkan'],
    ['di', 'ambil', 'diambil'],
    ['me', 'ninjau', 'meninjau'],
    ['ke', 'sejahteraan', 'kesejahteraan'],
    ['ke', 'seluruhan', 'keseluruhan'],
    ['per', 'tumbuhan', 'pertumbuhan'],
    ['na', 'sional', 'nasional'],
    ['di', 'bebani', 'dibebani'],
    ['me', 'kanisme', 'mekanisme'],
    ['ber', 'basis', 'berbasis'],
    ['me', 'micu', 'memicu'],
    ['ke', 'jutan', 'kejutan'],
    ['eko', 'sistem', 'ekosistem'],
    ['di', 'pupuk', 'dipupuk'],
    ['pe', 'nerapan', 'penerapan'],
    ['pe', 'mungutan', 'pemungutan'],
    ['res', 'minya', 'resminya'],
    ['ter', 'dampak', 'terdampak'],
    ['pe', 'nyelenggara', 'penyelenggara'],
    ['se', 'mentara', 'sementara'],
    ['pelak', 'sanaan', 'pelaksanaan'],
    ['oto', 'matis', 'otomatis'],
    ['me', 'liputi', 'meliputi'],
    ['komer', 'sial', 'komersial'],
    ['penjual', 'an', 'penjualan'],
    ['pembayar', 'an', 'pembayaran']
  ];

  // Separator matches hyphens, spaces, line-breaks, <br>, and inline HTML tags between broken syllables
  const sepPattern = '(?:-|\\s|<br\\s*\\/?>|<\\/?[a-z0-9]+(?:\\s+[^>]*)?>)+';

  for (const [p1, p2, full] of brokenPairs) {
    const regex = new RegExp(`\\b${p1}${sepPattern}${p2}\\b`, 'gi');
    cleaned = cleaned.replace(regex, (match) => {
      // If the match was entirely or partially uppercase / capitalized, preserve sensible casing
      if (p1[0] === p1[0].toUpperCase()) {
        return full.charAt(0).toUpperCase() + full.slice(1);
      }
      return full.toLowerCase();
    });
  }

  // 3. Fix any generic hyphens followed by whitespace: e.g. "kata- kata" -> "kata‑kata", "e- commerce" -> "e‑commerce"
  cleaned = cleaned.replace(/(\b[a-zA-Z0-9]+)-\s+([a-zA-Z0-9]+\b)/g, '$1\u2011$2');

  // 4. In plain text segments, preserve non-breaking hyphens for compound words ("e‑commerce", "kira‑kira", "masing‑masing")
  cleaned = cleaned.replace(/(>|^)([^<]+)(<|$)/g, (match, prefix, text, suffix) => {
    const processed = text.replace(/(\b[a-zA-Z0-9]+)-([a-zA-Z0-9]+\b)/g, '$1\u2011$2');
    return prefix + processed + suffix;
  });

  return cleaned;
};

