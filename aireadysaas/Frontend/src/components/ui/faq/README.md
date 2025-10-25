# FAQ Components

This folder contains all FAQ (Frequently Asked Questions) related UI components for the application.

## 📁 Structure

```
faq/
├── index.js              # Exports all FAQ components
├── FAQSection.js         # Main FAQ section component
└── README.md             # This file
```

## 🎯 Components

### **FAQSection**

A complete FAQ section with customizable questions and answers, featuring a responsive two-column layout on desktop.

#### **Props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `sectionRef` | Ref | - | Optional ref for scroll-to functionality |
| `heading` | String | "Frequently asked questions" | Main heading |
| `faqs` | Array | Default FAQs | Array of FAQ objects |
| `showBackgroundBlur` | Boolean | true | Show/hide decorative background blur |
| `className` | String | "" | Additional CSS classes |

#### **FAQ Object Structure**

```javascript
{
  id: 1,                              // Unique ID
  question: "What's the question?",   // Question text
  answer: "This is the answer..."     // Answer text
}
```

## 🚀 Usage

### **Basic Usage**

```jsx
import { FAQSection } from '@/components/ui/faq';

export default function HomePage() {
  return (
    <div>
      <FAQSection />
    </div>
  );
}
```

### **With Ref (for scroll-to functionality)**

```jsx
import { FAQSection } from '@/components/ui/faq';
import { useRef } from 'react';

export default function HomePage() {
  const faqRef = useRef(null);

  return (
    <div>
      <button onClick={() => faqRef.current?.scrollIntoView()}>
        View FAQs
      </button>
      
      <FAQSection sectionRef={faqRef} />
    </div>
  );
}
```

### **Custom FAQs**

```jsx
import { FAQSection } from '@/components/ui/faq';

const myFaqs = [
  {
    id: 1,
    question: "How does billing work?",
    answer: "We bill monthly or annually based on your chosen plan. You can cancel anytime."
  },
  {
    id: 2,
    question: "Do you offer refunds?",
    answer: "Yes, we offer a 30-day money-back guarantee on all plans."
  },
  {
    id: 3,
    question: "Can I switch plans?",
    answer: "Absolutely! You can upgrade or downgrade at any time."
  },
];

export default function FAQPage() {
  return (
    <FAQSection
      heading="Common Questions"
      faqs={myFaqs}
    />
  );
}
```

### **Without Background Blur**

```jsx
<FAQSection
  showBackgroundBlur={false}
/>
```

### **With Custom Styling**

```jsx
<FAQSection
  className="bg-gray-50 dark:bg-gray-950"
  heading="Got Questions?"
/>
```

## 🎨 Features

- ✅ **Responsive Design** - Two-column layout on desktop, stacked on mobile
- ✅ **Dark Mode Support** - Automatically switches with theme
- ✅ **Customizable** - Pass custom FAQs, heading, and styling
- ✅ **Scroll Support** - Works with refs for smooth scrolling
- ✅ **Decorative Blur** - Optional gradient blur background
- ✅ **Dividers** - Clean dividers between questions
- ✅ **Accessibility** - Semantic HTML with `dl`, `dt`, `dd` tags

## 🎨 Layout

### **Desktop (≥1024px)**
```
┌─────────────────────────────────────────┐
│  Frequently asked questions             │
├─────────────────────────────────────────┤
│  Question 1          │  Answer 1        │
├──────────────────────┼──────────────────┤
│  Question 2          │  Answer 2        │
├──────────────────────┼──────────────────┤
│  Question 3          │  Answer 3        │
└─────────────────────────────────────────┘
```

### **Mobile (<1024px)**
```
┌─────────────────────┐
│  FAQs               │
├─────────────────────┤
│  Question 1         │
│  Answer 1           │
├─────────────────────┤
│  Question 2         │
│  Answer 2           │
└─────────────────────┘
```

## 🎨 Dark Mode

The component automatically supports dark mode:

- **Dividers:** gray-900/10 → gray-700/50
- **Text:** Inherits from typography classes (`.h2`, `.h6`, `.p-medium`)
- **Background blur:** Adapts to theme

## 📝 Example in Home Page

