import React from 'react';
import { Person } from '../types';
import cn from 'classnames';
import { PersonLink } from './PersonLink';

type Props = {
  people: Person[];
  selectedSlug?: string;
};

export const PeopleTable: React.FC<Props> = ({ people, selectedSlug }) => (
  <table
    data-cy="peopleTable"
    className="table is-striped is-hoverable is-narrow is-fullwidth"
  >
    <thead>
      <tr>
        <th>Name</th>
        <th>Sex</th>
        <th>Born</th>
        <th>Died</th>
        <th>Mother</th>
        <th>Father</th>
      </tr>
    </thead>

    <tbody>
      {people.map(person => {
        const isSelected = person.slug === selectedSlug;

        const motherName = person.motherName?.toLowerCase().trim() || null;
        const fatherName = person.fatherName?.toLowerCase().trim() || null;

        const mother = motherName
          ? people.find(p => p.name.toLowerCase().trim() === motherName)
          : null;

        const father = fatherName
          ? people.find(p => p.name.toLowerCase().trim() === fatherName)
          : null;

        return (
          <tr
            key={person.slug}
            data-cy="person"
            className={cn({ 'has-background-warning': isSelected })}
          >
            <td>
              <PersonLink person={person} />
            </td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              {mother ? (
                <PersonLink person={mother} />
              ) : person.motherName ? (
                person.motherName
              ) : (
                '-'
              )}
            </td>
            <td>
              {father ? (
                <PersonLink person={father} />
              ) : person.fatherName ? (
                person.fatherName
              ) : (
                '-'
              )}
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
);
