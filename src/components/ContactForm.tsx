"use client";
import { useState, useEffect, useRef } from "react";
import { z } from "zod";
import toast, { Toaster } from 'react-hot-toast';
import ReCAPTCHA from 'react-google-recaptcha';
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
  const [captchaValue, setCaptchaValue] = useState<string | null>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  // Add validation feedback on field blur
  const handleBlur = (fieldName: string) => {
    const fieldValue = values[fieldName as keyof ContactFormInput];
    if (!fieldValue && ['name', 'email', 'subject', 'message', 'consent'].includes(fieldName)) {
      setErrors(prev => ({ ...prev, [fieldName]: 'This field is required' }));
    } else if (errors[fieldName]) {
      setErrors(prev => ({ ...prev, [fieldName]: '' }));
    }
  };

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
    // For product enquiry forms, make product and grade required
    const isProductEnquiry = initial?.product || initial?.grade;
    
    let result;
    if (isProductEnquiry) {
      // Create a schema with required product and grade fields
      const productEnquirySchema = contactFormSchema.merge(
        z.object({
          product: z.string().min(1, "Product is required"),
          grade: z.string().min(1, "Grade is required")
        })
      );
      result = productEnquirySchema.safeParse(data);
    } else {
      result = contactFormSchema.safeParse(data);
    }
    
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      const fl = result.error.flatten();
      Object.entries(fl.fieldErrors).forEach(([k, v]) => {
        if (v && v.length) fieldErrors[k] = v[0] as string;
      });
      setErrors(fieldErrors);
      
      // Show specific error toast for validation
      const missingFields = Object.keys(fieldErrors).map(field => {
        const fieldNames: Record<string, string> = {
          name: 'Name',
          email: 'Email',
          subject: 'Subject', 
          message: 'Message',
          consent: 'Privacy Policy Agreement',
          phone: 'Phone',
          country: 'Country',
          postalCode: 'Postal Code',
          linkedin: 'LinkedIn',
          product: 'Product',
          grade: 'Grade'
        };
        return fieldNames[field] || field;
      });
      
      const errorMessage = missingFields.length === 1 
        ? `❌ Please fill in: ${missingFields[0]}`
        : `❌ Please fill in: ${missingFields.join(', ')}`;
      
      toast.error(errorMessage, {
        duration: 6000,
        position: 'top-right',
        style: {
          background: '#EF4444',
          color: '#fff',
          fontWeight: '500'
        }
      });
      
      // Scroll to first error field
      const firstErrorField = Object.keys(fieldErrors)[0];
      const errorElement = document.querySelector(`[name="${firstErrorField}"]`) as HTMLElement;
      if (errorElement) {
        errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        errorElement.focus();
      }
      
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
    
    // Check CAPTCHA
    if (!captchaValue) {
      toast.error('❌ Please complete the CAPTCHA verification', {
        duration: 4000,
        position: 'top-right',
        style: {
          background: '#EF4444',
          color: '#fff',
          fontWeight: '500'
        }
      });
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
      setCaptchaValue(null);
      recaptchaRef.current?.reset();
      
      // Show success toast
      toast.success('✅ Message sent successfully! We\'ll get back to you soon.', {
        duration: 5000,
        position: 'top-right',
        style: {
          background: '#10B981',
          color: '#fff',
          fontWeight: '500'
        }
      });
      
      onSuccess?.();
    } catch (err: any) {
      setServerError(err.message || "Something went wrong");
      setStatus("error");
      
      // Show error toast
      toast.error(`❌ Failed to send message: ${err.message || "Please try again later."}`, {
        duration: 6000,
        position: 'top-right',
        style: {
          background: '#EF4444',
          color: '#fff',
          fontWeight: '500'
        }
      });
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
          <label className="block text-sm font-medium text-gray-700">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={values.name}
            onChange={handleChange}
            onBlur={() => handleBlur('name')}
            className={`mt-1 block w-full rounded-md shadow-sm focus:border-amber-600 focus:ring-amber-600 ${
              errors.name ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300'
            }`}
            placeholder="Your full name"
            required
          />
          {errors.name && <p className="text-sm text-red-600 mt-1 flex items-center"><span className="mr-1">⚠️</span>{errors.name}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={() => handleBlur('email')}
            className={`mt-1 block w-full rounded-md shadow-sm focus:border-amber-600 focus:ring-amber-600 ${
              errors.email ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300'
            }`}
            placeholder="your.email@example.com"
            required
          />
          {errors.email && <p className="text-sm text-red-600 mt-1 flex items-center"><span className="mr-1">⚠️</span>{errors.email}</p>}
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
        <label className="block text-sm font-medium text-gray-700">
          Subject <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="subject"
          value={values.subject}
          onChange={handleChange}
          onBlur={() => handleBlur('subject')}
          className={`mt-1 block w-full rounded-md shadow-sm focus:border-amber-600 focus:ring-amber-600 ${
            errors.subject ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300'
          }`}
          placeholder="How can we help?"
          required
        />
        {errors.subject && <p className="text-sm text-red-600 mt-1 flex items-center"><span className="mr-1">⚠️</span>{errors.subject}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Message <span className="text-red-500">*</span>
        </label>
        <textarea
          name="message"
          value={values.message}
          onChange={handleChange}
          onBlur={() => handleBlur('message')}
          rows={5}
          className={`mt-1 block w-full rounded-md shadow-sm focus:border-amber-600 focus:ring-amber-600 ${
            errors.message ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300'
          }`}
          placeholder="Write your message..."
          required
        />
        {errors.message && <p className="text-sm text-red-600 mt-1 flex items-center"><span className="mr-1">⚠️</span>{errors.message}</p>}
      </div>

      <div className="flex items-start gap-2">
        <input
          id="consent"
          type="checkbox"
          name="consent"
          checked={values.consent}
          onChange={handleChange}
          onBlur={() => handleBlur('consent')}
          className={`mt-1 h-4 w-4 rounded text-amber-700 focus:ring-amber-600 ${
            errors.consent ? 'border-red-300' : 'border-gray-300'
          }`}
          required
        />
        <label htmlFor="consent" className="text-sm text-gray-700">
          I agree to the processing of my personal data according to the Privacy Policy. <span className="text-red-500">*</span>
        </label>
      </div>
      {errors.consent && <p className="text-sm text-red-600 mt-1 flex items-center"><span className="mr-1">⚠️</span>{errors.consent}</p>}

      {/* CAPTCHA */}
      <div className="flex justify-center">
        <ReCAPTCHA
          ref={recaptchaRef}
          sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"}
          onChange={(value) => setCaptchaValue(value)}
          onExpired={() => setCaptchaValue(null)}
        />
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

      {/* Legacy status messages (keeping as fallback) */}
      {status === "success" && (
        <p className="text-green-700 text-sm">Thank you! Your message has been sent.</p>
      )}
      {status === "error" && serverError && (
        <p className="text-red-700 text-sm">{serverError}</p>
      )}
      
      {/* Toast notifications */}
      <Toaster />
    </form>
  );
}