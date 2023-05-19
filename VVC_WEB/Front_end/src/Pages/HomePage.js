import React from "react";
import { useState } from "react";
import Navbar from "./Navbar";
import "./css/homePage.css";

function HomePage() {
    const teamMembers = [
        {
            name: "John Doe",
            email: "john@example.com",
            phone: "123-456-7890",
            role: "Developer",
            picture: ""
        },
        {
            name: "John Doe",
            email: "john@example.com",
            phone: "123-456-7890",
            role: "Developer",
            picture: ""
        },
        {
            name: "John Doe",
            email: "john@example.com",
            phone: "123-456-7890",
            role: "Developer",
            picture: "../assets/img/bg.jpg"
        },
        {
            name: "John Doe",
            email: "john@example.com",
            phone: "123-456-7890",
            role: "Developer",
            picture: ""
        },
        // Add more team members here
    ];

    return (
        <div className="home-body justify-content-center min-vh-100">
            <Navbar />

            <div className="container d-flex justify-content-center align-items-center">
                <div className="row">
                    {teamMembers.map((member, index) => (
                        <div className="col-md-4" key={index}>

<div class="card mb-3">
  <div class="row g-0">
    <div class="col-md-4">
      {/* <img src="..." class="img-fluid rounded-start" alt="..."> */}
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">Card title</h5>
        <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
        <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
      </div>
    </div>
  </div>
</div>



                            <div className="card">
                                <img src={member.picture} className="card-img-top" alt={member.name} />
                                <div className="card-body">
                                    <h5 className="card-title">{member.name}</h5>
                                    <p className="card-text">{member.email}</p>
                                    <p className="card-text">{member.phone}</p>
                                    <p className="card-text">{member.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default HomePage;
