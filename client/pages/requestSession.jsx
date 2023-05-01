export default function RequestSession() {
    return (
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
                    <form className="form-post" method="POST" action="/api/sessions/requestSession" >
                        <label className="row" htmlFor="subject"> Session Subject </label>
                        <select className="row full-width" name="subject" placeholder="Software Engineering" multiple>
                            <option value="Software Engineering" defaultValue> Software Engineering </option>
                            <option value="Mathematics"> Mathematics </option>
                            <option value="Physics"> Physics </option>
                            <option value="Chemistry"> Chemistry </option>
                        </select>
                        <label className="row" htmlFor="title"> Session Title </label>
                        <input className="row full-width" type="text" name="title" placeholder="Introduction to Web Development and Engineering" />
                        <section className="row d-flex justify-content-between">
                            <div className="col">
                                 {/* TODO */}
                                <label className="row" htmlFor="Date"> Start Date / Time </label>
                                <input className="row half-width" type="date" name="Date" />
                            </div>
                            <div className="col">
                                <label className="row" htmlFor="Duration"> Duration</label>
                                <input className="row half-width" type="text" name="Duration" placeholder="Enter in minutes"/>
                            </div>
                        </section>
                        <label className="row" htmlFor="description"> Session Description </label>
                        <textarea className="row full-width" name="description" rows={5} placeholder="Enter a description for the session" />
                        <label className="row" htmlFor="startBid"> Starting Bids at </label>
                        <input className="row quarter-width" type="number" name="startBid" placeholder="SAR" min={0} step={0.01} />
                        <button className="activeButtonDS btn btn-danger" type="submit" id="requestButton"> Request Session </button>
                    </form>
                </div>
            </div>

        </>
    );
}