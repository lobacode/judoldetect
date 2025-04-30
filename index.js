import GraphemeSplitter from "grapheme-splitter";

const splitter = new GraphemeSplitter();

// Peta karakter huruf fancy ke huruf biasa (A-Z dan 0-9)
const fancyCharMap = {
  // Cyrillic -> Latin (Uppercase)
  'А': 'A', 'Б': '6', 'В': 'B', 'Г': 'R', 'Д': 'A', 'Е': 'E', 'Ё': 'E', 'Ж': 'X', 'З': '3',
  'И': 'N', 'Й': 'N', 'К': 'K', 'Л': 'L', 'М': 'M', 'Н': 'N', 'О': 'O', 'П': 'P', 'Р': 'P',
  'С': 'C', 'Т': 'T', 'У': 'Y', 'Ф': 'O', 'Х': 'X', 'Ц': 'U', 'Ч': 'Y', 'Ш': 'SH', 'Щ': 'W',
  'Ы': 'Y', 'Э': '3', 'Ю': 'O', 'Я': 'R',

  // Cyrillic -> Latin (Lowercase)
  'а': 'a', 'б': '6', 'в': 'b', 'г': 'r', 'д': 'a', 'е': 'e', 'ё': 'e', 'ж': 'x', 'з': '3',
  'и': 'i', 'й': 'i', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o', 'п': 'p', 'р': 'p',
  'с': 'c', 'т': 't', 'у': 'y', 'ф': 'o', 'х': 'x', 'ц': 'u', 'ч': 'Y', 'ш': 'w', 'щ': 'w',
  'ы': 'y', 'э': '3', 'ю': 'O', 'я': 'r',

  // Huruf A-Z
  'ᗩ': 'a', 'ᗷ': 'b', 'ᑕ': 'c', 'ᗪ': 'd', 'ᗴ': 'e', 'ᖴ': 'f',
  'ᘜ': 'g', 'ᕼ': 'h', 'Ꮖ': 'i', 'ᒍ': 'j', 'ᛕ': 'k', 'ᒪ': 'l',
  'ᗰ': 'm', 'ᑎ': 'n', 'ᗝ': 'o', 'ᝪ': 'o', 'ᑭ': 'p', 'ᑫ': 'q',
  'ᖇ': 'r', 'ᔕ': 's', 'ᑦ': 't', 'ᑌ': 'u', 'ᐯ': 'v', 'ᗯ': 'w',
  '᙭': 'x', 'ᖻ': 'y', 'ᘔ': 'z',
  '𝗔': 'a', '𝗕': 'b', '𝗖': 'c', '𝗗': 'd', '𝗘': 'e', '𝗙': 'f',
  '𝗚': 'g', '𝗛': 'h', '𝗜': 'i', '𝗝': 'j', '𝗞': 'k', '𝗟': 'l',
  '𝗠': 'm', '𝗡': 'n', '𝗢': 'o', '𝗣': 'p', '𝗤': 'q', '𝗥': 'r',
  '𝗦': 's', '𝗧': 't', '𝗨': 'u', '𝗩': 'v', '𝗪': 'w', '𝗫': 'x',
  '𝗬': 'y', '𝗭': 'z',
  '𝒫': 'p', '𝒰': 'u', '𝐿': 'l', '𝒜': 'a',

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

const normalizeText = (text) => {
  // Normalisasi unicode NFKC supaya angka aneh jadi normal
  let normalized = text.normalize("NFKC");

  // Normalisasi fancy dan emoji karakter
  normalized = replaceFancyLetters(normalized);
  
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
