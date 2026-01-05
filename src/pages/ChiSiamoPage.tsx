import { NeuCard } from "@/components/ui/neu-card";
import { NeuButton } from "@/components/ui/neu-button";
import { Link } from "react-router-dom";
import { 
  GraduationCap, 
  Award, 
  Heart, 
  Users, 
  CheckCircle2,
  ArrowRight 
} from "lucide-react";

const qualifications = [
  "Laurea in Podologia",
  "Master in Biomeccanica del Piede",
  "Specializzazione in Piede Diabetico",
  "Certificazione in Ortesi Plantari",
  "Formazione continua ECM",
];

const values = [
  {
    icon: Heart,
    title: "Passione",
    description: "Amo il mio lavoro e ogni giorno mi dedico con entusiasmo ai miei pazienti.",
  },
  {
    icon: Award,
    title: "Competenza",
    description: "Aggiornamento costante per offrire sempre le migliori cure disponibili.",
  },
  {
    icon: Users,
    title: "Empatia",
    description: "Ascolto attento e comprensione delle esigenze individuali di ogni paziente.",
  },
];

const ChiSiamoPage = () => {
  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm font-medium">
                <GraduationCap size={16} />
                <span>Chi Sono</span>
              </div>
              
              <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground">
                Ciao, sono{" "}
                <span className="text-primary">Clara Maria</span>
              </h1>
              
              <p className="text-lg text-muted-foreground leading-relaxed">
                Sono una podologa professionista con oltre 10 anni di esperienza 
                nel campo della cura del piede. La mia passione per questo lavoro 
                nasce dalla volontà di aiutare le persone a ritrovare il benessere 
                partendo dalle fondamenta: i piedi.
              </p>
              
              <p className="text-muted-foreground leading-relaxed">
                Ho conseguito la laurea in Podologia presso l'Università di Roma 
                e successivamente ho approfondito le mie conoscenze con master e 
                corsi di specializzazione in biomeccanica, piede diabetico e 
                realizzazione di ortesi plantari.
              </p>
              
              <p className="text-muted-foreground leading-relaxed">
                Ogni paziente che entra nel mio studio viene accolto con attenzione 
                e cura. Il mio approccio è sempre personalizzato perché credo che 
                ogni piede abbia una storia unica da raccontare.
              </p>
            </div>
            
            <div>
              <NeuCard variant="convex" className="p-8">
                <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 to-secondary flex items-center justify-center">
                  <div className="text-center">
                    <div className="neu-circle w-32 h-32 mx-auto flex items-center justify-center bg-background">
                      <span className="font-heading text-4xl font-bold text-primary">CM</span>
                    </div>
                    <h3 className="font-heading text-xl font-semibold text-foreground mt-6">
                      Clara Maria Di Nofa
                    </h3>
                    <p className="text-primary font-medium">Podologa</p>
                  </div>
                </div>
              </NeuCard>
            </div>
          </div>
        </div>
      </section>

      {/* Qualifications */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <NeuCard variant="flat" className="p-8">
              <h3 className="font-heading text-xl font-semibold text-foreground mb-6">
                Formazione e Qualifiche
              </h3>
              <ul className="space-y-4">
                {qualifications.map((qual) => (
                  <li key={qual} className="flex items-center gap-3">
                    <div className="neu-circle p-2 bg-secondary">
                      <CheckCircle2 size={16} className="text-primary" />
                    </div>
                    <span className="text-foreground">{qual}</span>
                  </li>
                ))}
              </ul>
            </NeuCard>
            
            <div className="space-y-6">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
                Una formazione{" "}
                <span className="text-primary">completa</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                La formazione continua è un pilastro fondamentale della mia 
                professione. Partecipo regolarmente a convegni, workshop e 
                corsi di aggiornamento per essere sempre al passo con le 
                ultime tecniche e tecnologie nel campo della podologia.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Questo mi permette di offrire ai miei pazienti trattamenti 
                all'avanguardia e soluzioni innovative per ogni problematica 
                del piede.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
              I Miei Valori
            </h2>
            <p className="text-muted-foreground">
              Questi sono i principi che guidano ogni giorno il mio lavoro
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value) => (
              <NeuCard key={value.title} className="text-center">
                <div className="neu-circle w-16 h-16 flex items-center justify-center mx-auto mb-6 bg-secondary">
                  <value.icon size={28} className="text-primary" />
                </div>
                <h3 className="font-heading text-xl font-semibold text-foreground mb-3">
                  {value.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {value.description}
                </p>
              </NeuCard>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <NeuCard variant="convex" className="text-center py-16 px-8 max-w-4xl mx-auto">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-6">
              La Mia Filosofia
            </h2>
            <blockquote className="text-xl text-muted-foreground italic max-w-2xl mx-auto mb-8">
              "I piedi sono le radici del nostro corpo. Prendersene cura significa 
              investire nel proprio benessere quotidiano. Ogni passo che fai merita 
              attenzione e cura professionale."
            </blockquote>
            <p className="font-heading text-lg font-semibold text-primary">
              — Clara Maria Di Nofa
            </p>
          </NeuCard>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl font-bold text-foreground mb-4">
            Vuoi conoscermi di persona?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Prenota un appuntamento e scopri come posso aiutarti a ritrovare 
            il benessere dei tuoi piedi.
          </p>
          <Link to="/prenota">
            <NeuButton variant="primary" size="lg">
              Prenota Appuntamento
              <ArrowRight size={20} className="ml-2 inline" />
            </NeuButton>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ChiSiamoPage;
