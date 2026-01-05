import { NeuCard } from "@/components/ui/neu-card";
import { NeuButton } from "@/components/ui/neu-button";
import { Plus, ChevronLeft, ChevronRight, Clock, User, Edit, Trash2, CheckCircle2, XCircle } from "lucide-react";

const mockAppointments = [
  { id: 1, date: "2025-01-15", time: "09:00", patient: "Maria Rossi", service: "Trattamento Unghie", status: "confermato" },
  { id: 2, date: "2025-01-15", time: "10:30", patient: "Giuseppe Bianchi", service: "Piede Diabetico", status: "confermato" },
  { id: 3, date: "2025-01-15", time: "14:00", patient: "Anna Verdi", service: "Prima Visita", status: "in_attesa" },
  { id: 4, date: "2025-01-16", time: "09:30", patient: "Luigi Neri", service: "Ortesi", status: "confermato" },
  { id: 5, date: "2025-01-16", time: "11:00", patient: "Francesca Blu", service: "Cura Calli", status: "in_attesa" },
];

const DashboardAppuntamenti = () => {
  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="font-heading text-2xl font-bold text-foreground">Appuntamenti</h1>
        <NeuButton variant="primary">
          <Plus size={18} className="mr-2" />
          Nuovo Appuntamento
        </NeuButton>
      </div>

      {/* Calendar Navigation */}
      <NeuCard size="sm">
        <div className="flex items-center justify-between">
          <NeuButton variant="ghost" size="icon"><ChevronLeft size={20} /></NeuButton>
          <h2 className="font-heading text-lg font-semibold text-foreground">Gennaio 2025</h2>
          <NeuButton variant="ghost" size="icon"><ChevronRight size={20} /></NeuButton>
        </div>
      </NeuCard>

      {/* Appointments List */}
      <NeuCard>
        <div className="space-y-4">
          {["15 Gennaio", "16 Gennaio"].map((day) => (
            <div key={day}>
              <h3 className="font-heading font-semibold text-foreground mb-3">{day}</h3>
              <div className="space-y-2">
                {mockAppointments
                  .filter(a => day.includes(a.date.split("-")[2]))
                  .map((apt) => (
                    <div key={apt.id} className="neu-card-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-4">
                        <div className="text-center min-w-[50px]">
                          <Clock size={14} className="text-primary mx-auto mb-1" />
                          <p className="text-sm font-semibold text-foreground">{apt.time}</p>
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{apt.patient}</p>
                          <p className="text-sm text-muted-foreground">{apt.service}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          apt.status === "confermato" ? "bg-success/10 text-success" : "bg-warning/10 text-warning"
                        }`}>
                          {apt.status === "confermato" ? "Confermato" : "In Attesa"}
                        </span>
                        {apt.status === "in_attesa" && (
                          <>
                            <NeuButton size="icon" variant="ghost" className="text-success"><CheckCircle2 size={16} /></NeuButton>
                            <NeuButton size="icon" variant="ghost" className="text-destructive"><XCircle size={16} /></NeuButton>
                          </>
                        )}
                        <NeuButton size="icon" variant="ghost"><Edit size={16} /></NeuButton>
                        <NeuButton size="icon" variant="ghost" className="text-destructive"><Trash2 size={16} /></NeuButton>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </NeuCard>
    </div>
  );
};

export default DashboardAppuntamenti;
