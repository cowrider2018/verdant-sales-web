import { Link, useNavigate } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import {
  MediaPlaceholder,
  MagneticButton,
  Parallax,
  Reveal,
  SunFlare,
  SectionDivider,
  formatPrice,
} from '@verdant/ui'
import DatePicker from '../components/DatePicker.jsx'
import { rooms } from '../data/rooms.js'
import { useBooking } from '../context/BookingContext.jsx'

const schedule = [
  { time: '15:00', title: '抵達 · 入住', text: '放下行李，門口換上拖鞋，先為自己沖一壺山泉煮的熱茶。' },
  { time: '16:30', title: '森林裸湯', text: '檜木湯屋藏在林間，霧氣與綠意一起漫上來，洗去一路的城市。' },
  { time: '18:30', title: '山系餐桌', text: '當令野菜與小農食材，主廚依當日採收決定菜單，配一杯產地咖啡。' },
  { time: '20:00', title: '營火夜談', text: '圍著營火，聽山的故事與住客的旅程，星空在樹梢之間慢慢亮起。' },
  { time: '06:00', title: '觀星與晨霧', text: '推開窗就是一整片呼吸的綠，或登上觀星閣樓，看晨霧從谷底升起。' },
]

export default function Home() {
  const reduce = useReducedMotion()
  const navigate = useNavigate()
  const { draft, update } = useBooking()
  const featured = rooms.slice(0, 3)

  return (
    <>
      {/* ===== Split hero ===== */}
      <section className="container bhero">
        <div className="bhero__copy">
          <Reveal>
            <span className="eyebrow">森林旅宿 · Verdant Stay</span>
            <h1 className="serif">在樹梢與星空之間入眠</h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="bhero__lede">
              隱身山林的慢宿。樹屋、溪畔木屋與觀星閣樓，選一處安放疲憊，讓森林替你調慢呼吸。
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="bhero__actions">
              <Link to="/rooms">
                <MagneticButton className="btn btn--primary">瀏覽房型</MagneticButton>
              </Link>
              <Link to="/rooms/canopy-treehouse" className="btn btn--ghost">
                人氣樹屋
              </Link>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="bhero__media">
          <Parallax speed={reduce ? 0 : 40} style={{ height: '112%', marginTop: '-6%' }}>
            <MediaPlaceholder type="image" width={1000} height={1200} label="旅宿主視覺" bare />
          </Parallax>
          <SunFlare />
        </Reveal>
      </section>

      {/* ===== Booking search bar ===== */}
      <section className="container">
        <Reveal className="searchbar" y={20}>
          <DatePicker
            checkIn={draft.checkIn}
            checkOut={draft.checkOut}
            guests={draft.guests}
            onChange={update}
          />
          <MagneticButton
            className="btn btn--gold searchbar__go"
            onClick={() => navigate('/rooms')}
          >
            查空房
          </MagneticButton>
        </Reveal>
      </section>

      {/* ===== Featured rooms — editorial rows ===== */}
      <section className="section container" id="rooms">
        <div className="sec-head">
          <Reveal>
            <span className="eyebrow">精選房型</span>
            <h2>選一處，安放此刻</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p>從樹梢到溪畔，每一間都被森林環抱。低調的木質與綠意，是給疲憊旅人的溫柔提案。</p>
          </Reveal>
        </div>

        <div className="feature-rows">
          {featured.map((room, i) => {
            const [w, h] = room.placeholders.main
            return (
              <Reveal key={room.id}>
                <article className={`feature-row ${i % 2 === 1 ? 'feature-row--rev' : ''}`}>
                  <Link to={`/rooms/${room.id}`} className="feature-row__media" aria-label={room.name}>
                    <MediaPlaceholder type="image" width={w} height={h} ratio="4 / 3" label={room.name} />
                  </Link>
                  <div className="feature-row__body">
                    <span className="feature-row__cat">
                      {room.type} · 可住 {room.capacity} 人 · {room.size}
                    </span>
                    <h3 className="feature-row__name">{room.name}</h3>
                    <p className="feature-row__blurb">{room.blurb}</p>
                    <div className="feature-row__foot">
                      <span className="price">
                        {formatPrice(room.pricePerNight)} <small>/ 晚</small>
                      </span>
                      <Link to={`/rooms/${room.id}`} className="btn btn--ghost">
                        查看房型 →
                      </Link>
                    </div>
                  </div>
                </article>
              </Reveal>
            )
          })}
        </div>

        <Reveal className="center" delay={0.1}>
          <div style={{ marginTop: '3.5rem' }}>
            <Link to="/rooms" className="btn btn--primary">查看全部房型 →</Link>
          </div>
        </Reveal>
      </section>

      <SectionDivider />

      {/* ===== Day timeline ===== */}
      <section className="section container" id="facilities">
        <div className="sec-head">
          <Reveal>
            <span className="eyebrow">森林一日</span>
            <h2>住一晚，森活一整天</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p>從午後入住到清晨晨霧，旅宿替你把一整天的節奏都安排好了。</p>
          </Reveal>
        </div>

        <motion.div
          className="timeline"
          variants={{ show: { transition: { staggerChildren: 0.08 } } }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
        >
          {schedule.map((s, i) => (
            <motion.div
              key={s.title}
              className="timeline__item"
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
              }}
            >
              <div className="timeline__marker">
                <span className="timeline__num">{i + 1}</span>
              </div>
              <div className="timeline__body">
                <span className="timeline__time">{s.time}</span>
                <h3 className="timeline__title">{s.title}</h3>
                <p className="timeline__text">{s.text}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ===== CTA band ===== */}
      <section className="section container" id="location">
        <Reveal className="cta-band">
          <div className="cta-band__media">
            <MediaPlaceholder type="image" width={1600} height={900} label="森林夜色" bare />
          </div>
          <div className="cta-band__scrim" />
          <div className="cta-band__inner">
            <span className="eyebrow" style={{ color: 'var(--gold-300)' }}>關於旅宿</span>
            <h2 className="serif">把房子，蓋進森林的縫隙裡</h2>
            <p>不砍樹，而是讓建築退讓給森林——沿著既有的樹與石，把每一間房安放進林子的縫隙。即時查詢空房與房價，三步驟完成預約。</p>
            <div className="cta-band__stats">
              <div>
                <div className="stat__num">6</div>
                <div className="stat__label">獨立房型</div>
              </div>
              <div>
                <div className="stat__num">12</div>
                <div className="stat__label">公頃森林</div>
              </div>
              <div>
                <div className="stat__num">4.9</div>
                <div className="stat__label">旅客評分</div>
              </div>
            </div>
            <div style={{ marginTop: '2rem' }}>
              <Link to="/rooms">
                <MagneticButton className="btn btn--gold">開始預約</MagneticButton>
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  )
}
