package saldo;

import java.util.Scanner;
import util.Util;

public class ResgatePresente {

    int ms = 300;

    public int iniciar(int saldo) {
        Scanner scanner = new Scanner(System.in);

        System.out.println("=======RESGATE=======");

        System.out.println("digite o código do presente:");
        String codigo = scanner.nextLine();

        return confirmarPagamento(codigo, saldo);
    }

    public int confirmarPagamento(String codigo, int saldo) {

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
        switch (codigo) {
            case "TRIGINHO777": {
                saldo += 100;
                System.out.println("Valor de R$ 100,00 adicionado com sucesso!");
                System.out.println("Seu saldo agora é " + saldo + ",00");
                break;
            }
            case "ZERADO10": {
                saldo += 10;
                System.out.println("Valor de R$ 10,00 adicionado com sucesso!");
                System.out.println("Seu saldo agora é " + saldo + ",00");
                break;
            }
            case "EU<3BET": {
                saldo += 9999;
                System.out.println("Valor de R$ 9999,00 adicionado com sucesso!");
                System.out.println("Seu saldo agora é " + saldo + ",00");
                break;
            }
            default: {
                System.out.println("Código inválido!");
                break;
            }
        }

        return saldo;
    }
}
