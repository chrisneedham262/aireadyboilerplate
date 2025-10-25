# Logo Cloud Components

This folder contains all logo cloud related UI components for displaying client/partner logos and testimonials.

## 📁 Structure

```
logo-cloud/
├── index.js                # Exports all logo cloud components
├── LogoCloudSection.js     # Main logo cloud section component
└── README.md               # This file
```

## 🎯 Components

### **LogoCloudSection**

A responsive logo cloud section that displays partner/client logos in a grid layout with an optional case study callout. Includes automatic dark mode logo switching.

#### **Props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `sectionRef` | Ref | - | Optional ref for scroll-to functionality |
| `logos` | Array | Default logos (5 items) | Array of logo objects |
| `caseStudyText` | String | "Transistor saves up to..." | Case study description text |
| `caseStudyLinkText` | String | "Read our case study" | Case study link text |
| `caseStudyLink` | String | "#" | Case study link URL |
| `showCaseStudy` | Boolean | true | Show/hide case study callout |
| `className` | String | "" | Additional CSS classes |

#### **Logo Object Structure**

```javascript
{
  name: "Company Name",           // Alt text for accessibility
  src: "/path/to/logo.svg",       // Light mode logo
  darkSrc: "/path/to/dark-logo.svg"  // Dark mode logo (optional)
}
```

## 🚀 Usage

### **Basic Usage**

```jsx
import { LogoCloudSection } from '@/components/ui/logo-cloud';

export default function HomePage() {
  return (
    <div>
      <LogoCloudSection />
    </div>
  );
}
```

### **With Ref (for scroll-to functionality)**

```jsx
import { LogoCloudSection } from '@/components/ui/logo-cloud';
import { useRef } from 'react';

export default function HomePage() {
  const logoRef = useRef(null);

  return (
    <div>
      <button onClick={() => logoRef.current?.scrollIntoView()}>
        View Clients
      </button>
      
      <LogoCloudSection sectionRef={logoRef} />
    </div>
  );
}
```

### **Custom Logos**

```jsx
import { LogoCloudSection } from '@/components/ui/logo-cloud';

const myLogos = [
  {
    name: "Acme Corp",
    src: "/logos/acme-light.svg",
    darkSrc: "/logos/acme-dark.svg",
  },
  {
    name: "TechStart",
    src: "/logos/techstart-light.svg",
    darkSrc: "/logos/techstart-dark.svg",
  },
  {
    name: "DataFlow",
    src: "/logos/dataflow-light.svg",
    darkSrc: "/logos/dataflow-dark.svg",
  },
];

export default function PartnersPage() {
  return (
    <LogoCloudSection logos={myLogos} />
  );
}
```

### **Without Case Study**

```jsx
<LogoCloudSection
  showCaseStudy={false}
/>
```

### **Custom Case Study**

```jsx
<LogoCloudSection
  caseStudyText="Our clients save an average of $50,000 per year."
  caseStudyLinkText="View success stories"
  caseStudyLink="/success-stories"
/>
```

## 🎨 Features

- ✅ **Responsive Grid** - Adapts from 4 to 6 to 5 columns
- ✅ **Dark Mode Support** - Automatic logo switching
- ✅ **Customizable** - Pass custom logos and case study content
- ✅ **Scroll Support** - Works with refs for smooth scrolling
- ✅ **Case Study Callout** - Optional testimonial/case study link
- ✅ **Accessibility** - Proper alt text for all logos
- ✅ **Hover Effects** - Smooth transitions on case study link

## 🎨 Grid Layout

### **Responsive Breakpoints**

**Mobile (<640px):**
- 4 columns
- max-width: 32rem

**Tablet (640px-1024px):**
- 6 columns
- max-width: 36rem

**Desktop (≥1024px):**
- 5 columns
- max-width: none

### **Logo Sizing**
- Max height: 3rem (48px)
- Width: Full container width
- Object-fit: contain (maintains aspect ratio)

## 🎨 Dark Mode

The component includes automatic dark mode logo switching:

```jsx
// Light mode logos (shown by default)
<img className="dark:hidden" src={logo.src} />

// Dark mode logos (shown in dark mode)
<img className="hidden dark:block" src={logo.darkSrc} />
```

**Benefits:**
- Logos remain visible on both backgrounds
- Automatic switching with theme
- No JavaScript required

**Requirements:**
- Provide both `src` and `darkSrc` in logo objects
- If `darkSrc` is omitted, only light logo shows

## 📝 Default Logos Included

The component includes 5 default logos from Tailwind UI:

1. Transistor
2. Reform
3. Tuple
4. SavvyCal
5. Statamic

Each includes both light and dark versions.

## 🔧 Customization Tips

### **Change Grid Columns**

Modify `LogoCloudSection.js`:
```jsx
// Current: 4-6-5 column layout
className="grid-cols-4 sm:grid-cols-6 lg:grid-cols-5"

// For 3-4-4:
className="grid-cols-3 sm:grid-cols-4 lg:grid-cols-4"
```

### **Adjust Logo Sizes**

```jsx
// Current: max-h-12 (48px)
className="max-h-12"

// For larger: max-h-16 (64px)
className="max-h-16"
```

### **Change Gap Spacing**

