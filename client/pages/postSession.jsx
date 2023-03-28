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
            <form className="form-group">
                <label class="row" htmlFor="Subject"> Session Subject </label>
                <select class="row" name="Subject" placeholder="Software Engineering">
                    <option value="Software Engineering" selected> Software Engineering </option>
                    <option value="Mathematics"> Mathematics </option>
                    <option value="Physics"> Physics </option>
                    <option value="Chemistry"> Chemistry </option>
                </select>
            </form>
        </div>
    </div>

</>
    );
}