import { NeuCard } from "@/components/ui/neu-card";
import { NeuButton } from "@/components/ui/neu-button";
import { Seo } from "@/components/Seo";
import { 
  Calendar,
  Phone,
  MessageCircle,
  Footprints
} from "lucide-react";

const PrenotaPage = () => {
  return (
    <div className="animate-fade-in">
      <Seo
        title="Prenota Pedicure Medico a Frattamaggiore e Caserta"
        description="Prenota online una visita podologica per cura piedi a Cardito, Caserta, Casagiove, Frattamaggiore e Santa Maria Capua Vetere."
        path="/prenota"
      />
      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm font-medium mb-6">
              <Calendar size={16} />
              <span>Prenota Online</span>
            </div>
            
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6">
              Prenota il Tuo{" "}
              <span className="text-primary">Appuntamento</span>
            </h1>
            
            <p className="text-lg text-muted-foreground">
              La prenotazione avviene solo tramite chiamata o messaggio WhatsApp al numero{" "}
              <strong>+39 379 202 0629</strong>.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div>
              <NeuCard variant="flat" className="h-full">
                <h2 className="font-heading text-2xl font-semibold text-foreground mb-4">
                  Contatta per Prenotare
                </h2>
                <p className="text-muted-foreground mb-8">
                  Per fissare un appuntamento, chiama direttamente oppure invia
                  un messaggio su WhatsApp. Ti risponderemo per concordare giorno e orario.
                </p>
                <div className="space-y-4">
                  <NeuButton asChild variant="primary" size="lg" className="w-full">
                    <a href="tel:+393792020629">
                      <Phone size={18} className="mr-2" />
                      Chiama +39 379 202 0629
                    </a>
                  </NeuButton>
                  <NeuButton asChild variant="secondary" size="lg" className="w-full">
                    <a href="https://wa.me/393792020629" target="_blank" rel="noopener noreferrer">
                      <MessageCircle size={18} className="mr-2" />
                      Scrivi su WhatsApp
                    </a>
                  </NeuButton>
                </div>
              </NeuCard>
            </div>

            {/* Info Sidebar */}
            <div className="space-y-6">
              <NeuCard variant="convex" size="sm">
                <h3 className="font-heading text-lg font-semibold text-foreground mb-4">
                  Come Funziona
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="neu-circle p-2 bg-secondary shrink-0">
                      <span className="text-primary font-bold text-sm">1</span>
                    </div>
                    <div>
                      <p className="font-medium text-foreground text-sm">Compila il form</p>
                      <p className="text-muted-foreground text-xs">Inserisci i tuoi dati e scegli data e ora</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="neu-circle p-2 bg-secondary shrink-0">
                      <span className="text-primary font-bold text-sm">2</span>
                    </div>
                    <div>
                      <p className="font-medium text-foreground text-sm">Attendi conferma</p>
                      <p className="text-muted-foreground text-xs">Ti contatteremo entro 24 ore</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="neu-circle p-2 bg-secondary shrink-0">
                      <span className="text-primary font-bold text-sm">3</span>
                    </div>
                    <div>
                      <p className="font-medium text-foreground text-sm">Vieni in studio</p>
                      <p className="text-muted-foreground text-xs">Presentati all'orario concordato</p>
                    </div>
                  </li>
                </ul>
              </NeuCard>

              <NeuCard size="sm">
                <h3 className="font-heading text-lg font-semibold text-foreground mb-4">
                  Orari Studio
                </h3>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">Lunedì - Venerdì</span>
                    <span className="text-foreground font-medium">09:00 - 19:00</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">Sabato</span>
                    <span className="text-foreground font-medium">09:00 - 13:00</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">Domenica</span>
                    <span className="text-foreground font-medium">Chiuso</span>
                  </li>
                </ul>
              </NeuCard>

              <NeuCard size="sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="neu-circle p-2 bg-primary/10">
                    <Footprints size={20} className="text-primary" />
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-foreground">
                    Prima Visita?
                  </h3>
                </div>
                <p className="text-muted-foreground text-sm">
                  Per la prima visita ti consigliamo di portare eventuali 
                  referti medici o esami precedenti relativi ai tuoi piedi.
                </p>
              </NeuCard>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrenotaPage;
