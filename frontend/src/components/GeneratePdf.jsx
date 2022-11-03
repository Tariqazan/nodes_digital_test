import React from 'react';
import { Button } from 'flowbite-react';
import axiosInstance from '../services/axiosInstance';

function GeneratePdf() {
    const generatePdf = () => {
        let requested_data = {
            "data": "data"
        }
        axiosInstance
            .post(`/pdf/`, requested_data)
            .then((res) => {
                alert("pdf generated")
            })
            .catch((err) => {
                console.log(err);
            });
    }
    return (
        <>
            <Button onClick={generatePdf}>Generate PDF</Button>
        </>
    )
}

export default GeneratePdf;