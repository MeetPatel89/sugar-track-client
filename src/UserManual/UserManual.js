/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import './UserManual.css';

export default function UserManual() {
  return (
    <>
      <section className="user-manual">
        <h2>User Manual</h2>
        <p>
          Sugar-Track allows you to log metrics for glucose levels, medications
          and meals so that you can visualize them on a graphical interface. You
          can log any number of values but we have some recommendations so that
          you can optimize this app.
        </p>
        <ul className="user-manual-list">
          <li>
            Log blood glucose as follows:
            <ul>
              <li>
                Fasting: Log this value immediately after you wake up before
                your first meal of the day including any fluids.
              </li>
              <li>
                After meal: Log glucose value about one hour after every meal of
                the day. For instance log glucose after having breakfast, after
                having dinner, etc.
              </li>
              <li>Before sleep: Log glucose immediately prior to sleep.</li>
              <li>
                You are not allowed to log more than one glucose value for the
                same date-time.
              </li>
            </ul>
          </li>
          <li>
            Log medications as follows:
            <ul>
              <li>
                If you have one medication (e.g. insulin) at a given time then
                log that medication ('insulin') along with date and time.
              </li>
              <li>
                If you have more than one medication at one go (e.g. insulin,
                metformin and atenolol) then log all those medications
                ('insulin, metformin, atenolol') along with date and time.
              </li>
              <li>
                You are not allowed to log more than one medication regimen for
                the same date-time.
              </li>
            </ul>
          </li>
          <li>
            Log meals as follows:
            <ul>
              <li>
                Log meals everytime you eat or drink something that has caloric
                value.
              </li>
              <li>
                Keep it brief, you are not writing a recipe. For e.g.
                'egg-sandwich', 'cheese fries', 'Indian meal', etc.
              </li>
              <li>
                You are not allowed to log more than one meal value for the same
                date-time.
              </li>
            </ul>
          </li>
          <li>
            For all above metrics you are not allowed to log values for future
            dates as well as for dates more than 7 days in the past.
          </li>
          <li>
            You can edit and delete any of the logs but we recommend you use it
            cautiously to avoid introducing any inaccuracy in your logs.
          </li>
        </ul>
      </section>
    </>
  );
}
