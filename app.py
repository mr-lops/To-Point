from flask import Flask
from controladores.contrSobre import sobreBP
from controladores.contrIni import inicioBP

# App
app = Flask(__name__)

# registra os outras rotas
app.register_blueprint(inicioBP)
app.register_blueprint(sobreBP)


# Executa
if __name__ == "__main__":
    app.run(host="0.0.0.0")
