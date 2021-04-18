import React from 'react';
import InputField from './InputField';
import SubmitButton from './SubmitButton';
import UserStore from './stores/UserStore';

class LoginForm extends React.Component{
  
  constructor(props){
    super(props);
    this.state = {
      email: '',
      passsword: '',
      buttonDisabled: false
    }
  }

  setInputValue(property, val){
    val = val.trim();
    if(val.length>122){
      return;
    }
    this.setState({
      [property]: val
    })
  }

  resetForm(){
    this.setState({
      email: '',
      password: '',
      buttonDisabled: false
    })
  }

  async doLogin(){

    if (!this.state.email){
      return;
    }
    if(!this.state.passsword){
      return;
    }
    this.setState({
      buttonDisabled: true
    })
    try{

      let res = await fetch ('/login', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: this.state.email,
          passsword: this.state.passsword
        })
      });
      let result = await res.json();
      if (result && result.success){
        UserStore.isLoggedIn = true;
        UserStore.email = result.email;
      }

      else if (result && result.success === false){
        this.resetForm();
        alert(result.msg);
      }

    }

    catch(e){
      console.log(e)
      this.resetForm();
    }

  }

  render (){
    return (
      <div className="loginForm">
        Log in 
        <InputField
            type='text'
            placeholder='Email'
            value={this.state.email ? this.state.email : ''}
            onChange={ (val) => this.setInputValue('email', val)}
            /> 

        <InputField
            type='password'
            placeholder='password'
            value={this.state.username ? this.state.password : ''}
            onChange={ (val) => this.setInputValue('password', val)}
            /> 

        <SubmitButton
              text='Login'
              disabled={this.state.buttonDisabled}
              onClick={ () => this.doLogin() }
        />

      </div>
    );
  }
}
  
export default LoginForm;
