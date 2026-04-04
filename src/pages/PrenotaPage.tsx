import { useState } from "react";
import { NeuCard } from "@/components/ui/neu-card";
import { NeuButton } from "@/components/ui/neu-button";
import { NeuInput } from "@/components/ui/neu-input";
import { NeuTextarea } from "@/components/ui/neu-textarea";
import { Seo } from "@/components/Seo";
import { useCreateCliente } from "@/hooks/useClienti";
import { useCreateAppuntamento } from "@/hooks/useAppuntamenti";
import { ClienteInsert, AppuntamentoInsert } from "@/types/database";
import { 
  Calendar,
  Clock,
  User,
  Mail,
  Phone,
  MessageSquare,
  CheckCircle2,
  AlertCircle,
  Footprints
} from "lucide-react";

const services = [
  "Prima Visita",
  "Trattamento Unghie Incarnite",
  "Trattamento Micosi",
  "Cura Piede Diabetico",
  "Ortesi Plantari",
  "Cura Calli e Duroni",
  "Analisi del Passo",
  "Altro",
];

const timeSlots = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00"
];

const PrenotaPage = () => {
  const [formData, setFormData] = useState({
    nome: "",
    cognome: "",
    email: "",
    telefono: "",
    servizio: "",
    data: "",
    orario: "",
    note: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const createClienteMutation = useCreateCliente();
  const createAppuntamentoMutation = useCreateAppuntamento();
  const isSubmitting = createClienteMutation.isPending || createAppuntamentoMutation.isPending;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
      
    try {
      // Step 1: Create cliente
      const clienteData: ClienteInsert = {
        nome: formData.nome,
        cognome: formData.cognome,
        email: formData.email,
        telefono: formData.telefono,
      };

      const clienteResponse = await createClienteMutation.mutateAsync(clienteData);

      // Step 2: Create appuntamento
      const appuntamentoData: AppuntamentoInsert = {
        id_cliente: clienteResponse.id,
        servizio: formData.servizio,
        data_appuntamento: formData.data,
        ora_appuntamento: formData.orario,
        note: formData.note || null,
        stato: "in_attesa",
      };

      await createAppuntamentoMutation.mutateAsync(appuntamentoData);

      // Success - show message
      setIsSubmitted(true);
    } catch (error) {
      console.error("Errore nella prenotazione:", error);
    }
  };

  if (isSubmitted) {
    return (
      <div className="animate-fade-in py-20">
        <Seo
          title="Prenotazione Podologa Cardito e Caserta | Richiesta Inviata"
          description="Richiesta appuntamento ricevuta per trattamenti podologici tra Cardito, Caserta, Casagiove, Frattamaggiore e Santa Maria Capua Vetere."
          path="/prenota"
        />
        <div className="container mx-auto px-4">
          <NeuCard variant="convex" className="max-w-2xl mx-auto text-center py-16">
            <div className="neu-circle w-20 h-20 flex items-center justify-center mx-auto mb-6 bg-success/10">
              <CheckCircle2 size={40} className="text-success" />
            </div>
            <h1 className="font-heading text-3xl font-bold text-foreground mb-4">
              Richiesta Inviata!
            </h1>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Grazie per aver prenotato. Riceverai una conferma via email 
              appena avremo verificato la disponibilità.
            </p>
            <div className="neu-card-sm p-4 max-w-sm mx-auto mb-8">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <AlertCircle size={16} className="text-primary" />
                <span>La prenotazione è in attesa di conferma</span>
              </div>
            </div>
            <NeuButton 
              variant="primary"
              onClick={() => {
                setIsSubmitted(false);
                setFormData({
                  nome: "",
                  cognome: "",
                  email: "",
                  telefono: "",
                  servizio: "",
                  data: "",
                  orario: "",
                  note: "",
                });
              }}
            >
              Nuova Prenotazione
            </NeuButton>
          </NeuCard>
        </div>
      </div>
    );
  }

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
              Compila il form sottostante per richiedere un appuntamento. 
              Ti contatteremo per confermare la disponibilità nelle aree di Cardito, Caserta e provincia.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2">
              <NeuCard variant="flat">
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
                      id="cognome"
                      name="cognome"
                      label="Cognome"
                      placeholder="Il tuo cognome"
                      value={formData.cognome}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
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
                    <NeuInput
                      id="telefono"
                      name="telefono"
                      type="tel"
                      label="Telefono"
                      placeholder="+39 333 123 4567"
                      value={formData.telefono}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Servizio Richiesto
                    </label>
                    <select
                      name="servizio"
                      value={formData.servizio}
                      onChange={handleChange}
                      required
                      className="neu-input w-full px-4 py-3 rounded-xl text-foreground bg-background border-none focus:outline-none"
                    >
                      <option value="">Seleziona un servizio</option>
                      {services.map((service) => (
                        <option key={service} value={service}>
                          {service}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <NeuInput
                      id="data"
                      name="data"
                      type="date"
                      label="Data Preferita"
                      value={formData.data}
                      onChange={handleChange}
                      min={new Date().toISOString().split('T')[0]}
                      required
                    />
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Orario Preferito
                      </label>
                      <select
                        name="orario"
                        value={formData.orario}
                        onChange={handleChange}
                        required
                        className="neu-input w-full px-4 py-3 rounded-xl text-foreground bg-background border-none focus:outline-none"
                      >
                        <option value="">Seleziona un orario</option>
                        {timeSlots.map((slot) => (
                          <option key={slot} value={slot}>
                            {slot}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <NeuTextarea
                    id="note"
                    name="note"
                    label="Note Aggiuntive (opzionale)"
                    placeholder="Descrivi brevemente il motivo della visita o eventuali informazioni utili..."
                    value={formData.note}
                    onChange={handleChange}
                  />

                  <NeuButton 
                    type="submit" 
                    variant="primary" 
                    size="lg" 
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Invio in corso..." : "Richiedi Appuntamento"}
                  </NeuButton>
                </form>
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
