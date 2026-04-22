import React from 'react'
import { FaGithub, FaLinkedin } from 'react-icons/fa'

const Footer = () => {
    return (
        <footer
            className="text-center text-white py-3"
            style={{
                background: "linear-gradient(135deg, #31333b, #605e61)"
            }}
        >
            <div className="container">

                <p className="mb-1">
                    © {new Date().getFullYear()} MyApp. All rights reserved.
                </p>

            </div>
        </footer>
    )
}

export default Footer