import React, { useState, useEffect } from 'react';
import PeriodList from '../components/PeriodList';
import Topbar from '../components/Topbar';
import axiosInstance from '../services/axiosInstance';


function Routine() {
    const [routine, setRoutine] = useState({
        "p1": {},
        "p2": {},
        "p3": {},
        "p4": {},
        "p5": {},
        "p6": {},
        "p7": {},
        "p8": {},
        "p9": {},
        "p10": {}
    })

    useEffect(() => {
        const abortController = new AbortController();

        axiosInstance
            .get(`/routine/`)
            .then((res) => {
                var p1 = res.data.filter(period => {
                    return period.period === "p1"
                })
                var p2 = res.data.filter(period => {
                    return period.period === "p2"
                })
                var p3 = res.data.filter(period => {
                    return period.period === "p3"
                })
                var p4 = res.data.filter(period => {
                    return period.period === "p4"
                })
                var p5 = res.data.filter(period => {
                    return period.period === "p5"
                })
                var p6 = res.data.filter(period => {
                    return period.period === "p6"
                })
                var p7 = res.data.filter(period => {
                    return period.period === "p7"
                })
                var p8 = res.data.filter(period => {
                    return period.period === "p8"
                })
                var p9 = res.data.filter(period => {
                    return period.period === "p9"
                })
                var p10 = res.data.filter(period => {
                    return period.period === "p10"
                })
                setRoutine({ "p1": p1[0], "p2": p2[0], "p3": p3[0], "p4": p4[0], "p5": p5[0], "p6": p6[0], "p7": p7[0], "p8": p8[0], "p9": p9[0], "p10": p10[0] })
            })
            .catch((err) => {
                console.log(err);
            });
        return () => {
            abortController.abort();
        };
    }, [setRoutine]);

    const [data, setData] = useState({
        "subject": "",
        "schedule": ""
    })

    const handleChange = (event) => {
        let value = event.target.value;
        let name = event.target.name;
        setData((prevalue) => {
            return {
                ...prevalue,
                [name]: value
            }
        })
    }

    const handleSubmit = (value) => {
        console.log(value)
        let requested_data = {
            "period": value,
            "subject": data.subject,
            "schedule": data.schedule
        }
        axiosInstance
            .post(`/routine/`, requested_data)
            .then((res) => {
                setRoutine((prevalue) => {
                    return {
                        ...prevalue,
                        [value]: {
                            "id": res.data.id,
                            "period": res.data.period,
                            "subject": res.data.subject,
                            "schedule": res.data.schedule
                        }
                    }
                })
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const handleUpdate = (value, id) => {
        let period = value.period
        axiosInstance
            .put(`/period/${id}/`, value)
            .then((res) => {
                setRoutine((prevalue) => {
                    return {
                        ...prevalue,
                        [period]: value
                    }
                })
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const handleDelete = (value) => {
        axiosInstance
            .delete(`/period/${value}/`)
            .then((res) => {
                window.location.reload()
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const generatePdf = () => {
        if (routine.p1 !== undefined && routine.p2 !== undefined && routine.p3 !== undefined && routine.p4 !== undefined && routine.p5 !== undefined &&
            routine.p6 !== undefined && routine.p7 !== undefined && routine.p8 !== undefined && routine.p9 !== undefined && routine.p10 !== undefined) {
            let requested_data = [routine.p1, routine.p2, routine.p3, routine.p4, routine.p5, routine.p6, routine.p7, routine.p8, routine.p9, routine.p10]
            axiosInstance
                .post(`/pdf/`, requested_data)
                .then((res) => {
                    window.location = `http://127.0.0.1:8000/${res.data}`
                })
                .catch((err) => {
                    console.log(err);
                });
        }
        else {
            alert("Please fill up with subject to all periods")
        }
    }
    return (
        <>
            <Topbar generatePdf={generatePdf} />
            <PeriodList handleUpdate={handleUpdate} handleChange={handleChange} routine={routine} handleSubmit={handleSubmit} handleDelete={handleDelete} />
        </>
    )
}

export default Routine;