import { NeuCard } from "@/components/ui/neu-card";
import { NeuButton } from "@/components/ui/neu-button";
import { Calendar, Clock, Users, CheckCircle2, AlertCircle, User } from "lucide-react";

const todayAppointments = [
  { id: 1, time: "09:00", patient: "Maria Rossi", service: "Trattamento Unghie", status: "confermato" },
  { id: 2, time: "10:30", patient: "Giuseppe Bianchi", service: "Piede Diabetico", status: "confermato" },
  { id: 3, time: "14:00", patient: "Anna Verdi", service: "Prima Visita", status: "in_attesa" },
  { id: 4, time: "16:00", patient: "Luigi Neri", service: "Ortesi Plantari", status: "confermato" },
];

const pendingRequests = [
  { id: 1, name: "Francesca Blu", date: "15 Gen", time: "11:00", service: "Cura Calli" },
  { id: 2, name: "Marco Gialli", date: "16 Gen", time: "15:30", service: "Prima Visita" },
];

const DashboardOggi = () => {
  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-foreground">Buongiorno, Clara!</h1>
          <p className="text-muted-foreground">Ecco la tua giornata di oggi</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">{new Date().toLocaleDateString('it-IT', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: Calendar, label: "Appuntamenti Oggi", value: "4", color: "text-primary" },
          { icon: AlertCircle, label: "In Attesa", value: "2", color: "text-warning" },
          { icon: Users, label: "Pazienti Totali", value: "127", color: "text-success" },
          { icon: CheckCircle2, label: "Completati", value: "0", color: "text-muted-foreground" },
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
            <div className="space-y-3">
              {todayAppointments.map((apt) => (
                <div key={apt.id} className="neu-card-sm flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <Clock size={14} className="text-primary mx-auto mb-1" />
                      <p className="text-sm font-semibold text-foreground">{apt.time}</p>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{apt.patient}</p>
                      <p className="text-sm text-muted-foreground">{apt.service}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    apt.status === "confermato" 
                      ? "bg-success/10 text-success" 
                      : "bg-warning/10 text-warning"
                  }`}>
                    {apt.status === "confermato" ? "Confermato" : "In Attesa"}
                  </span>
                </div>
              ))}
            </div>
          </NeuCard>
        </div>

        {/* Pending Requests */}
        <NeuCard>
          <h2 className="font-heading text-lg font-semibold text-foreground mb-4">Richieste in Attesa</h2>
          <div className="space-y-3">
            {pendingRequests.map((req) => (
              <div key={req.id} className="neu-card-sm">
                <div className="flex items-center gap-3 mb-3">
                  <div className="neu-circle p-2 bg-secondary">
                    <User size={14} className="text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground text-sm">{req.name}</p>
                    <p className="text-xs text-muted-foreground">{req.service}</p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mb-3">{req.date} alle {req.time}</p>
                <div className="flex gap-2">
                  <NeuButton size="sm" variant="primary" className="flex-1 text-xs">Conferma</NeuButton>
                  <NeuButton size="sm" variant="ghost" className="flex-1 text-xs">Rifiuta</NeuButton>
                </div>
              </div>
            ))}
          </div>
        </NeuCard>
      </div>
    </div>
  );
};

export default DashboardOggi;
