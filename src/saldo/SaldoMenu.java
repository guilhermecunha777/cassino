package saldo;

import entrar.Usuario;
import java.util.Scanner;
import jogos.JogosMenu;
import util.Util;

public class SaldoMenu {

    Usuario usuario;

    public SaldoMenu() {
    }

    public SaldoMenu(Usuario usuario) {
        this.usuario = usuario;
    }

    public void iniciar() {
        if (usuario == null) {
            System.out.println("Erro: usuário não identificado.");
            return;
        }

        Scanner scanner = new Scanner(System.in);
        int saldo = usuario.getSaldo();
        int option;

        do {
            System.out.println("\n===== MENU =====");
            System.out.println("Saldo: R$" + saldo);
            System.out.println("1 - SACAR");
            System.out.println("2 - DEPOSITAR");
            System.out.println("3 - RESGATAR PRESENTE");
            System.out.println("4 - MENU DE JOGOS");
            System.out.println("0 - SAIR");

            String linha = scanner.nextLine();
            option = Integer.parseInt(linha.trim());

            switch (option) {
                case 1: {
                    Saque saque = new Saque();
                    saldo = saque.iniciar(saldo);
                    usuario.setSaldo(saldo);
                    break;
                }
                case 2: {
                    Deposito deposito = new Deposito();
                    saldo = deposito.iniciar(saldo);
                    usuario.setSaldo(saldo);
                    break;
                }
                case 3: {
                    ResgatePresente resgate = new ResgatePresente();
                    saldo = resgate.iniciar(saldo);
                    usuario.setSaldo(saldo);
                    break;
                }
                case 4: {
                    JogosMenu jogosMenu = new JogosMenu(usuario);
                    jogosMenu.iniciar();
                    saldo = usuario.getSaldo();
                    break;
                }
                case 0:
                    break;
                default:
                    System.out.println("Opção inválida, digite uma opção de 1 a 5");
                    Util.esperar(500);
                    break;
            }
        } while (option != 0);
    }
}
