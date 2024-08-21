export class CursoRequestDto {
    nome?: string;
    area?: string;
    descricao?: string;
    nivel?: string;
    duracao?: string;
    valor?: number;
    nomeProfessor?: string;
    idProfessor?: number;
    idMaterial?: number[];

    constructor(nome?: string, area?: string, descricao?: string, nivel?: string, duracao?: string, valor?: number, nomeProfessor?: string, idProfessor?: number, idMaterial?: number[]) {
        this.nome = nome;
        this.area = area;
        this.descricao = descricao;
        this.nivel = nivel;
        this.duracao = duracao;
        this.valor = valor;
        this.nomeProfessor = nomeProfessor;
        this.idProfessor = idProfessor;
        this.idMaterial = idMaterial;
    }
}
