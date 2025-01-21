import React, { useState } from 'react';

const EyePoppingButton = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleButtonClick = () => {
    setShowForm(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(
        'https://api.andrewslearning.com/api/gangelee_waitinglist',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      const result = await response.json();
      console.log('Form submitted successfully:', result);
      alert('Thanks for signing up! You’ll hear from us soon.');
      setFormData({ name: '', email: '' }); // Reset form
      setShowForm(false); // Close the form
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting the form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeForm = () => {
    setShowForm(false);
  };

  return (
    <div style={styles.container}>
      <p className="rosemary">Rosemary Growth Oil</p>
      <button onClick={handleButtonClick} style={styles.button}>
        Sign Up for Waitlist ✨
      </button>
      <p style={styles.subText}>Curly girls, you deserve the best! 💖</p>

      {showForm && (
        <div style={styles.overlay}>
          <div style={styles.popup}>
            <button style={styles.closeButton} onClick={closeForm}>
              &times;
            </button>
            <h2 style={styles.popupTitle}>Join the Waitlist</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
              <label style={styles.label}>Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                style={styles.input}
                placeholder="Enter your name"
                required
              />
              <label style={styles.label}>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                style={styles.input}
                placeholder="Enter your email"
                required
              />
              <button
                type="submit"
                style={styles.submitButton}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    margin: '20px',
  },
  button: {
    backgroundColor: 'black',
    color: '#fff',
    border: 'none',
    borderRadius: '30px',
    padding: '15px 30px',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    cursor: 'pointer',
    transition: 'transform 0.2s, box-shadow 0.2s',
  },
  subText: {
    marginTop: '10px',
    color: '#333',
    fontSize: '0.9rem',
  },
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  popup: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    width: '90%',
    maxWidth: '400px',
    textAlign: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: '10px',
    right: '15px',
    background: 'none',
    border: 'none',
    fontSize: '1.5rem',
    cursor: 'pointer',
  },
  popupTitle: {
    fontSize: '1.5rem',
    color: '#333',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  label: {
    fontSize: '1rem',
    textAlign: 'left',
    color: '#333',
    marginBottom: '5px',
  },
  input: {
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    fontSize: '1rem',
    width: '100%',
  },
  submitButton: {
    backgroundColor: 'black',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    padding: '10px',
    fontSize: '1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
};

export default EyePoppingButton;
