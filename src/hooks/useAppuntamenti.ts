import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Appuntamento, AppuntamentoInsert } from '@/types/database';
import { toast } from 'sonner';

export const useAppuntamenti = () => {
  return useQuery({
    queryKey: ['appuntamenti'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('appuntamenti')
        .select(`
          *,
          clienti (
            id,
            nome,
            cognome,
            email,
            telefono
          )
        `)
        .order('data_appuntamento', { ascending: true })
        .order('ora_appuntamento', { ascending: true });
      
      if (error) throw error;
      return data as Appuntamento[];
    },
  });
};

export const useAppuntamentiOggi = () => {
  const today = new Date().toISOString().split('T')[0];
  
  return useQuery({
    queryKey: ['appuntamenti', 'oggi'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('appuntamenti')
        .select(`
          *,
          clienti (
            id,
            nome,
            cognome,
            email,
            telefono
          )
        `)
        .eq('data_appuntamento', today)
        .order('ora_appuntamento', { ascending: true });
      
      if (error) throw error;
      return data as Appuntamento[];
    },
  });
};

export const useCreateAppuntamento = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (appuntamento: AppuntamentoInsert) => {
      const { data, error } = await supabase
        .from('appuntamenti')
        .insert(appuntamento)
        .select()
        .single();
      
      if (error) throw error;
      return data as Appuntamento;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appuntamenti'] });
      toast.success('Appuntamento creato con successo');
    },
    onError: (error) => {
      toast.error('Errore nella creazione dell\'appuntamento: ' + error.message);
    },
  });
};

export const useUpdateAppuntamento = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, ...appuntamento }: Partial<Appuntamento> & { id: string }) => {
      const { data, error } = await supabase
        .from('appuntamenti')
        .update(appuntamento)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data as Appuntamento;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appuntamenti'] });
      toast.success('Appuntamento aggiornato con successo');
    },
    onError: (error) => {
      toast.error('Errore nell\'aggiornamento dell\'appuntamento: ' + error.message);
    },
  });
};

export const useDeleteAppuntamento = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('appuntamenti')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appuntamenti'] });
      toast.success('Appuntamento eliminato con successo');
    },
    onError: (error) => {
      toast.error('Errore nell\'eliminazione dell\'appuntamento: ' + error.message);
    },
  });
};
