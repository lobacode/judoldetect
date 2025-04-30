import GraphemeSplitter from "grapheme-splitter";

const splitter = new GraphemeSplitter();

// Peta karakter huruf fancy ke huruf biasa (A-Z dan 0-9)
const fancyCharMap = {
  // Cyrillic → Latin (Visual Similarity)
  'А': 'A', 'Б': '6', 'В': 'B', 'Г': 'r', 'Д': 'A', 'Е': 'E', 'Ё': 'E', 'Ж': 'X', 'З': '3',
  'И': 'N', 'Й': 'N', 'К': 'K', 'Л': 'L', 'М': 'M', 'Н': 'H', 'О': 'O', 'П': 'N', 'Р': 'P',
  'С': 'C', 'Т': 'T', 'У': 'Y', 'Ф': 'O', 'Х': 'X', 'Ц': 'U', 'Ч': '4', 'Ш': 'W', 'Щ': 'W',
  'Ы': 'bl', 'Э': '3', 'Ю': 'IO', 'Я': 'R',

  'а': 'a', 'б': '6', 'в': 'b', 'г': 'r', 'д': 'a', 'е': 'e', 'ё': 'e', 'ж': 'x', 'з': '3',
  'и': 'n', 'й': 'n', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'h', 'о': 'o', 'п': 'n', 'р': 'p',
  'с': 'c', 'т': 't', 'у': 'y', 'ф': 'o', 'х': 'x', 'ц': 'u', 'ч': '4', 'ш': 'w', 'щ': 'w',
  'ы': 'bl', 'э': '3', 'ю': 'io', 'я': 'r',

  // Latin Fancy Letters (Visual Forms A-Z)
  'ᗩ': 'a', 'ᗷ': 'b', 'ᑕ': 'c', 'ᗪ': 'd', 'ᗴ': 'e', 'ᖴ': 'f',
  'ᘜ': 'g', 'ᕼ': 'h', 'Ꮖ': 'i', 'ᒍ': 'j', 'ᛕ': 'k', 'ᒪ': 'l',
  'ᗰ': 'm', 'ᑎ': 'n', 'ᗝ': 'o', 'ᝪ': 'o', 'ᑭ': 'p', 'ᑫ': 'q',
  'ᖇ': 'r', 'ᔕ': 's', 'ᑦ': 't', 'ᑌ': 'u', 'ᐯ': 'v', 'ᗯ': 'w',
  '᙭': 'x', 'ᖻ': 'y', 'ᘔ': 'z',

  // Bold Math (𝗔 - 𝗭)
  '𝗔': 'a', '𝗕': 'b', '𝗖': 'c', '𝗗': 'd', '𝗘': 'e', '𝗙': 'f',
  '𝗚': 'g', '𝗛': 'h', '𝗜': 'i', '𝗝': 'j', '𝗞': 'k', '𝗟': 'l',
  '𝗠': 'm', '𝗡': 'n', '𝗢': 'o', '𝗣': 'p', '𝗤': 'q', '𝗥': 'r',
  '𝗦': 's', '𝗧': 't', '𝗨': 'u', '𝗩': 'v', '𝗪': 'w', '𝗫': 'x',
  '𝗬': 'y', '𝗭': 'z',

  // Stylized Cursive (Mathematical Script)
  '𝒜': 'a', 'ℬ': 'b', '𝒞': 'c', '𝒟': 'd', 'ℰ': 'e', 'ℱ': 'f',
  '𝒢': 'g', 'ℋ': 'h', 'ℐ': 'i', '𝒥': 'j', '𝒦': 'k', 'ℒ': 'l',
  'ℳ': 'm', '𝒩': 'n', '𝒪': 'o', '𝒫': 'p', '𝒬': 'q', 'ℛ': 'r',
  '𝒮': 's', '𝒯': 't', '𝒰': 'u', '𝒱': 'v', '𝒲': 'w', '𝒳': 'x',
  '𝒴': 'y', '𝒵': 'z',
  '𝒶': 'a', '𝒷': 'b', '𝒸': 'c', '𝒹': 'd', 'ℯ': 'e', '𝒻': 'f',
  '𝓰': 'g', '𝒽': 'h', '𝒾': 'i', '𝒿': 'j', '𝓀': 'k', '𝓁': 'l',
  '𝓂': 'm', '𝓃': 'n', 'ℴ': 'o', '𝓅': 'p', '𝓆': 'q', '𝓇': 'r',
  '𝓈': 's', '𝓉': 't', '𝓊': 'u', '𝓋': 'v', '𝓌': 'w', '𝓍': 'x',
  '𝓎': 'y', '𝓏': 'z',

  // Angka fancy
  '𝟎': '0', '𝟏': '1', '𝟐': '2', '𝟑': '3', '𝟒': '4',
  '𝟓': '5', '𝟔': '6', '𝟕': '7', '𝟖': '8', '𝟗': '9',

  // Emoji huruf A-Z
  '🅰️': 'a', '🅱️': 'b', '🅲': 'c', '🅳': 'd', '🅴': 'e', '🅵': 'f',
  '🅶': 'g', '🅷': 'h', '🅸': 'i', '🅹': 'j', '🅺': 'k', '🅻': 'l',
  '🅼': 'm', '🅽': 'n', '🅾️': 'o', '🅿️': 'p', '🆀': 'q', '🆁': 'r',
  '🆂': 's', '🆃': 't', '🆄': 'u', '🆅': 'v', '🆆': 'w', '🆇': 'x',
  '🆈': 'y', '🆉': 'z'
};

// Tambahkan versi dengan VARIATION SELECTOR-16 (FE0F)
const VARIATION_SELECTOR = '\uFE0F';
Object.keys(fancyCharMap).forEach((key) => {
  fancyCharMap[key + VARIATION_SELECTOR] = fancyCharMap[key];
});

const replaceFancyLetters = (text) => {
  return splitter.splitGraphemes(text)
    .map(char => fancyCharMap[char] || char)
    .join('');
};

const sanitizeText = (text) => {
  return replaceFancyLetters(
    text
      .normalize('NFKC')                      // Normalisasi bentuk ke "Compatibility"
      .normalize('NFKD')                      // Pisahkan marks
      .replace(/[\u0300-\u036F]/g, '')        // Hilangkan diacritic/combining marks
      .replace(/[\u200B-\u200D\uFEFF]/g, '')  // Hilangkan zero-width dan sejenisnya
  ).replace(/[^\p{L}\p{N}]/gu, '')            // Hilangkan simbol selain huruf dan angka
   .toLowerCase();                            // Kecilkan huruf
};

const containsJudol = (text, bannedWords) => {
  const normalizedText = sanitizeText(text);
  for (const word of bannedWords) {
    if (normalizedText.includes(word)) {
      return word;
    }
  }
  return false;
};

export default containsJudol;
