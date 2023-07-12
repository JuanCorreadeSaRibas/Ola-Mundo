/*Ids = valor, descricao, dia, ano, mes*/

class Despesa {
    constructor(ano, mes, dia, tipo, descricao, valor){
    
        this.ano = ano
        this.mes = mes
        this.dia = dia
        this.tipo = tipo
        this.descricao = descricao 
        this.valor = valor
    }

    validardados(){
        for(let i in this){
            if(this[i] == undefined || this[i] == '' || this[i] == null){
            return false
        } 
        return true
        }
    }
}

class Bd {
 
    constructor(){
        let id = localStorage.getItem('id')

        if(id === null){
        localStorage.setItem('id', 0)
        }
    }

    getProximoID(){
        let proximoID = localStorage.getItem('id') // null
        return parseInt(proximoID) + 1
    }

    gravar(d){

        let id = this.getProximoID()
        localStorage.setItem(id, JSON.stringify(d))//converter um OBJ literal para uma anotação JSON

        localStorage.setItem('id', id)
    }

    recuperarTodosRegistros(){

        //array de despesas
        let despesas = Array()
        let id = localStorage.getItem('id')
       //Recuperar todas as despesas cadastradas em LocalStorage
       for(let i = 1; i <= id; i++){
        
            //recuperar a despesa
            let despesa = JSON.parse(localStorage.getItem(i))//converter um anotação JSON para um OBJ literal

            //existe a possibilidade de haver índices que foram pulados/removidos
            //nestes casos nós vamos pular esses índices

            if(despesa === null){
                continue 
            }

            despesas.push(despesa)
        }
        return despesas
    }
    
    pesquisar(despesa){
        let despesasFiltradas = Array()
        despesasFiltradas =  this.recuperarTodosRegistros()


        console.log(despesa)
        console.log(despesasFiltradas)


        // ano
        if(despesa.ano != ''){
            console.log('Filtro de ano')
            despesasFiltradas = despesasFiltradas.filter(d => d.ano == despesa.ano)
        }

        // mes
        if(despesa.mes != ''){
            console.log('Filtro de mes')
            despesasFiltradas = despesasFiltradas.filter(d => d.mes == despesa.mes)
        }
        //dia
        if(despesa.dia != ''){
            console.log('Filtro de dia')
            despesasFiltradas = despesasFiltradas.filter(d => d.dia == despesa.dia)
    }
        //tipo
        if(despesa.tipo != ''){
            console.log('Filtro de tipo')
            despesasFiltradas = despesasFiltradas.filter(d => d.tipo == despesa.tipo)
    }
        //descricao
        if(despesa.descricao != ''){
            console.log('Filtro de descrição')
            despesasFiltradas = despesasFiltradas.filter(d => d.descricao == despesa.descricao)
    }
        //valor
        if(despesa.valor != ''){
            console.log('Filtro de valor')
            despesasFiltradas = despesasFiltradas.filter(d => d.valor == despesa.valor)
    }

        console.log(despesasFiltradas)

    }
}


let bd = new Bd()

function cadastrarDespesa() {

    let ano = document.getElementById("ano")
    let mes = document.getElementById("mes")
    let dia = document.getElementById("dia")
    let tipo  =  document.getElementById("tipo")
    let descricao = document.getElementById("descricao")
    let valor =  document.getElementById("valor")
    


     let despesa = new Despesa (
        ano.value,
        mes.value,
        dia.value,
        tipo.value,
        descricao.value,
        valor.value, 

        )

    if(despesa.validardados()){
        bd.gravar(despesa)

        document.getElementById('modal_titulo').innerHTML = 'Registro inserido com sucesso'
        document.getElementById('modal-titulo-div').className = 'modal-header text-success'
        document.getElementById('modal-descricao').innerText = 'Despesa cadastrada com sucesso'
        document.getElementById('botao').innerHTML = "Voltar"  
        document.getElementById('botao').className = "btn btn-success" 

        ano.value =''
        mes.value =''
        ano.value =''
        dia.value = ''
        tipo.value ='0'
        descricao.value =''
        valor.value = ''

        $('#modalRegistraDespesa').modal('show')
    } else {
     
        document.getElementById('modal_titulo').innerHTML = 'Erro na execução do registro'
        document.getElementById('modal-titulo-div').className = 'modal-header text-danger'
        document.getElementById('modal-descricao').innerText = 'Erro na gravação, verifique se todos os campos foram preenchidos corretamente!'
        document.getElementById('botao').innerHTML = "Voltar e corrigir"  
        document.getElementById('botao').className = "btn btn-danger" 
        //dialog de erro

        $('#modalRegistraDespesa').modal('show')
    }
        
}



function carregaListaDespesas() {
    let despesas = Array()

    despesas = bd.recuperarTodosRegistros()


    
   /*
   <tr>
        <td>15/03/2018</td>
        <td>Alimentação</td>
        <td>Compras do mês</td>
        <td>15.158</td>
   */ 

    //percorrer o array despesas, listando cada despesa de forma dinâmica

 
    //selecionando o elemento tbody da tabela
    let listaDespesas = document.getElementById('listaDespesas')
     
    despesas.forEach(function(d){

        //console.log(d)
        //criando (tr)

        var linha = listaDespesas.insertRow();

        //crair as colunas (td)

        linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`
                //Ajustar o tipo
        switch(d.tipo){
        
            case '1': d.tipo = 'Alimentação'
                break
            case '2': d.tipo = 'Educação'
                break
            case '3': d.tipo = 'Lazer'
            break
            case '4': d.tipo = 'Saúde'
            break
            case '5': d.tipo = 'Transporte'
                break
        }
        linha.insertCell(1).innerHTML = d.tipo
        linha.insertCell(2).innerHTML = d.descricao
        linha.insertCell(3).innerHTML = d.valor
        


        

    })
    
}



function pesquisarDespesa() {
    let dia = document.getElementById('dia').value
    let mes = document.getElementById('mes').value
    let ano = document.getElementById('ano').value 
    let tipo = document.getElementById('tipo').value
    let descricao = document.getElementById('descricao').value
    let valor = document.getElementById('valor').value

    let despesa = new Despesa(dia,mes,dia,tipo,descricao,valor)
    bd.pesquisar(despesa)
    

}