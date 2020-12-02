import React, { Component } from 'react';
import Header from '../Header/Header';
import Nav from '../Nav/Nav';
import './UserManual.css'

export default class UserManual extends Component {
    render() {
        return (
            <>
                
                
                <section className='user-manual'>
                    <h2>User Manual</h2>
                    <p>Sugar-Track allows you to log metrics for glucose levels, medications and meals so that you can visualize them on a graphical interface. You can log any number of values but we have some recommendations so that you can optimize this app.</p>
                    <ul>
                        <li>Log blood glucose at least for the following times:
                            <ul>
                            <li>Fasting: Log this value immediately after you wake up before your first meal of the day including any fluids.</li>
                            <li>After meal: Log glucose value about one hour after every meal of the day. For instance log glucose after having breakfast, after having dinner, etc.</li>
                            <li>Before sleep: Log glucose immediately prior to sleep.</li>
                            </ul>
                            
                        </li>
                    </ul>
                </section>
            </>
        )
    }
} 