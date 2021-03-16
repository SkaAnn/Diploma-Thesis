import React, { useState } from 'react';
import PropTypes from 'prop-types';

// https://sheelahb.com/blog/how-to-send-email-from-react-without-a-backend/

const FeedbackForm = ({ env }) => {
  const [feedback, setFeedback] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formSubmitSuccessful, setFormSubmitSuccessful] = useState(false);

  const [receiverEmail, setReceiverEmail] = useState('')
  const [senderEmail, setSenderEmail] = useState('')

  // const senderEmail = 'sender@example.com';

  const handleCancel = () => {
    setFeedback('');
  };

  const handleChange = (event) => {
    setFeedback(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(process.env.REACT_APP_EMAILJS_RECEIVER)

    // ENV VARIABLES NEFUNGUJU!
    // const receiverEmail = process.env.REACT_APP_EMAILJS_RECEIVER
    // const templateId = process.env.REACT_APP_EMAILJS_TEMPLATEID
    // const user = process.env.REACT_APP_EMAILJS_USERID

    const {
      REACT_APP_EMAILJS_RECEIVER: receiverEmail,
      REACT_APP_EMAILJS_TEMPLATEID: templateId,
      REACT_APP_EMAILJS_USERID: user,
    } = env;

    console.log(receiverEmail, templateId, user)

    sendFeedback({
      templateId,
      senderEmail,
      receiverEmail,
      feedback,
      user,
    });

    setFormSubmitted(true);
  };

  // Note: this is using default_service, which will map to whatever
  // default email provider you've set in your EmailJS account.
  const sendFeedback = ({
    templateId,
    senderEmail,
    receiverEmail,
    feedback,
    user,
  }) => {
    window.emailjs
      .send(
        'default_service',
        templateId,
        {
          sender_email: senderEmail,
          receiver_email: receiverEmail,
          message: feedback,
        },
        user
      )
      .then((res) => {
        if (res.status === 200) {
          setFormSubmitSuccessful(true);
        }
      })
      // Handle errors here however you like
      .catch((err) => console.error('Failed to send feedback. Error: ', err));
  };

  if (formSubmitted && formSubmitSuccessful) {
    return <h2>Thank You! Your submission was sent.</h2>;
  }

  return (
    <form className='feedback-form' onSubmit={handleSubmit}>
      <h1>Your Feedback</h1>
      <input name='receiver_email' value={receiverEmail} onChange={(e) => setReceiverEmail(e.target.value)} placeholder='rec@ex.com' />
      <br />
      <input name='sender_email' value={senderEmail} onChange={(e) => setSenderEmail(e.target.value)} placeholder='send@ex.com' />
      <br />
      <textarea
        className='text-input'
        id='feedback-entry'
        name='feedback-entry'
        onChange={handleChange}
        placeholder='Enter your feedback here'
        required
        value={feedback}
      />
      <br />
      <div className='btn-group'>
        <button className='btn btn--cancel' onClick={handleCancel}>
          Cancel
        </button>
        <input type='submit' value='Submit' className='btn btn--submit' />
      </div>
    </form>
  );
};

FeedbackForm.propTypes = {
  env: PropTypes.object.isRequired,
};

export default FeedbackForm;