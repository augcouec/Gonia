import React from "react";

const ProjectCard = (props) => {
  return (
    <div className="card-container">
      <a href={`projects/${props.project._id}`}>
        <div className="line-1">
          <span className="product-name">{props.project.product.name}</span>
          <span
            className={`product-status product-status--${props.project.status}`}
          >
            {props.project.status}
          </span>
        </div>
        <div className="product-code-sku mb--xs">
          <span className="product-label">Code Sku : </span>
          <span className="product-sku">{props.project.product.sku}</span>
        </div>
        <div className="product-category-container  mb--xs">
          <span className="product-label">Categorie : </span>
          <span className="product-category">
            {props.project.product.category}
          </span>
        </div>
        <div className="product-client-container  mb--xs">
          <span className="product-label">Client : </span>
          <span className="product-client">
            {props.project.client.firstname}
          </span>
        </div>

        {props.project.infographiste && (
          <div>
            <span className="product-label">Modélisé par :</span>
            <span>{props.project.infographiste.firstname}</span>
          </div>
        )}
      </a>
    </div>
  );
};

export default ProjectCard;
