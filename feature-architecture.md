# Home Loan by Sanjay Kumar Pandey feature architecture

## Customer journey

The customer journey remains a single clear path: discover a loan route, calculate the monthly number, check indicative eligibility, compare lenders, create a consent-aware lead, continue on WhatsApp or phone, prepare documents, and track the application lifecycle. The site will preserve the Signal House header, six-step journey rail, sticky mobile actions, and page-specific editorial guidance.

## Frontend-complete feature layer

The static repository will implement the full user-facing experience for EMI, amortization, eligibility, balance transfer, top-up, smart matching, lender comparison, multi-step lead capture, shortlisting, document readiness, application tracking, account-style views, notification states, glossary, FAQ, PMAY checker, attribution visibility, and admin prototypes. State that is safe to demonstrate locally will persist in browser storage with transparent prototype labels.

## New route surfaces

The additional feature routes are `account.html`, `documents.html`, `notifications.html`, `lenders.html`, `faq.html`, and `assistant.html`. Existing routes remain stable. The admin prototype will gain tabs for leads, customers, lenders, applications, documents, marketing, and notifications.

## Data model vocabulary

The frontend uses leads, customers, applications, documents, lender profiles, events, notifications, and shortlist records. Each lead carries an ID, source, UTM fields, first-touch and last-touch attribution, score, status, and created timestamp. Each application carries a lifecycle stage, checklist state, and indicative lender selection.

## Production boundaries

OTP, authenticated customer accounts, role-based admin access, secure document storage, server-side duplicate detection, real notifications, lender APIs, AI responses, audit logs, backups, and rate limiting are represented as clearly labelled frontend prototypes. They require a backend, secrets, secure storage, service credentials, and policy review before real customer data is processed.

## Content policy

The website will not fabricate customer testimonials, ratings, reviews, or success claims. Trust will be communicated through process clarity, lender verification notices, educational content, transparent indicative labels, and direct advisory actions.
