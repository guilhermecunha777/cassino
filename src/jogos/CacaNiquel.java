package jogos;

import entrar.Usuario;
import java.util.Random;
import java.util.Scanner;
import util.Util;

public class CacaNiquel {

    private final Usuario usuario;

    public CacaNiquel(Usuario usuario) {
        this.usuario = usuario;
    }

    public void iniciar() {
        Scanner scanner = new Scanner(System.in);
        Random random = new Random();
        int saldo = usuario.getSaldo();

        System.out.println("======= CAÇA-NÍQUEL =======");
        System.out.println("Saldo: R$" + saldo);

        System.out.println("Digite o valor da aposta: ");
        int apostar = Integer.parseInt(scanner.nextLine().trim());

        int numero1 = random.nextInt(5) + 1;
        int numero2 = random.nextInt(5) + 1;
        int numero3 = random.nextInt(5) + 1;

        System.out.println("\nGirando...\n");

        for (int i = 0; i < 15; i++) {
            int n1 = random.nextInt(5) + 1;
            System.out.print("\r[" + n1 + " ? ?]");
            Util.esperar(100);
        }

        System.out.print("\r[" + numero1 + " ? ?]");
        Util.esperar(500);

        for (int i = 0; i < 15; i++) {
            int n2 = random.nextInt(5) + 1;
            System.out.print("\r[" + numero1 + " " + n2 + " ?]");
            Util.esperar(100);
        }

        System.out.print("\r[" + numero1 + " " + numero2 + " ?]");
        Util.esperar(500);

        for (int i = 0; i < 15; i++) {
            int n3 = random.nextInt(5) + 1;
            System.out.print("\r[" + numero1 + " " + numero2 + " " + n3 + "]");
            Util.esperar(100);
        }

        System.out.print("\r[" + numero1 + " " + numero2 + " " + numero3 + "]\n");

        if (numero1 == numero2 && numero2 == numero3) {
            System.out.println("VOCÊ GANHOU!!!");
            saldo += apostar * 10;
        } else {
            System.out.println("Você perdeu.");
            saldo -= apostar;
        }

        usuario.setSaldo(saldo);
        System.out.println("Saldo final: R$ " + saldo);
    }
}
