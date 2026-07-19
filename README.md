# JR Printiq Booking Platform

A fully functional static web application for JR Printiq, a premium printing service based in Uttar Pradesh. The platform enables clients to browse a catalog, customize printing options, get instant estimates, and place orders.

## Features

- **Smart Print Utility:** Interactive instant price estimator for various print products.
- **Product Catalog:** Browse wedding cards, visiting cards, and more with filtering by GSM and language.
- **Booking Form:** Detailed requirement collection including text details, design uploads, and delivery specs.
- **Order Tracking:** Real-time lookup of booking status.
- **Admin Dashboard (Demo):** Backend view for staff to manage orders, assign printers, and update statuses.
- **Bilingual Support:** Interface toggle between English and Hindi.
- **Local Storage MVP:** Data is persisted in the browser's local storage for demo purposes.

## Technology Stack

- **HTML5 & CSS3:** Semantic structure and modern styling.
- **Tailwind CSS (CDN):** Rapid utility-first styling.
- **Vanilla JavaScript:** UI logic, local storage state management, and component rendering.
- **Google Fonts:** Poppins (Headings), Inter (Body), Noto Sans Devanagari (Hindi).
- **Material Symbols:** Iconography.

## Project Structure

```
├── about/                    # About Us & Contact page
├── admin/                    # Admin Dashboard and Login
├── booking_confirmation/     # Success page after booking
├── booking_requirement_form/ # Detailed order form
├── catalog_wedding_cards/    # Product listing
├── design_detail_wedding_card/ # Individual product view
├── home_page/                # Landing page
├── order_tracking/           # Client order lookup
├── price_change_notice/      # Status specific view
├── proof_approval/           # Client proof review
├── shared/                   # Shared JS (components, tokens)
├── smart_print_utility/      # Instant quote tool
├── terms/                    # Terms and Policies
├── index.html                # Root redirect
├── .nojekyll                 # GitHub Pages config
└── README.md
```

## Setup & Deployment

Since this is a static site utilizing CDN resources, no build step is required.

### Local Development
Simply open the `index.html` file in any modern web browser, or use a local live server extension (like VS Code Live Server).

### GitHub Pages Deployment
This repository is configured to be hosted on GitHub Pages.
1. Go to repository Settings > Pages.
2. Select the `main` branch and the `/ (root)` folder.
3. Save. The `.nojekyll` file ensures Tailwind CSS classes render correctly.

## Demo Data
The application will automatically seed demo data (printers, catalog items, and sample bookings) into your browser's local storage upon first load. You can log in to the admin dashboard using:
- **Username:** admin
- **Password:** admin123
