import Marquee from "react-fast-marquee";

const languages = [
  "ಕನ್ನಡ  Kannada",
  "हिंदी  Hindi",
  "English",
  "தமிழ்  Tamil",
  "తెలుగు  Telugu",
  "മലയാളം  Malayalam",
  "বাংলা  Bengali",
  "मराठी  Marathi",
  "ગુજરાતી  Gujarati",
  "ਪੰਜਾਬੀ  Punjabi",
  "اردو  Urdu",
];

export default function LanguageMarquee() {
  return (
    <section data-testid="language-marquee" className="py-6 bg-[#B5C9B3]/10 border-y border-[#E4E4E7]">
      <Marquee speed={40} gradient={false} pauseOnHover>
        {languages.map((lang, i) => (
          <span
            key={i}
            className="mx-12 text-sm font-medium text-[#52525B] tracking-wide"
          >
            {lang}
            <span className="ml-12 text-[#25D366]/30">&#x2022;</span>
          </span>
        ))}
      </Marquee>
    </section>
  );
}
