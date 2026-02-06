import { NeuCard } from "@/components/ui/neu-card";
import { NeuButton } from "@/components/ui/neu-button";
import { Calendar, Clock, Users, CheckCircle2, AlertCircle, User, Loader2 } from "lucide-react";
import { useAppuntamentiOggi, useUpdateAppuntamento } from "@/hooks/useAppuntamenti";
import { useClienti } from "@/hooks/useClienti";

const DashboardOggi = () => {
  const { data: appuntamentiOggi, isLoading: loadingAppuntamenti } = useAppuntamentiOggi();
  const { data: clienti } = useClienti();
  const updateAppuntamento = useUpdateAppuntamento();

  const pendingAppointments = appuntamentiOggi?.filter(a => a.stato === "in_attesa") || [];
  const confirmedAppointments = appuntamentiOggi?.filter(a => a.stato === "confermato") || [];
  const completedAppointments = appuntamentiOggi?.filter(a => a.stato === "completato") || [];

  const handleConfirm = async (id: string) => {
    try {
      await updateAppuntamento.mutateAsync({ id, stato: "confermato" });
    } catch (error) {
      console.error("Errore nella conferma:", error);
    }
  };

  const handleReject = async (id: string) => {
    try {
      await updateAppuntamento.mutateAsync({ id, stato: "annullato" });
    } catch (error) {
      console.error("Errore nel rifiuto:", error);
    }
  };

  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-foreground">Buongiorno!</h1>
          <p className="text-muted-foreground">Ecco la tua giornata di oggi</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground capitalize">
            {new Date().toLocaleDateString('it-IT', { weekday: 'long', day: 'numeric', month: 'long' })}
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: Calendar, label: "Appuntamenti Oggi", value: appuntamentiOggi?.length || 0, color: "text-primary" },
          { icon: AlertCircle, label: "In Attesa", value: pendingAppointments.length, color: "text-warning" },
          { icon: Users, label: "Pazienti Totali", value: clienti?.length || 0, color: "text-success" },
          { icon: CheckCircle2, label: "Completati", value: completedAppointments.length, color: "text-muted-foreground" },
        ].map((stat) => (
          <NeuCard key={stat.label} size="sm">
            <div className="flex items-center gap-3">
              <div className="neu-circle p-2 bg-secondary">
                <stat.icon size={18} className={stat.color} />
              </div>
              <div>
                <p className="font-heading text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            </div>
          </NeuCard>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Today's Schedule */}
        <div className="lg:col-span-2">
          <NeuCard>
            <h2 className="font-heading text-lg font-semibold text-foreground mb-4">Appuntamenti di Oggi</h2>
            
            {loadingAppuntamenti ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="animate-spin text-primary" size={32} />
              </div>
            ) : appuntamentiOggi && appuntamentiOggi.length > 0 ? (
              <div className="space-y-3">
                {appuntamentiOggi
                  .sort((a, b) => a.ora_appuntamento.localeCompare(b.ora_appuntamento))
                  .map((apt) => (
                    <div key={apt.id} className="neu-card-sm flex items-center justify-between">
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
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        apt.stato === "confermato" 
                          ? "bg-success/10 text-success" 
                          : apt.stato === "completato"
                          ? "bg-primary/10 text-primary"
                          : apt.stato === "annullato"
                          ? "bg-destructive/10 text-destructive"
                          : "bg-warning/10 text-warning"
                      }`}>
                        {apt.stato === "confermato" ? "Confermato" : 
                         apt.stato === "completato" ? "Completato" :
                         apt.stato === "annullato" ? "Annullato" : "In Attesa"}
                      </span>
                    </div>
                  ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Calendar size={48} className="text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Nessun appuntamento per oggi</p>
              </div>
            )}
          </NeuCard>
        </div>

        {/* Pending Requests */}
        <NeuCard>
          <h2 className="font-heading text-lg font-semibold text-foreground mb-4">Richieste in Attesa</h2>
          
          {pendingAppointments.length > 0 ? (
            <div className="space-y-3">
              {pendingAppointments.map((apt) => (
                <div key={apt.id} className="neu-card-sm">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="neu-circle p-2 bg-secondary">
                      <User size={14} className="text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground text-sm">
                        {apt.clienti?.cognome} {apt.clienti?.nome}
                      </p>
                      <p className="text-xs text-muted-foreground">{apt.servizio}</p>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mb-3">
                    Ore {apt.ora_appuntamento.slice(0, 5)}
                  </p>
                  <div className="flex gap-2">
                    <NeuButton 
                      size="sm" 
                      variant="primary" 
                      className="flex-1 text-xs"
                      onClick={() => handleConfirm(apt.id)}
                      disabled={updateAppuntamento.isPending}
                    >
                      {updateAppuntamento.isPending ? "..." : "Conferma"}
                    </NeuButton>
                    <NeuButton 
                      size="sm" 
                      variant="ghost" 
                      className="flex-1 text-xs"
                      onClick={() => handleReject(apt.id)}
                      disabled={updateAppuntamento.isPending}
                    >
                      {updateAppuntamento.isPending ? "..." : "Rifiuta"}
                    </NeuButton>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <CheckCircle2 size={32} className="text-success mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Nessuna richiesta in attesa</p>
            </div>
          )}
        </NeuCard>
      </div>
    </div>
  );
};

export default DashboardOggi;
