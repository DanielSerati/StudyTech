export class Curso {
    id: number;
    nome: string;
    area: string;
    descricao: string;
    nivel: string;
    duracao: string;
    valor: number;
    nomeProfessor: string;
    idProfessor: number;
    idMaterial: number[];

    constructor(id?: number, nome?: string, area?: string, descricao?: string, nivel?: string, duracao?: string, valor?: number, nomeProfessor?: string, idProfessor?: number, idMaterial?: number[]) {
        this.id = id || 0;
        this.nome = nome || '';
        this.area = area || '';
        this.descricao = descricao || '';
        this.nivel = nivel || '';
        this.duracao = duracao || '';
        this.valor = valor || 0;
        this.nomeProfessor = nomeProfessor || '';
        this.idProfessor = idProfessor || 0;
        this.idMaterial = idMaterial || [];
    }
}