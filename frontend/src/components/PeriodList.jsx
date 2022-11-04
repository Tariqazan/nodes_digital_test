import React from 'react';
import PeriodBox from './PeriodBox';

function PeriodList({ handleUpdate, handleChange, routine, handleSubmit, handleDelete }) {

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <PeriodBox handleUpdate={handleUpdate} handleChange={handleChange} routine={routine.p1} handleSubmit={handleSubmit} handleDelete={handleDelete} period={"p1"} />
        <PeriodBox handleUpdate={handleUpdate} handleChange={handleChange} routine={routine.p2} handleSubmit={handleSubmit} handleDelete={handleDelete} period={"p2"} />
        <PeriodBox handleUpdate={handleUpdate} handleChange={handleChange} routine={routine.p3} handleSubmit={handleSubmit} handleDelete={handleDelete} period={"p3"} />
        <PeriodBox handleUpdate={handleUpdate} handleChange={handleChange} routine={routine.p4} handleSubmit={handleSubmit} handleDelete={handleDelete} period={"p4"} />
        <PeriodBox handleUpdate={handleUpdate} handleChange={handleChange} routine={routine.p5} handleSubmit={handleSubmit} handleDelete={handleDelete} period={"p5"} />
        <PeriodBox handleUpdate={handleUpdate} handleChange={handleChange} routine={routine.p6} handleSubmit={handleSubmit} handleDelete={handleDelete} period={"p6"} />
        <PeriodBox handleUpdate={handleUpdate} handleChange={handleChange} routine={routine.p7} handleSubmit={handleSubmit} handleDelete={handleDelete} period={"p7"} />
        <PeriodBox handleUpdate={handleUpdate} handleChange={handleChange} routine={routine.p8} handleSubmit={handleSubmit} handleDelete={handleDelete} period={"p8"} />
        <PeriodBox handleUpdate={handleUpdate} handleChange={handleChange} routine={routine.p9} handleSubmit={handleSubmit} handleDelete={handleDelete} period={"p9"} />
        <PeriodBox handleUpdate={handleUpdate} handleChange={handleChange} routine={routine.p10} handleSubmit={handleSubmit} handleDelete={handleDelete} period={"p10"} />
      </div>
    </>
  )
}

export default PeriodList;