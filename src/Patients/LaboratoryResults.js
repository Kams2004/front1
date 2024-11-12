// import React, { useState } from 'react';
// import './LaboratoryResults.css';
// import '@fortawesome/fontawesome-free/css/all.min.css';


// const LaboratoryResults = () => {
//     const [isBiochemistryOpen, setIsBiochemistryOpen] = useState(false);
//     const [isHematologyOpen, setIsHematologyOpen] = useState(false);

//     const handleDownload = () => {
//         const element = document.getElementById('report-content');
//         const textContent = element.innerText;

//         const blob = new Blob([textContent], { type: 'text/plain' });
//         const url = URL.createObjectURL(blob);

//         const a = document.createElement('a');
//         a.href = url;
//         a.download = 'laboratory_results.txt';
//         document.body.appendChild(a);
//         a.click();
//         document.body.removeChild(a);
//         URL.revokeObjectURL(url);
//     };

//     return (
//         <div className="report-container">
//             <div className="header-container">
//                 <h1>Laboratory Results</h1>
//                 <button className="download-button" onClick={handleDownload}>
//                     <i className="bi bi-download"></i> Download
//                 </button>
//             </div>

//             <header id="report-content">
//     <div className="header-row">
//         <div className="header-item">
//             <p>Prescripteur: Dr. MAGNEROU ANNICK MELANIE</p>
//         </div>
//         <div className="header-item">
//             <p className="dossier">Dossier N°: TEST015</p>
//         </div>
//     </div>
//     <div className="header-row">
//         <div className="header-item">
//             <p>Patient: KALA DAVID</p>
//         </div>
//         <div className="header-item">
//             <p className="date-prelevement">Date de prélèvement: 2024-02-01 08:16:42 UTC</p>
//         </div>
//     </div>
//     <div className="header-row">
//         <div className="header-item">
//             <p>Age: 69y 8m 23d</p>
//         </div>
//         <div className="header-item">
//             <p className="sexe">Sexe: Masculin</p>
//         </div>
//         <div className="header-item">
//             <p className="date-impression">Date d'impréssion: 24.09.2024 08:32:42</p>
//         </div>
//     </div>
// </header>


//             {/* Biochemistry Section */}
//             <section>
//             <h2 onClick={() => setIsBiochemistryOpen(!isBiochemistryOpen)} className="collapsible-header">
//     BIOCHIMIE
//     <span className={`icon ${isBiochemistryOpen ? 'up' : 'down'}`}>
//         <i className={isBiochemistryOpen ? 'fas fa-chevron-up' : 'fas fa-chevron-down'}></i>
//     </span>
// </h2>

//                 {isBiochemistryOpen && (
//                     <table className="table table-striped table-hover">
//                         <thead>
//                             <tr>
//                                 <th>Analyses</th>
//                                 <th>Résultat</th>
//                                 <th>Unités</th>
//                                 <th>Valeur de réfèrence</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             <tr>
//                                 <td>CREATINEMIE</td>
//                                 <td>14.5</td>
//                                 <td>mg/l</td>
//                                 <td>Hommes: 6 à 13 <br /> Femmes: 6 à 11 <br /> Enfant: 3.3 à 9</td>
//                             </tr>
//                             <tr>
//                                 <td>GLYCEMIE A JEUN</td>
//                                 <td>0.84</td>
//                                 <td>g/l</td>
//                                 <td>Nouveau Né & Enfants: 0.50 à 1.0 <br /> Femmes & Hommes: 0.70 à 1.15</td>
//                             </tr>
//                             <tr>
//                                 <td>UREE</td>
//                                 <td>0.41</td>
//                                 <td>g/l</td>
//                                 <td>(0.15-0.45)</td>
//                             </tr>
//                         </tbody>
//                     </table>
//                 )}
//             </section>

