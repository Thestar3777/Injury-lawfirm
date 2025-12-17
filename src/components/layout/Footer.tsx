import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Clock, Shield, Award, Scale } from "lucide-react";
import { useCmsContent, CmsContent } from "@/hooks/useCmsContent";

const Footer = () => {
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
  const firmName = (firmContent.name as string) || "Justice & Associates";
  const tagline = (firmContent.tagline as string) || "No Fee Unless We Win";

  return (
    <footer className="bg-primary text-primary-foreground">
      {/* CTA Banner */}
      <div className="bg-gold py-8">
        <div className="container-custom text-center">
          <h3 className="text-primary text-2xl md:text-3xl mb-4">Injured? Get Your Free Case Review Now</h3>
          <p className="text-primary/80 mb-6 max-w-2xl mx-auto">
            Don't wait. Evidence disappears and deadlines pass. Call now for a free, no-obligation consultation.
          </p>
          <a href={`tel:${phone.replace(/[^0-9]/g, '')}`} className="inline-flex items-center gap-3 bg-primary text-primary-foreground font-bold px-8 py-4 rounded-xl hover:bg-forest-light transition-colors text-lg uppercase tracking-wide shadow-lg">
            <Phone className="w-5 h-5" />
            {phone}
          </a>
        </div>
      </div>

      <div className="py-16">
        <div className="container-custom px-[50px] pr-[100px]">
          <div className="grid md:grid-cols-4 gap-10 mb-12">
            {/* Brand */}
            <div>
              <h4 className="text-gold font-display text-2xl mb-4 tracking-wider">{firmName.toUpperCase()}</h4>
              <p className="text-primary-foreground/70 leading-relaxed mb-6">
                Aggressive representation for injury victims. We fight insurance companies so you can focus on recovery.
              </p>
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-gold/10 rounded-lg flex items-center justify-center">
                  <Shield className="w-6 h-6 text-gold" />
                </div>
                <div className="w-12 h-12 bg-gold/10 rounded-lg flex items-center justify-center">
                  <Award className="w-6 h-6 text-gold" />
                </div>
                <div className="w-12 h-12 bg-gold/10 rounded-lg flex items-center justify-center">
                  <Scale className="w-6 h-6 text-gold" />
                </div>
              </div>
            </div>

            {/* Practice Areas */}
            <div>
              <h5 className="font-bold text-primary-foreground mb-4 uppercase tracking-wide">Practice Areas</h5>
              <ul className="space-y-2">
                {["Car Accidents", "Truck Accidents", "Motorcycle Accidents", "Slip & Fall", "Wrongful Death", "Medical Malpractice"].map(area => (
                  <li key={area}>
                    <Link to="/services" className="text-primary-foreground/70 hover:text-gold transition-colors inline-block py-1">
                      {area}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Office */}
            <div>
              <h5 className="font-bold text-primary-foreground mb-4 uppercase tracking-wide">Office</h5>
              <div className="flex items-start gap-3 text-primary-foreground/70 mb-4">
                <MapPin className="w-5 h-5 shrink-0 mt-1 text-gold" />
                <address className="not-italic leading-relaxed">
                  {address}<br />
                  {city}, {state} {zip}
                </address>
              </div>
              <div className="flex items-start gap-3 text-primary-foreground/70">
                <Clock className="w-5 h-5 shrink-0 mt-1 text-gold" />
                <div>
                  <p>Available 24/7</p>
                  <p className="text-sm">We answer when you call</p>
                </div>
              </div>
            </div>

            {/* Contact */}
            <div>
              <h5 className="font-bold text-primary-foreground mb-4 uppercase tracking-wide">Contact</h5>
              <div className="space-y-4">
                <a href={`tel:${phone.replace(/[^0-9]/g, '')}`} className="flex items-center gap-3 text-gold font-bold text-lg hover:text-gold/80 transition-colors">
                  <Phone className="w-5 h-5 shrink-0" />
                  <span>{phone}</span>
                </a>
                <a href={`mailto:${email}`} className="flex items-center gap-3 text-primary-foreground/70 hover:text-gold transition-colors">
                  <Mail className="w-5 h-5 shrink-0" />
                  <span>{email}</span>
                </a>
              </div>
              <div className="mt-6 p-4 bg-gold/10 rounded-lg border border-gold/20">
                <p className="text-gold font-bold text-sm uppercase tracking-wide">{tagline}</p>
                <p className="text-primary-foreground/70 text-sm mt-1">You pay nothing upfront</p>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-primary-foreground/10 text-center space-y-3">
            <p className="text-sm text-primary-foreground/70">
              &copy; {new Date().getFullYear()} {firmName}. All rights reserved.
            </p>
            <p className="text-xs text-primary-foreground/60 max-w-3xl mx-auto">
              The information on this website is for general information purposes only. Nothing on this site should be taken as legal advice. Past results do not guarantee future outcomes.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
