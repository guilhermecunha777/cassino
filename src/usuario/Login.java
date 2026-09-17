package usuario;

import java.util.Scanner;

public class Login {
    
    public Login(){

    }

    public Boolean verificaLogin(){
        Scanner sc = new Scanner(System.in);
        String nome = sc.nextLine();
        String cpf = sc.nextLine();
        int telefone = sc.nextInt();
        String senha = sc.nextLine();

        Usuario usuario = new Usuario(nome, cpf, telefone, senha);
        return true;
    }
}
