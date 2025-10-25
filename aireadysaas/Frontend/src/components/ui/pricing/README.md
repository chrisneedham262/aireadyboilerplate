# Pricing Components

This folder contains all pricing-related UI components for the application.

## 📁 Structure

```
pricing/
├── index.js              # Exports all pricing components
├── PricingSection.js     # Main pricing section component
└── README.md             # This file
```

## 🎯 Components

### **PricingSection**

A complete pricing section with customizable tiers, features, and styling.

#### **Props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `sectionRef` | Ref | - | Optional ref for scroll-to functionality |
| `title` | String | "Pricing" | Small title above the heading |
| `heading` | String | "Pricing that grows with you" | Main heading |
| `description` | String | Default description | Subtitle/description text |
| `tiers` | Array | Default tiers | Array of pricing tier objects |
| `className` | String | "" | Additional CSS classes |

#### **Tier Object Structure**

```javascript
{
  name: 'Startup',                    // Plan name
  id: 'tier-startup',                 // Unique ID
  href: '#',                          // Link URL
  priceMonthly: '$49',                // Price to display
  description: 'A plan that scales...', // Plan description
  features: [                         // Array of features
    '25 products',
    'Up to 10,000 subscribers',
    'Advanced analytics',
  ],
  mostPopular: true                   // Show "Most Popular" badge
}
```

## 🚀 Usage

### **Basic Usage**

```jsx
import { PricingSection } from '@/components/ui/pricing';

export default function HomePage() {
  return (
    <div>
      <PricingSection />
    </div>
  );
}
```

### **With Ref (for scroll-to functionality)**

```jsx
import { PricingSection } from '@/components/ui/pricing';
import { useRef } from 'react';

export default function HomePage() {
  const pricingRef = useRef(null);

  return (
    <div>
      <button onClick={() => pricingRef.current?.scrollIntoView()}>
        View Pricing
      </button>
      
      <PricingSection sectionRef={pricingRef} />
    </div>
  );
}
```

### **Custom Content**

```jsx
import { PricingSection } from '@/components/ui/pricing';

const customTiers = [
  {
    name: 'Basic',
    id: 'tier-basic',
    href: '/checkout/basic',
    priceMonthly: '$9',
    description: 'Perfect for individuals',
    features: ['1 user', '5GB storage', 'Email support'],
    mostPopular: false,
  },
  {
    name: 'Pro',
    id: 'tier-pro',
    href: '/checkout/pro',
    priceMonthly: '$29',
    description: 'Great for teams',
    features: ['10 users', '50GB storage', 'Priority support'],
    mostPopular: true,
  },
];

export default function PricingPage() {
  return (
    <PricingSection
      title="Plans"
      heading="Choose your perfect plan"
      description="Select the plan that best fits your needs"
      tiers={customTiers}
    />
  );
}
```

### **With Additional Styling**

```jsx
<PricingSection
  className="bg-gray-50 dark:bg-gray-950"
  title="Pricing"
  heading="Flexible pricing for everyone"
/>
```

## 🎨 Features

- ✅ **Responsive Design** - Works on all screen sizes
- ✅ **Dark Mode Support** - Automatically switches with theme
- ✅ **Customizable** - Pass custom tiers, content, and styling
- ✅ **Scroll Support** - Works with refs for smooth scrolling
- ✅ **"Most Popular" Badge** - Highlight recommended plans
- ✅ **Icon Support** - Uses Heroicons for checkmarks
- ✅ **Accessibility** - Proper ARIA labels and semantic HTML

## 🎨 Dark Mode

The component automatically supports dark mode:

- Light Mode: White background, dark text
- Dark Mode: Gray-800 background, white text
- Border colors adapt automatically
- "Most Popular" badge remains indigo in both modes

## 📝 Example in Home Page

```jsx
import { PricingSection } from '@/components/ui/pricing';

export default function HomePage() {
  const pricingRef = useRef(null);

  const scrollToSection = (section) => {
    if (section === 'pricing') {
      pricingRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div>
      <nav>
        <button onClick={() => scrollToSection('pricing')}>
          Pricing
        </button>
      </nav>

      <PricingSection sectionRef={pricingRef} />
    </div>
  );
}
```

## 🔧 Customization Tips

### **Change Colors**

Modify the component to use your brand colors:
```jsx
// In PricingSection.js, find:
className="text-indigo-600"
// Change to:
className="text-blue-600"
```

### **Add More Tiers**

Simply add more tier objects to the `tiers` prop:
```jsx
const tiers = [
  // ... existing tiers
  {
    name: 'Ultimate',
    id: 'tier-ultimate',
    priceMonthly: '$199',
    // ... rest of tier
  }
];

<PricingSection tiers={tiers} />
```

### **Change Layout**

Modify the grid columns in `PricingSection.js`:
```jsx
// For 4 columns:
className="... lg:grid-cols-4"

// For 2 columns:
className="... lg:grid-cols-2"
```

## 📂 Adding More Components

To add more pricing-related components:

1. Create the component file in this folder
2. Export it in `index.js`:
   ```javascript
   export { default as PricingToggle } from './PricingToggle';
   ```
3. Import and use:
   ```javascript
   import { PricingSection, PricingToggle } from '@/components/ui/pricing';
   ```

## ✨ Future Enhancements

Potential additions to this folder:

- `PricingToggle.js` - Monthly/Yearly toggle
- `PricingCard.js` - Individual pricing card component
- `PricingFeature.js` - Feature list item component
- `PricingBadge.js` - "Most Popular" badge component
- `PricingTable.js` - Table-style pricing comparison
- `PricingFAQ.js` - Pricing-specific FAQ component

---

**Created:** October 20, 2025  
**Status:** ✅ Active and Working  
**Used In:** Home page (`src/components/pages/home/index.js`)

