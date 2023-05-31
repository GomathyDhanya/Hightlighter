from flask import Flask, request, jsonify
from sumy.parsers.html import HtmlParser
from sumy.nlp.tokenizers import Tokenizer
from sumy.summarizers.text_rank import TextRankSummarizer
from sumy.utils import get_stop_words
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/summarize")
def summarize():
    url = request.args.get("url")

    parser = HtmlParser.from_url(url, Tokenizer("english"))
    text = " ".join([str(sentence) for sentence in parser.document.sentences])

    x=len(parser.document.sentences)
    print("num sentences : ",x)


    summarizer = TextRankSummarizer()
    summarizer.stop_words = get_stop_words("english")
    sentences = [str(sentence) for sentence in summarizer(parser.document,x//2)]  
    return jsonify(sentences)

if __name__ == "__main__":
    app.run(host="localhost", port=5001)
