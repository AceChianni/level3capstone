import { useState } from "react";

export default function ContactForm() {
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission
    setIsPopupVisible(true); // Show the popup
    setTimeout(() => {
      setIsPopupVisible(false); // Hide the popup after 3 seconds
      event.target.reset(); // Reset form fields
    }, 3000);
  };

  return (
    <div>
      <form id="contactForm" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone:</label>
          <input type="tel" id="phone" name="phone" required />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message:</label>
          <textarea id="message" name="message" rows="4" required></textarea>
        </div>
        <button type="submit" className="submit-button">
          Submit ❤
        </button>
      </form>

      {isPopupVisible && (
        <div id="popup" className="popup">
          <p>Thanks, someone will contact you soon.</p>
        </div>
      )}
    </div>
  );
}
