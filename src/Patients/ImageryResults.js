import React, { useState } from 'react';
import './ImageryResults.css'; // Ensure to import your CSS
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useTranslation } from 'react-i18next'; // Import useTranslation for localization

const ImageryResults = () => {
    const { t } = useTranslation(); // Get translation function
    const [openExaminations, setOpenExaminations] = useState({}); // State for toggling examinations

    const handleDownload = () => {
        const element = document.getElementById('imagery-report-content');
        const textContent = element.innerText;

        const blob = new Blob([textContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = 'imagery_results.txt';
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
        <div className="report-container">
            <div className="header-container">
                <h1>{t('imageryResults')}</h1> {/* Translate the title */}
                <button className="download-button" onClick={handleDownload}>
                    <i className="bi bi-download"></i> {t('download')} {/* Translate "Download" */}
                </button>
            </div>

            <header id="imagery-report-content">
                <div className="header-row">
                    <div className="header-item">
                        <p><strong>{t('date')}:</strong> 01.02.2024 08:18:56</p> {/* Translate "Date" */}
                    </div>
                    <div className="header-item">
                        <p><strong>{t('prescriber')}:</strong> ANNICK MELANIE, Dr. MAGNEROU</p> {/* Translate "Prescripteur" */}
                    </div>
                </div>
                <div className="header-row">
                    <div className="header-item">
                        <p><strong>{t('patient')}:</strong> DAVID, KALA</p> {/* Translate "Patient" */}
                    </div>
                    <div className="header-item">
                        <p className="date-prelevement"><strong>{t('birthDate')}:</strong> 1955-01-01 (69y 8m 23d)</p> {/* Translate "Date de naissance" */}
                    </div>
                </div>
                <div className="header-row">
                    <div className="header-item">
                        <p><strong>{t('sex')}:</strong> Masculin</p> {/* Translate "Sex" */}
                    </div>
                    <div className="header-item">
                        <p className="date-impression"><strong>{t('printedOn')}:</strong> 2024-09-24, 08:34:37 (UTC)</p> {/* Translate "Imprimé le" */}
                    </div>
                </div>
            </header>

            {/* Examen Section */}
            <section>
                <h2 className="static-header">{t('examination')}</h2> {/* Translate "Examen" */}

                <div className="examinations">
                    {/* Individual Examinations */}
                    <div>
                        <h3 onClick={() => toggleExamination('IRM_Cerebral')} className="exam-title">
                            {t('brainMRI')} {/* Translate "IRM Cérébral avec Injection" */}
                            <span className={`icon ${openExaminations['IRM_Cerebral'] ? 'up' : 'down'}`}>
                                <i className={openExaminations['IRM_Cerebral'] ? 'fas fa-chevron-up' : 'fas fa-chevron-down'}></i>
                            </span>
                        </h3>
                        {openExaminations['IRM_Cerebral'] && (
                            <div className="exam-details">
                                <div className="indication">
                                    <p><strong>{t('indication')}:</strong> Trouble cognitif modéré.</p> {/* Translate "Indication" */}
                                </div>
                                <div className="technique">
                                    <p><strong>{t('technique')}:</strong></p> {/* Translate "Technique" */}
                                    <ul>
                                        <li>Séquences avant injection de produit de contraste gadoliné : axiale FLAIR, T2*, diffusion, T1</li>
                                        <li>Séquences après injection de produit de contraste gadoliné : axiale T1, 3DT1</li>
                                    </ul>
                                </div>
                                <div className="results">
                                    <p><strong>{t('result')}:</strong></p> {/* Translate "Résultat" */}
                                    <ul>
                                        <li>Stigmates de saignement ancien en bi pallidales en pondération T2*.</li>
                                        <li>Elargissement des sillons corticaux et des cavités ventriculaires.</li>
                                        <li>Structures médianes en place.</li>
                                        <li>Pas d’hypersignal de diffusion du parenchyme cérébral.</li>
                                        <li>Absence de prise de contraste pathologique cérébrale sus ou sous tentorielle suspecte.</li>
                                        <li>Les structures veineuses sont perméables.</li>
                                        <li>Pas de disparité des calibres des artères à destinée encéphalique.</li>
                                    </ul>
                                </div>
                                <div className="conclusion">
                                    <p><strong>{t('conclusion')}:</strong></p> {/* Translate "Conclusion" */}
                                    <ul>
                                        <li>Stigmates de saignement ancien bi pallidales.</li>
                                        <li>Atrophie cortico sous corticale.</li>
                                        <li>Le reste de l'examen sans particularité.</li>
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

export default ImageryResults;
