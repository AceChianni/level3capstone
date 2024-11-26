"use client";
import ContactForm from "@/components/ContactForm";
import "/styles/globals.css";
import "/styles/contactstyles.css";

export default function ContactPage() {
  return (
    <main className="contact-page">
      <div className="container">
        <h1>Contact Us</h1>
        <ContactForm />
      </div>
    </main>
  );
}
