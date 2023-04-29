export default function RequestSession() {
    return (
<<<<<<< HEAD
<>

    <div className="pageHeaderBar">
        <h1> Request a new session </h1> <br/>
        <h3 style={{fontWeight: 'lighter'}}> Enter the session’s requirements below </h3>
    </div>

    <div className="container pageContent">
        <div>
            <h2> Being a student is easy. Learning requires actual work. </h2>
            <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmodadipiscing elit, sed do eiusmodLorem ipsum dolor sit amet, consectetur adipiscing elit. </p>
        </div>

        <div className="container">
            <form className="form-post" method="POST">
                <label class="row" htmlFor="Subject"> Session Subject </label>
                <select class="row full-width" name="Subject" placeholder="Software Engineering">
                    <option value="Software Engineering" selected> Software Engineering </option>
                    <option value="Mathematics"> Mathematics </option>
                    <option value="Physics"> Physics </option>
                    <option value="Chemistry"> Chemistry </option>
                </select>
                <label class="row" htmlFor="Title"> Session Title </label>
                <input class="row full-width" type="text" name="Title" placeholder="Introduction to Web Development and Engineering" />
                <section class="row d-flex justify-content-between">
                    <div className="col">
                        <label class="row" htmlFor="StartDate"> Start Date / Time </label>
                        <input class="row half-width" type="datetime-local" name="StartDate"/>
                    </div>
                    <div className="col">
                        <label class="row" htmlFor="EndDate"> End Date / Time </label>
                        <input class="row half-width" type="datetime-local" name="EndDate"/>
                    </div>
                </section>
                <label class="row" htmlFor="Description"> Session Description </label>
                <textarea class="row full-width" name="Description" rows={5} placeholder="Enter a description for the session" />
                <label class="row" htmlFor="Bids"> Starting Bids at </label>
                <input class="row quarter-width" type="number" name="Price" placeholder="SAR" min={0} step={0.01} />
                <button class="activeButtonDS btn btn-danger" type="submit" id="requestButton"> Request Session </button>
            </form>
        </div>
    </div>

</>
=======
        <>

            <div className="pageHeaderBar">
                <h1> Request a new session </h1> <br />
                <h3 style={{ fontWeight: 'lighter' }}> Enter the session’s requirements below </h3>
            </div>

            <div className="container pageContent">
                <div>
                    <h2> Being a student is easy. Learning requires actual work. </h2>
                    <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmodadipiscing elit, sed do eiusmodLorem ipsum dolor sit amet, consectetur adipiscing elit. </p>
                </div>

                <div className="container">
                    <form className="form-post" method="POST">
                        <label className="row" htmlFor="Subject"> Session Subject </label>
                        <select className="row full-width" name="Subject" placeholder="Software Engineering">
                            <option value="Software Engineering" selected> Software Engineering </option>
                            <option value="Mathematics"> Mathematics </option>
                            <option value="Physics"> Physics </option>
                            <option value="Chemistry"> Chemistry </option>
                        </select>
                        <label className="row" htmlFor="Title"> Session Title </label>
                        <input className="row full-width" type="text" name="Title" placeholder="Introduction to Web Development and Engineering" />
                        <section className="row d-flex justify-content-between">
                            <div className="col">
                                <label className="row" htmlFor="StartDate"> Start Date / Time </label>
                                <input className="row half-width" type="datetime-local" name="StartDate" />
                            </div>
                            <div className="col">
                                <label className="row" htmlFor="EndDate"> End Date / Time </label>
                                <input className="row half-width" type="datetime-local" name="EndDate" />
                            </div>
                        </section>
                        <label className="row" htmlFor="Description"> Session Description </label>
                        <textarea className="row full-width" name="Description" rows={5} placeholder="Enter a description for the session" />
                        <label className="row" htmlFor="Bids"> Starting Bids at </label>
                        <input className="row quarter-width" type="number" name="Price" placeholder="SAR" min={0} step={0.01} />
                        <button className="activeButtonDS btn btn-danger" type="submit" id="requestButton"> Request Session </button>
                    </form>
                </div>
            </div>

        </>
>>>>>>> main
    );
}