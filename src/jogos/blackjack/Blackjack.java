package jogos.blackjack;

import java.util.ArrayList;
import java.util.Random;
import java.util.Scanner;
import util.Util;
public class Blackjack {
    String[] baralho = {"AS_COPAS","2_COPAS","3_COPAS","4_COPAS","5_COPAS","6_COPAS","7_COPAS","8_COPAS","9_COPAS","10_COPAS","J_COPAS","Q_COPAS","K_COPAS","AS_PAUS","2_PAUS","3_PAUS","4_PAUS","5_PAUS","6_PAUS","7_PAUS","8_PAUS","9_PAUS","10_PAUS","J_PAUS","Q_PAUS","K_PAUS","AS_OUROS","2_OUROS","3_OUROS","4_OUROS","5_OUROS","6_OUROS","7_OUROS","8_OUROS","9_OUROS","10_OUROS","J_OUROS","Q_OUROS","K_OUROS","AS_ESPADAS","2_ESPADAS","3_ESPADAS","4_ESPADAS","5_ESPADAS","6_ESPADAS","7_ESPADAS","8_ESPADAS","9_ESPADAS","10_ESPADAS","J_ESPADAS","Q_ESPADAS","K_ESPADAS"};
    
    ArrayList<Integer> cartasSorteadas = new ArrayList<>();
    Carta[] cartasJogador = new Carta[10];
    Carta[] cartasDealer = new Carta[10];
    

    //Trata os valores das cartas. Transforma as letras no seu respectivo valor.
    public int tratarValorCarta(String[] partes, int valor, boolean duasPrimeiras) {
        if("AS".equals(partes[0])){
            //O ás só vale 11 nas duas primeiras cartas.
            if(duasPrimeiras == true){
                valor = 11;
            }
            else{
                valor = 1;
            }
        }
        else if("K".equals(partes[0]) || "Q".equals(partes[0]) || "J".equals(partes[0])){
            valor = 10;
        }
        else{
            valor = Integer.parseInt(partes[0]);
        }
        return valor;
    }

    //Trata o naipe das cartas. Deixa com apenas um caractere.
    public String tratarNaipeCarta(String[] partes, String naipe){
        switch (partes[1]){
            case "ESPADAS":
                naipe = "E";
                break;
            case "PAUS":
                naipe = "P";
                break;
            case "COPAS":
                naipe = "C";
                break;
            case "OUROS":
                naipe = "O";
                break;
        }
        return naipe;
    }

    //Mostra a mesa.
    public void mostrarMesa(boolean dealerEscondeCarta, int d, int j){
        //Mostra mesa
        //Mão Dealer
        int valorMaoDealer = 0;
        System.out.println("====== Mao dealer: ======");
        if(dealerEscondeCarta){
            //O d está com o -1 para não mostrar as duas cartas do dealer logo de começo.
            for(int i = 0; i < d-1; i++){
                //Como é um array com o tamanho pré-definido, esse teste protege o programa de falhas
                if(cartasDealer != null){
                    cartasDealer[i].mostrarCarta();
                    valorMaoDealer += cartasDealer[i].valor;
                }   
            }
            System.out.println("A mao do dealer vale: " + valorMaoDealer);
        }
        else {
            for(int i = 0; i < d; i++){
                //Como é um array com o tamanho pré-definido, esse teste protege o programa de falhas
                if(cartasDealer != null){
                    cartasDealer[i].mostrarCarta();
                    valorMaoDealer += cartasDealer[i].valor;
                }   
            }
            System.out.println("A mao do dealer vale: " + valorMaoDealer);
        }
        //Mão Jogador
        System.out.println("====== Sua mao: ======");
        int valorMaoJogador = 0;
        for(int i = 0; i < j; i++){
            //Como é um array com o tamanho pré-definido, esse teste protege o programa de falhas
            if(cartasJogador != null){
                cartasJogador[i].mostrarCarta();
                valorMaoJogador += cartasJogador[i].valor;
            }
        }
        System.out.println("Sua mao vale: " + valorMaoJogador);
    }

