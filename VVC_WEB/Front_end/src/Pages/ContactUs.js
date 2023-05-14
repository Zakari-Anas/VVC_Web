import React, { useState } from 'react';
import Navbar from './Navbar';

const ContactUs = () => {
 
  return (
    <div class="contact-container">
        <Navbar/>
  <h1>Contact Us</h1>
  <form>
    <input type="text" placeholder="Name" required/>
    <input type="email" placeholder="Email" required/>
    <textarea placeholder="Message" required></textarea>
    <input type="submit" value="Send Message"/>
  </form>
</div>
  );
};

export default ContactUs;
