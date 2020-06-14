import React, { Component } from "react";

const proxy = process.env.REACT_APP_PROXY_URL;

export default class Joustes extends Component {
    
    state = {
        message : "",
        joust: this.joust
    }

    joust = {
        type: 0,
        name: "",
        description: "",
        created_by: 0,
        location: "",
        date_start: new Date(),
        date_end: new Date()
    } 

    handleNameChange(e) {
        this.joust.name = e.target.value
        this.setState({joust: this.joust});
        console.log(this.state)
    }
    
    handleDescriptionChange(e) {
        this.joust.description = e.target.value
        this.setState({joust: this.joust});
        console.log(this.state)
    }

    handleTypeChange(e) {
        this.joust.type = e.target.value
        this.setState({joust: this.joust});
    }

    handleLocationChange(e) {
        this.joust.location = e.target.value
        this.setState({joust: this.joust});
    }

    handleDateStartChange(e) {
        this.joust.date_start = e.target.value
        this.setState({joust: this.joust});
    }

    handleDateEndChange(e) {
        this.joust.date_end = e.target.value
        this.setState({joust: this.joust});
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

    componentDidMount() {
        this.checkLogged();
    }


    async addJoust() {
        console.log(this.state);
        fetch(proxy + `http://188.93.210.105:1400/joust/add`,
        {
            method: 'POST',
            headers: {'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                type: this.joust.type, 
                name: this.joust.name, 
                description: this.joust.description,
                created_by: localStorage.getItem("id"),
                location: this.joust.location,
                date_start: this.joust.date_start,
                date_end: this.oust.date_end,
            }),
        }
        )
          .then(res => res.json())
          .then(json => this.setState({ data: json }))
          .then(console.log(this.state));
    }

    Joust()
    {
        //let buttonName = props.joust.created_by === (Number)(localStorage.getItem("id")) ? "Редактировать" : "Записаться";
        
        return (
            <div className="joust-block" color="green">
                <h4>
                    <b>Название</b>
                    <br/>
                    <input
                        placeholder="Введите название"
                        onChange={(event) => this.handleNameChange(event)} 
                    >
                    </input>
                </h4>
                <p>
                    <b>Тип системы розыгрыша</b>
                    <br/>
                    <select 
                        onChange={(event) => this.handleTypeChange(event)} >
                        <option value="0">Круговая система розыгрыша</option>
                        <option value="1">Олимпийская система розыгрыша</option>
                </select>
                </p>
                <p>
                    <b>Описание</b>
                    <br/>
                    <textarea
                        placeholder="Введите название"
                        onChange={(event) => this.handleDescriptionChange(event)} 
                        style={{width: "100%", height: 200, align: "center"}}
                    >
                    </textarea>
                </p>
                <p>
                    <b>Место проведения</b>
                    <br/>
                    <textarea
                        placeholder="Введите название места, адрес..."
                        onChange={(event) => this.handleLocationChange(event)} 
                        style={{width: "100%", height: 200, align: "center"}}
                    >
                    </textarea> 
                </p>
                <p>
                    <b>Даты проведения мероприятия</b>
                    <br/>
                    <input
                        onChange={(event) => this.handleDateStartChange(event)} 
                        placeholder="Дата начала..."
                    >
                    </input>
                    <br></br>
                    <input
                        onChange={(event) => this.handleDateEndChange(event)} 
                        placeholder="Дата окончания..."
                    >
                    </input>
                </p>
                    <div align="right">
                    <button 
                        type="button" 
                        className="btn btn-primary"  
                        onClick={async (e) => await this.addJoust()}
                    >
                        <h6>
                            Применить
                        </h6>
                    </button> 
                    </div>
                
            </div>
        );
    }

    render = () => {
        return (
            <div>
                <div className="joust-header-block">
                    <h2 >Редактировать мероприятие</h2>
                    
                </div>   
                <div className="joust-block" color="green">
                <h4>
                    <b>Название</b>
                    <br/>
                    <input
                        placeholder="Введите название"
                        onChange={(event) => this.handleNameChange(event)} 
                    >
                    </input>
                </h4>
                <p>
                    <b>Тип системы розыгрыша</b>
                    <br/>
                    <select 
                        onChange={(event) => this.handleTypeChange(event)} >
                        <option value="0">Круговая система розыгрыша</option>
                        <option value="1">Олимпийская система розыгрыша</option>
                </select>
                </p>
                <p>
                    <b>Описание</b>
                    <br/>
                    <textarea
                        placeholder="Введите название"
                        onChange={(event) => this.handleDescriptionChange(event)} 
                        style={{width: "100%", height: 200, align: "center"}}
                    >
                    </textarea>
                </p>
                <p>
                    <b>Место проведения</b>
                    <br/>
                    <textarea
                        placeholder="Введите название места, адрес..."
                        onChange={(event) => this.handleLocationChange(event)} 
                        style={{width: "100%", height: 200, align: "center"}}
                    >
                    </textarea> 
                </p>
                <p>
                    <b>Даты проведения мероприятия</b>
                    <br/>
                    <input
                        onChange={(event) => this.handleDateStartChange(event)} 
                        placeholder="Дата начала..."
                    >
                    </input>
                    <br></br>
                    <input
                        onChange={(event) => this.handleDateEndChange(event)} 
                        placeholder="Дата окончания..."
                    >
                    </input>
                </p>
                    <div align="right">
                    <button 
                        type="button" 
                        className="btn btn-primary"  
                        onClick={() => console.log(this.state)}
                    >
                        <h6>
                            Применить
                        </h6>
                    </button> 
                    </div>
                
            </div>
            </div>
        );
    }
}
