'use client'

import { useState, useCallback } from 'react'

export default function Home() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [mode, setMode] = useState<'encode' | 'decode'>('encode')
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)
  const [stats, setStats] = useState({ inputChars: 0, outputChars: 0 })

  const handleConvert = useCallback(() => {
    if (!input.trim()) {
      setError('Please enter some text')
      setOutput('')
      return
    }

    setError('')
    try {
      if (mode === 'encode') {
        const encoded = btoa(input)
        setOutput(encoded)
        setStats({ inputChars: input.length, outputChars: encoded.length })
      } else {
        const decoded = atob(input)
        setOutput(decoded)
        setStats({ inputChars: input.length, outputChars: decoded.length })
      }
    } catch (e) {
      setError(mode === 'encode' ? 'Failed to encode' : 'Invalid Base64 input')
      setOutput('')
    }
  }, [input, mode])

  const copyToClipboard = useCallback(() => {
    if (!output) return
    navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [output])

  const clearAll = useCallback(() => {
    setInput('')
    setOutput('')
    setError('')
    setStats({ inputChars: 0, outputChars: 0 })
  }, [])

  const loadSample = useCallback(() => {
    if (mode === 'encode') {
      setInput('Hello, World! This is a sample text.')
    } else {
      setInput('SGVsbG8sIFdvcmxkISBUaGlzIGlzIGEgc2FtcGxlIHRleHQu')
    }
  }, [mode])

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center text-2xl shadow-lg">🔐</div>
              <div>
                <span className="text-xl font-bold text-slate-900">Base64 Converter</span>
                <p className="text-sm text-slate-500">Encode & Decode</p>
              </div>
            </div>
            <nav className="hidden md:flex gap-6">
              <a href="#tool" className="text-sm font-medium text-slate-600 hover:text-emerald-600 transition-colors">Tool</a>
              <a href="#features" className="text-sm font-medium text-slate-600 hover:text-emerald-600 transition-colors">Features</a>
              <a href="#faq" className="text-sm font-medium text-slate-600 hover:text-emerald-600 transition-colors">FAQ</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero - Updated with text-gradient and spacing */}
      <section className="hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 text-3xl shadow-xl mb-6">🔐</div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              <span className="text-gradient">Base64 Converter</span>
            </h2>
            <p className="text-lg md:text-xl text-slate-600 leading-relaxed">Convert text to Base64 and decode Base64 to text instantly. Free, secure, and works entirely in your browser.</p>
          </div>
        </div>
      </section>

      {/* Tool */}
      <main id="tool" className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-6 md:p-8">
          {/* Mode Toggle */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex bg-slate-100 rounded-xl p-1.5">
              <button
                onClick={() => { setMode('encode'); setOutput(''); setError(''); }}
                className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  mode === 'encode' 
                    ? 'bg-white text-emerald-600 shadow-md' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Encode to Base64
              </button>
              <button
                onClick={() => { setMode('decode'); setOutput(''); setError(''); }}
                className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  mode === 'decode' 
                    ? 'bg-white text-emerald-600 shadow-md' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Decode from Base64
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-3 mb-6">
            <button 
              onClick={handleConvert}
              className="btn-primary"
              disabled={!input.trim()}
            >
              {mode === 'encode' ? '🔒 Encode' : '🔓 Decode'}
            </button>
            <button 
              onClick={loadSample}
              className="btn-secondary"
            >
              📝 Load Sample
            </button>
            <button 
              onClick={clearAll}
              className="btn-ghost"
              disabled={!input && !output}
            >
              🗑️ Clear
            </button>
          </div>

          {/* Editor Grid */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Input */}
            <div className="bg-slate-50 rounded-xl border border-slate-200 overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 bg-slate-100 border-b border-slate-200">
                <span className="text-sm font-semibold text-slate-700">
                  {mode === 'encode' ? 'Text Input' : 'Base64 Input'}
                </span>
                <span className="text-xs text-slate-500">{input.length} chars</span>
              </div>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={mode === 'encode' ? 'Enter text to encode...' : 'Enter Base64 to decode...'}
                className="w-full h-64 px-4 py-3 bg-white border-0 resize-y focus:outline-none focus:ring-0 text-sm"
              />
            </div>

            {/* Output */}
            <div className="bg-slate-50 rounded-xl border border-slate-200 overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 bg-slate-100 border-b border-slate-200">
                <span className="text-sm font-semibold text-slate-700">
                  {mode === 'encode' ? 'Base64 Output' : 'Text Output'}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-500">{output.length} chars</span>
                  {output && (
                    <button 
                      onClick={copyToClipboard}
                      className="text-xs font-medium text-emerald-600 hover:text-emerald-700"
                    >
                      {copied ? '✓ Copied!' : '📋 Copy'}
                    </button>
                  )}
                </div>
              </div>
              <textarea
                value={output}
                readOnly
                placeholder={`${mode === 'encode' ? 'Base64' : 'Text'} will appear here...`}
                className="w-full h-64 px-4 py-3 bg-slate-50 border-0 resize-y focus:outline-none text-sm font-mono"
              />
            </div>
          </div>

          {error && (
            <div className="mt-4 flex items-center gap-2 px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              ⚠️ {error}
            </div>
          )}

          {/* Stats */}
          {output && (
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 text-center">
                <div className="text-2xl font-bold text-emerald-600">{stats.inputChars}</div>
                <div className="text-xs font-medium text-slate-500 uppercase tracking-wider mt-1">Input Characters</div>
              </div>
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 text-center">
                <div className="text-2xl font-bold text-emerald-600">{stats.outputChars}</div>
                <div className="text-xs font-medium text-slate-500 uppercase tracking-wider mt-1">Output Characters</div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Features - Updated with hover effects */}
      <section id="features" className="bg-white border-t border-slate-200 py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Why Use Our Base64 Converter?</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">Professional Base64 tools for developers and data processing.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: '🔒', title: 'Secure Encoding', description: 'All processing happens in your browser. Your data never leaves your device.' },
              { icon: '⚡', title: 'Instant Results', description: 'No server processing. Get your Base64 encoded or decoded text immediately.' },
              { icon: '📋', title: 'One-Click Copy', description: 'Copy results instantly with a single click.' },
              { icon: '🔄', title: 'Bidirectional', description: 'Easily switch between encoding and decoding modes.' },
              { icon: '📊', title: 'Character Stats', description: 'See input and output character counts at a glance.' },
              { icon: '💯', title: '100% Free', description: 'No registration, no limits, no watermarks. Completely free.' },
            ].map((f, i) => (
              <div key={i} className="feature-card p-6 group cursor-pointer">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-100 to-emerald-200 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform duration-300">{f.icon}</div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">{f.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="bg-slate-50 border-t border-slate-200 py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-4">
            {[
              { q: 'What is Base64?', a: 'Base64 is an encoding scheme that represents binary data in an ASCII string format. It is commonly used to encode data for transmission over media that are designed to deal with textual data.' },
              { q: 'Is this tool free?', a: 'Yes, completely free. No registration, no limits, no watermarks.' },
              { q: 'Is my data secure?', a: 'Absolutely. All processing happens client-side in your browser. Your data is never sent to any server.' },
              { q: 'Can I decode any Base64 string?', a: 'You can decode any valid Base64 string. If the input is not valid Base64, you will see an error message.' },
            ].map((item, i) => (
              <div key={i} className="card p-6 cursor-pointer">
                <h3 className="text-lg font-semibold text-slate-900 mb-2">{item.q}</h3>
                <p className="text-slate-600 leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer - Updated to bg-slate-800 */}
      <footer className="bg-slate-800 text-slate-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center text-lg">🔐</div>
              <span className="text-white font-semibold">Base64 Converter</span>
            </div>
            <p className="text-sm">© 2024 SmartOK Tools. Free online tools for everyone.</p>
            <div className="flex gap-6">
              <a href="/privacy" className="text-sm hover:text-white transition-colors">Privacy</a>
              <a href="/terms" className="text-sm hover:text-white transition-colors">Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
