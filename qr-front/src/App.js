import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar.component";
import QRCodeList from "./components/qr-code-list.component";
import EditQR from "./components/edit-qr.component";
import CreateQR from "./components/create-qr.component"
import CreateUser from "./components/create-user.component";

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br/>
        <Route path="/" exact component={QRCodeList}/>
        <Route path="/edit/:id" exact component={EditQR}/>
        <Route path="/create" exact component={CreateQR}/>
        <Route path="/user" exact component={CreateUser}/>
      </div>
    </Router>
  );
}

export default App;
