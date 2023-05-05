import Router from 'next/router'
import useSWR from 'swr'
import { useSession } from "next-auth/react"


const fetcher = (...args) => fetch(...args, { method: "GET" }).then((res) => res.json())

export default function EditProfile() {
    const { data: session, status } = useSession()
    const { data, error, isLoading } = useSWR(`/api/user/editProfile?username=${session?.user?.username}`, fetcher)
    if (status === "authenticated") {
        if (isLoading) {
            return (<h1>We are bringing your info</h1>)
        }
        return (
            <>
                <div className="editHeader">
                    <h1>Edit Profile</h1>
                </div>

                <div className="container">
                    <form method='POST' action='/api/user/editProfile'>
                        <input value={session?.user?.id} name="id" style={{ display: "none" }} />
                        <div className="row  editProfile">
                            <div className="col-sm-12 col-md-12 col-lg-6">

                                <div className="row">
                                    <div className="row">
                                        <h1 id="details">Details</h1>
                                    </div>
                                    <label htmlFor="Name" className="Labels">
                                        Name
                                    </label>
                                </div>
                                <div className="row">
                                    <input type="text" name="Name" className="col paymenyButtons" placeholder={data == undefined ? "" : data.name} />
                                </div>

                                <div className="row">
                                    <label htmlFor="Number" className="Labels">
                                        Phone Number
                                    </label>
                                </div>
                                <div className="row">
                                    <input type="text" name="Number" className="col paymenyButtons" placeholder="+966 xx-xxx-xxxx (optional)" />
                                </div>

                                <div className="row">
                                    <label htmlFor="Email" className="Labels">
                                        Email
                                    </label>
                                </div>
                                <div className="row">
                                    <input type="text" name="Email" className="col paymenyButtons" placeholder={data == undefined ? "" : data.email} />
                                </div>
                                <div className="row">
                                    <label htmlFor="DateBirth" className="Labels">
                                        Date of Birth
                                    </label>
                                </div>
                                <div className="row">
                                    <input type="text" name="DateBirth" className="col paymenyButtons" placeholder="1999-08-31 (optional)" />
                                </div>

                            </div>
                            <div className="col profileScndClmn">
                                <div className="row" id="profilePic">
                                    <img className="col" src={data?.profilePicture == undefined ? "Profile.png" : data?.profilePicture} alt="Profile pic" id="editPic" />
                                </div>
                                <div className="row">
                                    <button className="btn btn-primary dis">
                                        Edit Picture
                                    </button>
                                </div>
                                <div className="row">
                                    <button className="btn btn-primary dis" onClick={() => Router.push(`/dashboard?username=${session?.user?.username}&id=${session?.user?.id}`)}>
                                        Preview
                                    </button>
                                </div>
                                <div className="row">
                                    <button className="btn btn-primary profileButton" type="submit">
                                        Save
                                    </button>
                                </div>
                            </div>

                        </div>
                    </form>

                </div>
            </>
        );
    }
    else {
        return (<div className="404-block d-flex justify-content-center align-items-center" style={{ height: '60vh' }}>
            <h1 style={{ color: "#023047" }}>You Are not Signed in<span style={{ color: "#F48C06" }}> Ostathi!</span>.</h1>
        </div>)
    }
}
