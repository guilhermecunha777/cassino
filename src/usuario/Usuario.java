package usuario;

import java.time.LocalDate;


public class Usuario{
    String nome;
    String cpf;
    LocalDate dataNasc;
    int telefone;
    String senha;

    public Usuario(String nome, String cpf, LocalDate dataNasc, int telefone, String senha){
        this.nome = nome;
        this.cpf = cpf;
        this.dataNasc = dataNasc;
        this.telefone = telefone;
        this.senha = senha;
    }
}