import React, { useRef, useEffect } from 'react';
import Header from '../components/Header';
import './Home.css';
import Teaching from '../assets/classroom.png';
import AssignmentCard from '../components/AssignmentCard';
import AssignmentImg from '../assets/assignment.jpg';
import Thinking from '../assets/onlineexam.png';
import TestMaker from '../assets/exam.png';
import Assignment from '../assets/assignment.png';
import Footer from '../components/Footer';

export default function Home() {
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('card-visible');
          }
        });
      },
      { threshold: 0.3 }
    );

    const cards = document.querySelectorAll('.animated-card');
    cards.forEach((card) => observer.observe(card));

    return () => {
      cards.forEach((card) => observer.unobserve(card));
    };
  }, []);

  return (
    <div className='home-body'>
      <Header />
      <div className='home-top'>
        <div className='welcome-card'>
          <div className='welcome-left'>
            <div className='welcome'>Welcome !</div>
            <div className='welcome-text'>
              Welcome to your own sweet little classroom. Have a nice day & Stay away from the Bullies !
            </div>
          </div>
          <div className='welcome-right'>
            <img src={Teaching} alt='Teaching Illustration' />
          </div>
        </div>

        <div className='start-today'>Start Today !</div>

<div className="card-scroll-wrapper">
  <button className="scroll-btn left" onClick={scrollLeft}>&#x276E;</button>

  <div className="scroll-container">
    <div className="cards" ref={scrollRef}>
      {[...Array(6)].map((_, i) => (
        <AssignmentCard
          key={i}
          className="animated-card"
          avatarLetter="A"
          title="Make Assignments"
          subtitle="Upload PDF & Done !"
          imageSrc={AssignmentImg}
          imageAlt="Assignment Preview"
          heading="Auto Assignment Generator"
          description="Upload your content/portion of the content to make an assignment from & keep your students engaged !"
          buttonText="Start Now"
        />
      ))}
    </div>
  </div>

  <button className="scroll-btn right" onClick={scrollRight}>&#x276F;</button>
</div>
      </div>
      <div className="card-stack">


        <div className="card-bottom">
          <div className="card-bottom-left">
            <div className="card-top-text">Advanced Classroom Meetings</div>
            <div className="card-bottom-text">Schedule online classes like never before. Get real time status of the students, manage </div>
        </div>
        <div className="card-bottom-right"><img src={Thinking} alt="Thinking Illustration"/></div>
      </div>


      <div className="card-bottom" style={{borderRadius: '16px',
border: '1px solid #000'}}>
      <div className="card-bottom-right"><img src={TestMaker} alt="TestMaker Illustration" /></div>
          <div className="card-bottom-left">
            <div className="card-top-text">Test Maker</div>
            <div className="card-bottom-text">Upload your content/portion of the content to make a short/long test from to test your students in both written or MCQ form and assess them in real time. </div>
        </div>
      </div>


      <div className="card-bottom" style={{borderRadius: '16px',
border: '1px solid #000'}}>
          <div className="card-bottom-left">
            <div className="card-top-text">AI Assignment Evaluation</div>
            <div className="card-bottom-text">Upload your content/portion of the content to make a short/long test from to test your students in both written or MCQ form and assess them in real time. </div>
        </div>
        <div className="card-bottom-right"><img src={Assignment} alt="Thinking Illustration" /></div>
      </div>


      </div>
 <Footer />
    </div>
  );
}
