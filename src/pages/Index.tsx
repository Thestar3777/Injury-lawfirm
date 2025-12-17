import Layout from "@/components/layout/Layout";
import ButtonLink from "@/components/ui/ButtonLink";
import { Car, Truck, Bike, Building2, Skull, Stethoscope, ArrowRight, Star, Award, Shield, Phone, Clock, CheckCircle, Users, MapPin } from "lucide-react";
import attorneyPhoto from "@/assets/attorney-photo.jpg";
import heroLawBg from "@/assets/hero-law-bg.jpg";
import { Link } from "react-router-dom";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useCmsContent, CmsContent } from "@/hooks/useCmsContent";

const practiceAreas = [{
  title: "Car Accidents",
  description: "Aggressive representation for auto collision victims. We handle all insurance negotiations.",
  icon: Car
}, {
  title: "Truck Accidents",
  description: "Taking on trucking companies and their insurers for maximum compensation.",
  icon: Truck
}, {
  title: "Motorcycle Accidents",
  description: "Protecting riders' rights and fighting bias against motorcyclists.",
  icon: Bike
}, {
  title: "Slip & Fall",
  description: "Holding property owners accountable for dangerous conditions.",
  icon: Building2
}, {
  title: "Wrongful Death",
  description: "Compassionate advocacy for families who have lost loved ones.",
  icon: Skull
}, {
  title: "Medical Malpractice",
  description: "Holding healthcare providers responsible for negligence.",
  icon: Stethoscope
}];

const caseResults = [{
  amount: "$12.5M",
  type: "Truck Accident Settlement"
}, {
  amount: "$8.2M",
  type: "Medical Malpractice Verdict"
}, {
  amount: "$5.7M",
  type: "Wrongful Death Settlement"
}, {
  amount: "$3.4M",
  type: "Car Accident Settlement"
}];

const trustBadges = [{
  icon: Award,
  text: "$500M+ Recovered"
}, {
  icon: Users,
  text: "10,000+ Cases Won"
}, {
  icon: Shield,
  text: "No Fee Unless We Win"
}, {
  icon: Clock,
  text: "Available 24/7"
}];

const whyChooseUs = [{
  title: "No Upfront Costs",
  description: "You pay nothing unless we win your case. We invest in your recovery."
}, {
  title: "Proven Track Record",
  description: "Over $500 million recovered for injury victims across the country."
}, {
  title: "Aggressive Litigation",
  description: "We take cases to trial when insurance companies refuse fair settlements."
}, {
  title: "Personal Attention",
  description: "Your case is handled by experienced attorneys, not paralegals."
}];

const featuredTestimonial = {
  quote: "After my accident, I was overwhelmed and didn't know where to turn. Justice & Associates fought the insurance company relentlessly and got me a settlement that covered all my medical bills and then some. They changed my life.",
  author: "Robert M.",
  amount: "$1.2M Settlement"
};

