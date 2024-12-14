// routesConfig.js
import SmsRoundedIcon from '@mui/icons-material/SmsRounded';
import HelpRoundedIcon from '@mui/icons-material/HelpRounded';
import MenuIcon from '@mui/icons-material/Menu';
import ViewKanbanRoundedIcon from '@mui/icons-material/ViewKanbanRounded';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
const routesConfig = {
    dashboard: '/dashboard',
    recruitment: {
      root: '/recruitement',
      tabs : [
        {title:'Interviews',path:'/recruitement/interviews',default:'/recent'},
        {title:'schedule',path:'/recruitement/schedule',default:'/list'},
 
      ],
      menu : {
        interviews:[
          {
            title: 'Recent interviews',
            icon: SmsRoundedIcon,
            path: '/recruitement/interviews/recent',
            secondaryMenu: [] // No nested menu
          },
        
        ],
        schedule:[
          {
            title: 'List',
            icon: MenuIcon,
            path: '/recruitement/schedule/list',
            secondaryMenu: [] // No nested menu
          },
          {
            title: 'Kanban board',
            icon: ViewKanbanRoundedIcon,
            path: '/recruitement/schedule/board',
            secondaryMenu: [] // No nested menu
          }

        ]
      }
    },
    teamMembers: {
      root:'/team-members',
      tabs : [
        {title:'All members',path:'/team-members/all',default:''},
        {title:'Développement Commercial',path:'/team-members/dev-co',default:''},
        {title:'Marketing',path:'/team-members/marketing',default:''},
        {title:'Projet',path:'/team-members/projet',default:''},
        {title:'Cellule Qualité',path:'/team-members/cellule-qualite',default:''}
      ]
    },
    meetings: {
      root: '/meetings',
      tabs : [
        {title:'Meetings',path:'/meetings/meetings',default:'/recent'},
  
      ],
      menu : {
        meetings: [
          {
              title: 'Recent meetings',
              icon: SmsRoundedIcon,
              path: '/meetings/meetings/recent',
              secondaryMenu: [] // No nested menu
          },
          {
              title: 'Schedule',
              icon: CalendarMonthRoundedIcon,
              path: '/meetings/meetings/schedule/department',
              secondaryMenu: [
                  {
                      title: 'Department',
                      path: '/meetings/meetings/schedule/department',
                      secondaryMenu: [] // No nested menu
                  },
                  {
                      title: 'General Assembly',
                      path: '/meetings/meetings/schedule/general-assembly',
                      secondaryMenu: [] // No nested menu
                  },
                  {
                      title: 'Team Building',
                      path: '/meetings/meetings/schedule/team-building',
                      secondaryMenu: [] // No nested menu
                  },
                  {
                      title: 'Event',
                      path: '/meetings/meetings/schedule/event',
                      secondaryMenu: [] // No nested menu
                  }
              ]
          }
      ]
  },
    evaluation: '/evaluation',
  }
};
  
  export default routesConfig;
  