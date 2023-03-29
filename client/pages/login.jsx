import { useState } from "react"
import {Container, Row, Col} from 'react-bootstrap'
export default function Login() {
    const [login, setLogin] = useState(true)
    // setLogin(false)
    const register = (e) => {
        setLogin(false)
    }
    const loginfunc = (e) => {
        setLogin(true)
    }

    return (
      <div id="login-main" style = {{backgroundColor: '#023047'}}>

        <div style={{ width: 100+'%', height: 'auto', textAlign: 'center', backgroundColor: "#023047" }}>
            <img className="img-fluid" src="/logo.svg" alt="Logo" />
        </div>
        <Container>
            <Row>
                <Col>
                <div className=" login-sides">
            <div style={{ margin: 10+'rem'}}>
                <p className="login-main-phrase">
                    <span style={{color: "#F48C06"}}> Studying </span> online is now much easier
                </p>
                <p className="login-intro">
                    Ostathi is an interesting platform that will teach you in more an interactive way
                </p>
            </div>
        </div>
                </Col>
                <Col>
            
                <div className="login-sides">
                    
                    {login? 
                    <div className="login-form-box">
                    <div className="login-button-box">
                        <div id="login-btn-highlight">
                        </div>
                        <button type="button" className="login-toggle-btn active-btn-login" onClick={loginfunc}>Login</button>
                        <button type="button" className="login-toggle-btn active-btn-login" onClick={register}>Register</button>
                    </div>
                    
                    <div className="login-form-prompt">
                        <p>Enter you username and password </p>
                    </div>
                    <form className="login-input-group" id="login-form">
                        <label for="username" className="login-form-label">Username</label>
                        <input type="text" className="login-input-field" placeholder="Enter your username" requiered/>
                        <label for="password" className="login-form-label">Password</label>
                        <input type="password" className="login-input-field" placeholder="Enter your password" requiered/>
                        <input type="checkbox" className="login-check-box" /><span id="login-chk-span">Remember me</span>
                        <div className="login-submit-container">
                            <button type="submit" className="login-submit-btn">Login</button>
                        </div>
                    
                    </form>
                    </div>
                    :
                    <div className="login-form-box">
                    <div className="login-button-box">
                        <div id="register-btn-highlight">
                        </div>
                        <button type="button" className="login-toggle-btn active-btn-login" onClick={loginfunc}>Login</button>
                        <button type="button" className="login-toggle-btn active-btn-login" onClick={register}>Register</button>
                    </div>
                    
                    <div className="login-form-prompt">
                        <p>Enter you username and password </p>
                    </div>
                    <form className="login-input-group" id="register-form">
                    <label for="emai;" className="login-form-label">Email</label>
                    <input type="email" className="login-input-field" placeholder="Enter your Email" requiered/>
                    <label for="username" className="login-form-label">Username</label>
                    <input type="text" className="login-input-field" placeholder="Enter your username" requiered/>
                    <label for="password" className="login-form-label">Password</label>
                    <input type="password" className="login-input-field" placeholder="Enter your password" requiered/>
                    {/* <input type="checkbox" className="login-check-box" /><span id="login-chk-span">Agree to terms & conditions</span> */}
                    <div className="login-submit-container">
                        <button type="submit" className="login-submit-btn">Register</button>
                    </div>
                </form>
                </div>
                    }
                    

                    

            </div>
                </Col>
            </Row>
        </Container>
        
        
        
        <script>
            
        </script>
      </div>
      
    )
  }