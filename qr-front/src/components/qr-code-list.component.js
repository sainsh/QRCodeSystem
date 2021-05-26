import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const QrCode = props => (
    <tr>
        <td>{props.qrcode.username}</td>
        <td>{props.qrcode.description}</td>
        <td><img src={"data:image/png;base64, " + props.qrcode.code} alt={props.qrcode.description}/></td>
        <td>{props.qrcode.date.substring(0,10)}</td>
        <td>
            <Link to={"/edit/" + props.qrcode._id}>edit</Link> | <a href="/" onClick={()=> {props.deleteQR(props.qrcode._id)}}>delete</a>
        </td>
    </tr>
)


export default class QRCodeList extends Component{


    constructor(props){
        super(props);

        this.deleteQRCode = this.deleteQRCode.bind(this);

        this.state = { qrcodes: [] };

    }

    componentDidMount(){
        axios.get('http://localhost:5000/qrcodes/')
            .then(res => this.setState({qrcodes: res.data}))
            .catch((error) => {console.log(error)});
    }

    deleteQRCode(id){
        axios.delete('http://localhost:5000/qrcodes/' + id)
            .then(res => console.log(res.data));
        this.setState({
            qrcodes: this.state.qrcodes.filter(el=> el._id !== id)
        })
    }

    qrcodeList(){
        return this.state.qrcodes.map(currentQR => {
            return <QrCode qrcode={currentQR} deleteQR={this.deleteQRCode} key={currentQR._id}/>;
        }) 
    }

    render(){
        return (
            <div>
                <h3>QR Codes</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Username</th>
                            <th>Description</th>
                            <th>Code</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.qrcodeList()}
                    </tbody>
                </table>
            </div>
         )
    }
}