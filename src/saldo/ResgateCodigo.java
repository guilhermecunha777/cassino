package saldo;

import utilidade.Utilidade;

import java.util.Scanner;

public class ResgateCodigo {

    int ms = 300;

    public int iniciar(Scanner s, int saldo) {

        String codigo;
        boolean codigoValido;

        do {

            System.out.println("=======RESGATE=======");

            System.out.println("Digite o código do presente:");
            codigo = s.nextLine();

            codigoValido = true;

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

                default: {
                    System.out.println("Código inválido!");
                    codigoValido = false;
                }
            }

        } while (!codigoValido);

        confirmarPagamento();

        return saldo;
    }

    public void confirmarPagamento() {

        String mensagem = "Confirmando código";

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

        System.out.println("\rCódigo presente resgatado!");
    }
}