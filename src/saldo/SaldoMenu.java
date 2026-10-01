package saldo;

import java.util.Scanner;

public class SaldoMenu {

    public void iniciar() {
        Scanner scanner = new Scanner(System.in);

        int saldo = 100;
        int option;

        do {
            System.out.println("\n===== MENU =====");
            System.out.println("Saldo: R$" + saldo);
            System.out.println("1 - SACAR");
            System.out.println("2 - DEPOSITAR");
            System.out.println("3 - RESGATAR PRESENTE");
            System.out.println("0 - SAIR");

            option = scanner.nextInt();

            switch (option) {
                case 1: {
                    Saque saque = new Saque();

                    saldo = saque.iniciar(saldo);
                } break;
                case 2: {
                    Deposito deposito = new Deposito();

                    saldo = deposito.iniciar(saldo);
                } break;
                case 3: {
                    ResgatePresente resgate = new ResgatePresente();

                    saldo = resgate.iniciar(saldo);
                } break;
            }
        } while (option != 0);
    }
}
