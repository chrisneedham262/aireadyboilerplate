# CTA (Call-to-Action) Components

This folder contains all CTA (Call-to-Action) related UI components for the application.

## 📁 Structure

```
cta/
├── index.js              # Exports all CTA components
├── CTASection.js         # Main CTA section component
└── README.md             # This file
```

## 🎯 Components

### **CTASection**

A centered call-to-action section with customizable heading, description, and action buttons. Perfect for conversion-focused sections throughout your app.

#### **Props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `sectionRef` | Ref | - | Optional ref for scroll-to functionality |
| `heading` | String | "Boost your productivity..." | Main heading text |
| `description` | String | Default description | Supporting description text |
| `primaryButtonText` | String | "Get started" | Primary button text |
| `primaryButtonHref` | String | "/contact" | Primary button link |
| `secondaryButtonText` | String | "Learn more" | Secondary button text |
| `secondaryButtonHref` | String | "/contact" | Secondary button link |
| `showSecondaryButton` | Boolean | true | Show/hide secondary button |
| `className` | String | "" | Additional CSS classes |

## 🚀 Usage

### **Basic Usage**

```jsx
import { CTASection } from '@/components/ui/cta';

export default function HomePage() {
  return (
    <div>
      <CTASection />
    </div>
  );
}
```

### **With Ref (for scroll-to functionality)**

```jsx
import { CTASection } from '@/components/ui/cta';
import { useRef } from 'react';

export default function HomePage() {
  const ctaRef = useRef(null);

  return (
    <div>
      <button onClick={() => ctaRef.current?.scrollIntoView()}>
        View CTA
      </button>
      
      <CTASection sectionRef={ctaRef} />
    </div>
  );
}
```

### **Custom Content**

```jsx
import { CTASection } from '@/components/ui/cta';

export default function PricingPage() {
  return (
    <CTASection
      heading="Ready to get started?"
      description="Join thousands of companies already using our platform"
      primaryButtonText="Start free trial"
      primaryButtonHref="/register"
      secondaryButtonText="View pricing"
      secondaryButtonHref="/pricing"
    />
  );
}
```

### **Single Button (No Secondary)**

```jsx
<CTASection
  heading="Start your journey today"
  primaryButtonText="Sign up now"
  primaryButtonHref="/register"
  showSecondaryButton={false}
/>
```

### **Custom Links**

```jsx
<CTASection
  heading="Need help?"
  description="Our support team is here for you"
  primaryButtonText="Contact Support"
  primaryButtonHref="/support"
  secondaryButtonText="View docs"
  secondaryButtonHref="/docs"
/>
```

### **With Additional Styling**

```jsx
<CTASection
  className="bg-gradient-to-r from-indigo-500 to-purple-600"
  heading="Limited time offer!"
/>
```

## 🎨 Features

- ✅ **Centered Layout** - Perfect alignment for conversion
- ✅ **Dark Mode Support** - Automatically switches with theme
- ✅ **Customizable** - All text and links configurable
- ✅ **Dual Buttons** - Primary action + secondary link
- ✅ **Optional Secondary** - Can hide secondary button
- ✅ **Scroll Support** - Works with refs for smooth scrolling
- ✅ **Typography Classes** - Uses `.h2` and `.p-large`
- ✅ **Hover Effects** - Smooth transitions on interactions

## 🎨 Layout

### **Visual Structure**
```
┌───────────────────────────────────┐
│                                   │
│         Main Heading (h2)         │
│                                   │
│    Supporting description text    │
│         (max-width: 36rem)        │
│                                   │
│   [Primary Button] [Learn more →] │
│                                   │
└───────────────────────────────────┘
```

### **Spacing**
- Top margin: 8rem (mt-32)
- Content max-width: 42rem (max-w-2xl)
- Description max-width: 36rem (max-w-xl)
- Button gap: 1.5rem (gap-x-6)
- Top padding on buttons: 2.5rem (mt-10)

## 🎨 Button Styles

### **Primary Button**
- Background: Indigo-600
- Hover: Indigo-500
- Text: White
- Style: Solid with shadow
- Focus: Outline ring

### **Secondary Button**
- Style: Text link
- Color: Gray-900 (light) / White (dark)
- Hover: Indigo-600 (light) / Indigo-400 (dark)
- Icon: Right arrow (→)
- Transition: 200ms color

## 🎨 Dark Mode

The component automatically supports dark mode:

- **Secondary button text:** gray-900 → white
- **Secondary hover:** indigo-600 → indigo-400
- **Typography:** Inherits from `.h2` and `.p-large` classes

## 📝 Common Use Cases

### **1. Homepage CTA**
```jsx
<CTASection
  heading="Start growing your business today"
  description="Join over 10,000 companies already using our platform"
  primaryButtonText="Get started"
  primaryButtonHref="/register"
/>
```

### **2. Pricing Page CTA**
```jsx
<CTASection
  heading="Ready to upgrade?"
  description="Choose the plan that works best for you"
  primaryButtonText="View pricing"
  primaryButtonHref="/pricing"
  secondaryButtonText="Compare plans"
  secondaryButtonHref="/compare"
/>
```

