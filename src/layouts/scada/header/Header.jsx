import React from 'react';
import styles from './Header.module.scss';

export default function Header() {
    // var { t } = this.props;
    return (
        <div className={styles.header}>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-md-12'>
                        <div className={styles.main_header}>
                            <div className={styles.logo}>
                                <img src="/logo.svg" />
                            </div>

                            <div className={styles.user_menu}>
                                <ul>
                                    <li>
                                        <svg className="icon-md" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><title></title><path d="M427.68 351.43C402 320 383.87 304 383.87 217.35 383.87 138 343.35 109.73 310 96c-4.43-1.82-8.6-6-9.95-10.55C294.2 65.54 277.8 48 256 48s-38.21 17.55-44 37.47c-1.35 4.6-5.52 8.71-9.95 10.53-33.39 13.75-73.87 41.92-73.87 121.35C128.13 304 110 320 84.32 351.43 73.68 364.45 83 384 101.61 384h308.88c18.51 0 27.77-19.61 17.19-32.57zM320 384v16a64 64 0 01-128 0v-16" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"></path></svg>
                                        <span className={styles.alarm}>2</span>
                                    </li>
                                    <li>
                                        <svg className="icon-md" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><title></title><path d="M250.26 155.39l5.74 122 5.73-121.95a5.74 5.74 0 00-5.79-6h0a5.74 5.74 0 00-5.68 5.95z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"></path><path fill="currentColor" d="M256 380.25a20 20 0 1120-20 20 20 0 01-20 20z"></path><path d="M463.1 112.37C373.68 96.33 336.71 84.45 256 48c-80.71 36.45-117.68 48.33-207.1 64.37C32.7 369.13 240.58 457.79 256 464c15.42-6.21 223.3-94.87 207.1-351.63z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"></path></svg>
                                        <span className={styles.private}>1</span>
                                    </li>
                                    <li>
                                        <a>
                                            <svg className="icon-md" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                                <title></title>
                                                <path fill="currentColor" d="M258.9 48C141.92 46.42 46.42 141.92 48 258.9c1.56 112.19 92.91 203.54 205.1 205.1 117 1.6 212.48-93.9 210.88-210.88C462.44 140.91 371.09 49.56 258.9 48zm126.42 327.25a4 4 0 01-6.14-.32 124.27 124.27 0 00-32.35-29.59C321.37 329 289.11 320 256 320s-65.37 9-90.83 25.34a124.24 124.24 0 00-32.35 29.58 4 4 0 01-6.14.32A175.32 175.32 0 0180 259c-1.63-97.31 78.22-178.76 175.57-179S432 158.81 432 256a175.32 175.32 0 01-46.68 119.25z"></path>
                                                <path fill="currentColor" d="M256 144c-19.72 0-37.55 7.39-50.22 20.82s-19 32-17.57 51.93C191.11 256 221.52 288 256 288s64.83-32 67.79-71.24c1.48-19.74-4.8-38.14-17.68-51.82C293.39 151.44 275.59 144 256 144z"></path></svg>

                                            <span className={styles.username}>Long pham</span>
                                            <svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><title>Chevron Down</title><path fill='none' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='48' d='M112 184l144 144 144-144'/></svg>
                                        </a>
                                        <ul>
                                            <li>Change password</li>
                                            <li>Configure</li>
                                            <li>Change password</li>
                                        </ul>
                                    </li>
                                    <li>
                                        <svg className="icon-md" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><title></title><path d="M304 336v40a40 40 0 01-40 40H104a40 40 0 01-40-40V136a40 40 0 0140-40h152c22.09 0 48 17.91 48 40v40M368 336l80-80-80-80M176 256h256" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"></path></svg>
                                        <span className={styles.logout}>Log out</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};