import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  GrainOverlay,
  FloatingLeaves,
  Marquee,
  TiltCard,
  AnimatedCounter,
  Avatar,
  MagneticButton,
  MediaPlaceholder,
  Reveal,
  SunFlare,
  SectionDivider,
  LeafMark,
  Field,
  TextInput,
  Textarea,
  Select,
} from '@verdant/ui'
import { profile, keywords, projects, stats, timeline, services } from './data/portfolio.js'

const navLinks = [
  { href: '#about', label: '關於' },
  { href: '#work', label: '作品' },
  { href: '#experience', label: '經歷' },
  { href: '#contact', label: '聯絡' },
]

function ContactForm() {
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
  }

  if (sent) {
    return (
      <div className="p-contact__done">
        <LeafMark size={40} />
        <h3 className="serif">訊息已送出，謝謝你！</h3>
        <p>這是示範表單，並未真的寄出。我會盡快回覆每一封來信。</p>
      </div>
    )
  }

  return (
    <form className="p-form" onSubmit={handleSubmit}>
      <Field label="你的名字">
        <TextInput name="name" placeholder="如何稱呼你？" required />
      </Field>
      <Field label="電子郵件">
        <TextInput type="email" name="email" placeholder="you@example.com" required />
      </Field>
      <Field label="合作類型" full>
        <Select
          name="service"
          placeholder="請選擇服務項目"
          options={services.map((s) => ({ value: s, label: s }))}
        />
      </Field>
      <Field label="聊聊你的專案" full>
        <Textarea name="message" rows={4} placeholder="想做什麼？預算與時程大概是？" />
      </Field>
      <div className="p-form__actions">
        <MagneticButton type="submit" className="btn btn--primary">
          送出邀約
        </MagneticButton>
      </div>
    </form>
  )
}

