import Layout from "@/components/layout/Layout";
import ButtonLink from "@/components/ui/ButtonLink";
import { ArrowRight, Award, Scale, Shield, Users, Phone, CheckCircle } from "lucide-react";
import attorneyPhoto from "@/assets/attorney-photo.jpg";
import { useCmsContent, CmsContent } from "@/hooks/useCmsContent";

const achievements = [
  { icon: Award, title: "Super Lawyers", description: "Recognized 10+ consecutive years" },
  { icon: Scale, title: "Board Certified", description: "Civil Trial Specialists" },
  { icon: Shield, title: "AV Rated", description: "Highest Martindale-Hubbell rating" },
  { icon: Users, title: "10,000+ Cases", description: "Successfully resolved" },
];

const values = [
  {
    title: "Aggressive Advocacy",
    description: "We don't back down from insurance companies. When they refuse to offer fair compensation, we take them to court.",
  },
  {
    title: "No Fee Unless We Win",
    description: "We invest our own resources in your case. You pay nothing upfront and nothing at all if we don't recover for you.",
  },
  {
    title: "Personal Attention",
    description: "Your case is handled by experienced attorneys—not passed off to paralegals. You have direct access to your legal team.",
  },
  {
    title: "Maximum Compensation",
    description: "We don't take the easy settlement. We fight for every dollar you deserve, including future damages and pain and suffering.",
  },
];

const About = () => {
  const { data: allContent } = useCmsContent();
  
  const contentMap = (allContent as CmsContent[] || []).reduce((acc, item) => {
    acc[item.section_key] = item.content;
    return acc;
  }, {} as Record<string, Record<string, unknown>>);

  const attorneyContent = contentMap.attorney || {};
  const contactContent = contentMap.contact || {};
  const firmContent = contentMap.firm || {};

  const phone = (contactContent.phone as string) || "1-800-555-1234";
  const firmName = (firmContent.name as string) || "Justice & Associates";

  return (
    <Layout>
      {/* Hero */}
      <section className="page-hero">
        <div className="container-custom">
          <h1 className="animate-fade-in">About Our Firm</h1>
          <p className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
            Decades of experience. Hundreds of millions recovered. One mission: Justice for you.
          </p>
        </div>
      </section>

      {/* Achievements Bar */}
      <section className="py-12 bg-gold">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {achievements.map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-14 h-14 bg-primary rounded-xl flex items-center justify-center mx-auto mb-3">
                  <item.icon className="w-7 h-7 text-gold" />
                </div>
                <h4 className="text-primary font-bold text-lg">{item.title}</h4>
                <p className="text-primary/80 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center max-w-5xl mx-auto mb-20">
            <div className="animate-fade-in">
              <div className="aspect-[4/5] rounded-xl overflow-hidden shadow-2xl">
                <img
                  src={attorneyPhoto}
                  alt={(attorneyContent.name as string) || "Lead Attorney"}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
              <h2 className="mb-6">Fighting for the Injured Since 1998</h2>
              <div className="space-y-5 text-muted-foreground text-lg">
                <p>
                  {firmName} was founded on a simple belief: injury victims deserve 
                  aggressive, experienced representation—not rushed settlements that benefit 
                  insurance companies.
                </p>
                <p>
                  {(attorneyContent.description as string) || "Our lead attorneys began their careers defending insurance companies. They saw firsthand how insurers minimize claims and pressure victims into accepting lowball offers. They left to fight on the other side."}
                </p>
                <p>
                  Today, we use that insider knowledge to level the playing field. We know the 
                  tactics. We know the strategies. And we know how to beat them.
                </p>
                <p className="font-semibold text-foreground">
                  With over $500 million recovered for our clients, our track record speaks for itself.
                </p>
              </div>
            </div>
          </div>

          {/* Values */}
          <div className="mb-12">
            <h2 className="text-center mb-12">What Sets Us Apart</h2>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {values.map((value, index) => (
                <div
                  key={value.title}
                  className="bg-secondary p-8 rounded-xl border-l-4 border-gold card-hover animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <h4 className="text-xl mb-3">{value.title}</h4>
                  <p className="text-muted-foreground">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="section-padding section-light">
        <div className="container-custom">
          <div className="text-center mb-14">
            <h2 className="mb-4">Our Process</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              From your first call to your final settlement, here's how we fight for you.
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { step: 1, title: "Free Consultation", desc: "We review your case and explain your options. No obligation." },
              { step: 2, title: "Investigation", desc: "We gather evidence, interview witnesses, and build your case." },
              { step: 3, title: "Negotiation", desc: "We demand full compensation from insurance companies." },
              { step: 4, title: "Trial If Needed", desc: "If they won't pay fair, we take them to court." },
            ].map((item, index) => (
              <div
                key={item.step}
                className="bg-background p-8 rounded-xl text-center card-hover animate-fade-in relative"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-10 h-10 bg-gold text-primary rounded-full flex items-center justify-center font-bold text-lg font-display">
                  {item.step}
                </div>
                <h4 className="text-lg mt-4 mb-3">{item.title}</h4>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Trust Us */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-center mb-12">Why Clients Trust Us</h2>
            <div className="space-y-4">
              {[
                "Former insurance defense attorneys—we know their playbook",
                "We advance all case costs—you pay nothing out of pocket",
                "Direct access to your attorneys—not paralegals",
                "We've taken 100+ cases to trial and won",
                "Available 24/7 for emergencies",
                "Spanish-speaking staff available",
              ].map((item, index) => (
                <div
                  key={item}
                  className="flex items-start gap-4 p-5 bg-secondary rounded-lg animate-fade-in"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <CheckCircle className="w-6 h-6 text-emerald-700 shrink-0 mt-0.5" />
                  <span className="text-lg">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary text-center">
        <div className="container-custom">
          <h2 className="text-primary-foreground mb-4">Ready to Fight for Your Rights?</h2>
          <p className="text-xl text-primary-foreground/80 mb-10 max-w-2xl mx-auto">
            You've been through enough. Let us handle the legal battle while you focus on recovery.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`tel:${phone.replace(/[^0-9]/g, '')}`}
              className="inline-flex items-center justify-center gap-3 bg-gold text-primary font-bold px-8 py-4 rounded-lg hover:bg-gold-hover transition-colors text-lg uppercase tracking-wide"
            >
              <Phone className="w-5 h-5" />
              Call {phone}
            </a>
            <ButtonLink to="/contact" variant="secondary" className="bg-white/10 border border-white/20 text-primary-foreground hover:bg-white/20">
              Free Case Evaluation
              <ArrowRight className="inline-block ml-2 w-5 h-5" />
            </ButtonLink>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