const Index = () => {
  const { data: allContent } = useCmsContent();
  
  // Extract content by section
  const contentMap = (allContent as CmsContent[] || []).reduce((acc, item) => {
    acc[item.section_key] = item.content;
    return acc;
  }, {} as Record<string, Record<string, unknown>>);

  const heroContent = contentMap.hero || {};
  const contactContent = contentMap.contact || {};
  const attorneyContent = contentMap.attorney || {};

  const phone = (contactContent.phone as string) || "1-800-555-1234";
  const address = (contactContent.address as string) || "1000 Justice Plaza, Suite 500";
  const city = (contactContent.city as string) || "Los Angeles";
  const state = (contactContent.state as string) || "CA";
  const zip = (contactContent.zip as string) || "90001";

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{
          backgroundImage: `url(${heroLawBg})`
        }} />
        <div className="absolute inset-0 bg-black/70" />

        <div className="container-custom relative z-10 md:py-28 mt-[50px] pb-[50px] pt-[100px] py-[50px]">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-white mb-8 leading-[1.15]">
              {(heroContent.headline as string) || "Injured? We Fight For The"}{" "}
              <span className="text-emerald-light text-sidebar-accent">Compensation You Deserve</span>
            </h1>
            
            <p className="text-lg md:text-xl max-w-2xl mx-auto mb-12 text-white/80 leading-relaxed">
              {(heroContent.subheadline as string) || "Aggressive personal injury attorneys who take on insurance companies and win."}{" "}
              <strong className="text-white">No fee unless we win your case.</strong>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <a href={`tel:${phone.replace(/[^0-9]/g, '')}`} className="inline-flex items-center justify-center gap-3 text-white font-semibold py-4 px-8 rounded-lg hover:bg-emerald-light transition-all text-base shadow-lg hover:shadow-xl w-full sm:w-auto bg-primary">
                <Phone className="w-5 h-5" />
                {(heroContent.cta_secondary as string) || `Call Now: ${phone}`}
              </a>
              <ButtonLink to="/contact" variant="secondary" className="bg-white/10 text-white border border-white/20 hover:bg-white/20 rounded-lg px-8 py-4 w-full sm:w-auto">
                {(heroContent.cta_primary as string) || "Get Free Case Review"}
                <ArrowRight className="inline-block ml-2 w-5 h-5" />
              </ButtonLink>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-10 border-t border-white/10">
              {trustBadges.map(badge => (
                <div key={badge.text} className="text-center">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <badge.icon className="w-6 h-6 text-emerald-light" />
                  </div>
                  <span className="text-sm font-medium text-white/90">{badge.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Case Results Stats */}
      <section className="py-16 bg-gold">
        <div className="container-custom">
          <div className="text-center mb-10">
            <h2 className="text-primary mb-2">Proven Results</h2>
            <p className="text-primary/80 text-lg">Recent settlements and verdicts for our clients</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {caseResults.map((result, index) => (
              <div key={index} className="bg-primary rounded-2xl p-4 md:p-6 text-center card-hover animate-fade-in shadow-xl" style={{ animationDelay: `${index * 0.1}s` }}>
                <span className="stat-number text-xl sm:text-2xl md:text-3xl">{result.amount}</span>
                <p className="text-primary-foreground/80 text-xs sm:text-sm mt-2 uppercase tracking-wide break-words">{result.type}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Practice Areas */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="text-center mb-14">
            <h2 className="mb-4">Practice Areas</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              We handle all types of personal injury cases. If you've been injured due to someone else's negligence, we can help.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {practiceAreas.map((area, index) => (
              <article key={area.title} className="bg-card p-8 rounded-2xl card-hover group animate-fade-in border border-border/50 shadow-lg hover:border-emerald/50" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="w-16 h-16 bg-gradient-to-br from-emerald to-forest rounded-2xl flex items-center justify-center mb-6 group-hover:from-gold group-hover:to-gold-hover transition-all shadow-lg">
                  <area.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl mb-3">{area.title}</h3>
                <p className="text-muted-foreground mb-4">{area.description}</p>
                <Link 
                  to="/services" 
                  className="inline-flex items-center text-emerald font-semibold hover:text-gold transition-colors"
                >
                  Learn More<span className="sr-only"> about {area.title}</span> <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Testimonial */}
      <section className="bg-gradient-to-br from-forest via-forest-light to-forest py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald/10 to-gold/10" />
        <div className="container-custom relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center gap-1 mb-6">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-8 h-8 text-yellow-400 fill-yellow-400" />)}
            </div>
            <blockquote className="text-2xl md:text-3xl text-primary-foreground font-display italic mb-8 leading-relaxed">
              "{featuredTestimonial.quote}"
            </blockquote>
            <div>
              <p className="font-bold text-gold text-xl">{featuredTestimonial.author}</p>
              <p className="text-primary-foreground/80 mt-1">{featuredTestimonial.amount}</p>
            </div>
            <Link to="/testimonials" className="inline-flex items-center mt-10 text-primary-foreground hover:text-gold transition-colors font-semibold uppercase tracking-wide">
              View More Case Results <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Meet Your Attorney */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center max-w-5xl mx-auto">
            <div className="relative">
              <div className="aspect-[4/5] rounded-xl overflow-hidden shadow-2xl">
                <img src={attorneyPhoto} alt={(attorneyContent.name as string) || "Lead Attorney"} className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-gradient-to-br from-gold to-gold-hover p-6 rounded-2xl shadow-xl">
                <p className="font-display text-2xl text-primary font-bold">{(attorneyContent.experience as string) || "25+"}</p>
                <p className="text-primary/80 text-sm uppercase tracking-wide">Years Experience</p>
              </div>
            </div>
            <div>
              <h2 className="mb-6">Meet Your Legal Team</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                {(attorneyContent.description as string) || "Our attorneys have dedicated their careers to fighting for injury victims. With over $500 million recovered, we have the experience and resources to take on any case—no matter how complex."}
              </p>
              <ul className="space-y-4 mb-8">
                {["Former insurance defense attorney—we know their tactics", "Board-certified trial lawyers", "Recognized by Super Lawyers & Best Lawyers"].map(item => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-emerald shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
              <ButtonLink to="/about" variant="secondary" className="group">
                Learn About Our Firm
                <ArrowRight className="inline-block ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding section-light">
        <div className="container-custom">
          <div className="text-center mb-14">
            <h2 className="mb-4">Why Clients Choose Us</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              When you're injured, you deserve attorneys who will fight as hard for you as you would for yourself.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {whyChooseUs.map((item, index) => (
              <div key={item.title} className="bg-background p-8 rounded-2xl border border-border/50 card-hover animate-fade-in shadow-lg hover:border-emerald/30" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="w-12 h-12 bg-gradient-to-br from-emerald to-forest rounded-xl flex items-center justify-center mb-4">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl mb-3 md:text-xl">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="text-center mb-14">
            <h2 className="mb-4">Frequently Asked Questions</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Get answers to common questions about personal injury claims.
            </p>
          </div>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="item-1" className="bg-card border border-border/50 rounded-2xl px-6 shadow-sm">
                <AccordionTrigger className="text-left font-semibold hover:no-underline py-5">
                  How much does it cost to hire you?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5">
                  Nothing upfront. We work on a contingency fee basis, which means you pay no attorney fees unless we win your case. 
                  We only get paid when you get paid.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2" className="bg-card border border-border/50 rounded-2xl px-6 shadow-sm">
                <AccordionTrigger className="text-left font-semibold hover:no-underline py-5">
                  How long will my case take?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5">
                  Every case is different. Simple cases may settle in months, while complex cases involving serious injuries or 
                  litigation can take longer. We always prioritize getting you the maximum compensation, not the fastest settlement.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3" className="bg-card border border-border/50 rounded-2xl px-6 shadow-sm">
                <AccordionTrigger className="text-left font-semibold hover:no-underline py-5">
                  What if the insurance company already made me an offer?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5">
                  Do not accept any offer without consulting an attorney first. Insurance companies often make lowball offers 
                  hoping you'll accept before you understand the true value of your case. We can evaluate whether the offer is fair.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4" className="bg-card border border-border/50 rounded-2xl px-6 shadow-sm">
                <AccordionTrigger className="text-left font-semibold hover:no-underline py-5">
                  What damages can I recover?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5">
                  You may be entitled to compensation for medical expenses, lost wages, pain and suffering, emotional distress, 
                  property damage, and in some cases, punitive damages. We'll evaluate all potential damages in your free consultation.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* Areas Served & Location */}
      <section className="section-padding section-light">
        <div className="container-custom">
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-3 mb-4">
              <MapPin className="w-6 h-6 text-emerald" />
              <h2 className="mb-0">Serving Injury Victims Nationwide</h2>
            </div>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              With offices in {city} and a network of attorneys across the country.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 items-start max-w-4xl mx-auto">
            <div className="bg-background p-8 rounded-2xl border border-border/50 shadow-lg">
              <h3 className="text-xl mb-4">Main Office</h3>
              <address className="not-italic text-muted-foreground space-y-3">
                <p className="font-semibold text-foreground text-lg">Justice & Associates</p>
                <p>{address}</p>
                <p>{city}, {state} {zip}</p>
                <p className="pt-2">
                  <span className="font-semibold text-foreground">Phone:</span>{" "}
                  <a href={`tel:${phone.replace(/[^0-9]/g, '')}`} className="text-emerald hover:text-gold transition-colors">{phone}</a>
                </p>
                <p>
                  <span className="font-semibold text-foreground">Hours:</span> Available 24/7
                </p>
              </address>
            </div>
            <div className="rounded-xl overflow-hidden shadow-lg border border-border/50 h-72 md:h-full min-h-[288px]">
              <iframe title="Office Location Map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3305.7!2d-118.25!3d34.05!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzTCsDAzJzAwLjAiTiAxMTjCsDE1JzAwLjAiVw!5e0!3m2!1sen!2sus!4v1234567890" width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
            </div>
          </div>
        </div>
      </section>

      {/* Sticky Mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-emerald to-gold p-4 md:hidden z-40 shadow-[0_-4px_20px_rgba(0,0,0,0.2)]">
        <a
          href={`tel:${phone.replace(/[^0-9]/g, '')}`}
          className="flex items-center justify-center gap-3 bg-primary text-primary-foreground py-4 rounded-lg font-bold text-lg"
        >
          <Phone className="w-5 h-5" />
          Call Now for Free Consultation
        </a>
      </div>
    </Layout>
  );
};

export default Index;
