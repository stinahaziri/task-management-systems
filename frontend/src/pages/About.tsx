import "./styles/aboutStyle.css"
import Header from "./header"
import kitee from "./image/kite.png"
function About(){
return(
    <>
<Header/>
<div className="contanier">
    <section className="aboutUs "> 
        <div className="row">
            <div className="colum">
                <div className="background"></div>
                <video className="product-repeater-video" width="601" muted playsInline autoPlay>
                    <source src="https://www.scoro.com/wp-content/uploads/2020/09/2-1_NEW-Planner_v2.mp4"
                        type="video/mp4" />
                </video>
            </div>
            <div className="col">
                <div className="text-contain">
                    <h1>About TaskM</h1>
                    <p>
                        TaskM began as a popular open-source project, but soon grew into a very successful commercial
                        product. For over a
                        decade, we've helped more than 50.000 teams solve their professional problems by making the best
                        possible project
                        management software for creative professionals.
                    </p>
                </div>
            </div>
        </div>
    </section>
    <section className="aboutUs">
        <div className="row">
            <div className="col">
                <div className="text-contain">
                    <h1>TaskM Mission</h1>
                    <p>
                        Just like TaskM itself, the team behind the product is constantly learning and improving.
                        We've made it our
                        mission to help you tackle business challenges efficiently and to remove obstacles towards
                        accomplishing success.
                    </p>
                </div>
            </div>
            <div className="colum">
                <video className="product-repeater-video" width="601" muted playsInline autoPlay>
                    <source src="https://www.scoro.com/wp-content/uploads/2021/02/Gantt_Re-schedule_v2.mp4"
                        type="video/mp4" />
                </video>
            </div>
        </div>
    </section>
    
    <section className="aboutUs">
        <div className="row">
            <div className="colum">
                <video className="product-repeater-video" width="601" muted playsInline autoPlay>
                    <source src="https://www.scoro.com/wp-content/uploads/2020/09/1-2_NEW-Project-details_v2.mp4"
                        type="video/mp4" />
                </video>
            </div>
            <div className="col">
                <div className="text-contain">
                    <h1>Fail fast. Learn. Improve.</h1>
                    <p>
                        With good data and machine learning, two of the most critical cornerstones of business
                        operations, pricing and supply
                        chain, can be transformed from reactive to proactive.
                        Our Platform drives Pricing and Supply Chain Decisions across 3 continents and over 13 million
                        products.
                    </p>
                </div>
            </div>
        </div>
    </section>
    <section className="aboutUs">
        <div className="row">
            <div className="col">
                <div className="text-contain">
                    <h1>Stay connected to the tools you know and love</h1>
                    <p>
                        Get more done by integrating Scoro with the tools you already use. TaskM has highly configurable
                        integrations with
                        popular accounting software, cloud storage solutions, and 1,000+ other tools through Zapier to
                        help you achieve
                        automation.
                    </p>
                </div>
            </div>
            <div className="colum">
                <video className="product-repeater-video" width="601" muted playsInline autoPlay>
                    <source src="https://www.scoro.com/wp-content/uploads/2020/09/5_Unique-Integrations_v3.mp4"
                        type="video/mp4" />
                </video>
            </div>
        </div>
    </section>
</div>

<footer>
    <div className="row">
        <div className="col"><img src={kitee} alt="" /></div>
        <div className="col">
            <ul>
                <li><a href="index.html">Home</a></li>
                <li><a href="about.html">About</a></li>
                <li><a href="news1.html">News</a></li>
            </ul>
            <ul>
                <li><a href="pricing.html">Pricing</a></li>
                <li><a href="contact.html">Contact</a></li>
                <li><a href="signUp.html">Sign</a></li>
            </ul>
        </div>
        <div className="formsFooter">
            <input type="text" placeholder="Enter your email" />
            <button>Get Startet</button>
        </div>
    </div>
</footer>
    </>
)
}
export default About;