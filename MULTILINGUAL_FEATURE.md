# Multilingual Support Documentation

## Overview
The AgriAdvisory platform now supports 11 languages covering 10+ Indian regional languages, providing accessibility to farmers across different states of India.

## Supported Languages

1. **English** (en) - Default
2. **Hindi** (hi) - हिन्दी
3. **Marathi** (mr) - मराठी
4. **Telugu** (te) - తెలుగు
5. **Tamil** (ta) - தமிழ்
6. **Gujarati** (gu) - ગુજરાતી
7. **Urdu** (ur) - اردو (RTL support)
8. **Kannada** (kn) - ಕನ್ನಡ
9. **Odia** (or) - ଓଡ଼ିଆ
10. **Bengali** (bn) - বাংলা
11. **Malayalam** (ml) - മലയാളം

## Features Implemented

### 1. Language Switcher Component
- Located in the top navigation bar
- Displays current language in native script
- Dropdown menu showing all available languages
- "More coming soon..." message at the bottom
- Persists language selection in localStorage
- Smooth transition without page reload

### 2. Translation Coverage
All major UI elements have been translated including:
- Navigation menu items
- Dashboard labels and metrics
- Common buttons (Save, Cancel, Submit, etc.)
- Form labels and placeholders
- Error and success messages
- Stakeholder role names
- Feature descriptions

### 3. RTL Support for Urdu
- Automatic direction change to RTL when Urdu is selected
- Proper layout mirroring
- Urdu-specific font (Noto Nastaliq Urdu)

### 4. Font Support
Google Fonts integration with Noto Sans family:
- Noto Sans (base)
- Noto Sans Devanagari (Hindi, Marathi)
- Noto Sans Tamil
- Noto Sans Telugu
- Noto Sans Gujarati
- Noto Sans Kannada
- Noto Sans Bengali
- Noto Sans Malayalam
- Noto Sans Oriya (Odia)
- Noto Nastaliq Urdu

## How to Use Translations in Components

### Basic Usage

```tsx
import { useTranslation } from 'react-i18next'

function MyComponent() {
  const { t } = useTranslation()
  
  return (
    <div>
      <h1>{t('dashboard.title')}</h1>
      <button>{t('common.save')}</button>
    </div>
  )
}
```

### With Interpolation

```tsx
const { t } = useTranslation()

// In translation file: "greeting": "Hello, {{name}}!"
<p>{t('greeting', { name: 'Farmer' })}</p>
```

### Accessing Nested Keys

```tsx
const { t } = useTranslation()

// Access nested translation keys
<p>{t('navigation.dashboard')}</p>
<p>{t('language.languages.hi')}</p>
```

## Translation File Structure

```
/src/i18n
  /locales
    /en
      common.json
    /hi
      common.json
    ... (other languages)
  config.ts
```

Each language file (`common.json`) contains:
- `appName`: Application name
- `navigation`: Navigation menu items
- `common`: Common UI elements
- `dashboard`: Dashboard-related translations
- `marketplace`: Marketplace translations
- `stakeholders`: Stakeholder types
- `cropAdvisory`: Crop advisory translations
- `creditInsurance`: Credit & insurance translations
- `traceability`: Traceability translations
- `policymaker`: Policymaker dashboard translations
- `language`: Language switcher text
- `messages`: Success/error messages

## Adding New Translations

### 1. Add to Translation Files
Add new keys to `/src/i18n/locales/[language]/common.json`:

```json
{
  "newFeature": {
    "title": "New Feature Title",
    "description": "Feature description"
  }
}
```

### 2. Use in Components
```tsx
const { t } = useTranslation()
<h2>{t('newFeature.title')}</h2>
<p>{t('newFeature.description')}</p>
```

## Adding New Languages

### 1. Create Translation File
Create `/src/i18n/locales/[language-code]/common.json` with all required keys.

### 2. Update Config
Add to `/src/i18n/config.ts`:

```typescript
import newLang from './locales/[language-code]/common.json'

export const resources = {
  // ... existing languages
  [languageCode]: { translation: newLang }
}
```

### 3. Update Language Switcher
Add to `/src/components/LanguageSwitcher.tsx`:

```typescript
const languages: Language[] = [
  // ... existing languages
  { code: 'xx', name: 'Language Name', nativeName: 'नेटिव नाम' }
]
```

## Testing Checklist

- [x] Language switcher appears on all pages
- [x] Switching language updates entire UI
- [x] Language preference persists on page reload
- [x] All major UI elements translated
- [x] No broken layouts in any language
- [x] Urdu displays correctly (RTL)
- [x] Fonts render properly for all scripts
- [x] Forms work in all languages
- [x] No text overflow issues with longer translations

## Demo Strategy for SIH

1. **Default Display**: Start with English to show professional UI
2. **Language Demonstration**: 
   - Switch to Hindi to demonstrate local language support
   - Show the language dropdown with all 11 languages
3. **Key Points to Mention**:
   - Support for 10+ Indian languages
   - Covers 90%+ of Indian farmers
   - RTL support for Urdu
   - "More coming soon" shows commitment to expansion
4. **Impact Statement**: 
   - Demonstrates understanding of target audience
   - Shows commitment to accessibility and inclusion
   - Aligns with Digital India initiative
   - Practical, real-world thinking beyond just technology

## Technical Implementation Details

### i18n Configuration
- **Library**: react-i18next + i18next
- **Language Detection**: Browser + localStorage
- **Fallback**: English (en)
- **Persistence**: localStorage

### Performance Considerations
- Translation files loaded with main bundle
- Font loading optimized with preconnect
- Language switch requires no page reload
- Minimal performance impact

## Future Enhancements

1. Add more regional languages (Punjabi, Assamese, etc.)
2. Implement lazy loading for translation files
3. Add professional translation review
4. Context-specific agricultural terminology
5. Voice-based language selection
6. Multi-language content for AI-generated advisories

## Support

For issues or questions about the multilingual feature:
1. Check translation files for missing keys
2. Verify font loading in browser dev tools
3. Check localStorage for 'language' key
4. Test RTL support by switching to Urdu

## Accessibility Notes

- All language options are keyboard accessible
- Screen reader support included
- Color contrast maintained in all languages
- Font sizes optimized for readability in all scripts
- ARIA labels provided for language switcher
