function abrirMenu() {
    let itens = document.getElementById('itens')
    if (itens.style.display == 'block') {
        itens.style.display = 'none'
    } else {
        itens.style.display = 'block'
    }
}
function mudouTamanho(){
    if(window.innerWidth >= 700){
        itens.style.display='block'
    } else{
        itens.style.display='none'
    }
}