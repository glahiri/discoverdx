import React from 'react';
import PegaCaseTypes from '../PegaCaseTypes';
import PegaCases from '../PegaCases';
import PegaAssignments from '../PegaAssignments';
import PegaActions from '../PegaActions';
import PegaData from '../PegaData';

export const PortalPanes = [
    {
        menuItem: 'Case Types',
        render: () => <PegaCaseTypes/>
    },
    {
        menuItem: 'Cases',
        render: () => <PegaCases/>
    },
    {
        menuItem: 'Assignments',
        render: () => <PegaAssignments/>
    },
    {
        menuItem: 'Action',
        render: () => <PegaActions/>
    },
    {
        menuItem: 'Data Type',
        render: () => <PegaData/>
    }
];