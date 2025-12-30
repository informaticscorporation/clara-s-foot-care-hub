import { useState } from "react";
import { NeuCard } from "@/components/ui/neu-card";
import { NeuButton } from "@/components/ui/neu-button";
import { NeuInput } from "@/components/ui/neu-input";
import { Search, Plus, User, Phone, Mail, Edit, Trash2 } from "lucide-react";

const mockPatients = [
  { id: 1, nome: "Maria", cognome: "Rossi", email: "maria.rossi@email.it", telefono: "333 111 2222", ultimaVisita: "10 Gen 2025" },
  { id: 2, nome: "Giuseppe", cognome: "Bianchi", email: "g.bianchi@email.it", telefono: "333 222 3333", ultimaVisita: "8 Gen 2025" },
  { id: 3, nome: "Anna", cognome: "Verdi", email: "anna.verdi@email.it", telefono: "333 333 4444", ultimaVisita: "5 Gen 2025" },
  { id: 4, nome: "Luigi", cognome: "Neri", email: "luigi.neri@email.it", telefono: "333 444 5555", ultimaVisita: "3 Gen 2025" },
];

const DashboardClienti = () => {
  const [search, setSearch] = useState("");
  const patients = mockPatients.filter(p => 
    `${p.nome} ${p.cognome}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="font-heading text-2xl font-bold text-foreground">Archivio Clienti</h1>
        <NeuButton variant="primary">
          <Plus size={18} className="mr-2" />
          Nuovo Cliente
        </NeuButton>
      </div>

      <NeuCard>
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Cerca cliente..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="neu-input w-full pl-12 pr-4 py-3 rounded-xl"
            />
          </div>
        </div>

        <div className="space-y-3">
          {patients.map((patient) => (
            <div key={patient.id} className="neu-card-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="neu-circle p-3 bg-secondary">
                  <User size={20} className="text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">{patient.nome} {patient.cognome}</p>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mt-1">
                    <span className="flex items-center gap-1">
                      <Mail size={12} /> {patient.email}
                    </span>
                    <span className="flex items-center gap-1">
                      <Phone size={12} /> {patient.telefono}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 sm:gap-4">
                <span className="text-xs text-muted-foreground">Ultima visita: {patient.ultimaVisita}</span>
                <div className="flex gap-2">
                  <NeuButton size="icon" variant="ghost"><Edit size={16} /></NeuButton>
                  <NeuButton size="icon" variant="ghost" className="text-destructive"><Trash2 size={16} /></NeuButton>
                </div>
              </div>
            </div>
          ))}
        </div>
      </NeuCard>
    </div>
  );
};

export default DashboardClienti;
