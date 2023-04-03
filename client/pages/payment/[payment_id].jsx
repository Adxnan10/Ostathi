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
    try{
    return (
        <>
            <Card class="paymentCard">
                <Card.Body class="cardBody">

                    <div class="container">
                        <div class="row">
                            <h1 class="col" style={{ margin: '2rem 2rem 0 2rem' }} >Check Out</h1>
                            <h1 class="col" style={{ textAlign: 'end', margin: '3rem 5rem auto 0' }}>{session[0].price} SAR</h1>
                        </div>
                        <div class="row">
                            <p style={{ color: "rgb(130, 130, 130)", margin: "0 0 2rem 3rem" }}>Choose your payment</p>
                        </div>
                        <div class="row row-cols-md-2 row-cols-lg-4 row-cols-xlg-4 paymenyMethod">
                            <img src="/mada.svg" alt="Mada" class="col paymenyMethod" />
                            <img src="/paypal.svg" alt="Paypal" class="col paymenyMethod" />
                            <img src="/visa.svg" alt="Visa" class="col paymenyMethod" />
                            <img src="/mstrcard.svg" alt="Mastercard" class="col paymenyMethod" />
                        </div>

                        <form>
                            <div class="row">
                                <label for="Name" class="Labels">
                                    Name on Card
                                </label>
                            </div>
                            <div class="row">
                                <input type="text" name="Name" class="col paymenyButtons" placeholder="Enter Name on Your Card" />
                            </div>
                            <div class="row">
                                <label for="Number" class="Labels">
                                    Card Number
                                </label>
                            </div>
                            <div class="row">
                                <input type="text" name="Number" class="col paymenyButtons" placeholder="Enter Card Number" />
                            </div>
                            <div class="row">
                                <label for="MM/YY" class="col Labels">
                                    Expiration Date (MM/YY)
                                </label>
                                <label for="CVC" class="col Labels">
                                    Card Number
                                </label>
                            </div>
                            <div class="row">
                                <input type="text" name="MM/YY" class="col paymenyButtons" placeholder="Enter Expiration date (09/25)" />
                                <input type="text" name="CVC" class="col paymenyButtons" placeholder="Enter the CVC" />
                            </div>
                            <div class="row">
                                <button class="btn btn-danger col paymenyButtons">
                                    Pay Now
                                </button>
                            </div>
                            <div class="row">
                                <button class="btn btn-primary col paymenyButtons" id="cancelPayment" onClick={() => Router.push(`/session/${session_id}`)}>
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </Card.Body>
            </Card>
        </>
    );} catch(e) {
        return(
            <>
            <Error/>
            </>
        );
    }
}