// Basic Hangul components for syllable construction
const choseong = ['ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];
const jungseong = ['ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ', 'ㅕ', 'ㅖ', 'ㅗ', 'ㅘ', 'ㅙ', 'ㅚ', 'ㅛ', 'ㅜ', 'ㅝ', 'ㅞ', 'ㅟ', 'ㅠ', 'ㅡ', 'ㅢ', 'ㅣ'];
const jongseong = ['', 'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ', 'ㄷ', 'ㄹ', 'ㄺ', 'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ', 'ㄿ', 'ㅀ', 'ㅁ', 'ㅂ', 'ㅄ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];

// Weighted frequency for common initial consonants
const commonChoseong = {
  'ㄱ': 20, 'ㄴ': 18, 'ㄷ': 15, 'ㄹ': 10, 'ㅁ': 12, 'ㅂ': 12, 
  'ㅅ': 15, 'ㅇ': 20, 'ㅈ': 12, 'ㅊ': 10, 'ㅋ': 5, 'ㅌ': 5, 
  'ㅍ': 5, 'ㅎ': 10, 'ㄲ': 3, 'ㄸ': 3, 'ㅃ': 3, 'ㅆ': 5, 'ㅉ': 2
};

// Weighted frequency for common vowels
const commonJungseong = {
  'ㅏ': 20, 'ㅐ': 10, 'ㅑ': 5, 'ㅒ': 1, 'ㅓ': 18, 'ㅔ': 10, 
  'ㅕ': 8, 'ㅖ': 3, 'ㅗ': 15, 'ㅘ': 2, 'ㅙ': 1, 'ㅚ': 3, 
  'ㅛ': 5, 'ㅜ': 15, 'ㅝ': 2, 'ㅞ': 1, 'ㅟ': 2, 'ㅠ': 5, 
  'ㅡ': 10, 'ㅢ': 3, 'ㅣ': 18
};

// Weighted frequency for common final consonants (including none)
const commonJongseong = {
  '': 40, 'ㄱ': 15, 'ㄴ': 18, 'ㄷ': 5, 'ㄹ': 10, 'ㅁ': 10, 
  'ㅂ': 8, 'ㅅ': 5, 'ㅇ': 18, 'ㅈ': 2, 'ㅊ': 2, 'ㅋ': 1, 
  'ㅌ': 1, 'ㅍ': 1, 'ㅎ': 2, 'ㄲ': 1, 'ㄳ': 1, 'ㄵ': 1, 
  'ㄶ': 1, 'ㄺ': 1, 'ㄻ': 1, 'ㄼ': 1, 'ㄽ': 1, 'ㄾ': 1, 
  'ㄿ': 1, 'ㅀ': 1, 'ㅄ': 1, 'ㅆ': 1
};

// Common syllable combinations (actual common Korean syllables)
const commonSyllables = [
  // Pronouns and common words
  { cho: 'ㄴ', jung: 'ㅏ', jong: '' }, // 나 (I)
  { cho: 'ㄴ', jung: 'ㅓ', jong: '' }, // 너 (you)
  { cho: 'ㅇ', jung: 'ㅜ', jong: 'ㄹ' }, // 울 (crying)
  { cho: 'ㅈ', jung: 'ㅓ', jong: '' }, // 저 (I, humble)
  { cho: 'ㄱ', jung: 'ㅡ', jong: '' }, // 그 (that)
  { cho: 'ㅇ', jung: 'ㅣ', jong: '' }, // 이 (this)
  { cho: 'ㄱ', jung: 'ㅓ', jong: '' }, // 거 (that thing)
  { cho: 'ㅁ', jung: 'ㅜ', jong: 'ㅅ' }, // 뭇 (what)
  { cho: 'ㅇ', jung: 'ㅓ', jong: 'ㄴ' }, // 언 (speech)
  { cho: 'ㄱ', jung: 'ㅏ', jong: '' }, // 가 (go)
  
  // Common syllables from frequent words
  { cho: 'ㅎ', jung: 'ㅏ', jong: 'ㄴ' }, // 한 (one)
  { cho: 'ㄷ', jung: 'ㅏ', jong: '' }, // 다 (all)
  { cho: 'ㅅ', jung: 'ㅏ', jong: 'ㄹ' }, // 살 (live)
  { cho: 'ㅁ', jung: 'ㅏ', jong: 'ㄴ' }, // 만 (ten thousand)
  { cho: 'ㅈ', jung: 'ㅜ', jong: 'ㄹ' }, // 줄 (line)
  { cho: 'ㅂ', jung: 'ㅏ', jong: 'ㅂ' }, // 밥 (rice)
  { cho: 'ㅇ', jung: 'ㅣ', jong: 'ㄹ' }, // 일 (work)
  { cho: 'ㅅ', jung: 'ㅓ', jong: 'ㄹ' }, // 설 (snow)
  { cho: 'ㅁ', jung: 'ㅓ', jong: 'ㄴ' }, // 먼 (far)
  { cho: 'ㅎ', jung: 'ㅏ', jong: 'ㄹ' }, // 할 (do)
  { cho: 'ㅊ', jung: 'ㅏ', jong: '' }, // 차 (car/tea)
  { cho: 'ㅁ', jung: 'ㅏ', jong: 'ㄹ' }, // 말 (word)
  { cho: 'ㅂ', jung: 'ㅜ', jong: 'ㄹ' }, // 불 (fire)
  { cho: 'ㅅ', jung: 'ㅜ', jong: 'ㄹ' }, // 술 (alcohol)
  { cho: 'ㅅ', jung: 'ㅏ', jong: 'ㅇ' }, // 상 (table)
  { cho: 'ㅈ', jung: 'ㅏ', jong: 'ㅇ' }, // 장 (long)
  { cho: 'ㅇ', jung: 'ㅏ', jong: 'ㅂ' }, // 압 (pressure)
  { cho: 'ㅇ', jung: 'ㅏ', jong: 'ㄴ' }, // 안 (inside)
  { cho: 'ㄱ', jung: 'ㅓ', jong: 'ㅇ' }, // 경 (respect)
  { cho: 'ㅅ', jung: 'ㅣ', jong: 'ㄹ' }, // 실 (thread)
  
  // Common ending syllables
  { cho: 'ㅇ', jung: 'ㅛ', jong: '' }, // 요 (politeness marker)
  { cho: 'ㄷ', jung: 'ㅏ', jong: '' }, // 다 (statement ending)
  { cho: 'ㄱ', jung: 'ㅓ', jong: '' }, // 거 (casual ending)
  { cho: 'ㅈ', jung: 'ㅣ', jong: '' }, // 지 (question/statement)
  { cho: 'ㄴ', jung: 'ㅣ', jong: 'ㄷ' }, // 닛 (past tense)
  { cho: 'ㅁ', jung: 'ㅕ', jong: 'ㄴ' }, // 면 (if condition)
  { cho: 'ㄱ', jung: 'ㅗ', jong: '' }  // 고 (and then)
];

// Indices for the components in Unicode calculations
const choseongIndex = {
  'ㄱ': 0, 'ㄲ': 1, 'ㄴ': 2, 'ㄷ': 3, 'ㄸ': 4, 'ㄹ': 5, 'ㅁ': 6, 'ㅂ': 7, 'ㅃ': 8,
  'ㅅ': 9, 'ㅆ': 10, 'ㅇ': 11, 'ㅈ': 12, 'ㅉ': 13, 'ㅊ': 14, 'ㅋ': 15, 'ㅌ': 16,
  'ㅍ': 17, 'ㅎ': 18
};

const jungseongIndex = {
  'ㅏ': 0, 'ㅐ': 1, 'ㅑ': 2, 'ㅒ': 3, 'ㅓ': 4, 'ㅔ': 5, 'ㅕ': 6, 'ㅖ': 7,
  'ㅗ': 8, 'ㅘ': 9, 'ㅙ': 10, 'ㅚ': 11, 'ㅛ': 12, 'ㅜ': 13, 'ㅝ': 14,
  'ㅞ': 15, 'ㅟ': 16, 'ㅠ': 17, 'ㅡ': 18, 'ㅢ': 19, 'ㅣ': 20
};

const jongseongIndex = {
  '': 0, 'ㄱ': 1, 'ㄲ': 2, 'ㄳ': 3, 'ㄴ': 4, 'ㄵ': 5, 'ㄶ': 6, 'ㄷ': 7,
  'ㄹ': 8, 'ㄺ': 9, 'ㄻ': 10, 'ㄼ': 11, 'ㄽ': 12, 'ㄾ': 13, 'ㄿ': 14,
  'ㅀ': 15, 'ㅁ': 16, 'ㅂ': 17, 'ㅄ': 18, 'ㅅ': 19, 'ㅆ': 20, 'ㅇ': 21,
  'ㅈ': 22, 'ㅊ': 23, 'ㅋ': 24, 'ㅌ': 25, 'ㅍ': 26, 'ㅎ': 27
};

// Revised Romanization mappings
const romanInitial = {
  'ㄱ': 'g', 'ㄲ': 'kk', 'ㄴ': 'n', 'ㄷ': 'd', 'ㄸ': 'tt',
  'ㄹ': 'r', 'ㅁ': 'm', 'ㅂ': 'b', 'ㅃ': 'pp', 'ㅅ': 's',
  'ㅆ': 'ss', 'ㅇ': '', 'ㅈ': 'j', 'ㅉ': 'jj', 'ㅊ': 'ch',
  'ㅋ': 'k', 'ㅌ': 't', 'ㅍ': 'p', 'ㅎ': 'h'
};

const romanVowel = {
  'ㅏ': 'a', 'ㅐ': 'ae', 'ㅑ': 'ya', 'ㅒ': 'yae', 'ㅓ': 'eo',
  'ㅔ': 'e', 'ㅕ': 'yeo', 'ㅖ': 'ye', 'ㅗ': 'o', 'ㅘ': 'wa',
  'ㅙ': 'wae', 'ㅚ': 'oe', 'ㅛ': 'yo', 'ㅜ': 'u', 'ㅝ': 'wo',
  'ㅞ': 'we', 'ㅟ': 'wi', 'ㅠ': 'yu', 'ㅡ': 'eu', 'ㅢ': 'ui',
  'ㅣ': 'i'
};

const romanFinal = {
  '': '', 'ㄱ': 'k', 'ㄲ': 'k', 'ㄳ': 'k', 'ㄴ': 'n', 'ㄵ': 'n',
  'ㄶ': 'n', 'ㄷ': 't', 'ㄹ': 'l', 'ㄺ': 'k', 'ㄻ': 'm', 'ㄼ': 'l',
  'ㄽ': 'l', 'ㄾ': 'l', 'ㄿ': 'p', 'ㅀ': 'l', 'ㅁ': 'm', 'ㅂ': 'p',
  'ㅄ': 'p', 'ㅅ': 't', 'ㅆ': 't', 'ㅇ': 'ng', 'ㅈ': 't', 'ㅊ': 't',
  'ㅋ': 'k', 'ㅌ': 't', 'ㅍ': 'p', 'ㅎ': 't'
};

// Function to create a valid Hangul syllable
function createHangulSyllable(cho, jung, jong = '') {
  // Get indices for Unicode calculation
  const choIndex = choseongIndex[cho];
  const jungIndex = jungseongIndex[jung];
  const jongIndex = jongseongIndex[jong];

  // Validate indices
  if (choIndex === undefined || jungIndex === undefined || jongIndex === undefined) {
    console.error('Invalid Hangul components:', cho, jung, jong);
    return null;
  }

  // Calculate Unicode value for the syllable
  const syllableCode = 0xAC00 + (choIndex * 21 + jungIndex) * 28 + jongIndex;
  return String.fromCharCode(syllableCode);
}

// Function to get proper pronunciation
function getPronunciation(cho, jung, jong = '') {
  const parts = [];
  
  // Initial consonant (except silent ㅇ)
  if (cho !== 'ㅇ') {
    parts.push(romanInitial[cho]);
  }
  
  // Vowel
  parts.push(romanVowel[jung]);
  
  // Final consonant
  if (jong) {
    parts.push(romanFinal[jong]);
  }
  
  return parts.join('/');
}

// Function to get proper romanization
function getRomanization(cho, jung, jong = '') {
  let roman = '';
  
  // Initial consonant (except silent ㅇ at the beginning)
  if (cho !== 'ㅇ') {
    roman += romanInitial[cho];
  }
  
  // Vowel - directly use the vowel mapping
  roman += romanVowel[jung];
  
  // Final consonant
  if (jong) {
    roman += romanFinal[jong];
  }
  
  return roman;
}

// Function to verify a generated syllable and its romanization
function validateSyllable(syllable, cho, jung, jong = '') {
  // Get the Unicode codepoint
  const code = syllable.charCodeAt(0);
  
  // Check if it's in the valid Hangul syllable range
  if (code < 0xAC00 || code > 0xD7A3) {
    console.error('Invalid Hangul syllable:', syllable, cho, jung, jong);
    return false;
  }
  
  // Double-check romanization
  const romanized = getRomanization(cho, jung, jong);
  if (!romanized) {
    console.error('Failed to romanize:', syllable, cho, jung, jong);
    return false;
  }
  
  return true;
}

// Helper function to randomly select an item based on weights
function weightedRandom(weights) {
  // Calculate total weight
  let totalWeight = 0;
  for (const key in weights) {
    totalWeight += weights[key];
  }
  
  // Generate a random number between 0 and totalWeight
  const random = Math.random() * totalWeight;
  
  // Find the selected item
  let currentWeight = 0;
  for (const key in weights) {
    currentWeight += weights[key];
    if (random <= currentWeight) {
      return key;
    }
  }
  
  // Fallback (should not reach here)
  return Object.keys(weights)[0];
}

// Function to get a weighted random syllable component
function getCommonChoseong() {
  return weightedRandom(commonChoseong);
}

function getCommonJungseong() {
  return weightedRandom(commonJungseong);
}

function getCommonJongseong() {
  return weightedRandom(commonJongseong);
}

let currentCharacter = '';
let currentPronunciation = '';
let currentRomanization = '';
let showingPronunciation = false;

// Function to get a random syllable that is not the same as the current one
function getRandomSyllable() {
  let newChar = '';
  let cho, jung, jong;
  let attempts = 0;
  const maxAttempts = 10;
  
  do {
    // 70% chance to use a predefined common syllable
    if (Math.random() < 0.7 && commonSyllables.length > 0) {
      const commonIndex = Math.floor(Math.random() * commonSyllables.length);
      const common = commonSyllables[commonIndex];
      cho = common.cho;
      jung = common.jung;
      jong = common.jong;
    } else {
      // 30% chance to generate using weighted components
      cho = getCommonChoseong();
      jung = getCommonJungseong();
      jong = getCommonJongseong();
    }
    
    newChar = createHangulSyllable(cho, jung, jong);
    if (newChar) {
      currentPronunciation = getPronunciation(cho, jung, jong);
      currentRomanization = getRomanization(cho, jung, jong);
    }
    
    attempts++;
  } while ((newChar === currentCharacter || !newChar) && attempts < maxAttempts);

  currentCharacter = newChar;
  return currentCharacter;
}

// Function to display the character, its pronunciation, and romanization
function displayContent() {
  const characterElement = document.getElementById('character');
  const pronunciationElement = document.getElementById('pronunciation');
  const romanizationElement = document.getElementById('romanization');

  characterElement.textContent = currentCharacter;
  pronunciationElement.textContent = showingPronunciation ? currentPronunciation : '';
  romanizationElement.textContent = showingPronunciation ? currentRomanization : '';
}

// Initialize the extension
document.addEventListener('DOMContentLoaded', () => {
  const characterElement = document.getElementById('character');

  // Get initial syllable and display it
  currentCharacter = getRandomSyllable();
  displayContent();

  // On click, toggle between showing pronunciation and getting a new syllable
  characterElement.addEventListener('click', () => {
    if (showingPronunciation) {
      showingPronunciation = false;
      currentCharacter = getRandomSyllable();
    } else {
      showingPronunciation = true;
    }
    displayContent();
  });
});