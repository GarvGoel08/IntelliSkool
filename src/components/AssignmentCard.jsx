import React from 'react';
import './AssignmentCard.css';
import { Link } from 'react-router-dom';

const AssignmentCard = ({
  avatarLetter = "A",
  title = "Make Assignments",
  subtitle = "Upload PDF & Done !",
  imageSrc = "",
  imageAlt = "Assignment Preview",
  heading = "Auto Assignment Generator",
  description = "Upload your content/portion of the content to make an assignment from & keep your students engaged !",
  buttonText = "Get Started",
  onClick = () => {}
}) => {
  return (
    <div className="assignment-card">
      <div className="card-header">
        <div className="avatar">{avatarLetter}</div>
        <div className="card-text">
          <h3 className="title">{title}</h3>
          <p className="subtitle">{subtitle}</p>
        </div>
        <div className="options">⋮</div>
      </div>

      <div className="card-image">
        <img src={imageSrc} alt={imageAlt} />
      </div>

      <div className="card-body">
        <h4 className="card-heading">{heading}</h4>
        <p className="card-description">{description}</p>
        <Link to="/login"><div className="btn-flex"><button className="card-button">{buttonText}</button></div></Link>
      </div>
    </div>
  );
};

export default AssignmentCard;
