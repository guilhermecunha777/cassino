package jogos;

import util.Util;

import java.util.Random;
import java.util.Scanner;

public class CacaNiquel {

    public void iniciar() {

        Scanner scanner = new Scanner(System.in);
        Random random = new Random();

        int saldo = 100;

        System.out.println("======= CAÇA-NÍQUEL =======");
        System.out.println("Saldo: R$" + saldo);

        System.out.println("Digite o valor da aposta: ");
        int apostar = scanner.nextInt();

        int numero1 = random.nextInt(5) + 1;
        int numero2 = random.nextInt(5) + 1;
        int numero3 = random.nextInt(5) + 1;

        System.out.println("\nGirando...\n");

        //Animação dos números girando

        //Primeira coluna
        //Looping de 15 vezes (15 repetições por causa que repete muito número, imperceptível) para ir alterando os números
        for (int i = 0; i < 15; i++) {
            //Gerar números aleatórios de 1 a 5
            int n1 = random.nextInt(5) + 1;
            // O /r faz o cursor voltar para o começo da linha
            System.out.print("\r[" + n1 + " ? ?]");
            // Delay de 100 milissegundos
            Util.esperar(100);
        }

        //Após o looping, da print no valor já selecionado anteriormente
        System.out.print("\r[" + numero1 + " ? ?]");
        Util.esperar(500);

        // Segunda coluna
        for (int i = 0; i < 15; i++) {
            int n2 = random.nextInt(5) + 1;

            System.out.print("\r[" + numero1 + " " + n2 + " ?]");
            Util.esperar(100);
        }

        System.out.print("\r[" + numero1 + " " + numero2 + " ?]");
        Util.esperar(500);

        // Terceira coluna
        for (int i = 0; i < 15; i++) {
            int n3 = random.nextInt(5) + 1;

            System.out.print("\r[" + numero1 + " " + numero2 + " " + n3 + "]");
            Util.esperar(100);
        }

        // Print com o resultado final
        System.out.print("\r[" + numero1 + " " + numero2 + " " + numero3 + "]\n");

        // Verifica o resultado
        if (numero1 == numero2 && numero2 == numero3) {
            System.out.println("VOCÊ GANHOU!!!");
            saldo += apostar * 10;
        } else {
            System.out.println("Você perdeu.");
            saldo -= apostar;
        }

        System.out.println("Saldo final: R$ " + saldo);

        scanner.close();
    }
}
