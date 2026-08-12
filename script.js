const translations = {
  en: {
    brandTag: "Ad Investigator", languageButton: "العربية", navHow: "How it works", navPrivacy: "Privacy", navPolicy: "Policy",
    eyebrow: "Your local intrusive-ad investigator", heroLine1: "An ad appeared suddenly?", heroLine2: "See what came before it.",
    heroLead: "AppWatcher compares recent app activity and shows three candidates with clear evidence — without uploading your installed-app names to a server.",
    getIt: "Get it on", seeHow: "See how it works", trustOffline: "Works offline", trustLocal: "Processed locally", trustNoAI: "No AI service",
    mockTitle: "Investigation", mockLocal: "Local on this device", mockIncident: "An ad appeared now", mockWindow: "Last 3 minutes", mockCandidates: "Strongest candidates", mockEvidence: "Ranked by evidence", mockApp1: "Recently active app", mockApp2: "Another app", strong: "Strong candidate", medium: "Medium", reasonTime: "Appeared 8 seconds before the incident", reasonSource: "Unknown install source", badgeTitle: "Nothing leaves your device", badgeBody: "Names and history stay local",
    statWindow: "minute window", statCandidates: "clear candidates", statHistory: "days of local history", statUploads: "package names uploaded",
    howKicker: "One moment. A clear result.", howTitle: "From intrusive ad to evidence in three steps", step1Title: "Capture the moment", step1Body: "Tap “An ad appeared now” and choose a 1, 3, or 5 minute look-back window.", step2Title: "Compare activity", step2Body: "Timing, repetition, and install source are analyzed locally, without alarming verdicts.", step3Title: "Make the decision", step3Body: "Open Android app info or its official uninstall flow, then confirm the result yourself.",
    evidenceKicker: "Evidence, not guesses.", evidenceTitle: "See why each app was suggested", evidenceBody: "We do not call an app “malicious” or “safe.” We show understandable signals and leave the final decision to you.", readPolicy: "Read the privacy policy", ev1Title: "Appeared just before the incident", ev1Body: "A strong timing signal", ev2Title: "Repeated activity", ev2Body: "Within the selected window", ev3Title: "Unknown install source", ev3Body: "A supporting signal, not a verdict",
    privacyKicker: "Local by design.", privacyTitle: "Your phone is not cloud-analysis material", privacyBody: "App names, usage events, and incident history stay on your device. The app uses Google Mobile Ads for one native ad after results, following the required consent flow.", privacyPoint1: "No package-name uploads", privacyPoint2: "No Firebase analytics", privacyPoint3: "Clear history anytime",
    ctaKicker: "Ready for the next ad", ctaTitle: "Let the evidence appear before you remove the wrong app.", downloadNow: "Download AppWatcher", footerNote: "A local intrusive-ad investigator for Android.", contact: "Contact", backHome: "Home",
    policyEyebrow: "Privacy first", policyTitle: "A privacy policy as clear as the evidence.", policyUpdated: "Last updated: August 12, 2026", policySummaryTitle: "In short", policySummaryBody: "Investigation data stays on your device. Google's ad services handle ad data according to your choices and Google's policies."
  }
};

const root = document.documentElement;
const langButton = document.querySelector("[data-language-toggle]");
const themeButton = document.querySelector("[data-theme-toggle]");

function applyLanguage(language) {
  const isEnglish = language === "en";
  root.lang = isEnglish ? "en" : "ar";
  root.dir = isEnglish ? "ltr" : "rtl";
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    if (isEnglish && translations.en[node.dataset.i18n]) node.textContent = translations.en[node.dataset.i18n];
    if (!isEnglish) node.textContent = node.dataset.ar;
  });
  document.querySelectorAll("[data-policy-ar]").forEach((node) => { node.hidden = isEnglish; });
  document.querySelectorAll("[data-policy-en]").forEach((node) => { node.hidden = !isEnglish; });
  localStorage.setItem("appwatcher-language", language);
}

function applyTheme(theme) {
  root.dataset.theme = theme;
  localStorage.setItem("appwatcher-theme", theme);
}

langButton?.addEventListener("click", () => applyLanguage(root.lang === "ar" ? "en" : "ar"));
themeButton?.addEventListener("click", () => applyTheme(root.dataset.theme === "dark" ? "light" : "dark"));
document.querySelectorAll("[data-i18n]").forEach((node) => { node.dataset.ar = node.textContent; });
document.querySelectorAll("[data-current-year]").forEach((node) => { node.textContent = new Date().getFullYear(); });

const preferredTheme = localStorage.getItem("appwatcher-theme") || (matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
applyTheme(preferredTheme);
applyLanguage(localStorage.getItem("appwatcher-language") || "ar");

const header = document.querySelector("[data-header]");
if (header) {
  const updateHeader = () => header.classList.toggle("scrolled", scrollY > 20);
  updateHeader();
  addEventListener("scroll", updateHeader, { passive: true });
}
