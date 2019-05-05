import React, { Component } from 'react';
import moment from 'moment';
import axios from 'axios';

import { BASE_URL } from '../../config';

import Board from '../Board';

const repoColumns = { id: "Id", name: "Name", description: "Description", stargazers_count: "Stars" };
const userColumns = { id: "Id", login: "Login", avatar: "Avatar", followers: "Followers" };
class Analytics extends Component {
    constructor(props) {
        super(props);
        this.state = {
            repositories: [],
            users: []
        }
    }

    componentDidMount() {
        this.fetchTopRepositories();
        this.fetchTopUsers();
        setInterval(()=>{this.fetchTopRepositories()},120000)
        setInterval(()=>{this.fetchTopUsers()},120000)

    }

    fetchTopRepositories = () => {
        let lastMonth = moment().subtract(1, 'months').format('YYYY[-]MM[-]DD');
        let url = new URL(`${BASE_URL}search/repositories`);
        let params = {
            q: 'created:>' + lastMonth,
            sort: 'stars',
            order: 'desc'
        }
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
        axios.get(url).then((res) => this.setState({ repositories: res.data.items.slice(0, 5) }));
    }

    fetchTopUsers = () => {
        let lastYear = moment().subtract(1, 'years').format('YYYY[-]MM[-]DD');
        let url = new URL(`${BASE_URL}search/repositories`);
        let params = {
            q: 'created:>' + lastYear,
            sort: 'followers',
            order: 'desc'
        }
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
        axios.get(url).then((res) => {
            const topUsers = res.data.items.slice(0, 5);
            this.setState({ users: topUsers.map(user => (
                {
                  id: user.id,
                  login: user.owner.login,
                  avatar: user.owner.avatar_url,
                  followers: user.watchers
                }
              )) })
        });
    }

    get boardContent() {
        return [
            {
                id: 'hot_repo',
                type: 'Repositories',
                header: 'Top 5 Repositories',
                handleClick: this.fetchTopRepositories,
                content: this.state.repositories,
                columns: repoColumns
            },
            {
                id: 'prolific_users',
                type: 'Users',
                header: 'Top 5 Active Users',
                handleClick: this.fetchTopUsers,
                content: this.state.users,
                columns: userColumns
            },
        ];
    }

    get boards() {
        return this.boardContent.map(board => (
            <>
            <h1>Github Analytics</h1>
            <Board key={board.id} {...board} />
            </>
        ));
    }

    render() {
        return (<div id="app"> {this.boards} </div>);
    }
}



export default Analytics;
