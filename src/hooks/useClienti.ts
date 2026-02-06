import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Cliente, ClienteInsert } from '@/types/database';
import { toast } from 'sonner';

export const useClienti = () => {
  return useQuery({
    queryKey: ['clienti'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('clienti')
        .select('*')
        .order('cognome', { ascending: true });
      
      if (error) throw error;
      return data as Cliente[];
    },
  });
};

export const useCliente = (id: string) => {
  return useQuery({
    queryKey: ['clienti', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('clienti')
        .select('*')
        .eq('id', id)
        .maybeSingle();
      
      if (error) throw error;
      return data as Cliente | null;
    },
    enabled: !!id,
  });
};

export const useCreateCliente = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (cliente: ClienteInsert) => {
      const { data, error } = await supabase
        .from('clienti')
        .insert(cliente)
        .select()
        .single();
      
      if (error) throw error;
      return data as Cliente;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clienti'] });
      toast.success('Cliente creato con successo');
    },
    onError: (error) => {
      toast.error('Errore nella creazione del cliente: ' + error.message);
    },
  });
};

export const useUpdateCliente = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, ...cliente }: Partial<Cliente> & { id: string }) => {
      const { data, error } = await supabase
        .from('clienti')
        .update(cliente)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data as Cliente;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clienti'] });
      toast.success('Cliente aggiornato con successo');
    },
    onError: (error) => {
      toast.error('Errore nell\'aggiornamento del cliente: ' + error.message);
    },
  });
};

export const useDeleteCliente = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('clienti')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clienti'] });
      toast.success('Cliente eliminato con successo');
    },
    onError: (error) => {
      toast.error('Errore nell\'eliminazione del cliente: ' + error.message);
    },
  });
};

