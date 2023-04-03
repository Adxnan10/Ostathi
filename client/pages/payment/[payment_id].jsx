import Card from 'react-bootstrap/Card';
import { useRouter } from 'next/router'
import { useState } from 'react'
import Error from '../error'
import Router from 'next/router'
import { dummySessions } from '/public/fakeDataBase.json'

export default function Payment() {
    const router = useRouter()
    const session_id = router.query.payment_id
    const [sessions, setSessions] = useState([...dummySessions]);
    const [session, setSession] = useState([...sessions.filter((session) => {
        return (
            session.session_id == session_id
        );
    })]);
    try {
        return (
            <>
                <Card className="paymentCard">
                    <Card.Body className="cardBody">

                        <div className="container">
                            <div className="row">
                                <h1 className="col" style={{ margin: '2rem 2rem 0 2rem' }} >Check Out</h1>
                                <h1 className="col" style={{ textAlign: 'end', margin: '3rem 5rem auto 0' }}>{session[0].price} SAR</h1>
                            </div>
                            <div className="row">
                                <p style={{ color: "rgb(130, 130, 130)", margin: "0 0 2rem 3rem" }}>Choose your payment</p>
                            </div>
                            <div className="row row-cols-md-2 row-cols-lg-4 row-cols-xlg-4 paymenyMethod">
                                <img src="/mada.svg" alt="Mada" className="col paymenyMethod" />
                                <img src="/paypal.svg" alt="Paypal" className="col paymenyMethod" />
                                <img src="/visa.svg" alt="Visa" className="col paymenyMethod" />
                                <img src="/mstrcard.svg" alt="Mastercard" className="col paymenyMethod" />
                            </div>

                            <form>
                                <div className="row">
                                    <label for="Name" className="Labels">
                                        Name on Card
                                    </label>
                                </div>
                                <div className="row">
                                    <input type="text" name="Name" className="col paymenyButtons" placeholder="Enter Name on Your Card" />
                                </div>
                                <div className="row">
                                    <label for="Number" className="Labels">
                                        Card Number
                                    </label>
                                </div>
                                <div className="row">
                                    <input type="text" name="Number" className="col paymenyButtons" placeholder="Enter Card Number" />
                                </div>
                                <div className="row">
                                    <label for="MM/YY" className="col Labels">
                                        Expiration Date (MM/YY)
                                    </label>
                                    <label for="CVC" className="col Labels">
                                        Card Number
                                    </label>
                                </div>
                                <div className="row">
                                    <input type="text" name="MM/YY" className="col paymenyButtons" placeholder="Enter Expiration date (09/25)" />
                                    <input type="text" name="CVC" className="col paymenyButtons" placeholder="Enter the CVC" />
                                </div>
                                <div className="row">
                                    <button className="btn btn-danger col paymenyButtons">
                                        Pay Now
                                    </button>
                                </div>
                                <div className="row">
                                    <button className="btn btn-primary col paymenyButtons" id="cancelPayment" onClick={() => Router.push(`/session/${session_id}`)}>
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </Card.Body>
                </Card>
            </>
        );
    } catch (e) {
        return (
            <>
                <Error />
            </>
        );
    }
}