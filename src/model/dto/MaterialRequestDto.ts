export class MaterialRequestDto {
    nome: string;
    descricao: string;
    formato: string;
    link: string;
    idCurso: number;

    constructor(nome?: string, descricao?: string, formato?: string, link?: string, idCurso?: number) {
        this.nome = nome || '';
        this.descricao = descricao || '';
        this.formato = formato || '';
        this.link = link || '';
        this.idCurso = idCurso || 0;

    }
}