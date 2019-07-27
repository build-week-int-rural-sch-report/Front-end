import React from 'react'
import axios from 'axios'
class SignUp extends React.Component {
    constructor() {
        super();
        this.state= {
            username: '', // required/string/unique
            password: '', // required/string
            name: '',     // required/string
            role_id: 1,  // required/number
            org_id: '',  // required/number
            email: '',  // optional/string/unique
            phone: '', // optional/string/unique
            orgData: [],
            rolesData:[]
          }
    }
    
    componentDidMount(){
        axios.get ('https://irsr-be-dev.herokuapp.com/public/orgs')
        .then(res =>  {this.setState({orgData: res.data})})
        .catch(err => {console.log('Error:', err)})

        axios.get ('https://irsr-be-dev.herokuapp.com/public/roles')
        .then(res =>  {this.setState({rolesData: res.data})})
        .catch(err => {console.log('Error:', err)})
      }

    signUp = (e)=> {
        const {username, password, name, role_id, org_id, email, phone} = this.state
        const newUser = {username, password, name, role_id, org_id, email, phone}
        e.preventDefault();
        axios.post('https://irsr-be-dev.herokuapp.com/auth/register', newUser)
             .then(res => {console.log(res)})
             .catch(err => {console.log(err)})
    }

    changeHandler = (e) => {
        e.preventDefault();
        this.setState({[e.target.name]: e.target.value})
    }

    render() {
        return (
            <div>
                <h2>Create a New Account</h2>
                <form onSubmit={this.signUp}>
                    username:<input type='text'
                        name='username'
                        value={this.state.username}
                        onChange={this.changeHandler} /> <br />
                    password:<input type='password'
                        name='password'
                        value={this.state.password}
                        onChange={this.changeHandler} /> <br />
                    name: <input type='text'
                        name='name'
                        value={this.state.name}
                        onChange={this.changeHandler} /> <br />
                    
                    role_id:<select name='role_id' value={this.state.role_id} onChange={this.changeHandler}>
                               {this.state.rolesData.map((role)=>{return <option key={role.id}value={role.id}>{role.name}</option>})} 
						    </select> <br />
                    org_id: <select name='org_id' value={this.state.org_id} onChange={this.changeHandler}>
						       {this.state.orgData.map((org)=>{return <option key={org.id}value={org.id}>{org.name}</option>})} 
						    </select> <br />
                    
                    email:<input type='text'
                        name='email'
                        placeholder='optional'
                        value={this.state.email}
                        onChange={this.changeHandler} /> <br />
                    phone:<input type='text'
                        name='phone'
                        placeholder='optional'
                        value={this.state.phone}
                        onChange={this.changeHandler} /> <br />
                    <button type='submit'>SignUp</button>
                </form>
            </div>
        )
    }
}

export default SignUp;