//             {/* Hematology Section */}
//             <section>
//                 <h2 onClick={() => setIsHematologyOpen(!isHematologyOpen)} className="collapsible-header">
//                     HEMATOLOGIE
//                     <span className={`icon ${isHematologyOpen ? 'up' : 'down'}`}>
//                         <i className={isHematologyOpen ? 'fas fa-chevron-up' : 'fas fa-chevron-down'}></i>
//                     </span>
//                 </h2>
//                 {isHematologyOpen && (
//                     <table className="table table-striped table-hover">
//                         <thead>
//                             <tr>
//                                 <th>Analyses</th>
//                                 <th>Résultat</th>
//                                 <th>Unités</th>
//                                 <th>Valeur de réfèrence</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             <tr>
//                                 <td>Leucocytes</td>
//                                 <td>2.2</td>
//                                 <td>10^3/mm3</td>
//                                 <td>(4.0-11.0)</td>
//                             </tr>
//                             <tr>
//                                 <td>Hématies</td>
//                                 <td>4.57</td>
//                                 <td>10^6/mm3</td>
//                                 <td>(3.9-6.0)</td>
//                             </tr>
//                             <tr>
//                                 <td>Hémoglobine</td>
//                                 <td>13.4</td>
//                                 <td>g/dl</td>
//                                 <td>(11.5-17.5)</td>
//                             </tr>
//                             <tr>
//                                 <td>Hématocrite</td>
//                                 <td>40.4</td>
//                                 <td>%</td>
//                                 <td>(37.0-54.0)</td>
//                             </tr>
//                             <tr>
//                                 <td>V.G.M</td>
//                                 <td>88.0</td>
//                                 <td>fl</td>
//                                 <td>(78.0-98.0)</td>
//                             </tr>
//                             <tr>
//                                 <td>C.C.M.H</td>
//                                 <td>33.3</td>
//                                 <td>g/dl</td>
//                                 <td>(32.0-36.0)</td>
//                             </tr>
//                             <tr>
//                                 <td>T.C.M.H</td>
//                                 <td>29.4</td>
//                                 <td>g/dl</td>
//                                 <td>(24.0-35.0)</td>
//                             </tr>
//                             <tr>
//                                 <td>Plaquettes</td>
//                                 <td>161.0</td>
//                                 <td>10^3/mm3</td>
//                                 <td>(150.0-450.0)</td>
//                             </tr>
//                             <tr>
//                                 <td>Polynucléaires neutrophiles</td>
//                                 <td>1.02 (45.4%)</td>
//                                 <td>10^3/mm3</td>
//                                 <td>(1.4-7.7)</td>
//                             </tr>
//                             <tr>
//                                 <td>Polynucléaires éosinophiles</td>
//                                 <td>0.04 (1.9%)</td>
//                                 <td>10^3/mm3</td>
//                                 <td>(0.01-0.5)</td>
//                             </tr>
//                             <tr>
//                                 <td>Polynucléaires basophiles</td>
//                                 <td>0.01 (0.5%)</td>
//                                 <td>10^3/mm3</td>
//                                 <td>(0.01-0.1)</td>
//                             </tr>
//                             <tr>
//                                 <td>Lymphocytes</td>
//                                 <td>1.01 (44.8%)</td>
//                                 <td>10^3/mm3</td>
//                                 <td>(1.0-4.8)</td>
//                             </tr>
//                             <tr>
//                                 <td>Monocytes</td>
//                                 <td>0.12 (5.3%)</td>
//                                 <td>10^3/mm3</td>
//                                 <td>(0.1-0.8)</td>
//                             </tr>
//                         </tbody>
//                     </table>
//                 )}
//             </section>
//         </div>
//     );
// };

// export default LaboratoryResults;


import React, { useState, useEffect } from 'react';
import './LaboratoryResults.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useTranslation } from 'react-i18next';

