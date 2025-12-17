import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Phone, Mail, Clock, Shield, CheckCircle } from "lucide-react";
import { z } from "zod";
import { useCmsContent, CmsContent } from "@/hooks/useCmsContent";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Please enter a valid email address").max(255, "Email must be less than 255 characters"),
  phone: z.string().trim().min(1, "Phone number is required").max(20, "Phone number must be less than 20 characters"),
  injuryType: z.string().trim().min(1, "Please select an injury type"),
  message: z.string().trim().min(1, "Please describe your situation").max(2000, "Message must be less than 2000 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const injuryTypes = [
  "Car Accident",
  "Truck Accident",
  "Motorcycle Accident",
  "Slip & Fall",
  "Wrongful Death",
  "Medical Malpractice",
  "Workplace Injury",
  "Other",
];

const Contact = () => {
  const { toast } = useToast();
  const { data: allContent } = useCmsContent();
  
  const contentMap = (allContent as CmsContent[] || []).reduce((acc, item) => {
    acc[item.section_key] = item.content;
    return acc;
  }, {} as Record<string, Record<string, unknown>>);

  const contactContent = contentMap.contact || {};
  const firmContent = contentMap.firm || {};

  const phone = (contactContent.phone as string) || "1-800-555-1234";
  const email = (contactContent.email as string) || "info@justiceandassociates.com";
  const address = (contactContent.address as string) || "1000 Justice Plaza, Suite 500";
  const city = (contactContent.city as string) || "Los Angeles";
  const state = (contactContent.state as string) || "CA";
  const zip = (contactContent.zip as string) || "90001";

  const contactInfo = [
    {
      icon: Phone,
      title: "Call Us 24/7",
      content: [phone],
      href: `tel:${phone.replace(/[^0-9]/g, '')}`,
      highlight: true,
    },
    {
      icon: MapPin,
      title: "Main Office",
      content: [address, `${city}, ${state} ${zip}`],
    },
    {
      icon: Mail,
      title: "Email",
      content: [email],
      href: `mailto:${email}`,
    },
    {
      icon: Clock,
      title: "Availability",
      content: ["Available 24/7", "We answer when you call"],
    },
  ];

  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    injuryType: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof ContactFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const result = contactSchema.safeParse(formData);
    
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ContactFormData, string>> = {};
      result.error.errors.forEach((error) => {
        const field = error.path[0] as keyof ContactFormData;
        if (!fieldErrors[field]) {
          fieldErrors[field] = error.message;
        }
      });
      setErrors(fieldErrors);
      toast({
        title: "Please complete all fields",
        description: "Fill in the required information to submit your case.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Case Submitted",
      description: "Thank you! An attorney will review your case and contact you within 24 hours.",
    });
    setFormData({ name: "", email: "", phone: "", injuryType: "", message: "" });
    setErrors({});
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="page-hero">
        <div className="container-custom">
          <h1 className="animate-fade-in">Free Case Evaluation</h1>
          <p className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
            Tell us about your injury. An attorney will review your case and contact you within 24 hours.
          </p>
        </div>
      </section>

      {/* Urgency Banner */}
      <section className="py-6 bg-destructive">
        <div className="container-custom text-center">
          <p className="text-destructive-foreground font-bold text-lg">
            ⚠️ Don't wait! Evidence disappears and deadlines pass. Call now or submit your case online.
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Form */}
            <div className="lg:col-span-3 animate-fade-in">
              <div className="bg-secondary p-8 md:p-10 rounded-xl border border-border">
                <h2 className="mb-2">Tell Us What Happened</h2>
                <p className="text-muted-foreground mb-8">All information is confidential and protected by attorney-client privilege.</p>
                
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label htmlFor="name" className="block mb-2 font-semibold text-foreground">
                      Full Name <span className="text-destructive">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      maxLength={100}
                      className={`w-full px-4 py-4 border rounded-lg bg-background focus:outline-none transition-colors text-lg ${
                        errors.name ? "border-destructive focus:border-destructive" : "border-border focus:border-gold"
                      }`}
                      placeholder="Your full name"
                    />
                    {errors.name && <p className="mt-1 text-sm text-destructive">{errors.name}</p>}
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="email" className="block mb-2 font-semibold text-foreground">
                        Email <span className="text-destructive">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        maxLength={255}
                        className={`w-full px-4 py-4 border rounded-lg bg-background focus:outline-none transition-colors text-lg ${
                          errors.email ? "border-destructive focus:border-destructive" : "border-border focus:border-gold"
                        }`}
                        placeholder="you@email.com"
                      />
                      {errors.email && <p className="mt-1 text-sm text-destructive">{errors.email}</p>}
                    </div>

                    <div>
                      <label htmlFor="phone" className="block mb-2 font-semibold text-foreground">
                        Phone <span className="text-destructive">*</span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        maxLength={20}
                        className={`w-full px-4 py-4 border rounded-lg bg-background focus:outline-none transition-colors text-lg ${
                          errors.phone ? "border-destructive focus:border-destructive" : "border-border focus:border-gold"
                        }`}
                        placeholder="(555) 123-4567"
                      />
                      {errors.phone && <p className="mt-1 text-sm text-destructive">{errors.phone}</p>}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="injuryType" className="block mb-2 font-semibold text-foreground">
                      Type of Injury <span className="text-destructive">*</span>
                    </label>
                    <select
                      id="injuryType"
                      name="injuryType"
                      value={formData.injuryType}
                      onChange={handleChange}
                      className={`w-full px-4 py-4 border rounded-lg bg-background focus:outline-none transition-colors text-lg ${
                        errors.injuryType ? "border-destructive focus:border-destructive" : "border-border focus:border-gold"
                      }`}
                    >
                      <option value="">Select injury type...</option>
                      {injuryTypes.map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                    {errors.injuryType && <p className="mt-1 text-sm text-destructive">{errors.injuryType}</p>}
                  </div>

                  <div>
                    <label htmlFor="message" className="block mb-2 font-semibold text-foreground">
                      Describe What Happened <span className="text-destructive">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      maxLength={2000}
                      className={`w-full px-4 py-4 border rounded-lg bg-background focus:outline-none transition-colors resize-none text-lg ${
                        errors.message ? "border-destructive focus:border-destructive" : "border-border focus:border-gold"
                      }`}
                      placeholder="Tell us about your accident and injuries..."
                    />
                    {errors.message && <p className="mt-1 text-sm text-destructive">{errors.message}</p>}
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gold text-primary py-5 font-bold rounded-lg hover:bg-gold-hover transition-colors text-xl uppercase tracking-wide"
                  >
                    Get Free Case Review
                  </button>

                  <div className="flex items-center gap-3 pt-4">
                    <Shield className="w-5 h-5 text-gold shrink-0" />
                    <p className="text-sm text-muted-foreground">
                      Your information is secure and protected by attorney-client privilege.
                    </p>
                  </div>
                </form>
              </div>
            </div>

            {/* Contact Info */}
            <div className="lg:col-span-2 animate-fade-in" style={{ animationDelay: "0.1s" }}>
              <h2 className="mb-8">Contact Us Directly</h2>
              <div className="space-y-6 mb-10">
                {contactInfo.map((info) => (
                  <div
                    key={info.title}
                    className={`flex gap-4 p-5 rounded-lg border ${
                      info.highlight 
                        ? "bg-gold/10 border-gold" 
                        : "bg-secondary border-border/50"
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center shrink-0 ${
                      info.highlight ? "bg-gold" : "bg-primary"
                    }`}>
                      <info.icon className={`w-6 h-6 ${info.highlight ? "text-primary" : "text-gold"}`} />
                    </div>
                    <div>
                      <h4 className="text-primary font-bold mb-1">{info.title}</h4>
                      {info.content.map((line) =>
                        info.href ? (
                          <a
                            key={line}
                            href={info.href}
                            className={`block transition-colors text-lg ${
                              info.highlight 
                                ? "text-gold font-bold hover:text-gold-hover" 
                                : "text-muted-foreground hover:text-gold"
                            }`}
                          >
                            {line}
                          </a>
                        ) : (
                          <p key={line} className="text-muted-foreground">
                            {line}
                          </p>
                        )
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Promise Box */}
              <div className="bg-primary p-8 rounded-xl">
                <h3 className="text-gold text-xl mb-4">Our Promise To You</h3>
                <ul className="space-y-3">
                  {[
                    "Free case evaluation",
                    "No fee unless we win",
                    "Response within 24 hours",
                    "Confidential consultation",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-primary-foreground">
                      <CheckCircle className="w-5 h-5 text-gold shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 bg-primary text-center">
        <div className="container-custom">
          <h2 className="text-primary-foreground mb-4">Prefer to Talk?</h2>
          <p className="text-primary-foreground/80 mb-8 text-lg">
            Call us anytime, day or night. We're here when you need us.
          </p>
          <a
            href={`tel:${phone.replace(/[^0-9]/g, '')}`}
            className="inline-flex items-center gap-3 bg-gold text-primary font-bold px-10 py-5 rounded-lg hover:bg-gold-hover transition-colors text-xl uppercase tracking-wide"
          >
            <Phone className="w-6 h-6" />
            {phone}
          </a>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
