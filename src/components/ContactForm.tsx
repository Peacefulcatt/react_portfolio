import { useState, type FormEvent } from 'react';

type Props = {
  email: string;
};

type FormState = {
  name: string;
  email: string;
  message: string;
};

type Errors = Partial<FormState>;

const initial: FormState = { name: '', email: '', message: '' };

export default function ContactForm({ email }: Props) {
  const [form, setForm] = useState<FormState>(initial);
  const [errors, setErrors] = useState<Errors>({});

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

    const subject = encodeURIComponent(`Portfolio message from ${form.name.trim()}`);
    const body = encodeURIComponent(
      `${form.message.trim()}\n\n${form.name.trim()}\n${form.email.trim()}`,
    );
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  };

  return (
    <form className="contact-form" onSubmit={onSubmit} noValidate>
      <div className={`field ${errors.name ? 'error' : ''}`}>
        <label htmlFor="name">Name</label>
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
        <label htmlFor="email">Email</label>
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
        <label htmlFor="message">Message</label>
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

      <button className="btn btn-primary" type="submit">
        Email me
      </button>
      <p className="hint">Opens your email app with this message addressed to me. Nothing is stored on the site.</p>

      <style>{`
        .contact-form {
          display: grid;
          gap: 1.25rem;
        }

        .field {
          display: grid;
          gap: 0.35rem;
        }

        .field label {
          font-size: 0.85rem;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          color: var(--accent);
          font-weight: 600;
        }

        .field input,
        .field textarea {
          width: 100%;
          border: 0;
          border-bottom: 1px solid var(--line);
          border-radius: 0;
          background: transparent;
          padding: 0.7rem 0;
          color: var(--ink);
        }

        .field input:focus,
        .field textarea:focus {
          outline: none;
          border-bottom-color: var(--accent);
        }

        .field.error input,
        .field.error textarea {
          border-bottom-color: #b42318;
        }

        .field span,
        .hint {
          font-size: 0.9rem;
        }

        .field span {
          color: #b42318;
        }

        .hint {
          margin: 0;
          color: var(--muted);
        }
      `}</style>
    </form>
  );
}
