import React, { useState } from 'react';
import { Button, Modal, Label, TextInput, Badge } from 'flowbite-react';
import Moment from 'react-moment';

function UpdatePeriodData({ handleUpdate, period }) {
    const [show, setShow] = useState(false)
    const onClick = () => { setShow(true) }
    const onClose = () => { setShow(false) }

    const [subject, setSubject] = useState(period.subject)
    const [schedule, setSchedule] = useState(period.schedule)


    return (
        <>
            <button onClick={onClick}>
                <svg className="w-6 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                </svg>
            </button>
            <Modal
                show={show}
                size="md"
                popup={true}
                onClose={onClose}
            >
                <Modal.Header />
                <Modal.Body>
                    <div className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
                        <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                            Period Information
                        </h3>
                        <div>
                            <div className="mb-2 block">
                                <Label
                                    htmlFor="subject"
                                />
                            </div>
                            <TextInput
                                id="subject"
                                placeholder="enter subject name ..."
                                required={true}
                                name="subject"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)} />
                        </div>
                        <div className="relative">
                            <Badge color={'purple'}>
                                <Moment format='YYYY/MM/DD'>{period.schedule}</Moment>
                                <Moment format='hh:mm:ss'>{period.schedule}</Moment>
                            </Badge>
                            <TextInput type="datetime-local"
                                name='schedule'
                                onChange={(e) => setSchedule(e.target.value)} />
                        </div>
                        <div className="w-full">
                            <Button onClick={() => {
                                handleUpdate({ "id": period.id, "period": period.period, "subject": subject, "schedule": schedule }, period.id)
                            }}>
                                Save
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default UpdatePeriodData