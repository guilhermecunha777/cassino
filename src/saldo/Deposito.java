package saldo;

import util.Util;

import java.util.Scanner;

public class Deposito {

    int ms = 300;

    public int iniciar(int saldo) {

        Scanner scanner = new Scanner(System.in);

        System.out.println("=======DEPOSITO=======");
        System.out.println("Saldo: R$" + saldo);

        System.out.println("digite o valor de depósito: ");
        int deposito = scanner.nextInt();

        saldo += deposito;

        confirmarPagamento();

        System.out.println("Saldo: R$" + saldo);

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
