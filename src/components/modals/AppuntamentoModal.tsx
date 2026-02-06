import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { NeuButton } from "@/components/ui/neu-button";
import { useCreateAppuntamento, useUpdateAppuntamento } from "@/hooks/useAppuntamenti";
import { useClienti } from "@/hooks/useClienti";
import { Appuntamento, AppuntamentoInsert } from "@/types/database";

interface AppuntamentoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  appuntamento?: Appuntamento | null;
}

const SERVIZI = [
  "Prima Visita",
  "Trattamento Unghie",
  "Piede Diabetico",
  "Ortesi",
  "Cura Calli",
  "Plantari",
  "Controllo",
];

const AppuntamentoModal = ({ open, onOpenChange, appuntamento }: AppuntamentoModalProps) => {
  const isEdit = !!appuntamento;
  const createAppuntamento = useCreateAppuntamento();
  const updateAppuntamento = useUpdateAppuntamento();
  const { data: clienti } = useClienti();

  const [formData, setFormData] = useState<AppuntamentoInsert>({
    id_cliente: appuntamento?.id_cliente || "",
    servizio: appuntamento?.servizio || "",
    data_appuntamento: appuntamento?.data_appuntamento || "",
    ora_appuntamento: appuntamento?.ora_appuntamento || "",
    note: appuntamento?.note || "",
    stato: appuntamento?.stato || "in_attesa",
  });

  useEffect(() => {
    if (appuntamento) {
      setFormData({
        id_cliente: appuntamento.id_cliente,
        servizio: appuntamento.servizio,
        data_appuntamento: appuntamento.data_appuntamento,
        ora_appuntamento: appuntamento.ora_appuntamento,
        note: appuntamento.note || "",
        stato: appuntamento.stato,
      });
    } else {
      setFormData({
        id_cliente: "",
        servizio: "",
        data_appuntamento: "",
        ora_appuntamento: "",
        note: "",
        stato: "in_attesa",
      });
    }
  }, [appuntamento, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isEdit && appuntamento) {
      await updateAppuntamento.mutateAsync({ id: appuntamento.id, ...formData });
    } else {
      await createAppuntamento.mutateAsync(formData);
    }
    
    onOpenChange(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="neu-card sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-heading text-xl">
            {isEdit ? "Modifica Appuntamento" : "Nuovo Appuntamento"}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Cliente</label>
            <select
              name="id_cliente"
              value={formData.id_cliente}
              onChange={handleChange}
              required
              className="neu-input w-full px-4 py-3 rounded-xl"
            >
              <option value="">Seleziona cliente...</option>
              {clienti?.map(cliente => (
                <option key={cliente.id} value={cliente.id}>
                  {cliente.cognome} {cliente.nome}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Servizio</label>
            <select
              name="servizio"
              value={formData.servizio}
              onChange={handleChange}
              required
              className="neu-input w-full px-4 py-3 rounded-xl"
            >
              <option value="">Seleziona servizio...</option>
              {SERVIZI.map(servizio => (
                <option key={servizio} value={servizio}>
                  {servizio}
                </option>
              ))}
            </select>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Data</label>
              <input
                type="date"
                name="data_appuntamento"
                value={formData.data_appuntamento}
                onChange={handleChange}
                required
                className="neu-input w-full px-4 py-3 rounded-xl"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Ora</label>
              <input
                type="time"
                name="ora_appuntamento"
                value={formData.ora_appuntamento}
                onChange={handleChange}
                required
                className="neu-input w-full px-4 py-3 rounded-xl"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Stato</label>
            <select
              name="stato"
              value={formData.stato}
              onChange={handleChange}
              required
              className="neu-input w-full px-4 py-3 rounded-xl"
            >
              <option value="in_attesa">In Attesa</option>
              <option value="confermato">Confermato</option>
              <option value="completato">Completato</option>
              <option value="annullato">Annullato</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Note</label>
            <textarea
              name="note"
              value={formData.note}
              onChange={handleChange}
              rows={3}
              className="neu-input w-full px-4 py-3 rounded-xl resize-none"
              placeholder="Note aggiuntive..."
            />
          </div>
          
          <DialogFooter className="gap-2 pt-4">
            <NeuButton type="button" variant="ghost" onClick={() => onOpenChange(false)}>
              Annulla
            </NeuButton>
            <NeuButton 
              type="submit" 
              variant="primary"
              disabled={createAppuntamento.isPending || updateAppuntamento.isPending}
            >
              {createAppuntamento.isPending || updateAppuntamento.isPending ? "Salvataggio..." : isEdit ? "Salva" : "Crea"}
            </NeuButton>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AppuntamentoModal;
