import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Reveal, MediaPlaceholder, formatPrice } from '@verdant/ui'
import { rooms, roomTypes } from '../data/rooms.js'

export default function Rooms() {
  const [active, setActive] = useState('全部')

  const filtered =
    active === '全部' ? rooms : rooms.filter((r) => r.type === active)

  return (
    <>
      <section className="container page-head">
        <Reveal>
          <span className="eyebrow">全部房型</span>
          <h1>挑一間屬於你的森林居所</h1>
          <p>從兩人樹屋到六人獨棟 Villa，依人數與心情選房。所有房價皆含早餐與步道導覽。</p>
        </Reveal>
      </section>

      <section className="container section" style={{ paddingTop: '2rem' }}>
        <Reveal className="filters">
          {roomTypes.map((t) => (
            <button
              key={t}
              className={`chip ${active === t ? 'chip--active' : ''}`}
              onClick={() => setActive(t)}
            >
              {t}
            </button>
          ))}
        </Reveal>

        <motion.div layout className="feature-rows">
          <AnimatePresence mode="popLayout">
            {filtered.map((room, i) => {
              const [w, h] = room.placeholders.main
              return (
                <motion.article
                  key={room.id}
                  layout
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 24 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className={`feature-row ${i % 2 === 1 ? 'feature-row--rev' : ''}`}
                >
                  <Link to={`/rooms/${room.id}`} className="feature-row__media" aria-label={room.name}>
                    {room.tag && <span className="card__tag">{room.tag}</span>}
                    <MediaPlaceholder type="image" width={w} height={h} ratio="4 / 3" label={room.name} />
                  </Link>
                  <div className="feature-row__body">
                    <span className="feature-row__cat">
                      {room.type} · 可住 {room.capacity} 人 · {room.size}
                    </span>
                    <h2 className="feature-row__name">{room.name}</h2>
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
                </motion.article>
              )
            })}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <p className="center" style={{ padding: '3rem', color: 'var(--ink-faint)' }}>
            此類型暫無房型。
          </p>
        )}
      </section>
    </>
  )
}
