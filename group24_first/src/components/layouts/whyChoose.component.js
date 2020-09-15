import React from "react";

const imgURL = process.env.REACT_APP_IMG_URL;

const WhyChoose = () => {
  return (
    <div className="why-us">
      <div className="container">
      <h2>Why People Choose Us</h2>
        <div className="why">
        
          <div className="row">
            <div className="col-md-3 col-6">
              <div className="why-item">
                <div className="why-icon">
                  <img src={`${imgURL}/payment.png`} alt="PAyment" />
                </div>
                <div className="why-desc">
                  <h5>Secured Payment</h5>
                </div>
              </div>
            </div>
            <div className="col-md-3 col-6">
              <div className="why-item">
                <div className="why-icon">
                  <img src={`${imgURL}/truck.png`} alt="truck" />
                </div>
                <div className="why-desc">
                  <h5>Express Delivery</h5>
                </div>
              </div>
            </div>
            <div className="col-md-3 col-6">
              <div className="why-item">
                <div className="why-icon">
                  <img src={`${imgURL}/check.png`} alt="check" />
                </div>
                <div className="why-desc">
                  <h5>Quality Checked</h5>
                </div>
              </div>
            </div>
            <div className="col-md-3 col-6">
              <div className="why-item">
                <div className="why-icon">
                  <img src={`${imgURL}/cancel.png`} alt="cancel" />
                </div>
                <div className="why-desc">
                  <h5>Easy Returns</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChoose;
