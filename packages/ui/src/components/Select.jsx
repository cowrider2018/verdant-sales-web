import { useState, useRef, useEffect, useLayoutEffect } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

/**
 * Select — 自訂下拉選單，附森林主題選項面板。
 * 受控（傳 value）或非受控（傳 defaultValue）皆可；變更時呼叫 onChange(value)。
 * options 為 [{ value, label, disabled }]。原生 <select> 的清單無法套用樣式，故自繪：
 * 面板以 portal 掛到 document.body，避免被卡片的 overflow / transform / filter 裁切。
 * 傳入 name 時會渲染 hidden input，維持原生表單送出相容。
 */
export default function Select({
  value,
  defaultValue,
  onChange,
  options = [],
  placeholder = '請選擇',
  name,
  disabled = false,
  className = '',
  ...rest
}) {
  const isControlled = value !== undefined
  const [inner, setInner] = useState(defaultValue ?? '')
  const current = isControlled ? value : inner

  const [open, setOpen] = useState(false)
  const [coords, setCoords] = useState(null)
  const [active, setActive] = useState(-1) // 鍵盤 highlight 的索引
  const triggerRef = useRef(null)
  const popRef = useRef(null)
  const reduce = useReducedMotion()

  const selected = options.find((o) => String(o.value) === String(current))

  // 依觸發按鈕位置擺放面板（fixed 定位）
  const place = () => {
    const el = triggerRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    setCoords({ top: r.bottom + 8, left: r.left, width: r.width })
  }
  useLayoutEffect(() => {
    if (open) place()
  }, [open])

  // 開啟時把 highlight 對到目前選中項
  useEffect(() => {
    if (open) setActive(options.findIndex((o) => String(o.value) === String(current)))
  }, [open]) // eslint-disable-line react-hooks/exhaustive-deps

  // 點擊外部 / Esc 關閉；捲動 / 縮放時重新定位
  useEffect(() => {
    if (!open) return
    const onDoc = (e) => {
      if (triggerRef.current && triggerRef.current.contains(e.target)) return
      if (popRef.current && popRef.current.contains(e.target)) return
      setOpen(false)
    }
    const onReposition = () => place()
    document.addEventListener('mousedown', onDoc)
    window.addEventListener('resize', onReposition)
    window.addEventListener('scroll', onReposition, true)
    return () => {
      document.removeEventListener('mousedown', onDoc)
      window.removeEventListener('resize', onReposition)
      window.removeEventListener('scroll', onReposition, true)
    }
  }, [open])

  const pick = (opt) => {
    if (opt.disabled) return
    if (!isControlled) setInner(opt.value)
    onChange?.(opt.value)
    setOpen(false)
    triggerRef.current?.focus()
  }

  // 移到下一個 / 上一個可選項
  const move = (dir) => {
    if (!options.length) return
    let i = active
    for (let step = 0; step < options.length; step += 1) {
      i = (i + dir + options.length) % options.length
      if (!options[i].disabled) {
        setActive(i)
        return
      }
    }
  }

  const onKey = (e) => {
    if (disabled) return
    if (e.key === 'Escape') {
      setOpen(false)
      return
    }
    if (!open && (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault()
      setOpen(true)
      return
    }
    if (!open) return
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      move(1)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      move(-1)
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      if (options[active]) pick(options[active])
    }
  }

  return (
    <div className={`select ${className}`.trim()} {...rest}>
      <button
        ref={triggerRef}
        type="button"
        className={`input select__trigger ${selected ? '' : 'select__trigger--empty'}`.trim()}
        onClick={() => !disabled && setOpen((o) => !o)}
        onKeyDown={onKey}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span>{selected ? selected.label : placeholder}</span>
        <svg
          className={`select__chevron ${open ? 'select__chevron--open' : ''}`.trim()}
          viewBox="0 0 24 24"
          width="14"
          height="14"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {name && <input type="hidden" name={name} value={current ?? ''} />}

      {createPortal(
        <AnimatePresence>
          {open && coords && (
            <motion.ul
              ref={popRef}
              className="select__pop"
              role="listbox"
              style={{ top: coords.top, left: coords.left, minWidth: coords.width }}
              initial={reduce ? false : { opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -6 }}
              transition={{ duration: 0.18 }}
            >
              {options.map((opt, i) => (
                <li key={String(opt.value)} role="option" aria-selected={String(opt.value) === String(current)}>
                  <button
                    type="button"
                    className={
                      'select__opt' +
                      (String(opt.value) === String(current) ? ' select__opt--sel' : '') +
                      (i === active ? ' select__opt--active' : '')
                    }
                    disabled={opt.disabled}
                    onMouseEnter={() => setActive(i)}
                    onClick={() => pick(opt)}
                  >
                    {opt.label}
                  </button>
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  )
}
