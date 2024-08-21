export class MaterialEntity {
    id: number;
    nome: string;
    descricao: string;
    formato: string;
    link: string;
    idCurso: number;

    constructor(id?: number, nome?: string, descricao?: string, formato?: string, link?: string, idCurso?: number) {
        this.id = id || 0;
        this.nome = nome || '';
        this.descricao = descricao || '';
        this.formato = formato || '';
        this.link = link || '';
        this.idCurso = idCurso || 0;

    }
}