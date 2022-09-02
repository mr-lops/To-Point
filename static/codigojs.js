// VERIFICAR SE ARQUIVO É PDF
function VerificarPDF() {
    var fileInput = 
        document.getElementById('inputPdf');
    var filePath = fileInput.value;
    var allowedExtensions = 
/(\.pdf)$/i;
      
    if (!allowedExtensions.exec(filePath)) {
        alert('TIPO DE ARQUIVO INVALIDO!');
        fileInput.value = '';
        return false;
    } else {
        document.getElementById("btGerar").disabled = false
    }
}

// VERIFICAR SE ARQUIVO É TXT
function VerificarTXT() {
    var fileInput = 
        document.getElementById('inputTxt');
    var filePath = fileInput.value;
    var allowedExtensions = 
/(\.txt)$/i;
      
    if (!allowedExtensions.exec(filePath)) {
        alert('TIPO DE ARQUIVO INVALIDO!');
        fileInput.value = '';
        return false;
    } else {
        document.getElementById("btGerar").disabled = false
    }
}

// VERIFICAR LINK
function VerificarLink(link) {
    if( link.length > 10) {
        document.getElementById("btGerar").disabled = false
    } else {
        document.getElementById("btGerar").disabled = true
    }
}

// VERIFICAR TEXTO
function VerificarTexto(texto) {
    if( texto.length >= 800) {
        document.getElementById("btGerar").disabled = false
    } else {
        document.getElementById("btGerar").disabled = true
    }
}

// MUDAR PARA TIPO TEXTO
function mudarTexto() {
    const $select = document.querySelector('#tipoArq');
    $select.value = 'texto'
    document.getElementById('inputLink').value = ''
    document.getElementById('inputPdf').value = ''
    document.getElementById('inputTxt').value = ''
    if( document.getElementById("btGerar").disabled == false) {
        document.getElementById("btGerar").disabled = true
    }
  }
// MUDAR PARA TIPO LINK
function mudarLink() {
    const $select = document.querySelector('#tipoArq');
    $select.value = 'link'
    document.getElementById('inputTexto').value = ''
    document.getElementById('inputPdf').value = ''
    document.getElementById('inputTxt').value = ''
    if( document.getElementById("btGerar").disabled == false) {
        document.getElementById("btGerar").disabled = true
    }
  }
// MUDAR PARA TIPO PDF
function mudarPdf() {
    const $select = document.querySelector('#tipoArq');
    $select.value = 'pdf'
    document.getElementById('inputTexto').value = ''
    document.getElementById('inputLink').value = ''
    document.getElementById('inputTxt').value = ''
    if( document.getElementById("btGerar").disabled == false) {
        document.getElementById("btGerar").disabled = true
    }
  }
// MUDAR PARA TIPO TXT
function mudarTxt() {
    const $select = document.querySelector('#tipoArq');
    $select.value = 'txt'
    document.getElementById('inputTexto').value = ''
    document.getElementById('inputLink').value = ''
    document.getElementById('inputPdf').value = ''
    if( document.getElementById("btGerar").disabled == false) {
        document.getElementById("btGerar").disabled = true
    }
  }


window.onload = function () {
    OpenBootstrapPopup();
};
function OpenBootstrapPopup() {
    $("#simpleModal").modal('show');
}

document.getElementById('somente').onclick = function () {
    if (document.getElementById('somente').checked) {
      document.getElementById("resumo").style.display = "initial";
      document.getElementById("completo").style.display = "none";
    } else {
      document.getElementById("resumo").style.display = "none";
      document.getElementById("completo").style.display = "initial";
    }
}


function exportarPDF() {
    var conteudo = document.getElementById('paraPDF').innerHTML;
    var titulo = document.getElementById("titulo").textContent;
    // CRIA UM OBJETO WINDOW
    var win = window.open('', '', 'height=700,width=700');
    win.document.write('<html><head>');
    win.document.write('<title>' + titulo + '</title>');   // <title> CABEÇALHO DO PDF.
    win.document.write('</head>');
    win.document.write('<body style="margin:10vh">');
    win.document.write(conteudo);                          // O CONTEUDO DA TABELA DENTRO DA TAG BODY
    win.document.write('</body></html>');
    win.document.close(); 	                                         // FECHA A JANELA
    win.print();                                                            // IMPRIME O CONTEUDO
}

function mostrarCar() {
    document.getElementById("carregando").hidden = false;
}

function esconderCar() {
    document.getElementById("carregando").hidden = true;
}


var total_images = 5;
var random_number = Math.floor((Math.random()*total_images));
var random_img = new Array();
random_img[0] = '<a rel="nofollow" href="https://www.udemy.com/"><IMG border="0" alt="Udemy" src="/static/ad1.png"></a>';
random_img[1] = '<a rel="nofollow" href="https://burgerking.com.br/"><IMG border="0" alt="Burger King" src="/static/ad2.jpg"></a>';
random_img[2] = '<a rel="nofollow" href="https://www.duolingo.com/"><IMG border="0" alt="Duolingo" src="/static/ad3.png"></a>';
random_img[3] = '<a rel="nofollow" href="https://shopee.com.br/"><IMG border="0" alt="Shopee" src="/static/ad4.png"></a>';
random_img[4] = '<a rel="nofollow" href="https://www.netshoes.com.br/"><IMG border="0" alt="Netshoes" src="/static/ad5.jpg"></a>';
var div = document.getElementById('ad');
div.innerHTML = div.innerHTML + random_img[random_number];
