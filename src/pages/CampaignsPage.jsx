import React, { useEffect, useState } from "react";
import "../styles/campaigns.css";
import CampaignElement from "../components/CampaignElement";
import PopupComponent from "../components/PopupComponent";
import axios from "axios";

const CampaignsPage = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState("");

  useEffect(() => {
    getCampaigns();
  }, []);

  const getCampaigns = async () => {
    try {
      const response = await axios.get("http://localhost:4001/campaigns");
      setCampaigns(response.data);
      console.log("Response: ", response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleElementClick = (selectedCampaign) => {
    setShowPopup(true);
    setSelectedCampaign(selectedCampaign);
    console.log(selectedCampaign);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div>
      <main>
        <h2>List of Campaigns</h2>
        <div
          className="campaigns-container"
          style={{
            maxHeight: "600px",
            overflowY: "auto",
            scrollBehavior: "smooth",
          }}
        >
          <ul className="campaigns-list">
            {campaigns.map((campaign) => (
              <li
                key={campaign.id}
                onClick={() => handleElementClick(campaign.id)}
              >
                <CampaignElement text={campaign.name} />
                <CampaignElement
                  id="campaign-description"
                  text={campaign.description}
                />
                <CampaignElement text={campaign.goal_amount} />
                <CampaignElement text={campaign.status} />
              </li>
            ))}
          </ul>
        </div>
      </main>
      {showPopup && (
        <div className="popup">
          <PopupComponent
            selectedCampaign={selectedCampaign}
            onClose={handleClosePopup}
          />
        </div>
      )}
    </div>
  );
};

export { CampaignsPage };
