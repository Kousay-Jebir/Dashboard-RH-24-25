// routesConfig.js
import MenuIcon from '@mui/icons-material/Menu';
import ViewKanbanIcon from '@mui/icons-material/ViewKanban';
const routesConfig = {
    dashboard: '/dashboard',
    recruitment: {
      root: '/recruitement',
      tabs : {
      interviews: '/recruitement/interviews',
      schedule: '/recruitement/schedule',
      settings: '/recruitement/settings',
      },
      menu : {
        interviews:{
        recent : '/recruitement/interviews/recent',
        questions : '/recruitement/interviews/questions',
        },
        schedule:{
            list: '/recruitement/schedule/list',
            kanbanBoard : '/recruitement/schedule/board'
        }
      }
    },
    teamMembers: '/team-members',
    meetings: {
      root: '/meetings',
      tabs : {
      meetings: '/meetings/meetings',
      settings: '/meetings/settings',
      },
      menu : {
        meetings: [
          {
              title: 'Recent meetings',
              icon: MenuIcon,
              path: '/meetings/meetings/recent',
              secondaryMenu: [] // No nested menu
          },
          {
              title: 'Schedule',
              icon: ViewKanbanIcon,
              path: '/meetings/meetings/schedule',
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
  