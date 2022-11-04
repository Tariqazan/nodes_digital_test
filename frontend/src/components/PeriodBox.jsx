import React from 'react';
import Moment from 'react-moment';
import AddPeriodData from './AddPeriodData';
import { Badge } from 'flowbite-react';
import UpdatePeriodData from './UpdatePeriodData';

function PeriodBox({ handleUpdate, handleChange, routine, handleSubmit, handleDelete, period }) {
    return (
        <>
            <div className='p-2 border border-slate-300 h-40 text-center'>
                {routine !== undefined ?
                    <div className='w-full border-b-2 mb-5'>
                        <Badge
                            color="purple"
                            size="sm"
                        >
                            <div className="flex gap-2 text-white text-sm font-bold font-mono leading-6 bg-stripes-indigo rounded-lg">
                                <div className="p-0 md:p-1 w-32 md:w-40 shrink rounded-lg text-sm md:text-xl flex items-center justify-center bg-indigo-400 shadow-lg">
                                    {period}
                                </div>
                                <div className="p-1 m-1 w-10 md:w-14 flex-none rounded-lg flex items-center justify-center bg-indigo-200 dark:bg-indigo-800 dark:text-indigo-400">
                                    <UpdatePeriodData
                                        handleUpdate={handleUpdate}
                                        handleChange={handleChange}
                                        period={routine === undefined ? <></> : routine}
                                    />
                                </div>
                                <div className="p-1 m-1 w-10 md:w-14 flex-none rounded-lg sm:flex items-center justify-center bg-indigo-200 dark:bg-indigo-800 dark:text-indigo-400">
                                    <button onClick={() => { handleDelete(routine.id) }}>
                                        <svg className="w-6 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </Badge>
                    </div> : <div className='w-full border-b-2 mb-5'>
                        <Badge
                            color="purple"
                            size="sm"
                        >
                            <div className="flex gap-4 text-white text-sm font-bold font-mono leading-6 bg-stripes-indigo rounded-lg">
                                <div className="p-1 w-32 shrink rounded-lg text-xl flex items-center justify-center bg-indigo-400 shadow-lg">
                                    {period}
                                </div>
                            </div>
                        </Badge>
                    </div>
                }
                {routine !== undefined ?
                    <>
                        <p className="font-serif text-lg font-semibold text-slate-900">
                            {routine.subject}
                        </p>
                        <p className="font-mono">
                            Date: <Moment format='YYYY/MM/DD'>{routine.schedule}</Moment>
                        </p>
                        <p className="font-mono">
                            Time: <Moment format='hh:mm:ss'>{routine.schedule}</Moment>
                        </p>
                    </>
                    :
                    <AddPeriodData handleChange={handleChange}
                        handleSubmit={handleSubmit}
                        period={period} />}
            </div>
        </>
    )
}

export default PeriodBox