    public int calcuaMaoJogador(Carta[] cartasJogador, int j){
        int valorMaoJogador = 0;
        for(int i = 0; i < j; i ++){
            if(cartasJogador[i] != null){
                valorMaoJogador += cartasJogador[i].valor;
            }
        }
        return valorMaoJogador;
    }

    public int calcuaMaoDealer(Carta[] cartasDealer, int d){
        int valorMaoDealer = 0;
        for(int i = 0; i < d; i ++){
            if(cartasDealer [i] != null){
                valorMaoDealer += cartasDealer[i].valor;
            }
        }
        return valorMaoDealer;
    }

    public void menasegemMao21(){
        System.out.println("Sua mao vale 21. Voce nao pode mais pedir cartas.");
    }

    public void mensagemSaldo(int saldo){
        System.out.println("Saldo: R$" + saldo);
    }

    public void iniciar() {
        Scanner sc = new Scanner(System.in);
        Random random = new Random();

        int saldo = 100;

        System.out.println("======= BLACKJACK =======");
        mensagemSaldo(saldo);

        System.out.print("Digite o valor da aposta: R$");
        int aposta = sc.nextInt();
        saldo -= aposta;

        System.out.print("Entregando as cartas");
        //Aniamação de "..." para a entrega das cartas
        for(int i = 0; i < 5; i++){
            Util.esperar(150);
            System.out.print(".");
            Util.esperar(150);
            System.out.print(".");
            Util.esperar(150);
            System.out.print(".");
            
            Util.esperar(250);
            //O r faz o cursor voltar ao ínicio da linha
            System.out.print("\rEntregando as cartas");
        }

        System.out.println();

        int tamanhoBaralho = baralho.length;
        
        int valor = 0; //Variáevel para o valor tratado da carta
        String naipe = ""; //Variável para o naipe resumido da carta
        boolean duasPrimeiras = true; //Variável de controle para o valor do "ÁS"
        int j = 0; //Quantas cartas o jogador já possuí.

        //Distribui as duas cartas iniciais para o jogador
        while(j < 2){
            int sorteio = random.nextInt(tamanhoBaralho);
        
            if(!cartasSorteadas.contains(sorteio)){
                //Adiciona nos dois, pois cartasSorteadas controla para não rtepetir as cartas.
                cartasSorteadas.add(sorteio);
                String[] partes = baralho[sorteio].split("_");
                
                valor = tratarValorCarta(partes, valor, duasPrimeiras);

                naipe = tratarNaipeCarta(partes, naipe);
                
                cartasJogador[j] = new Carta(naipe, partes[0], valor);
                j += 1;
            }
        }

        int d = 0;
        while(d < 2){
            int sorteio = random.nextInt(tamanhoBaralho);
            if(!cartasSorteadas.contains(sorteio)){
                //Adiciona nos dois, pois cartasSorteadas controla para não rtepetir as cartas.
                cartasSorteadas.add(sorteio);
                String[] partes = baralho[sorteio].split("_");

                valor = tratarValorCarta(partes, valor, duasPrimeiras);

                naipe = tratarNaipeCarta(partes, naipe);

                cartasDealer[d] = new Carta(naipe, partes[0], valor);
                d += 1;
            }
        }

        int valorMaoDealer = 0;
        int valorMaoJogador = 0;

        boolean dealerEscondeCarta = true; //Variável controladora para o dealer não mostrar a segunda carta enquanto o jogador não tiver parado de pedir mais

        mostrarMesa(dealerEscondeCarta, d, j);

        //Saímos das duas primeiras, então:
        duasPrimeiras = false;

        boolean pedirMaisCartas = true; //Jogador pode pedir mais cartas

        valorMaoJogador = calcuaMaoJogador(cartasJogador, j);

        if(valorMaoJogador == 21){
            menasegemMao21();
            pedirMaisCartas = false;
            dealerEscondeCarta = false;
        }

        //Enquanto o jogador estiver pedindo mais cartas esta seção vai se repetir.
        while(pedirMaisCartas){
            System.out.println("1 - Pedir");
            System.out.println("2 - Parar");
            System.out.print("Escolha uma opcao: ");
            int opcao = sc.nextInt();
            System.out.println();
            System.out.println();
            System.out.println("====================");
            System.out.println();

            switch (opcao){
                case 1:
                    int sorteio = random.nextInt(tamanhoBaralho);
                    if(!cartasSorteadas.contains(sorteio)){
                        //Adiciona nos dois, pois cartasSorteadas controla para não rtepetir as cartas.
                        cartasSorteadas.add(sorteio);
                        String[] partes = baralho[sorteio].split("_");
                        
                        valor = tratarValorCarta(partes, valor, duasPrimeiras);

                        naipe = tratarNaipeCarta(partes, naipe);
                        
                        cartasJogador[j] = new Carta(naipe, partes[0], valor);
                        j += 1;
                    }
                    valorMaoJogador = calcuaMaoJogador(cartasJogador, j);
                    mostrarMesa(dealerEscondeCarta, d, j);
                    break;
                case 2:
                    pedirMaisCartas = false;
                    dealerEscondeCarta = false;
                    break;
            }

            if(valorMaoJogador == 21){
                menasegemMao21();
                pedirMaisCartas = false;
            }
            else if(valorMaoJogador > 21){
                System.out.println("Voce perdeu. Sua mao vale mais do que 21.");
                mensagemSaldo(saldo);
                pedirMaisCartas = false;
                System.exit(0);
            }
        }

        //"IA de pedir mais do dealer"
        valorMaoDealer = calcuaMaoDealer(cartasDealer, d);
        if(valorMaoDealer == 21){
            mostrarMesa(dealerEscondeCarta, d, j); 
            if(valorMaoJogador == 21){
                saldo += aposta;
                System.out.println("Empate. Os pontos do dealer foram iguais aos seus.");
                mensagemSaldo(saldo);
                System.exit(0);
            }
            else{
                System.out.println("Voce perdeu. Os pontos do dealer foram maiores que os seus.");
                mensagemSaldo(saldo);
                System.exit(0);
            }
        }
        //O dealer deve pedir mais cartas até ele atingir o valor de 17 ou mais. Caso a mão do jogador for maior que 17, o dealer é obrigado a ter o valor igual(se for 21) ou maior.
        int objetivoDealer = 0;

        if(valorMaoJogador < 17){
            objetivoDealer = 17;
        }
        else{
            objetivoDealer = valorMaoJogador;
        }

        while(valorMaoDealer < objetivoDealer){
            int sorteio = random.nextInt(tamanhoBaralho);
            if(!cartasSorteadas.contains(sorteio)){
                //Adiciona nos dois, pois cartasSorteadas controla para não rtepetir as cartas.
                cartasSorteadas.add(sorteio);
                String[] partes = baralho[sorteio].split("_");

                valor = tratarValorCarta(partes, valor, duasPrimeiras);

                naipe = tratarNaipeCarta(partes, naipe);

                cartasDealer[d] = new Carta(naipe, partes[0], valor);
                d += 1;
            }
            valorMaoDealer = calcuaMaoDealer(cartasDealer, d);  
        }
        mostrarMesa(dealerEscondeCarta, d, j);
        
        //Regras(Jogador) de empate, vitória e derrota.
        //Vitoria(Jogador)
        if(valorMaoDealer > 21){
            int valorGanho = aposta *= 2;
            saldo += valorGanho;
            System.out.println("Voce ganhou. Os pontos do dealer passaram 21.");
            mensagemSaldo(saldo);
        }
         //Derrota(Jogador)
        else if(valorMaoDealer > valorMaoJogador){
            System.out.println("Voce perdeu. Os pontos do dealer foram maiores que os seus.");
            mensagemSaldo(saldo);
        }
        //Empate(Jogador)
        else if(valorMaoDealer == valorMaoJogador){
            saldo += aposta;
            System.out.println("Empate. O dealer atingiu os mesmos pontos que você.");
            mensagemSaldo(saldo);
        }
    }
}

//Eu parei de mexer no momento em que o programa não estava executando de modo correto as regras(jogador).