### **3. Feature Page CTA**
```jsx
<CTASection
  heading="See it in action"
  description="Experience the power of our platform"
  primaryButtonText="Book a demo"
  primaryButtonHref="/demo"
  secondaryButtonText="Watch video"
  secondaryButtonHref="/videos"
/>
```

### **4. Contact Page CTA**
```jsx
<CTASection
  heading="Let's talk"
  description="We'd love to hear from you"
  primaryButtonText="Send message"
  primaryButtonHref="/contact"
  showSecondaryButton={false}
/>
```

### **5. Product Page CTA**
```jsx
<CTASection
  heading="Try it risk-free"
  description="14-day free trial. No credit card required."
  primaryButtonText="Start trial"
  primaryButtonHref="/trial"
  secondaryButtonText="See features"
  secondaryButtonHref="/features"
/>
```

## 🔧 Customization Tips

### **Change Button Colors**

Edit `CTASection.js` to use your brand colors:
```jsx
// Current:
className="bg-indigo-600 hover:bg-indigo-500"

// Change to:
className="bg-blue-600 hover:bg-blue-500"
```

### **Change Text Alignment**

Modify alignment in `CTASection.js`:
```jsx
// Current: Center-aligned
className="text-center"

// Change to left-aligned:
className="text-left"
```

### **Add Background Color**

Pass `className` prop:
```jsx
<CTASection
  className="bg-gray-50 dark:bg-gray-900 py-24"
/>
```

### **Change Max Width**

Modify the container in `CTASection.js`:
```jsx
// Current: max-w-2xl (42rem)
className="max-w-2xl"

// For wider: max-w-4xl (56rem)
className="max-w-4xl"
```

### **Add More Buttons**

You can extend the component to add a third button by modifying `CTASection.js`.

## 📂 Adding More Components

To add more CTA-related components:

1. Create the component file in this folder
2. Export it in `index.js`:
   ```javascript
   export { default as CTABanner } from './CTABanner';
   ```
3. Import and use:
   ```javascript
   import { CTASection, CTABanner } from '@/components/ui/cta';
   ```

## ✨ Future Enhancements

Potential additions to this folder:

- `CTABanner.js` - Full-width banner CTA
- `CTASplit.js` - Split layout with image + CTA
- `CTAMinimal.js` - Minimal text-only CTA
- `CTACard.js` - Card-style CTA with border
- `CTANewsletter.js` - Newsletter signup CTA
- `CTAVideo.js` - CTA with background video

## 🎯 Component Variations

### **Current: Centered CTA**
- Center-aligned text
- Two buttons (primary + secondary)
- Best for: Homepage, feature pages

### **Future: Banner CTA**
```jsx
// CTABanner.js
- Full-width background
- Text on left, button on right
- Best for: Top of page announcements
```

### **Future: Split CTA**
```jsx
// CTASplit.js
- Two-column layout
- Image/graphic on left
- CTA content on right
- Best for: Product pages
```

### **Future: Minimal CTA**
```jsx
// CTAMinimal.js
- Small, compact design
- Single line of text + button
- Best for: Between sections
```

### **Future: Newsletter CTA**
```jsx
// CTANewsletter.js
- Heading + email input + button
- GDPR checkbox optional
- Best for: Footer, blog pages
```

## ♿ Accessibility

### **Button Accessibility**
- Proper `href` attributes for navigation
- Focus visible states with outline rings
- Semantic `<Link>` components

### **Arrow Icon**
```jsx
<span aria-hidden="true">→</span>
```
Arrow is decorative and hidden from screen readers.

## 🎨 Typography Classes Used

- **`.h2`** - Main heading (auto dark mode)
- **`.p-large`** - Description text (auto dark mode)

All classes automatically adapt to light/dark theme.

## 📊 Responsive Behavior

### **Mobile**
- Stacked vertically
- Full-width buttons recommended
- Reduced padding

### **Desktop**
- Centered layout
- Side-by-side buttons
- Optimal 42rem max-width

## 💡 Best Practices

### **1. Clear Value Proposition**
```jsx
<CTASection
  heading="Save 10 hours per week"  // Specific benefit
  description="Automate your workflow..."
/>
```

### **2. Action-Oriented Text**
```jsx
primaryButtonText="Start free trial"  // ✅ Action verb
// vs
primaryButtonText="Trial"  // ❌ Not actionable
```

### **3. Remove Friction**
```jsx
description="No credit card required. Cancel anytime."
```

### **4. Create Urgency**
```jsx
heading="Limited time offer - 50% off"
```

### **5. Use Contrasting Buttons**
- Primary: Solid, colored (indigo-600)
- Secondary: Text link (gray-900)

---

## 📝 Summary

**Component:** `CTASection`

**Features:**
- ✅ Centered layout for maximum impact
- ✅ Customizable heading and description
- ✅ Dual button options (primary + secondary)
- ✅ Dark mode support
- ✅ Scroll support with refs
- ✅ Hover transitions
- ✅ Optional secondary button

**Usage:**
```jsx
import { CTASection } from '@/components/ui/cta';

<CTASection />
```

**Common Props:**
```jsx
<CTASection
  heading="Your heading"
  description="Your description"
  primaryButtonText="Action"
  primaryButtonHref="/link"
/>
```

---

**Created:** October 20, 2025  
**Status:** ✅ Active and Working  
**Used In:** Home page (`src/components/pages/home/index.js`)

