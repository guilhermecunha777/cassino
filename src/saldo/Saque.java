package saldo;

import java.util.Scanner;
import util.Util;

public class Saque {

    int ms = 300;

    public int iniciar(int saldo) {
        Scanner scanner = new Scanner(System.in);

        System.out.println("=======SAQUE=======");
        System.out.println("Saldo: R$" + saldo);

        System.out.println("Digite o valor para saque: ");
        int saque = Integer.parseInt(scanner.nextLine().trim());

        if (saque > saldo) {

            System.out.println("O valor de saque não pode exceder o saldo!");

        } else {

            saldo -= saque;

            confirmarSaque();

            System.out.println("Saldo: R$" + saldo);

        }

        return saldo;
    }

    public void confirmarSaque() {

        String mensagem = "Confirmando saque";

        for (int i = 0; i < 2; i++) {

            System.out.print("\r" + mensagem + ".");
            Util.esperar(ms);

            System.out.print("\r" + mensagem + "..");
            Util.esperar(ms);

            System.out.print("\r" + mensagem + "...");
            Util.esperar(ms);

            System.out.print("\r" + mensagem + "   ");
            Util.esperar(ms);
        }

        System.out.println("\rSaque confirmado!");
    }
}
