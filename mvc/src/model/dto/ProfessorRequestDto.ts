export class ProfessorDto {
    dataNascimento: string;

    constructor(dataNascimento?: string) {
        this.dataNascimento = dataNascimento || '';
    }
}