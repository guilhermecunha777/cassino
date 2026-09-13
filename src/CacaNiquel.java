import java.util.Random;
import java.util.Scanner;

public class CacaNiquel {

    public void iniciar(){

        Scanner scanner = new Scanner(System.in);
        Random random =new Random();

        int saldo = 100;

        System.out.println("=======CAÇA-NÍQUEL=======");
        System.out.println("saldo: R$" + saldo);

        System.out.println("digite o valor da aposta: ");
        int apostar = scanner.nextInt();

        int numero1 = random.nextInt(5) + 1;
        int numero2 = random.nextInt(5) + 1;
        int numero3 = random.nextInt(5) + 1;

        System.out.println("[" + numero1 + numero2 + numero3 + "]");

        if (numero1 == numero2 && numero2 == numero3){
            System.out.println("voce ganhou!!!");
            saldo += apostar * 10;
        }else {
            System.out.println("voce perdeu");
            saldo -= apostar;
        }

        System.out.println("saldo final: R$ "+ saldo);
        scanner.close();
    }
}
