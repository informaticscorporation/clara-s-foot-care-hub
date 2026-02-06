import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { NeuButton } from "@/components/ui/neu-button";

interface PrescrizioneModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (titolo: string, contenuto: string, giorni: number, medico: string) => void;
}

const PrescrizioneModal = ({ open, onOpenChange, onSave }: PrescrizioneModalProps) => {
  const [titolo, setTitolo] = useState("");
  const [contenuto, setContenuto] = useState("");
  const [giorni, setGiorni] = useState(7);
  const [medico, setMedico] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!medico.trim()) {
      alert("Inserisci il nome/cognome del medico");
      return;
    }
    onSave(titolo, contenuto, giorni, medico);
    setTitolo("");
    setContenuto("");
    setGiorni(7);
    setMedico("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="neu-card sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-heading text-xl">
            Nuova Prescrizione
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Titolo</label>
            <input
              type="text"
              value={titolo}
              onChange={(e) => setTitolo(e.target.value)}
              required
              className="neu-input w-full px-4 py-3 rounded-xl"
              placeholder="Es. Prescrizione plantari"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Validità (giorni)</label>
            <input
              type="number"
              value={giorni}
              onChange={(e) => setGiorni(Math.max(1, parseInt(e.target.value) || 1))}
              min={1}
              max={365}
              className="neu-input w-full px-4 py-3 rounded-xl"
              placeholder="Numero di giorni"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Medico</label>
            <input
              type="text"
              value={medico}
              onChange={(e) => setMedico(e.target.value)}
              required
              className="neu-input w-full px-4 py-3 rounded-xl"
              placeholder="Nome e Cognome del medico"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Contenuto</label>
            <textarea
              value={contenuto}
              onChange={(e) => setContenuto(e.target.value)}
              required
              rows={8}
              className="neu-input w-full px-4 py-3 rounded-xl resize-none"
              placeholder="Scrivi qui la prescrizione..."
            />
          </div>
          
          <DialogFooter className="gap-2 pt-4">
            <NeuButton type="button" variant="ghost" onClick={() => onOpenChange(false)}>
              Annulla
            </NeuButton>
            <NeuButton type="submit" variant="primary">
              Salva e Genera PDF
            </NeuButton>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PrescrizioneModal;
