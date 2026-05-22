import React, { useState } from 'react';
import styles from './AddSongPopup.module.css';

function AddSongPopup({ onClose }) {
  const [songTitle, setSongTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!songTitle.trim()) return;

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('https://formsubmit.co/ajax/chikoticreations@gmail.com', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          _subject: `New Song Request: ${songTitle}`,
          _captcha: 'false',
          songTitle: songTitle,
          artistOrMovie: artist || 'Not provided',
          additionalMessage: message || 'Not provided'
        })
      });

      if (!response.ok) {
        const errText = await response.text();
        console.error('Server responded with:', errText);
        throw new Error('API returned failure');
      }

      setSubmitStatus('success');
      setTimeout(() => {
        onClose();
      }, 3500);
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <div className={styles.header}>
          <h2 className={styles.title}>➕ Request a Song</h2>
          <button className={styles.closeBtn} onClick={onClose} type="button" disabled={isSubmitting}>✕</button>
        </div>
        
        {submitStatus === 'success' ? (
          <div className={styles.form}>
            <div style={{ textAlign: 'center', padding: '40px 0', color: '#10b981', fontSize: '1.2rem' }}>
              <h2>✅ Request Sent!</h2>
              <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginTop: '10px' }}>
                Note: The admin must verify their email address on the first request.
              </p>
            </div>
          </div>
        ) : (
          <form className={styles.form} onSubmit={handleSubmit}>
            <p className={styles.description}>
              Can't find your favorite track? Let us know what to add next! This request will be sent directly and silently to the admin.
            </p>

            {submitStatus === 'error' && (
              <div style={{ color: '#ef4444', marginBottom: '10px', fontSize: '0.9rem' }}>
                Failed to send request. Please try again later.
              </div>
            )}

            <div className={styles.inputGroup}>
              <label htmlFor="songTitle">Song Title *</label>
              <input 
                id="songTitle"
                type="text" 
                value={songTitle} 
                onChange={e => setSongTitle(e.target.value)} 
                placeholder="e.g. Samajavaragamana"
                required
                disabled={isSubmitting}
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="artist">Artist or Movie</label>
              <input 
                id="artist"
                type="text" 
                value={artist} 
                onChange={e => setArtist(e.target.value)} 
                placeholder="e.g. Sid Sriram / Ala Vaikunthapurramuloo"
                disabled={isSubmitting}
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="message">Anything else? (Optional)</label>
              <textarea 
                id="message"
                value={message} 
                onChange={e => setMessage(e.target.value)} 
                placeholder="e.g. I specifically want the unplugged version!"
                rows={3}
                disabled={isSubmitting}
              />
            </div>

            <div className={styles.actions}>
              <button type="button" className={styles.cancelBtn} onClick={onClose} disabled={isSubmitting}>Cancel</button>
              <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Send Request ✉️'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default AddSongPopup;
