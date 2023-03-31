import Router from 'next/router'

export default function EditProfile() {
    return (
        <>
            <div className="editHeader">
                <h1>Edit Profile</h1>
            </div>
            <div className="container">
                <div className="row  editProfile">
                    <div className="col-sm-12 col-md-12 col-lg-6">
                        <form>
                            <div className="row">
                                <div className="row">
                                    <h1 id="details">Details</h1>
                                </div>
                                <label htmlFor="Name" className="Labels">
                                    Name
                                </label>
                            </div>
                            <div className="row">
                                <input type="text" name="Name" className="col paymenyButtons" placeholder="Enter Your Name" />
                            </div>

                            <div className="row">
                                <label htmlFor="Number" className="Labels">
                                    Phone Number
                                </label>
                            </div>
                            <div className="row">
                                <input type="text" name="Number" className="col paymenyButtons" placeholder="+966 xx-xxx-xxxx" />
                            </div>

                            <div className="row">
                                <label htmlFor="Email" className="Labels">
                                    Email
                                </label>
                            </div>
                            <div className="row">
                                <input type="text" name="Email" className="col paymenyButtons" placeholder="xxxxx@gmail.com" />
                            </div>
                            <div className="row">
                                <label htmlFor="DateBirth" className="Labels">
                                    Date of Birth
                                </label>
                            </div>
                            <div className="row">
                                <input type="text" name="DateBirth" className="col paymenyButtons" placeholder="1999-08-31" />
                            </div>
                        </form>
                    </div>
                    <div className="col profileScndClmn">
                        <div className="row" id="profilePic">
                            <img className="col" src="Model.jpeg" alt="Profile pic" id="editPic" />
                        </div>
                        <div className="row">
                            <button className="btn btn-primary profileButton">
                                Edit Picture
                            </button>
                        </div>
                        <div className="row">
                            <button className="btn btn-primary profileButton" onClick={() => Router.push(`/session/1`)}>
                                Preview
                            </button>
                        </div>
                        <div className="row">
                            <button className="btn btn-primary profileButton">
                                Save
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
}
