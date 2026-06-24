import { motion, useReducedMotion } from 'framer-motion'

/**
 * Timeline — 編號節點的垂直時間軸（如「森林一日」行程）。
 * 每個項目左側為序號圓點＋連接線，右側為時間／標題／敘述；
 * 進入視窗時依序淡入上移，尊重 prefers-reduced-motion（僅保留淡入）。
 * Props:
 *  - items: Array<{ time?, title, text? }>      時間軸資料
 *  - renderMarker: (item, index) => ReactNode   自訂節點內容（預設為序號）
 *  - stagger: number                            子項進場間隔秒數
 *  - className: string
 */
export default function Timeline({
  items = [],
  renderMarker,
  stagger = 0.08,
  className = '',
  ...rest
}) {
  const reduce = useReducedMotion()

  return (
    <motion.div
      className={`timeline ${className}`.trim()}
      variants={{ show: { transition: { staggerChildren: stagger } } }}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
      {...rest}
    >
      {items.map((item, i) => (
        <motion.div
          key={item.title ?? i}
          className="timeline__item"
          variants={{
            hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 20 },
            show: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
            },
          }}
        >
          <div className="timeline__marker">
            {renderMarker ? (
              renderMarker(item, i)
            ) : (
              <span className="timeline__num">{i + 1}</span>
            )}
          </div>
          <div className="timeline__body">
            {item.time && <span className="timeline__time">{item.time}</span>}
            {item.title && <h3 className="timeline__title">{item.title}</h3>}
            {item.text && <p className="timeline__text">{item.text}</p>}
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}
