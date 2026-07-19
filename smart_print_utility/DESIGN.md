---
name: Smart Print Utility
colors:
  surface: '#faf8ff'
  surface-dim: '#d9d9e3'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f3fd'
  surface-container: '#ededf7'
  surface-container-high: '#e7e7f1'
  surface-container-highest: '#e2e2ec'
  on-surface: '#191b22'
  on-surface-variant: '#434653'
  inverse-surface: '#2e3038'
  inverse-on-surface: '#f0f0fa'
  outline: '#737685'
  outline-variant: '#c3c6d6'
  surface-tint: '#1f57c9'
  primary: '#003ea3'
  on-primary: '#ffffff'
  primary-container: '#1e56c8'
  on-primary-container: '#cbd6ff'
  inverse-primary: '#b3c5ff'
  secondary: '#575f6c'
  on-secondary: '#ffffff'
  secondary-container: '#d8e0ef'
  on-secondary-container: '#5b6370'
  tertiary: '#5b4200'
  on-tertiary: '#ffffff'
  tertiary-container: '#785901'
  on-tertiary-container: '#fdd276'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dae1ff'
  primary-fixed-dim: '#b3c5ff'
  on-primary-fixed: '#001849'
  on-primary-fixed-variant: '#003fa4'
  secondary-fixed: '#dbe3f2'
  secondary-fixed-dim: '#bfc7d6'
  on-secondary-fixed: '#141c27'
  on-secondary-fixed-variant: '#3f4753'
  tertiary-fixed: '#ffdf9e'
  tertiary-fixed-dim: '#ebc166'
  on-tertiary-fixed: '#261a00'
  on-tertiary-fixed-variant: '#5b4300'
  background: '#faf8ff'
  on-background: '#191b22'
  surface-variant: '#e2e2ec'
typography:
  h1:
    fontFamily: Poppins
    fontSize: 40px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  h1-mobile:
    fontFamily: Poppins
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
  h2:
    fontFamily: Poppins
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.3'
  h3:
    fontFamily: Poppins
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.4'
  label-caps:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1.0'
    letterSpacing: 0.05em
  hindi-body:
    fontFamily: Noto Sans Devanagari
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  xs: 8px
  sm: 16px
  md: 24px
  lg: 40px
  xl: 64px
  max_width: 1200px
  gutter: 24px
  margin_mobile: 16px
---

## Brand & Style

The design system is anchored in the concept of "Smart Printing"—bridging the gap between traditional industrial printing and modern digital efficiency. The aesthetic is **Corporate Modern**, prioritizing reliability, precision, and ease of use. It targets a professional demographic in Uttar Pradesh ranging from small business owners to wedding planners, requiring a UI that feels both authoritative and approachable.

The visual language utilizes a structured hierarchy with ample white space to reduce cognitive load during complex booking workflows. It balances high-performance utility with a clean, mobile-first interface that transitions seamlessly to a centered, high-density desktop experience.

## Colors

The palette is dominated by **Brand Blue**, signaling stability and technical competence. 
- **Primary Gradient**: Reserved for high-impact areas like Hero sections, logo backdrops, and primary action containers to create depth and brand recognition.
- **Surface Strategy**: A two-tier background approach uses an off-white base (`#F7F9FC`) to define the workspace, while pure white (`#FFFFFF`) is used for cards and interactive panels to elevate content.
- **Typography Colors**: Deep Navy is used for all primary headings to ensure high legibility and contrast, while Slate Grey handles metadata and secondary information.
- **Accents**: Muted Gold is a functional accent color strictly reserved for the "Wedding Cards" category to evoke tradition and premium quality without breaking the corporate structure.

## Typography

This design system uses a dual-font strategy to balance character with utility. 
- **Headings**: Poppins (Semibold) provides a geometric, modern feel that aligns with the "Smart" brand narrative.
- **Body & UI**: Inter is utilized for its exceptional legibility in data-heavy workflows and forms.
- **Localization**: Noto Sans Devanagari is the standard for Hindi text, matched in optical size to the English Inter body text to ensure a harmonious bilingual reading experience.
- **Scale**: Large display titles (H1) should scale down on mobile devices to prevent excessive line-breaking, while body text remains constant at 16px to maintain a 44px-friendly touch rhythm.

## Layout & Spacing

The layout follows a **Fixed-Fluid hybrid model**. On desktop, the interface is centered with a maximum width of 1200px to ensure optimal line lengths for reading and data entry. 
- **Grid**: A 12-column grid is used for desktop layouts, transitioning to a single-column layout for forms and a 2-column grid for product cards on mobile.
- **Rhythm**: All spacing is derived from a 4px base unit. 
- **Touch Targets**: A minimum height of 44px is strictly enforced for all interactive elements (buttons, input fields, list items) to accommodate mobile usage in on-the-go environments.

## Elevation & Depth

This design system utilizes **Tonal Layering** combined with subtle shadows to define hierarchy. 
- **The Flat Layer**: The background (`#F7F9FC`) acts as the canvas.
- **The Raised Layer**: Interactive cards and panels use a pure white surface (`#FFFFFF`) with a 1px border (`#E1E7F0`). 
- **Shadows**: Only the Raised Layer receives a shadow. Use a soft, diffused shadow: `0 4px 12px rgba(11, 47, 107, 0.05)`. The shadow color is slightly tinted with the Deep Navy text color to keep the UI grounded and cohesive.
- **Active State**: Upon hover or interaction, cards may increase elevation slightly (8px blur) to provide tactile feedback.

## Shapes

The shape language is defined by the **10px corner radius**, directly derived from the brand's logo mark. This creates a "soft-square" aesthetic that feels more organized and professional than fully rounded "pill" shapes, while remaining friendlier than sharp corners.
- **Standard**: 10px (`0.625rem`) for cards, buttons, and input fields.
- **Large Elements**: For larger containers or modal overlays, use a 16px radius to maintain visual proportion.
- **Small Elements**: Status badges and tags use a smaller 4px radius to avoid looking like circular buttons.

## Components

- **Buttons**: Primary buttons use the Brand Blue background with white text. They must have a minimum height of 48px for primary actions. Secondary buttons use a 1px border of Brand Blue with no fill.
- **Input Fields**: Fields feature a 10px radius, a 1px `#E1E7F0` border, and 16px internal horizontal padding. On focus, the border color shifts to Brand Blue with a subtle 2px outer glow.
- **Cards**: All workflow items (orders, quotes, tracking) are housed in cards. Cards use the pure white surface and the defined 10px radius.
- **Status Badges**: Small, high-contrast labels for workflow tracking. 
    - *Pending*: Background of Warning (Amber) at 10% opacity, text in solid Amber.
    - *In Progress*: Background of Primary Blue at 10% opacity, text in solid Blue.
    - *Completed*: Background of Success (Green) at 10% opacity, text in solid Green.
- **Workflow Tracker**: A vertical or horizontal linear stepper component using the Primary Blue for active steps and Slate Grey for upcoming steps, ensuring clear visualization of the "Smart" booking process.