package saldo;

import java.util.Scanner;

public class SaldoMenu {

    public void iniciar(Scanner s) {
        int saldo = 100;
        int option;

        do {
            System.out.println("\n===== MENU =====");
            System.out.println("Saldo: R$" + saldo);
            System.out.println("1 - SACAR");
            System.out.println("2 - DEPOSITAR");
            System.out.println("3 - RESGATAR CÓDIGO");
            System.out.println("0 - SAIR");

            option = s.nextInt();

            switch (option) {
                case 1: {
                    Saque saque = new Saque();

                    saldo = saque.iniciar(s, saldo);
                } break;
                case 2: {
                    Deposito deposito = new Deposito();

                    saldo = deposito.iniciar(s, saldo);
                } break;
                case 3: {
                    ResgateCodigo resgate = new ResgateCodigo();

                    saldo = resgate.iniciar(s, saldo);
                } break;
            }
        } while (option != 0);
    }
}
