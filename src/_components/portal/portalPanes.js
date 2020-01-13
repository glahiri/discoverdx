import React from 'react';
import { Tab } from "semantic-ui-react";
import PegaLogin from '../PegaLogin';
import PegaCaseTypes from '../PegaCaseTypes';
import PegaCases from '../PegaCases';
import PegaAssignments from '../PegaAssignments';
import PegaActions from '../PegaActions';

export const PortalPanes = [
    {
        menuItem: 'Getting Started',
        render: () => <PegaLogin/>
    },
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
        render: () => <Tab.Pane attached={false}>Data Content</Tab.Pane>
    }
];