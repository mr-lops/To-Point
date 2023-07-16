from io import StringIO
from pdfminer.converter import TextConverter
from pdfminer.layout import LAParams
from pdfminer.pdfdocument import PDFDocument
from pdfminer.pdfinterp import PDFResourceManager, PDFPageInterpreter
from pdfminer.pdfpage import PDFPage
from pdfminer.pdfparser import PDFParser
import pdftitle

import wget
import os

import requests
from goose3 import Goose
goo = Goose()

class Excecao(Exception):
    def __init__(self, mensagem):
        super().__init__(mensagem)


def extrairPDF(arquivo):
    conteudo = ''
    titulo = ''
    output_string = StringIO()
    parser = PDFParser(arquivo)
    doc = PDFDocument(parser)
    rsrcmgr = PDFResourceManager()
    device = TextConverter(rsrcmgr, output_string, laparams=LAParams())
    interpreter = PDFPageInterpreter(rsrcmgr, device)
    for page in PDFPage.create_pages(doc):
        interpreter.process_page(page)
    try:
        titulo = pdftitle.get_title_from_io(arquivo)
        titulo = titulo.upper()
    except:
        titulo = "Titulo Não Encontrado!"
    conteudo = str(output_string.getvalue())
    return conteudo, titulo


def extrairTXT(arquivo):
    textoOriginal = arquivo.read().decode('utf-8')
    conteudo = textoOriginal
    return conteudo



def extrairLink(pagina):
    conteudo = ''
    titulo = ''
    req = requests.get(pagina, timeout=5)
    if pagina.endswith(".pdf"):  # tipo WEB e PDF
        if req.status_code == 200:
            arquivo = wget.download(pagina, bar=None)
            output_string = StringIO()
            with open(arquivo, 'rb') as in_file:
                parser = PDFParser(in_file)
                doc = PDFDocument(parser)
                rsrcmgr = PDFResourceManager()
                device = TextConverter(rsrcmgr, output_string, laparams=LAParams())
                interpreter = PDFPageInterpreter(rsrcmgr, device)
                for page in PDFPage.create_pages(doc):
                    interpreter.process_page(page)
                try:
                    titulo = pdftitle.get_title_from_io(in_file)
                except:
                    titulo = "Titulo Não Encontrado!"
            conteudo = str(output_string.getvalue())
            os.remove(arquivo)
        else:
            raise Excecao("Não foi possivel localizar a pagina web!")

    else:  # tipo WEB
        if req.status_code == 200:
            cont = goo.extract(pagina)
            titulo = cont.title
            conteudo = cont.cleaned_text
        else:
            raise Excecao("Não foi possivel localizar a pagina web!")
    return conteudo, titulo