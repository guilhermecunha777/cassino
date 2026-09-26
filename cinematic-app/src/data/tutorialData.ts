import type { TutorialStage, GlossaryItem } from '../types';

export const TUTORIAL_STAGES: TutorialStage[] = [
  {
    id: 1,
    slug: 'entidade-usuario',
    title: 'Etapa 1: A Ficha do Jogador (Usuario.java)',
    file: 'src/entrar/Usuario.java',
    category: 'Estrutura de Dados',
    orderBadge: 'Fase 1: O Molde Básico',
    analogy: 'Pense em uma Classe como uma fôrma de bolo ou a ficha cadastral em branco de um clube. Ela não é o bolo em si, mas define exatamente quais ingredientes (nome, CPF, senha e saldo) todo novo sócio precisa ter ao se associar.',
    pooConcepts: [
      { name: 'Classe', desc: 'A planta da casa ou fôrma que define como todo usuário deve ser construído.' },
      { name: 'Atributos', desc: 'As informações guardadas na memória (como nome, CPF e o saldo bancário).' },
      { name: 'Construtor', desc: 'A certidão de nascimento: o código que roda no momento em que o usuário nasce com new.' },
      { name: 'Encapsulamento', desc: 'O cofre: protege o saldo para que ninguém altere o dinheiro diretamente sem autorização.' }
    ],
    whyItExists: 'Em qualquer sistema orientado a objetos, precisamos de uma representação dos elementos do mundo real. O cassino gira em torno do apostador. Criamos o Usuario primeiro para que o sistema consiga guardar quem está jogando e acompanhar o saldo de forma segura.',
    orderReason: 'Sempre começamos pelas coisas mais fundamentais (o que chamamos de Entidades). Sem a ficha do usuário pronta, nenhuma outra parte do sistema conseguiria saber para quem dar ou cobrar dinheiro.',
    code: `package entrar;

import java.time.LocalDate;

public class Usuario {

    String nome;
    String cpf;
    LocalDate dataNasc;
    String telefone;
    String senha;
    int saldo;

    public Usuario(String nome, String cpf, LocalDate dataNasc, String telefone, String senha) {
        this.nome = nome;
        this.cpf = cpf;
        this.dataNasc = dataNasc;
        this.telefone = telefone;
        this.senha = senha;
        this.saldo = 0;
    }

    public int getSaldo() {
        return saldo;
    }

    public void setSaldo(int saldo) {
        this.saldo = saldo;
    }
}`,
    lineExplanations: [
      {
        lines: 'Linha 1',
        codeSnippet: 'package entrar;',
        text: 'Indica a pasta onde este arquivo está guardado. Serve como uma etiqueta para organizar os arquivos do projeto.'
      },
      {
        lines: 'Linha 3',
        codeSnippet: 'import java.time.LocalDate;',
        text: 'Traz para o nosso código uma ferramenta padrão do Java especializada em entender datas do calendário (ano, mês e dia).'
      },
      {
        lines: 'Linhas 5 a 12',
        codeSnippet: 'public class Usuario { ... String nome; ... int saldo; }',
        text: 'Aqui declaramos a Classe Usuario e listamos seus Atributos. Cada apostador terá seu próprio nome, CPF, data de nascimento, telefone, senha e saldo.'
      },
      {
        lines: 'Linhas 14 a 21',
        codeSnippet: 'public Usuario(String nome, ... ) { ... this.saldo = 0; }',
        text: 'Este é o Construtor. Quando alguém se cadastra, passamos as informações e o sistema define automaticamente que a conta começa com R$ 0 até que seja feito um depósito.'
      },
      {
        lines: 'Linhas 23 a 29',
        codeSnippet: 'public int getSaldo() { ... } public void setSaldo(int saldo) { ... }',
        text: 'São as portas de acesso (Get e Set). getSaldo serve para consultar quanto dinheiro tem na conta, e setSaldo atualiza o valor quando o usuário ganha ou perde uma aposta.'
      }
    ],
    summary: 'Nesta etapa você viu que uma Classe funciona como um molde. Criamos a ficha do apostador com suas características (atributos), definimos como ele nasce (construtor) e criamos métodos para ler e alterar o saldo de forma organizada.'
  },
  {
    id: 2,
    slug: 'utilitarios-util',
    title: 'Etapa 2: A Ferramenta de Pausa (Util.java)',
    file: 'src/util/Util.java',
    category: 'Ferramentas de Apoio',
    orderBadge: 'Fase 2: Utilitários',
    analogy: 'Imagine uma caixa de ferramentas compartilhada. Você não precisa construir uma nova chave de fenda toda vez que vai apertar um parafuso. A classe Util funciona assim: ela fica disponível para qualquer parte do projeto que queira fazer uma pausa dramática na tela.',
    pooConcepts: [
      { name: 'Método Estático (static)', desc: 'Uma função utilitária que pode ser chamada diretamente, sem precisar criar um objeto novo.' },
      { name: 'Prevenção de Erros (try/catch)', desc: 'Um escudo que previne que o programa trave caso o computador seja interrompido durante a pausa.' }
    ],
    whyItExists: 'Computadores processam texto instantaneamente. Se o cassino imprimisse os números do caça-níquel ou as cartas do 21 sem nenhuma pausa, o jogo perderia toda a graça e suspense. Essa classe cria um comando simples para pausar a tela por alguns milissegundos.',
    orderReason: 'Classes de ferramentas auxiliares são criadas logo no início para que qualquer tela ou jogo possa usá-las à vontade, evitando ter que reescrever o mesmo código várias vezes.',
    code: `package util;

public class Util {
    public static void esperar(int ms) {
        // O try/catch previne erros caso a pausa seja interrompida
        try {
            // Pausa a execução pelo tempo desejado em milissegundos
            Thread.sleep(ms);
        } catch (InterruptedException e) {
            // Garante que o programa continue seguro
            Thread.currentThread().interrupt();
        }
    }
}`,
    lineExplanations: [
      {
        lines: 'Linha 4',
        codeSnippet: 'public static void esperar(int ms)',
        text: 'A palavra static significa que essa ferramenta é pública e direta. Para usá-la, basta escrever Util.esperar(500) de qualquer lugar do projeto.'
      },
      {
        lines: 'Linhas 6 a 8',
        codeSnippet: 'try { Thread.sleep(ms); }',
        text: 'O comando Thread.sleep pede para o computador descansar pela quantidade de milissegundos indicada (1000 milissegundos = 1 segundo).'
      },
      {
        lines: 'Linhas 9 a 12',
        codeSnippet: 'catch (InterruptedException e) { ... }',
        text: 'O escudo de segurança do Java: se por algum motivo a pausa for interrompida pelo sistema operacional, o programa trata a situação pacificamente e não fecha sozinho.'
      }
    ],
    summary: 'Você aprendeu como criar funções de apoio com a palavra static para reaproveitar tarefas comuns em todo o sistema sem complicações.'
  },
  {
    id: 3,
    slug: 'ponto-de-entrada-main',
    title: 'Etapa 3: A Chave de Ignição (Main.java)',
    file: 'src/Main.java',
    category: 'Inicialização',
    orderBadge: 'Fase 3: Partida do Sistema',
    analogy: 'Pense na classe Main como a chave que dá a partida no motor do carro. Ela não constrói o carro nem dirige a viagem toda, mas é quem aciona a ignição e passa o comando para os pedais e o volante.',
    pooConcepts: [
      { name: 'Método Main', desc: 'A porta oficial de entrada por onde o computador começa a ler o seu programa.' },
      { name: 'Instanciação (new)', desc: 'O ato de tirar uma classe do papel e transformá-la em um objeto funcional na memória.' },
      { name: 'Delegação de Tarefas', desc: 'Em vez de fazer tudo em um só lugar, o Main apenas convoca o responsável correto (Cadastro).' }
    ],
    whyItExists: 'O computador precisa saber exatamente por qual linha começar a rodar o projeto. O Main cumpre esse papel: dá boas-vindas ao apostador e passa o controle para a tela de cadastro.',
    orderReason: 'O Main é configurado assim que a primeira tela funcional (o Cadastro) é estruturada, permitindo testar o programa rodando do início ao fim.',
    code: `import entrar.Cadastro;
import util.Util;

public class Main {

    public static void main(String[] args) {
        System.out.println("BEM VINDO AO CASSINO TRUFILHO");
        Util.esperar(500);
        System.out.print("\\n\\nEstamos te direcionando para o sistema de cadastro");
        Util.esperar(500);
        System.out.print(".");
        Util.esperar(300);
        System.out.print(".");
        Util.esperar(300);
        System.out.println(".");
        Util.esperar(1500);

        Cadastro cadastro = new Cadastro();
        cadastro.cadastrar();
    }
}`,
    lineExplanations: [
      {
        lines: 'Linhas 1 e 2',
        codeSnippet: 'import entrar.Cadastro; import util.Util;',
        text: 'Avisa ao Java que vamos usar a tela de Cadastro e a nossa ferramenta de pausa (Util) nesta inicialização.'
      },
      {
        lines: 'Linha 6',
        codeSnippet: 'public static void main(String[] args)',
        text: 'É a assinatura padrão do Java. Sempre que você clica em rodar, o computador procura exatamente por essa linha para dar o primeiro passo.'
      },
      {
        lines: 'Linhas 7 a 17',
        codeSnippet: 'System.out.println(...); Util.esperar(...);',
        text: 'Exibe a mensagem de boas-vindas com pontinhos aparecendo gradualmente, criando uma animação de carregamento amigável no terminal.'
      },
      {
        lines: 'Linhas 19 e 20',
        codeSnippet: 'Cadastro cadastro = new Cadastro(); cadastro.cadastrar();',
        text: 'Cria o objeto de Cadastro e aciona a função cadastrar(). A partir daqui, quem assume o comando do programa é a tela de cadastro.'
      }
    ],
    summary: 'Vimos como o método Main funciona como o ponto de partida do software, iniciando os primeiros objetos e delegando o fluxo para os módulos responsáveis.'
  },
  {
    id: 4,
    slug: 'modulo-cadastro',
    title: 'Etapa 4: A Portaria e Verificação de Idade (Cadastro.java)',
    file: 'src/entrar/Cadastro.java',
    category: 'Regras de Acesso',
    orderBadge: 'Fase 4: Entrada e Segurança',
    analogy: 'Pense nesta classe como o segurança na entrada de um evento exclusivo. Ele pede os documentos de quem está chegando, confere se a pessoa tem mais de 18 anos e só carimba a entrada se estiver tudo correto.',
    pooConcepts: [
      { name: 'Leitura de Teclado (Scanner)', desc: 'A ponte que pega o texto digitado pela pessoa no teclado e entrega para o código.' },
      { name: 'Regras de Negócio', desc: 'Leis do mundo real traduzidas em código (como a proibição de menores de 18 anos apostarem).' },
      { name: 'Criação de Objetos Dinâmicos', desc: 'Juntar todos os dados digitados e fabricar um Usuario novinho em folha na memória.' }
    ],
    whyItExists: 'Um cassino precisa saber quem é o apostador e proibir menores de idade por razões legais. O Cadastro faz essas perguntas, valida as datas e entrega a ficha do usuário pronta para o menu financeiro.',
    orderReason: 'É a primeira tela com a qual o usuário interage logo após ligar o programa, antes de poder fazer qualquer aposta.',
    code: `package entrar;

import java.time.LocalDate;
import java.time.Period;
import java.time.format.DateTimeFormatter;
import java.util.Scanner;
import saldo.SaldoMenu;
import util.Util;

public class Cadastro {

    Usuario usuario;
    Scanner sc = new Scanner(System.in);

    public boolean cadastrar() {
        System.out.println("Insira seus dados para o cadastro\\n");
        Util.esperar(600);
        System.out.println("Insira seu nome: ");
        String nome = sc.nextLine();
        System.out.println("Insira seu CPF: ");
        String cpf = sc.nextLine();
        System.out.println("Insira sua data de nascimento: ");
        String dataNasc = sc.nextLine();
        System.out.println("Insira seu telefone: ");
        String telefone = sc.nextLine();
        System.out.println("Insira sua senha: ");
        String senha = sc.nextLine();
        Util.esperar(500);

        DateTimeFormatter formatador = DateTimeFormatter.ofPattern("dd/MM/yyyy");
        LocalDate data = LocalDate.parse(dataNasc, formatador);
        boolean verificaIdade = verificaIdade(data);

        if (verificaIdade) {
            usuario = new Usuario(nome, cpf, data, telefone, senha);
            System.out.println("\\n" + nome + ", VOCÊ FOI CADASTRADO COM SUCESSO!");
            Util.esperar(500);
            SaldoMenu saldoMenu = new SaldoMenu(usuario);
            saldoMenu.iniciar();
        } else {
            System.out.println("Usuário menor de idade, não é possível realizar o cadastro. ");
            Cadastro cadastro = new Cadastro();
            cadastro.cadastrar();
        }

        return true;
    }

    public boolean verificaIdade(LocalDate data) {
        LocalDate diaAtual = LocalDate.now();
        return Period.between(data, diaAtual).getYears() >= 18;
    }
}`,
    lineExplanations: [
      {
        lines: 'Linha 13',
        codeSnippet: 'Scanner sc = new Scanner(System.in);',
        text: 'Cria o leitor de teclado. Ele fica esperando o usuário digitar algo e teclar Enter no terminal.'
      },
      {
        lines: 'Linhas 18 a 27',
        codeSnippet: 'String nome = sc.nextLine(); ...',
        text: 'Faz perguntas sequenciais e guarda cada resposta em variáveis temporárias (nome, CPF, senha, etc).'
      },
      {
        lines: 'Linhas 30 a 32',
        codeSnippet: 'LocalDate.parse(dataNasc, formatador);',
        text: 'Converte o texto que o usuário digitou (como 10/05/2000) em um formato de calendário oficial do computador.'
      },
      {
        lines: 'Linhas 49 a 52',
        codeSnippet: 'Period.between(data, diaAtual).getYears() >= 18',
        text: 'Calcula a idade exata subtraindo a data de nascimento do dia de hoje. Se o resultado for 18 ou mais, o acesso é liberado.'
      },
      {
        lines: 'Linhas 35 a 39',
        codeSnippet: 'usuario = new Usuario(...); SaldoMenu saldoMenu = new SaldoMenu(usuario);',
        text: 'Se for maior de idade, fabrica a ficha do usuário com os dados recebidos e abre o menu de saldo passando essa ficha adiante.'
      }
    ],
    summary: 'Aqui você compreendeu como capturar dados do teclado, checar regras de negócio com datas no Java e criar instâncias de objetos apenas quando os dados forem válidos.'
  },
  {
    id: 5,
    slug: 'menu-central-saldo',
    title: 'Etapa 5: O Painel Principal (SaldoMenu.java)',
    file: 'src/saldo/SaldoMenu.java',
    category: 'Navegação e Orquestração',
    orderBadge: 'Fase 5: O Hub de Escolhas',
    analogy: 'Pense nesta classe como a tela inicial de um caixa eletrônico. Ela mostra seu saldo no topo e oferece opções numeradas: sacar, depositar, resgatar presente ou ir aos jogos. Enquanto você não escolher 0 - Sair, ela continuará ativa te atendendo.',
    pooConcepts: [
      { name: 'Passagem de Referência', desc: 'A mesma ficha do usuário circula entre as telas, garantindo que o dinheiro seja sempre o mesmo.' },
      { name: 'Repetição com Critério (do-while)', desc: 'Mantém a tela viva repetindo o menu até que o usuário digite 0.' },
      { name: 'Menu de Escolhas (switch-case)', desc: 'Encaminha o usuário para a ação correta com base no número digitado.' }
    ],
    whyItExists: 'Um programa precisa de uma central onde o usuário possa escolher livremente para onde ir e consultar sua situação financeira a qualquer momento. O SaldoMenu é o cérebro que organiza tudo isso.',
    orderReason: 'Construído logo após o cadastro para receber o usuário aprovado e permitir que ele faça depósitos antes de tentar jogar.',
    code: `package saldo;

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
            System.out.println("\\n===== MENU =====");
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
}`,
    lineExplanations: [
      {
        lines: 'Linhas 12 a 17',
        codeSnippet: 'public SaldoMenu(Usuario usuario) { this.usuario = usuario; }',
        text: 'Recebe o usuário que acabou de se cadastrar ou logar e guarda na sua própria memória para saber de quem é o saldo.'
      },
      {
        lines: 'Linhas 29 e 73',
        codeSnippet: 'do { ... } while (option != 0);',
        text: 'O laço do-while: executa tudo o que está dentro das chaves e só para quando o usuário digitar 0.'
      },
      {
        lines: 'Linhas 41 a 67',
        codeSnippet: 'switch (option) { case 1: ... case 4: ... }',
        text: 'O comando switch analisa qual número foi digitado e direciona para a classe certa (Saque, Deposito, Resgate ou Jogos).'
      },
      {
        lines: 'Linhas 45, 51 e 57',
        codeSnippet: 'usuario.setSaldo(saldo);',
        text: 'Atualiza o saldo oficial dentro da ficha do usuário sempre que uma transação termina com sucesso.'
      }
    ],
    summary: 'Você viu como manter um menu sempre ativo usando loops, como tomar decisões limpas com switch e como atualizar dados de um objeto compartilhado entre telas.'
  },
  {
    id: 6,
    slug: 'operacoes-financeiras',
    title: 'Etapa 6: As Operações de Dinheiro (Deposito.java e Saque.java)',
    file: 'src/saldo/Deposito.java e src/saldo/Saque.java',
    category: 'Operações Financeiras',
    orderBadge: 'Fase 6: O Cofre Modular',
    analogy: 'Imagine ter duas gavetas separadas em uma loja: uma gaveta para receber dinheiro das vendas (Depósito) e outra para troco e retiradas (Saque). Ter gavetas e pessoas responsáveis separadas evita bagunça e erros de contabilidade.',
    pooConcepts: [
      { name: 'Separação de Funções (SRP)', desc: 'Cada classe tem uma única missão bem definida, tornando o código mais fácil de consertar.' },
      { name: 'Parâmetros e Respostas', desc: 'O método recebe quanto dinheiro o usuário tem agora e devolve o novo valor somado ou subtraído.' }
    ],
    whyItExists: 'Se colocássemos a lógica de depósito, saque e bônus tudo misturado dentro do menu, o código ficaria gigante e confuso. Separar cada transação em seu próprio arquivo deixa o projeto organizado e profissional.',
    orderReason: 'Criadas para atender diretamente aos botões 1 e 2 do menu de saldo que construímos na etapa anterior.',
    code: `package saldo;

import java.util.Scanner;

public class Deposito {

    public int iniciar(int saldo) {
        Scanner sc = new Scanner(System.in);
        System.out.println("=======DEPOSITO=======");
        System.out.println("Saldo: R$" + saldo);
        System.out.println("digite o valor de depósito:");
        int deposito = sc.nextInt();

        if (deposito <= 0) {
            System.out.println("Valor inválido! O depósito deve ser positivo.");
            return saldo;
        }

        System.out.println("Depósito confirmado!   ");
        saldo += deposito;
        System.out.println("Saldo: R$" + saldo);
        return saldo;
    }
}`,
    lineExplanations: [
      {
        lines: 'Linha 6',
        codeSnippet: 'public int iniciar(int saldo)',
        text: 'Diz que essa função recebe o saldo atual como entrada e promete devolver o novo saldo como um número inteiro.'
      },
      {
        lines: 'Linhas 12 a 15',
        codeSnippet: 'if (deposito <= 0) { ... return saldo; }',
        text: 'Trava de segurança: impede que alguém digite números negativos para tentar trapacear o sistema.'
      },
      {
        lines: 'Linhas 18 a 20',
        codeSnippet: 'saldo += deposito; return saldo;',
        text: 'Soma a quantia depositada ao saldo antigo e devolve o novo total atualizado.'
      }
    ],
    summary: 'Compreendemos o valor de separar responsabilidades: classes pequenas e focadas são mais fáceis de testar e evitam bugs no restante do sistema.'
  },
  {
    id: 7,
    slug: 'entidade-carta',
    title: 'Etapa 7: O Baralho — A Entidade Carta (Carta.java)',
    file: 'src/jogos/blackjack/Carta.java',
    category: 'Modelagem de Jogos',
    orderBadge: 'Fase 7: Objetos do Baralho',
    analogy: 'Uma carta de baralho na vida real tem duas características principais: o que está escrito nela (ex: Rei de Copas) e quanto ela vale no jogo (10 pontos). Em POO, criamos um objeto que representa exatamente essa carta física.',
    pooConcepts: [
      { name: 'Abstração da Realidade', desc: 'Copiar um objeto real do mundo físico para dentro do computador.' },
      { name: 'Comportamento Visual Próprio', desc: 'A própria carta sabe como desenhar a si mesma na tela com molduras de caracteres.' }
    ],
    whyItExists: 'Para fazer o jogo de Blackjack (21), o computador precisa manipular cartas reais, somar valores de pontos e desenhar cartas na tela. Criar a classe Carta transforma cada carta do baralho em um objeto inteligente.',
    orderReason: 'Desenvolvida antes do jogo de Blackjack, já que a mesa de jogo precisará de cartas para distribuir ao jogador e ao dealer.',
    code: `package jogos.blackjack;

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
}`,
    lineExplanations: [
      {
        lines: 'Linhas 4 a 6',
        codeSnippet: 'String naipe; String numLetra; int valor;',
        text: 'Os três dados de qualquer carta: seu naipe (Espadas, Paus, Copas, Ouros), seu símbolo visível (Ás, 7, Rei) e seu valor em pontos no jogo.'
      },
      {
        lines: 'Linhas 8 a 12',
        codeSnippet: 'public Carta(String naipe, String numLetra, int valor)',
        text: 'O construtor que garante que nenhuma carta nasça em branco. Toda carta criada deve obrigatoriamente ter naipe, símbolo e pontuação.'
      },
      {
        lines: 'Linhas 14 a 22',
        codeSnippet: 'public void mostrarCarta() { ... }',
        text: 'Desenha a carta no terminal usando molduras retangulares. Quando o jogo quer mostrar a carta, ele não precisa redesenhar: basta chamar carta.mostrarCarta().'
      }
    ],
    summary: 'Você viu que em POO os objetos têm dados e ações juntos. A Carta guarda seus pontos e também sabe como se desenhar com capricho na tela.'
  },
  {
    id: 8,
    slug: 'jogo-caca-niquel',
    title: 'Etapa 8: O Primeiro Jogo — Caça-Níquel (CacaNiquel.java)',
    file: 'src/jogos/CacaNiquel.java',
    category: 'Lógica de Jogos',
    orderBadge: 'Fase 8: Sorte e Animação',
    analogy: 'Pense naquelas clássicas máquinas de cassino com alavanca e 3 roletas que giram. Se os três números sorteados forem iguais, as luzes acendem e você ganha 10 vezes o que apostou!',
    pooConcepts: [
      { name: 'Aleatoriedade (Random)', desc: 'Sorteio de números imprevisíveis usando ferramentas da biblioteca padrão do Java.' },
      { name: 'Animação Visual no Terminal', desc: 'Uso do caractere especial \\r para reescrever a linha e simular as roletas girando.' },
      { name: 'Cobrança e Premiação', desc: 'Descontar a aposta se perder ou multiplicar por 10x e creditar na ficha do Usuario se ganhar.' }
    ],
    whyItExists: 'É o primeiro minigame jogável do cassino. Ele mostra como combinar laços de repetição, sorteios aleatórios e matemática para criar diversão interativa no terminal.',
    orderReason: 'Criado assim que o menu de jogos e o saldo do usuário estavam funcionando, permitindo a primeira experiência prática de jogo.',
    code: `package jogos;

import entrar.Usuario;
import java.util.Random;
import java.util.Scanner;
import util.Util;

public class CacaNiquel {

    Usuario usuario;

    public CacaNiquel(Usuario usuario) {
        this.usuario = usuario;
    }

    public void iniciar() {
        Scanner scanner = new Scanner(System.in);
        Random random = new Random();
        int saldo = usuario.getSaldo();

        System.out.println("======= CAÇA-NÍQUEL =======");
        System.out.println("Saldo: R$" + saldo);
        System.out.println("Digite o valor da aposta: ");
        int apostar = Integer.parseInt(scanner.nextLine().trim());

        int numero1 = random.nextInt(5) + 1;
        int numero2 = random.nextInt(5) + 1;
        int numero3 = random.nextInt(5) + 1;

        System.out.println("\\nGirando...\\n");

        for (int i = 0; i < 15; i++) {
            int n1 = random.nextInt(5) + 1;
            System.out.print("\\r[" + n1 + " ? ?]");
            Util.esperar(100);
        }
        System.out.print("\\r[" + numero1 + " ? ?]");
        Util.esperar(500);

        // Repete o giro para o 2º e 3º slot...

        if (numero1 == numero2 && numero2 == numero3) {
            System.out.println("VOCÊ GANHOU!!!");
            saldo += apostar * 10;
        } else {
            System.out.println("Você perdeu.");
            saldo -= apostar;
        }

        usuario.setSaldo(saldo);
        System.out.println("Saldo final: R$ " + saldo);
    }
}`,
    lineExplanations: [
      {
        lines: 'Linha 12',
        codeSnippet: 'public CacaNiquel(Usuario usuario) { this.usuario = usuario; }',
        text: 'Recebe o apostador logado para saber de onde tirar o dinheiro da aposta e para onde mandar o prêmio caso ele vença.'
      },
      {
        lines: 'Linhas 27 a 29',
        codeSnippet: 'int numero1 = random.nextInt(5) + 1;',
        text: 'Gera números aleatórios de 1 a 5 para definir o resultado final de cada uma das 3 roletas.'
      },
      {
        lines: 'Linhas 33 a 37',
        codeSnippet: 'System.out.print("\\r[" + n1 + " ? ?]"); Util.esperar(100);',
        text: 'O truque da animação: o \\r faz o cursor voltar para o início da linha sem pular para baixo, criando o efeito visual das roletas girando.'
      },
      {
        lines: 'Linhas 48 a 55',
        codeSnippet: 'if (numero1 == numero2 && numero2 == numero3) { ... }',
        text: 'Verifica se os três números são rigorosamente iguais. Se forem, paga o prêmio multiplicando a aposta por 10.'
      }
    ],
    summary: 'Vimos como trabalhar com bibliotecas de sorteio aleatório (Random) e aplicar regras de aposta que atualizam diretamente o saldo do nosso objeto Usuario.'
  },
  {
    id: 9,
    slug: 'jogo-blackjack-avancado',
    title: 'Etapa 9: O Jogo do 21 — Blackjack (Blackjack.java)',
    file: 'src/jogos/blackjack/Blackjack.java',
    category: 'POO Completa: Composição',
    orderBadge: 'Fase 9: O Desafio Final',
    analogy: 'Pense em uma mesa de cartas completa em um cassino de verdade. A mesa reúne o jogador, o baralho de cartas e o dealer (a banca). O jogo de Blackjack junta essas diferentes partes para criar uma disputa emocionante.',
    pooConcepts: [
      { name: 'Composição de Objetos', desc: 'Uma classe maior que reúne e comanda objetos menores (Blackjack possui Cartas e Usuario).' },
      { name: 'Listas e Coleções', desc: 'Uso de arrays e ArrayList para controlar o baralho e impedir que uma carta saia duas vezes.' },
      { name: 'Inteligência da Banca (Dealer)', desc: 'A mesa joga sozinha tomando decisões com base nas regras do 21.' }
    ],
    whyItExists: 'O Blackjack é o ápice do projeto. Ele combina tudo o que aprendemos: classes, métodos, controle de saldo, manipulação de baralhos, tratamento especial para o Ás (que pode valer 11 ou 1 ponto) e disputa contra a banca.',
    orderReason: 'É a última etapa porque depende de todas as classes anteriores (Usuario, Carta e Util) já estarem perfeitamente construídas e testadas.',
    code: `package jogos.blackjack;

import entrar.Usuario;
import java.util.ArrayList;
import java.util.Random;
import java.util.Scanner;
import util.Util;

public class Blackjack {

    Usuario usuario;
    String[] baralho = {"AS_COPAS", "2_COPAS", ... , "K_ESPADAS"};
    ArrayList<Integer> cartasSorteadas = new ArrayList<>();
    Carta[] cartasJogador = new Carta[10];
    Carta[] cartasDealer = new Carta[10];

    public Blackjack(Usuario usuario){
        this.usuario = usuario;
    }

    public int tratarValorCarta(String[] partes, int valor, boolean duasPrimeiras) {
        if("AS".equals(partes[0])){
            return duasPrimeiras ? 11 : 1;
        } else if("K".equals(partes[0]) || "Q".equals(partes[0]) || "J".equals(partes[0])){
            return 10;
        } else {
            return Integer.parseInt(partes[0]);
        }
    }

    public void mostrarMesa(boolean dealerEscondeCarta, int d, int j){
        System.out.println("====== Mao dealer: ======");
        for(int i = 0; i < (dealerEscondeCarta ? d - 1 : d); i++){
            if(cartasDealer[i] != null){
                cartasDealer[i].mostrarCarta();
            }
        }
        System.out.println("====== Sua mao: ======");
        for(int i = 0; i < j; i++){
            if(cartasJogador[i] != null){
                cartasJogador[i].mostrarCarta();
            }
        }
    }
}`,
    lineExplanations: [
      {
        lines: 'Linhas 12 a 16',
        codeSnippet: 'Carta[] cartasJogador; Carta[] cartasDealer;',
        text: 'Composição na prática: a classe Blackjack não sabe desenhar cartas; ela apenas guarda listas de objetos da classe Carta e comanda a partida.'
      },
      {
        lines: 'Linhas 22 a 32',
        codeSnippet: 'public int tratarValorCarta(...) { ... }',
        text: 'Regra clássica do 21: figuras (Rei, Dama, Valete) valem 10 pontos fixos, e o Ás vale 11 pontos se for uma das primeiras cartas tiradas.'
      },
      {
        lines: 'Linhas 34 a 48',
        codeSnippet: 'cartasDealer[i].mostrarCarta();',
        text: 'Delegação inteligente: para mostrar a mesa, o Blackjack simplesmente pede para cada carta se desenhar (mostrarCarta()), sem se preocupar com os detalhes de desenho.'
      }
    ],
    summary: 'Você dominou o conceito de Composição em POO: como conectar classes diferentes (Blackjack, Carta e Usuario) para construir sistemas ricos, organizados e fáceis de evoluir.'
  }
];

