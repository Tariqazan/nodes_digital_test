import React from 'react';
import { Button, Navbar } from 'flowbite-react';

function Topbar({ generatePdf }) {
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
        </>
    )
}

export default Topbar;