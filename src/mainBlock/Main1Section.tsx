import { useEffect, useRef } from "react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "./Main1Section.css";

import { main1BackgroundImages, main1Checklist } from "./main1Data";
import { openLegacyBoard } from "./legacyNavigation";

function Main1Section() {
  const swiperRef = useRef<SwiperType | null>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const applyMotionPreference = (isReduced: boolean) => {
      if (!swiperRef.current?.autoplay) {
        return;
      }

      if (isReduced) {
        swiperRef.current.autoplay.stop();
      } else {
        swiperRef.current.autoplay.start();
      }
    };

    applyMotionPreference(mediaQuery.matches);

    const onChange = (event: MediaQueryListEvent) => {
      applyMotionPreference(event.matches);
    };

    mediaQuery.addEventListener("change", onChange);

    return () => {
      mediaQuery.removeEventListener("change", onChange);
    };
  }, []);

  return (
    <div className="tj1-root">
      <main>
        <section className="tj1-hero" aria-labelledby="tj1-hero-title">
          <div className="tj1-hero__bg" aria-hidden="true">
            <Swiper
              className="tj1-hero-bg-swiper"
              modules={[Autoplay, EffectFade, Pagination]}
              loop
              speed={1100}
              effect="fade"
              fadeEffect={{ crossFade: true }}
              autoplay={{ delay: 5200, disableOnInteraction: false }}
              pagination={{ clickable: true }}
              watchSlidesProgress
              onSwiper={(instance) => {
                swiperRef.current = instance;
              }}
            >
              {main1BackgroundImages.map((imageUrl) => (
                <SwiperSlide key={imageUrl}>
                  <div
                    className="tj1-hero-bg-slide"
                    style={{ backgroundImage: `url(${imageUrl})` }}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div className="tj1-hero__overlay" aria-hidden="true" />

          <div className="tj1-hero__inner">
            <div className="tj1-hero__grid">
              <div className="tj1-hero__copy">
                <p className="tj1-hero__eyebrow">Photo · Film · Print</p>
                <h1 className="tj1-hero__title" id="tj1-hero-title">
                  빛으로 남기는 오늘,
                  <br />
                  오래 보는 한 장
                </h1>
                <p className="tj1-hero__lead">
                  인물 · 웨딩 · 가족 촬영을 자연광과 스튜디오 조명으로 담습니다.
                  촬영 후 현장 픽업·택배 인화까지 한 공간에서 마무리할 수 있도록
                  구성했습니다.
                </p>
                <div className="tj1-hero__actions">
                  <button
                    type="button"
                    className="tj1-hero__btn tj1-hero__btn--primary"
                    onClick={() =>
                      openLegacyBoard(
                        "sub02",
                        "예약·문의",
                        "table_1776039954",
                        "/contact",
                      )
                    }
                  >
                    촬영 예약
                  </button>
                  <button
                    type="button"
                    className="tj1-hero__btn tj1-hero__btn--ghost"
                    onClick={() =>
                      openLegacyBoard(
                        "sub02",
                        "포트폴리오",
                        "table_1776040826",
                        "/portfolio",
                      )
                    }
                  >
                    포트폴리오 보기
                  </button>
                </div>
                <div className="tj1-hero__meta">
                  <div className="tj1-hero__meta-row">
                    <strong>운영</strong> 화–일 10:00–19:00 · 월 정기 휴무
                  </div>
                  <div className="tj1-hero__meta-row">
                    <strong>문의</strong> 02-0000-0000 · 서울 OO구 OO로 00
                  </div>
                </div>
              </div>

              <aside className="tj1-hero__aside" aria-label="촬영 스튜디오 요약">
                <p className="tj1-hero__aside-title">This week</p>
                <h2 className="tj1-hero__aside-name">촬영 전 체크</h2>
                <ul className="tj1-hero__aside-list">
                  {main1Checklist.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </aside>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Main1Section;
