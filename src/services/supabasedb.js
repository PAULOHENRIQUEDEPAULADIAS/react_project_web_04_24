import { createClient } from "@supabase/supabase-js";
import { getUser } from "../utils/core";

// Inicialização do Supabase
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true, // Garante a persistência da sessão
    autoRefreshToken: true, // Atualiza tokens automaticamente
  },
});

// Função para obter o usuário logado
const user = getUser();

// Função para atualizar ou inserir dados (upsert)
const update = async (table, data, id) => {
  if (id) {
    data.id = id;
  }
  const { data: result, error } = await supabase.from(table).upsert(data).select();
  if (error) {
    throw error;
  }
  return result;
};

// Função para excluir um registro
const drop = async (table, id) => {
  const { data: result, error } = await supabase.from(table).delete().eq("id", id);
  if (error) {
    throw error;
  }
  return result;
};

// Função para obter um registro com condições opcionais
const get = async (table, conditions) => {
  let query = supabase.from(table).select();
  if (conditions && conditions.length > 0) {
    for (let condition of conditions) {
      query = query.eq(condition.field, condition.value);
    }
  }
  const { data, error } = await query.order("created_at", { ascending: false });
  if (error) {
    throw error;
  }
  return data[0];
};

// Função para listar registros de um usuário
const list = async (table) => {
  const { data, error } = await supabase
    .from(table)
    .select()
    .eq("user_id", user?.id) // Verifica se o usuário está definido
    .order("created_at", { ascending: false });
  if (error) {
    throw error;
  }
  return data;
};

// Função para salvar um novo registro
const save = async (table, data) => {
  return await update(table, data, null);
};

// Exportação das funções e do cliente Supabase
export {
  supabase, // Exporta o cliente para uso em outras partes do projeto
  save,
  update,
  drop,
  get,
  list,
};
