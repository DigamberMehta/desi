import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useLang } from "../contexts/LangContext";
import { Button } from "./ui/button";
import { apiUrl } from "../lib/api";

const HeroBanner = () => {
  const { t } = useLang();
  const [idx, setIdx] = useState(0);
  const [heroSlides, setHeroSlides] = useState([]);

  useEffect(() => {
    fetch(apiUrl("/api/settings"))
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          if (data.data.heroSlides && data.data.heroSlides.length > 0) {
            setHeroSlides(data.data.heroSlides.map((s) => s.image || s));
          } else if (data.data.bannerUrls && data.data.bannerUrls.length > 0) {
            setHeroSlides(data.data.bannerUrls);
          } else {
            setHeroSlides([
              "https://endesi.tsoftstatic.com/Data/BlockUploadData/slider/img1/883/revbanner-1-en-6.jpg?1777872443",
            ]);
          }
        }
      })
      .catch((err) => console.error("Error fetching slides:", err));
  }, []);

  useEffect(() => {
    if (heroSlides.length === 0) return;
    const id = setInterval(
      () => setIdx((i) => (i + 1) % heroSlides.length),
      6000,
    );
    return () => clearInterval(id);
  }, [heroSlides]);

  if (heroSlides.length === 0)
    return (
      <div className="h-[460px] md:h-[560px] lg:h-[620px] bg-neutral-100 flex items-center justify-center">
        Loading...
      </div>
    );

  const s = heroSlides[idx];

  return (
    <section className="relative h-[460px] md:h-[560px] lg:h-[620px] overflow-hidden bg-neutral-100">
      {heroSlides.map((url, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-700 ${i === idx ? "opacity-100 p-0 m-0 w-full h-full block" : "opacity-0 pointer-events-none"}`}
        >
          <img
            src={url}
            alt=""
            className="absolute inset-0 w-full h-full object-contain"
          />
        </div>
      ))}

      {/* Navigation */}
      <button
        onClick={() =>
          setIdx((i) => (i - 1 + heroSlides.length) % heroSlides.length)
        }
        className="absolute start-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/20 hover:bg-black/50 backdrop-blur flex items-center justify-center text-white transition-colors"
        aria-label="Previous"
      >
        <ChevronLeft className="w-5 h-5 rtl:rotate-180" />
      </button>
      <button
        onClick={() => setIdx((i) => (i + 1) % heroSlides.length)}
        className="absolute end-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/20 hover:bg-black/50 backdrop-blur flex items-center justify-center text-white transition-colors"
        aria-label="Next"
      >
        <ChevronRight className="w-5 h-5 rtl:rotate-180" />
      </button>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2">
        {heroSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            className={`h-1.5 rounded-full transition-all ${i === idx ? "w-10 bg-[#E60012]" : "w-2.5 bg-white/50 hover:bg-white/80"}`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroBanner;
