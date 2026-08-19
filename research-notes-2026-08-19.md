# Build-time research notes — 19 Aug 2026

## Primary / official source links

- HDFC Bank housing loans: https://homeloans.hdfc.bank.in/housing-loans/home-loans
- HDFC home-loan rate page: https://homeloans.hdfc.bank.in/checklist/home-loan-interest-rates
- SBI Home Loans: https://homeloans.sbi.bank.in/
- Punjab National Bank housing loan page: https://pnb.bank.in/housingloanforpublic.html
- LIC Housing Finance home loan: https://www.lichousing.com/housing-loan/home-loan
- LIC Housing Finance Griha Suvidha: https://www.lichousing.com/housing-loan/griha-suvidha-home-loan
- UP-RERA verification portal: https://www.up-rera.in/verify
- RBI home-loan FAQ / repayment-capacity context: https://www.rbi.org.in/commonman/english/scripts/FAQs.aspx?Id=701

## Confirmed source facts used for implementation

HDFC's official housing-loan page showed a rate band of Policy Repo Rate + 2.50% to 7.95%, displayed as 7.75% to 13.20% on the page extraction. It stated tenure up to 30 years, eligibility for resident salaried and self-employed applicants, and maximum funding of 90% up to ₹30 lakh, 80% from ₹30.01 lakh to ₹75 lakh, and 75% above ₹75 lakh subject to assessment. Its published processing fee was up to 0.50% or ₹4,000 minimum for salaried/self-employed professionals, and up to 1.50% or ₹5,000 minimum for self-employed non-professionals, plus applicable taxes. It stated nil premature-closure charges for adjustable-rate loans during the variable-rate period; fixed-rate closure terms have conditions.

SBI's official home-loan site stated that home-loan rates are linked to the benchmark/repo rate and can change when the repo rate changes. It also stated a network of 16,000+ branches and up to 30-year repayment information on its linked official materials. Rate cards must be date-stamped and marked indicative because the official page does not expose a stable static numeric range in the extracted content.

PNB's official housing-loan page stated that repayment can run up to 30 years, plot-purchase funding under its composite plot + construction scheme is capped at 60% of eligible loan amount, and plot purchase margin is 25%. It links rate and service-charge schedules rather than presenting a stable numeric card in the extracted page, so the static profile should use a clearly marked source-pending / verify-current-rate presentation rather than inventing a number.

LIC Housing Finance's official pages stated maximum tenure up to 30 years. Its Griha Suvidha page exposed processing-fee bands including 0.25% up to ₹1 crore and fixed fees for higher slabs. Its plot-loan page exposed a published "up to 5 cr 7.35%" promotional rate snippet; static copy should not generalize this across all products and must date-stamp it.

UP-RERA's official verification page exposed the official project-verification form and stated that the RERA Act seeks to protect home buyers. The city pages should link to https://www.up-rera.in/verify for project-registration verification and avoid fabricating project or registration numbers.

RBI's FAQ search result described repayment capacity as based on monthly disposable/surplus income and existing obligations. The tiered FOIR calculator will therefore be clearly labeled an indicative planning model, not a lender rule. It will use configurable planning bands (40%, 50%, 60%) and explain that actual lender methods vary; these are not represented as universal bank policy.

## Bank logo mapping policy

Known from filenames / brief: bank_HDFC = HDFC Bank; bank_SBI = State Bank of India; bank_PNB = Punjab National Bank; bank_LIC = LIC Housing Finance; bank_ADH = Aadhar Housing Finance. Unconfirmed codes bank_IND, bank_PRM, bank_SHB, bank_UKR must not receive asserted lender names until the image/source identity is verified. Use a source-pending label or omit them from factual cards.

## Content safety / compliance

No fabricated customer testimonials, ratings, reviews, outcomes, or trust statistics. No guaranteed approvals or rates. All figures must show a date and "indicative — verify with lender" framing. Trust module will present partner-logo / verification workflow content only unless the owner supplies evidence for additional claims.

## Logo identity verification

Visual inspection confirmed bank_IND.png is **Indian Bank** (English and Hindi wordmark). Visual inspection confirmed bank_PRM.png is **Piramal** (Piramal logo and wordmark), not PNB Housing. Do not label either asset as IndusInd or PNB Housing.

Visual inspection confirmed bank_SHB.png is **Shubham Housing Finance**. bank_UKR.png remains to be inspected before assignment.

Visual inspection confirmed bank_UKR.png is a **"No Image Available" placeholder**, not Union Bank. Do not assign Union Bank to this asset.
