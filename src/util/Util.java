package util;

public class Util {
    public static void esperar(int ms) {
        // Nescessário o try catch por causa que a função "sleep() pode retornar um erro InterruptedException"
        try {
            //Função que da o delay nos print, utiliza um valor int para dizer em milissegundos o delay
            Thread.sleep(ms);
        } catch (InterruptedException e) {
            //Interrompe a execução caso der o erro
            Thread.currentThread().interrupt();
        }
    }
}