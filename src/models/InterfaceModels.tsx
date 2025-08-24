export enum Role {
  ADMIN = "ADMIN",
  USER = "USER",
  VISITOR = "VISITOR",
}

interface DecodedToken {
  sub?: string;
  nombre?: string;
  apellido?: string;
  telefono?: string;
  imagen?: string;
  rol?: Role;
  exp?: number;
}
export type { DecodedToken };

interface MicroentrepreneurshipCardProps {
  id: number;
  nombre: string;
  subcategoria: string;
  categoria: string;
  ciudad: string;
  provincia: string;
  pais: string;
  descripcion: string;
  masInformacion: string;
  imagenes: { url: string }[];
  mensajeDeContacto: string;
}

export type { MicroentrepreneurshipCardProps };

interface PublicationCardProps {
  title: string;
  date: string;
  images: string[];
  text: string;
  fullText: string;
}

export type { PublicationCardProps };

interface EditMicroFormProps {
  id: number;
  nombre: string;
  descripcion: string;
  masInformacion: string;
  pais: string;
  provincia: string;
  ciudad: string;
  categoria: {
    nombre: string;
  };
  subcategoria: string;
  imagenes: { url: string }[];
}

export type { EditMicroFormProps };

export type Image = {
  url: string;
};

interface CategoryCounts {
  "cat:1": number;
  "cat:2": number;
  "cat:3": number;
  "cat:4": number;
}

export type { CategoryCounts };

interface PublicationStatistic {
  title: string;
  date: string;
  visualizations: number;
}

export type { PublicationStatistic };
