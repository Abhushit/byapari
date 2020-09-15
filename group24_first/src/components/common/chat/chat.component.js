import React, { Component } from "react";
import * as io from "socket.io-client";
import { Icon } from "@iconify/react";
import sendOutlined from "@iconify/icons-ant-design/send-outlined";
import dateUtil from "./../../util/dateUtil";
import notify from './../../util/notify'
import "./chat.component.css";

export default class ChatComponent extends Component {
  constructor() {
    super();
    this.state = {
      data: {
        message: "",
        senderId: "",
        receiverId: "",
        time: "",
        senderName: "",
        receiverName: "",
      },
      messages: [],
      users: [],
      currentUser: null,
    };
  }
  componentDidMount() {
    this.socket = io.connect(process.env.REACT_APP_SOCKET_URL);
    this.runSocket();
    let currentUser = JSON.parse(localStorage.getItem("user"));
    this.socket.emit("new-user", currentUser.username);
    
    this.setState({
      currentUser,
    });
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState((pre) => ({
      data: {
        ...pre.data,
        [name]: value,
      },
    }));
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { data } = this.state;
    if(!data.receiverId){
      return notify.showInfo('Please select a user to continue');
    }
    data.time = new Date();
    data.senderName = this.state.currentUser.username;
    this.socket.emit("new-msg", data);
    this.setState((pre) => ({
      data: {
        ...pre.data,
        message: "",
      },
    }));
  };

  runSocket() {
    this.socket.on("reply-msg", (messageData) => {
      const { messages,data } = this.state;
      messages.push(messageData);
      //swap sender as receiver
      data.receiverId = messageData.senderId;
      this.setState({
        messages,
        data
      });
    });

    this.socket.on("reply-msg-own", (messageData) => {
      const { messages } = this.state;
      messages.push(messageData);
      this.setState({
        messages,
      });
    });


    this.socket.on("users", (users) => {
      this.setState({
        users,
      });
    });
  }

  selectUser(selectedUserId){
    this.setState(pre => ({
      data: {
        ...pre.data,
        receiverId: selectedUserId
      }
    }))
  }

  render() {
    return (
      <div className="">
        <h2>Let's Chat</h2>
        <div className="row">
          <div className="col-md-6">
            <ins>Messages</ins>
            <div className="chat_block">
              <div className="sender-name">
                <p>
                  Chat with{" "}
                  {this.state.currentUser && this.state.currentUser.username}
                </p>
              </div>
              <ul>
                {this.state.messages.map((message, i) => (
                  <li key={i}>
                    <p class="current-user">{message.senderName}</p>
                    <p>{message.message}</p>
                    <p className="light">
                      {dateUtil.relativeTime(message.time)}
                    </p>
                  </li>
                ))}
              </ul>
              <form
                className="form-group form-div"
                onSubmit={this.handleSubmit}
              >
                <input
                  type="text"
                  name="message"
                  value={this.state.data.message}
                  className="form-control input-class"
                  placeholder="your message here..."
                  onChange={this.handleChange}
                />
                <button className="btn-send" type="submit">
                  <Icon icon={sendOutlined} />
                </button>
              </form>
            </div>
          </div>
          <div className="col-md-6">
            <ins>Users</ins>
            <div className="chat_block">
              <ul>
                {this.state.users.map((user, index) => (
                  <li key={index}>
                    <button
                      className="btn btn-default"
                      onClick={() => this.selectUser(user.id)}
                    >
                      {user.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
