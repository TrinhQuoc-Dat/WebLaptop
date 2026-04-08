import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const ServiceCard = ({ image, title, desc, link }) => {
  return (
    <div className="service-card">
      <a href={link || '/dich-vu'}><img src={image} alt={title} className="service-img" /></a>
      <div className="service-info">
        <a href={link || '/dich-vu'}><h3 className="service-title">{title}</h3></a>
        <p className="service-desc">{desc}</p>
        <Link to={link || '/dich-vu'} className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
          Chi tiết <ChevronRight size={16} />
        </Link>
      </div>
    </div>
  );
};

export default ServiceCard;
