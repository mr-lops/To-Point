# Imports
from flask import render_template
from flask import Blueprint

sobreBP = Blueprint("sobre", __name__)

# rota index de sobre
@sobreBP.route('/sobre')
def sobreIndex():
    return render_template("sobre.html", title = "Sobre")

