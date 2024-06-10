from flask import Flask, render_template
from flask_bootstrap import Bootstrap5
from flask_cors import CORS
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField, validators
from wtforms.validators import DataRequired

app = Flask(__name__)
app.config['SECRET_KEY'] = '8BYkEfBA6O6donzWlSihBXox7C0sKR6b'
Bootstrap5(app)
CORS(app)


class MyForm(FlaskForm):
    name = StringField('Nombre', validators=[DataRequired()])
    email = StringField('Email', validators=[DataRequired(), validators.Length(min=8, max=30), validators.Email()])
    cellphone = StringField("Telefono", validators=[DataRequired()])
    message = StringField("Deja tu mensaje", validators=[DataRequired()])
    submit = SubmitField("Log In")


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/about_us")
def about_us():
    return render_template("about_us.html")


@app.route("/portfolio")
def portfolio():
    return render_template("portfolio.html")


@app.route("/services", methods=["GET", "POST"])
def services():
    form = MyForm()
    if form.validate_on_submit():
        return render_template("services.html")
    return render_template("services.html", form=form)


@app.route("/contact")
def contact():
    return render_template("contact.html")


if __name__ == '__main__':
    app.run(debug=False, host='0.0.0.0')
