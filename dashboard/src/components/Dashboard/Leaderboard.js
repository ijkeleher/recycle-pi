import React, { Component } from 'react';
import { Table } from 'semantic-ui-react'
import IotAPI from "../../api";


export default class Leaderboard extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: this.props.name,
            id: this.props.id,
            status: this.props.status

        };
    }



    render() {

        return (

            <div>

                <table class="ui celled table">
                    <thead>
                        <tr><th>Name</th>
                            <th>ID</th>
                            <th>Status</th>

                        </tr></thead>
                    <tbody>
                        <tr>
                            <td data-label="Name">{this.state.name}</td>
                            <td data-label="ID">{this.state.id}</td>
                            <td data-label="Status">{this.state.status}</td>

                        </tr>
                    </tbody>
                </table>


            </div>
        )
    }
}

