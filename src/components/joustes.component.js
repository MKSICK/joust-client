import React, { Component } from "react";

const proxy = process.env.REACT_APP_PROXY_URL;

export default class Joustes extends Component {
    
    constructor(props)
    {
        super(props)
        this.state = {
            joustes: []
        }
    }

    checkLogged()
    {
        let userProfile = {
            login: localStorage.getItem("login"),
            password: localStorage.getItem("password"),
            id: localStorage.getItem("id"),
            name: localStorage.getItem("name")
        }
        if(userProfile.id === undefined || userProfile.id === null)
        {
            window.open("/login", '_self');
        }
    }

    async componentDidMount() {
        this.checkLogged();
        await fetch(proxy + `http://188.93.210.105:1400/joust/getall`,
        {
            method: 'GET',
            headers: {'Content-Type': 'application/json' },
        }
        )
          .then(res => res.json())
          .then(json => this.setState({ joustes: json.joustes }));
          
        console.log(this.state.joustes);
    }

    Joust(props)
    {
        //let buttonName = props.joust.created_by === (Number)(localStorage.getItem("id")) ? "Редактировать" : "Записаться";
        let status = "";
        console.log("status", props.joust.status)
        switch(props.joust.status)
        {
            case 0:
                status = "Будет";
                break;
            case 1:
                status = "Идет";
                break;
            case 2:
                status = "Прошло";
                break;
            default:
                status = "Не указано";
        }
        return (
            <div className="joust-block" color="green">
                <h2>{props.joust.name}</h2>
                <h4>{props.joust.description}</h4>
                <p><b>Место проведения: </b>{props.joust.location}</p>
                <p><b>Даты проведения: </b>{props.joust.date_start} - {props.joust.date_end}</p>
                <p><b>Статус: </b>{status}</p>
                <button
                    type="button" 
                    className="btn btn-primary"
                    id={props.joust.id}
                    onClick={() => {
                        localStorage.setItem("currentJoustId", props.joust.id)
                        window.open("/show-joust", "_self")
                    }}
                >
                    Просмотр
                </button>
            </div>
        );
    }

    renderJoustes()
    {
        console.log(this.state.joustes);
        return this.state.joustes.map(joust => {
                return (
                    <this.Joust
                        joust={joust} 
                    />
                )
            }
        )
    }

    render() {
        let rendered = this !== undefined ? this.renderJoustes() : "Loading...";
        return (
            <div>
                <div className="joust-header-block">
                    <h2 >Спортивные мероприятия</h2>
                    <button
                        type="button" 
                        className="btn btn-primary"  
                        style={{backgroundColor: "#ffffff"}}
                        onClick={() => {
                            localStorage.setItem("editName", "")
                            localStorage.setItem("editType", 0)
                            localStorage.setItem("editDescription", "")
                            localStorage.setItem("editLocation", "")
                            localStorage.setItem("editDateStart", "")
                            localStorage.setItem("editDateEnd", "")
                            localStorage.setItem("currentJoustId", -1)
                            window.open("/edit-joust", "_self")
                        }}
                    >
                    <h6 style={{color: "#167bff"}}>
                        Создать мероприятие
                        </h6>
                    </button> 
                </div>   
            {rendered}
            </div>
        );
    }
}
