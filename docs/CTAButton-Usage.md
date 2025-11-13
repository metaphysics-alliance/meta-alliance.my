# CTAButton Component - Usage Guide

## Overview
Standardized Call-to-Action button component based on the "Add to Cart" button styling from `/pricing`.

## Features
- ✅ **Gold glow effect** on hover (primary variant)
- ✅ **Consistent sizing** (sm, md, lg)
- ✅ **Multiple variants** (primary with glow, secondary green success)
- ✅ **Smart routing** (internal Link, external href, or button)
- ✅ **Icon support** (custom icon + optional arrow)
- ✅ **Disabled state** handling

---

## Import

\`\`\`javascript
import CTAButton from './components/CTAButton.jsx'
\`\`\`

---

## Basic Usage

### Internal Link (React Router)
\`\`\`jsx
<CTAButton to="/about" size="lg" showArrow>
  Learn More About Us
</CTAButton>
\`\`\`

### External Link
\`\`\`jsx
<CTAButton href="https://example.com" size="md">
  Visit Website
</CTAButton>
\`\`\`

### Button with onClick
\`\`\`jsx
<CTAButton onClick={() => handleSubmit()} size="md">
  Submit Form
</CTAButton>
\`\`\`

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'primary'` \| `'secondary'` | `'primary'` | Primary = gold glow, Secondary = green success |
| `size` | `'sm'` \| `'md'` \| `'lg'` | `'md'` | Button size |
| `to` | `string` | - | Internal route (uses React Router Link) |
| `href` | `string` | - | External URL (opens in new tab) |
| `onClick` | `function` | - | Click handler for button type |
| `disabled` | `boolean` | `false` | Disabled state |
| `icon` | `ReactNode` | - | Custom icon (left side) |
| `showArrow` | `boolean` | `false` | Show right arrow with slide animation |
| `className` | `string` | `''` | Additional Tailwind classes |

---

## Examples

### 1. Primary Button (Gold Glow)
\`\`\`jsx
<CTAButton to="/services" size="lg" showArrow>
  Explore Services
</CTAButton>
\`\`\`

**Result:**
- Gold/cream text color
- Animated gold glow on hover
- Border glow effect
- Right arrow slides on hover

---

### 2. Secondary Button (Green Success)
\`\`\`jsx
<CTAButton 
  variant="secondary" 
  onClick={() => handleAddToCart()}
  size="md"
>
  Added to Cart
</CTAButton>
\`\`\`

**Result:**
- Green background
- Black text
- Success shadow
- No glow effects

---

### 3. With Custom Icon
\`\`\`jsx
import { FiShoppingCart } from 'react-icons/fi'

<CTAButton 
  to="/pricing/checkout"
  icon={<FiShoppingCart className="w-5 h-5" />}
  size="lg"
>
  View Cart
</CTAButton>
\`\`\`

---

### 4. Small Button
\`\`\`jsx
<CTAButton to="/contact" size="sm">
  Get in Touch
</CTAButton>
\`\`\`

---

### 5. Disabled State
\`\`\`jsx
<CTAButton 
  onClick={handleSubmit}
  disabled={isLoading}
  size="md"
>
  {isLoading ? 'Processing...' : 'Submit'}
</CTAButton>
\`\`\`

---

## Size Reference

| Size | Padding | Text Size | Border Radius |
|------|---------|-----------|---------------|
| `sm` | `px-4 py-2` | `text-sm` | `rounded-[12px]` |
| `md` | `px-5 py-2` | `text-sm` | `rounded-[14px]` |
| `lg` | `px-6 py-3` | `text-base` | `rounded-xl` |

---

## Visual Effects

### Primary Variant (Gold Glow)
\`\`\`
Base State:
  - Black/dark background
  - Gold/cream text (#f4deb4)
  - Letter spacing for elegance

Hover State:
  - Gold gradient glow (blur effect)
  - Border glow animation
  - Shadow glow (45px radius)
  - Text color brightens (#fff5dc)
\`\`\`

### Secondary Variant (Success)
\`\`\`
Base State:
  - Emerald green background
  - Black text
  - Success shadow

Hover State:
  - Brighter emerald background
  - No glow effects
\`\`\`

---

## Migration Guide

### Before (Old Style)
\`\`\`jsx
<Link 
  to="/about"
  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-black font-semibold shadow-lg hover:shadow-gold/50 transition-all duration-300 group"
>
  <span>Learn More About Us</span>
  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
</Link>
\`\`\`

### After (CTAButton)
\`\`\`jsx
<CTAButton to="/about" size="lg" showArrow>
  Learn More About Us
</CTAButton>
\`\`\`

---

## Files Using CTAButton

- ✅ `WhoCard.jsx` - "Learn More About Us" button
- ✅ `Newsletter.jsx` - Subscribe button
- 🔄 `PaymentPage.jsx` - Payment CTA (TODO)
- 🔄 `ContactForm.jsx` - Submit button (TODO)
- 🔄 `HeroCarousel.jsx` - Hero CTAs (TODO)

---

## Color Palette

\`\`\`css
/* Primary Variant */
--text-default: #f4deb4 (gold/cream)
--text-hover: #fff5dc (bright cream)
--glow-from: #f8d884cc (light gold)
--glow-via: #f6e7b8aa (pale gold)
--glow-to: #f8d884cc (light gold)
--border: #f8d88433 → #f8d88480 (gold fade)

/* Secondary Variant */
--bg: emerald-400/90
--text: black
--shadow: rgba(16,185,129,0.45)
\`\`\`

---

## Next Steps

1. ✅ Created CTAButton component
2. ✅ Updated WhoCard.jsx
3. ✅ Updated Newsletter.jsx
4. 🔄 Update PaymentPage.jsx "Proceed to Payment"
5. 🔄 Update ContactForm.jsx "Submit" button
6. 🔄 Update all service page CTAs
7. 🔄 Update Hero carousel buttons

---

**Work ID**: MA-CTA-BUTTON-STANDARDIZATION-2025-11-13T15:00:00+08:00
