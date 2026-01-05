import { NeuCard } from "@/components/ui/neu-card";
import { NeuButton } from "@/components/ui/neu-button";
import { Link } from "react-router-dom";
import { 
  Footprints,
  Heart,
  Shield,
  Scissors,
  Sparkles,
  Activity,
  ArrowRight,
  CheckCircle2
} from "lucide-react";

const services = [
  {
    icon: Footprints,
    title: "Trattamento Unghie Incarnite",
    description: "Cura professionale e indolore delle unghie incarnite con tecniche moderne che risolvono il problema alla radice.",
    features: ["Trattamento conservativo", "Tecniche mini-invasive", "Prevenzione recidive"],
  },
  {
    icon: Sparkles,
    title: "Trattamento Micosi",
    description: "Diagnosi e cura delle infezioni fungine delle unghie e della pelle con protocolli efficaci e mirati.",
    features: ["Diagnosi accurata", "Terapia mirata", "Follow-up periodico"],
  },
  {
    icon: Heart,
    title: "Piede Diabetico",
    description: "Assistenza specializzata per pazienti diabetici con controlli preventivi e trattamenti dedicati.",
    features: ["Screening preventivo", "Cura ulcere", "Educazione paziente"],
  },
  {
    icon: Shield,
    title: "Ortesi Plantari",
    description: "Realizzazione di plantari su misura per correggere difetti posturali e alleviare dolori.",
    features: ["Analisi biomeccanica", "Plantari personalizzati", "Materiali di qualità"],
  },
  {
    icon: Scissors,
    title: "Cura Calli e Duroni",
    description: "Rimozione professionale di ispessimenti cutanei con strumenti sterili e tecniche sicure.",
    features: ["Rimozione indolore", "Strumenti monouso", "Consigli preventivi"],
  },
  {
    icon: Activity,
    title: "Analisi del Passo",
    description: "Studio approfondito della camminata per identificare problemi biomeccanici e posturali.",
    features: ["Baropodometria", "Analisi dinamica", "Report dettagliato"],
  },
];

const additionalServices = [
  "Trattamento verruche plantari",
  "Cura delle ragadi",
  "Medicazioni avanzate",
  "Consulenza posturale",
  "Educazione alla prevenzione",
  "Controlli periodici",
];

const ServiziPage = () => {
  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm font-medium mb-6">
              <Sparkles size={16} />
              <span>I Nostri Servizi</span>
            </div>
            
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6">
              Servizi{" "}
              <span className="text-primary">Podologici</span>{" "}
              Professionali
            </h1>
            
            <p className="text-lg text-muted-foreground">
              Offro una gamma completa di trattamenti per la salute e il benessere 
              dei tuoi piedi, utilizzando tecniche all'avanguardia e strumenti 
              di ultima generazione.
            </p>
          </div>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <NeuCard key={service.title} className="group hover:scale-[1.02] transition-transform duration-300">
                <div className="neu-circle w-14 h-14 flex items-center justify-center mb-6 bg-secondary group-hover:bg-primary/10 transition-colors">
                  <service.icon size={24} className="text-primary" />
                </div>
                
                <h3 className="font-heading text-xl font-semibold text-foreground mb-3">
                  {service.title}
                </h3>
                
                <p className="text-muted-foreground text-sm mb-6">
                  {service.description}
                </p>
                
                <ul className="space-y-2">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 size={14} className="text-primary shrink-0" />
                      <span className="text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </NeuCard>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
                Altri{" "}
                <span className="text-primary">Servizi</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Oltre ai servizi principali, offro una serie di trattamenti 
                complementari per garantire una cura completa del piede.
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                {additionalServices.map((service) => (
                  <div 
                    key={service}
                    className="flex items-center gap-2"
                  >
                    <CheckCircle2 size={16} className="text-primary shrink-0" />
                    <span className="text-foreground text-sm">{service}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <NeuCard variant="convex" className="p-8">
              <h3 className="font-heading text-xl font-semibold text-foreground mb-4">
                Prima Visita
              </h3>
              <p className="text-muted-foreground mb-6">
                Durante la prima visita effettuo un'analisi completa del piede, 
                raccogliendo l'anamnesi del paziente e valutando le problematiche 
                presenti. Questo mi permette di elaborare un piano di trattamento 
                personalizzato.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 size={16} className="text-primary" />
                  <span>Anamnesi completa</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 size={16} className="text-primary" />
                  <span>Esame obiettivo del piede</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 size={16} className="text-primary" />
                  <span>Piano di trattamento personalizzato</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 size={16} className="text-primary" />
                  <span>Consigli per la cura quotidiana</span>
                </li>
              </ul>
              <Link to="/prenota">
                <NeuButton variant="primary" className="w-full">
                  Prenota la Prima Visita
                </NeuButton>
              </Link>
            </NeuCard>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
              Come Lavoro
            </h2>
            <p className="text-muted-foreground">
              Un percorso chiaro e trasparente per la cura dei tuoi piedi
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Prenotazione", desc: "Prenota online o telefonicamente il tuo appuntamento" },
              { step: "02", title: "Visita", desc: "Analizziamo insieme la problematica e le tue esigenze" },
              { step: "03", title: "Trattamento", desc: "Eseguiamo il trattamento più adatto alla tua situazione" },
              { step: "04", title: "Follow-up", desc: "Monitoriamo i risultati e pianifichiamo i controlli" },
            ].map((item) => (
              <NeuCard key={item.step} size="sm" className="text-center">
                <div className="font-heading text-3xl font-bold text-primary mb-4">
                  {item.step}
                </div>
                <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {item.desc}
                </p>
              </NeuCard>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <NeuCard variant="flat" className="text-center py-16 px-8 max-w-4xl mx-auto">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
              Hai bisogno di un trattamento?
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-8">
              Contattami per una consulenza o prenota direttamente il tuo 
              appuntamento. Sarò felice di aiutarti.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/prenota">
                <NeuButton variant="primary" size="lg">
                  Prenota Appuntamento
                  <ArrowRight size={20} className="ml-2 inline" />
                </NeuButton>
              </Link>
              <Link to="/contatti">
                <NeuButton variant="default" size="lg">
                  Contattami
                </NeuButton>
              </Link>
            </div>
          </NeuCard>
        </div>
      </section>
    </div>
  );
};

export default ServiziPage;
