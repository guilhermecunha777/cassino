package entrar;

import java.time.LocalDate;

public class Usuario {

    String nome;
    String cpf;
    LocalDate dataNasc;
    String telefone;
    String senha;
    int saldo;

    public Usuario(String nome, String cpf, LocalDate dataNasc, String telefone, String senha) {
        this.nome = nome;
        this.cpf = cpf;
        this.dataNasc = dataNasc;
        this.telefone = telefone;
        this.senha = senha;
        this.saldo = 0;
    }

    public int getSaldo() {
        return saldo;
    }

    public void setSaldo(int saldo) {
        this.saldo = saldo;
    }
}
