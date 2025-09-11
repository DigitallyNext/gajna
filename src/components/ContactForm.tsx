"use client";
import { useState, useEffect } from "react";
import { z } from "zod";
import { contactFormSchema, type ContactFormInput } from "@/lib/validation";

type ContactFormProps = {
  initial?: Partial<ContactFormInput>;
  submitLabel?: string;
  onSuccess?: () => void;
  isModal?: boolean;
};

export default function ContactForm({ initial, submitLabel = "Send Message", onSuccess, isModal = false }: ContactFormProps) {
  const [values, setValues] = useState<ContactFormInput>({
    name: "",
    email: "",
    subject: "",
    message: "",
    phone: "",
    country: "",
    postalCode: "",
    linkedin: "",
    product: "",
    grade: "",
    quantity: undefined,
    consent: false,
    ...(initial as any),
  } as ContactFormInput);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [serverError, setServerError] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<"success" | "error">("success");

  // Auto-hide toast after 5 seconds
  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setValues((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validate = (data: ContactFormInput) => {
    const result = contactFormSchema.safeParse(data);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      const fl = result.error.flatten();
      Object.entries(fl.fieldErrors).forEach(([k, v]) => {
        if (v && v.length) fieldErrors[k] = v[0] as string;
      });
      setErrors(fieldErrors);
      return false;
    }
    setErrors({});
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setServerError(null);

    const payload: ContactFormInput = { ...values };
    if (!validate(payload)) {
      setStatus("error");
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || "Submission failed");
      }
      setStatus("success");
      setValues({ name: "", email: "", subject: "", message: "", phone: "", country: "", postalCode: "", linkedin: "", product: "", grade: "", quantity: undefined, consent: false } as ContactFormInput);
      
      // Show success toast
      setToastType("success");
      setToastMessage("✅ Message sent successfully! We'll get back to you soon.");
      setShowToast(true);
      
      onSuccess?.();
    } catch (err: any) {
      setServerError(err.message || "Something went wrong");
      setStatus("error");
      
      // Show error toast
      setToastType("error");
      setToastMessage(`❌ Failed to send message: ${err.message || "Please try again later."}`);
      setShowToast(true);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Product Enquiry Context (when provided) */}
      {(values.product || values.grade) && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
          <h3 className="text-sm font-medium text-amber-800 mb-2">Product Enquiry</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
            {values.product && (
              <div>
                <span className="text-amber-700 font-medium">Product:</span>
                <p className="text-amber-900">{values.product}</p>
              </div>
            )}
            {values.grade && (
              <div>
                <span className="text-amber-700 font-medium">Grade:</span>
                <p className="text-amber-900">{values.grade}</p>
              </div>
            )}
            <div>
              <label className="block text-amber-700 font-medium mb-1">Quantity (MT)</label>
              <input
                type="number"
                name="quantity"
                value={values.quantity || ""}
                onChange={handleChange}
                className="w-full px-3 py-1 border border-amber-300 rounded focus:border-amber-500 focus:ring-amber-500"
                placeholder="0"
                min="0"
                step="1"
              />
              {errors.quantity && <p className="text-sm text-red-600 mt-1">{errors.quantity}</p>}
            </div>
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={values.name}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-600 focus:ring-amber-600"
            placeholder="Your name"
            required
          />
          {errors.name && <p className="text-sm text-red-600 mt-1">{errors.name}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-600 focus:ring-amber-600"
            placeholder="you@example.com"
            required
          />
          {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Phone</label>
          <input
            type="tel"
            name="phone"
            value={values.phone || ""}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-600 focus:ring-amber-600"
            placeholder="+91 98117 89665"
          />
          {errors.phone && <p className="text-sm text-red-600 mt-1">{errors.phone}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Country</label>
          <input
            type="text"
            name="country"
            value={values.country || ""}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-600 focus:ring-amber-600"
            placeholder="India"
          />
          {errors.country && <p className="text-sm text-red-600 mt-1">{errors.country}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Postal Code / ZIP Code</label>
          <input
            type="text"
            name="postalCode"
            value={values.postalCode || ""}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-600 focus:ring-amber-600"
            placeholder="110001"
          />
          {errors.postalCode && <p className="text-sm text-red-600 mt-1">{errors.postalCode}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">LinkedIn</label>
        <input
          type="url"
          name="linkedin"
          value={values.linkedin || ""}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-600 focus:ring-amber-600"
          placeholder="https://www.linkedin.com/in/username"
        />
        {errors.linkedin && <p className="text-sm text-red-600 mt-1">{errors.linkedin}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Subject</label>
        <input
          type="text"
          name="subject"
          value={values.subject}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-600 focus:ring-amber-600"
          placeholder="How can we help?"
          required
        />
        {errors.subject && <p className="text-sm text-red-600 mt-1">{errors.subject}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Message</label>
        <textarea
          name="message"
          value={values.message}
          onChange={handleChange}
          rows={5}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-600 focus:ring-amber-600"
          placeholder="Write your message..."
          required
        />
        {errors.message && <p className="text-sm text-red-600 mt-1">{errors.message}</p>}
      </div>

      <div className="flex items-start gap-2">
        <input
          id="consent"
          type="checkbox"
          name="consent"
          checked={values.consent}
          onChange={handleChange}
          className="mt-1 h-4 w-4 rounded border-gray-300 text-amber-700 focus:ring-amber-600"
          required
        />
        <label htmlFor="consent" className="text-sm text-gray-700">
          I agree to the processing of my personal data according to the Privacy Policy.
        </label>
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full rounded-full bg-[#61714D] px-6 py-3 text-white font-medium hover:bg-[#4D5A3E] transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {status === "submitting" && (
          <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        )}
        {status === "submitting" ? "Sending..." : submitLabel}
      </button>

      {/* Toast Notification */}
      {showToast && (
        <div className={`fixed top-4 right-4 z-50 max-w-sm w-full transform transition-all duration-300 ease-in-out ${
          showToast ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
        }`}>
          <div className={`rounded-lg shadow-lg p-4 border-l-4 ${
            toastType === 'success' 
              ? 'bg-green-50 border-green-400 text-green-800' 
              : 'bg-red-50 border-red-400 text-red-800'
          }`}>
            <div className="flex items-start">
              <div className="flex-1">
                <p className="text-sm font-medium">{toastMessage}</p>
              </div>
              <button
                onClick={() => setShowToast(false)}
                className={`ml-3 inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  toastType === 'success'
                    ? 'text-green-500 hover:bg-green-100 focus:ring-green-600'
                    : 'text-red-500 hover:bg-red-100 focus:ring-red-600'
                }`}
              >
                <span className="sr-only">Dismiss</span>
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Legacy status messages (keeping as fallback) */}
      {status === "success" && !showToast && (
        <p className="text-green-700 text-sm">Thank you! Your message has been sent.</p>
      )}
      {status === "error" && serverError && !showToast && (
        <p className="text-red-700 text-sm">{serverError}</p>
      )}
    </form>
  );
}