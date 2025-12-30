import { useState } from "react";
import { NeuCard } from "@/components/ui/neu-card";
import { NeuButton } from "@/components/ui/neu-button";
import { Search, FolderOpen, User, FileText, Paperclip, Calendar, ChevronRight } from "lucide-react";

const mockRecords = [
  { id: 1, patient: "Maria Rossi", lastUpdate: "10 Gen 2025", visits: 8, hasAttachments: true },
  { id: 2, patient: "Giuseppe Bianchi", lastUpdate: "8 Gen 2025", visits: 12, hasAttachments: true },
  { id: 3, patient: "Anna Verdi", lastUpdate: "5 Gen 2025", visits: 3, hasAttachments: false },
  { id: 4, patient: "Luigi Neri", lastUpdate: "3 Gen 2025", visits: 5, hasAttachments: true },
];

const DashboardCartelle = () => {
  const [search, setSearch] = useState("");
  const records = mockRecords.filter(r => r.patient.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="font-heading text-2xl font-bold text-foreground">Cartelle Cliniche</h1>
      </div>

      <NeuCard>
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Cerca paziente..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="neu-input w-full pl-12 pr-4 py-3 rounded-xl"
            />
          </div>
        </div>

        <div className="space-y-3">
          {records.map((record) => (
            <div key={record.id} className="neu-card-sm flex items-center justify-between cursor-pointer hover:scale-[1.01] transition-transform">
              <div className="flex items-center gap-4">
                <div className="neu-circle p-3 bg-secondary">
                  <FolderOpen size={20} className="text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">{record.patient}</p>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mt-1">
                    <span className="flex items-center gap-1">
                      <Calendar size={12} /> Ultimo aggiornamento: {record.lastUpdate}
                    </span>
                    <span className="flex items-center gap-1">
                      <FileText size={12} /> {record.visits} visite
                    </span>
                    {record.hasAttachments && (
                      <span className="flex items-center gap-1">
                        <Paperclip size={12} /> Allegati
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <ChevronRight size={20} className="text-muted-foreground" />
            </div>
          ))}
        </div>
      </NeuCard>

      <NeuCard variant="pressed" className="text-center py-8">
        <FolderOpen size={48} className="text-primary mx-auto mb-4" />
        <h3 className="font-heading text-lg font-semibold text-foreground mb-2">Seleziona una Cartella</h3>
        <p className="text-muted-foreground text-sm">
          Clicca su una cartella per visualizzare anamnesi, trattamenti, prescrizioni e allegati
        </p>
      </NeuCard>
    </div>
  );
};

export default DashboardCartelle;
