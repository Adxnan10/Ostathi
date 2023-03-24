import Button from 'react-bootstrap/Button';


export default function EditProfile(){
    return(
        <>
             <div class="editHeader">
                <h1>Edit Profile</h1>
        </div>
        <div class="container">
            <div class="row  editProfile">
                <div class="col-sm-12 col-md-12 col-lg-6">
                    <form>
                        <div class="row">
                            <div class="row">
                                <h1 id="details">Details</h1>
                            </div>
                           <label for="Name" class="Labels">
                            Name
                        </label> 
                        </div>
                        <div class="row">
                            <input type="text" name="Name" class="col paymenyButtons" placeholder="Enter Your Name"/>
                        </div>

                        <div class="row">
                            <label for="Number" class="Labels">
                                Phone Number
                            </label>
                        </div>
                        <div class="row">
                        <input type="text" name="Number" class="col paymenyButtons" placeholder="+966 xx-xxx-xxxx"/>
                        </div>

                        <div class="row">
                            <label for="Email" class="Labels">
                                Email
                            </label>
                        </div>
                        <div class="row">
                        <input type="text" name="Email" class="col paymenyButtons" placeholder="xxxxx@gmail.com"/>
                        </div>
                        <div class="row">
                            <label for="DateBirth" class="Labels">
                                Date of Birth
                            </label>
                        </div>
                        <div class="row">
                        <input type="text" name="DateBirth" class="col paymenyButtons" placeholder="1999-08-31"/>
                        </div>
                     </form>
                </div>
                <div class="col profileScndClmn">
                    <div class="row" id="profilePic">
                        <img class="col" src="Model.jpeg" alt="Profile pic" id="editPic"/>
                    </div>
                    <div class="row">
                        <button class="btn btn-primary profileButton">
                            Edit Picture
                        </button>
                    </div>
                    <div class="row">
                        <button class="btn btn-primary profileButton">
                            Preview
                        </button>
                    </div>
                    <div class="row">
                        <button class="btn btn-primary profileButton"> 
                            Save
                        </button>
                    </div>
                </div>
            </div>
            
        </div>
        </>
    );
}
