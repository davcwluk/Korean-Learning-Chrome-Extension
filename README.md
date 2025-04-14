# Hangul Study - Korean Character Learning Extension

A Chrome extension designed for learning Korean characters (Hangul) through active recall. Perfect for practicing Korean syllables during work breaks or study sessions.

## Features

- **Complete Character Coverage**:
  - Consonants (초성): ㄱ, ㄲ, ㄴ, ㄷ, ㄸ, ㄹ, ㅁ, ㅂ, ㅃ, ㅅ, ㅆ, ㅇ, ㅈ, ㅉ, ㅊ, ㅋ, ㅌ, ㅍ, ㅎ
  - Vowels (중성): ㅏ, ㅐ, ㅑ, ㅒ, ㅓ, ㅔ, ㅕ, ㅖ, ㅗ, ㅘ, ㅙ, ㅚ, ㅛ, ㅜ, ㅝ, ㅞ, ㅟ, ㅠ, ㅡ, ㅢ, ㅣ
  - Final consonants (종성): All possible batchim combinations

- **Smart Learning Algorithm**:
  - Focuses on common Korean syllables that appear in everyday usage
  - Uses frequency weighting to prioritize learning common character combinations
  - Provides both pronunciation guides and proper romanization
  - No repeated characters in consecutive displays

- **User-Friendly Interface**:
  - Clean, minimalist design
  - Click once to reveal pronunciation and romanization
  - Click again for a new character
  - Shows both syllable breakdown and Revised Romanization

## Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/[your-username]/hangul-study.git
   ```

2. Open Chrome and navigate to `chrome://extensions/`

3. Enable "Developer mode" in the top right corner

4. Click "Load unpacked" and select the cloned directory

## Usage

1. Click the extension icon in your Chrome toolbar
2. Click the displayed Hangul syllable to see its pronunciation breakdown and romanization
3. Click again to get a new random syllable
4. Practice regularly during work breaks!

## Syllable Generation

The extension uses a hybrid approach to generate Hangul syllables:

- **70% Common Syllables**: Draws from a curated list of frequently used Korean syllables from everyday words
- **30% Weighted Components**: Dynamically generates syllables using frequency-weighted consonants and vowels
- Each syllable shows proper pronunciation breakdown with initial consonant, vowel, and final consonant (if present)

## Korean Pronunciation Guide

The extension follows the official Revised Romanization of Korean:

- Initial consonants: ㄱ (g/k), ㄴ (n), ㄷ (d/t), etc.
- Vowels: ㅏ (a), ㅓ (eo), ㅣ (i), etc.
- Final consonants: ㄱ (k), ㄴ (n), ㄹ (l), etc.
- Combined into proper romanization following official rules

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Inspired by the need for active recall practice in learning Korean Hangul
- Built for Korean language learners who want to practice during short breaks
- Uses the Revised Romanization of Korean for accurate pronunciation representation
