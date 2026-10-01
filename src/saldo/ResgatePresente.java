package saldo;

import util.Util;

import java.util.Scanner;

public class ResgatePresente {

    int ms = 300;

    public int iniciar(int saldo) {

        Scanner scanner = new Scanner(System.in);

        System.out.println("=======RESGATE=======");

        System.out.println("digite o código do presente:");
        String codigo = scanner.nextLine();

        switch (codigo) {
            case "TRIGINHO777": {
                saldo += 100;
            } break;
            case "ZERADO10": {
                saldo += 10;
            } break;
            case "EU<3BET": {
                saldo += 9999;
            } break;
        }

        confirmarPagamento();

        return saldo;
    }

    public void confirmarPagamento() {

        String mensagem = "Confirmando código";

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

        System.out.println("\rCódigo presente resgatado!");
    }
}