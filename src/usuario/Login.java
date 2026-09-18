package usuario;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Scanner;

public class Login {
        Usuario usuario;
    public Login(){

    }
    
    public Boolean verificaLogin(){
        Scanner sc = new Scanner(System.in);
        System.out.println("Insira seu nome: ");
        String nome = sc.nextLine();
        System.out.println("Insira seu CPF: ");
        String cpf = sc.nextLine();
        System.out.println("Insira sua data de nascimento: ");
        String dataNasc = sc.nextLine();
        System.out.println("Insira seu telefone: ");
        int telefone = sc.nextInt();
        System.out.println("Insira sua senha: ");
        String senha = sc.nextLine();

        DateTimeFormatter formatador = DateTimeFormatter.ofPattern("dd/MM/yyyy");
        LocalDate data = LocalDate.parse(dataNasc, formatador);

        usuario = new Usuario(nome, cpf, data, telefone, senha);
        return true;
    }
}
