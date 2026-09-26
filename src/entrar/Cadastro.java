package entrar;

import java.time.LocalDate;
import java.time.Period;
import java.time.format.DateTimeFormatter;
import java.util.Scanner;
import saldo.SaldoMenu;
import util.Util;

public class Cadastro {

    Usuario usuario;
    Scanner sc = new Scanner(System.in);

    public boolean cadastrar() {
        System.out.println("Insira seus dados para o cadastro\n");
        Util.esperar(600);
        System.out.println("Insira seu nome: ");
        String nome = sc.nextLine();
        System.out.println("Insira seu CPF: ");
        String cpf = sc.nextLine();
        System.out.println("Insira sua data de nascimento: ");
        String dataNasc = sc.nextLine();
        System.out.println("Insira seu telefone: ");
        String telefone = sc.nextLine();
        System.out.println("Insira sua senha: ");
        String senha = sc.nextLine();
        Util.esperar(500);

        DateTimeFormatter formatador = DateTimeFormatter.ofPattern("dd/MM/yyyy");
        LocalDate data = LocalDate.parse(dataNasc, formatador);
        boolean verificaIdade = verificaIdade(data);

        if (verificaIdade) {
            usuario = new Usuario(nome, cpf, data, telefone, senha);
            System.out.println("\n" + nome + ", VOCÊ FOI CADASTRADO COM SUCESSO!");
            Util.esperar(500);
            SaldoMenu saldoMenu = new SaldoMenu(usuario);
            saldoMenu.iniciar();
        } else {
            System.out.println("Usuário menor de idade, não é possível realizar o cadastro. ");
            Cadastro cadastro = new Cadastro();
            cadastro.cadastrar();
        }

        return true;
    }

    public boolean verificaIdade(LocalDate data) {
        LocalDate diaAtual = LocalDate.now();
        if (Period.between(data, diaAtual).getYears() >= 18) {
            return true;
        } else {
            return false;
        }
    }

}
