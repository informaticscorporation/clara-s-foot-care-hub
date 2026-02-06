import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { CartellaFile } from '@/types/database';
import { toast } from 'sonner';

export const useCartellaFiles = (clienteId: string) => {
  return useQuery({
    queryKey: ['cartella', clienteId],
    queryFn: async () => {
      const { data, error } = await supabase
        .storage
        .from('CartelleCliniche')
        .list(clienteId, {
          sortBy: { column: 'created_at', order: 'desc' },
        });
      
      if (error) throw error;
      return data as CartellaFile[];
    },
    enabled: !!clienteId,
  });
};

export const useUploadFile = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ clienteId, file }: { clienteId: string; file: File }) => {
      const fileName = `${Date.now()}_${file.name}`;
      const filePath = `${clienteId}/${fileName}`;
      
      const { data, error } = await supabase
        .storage
        .from('CartelleCliniche')
        .upload(filePath, file);
      
      if (error) throw error;
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['cartella', variables.clienteId] });
      toast.success('File caricato con successo');
    },
    onError: (error) => {
      toast.error('Errore nel caricamento del file: ' + error.message);
    },
  });
};

export const useDeleteFile = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ clienteId, fileName }: { clienteId: string; fileName: string }) => {
      const filePath = `${clienteId}/${fileName}`;
      
      const { error } = await supabase
        .storage
        .from('CartelleCliniche')
        .remove([filePath]);
      
      if (error) throw error;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['cartella', variables.clienteId] });
      toast.success('File eliminato con successo');
    },
    onError: (error) => {
      toast.error('Errore nell\'eliminazione del file: ' + error.message);
    },
  });
};

export const getFileUrl = (clienteId: string, fileName: string) => {
  const { data } = supabase
    .storage
    .from('CartelleCliniche')
    .getPublicUrl(`${clienteId}/${fileName}`);
  
  return data.publicUrl;
};

export const downloadFile = async (clienteId: string, fileName: string) => {
  const { data, error } = await supabase
    .storage
    .from('CartelleCliniche')
    .download(`${clienteId}/${fileName}`);
  
  if (error) {
    toast.error('Errore nel download del file: ' + error.message);
    return;
  }
  
  // Create download link
  const url = URL.createObjectURL(data);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
