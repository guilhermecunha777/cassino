import saldo.SaldoMenu;

import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner s = new Scanner(System.in);
        SaldoMenu saldoMenu = new SaldoMenu();

        saldoMenu.iniciar(s);
    }
}