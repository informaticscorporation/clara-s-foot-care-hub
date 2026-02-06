import { useState, useRef } from "react";
import { NeuCard } from "@/components/ui/neu-card";
import { NeuButton } from "@/components/ui/neu-button";
import { Search, Plus, User, Phone, Mail, Edit, Trash2, Loader2 } from "lucide-react";
import { useClienti, useDeleteCliente } from "@/hooks/useClienti";
import ClienteModal from "@/components/modals/ClienteModal";
import { Cliente } from "@/types/database";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const DashboardClienti = () => {
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCliente, setEditingCliente] = useState<Cliente | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [clienteToDelete, setClienteToDelete] = useState<Cliente | null>(null);
  
  const { data: clienti, isLoading, error } = useClienti();
  const deleteCliente = useDeleteCliente();

  const filteredClienti = clienti?.filter(c => 
    `${c.nome} ${c.cognome}`.toLowerCase().includes(search.toLowerCase())
  ) || [];

  const handleEdit = (cliente: Cliente) => {
    setEditingCliente(cliente);
    setModalOpen(true);
  };

  const handleDelete = (cliente: Cliente) => {
    setClienteToDelete(cliente);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (clienteToDelete) {
      await deleteCliente.mutateAsync(clienteToDelete.id);
      setDeleteDialogOpen(false);
      setClienteToDelete(null);
    }
  };

  const handleModalClose = (open: boolean) => {
    setModalOpen(open);
    if (!open) {
      setEditingCliente(null);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="animate-spin text-primary" size={48} />
      </div>
    );
  }

  if (error) {
    return (
      <NeuCard className="text-center py-8">
        <p className="text-destructive">Errore nel caricamento dei clienti</p>
        <p className="text-sm text-muted-foreground mt-2">{error.message}</p>
      </NeuCard>
    );
  }

  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="font-heading text-2xl font-bold text-foreground">Archivio Clienti</h1>
        <NeuButton variant="primary" onClick={() => setModalOpen(true)}>
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

        {filteredClienti.length === 0 ? (
          <div className="text-center py-8">
            <User size={48} className="text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">
              {search ? "Nessun cliente trovato" : "Nessun cliente registrato"}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredClienti.map((cliente) => (
              <div key={cliente.id} className="neu-card-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="neu-circle p-3 bg-secondary">
                    <User size={20} className="text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{cliente.nome} {cliente.cognome}</p>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mt-1">
                      <span className="flex items-center gap-1">
                        <Mail size={12} /> {cliente.email}
                      </span>
                      <span className="flex items-center gap-1">
                        <Phone size={12} /> {cliente.telefono}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <NeuButton size="icon" variant="ghost" onClick={() => handleEdit(cliente)}>
                    <Edit size={16} />
                  </NeuButton>
                  <NeuButton size="icon" variant="ghost" className="text-destructive" onClick={() => handleDelete(cliente)}>
                    <Trash2 size={16} />
                  </NeuButton>
                </div>
              </div>
            ))}
          </div>
        )}
      </NeuCard>

      <ClienteModal 
        open={modalOpen} 
        onOpenChange={handleModalClose}
        cliente={editingCliente}
      />

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Conferma eliminazione</AlertDialogTitle>
            <AlertDialogDescription>
              Sei sicuro di voler eliminare {clienteToDelete?.nome} {clienteToDelete?.cognome}? 
              Questa azione non può essere annullata.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annulla</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground">
              Elimina
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default DashboardClienti;
