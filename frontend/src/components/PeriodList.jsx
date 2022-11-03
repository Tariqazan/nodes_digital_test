import React, { useState, useEffect } from 'react';
import Moment from 'react-moment';
import axiosInstance from '../services/axiosInstance';
import AddPeriodData from './AddPeriodData';
import { Badge, Button, Navbar } from 'flowbite-react';

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
        setRoutine({ "p1": p1[0], "p2": p2[0], "p3": p3[0], "p4": p4[0], "p5": p5[0], "p6": p6[0], "p7": p7[0], "p8": p8[0], "p9": p9[0], "p10": p10[0], })
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
        alert("added")
        setRoutine((prevalue) => {
          return {
            ...prevalue,
            [value]: requested_data
          }
        })
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const generatePdf = () => {
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
  return (
    <>
      <Navbar
        fluid={true}
        rounded={true}
      >
        <Navbar.Brand href="#">
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            Routine
          </span>
        </Navbar.Brand>
        <div className="flex md:order-2">
          <Button onClick={generatePdf}>
            Generate PDF
          </Button>
          <Navbar.Toggle />
        </div>
      </Navbar>
      <div className="grid grid-cols-2 md:grid-cols-3">
        <div className='p-2 border border-slate-300 h-40 text-center'>
          <div className='w-full border-b-2 mb-5'>
            <Badge
              color="purple"
              size="sm"
            >
              p1
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
              p2
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
              p3
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
              p4
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
              p5
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
              p6
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
              p7
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
              p8
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
              p9
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
              p10
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