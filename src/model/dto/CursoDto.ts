export class CursoDto {
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

    constructor(id: number, nome: string, area: string, descricao: string, nivel: string, duracao: string, valor: number, nomeProfessor: string, idProfessor: number, idMaterial: number[]) {
        this.id = id;
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