```jsx
// Current gaps
className="gap-x-8 gap-y-12 sm:gap-x-10 sm:gap-y-14"

// Reduce spacing
className="gap-x-4 gap-y-8 sm:gap-x-6 sm:gap-y-10"
```

### **Remove Case Study Completely**

```jsx
<LogoCloudSection showCaseStudy={false} />
```

### **Style Case Study Badge**

Modify `LogoCloudSection.js`:
```jsx
// Current: gray with ring
className="ring-1 ring-gray-900/10"

// Change to colored background
className="bg-indigo-50 dark:bg-indigo-900/20"
```

## 📂 Adding More Components

To add more logo-cloud-related components:

1. Create the component file in this folder
2. Export it in `index.js`:
   ```javascript
   export { default as LogoGrid } from './LogoGrid';
   ```
3. Import and use:
   ```javascript
   import { LogoCloudSection, LogoGrid } from '@/components/ui/logo-cloud';
   ```

## ✨ Future Enhancements

Potential additions to this folder:

- `LogoGrid.js` - Simple logo grid without case study
- `LogoCarousel.js` - Animated scrolling logos
- `LogoShowcase.js` - Large featured logos with descriptions
- `LogoTestimonial.js` - Logos with testimonial quotes
- `LogoCategories.js` - Logos organized by category/industry

## 🎯 Component Variations

### **Current: Logo Cloud with Case Study**
- Grid of logos
- Case study callout below
- Best for: Homepage, about page

### **Future: Logo Carousel**
```jsx
// LogoCarousel.js
- Infinite scrolling animation
- No pagination needed
- Best for: Headers, footers
```

### **Future: Logo Showcase**
```jsx
// LogoShowcase.js
- Larger logo display
- Company descriptions
- Best for: Partners page
```

### **Future: Logo Grid**
```jsx
// LogoGrid.js
- Simple grid layout
- No case study
- Best for: Compact displays
```

## ♿ Accessibility

### **Logo Alt Text**
```jsx
<img alt={logo.name} src={logo.src} />
```
Each logo has descriptive alt text for screen readers.

### **Case Study Link**
```jsx
<a href={caseStudyLink}>
  <span aria-hidden="true" className="absolute inset-0" />
  {caseStudyLinkText}
</a>
```
- Full clickable area with absolute span
- Visible focus states
- Semantic link element

### **Decorative Arrow**
```jsx
<span aria-hidden="true">&rarr;</span>
```
Arrow is decorative and hidden from assistive technologies.

## 🎨 Case Study Badge Styling

### **Light Mode**
- Text: gray-600
- Ring: gray-900/10
- Hover ring: gray-900/20

### **Dark Mode**
- Text: gray-300
- Ring: gray-100/10
- Hover ring: gray-100/20

### **Link**
- Color: indigo-600 (light) / indigo-400 (dark)
- Font: semibold
- Transitions: 200ms

## 📊 Responsive Behavior

### **Mobile (<640px)**
```
┌─────┬─────┬─────┬─────┐
│  L1 │ L1  │  L2 │ L2  │
├─────┼─────┼─────┼─────┤
│  L3 │ L3  │  L4 │ L4  │
├─────┼─────┼─────┼─────┤
│  L5 │ L5  │     │     │
└─────┴─────┴─────┴─────┘
```

### **Tablet (640px-1024px)**
```
┌───┬───┬───┬───┬───┬───┐
│ L1│L1 │L2 │L2 │L3 │L3 │
├───┼───┼───┼───┼───┼───┤
│   │L4 │L4 │L5 │L5 │   │
└───┴───┴───┴───┴───┴───┘
```

### **Desktop (≥1024px)**
```
┌────┬────┬────┬────┬────┐
│ L1 │ L2 │ L3 │ L4 │ L5 │
└────┴────┴────┴────┴────┘
```

## 💡 Best Practices

### **1. High-Quality Logos**
- Use SVG format when possible
- Ensure logos are clear at small sizes
- Test visibility on both backgrounds

### **2. Consistent Logo Heights**
```jsx
className="max-h-12"  // All logos same max height
```

### **3. Provide Dark Versions**
```jsx
{
  src: "/logo-dark-bg.svg",      // For light mode
  darkSrc: "/logo-light-bg.svg"  // For dark mode
}
```

### **4. Meaningful Alt Text**
```jsx
alt="Acme Corp"  // ✅ Descriptive
// vs
alt="logo"       // ❌ Not specific
```

### **5. Showcase Real Clients**
Use actual client logos to build trust and credibility.

---

## 📝 Summary

**Component:** `LogoCloudSection`

**Features:**
- ✅ Responsive 4/6/5 column grid
- ✅ Automatic dark mode logo switching
- ✅ Optional case study callout
- ✅ Customizable logos and content
- ✅ Scroll support with refs
- ✅ Hover effects
- ✅ Fully accessible

**Usage:**
```jsx
import { LogoCloudSection } from '@/components/ui/logo-cloud';

<LogoCloudSection />
```

**With Custom Logos:**
```jsx
<LogoCloudSection logos={myLogos} />
```

---

**Created:** October 20, 2025  
**Status:** ✅ Active and Working  
**Used In:** Home page (`src/components/pages/home/index.js`)

