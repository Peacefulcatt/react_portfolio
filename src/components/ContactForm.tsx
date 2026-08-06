import { useState, type FormEvent } from 'react';

type FormState = {
  name: string;
  email: string;
  message: string;
};

type Errors = Partial<FormState>;

const initial: FormState = { name: '', email: '', message: '' };

export default function ContactForm() {
  const [form, setForm] = useState<FormState>(initial);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const next: Errors = {};
    if (!form.name.trim()) next.name = 'Name is required';
    if (!form.email.trim()) {
      next.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = 'Please enter a valid email';
    }
    if (!form.message.trim()) next.message = 'Message is required';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    window.setTimeout(() => {
      setSubmitting(false);
      setSuccess(true);
      setForm(initial);
      window.setTimeout(() => setSuccess(false), 3000);
    }, 900);
  };

  return (
    <form className="contact-form" onSubmit={onSubmit} noValidate>
      <div className={`field ${errors.name ? 'error' : ''}`}>
        <label htmlFor="name">Your name</label>
        <input
          id="name"
          name="name"
          value={form.name}
          onChange={(event) => {
            setForm((prev) => ({ ...prev, name: event.target.value }));
            if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
          }}
        />
        {errors.name && <span>{errors.name}</span>}
      </div>

      <div className={`field ${errors.email ? 'error' : ''}`}>
        <label htmlFor="email">Email address</label>
        <input
          id="email"
          name="email"
          type="email"
          value={form.email}
          onChange={(event) => {
            setForm((prev) => ({ ...prev, email: event.target.value }));
            if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
          }}
        />
        {errors.email && <span>{errors.email}</span>}
      </div>

      <div className={`field ${errors.message ? 'error' : ''}`}>
        <label htmlFor="message">Your message</label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={form.message}
          onChange={(event) => {
            setForm((prev) => ({ ...prev, message: event.target.value }));
            if (errors.message) setErrors((prev) => ({ ...prev, message: undefined }));
          }}
        />
        {errors.message && <span>{errors.message}</span>}
      </div>

      <button className="btn btn-primary" type="submit" disabled={submitting}>
        {submitting ? 'Sending...' : 'Send message'}
      </button>

      {success && (
        <p className="success" role="status">
          Message sent successfully. I&apos;ll get back to you soon.
        </p>
      )}

      <style>{`
        .contact-form {
          display: grid;
          gap: 1rem;
        }

        .field {
          display: grid;
          gap: 0.4rem;
        }

        .field label {
          font-weight: 600;
        }

        .field input,
        .field textarea {
          width: 100%;
          border: 1px solid var(--line);
          border-radius: 0.4rem;
          background: rgba(255, 255, 255, 0.8);
          padding: 0.8rem 0.9rem;
          color: var(--ink);
        }

        .field.error input,
        .field.error textarea {
          border-color: #b42318;
        }

        .field span,
        .success {
          font-size: 0.9rem;
        }

        .field span {
          color: #b42318;
        }

        .success {
          margin: 0;
          color: var(--teal-deep);
          font-weight: 600;
        }

        .btn:disabled {
          opacity: 0.7;
          cursor: wait;
        }
      `}</style>
    </form>
  );
}
