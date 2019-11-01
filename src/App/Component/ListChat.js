import React, { Component } from 'react';
import { connect } from 'react-redux'
import { deleteChat } from "./../store/actions";
import mapStateToProps from "../utils/mapState";

class ListChat extends Component {

    render(){
        const {
            item,
            UserIdActive
        } = this.props

        let isSelf = item.user_id === Number(UserIdActive)
        return (
            <div className={"comment-list " + (isSelf ? "self" : "")}>
                <div className="comment-item">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="comment-item__username">
                                <p className="m-0"><b>{isSelf ? 'You' : item.user_name}</b>
                                    {
                                        isSelf ? (
                                            <button
                                                onClick={
                                                    (event)=> {
                                                        event.preventDefault()
                                                        this.props.deleteChat(item.id)
                                                    }
                                                } className="btn btn-link float-right" type="submit"
                                            >
                                                <img
                                                    alt="send"
                                                    src={window.location.origin + '/btn-add.png'}
                                                    className="s-btn close"
                                                />
                                            </button>
                                        ): ''
                                    }
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="comment-item__message">
                                {item.text}
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12">
                            <p className="comment-item__time float-right m-0">{item.time}</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapState = mapStateToProps('app', ['chat'])
const mapActions = { deleteChat }
export default connect( mapState, mapActions ) (ListChat);