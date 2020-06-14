import React, { Component } from "react";
import { render } from "react-dom";

const proxy = process.env.REACT_APP_PROXY_URL;

class SelectWinner extends Component {

    setWinner(event)
    {
        fetch(proxy + `http://188.93.210.105:1400/competitions/win`,
        {
            method: 'POST',
            headers: {'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                winner_id: event.target.value, 
                competition_id: this.props.competition.id,
                joust_id: this.props.competition.joust_id
             }),
        }
        )
          .then(res => res.json())
          .then(json => this.setState({ joust: json.joust }));
    }

    render()
    {
        return (
            <div>
                <select onChange={(event) => this.setWinner(event)}>
                    <option value="0" >Выбрать победителя...</option>
                    <option value={this.props.competition.member1}>{this.props.competition.m1_name}</option>
                    <option value={this.props.competition.member2}>{this.props.competition.m2_name}</option>
                </select>
            </div>
        )
    }
}

class CircleTable extends Component {
    renderTable()
    {
        
        return (
            <table border="1" width="100%">
                <tr>
                    <th><h5>Участник 1</h5></th>
                    <th><h5>Участник 2</h5></th>
                    <th><h5>Победитель</h5></th>
                    <th><h5>Дата</h5></th>
                    <th><h5>Статус</h5></th>
                </tr>
                {this.props.joust.copmetitions !== undefined ? this.props.joust.copmetitions.map(competition => {
                    let win = competition.winner_name ? competition.winner_name 
                    : this.props.joust.created_by === (Number)(localStorage.getItem("id")) ? <SelectWinner competition={competition}/> : "Не определено";
                    let status = "";
                    switch(competition.status)
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
                    <tr  className="competition-block">
                        <td><h6>{competition.m1_name}</h6></td>
                        <td><h6>{competition.m2_name}</h6></td>
                        <td><h6>{win}</h6></td>
                        <td><h6>{competition.date_start}</h6></td>
                        <td><h6>{status}</h6></td>
                    </tr>
                    )
                }
                ) : ""}
            </table>
        )
    }

    render()
    {
        return this.renderTable()
        
    }
}

class OlympicTable extends Component {

    renderRow(dataRow, length, spn, parts)
    {
        let row = []
        let partWidth = 100 / parts / spn;
        for (let index = length; index > 0; index--) {
            let line = (<svg >
                <line className="competition-block"  x1="50%" y1="10" x2={index % 2 === 0 ? "100%" : "0%"} y2="100%" style={{stroke: "#167bff", strokeWidth:5}}></line>
            </svg>)
            console.log("stage", dataRow.stage)
            let competition = dataRow[index - 1];
            if(competition.stage === 1)
                line = ""
            let win = competition.winner_name ? competition.winner_name 
                : this.props.joust.created_by === (Number)(localStorage.getItem("id")) ? <SelectWinner competition={competition}/> : "Не определено";
                
            row.push(
                <td id={index} align="center" colspan={spn}>
                    <div className="competition-block" style={{width: partWidth + "%"}}>
                        <h6>{competition.m1_name}</h6>
                        <h5>vs</h5>
                        <h6>{competition.m2_name}</h6>
                        <hr color="#ffffff"></hr>
                        <h5>Победитель</h5>
                        {win}
                    </div>
                    {line}
                </td>
            )
        }
        return row
    }

    renderTable()
    {
        let table = []
        let cspn = 1;
        let maxIndex = this.props.joust.copmetitions ? this.props.joust.copmetitions[0].stage-1 : 1;
        for (let index = maxIndex; index >= 0; index--) {
            let competitionRow = []
            this.props.joust.copmetitions.forEach(competition => {
                if(competition.stage-1 === index)
                    competitionRow.push(competition)
            });
            console.log(competitionRow);
            table.push(
                <tr>
                    {this.renderRow(competitionRow, Math.pow(2, index), cspn, Math.pow(2, maxIndex))}
                </tr>
            )
            cspn *= 2;
        }
        return (
            <table align="center" width="100%" >
                {table}
            </table>
        )
    }

    render()
    {
        return this.renderTable()
        
    }
}

export default class JoustShow extends Component {

    constructor(props)
    {
        
        super(props);
        this.state = {
            joust: {}
        }
        
    }

    compare( a, b ) {
        if ( a.last_nom < b.last_nom ){
          return -1;
        }
        if ( a.last_nom > b.last_nom ){
          return 1;
        }
        return 0;
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
        let id = localStorage.getItem("currentJoustId");
        await fetch(proxy + `http://188.93.210.105:1400/joust/get?id=` + id,
        {
            method: 'GET',
            headers: {'Content-Type': 'application/json' },
        }
        )
          .then(res => res.json())
          .then(json => this.setState({ joust: json.joust }));
    }

    onButtonClick()
    {
        console.log("CLICKED42");
    }

    JoustCard(props)
    {
        //let buttonName = props.joust.created_by === (Number)(localStorage.getItem("id")) ? "Редактировать" : "Записаться";
        let status = "";
        let tourTable = "";

        switch(props.joust.type)
        {
            case 0:
                tourTable = <CircleTable joust={props.joust}/>
                break;
            case 1:
                tourTable = <OlympicTable joust={props.joust}/>
                break;
            default:
                break;
        }

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
        if(props.joust.attendees !== undefined)
            props.joust.attendees.sort((a, b) => (a.score < b.score) ? 1 : -1)
        return (
            <div>
                <div className="joust-header-block">
                    <h2 >{props.joust.name}</h2>
                    <button
                        type="button" 
                        className="btn btn-primary" 
                        align="right" 
                        style={{backgroundColor: "#ffffff"}}
                        onClick={() => {
                            window.open("/joustes", "_self")
                        }}
                    >
                        <h6 style={{color: "#167bff"}}>
                            {props.joust.created_by === (Number)(localStorage.getItem("id")) ? "Редактировать" : "Записаться"}
                            </h6>
                    </button>
                </div>
                <div className="joust-block" color="green">
                    <h4>Описание мероприятия</h4>
                    <h6>{props.joust.description}</h6>
                </div>
                <div className="joust-block" color="green">
                    <h4>Информация о проведении</h4>
                    <p><b>Место проведения: </b>{props.joust.location}</p>
                    <p><b>Даты проведения: </b>{props.joust.date_start} - {props.joust.date_end}</p>
                    <p><b>Статус: </b>{status}</p>
                </div>
                <details>
                    <summary><h4>Участники</h4></summary>
                    {
                        props.joust.attendees !== undefined ? props.joust.attendees.map(attendee => {
                            return (
                                <div className="attendee-block" color="green">
                                    <h5><b>Имя: </b>{attendee.name}</h5>
                                    <h6><b>Количество очков: </b>{attendee.score}</h6>
                                    
                                </div>
                            )
                        }
                    ) : ""
                    }
                </details>
                <details>
                    <summary><h4>Турнирная таблица</h4></summary>
                    {tourTable}
                </details>
            </div>
        );
    }

    render() {
        return (
            <this.JoustCard joust={this.state.joust} />
        );
    }
}
