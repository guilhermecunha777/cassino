package saldo;

import utilidade.Utilidade;

import java.util.Scanner;

public class Deposito {

    int ms = 300;

    public int iniciar(Scanner s, int saldo) {

        System.out.println("=======DEPOSITO=======");
        System.out.println("Saldo: R$" + saldo);

        System.out.println("digite o valor de depósito: ");
        int deposito = s.nextInt();

        saldo += deposito;

        confirmarPagamento();

        System.out.println("Saldo: R$" + saldo);

        return saldo;
    }

    public void confirmarPagamento() {

        String mensagem = "Confirmando depósito";

        for (int i = 0; i < 2; i++) {

            System.out.print("\r" + mensagem + ".");
            Utilidade.esperar(ms);

            System.out.print("\r" + mensagem + "..");
            Utilidade.esperar(ms);

            System.out.print("\r" + mensagem + "...");
            Utilidade.esperar(ms);

            System.out.print("\r" + mensagem + "   ");
            Utilidade.esperar(ms);
        }

        System.out.println("\rDepósito confirmado!");
    }

}