```jsx
import { FAQSection } from '@/components/ui/faq';

export default function HomePage() {
  const faqRef = useRef(null);

  const scrollToSection = (section) => {
    if (section === 'faq') {
      faqRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div>
      <nav>
        <button onClick={() => scrollToSection('faq')}>
          FAQ
        </button>
      </nav>

      <FAQSection sectionRef={faqRef} />
    </div>
  );
}
```

## 🔧 Customization Tips

### **Change Layout**

Modify the grid columns in `FAQSection.js`:
```jsx
// Current: 5 columns for question, 7 for answer
className="lg:col-span-5"  // Question
className="lg:col-span-7"  // Answer

// For equal columns:
className="lg:col-span-6"  // Question
className="lg:col-span-6"  // Answer
```

### **Change Spacing**

Adjust the padding in `FAQSection.js`:
```jsx
// Increase vertical spacing between questions:
className="py-8"  // Change to py-12

// Adjust section padding:
className="pb-8 sm:pb-24"  // Change values as needed
```

### **Remove Dividers**

Remove the divider in `FAQSection.js`:
```jsx
// Remove this class:
divide-y divide-gray-900/10 dark:divide-gray-700/50
```

### **Add More FAQs**

Simply add more FAQ objects to the `faqs` prop:
```jsx
const faqs = [
  { id: 1, question: "...", answer: "..." },
  { id: 2, question: "...", answer: "..." },
  { id: 3, question: "...", answer: "..." },
  { id: 4, question: "...", answer: "..." },
  { id: 5, question: "...", answer: "..." },
  // Add as many as needed
];

<FAQSection faqs={faqs} />
```

## 📂 Adding More Components

To add more FAQ-related components:

1. Create the component file in this folder
2. Export it in `index.js`:
   ```javascript
   export { default as FAQAccordion } from './FAQAccordion';
   ```
3. Import and use:
   ```javascript
   import { FAQSection, FAQAccordion } from '@/components/ui/faq';
   ```

## ✨ Future Enhancements

Potential additions to this folder:

- `FAQAccordion.js` - Collapsible FAQ items
- `FAQSearch.js` - Search/filter FAQs
- `FAQCategory.js` - Categorized FAQs with tabs
- `FAQItem.js` - Individual FAQ item component
- `FAQContactCTA.js` - "Still have questions?" CTA
- `FAQCollapsible.js` - Expandable FAQ section

## 🎯 Component Variations

### **Current: Two-Column Layout**
- Question on left (5 columns)
- Answer on right (7 columns)
- Best for: Detailed answers

### **Future: Accordion Style**
```jsx
// FAQAccordion.js
- Click to expand/collapse
- One question visible at a time
- Best for: Many questions
```

### **Future: Tabbed Categories**
```jsx
// FAQCategory.js
- Tabs: "Billing", "Technical", "Account"
- Filter questions by category
- Best for: Large FAQ sections
```

### **Future: With Search**
```jsx
// FAQSearch.js
- Search bar at top
- Real-time filtering
- Best for: 10+ questions
```

## 📊 Default FAQs Included

The component includes 5 default FAQs:

1. What's the best thing about Switzerland?
2. How do I get started?
3. Can I change my plan later?
4. What payment methods do you accept?
5. Is there a free trial?

Replace these with your actual FAQs by passing the `faqs` prop.

## ♿ Accessibility

The component uses semantic HTML:

```html
<dl>            <!-- Description list -->
  <dt>          <!-- Description term (question) -->
  <dd>          <!-- Description detail (answer) -->
</dl>
```

This provides proper structure for screen readers and assistive technologies.

## 🎨 Typography Classes Used

- **Heading:** `.h2` - Main section heading
- **Questions:** `.h6` - Individual question text
- **Answers:** `.p-medium` - Answer text

All classes automatically adapt to dark mode.

---

## 📝 Summary

**Component:** `FAQSection`

**Features:**
- ✅ Responsive two-column layout
- ✅ Dark mode support
- ✅ Customizable FAQs
- ✅ Scroll support with refs
- ✅ Optional background blur
- ✅ Semantic HTML
- ✅ Easy to extend

**Usage:**
```jsx
import { FAQSection } from '@/components/ui/faq';

<FAQSection sectionRef={faqRef} />
```

---

**Created:** October 20, 2025  
**Status:** ✅ Active and Working  
**Used In:** Home page (`src/components/pages/home/index.js`)

