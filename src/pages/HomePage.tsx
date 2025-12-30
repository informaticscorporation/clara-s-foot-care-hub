import { Link } from "react-router-dom";
import { NeuButton } from "@/components/ui/neu-button";
import { NeuCard } from "@/components/ui/neu-card";
import { FootLogo } from "@/components/FootLogo";
import { 
  Footprints, 
  Heart, 
  Shield, 
  Clock, 
  ArrowRight,
  Star,
  CheckCircle2
} from "lucide-react";

const services = [
  {
    icon: Footprints,
    title: "Trattamento Unghie",
    description: "Cura professionale per unghie incarnite, micosi e altre problematiche.",
  },
  {
    icon: Heart,
    title: "Cura del Piede Diabetico",
    description: "Trattamento specializzato per pazienti diabetici con massima attenzione.",
  },
  {
    icon: Shield,
    title: "Ortesi Plantari",
    description: "Realizzazione di plantari su misura per correggere postura e dolori.",
  },
];

const features = [
  "Professionalità certificata",
  "Ambiente sterile e sicuro",
  "Strumenti monouso",
  "Approccio personalizzato",
];

const testimonials = [
  {
    name: "Maria Rossi",
    text: "Finalmente ho trovato una podologa che capisce le mie esigenze. Clara Maria è gentilissima e molto competente.",
    rating: 5,
  },
  {
    name: "Giuseppe Bianchi",
    text: "Dopo anni di problemi ai piedi, grazie alle cure di Clara ho ritrovato il benessere. Consigliatissima!",
    rating: 5,
  },
  {
    name: "Anna Verdi",
    text: "Studio accogliente, appuntamenti puntuali e risultati eccellenti. Non potrei chiedere di meglio.",
    rating: 5,
  },
];

const HomePage = () => {
  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm font-medium">
                <Footprints size={16} />
                <span>Cura professionale dei piedi</span>
              </div>
              
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Il benessere dei tuoi{" "}
                <span className="text-primary">piedi</span>{" "}
                inizia qui
              </h1>
              
              <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
                Sono Clara Maria Di Nofa, podologa professionista. 
                Offro trattamenti personalizzati per la salute e il benessere dei tuoi piedi.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Link to="/prenota">
                  <NeuButton variant="primary" size="lg">
                    Prenota Appuntamento
                    <ArrowRight size={20} className="ml-2 inline" />
                  </NeuButton>
                </Link>
                <Link to="/servizi">
                  <NeuButton variant="default" size="lg">
                    Scopri i Servizi
                  </NeuButton>
                </Link>
              </div>
              
              <div className="flex flex-wrap gap-4 pt-4">
                {features.map((feature) => (
                  <div 
                    key={feature}
                    className="flex items-center gap-2 text-sm text-muted-foreground"
                  >
                    <CheckCircle2 size={16} className="text-primary" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <NeuCard variant="convex" className="p-8 lg:p-12">
                <div className="flex justify-center">
                  <FootLogo size="xl" showText={false} />
                </div>
                <div className="mt-8 text-center">
                  <h2 className="font-heading text-2xl font-semibold text-foreground">
                    Clara Maria Di Nofa
                  </h2>
                  <p className="text-primary font-medium mt-1">Podologa Professionista</p>
                  <div className="flex justify-center gap-1 mt-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={20} className="text-warning fill-warning" />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    +500 pazienti soddisfatti
                  </p>
                </div>
              </NeuCard>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
              I Nostri Servizi
            </h2>
            <p className="text-muted-foreground">
              Offriamo una gamma completa di trattamenti podologici per ogni esigenza
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service) => (
              <NeuCard 
                key={service.title} 
                hover 
                className="text-center group"
              >
                <div className="neu-circle w-16 h-16 flex items-center justify-center mx-auto mb-6 bg-secondary group-hover:bg-primary/10 transition-colors">
                  <service.icon size={28} className="text-primary" />
                </div>
                <h3 className="font-heading text-xl font-semibold text-foreground mb-3">
                  {service.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {service.description}
                </p>
              </NeuCard>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/servizi">
              <NeuButton variant="default" size="lg">
                Vedi Tutti i Servizi
                <ArrowRight size={18} className="ml-2 inline" />
              </NeuButton>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <NeuCard variant="flat" className="p-8">
                <div className="grid grid-cols-2 gap-6">
                  <NeuCard size="sm" variant="pressed" className="text-center">
                    <p className="font-heading text-3xl font-bold text-primary">10+</p>
                    <p className="text-sm text-muted-foreground mt-1">Anni di esperienza</p>
                  </NeuCard>
                  <NeuCard size="sm" variant="pressed" className="text-center">
                    <p className="font-heading text-3xl font-bold text-primary">500+</p>
                    <p className="text-sm text-muted-foreground mt-1">Pazienti trattati</p>
                  </NeuCard>
                  <NeuCard size="sm" variant="pressed" className="text-center">
                    <p className="font-heading text-3xl font-bold text-primary">100%</p>
                    <p className="text-sm text-muted-foreground mt-1">Soddisfazione</p>
                  </NeuCard>
                  <NeuCard size="sm" variant="pressed" className="text-center">
                    <p className="font-heading text-3xl font-bold text-primary">
                      <Clock size={32} className="mx-auto" />
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">Sempre puntuali</p>
                  </NeuCard>
                </div>
              </NeuCard>
            </div>
            
            <div className="space-y-6">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
                Perché scegliere{" "}
                <span className="text-primary">Clara Maria</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                La mia missione è prendermi cura della salute dei tuoi piedi con 
                professionalità, competenza e un tocco di umanità. Ogni paziente 
                è unico e merita un trattamento personalizzato.
              </p>
              <ul className="space-y-4">
                {[
                  "Formazione continua e aggiornamenti costanti",
                  "Utilizzo di tecnologie all'avanguardia",
                  "Ambiente accogliente e rilassante",
                  "Ascolto attento delle esigenze del paziente",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="text-primary shrink-0 mt-0.5" size={20} />
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
              <Link to="/chi-siamo">
                <NeuButton variant="default">
                  Scopri di più su di me
                </NeuButton>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
              Cosa Dicono i Pazienti
            </h2>
            <p className="text-muted-foreground">
              La soddisfazione dei miei pazienti è la mia più grande ricompensa
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <NeuCard key={testimonial.name} className="relative">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} className="text-warning fill-warning" />
                  ))}
                </div>
                <p className="text-muted-foreground italic mb-6">
                  "{testimonial.text}"
                </p>
                <p className="font-semibold text-foreground">
                  {testimonial.name}
                </p>
              </NeuCard>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <NeuCard variant="convex" className="text-center py-16 px-8">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
              Pronto a prenderti cura dei tuoi piedi?
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-8">
              Prenota oggi il tuo appuntamento e inizia il percorso verso 
              il benessere dei tuoi piedi.
            </p>
            <Link to="/prenota">
              <NeuButton variant="primary" size="lg">
                Prenota Ora
                <ArrowRight size={20} className="ml-2 inline" />
              </NeuButton>
            </Link>
          </NeuCard>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
