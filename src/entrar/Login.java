package entrar;

import java.util.Scanner;
import saldo.SaldoMenu;

public class Login {
    Usuario usuario;
    
    public Login(){

    }
    
    public Boolean verificaLogin(){
        Scanner sc = new Scanner(System.in);
        System.out.println("Insira seu CPF: ");
        String cpf = sc.nextLine();
        System.out.println("Insira sua senha: ");
        String senha = sc.nextLine();

        
        if (cpf .equals(usuario.cpf) && senha.equals(usuario.senha)){
            System.out.println("Login realizado com sucesso!");
            util.Util.esperar(1000);
            SaldoMenu saldoMenu = new SaldoMenu();
            saldoMenu.iniciar();
        }else{
            System.out.println("CPF ou senha incorretos, tente novamente.");
            util.Util.esperar(1000);
            Login login = new Login();
            login.verificaLogin();
        }
        return true;
    }
}
