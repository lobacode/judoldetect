export const normalizeText = (text) => {
  // Normalisasi unicode NFKC supaya angka aneh jadi normal
  let normalized = text.normalize("NFKC");
  // Hapus semua selain huruf dan angka
  normalized = normalized.replace(/[^\p{L}\p{N}]/gu, '');
  
  return normalized.toLowerCase();
};

const containsJudol = (text, bannedWords) => {
  const normalizedText = normalizeText(text);
  for (const word of bannedWords) {
    if (normalizedText.includes(word)) {
      return word;
    }
  }
  return false;
};

export default containsJudol;
