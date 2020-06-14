import React, { Component } from "react";

const proxy = process.env.REACT_APP_PROXY_URL;

export default class Login extends Component {
    
    state = {
        login: "root",
        password: "root",
        data: {}
    }

    handleLoginChange(e) {
        this.setState({login: e.target.value});
    }
    
    handlePasswordChange(e) {
        this.setState({password: e.target.value});
    }

    async login() {
        console.log(this.state.login);
        await fetch(proxy + `http://188.93.210.105:1400/user/auth`,
        {
            method: 'POST',
            headers: {'Content-Type': 'application/json' },
            body: JSON.stringify({ login: this.state.login, password: this.state.password }),
        }
        )
          .then(res => res.json())
          .then(json => this.setState({ data: json }))
          .then(console.log(this.state));
        if(this.state.data.user.id !== undefined)
        {
            localStorage.setItem("login", this.state.login)
            localStorage.setItem("password", this.state.password)
            localStorage.setItem("id", this.state.data.user.id)
            localStorage.setItem("name", this.state.data.user.name)
            window.open("./joustes", '_self');
        }
    }

    componentDidMount() {
        
    }

    render() {
        return (
            <div className="auth-inner">
                <form>
                    <h3>Вход</h3>

                    <div className="form-group">
                        <label>Логин</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Введите логин" 
                            value={this.state.login}
                            onChange={(event) => this.handleLoginChange(event)} 
                        />
                    </div>

                    <div className="form-group">
                        <label>Пароль</label>
                        <input 
                            type="password" 
                            className="form-control" 
                            placeholder="Введите пароль"
                            value={this.state.password} 
                            onChange={(event) => this.handlePasswordChange(event)} 
                        />
                    </div>

                    <button 
                        type="button" 
                        className="btn btn-primary btn-block"
                        onClick={async (e) => await this.login()}
                    >
                        Войти
                    </button>
                    <p className="forgot-password text-right">
                        Нужен аккаунт? <a href="/register">Зарегистрироваться</a>
                    </p>
                </form>
            </div>
            
        );
    }
}
