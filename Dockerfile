FROM python:3.9

WORKDIR /topoint

RUN pip install --upgrade pip

COPY . .

RUN pip install -r requirements.txt
RUN [ "python", "-c", "import nltk; nltk.download(['punkt','stopwords'], download_dir='/usr/local/nltk_data')"]

EXPOSE 5000

CMD ["python","app.py"]
