# i18n Usage Examples

This document provides practical examples of how to use the multilingual system in different components.

## Basic Component Translation

```tsx
import { useTranslation } from 'react-i18next'

function DashboardCard() {
  const { t } = useTranslation()
  
  return (
    <div className="card">
      <h2>{t('dashboard.title')}</h2>
      <p>{t('dashboard.overview')}</p>
      <button>{t('common.save')}</button>
    </div>
  )
}
```

## Navigation with Translations

The navigation items are already translated in the Topbar component. When you define navigation items, make sure they have an `id` field that corresponds to a translation key:

```tsx
// In config/navigation.ts
{
  id: 'dashboard',        // Translation key: navigation.dashboard
  label: 'Dashboard',     // Fallback if translation not found
  path: '/',
  icon: Home
}

// In Topbar.tsx, this is rendered as:
{t(`navigation.${item.id}`) || item.label}
```

## Form Translations

```tsx
import { useTranslation } from 'react-i18next'

function FarmerForm() {
  const { t } = useTranslation()
  
  return (
    <form>
      <div>
        <label>{t('stakeholders.farmer')}</label>
        <input 
          type="text" 
          placeholder={t('common.search')}
        />
      </div>
      
      <div className="flex gap-2">
        <button type="submit">
          {t('common.submit')}
        </button>
        <button type="button">
          {t('common.cancel')}
        </button>
      </div>
    </form>
  )
}
```

## Success/Error Messages

```tsx
import { useTranslation } from 'react-i18next'
import { useNotification } from '../hooks/useNotification'

function DataSubmitComponent() {
  const { t } = useTranslation()
  const { showNotification } = useNotification()
  
  const handleSave = async () => {
    try {
      await saveData()
      showNotification('success', t('messages.saveSuccess'))
    } catch (error) {
      showNotification('error', t('messages.saveError'))
    }
  }
  
  return (
    <button onClick={handleSave}>
      {t('common.save')}
    </button>
  )
}
```

## Page Title Translation

```tsx
import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'

function MarketplacePage() {
  const { t } = useTranslation()
  
  useEffect(() => {
    document.title = `${t('marketplace.title')} - ${t('appName')}`
  }, [t])
  
  return (
    <div>
      <h1>{t('marketplace.title')}</h1>
      <div className="products">
        <h2>{t('marketplace.featured')}</h2>
        {/* Product cards */}
      </div>
    </div>
  )
}
```

## Conditional Text Based on Language

```tsx
import { useTranslation } from 'react-i18next'

function LanguageSpecificContent() {
  const { t, i18n } = useTranslation()
  
  const isRTL = i18n.language === 'ur'
  const currentLang = i18n.language
  
  return (
    <div dir={isRTL ? 'rtl' : 'ltr'}>
      <p>{t('language.currentLanguage')}: {currentLang}</p>
      
      {/* Show different content based on language */}
      {currentLang === 'hi' && (
        <div>भारत में किसानों के लिए विशेष सामग्री</div>
      )}
    </div>
  )
}
```

## Dashboard Statistics with Translations

```tsx
import { useTranslation } from 'react-i18next'

function StatsGrid() {
  const { t } = useTranslation()
  
  const stats = [
    {
      label: t('dashboard.totalFarmers'),
      value: '12,543',
      icon: Users
    },
    {
      label: t('dashboard.totalProduction'),
      value: '45,231 tons',
      icon: Package
    },
    {
      label: t('dashboard.activeTransactions'),
      value: '234',
      icon: Activity
    },
    {
      label: t('dashboard.revenue'),
      value: '₹2.4M',
      icon: TrendingUp
    }
  ]
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div key={stat.label} className="card">
          <stat.icon className="h-8 w-8 text-primary-600" />
          <p className="text-2xl font-bold">{stat.value}</p>
          <p className="text-sm text-gray-600">{stat.label}</p>
        </div>
      ))}
    </div>
  )
}
```

## Stakeholder Selection Dropdown

```tsx
import { useTranslation } from 'react-i18next'

function StakeholderSelector() {
  const { t } = useTranslation()
  
  const stakeholderTypes = [
    'farmer',
    'fpo',
    'processor',
    'retailer',
    'wholesaler',
    'logistics',
    'government',
    'bank'
  ]
  
  return (
    <select>
      <option value="">{t('stakeholders.title')}</option>
      {stakeholderTypes.map((type) => (
        <option key={type} value={type}>
          {t(`stakeholders.${type}`)}
        </option>
      ))}
    </select>
  )
}
```

