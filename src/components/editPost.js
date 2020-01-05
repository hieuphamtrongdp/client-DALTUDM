import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import '../css/editpost.css';
import {_editPost} from '../../src/actions/user'
import { connect } from 'react-redux';
import NavBar from './Navbar'

class editPost extends Component {
    constructor(props) {
        super(props);
        let idPost=this.props.match.params.id
        this.state = {
            idPost:idPost,
            content:'',
            hashtag:''
        }
        
    }

    _handleEditPost=()=>{
        const {idPost: _idPost, content, hashtag}= this.state
        const {_editPost}=this.props;
        _editPost(_idPost, content, hashtag)
    }
    onChange = e => {
        this.setState({
            [e.target.id]: e.target.value
        })
        console.log(e.target);
        

    }

    render() {
        let id= this.props.match.params.id;
        console.log({id});
        return (
            <>
                <NavBar/>
                <div className="wrapper wrapperEP">
                    <div className="card cardEP shadow rounded">
                        <div className="card-header card-headerEP">
                            <strong>Chỉnh sửa</strong>
                        </div>
                        <div className="card-body card-bodyEP">
                            <div className="row">
                                <span className="content"><strong>Nội dung</strong></span>
                                <textarea value={this.state.content} id='content' onChange={this.onChange} id="content" className="form-control" rows="4" placeholder="Bạn đang nghĩ gì?" cols="12" rows="5"></textarea>
                            </div>
                            <div className="row">
                                <button onClick={() => { this.upload.click() }} type="button" className="fas fa-image status-button" title="Chọn ảnh">Ảnh/Images</button>
                                <input
                                    value={this.state.hashtag} id='hashtag' onChange={this.onChange}
                                    type="text" class="form-control status-input" placeholder="#Hashtags" />
                                <Link to="/">
                                    <button onClick={this._handleEditPost} className="btn flex-end">Sửa</button>
                                </Link>
                            </div>

                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default connect(null, { _editPost })(editPost)
