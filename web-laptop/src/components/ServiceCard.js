import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const ServiceCard = ({ image, title, desc, link }) => {
  return (
    <div className="service-card">
      <img src={image} alt={title} className="service-img" />
      <div className="service-info">
        <h3 className="service-title">{title}</h3>
        <p className="service-desc">{desc}</p>
        <Link to={link || '/dich-vu'} className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
          Chi tiết <ChevronRight size={16} />
        </Link>
      </div>
    </div>
  );
};

export default ServiceCard;
