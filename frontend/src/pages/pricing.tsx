import "./styles/pricingStyle.css"
import Header from "./header"
import faqi from "./image/28422267-removebg-preview.png"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import kitee from "./image/kite.png"
import {faBuilding} from '@fortawesome/free-solid-svg-icons'

function Pricing(){
return(
    <>
<Header/>
<section className="pricing">
    <div className="contanier">
      <h1 className="title">The best work solution, for the best price.</h1>
      <div className="row">
        <div className="col-1">
          <h3>Free forever</h3>
          <h5>Best for personal use</h5>
            <h1>Free</h1>
            <h4>forever</h4>
            <a href="contact.html">Free forever</a>
            <ul>
              <li>100MB Storage</li>
              <li>100MB Storage</li>
              <li>Unlimited Tasks</li>
              <li>Unlimited Free Plan Members</li>
              <li>Two-Factor Authentication</li>
              <li>Collaborative Docs</li>
              <li>Whiteboards</li>
              <li>Real-Time Chat</li>
              <li>Email in ClickUp</li>
              <li>Kanban Boards</li>
              <li>Sprint Management</li>
              <li>Native Time Tracking</li>
              <li>In-App Video Recording</li>
              <li>24/7 Support</li>
            </ul>
        </div>
        <div className="col-2">
          <h3>Unlimited</h3>
          <h5>Best for small teams</h5>
            <h1>5</h1>
            <h4>per member per month</h4>
            <a href="contact.html">Get Started</a>
            <ul>
              <li>Unlimited Storage</li>
              <li>Unlimited Integrations</li>
              <li>Unlimited Dashboards</li>
              <li>Guests with Permissions</li>
              <li>Unlimited Gantt Charts</li>
              <li>Unlimited Custom Fields</li>
              <li>Teams (User Groups)</li>
              <li>Goals & Portfolios</li>
              <li>Form View</li>
              <li>Resource Management</li>
              <li>Agile Reporting</li>
            </ul>
        </div>

        <div className="col-3">
          <h3>Business</h3>
          <h5>Best for mid-sized teams</h5>
            <h1>12</h1>
            <h4>per member per month</h4>
            <a href="contact.html">Get Started</a>
            <ul>
              <li>Google SSO</li>
              <li>Unlimited Teams</li>
              <li>Custom Exporting</li>
              <li>Advanced Public Sharing</li>
              <li>Advanced Automations</li>
              <li>Advanced Dashboard Features</li>
              <li>Advanced Time Tracking</li>
              <li>Granular Time Estimates</li>
              <li>Workload Management</li>
              <li>Timelines & Mind Maps</li>
              <li>Goal Folders</li>
            </ul>
        </div>
        <div className="col-4">
          <h3>Business Plus</h3>
          <h5>Best for multiple teams</h5>
            <h1>19</h1>
            <h4>per member per month</h4>
            <a href="contact.html">Contact sales</a>
            <ul>
              <li>Team Sharing</li>
              <li>Unlimited Teams</li>
              <li>Subtasks in Multiple Lists</li>
              <li>Custom Role Creation</li>
              <li>Custom Permissions</li>
              <li>Custom Capacity in Workload</li>
              <li>Increased Automations & API</li>
              <li>Admin Training Webinar</li>
              <li>Priority Support</li>
            </ul>
        </div>
        <div className="col-5">
          <h3>Enterprise</h3>
          <h5>Best for many large teams</h5>
          
            <h1><i> <FontAwesomeIcon icon={faBuilding}/></i></h1>
            <a href="#">Contact sales</a>
            <ul>
              <li>White Labeling</li>
              <li>Advanced Permissions</li>
              <li>Enterprise API</li>
              <li>Unlimited Custom Roles</li>
              <li>Default Personal Views</li>
              <li>MSA & HIPAA Available</li>
              <li>Single Sign-On (SSO)</li>
              <li>Live Onboarding Training</li>
              <li>Dedicated Success Manager</li>
              <li>Access to Managed Services</li>
            </ul>
        </div>
      </div>
    </div>
  </section>

  <section className="getDemo">
    <div className="contanier">
      <div className="row">
        <div className="col">
          <h1>Get a demo</h1>
          <p>Request a demo to see how we can streamline the way your team works.</p>
        </div>
        <div className="col">
          <a href="signUp.html">Request Demo</a>
        </div>
      </div>
    </div>
  </section>

  <section className="faqSection">
    <h1 className="heading">Frequently Asked Questions</h1>
    <div className="faq">
      <div className="imageQuestion">
        <img src={faqi} alt="" />
      </div>
      <div className="question">
        <details>
          <summary>Is there a free version of ProjectManager?</summary>
          <p>Yes! The free version of ProjectManager is called Starter. A Starter account has access to basic task management features like the Task List, can create three projects and can invite two other users to the account. You can always upgrade to any of the paid editions from the Starter edition.</p>
        </details>

        <details>
          <summary>Which plan is right for me?</summary>
          <p>It all depends on your project goals. The Gantt chart is available on the Team edition, and portfolio management features are available on the Business edition.</p>
        </details>

        <details>
          <summary>Can I change my plan?</summary>
          <p>If you are on the Starter edition, you can change your plan to a paid edition at any time. If you are on a paid edition, you can move to another paid edition.</p>
        </details>

        <details>
          <summary>What are the different types of licenses?</summary>
          <p>You can customize roles on both the Account and Project level. At the Account level, a team member can be an Admin, Manager, Member or a Custom Role. All roles require a license to access the software. In addition to Account level roles, team members can have custom security access per project, including Edit, Manage or Collaborate access.</p>
        </details>

        <details>
          <summary>What happens after my 30 day trial?</summary>
          <p>When your 30 day free trial ends, you'll be automatically downgraded to the free Starter edition unless you decide to purchase one of the paid editions.</p>
        </details>
      </div>
    </div>
  </section>

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
export default Pricing;