export const GLOSSARY_ITEMS: GlossaryItem[] = [
  {
    term: 'Classe',
    category: 'Conceito Básico',
    definition: 'O molde ou a fôrma usada para criar objetos. Ela define quais características e ações aquele tipo de coisa terá.',
    example: 'A classe Usuario é a fôrma que diz que todo apostador terá nome e saldo.'
  },
  {
    term: 'Objeto (Instância)',
    category: 'Conceito Básico',
    definition: 'A coisa real e viva criada a partir do molde. É quando a classe sai do papel e ganha vida na memória do computador.',
    example: 'Quando você se cadastra, o sistema cria o seu objeto Usuario específico com o seu nome.'
  },
  {
    term: 'Atributo',
    category: 'Conceito Básico',
    definition: 'Uma característica ou dado guardado dentro de um objeto.',
    example: 'O saldo bancário, o CPF ou o número de telefone do usuário.'
  },
  {
    term: 'Método',
    category: 'Conceito Básico',
    definition: 'Uma ação ou comportamento que o objeto sabe executar.',
    example: 'A carta sabe se desenhar com o método mostrarCarta().'
  },
  {
    term: 'Construtor',
    category: 'Conceito Básico',
    definition: 'A certidão de nascimento do objeto. É o bloco de código que roda no momento exato em que o objeto é criado com new.',
    example: 'Ao criar uma nova Carta, o construtor exige informar naipe e valor.'
  },
  {
    term: 'Encapsulamento',
    category: 'Segurança de Dados',
    definition: 'Guardar os dados importantes em um cofre e disponibilizar botões seguros (Get e Set) para ler ou modificar esses valores.',
    example: 'Usar getSaldo() para ler e setSaldo() para atualizar a quantia sem permitir fraudes diretas.'
  },
  {
    term: 'Composição',
    category: 'Arquitetura',
    definition: 'Quando uma classe maior é feita juntando classes menores (como montar um brinquedo com blocos de Lego).',
    example: 'O jogo Blackjack é composto por várias Cartas e pelo Usuario.'
  },
  {
    term: 'Modificador static',
    category: 'Sintaxe Java',
    definition: 'Indica que uma ferramenta pertence à classe em geral, e não a um objeto individual. Pode ser chamada diretamente.',
    example: 'Util.esperar(500) não precisa de new Util() para funcionar.'
  },
  {
    term: 'Scanner (System.in)',
    category: 'Sintaxe Java',
    definition: 'A ferramenta oficial do Java que escuta o teclado do computador para pegar o que a pessoa digitou.',
    example: 'Usado para ler seu nome e o valor que você deseja apostar.'
  },
  {
    term: 'Tratamento de Erros (try/catch)',
    category: 'Segurança de Dados',
    definition: 'Uma rede de segurança que impede o programa de fechar sozinho caso algum imprevisto aconteça.',
    example: 'Usado na classe Util para evitar que pausas no terminal causem erros inesperados.'
  },
  {
    term: 'Responsabilidade Única (SRP)',
    category: 'Arquitetura',
    definition: 'A boa prática de fazer cada arquivo cuidar apenas da sua própria função, sem misturar tarefas diferentes.',
    example: 'Separar Deposito e Saque em arquivos diferentes em vez de juntar tudo no mesmo menu.'
  }
];
