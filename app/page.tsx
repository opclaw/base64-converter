'use client'

import { useState, useCallback } from 'react'
import styles from './page.module.css'

export default function Home() {
  const [mode, setMode] = useState<'encode' | 'decode'>('encode')
  const [inputType, setInputType] = useState<'text' | 'file'>('text')
  const [textInput, setTextInput] = useState('')
  const [fileInput, setFileInput] = useState<File | null>(null)
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  const handleEncode = useCallback(() => {
    try {
      setError('')
      if (inputType === 'text') {
        if (!textInput) {
          setError('Please enter text to encode')
          return
        }
        const encoded = btoa(unescape(encodeURIComponent(textInput)))
        setOutput(encoded)
      } else {
        if (!fileInput) {
          setError('Please select a file')
          return
        }
        const reader = new FileReader()
        reader.onload = (e) => {
          const base64 = (e.target?.result as string)?.split(',')[1] || ''
          setOutput(base64)
        }
        reader.readAsDataURL(fileInput)
      }
    } catch (e) {
      setError('Encoding failed: ' + (e instanceof Error ? e.message : 'Unknown error'))
    }
  }, [inputType, textInput, fileInput])

  const handleDecode = useCallback(() => {
    try {
      setError('')
      if (!textInput) {
        setError('Please enter Base64 to decode')
        return
      }
      const decoded = decodeURIComponent(escape(atob(textInput)))
      setOutput(decoded)
    } catch (e) {
      setError('Invalid Base64 string')
    }
  }, [textInput])

  const handleProcess = () => {
    if (mode === 'encode') {
      handleEncode()
    } else {
      handleDecode()
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const downloadOutput = () => {
    if (!output) return
    const blob = new Blob([output], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = mode === 'encode' ? 'encoded.txt' : 'decoded.txt'
    a.click()
  }

  const clearAll = () => {
    setTextInput('')
    setFileInput(null)
    setOutput('')
    setError('')
  }

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <div className={styles.container}>
          <div className={styles.logo}>🔐 Base64 Converter</div>
        </div>
      </header>

      <section className={styles.hero}>
        <h1>
          {mode === 'encode' ? 'Encode' : 'Decode'}
          <span className={styles.gradient}> Base64</span>
        </h1>
        <p className={styles.subtitle}>
          Free online tool to encode and decode Base64 strings and files.
          100% client-side, no data sent to servers.
        </p>
      </section>

      <section className={styles.tool}>
        <div className={styles.toolContainer}>
          <div className={styles.modeSwitch}>
            <button
              className={mode === 'encode' ? styles.active : ''}
              onClick={() => { setMode('encode'); clearAll(); }}
            >
              🔒 Encode
            </button>
            <button
              className={mode === 'decode' ? styles.active : ''}
              onClick={() => { setMode('decode'); clearAll(); }}
            >
              🔓 Decode
            </button>
          </div>

          {mode === 'encode' && (
            <div className={styles.inputType}>
              <button
                className={inputType === 'text' ? styles.active : ''}
                onClick={() => setInputType('text')}
              >
                📝 Text
              </button>
              <button
                className={inputType === 'file' ? styles.active : ''}
                onClick={() => setInputType('file')}
              >
                📁 File
              </button>
            </div>
          )}

          <div className={styles.inputArea}>
            {inputType === 'text' ? (
              <textarea
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                placeholder={mode === 'encode' ? 'Enter text to encode...' : 'Enter Base64 to decode...'}
                className={styles.textarea}
              />
            ) : (
              <div className={styles.fileInput}>
                <input
                  type="file"
                  onChange={(e) => setFileInput(e.target.files?.[0] || null)}
                  id="file-upload"
                />
                <label htmlFor="file-upload">
                  {fileInput ? fileInput.name : '📎 Click to upload file'}
                </label>
              </div>
            )}
          </div>

          <div className={styles.actions}>
            <button onClick={handleProcess} className={styles.primaryBtn}>
              {mode === 'encode' ? '🔒 Encode' : '🔓 Decode'}
            </button>
            <button onClick={clearAll} className={styles.secondaryBtn}>
              Clear
            </button>
          </div>

          {error && (
            <div className={styles.error}>{error}</div>
          )}

          {output && (
            <div className={styles.outputSection}>
              <div className={styles.outputHeader}>
                <label>Result</label>
                <div>
                  <button onClick={copyToClipboard} className={styles.copyBtn}>
                    {copied ? '✓ Copied!' : '📋 Copy'}
                  </button>
                  {inputType === 'text' && (
                    <button onClick={downloadOutput} className={styles.downloadBtn}>
                      💾 Download
                    </button>
                  )}
                </div>
              </div>
              <textarea
                value={output}
                readOnly
                className={styles.outputTextarea}
              />
              <div className={styles.stats}>
                Input: {textInput.length} chars → Output: {output.length} chars
                ({((output.length / textInput.length) * 100).toFixed(0)}% of original)
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}