
import java.time.LocalDate;
import java.time.Period;
import java.time.format.DateTimeFormatter;
import java.util.Scanner;

public class Cadastro{
    Usuario usuario;

    public boolean  cadastrar(){

        Scanner sc = new Scanner(System.in);
        System.out.println("Insira seu nome: ");
        String nome = sc.nextLine();
        System.out.println("Insira seu CPF: ");
        String cpf = sc.nextLine();
        System.out.println("Insira sua data de nascimento: ");
        String dataNasc = sc.nextLine();
        System.out.println("Insira seu telefone: ");
        int telefone = sc.nextInt();
        System.out.println("Insira sua senha: ");
        String senha = sc.nextLine();

        DateTimeFormatter formatador = DateTimeFormatter.ofPattern("dd/MM/yyyy");
        LocalDate data = LocalDate.parse(dataNasc, formatador);
        boolean verificaIdade = verificaIdade(data);
        
        if(verificaIdade){
            usuario = new Usuario(nome, cpf, data, telefone, senha);
            System.out.println(nome +", VOCÊ FOI CADASTRADO COM SUCESSO 🎉🎉");
        }


        return true;

    }
    
    public boolean verificaIdade(LocalDate data){
        LocalDate diaAtual = LocalDate.now();
        if(Period.between(data, diaAtual).getYears() >= 18){
            return true;
        }
        else{
            return false;
        }
    }
}