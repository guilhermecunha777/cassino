
import entrar.Cadastro;
import util.Util;

public class Main {

    public static void main(String[] args) {
        System.out.println("╔══════════════════════════════════════════════════════════════════════════════╗");
        System.out.println("║                                                                              ║");
        System.out.println("║   ░█████╗░░█████╗░░██████╗░██████╗██╗███╗░░██╗░█████╗░                     ║");
        System.out.println("║   ██╔══██╗██╔══██╗██╔════╝██╔════╝██║████╗░██║██╔══██╗                     ║");
        System.out.println("║   ██║░░╚═╝███████║╚█████╗░╚█████╗░██║██╔██╗██║██║░░██║                     ║");
        System.out.println("║   ██║░░██╗██╔══██║░╚═══██╗░╚═══██╗██║██║╚████║██║░░██║                     ║");
        System.out.println("║   ╚█████╔╝██║░░██║██████╔╝██████╔╝██║██║░╚███║╚█████╔╝                     ║");
        System.out.println("║   ░╚════╝░╚═╝░░╚═╝╚═════╝░╚═════╝░╚═╝╚═╝░░╚══╝░╚════╝░                     ║");
        System.out.println("║                                                                              ║");
        System.out.println("║                        TRUFILHO CASINO - SINCE 2026                         ║");
        System.out.println("║                                                                              ║");
        System.out.println("╚══════════════════════════════════════════════════════════════════════════════╝");
        Util.esperar(800);
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
