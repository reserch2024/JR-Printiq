/**
 * JR Printiq — Shared Design Tokens & Tailwind Configuration
 * This file is loaded by all pages to provide a single source of truth
 * for colors, typography, spacing, and border-radius.
 */

const JR_DESIGN_TOKENS = {
    colors: {
        "on-tertiary-fixed-variant": "#5b4300",
        "on-surface-variant": "#434653",
        "on-secondary-fixed-variant": "#3f4753",
        "on-primary-container": "#cbd6ff",
        "on-error": "#ffffff",
        "on-tertiary": "#ffffff",
        "inverse-on-surface": "#f0f0fa",
        "tertiary": "#5b4200",
        "secondary": "#575f6c",
        "surface-container-low": "#f3f3fd",
        "surface": "#faf8ff",
        "surface-tint": "#1f57c9",
        "outline": "#737685",
        "secondary-fixed-dim": "#bfc7d6",
        "error": "#ba1a1a",
        "on-surface": "#191b22",
        "background": "#faf8ff",
        "primary-fixed": "#dae1ff",
        "surface-container-highest": "#e2e2ec",
        "tertiary-container": "#785901",
        "primary": "#003ea3",
        "on-primary-fixed": "#001849",
        "inverse-surface": "#2e3038",
        "surface-container-high": "#e7e7f1",
        "on-primary": "#ffffff",
        "outline-variant": "#c3c6d6",
        "surface-dim": "#d9d9e3",
        "tertiary-fixed-dim": "#ebc166",
        "on-error-container": "#93000a",
        "on-primary-fixed-variant": "#003fa4",
        "secondary-container": "#d8e0ef",
        "on-secondary-container": "#5b6370",
        "surface-bright": "#faf8ff",
        "surface-container-lowest": "#ffffff",
        "on-background": "#191b22",
        "primary-fixed-dim": "#b3c5ff",
        "error-container": "#ffdad6",
        "secondary-fixed": "#dbe3f2",
        "on-secondary-fixed": "#141c27",
        "on-tertiary-fixed": "#261a00",
        "on-tertiary-container": "#fdd276",
        "tertiary-fixed": "#ffdf9e",
        "inverse-primary": "#b3c5ff",
        "surface-variant": "#e2e2ec",
        "primary-container": "#1e56c8",
        "on-secondary": "#ffffff",
        "surface-container": "#ededf7",
        "brand-gold": "#C9A24B",
        "success": "#2E8B57",
        "warning": "#C98A1F",
        "danger": "#C0392B"
    },
    borderRadius: {
        "DEFAULT": "10px",
        "lg": "10px",
        "xl": "12px",
        "full": "9999px",
        "brand": "10px"
    },
    spacing: {
        "xl": "64px",
        "xs": "8px",
        "gutter": "24px",
        "sm": "16px",
        "max_width": "1200px",
        "md": "24px",
        "margin_mobile": "16px",
        "base": "4px",
        "lg": "40px"
    },
    fontFamily: {
        "h1": ["Poppins"],
        "h3": ["Poppins"],
        "body-md": ["Inter"],
        "hindi": ["Noto Sans Devanagari"],
        "hindi-body": ["Noto Sans Devanagari"],
        "h2": ["Poppins"],
        "body-sm": ["Inter"],
        "body-lg": ["Inter"],
        "label-caps": ["Inter"],
        "h1-mobile": ["Poppins"]
    },
    fontSize: {
        "h1": ["40px", {"lineHeight": "1.2", "letterSpacing": "-0.02em", "fontWeight": "600"}],
        "h3": ["24px", {"lineHeight": "1.3", "fontWeight": "600"}],
        "body-md": ["16px", {"lineHeight": "1.5", "fontWeight": "400"}],
        "hindi-body": ["16px", {"lineHeight": "1.6", "fontWeight": "400"}],
        "h2": ["32px", {"lineHeight": "1.3", "fontWeight": "600"}],
        "body-sm": ["14px", {"lineHeight": "1.4", "fontWeight": "400"}],
        "body-lg": ["18px", {"lineHeight": "1.6", "fontWeight": "400"}],
        "label-caps": ["12px", {"lineHeight": "1.0", "letterSpacing": "0.05em", "fontWeight": "600"}],
        "h1-mobile": ["32px", {"lineHeight": "1.2", "fontWeight": "600"}]
    }
};

// Apply Tailwind config
if (typeof tailwind !== 'undefined') {
    tailwind.config = {
        darkMode: "class",
        theme: {
            extend: {
                colors: JR_DESIGN_TOKENS.colors,
                borderRadius: JR_DESIGN_TOKENS.borderRadius,
                spacing: JR_DESIGN_TOKENS.spacing,
                fontFamily: JR_DESIGN_TOKENS.fontFamily,
                fontSize: JR_DESIGN_TOKENS.fontSize
            }
        }
    };
}
