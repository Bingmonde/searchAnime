
import React, {useEffect, useRef, useState} from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import html2PDF from 'jspdf-html2canvas';
import {MyDocuDOMWithList} from "../components/myDocu";
export const PdfGeneratorLongContent = ({animeTitle, animeList, showDownload }) => {
    const pageRef = useRef();
    async function printPdf() {
        const page = pageRef.current;

        const pdf = await html2PDF(page, {
            jsPDF: {
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4',
            },
            html2canvas: {
                scrollX: 0,
                scrollY: -window.scrollY,
                useCORS: true,
                allowTaint: true,
            },
            imageType: 'image/jpeg',
            output: './pdf/' + animeTitle + '.pdf'

        });
        pdf.save(animeTitle + '.pdf',);

    }


    async function previewPdf(){
        const pdf = await preparePdfGenearation();

        try {
            const pdfBlob = pdf.output('blob');
            const pdfUrl = URL.createObjectURL(pdfBlob);

            // preview pdf
            const previewBox = document.createElement('div');
            previewBox.style.width = '100%';
            previewBox.style.height = '600px';
            previewBox.style.paddingBottom = '50px';
            const iframe = document.createElement('iframe');
            iframe.style.width = '100%';
            iframe.style.height = '600px';
            iframe.src = pdfUrl;
            previewBox.appendChild(iframe)

            const closePreview = document.createElement('button');
            closePreview.innerHTML = 'Close pdf preview';
            closePreview.onclick = () => {
                previewBox.remove();
                previewBox.style.display = 'none';
            }
            closePreview.style.backgroundColor = '#364d73';
            previewBox.appendChild(closePreview);

            document.getElementById('preview-pdf-box').appendChild(previewBox);

        } catch (error) {
            console.error('Error generating PDF:', error);
        }
    }


    const downloadPdf = async () => {

        const pdf = await preparePdfGenearation();

        try {
            const pdfBlob = pdf.output('blob');
            const pdfUrl = URL.createObjectURL(pdfBlob);

            const downloadLink = document.createElement('a');
            downloadLink.href = pdfUrl;
            downloadLink.download = animeTitle + '.pdf';
            downloadLink.click();

        } catch (error) {
            console.error('Error generating PDF:', error);
        }
    }

    const preparePdfGenearation = async () => {

        const pages = pageRef.current;
        try {
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4',
            });

            for (let i = 0; i < pages.length; i++) {
                const page = pages[i];

                const canvas = await html2canvas(page, {
                    scrollX: 0,
                    scrollY: -window.scrollY,
                    useCORS: true,
                });

                const imgData = canvas.toDataURL('image/jpeg');

                if (i > 0) {
                    pdf.addPage();
                }

                pdf.addImage(imgData, 'JPEG', 10, 10, 190, 0);
            }
           return pdf
        } catch (error) {
            console.error('Error generating PDF:', error);
        }

    }

    return (
        <div className="flex flex-col">
            {showDownload && <button onClick={printPdf} className="pdf-button self-center">Save PDF</button>}
            <MyDocuDOMWithList ref={pageRef} animeList={animeList}/>
            {showDownload && <button onClick={printPdf} className="pdf-button self-center">Save PDF</button>}


        </div>
    );

}




