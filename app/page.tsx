'use client'

import { useState } from 'react'

export default function Home() {
  const [status, setStatus] = useState('')
  const [videoUrl, setVideoUrl] = useState('')
  const [loading, setLoading] = useState(false)

  const generateVideo = async () => {
    setLoading(true)
    setStatus('Genererar tacksamhetsvideo...')
    setVideoUrl('')

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
      })

      const data = await response.json()

      if (data.success) {
        setStatus('Video genererad!')
        setVideoUrl(data.videoUrl)
      } else {
        setStatus('Fel: ' + data.error)
      }
    } catch (error) {
      setStatus('Fel vid generering: ' + error)
    } finally {
      setLoading(false)
    }
  }

  const scheduleDaily = async () => {
    setStatus('Daglig schemaläggning aktiverad!')
    // I produktion skulle detta anropa en cron job eller serverless funktion
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '20px',
        padding: '40px',
        maxWidth: '600px',
        width: '100%',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
      }}>
        <h1 style={{
          fontSize: '32px',
          marginBottom: '10px',
          color: '#333',
          textAlign: 'center'
        }}>
          🙏 Tacksamhetsvideogenerator
        </h1>

        <p style={{
          textAlign: 'center',
          color: '#666',
          marginBottom: '30px'
        }}>
          Automatisk skapare av dagliga tacksamhetsvideos för YouTube
        </p>

        <div style={{
          background: '#f8f9fa',
          padding: '20px',
          borderRadius: '10px',
          marginBottom: '20px'
        }}>
          <h3 style={{ marginTop: 0, color: '#555' }}>Videospecifikationer:</h3>
          <ul style={{ color: '#666', lineHeight: '1.8' }}>
            <li>⏱️ Längd: 6 sekunder</li>
            <li>🖼️ Format: 16:9 eller 9:16 (Shorts)</li>
            <li>🌅 Innehåll: Soluppgång, natur, positiva bilder</li>
            <li>🎵 Ljud: Mjuk bakgrundsmusik eller naturljud</li>
            <li>✨ Text: "TACKSAMHET" i mitten</li>
            <li>🎨 Färger: Gyllene, blå, gröna toner</li>
          </ul>
        </div>

        <button
          onClick={generateVideo}
          disabled={loading}
          style={{
            width: '100%',
            padding: '15px',
            fontSize: '18px',
            fontWeight: 'bold',
            color: 'white',
            background: loading ? '#ccc' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            border: 'none',
            borderRadius: '10px',
            cursor: loading ? 'not-allowed' : 'pointer',
            marginBottom: '15px',
            transition: 'transform 0.2s'
          }}
          onMouseOver={(e) => {
            if (!loading) e.currentTarget.style.transform = 'scale(1.02)'
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'scale(1)'
          }}
        >
          {loading ? '⏳ Genererar...' : '🎬 Generera Video Nu'}
        </button>

        <button
          onClick={scheduleDaily}
          disabled={loading}
          style={{
            width: '100%',
            padding: '15px',
            fontSize: '16px',
            color: '#667eea',
            background: 'white',
            border: '2px solid #667eea',
            borderRadius: '10px',
            cursor: loading ? 'not-allowed' : 'pointer',
            marginBottom: '20px'
          }}
        >
          📅 Aktivera Daglig Automatisk Generering
        </button>

        {status && (
          <div style={{
            padding: '15px',
            background: '#e8f4f8',
            borderRadius: '10px',
            marginBottom: '15px',
            color: '#333'
          }}>
            {status}
          </div>
        )}

        {videoUrl && (
          <div style={{
            marginTop: '20px',
            textAlign: 'center'
          }}>
            <video
              src={videoUrl}
              controls
              style={{
                width: '100%',
                borderRadius: '10px',
                marginBottom: '15px'
              }}
            />
            <a
              href={videoUrl}
              download
              style={{
                display: 'inline-block',
                padding: '10px 20px',
                background: '#28a745',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '5px',
                marginRight: '10px'
              }}
            >
              💾 Ladda ner video
            </a>
          </div>
        )}

        <div style={{
          marginTop: '30px',
          padding: '15px',
          background: '#fff9e6',
          borderRadius: '10px',
          fontSize: '14px',
          color: '#856404'
        }}>
          <strong>💡 Hur det fungerar:</strong>
          <p style={{ margin: '10px 0 0 0' }}>
            Systemet genererar automatiskt en ny tacksamhetsvideo varje dag med AI-genererade
            bilder, lugn musik och positiva budskap. Varje video är unik och följer
            riktlinjerna för harmoni och tacksamhet.
          </p>
        </div>
      </div>
    </div>
  )
}