export default function App() {
  return (
    <>
      {/* 全站顆粒質感覆蓋 */}
      <GrainOverlay opacity={0.05} />

      {/* ===== Nav ===== */}
      <header className="p-nav">
        <div className="container p-nav__inner">
          <a href="#top" className="p-nav__brand">
            <LeafMark size={24} />
            {profile.name}
            <span className="p-nav__latin">{profile.latin}</span>
          </a>
          <nav className="p-nav__links">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} className="p-nav__link">
                {l.label}
              </a>
            ))}
          </nav>
          <a href="#contact" className="btn btn--ghost p-nav__cta">
            合作邀約
          </a>
        </div>
      </header>

      {/* ===== Hero ===== */}
      <section className="p-hero" id="top">
        <FloatingLeaves count={14} color="var(--sage-400)" speed={0.8} />
        <SunFlare />
        <div className="container p-hero__inner">
          <motion.span
            className="eyebrow p-hero__eyebrow"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {profile.role}
          </motion.span>
          <motion.h1
            className="p-hero__title"
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            {profile.tagline.split('\n').map((line, i) => (
              <span key={i}>
                {line}
                <br />
              </span>
            ))}
          </motion.h1>
          <motion.p
            className="p-hero__lede"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            我是 {profile.name}，{profile.role}。為品牌打造會呼吸的視覺系統。
          </motion.p>
          <motion.div
            className="p-hero__actions"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <a href="#work">
              <MagneticButton className="btn btn--primary">看看作品</MagneticButton>
            </a>
            <a href="#contact" className="btn btn--ghost">
              聊聊合作
            </a>
          </motion.div>
        </div>
        <div className="p-hero__scroll" aria-hidden="true">
          <span />
        </div>
      </section>

      {/* ===== Keyword Marquee ===== */}
      <section className="p-marquee" aria-label="專長領域">
        <Marquee speed={32} gap="2.5rem">
          {keywords.map((k) => (
            <span key={k} className="p-marquee__item">
              {k}
              <LeafMark size={16} />
            </span>
          ))}
        </Marquee>
      </section>

      {/* ===== About ===== */}
      <section className="container section p-about" id="about">
        <Reveal className="p-about__media">
          <Avatar size={240} alt={`${profile.name}的肖像`} />
        </Reveal>
        <div className="p-about__body">
          <Reveal>
            <span className="eyebrow">關於我</span>
            <h2 className="p-about__title">設計，是替品牌找到氣味</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="p-about__text">{profile.intro}</p>
          </Reveal>
          <Reveal delay={0.2} className="p-about__sign">
            <LeafMark size={22} />
            <span>
              {profile.name} · {profile.latin}
            </span>
          </Reveal>
        </div>
      </section>

      <SectionDivider />

      {/* ===== Selected Work ===== */}
      <section className="container section p-work" id="work">
        <div className="sec-head">
          <Reveal>
            <span className="eyebrow">精選作品</span>
            <h2>近期的設計實踐</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p>從品牌識別到數位體驗，每個專案都試著讓品牌更貼近自然的語彙。</p>
          </Reveal>
        </div>

        <div className="grid grid--feature">
          {projects.map((p, i) => (
            <Reveal key={p.id} delay={(i % 3) * 0.08}>
              <TiltCard glare className="p-card">
                <div className="p-card__media">
                  <MediaPlaceholder
                    type="image"
                    width={1200}
                    height={900}
                    ratio="4 / 3"
                    label={p.title}
                  />
                  <span className="p-card__year">{p.year}</span>
                </div>
                <div className="p-card__body">
                  <span className="p-card__cat">{p.category}</span>
                  <h3 className="p-card__title">{p.title}</h3>
                  <p className="p-card__desc">{p.desc}</p>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===== Stats ===== */}
      <section className="p-stats">
        <div className="container p-stats__grid">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08} className="p-stat">
              <span className="p-stat__num">
                <AnimatedCounter value={s.value} suffix={s.suffix} />
              </span>
              <span className="p-stat__label">{s.label}</span>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===== Experience ===== */}
      <section className="container section p-exp" id="experience">
        <div className="sec-head">
          <Reveal>
            <span className="eyebrow">經歷</span>
            <h2>一路走來的足跡</h2>
          </Reveal>
        </div>
        <ol className="p-timeline">
          {timeline.map((t, i) => (
            <Reveal as="li" key={t.year} delay={i * 0.06} className="p-timeline__item">
              <span className="p-timeline__year">{t.year}</span>
              <div className="p-timeline__content">
                <h3 className="p-timeline__title">{t.title}</h3>
                <p className="p-timeline__desc">{t.desc}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* ===== Contact ===== */}
      <section className="p-contact" id="contact">
        <FloatingLeaves count={9} color="var(--moss-500)" speed={0.6} />
        <div className="container p-contact__inner">
          <Reveal className="p-contact__intro">
            <span className="eyebrow">合作邀約</span>
            <h2>有個品牌想種進森林嗎？</h2>
            <p>
              不論是全新品牌、改版或單次合作，歡迎來信聊聊。也可以直接寫信到{' '}
              <a href={`mailto:${profile.email}`} className="p-contact__email">
                {profile.email}
              </a>
              。
            </p>
          </Reveal>
          <Reveal delay={0.1} className="p-contact__card">
            <ContactForm />
          </Reveal>
        </div>
      </section>

      {/* ===== Footer ===== */}
      <footer className="p-footer">
        <div className="container p-footer__inner">
          <div className="p-footer__brand">
            <LeafMark size={26} />
            <span>
              {profile.name}
              <small>{profile.latin}</small>
            </span>
          </div>
          <nav className="p-footer__social">
            <a href="#top">Instagram</a>
            <a href="#top">Behance</a>
            <a href="#top">Dribbble</a>
            <a href={`mailto:${profile.email}`}>Email</a>
          </nav>
          <p className="p-footer__fine">
            © {new Date().getFullYear()} {profile.name} · 版型示範 · 以 @verdant/ui 打造
          </p>
        </div>
      </footer>
    </>
  )
}
