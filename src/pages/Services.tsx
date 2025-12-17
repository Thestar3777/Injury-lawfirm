import Layout from "@/components/layout/Layout";
import ButtonLink from "@/components/ui/ButtonLink";
import { ArrowRight, Car, Truck, Bike, Building2, Skull, Stethoscope, HardHat, Phone } from "lucide-react";
const practiceAreas = [{
  title: "Car Accident Injuries",
  icon: Car,
  description: "Car accidents can cause life-altering injuries. From whiplash to traumatic brain injuries, we fight to get you full compensation for medical bills, lost wages, and pain and suffering.",
  details: ["Rear-end collisions and chain-reaction accidents", "Intersection and T-bone crashes", "Head-on collisions", "Hit-and-run accidents", "Rideshare (Uber/Lyft) accidents", "Uninsured and underinsured motorist claims"],
  note: "Don't give a recorded statement to the insurance company before speaking with us. They will use it against you."
}, {
  title: "Truck Accident Cases",
  icon: Truck,
  description: "Commercial truck accidents are complex cases involving multiple parties—trucking companies, manufacturers, and insurance carriers. We have the resources to take on big trucking corporations.",
  details: ["18-wheeler and semi-truck accidents", "Delivery truck crashes", "Overloaded or improperly loaded cargo", "Driver fatigue and hours-of-service violations", "Defective truck equipment", "Hazardous materials accidents"],
  note: "Trucking companies have teams of lawyers working immediately after a crash. You need experienced representation fast."
}, {
  title: "Motorcycle Accidents",
  icon: Bike,
  description: "Motorcyclists face unique dangers on the road and often suffer severe injuries. We fight the bias against riders and work to get you the compensation you deserve.",
  details: ["Lane-splitting and lane-change accidents", "Left-turn accidents", "Road hazard crashes", "Helmet and gear defects", "Drunk driving collisions", "Dooring accidents in urban areas"],
  note: "Insurance companies often try to blame motorcyclists. We know how to counter these tactics."
}, {
  title: "Slip & Fall / Premises Liability",
  icon: Building2,
  description: "Property owners have a duty to maintain safe conditions. When they fail, and you're injured, we hold them accountable for their negligence.",
  details: ["Wet floor and spill accidents", "Broken stairs and handrails", "Poor lighting in parking lots", "Snow and ice accumulation", "Elevator and escalator malfunctions", "Security failures and assaults"],
  note: "Evidence disappears quickly in premises cases. Report your injury immediately and document everything."
}, {
  title: "Wrongful Death Claims",
  icon: Skull,
  description: "Losing a loved one is devastating. While no amount of money can bring them back, we fight to hold responsible parties accountable and secure your family's financial future.",
  details: ["Fatal car, truck, and motorcycle accidents", "Workplace fatalities", "Medical malpractice deaths", "Nursing home neglect", "Product liability deaths", "Criminal acts and negligent security"],
  note: "Wrongful death claims have strict time limits. Contact us as soon as possible to protect your rights."
}, {
  title: "Medical Malpractice",
  icon: Stethoscope,
  description: "When healthcare providers fail to meet the standard of care, patients suffer. We work with medical experts to prove negligence and fight for fair compensation.",
  details: ["Surgical errors and wrong-site surgery", "Misdiagnosis and delayed diagnosis", "Medication errors", "Birth injuries", "Emergency room negligence", "Hospital-acquired infections"],
  note: "Medical malpractice cases are complex. We advance all costs and only get paid if you win."
}, {
  title: "Workplace Injuries",
  icon: HardHat,
  description: "Injured on the job? You may be entitled to workers' compensation AND a personal injury claim if a third party was responsible.",
  details: ["Construction site accidents", "Industrial equipment injuries", "Repetitive stress injuries", "Toxic exposure", "Falls from heights", "Third-party liability claims"],
  note: "Don't just accept workers' comp. You may have additional claims worth pursuing."
}];
const Services = () => {
  return <Layout>
      {/* Hero */}
      <section className="page-hero">
        <div className="container-custom">
          <h1 className="animate-fade-in">Practice Areas</h1>
          <p className="animate-fade-in" style={{
          animationDelay: "0.1s"
        }}>
            We handle all types of personal injury cases. If you've been injured, we're ready to fight for you.
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className="py-12 bg-gold">
        <div className="container-custom text-center">
          <p className="text-primary text-xl font-semibold max-w-3xl mx-auto">
            Every case starts with a free consultation. We'll review your situation, explain your options, and if we take your case, you pay nothing unless we win.
          </p>
        </div>
      </section>

      {/* Practice Areas Detail */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto space-y-12">
            {practiceAreas.map((area, index) => <article key={area.title} id={area.title.toLowerCase().replace(/\s+/g, '-')} className="bg-secondary p-8 md:p-10 rounded-xl border-l-4 border-gold animate-fade-in scroll-mt-32" style={{
            animationDelay: `${index * 0.05}s`
          }}>
                <div className="flex items-start gap-6 mb-6">
                  <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center shrink-0">
                    <area.icon className="w-8 h-8 text-gold" />
                  </div>
                  <div>
                    <h2 className="text-2xl md:text-3xl mb-0">{area.title}</h2>
                  </div>
                </div>
                
                <p className="text-muted-foreground mb-6 text-lg">{area.description}</p>

                <h4 className="text-lg mb-4 font-bold uppercase tracking-wide">Cases We Handle</h4>
                <ul className="grid sm:grid-cols-2 gap-3 mb-6">
                  {area.details.map(item => <li key={item} className="flex items-start gap-2">
                      <ArrowRight className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>)}
                </ul>

                <div className="bg-primary/5 border border-gold/20 p-5 rounded-lg mb-8">
                  <p className="text-foreground font-semibold">
                    <span className="text-primary">Important:</span> {area.note}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <ButtonLink to="/contact" variant="primary" className="group">
                    Get Free Case Review
                    <ArrowRight className="inline-block ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </ButtonLink>
                  <a href="tel:+18005551234" className="inline-flex items-center justify-center gap-2 bg-primary/10 text-primary font-bold px-6 py-3 rounded-lg hover:bg-primary/20 transition-colors">
                    <Phone className="w-5 h-5" />
                    Call 1-800-555-1234
                  </a>
                </div>
              </article>)}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary text-center">
        <div className="container-custom">
          <h2 className="text-primary-foreground mb-4">Don't Wait to Get Help</h2>
          <p className="text-xl text-primary-foreground/80 mb-10 max-w-2xl mx-auto">
            Evidence disappears. Witnesses forget. Statutes of limitations expire. 
            The sooner you call, the stronger your case.
          </p>
          <a href="tel:+18005551234" className="inline-flex items-center gap-3 bg-gold text-primary font-bold px-10 py-5 rounded-lg hover:bg-gold-hover transition-colors text-xl uppercase tracking-wide">
            <Phone className="w-6 h-6" />
            Call Now: 1-800-555-1234
          </a>
        </div>
      </section>
    </Layout>;
};
export default Services;