import { useState } from "react";
import { NeuCard } from "@/components/ui/neu-card";
import { NeuButton } from "@/components/ui/neu-button";
import { Plus, ChevronLeft, ChevronRight, Clock, Edit, Trash2, CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { useAppuntamenti, useDeleteAppuntamento, useUpdateAppuntamento } from "@/hooks/useAppuntamenti";
import AppuntamentoModal from "@/components/modals/AppuntamentoModal";
import { Appuntamento } from "@/types/database";
import { format, parseISO, startOfMonth, endOfMonth, addMonths, subMonths, eachDayOfInterval, isSameDay } from "date-fns";
import { it } from "date-fns/locale";
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

const DashboardAppuntamenti = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [modalOpen, setModalOpen] = useState(false);
  const [editingAppuntamento, setEditingAppuntamento] = useState<Appuntamento | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [appuntamentoToDelete, setAppuntamentoToDelete] = useState<Appuntamento | null>(null);
  
  const { data: appuntamenti, isLoading, error } = useAppuntamenti();
  const deleteAppuntamento = useDeleteAppuntamento();
  const updateAppuntamento = useUpdateAppuntamento();

  // Get days with appointments in current month
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  
  const appointmentsByDate = appuntamenti?.reduce((acc, apt) => {
    const date = apt.data_appuntamento;
    if (!acc[date]) acc[date] = [];
    acc[date].push(apt);
    return acc;
  }, {} as Record<string, Appuntamento[]>) || {};

  const daysWithAppointments = Object.keys(appointmentsByDate)
    .filter(date => {
      const d = parseISO(date);
      return d >= monthStart && d <= monthEnd;
    })
    .sort();

  const handleEdit = (appuntamento: Appuntamento) => {
    setEditingAppuntamento(appuntamento);
    setModalOpen(true);
  };

  const handleDelete = (appuntamento: Appuntamento) => {
    setAppuntamentoToDelete(appuntamento);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (appuntamentoToDelete) {
      await deleteAppuntamento.mutateAsync(appuntamentoToDelete.id);
      setDeleteDialogOpen(false);
      setAppuntamentoToDelete(null);
    }
  };

  const handleConfirm = async (appuntamento: Appuntamento) => {
    await updateAppuntamento.mutateAsync({ id: appuntamento.id, stato: "confermato" });
  };

  const handleCancel = async (appuntamento: Appuntamento) => {
    await updateAppuntamento.mutateAsync({ id: appuntamento.id, stato: "annullato" });
  };

  const handleModalClose = (open: boolean) => {
    setModalOpen(open);
    if (!open) {
      setEditingAppuntamento(null);
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
        <p className="text-destructive">Errore nel caricamento degli appuntamenti</p>
        <p className="text-sm text-muted-foreground mt-2">{error.message}</p>
      </NeuCard>
    );
  }

  const getStatusBadge = (stato: string) => {
    const styles: Record<string, string> = {
      confermato: "bg-success/10 text-success",
      in_attesa: "bg-warning/10 text-warning",
      completato: "bg-primary/10 text-primary",
      annullato: "bg-destructive/10 text-destructive",
    };
    const labels: Record<string, string> = {
      confermato: "Confermato",
      in_attesa: "In Attesa",
      completato: "Completato",
      annullato: "Annullato",
    };
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${styles[stato] || styles.in_attesa}`}>
        {labels[stato] || stato}
      </span>
    );
  };

  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="font-heading text-2xl font-bold text-foreground">Appuntamenti</h1>
        <NeuButton variant="primary" onClick={() => setModalOpen(true)}>
          <Plus size={18} className="mr-2" />
          Nuovo Appuntamento
        </NeuButton>
      </div>

      {/* Calendar Navigation */}
      <NeuCard size="sm">
        <div className="flex items-center justify-between">
          <NeuButton variant="ghost" size="icon" onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}>
            <ChevronLeft size={20} />
          </NeuButton>
          <h2 className="font-heading text-lg font-semibold text-foreground capitalize">
            {format(currentMonth, "MMMM yyyy", { locale: it })}
          </h2>
          <NeuButton variant="ghost" size="icon" onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}>
            <ChevronRight size={20} />
          </NeuButton>
        </div>
      </NeuCard>

      {/* Appointments List */}
      <NeuCard>
        {daysWithAppointments.length === 0 ? (
          <div className="text-center py-8">
            <Clock size={48} className="text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">Nessun appuntamento in questo mese</p>
          </div>
        ) : (
          <div className="space-y-6">
            {daysWithAppointments.map((dateStr) => (
              <div key={dateStr}>
                <h3 className="font-heading font-semibold text-foreground mb-3 capitalize">
                  {format(parseISO(dateStr), "EEEE d MMMM", { locale: it })}
                </h3>
                <div className="space-y-2">
                  {appointmentsByDate[dateStr]
                    .sort((a, b) => a.ora_appuntamento.localeCompare(b.ora_appuntamento))
                    .map((apt) => (
                      <div key={apt.id} className="neu-card-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex items-center gap-4">
                          <div className="text-center min-w-[50px]">
                            <Clock size={14} className="text-primary mx-auto mb-1" />
                            <p className="text-sm font-semibold text-foreground">
                              {apt.ora_appuntamento.slice(0, 5)}
                            </p>
                          </div>
                          <div>
                            <p className="font-medium text-foreground">
                              {apt.clienti?.cognome} {apt.clienti?.nome}
                            </p>
                            <p className="text-sm text-muted-foreground">{apt.servizio}</p>
                            {apt.note && (
                              <p className="text-xs text-muted-foreground mt-1">Note: {apt.note}</p>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 flex-wrap">
                          {getStatusBadge(apt.stato)}
                          {apt.stato === "in_attesa" && (
                            <>
                              <NeuButton size="icon" variant="ghost" className="text-success" onClick={() => handleConfirm(apt)}>
                                <CheckCircle2 size={16} />
                              </NeuButton>
                              <NeuButton size="icon" variant="ghost" className="text-destructive" onClick={() => handleCancel(apt)}>
                                <XCircle size={16} />
                              </NeuButton>
                            </>
                          )}
                          <NeuButton size="icon" variant="ghost" onClick={() => handleEdit(apt)}>
                            <Edit size={16} />
                          </NeuButton>
                          <NeuButton size="icon" variant="ghost" className="text-destructive" onClick={() => handleDelete(apt)}>
                            <Trash2 size={16} />
                          </NeuButton>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </NeuCard>

      <AppuntamentoModal 
        open={modalOpen} 
        onOpenChange={handleModalClose}
        appuntamento={editingAppuntamento}
      />

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Conferma eliminazione</AlertDialogTitle>
            <AlertDialogDescription>
              Sei sicuro di voler eliminare questo appuntamento? Questa azione non può essere annullata.
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

export default DashboardAppuntamenti;