## Table Headers with Translations

```tsx
import { useTranslation } from 'react-i18next'

function ProductsTable() {
  const { t } = useTranslation()
  
  return (
    <table>
      <thead>
        <tr>
          <th>{t('marketplace.products')}</th>
          <th>{t('marketplace.category')}</th>
          <th>{t('marketplace.price')}</th>
          <th>{t('marketplace.quantity')}</th>
          <th>{t('common.actions')}</th>
        </tr>
      </thead>
      <tbody>
        {/* Table rows */}
      </tbody>
    </table>
  )
}
```

## Alert Messages

```tsx
import { useTranslation } from 'react-i18next'

function WeatherAlert() {
  const { t } = useTranslation()
  
  return (
    <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <AlertTriangle className="h-5 w-5 text-yellow-500" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-yellow-800">
            {t('cropAdvisory.weatherAlert')}
          </h3>
          <div className="mt-2 text-sm text-yellow-700">
            <p>{t('cropAdvisory.recommendations')}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
```

## Modal Dialog with Translations

```tsx
import { useTranslation } from 'react-i18next'

function ConfirmationModal({ isOpen, onClose, onConfirm }) {
  const { t } = useTranslation()
  
  if (!isOpen) return null
  
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{t('common.confirm')}</h2>
        <p>{t('messages.deleteConfirm')}</p>
        
        <div className="flex gap-2 mt-4">
          <button onClick={onConfirm}>
            {t('common.yes')}
          </button>
          <button onClick={onClose}>
            {t('common.no')}
          </button>
        </div>
      </div>
    </div>
  )
}
```

## Programmatically Changing Language

```tsx
import { useTranslation } from 'react-i18next'

function LanguageChanger() {
  const { i18n } = useTranslation()
  
  const changeLanguage = (langCode: string) => {
    i18n.changeLanguage(langCode)
    localStorage.setItem('language', langCode)
    
    // Handle RTL for Urdu
    if (langCode === 'ur') {
      document.documentElement.setAttribute('dir', 'rtl')
    } else {
      document.documentElement.setAttribute('dir', 'ltr')
    }
  }
  
  return (
    <div>
      <button onClick={() => changeLanguage('hi')}>हिन्दी</button>
      <button onClick={() => changeLanguage('en')}>English</button>
    </div>
  )
}
```

## Best Practices

### 1. Always Use Translation Keys
```tsx
// ❌ Bad
<button>Save</button>

// ✅ Good
<button>{t('common.save')}</button>
```

### 2. Provide Fallbacks
```tsx
// Navigation with fallback
{t(`navigation.${item.id}`) || item.label}
```

### 3. Use Consistent Key Naming
```tsx
// Group related translations
t('marketplace.title')
t('marketplace.products')
t('marketplace.buyNow')
```

### 4. Handle Pluralization (if needed)
```tsx
// In translation file
{
  "items": "{{count}} item",
  "items_plural": "{{count}} items"
}

// In component
{t('items', { count: productCount })}
```

### 5. Document Translation Keys
Always keep translation keys organized and documented in the translation files with clear naming conventions.

## Testing Translations

```tsx
import { render, screen } from '@testing-library/react'
import { I18nextProvider } from 'react-i18next'
import i18n from '../i18n/config'

test('renders translated text', () => {
  render(
    <I18nextProvider i18n={i18n}>
      <MyComponent />
    </I18nextProvider>
  )
  
  expect(screen.getByText(/dashboard/i)).toBeInTheDocument()
})
```

## Debugging Translation Issues

1. **Missing Translation Keys**: Check browser console for warnings
2. **Wrong Language Display**: Verify localStorage 'language' key
3. **Font Issues**: Check Google Fonts loading in Network tab
4. **RTL Not Working**: Verify 'dir' attribute on html element
5. **Translation Not Updating**: Clear localStorage and refresh

## Resources

- Translation files: `/src/i18n/locales/[lang]/common.json`
- i18n config: `/src/i18n/config.ts`
- Language switcher: `/src/components/LanguageSwitcher.tsx`
- Documentation: `MULTILINGUAL_FEATURE.md`
