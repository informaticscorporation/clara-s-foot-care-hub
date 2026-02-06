import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { NeuButton } from "@/components/ui/neu-button";
import { useCreateCliente, useUpdateCliente } from "@/hooks/useClienti";
import { Cliente, ClienteInsert } from "@/types/database";

interface ClienteModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  cliente?: Cliente | null;
}

const ClienteModal = ({ open, onOpenChange, cliente }: ClienteModalProps) => {
  const isEdit = !!cliente;
  const createCliente = useCreateCliente();
  const updateCliente = useUpdateCliente();

  const [formData, setFormData] = useState<ClienteInsert>({
    nome: cliente?.nome || "",
    cognome: cliente?.cognome || "",
    email: cliente?.email || "",
    telefono: cliente?.telefono || "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isEdit && cliente) {
      await updateCliente.mutateAsync({ id: cliente.id, ...formData });
    } else {
      await createCliente.mutateAsync(formData);
    }
    
    onOpenChange(false);
    setFormData({ nome: "", cognome: "", email: "", telefono: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="neu-card sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-heading text-xl">
            {isEdit ? "Modifica Cliente" : "Nuovo Cliente"}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Nome</label>
              <input
                type="text"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                required
                className="neu-input w-full px-4 py-3 rounded-xl"
                placeholder="Nome"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Cognome</label>
              <input
                type="text"
                name="cognome"
                value={formData.cognome}
                onChange={handleChange}
                required
                className="neu-input w-full px-4 py-3 rounded-xl"
                placeholder="Cognome"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="neu-input w-full px-4 py-3 rounded-xl"
              placeholder="email@esempio.it"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Telefono</label>
            <input
              type="tel"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              required
              className="neu-input w-full px-4 py-3 rounded-xl"
              placeholder="333 123 4567"
            />
          </div>
          
          <DialogFooter className="gap-2 pt-4">
            <NeuButton type="button" variant="ghost" onClick={() => onOpenChange(false)}>
              Annulla
            </NeuButton>
            <NeuButton 
              type="submit" 
              variant="primary"
              disabled={createCliente.isPending || updateCliente.isPending}
            >
              {createCliente.isPending || updateCliente.isPending ? "Salvataggio..." : isEdit ? "Salva" : "Crea"}
            </NeuButton>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ClienteModal;
