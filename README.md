# NEXONE

A polished static prototype for a paid cybersecurity learning platform inspired by modern course marketplaces.

## Included

- Responsive landing page
- Searchable and filterable course catalog
- Course detail pages
- Payment-style checkout with GCash, Maya, QR PH, and card choices
- Demo voucher: `NEXONE10`
- Local learner profile and enrollment state
- Course player with lesson completion
- Progress dashboard
- Printable completion certificate with unique certificate ID
- Legal, privacy, and refund template pages

## Run locally

Open `index.html` directly, or run a local web server:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Important production notes

This is a front-end prototype. The checkout is deliberately simulated and does not collect real money or payment credentials.

Before public launch, connect it to:

1. A secure backend and database
2. A licensed payment provider
3. User authentication and email verification
4. Server-side enrollment and certificate verification
5. Real course videos, assessments, and lab infrastructure
6. Privacy, terms, tax, refund, and consumer-protection compliance
7. Security testing, logging, rate limits, backups, and incident response

Do not remove the demo-payment disclosure until a real, compliant payment integration is complete.

## Generated branding assets

The `assets/` folder now includes a generated NEXONE logo mark (`logo-mark.png`), a full logo (`logo-full.png`), and custom course banner images for each course path.
