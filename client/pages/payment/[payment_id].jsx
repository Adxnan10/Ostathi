import Card from 'react-bootstrap/Card';
import { useRouter } from 'next/router'
import { useState } from 'react'
import Error from '../error'
import Router from 'next/router'
import { useSession } from "next-auth/react"
import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then((res) => res.json())   // To be called by useSWR


export default function Payment() {
    const { data: data, status } = useSession()
    const router = useRouter()
    const session_id = router.query.payment_id
    const { data: session, error, isLoading } = useSWR(`/api/sessions/loadSession?session_id=${session_id}&session_type=post`, fetcher) // Fetches data from the API
    
    try {
        if(status === "authenticated") {
        return (
            <>
                <Card className="paymentCard">
                    <Card.Body className="cardBody">

                        <div className="container">
                            <div className="row">
                                <h1 className="col" style={{ margin: '2rem 2rem 0 2rem' }} >Check Out</h1>
                                <h1 className="col" style={{ textAlign: 'end', margin: '3rem 5rem auto 0' }}>{session.session.price} SAR</h1>
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

                            <form method='POST' action='/api/sessions/registerForSession'>
                                <input value={data?.user?.id} name="user_id" style={{display: "none"}}/>
                                <input value={session_id} name="id" style={{display: "none"}}/>
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
                                    <button className="btn btn-danger col paymenyButtons" type='submit'>
                                        Pay Now
                                    </button>
                                </div>
                                <div className="row">
                                    <button className="btn btn-primary col paymenyButtons" id="cancelPayment" type='button' onClick={() => Router.push(`/searchPage`)}>

                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </Card.Body>
                </Card>
            </>
        ); }
        else {
            return(<div className="404-block d-flex justify-content-center align-items-center" style={{ height: '65vh' }}>
            <h1 style={{ color: "#023047" }}>You Are not Signed in<span style={{ color: "#F48C06" }}> Ostathi!</span>.</h1>
            </div>)
          }
    } catch (e) {
        return (
            <>
                <Error />
            </>
        );
    }
}