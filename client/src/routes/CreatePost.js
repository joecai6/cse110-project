import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import TitleBar from "../components/TitleBar"
import PostCreate from "../components/PostCreate"


class CreatePost extends React.Component {

    state = { tags_selected: [], tags: [] };

    componentDidMount() {
        axios({
            method: 'get',
            url: 'http://localhost:9000/tags/',
        })
            .then((response) => {
                if (response.data.success) {
                    for (var key in response.data.tags) {
                        var x = response.data.tags[key].key;
                        this.setState({ tags: [...this.state.tags, { key: x, text: x, value: x }] });
                    }
                } else {
                    console.log("bad");
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    sendPost = (event) => {
        event.preventDefault();
        // should tag_ids be in line below
        const { title, postContent } = event.target.elements;
        axios.defaults.withCredentials = true;
        if (title.value.length === 0) {
            alert("Your title is empty! Please fill in a title and try again.")
            return
        } else if (postContent.value.length === 0) {
            alert("Your post is empty! Please fill in the post and try again.")
            return
        } else if (this.state.tags_selected.length === 0) {
            alert("You have no tags selected! Please select at least one tag.")
            return
        }
        axios({
            method: 'post',
            url: 'http://localhost:9000/posts/CreatePost',
            data: {
                title: title.value,
                tag_ids: this.state.tags_selected,
                content: postContent.value,
            },
            withCredentials: true
        })

            .then((response) => {
                if (response.data.success) {
                    // Wait until update processes before redirecting
                    this.props.history.replace('/');
                } else {
                    alert("Post was not created. Try again.");
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    getTags = (event, { value }) => {

        if (value.length > 5) {
            alert("Too many tags selected");
            return;
        } else {
            // tags_selected is value of array
            this.setState({ tags_selected: value });
        }

    }

    render() {
        return (
            <div className={"container"}>
                <div>
                    <TitleBar title="Create New Post" />
                    <div className="posts-container">
                        <form onSubmit={this.sendPost}>
                            <PostCreate dropdownOpt={this.state.tags} dropdownChange={this.getTags.bind(this)} dropdownVal={this.state.tags_selected} />
                        </form>
                    </div>
                </div>
            </div>
        );

    }

}


export default withRouter(CreatePost);