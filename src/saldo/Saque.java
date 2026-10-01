package saldo;

import utilidade.Utilidade;

import java.util.Scanner;

public class Saque {

    int ms = 300;

    public int iniciar(Scanner s, int saldo) {

        int saque;

        do {
            System.out.println("=======SAQUE=======");
            System.out.println("Saldo: R$" + saldo);

            System.out.println("digite o valor para saque: ");
            saque = s.nextInt();

            if (saldo < saque) {
                System.out.println("O valor de saque não pode exceder o saldo!");
            }

        } while (saldo > saque);

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
            Utilidade.esperar(ms);

            System.out.print("\r" + mensagem + "..");
            Utilidade.esperar(ms);

            System.out.print("\r" + mensagem + "...");
            Utilidade.esperar(ms);

            System.out.print("\r" + mensagem + "   ");
            Utilidade.esperar(ms);
        }

        System.out.println("\rSaque confirmado!");
    }
}
