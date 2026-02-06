export interface Cliente {
  id: string;
  nome: string;
  cognome: string;
  email: string;
  telefono: string;
}

export interface ClienteInsert {
  nome: string;
  cognome: string;
  email: string;
  telefono: string;
}

export interface Appuntamento {
  id: string;
  id_cliente: string;
  servizio: string;
  data_appuntamento: string;
  ora_appuntamento: string;
  note: string | null;
  stato: string;
  // Joined data
  clienti?: Cliente;
}

export interface AppuntamentoInsert {
  id_cliente: string;
  servizio: string;
  data_appuntamento: string;
  ora_appuntamento: string;
  note?: string;
  stato: string;
}

export interface CartellaFile {
  name: string;
  id: string;
  created_at: string;
  metadata: Record<string, unknown> | null;
}
