import { useState, useRef } from "react";
import { jsPDF } from "jspdf";
import { NeuCard } from "@/components/ui/neu-card";
import { NeuButton } from "@/components/ui/neu-button";
import { Search, FolderOpen, FileText, Upload, Download, Trash2, ChevronRight, Loader2, FilePlus, FileCheck } from "lucide-react";
import { useClienti } from "@/hooks/useClienti";
import { useCartellaFiles, useUploadFile, useDeleteFile, downloadFile } from "@/hooks/useCartelleCliniche";
import { Cliente } from "@/types/database";
import PrescrizioneModal from "@/components/modals/PrescrizioneModal";
import { toast } from "sonner";
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

const DashboardCartelle = () => {
  const [search, setSearch] = useState("");
  const [selectedCliente, setSelectedCliente] = useState<Cliente | null>(null);
  const [prescrizioneModalOpen, setPrescrizioneModalOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [fileToDelete, setFileToDelete] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const { data: clienti, isLoading: loadingClienti } = useClienti();
  const { data: files, isLoading: loadingFiles } = useCartellaFiles(selectedCliente?.id || "");
  const uploadFile = useUploadFile();
  const deleteFileMutation = useDeleteFile();

  const filteredClienti = clienti?.filter(c => 
    `${c.nome} ${c.cognome}`.toLowerCase().includes(search.toLowerCase())
  ) || [];

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !selectedCliente) return;
    
    await uploadFile.mutateAsync({ clienteId: selectedCliente.id, file });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleDeleteFile = (fileName: string) => {
    setFileToDelete(fileName);
    setDeleteDialogOpen(true);
  };

  const confirmDeleteFile = async () => {
    if (fileToDelete && selectedCliente) {
      await deleteFileMutation.mutateAsync({ clienteId: selectedCliente.id, fileName: fileToDelete });
      setDeleteDialogOpen(false);
      setFileToDelete(null);
    }
  };

  const handleDownloadFile = (fileName: string) => {
    if (selectedCliente) {
      downloadFile(selectedCliente.id, fileName);
    }
  };

  const handleSavePrescrizione = async (titolo: string, contenuto: string, giorni: number, medico: string) => {
    if (!selectedCliente) return;
    
    try {
      // Calcola data di validità
      const dataCreazione = new Date();
      const dataScadenza = new Date(dataCreazione);
      dataScadenza.setDate(dataScadenza.getDate() + giorni);
      
      // Crea PDF
      const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4"
      });
      
      // Stili e colori
      const primaryColor = [99, 102, 241]; // indigo
      const textColor = [50, 50, 50];
      const lightGray = [200, 200, 200];
      
      // Intestazione
      doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.rect(0, 0, 210, 35, "F");
      
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(24);
      doc.setFont("helvetica", "bold");
      doc.text("PRESCRIZIONE MEDICA", 20, 20);
      
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.text("Studio di Podologia Clara", 20, 28);
      
      // Contenuto principale
      let yPosition = 50;
      
      doc.setTextColor(...textColor);
      doc.setFontSize(11);
      doc.setFont("helvetica", "bold");
      doc.text("PAZIENTE", 20, yPosition);
      yPosition += 8;
      
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.text(`${selectedCliente.cognome} ${selectedCliente.nome}`, 20, yPosition);
      doc.text(`Email: ${selectedCliente.email}`, 20, yPosition + 6);
      doc.text(`Telefono: ${selectedCliente.telefono}`, 20, yPosition + 12);
      
      yPosition += 25;
      
      // Data
      doc.setFont("helvetica", "bold");
      doc.text("DATA E VALIDITÀ", 20, yPosition);
      yPosition += 8;
      
      doc.setFont("helvetica", "normal");
      doc.text(`Emessa: ${dataCreazione.toLocaleDateString('it-IT')}`, 20, yPosition);
      doc.text(`Valida fino a: ${dataScadenza.toLocaleDateString('it-IT')} (${giorni} giorni)`, 20, yPosition + 6);
      
      yPosition += 20;
      
      // Titolo prescrizione
      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);
      doc.text(titolo, 20, yPosition);
      yPosition += 10;
      
      // Contenuto prescrizione
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      const contenutoSplitato = doc.splitTextToSize(contenuto, 170);
      doc.text(contenutoSplitato, 20, yPosition);
      
      yPosition += (contenutoSplitato.length * 5) + 15;
      
      // Firma con nome medico
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.text("Firma del Medico: _________________________", 20, yPosition + 30);
      doc.text(medico, 20, yPosition + 38);
      
      // Footer
      doc.setFontSize(8);
      doc.setTextColor(lightGray[0], lightGray[1], lightGray[2]);
      doc.text(
        `Generato il ${new Date().toLocaleString('it-IT')}`,
        20,
        doc.internal.pageSize.height - 10
      );
      
      // Salva il PDF come file
      const pdfBlob = doc.output("blob");
      const file = new File([pdfBlob], `prescrizione_${selectedCliente.cognome}_${Date.now()}.pdf`, { type: 'application/pdf' });
      
      await uploadFile.mutateAsync({ clienteId: selectedCliente.id, file });
      toast.success("Prescrizione salvata nella cartella clinica");
    } catch (error) {
      console.error("Errore nella generazione della prescrizione:", error);
      toast.error("Errore nella generazione del PDF");
    }
  };

  const formatFileSize = (bytes: number) => {
    if (!bytes) return "N/A";
    const kb = bytes / 1024;
    if (kb < 1024) return `${kb.toFixed(1)} KB`;
    return `${(kb / 1024).toFixed(1)} MB`;
  };

  if (loadingClienti) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="animate-spin text-primary" size={48} />
      </div>
    );
  }

  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="font-heading text-2xl font-bold text-foreground">Cartelle Cliniche</h1>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Client List */}
        <div className="lg:col-span-1">
          <NeuCard>
            <div className="flex items-center gap-4 mb-4">
              <div className="flex-1 relative">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Cerca paziente..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="neu-input w-full pl-12 pr-4 py-3 rounded-xl text-sm"
                />
              </div>
            </div>

            <div className="space-y-2 max-h-[400px] overflow-y-auto">
              {filteredClienti.map((cliente) => (
                <div 
                  key={cliente.id} 
                  onClick={() => setSelectedCliente(cliente)}
                  className={`neu-card-sm flex items-center justify-between cursor-pointer hover:scale-[1.01] transition-transform ${
                    selectedCliente?.id === cliente.id ? 'ring-2 ring-primary' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="neu-circle p-2 bg-secondary">
                      <FolderOpen size={16} className="text-primary" />
                    </div>
                    <p className="font-medium text-foreground text-sm">
                      {cliente.cognome} {cliente.nome}
                    </p>
                  </div>
                  <ChevronRight size={16} className="text-muted-foreground" />
                </div>
              ))}
            </div>
          </NeuCard>
        </div>

        {/* File List */}
        <div className="lg:col-span-2">
          {selectedCliente ? (
            <NeuCard>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="font-heading text-lg font-semibold text-foreground">
                    Cartella di {selectedCliente.nome} {selectedCliente.cognome}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {files?.length || 0} documenti
                  </p>
                </div>
                <div className="flex gap-2">
                  <NeuButton 
                    variant="secondary" 
                    onClick={() => setPrescrizioneModalOpen(true)}
                    className="text-sm"
                  >
                    <FilePlus size={16} className="mr-2" />
                    Prescrizione
                  </NeuButton>
                  <NeuButton 
                    variant="primary" 
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploadFile.isPending}
                    className="text-sm"
                  >
                    {uploadFile.isPending ? (
                      <Loader2 size={16} className="mr-2 animate-spin" />
                    ) : (
                      <Upload size={16} className="mr-2" />
                    )}
                    Carica File
                  </NeuButton>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </div>
              </div>

              {loadingFiles ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="animate-spin text-primary" size={32} />
                </div>
              ) : files && files.length > 0 ? (
                <div className="space-y-2">
                  {files.filter(f => f.name !== '.emptyFolderPlaceholder').map((file) => (
                    <div key={file.id} className="neu-card-sm flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="neu-circle p-2 bg-secondary">
                          <FileText size={16} className="text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground text-sm">{file.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {formatFileSize(file.metadata?.size as number)} • {new Date(file.created_at).toLocaleDateString('it-IT')}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <NeuButton size="icon" variant="ghost" onClick={() => handleDownloadFile(file.name)}>
                          <Download size={16} />
                        </NeuButton>
                        <NeuButton 
                          size="icon" 
                          variant="ghost" 
                          className="text-destructive"
                          onClick={() => handleDeleteFile(file.name)}
                        >
                          <Trash2 size={16} />
                        </NeuButton>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <FolderOpen size={48} className="text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Nessun documento in questa cartella</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Carica documenti o crea una prescrizione
                  </p>
                </div>
              )}
            </NeuCard>
          ) : (
            <NeuCard variant="pressed" className="text-center py-12">
              <FolderOpen size={48} className="text-primary mx-auto mb-4" />
              <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
                Seleziona un Paziente
              </h3>
              <p className="text-muted-foreground text-sm">
                Clicca su un paziente per visualizzare e gestire la sua cartella clinica
              </p>
            </NeuCard>
          )}
        </div>
      </div>

      <PrescrizioneModal
        open={prescrizioneModalOpen}
        onOpenChange={setPrescrizioneModalOpen}
        onSave={handleSavePrescrizione}
      />

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Conferma eliminazione</AlertDialogTitle>
            <AlertDialogDescription>
              Sei sicuro di voler eliminare questo file? Questa azione non può essere annullata.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annulla</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDeleteFile} className="bg-destructive text-destructive-foreground">
              Elimina
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default DashboardCartelle;
