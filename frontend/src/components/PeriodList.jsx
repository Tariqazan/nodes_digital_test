import React, { useState, useEffect } from 'react';
import Moment from 'react-moment';
import axiosInstance from '../services/axiosInstance';
import AddPeriodData from './AddPeriodData';
import { Badge } from 'flowbite-react';
import Topbar from './Topbar';
import UpdatePeriodData from './UpdatePeriodData';

function PeriodList() {

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
  const [buttonPdf, setPdfButton] = useState(false)
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
      <Topbar generatePdf={generatePdf} buttonPdf={buttonPdf} />
      <div className="grid grid-cols-2 md:grid-cols-3">
        <div className='p-2 border border-slate-300 h-40 text-center'>
          <div className='w-full border-b-2 mb-5'>
            <Badge
              color="purple"
              size="sm"
            >
              <div className="flex gap-4 text-white text-sm font-bold font-mono leading-6 bg-stripes-indigo rounded-lg">
                <div className="p-1 w-64 shrink rounded-lg text-xl flex items-center justify-center bg-indigo-400 shadow-lg">
                  p1
                </div>
                <div className="p-1 m-1 w-14 flex-none rounded-lg flex items-center justify-center bg-indigo-200 dark:bg-indigo-800 dark:text-indigo-400">
                  <UpdatePeriodData
                    handleUpdate={handleUpdate}
                    handleChange={handleChange}
                    period={routine.p1 === undefined ? <></> : routine.p1}
                  />
                </div>
                <div className="p-1 m-1 w-14 flex-none rounded-lg hidden sm:flex items-center justify-center bg-indigo-200 dark:bg-indigo-800 dark:text-indigo-400">
                  <button onClick={() => { handleDelete(routine.p1.id) }}>
                    <svg className="w-6 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </Badge>
          </div>
          {routine.p1 !== undefined ?
            <>
              <p className="font-serif text-lg font-semibold text-slate-900">
                {routine.p1.subject}
              </p>
              <p className="font-mono">
                Date: <Moment format='YYYY/MM/DD'>{routine.p1.schedule}</Moment>
              </p>
              <p className="font-mono">
                Time: <Moment format='hh:mm:ss'>{routine.p1.schedule}</Moment>
              </p>
            </>
            : <AddPeriodData handleChange={handleChange}
              handleSubmit={handleSubmit}
              period={"p1"} />}
        </div>
        <div className='p-2 border border-slate-300 h-40 text-center'>
          <div className='w-full border-b-2 mb-5'>
            <Badge
              color="purple"
              size="sm"
            >
              <div className="flex gap-4 text-white text-sm font-bold font-mono leading-6 bg-stripes-indigo rounded-lg">
                <div className="p-1 w-64 shrink rounded-lg text-xl flex items-center justify-center bg-indigo-400 shadow-lg">
                  p2
                </div>
                <div className="p-1 m-1 w-14 flex-none rounded-lg flex items-center justify-center bg-indigo-200 dark:bg-indigo-800 dark:text-indigo-400">
                  <UpdatePeriodData
                    handleUpdate={handleUpdate}
                    handleChange={handleChange}
                    period={routine.p2 === undefined ? <></> : routine.p2}
                  />
                </div>
                <div className="p-1 m-1 w-14 flex-none rounded-lg hidden sm:flex items-center justify-center bg-indigo-200 dark:bg-indigo-800 dark:text-indigo-400">
                  <button onClick={() => { handleDelete(routine.p2.id) }}>
                    <svg className="w-6 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </Badge>
          </div>
          {routine.p2 !== undefined ?
            <>
              <p className="font-serif text-lg font-semibold text-slate-900">
                {routine.p2.subject}
              </p>
              <p className="font-mono">
                Date: <Moment format='YYYY/MM/DD'>{routine.p2.schedule}</Moment>
              </p>
              <p className="font-mono">
                Time: <Moment format='hh:mm:ss'>{routine.p2.schedule}</Moment>
              </p>
            </>
            : <AddPeriodData handleChange={handleChange}
              handleSubmit={handleSubmit}
              period={"p2"} />}
        </div>
        <div className='p-2 border border-slate-300 h-40 text-center'>
          <div className='w-full border-b-2 mb-5'>
            <Badge
              color="purple"
              size="sm"
            >
              <div className="flex gap-4 text-white text-sm font-bold font-mono leading-6 bg-stripes-indigo rounded-lg">
                <div className="p-1 w-64 shrink rounded-lg text-xl flex items-center justify-center bg-indigo-400 shadow-lg">
                  p3
                </div>
                <div className="p-1 m-1 w-14 flex-none rounded-lg flex items-center justify-center bg-indigo-200 dark:bg-indigo-800 dark:text-indigo-400">
                  <UpdatePeriodData
                    handleUpdate={handleUpdate}
                    handleChange={handleChange}
                    period={routine.p3 === undefined ? <></> : routine.p3}
                  />
                </div>
                <div className="p-1 m-1 w-14 flex-none rounded-lg hidden sm:flex items-center justify-center bg-indigo-200 dark:bg-indigo-800 dark:text-indigo-400">
                  <button onClick={() => { handleDelete(routine.p3.id) }}>
                    <svg className="w-6 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </Badge>
          </div>
          {routine.p3 !== undefined ?
            <>
              <p className="font-serif text-lg font-semibold text-slate-900">
                {routine.p3.subject}
              </p>
              <p className="font-mono">
                Date: <Moment format='YYYY/MM/DD'>{routine.p3.schedule}</Moment>
              </p>
              <p className="font-mono">
                Time: <Moment format='hh:mm:ss'>{routine.p3.schedule}</Moment>
              </p>
            </>
            : <AddPeriodData handleChange={handleChange}
              handleSubmit={handleSubmit}
              period={"p3"} />}
        </div>
        <div className='p-2 border border-slate-300 h-40 text-center'>
          <div className='w-full border-b-2 mb-5'>
            <Badge
              color="purple"
              size="sm"
            >
              <div className="flex gap-4 text-white text-sm font-bold font-mono leading-6 bg-stripes-indigo rounded-lg">
                <div className="p-1 w-64 shrink rounded-lg text-xl flex items-center justify-center bg-indigo-400 shadow-lg">
                  p4
                </div>
                <div className="p-1 m-1 w-14 flex-none rounded-lg flex items-center justify-center bg-indigo-200 dark:bg-indigo-800 dark:text-indigo-400">
                  <UpdatePeriodData
                    handleUpdate={handleUpdate}
                    handleChange={handleChange}
                    period={routine.p4 === undefined ? <></> : routine.p4}
                  />
                </div>
                <div className="p-1 m-1 w-14 flex-none rounded-lg hidden sm:flex items-center justify-center bg-indigo-200 dark:bg-indigo-800 dark:text-indigo-400">
                  <button onClick={() => { handleDelete(routine.p4.id) }}>
                    <svg className="w-6 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </Badge>
          </div>
          {routine.p4 !== undefined ?
            <>
              <p className="font-serif text-lg font-semibold text-slate-900">
                {routine.p4.subject}
              </p>
              <p className="font-mono">
                Date: <Moment format='YYYY/MM/DD'>{routine.p4.schedule}</Moment>
              </p>
              <p className="font-mono">
                Time: <Moment format='hh:mm:ss'>{routine.p4.schedule}</Moment>
              </p>
            </>
            : <AddPeriodData
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              period={"p4"} />}
        </div>
        <div className='p-2 border border-slate-300 h-40 text-center'>
          <div className='w-full border-b-2 mb-5'>
            <Badge
              color="purple"
              size="sm"
            >
              <div className="flex gap-4 text-white text-sm font-bold font-mono leading-6 bg-stripes-indigo rounded-lg">
                <div className="p-1 w-64 shrink rounded-lg text-xl flex items-center justify-center bg-indigo-400 shadow-lg">
                  p5
                </div>
                <div className="p-1 m-1 w-14 flex-none rounded-lg flex items-center justify-center bg-indigo-200 dark:bg-indigo-800 dark:text-indigo-400">
                  <UpdatePeriodData
                    handleUpdate={handleUpdate}
                    handleChange={handleChange}
                    period={routine.p5 === undefined ? <></> : routine.p5}
                  />
                </div>
                <div className="p-1 m-1 w-14 flex-none rounded-lg hidden sm:flex items-center justify-center bg-indigo-200 dark:bg-indigo-800 dark:text-indigo-400">
                  <button onClick={() => { handleDelete(routine.p5.id) }}>
                    <svg className="w-6 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </Badge>
          </div>
          {routine.p5 !== undefined ?
            <>
              <p className="font-serif text-lg font-semibold text-slate-900">
                {routine.p5.subject}
              </p>
              <p className="font-mono">
                <Moment format='YYYY/MM/DD'>{routine.p5.schedule}</Moment>
              </p>
              <p className="font-mono">
                <Moment format='hh:mm:ss'>{routine.p5.schedule}</Moment>
              </p>
            </>
            : <AddPeriodData handleChange={handleChange}
              handleSubmit={handleSubmit}
              period={"p5"} />}
        </div>
        <div className='p-2 border border-slate-300 h-40 text-center'>
          <div className='w-full border-b-2 mb-5'>
            <Badge
              color="purple"
              size="sm"
            >
              <div className="flex gap-4 text-white text-sm font-bold font-mono leading-6 bg-stripes-indigo rounded-lg">
                <div className="p-1 w-64 shrink rounded-lg text-xl flex items-center justify-center bg-indigo-400 shadow-lg">
                  p6
                </div>
                <div className="p-1 m-1 w-14 flex-none rounded-lg flex items-center justify-center bg-indigo-200 dark:bg-indigo-800 dark:text-indigo-400">
                  <UpdatePeriodData
                    handleUpdate={handleUpdate}
                    handleChange={handleChange}
                    period={routine.p6 === undefined ? <></> : routine.p6}
                  />
                </div>
                <div className="p-1 m-1 w-14 flex-none rounded-lg hidden sm:flex items-center justify-center bg-indigo-200 dark:bg-indigo-800 dark:text-indigo-400">
                  <button onClick={() => { handleDelete(routine.p6.id) }}>
                    <svg className="w-6 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </Badge>
          </div>
          {routine.p6 !== undefined ?
            <>
              <p className="font-serif text-lg font-semibold text-slate-900">
                {routine.p6.subject}
              </p>
              <p className="font-mono">
                <Moment format='YYYY/MM/DD'>{routine.p6.schedule}</Moment>
              </p>
              <p className="font-mono">
                <Moment format='hh:mm:ss'>{routine.p6.schedule}</Moment>
              </p>
            </>
            : <AddPeriodData
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              period={"p6"} />}
        </div>
        <div className='p-2 border border-slate-300 h-40 text-center'>
          <div className='w-full border-b-2 mb-5'>
            <Badge
              color="purple"
              size="sm"
            >
              <div className="flex gap-4 text-white text-sm font-bold font-mono leading-6 bg-stripes-indigo rounded-lg">
                <div className="p-1 w-64 shrink rounded-lg text-xl flex items-center justify-center bg-indigo-400 shadow-lg">
                  p7
                </div>
                <div className="p-1 m-1 w-14 flex-none rounded-lg flex items-center justify-center bg-indigo-200 dark:bg-indigo-800 dark:text-indigo-400">
                  <UpdatePeriodData
                    handleUpdate={handleUpdate}
                    handleChange={handleChange}
                    period={routine.p7 === undefined ? <></> : routine.p7}
                  />
                </div>
                <div className="p-1 m-1 w-14 flex-none rounded-lg hidden sm:flex items-center justify-center bg-indigo-200 dark:bg-indigo-800 dark:text-indigo-400">
                  <button onClick={() => { handleDelete(routine.p7.id) }}>
                    <svg className="w-6 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </Badge>
          </div>
          {routine.p7 !== undefined ?
            <>
              <p className="font-serif text-lg font-semibold text-slate-900">
                {routine.p7.subject}
              </p>
              <p className="font-mono">
                <Moment format='YYYY/MM/DD'>{routine.p7.schedule}</Moment>
              </p>
              <p className="font-mono">
                <Moment format='hh:mm:ss'>{routine.p7.schedule}</Moment>
              </p>
            </>
            : <AddPeriodData
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              period={"p7"} />}
        </div>
        <div className='p-2 border border-slate-300 h-40 text-center'>
          <div className='w-full border-b-2 mb-5'>
            <Badge
              color="purple"
              size="sm"
            >
              <div className="flex gap-4 text-white text-sm font-bold font-mono leading-6 bg-stripes-indigo rounded-lg">
                <div className="p-1 w-64 shrink rounded-lg text-xl flex items-center justify-center bg-indigo-400 shadow-lg">
                  p8
                </div>
                <div className="p-1 m-1 w-14 flex-none rounded-lg flex items-center justify-center bg-indigo-200 dark:bg-indigo-800 dark:text-indigo-400">
                  <UpdatePeriodData
                    handleUpdate={handleUpdate}
                    handleChange={handleChange}
                    period={routine.p8 === undefined ? <></> : routine.p8}
                  />
                </div>
                <div className="p-1 m-1 w-14 flex-none rounded-lg hidden sm:flex items-center justify-center bg-indigo-200 dark:bg-indigo-800 dark:text-indigo-400">
                  <button onClick={() => { handleDelete(routine.p8.id) }}>
                    <svg className="w-6 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </Badge>
          </div>
          {routine.p8 !== undefined ?
            <>
              <p className="font-serif text-lg font-semibold text-slate-900">
                {routine.p8.subject}
              </p>
              <p className="font-mono">
                <Moment format='YYYY/MM/DD'>{routine.p8.schedule}</Moment>
              </p>
              <p className="font-mono">
                <Moment format='hh:mm:ss'>{routine.p8.schedule}</Moment>
              </p>
            </>
            : <AddPeriodData
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              period={"p8"} />}
        </div>
        <div className='p-2 border border-slate-300 h-40 text-center'>
          <div className='w-full border-b-2 mb-5'>
            <Badge
              color="purple"
              size="sm"
            >
              <div className="flex gap-4 text-white text-sm font-bold font-mono leading-6 bg-stripes-indigo rounded-lg">
                <div className="p-1 w-64 shrink rounded-lg text-xl flex items-center justify-center bg-indigo-400 shadow-lg">
                  p9
                </div>
                <div className="p-1 m-1 w-14 flex-none rounded-lg flex items-center justify-center bg-indigo-200 dark:bg-indigo-800 dark:text-indigo-400">
                  <UpdatePeriodData
                    handleUpdate={handleUpdate}
                    handleChange={handleChange}
                    period={routine.p9 === undefined ? <></> : routine.p9}
                  />
                </div>
                <div className="p-1 m-1 w-14 flex-none rounded-lg hidden sm:flex items-center justify-center bg-indigo-200 dark:bg-indigo-800 dark:text-indigo-400">
                  <button onClick={() => { handleDelete(routine.p9.id) }}>
                    <svg className="w-6 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </Badge>
          </div>
          {routine.p9 !== undefined ?
            <>
              <p className="font-serif text-lg font-semibold text-slate-900">
                {routine.p9.subject}
              </p>
              <p className="font-mono">
                <Moment format='YYYY/MM/DD'>{routine.p9.schedule}</Moment>
              </p>
              <p className="font-mono">
                <Moment format='hh:mm:ss'>{routine.p9.schedule}</Moment>
              </p>
            </>
            : <AddPeriodData
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              period={"p9"} />}
        </div>
        <div className='p-2 border border-slate-300 h-40 text-center'>
          <div className='w-full border-b-2 mb-5'>
            <Badge
              color="purple"
              size="sm"
            >
              <div className="flex gap-4 text-white text-sm font-bold font-mono leading-6 bg-stripes-indigo rounded-lg">
                <div className="p-1 w-64 shrink rounded-lg text-xl flex items-center justify-center bg-indigo-400 shadow-lg">
                  p10
                </div>
                <div className="p-1 m-1 w-14 flex-none rounded-lg flex items-center justify-center bg-indigo-200 dark:bg-indigo-800 dark:text-indigo-400">
                  <UpdatePeriodData
                    handleUpdate={handleUpdate}
                    handleChange={handleChange}
                    period={routine.p10 === undefined ? <></> : routine.p10}
                  />
                </div>
                <div className="p-1 m-1 w-14 flex-none rounded-lg hidden sm:flex items-center justify-center bg-indigo-200 dark:bg-indigo-800 dark:text-indigo-400">
                  <button onClick={() => { handleDelete(routine.p10.id) }}>
                    <svg className="w-6 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </Badge>
          </div>
          {routine.p10 !== undefined ?
            <>
              <p className="font-serif text-lg font-semibold text-slate-900">
                {routine.p10.subject}
              </p>
              <p className="font-mono">
                <Moment format='YYYY/MM/DD'>{routine.p10.schedule}</Moment>
              </p>
              <p className="font-mono">
                <Moment format='hh:mm:ss'>{routine.p10.schedule}</Moment>
              </p>
            </>
            : <AddPeriodData
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              period={"p10"} />}
        </div>
      </div>
    </>
  )
}

export default PeriodList;