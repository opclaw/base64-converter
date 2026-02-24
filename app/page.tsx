'use client'

import { useState } from 'react'
import styles from './page.module.css'

export default function Home() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [mode, setMode] = useState('encode')

  const handleConvert = () => {
    try {
      if (mode === 'encode') {
        setOutput(btoa(input))
      } else {
        setOutput(atob(input))
      }
    } catch (e) {
      setOutput('Error: Invalid input')
    }
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Base64 Converter</h1>
      <div className={styles.modes}>
        <button onClick={() => setMode('encode')} className={mode === 'encode' ? `${styles.modeBtn} ${styles.active}` : styles.modeBtn}>Encode</button>
        <button onClick={() => setMode('decode')} className={mode === 'decode' ? `${styles.modeBtn} ${styles.active}` : styles.modeBtn}>Decode</button>
      </div>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={mode === 'encode' ? 'Text to encode' : 'Base64 to decode'}
        className={styles.input}
      />
      <button onClick={handleConvert} className={styles.convertBtn}>{mode === 'encode' ? 'Encode' : 'Decode'}</button>
      <textarea value={output} readOnly placeholder="Result" className={styles.output} />
    </div>
  )
}