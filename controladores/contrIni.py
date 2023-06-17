from flask import render_template, request
from flask import Blueprint
from sumarizador.extrairConteudo import extrairPDF, extrairLink, extrairTXT
from sumarizador.sumarizar import gerarResumo, gerarNuvem


inicioBP = Blueprint("inicio", __name__)
#caminho = os.path.dirname(os.path.abspath(__file__))
porcent = { '50':'Médio', '75':'Baixo', '25':'Alto'}


# Rota para a página de entrada da app
@inicioBP.route("/", methods=['GET','POST'])
def home():
    return render_template("index.html", title = "Inicio", porcent = porcent)


@inicioBP.route("/conteudo", methods=['GET', 'POST'])
def reducao():
    
    tamRedux = int(request.form['inputReduz'])
    titulo = ''
    conteudo = ''
    
    try:
            
        if request.form['tipoArq'] == 'texto':
            titulo = "Titulo não encontrado."
            conteudo = str(request.form['inputTexto'])
        elif request.form['tipoArq'] == 'link':
            conteudo, titulo = extrairLink(str(request.form['inputLink']))
        elif request.form['tipoArq'] == 'pdf':
            arquivo = request.files['inputPdf']
            if arquivo:
                conteudo, titulo = extrairPDF(arquivo)
        elif request.form['tipoArq'] == 'txt':
            titulo = "Titulo não encontrado."
            arquivo = request.files['inputTxt']
            if arquivo:
                conteudo = extrairTXT(arquivo)
                
        textoResumido, textoOriginal = gerarResumo(str(conteudo), int(tamRedux))
        nuvem = gerarNuvem(conteudo)
        
        return render_template("end.html", title = "Finalizado", resumo = textoResumido, original = textoOriginal ,titulo = str(titulo), nuvem = nuvem)
    except Exception as ect:
        return render_template("erro.html", title = "Erro", erro = str(ect))