const LaboratoryResults = ({ patientId }) => {
    const { t } = useTranslation();
    const [patient, setPatient] = useState(null);
    const [labResults, setLabResults] = useState([]);
    const [openSections, setOpenSections] = useState({});

    useEffect(() => {
        const fetchLaboratoryResults = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/lab-results/1`);
                const data = await response.json();
                setPatient(data.patient);
                setLabResults(data.lab_results);
            } catch (error) {
                console.error('Error fetching laboratory results:', error);
            }
        };

        fetchLaboratoryResults();
    }, [patientId]);

    const toggleSection = (sectionName) => {
        setOpenSections((prevOpenSections) => ({
            ...prevOpenSections,
            [sectionName]: !prevOpenSections[sectionName],
        }));
    };

    const handleDownload = () => {
        const element = document.getElementById('lab-results-report-content');
        const textContent = element.innerText;

        const blob = new Blob([textContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = 'laboratory_results.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    if (!labResults.length) {
        return <div>Loading...</div>;
    }

    return (
        <div className="lab-results-report-container">
            <div className="lab-results-header-container">
                <h1 className="lab-results-h1">{t('laboratoryResults')}</h1>
                {patient && (
                    <div className="lab-results-patient-info">
                        <div className="lab-results-header-row">
                            <div className="lab-results-header-item">
                                <p>{t('prescriber')}: {labResults.prescriber}</p>
                            </div>
                            <div className="lab-results-header-item">
                                <p className="lab-results-dossier">{t('fileNumber')}: {patient.dossier_number}</p>
                            </div>
                        </div>
                        <div className="lab-results-header-row">
                            <div className="lab-results-header-item">
                                <p>{t('patient')}: {patient.name}</p>
                            </div>
                            <div className="lab-results-header-item">
                                <p className="lab-results-date-prelevement">{t('sampleDate')}: {patient.sample_date}</p>
                            </div>
                        </div>
                        <div className="lab-results-header-row">
                            <div className="lab-results-header-item">
                                <p>{t('age')}: {patient.age}</p>
                            </div>
                            <div className="lab-results-header-item">
                                <p className="lab-results-sexe">{t('sex')}: {patient.sex}</p>
                            </div>
                            <div className="lab-results-header-item">
                                <p className="lab-results-date-impression">{t('printDate')}: {new Date().toLocaleString()}</p>
                            </div>
                        </div>
                    </div>
                )}
                <button className="lab-results-download-button" onClick={handleDownload}>
                    <i className="bi bi-download"></i> {t('download')}
                </button>
            </div>

            <div id="lab-results-report-content">
                {labResults.map((result, index) => (
                    <section key={index}>
                        {Object.entries(result.test_categories).map(([category, tests], categoryIndex) => (
                            <div key={categoryIndex}>
                                <h2
                                    onClick={() => toggleSection(`Category ${category}`)}
                                    className="lab-results-collapsible-header"
                                >
                                    {t(category)} {t('results')} {t('on')} {result.date_of_report}
                                    <span className={`lab-results-icon ${openSections[`Category ${category}`] ? 'lab-results-up' : 'lab-results-down'}`}>
                                        <i className={
                                                openSections[`Category ${category}`]
                                                    ? 'fas fa-chevron-up'
                                                    : 'fas fa-chevron-down'
                                            }
                                        ></i>
                                    </span>
                                </h2>

                                {openSections[`Category ${category}`] && (
                                    <div className="lab-results-table-container">
                                        <table className="lab-results-table lab-results-table-hover">
                                            <thead>
                                                <tr>
                                                    <th>{t('analysis')}</th>
                                                    <th>{t('result')}</th>
                                                    <th>{t('unit')}</th>
                                                    <th>{t('referenceValue')}</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {tests.map((test, testIndex) => (
                                                    <tr key={testIndex}>
                                                        <td>{test.analysis}</td>
                                                        <td>{test.result}</td>
                                                        <td>{test.unit}</td>
                                                        <td>{test.reference_value}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                        ))}
                    </section>
                ))}
            </div>
        </div>
    );
};

export default LaboratoryResults;


