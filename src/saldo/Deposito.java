package saldo;

import java.util.Scanner;
import util.Util;

public class Deposito {

    int ms = 300;

    public int iniciar(int saldo) {
        Scanner scanner = new Scanner(System.in);

        System.out.println("=======DEPOSITO=======");
        System.out.println("Saldo: R$" + saldo);

        System.out.println("digite o valor de depósito: ");
        int deposito = Integer.parseInt(scanner.nextLine().trim());

        saldo += deposito;

        confirmarPagamento();

        System.out.println("Saldo: R$" + saldo);
        Util.esperar(1000);

        return saldo;
    }

    public void confirmarPagamento() {

        String mensagem = "Confirmando depósito";

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

        System.out.println("\rDepósito confirmado!");
    }

}
