import React, { Component } from "react";

export default class SignUp extends Component {
    render() {
        return (
            <div className="auth-inner">
                <form>
                    <h3>Регистрация</h3>

                    <div className="form-group">
                        <label>Имя</label>
                        <input type="text" className="form-control" placeholder="Введите имя" />
                    </div>

                    <div className="form-group">
                        <label>Логин</label>
                        <input type="text" className="form-control" placeholder="Введите логин" />
                    </div>

                    <div className="form-group">
                        <label>Пароль</label>
                        <input type="password" className="form-control" placeholder="Введите пароль" />
                    </div>

                    <button type="button" className="btn btn-primary btn-block">Зарегистрироваться</button>
                    <p className="forgot-password text-right">
                        Уже зарегистрированы? <a href="/login">Войти</a>
                    </p>
                </form>
            </div>
        );
    }
}