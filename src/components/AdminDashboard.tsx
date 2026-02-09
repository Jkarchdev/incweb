import { useState, useEffect } from 'react'
import { supabase } from '../supabaseClient'
import type { AppState } from '../App'
import './AdminDashboard.css'

interface Submission {
  id: number
  created_at: string
  team_name: string
  domain_name: string | null
  design_data: AppState
}

const AdminDashboard = () => {
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null)

  useEffect(() => {
    fetchSubmissions()
  }, [])

  const fetchSubmissions = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('submissions')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setSubmissions(data || [])
    } catch (error) {
      console.error('Error fetching submissions:', error)
      alert('Failed to load submissions')
    } finally {
      setLoading(false)
    }
  }

  const downloadDesignData = (submission: Submission) => {
    const dataStr = JSON.stringify(submission.design_data, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${submission.team_name.replace(/\s+/g, '_')}_design.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    })
  }

  if (loading) {
    return (
      <div className="admin-dashboard">
        <div className="admin-loading">Loading submissions...</div>
      </div>
    )
  }

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <div className="admin-header-left">
          <a href="/" className="back-link">← Back to Customizer</a>
          <h1>Team Submissions</h1>
        </div>
        <button className="refresh-button" onClick={fetchSubmissions}>
          ↻ Refresh
        </button>
      </div>

      {submissions.length === 0 ? (
        <div className="admin-empty">
          <p>No submissions yet.</p>
        </div>
      ) : (
        <div className="admin-grid">
          {submissions.map((submission) => (
            <div
              key={submission.id}
              className="submission-card"
              onClick={() => setSelectedSubmission(submission)}
            >
              <div className="submission-header">
                <h3>{submission.team_name}</h3>
                <span className="submission-id">#{submission.id}</span>
              </div>
              {submission.domain_name && (
                <div className="submission-domain">
                  🌐 {submission.domain_name}
                </div>
              )}
              <div className="submission-date">
                {formatDate(submission.created_at)}
              </div>
              <div className="submission-preview">
                <div className="preview-info">
                  <span>Background: {submission.design_data.background.presetId}</span>
                  <span>Palette: {submission.design_data.palette || 'custom'}</span>
                </div>
              </div>
              <button
                className="download-button"
                onClick={(e) => {
                  e.stopPropagation()
                  downloadDesignData(submission)
                }}
              >
                ↓ Download JSON
              </button>
            </div>
          ))}
        </div>
      )}

      {selectedSubmission && (
        <div className="modal-overlay" onClick={() => setSelectedSubmission(null)}>
          <div className="modal-content submission-modal" onClick={(e) => e.stopPropagation()}>
            <h2>{selectedSubmission.team_name}</h2>
            <p className="submission-modal-date">
              Submitted: {formatDate(selectedSubmission.created_at)}
            </p>
            <div className="submission-details">
              <h3>Design Details:</h3>
              <ul>
                {selectedSubmission.domain_name && (
                  <li><strong>Domain:</strong> {selectedSubmission.domain_name}</li>
                )}
                <li><strong>Background:</strong> {selectedSubmission.design_data.background.presetId}</li>
                <li><strong>Color Palette:</strong> {selectedSubmission.design_data.palette || 'custom'}</li>
                <li><strong>Main Text:</strong> {selectedSubmission.design_data.mainText}</li>
                <li><strong>Team Members:</strong> {selectedSubmission.design_data.teammates.length}</li>
                <li><strong>Sections Enabled:</strong> {Object.entries(selectedSubmission.design_data.sections).filter(([_, v]) => v).map(([k]) => k).join(', ')}</li>
              </ul>
            </div>
            <div className="modal-actions">
              <button
                className="modal-button modal-button-cancel"
                onClick={() => setSelectedSubmission(null)}
              >
                Close
              </button>
              <button
                className="modal-button modal-button-submit"
                onClick={() => downloadDesignData(selectedSubmission)}
              >
                Download JSON
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminDashboard
