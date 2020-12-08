import React from 'react';
import { Link } from 'react-router-dom';
import './LogBook.css';

export default function LogBook() {
  return (
    <>
      <div className="log-metric">
        <Link to="/logbook/blood_sugar">
          <button className="sugar-logbook" type="button">
            Blood Sugar
          </button>
        </Link>
        <Link to="/logbook/medications">
          <button className="med-logbook" type="button">
            Medications
          </button>
        </Link>
        <Link to="/logbook/meal_regimens">
          <button className="meal-logbook" type="button">
            Meal Regimens
          </button>
        </Link>
      </div>
    </>
  );
}
