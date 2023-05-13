import { signIn, useSession } from "next-auth/react"
import { useState, useRef, useEffect } from "react"
import { Container, Row, Col } from 'react-bootstrap'
import { useRouter } from "next/router"
export default function Login() {
    const { data: session } = useSession()
    const router = useRouter()
    // console.log(router?.query?.error?)
    /* The following refs for login */
    const username = useRef('')
    const password = useRef('')
    /* The following refs for signup */
    const email = useRef('')
    const signUpPassword = useRef('')
    const signUpUsername = useRef('')
    const [showMessage, setShowMessage] = useState(false)
    const [message, setMessage] = useState('')
    const [login, setLogin] = useState(true)
    if (session) {
        return (<div className="404-block d-flex justify-content-center align-items-center" style={{ height: '60vh' }}>
            <h1 style={{ color: "#023047" }}><span style={{ color: "#F48C06" }}> Ostathi, </span>you logged in</h1>
        </div>
        )
    }
    const register = (e) => {
        setLogin(false)
    }
    const loginfunc = (e) => {
        setLogin(true)
    }
    const submitForm = async (e, type) => {
        e.preventDefault()
        if (type == "login") {
            const result = await signIn('credentials', {
                username: username.current.value,
                password: password.current.value,
                redirect: false
            }
            ).then(({ ok, error }) => {
                console.log("Hi")
                if (ok) {
                    router.push("/");
                } else {
                    console.log(error)
                    setMessage("Credentials do not match!");
                    setShowMessage('true')
                }
            }
            )
        } else {
            const userToSignUp = {
                email: email.current.value,
                username: signUpUsername.current.value,
                password: signUpPassword.current.value
            }
            const trySignUp = await fetch("/api/user/signUp", {
                method: 'POST',
                body: JSON.stringify(userToSignUp),
                headers: { "Content-Type": "application/json" }
            })
            const meta = await trySignUp.json()
            setMessage(meta?.msg)
            setShowMessage(true)
        }
    }
    return (
        <div id="login-main" style={{ backgroundColor: '#023047' }}>
            <div style={{ width: 100 + '%', height: 'auto', textAlign: 'center', backgroundColor: "#023047" }}>
                <img className="img-fluid" src="/logo.svg" alt="Logo" />
            </div>
            <Container>
                <Row>
                    <Col>
                        <div className=" login-sides">
                            <div style={{ margin: 10 + 'rem' }}>
                                <p className="login-main-phrase">
                                    <span style={{ color: "#F48C06" }}> Studying </span> online is now much easier
                                </p>
                                <p className="login-intro">
                                    Ostathi is an interesting platform that will teach you in more an interactive way
                                </p>
                            </div>
                        </div>
                    </Col>
                    <Col>
                        <div className="login-sides">
                            {login ?
                                <div className="login-form-box">
                                    <div className="login-button-box">
                                        <div id="login-btn-highlight">
                                        </div>
                                        <button type="button" className="login-toggle-btn active-btn-login" onClick={loginfunc}>Login</button>
                                        <button type="button" className="login-toggle-btn active-btn-login" onClick={register}>Register</button>
                                    </div>
                                    {showMessage && <div style={{ color: 'white', backgroundColor: '#F48C06', opacity: 1, padding: '10px' }}>{message}</div>}
                                    <form className="login-input-group" id="login-form" onSubmit={(e) => submitForm(e, "login")}>
                                        <label htmlFor="username" className="login-form-label">Username</label>
                                        <input type="text" className="login-input-field" placeholder="Enter your username" requiered ref={username} />
                                        <label htmlFor="password" className="login-form-label">Password</label>
                                        <input type="password" className="login-input-field" placeholder="Enter your password" requiered ref={password} />
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
                                    {showMessage && <div style={{ color: 'white', backgroundColor: '#F48C06', opacity: 1, padding: '10px' }}>{message}</div>}
                                    <form className="login-input-group" id="register-form" onSubmit={(e) => submitForm(e, "sign up")}>
                                        <label htmlFor="username" className="login-form-label">Username</label>
                                        <input type="text" className="login-input-field" placeholder="Enter your username" requiered ref={signUpUsername} />
                                        <label htmlFor="password" className="login-form-label">Password</label>
                                        <input type="password" className="login-input-field" placeholder="Enter your password" requiered ref={signUpPassword} />
                                        <label htmlFor="email" className="login-form-label">Email</label>
                                        <input type="email" className="login-input-field" placeholder="Enter your Email" requiered ref={email} />
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