
import entrar.Cadastro;
import java.util.Scanner;
import util.Util;

public class Main {

    public static void main(String[] args) {
        System.out.println("BEM VINDO AO CASSINO TRUFILHO");
        Util.esperar(500);
        System.out.print("\n\nEstamos te direcionando para o sistema de cadastro");
        Util.esperar(500);
        System.out.print(".");
        Util.esperar(300);
        System.out.print(".");
        Util.esperar(300);
        System.out.println(".");
        Util.esperar(1500);

        Cadastro cadastro = new Cadastro();
        cadastro.cadastrar();
    }
}
