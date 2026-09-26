package jogos;

import entrar.Usuario;
import java.util.Scanner;
import util.Util;

public class JogosMenu {

    private final Usuario usuario;

    public JogosMenu(Usuario usuario) {
        this.usuario = usuario;
    }

    public void iniciar() {
        Scanner scanner = new Scanner(System.in);
        int option;

        do {
            System.out.println("\n===== MENU =====");
            System.out.println("Saldo: R$" + usuario.getSaldo());
            System.out.println("1 - Caça Níquel");
            System.out.println("2 - Black Jack");
            System.out.println("0 - Sair");

            String linha = scanner.nextLine();
            option = Integer.parseInt(linha.trim());
            Util.esperar(500);

            switch (option) {
                case 1:
                    CacaNiquel cacaNiquel = new CacaNiquel(usuario);
                    cacaNiquel.iniciar();
                    break;

                case 2:
                    System.out.println("Black Jack ainda não foi implementado.");
                    break;

                case 0:
                    return;

                default:
                    System.out.println("A opção escolhida é inválida selecione outra!");
                    Util.esperar(500);
                    break;
            }

        } while (option != 0);
    }

}
