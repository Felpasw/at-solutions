//CTRL + SHITF + ALT + S

export interface Response {
  _links: Links;
  _embedded: Embedded;
  count: number;
  offset: number;
}

export interface Embedded {
  contratos: Contrato[];
}

export interface Contrato {
  identificador: string;
  uasg: number;
  modalidade_licitacao: number;
  numero_aviso_licitacao: number;
  codigo_contrato: number;
  licitacao_associada: string;
  origem_licitacao: string;
  numero: number;
  objeto: string;
  numero_aditivo?: number;
  numero_processo: string;
  cpfContratada?: string;
  cnpj_contratada?: string;
  data_assinatura: string;
  fundamento_legal: string;
  data_inicio_vigencia: string;
  data_termino_vigencia: string;
  valor_inicial: number;
  _links: Links2;
}

export interface Links2 {
  self: Self;
  aditivos: Self;
  apostilamentos: Self;
  eventos: Self;
  fornecedor?: Self;
  licitacao: Self;
  modalidade_licitacao: Self;
  tipo_contrato: Self;
  uasg: Self;
}

export interface Links {
  self: Self;
  first: Self;
}

export interface Self {
  href: string;
  title: string;
}