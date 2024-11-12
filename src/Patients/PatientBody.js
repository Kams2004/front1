import React from 'react';
import './PatientBody.css'; // Ensure your CSS file is linked
import 'bootstrap-icons/font/bootstrap-icons.css'; // Import Bootstrap Icons
import LaboratoryResults from './LaboratoryResults'; // Import the new LaboratoryResults component
import ImageryResults from './ImageryResults'; // Import the ImageryResults component
import FunctionalExploration from './FunctionalExploration'; // Import FunctionalExploration
import SettingsContainer from './UserSettingsContainer'; // Import the new SettingsContainer
import { useTranslation } from 'react-i18next'; // Import useTranslation for localization

const PatientBody = ({ selectedComponent }) => {
  const { t } = useTranslation(); // Get translation function
  const today = new Date().toLocaleDateString(); // Get today's date

  const isLabTestSelected = selectedComponent === "Laboratory Tests";
  const isImagerySelected = selectedComponent === "Imagerie";
  const isExplorationSelected = selectedComponent === "Exploration Functionnelle"; // Check if Functional Exploration is selected
  const isSettingsSelected = selectedComponent === "Settings"; // Check if Settings is selected

  return (
    <div className="patient-body-wide">
      <div className="container-grid-wide">
        {/* Always show containers 1, 2, and 3 */}
        
        {/* Imagery Container (Container 1) */}
        <div className="container-wide">
          <i className="bi bi-file-earmark-image icon-wide"></i>
          <h2>{t('imageryResults')}</h2> {/* Updated for translation */}
        </div>

        {/* Lab Test Container (Container 2) */}
        <div className="container-wide">
          <i className="bi bi-lungs icon-wide"></i>
          <h2>{t('labTest')}</h2> {/* Updated for translation */}
        </div>

        {/* Functional Exploration Container (Container 3) */}
        <div className="container-wide">
          <i className="bi bi-activity icon-wide"></i>
          <h2>{t('functionalExploration')}</h2> {/* Updated for translation */}
        </div>
        
        {isLabTestSelected && <LaboratoryResults />}
        {isImagerySelected && <ImageryResults />}
        {isExplorationSelected && <FunctionalExploration />}
        {isSettingsSelected && <SettingsContainer />} 

        {/* Conditionally render Laboratory Results beneath the first three containers */}
        {!(isLabTestSelected || isImagerySelected || isExplorationSelected || isSettingsSelected) && (
          <>
            {/* Show containers 4-9 only when Laboratory Tests is NOT selected */}
            
            {/* Container 4 */}
            <div className="container-wide">
              <div className="header-container-wide">
                <img src="pdmd.png" alt="PDMD Logo" className="header-logo-wide" />
                <div className="header-text-wide">
                  <h3>{t('appTitle')}</h3> {/* Assuming 'appTitle' key exists in your translation */}
                  <p>{today}</p>
                </div>
                <i className="bi bi-three-dots header-icon-wide"></i>
              </div>
              <div className="image-field-wide" style={{ backgroundImage: `url('/IRM.jpg')` }}></div>
              <p className="publication-text-wide">{t('publicationText')}</p> {/* Updated for translation */}
              <hr />
              <div className="interaction-container-wide">
                <div className="interaction-item-wide">
                  <i className="bi bi-hand-thumbs-up"></i>
                  <span>{t('like')}</span> {/* Updated for translation */}
                </div>
                <div className="interaction-item-wide">
                  <i className="bi bi-chat"></i>
                  <span>{t('comment')}</span> {/* Updated for translation */}
                </div>
                <div className="interaction-item-wide">
                  <i className="bi bi-eye"></i>
                  <span>{t('view')}</span> {/* Updated for translation */}
                </div>
              </div>
            </div>

            {/* Container 5 */}
            <div className="container-wide">
              <div className="header-container-wide">
                <img src="pdmd.png" alt="PDMD Logo" className="header-logo-wide" />
                <div className="header-text-wide">
                  <h3>{t('appTitle')}</h3>
                  <p>{today}</p>
                </div>
                <i className="bi bi-three-dots header-icon-wide"></i>
              </div>
              <div className="image-field-wide" style={{ backgroundImage: `url('Electroencephalographe.jpg')` }}></div>
              <p className="publication-text-wide">{t('publicationText')}</p>
              <hr />
              <div className="interaction-container-wide">
                <div className="interaction-item-wide">
                  <i className="bi bi-hand-thumbs-up"></i>
                  <span>{t('like')}</span>
                </div>
                <div className="interaction-item-wide">
                  <i className="bi bi-chat"></i>
                  <span>{t('comment')}</span>
                </div>
                <div className="interaction-item-wide">
                  <i className="bi bi-eye"></i>
                  <span>{t('view')}</span>
                </div>
              </div>
            </div>

            {/* Container 6 */}
            <div className="container-wide">
              <div className="header-container-wide">
                <img src="pdmd.png" alt="PDMD Logo" className="header-logo-wide" />
                <div className="header-text-wide">
                  <h3>{t('appTitle')}</h3>
                  <p>{today}</p>
                </div>
                <i className="bi bi-three-dots header-icon-wide"></i>
              </div>
              <div className="image-field-wide" style={{ backgroundImage: `url('/IRM.jpg')` }}></div>
              <p className="publication-text-wide">{t('publicationText')}</p>
              <hr />
              <div className="interaction-container-wide">
                <div className="interaction-item-wide">
                  <i className="bi bi-hand-thumbs-up"></i>
                  <span>{t('like')}</span>
                </div>
                <div className="interaction-item-wide">
                  <i className="bi bi-chat"></i>
                  <span>{t('comment')}</span>
                </div>
                <div className="interaction-item-wide">
                  <i className="bi bi-eye"></i>
                  <span>{t('view')}</span>
                </div>
              </div>
            </div>

            {/* Container 7 */}
            <div className="container-wide">
              <div className="header-container-wide">
                <img src="pdmd.png" alt="PDMD Logo" className="header-logo-wide" />
                <div className="header-text-wide">
                  <h3>{t('appTitle')}</h3>
                  <p>{today}</p>
                </div>
                <i className="bi bi-three-dots header-icon-wide"></i>
              </div>
              <div className="image-field-wide" style={{ backgroundImage: `url('mri_scan.jpg')` }}></div>
              <p className="publication-text-wide">{t('publicationText')}</p>
              <hr />
              <div className="interaction-container-wide">
                <div className="interaction-item-wide">
                  <i className="bi bi-hand-thumbs-up"></i>
                  <span>{t('like')}</span>
                </div>
                <div className="interaction-item-wide">
                  <i className="bi bi-chat"></i>
                  <span>{t('comment')}</span>
                </div>
                <div className="interaction-item-wide">
                  <i className="bi bi-eye"></i>
                  <span>{t('view')}</span>
                </div>
              </div>
            </div>

            {/* Container 8 */}
            <div className="container-wide">
              <div className="header-container-wide">
                <img src="pdmd.png" alt="PDMD Logo" className="header-logo-wide" />
                <div className="header-text-wide">
                  <h3>{t('appTitle')}</h3>
                  <p>{today}</p>
                </div>
                <i className="bi bi-three-dots header-icon-wide"></i>
              </div>
              <div className="image-field-wide" style={{ backgroundImage: `url('/xray.jpg')` }}></div>
              <p className="publication-text-wide">{t('publicationText')}</p>
              <hr />
              <div className="interaction-container-wide">
                <div className="interaction-item-wide">
                  <i className="bi bi-hand-thumbs-up"></i>
                  <span>{t('like')}</span>
                </div>
                <div className="interaction-item-wide">
                  <i className="bi bi-chat"></i>
                  <span>{t('comment')}</span>
                </div>
                <div className="interaction-item-wide">
                  <i className="bi bi-eye"></i>
                  <span>{t('view')}</span>
                </div>
              </div>
            </div>

            {/* Container 9 */}
            <div className="container-wide">
              <div className="header-container-wide">
                <img src="pdmd.png" alt="PDMD Logo" className="header-logo-wide" />
                <div className="header-text-wide">
                  <h3>{t('appTitle')}</h3>
                  <p>{today}</p>
                </div>
                <i className="bi bi-three-dots header-icon-wide"></i>
              </div>
              <div className="image-field-wide" style={{ backgroundImage: `url('/ct_scan.jpg')` }}></div>
              <p className="publication-text-wide">{t('publicationText')}</p>
              <hr />
              <div className="interaction-container-wide">
                <div className="interaction-item-wide">
                  <i className="bi bi-hand-thumbs-up"></i>
                  <span>{t('like')}</span>
                </div>
                <div className="interaction-item-wide">
                  <i className="bi bi-chat"></i>
                  <span>{t('comment')}</span>
                </div>
                <div className="interaction-item-wide">
                  <i className="bi bi-eye"></i>
                  <span>{t('view')}</span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PatientBody;
