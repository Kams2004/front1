import React, { useState } from 'react';
import './FunctionalExploration.css'; // Import CSS for Functional Exploration
import '@fortawesome/fontawesome-free/css/all.min.css'; // Ensure icons are loaded
import { useTranslation } from 'react-i18next'; // Import useTranslation for localization

const FunctionalExploration = () => {
    const { t } = useTranslation(); // Get translation function
    const [openExaminations, setOpenExaminations] = useState({}); // State for toggling examinations

    const handleDownload = () => {
        const element = document.getElementById('functional-exploration-content');
        const textContent = element.innerText;

        const blob = new Blob([textContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = 'functional_exploration_results.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const toggleExamination = (examName) => {
        setOpenExaminations((prev) => ({
            ...prev,
            [examName]: !prev[examName], // Toggle the specific exam open state
        }));
    };

    return (
        <div className="exploration-container">
            <div className="header-container">
                <h1>{t('functionalExploration')}</h1> {/* Translate the title */}
                <button className="download-button" onClick={handleDownload}>
                    <i className="bi bi-download"></i> {t('download')} {/* Translate "Download" */}
                </button>
            </div>

            <header id="functional-exploration-content">
                <div className="header-row">
                    <div className="header-item">
                        <p><strong>{t('date')}:</strong> 15.09.2024 12:34:56</p> {/* Translate "Date" */}
                    </div>
                    <div className="header-item">
                        <p><strong>{t('prescriber')}:</strong> Dr. MARCEL VIVIAN</p> {/* Translate "Prescripteur" */}
                    </div>
                </div>
                <div className="header-row">
                    <div className="header-item">
                        <p><strong>{t('patient')}:</strong> JOHN, DOE</p> {/* Translate "Patient" */}
                    </div>
                    <div className="header-item">
                        <p><strong>{t('birthDate')}:</strong> 1967-07-07 (57y 2m 8d)</p> {/* Translate "Date de naissance" */}
                    </div>
                </div>
                <div className="header-row">
                    <div className="header-item">
                        <p><strong>{t('sex')}:</strong> Masculin</p> {/* Translate "Sex" */}
                    </div>
                    <div className="header-item">
                        <p><strong>{t('printedOn')}:</strong> 2024-09-25, 10:45:23 (UTC)</p> {/* Translate "Imprimé le" */}
                    </div>
                </div>
            </header>

            {/* Examen Section */}
            <section>
                <h2 className="static-header">{t('examination')}</h2> {/* Translate "Examen" */}

                <div className="examinations">
                    {/* Electroencephalogram (EEG) Examination */}
                    <div>
                        <h3 onClick={() => toggleExamination('EEG')} className="exam-title">
                            {t('eeg')} {/* Translate "Electroencephalogram (EEG)" */}
                            <span className={`icon ${openExaminations['EEG'] ? 'up' : 'down'}`}>
                                <i className={openExaminations['EEG'] ? 'fas fa-chevron-up' : 'fas fa-chevron-down'}></i>
                            </span>
                        </h3>
                        {openExaminations['EEG'] && (
                            <div className="exam-details">
                                <div className="indication">
                                    <p><strong>{t('indication')}:</strong> Seizure activity observation.</p> {/* Translate "Indication" */}
                                </div>
                                <div className="technique">
                                    <p><strong>{t('technique')}:</strong></p> {/* Translate "Technique" */}
                                    <ul>
                                        <li>Standard 20-minute EEG recording with eyes closed.</li>
                                        <li>Additional hyperventilation for 3 minutes.</li>
                                    </ul>
                                </div>
                                <div className="results">
                                    <p><strong>{t('result')}:</strong></p> {/* Translate "Résultat" */}
                                    <ul>
                                        <li>Normal EEG background rhythm.</li>
                                        <li>No epileptiform activity observed.</li>
                                    </ul>
                                </div>
                                <div className="conclusion">
                                    <p><strong>{t('conclusion')}:</strong></p> {/* Translate "Conclusion" */}
                                    <ul>
                                        <li>No evidence of seizure activity.</li>
                                    </ul>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Ionic Trouble Examination */}
                    <div>
                        <h3 onClick={() => toggleExamination('IonicTrouble')} className="exam-title">
                            {t('ionicTrouble')} {/* Translate "Ionic Trouble Examination" */}
                            <span className={`icon ${openExaminations['IonicTrouble'] ? 'up' : 'down'}`}>
                                <i className={openExaminations['IonicTrouble'] ? 'fas fa-chevron-up' : 'fas fa-chevron-down'}></i>
                            </span>
                        </h3>
                        {openExaminations['IonicTrouble'] && (
                            <div className="exam-details">
                                <div className="indication">
                                    <p><strong>{t('indication')}:</strong> Trouble ionique.</p> {/* Translate "Indication" */}
                                </div>
                                <div className="results">
                                    <p><strong>{t('result')}:</strong></p> {/* Translate "Résultat" */}
                                    <ul>
                                        <li>Rythme sinusal régulier avec une FC à 85 BTS / min</li>
                                        <li>Axe QRS : 48°</li>
                                        <li>Repolarisation : T négatif en V1, V2</li>
                                        <li>Conduction : PR = 144ms</li>
                                        <li>Autre : RAS</li>
                                    </ul>
                                </div>
                                <div className="indice">
                                    <p><strong>{t('index')}:</strong></p> {/* Translate "Indice" */}
                                    <ul>
                                        <li>Sokolow : 25 mm</li>
                                        <li>Cornell : 22 mm</li>
                                    </ul>
                                </div>
                                <div className="conclusion">
                                    <p><strong>{t('conclusion')}:</strong></p> {/* Translate "Conclusion" */}
                                    <ul>
                                        <li>SEQUELLE DE NECROSE EN ANTERIEUR</li>
                                        <li>HYPERTROPHIE VENTRICULAIRE GAUCHE DE TYPE DIASTOLIQUE</li>
                                    </ul>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Additional examinations can be added here following the same structure */}
                </div>
            </section>
        </div>
    );
};

export default FunctionalExploration;
