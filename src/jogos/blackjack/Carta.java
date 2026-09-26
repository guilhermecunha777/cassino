package jogos.blackjack;

public class Carta {
    String naipe;
    String numLetra;
    int valor;

    public Carta(String naipe, String numLetra, int valor){
        this.naipe = naipe;
        this.numLetra = numLetra;
        this.valor = valor;
    }

    public void mostrarCarta() {
        System.out.println("┌─────────────┐");
        System.out.println("│ " + numLetra + "           │");
        System.out.println("│             │");
        System.out.println("│      " + naipe + "      │");
        System.out.println("│             │");
        System.out.println("│           " + numLetra + " │");
        System.out.println("└─────────────┘");
    }
}
