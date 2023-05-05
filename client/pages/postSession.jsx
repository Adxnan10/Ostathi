import { useSession } from "next-auth/react"
import { useRouter } from 'next/router'
import useSWR from 'swr'
import Error from "./error"

const fetcher = (...args) => fetch(...args).then((res) => res.json())


export default function PostSession() {
    const router = useRouter()
    const { data: session, status } = useSession()
    const { data: subjects, error: subjectError, isLoading: loadingSubjects } = useSWR(`/api/subjects/getSubjects`, fetcher)
    if (status !== "authenticated") {
        return <h1 className="404-block d-flex justify-content-center align-items-center" style={{ height: '60vh' }} onClick={() => router.push('/login')}>You're not signed in. click here to sign in</h1>
    }


    const id = session.user.id;
    return (
        <>
            <div className="pageHeaderBar">
                <h1> Post a new session</h1> <br />
                <h3 style={{ fontWeight: 'lighter' }}> Enter the session’s details below </h3>
            </div>

            <div className="container pageContent">
                <div>
                    <h2> Teaching is the greatest act of optimism. </h2>
                    <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmodadipiscing elit, sed do eiusmodLorem ipsum dolor sit amet, consectetur adipiscing elit. </p>
                </div>

                <div className="container">
                    <form className="form-post" method="POST" action="/api/sessions/postSession">
                        <input value={id} name="id" style={{ display: "none" }} />
                        <label className="row" htmlFor="Subject"> Session Subject</label>
                        <select className="row full-width" name="Subject" placeholder="Software Engineering">
                            <option value=''>subject</option>
                            {subjects &&
                                subjects.subjects.map((subject) => {
                                    return (
                                        <option key={subject.id} value={subject.name}>{subject.name}</option>
                                    )
                                })
                            }
                        </select>
                        <label className="row" htmlFor="title"> Session Title </label>
                        <input className="row full-width" type="text" name="title" placeholder="Introduction to Web Development and Engineering" required />
                        <section className="row d-flex justify-content-between">
                            <div className="col">
                                <label className="row" htmlFor="Date"> Start Date / Time </label>
                                <input className="row half-width" type="date" name="Date" required />
                            </div>
                            <div className="col">
                                <label className="row" htmlFor="Duration"> Duration </label>
                                <input className="row half-width" type="text" name="Duration" placeholder="Enter in minutes" required />
                            </div>
                        </section>
                        <section className="row d-flex justify-content-between">
                            <div className="col">
                                <label className="row" htmlFor="Type"> Type </label>
                                <select className="row half-width" name="Type"  >
                                    <option value="Tutoring"> One-to-one session </option>
                                    <option value="Group"> Group session </option>
                                    <option value="Lecture" selected> General lecture </option>
                                </select>
                            </div>
                            <div className="col">
                                <label className="row" htmlFor="Price"> Price </label>
                                <input className="row half-width" type="number" name="Price" placeholder="SAR" min={0} step={0.01} required />
                            </div>
                        </section>
                        <label className="row" htmlFor="Description"> Session Description </label>
                        <textarea className="row full-width" name="Description" rows={7} placeholder="Enter a description for your session" required />
                        <button className="activeButtonDS btn btn-danger" type="submit" id="postButton"> Post Session </button>
                    </form>
                </div>
            </div>

        </>
    );
}