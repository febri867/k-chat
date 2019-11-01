import React, { Component } from 'react';
import mapStateToProps from './utils/mapState';
import { connect } from 'react-redux'
import ListChat from './Component/ListChat'
import { sendChat, addPerson, changePerson } from "./store/actions";
import Dropdown from 'react-bootstrap/Dropdown';

class App extends Component {

    constructor(props) {
        super(props)

        this.state = {
            text: '',
            name: ''
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleSubmitPerson = this.handleSubmitPerson.bind(this)
    }

    handleInputChange(event) {
        const {
            name,
            value
        } = event.target

        this.setState({
            [name]: value
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        if(this.state.text !== ''){
            let date = new Date()
            this.props.sendChat({text: this.state.text, time: `${date.getHours()}:${date.getMinutes()}`})
        }
        this.refs.inputText.value = ""
        this.state.text = ""
        let messageBody = document.querySelector('.comment-container');
        messageBody.scrollTop = messageBody.scrollHeight - messageBody.clientHeight;
    }

    handleSubmitPerson(event) {
        event.preventDefault();
        if(this.state.name !== ''){
            this.props.addPerson({name: this.state.name, photo_url: ''})
        }
        this.refs.inputPerson.value = ""
        this.state.name = ""
    }

    render() {
        const {
            chat,
            person,
            userIdActive
        } = this.props

        return (
            <div className="chat-container mt-md-5">
                <div className="row h-100">
                    <div className="col-md-6 col-sm-12 offset-md-3 pr-0">
                        <label className="mb-2">Chat room</label>
                        <div className="card h-100">
                            <div className="card-header">
                                <form onSubmit={this.handleSubmitPerson}>
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <Dropdown>
                                                <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                                                    {person.length} persons
                                                </Dropdown.Toggle>

                                                <Dropdown.Menu>
                                                    {
                                                        person.map(user =>  <Dropdown.Item
                                                            key={user.id}
                                                            onClick={
                                                                (event)=> {
                                                                    event.preventDefault()
                                                                    this.props.changePerson(user.id)
                                                                }
                                                            }
                                                        >{user.name}</Dropdown.Item>)
                                                    }
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </div>
                                        <input
                                            name="name"
                                            type="text"
                                            className="form-control"
                                            onChange={this.handleInputChange}
                                            ref="inputPerson"
                                            placeholder="Add members"
                                            aria-label="Add members"
                                        />
                                        <div className="input-group-append">
                                            <button onClick={this.handleSubmitPerson} className="btn btn-outline-secondary" type="submit" >
                                                <img
                                                    alt="send"
                                                    src={window.location.origin + '/btn-add.png'}
                                                    className="s-btn"
                                                />
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="card-body comment-container">
                                {chat.map(item =>
                                    <ListChat
                                        key={item.id}
                                        item={item}
                                        UserIdActive={userIdActive}
                                    />
                                )}
                            </div>
                            <div className="card-footer text-muted">
                                <form onSubmit={this.handleSubmit}>
                                    <div className="input-group">
                                        <input
                                            name="text"
                                            type="text"
                                            className="form-control"
                                            onChange={this.handleInputChange}
                                            ref="inputText"
                                            placeholder="Type something..."
                                            aria-label="Type something..."
                                            aria-describedby="button-addon2"
                                        />
                                        <div className="input-group-append">
                                           <button onClick={this.handleSubmit} className="btn btn-outline-secondary" type="submit" >
                                               <img
                                                   alt="send"
                                                   src={window.location.origin + '/btn-send.png'}
                                                   className="s-btn"
                                               />
                                           </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


const mapState = mapStateToProps('app', ['chat', 'person', 'userIdActive'])
const mapActions = { sendChat, addPerson, changePerson }

export default connect(mapState, mapActions) (App);