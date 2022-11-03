import React, { useState, useEffect } from 'react';
import { Button, Modal, Label, TextInput, Select } from 'flowbite-react';

function AddPeriodData({ handleChange, handleSubmit, period }) {
    const [show, setShow] = useState(false)
    const onClick = () => { setShow(true) }
    const onClose = () => { setShow(false) }

    return (
        <>
            <Button onClick={onClick}>
                Add Period Information
            </Button>
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
                                onChange={handleChange} />
                        </div>
                        <div className="relative">
                            <TextInput type="datetime-local" name='schedule'
                                onChange={handleChange} />
                        </div>
                        <div className="w-full">
                            <Button onClick={() => {
                                handleSubmit(period)
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

export default AddPeriodData