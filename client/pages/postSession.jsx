export default function PostSession() {
    return (
<>
    <div className="pageHeaderBar">
        <h1> Post a new session </h1> <br/>
        <h3 style={{fontWeight: 'lighter'}}> Enter the session’s details below </h3>
    </div>

    <div className="container pageContent">
        <div>
            <h2> Teaching is the greatest act of optimism. </h2>
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
                <section class="row d-flex justify-content-between">
                    <div className="col">
                        <label class="row" htmlFor="Type"> Type </label>
                        <select class="row half-width" name="Type"  >
                            <option value="Tutoring" selected> One-to-one session </option>
                            <option value="Group"> Group session </option>
                            <option value="Lecture"> General lecture </option>
                        </select>
                    </div>
                    <div className="col">
                        <label class="row" htmlFor="Price"> Price </label>
                        <input class="row half-width" type="number" name="Price" placeholder="SAR" min={0} step={0.01} />
                    </div>
                </section>
                <label class="row" htmlFor="Description"> Session Description </label>
                <textarea class="row full-width" name="Description" rows={7} placeholder="Enter a description for your session" />
                <button class="activeButtonDS btn btn-danger" type="submit" id="postButton"> Post Session </button>
            </form>
        </div>
    </div>

</>
    );
}