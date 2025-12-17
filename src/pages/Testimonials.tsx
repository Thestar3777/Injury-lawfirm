import Layout from "@/components/layout/Layout";
import ButtonLink from "@/components/ui/ButtonLink";
import { ArrowRight, Star, Phone } from "lucide-react";
const caseResults = [{
  amount: "$12,500,000",
  type: "Truck Accident",
  description: "Commercial truck ran a red light, causing catastrophic injuries to our client. We took the case to trial and won."
}, {
  amount: "$8,200,000",
  type: "Medical Malpractice",
  description: "Hospital failed to diagnose a stroke, resulting in permanent brain damage. We held them accountable."
}, {
  amount: "$5,700,000",
  type: "Wrongful Death",
  description: "Family lost their father in a construction site accident. We secured compensation for his wife and children."
}, {
  amount: "$3,400,000",
  type: "Car Accident",
  description: "Drunk driver caused a multi-vehicle collision. Our client suffered spinal injuries requiring multiple surgeries."
}, {
  amount: "$2,100,000",
  type: "Motorcycle Accident",
  description: "Driver failed to yield, hitting our client's motorcycle. Despite insurance company bias, we won."
}, {
  amount: "$1,800,000",
  type: "Slip and Fall",
  description: "Grocery store failed to clean up a spill. Our client suffered a traumatic brain injury from the fall."
}];
const testimonials = [{
  quote: "After my truck accident, I was facing mounting medical bills and couldn't work. Justice & Associates fought the trucking company and their insurers for over a year. They never gave up on me, and we won a settlement that changed my life.",
  author: "Michael R.",
  result: "$3.2M Settlement",
  type: "Truck Accident"
}, {
  quote: "The insurance company offered me $50,000 for my injuries. I thought that was fair until I spoke with Justice & Associates. They got me $1.2 million. Don't accept any offer without talking to these attorneys first.",
  author: "Jennifer S.",
  result: "$1.2M Settlement",
  type: "Car Accident"
}, {
  quote: "When my mother died due to nursing home neglect, I didn't know where to turn. The team at Justice & Associates treated us like family and fought for justice. They held the nursing home accountable.",
  author: "David T.",
  result: "$2.8M Verdict",
  type: "Wrongful Death"
}, {
  quote: "I was injured on a construction site when faulty scaffolding collapsed. My employer wanted me to just file for workers' comp, but Justice & Associates found the equipment manufacturer was liable. They got me so much more.",
  author: "Carlos M.",
  result: "$1.5M Settlement",
  type: "Workplace Injury"
}];
const Testimonials = () => {
  return <Layout>
      {/* Hero */}
      <section className="page-hero">
        <div className="container-custom">
          <h1 className="animate-fade-in">Case Results & Testimonials</h1>
          <p className="animate-fade-in" style={{
          animationDelay: "0.1s"
        }}>
            Real results for real clients. See what we've achieved for injury victims like you.
          </p>
        </div>
      </section>

      {/* Stats Banner */}
      <section className="py-12 bg-gold">
        <div className="container-custom">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 text-center">
            <div className="px-2">
              <span className="block text-3xl sm:text-4xl md:text-5xl font-bold text-primary font-display">$500M+</span>
              <span className="text-primary/80 text-xs sm:text-sm md:text-base uppercase tracking-wide">Total Recovered</span>
            </div>
            <div className="px-2">
              <span className="block text-3xl sm:text-4xl md:text-5xl font-bold text-primary font-display">10,000+</span>
              <span className="text-primary/80 text-xs sm:text-sm md:text-base uppercase tracking-wide">Cases Won</span>
            </div>
            <div className="px-2">
              <span className="block text-3xl sm:text-4xl md:text-5xl font-bold text-primary font-display">98%</span>
              <span className="text-primary/80 text-xs sm:text-sm md:text-base uppercase tracking-wide">Success Rate</span>
            </div>
          </div>
        </div>
      </section>

      {/* Notable Case Results */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="text-center mb-14">
            <h2 className="mb-4">Notable Case Results</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Every case is different, but our track record speaks for itself.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {caseResults.map((result, index) => <div key={index} className="bg-secondary p-8 rounded-xl border-t-4 border-gold card-hover animate-fade-in" style={{
            animationDelay: `${index * 0.1}s`
          }}>
                <div className="gap-2 mb-4 flex items-center justify-center">
                  
                  <span className="text-3xl md:text-4xl font-bold font-display text-primary">{result.amount}</span>
                </div>
                <h3 className="text-xl mb-3 text-emerald text-center">{result.type}</h3>
                <p className="text-muted-foreground text-center">{result.description}</p>
              </div>)}
          </div>
          <p className="text-center text-muted-foreground text-sm max-w-2xl mx-auto mt-[100px] mb-0">
            *Past results do not guarantee future outcomes. Each case is unique and must be evaluated on its own merits.
          </p>
        </div>
      </section>

      {/* Client Testimonials */}
      <section className="section-padding section-light">
        <div className="container-custom">
          <div className="text-center mb-14">
            <h2 className="mb-4">What Our Clients Say</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Don't just take our word for it. Hear from people we've helped.
            </p>
          </div>
          <div className="max-w-4xl mx-auto space-y-8 text-center">
            {testimonials.map((testimonial, index) => <article key={index} className="bg-background p-8 md:p-10 rounded-xl shadow-lg animate-fade-in relative" style={{
            animationDelay: `${index * 0.1}s`
          }}>
                <div className="gap-1 mb-4 flex items-start justify-center">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />)}
                </div>
                <blockquote className="text-lg leading-relaxed text-muted-foreground mb-6">
                  "{testimonial.quote}"
                </blockquote>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-border">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-gold font-bold text-xl">
                        {testimonial.author.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-bold text-primary text-lg text-center">{testimonial.author}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.type} Client</p>
                    </div>
                  </div>
                  <div className="bg-gold/10 px-4 py-2 rounded-lg text-sidebar-foreground">
                    <span className="font-bold text-secondary-foreground">{testimonial.result}</span>
                  </div>
                </div>
              </article>)}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary text-center">
        <div className="container-custom">
          <h2 className="text-primary-foreground mb-4">Your Case Could Be Next</h2>
          <p className="text-xl text-primary-foreground/80 mb-10 max-w-2xl mx-auto">
            You've seen what we've done for others. Let us fight for you. 
            Free consultation, no fee unless we win.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+18005551234" className="inline-flex items-center justify-center gap-3 bg-gold text-primary font-bold px-8 py-4 rounded-lg hover:bg-gold-hover transition-colors text-lg uppercase tracking-wide">
              <Phone className="w-5 h-5" />
              Call 1-800-555-1234
            </a>
            <ButtonLink to="/contact" variant="secondary" className="bg-white/10 border border-white/20 text-primary-foreground hover:bg-white/20">
              Request Free Case Review
              <ArrowRight className="inline-block ml-2 w-5 h-5" />
            </ButtonLink>
          </div>
        </div>
      </section>
    </Layout>;
};
export default Testimonials;