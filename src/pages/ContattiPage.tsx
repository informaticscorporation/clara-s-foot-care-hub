import { useState } from "react";
import { NeuCard } from "@/components/ui/neu-card";
import { NeuButton } from "@/components/ui/neu-button";
import { NeuInput } from "@/components/ui/neu-input";
import { NeuTextarea } from "@/components/ui/neu-textarea";
import { Seo } from "@/components/Seo";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send,
  CheckCircle2
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const contactInfo = [
  {
    icon: MapPin,
    title: "Indirizzo",
    content: "Cardito (NA) - Ricevo su appuntamento",
    link: "https://maps.google.com",
  },
  {
    icon: Phone,
    title: "Telefono",
    content: "+39 379 202 0629",
    link: "tel:+393792020629",
  },
  {
    icon: Mail,
    title: "Email",
    content: "info@claramariapodologa.it",
    link: "mailto:info@claramariapodologa.it",
  },
];

const ContattiPage = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    oggetto: "",
    messaggio: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setFormData({ nome: "", email: "", oggetto: "", messaggio: "" });
    
    toast({
      title: "Messaggio inviato!",
      description: "Ti risponderemo il prima possibile.",
    });
  };

  return (
    <div className="animate-fade-in">
      <Seo
        title="Contatti Podologa Cardito e Caserta | Prenota una Visita"
        description="Contatta Clara Maria Di Nofa per trattamenti podologici e pedicure medico a Cardito, Caserta, Casagiove, Frattamaggiore e Santa Maria Capua Vetere."
        path="/contatti"
      />
      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm font-medium mb-6">
              <Mail size={16} />
              <span>Contattaci</span>
            </div>
            
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6">
              Siamo Qui{" "}
              <span className="text-primary">Per Te</span>
            </h1>
            
            <p className="text-lg text-muted-foreground">
              Hai domande o vuoi maggiori informazioni sui servizi di cura piedi a Cardito, Caserta e comuni limitrofi? Contattaci in qualsiasi momento.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Info Cards */}
            <div className="space-y-6">
              {contactInfo.map((info) => (
                <a
                  key={info.title}
                  href={info.link}
                  target={info.title === "Indirizzo" ? "_blank" : undefined}
                  rel="noopener noreferrer"
                >
                  <NeuCard 
                    hover 
                    size="sm" 
                    className="flex items-start gap-4"
                  >
                    <div className="neu-circle p-3 bg-secondary shrink-0">
                      <info.icon size={20} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-foreground mb-1">
                        {info.title}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        {info.content}
                      </p>
                    </div>
                  </NeuCard>
                </a>
              ))}

              <NeuCard size="sm">
                <div className="flex items-start gap-4">
                  <div className="neu-circle p-3 bg-secondary shrink-0">
                    <Clock size={20} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-foreground mb-3">
                      Orari di Apertura
                    </h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex justify-between">
                        <span className="text-muted-foreground">Lun - Ven</span>
                        <span className="text-foreground font-medium">09:00 - 19:00</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-muted-foreground">Sabato</span>
                        <span className="text-foreground font-medium">09:00 - 13:00</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-muted-foreground">Domenica</span>
                        <span className="text-foreground font-medium">Chiuso</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </NeuCard>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <NeuCard variant="flat">
                <h2 className="font-heading text-2xl font-bold text-foreground mb-6">
                  Inviaci un Messaggio
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <NeuInput
                      id="nome"
                      name="nome"
                      label="Nome"
                      placeholder="Il tuo nome"
                      value={formData.nome}
                      onChange={handleChange}
                      required
                    />
                    <NeuInput
                      id="email"
                      name="email"
                      type="email"
                      label="Email"
                      placeholder="email@esempio.it"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <NeuInput
                    id="oggetto"
                    name="oggetto"
                    label="Oggetto"
                    placeholder="Di cosa vuoi parlare?"
                    value={formData.oggetto}
                    onChange={handleChange}
                    required
                  />

                  <NeuTextarea
                    id="messaggio"
                    name="messaggio"
                    label="Messaggio"
                    placeholder="Scrivi il tuo messaggio..."
                    value={formData.messaggio}
                    onChange={handleChange}
                    required
                    className="min-h-[160px]"
                  />

                  <NeuButton 
                    type="submit" 
                    variant="primary" 
                    size="lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      "Invio in corso..."
                    ) : (
                      <>
                        <Send size={18} className="mr-2 inline" />
                        Invia Messaggio
                      </>
                    )}
                  </NeuButton>
                </form>
              </NeuCard>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <NeuCard variant="pressed" className="p-2 overflow-hidden">
            <div className="aspect-video bg-muted rounded-xl flex items-center justify-center">
              <div className="text-center">
                <MapPin size={48} className="text-primary mx-auto mb-4" />
                <p className="text-muted-foreground">
                  Mappa interattiva disponibile dopo l'integrazione
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  Servizio attivo tra Cardito (NA), Caserta (CE), Casagiove (CE), Frattamaggiore (NA) e Santa Maria Capua Vetere (CE)
                </p>
              </div>
            </div>
          </NeuCard>
        </div>
      </section>
    </div>
  );
};

export default ContattiPage;
