
import React, { useState } from 'react';
import styles from './index.module.css';
import { Modal } from '@arco-design/web-react';

export const FeedbackPanel: React.FC = () => {
  const [value, setValue] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!value.trim()) {
      setError('Please enter your feedback.');
      return;
    }
    setSubmitting(true);
    // 模拟异步提交
    await new Promise(res => setTimeout(res, 800));
    setSubmitting(false);
    setSubmitted(true);
    setValue('');
  };

  return (
    <div className={styles['feedback-panel']}>
      <h2>Feedback</h2>
      {submitted ? (
        <div className={styles['feedback-success']}>Thank you for your feedback!</div>
      ) : (
        <form onSubmit={handleSubmit}>
          <textarea
            className={styles['feedback-input']}
            value={value}
            onChange={e => setValue(e.target.value)}
            placeholder="Please enter your feedback..."
            rows={5}
            disabled={submitting}
          />
          {error && <div className={styles['feedback-error']}>{error}</div>}
          <button className={styles['feedback-submit']} type="submit" disabled={submitting}>
            {submitting ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      )}
    </div>
  );
};

export const handleOpenFeedback = Modal.info({
  title: 'Feedback',
  content: <FeedbackPanel />,
  maskClosable: true,
  okText: 'Close',  
})