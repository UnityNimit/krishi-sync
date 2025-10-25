# i18n Quick Start Guide

## 🚀 Quick Start

### Using Translations in Your Component

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

## 📚 Available Translation Keys

### Common UI Elements
```
common.welcome
common.save
common.cancel
common.submit
common.edit
common.delete
common.search
common.filter
common.loading
common.error
common.success
common.yes
common.no
```

### Navigation
```
navigation.dashboard
navigation.marketplace
navigation.stakeholders
navigation.cropAdvisory
navigation.creditInsurance
navigation.traceability
navigation.policymaker
```

### Dashboard
```
dashboard.title
dashboard.overview
dashboard.quickActions
dashboard.recentActivity
dashboard.notifications
dashboard.weatherForecast
dashboard.marketPrices
dashboard.totalFarmers
dashboard.totalProduction
```

### Marketplace
```
marketplace.title
marketplace.buyNow
marketplace.addToCart
marketplace.products
marketplace.price
marketplace.quantity
marketplace.available
```

### Stakeholders
```
stakeholders.farmer
stakeholders.fpo
stakeholders.processor
stakeholders.retailer
stakeholders.wholesaler
stakeholders.logistics
stakeholders.government
stakeholders.bank
```

### Messages
```
messages.saveSuccess
messages.saveError
messages.deleteSuccess
messages.updateSuccess
messages.networkError
messages.unauthorized
```

## 🌍 Language Codes

| Code | Language | Native Name |
|------|----------|-------------|
| en   | English  | English     |
| hi   | Hindi    | हिन्दी      |
| mr   | Marathi  | मराठी       |
| te   | Telugu   | తెలుగు      |
| ta   | Tamil    | தமிழ்       |
| gu   | Gujarati | ગુજરાતી     |
| ur   | Urdu     | اردو        |
| kn   | Kannada  | ಕನ್ನಡ      |
| or   | Odia     | ଓଡ଼ିଆ       |
| bn   | Bengali  | বাংলা       |
| ml   | Malayalam| മലയാളം      |

## 🔧 Common Patterns

### Get Current Language
```tsx
const { i18n } = useTranslation()
const currentLang = i18n.language
```

### Change Language Programmatically
```tsx
const { i18n } = useTranslation()
i18n.changeLanguage('hi')
```

### Check if RTL
```tsx
const { i18n } = useTranslation()
const isRTL = i18n.language === 'ur'
```

## 📂 File Locations

- **Translation Files**: `/src/i18n/locales/[lang]/common.json`
- **i18n Config**: `/src/i18n/config.ts`
- **Language Switcher**: `/src/components/LanguageSwitcher.tsx`
- **Documentation**: `MULTILINGUAL_FEATURE.md`, `I18N_USAGE_EXAMPLES.md`

## 🎯 For SIH Demo

1. Start with English interface
2. Click globe icon in top bar
3. Select हिन्दी (Hindi) to demonstrate
4. Show all 11 languages in dropdown
5. Mention "More coming soon..."
6. Highlight RTL support (Urdu)

## ⚠️ Important Notes

- Always use `t()` for user-facing text
- Translation keys are case-sensitive
- Language preference is saved automatically
- RTL automatically applied for Urdu
- Fonts load automatically for all scripts

## 🐛 Troubleshooting

**Translations not appearing?**
- Check if translation key exists in `/src/i18n/locales/en/common.json`
- Verify you're using `useTranslation()` hook
- Check browser console for i18n warnings

**Language not persisting?**
- Check localStorage for 'language' key
- Clear localStorage and try again

**RTL not working?**
- Switch to Urdu language
- Check HTML element has `dir="rtl"` attribute
- Verify in browser dev tools

## 📖 More Resources

- Full Documentation: `MULTILINGUAL_FEATURE.md`
- Usage Examples: `I18N_USAGE_EXAMPLES.md`
- Implementation Details: `I18N_IMPLEMENTATION_SUMMARY.md`
