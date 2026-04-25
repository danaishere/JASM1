function Contact() {
  return (
    <div className="page">
      <h1>Contact Us</h1>
      <p>Have a question or custom order request? Reach out!</p>
      <form className="contact-form">
        <input type="text" placeholder="Your Name" />
        <input type="email" placeholder="Your Email" />
        <textarea placeholder="Your message..." rows="5" />
        <button type="submit">Send Message</button>
      </form>
    </div>
  )
}

export default Contact
