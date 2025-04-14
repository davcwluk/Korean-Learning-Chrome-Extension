// Gojūon data
const gojuon = {
  hiragana: [
    // Basic gojūon
    ['あ', 'い', 'う', 'え', 'お'],
    ['か', 'き', 'く', 'け', 'こ'],
    ['さ', 'し', 'す', 'せ', 'そ'],
    ['た', 'ち', 'つ', 'て', 'と'],
    ['な', 'に', 'ぬ', 'ね', 'の'],
    ['は', 'ひ', 'ふ', 'へ', 'ほ'],
    ['ま', 'み', 'む', 'め', 'も'],
    ['や', 'ゆ', 'よ'],
    ['ら', 'り', 'る', 'れ', 'ろ'],
    ['わ', 'を', 'ん'],
    // Dakuten (濁点)
    ['が', 'ぎ', 'ぐ', 'げ', 'ご'],
    ['ざ', 'じ', 'ず', 'ぜ', 'ぞ'],
    ['だ', 'ぢ', 'づ', 'で', 'ど'],
    ['ば', 'び', 'ぶ', 'べ', 'ぼ'],
    // Handakuten (半濁点)
    ['ぱ', 'ぴ', 'ぷ', 'ぺ', 'ぽ']
  ],
  katakana: [
    // Basic gojūon
    ['ア', 'イ', 'ウ', 'エ', 'オ'],
    ['カ', 'キ', 'ク', 'ケ', 'コ'],
    ['サ', 'シ', 'ス', 'セ', 'ソ'],
    ['タ', 'チ', 'ツ', 'テ', 'ト'],
    ['ナ', 'ニ', 'ヌ', 'ネ', 'ノ'],
    ['ハ', 'ヒ', 'フ', 'ヘ', 'ホ'],
    ['マ', 'ミ', 'ム', 'メ', 'モ'],
    ['ヤ', 'ユ', 'ヨ'],
    ['ラ', 'リ', 'ル', 'レ', 'ロ'],
    ['ワ', 'ヲ', 'ン'],
    // Dakuten (濁点)
    ['ガ', 'ギ', 'グ', 'ゲ', 'ゴ'],
    ['ザ', 'ジ', 'ズ', 'ゼ', 'ゾ'],
    ['ダ', 'ヂ', 'ヅ', 'デ', 'ド'],
    ['バ', 'ビ', 'ブ', 'ベ', 'ボ'],
    // Handakuten (半濁点)
    ['パ', 'ピ', 'プ', 'ペ', 'ポ']
  ],
  pronunciation: [
    // Basic gojūon
    ['a', 'i', 'u', 'e', 'o'],
    ['ka', 'ki', 'ku', 'ke', 'ko'],
    ['sa', 'shi', 'su', 'se', 'so'],
    ['ta', 'chi', 'tsu', 'te', 'to'],
    ['na', 'ni', 'nu', 'ne', 'no'],
    ['ha', 'hi', 'fu', 'he', 'ho'],
    ['ma', 'mi', 'mu', 'me', 'mo'],
    ['ya', 'yu', 'yo'],
    ['ra', 'ri', 'ru', 're', 'ro'],
    ['wa', 'wo', 'n'],
    // Dakuten (濁点)
    ['ga', 'gi', 'gu', 'ge', 'go'],
    ['za', 'ji', 'zu', 'ze', 'zo'],
    ['da', 'ji', 'zu', 'de', 'do'],
    ['ba', 'bi', 'bu', 'be', 'bo'],
    // Handakuten (半濁点)
    ['pa', 'pi', 'pu', 'pe', 'po']
  ]
};

let currentKana = '';
let previousKana = '';
let currentPronunciation = '';
let showingPronunciation = false;
let isHiragana = true;

// Load saved preference or use default
function loadCharacterSetPreference() {
  const savedPreference = localStorage.getItem('characterSet') || 'both';
  document.getElementById('character-set').value = savedPreference;
  return savedPreference;
}

// Save preference
function saveCharacterSetPreference(value) {
  localStorage.setItem('characterSet', value);
}

// Function to get a random kana that's different from the previous one
function getRandomKana() {
  let newKana;
  let attempts = 0;
  const maxAttempts = 10;
  const characterSet = document.getElementById('character-set').value;

  do {
    // Determine which character set to use based on preference
    if (characterSet === 'both') {
      isHiragana = Math.random() < 0.5;
    } else {
      isHiragana = characterSet === 'hiragana';
    }

    const kanaSet = isHiragana ? gojuon.hiragana : gojuon.katakana;
    
    const row = Math.floor(Math.random() * kanaSet.length);
    const col = Math.floor(Math.random() * kanaSet[row].length);
    
    newKana = kanaSet[row][col];
    currentPronunciation = gojuon.pronunciation[row][col];
    attempts++;
  } while (newKana === currentKana && attempts < maxAttempts);

  // No need to track previousKana anymore since we're comparing with currentKana
  currentKana = newKana;
  
  return currentKana;
}

// Function to display the kana or pronunciation
function displayContent() {
  const kanaElement = document.getElementById('kana');
  const pronunciationElement = document.getElementById('pronunciation');
  const writingSystemElement = document.getElementById('writing-system');
  
  kanaElement.textContent = currentKana;
  
  if (showingPronunciation) {
    pronunciationElement.textContent = currentPronunciation;
  } else {
    pronunciationElement.textContent = '';
  }
  
  writingSystemElement.textContent = isHiragana ? '平仮名' : '片仮名';
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  const kanaElement = document.getElementById('kana');
  const characterSetSelect = document.getElementById('character-set');
  
  // Load saved preference
  loadCharacterSetPreference();
  
  // Get initial kana
  currentKana = getRandomKana();
  displayContent();
  
  // Add click event listener for kana
  kanaElement.addEventListener('click', () => {
    if (showingPronunciation) {
      // If we're showing pronunciation, get a new kana
      showingPronunciation = false;
      currentKana = getRandomKana();
    } else {
      // If we're showing kana, show its pronunciation
      showingPronunciation = true;
    }
    displayContent();
  });

  // Add change event listener for character set selection
  characterSetSelect.addEventListener('change', (event) => {
    saveCharacterSetPreference(event.target.value);
    showingPronunciation = false;
    currentKana = getRandomKana();
    displayContent();
  });
}); 