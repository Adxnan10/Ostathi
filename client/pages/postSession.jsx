export default function PostSession() {
    return (
        <>
            <div className="pageHeaderBar">
                <h1> Post a new session </h1> <br />
                <h3 style={{ fontWeight: 'lighter' }}> Enter the session’s details below </h3>
            </div>

            <div className="container pageContent">
                <div>
                    <h2> Teaching is the greatest act of optimism. </h2>
                    <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmodadipiscing elit, sed do eiusmodLorem ipsum dolor sit amet, consectetur adipiscing elit. </p>
                </div>

                <div className="container">
                    <form className="form-post" method="POST" action="/api/sessions/postSession">
                        <label className="row" htmlFor="Subject"> Session Subject </label>
                        <select className="row full-width" name="Subject" placeholder="Software Engineering">
                            <option value="Software Engineering" defaultValue> Software Engineering </option>
                            <option value="Mathematics"> Mathematics </option>
                            <option value="Physics"> Physics </option>
                            <option value="Chemistry"> Chemistry </option>
                        </select>
                        <label className="row" htmlFor="title"> Session Title </label>
                        <input className="row full-width" type="text" name="title" placeholder="Introduction to Web Development and Engineering" />
                        <section className="row d-flex justify-content-between">
                            <div className="col">
                                <label className="row" htmlFor="Date"> Start Date / Time </label>
                                <input className="row half-width" type="date" name="Date" />
                            </div>
                            <div className="col">
                                <label className="row" htmlFor="Duration"> Duration </label>
                                <input className="row half-width" type="text" name="Duration" placeholder="Enter in minutes"/>
                            </div>
                        </section>
                        <section className="row d-flex justify-content-between">
                            <div className="col">
                                <label className="row" htmlFor="Type"> Type </label>
                                <select className="row half-width" name="Type"  >
                                    <option value="Tutoring" selected> One-to-one session </option>
                                    <option value="Group"> Group session </option>
                                    <option value="Lecture"> General lecture </option>
                                </select>
                            </div>
                            <div className="col">
                                <label className="row" htmlFor="Price"> Price </label>
                                <input className="row half-width" type="number" name="Price" placeholder="SAR" min={0} step={0.01} />
                            </div>
                        </section>
                        <label className="row" htmlFor="Description"> Session Description </label>
                        <textarea className="row full-width" name="Description" rows={7} placeholder="Enter a description for your session" />
                        <button className="activeButtonDS btn btn-danger" type="submit" id="postButton"> Post Session </button>
                    </form>
                </div>
            </div>

        </>
    );
}